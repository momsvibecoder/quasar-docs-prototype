import type { ReactNode } from 'react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import './global.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5b60d8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#141618" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var storageKey = 'quasar-docs-theme';

                function getStoredTheme() {
                  try {
                    var theme = localStorage.getItem(storageKey);
                    return theme === 'light' || theme === 'dark' ? theme : 'dark';
                  } catch (_) {
                    return 'dark';
                  }
                }

                function applyTheme(theme) {
                  if (theme !== 'light' && theme !== 'dark') theme = 'dark';

                document.documentElement.dataset.theme = theme;
                document.documentElement.style.colorScheme = theme;

                  try {
                    localStorage.setItem(storageKey, theme);
                  } catch (_) {}

                  var buttons = document.querySelectorAll('[data-theme-option]');
                  for (var i = 0; i < buttons.length; i += 1) {
                    var isActive = buttons[i].getAttribute('data-theme-option') === theme;
                    buttons[i].setAttribute('aria-pressed', isActive ? 'true' : 'false');
                  }
                }

                applyTheme(getStoredTheme());

                document.addEventListener('DOMContentLoaded', function () {
                  applyTheme(getStoredTheme());
                });

                document.addEventListener('click', function (event) {
                  var target = event.target;
                  if (!target || !target.closest) return;

                  var button = target.closest('[data-theme-option]');
                  if (!button) return;

                  applyTheme(button.getAttribute('data-theme-option'));
                });
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        {children}
        <ThemeSwitcher />
      </body>
    </html>
  );
}
