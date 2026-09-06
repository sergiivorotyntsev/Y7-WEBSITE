import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import EntityTldr from '../components/EntityTldr';
import Reveal from '../components/Reveal/Reveal';
import styles from './Dealers.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';
import v2c from '../styles/v2/cards.module.css';
import v2a from '../styles/v2/accents.module.css';
import v2h from '../styles/v2/hero.module.css';
import HeroArc from '../components/HeroArc';
import MobileHeroEmergence, { HERO_BLANK_PX } from '../components/MobileHeroEmergence';

// CODEX-13: /dealers owns the dealer-account and onboarding intent. Transport
// scope, operating detail, and the full fee model live on
// /dealer-auto-transport. The existing V2 board/paper language is preserved.
export default function Dealers() {
  const { t, i18n } = useTranslation('dealers');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();

  const tldr = i18n.getResource(i18n.language, 'dealers', 'tldr') || '';
  const onboardingSteps = t('workflow.steps', { returnObjects: true }) || [];
  const accountBenefits = t('benefits.items', { returnObjects: true }) || [];
  const portalFeatures = t('portal.features', { returnObjects: true }) || [];
  const faqs = t('faqs.items', { returnObjects: true }) || [];
  const crosslinks = t('crosslinks.items', { returnObjects: true }) || [];
  const schema = t('schema', { returnObjects: true }) || {};

  const serviceSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: schema.serviceType,
    name: schema.name,
    description: schema.description,
    provider: { '@id': 'https://www.y7agency.com/#organization' },
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: { '@type': 'BusinessAudience', audienceType: schema.audienceType },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: schema.catalogName,
      itemListElement: [
        {
          '@type': 'Offer',
          name: schema.offerName,
          description: schema.offerDescription,
        },
      ],
    },
  });

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Array.isArray(faqs)
      ? faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } }))
      : [],
  });

  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Dealers', url: '/dealers' }]} />
      <PageMeta
        title={tCommon('meta.dealersTitle')}
        description={tCommon('meta.dealersDescription')}
        path="/dealers"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      {/* Hero: account proposition, using the established V2 audience hero. */}
      <section className={v2s.boardHero}>
        <div className={`${v2h.photoEmergence} ${styles.heroPhoto}`} aria-hidden="true">
          <HeroArc className={styles.heroArc} />
          <picture>
            <source media="(max-width: 900px)" srcSet={HERO_BLANK_PX} />
            <source srcSet="/images/hero-dealers.avif" type="image/avif" />
            <source srcSet="/images/hero-dealers.webp" type="image/webp" />
            <img src="/images/hero-dealers.webp" alt="" width="1672" height="940" loading="eager" decoding="async" />
          </picture>
        </div>
        <div className={`${v2s.inner} ${styles.heroLayout}`}>
          <div className={`${v2a.jpVertical} ${styles.heroJpStrip}`} aria-hidden="true">
            シンプル・迅速・信頼
          </div>
          <Reveal className={styles.heroText}>
            <p className={`${v2t.eyebrowPlain} ${styles.heroEyebrow}`}>{t('hero.kicker')}</p>
            <h1 className={`${v2t.sectionDisplay} ${styles.heroTitle}`}>{t('title')}</h1>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.heroSubtitle}`}>{t('subtitle')}</p>
            <div className={styles.heroTrust}>
              <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust1')}</span>
              <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust2')}</span>
              <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust3')}</span>
            </div>
            <div className={styles.heroCtaRow}>
              <button onClick={() => navigate('/dealer-quote')} className={v2h.angledPlate}>
                {t('ctaButton')}
              </button>
            </div>
          </Reveal>
        </div>
        <MobileHeroEmergence
          eager
          avif="/images/hero-dealers.avif"
          webp="/images/hero-dealers.webp"
          width={1672}
          height={940}
        />
      </section>

      {/* Onboarding comes first because an account is required before booking. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <EntityTldr
            kicker={t('entity.kicker')}
            ariaLabel={t('entity.ariaLabel')}
            text={tldr}
          />
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('workflow.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('workflow.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnPaper} ${styles.sectionSub}`}>{t('workflow.requirement')}</p>
            <p className={`${styles.descOnPaper} ${styles.sectionSub}`}>{t('workflow.compliance')}</p>
            <div className={styles.capGrid}>
              {Array.isArray(onboardingSteps) && onboardingSteps.map((step, i) => (
                <div key={i} className={`${v2c.paper} ${styles.capCard}`}>
                  <div className={`${v2t.monoLabel} ${styles.numOnPaper}`}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{step.title}</h3>
                  <p className={styles.descOnPaper}>{step.desc}</p>
                </div>
              ))}
            </div>
            <p className={`${styles.descOnPaper} ${styles.sectionSub}`}>{t('workflow.after')}</p>
          </Reveal>
        </div>
      </section>

      {/* The four owner-confirmed account consequences. */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{t('benefits.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('benefits.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.sectionSub}`}>{t('benefits.subtitle')}</p>
            <div className={styles.capGrid}>
              {Array.isArray(accountBenefits) && accountBenefits.map((benefit, i) => (
                <div key={i} className={`${v2c.board} ${styles.capCard}`}>
                  <div className={`${v2t.monoLabel} ${styles.numOnDark}`}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{benefit.title}</h3>
                  <p className={styles.descOnDark}>{benefit.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Additional portal functions are limited to behavior verified in code. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('portal.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('portal.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnPaper} ${styles.sectionSub}`}>{t('portal.subtitle')}</p>
            <div className={styles.portalGrid}>
              {Array.isArray(portalFeatures) && portalFeatures.map((feature, i) => (
                <div key={i} className={`${v2c.paper} ${styles.portalCard}`}>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{feature.label}</h3>
                  <p className={styles.descOnPaper}>{feature.desc}</p>
                </div>
              ))}
            </div>
            <p className={`${styles.descOnPaper} ${styles.sectionSub}`}>
              <Link to="/portal/login" className={v2t.bodyLinkOnPaper}>{t('portal.loginCta')} &rarr;</Link>
              {' '}&middot;{' '}
              <Link to="/dealer-quote" className={v2t.bodyLinkOnPaper}>{t('portal.applyCta')} &rarr;</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service detail and fee mechanics stay with the service pillar. */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{t('serviceOverview.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('serviceOverview.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.sectionSub}`}>{t('serviceOverview.body')}</p>
            <p className={styles.descOnDark}>
              <Link to="/dealer-auto-transport" className={v2t.bodyLinkOnDark}>
                {t('serviceOverview.linkLabel')} &rarr;
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ strings are also the FAQPage schema source, preserving parity. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <Reveal>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2} ${styles.faqHeadCenter}`}>{t('faqs.title')}</h2>
            <div className={styles.faqList}>
              {Array.isArray(faqs) && faqs.map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.q}</span>
                    <span className={styles.faqChevron} aria-hidden="true">&#9662;</span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={v2s.board}>
        <div className={`${v2s.inner} ${styles.ctaInner}`}>
          <Reveal>
            <span className={`${v2a.stamp} ${styles.ctaStamp}`} aria-hidden="true">改善</span>
            <h2 className={`${v2t.sectionDisplay} ${styles.ctaTitle}`}>{t('ctaTitle')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.ctaSubtitle}`}>{t('ctaSubtitle')}</p>
            <button onClick={() => navigate('/dealer-quote')} className={v2b.cta}>
              {t('ctaButton')}
            </button>
          </Reveal>
        </div>
      </section>

      <section className={v2s.manifest}>
        <div className={`${v2s.inner} ${styles.crosslinksInner}`}>
          <Reveal>
            <h3 className={`${v2t.monoLabel} ${styles.crosslinksTitle}`}>{t('crosslinks.title')}</h3>
            <div className={styles.crosslinksGrid}>
              {Array.isArray(crosslinks) && crosslinks.map((crosslink, i) => (
                <Link key={i} to={crosslink.to} className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>
                  {crosslink.label} &rarr;
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
