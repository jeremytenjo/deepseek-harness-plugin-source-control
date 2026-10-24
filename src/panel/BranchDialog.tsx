import * as React from 'react';
import { Check, GitBranch, Loader2, Plus } from 'lucide-react';

import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';
import type { BranchState, Translate } from './types';

interface BranchDialogProps {
  branch: BranchState | null;
  t: Translate;
  onClose(): void;
  onSwitch(name: string): void;
  onNewName(value: string): void;
  onCreate(): void;
}

export function BranchDialog({
  branch,
  t,
  onClose,
  onSwitch,
  onNewName,
  onCreate,
}: BranchDialogProps) {
  const nameId = React.useId();
  const open = Boolean(branch);
  const busy = Boolean(branch?.busy);
  const branches = React.useMemo(() => {
    if (!branch) return [];
    return [...branch.branches].sort((left, right) => {
      if (left === branch.current) return -1;
      if (right === branch.current) return 1;
      return left.localeCompare(right);
    });
  }, [branch?.branches, branch?.current]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !branch?.busy) onClose();
      }}
    >
      {branch ? (
        <DialogContent
          showClose={!busy}
          closeLabel={t('branchClose')}
          onBackdrop={onClose}
          onEscapeKeyDown={(event) => {
            if (branch.busy) event.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>{t('branchModalTitle')}</DialogTitle>
            <DialogDescription>{t('branchModalDescription')}</DialogDescription>
          </DialogHeader>

          <div className="dshcm-mt-4 dshcm-flex dshcm-flex-col dshcm-gap-1.5">
            <div className="dshcm-flex dshcm-items-center dshcm-justify-between dshcm-gap-2">
              <span className="dshcm-text-[11.5px] dshcm-font-semibold dshcm-text-muted-foreground">
                {t('branchListLabel')}
              </span>
            </div>

            <div
              className="dshcm-max-h-[224px] dshcm-overflow-y-auto dshcm-rounded-md dshcm-border dshcm-border-border"
              aria-label={t('branchListLabel')}
            >
              {branch.loading ? (
                <div className="dshcm-flex dshcm-items-center dshcm-gap-2 dshcm-px-3 dshcm-py-4 dshcm-text-[12px] dshcm-text-muted-foreground">
                  <Loader2 className="dshcm-size-3.5 dshcm-animate-spin" />
                  {t('branchLoading')}
                </div>
              ) : branches.length > 0 ? (
                <ul className="dshcm-m-0 dshcm-list-none dshcm-p-0">
                  {branches.map((name) => {
                    const current = name === branch.current;
                    return (
                      <li key={name} className="dshcm-border-t dshcm-border-border first:dshcm-border-t-0">
                        <button
                          type="button"
                          disabled={Boolean(branch.busy) || current}
                          onClick={() => onSwitch(name)}
                          aria-current={current ? 'true' : undefined}
                          title={name}
                          className={cn(
                            'dshcm-flex dshcm-min-h-[34px] dshcm-w-full dshcm-items-center dshcm-gap-2 dshcm-border-0 dshcm-bg-transparent dshcm-px-2.5 dshcm-py-1.5 dshcm-text-left dshcm-text-[12px] dshcm-transition-colors focus-visible:dshcm-outline-none focus-visible:dshcm-ring-1 focus-visible:dshcm-ring-ring',
                            current
                              ? 'dshcm-bg-secondary dshcm-text-foreground'
                              : 'dshcm-text-foreground hover:dshcm-bg-secondary',
                          )}
                        >
                          <GitBranch className="dshcm-size-3.5 dshcm-flex-none dshcm-text-muted-foreground" />
                          <span className="dshcm-min-w-0 dshcm-flex-1 dshcm-truncate">{name}</span>
                          {current ? (
                            <span className="dshcm-flex dshcm-flex-none dshcm-items-center dshcm-gap-1 dshcm-text-[11px] dshcm-text-muted-foreground">
                              <Check className="dshcm-size-3" />
                              {t('branchCurrent')}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="dshcm-px-3 dshcm-py-4 dshcm-text-[12px] dshcm-text-muted-foreground">
                  {t('branchEmpty')}
                </div>
              )}
            </div>

            {branch.error ? (
              <div
                role="alert"
                className="dshcm-rounded-md dshcm-bg-secondary dshcm-px-2.5 dshcm-py-2 dshcm-text-[12px] dshcm-leading-relaxed dshcm-text-[color:var(--dsw-alias-state-error-primary)]"
              >
                {branch.error}
              </div>
            ) : null}

            {branch.busy === 'switch' ? (
              <div
                role="status"
                className="dshcm-flex dshcm-items-center dshcm-gap-1.5 dshcm-text-[11.5px] dshcm-text-muted-foreground"
              >
                <Loader2 className="dshcm-size-3.5 dshcm-animate-spin" />
                {t('branchSwitching')}
              </div>
            ) : null}
          </div>

          <div className="dshcm-mt-4 dshcm-flex dshcm-flex-col dshcm-gap-1.5 dshcm-border-t dshcm-border-border dshcm-pt-3">
            <label
              htmlFor={nameId}
              className="dshcm-text-[11.5px] dshcm-font-semibold dshcm-text-muted-foreground"
            >
              {t('branchCreateLabel')}
            </label>
            <div className="dshcm-flex dshcm-items-center dshcm-gap-1.5">
              <Input
                id={nameId}
                autoFocus
                value={branch.name}
                disabled={busy}
                spellCheck={false}
                autoComplete="off"
                placeholder={t('branchCreatePlaceholder')}
                onChange={(event) => onNewName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    onCreate();
                  }
                }}
              />
              <Button
                type="button"
                variant="default"
                disabled={busy || !branch.name.trim()}
                onClick={onCreate}
                className="dshcm-h-9 dshcm-shrink-0 disabled:dshcm-bg-secondary disabled:dshcm-text-muted-foreground disabled:dshcm-opacity-100"
              >
                {branch.busy === 'create' ? (
                  <Loader2 className="dshcm-size-3.5 dshcm-animate-spin" />
                ) : (
                  <Plus className="dshcm-size-3.5" />
                )}
                {branch.busy === 'create' ? t('branchCreating') : t('branchCreateButton')}
              </Button>
            </div>
            <div className="dshcm-text-[11px] dshcm-leading-relaxed dshcm-text-muted-foreground">
              {t('branchCreateHint')}
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
