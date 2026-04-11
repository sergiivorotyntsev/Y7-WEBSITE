import { useState } from 'react';
import { colors, fonts } from '../theme';
import { VerifiedIcon, InsuranceIcon, DocumentIcon, BellIcon, HeadphonesIcon, EscalationIcon, ShieldIcon } from './icons';

const ITEMS = [
  { icon: <VerifiedIcon size={20} />, title: 'Carrier Vetting', desc: 'Every carrier verified through Central Dispatch. FMCSA authority, active insurance, safety rating checked before assignment.' },
  { icon: <InsuranceIcon size={20} />, title: 'Insurance Verification', desc: 'COI confirmed before every dispatch. Minimum $100K cargo coverage required. Most carriers carry $250K+.' },
  { icon: <DocumentIcon size={20} />, title: 'Documentation', desc: 'BOL at pickup and delivery. Photo documentation. Digital records accessible in your customer portal.' },
  { icon: <BellIcon size={20} />, title: 'Status Notifications', desc: 'Email at every stage. Telegram bot for updates. Portal access to shipment status anytime.' },
  { icon: <HeadphonesIcon size={20} />, title: 'Claims Support', desc: '24-hour claim window with photo documentation. We coordinate with the carrier\'s insurance on your behalf.' },
  { icon: <EscalationIcon size={20} />, title: 'Escalation Path', desc: 'Dispatcher \u2192 operations manager \u2192 resolution within 48 hours. Every issue gets tracked.' },
];

export default function TrustSection() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 24px',
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          cursor: 'pointer',
          padding: '20px 0',
          userSelect: 'none',
        }}
      >
        <ShieldIcon size={22} />
        <span style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(18px, 3vw, 22px)',
          fontWeight: 700,
          color: colors.text,
        }}>
          How we protect your shipment
        </span>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: colors.accent,
          fontWeight: 600,
          transition: 'transform 200ms',
        }}>
          {open ? 'Hide \u25B4' : 'Learn more \u25BE'}
        </span>
      </div>

      <div style={{
        maxHeight: open ? '800px' : '0',
        overflow: 'hidden',
        transition: 'max-height 400ms ease',
      }}>
        <div style={{
          borderLeft: `3px solid ${colors.accent}`,
          padding: '24px 24px 24px 28px',
          marginBottom: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {ITEMS.map(({ icon, title, desc }) => (
            <div key={title} style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}>{icon}</span>
              <div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: '14px',
                  fontWeight: 700,
                  color: colors.text,
                  marginBottom: '4px',
                }}>
                  {title}
                </div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: '13px',
                  color: colors.textMuted,
                  lineHeight: 1.5,
                }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
