import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Callout } from '@/components/ui/callout';
import { Button } from '@/components/ui/button';
import { ChartPlaceholder, Figure } from '@/components/ui/figure';
import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/tabs';
import { DocPager } from '@/components/ui/doc-pager';
import { CodeBlock } from '@/components/ui/code-block';

export function getMDXComponents(base: MDXComponents = {}): MDXComponents {
  return {
    ...base,
    Callout,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    DocPager,
    pre: CodeBlock,
    Figure,
    ChartPlaceholder,
    DocSection: ({ children }) => <section className="q-doc-section">{children}</section>,
    Cards: ({ children }) => <div className="q-card-grid not-prose">{children}</div>,
    CardLink: ({
      title,
      href,
      children,
    }: {
      title: string;
      href: string;
      children: ReactNode;
    }) => (
      <a href={href} className="no-underline">
        <Card className="flex h-full flex-col gap-3 p-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/22 bg-primary/14 text-primary">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription className="leading-5 [&_p]:m-0">{children}</CardDescription>
          </div>
        </Card>
      </a>
    ),
  };
}
