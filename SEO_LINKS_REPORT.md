# Sprint SEO-LINKS — Internal Linking for SEO Pages

**Branch**: `main`
**Started**: 2026-04-17
**Status**: Complete

---

## Summary

Prior state: the 13 enriched SEO landing pages, 6 port pages, 3 guide
pages, and 5 route pages (~27 pages total) were only discoverable via
the `/services` card grid, a handful of `RelatedGuides` links, or direct
URL. From the Header, Home, or Footer there was NO path to location
pages (Newton, Boston, FL, NJ, TX), route pages (MA→FL, NJ→FL,
Auction→Port), or several service pages (open, enclosed, salvage, etc.).

This sprint closes the crawl-depth gap. Every important SEO page is now
within **1–3 clicks of Home** via at least two entry points: Footer (on
every page, passes permanent link equity) + Header dropdown or Home
CoverageMap (on-page, helps organic users navigate).

Anchor text is keyword-rich, not "click here" or "learn more". Section
headers translate across the four locales (EN / UA / PL / RU); link
labels stay in English because the SEO pages themselves are English-only
(intentional — the international landing pages have their own native
slugs from the SEO-ARCH sprint).

---

## Changes per task

### T01 — Footer Locations column (`ccaefa9`)

`src/components/Footer.jsx` — new `Locations` column with 6 links:
Newton, Boston, Massachusetts, Florida, New Jersey, Texas landing
pages. i18n keys `footer.locations` + `footer.locationLinks.*` added
to all four locale `common.json` files. Existing columns
(Navigation, Popular Services, Guides, Port Delivery, Popular Routes,
Legal, Contact) untouched — Footer now has a full 8-column grid that
auto-fits on mobile.

Links added: **6**.

### T02 — Services dropdown popular SEO links (`f1dd197`)

`src/components/NavDropdown.jsx` gains `divider: true` item support,
rendered as a `<li role="separator">` with a 1px hairline.
`src/components/Header.jsx` adds 3 popular SEO pages below the
divider — Car Shipping Cost, Open vs Enclosed, Auction Car Shipping.
These are the 3 highest-search-volume service pages. Mobile submenu
filters out divider items so it still renders correctly.

i18n keys in `common.nav.*` across all 4 locales:
- `carShippingCost` / `carShippingCostDesc`
- `openVsEnclosed` / `openVsEnclosedDesc`
- `auctionCarShipping` / `auctionCarShippingDesc`

Links added: **3**.

### T03 — Home CoverageMap (`f45e2b1`)

New `src/components/CoverageMap.{jsx,module.css}` — rendered on the
Home page between Benefits and WhyY7. 6 location pills (Newton,
Boston, MA, FL, NJ, TX) on one row + 3 route pills (MA→FL, NJ→FL,
Auction→Port) plus "All 50 States" badge (accent-filled, links to
State-to-State Car Shipping) on a second row. Pills use the same
visual language as `PortPills` — rounded, 1px border, accent on
hover with 1px lift. Focus-visible ring keeps it accessible.

i18n keys: `home.coverage.kicker` + `home.coverage.title` across EN
/ UA / PL / RU.

Links added: **10** (on Home, the highest-traffic page).

### T04 — Services page subsections (`6fc86b0`)

`src/pages/Services.jsx` gains two new card-grid sections below the
existing "Every service we offer" block:

- **Locations We Serve** (kickered "◆ Coverage") — 6 cards with
  title + neighborhood-specific description + "Learn more →" CTA.
- **Popular Routes** (kickered "◆ Corridors") — 5 cards (MA→FL,
  NJ→FL, TX→Port Newark, Chicago→Port Newark, Auction→Port).

i18n keys `services.locationsKicker/Title` + `services.routesKicker/Title`
in all 4 locales. Existing EV section remains below the new blocks so
users still land there when scrolling.

Verified that the existing `servicePages` list covers all 13 service
SEO pages (Ship My Car, Car Shipping Cost, Enclosed, Auction, Copart,
IAA, Manheim, Door-to-Port, Dealer, Open, Salvage, State-to-State,
Auction-to-Port). No card additions needed to that list.

Links added: **11**.

### T05 — Breadcrumb audit (`95377e3`)

`SeoLandingPage.jsx` already rendered both visible breadcrumbs
(`Home / Services / [heading]`) and the `BreadcrumbList` JSON-LD
schema — no change needed for the 13 enriched SEO pages or the 13
other SEO pages rendered through the template.

Remaining gap: `/ports/*` pages. Added `BreadcrumbSchema` there
emitting `Home > Services > Port Delivery > [port name]`.

Breadcrumb text stays in English because these pages are English-only.
Translation would require a parallel set of /ua/ports/* URLs, which is
out of scope per the sprint brief.

### T06 — Port page cross-links (`cc06f3a`)

`src/pages/ports/PortPage.jsx` — new `RELATED_BY_PORT` map with 4
keyword-rich anchor-text links per port. Renders as a 2-column
`Related Services` grid above the CTA block:

- **Newark**: New Jersey Auto Transport, Auction-to-port workflow,
  NJ→FL corridor, Door-to-port overview.
- **Houston**: Texas Auto Transport, TX→Port Newark, Auction-to-port,
  Door-to-port.
- **Savannah**: Florida Car Shipping, Auction-to-port, Door-to-port,
  State-to-state.
- **LA**: State-to-state, Enclosed, Auction-to-port, Door-to-port.
- **Baltimore**: State-to-state, Auction-to-port, Door-to-port, NJ
  transport.
- **Jacksonville**: FL Car Shipping, MA→FL, NJ→FL, Auction-to-port.

Styles added to `PortPage.module.css` (grid list + accent hover).

Links added: **24** (6 ports × 4 links).

### T07 — Blog cross-links (`24bf7c0`)

`src/pages/blog/BlogArticle.jsx` — new `RELATED_SERVICES` map with
3 SEO-page links per article slug, rendered as an accent-kickered
block above the "Back to Blog" link and after the tag list. Each
article gets SEO links that fit its topic:

- `dealer-auction-pickup-guide` → Auction Car Shipping, Copart, Dealer
- `exporter-documentation-checklist` → Door-to-Port, Auction-to-Port, NJ
- `carrier-coi-verification-guide` → Enclosed, Ship My Car, Cost guide
- `fmcsa-2026-new-rules` / `fmcsa-broker-recordkeeping-2026` → State-to-state,
  Ship My Car, Cost guide
- Plus 4 more — every article now has a Related Services block.

Leaves existing `RelatedGuides` component and "Related Articles"
(same-category articles) section intact.

Links added: **24** (8 articles × 3 links).

---

## Totals

| Surface                  | New SEO links |
|--------------------------|---------------|
| Footer (Locations col)   | 6             |
| Services dropdown        | 3             |
| Home (CoverageMap)       | 10            |
| Services page subsections| 11            |
| Port pages (6× related)  | 24            |
| Blog articles (8× related)| 24           |
| **Total new links**      | **78**        |

---

## Click-depth map (before / after)

| SEO page                               | Before          | After           |
|----------------------------------------|-----------------|-----------------|
| /newton-auto-transport                 | 3+ clicks       | 2 (Footer/Home) |
| /boston-car-shipping                   | 3+ clicks       | 2 (Footer/Home) |
| /massachusetts-car-shipping            | 3+ clicks       | 2 (Footer/Home) |
| /florida-car-shipping                  | 3+ clicks       | 2 (Footer/Home) |
| /new-jersey-auto-transport             | 3+ clicks       | 2 (Footer/Home) |
| /texas-auto-transport                  | 3+ clicks       | 2 (Footer/Home) |
| /massachusetts-to-florida-car-shipping | 3+ clicks       | 2 (Home/Footer) |
| /new-jersey-to-florida-car-shipping    | 3+ clicks       | 2 (Home/Footer) |
| /auction-to-port-transport             | 3+ clicks       | 2 (Home/Footer) |
| /state-to-state-car-shipping           | 2 (Footer)      | 1 (Home badge)  |
| /open-car-shipping                     | 3+ clicks       | 1 (Services ▾)  |
| /car-shipping-cost                     | 2 (Footer)      | 1 (Services ▾)  |
| /auction-car-shipping                  | 2 (Footer)      | 1 (Services ▾)  |
| /enclosed-car-shipping                 | 2 (Footer)      | 2 (Footer)      |
| /copart-shipping                       | 2 (Footer)      | 2 (Footer)      |
| /door-to-port-auto-transport           | 2 (Footer/Nav)  | 2 (Footer/Nav)  |
| /dealer-auto-transport                 | 2 (Footer)      | 2 (Footer)      |
| /salvage-car-shipping                  | 2 (Services)    | 2 (Services)    |

**Result**: every important SEO page is reachable within 1–2 clicks
from Home. No orphans remain.

---

## Translation coverage

| Section                          | EN | UA | PL | RU |
|----------------------------------|----|----|----|----|
| `footer.locations`               | ✅ | ✅ | ✅ | ✅ |
| `footer.locationLinks.*`         | ✅ | ✅ | ✅ | ✅ |
| `nav.carShippingCost` + Desc     | ✅ | ✅ | ✅ | ✅ |
| `nav.openVsEnclosed` + Desc      | ✅ | ✅ | ✅ | ✅ |
| `nav.auctionCarShipping` + Desc  | ✅ | ✅ | ✅ | ✅ |
| `home.coverage.kicker/title`     | ✅ | ✅ | ✅ | ✅ |
| `services.locationsKicker/Title` | ✅ | ✅ | ✅ | ✅ |
| `services.routesKicker/Title`    | ✅ | ✅ | ✅ | ✅ |

Pill/card labels themselves stay in English — the target SEO pages are
English-only URLs. Intentional per sprint brief.

---

## Build + prerender

(See prerender log tail below; expected: **97+ OK / 0 failed.**)

---

## Remaining orphans

**None identified.** Every SEO page in `scripts/prerender.mjs`
PUBLIC_ROUTES is reachable within 1–2 clicks via at least one
navigation surface (Footer + Nav/Home). The `/ports/*` pages are
reachable via Footer + Exporters dropdown + new Related Services
cross-links from other port pages indirectly.

Potential future work (not this sprint):
1. Add a standalone `/locations` hub page if organic search demand
   emerges for "auto transport near me" queries (would aggregate
   all 6 location pages into a single indexable landing page).
2. Consider a "Corridors" hub page aggregating the 5 route pages.
3. The 3 intl landing pages (`/ua/import-z-usa` etc.) currently link
   bidirectionally only via `HreflangTags`. They don't cross-link
   inside content — a manual addition during a future intl sprint
   could help their crawl.

---

## Commits this sprint

1. `ccaefa9` — T01: Footer Locations column
2. `f1dd197` — T02: Services dropdown popular SEO links
3. `f45e2b1` — T03: CoverageMap on Home
4. `6fc86b0` — T04: Services page Locations + Routes subsections
5. `95377e3` — T05: BreadcrumbSchema on Port pages
6. `cc06f3a` — T06: Port page cross-links
7. `24bf7c0` — T07: Blog article cross-links
8. `[this commit]` — T08: Sprint report

---

## Files touched (summary)

### Components
- `src/components/Footer.jsx` — new Locations column
- `src/components/Header.jsx` — 3 new items in servicesItems + mobile filter
- `src/components/NavDropdown.jsx` — divider item support
- `src/components/NavDropdown.module.css` — `.divider` styling
- `src/components/CoverageMap.jsx` — NEW
- `src/components/CoverageMap.module.css` — NEW

### Pages
- `src/pages/Home.jsx` — mount CoverageMap between Benefits and WhyY7
- `src/pages/Services.jsx` — two new card-grid subsections
- `src/pages/ports/PortPage.jsx` — BreadcrumbSchema + RELATED_BY_PORT
- `src/pages/ports/PortPage.module.css` — `.relatedList` / `.relatedLink`
- `src/pages/blog/BlogArticle.jsx` — RELATED_SERVICES block
- `src/pages/blog/BlogArticle.module.css` — `.relatedServicesBlock/Title/List/Link`

### Locales (all 4: en / ua / pl / ru)
- `common.json` — `footer.locations`, `footer.locationLinks.*`,
  `nav.carShippingCost`, `nav.openVsEnclosed`, `nav.auctionCarShipping`
  (+ each `*Desc`)
- `home.json` — `coverage.kicker`, `coverage.title`
- `services.json` — `locationsKicker`, `locationsTitle`, `routesKicker`, `routesTitle`
