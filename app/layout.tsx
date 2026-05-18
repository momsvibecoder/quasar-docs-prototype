import type { ReactNode } from 'react';
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
                window.__quasarDocsFallbackReady = true;

                function showElement(element) {
                  if (!element) return;
                  element.removeAttribute('hidden');
                }

                function hideElement(element) {
                  if (!element) return;
                  element.setAttribute('hidden', '');
                }

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

                function setMobileMenu(open) {
                  var menu = document.querySelector('[data-mobile-docs-menu]');
                  if (!menu) return;

                  var trigger = document.querySelector('[data-mobile-menu-trigger]');
                  if (open) {
                    showElement(menu);
                  } else {
                    hideElement(menu);
                  }

                  if (trigger) {
                    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
                  }

                  document.body.style.overflow = open ? 'hidden' : '';
                }

                function activateTab(button) {
                  var root = button.closest('[data-tabs-root]');
                  if (!root) return;

                  var value = button.getAttribute('data-tabs-value');
                  if (!value) return;

                  var triggers = root.querySelectorAll('[data-tabs-trigger]');
                  for (var i = 0; i < triggers.length; i += 1) {
                    var isCurrent = triggers[i].getAttribute('data-tabs-value') === value;
                    triggers[i].setAttribute('aria-selected', isCurrent ? 'true' : 'false');
                    triggers[i].classList.toggle('border-foreground', isCurrent);
                    triggers[i].classList.toggle('text-foreground', isCurrent);
                    triggers[i].classList.toggle('border-transparent', !isCurrent);
                    triggers[i].classList.toggle('text-muted-foreground', !isCurrent);
                  }

                  var panels = root.querySelectorAll('[data-tabs-panel]');
                  for (var j = 0; j < panels.length; j += 1) {
                    if (panels[j].getAttribute('data-tabs-value') === value) {
                      showElement(panels[j]);
                    } else {
                      hideElement(panels[j]);
                    }
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
                  if (button) {
                    applyTheme(button.getAttribute('data-theme-option'));
                    return;
                  }

                  var tabTrigger = target.closest('[data-tabs-trigger]');
                  if (tabTrigger) {
                    activateTab(tabTrigger);
                    return;
                  }

                  var mobileMenuTrigger = target.closest('[data-mobile-menu-trigger]');
                  if (mobileMenuTrigger) {
                    setMobileMenu(true);
                    return;
                  }

                  if (target.closest('[data-mobile-menu-close]') || target.closest('[data-mobile-menu-link]')) {
                    setMobileMenu(false);
                    return;
                  }

                  var searchTrigger = target.closest('[data-docs-search-trigger]');
                  if (searchTrigger) {
                    var dialog = document.querySelector('[data-docs-search-dialog]');
                    if (!dialog) return;
                    showElement(dialog);
                    window.setTimeout(function () {
                      var input = document.querySelector('[data-docs-search-input]');
                      if (input && input.focus) input.focus();
                    }, 0);
                    return;
                  }

                  var searchClose = target.closest('[data-docs-search-close]');
                  if (searchClose) {
                    var searchDialog = document.querySelector('[data-docs-search-dialog]');
                    hideElement(searchDialog);
                  }
                });

                document.addEventListener('keydown', function (event) {
                  if ((event.metaKey || event.ctrlKey) && event.key && event.key.toLowerCase() === 'k') {
                    var dialog = document.querySelector('[data-docs-search-dialog]');
                    if (!dialog) return;
                    event.preventDefault();
                    showElement(dialog);
                    window.setTimeout(function () {
                      var input = document.querySelector('[data-docs-search-input]');
                      if (input && input.focus) input.focus();
                    }, 0);
                  }

                  if (event.key === 'Escape') {
                    var searchDialog = document.querySelector('[data-docs-search-dialog]');
                    hideElement(searchDialog);
                    setMobileMenu(false);
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        {children}
        <div
          className="fixed bottom-4 right-4 z-[90] flex rounded-full border border-border bg-card p-1 shadow-[0_12px_34px_rgb(0_0_0/0.22)]"
          aria-label="Theme switcher"
        >
          <button
            type="button"
            title="Light theme"
            aria-label="Light theme"
            aria-pressed="false"
            data-theme-option="light"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </button>
          <button
            type="button"
            title="Dark theme"
            aria-label="Dark theme"
            aria-pressed="true"
            data-theme-option="dark"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.99 12.49a9 9 0 1 1-9.48-9.48 6 6 0 0 0 9.48 9.48Z" />
            </svg>
          </button>
        </div>
      </body>
    </html>
  );
}
