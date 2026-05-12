import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CalloutType = 'note' | 'important' | 'warning';

const styles: Record<CalloutType, string> = {
  note: 'border-emerald-400/45 bg-emerald-400/10',
  important: 'border-emerald-400/40 bg-emerald-400/10',
  warning: 'border-emerald-400/45 bg-emerald-400/10',
};

export function Callout({
  type = 'note',
  title,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { type?: CalloutType; title?: string }) {
  return (
    <div className={cn('q-callout my-6 rounded-lg border p-5 text-sm leading-6', styles[type], className)} {...props}>
      {title ? <div className="mb-2 text-base font-semibold leading-6 text-foreground">{title}</div> : null}
      <div className="q-callout-content text-muted-foreground [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
