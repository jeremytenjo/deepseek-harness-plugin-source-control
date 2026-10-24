window.__ModuleLoader__.load({
  id: '@local/dsh-commit-message',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'dshCommitMessage';
    const ROUTE = '/__dsh/commit-message';

    const EN = {
      title: 'Commit message',
      generate: 'Generate',
      generating: 'Generating…',
      refresh: 'Refresh changes',
      refreshAria: 'Refresh the Git working tree status',
      commit: 'Commit changes',
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
      collapse: 'Collapse commit message panel',
      expand: 'Expand commit message panel',
      generateAria: 'Generate a commit message from the current changes',
      commitAria: 'Commit all current changes with this message',
      detached: 'detached HEAD',
      requestFailed: 'The commit message request failed.',
      networkFailed: 'Could not reach the Harness host.',
      unreadable: 'The commit message endpoint returned an unreadable response.',
      shortcut: '⌘↵ or Ctrl↵ to commit',
    };

    const ZH = {
      title: '提交信息',
      generate: '生成',
      generating: '正在生成…',
      refresh: '刷新更改',
      refreshAria: '刷新 Git 工作区状态',
      commit: '提交更改',
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
      collapse: '收起提交信息面板',
      expand: '展开提交信息面板',
      generateAria: '根据当前更改生成提交信息',
      commitAria: '使用这条信息提交所有当前更改',
      detached: '游离 HEAD',
      requestFailed: '提交信息请求失败。',
      networkFailed: '无法连接到 Harness 主机。',
      unreadable: '提交信息接口返回了无法解析的响应。',
      shortcut: '⌘↵ 或 Ctrl↵ 提交',
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
        changedFiles: Number(data.changedFiles) || 0,
        stagedFiles: Number(data.stagedFiles) || 0,
        unstagedFiles: Number(data.unstagedFiles) || 0,
        untrackedFiles: Number(data.untrackedFiles) || 0,
      };
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

    function ChevronIcon(props) {
      return h(
        'svg',
        {
          width: 14,
          height: 14,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
          style: { transform: props.open ? 'rotate(180deg)' : 'none', transition: 'transform 120ms ease' },
        },
        h('path', { d: 'M4 6l4 4 4-4' }),
      );
    }

    function CommitDock(props) {
      const sessionId = props.sessionId;
      const translate = useTranslate(props.clientCtx);
      const [open, setOpen] = React.useState(true);
      const [status, setStatus] = React.useState(null);
      const [message, setMessage] = React.useState('');
      const [busy, setBusy] = React.useState('status');
      const [feedback, setFeedback] = React.useState(null);
      const active = React.useRef(null);
      const focusController = React.useRef(null);
      const busyRef = React.useRef('status');

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
        let alive = true;
        const controller = new AbortController();
        setStatus(null);
        setMessage('');
        setFeedback(null);
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
          setOpen(true);
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

      const branchLabel = status && status.isRepo ? status.branch || translate('detached') : '';
      const summary = statusText(translate, status);
      const showPush = Boolean(status && status.isRepo && status.hasCommits && status.ahead > 0);
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
          { className: 'dshcm-root', 'data-session': sessionId },
          h(
            'div',
            { className: 'dshcm-header' },
            h(
              'div',
              { className: 'dshcm-heading' },
              h('span', { className: 'dshcm-mark', 'aria-hidden': true }, h(GitIcon)),
              h('span', { className: 'dshcm-title' }, translate('title')),
              branchLabel
                ? h(
                    'span',
                    { className: 'dshcm-branch', title: status.top || status.cwd },
                    h('span', { className: 'dshcm-branchDot', 'aria-hidden': true }),
                    branchLabel,
                  )
                : null,
              status && status.isRepo && status.changedFiles > 0
                ? h('span', { className: 'dshcm-count' }, summary)
                : null,
            ),
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
              h(
                'button',
                {
                  type: 'button',
                  className: 'dshcm-button dshcm-generate',
                  disabled: !canGenerate,
                  onClick: generate,
                  'aria-label': translate('generateAria'),
                  title: translate('generateAria'),
                },
                h(SparkIcon),
                h('span', null, busy === 'generate' ? translate('generating') : translate('generate')),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dshcm-iconButton',
                  onClick: () => setOpen((value) => !value),
                  'aria-expanded': open,
                  'aria-label': open ? translate('collapse') : translate('expand'),
                  title: open ? translate('collapse') : translate('expand'),
                },
                h(ChevronIcon, { open }),
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
          open
            ? h(
                'div',
                { className: 'dshcm-body' },
                h('textarea', {
                  className: 'dshcm-input',
                  value: message,
                  rows: 3,
                  spellCheck: true,
                  placeholder: translate('placeholder'),
                  disabled: Boolean(busy),
                  onChange: (event) => setMessage(event.target.value),
                  onKeyDown: onMessageKeyDown,
                  'aria-label': translate('title'),
                }),
                commitsSection,
                h(
                  'div',
                  { className: 'dshcm-footer' },
                  h(
                    'span',
                    { className: 'dshcm-status', 'aria-live': 'polite' },
                    busy === 'status' ? translate('checking') : summary,
                    status && status.isRepo && status.changedFiles > 0
                      ? h('span', { className: 'dshcm-shortcut' }, translate('shortcut'))
                      : null,
                  ),
                  h(
                    'div',
                    { className: 'dshcm-footerActions' },
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
                      busy === 'commit' ? translate('committing') : translate('commit'),
                    ),
                  ),
                ),
              )
            : null,
        ),
      );
    }

    const CSS = `
.dshcm-root {
  box-sizing: border-box;
  width: 100%;
  margin: 0 0 8px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font-size: 12.5px;
  line-height: 1.45;
  overflow: hidden;
}
.dshcm-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 7px 9px;
}
.dshcm-heading {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  flex: 1 1 180px;
}
.dshcm-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  border-radius: 7px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-brand-primary);
}
.dshcm-title {
  font-weight: 600;
  color: var(--dsw-alias-label-primary);
  white-space: nowrap;
}
.dshcm-branch {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  max-width: 180px;
  padding: 1px 7px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  color: var(--dsw-alias-label-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dshcm-branchDot {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--dsw-alias-state-success-primary);
}
.dshcm-count {
  color: var(--dsw-alias-label-secondary);
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
.dshcm-generate {
  color: var(--dsw-alias-brand-primary);
  border-color: var(--dsw-alias-border-l2);
}
.dshcm-commit {
  background: var(--dsw-alias-bg-layer-2);
  border-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-brand-primary);
}
.dshcm-commit:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-1);
  border-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-brand-primary);
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
  gap: 7px;
  padding: 0 9px 9px;
}
.dshcm-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 62px;
  max-height: 180px;
  resize: vertical;
  padding: 7px 9px;
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
.dshcm-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.dshcm-footerActions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  flex-wrap: wrap;
}
.dshcm-push {
  color: var(--dsw-alias-label-primary);
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
  max-height: 136px;
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
.dshcm-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  flex: 1 1 180px;
}
.dshcm-shortcut {
  color: var(--dsw-alias-state-idle-primary);
  white-space: nowrap;
}
.dshcm-feedback {
  padding: 0 9px 7px;
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
      inject: ['slots', 'locale'],
      apply(ctx) {
        const Dock = (props) => h(CommitDock, { ...props, clientCtx: ctx });
        ctx.effect(() => ctx.locale.register(NS, 'en', EN), 'commit-message: en locale');
        ctx.effect(() => ctx.locale.register(NS, 'zh', ZH), 'commit-message: zh locale');
        ctx.effect(
          () =>
            ctx.slots.inject('conversation.input.dock', () =>
              ctx.slots.register(
                {
                  name: 'conversation.input.dock',
                  id: 'commit-message',
                  order: 30,
                  label: () => ctx.locale.bind(NS)('title'),
                },
                Dock,
              ),
            ),
          'commit-message: composer dock',
        );
      },
    };
  },
});
