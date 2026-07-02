import React from 'react';
import { Link } from 'react-router-dom';

export default function CopartInternationalBuyersGuide({ theme }) {
  const p = { marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text };
  const h2 = { fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' };
  const link = { color: theme.accent, fontWeight: 600, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}` };

  return (
    <article>
      <p style={p}>
        International buyers dominate a meaningful share of Copart traffic. Salvage vehicles
        that are uneconomical to rebuild at US labor rates become profitable rebuilds in
        Ukraine, Poland, Georgia, Nigeria, and throughout the Caribbean and Latin America.
        The auction is only the first step in a 6-11 week end-to-end journey — this is the
        operational playbook for how that journey actually works.
      </p>

      <h2 style={h2}>Why Copart is #1 for international buyers</h2>

      <p style={p}>
        Three structural reasons international buyers target Copart specifically:
      </p>
      <ul style={p}>
        <li><strong>Rebuilder economics.</strong> A lightly damaged 2019 sedan with a $4,000
          repair cost at US body-shop labor rates becomes a $1,200 repair at Ukrainian or
          Polish labor rates. That spread pays for the entire shipping chain.</li>
        <li><strong>Volume and diversity.</strong> 200+ yards, thousands of vehicles daily,
          every make and model from economy to exotic.</li>
        <li><strong>Export-friendly paperwork.</strong> Copart&apos;s buyer system is designed
          with remote bidders in mind. Gate passes are digital, buyer numbers work from
          anywhere, and consolidation warehouses near every major port are well-integrated
          with Copart flow.</li>
      </ul>

      <h2 style={h2}>The 7-step journey from auction win to destination port</h2>

      <ol style={p}>
        <li><strong>Auction win and payment.</strong> Wire the invoice the same day ideally.
          Wire clears in 1-2 business days; CashierPay and cashier&apos;s checks take 2-3.</li>
        <li><strong>Gate pass issuance.</strong> Copart generates once payment fully clears.
          The free-window storage clock starts.</li>
        <li><strong>Domestic transport.</strong> Carrier dispatched from the Copart yard to a
          consolidation warehouse or directly to port. Typically 3-10 days depending on lane.</li>
        <li><strong>Warehouse consolidation.</strong> If shipping by container, the vehicle is
          prepped (fluids drained to acceptable levels), documented with photos, and loaded
          with other vehicles bound for the same destination.</li>
        <li><strong>Ocean freight booking.</strong> Our affiliated export company books container
          or RoRo space on the next sailing to the destination port.</li>
        <li><strong>Ocean transit.</strong> 15-45 days depending on destination. Mediterranean
          and North Europe are the shortest; Latin America and the Pacific Rim the longest.</li>
        <li><strong>Destination port clearance.</strong> Customs, port fees, any local
          certifications, and delivery handoff — buyer&apos;s responsibility per the
          destination country&apos;s rules.</li>
      </ol>

      <h2 style={h2}>Document flow — what moves with the vehicle</h2>

      <p style={p}>
        The document trail is dense but predictable:
      </p>
      <ul style={p}>
        <li><strong>Copart gate pass</strong> — presented at yard pickup</li>
        <li><strong>Domestic Bill of Lading</strong> — signed at Copart pickup and at
          warehouse drop; records condition at each touchpoint</li>
        <li><strong>Warehouse intake confirmation</strong> — photos, consolidation record,
          any new damage noted</li>
        <li><strong>Ocean BOL</strong> — issued by the carrier line once vessel is booked</li>
        <li><strong>Commercial invoice + VIN + title copy</strong> — destination customs</li>
        <li><strong>Export certificate</strong> — required by some destinations (EU, GCC)</li>
      </ul>

      <h2 style={h2}>Container vs RoRo — the decision that saves or costs thousands</h2>

      <p style={p}>
        RoRo (roll-on/roll-off) is typically cheaper per vehicle for single drivable cars to
        major ports. But RoRo only works if the vehicle can drive on and off under its own
        power — any non-running vehicle must ship by container. Container also opens up
        destinations RoRo does not serve, and consolidated containers (3-4 vehicles sharing)
        often beat individual RoRo bookings per vehicle.
      </p>

      <p style={p}>
        Default decision rule: non-running or high-value = container. Single drivable
        common-make to a major port = RoRo. Multiple vehicles same destination = shared
        container beats individual RoRo bookings.
      </p>

      <h2 style={h2}>Timeline realities by destination region</h2>

      <ul style={p}>
        <li><strong>Northern Europe</strong> (Gdańsk, Hamburg, Klaipeda) — 6-9 weeks end-to-end</li>
        <li><strong>Black Sea and Caucasus</strong> (Odesa, Poti) — 7-11 weeks</li>
        <li><strong>Middle East</strong> (Jebel Ali, Jeddah) — 7-9 weeks</li>
        <li><strong>West Africa</strong> (Lagos, Tema) — 8-10 weeks</li>
        <li><strong>Latin America</strong> (Iquique, Valparaiso, Puerto Cabello) — 9-11 weeks</li>
      </ul>

      <p style={p}>
        Timelines assume a clean domestic leg and a sailing that matches the normal frequency
        for that lane. Peak-season consolidation waits — late Q4 Europe, late Q1 Middle East
        — can add 1-2 weeks.
      </p>

      <h2 style={h2}>Example cost breakdown: Copart NJ to Odesa (shared container)</h2>

      <ul style={p}>
        <li>Copart purchase (salvage Tesla Model 3): $17,000</li>
        <li>Domestic transport Copart NJ → Newark warehouse: $350</li>
        <li>Container loading + prep: $400</li>
        <li>Ocean freight share (1 of 4 vehicles in container): $1,200</li>
        <li>Documentation + port fees: $300</li>
        <li><strong>Subtotal to Odesa port</strong>: ~$19,250</li>
      </ul>

      <p style={p}>
        Destination customs duty, VAT, and inland delivery are the buyer&apos;s responsibility
        and vary significantly by country. A Ukrainian buyer should add import duty + VAT +
        customs broker per local rules; those can run 15-40% of vehicle value depending on
        engine size and age.
      </p>

      <h2 style={h2}>Common mistakes international buyers make</h2>

      <ul style={p}>
        <li><strong>Bidding without a pre-export quote.</strong> The full transport chain can
          exceed the winning bid on cheaper vehicles. Always quote first.</li>
        <li><strong>Assuming RoRo will accept a non-running vehicle.</strong> It will not.
          Container is mandatory for any inoperable vehicle.</li>
        <li><strong>Choosing a cheap remote yard without a local carrier check.</strong>
          Saves $200 on auction price, adds $500 in domestic transport and 5 storage days.</li>
        <li><strong>Ignoring sailing frequency.</strong> Some destinations have monthly
          sailings, not weekly. Missing one adds 3 weeks.</li>
        <li><strong>Skipping the warehouse consolidation step.</strong> Direct-to-port works
          for single vehicles; for multi-vehicle buyers, consolidation at a warehouse is
          almost always cheaper per-vehicle.</li>
      </ul>

      <h2 style={h2}>How Y7 handles this end-to-end</h2>

      <p style={p}>
        Y7 Logistics is the licensed FMCSA domestic broker (MC #1741537) handling Copart-
        yard-to-warehouse or Copart-yard-to-port transport. An affiliated company with a
        dealer license handles warehouse consolidation and ocean freight booking. The buyer gets
        a single point of contact through the Y7 client portal that covers the entire chain:
        domestic dispatch status, warehouse intake confirmation, ocean booking reference,
        and destination port handoff all flow into one timeline.
      </p>

      <p style={p}>
        For exporters buying multiple lots per week, the workflow extends to shared containers
        grouped by destination port and weekly consolidated billing rather than per-vehicle
        invoicing.
      </p>

      <p style={p}>
        Dig deeper: <Link to="/copart-international-shipping" style={link}>Copart international shipping guide</Link>
        {' '}·{' '}<Link to="/exporters" style={link}>exporter services</Link>
        {' '}·{' '}<Link to="/auction-to-port-transport" style={link}>auction-to-port workflow</Link>.
      </p>
    </article>
  );
}
