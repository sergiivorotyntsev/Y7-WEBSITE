import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { prose, muted, subhead, tableWrap, table, th, td } from './_enrichedStyles';
import { apiPost } from '../../hooks/useApi';
import { stripLocale } from '../../lib/localePaths';
import vf from '../../styles/v2/forms.module.css';
import vb from '../../styles/v2/buttons.module.css';

// [EXPORTERS-CO-T01 / CO-COPY-T15] Standalone Certificate of Origin service
// page, localized EN/PL/UA/RU (copy lives in locales/*/certificateOfOrigin.json,
// same-slug locale routes per TRANSLATABLE_PATHS).
// EVERY operational figure comes from the CO-COPY confirmed-facts lists:
// $99 established exporter clients (complete price, chamber fee inside;
// custom per-client possible) / $150 one-off via the website; 7 business days
// request to issued eCO; EU Regulation 2026/1455 (0% duty vs standard 10%, in
// force since 1 Jul 2026, until 31 Dec 2029, suspendable earlier); twin proof
// of US origin + direct transport per Article 59a UCC-IA, inserted by
// Commission Implementing Regulation (EU) 2026/1422 amending 2015/2447 (59a
// belongs to 1422, NOT 1455); certificate recommended, not mandatory — the
// proof obligation IS mandatory, burden on the importer; third-country transit
// needs customs supervision + non-alteration; evidence must be with the
// declarant at declaration; client funds flow: screen -> request -> payment ->
// documents -> filing (docs arrive AFTER payment); the specific filing chamber
// is deliberately NOT named anywhere on the page (Sergii, 2026-07-29: the
// channel is commercially sensitive) — copy says "the issuing chamber" only;
// 24h response promise is backed by the admin Inquiries SLA badge.
// Copy constraints: never state who is named exporter of record; never promise
// a duty outcome (eligibility, not outcome); Licensed & Bonded FMCSA Broker
// only; no phone numbers; the affiliated dealer-licensed company stays unnamed.
// CTA posts to /api/public/contact (T00 audit: no public CO endpoint exists).

const checkItem = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '15px',
  color: '#2C2C2A',
  lineHeight: 1.7,
  padding: '10px 0 10px 30px',
  borderBottom: '1px solid #E5E0D8',
  position: 'relative',
  listStyle: 'none',
};

// CO-COPY-T04: neutral ink markers. Pine is reserved for success/verified
// state, and these are conditions the reader must still satisfy.
const checkMark = {
  position: 'absolute',
  left: 0,
  top: 10,
  color: '#2C2C2A',
  fontWeight: 700,
};

function CoRequestForm({ t }) {
  const [form, setForm] = useState({
    company: '',
    contact_name: '',
    email: '',
    client_status: 'one_off',
    details: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!form.contact_name.trim()) { setError(t('form.errContact')); return; }
    if (!form.email.trim()) { setError(t('form.errEmail')); return; }
    setSubmitting(true);
    try {
      // Payload stays EN regardless of locale — it lands on the admin
      // Inquiries surface, not in front of the client.
      await apiPost('/api/public/contact', {
        name: [form.company, form.contact_name].filter(Boolean).join(' — '),
        email: form.email,
        phone: '',
        message: [
          'Certificate of Origin Request',
          `Company: ${form.company || 'N/A'}`,
          `Existing Y7 exporter client: ${form.client_status === 'client' ? 'Yes' : 'No (one-off request)'}`,
          form.details ? `Shipment details:\n${form.details}` : '',
        ].filter(Boolean).join('\n'),
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || t('form.errSubmit'));
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <p style={{ ...prose, color: '#0F6E56', fontWeight: 600 }} role="status">
        {t('form.success')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gap: 14, maxWidth: 460 }}>
        <div>
          <label htmlFor="co-company" className={vf.labelOnPaper}>{t('form.company')}</label>
          <input
            id="co-company"
            type="text"
            className={vf.inputOnPaper}
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="co-contact" className={vf.labelOnPaper}>{t('form.contact')}</label>
          <input
            id="co-contact"
            type="text"
            className={vf.inputOnPaper}
            value={form.contact_name}
            onChange={(e) => set('contact_name', e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="co-email" className={vf.labelOnPaper}>{t('form.email')}</label>
          <input
            id="co-email"
            type="email"
            className={vf.inputOnPaper}
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="co-status" className={vf.labelOnPaper}>{t('form.clientStatus')}</label>
          <select
            id="co-status"
            className={vf.inputOnPaper}
            value={form.client_status}
            onChange={(e) => set('client_status', e.target.value)}
          >
            <option value="one_off">{t('form.optOneoff')}</option>
            <option value="client">{t('form.optClient')}</option>
          </select>
        </div>
        <div>
          <label htmlFor="co-details" className={vf.labelOnPaper}>{t('form.details')}</label>
          <textarea
            id="co-details"
            className={vf.inputOnPaper}
            rows={4}
            value={form.details}
            onChange={(e) => set('details', e.target.value)}
            placeholder={t('form.detailsPlaceholder')}
          />
        </div>
        {error && <p className={vf.errorOnPaper} role="alert">{error}</p>}
        <div>
          <button type="submit" className={`${vb.base} ${vb.cta}`} disabled={submitting}>
            {submitting ? t('form.sending') : t('form.submit')}
          </button>
        </div>
      </div>
    </form>
  );
}

export default function CertificateOfOrigin() {
  const { t } = useTranslation('certificateOfOrigin');
  const { pathname } = useLocation();
  const { locale } = stripLocale(pathname);
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const path = locale === 'en' ? '/certificate-of-origin' : `/${locale}/certificate-of-origin`;

  const checklist = t('sections.eligibility.items', { returnObjects: true });
  const provide = t('sections.docs.provide', { returnObjects: true });
  const prep = t('sections.docs.prep', { returnObjects: true });
  const steps = t('sections.process.steps', { returnObjects: true });
  const faqs = t('faqs', { returnObjects: true });

  return (
    <SeoLandingPage
      meta={{
        title: t('meta.title'),
        description: t('meta.description'),
        path,
      }}
      serviceExtras={{
        serviceType: 'Certificate of Origin Filing',
        audience: { audienceType: 'Business', name: 'Vehicle Exporters and International Buyers' },
        offers: [
          {
            name: 'Certificate of Origin, established exporter clients',
            desc: 'CO preparation and filing for active Y7 exporter program clients. Custom per-client pricing available.',
            priceRange: '$99',
          },
          {
            name: 'Certificate of Origin, one-off request',
            desc: 'Standalone CO preparation and filing for exporters who are not Y7 transport clients.',
            priceRange: '$150',
          },
        ],
      }}
      labels={{
        breadcrumbHome: t('labels.breadcrumbHome'),
        breadcrumbServices: t('labels.breadcrumbServices'),
        homeTo: prefix || '/',
        servicesTo: `${prefix}/services`,
        faqTitle: t('labels.faqTitle'),
        ctaTitle: t('labels.ctaTitle'),
        ctaSubtitle: t('labels.ctaSubtitle'),
        relatedHeading: t('labels.relatedHeading'),
      }}
      // [WEBFIX-T04b] bare path: ContextualCTA prepends the locale itself (its
      // documented contract, and what its eight other callers pass). The
      // prefixed value rendered /pl/pl/exporters on the localized CO pages.
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      heading={t('heading')}
      intro={t('intro')}
      tldr={{
        kicker: t('tldr.kicker'),
        ariaLabel: t('tldr.ariaLabel'),
        text: t('tldr.text'),
      }}
      ctaLabel={t('labels.ctaLabel')}
      ctaTo={`${prefix}/exporters`}
      faqs={Array.isArray(faqs) ? faqs : []}
      related={[
        { label: t('related.exporters'), to: `${prefix}/exporters` },
        { label: t('related.auctionToPort'), to: '/auction-to-port-transport' },
        { label: t('related.doorToPort'), to: '/door-to-port-auto-transport' },
        { label: t('related.portNewark'), to: '/ports/newark' },
        { label: t('related.njCosts'), to: '/nj-export-warehouse-shipping-cost' },
      ]}
    >
      <Section title={t('sections.what.title')}>
        <p style={prose}>{t('sections.what.p1')}</p>
        <p style={prose}>{t('sections.what.window')}</p>
        <p style={muted}>{t('sections.what.eco')}</p>
      </Section>

      <Section title={t('sections.twin.title')}>
        <p style={prose}>{t('sections.twin.p1')}</p>
        <p style={muted}>{t('sections.twin.p2')}</p>
      </Section>

      <Section title={t('sections.eligibility.title')}>
        <ul style={{ margin: '0 0 16px', padding: 0 }}>
          {(Array.isArray(checklist) ? checklist : []).map((item, i) => (
            <li key={i} style={checkItem}>
              <span style={checkMark} aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p style={muted}>{t('sections.eligibility.note')}</p>
      </Section>

      <Section title={t('sections.pricing.title')}>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>{t('sections.pricing.colService')}</th>
                <th style={th}>{t('sections.pricing.colPrice')}</th>
                <th style={th}>{t('sections.pricing.colTurnaround')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td}>{t('sections.pricing.rowClient')}</td>
                <td style={td}>{t('sections.pricing.rowClientPrice')}</td>
                <td style={td}>{t('sections.pricing.turnaroundCell')}</td>
              </tr>
              <tr>
                <td style={td}>{t('sections.pricing.rowOneoff')}</td>
                <td style={td}>{t('sections.pricing.rowOneoffPrice')}</td>
                <td style={td}>{t('sections.pricing.turnaroundCell')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>{t('sections.pricing.note')}</p>
      </Section>

      <Section title={t('sections.docs.title')}>
        <h3 style={subhead}>{t('sections.docs.eligTitle')}</h3>
        <p style={prose}>
          {t('sections.docs.eligPre')}
          <strong>{t('sections.docs.eligStrong')}</strong>
          {t('sections.docs.eligPost')}
        </p>

        <h3 style={subhead}>{t('sections.docs.provideTitle')}</h3>
        <ul style={{ margin: '0 0 16px', paddingLeft: 22 }}>
          {(Array.isArray(provide) ? provide : []).map((item, i) => (
            <li key={i} style={{ ...prose, marginBottom: 8 }}>
              {item.lead ? (<><strong>{item.lead}</strong>{item.rest}</>) : item.text}
            </li>
          ))}
        </ul>

        <h3 style={subhead}>{t('sections.docs.prepTitle')}</h3>
        <ul style={{ margin: '0 0 16px', paddingLeft: 22 }}>
          {(Array.isArray(prep) ? prep : []).map((item, i) => (
            <li key={i} style={{ ...prose, marginBottom: 8 }}>{item}</li>
          ))}
        </ul>

        <p style={muted}>{t('sections.docs.freeEvidence')}</p>
      </Section>

      <Section title={t('sections.process.title')}>
        <ol style={{ margin: '0 0 16px', paddingLeft: 22 }}>
          {(Array.isArray(steps) ? steps : []).map((s, i) => (
            <li key={i} style={{ ...prose, marginBottom: 10 }}>
              <strong>{s.lead}</strong>{s.rest}
            </li>
          ))}
        </ol>
        <p style={muted}>{t('sections.process.honesty')}</p>
      </Section>

      <Section title={t('sections.request.title')}>
        <p style={prose}>
          {t('sections.request.introPre')}
          <Link to={`${prefix}/exporters`}>{t('sections.request.introLink')}</Link>
          {t('sections.request.introPost')}
        </p>
        {/* [WEBFIX-T06] established clients ($99 rate) have a portal; the page
            never pointed at it. */}
        <p style={prose}>
          {t('sections.request.portalPre')}
          <Link to="/portal/login">{t('sections.request.portalLink')}</Link>
          {t('sections.request.portalPost')}
        </p>
        <CoRequestForm t={t} />
      </Section>
    </SeoLandingPage>
  );
}
