# deepseek-harness-plugin-source-control

A DeepSeek Harness plugin for reviewing, generating, committing, and pushing Git changes from the composer.

The Git button beside the chat submit button toggles the session's right sidebar: it opens or focuses the source-control panel, and closes the sidebar again when that panel is the active tab. The panel works on the session's current working directory.

## Features

- **Generate** a Conventional Commits message from the current diff using the session's configured model.
- Edit the generated message before committing.
- **Commit changes** stages all current changes (`git add -A`) and commits them.
- **Changes** lists every modified, added, and untracked file; click a file to open its unified diff in a sidebar tab.
- **Diff view** shows the working tree against `HEAD` (or the staged and unstaged changes before the first commit), with line numbers and added/removed counts; **Open file** switches to the full file viewer.
- Shows **only unpushed commits**, with short hash, subject, author, and date.
- **Push commits** appears when the local branch is ahead of its upstream, and pushes with `git push`.
- **GitHub** opens the connected GitHub repository from the panel header. When the repository has no GitHub remote, it offers to create a private or public repository with the GitHub CLI, adds the remote, and pushes the current branch.
- Git hooks are respected; the plugin never uses `--no-verify`.
- Refreshes on window focus, with a manual refresh control.
- English and Chinese UI copy.

## Requirements

- DeepSeek Harness `0.2.1-rc.2` (the plugin uses the RC-era Client slot and Host service APIs).
- Git available to the Host process.
- A configured model for message generation.
- An upstream branch for the push action; the plugin does not guess a remote.
- For repository creation, the GitHub CLI (`gh`) installed and authenticated (`gh auth login`).

## Install

Clone this repository, then install the directory as a local bundle in a DSH profile:

```bash
git clone https://github.com/jeremytenjo/deepseek-harness-plugin-source-control.git
dsh plugin --profile desktop add ./deepseek-harness-plugin-source-control
```

Restart the Host or reload the Web page after installation. The profile name may differ; use the profile shown by `dsh --profile <name> --dump-config`.

No plugin configuration is required.

## Usage

1. Open a session whose working directory is a Git repository.
2. Click the Git button beside the chat submit button; the source-control panel opens in the right sidebar. Click it again while the panel is active to close the sidebar.
3. Use **Generate** to create a message, or write one yourself.
4. Review the message, then use **Commit changes**. Click a changed file to inspect its diff before committing.
5. If the branch is ahead of its upstream, use **Push commits**.
6. Use the **GitHub** button in the panel header to open the connected repository. If there is no GitHub remote, create a private or public repository from the dialog.

`Cmd+Enter` / `Ctrl+Enter` in the message field commits.

Only commits ahead of the upstream are listed. After a successful push that list is empty.

## Behavior and safety

- Committing stages **all** current changes, including untracked files not ignored by Git.
- Pushing uses the branch's configured upstream and does not force-push.
- The browser talks to one exact loopback-only Host route (`POST /__dsh/commit-message`).
- Git commands and `gh repo create` are spawned with an argv array, never through a shell.
- Repository creation never uses a force-push; it pushes the current branch with `git push -u <remote> HEAD`.
- The route rejects non-loopback clients, cross-origin requests, non-JSON bodies, and oversized bodies.
- If the profile's Web GUI is exposed beyond loopback, the panel is intentionally unavailable.

## Files

| Path | Purpose |
|---|---|
| `index.js` | Host plugin: Git status, diff collection, model call, commit, push, and the loopback route |
| `client.js` | Browser plugin: source-control panel, per-file diff tabs, commit list, generation and action controls |
| `cordis.patch.yml` | Bundle patch that inserts the Host row |
| `locale/en.json`, `locale/zh.json` | Plugin display metadata |
| `icon.svg` | Plugin icon |

## Development notes

The browser half is a prebuilt lazy-CJS module (`client.js`), not a bundler output. It registers a factory with `window.__ModuleLoader__` and requires only `react` from the Harness baseline. The Host half has no dependencies.

There is no build step:

```bash
node --check index.js
node --check client.js
```

After editing a linked install, reload the plugin through the Plugin Manager (disable/enable) or restart the Host.

## Current limits

- Only branches with an upstream can be pushed from the panel.
- The diff view compares the working tree with `HEAD`; it does not show history or compare arbitrary revisions.
- The commit list is capped at the 8 newest unpushed commits.
- GitHub support targets `github.com` only; it does not detect or create GitHub Enterprise repositories.
- Git identity, hooks, and credentials must already work from the command line.
- The plugin is not published to npm; install it from this repository as a local bundle.
