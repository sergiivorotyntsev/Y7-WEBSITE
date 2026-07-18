import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import HreflangTags from '../components/HreflangTags';
import ScrollReveal from '../components/ScrollReveal';
import QuoteFormCompact from '../components/QuoteFormCompact';
import Reveal from '../components/Reveal/Reveal';
import AudienceCards from '../components/AudienceCards';
import QuoteStrip from '../components/QuoteStrip';
import Advantages from '../components/Advantages';
import ProcessSteps from '../components/ProcessSteps';
import CoverageMap from '../components/CoverageMap';
import ReviewsCarousel from '../components/ReviewsCarousel';
import TrustBadges from '../components/TrustBadges';
import ExternalReviewsStrip from '../components/ExternalReviewsStrip';
import styles from './Home.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';
import v2c from '../styles/v2/cards.module.css';
import v2h from '../styles/v2/hero.module.css';
import v2a from '../styles/v2/accents.module.css';

export default function Home() {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation();
  const location = useLocation();
  // Locale-aware link helper (same pattern as Header.jsx).
  const localeMatch = location.pathname.match(/^\/(ua|pl|ru)(\/|$)/);
  const prefix = localeMatch ? `/${localeMatch[1]}` : '';
  const L = (path) => `${prefix}${path}`;
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

      {/* 1. Hero — V2 boardHero (DESIGN.md §2). Signal Budget in this viewport:
          red fill = gradient CTA; red accent = H1 accent line (T10: the
          Y7AGENCY.COM element was removed in T10: on-site it is tautology).
          Plain eyebrow (no red rule), white quartet stats, no stamp. */}
      <section className={`${v2s.boardHero} ${styles.hero}`}>
        {/* SPRINT-V21 W-HOME: photo emergence (Photo Treatment Law). Owner
            sign-off for this AI-derived asset is recorded in the sprint
            report. Decorative, aria-hidden, absolute layer with explicit
            dimensions (CLS 0); content siblings paint above by DOM order. */}
        <Helmet>
          <link rel="preload" as="image" href="/images/hero-car.avif" type="image/avif" />
        </Helmet>
        <div className={`${v2h.photoEmergence} ${styles.heroPhoto}`} aria-hidden="true">
          <picture>
            <source srcSet="/images/hero-car.avif" type="image/avif" />
            <source srcSet="/images/hero-car.webp" type="image/webp" />
            <img src="/images/hero-car.webp" alt="" width="1560" height="900" loading="eager" fetchPriority="high" decoding="async" />
          </picture>
        </div>
        <div className={`${v2s.inner} ${styles.heroLayout}`}>
          <div className={`${v2a.jpVertical} ${styles.heroJpStrip}`} aria-hidden="true">
            シンプル・迅速・信頼
          </div>
          <Reveal className={styles.heroText}>
            <p className={`${v2t.eyebrowPlain} ${styles.heroEyebrow}`}>{t('hero.eyebrow')}</p>
            {/* Line break is controlled manually (DESIGN.md §4 Line-Break
                Clearance Addendum); accent span = the whole second line. */}
            <h1 className={v2t.display}>
              {t('hero.tagline')}
              <br />
              <span className={v2t.accent}>{t('hero.taglineAccent')}</span>
            </h1>
            <p className={`${v2t.lede} ${v2t.ledeOnDark}`}>{t('hero.description')}</p>
            <div className={styles.heroCtas}>
              {/* SPRINT-V21: plate-as-CTA (Angle Law) — the angled plate IS
                  this viewport's red fill; the old gradient button class is
                  retired here so the budget stays at one fill. */}
              <a
                href="#quote-section"
                onClick={(e) => { e.preventDefault(); scrollToQuote(); }}
                className={v2h.angledPlate}
              >
                {t('hero.ctaPrimary')}
              </a>
              <Link to={L('/dealers')} className={v2b.ghostOnDark}>
                {t('hero.ctaDealers')}
              </Link>
              <Link to={L('/exporters')} className={v2b.ghostOnDark}>
                {t('hero.ctaExporters')}
              </Link>
            </div>
            <div className={`${v2c.trustRow} ${styles.heroTrust}`}>
              <div>
                <b className={v2c.trustStatQuiet}>{t('trust.carriers')}</b>
                <span className={v2c.trustLabel}>{t('trust.carriersLabel')}</span>
              </div>
              <div>
                <b className={v2c.trustStatQuiet}>{t('trust.support')}</b>
                <span className={v2c.trustLabel}>{t('trust.supportLabel')}</span>
              </div>
              <div>
                <b className={v2c.trustStatQuiet}>{t('trust.states')}</b>
                <span className={v2c.trustLabel}>{t('trust.statesLabel')}</span>
              </div>
              <div>
                <b className={v2c.trustStatQuiet}>{t('trust.bond')}</b>
                <span className={v2c.trustLabel}>{t('trust.bondLabel')}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Quote strip + Serve-cards — one manifest band, two blocks (T03+T07).
          The strip is the BaitQuote successor (i18n x4); the serve block opens
          with the eyebrow + condensed H2 pair. B2B-first card order. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <QuoteStrip onCta={scrollToQuote} />
          <ScrollReveal>
            <div className={styles.serveHead}>
              <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('sections.whoWeServe')}</p>
              <h2 className={v2t.sectionDisplay}>{t('sections.whoWeServeHeading')}</h2>
            </div>
            <AudienceCards />
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Advantages — board band (T04): merges Benefits + WhyY7 (12 cards)
          + TrustSection protection accordion; H2/H3 per the approved decision. */}
      <Advantages />

      {/* 4. Process — manifest band (T05): existing 5-step howItWorks copy. */}
      <ProcessSteps />

      {/* 5. Reviews — board band (T05), between Process and Coverage per the
          SEO contract. Opener varies (no eyebrow): the carousel's own h3 leads. */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <ScrollReveal>
            <ReviewsCarousel />
            <ExternalReviewsStrip />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Coverage — manifest band (T06): all location/route links, port
          tiles as real links, licensed-broker panel with external verification. */}
      <CoverageMap />

      {/* 7. Conversion — board-black-2 band (T07, §2 board-family tonal step).
          H2/subtitle preserved verbatim (SEO contract). Signal Budget here:
          red fill = form CTA; accent = the 改善 stamp (JP inventory #3 of 3).
          Form = §7 form-on-board. Private-shipper path stays fully visible. */}
      <section id="quote-section" className={styles.quoteSection}>
        <div className={v2s.inner}>
          <div className={styles.quoteGrid}>
            <ScrollReveal>
              <div className={styles.quoteCopy}>
                <p className={`${v2t.eyebrow} ${styles.quoteEyebrow}`}>{t('sections.requestQuote')}</p>
                <h2 className={`${v2t.sectionDisplay} ${styles.quoteTitle}`}>{t('quoteSection.title')}</h2>
                <p className={`${v2t.lede} ${v2t.ledeOnDark}`}>{t('quoteSection.subtitle')}</p>
                <ul className={styles.proofList}>
                  <li className={`${v2t.monoMicro} ${styles.proof}`}>{t('quoteSection.proof1')}</li>
                  <li className={`${v2t.monoMicro} ${styles.proof}`}>{t('quoteSection.proof2')}</li>
                  <li className={`${v2t.monoMicro} ${styles.proof}`}>{t('quoteSection.proof3')}</li>
                </ul>
                <span className={`${v2a.stamp} ${styles.quoteStamp}`} aria-hidden="true">改善</span>
              </div>
            </ScrollReveal>
            <div>
              <QuoteFormCompact />
              <div className={styles.trustBadgesRow}>
                <TrustBadges layout="horizontal" variant="compact" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
