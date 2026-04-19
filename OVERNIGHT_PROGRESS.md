# Overnight Sprint Progress

## 2026-04-19 — Hour 0 (Start)
- Starting T01: Soft 404 fix

## Hour 1
- ✅ T01 — NotFound page + server 404 + prerender emits valid-routes.json + 404.html
  - `src/pages/NotFound.jsx` + `.module.css` with 404 badge pulse, 3 tone-tinted suggestion cards (coral/teal/amber → ship-my-car/dealers/exporters), secondary home/track/contact row, noindex meta injected to document.head.
  - `src/locales/{en,ru,pl,ua}/notFound.json` — 4 translations, registered in i18n.js.
  - `src/App.jsx` wildcard route swapped from `<Navigate to="/">` to `<NotFound />`; explicit `/404` route added.
  - `scripts/prerender.mjs` adds `/404` to PUBLIC_ROUTES, writes `dist/valid-routes.json`, copies prerendered `/404/index.html` to `dist/404.html`.
  - `server.js` loads valid-routes.json on boot; SPA fallback now distinguishes known vs unknown paths and returns HTTP 404 + 404.html for unknown paths.
- ✅ T02 — Meta titles + descriptions rewritten across en/ru/pl/ua for Dealers, Exporters, ShipMyCar (12 total keys). Keyword-intent front-loaded: "Auto Transport for Dealers — Auction Pickup & Volume Shipping", "Доставка и перевозка авто по США | Door-to-Door", etc.
- ✅ T03 — MoneyPageSchema component emits Service JSON-LD (provider backref, audience, offers, priceRange). Wired into Dealers/Exporters/ShipMyCar. Enhanced LocalBusiness in index.html with @id, logo, image, postalCode, identifier[USDOT+MC], sameAs[FMCSA SAFER + Central Dispatch], contactPoint[availableLanguage].
- ✅ T04a — ContextualCTA component with inline + card variants, tone palette (coral/teal/amber), locale-prefix-aware Link destinations. 4 locale files registered in i18n.
- ✅ T04b — Injected primaryCTA + secondaryCTA props into 26 of 29 SEO pages via codemod. Mapping per spec (auction→exporters+shipMyCar, dealer→dealers+exporters, service→shipMyCar+dealers, location→shipMyCar+dealers/exporters, etc.). 3 hand-built guides (BillOfLading, OpenVsEnclosed, HowToShipAuctionCar) don't use SeoLandingPage and are deferred to a follow-up.
- ✅ Pushed batch 1 (5 commits: T01, T02, T03, T04a, T04b).

## Hour 2
- ✅ T05 — Dealers page content depth. 5 new sections: timeline (Day 1–10), volume table (4 tiers), dealer features grid (6 items), trust signals (FMCSA SAFER link + MC + USDOT + bond), dealer FAQ (10 operational Q&A). ContextualCTA → /exporters wired between sections. All translated en/ru/pl/ua.
- ✅ T06 — Exporters page content depth. 3 new sections: export documents checklist (6 items), common destinations (8 country cards), exporter FAQ (10 Q&A). ContextualCTA → /dealers wired.
- ✅ T07 — ShipMyCar pricing tiers table + seasonal highlights. Translated prep checklist structural upgrade (backwards compatible).

## Hour 3
- T08 — Build + prerender + push batch 2 (in progress)
- Next: T09-T16 8 blog articles (Copart/IAA/Manheim, auction-to-port costs, CD listing decode, enclosed-skip, non-running playbook, winter pricing, BOL, port comparison)
- T17 — Blog index polish
- T18 — Final verification + sprint report
