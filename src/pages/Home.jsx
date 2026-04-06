import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import HreflangTags from '../components/HreflangTags';
import { API_URL } from '../config';
import ScrollReveal from '../components/ScrollReveal';
import TrustBar from '../components/TrustBar';
import QuoteForm from '../components/QuoteForm';
import AudienceCards from '../components/AudienceCards';
import PortPills from '../components/PortPills';
import LiveActivityFeed from '../components/LiveActivityFeed';
import HowItWorks from '../components/HowItWorks';
import ReviewsCarousel from '../components/ReviewsCarousel';
import TrustBadges from '../components/TrustBadges';
import ExternalReviewsStrip from '../components/ExternalReviewsStrip';
import WhyY7 from '../components/WhyY7';
import TrustSection from '../components/TrustSection';
import WhatHappensNext from '../components/WhatHappensNext';
import { colors, fonts } from '../theme';

export default function Home() {
  const { t } = useTranslation('home');
  const [aggregate, setAggregate] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/public/reviews?limit=1`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.aggregate) setAggregate(data.aggregate); })
      .catch(() => {});
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": "Y7 Logistics",
    "url": "https://www.y7agency.com",
    "telephone": "+1-617-010-7171",
    "address": { "@type": "PostalAddress", "streetAddress": "1007 Chestnut St, Suite A", "addressLocality": "Newton", "addressRegion": "MA", "postalCode": "02464", "addressCountry": "US" },
    ...(aggregate && aggregate.total_count >= 5 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregate.average_rating,
        "reviewCount": aggregate.total_count,
        "bestRating": 5,
        "worstRating": 1,
      }
    } : {}),
  };

  return (
    <div>
      <PageMeta description="Licensed auto transport broker. Ship your vehicle door-to-door or to any US port. Instant quotes, verified carriers, real-time tracking." path="/" i18n />
      <HreflangTags currentPath="" hasPolishVersion hasUkrainianVersion hasRussianUSVersion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      {/* 1. Hero */}
      <style>{`
        .hero-section { padding: 80px 24px 40px; }
        @media (max-width: 768px) { .hero-section { padding: 48px 24px 32px; } }
      `}</style>
      <section className="hero-section" style={{
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
          {t('hero.tagline')}<br />
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

      {/* External reviews strip (visible when env vars set) */}
      <ExternalReviewsStrip />

      {/* 2. National Segment Cards */}
      <ScrollReveal style={{ padding: '40px 24px 20px' }}>
        <AudienceCards />
      </ScrollReveal>

      {/* 3. Live Activity Feed */}
      <LiveActivityFeed />

      {/* 4. Trust Bar */}
      <ScrollReveal style={{ padding: '20px 24px 60px' }}>
        <TrustBar />
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
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <TrustBadges layout="horizontal" variant="compact" />
        </div>
      </section>

      {/* 8b. What Happens Next */}
      <WhatHappensNext />

      {/* 9. Testimonials */}
      <ScrollReveal style={{ padding: '40px 24px 60px', background: colors.bgMuted }}>
        <ReviewsCarousel />
      </ScrollReveal>

      {/* 10. Port Pills */}
      <ScrollReveal style={{ padding: '60px 24px 80px' }}>
        <PortPills />
      </ScrollReveal>
    </div>
  );
}
