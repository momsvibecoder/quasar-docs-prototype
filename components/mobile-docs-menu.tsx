'use client';

import { ChevronRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { quasarLogoSrc } from '@/lib/brand';
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
        data-mobile-menu-trigger
        className="q-header-icon-button flex h-9 w-9 items-center justify-center rounded-md lg:hidden"
        aria-label="Open documentation menu"
        aria-expanded={open}
        aria-controls="mobile-docs-menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        id="mobile-docs-menu"
        data-mobile-docs-menu
        hidden={!open}
        className="q-mobile-menu fixed inset-0 z-[60] overflow-y-auto bg-background text-foreground lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Documentation menu"
      >
        <div className="q-mobile-menu-shell">
          <div className="q-mobile-menu-header">
            <a href="/docs" className="inline-flex" data-mobile-menu-link onClick={() => setOpen(false)}>
              <img src={quasarLogoSrc} alt="Quasar" className="q-brand-logo q-mobile-menu-logo" />
            </a>
            <button
              type="button"
              data-mobile-menu-close
              className="q-mobile-menu-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <nav className="q-mobile-menu-nav" aria-label="Mobile documentation navigation">
            {groups.map((group) => (
              <details key={group.title} className="q-mobile-menu-group">
                <summary className="q-mobile-menu-selector">
                  <span>{group.title}</span>
                  <ChevronRight className="q-mobile-menu-chevron" aria-hidden="true" />
                </summary>
                <div className="q-mobile-menu-sublist">
                  {group.items.map((item) => (
                    <a
                      key={`${group.title}-${item.title}`}
                      href={item.href}
                      data-mobile-menu-link
                      className="q-mobile-menu-subitem"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
