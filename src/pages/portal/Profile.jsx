import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckIcon } from '../../components/icons';
import AccountTypeModal from '../../components/AccountTypeModal';
import Toast from '../../components/Toast';
import OnboardingBanner from '../../components/OnboardingBanner';
import BouncingEmailBanner from '../../components/recovery/BouncingEmailBanner';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors } from '../../theme';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';

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
    <div className={pp.row} style={{ padding: '8px 0' }}>
      <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink-muted, #5c5851)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', fontWeight: 600, color: valueColor || 'var(--v2-ink, #050607)' }}>{value}</span>
    </div>
  );
}

function SavedLocationsPreview() {
  const [locs, setLocs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    portalFetch('/api/portal/locations')
      .then(r => r.ok ? r.json() : { items: [] })
      .then(d => { setLocs(d.items || []); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  const shown = locs.slice(0, 3);
  const extra = locs.length - 3;

  return (
    <div style={{ paddingTop: '12px', borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
      <div className={pp.label} style={{ marginBottom: 8 }}>Saved Locations</div>
      {locs.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink-muted, #5c5851)' }}>No saved locations</span>
          <button onClick={() => navigate('/portal/locations')} style={{
            background: 'none', border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))', borderRadius: 6,
            padding: '6px 12px', fontSize: 12, fontFamily: 'var(--font-sans, system-ui)', color: 'var(--v2-ink, #050607)',
            cursor: 'pointer',
          }}>+ Add Location</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {shown.map(loc => (
            <div key={loc.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans, system-ui)', fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>{loc.label || loc.name}</span>
              {loc.is_default && (
                <span className={pp.chipInk}>DEFAULT</span>
              )}
              <span style={{ color: 'var(--v2-ink-muted, #5c5851)' }}>{loc.city}, {loc.state}</span>
            </div>
          ))}
          {extra > 0 && (
            <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)' }}>and {extra} more</span>
          )}
          <Link to="/portal/locations" style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: 12, color: 'var(--v2-ink, #050607)', textDecoration: 'underline', marginTop: 4 }}>
            Manage all locations &rarr;
          </Link>
        </div>
      )}
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
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [reSignToast, setReSignToast] = useState(null);
  const [smsEnabled, setSmsEnabled] = useState(
    user?.notification_preferences?.sms_enabled ?? false
  );

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
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: 'var(--font-sans, system-ui)', color: 'var(--v2-ink-muted, #5c5851)' }}>Loading...</div>;
  }

  if (!profile) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: 'var(--font-sans, system-ui)', color: 'var(--v2-ink-muted, #5c5851)' }}>Could not load profile.</div>;
  }

  return (
    <div className={pp.shell}>
      <div className={pp.measureNarrow}>
      <BouncingEmailBanner />
      <OnboardingBanner />
      <Link to="/portal/dashboard" className={pp.backLink}>
        &larr; Back to Dashboard
      </Link>

      <h1 className={pp.pageTitle} style={{ marginBottom: 24 }}>
        My Profile
      </h1>

      {message && (
        <div className={message.type === 'success' ? pp.successBlock : pp.errorBlock} style={{ marginBottom: 20 }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className={pp.card} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <div>
          <label className={pp.label}>Company Name</label>
          <input value={profile.company_name || ''} onChange={e => set('company_name', e.target.value)} className={pp.input} />
        </div>
        <div>
          <label className={pp.label}>Full Name</label>
          <input value={profile.contact_name || ''} onChange={e => set('contact_name', e.target.value)} className={pp.input} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label className={pp.label}>Email</label>
            <input value={profile.email || ''} disabled className={pp.input} />
          </div>
          <div>
            <label className={pp.label}>Phone</label>
            <input value={profile.phone || ''} onChange={e => set('phone', e.target.value)} className={pp.input} />
          </div>
        </div>

        <div className={pp.label} style={{ paddingTop: 8, borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
          Default Delivery Address
        </div>
        <div>
          <label className={pp.label}>Street</label>
          <input value={profile.delivery_address || ''} onChange={e => set('delivery_address', e.target.value)} className={pp.input} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label className={pp.label}>City</label>
            <input value={profile.delivery_city || ''} onChange={e => set('delivery_city', e.target.value)} className={pp.input} />
          </div>
          <div>
            <label className={pp.label}>State</label>
            <input value={profile.delivery_state || ''} onChange={e => set('delivery_state', e.target.value)} maxLength={2} className={pp.input} />
          </div>
          <div>
            <label className={pp.label}>ZIP</label>
            <input value={profile.delivery_zip || ''} onChange={e => set('delivery_zip', e.target.value)} className={pp.input} />
          </div>
        </div>

        {/* Account Status */}
        <div style={{ paddingTop: '12px', borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
          <div className={pp.label} style={{ marginBottom: 8 }}>Account Status</div>
          <StatusRow label="Account Type" value={TYPE_LABELS[user?.customer_type] || 'Unknown'} />
          {user?.customer_type === 'dealer' && (
            <StatusRow label="Billing Mode" value={BILLING_LABELS[user?.billing_mode] || user?.billing_mode} />
          )}
          {user?.customer_type === 'dealer' && user?.billing_mode === 'prepay_manual_invoice' && (
            <StatusRow
              label="Deposit Balance"
              value={`$${((user?.deposit_balance_cents || 0) / 100).toFixed(2)}`}
              valueColor={(user?.deposit_balance_cents || 0) < 0 ? 'var(--v2-red-deep, #a90918)' : colors.success}
            />
          )}

          {user?.customer_type && user.customer_type !== 'dealer' && (
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => navigate('/dealer-quote?prefill=1')}
                className={v2b.ghostOnPaper}
                style={{ width: '100%' }}
              >
                Upgrade to Dealer Account
              </button>
              <p style={{
                fontFamily: 'var(--font-sans, system-ui)',
                fontSize: '11px',
                color: 'var(--v2-ink-muted, #5c5851)',
                lineHeight: 1.5,
                margin: 0,
              }}>
                Already running a dealership? Upgrade to access volume pricing, prepay billing, and dedicated dispatch support. We'll need a few business details.
              </p>
            </div>
          )}

          {user?.customer_type && user.customer_type !== 'dealer' && user.customer_type !== 'unknown' && (
            <button
              onClick={() => setShowTypeModal(true)}
              style={{
                marginTop: '8px',
                background: 'none',
                border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '12px',
                fontFamily: 'var(--font-sans, system-ui)',
                color: 'var(--v2-ink-muted, #5c5851)',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Change Account Type
            </button>
          )}
        </div>

        {/* Documents & Agreements */}
        <div style={{ paddingTop: '12px', borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
          <div className={pp.label} style={{ marginBottom: 8 }}>Documents & Agreements</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Transport agreement */}
            <div
              className={user?.agreement_signed ? pp.successBlock : pp.errorBlock}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>
                  {user?.customer_type === 'dealer' ? 'Dealer Transport Agreement' : 'Transport Service Agreement'}
                </div>
                <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: user?.agreement_signed ? colors.success : 'var(--v2-red-deep, #a90918)' }}>
                  {user?.agreement_signed ? 'Signed' : 'Not signed — required to create orders'}
                </div>
              </div>
              {!user?.agreement_signed && (
                <button onClick={() => {
                  const t = user?.customer_type === 'dealer' ? 'dealer' : 'shipper';
                  navigate(`/agreement?customer_id=${user?.id}&type=${t}`);
                }} className={v2b.ghostOnPaper} style={{ minHeight: 0, padding: '6px 14px', fontSize: '11px' }}>Sign</button>
              )}
            </div>

            {/* Bank auth (prepay dealers only) */}
            {user?.customer_type === 'dealer' && user?.billing_mode === 'prepay_manual_invoice' && (
              <div
                className={user?.bank_auth_signed ? pp.successBlock : pp.errorBlock}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>Bank Authorization Agreement</div>
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: user?.bank_auth_signed ? colors.success : 'var(--v2-red-deep, #a90918)' }}>
                    {user?.bank_auth_signed ? 'Signed' : 'Not signed — required for prepay billing'}
                  </div>
                </div>
                {!user?.bank_auth_signed && (
                  <button onClick={() => navigate(`/agreement?customer_id=${user?.id}&type=bank_auth`)} className={v2b.ghostOnPaper} style={{ minHeight: 0, padding: '6px 14px', fontSize: '11px' }}>Sign</button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Saved Locations (dealer/exporter/auction_buyer only) */}
        {['dealer', 'exporter', 'auction_buyer'].includes(user?.customer_type) && (
          <SavedLocationsPreview />
        )}

        {/* Connected accounts */}
        <div style={{ paddingTop: '12px', borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
          <div className={pp.label} style={{ marginBottom: 8 }}>Connected Accounts</div>
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink-muted, #5c5851)' }}>
            {profile.telegram_username ? (
              <span>Telegram: <strong style={{ color: colors.success }}>@{profile.telegram_username} <CheckIcon size={14} /></strong></span>
            ) : (
              <span>
                Telegram: Not connected.{' '}
                <a href="https://t.me/y7dispatch_bot" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--v2-ink, #050607)', textDecoration: 'underline' }}>Connect &rarr;</a>
              </span>
            )}
          </div>
        </div>

        {/* Text message notifications */}
        <div style={{ paddingTop: '12px', borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
          <div className={pp.label} style={{ marginBottom: 8 }}>Text Message Notifications</div>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px',
            color: 'var(--v2-ink, #050607)',
          }}>
            <input
              type="checkbox"
              checked={smsEnabled}
              onChange={async (e) => {
                const newVal = e.target.checked;
                setSmsEnabled(newVal);
                try {
                  const res = await portalFetch('/api/portal/data/notification-preferences', {
                    method: 'PUT',
                    body: JSON.stringify({ sms_enabled: newVal }),
                  });
                  if (res.ok) {
                    setMessage({ type: 'success', text: newVal ? 'SMS notifications enabled' : 'SMS notifications disabled' });
                    checkAuth();
                  } else {
                    setSmsEnabled(!newVal);
                    setMessage({ type: 'error', text: 'Failed to update preference' });
                  }
                } catch {
                  setSmsEnabled(!newVal);
                  setMessage({ type: 'error', text: 'Network error' });
                }
              }}
              style={{ width: 18, height: 18, flexShrink: 0, accentColor: 'var(--v2-red, #d70f24)' }}
            />
            Get text updates when carrier is assigned
          </label>
          {smsEnabled && (
            <div style={{
              fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)',
              marginTop: '6px', paddingLeft: '26px', lineHeight: 1.5,
            }}>
              Reply STOP to any Y7 message to opt out at any time. Msg &amp; data rates may apply.
            </div>
          )}
        </div>

        <button type="submit" disabled={saving} className={v2b.cta} style={{
          width: '100%',
          opacity: saving ? 0.6 : 1,
          marginTop: '8px',
        }}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      {showTypeModal && (
        <AccountTypeModal
          mode="edit"
          currentType={user?.customer_type}
          onClose={() => setShowTypeModal(false)}
          onComplete={() => {
            setShowTypeModal(false);
            checkAuth();
            // Server clears agreement_signed on any type change (portal_data.py
            // set_customer_type). Surface a floating toast so the user notices
            // the re-sign requirement even if they scroll past the inline banner.
            setReSignToast('Account type updated. Please sign the new agreement for your updated account type.');
          }}
        />
      )}

      {reSignToast && (
        <Toast
          message={reSignToast}
          type="accent"
          duration={6000}
          onDismiss={() => setReSignToast(null)}
        />
      )}
      </div>
    </div>
  );
}
