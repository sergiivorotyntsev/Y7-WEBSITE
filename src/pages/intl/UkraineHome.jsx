// UkraineHome.jsx
// Route: /ua
// Audience: Ukraine-based buyers importing cars from USA
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

const statNumberStyle = {
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 300,
  color: '#993C1D',
};

const sansFont = {
  fontFamily: 'system-ui, sans-serif',
};

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

// TODO-UA: Replace all PLACEHOLDER FAQ answers with real Ukrainian content
const faqItems = [
  {
    question: 'PLACEHOLDER_FAQ_Q1',
    answer: 'PLACEHOLDER_FAQ_A1',
  },
  {
    question: 'PLACEHOLDER_FAQ_Q2',
    answer: 'PLACEHOLDER_FAQ_A2',
  },
  {
    question: 'PLACEHOLDER_FAQ_Q3',
    answer: 'PLACEHOLDER_FAQ_A3',
  },
  {
    question: 'PLACEHOLDER_FAQ_Q4',
    answer: 'PLACEHOLDER_FAQ_A4',
  },
  {
    question: 'PLACEHOLDER_FAQ_Q5',
    answer: 'PLACEHOLDER_FAQ_A5',
  },
  {
    question: 'PLACEHOLDER_FAQ_Q6',
    answer: 'PLACEHOLDER_FAQ_A6',
  },
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
      name: 'PLACEHOLDER_BREADCRUMB_PAGE_NAME',
      item: 'https://www.y7agency.com/ua',
    },
  ],
};

// TODO-UA: Replace placeholder stat values with real data
const stats = [
  { number: 'PLACEHOLDER_STAT_1_NUM', label: 'PLACEHOLDER_STAT_1_LABEL' },
  { number: 'PLACEHOLDER_STAT_2_NUM', label: 'PLACEHOLDER_STAT_2_LABEL' },
  { number: 'PLACEHOLDER_STAT_3_NUM', label: 'PLACEHOLDER_STAT_3_LABEL' },
];

// TODO-UA: Replace with real Y7 services
const y7Services = [
  'PLACEHOLDER_Y7_SERVICE_1',
  'PLACEHOLDER_Y7_SERVICE_2',
  'PLACEHOLDER_Y7_SERVICE_3',
  'PLACEHOLDER_Y7_SERVICE_4',
  'PLACEHOLDER_Y7_SERVICE_5',
];

// TODO-UA: Replace with real DaytonaCargo services
const daytonaServices = [
  'PLACEHOLDER_DAYTONA_SERVICE_1',
  'PLACEHOLDER_DAYTONA_SERVICE_2',
  'PLACEHOLDER_DAYTONA_SERVICE_3',
  'PLACEHOLDER_DAYTONA_SERVICE_4',
  'PLACEHOLDER_DAYTONA_SERVICE_5',
];

// TODO-UA: Replace with real process step descriptions
const processSteps = [
  { num: '01', title: 'PLACEHOLDER_STEP_1_TITLE', desc: 'PLACEHOLDER_STEP_1_DESC' },
  { num: '02', title: 'PLACEHOLDER_STEP_2_TITLE', desc: 'PLACEHOLDER_STEP_2_DESC' },
  { num: '03', title: 'PLACEHOLDER_STEP_3_TITLE', desc: 'PLACEHOLDER_STEP_3_DESC' },
  { num: '04', title: 'PLACEHOLDER_STEP_4_TITLE', desc: 'PLACEHOLDER_STEP_4_DESC' },
  { num: '05', title: 'PLACEHOLDER_STEP_5_TITLE', desc: 'PLACEHOLDER_STEP_5_DESC' },
];

// TODO-UA: Replace with real cost breakdown items
const costCards = [
  {
    title: 'PLACEHOLDER_COST_1_TITLE',
    desc: 'PLACEHOLDER_COST_1_DESC',
    range: 'PLACEHOLDER_COST_1_RANGE',
  },
  {
    title: 'PLACEHOLDER_COST_2_TITLE',
    desc: 'PLACEHOLDER_COST_2_DESC',
    range: 'PLACEHOLDER_COST_2_RANGE',
  },
  {
    title: 'PLACEHOLDER_COST_3_TITLE',
    desc: 'PLACEHOLDER_COST_3_DESC',
    range: 'PLACEHOLDER_COST_3_RANGE',
  },
  {
    title: 'PLACEHOLDER_COST_4_TITLE',
    desc: 'PLACEHOLDER_COST_4_DESC',
    range: 'PLACEHOLDER_COST_4_RANGE',
  },
];

// TODO-UA: Replace with real car examples
const carExamples = [
  {
    name: 'PLACEHOLDER_CAR_1_NAME',
    auction: 'PLACEHOLDER_CAR_1_AUCTION',
    transport: 'PLACEHOLDER_CAR_1_TRANSPORT',
    total: 'PLACEHOLDER_CAR_1_TOTAL',
    note: 'PLACEHOLDER_CAR_1_NOTE',
  },
  {
    name: 'PLACEHOLDER_CAR_2_NAME',
    auction: 'PLACEHOLDER_CAR_2_AUCTION',
    transport: 'PLACEHOLDER_CAR_2_TRANSPORT',
    total: 'PLACEHOLDER_CAR_2_TOTAL',
    note: 'PLACEHOLDER_CAR_2_NOTE',
  },
  {
    name: 'PLACEHOLDER_CAR_3_NAME',
    auction: 'PLACEHOLDER_CAR_3_AUCTION',
    transport: 'PLACEHOLDER_CAR_3_TRANSPORT',
    total: 'PLACEHOLDER_CAR_3_TOTAL',
    note: 'PLACEHOLDER_CAR_3_NOTE',
  },
];

// TODO-UA: Replace with real risk descriptions
const risks = [
  { title: 'PLACEHOLDER_RISK_1_TITLE', desc: 'PLACEHOLDER_RISK_1_DESC' },
  { title: 'PLACEHOLDER_RISK_2_TITLE', desc: 'PLACEHOLDER_RISK_2_DESC' },
  { title: 'PLACEHOLDER_RISK_3_TITLE', desc: 'PLACEHOLDER_RISK_3_DESC' },
  { title: 'PLACEHOLDER_RISK_4_TITLE', desc: 'PLACEHOLDER_RISK_4_DESC' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const UkraineHome = () => {
  return (
    <div style={pageStyle}>
      <Helmet>
        {/* TODO-UA: Replace PLACEHOLDER meta with real Ukrainian SEO content */}
        <title>PLACEHOLDER_META_TITLE</title>
        <meta name="description" content="PLACEHOLDER_META_DESCRIPTION" />
        <link rel="canonical" href="https://www.y7agency.com/ua" />
        <html lang="uk" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath=""
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianVersion={true}
      />

      {/* ============================================================ */}
      {/*  HERO SECTION                                                */}
      {/* ============================================================ */}
      <section
        style={{
          ...sectionStyle,
          paddingTop: 'clamp(3rem, 8vw, 6rem)',
          paddingBottom: 'clamp(3rem, 8vw, 6rem)',
          textAlign: 'center',
        }}
      >
        {/* Brand line */}
        <p
          style={{
            ...sansFont,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#993C1D',
            marginBottom: '1rem',
          }}
        >
          Y7 Logistics × DaytonaCargo
        </p>

        {/* TODO-UA: Replace with Ukrainian H1 headline */}
        <h1 style={{ ...h1Style, marginBottom: '1.5rem' }}>
          PLACEHOLDER_H1
        </h1>

        {/* TODO-UA: Replace with Ukrainian lead paragraph (~100 words) */}
        <p
          style={{
            ...pStyle,
            maxWidth: '700px',
            margin: '0 auto 2rem',
          }}
        >
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_1.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_2.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_3.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_4.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_5.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_6.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_7.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_8.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_9.
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_10.
        </p>

        <Link to="/ua/ship-my-car" style={ctaButtonStyle}>
          PLACEHOLDER_CTA_HERO
        </Link>
      </section>

      {/* ============================================================ */}
      {/*  QUICK STATS                                                 */}
      {/* ============================================================ */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={cardStyle}>
              <div style={statNumberStyle}>{stat.number}</div>
              <p style={{ ...sansFont, fontSize: '0.95rem', color: '#4A4A46', margin: '0.5rem 0 0' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TWO COMPANIES, ONE CHAIN (international co-brand section)   */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={{ ...h2Style, textAlign: 'center' }}>
          PLACEHOLDER_TWO_COMPANIES_H2
        </h2>
        <p style={{ ...pStyle, textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem' }}>
          PLACEHOLDER_TWO_COMPANIES_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Y7 Logistics card */}
          <div style={cardStyle}>
            <h3
              style={{
                ...sansFont,
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                color: '#2C2C2A',
              }}
            >
              Y7 Logistics
            </h3>
            <p style={{ ...pStyle, fontSize: '0.95rem', marginBottom: '1rem' }}>
              PLACEHOLDER_Y7_CARD_DESC
            </p>
            <ul style={{ ...pStyle, fontSize: '0.95rem', paddingLeft: '1.25rem' }}>
              {y7Services.map((s, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* DaytonaCargo card */}
          <div style={cardStyle}>
            <h3
              style={{
                ...sansFont,
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                color: '#2C2C2A',
              }}
            >
              DaytonaCargo
            </h3>
            <p style={{ ...pStyle, fontSize: '0.95rem', marginBottom: '1rem' }}>
              PLACEHOLDER_DAYTONA_CARD_DESC
            </p>
            <ul style={{ ...pStyle, fontSize: '0.95rem', paddingLeft: '1.25rem' }}>
              {daytonaServices.map((s, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{s}</li>
              ))}
            </ul>
            <a
              href="https://daytonacargo.com/ua"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...sansFont,
                display: 'inline-block',
                marginTop: '1rem',
                color: '#993C1D',
                fontWeight: 500,
                textDecoration: 'underline',
              }}
            >
              PLACEHOLDER_DAYTONA_LINK_TEXT
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROCESS STEPS                                               */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_PROCESS_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_PROCESS_INTRO
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {processSteps.map((step) => (
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
      {/*  COST BREAKDOWN                                              */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_COST_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_COST_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {costCards.map((card, i) => (
            <div key={i} style={cardStyle}>
              <h3
                style={{
                  ...sansFont,
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                {card.title}
              </h3>
              <p style={{ ...pStyle, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                {card.desc}
              </p>
              <span
                style={{
                  ...sansFont,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#993C1D',
                }}
              >
                {card.range}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  REAL EXAMPLES                                               */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_EXAMPLES_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_EXAMPLES_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {carExamples.map((car, i) => (
            <div key={i} style={cardStyle}>
              <h3
                style={{
                  ...sansFont,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}
              >
                {car.name}
              </h3>
              <div style={{ ...sansFont, fontSize: '0.9rem', color: '#4A4A46' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span>PLACEHOLDER_AUCTION_LABEL</span>
                  <span style={{ fontWeight: 600 }}>{car.auction}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span>PLACEHOLDER_TRANSPORT_LABEL</span>
                  <span style={{ fontWeight: 600 }}>{car.transport}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #E8E4DC',
                    paddingTop: '0.5rem',
                    marginTop: '0.5rem',
                    fontWeight: 600,
                    color: '#2C2C2A',
                  }}
                >
                  <span>PLACEHOLDER_TOTAL_LABEL</span>
                  <span style={{ color: '#993C1D' }}>{car.total}</span>
                </div>
              </div>
              <p style={{ ...pStyle, fontSize: '0.85rem', marginTop: '0.75rem', fontStyle: 'italic' }}>
                {car.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  RISKS SECTION                                               */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_RISKS_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_RISKS_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {risks.map((risk, i) => (
            <div
              key={i}
              style={{
                ...cardStyle,
                borderLeft: '3px solid #993C1D',
              }}
            >
              <h3
                style={{
                  ...sansFont,
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                {risk.title}
              </h3>
              <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
                {risk.desc}
              </p>
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

export default UkraineHome;
