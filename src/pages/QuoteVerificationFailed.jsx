import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { colors, fonts, button as btnStyles } from '../theme';

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
      <div style={{
        maxWidth: '560px',
        margin: '0 auto',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '48px 32px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#FFF0EC',
            marginBottom: '20px',
            fontSize: '32px',
          }}>
            ⚠
          </div>
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: '24px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: '12px',
          }}>
            {message.title}
          </h1>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '14px',
            color: colors.textMuted,
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            {message.body}
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {reason === 'already_verified' ? (
              <Link to="/portal/login" style={{
                ...btnStyles.accent,
                padding: '12px 24px',
                fontSize: '13px',
                textDecoration: 'none',
              }}>
                {t('verification.failed.ctaSignIn')}
              </Link>
            ) : (
              <Link to="/ship-my-car" style={{
                ...btnStyles.accent,
                padding: '12px 24px',
                fontSize: '13px',
                textDecoration: 'none',
              }}>
                {t('verification.failed.ctaNewQuote')}
              </Link>
            )}
            <Link to="/contact" style={{
              ...btnStyles.secondary,
              padding: '12px 24px',
              fontSize: '13px',
              textDecoration: 'none',
            }}>
              {t('verification.failed.ctaContact')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
