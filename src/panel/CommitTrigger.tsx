import * as React from 'react';
import { createPortal } from 'react-dom';
import { CircleAlert, CircleCheck, GitBranch, Loader2, Sparkles } from 'lucide-react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../components/ui/context-menu';
import { cn } from '../lib/utils';
import type { Translate } from './types';

export interface CommitTriggerResult {
  ok: boolean;
  text: string;
  preview?: string;
}

export interface CommitTriggerStatus {
  summary: string;
  canRun: boolean;
  isRepo: boolean;
}

interface CommitTriggerProps {
  t: Translate;
  onOpenPanel(): void;
  onGeneratePush(): Promise<CommitTriggerResult>;
  onLoadStatus(): Promise<CommitTriggerStatus | null>;
}

interface ToastState {
  seq: number;
  text: string;
  ok: boolean;
  preview?: string;
}

const TOAST_HOLD_MS = 5000;

function TriggerToast({
  text,
  ok,
  preview,
  onDismiss,
}: {
  text: string;
  ok: boolean;
  preview?: string;
  onDismiss(): void;
}) {
  React.useEffect(() => {
    const timer = window.setTimeout(onDismiss, TOAST_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="dshcm-fixed dshcm-inset-x-0 dshcm-top-4 dshcm-z-[2000] dshcm-flex dshcm-justify-center dshcm-px-4 dshcm-pointer-events-none">
      <div
        role="status"
        aria-live="polite"
        className="dshcm-ui dshcm-pointer-events-auto dshcm-flex dshcm-max-w-[min(440px,calc(100vw-32px))] dshcm-cursor-pointer dshcm-items-start dshcm-gap-2 dshcm-rounded-lg dshcm-border dshcm-border-border dshcm-bg-popover dshcm-px-3 dshcm-py-2 dshcm-text-[12px] dshcm-leading-relaxed dshcm-text-popover-foreground dshcm-shadow-lg"
        onClick={onDismiss}
      >
        {ok ? (
          <CircleCheck className="dshcm-mt-0.5 dshcm-size-3.5 dshcm-flex-none dshcm-text-[color:var(--dsw-alias-state-success-primary)]" />
        ) : (
          <CircleAlert className="dshcm-mt-0.5 dshcm-size-3.5 dshcm-flex-none dshcm-text-[color:var(--dsw-alias-state-error-primary)]" />
        )}
        <div className="dshcm-flex dshcm-min-w-0 dshcm-flex-col dshcm-gap-0.5">
          <span className="dshcm-break-words dshcm-whitespace-pre-line">{text}</span>
          {preview ? (
            <span
              className="dshcm-min-w-0 dshcm-truncate dshcm-text-[11px] dshcm-text-muted-foreground"
              title={preview}
            >
              {preview}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function CommitTrigger({
  t,
  onOpenPanel,
  onGeneratePush,
  onLoadStatus,
}: CommitTriggerProps) {
  const busyRef = React.useRef(false);
  const mounted = React.useRef(true);
  const toastSeq = React.useRef(0);
  const statusSeq = React.useRef(0);
  const [busy, setBusy] = React.useState(false);
  const [toast, setToast] = React.useState<ToastState | null>(null);
  const [statusLoading, setStatusLoading] = React.useState(false);
  const [status, setStatus] = React.useState<CommitTriggerStatus | null>(null);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const dismissToast = React.useCallback(() => setToast(null), []);

  async function refreshMenuStatus() {
    statusSeq.current += 1;
    const seq = statusSeq.current;
    setStatusLoading(true);
    try {
      const next = await onLoadStatus();
      if (mounted.current && seq === statusSeq.current) setStatus(next);
    } finally {
      if (mounted.current && seq === statusSeq.current) setStatusLoading(false);
    }
  }

  function presentToast(text: string, ok: boolean, preview?: string) {
    toastSeq.current += 1;
    setToast({ seq: toastSeq.current, text, ok, preview });
  }

  async function runGeneratePush() {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    try {
      const result = await onGeneratePush();
      if (mounted.current) presentToast(result.text, result.ok, result.preview);
    } catch (error) {
      if (mounted.current) {
        presentToast(error instanceof Error ? error.message : String(error), false);
      }
    } finally {
      busyRef.current = false;
      if (mounted.current) setBusy(false);
    }
  }

  return (
    <>
      <ContextMenu
        onOpenChange={(open) => {
          if (open) void refreshMenuStatus();
        }}
      >
        <ContextMenuTrigger asChild>
          <button
            type="button"
            className="dshcm-trigger"
            onClick={onOpenPanel}
            onContextMenu={(event) => event.stopPropagation()}
            aria-label={busy ? t('triggerBusy') : t('showPanel')}
            title={busy ? t('triggerBusy') : t('showPanel')}
            aria-busy={busy ? 'true' : undefined}
          >
            {busy ? (
              <Loader2
                size={15}
                strokeWidth={1.5}
                className="dshcm-animate-spin"
                aria-hidden="true"
                focusable="false"
              />
            ) : (
              <GitBranch size={15} strokeWidth={1.5} aria-hidden="true" focusable="false" />
            )}
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent className="dshcm-min-w-[272px]">
          <ContextMenuItem
            disabled={busy || Boolean(status && !status.canRun)}
            title={status?.summary}
            onSelect={() => {
              void runGeneratePush();
            }}
            className={cn('dshcm-gap-2', busy && 'dshcm-opacity-60')}
          >
            <Sparkles className="dshcm-size-3.5 dshcm-flex-none dshcm-text-muted-foreground" />
            <span>{t('triggerGeneratePush')}</span>
            <span className="dshcm-ml-auto dshcm-flex dshcm-flex-none dshcm-items-center dshcm-pl-2 dshcm-text-[10.5px] dshcm-text-muted-foreground">
              {statusLoading ? (
                <Loader2 className="dshcm-size-3 dshcm-animate-spin" />
              ) : status?.canRun ? (
                <span className="dshcm-max-w-[96px] dshcm-truncate">{status.summary}</span>
              ) : status ? (
                <span className="dshcm-max-w-[76px] dshcm-truncate">
                  {status.isRepo ? t('triggerNoChangesShort') : t('triggerNotRepoShort')}
                </span>
              ) : null}
            </span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {toast && typeof document !== 'undefined'
        ? createPortal(
            <TriggerToast
              key={toast.seq}
              text={toast.text}
              ok={toast.ok}
              preview={toast.preview}
              onDismiss={dismissToast}
            />,
            document.body,
          )
        : null}
    </>
  );
}
