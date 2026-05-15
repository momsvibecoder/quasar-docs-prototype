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
      <div className={cn('not-prose my-6', className)} data-tabs-root {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn('flex flex-wrap gap-7 border-b border-border', className)}
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
      data-tabs-trigger
      data-tabs-value={tabValue}
      disabled={disabled}
      aria-selected={isSelected}
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled && tabValue) tabs?.setValue(tabValue);
      }}
      className={cn(
        'relative -mb-px inline-flex h-10 items-center justify-center border-b-2 border-transparent px-0 text-base font-medium text-muted-foreground transition',
        'hover:text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-45',
        isSelected && 'border-foreground text-foreground',
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

  return (
    <div
      role="tabpanel"
      data-tabs-panel
      data-tabs-value={value}
      hidden={!isVisible}
      className={cn('q-tab-panel pt-5', className)}
    >
      {title ? <div className="mb-3 text-sm font-medium text-muted-foreground">{title}</div> : null}
      <div className="font-mono text-[13px] leading-7 text-[var(--q-code-text)]">{children}</div>
    </div>
  );
}
