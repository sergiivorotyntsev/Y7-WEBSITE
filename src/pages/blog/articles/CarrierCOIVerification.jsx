import React from 'react';
import { Link } from 'react-router-dom';

export default function CarrierCOIVerification({ theme }) {
  return (
    <article style={{ maxWidth: 780, margin: '0 auto' }}>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        A certificate of insurance is the single most trusted document in auto transport — and it
        is also the most commonly misunderstood. Brokers glance at the PDF, see a policy number and
        a coverage amount, and move on. But the gap between what a COI appears to say and what it
        actually guarantees has caused more uninsured claims in this industry than outright fraud
        ever has.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        What an ACORD 25 Actually Is
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The standard certificate of liability insurance in the United States is the ACORD 25 form.
        The first thing every broker needs to understand is who issues it: the insurance agent or
        the insurer's authorized representative — not the carrier. A legitimate COI comes directly
        from the insuring party. When a carrier sends you a certificate they generated or modified
        themselves, that document tells you nothing about their actual coverage.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Altered certificates are not hypothetical. A carrier can take a valid PDF, change the
        expiration date, adjust the coverage limit, and send it to a broker who has no reason to
        question what looks like a standard form. The only defense is to never accept a COI that
        did not originate from the insurer or their authorized agent.
      </p>

      <div style={{ borderLeft: `4px solid ${theme.accent}`, padding: '16px 24px', margin: '24px 0', background: 'rgba(153,60,29,0.04)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: theme.text }}>
        If the carrier is the one handing you the certificate, you do not have verification —
        you have a claim from the party you are trying to verify.
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Auto Liability: The Numbers That Matter
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The FMCSA requires a minimum of <strong style={{ color: theme.accent }}>$750,000</strong> in
        auto liability coverage for motor carriers operating vehicles over 10,001 pounds. The
        industry recommendation is <strong style={{ color: theme.accent }}>$1,000,000</strong> — a
        single serious accident involving a loaded car hauler can easily exceed the federal floor.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Yet carriers operating with <strong style={{ color: theme.accent }}>$500,000</strong> policies
        still exist in the market. They are technically non-compliant for interstate commerce at the
        federal level, but they show up on load boards, accept dispatches, and move vehicles every
        day. If you are not checking the actual limit on the COI — not just confirming a policy
        exists — you may be dispatching loads on a carrier who cannot cover a claim.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Cargo Insurance: The Verification Gap
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        For years, brokers could verify cargo insurance through BMC-32 filings with the FMCSA. That
        reporting mechanism has been eliminated. The practical consequence is significant: cargo
        insurance verification now falls entirely on the broker. There is no federal database to
        cross-reference. You either verify it yourself or you trust the paper you were handed.
      </p>

      <h3 style={{ fontFamily: theme.fonts.sans, fontSize: '1.05rem', fontWeight: 600, color: theme.text, margin: '28px 0 10px' }}>
        The Exclusions That Void Your Coverage
      </h3>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Even a valid, confirmed cargo policy may not cover the load you are shipping. The
        exclusions buried in carrier cargo policies are where claims go to die:
      </p>

      <ul style={{ paddingLeft: 24, margin: '16px 0' }}>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Load shift damage.</strong> If vehicles shift during transit due to improper
          securing, many cargo policies exclude the resulting damage entirely. The carrier's
          negligence in loading becomes the exact reason the policy will not pay.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Scheduled autos only.</strong> Some policies only cover vehicles specifically
          listed on the policy schedule. If the carrier picks up a vehicle not on that schedule,
          coverage evaporates.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Symbol 1 vs. Symbol 7.</strong> This is the distinction that catches the most
          brokers off guard. Symbol 1 means "any auto" — broad coverage regardless of whether the
          specific vehicle is listed. Symbol 7 means "specifically described autos" — only the
          vehicles named in the policy are covered. A carrier with Symbol 7 coverage hauling a
          vehicle not on their schedule has no coverage for that vehicle, period.
        </li>
      </ul>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          A valid cargo policy with a load shift exclusion and Symbol 7 coverage will pay
          exactly zero dollars on the most common type of auto transport claim. Read the
          exclusions, not just the limits.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The 4-Step Verification Protocol
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        We do not accept COIs at face value. Every carrier in our network goes through a four-step
        verification process before they move a single vehicle:
      </p>

      <ul style={{ paddingLeft: 24, margin: '16px 0' }}>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Step 1: Agent-direct COI request.</strong> We request the certificate directly
          from the carrier's insurance agent — never from the carrier. This eliminates the altered
          certificate risk entirely.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Step 2: A.M. Best rating check.</strong> The insurer itself must carry a
          financial strength rating from A.M. Best. A carrier insured by an unstable or unrated
          insurer is functionally uninsured when a large claim hits.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Step 3: All Perils confirmation.</strong> We confirm the cargo policy covers all
          perils — not just named perils, not just collision, not just theft. All perils coverage
          is the only type that protects against the full range of transit risks.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Step 4: Automated monitoring.</strong> We request Certificate Holder status on
          every carrier's policy. This means the insurer is contractually obligated to notify us
          automatically if the policy lapses, is cancelled, or has its limits reduced. No manual
          follow-up required — if coverage changes, we know.
        </li>
      </ul>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Safety Net: Contingent Cargo
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Even with rigorous verification, policies lapse between checks and carriers change insurers
        without notification. That is why we maintain contingent cargo insurance — a policy that
        activates when the carrier's own coverage fails to pay a valid claim. It is not a
        replacement for carrier verification. It is the last line of defense.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        At Y7 Transport (MC #1741537, USDOT #4427359), we treat insurance verification as
        infrastructure, not paperwork. Every vehicle we move is backed by a carrier whose coverage
        we have confirmed at the source and supplemented with our own contingent policy. Because
        when a $60,000 vehicle is damaged in transit, the only thing that matters is whether the
        coverage is real.
      </p>
    </article>
  );
}
