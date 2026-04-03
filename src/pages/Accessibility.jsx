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

export default function Accessibility() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '8px',
      }}>
        Accessibility Statement
      </h1>
      <p style={{ ...pStyle, fontStyle: 'italic' }}>Last reviewed: 1 July 2025</p>
      <p style={pStyle}>
        Also see our{' '}
        <Link to="/terms" style={{ color: colors.accent }}>Terms &amp; Conditions</Link>.
      </p>

      <h2 style={h2Style}>1. Our Commitment</h2>
      <p style={pStyle}>
        Y7 Consulting Inc is committed to ensuring that our website, y7agency.com, is accessible to everyone,
        including people with disabilities. We strive to comply with the Web Content Accessibility Guidelines
        (WCAG) 2.1 at Level AA and to meet the requirements of the U.S. Americans with Disabilities Act
        (ADA), Section 508, and comparable international standards.
      </p>

      <h2 style={h2Style}>2. Accessibility Features in Place</h2>
      <p style={pStyle}>We have implemented, or are actively rolling out, the following:</p>
      <ul style={ulStyle}>
        <li><strong>Text alternatives</strong> &mdash; meaningful alt text for all images and icons.</li>
        <li><strong>Keyboard navigation</strong> &mdash; all menus, forms, and interactive elements can be reached via the Tab key; &ldquo;Skip to Main Content&rdquo; link is provided at the top of each page.</li>
        <li><strong>Readable design</strong> &mdash; color palette and typography meet or exceed 4.5:1 contrast for text; font sizes are resizable in modern browsers.</li>
        <li><strong>Form labeling &amp; ARIA</strong> &mdash; every input has an associated label; error states include aria-invalid and descriptive messages.</li>
        <li><strong>Logical heading order</strong> &mdash; pages use consistent h1 through h6 hierarchy for screen-reader orientation.</li>
        <li><strong>Captions &amp; transcripts</strong> &mdash; any video or audio we publish includes open captions or a downloadable transcript.</li>
        <li><strong>Responsive &amp; zoom-friendly layout</strong> &mdash; content reflows without loss of functionality at 200% zoom on desktop and on small mobile screens.</li>
        <li><strong>Automated &amp; manual audits</strong> &mdash; we run Axe DevTools, WAVE, and Lighthouse scans each release and conduct quarterly manual testing with NVDA, VoiceOver, and keyboard-only navigation.</li>
      </ul>

      <h2 style={h2Style}>3. Ongoing Improvements</h2>
      <p style={pStyle}>
        Accessibility is a continuous process. We schedule code reviews for new components and re-test after
        major content changes. External content or third-party plug-ins (e.g., Google Maps) may not yet meet
        the same standards; we work with providers to encourage compliance or to offer accessible alternatives.
      </p>

      <h2 style={h2Style}>4. Feedback &amp; Assistance</h2>
      <p style={pStyle}>
        If you encounter any accessibility barrier on y7agency.com or need content in an alternative format
        (large print, tagged PDF, or plain text), please contact us:
      </p>
      <ul style={ulStyle}>
        <li>Email: <a href="mailto:info@y7agency.com" style={{ color: colors.accent }}>info@y7agency.com</a></li>
        <li>Telegram: <a href="https://t.me/y7dispatch_bot" target="_blank" rel="noopener noreferrer" style={{ color: colors.accent }}>@y7dispatch_bot</a></li>
        <li>Mail: Accessibility Team, Y7 Consulting Inc, 1007 Chestnut St, Suite A, Newton, MA 02464, USA</li>
      </ul>
      <p style={pStyle}>
        We aim to respond within 24 hours on business days and to resolve issues within a reasonable timeframe.
      </p>

      <h2 style={h2Style}>5. Compatibility</h2>
      <p style={pStyle}>
        This site is designed to work with the latest versions of major browsers (Chrome, Edge, Firefox,
        Safari) and assistive technologies (screen readers, voice input, screen-magnifiers). JavaScript and
        CSS must be enabled for full functionality; core information remains available without motion or
        time-based content.
      </p>

      <h2 style={h2Style}>6. Date</h2>
      <p style={pStyle}>
        This statement was last reviewed on 1 July 2025. Future updates will be logged at the top of this page.
      </p>
    </div>
  );
}
