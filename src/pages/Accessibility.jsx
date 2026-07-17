import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import styles from './Legal.module.css';

export default function Accessibility() {
  return (
    <div className={styles.wrap}>
      <PageMeta
        title="Accessibility"
        description="Y7 Logistics accessibility commitment and WCAG 2.1 Level AA compliance."
        path="/accessibility"
      />

      <section className={styles.hero}>
        <span className={styles.kicker}>Legal</span>
        <h1 className={styles.title}>Accessibility Statement</h1>
        <p className={styles.updated}>Last updated: April 3, 2026</p>
      </section>

      <div className={styles.body}>
        <h2 className={styles.h2}>Our Commitment</h2>
        <p className={styles.p}>
          Y7 Logistics is committed to ensuring digital accessibility for people with disabilities.
          We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA conformance.
        </p>

        <h2 className={styles.h2}>What We've Done</h2>
        <p className={styles.p}>We have implemented the following accessibility measures:</p>
        <ul className={styles.ul}>
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

        <h2 className={styles.h2}>Known Limitations</h2>
        <ul className={styles.ul}>
          <li>Some third-party embedded content may not be fully accessible</li>
          <li>PDF documents may have limited accessibility — contact us for accessible alternatives</li>
          <li>Some legacy content may not yet meet all WCAG 2.1 AA criteria</li>
        </ul>

        <h2 className={styles.h2}>Feedback</h2>
        <p className={styles.p}>
          We welcome feedback on the accessibility of our website. If you encounter any barriers,
          please email us at{' '}
          <a href="mailto:info@y7agency.com" className={styles.link}>info@y7agency.com</a>{' '}
          with the following details:
        </p>
        <ul className={styles.ul}>
          <li>A description of the issue</li>
          <li>The URL of the page where you experienced the problem</li>
          <li>Your device and browser information</li>
        </ul>
        <p className={styles.p}>We aim to respond within 5 business days.</p>

        <h2 className={styles.h2}>Third-Party Content</h2>
        <p className={styles.p}>
          We do not control the accessibility of linked external websites or third-party services.
        </p>

        <h2 className={styles.h2}>Continuous Improvement</h2>
        <p className={styles.p}>
          We regularly review and test our website for accessibility compliance and are committed
          to ongoing improvements.
        </p>

        <div className={styles.footerNote}>
          Also see our{' '}
          <Link to="/terms" className={styles.link}>Terms &amp; Conditions</Link> and{' '}
          <Link to="/privacy" className={styles.link}>Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}
