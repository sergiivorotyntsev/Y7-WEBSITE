import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { portalFetch, useAuth } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles } from '../../theme';
import VerificationBanner from '../../components/VerificationBanner';

// AQ-4 (collection) + AQ-6 (reflection): the single dealer/exporter activation
// application surface. Shows the applicant where they stand (pending_review /
// needs_details with the admin's note / verified / rejected) and lets them
// submit or resubmit the required info, which feeds the SAME dealer_applications
// row the admin review queue reads.

const inputStyle = {
  fontFamily: fonts.sans, fontSize: '16px', padding: '10px 14px', borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`, background: colors.bgInput, color: colors.text,
  outline: 'none', width: '100%', boxSizing: 'border-box',
};
const labelStyle = {
  fontFamily: fonts.sans, fontSize: '12px', fontWeight: 600, color: colors.text,
  textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px',
};

const FIELDS = [
  { key: 'company_name', label: 'Company name', required: true },
  { key: 'contact_name', label: 'Contact name', required: true },
  { key: 'phone', label: 'Phone', required: true },
  { key: 'monthly_volume', label: 'Monthly volume (vehicles)', required: true },
  { key: 'mc_number', label: 'MC number' },
  { key: 'dot_number', label: 'DOT number' },
  { key: 'dealer_license', label: 'Dealer license #' },
  { key: 'primary_routes', label: 'Primary routes' },
  { key: 'address', label: 'Address' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'zip_code', label: 'ZIP' },
];

const EMPTY = FIELDS.reduce((a, f) => ({ ...a, [f.key]: '' }), {});

export default function DealerApplication() {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await portalFetch('/api/portal/data/dealer-application');
      if (!res.ok) throw new Error('Could not load your application.');
      const json = await res.json();
      setData(json);
      const app = json.application || {};
      setForm({ ...EMPTY, ...Object.fromEntries(FIELDS.map(f => [f.key, app[f.key] || ''])) });
    } catch (err) {
      setError(err.message || 'Could not load your application.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function set(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  const missingRequired = FIELDS.filter(f => f.required && !String(form[f.key] || '').trim());
  const hasIdentifier = ['mc_number', 'dot_number', 'dealer_license'].some(k => String(form[k] || '').trim());
  const canSubmit = missingRequired.length === 0 && hasIdentifier && !saving;

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSaving(true); setError(null);
    try {
      const res = await portalFetch('/api/portal/data/dealer-application', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(FIELDS.map(f => [f.key, String(form[f.key] || '').trim() || null]))),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        const msg = e.detail?.message || e.detail || 'Submission failed.';
        throw new Error(typeof msg === 'string' ? msg : 'Submission failed.');
      }
      if (checkAuth) await checkAuth();
      await load();
    } catch (err) {
      setError(err.message || 'Submission failed.');
    } finally {
      setSaving(false);
    }
  }

  const wrap = { maxWidth: '760px', margin: '0 auto', padding: '40px 24px 80px' };

  if (loading) {
    return <div style={wrap}><p style={{ fontFamily: fonts.sans, color: colors.textMuted }}>Loading…</p></div>;
  }

  if (data && !data.is_dealer_or_exporter) {
    return (
      <div style={wrap}>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 26, color: colors.text }}>Dealer / Exporter application</h1>
        <p style={{ fontFamily: fonts.sans, color: colors.textMuted }}>
          This page is for dealer and exporter accounts. <Link to="/portal/dashboard" style={{ color: colors.accent }}>Back to dashboard</Link>.
        </p>
      </div>
    );
  }

  const status = data?.company_verification_status;
  const verified = status === 'verified';

  return (
    <div style={wrap}>
      <h1 style={{ fontFamily: fonts.serif, fontSize: 26, color: colors.text, marginBottom: 6 }}>
        Your activation application
      </h1>
      <p style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted, marginTop: 0, marginBottom: 20 }}>
        We review every dealer / exporter and set up a short call before activating direct orders + billing.
      </p>

      <VerificationBanner />

      {verified ? (
        <div style={{ background: colors.successBg, borderRadius: 10, padding: 20, marginTop: 12 }}>
          <p style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.text, margin: 0 }}>
            Your account is <strong>active</strong>. You can submit orders directly.
          </p>
          <button onClick={() => navigate('/portal/new-order')} style={{ ...btnStyles.primary, marginTop: 14 }}>
            Submit an order
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {error && (
            <div style={{ background: '#FDECEA', color: '#B91C1C', padding: 12, borderRadius: 8, fontFamily: fonts.sans, fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {FIELDS.map(f => (
              <div key={f.key} style={{ gridColumn: ['primary_routes', 'address'].includes(f.key) ? '1 / -1' : 'auto' }}>
                <label style={labelStyle}>{f.label}{f.required ? ' *' : ''}</label>
                <input
                  style={inputStyle}
                  value={form[f.key]}
                  onChange={e => set(f.key, e.target.value)}
                  placeholder={f.label}
                />
              </div>
            ))}
          </div>

          <p style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 12 }}>
            Provide at least one of MC number, DOT number, or dealer license so we can verify your business.
          </p>

          <button
            type="submit"
            disabled={!canSubmit}
            style={{ ...btnStyles.primary, marginTop: 12, opacity: canSubmit ? 1 : 0.5, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
          >
            {saving ? 'Submitting…' : status === 'needs_details' ? 'Resubmit application' : 'Submit application'}
          </button>
          {!hasIdentifier && (
            <span style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginLeft: 12 }}>
              Add an MC#, DOT#, or dealer license to submit.
            </span>
          )}
        </form>
      )}
    </div>
  );
}
