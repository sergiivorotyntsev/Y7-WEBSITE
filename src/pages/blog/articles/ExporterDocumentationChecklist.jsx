import React from 'react';
import { Link } from 'react-router-dom';

export default function ExporterDocumentationChecklist({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        In vehicle export, precision is rewarded and delay is punished. Missing a vessel sailing date because
        of a documentation gap does not just cost you a rebooking fee — it can mean weeks of port storage, a
        lost buyer relationship, and a vehicle depreciating in a holding yard instead of generating revenue at
        its destination. The entire chain from auction purchase to vessel loading depends on a sequence of
        documents arriving in the right order, at the right time, with the right information.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        This is the documentation checklist that experienced exporters work from. Every item exists because
        skipping it has, at some point, caused a vessel miss.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Document Chain
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Export documentation is sequential. Each document unlocks the next step, and a gap anywhere in the
        chain stalls everything downstream. Here is the critical path:
      </p>

      <ul style={{ paddingLeft: 24, margin: '16px 0' }}>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Title (Certificate of Origin)</strong> — Proof of ownership. Without a clean title in the
          exporter's name, no customs broker will file your export declaration. This is the single most common
          bottleneck in the entire pipeline. Not to be confused with the chamber-issued{' '}
          <Link to="/certificate-of-origin" style={{ color: theme.accent, textDecoration: 'underline' }}>Certificate of Origin</Link>{' '}
          that proves US manufacture for the EU's 0% import duty; that is a separate document Y7 files on request.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Bill of Lading (BOL)</strong> — Generated at vehicle pickup, documenting condition with
          photos at both origin and destination. The BOL is your proof of chain of custody and condition
          documentation if a damage claim arises during inland transport.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Export Declaration (AES / EEI)</strong> — Filed electronically through the Automated Export
          System. Required for any vehicle valued over $2,500. Your customs broker files this, but you need a
          clean title and accurate VIN data to proceed.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Power of Attorney</strong> — Authorizes your customs broker to file export documentation on
          your behalf. This should be on file before you ever buy the first vehicle, not scrambled for after
          the auction closes.
        </li>
      </ul>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Title Timing: The Bottleneck You Cannot Rush
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Auction houses issue titles on their own schedule, and that schedule varies widely. Expect{' '}
        <strong style={{ color: theme.accent }}>5 to 15 business days</strong> from payment to title receipt
        depending on the auction house, vehicle origin state, and whether there are any lien complications.
        Some states are notoriously slow. Florida and California titles often arrive faster than titles from
        states with manual processing backlogs.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The critical implication: if you are buying at auction on Monday and your vessel sails on Friday of the
        following week, you are already at risk. Experienced exporters build title lead time into their buying
        calendar, purchasing vehicles with enough buffer that titles arrive well before the target sailing date.
      </p>

      <div style={{ borderLeft: `4px solid ${theme.accent}`, padding: '16px 24px', margin: '24px 0', background: 'rgba(153,60,29,0.04)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: theme.text }}>
        The three most common causes of vessel misses are late title delivery, VIN mismatches between the title
        and export declaration, and discovery of outstanding liens that were not cleared at auction. Every one
        of these is preventable with upfront verification.
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        BOL and Photo Documentation
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        A properly executed Bill of Lading does more than confirm pickup. It creates a photographic and written
        record of the vehicle's condition at the exact moment it enters the transport chain and again when it
        arrives at the port. For exporters, this documentation is essential — not just for insurance purposes,
        but because damage discovered at port loading with no prior documentation means the claim falls on you.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Insist on timestamped photos at both pickup and delivery. A BOL without condition photos is marginally
        better than no BOL at all.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Port-Specific Requirements
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Not all ports handle vehicle exports the same way. The requirements differ and knowing your target port
        matters:
      </p>

      <ul style={{ paddingLeft: 24, margin: '16px 0' }}>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Port Newark (New Jersey)</strong> — The largest East Coast auto export hub. High throughput
          means strict scheduling. Key requirement: vehicles must arrive with a{' '}
          <strong style={{ color: theme.accent }}>maximum 1/4 tank of fuel</strong>. Overfueled vehicles get
          rejected at the gate, creating an additional delay and handling charge.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Houston</strong> — Major hub for exports to the Middle East and West Africa. Port congestion
          can vary seasonally. Allow extra buffer days for yard processing.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Savannah</strong> — Growing export port with competitive rates. Less congestion than Newark
          or Houston but fewer sailing frequency options on some routes.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Brunswick (Georgia)</strong> — Specialized RoRo (Roll-on/Roll-off) facility. Ideal for
          operable vehicles heading to destinations with RoRo service. Vehicles must be driveable to load.
        </li>
      </ul>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Inland Transport Leg
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Getting the vehicle from the auction lot to the port is where inland transport and ocean freight
        intersect. Y7 Logistics (MC #1741537, USDOT #4427359) handles the auction-to-port ground leg, coordinating
        with our ocean freight partners for the vessel booking and overseas delivery.
        This split — specialized inland broker plus dedicated freight forwarder — gives you focused expertise
        on each segment rather than a generalist handling both.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          The document chain is sequential and unforgiving. Title, BOL, export declaration, and power of
          attorney must all be correct and on time. Start your documentation process the moment you win the
          auction bid — not when the vessel booking is confirmed.
        </p>
      </div>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        If you are scaling an export operation and need a transport partner who understands port timing and
        document coordination, visit our{' '}
        <Link to="/exporters" style={{ color: theme.accent, textDecoration: 'underline' }}>exporter services page</Link>{' '}
        to learn how we structure the inland leg for volume exporters.
      </p>
    </article>
  );
}
