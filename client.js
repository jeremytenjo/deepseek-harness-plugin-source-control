window.__ModuleLoader__.load({
  id: '@local/dsh-commit-message',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'dshCommitMessage';
    const ROUTE = '/__dsh/commit-message';
    const KIND = 'source-control';
    const TAB_ID = '@local/dsh-commit-message';
    const DIFF_KIND = 'source-control-diff';
    const DIFF_TAB_ID = '@local/dsh-commit-message/diff';

    const EN = {
      title: 'Source control',
      messageLabel: 'Commit message',
      messagePlaceholder: 'Message ({key} to commit on "{branch}")',
      changes: 'Changes',
      showChanges: 'Show changes in {path}',
      openChangesFailed: 'Could not open the changes for {path}.',
      diffTab: 'Changes: {name}',
      diffLoading: 'Loading changes…',
      diffFailed: 'Could not load the changes for this file.',
      diffRetry: 'Retry',
      diffEmpty: 'No textual changes to show.',
      diffBinary: 'This is a binary file; the changes are not shown.',
      diffTruncated: 'The diff is truncated.',
      diffOpenFile: 'Open file',
      diffOpenFileAria: 'Open {path} in the file viewer',
      diffRefreshAria: 'Refresh the changes for this file',
      diffAdded: '{count} added',
      diffRemoved: '{count} removed',
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
      githubOpen: 'Open the GitHub repository',
      githubCreate: 'Create a GitHub repository',
      githubModalTitle: 'Connect to GitHub',
      githubModalDescription: 'This repository is not connected to GitHub yet. Create a repository to publish it.',
      githubPrivate: 'Create private repo',
      githubPublic: 'Create public repo',
      githubPrivateHint: 'Only you and your collaborators can see it.',
      githubPublicHint: 'Anyone can see it.',
      githubCreateTitlePrivate: 'Create private repository',
      githubCreateTitlePublic: 'Create public repository',
      githubNameLabel: 'Repository name',
      githubNameHint: 'Letters, numbers, hyphens, underscores, and dots are allowed.',
      githubNameRequired: 'Enter a repository name.',
      githubNameInvalid: 'Enter a valid repository name.',
      githubCreateButton: 'Create',
      githubCreating: 'Creating…',
      githubBack: 'Back',
      githubClose: 'Close',
      githubCreated: 'Created {url}.',
      githubCreatedPushed: 'Created {url} and pushed the current branch.',
      githubCreatedNoCommit: 'Created {url}. Commit your changes, then push.',
      githubCreatedPushFailed: 'Created {url}, but the push failed: {error}',
      githubFailed: 'Could not create the repository.',
      githubAuthHint: 'Creating a repository uses the GitHub CLI. Install `gh` and run `gh auth login` first.',
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
      showChanges: '查看 {path} 的更改',
      openChangesFailed: '无法打开 {path} 的更改。',
      diffTab: '更改：{name}',
      diffLoading: '正在加载更改…',
      diffFailed: '无法加载此文件的更改。',
      diffRetry: '重试',
      diffEmpty: '没有可显示的文本更改。',
      diffBinary: '这是二进制文件，不显示更改。',
      diffTruncated: '差异已截断。',
      diffOpenFile: '打开文件',
      diffOpenFileAria: '在文件查看器中打开 {path}',
      diffRefreshAria: '刷新此文件的更改',
      diffAdded: '新增 {count} 行',
      diffRemoved: '删除 {count} 行',
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
      githubOpen: '打开 GitHub 仓库',
      githubCreate: '创建 GitHub 仓库',
      githubModalTitle: '连接到 GitHub',
      githubModalDescription: '此仓库尚未连接到 GitHub。创建一个仓库来发布它。',
      githubPrivate: '创建私有仓库',
      githubPublic: '创建公开仓库',
      githubPrivateHint: '只有你和协作者可以看到。',
      githubPublicHint: '任何人都可以看到。',
      githubCreateTitlePrivate: '创建私有仓库',
      githubCreateTitlePublic: '创建公开仓库',
      githubNameLabel: '仓库名称',
      githubNameHint: '允许使用字母、数字、连字符、下划线和点。',
      githubNameRequired: '请输入仓库名称。',
      githubNameInvalid: '请输入有效的仓库名称。',
      githubCreateButton: '创建',
      githubCreating: '正在创建…',
      githubBack: '返回',
      githubClose: '关闭',
      githubCreated: '已创建 {url}。',
      githubCreatedPushed: '已创建 {url} 并推送了当前分支。',
      githubCreatedNoCommit: '已创建 {url}。提交更改后再推送。',
      githubCreatedPushFailed: '已创建 {url}，但推送失败：{error}',
      githubFailed: '无法创建仓库。',
      githubAuthHint: '创建仓库需要使用 GitHub CLI。请先安装 `gh` 并运行 `gh auth login`。',
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
        githubUrl: typeof data.githubUrl === 'string' ? data.githubUrl : '',
        commits,
        files,
        changedFiles: Number(data.changedFiles) || 0,
        stagedFiles: Number(data.stagedFiles) || 0,
        unstagedFiles: Number(data.unstagedFiles) || 0,
        untrackedFiles: Number(data.untrackedFiles) || 0,
      };
    }

    function resourceAddress(kind, sessionId, path) {
      const normalized = path.replace(/\\/g, '/').replace(/^(?:\.\/)+/, '');
      const encoded = normalized
        .split('/')
        .map((segment) => encodeURIComponent(segment).replace(/%3A/gi, ':'))
        .join('/');
      const session = encodeURIComponent(sessionId).replace(/%3A/gi, ':');
      return `dsh-resource://${kind}/session/${session}/${encoded}`;
    }

    function fileAddress(sessionId, path) {
      return resourceAddress('file', sessionId, path);
    }

    function diffAddress(sessionId, path) {
      return resourceAddress('commit-message-diff', sessionId, path);
    }

    function decodeDiffPath(address) {
      const prefix = 'dsh-resource://commit-message-diff/session/';
      if (typeof address !== 'string' || !address.startsWith(prefix)) return '';
      const rest = address.slice(prefix.length);
      const cut = rest.indexOf('/');
      if (cut === -1 || cut === rest.length - 1) return '';
      return rest
        .slice(cut + 1)
        .split('/')
        .map((segment) => {
          try {
            return decodeURIComponent(segment);
          } catch {
            return segment;
          }
        })
        .join('/');
    }

    function basenameOf(path) {
      const normalized = String(path || '').replace(/\\/g, '/');
      const cut = normalized.lastIndexOf('/');
      return cut === -1 ? normalized : normalized.slice(cut + 1);
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

    function diffRows(text) {
      const source = String(text || '');
      if (!source) return [];
      const lines = source.endsWith('\n')
        ? source.slice(0, -1).split('\n')
        : source.split('\n');
      const rows = [];
      let oldLine = 0;
      let newLine = 0;
      let inHunk = false;
      for (const line of lines) {
        if (line.startsWith('diff --git ')) {
          inHunk = false;
          rows.push({ kind: 'meta', text: line });
          continue;
        }
        if (!inHunk && (line.startsWith('--- ') || line.startsWith('+++ '))) {
          rows.push({ kind: 'meta', text: line });
          continue;
        }
        if (line.startsWith('@@')) {
          const match = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
          if (match) {
            oldLine = Number(match[1]);
            newLine = Number(match[2]);
          }
          inHunk = true;
          rows.push({ kind: 'hunk', text: line });
          continue;
        }
        if (line.startsWith('\\ No newline at end of file')) {
          rows.push({ kind: 'meta', text: line });
          continue;
        }
        if (!inHunk) {
          rows.push({ kind: 'meta', text: line });
          continue;
        }
        if (line.startsWith('+')) {
          rows.push({ kind: 'add', old: null, new: newLine, text: line.slice(1) });
          newLine += 1;
          continue;
        }
        if (line.startsWith('-')) {
          rows.push({ kind: 'del', old: oldLine, new: null, text: line.slice(1) });
          oldLine += 1;
          continue;
        }
        if (line.startsWith(' ')) {
          rows.push({ kind: 'context', old: oldLine, new: newLine, text: line.slice(1) });
          oldLine += 1;
          newLine += 1;
          continue;
        }
        rows.push({ kind: 'meta', text: line });
      }
      return rows;
    }

    async function requestFileDiff(sessionId, path, signal, translate) {
      let response;
      try {
        response = await fetch(ROUTE, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'diff', sessionId, path }),
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
        throw new Error(
          (data && typeof data.error === 'string' && data.error) || translate('requestFailed'),
        );
      }
      return data;
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

    function GitHubIcon() {
      return h(
        'svg',
        {
          width: 14,
          height: 14,
          viewBox: '0 0 16 16',
          fill: 'currentColor',
          'aria-hidden': true,
          focusable: false,
        },
        h('path', {
          d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z',
        }),
      );
    }

    function LockIcon() {
      return h(
        'svg',
        {
          width: 15,
          height: 15,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        h('rect', { x: 3.2, y: 7, width: 9.6, height: 6.8, rx: 1.5 }),
        h('path', { d: 'M5.4 7V5.2a2.6 2.6 0 0 1 5.2 0V7' }),
      );
    }

    function GlobeIcon() {
      return h(
        'svg',
        {
          width: 15,
          height: 15,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        h('circle', { cx: 8, cy: 8, r: 5.6 }),
        h('path', { d: 'M2.4 8h11.2' }),
        h('path', { d: 'M8 2.4c1.8 1.5 2.7 3.4 2.7 5.6S9.8 12.1 8 13.6C6.2 12.1 5.3 10.2 5.3 8S6.2 3.9 8 2.4z' }),
      );
    }

    function CloseIcon() {
      return h(
        'svg',
        {
          width: 13,
          height: 13,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
          'aria-hidden': true,
          focusable: false,
        },
        h('path', { d: 'M4 4l8 8M12 4l-8 8' }),
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
      const [github, setGithub] = React.useState(null);
      const active = React.useRef(null);
      const focusController = React.useRef(null);
      const busyRef = React.useRef('status');
      const lastSession = React.useRef(sessionId);
      const githubButton = React.useRef(null);
      const githubModal = React.useRef(null);
      const githubWasOpen = React.useRef(false);

      React.useEffect(() => {
        busyRef.current = busy;
      }, [busy]);

      const githubOpen = Boolean(github);
      const githubStep = github ? github.step : null;

      React.useEffect(() => {
        if (!githubOpen) return undefined;
        const onKeyDown = (event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            setGithub(null);
          }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
      }, [githubOpen]);

      React.useEffect(() => {
        if (!github) return;
        const target =
          githubStep === 'choose'
            ? githubModal.current?.querySelector('[data-github-option]')
            : githubModal.current?.querySelector('input');
        if (target && typeof target.focus === 'function') target.focus();
      }, [githubStep]);

      React.useEffect(() => {
        if (githubWasOpen.current && !github) githubButton.current?.focus();
        githubWasOpen.current = Boolean(github);
      }, [github]);

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
          setGithub(null);
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

      function openDiff(file) {
        if (!file.path) return;
        try {
          props.clientCtx.sidebarRight.openResource(diffAddress(sessionId, file.path), {
            params: {
              sessionId,
              path: file.path,
              workspacePath: file.workspacePath,
              status: file.status,
              letter: statusLetter(file),
              untracked: file.untracked,
              staged: file.staged,
              unstaged: file.unstaged,
            },
          });
        } catch (error) {
          console.error('commit-message: could not open the file changes', error);
          setFeedback({
            kind: 'error',
            text: format(translate, 'openChangesFailed', { path: file.path }),
          });
        }
      }

      function openGitHub() {
        if (!status || !status.isRepo) return;
        if (status.githubUrl) {
          window.open(status.githubUrl, '_blank', 'noopener,noreferrer');
          return;
        }
        const folder = basenameOf(status.top || status.cwd) || 'repository';
        setGithub({ step: 'choose', visibility: 'private', name: folder, error: '' });
      }

      function chooseRepositoryVisibility(visibility) {
        setGithub((current) =>
          current ? { ...current, visibility, step: 'name', error: '' } : current,
        );
      }

      function closeGitHub() {
        setGithub(null);
      }

      function setRepositoryName(name) {
        setGithub((current) => (current ? { ...current, name, error: '' } : current));
      }

      async function createRepository() {
        if (!github || github.step === 'creating') return;
        const name = github.name.trim();
        if (!name) {
          setGithub((current) =>
            current ? { ...current, error: translate('githubNameRequired') } : current,
          );
          return;
        }
        if (!/^[A-Za-z0-9][A-Za-z0-9._-]*(?:\/[A-Za-z0-9][A-Za-z0-9._-]*)?$/.test(name)) {
          setGithub((current) =>
            current ? { ...current, error: translate('githubNameInvalid') } : current,
          );
          return;
        }

        setGithub((current) => (current ? { ...current, step: 'creating', error: '' } : current));
        try {
          const data = await request('create-github', {
            name,
            visibility: github.visibility,
          });
          setStatus(readStatus(data));
          const url = data.githubUrl || '';
          let text;
          if (data.pushed) {
            text = format(translate, 'githubCreatedPushed', { url });
          } else if (data.pushError) {
            text = format(translate, 'githubCreatedPushFailed', { url, error: data.pushError });
          } else if (!data.hasCommits) {
            text = format(translate, 'githubCreatedNoCommit', { url });
          } else {
            text = format(translate, 'githubCreated', { url });
          }
          setFeedback({ kind: data.pushError ? 'error' : 'success', text });
          setGithub(null);
        } catch (error) {
          setGithub((current) =>
            current
              ? {
                  ...current,
                  step: 'name',
                  error: error instanceof Error ? error.message : String(error),
                }
              : current,
          );
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
      const githubLabel =
        status && status.githubUrl ? translate('githubOpen') : translate('githubCreate');
      const githubIdSuffix = String(sessionId).replace(/[^A-Za-z0-9_-]/g, '-');
      const githubTitleId = `dshcm-github-title-${githubIdSuffix}`;
      const githubNameId = `dshcm-github-name-${githubIdSuffix}`;
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
                      return h(
                        'li',
                        { key: file.path },
                        h(
                          'button',
                          {
                            type: 'button',
                            className: 'dshcm-fileRow',
                            onClick: () => openDiff(file),
                            title: format(translate, 'showChanges', { path: file.path }),
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
                  ref: githubButton,
                  type: 'button',
                  className: 'dshcm-iconButton',
                  disabled: !status || !status.isRepo,
                  onClick: openGitHub,
                  'aria-label': githubLabel,
                  title: githubLabel,
                },
                h(GitHubIcon),
              ),
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
            ),
            h(
              'div',
              { className: 'dshcm-statusLine', 'aria-live': 'polite' },
              busy === 'status' ? translate('checking') : summary,
            ),
            changesSection,
            commitsSection,
          ),
          github
            ? h(
                'div',
                {
                  className: 'dshcm-modalBackdrop',
                  onMouseDown: (event) => {
                    if (event.target === event.currentTarget) setGithub(null);
                  },
                },
                h(
                  'div',
                  {
                    ref: githubModal,
                    className: 'dshcm-modal',
                    role: 'dialog',
                    'aria-modal': 'true',
                    'aria-labelledby': githubTitleId,
                  },
                  h(
                    'div',
                    { className: 'dshcm-modalHead' },
                    h(
                      'span',
                      { className: 'dshcm-modalTitle', id: githubTitleId },
                      github.step === 'choose'
                        ? translate('githubModalTitle')
                        : github.visibility === 'private'
                          ? translate('githubCreateTitlePrivate')
                          : translate('githubCreateTitlePublic'),
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'dshcm-iconButton',
                        onClick: closeGitHub,
                        'aria-label': translate('githubClose'),
                        title: translate('githubClose'),
                      },
                      h(CloseIcon),
                    ),
                  ),
                  github.step === 'choose'
                    ? h(
                        React.Fragment,
                        null,
                        h('p', { className: 'dshcm-modalText' }, translate('githubModalDescription')),
                        h(
                          'button',
                          {
                            type: 'button',
                            className: 'dshcm-repoOption',
                            'data-github-option': 'private',
                            onClick: () => chooseRepositoryVisibility('private'),
                          },
                          h('span', { className: 'dshcm-repoIcon' }, h(LockIcon)),
                          h(
                            'span',
                            { className: 'dshcm-repoText' },
                            h('span', { className: 'dshcm-repoTitle' }, translate('githubPrivate')),
                            h('span', { className: 'dshcm-repoHint' }, translate('githubPrivateHint')),
                          ),
                        ),
                        h(
                          'button',
                          {
                            type: 'button',
                            className: 'dshcm-repoOption',
                            'data-github-option': 'public',
                            onClick: () => chooseRepositoryVisibility('public'),
                          },
                          h('span', { className: 'dshcm-repoIcon' }, h(GlobeIcon)),
                          h(
                            'span',
                            { className: 'dshcm-repoText' },
                            h('span', { className: 'dshcm-repoTitle' }, translate('githubPublic')),
                            h('span', { className: 'dshcm-repoHint' }, translate('githubPublicHint')),
                          ),
                        ),
                        h('p', { className: 'dshcm-modalFoot' }, translate('githubAuthHint')),
                      )
                    : h(
                        'div',
                        { className: 'dshcm-modalForm' },
                        h('p', { className: 'dshcm-modalText' }, translate('githubModalDescription')),
                        h(
                          'label',
                          { className: 'dshcm-fieldLabel', htmlFor: githubNameId },
                          translate('githubNameLabel'),
                        ),
                        h('input', {
                          id: githubNameId,
                          className: 'dshcm-input dshcm-nameInput',
                          type: 'text',
                          value: github.name,
                          spellCheck: false,
                          autoComplete: 'off',
                          disabled: github.step === 'creating',
                          'aria-invalid': github.error ? 'true' : undefined,
                          onChange: (event) => setRepositoryName(event.target.value),
                          onKeyDown: (event) => {
                            if (event.key === 'Enter') {
                              event.preventDefault();
                              createRepository();
                            }
                          },
                        }),
                        h('div', { className: 'dshcm-fieldHint' }, translate('githubNameHint')),
                        github.error
                          ? h('div', { className: 'dshcm-modalError', role: 'alert' }, github.error)
                          : null,
                        h(
                          'div',
                          { className: 'dshcm-modalActions' },
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'dshcm-button',
                              disabled: github.step === 'creating',
                              onClick: () =>
                                setGithub((current) =>
                                  current ? { ...current, step: 'choose', error: '' } : current,
                                ),
                            },
                            translate('githubBack'),
                          ),
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'dshcm-button dshcm-modalPrimary',
                              disabled: github.step === 'creating' || !github.name.trim(),
                              onClick: createRepository,
                            },
                            github.step === 'creating'
                              ? translate('githubCreating')
                              : translate('githubCreateButton'),
                          ),
                        ),
                      ),
                ),
              )
            : null,
        ),
      );
    }

    function DiffDock(props) {
      const translate = useTranslate(props.clientCtx);
      const { tab } = props.useTabInfo();
      const params = tab.navigation.params ?? {};
      const path = decodeDiffPath(tab.contentId) || (typeof params.path === 'string' ? params.path : '');
      const sessionId = props.sessionId || params.sessionId;
      const revision = tab.navigation.revision;
      const [state, setState] = React.useState({
        phase: 'loading',
        diff: '',
        truncated: false,
        binary: false,
        status: '',
        error: '',
      });
      const [refreshKey, setRefreshKey] = React.useState(0);

      React.useEffect(() => {
        let alive = true;
        const controller = new AbortController();
        setState((previous) => ({ ...previous, phase: 'loading', error: '' }));
        requestFileDiff(sessionId, path, controller.signal, translate)
          .then((data) => {
            if (!alive) return;
            setState({
              phase: 'ready',
              diff: typeof data.diff === 'string' ? data.diff : '',
              truncated: Boolean(data.truncated),
              binary: Boolean(data.binary),
              status: typeof data.status === 'string' ? data.status : '',
              error: '',
            });
          })
          .catch((error) => {
            if (!alive || (error && error.name === 'AbortError')) return;
            setState({
              phase: 'error',
              diff: '',
              truncated: false,
              binary: false,
              status: '',
              error: error instanceof Error ? error.message : String(error),
            });
          });
        return () => {
          alive = false;
          controller.abort();
        };
      }, [sessionId, path, revision, refreshKey, translate]);

      const rows = React.useMemo(() => diffRows(state.diff), [state.diff]);
      const added = React.useMemo(
        () => rows.filter((row) => row.kind === 'add').length,
        [rows],
      );
      const removed = React.useMemo(
        () => rows.filter((row) => row.kind === 'del').length,
        [rows],
      );

      const name = basenameOf(path);
      const parts = splitFilePath(path);
      const letter = typeof params.letter === 'string' ? params.letter : '';
      const tone = letter === 'D' ? 'deleted' : letter === 'U' || letter === 'A' ? 'new' : 'modified';
      const status = letter || (typeof params.status === 'string' ? params.status.trim() : '');
      const canOpenFile =
        Boolean(params.workspacePath) && Boolean(sessionId) && !String(status).includes('D');

      function openFileInViewer() {
        if (!canOpenFile) return;
        try {
          props.clientCtx.sidebarRight.openResource(
            fileAddress(sessionId, params.workspacePath),
          );
        } catch (error) {
          console.error('commit-message: could not open file', error);
        }
      }

      let body;
      if (state.phase === 'error') {
        body = h(
          'div',
          { className: 'dshcm-diffNote dshcm-diffNote--error' },
          state.error || translate('diffFailed'),
          h(
            'button',
            {
              type: 'button',
              className: 'dshcm-button',
              onClick: () => setRefreshKey((value) => value + 1),
            },
            translate('diffRetry'),
          ),
        );
      } else if (state.binary) {
        body = h('div', { className: 'dshcm-diffNote' }, translate('diffBinary'));
      } else if (rows.length === 0) {
        body = h(
          'div',
          { className: 'dshcm-diffNote' },
          state.phase === 'loading'
            ? translate('diffLoading')
            : state.truncated
              ? translate('diffTruncated')
              : translate('diffEmpty'),
        );
      } else {
        body = h(
          React.Fragment,
          null,
          h(
            'div',
            {
              className: 'dshcm-diffScroll',
              role: 'region',
              tabIndex: 0,
              'aria-label': format(translate, 'showChanges', { path }),
            },
            h(
              'div',
              { className: 'dshcm-diffRows' },
              rows.map((row, index) =>
                h(
                  'div',
                  { key: index, className: `dshcm-diffLine dshcm-diffLine--${row.kind}` },
                  h(
                    'span',
                    { className: 'dshcm-diffNum', 'aria-hidden': true },
                    row.old === null || row.old === undefined ? '' : String(row.old),
                  ),
                  h(
                    'span',
                    { className: 'dshcm-diffNum', 'aria-hidden': true },
                    row.new === null || row.new === undefined ? '' : String(row.new),
                  ),
                  h(
                    'span',
                    { className: 'dshcm-diffMark', 'aria-hidden': true },
                    row.kind === 'add' ? '+' : row.kind === 'del' ? '−' : row.kind === 'context' ? ' ' : '',
                  ),
                  h('span', { className: 'dshcm-diffText' }, row.text === '' ? ' ' : row.text),
                ),
              ),
            ),
          ),
          state.truncated
            ? h('div', { className: 'dshcm-diffTruncated' }, translate('diffTruncated'))
            : null,
        );
      }

      return h(
        'div',
        { className: 'dshcm-diffRoot' },
        h(
          'div',
          { className: 'dshcm-diffHead' },
          h(
            'div',
            { className: 'dshcm-diffIdentity' },
            h('span', { className: 'dshcm-diffName', title: path }, name || path),
            parts.directory
              ? h('span', { className: 'dshcm-diffDir', title: path }, parts.directory)
              : null,
            status
              ? h(
                  'span',
                  { className: `dshcm-diffStatus dshcm-diffStatus--${tone}` },
                  status,
                )
              : null,
          ),
          h(
            'div',
            { className: 'dshcm-diffActions' },
            canOpenFile
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dshcm-button dshcm-diffOpen',
                    onClick: openFileInViewer,
                    title: format(translate, 'diffOpenFileAria', { path }),
                  },
                  translate('diffOpenFile'),
                )
              : null,
            h(
              'button',
              {
                type: 'button',
                className: 'dshcm-iconButton',
                disabled: state.phase === 'loading',
                onClick: () => setRefreshKey((value) => value + 1),
                'aria-label': translate('diffRefreshAria'),
                title: translate('diffRefreshAria'),
              },
              h(RefreshIcon),
            ),
          ),
        ),
        state.phase === 'ready' && !state.binary && rows.length > 0
          ? h(
              'div',
              { className: 'dshcm-diffSummary' },
              h(
                'span',
                {
                  className: 'dshcm-diffAdded',
                  title: format(translate, 'diffAdded', { count: added }),
                },
                `+${added}`,
              ),
              h(
                'span',
                {
                  className: 'dshcm-diffRemoved',
                  title: format(translate, 'diffRemoved', { count: removed }),
                },
                `−${removed}`,
              ),
            )
          : null,
        h('div', { className: 'dshcm-diffBody' }, body),
      );
    }

    function diffTabTitle(translate, address) {
      const name = basenameOf(decodeDiffPath(address)) || 'diff';
      return translate('diffTab').replaceAll('{name}', name);
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
.dshcm-diffRoot {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 12px 14px 14px;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  line-height: 1.45;
}
.dshcm-diffHead {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 0 1px;
}
.dshcm-diffIdentity {
  display: flex;
  align-items: baseline;
  flex: 1 1 auto;
  gap: 6px;
  min-width: 0;
}
.dshcm-diffName {
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-diffDir {
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dshcm-diffStatus {
  flex: 0 0 auto;
  min-width: 16px;
  padding: 0 5px;
  border-radius: 5px;
  background: var(--dsw-alias-bg-layer-2);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10.5px;
  font-weight: 650;
  text-align: center;
}
.dshcm-diffStatus--new {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-diffStatus--modified {
  color: var(--dsw-alias-brand-primary);
}
.dshcm-diffStatus--deleted {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-diffActions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}
.dshcm-diffOpen {
  min-height: 24px;
  padding: 2px 8px;
  font-size: 11.5px;
}
.dshcm-diffSummary {
  display: flex;
  gap: 8px;
  padding: 0 2px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
}
.dshcm-diffAdded {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-diffRemoved {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-diffBody {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
}
.dshcm-diffScroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 4px 0;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 8px;
  background: var(--dsw-alias-bg-base);
}
.dshcm-diffScroll:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-diffRows {
  width: max-content;
  min-width: 100%;
}
.dshcm-diffLine {
  display: flex;
  align-items: flex-start;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
  line-height: 1.55;
  white-space: pre;
}
.dshcm-diffLine--add {
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 12%, transparent);
}
.dshcm-diffLine--del {
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);
}
.dshcm-diffLine--hunk {
  background: var(--dsw-alias-bg-layer-2);
}
.dshcm-diffLine--hunk .dshcm-diffText {
  color: var(--dsw-alias-brand-primary);
}
.dshcm-diffLine--meta .dshcm-diffText,
.dshcm-diffLine--meta .dshcm-diffNum {
  color: var(--dsw-alias-label-secondary);
}
.dshcm-diffLine--add .dshcm-diffText,
.dshcm-diffLine--add .dshcm-diffMark {
  color: var(--dsw-alias-state-success-primary);
}
.dshcm-diffLine--del .dshcm-diffText,
.dshcm-diffLine--del .dshcm-diffMark {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-diffNum {
  flex: 0 0 42px;
  padding-right: 8px;
  color: var(--dsw-alias-label-secondary);
  opacity: 0.65;
  text-align: right;
  user-select: none;
}
.dshcm-diffMark {
  flex: 0 0 16px;
  text-align: center;
  user-select: none;
}
.dshcm-diffText {
  flex: 1 1 auto;
  padding-right: 14px;
}
.dshcm-diffNote {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 140px;
  padding: 16px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12.5px;
  text-align: center;
}
.dshcm-diffNote--error {
  color: var(--dsw-alias-state-error-primary);
}
.dshcm-diffTruncated {
  padding: 6px 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 7px;
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
.dshcm-modalBackdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}
.dshcm-modal {
  box-sizing: border-box;
  width: min(430px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow: auto;
  padding: 16px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.38);
  font-size: 13px;
  line-height: 1.45;
}
.dshcm-modalHead {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
}
.dshcm-modalTitle {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  font-weight: 650;
}
.dshcm-modalText {
  margin: 0 0 10px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12.5px;
  line-height: 1.5;
}
.dshcm-repoOption {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin: 0 0 8px;
  padding: 11px 12px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 100ms ease, background 100ms ease;
}
.dshcm-repoOption:hover {
  border-color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-bg-layer-3);
}
.dshcm-repoOption:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-repoIcon {
  display: inline-flex;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-secondary);
}
.dshcm-repoOption:hover .dshcm-repoIcon {
  color: var(--dsw-alias-brand-primary);
}
.dshcm-repoText {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.dshcm-repoTitle {
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 600;
}
.dshcm-repoHint {
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
}
.dshcm-modalFoot {
  margin: 10px 0 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 1.5;
}
.dshcm-modalForm {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.dshcm-fieldLabel {
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  font-weight: 600;
}
.dshcm-nameInput {
  min-height: 0;
  height: 34px;
  padding: 6px 9px;
  resize: none;
  font-size: 13px;
}
.dshcm-nameInput:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
}
.dshcm-fieldHint {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}
.dshcm-modalError {
  max-height: 120px;
  overflow: auto;
  padding: 7px 9px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent);
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  white-space: pre-wrap;
}
.dshcm-modalActions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
}
.dshcm-modalPrimary {
  border-color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-bg-base);
  font-weight: 600;
}
.dshcm-modalPrimary:hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-bg-base);
  filter: brightness(1.06);
}
`;

    return {
      inject: ['slots', 'locale', 'sidebarRightTabs', 'sidebarRight'],
      apply(ctx) {
        const t = ctx.locale.bind(NS);
        const Dock = (props) => h(CommitDock, { ...props, clientCtx: ctx });
        const Diff = (props) => h(DiffDock, { ...props, clientCtx: ctx });
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
            ctx.sidebarRightTabs.register({
              id: DIFF_TAB_ID,
              kind: DIFF_KIND,
              priority: 'extension',
              patterns: ['dsh-resource://commit-message-diff/[\\s\\S]+'],
              keepMounted: true,
              title: (address) => diffTabTitle(t, address),
            }),
          'commit-message: diff tab type',
        );
        ctx.effect(
          () =>
            ctx.slots.inject('sidebar.right.pane.tab', () =>
              ctx.slots.register(
                {
                  name: 'sidebar.right.pane.tab',
                  key: DIFF_TAB_ID,
                  locale: NS,
                },
                Diff,
              ),
            ),
          'commit-message: diff tab body',
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
