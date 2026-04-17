import React from 'react';
import { Link } from 'react-router-dom';

export default function BondClaimsGuide({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every licensed property broker operates under a <strong style={{ color: theme.accent }}>$75,000</strong> surety
        bond or trust fund. Most brokers treat this as a startup cost — a filing fee they pay once and forget
        about. That misunderstanding is exactly what turns a manageable dispute into an authority-ending crisis.
        The bond is not a fee. It is a financial instrument that protects shippers and carriers against your
        default, and it comes with enforcement mechanisms that move faster than most brokers expect.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Anatomy of a Bond Claim
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Understanding the timeline is critical because once it starts, it moves fast and the windows for
        response are short:
      </p>

      <ul style={{ paddingLeft: 24, margin: '16px 0' }}>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Day 0 — Claim Filed:</strong> A shipper or carrier files a claim against your bond with your
          surety provider. This typically happens after a payment default — you owed a carrier for completed
          transport and did not pay, or you owed a shipper a refund and did not issue one.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Days 1-2 — Surety Notifies FMCSA:</strong> Your surety provider is legally obligated to
          report the claim to FMCSA. This is not discretionary. The surety has its own regulatory obligations
          and faces penalties for non-compliance with reporting requirements.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Day 7 — Cure Deadline:</strong> Under FMCSA regulations, a "financial failure" is defined
          as any default that is not cured within <strong style={{ color: theme.accent }}>7 days</strong>. Seven
          calendar days. Not business days. If you have not resolved the claim — paid the amount owed, reached
          a documented settlement, or successfully disputed the claim's validity — by day 7, you are in
          financial failure.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Day 8 — Authority Suspension:</strong> Financial failure triggers suspension proceedings
          against your broker authority. FMCSA can and does suspend authorities over unresolved bond claims.
          A suspended authority means you cannot legally operate. Every load in progress becomes a legal and
          logistical problem.
        </li>
      </ul>

      <div style={{ borderLeft: `4px solid ${theme.accent}`, padding: '16px 24px', margin: '24px 0', background: 'rgba(153,60,29,0.04)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: theme.text }}>
        Seven days from filing to financial failure determination. That is the window. Most brokers do not
        realize how compressed this timeline is until they are living it.
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        BMC-84 vs. BMC-85: Two Instruments, Different Risk Profiles
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        FMCSA offers two mechanisms to satisfy the financial security requirement. Understanding the difference
        matters because the choice affects your exposure and flexibility:
      </p>

      <h3 style={{ fontFamily: theme.fonts.sans, fontSize: '1.05rem', fontWeight: 600, color: theme.text, margin: '28px 0 10px' }}>
        BMC-84: Surety Bond
      </h3>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The most common choice. You pay a premium — typically 1% to 10% of the bond amount annually, depending
        on your credit and claims history — and a surety company backs the full{' '}
        <strong style={{ color: theme.accent }}>$75,000</strong>. If a valid claim is paid out, the surety pays
        the claimant and then comes after you for reimbursement. The bond is a guarantee of your obligation,
        not a pool of money you own. Your surety will pursue you for every dollar they pay out, plus legal costs.
      </p>

      <h3 style={{ fontFamily: theme.fonts.sans, fontSize: '1.05rem', fontWeight: 600, color: theme.text, margin: '28px 0 10px' }}>
        BMC-85: Trust Fund
      </h3>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The alternative is depositing the full $75,000 (or more) into a trust fund administered by an approved
        trustee. The money is yours but held in trust specifically to satisfy claims. The advantage is no annual
        premium — you own the funds. The disadvantage is that $75,000 is locked up and unavailable for operations.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        FMCSA has introduced new restrictions on who can serve as a BMC-85 trustee, tightening the approval
        process and increasing oversight of trust fund administrators. This is a response to cases where
        trustees failed to properly manage or distribute trust funds, leaving claimants without recourse. If
        you use a BMC-85, verify that your trustee is currently approved and in good standing with FMCSA.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Protection Strategies That Actually Work
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Surviving a bond claim starts long before one is filed. Here is what brokers who maintain clean
        authorities do differently:
      </p>

      <ul style={{ paddingLeft: 24, margin: '16px 0' }}>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Over-bond to <span style={{ color: theme.accent }}>$100,000</span>:</strong> The minimum is
          $75,000, but carrying a bond above the minimum creates a buffer. It demonstrates financial seriousness
          to partners and gives you headroom if multiple claims arrive simultaneously. The incremental premium
          cost is modest relative to the protection.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Immediate claims response:</strong> The 7-day window leaves no room for delay. Any notification
          from your surety must be treated as urgent. Have a process for responding to claims within 24 hours —
          acknowledge receipt, gather documentation, and either pay, dispute with evidence, or negotiate a
          documented settlement.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Separated operating cash:</strong> The most common reason brokers cannot cure a claim in 7
          days is that the money is not available. If your operating cash and your claims reserve are the same
          pool, a slow month in receivables can make you unable to respond to a valid claim. Maintain a
          separate reserve specifically for claim resolution.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Clean transaction records:</strong> Many claims are disputable, but only if you have
          documentation. A carrier claiming non-payment when you have a timestamped payment record and signed
          rate confirmation is a defensible position. A carrier claiming non-payment when your records are
          incomplete is a claim you will likely lose.
        </li>
      </ul>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          The bond is not a filing fee you forget about. It is a live financial instrument that can be triggered
          at any time by any party you have done business with. Treat it accordingly: over-bond, maintain cash
          reserves, respond immediately to any claim notification, and keep records that can withstand scrutiny.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Surety's Obligation to Report
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        One point that catches brokers off guard: your surety provider is legally obligated to notify FMCSA
        of claims. They cannot agree to "hold off" on reporting while you work things out. They cannot delay
        the notification as a favor. The regulations require reporting, and sureties face their own penalties
        for non-compliance. This means the moment a claim is filed with your surety, FMCSA knows about it.
        Your response clock starts immediately and there is no informal grace period.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Y7 Logistics (MC #1741537, USDOT #4427359) maintains its authority with the understanding that the bond
        is operational infrastructure, not paperwork. Every transaction in our system generates the documentation
        needed to respond to a claim — rate confirmations, payment records, delivery verification — automatically
        and in real time. That is not a feature. It is a requirement for operating responsibly under FMCSA
        authority.
      </p>
    </article>
  );
}
