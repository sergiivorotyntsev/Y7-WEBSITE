import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { CheckIcon } from '../components/icons';
import { apiPost } from '../hooks/useApi';
import SmsConsent from '../components/SmsConsent';
import { colors, fonts, button as btnStyles } from '../theme';
import { trackEvent } from '../utils/analytics';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

const VOLUMES = ['1-5', '6-15', '16-30', '30+'];
const REFERRAL_SOURCES = ['Google', 'Referral', 'Central Dispatch', 'Social Media', 'Other'];
const SERVICES = [
  { key: 'auction_pickup', label: 'Auction pickup' },
  { key: 'dealer_trades', label: 'Dealer-to-dealer trades' },
  { key: 'port_delivery', label: 'Port delivery' },
  { key: 'enclosed', label: 'Enclosed transport' },
];

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  padding: '10px 12px',
  borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`,
  background: colors.bgInput,
  color: colors.text,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const selectStyle = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888780' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  paddingRight: '32px',
  cursor: 'pointer',
};

const labelStyle = {
  fontFamily: fonts.sans,
  fontSize: '12px',
  fontWeight: 600,
  color: colors.text,
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  display: 'block',
  marginBottom: '4px',
};

const sectionStyle = {
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '16px',
};

const sectionTitle = {
  fontFamily: fonts.sans,
  fontSize: '11px',
  fontWeight: 600,
  color: colors.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '14px',
};

const rowStyle = { marginBottom: '12px' };

export default function DealerQuote() {
  const [form, setForm] = useState({
    dealership_name: '', contact_name: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    monthly_volume: '', primary_routes: '', pricing_model: '',
    services: [], referral_source: '', notes: '', sms_consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function toggleService(key) {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(key)
        ? prev.services.filter(s => s !== key)
        : [...prev.services, key],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!form.dealership_name.trim()) { setError('Dealership name is required'); return; }
    if (!form.contact_name.trim()) { setError('Contact person is required'); return; }
    if (!form.email.trim()) { setError('Email is required'); return; }
    if (!form.phone.trim()) { setError('Phone is required'); return; }

    setSubmitting(true);
    try {
      const res = await apiPost('/api/public/dealer-inquiry', form);
      setSuccess(res.reference);
      trackEvent('dealer_inquiry_submit', { monthly_volume: form.monthly_volume || '' });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <PageMeta title="Dealer Partnership" description="Apply for dealer partnership. Volume pricing, dedicated dispatcher, fixed contract rates." path="/dealer-quote" i18n />
        <div style={{ marginBottom: '16px' }}><CheckIcon size={40} /></div>
        <h2 style={{ fontFamily: fonts.serif, fontSize: '24px', color: colors.text, marginBottom: '8px' }}>
          Application Received
        </h2>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6, marginBottom: '8px' }}>
          Reference: <strong style={{ fontFamily: fonts.mono }}>{success}</strong>
        </p>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6, marginBottom: '24px' }}>
          Our dealer relations team will contact you within 24 hours to discuss your transportation needs and set up your account.
        </p>
        <Link to="/dealers" style={{ ...btnStyles.secondary, textDecoration: 'none', display: 'inline-block' }}>
          Back to Dealers
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <PageMeta title="Dealer Partnership" description="Apply for dealer partnership. Volume pricing, dedicated dispatcher, fixed contract rates." path="/dealer-quote" i18n />
      <Link to="/dealers" style={{
        fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
        display: 'inline-block', marginBottom: '20px', textDecoration: 'none',
      }}>
        &larr; Back to Dealers
      </Link>

      <h1 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '4px' }}>
        Dealer Partnership Application
      </h1>
      <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '28px', lineHeight: 1.5 }}>
        Tell us about your dealership and transportation needs. We'll build a custom logistics plan for your business.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Business Info */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Business Information</div>
          <div style={rowStyle}>
            <label style={labelStyle}>Dealership Name *</label>
            <input style={inputStyle} value={form.dealership_name} onChange={e => set('dealership_name', e.target.value)} placeholder="ABC Motors" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', ...rowStyle }}>
            <div>
              <label style={labelStyle}>Contact Person *</label>
              <input style={inputStyle} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} placeholder="John Smith" />
            </div>
            <div>
              <label style={labelStyle}>Phone *</label>
              <input style={inputStyle} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 123-4567" />
            </div>
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Email *</label>
            <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@abcmotors.com" />
          </div>
        </div>

        {/* Address */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Dealership Address</div>
          <div style={rowStyle}>
            <label style={labelStyle}>Street</label>
            <input style={inputStyle} value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Auto Drive" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>City</label>
              <input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Houston" />
            </div>
            <div>
              <label style={labelStyle}>State</label>
              <select style={selectStyle} value={form.state} onChange={e => set('state', e.target.value)}>
                <option value="">--</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>ZIP</label>
              <input style={inputStyle} value={form.zip} onChange={e => set('zip', e.target.value)} placeholder="77001" maxLength={5} />
            </div>
          </div>
        </div>

        {/* Transportation Needs */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Transportation Needs</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', ...rowStyle }}>
            <div>
              <label style={labelStyle}>Monthly Volume</label>
              <select style={selectStyle} value={form.monthly_volume} onChange={e => set('monthly_volume', e.target.value)}>
                <option value="">Select...</option>
                {VOLUMES.map(v => <option key={v} value={v}>{v} vehicles</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>How did you hear about us</label>
              <select style={selectStyle} value={form.referral_source} onChange={e => set('referral_source', e.target.value)}>
                <option value="">Select...</option>
                {REFERRAL_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={rowStyle}>
            <label style={labelStyle}>Primary Routes</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: '60px' }}
              value={form.primary_routes}
              onChange={e => set('primary_routes', e.target.value)}
              placeholder="e.g., Copart Dallas → Our lot in Houston, Manheim PA → Our lot in Newark"
              rows={2}
            />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Preferred Pricing Model</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              {[
                { value: 'broker_paid', label: 'Broker-paid carrier (we handle everything)' },
                { value: 'cod', label: 'Direct carrier payment (COD)' },
              ].map(opt => (
                <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: fonts.sans, fontSize: '14px', color: colors.text }}>
                  <input
                    type="radio"
                    name="pricing_model"
                    value={opt.value}
                    checked={form.pricing_model === opt.value}
                    onChange={() => set('pricing_model', opt.value)}
                    style={{ accentColor: colors.accent, width: '16px', height: '16px' }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Services Needed</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
              {SERVICES.map(svc => (
                <label key={svc.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: fonts.sans, fontSize: '14px', color: colors.text }}>
                  <input
                    type="checkbox"
                    checked={form.services.includes(svc.key)}
                    onChange={() => toggleService(svc.key)}
                    style={{ accentColor: colors.accent, width: '16px', height: '16px' }}
                  />
                  {svc.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Additional Information</div>
          <textarea
            style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            placeholder="Anything else you'd like us to know about your business needs..."
            rows={3}
          />
        </div>

        {/* SMS Consent */}
        <div style={{ marginBottom: '20px' }}>
          <SmsConsent checked={form.sms_consent} onChange={v => set('sms_consent', v)} />
        </div>

        {error && (
          <div style={{
            fontFamily: fonts.sans, fontSize: '13px', color: '#c0392b',
            padding: '10px 14px', background: '#fdecea', borderRadius: '8px', marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting} style={{
          ...btnStyles.accent,
          width: '100%',
          padding: '14px',
          fontSize: '14px',
          opacity: submitting ? 0.7 : 1,
          cursor: submitting ? 'not-allowed' : 'pointer',
        }}>
          {submitting ? 'Submitting...' : 'REQUEST DEALER PARTNERSHIP'}
        </button>
      </form>
    </div>
  );
}
