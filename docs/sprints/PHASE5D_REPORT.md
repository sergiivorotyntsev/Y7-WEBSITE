# PHASE5D — Widget honest-ladder + global dark header + hover variant D — Report

**Date:** 2026-06-21
**Repo:** Y7-WEBSITE. **Status:** Built + verified on the live local stack. **Committed local, HELD — not pushed.**
**Commits:** `73da5ab` T02(a) widget three-tier ladder · `c7e6d69` T02(b) global dark-green header ·
`0fceb2d` T02(c) hover variant D (+ chat rust no-op) · `4726687` T02(b-fix) light AnimatedLogo on dark
header · T03 docs (this).

## Goal
After 5C (rust↔green blend), 5D makes four locked changes: (1) replace the BaitQuote widget's
fake "broker comparison + you-save" math with an honest three-tier ladder; (2) make the global
header a dark-green spotlight bar (chrome only); (3) replace the 5C rust→green CTA fill-flip with
variant D (rust stays, a green underline sweeps in on hover); (4) chat launcher — recolor or keep.
All CSS/presentational + widget JSX; no global-token changes; GET A QUOTE stays rust.

## What shipped (4 groups)
1. **BaitQuote → three-tier honest pricing** (`BaitQuote.jsx` + `.module.css`):
   removed the "Typical broker" comparison card, the "You save $X+" badge, the "+$X (N%) baked in"
   line and all underlying math (`brokerExtra/brokerTotal/savings/pct/animBroker`). The Y7 itemized
   card is now **full-width**. Added a compact **"Other ways to ship the same car — typically"** block
   with two ascending `~$range` rows — **Another broker** ("one bundled price — the markup is hidden
   inside it") and **Ordering through the auction** ("the auction's transport desk adds the most").
   Competitor ranges are `yourMid + BROKER_PREMIUM/AUCTION_PREMIUM` (named constants **115 / 175**),
   ±$25 rounded to $25, shown **only as ranges — never a formula or percentage**. Disclaimer reworded
   to broker/auction bundling. Removed unused `TrendingDown`/`EyeOff` inline icons.
2. **Global dark-green header** (`Header`/`NavDropdown`/`LanguageSwitcher` modules):
   white → `--spotlight-bg` bar; light logo with `--success-bright` dot; light nav links with green
   active state + underline; legible lang pills; **LOG IN** light outline; **GET A QUOTE stays rust**.
   The shared `AnimatedLogo` reads `--color-text`/`--color-accent`; we override those **on `.header`**
   so the wordmark goes light by inheritance (Footer logo keeps its defaults). NavDropdown **panels**
   and **items deliberately stay light** (only the trigger row goes light-on-dark). Component modules
   only — global tokens untouched, so other pages' bodies are unaffected.
3. **Button hover variant D** (`Home .heroCtaPrimary`, `QuoteFormCompact .submit`,
   `Header .headerCta/.mobileCta`): button stays rust; on hover a `--success-bright` underline
   animates in (left→right `scaleX(0)→(1)`, 3px) + lift. Kept the 5C slogan rust→green shimmer and
   the card-title black→rust gradient. **Shared `btnAccent` untouched** (no leak).
4. **Chat widget** (`ChatWidget`): identified as our own component (not Tawk/Crisp/Intercom);
   launcher already uses `--accent` (rust) → **kept rust** per decision (group (d) is a no-op).

Decisions: hero CTA stays rust · constants 115/175 · chat launcher rust · dropdown panels stay light.

## T03 verification (live local stack)
- **Header (dark):** computed `rgb(8,24,19)` on Home, **/services, /track, /copart-international-shipping**;
  light AnimatedLogo wordmark + green dot; light nav, "Home" active green w/ underline; EN/PL/UA/RU
  pills (EN green-active); **LOG IN** light outline; **GET A QUOTE rust** everywhere.
  (Note: a thin dark header strip looks washed-out in downscaled full-page thumbnails — verified via
  computed style + a short-viewport capture where it reads correctly dark.)
- **Widget ladder (ascending, ranges only):**
  Dallas→Newark (~1,608 mi): Y7 **$700–$825** < broker **~$850–$900** < auction **~$925–$975**.
  Newark→Boston (~232 mi): Y7 **$350–$400** < broker **~$475–$525** < auction **~$525–$575**.
  Seattle→Miami (~3,223 mi): Y7 **$975–$1,125** < broker **~$1,150–$1,200** < auction **~$1,200–$1,250**.
  No "you save", no "baked in", **no percentage in the pricing**; Y7 card full-width; broker
  comparison card gone.
- **Hover variant D:** GET A QUOTE on hover → button stays rust (`#7A3017`), `:after` =
  `--success-bright #54E0B0` at `scaleX(1)`, 3px. Confirmed in bundle for `headerCta`/`mobileCta`,
  `heroCtaPrimary` (intl chunk), `submit` (index chunk).
- **5C preserved:** slogan "You move forward." still has the gradient + `heroSloganSweep` animation;
  card title "Ship My Car" still rust gradient (`background-clip:text`).
- **Mobile ~380px:** dark header fits (no overflow); hero + full-width rust CTA; widget stacks; the
  **mobile menu** opens as a dark overlay with light/green links, rust GET A QUOTE, EN pill + LOG IN.
- **Chat:** launcher rust on every checked page.
- **Integrity:** **prerender 116/0**; prerendered `dist/index.html` retains all SEO body copy
  (Licensed FMCSA broker, Transport for Every Buyer, Your Complete Transport Solution, Why Shippers
  Choose Y7, Major Port Coverage, USDOT #4427359) and the new widget copy; old fake-math copy gone
  ("You save"/"baked in"/"Typical broker" = 0); **no `btnAccent:after` leak** in any CSS chunk;
  dark-header rule + `--color-text/--color-accent` override present in the bundle; **no console errors**.
Screenshots: `phase5d_header_short_vp.png`, `phase5d_widget.png`, `phase5d_btn_hover.png`,
`phase5d_mobile_top.png`, `phase5d_mobile_menu.png`.

## Deploy (on approval — Y7-WEBSITE only)
Push → Railway prerender (~10–12 min). **"push success" ≠ live** — after it completes, confirm on
www.y7agency.com: the header is dark-green with a light logo and rust GET A QUOTE; the widget shows
the three-tier honest ladder (Y7 itemized full-width, two ascending approximate rows, no save/%/
baked-in); the rust CTAs grow a green underline on hover; the chat launcher is rust.
