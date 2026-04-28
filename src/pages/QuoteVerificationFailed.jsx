import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { colors, fonts, button as btnStyles } from '../theme';

const REASON_MESSAGES = {
  invalid_token: {
    title: 'Verification link invalid',
    body: 'This verification link is not recognized. It may have been mistyped or already used. If you submitted a quote recently, please check for a fresh email or contact us.',
  },
  expired_token: {
    title: 'Verification link expired',
    body: 'Verification links are valid for 7 days. Please submit a new quote request and we will send a fresh verification link.',
  },
  already_verified: {
    title: 'Already verified',
    body: 'This email has already been verified. You can sign in to track your quote.',
  },
  order_not_found: {
    title: 'Quote not found',
    body: 'We could not find a quote associated with this verification link. If you submitted a quote recently, please contact us.',
  },
  default: {
    title: 'Verification failed',
    body: 'We could not verify your email at this time. Please try again or contact support.',
  },
};

export default function QuoteVerificationFailed() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason') || 'default';
  const message = REASON_MESSAGES[reason] || REASON_MESSAGES.default;

  return (
    <>
      <Helmet>
        <title>Verification Failed — Y7 Logistics</title>
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
                Sign in
              </Link>
            ) : (
              <Link to="/ship-my-car" style={{
                ...btnStyles.accent,
                padding: '12px 24px',
                fontSize: '13px',
                textDecoration: 'none',
              }}>
                Get a new quote
              </Link>
            )}
            <Link to="/contact" style={{
              ...btnStyles.secondary,
              padding: '12px 24px',
              fontSize: '13px',
              textDecoration: 'none',
            }}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
