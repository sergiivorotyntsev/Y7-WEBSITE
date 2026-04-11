import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles } from '../../theme';

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  padding: '10px 14px',
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
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '4px',
};

const LOCATION_TYPES = [
  { value: 'business', label: 'Business' },
  { value: 'residence', label: 'Residence' },
  { value: 'auction', label: 'Auction' },
  { value: 'port', label: 'Port' },
  { value: 'dealership', label: 'Dealership' },
  { value: 'terminal', label: 'Terminal' },
  { value: 'warehouse', label: 'Warehouse' },
];

const USAGE_ROLES = [
  { value: 'delivery', label: 'Delivery' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'both', label: 'Both' },
];

const DEFAULT_LOCATION_TYPE = {
  dealer: 'dealership',
  exporter: 'warehouse',
  auction_buyer: 'auction',
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
    location_type: DEFAULT_LOCATION_TYPE[user?.customer_type] || 'business',
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
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link to="/portal/dashboard" style={{
        fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
        display: 'inline-block', marginBottom: '20px', textDecoration: 'none',
      }}>
        &larr; Back to Dashboard
      </Link>

      <h1 style={{
        fontFamily: fonts.serif, fontSize: '28px', fontWeight: 700,
        color: colors.text, marginBottom: '8px',
      }}>
        Add Your Default Location
      </h1>
      <p style={{
        fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted,
        marginBottom: '24px', lineHeight: 1.6,
      }}>
        We need at least one delivery location on file before you can sign your agreement and start placing orders. This will be used as the default destination for your shipments.
      </p>

      <form onSubmit={handleSubmit} style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '16px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}>
        <div>
          <label style={labelStyle}>Location Label *</label>
          <input style={inputStyle} value={form.label} onChange={e => set('label', e.target.value)} placeholder="Main Lot" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Location Type *</label>
            <select style={selectStyle} value={form.location_type} onChange={e => set('location_type', e.target.value)}>
              {LOCATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Usage *</label>
            <select style={selectStyle} value={form.usage_role} onChange={e => set('usage_role', e.target.value)}>
              {USAGE_ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Street Address *</label>
          <input style={inputStyle} value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Auto Drive" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>City *</label>
            <input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Houston" />
          </div>
          <div>
            <label style={labelStyle}>State *</label>
            <select style={selectStyle} value={form.state} onChange={e => set('state', e.target.value)}>
              <option value="">--</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>ZIP *</label>
            <input style={inputStyle} value={form.zip_code} onChange={e => set('zip_code', e.target.value)} placeholder="77001" maxLength={5} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Contact Name</label>
            <input style={inputStyle} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} placeholder="John Smith" />
          </div>
          <div>
            <label style={labelStyle}>Contact Phone</label>
            <input style={inputStyle} type="tel" value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)} placeholder="(555) 123-4567" />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Business Hours</label>
          <input style={inputStyle} value={form.business_hours} onChange={e => set('business_hours', e.target.value)} placeholder="Mon-Fri 9am-5pm" />
        </div>

        <div>
          <label style={labelStyle}>Delivery Instructions</label>
          <textarea
            style={{ ...inputStyle, resize: 'vertical', minHeight: '70px' }}
            value={form.delivery_instructions}
            onChange={e => set('delivery_instructions', e.target.value.slice(0, 500))}
            placeholder="e.g., Call 30 min before delivery. Gate code #1234. Appointment required."
            rows={3}
            maxLength={500}
          />
          <div style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted, textAlign: 'right', marginTop: '2px' }}>
            {form.delivery_instructions.length}/500
          </div>
        </div>

        {error && (
          <div style={{
            fontFamily: fonts.sans, fontSize: '13px', color: '#c0392b',
            padding: '10px 14px', background: '#fdecea', borderRadius: '8px',
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting} style={{
          ...btnStyles.accent,
          width: '100%',
          padding: '14px',
          fontSize: '14px',
          opacity: submitting ? 0.6 : 1,
          marginTop: '4px',
        }}>
          {submitting ? 'Saving...' : 'Save Location & Continue'}
        </button>
      </form>
    </div>
  );
}
