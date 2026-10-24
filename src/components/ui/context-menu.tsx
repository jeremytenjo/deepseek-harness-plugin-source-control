import * as React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '../../lib/utils';

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'dshcm-flex dshcm-cursor-default dshcm-select-none dshcm-items-center dshcm-gap-2 dshcm-rounded-sm dshcm-px-2 dshcm-py-1.5 dshcm-text-xs dshcm-outline-none focus:dshcm-bg-accent data-[state=open]:dshcm-bg-accent',
      inset && 'dshcm-pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="dshcm-ml-auto dshcm-size-3.5" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'dshcm-ui dshcm-z-50 dshcm-min-w-[8rem] dshcm-overflow-hidden dshcm-rounded-md dshcm-border dshcm-border-border dshcm-bg-popover dshcm-p-1 dshcm-text-popover-foreground dshcm-shadow-md',
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        'dshcm-ui dshcm-z-50 dshcm-max-h-[var(--radix-context-menu-content-available-height)] dshcm-min-w-[8rem] dshcm-overflow-y-auto dshcm-overflow-x-hidden dshcm-rounded-md dshcm-border dshcm-border-border dshcm-bg-popover dshcm-p-1 dshcm-text-popover-foreground dshcm-shadow-md',
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      'dshcm-relative dshcm-flex dshcm-cursor-default dshcm-select-none dshcm-items-center dshcm-gap-2 dshcm-rounded-sm dshcm-px-2 dshcm-py-1.5 dshcm-text-xs dshcm-outline-none focus:dshcm-bg-accent focus:dshcm-text-accent-foreground data-[disabled]:dshcm-pointer-events-none data-[disabled]:dshcm-opacity-50',
      inset && 'dshcm-pl-8',
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'dshcm-relative dshcm-flex dshcm-cursor-default dshcm-select-none dshcm-items-center dshcm-gap-2 dshcm-rounded-sm dshcm-py-1.5 dshcm-pl-8 dshcm-pr-2 dshcm-text-xs dshcm-outline-none focus:dshcm-bg-accent focus:dshcm-text-accent-foreground data-[disabled]:dshcm-pointer-events-none data-[disabled]:dshcm-opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="dshcm-absolute dshcm-left-2 dshcm-flex dshcm-size-3.5 dshcm-items-center dshcm-justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="dshcm-size-3.5" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'dshcm-relative dshcm-flex dshcm-cursor-default dshcm-select-none dshcm-items-center dshcm-gap-2 dshcm-rounded-sm dshcm-py-1.5 dshcm-pl-8 dshcm-pr-2 dshcm-text-xs dshcm-outline-none focus:dshcm-bg-accent focus:dshcm-text-accent-foreground data-[disabled]:dshcm-pointer-events-none data-[disabled]:dshcm-opacity-50',
      className,
    )}
    {...props}
  >
    <span className="dshcm-absolute dshcm-left-2 dshcm-flex dshcm-size-3.5 dshcm-items-center dshcm-justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="dshcm-size-2 dshcm-fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      'dshcm-px-2 dshcm-py-1.5 dshcm-text-[11px] dshcm-font-semibold dshcm-text-muted-foreground',
      inset && 'dshcm-pl-8',
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn('dshcm-my-1 dshcm-h-px dshcm-bg-border', className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('dshcm-ml-auto dshcm-text-[10px] dshcm-tracking-widest dshcm-text-muted-foreground', className)}
    {...props}
  />
);
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
