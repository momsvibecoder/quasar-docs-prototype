'use client';

import { ChevronRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { DocsNavGroup } from '@/lib/docs-nav';

export function MobileDocsMenu({ groups }: { groups: DocsNavGroup[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/24 text-white/72 lg:hidden"
        aria-label="Open documentation menu"
        aria-expanded={open}
        aria-controls="mobile-docs-menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {open ? (
        <div
          id="mobile-docs-menu"
          className="fixed inset-0 z-[60] overflow-y-auto bg-background text-foreground lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Documentation menu"
        >
          <div className="flex min-h-screen flex-col px-6 py-6">
            <div className="mb-10 flex items-center justify-between">
              <a href="/docs" className="inline-flex" onClick={() => setOpen(false)}>
                <img src="/quasar-logo.svg" alt="Quasar" className="h-7 w-auto" />
              </a>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="docs-sidebar space-y-2" aria-label="Mobile documentation navigation">
              {groups.map((group) => (
                <details key={group.title} className="border-b border-border pb-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-medium text-foreground">
                    <span>{group.title}</span>
                    <ChevronRight className="q-sidebar-chevron h-5 w-5 shrink-0 text-muted-foreground transition-transform" aria-hidden="true" />
                  </summary>
                  <div className="space-y-1 pb-4">
                    <a
                      href={group.href}
                      className="block rounded-md px-2 py-2 text-base text-muted-foreground transition hover:bg-accent hover:text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      Overview
                    </a>
                    {group.items.map((item) => (
                      <a
                        key={`${group.title}-${item.title}`}
                        href={item.href}
                        className="block rounded-md px-2 py-2 text-base text-muted-foreground transition hover:bg-accent hover:text-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </details>
              ))}
            </nav>

            <div className="mt-auto pt-10">
              <a
                href="https://quasar.ai/contact/"
                className="flex h-12 items-center justify-center rounded-lg border border-border bg-card text-base font-medium text-foreground"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
