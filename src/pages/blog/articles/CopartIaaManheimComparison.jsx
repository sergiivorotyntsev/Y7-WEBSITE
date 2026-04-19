import React from 'react';
import { Link } from 'react-router-dom';

export default function CopartIaaManheimComparison({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        If you are buying vehicles at US wholesale auctions — whether as a licensed dealer, a rebuilder,
        or an exporter shipping to an overseas buyer — the platform you choose shapes the entire downstream
        operation. Copart, IAA, and Manheim are not interchangeable. They source inventory differently,
        price fees differently, release vehicles differently, and answer to different kinds of seller.
        Picking the right one for a given use case saves days of wait time and hundreds of dollars in
        fees that never show up in the advertised sale price.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Copart: The Salvage Giant Everyone Already Knows
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Copart is the largest online-only vehicle auction in the United States with more than 200 yards
        and several million units sold per year. Its inventory skews heavily toward insurance total-loss
        vehicles, flood and theft-recovery cars, and end-of-lease returns that the consigning insurer
        cannot economically repair. If you are rebuilding for resale, sourcing parts, or exporting to a
        market where salvage titles are acceptable (most of Latin America, parts of West Africa, the
        Caucasus), Copart is where you will spend most of your buyer time.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Operationally, Copart is straightforward: bid online, win, pay within one business day, receive a
        gate pass by email, and dispatch a carrier. The gate-pass process is among the most reliable in
        the industry — automated after payment clears, with a clear buyer dashboard that shows the release
        status at each yard. What trips up new buyers is the <strong style={{ color: theme.accent }}>three-business-day
        free storage window</strong>. After day three, Copart charges $15–$40 per day depending on the yard
        and vehicle size. A dealer who wins ten cars on a Tuesday sale and does not dispatch carriers by
        Friday is already burning margin.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        IAA: Similar Playbook, Different Seller Relationships
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        IAA (now part of Ritchie Bros. after the 2023 merger) runs a broadly similar model to Copart —
        online-only auctions, a few hundred US yards, salvage-heavy inventory — but the seller mix is
        different. Historically, IAA has held deeper relationships with certain insurance carriers that
        consign exclusively through them. That matters for buyers specializing in particular vehicle
        profiles: late-model collision losses from those consigning insurers show up on IAA first and
        Copart second, if at all.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Gate-pass release at IAA is typically same-day once payment clears, which is faster than Copart in
        practice. Storage windows are comparable. The buyer-fee schedule differs in small but meaningful
        ways — IAA tends to charge slightly higher "internet bidding" fees but lower transportation
        facilitation fees, so the net per-vehicle cost depends on the exact sale price and whether you
        use their transport network (you should not; broker your own).
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          Copart and IAA compete for the same inventory pool but win different consignors. Serious buyers
          monitor both platforms simultaneously rather than picking one — the same make/model/year
          shows up on the one that got the consignment call, not the one you happen to be logged into.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Manheim: A Different Business Entirely
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Manheim is not a salvage auction. It is the largest dealer-to-dealer wholesale auction network in
        North America, with more than 70 physical auction facilities and a substantial online simulcast
        program. Inventory here is overwhelmingly clean-title trade-ins, off-lease returns, and
        manufacturer repurchases — cosmetically fair, mechanically sound, priced for dealer retail markups.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Access is the first wall. Manheim requires a valid dealer license to register. Rebuilders,
        private buyers, and most exporters are locked out without a dealer partner. The practical
        workflow is different too — some sales run live on the lane with a physical auctioneer, others
        run online through Manheim Market. Gate passes are less standardized than Copart; some yards
        require physical pickup coordination with auction staff rather than automated release.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        For a dealer restocking retail inventory, Manheim is the default. For an exporter sending
        late-model clean-title vehicles to Ukraine, Poland, or Germany, it is often the best source if
        they have a dealer partner or a title-flip arrangement. For a salvage buyer, it is the wrong
        platform.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Fees Nobody Explains Upfront
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every platform advertises "buyer fees" that understate the real cost. Beyond the displayed sale
        price plus the displayed buyer fee, you will pay: an internet bid fee ($25–$149 depending on
        sale price), a storage charge per day past the free window, a potential late-payment penalty,
        a gate-pass issuance fee at some facilities, and a transportation facilitation fee if you use the
        auction's in-house transport. On a $12,000 sale, total add-ons commonly run
        <strong style={{ color: theme.accent }}> $600–$1,100</strong> — about 5–9% of the hammer price.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The biggest buyer mistake is accepting the in-house transport recommendation. All three platforms
        will happily quote you carrier rates, and all three are <strong style={{ color: theme.accent }}>15–30% above
        market</strong> because the auction takes a cut. Broker your own transport through an FMCSA-licensed
        broker with Central Dispatch access and you will move the same vehicle on the same carrier at the
        real market rate. This is the single fastest way to recover several hundred dollars per load.
      </p>

      <div style={{ borderLeft: `4px solid ${theme.accent}`, padding: '16px 24px', margin: '24px 0', background: 'rgba(153,60,29,0.04)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: theme.text }}>
        A dealer running 20 auction pickups per month who broker-shops transport instead of using the
        platform's in-house service saves roughly $4,000–$7,000 per year. On a per-load basis it looks
        small. Across a full year of volume, it is a full-time employee's salary.
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Choosing by Use Case — a Decision Matrix
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Rebuilder sourcing salvage for resale.</strong> Copart first, IAA second. Monitor both.
        Bid on the same model across both platforms and take the lower all-in cost.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Exporter sending clean-title vehicles to Europe.</strong> Manheim if you have dealer
        access; Copart for damaged vehicles that will be repaired overseas; IAA for specialty consignments.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Exporter sending salvage to West Africa or the Caribbean.</strong> Copart is the primary
        source — the inventory profile matches the destination demand. IAA as a secondary channel.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Franchise dealer restocking used inventory.</strong> Manheim first — the condition
        standards match retail expectations and the title work is straightforward.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Independent dealer flipping mid-range inventory.</strong> Manheim for clean-title
        stock; Copart for dented trade-ins that can be cleaned up for the sublet retail market.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        How a Broker Handles Multi-Auction Loads
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The real volume buyers rarely win a full load at a single auction. A typical Tuesday for an
        active dealer might be three Copart wins in Pennsylvania, two IAA wins in New Jersey, and a
        Manheim pickup in Harrisburg. All six need to be on your lot by Friday. Coordinating six gate
        passes, six payment confirmations, six pickup windows, and route-optimized consolidated transport
        is exactly where a broker earns their fee.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        At Y7 we pull all six auctions into a single dispatch workflow. Copart and IAA gate passes are
        pulled via email automation the moment payment clears. Manheim pickups are scheduled with the
        yard directly. Carriers are assigned by geographic cluster rather than by auction, so you pay
        for one 6-vehicle load instead of three 2-vehicle loads. See <Link to="/dealers" style={{ color: theme.accent, fontWeight: 600 }}>
        the dealer program details</Link> for how volume accounts get custom rate cards built around this
        exact workflow, or review <Link to="/exporters" style={{ color: theme.accent, fontWeight: 600 }}>
        our exporter services</Link> if the end destination is a US port.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The platform decision matters, but the operational discipline around dispatch matters more.
        A dealer paying market transport rates, avoiding storage fees through fast pickup, and buying
        from the platform that actually has the inventory they need will outperform a competitor with
        better-looking wins but sloppy logistics — every month, on every load.
      </p>
    </article>
  );
}
