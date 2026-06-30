import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckIcon } from '../../components/icons';
import { portalFetch, authHeader, clearSessionOn401 } from '../../hooks/useAuth';
import { colors, fonts, button } from '../../theme';
import { API_URL } from '../../config';
import PhoneInput, { getCleanPhone, isValidPhone } from '../../components/PhoneInput';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

const LOCATION_TYPES = [
  { value: '', label: 'Select...' },
  { value: 'Business', label: 'Business' },
  { value: 'Residence', label: 'Residential' },
  { value: 'Auction', label: 'Auction' },
  { value: 'Dealership', label: 'Dealer' },
  { value: 'Port', label: 'Port' },
  { value: 'Storage Facility', label: 'Storage Facility' },
  { value: 'Other', label: 'Other' },
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
    pickup_location_type: '',
    pickup_contact_name: '',
    pickup_contact_phone: '',
    pickup_business_hours: '',
    gate_pass: '',
    delivery_full_address: '',
    delivery_city: '',
    delivery_state: '',
    delivery_zip: '',
    delivery_location_type: '',
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
          pickup_location_type: data.pickup_location_type || '',
          pickup_contact_name: data.pickup_contact_name || data.customer_contact_name || '',
          pickup_contact_phone: data.pickup_contact_phone || data.customer_contact_phone || '',
          pickup_business_hours: data.pickup_business_hours || '',
          gate_pass: data.gate_pass || '',
          // Pre-fill delivery from order (auto-filled from profile at creation)
          delivery_full_address: data.delivery_address || '',
          delivery_city: data.delivery_city || '',
          delivery_state: data.delivery_state || '',
          delivery_zip: data.delivery_zip || '',
          delivery_location_type: data.delivery_location_type || '',
          delivery_contact_name: data.delivery_contact_name || '',
          delivery_contact_phone: data.delivery_contact_phone || '',
          special_instructions: data.special_instructions || '',
        }));
      })
      .catch(() => setError('Failed to load order details. Please try again.'))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  // CAP-S1-W02: for COD orders the delivery contact (who pays the driver) is required.
  const isCod = order?.service_tier === 'cod';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!form.pickup_contact_name.trim()) { setError('Pickup contact name is required'); return; }
    if (!form.pickup_contact_phone.trim()) { setError('Pickup contact phone is required'); return; }
    if (!isValidPhone(form.pickup_contact_phone)) {
      setError('Please enter a valid 10-digit pickup phone number.'); return;
    }
    // CAP-S1-W02: COD delivery-contact requirement (mirrors backend 422).
    if (isCod && !form.delivery_contact_name.trim()) {
      setError('For COD orders, the delivery contact name is required — this is the person who pays the driver.'); return;
    }
    if (isCod && !form.delivery_contact_phone.trim()) {
      setError('For COD orders, the delivery contact phone is required — this is the person who pays the driver.'); return;
    }
    if (form.delivery_contact_phone && !isValidPhone(form.delivery_contact_phone)) {
      setError('Please enter a valid 10-digit delivery phone number, or leave it blank.'); return;
    }
    // WA-T02 (interim): an "Other" delivery type has no recognised location, so
    // require a street address OR a note in Special Instructions — otherwise it
    // reaches dispatch with nowhere to deliver. Mirrors the Wave-1 server gate;
    // superseded by the saved-locations directory wave.
    if (form.delivery_location_type === 'Other'
        && !form.delivery_full_address.trim()
        && !form.special_instructions.trim()) {
      setError('For an "Other" delivery location, add a street address or a note in Special Instructions so we can route the carrier.');
      return;
    }
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
          pickup_location_type: form.pickup_location_type || null,
          pickup_contact_name: form.pickup_contact_name,
          pickup_contact_phone: getCleanPhone(form.pickup_contact_phone),
          pickup_business_hours: form.pickup_business_hours,
          gate_pass: form.gate_pass || null,
          delivery_full_address: form.delivery_full_address || null,
          delivery_city: form.delivery_city || null,
          delivery_state: form.delivery_state || null,
          delivery_zip: form.delivery_zip || null,
          delivery_location_type: form.delivery_location_type || null,
          delivery_contact_name: form.delivery_contact_name || null,
          delivery_contact_phone: form.delivery_contact_phone ? getCleanPhone(form.delivery_contact_phone) : null,
          special_instructions: form.special_instructions || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // CAP-S1-W02: the COD 422 returns a structured detail object.
        const d = data?.detail;
        const msg = d && typeof d === 'object' ? (d.message || d.error || 'Failed to save') : (d || 'Failed to save');
        throw new Error(msg);
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
        <div style={{ marginBottom: '16px' }}><CheckIcon size={40} /></div>
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

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', ...rowStyle }}>
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

          <div style={rowStyle}>
            <label style={labelStyle}>Location Type</label>
            <select style={{ ...inputStyle, background: colors.bgInput }} value={form.pickup_location_type} onChange={set('pickup_location_type')}>
              {LOCATION_TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', ...rowStyle }}>
            <div>
              <label style={labelStyle}>Contact Name *</label>
              <input style={inputStyle} value={form.pickup_contact_name} onChange={set('pickup_contact_name')} placeholder="John Smith" />
            </div>
            <div>
              <label style={labelStyle}>Contact Phone *</label>
              <PhoneInput style={inputStyle} value={form.pickup_contact_phone} onChange={v => setForm(f => ({ ...f, pickup_contact_phone: v }))} required />
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
                    // WA-T01: attach the Bearer header (same token as the JSON
                    // requests) so the gate-pass upload authenticates when the
                    // cross-site cookie is blocked (iOS Safari).
                    const r = await fetch(`${API_URL}/api/portal/data/orders/${id}/gate-pass`, {
                      method: 'POST',
                      credentials: 'include',
                      headers: authHeader(),
                      body: fd,
                    });
                    clearSessionOn401(r.status);
                    if (r.ok) { setUploadDone(true); setGatePassFile(null); }
                    else {
                      const e = await r.json().catch(() => ({}));
                      setError(e.detail || (r.status === 401
                        ? 'Your session expired. Please refresh the page and sign in again.'
                        : 'Upload failed'));
                    }
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
                <CheckIcon size={14} /> Gate pass uploaded
              </div>
            )}
          </div>
        </div>

        {/* Delivery Section */}
        <div style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px',
          padding: '20px', marginBottom: '16px',
        }}>
          <div style={{ fontFamily: fonts.sans, fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
            Delivery Location
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Street Address</label>
            <input style={inputStyle} value={form.delivery_full_address} onChange={set('delivery_full_address')} placeholder="456 Oak Ave" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', ...rowStyle }}>
            <div>
              <label style={labelStyle}>City</label>
              <input style={inputStyle} value={form.delivery_city} onChange={set('delivery_city')} placeholder="Miami" />
            </div>
            <div>
              <label style={labelStyle}>State</label>
              <select style={{ ...inputStyle, background: colors.bgInput }} value={form.delivery_state} onChange={set('delivery_state')}>
                <option value="">--</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>ZIP</label>
              <input style={inputStyle} value={form.delivery_zip} onChange={set('delivery_zip')} placeholder="33101" maxLength={5} />
            </div>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Location Type</label>
            <select style={{ ...inputStyle, background: colors.bgInput }} value={form.delivery_location_type} onChange={set('delivery_location_type')}>
              {LOCATION_TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', ...rowStyle }}>
            <div>
              <label style={labelStyle}>Contact Name {isCod ? '*' : ''}</label>
              <input style={inputStyle} value={form.delivery_contact_name} onChange={set('delivery_contact_name')} placeholder="Receiving person" />
            </div>
            <div>
              <label style={labelStyle}>Contact Phone {isCod ? '*' : ''}</label>
              <PhoneInput style={inputStyle} value={form.delivery_contact_phone} onChange={v => setForm(f => ({ ...f, delivery_contact_phone: v }))} />
            </div>
          </div>
          {isCod && (
            <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginTop: '6px' }}>
              For COD, this is the person who pays the driver — required.
            </div>
          )}
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
