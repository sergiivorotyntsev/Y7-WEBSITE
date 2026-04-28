import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { colors, fonts, button as btnStyles } from '../theme';
import { CheckIcon } from '../components/icons';

export default function QuoteVerified() {
  return (
    <>
      <Helmet>
        <title>Email Verified — Y7 Logistics</title>
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
            background: colors.successBg,
            marginBottom: '20px',
          }}>
            <CheckIcon size={36} />
          </div>
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: '28px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: '12px',
          }}>
            Email verified
          </h1>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '15px',
            color: colors.textMuted,
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            Thanks for confirming your email. Our dispatcher will respond
            to your quote request within 1 business hour.
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link to="/portal/login" style={{
              ...btnStyles.accent,
              padding: '12px 24px',
              fontSize: '13px',
              textDecoration: 'none',
            }}>
              Sign in to track
            </Link>
            <Link to="/" style={{
              ...btnStyles.secondary,
              padding: '12px 24px',
              fontSize: '13px',
              textDecoration: 'none',
            }}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
