import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import styles from './Legal.module.css';

export default function PrivacyPolicy() {
  return (
    <div className={styles.wrap}>
      <PageMeta
        title="Privacy Policy"
        description="Y7 Consulting Inc d/b/a Y7 Logistics privacy policy. Data collection, SMS terms, your rights."
        path="/privacy"
      />

      <section className={styles.hero}>
        <span className={styles.kicker}>&#9670; Legal</span>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last Updated: April 3, 2026</p>
      </section>

      <div className={styles.body}>
        <h2 className={styles.h2}>1. Introduction</h2>
        <p className={styles.p}>
          Y7 Consulting Inc d/b/a Y7 Logistics (&ldquo;Y7,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
          or &ldquo;our&rdquo;) operates the website located at{' '}
          <Link to="/" className={styles.link}>www.y7agency.com</Link>.
          We are a licensed property broker under the Federal Motor Carrier Safety Administration (FMCSA),
          USDOT #4427359 | MC #1741537. This Privacy Policy describes how we collect, use, and protect
          your information when you visit our website, use our services, or otherwise interact with us.
        </p>

        <h2 className={styles.h2}>2. Information We Collect</h2>
        <p className={styles.p}><span className={styles.strong}>Information you provide directly:</span></p>
        <ul className={styles.ul}>
          <li>Name, email address, phone number, and company name</li>
          <li>Delivery and pick-up addresses</li>
          <li>Vehicle information, including VIN, year, make, and model</li>
          <li>Payment and billing information</li>
        </ul>
        <p className={styles.p}><span className={styles.strong}>Information collected automatically:</span></p>
        <ul className={styles.ul}>
          <li>IP address, browser type, and device information</li>
          <li>Pages visited, referral URL, and session data</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
        <p className={styles.p}><span className={styles.strong}>Information from third-party services:</span></p>
        <ul className={styles.ul}>
          <li>Telegram (for shipment communication)</li>
          <li>Google Analytics (for website usage analytics)</li>
        </ul>

        <h2 className={styles.h2}>3. How We Use Your Information</h2>
        <p className={styles.p}>We use the information we collect for the following purposes:</p>
        <ul className={styles.ul}>
          <li>Processing quotes, orders, and service requests</li>
          <li>Arranging vehicle transport with authorized carriers</li>
          <li>Communicating with you about shipments via email, SMS (where you have provided explicit consent), and Telegram</li>
          <li>Sending operational updates, invoices, and delivery confirmations</li>
          <li>Improving our website, services, and user experience</li>
          <li>Complying with applicable legal and regulatory obligations</li>
        </ul>

        <h2 className={styles.h2} id="sms">4. SMS/Text Message Terms</h2>
        <p className={styles.p}>
          By checking the SMS consent checkbox on our forms, you expressly authorize Y7 Consulting Inc
          d/b/a Y7 Logistics to send you text messages related to your shipment. SMS consent is obtained
          through a clear, affirmative opt-in action and is never assumed.
        </p>
        <p className={styles.p}>
          <span className={styles.strong}>Types of messages:</span> Shipment status updates, assigned carrier
          information, delivery confirmations, and other operational notifications directly related to
          your transport order.
        </p>
        <p className={styles.p}>
          <span className={styles.strong}>Message frequency:</span> You may receive approximately 3 to 8 text
          messages per shipment, depending on the nature and status of your transport.
        </p>
        <p className={styles.p}>
          <span className={styles.strong}>Rates:</span> Standard message and data rates may apply. Please
          consult your wireless carrier for details regarding your messaging plan.
        </p>
        <p className={styles.p}>
          <span className={styles.strong}>Opt-out:</span> You may opt out of receiving text messages at any
          time by replying <strong>STOP</strong> to any message. You will receive a single confirmation
          message acknowledging your opt-out request.
        </p>
        <p className={styles.p}>
          <span className={styles.strong}>Help:</span> For assistance, reply <strong>HELP</strong> to any
          message or contact us at{' '}
          <a href="mailto:info@y7agency.com" className={styles.link}>info@y7agency.com</a>.
        </p>
        <p className={styles.p}>
          SMS consent is <strong>not</strong> a condition of purchasing any service from Y7 Logistics.
          You may use our services without opting in to text messages.
        </p>
        <p className={styles.p} style={{ fontWeight: 600, color: 'var(--text)' }}>
          We do not sell, share, or distribute your phone number or SMS consent information to third
          parties or affiliates for marketing or any other purpose.
        </p>

        <h2 className={styles.h2}>5. Information Sharing</h2>
        <p className={styles.p}>We may share your information with the following parties, solely as necessary to provide our services:</p>
        <ul className={styles.ul}>
          <li><span className={styles.strong}>Carriers:</span> Vehicle details, pick-up and delivery addresses, and contact information are shared with carriers assigned to fulfill your transport order.</li>
          <li><span className={styles.strong}>Payment processors:</span> Billing and payment information is transmitted to secure, third-party payment processors to complete transactions.</li>
          <li><span className={styles.strong}>Government and regulatory authorities:</span> We may disclose information when required to do so by law, regulation, or lawful government request.</li>
        </ul>
        <p className={styles.p} style={{ fontWeight: 600, color: 'var(--text)' }}>
          We do not sell your personal data. We do not share your information with third parties for
          marketing purposes.
        </p>

        <h2 className={styles.h2}>6. Cookies &amp; Tracking</h2>
        <p className={styles.p}>Our website uses the following categories of cookies and tracking technologies:</p>
        <ul className={styles.ul}>
          <li><span className={styles.strong}>Essential cookies:</span> Required for core website functionality, including session management and authentication.</li>
          <li><span className={styles.strong}>Analytics cookies:</span> We use Google Analytics 4 (GA4) with IP anonymization enabled to understand website traffic and usage patterns.</li>
        </ul>
        <p className={styles.p}>
          We do not use advertising or third-party marketing cookies. You may disable cookies through
          your browser settings at any time; however, certain website features may not function properly
          if cookies are disabled.
        </p>

        <h2 className={styles.h2}>7. Data Retention</h2>
        <p className={styles.p}>We retain your information in accordance with our legal and regulatory obligations:</p>
        <ul className={styles.ul}>
          <li>Account and financial records: seven (7) years, as required by the Internal Revenue Service (IRS)</li>
          <li>Transport and shipment records: three (3) years, in compliance with FMCSA regulations</li>
          <li>Communication logs: three (3) years</li>
        </ul>
        <p className={styles.p}>
          You may request deletion of your personal information at any time. Please note that certain
          data may be retained as required by applicable law, even after a deletion request is fulfilled.
        </p>

        <h2 className={styles.h2}>8. Your Rights</h2>
        <p className={styles.p}>Depending on your jurisdiction, you may have the right to:</p>
        <ul className={styles.ul}>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate or incomplete information</li>
          <li>Request deletion of your personal information, subject to applicable legal retention requirements</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>
        <p className={styles.p}>
          <span className={styles.strong}>California residents:</span> Under the California Consumer Privacy
          Act (CCPA), you have the right to know what personal information we collect, to request
          deletion of your personal information, and to opt out of the sale of your personal
          information. We do not sell personal information. To exercise any of these rights, please
          contact us at{' '}
          <a href="mailto:info@y7agency.com" className={styles.link}>info@y7agency.com</a>.
        </p>

        <h2 className={styles.h2}>9. Data Security</h2>
        <p className={styles.p}>
          We implement industry-standard security measures to protect your personal information, including:
        </p>
        <ul className={styles.ul}>
          <li>HTTPS/TLS encryption for all data transmitted between your browser and our servers</li>
          <li>Encryption of data at rest</li>
          <li>Role-based access controls limiting data access to authorized personnel</li>
          <li>Regular security reviews and assessments</li>
        </ul>
        <p className={styles.p}>
          While no method of electronic transmission or storage is completely secure, we are committed
          to maintaining commercially reasonable safeguards to protect your data.
        </p>

        <h2 className={styles.h2}>10. Children&rsquo;s Privacy</h2>
        <p className={styles.p}>
          Our website and services are not directed to individuals under the age of 13. We do not
          knowingly collect personal information from children under 13. If we become aware that we
          have inadvertently collected personal information from a child under 13, we will take prompt
          steps to delete such information.
        </p>

        <h2 className={styles.h2}>11. Changes to This Policy</h2>
        <p className={styles.p}>
          We may update this Privacy Policy from time to time to reflect changes in our practices,
          services, or applicable law. When we make changes, we will revise the &ldquo;Last
          Updated&rdquo; date at the top of this page. We encourage you to review this Privacy Policy
          periodically to stay informed about how we protect your information.
        </p>

        <h2 className={styles.h2}>12. Contact</h2>
        <p className={styles.p}>
          If you have questions or concerns about this Privacy Policy or our data practices, please
          contact us:
        </p>
        <p className={styles.p}>
          Y7 Consulting Inc d/b/a Y7 Logistics<br />
          Newton, MA, USA<br />
          <a href="mailto:info@y7agency.com" className={styles.link}>info@y7agency.com</a>
        </p>

        <div className={styles.footerNote}>
          <em>
            This Privacy Policy is for informational purposes and does not constitute legal advice.
            Consult your own attorney for legal guidance.
          </em>
        </div>
      </div>
    </div>
  );
}
