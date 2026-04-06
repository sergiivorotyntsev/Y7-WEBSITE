import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// RussiaUSCopart.jsx — Template B (Copart Guide)
// Route: /ru-us/copart-shipping | lang="ru"
// Audience: Russian-speaking US diaspora buying from Copart/IAAI
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
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q7',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A7',
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Structured Data — Service
// ---------------------------------------------------------------------------
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'PLACEHOLDER_SERVICE_NAME',
  serviceType: 'PLACEHOLDER_SERVICE_TYPE',
  provider: {
    '@type': 'Organization',
    name: 'Y7 Logistics',
    url: 'https://www.y7agency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'PLACEHOLDER_AREA_SERVED',
  },
  description: 'PLACEHOLDER_SERVICE_DESCRIPTION',
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
    {
      '@type': 'ListItem',
      position: 3,
      name: 'PLACEHOLDER_BREADCRUMB_COPART',
      item: 'https://www.y7agency.com/ru-us/copart-shipping',
    },
  ],
};

// ---------------------------------------------------------------------------
// Data arrays
// ---------------------------------------------------------------------------

// TODO-RU-US: Replace with real comparison data
const COMPARISON_ROWS = [
  {
    feature: 'PLACEHOLDER_COMPARE_FEATURE_1',
    copart: 'PLACEHOLDER_COMPARE_COPART_1',
    iaai: 'PLACEHOLDER_COMPARE_IAAI_1',
  },
  {
    feature: 'PLACEHOLDER_COMPARE_FEATURE_2',
    copart: 'PLACEHOLDER_COMPARE_COPART_2',
    iaai: 'PLACEHOLDER_COMPARE_IAAI_2',
  },
  {
    feature: 'PLACEHOLDER_COMPARE_FEATURE_3',
    copart: 'PLACEHOLDER_COMPARE_COPART_3',
    iaai: 'PLACEHOLDER_COMPARE_IAAI_3',
  },
  {
    feature: 'PLACEHOLDER_COMPARE_FEATURE_4',
    copart: 'PLACEHOLDER_COMPARE_COPART_4',
    iaai: 'PLACEHOLDER_COMPARE_IAAI_4',
  },
  {
    feature: 'PLACEHOLDER_COMPARE_FEATURE_5',
    copart: 'PLACEHOLDER_COMPARE_COPART_5',
    iaai: 'PLACEHOLDER_COMPARE_IAAI_5',
  },
  {
    feature: 'PLACEHOLDER_COMPARE_FEATURE_6',
    copart: 'PLACEHOLDER_COMPARE_COPART_6',
    iaai: 'PLACEHOLDER_COMPARE_IAAI_6',
  },
  {
    feature: 'PLACEHOLDER_COMPARE_FEATURE_7',
    copart: 'PLACEHOLDER_COMPARE_COPART_7',
    iaai: 'PLACEHOLDER_COMPARE_IAAI_7',
  },
  {
    feature: 'PLACEHOLDER_COMPARE_FEATURE_8',
    copart: 'PLACEHOLDER_COMPARE_COPART_8',
    iaai: 'PLACEHOLDER_COMPARE_IAAI_8',
  },
];

// TODO-RU-US: Replace with real fee data
const FEES = [
  { name: 'PLACEHOLDER_FEE_1_NAME', amount: 'PLACEHOLDER_FEE_1_AMOUNT', note: 'PLACEHOLDER_FEE_1_NOTE' },
  { name: 'PLACEHOLDER_FEE_2_NAME', amount: 'PLACEHOLDER_FEE_2_AMOUNT', note: 'PLACEHOLDER_FEE_2_NOTE' },
  { name: 'PLACEHOLDER_FEE_3_NAME', amount: 'PLACEHOLDER_FEE_3_AMOUNT', note: 'PLACEHOLDER_FEE_3_NOTE' },
  { name: 'PLACEHOLDER_FEE_4_NAME', amount: 'PLACEHOLDER_FEE_4_AMOUNT', note: 'PLACEHOLDER_FEE_4_NOTE' },
  { name: 'PLACEHOLDER_FEE_5_NAME', amount: 'PLACEHOLDER_FEE_5_AMOUNT', note: 'PLACEHOLDER_FEE_5_NOTE' },
  { name: 'PLACEHOLDER_FEE_6_NAME', amount: 'PLACEHOLDER_FEE_6_AMOUNT', note: 'PLACEHOLDER_FEE_6_NOTE' },
];

// TODO-RU-US: Replace with real route data
const ROUTES = [
  {
    from: 'PLACEHOLDER_ROUTE_1_FROM',
    to: 'PLACEHOLDER_ROUTE_1_TO',
    distance: 'PLACEHOLDER_ROUTE_1_DISTANCE',
    time: 'PLACEHOLDER_ROUTE_1_TIME',
  },
  {
    from: 'PLACEHOLDER_ROUTE_2_FROM',
    to: 'PLACEHOLDER_ROUTE_2_TO',
    distance: 'PLACEHOLDER_ROUTE_2_DISTANCE',
    time: 'PLACEHOLDER_ROUTE_2_TIME',
  },
  {
    from: 'PLACEHOLDER_ROUTE_3_FROM',
    to: 'PLACEHOLDER_ROUTE_3_TO',
    distance: 'PLACEHOLDER_ROUTE_3_DISTANCE',
    time: 'PLACEHOLDER_ROUTE_3_TIME',
  },
  {
    from: 'PLACEHOLDER_ROUTE_4_FROM',
    to: 'PLACEHOLDER_ROUTE_4_TO',
    distance: 'PLACEHOLDER_ROUTE_4_DISTANCE',
    time: 'PLACEHOLDER_ROUTE_4_TIME',
  },
];

// TODO-RU-US: Replace with real pitfall descriptions
const PITFALLS = [
  { title: 'PLACEHOLDER_PITFALL_1_TITLE', desc: 'PLACEHOLDER_PITFALL_1_DESC' },
  { title: 'PLACEHOLDER_PITFALL_2_TITLE', desc: 'PLACEHOLDER_PITFALL_2_DESC' },
  { title: 'PLACEHOLDER_PITFALL_3_TITLE', desc: 'PLACEHOLDER_PITFALL_3_DESC' },
  { title: 'PLACEHOLDER_PITFALL_4_TITLE', desc: 'PLACEHOLDER_PITFALL_4_DESC' },
  { title: 'PLACEHOLDER_PITFALL_5_TITLE', desc: 'PLACEHOLDER_PITFALL_5_DESC' },
  { title: 'PLACEHOLDER_PITFALL_6_TITLE', desc: 'PLACEHOLDER_PITFALL_6_DESC' },
  { title: 'PLACEHOLDER_PITFALL_7_TITLE', desc: 'PLACEHOLDER_PITFALL_7_DESC' },
];

// TODO-RU-US: Replace with real step descriptions
const HOW_IT_WORKS = [
  { title: 'PLACEHOLDER_HIW_1_TITLE', desc: 'PLACEHOLDER_HIW_1_DESC' },
  { title: 'PLACEHOLDER_HIW_2_TITLE', desc: 'PLACEHOLDER_HIW_2_DESC' },
  { title: 'PLACEHOLDER_HIW_3_TITLE', desc: 'PLACEHOLDER_HIW_3_DESC' },
  { title: 'PLACEHOLDER_HIW_4_TITLE', desc: 'PLACEHOLDER_HIW_4_DESC' },
  { title: 'PLACEHOLDER_HIW_5_TITLE', desc: 'PLACEHOLDER_HIW_5_DESC' },
  { title: 'PLACEHOLDER_HIW_6_TITLE', desc: 'PLACEHOLDER_HIW_6_DESC' },
  { title: 'PLACEHOLDER_HIW_7_TITLE', desc: 'PLACEHOLDER_HIW_7_DESC' },
];

// TODO-RU-US: Replace with real FAQ content
const FAQS = [
  { q: 'PLACEHOLDER_FAQ_Q1', a: 'PLACEHOLDER_FAQ_A1' },
  { q: 'PLACEHOLDER_FAQ_Q2', a: 'PLACEHOLDER_FAQ_A2' },
  { q: 'PLACEHOLDER_FAQ_Q3', a: 'PLACEHOLDER_FAQ_A3' },
  { q: 'PLACEHOLDER_FAQ_Q4', a: 'PLACEHOLDER_FAQ_A4' },
  { q: 'PLACEHOLDER_FAQ_Q5', a: 'PLACEHOLDER_FAQ_A5' },
  { q: 'PLACEHOLDER_FAQ_Q6', a: 'PLACEHOLDER_FAQ_A6' },
  { q: 'PLACEHOLDER_FAQ_Q7', a: 'PLACEHOLDER_FAQ_A7' },
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
function RussiaUSCopart() {
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
        <link rel="canonical" href="https://www.y7agency.com/ru-us/copart-shipping" />
        <meta property="og:title" content="PLACEHOLDER_OG_TITLE" />
        <meta property="og:description" content="PLACEHOLDER_OG_DESCRIPTION" />
        <meta property="og:url" content="https://www.y7agency.com/ru-us/copart-shipping" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ru_US" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath="/copart-shipping"
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianUSVersion={true}
      />

      {/* ================================================================= */}
      {/* Breadcrumb nav                                                    */}
      {/* ================================================================= */}
      <nav
        style={{
          ...styles.section,
          paddingTop: '1rem',
          paddingBottom: '0',
        }}
        aria-label="Breadcrumb"
      >
        <ol
          style={{
            ...styles.sansFont,
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: '#4A4A46',
            flexWrap: 'wrap',
          }}
        >
          <li>
            <Link
              to="/"
              style={{ color: '#993C1D', textDecoration: 'none' }}
            >
              PLACEHOLDER_BREADCRUMB_HOME
            </Link>
            <span style={{ margin: '0 0.25rem' }}>/</span>
          </li>
          <li>
            <Link
              to="/ru-us"
              style={{ color: '#993C1D', textDecoration: 'none' }}
            >
              PLACEHOLDER_BREADCRUMB_RU_US
            </Link>
            <span style={{ margin: '0 0.25rem' }}>/</span>
          </li>
          <li style={{ color: '#2C2C2A' }}>
            PLACEHOLDER_BREADCRUMB_COPART
          </li>
        </ol>
      </nav>

      {/* ================================================================= */}
      {/* SECTION 1 — Hero                                                  */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* TODO-RU-US: Replace hero heading and lead */}
        <h1 style={styles.h1}>
          PLACEHOLDER_H1
        </h1>
        <p
          style={{
            ...styles.paragraph,
            marginTop: '1.5rem',
            maxWidth: '720px',
          }}
        >
          PLACEHOLDER_LEAD_PARAGRAPH
        </p>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — What Copart really is                                 */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading and paragraphs */}
        <h2 style={styles.h2}>PLACEHOLDER_WHAT_COPART_H2</h2>
        <p style={{ ...styles.paragraph, marginBottom: '1rem' }}>
          PLACEHOLDER_WHAT_COPART_P1
        </p>
        <p style={{ ...styles.paragraph, marginBottom: '1rem' }}>
          PLACEHOLDER_WHAT_COPART_P2
        </p>
        <p style={styles.paragraph}>
          PLACEHOLDER_WHAT_COPART_P3
        </p>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Copart vs IAAI comparison table                       */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_COMPARISON_H2</h2>

        <div
          style={{
            overflowX: 'auto',
            borderRadius: '8px',
            border: '1px solid #E8E4DC',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              ...styles.sansFont,
              fontSize: '0.95rem',
              background: '#fff',
            }}
          >
            <thead>
              <tr style={{ background: '#F7F5F0' }}>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#2C2C2A',
                    borderBottom: '2px solid #E8E4DC',
                  }}
                >
                  PLACEHOLDER_TH_FEATURE
                </th>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#2C2C2A',
                    borderBottom: '2px solid #E8E4DC',
                  }}
                >
                  PLACEHOLDER_TH_COPART
                </th>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#2C2C2A',
                    borderBottom: '2px solid #E8E4DC',
                  }}
                >
                  PLACEHOLDER_TH_IAAI
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid #E8E4DC',
                    background: i % 2 === 0 ? '#fff' : '#FAFAF8',
                  }}
                >
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      fontWeight: 500,
                      color: '#2C2C2A',
                    }}
                  >
                    {row.feature}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4A4A46' }}>
                    {row.copart}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4A4A46' }}>
                    {row.iaai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — Fees breakdown                                        */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_FEES_H2</h2>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {FEES.map((fee, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h3
                  style={{
                    ...styles.sansFont,
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#2C2C2A',
                    marginBottom: '0.25rem',
                  }}
                >
                  {fee.name}
                </h3>
                <p
                  style={{
                    ...styles.paragraph,
                    fontSize: '0.85rem',
                  }}
                >
                  {fee.note}
                </p>
              </div>
              <p
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: '#993C1D',
                  whiteSpace: 'nowrap',
                }}
              >
                {fee.amount}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — Transport routes                                      */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_ROUTES_H2</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {ROUTES.map((route, i) => (
            <div key={i} style={styles.card}>
              <p
                style={{
                  ...styles.sansFont,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                {route.from}
              </p>
              <p
                style={{
                  ...styles.sansFont,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#2C2C2A',
                  marginBottom: '0.75rem',
                }}
              >
                {route.to}
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.9rem',
                  color: '#4A4A46',
                  ...styles.sansFont,
                }}
              >
                <span>{route.distance}</span>
                <span>{route.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — Seven pitfalls                                        */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_PITFALLS_H2</h2>

        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {PITFALLS.map((pit, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                display: 'grid',
                gridTemplateColumns: '2.5rem 1fr',
                gap: '1rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  ...styles.statNumber,
                  fontSize: '1.5rem',
                  lineHeight: '1',
                }}
              >
                {i + 1}
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
                  {pit.title}
                </h3>
                <p style={{ ...styles.paragraph, fontSize: '0.95rem' }}>
                  {pit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — How it works                                          */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_HIW_H2</h2>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          {HOW_IT_WORKS.map((step, i) => (
            <li
              key={i}
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
                  ...styles.sansFont,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: '#993C1D',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {i + 1}
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

export default RussiaUSCopart;
