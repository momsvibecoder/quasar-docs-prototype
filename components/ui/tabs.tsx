'use client';

import {
  createContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function normalizeValue(value: ReactNode) {
  return typeof value === 'string' ? value.toLowerCase().replace(/\s+/g, '-') : '';
}

export function Tabs({
  defaultValue,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue ?? '');
  const contextValue = useMemo(() => ({ value, setValue }), [value]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={cn('not-prose my-6 overflow-hidden rounded-lg border border-border bg-card', className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn('flex flex-wrap gap-1 border-b border-border bg-muted/35 p-1', className)}
      {...props}
    />
  );
}

export function Tab({
  value,
  active,
  disabled,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { value?: string; active?: boolean }) {
  const tabs = useContext(TabsContext);
  const tabValue = value ?? normalizeValue(children);
  const isSelected = tabs?.value === tabValue || (!tabs?.value && active);

  useEffect(() => {
    if (active && tabValue && !tabs?.value) {
      tabs?.setValue(tabValue);
    }
  }, [active, tabValue, tabs]);

  return (
    <button
      type="button"
      role="tab"
      disabled={disabled}
      aria-selected={isSelected}
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled && tabValue) tabs?.setValue(tabValue);
      }}
      className={cn(
        'inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium text-muted-foreground transition',
        'hover:bg-background hover:text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card',
        'disabled:pointer-events-none disabled:opacity-45',
        isSelected && 'bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabPanel({
  value,
  title,
  className,
  children,
}: {
  value?: string;
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  const tabs = useContext(TabsContext);
  const isVisible = !value || !tabs?.value || tabs.value === value;

  if (!isVisible) return null;

  return (
    <div role="tabpanel" className={cn('q-tab-panel bg-card p-4', className)}>
      {title ? <div className="mb-3 text-xs font-medium uppercase tracking-wide text-primary">{title}</div> : null}
      <div className="font-mono text-[13px] leading-7 text-[var(--q-code-text)]">{children}</div>
    </div>
  );
}
