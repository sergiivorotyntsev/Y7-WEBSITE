import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckIcon } from '../../components/icons';
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

const TYPE_LABELS = {
  dealer: 'Dealer',
  individual: 'Individual',
  auction_buyer: 'Auction Buyer',
  exporter: 'Exporter',
  unknown: 'Not Classified',
};

const BILLING_LABELS = {
  per_delivery: 'Pay Per Delivery (COD)',
  prepay_manual_invoice: 'Prepay (Manual Invoice)',
};

function StatusRow({ label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.border}` }}>
      <span style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted }}>{label}</span>
      <span style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600, color: valueColor || colors.text }}>{value}</span>
    </div>
  );
}

export default function Profile() {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    portalFetch('/api/portal/data/profile')
      .then(r => r.json())
      .then(data => { setProfile(data); setLoading(false); })
      .catch(() => { setMessage({ type: 'error', text: 'Failed to load profile. Please try refreshing the page.' }); setLoading(false); });
  }, []);

  function set(field, value) {
    setProfile(prev => ({ ...prev, [field]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await portalFetch('/api/portal/data/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          company_name: profile.company_name,
          contact_name: profile.contact_name,
          phone: profile.phone,
          delivery_address: profile.delivery_address,
          delivery_city: profile.delivery_city,
          delivery_state: profile.delivery_state,
          delivery_zip: profile.delivery_zip,
        }),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile saved successfully.' });
        checkAuth();
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.detail || 'Failed to save.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Loading...</div>;
  }

  if (!profile) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Could not load profile.</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link to="/portal/dashboard" style={{
        fontFamily: fonts.sans,
        fontSize: '13px',
        color: colors.accent,
        display: 'inline-block',
        marginBottom: '20px',
      }}>
        &larr; Back to Dashboard
      </Link>

      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: '28px',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '24px',
      }}>
        My Profile
      </h1>

      {message && (
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: message.type === 'success' ? colors.success : colors.accent,
          padding: '10px 14px',
          background: message.type === 'success' ? colors.successBg : '#FFF0EC',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '16px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <div>
          <label style={labelStyle}>Company Name</label>
          <input value={profile.company_name || ''} onChange={e => set('company_name', e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input value={profile.contact_name || ''} onChange={e => set('contact_name', e.target.value)} style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input value={profile.email || ''} disabled style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input value={profile.phone || ''} onChange={e => set('phone', e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{
          fontFamily: fonts.sans,
          fontSize: '12px',
          fontWeight: 600,
          color: colors.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          paddingTop: '8px',
          borderTop: `1px solid ${colors.border}`,
        }}>
          Default Delivery Address
        </div>
        <div>
          <label style={labelStyle}>Street</label>
          <input value={profile.delivery_address || ''} onChange={e => set('delivery_address', e.target.value)} style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>City</label>
            <input value={profile.delivery_city || ''} onChange={e => set('delivery_city', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>State</label>
            <input value={profile.delivery_state || ''} onChange={e => set('delivery_state', e.target.value)} maxLength={2} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>ZIP</label>
            <input value={profile.delivery_zip || ''} onChange={e => set('delivery_zip', e.target.value)} style={inputStyle} />
          </div>
        </div>

        {/* Account Status */}
        <div style={{ paddingTop: '12px', borderTop: `1px solid ${colors.border}` }}>
          <div style={{ ...labelStyle, marginBottom: '8px' }}>Account Status</div>
          <StatusRow label="Account Type" value={TYPE_LABELS[user?.customer_type] || 'Unknown'} />
          {user?.customer_type === 'dealer' && (
            <StatusRow label="Billing Mode" value={BILLING_LABELS[user?.billing_mode] || user?.billing_mode} />
          )}
          {user?.customer_type === 'dealer' && user?.billing_mode === 'prepay_manual_invoice' && (
            <StatusRow
              label="Deposit Balance"
              value={`$${((user?.deposit_balance_cents || 0) / 100).toFixed(2)}`}
              valueColor={(user?.deposit_balance_cents || 0) < 0 ? '#DC2626' : colors.success}
            />
          )}
        </div>

        {/* Documents & Agreements */}
        <div style={{ paddingTop: '12px', borderTop: `1px solid ${colors.border}` }}>
          <div style={{ ...labelStyle, marginBottom: '8px' }}>Documents & Agreements</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Transport agreement */}
            <div style={{
              padding: '12px', borderRadius: '8px',
              background: user?.agreement_signed ? colors.successBg : '#FFF0EC',
              border: `1px solid ${user?.agreement_signed ? '#A7D6BE' : '#FFD0C2'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
            }}>
              <div>
                <div style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600, color: colors.text }}>
                  {user?.customer_type === 'dealer' ? 'Dealer Transport Agreement' : 'Transport Service Agreement'}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: '11px', color: user?.agreement_signed ? colors.success : colors.accent }}>
                  {user?.agreement_signed ? 'Signed' : 'Not signed — required to create orders'}
                </div>
              </div>
              {!user?.agreement_signed && (
                <button onClick={() => {
                  const t = user?.customer_type === 'dealer' ? 'dealer' : 'shipper';
                  navigate(`/agreement?customer_id=${user?.id}&type=${t}`);
                }} style={{ ...btnStyles.accent, padding: '6px 14px', fontSize: '11px' }}>Sign</button>
              )}
            </div>

            {/* Bank auth (prepay dealers only) */}
            {user?.customer_type === 'dealer' && user?.billing_mode === 'prepay_manual_invoice' && (
              <div style={{
                padding: '12px', borderRadius: '8px',
                background: user?.bank_auth_signed ? colors.successBg : '#FFF0EC',
                border: `1px solid ${user?.bank_auth_signed ? '#A7D6BE' : '#FFD0C2'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
              }}>
                <div>
                  <div style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600, color: colors.text }}>Bank Authorization Agreement</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: '11px', color: user?.bank_auth_signed ? colors.success : colors.accent }}>
                    {user?.bank_auth_signed ? 'Signed' : 'Not signed — required for prepay billing'}
                  </div>
                </div>
                {!user?.bank_auth_signed && (
                  <button onClick={() => navigate(`/agreement?customer_id=${user?.id}&type=bank_auth`)} style={{ ...btnStyles.accent, padding: '6px 14px', fontSize: '11px' }}>Sign</button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Connected accounts */}
        <div style={{ paddingTop: '12px', borderTop: `1px solid ${colors.border}` }}>
          <div style={{ ...labelStyle, marginBottom: '8px' }}>Connected Accounts</div>
          <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted }}>
            {profile.telegram_username ? (
              <span>Telegram: <strong style={{ color: colors.success }}>@{profile.telegram_username} <CheckIcon size={14} /></strong></span>
            ) : (
              <span>
                Telegram: Not connected.{' '}
                <a href="https://t.me/y7dispatch_bot" target="_blank" rel="noopener noreferrer" style={{ color: colors.accent }}>Connect &rarr;</a>
              </span>
            )}
          </div>
        </div>

        <button type="submit" disabled={saving} style={{
          ...btnStyles.accent,
          width: '100%',
          padding: '14px',
          fontSize: '14px',
          opacity: saving ? 0.6 : 1,
          marginTop: '8px',
        }}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
