# SEO regression guards

Status: active from `[SEOGEO-07]`.

## Required pre-push sequence

Run these commands after any change that can affect a public page:

```bash
npm run build
npm run seo:check
npm run lint:baseline
```

`seo:check` is deliberately not part of `prebuild`. It is a review/pre-push
guard and also runs in `.github/workflows/safety-check.yml`; snapshot drift must
not turn the deploy build itself into the approval mechanism.

If `npm run build` reports stale sitemap artifacts after an intentional page
content edit:

```bash
npm run sitemap:update
npm run build
```

Review the sitemap diff before committing. The URL set must remain 138 URLs
with 340 alternate links unless a separately approved routing task changes
those invariants. Commit `public/sitemap.xml` and
`scripts/sitemap-lastmod.json` in the same commit as the content source that
caused the date drift. A second consecutive build must not modify tracked
files.

## Conservative content-lastmod policy

`scripts/generateSitemap.js` resolves each route date from the most recent Git
commit across a deliberately narrow content dependency set:

- the route's own page/content component;
- its colocated page CSS module;
- its own locale namespace when one exists;
- for port routes, `src/pages/ports/portData.js` at file granularity;
- for blog details, the selected article body plus the article's explicit
  `dateISO` value.

The resolver deliberately excludes:

- shared components and their CSS, including templates and SEO helpers;
- `relatedGuides.js`, `localePaths.js`, and other shared modules;
- `common.json`, `contextualCTA.json`, and every other shared namespace;
- the global shell (`App`, `main`, `Layout`, header/footer, navigation,
  overlays, global CSS, theme/config/analytics helpers);
- barrel files, build/prerender configuration, public images, and fonts.

The maintained route-to-page table is checked against the component imports
and route elements in `src/App.jsx` on every sitemap run. `App.jsx` is used only
as validation input and is not a lastmod dependency. A route component swap
therefore fails loudly until the conservative mapping is reviewed. The small
explicit route-to-own-namespace registry is also checked against literal
`useTranslation()` usage and locale-file existence, so a namespace rename
cannot silently leave lastmod watching the old file.

This asymmetry is intentional. Under-reporting can leave the sitemap quiet
about an occasional shared-chrome edit, while crawlers still discover changes
through their own recrawl signals. Over-reporting caused 120 of 138 URLs to
appear updated from a small shared-module change, destroying the meaning of
the hint. Under-reporting is therefore the cheaper error. Add an excluded
dependency later only with measured evidence that it carries route-owned
content.

Port data remains file-level. A change to one record can move all six port
slugs in all four locales (24 URLs). Per-object Git attribution was rejected as
disproportionate to the value of a sitemap hint.

Representative dependency sets:

| Route | Content dependencies |
| --- | --- |
| `/dealers` | `Dealers.jsx`, `Dealers.module.css`, `en/dealers.json` |
| `/pl/dealers` | `Dealers.jsx`, `Dealers.module.css`, `pl/dealers.json` |
| `/ports/newark` | `PortPage.jsx`, `PortPage.module.css`, `en/ports.json`, `portData.js` |
| `/copart-shipping` | `CopartShipping.jsx` |

## Full indexable-route SEO snapshot

`scripts/seo-snapshot.mjs` reads the crawler-facing prerendered HTML in
`dist/`. It derives the finite route inventory from `dist/valid-routes.json`,
excludes routes carrying a `noindex` robots directive, and requires the result
to match the 138 sitemap URLs exactly.

The committed baseline records, per route:

- title, meta description, canonical, robots;
- Open Graph title, description, and image;
- Twitter title and description;
- all H1 values and the ordered H2 list;
- hreflang alternates and the set of JSON-LD `@type` values;
- every JSON-LD `@type`, including nested graph/entity types;
- the sorted set of outbound same-origin internal link targets.

Internal links are stored as targets rather than counts. A target swap with an
unchanged count is therefore visible, and the CLI reports added and removed
targets separately.

The previous 11-route reference had 22 stale differences. All were reviewed
before regeneration and accepted as intentional drift: duplicate noscript H1
removal (`070a02a`), language controls becoming crawlable anchors (`c114a88`),
and approved CO/portal/dealer-quote crosslinks (`6bf267a`, `fe8eaa8`,
`fb4f5be`). No suspected regression was carried into the new reference.

## Lint debt guard

`scripts/lint-baseline.json` records the known ESLint findings, including rule,
file, line, column, severity, and message. The accepted ceiling is 7 errors and
28 warnings. `npm run lint:baseline` permits debt reduction but fails if either
severity count increases. It also prints identity drift so replacements are
visible in review even when the numeric gate still passes.
