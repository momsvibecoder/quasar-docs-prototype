import type { ReactNode } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { DocsSearch } from '@/components/docs-search';
import { MobileDocsMenu } from '@/components/mobile-docs-menu';
import { docsNavGroups, docsSearchItems, footerGroups } from '@/lib/docs-nav';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-[#23262b] bg-[#141618] text-white">
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 lg:px-6">
          <MobileDocsMenu groups={docsNavGroups} />
          <a href="/docs" className="flex items-center gap-3">
            <img src="/quasar-logo.svg" alt="Quasar" className="h-7 w-auto" />
          </a>
          <DocsSearch items={docsSearchItems} />
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <a href="https://quasar.ai" className="inline-flex items-center gap-1.5 text-sm text-white/72 hover:text-white">
              Quasar.ai
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
                <img src="/quasar-logo.svg" alt="Quasar" className="h-8 w-auto" />
              </a>
              <p className="mt-5 max-w-sm text-lg leading-7 text-white/78">Infrastructure for AI-Driven Decisions.</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <div className="mb-5 text-sm font-semibold text-white">
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
          <div className="mt-14 flex flex-col gap-4 border-t border-white/12 pt-6 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
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
