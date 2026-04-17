import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import HreflangTags from '../components/HreflangTags';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import QuoteForm from '../components/QuoteForm';
import TransportComparison from '../components/TransportComparison';
import WhatHappensNext from '../components/WhatHappensNext';
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
        <span className={styles.heroMicro}>&#9670; Personal Auto Transport</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
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
        <h2 className={styles.sectionHeading}>What Determines Your Shipping Cost</h2>
        <p className={styles.bodyText}>{t('pricingFactors')}</p>
      </section>

      {/* Peak Season */}
      <section className={styles.narrow}>
        <h2 className={styles.sectionHeading}>Seasonal Pricing Patterns</h2>
        <p className={styles.bodyText}>{t('peakSeason')}</p>
      </section>

      {/* Preparation Checklist */}
      <section className={styles.narrow}>
        <h2 className={styles.sectionHeading}>How to Prepare Your Car for Shipping</h2>
        <ul className={styles.checkList}>
          {Array.isArray(prepList) && prepList.map((item, i) => (
            <li key={i} className={styles.checkItem}>{item}</li>
          ))}
        </ul>
      </section>

      {/* What to Expect at Pickup */}
      <section className={styles.narrow}>
        <h2 className={styles.sectionHeading}>What to Expect at Pickup</h2>
        <p className={styles.bodyText}>{t('pickupProcess')}</p>
      </section>

      {/* What to Expect at Delivery */}
      <section className={styles.narrow}>
        <h2 className={styles.sectionHeading}>What to Expect at Delivery</h2>
        <p className={styles.bodyText}>{t('deliveryProcess')}</p>
      </section>

      {/* Insurance callout */}
      <section className={styles.narrow}>
        <div className={styles.callout}>
          <span className={styles.calloutKicker}>Coverage</span>
          <h3 className={styles.calloutTitle}>Insurance Coverage During Transport</h3>
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
          <span className={styles.calloutKicker}>At delivery</span>
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

      {/* What Happens Next */}
      <WhatHappensNext />

      {/* FAQ Accordion */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <span className={styles.faqMicro}>&#9670; Frequently Asked</span>
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
    </div>
  );
}
