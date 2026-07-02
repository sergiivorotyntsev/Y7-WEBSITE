import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import HreflangTags from '../components/HreflangTags';
import ScrollReveal from '../components/ScrollReveal';
import TrustBar from '../components/TrustBar';
import QuoteFormCompact from '../components/QuoteFormCompact';
import BaitQuote from '../components/BaitQuote/BaitQuote';
import Reveal from '../components/Reveal/Reveal';
import AudienceCards from '../components/AudienceCards';
import PortPills from '../components/PortPills';
import CoverageMap from '../components/CoverageMap';
import LiveActivityFeed from '../components/LiveActivityFeed';
import Benefits from '../components/Benefits';
import ReviewsCarousel from '../components/ReviewsCarousel';
import TrustBadges from '../components/TrustBadges';
import ExternalReviewsStrip from '../components/ExternalReviewsStrip';
import WhyY7 from '../components/WhyY7';
import TrustSection from '../components/TrustSection';
import HeroRouteVisual from '../components/HeroRouteVisual';
import HeroSeal from '../components/HeroSeal';
import VerificationStrip from '../components/VerificationStrip';
import styles from './Home.module.css';
import btn from '../styles/buttons.module.css';

export default function Home() {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation();
  const navigate = useNavigate();
  const scrollToQuote = () => {
    const el = document.getElementById('quote-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <PageMeta description={tCommon('meta.homeDescription')} path="/" />
      <HreflangTags currentPath="" hasPolishVersion hasUkrainianVersion hasRussianVersion />
      {/* SEOAI-T02: the canonical LocalBusiness #organization node ships in the
          index.html template on every page — no per-page Organization duplicates,
          and no aggregateRating (self-serving stars are policy-ineligible for a
          broker; see the sprint's no-ratings invariant). */}

      {/* 1. Hero — centered with subtle route visual background */}
      <section className={styles.hero}>
        <HeroSeal size={320} className={styles.heroSeal} />
        <div className={styles.heroInner}>
          <div className={styles.heroVisual} aria-hidden="true">
            <HeroRouteVisual />
          </div>
          <Reveal className={styles.heroText}>
            <span className={styles.heroKicker}>&#9670; {t('hero.title')}</span>
            <h1 className={styles.heroTitle}>
              {t('hero.tagline')}{' '}
              <span className={styles.heroAccent}>{t('hero.taglineAccent')}</span>
            </h1>
            <p className={styles.heroDesc}>{t('hero.description')}</p>
            <div className={styles.heroCtas}>
              <button
                onClick={scrollToQuote}
                className={`${btn.btnAccent} ${styles.heroCtaPrimary}`}
              >
                {tCommon('cta.getQuote')}
              </button>
              <button
                onClick={() => navigate('/track')}
                className={`${btn.btnSecondary} ${styles.heroCtaSecondary}`}
              >
                {tCommon('nav.track')}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 1b. Bait-quote magnet — instant transparent estimate, directly below the hero.
          PHASE5A-MAGNET. English-only for now (see PHASE5A_MAGNET_REPORT). Not wrapped in
          ScrollReveal: it's above the fold, so it shows immediately (its own CSS entrance
          motion handles the reveal). Both CTAs target the quote form (scrollToQuote). */}
      <section style={{ padding: 'clamp(60px, 8vh, 100px) 24px' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionMicro}>&#9670; Instant dealer estimate</span>
        </div>
        <BaitQuote onPrimaryCta={scrollToQuote} onSecondaryCta={scrollToQuote} />
      </section>

      {/* External reviews strip (visible when env vars set) */}
      <ExternalReviewsStrip />

      {/* 2. National Segment Cards */}
      <ScrollReveal style={{ padding: 'clamp(60px, 8vh, 100px) 24px clamp(30px, 4vh, 60px)' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionMicro}>&#9670; {t('sections.whoWeServe')}</span>
          <h2 className={styles.sectionTitle}>{t('sections.whoWeServeHeading')}</h2>
        </div>
        <AudienceCards />
      </ScrollReveal>

      {/* 3. Live Activity Feed */}
      <LiveActivityFeed />

      {/* 4. Trust Bar */}
      <TrustBar />

      {/* 5. Benefits — "Your Complete Transport Solution" */}
      <ScrollReveal style={{ padding: 'clamp(60px, 8vh, 100px) 24px', background: 'var(--bg-muted)' }}>
        <Benefits />
      </ScrollReveal>

      {/* 5b. Coverage Map — internal SEO links to location + route pages */}
      <ScrollReveal style={{ padding: 'clamp(50px, 7vh, 80px) 24px' }}>
        <CoverageMap />
      </ScrollReveal>

      {/* 6. Why Y7 */}
      <ScrollReveal style={{ padding: 'clamp(60px, 8vh, 100px) 24px', background: 'var(--bg-muted)' }}>
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
            <span className={styles.quoteSectionKicker}>&#9670; {t('sections.requestQuote')}</span>
            <h2 className={styles.quoteSectionTitle}>{t('quoteSection.title')}</h2>
            <p className={styles.quoteSectionSubtitle}>{t('quoteSection.subtitle')}</p>
          </div>
        </ScrollReveal>
        <QuoteFormCompact />
        <div className={styles.trustBadgesRow}>
          <TrustBadges layout="horizontal" variant="compact" />
        </div>
      </section>

      {/* 9. Testimonials */}
      <ScrollReveal style={{ padding: 'clamp(60px, 8vh, 100px) 24px', background: 'var(--bg-muted)' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionMicro}>&#9670; {t('sections.testimonials')}</span>
        </div>
        <ReviewsCarousel />
      </ScrollReveal>

      {/* 10. Port Pills */}
      <ScrollReveal style={{ padding: 'clamp(60px, 8vh, 100px) 24px' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionMicro}>&#9670; {t('sections.coverage')}</span>
        </div>
        <PortPills />
      </ScrollReveal>

      {/* 11. Verification Strip — FMCSA, broker, Central Dispatch external links */}
      <VerificationStrip />
    </div>
  );
}
