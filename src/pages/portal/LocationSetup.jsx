import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import PhoneInput from '../../components/PhoneInput';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';

// QUOTE-P1 T05: CD V2 CamelCase values (match QuoteForm.jsx)
const LOCATION_TYPES = [
  { value: 'Residence',          label: 'Residential' },
  { value: 'CommercialBusiness', label: 'Business / Commercial' },
  { value: 'Auction',            label: 'Auction' },
  { value: 'Dealership',         label: 'Dealership' },
  { value: 'Port',               label: 'Port' },
  { value: 'Warehouse',          label: 'Warehouse' },
  { value: 'Terminal',           label: 'Terminal' },
  { value: 'Other',              label: 'Other' },
];

const USAGE_ROLES = [
  { value: 'delivery', label: 'Delivery' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'both', label: 'Both' },
];

const DEFAULT_LOCATION_TYPE = {
  dealer: 'Dealership',
  exporter: 'Warehouse',
  auction_buyer: 'Auction',
};

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

export default function LocationSetup() {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    label: '',
    location_type: DEFAULT_LOCATION_TYPE[user?.customer_type] || 'CommercialBusiness',
    requires_twic: false,
    usage_role: 'delivery',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    contact_name: '',
    contact_phone: '',
    business_hours: '',
    delivery_instructions: '',
  });

  useEffect(() => {
    portalFetch('/api/portal/locations')
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => {
        if (data.items && data.items.length > 0) {
          navigate('/portal/dashboard', { replace: true });
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [navigate]);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.label.trim()) { setError('Location label is required'); return; }
    if (!form.address.trim()) { setError('Street address is required'); return; }
    if (!form.city.trim()) { setError('City is required'); return; }
    if (!form.state || form.state.length !== 2) { setError('State must be a 2-letter abbreviation'); return; }
    if (!form.zip_code.trim()) { setError('ZIP code is required'); return; }

    setSubmitting(true);
    try {
      const res = await portalFetch('/api/portal/locations', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail?.message || data.detail || 'Failed to save location');
      }
      await checkAuth();
      navigate('/portal/dashboard?toast=location_added', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  }

  if (checking) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: 'var(--font-sans, system-ui)', color: 'var(--v2-ink-muted, #5c5851)' }}>Loading...</div>;
  }

  return (
    <div className={`${pp.shell} ${pp.measureNarrow}`}>
      <Link to="/portal/dashboard" className={pp.backLink}>
        &larr; Back to Dashboard
      </Link>

      <h1 className={pp.pageTitle}>
        Add Your Default Location
      </h1>
      <p className={pp.pageSub} style={{ marginBottom: '24px' }}>
        We need at least one delivery location on file before you can sign your agreement and start placing orders. This will be used as the default destination for your shipments.
      </p>

      <form onSubmit={handleSubmit} className={pp.card} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}>
        <div>
          <label className={pp.label}>Location Label *</label>
          <input className={pp.input} value={form.label} onChange={e => set('label', e.target.value)} placeholder="Main Lot" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label className={pp.label}>Location Type *</label>
            <select className={pp.select} value={form.location_type} onChange={e => set('location_type', e.target.value)}>
              {LOCATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className={pp.label}>Usage *</label>
            <select className={pp.select} value={form.usage_role} onChange={e => set('usage_role', e.target.value)}>
              {USAGE_ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
        </div>

        {form.location_type === 'Port' && (
          <label className={pp.notice} style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px',
          }}>
            <input
              type="checkbox"
              checked={form.requires_twic}
              onChange={e => set('requires_twic', e.target.checked)}
            />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>
              Driver must have TWIC card
            </span>
            <small style={{ flexBasis: '100%', fontSize: '11px', color: 'var(--v2-ink-muted, #5c5851)', lineHeight: 1.4 }}>
              A Transportation Worker Identification Credential is required by the
              Maritime Transportation Security Act to access some port locations.
              If unsure, contact the port.
            </small>
          </label>
        )}

        <div>
          <label className={pp.label}>Street Address *</label>
          <input className={pp.input} value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Auto Drive" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label className={pp.label}>City *</label>
            <input className={pp.input} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Houston" />
          </div>
          <div>
            <label className={pp.label}>State *</label>
            <select className={pp.select} value={form.state} onChange={e => set('state', e.target.value)}>
              <option value="">--</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={pp.label}>ZIP *</label>
            <input className={pp.input} value={form.zip_code} onChange={e => set('zip_code', e.target.value)} placeholder="77001" maxLength={5} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label className={pp.label}>Contact Name</label>
            <input className={pp.input} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} placeholder="John Smith" />
          </div>
          <div>
            <label className={pp.label}>Contact Phone</label>
            <PhoneInput className={pp.input} value={form.contact_phone} onChange={v => set('contact_phone', v)} />
          </div>
        </div>

        <div>
          <label className={pp.label}>Business Hours</label>
          <input className={pp.input} value={form.business_hours} onChange={e => set('business_hours', e.target.value)} placeholder="Mon-Fri 9am-5pm" />
        </div>

        <div>
          <label className={pp.label}>Delivery Instructions</label>
          <textarea
            className={pp.textarea}
            value={form.delivery_instructions}
            onChange={e => set('delivery_instructions', e.target.value.slice(0, 500))}
            placeholder="e.g., Call 30 min before delivery. Gate code #1234. Appointment required."
            rows={3}
            maxLength={500}
          />
          <div className={pp.hint} style={{ textAlign: 'right' }}>
            {form.delivery_instructions.length}/500
          </div>
        </div>

        {error && (
          <div className={pp.errorBlock}>
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting} className={v2b.cta} style={{
          width: '100%',
          opacity: submitting ? 0.6 : 1,
          marginTop: '4px',
        }}>
          {submitting ? 'Saving...' : 'Save Location & Continue'}
        </button>
      </form>
    </div>
  );
}
