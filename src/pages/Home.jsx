import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import ScrollReveal from '../components/ScrollReveal';
import TrustBar from '../components/TrustBar';
import QuoteForm from '../components/QuoteForm';
import AudienceCards from '../components/AudienceCards';
import PortPills from '../components/PortPills';
import LiveActivityFeed from '../components/LiveActivityFeed';
import HowItWorks from '../components/HowItWorks';
import TestimonialCarousel from '../components/TestimonialCarousel';
import WhyY7 from '../components/WhyY7';
import TrustSection from '../components/TrustSection';
import { colors, fonts } from '../theme';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <div>
      <PageMeta description="Licensed auto transport broker. Ship your vehicle door-to-door or to any US port. Instant quotes, verified carriers, real-time tracking." path="/" />
      {/* 1. Hero */}
      <section style={{
        padding: '80px 24px 40px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          fontWeight: 600,
          color: colors.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '16px',
        }}>
          {t('hero.title')}
        </p>
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(36px, 5.5vw, 52px)',
          fontWeight: 700,
          color: colors.text,
          lineHeight: 1.15,
          marginBottom: '20px',
        }}>
          {t('hero.tagline')}{' '}
          <span style={{ color: colors.accent, fontStyle: 'italic' }}>
            {t('hero.taglineAccent')}
          </span>
        </h1>
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

      {/* 2. Live Activity Feed */}
      <LiveActivityFeed />

      {/* 3. Trust Bar */}
      <ScrollReveal style={{ padding: '20px 24px 60px' }}>
        <TrustBar />
      </ScrollReveal>

      {/* 4. Audience Cards */}
      <ScrollReveal style={{ padding: '20px 24px 60px' }}>
        <AudienceCards />
      </ScrollReveal>

      {/* 5. How It Works */}
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

      {/* 6. Why Y7 */}
      <ScrollReveal style={{ padding: '20px 24px 60px' }}>
        <WhyY7 />
      </ScrollReveal>

      {/* 7. Trust Section — "How we protect your shipment" */}
      <ScrollReveal style={{ padding: '0 0 40px' }}>
        <TrustSection />
      </ScrollReveal>

      {/* 8. Quote Form */}
      <section id="quote-section" style={{ padding: '60px 24px', background: colors.bgMuted }}>
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

      {/* 9. Testimonials */}
      <ScrollReveal style={{ padding: '40px 24px 60px', background: colors.bgMuted }}>
        <TestimonialCarousel />
      </ScrollReveal>

      {/* 10. Port Pills */}
      <ScrollReveal style={{ padding: '60px 24px 80px' }}>
        <PortPills />
      </ScrollReveal>
    </div>
  );
}
