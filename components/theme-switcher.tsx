'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const storageKey = 'quasar-docs-theme';

function getStoredTheme(): Theme {
  try {
    const savedTheme = window.localStorage?.getItem(storageKey) as Theme | null;
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
  } catch {
    return 'dark';
  }
}

function persistTheme(theme: Theme) {
  try {
    window.localStorage?.setItem(storageKey, theme);
  } catch {
    // Theme switching should still work when storage is unavailable.
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initialTheme = getStoredTheme();

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  function selectTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    persistTheme(nextTheme);
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[90] flex rounded-full border border-border bg-card p-1 shadow-[0_12px_34px_rgb(0_0_0/0.22)]"
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
