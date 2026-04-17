import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { CheckIcon } from '../components/icons';
import { apiPost } from '../hooks/useApi';
import { portalFetch } from '../hooks/useAuth';
import SmsConsent from '../components/SmsConsent';
import { trackEvent } from '../utils/analytics';
import styles from './DealerQuote.module.css';
import qForm from '../components/QuoteForm.module.css';
import btn from '../styles/buttons.module.css';

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

export default function DealerQuote() {
  const [searchParams] = useSearchParams();
  const [prefilled, setPrefilled] = useState(false);
  const [form, setForm] = useState({
    dealership_name: '', contact_name: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    monthly_volume: '', primary_routes: '', pricing_model: '',
    services: [], referral_source: '', notes: '', sms_consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchParams.get('prefill') !== '1') return;
    portalFetch('/api/portal/data/profile')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        setForm(prev => ({
          ...prev,
          contact_name: data.contact_name || prev.contact_name,
          email: data.email || prev.email,
          phone: data.phone || prev.phone,
        }));
        setPrefilled(true);
      })
      .catch(() => {});
  }, [searchParams]);

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
      <div className={styles.successWrap}>
        <PageMeta title="Dealer Partnership" description="Apply for dealer partnership. Volume pricing, dedicated dispatcher, fixed contract rates." path="/dealer-quote" />
        <div className={styles.successIcon}><CheckIcon size={32} /></div>
        <h2 className={styles.successTitle}>Application Received</h2>
        <p className={styles.successRef}>
          Reference: <strong className={styles.successRefCode}>{success}</strong>
        </p>
        <p className={styles.successMsg}>
          Our dealer relations team will contact you within 24 hours to discuss your transportation needs and set up your account.
        </p>
        <Link to="/dealers" className={`${btn.btnSecondary} ${styles.backBtn}`}>
          Back to Dealers
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <PageMeta title="Dealer Partnership" description="Apply for dealer partnership. Volume pricing, dedicated dispatcher, fixed contract rates." path="/dealer-quote" />

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroKicker}>&#9670; Dealer Partnership</span>
        <h1 className={styles.title}>Apply for a Dealer Partnership</h1>
        <p className={styles.subtitle}>
          Tell us about your dealership and transportation needs. We'll build a custom logistics plan for your business.
        </p>
      </section>

      <div className={styles.body}>
        <Link to="/dealers" className={styles.backLink}>&larr; Back to Dealers</Link>

        {prefilled && (
          <div className={styles.prefillBanner}>
            We've pre-filled some information from your account. Please complete the remaining business details below.
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Business Info */}
          <div className={styles.section} style={{ '--i': 0 }}>
            <div className={styles.sectionTitle}>Business Information</div>
            <div className={styles.row}>
              <label className={qForm.label}>Dealership Name *</label>
              <input className={qForm.input} value={form.dealership_name} onChange={e => set('dealership_name', e.target.value)} placeholder="ABC Motors" />
            </div>
            <div className={styles.row2}>
              <div>
                <label className={qForm.label}>Contact Person *</label>
                <input className={qForm.input} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} placeholder="John Smith" />
              </div>
              <div>
                <label className={qForm.label}>Phone *</label>
                <input className={qForm.input} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 123-4567" />
              </div>
            </div>
            <div className={styles.row}>
              <label className={qForm.label}>Email *</label>
              <input className={qForm.input} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@abcmotors.com" />
            </div>
          </div>

          {/* Address */}
          <div className={styles.section} style={{ '--i': 1 }}>
            <div className={styles.sectionTitle}>Dealership Address</div>
            <div className={styles.row}>
              <label className={qForm.label}>Street</label>
              <input className={qForm.input} value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Auto Drive" />
            </div>
            <div className={styles.row3}>
              <div>
                <label className={qForm.label}>City</label>
                <input className={qForm.input} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Houston" />
              </div>
              <div>
                <label className={qForm.label}>State</label>
                <select className={qForm.select} value={form.state} onChange={e => set('state', e.target.value)}>
                  <option value="">--</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={qForm.label}>ZIP</label>
                <input className={qForm.input} value={form.zip} onChange={e => set('zip', e.target.value)} placeholder="77001" maxLength={5} />
              </div>
            </div>
          </div>

          {/* Transportation Needs */}
          <div className={styles.section} style={{ '--i': 2 }}>
            <div className={styles.sectionTitle}>Transportation Needs</div>
            <div className={styles.row2}>
              <div>
                <label className={qForm.label}>Monthly Volume</label>
                <select className={qForm.select} value={form.monthly_volume} onChange={e => set('monthly_volume', e.target.value)}>
                  <option value="">Select...</option>
                  {VOLUMES.map(v => <option key={v} value={v}>{v} vehicles</option>)}
                </select>
              </div>
              <div>
                <label className={qForm.label}>How did you hear about us</label>
                <select className={qForm.select} value={form.referral_source} onChange={e => set('referral_source', e.target.value)}>
                  <option value="">Select...</option>
                  {REFERRAL_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.row}>
              <label className={qForm.label}>Primary Routes</label>
              <textarea
                className={qForm.textarea}
                value={form.primary_routes}
                onChange={e => set('primary_routes', e.target.value)}
                placeholder="e.g., Copart Dallas → Our lot in Houston, Manheim PA → Our lot in Newark"
                rows={2}
              />
            </div>

            <div className={styles.row}>
              <label className={qForm.label}>Preferred Pricing Model</label>
              <div className={styles.radioGroup}>
                {[
                  { value: 'broker_paid', label: 'Broker-paid carrier (we handle everything)' },
                  { value: 'cod', label: 'Direct carrier payment (COD)' },
                ].map(opt => (
                  <label key={opt.value} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="pricing_model"
                      value={opt.value}
                      checked={form.pricing_model === opt.value}
                      onChange={() => set('pricing_model', opt.value)}
                      className={styles.radioInput}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.row}>
              <label className={qForm.label}>Services Needed</label>
              <div className={styles.serviceGrid}>
                {SERVICES.map(svc => (
                  <label key={svc.key} className={styles.radioLabel}>
                    <input
                      type="checkbox"
                      checked={form.services.includes(svc.key)}
                      onChange={() => toggleService(svc.key)}
                      className={styles.checkInput}
                    />
                    {svc.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className={styles.section} style={{ '--i': 3 }}>
            <div className={styles.sectionTitle}>Additional Information</div>
            <textarea
              className={qForm.textarea}
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Anything else you'd like us to know about your business needs..."
              rows={3}
            />
          </div>

          {/* SMS Consent */}
          <div>
            <SmsConsent checked={form.sms_consent} onChange={v => set('sms_consent', v)} />
          </div>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <button type="submit" disabled={submitting} className={`${btn.btnAccent} ${styles.submitBtn}`}>
            {submitting ? 'Submitting...' : 'REQUEST DEALER PARTNERSHIP'}
          </button>

          <div className={styles.trustRow}>
            <span className={styles.trustItem}>
              <span className={styles.trustDot}>&#9670;</span> FMCSA Licensed MC #1741537
            </span>
            <span className={styles.trustItem}>
              <span className={styles.trustDot}>&#9670;</span> Volume pricing available
            </span>
            <span className={styles.trustItem}>
              <span className={styles.trustDot}>&#9670;</span> 24-hour response
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
