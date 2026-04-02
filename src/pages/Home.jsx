import { useTranslation } from 'react-i18next';
import TrustBar from '../components/TrustBar';
import QuoteForm from '../components/QuoteForm';
import AudienceCards from '../components/AudienceCards';
import PortPills from '../components/PortPills';
import { colors, fonts, button as btnStyles } from '../theme';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          color: colors.text,
          lineHeight: 1.15,
          marginBottom: '16px',
        }}>
          {t('hero.title')}
        </h1>
        <p style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          color: colors.accent,
          fontWeight: 400,
          fontStyle: 'italic',
          marginBottom: '20px',
        }}>
          {t('hero.subtitle')}
        </p>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '15px',
          color: colors.textMuted,
          lineHeight: 1.7,
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          {t('hero.description')}
        </p>
      </section>

      {/* Trust Bar */}
      <section style={{ padding: '0 24px 60px' }}>
        <TrustBar />
      </section>

      {/* Quote Form */}
      <section style={{
        padding: '60px 24px',
        background: colors.bgMuted,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: '28px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: '8px',
          }}>
            {t('quoteSection.title')}
          </h2>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '14px',
            color: colors.textMuted,
          }}>
            {t('quoteSection.subtitle')}
          </p>
        </div>
        <QuoteForm compact />
      </section>

      {/* Audience Cards */}
      <section style={{ padding: '60px 24px' }}>
        <AudienceCards />
      </section>

      {/* Port Pills */}
      <section style={{ padding: '0 24px 80px' }}>
        <PortPills />
      </section>
    </div>
  );
}
