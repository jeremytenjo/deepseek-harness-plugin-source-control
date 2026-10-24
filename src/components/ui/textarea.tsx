import * as React from 'react';

import { cn } from '../../lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'dshcm-flex dshcm-min-h-[80px] dshcm-w-full dshcm-rounded-md dshcm-border dshcm-border-input dshcm-bg-background dshcm-px-3 dshcm-py-2 dshcm-text-sm dshcm-text-foreground dshcm-shadow-sm dshcm-transition-colors placeholder:dshcm-text-muted-foreground focus-visible:dshcm-outline-none focus-visible:dshcm-ring-1 focus-visible:dshcm-ring-ring disabled:dshcm-cursor-not-allowed disabled:dshcm-opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

export { Textarea };
