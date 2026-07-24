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
import { fileURLToPath, pathToFileURL } from 'url';
import { PORT_SLUGS } from '../src/pages/ports/portData.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(__dirname, '..', 'dist');
// PRERENDER-OPT: port=0 lets the OS assign an available port. Eliminates
// the EADDRINUSE collision that hit the Apr 30 retry deploy when the prior
// process held 4567 across the redeploy. Explicit override still possible
// via PRERENDER_PORT for local debugging.
const PORT = parseInt(process.env.PRERENDER_PORT || '0', 10);

// SEO-FND-T01: blog articles are now prerendered. They were previously skipped
// (BLOG-LAZY, ae40fed) back when article bodies were React.lazy and snapshotted
// empty. Article components are now STATIC imports (see BlogArticle.jsx :11-29),
// so every /blog/{slug} prerenders its real content + self-referencing canonical
// and per-article <title>/description. Skipping them caused the runtime server to
// fall through to Home's dist/index.html as SPA fallback, giving all 18 articles
// canonical=/ + Home's <title> (mass "duplicate of homepage" deindexing).
// SKIP_PATTERNS kept (empty) so the skip mechanism stays available for any future
// auth-only/parameterized route without re-plumbing the loop.
const SKIP_PATTERNS = [];

function shouldSkip(route) {
  return SKIP_PATTERNS.some((pattern) => pattern.test(route));
}

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
    // SEO-FND-T04: when a page emits its own robots (e.g. noindex,follow via
    // PageMeta), Helmet appends it AFTER the index.html template's default
    // "index, follow". Keep the LAST (page) one so noindex pages ship a single,
    // unambiguous directive instead of two conflicting robots metas. Pages with
    // no page-level robots keep the template default untouched (single match).
    /<meta\s+name="robots"[^>]*\/?>/gi,
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

/**
 * CWV2-T01 — critical CSS extraction from Chrome coverage.
 *
 * Coverage ranges for rules inside @media/@supports blocks cover ONLY the
 * inner rule text; slicing them naively would drop the media prelude and
 * apply mobile rules everywhere. This walks the stylesheet once, maps every
 * conditional at-rule block ([start, bodyStart, end] + prelude), and re-wraps
 * extracted slices under their original prelude.
 *
 * @keyframes and @font-face are appended WHOLESALE: coverage never marks
 * keyframes as used, but the prerendered HTML carries entrance/pulse
 * animations that must run from the first styled paint.
 */
export function extractCriticalCss(cssText, ranges) {
  // Map conditional at-rule blocks (brace-matched).
  const atBlocks = [];
  const atRe = /@(media|supports|container)[^{};]*\{/g;
  let m;
  while ((m = atRe.exec(cssText)) !== null) {
    const bodyStart = m.index + m[0].length;
    let depth = 1;
    let i = bodyStart;
    while (i < cssText.length && depth > 0) {
      const ch = cssText[i];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      i++;
    }
    atBlocks.push({
      start: m.index,
      bodyStart,
      end: i, // index just past the closing brace
      prelude: cssText.slice(m.index, bodyStart - 1).trim(),
    });
    atRe.lastIndex = bodyStart;
  }

  // A used range for a rule inside @media can START inside the PRELUDE
  // (Chrome anchors it right after the "@media" keyword), so containment
  // must cover [start, end), not just the body. Prelude text itself is
  // never sliced — the group wrapper re-adds it.
  const blockFor = (pos) =>
    atBlocks.find((b) => pos >= b.start && pos < b.end - 1) || null;

  // Split ranges so none crosses an at-block boundary, then group by prelude.
  const groups = new Map(); // prelude ('' = top level) -> [css text]
  const push = (prelude, text) => {
    if (!text.trim()) return;
    if (!groups.has(prelude)) groups.set(prelude, []);
    groups.get(prelude).push(text);
  };
  for (const r of ranges) {
    let cursor = r.start;
    while (cursor < r.end) {
      const blk = blockFor(cursor);
      let next;
      if (blk) {
        const sliceStart = Math.max(cursor, blk.bodyStart);
        const sliceEnd = Math.min(r.end, blk.end - 1);
        if (sliceEnd > sliceStart) push(blk.prelude, cssText.slice(sliceStart, sliceEnd));
        if (r.end >= blk.end - 1) {
          next = blk.end; // consumed to the block's closing brace — skip past it
        } else {
          next = Math.max(r.end, sliceStart); // ended inside body (or prelude-only)
        }
        next = Math.max(next, cursor + 1);
      } else {
        // top level — stop at the next at-block start inside the range;
        // the block itself is handled by the next loop iteration (grouped
        // under its prelude).
        const nextBlk = atBlocks.find((b) => b.start > cursor && b.start < r.end);
        const sliceEnd = nextBlk ? Math.min(r.end, nextBlk.start) : r.end;
        push('', cssText.slice(cursor, sliceEnd));
        next = Math.max(sliceEnd, cursor + 1);
      }
      cursor = next;
    }
  }

  let out = (groups.get('') || []).join('\n');
  for (const [prelude, parts] of groups) {
    if (!prelude) continue;
    out += `\n${prelude}{${parts.join('\n')}}`;
  }

  // Whole @keyframes + @font-face, brace-matched.
  const wholesaleRe = /@(?:-webkit-)?(?:keyframes|font-face)[^{]*\{/g;
  while ((m = wholesaleRe.exec(cssText)) !== null) {
    let depth = 1;
    let i = m.index + m[0].length;
    while (i < cssText.length && depth > 0) {
      if (cssText[i] === '{') depth++;
      else if (cssText[i] === '}') depth--;
      i++;
    }
    out += '\n' + cssText.slice(m.index, i);
    wholesaleRe.lastIndex = i;
  }

  // Safety net: Chrome occasionally merges ranges across an at-block edge,
  // which can leave an unbalanced brace and silently eat later rules.
  const opens = (out.match(/\{/g) || []).length;
  const closes = (out.match(/\}/g) || []).length;
  if (opens > closes) out += '}'.repeat(opens - closes);
  return out;
}

/**
 * PSIFIX-T03 — above-the-fold post-filter for the extracted critical CSS.
 *
 * Chrome coverage marks a rule "used" when it matches ANYWHERE on the fully
 * rendered page, so footer / mid-page / reviews rules ride along in the
 * inline critical block (8.9 KB gz on '/'). splitCriticalCss() parses the
 * extractCriticalCss() output back into rules; the page then classifies each
 * selector at BOTH breakpoints and assembleCriticalCss() keeps a rule unless
 * every element it matches sits below the fold. Fail-open in every ambiguous
 * case:
 *   - selector matches nothing (JS-toggled states like .open/.in)  -> KEEP
 *   - selector fails to parse after pseudo-stripping               -> KEEP
 *   - element inside <header> (early-interaction menus, hidden)    -> KEEP
 *   - nested at-rule the parser treats as opaque                   -> KEEP
 * @keyframes are then filtered to animation names referenced by surviving
 * rules; @font-face is always kept.
 */
export function splitCriticalCss(cssText) {
  const items = []; // {kind:'rule',selector,text} | {kind:'group',prelude,rules:[...]} |
                    // {kind:'keyframes',name,text} | {kind:'raw',text}
  const parseRules = (text) => {
    const rules = [];
    let depth = 0, start = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') {
        depth--;
        if (depth === 0) {
          const chunk = text.slice(start, i + 1).trim();
          if (chunk) {
            const brace = chunk.indexOf('{');
            rules.push({ selector: chunk.slice(0, brace).trim(), text: chunk });
          }
          start = i + 1;
        }
      }
    }
    return rules;
  };
  let depth = 0, start = 0;
  for (let i = 0; i < cssText.length; i++) {
    if (cssText[i] === '{') depth++;
    else if (cssText[i] === '}') {
      depth--;
      if (depth === 0) {
        const chunk = cssText.slice(start, i + 1).trim();
        start = i + 1;
        if (!chunk) continue;
        const brace = chunk.indexOf('{');
        const head = chunk.slice(0, brace).trim();
        if (/^@(?:-webkit-)?keyframes/.test(head)) {
          const name = (head.match(/keyframes\s+(\S+)/) || [])[1] || '';
          items.push({ kind: 'keyframes', name, text: chunk });
        } else if (/^@font-face/.test(head)) {
          items.push({ kind: 'raw', text: chunk });
        } else if (/^@(?:media|supports|container)/.test(head)) {
          items.push({
            kind: 'group',
            prelude: head,
            rules: parseRules(chunk.slice(brace + 1, chunk.lastIndexOf('}'))),
          });
        } else if (head.startsWith('@')) {
          items.push({ kind: 'raw', text: chunk }); // @page etc. — opaque, keep
        } else {
          items.push({ kind: 'rule', selector: head, text: chunk });
        }
      }
    }
  }
  return items;
}

export function assembleCriticalCss(items, keepSelector) {
  const out = [];
  const survivingText = [];
  for (const it of items) {
    if (it.kind === 'rule') {
      // a rule inside a group parser can itself be an opaque at-rule — keep those
      if (it.selector.startsWith('@') || keepSelector(it.selector)) {
        out.push(it.text);
        survivingText.push(it.text);
      }
    } else if (it.kind === 'group') {
      const kept = it.rules.filter(
        (r) => r.selector.startsWith('@') || keepSelector(r.selector)
      );
      if (kept.length) {
        out.push(`${it.prelude}{${kept.map((r) => r.text).join('\n')}}`);
        survivingText.push(...kept.map((r) => r.text));
      }
    } else if (it.kind === 'raw') {
      out.push(it.text);
    }
  }
  // Keyframes: keep only names referenced by surviving declarations.
  const referenced = new Set();
  const animRe = /(?:^|[;{])\s*(?:-webkit-)?animation(?:-name)?\s*:([^;}]*)/g;
  for (const text of survivingText) {
    let m;
    while ((m = animRe.exec(text)) !== null) {
      for (const tok of m[1].split(/[\s,]+/)) {
        if (/^[A-Za-z_][\w-]*$/.test(tok)) referenced.add(tok);
      }
    }
  }
  for (const it of items) {
    if (it.kind === 'keyframes' && referenced.has(it.name)) out.push(it.text);
  }
  return out.join('\n');
}

// Runs inside the page: classify each selector as 'above' (some matched
// element intersects the viewport or is fixed/sticky or lives in <header>),
// 'below' (matches only out-of-viewport elements), 'none' (matches nothing),
// or 'keep' (unparseable — fail open). Interaction pseudos and pseudo-elements
// are stripped before matching.
const CLASSIFY_SELECTORS_FN = (selectors) =>
  selectors.map((sel) => {
    try {
      const header = document.querySelector('header');
      let sawMatch = false;
      for (let part of sel.split(',')) {
        part = part
          .replace(/::[a-zA-Z-]+(\([^)]*\))?/g, '')
          .replace(
            /:(hover|focus-visible|focus-within|focus|active|visited|disabled|checked|target)(\([^)]*\))?/g,
            ''
          )
          .trim();
        if (!part) return 'keep';
        let els;
        try {
          els = document.querySelectorAll(part);
        } catch {
          return 'keep';
        }
        if (!els.length) continue;
        sawMatch = true;
        for (const el of els) {
          if (header && header.contains(el)) return 'above';
          const cs = getComputedStyle(el);
          if (cs.position === 'fixed' || cs.position === 'sticky') return 'above';
          const r = el.getBoundingClientRect();
          if (
            r.top < window.innerHeight * 1.2 &&
            r.bottom > -50 &&
            (r.width > 0 || r.height > 0)
          ) {
            return 'above';
          }
        }
      }
      return sawMatch ? 'below' : 'none';
    } catch {
      return 'keep';
    }
  });

/**
 * PSIFIX-T03 — trim the extracted critical CSS to the true above-the-fold
 * set. Classifies every selector at the CURRENT (desktop) viewport and again
 * at the mobile viewport, then drops only rules that matched real elements
 * and never intersected either viewport. Leaves the page at the mobile
 * viewport (the snapshot HTML is already captured by the caller).
 */
async function trimCriticalCssInPage(page, criticalCss) {
  const items = splitCriticalCss(criticalCss);
  const selectors = [];
  for (const it of items) {
    if (it.kind === 'rule') selectors.push(it.selector);
    else if (it.kind === 'group') for (const r of it.rules) selectors.push(r.selector);
  }
  if (!selectors.length) return criticalCss;

  const desktop = await page.evaluate(CLASSIFY_SELECTORS_FN, selectors);
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
  );
  const mobile = await page.evaluate(CLASSIFY_SELECTORS_FN, selectors);

  const verdict = new Map();
  selectors.forEach((s, i) => {
    // keep unless BOTH breakpoints agree the selector matches only
    // below-the-fold elements (or matches nothing at one and below at the other)
    const d = desktop[i];
    const m = mobile[i];
    const drop = d !== 'above' && m !== 'above' && d !== 'keep' && m !== 'keep' &&
      (d === 'below' || m === 'below');
    if (!verdict.has(s)) verdict.set(s, !drop);
    else verdict.set(s, verdict.get(s) || !drop); // duplicate selector: keep if ANY instance kept
  });
  return assembleCriticalCss(items, (sel) => verdict.get(sel) !== false);
}

/**
 * CWV2-T01 — swap the render-blocking stylesheet link in a snapshot for
 * inline critical CSS + an async full-sheet load (preload/onload swap with a
 * <noscript> fallback). The SPA-fallback template keeps its blocking link
 * (portal routes are not PSI surfaces), and the prerender pass itself always
 * loads the full sheet — only the WRITTEN snapshot changes.
 */
function inlineCriticalCss(html, criticalCss, cssHref) {
  const linkRe = new RegExp(
    `<link[^>]*rel="stylesheet"[^>]*href="${cssHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
    'i'
  );
  if (!linkRe.test(html)) return null;
  const replacement =
    `<style data-critical="true">${criticalCss}</style>` +
    `<link rel="preload" href="${cssHref}" as="style" onload="this.onload=null;this.rel='stylesheet'">` +
    `<noscript><link rel="stylesheet" href="${cssHref}"></noscript>`;
  return html.replace(linkRe, replacement);
}

const PUBLIC_ROUTES = [
  '/',
  '/services',
  '/dealers',
  '/exporters',
  '/ship-my-car',
  '/quote',
  '/quote-verified',
  '/quote-verification-failed',
  '/track',
  '/contact',
  '/faq',
  '/about',
  '/careers',
  '/careers/apply',
  '/dealer-quote',
  // DaytonaCargo sister-company campaign LP (standalone, own chrome)
  '/daytonacargo',
  '/privacy',
  '/terms',
  '/accessibility',
  // SEO service pages
  '/car-shipping-cost',
  '/enclosed-car-shipping',
  '/auction-car-shipping',
  '/auction-transport-savings',
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
  '/nj-export-warehouse-shipping-cost',
  '/texas-auto-transport',
  // Route pages
  '/massachusetts-to-florida-car-shipping',
  '/new-jersey-to-florida-car-shipping',
  '/texas-to-newark-port-auto-transport',
  '/chicago-to-port-newark-car-shipping',
  '/auction-to-port-transport',
  '/atlanta-to-savannah-port-auto-transport',
  '/dallas-to-port-houston-auto-transport',
  '/florida-to-jacksonville-port-car-shipping',
  // EV/Tesla pages
  '/tesla-car-shipping',
  '/ev-auto-transport',
  '/cybertruck-shipping',
  '/electric-vehicle-port-delivery',
  // Guide pages
  '/how-to-ship-a-car-bought-at-auction',
  '/open-vs-enclosed-auto-transport',
  '/what-is-a-bill-of-lading',
  '/copart-storage-fees',
  '/copart-gate-pass-guide',
  '/copart-international-shipping',
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
  '/blog/copart-iaa-manheim-comparison',
  '/blog/auction-to-port-cost-breakdown-2026',
  '/blog/central-dispatch-listing-decoded',
  '/blog/enclosed-transport-when-to-skip',
  '/blog/non-running-vehicle-shipping-playbook',
  '/blog/winter-auto-transport-pricing',
  '/blog/bill-of-lading-pickup-delivery-guide',
  '/blog/port-specific-export-newark-houston-savannah',
  '/blog/copart-storage-fees-real-cost-2026',
  '/blog/copart-for-international-buyers-complete-guide',
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
  // SEO-P2B: localized port pages — same PortPage component with i18n flipped
  // by the URL prefix. Slugs come from PORT_SLUGS (single source of truth).
  ...['ua', 'pl', 'ru'].flatMap((lang) => PORT_SLUGS.map((s) => `/${lang}/ports/${s}`)),
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
      const actualPort = server.address().port;
      console.log(`Prerender server running on http://localhost:${actualPort}`);
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
  const actualPort = server.address().port;
  const baseUrl = `http://localhost:${actualPort}`;
  console.log(`Prerender base URL: ${baseUrl}`);

  // PRERENDER-OPT: log skipped routes for visibility
  const skipped = PUBLIC_ROUTES.filter(shouldSkip);
  console.log(`[prerender] skipping ${skipped.length} blog article routes:`);
  skipped.forEach((r) => console.log(`  - ${r}`));

  const ROUTES_TO_PRERENDER = PUBLIC_ROUTES.filter((r) => !shouldSkip(r));
  console.log(`[prerender] ${ROUTES_TO_PRERENDER.length} routes will be prerendered`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const startTime = Date.now();
  let success = 0;
  let failed = 0;

  for (const route of ROUTES_TO_PRERENDER) {
    const page = await browser.newPage();

    // PSIFIX-T05: mark the prerender pass for Reveal.jsx. Above-fold Reveals
    // snap to their resting classes (in + noAnim) in the SNAPSHOT, so the
    // static first paint shows the hero at rest and pixel-identical to the
    // post-hydration repaint — the browser then never records a later/larger
    // LCP entry at hydration time (the CWV2 entrance animation kept the H1's
    // static paint from ever registering as LCP; PSI's 4.1s LCP was hydration
    // time). Deliberately NOT navigator.webdriver: PSI/Lighthouse run with
    // webdriver=true and must take the same code path as real users.
    await page.evaluateOnNewDocument(() => {
      window.__Y7_PRERENDER = true;
    });

    // Block unnecessary resources during prerender.
    // Two classes of blocks:
    //   1) image/media/font — not needed to snapshot HTML
    //   2) external tracking scripts — gtag.js, FB pixel, etc. These are
    //      gated by useEffect+consent at runtime and never actually fire
    //      during prerender, but if the script tag is injected the request
    //      can hang and prevent networkidle from ever being reached
    //      (observed on /privacy, /terms, /accessibility in Docker).
    const TRACKER_DOMAINS = [
      'googletagmanager.com',
      'google-analytics.com',
      'googleadservices.com',
      'doubleclick.net',
      'facebook.com',
      'facebook.net',
      'fbcdn.net',
    ];
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      const type = req.resourceType();
      if (TRACKER_DOMAINS.some((d) => url.includes(d))) {
        req.abort();
        return;
      }
      // FIX-JUMP-T01: block the dispatch public API during prerender so on-mount
      // fetch('/api/public/...') calls never complete here. Components then bake
      // their deterministic pre-fetch initial state (LiveActivityFeed -> null,
      // ReviewsCarousel -> static testimonials), which is exactly what the client
      // renders first. That makes the createRoot() re-render a visual no-op and
      // kills the homepage "reload/jump" + CLS. Live site fetches /api/public/
      // normally; this abort is Puppeteer-only.
      if (url.includes('/api/public/')) {
        req.abort();
        return;
      }
      if (['image', 'media', 'font'].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    try {
      // CWV2-T01: mobile-first viewport + CSS coverage. Coverage accumulates
      // per stylesheet across the page session; we resize to desktop before
      // the snapshot so BOTH breakpoints' matched rules land in the critical
      // set (extracting one viewport only would FOUC the other).
      await page.setViewport({ width: 390, height: 844 });
      await page.coverage.startCSSCoverage();

      await page.goto(`${baseUrl}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
      // Give React a moment to hydrate and render
      await new Promise((resolve) => setTimeout(resolve, 800));

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

      // SEO-FND-T01: guard against snapshotting the SPA shell's (Home's) <head>.
      // Wait until react-helmet has applied THIS route's canonical — i.e. the
      // canonical pathname equals the route we navigated to (not '/'). Without
      // this, a slow lazy route chunk could let us snapshot before PageMeta runs,
      // baking Home's canonical=/ and <title> into the page (the original blog
      // bug). Non-fatal on timeout; the post-build canonical audit is the gate.
      await page.evaluate((expectedPath) => {
        return new Promise((resolve) => {
          const TIMEOUT_MS = 5000;
          const startedAt = Date.now();
          const want = expectedPath.replace(/\/$/, '') || '/';
          const norm = (u) => {
            try { return new URL(u).pathname.replace(/\/$/, '') || '/'; } catch { return ''; }
          };
          const check = () => {
            const link = document.querySelector('link[rel="canonical"]');
            if ((link && norm(link.href) === want) || Date.now() - startedAt > TIMEOUT_MS) {
              resolve();
              return;
            }
            requestAnimationFrame(check);
          };
          check();
        });
      }, route);

      // CWV2-T01: flip to desktop so desktop-only rules also register as
      // used, give styles two frames to recompute, then read coverage.
      await page.setViewport({ width: 1366, height: 900 });
      await page.evaluate(
        () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      );
      const cssCoverage = await page.coverage.stopCSSCoverage();

      let html = await page.content();

      // Deduplicate head tags before writing. See deduplicateHead() above
      // for the full rationale; runs before the prerender-status injection
      // so the status meta is always positioned right before </head>.
      html = deduplicateHead(html);

      // CWV2-T01: inline the page's used CSS, load the full sheet async.
      const appCss = cssCoverage.find((c) => /\/assets\/index-[^/]*\.css/.test(c.url));
      if (appCss) {
        const cssHref = new URL(appCss.url).pathname;
        let critical = extractCriticalCss(appCss.text, appCss.ranges);
        // PSIFIX-T03: drop rules whose matched elements all sit below the fold
        // in BOTH breakpoints (coverage sweeps in whole-page rules). Fail-open:
        // any error keeps the untrimmed set.
        try {
          const before = critical.length;
          critical = await trimCriticalCssInPage(page, critical);
          if (route === '/') {
            console.log(
              `  [critical] ${route}: ${before} -> ${critical.length} chars after viewport trim`
            );
          }
        } catch (err) {
          console.warn(`  [warn] ${route}: critical-CSS trim skipped (${err.message})`);
        }
        const swapped = inlineCriticalCss(html, critical, cssHref);
        if (swapped) {
          html = swapped;
        } else {
          console.warn(`  [warn] ${route}: stylesheet link not found for critical-CSS swap`);
        }
      } else {
        console.warn(`  [warn] ${route}: no coverage entry for the app stylesheet`);
      }

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

  // OVERNIGHT-T01: emit valid-routes.json so the express server can return
  // a proper 404 status on unknown paths instead of serving index.html.
  // Also copy /404/index.html to /404.html at the dist root so the server
  // can sendFile it as the not-found response body.
  // PRERENDER-OPT: emit FULL PUBLIC_ROUTES (incl. skipped blog articles)
  // so the runtime server still recognizes them and serves SPA fallback
  // instead of 404. Skipping prerender ≠ removing the route.
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

  // PRERENDER-OPT: explicit awaited shutdown + process.exit. Ensures the
  // OS port handle is released before Node exits, eliminating the latent
  // EADDRINUSE on subsequent retry deploys (Apr 30 16f5083 incident).
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        console.error('Server close error:', err);
        reject(err);
      } else {
        console.log('Prerender server closed cleanly');
        resolve();
      }
    });
  });

  process.exit(failed > 0 ? 1 : 0);
}

// CWV2-T01: allow `import { extractCriticalCss } from './prerender.mjs'`
// (tests/debug) without kicking off a full prerender run.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  prerender();
}
