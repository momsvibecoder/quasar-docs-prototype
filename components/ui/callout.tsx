import type { HTMLAttributes } from 'react';
import { AlertTriangle, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'note' | 'important' | 'warning';

const styles: Record<CalloutType, string> = {
  note: 'q-callout-note',
  important: 'q-callout-warning',
  warning: 'q-callout-warning',
};

export function Callout({
  type = 'note',
  title,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { type?: CalloutType; title?: string }) {
  const Icon = type === 'note' ? Pencil : AlertTriangle;
  const label = title ?? (type === 'note' ? 'Note' : 'Important');

  return (
    <div className={cn('q-callout overflow-hidden rounded-lg border text-sm leading-6', styles[type], className)} {...props}>
      <div className="q-callout-header flex items-center gap-2 px-4 py-3 text-base font-semibold leading-6 text-foreground">
        <Icon className="q-callout-icon h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <div className="q-callout-content border-t px-4 py-3 text-base leading-7 text-foreground [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
