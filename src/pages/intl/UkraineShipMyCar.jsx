// UkraineShipMyCar.jsx
// Route: /ua/ship-my-car
// Template C: Action/Ordering page
// Audience: Ukraine-based buyers - ordering flow
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
      name: 'PLACEHOLDER_BREADCRUMB_PARENT',
      item: 'https://www.y7agency.com/ua',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'PLACEHOLDER_BREADCRUMB_PAGE_NAME',
      item: 'https://www.y7agency.com/ua/ship-my-car',
    },
  ],
};

// TODO-UA: Replace with real checklist items for ordering prerequisites
const checklistItems = [
  { label: 'PLACEHOLDER_CHECK_1', desc: 'PLACEHOLDER_CHECK_1_DESC' },
  { label: 'PLACEHOLDER_CHECK_2', desc: 'PLACEHOLDER_CHECK_2_DESC' },
  { label: 'PLACEHOLDER_CHECK_3', desc: 'PLACEHOLDER_CHECK_3_DESC' },
  { label: 'PLACEHOLDER_CHECK_4', desc: 'PLACEHOLDER_CHECK_4_DESC' },
  { label: 'PLACEHOLDER_CHECK_5', desc: 'PLACEHOLDER_CHECK_5_DESC' },
  { label: 'PLACEHOLDER_CHECK_6', desc: 'PLACEHOLDER_CHECK_6_DESC' },
];

// TODO-UA: Replace with real ordering workflow steps
const workflowSteps = [
  { num: '01', title: 'PLACEHOLDER_WORKFLOW_1_TITLE', desc: 'PLACEHOLDER_WORKFLOW_1_DESC' },
  { num: '02', title: 'PLACEHOLDER_WORKFLOW_2_TITLE', desc: 'PLACEHOLDER_WORKFLOW_2_DESC' },
  { num: '03', title: 'PLACEHOLDER_WORKFLOW_3_TITLE', desc: 'PLACEHOLDER_WORKFLOW_3_DESC' },
  { num: '04', title: 'PLACEHOLDER_WORKFLOW_4_TITLE', desc: 'PLACEHOLDER_WORKFLOW_4_DESC' },
  { num: '05', title: 'PLACEHOLDER_WORKFLOW_5_TITLE', desc: 'PLACEHOLDER_WORKFLOW_5_DESC' },
  { num: '06', title: 'PLACEHOLDER_WORKFLOW_6_TITLE', desc: 'PLACEHOLDER_WORKFLOW_6_DESC' },
];

// TODO-UA: Replace with real trust signal items
const trustSignals = [
  'PLACEHOLDER_TRUST_1',
  'PLACEHOLDER_TRUST_2',
  'PLACEHOLDER_TRUST_3',
  'PLACEHOLDER_TRUST_4',
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const UkraineShipMyCar = () => {
  return (
    <div style={pageStyle}>
      <Helmet>
        {/* TODO-UA: Replace PLACEHOLDER meta with real Ukrainian SEO content */}
        <title>PLACEHOLDER_META_TITLE</title>
        <meta name="description" content="PLACEHOLDER_META_DESCRIPTION" />
        <link rel="canonical" href="https://www.y7agency.com/ua/ship-my-car" />
        <html lang="uk" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags currentPath="/ship-my-car" />

      {/* ============================================================ */}
      {/*  HERO SECTION (short)                                        */}
      {/* ============================================================ */}
      <section
        style={{
          ...sectionStyle,
          paddingTop: 'clamp(3rem, 8vw, 5rem)',
          paddingBottom: 'clamp(2rem, 5vw, 3rem)',
          textAlign: 'center',
        }}
      >
        {/* TODO-UA: Replace with Ukrainian H1 headline */}
        <h1 style={{ ...h1Style, marginBottom: '1.5rem' }}>
          PLACEHOLDER_H1
        </h1>

        {/* TODO-UA: Replace with Ukrainian lead paragraph (~80 words) */}
        <p
          style={{
            ...pStyle,
            maxWidth: '700px',
            margin: '0 auto',
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
        </p>
      </section>

      {/* ============================================================ */}
      {/*  WHAT YOU NEED BEFORE ORDERING                               */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_CHECKLIST_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_CHECKLIST_INTRO
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {checklistItems.map((item, i) => (
            <div
              key={i}
              style={{
                ...cardStyle,
                display: 'grid',
                gridTemplateColumns: '2rem 1fr',
                gap: '0.75rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  ...sansFont,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '4px',
                  border: '2px solid #993C1D',
                  fontSize: '0.75rem',
                  color: '#993C1D',
                  flexShrink: 0,
                  marginTop: '0.1rem',
                }}
              >
                {i + 1}
              </span>
              <div>
                <h3
                  style={{
                    ...sansFont,
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.label}
                </h3>
                <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ORDERING WORKFLOW                                           */}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_WORKFLOW_H2</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_WORKFLOW_INTRO
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {workflowSteps.map((step) => (
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
      {/*  CONTACT SECTION (international page - includes DaytonaCargo)*/}
      {/* ============================================================ */}
      <section style={sectionStyle}>
        {/* TODO-UA: Replace with Ukrainian section title */}
        <h2 style={h2Style}>PLACEHOLDER_CONTACT_H2</h2>

        <div style={cardStyle}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Telegram */}
            <div>
              <h3
                style={{
                  ...sansFont,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                Telegram
              </h3>
              <p style={{ ...sansFont, fontSize: '1rem', margin: 0 }}>
                PLACEHOLDER_TELEGRAM_HANDLE
              </p>
            </div>

            {/* Email */}
            <div>
              <h3
                style={{
                  ...sansFont,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                Email
              </h3>
              <p style={{ ...sansFont, fontSize: '1rem', margin: 0 }}>
                PLACEHOLDER_EMAIL_ADDRESS
              </p>
            </div>

            {/* DaytonaCargo */}
            <div>
              <h3
                style={{
                  ...sansFont,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                DaytonaCargo
              </h3>
              <a
                href="https://daytonacargo.com/ua"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...sansFont, fontSize: '1rem', color: '#993C1D', textDecoration: 'underline' }}
              >
                daytonacargo.com/ua
              </a>
            </div>
          </div>
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
          {/* TODO-UA: Replace with Ukrainian trust heading */}
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

export default UkraineShipMyCar;
