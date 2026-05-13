'use client';

import { BookOpen, FileText, Search, X } from 'lucide-react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { DocsSearchItem } from '@/lib/docs-nav';

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
}

export function DocsSearch({ items }: { items: DocsSearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const needle = normalize(query).trim();

    if (!needle) return items.slice(0, 8);

    const terms = needle.split(/\s+/);

    return items
      .map((item) => {
        const haystack = normalize(`${item.title} ${item.section} ${item.description ?? ''}`);
        const score = terms.reduce((total, term) => {
          if (normalize(item.title).startsWith(term)) return total + 5;
          if (haystack.includes(term)) return total + 2;
          return total;
        }, 0);

        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 8)
      .map(({ item }) => item);
  }, [items, query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      setQuery('');
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function close() {
    setOpen(false);
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }

    if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault();
      window.location.href = results[activeIndex].href;
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        className="absolute left-1/2 hidden h-9 w-[276px] -translate-x-1/2 items-center gap-2 rounded-lg border border-white/18 bg-white/[0.08] px-3 text-sm text-white/58 transition hover:border-white/28 hover:bg-white/[0.12] md:flex"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate">Search Documentation</span>
        <span className="ml-auto rounded-md border border-white/22 bg-white/8 px-1.5 py-0.5 font-mono text-[11px] leading-4 text-white/78">
          ⌘ K
        </span>
      </button>

      <div className="ml-auto flex md:hidden">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/24 text-white/72"
          aria-label="Search docs"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 text-primary" />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[70] bg-background/72 backdrop-blur-sm" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close search" onClick={close} />
          <div className="relative mx-auto mt-24 w-[min(calc(100vw-32px),680px)] overflow-hidden rounded-xl border border-border bg-card shadow-[0_22px_70px_rgb(0_0_0/0.18)]">
            <div className="flex h-16 items-center gap-3 border-b border-border px-4">
              <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                className="h-full min-w-0 flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="What are you searching for?"
              />
              <button
                type="button"
                className="hidden rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition hover:text-foreground sm:block"
                onClick={close}
              >
                Esc
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground sm:hidden"
                aria-label="Close search"
                onClick={close}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="px-3 py-4">
              <div className="mb-2 px-2 text-sm text-muted-foreground">{query ? 'Results' : 'Suggestions'}</div>
              <div className="space-y-1">
                {results.length > 0 ? (
                  results.map((item, index) => (
                    <a
                      key={`${item.href}-${item.title}`}
                      href={item.href}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-accent ${
                        index === activeIndex ? 'bg-accent' : ''
                      }`}
                      onClick={close}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      {item.type === 'page' ? (
                        <BookOpen className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                      ) : (
                        <FileText className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-base text-foreground">{item.title}</span>
                        <span className="block truncate text-xs text-muted-foreground">{item.section}</span>
                      </span>
                      {index === 0 ? <span className="hidden text-xs text-muted-foreground sm:block">Enter</span> : null}
                    </a>
                  ))
                ) : (
                  <div className="px-3 py-10 text-center text-sm text-muted-foreground">No results found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
