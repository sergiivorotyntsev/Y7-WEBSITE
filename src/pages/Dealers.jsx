import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import styles from './Dealers.module.css';
import btn from '../styles/buttons.module.css';

/**
 * IntersectionObserver-based fade-in for sections. Respects
 * prefers-reduced-motion. No animation libraries.
 */
function useInViewFade() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add(styles.visible);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add(styles.visible);
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Dealers() {
  const { t } = useTranslation('dealers');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();

  const problemPoints = t('problem.points', { returnObjects: true }) || [];
  const capabilities = t('capabilities.items', { returnObjects: true }) || [];
  const workflow = t('workflow.steps', { returnObjects: true }) || [];
  const paymentOptions = t('paymentOptions.options', { returnObjects: true }) || [];
  const portalFeatures = t('portal.features', { returnObjects: true }) || [];
  const auctions = t('auctions.list', { returnObjects: true }) || [];
  const useCases = t('useCases.cases', { returnObjects: true }) || [];
  const billing = t('billing.features', { returnObjects: true }) || [];
  const failures = t('whenThingsFail.scenarios', { returnObjects: true }) || [];
  const segments = t('whoWeServe.segments', { returnObjects: true }) || [];
  const compareRows = t('howDifferent.rows', { returnObjects: true }) || [];
  const faqs = t('faqs.items', { returnObjects: true }) || [];
  const crosslinks = t('crosslinks.items', { returnObjects: true }) || [];
  const compareHeaders = t('howDifferent.headers', { returnObjects: true }) || {};

  const serviceSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Outsourced Dispatch Department',
    name: 'Dealer Auto Transport Dispatch Service',
    description: 'Outsourced dispatch department for auto dealerships. Flat per-vehicle fee covers carrier sourcing, rate negotiation, gate pass coordination, BOL documentation, claims handling, and weekly billing. Alternative to internal dispatcher hire.',
    provider: {
      '@type': 'MovingCompany',
      name: 'Y7 Logistics',
      url: 'https://www.y7agency.com',
      identifier: [
        { '@type': 'PropertyValue', propertyID: 'FMCSA-MC', value: '1741537' },
        { '@type': 'PropertyValue', propertyID: 'USDOT', value: '4427359' },
      ],
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: { '@type': 'BusinessAudience', audienceType: 'Auto Dealerships' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dealer Payment Options',
      itemListElement: [
        { '@type': 'Offer', name: 'Direct Carrier Payment (COD)', description: 'Dealer pays carrier at delivery. Y7 bills flat dispatch fee only.' },
        { '@type': 'Offer', name: 'Prepay Through Y7', description: 'Dealer funds Y7 prepay balance. Y7 pays carriers. Weekly reconciliation.' },
      ],
    },
  });

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Array.isArray(faqs)
      ? faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
      : [],
  });

  const heroRef = useInViewFade();
  const problemRef = useInViewFade();
  const capRef = useInViewFade();
  const wfRef = useInViewFade();
  const payRef = useInViewFade();
  const portalRef = useInViewFade();
  const aucRef = useInViewFade();
  const caseRef = useInViewFade();
  const billRef = useInViewFade();
  const failRef = useInViewFade();
  const segRef = useInViewFade();
  const compareRef = useInViewFade();
  const faqRef = useInViewFade();
  const ctaRef = useInViewFade();

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

      {/* Hero */}
      <section ref={heroRef} className={`${styles.hero} ${styles.fadeSection}`}>
        <div className={styles.heroInner}>
          <span className={styles.heroKicker}>&#9670; {t('hero.kicker')}</span>
          <h1 className={styles.heroTitle}>{t('title')}</h1>
          <p className={styles.heroSubtitle}>{t('subtitle')}</p>
          <div className={styles.heroTrust}>
            <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust1')}</span>
            <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust2')}</span>
            <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust3')}</span>
          </div>
          <div className={styles.heroCtaRow}>
            <button onClick={() => navigate('/dealer-quote')} className={`${btn.btnAccent} ${styles.heroCta}`}>
              {t('ctaButton')}
            </button>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section ref={problemRef} className={`${styles.problem} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kickerInverse}>&#9670; {t('problem.kicker')}</span>
          <h2 className={styles.h2Inverse}>{t('problem.title')}</h2>
          <p className={styles.problemIntro}>{t('problem.intro')}</p>
          <div className={styles.problemGrid}>
            {Array.isArray(problemPoints) && problemPoints.map((pt, i) => (
              <div key={i} className={pt.positive ? styles.problemCardPositive : styles.problemCardNegative}>
                <h3 className={styles.problemCardTitle}>{pt.title}</h3>
                <p className={styles.problemCardDesc}>{pt.positive || pt.negative}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section ref={capRef} className={`${styles.section} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('capabilities.kicker')}</span>
          <h2 className={styles.h2}>{t('capabilities.title')}</h2>
          <p className={styles.sectionSub}>{t('capabilities.subtitle')}</p>
          <div className={styles.capGrid}>
            {Array.isArray(capabilities) && capabilities.map((c, i) => (
              <div key={i} className={styles.capCard}>
                <div className={styles.capNum}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className={styles.capTitle}>{c.title}</h3>
                <p className={styles.capDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section ref={wfRef} className={`${styles.sectionMuted} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('workflow.kicker')}</span>
          <h2 className={styles.h2}>{t('workflow.title')}</h2>
          <p className={styles.sectionSub}>{t('workflow.subtitle')}</p>
          <ol className={styles.timeline}>
            {Array.isArray(workflow) && workflow.map((step, i) => (
              <li key={i} className={styles.timelineItem}>
                <span className={styles.timelineDay}>{step.day}</span>
                <div className={styles.timelineBody}>
                  <h3 className={styles.timelineTitle}>{step.title}</h3>
                  <p className={styles.timelineDesc}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Payment Options */}
      <section ref={payRef} className={`${styles.section} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('paymentOptions.kicker')}</span>
          <h2 className={styles.h2}>{t('paymentOptions.title')}</h2>
          <p className={styles.sectionSub}>{t('paymentOptions.subtitle')}</p>
          <div className={styles.payGrid}>
            {Array.isArray(paymentOptions) && paymentOptions.map((o, i) => (
              <div key={i} className={styles.payCard}>
                <span className={styles.payTag}>{o.tag}</span>
                <h3 className={styles.payName}>{o.name}</h3>
                <p className={styles.payDesc}>{o.desc}</p>
                <ul className={styles.payList}>
                  {Array.isArray(o.features) && o.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.payNote}>{t('paymentOptions.note')}</p>
        </div>
      </section>

      {/* Portal */}
      <section ref={portalRef} className={`${styles.sectionGradient} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('portal.kicker')}</span>
          <h2 className={styles.h2}>{t('portal.title')}</h2>
          <p className={styles.sectionSub}>{t('portal.subtitle')}</p>
          <div className={styles.portalGrid}>
            {Array.isArray(portalFeatures) && portalFeatures.map((f, i) => (
              <div key={i} className={styles.portalCard}>
                <h3 className={styles.portalLabel}>{f.label}</h3>
                <p className={styles.portalDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auction Coverage */}
      <section ref={aucRef} className={`${styles.section} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('auctions.kicker')}</span>
          <h2 className={styles.h2}>{t('auctions.title')}</h2>
          <p className={styles.sectionSub}>{t('auctions.subtitle')}</p>
          <div className={styles.auctionGrid}>
            {Array.isArray(auctions) && auctions.map((a, i) => (
              <Link key={i} to={a.link || '/auction-car-shipping'} className={styles.auctionCard}>
                <h3 className={styles.auctionName}>{a.name}</h3>
                <div className={styles.auctionCoverage}>{a.coverage}</div>
                <p className={styles.auctionFeature}>{a.feature}</p>
                <span className={styles.auctionCta}>Details &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section ref={caseRef} className={`${styles.sectionMuted} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('useCases.kicker')}</span>
          <h2 className={styles.h2}>{t('useCases.title')}</h2>
          <div className={styles.caseGrid}>
            {Array.isArray(useCases) && useCases.map((c, i) => (
              <div key={i} className={styles.caseCard}>
                <div className={styles.caseNum}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className={styles.caseTitle}>{c.title}</h3>
                <p className={styles.caseDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Billing */}
      <section ref={billRef} className={`${styles.section} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('billing.kicker')}</span>
          <h2 className={styles.h2}>{t('billing.title')}</h2>
          <p className={styles.sectionSub}>{t('billing.intro')}</p>
          <div className={styles.billGrid}>
            {Array.isArray(billing) && billing.map((f, i) => (
              <div key={i} className={styles.billCard}>
                <h3 className={styles.billLabel}>{f.label}</h3>
                <p className={styles.billDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When Things Fail */}
      <section ref={failRef} className={`${styles.sectionMuted} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('whenThingsFail.kicker')}</span>
          <h2 className={styles.h2}>{t('whenThingsFail.title')}</h2>
          <p className={styles.sectionSub}>{t('whenThingsFail.intro')}</p>
          <div className={styles.failGrid}>
            {Array.isArray(failures) && failures.map((s, i) => (
              <div key={i} className={styles.failCard}>
                <h3 className={styles.failSituation}>{s.situation}</h3>
                <p className={styles.failResponse}>{s.response}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section ref={segRef} className={`${styles.section} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('whoWeServe.kicker')}</span>
          <h2 className={styles.h2}>{t('whoWeServe.title')}</h2>
          <div className={styles.segGrid}>
            {Array.isArray(segments) && segments.map((s, i) => (
              <div key={i} className={styles.segCard}>
                <h3 className={styles.segName}>{s.name}</h3>
                <p className={styles.segDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Different - Comparison Table */}
      <section ref={compareRef} className={`${styles.sectionMuted} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('howDifferent.kicker')}</span>
          <h2 className={styles.h2}>{t('howDifferent.title')}</h2>
          <p className={styles.sectionSub}>{t('howDifferent.subtitle')}</p>
          <div className={styles.compareTableWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>{compareHeaders.feature || 'Feature'}</th>
                  <th>{compareHeaders.internal || 'Internal Dispatcher'}</th>
                  <th>{compareHeaders.broker || 'Generic Broker'}</th>
                  <th className={styles.compareY7Col}>{compareHeaders.y7 || 'Y7 Dispatch Department'}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(compareRows) && compareRows.map((row, i) => (
                  <tr key={i}>
                    <td className={styles.compareFeature}>{row.feature}</td>
                    <td>{row.internal}</td>
                    <td>{row.broker}</td>
                    <td className={styles.compareY7Cell}>{row.y7}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className={`${styles.section} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <span className={styles.kicker}>&#9670; {t('faqs.kicker')}</span>
          <h2 className={styles.h2}>{t('faqs.title')}</h2>
          <div className={styles.faqList}>
            {Array.isArray(faqs) && faqs.map((f, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{f.q}</span>
                  <span className={styles.faqChevron} aria-hidden="true">&#9662;</span>
                </summary>
                <p className={styles.faqAnswer}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className={`${styles.ctaStrip} ${styles.fadeSection}`}>
        <div className={styles.inner}>
          <h2 className={styles.ctaTitle}>{t('ctaTitle')}</h2>
          <p className={styles.ctaSubtitle}>{t('ctaSubtitle')}</p>
          <button onClick={() => navigate('/dealer-quote')} className={`${btn.btn} ${styles.ctaBtn}`}>
            {t('ctaButton')}
          </button>
        </div>
      </section>

      {/* Crosslinks */}
      <section className={styles.crosslinks}>
        <div className={styles.inner}>
          <h3 className={styles.crosslinksTitle}>{t('crosslinks.title')}</h3>
          <div className={styles.crosslinksGrid}>
            {Array.isArray(crosslinks) && crosslinks.map((c, i) => (
              <Link key={i} to={c.to} className={styles.crosslink}>{c.label} &rarr;</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
