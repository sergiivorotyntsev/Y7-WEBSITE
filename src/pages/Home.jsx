import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';
import TrustBar from '../components/TrustBar';
import QuoteForm from '../components/QuoteForm';
import AudienceCards from '../components/AudienceCards';
import PortPills from '../components/PortPills';
import LiveActivityFeed from '../components/LiveActivityFeed';
import HowItWorks from '../components/HowItWorks';
import TestimonialCarousel from '../components/TestimonialCarousel';
import WhyY7 from '../components/WhyY7';
import { colors, fonts } from '../theme';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '80px 24px 40px',
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

      {/* Live Activity Feed */}
      <LiveActivityFeed />

      {/* Trust Bar */}
      <ScrollReveal style={{ padding: '20px 24px 60px' }}>
        <TrustBar />
      </ScrollReveal>

      {/* Quote Form */}
      <section id="quote-form" style={{ padding: '60px 24px', background: colors.bgMuted }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: '28px',
              fontWeight: 700,
              color: colors.text,
              marginBottom: '8px',
            }}>
              {t('quoteSection.title')}
            </h2>
            <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>
              {t('quoteSection.subtitle')}
            </p>
          </div>
        </ScrollReveal>
        <QuoteForm compact />
      </section>

      {/* How It Works */}
      <ScrollReveal style={{ padding: '60px 24px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '28px',
          fontWeight: 700,
          color: colors.text,
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          How It Works
        </h2>
        <HowItWorks />
      </ScrollReveal>

      {/* Audience Cards */}
      <ScrollReveal style={{ padding: '20px 24px 60px' }}>
        <AudienceCards />
      </ScrollReveal>

      {/* Why Y7 */}
      <ScrollReveal style={{ padding: '20px 24px 60px' }}>
        <WhyY7 />
      </ScrollReveal>

      {/* Testimonials */}
      <ScrollReveal style={{ padding: '40px 24px 60px', background: colors.bgMuted }}>
        <TestimonialCarousel />
      </ScrollReveal>

      {/* Port Pills */}
      <ScrollReveal style={{ padding: '60px 24px 80px' }}>
        <PortPills />
      </ScrollReveal>
    </div>
  );
}
