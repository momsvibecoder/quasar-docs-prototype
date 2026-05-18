import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { cwd } from 'node:process';

const root = cwd();
const port = Number(process.env.PORT ?? 3013);

const types = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.woff2', 'font/woff2'],
]);

function safeJoin(base, requestPath) {
  const target = normalize(join(base, requestPath));
  return target.startsWith(base) ? target : null;
}

function fileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);

  if (clean.startsWith('/_next/static/')) {
    return safeJoin(join(root, '.next/static'), clean.replace('/_next/static/', ''));
  }

  if (clean === '/quasar-logo.svg') return join(root, 'public/quasar-logo.svg');
  if (clean === '/' || clean === '/docs') return join(root, '.next/server/app/docs.html');
  if (clean.startsWith('/docs/')) return join(root, '.next/server/app', `${clean}.html`);

  return safeJoin(join(root, 'public'), clean.slice(1));
}

function resolvePreviewFile(file) {
  if (file && existsSync(file) && statSync(file).isFile()) return file;
  if (!file || extname(file) !== '.html') return file;

  const nextGeneratedVariant = file.replace(/\.html$/, ' 2.html');
  if (existsSync(nextGeneratedVariant) && statSync(nextGeneratedVariant).isFile()) {
    return nextGeneratedVariant;
  }

  return file;
}

createServer((req, res) => {
  const file = resolvePreviewFile(fileFor(req.url ?? '/'));

  if (!file || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  res.writeHead(200, { 'Content-Type': types.get(extname(file)) ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => {
  console.log(`Static preview ready at http://127.0.0.1:${port}`);
});
