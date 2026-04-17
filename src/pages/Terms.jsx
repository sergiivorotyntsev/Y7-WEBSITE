import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import styles from './Legal.module.css';

export default function Terms() {
  return (
    <div className={styles.wrap}>
      <PageMeta
        title="Terms & Conditions"
        description="Terms and Conditions for Y7 Logistics auto transport brokerage services."
        path="/terms"
      />

      <section className={styles.hero}>
        <span className={styles.kicker}>&#9670; Legal</span>
        <h1 className={styles.title}>Terms &amp; Conditions</h1>
        <p className={styles.updated}>
          Also see our <Link to="/privacy" className={styles.link}>Privacy Policy</Link> and{' '}
          <Link to="/accessibility" className={styles.link}>Accessibility Statement</Link>.
        </p>
      </section>

      <div className={styles.body}>

      {/* ── 1. Last Updated ── */}
      <h2 className={styles.h2}>1. Last Updated</h2>
      <p className={styles.p}>
        These Terms &amp; Conditions were last updated on <strong className={styles.strong}>April 3, 2026</strong>.
      </p>

      {/* ── 2. Acceptance of Terms ── */}
      <h2 className={styles.h2}>2. Acceptance of Terms</h2>
      <p className={styles.p}>
        By accessing www.y7agency.com or using any services provided by Y7 Consulting Inc
        d/b/a Y7 Logistics (&ldquo;Y7,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;),
        you (&ldquo;Customer,&rdquo; &ldquo;you,&rdquo; &ldquo;your&rdquo;) agree to be bound by these
        Terms &amp; Conditions. If you do not agree to these Terms, do not access or use our website
        or services.
      </p>

      {/* ── 3. Company Information ── */}
      <h2 className={styles.h2}>3. Company Information</h2>
      <p className={styles.p}>
        Y7 Consulting Inc, doing business as Y7 Logistics, is a federally licensed property
        <strong className={styles.strong}> broker</strong>, <strong className={styles.strong}>NOT</strong> a motor
        carrier. We operate under the following federal authority:
      </p>
      <ul className={styles.ul}>
        <li>USDOT #4427359</li>
        <li>MC #1741537</li>
        <li>$75,000 surety bond (BMC-84)</li>
        <li>Principal location: Newton, MA, USA</li>
      </ul>

      {/* ── 4. Broker Disclosure (49 CFR 371.3) ── */}
      <h2 className={styles.h2}>4. Broker Disclosure (49 CFR 371.3)</h2>
      <p className={styles.p}>
        In accordance with 49 CFR &sect; 371.3, Y7 Logistics is a licensed property{' '}
        <strong className={styles.strong}>broker</strong> registered with the Federal Motor Carrier Safety
        Administration (FMCSA). Y7 does <strong className={styles.strong}>NOT</strong> transport vehicles
        itself. We arrange for the transportation of motor vehicles through FMCSA-authorized motor
        carriers. All carriers engaged through Y7 are independent contractors and are{' '}
        <strong className={styles.strong}>NOT</strong> employees, agents, or representatives of Y7 Consulting
        Inc.
      </p>

      {/* ── 5. Services ── */}
      <h2 className={styles.h2}>5. Services</h2>
      <p className={styles.p}>
        Y7 Logistics provides freight <strong className={styles.strong}>brokerage</strong> services for the
        transportation of motor vehicles. Our services include, but are not limited to:
      </p>
      <ul className={styles.ul}>
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
      <p className={styles.p}>
        All quotes provided by Y7 are estimates only and do not constitute binding offers until a
        carrier has been assigned and the final price has been confirmed.
      </p>

      {/* ── 6. Quotes & Pricing ── */}
      <h2 className={styles.h2}>6. Quotes &amp; Pricing</h2>
      <p className={styles.p}>
        All quotes are estimates based on current market conditions at the time of inquiry. The
        final transportation price is confirmed only when a carrier has been assigned and dispatch
        has been coordinated. Pricing may vary based on:
      </p>
      <ul className={styles.ul}>
        <li>Route distance and geography;</li>
        <li>Vehicle type, size, and condition (operable vs. inoperable);</li>
        <li>Transport type (open vs. enclosed);</li>
        <li>Seasonal demand and market availability.</li>
      </ul>
      <p className={styles.p}>
        Unless otherwise stated in writing, all quotes are valid for <strong className={styles.strong}>48
        hours</strong> from the time of issuance.
      </p>

      {/* ── 7. Payment Terms ── */}
      <h2 className={styles.h2}>7. Payment Terms</h2>
      <p className={styles.p}>
        Y7 Logistics offers the following payment structures:
      </p>
      <ul className={styles.ul}>
        <li>
          <strong className={styles.strong}>Prepay (Broker-Paid):</strong> Payment is remitted to Y7 via
          Zelle, wire transfer, or ACH prior to carrier dispatch.
        </li>
        <li>
          <strong className={styles.strong}>COD (Cash on Delivery):</strong> The customer pays the carrier
          directly at the time of vehicle delivery.
        </li>
      </ul>
      <p className={styles.p}>Accepted payment methods include:</p>
      <ul className={styles.ul}>
        <li>Zelle</li>
        <li>Wire transfer</li>
        <li>ACH (Automated Clearing House)</li>
        <li>Cashier&rsquo;s check</li>
      </ul>
      <p className={styles.p}>
        Late or outstanding payments may result in a hold on current or future shipments.
        Non-payment at the time of COD delivery may result in the carrier exercising lien rights
        over the vehicle in accordance with applicable state and federal law.
      </p>

      {/* ── 8. Cancellation Policy ── */}
      <h2 className={styles.h2}>8. Cancellation Policy</h2>
      <ul className={styles.ul}>
        <li>
          <strong className={styles.strong}>Before carrier assignment:</strong> Cancellation is free of
          charge.
        </li>
        <li>
          <strong className={styles.strong}>After carrier assignment:</strong> A cancellation fee of up to
          $200 may apply to cover carrier costs and administrative expenses.
        </li>
        <li>
          <strong className={styles.strong}>No-show:</strong> If the customer or vehicle is unavailable at
          the scheduled pickup and no prior notice is given, the full transport fee may be charged.
        </li>
        <li>
          <strong className={styles.strong}>Carrier-initiated cancellation:</strong> If a carrier cancels
          after assignment, the customer is entitled to a full refund of any prepaid amounts.
        </li>
      </ul>

      {/* ── 9. Vehicle Condition & Inspection ── */}
      <h2 className={styles.h2}>9. Vehicle Condition &amp; Inspection</h2>
      <p className={styles.p}>
        The customer must accurately describe the condition of the vehicle at the time of booking,
        including but not limited to operability, existing damage, and modifications. The carrier
        will conduct a visual inspection at the time of pickup and note any pre-existing damage on
        the Bill of Lading (BOL).
      </p>
      <p className={styles.p}>
        <strong className={styles.strong}>
          The customer MUST inspect the vehicle at delivery WITH the carrier present before signing
          the BOL.
        </strong>{' '}
        A signed BOL with no noted damage constitutes acceptance of the vehicle in its delivered
        condition. Any claims for damage not noted on the BOL at the time of delivery are the sole
        responsibility of the customer.
      </p>

      {/* ── 10. Insurance & Liability ── */}
      <h2 className={styles.h2}>10. Insurance &amp; Liability</h2>
      <p className={styles.p}>
        All carriers arranged through Y7 Logistics are required to maintain a minimum of $750,000
        in general liability coverage and $100,000 or more in cargo insurance. Y7 verifies each
        carrier&rsquo;s Certificate of Insurance (COI) prior to dispatch.
      </p>
      <p className={styles.p}>
        Y7 Logistics&rsquo; liability is <strong className={styles.strong}>strictly limited</strong> to the
        brokerage fee charged for the applicable shipment. Y7 is <strong className={styles.strong}>NOT
        </strong> liable for damage, theft, fire, loss, delay, loss of personal items, or acts of
        God occurring during transport. All claims for cargo damage or loss must be filed directly
        with the carrier within <strong className={styles.strong}>24 hours</strong> of delivery. Y7 will
        assist the customer in the claim-filing process as a courtesy but assumes no financial
        responsibility for the outcome.
      </p>

      {/* ── 11. Personal Items ── */}
      <h2 className={styles.h2}>11. Personal Items</h2>
      <p className={styles.p}>
        Y7 Logistics is <strong className={styles.strong}>NOT</strong> responsible for personal items left
        inside the vehicle during transport. Personal belongings are{' '}
        <strong className={styles.strong}>NOT</strong> covered by the carrier&rsquo;s cargo insurance policy.
        Customers must remove all personal belongings from the vehicle prior to pickup. If personal
        items remain in the vehicle, the customer assumes all risk of loss, damage, or theft.
      </p>

      {/* ── 12. Limitation of Liability ── */}
      <h2 className={styles.h2}>12. Limitation of Liability</h2>
      <p className={styles.p}>
        To the maximum extent permitted by applicable law, Y7 Consulting Inc&rsquo;s total aggregate
        liability arising out of or in connection with these Terms or the services provided shall
        not exceed the total brokerage fees paid by the customer for the specific shipment giving
        rise to the claim.
      </p>
      <p className={styles.p}>
        In no event shall Y7 be liable for any indirect, incidental, consequential, special, or
        punitive damages, including but not limited to lost profits, loss of use, or business
        interruption. Y7 shall not be liable for any acts, omissions, delays, or negligence of any
        carrier or third party.
      </p>

      {/* ── 13. Indemnification ── */}
      <h2 className={styles.h2}>13. Indemnification</h2>
      <p className={styles.p}>
        The customer agrees to indemnify, defend, and hold harmless Y7 Consulting Inc, its
        officers, directors, employees, and agents from and against any and all claims, damages,
        losses, liabilities, costs, and expenses (including reasonable attorney&rsquo;s fees)
        arising out of or related to:
      </p>
      <ul className={styles.ul}>
        <li>Inaccurate or misleading vehicle information provided by the customer;</li>
        <li>Failure to inspect the vehicle at delivery with the carrier present;</li>
        <li>Unauthorized cargo or personal items left inside the vehicle;</li>
        <li>Any breach of these Terms &amp; Conditions by the customer.</li>
      </ul>

      {/* ── 14. Force Majeure ── */}
      <h2 className={styles.h2}>14. Force Majeure</h2>
      <p className={styles.p}>
        Y7 Logistics shall not be liable for any failure or delay in performance resulting from
        causes beyond its reasonable control, including but not limited to: severe weather, natural
        disasters, government actions or regulations, war, terrorism, pandemic, road closures,
        mechanical breakdown of carrier equipment, or traffic conditions.
      </p>
      <p className={styles.p}>
        All estimated pickup and delivery dates are <strong className={styles.strong}>NOT guaranteed</strong>.
        Dates provided are approximations based on standard transit times and are subject to change
        without notice.
      </p>

      {/* ── 15. Dispute Resolution ── */}
      <h2 className={styles.h2}>15. Dispute Resolution</h2>
      <p className={styles.p}>
        In the event of a dispute arising under or in connection with these Terms, the parties shall
        first attempt to resolve the matter through good-faith negotiation for a period of thirty
        (30) days. If the dispute cannot be resolved through negotiation, it shall be submitted to
        binding arbitration administered in Suffolk County, Massachusetts.
      </p>
      <p className={styles.p}>
        These Terms shall be governed by and construed in accordance with the laws of the
        Commonwealth of Massachusetts, without regard to conflict-of-law principles. The prevailing
        party in any arbitration or legal proceeding shall be entitled to recover reasonable
        attorney&rsquo;s fees and costs.
      </p>
      <p className={styles.p}>
        <strong className={styles.strong}>
          The customer waives any right to participate in a class action lawsuit or class-wide
          arbitration against Y7 Consulting Inc.
        </strong>
      </p>

      {/* ── 16. Intellectual Property ── */}
      <h2 className={styles.h2}>16. Intellectual Property</h2>
      <p className={styles.p}>
        All content, design, graphics, code, and materials displayed on www.y7agency.com are the
        exclusive property of Y7 Consulting Inc and are protected by applicable intellectual
        property laws. All trademarks, service marks, and trade names used on this website are the
        property of Y7 Consulting Inc. Use of any Y7 trademarks or intellectual property without
        prior written permission is strictly prohibited.
      </p>

      {/* ── 17. Third-Party Links ── */}
      <h2 className={styles.h2}>17. Third-Party Links</h2>
      <p className={styles.p}>
        Our website may contain links to third-party websites or services that are not owned or
        controlled by Y7 Consulting Inc. Y7 is not responsible for the content, privacy policies,
        or practices of any third-party websites. Accessing third-party links is at the
        customer&rsquo;s own risk.
      </p>

      {/* ── 18. Severability ── */}
      <h2 className={styles.h2}>18. Severability</h2>
      <p className={styles.p}>
        If any provision of these Terms &amp; Conditions is found to be invalid, illegal, or
        unenforceable by a court of competent jurisdiction, the remaining provisions shall continue
        in full force and effect. The invalid provision shall be modified to the minimum extent
        necessary to make it valid and enforceable while preserving its original intent.
      </p>

      {/* ── 19. Entire Agreement ── */}
      <h2 className={styles.h2}>19. Entire Agreement</h2>
      <p className={styles.p}>
        These Terms &amp; Conditions, together with the{' '}
        <Link to="/privacy" className={styles.link}>Privacy Policy</Link> and any applicable Transport
        Service Agreement, constitute the entire agreement between the customer and Y7 Consulting
        Inc with respect to the use of our website and services. These Terms supersede all prior or
        contemporaneous communications, representations, or agreements, whether oral or written.
      </p>

      {/* ── 20. Contact ── */}
      <h2 className={styles.h2}>20. Contact</h2>
      <p className={styles.p}>
        For questions or concerns regarding these Terms &amp; Conditions, please contact us:
      </p>
      <p className={styles.p}>
        Y7 Consulting Inc d/b/a Y7 Logistics<br />
        Newton, MA, USA<br />
        Email:{' '}
        <a href="mailto:info@y7agency.com" className={styles.link}>info@y7agency.com</a>
      </p>

        <hr className={styles.divider} />

        <div className={styles.footerNote}>
          <em>
            These Terms are for informational purposes and do not constitute legal advice. Consult your
            own attorney for legal guidance.
          </em>
        </div>
      </div>
    </div>
  );
}
