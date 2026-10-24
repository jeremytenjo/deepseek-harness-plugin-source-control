import * as React from 'react';
import { parsePatchFiles, type FileDiffMetadata, type FileDiffOptions } from '@pierre/diffs';
import { FileDiff } from '@pierre/diffs/react';
import { ExternalLink, FileCode2, RefreshCw } from 'lucide-react';

import { Button } from '../components/ui/button';
import { ensureTailwindStyles } from '../lib/styles';
import { cn } from '../lib/utils';

ensureTailwindStyles();

type DiffPhase = 'loading' | 'ready' | 'error';

export interface DiffViewState {
  phase: DiffPhase;
  diff: string;
  truncated: boolean;
  binary: boolean;
  status: string;
  error: string;
}

export interface DiffViewProps {
  path: string;
  params: Record<string, unknown>;
  state: DiffViewState;
  canOpenFile: boolean;
  label: (key: string, values?: Record<string, string | number>) => string;
  onRefresh: () => void;
  onOpenFile: () => void;
}

const DIFF_UNSAFE_CSS = `
:host {
  --diffs-font-family: var(--dshcm-font-mono);
  --diffs-header-font-family: var(--dshcm-font-sans);
  --diffs-bg: transparent;
  --diffs-light-bg: transparent;
  --diffs-dark-bg: transparent;
  --diffs-addition-color-override: var(--dsw-alias-state-success-primary);
  --diffs-deletion-color-override: var(--dsw-alias-state-error-primary);
  --diffs-bg-separator: transparent;
}
[data-file-info] {
  display: none !important;
}
[data-expand-button] {
  display: none !important;
}
[data-separator="line-info"],
[data-separator="line-info-basic"],
[data-separator="simple"],
[data-separator-wrapper] {
  background-color: transparent !important;
}
[data-separator-content],
[data-separator-content] * {
  color: var(--dsw-alias-label-secondary) !important;
  font-family: var(--dshcm-font-sans) !important;
  font-size: 11px !important;
  background: transparent !important;
}
`;

function hashString(input: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(36);
}

function parseFileDiff(diff: string): FileDiffMetadata | null {
  if (!diff.trim()) return null;
  try {
    const patches = parsePatchFiles(diff, `dshcm:${diff.length}:${hashString(diff)}`);
    return patches.flatMap((patch) => patch.files)[0] ?? null;
  } catch {
    return null;
  }
}

function isDarkTheme(): boolean {
  if (typeof document === 'undefined') return true;
  const body = document.body;
  const root = document.documentElement;
  if (body.hasAttribute('data-ds-dark-theme')) return true;
  if (root.hasAttribute('data-ds-dark-theme')) return true;
  if (body.classList.contains('dark') || root.classList.contains('dark')) return true;
  return typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : true;
}

function useDarkTheme(): boolean {
  const [dark, setDark] = React.useState(isDarkTheme);

  React.useEffect(() => {
    const read = () => setDark(isDarkTheme());
    const observer = new MutationObserver(read);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-ds-dark-theme'],
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-ds-dark-theme'],
    });
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    media?.addEventListener?.('change', read);
    read();
    return () => {
      observer.disconnect();
      media?.removeEventListener?.('change', read);
    };
  }, []);

  return dark;
}

function splitPath(path: string): { name: string; directory: string } {
  const normalized = path.replace(/\\/g, '/');
  const cut = normalized.lastIndexOf('/');
  return cut === -1
    ? { name: normalized, directory: '' }
    : { name: normalized.slice(cut + 1), directory: normalized.slice(0, cut) };
}

export function DiffView({
  path,
  params,
  state,
  canOpenFile,
  label,
  onRefresh,
  onOpenFile,
}: DiffViewProps) {
  const dark = useDarkTheme();
  const { name, directory } = React.useMemo(() => splitPath(path), [path]);
  const fileDiff = React.useMemo(
    () => (state.phase === 'ready' && !state.binary ? parseFileDiff(state.diff) : null),
    [state.phase, state.binary, state.diff],
  );

  const stats = React.useMemo(() => {
    if (!fileDiff) return { added: 0, removed: 0 };
    return fileDiff.hunks.reduce(
      (total, hunk) => ({
        added: total.added + hunk.additionLines,
        removed: total.removed + hunk.deletionLines,
      }),
      { added: 0, removed: 0 },
    );
  }, [fileDiff]);

  const options = React.useMemo<FileDiffOptions<undefined, undefined>>(
    () => ({
      diffStyle: 'unified',
      lineDiffType: 'none',
      overflow: 'scroll',
      disableFileHeader: true,
      theme: { light: 'pierre-light', dark: 'pierre-dark' },
      themeType: dark ? 'dark' : 'light',
      preferredHighlighter: 'shiki-js',
      unsafeCSS: DIFF_UNSAFE_CSS,
    }),
    [dark],
  );

  const letter = typeof params.letter === 'string' ? params.letter : '';
  const status = letter || (state.status ? state.status.trim() : '');
  const tone = letter === 'D' ? 'deleted' : letter === 'U' || letter === 'A' ? 'new' : 'modified';
  const statusColor =
    tone === 'deleted'
      ? 'var(--dsw-alias-state-error-primary)'
      : tone === 'new'
        ? 'var(--dsw-alias-state-success-primary)'
        : 'var(--dsw-alias-brand-primary)';

  let body: React.ReactNode;
  if (state.phase === 'error') {
    body = (
      <div className="dshcm-flex dshcm-flex-1 dshcm-flex-col dshcm-items-center dshcm-justify-center dshcm-gap-3 dshcm-p-6 dshcm-text-center">
        <div className="dshcm-max-w-[360px] dshcm-text-xs dshcm-leading-relaxed dshcm-text-[color:var(--dsw-alias-state-error-primary)]">
          {state.error || label('diffFailed')}
        </div>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          {label('diffRetry')}
        </Button>
      </div>
    );
  } else if (state.binary) {
    body = (
      <div className="dshcm-flex dshcm-flex-1 dshcm-items-center dshcm-justify-center dshcm-p-6 dshcm-text-xs dshcm-text-muted-foreground">
        {label('diffBinary')}
      </div>
    );
  } else if (!state.diff) {
    body = (
      <div className="dshcm-flex dshcm-flex-1 dshcm-items-center dshcm-justify-center dshcm-gap-2 dshcm-p-6 dshcm-text-xs dshcm-text-muted-foreground">
        {state.phase === 'loading' ? (
          <>
            <RefreshCw className="dshcm-h-3.5 dshcm-w-3.5 dshcm-animate-spin" />
            {label('diffLoading')}
          </>
        ) : state.truncated ? (
          label('diffTruncated')
        ) : (
          label('diffEmpty')
        )}
      </div>
    );
  } else if (!fileDiff) {
    body = (
      <pre className="dshcm-m-0 dshcm-overflow-auto dshcm-p-3 dshcm-font-mono dshcm-text-[11px] dshcm-leading-relaxed dshcm-text-foreground">
        {state.diff}
      </pre>
    );
  } else {
    body = (
      <FileDiff
        fileDiff={fileDiff}
        options={options}
        disableWorkerPool
        className="dshcm-block dshcm-min-w-full dshcm-font-mono"
      />
    );
  }

  return (
    <div className="dshcm-ui dshcm-flex dshcm-h-full dshcm-min-h-0 dshcm-flex-col dshcm-gap-2 dshcm-bg-transparent dshcm-px-[14px] dshcm-py-3 dshcm-text-foreground">
      <div className="dshcm-flex dshcm-flex-wrap dshcm-items-center dshcm-gap-2">
        <div className="dshcm-flex dshcm-min-w-0 dshcm-flex-1 dshcm-items-center dshcm-gap-1.5">
          <FileCode2 className="dshcm-h-3.5 dshcm-w-3.5 dshcm-flex-none dshcm-text-muted-foreground" />
          <span
            className="dshcm-truncate dshcm-text-[13px] dshcm-font-semibold"
            title={path}
          >
            {name || path}
          </span>
          {directory ? (
            <span
              className="dshcm-truncate dshcm-text-[11px] dshcm-text-muted-foreground"
              title={path}
            >
              {directory}
            </span>
          ) : null}
          {status ? (
            <span
              className="dshcm-flex-none dshcm-rounded dshcm-bg-secondary dshcm-px-1.5 dshcm-py-0.5 dshcm-text-[10px] dshcm-font-semibold"
              style={{ color: statusColor }}
            >
              {status}
            </span>
          ) : null}
        </div>
        <div className="dshcm-ml-auto dshcm-flex dshcm-items-center dshcm-gap-1">
          {canOpenFile ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenFile}
              title={label('diffOpenFileAria', { path })}
            >
              <ExternalLink className="dshcm-h-3.5 dshcm-w-3.5" />
              {label('diffOpenFile')}
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            disabled={state.phase === 'loading'}
            aria-label={label('diffRefreshAria')}
            title={label('diffRefreshAria')}
          >
            <RefreshCw
              className={cn(
                'dshcm-h-3.5 dshcm-w-3.5',
                state.phase === 'loading' && 'dshcm-animate-spin',
              )}
            />
          </Button>
        </div>
      </div>

      {fileDiff && !state.binary ? (
        <div className="dshcm-flex dshcm-gap-2 dshcm-font-mono dshcm-text-[11px]">
          <span
            className="dshcm-text-[color:var(--dsw-alias-state-success-primary)]"
            title={label('diffAdded', { count: stats.added })}
          >
            +{stats.added}
          </span>
          <span
            className="dshcm-text-[color:var(--dsw-alias-state-error-primary)]"
            title={label('diffRemoved', { count: stats.removed })}
          >
            −{stats.removed}
          </span>
        </div>
      ) : null}

      <div className="dshcm-relative dshcm-flex dshcm-min-h-0 dshcm-flex-1 dshcm-flex-col dshcm-overflow-hidden dshcm-rounded-lg dshcm-border dshcm-border-border dshcm-bg-background">
        <div
          className="dshcm-flex dshcm-min-h-0 dshcm-flex-1 dshcm-flex-col dshcm-overflow-auto"
          role="region"
          tabIndex={0}
          aria-label={label('showChanges', { path })}
        >
          {body}
        </div>
        {state.truncated ? (
          <div className="dshcm-flex-none dshcm-border-t dshcm-border-border dshcm-px-3 dshcm-py-1.5 dshcm-text-[11px] dshcm-text-muted-foreground">
            {label('diffTruncated')}
          </div>
        ) : null}
      </div>
    </div>
  );
}
