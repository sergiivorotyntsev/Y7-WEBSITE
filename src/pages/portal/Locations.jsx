import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { portalFetch } from '../../hooks/useAuth';
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

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

const TYPE_COLORS = {
  dealership: { bg: '#FEF3C7', color: '#92400E' },
  warehouse: { bg: '#DBEAFE', color: '#1E40AF' },
  auction: { bg: '#EDE9FE', color: '#7C3AED' },
  port: { bg: '#D1FAE5', color: '#059669' },
  business: { bg: '#F3F4F6', color: '#374151' },
  residence: { bg: '#FCE7F3', color: '#9D174D' },
  terminal: { bg: '#E0E7FF', color: '#3730A3' },
};

const ROLE_COLORS = {
  delivery: { bg: '#DBEAFE', color: '#1E40AF' },
  pickup: { bg: '#FEF3C7', color: '#92400E' },
  both: { bg: '#D1FAE5', color: '#059669' },
};

function Badge({ label, bg, color }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: '4px',
      fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px',
      textTransform: 'uppercase', fontFamily: fonts.sans,
      background: bg, color,
    }}>
      {label}
    </span>
  );
}

const EMPTY_FORM = {
  label: '', location_type: 'business', usage_role: 'delivery',
  address: '', city: '', state: '', zip_code: '',
  contact_name: '', contact_phone: '', business_hours: '', delivery_instructions: '',
};

function LocationForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [error, setError] = useState(null);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!form.label.trim()) { setError('Label is required'); return; }
    if (!form.address.trim()) { setError('Street address is required'); return; }
    if (!form.city.trim()) { setError('City is required'); return; }
    if (!form.state || form.state.length !== 2) { setError('State must be 2 letters'); return; }
    if (!form.zip_code.trim()) { setError('ZIP is required'); return; }
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#FFFBF7',
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '16px',
    }}>
      <div>
        <label style={labelStyle}>Label *</label>
        <input style={inputStyle} value={form.label} onChange={e => set('label', e.target.value)} placeholder="Main Lot" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label style={labelStyle}>Type</label>
          <select style={selectStyle} value={form.location_type} onChange={e => set('location_type', e.target.value)}>
            {LOCATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Usage</label>
          <select style={selectStyle} value={form.usage_role} onChange={e => set('usage_role', e.target.value)}>
            {USAGE_ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Street *</label>
        <input style={inputStyle} value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Auto Drive" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
        <div>
          <label style={labelStyle}>City *</label>
          <input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} />
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
          <input style={inputStyle} value={form.zip_code} onChange={e => set('zip_code', e.target.value)} maxLength={5} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label style={labelStyle}>Contact Name</label>
          <input style={inputStyle} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Contact Phone</label>
          <input style={inputStyle} type="tel" value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Business Hours</label>
        <input style={inputStyle} value={form.business_hours} onChange={e => set('business_hours', e.target.value)} placeholder="Mon-Fri 9am-5pm" />
      </div>
      <div>
        <label style={labelStyle}>Delivery Instructions</label>
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: '60px' }}
          value={form.delivery_instructions}
          onChange={e => set('delivery_instructions', e.target.value.slice(0, 500))}
          placeholder="Call 30 min before. Gate code #1234."
          maxLength={500}
        />
      </div>
      {error && (
        <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: '#c0392b', padding: '8px 12px', background: '#fdecea', borderRadius: '8px' }}>
          {error}
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button type="button" onClick={onCancel} style={{
          ...btnStyles.primary, padding: '10px 20px', fontSize: '13px',
          background: colors.bgMuted, color: colors.text, border: `1px solid ${colors.border}`,
        }}>
          Cancel
        </button>
        <button type="submit" disabled={submitting} style={{
          ...btnStyles.accent, padding: '10px 20px', fontSize: '13px',
          opacity: submitting ? 0.6 : 1,
        }}>
          {submitting ? 'Saving...' : (initial ? 'Update' : 'Add Location')}
        </button>
      </div>
    </form>
  );
}

export default function Locations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchLocations = useCallback(() => {
    portalFetch('/api/portal/locations')
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => { setItems(data.items || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchLocations(); }, [fetchLocations]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  async function handleAdd(form) {
    setSubmitting(true);
    try {
      const res = await portalFetch('/api/portal/locations', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || 'Failed to create');
      }
      setShowAdd(false);
      fetchLocations();
      setToast('Location added');
    } catch (err) {
      setToast(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(id, form) {
    setSubmitting(true);
    try {
      const res = await portalFetch(`/api/portal/locations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || 'Failed to update');
      }
      setEditingId(null);
      fetchLocations();
      setToast('Location updated');
    } catch (err) {
      setToast(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(loc) {
    if (!window.confirm(`Delete "${loc.label || loc.name}"? This cannot be undone.`)) return;
    try {
      const res = await portalFetch(`/api/portal/locations/${loc.id}`, { method: 'DELETE' });
      if (res.status === 409) {
        const d = await res.json().catch(() => ({}));
        const detail = d.detail || {};
        window.alert(
          `This location is used by ${detail.active_count || 'some'} active order(s).\n\n` +
          'Cancel or complete those orders before deleting this location.'
        );
        return;
      }
      if (!res.ok) throw new Error('Failed to delete');
      fetchLocations();
      setToast('Location deleted');
    } catch (err) {
      setToast(err.message);
    }
  }

  async function handleSetDefault(id) {
    try {
      const res = await portalFetch(`/api/portal/locations/${id}/set-default`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed');
      fetchLocations();
      setToast('Default location updated');
    } catch {
      setToast('Failed to set default');
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link to="/portal/dashboard" style={{
        fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
        display: 'inline-block', marginBottom: '20px', textDecoration: 'none',
      }}>
        &larr; Back to Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: 700, color: colors.text, margin: 0 }}>
          Saved Locations
        </h1>
        {!showAdd && (
          <button onClick={() => { setShowAdd(true); setEditingId(null); }} style={{
            ...btnStyles.accent, padding: '10px 20px', fontSize: '13px',
          }}>
            + Add Location
          </button>
        )}
      </div>

      {toast && (
        <div style={{
          fontFamily: fonts.sans, fontSize: '13px', color: '#065F46',
          padding: '10px 14px', background: '#D1FAE5', borderRadius: '8px',
          marginBottom: '16px',
        }}>
          {toast}
        </div>
      )}

      {showAdd && (
        <LocationForm
          onSubmit={handleAdd}
          onCancel={() => setShowAdd(false)}
          submitting={submitting}
        />
      )}

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Loading...</div>
      ) : items.length === 0 && !showAdd ? (
        <div style={{
          textAlign: 'center', padding: '60px 24px',
          background: colors.bgCard, border: `1px solid ${colors.border}`,
          borderRadius: '16px',
        }}>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '16px' }}>
            No locations yet. Add your first location to start placing orders.
          </p>
          <button onClick={() => setShowAdd(true)} style={{ ...btnStyles.accent, padding: '12px 24px', fontSize: '13px' }}>
            + Add Location
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map(loc => (
            editingId === loc.id ? (
              <LocationForm
                key={loc.id}
                initial={{
                  label: loc.label || loc.name || '',
                  location_type: loc.location_type || 'business',
                  usage_role: loc.usage_role || 'delivery',
                  address: loc.address || '',
                  city: loc.city || '',
                  state: loc.state || '',
                  zip_code: loc.zip_code || '',
                  contact_name: loc.contact_name || '',
                  contact_phone: loc.contact_phone || '',
                  business_hours: loc.business_hours || '',
                  delivery_instructions: loc.delivery_instructions || '',
                }}
                onSubmit={form => handleUpdate(loc.id, form)}
                onCancel={() => setEditingId(null)}
                submitting={submitting}
              />
            ) : (
              <div key={loc.id} style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                padding: '16px 20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: fonts.serif, fontSize: '16px', fontWeight: 700, color: colors.text }}>
                    {loc.label || loc.name}
                  </span>
                  {loc.is_default && (
                    <Badge label="Default" bg="#FEF3C7" color="#92400E" />
                  )}
                  {loc.deactivated_at && (
                    <Badge label="Inactive" bg="#FEE2E2" color="#991B1B" />
                  )}
                  <Badge
                    label={loc.location_type || 'business'}
                    bg={(TYPE_COLORS[loc.location_type] || TYPE_COLORS.business).bg}
                    color={(TYPE_COLORS[loc.location_type] || TYPE_COLORS.business).color}
                  />
                  <Badge
                    label={loc.usage_role || 'delivery'}
                    bg={(ROLE_COLORS[loc.usage_role] || ROLE_COLORS.delivery).bg}
                    color={(ROLE_COLORS[loc.usage_role] || ROLE_COLORS.delivery).color}
                  />
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.text, marginBottom: '4px' }}>
                  {[loc.address, loc.city, `${loc.state} ${loc.zip_code}`].filter(Boolean).join(', ')}
                </div>
                {(loc.contact_name || loc.contact_phone) && (
                  <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>
                    {[loc.contact_name, loc.contact_phone].filter(Boolean).join(' - ')}
                  </div>
                )}
                {loc.business_hours && (
                  <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>
                    Hours: {loc.business_hours}
                  </div>
                )}
                {loc.delivery_instructions && (
                  <div style={{
                    fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted,
                    marginBottom: '4px', overflow: 'hidden',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}>
                    {loc.delivery_instructions}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button onClick={() => { setEditingId(loc.id); setShowAdd(false); }} style={{
                    padding: '6px 14px', fontSize: '12px', fontFamily: fonts.sans, fontWeight: 600,
                    background: colors.bgMuted, border: `1px solid ${colors.border}`,
                    borderRadius: '6px', cursor: 'pointer', color: colors.text,
                  }}>
                    Edit
                  </button>
                  {!loc.is_default && (
                    <button onClick={() => handleSetDefault(loc.id)} style={{
                      padding: '6px 14px', fontSize: '12px', fontFamily: fonts.sans, fontWeight: 600,
                      background: '#FFFBEB', border: '1px solid #FDE68A',
                      borderRadius: '6px', cursor: 'pointer', color: '#92400E',
                    }}>
                      Set Default
                    </button>
                  )}
                  <button onClick={() => handleDelete(loc)} style={{
                    padding: '6px 14px', fontSize: '12px', fontFamily: fonts.sans, fontWeight: 600,
                    background: '#FEF2F2', border: '1px solid #FECACA',
                    borderRadius: '6px', cursor: 'pointer', color: '#DC2626',
                  }}>
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
