import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { colors, fonts } from '../theme';

/* ── style constants ── */
const wrap = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '60px 24px 80px',
};
const h1Style = {
  fontFamily: fonts.serif,
  fontSize: 'clamp(28px, 4vw, 38px)',
  fontWeight: 700,
  color: colors.text,
  marginBottom: '8px',
};
const h2Style = {
  fontFamily: fonts.serif,
  fontSize: '20px',
  fontWeight: 700,
  color: colors.text,
  marginTop: '36px',
  marginBottom: '12px',
};
const pStyle = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '12px',
};
const ulStyle = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  paddingLeft: '24px',
  marginBottom: '12px',
};
const strongStyle = {
  color: colors.text,
  fontWeight: 600,
};
const linkStyle = {
  color: colors.accent,
};
const dividerStyle = {
  border: 'none',
  borderTop: `1px solid ${colors.border}`,
  margin: '40px 0',
};
const disclaimerStyle = {
  fontFamily: fonts.sans,
  fontSize: '13px',
  color: colors.textMuted,
  fontStyle: 'italic',
  lineHeight: 1.7,
  marginTop: '48px',
  padding: '20px 0',
  borderTop: `1px solid ${colors.border}`,
};

export default function Terms() {
  return (
    <div style={wrap}>
      <PageMeta
        title="Terms & Conditions"
        description="Terms and Conditions for Y7 Logistics auto transport brokerage services."
        path="/terms"
      />

      <h1 style={h1Style}>Terms &amp; Conditions</h1>
      <p style={{ ...pStyle, fontStyle: 'italic' }}>
        Also see our{' '}
        <Link to="/privacy" style={linkStyle}>Privacy Policy</Link> and{' '}
        <Link to="/accessibility" style={linkStyle}>Accessibility Statement</Link>.
      </p>

      {/* ── 1. Last Updated ── */}
      <h2 style={h2Style}>1. Last Updated</h2>
      <p style={pStyle}>
        These Terms &amp; Conditions were last updated on <strong style={strongStyle}>April 3, 2026</strong>.
      </p>

      {/* ── 2. Acceptance of Terms ── */}
      <h2 style={h2Style}>2. Acceptance of Terms</h2>
      <p style={pStyle}>
        By accessing www.y7agency.com or using any services provided by Y7 Consulting Inc
        d/b/a Y7 Logistics (&ldquo;Y7,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;),
        you (&ldquo;Customer,&rdquo; &ldquo;you,&rdquo; &ldquo;your&rdquo;) agree to be bound by these
        Terms &amp; Conditions. If you do not agree to these Terms, do not access or use our website
        or services.
      </p>

      {/* ── 3. Company Information ── */}
      <h2 style={h2Style}>3. Company Information</h2>
      <p style={pStyle}>
        Y7 Consulting Inc, doing business as Y7 Logistics, is a federally licensed property
        <strong style={strongStyle}> broker</strong>, <strong style={strongStyle}>NOT</strong> a motor
        carrier. We operate under the following federal authority:
      </p>
      <ul style={ulStyle}>
        <li>USDOT #4427359</li>
        <li>MC #1741537</li>
        <li>$75,000 surety bond (BMC-84)</li>
        <li>Principal location: Newton, MA, USA</li>
      </ul>

      {/* ── 4. Broker Disclosure (49 CFR 371.3) ── */}
      <h2 style={h2Style}>4. Broker Disclosure (49 CFR 371.3)</h2>
      <p style={pStyle}>
        In accordance with 49 CFR &sect; 371.3, Y7 Logistics is a licensed property{' '}
        <strong style={strongStyle}>broker</strong> registered with the Federal Motor Carrier Safety
        Administration (FMCSA). Y7 does <strong style={strongStyle}>NOT</strong> transport vehicles
        itself. We arrange for the transportation of motor vehicles through FMCSA-authorized motor
        carriers. All carriers engaged through Y7 are independent contractors and are{' '}
        <strong style={strongStyle}>NOT</strong> employees, agents, or representatives of Y7 Consulting
        Inc.
      </p>

      {/* ── 5. Services ── */}
      <h2 style={h2Style}>5. Services</h2>
      <p style={pStyle}>
        Y7 Logistics provides freight <strong style={strongStyle}>brokerage</strong> services for the
        transportation of motor vehicles. Our services include, but are not limited to:
      </p>
      <ul style={ulStyle}>
        <li>Providing quotes and estimates for vehicle transportation;</li>
        <li>
          Carrier selection and vetting through Central Dispatch, the FMCSA SAFER System, and
          independent insurance verification;
        </li>
        <li>Dispatch coordination between customer and carrier;</li>
        <li>
          Documentation support including Bills of Lading (BOL), gate passes, and shipment status
          updates.
        </li>
      </ul>
      <p style={pStyle}>
        All quotes provided by Y7 are estimates only and do not constitute binding offers until a
        carrier has been assigned and the final price has been confirmed.
      </p>

      {/* ── 6. Quotes & Pricing ── */}
      <h2 style={h2Style}>6. Quotes &amp; Pricing</h2>
      <p style={pStyle}>
        All quotes are estimates based on current market conditions at the time of inquiry. The
        final transportation price is confirmed only when a carrier has been assigned and dispatch
        has been coordinated. Pricing may vary based on:
      </p>
      <ul style={ulStyle}>
        <li>Route distance and geography;</li>
        <li>Vehicle type, size, and condition (operable vs. inoperable);</li>
        <li>Transport type (open vs. enclosed);</li>
        <li>Seasonal demand and market availability.</li>
      </ul>
      <p style={pStyle}>
        Unless otherwise stated in writing, all quotes are valid for <strong style={strongStyle}>48
        hours</strong> from the time of issuance.
      </p>

      {/* ── 7. Payment Terms ── */}
      <h2 style={h2Style}>7. Payment Terms</h2>
      <p style={pStyle}>
        Y7 Logistics offers the following payment structures:
      </p>
      <ul style={ulStyle}>
        <li>
          <strong style={strongStyle}>Prepay (Broker-Paid):</strong> Payment is remitted to Y7 via
          Zelle, wire transfer, or ACH prior to carrier dispatch.
        </li>
        <li>
          <strong style={strongStyle}>COD (Cash on Delivery):</strong> The customer pays the carrier
          directly at the time of vehicle delivery.
        </li>
      </ul>
      <p style={pStyle}>Accepted payment methods include:</p>
      <ul style={ulStyle}>
        <li>Zelle</li>
        <li>Wire transfer</li>
        <li>ACH (Automated Clearing House)</li>
        <li>Cashier&rsquo;s check</li>
      </ul>
      <p style={pStyle}>
        Late or outstanding payments may result in a hold on current or future shipments.
        Non-payment at the time of COD delivery may result in the carrier exercising lien rights
        over the vehicle in accordance with applicable state and federal law.
      </p>

      {/* ── 8. Cancellation Policy ── */}
      <h2 style={h2Style}>8. Cancellation Policy</h2>
      <ul style={ulStyle}>
        <li>
          <strong style={strongStyle}>Before carrier assignment:</strong> Cancellation is free of
          charge.
        </li>
        <li>
          <strong style={strongStyle}>After carrier assignment:</strong> A cancellation fee of up to
          $200 may apply to cover carrier costs and administrative expenses.
        </li>
        <li>
          <strong style={strongStyle}>No-show:</strong> If the customer or vehicle is unavailable at
          the scheduled pickup and no prior notice is given, the full transport fee may be charged.
        </li>
        <li>
          <strong style={strongStyle}>Carrier-initiated cancellation:</strong> If a carrier cancels
          after assignment, the customer is entitled to a full refund of any prepaid amounts.
        </li>
      </ul>

      {/* ── 9. Vehicle Condition & Inspection ── */}
      <h2 style={h2Style}>9. Vehicle Condition &amp; Inspection</h2>
      <p style={pStyle}>
        The customer must accurately describe the condition of the vehicle at the time of booking,
        including but not limited to operability, existing damage, and modifications. The carrier
        will conduct a visual inspection at the time of pickup and note any pre-existing damage on
        the Bill of Lading (BOL).
      </p>
      <p style={pStyle}>
        <strong style={strongStyle}>
          The customer MUST inspect the vehicle at delivery WITH the carrier present before signing
          the BOL.
        </strong>{' '}
        A signed BOL with no noted damage constitutes acceptance of the vehicle in its delivered
        condition. Any claims for damage not noted on the BOL at the time of delivery are the sole
        responsibility of the customer.
      </p>

      {/* ── 10. Insurance & Liability ── */}
      <h2 style={h2Style}>10. Insurance &amp; Liability</h2>
      <p style={pStyle}>
        All carriers arranged through Y7 Logistics are required to maintain a minimum of $750,000
        in general liability coverage and $100,000 or more in cargo insurance. Y7 verifies each
        carrier&rsquo;s Certificate of Insurance (COI) prior to dispatch.
      </p>
      <p style={pStyle}>
        Y7 Logistics&rsquo; liability is <strong style={strongStyle}>strictly limited</strong> to the
        brokerage fee charged for the applicable shipment. Y7 is <strong style={strongStyle}>NOT
        </strong> liable for damage, theft, fire, loss, delay, loss of personal items, or acts of
        God occurring during transport. All claims for cargo damage or loss must be filed directly
        with the carrier within <strong style={strongStyle}>24 hours</strong> of delivery. Y7 will
        assist the customer in the claim-filing process as a courtesy but assumes no financial
        responsibility for the outcome.
      </p>

      {/* ── 11. Personal Items ── */}
      <h2 style={h2Style}>11. Personal Items</h2>
      <p style={pStyle}>
        Y7 Logistics is <strong style={strongStyle}>NOT</strong> responsible for personal items left
        inside the vehicle during transport. Personal belongings are{' '}
        <strong style={strongStyle}>NOT</strong> covered by the carrier&rsquo;s cargo insurance policy.
        Customers must remove all personal belongings from the vehicle prior to pickup. If personal
        items remain in the vehicle, the customer assumes all risk of loss, damage, or theft.
      </p>

      {/* ── 12. Limitation of Liability ── */}
      <h2 style={h2Style}>12. Limitation of Liability</h2>
      <p style={pStyle}>
        To the maximum extent permitted by applicable law, Y7 Consulting Inc&rsquo;s total aggregate
        liability arising out of or in connection with these Terms or the services provided shall
        not exceed the total brokerage fees paid by the customer for the specific shipment giving
        rise to the claim.
      </p>
      <p style={pStyle}>
        In no event shall Y7 be liable for any indirect, incidental, consequential, special, or
        punitive damages, including but not limited to lost profits, loss of use, or business
        interruption. Y7 shall not be liable for any acts, omissions, delays, or negligence of any
        carrier or third party.
      </p>

      {/* ── 13. Indemnification ── */}
      <h2 style={h2Style}>13. Indemnification</h2>
      <p style={pStyle}>
        The customer agrees to indemnify, defend, and hold harmless Y7 Consulting Inc, its
        officers, directors, employees, and agents from and against any and all claims, damages,
        losses, liabilities, costs, and expenses (including reasonable attorney&rsquo;s fees)
        arising out of or related to:
      </p>
      <ul style={ulStyle}>
        <li>Inaccurate or misleading vehicle information provided by the customer;</li>
        <li>Failure to inspect the vehicle at delivery with the carrier present;</li>
        <li>Unauthorized cargo or personal items left inside the vehicle;</li>
        <li>Any breach of these Terms &amp; Conditions by the customer.</li>
      </ul>

      {/* ── 14. Force Majeure ── */}
      <h2 style={h2Style}>14. Force Majeure</h2>
      <p style={pStyle}>
        Y7 Logistics shall not be liable for any failure or delay in performance resulting from
        causes beyond its reasonable control, including but not limited to: severe weather, natural
        disasters, government actions or regulations, war, terrorism, pandemic, road closures,
        mechanical breakdown of carrier equipment, or traffic conditions.
      </p>
      <p style={pStyle}>
        All estimated pickup and delivery dates are <strong style={strongStyle}>NOT guaranteed</strong>.
        Dates provided are approximations based on standard transit times and are subject to change
        without notice.
      </p>

      {/* ── 15. Dispute Resolution ── */}
      <h2 style={h2Style}>15. Dispute Resolution</h2>
      <p style={pStyle}>
        In the event of a dispute arising under or in connection with these Terms, the parties shall
        first attempt to resolve the matter through good-faith negotiation for a period of thirty
        (30) days. If the dispute cannot be resolved through negotiation, it shall be submitted to
        binding arbitration administered in Suffolk County, Massachusetts.
      </p>
      <p style={pStyle}>
        These Terms shall be governed by and construed in accordance with the laws of the
        Commonwealth of Massachusetts, without regard to conflict-of-law principles. The prevailing
        party in any arbitration or legal proceeding shall be entitled to recover reasonable
        attorney&rsquo;s fees and costs.
      </p>
      <p style={pStyle}>
        <strong style={strongStyle}>
          The customer waives any right to participate in a class action lawsuit or class-wide
          arbitration against Y7 Consulting Inc.
        </strong>
      </p>

      {/* ── 16. Intellectual Property ── */}
      <h2 style={h2Style}>16. Intellectual Property</h2>
      <p style={pStyle}>
        All content, design, graphics, code, and materials displayed on www.y7agency.com are the
        exclusive property of Y7 Consulting Inc and are protected by applicable intellectual
        property laws. All trademarks, service marks, and trade names used on this website are the
        property of Y7 Consulting Inc. Use of any Y7 trademarks or intellectual property without
        prior written permission is strictly prohibited.
      </p>

      {/* ── 17. Third-Party Links ── */}
      <h2 style={h2Style}>17. Third-Party Links</h2>
      <p style={pStyle}>
        Our website may contain links to third-party websites or services that are not owned or
        controlled by Y7 Consulting Inc. Y7 is not responsible for the content, privacy policies,
        or practices of any third-party websites. Accessing third-party links is at the
        customer&rsquo;s own risk.
      </p>

      {/* ── 18. Severability ── */}
      <h2 style={h2Style}>18. Severability</h2>
      <p style={pStyle}>
        If any provision of these Terms &amp; Conditions is found to be invalid, illegal, or
        unenforceable by a court of competent jurisdiction, the remaining provisions shall continue
        in full force and effect. The invalid provision shall be modified to the minimum extent
        necessary to make it valid and enforceable while preserving its original intent.
      </p>

      {/* ── 19. Entire Agreement ── */}
      <h2 style={h2Style}>19. Entire Agreement</h2>
      <p style={pStyle}>
        These Terms &amp; Conditions, together with the{' '}
        <Link to="/privacy" style={linkStyle}>Privacy Policy</Link> and any applicable Transport
        Service Agreement, constitute the entire agreement between the customer and Y7 Consulting
        Inc with respect to the use of our website and services. These Terms supersede all prior or
        contemporaneous communications, representations, or agreements, whether oral or written.
      </p>

      {/* ── 20. Contact ── */}
      <h2 style={h2Style}>20. Contact</h2>
      <p style={pStyle}>
        For questions or concerns regarding these Terms &amp; Conditions, please contact us:
      </p>
      <p style={pStyle}>
        Y7 Consulting Inc d/b/a Y7 Logistics<br />
        Newton, MA, USA<br />
        Email:{' '}
        <a href="mailto:info@y7agency.com" style={linkStyle}>info@y7agency.com</a>
      </p>

      <hr style={dividerStyle} />

      {/* ── Disclaimer ── */}
      <p style={disclaimerStyle}>
        These Terms are for informational purposes and do not constitute legal advice. Consult your
        own attorney for legal guidance.
      </p>
    </div>
  );
}
