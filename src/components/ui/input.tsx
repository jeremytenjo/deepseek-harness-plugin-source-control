import * as React from 'react';

import { cn } from '../../lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'dshcm-flex dshcm-h-9 dshcm-w-full dshcm-rounded-md dshcm-border dshcm-border-input dshcm-bg-background dshcm-px-3 dshcm-py-1 dshcm-text-sm dshcm-text-foreground dshcm-shadow-sm dshcm-transition-colors placeholder:dshcm-text-muted-foreground focus-visible:dshcm-outline-none focus-visible:dshcm-ring-1 focus-visible:dshcm-ring-ring disabled:dshcm-cursor-not-allowed disabled:dshcm-opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
