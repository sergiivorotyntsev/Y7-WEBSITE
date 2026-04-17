import React from 'react';
import { Link } from 'react-router-dom';

export default function FMCSA2026NewRules({ theme }) {
  return (
    <article style={{ maxWidth: 780, margin: '0 auto' }}>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        On <strong style={{ color: theme.accent }}>January 16, 2026</strong>, a set of FMCSA
        regulatory changes took effect that fundamentally alter how freight and auto transport
        brokerages operate. These rules were originally slated for January 2024, then extended
        twice, giving the industry two additional years to prepare. That preparation period is now
        over. If your brokerage has not adapted, you are operating out of compliance.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Bond Replenishment: 30 Days Became 7
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Under the previous rules, when a broker's surety bond was drawn down by a claim, the broker
        had 30 days to replenish it back to the required minimum. The new rule compresses that
        window to <strong style={{ color: theme.accent }}>7 days</strong>. For brokerages operating
        on thin margins — which is most of them — this means a single large claim can trigger
        a one-week countdown to either replenish the bond or lose operating authority.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The implications cascade. A brokerage that previously had weeks to negotiate with their
        surety provider, arrange financing, or dispute the claim now has seven calendar days. If
        the bond is not replenished, the FMCSA can revoke operating authority. There is no grace
        period and no appeals process that pauses the clock.
      </p>

      <div style={{ borderLeft: `4px solid ${theme.accent}`, padding: '16px 24px', margin: '24px 0', background: 'rgba(153,60,29,0.04)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: theme.text }}>
        Seven days is not a lot of time when your surety company needs documentation, your bank
        needs approval, and the claimant is not returning calls. Plan for this before it happens.
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Surety Provider Accountability
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The new rules do not only target brokerages. Surety providers themselves face significant
        new obligations. When a bond is cancelled, the surety company must now notify the FMCSA
        within <strong style={{ color: theme.accent }}>2 business days</strong>. Previously, the
        notification timeline was loosely enforced and frequently delayed, allowing brokerages to
        operate on cancelled bonds for weeks or months without the FMCSA knowing.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The enforcement teeth are real. Surety providers who fail to comply face penalties of up to
        <strong style={{ color: theme.accent }}> $12,882</strong> per violation, and repeated
        non-compliance can result in a <strong style={{ color: theme.accent }}>3-year ban</strong> from
        issuing BMC-84 bonds to transportation entities. This is designed to close the gap where
        brokerages continued operating with lapsed bonds because their surety company never
        reported the lapse.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Identity Proofing: No More Anonymous Registrations
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The Unified Registration System (URS) now requires identity proofing for all new
        registrations and authority changes. This is not a simple "upload your driver's license"
        step. The process requires a government-issued photo ID combined with real-time selfie
        matching — biometric verification that the person submitting the application is the person
        on the ID.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        This targets a specific and well-documented problem: fraudulent broker and carrier
        registrations filed using stolen identities or entirely fabricated business entities.
        The FMCSA has been transparent about the scope of this problem — chameleon carriers who
        shut down under one MC number and immediately reopen under another have been a persistent
        enforcement failure for over a decade.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          Identity proofing via the URS makes it materially harder to register a fraudulent
          brokerage or carrier authority. For legitimate operators, this is unambiguously positive.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        BMC-85 Trust Fund Restrictions
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Brokerages that use BMC-85 trust fund agreements instead of surety bonds face a new
        restriction on eligible trustees. Loan companies and finance companies are no longer
        eligible to serve as trustees for BMC-85 trust fund assets. The FMCSA found that these
        entity types introduced conflicts of interest and, in some cases, did not maintain the
        liquid assets required to pay claims. Going forward, only banks and traditional trust
        institutions qualify.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        For brokerages currently using a loan company as their BMC-85 trustee, this requires a
        transition to an eligible institution — and that transition is not instantaneous. Finding
        a bank willing to serve as trustee for a transportation trust, negotiating fees, and
        transferring the assets takes time that has now run out.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        MC Number Transition and the Motus System
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The long-discussed transition from separate MC and USDOT numbering systems has been
        postponed again. The FMCSA's Motus system — intended to replace the aging SAFER and URS
        platforms — is rolling out in phases, but the full MC number consolidation is not part
        of the January 2026 compliance date. Brokerages should continue using both MC and USDOT
        numbers for the foreseeable future and monitor the Motus rollout for future changes.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        What This Means for Small Brokerages
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The cumulative impact of these changes falls hardest on small and mid-size brokerages. The
        7-day bond replenishment window alone changes the risk calculus significantly. A single
        $75,000 surety bond — the current FMCSA minimum — provides thin protection when a major
        claim hits. Industry advisors are now recommending bond coverage of
        <strong style={{ color: theme.accent }}> $100,000 or more</strong> to provide adequate
        buffer against the compressed replenishment timeline.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The identity proofing requirements also add friction to what was previously a
        straightforward registration process. For legitimate operators, this friction is
        manageable. For the operators it is designed to exclude, it is the point.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        At Y7 Logistics (MC #1741537, USDOT #4427359), we view these regulatory changes as
        overdue. Stronger identity verification, faster bond replenishment, and surety provider
        accountability all serve the same purpose: ensuring that the brokerages moving your
        vehicles have the authority, the insurance, and the financial backing to do it right.
        Compliance is not a burden when you were already operating above the minimum.
      </p>
    </article>
  );
}
