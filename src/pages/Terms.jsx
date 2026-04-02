import { Link } from 'react-router-dom';
import { colors, fonts } from '../theme';

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

export default function Terms() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '8px',
      }}>
        Terms &amp; Conditions
      </h1>
      <p style={{ ...pStyle, fontStyle: 'italic' }}>Last updated: 1 July 2025</p>
      <p style={pStyle}>
        Also see our{' '}
        <Link to="/privacy" style={{ color: colors.accent }}>Privacy Policy</Link> and{' '}
        <Link to="/accessibility" style={{ color: colors.accent }}>Accessibility Statement</Link>.
      </p>

      <h2 style={h2Style}>1. Agreement &amp; Acceptance</h2>
      <p style={pStyle}>
        By accessing y7agency.com, requesting a quote, booking a load, or texting/calling our phone numbers,
        you (&ldquo;Customer,&rdquo; &ldquo;Carrier,&rdquo; or &ldquo;User&rdquo;) agree to these Terms &amp;
        Conditions and to our Privacy Policy and Accessibility Statement. If you do not accept, do not use
        our website or services.
      </p>

      <h2 style={h2Style}>2. Who We Are</h2>
      <p style={pStyle}>
        Y7 Consulting Inc, DBA Y7 Logistics (&ldquo;Y7,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo;
        &ldquo;us&rdquo;) is a federally licensed property-broker (MC01741537, DOT # 4427359) specializing
        in arranging vehicle transportation between shippers (&ldquo;Shippers&rdquo;) and motor carriers
        (&ldquo;Carriers&rdquo;).
      </p>
      <p style={pStyle}>We do not operate trucks and are not responsible for carrier operations.</p>

      <h2 style={h2Style}>3. Services &amp; Quotes</h2>
      <p style={pStyle}>
        Quotes are estimates based on market conditions and are not binding until confirmed in writing via
        Rate Confirmation (&ldquo;Rate-Con&rdquo;).
      </p>
      <p style={pStyle}>
        Load postings on CentralDispatch or other load boards may be canceled or amended at any time before
        confirmation. Y7 reserves the right to refuse service to any party that does not meet our compliance
        or insurance standards.
      </p>

      <h2 style={h2Style}>4. Carrier Compliance</h2>
      <p style={pStyle}>Carriers must supply, before taking possession of any vehicle(s):</p>
      <ul style={ulStyle}>
        <li>Current Certificate of Insurance (COI) listing Y7 Logistics as certificate holder;</li>
        <li>Valid W-9 form;</li>
        <li>Driver&rsquo;s license(s) for operating driver(s);</li>
        <li>Signed ACH Authorization Form (for QuickPay or ACH payment).</li>
      </ul>
      <p style={pStyle}>
        Loads may be reassigned if documents are not provided within required timeframes.
      </p>

      <h2 style={h2Style}>5. Shipper Responsibilities</h2>
      <p style={pStyle}>
        Shippers certify that vehicles are legally owned or have release authority, that vehicles are ready
        for pick-up at the time stated, and that accurate condition reports are provided. Storage or
        re-delivery fees caused by inaccurate information are the Shipper&rsquo;s responsibility.
      </p>

      <h2 style={h2Style}>6. SMS Terms and Conditions</h2>
      <p style={pStyle}><strong>1 &mdash; SMS Consent Communication.</strong> Phone numbers obtained for SMS purposes will not be shared with third parties or affiliates for marketing.</p>
      <p style={pStyle}><strong>2 &mdash; Types of SMS Communications.</strong> After opt-in you may receive: (i) Conversational SMS confirming load details, (ii) Payment or invoice notices, (iii) Compliance document requests.</p>
      <p style={pStyle}><em>Example &mdash; &ldquo;Y7 Logistics: Load 81234 awarded for pickup on 7/22. Reply STOP to opt out.&rdquo;</em></p>
      <p style={pStyle}><strong>3 &mdash; Message Frequency.</strong> Up to 8 operational messages per active load; additional conversational messages as needed.</p>
      <p style={pStyle}><strong>4 &mdash; Fees.</strong> Standard carrier message &amp; data rates may apply. Charges depend on your mobile plan and may differ for international delivery.</p>
      <p style={pStyle}><strong>5 &mdash; Opt-In Method.</strong> You opt in by checking the SMS-consent box on any Y7 web form or by texting any Y7 number first.</p>
      <p style={pStyle}><strong>6 &mdash; Opt-Out Method.</strong> Text STOP at any time to cease messages. One final confirmation text will be sent.</p>
      <p style={pStyle}><strong>7 &mdash; Help.</strong> Text HELP for assistance, call (857) 895-8555, or email info@y7agency.com.</p>
      <p style={pStyle}><strong>8 &mdash; Standard Disclosures.</strong> Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out; HELP for help.</p>

      <h2 style={h2Style}>7. Payment Terms (Carriers)</h2>
      <p style={pStyle}>
        Standard terms: Net 15 days from receipt of clean Proof-of-Delivery (&ldquo;POD&rdquo;).
        QuickPay is available at a discount fee disclosed on the Rate-Con.
      </p>
      <p style={pStyle}>
        Any change to banking or payment details must be submitted in writing (email from authorized company
        domain) and is subject to verbal verification by Y7 Billing; changes requested by phone are rejected.
      </p>

      <h2 style={h2Style}>8. Liability &amp; Claims</h2>
      <p style={pStyle}>
        Y7 Logistics is not liable for loss, damage, or delay caused by the Carrier, force majeure, strikes,
        or governmental acts. All cargo claims must be filed directly with the Carrier. Y7 will assist but
        bears no cargo liability beyond U.S. federal brokerage rules.
      </p>

      <h2 style={h2Style}>9. Prohibited Conduct</h2>
      <p style={pStyle}>Users may not: (a) reverse-engineer or scrape our site; (b) post false load information; (c) use our name or brand without permission; (d) transmit malware or spam; (e) harass Y7 staff.</p>

      <h2 style={h2Style}>10. Intellectual Property</h2>
      <p style={pStyle}>
        All text, logos, images, and code on y7agency.com are the property of Y7 Logistics or its licensors.
        You may not copy or reuse without written consent.
      </p>

      <h2 style={h2Style}>11. Disclaimer of Warranties</h2>
      <p style={pStyle}>
        Website content is provided &ldquo;as is.&rdquo; We make no warranties, express or implied, regarding
        accuracy, availability, or fitness for a particular purpose. You use the site at your own risk.
      </p>

      <h2 style={h2Style}>12. Limitation of Liability</h2>
      <p style={pStyle}>
        To the maximum extent permitted by law, Y7 Logistics&rsquo; total liability arising out of or in
        connection with the site or services will not exceed USD $500 or the amount of brokerage earned on
        the specific load, whichever is less.
      </p>

      <h2 style={h2Style}>13. Indemnification</h2>
      <p style={pStyle}>
        You agree to indemnify and hold Y7 Logistics, its officers, and employees harmless from any claim,
        loss, or demand arising out of your breach of these T&amp;C or misuse of the site or services.
      </p>

      <h2 style={h2Style}>14. Governing Law &amp; Dispute Resolution</h2>
      <p style={pStyle}>
        These T&amp;C are governed by the laws of the Commonwealth of Massachusetts, USA. Any dispute will
        be resolved in the state or federal courts located in Boston, MA.
      </p>

      <h2 style={h2Style}>15. Changes to These Terms</h2>
      <p style={pStyle}>
        We may update these T&amp;C at any time. Changes become effective once posted with a new
        &ldquo;Last updated&rdquo; date. Continued use constitutes acceptance.
      </p>

      <h2 style={h2Style}>16. Contact</h2>
      <p style={pStyle}>
        Email info@y7agency.com or write to:<br />
        Y7 Consulting Inc, 1007 Chestnut St, Suite A, Newton, MA 02464, USA.
      </p>
    </div>
  );
}
