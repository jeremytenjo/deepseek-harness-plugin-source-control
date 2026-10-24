import * as React from 'react';
import { Github, Globe, Lock } from 'lucide-react';

import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';
import type { GitHubState, GitHubVisibility, Translate } from './types';

interface GitHubDialogProps {
  github: GitHubState | null;
  t: Translate;
  onClose(): void;
  onChooseVisibility(visibility: GitHubVisibility): void;
  onBack(): void;
  onRepositoryName(value: string): void;
  onCreate(): void;
}

function OptionCard({
  icon,
  title,
  hint,
  autoFocus,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
  autoFocus?: boolean;
  onClick(): void;
}) {
  return (
    <button
      type="button"
      autoFocus={autoFocus}
      onClick={onClick}
      className="dshcm-flex dshcm-w-full dshcm-items-center dshcm-gap-3 dshcm-rounded-lg dshcm-border dshcm-border-border dshcm-bg-secondary dshcm-p-3 dshcm-text-left dshcm-transition-colors hover:dshcm-border-primary hover:dshcm-bg-accent focus-visible:dshcm-outline-none focus-visible:dshcm-ring-1 focus-visible:dshcm-ring-ring"
    >
      <span className="dshcm-flex dshcm-h-9 dshcm-w-9 dshcm-flex-none dshcm-items-center dshcm-justify-center dshcm-rounded-md dshcm-bg-background dshcm-text-muted-foreground">
        {icon}
      </span>
      <span className="dshcm-flex dshcm-min-w-0 dshcm-flex-1 dshcm-flex-col dshcm-gap-0.5">
        <span className="dshcm-text-[13px] dshcm-font-semibold dshcm-text-foreground">{title}</span>
        <span className="dshcm-text-[11.5px] dshcm-leading-relaxed dshcm-text-muted-foreground">{hint}</span>
      </span>
    </button>
  );
}

export function GitHubDialog({
  github,
  t,
  onClose,
  onChooseVisibility,
  onBack,
  onRepositoryName,
  onCreate,
}: GitHubDialogProps) {
  const nameId = React.useId();
  const open = Boolean(github);
  const title = !github
    ? t('githubModalTitle')
    : github.step === 'choose'
      ? t('githubModalTitle')
      : github.visibility === 'private'
        ? t('githubCreateTitlePrivate')
        : t('githubCreateTitlePublic');

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      {github ? (
        <DialogContent
          showClose={github.step !== 'creating'}
          closeLabel={t('githubClose')}
          onBackdrop={onClose}
          onEscapeKeyDown={(event) => {
            if (github.step === 'creating') event.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{t('githubModalDescription')}</DialogDescription>
          </DialogHeader>

          {github.step === 'choose' ? (
            <div className="dshcm-mt-4 dshcm-flex dshcm-flex-col dshcm-gap-2">
              <OptionCard
                icon={<Lock className="dshcm-h-4 dshcm-w-4" />}
                title={t('githubPrivate')}
                hint={t('githubPrivateHint')}
                autoFocus
                onClick={() => onChooseVisibility('private')}
              />
              <OptionCard
                icon={<Globe className="dshcm-h-4 dshcm-w-4" />}
                title={t('githubPublic')}
                hint={t('githubPublicHint')}
                onClick={() => onChooseVisibility('public')}
              />
              <div className="dshcm-mt-1 dshcm-flex dshcm-items-start dshcm-gap-1.5 dshcm-text-[11px] dshcm-leading-relaxed dshcm-text-muted-foreground">
                <Github className="dshcm-mt-0.5 dshcm-h-3 dshcm-w-3 dshcm-flex-none" />
                <span>{t('githubAuthHint')}</span>
              </div>
            </div>
          ) : (
            <div className="dshcm-mt-4 dshcm-flex dshcm-flex-col dshcm-gap-1.5">
              <label
                htmlFor={nameId}
                className="dshcm-text-[11.5px] dshcm-font-semibold dshcm-text-muted-foreground"
              >
                {t('githubNameLabel')}
              </label>
              <Input
                id={nameId}
                autoFocus
                value={github.name}
                disabled={github.step === 'creating'}
                spellCheck={false}
                autoComplete="off"
                aria-invalid={github.error ? true : undefined}
                onChange={(event) => onRepositoryName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    onCreate();
                  }
                }}
              />
              <div className="dshcm-text-[11px] dshcm-text-muted-foreground">
                {t('githubNameHint')}
              </div>
              {github.error ? (
                <div
                  role="alert"
                  className="dshcm-rounded-md dshcm-bg-secondary dshcm-px-2.5 dshcm-py-2 dshcm-text-[12px] dshcm-leading-relaxed dshcm-text-[color:var(--dsw-alias-state-error-primary)]"
                >
                  {github.error}
                </div>
              ) : null}
              <DialogFooter>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={github.step === 'creating'}
                  onClick={onBack}
                >
                  {t('githubBack')}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  disabled={github.step === 'creating' || !github.name.trim()}
                  onClick={onCreate}
                  className={cn(github.step === 'creating' && 'dshcm-cursor-default')}
                >
                  {github.step === 'creating' ? t('githubCreating') : t('githubCreateButton')}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
