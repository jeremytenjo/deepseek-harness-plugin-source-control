import * as React from 'react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  Github,
  RefreshCw,
  Sparkles,
  Upload,
} from 'lucide-react';

import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { ensureTailwindStyles } from '../lib/styles';
import { cn } from '../lib/utils';
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
  onRestart,
  onCloseGitHub,
  onChooseVisibility,
  onBackToVisibility,
  onRepositoryName,
  onCreateRepository,
}: SourceControlPanelProps) {
  return (
    <div className="dshcm-ui dshcm-flex dshcm-h-full dshcm-min-h-0 dshcm-flex-col dshcm-gap-2 dshcm-overflow-y-auto dshcm-bg-transparent dshcm-px-[14px] dshcm-pb-[18px] dshcm-pt-3 dshcm-text-foreground">
      <div className="dshcm-flex dshcm-items-center dshcm-gap-2">
        <span className="dshcm-text-[11.5px] dshcm-font-semibold dshcm-uppercase dshcm-tracking-[0.07em] dshcm-text-foreground">
          {t('title')}
        </span>
        <div className="dshcm-ml-auto dshcm-flex dshcm-items-center dshcm-gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={!status?.isRepo || Boolean(busy)}
            onClick={onOpenGitHub}
            aria-label={githubLabel}
            title={githubLabel}
          >
            <Github className="dshcm-h-3.5 dshcm-w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={Boolean(busy)}
            onClick={onRefresh}
            aria-label={t('refreshAria')}
            title={t('refreshAria')}
          >
            <RefreshCw
              className={cn(
                'dshcm-h-3.5 dshcm-w-3.5',
                busy === 'status' && 'dshcm-animate-spin',
              )}
            />
          </Button>
        </div>
      </div>

      {feedback ? (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'dshcm-flex dshcm-items-start dshcm-gap-2 dshcm-text-xs',
            feedbackTone(feedback.kind),
          )}
        >
          <span className="dshcm-min-w-0 dshcm-flex-1 dshcm-leading-relaxed">{feedback.text}</span>
          {canRestart ? (
            <Button
              variant="outline"
              size="sm"
              disabled={restarting}
              onClick={onRestart}
              title={t('restartTitle')}
              className="dshcm-h-6 dshcm-px-2 dshcm-text-[11px]"
            >
              {restarting ? t('restarting') : t('restart')}
            </Button>
          ) : null}
        </div>
      ) : null}

      <div className="dshcm-relative">
        <Textarea
          className="dshcm-min-h-[96px] dshcm-resize-y dshcm-pr-10"
          value={message}
          rows={4}
          spellCheck
          placeholder={messagePlaceholder}
          disabled={Boolean(busy)}
          onChange={(event) => onChangeMessage(event.target.value)}
          onKeyDown={onMessageKeyDown}
          aria-label={t('messageLabel')}
        />
        <Button
          variant="ghost"
          size="icon"
          className="dshcm-absolute dshcm-right-1.5 dshcm-top-1.5 dshcm-h-7 dshcm-w-7 dshcm-text-primary"
          disabled={!canGenerate}
          onClick={onGenerate}
          aria-label={busy === 'generate' ? t('generating') : t('generateAria')}
          title={busy === 'generate' ? t('generating') : t('generateAria')}
        >
          <Sparkles className="dshcm-h-3.5 dshcm-w-3.5" />
        </Button>
      </div>

      <div className="dshcm-flex dshcm-items-center dshcm-gap-1.5">
        <Button
          variant="outline"
          onClick={onCommit}
          disabled={!canCommit}
          aria-label={t('commitAria')}
          title={t('commitAria')}
          className="dshcm-h-9 dshcm-flex-1 dshcm-border-primary dshcm-bg-secondary dshcm-text-primary hover:dshcm-bg-background hover:dshcm-text-primary"
        >
          <Check className="dshcm-h-3.5 dshcm-w-3.5" />
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
            <Upload className="dshcm-h-3.5 dshcm-w-3.5" />
            {pushLabel(status, busy, fmt, t)}
          </Button>
        ) : null}
      </div>

      <div
        className="dshcm-min-h-4 dshcm-px-0.5 dshcm-text-[11.5px] dshcm-text-muted-foreground"
        aria-live="polite"
      >
        {busy === 'status' ? t('checking') : summary}
      </div>

      {status?.isRepo ? (
        <div className="dshcm-border-t dshcm-border-border dshcm-pt-2">
          <button
            type="button"
            onClick={onToggleChanges}
            aria-expanded={changesOpen}
            className="dshcm-flex dshcm-w-full dshcm-items-center dshcm-gap-1.5 dshcm-border-0 dshcm-bg-transparent dshcm-px-0.5 dshcm-pb-1 dshcm-text-left"
          >
            {changesOpen ? (
              <ChevronDown className="dshcm-h-3.5 dshcm-w-3.5 dshcm-flex-none dshcm-text-muted-foreground" />
            ) : (
              <ChevronRight className="dshcm-h-3.5 dshcm-w-3.5 dshcm-flex-none dshcm-text-muted-foreground" />
            )}
            <span className="dshcm-text-xs dshcm-font-semibold dshcm-text-foreground">
              {t('changes')}
            </span>
            <span className="dshcm-ml-auto dshcm-text-[11px] dshcm-text-muted-foreground">
              {status.changedFiles}
            </span>
          </button>
          {changesOpen ? (
            status.files.length > 0 ? (
              <ul className="dshcm-m-0 dshcm-list-none dshcm-p-0">
                {status.files.map((file) => {
                  const parts = splitPath(file.workspacePath || file.path);
                  const letter = statusLetter(file);
                  return (
                    <li key={file.path}>
                      <button
                        type="button"
                        onClick={() => onOpenDiff(file)}
                        title={fmt('showChanges', { path: file.path })}
                        className="dshcm-flex dshcm-w-full dshcm-items-center dshcm-gap-2 dshcm-rounded-md dshcm-border-0 dshcm-bg-transparent dshcm-px-1.5 dshcm-py-1.5 dshcm-text-left dshcm-transition-colors hover:dshcm-bg-secondary"
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
                            'dshcm-w-3.5 dshcm-shrink-0 dshcm-text-center dshcm-text-[11px] dshcm-font-semibold',
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
              <div className="dshcm-px-1 dshcm-py-1 dshcm-text-xs dshcm-text-muted-foreground">
                {t('noChanges')}
              </div>
            )
          ) : null}
        </div>
      ) : null}

      {status?.isRepo && status.commits.length > 0 ? (
        <div className="dshcm-border-t dshcm-border-border dshcm-pt-2">
          <div className="dshcm-flex dshcm-items-center dshcm-justify-between dshcm-gap-2 dshcm-px-0.5 dshcm-pb-1">
            <span className="dshcm-text-[11px] dshcm-font-semibold dshcm-uppercase dshcm-tracking-[0.06em] dshcm-text-muted-foreground">
              {t('unpushedCommits')}
            </span>
            {status.upstream ? (
              <span className="dshcm-max-w-[220px] dshcm-truncate dshcm-font-mono dshcm-text-[11px] dshcm-text-muted-foreground">
                {status.upstream}
              </span>
            ) : null}
          </div>
          <ul
            className="dshcm-m-0 dshcm-max-h-[220px] dshcm-list-none dshcm-overflow-auto dshcm-p-0"
            aria-label={t('unpushedCommits')}
          >
            {status.commits.map((commit) => (
              <li
                key={commit.hash}
                title={commit.subject}
                className="dshcm-flex dshcm-items-baseline dshcm-gap-2 dshcm-border-t dshcm-border-border dshcm-py-1 first:dshcm-border-t-0"
              >
                <code className="dshcm-shrink-0 dshcm-font-mono dshcm-text-[11px] dshcm-text-primary">
                  {commit.shortHash || commit.hash.slice(0, 7)}
                </code>
                <span className="dshcm-min-w-0 dshcm-flex-1 dshcm-truncate dshcm-text-[12.5px] dshcm-text-foreground">
                  {commit.subject}
                </span>
                <span className="dshcm-max-w-[170px] dshcm-shrink-0 dshcm-truncate dshcm-text-[11px] dshcm-text-muted-foreground">
                  {[commit.author, commitDate(commit.timestamp)].filter(Boolean).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

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
