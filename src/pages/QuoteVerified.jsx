import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { CheckIcon } from '../components/icons';
import styles from './QuoteVerified.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';

// DESIGN-V2-W5-T02: Dispatch Board restyle of the page shell. Single board
// band (utility confirmation page, noindex): panel-steel card, condensed
// heading, Bonded Pine check (success/verified state only, per DESIGN.md §3),
// gradient CTA + ghost pair. Heading text/level, i18n keys, link targets and
// robots meta unchanged. Signal Budget: the gradient CTA is the viewport's
// one red fill; no red accents elsewhere. No entrance animations (static).
export default function QuoteVerified() {
  const { t } = useTranslation('quote');
  return (
    <>
      <Helmet>
        <title>{t('verification.verified.pageTitle')}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className={v2s.board}>
        <div className={`${v2s.inner} ${styles.inner}`}>
          <div className={`${v2s.panel} ${styles.card}`}>
            <div className={styles.iconCircle}>
              <CheckIcon size={36} color="var(--success, #0F6E56)" />
            </div>
            <h1 className={`${v2t.sectionDisplay} ${styles.heading}`}>
              {t('verification.verified.heading')}
            </h1>
            <p className={styles.body}>
              {t('verification.verified.body')}
            </p>
            <div className={styles.ctaRow}>
              <Link to="/portal/login" className={v2b.cta}>
                {t('verification.verified.ctaSignIn')}
              </Link>
              <Link to="/" className={v2b.ghostOnDark}>
                {t('verification.verified.ctaHome')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
