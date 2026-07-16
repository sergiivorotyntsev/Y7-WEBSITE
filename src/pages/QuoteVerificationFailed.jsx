import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styles from './QuoteVerificationFailed.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';

// DESIGN-V2-W5-T02 (extension): Dispatch Board restyle of the page shell,
// mirroring QuoteVerified: single board band (utility page, noindex),
// panel-steel card, condensed heading. Error state uses the red family +
// icon per DESIGN.md v2 §3 (signal-red-bright glyph on dark, never color
// alone; the 10%-alpha circle wash is Signal-Budget exempt). Reason routing,
// i18n keys, strings, link targets and robots meta unchanged. Signal Budget:
// the gradient CTA is the viewport's one red fill; the red-bright icon is
// the one counted accent. No entrance animations (static).
const VALID_REASONS = ['invalid_token', 'expired_token', 'already_verified', 'order_not_found', 'default'];

export default function QuoteVerificationFailed() {
  const { t } = useTranslation('quote');
  const [searchParams] = useSearchParams();
  const rawReason = searchParams.get('reason') || 'default';
  const reason = VALID_REASONS.includes(rawReason) ? rawReason : 'default';
  const message = {
    title: t(`verification.failed.reasons.${reason}.title`),
    body: t(`verification.failed.reasons.${reason}.body`),
  };

  return (
    <>
      <Helmet>
        <title>{t('verification.failed.pageTitle')}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className={v2s.board}>
        <div className={`${v2s.inner} ${styles.inner}`}>
          <div className={`${v2s.panel} ${styles.card}`}>
            <div className={styles.iconCircle} aria-hidden="true">
              ⚠
            </div>
            <h1 className={`${v2t.sectionDisplay} ${styles.heading}`}>
              {message.title}
            </h1>
            <p className={styles.body}>
              {message.body}
            </p>
            <div className={styles.ctaRow}>
              {reason === 'already_verified' ? (
                <Link to="/portal/login" className={v2b.cta}>
                  {t('verification.failed.ctaSignIn')}
                </Link>
              ) : (
                <Link to="/ship-my-car" className={v2b.cta}>
                  {t('verification.failed.ctaNewQuote')}
                </Link>
              )}
              <Link to="/contact" className={v2b.ghostOnDark}>
                {t('verification.failed.ctaContact')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
