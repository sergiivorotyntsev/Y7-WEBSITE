import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button } from '../../theme';
import { API_URL } from '../../config';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

export default function DispatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [gatePassFile, setGatePassFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);

  const [form, setForm] = useState({
    pickup_full_address: '',
    pickup_city: '',
    pickup_state: '',
    pickup_zip: '',
    pickup_contact_name: '',
    pickup_contact_phone: '',
    pickup_business_hours: '',
    gate_pass: '',
    delivery_contact_name: '',
    delivery_contact_phone: '',
    special_instructions: '',
  });

  useEffect(() => {
    portalFetch(`/api/portal/data/orders/${id}`)
      .then(r => r.json())
      .then(data => {
        setOrder(data);
        // Pre-fill pickup from order if available
        setForm(f => ({
          ...f,
          pickup_city: data.pickup_city || '',
          pickup_state: data.pickup_state || '',
          pickup_zip: data.pickup_zip || '',
          pickup_contact_name: data.pickup_contact_name || data.customer_contact_name || '',
          pickup_contact_phone: data.pickup_contact_phone || data.customer_contact_phone || '',
          pickup_business_hours: data.pickup_business_hours || '',
          gate_pass: data.gate_pass || '',
          // Pre-fill delivery contacts from customer profile
          delivery_contact_name: data.delivery_contact_name || '',
          delivery_contact_phone: data.delivery_contact_phone || '',
          special_instructions: data.special_instructions || '',
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!form.pickup_contact_name.trim()) { setError('Pickup contact name is required'); return; }
    if (!form.pickup_contact_phone.trim()) { setError('Pickup contact phone is required'); return; }
    if (!form.pickup_business_hours.trim()) { setError('Pickup business hours are required'); return; }
    if (!form.pickup_city.trim() && !form.pickup_zip.trim()) { setError('Pickup city or ZIP is required'); return; }

    setSaving(true);
    try {
      const res = await portalFetch(`/api/portal/data/orders/${id}/dispatch-info`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickup_full_address: form.pickup_full_address || null,
          pickup_city: form.pickup_city || null,
          pickup_state: form.pickup_state || null,
          pickup_zip: form.pickup_zip || null,
          pickup_contact_name: form.pickup_contact_name,
          pickup_contact_phone: form.pickup_contact_phone,
          pickup_business_hours: form.pickup_business_hours,
          gate_pass: form.gate_pass || null,
          delivery_contact_name: form.delivery_contact_name || null,
          delivery_contact_phone: form.delivery_contact_phone || null,
          special_instructions: form.special_instructions || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Failed to save');
      }
      setSuccess(true);
      setTimeout(() => navigate(`/portal/order/${id}?dispatch_saved=1`), 1500);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Loading...</div>;
  }
  if (!order) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Order not found.</div>;
  }

  if (success) {
    return (
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{'\u2705'}</div>
        <h2 style={{ fontFamily: fonts.serif, fontSize: '22px', color: colors.text, marginBottom: '8px' }}>Dispatch Details Saved</h2>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>Your dispatcher will begin arranging transport shortly.</p>
      </div>
    );
  }

  const vehicle = [order.vehicle_year, order.vehicle_make, order.vehicle_model].filter(Boolean).join(' ') || 'Your Vehicle';
  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${colors.borderInput}`,
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: fonts.sans,
    boxSizing: 'border-box',
    background: colors.bgInput,
    color: colors.text,
  };
  const labelStyle = {
    display: 'block',
    fontFamily: fonts.sans,
    fontSize: '12px',
    fontWeight: 600,
    color: colors.textMuted,
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  };
  const rowStyle = { marginBottom: '14px' };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link to={`/portal/order/${id}`} style={{
        fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
        display: 'inline-block', marginBottom: '20px', textDecoration: 'none',
      }}>
        &larr; Back to Order
      </Link>

      <h1 style={{ fontFamily: fonts.serif, fontSize: '22px', fontWeight: 700, color: colors.text, marginBottom: '4px' }}>
        Dispatch Details
      </h1>
      <p style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, marginBottom: '28px' }}>
        {vehicle} &mdash; provide pickup information so we can dispatch a carrier.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Pickup Address Section */}
        <div style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px',
          padding: '20px', marginBottom: '16px',
        }}>
          <div style={{ fontFamily: fonts.sans, fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
            Pickup Location
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Street Address</label>
            <input style={inputStyle} value={form.pickup_full_address} onChange={set('pickup_full_address')} placeholder="123 Main St" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', gap: '10px', ...rowStyle }}>
            <div>
              <label style={labelStyle}>City *</label>
              <input style={inputStyle} value={form.pickup_city} onChange={set('pickup_city')} placeholder="Houston" />
            </div>
            <div>
              <label style={labelStyle}>State</label>
              <select style={{ ...inputStyle, background: colors.bgInput }} value={form.pickup_state} onChange={set('pickup_state')}>
                <option value="">--</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>ZIP</label>
              <input style={inputStyle} value={form.pickup_zip} onChange={set('pickup_zip')} placeholder="77001" maxLength={5} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', ...rowStyle }}>
            <div>
              <label style={labelStyle}>Contact Name *</label>
              <input style={inputStyle} value={form.pickup_contact_name} onChange={set('pickup_contact_name')} placeholder="John Smith" />
            </div>
            <div>
              <label style={labelStyle}>Contact Phone *</label>
              <input style={inputStyle} value={form.pickup_contact_phone} onChange={set('pickup_contact_phone')} placeholder="(555) 123-4567" />
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Business Hours *</label>
            <input style={inputStyle} value={form.pickup_business_hours} onChange={set('pickup_business_hours')} placeholder="Mon-Fri 8am-5pm" />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Gate Pass Number</label>
            <input style={inputStyle} value={form.gate_pass} onChange={set('gate_pass')} placeholder="If picking up from auction, enter gate pass #" />
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Gate Pass File (PDF or Photo)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => { setGatePassFile(e.target.files[0]); setUploadDone(false); }}
              style={{ ...inputStyle, padding: '8px 12px' }}
            />
            {gatePassFile && !uploadDone && (
              <button
                type="button"
                onClick={async () => {
                  setUploading(true);
                  try {
                    const fd = new FormData();
                    fd.append('file', gatePassFile);
                    // Raw fetch — portalFetch always sets Content-Type: application/json which breaks FormData
                    const r = await fetch(`${API_URL}/api/portal/data/orders/${id}/gate-pass`, {
                      method: 'POST',
                      credentials: 'include',
                      body: fd,
                    });
                    if (r.ok) { setUploadDone(true); setGatePassFile(null); }
                    else { const e = await r.json().catch(() => ({})); setError(e.detail || 'Upload failed'); }
                  } catch { setError('Upload failed'); }
                  setUploading(false);
                }}
                disabled={uploading}
                style={{
                  marginTop: '8px', padding: '8px 18px',
                  background: colors.accent, color: '#fff',
                  border: 'none', borderRadius: '20px',
                  fontSize: '12px', fontWeight: 600, cursor: uploading ? 'not-allowed' : 'pointer',
                  fontFamily: fonts.sans, textTransform: 'uppercase', letterSpacing: '0.5px',
                  opacity: uploading ? 0.7 : 1,
                }}
              >
                {uploading ? 'Uploading...' : 'Upload Gate Pass'}
              </button>
            )}
            {uploadDone && (
              <div style={{ marginTop: '6px', fontSize: '13px', color: colors.success, fontFamily: fonts.sans }}>
                {'\u2705'} Gate pass uploaded
              </div>
            )}
          </div>
        </div>

        {/* Delivery Contact Section */}
        <div style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px',
          padding: '20px', marginBottom: '16px',
        }}>
          <div style={{ fontFamily: fonts.sans, fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
            Delivery Contact
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', ...rowStyle }}>
            <div>
              <label style={labelStyle}>Contact Name</label>
              <input style={inputStyle} value={form.delivery_contact_name} onChange={set('delivery_contact_name')} placeholder="Receiving person" />
            </div>
            <div>
              <label style={labelStyle}>Contact Phone</label>
              <input style={inputStyle} value={form.delivery_contact_phone} onChange={set('delivery_contact_phone')} placeholder="(555) 987-6543" />
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px',
          padding: '20px', marginBottom: '24px',
        }}>
          <div style={{ fontFamily: fonts.sans, fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
            Special Instructions
          </div>
          <textarea
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            value={form.special_instructions}
            onChange={set('special_instructions')}
            placeholder="Any additional notes for the carrier (e.g. low clearance, appointment required, etc.)"
          />
        </div>

        {error && (
          <div style={{
            fontFamily: fonts.sans, fontSize: '13px', color: '#c0392b',
            background: '#fdecea', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={saving} style={{
          ...button.accent,
          width: '100%',
          padding: '14px',
          fontSize: '14px',
          opacity: saving ? 0.7 : 1,
          cursor: saving ? 'not-allowed' : 'pointer',
        }}>
          {saving ? 'Saving...' : 'Submit Dispatch Details'}
        </button>
      </form>
    </div>
  );
}
