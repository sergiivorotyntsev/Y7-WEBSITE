import React from 'react';
import { Link } from 'react-router-dom';

export default function AuctionToPortCostBreakdown2026({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Shipping a vehicle from a US auction to a US export port is the most complex piece of the
        auction-to-overseas supply chain — and the one where new exporters underestimate costs the most.
        The hammer price is never the real price. Between the auction lot and the vessel, a vehicle
        accumulates fees in four distinct cost buckets, plus hidden charges that have quietly grown
        through 2025 and into 2026. This is the real math on a representative mid-range export flip
        today.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Four Cost Buckets
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every exported vehicle accumulates cost in four buckets: (1) auction fees — buyer premium,
        internet bid, gate pass, storage; (2) domestic transport — auction to port warehouse;
        (3) port handling — warehouse drop, daily storage, loading; (4) ocean freight — booking, vessel,
        destination handling. This article covers buckets one through three. Bucket four is your freight
        forwarder's domain and varies wildly by destination.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Auction Transport Pricing by Distance to Port
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The single biggest variable in the domestic leg is distance from the winning auction yard to your
        chosen port. A rough 2026 pricing table for open-trailer auction-to-port transport on a standard
        sedan or SUV:
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Same metro (under 50 miles):</strong> $200–$400 flat. Dallas IAA → Port Houston,
        Chicago IAA → Port Newark hub transfer, Somerville Copart → Port Newark.<br />
        <strong>Short hop (50–300 miles):</strong> $350–$650. Atlanta Copart → Port Savannah,
        Philadelphia IAA → Port Newark, Dallas Copart → Port Houston.<br />
        <strong>Mid-range (300–1,000 miles):</strong> $550–$1,000. Chicago Copart → Port Newark,
        Nashville IAA → Port Savannah, Memphis Copart → Port Houston.<br />
        <strong>Cross-country (1,000+ miles):</strong> $900–$1,600. West Coast Copart → Port Newark,
        Southern California IAA → Port Houston.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Enclosed transport — rare for export flips but occasionally needed for high-value collector
        vehicles — runs 40–60% higher. Non-running vehicles add $100–$300. These are open-market
        broker-shopped rates, not auction-arranged rates, which run 15–30% higher.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Gate Pass Fees and How to Avoid Them
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Most Copart and IAA yards issue gate passes free after payment clears, but a handful charge
        gate pass issuance fees ranging from <strong style={{ color: theme.accent }}>$10 to $75</strong>
        per vehicle. Manheim practices vary by facility — some charge nothing, some charge a manual
        release fee if the yard staff has to physically walk the vehicle to the exit.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The real gate-pass cost is not the fee — it is the dry run. A driver arrives at the yard, the
        gate pass has not been issued (payment hasn't cleared on the auction's side, or the pass didn't
        generate, or there is a paperwork mismatch), and the driver leaves empty. That is a
        <strong style={{ color: theme.accent }}> $100–$250 dry run fee</strong> plus 2–5 extra days of
        storage while you sort it out. On a tight export schedule tied to a vessel sailing, a single dry
        run can push the whole load to the next sailing.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Storage Fees at Auctions
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Copart: typically 3 business days of free storage after payment clears, then $15–$40 per day
        depending on yard and vehicle size. IAA: similar window, similar rates. Manheim: varies widely
        by facility and seller agreement; some yards offer 7 days of free storage, others only 48 hours.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        An exporter who wins a car on Tuesday and does not dispatch a carrier until the following
        Monday is paying for 4 extra storage days — roughly $80–$160 on a single vehicle. Scale to
        volume and storage quietly eats margin that nobody ever reviews.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Port Warehouse Charges
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every major US export port has a network of bonded warehouses where vehicles are dropped,
        inspected, and staged for vessel loading. Warehouse charges include:
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Drop-off fee:</strong> $50–$125 per vehicle, covering the inspection, condition report,
        and intake paperwork.<br />
        <strong>Daily storage after the free window:</strong> $8–$25 per day. Most warehouses offer
        5–7 free days inclusive of the drop-off day.<br />
        <strong>Loading/handling:</strong> $75–$200 per vehicle when it moves from storage to the
        vessel. Paid at booking time by your forwarder, not at drop.<br />
        <strong>Repositioning:</strong> $50–$150 if the vehicle has to be moved within the warehouse
        yard for any reason.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          Time drop-off to the vessel window. Arriving 7 days before sailing instead of 3 days
          before sailing costs you 4 extra storage days — roughly $40–$100 per vehicle. At 20
          vehicles per month that's $10,000–$24,000 per year in avoidable cost.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Hidden Costs That Blow Budgets
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Five line items routinely surprise new exporters:
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>(1) Reweigh fees.</strong> If a port warehouse suspects the original auction weight was
        off (common on damage-heavy vehicles), they charge $50–$125 to reweigh before loading.<br />
        <strong>(2) Condition dispute escalation.</strong> If the warehouse finds damage the driver did
        not note on the BOL, you are arguing with the carrier's insurance while the vehicle sits. Allow
        $200–$500 in holding costs per disputed load.<br />
        <strong>(3) Title delays.</strong> If the title has not arrived from the auction by the time the
        vessel is loading, the ocean carrier cannot export the vehicle. Roll to next sailing = 10–21 more
        days of storage.<br />
        <strong>(4) Cancellation charges.</strong> If you cancel a dispatched carrier within 24 hours
        of pickup, expect a $100–$200 fee.<br />
        <strong>(5) Fuel adjustments.</strong> A handful of carriers add a line-item fuel surcharge ($25–$50)
        on long routes. Always ask about fuel adjustments at quote time.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Case Study: 2015 BMW X5 from Chicago IAA to Port Newark to Ukraine
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Hammer price $11,500. Auction fees (buyer premium + internet + gate pass): $1,050. Storage:
        2 days past free window = $60. Open-trailer transport Chicago → Port Newark (roughly 780 miles):
        $725. Port Newark warehouse drop + 4 days storage: $145 + $40 = $185. Subtotal landed at port,
        ready for forwarder: <strong style={{ color: theme.accent }}>$13,520</strong>.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The same vehicle booked through the auction's in-house transport instead of a brokered carrier
        would have been roughly $950 for the transport leg instead of $725 — pushing subtotal to
        $13,745. A single load's difference of $225 looks small. Scale to 10 vehicles per month and the
        broker-shop discipline saves $27,000 per year. That is the difference between a thin-margin
        export operation and a healthy one.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        How to Budget Correctly
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Build every deal on a worksheet with all four cost buckets visible. Pad each line item 10–15%
        for the unexpected. Track dispatched-within-48-hours rate as an operational KPI — that single
        metric correlates more strongly with margin preservation than any other. See <Link to="/exporters" style={{ color: theme.accent, fontWeight: 600 }}>
        the Y7 exporter services page</Link> for the full gate-pass + warehouse-drop workflow we run on
        behalf of export clients, or the <Link to="/auction-to-port-transport" style={{ color: theme.accent, fontWeight: 600 }}>
        auction-to-port page</Link> for route-specific pricing detail. The <Link to="/auction-transport-savings" style={{ color: theme.accent, fontWeight: 600 }}>
        auction transport savings breakdown</Link> shows where each of those buckets can be trimmed. For
        EU-bound vehicles, one more line belongs on the worksheet: a <Link to="/certificate-of-origin" style={{ color: theme.accent, fontWeight: 600 }}>
        Certificate of Origin</Link> ($99 to $150) is what qualifies a US-built car for 0% import duty,
        which outweighs every transport item above.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Export is a pennies business — margin is made by avoiding unnecessary fees, not by winning
        the lowest hammer price. Every exporter who survives long enough in this market understands the
        four cost buckets cold, and disciplines the team around getting vehicles dispatched, transported,
        and dropped at port faster than the storage clock can bleed them.
      </p>
    </article>
  );
}
