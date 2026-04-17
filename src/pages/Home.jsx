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
import styles from './Home.module.css';

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
    "address": { "@type": "PostalAddress", "addressLocality": "Newton", "addressRegion": "MA", "addressCountry": "US" },
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
      <PageMeta description="Licensed auto transport broker. Ship your vehicle door-to-door or to any US port. Instant quotes, verified carriers, shipment status updates." path="/" />
      <HreflangTags currentPath="" hasPolishVersion hasUkrainianVersion hasRussianVersion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* 1. Hero */}
      <section className={styles.hero}>
        <p className={styles.heroKicker}>{t('hero.title')}</p>
        <h1 className={styles.heroTitle}>
          {t('hero.tagline')}<br />
          <span className={styles.heroAccent}>{t('hero.taglineAccent')}</span>
        </h1>
        <p className={styles.heroDesc}>{t('hero.description')}</p>
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
        <h2 className={styles.sectionTitle}>{t('howItWorks.title')}</h2>
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
      <section id="quote-section" className={styles.quoteSection}>
        <ScrollReveal>
          <div className={styles.quoteSectionHeader}>
            <h2 className={styles.quoteSectionTitle}>{t('quoteSection.title')}</h2>
            <p className={styles.quoteSectionSubtitle}>{t('quoteSection.subtitle')}</p>
          </div>
        </ScrollReveal>
        <QuoteForm compact />
        <div className={styles.trustBadgesRow}>
          <TrustBadges layout="horizontal" variant="compact" />
        </div>
      </section>

      {/* 8b. What Happens Next */}
      <WhatHappensNext />

      {/* 9. Testimonials */}
      <ScrollReveal style={{ padding: '40px 24px 60px', background: 'var(--bg-muted)' }}>
        <ReviewsCarousel />
      </ScrollReveal>

      {/* 10. Port Pills */}
      <ScrollReveal style={{ padding: '60px 24px 80px' }}>
        <PortPills />
      </ScrollReveal>
    </div>
  );
}
