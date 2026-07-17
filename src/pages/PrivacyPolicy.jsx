import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import { LegalSection, MAX_SECTIONS, renderLines } from '../components/LegalSection';
import styles from './Legal.module.css';

export default function PrivacyPolicy() {
  const { i18n } = useTranslation('privacy');
  const bundle = i18n.getResourceBundle(i18n.language, 'privacy')
    || i18n.getResourceBundle('en', 'privacy')
    || {};

  const title = bundle.title || 'Privacy Policy';
  const version = bundle.version || '';
  const effectiveDate = bundle.effectiveDate || '';
  const intro = bundle.intro || '';

  return (
    <div className={styles.wrap}>
      <PageMeta
        title="Privacy Policy"
        description="Y7 Consulting Inc d/b/a Y7 Logistics privacy policy. Data collection, SMS terms, your rights."
        path="/privacy"
      />

      <section className={styles.hero}>
        <span className={styles.kicker}>Legal</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>
          {version && <>Version {version}</>}
          {version && effectiveDate && ' · '}
          {effectiveDate && <>Effective {effectiveDate}</>}
        </p>
      </section>

      <div className={styles.body}>
        {intro && renderLines(intro, styles)}

        {Array.from({ length: MAX_SECTIONS }, (_, i) => i + 1).map(i => {
          const sec = bundle[`section${i}`];
          if (!sec || typeof sec !== 'object') return null;
          return <LegalSection key={i} section={sec} styles={styles} />;
        })}

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
