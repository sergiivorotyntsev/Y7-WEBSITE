import { colors, fonts } from '../theme';

const h2Style = {
  fontFamily: fonts.serif,
  fontSize: '20px',
  fontWeight: 700,
  color: colors.text,
  marginTop: '36px',
  marginBottom: '12px',
};
const h3Style = {
  fontFamily: fonts.sans,
  fontSize: '15px',
  fontWeight: 600,
  color: colors.text,
  marginTop: '20px',
  marginBottom: '8px',
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

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '8px',
      }}>
        Privacy Policy &amp; SMS Terms
      </h1>
      <p style={{ ...pStyle, fontStyle: 'italic' }}>
        Y7 Consulting Inc (DBA Y7 Logistics) &mdash; Last updated: July 2025
      </p>

      <h2 style={h2Style}>1. Who We Are</h2>
      <p style={pStyle}>
        Y7 Consulting INC (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
        is a U.S.-based vehicle-transport brokerage, DBA Y7 Logistics. This Privacy Policy explains how we
        collect, use, disclose, and protect your personal information when you visit y7agency.com, use our
        services, or communicate with us by phone, SMS, email, or other channels.
      </p>

      <h2 style={h2Style}>2. What Personal Information We Collect</h2>

      <h3 style={h3Style}>Contact Information</h3>
      <p style={pStyle}>
        We collect your name, business name, mailing address, e-mail address, and telephone number when you
        submit a rate-quote request, open an account, or contact our dispatch team. We use this data to
        issue quotes and confirmations, create and maintain your account, and send operational updates by
        e-mail, SMS, or Telegram.
      </p>

      <h3 style={h3Style}>Load &amp; Transport Details</h3>
      <p style={pStyle}>
        When a shipment is booked, we receive the load ID, vehicle make/model/VIN, and the pick-up and
        delivery locations from the shipper or carrier. This information allows us to arrange and track your
        auto-transport, prepare dispatch sheets and bills of lading, and complete export or customs paperwork.
      </p>

      <h3 style={h3Style}>Regulatory Identifiers</h3>
      <p style={pStyle}>
        Motor-Carrier (MC) and USDOT numbers, certificates of insurance, W-9 forms, driver&rsquo;s-license
        images, EIN/SSN/ITIN, and similar documents are supplied by carriers and vendors. We use them for
        FMCSA safety vetting, compliance screening, and tax reporting.
      </p>

      <h3 style={h3Style}>Payment Information</h3>
      <p style={pStyle}>
        Bank routing and account numbers (ACH forms) and billing addresses are provided by carriers or
        clients so we can remit carrier pay, issue invoices, process refunds, and satisfy bookkeeping and
        IRS requirements.
      </p>

      <h3 style={h3Style}>Website &amp; Device Data</h3>
      <p style={pStyle}>
        When you browse our site, we automatically log your IP address, cookie identifiers, browser type,
        referring pages, and session timestamps. We use this data to secure the website, prevent fraud,
        improve performance, and compile non-identifiable usage analytics.
      </p>

      <h3 style={h3Style}>SMS Consent Records</h3>
      <p style={pStyle}>
        If you opt in to text messaging, we record your phone number, keyword or checkbox consent, and the
        date/time of opt-in. This record is required to show compliance with the TCPA, CTIA guidelines, and
        carrier (TCR) rules, and to manage STOP/HELP requests.
      </p>

      <h3 style={h3Style}>Communications &amp; Support History</h3>
      <p style={pStyle}>
        Call recordings, e-mail threads, chat transcripts, and voicemails created during customer-support
        interactions are stored for quality assurance, dispute resolution, staff training, and regulatory audits.
      </p>

      <p style={{ ...pStyle, fontWeight: 600, color: colors.text }}>
        We do not sell or rent personal data. SMS opt-in details and phone numbers are never shared with
        third parties or affiliates for marketing purposes.
      </p>

      <p style={pStyle}>
        Legal bases for processing: contract performance, legitimate business interests (e.g., fraud
        prevention), and compliance with federal and state law, including FMCSA, IRS, TCPA, and Mass.
        Gen. Laws ch. 93A.
      </p>

      <h2 style={h2Style}>3. How We Use Personal Information</h2>
      <p style={pStyle}><strong>To perform our brokerage services.</strong> We use contact and load details to provide rate quotes, secure transportation, issue dispatch instructions, and coordinate pick-up and delivery of vehicles.</p>
      <p style={pStyle}><strong>To vet and monitor carriers.</strong> Regulatory identifiers and insurance documents are reviewed to confirm FMCSA authority, safety ratings, and active coverage before a carrier is assigned to your load.</p>
      <p style={pStyle}><strong>To keep you informed.</strong> We send operational updates, invoices, payment confirmations, and the SMS notifications you request, using the communication channels you have consented to.</p>
      <p style={pStyle}><strong>To meet legal and regulatory obligations.</strong> Records are retained and disclosed as required by federal and Massachusetts law (e.g., IRS reporting, FMCSA audits, TCPA compliance) and to safeguard our contractual rights.</p>
      <p style={pStyle}><strong>To improve our site and services.</strong> Website and device data help us detect fraud, enhance performance, and analyse aggregated usage trends so we can refine the user experience.</p>

      <h2 style={h2Style}>4. Who We Share Information With</h2>
      <ul style={ulStyle}>
        <li>Service providers that process data on our behalf (e.g., RingCentral for calls/SMS, secure payment processors).</li>
        <li>Government or regulatory authorities when required by law.</li>
        <li>We do not sell or rent personal information. SMS opt-in data and phone numbers collected for SMS communication purposes will never be shared with any third party or affiliate for marketing purposes.</li>
        <li>We may disclose information to enforce our brokerage contracts, protect legal rights, or prevent fraud.</li>
      </ul>

      <h2 style={h2Style} id="sms">5. SMS Messaging Policy</h2>
      <p style={pStyle}>
        By opting in &mdash; either by checking the SMS-consent box on our forms or by texting us first &mdash;
        you authorize Y7 Consulting Inc. (d/b/a Y7 Logistics) to send conversational text messages about
        quotes, load status, documentation, and payments.
      </p>
      <p style={pStyle}><strong>Message frequency:</strong> varies with your shipments, up to 8 texts per active load.</p>
      <p style={pStyle}><strong>Charges:</strong> standard message and data rates may apply.</p>
      <p style={pStyle}><strong>Opt-out:</strong> text STOP at any time; you will receive one final confirmation text.</p>
      <p style={pStyle}><strong>Help:</strong> text HELP or e-mail info@y7agency.com.</p>

      <h2 style={h2Style}>6. Cookies &amp; Tracking</h2>
      <p style={pStyle}>
        We use first-party cookies and Google Analytics to understand traffic and improve our site. You can
        disable cookies in your browser; some features may not function.
      </p>

      <h2 style={h2Style}>7. Data Security</h2>
      <p style={pStyle}>
        We implement administrative, technical, and physical safeguards (TLS encryption, least-privilege
        access, 2FA) to protect your data. No method of transmission is 100% secure, but we strive to use
        commercially reasonable means.
      </p>

      <h2 style={h2Style}>8. Data Retention</h2>
      <p style={pStyle}>
        We keep records only as long as necessary for the purposes described or as required by law (FMCSA,
        IRS). Carrier payment records are retained for seven (7) years.
      </p>

      <h2 style={h2Style}>9. Your Rights</h2>
      <p style={pStyle}>
        Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the
        use of your personal information, and to opt out of marketing. Email privacy@y7agency.com with
        your request.
      </p>

      <h2 style={h2Style}>10. Contact &amp; Data-Protection Information</h2>
      <p style={pStyle}>
        Y7 Consulting Inc. (d/b/a Y7 Logistics)<br />
        1007 Chestnut St, Suite A, Newton, MA 02464, USA
      </p>
      <p style={pStyle}>
        Data-Protection &amp; Privacy Team: dispatch@y7agency.com<br />
        General inquiries: info@y7agency.com
      </p>

      <div style={{
        marginTop: '40px',
        padding: '24px',
        background: colors.bgMuted,
        borderRadius: '12px',
      }}>
        <h2 style={{ ...h2Style, marginTop: 0 }}>SMS Terms &amp; Conditions</h2>
        <p style={pStyle}>
          By submitting your phone number, you agree to receive operational text messages from Y7 Logistics.
          Message frequency may vary. Message &amp; data rates may apply. Text STOP to cancel, HELP for help.
          SMS consent is not shared with third parties.
        </p>
      </div>
    </div>
  );
}
