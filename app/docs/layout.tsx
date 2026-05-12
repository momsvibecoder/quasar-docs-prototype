import type { ReactNode } from 'react';
import { ChevronRight, ExternalLink, Search } from 'lucide-react';

const groups = [
  {
    title: 'Primer',
    href: '/docs/primer',
    items: [
      { title: 'What is QuasarDB?', href: '/docs/primer#what-is-quasardb' },
      { title: 'Shall we dance?', href: '/docs/primer#shall-we-dance' },
      { title: 'Inserting timeseries data', href: '/docs/primer#inserting-timeseries-data' },
      { title: 'Working with the data', href: '/docs/primer#working-with-the-data' },
      { title: 'Organizing your data', href: '/docs/primer#organizing-your-data' },
      { title: 'Production shape', href: '/docs/primer#production-shape' },
      { title: 'Going further', href: '/docs/primer#going-further' },
      { title: 'Wrap up', href: '/docs/primer#wrap-up' },
    ],
  },
  {
    title: 'Server Administration',
    href: '/docs/server-administration/installation',
    items: [
      { title: '1. Installation', href: '/docs/server-administration/installation' },
      { title: '2. Configuration', href: '/docs/server-administration/installation#13-post-installation-checklist' },
      { title: '3. Performance tuning', href: '/docs/server-administration/dashboards#541-slow-queries-over-time' },
      { title: '5.4 Dashboards', href: '/docs/server-administration/dashboards' },
    ],
  },
  {
    title: 'User Guide',
    href: '/docs/user-guide',
    items: [
      { title: '1. Concepts', href: '/docs/user-guide#1-concepts' },
      { title: '2. Tools', href: '/docs/user-guide#2-tools' },
      { title: '3. Integrations', href: '/docs/user-guide#3-integrations' },
      { title: '4. APIs', href: '/docs/user-guide#4-apis' },
      { title: '5. How-tos', href: '/docs/user-guide#5-how-tos' },
      { title: '6. Best practices', href: '/docs/user-guide#6-best-practices' },
    ],
  },
  {
    title: 'Query language',
    href: '/docs/query-language',
    items: [
      { title: '1. Aggregated tables', href: '/docs/query-language' },
      { title: '8. Insert', href: '/docs/query-language' },
      { title: '12. Select', href: '/docs/query-language' },
      { title: '20. Functions & Operators', href: '/docs/query-language' },
      { title: '22. Timestamps', href: '/docs/query-language' },
    ],
  },
  {
    title: 'Internals',
    href: '/docs',
    items: [
      { title: '1. Transactions', href: '/docs' },
      { title: '2. Clustering', href: '/docs' },
      { title: '3. Data Storage', href: '/docs' },
      { title: '4. Data Transfer', href: '/docs' },
      { title: '5. Change Stream', href: '/docs' },
    ],
  },
  {
    title: 'Support',
    href: '/docs',
    items: [
      { title: '1. Contact', href: 'https://quasar.ai/contact/' },
      { title: '2. Change log', href: 'https://quasar.ai/blog/' },
      { title: '3. Upgrading', href: '/docs' },
      { title: '4. License', href: '/docs' },
    ],
  },
];

const footerGroups = [
  {
    title: 'Resources',
    items: [
      { title: 'Documentation', href: '/docs' },
      { title: 'Primer', href: '/docs/primer' },
      { title: 'User Guide', href: '/docs/user-guide' },
      { title: 'Query language', href: '/docs/query-language' },
      { title: 'Blog & News', href: 'https://quasar.ai/blog/' },
      { title: 'GitHub', href: 'https://github.com/bureau14' },
      { title: 'Trust Center', href: 'https://trust.quasar.ai/' },
    ],
  },
  {
    title: 'Company',
    items: [
      { title: 'About Us', href: 'https://quasar.ai/about/' },
      { title: 'Contact Us', href: 'https://quasar.ai/contact/' },
      { title: 'Legal', href: 'https://quasar.ai/legal/' },
    ],
  },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-[#23262b] bg-[#141618] text-white">
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 lg:px-6">
          <a href="/docs" className="flex items-center gap-3">
            <img src="/quasar-logo.svg" alt="Quasar" className="h-7 w-auto" />
          </a>
          <button
            type="button"
            className="absolute left-1/2 hidden h-9 w-[276px] -translate-x-1/2 items-center gap-2 rounded-lg border border-white/18 bg-white/[0.08] px-3 text-sm text-white/58 transition hover:border-white/28 hover:bg-white/[0.12] md:flex"
          >
            <Search className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">Search Documentation</span>
            <span className="ml-auto rounded-md border border-white/22 bg-white/8 px-1.5 py-0.5 font-mono text-[11px] leading-4 text-white/78">
              ⌘ K
            </span>
          </button>
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <a href="https://quasar.ai" className="inline-flex items-center gap-1.5 text-sm text-white/72 hover:text-white">
              Quasar.ai
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="ml-auto flex md:hidden">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/24 text-white/72"
              aria-label="Search docs"
            >
              <Search className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[282px_minmax(0,1fr)]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] self-start overflow-y-auto border-r border-border bg-background px-4 py-6 lg:block">
          <nav className="docs-sidebar space-y-1">
            {groups.map((group) => (
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
