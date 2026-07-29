import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { prose, muted, tableWrap, table, th, td } from './_enrichedStyles';
import { apiPost } from '../../hooks/useApi';
import vf from '../../styles/v2/forms.module.css';
import vb from '../../styles/v2/buttons.module.css';

// [EXPORTERS-CO-T01] Standalone Certificate of Origin service page.
// EVERY operational figure here comes from the sprint's confirmed-facts list
// (Sergii, 2026-07-28): $99 established exporter clients (custom per-client
// pricing possible) / $150 one-off via the website; 7 business days request to
// issued eCO; EU Regulation 2026/1455 (0% duty vs standard 10%, in force since
// 1 Jul 2026, US-origin vehicles); twin proof of US origin + direct transport
// per Article 59a UCC-IA, introduced by Regulation 2026/1422 (CO-COPY-T01: 59a
// belongs to 1422, NOT 1455); filing via the Charles River Regional Chamber
// (Newton/Needham MA) portal; Y7 acts as standing filing agent.
// Do not add regulation citations, duty rates for other origins, or
// per-country rules that are not in that list.
// Copy constraints: never state who is named exporter of record; never promise
// a duty outcome (the customs authority decides, said once); Licensed & Bonded
// FMCSA Broker only; no phone numbers; the affiliated dealer-licensed company
// stays unnamed.
// CTA posts to /api/public/contact (T00 audit: no public CO endpoint exists;
// portal CO routes all sit behind portal auth). Payload matches the exporter
// form shape so it lands in lead_inquiries and the admin Inquiries surface.

const checklist = [
  'The vehicle is US-origin.',
  'The destination is in the European Union.',
  'The shipment meets the direct-transport requirement (Article 59a UCC-IA).',
  'The supporting documentation is in order.',
  'Eligibility is confirmed per shipment before filing.',
];

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

const checkMark = {
  position: 'absolute',
  left: 0,
  top: 10,
  color: '#0F6E56',
  fontWeight: 700,
};

function CoRequestForm() {
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
    if (!form.contact_name.trim()) { setError('Contact name is required.'); return; }
    if (!form.email.trim()) { setError('Email is required.'); return; }
    setSubmitting(true);
    try {
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
      setError(err.message || 'Could not send the request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <p style={{ ...prose, color: '#0F6E56', fontWeight: 600 }} role="status">
        ✓ Request received. We reply from info@y7agency.com.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gap: 14, maxWidth: 460 }}>
        <div>
          <label htmlFor="co-company" className={vf.labelOnPaper}>Company (optional)</label>
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
          <label htmlFor="co-contact" className={vf.labelOnPaper}>Contact name *</label>
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
          <label htmlFor="co-email" className={vf.labelOnPaper}>Email *</label>
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
          <label htmlFor="co-status" className={vf.labelOnPaper}>Are you an existing Y7 exporter client?</label>
          <select
            id="co-status"
            className={vf.inputOnPaper}
            value={form.client_status}
            onChange={(e) => set('client_status', e.target.value)}
          >
            <option value="one_off">No, this is a one-off request ($150)</option>
            <option value="client">Yes, established exporter client ($99)</option>
          </select>
        </div>
        <div>
          <label htmlFor="co-details" className={vf.labelOnPaper}>Shipment details (optional)</label>
          <textarea
            id="co-details"
            className={vf.inputOnPaper}
            rows={4}
            value={form.details}
            onChange={(e) => set('details', e.target.value)}
            placeholder="VIN, vehicle, destination country, target vessel window"
          />
        </div>
        {error && <p className={vf.errorOnPaper} role="alert">{error}</p>}
        <div>
          <button type="submit" className={`${vb.base} ${vb.cta}`} disabled={submitting}>
            {submitting ? 'Sending...' : 'Request a Certificate of Origin'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default function CertificateOfOrigin() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Certificate of Origin for US Vehicle Exports to the EU: 0% Import Duty | Y7 Logistics',
        description:
          'US-origin vehicles enter the EU at 0% import duty under EU Regulation 2026/1455 with a Certificate of Origin. Y7 prepares and files as standing agent: $99 for established exporter clients, $150 one-off, issued eCO in 7 business days.',
        path: '/certificate-of-origin',
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
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      heading="Certificate of Origin for US Vehicle Exports to the EU"
      intro="Under EU Regulation 2026/1455, in force since 1 July 2026, US-origin vehicles can enter the European Union at 0% import duty instead of the standard 10%, and the document that carries that claim is the Certificate of Origin. Y7 Logistics, a Licensed & Bonded FMCSA Broker (USDOT #4427359, MC #1741537), acts as a standing filing agent: we prepare the certificate, file it through the Charles River Regional Chamber portal, and deliver the issued eCO to your export document set. The service stands on its own. You do not need to be a Y7 transport client to order one."
      tldr={{
        kicker: 'Certificate of Origin, in brief',
        ariaLabel: 'Certificate of Origin service summary',
        text: 'A Certificate of Origin documents a vehicle as US-origin, which is what EU Regulation 2026/1455 (in force since 1 July 2026) requires for the 0% import duty rate, in place of the standard 10%, on vehicles entering the EU. Y7 Logistics (Licensed & Bonded FMCSA Broker, MC #1741537) prepares and files the certificate as standing agent through the Charles River Regional Chamber portal: $99 per certificate for established Y7 exporter clients, $150 for a one-off request, issued eCO in 7 business days. Eligibility is confirmed per shipment; the importer must also prove US origin and direct transport under Article 59a UCC-IA (Regulation 2026/1422).',
      }}
      ctaLabel="Explore the Exporter Program"
      ctaTo="/exporters"
      faqs={[
        {
          q: 'How much does a Certificate of Origin cost?',
          a: 'Two published prices: $99 per certificate for established Y7 exporter clients (custom per-client pricing is possible for volume accounts), and $150 for a one-off request submitted through the website by an exporter who is not a Y7 transport client. Both include preparation and filing.',
        },
        {
          q: 'How long does it take to get the certificate?',
          a: 'Seven business days from the request to the issued eCO. Start the request as soon as the vehicle and destination are fixed so the certificate is ready before your vessel window.',
        },
        {
          q: 'Do I need to be a Y7 transport client?',
          a: 'No. The one-off service at $150 exists exactly for European exporters who buy vehicles in the US and handle transport elsewhere. If you also need the auction-to-port leg, the exporter program covers both and the certificate drops to the client price.',
        },
        {
          q: 'What is the direct-transport requirement?',
          a: 'It is half of the twin proof required by Article 59a UCC-IA, introduced by EU Regulation 2026/1422: the importer proves both that the vehicle is of US origin and that the shipment traveled directly and arrived unaltered. The 0% rate itself comes from EU Regulation 2026/1455. We confirm the condition, together with the rest of the eligibility checklist, per shipment before filing.',
        },
        {
          q: 'Who prepares and files the certificate?',
          a: 'Y7 acts as a standing filing agent: we prepare the certificate from your shipment documents and file it through the Charles River Regional Chamber (Newton/Needham, MA) portal. You receive the issued eCO for your export document set.',
        },
      ]}
      related={[
        { label: 'Exporter Logistics', to: '/exporters' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Door-to-Port Transport', to: '/door-to-port-auto-transport' },
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'NJ Export-Warehouse Costs', to: '/nj-export-warehouse-shipping-cost' },
      ]}
    >
      <Section title="What a Certificate of Origin Does at EU Import">
        <p style={prose}>
          EU Regulation 2026/1455, in force since 1 July 2026, sets a 0% import duty rate for
          US-origin vehicles entering the European Union, against the standard rate of 10%. The
          rate is claimed with documentation: a Certificate of Origin that establishes the vehicle
          as US-origin. Without the certificate, the importer cannot claim the preferential rate;
          with it, a qualifying shipment clears at 0% duty.
        </p>
        <p style={muted}>
          The certificate is issued electronically (an eCO) and joins the rest of the export
          document set your freight forwarder presents at destination.
        </p>
      </Section>

      <Section title="The Twin Proof: US Origin and Direct Transport (Article 59a UCC-IA)">
        <p style={prose}>
          The 0% rate is conditional, and the condition lives in a separate instrument from the
          rate itself. Article 59a UCC-IA, introduced by EU Regulation 2026/1422, requires the
          importer to prove two things at once: that the vehicle is of non-preferential US origin,
          and that the shipment traveled directly, arriving unaltered. In plain words: the vehicle
          must move from the US to the EU destination as one continuous shipment, and what arrives
          must be the vehicle that left. The certificate covers the origin half; the routing
          covers the other.
        </p>
        <p style={muted}>
          Direct transport is a property of the shipment, not of the paperwork, which is why we
          confirm eligibility per shipment rather than assuming it. If your routing raises a
          question, we flag it before you pay for a filing.
        </p>
      </Section>

      <Section title="Who Qualifies: The Eligibility Checklist">
        <ul style={{ margin: '0 0 16px', padding: 0 }}>
          {checklist.map((item, i) => (
            <li key={i} style={checkItem}>
              <span style={checkMark} aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p style={muted}>
          We confirm every item against your shipment documents before the certificate is filed.
        </p>
      </Section>

      <Section title="Pricing and Turnaround">
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Service</th>
                <th style={th}>Price</th>
                <th style={th}>Turnaround</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td}>Established Y7 exporter clients</td>
                <td style={td}>$99 per certificate</td>
                <td style={td}>7 business days to issued eCO</td>
              </tr>
              <tr>
                <td style={td}>One-off request (not a transport client)</td>
                <td style={td}>$150 per certificate</td>
                <td style={td}>7 business days to issued eCO</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          Custom per-client pricing is available for established exporter accounts. There is no
          markup hidden elsewhere: the certificate fee is the whole price of the service.
        </p>
      </Section>

      <Section title="How the Filing Works">
        <ol style={{ margin: '0 0 16px', paddingLeft: 22 }}>
          <li style={{ ...prose, marginBottom: 10 }}>
            <strong>You send the shipment documents.</strong> The vehicle, the destination, and the
            supporting paperwork for the origin claim.
          </li>
          <li style={{ ...prose, marginBottom: 10 }}>
            <strong>Y7 prepares and files.</strong> As standing filing agent, we verify the
            eligibility checklist, prepare the certificate, and file it through the Charles River
            Regional Chamber portal.
          </li>
          <li style={{ ...prose, marginBottom: 10 }}>
            <strong>You receive the issued eCO</strong> within 7 business days of the request,
            ready for your export document set.
          </li>
        </ol>
        <p style={muted}>
          One thing we state plainly rather than promise around: Y7 prepares and files the
          certificate; admissibility and the duty treatment at import are determined by the customs
          authority of the destination country.
        </p>
      </Section>

      <Section title="Request a Certificate of Origin">
        <p style={prose}>
          Send the request below and we reply from info@y7agency.com. If you are shipping the
          vehicle with us, mention the order and we fold the certificate into your existing
          document flow; see the <Link to="/exporters">exporter program</Link> for the transport
          side.
        </p>
        <CoRequestForm />
      </Section>
    </SeoLandingPage>
  );
}
