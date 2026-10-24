window.__ModuleLoader__.load({
  id: '@local/dsh-commit-message',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'dshCommitMessage';
    const ROUTE = '/__dsh/commit-message';
    const KIND = 'source-control';
    const TAB_ID = '@local/dsh-commit-message';

    const EN = {
      title: 'Source control',
      messageLabel: 'Commit message',
      messagePlaceholder: 'Message ({key} to commit on "{branch}")',
      changes: 'Changes',
      openFile: 'Open {path}',
      openFileFailed: 'Could not open {path}.',
      showPanel: 'Toggle source control panel',
      generate: 'Generate',
      generating: 'Generating…',
      refresh: 'Refresh changes',
      refreshAria: 'Refresh the Git working tree status',
      commit: 'Commit',
      committing: 'Committing…',
      pushOne: 'Push 1 commit',
      pushMany: 'Push {count} commits',
      pushing: 'Pushing…',
      pushAria: 'Push unpushed commits to the upstream branch',
      unpushedCommits: 'Unpushed commits',
      pushedOne: 'Pushed 1 commit to {upstream}.',
      pushedMany: 'Pushed {count} commits to {upstream}.',
      placeholder: 'Generate a message, or write one yourself. Committing stages and commits all current changes.',
      checking: 'Checking the working tree…',
      notRepo: 'This session is not in a Git repository.',
      noChanges: 'No uncommitted changes.',
      oneFile: '1 changed file',
      files: '{count} changed files',
      generated: 'Message generated. Review it, then commit.',
      committed: 'Committed {hash}.',
      generateAria: 'Generate a commit message from the current changes',
      commitAria: 'Commit all current changes with this message',
      detached: 'detached HEAD',
      requestFailed: 'The commit message request failed.',
      networkFailed: 'Could not reach the Harness host.',
      unreadable: 'The commit message endpoint returned an unreadable response.',
    };

    const ZH = {
      title: '源代码管理',
      messageLabel: '提交信息',
      messagePlaceholder: '提交信息（{key} 在“{branch}”上提交）',
      changes: '更改',
      openFile: '打开 {path}',
      openFileFailed: '无法打开 {path}。',
      showPanel: '切换源代码管理面板',
      generate: '生成',
      generating: '正在生成…',
      refresh: '刷新更改',
      refreshAria: '刷新 Git 工作区状态',
      commit: '提交',
      committing: '正在提交…',
      pushOne: '推送 1 个提交',
      pushMany: '推送 {count} 个提交',
      pushing: '正在推送…',
      pushAria: '将未推送的提交推送到上游分支',
      unpushedCommits: '未推送的提交',
      pushedOne: '已将 1 个提交推送到 {upstream}。',
      pushedMany: '已将 {count} 个提交推送到 {upstream}。',
      placeholder: '生成一条提交信息，或自己填写。提交时会暂存并提交所有当前更改。',
      checking: '正在检查工作区…',
      notRepo: '当前会话不在 Git 仓库中。',
      noChanges: '没有未提交的更改。',
      oneFile: '1 个文件已更改',
      files: '{count} 个文件已更改',
      generated: '提交信息已生成，请检查后提交。',
      committed: '已提交 {hash}。',
      generateAria: '根据当前更改生成提交信息',
      commitAria: '使用这条信息提交所有当前更改',
      detached: '游离 HEAD',
      requestFailed: '提交信息请求失败。',
      networkFailed: '无法连接到 Harness 主机。',
      unreadable: '提交信息接口返回了无法解析的响应。',
    };

    function useTranslate(ctx) {
      const [, bump] = React.useReducer((value) => value + 1, 0);
      React.useEffect(() => ctx.locale.subscribe(bump), [ctx]);
      const translate = React.useMemo(() => ctx.locale.bind(NS), [ctx]);
      return React.useCallback(
        (key) => {
          let value;
          try {
            value = translate(key);
          } catch {
            value = key;
          }
          if (typeof value !== 'string' || value === key) return EN[key] ?? key;
          return value;
        },
        [translate],
      );
    }

    function format(translate, key, values) {
      let text = translate(key);
      for (const [name, value] of Object.entries(values)) {
        text = text.replaceAll(`{${name}}`, String(value));
      }
      return text;
    }

    function readStatus(data) {
      const commits = Array.isArray(data.commits)
        ? data.commits
            .slice(0, 8)
            .map((commit) => ({
              hash: typeof commit?.hash === 'string' ? commit.hash : '',
              shortHash: typeof commit?.shortHash === 'string' ? commit.shortHash : '',
              subject: typeof commit?.subject === 'string' ? commit.subject : '',
              author: typeof commit?.author === 'string' ? commit.author : '',
              timestamp: Number(commit?.timestamp) || 0,
            }))
            .filter((commit) => commit.hash)
        : [];
      const files = Array.isArray(data.files)
        ? data.files
            .slice(0, 500)
            .map((file) => ({
              path: typeof file?.path === 'string' ? file.path : '',
              workspacePath: typeof file?.workspacePath === 'string' ? file.workspacePath : null,
              status: typeof file?.status === 'string' ? file.status : '',
              untracked: Boolean(file?.untracked),
              staged: Boolean(file?.staged),
              unstaged: Boolean(file?.unstaged),
            }))
            .filter((file) => file.path)
        : [];
      return {
        isRepo: Boolean(data.isRepo),
        cwd: typeof data.cwd === 'string' ? data.cwd : '',
        top: typeof data.top === 'string' ? data.top : '',
        branch: typeof data.branch === 'string' ? data.branch : '',
        upstream: typeof data.upstream === 'string' ? data.upstream : '',
        ahead: Number(data.ahead) || 0,
        behind: Number(data.behind) || 0,
        hasCommits: Boolean(data.hasCommits),
        commits,
        files,
        changedFiles: Number(data.changedFiles) || 0,
        stagedFiles: Number(data.stagedFiles) || 0,
        unstagedFiles: Number(data.unstagedFiles) || 0,
        untrackedFiles: Number(data.untrackedFiles) || 0,
      };
    }

    function fileAddress(sessionId, path) {
      const normalized = path.replace(/\\/g, '/').replace(/^(?:\.\/)+/, '');
      const encoded = normalized
        .split('/')
        .map((segment) => encodeURIComponent(segment).replace(/%3A/gi, ':'))
        .join('/');
      const session = encodeURIComponent(sessionId).replace(/%3A/gi, ':');
      return `dsh-resource://file/session/${session}/${encoded}`;
    }

    function splitFilePath(path) {
      const normalized = path.replace(/\\/g, '/');
      const cut = normalized.lastIndexOf('/');
      if (cut === -1) return { name: normalized, directory: '' };
      return { name: normalized.slice(cut + 1), directory: normalized.slice(0, cut) };
    }

    function statusLetter(file) {
      if (file.untracked) return 'U';
      if (file.status.includes('D')) return 'D';
      if (file.status.includes('R')) return 'R';
      if (file.status.includes('C')) return 'C';
      if (file.status.includes('A')) return 'A';
      return 'M';
    }

    function commitDate(timestamp) {
      if (!timestamp) return '';
      try {
        return new Date(timestamp * 1000).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        });
      } catch {
        return '';
      }
    }

    function statusText(translate, status) {
      if (!status) return translate('checking');
      if (!status.isRepo) return translate('notRepo');
      if (status.changedFiles === 0) return translate('noChanges');
      if (status.changedFiles === 1) return translate('oneFile');
      return format(translate, 'files', { count: status.changedFiles });
    }

    function GitIcon() {
      return h(
        'svg',
        {
          width: 15,
          height: 15,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        h('path', { d: 'M4.5 3.5v9' }),
        h('circle', { cx: 4.5, cy: 3.5, r: 1.7 }),
        h('circle', { cx: 11.5, cy: 12.5, r: 1.7 }),
        h('path', { d: 'M11.5 10.8V8.5a3 3 0 0 0-3-3H7.2' }),
      );
    }

    function SparkIcon() {
      return h(
        'svg',
        {
          width: 14,
          height: 14,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        h('path', { d: 'M8 1.8l1.1 3.1L12.2 6l-3.1 1.1L8 10.2 6.9 7.1 3.8 6l3.1-1.1L8 1.8z' }),
        h('path', { d: 'M12.6 10.2l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7z' }),
      );
    }

    function RefreshIcon() {
      return h(
        'svg',
        {
          width: 14,
          height: 14,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        h('path', { d: 'M13 8a5 5 0 1 1-1.5-3.5' }),
        h('path', { d: 'M13 2.8v3.4H9.6' }),
      );
    }

    function PushIcon() {
      return h(
        'svg',
        {
          width: 14,
          height: 14,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        h('path', { d: 'M8 10V2.5' }),
        h('path', { d: 'M5.2 5.3L8 2.5l2.8 2.8' }),
        h('path', { d: 'M2.8 10.5v2.2c0 .4.3.8.8.8h8.8c.5 0 .8-.4.8-.8v-2.2' }),
      );
    }

    function CheckIcon() {
      return h(
        'svg',
        {
          width: 14,
          height: 14,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        h('path', { d: 'M3 8.5l3.2 3.2L13 5' }),
      );
    }

    function DisclosureIcon(props) {
      return h(
        'svg',
        {
          width: 12,
          height: 12,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.7,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
          style: { transform: props.open ? 'rotate(90deg)' : 'none', transition: 'transform 120ms ease' },
        },
        h('path', { d: 'M6 4l4 4-4 4' }),
      );
    }

    function CommitTrigger(props) {
      const translate = useTranslate(props.clientCtx);
      function openPanel() {
        try {
          const sidebar = props.clientCtx.sidebarRight;
          const active = sidebar.active();
          if (sidebar.isExpanded() && active?.kind === KIND) {
            sidebar.toggleExpanded();
            return;
          }
          sidebar.openTab(KIND);
        } catch (error) {
          console.error('commit-message: could not toggle the right sidebar', error);
        }
      }
      return h(
        'button',
        {
          type: 'button',
          className: 'dshcm-trigger',
          onClick: openPanel,
          'aria-label': translate('showPanel'),
          title: translate('showPanel'),
        },
        h(GitIcon),
      );
    }

    function CommitTabTitle(props) {
      const translate = useTranslate(props.clientCtx);
      return h(
        'span',
        { className: 'dshcm-tabTitle' },
        h(GitIcon),
        h('span', null, translate('title')),
      );
    }

    function CommitDock(props) {
      const sessionId = props.sessionId;
      const translate = useTranslate(props.clientCtx);
      const [status, setStatus] = React.useState(null);
      const [message, setMessage] = React.useState('');
      const [busy, setBusy] = React.useState('status');
      const [feedback, setFeedback] = React.useState(null);
      const [changesOpen, setChangesOpen] = React.useState(true);
      const active = React.useRef(null);
      const focusController = React.useRef(null);
      const busyRef = React.useRef('status');
      const lastSession = React.useRef(sessionId);

      React.useEffect(() => {
        busyRef.current = busy;
      }, [busy]);

      const request = React.useCallback(
        async (action, payload, signal) => {
          let response;
          try {
            response = await fetch(ROUTE, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ action, sessionId, ...payload }),
              signal,
            });
          } catch (error) {
            if (error && error.name === 'AbortError') throw error;
            throw new Error(translate('networkFailed'));
          }
          let data;
          try {
            data = await response.json();
          } catch {
            throw new Error(translate('unreadable'));
          }
          if (!response.ok || !data || data.ok !== true) {
            throw new Error((data && typeof data.error === 'string' && data.error) || translate('requestFailed'));
          }
          return data;
        },
        [sessionId, translate],
      );

      React.useEffect(() => {
        const changedSession = lastSession.current !== sessionId;
        lastSession.current = sessionId;
        let alive = true;
        const controller = new AbortController();
        if (changedSession) {
          setStatus(null);
          setMessage('');
          setFeedback(null);
        }
        setBusy('status');
        request('status', {}, controller.signal)
          .then((data) => {
            if (alive) setStatus(readStatus(data));
          })
          .catch((error) => {
            if (!alive || (error && error.name === 'AbortError')) return;
            setFeedback({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
          })
          .finally(() => {
            if (alive) setBusy(null);
          });
        return () => {
          alive = false;
          controller.abort();
        };
      }, [sessionId]);

      React.useEffect(() => {
        return () => {
          if (active.current) active.current.abort();
        };
      }, []);

      React.useEffect(() => {
        const refreshOnFocus = () => {
          if (document.visibilityState !== 'visible' || busyRef.current) return;
          if (focusController.current) focusController.current.abort();
          const controller = new AbortController();
          focusController.current = controller;
          request('status', {}, controller.signal)
            .then((data) => setStatus(readStatus(data)))
            .catch(() => {})
            .finally(() => {
              if (focusController.current === controller) focusController.current = null;
            });
        };
        window.addEventListener('focus', refreshOnFocus);
        document.addEventListener('visibilitychange', refreshOnFocus);
        return () => {
          window.removeEventListener('focus', refreshOnFocus);
          document.removeEventListener('visibilitychange', refreshOnFocus);
          if (focusController.current) focusController.current.abort();
        };
      }, [request]);

      async function refresh() {
        if (busy) return;
        setBusy('status');
        setFeedback(null);
        try {
          const data = await request('status', {});
          setStatus(readStatus(data));
        } catch (error) {
          setFeedback({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
        } finally {
          setBusy(null);
        }
      }

      function openFile(file) {
        if (!file.workspacePath || file.status.includes('D')) return;
        try {
          props.clientCtx.sidebarRight.openResource(fileAddress(sessionId, file.workspacePath));
        } catch (error) {
          console.error('commit-message: could not open file', error);
          setFeedback({ kind: 'error', text: format(translate, 'openFileFailed', { path: file.path }) });
        }
      }

      const canGenerate = Boolean(status && status.isRepo && status.changedFiles > 0) && !busy;
      const canCommit = canGenerate && message.trim().length > 0;
      const canPush = Boolean(status && status.hasCommits && status.ahead > 0) && !busy;

      async function generate() {
        if (!canGenerate) return;
        const controller = new AbortController();
        active.current = controller;
        setBusy('generate');
        setFeedback(null);
        try {
          const data = await request('generate', {}, controller.signal);
          setMessage(String(data.message || ''));
          setStatus(readStatus(data));
          setFeedback({ kind: 'success', text: translate('generated') });
        } catch (error) {
          if (error && error.name === 'AbortError') return;
          setFeedback({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
        } finally {
          if (active.current === controller) active.current = null;
          setBusy(null);
        }
      }

      async function commit() {
        if (!canCommit) return;
        setBusy('commit');
        setFeedback(null);
        try {
          const data = await request('commit', { message: message.trim() });
          setStatus(readStatus(data));
          setMessage('');
          setFeedback({
            kind: 'success',
            text: format(translate, 'committed', { hash: data.hash || 'HEAD' }),
          });
        } catch (error) {
          setFeedback({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
        } finally {
          setBusy(null);
        }
      }

      async function pushCommits() {
        if (!canPush) return;
        setBusy('push');
        setFeedback(null);
        try {
          const data = await request('push', {});
          setStatus(readStatus(data));
          const count = Number(data.pushed) || 1;
          const upstream = data.upstream || 'upstream';
          setFeedback({
            kind: 'success',
            text: format(translate, count === 1 ? 'pushedOne' : 'pushedMany', {
              count,
              upstream,
            }),
          });
        } catch (error) {
          setFeedback({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
        } finally {
          setBusy(null);
        }
      }

      function onMessageKeyDown(event) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter' && canCommit) {
          event.preventDefault();
          commit();
        }
      }

      const summary = statusText(translate, status);
      const commitKey =
        typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
          ? '⌘Enter'
          : 'Ctrl+Enter';
      const messagePlaceholder =
        status && status.isRepo
          ? format(translate, 'messagePlaceholder', {
              key: commitKey,
              branch: status.branch || translate('detached'),
            })
          : translate('placeholder');
      const showPush = Boolean(status && status.isRepo && status.hasCommits && status.ahead > 0);
      const changesSection = status && status.isRepo
        ? h(
            'div',
            { className: 'dshcm-changes' },
            h(
              'button',
              {
                type: 'button',
                className: 'dshcm-sectionToggle',
                onClick: () => setChangesOpen((value) => !value),
                'aria-expanded': changesOpen,
              },
              h(DisclosureIcon, { open: changesOpen }),
              h('span', { className: 'dshcm-sectionTitle' }, translate('changes')),
              h('span', { className: 'dshcm-sectionCount' }, String(status.changedFiles)),
            ),
            changesOpen
              ? status.files.length > 0
                ? h(
                    'ul',
                    { className: 'dshcm-fileList' },
                    status.files.map((file) => {
                      const parts = splitFilePath(file.workspacePath || file.path);
                      const letter = statusLetter(file);
                      const tone =
                        letter === 'D' ? 'deleted' : letter === 'U' || letter === 'A' ? 'new' : 'modified';
                      const openable = Boolean(file.workspacePath) && !file.status.includes('D');
                      return h(
                        'li',
                        { key: file.path },
                        h(
                          'button',
                          {
                            type: 'button',
                            className: 'dshcm-fileRow',
                            disabled: !openable,
                            onClick: () => openFile(file),
                            title: openable
                              ? format(translate, 'openFile', { path: file.path })
                              : file.path,
                          },
                          h(
                            'span',
                            { className: 'dshcm-fileText' },
                            h('span', { className: 'dshcm-fileName' }, parts.name),
                            parts.directory
                              ? h('span', { className: 'dshcm-fileDir' }, parts.directory)
                              : null,
                          ),
                          h(
                            'span',
                            { className: `dshcm-fileStatus dshcm-fileStatus--${tone}` },
                            letter,
                          ),
                        ),
                      );
                    }),
                  )
                : h('div', { className: 'dshcm-empty' }, translate('noChanges'))
              : null,
          )
        : null;
      const commitsSection = status && status.isRepo && status.commits.length > 0
        ? h(
            'div',
            { className: 'dshcm-commits' },
            h(
              'div',
              { className: 'dshcm-commitsHead' },
              h('span', { className: 'dshcm-commitsTitle' }, translate('unpushedCommits')),
              status.upstream
                ? h('span', { className: 'dshcm-upstream' }, status.upstream)
                : null,
            ),
            h(
              'ul',
              { className: 'dshcm-commitList', 'aria-label': translate('unpushedCommits') },
              status.commits.map((commit) =>
                h(
                  'li',
                  { key: commit.hash, className: 'dshcm-commitRow', title: commit.subject },
                  h('code', { className: 'dshcm-hash' }, commit.shortHash || commit.hash.slice(0, 7)),
                  h('span', { className: 'dshcm-subject' }, commit.subject),
                  h(
                    'span',
                    { className: 'dshcm-meta' },
                    [commit.author, commitDate(commit.timestamp)].filter(Boolean).join(' · '),
                  ),
                ),
              ),
            ),
          )
        : null;

      return h(
        React.Fragment,
        null,
        h('style', null, CSS),
        h(
          'div',
          { className: 'dshcm-root', id: `dshcm-panel-${sessionId}`, 'data-session': sessionId },
          h(
            'div',
            { className: 'dshcm-header' },
            h('span', { className: 'dshcm-title' }, translate('title')),
            h(
              'div',
              { className: 'dshcm-headerActions' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dshcm-iconButton',
                  disabled: Boolean(busy),
                  onClick: refresh,
                  'aria-label': translate('refreshAria'),
                  title: translate('refreshAria'),
                },
                h(RefreshIcon),
              ),
            ),
          ),
          feedback
            ? h(
                'div',
                {
                  className: `dshcm-feedback dshcm-feedback--${feedback.kind}`,
                  role: 'status',
                  'aria-live': 'polite',
                },
                feedback.text,
              )
            : null,
          h(
            'div',
            { className: 'dshcm-body' },
            h(
              'div',
              { className: 'dshcm-message' },
              h('textarea', {
                className: 'dshcm-input',
                value: message,
                rows: 4,
                spellCheck: true,
                placeholder: messagePlaceholder,
                disabled: Boolean(busy),
                onChange: (event) => setMessage(event.target.value),
                onKeyDown: onMessageKeyDown,
                'aria-label': translate('messageLabel'),
              }),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dshcm-inlineGenerate',
                  disabled: !canGenerate,
                  onClick: generate,
                  'aria-label': busy === 'generate' ? translate('generating') : translate('generateAria'),
                  title: busy === 'generate' ? translate('generating') : translate('generateAria'),
                },
                h(SparkIcon),
              ),
            ),
            h(
              'div',
              { className: 'dshcm-actions' },
              showPush
                ? h(
                    'button',
                    {
                      type: 'button',
                      className: 'dshcm-button dshcm-push',
                      disabled: !canPush,
                      onClick: pushCommits,
                      'aria-label': translate('pushAria'),
                      title: translate('pushAria'),
                    },
                    h(PushIcon),
                    busy === 'push'
                      ? translate('pushing')
                      : format(translate, status.ahead === 1 ? 'pushOne' : 'pushMany', {
                          count: status.ahead,
                        }),
                  )
                : null,
              h(
                'button',
                {
                  type: 'button',
                  className: 'dshcm-button dshcm-commit',
                  disabled: !canCommit,
                  onClick: commit,
                  'aria-label': translate('commitAria'),
                  title: translate('commitAria'),
                },
                h(CheckIcon),
                busy === 'commit' ? translate('committing') : translate('commit'),
              ),
            ),
            h(
              'div',
              { className: 'dshcm-statusLine', 'aria-live': 'polite' },
              busy === 'status' ? translate('checking') : summary,
            ),
            changesSection,
            commitsSection,
          ),
        ),
      );
    }

    const CSS = `
.dshcm-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: 0 1px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  transition: background 100ms ease, color 100ms ease, border-color 100ms ease;
}
.dshcm-trigger:hover {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
}
.dshcm-trigger:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-tabTitle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.dshcm-root {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 12px 14px 18px;
  overflow: auto;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  line-height: 1.45;
}
.dshcm-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 0 8px;
}
.dshcm-title {
  font-weight: 650;
  color: var(--dsw-alias-label-primary);
  font-size: 11.5px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
}
.dshcm-headerActions {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
}
.dshcm-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 26px;
  padding: 3px 9px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-weight: 550;
  cursor: pointer;
  transition: background 100ms ease, color 100ms ease, border-color 100ms ease;
}
.dshcm-button:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
}
.dshcm-button:focus-visible,
.dshcm-iconButton:focus-visible,
.dshcm-input:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-button:disabled {
  opacity: 0.48;
  cursor: default;
}
.dshcm-commit {
  flex: 1 1 160px;
  min-height: 32px;
  background: var(--dsw-alias-bg-layer-2);
  border-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-brand-primary);
}
.dshcm-commit:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-1);
  border-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-brand-primary);
}
.dshcm-push {
  flex: 0 0 auto;
  min-height: 32px;
  color: var(--dsw-alias-label-primary);
}
.dshcm-iconButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
}
.dshcm-iconButton:hover {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
}
.dshcm-iconButton:disabled {
  opacity: 0.48;
  cursor: default;
}
.dshcm-body {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 0;
}
.dshcm-message {
  position: relative;
}
.dshcm-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 96px;
  max-height: 260px;
  resize: vertical;
  padding: 9px 42px 9px 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 8px;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  line-height: 1.5;
}
.dshcm-input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 0.85;
}
.dshcm-inlineGenerate {
  position: absolute;
  top: 6px;
  right: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-brand-primary);
  cursor: pointer;
}
.dshcm-inlineGenerate:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2);
}
.dshcm-inlineGenerate:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-inlineGenerate:disabled {
  opacity: 0.42;
  cursor: default;
}
.dshcm-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.dshcm-statusLine {
  min-height: 16px;
  padding: 0 2px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
}
.dshcm-changes {
  border-top: 1px solid var(--dsw-alias-border-l1);
  padding-top: 7px;
}
.dshcm-sectionToggle {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 0 2px 4px;
  border: 0;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.dshcm-sectionToggle:hover {
  color: var(--dsw-alias-label-primary);
}
.dshcm-sectionToggle:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-sectionTitle {
  color: var(--dsw-alias-label-primary);
  font-size: 12px;
  font-weight: 600;
}
.dshcm-sectionCount {
  margin-left: auto;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
}
.dshcm-fileList {
  max-height: 280px;
  margin: 0;
  padding: 0;
  overflow: auto;
  list-style: none;
}
.dshcm-fileRow {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 5px 6px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.dshcm-fileRow:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2);
}
.dshcm-fileRow:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: -1px;
}
.dshcm-fileRow:disabled {
  opacity: 0.55;
  cursor: default;
}
.dshcm-fileText {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}
.dshcm-fileName {
  flex: 0 1 auto;
  max-width: 62%;
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  font-size: 12.5px;
  font-weight: 550;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-fileDir {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-fileStatus {
  flex: 0 0 14px;
  width: 14px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-weight: 650;
  text-align: center;
}
.dshcm-fileStatus--new {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-fileStatus--modified {
  color: var(--dsw-alias-brand-primary);
}
.dshcm-fileStatus--deleted {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-empty {
  padding: 4px 2px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}
.dshcm-commits {
  border-top: 1px solid var(--dsw-alias-border-l1);
  padding-top: 7px;
}
.dshcm-commitsHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 1px 3px;
}
.dshcm-commitsTitle {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.dshcm-upstream {
  max-width: 220px;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-commitList {
  max-height: 220px;
  margin: 0;
  padding: 0;
  overflow: auto;
  list-style: none;
}
.dshcm-commitRow {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 4px 1px;
  border-top: 1px solid var(--dsw-alias-border-l1);
}
.dshcm-commitRow:first-child {
  border-top: none;
}
.dshcm-hash {
  flex: 0 0 auto;
  color: var(--dsw-alias-brand-primary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
}
.dshcm-subject {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-meta {
  flex: 0 0 auto;
  max-width: 170px;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-feedback {
  padding: 0 0 8px;
  font-size: 12px;
}
.dshcm-feedback--error {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-feedback--success {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-feedback--info {
  color: var(--dsw-alias-label-secondary);
}
`;

    return {
      inject: ['slots', 'locale', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        const t = ctx.locale.bind(NS);
        const Dock = (props) => h(CommitDock, { ...props, clientCtx: ctx });
        const Trigger = (props) => h(CommitTrigger, { ...props, clientCtx: ctx });
        const Title = (props) => h(CommitTabTitle, { ...props, clientCtx: ctx });
        ctx.effect(() => ctx.locale.register(NS, 'en', EN), 'commit-message: en locale');
        ctx.effect(() => ctx.locale.register(NS, 'zh', ZH), 'commit-message: zh locale');
        ctx.effect(
          () =>
            ctx.sidebarRightTabs.register({
              id: TAB_ID,
              kind: KIND,
              keepMounted: true,
              title: () => t('title'),
            }),
          'commit-message: sidebar tab type',
        );
        ctx.effect(
          () =>
            ctx.slots.inject('sidebar.right.pane.tab', () =>
              ctx.slots.register(
                { name: 'sidebar.right.pane.tab', key: TAB_ID, locale: NS },
                Dock,
              ),
            ),
          'commit-message: sidebar tab body',
        );
        ctx.effect(
          () =>
            ctx.slots.inject('sidebar.right.pane.tab.title', () =>
              ctx.slots.register(
                { name: 'sidebar.right.pane.tab.title', key: TAB_ID, locale: NS },
                Title,
              ),
            ),
          'commit-message: sidebar tab title',
        );
        ctx.effect(
          () =>
            ctx.slots.inject('conversation.input.right', () =>
              ctx.slots.register(
                {
                  name: 'conversation.input.right',
                  id: 'commit-message-trigger',
                  order: 10,
                  label: () => t('title'),
                },
                Trigger,
              ),
            ),
          'commit-message: composer trigger',
        );
      },
    };
  },
});
