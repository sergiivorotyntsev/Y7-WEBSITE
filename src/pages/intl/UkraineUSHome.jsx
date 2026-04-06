// UkraineUSHome.jsx
// Route: /ua-us
// Template A: Home/Overview
// Audience: Ukrainian diaspora in USA
// NOTE: Y7 HAS Ukrainian-speaking team members - highlight in placeholder comments
// TODO-UA-US: Replace all PLACEHOLDER strings with native Ukrainian content

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

// TODO-UA-US: Replace all PLACEHOLDER FAQ items with real Ukrainian content
// targeted at Ukrainian diaspora in the US
const faqItems = [
  { question: 'PLACEHOLDER_FAQ_Q1', answer: 'PLACEHOLDER_FAQ_A1' },
  { question: 'PLACEHOLDER_FAQ_Q2', answer: 'PLACEHOLDER_FAQ_A2' },
  { question: 'PLACEHOLDER_FAQ_Q3', answer: 'PLACEHOLDER_FAQ_A3' },
  { question: 'PLACEHOLDER_FAQ_Q4', answer: 'PLACEHOLDER_FAQ_A4' },
  { question: 'PLACEHOLDER_FAQ_Q5', answer: 'PLACEHOLDER_FAQ_A5' },
  { question: 'PLACEHOLDER_FAQ_Q6', answer: 'PLACEHOLDER_FAQ_A6' },
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
      item: 'https://www.y7agency.com/ua-us',
    },
  ],
};

// TODO-UA-US: Replace placeholder stat values with real data
const stats = [
  { number: 'PLACEHOLDER_STAT_1_NUM', label: 'PLACEHOLDER_STAT_1_LABEL' },
  { number: 'PLACEHOLDER_STAT_2_NUM', label: 'PLACEHOLDER_STAT_2_LABEL' },
  { number: 'PLACEHOLDER_STAT_3_NUM', label: 'PLACEHOLDER_STAT_3_LABEL' },
];

// TODO-UA-US: Replace with real Y7 service descriptions
// NOTE: Mention Ukrainian-speaking team members as a service advantage
const services = [
  {
    title: 'PLACEHOLDER_SERVICE_1_TITLE',
    desc: 'PLACEHOLDER_SERVICE_1_DESC',
  },
  {
    title: 'PLACEHOLDER_SERVICE_2_TITLE',
    desc: 'PLACEHOLDER_SERVICE_2_DESC',
  },
  {
    title: 'PLACEHOLDER_SERVICE_3_TITLE',
    desc: 'PLACEHOLDER_SERVICE_3_DESC',
  },
  {
    // TODO-UA-US: This service should highlight Ukrainian-speaking support
    title: 'PLACEHOLDER_SERVICE_4_TITLE',
    desc: 'PLACEHOLDER_SERVICE_4_DESC',
  },
  {
    title: 'PLACEHOLDER_SERVICE_5_TITLE',
    desc: 'PLACEHOLDER_SERVICE_5_DESC',
  },
];

// TODO-UA-US: Replace with real process step descriptions
const processSteps = [
  { num: '01', title: 'PLACEHOLDER_STEP_1_TITLE', desc: 'PLACEHOLDER_STEP_1_DESC' },
  { num: '02', title: 'PLACEHOLDER_STEP_2_TITLE', desc: 'PLACEHOLDER_STEP_2_DESC' },
  { num: '03', title: 'PLACEHOLDER_STEP_3_TITLE', desc: 'PLACEHOLDER_STEP_3_DESC' },
  { num: '04', title: 'PLACEHOLDER_STEP_4_TITLE', desc: 'PLACEHOLDER_STEP_4_DESC' },
  { num: '05', title: 'PLACEHOLDER_STEP_5_TITLE', desc: 'PLACEHOLDER_STEP_5_DESC' },
];

// TODO-UA-US: Replace with real cost breakdown items for US domestic transport
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

// TODO-UA-US: Replace with real car examples relevant to US-based Ukrainian buyers
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

// TODO-UA-US: Replace with real risk descriptions
const risks = [
  { title: 'PLACEHOLDER_RISK_1_TITLE', desc: 'PLACEHOLDER_RISK_1_DESC' },
  { title: 'PLACEHOLDER_RISK_2_TITLE', desc: 'PLACEHOLDER_RISK_2_DESC' },
  { title: 'PLACEHOLDER_RISK_3_TITLE', desc: 'PLACEHOLDER_RISK_3_DESC' },
  { title: 'PLACEHOLDER_RISK_4_TITLE', desc: 'PLACEHOLDER_RISK_4_DESC' },
];

// TODO-UA-US: Replace with real testimonial content from US-based Ukrainian customers
const testimonials = [
  {
    name: 'PLACEHOLDER_TESTIMONIAL_1_NAME',
    location: 'PLACEHOLDER_TESTIMONIAL_1_LOCATION',
    text: 'PLACEHOLDER_TESTIMONIAL_1_TEXT',
    vehicle: 'PLACEHOLDER_TESTIMONIAL_1_VEHICLE',
  },
  {
    name: 'PLACEHOLDER_TESTIMONIAL_2_NAME',
    location: 'PLACEHOLDER_TESTIMONIAL_2_LOCATION',
    text: 'PLACEHOLDER_TESTIMONIAL_2_TEXT',
    vehicle: 'PLACEHOLDER_TESTIMONIAL_2_VEHICLE',
  },
  {
    name: 'PLACEHOLDER_TESTIMONIAL_3_NAME',
    location: 'PLACEHOLDER_TESTIMONIAL_3_LOCATION',
    text: 'PLACEHOLDER_TESTIMONIAL_3_TEXT',
    vehicle: 'PLACEHOLDER_TESTIMONIAL_3_VEHICLE',
  },
];

// TODO-UA-US: Replace with real trust signal items
const trustSignals = [
  'PLACEHOLDER_TRUST_1',
  'PLACEHOLDER_TRUST_2',
  'PLACEHOLDER_TRUST_3',
  'PLACEHOLDER_TRUST_4',
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const UkraineUSHome = () => {
  return (
    <div style={pageStyle}>
      <Helmet>
        {/* TODO-UA-US: Replace PLACEHOLDER meta with real Ukrainian SEO content for US audience */}
        <title>PLACEHOLDER_META_TITLE</title>
        <meta name="description" content="PLACEHOLDER_META_DESCRIPTION" />
        <link rel="canonical" href="https://www.y7agency.com/ua-us" />
        <html lang="uk" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags currentPath="" />

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
          Y7 Logistics
        </p>

        {/* TODO-UA-US: Replace with Ukrainian H1 headline for US diaspora */}
        <h1 style={{ ...h1Style, marginBottom: '1.5rem' }}>
          PLACEHOLDER_H1
        </h1>

        {/* TODO-UA-US: Replace with Ukrainian lead paragraph (~100 words)
            NOTE: Mention Ukrainian-speaking staff as a key differentiator */}
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

        <Link to="/ua-us/ship-my-car" style={ctaButtonStyle}>
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
      {/*  OUR SERVICES (US domestic - no DaytonaCargo co-brand)       */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA-US: Replace with Ukrainian section title */}
        <h2 style={{ ...h2Style, textAlign: 'center' }}>
          PLACEHOLDER_SERVICES_H2
        </h2>
        <p style={{ ...pStyle, textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem' }}>
          PLACEHOLDER_SERVICES_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {services.map((service, i) => (
            <div key={i} style={cardStyle}>
              <h3
                style={{
                  ...sansFont,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#2C2C2A',
                }}
              >
                {service.title}
              </h3>
              <p style={{ ...pStyle, fontSize: '0.95rem', margin: 0 }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROCESS STEPS                                               */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA-US: Replace with Ukrainian section title */}
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
        {/* TODO-UA-US: Replace with Ukrainian section title */}
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
        {/* TODO-UA-US: Replace with Ukrainian section title */}
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
        {/* TODO-UA-US: Replace with Ukrainian section title */}
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
      {/*  TESTIMONIALS                                                */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA-US: Replace with Ukrainian section title */}
        <h2 style={{ ...h2Style, textAlign: 'center' }}>PLACEHOLDER_TESTIMONIALS_H2</h2>
        <p style={{ ...pStyle, textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem' }}>
          PLACEHOLDER_TESTIMONIALS_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                ...cardStyle,
                borderTop: '3px solid #993C1D',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <p style={{ ...pStyle, fontSize: '0.95rem', fontStyle: 'italic', flex: 1 }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p style={{ ...sansFont, fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
                  {t.name}
                </p>
                <p style={{ ...sansFont, fontSize: '0.85rem', color: '#4A4A46', margin: '0.15rem 0 0' }}>
                  {t.location} &middot; {t.vehicle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TRUST SIGNALS                                               */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        <div
          style={{
            ...cardStyle,
            background: '#FAFAF8',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          {/* TODO-UA-US: Replace with Ukrainian trust heading */}
          <h2
            style={{
              ...h2Style,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              marginBottom: '1.5rem',
            }}
          >
            PLACEHOLDER_TRUST_H2
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
            }}
          >
            {trustSignals.map((signal, i) => (
              <div key={i} style={{ ...sansFont, fontSize: '0.95rem', color: '#4A4A46' }}>
                <span style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.35rem' }}>
                  PLACEHOLDER_TRUST_ICON_{i + 1}
                </span>
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ SECTION                                                 */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA-US: Replace with Ukrainian section title */}
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
          {/* TODO-UA-US: Replace with Ukrainian CTA headline */}
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
            to="/ua-us/ship-my-car"
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

export default UkraineUSHome;
