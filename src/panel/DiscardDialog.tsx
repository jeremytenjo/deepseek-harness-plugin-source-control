import { Loader2, TriangleAlert } from 'lucide-react';

import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import type { Translate } from './types';

interface DiscardDialogProps {
  open: boolean;
  busy: boolean;
  t: Translate;
  onClose(): void;
  onConfirm(): void;
}

export function DiscardDialog({ open, busy, t, onClose, onConfirm }: DiscardDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !busy) onClose();
      }}
    >
      <DialogContent
        showClose={!busy}
        closeLabel={t('discardCancel')}
        onBackdrop={onClose}
        onEscapeKeyDown={(event) => {
          if (busy) event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{t('discardTitle')}</DialogTitle>
          <DialogDescription>{t('discardDescription')}</DialogDescription>
        </DialogHeader>
        <div className="dshcm-mt-4 dshcm-flex dshcm-items-start dshcm-gap-1.5 dshcm-rounded-md dshcm-bg-secondary dshcm-px-2.5 dshcm-py-2 dshcm-text-[11.5px] dshcm-leading-relaxed dshcm-text-muted-foreground">
          <TriangleAlert className="dshcm-mt-0.5 dshcm-size-3.5 dshcm-flex-none dshcm-text-[color:var(--dsw-alias-state-error-primary)]" />
          <span>{t('discardWarning')}</span>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" autoFocus disabled={busy} onClick={onClose}>
            {t('discardCancel')}
          </Button>
          <Button variant="destructive" size="sm" disabled={busy} onClick={onConfirm}>
            {busy ? <Loader2 className="dshcm-size-3.5 dshcm-animate-spin" /> : null}
            {busy ? t('discarding') : t('discardConfirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
