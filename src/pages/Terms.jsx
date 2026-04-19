import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import { LegalSection, MAX_SECTIONS, renderLines } from '../components/LegalSection';
import styles from './Legal.module.css';

export default function Terms() {
  const { t, i18n } = useTranslation('terms');
  const bundle = i18n.getResourceBundle(i18n.language, 'terms')
    || i18n.getResourceBundle('en', 'terms')
    || {};

  const title = bundle.title || 'Terms of Service';
  const version = bundle.version || '';
  const effectiveDate = bundle.effectiveDate || '';
  const intro = bundle.intro || '';

  return (
    <div className={styles.wrap}>
      <PageMeta
        title="Terms of Service"
        description="Terms of Service for Y7 Logistics auto transport brokerage services."
        path="/terms"
      />

      <section className={styles.hero}>
        <span className={styles.kicker}>&#9670; Legal</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>
          {version && <>Version {version}</>}
          {version && effectiveDate && ' · '}
          {effectiveDate && <>Effective {effectiveDate}</>}
        </p>
        <p className={styles.updated} style={{ marginTop: '6px' }}>
          Also see our <Link to="/privacy" className={styles.link}>Privacy Policy</Link> and{' '}
          <Link to="/accessibility" className={styles.link}>Accessibility Statement</Link>.
        </p>
      </section>

      <div className={styles.body}>
        {intro && renderLines(intro, styles)}

        {Array.from({ length: MAX_SECTIONS }, (_, i) => i + 1).map(i => {
          const sec = bundle[`section${i}`];
          if (!sec || typeof sec !== 'object') return null;
          return <LegalSection key={i} section={sec} styles={styles} />;
        })}

        <hr className={styles.divider} />

        <div className={styles.footerNote}>
          <em>
            These Terms are for informational purposes and do not constitute legal advice. Consult
            your own attorney for legal guidance.
          </em>
        </div>
      </div>
    </div>
  );
}
