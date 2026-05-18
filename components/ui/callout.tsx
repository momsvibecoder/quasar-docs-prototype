import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CalloutType = 'note' | 'important' | 'warning';

const styles: Record<CalloutType, string> = {
  note: 'q-callout-note',
  important: 'q-callout-important',
  warning: 'q-callout-warning',
};

export function Callout({
  type = 'note',
  title,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { type?: CalloutType; title?: string }) {
  return (
    <div className={cn('q-callout flex flex-col gap-3 rounded-lg border p-5 text-sm leading-6', styles[type], className)} {...props}>
      {title ? <div className="text-base font-semibold leading-6 text-foreground">{title}</div> : null}
      <div className="q-callout-content text-muted-foreground [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
