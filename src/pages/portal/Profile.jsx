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

// NEX-1: email order-intake senders — the cabinet-side view of the addresses
// ACC-1-T06: who can sign in to this account. Three partners can share one
// account and none of them could see the others — this is the read view.
// Read-only BY DECISION: all members are equal (no roles), so self-service
// revoke would let any member — including a just-invited one — lock out
// everyone else. Adding/removing people stays with Y7 until roles exist.
function AccountMembersSection() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    portalFetch('/api/portal/data/members')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (alive) setData(d); })
      .catch(() => { if (alive) setData(null); });
    return () => { alive = false; };
  }, []);
  if (!data || !Array.isArray(data.members) || data.members.length === 0) return null;

  const sans = { fontFamily: 'var(--font-sans, system-ui)' };
  const fmt = (v) => (v ? new Date(v).toLocaleDateString() : null);
  return (
    <div style={{ paddingTop: '12px', borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
      <div className={pp.label} style={{ marginBottom: 4 }}>Account Members</div>
      <p style={{ ...sans, fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)', margin: '0 0 8px', lineHeight: 1.5 }}>
        People who can sign in to this account. To add or remove someone,
        contact dispatch@y7agency.com.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.members.map(m => (
          <div key={m.email} style={{ ...sans, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', color: 'var(--v2-ink, #050607)' }}>{m.email}</span>
            <span style={{
              padding: '1px 8px', borderRadius: 8, fontSize: 10, fontWeight: 600,
              background: m.state === 'active' ? 'rgba(22,101,52,0.12)' : 'rgba(5,6,7,0.08)',
              color: m.state === 'active' ? '#166534' : 'var(--v2-ink-muted, #5c5851)',
            }}>{m.state === 'active' ? 'ACTIVE' : 'INVITED'}</span>
            {m.last_login_at && (
              <span style={{ fontSize: 11, color: 'var(--v2-ink-muted, #5c5851)' }}>
                last sign-in {fmt(m.last_login_at)}
              </span>
            )}
            {m.pending_invite_expires_at && (
              <span style={{ fontSize: 11, color: '#92400E' }}>
                invite valid to {fmt(m.pending_invite_expires_at)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// this account may email orders from. Adding is a REQUEST (admin approves and
// then enables order intake per address); rows show whether intake is live.
function IntakeSendersSection() {
  const [data, setData] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(null);

  const reload = () => {
    portalFetch('/api/portal/data/senders')
      .then(r => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => setData(null));
  };
  useEffect(() => { reload(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data) return null;

  const request = async () => {
    const email = newEmail.trim().toLowerCase();
    if (!email) return;
    setBusy(true); setNote(null);
    try {
      const r = await portalFetch('/api/portal/data/senders/request', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      const body = await r.json().catch(() => ({}));
      if (r.ok) {
        setNewEmail('');
        setNote({ ok: true, text: 'Request sent — our team will review and enable it.' });
        reload();
      } else {
        setNote({ ok: false, text: body?.detail || 'Request failed' });
      }
    } catch {
      setNote({ ok: false, text: 'Network error' });
    } finally {
      setBusy(false);
    }
  };

  const sans = { fontFamily: 'var(--font-sans, system-ui)' };
  return (
    <div style={{ paddingTop: '12px', borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
      <div className={pp.label} style={{ marginBottom: 4 }}>Email Order Senders</div>
      <p style={{ ...sans, fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)', margin: '0 0 8px', lineHeight: 1.5 }}>
        Orders emailed to Y7 from these addresses land in your account.
        New addresses are reviewed and enabled by our team.
      </p>
      {(data.senders || []).length === 0 && (data.pending_requests || []).length === 0 && (
        <div style={{ ...sans, fontSize: 13, color: 'var(--v2-ink-muted, #5c5851)', marginBottom: 6 }}>
          No registered sender addresses yet.
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {(data.senders || []).map(s => (
          <div key={s.id} style={{ ...sans, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ fontFamily: 'monospace', color: 'var(--v2-ink, #050607)' }}>{s.email}</span>
            <span className={pp.chipInk} style={{
              background: s.order_intake_enabled ? '#DCFCE7' : undefined,
              color: s.order_intake_enabled ? '#166534' : undefined,
            }}>
              {s.order_intake_enabled ? 'ORDERS ON' : 'PENDING ACTIVATION'}
            </span>
          </div>
        ))}
        {(data.pending_requests || []).map(r => (
          <div key={`req-${r.id}`} style={{ ...sans, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ fontFamily: 'monospace', color: 'var(--v2-ink-muted, #5c5851)' }}>{r.email}</span>
            <span style={{ ...sans, fontSize: 11, color: 'var(--v2-ink-muted, #5c5851)' }}>requested — awaiting review</span>
          </div>
        ))}
      </div>
      {note && (
        <div style={{ ...sans, fontSize: 12, marginTop: 8, color: note.ok ? '#166534' : 'var(--v2-red-deep, #a90918)' }}>
          {note.text}
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <input
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') request(); }}
          placeholder="orders@yourcompany.com"
          style={{
            ...sans, flex: 1, padding: '8px 10px', fontSize: 13,
            border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.3))', borderRadius: 6,
            background: 'var(--v2-card-cream, #fffaf1)', color: 'var(--v2-ink, #050607)',
          }}
        />
        <button
          onClick={request}
          disabled={busy || !newEmail.trim()}
          style={{
            ...sans, padding: '8px 14px', fontSize: 12, fontWeight: 600, borderRadius: 6,
            border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
            background: 'none', color: 'var(--v2-ink, #050607)',
            cursor: busy || !newEmail.trim() ? 'not-allowed' : 'pointer',
            opacity: busy || !newEmail.trim() ? 0.5 : 1,
          }}
        >
          Request address
        </button>
      </div>
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
      // ACC-1-T06: company_name is NOT sent — it is read-only for the account
      // holder (it feeds verification, agreements, and invoicing; renaming is
      // an admin act). The old form sent it, the server silently dropped it,
      // and the toast still said "saved". notification_email is new here — the
      // backend always accepted it; only the web cabinet never offered it.
      const res = await portalFetch('/api/portal/data/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          contact_name: profile.contact_name,
          phone: profile.phone,
          notification_email: profile.notification_email,
          delivery_address: profile.delivery_address,
          delivery_city: profile.delivery_city,
          delivery_state: profile.delivery_state,
          delivery_zip: profile.delivery_zip,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        // The server names what it applied/ignored — only claim what happened.
        if (Array.isArray(data.ignored) && data.ignored.length > 0) {
          setMessage({
            type: 'error',
            text: `Some fields could not be saved: ${data.ignored.join(', ')}. Everything else was saved.`,
          });
        } else {
          setMessage({ type: 'success', text: 'Profile saved successfully.' });
        }
        checkAuth();
      } else {
        const d = data.detail;
        setMessage({ type: 'error', text: (d && (d.message || d)) || 'Failed to save.' });
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
          {/* ACC-1-T06: read-only — this field used to LOOK editable while the
              server silently dropped every change to it. Company identity is
              verified; changing it goes through Y7. */}
          <input value={profile.company_name || ''} disabled className={pp.input} />
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-60, rgba(5,6,7,0.6))', marginTop: 4 }}>
            Company name is verified by Y7 — contact dispatch@y7agency.com to change it.
          </div>
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
        <div>
          <label className={pp.label}>Notification Email</label>
          {/* ACC-1-T06: this drives real delivery routing (order notifications
              prefer it over the account email) and was editable only from the
              Telegram mini-app before. */}
          <input
            value={profile.notification_email || ''}
            onChange={e => set('notification_email', e.target.value)}
            placeholder={profile.email || 'alerts@company.com'}
            className={pp.input}
          />
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-60, rgba(5,6,7,0.6))', marginTop: 4 }}>
            Order notifications are delivered here. Leave empty to use your account email.
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
            {/* Transport agreement.
                ACC-1-T01: an unsigned EXPORTER has nothing to sign — the
                exporter document is with counsel and the backend refuses the
                individual contract (409 agreement_being_prepared). Show the
                honest waiting state instead of a Sign button that would have
                led to the wrong document. */}
            {user?.customer_type === 'exporter' && !user?.agreement_signed ? (
              <div
                className={pp.warningBlock || pp.errorBlock}
                style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>
                    Exporter Transport Agreement
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-60, rgba(5,6,7,0.6))' }}>
                    Being prepared with our legal team — nothing to sign yet. It becomes
                    available here automatically once approved.
                  </div>
                </div>
                {/* AGR-2-T03: distinguish the two situations. Data incomplete →
                    name the fields (contact details are theirs; company/billing
                    is collected by Y7). Data complete → say so, no checklist
                    implying they are at fault. */}
                {(user?.agreement_missing_fields || []).length > 0 ? (
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-60, rgba(5,6,7,0.6))' }}>
                    So it&rsquo;s ready to sign the moment it arrives, the profile still
                    needs: {user.agreement_missing_fields.map((m) => m.label.toLowerCase()).join(', ')}.
                    {user.agreement_missing_fields.some((m) => ['contact_name', 'phone', 'email'].includes(m.field))
                      ? ' Contact details you can update right here.'
                      : ''}
                    {user.agreement_missing_fields.some((m) => !['contact_name', 'phone', 'email'].includes(m.field))
                      ? ' Company details will be collected by Y7 while completing onboarding.'
                      : ''}
                  </div>
                ) : (
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: '#0F6E56' }}>
                    Your details are complete — nothing is required from you right now.
                    Meanwhile you can send orders by email, review your profile, and add
                    warehouses under Locations.
                  </div>
                )}
              </div>
            ) : (
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
            )}

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

        {/* NEX-1: email order-intake senders (dealer/exporter only — matches
            the admin-side SendersPanel gating in OverviewTab) */}
        {['dealer', 'exporter'].includes(user?.customer_type) && (
          <IntakeSendersSection />
        )}

        {/* ACC-1-T06: who has access to this account — every type */}
        {user?.customer_type && (
          <AccountMembersSection />
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
