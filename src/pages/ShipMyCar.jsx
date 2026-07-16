import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import HreflangTags from '../components/HreflangTags';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import MoneyPageSchema from '../components/MoneyPageSchema';
import QuoteForm from '../components/QuoteForm';
import TransportComparison from '../components/TransportComparison';
import ProcessTimeline from '../components/ProcessTimeline';
import styles from './ShipMyCar.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';
import v2c from '../styles/v2/cards.module.css';
import v2a from '../styles/v2/accents.module.css';

// DESIGN-V2-W4-T03: Dispatch Board restyle. SEO contract frozen: every heading
// text/level, i18n key, section order, and schema call site (BreadcrumbSchema +
// MoneyPageSchema, no FAQPage) is unchanged. Only classNames and band wrappers
// changed. Band map (approved, strict B/P alternation, 40%+ dark):
// hero=B · steps+cost+pricingTable=P · season+seasonalNotes=B ·
// prep+pickup+delivery+insurance=P · comparison=B (cream island) · bol=P ·
// quote=B · ProcessTimeline+faq=P · finalCta=B (close-dark) · crosslinks=P.
// No entrance animations (page had none; Reveal Gate law). JP marks: hero
// strip + finalCta stamp = 2 total (density cap). Signal Budget per band:
// hero CTA, quote-band submit, and finalCta CTA are the fills of their own
// bands; eyebrow rule-lines and the kaizen stamp are the counted accents.

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
  const pricingTiers = t('pricingTiers', { returnObjects: true });
  const seasonalNotes = t('seasonalNotes', { returnObjects: true });
  const pricingRows = pricingTiers && pricingTiers.rows ? pricingTiers.rows : [];
  const seasonalItems = seasonalNotes && seasonalNotes.items ? seasonalNotes.items : [];
  const prepItems = prepList && prepList.items ? prepList.items : (Array.isArray(prepList) ? prepList : []);

  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Ship My Car',url:'/ship-my-car'}]} />
      <MoneyPageSchema pageType="shipMyCar" />
      <PageMeta title={tCommon('meta.shipMyCarTitle')} description={tCommon('meta.shipMyCarDescription')} path="/ship-my-car" />
      <HreflangTags currentPath="/ship-my-car" hasPolishVersion hasUkrainianVersion hasRussianVersion />

      {/* Hero — board. Plain mono eyebrow (no rule-line: hero budget; boardHero
          red radial is low-alpha exempt). Gradient CTA = the band's red fill.
          JP vertical strip = brand mark 1 of 2, aria-hidden. */}
      <section className={v2s.boardHero}>
        <div className={`${v2s.inner} ${styles.heroLayout}`}>
          <div className={`${v2a.jpVertical} ${styles.heroJpStrip}`} aria-hidden="true">
            シンプル・迅速・信頼
          </div>
          <div className={styles.heroText}>
            <p className={`${v2t.eyebrowPlain} ${styles.heroEyebrow}`}>{t('sections.heroKicker')}</p>
            <h1 className={`${v2t.sectionDisplay} ${styles.heroTitle}`}>{t('title')}</h1>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.heroSubtitle}`}>{t('subtitle')}</p>
            <div className={styles.heroCtaRow}>
              <a href="#quote-section" className={v2b.cta}>
                {t('hero.cta')} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className={styles.heroTrust}>
              <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust1')}</span>
              <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust2')}</span>
              <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust3')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps + pricing factors + pricing table — one manifest band.
          Steps and cost open plain (density cap); the pricing table block is
          the band's eyebrow pair, its rule-line the single red accent. The
          table itself carries no red. */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          {/* Steps */}
          <div className={styles.block}>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('sections.stepsHeading')}</h2>
            <div className={styles.stepsGrid}>
              {Array.isArray(steps) && steps.map((step, i) => (
                <div key={i} className={`${v2c.paper} ${styles.stepCard}`}>
                  <div className={`${v2t.monoLabel} ${styles.stepNum}`}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className={`${v2t.cardTitle} ${styles.cardTitleSm}`}>{step.title}</h3>
                  <p className={styles.descOnPaper}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Factors */}
          <div className={`${styles.block} ${styles.narrow}`}>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('sections.costHeading')}</h2>
            <p className={styles.bodyOnPaper}>{t('pricingFactors')}</p>
          </div>

          {/* Pricing by distance — cream sheet table, mono numerics, no red */}
          {pricingTiers && pricingRows.length > 0 && (
            <div className={styles.block}>
              <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{pricingTiers.kicker}</p>
              <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{pricingTiers.title}</h2>
              <div className={styles.pricingTableWrap}>
                <table className={`${v2c.tableOnPaper} ${styles.pricingTable}`}>
                  <thead>
                    <tr>
                      <th>{pricingTiers.headerRoute}</th>
                      <th>{pricingTiers.headerOpen}</th>
                      <th>{pricingTiers.headerEnclosed}</th>
                      <th>{pricingTiers.headerTransit}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRows.map((row, i) => (
                      <tr key={i}>
                        <td className={styles.pricingRangeCell}>{row.range}</td>
                        <td>{row.open}</td>
                        <td>{row.enclosed}</td>
                        <td>{row.transit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.pricingNote}>{pricingTiers.note}</p>
            </div>
          )}
        </div>
      </section>

      {/* Peak season + seasonal highlights — board band. Season text opens
          plain (white/secondary); seasonal cards are translucent-wash board
          cards; the seasonalNotes eyebrow rule-line is the band's red accent. */}
      <section className={v2s.board}>
        <div className={v2s.inner}>
          <div className={`${styles.block} ${styles.narrow}`}>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('sections.seasonHeading')}</h2>
            <p className={styles.bodyOnDark}>{t('peakSeason')}</p>
          </div>

          {seasonalNotes && seasonalItems.length > 0 && (
            <div className={styles.block}>
              <p className={`${v2t.eyebrow} ${v2t.eyebrowOnDark}`}>{seasonalNotes.kicker}</p>
              <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{seasonalNotes.title}</h2>
              <ul className={styles.seasonalList}>
                {seasonalItems.map((item, i) => (
                  <li key={i} className={`${v2c.board} ${styles.seasonalItem}`}>
                    <strong className={`${v2t.cardTitle} ${styles.seasonalPeriod}`}>{item.period}</strong>
                    <span className={styles.seasonalNote}>{item.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Prep checklist + pickup + delivery + insurance — one manifest band,
          narrow reading measure, plain H2 openers. Insurance callout = cream
          card, mono kicker (pine kickers are retired V1 artifacts). */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <div className={`${styles.block} ${styles.narrow}`}>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('sections.prepHeading')}</h2>
            <ul className={styles.checkList}>
              {prepItems.map((item, i) => (
                <li key={i} className={styles.checkItem}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={`${styles.block} ${styles.narrow}`}>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('sections.pickupHeading')}</h2>
            <p className={styles.bodyOnPaper}>{t('pickupProcess')}</p>
          </div>

          <div className={`${styles.block} ${styles.narrow}`}>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('sections.deliveryHeading')}</h2>
            <p className={styles.bodyOnPaper}>{t('deliveryProcess')}</p>
          </div>

          <div className={`${styles.block} ${styles.narrow}`}>
            <div className={`${v2c.paper} ${styles.callout}`}>
              <span className={`${v2t.monoLabel} ${styles.calloutKicker}`}>{t('sections.coverageKicker')}</span>
              <h3 className={`${v2t.cardTitle} ${styles.calloutTitle}`}>{t('sections.insuranceTitle')}</h3>
              <p className={styles.calloutText}>{t('insuranceInfo')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open vs Enclosed — board band. TransportComparison keeps its V1
          internals (ink-on-paper heading, white cards, V1 buttons), which are
          illegible directly on board-black, so it sits inside a cream panel
          island (the ContextualCTA-on-board precedent from /exporters). */}
      <section className={v2s.board}>
        <div className={`${v2s.inner} ${styles.comparisonInner}`}>
          <div className={styles.comparisonIsland}>
            <TransportComparison />
          </div>
        </div>
      </section>

      {/* BOL callout — manifest band, cream card, mono kicker */}
      <section className={v2s.manifest}>
        <div className={v2s.inner}>
          <div className={styles.narrow}>
            <div className={`${v2c.paper} ${styles.callout}`}>
              <span className={`${v2t.monoLabel} ${styles.calloutKicker}`}>{t('sections.atDeliveryKicker')}</span>
              <h3 className={`${v2t.cardTitle} ${styles.calloutTitle}`}>{t('bol.title')}</h3>
              <p className={styles.calloutText}>{t('bol.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote form — board band. QuoteForm keeps its own internal styling and
          reads as the light island on the dark shell; its submit button is
          this band's red fill. Heading white, plain opener. */}
      <section id="quote-section" className={v2s.board}>
        <div className={v2s.inner}>
          <div className={styles.quoteHead}>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2} ${styles.quoteTitle}`}>{t('quoteTitle')}</h2>
            <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.quoteSubtitle}`}>{t('quoteSubtitle')}</p>
          </div>
          <QuoteForm hideHeader />
        </div>
      </section>

      {/* Process timeline + FAQ — one manifest band. ProcessTimeline is an
          unedited shared component (paints its own near-paper V1 surface).
          FAQ = details accordion, Dealers treatment; its eyebrow rule-line is
          the band's red accent. */}
      <section className={v2s.manifest}>
        <ProcessTimeline />
        <div className={v2s.inner}>
          <div className={styles.faqBlock}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('sections.faqKicker')}</p>
            <h2 className={`${v2t.sectionDisplay} ${styles.h2}`}>{t('faqTitle')}</h2>
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
          </div>
        </div>
      </section>

      {/* Final CTA — board close-dark. Kaizen stamp = red accent + brand mark
          2 of 2; gradient CTA = the band's red fill. */}
      <section className={v2s.board}>
        <div className={`${v2s.inner} ${styles.finalCtaInner}`}>
          <span className={`${v2a.stamp} ${styles.ctaStamp}`} aria-hidden="true">改善</span>
          <h2 className={`${v2t.sectionDisplay} ${styles.h2} ${styles.finalCtaTitle}`}>{t('finalCta.title')}</h2>
          <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.finalCtaSubtitle}`}>{t('finalCta.subtitle')}</p>
          <a href="#quote-section" className={v2b.cta}>
            {t('finalCta.button')} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Cross-links — manifest tail. Body-Link Law styling. */}
      <section className={v2s.manifest}>
        <div className={`${v2s.inner} ${styles.crosslinksInner}`}>
          <span className={`${v2t.monoLabel} ${styles.crosslinksTitle}`}>{t('crosslinks.title')}</span>
          <div className={styles.crosslinksRow}>
            <Link to="/quote" className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>{t('crosslinks.quote')} &rarr;</Link>
            <Link to="/track" className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>{t('crosslinks.track')} &rarr;</Link>
            <Link to="/copart-shipping" className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>Buying at auction? Copart guide &rarr;</Link>
            <Link to="/faq" className={`${v2t.bodyLinkOnPaper} ${styles.crosslink}`}>{t('crosslinks.faq')} &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
