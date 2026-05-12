'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const storageKey = 'quasar-docs-theme';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey) as Theme | null;
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    document.documentElement.style.colorScheme = initialTheme;
  }, []);

  function selectTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex rounded-full border border-border bg-card p-1 shadow-[0_12px_34px_rgb(0_0_0/0.22)]"
      aria-label="Theme switcher"
    >
      <button
        type="button"
        title="Light theme"
        aria-label="Light theme"
        aria-pressed={theme === 'light'}
        data-theme-option="light"
        onClick={() => selectTheme('light')}
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Dark theme"
        aria-label="Dark theme"
        aria-pressed={theme === 'dark'}
        data-theme-option="dark"
        onClick={() => selectTheme('dark')}
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
