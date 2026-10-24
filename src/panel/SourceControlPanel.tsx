import * as React from 'react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Github,
  GitBranch,
  Info,
  RefreshCw,
  Sparkles,
  Upload,
} from 'lucide-react';

import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { ensureTailwindStyles } from '../lib/styles';
import { cn } from '../lib/utils';
import { BranchDialog } from './BranchDialog';
import { GitHubDialog } from './GitHubDialog';
import type {
  ChangedFile,
  FeedbackKind,
  SourceControlPanelProps,
  SourceControlStatus,
} from './types';

ensureTailwindStyles();

function splitPath(path: string): { name: string; directory: string } {
  const normalized = path.replace(/\\/g, '/');
  const cut = normalized.lastIndexOf('/');
  return cut === -1
    ? { name: normalized, directory: '' }
    : { name: normalized.slice(cut + 1), directory: normalized.slice(0, cut) };
}

function statusLetter(file: ChangedFile): string {
  if (file.untracked) return 'U';
  if (file.status.includes('D')) return 'D';
  if (file.status.includes('R')) return 'R';
  if (file.status.includes('C')) return 'C';
  if (file.status.includes('A')) return 'A';
  return 'M';
}

function statusTone(letter: string): string {
  if (letter === 'D') return 'dshcm-text-[color:var(--dsw-alias-state-error-primary)]';
  if (letter === 'U' || letter === 'A') return 'dshcm-text-[color:var(--dsw-alias-state-success-primary)]';
  return 'dshcm-text-primary';
}

function feedbackTone(kind: FeedbackKind): string {
  if (kind === 'error') return 'dshcm-text-[color:var(--dsw-alias-state-error-primary)]';
  if (kind === 'success') return 'dshcm-text-[color:var(--dsw-alias-state-success-primary)]';
  return 'dshcm-text-muted-foreground';
}

function commitDate(timestamp: number): string {
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

function pushLabel(
  status: SourceControlStatus | null,
  busy: string | null,
  fmt: SourceControlPanelProps['fmt'],
  t: SourceControlPanelProps['t'],
): string {
  if (busy === 'push') return t('pushing');
  const count = status?.ahead ?? 0;
  return fmt(count === 1 ? 'pushOne' : 'pushMany', { count });
}

export function SourceControlPanel({
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
  t,
  fmt,
  onChangeMessage,
  onMessageKeyDown,
  onGenerate,
  onCommit,
  onPush,
  onRefresh,
  onToggleChanges,
  onOpenDiff,
  onOpenGitHub,
  onOpenBranches,
  onCloseBranches,
  onSwitchBranch,
  onNewBranchName,
  onCreateBranch,
  onRestart,
  onCloseGitHub,
  onChooseVisibility,
  onBackToVisibility,
  onRepositoryName,
  onCreateRepository,
}: SourceControlPanelProps) {
  const messageId = React.useId();
  const changesId = React.useId();
  const commitsId = React.useId();
  const branchName = status?.isRepo ? status.branch || 'HEAD' : '';
  const showStatusLine = busy === 'status' || !status || !status.isRepo;
  const FeedbackIcon =
    feedback?.kind === 'error' ? CircleAlert : feedback?.kind === 'success' ? CircleCheck : Info;

  return (
    <div className="dshcm-ui dshcm-flex dshcm-h-full dshcm-min-h-0 dshcm-flex-col dshcm-gap-3 dshcm-overflow-y-auto dshcm-bg-transparent dshcm-px-3.5 dshcm-pb-4 dshcm-pt-3 dshcm-text-foreground">
      <header className="dshcm-flex dshcm-items-center dshcm-gap-2">
        <h2 className="dshcm-shrink-0 dshcm-text-[13px] dshcm-font-semibold dshcm-tracking-[-0.01em]">
          {t('title')}
        </h2>
        <div className="dshcm-ml-auto dshcm-flex dshcm-min-w-0 dshcm-items-center dshcm-gap-1">
          {status?.isRepo ? (
            <button
              type="button"
              onClick={onOpenBranches}
              disabled={Boolean(busy)}
              title={t('branchOpen')}
              className="dshcm-flex dshcm-h-7 dshcm-min-w-0 dshcm-max-w-[220px] dshcm-items-center dshcm-gap-1 dshcm-rounded-md dshcm-border-0 dshcm-bg-transparent dshcm-px-1.5 dshcm-text-[11.5px] dshcm-transition-colors hover:dshcm-bg-secondary focus-visible:dshcm-outline-none focus-visible:dshcm-ring-1 focus-visible:dshcm-ring-ring disabled:dshcm-pointer-events-none disabled:dshcm-opacity-50"
            >
              <GitBranch className="dshcm-size-3.5 dshcm-flex-none dshcm-text-muted-foreground" />
              <span
                className="dshcm-max-w-[45%] dshcm-truncate dshcm-font-medium dshcm-text-foreground"
                title={branchName}
              >
                {branchName}
              </span>
              {status.upstream ? (
                <>
                  <span aria-hidden="true" className="dshcm-flex-none dshcm-text-muted-foreground">
                    →
                  </span>
                  <span className="dshcm-min-w-0 dshcm-flex-1 dshcm-truncate dshcm-text-[11px] dshcm-text-muted-foreground">
                    {status.upstream}
                  </span>
                </>
              ) : null}
              {status.upstream && status.ahead > 0 ? (
                <span
                  className="dshcm-flex dshcm-flex-none dshcm-items-center dshcm-gap-0.5 dshcm-text-[11px] dshcm-tabular-nums dshcm-text-foreground"
                  title={fmt('aheadBy', { count: status.ahead })}
                >
                  <ArrowUp className="dshcm-size-3" aria-hidden="true" />
                  {status.ahead}
                </span>
              ) : null}
              {status.upstream && status.behind > 0 ? (
                <span
                  className="dshcm-flex dshcm-flex-none dshcm-items-center dshcm-gap-0.5 dshcm-text-[11px] dshcm-tabular-nums dshcm-text-muted-foreground"
                  title={fmt('behindBy', { count: status.behind })}
                >
                  <ArrowDown className="dshcm-size-3" aria-hidden="true" />
                  {status.behind}
                </span>
              ) : null}
              <ChevronDown className="dshcm-size-3 dshcm-flex-none dshcm-text-muted-foreground" />
            </button>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            disabled={!status?.isRepo || Boolean(busy)}
            onClick={onOpenGitHub}
            aria-label={githubLabel}
            title={githubLabel}
            className="dshcm-shrink-0"
          >
            <Github className="dshcm-size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={Boolean(busy)}
            onClick={onRefresh}
            aria-label={t('refreshAria')}
            title={t('refreshAria')}
            className="dshcm-shrink-0"
          >
            <RefreshCw
              className={cn('dshcm-size-3.5', busy === 'status' && 'dshcm-animate-spin')}
            />
          </Button>
        </div>
      </header>

      {feedback ? (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'dshcm-flex dshcm-items-start dshcm-gap-2 dshcm-rounded-md dshcm-px-2.5 dshcm-py-2 dshcm-text-xs',
            feedback.kind === 'error' && 'dshcm-bg-secondary',
          )}
        >
          <FeedbackIcon
            className={cn('dshcm-mt-0.5 dshcm-size-3.5 dshcm-flex-none', feedbackTone(feedback.kind))}
            aria-hidden="true"
          />
          <span className="dshcm-min-w-0 dshcm-flex-1 dshcm-leading-relaxed dshcm-text-foreground">
            {feedback.text}
          </span>
          {canRestart ? (
            <Button
              variant="outline"
              size="sm"
              disabled={restarting}
              onClick={onRestart}
              title={t('restartTitle')}
              className="dshcm-h-7 dshcm-flex-none dshcm-px-2 dshcm-text-[11px]"
            >
              {restarting ? t('restarting') : t('restart')}
            </Button>
          ) : null}
        </div>
      ) : null}

      {showStatusLine ? (
        <div
          role="status"
          className="dshcm-px-0.5 dshcm-text-[11.5px] dshcm-leading-relaxed dshcm-text-muted-foreground"
        >
          {busy === 'status' ? t('checking') : summary}
        </div>
      ) : null}

      <div className="dshcm-flex dshcm-flex-col dshcm-gap-1.5">
        <div className="dshcm-flex dshcm-items-center dshcm-justify-between dshcm-gap-2">
          <label
            htmlFor={messageId}
            className="dshcm-text-[11.5px] dshcm-font-medium dshcm-text-muted-foreground"
          >
            {t('messageLabel')}
          </label>
          <Button
            variant="ghost"
            size="sm"
            disabled={!canGenerate}
            onClick={onGenerate}
            aria-label={busy === 'generate' ? t('generating') : t('generateAria')}
            title={busy === 'generate' ? t('generating') : t('generateAria')}
            className="dshcm-h-7 dshcm-gap-1 dshcm-px-1.5 dshcm-text-[11.5px]"
          >
            <Sparkles className="dshcm-size-3.5" />
            {busy === 'generate' ? t('generating') : t('generate')}
          </Button>
        </div>
        <Textarea
          id={messageId}
          className="dshcm-min-h-[88px] dshcm-resize-y"
          value={message}
          rows={3}
          spellCheck
          placeholder={messagePlaceholder}
          disabled={Boolean(busy)}
          onChange={(event) => onChangeMessage(event.target.value)}
          onKeyDown={onMessageKeyDown}
        />
      </div>

      <div className="dshcm-flex dshcm-items-center dshcm-gap-1.5">
        <Button
          variant="default"
          onClick={onCommit}
          disabled={!canCommit}
          aria-label={t('commitAria')}
          title={t('commitAria')}
          className="dshcm-h-9 dshcm-flex-1 hover:dshcm-bg-primary hover:dshcm-text-primary-foreground active:dshcm-opacity-90 disabled:dshcm-bg-secondary disabled:dshcm-text-muted-foreground disabled:dshcm-opacity-100"
        >
          <Check className="dshcm-size-3.5" />
          {busy === 'commit' ? t('committing') : t('commit')}
        </Button>
        {showPush ? (
          <Button
            variant="outline"
            onClick={onPush}
            disabled={!canPush}
            aria-label={t('pushAria')}
            title={t('pushAria')}
            className="dshcm-h-9 dshcm-shrink-0"
          >
            <Upload className="dshcm-size-3.5" />
            {pushLabel(status, busy, fmt, t)}
          </Button>
        ) : null}
      </div>

      {status?.isRepo ? (
        <section aria-label={t('changes')} className="dshcm-border-t dshcm-border-border dshcm-pt-2.5">
          <button
            type="button"
            onClick={onToggleChanges}
            aria-expanded={changesOpen}
            aria-controls={changesId}
            className="dshcm-flex dshcm-w-full dshcm-items-center dshcm-gap-1.5 dshcm-rounded-md dshcm-border-0 dshcm-bg-transparent dshcm-px-1 dshcm-py-1 dshcm-text-left dshcm-transition-colors hover:dshcm-bg-secondary focus-visible:dshcm-outline-none focus-visible:dshcm-ring-2 focus-visible:dshcm-ring-ring"
          >
            {changesOpen ? (
              <ChevronDown className="dshcm-size-3.5 dshcm-flex-none dshcm-text-muted-foreground" />
            ) : (
              <ChevronRight className="dshcm-size-3.5 dshcm-flex-none dshcm-text-muted-foreground" />
            )}
            <span className="dshcm-text-xs dshcm-font-semibold dshcm-text-foreground">
              {t('changes')}
            </span>
            <span className="dshcm-ml-auto dshcm-text-[11px] dshcm-tabular-nums dshcm-text-muted-foreground">
              {status.changedFiles}
            </span>
          </button>
          {changesOpen ? (
            status.files.length > 0 ? (
              <ul id={changesId} className="dshcm-m-0 dshcm-mt-0.5 dshcm-list-none dshcm-p-0">
                {status.files.map((file) => {
                  const parts = splitPath(file.workspacePath || file.path);
                  const letter = statusLetter(file);
                  return (
                    <li key={file.path}>
                      <button
                        type="button"
                        onClick={() => onOpenDiff(file)}
                        title={fmt('showChanges', { path: file.path })}
                        className="dshcm-flex dshcm-min-h-[32px] dshcm-w-full dshcm-items-center dshcm-gap-2 dshcm-rounded-md dshcm-border-0 dshcm-bg-transparent dshcm-px-2 dshcm-py-1.5 dshcm-text-left dshcm-transition-colors hover:dshcm-bg-secondary focus-visible:dshcm-outline-none focus-visible:dshcm-ring-2 focus-visible:dshcm-ring-ring"
                      >
                        <span className="dshcm-flex dshcm-min-w-0 dshcm-flex-1 dshcm-items-baseline dshcm-gap-1.5">
                          <span className="dshcm-max-w-[62%] dshcm-truncate dshcm-text-[12.5px] dshcm-font-medium dshcm-text-foreground">
                            {parts.name}
                          </span>
                          {parts.directory ? (
                            <span className="dshcm-min-w-0 dshcm-flex-1 dshcm-truncate dshcm-text-[11.5px] dshcm-text-muted-foreground">
                              {parts.directory}
                            </span>
                          ) : null}
                        </span>
                        <span
                          className={cn(
                            'dshcm-flex dshcm-h-[18px] dshcm-min-w-[18px] dshcm-flex-none dshcm-items-center dshcm-justify-center dshcm-rounded dshcm-bg-secondary dshcm-px-1 dshcm-text-[11px] dshcm-font-semibold dshcm-tabular-nums',
                            statusTone(letter),
                          )}
                        >
                          {letter}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div
                id={changesId}
                className="dshcm-mt-0.5 dshcm-rounded-md dshcm-border dshcm-border-dashed dshcm-border-border dshcm-px-2.5 dshcm-py-2 dshcm-text-[11.5px] dshcm-text-muted-foreground"
              >
                {t('noChanges')}
              </div>
            )
          ) : null}
        </section>
      ) : null}

      {status?.isRepo && status.commits.length > 0 ? (
        <section aria-labelledby={commitsId} className="dshcm-border-t dshcm-border-border dshcm-pt-2.5">
          <div className="dshcm-flex dshcm-items-center dshcm-justify-between dshcm-gap-2 dshcm-px-0.5 dshcm-pb-1">
            <h3 id={commitsId} className="dshcm-text-xs dshcm-font-semibold dshcm-text-foreground">
              {t('unpushedCommits')}
            </h3>
          </div>
          <ul
            className="dshcm-m-0 dshcm-max-h-[220px] dshcm-list-none dshcm-overflow-auto dshcm-p-0"
            aria-label={t('unpushedCommits')}
          >
            {status.commits.map((commit) => {
              const date = commitDate(commit.timestamp);
              return (
                <li
                  key={commit.hash}
                  className="dshcm-flex dshcm-items-start dshcm-gap-2 dshcm-border-t dshcm-border-border dshcm-py-2 first:dshcm-border-t-0"
                >
                  <code className="dshcm-mt-0.5 dshcm-shrink-0 dshcm-font-mono dshcm-text-[11px] dshcm-tabular-nums dshcm-text-muted-foreground">
                    {commit.shortHash || commit.hash.slice(0, 7)}
                  </code>
                  <div className="dshcm-min-w-0 dshcm-flex-1">
                    <div
                      className="dshcm-truncate dshcm-text-[12.5px] dshcm-text-foreground"
                      title={commit.subject}
                    >
                      {commit.subject}
                    </div>
                    <div className="dshcm-mt-0.5 dshcm-flex dshcm-items-center dshcm-gap-1 dshcm-text-[11px] dshcm-text-muted-foreground">
                      <span className="dshcm-truncate">{commit.author}</span>
                      {date ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="dshcm-shrink-0">{date}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <BranchDialog
        branch={branch}
        t={t}
        onClose={onCloseBranches}
        onSwitch={onSwitchBranch}
        onNewName={onNewBranchName}
        onCreate={onCreateBranch}
      />

      <GitHubDialog
        github={github}
        t={t}
        onClose={onCloseGitHub}
        onChooseVisibility={onChooseVisibility}
        onBack={onBackToVisibility}
        onRepositoryName={onRepositoryName}
        onCreate={onCreateRepository}
      />
    </div>
  );
}
