export type DocsNavItem = {
  title: string;
  href: string;
};

export type DocsNavGroup = {
  title: string;
  href: string;
  items: DocsNavItem[];
};

export const docsNavGroups: DocsNavGroup[] = [
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

export const footerGroups = [
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
