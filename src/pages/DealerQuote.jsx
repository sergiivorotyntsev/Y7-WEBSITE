import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { CheckIcon } from '../components/icons';
import { apiPost } from '../hooks/useApi';
import { portalFetch } from '../hooks/useAuth';
import SmsConsent from '../components/SmsConsent';
import PhoneInput, { getCleanPhone, isValidPhone } from '../components/PhoneInput';
import { trackEvent } from '../utils/trackEvent';
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

  // QUOTE-P2 T09: capture marketing attribution on every form mount.
  const utm = useMemo(() => ({
    utm_source:   searchParams.get('utm_source')   || '',
    utm_medium:   searchParams.get('utm_medium')   || '',
    utm_campaign: searchParams.get('utm_campaign') || '',
    utm_term:     searchParams.get('utm_term')     || '',
    utm_content:  searchParams.get('utm_content')  || '',
    gclid:        searchParams.get('gclid')        || '',
    fbclid:       searchParams.get('fbclid')       || '',
  }), [searchParams]);
  const [form, setForm] = useState({
    dealership_name: '', contact_name: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    registration_state: '', has_dealer_license: '',
    monthly_volume: '', primary_routes: '', pricing_model: '',
    services: [], referral_source: '', notes: '', sms_consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  // B: field-level errors, populated only after an invalid submit (never at rest).
  const [fieldErrors, setFieldErrors] = useState({});

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
    setFieldErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
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
    setSubmitAttempted(true);  // reveals SmsConsent error banner if consent missing
    // B: validate all fields, surface per-field errors + a summary alert.
    const fe = {};
    if (!form.dealership_name.trim()) fe.dealership_name = 'Dealership name is required';
    if (!form.contact_name.trim()) fe.contact_name = 'Contact person is required';
    if (!form.email.trim()) fe.email = 'Email is required';
    if (!form.phone.trim()) fe.phone = 'Phone is required';
    else if (!isValidPhone(form.phone)) fe.phone = 'Please enter a valid 10-digit phone number.';
    if (!form.registration_state) fe.registration_state = 'Please select the state where your company is registered.';
    if (!form.has_dealer_license) fe.has_dealer_license = 'Please tell us whether you hold an active dealer license.';
    setFieldErrors(fe);
    if (Object.keys(fe).length > 0) {
      setError(fe.dealership_name || fe.contact_name || fe.email || fe.phone || fe.registration_state || fe.has_dealer_license);
      return;
    }
    if (!form.sms_consent) {
      setError('You must agree to receive SMS notifications to submit.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiPost('/api/public/dealer-inquiry', {
        ...form,
        phone: getCleanPhone(form.phone),
        // store the license radio as a real boolean for the API
        has_dealer_license: form.has_dealer_license === 'yes',
        // sms_consent_timestamp removed (QUOTE-P0 T12) — server is authoritative
        sms_consent_page_url: window.location.href,
        sms_consent_page: window.location.href,
        source: 'website_dealer',
        lang: 'en',
        ...utm,  // QUOTE-P2 T09
      });
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
        <p className={styles.successMsg}>
          We've also sent a portal access link to your email — check your inbox to log in and track your inquiry.
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
              <label htmlFor="dq-dealership" className={qForm.label}>Dealership Name *</label>
              <input id="dq-dealership" className={`${qForm.input} ${fieldErrors.dealership_name ? styles.fieldError : ''}`} value={form.dealership_name} onChange={e => set('dealership_name', e.target.value)} placeholder="ABC Motors" aria-invalid={fieldErrors.dealership_name ? 'true' : undefined} />
              {fieldErrors.dealership_name && <span className={styles.fieldErrorMsg}>{fieldErrors.dealership_name}</span>}
            </div>
            <div className={styles.row2}>
              <div>
                <label htmlFor="dq-contact" className={qForm.label}>Contact Person *</label>
                <input id="dq-contact" className={`${qForm.input} ${fieldErrors.contact_name ? styles.fieldError : ''}`} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} placeholder="John Smith" aria-invalid={fieldErrors.contact_name ? 'true' : undefined} />
                {fieldErrors.contact_name && <span className={styles.fieldErrorMsg}>{fieldErrors.contact_name}</span>}
              </div>
              <div>
                <label htmlFor="dq-phone" className={qForm.label}>Phone *</label>
                <PhoneInput id="dq-phone" className={`${qForm.input} ${fieldErrors.phone ? styles.fieldError : ''}`} value={form.phone} onChange={v => set('phone', v)} required />
                {fieldErrors.phone && <span className={styles.fieldErrorMsg}>{fieldErrors.phone}</span>}
              </div>
            </div>
            <div className={styles.row}>
              <label htmlFor="dq-email" className={qForm.label}>Email *</label>
              <input id="dq-email" className={`${qForm.input} ${fieldErrors.email ? styles.fieldError : ''}`} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@abcmotors.com" aria-invalid={fieldErrors.email ? 'true' : undefined} />
              {fieldErrors.email && <span className={styles.fieldErrorMsg}>{fieldErrors.email}</span>}
            </div>
            <div className={styles.row}>
              <label className={qForm.label}>Do you hold an active dealer license? *</label>
              <div className={styles.radioGroup}>
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ].map(opt => (
                  <label key={opt.value} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="has_dealer_license"
                      value={opt.value}
                      checked={form.has_dealer_license === opt.value}
                      onChange={() => set('has_dealer_license', opt.value)}
                      className={styles.radioInput}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {fieldErrors.has_dealer_license && <span className={styles.fieldErrorMsg}>{fieldErrors.has_dealer_license}</span>}
            </div>
          </div>

          {/* Address */}
          <div className={styles.section} style={{ '--i': 1 }}>
            <div className={styles.sectionTitle}>Dealership Address</div>
            <div className={styles.row}>
              <label htmlFor="dq-address" className={qForm.label}>Street</label>
              <input id="dq-address" className={qForm.input} value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Auto Drive" />
            </div>
            <div className={styles.row3}>
              <div>
                <label htmlFor="dq-city" className={qForm.label}>City</label>
                <input id="dq-city" className={qForm.input} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Houston" />
              </div>
              <div>
                <label htmlFor="dq-state" className={qForm.label}>State</label>
                <select id="dq-state" className={qForm.select} value={form.state} onChange={e => set('state', e.target.value)}>
                  <option value="">--</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="dq-zip" className={qForm.label}>ZIP</label>
                <input id="dq-zip" className={qForm.input} value={form.zip} onChange={e => set('zip', e.target.value)} placeholder="77001" maxLength={5} />
              </div>
            </div>
            <div className={styles.row}>
              <label htmlFor="dq-reg-state" className={qForm.label}>State where your company is registered *</label>
              <select id="dq-reg-state" className={`${qForm.select} ${fieldErrors.registration_state ? styles.fieldError : ''}`} value={form.registration_state} onChange={e => set('registration_state', e.target.value)} aria-invalid={fieldErrors.registration_state ? 'true' : undefined}>
                <option value="">--</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {fieldErrors.registration_state && <span className={styles.fieldErrorMsg}>{fieldErrors.registration_state}</span>}
            </div>
          </div>

          {/* Transportation Needs */}
          <div className={styles.section} style={{ '--i': 2 }}>
            <div className={styles.sectionTitle}>Transportation Needs</div>
            <div className={styles.row2}>
              <div>
                <label htmlFor="dq-volume" className={qForm.label}>Monthly Volume</label>
                <select id="dq-volume" className={qForm.select} value={form.monthly_volume} onChange={e => set('monthly_volume', e.target.value)}>
                  <option value="">Select...</option>
                  {VOLUMES.map(v => <option key={v} value={v}>{v} vehicles</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="dq-referral" className={qForm.label}>How did you hear about us</label>
                <select id="dq-referral" className={qForm.select} value={form.referral_source} onChange={e => set('referral_source', e.target.value)}>
                  <option value="">Select...</option>
                  {REFERRAL_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.row}>
              <label htmlFor="dq-routes" className={qForm.label}>Primary Routes</label>
              <textarea
                id="dq-routes"
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
              aria-label="Additional information"
              rows={3}
            />
          </div>

          {/* SMS Consent (SMS-CONSENT-UX T02: label always visible; error via showError) */}
          <div>
            <SmsConsent
              checked={form.sms_consent}
              onChange={v => set('sms_consent', v)}
              showError={submitAttempted}
            />
          </div>

          {error && <div className={styles.errorAlert} role="alert">{error}</div>}

          <button
            type="submit"
            disabled={submitting || !form.sms_consent}
            className={`${btn.btnAccent} ${styles.submitBtn}`}
          >
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
