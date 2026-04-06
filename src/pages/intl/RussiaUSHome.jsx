import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// RussiaUSHome.jsx — Template A (Home/Overview)
// Route: /ru-us | lang="ru" | Audience: Russian-speaking US diaspora
// =============================================================================
// IMPORTANT NOTES:
// - Y7 HAS Russian-speaking team members
// - DO NOT mention Russia as a destination (sanctions compliance)
// - Mention DaytonaCargo only as "international shipping" without specifying country
// - All visible text is PLACEHOLDER — replace with real copy before launch
// =============================================================================

// ---------------------------------------------------------------------------
// Structured Data — FAQ
// ---------------------------------------------------------------------------
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q1',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A1',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q2',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A2',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q3',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A3',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q4',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A4',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q5',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A5',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q6',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A6',
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Structured Data — Breadcrumb
// ---------------------------------------------------------------------------
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'PLACEHOLDER_BREADCRUMB_HOME',
      item: 'https://www.y7agency.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'PLACEHOLDER_BREADCRUMB_RU_US',
      item: 'https://www.y7agency.com/ru-us',
    },
  ],
};

// ---------------------------------------------------------------------------
// Data arrays
// ---------------------------------------------------------------------------

// TODO-RU-US: Replace all PLACEHOLDER strings with real Russian copy
const STATS = [
  { number: 'PLACEHOLDER_STAT_1_NUMBER', label: 'PLACEHOLDER_STAT_1_LABEL' },
  { number: 'PLACEHOLDER_STAT_2_NUMBER', label: 'PLACEHOLDER_STAT_2_LABEL' },
  { number: 'PLACEHOLDER_STAT_3_NUMBER', label: 'PLACEHOLDER_STAT_3_LABEL' },
];

// TODO-RU-US: Services for US diaspora — NOT "two companies" framing
const SERVICES = [
  {
    title: 'PLACEHOLDER_SERVICE_1_TITLE',
    description: 'PLACEHOLDER_SERVICE_1_DESC',
    icon: 'PLACEHOLDER_SERVICE_1_ICON',
  },
  {
    title: 'PLACEHOLDER_SERVICE_2_TITLE',
    description: 'PLACEHOLDER_SERVICE_2_DESC',
    icon: 'PLACEHOLDER_SERVICE_2_ICON',
  },
  {
    title: 'PLACEHOLDER_SERVICE_3_TITLE',
    description: 'PLACEHOLDER_SERVICE_3_DESC',
    icon: 'PLACEHOLDER_SERVICE_3_ICON',
  },
  {
    title: 'PLACEHOLDER_SERVICE_4_TITLE',
    description: 'PLACEHOLDER_SERVICE_4_DESC',
    icon: 'PLACEHOLDER_SERVICE_4_ICON',
  },
  {
    title: 'PLACEHOLDER_SERVICE_5_TITLE',
    description: 'PLACEHOLDER_SERVICE_5_DESC',
    icon: 'PLACEHOLDER_SERVICE_5_ICON',
  },
];

// TODO-RU-US: Replace with real process steps
const PROCESS_STEPS = [
  { num: 1, title: 'PLACEHOLDER_STEP_1_TITLE', desc: 'PLACEHOLDER_STEP_1_DESC' },
  { num: 2, title: 'PLACEHOLDER_STEP_2_TITLE', desc: 'PLACEHOLDER_STEP_2_DESC' },
  { num: 3, title: 'PLACEHOLDER_STEP_3_TITLE', desc: 'PLACEHOLDER_STEP_3_DESC' },
  { num: 4, title: 'PLACEHOLDER_STEP_4_TITLE', desc: 'PLACEHOLDER_STEP_4_DESC' },
  { num: 5, title: 'PLACEHOLDER_STEP_5_TITLE', desc: 'PLACEHOLDER_STEP_5_DESC' },
];

// TODO-RU-US: Replace with real cost breakdown
const COST_CARDS = [
  {
    title: 'PLACEHOLDER_COST_1_TITLE',
    amount: 'PLACEHOLDER_COST_1_AMOUNT',
    note: 'PLACEHOLDER_COST_1_NOTE',
  },
  {
    title: 'PLACEHOLDER_COST_2_TITLE',
    amount: 'PLACEHOLDER_COST_2_AMOUNT',
    note: 'PLACEHOLDER_COST_2_NOTE',
  },
  {
    title: 'PLACEHOLDER_COST_3_TITLE',
    amount: 'PLACEHOLDER_COST_3_AMOUNT',
    note: 'PLACEHOLDER_COST_3_NOTE',
  },
  {
    title: 'PLACEHOLDER_COST_4_TITLE',
    amount: 'PLACEHOLDER_COST_4_AMOUNT',
    note: 'PLACEHOLDER_COST_4_NOTE',
  },
];

// TODO-RU-US: Replace with real car examples
const CAR_EXAMPLES = [
  {
    title: 'PLACEHOLDER_CAR_1_TITLE',
    route: 'PLACEHOLDER_CAR_1_ROUTE',
    price: 'PLACEHOLDER_CAR_1_PRICE',
    detail: 'PLACEHOLDER_CAR_1_DETAIL',
  },
  {
    title: 'PLACEHOLDER_CAR_2_TITLE',
    route: 'PLACEHOLDER_CAR_2_ROUTE',
    price: 'PLACEHOLDER_CAR_2_PRICE',
    detail: 'PLACEHOLDER_CAR_2_DETAIL',
  },
  {
    title: 'PLACEHOLDER_CAR_3_TITLE',
    route: 'PLACEHOLDER_CAR_3_ROUTE',
    price: 'PLACEHOLDER_CAR_3_PRICE',
    detail: 'PLACEHOLDER_CAR_3_DETAIL',
  },
];

// TODO-RU-US: Replace with real risk descriptions
const RISKS = [
  { title: 'PLACEHOLDER_RISK_1_TITLE', desc: 'PLACEHOLDER_RISK_1_DESC' },
  { title: 'PLACEHOLDER_RISK_2_TITLE', desc: 'PLACEHOLDER_RISK_2_DESC' },
  { title: 'PLACEHOLDER_RISK_3_TITLE', desc: 'PLACEHOLDER_RISK_3_DESC' },
  { title: 'PLACEHOLDER_RISK_4_TITLE', desc: 'PLACEHOLDER_RISK_4_DESC' },
];

// TODO-RU-US: Replace with real FAQ content
const FAQS = [
  { q: 'PLACEHOLDER_FAQ_Q1', a: 'PLACEHOLDER_FAQ_A1' },
  { q: 'PLACEHOLDER_FAQ_Q2', a: 'PLACEHOLDER_FAQ_A2' },
  { q: 'PLACEHOLDER_FAQ_Q3', a: 'PLACEHOLDER_FAQ_A3' },
  { q: 'PLACEHOLDER_FAQ_Q4', a: 'PLACEHOLDER_FAQ_A4' },
  { q: 'PLACEHOLDER_FAQ_Q5', a: 'PLACEHOLDER_FAQ_A5' },
  { q: 'PLACEHOLDER_FAQ_Q6', a: 'PLACEHOLDER_FAQ_A6' },
];

// ---------------------------------------------------------------------------
// Shared inline styles
// ---------------------------------------------------------------------------
const styles = {
  main: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#2C2C2A',
    background: '#F7F5F0',
  },
  section: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem)',
  },
  h1: {
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    lineHeight: '1.15',
    fontWeight: 400,
  },
  h2: {
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
    lineHeight: '1.2',
    fontWeight: 400,
    marginBottom: '1rem',
  },
  paragraph: {
    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
    lineHeight: '1.7',
    color: '#4A4A46',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #E8E4DC',
  },
  ctaButton: {
    background: '#993C1D',
    color: '#fff',
    padding: '0.875rem 1.75rem',
    borderRadius: '6px',
    display: 'inline-block',
    textDecoration: 'none',
    fontFamily: 'system-ui, sans-serif',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
  },
  darkCta: {
    background: '#2C2C2A',
    color: '#F7F5F0',
  },
  statNumber: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 300,
    color: '#993C1D',
  },
  sansFont: {
    fontFamily: 'system-ui, sans-serif',
  },
  accent: {
    color: '#993C1D',
  },
};

// =============================================================================
// Component
// =============================================================================
function RussiaUSHome() {
  return (
    <div style={styles.main}>
      {/* ----------------------------------------------------------------- */}
      {/* Head / SEO                                                        */}
      {/* ----------------------------------------------------------------- */}
      <Helmet>
        {/* TODO-RU-US: Replace PLACEHOLDER meta with real Russian copy */}
        <html lang="ru" />
        <title>PLACEHOLDER_META_TITLE</title>
        <meta name="description" content="PLACEHOLDER_META_DESCRIPTION" />
        <link rel="canonical" href="https://www.y7agency.com/ru-us" />
        <meta property="og:title" content="PLACEHOLDER_OG_TITLE" />
        <meta property="og:description" content="PLACEHOLDER_OG_DESCRIPTION" />
        <meta property="og:url" content="https://www.y7agency.com/ru-us" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_US" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath=""
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianUSVersion={true}
      />

      {/* ================================================================= */}
      {/* SECTION 1 — Hero                                                  */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* Brand line */}
        <p
          style={{
            ...styles.sansFont,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#993C1D',
            marginBottom: '0.75rem',
          }}
        >
          Y7 Logistics
        </p>

        {/* TODO-RU-US: Replace hero heading */}
        <h1 style={styles.h1}>
          PLACEHOLDER_H1
        </h1>

        {/* TODO-RU-US: Replace lead paragraph (~100 words) */}
        <p
          style={{
            ...styles.paragraph,
            marginTop: '1.5rem',
            maxWidth: '720px',
          }}
        >
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_1
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_2
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_3
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_4
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_5
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_6
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_7
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_8
        </p>

        {/* CTA button */}
        <div style={{ marginTop: '2rem' }}>
          <Link to="/ru-us/ship-my-car" style={styles.ctaButton}>
            PLACEHOLDER_CTA_HERO
          </Link>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — Quick Stats                                           */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i}>
              <p style={styles.statNumber}>{stat.number}</p>
              <p
                style={{
                  ...styles.sansFont,
                  fontSize: '0.95rem',
                  color: '#4A4A46',
                  marginTop: '0.25rem',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Our Services (US diaspora framing)                    */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* TODO-RU-US: Replace heading and description */}
        <h2 style={styles.h2}>PLACEHOLDER_SERVICES_H2</h2>
        <p style={{ ...styles.paragraph, marginBottom: '2rem' }}>
          PLACEHOLDER_SERVICES_DESCRIPTION
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {SERVICES.map((svc, i) => (
            <div key={i} style={styles.card}>
              <p
                style={{
                  fontSize: '1.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                {svc.icon}
              </p>
              <h3
                style={{
                  ...styles.sansFont,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#2C2C2A',
                }}
              >
                {svc.title}
              </h3>
              <p style={{ ...styles.paragraph, fontSize: '0.95rem' }}>
                {svc.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — Process Steps                                         */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_PROCESS_H2</h2>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '1.5rem',
          }}
        >
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.num}
              style={{
                ...styles.card,
                display: 'grid',
                gridTemplateColumns: '3rem 1fr',
                gap: '1rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  ...styles.statNumber,
                  fontSize: '1.75rem',
                  lineHeight: '1',
                }}
              >
                {step.num}
              </span>
              <div>
                <h3
                  style={{
                    ...styles.sansFont,
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                    color: '#2C2C2A',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ ...styles.paragraph, fontSize: '0.95rem' }}>
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — Cost Breakdown                                        */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_COST_H2</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {COST_CARDS.map((cost, i) => (
            <div key={i} style={styles.card}>
              <p
                style={{
                  ...styles.sansFont,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#4A4A46',
                  marginBottom: '0.5rem',
                }}
              >
                {cost.title}
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 300,
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                {cost.amount}
              </p>
              <p
                style={{
                  ...styles.paragraph,
                  fontSize: '0.875rem',
                }}
              >
                {cost.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — Real Examples                                         */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_EXAMPLES_H2</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {CAR_EXAMPLES.map((car, i) => (
            <div key={i} style={styles.card}>
              <h3
                style={{
                  ...styles.sansFont,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#2C2C2A',
                }}
              >
                {car.title}
              </h3>
              <p
                style={{
                  ...styles.paragraph,
                  fontSize: '0.9rem',
                  marginBottom: '0.25rem',
                }}
              >
                {car.route}
              </p>
              <p
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                {car.price}
              </p>
              <p
                style={{
                  ...styles.paragraph,
                  fontSize: '0.85rem',
                }}
              >
                {car.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — Risks                                                 */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_RISKS_H2</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {RISKS.map((risk, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                borderLeft: '3px solid #993C1D',
              }}
            >
              <h3
                style={{
                  ...styles.sansFont,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#2C2C2A',
                }}
              >
                {risk.title}
              </h3>
              <p style={{ ...styles.paragraph, fontSize: '0.9rem' }}>
                {risk.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 8 — FAQ                                                   */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_FAQ_H2</h2>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {FAQS.map((faq, i) => (
            <details
              key={i}
              style={{
                ...styles.card,
                cursor: 'pointer',
              }}
            >
              <summary
                style={{
                  ...styles.sansFont,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#2C2C2A',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.q}
                <span
                  style={{
                    fontSize: '1.25rem',
                    color: '#993C1D',
                    marginLeft: '1rem',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  ...styles.paragraph,
                  marginTop: '1rem',
                  fontSize: '0.95rem',
                }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 9 — Dark CTA                                              */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.darkCta,
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* TODO-RU-US: Replace CTA copy */}
          <h2
            style={{
              ...styles.h2,
              color: '#F7F5F0',
            }}
          >
            PLACEHOLDER_DARK_CTA_H2
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.7',
              color: '#A8A49C',
              marginBottom: '2rem',
            }}
          >
            PLACEHOLDER_DARK_CTA_DESCRIPTION
          </p>
          <Link
            to="/ru-us/ship-my-car"
            style={{
              ...styles.ctaButton,
              fontSize: '1.05rem',
            }}
          >
            PLACEHOLDER_DARK_CTA_BUTTON
          </Link>
          <p
            style={{
              ...styles.sansFont,
              fontSize: '0.85rem',
              color: '#6B6963',
              marginTop: '1rem',
            }}
          >
            PLACEHOLDER_DARK_CTA_SUBTEXT
          </p>
        </div>
      </section>
    </div>
  );
}

export default RussiaUSHome;
