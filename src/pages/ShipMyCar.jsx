import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import HreflangTags from '../components/HreflangTags';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import QuoteForm from '../components/QuoteForm';
import TransportComparison from '../components/TransportComparison';
import ProcessTimeline from '../components/ProcessTimeline';
import styles from './ShipMyCar.module.css';

function Chevron() {
  return (
    <svg
      className={styles.faqChevron}
      viewBox="0 0 14 14"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5L7 9L11 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function ShipMyCar() {
  const { t } = useTranslation('shipMycar');
  const { t: tCommon } = useTranslation('common');
  const steps = t('steps', { returnObjects: true });
  const faqs = t('faqs', { returnObjects: true });
  const prepList = t('prepChecklist', { returnObjects: true });

  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Ship My Car',url:'/ship-my-car'}]} />
      <PageMeta title={tCommon('meta.shipMyCarTitle')} description={tCommon('meta.shipMyCarDescription')} path="/ship-my-car" />
      <HreflangTags currentPath="/ship-my-car" hasPolishVersion hasUkrainianVersion hasRussianVersion />

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroMicro}>&#9670; {t('sections.heroKicker')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <a href="#quote-section" className={styles.heroCta}>
          {t('hero.cta')} <span aria-hidden="true">&rarr;</span>
        </a>
        <div className={styles.heroTrust}>
          <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust1')}</span>
          <span className={styles.heroTrustDot} aria-hidden="true">&middot;</span>
          <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust2')}</span>
          <span className={styles.heroTrustDot} aria-hidden="true">&middot;</span>
          <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust3')}</span>
        </div>
      </section>

      {/* Steps */}
      <section className={styles.stepsSection}>
        <div className={styles.steps}>
          {Array.isArray(steps) && steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNum}>{i + 1}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Factors */}
      <section className={styles.narrow}>
        <h2 className={styles.sectionHeading}>{t('sections.costHeading')}</h2>
        <p className={styles.bodyText}>{t('pricingFactors')}</p>
      </section>

      {/* Peak Season */}
      <section className={styles.narrow}>
        <h2 className={styles.sectionHeading}>{t('sections.seasonHeading')}</h2>
        <p className={styles.bodyText}>{t('peakSeason')}</p>
      </section>

      {/* Preparation Checklist */}
      <section className={styles.narrow}>
        <h2 className={styles.sectionHeading}>{t('sections.prepHeading')}</h2>
        <ul className={styles.checkList}>
          {Array.isArray(prepList) && prepList.map((item, i) => (
            <li key={i} className={styles.checkItem}>{item}</li>
          ))}
        </ul>
      </section>

      {/* What to Expect at Pickup */}
      <section className={styles.narrow}>
        <h2 className={styles.sectionHeading}>{t('sections.pickupHeading')}</h2>
        <p className={styles.bodyText}>{t('pickupProcess')}</p>
      </section>

      {/* What to Expect at Delivery */}
      <section className={styles.narrow}>
        <h2 className={styles.sectionHeading}>{t('sections.deliveryHeading')}</h2>
        <p className={styles.bodyText}>{t('deliveryProcess')}</p>
      </section>

      {/* Insurance callout */}
      <section className={styles.narrow}>
        <div className={styles.callout}>
          <span className={styles.calloutKicker}>{t('sections.coverageKicker')}</span>
          <h3 className={styles.calloutTitle}>{t('sections.insuranceTitle')}</h3>
          <p className={styles.calloutText}>{t('insuranceInfo')}</p>
        </div>
      </section>

      {/* Open vs Enclosed Comparison */}
      <section className={styles.comparisonSection}>
        <TransportComparison />
      </section>

      {/* BOL callout */}
      <section className={styles.narrow}>
        <div className={styles.callout}>
          <span className={styles.calloutKicker}>{t('sections.atDeliveryKicker')}</span>
          <h3 className={styles.calloutTitle}>{t('bol.title')}</h3>
          <p className={styles.calloutText}>{t('bol.text')}</p>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote-section" className={styles.quoteSection}>
        <h2 className={styles.quoteTitle}>{t('quoteTitle')}</h2>
        <p className={styles.quoteSubtitle}>{t('quoteSubtitle')}</p>
        <QuoteForm />
      </section>

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* FAQ Accordion */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <span className={styles.faqMicro}>&#9670; {t('sections.faqKicker')}</span>
          <h2 className={styles.faqTitle}>{t('faqTitle')}</h2>
        </div>
        <div className={styles.faqList}>
          {Array.isArray(faqs) && faqs.map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                <span>{faq.q}</span>
                <Chevron />
              </summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA strip */}
      <section className={styles.finalCta}>
        <h2 className={styles.finalCtaTitle}>{t('finalCta.title')}</h2>
        <p className={styles.finalCtaSubtitle}>{t('finalCta.subtitle')}</p>
        <a href="#quote-section" className={styles.finalCtaButton}>
          {t('finalCta.button')} <span aria-hidden="true">&rarr;</span>
        </a>
      </section>

      {/* Cross-links */}
      <section className={styles.crosslinks}>
        <span className={styles.crosslinksTitle}>{t('crosslinks.title')}</span>
        <div className={styles.crosslinksRow}>
          <Link to="/quote" className={styles.crosslink}>{t('crosslinks.quote')} &rarr;</Link>
          <Link to="/track" className={styles.crosslink}>{t('crosslinks.track')} &rarr;</Link>
          <Link to="/faq" className={styles.crosslink}>{t('crosslinks.faq')} &rarr;</Link>
        </div>
      </section>
    </div>
  );
}
