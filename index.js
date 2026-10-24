/**
 * Host half of the Commit Message bundle.
 *
 * The browser posts to one exact loopback route. All Git work is done with an
 * argv array (never a shell), and the commit message is generated through the
 * session's current model route.
 */

import { spawn } from 'node:child_process';
import { createReadStream, statSync } from 'node:fs';

const ROUTE = '/__dsh/commit-message';
const MEDIA_ROUTE = '/__dsh/commit-message-media';
const MAX_BODY_BYTES = 64 * 1024;
const MAX_DIFF_CHARS = 20_000;
const MAX_FILE_DIFF_CHARS = 60_000;
const MAX_UNTRACKED_FILE_BYTES = 200_000;
const MAX_COMMIT_MESSAGE_CHARS = 20_000;
const MAX_GIT_OUTPUT_BYTES = 8 * 1024 * 1024;

const MEDIA_TYPES = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogv: 'video/ogg',
  mov: 'video/quicktime',
  m4v: 'video/x-m4v',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  oga: 'audio/ogg',
  m4a: 'audio/mp4',
  aac: 'audio/aac',
  flac: 'audio/flac',
};

function mediaExtension(path) {
  const name = String(path || '').split('/').pop() || '';
  const cut = name.lastIndexOf('.');
  if (cut === -1) return '';
  return name.slice(cut + 1).toLowerCase();
}

function mediaMimeForPath(path) {
  return MEDIA_TYPES[mediaExtension(path)] || '';
}

function mediaKindForPath(path) {
  const mime = mediaMimeForPath(path);
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('audio/')) return 'audio';
  return '';
}

export const inject = ['webServer', 'subprocess', 'sessions', 'workingDirectory', 'fs'];

class RequestError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
  }
}

async function restartHarness() {
  let electron;
  try {
    electron = await import('electron');
  } catch {
    electron = undefined;
  }
  const app = electron?.app ?? electron?.default?.app;
  if (app && typeof app.relaunch === 'function' && typeof app.quit === 'function') {
    // Let the HTTP response flush before the app tears the server down.
    setTimeout(() => {
      try {
        app.relaunch();
        app.quit();
        // If a before-quit hook blocks the quit, force the process down.
        setTimeout(() => {
          try {
            app.exit(0);
          } catch {
            // The app already exited.
          }
        }, 4000).unref?.();
      } catch (error) {
        console.error('commit-message: could not restart the harness', error);
      }
    }, 500);
    return { method: 'electron' };
  }

  if (process.versions.electron && process.platform === 'darwin') {
    const script = [
      'sleep 1',
      '/usr/bin/osascript -e \'tell application "DeepSeek Harness" to quit\'',
      'for i in $(/usr/bin/seq 1 40); do',
      '  if ! /usr/bin/pgrep -x "DeepSeek Harness" >/dev/null 2>&1; then break; fi',
      '  sleep 0.5',
      'done',
      '/usr/bin/open -a "DeepSeek Harness"',
    ].join('; ');
    const child = spawn('/bin/sh', ['-c', script], { detached: true, stdio: 'ignore' });
    child.unref();
    return { method: 'apple-script' };
  }

  throw new RequestError(
    503,
    'Automatic restart is unavailable in this Host. Quit and reopen DeepSeek Harness.',
  );
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
  ctx.effect(
    () =>
      ctx.webServer.register({
        kind: 'exact',
        path: MEDIA_ROUTE,
        handler: (req, res) => handleMediaRequest(ctx, req, res),
      }),
    'commit-message: media route',
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
    if (
      action !== 'status' &&
      action !== 'diff' &&
      action !== 'open-in-vscode' &&
      action !== 'generate' &&
      action !== 'commit' &&
      action !== 'push' &&
      action !== 'create-github' &&
      action !== 'restart-harness'
    ) {
      throw new RequestError(400, 'Unknown action.');
    }

    if (action === 'restart-harness') {
      const result = await restartHarness();
      send(res, 200, { ok: true, ...result });
      return;
    }

    const { session, cwd } = await resolveSessionDirectory(ctx, body.sessionId, deadline.signal);

    if (action === 'status') {
      const status = await inspectRepo(ctx, cwd, deadline.signal);
      send(res, 200, { ok: true, ...publicStatus(status) });
      return;
    }

    if (action === 'diff') {
      const status = await inspectRepo(ctx, cwd, deadline.signal);
      if (!status.isRepo) {
        throw new RequestError(409, 'This session working directory is not a Git repository.');
      }
      const file = findChangedFile(status, body.path);
      const mediaKind = file.status.includes('D') ? '' : mediaKindForPath(file.path);
      if (mediaKind) {
        // Media is streamed from the media route; never try to decode it as text.
        send(res, 200, {
          ok: true,
          path: file.path,
          status: file.status,
          diff: '',
          truncated: false,
          binary: true,
          mediaKind,
          mediaVersion: Date.now().toString(36),
        });
        return;
      }
      const diff = await loadFileDiff(ctx, status, file, deadline.signal);
      send(res, 200, {
        ok: true,
        path: file.path,
        status: file.status,
        ...diff,
        mediaKind: '',
        mediaVersion: '',
      });
      return;
    }

    if (action === 'open-in-vscode') {
      const line = Number(body.line);
      const result = await openInVSCode(
        ctx,
        cwd,
        body.path,
        Number.isFinite(line) ? line : 1,
        deadline.signal,
      );
      send(res, 200, { ok: true, ...result });
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

    if (action === 'create-github') {
      const created = await createGitHubRepository(ctx, cwd, body, deadline.signal);
      send(res, 200, { ok: true, ...created });
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

async function handleMediaRequest(ctx, req, res) {
  const deadline = makeDeadline(30_000);
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      sendMediaError(res, 405, 'Only GET and HEAD are supported.');
      return;
    }
    assertSameOrigin(ctx, req);

    const url = new URL(req.url || '/', 'http://127.0.0.1');
    const sessionId = url.searchParams.get('sessionId') || '';
    const filePath = url.searchParams.get('path') || '';
    if (!sessionId || !filePath) {
      throw new RequestError(400, 'A session and file path are required.');
    }
    if (filePath.length > 4096 || filePath.includes('\0')) {
      throw new RequestError(400, 'Invalid file path.');
    }

    const { cwd } = await resolveSessionDirectory(ctx, sessionId, deadline.signal);
    const status = await inspectRepo(ctx, cwd, deadline.signal);
    if (!status.isRepo) {
      throw new RequestError(409, 'This session working directory is not a Git repository.');
    }
    const file = status.files.find((candidate) => candidate.path === filePath);
    if (!file || file.status.includes('D')) {
      throw new RequestError(404, 'That file is not available in the working tree.');
    }
    const mime = mediaMimeForPath(file.path);
    if (!mime) {
      throw new RequestError(415, 'That file is not a supported image, video, or audio type.');
    }

    const root = status.top || cwd;
    const rootTarget = await ctx.fs.resolve('.', { cwd: root, signal: deadline.signal });
    const target = await ctx.fs.resolve(file.path, { cwd: root, signal: deadline.signal });
    if (!ctx.fs.contains(rootTarget, target)) {
      throw new RequestError(403, 'The file is outside the repository.');
    }
    const hostPath = ctx.fs.processPath(target);
    const info = statSync(hostPath);
    if (!info.isFile()) {
      throw new RequestError(404, 'The file is no longer available.');
    }

    const headers = {
      'content-type': mime,
      'accept-ranges': 'bytes',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      'content-disposition': 'inline',
    };
    const size = info.size;
    const range = req.headers.range;
    if (range) {
      const parsed = parseByteRange(range, size);
      if (!parsed) {
        res.writeHead(416, { ...headers, 'content-range': `bytes */${size}` });
        res.end();
        return;
      }
      const { start, end } = parsed;
      res.writeHead(206, {
        ...headers,
        'content-range': `bytes ${start}-${end}/${size}`,
        'content-length': String(end - start + 1),
      });
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      const stream = createReadStream(hostPath, { start, end });
      stream.on('error', () => {
        if (!res.headersSent) sendMediaError(res, 500, 'Could not read the file.');
        else res.destroy();
      });
      res.on('close', () => stream.destroy());
      stream.pipe(res);
      return;
    }

    res.writeHead(200, { ...headers, 'content-length': String(size) });
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    const stream = createReadStream(hostPath);
    stream.on('error', () => {
      if (!res.headersSent) sendMediaError(res, 500, 'Could not read the file.');
      else res.destroy();
    });
    res.on('close', () => stream.destroy());
    stream.pipe(res);
  } catch (error) {
    const status = error instanceof RequestError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Could not read the media file.';
    sendMediaError(res, status, message);
  } finally {
    deadline.clear();
  }
}

function parseByteRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(String(header || '').trim());
  if (!match) return null;
  const [, rawStart, rawEnd] = match;
  if (!rawStart && !rawEnd) return null;
  let start;
  let end;
  if (!rawStart) {
    const suffix = Number(rawEnd);
    if (!Number.isFinite(suffix) || suffix <= 0) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(rawStart);
    end = rawEnd ? Number(rawEnd) : size - 1;
    if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  }
  if (start < 0 || start >= size || end < start) return null;
  if (end >= size) end = size - 1;
  return { start, end };
}

function sendMediaError(res, status, message) {
  if (res.writableEnded) return;
  const body = `${message}\n`;
  res.writeHead(status, {
    'content-type': 'text/plain; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body),
  });
  res.end(body);
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
      githubUrl: '',
    };
  }

  const top = topResult.stdout.trim() || cwd;
  const [statusResult, branchInfoResult, headResult, prefixResult, remotesResult] = await Promise.all([
    runGit(ctx, cwd, ['status', '--porcelain=v1', '-z', '--untracked-files=all'], signal),
    runGit(ctx, cwd, ['status', '--porcelain=v2', '--branch', '--untracked-files=no'], signal),
    runGit(ctx, cwd, ['rev-parse', '--verify', 'HEAD'], signal),
    runGit(ctx, cwd, ['rev-parse', '--show-prefix'], signal),
    runGit(ctx, cwd, ['remote', '-v'], signal),
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
  const githubUrl = remotesResult.code === 0 ? githubRemoteUrl(remotesResult.stdout) : '';

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
    githubUrl,
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

function githubRemoteUrl(raw) {
  const candidates = [];
  for (const line of String(raw).split('\n')) {
    const match = line.match(/^(\S+)\t(\S+)\s+\((fetch|push)\)$/);
    if (!match) continue;
    const url = githubWebUrl(match[2]);
    if (url) candidates.push({ name: match[1], url });
  }
  if (candidates.length === 0) return '';
  return (candidates.find((candidate) => candidate.name === 'origin') || candidates[0]).url;
}

function githubWebUrl(remote) {
  const text = String(remote || '').trim();
  let path = '';
  const scp = text.match(/^(?:[^@/\s]+@)?github\.com:([\s\S]+)$/i);
  if (scp) {
    path = scp[1];
  } else {
    try {
      const parsed = new URL(text);
      if (parsed.hostname.toLowerCase() !== 'github.com') return '';
      path = parsed.pathname;
    } catch {
      return '';
    }
  }
  path = path.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\.git$/i, '');
  const parts = path.split('/').filter(Boolean);
  if (parts.length !== 2) return '';
  return `https://github.com/${parts[0]}/${parts[1]}`;
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

async function openInVSCode(ctx, cwd, inputPath, line, signal) {
  const status = await inspectRepo(ctx, cwd, signal);
  if (!status.isRepo) {
    throw new RequestError(409, 'This session working directory is not a Git repository.');
  }
  const file = findChangedFile(status, inputPath);
  if (file.status.includes('D')) {
    throw new RequestError(409, 'That file was deleted; there is no working-tree file to open.');
  }
  const root = status.top || cwd;
  const rootTarget = await ctx.fs.resolve('.', { cwd: root, signal });
  const target = await ctx.fs.resolve(file.path, { cwd: root, signal });
  if (!ctx.fs.contains(rootTarget, target)) {
    throw new RequestError(403, 'The file is outside the repository.');
  }
  const info = await ctx.fs.stat(target, signal);
  if (!info || info.type !== 'file') {
    throw new RequestError(404, 'The file is no longer available.');
  }
  const executable = await resolveVSCodeExecutable(ctx, signal);
  const targetLine =
    Number.isFinite(line) && line > 0 ? Math.min(Math.floor(line), 10_000_000) : 1;
  const result = await runCommand(
    ctx,
    executable,
    ['--goto', `${ctx.fs.processPath(target)}:${targetLine}`],
    root,
    signal,
  );
  if (result.code !== 0) {
    const detail = `${result.stderr || ''}\n${result.stdout || ''}`.trim();
    throw new RequestError(
      409,
      detail
        ? `VS Code could not open the file: ${detail.slice(0, 1000)}`
        : 'VS Code could not open the file.',
    );
  }
  return { path: file.path, line: targetLine };
}

async function resolveVSCodeExecutable(ctx, signal) {
  const candidates = ['code'];
  if (process.platform === 'darwin') {
    candidates.push(
      '/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code',
      '/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin/code',
      '/usr/local/bin/code',
      '/opt/homebrew/bin/code',
    );
  } else if (process.platform === 'win32') {
    candidates.push('code.cmd');
  } else {
    candidates.push('/usr/bin/code', '/usr/local/bin/code', '/snap/bin/code');
  }
  for (const candidate of candidates) {
    try {
      const resolved = await ctx.subprocess.resolveExecutable(candidate, undefined, signal);
      if (resolved) return resolved;
    } catch {
      // Try the next known location.
    }
  }
  throw new RequestError(
    503,
    'VS Code CLI (`code`) was not found. Install VS Code and enable the `code` command, then try again.',
  );
}

function findChangedFile(status, input) {
  if (typeof input !== 'string' || input.length === 0 || input.length > 4096 || input.includes('\0')) {
    throw new RequestError(400, 'A changed file path is required.');
  }
  const file = status.files.find((candidate) => candidate.path === input);
  if (!file) {
    throw new RequestError(409, 'That file is not part of the current changes.');
  }
  return file;
}

async function loadFileDiff(ctx, status, file, signal) {
  const cwd = status.top || status.cwd;
  if (file.untracked) return loadUntrackedDiff(ctx, cwd, file.path, signal);

  const common = ['--no-color', '--no-ext-diff', '--unified=3'];
  let raw = '';
  if (status.hasCommits) {
    // The working tree against HEAD is exactly what a commit would record.
    const result = await runGit(ctx, cwd, ['diff', ...common, 'HEAD', '--', file.path], signal);
    if (result.code !== 0) {
      throw new RequestError(409, friendlyGitError(result, 'Could not read the file diff.'));
    }
    raw = result.stdout;
  } else {
    const [staged, unstaged] = await Promise.all([
      runGit(ctx, cwd, ['diff', ...common, '--cached', '--', file.path], signal),
      runGit(ctx, cwd, ['diff', ...common, '--', file.path], signal),
    ]);
    if (staged.code !== 0 || unstaged.code !== 0) {
      const failed = staged.code !== 0 ? staged : unstaged;
      throw new RequestError(409, friendlyGitError(failed, 'Could not read the file diff.'));
    }
    raw = [staged.stdout.trimEnd(), unstaged.stdout.trimEnd()].filter(Boolean).join('\n');
  }

  return limitFileDiff(raw);
}

async function loadUntrackedDiff(ctx, cwd, path, signal) {
  let root;
  let target;
  try {
    root = await ctx.fs.resolve('.', { cwd, signal });
    target = await ctx.fs.resolve(path, { cwd, signal });
  } catch {
    throw new RequestError(409, 'Could not read the new file.');
  }
  if (!ctx.fs.contains(root, target)) {
    throw new RequestError(409, 'The new file is outside the repository.');
  }

  let info;
  try {
    info = await ctx.fs.stat(target, signal);
  } catch {
    throw new RequestError(409, 'Could not read the new file.');
  }
  if (!info || info.type !== 'file') {
    return { diff: '', truncated: false, binary: true };
  }
  if ((info.size ?? 0) > MAX_UNTRACKED_FILE_BYTES) {
    return { diff: '', truncated: true, binary: false };
  }

  let text;
  try {
    text = await ctx.fs.readText(target, signal);
  } catch {
    throw new RequestError(409, 'Could not read the new file.');
  }
  if (text.includes('\0')) {
    return { diff: '', truncated: false, binary: true };
  }

  const lines = text.replace(/\r\n/g, '\n').split('\n');
  if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
  const tooManyLines = lines.length > 4000;
  const shown = tooManyLines ? lines.slice(0, 4000) : lines;

  const header = [
    `diff --git a/${path} b/${path}`,
    'new file mode 100644',
    '--- /dev/null',
    `+++ b/${path}`,
  ];
  if (shown.length > 0) header.push(`@@ -0,0 +1,${shown.length} @@`);
  const raw = [...header, ...shown.map((line) => `+${line}`)].join('\n');
  const limited = limitFileDiff(raw);
  return {
    ...limited,
    truncated: limited.truncated || tooManyLines,
  };
}

function limitFileDiff(raw) {
  const text = String(raw || '').replace(/\r\n/g, '\n').trimEnd();
  return {
    diff: text.slice(0, MAX_FILE_DIFF_CHARS),
    truncated: text.length > MAX_FILE_DIFF_CHARS,
    binary: /^(?:Binary files .* differ|GIT binary patch)$/m.test(text),
  };
}

async function createGitHubRepository(ctx, cwd, body, signal) {
  const name = normaliseRepoName(body.name);
  const visibility = body.visibility;
  if (visibility !== 'private' && visibility !== 'public') {
    throw new RequestError(400, 'Choose a private or public repository.');
  }

  const status = await inspectRepo(ctx, cwd, signal);
  if (!status.isRepo) {
    throw new RequestError(409, 'This session working directory is not a Git repository.');
  }
  if (status.githubUrl) {
    throw new RequestError(409, 'This repository is already connected to GitHub.');
  }

  const top = status.top || cwd;
  const remotes = await runGit(ctx, top, ['remote'], signal);
  const names = remotes.code === 0
    ? remotes.stdout.split('\n').map((entry) => entry.trim()).filter(Boolean)
    : [];
  const remote = pickRemoteName(names);
  const executable = await resolveGitHubCli(ctx, signal);

  const created = await runCommand(
    ctx,
    executable,
    [
      'repo',
      'create',
      name,
      visibility === 'private' ? '--private' : '--public',
      '--source',
      '.',
      '--remote',
      remote,
    ],
    top,
    signal,
    {
      env: {
        ...process.env,
        GH_PROMPT_DISABLED: '1',
        GH_NO_UPDATE_NOTIFIER: '1',
        GIT_TERMINAL_PROMPT: '0',
      },
    },
  );
  if (created.code !== 0) {
    throw new RequestError(409, githubCliError(created));
  }

  let pushed = false;
  let pushError = '';
  if (status.hasCommits && status.branch) {
    const push = await runGit(ctx, top, ['push', '-u', remote, 'HEAD'], signal, {
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
    });
    if (push.code === 0) pushed = true;
    else pushError = friendlyGitError(push, 'Git could not push to the new repository.');
  }

  const next = await inspectRepo(ctx, top, signal);
  return {
    ...publicStatus(next),
    created: true,
    remote,
    pushed,
    pushError,
  };
}

function normaliseRepoName(input) {
  if (typeof input !== 'string') {
    throw new RequestError(400, 'A repository name is required.');
  }
  const name = input.trim();
  if (!name || name.length > 140 || name.includes('\0')) {
    throw new RequestError(400, 'A repository name is required.');
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*(?:\/[A-Za-z0-9][A-Za-z0-9._-]*)?$/.test(name)) {
    throw new RequestError(400, 'Enter a valid GitHub repository name, optionally as owner/name.');
  }
  return name;
}

function pickRemoteName(names) {
  const used = new Set(names);
  if (!used.has('origin')) return 'origin';
  if (!used.has('github')) return 'github';
  let index = 2;
  while (used.has(`github-${index}`)) index += 1;
  return `github-${index}`;
}

async function resolveGitHubCli(ctx, signal) {
  const candidates = ['gh'];
  if (process.platform === 'darwin') {
    candidates.push('/opt/homebrew/bin/gh', '/usr/local/bin/gh');
  } else if (process.platform === 'win32') {
    candidates.push('C:\\Program Files\\GitHub CLI\\gh.exe');
  } else {
    candidates.push('/usr/bin/gh', '/usr/local/bin/gh', '/snap/bin/gh');
  }
  for (const candidate of candidates) {
    try {
      return await ctx.subprocess.resolveExecutable(candidate, undefined, signal);
    } catch {
      // Try the next well-known location.
    }
  }
  throw new RequestError(
    503,
    'GitHub CLI (gh) is not installed. Install it from https://cli.github.com and run `gh auth login`.',
  );
}

function githubCliError(result) {
  const detail = `${result.stderr || ''}\n${result.stdout || ''}`.trim();
  if (/auth login|not logged in|authentication|GH_TOKEN|HTTP 401|requires authentication/i.test(detail)) {
    return 'GitHub CLI is not authenticated. Run `gh auth login`, then try again.';
  }
  if (/already exists/i.test(detail)) {
    return 'A GitHub repository with that name already exists. Choose another name.';
  }
  if (!detail) return 'GitHub CLI could not create the repository.';
  return detail.length > 4000 ? `${detail.slice(0, 4000)}\n[truncated]` : detail;
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
    githubUrl: status.githubUrl,
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
  return runCommand(ctx, 'git', args, cwd, signal, options);
}

async function runCommand(ctx, executable, args, cwd, signal, options = {}) {
  const resolved = await ctx.subprocess.resolveExecutable(executable, undefined, signal);
  const handle = ctx.subprocess.spawn({
    argv: [resolved, ...args],
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
