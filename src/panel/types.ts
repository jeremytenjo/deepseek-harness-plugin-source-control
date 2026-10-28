import type { KeyboardEvent } from 'react';

export type FeedbackKind = 'error' | 'success' | 'info';

export interface Feedback {
  kind: FeedbackKind;
  text: string;
}

export type Busy = 'status' | 'generate' | 'commit' | 'push' | null;

export interface ChangedFile {
  path: string;
  workspacePath: string | null;
  status: string;
  untracked: boolean;
  staged: boolean;
  unstaged: boolean;
}

export interface CommitEntry {
  hash: string;
  shortHash: string;
  subject: string;
  author: string;
  timestamp: number;
}

export interface SourceControlStatus {
  isRepo: boolean;
  cwd: string;
  top: string;
  branch: string;
  upstream: string;
  ahead: number;
  behind: number;
  hasCommits: boolean;
  githubUrl: string | null;
  commits: CommitEntry[];
  files: ChangedFile[];
  changedFiles: number;
  stagedFiles: number;
  unstagedFiles: number;
  untrackedFiles: number;
}

export type BranchBusy = '' | 'switch' | 'create';

export interface BranchState {
  loading: boolean;
  busy: BranchBusy;
  current: string;
  branches: string[];
  name: string;
  error: string;
}

export type GitHubVisibility = 'private' | 'public';

export interface GitHubState {
  step: 'choose' | 'name' | 'creating';
  visibility: GitHubVisibility;
  name: string;
  error: string;
}

export type Translate = (key: string) => string;

export type Format = (
  key: string,
  values: Record<string, string | number>,
) => string;

export interface SourceControlPanelProps {
  status: SourceControlStatus | null;
  message: string;
  busy: Busy;
  feedback: Feedback | null;
  changesOpen: boolean;
  github: GitHubState | null;
  branch: BranchState | null;
  restarting: boolean;
  canRestart: boolean;
  canGenerate: boolean;
  canCommit: boolean;
  canPush: boolean;
  showPush: boolean;
  summary: string;
  messagePlaceholder: string;
  githubLabel: string;
  t: Translate;
  fmt: Format;
  onChangeMessage(value: string): void;
  onMessageKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void;
  onGenerate(): void;
  onCommit(): void;
  onPush(): void;
  onRefresh(): void;
  onToggleChanges(): void;
  onOpenDiff(file: ChangedFile): void;
  onDone(): void;
  onOpenGitHub(): void;
  onOpenBranches(): void;
  onCloseBranches(): void;
  onSwitchBranch(name: string): void;
  onNewBranchName(value: string): void;
  onCreateBranch(): void;
  onRestart(): void;
  onCloseGitHub(): void;
  onChooseVisibility(visibility: GitHubVisibility): void;
  onBackToVisibility(): void;
  onRepositoryName(value: string): void;
  onCreateRepository(): void;
}
