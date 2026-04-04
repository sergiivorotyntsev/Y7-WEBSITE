/**
 * Build-time prerendering: visits each public route with Puppeteer
 * and saves the fully-rendered HTML to dist/{route}/index.html.
 *
 * Usage: node scripts/prerender.mjs
 * Expects dist/ to already exist from `vite build`.
 */
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4567;

const PUBLIC_ROUTES = [
  '/',
  '/services',
  '/dealers',
  '/exporters',
  '/ship-my-car',
  '/quote',
  '/track',
  '/contact',
  '/faq',
  '/about',
  '/dealer-quote',
  '/privacy',
  '/terms',
  '/accessibility',
  // SEO service pages
  '/car-shipping-cost',
  '/enclosed-car-shipping',
  '/auction-car-shipping',
  '/copart-shipping',
  '/iaai-transport',
  '/manheim-transport',
  '/door-to-port-auto-transport',
  '/dealer-auto-transport',
  '/salvage-car-shipping',
  '/open-car-shipping',
  '/state-to-state-car-shipping',
  // Location pages
  '/massachusetts-car-shipping',
  '/boston-car-shipping',
  '/newton-auto-transport',
  '/florida-car-shipping',
  '/new-jersey-auto-transport',
  '/texas-auto-transport',
  // Route pages
  '/massachusetts-to-florida-car-shipping',
  '/new-jersey-to-florida-car-shipping',
  '/texas-to-newark-port-auto-transport',
  '/chicago-to-port-newark-car-shipping',
  '/auction-to-port-transport',
  // Guide pages
  '/how-to-ship-a-car-bought-at-auction',
  '/open-vs-enclosed-auto-transport',
  '/what-is-a-bill-of-lading',
  // Port pages
  '/ports/newark',
  '/ports/houston',
  '/ports/savannah',
  '/ports/los-angeles',
  '/ports/baltimore',
  '/ports/jacksonville',
];

// Minimal static file server for dist/
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);

      // If no extension, serve index.html (SPA fallback)
      if (!extname(filePath)) {
        filePath = join(DIST, 'index.html');
      }

      // If file doesn't exist, serve index.html (SPA fallback)
      if (!existsSync(filePath)) {
        filePath = join(DIST, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, () => {
      console.log(`Prerender server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  if (!existsSync(DIST)) {
    console.error('dist/ not found. Run `vite build` first.');
    process.exit(1);
  }

  const server = await startServer();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const startTime = Date.now();
  let success = 0;
  let failed = 0;

  for (const route of PUBLIC_ROUTES) {
    const page = await browser.newPage();

    // Block unnecessary resources during prerender
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const type = req.resourceType();
      if (['image', 'media', 'font'].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait for the prerender-ready event or a max of 5s
      await page.evaluate(() => {
        return new Promise((resolve) => {
          if (document.__PRERENDER_READY) {
            resolve();
            return;
          }
          document.addEventListener('prerender-ready', resolve, { once: true });
          setTimeout(resolve, 5000);
        });
      });

      let html = await page.content();

      // Add prerender indicator meta tag
      html = html.replace(
        '</head>',
        '<meta name="prerender-status" content="200">\n</head>'
      );

      // Determine output path
      const outDir = route === '/' ? DIST : join(DIST, route);
      mkdirSync(outDir, { recursive: true });

      const outFile = join(outDir, 'index.html');
      writeFileSync(outFile, html, 'utf-8');

      success++;
      console.log(`  [OK] ${route}`);
    } catch (err) {
      failed++;
      console.error(`  [FAIL] ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nPrerender complete: ${success} OK, ${failed} failed (${elapsed}s)`);

  if (failed > 0) {
    process.exit(1);
  }
}

prerender();
