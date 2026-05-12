# Quasar Docs Prototype

Prototype for a dark-first Quasar documentation UI built with Next.js, Fumadocs MDX, Tailwind, and custom Quasar tokens.

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000/docs`.

## Production Build

```bash
pnpm build
pnpm start -- -p 3000
```

## Deployment Notes

Recommended options:

- Vercel: connect the GitHub repository, use the default Next.js settings.
- VPS/server: install Node 22, run `pnpm install --frozen-lockfile`, `pnpm build`, then start with `pnpm start -- -p 3000`.

The current prototype content is intentionally limited to representative Quasar docs pages and is not a full content migration.
