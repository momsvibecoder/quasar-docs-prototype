import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

const components = getMDXComponents();
type TocItem = {
  url: string;
  title: string;
};

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

  return (
    <main className="grid min-h-[calc(100vh-4rem)] grid-cols-1 xl:grid-cols-[minmax(0,820px)_260px]">
      <article className="px-5 py-10 md:px-10 lg:px-14">
        <div className="mb-3 text-sm font-medium text-primary">QuasarDB Docs</div>
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
      <aside className="hidden px-6 py-12 xl:block">
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
