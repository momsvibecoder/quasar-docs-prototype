import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type DocPagerLink = {
  title: string;
  label: string;
  href: string;
};

export function DocPager({
  previous,
  next,
}: {
  previous?: DocPagerLink;
  next?: DocPagerLink;
}) {
  return (
    <nav className="not-prose mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2" aria-label="Docs pagination">
      <PagerCard direction="previous" item={previous} />
      <PagerCard direction="next" item={next} />
    </nav>
  );
}

function PagerCard({
  direction,
  item,
}: {
  direction: 'previous' | 'next';
  item?: DocPagerLink;
}) {
  if (!item) return <div className="hidden sm:block" />;

  const isNext = direction === 'next';
  const Icon = isNext ? ChevronRight : ChevronLeft;

  return (
    <a
      href={item.href}
      className={cn(
        'group inline-grid grid-cols-[auto_auto] items-center gap-x-3 gap-y-1 no-underline',
        isNext ? 'justify-self-start sm:justify-self-end sm:text-right' : 'justify-self-start',
      )}
    >
      {isNext ? null : <span className="col-start-2 text-sm text-muted-foreground">{item.label}</span>}
      {isNext ? <span className="col-start-1 text-sm text-muted-foreground">{item.label}</span> : null}
      {!isNext ? (
        <Icon className="col-start-1 row-start-2 h-4 w-4 shrink-0 text-foreground transition group-hover:text-primary" />
      ) : null}
      <span
        className={cn(
          'row-start-2 text-base font-medium leading-6 text-foreground transition group-hover:text-primary',
          isNext ? 'col-start-1' : 'col-start-2',
        )}
      >
        {item.title}
      </span>
      {isNext ? (
        <Icon className="col-start-2 row-start-2 h-4 w-4 shrink-0 text-foreground transition group-hover:text-primary" />
      ) : null}
    </a>
  );
}
