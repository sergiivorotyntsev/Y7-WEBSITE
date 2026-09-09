import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Capture actual prerendered anchors without executing site JavaScript or network calls.
// Usage: node scripts/related-links-inventory.mjs --out tmp/links-before.json
//        node scripts/related-links-inventory.mjs --out tmp/links-after.json --compare tmp/links-before.json
// Comparison permits only non-heading related-label changes; it preserves all
// ordered hrefs, DOM positions, metadata, headings, schema, footer and body copy.
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const options = {};
while (args.length) {
  const flag = args.shift();
  assert(['--out', '--compare'].includes(flag), 'Unknown option: ' + flag);
  assert(args[0] && !args[0].startsWith('--'), 'Missing value for ' + flag);
  options[flag] = path.resolve(args.shift());
}
assert(options['--out'], 'Required: --out <snapshot.json>');
assert(options['--out'] !== options['--compare'], 'Do not overwrite the comparison baseline.');
const outputPath = options['--out'];
const phase = options['--compare'] ? 'comparison' : 'baseline';
const require = createRequire(path.join(repo, 'package.json'));
const puppeteer = require('puppeteer');
const routes = JSON.parse(fs.readFileSync(path.join(repo, 'dist/valid-routes.json'), 'utf8'));
assert.equal(routes.length, 143, 'Prerender route count');
const sha = value => createHash('sha256').update(value).digest('hex');
const pages = {}, missing = [], small = [], errors = [], attemptedRequests = [];
const browser = await puppeteer.launch({ headless: true });
let cursor = 0;
try {
  await Promise.all(Array.from({ length: 3 }, async () => {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', request => {
      attemptedRequests.push(request.resourceType());
      request.abort();
    });
    page.on('pageerror', error => errors.push(String(error)));
    while (cursor < routes.length) {
      const route = routes[cursor++];
      const file = path.join(repo, 'dist', route.slice(1), 'index.html');
      if (!fs.existsSync(file)) { missing.push(route); continue; }
      const html = fs.readFileSync(file, 'utf8');
      const bytes = Buffer.byteLength(html);
      if (bytes < 20480) small.push({ route, bytes });
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      const result = await page.evaluate(sourceRoute => {
        const normalize = value => (value || '').replace(/\s+/g, ' ').trim();
        const hasClass = (element, prefix) => !!element && [...element.classList].some(name => name === prefix || name.startsWith(`_${prefix}_`));
        const closestClass = (element, prefix) => {
          for (let node = element; node; node = node.parentElement) if (hasClass(node, prefix)) return node;
          return null;
        };
        const domPath = element => {
          const parts = [];
          for (let node = element; node?.nodeType === 1; node = node.parentElement) {
            const peers = node.parentElement ? [...node.parentElement.children].filter(sibling => sibling.tagName === node.tagName) : [node];
            parts.unshift(`${node.tagName.toLowerCase()}:nth-of-type(${peers.indexOf(node) + 1})`);
          }
          return parts.join(' > ');
        };
        const anchorElements = [...document.querySelectorAll('a')];
        const elementIndices = new Map([...document.querySelectorAll('*')].map((element, index) => [element, index]));
        const cardSection = [...document.querySelectorAll('h2')].find(heading => normalize(heading.textContent) === 'Related Guides')?.closest('section');
        const standaloneRelatedLists = [...document.querySelectorAll('h2')].filter(heading => normalize(heading.textContent) === 'Related').map(heading => heading.nextElementSibling).filter(element => element?.tagName === 'UL');
        const classify = anchor => {
          if (anchor.closest('footer, [role="contentinfo"]')) return 'global-footer';
          if (anchor.closest('header')) return 'global-header';
          if (closestClass(anchor, 'bar') && hasClass(anchor, 'btn')) return 'global-mobile-cta';
          if (cardSection?.contains(anchor)) return 'related-guides-card';
          if (hasClass(anchor, 'relatedCard') && /^\/blog\//.test(sourceRoute)) return 'blog-related-article-card';
          if (standaloneRelatedLists.some(list => list.contains(anchor))) return 'standalone-guide-related-list';
          if (hasClass(anchor, 'relatedServicesLink')) return 'blog-related-services';
          if (hasClass(anchor, 'relatedPill')) {
            if (closestClass(anchor, 'relatedBand')) return 'ukraine-copart-related-pill';
            if (/^\/(?:how-to-ship-a-car-bought-at-auction|what-is-a-bill-of-lading|open-vs-enclosed-auto-transport)$/.test(sourceRoute)) return 'guide-related-pill';
            return 'seo-related-pill';
          }
          if (hasClass(anchor, 'relatedLink') && /^(?:\/(?:ru|pl|ua))?\/ports\//.test(sourceRoute)) {
            return closestClass(anchor, 'relatedList') ? 'port-related-services' : 'contextual-body';
          }
          if (hasClass(anchor, 'cardCta') || hasClass(anchor, 'inlineLink')) return 'contextual-cta';
          if (anchor.closest('nav')) return 'navigation';
          if (anchor.closest('p, li')) return 'contextual-body';
          return 'other';
        };
        const templatedKinds = new Set(['related-guides-card', 'blog-related-services', 'ukraine-copart-related-pill', 'guide-related-pill', 'seo-related-pill', 'port-related-services', 'standalone-guide-related-list', 'blog-related-article-card']);
        const links = anchorElements.map((anchor, anchorIndex) => {
          const href = anchor.getAttribute('href');
          let internal = false, destination = null;
          try {
            const resolved = new URL(href, `https://www.y7agency.com${sourceRoute}`);
            internal = href !== null && ['https:', 'http:'].includes(resolved.protocol) && ['www.y7agency.com', 'y7agency.com'].includes(resolved.hostname);
            if (internal) destination = `${resolved.pathname}${resolved.search}${resolved.hash}`;
          } catch { /* Malformed hrefs are retained verbatim for the audit. */ }
          const kind = classify(anchor);
          const title = [...anchor.children].find(element => hasClass(element, 'linkTitle') || hasClass(element, 'relatedCardTitle'));
          const description = [...anchor.children].find(element => hasClass(element, 'linkDesc'));
          const fullAnchorText = normalize(anchor.textContent);
          const shortLabel = normalize(title ? title.textContent : anchor.textContent).replace(/\s*[→›]\s*$/, '');
          return {
            sourceRoute, destination, href, internal, kind, templated: templatedKinds.has(kind),
            shortLabel, description: normalize(description?.textContent), rawDescription: description?.textContent || '', fullAnchorText,
            rawAnchorText: anchor.textContent, anchorIndex, elementIndex: elementIndices.get(anchor),
            domPosition: domPath(anchor), tagName: anchor.tagName, className: anchor.className,
            containsProtectedHeading: !!anchor.querySelector('h1,h2,h3,h4,h5,h6'),
          };
        });
        const hrefSequence = links.map(({ href }) => href);
        const internalTargetSet = [...new Set(links.filter(link => link.internal).map(link => link.href))].sort();
        const metadata = [...document.head.querySelectorAll('title,meta,link[rel="canonical"],link[rel="alternate"]')].map(element => element.outerHTML);
        const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(element => ({ tag: element.tagName, text: element.textContent, normalizedText: normalize(element.textContent), domPosition: domPath(element) }));
        const schemaScripts = [...document.querySelectorAll('script[type="application/ld+json"]')].map(element => element.textContent);
        const footerHtml = [...document.querySelectorAll('footer, [role="contentinfo"]')].map(element => element.outerHTML);
        const root = document.querySelector('#root');
        const bodyClone = document.body.cloneNode(true);
        const bodyText = normalize(bodyClone.textContent);
        [...bodyClone.querySelectorAll('a')].forEach((anchor, index) => {
          const link = links[index];
          if (link.templated && !link.containsProtectedHeading) anchor.textContent = '__RELATED_LABEL__';
        });
        bodyClone.querySelectorAll('script,style,noscript').forEach(element => element.remove());
        return {
          populatedRoot: !!root?.children.length && normalize(root.textContent).length > 100,
          rootTextLength: normalize(root?.textContent).length,
          hrefSequence, internalTargetSet, metadata, headings, schemaScripts, footerHtml, links,
          bodyText, protectedBodyText: bodyClone.textContent,
          allDocumentHrefAttributes: [...document.querySelectorAll('[href]')].map(element => ({ tag: element.tagName, href: element.getAttribute('href') })),
        };
      }, route);
      pages[route] = { bytes, htmlSha256: sha(html), ...result,
        hrefSequenceSha256: sha(JSON.stringify(result.hrefSequence)),
        internalTargetSetSha256: sha(JSON.stringify(result.internalTargetSet)),
      };
    }
    await page.close();
  }));
} finally {
  await browser.close();
}

const orderedPages = Object.fromEntries(routes.filter(route => pages[route]).map(route => [route, pages[route]]));
const allLinks = Object.values(orderedPages).flatMap(page => page.links);
const templated = allLinks.filter(link => link.templated);
function rankLinks(selectedLinks) {
const byDestination = new Map();
for (const link of selectedLinks) {
  const destination = link.destination || link.href;
  if (!byDestination.has(destination)) byDestination.set(destination, []);
  byDestination.get(destination).push(link);
}
return [...byDestination].map(([destination, links]) => {
  const byLabel = new Map();
  for (const link of links) {
    if (!byLabel.has(link.shortLabel)) byLabel.set(link.shortLabel, []);
    byLabel.get(link.shortLabel).push(link);
  }
  const labels = [...byLabel].map(([shortLabel, occurrences]) => ({
    shortLabel, sourcePageCount: new Set(occurrences.map(link => link.sourceRoute)).size,
    occurrenceCount: occurrences.length,
    sourcePages: [...new Set(occurrences.map(link => link.sourceRoute))].sort(),
  })).sort((a, b) => b.sourcePageCount - a.sourcePageCount || b.occurrenceCount - a.occurrenceCount || a.shortLabel.localeCompare(b.shortLabel));
  return {
    destination, uniqueSourcePages: new Set(links.map(link => link.sourceRoute)).size,
    templatedOccurrences: links.length, distinctShortLabels: labels.length,
    distinctFullAnchors: new Set(links.map(link => link.fullAnchorText)).size,
    worstRepeatedShortLabelSourcePageCount: labels[0]?.sourcePageCount || 0,
    worstRepeatedShortLabel: labels[0]?.shortLabel || '', labels,
  };
}).sort((a, b) => b.worstRepeatedShortLabelSourcePageCount - a.worstRepeatedShortLabelSourcePageCount || b.uniqueSourcePages - a.uniqueSourcePages || b.templatedOccurrences - a.templatedOccurrences || a.destination.localeCompare(b.destination));
}
const ranking = rankLinks(templated);
const mutableRanking = rankLinks(templated.filter(link => !link.containsProtectedHeading));
const protectedHeadingRanking = rankLinks(templated.filter(link => link.containsProtectedHeading));
const kindCounts = {};
for (const link of allLinks) {
  kindCounts[link.kind] ||= { occurrences: 0, sourcePages: new Set() };
  kindCounts[link.kind].occurrences++;
  kindCounts[link.kind].sourcePages.add(link.sourceRoute);
}
for (const value of Object.values(kindCounts)) value.sourcePages = value.sourcePages.size;
const summary = {
  phase, head: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repo, encoding: 'utf8' }).trim(),
  routeCount: routes.length, capturedRoutes: Object.keys(pages).length, missing, small,
  populatedRoots: Object.values(pages).filter(page => page.populatedRoot).length,
  errors, javascriptEnabled: false, requestsBlocked: attemptedRequests.length,
  totalAnchors: allLinks.length, templatedAnchors: templated.length,
  templatedSourcePages: new Set(templated.map(link => link.sourceRoute)).size,
  templatedDestinations: ranking.length, kindCounts,
  allTemplatedRealAnchors: templated.every(link => link.tagName === 'A' && typeof link.href === 'string' && link.href.length > 0),
};

assert.deepEqual(missing, [], 'Missing prerendered routes');
assert.deepEqual(small, [], 'Snapshots smaller than 20 KB');
assert.deepEqual(errors, [], 'Static parsing errors');
assert.equal(summary.populatedRoots, 143, 'Populated React roots');
assert(summary.allTemplatedRealAnchors, 'Templated links must be real anchors with hrefs');
const snapshot = { schemaVersion: 1, summary, routes, pages: orderedPages, ranking, mutableRanking, protectedHeadingRanking };
if (options['--compare']) {
  const before = JSON.parse(fs.readFileSync(options['--compare'], 'utf8'));
  assert.equal(before.schemaVersion, 1, 'Unsupported baseline version');
  assert.deepEqual(routes, before.routes, 'Route inventory changed');
  const differences = [], changes = [];
  const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
  const folded = label => label.normalize('NFKC').replace(/\s+/g, ' ').trim().toLocaleLowerCase('en-US');
  for (const route of routes) {
    const old = before.pages[route], current = orderedPages[route];
    for (const field of ['hrefSequence','internalTargetSet','metadata','headings','schemaScripts','footerHtml','protectedBodyText']) {
      if (!same(old[field],current[field])) differences.push({route,field});
    }
    if (old.links.length !== current.links.length) { differences.push({route,field:'anchorCount'}); continue; }
    current.links.forEach((link,index) => {
      const prior = old.links[index];
      for (const field of ['domPosition','kind','href','tagName','rawDescription']) {
        if (!same(prior[field],link[field])) differences.push({route,index,field});
      }
      if (prior.rawAnchorText === link.rawAnchorText) return;
      if (!link.templated || link.containsProtectedHeading) differences.push({route,index,field:'protectedAnchorText'});
      if (folded(prior.shortLabel) === folded(link.shortLabel)) differences.push({route,index,field:'caseOnlyOrWhitespaceChange'});
      changes.push({source:route,destination:link.destination,surface:link.kind,index,oldLabel:prior.shortLabel,newLabel:link.shortLabel});
    });
  }
  const diversified = new Set(changes.map(change=>folded(change.newLabel)));
  const labelSources = new Map();
  for (const link of allLinks) {
    const key = folded(link.shortLabel);
    if (!diversified.has(key)) continue;
    if (!labelSources.has(key)) labelSources.set(key,new Set());
    labelSources.get(key).add(link.sourceRoute);
  }
  const excessive = [...labelSources].filter(([,sources])=>sources.size>2).map(([label,sources])=>({label,sources:[...sources]}));
  snapshot.comparison = {baseline:options['--compare'],routes:routes.length,differences,changes,excessive,
    passed:differences.length===0 && excessive.length===0,
    orderedHrefArraysIdentical:!differences.some(d=>d.field==='hrefSequence'),
    internalTargetSetsIdentical:!differences.some(d=>d.field==='internalTargetSet')};
  console.log(JSON.stringify({routes:routes.length,changes:changes.length,differences,excessive,passed:snapshot.comparison.passed},null,2));
  if(!snapshot.comparison.passed) process.exitCode=1;
}
fs.mkdirSync(path.dirname(outputPath), {recursive:true});
fs.writeFileSync(outputPath,JSON.stringify(snapshot,null,2)+'\n');
console.log(JSON.stringify({outputPath,...summary},null,2));
