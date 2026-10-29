// Browser-side controller for the source-control plugin: Host RPC, state,
// translations, composer/tab wiring, and mounting the TSX views.
import * as React from 'react';
import { GitBranch } from 'lucide-react';

import { SourceControlPanel } from './panel/SourceControlPanel';

const h = React.createElement;
    const NS = 'dshCommitMessage';
    const ROUTE = '/__dsh/commit-message';
    const KIND = 'source-control';
    const TAB_ID = '@local/dsh-commit-message';
    const DIFF_KIND = 'source-control-diff';
    const DIFF_TAB_ID = '@local/dsh-commit-message/diff';
    const MEDIA_ROUTE = '/__dsh/commit-message-media';

    const MEDIA_EXTENSIONS = new Map([
      ['png', 'image'],
      ['jpg', 'image'],
      ['jpeg', 'image'],
      ['gif', 'image'],
      ['webp', 'image'],
      ['avif', 'image'],
      ['bmp', 'image'],
      ['ico', 'image'],
      ['mp4', 'video'],
      ['webm', 'video'],
      ['ogv', 'video'],
      ['mov', 'video'],
      ['m4v', 'video'],
      ['mp3', 'audio'],
      ['wav', 'audio'],
      ['ogg', 'audio'],
      ['oga', 'audio'],
      ['m4a', 'audio'],
      ['aac', 'audio'],
      ['flac', 'audio'],
    ]);

    function detectMediaKind(path) {
      const name = String(path || '').split('/').pop() || '';
      const dot = name.lastIndexOf('.');
      if (dot === -1) return '';
      return MEDIA_EXTENSIONS.get(name.slice(dot + 1).toLowerCase()) || '';
    }

    const EN = {
      title: 'Source control',
      done: 'Done',
      doneAria: 'Close the source control panel',
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
      mediaPreview: 'Media preview',
      openInVSCode: 'Open in VS Code',
      imagePreview: 'Image preview',
      expandImage: 'Expand image',
      closeImage: 'Close image',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      resetZoom: 'Reset zoom',
      zoomHint: 'Scroll to zoom · Drag to pan',
      openInVSCodeFailed: 'Could not open the file in VS Code.',
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
      branchOpen: 'Switch or create a branch',
      branchModalTitle: 'Switch branch',
      branchModalDescription: 'Choose a local branch or create a new one from the current HEAD.',
      branchListLabel: 'Local branches',
      branchCurrent: 'Current',
      branchLoading: 'Loading branches…',
      branchEmpty: 'No local branches yet.',
      branchCreateLabel: 'New branch',
      branchCreatePlaceholder: 'feature/my-branch',
      branchCreateButton: 'Create and switch',
      branchCreating: 'Creating…',
      branchSwitching: 'Switching…',
      branchCreateHint: 'The new branch is created from the current HEAD and checked out.',
      branchSwitched: 'Switched to {branch}.',
      branchCreated: 'Created and switched to {branch}.',
      branchClose: 'Close',
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
      aheadBy: '{count} ahead',
      behindBy: '{count} behind',
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
      hostOutdated: 'The running Host is using an older version of the source-control plugin. Restart the Host or reload the plugin, then try again.',
      restart: 'Restart',
      restartTitle: 'Restart DeepSeek Harness',
      restarting: 'Restarting…',
      restartFailed: 'Could not restart the harness.',
      requestFailed: 'The commit message request failed.',
      networkFailed: 'Could not reach the Harness host.',
      unreadable: 'The commit message endpoint returned an unreadable response.',
    };

    const ZH = {
      title: '源代码管理',
      done: '完成',
      doneAria: '关闭源代码管理面板',
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
      mediaPreview: '媒体预览',
      openInVSCode: '在 VS Code 中打开',
      imagePreview: '图片预览',
      expandImage: '放大图片',
      closeImage: '关闭图片',
      zoomIn: '放大',
      zoomOut: '缩小',
      resetZoom: '重置缩放',
      zoomHint: '滚轮缩放 · 拖拽平移',
      openInVSCodeFailed: '无法在 VS Code 中打开该文件。',
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
      branchOpen: '切换或创建分支',
      branchModalTitle: '切换分支',
      branchModalDescription: '选择本地分支，或从当前 HEAD 创建一个新分支。',
      branchListLabel: '本地分支',
      branchCurrent: '当前',
      branchLoading: '正在加载分支…',
      branchEmpty: '还没有本地分支。',
      branchCreateLabel: '新分支',
      branchCreatePlaceholder: 'feature/my-branch',
      branchCreateButton: '创建并切换',
      branchCreating: '正在创建…',
      branchSwitching: '正在切换…',
      branchCreateHint: '新分支将从当前 HEAD 创建并切换过去。',
      branchSwitched: '已切换到 {branch}。',
      branchCreated: '已创建并切换到 {branch}。',
      branchClose: '关闭',
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
      aheadBy: '领先 {count} 个提交',
      behindBy: '落后 {count} 个提交',
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
      hostOutdated: '当前运行的 Host 仍在使用旧版源代码管理插件。请重启 Host 或重新加载插件后再试。',
      restart: '重启',
      restartTitle: '重启 DeepSeek Harness',
      restarting: '正在重启…',
      restartFailed: '无法重启 Harness。',
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
        githubUrl: typeof data.githubUrl === 'string' ? data.githubUrl : null,
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

    function normaliseSessionId(value) {
      const text = String(value || '');
      if (!text) return text;
      return text.startsWith('session-') ? text : `session-${text}`;
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

    async function requestOpenInVSCode(sessionId, path, line, translate) {
      let response;
      try {
        response = await fetch(ROUTE, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'open-in-vscode', sessionId, path, line }),
        });
      } catch {
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
      return h(GitBranch, {
        size: 15,
        strokeWidth: 1.5,
        'aria-hidden': true,
        focusable: false,
      });
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
      const resourceSessionId = props.sessionId;
      const sessionId = normaliseSessionId(resourceSessionId);
      const translate = useTranslate(props.clientCtx);
      const tabInfo = typeof props.useTabInfo === 'function' ? props.useTabInfo() : null;
      const [status, setStatus] = React.useState(null);
      const [message, setMessage] = React.useState('');
      const [busy, setBusy] = React.useState('status');
      const [feedback, setFeedback] = React.useState(null);
      const [changesOpen, setChangesOpen] = React.useState(true);
      const [github, setGithub] = React.useState(null);
      const [branch, setBranch] = React.useState(null);
      const [restarting, setRestarting] = React.useState(false);
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
          setGithub(null);
          setBranch(null);
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
        if (!feedback || feedback.kind !== 'error' || !/no longer live/i.test(feedback.text)) {
          return undefined;
        }
        let cancelled = false;
        let attempts = 0;
        let timer = 0;
        const retry = () => {
          if (cancelled) return;
          attempts += 1;
          request('status', {})
            .then((data) => {
              if (cancelled) return;
              setStatus(readStatus(data));
              setFeedback(null);
            })
            .catch(() => {
              if (!cancelled && attempts < 15) timer = setTimeout(retry, 1200);
            });
        };
        timer = setTimeout(retry, 800);
        return () => {
          cancelled = true;
          clearTimeout(timer);
        };
      }, [feedback, request]);

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
          props.clientCtx.sidebarRight.openResource(diffAddress(resourceSessionId, file.path), {
            params: {
              sessionId: resourceSessionId,
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
        if (status.githubUrl === null) {
          setFeedback({ kind: 'error', text: translate('hostOutdated') });
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
        setGithub((current) => (current && current.step === 'creating' ? current : null));
      }

      function backToVisibility() {
        setGithub((current) =>
          current ? { ...current, step: 'choose', error: '' } : current,
        );
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

      function branchError(error) {
        const message = error instanceof Error ? error.message : String(error);
        return /unknown action/i.test(message) ? translate('hostOutdated') : message;
      }

      async function openBranches() {
        if (!status || !status.isRepo || busy) return;
        setBranch({
          loading: true,
          busy: '',
          current: status.branch || '',
          branches: [],
          name: '',
          error: '',
        });
        try {
          const data = await request('branches', {});
          setBranch((current) =>
            current
              ? {
                  ...current,
                  loading: false,
                  current: typeof data.current === 'string' ? data.current : current.current,
                  branches: Array.isArray(data.branches)
                    ? data.branches.filter((name) => typeof name === 'string')
                    : [],
                  error: '',
                }
              : current,
          );
        } catch (error) {
          setBranch((current) =>
            current
              ? {
                  ...current,
                  loading: false,
                  error: branchError(error),
                }
              : current,
          );
        }
      }

      function closeBranches() {
        setBranch((current) => (current && current.busy ? current : null));
      }

      function setNewBranchName(name) {
        setBranch((current) => (current ? { ...current, name, error: '' } : current));
      }

      async function finishBranchChange(name, messageKey) {
        setBranch(null);
        try {
          const data = await request('status', {});
          setStatus(readStatus(data));
        } catch (error) {
          setFeedback({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
          return;
        }
        setFeedback({
          kind: 'success',
          text: format(translate, messageKey, { branch: name }),
        });
      }

      async function switchBranch(name) {
        if (!branch || branch.busy || !name || name === branch.current) return;
        setBranch((current) => (current ? { ...current, busy: 'switch', error: '' } : current));
        try {
          await request('switch-branch', { name });
        } catch (error) {
          setBranch((current) =>
            current
              ? {
                  ...current,
                  busy: '',
                  error: branchError(error),
                }
              : current,
          );
          return;
        }
        await finishBranchChange(name, 'branchSwitched');
      }

      async function createBranch() {
        if (!branch || branch.busy) return;
        const name = branch.name.trim();
        if (!name) return;
        setBranch((current) => (current ? { ...current, busy: 'create', error: '' } : current));
        try {
          await request('create-branch', { name });
        } catch (error) {
          setBranch((current) =>
            current
              ? {
                  ...current,
                  busy: '',
                  error: branchError(error),
                }
              : current,
          );
          return;
        }
        await finishBranchChange(name, 'branchCreated');
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
        } catch (error) {
          setFeedback({ kind: 'error', text: error instanceof Error ? error.message : String(error) });
        } finally {
          setBusy(null);
        }
      }

      async function restartHarness() {
        if (restarting) return;
        setRestarting(true);
        try {
          await request('restart-harness', {});
          setFeedback({ kind: 'info', text: translate('restarting') });
        } catch (error) {
          setRestarting(false);
          setFeedback({
            kind: 'error',
            text:
              error instanceof Error && error.message
                ? error.message
                : translate('restartFailed'),
          });
        }
      }

      function closePanel() {
        const tab = tabInfo && tabInfo.tab;
        const sidebar = props.clientCtx.sidebarRight;
        try {
          if (tab && tab.actions && typeof tab.actions.close === 'function') {
            tab.actions.close();
          } else if (tab && tab.id) {
            sidebar.close(tab.id);
          }
        } catch (error) {
          console.error('commit-message: could not close the source control panel', error);
        }
        try {
          if (sidebar.isExpanded()) sidebar.toggleExpanded();
        } catch (error) {
          console.error('commit-message: could not collapse the right sidebar', error);
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
      const canRestart = Boolean(
        feedback &&
          feedback.kind === 'error' &&
          /no longer live|source-control plugin|源代码管理插件/i.test(feedback.text),
      );
      const fmt = React.useCallback(
        (key, values) => format(translate, key, values),
        [translate],
      );

      return h(SourceControlPanel, {
        status,
        message,
        busy,
        feedback,
        changesOpen,
        github,
        branch,
        restarting,
        canRestart,
        canGenerate,
        canCommit,
        canPush,
        showPush,
        summary,
        messagePlaceholder,
        githubLabel,
        t: translate,
        fmt,
        onChangeMessage: setMessage,
        onMessageKeyDown,
        onGenerate: generate,
        onCommit: commit,
        onPush: pushCommits,
        onRefresh: refresh,
        onToggleChanges: () => setChangesOpen((value) => !value),
        onOpenDiff: openDiff,
        onDone: closePanel,
        onOpenGitHub: openGitHub,
        onOpenBranches: openBranches,
        onCloseBranches: closeBranches,
        onSwitchBranch: switchBranch,
        onNewBranchName: setNewBranchName,
        onCreateBranch: createBranch,
        onRestart: restartHarness,
        onCloseGitHub: closeGitHub,
        onChooseVisibility: chooseRepositoryVisibility,
        onBackToVisibility: backToVisibility,
        onRepositoryName: setRepositoryName,
        onCreateRepository: createRepository,
      });
    }

    const LazyDiffView = React.lazy(() =>
      require.async('./client.diff.js').then(
        (module) => ({ default: module.DiffView }),
        (error) => {
          console.error('commit-message: could not load the diff renderer', error);
          return { default: DiffViewLoadError };
        },
      ),
    );

    function DiffViewLoadError() {
      return h(
        'div',
        { className: 'dshcm-empty', style: { padding: '24px 14px' } },
        'The diff renderer could not be loaded. Reload the plugin to try again.',
      );
    }

    function DiffDock(props) {
      const translate = useTranslate(props.clientCtx);
      const { tab } = props.useTabInfo();
      const params = tab.navigation.params ?? {};
      const path = decodeDiffPath(tab.contentId) || (typeof params.path === 'string' ? params.path : '');
      const resourceSessionId = props.sessionId || params.sessionId;
      const sessionId = normaliseSessionId(resourceSessionId);
      const revision = tab.navigation.revision;
      const localMediaKind =
        !String(params.letter || '').includes('D') &&
        !String(params.status || '').includes('D')
          ? detectMediaKind(path)
          : '';
      const [state, setState] = React.useState({
        phase: 'loading',
        diff: '',
        truncated: false,
        binary: false,
        mediaKind: '',
        mediaVersion: '',
        status: '',
        error: '',
      });
      const [refreshKey, setRefreshKey] = React.useState(0);

      React.useEffect(() => {
        if (localMediaKind) {
          setState({
            phase: 'ready',
            diff: '',
            truncated: false,
            binary: true,
            mediaKind: localMediaKind,
            mediaVersion: Date.now().toString(36),
            status: typeof params.status === 'string' ? params.status : '',
            error: '',
          });
          return undefined;
        }
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
              mediaKind: typeof data.mediaKind === 'string' ? data.mediaKind : '',
              mediaVersion: typeof data.mediaVersion === 'string' ? data.mediaVersion : '',
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
              mediaKind: '',
              mediaVersion: '',
              status: '',
              error: error instanceof Error ? error.message : String(error),
            });
          });
        return () => {
          alive = false;
          controller.abort();
        };
      }, [sessionId, path, revision, refreshKey, translate, localMediaKind]);

      const label = React.useCallback(
        (key, values) => (values ? format(translate, key, values) : translate(key)),
        [translate],
      );

      const letter = typeof params.letter === 'string' ? params.letter : '';
      const status = letter || (typeof params.status === 'string' ? params.status.trim() : '');
      const canOpenFile =
        Boolean(params.workspacePath) && Boolean(sessionId) && !String(status).includes('D');

      function refresh() {
        setRefreshKey((value) => value + 1);
      }

      async function openInVSCode(line) {
        await requestOpenInVSCode(sessionId, path, line, translate);
      }

      function openFileInViewer() {
        if (!canOpenFile) return;
        try {
          props.clientCtx.sidebarRight.openResource(
            fileAddress(resourceSessionId, params.workspacePath),
          );
        } catch (error) {
          console.error('commit-message: could not open file', error);
        }
      }

      const mediaUrl = state.mediaKind
        ? `${MEDIA_ROUTE}?sessionId=${encodeURIComponent(sessionId)}&path=${encodeURIComponent(path)}&v=${encodeURIComponent(state.mediaVersion || String(refreshKey))}`
        : '';

      return h(
        React.Suspense,
        {
          fallback: h(
            'div',
            { className: 'dshcm-empty', style: { padding: '24px 14px' } },
            translate('diffLoading'),
          ),
        },
        h(LazyDiffView, {
          path,
          params,
          state,
          mediaUrl,
          canOpenFile,
          label,
          onRefresh: refresh,
          onOpenFile: openFileInViewer,
          onOpenInVSCode: openInVSCode,
        }),
      );
    }

    function diffTabTitle(translate, address) {
      const name = basenameOf(decodeDiffPath(address)) || 'diff';
      return translate('diffTab').replaceAll('{name}', name);
    }

    const CHROME_CSS = `
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
.dshcm-empty {
  padding: 4px 2px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}
`;

    function ensureChromeStyles() {
      if (typeof document === 'undefined') return;
      if (document.querySelector('style[data-dshcm-chrome]')) return;
      const style = document.createElement('style');
      style.dataset.dshcmLegacy = '';
      style.textContent = CHROME_CSS;
      document.head.appendChild(style);
    }

export const inject = ['slots', 'locale', 'sidebarRightTabs', 'sidebarRight'];

export function apply(ctx) {
        ctx.effect(() => {
          ensureChromeStyles();
          return () => {
            document.querySelector('style[data-dshcm-chrome]')?.remove();
          };
        }, 'commit-message: chrome styles');
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
}
