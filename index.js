/**
 * Host half of the Commit Message bundle.
 *
 * The browser posts to one exact loopback route. All Git work is done with an
 * argv array (never a shell), and the commit message is generated through the
 * session's current model route.
 */

const ROUTE = '/__dsh/commit-message';
const MAX_BODY_BYTES = 64 * 1024;
const MAX_DIFF_CHARS = 20_000;
const MAX_COMMIT_MESSAGE_CHARS = 20_000;
const MAX_GIT_OUTPUT_BYTES = 8 * 1024 * 1024;

export const inject = ['webServer', 'subprocess', 'sessions', 'workingDirectory', 'fs'];

class RequestError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
  }
}

export function apply(ctx) {
  ctx.effect(
    () =>
      ctx.webServer.register({
        kind: 'exact',
        path: ROUTE,
        handler: (req, res) => handleRequest(ctx, req, res),
      }),
    'commit-message: route',
  );
}

async function handleRequest(ctx, req, res) {
  const deadline = makeDeadline(120_000);
  try {
    if (req.method !== 'POST') {
      throw new RequestError(405, 'Only POST is supported.');
    }
    assertSameOrigin(ctx, req);
    if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
      throw new RequestError(415, 'Content-Type must be application/json.');
    }

    const body = await readJsonBody(req);
    const action = body.action;
    if (action !== 'status' && action !== 'generate' && action !== 'commit' && action !== 'push') {
      throw new RequestError(400, 'Unknown action.');
    }

    const { session, cwd } = await resolveSessionDirectory(ctx, body.sessionId, deadline.signal);

    if (action === 'status') {
      const status = await inspectRepo(ctx, cwd, deadline.signal);
      send(res, 200, { ok: true, ...publicStatus(status) });
      return;
    }

    if (action === 'generate') {
      const status = await inspectRepo(ctx, cwd, deadline.signal);
      assertCommittable(status);
      const changes = await loadChanges(ctx, cwd, status, deadline.signal);
      const message = await generateMessage(ctx, session, status, changes, deadline.signal);
      send(res, 200, { ok: true, message, ...publicStatus(status) });
      return;
    }

    if (action === 'push') {
      const status = await inspectRepo(ctx, cwd, deadline.signal);
      if (!status.hasCommits) {
        throw new RequestError(409, 'There are no commits to push.');
      }
      if (!status.upstream) {
        throw new RequestError(409, 'No upstream branch is configured for this branch.');
      }
      if (status.ahead === 0) {
        throw new RequestError(409, 'There are no unpushed commits.');
      }

      const pushed = await runGit(ctx, cwd, ['push'], deadline.signal, {
        env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      });
      if (pushed.code !== 0) {
        throw new RequestError(409, friendlyGitError(pushed, 'Git refused the push.'));
      }

      const next = await inspectRepo(ctx, cwd, deadline.signal);
      send(res, 200, {
        ok: true,
        pushed: status.ahead,
        upstream: next.upstream || status.upstream,
        ...publicStatus(next),
      });
      return;
    }

    const message = normaliseCommitMessage(body.message);
    const status = await inspectRepo(ctx, cwd, deadline.signal);
    assertCommittable(status);

    const staged = await runGit(ctx, cwd, ['add', '-A'], deadline.signal);
    if (staged.code !== 0) {
      throw new RequestError(409, friendlyGitError(staged, 'Could not stage the changes.'));
    }

    const committed = await runGit(ctx, cwd, ['commit', '-m', message], deadline.signal);
    if (committed.code !== 0) {
      throw new RequestError(409, friendlyGitError(committed, 'Git refused the commit.'));
    }

    const hashResult = await runGit(ctx, cwd, ['rev-parse', '--short', 'HEAD'], deadline.signal);
    const hash = hashResult.code === 0 ? hashResult.stdout.trim() : '';
    const next = await inspectRepo(ctx, cwd, deadline.signal);
    send(res, 200, { ok: true, hash, message, ...publicStatus(next) });
  } catch (error) {
    const timedOut = deadline.signal.aborted;
    const status = error instanceof RequestError ? error.status : timedOut ? 504 : 500;
    const message = timedOut && !(error instanceof RequestError)
      ? 'The commit message operation timed out.'
      : error instanceof Error
        ? error.message
        : 'The commit message operation failed.';
    send(res, status, { ok: false, error: message });
  } finally {
    deadline.clear();
  }
}

function assertSameOrigin(ctx, req) {
  const address = req.socket?.remoteAddress;
  if (address !== '127.0.0.1' && address !== '::1' && address !== '::ffff:127.0.0.1') {
    throw new RequestError(403, 'This action is only available over the local loopback connection.');
  }
  let expected;
  try {
    expected = ctx.webServer.getOrigin();
  } catch {
    throw new RequestError(503, 'The web server is not ready yet.');
  }
  const origin = req.headers.origin;
  if (origin && origin !== expected) {
    throw new RequestError(403, 'This request came from a different origin.');
  }
  const site = req.headers['sec-fetch-site'];
  if (site === 'cross-site') {
    throw new RequestError(403, 'Cross-site requests are not allowed.');
  }
}

async function resolveSessionDirectory(ctx, sessionId, signal) {
  if (typeof sessionId !== 'string' || sessionId.length === 0 || sessionId.length > 256) {
    throw new RequestError(400, 'A valid session id is required.');
  }
  const session = ctx.sessions.get(sessionId);
  if (!session) {
    throw new RequestError(404, 'This session is no longer live. Reload the page and try again.');
  }
  const cwd = ctx.workingDirectory.get(session);
  if (typeof cwd !== 'string' || !isAbsolutePath(cwd)) {
    throw new RequestError(409, 'This session has no usable working directory.');
  }
  let target;
  try {
    target = await ctx.fs.resolve(cwd, { signal });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new RequestError(409, `The session working directory cannot be opened: ${reason}`);
  }
  const info = await ctx.fs.stat(target, signal);
  if (!info || info.type !== 'directory') {
    throw new RequestError(409, 'The session working directory no longer exists.');
  }
  return { session, cwd };
}

function isAbsolutePath(path) {
  return path.startsWith('/') || path.startsWith('\\\\') || /^[A-Za-z]:[\\/]/.test(path);
}

async function inspectRepo(ctx, cwd, signal) {
  const topResult = await runGit(ctx, cwd, ['rev-parse', '--show-toplevel'], signal);
  if (topResult.code !== 0) {
    return {
      isRepo: false,
      cwd,
      top: '',
      branch: '',
      changedFiles: 0,
      stagedFiles: 0,
      unstagedFiles: 0,
      untrackedFiles: 0,
      files: [],
      hasCommits: false,
      commits: [],
      upstream: '',
      ahead: 0,
      behind: 0,
    };
  }

  const top = topResult.stdout.trim() || cwd;
  const [statusResult, branchInfoResult, headResult, prefixResult] = await Promise.all([
    runGit(ctx, cwd, ['status', '--porcelain=v1', '-z', '--untracked-files=all'], signal),
    runGit(ctx, cwd, ['status', '--porcelain=v2', '--branch', '--untracked-files=no'], signal),
    runGit(ctx, cwd, ['rev-parse', '--verify', 'HEAD'], signal),
    runGit(ctx, cwd, ['rev-parse', '--show-prefix'], signal),
  ]);

  if (statusResult.code !== 0) {
    throw new RequestError(409, friendlyGitError(statusResult, 'Could not read Git status.'));
  }

  const prefix = prefixResult.code === 0 ? prefixResult.stdout.trim() : '';
  const files = parseStatus(statusResult.stdout).map((file) => ({
    ...file,
    workspacePath: workspaceRelativePath(file.path, prefix),
  }));
  const branchInfo = parseBranchInfo(branchInfoResult.stdout);
  const hasCommits = headResult.code === 0;

  let commits = [];
  if (hasCommits && branchInfo.upstream) {
    const logResult = await runGit(
      ctx,
      cwd,
      [
        'log',
        '-n',
        '8',
        '--pretty=format:%H%x00%h%x00%an%x00%at%x00%s%x1e',
        `${branchInfo.upstream}..HEAD`,
      ],
      signal,
    );
    if (logResult.code === 0) commits = parseCommits(logResult.stdout);
  }

  return {
    isRepo: true,
    cwd,
    top,
    branch: branchInfo.branch,
    upstream: branchInfo.upstream,
    ahead: branchInfo.ahead,
    behind: branchInfo.behind,
    hasCommits,
    commits,
    changedFiles: files.length,
    stagedFiles: files.filter((file) => file.staged).length,
    unstagedFiles: files.filter((file) => file.unstaged).length,
    untrackedFiles: files.filter((file) => file.untracked).length,
    files,
  };
}

function parseBranchInfo(raw) {
  const info = { branch: '', upstream: '', ahead: 0, behind: 0 };
  for (const line of String(raw).split('\n')) {
    if (line.startsWith('# branch.head ')) {
      const value = line.slice('# branch.head '.length).trim();
      if (value && value !== '(detached)') info.branch = value;
    } else if (line.startsWith('# branch.upstream ')) {
      info.upstream = line.slice('# branch.upstream '.length).trim();
    } else if (line.startsWith('# branch.ab ')) {
      const match = line.match(/\+(\d+)\s+-(\d+)/);
      if (match) {
        info.ahead = Number(match[1]) || 0;
        info.behind = Number(match[2]) || 0;
      }
    }
  }
  return info;
}

function parseCommits(raw) {
  return String(raw)
    .split('\x1e')
    .map((record) => record.replace(/^\n+/, ''))
    .filter(Boolean)
    .map((record) => {
      const [hash, shortHash, author, timestamp, ...subject] = record.split('\0');
      return {
        hash,
        shortHash,
        author,
        timestamp: Number(timestamp) || 0,
        subject: subject.join('\0'),
      };
    })
    .filter((commit) => commit.hash)
    .slice(0, 8);
}

function workspaceRelativePath(repoPath, prefix) {
  if (!prefix) return repoPath;
  return repoPath.startsWith(prefix) ? repoPath.slice(prefix.length) : null;
}

function parseStatus(raw) {
  const parts = String(raw).split('\0');
  const files = [];
  for (let index = 0; index < parts.length && files.length < 5000; index += 1) {
    const entry = parts[index];
    if (!entry || entry.length < 4) continue;
    const x = entry[0];
    const y = entry[1];
    const path = entry.slice(3);
    if (x === 'R' || x === 'C') {
      index += 1;
    }
    if (x === '!' && y === '!') continue;
    const untracked = x === '?' && y === '?';
    files.push({
      path,
      status: `${x}${y}`,
      untracked,
      staged: !untracked && x !== ' ' && x !== '?',
      unstaged: !untracked && y !== ' ' && y !== '?',
    });
  }
  return files;
}

function assertCommittable(status) {
  if (!status.isRepo) {
    throw new RequestError(409, 'This session working directory is not a Git repository.');
  }
  if (status.changedFiles === 0) {
    throw new RequestError(409, 'There are no uncommitted changes.');
  }
}

async function loadChanges(ctx, cwd, status, signal) {
  const [staged, unstaged] = await Promise.all([
    runGit(ctx, cwd, ['diff', '--no-color', '--no-ext-diff', '--unified=3', '--cached'], signal),
    runGit(ctx, cwd, ['diff', '--no-color', '--no-ext-diff', '--unified=3'], signal),
  ]);

  if (staged.code !== 0 || unstaged.code !== 0) {
    throw new RequestError(409, friendlyGitError(staged.code !== 0 ? staged : unstaged, 'Could not read the Git diff.'));
  }

  let diff = '';
  if (staged.stdout.trim()) diff += `## Staged changes\n${staged.stdout.trim()}\n\n`;
  if (unstaged.stdout.trim()) diff += `## Unstaged changes\n${unstaged.stdout.trim()}\n\n`;

  const untracked = status.files.filter((file) => file.untracked).slice(0, 8);
  for (const file of untracked) {
    try {
      const target = await ctx.fs.resolve(file.path, { cwd, signal });
      const info = await ctx.fs.stat(target, signal);
      if (!info || info.type !== 'file') continue;
      if ((info.size ?? 0) > 120_000) {
        diff += `## New file: ${file.path} (${info.size} bytes, contents omitted)\n\n`;
        continue;
      }
      const text = await ctx.fs.readText(target, signal);
      diff += `## New file: ${file.path}\n${text.slice(0, 4000)}\n\n`;
    } catch {
      diff += `## New file: ${file.path} (contents unavailable)\n\n`;
    }
  }

  const full = diff.trim();
  const truncated = full.length > MAX_DIFF_CHARS;
  return {
    statusText: status.files
      .slice(0, 400)
      .map((file) => `${file.status} ${file.path}`)
      .join('\n'),
    diff: full.slice(0, MAX_DIFF_CHARS),
    truncated,
  };
}

async function generateMessage(ctx, session, status, changes, signal) {
  const llm = ctx.get('llm');
  if (!llm) {
    throw new RequestError(503, 'Model generation is unavailable in this profile.');
  }

  const requestConfig = session.requestHeader?.()?.config;
  const fallback = ctx.get('agentDefaultModel')?.currentSelection?.();
  const selection = requestConfig ?? fallback;
  if (!selection || typeof selection.provider !== 'string' || typeof selection.model !== 'string') {
    throw new RequestError(409, 'No model is configured for this session.');
  }

  const prompt = buildPrompt(status, changes);
  const reasoningEffort = await leastReasoningEffort(
    llm,
    selection.provider,
    selection.model,
    signal,
  );

  let result = await streamMessage(llm, {
    provider: selection.provider,
    model: selection.model,
    reasoningEffort,
    prompt,
    maxTokens: 800,
    signal,
  });
  if (result.failure) throw new RequestError(502, result.failure);

  let message = sanitiseMessage(result.text);
  if (!message) {
    // A high-effort reasoning selection can consume the whole output budget
    // before emitting any visible text. The retry uses more headroom.
    result = await streamMessage(llm, {
      provider: selection.provider,
      model: selection.model,
      reasoningEffort,
      prompt: `${prompt}\n\nReturn a non-empty commit message now.`,
      maxTokens: 1200,
      signal,
    });
    if (result.failure) throw new RequestError(502, result.failure);
    message = sanitiseMessage(result.text);
  }

  if (!message) throw new RequestError(502, 'The model returned an empty commit message. Try again.');
  return message;
}

async function leastReasoningEffort(llm, provider, model, signal) {
  try {
    const info = await llm.resolveModelInfo(provider, model, signal);
    const efforts = Array.isArray(info?.reasoning?.efforts) ? info.reasoning.efforts : [];
    const first = efforts[0];
    return first && typeof first.id === 'string' ? first.id : undefined;
  } catch {
    return undefined;
  }
}

async function streamMessage(llm, options) {
  let text = '';
  let blockText = '';
  let failure = '';
  const stream = llm.stream({
    provider: options.provider,
    model: options.model,
    ...(options.reasoningEffort ? { reasoningEffort: options.reasoningEffort } : {}),
    messages: [{ role: 'user', content: [{ type: 'text', text: options.prompt }] }],
    system: SYSTEM_PROMPT,
    maxTokens: options.maxTokens,
    temperature: 0.2,
    signal: options.signal,
  });

  for await (const chunk of stream) {
    if (chunk.type === 'text-delta' && typeof chunk.text === 'string') {
      text += chunk.text;
    } else if (chunk.type === 'block-end' && chunk.block?.type === 'text') {
      if (typeof chunk.block.text === 'string') blockText += chunk.block.text;
    } else if (chunk.type === 'finish' && chunk.reason?.kind === 'error') {
      failure = chunk.reason.failure?.message || 'The model call failed.';
    } else if (chunk.type === 'finish' && chunk.reason?.kind === 'aborted') {
      failure = chunk.reason.failure?.message || 'The model call was aborted.';
    }
  }

  return { text: text || blockText, failure };
}

const SYSTEM_PROMPT = [
  'You write Git commit messages in the Conventional Commits style.',
  'Use one of: feat, fix, docs, refactor, perf, test, build, ci, chore, style.',
  'Format: "type(scope): subject" when a scope is clear, otherwise "type: subject".',
  'The subject must be imperative, lowercase unless a proper noun, and at most 72 characters.',
  'Add a blank line and 1-3 short bullet points when the change needs explanation.',
  'Describe the user-visible intent, not a file-by-file inventory.',
  'Return only the commit message. Do not use code fences, quotes, or a heading.',
].join('\n');

function buildPrompt(status, changes) {
  const parts = [
    `Repository: ${status.top}`,
    `Branch: ${status.branch || 'detached HEAD'}`,
    `Changed files (${status.changedFiles}):`,
    changes.statusText || '(none)',
    '',
    'Diff:',
    changes.diff || '(no textual diff; infer from the changed file list)',
  ];
  if (changes.truncated) parts.push('', '[The diff was truncated by the plugin.]');
  return parts.join('\n');
}

function sanitiseMessage(input) {
  let text = String(input ?? '').replace(/\r\n/g, '\n').trim();
  const fenced = text.match(/^```[^\n]*\n([\s\S]*?)\n```$/);
  if (fenced) text = fenced[1].trim();
  text = text.replace(/^(?:commit message|message)\s*:\s*/i, '').trim();
  if (text.length > 2000) text = text.slice(0, 2000).trimEnd();
  return text;
}

function normaliseCommitMessage(input) {
  if (typeof input !== 'string') {
    throw new RequestError(400, 'A commit message is required.');
  }
  const message = input.replace(/\r\n/g, '\n').trim();
  if (!message) {
    throw new RequestError(400, 'A commit message is required.');
  }
  if (message.length > MAX_COMMIT_MESSAGE_CHARS) {
    throw new RequestError(400, 'The commit message is too long.');
  }
  if (message.includes('\0')) {
    throw new RequestError(400, 'The commit message contains a NUL byte.');
  }
  return message;
}

function publicStatus(status) {
  return {
    isRepo: status.isRepo,
    cwd: status.cwd,
    top: status.top,
    branch: status.branch,
    upstream: status.upstream,
    ahead: status.ahead,
    behind: status.behind,
    hasCommits: status.hasCommits,
    commits: status.commits,
    files: status.files.slice(0, 500).map((file) => ({
      path: file.path,
      workspacePath: file.workspacePath,
      status: file.status,
      untracked: file.untracked,
      staged: file.staged,
      unstaged: file.unstaged,
    })),
    changedFiles: status.changedFiles,
    stagedFiles: status.stagedFiles,
    unstagedFiles: status.unstagedFiles,
    untrackedFiles: status.untrackedFiles,
  };
}

async function runGit(ctx, cwd, args, signal, options = {}) {
  const executable = await ctx.subprocess.resolveExecutable('git', undefined, signal);
  const handle = ctx.subprocess.spawn({
    argv: [executable, ...args],
    cwd,
    stdio: {
      stdin: 'ignore',
      stdout: { maxBytes: MAX_GIT_OUTPUT_BYTES },
      stderr: { maxBytes: 2 * 1024 * 1024 },
    },
    graceMs: 5000,
    signal,
    ...(options.env ? { env: options.env } : {}),
  });
  const outcome = await handle.done;
  return {
    code: outcome.exitCode,
    signal: outcome.signal,
    stdout: readCollected(handle.collected.stdout, 4 * 1024 * 1024),
    stderr: readCollected(handle.collected.stderr, 1 * 1024 * 1024),
  };
}

function readCollected(reader, limit) {
  if (!reader) return '';
  try {
    return reader.readFrom(0).text.slice(0, limit);
  } catch {
    return '';
  }
}

function friendlyGitError(result, fallback) {
  const detail = `${result.stderr || ''}\n${result.stdout || ''}`.trim();
  if (!detail) return fallback;
  const trimmed = detail.length > 4000 ? `${detail.slice(0, 4000)}\n[truncated]` : detail;
  if (/author identity unknown|unable to auto-detect email/i.test(trimmed)) {
    return `${trimmed}\n\nSet git user.name and user.email, then try again.`;
  }
  return trimmed;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let total = 0;
    const chunks = [];
    const fail = (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };
    req.on('data', (chunk) => {
      if (settled) return;
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        fail(new RequestError(413, 'Request body is too large.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (settled) return;
      settled = true;
      try {
        const text = Buffer.concat(chunks).toString('utf8');
        const value = text ? JSON.parse(text) : {};
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
          throw new Error('not an object');
        }
        resolve(value);
      } catch {
        reject(new RequestError(400, 'Invalid JSON body.'));
      }
    });
    req.on('error', (error) => {
      fail(error instanceof Error ? error : new Error(String(error)));
    });
  });
}

function makeDeadline(ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error('Timed out')), ms);
  if (typeof timer.unref === 'function') timer.unref();
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timer),
  };
}

function send(res, status, payload) {
  if (res.writableEnded) return;
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body),
  });
  res.end(body);
}
