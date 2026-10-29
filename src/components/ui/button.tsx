import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'dshcm-inline-flex dshcm-border-0 dshcm-bg-transparent dshcm-items-center dshcm-justify-center dshcm-gap-1.5 dshcm-whitespace-nowrap dshcm-rounded-md dshcm-text-xs dshcm-font-medium dshcm-transition-colors focus-visible:dshcm-outline-none focus-visible:dshcm-ring-2 focus-visible:dshcm-ring-ring focus-visible:dshcm-ring-offset-2 focus-visible:dshcm-ring-offset-background disabled:dshcm-pointer-events-none disabled:dshcm-opacity-50',
  {
    variants: {
      variant: {
        default: 'dshcm-bg-primary dshcm-text-primary-foreground hover:dshcm-bg-accent hover:dshcm-text-accent-foreground',
        outline:
          'dshcm-border dshcm-border-border dshcm-bg-transparent dshcm-text-foreground hover:dshcm-bg-accent hover:dshcm-text-accent-foreground',
        ghost: 'dshcm-text-muted-foreground hover:dshcm-bg-accent hover:dshcm-text-accent-foreground',
        destructive:
          'dshcm-bg-destructive dshcm-text-destructive-foreground hover:dshcm-opacity-90',
        secondary:
          'dshcm-bg-secondary dshcm-text-secondary-foreground hover:dshcm-bg-accent hover:dshcm-text-accent-foreground',
      },
      size: {
        default: 'dshcm-h-8 dshcm-px-3',
        sm: 'dshcm-h-7 dshcm-px-2.5',
        icon: 'dshcm-h-7 dshcm-w-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
