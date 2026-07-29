// EXP2-T02: Locations intentionally co-exports LocationsManager (the embeddable
// form+list+CRUD used by the onboarding warehouse step) alongside the page.
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { portalFetch, useAuth } from '../../hooks/useAuth';
import PhoneInput from '../../components/PhoneInput';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';

// WH-1-T03: vocabulary and policy come from the shared field definition —
// this form used to carry its own lowercase type set, which the export
// normalizer didn't recognize in its stored CamelCase default (every
// cabinet-created warehouse shipped to Central Dispatch as 'Other').
import {
  LOCATION_TYPE_OPTIONS,
  USAGE_ROLE_OPTIONS,
  WAREHOUSE_FIELDS,
  canonicalLocationType,
} from '../../data/warehouseFields';

const LOCATION_TYPES = LOCATION_TYPE_OPTIONS;
const USAGE_ROLES = USAGE_ROLE_OPTIONS;

// Operator-only facts (policy 'admin' in the shared definition): shown
// read-only with a contact hint — port routing and the default facility are
// Y7 decisions (owner ruling WH-1 §1).
const ADMIN_ONLY_DISPLAY = WAREHOUSE_FIELDS.filter(
  d => d.policy === 'admin' && !['short_code'].includes(d.key)
);

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

// C0 status chips replace the old bootstrap type/role color palettes: types
// and usage roles are neutral information (chipInk); an Inactive location reads
// as attention (chipSoft). Owner ruling — blue/purple semantics collapse to ink.
function Badge({ label, variant }) {
  return <span className={variant || pp.chipInk}>{label}</span>;
}

const EMPTY_FORM = {
  label: '', location_type: 'CommercialBusiness', usage_role: 'delivery',
  address: '', city: '', state: '', zip_code: '',
  phone: '', contact_name: '', contact_phone: '', contact_email: '',
  business_hours: '', delivery_instructions: '', requires_twic: false,
};

function LocationForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(() => {
    if (!initial) return EMPTY_FORM;
    const f = { ...EMPTY_FORM };
    for (const k of Object.keys(EMPTY_FORM)) {
      f[k] = k === 'requires_twic' ? !!initial[k] : (initial[k] ?? '');
    }
    f.location_type = canonicalLocationType(initial.location_type);
    return f;
  });
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
    <form onSubmit={handleSubmit} className={pp.card} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div>
        <label className={pp.label}>Label *</label>
        <input className={pp.input} value={form.label} onChange={e => set('label', e.target.value)} placeholder="Main Lot" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label className={pp.label}>Type</label>
          <select className={pp.select} value={form.location_type} onChange={e => set('location_type', e.target.value)}>
            {LOCATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className={pp.label}>Usage</label>
          <select className={pp.select} value={form.usage_role} onChange={e => set('usage_role', e.target.value)}>
            {USAGE_ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={pp.label}>Street *</label>
        <input className={pp.input} value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Auto Drive" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
        <div>
          <label className={pp.label}>City *</label>
          <input className={pp.input} value={form.city} onChange={e => set('city', e.target.value)} />
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
          <input className={pp.input} value={form.zip_code} onChange={e => set('zip_code', e.target.value)} maxLength={5} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label className={pp.label}>Contact Name</label>
          <input className={pp.input} value={form.contact_name} onChange={e => set('contact_name', e.target.value)} />
        </div>
        <div>
          <label className={pp.label}>Contact Phone</label>
          <PhoneInput className={pp.input} value={form.contact_phone} onChange={v => set('contact_phone', v)} />
        </div>
      </div>
      {/* WH-1-T03: facility phone + contact email were admin-only by accident —
          they are the customer's own facility data and both reach the carrier. */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label className={pp.label}>Facility Phone</label>
          <PhoneInput className={pp.input} value={form.phone} onChange={v => set('phone', v)} />
        </div>
        <div>
          <label className={pp.label}>Contact Email</label>
          <input className={pp.input} type="email" value={form.contact_email} onChange={e => set('contact_email', e.target.value)} placeholder="gate@company.com" />
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
          placeholder="Call 30 min before. Gate code #1234."
          maxLength={500}
        />
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans, system-ui)', fontSize: 13, cursor: 'pointer' }}>
        <input type="checkbox" checked={!!form.requires_twic} onChange={e => set('requires_twic', e.target.checked)} />
        TWIC card required at this facility
      </label>
      {/* WH-1-T03: operator-managed facts, read-only by policy (owner ruling:
          port routing and the default facility are Y7 decisions). */}
      {initial && ADMIN_ONLY_DISPLAY.some(d => initial[d.key]) && (
        <div style={{ borderTop: '1px solid var(--v2-line-on-paper, rgba(5,6,7,0.14))', paddingTop: 10 }}>
          <div className={pp.label} style={{ marginBottom: 6 }}>Managed by Y7</div>
          {ADMIN_ONLY_DISPLAY.filter(d => initial[d.key]).map(d => (
            <div key={d.key} style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: 13, marginBottom: 4 }}>
              <span style={{ color: 'var(--v2-ink-muted, #5c5851)' }}>{d.label}: </span>
              <span>{d.type === 'checkbox' ? 'Yes' : String(initial[d.key])}</span>
            </div>
          ))}
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: 11, color: 'var(--v2-ink-muted, #5c5851)' }}>
            To change these, contact dispatch@y7agency.com.
          </div>
        </div>
      )}
      {error && (
        <div className={pp.errorBlock}>
          {error}
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button type="button" onClick={onCancel} className={v2b.ghostOnPaper}>
          Cancel
        </button>
        <button type="submit" disabled={submitting} className={v2b.cta} style={{ opacity: submitting ? 0.6 : 1 }}>
          {submitting ? 'Saving...' : (initial ? 'Update' : 'Add Location')}
        </button>
      </div>
    </form>
  );
}

// EXP2-T02: the embeddable warehouse manager — form + list + CRUD, no page
// chrome. The /portal/locations page wraps it (behavior identical); the
// onboarding warehouse step embeds it and reads the live list via
// onLocationsChange for its delivery-capable Continue gate.
export function LocationsManager({ heading = null, description = null, onLocationsChange, customerType = null }) {
  const { user } = useAuth();
  // ACF-T03: the onboarding wizard reaches the warehouse step as soon as the
  // user picks "Exporter" (local selectedType), but the auth-context
  // user.customer_type only flips after classify-and-sign — so gating the ports
  // fetch on user.customer_type alone left the Departure Port dropdown missing
  // inside the wizard. Let the caller pass the type it already knows; the
  // standalone /portal/locations page passes nothing and falls back to context,
  // so its behavior is unchanged.
  const effectiveType = customerType || user?.customer_type;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchLocations = useCallback(() => {
    portalFetch('/api/portal/locations')
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => {
        const list = data.items || [];
        setItems(list);
        setLoading(false);
        if (onLocationsChange) onLocationsChange(list);
      })
      .catch(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // AGR-2-T01: detail may be a structured dict — stringify honestly
        // (the old `new Error(dict)` toasted "[object Object]").
        throw new Error(d.detail?.message || (typeof d.detail === 'string' ? d.detail : 'Failed to create'));
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
        throw new Error(d.detail?.message || (typeof d.detail === 'string' ? d.detail : 'Failed to update'));
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


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        {heading}
        {!showAdd && (
          <button onClick={() => { setShowAdd(true); setEditingId(null); }} className={v2b.ghostOnPaper}>
            + Add Location
          </button>
        )}
      </div>

      {description}

      {toast && (
        <div className={pp.successBlock} style={{ marginBottom: '16px' }}>
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
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'var(--font-sans, system-ui)', color: 'var(--v2-ink-muted, #5c5851)' }}>Loading...</div>
      ) : items.length === 0 && !showAdd ? (
        <div className={pp.card} style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--v2-ink-muted, #5c5851)', marginBottom: '16px' }}>
            No locations yet. Add your first location to start placing orders.
          </p>
          <button onClick={() => setShowAdd(true)} className={v2b.ghostOnPaper}>
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
                  port_code: loc.port_code || '',
                }}
                onSubmit={form => handleUpdate(loc.id, form)}
                onCancel={() => setEditingId(null)}
                submitting={submitting}
              />
            ) : (
              <div key={loc.id} className={pp.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '16px', fontWeight: 700, color: 'var(--v2-ink, #050607)' }}>
                    {loc.label || loc.name}
                  </span>
                  {loc.is_default && (
                    <Badge label="Default" />
                  )}
                  {loc.deactivated_at && (
                    <Badge label="Inactive" variant={pp.chipSoft} />
                  )}
                  <Badge label={loc.location_type || 'business'} />
                  <Badge label={loc.usage_role || 'delivery'} />
                </div>
                <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink, #050607)', marginBottom: '4px' }}>
                  {[loc.address, loc.city, `${loc.state} ${loc.zip_code}`].filter(Boolean).join(', ')}
                </div>
                {(loc.contact_name || loc.contact_phone) && (
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginBottom: '4px' }}>
                    {[loc.contact_name, loc.contact_phone].filter(Boolean).join(' - ')}
                  </div>
                )}
                {loc.business_hours && (
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginBottom: '4px' }}>
                    Hours: {loc.business_hours}
                  </div>
                )}
                {/* EXP2-T03: departure port (drives Y7's landed-cost ranking). */}
                {loc.port_code && (
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginBottom: '4px' }}>
                    Port: {loc.port_code.replace(/_/g, ' ')}
                  </div>
                )}
                {/* EXP-B5: appointment policy is Y7-confirmed; shown read-only. */}
                <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', marginBottom: '4px', color: loc.appointment_required ? 'var(--v2-ink, #050607)' : 'var(--v2-ink-muted, #5c5851)' }}>
                  Appointment: {loc.appointment_required ? 'Required' : 'Not required'}
                  {loc.appointment_required && loc.appointment_instructions ? ` — ${loc.appointment_instructions}` : ''}
                </div>
                {loc.delivery_instructions && (
                  <div style={{
                    fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)',
                    marginBottom: '4px', overflow: 'hidden',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}>
                    {loc.delivery_instructions}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                  <button onClick={() => { setEditingId(loc.id); setShowAdd(false); }} className={v2b.ghostOnPaper}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(loc)} className={v2b.ghostOnPaper} style={{ border: '1px solid rgba(215, 15, 36, 0.35)', color: 'var(--v2-red-deep, #a90918)' }}>
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </>
  );
}

// The /portal/locations page — a thin wrapper around LocationsManager
// (EXP2-T02 extraction; behavior identical to the pre-refactor page).
export default function Locations() {
  return (
    <div className={`${pp.shell} ${pp.measureMid}`}>
      <Link to="/portal/dashboard" className={pp.backLink}>
        &larr; Back to Dashboard
      </Link>
      <LocationsManager
        heading={(
          <h1 className={pp.pageTitle} style={{ margin: 0 }}>
            Saved Locations
          </h1>
        )}
        description={(
          <p className={pp.pageSub} style={{ marginBottom: '24px' }}>
            Register every warehouse you deliver to. Y7 routes each shipment to the most
            cost-effective one — we&rsquo;ll confirm hours and appointment details with you.
          </p>
        )}
      />
    </div>
  );
}
