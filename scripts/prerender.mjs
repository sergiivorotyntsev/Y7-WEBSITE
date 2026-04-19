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
const PORT = Number(process.env.PRERENDER_PORT) || 4567;

/**
 * Deduplicate head tags in prerendered HTML.
 *
 * Defensive backup to the snapshot fix in startServer(): even after the
 * static server stops contaminating non-Home pages with Home's PageMeta,
 * react-helmet-async + React 19 + Suspense can still flush its tags more
 * than once across Suspense boundaries on a single page render. Without
 * dedup, even Home produces 2 <title> and 2 <meta description>.
 *
 * Verified empirically against current dist/ output:
 *   - <title>:           per-page is FIRST  (Helmet replaces in DOM in place)
 *   - <meta description>:per-page is LAST   (Helmet appends new <meta>)
 *   - <link canonical>:  per-page is LAST
 *   - <meta og:*>:       per-page is LAST
 *   - <meta twitter:*>:  per-page is LAST
 *   - <link hreflang>:   per-page is LAST per unique hreflang value
 *   - prerender-status:  may appear more than once — keep last
 *
 * UNTOUCHED:
 *   - <script type="application/ld+json"> — multiple JSON-LD blocks are valid
 *   - <meta charset>, <meta viewport>, <meta name="robots">, <meta fragment>
 *   - <link rel="stylesheet|icon|preload|modulepreload|sitemap">
 *   - Anything in <body>
 *
 * Verified safe: zero `>` characters appear inside any description/og/title
 * content across all 58 prerendered pages, so the [^>]* attribute pattern
 * cannot break on real-world content.
 *
 * Sprint B may still want to migrate off react-helmet-async to React 19's
 * native metadata API, which would let us remove this function entirely.
 *
 * @param {string} html — full prerendered HTML document
 * @returns {string} HTML with deduplicated head tags
 */
function deduplicateHead(html) {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return html;

  const headFull = headMatch[0];
  const headInner = headMatch[1];

  // Tags where the per-page version is FIRST in DOM order.
  const keepFirstPatterns = [
    /<title\b[^>]*>[^<]*<\/title>/gi,
  ];

  // Tags where the per-page version is LAST in DOM order.
  const keepLastPatterns = [
    /<meta\s+name="description"[^>]*\/?>/gi,
    /<link\s+rel="canonical"[^>]*\/?>/gi,
    /<meta\s+property="og:title"[^>]*\/?>/gi,
    /<meta\s+property="og:description"[^>]*\/?>/gi,
    /<meta\s+property="og:url"[^>]*\/?>/gi,
    /<meta\s+property="og:image"[^>]*\/?>/gi,
    /<meta\s+property="og:type"[^>]*\/?>/gi,
    /<meta\s+property="og:site_name"[^>]*\/?>/gi,
    /<meta\s+name="twitter:card"[^>]*\/?>/gi,
    /<meta\s+name="twitter:title"[^>]*\/?>/gi,
    /<meta\s+name="twitter:description"[^>]*\/?>/gi,
    /<meta\s+name="twitter:image"[^>]*\/?>/gi,
    /<meta\s+name="prerender-status"[^>]*\/?>/gi,
  ];

  let newHeadInner = headInner;

  // Keep first occurrence: remove indices [1..N-1] in reverse order so
  // earlier match positions stay valid as we splice from the end.
  for (const regex of keepFirstPatterns) {
    const matches = [...newHeadInner.matchAll(regex)];
    if (matches.length > 1) {
      for (let i = matches.length - 1; i >= 1; i--) {
        const m = matches[i];
        newHeadInner = newHeadInner.slice(0, m.index) + newHeadInner.slice(m.index + m[0].length);
      }
    }
  }

  // Keep last occurrence: remove indices [0..N-2] in reverse order.
  for (const regex of keepLastPatterns) {
    const matches = [...newHeadInner.matchAll(regex)];
    if (matches.length > 1) {
      for (let i = matches.length - 2; i >= 0; i--) {
        const m = matches[i];
        newHeadInner = newHeadInner.slice(0, m.index) + newHeadInner.slice(m.index + m[0].length);
      }
    }
  }

  // Hreflang: keep the LAST occurrence per unique hreflang value.
  // Walk backwards to mark the first encounter (= last in document order)
  // as "keep", remove everything else.
  const hreflangRegex = /<link\s+rel="alternate"\s+hreflang="([^"]+)"[^>]*\/?>/gi;
  const hreflangMatches = [...newHeadInner.matchAll(hreflangRegex)];
  if (hreflangMatches.length > 0) {
    const seen = new Set();
    const keepIdx = new Set();
    for (let i = hreflangMatches.length - 1; i >= 0; i--) {
      const value = hreflangMatches[i][1];
      if (!seen.has(value)) {
        seen.add(value);
        keepIdx.add(i);
      }
    }
    for (let i = hreflangMatches.length - 1; i >= 0; i--) {
      if (keepIdx.has(i)) continue;
      const m = hreflangMatches[i];
      newHeadInner = newHeadInner.slice(0, m.index) + newHeadInner.slice(m.index + m[0].length);
    }
  }

  const newHeadFull = headFull.replace(headInner, newHeadInner);
  return html.replace(headFull, newHeadFull);
}

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
  // EV/Tesla pages
  '/tesla-car-shipping',
  '/ev-auto-transport',
  '/cybertruck-shipping',
  '/electric-vehicle-port-delivery',
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
  // Blog
  '/blog',
  '/blog/carrier-who-vanished',
  '/blog/carrier-coi-verification-guide',
  '/blog/fmcsa-2026-new-rules',
  '/blog/outbox-pattern-dispatch',
  '/blog/dealer-auction-pickup-guide',
  '/blog/exporter-documentation-checklist',
  '/blog/fmcsa-broker-recordkeeping-2026',
  '/blog/75000-bond-claims-guide',
  // Locale-prefixed translations of the 10 translatable pages.
  // Each is the SAME React component as its English counterpart with
  // i18n.language flipped by LocaleDetector from the URL prefix.
  ...['ua', 'pl', 'ru'].flatMap((lang) => [
    `/${lang}`,
    `/${lang}/services`,
    `/${lang}/dealers`,
    `/${lang}/exporters`,
    `/${lang}/ship-my-car`,
    `/${lang}/track`,
    `/${lang}/contact`,
    `/${lang}/faq`,
    `/${lang}/about`,
    `/${lang}/quote`,
  ]),
  // Unique intl landing pages — distinct content, distinct slugs.
  '/pl/transport-z-usa',
  '/pl/transport-z-aukcji',
  '/pl/wysylka-auta-z-usa',
  '/ua/import-z-usa',
  '/ua/copart-ta-iaai',
  '/ua/dostavka-avto-z-usa',
  '/ru/dostavka-avto-iz-usa',
  '/ru/copart-i-iaai',
  '/ru/perevozka-avto',
  // OVERNIGHT-T01: /404 prerendered separately; emitted as dist/404.html by server
  '/404',
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

function startServer(indexHtmlBuffer) {
  const distIndexPath = join(DIST, 'index.html');
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);

      // SPA fallback: any extensionless URL or any 404 should serve the
      // index.html template. We always serve from the in-memory snapshot
      // taken BEFORE the prerender loop began — otherwise the '/' route's
      // own prerender output (which is written to dist/index.html) would
      // be served to every subsequent route, contaminating their HEAD
      // sections with Home's PageMeta tags and HreflangTags.
      const isSpaFallback =
        !extname(filePath) ||
        !existsSync(filePath) ||
        filePath === distIndexPath;

      if (isSpaFallback) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexHtmlBuffer);
        return;
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

  // Snapshot the clean Vite-built index.html template BEFORE the loop begins.
  // The '/' route's prerender output overwrites dist/index.html on disk, so
  // without this snapshot, every later route would load Home's contaminated
  // index.html as its base and inherit Home's PageMeta tags. The static
  // server below serves this in-memory copy for all SPA fallbacks.
  const cleanIndexHtml = readFileSync(join(DIST, 'index.html'));

  const server = await startServer(cleanIndexHtml);

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

      // Wait for the prerender-ready event or a max of 5s.
      // This signals that App.jsx has mounted, but the lazy-loaded route
      // component (and its <PageMeta>/<Helmet>) may still be pending.
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

      // Wait for react-helmet-async to actually apply per-page meta tags.
      // react-helmet-async marks managed elements with data-rh="true" once
      // it has flushed its batched updates from <Helmet> children. Without
      // this wait, we snapshot the index.html fallback meta description
      // because Helmet runs on the next animation frame after Suspense
      // resolves the lazy route. Then we add two more rAFs as a final
      // safety margin so any in-flight Helmet batch settles.
      await page.evaluate(() => {
        return new Promise((resolve) => {
          const TIMEOUT_MS = 5000;
          const startedAt = Date.now();
          const check = () => {
            const helmetManaged = document.querySelector('head meta[data-rh="true"], head title[data-rh="true"], head link[data-rh="true"]');
            if (helmetManaged || Date.now() - startedAt > TIMEOUT_MS) {
              requestAnimationFrame(() => requestAnimationFrame(resolve));
              return;
            }
            requestAnimationFrame(check);
          };
          check();
        });
      });

      let html = await page.content();

      // Deduplicate head tags before writing. See deduplicateHead() above
      // for the full rationale; runs before the prerender-status injection
      // so the status meta is always positioned right before </head>.
      html = deduplicateHead(html);

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

  // OVERNIGHT-T01: emit valid-routes.json so the express server can return
  // a proper 404 status on unknown paths instead of serving index.html.
  // Also copy /404/index.html to /404.html at the dist root so the server
  // can sendFile it as the not-found response body.
  try {
    writeFileSync(
      join(DIST, 'valid-routes.json'),
      JSON.stringify(PUBLIC_ROUTES, null, 2),
      'utf-8'
    );
    const nf404 = join(DIST, '404', 'index.html');
    const nfTop = join(DIST, '404.html');
    if (existsSync(nf404)) {
      writeFileSync(nfTop, readFileSync(nf404, 'utf-8'), 'utf-8');
    }
  } catch (e) {
    console.warn('[prerender] could not write valid-routes.json / 404.html:', e.message);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nPrerender complete: ${success} OK, ${failed} failed (${elapsed}s)`);

  if (failed > 0) {
    process.exit(1);
  }
}

prerender();
