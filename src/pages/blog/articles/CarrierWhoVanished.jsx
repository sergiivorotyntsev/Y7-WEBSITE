import React from 'react';
import { Link } from 'react-router-dom';

export default function CarrierWhoVanished({ theme }) {
  return (
    <article style={{ maxWidth: 780, margin: '0 auto' }}>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        It was a Tuesday at 2:14 PM when a carrier accepted a load out of Houston, confirmed pickup
        for the following morning, and then ceased to exist. No phone answer, no text reply, no
        email bounce — just silence. The vehicle sat at the auction lot for three days before we
        caught it. That load cost us a client relationship we had spent four months building.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        That was before we built the system we run today. Since then, our platform has processed
        <strong style={{ color: theme.accent }}>3,674</strong> messages across SMS and email and
        managed <strong style={{ color: theme.accent }}>267</strong> carriers — and the vanishing
        carrier problem has become something we detect in hours, not days.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The 4-Hour Rule
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        When a carrier stops responding, the clock starts. In auto transport, four hours of silence
        from a carrier who has been dispatched is not a minor inconvenience — it is a material risk
        to the load. Our system enforces a strict 4-hour non-response threshold. If a carrier has
        not replied to a status check, pickup confirmation, or update request within that window,
        the load is flagged for reassignment.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The numbers tell the story clearly: <strong style={{ color: theme.accent }}>73%</strong> of
        loads flagged under the 4-hour rule end up reassigned to a different carrier. That is not a
        flaw in the system — it is the system working. The alternative is waiting 24 or 48 hours
        to discover that a carrier has ghosted, by which point the customer is furious and the
        vehicle has missed its delivery window entirely.
      </p>

      <div style={{ borderLeft: `4px solid ${theme.accent}`, padding: '16px 24px', margin: '24px 0', background: 'rgba(153,60,29,0.04)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: theme.text }}>
        A carrier who goes silent for four hours after dispatch is not busy — they are gone.
        The data is unambiguous on this point.
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Reliability Is a Composite Score
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        One bad delivery does not make a bad carrier, and one on-time delivery does not make a good
        one. We score carrier reliability across five components, each weighted to reflect its actual
        impact on load outcomes:
      </p>

      <ul style={{ paddingLeft: 24, margin: '16px 0' }}>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Delivery performance</strong> — 31.5% of the score. Did the vehicle arrive on
          time, undamaged, to the correct location?
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Response time</strong> — 22.5%. How quickly does the carrier reply to
          communications across all channels?
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Issue resolution</strong> — 22.5%. When something goes wrong, does the carrier
          work to fix it or disappear?
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Photo documentation</strong> — 13.5%. Condition photos at pickup and delivery
          protect everyone involved.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Payment reliability</strong> — 10%. Carriers who dispute invoices or require
          repeated follow-ups create hidden operational costs.
        </li>
      </ul>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        This weighted model means a carrier who delivers on time but never sends photos and takes
        12 hours to respond will score lower than you might expect. And that is intentional —
        because those behaviors are precursors to the full vanishing act.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Cross-Channel Linking: One Carrier, Many Threads
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Carriers do not communicate on a single channel. They text from personal phones, email from
        Gmail accounts, and sometimes reply from a dispatch service's address. Stitching these
        threads together into a single carrier identity is one of the hardest problems in brokerage
        operations.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Our platform links SMS and email communications using a three-layer correlation engine:
        Load ID matching parses every inbound message for references to active load identifiers.
        Time-window analysis groups messages that arrive within expected response intervals.
        Request-response correlation maps outbound dispatches to inbound confirmations based on
        content similarity and sequence.
      </p>

      <h3 style={{ fontFamily: theme.fonts.sans, fontSize: '1.05rem', fontWeight: 600, color: theme.text, margin: '28px 0 10px' }}>
        Retroactive Carrier Matching
      </h3>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Here is where it gets interesting. When a new carrier is confirmed and linked to a phone
        number or email, the system does not just start tracking from that point forward. It
        retroactively scans all prior unmatched communications and re-attributes them. We had
        <strong style={{ color: theme.accent }}>69</strong> pending carrier identities when this
        feature went live. A single match — one confirmed carrier — cascaded across their entire
        message history, filling in gaps that had been invisible for weeks.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Fake Carrier Problem
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Load boards like Central Dispatch and Super Dispatch generate platform-level email
        communications that look like carrier messages but are not. Automated notifications, system
        confirmations, and relay addresses all flood the inbox alongside legitimate carrier
        correspondence. Our email router identified <strong style={{ color: theme.accent }}>6</strong> fake
        carrier identities that had been created from these platform emails —
        and cleaned <strong style={{ color: theme.accent }}>975</strong> phantom communications that
        were polluting carrier reliability scores.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          Phantom communications from load board platforms silently corrupt your carrier data.
          If you are not filtering them, your reliability scores are built on noise.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Sentiment as Early Warning
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every inbound message — SMS or email — passes through sentiment analysis before it reaches
        a human. The system is not looking for profanity or obvious complaints. It is looking for
        shifts: a carrier whose tone moves from cooperative to terse over three messages, or whose
        response length drops from full sentences to single words. These micro-patterns are the
        leading indicators of a carrier who is about to vanish or create a problem on an active load.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        At Y7 Logistics (MC #1741537, USDOT #4427359), we built these systems because we got
        burned — and because we believe that the{' '}
        <Link to="/services" style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}` }}>
          transport services
        </Link>{' '}
        our clients rely on should never depend on whether a carrier decides to answer their phone.
        Trust, in this industry, is not a feeling. It is a system.
      </p>
    </article>
  );
}
