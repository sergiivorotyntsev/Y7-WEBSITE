# WEBGEO — PHASE 0, read-only audit

**Repository:** `C:\dev\Y7-WEBSITE`
**HEAD at audit time:** `08c7565fd3c2fd3f73eeecf98735611a1c2857da`
**`git log --oneline main..origin/main`:** empty (Gate 0 passed)
**`git status --porcelain` at start:** empty (clean tree)
**Date:** 2026-09-02 (UTC)
**Machine:** HOME — `USERPROFILE=C:\Users\vorot`, Windows 11 Home 26200, Node v24.14.1

**No production code changed.** The only writes are this report and
`docs/audits/raw/webgeo/**` (measurement scripts and their raw output), plus one
`npm run build`, whose two generated tracked files were restored and verified byte-equal
afterwards (§T01).

**Scripts and raw output** — every number below is reproducible from these:

| path | task |
|---|---|
| `docs/audits/raw/webgeo/t01_routes.mjs` → `out/T01_routes.txt`, `out/T01_route_sources.txt` | T01 |
| `docs/audits/raw/webgeo/out/T01_build.txt` | T01.4 — the full build, timed |
| `docs/audits/raw/webgeo/out/T01_build_churn.diff` | T01.4 — the two generated tracked files the build dirtied, before restoring them |
| `docs/audits/raw/webgeo/t02_locale_cost.mjs` → `out/T02_locale_cost.txt`, `out/T02_key_drift.txt` | T02 |
| `docs/audits/raw/webgeo/out/T02_locale_sites.txt` | T02.1 |
| `docs/audits/raw/webgeo/t04_structured_data.mjs` → `out/T04_structured_data.txt`, `out/T04_hreflang.txt` | T04 |
| `docs/audits/raw/webgeo/t06_copy_sweep.sh` → `out/T06_copy_sweep.txt` | T06 |
| `docs/audits/raw/webgeo/t07_co_content.mjs` → `out/T07_co_content.md`, `out/T07_co_answers.txt` | T07 |

---

## 0 · GATE 0 — PASSED, BUT THE BASE MOVED DURING THE SESSION

`main..origin/main` is empty and the tree was clean, so the gate passed and I proceeded.

**Recorded because it is material to a sibling audit:** this session began earlier against
Y7-WEBSITE `e3dae553`. Between then and Gate 0, a parallel session merged and pushed
`sprint/agrgate`:

```
08c7565 [AGRGATE-T07] feat: three acknowledgement ticks, and the E-SIGN notice in view
c581e6c [AGRGATE-T05] feat: the quote form asks the customer their account type
3b1fbe4 [AGRGATE-T02] feat: the quote page asks for the signature and the details
```

Sixteen files, `+706 / -264`, including a rewrite of `src/pages/QuoteAction.jsx` and a new
`src/pages/ConfirmQuotePanel.jsx` (519 lines). **Every WEBGEO number below is measured at
`08c7565f`.** Anything measured against `e3dae553` — including this machine's
`docs/audits/WAVE0_PHASE0.md` §P0-1 — is one commit-set out of date on those files.

---

## WHAT I EXPECTED TO FIND AND DID NOT

1. **A GSC access mechanism.** The brief says there is prior work. There is prior *analysis*
   — a July 8 CSV export from the Search Console UI, pasted as prose into a sprint prompt.
   **There is no credential, no API client, no service account, no export file, and no
   `gcloud` on this machine.** T03, the sprint's highest-value task, cannot be answered from
   this environment. §T03 states exactly what is missing.
2. **A CI address guard failing on the address.** It bans `Natick` (the correct address) and
   matches 44 times — but **the job never reaches that step.** It dies two steps earlier on
   `Y7 AGENCY`, which matches **once**, in a sprint report. §T08.
3. **`/certificate-of-origin` in `llms.txt`.** The site maintains a curated `llms.txt` for
   answer engines. The CO page — the one differentiated, highest-margin service — **is not
   in it.** Neither is `/quote`. §T04.
4. **A locale set defined once.** `src/lib/localePaths.js:12-13` exports `SUPPORTED_LOCALES`
   and `LOCALIZED_PREFIXES`. **Fourteen other files carry their own literal
   `/^\/(ua|pl|ru)(\/|$)/` instead of importing it.** §T02.
5. **Portal links on the pages that sell the portal.** `/dealers` has a whole section
   describing the customer portal and **no link to it**. §T05.

## WHAT I FOUND THAT I DID NOT EXPECT

1. **`src/locales/ua/faq.json:10` still claims a Newton head office — in Cyrillic.**
   *"із головним офісом у Ньютоні"*. Every Latin-alphabet grep for `Newton` misses it: mine,
   the prior audits', and **the CI guard's**. The same file family already uses `Натік` for
   Natick elsewhere, so the site states both addresses **in the same language**. §T06.
2. **`/api/public/dealer-inquiry` accepts all seven attribution fields and writes none of
   them.** `src/pages/DealerQuote.jsx:35-41` captures them, the Pydantic model declares them
   (`api/routes/public.py:120-126`), and the handler never reads them into the `INSERT`.
   Traced, not assumed. §T05.
3. **Two Polish locale bundles carry a UTF-8 BOM** — `src/locales/pl/home.json`,
   `src/locales/pl/shipMycar.json`. The bundler tolerates it; `JSON.parse` does not, so any
   tooling that reads the bundles fails on exactly those two files. §T08.
4. **CI never builds this site.** `safety-check.yml` is the only workflow and it runs six
   `grep`s. There is no build check, so a build-breaking commit reaches `main` unopposed.
   §T08.
5. **`npm run seo:check` exists, works, reads `dist/`, and is wired to nothing.** Its own
   docstring says this is deliberate — *"a guard you run, not a build step."* §T08.
6. **The three locale prefixes are `pl`/`ua`/`ru` in URLs but the HTML/hreflang language for
   Ukrainian is correctly `uk`** (`src/components/PageMeta.jsx:7`). That one is *right*, and
   worth recording because it is the mistake this shape usually makes.

---


---

# T01 · ROUTE INVENTORY

## T01.1 — Where the route table actually lives (three sources, not one)

The brief says *find it, do not assume which*. There are **three**, and their relationship
is the finding:

| # | source | what it governs | count |
|---|---|---|---|
| 1 | `scripts/prerender.mjs:480` `PUBLIC_ROUTES` | what Puppeteer prerenders → what a non-JS crawler receives | **143** |
| 2 | `src/App.jsx` `<Route path=…>` | what react-router serves at runtime | 122 elements (105 without `:param`/`*`) |
| 3 | `scripts/generateSitemap.js` | what lands in `public/sitemap.xml` | 116 literal paths + composed port/blog paths |

`PUBLIC_ROUTES` is **not a pure literal** — it interpolates `PORT_SLUGS`
(`prerender.mjs:13`), so `t01_routes.mjs` imports the real module rather than substituting
a stand-in, which would have changed the count silently.

`SKIP_PATTERNS` is `[]` (`prerender.mjs:32`), so `PUBLIC_ROUTES === ROUTES_TO_PRERENDER`
(`:680-685`). **143 routes, 0 duplicates.**

`prerender.mjs:910-911` serialises `PUBLIC_ROUTES` to `dist/valid-routes.json`, which
`server.js:198-231` loads as `VALID_ROUTES` and uses to decide 200-vs-404. So source 1 is
the operative one at runtime too, and sources 2 and 3 are consumers that can drift from it.

**Command:** `node docs/audits/raw/webgeo/t01_routes.mjs`

## T01.2 — `out/T01_routes.txt`

143 lines, `<locale>\t<route>`, sorted.

## T01.3 — Per locale, and the asymmetry

```
en   83        ua   20        pl   20        ru   20
```

**Seventeen EN routes have a twin in all three locales**, and they are the whole localized
surface: `/`, `/about`, `/certificate-of-origin`, `/contact`, `/dealers`, `/exporters`,
`/faq`, `/quote`, `/services`, `/ship-my-car`, `/track`, and the six `/ports/*` pages.

**Sixty-six of 83 EN routes have no twin in any locale** — and the missing set is
*identical* in all three, so the localized surface was cut as one decision, not by
attrition. Measured breakdown of the 83 EN routes:

```
/blog/*      18   — every one EN-only
/ports/*      6   — every one localized in all three
other        59   — 11 localized (the list above minus the 6 ports), 48 EN-only
```

The 48 EN-only "other" routes are the SEO/landing estate (`/copart-shipping`,
`/car-shipping-cost`, `/copart-storage-fees`, the six location pages, the eight lane pages,
the guides) plus `/careers`, `/careers/apply`, `/dealer-quote`, `/daytonacargo`, `/privacy`,
`/terms`, `/accessibility`, `/404`, `/quote-verified`, `/quote-verification-failed`.
Full list: `out/T01_routes.txt`.

**This is the shape that matters for a locale decision:** every page that *ranks* — the blog
and the SEO estate, which is where the July GSC export shows all the impressions — exists in
English only. The localized surface is the brochure, not the traffic.

**The mirror — 9 localized routes with no EN twin**, three per locale, the native-slug
campaign landing pages:

```
ua  /ua/import-z-usa          /ua/copart-ta-iaai        /ua/dostavka-avto-z-usa
pl  /pl/transport-z-usa       /pl/transport-z-aukcji    /pl/wysylka-auta-z-usa
ru  /ru/dostavka-avto-iz-usa  /ru/copart-i-iaai         /ru/perevozka-avto
```

**Cross-source drift, and what is NOT drift.** My first pass reported *"75 prerendered
routes are not static App.jsx routes"*. That number is an artefact of my own regex: App.jsx
generates the localized and port/blog routes from templates
(`App.jsx:200 ['ua','pl','ru'].flatMap(...)`, and `path={`/${lang}/services`}`), which a
literal-path scan cannot match. **Reported as a method limitation, not as a defect.**

The 12 in the other direction are real and benign: `/{pl,ua,ru}/copart-shipping` and the
nine `-us` legacy paths are `<Navigate replace>` redirect routes, deliberately not
prerendered — **and `server.js:51-79` already 301s all twelve server-side**, so a crawler
gets a real 301 and never reaches the client-side copy. Two correct copies of one fact
(CLAUDE.md rule 20); today they cannot disagree.


---

## T01.4 — The production build, measured

**Command:** `npm run build` (= `node scripts/generateSitemap.js && vite build && node scripts/prerender.mjs`), wrapped in a wall-clock timer. Full log: `out/T01_build.txt`.

*(It was written as `T01_build.log` and renamed to `.txt` before committing: `.gitignore:3`
excludes `*.log`, and the brief requires the raw output to be committed. Renaming respects
the repo's ignore policy; `git add -f` would have left a tracked file that the ignore rule
claims is not there.)*

```
BUILD START            2026-09-02T03:29:31Z
BUILD END              2026-09-02T03:44:46Z
EXIT                   0
WALL CLOCK             915 s   (15 min 15 s)
prerender phase        888.9 s  — "Prerender complete: 143 OK, 0 failed"
pages actually written 143      (find dist -name index.html | wc -l)
[FAIL] / error lines   0
```

**The build succeeds.** 143 pages written, exactly matching `PUBLIC_ROUTES` — the manifest, the prerender output and the on-disk artefact all agree.

**Per-page cost: 888.9 s / 143 = 6.22 s per prerendered page.** That is the number T02.3 uses: a fifth locale at 20 routes adds **≈124 s (+14.0%)** to every build, taking it to roughly 17 minutes.

**Side effect, recorded and reversed.** `prebuild` regenerates two *tracked* files, and the build dirtied both:

```
public/sitemap.xml            164 lines changed
scripts/sitemap-lastmod.json  164 lines changed
```

Diff saved to `out/T01_build_churn.diff`. **Every changed line is a `<lastmod>` date** — nothing structural. `generateSitemap.js:49` derives each date from `git log -1 --format=%cs -- <file>`, so re-running after a design sprint touched the sources moves the dates forward (e.g. `/` `2026-07-01 → 2026-07-18`, `/accessibility` `2026-04-17 → 2026-07-16`). Both files were restored with `git checkout --` and verified byte-equal to the pre-build snapshot:

```
public/sitemap.xml            f92974473d990c098f2d003f111e3a6b  (matches pre-build)
scripts/sitemap-lastmod.json  6c703ac6994933f8346964fb15c4a593  (matches pre-build)
git status --porcelain        only the two untracked WEBGEO paths
```

*(Consequence worth one line: the committed `public/sitemap.xml` is a stale snapshot. The deployed one is regenerated by `prebuild` at image build time, so production serves fresh dates — but any build in a working tree dirties two tracked files, which is what `e692625 [STAT-W1-T03] chore: back out the sitemap churn my verification build produced` was cleaning up.)*

---

---

# T02 · HOW A LOCALE IS ADDED

## T02.1 — Every file that must change to add BG

Found by searching for the **locale set itself** — every co-occurrence of the three prefixes
— rather than by guessing filenames. Command and full output:
`docs/audits/raw/webgeo/out/T02_locale_sites.txt`.

**A canonical definition already exists and almost nothing uses it.**

```js
// src/lib/localePaths.js:12-13
export const SUPPORTED_LOCALES  = ['en', 'pl', 'ua', 'ru'];
export const LOCALIZED_PREFIXES = ['pl', 'ua', 'ru'];
```

**Seventeen sites hardcode the set independently. Fourteen of them are the same regex.**

| # | file:line | form | what it drives |
|---|---|---|---|
| 1 | `src/lib/localePaths.js:12` | `SUPPORTED_LOCALES` array | **the canonical definition** |
| 2 | `src/lib/localePaths.js:13` | `LOCALIZED_PREFIXES` array | canonical |
| 3 | `src/lib/localePaths.js:29` | `LOCALE_PREFIX_RE = /^\/(ua\|pl\|ru)(\/.*)?$/` | its own module re-hardcodes it |
| 4 | `src/i18n.js:114` | `SUPPORTED = ['en','pl','ua','ru']` | i18next config |
| 5 | `src/i18n.js:128` | `/^\/(ua\|pl\|ru)(\/\|$)/` | `localeFromPath()` — first-render locale |
| 6 | `src/components/PageMeta.jsx:7` | `HTML_LANG = { en:'en', ua:'uk', pl:'pl', ru:'ru' }` | `<html lang>` + hreflang codes |
| 7 | `src/components/PageMeta.jsx:10` | `/^\/(ua\|pl\|ru)(\/\|$)/` | locale of the current path |
| 8 | `src/components/HreflangTags.jsx:34,36` | literal `hrefLang="pl"`, `"ru"` … | **the hreflang block, per-locale props** |
| 9 | `src/components/LocaleDetector.jsx:5` | `LOCALE_PREFIX = /^\/(ua\|pl\|ru)(\/\|$)/` | post-mount detection |
| 10 | `src/components/Header.jsx:48,54` | two `/^\/(ua\|pl\|ru)…/` | language switcher + path rewrite |
| 11 | `src/components/Header.jsx:89,90,91` | three more, incl. the intl-slug alternation | nav active-state |
| 12 | `src/components/ContextualCTA.jsx:21` | `/^\/(ua\|pl\|ru)(\/\|$)/` | CTA locale |
| 13 | `src/pages/Home.jsx:32` | `/^\/(ua\|pl\|ru)(\/\|$)/` | home locale prefix |
| 14 | `src/pages/NotFound.jsx:10` | `/^\/(ua\|pl\|ru)(\/\|$)/` | 404 locale |
| 15 | `src/pages/portal/Onboarding.jsx:1037` | `['en','ru','pl','ua'].includes(lang)` | agreement locale |
| 16 | `src/App.jsx:200` | `['ua','pl','ru'].flatMap(...)` | **generates the localized `<Route>`s** |
| 17 | `scripts/prerender.mjs:574,590` | `['ua','pl','ru'].flatMap(...)` ×2 | **the prerender list** |
| 18 | `scripts/generateSitemap.js:142,145,267` | three `/(ua\|pl\|ru)/` regexes | sitemap grouping |
| 19 | `scripts/generateSitemap.js:296,297` | literal `hreflang="pl"`, `"ru"` lines | **sitemap hreflang emission** |
| 20 | `server.js:220,231` | two `/(pl\|ua\|ru)/` regexes | 404 gate + quote-action matching |
| 21 | `server.js:88-102` | three `-us` catch-all redirect blocks | legacy prefixes |

Plus the content itself: **a new `src/locales/bg/` directory of 18 namespace files**, and
BG entries in whatever page components carry per-locale copy inline (the nine intl landing
pages under `src/pages/intl/` are per-locale *components*, not translations — a BG
equivalent would be three new components, not three new JSON keys).

**And one asymmetry to decide before writing any code:** adding `bg` to `PUBLIC_ROUTES`
adds 20 routes and 20 prerendered pages; adding it to `App.jsx:200` adds the runtime routes;
adding it to `generateSitemap.js` adds the `hreflang` alternates on **every** localized
entry. Those three are in different languages, in different files, with no shared constant.
Miss one and the failure is silent in the direction that reads as success: the routes exist,
the sitemap does not advertise them, and Google never learns they are there.

## T02.2 — Key counts, and whether the four locales are in sync

**Command:** `node docs/audits/raw/webgeo/t02_locale_cost.mjs`

```
locale   namespaces   leaf keys      chars
en               20        2024     155730
pl               18        1759     118121
ru               18        1759     115604
ua               18        1759     115332
```

**They are in sync with each other and out of sync with EN, identically.** Measured as the
SET of key paths, not the count:

```
                missing vs EN    extra (not in EN)    byte-identical to EN
pl                  285                 20                   126
ru                  285                 20                    98
ua                  285                 20                   104

missing: identical SET across pl/ru/ua?  TRUE
extra:   identical SET across pl/ru/ua?  TRUE
```

**The 285 missing, by namespace:** `privacy` 123, `terms` 79, `agreement` 72, `dealers` 6,
`common` 5.

* `privacy` and `terms` **do not exist as files** in pl/ru/ua — legal pages are EN-only, and
  `i18n.js` maps them to `termsEn`/`privacyEn` for all four locales.
* `agreement` is not "missing" so much as **structurally different**: the non-EN bundles use
  20 `agreement.sections.<name>.{title,body}` keys where EN uses `section1`…`section12` plus
  the `section2_ind2026` / `checkboxes_ind2026` / `version_ind2026` variant. Those 20 are
  exactly the "extra" keys. **The non-EN agreement is the pre-v2.0 document.**
  *(This is the same drift the TRANSPORT repo carries in `data/agreements_i18n/{pl,ru,ua}/`,
  where `services/agreement_renderer.py:455` refuses to serve any non-EN bundle at all. Two
  repos, one stale document, and on the server side it is already unreachable.)*
* `common` 5 = `meta.careersTitle`, `meta.careersDescription`, `meta.careerApplicationTitle`,
  `meta.careerApplicationDescription`, `footer.serviceLinks.auctionTransportSavings`.
* `dealers` 6 = `crosslinks.items[8..10].{label,to}` — three cross-links added to EN only.

**Untranslated-but-present:** 126 / 98 / 104 keys are byte-identical to EN. Many are
legitimately shared (brand strings, `MC #1741537`, URLs); the count is an upper bound on
genuine untranslated copy, not a defect list. Full paths in `out/T02_key_drift.txt`.

**So the honest translation volume for BG** is **1,759 keys / ~118,000 characters** to reach
parity with the current locales — *not* 2,024 / 155,730 to reach parity with EN. Reaching EN
parity additionally requires translating `terms` and `privacy` (202 keys), which is a legal
review, not a translation job.

## T02.3 — Marginal build cost

Measured in T01.4: the prerender phase took **888.9 s for 143 pages = 6.22 s per page**, in
a total build of **915 s**.

A fifth locale following the existing pattern adds **20 routes** — the same 17 twins plus 3
native-slug landing pages — i.e. **143 → 163 pages, +14.0%**:

```
added prerender time    20 x 6.22 s  =  124 s
new total build         915 s + 124 s = 1039 s  (17 min 19 s)
```

**The build-time cost is not the constraint.** Two minutes per build against 1,759 keys of
translation and 17 hardcoded locale sites — the marginal cost of a locale is the translation
and the 17 edits, and the risk is that one of the 17 is missed silently (T02.1).

---

# T03 · WHO ALREADY FINDS US

> ## **NOT MEASURED. Google Search Console is not accessible from this environment, and no mechanism to reach it exists in this repository.**

The brief asks me to find the existing mechanism before building a new one. I looked, and
the honest answer is that **the prior work is analysis, not access.**

## T03.1 — What the prior work actually is

`CLAUDE_CODE_CONTENT_GSC.md` is not in the repository. It is a **sprint prompt** at
`C:\Users\vorot\Downloads\CLAUDE_CODE_CONTENT_GSC.md` (105 lines), alongside
`CONTENT_GSC_PHASE0_DECISIONS.md` (220) and `CONT_GSC_FINAL_REPORT.md` (147). Its §1 is
headed *"Fresh GSC data (Jul 8 export, 3-month window)"* and contains figures **pasted as
prose by a human who ran the export in the Search Console UI**. There is no script that
produced them and none that could reproduce them.

What IS in the repository is `docs/GSC_SETUP.md` — a **manual UI runbook**: add the
property, verify by Cloudflare TXT, submit the sitemap, request indexing 10-15 URLs/day,
read the Pages report weekly. Every step is a human clicking in a browser. It contains no
credential, no API, no export automation.

*Method note:* my first `git grep` for `search.console|searchconsole|GSC` in this repo
returned nothing, and `docs/GSC_SETUP.md` is tracked the whole time — the pattern was at
fault, not the repo. **"I did not find it" was not "it is not there";** the file was located
by a filename search a moment later.

## T03.2 — What is missing, exactly

Measured, each with the command:

| check | command | result |
|---|---|---|
| Google Cloud CLI | `which gcloud` | **absent** — not on `PATH` |
| Google API client in the site | `grep -i google package.json` | **absent** — 11 deps, 10 devDeps, none Google |
| service-account key in the repo | `git ls-files \| grep -i 'credential\|service.account'` | **none** |
| any GSC export file on disk | `find C:\Users\vorot\Downloads C:\dev -iname '*Queries.csv' -o -iname '*Countries.csv' -o -iname '*search-console*'` | **none** |
| GSC/Google env var | `grep -i 'GOOGLE\|GSC\|SEARCH' C:\dev\TRANSPORT\.env` | **none** |
| Y7-WEBSITE env | `ls .env*` | only `.env.example` |

**To make T03 answerable, exactly one of these is needed:**

1. **A Search Console CSV export**, done by hand in the UI: *Performance → last 90 days →
   Countries tab → Export*, and again with *Queries* filtered per country. Four clicks each.
   Drop the files anywhere on this machine and the analysis is a short script.
2. **Or programmatic access** — a Google Cloud project with the Search Console API enabled,
   a service-account JSON key, and that service account added as a **user of the
   `https://www.y7agency.com` property in Search Console** (property-level grant; the API
   will not see a property the account has not been added to). Then `google-auth` +
   `searchconsole.searchanalytics.query` with `dimensions: ['country','query']`.

Option 1 is minutes of the owner's time and needs no infrastructure. **I recommend it, and
I am not able to do it.**

## T03.3 — What the prior export said, quoted and dated, NOT re-measured

Recorded so the decision is not made on nothing — **but every figure here is second-hand,
is from a 3-month window ending 2026-07-08, and is nearly two months stale.** Verbatim from
the prompt's §"Segment signals":

> Nigeria 20 clicks CTR 6.6% pos 6.35 (Copart export buyers!); /ru/copart-shipping
> CTR 5.45%; Poland 8 clicks. Mobile CTR 1.31% vs desktop 0.25%.

And the page-level winners it lists:

| page | impressions | clicks | avg position |
|---|---|---|---|
| `/blog/copart-iaa-manheim-comparison` | 8,685 | 22 | 8.08 |
| `/blog/copart-storage-fees-real-cost-2026` | 4,041 | 15 | 6.99 |
| `/copart-shipping` | 3,751 | 23 | 9.74 |
| `/massachusetts-to-florida-car-shipping` | 1,258 | 1 | 36.17 |

**Bulgaria, Georgia and Albania appear nowhere in any of the three prior documents** — not
as a figure, not as a mention. That absence is from a document search, not from GSC, so it
establishes *the prior sprint did not look at them*, **not** that they have no impressions.

**What this does and does not license.** The brief says the BG/SQ/KA locale decision rests
on T03. On the evidence available:

* the only non-anglophone country with a *recorded* click figure is **Poland (8 clicks)**
  and **Nigeria (20 clicks, in English)**;
* `/ru/copart-shipping` earned a 5.45% CTR — **and that route no longer exists**; it is a
  301 to `/ru/copart-i-iaai` (`server.js:72-74`), which is one of the three RU native-slug
  pages. Whether the equity followed the redirect is a GSC question, unanswered here;
* every page with meaningful impressions in that export is **English-only** (T01.3).

**A recommendation to add BG/SQ/KA cannot be supported by anything I measured.** The
cheapest next step is the CSV export in T03.2 option 1, and until it exists this task stays
`NOT MEASURED`.


---

# T04 · STRUCTURED DATA AND MACHINE READABILITY

**Measured on `dist/`, not on the source.** The components tell you what *can* be injected; only the prerendered HTML tells you what a crawler that does not execute JS actually receives, which is the entire question for an answer engine.
**Command:** `node docs/audits/raw/webgeo/t04_structured_data.mjs` → `out/T04_structured_data.txt`, `out/T04_hreflang.txt`.

## T04.1 — Which types appear, on how many routes, and how they are injected

143 prerendered pages scanned. **Every JSON-LD block on every page is valid JSON — 0 parse failures.**

| type | routes carrying it | injected by |
|---|---|---|
| `LocalBusiness`, `PostalAddress`, `Country`, `PropertyValue`, `ContactPoint`, `OfferCatalog`, `Offer`, `Service` | **143 / 143** | `index.html:41-97` — one static site-wide block in the HTML shell |
| `BreadcrumbList`, `ListItem` | 123 | `src/components/BreadcrumbSchema.jsx` |
| `FAQPage`, `Question`, `Answer` | 58 | `src/components/FaqPageSchema.jsx`, plus page-local blocks in `FAQ.jsx`, `Dealers.jsx`, `Services.jsx`, the nine `src/pages/intl/*` pages and `src/pages/seo/*` |
| `Organization` | 20 | `BlogArticle.jsx`, `BlogIndex.jsx` (publisher) |
| `BlogPosting`, `ImageObject` | 18 | `src/pages/blog/BlogArticle.jsx` |
| `Audience` | 12 | `SeoLandingPage.jsx` / `MoneyPageSchema.jsx` |
| `Person` | 9 | blog author bylines |
| `BusinessAudience` | 5 | dealer/exporter pages |
| `CollectionPage` | 1 | `/blog` |
| `JobPosting` | 1 | `/careers` |
| `Place`, `PriceSpecification`, `PeopleAudience` | 1 each | one-off page blocks |

Injection is by **two mechanisms**: a static block in `index.html` that every prerendered page inherits, and `react-helmet-async` blocks emitted per page by five dedicated components (`BreadcrumbSchema`, `FaqPageSchema`, `MoneyPageSchema`, `PageMeta`) plus page-local `<script type="application/ld+json">` in 18 files.

## T04.2 — Routes with no structured data

> ### **ZERO of 143.**

Every prerendered page carries at least the eight site-wide types, because they live in the HTML shell rather than in a component. This is the strongest single result in the audit: there is no page an answer engine can reach that tells it nothing about the business.

The *thinnest* pages are the ones carrying only those eight — `/`, `/404`, `/accessibility`, and the locale roots — i.e. no breadcrumb and no FAQ. That is 20 routes (143 − 123 with `BreadcrumbList`).

## T04.3 — `robots.txt`, `llms.txt`, `sitemap.xml`

### `public/robots.txt` — 99 lines. **No answer-engine crawler is disallowed.**

Deliberately and explicitly permissive, with the reasoning written into the file:

* **Allowed with full access:** `Googlebot`, `Googlebot-Image`, `Bingbot`, `Slurp`, `DuckDuckBot`.
* **AI *search* bots — explicitly allowed:** `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Applebot`.
* **AI *training* bots — explicitly allowed**, with the same private-path exclusions as `*`, under the comment *"y7agency.com WANTS presence in future model weights"*: `GPTBot`, `anthropic-ai`, `ClaudeBot`, `CCBot`, `FacebookBot`, `Amazonbot`, `cohere-ai`, `Google-Extended`.
* **Blocked (junk/parasite scrapers):** `Bytespider`, `MJ12bot`, `DotBot`, `PetalBot`. Crawl-delayed: `AhrefsBot`, `SemrushBot`.
* Global `Disallow`: `/portal/`, `/agreement`, `/api/`, `/review/`, and hashed `/assets/*.{js,css,map}`.
* `Sitemap: https://www.y7agency.com/sitemap.xml` declared.

**Two gaps, both small:**
1. **`/promo` is an SPA namespace in `server.js:222` but is not disallowed in `robots.txt`.** The other three in that list (`/portal`, `/agreement`, `/review`) all are. A promo-code URL is crawlable.
2. **`robots.txt` does not reference `llms.txt`.** Not a standard requirement, but the file exists and nothing points at it.

### `public/llms.txt` — 99 lines, 68 URLs, and the CO page is not one of them

Every one of the 68 URLs resolves to a real prerendered route (`comm -12` against `out/T01_routes.txt` → 68 of 68). So there are no dead links. But it covers **68 of 143 routes (47.6%)**, and the omissions are not neutral:

| route | in `llms.txt`? |
|---|---|
| `/services`, `/ship-my-car`, `/dealers`, `/exporters`, `/contact`, `/about`, `/faq` | present |
| **`/certificate-of-origin`** | **ABSENT** |
| **`/quote`** | **ABSENT** |
| **`/track`** | **ABSENT** |

> **This is the headline finding for a GEO sprint.** `llms.txt` is the file whose entire purpose is to tell an answer engine what this business does. Certificate of Origin is the one service on the site that is differentiated, priced at a premium, and tied to a specific EU regulation — precisely the kind of narrow, factual question an LLM gets asked — **and it is the one service the file omits.** `/quote`, the primary conversion endpoint, is also absent.

Only **9 of the 68** are localized, and they are exactly the nine unique intl landing pages (`/pl/transport-z-usa`, `/ua/copart-ta-iaai`, `/ru/perevozka-avto`, …). None of the 17 localized twins appears. The file is, in effect, an English index with three campaign pages appended per language.

`llms.txt` states the address correctly: *"based in Natick, MA"*.

### `public/sitemap.xml`

Present, declared in `robots.txt`, and carrying reciprocal `xhtml:link` hreflang alternates on every localized URL, including `x-default`. Generated by `scripts/generateSitemap.js` at `prebuild`. See T01.4 for the stale-lastmod note on the committed copy.

## T04.4 — `hreflang` correctness, 5 routes × 4 locales

**20 pages sampled (`/`, `/exporters`, `/dealers`, `/certificate-of-origin`, `/services`, each in en/ua/pl/ru). All 20 clean — zero problems found.** Full output: `out/T04_hreflang.txt`.

Each emits **8 alternates**, is **self-referential**, carries **`x-default` → the EN URL**, and has a correct self-canonical and `<html lang>`:

```
en  en-US  uk  uk-UA  pl  pl-PL  ru  x-default
```

**The thing this usually gets wrong is right here.** The URL prefix for Ukrainian is `/ua`, but the emitted language subtag is **`uk`** — the ISO 639-1 code — not `ua`, which is the *country* code and invalid as a language subtag. `src/components/PageMeta.jsx:7` holds the mapping explicitly: `HTML_LANG = { en:'en', ua:'uk', pl:'pl', ru:'ru' }`, and `dist/ua/index.html` renders `<html lang="uk">`. Correct.

**Two observations, neither a defect I can prove:**

1. **`ru-RU` is absent while `en-US`, `uk-UA` and `pl-PL` are present.** `src/components/HreflangTags.jsx:29-36` emits a bare `ru` and no regional pair. The plausible reading is deliberate — Russian-*language* targeting without Russia-*country* targeting — but **the file records no reason**, so intent is not established here.
2. **75 of 143 pages emit no `hreflang` at all**, and this is *by design*: `HreflangTags.jsx:20` returns `null` when `isTranslatable(basePath)` is false, *"keeping those pages single-language for Google."* Each still carries a self-canonical and the right `<html lang>`. The 68 that do emit are exactly the 17 twins × 4 locales.

   **But nine of those 75 are translations of each other and are not linked as such.** The unique intl landing pages come in matched triples:

   | concept | ua | pl | ru |
   |---|---|---|---|
   | import from the USA | `/ua/import-z-usa` | `/pl/transport-z-usa` | `/ru/dostavka-avto-iz-usa` |
   | Copart / auctions | `/ua/copart-ta-iaai` | `/pl/transport-z-aukcji` | `/ru/copart-i-iaai` |
   | ship my car | `/ua/dostavka-avto-z-usa` | `/pl/wysylka-auta-z-usa` | `/ru/perevozka-avto` |

   Verified in `dist/`: `alternates=0` on all nine. They are the same page in three languages under deliberately native slugs — **the exact case `hreflang` exists for** — and the component cannot detect it because `stripLocale()` yields a different `basePath` for each. Nothing is wrong with the code; the mechanism simply does not reach this shape.

---

# T05 · CONVERSION PATH

## T05.1 / T05.2 / T05.4 — the full CTA table

`reaches portal` = the href resolves under `/portal/*`.
`measurable` = the destination carries a parameter that **survives to the order record**,
traced in T05.3 below — not merely a parameter that is sent.

| page | label (EN) | file:line | href / action | kind | reaches portal | measurable |
|---|---|---|---|---|---|---|
| `/` | Dealer Program | `Home.jsx:99` | `L('/dealers')` (locale-aware) | `<Link>` | **no** | no |
| `/` | Exporter Program | `Home.jsx:102` | `L('/exporters')` | `<Link>` | **no** | no |
| `/` | quick-quote submit | `QuoteFormCompact.jsx:65` | `navigate('/quote?pickup_zip=…&delivery_zip=…&email=…#top')` | JS navigate | **no** | **no — see T05.3** |
| `/` | full-form link | `QuoteFormCompact.jsx:125` | `/quote` (locale-aware) | `<a>` | **no** | no |
| `/` | quote-strip CTA | `QuoteStrip.jsx:123` | `#quote-section` (anchor) or `navigate('/quote?…')` at `:109` | anchor / JS navigate | **no** | **no — see T05.3** |
| `/` | port cells ×6 | `CoverageMap.jsx:60` | `/ports/*` | `<Link>` | no | no |
| `/` | location pills ×6 | `CoverageMap.jsx:82` | `/newton-auto-transport` etc. | `<Link>` | no | no |
| `/exporters` | See the program | `Exporters.jsx:194` | `#exporter-program` | anchor | no | n/a |
| `/exporters` | Request rates | `Exporters.jsx:195` | `#exporter-form` | anchor | no | n/a |
| `/exporters` | port links ×6 | `Exporters.jsx:376` | `/ports/${slug}` | `<Link>` | no | no |
| `/exporters` | Request a Certificate of Origin | `Exporters.jsx:568` | `/certificate-of-origin` | `<Link>` | no | no |
| `/exporters` | Certificate of Origin: pricing, eligibility… | `Exporters.jsx:570` | `/certificate-of-origin` | `<Link>` | no | no |
| `/exporters` | Request Service Rates | `Exporters.jsx:635` + form `:120` | `#exporter-form` → `POST /api/public/contact` | anchor + form | **no** | **no** |
| `/exporters` | Door-to-port guide | `Exporters.jsx:646` | `/door-to-port-auto-transport` | `<Link>` | no | no |
| `/exporters` | Auction to port transport | `Exporters.jsx:647` | `/auction-to-port-transport` | `<Link>` | no | no |
| `/exporters` | Copart shipping → | `Exporters.jsx:648` | `/copart-shipping` | `<Link>` | no | no |
| `/exporters` | Copart export → | `Exporters.jsx:649` | `/copart-international-shipping` | `<Link>` | no | no |
| `/exporters` | For dealers | `Exporters.jsx:650` | `/dealers` | `<Link>` | no | no |
| `/dealers` | Request Dealer Account Review | `Dealers.jsx:121` | `navigate('/dealer-quote')` | JS navigate | **no** | **partly — see T05.3** |
| `/dealers` | auction cards ×N | `Dealers.jsx:253` | `a.link \|\| '/auction-car-shipping'` | `<Link>` | no | no |
| `/dealers` | Request Dealer Account Review | `Dealers.jsx:373` | `/dealer-quote` | `<Link>` | **no** | partly |
| `/dealers` | Request Dealer Account Review | `Dealers.jsx:403` | `navigate('/dealer-quote')` | JS navigate | **no** | partly |
| `/dealers` | crosslinks ×N | `Dealers.jsx:417` | `c.to` (from `dealers.crosslinks.items`) | `<Link>` | no | no |
| `/certificate-of-origin` | exporter program | `CertificateOfOrigin.jsx:335` | `${prefix}/exporters` | `<Link>` | no | no |
| `/certificate-of-origin` | form submit | `CertificateOfOrigin.jsx:80` | `POST /api/public/contact` | form | **no** | **no** |

### T05.2 — CTAs reaching `/portal/*`, per page

```
/                        0
/exporters               0
/dealers                 0
/certificate-of-origin   0
```

**Zero, on all four.** The only portal entry anywhere in the chrome is the global header —
`Header.jsx:161` (desktop button → `/portal/login`), `:217` (mobile), and `:147`
(`/portal/dashboard`, shown only to an already-authenticated visitor).
**`Footer.jsx` contains no portal link at all.**

`/dealers` is the sharp case: `Dealers.jsx:230-236` renders an entire section titled from
`dealers.portal.title` describing the customer portal's features, and **nothing in it is a
link.** The page sells the portal and does not open it.

## T05.3 — Is the click measurable? Traced end to end

**Two capture points exist, not one.** (A prior audit recorded only the first.)

| capture | file:line | posts to | persisted? |
|---|---|---|---|
| `QuoteForm.jsx:67-73` → forwarded `:334` | 7 fields | `POST /api/public/quote` | **YES** |
| `DealerQuote.jsx:35-41` → posted `:113` | 7 fields | `POST /api/public/dealer-inquiry` | **NO** |

**The quote path persists.** Traced into TRANSPORT: `api/routes/public.py:75-88` models the
fields; `services/quote_intake.py:117-123` takes them as parameters, `:177-189` truncates
them to 500 chars, and `:609-620` names `utm_source, utm_medium, utm_campaign, utm_term,
utm_content, gclid, fbclid` in the `INSERT INTO customer_orders` column list. A UTM that
arrives on `/quote` does reach the order record.

**The dealer path does not.** `api/routes/public.py:120-126` declares all seven on
`DealerInquiryRequest`; `submit_dealer_inquiry` (`:1420`) does `data = payload.model_dump()`
and then reads **fifteen named keys** out of `data` (`dealership_name`, `contact_name`,
`email`, `phone`, `address`, `city`, `state`, `zip`, `monthly_volume`, `primary_routes`,
`pricing_model`, `services`, `referral_source`, `notes`, `registration_state`). None of the
seven is among them, and the `INSERT INTO customers` at `:1525-1530` does not carry them.
**Grep for `utm|gclid|fbclid` across the whole handler body (lines 1413-1560): zero hits.**
The attribution is accepted, validated, and dropped.

> ### And the finding that explains the production zero
>
> **Both home-page quote widgets destroy inbound attribution before `QuoteForm` can read
> it.**
>
> ```js
> // QuoteFormCompact.jsx:58-65
> const params = new URLSearchParams({ pickup_zip, delivery_zip, [isEmail?'email':'phone']: trimmed });
> navigate(`${base}?${params.toString()}#top`);
>
> // QuoteStrip.jsx:104-109
> const params = new URLSearchParams();
> params.set('pickup_zip', a.zip); … params.set('transport_type', transport);
> navigate(`/quote?${params.toString()}#top`);
> ```
>
> Both construct a **fresh** `URLSearchParams` and neither merges the current
> `location.search`. A visitor who lands on `/?utm_source=x&gclid=y`, fills the home widget,
> and is navigated to `/quote?pickup_zip=…` arrives with **no UTM in the URL** —
> and `QuoteForm.jsx:67` reads UTM *from the URL*. The order record stores nulls.
>
> A prior audit measured **0 of 88 `customer_orders` carrying any UTM value** and read it as
> *"consistent with no campaign having run."* That may be true, but it is not the only
> explanation available, and **a zero without its mechanism is not evidence** (CLAUDE.md
> rule 25b). Here is a mechanism: the only funnel entry point on the home page discards the
> parameters. Attribution survives **only** if the campaign links directly at `/quote` or
> `/{lang}/quote` and the visitor submits that form without passing through the widget.

One more, adjacent: `QuoteStrip.jsx:109` navigates to a hardcoded `/quote`, while
`QuoteFormCompact.jsx:63-65` builds a locale-aware `/${lang}/quote`. **A Polish visitor who
uses the quote strip is dropped onto the English `/quote`.**

---

# T06 · COPY COMPLIANCE SWEEP

**Command:** `bash docs/audits/raw/webgeo/t06_copy_sweep.sh` → `out/T06_copy_sweep.txt` (764 lines; every block prints the exact `git grep` before running it). `git grep` bounds the sweep to **tracked** files so an untracked scratch file cannot inflate a result.

## 1 · `real-time tracking` / `real time tracking` / `live tracking` / `GPS`

**ZERO hits, in every form checked.** Case-sensitive `GPS`, case-insensitive `gps`, both word-bounded; plus the Cyrillic/Polish equivalents (`ГЛОНАСС`, `отслеживание в реальном`, `відстеження в реальному`, `śledzenie w czasie rzeczywistym`). Clean.

## 2 · `Licensed & Insured` / `licensed and insured`

**ZERO hits.** The correct form is used in 27 places, including all four `certificateOfOrigin.json` bundles, `about.json:3`, `dealers.json:7`, `home.json:7,94`, `portal.json:11`, `Careers.jsx:17,78,113,130` — and `src/data/accountTypes.js:26` states the rule in a comment: *"Compliance: 'Licensed & Bonded FMCSA Broker' — never 'insured'."*

`insur` appears 230× in `src/`. Checked against the rule in `src/locales/en/`: every instance describes the **carrier** (`about.json:19` *"a verified, insured carrier"*; `:41` *"Every carrier is vetted for insurance, safety record, and operating authority"*). No claim that Y7 itself is insured.

## 3 · `Y7 AGENCY` vs `Y7 Logistics`

```
'Y7 Logistics' in src/     320 hits
'Y7 Agency'    in src/       0 hits
'y7agency'     in src/     182 hits   (the domain and email addresses — legitimate)
```

**`Y7 AGENCY` appears nowhere in `src/`.** Repo-wide its only occurrences are the CI rule itself (`.github/workflows/safety-check.yml:35-44`), the two design documents that *forbid* it (`AGENTS.md:138`, `DESIGN.md:260`), and four historical sprint reports that quote the string in order to record its absence (`DESIGN_SPRINT_1_REPORT.md:149,185`, `FULL_SITE_AUDIT.md:125,228`, `INTL_FIX_REPORT.md:19,27,190`).

**Brand in `<title>`:** every localized page title ends `| Y7 Logistics`, in all four locales — `common.json:118` (`dealersTitle`), `:124` (`aboutTitle`), `:128` (`faqTitle`), `:134` (`careersTitle`), `certificateOfOrigin.json:3`, `quote.json:146,153`. **No route renders `Y7 Agency` in a title or in visible copy.** See §T08 for why the site nevertheless fails its own brand check.

## 4 · Residual old address — `Newton` / `Chestnut` / `02464`

**`02464` and `02458`: ZERO hits in `src/`.** The ZIP is gone.
**`Chestnut` in `src/`: 2 hits, both false positives** — `NewtonAutoTransport.jsx:83,173` refer to **Chestnut Hill**, a Newton village, in service-area copy.

`Newton` splits into three populations and only the first is a defect:

### (a) IDENTITY claims — Y7 says it *is based in* Newton. **Stale.**

| file:line | text | locale |
|---|---|---|
| `src/locales/en/faq.json:6` | *"…broker (MC #1741537, USDOT #4427359) **based in Newton, Massachusetts**."* | en |
| `src/locales/pl/faq.json:10` | *"…**z siedzibą w Newton** w stanie Massachusetts."* | pl |
| `src/locales/ru/faq.json:10` | *"…**из Newton**, штат Массачусетс."* | ru |
| **`src/locales/ua/faq.json:10`** | ***"…із головним офісом у Ньютоні, штат Массачусетс."*** | **ua — CYRILLIC** |
| `src/locales/{en,pl,ru,ua}/services.json:142-143` | *"Newton, MA Auto Transport"* / *"**Our home base**"* / *"Nasza baza"* / *"Наша домашняя база"* / *"Наша домашня база"* | all 4 |
| `src/pages/intl/PolandHome.jsx:205` | *"Licencjonowany broker FMCSA **z siedzibą w Newton** (Massachusetts)."* | pl |
| `src/pages/seo/locations/MassachusettsCarShipping.jsx:16` | *"Y7 Logistics is a **Newton, Massachusetts-based** FMCSA auto transport broker…"* | en |
| `src/pages/seo/locations/MassachusettsCarShipping.jsx:111` | *"Y7 Logistics **is based in Newton**, at the I-90 / I-95 crossroads…"* | en |
| `src/pages/seo/locations/BostonCarShipping.jsx:44` | *"Same-day quote response from **our local Newton office**"* | en |
| `src/pages/seo/locations/BostonCarShipping.jsx:84` | *"**Our Newton office** sits 8 miles west of downtown…"* | en |
| `src/pages/seo/locations/NewtonAutoTransport.jsx:41` | *"Y7 Logistics **is based in Newton**, Massachusetts."* | en |
| `src/pages/seo/locations/NewtonAutoTransport.jsx:115` | *"…locally in Newton."* | en |
| `src/components/Footer.jsx:59` + `common.json:{221,225}` `footer.locationLinks.newton` | footer link labelled **"Newton, MA"** | all 4 |

> ### `src/locales/ua/faq.json:10` is the one to read twice
>
> *"…із **головним офісом** у **Ньютоні**, штат Массачусетс."* — **"with its head office in Newton"**. That is a *stronger* claim than the EN/PL/RU wording, written in Cyrillic transliteration.
>
> **Every Latin-alphabet search for `Newton` misses it.** Mine did on the first pass; the prior audits' did; and the CI address rule (`safety-check.yml:106`, which greps `6 Harding|Natick|01760`) cannot see either address in Cyrillic — in either direction. Inverting that rule, as a sibling sprint proposes, would still not catch this line.
>
> And the same locale family already carries the **correct** address in Cyrillic: `ua/common.json:48` `"Натік, Массачусетс, США"`, `:125`, `:127`; `ru/common.json:48` `"Натик, Массачусетс, США"`, `:125`, `:127`. **The site states both addresses in the same language, in the same directory, three files apart.**

### (b) SERVICE-AREA pages — legitimate, leave alone

`NewtonAutoTransport.jsx` (a whole SEO landing page for the Newton market), `BostonCarShipping.jsx` and `MassachusettsCarShipping.jsx` are geo-targeting content and the service area is real. **Only the office/HQ sentences inside them — listed in (a) — are the issue.** A broker can serve Newton without being headquartered there.

### (c) INFRASTRUCTURE — not copy, do not touch

`/newton-auto-transport` as a route: `App.jsx:238`, `prerender.mjs:517`, `generateSitemap.js:93,209`, `sitemap-lastmod.json:41`, `public/sitemap.xml:879`, `public/llms.txt:41`, `relatedGuides.js:98,103,106`, `CoverageMap.jsx:17`, `Services.jsx:45`, `seo-baseline.json:254`. Renaming the route would cost the ranking; nothing here needs to change.

## 5 · Phone numbers

* **`tel:` links on public pages: ZERO.** One exists site-wide — `src/pages/portal/OrderDetail.jsx:1268`, `tel:${order.driver_phone}` — the **carrier driver's** number, inside the authenticated portal. Not a published Y7 number.
* **Y7's historical numbers (`857-895-…`, `857-897-…`, `508-744-…`): ZERO hits repo-wide**, except the CI rule that bans them (`safety-check.yml:57-66`).
* **`"telephone"` in JSON-LD: ZERO.**
* Every US-shaped digit pattern that matches is a **555-prefixed placeholder or test fixture**: `PhoneInput.jsx:211` `(555) 234-5678`; `home.json:148` in all four locales; `CareerApplication.jsx:299`; `ConfirmQuotePanel.jsx:430`; `Onboarding.jsx:686` (the error message's example `+1 555 555 1212`); and `docs/sprints/co5w_evidence_2026-08/api_payloads.json:303` `973-555-0100`, an evidence file outside `src/`.

## 6 · `MC #` / `USDOT #` — which routes state them

Both are stated abundantly and consistently as `MC #1741537` / `USDOT #4427359`, and **`1677498` (the old MC) has ZERO hits repo-wide.**

* **Site-wide chrome (therefore every route):** `index.html:56` (JSON-LD `PropertyValue`), `:59` (a live FMCSA SAFER link), `:97`; `src/components/TrustBadges.jsx:11`; `src/components/VerificationStrip.jsx:6,19,51` — which links to the FMCSA public record, so the claim is checkable by the reader; `src/pages/portal/components/LoginCard.jsx:245`.
* **Per-locale copy, all four locales:** `about.json:37`, `dealers.json:7`, `home.json:7`, `portal.json:11`, `certificateOfOrigin.json:7,11`, `faq.json` tldr, `common.json:118,125,134` meta descriptions.
* **All nine `src/pages/intl/*` landing pages** state MC #1741537 in body copy, in the meta description, and in a stats tile.
* `agreement.json:6,116` and `agreement_dealer.json:7,35` state both in the legal text.

**Where they are not restated:** individual blog article bodies. `src/data/blogArticles.js:18,24` carries `credential: 'MC #1741537'` as byline metadata, and the site-wide `index.html` block covers the page regardless. Not a gap.

## 7 · `dispatch@y7agency.com` — the CI rule bans it, and `src/` has six

Prior sprint reports assert this is clean — `P3_FIX_REPORT.md:64`: *"Post-fix grep: 0 refs to `dispatch@y7agency` anywhere in `src/`."* **That is no longer true at `08c7565f`:**

| file:line | surface | public? |
|---|---|---|
| `src/pages/CareerApplication.jsx:115` | error text: *"…contact dispatch@y7agency.com"* | **PUBLIC — `/careers/apply`** |
| `src/pages/CareerApplication.jsx:153` | success screen `mailto:` link | **PUBLIC — `/careers/apply`** |
| `src/pages/portal/Locations.jsx:175` | *"To change these, contact dispatch@…"* | authenticated |
| `src/pages/portal/OrderDetail.jsx:1020` | `InfoRow "Send to" dispatch@…` | authenticated |
| `src/pages/portal/Profile.jsx:112` | *"contact dispatch@…"* | authenticated |
| `src/pages/portal/Profile.jsx:475` | *"contact dispatch@… to change it"* | authenticated |

`P3_FIX_REPORT.md:21` records the policy as *"dispatch@ — carrier / driver / trucking-company comms — customer-facing: **No**, internal only."* The careers form is carrier-facing, so the two public ones may be a deliberate exception. **The CI rule does not know that**, and they are one of the two things keeping the build red (§T08).

---

# T07 · CERTIFICATE OF ORIGIN CONTENT, AS IT STANDS

**Command:** `node docs/audits/raw/webgeo/t07_co_content.mjs`
**Dump:** `out/T07_co_content.md` — 1,652 lines, all four locales, every leaf key verbatim.
**Answers:** `out/T07_co_answers.txt`.

The route's visible copy lives entirely in `src/locales/<loc>/certificateOfOrigin.json`; `src/pages/seo/CertificateOfOrigin.jsx` is layout plus the request form.

## T07.2 — Title status: YES, a condition is stated, in all four locales

> **A CORRECTION TO MY OWN FIRST MEASUREMENT, recorded because the method matters more than the tidiness.** My first regex was
> `/\b(clean title|salvage|rebuilt|branded title|title status|tytu[łl]|титул|…)\b/i`
> and it returned **pl: 3 hits, en/ru/ua: 0** — which reads as *"only the Polish page states the condition."* **That is false.** All four state it, in the same three keys. The regex encoded the *shape I expected* — the words clean/salvage/rebuilt — instead of the thing being searched for: EN says *"The title type is checked"*, and RU/UA use the loanword **тайтл**, not титул. CLAUDE.md rule 29: search for the pairing, not for the mistake. The corrected regex keys on the four ineligible-type literals, which are untranslated English in every locale. Both versions and the reason are preserved in the script.

`sections.docs.eligPre` / `eligStrong` / `eligPost`, quoted:

> **en** — *"Before any documents move, we screen the vehicle itself. The VIN is decoded against the federal NHTSA vPIC database, and the plant country must be United States. The title type is checked at the same step: **bill-of-sale-only, certificate of destruction, non-repairable, and parts-only titles are not eligible**. If the vehicle fails either check, you find out here, before anything is filed or paid for."*
>
> **ru** — *"…На этом же шаге проверяется тип тайтла: **тайтлы bill-of-sale-only, certificate of destruction, non-repairable и parts-only не проходят**…"*
>
> **ua** — *"…На цьому ж кроці перевіряється тип тайтла: **тайтли bill-of-sale-only, certificate of destruction, non-repairable і parts-only не проходять**…"*
>
> **pl** — *"…Na tym samym etapie sprawdzany jest typ tytułu własności: **tytuły bill-of-sale-only, certificate of destruction, non-repairable i parts-only nie kwalifikują się**…"*

**The condition is a NEGATIVE list of four ineligible types.** The page **never uses the words clean, salvage or rebuilt**, and never says a salvage or rebuilt title *is* eligible — it is silent on exactly the three title types an auction buyer is most likely to be holding.

**Cross-reference:** TRANSPORT `services/co_screening.py` fails exactly those four (`bill_of_sale_only|cert_of_destruction|non_repairable|parts_only`) and **passes `clean|salvage|rebuilt`**. **Page and code agree.** What the page omits is not a condition — it is the reassurance, and for a salvage-export audience that silence is a conversion cost, not a compliance one.

## T07.3 — Price, turnaround, chamber, regulation

| claim | en | pl | ru | ua |
|---|---|---|---|---|
| `$99` — established Y7 exporter clients | 5 | 5 | 5 | 5 |
| `$150` — one-off, not a transport client | 6 | 6 | 6 | 6 |
| 7 business days | 4 | 4 | 4 | 4 |
| issuing chamber | 8 | 8 | 8 | 8 |
| regulation number `2026/1455` | 5 | 5 | 5 | 5 |
| regulation in-force date `1 July 2026` | 3 | 3 | 3 | 3 |
| second regulation `2026/1422` / UCC-IA art. 59a | 5 | 5 | 5 | 5 |
| duty rates 0% / 10% | 7 | 7 | 7 | 7 |

**All four are stated, in all four locales, at identical density.** The regulation is cited **with its in-force date**, and a second implementing regulation is named — unusually rigorous for marketing copy.

> **But the chamber is never NAMED.** Eight hits per locale, and every one is the generic *"the issuing chamber"* / *"the chamber"*:
>
> `sections.process.steps[1].rest` — *"As standing filing agent, we verify the eligibility checklist, prepare the certificate, and file it electronically with **the issuing chamber**."*
> `faqs[5].a` — *"…we prepare the certificate from your shipment documents and file it electronically with **the issuing chamber**."*
>
> **Which chamber of commerce issues the eCO is not stated anywhere on the page, in any locale.** For a buyer deciding whether a Y7-filed certificate will satisfy their EU customs broker, that is the one fact they need, and it is the one that is missing.

*Scope note, stated rather than assumed:* whether `$150` and "7 business days" are **deliverable** is a TRANSPORT-side question this repository cannot answer. A sibling audit measured 1 CO request all time, 0 filed, 0 issued, `CO_DEFAULT_FEE_CENTS=9900`, and no `15000` tier encoded anywhere. **Not re-measured here** — WEBGEO is scoped to Y7-WEBSITE.

## T07.4 — Every internal link into and out of the CO page

**INTO — three link sites:**

| file:line | from | label |
|---|---|---|
| `src/pages/Exporters.jsx:568` | `/exporters` | "Request a Certificate of Origin" |
| `src/pages/Exporters.jsx:570` | `/exporters` | "Certificate of Origin: pricing, eligibility, and how to request one" |
| `src/pages/Services.jsx:34` | `/services` | entry in the service link list |

*(plus the route definitions `App.jsx:266,267` and its registration as a localizable path at `localePaths.js:26`, which are not links.)*

**OUT — one in-copy link and three related-guide cards:**

| file:line | to |
|---|---|
| `src/pages/seo/CertificateOfOrigin.jsx:335` | `${prefix}/exporters` — "exporter program" |
| `src/data/relatedGuides.js:47` | `/auction-to-port-transport` |
| `src/data/relatedGuides.js:48` | `/door-to-port-auto-transport` |
| `src/data/relatedGuides.js:49` | `/nj-export-warehouse-shipping-cost` |

**NOT linked from `src/components/Header.jsx` or `src/components/Footer.jsx`** — neither the global nav nor the footer points at it, in any locale. Its entire inbound link equity is two links on `/exporters` and one on `/services`, and (per T04.3) it is **absent from `llms.txt`**.

---

# T08 · FREE FINDINGS

Encountered while measuring, outside the seven tasks. **Nothing was fixed.**

### 1. The CI address guard bans the correct address AND NEVER RUNS

`.github/workflows/safety-check.yml:101-114` bans `6 Harding` / `Natick` / `01760` — the **current** address — with the comment *"Policy flip: office address 1007 Chestnut St, Newton MA 02464 is now the canonical public-facing address"*. Executing the step's own grep verbatim at HEAD: **44 matches**, so it would fail.

**It never gets there.** `gh run view 32930457140 --log` shows the job dying at the **second** step, *"Check for old brand 'Y7 AGENCY'"* (`:35-44`):

```
OK: no 1677498 references
  echo "::error::Found old brand 'Y7 AGENCY'. Current brand is 'Y7 Logistics'…
##[error]Process completed with exit code 1.
```

That grep matches **exactly once**, in `INTL_FIX_REPORT.md` — a sprint report — and only because every rule includes `--include="*.md" --include="*.txt"`.

**Three of the six hard checks match at HEAD:**

| step | matches at HEAD | first offender |
|---|---|---|
| old MC `1677498` | 0 | — |
| **`Y7 AGENCY`** | **1** | `INTL_FIX_REPORT.md` — **the step that actually fails** |
| **`dispatch@y7agency`** | **22** | incl. live source: `CareerApplication.jsx`, `portal/Locations.jsx`, `portal/OrderDetail.jsx` |
| old Wix phone | 0 | — |
| `"telephone"` JSON-LD | 0 | — |
| **`6 Harding` / `Natick` / `01760`** | **44** | **never reached** |

`gh run list --workflow=safety-check.yml --limit 60` → **all 60 most recent runs are `failure`**, the oldest listed 2026-07-16. The guard has not passed in at least **47 days**.

**Consequence for anyone planning to invert the address rule:** it cannot be *observed passing* until the `Y7 AGENCY` and `dispatch@y7agency` steps are also resolved. A guard that has never been seen to pass is as untested as one that has never been seen to refuse.

**And the deeper defect:** all six rules scan `*.md` and `*.txt`, so **a sprint report can fail the build**. The current failure is not a public-surface problem at all.

### 2. CI never builds this site

`safety-check.yml` is the **only** workflow in `.github/workflows/`, and it runs six `grep`s — no `npm`, no `node`, no build step. A commit that breaks `npm run build` reaches `main` unopposed. The build takes 15 minutes (T01.4), which is presumably why; the consequence is that the 143-page prerender is verified by nobody.

### 3. `npm run seo:check` exists, works, and is wired to nothing

`scripts/seo-snapshot.mjs` captures each in-scope page's crawlable contract from `dist/` — title, meta description, canonical, hreflang set, the H1/H2/H3 tree in document order, every JSON-LD block, internal-link count — into `scripts/seo-baseline.json`, and `--check` exits 1 on any drift. It is a real, working SEO-regression detector, and it runs only when a human types it. Its own docstring records the choice: *"Deliberately NOT added to prebuild in this sprint — it is a guard you run, not a build step."* Documented, therefore not an oversight — but a control whose trigger is "someone remembers" is discipline, not a control.

### 4. Two Polish locale bundles carry a UTF-8 BOM

```
src/locales/pl/home.json
src/locales/pl/shipMycar.json
```
(found by `head -c3 | xxd -p` = `efbbbf` over every tracked `*.json|js|jsx|mjs|html|css`; **only these two**). Vite's JSON loader tolerates the BOM, so the site is unaffected. `JSON.parse` does **not** — my T02 script crashed on the first of them, and so will any future tooling that reads the bundles directly. The likely cause is a PowerShell `Set-Content` write, which emits a BOM by default.

### 5. `/promo` is an SPA namespace but is not disallowed in `robots.txt`

`server.js:222` lists `['/portal', '/agreement', '/promo', '/review']` as SPA namespaces. `public/robots.txt` disallows `/portal/`, `/agreement`, `/api/`, `/review/` — **`/promo` is missing**, so promo-code URLs are crawlable. Three of four is the tell.

### 6. `QuoteStrip` drops the visitor's locale

`src/components/QuoteStrip.jsx:109` navigates to a hardcoded `/quote`, while `src/components/QuoteFormCompact.jsx:63-65` builds a locale-aware `/${lang}/quote`. **A Polish visitor who uses the quote strip on `/pl` lands on the English `/quote`.** Two widgets, same page, same destination, different rule.

### 7. The nine unique intl landing pages are translations of each other with no `hreflang` linking them

Detailed in T04.4. Three matched triples, `alternates=0` on all nine in `dist/`.

### 8. Every build dirties two tracked files

`prebuild` regenerates `public/sitemap.xml` and `scripts/sitemap-lastmod.json`, whose `<lastmod>` values come from `git log -1 --format=%cs` per source file (`generateSitemap.js:49`). Running the build in a working tree therefore produces a 164-line diff of nothing but dates. The committed copies are a stale snapshot — production regenerates them at image build — but a previous sprint already had to spend a commit on this (`e692625 [STAT-W1-T03] chore: back out the sitemap churn my verification build produced`). Recorded, restored, verified byte-equal (T01.4).

### 9. `hreflang` has no `ru-RU` while `en-US`, `uk-UA` and `pl-PL` are present

`src/components/HreflangTags.jsx:29-36`. Plausibly deliberate — Russian-*language* without Russia-*country* targeting — but the file records no reason, so **intent is not established**. Flagged rather than judged.

### 10. `src/pages/seo/CertificateOfOrigin.jsx:32` documents its own dead end

```js
// CTA posts to /api/public/contact (T00 audit: no public CO endpoint exists).
```
The CO page's request form posts into the generic contact endpoint, and the file says so. Honest, and worth surfacing: the page sells a standalone $150 product and has no ordering path.

---

# WHAT PHASE 1 SHOULD KNOW

Not a plan — the brief forbids one. These are the constraints a plan would have to respect.

1. **T03 is unanswered and is the gating task.** No locale decision can be justified from anything in this report. **The cheapest unblock is a manual GSC CSV export (Performance → 90 days → Countries, then Queries per country), which the owner can do in minutes.** Everything else in the sprint is measurable; this one is not, from here.
2. **Adding a locale costs 1,759 translated keys and 17 hardcoded edits**, of which **14 are the same regex** that a single exported constant already covers. Whatever Phase 1 does about BG, the first move is collapsing those 14 onto `src/lib/localePaths.js` — otherwise the fifth locale ships with a silent hole in one of them.
3. **The machine-readability layer is in better shape than expected** — 0 routes without structured data, 0 invalid JSON-LD, 20/20 hreflang samples clean, robots.txt deliberately open to every answer engine. **The gap is `llms.txt`,** which omits the CO page, `/quote` and `/track`.
4. **Attribution is broken in a specific, fixable place**: the two home-page widgets rebuild the query string and drop inbound UTM, and `/api/public/dealer-inquiry` accepts the fields and never writes them. Until both are fixed, no campaign this sprint launches can be measured — and the existing "0 of 88 orders carry UTM" cannot be read as "no campaign has run".
5. **The address correction is not finished, and the Cyrillic line is why.** Any sweep or CI rule written in Latin characters will miss `ua/faq.json:10`.
6. **CI is red for a reason unrelated to any of this**, and has been for at least 47 days.

---

**END OF PHASE 0. No implementation was begun.**
