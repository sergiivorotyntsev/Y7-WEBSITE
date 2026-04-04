import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
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
const linkStyle = {
  color: colors.accent,
  textDecoration: 'none',
};

export default function Accessibility() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta
        title="Accessibility"
        description="Y7 Logistics accessibility commitment and WCAG 2.1 Level AA compliance."
        path="/accessibility"
      />
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '8px',
      }}>
        Accessibility Statement
      </h1>
      <p style={{ ...pStyle, fontStyle: 'italic' }}>Last updated: April 3, 2026</p>

      <h2 style={h2Style}>Our Commitment</h2>
      <p style={pStyle}>
        Y7 Logistics is committed to ensuring digital accessibility for people with disabilities.
        We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA conformance.
      </p>

      <h2 style={h2Style}>What We've Done</h2>
      <p style={pStyle}>We have implemented the following accessibility measures:</p>
      <ul style={ulStyle}>
        <li>ARIA labels and roles for interactive elements</li>
        <li>Skip navigation link for keyboard users</li>
        <li>Full keyboard navigation support throughout the site</li>
        <li>Semantic HTML structure (headings, landmarks, lists)</li>
        <li>Sufficient color contrast ratios (minimum 4.5:1 for text)</li>
        <li>Descriptive alt text for meaningful images</li>
        <li>Form labels and error messages associated with inputs</li>
        <li>Focus indicators for keyboard navigation</li>
        <li>Responsive design that works with screen magnification</li>
        <li>No content that flashes more than 3 times per second</li>
      </ul>

      <h2 style={h2Style}>Known Limitations</h2>
      <ul style={ulStyle}>
        <li>Some third-party embedded content may not be fully accessible</li>
        <li>
          PDF documents may have limited accessibility — contact us for accessible
          alternatives
        </li>
        <li>Some legacy content may not yet meet all WCAG 2.1 AA criteria</li>
      </ul>

      <h2 style={h2Style}>Feedback</h2>
      <p style={pStyle}>
        We welcome feedback on the accessibility of our website. If you encounter any barriers,
        please email us at{' '}
        <a href="mailto:info@y7agency.com" style={linkStyle}>info@y7agency.com</a>{' '}
        with the following details:
      </p>
      <ul style={ulStyle}>
        <li>A description of the issue</li>
        <li>The URL of the page where you experienced the problem</li>
        <li>Your device and browser information</li>
      </ul>
      <p style={pStyle}>We aim to respond within 5 business days.</p>

      <h2 style={h2Style}>Third-Party Content</h2>
      <p style={pStyle}>
        We do not control the accessibility of linked external websites or third-party services.
      </p>

      <h2 style={h2Style}>Continuous Improvement</h2>
      <p style={pStyle}>
        We regularly review and test our website for accessibility compliance and are committed
        to ongoing improvements.
      </p>

      <p style={{ ...pStyle, marginTop: '36px' }}>
        Also see our{' '}
        <Link to="/terms" style={linkStyle}>Terms &amp; Conditions</Link> and{' '}
        <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>.
      </p>
    </div>
  );
}
