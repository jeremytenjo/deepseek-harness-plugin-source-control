# deepseek-harness-plugin-source-control

A DeepSeek Harness plugin for reviewing, generating, committing, and pushing Git changes from the composer.

The Git button beside the chat submit button toggles the session's right sidebar: it opens or focuses the source-control panel, and closes the sidebar again when that panel is the active tab. The panel works on the session's current working directory.

## Features

- **Generate** a Conventional Commits message from the current diff using the session's configured model.
- Edit the generated message before committing.
- **Commit changes** stages all current changes (`git add -A`) and commits them.
- **Changes** lists every modified, added, and untracked file; click a file to open its unified diff in a sidebar tab.
- **Diff view** shows the working tree against `HEAD` (or the staged and unstaged changes before the first commit) with T3-style syntax highlighting from `@pierre/diffs`, line numbers, hunk separators, and added/removed counts; **Open file** switches to the full file viewer.
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
- Node.js and pnpm only for building the browser bundle; the installed plugin needs neither.

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
| `client.js` | Built browser entry: source-control panel, per-file diff tabs, commit list, generation and action controls |
| `client.diff.js` | Lazily loaded chunk with `@pierre/diffs`, Sidebar diff UI, Tailwind and shadcn primitives |
| `src/client.tsx` | TSX entry for the built client |
| `src/legacy-client.js` | Source-control panel, GitHub flow, and data fetching; now imported by the TSX entry |
| `src/diff/DiffView.tsx` | T3-style diff surface and header |
| `src/components/ui/button.tsx` | shadcn-style Button used by the diff view |
| `src/styles.css`, `tailwind.config.cjs` | Tailwind entry and prefixed configuration |
| `components.json` | shadcn configuration (`dshcm-` class prefix) |
| `scripts/build-client.mjs` | Builds the main bundle and the lazy diff chunk |
| `cordis.patch.yml` | Bundle patch that inserts the Host row |
| `locale/en.json`, `locale/zh.json` | Plugin display metadata |
| `icon.svg` | Plugin icon |

## Development notes

The browser half is built from TSX with React, Tailwind CSS, and shadcn-style primitives. `client.js` is the small eager entry; the `@pierre/diffs` renderer lives in `client.diff.js` and is fetched with `require.async` only when a diff tab first opens. Both artifacts use the Harness lazy-CJS module wrapper and externalize `react` / `react/jsx-runtime`.

The Host half has no dependencies.

Install the build dependencies and rebuild after changing anything under `src/`:

```bash
pnpm install
pnpm typecheck
pnpm build
node --check index.js
node --check client.js
```

`pnpm build` writes `.build/`, then regenerates `client.js` and `client.diff.js` in the repository root. Commit both artifacts; the plugin package ships them.

After editing a linked install, reload the plugin through the Plugin Manager (disable/enable) or restart the Host. A page refresh only replaces the browser half; Host changes (status fields, the `diff` and `create-github` actions) need the Host half reloaded. When the browser sees a status response from an older Host without `githubUrl`, it reports that the Host is out of date instead of opening the repository-creation dialog.

## Current limits

- Only branches with an upstream can be pushed from the panel.
- The diff view compares the working tree with `HEAD`; it does not show history or compare arbitrary revisions.
- The commit list is capped at the 8 newest unpushed commits.
- The diff highlighter runs on the main thread and the lazy renderer chunk is about 10 MB; the first diff open pays that download and parse cost.
- Hunk separators show the unchanged-line count but do not expand collapsed lines.
- GitHub support targets `github.com` only; it does not detect or create GitHub Enterprise repositories.
- Git identity, hooks, and credentials must already work from the command line.
- The plugin is not published to npm; install it from this repository as a local bundle.
