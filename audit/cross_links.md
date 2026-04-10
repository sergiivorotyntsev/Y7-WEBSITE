# Cross-Link Audit — Task C Findings

**Date:** 2026-04-10

---

## Broken Links
**None found.** All `<Link to="">` targets match routes defined in App.jsx.

## Cross-Language Inconsistencies

### Fixed
- **RussiaCopart.jsx:315** — Breadcrumb "Главная" linked to `/` (EN home). Changed to link to `/ru` with label "Y7 Logistics" to differentiate from the "Русский" breadcrumb item that also links to `/ru`.

### By Design (Not Bugs)
- **Header.jsx** nav links always point to EN routes (`/services`, `/faq`, etc.). This is intentional — the LanguageSwitcher handles URL-based routing for pages with language variants. Pages without `/:lang/` routes correctly stay on EN URLs when language is switched.
- **Footer.jsx** service/guide/port/route links point to EN-only SEO pages. These pages don't have PL/UA/RU variants. Footer section headings and link text DO translate via i18n.

## Orphan Pages (No Inbound Internal Links)

### Location/SEO pages — no Footer or cross-links
These pages exist in App.jsx and are prerendered but have no internal links from other pages:
- `/boston-car-shipping`
- `/newton-auto-transport`
- `/florida-car-shipping`
- `/new-jersey-auto-transport`
- `/texas-auto-transport`
- `/massachusetts-car-shipping`
- `/cybertruck-shipping`
- `/electric-vehicle-port-delivery`
- `/iaai-transport`
- `/manheim-transport`
- `/open-car-shipping`
- `/salvage-car-shipping`

**Note:** Some of these may be linked via the RelatedGuides component (22-route matrix from Sprint B). To fully resolve, these should be added to Footer or to a sitemap page.

### Intentional (portal/programmatic)
- `/quote`, `/agreement`, `/dealer-quote` — reached via `navigate()` calls
- `/portal/*` routes — reached via login flow
- `/pl`, `/ua`, `/ru` — reached via LanguageSwitcher
