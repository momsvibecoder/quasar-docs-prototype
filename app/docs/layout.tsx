import type { ReactNode } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { DocsSearch } from '@/components/docs-search';
import { MobileDocsMenu } from '@/components/mobile-docs-menu';
import { quasarLogoSrc } from '@/lib/brand';
import { docsNavGroups, docsSearchItems, footerGroups } from '@/lib/docs-nav';

const socialLinks = [
  {
    title: 'GitHub',
    href: 'https://github.com/bureau14',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57A12 12 0 0 0 12 .5Z"
        />
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/company/quasarai/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.53V9H7.1v11.45ZM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0Z"
        />
      </svg>
    ),
  },
  {
    title: 'X',
    href: 'https://twitter.com/quasardb',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.9 2h3.27l-7.14 8.16L23.43 22h-6.58l-5.15-6.74L5.8 22H2.53l7.64-8.73L2.12 2h6.75l4.66 6.16L18.9 2Zm-1.15 17.91h1.81L7.88 3.98H5.94l11.81 15.93Z"
        />
      </svg>
    ),
  },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="q-docs-header sticky top-0 z-40 border-b">
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 lg:px-6">
          <MobileDocsMenu groups={docsNavGroups} />
          <a href="/docs" className="flex shrink-0 items-center gap-3">
            <img src={quasarLogoSrc} alt="Quasar" className="q-brand-logo q-brand-logo-header" />
          </a>
          <DocsSearch items={docsSearchItems} />
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <a href="https://quasar.ai" className="q-header-link inline-flex items-center gap-1.5 text-sm">
              Go to site
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[282px_minmax(0,1fr)]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] self-start overflow-y-auto border-r border-border bg-background px-4 py-6 lg:block">
          <nav className="docs-sidebar space-y-1">
            {docsNavGroups.map((group) => (
              <details key={group.title} className="group/sidebar">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:bg-accent hover:text-foreground">
                  <ChevronRight className="q-sidebar-chevron h-3.5 w-3.5 shrink-0 transition-transform" aria-hidden="true" />
                  <span>{group.title}</span>
                </summary>
                <div className="mb-3 mt-1 space-y-0.5 pl-7">
                  {group.items.map((item) => (
                    <a
                      key={`${group.title}-${item.title}`}
                      href={item.href}
                      className="block rounded-md px-2 py-1.5 text-sm leading-5 text-secondary-foreground transition hover:bg-accent hover:text-foreground"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </nav>
        </aside>
        {children}
      </div>
      <footer className="border-t border-[#23262b] bg-[#141618] text-white">
        <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.75fr)]">
            <div>
              <a href="/docs" className="inline-flex">
                <img src={quasarLogoSrc} alt="Quasar" className="q-brand-logo q-brand-logo-footer" />
              </a>
              <p className="mt-5 max-w-sm text-lg leading-7 text-white/78">Infrastructure for AI-Driven Decisions.</p>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/54 transition hover:border-white/18 hover:bg-white/[0.04] hover:text-white"
                    aria-label={item.title}
                  >
                    <span className="h-4 w-4 [&_svg]:block [&_svg]:h-4 [&_svg]:w-4">{item.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <div className="mb-5 text-lg font-semibold leading-6 text-white">
                  {group.title}
                </div>
                <div className="space-y-3.5">
                  {group.items.map((item) => (
                    <a
                      key={`${group.title}-${item.title}`}
                      href={item.href}
                      className="flex w-fit items-center gap-2 text-sm text-white/58 transition hover:text-white"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </nav>
            ))}
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-6 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 QuasarDB SAS. All Rights Reserved.</span>
            <a href="https://quasar.ai/privacy-policy/" className="transition hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
