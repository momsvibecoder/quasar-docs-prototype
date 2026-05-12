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
    Cards: ({ children }) => <div className="q-card-grid not-prose my-6">{children}</div>,
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
        <Card className="h-full">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 text-primary">
            <ArrowRight className="h-4 w-4" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{children}</CardDescription>
        </Card>
      </a>
    ),
  };
}
