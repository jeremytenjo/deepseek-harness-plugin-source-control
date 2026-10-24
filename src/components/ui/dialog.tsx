import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '../../lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'dshcm-fixed dshcm-inset-0 dshcm-z-[999] dshcm-bg-black/60 dshcm-backdrop-blur-sm',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showClose?: boolean;
  closeLabel?: string;
  onBackdrop?: () => void;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, showClose = true, closeLabel = 'Close', onBackdrop, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className="dshcm-fixed dshcm-inset-0 dshcm-z-[1000] dshcm-flex dshcm-items-center dshcm-justify-center dshcm-p-4"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onBackdrop?.();
      }}
      {...props}
    >
      <div
        className={cn(
          'dshcm-ui dshcm-relative dshcm-max-h-[calc(100vh-32px)] dshcm-w-[calc(100vw-32px)] dshcm-max-w-[460px] dshcm-overflow-y-auto dshcm-rounded-xl dshcm-border dshcm-border-border dshcm-bg-background dshcm-p-5 dshcm-text-foreground dshcm-shadow-2xl',
          className,
        )}
      >
        {children}
        {showClose ? (
          <DialogPrimitive.Close
            className="dshcm-absolute dshcm-right-4 dshcm-top-4 dshcm-inline-flex dshcm-h-7 dshcm-w-7 dshcm-items-center dshcm-justify-center dshcm-rounded-md dshcm-border-0 dshcm-bg-transparent dshcm-p-0 dshcm-text-muted-foreground dshcm-transition-colors hover:dshcm-bg-secondary hover:dshcm-text-foreground focus-visible:dshcm-outline-none focus-visible:dshcm-ring-1 focus-visible:dshcm-ring-ring"
            aria-label={closeLabel}
            title={closeLabel}
          >
            <X className="dshcm-h-4 dshcm-w-4" />
          </DialogPrimitive.Close>
        ) : null}
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('dshcm-flex dshcm-flex-col dshcm-gap-1.5 dshcm-pr-8', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('dshcm-mt-4 dshcm-flex dshcm-items-center dshcm-justify-end dshcm-gap-2', className)}
      {...props}
    />
  );
}

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('dshcm-text-[15px] dshcm-font-semibold dshcm-leading-none', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('dshcm-text-[12.5px] dshcm-leading-relaxed dshcm-text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
