# PHASE5B-HOME — Home Redesign (Premium Green Language) + False-Claim Fixes — Report

**Date:** 2026-06-21
**Repo:** Y7-WEBSITE. **Status:** Built + verified on the live local stack. **Committed local, HELD — not pushed.**
**Commits:** T02 `a8e69e2` · T03a `fb74229` · T03b `c534cc7` · T03c `49ec893` · T03d `b01b92d` · T04 (docs, this).

## Goal
Raise the whole Home page to the bait-quote magnet's premium bar — **augment-only** (same
copy, H-tags, links, schema, section order; visual layer only) — and fix three false broker
claims in the same pass. Direction **A** (light-base elevation + selective dark spotlight),
**Variant 2** (green leads the non-hero sections; hero keeps rust as the brand anchor).

## The system shipped
- **Foundation (T02):** derived tokens (`--shadow-card/-hover`, `--success-glow`, reveal
  timing); an **SSR-safe `Reveal`** primitive (visible-by-default, CSS entrance on scroll-in,
  reduced-motion static); shared `premium.module.css` primitives.
- **Two dark green `.spotlight` bands** bookend the page — the **stats bar** and the **final
  quote CTA** — echoing the magnet.
- **Green leads the light sections:** persistent green card top-bars, solid green icon chips,
  green tags / links / kickers, green hovers; mono figures on the stats.
- **Hero stays rust** (brand anchor) — CTA elevated to the magnet's *style* (rust gradient +
  glow + hover-lift), entrance via `Reveal`.

| Group | Commit | Sections |
|---|---|---|
| A | `fb74229` | Hero (rust gradient CTA + Reveal) · Stats → green spotlight + mono |
| B | `c534cc7` | Who-We-Serve (tri-tone → `--success`, persistent top-bar, green chips/CTA) · Benefits (green chips/kicker/hover) |
| C | `49ec893` | Coverage (green links/pills) · WhyY7 (green chips/hover) · Protection accordion (green) |
| D | `b01b92d` | Quote section → 2nd green spotlight · Testimonials/Ports/Verification → green · non-hero ◆ kickers → green |

## T04 verification (live local stack)
- **Render pass (screenshots):** the page reads as ONE premium green language — rust hero →
  green stats spotlight → green magnet → green sections → green final-CTA spotlight. Cards have
  persistent green top-bars + solid green icon chips + green CTA links; mobile (~380px) stacks
  to one column cleanly. Files: `tmp/phase5b_groupA_hero.png`, `..._stats.png`,
  `phase5b_desktop_whoweserve.png`, `phase5b_desktop_quote_spotlight.png`,
  `phase5b_mobile_cards.png`.
- **Content/SEO integrity (prerendered `dist/index.html`):** ALL original section copy present
  (hero, every audience card, Benefits, WhyY7, protection, quote, ports, stat labels — 1× each);
  augmentation dropped/hid nothing.
- **False claims GONE:** "real-time tracking" 0, "insured carrier" 0; corrected wording present
  ("shipment status updates" in meta + og:description; "vetted carriers" in the hero).
- **Prerender 116 OK / 0 failed**; **no console errors** on Home; `prefers-reduced-motion`
  respected (Reveal + spotlight animations gated).

## Augment-only confirmation
Every change was a **color/token swap or a presentational wrapper** (Reveal around heroText).
No copy, headings, links, or schema were modified — except the three mandated false-claim text
fixes (`meta.homeDescription`, `hero.description`, `carrierDesc`).

## Deploy (on approval — Y7-WEBSITE only)
Push → Railway prerender (~10–12 min). **"push success" ≠ live** — after the prerender
completes, confirm on `www.y7agency.com` that (a) the redesigned green Home renders and (b) the
false claims are gone (`view-source` has "shipment status updates", no "real-time tracking").

## Deferred (later sprint)
Other pages get the premium language separately; ScrollReveal→Reveal swap on existing wrappers
(current ScrollReveal keeps content in the DOM/greppable, so prerender + SEO already hold).
