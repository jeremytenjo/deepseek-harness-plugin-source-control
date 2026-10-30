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

interface CommitTriggerProps {
  t: Translate;
  onOpenPanel(): void;
  onGeneratePush(): Promise<CommitTriggerResult>;
}

interface ToastState {
  seq: number;
  text: string;
  ok: boolean;
  preview?: string;
  left: number;
  top: number;
}

const TOAST_HOLD_MS = 5000;

function TriggerToast({
  text,
  ok,
  preview,
  left,
  top,
  onDismiss,
}: {
  text: string;
  ok: boolean;
  preview?: string;
  left: number;
  top: number;
  onDismiss(): void;
}) {
  React.useEffect(() => {
    const timer = window.setTimeout(onDismiss, TOAST_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{ left, top, transform: 'translate(-50%, -100%)' }}
      className="dshcm-ui dshcm-fixed dshcm-z-[2000] dshcm-flex dshcm-max-w-[min(440px,calc(100vw-32px))] dshcm-cursor-pointer dshcm-items-start dshcm-gap-2 dshcm-rounded-lg dshcm-border dshcm-border-border dshcm-bg-popover dshcm-px-3 dshcm-py-2 dshcm-text-[12px] dshcm-leading-relaxed dshcm-text-popover-foreground dshcm-shadow-lg"
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
  );
}

export function CommitTrigger({ t, onOpenPanel, onGeneratePush }: CommitTriggerProps) {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const busyRef = React.useRef(false);
  const mounted = React.useRef(true);
  const toastSeq = React.useRef(0);
  const [busy, setBusy] = React.useState(false);
  const [toast, setToast] = React.useState<ToastState | null>(null);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const dismissToast = React.useCallback(() => setToast(null), []);

  function presentToast(text: string, ok: boolean, preview?: string) {
    const button = buttonRef.current;
    const card = button?.closest('[data-composer-card]');
    const rect = (card ?? button)?.getBoundingClientRect();
    const margin = 16;
    const halfWidth = Math.min(220, Math.max(0, window.innerWidth / 2 - margin));
    const left = rect
      ? Math.min(
          Math.max(rect.left + rect.width / 2, halfWidth + margin),
          window.innerWidth - halfWidth - margin,
        )
      : window.innerWidth / 2;
    const top = rect ? rect.top - 12 : window.innerHeight - 120;
    toastSeq.current += 1;
    setToast({ seq: toastSeq.current, text, ok, preview, left, top });
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
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <button
            ref={buttonRef}
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
        <ContextMenuContent className="dshcm-min-w-[196px]">
          <ContextMenuItem
            disabled={busy}
            onSelect={() => {
              void runGeneratePush();
            }}
            className={cn('dshcm-gap-2', busy && 'dshcm-opacity-60')}
          >
            <Sparkles className="dshcm-size-3.5 dshcm-flex-none dshcm-text-muted-foreground" />
            <span>{t('triggerGeneratePush')}</span>
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
              left={toast.left}
              top={toast.top}
              onDismiss={dismissToast}
            />,
            document.body,
          )
        : null}
    </>
  );
}
