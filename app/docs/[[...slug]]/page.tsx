import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { docsNavGroups } from '@/lib/docs-nav';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

const components = getMDXComponents();
type TocItem = {
  url: string;
  title: string;
};

type BreadcrumbItem = {
  title: string;
  href?: string;
};

function normalizeHref(href: string) {
  return href.split('#')[0];
}

function cleanNavTitle(title: string) {
  return title.replace(/^\d+(?:\.\d+)?\s+/, '');
}

function getBreadcrumbs(docSlug: string, pageTitle: string): BreadcrumbItem[] {
  const currentPath = docSlug === 'index' ? '/docs' : `/docs/${docSlug}`;
  const breadcrumbs: BreadcrumbItem[] = [{ title: 'Docs', href: '/docs' }];

  if (currentPath === '/docs') {
    return [{ title: 'Docs' }];
  }

  const group = docsNavGroups.find((navGroup) => {
    if (normalizeHref(navGroup.href) === currentPath) return true;
    return navGroup.items.some((item) => normalizeHref(item.href) === currentPath);
  });

  if (!group) {
    return [...breadcrumbs, { title: pageTitle }];
  }

  breadcrumbs.push({ title: group.title, href: group.href });

  const currentItem = group.items.find((item) => {
    return normalizeHref(item.href) === currentPath && cleanNavTitle(item.title) === pageTitle;
  });

  if (currentItem && cleanNavTitle(currentItem.title) !== group.title) {
    breadcrumbs.push({ title: cleanNavTitle(currentItem.title) });
  } else {
    breadcrumbs[breadcrumbs.length - 1] = { title: group.title };
  }

  return breadcrumbs;
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);

  if (!page) return {};

  return {
    title: `${page.data.title} | Quasar Docs`,
    description: page.data.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);

  if (!page) notFound();

  const MDX = page.data.body;
  const toc = (page.data.toc ?? []) as TocItem[];
  const docSlug = slug?.join('/') ?? 'index';
  const breadcrumbs = getBreadcrumbs(docSlug, page.data.title);

  return (
    <main className="grid min-h-[calc(100vh-4rem)] grid-cols-1 xl:grid-cols-[minmax(0,820px)_260px]">
      <article className="px-5 py-10 md:px-10 lg:px-14">
        <nav className="q-breadcrumbs" aria-label="Breadcrumb">
          <ol>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <li key={`${item.title}-${index}`}>
                  {item.href && !isLast ? <a href={item.href}>{item.title}</a> : <span aria-current={isLast ? 'page' : undefined}>{item.title}</span>}
                  {!isLast ? <ChevronRight className="q-breadcrumb-separator" aria-hidden="true" /> : null}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mb-2 max-w-3xl text-[40px] font-semibold leading-[42px] tracking-normal text-foreground">
          {page.data.title}
        </h1>
        {page.data.description ? (
          <p className="mb-6 max-w-3xl text-base leading-[22px] text-muted-foreground">
            {page.data.description}
          </p>
        ) : null}
        <div className="fd-docs max-w-none" data-doc-slug={docSlug}>
          <MDX components={components} />
        </div>
      </article>
      <aside className="q-docs-toc-pane hidden px-6 py-12 xl:block">
        <div className="sticky top-24">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</div>
          <div className="space-y-2">
            {toc.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className="block py-1 text-base font-normal leading-[22px] text-muted-foreground transition hover:text-primary"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
