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

// DESIGN-V2-W4-T01: Dispatch Board restyle. SEO contract frozen: every heading
// text/level, i18n keys, section order, schema emission, EntityTldr position,
// and all link targets are unchanged. Only classNames, wrapper structure, and
// animation wiring (Reveal, per the Reveal Gate Rule) changed.
// Band map (Gate-A approved, strict alternation): hero=B · tldr+problem=P ·
// capabilities=B · workflow=P · payment=B · portal=P · auctions=B · useCases=P ·
// billing=B · whenThingsFail=P · whoWeServe=B · howDifferent+midCta+faqs=P ·
// ctaStrip=B · crosslinks=P.
export default function Dealers() {
  const { t, i18n } = useTranslation('dealers');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();

  // SEOAI-T04: EN-only extractable answer block. Read from the active locale
  // bundle directly (not t(), which falls back to English) so ru/pl/ua render
  // nothing until parity translations land — same gating as /faq's TL;DR.
  const tldr = i18n.getResource(i18n.language, 'dealers', 'tldr') || '';

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
    provider: { '@id': 'https://www.y7agency.com/#organization' },
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

      {/* Hero — board. Signal Budget in this viewport: red fill = gradient CTA;
          boardHero's red radial is low-alpha exempt. Plain mono eyebrow (no
          rule-line: hero budget). JP vertical strip = brand mark, aria-hidden. */}
      <section className={v2s.boardHero}>
        {/* SPRINT-V21 W-CONV: photo emergence (same de-badged asset, tighter
            low-right crop than home). Decorative, aria-hidden, CLS 0. */}
        <div className={`${v2h.photoEmergence} ${styles.heroPhoto}`} aria-hidden="true">
          <picture>
            <source srcSet="/images/hero-car.avif" type="image/avif" />
            <source srcSet="/images/hero-car.webp" type="image/webp" />
            <img src="/images/hero-car.webp" alt="" width="1560" height="900" loading="eager" decoding="async" />
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
              {/* SPRINT-V21: plate-as-CTA (Angle Law) — the plate is this
                  viewport's one red fill. */}
              <button onClick={() => navigate('/dealer-quote')} className={v2h.angledPlate}>
                {t('ctaButton')}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TL;DR + Problem — one manifest band; the extractable answer card sits
          first inside it (position immediately after hero preserved). */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <EntityTldr kicker="Dealers, in brief" ariaLabel="Y7 for dealers, in brief" text={tldr} />
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('problem.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('problem.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnPaper} ${styles.sectionSub}`}>{t('problem.intro')}</p>
            <div className={styles.problemGrid}>
              {Array.isArray(problemPoints) && problemPoints.map((pt, i) => (
                <div key={i} className={pt.positive ? styles.problemCardPositive : styles.problemCardNegative}>
                  <h3 className={`${v2t.cardTitle} ${styles.problemCardTitle}`}>{pt.title}</h3>
                  <p className={styles.problemCardDesc}>{pt.positive || pt.negative}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities — board */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{t('capabilities.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('capabilities.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.sectionSub}`}>{t('capabilities.subtitle')}</p>
            <div className={styles.capGrid}>
              {Array.isArray(capabilities) && capabilities.map((c, i) => (
                <div key={i} className={`${v2c.board} ${styles.capCard}`}>
                  <div className={`${v2t.monoLabel} ${styles.numOnDark}`}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{c.title}</h3>
                  <p className={styles.descOnDark}>{c.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Workflow — manifest. Opener varies (density cap): plain H2, no eyebrow. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <Reveal>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('workflow.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnPaper} ${styles.sectionSub}`}>{t('workflow.subtitle')}</p>
            <ol className={styles.timeline}>
              {Array.isArray(workflow) && workflow.map((step, i) => (
                <li key={i} className={`${v2c.paper} ${styles.timelineItem}`}>
                  <span className={`${v2c.chipOnPaper} ${styles.timelineDay}`}>{step.day}</span>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{step.title}</h3>
                  <p className={styles.descOnPaper}>{step.desc}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Payment Options — board */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{t('paymentOptions.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('paymentOptions.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.sectionSub}`}>{t('paymentOptions.subtitle')}</p>
            <div className={styles.payGrid}>
              {Array.isArray(paymentOptions) && paymentOptions.map((o, i) => (
                <div key={i} className={`${v2c.board} ${styles.payCard}`}>
                  <span className={`${v2c.chipOnDark} ${styles.payTag}`}>{o.tag}</span>
                  <h3 className={`${v2t.cardTitle} ${styles.payName}`}>{o.name}</h3>
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
          </Reveal>
        </div>
      </section>

      {/* Portal — manifest */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('portal.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('portal.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnPaper} ${styles.sectionSub}`}>{t('portal.subtitle')}</p>
            <div className={styles.portalGrid}>
              {Array.isArray(portalFeatures) && portalFeatures.map((f, i) => (
                <div key={i} className={`${v2c.paper} ${styles.portalCard}`}>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{f.label}</h3>
                  <p className={styles.descOnPaper}>{f.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Auction Coverage — board. Opener varies (density cap): plain H2. */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <Reveal>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('auctions.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.sectionSub}`}>{t('auctions.subtitle')}</p>
            <div className={styles.auctionGrid}>
              {Array.isArray(auctions) && auctions.map((a, i) => (
                <Link key={i} to={a.link || '/auction-car-shipping'} className={`${v2c.board} ${styles.auctionCard}`}>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{a.name}</h3>
                  <div className={`${v2t.monoMicro} ${styles.auctionCoverage}`}>{a.coverage}</div>
                  <p className={styles.auctionFeature}>{a.feature}</p>
                  <span className={`${v2t.monoLabel} ${styles.auctionCta}`}>Details &rarr;</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Use Cases — manifest */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('useCases.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('useCases.title')}</h2>
            <div className={styles.caseGrid}>
              {Array.isArray(useCases) && useCases.map((c, i) => (
                <div key={i} className={`${v2c.paper} ${styles.caseCard}`}>
                  <div className={`${v2t.monoLabel} ${styles.numOnPaper}`}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{c.title}</h3>
                  <p className={styles.descOnPaper}>{c.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Billing — board */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{t('billing.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('billing.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.sectionSub}`}>{t('billing.intro')}</p>
            <div className={styles.billGrid}>
              {Array.isArray(billing) && billing.map((f, i) => (
                <div key={i} className={`${v2c.board} ${styles.billCard}`}>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{f.label}</h3>
                  <p className={styles.descOnDark}>{f.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* When Things Fail — manifest. Opener varies (density cap): plain H2. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <Reveal>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('whenThingsFail.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnPaper} ${styles.sectionSub}`}>{t('whenThingsFail.intro')}</p>
            <div className={styles.failGrid}>
              {Array.isArray(failures) && failures.map((s, i) => (
                <div key={i} className={`${v2c.paper} ${styles.failCard}`}>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{s.situation}</h3>
                  <p className={styles.descOnPaper}>{s.response}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who We Serve — board */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{t('whoWeServe.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('whoWeServe.title')}</h2>
            <div className={styles.segGrid}>
              {Array.isArray(segments) && segments.map((s, i) => (
                <div key={i} className={`${v2c.board} ${styles.segCard}`}>
                  <h3 className={`${v2t.cardTitle} ${styles.segName}`}>{s.name}</h3>
                  <p className={styles.segDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How Different + mid CTA + FAQ — one manifest band. Section order is
          unchanged; the FAQ opener varies (density cap): plain H2. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <Reveal>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('howDifferent.kicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('howDifferent.title')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnPaper} ${styles.sectionSub}`}>{t('howDifferent.subtitle')}</p>
            <div className={styles.compareTableWrap}>
              <table className={`${v2c.tableOnPaper} ${styles.compareTable}`}>
                <thead>
                  <tr>
                    <th>{compareHeaders.feature || 'Feature'}</th>
                    <th>{compareHeaders.internal || 'Internal Dispatcher'}</th>
                    <th>{compareHeaders.broker || 'Generic Broker'}</th>
                    <th className={v2c.tableColHighlight}>{compareHeaders.y7 || 'Y7 Dispatch Department'}</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(compareRows) && compareRows.map((row, i) => (
                    <tr key={i}>
                      <td className={styles.compareFeature}>{row.feature}</td>
                      <td>{row.internal}</td>
                      <td>{row.broker}</td>
                      <td className={v2c.tableColHighlight}>{row.y7}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mid-page CTA: post-comparison conviction moment (the band's single red fill) */}
          <Reveal className={styles.midCta}>
            <Link to="/dealer-quote" className={v2b.cta}>
              {t('ctaButton')}
            </Link>
          </Reveal>

          <Reveal>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2} ${styles.faqHeadCenter}`}>{t('faqs.title')}</h2>
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
          </Reveal>
        </div>
      </section>

      {/* CTA strip — board close. Signal Budget: gradient CTA = fill, kaizen
          stamp = accent. 2nd JP mark of the page (strip + stamp = 2, within cap). */}
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

      {/* Crosslinks — manifest footer band. Body-Link Law styling. */}
      <section className={v2s.manifest}>
        <div className={`${v2s.inner} ${styles.crosslinksInner}`}>
          <Reveal>
            <h3 className={`${v2t.monoLabel} ${styles.crosslinksTitle}`}>{t('crosslinks.title')}</h3>
            <div className={styles.crosslinksGrid}>
              {Array.isArray(crosslinks) && crosslinks.map((c, i) => (
                <Link key={i} to={c.to} className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>{c.label} &rarr;</Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
