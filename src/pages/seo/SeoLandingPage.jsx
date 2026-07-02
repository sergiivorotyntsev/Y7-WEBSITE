/* eslint-disable react-refresh/only-export-components */
// Exports both the SeoLandingPage default and a `Section` named export used
// by every enriched SEO page. Splitting would cascade through ~30 imports;
// dev-only HMR warning safe to suppress.
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import EntityTldr from '../../components/EntityTldr';
import ContextualCTA from '../../components/ContextualCTA';
import RelatedGuides from '../../components/RelatedGuides';
import { RELATED_GUIDES } from '../../data/relatedGuides';
import styles from './SeoLandingPage.module.css';

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

/**
 * SeoLandingPage — reusable template for SEO landing pages.
 *
 * Props:
 *   meta        { title, description, path }
 *   heading     H1 text
 *   intro       Intro paragraph
 *   whenNeeded  [string]
 *   steps       [{ title, desc }]
 *   requirements [string]
 *   capabilities [string]
 *   faqs        [{ q, a }]
 *   ctaLabel    default "Get a Free Quote"
 *   ctaTo       default "/quote"
 *   related     [{ label, to }]
 */
export default function SeoLandingPage({
  meta, heading, intro, whenNeeded, steps, requirements, capabilities, faqs,
  ctaLabel = 'Get a Free Quote', ctaTo = '/quote', related = [], children,
  // OVERNIGHT-T04: contextual money-page CTAs.
  // Each is { intlKey: 'dealers' | 'exporters' | 'shipMyCar', to: '/dealers'|...,
  //          tone: 'coral'|'teal'|'amber' }. primaryCTA appears after intro,
  // secondaryCTA appears before the generic "Ready to get started?" block.
  primaryCTA = null, secondaryCTA = null,
  // SEOAI-T04: optional front-loaded extractable answer block ({ kicker, text }),
  // rendered right after the intro. EN-only by construction on these pages.
  tldr = null,
}) {
  const schemas = [];

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.y7agency.com/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.y7agency.com/services' },
      { '@type': 'ListItem', position: 3, name: heading, item: `https://www.y7agency.com${meta.path}` },
    ],
  });

  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: heading,
    description: meta.description,
    provider: { '@id': 'https://www.y7agency.com/#organization' },
    areaServed: { '@type': 'Country', name: 'United States' },
    url: `https://www.y7agency.com${meta.path}`,
  });

  const combinedSchema = JSON.stringify(schemas);
  const relatedGuidesLinks = RELATED_GUIDES[meta.path];

  return (
    <>
      <div className={styles.wrap}>
        <PageMeta title={meta.title} description={meta.description} path={meta.path} schema={combinedSchema} />

        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link to="/" className={styles.crumbLink}>Home</Link>
          <span className={styles.crumbSep}>/</span>
          <Link to="/services" className={styles.crumbLink}>Services</Link>
          <span className={styles.crumbSep}>/</span>
          <span className={styles.crumbCurrent}>{heading}</span>
        </nav>

        <h1 className={styles.title}>{heading}</h1>
        <p className={styles.intro}>{intro}</p>

        {tldr && <EntityTldr kicker={tldr.kicker} text={tldr.text} ariaLabel={tldr.ariaLabel} />}

        {primaryCTA && (
          <ContextualCTA
            variant="card"
            to={primaryCTA.to}
            intlKey={primaryCTA.intlKey}
            tone={primaryCTA.tone || 'coral'}
          />
        )}

        {children}

        {whenNeeded && whenNeeded.length > 0 && (
          <Section title="When You Need This">
            <ul className={styles.list}>
              {whenNeeded.map((item, i) => (
                <li key={i} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {steps && steps.length > 0 && (
          <Section title="How It Works">
            <div className={styles.steps}>
              {steps.map((step, i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepNum}>{i + 1}</div>
                  <div>
                    <div className={styles.stepTitle}>{step.title}</div>
                    <div className={styles.stepDesc}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {requirements && requirements.length > 0 && (
          <Section title="What You Need">
            <ul className={styles.list}>
              {requirements.map((item, i) => (
                <li key={i} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {capabilities && capabilities.length > 0 && (
          <Section title="Our Capabilities">
            <div className={styles.capabilityGrid}>
              {capabilities.map((item, i) => (
                <div key={i} className={styles.capability}>{item}</div>
              ))}
            </div>
          </Section>
        )}

        {faqs && faqs.length > 0 && (
          <Section title="Frequently Asked Questions">
            <div className={styles.faqList}>
              {faqs.map((faq, i) => (
                <details key={i} className={styles.faq}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.q}</span>
                    <Chevron />
                  </summary>
                  <p className={styles.faqA}>{faq.a}</p>
                </details>
              ))}
            </div>
          </Section>
        )}

        {secondaryCTA && (
          <ContextualCTA
            variant="card"
            to={secondaryCTA.to}
            intlKey={secondaryCTA.intlKey}
            tone={secondaryCTA.tone || 'teal'}
          />
        )}

        <div className={styles.ctaBlock}>
          <h2 className={styles.ctaTitle}>Ready to get started?</h2>
          <p className={styles.ctaSubtitle}>Transparent pricing, verified carriers, fast dispatch response.</p>
          <Link to={ctaTo} className={styles.ctaBtn}>
            {ctaLabel}
          </Link>
        </div>

        {related.length > 0 && (
          <div className={styles.relatedBlock}>
            <h3 className={styles.relatedHeading}>Related Services</h3>
            <div className={styles.relatedPills}>
              {related.map((link, i) => (
                <Link key={i} to={link.to} className={styles.relatedPill}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <RelatedGuides links={relatedGuidesLinks} />
    </>
  );
}

export function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

/* Legacy exports kept for backwards compat with any callers that import them */
export const listItemStyle = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: '14px',
  color: '#706E68',
  lineHeight: 1.7,
};
