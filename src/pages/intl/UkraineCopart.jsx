// UkraineCopart.jsx
// Route: /ua/copart-shipping
// Audience: Ukraine-based buyers - Copart guide
// Co-brand: Y7 (US inland) + DaytonaCargo (international leg)
// TODO-UA: Replace all PLACEHOLDER strings with native Ukrainian content

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

/* ------------------------------------------------------------------ */
/*  Styles                                                            */
/* ------------------------------------------------------------------ */

const pageStyle = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#2C2C2A',
  background: '#F7F5F0',
};

const sectionStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem)',
};

const h1Style = {
  fontSize: 'clamp(2rem, 5vw, 3.25rem)',
  lineHeight: '1.15',
  fontWeight: 400,
};

const h2Style = {
  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
  lineHeight: '1.2',
  fontWeight: 400,
  marginBottom: '1rem',
};

const pStyle = {
  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
  lineHeight: '1.7',
  color: '#4A4A46',
};

const cardStyle = {
  background: '#fff',
  padding: '1.5rem',
  borderRadius: '8px',
  border: '1px solid #E8E4DC',
};

const ctaButtonStyle = {
  display: 'inline-block',
  background: '#993C1D',
  color: '#fff',
  padding: '0.875rem 1.75rem',
  borderRadius: '6px',
  textDecoration: 'none',
  fontFamily: 'system-ui, sans-serif',
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
};

const darkCtaStyle = {
  background: '#2C2C2A',
  color: '#F7F5F0',
};

const sansFont = {
  fontFamily: 'system-ui, sans-serif',
};

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

// TODO-UA: Replace all PLACEHOLDER FAQ items with real Ukrainian content
const faqItems = [
  { question: 'PLACEHOLDER_FAQ_Q1', answer: 'PLACEHOLDER_FAQ_A1' },
  { question: 'PLACEHOLDER_FAQ_Q2', answer: 'PLACEHOLDER_FAQ_A2' },
  { question: 'PLACEHOLDER_FAQ_Q3', answer: 'PLACEHOLDER_FAQ_A3' },
  { question: 'PLACEHOLDER_FAQ_Q4', answer: 'PLACEHOLDER_FAQ_A4' },
  { question: 'PLACEHOLDER_FAQ_Q5', answer: 'PLACEHOLDER_FAQ_A5' },
  { question: 'PLACEHOLDER_FAQ_Q6', answer: 'PLACEHOLDER_FAQ_A6' },
  { question: 'PLACEHOLDER_FAQ_Q7', answer: 'PLACEHOLDER_FAQ_A7' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'PLACEHOLDER_SERVICE_NAME',
  description: 'PLACEHOLDER_SERVICE_DESCRIPTION',
  provider: {
    '@type': 'Organization',
    name: 'Y7 Logistics',
    url: 'https://www.y7agency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Ukraine',
  },
  serviceType: 'PLACEHOLDER_SERVICE_TYPE',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.y7agency.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'PLACEHOLDER_BREADCRUMB_PARENT',
      item: 'https://www.y7agency.com/ua',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'PLACEHOLDER_BREADCRUMB_PAGE_NAME',
      item: 'https://www.y7agency.com/ua/copart-shipping',
    },
  ],
};

// TODO-UA: Replace with real Copart vs IAAI comparison data
const comparisonRows = [
  { feature: 'PLACEHOLDER_COMPARE_FEATURE_1', copart: 'PLACEHOLDER_COPART_1', iaai: 'PLACEHOLDER_IAAI_1' },
  { feature: 'PLACEHOLDER_COMPARE_FEATURE_2', copart: 'PLACEHOLDER_COPART_2', iaai: 'PLACEHOLDER_IAAI_2' },
  { feature: 'PLACEHOLDER_COMPARE_FEATURE_3', copart: 'PLACEHOLDER_COPART_3', iaai: 'PLACEHOLDER_IAAI_3' },
  { feature: 'PLACEHOLDER_COMPARE_FEATURE_4', copart: 'PLACEHOLDER_COPART_4', iaai: 'PLACEHOLDER_IAAI_4' },
  { feature: 'PLACEHOLDER_COMPARE_FEATURE_5', copart: 'PLACEHOLDER_COPART_5', iaai: 'PLACEHOLDER_IAAI_5' },
  { feature: 'PLACEHOLDER_COMPARE_FEATURE_6', copart: 'PLACEHOLDER_COPART_6', iaai: 'PLACEHOLDER_IAAI_6' },
  { feature: 'PLACEHOLDER_COMPARE_FEATURE_7', copart: 'PLACEHOLDER_COPART_7', iaai: 'PLACEHOLDER_IAAI_7' },
  { feature: 'PLACEHOLDER_COMPARE_FEATURE_8', copart: 'PLACEHOLDER_COPART_8', iaai: 'PLACEHOLDER_IAAI_8' },
];

// TODO-UA: Replace with real fee descriptions
const fees = [
  { name: 'PLACEHOLDER_FEE_1_NAME', desc: 'PLACEHOLDER_FEE_1_DESC', amount: 'PLACEHOLDER_FEE_1_AMT' },
  { name: 'PLACEHOLDER_FEE_2_NAME', desc: 'PLACEHOLDER_FEE_2_DESC', amount: 'PLACEHOLDER_FEE_2_AMT' },
  { name: 'PLACEHOLDER_FEE_3_NAME', desc: 'PLACEHOLDER_FEE_3_DESC', amount: 'PLACEHOLDER_FEE_3_AMT' },
  { name: 'PLACEHOLDER_FEE_4_NAME', desc: 'PLACEHOLDER_FEE_4_DESC', amount: 'PLACEHOLDER_FEE_4_AMT' },
  { name: 'PLACEHOLDER_FEE_5_NAME', desc: 'PLACEHOLDER_FEE_5_DESC', amount: 'PLACEHOLDER_FEE_5_AMT' },
  { name: 'PLACEHOLDER_FEE_6_NAME', desc: 'PLACEHOLDER_FEE_6_DESC', amount: 'PLACEHOLDER_FEE_6_AMT' },
];

// TODO-UA: Replace with real route descriptions
const routes = [
  { from: 'PLACEHOLDER_ROUTE_1_FROM', to: 'PLACEHOLDER_ROUTE_1_TO', note: 'PLACEHOLDER_ROUTE_1_NOTE', duration: 'PLACEHOLDER_ROUTE_1_TIME' },
  { from: 'PLACEHOLDER_ROUTE_2_FROM', to: 'PLACEHOLDER_ROUTE_2_TO', note: 'PLACEHOLDER_ROUTE_2_NOTE', duration: 'PLACEHOLDER_ROUTE_2_TIME' },
  { from: 'PLACEHOLDER_ROUTE_3_FROM', to: 'PLACEHOLDER_ROUTE_3_TO', note: 'PLACEHOLDER_ROUTE_3_NOTE', duration: 'PLACEHOLDER_ROUTE_3_TIME' },
  { from: 'PLACEHOLDER_ROUTE_4_FROM', to: 'PLACEHOLDER_ROUTE_4_TO', note: 'PLACEHOLDER_ROUTE_4_NOTE', duration: 'PLACEHOLDER_ROUTE_4_TIME' },
];

// TODO-UA: Replace with real pitfall descriptions
const pitfalls = [
  { num: 1, title: 'PLACEHOLDER_PITFALL_1_TITLE', desc: 'PLACEHOLDER_PITFALL_1_DESC' },
  { num: 2, title: 'PLACEHOLDER_PITFALL_2_TITLE', desc: 'PLACEHOLDER_PITFALL_2_DESC' },
  { num: 3, title: 'PLACEHOLDER_PITFALL_3_TITLE', desc: 'PLACEHOLDER_PITFALL_3_DESC' },
  { num: 4, title: 'PLACEHOLDER_PITFALL_4_TITLE', desc: 'PLACEHOLDER_PITFALL_4_DESC' },
  { num: 5, title: 'PLACEHOLDER_PITFALL_5_TITLE', desc: 'PLACEHOLDER_PITFALL_5_DESC' },
  { num: 6, title: 'PLACEHOLDER_PITFALL_6_TITLE', desc: 'PLACEHOLDER_PITFALL_6_DESC' },
  { num: 7, title: 'PLACEHOLDER_PITFALL_7_TITLE', desc: 'PLACEHOLDER_PITFALL_7_DESC' },
];

// TODO-UA: Replace with real step descriptions
const howItWorks = [
  { num: '01', title: 'PLACEHOLDER_STEP_1_TITLE', desc: 'PLACEHOLDER_STEP_1_DESC' },
  { num: '02', title: 'PLACEHOLDER_STEP_2_TITLE', desc: 'PLACEHOLDER_STEP_2_DESC' },
  { num: '03', title: 'PLACEHOLDER_STEP_3_TITLE', desc: 'PLACEHOLDER_STEP_3_DESC' },
  { num: '04', title: 'PLACEHOLDER_STEP_4_TITLE', desc: 'PLACEHOLDER_STEP_4_DESC' },
  { num: '05', title: 'PLACEHOLDER_STEP_5_TITLE', desc: 'PLACEHOLDER_STEP_5_DESC' },
  { num: '06', title: 'PLACEHOLDER_STEP_6_TITLE', desc: 'PLACEHOLDER_STEP_6_DESC' },
  { num: '07', title: 'PLACEHOLDER_STEP_7_TITLE', desc: 'PLACEHOLDER_STEP_7_DESC' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const UkraineCopart = () => {
  return (
    <div style={pageStyle}>
      <Helmet>
        {/* TODO-UA: Replace PLACEHOLDER meta with real Ukrainian SEO content */}
        <title>PLACEHOLDER_META_TITLE</title>
        <meta name="description" content="PLACEHOLDER_META_DESCRIPTION" />
        <link rel="canonical" href="https://www.y7agency.com/ua/copart-shipping" />
        <html lang="uk" />
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

      {/* ============================================================ */}
      {/*  BREADCRUMB NAV                                              */}
      {/* ============================================================ */}
      <nav
        style={{
          ...sectionStyle,
          paddingTop: '1rem',
          paddingBottom: '0',
        }}
        aria-label="breadcrumb"
      >
        <ol
          style={{
            ...sansFont,
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: '0.85rem',
            color: '#4A4A46',
            gap: '0.25rem',
          }}
        >
          <li><Link to="/" style={{ color: '#993C1D', textDecoration: 'none' }}>Home</Link></li>
          <li style={{ color: '#999' }}>/</li>
          <li><Link to="/ua" style={{ color: '#993C1D', textDecoration: 'none' }}>PLACEHOLDER_BREADCRUMB_PARENT</Link></li>
          <li style={{ color: '#999' }}>/</li>
          <li aria-current="page">PLACEHOLDER_BREADCRUMB_CURRENT</li>
        </ol>
      </nav>

      {/* ============================================================ */}
      {/*  HERO SECTION                                                */}
      {/* ============================================================ */}
      <section
        style={{
          ...sectionStyle,
          paddingTop: 'clamp(2rem, 5vw, 3rem)',
          paddingBottom: 'clamp(2rem, 5vw, 3rem)',
        }}
      >
        {/* TODO-UA: Replace with Ukrainian H1 headline */}
        <h1 style={{ ...h1Style, marginBottom: '1.5rem' }}>
          PLACEHOLDER_H1
        </h1>

        {/* TODO-UA: Replace with Ukrainian lead paragraph */}
        <p style={{ ...pStyle, maxWidth: '700px' }}>
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_1.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_2.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_3.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_4.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_5.
        </p>
      </section>

      {/* ============================================================ */}
      {/*  WHAT COPART REALLY IS                                       */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_WHAT_COPART_H2</h2>

        <p style={{ ...pStyle, marginBottom: '1.25rem' }}>
          PLACEHOLDER_COPART_PARAGRAPH_1_LINE_1.
          PLACEHOLDER_COPART_PARAGRAPH_1_LINE_2.
          PLACEHOLDER_COPART_PARAGRAPH_1_LINE_3.
          PLACEHOLDER_COPART_PARAGRAPH_1_LINE_4.
          PLACEHOLDER_COPART_PARAGRAPH_1_LINE_5.
        </p>

        <p style={{ ...pStyle, marginBottom: '1.25rem' }}>
          PLACEHOLDER_COPART_PARAGRAPH_2_LINE_1.
          PLACEHOLDER_COPART_PARAGRAPH_2_LINE_2.
          PLACEHOLDER_COPART_PARAGRAPH_2_LINE_3.
          PLACEHOLDER_COPART_PARAGRAPH_2_LINE_4.
          PLACEHOLDER_COPART_PARAGRAPH_2_LINE_5.
        </p>

        <p style={pStyle}>
          PLACEHOLDER_COPART_PARAGRAPH_3_LINE_1.
          PLACEHOLDER_COPART_PARAGRAPH_3_LINE_2.
          PLACEHOLDER_COPART_PARAGRAPH_3_LINE_3.
          PLACEHOLDER_COPART_PARAGRAPH_3_LINE_4.
          PLACEHOLDER_COPART_PARAGRAPH_3_LINE_5.
        </p>
      </section>

      {/* ============================================================ */}
      {/*  COPART VS IAAI TABLE                                        */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_COMPARE_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_COMPARE_INTRO
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              ...sansFont,
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem',
              background: '#fff',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #E8E4DC',
            }}
          >
            <thead>
              <tr style={{ background: '#2C2C2A', color: '#F7F5F0' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>
                  PLACEHOLDER_TH_FEATURE
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>
                  Copart
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>
                  IAAI
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid #E8E4DC',
                    background: i % 2 === 0 ? '#fff' : '#FAFAF8',
                  }}
                >
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#2C2C2A' }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4A4A46' }}>{row.copart}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4A4A46' }}>{row.iaai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEES BREAKDOWN                                              */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_FEES_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_FEES_INTRO
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {fees.map((fee, i) => (
            <div
              key={i}
              style={{
                ...cardStyle,
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h3
                  style={{
                    ...sansFont,
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  {fee.name}
                </h3>
                <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>{fee.desc}</p>
              </div>
              <span
                style={{
                  ...sansFont,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#993C1D',
                  whiteSpace: 'nowrap',
                }}
              >
                {fee.amount}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TRANSPORT ROUTES                                            */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_ROUTES_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_ROUTES_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {routes.map((route, i) => (
            <div key={i} style={cardStyle}>
              <div
                style={{
                  ...sansFont,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                {route.duration}
              </div>
              <h3
                style={{
                  ...sansFont,
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.35rem',
                }}
              >
                {route.from} → {route.to}
              </h3>
              <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>{route.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEVEN PITFALLS                                              */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_PITFALLS_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_PITFALLS_INTRO
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pitfalls.map((item) => (
            <div
              key={item.num}
              style={{
                ...cardStyle,
                display: 'grid',
                gridTemplateColumns: '2.5rem 1fr',
                gap: '1rem',
                alignItems: 'start',
                borderLeft: '3px solid #993C1D',
              }}
            >
              <span
                style={{
                  ...sansFont,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#993C1D',
                }}
              >
                {item.num}
              </span>
              <div>
                <h3
                  style={{
                    ...sansFont,
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_HOW_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_HOW_INTRO
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {howItWorks.map((step) => (
            <div
              key={step.num}
              style={{
                ...cardStyle,
                display: 'grid',
                gridTemplateColumns: '3rem 1fr',
                gap: '1rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  ...sansFont,
                  fontSize: '1.5rem',
                  fontWeight: 300,
                  color: '#993C1D',
                }}
              >
                {step.num}
              </span>
              <div>
                <h3
                  style={{
                    ...sansFont,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ ...pStyle, fontSize: '0.95rem', margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ SECTION                                                 */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_FAQ_H2</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqItems.map((faq, i) => (
            <details
              key={i}
              style={{
                ...cardStyle,
                cursor: 'pointer',
              }}
            >
              <summary
                style={{
                  ...sansFont,
                  fontSize: '1rem',
                  fontWeight: 600,
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.question}
                <span style={{ marginLeft: '1rem', color: '#993C1D', fontSize: '1.25rem' }}>+</span>
              </summary>
              <p style={{ ...pStyle, fontSize: '0.95rem', marginTop: '0.75rem' }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DARK CTA SECTION                                            */}
      {/* ============================================================ */}
      <section
        style={{
          ...darkCtaStyle,
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* TODO-UA: Replace with Ukrainian CTA headline */}
          <h2
            style={{
              ...h2Style,
              color: '#F7F5F0',
              marginBottom: '1rem',
            }}
          >
            PLACEHOLDER_CTA_H2
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.7',
              color: '#C8C5BE',
              marginBottom: '2rem',
            }}
          >
            PLACEHOLDER_CTA_PARAGRAPH
          </p>
          <Link
            to="/ua/ship-my-car"
            style={{
              ...ctaButtonStyle,
              fontSize: '1.05rem',
            }}
          >
            PLACEHOLDER_CTA_BUTTON
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UkraineCopart;
