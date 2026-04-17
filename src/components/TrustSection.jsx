import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';
import { VerifiedIcon, InsuranceIcon, DocumentIcon, BellIcon, HeadphonesIcon, EscalationIcon, ShieldIcon } from './icons';

export default function TrustSection() {
  const { t } = useTranslation('home');
  const [open, setOpen] = useState(false);

  const items = [
    { icon: <VerifiedIcon size={20} />,    title: t('trustSection.carrierVettingTitle'), desc: t('trustSection.carrierVettingDesc') },
    { icon: <InsuranceIcon size={20} />,   title: t('trustSection.insuranceTitle'),      desc: t('trustSection.insuranceDesc') },
    { icon: <DocumentIcon size={20} />,    title: t('trustSection.documentationTitle'),  desc: t('trustSection.documentationDesc') },
    { icon: <BellIcon size={20} />,        title: t('trustSection.notificationsTitle'),  desc: t('trustSection.notificationsDesc') },
    { icon: <HeadphonesIcon size={20} />,  title: t('trustSection.claimsTitle'),         desc: t('trustSection.claimsDesc') },
    { icon: <EscalationIcon size={20} />,  title: t('trustSection.escalationTitle'),     desc: t('trustSection.escalationDesc') },
  ];

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
          {t('trustSection.title')}
        </span>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: colors.accent,
          fontWeight: 600,
          transition: 'transform 200ms',
        }}>
          {open ? `${t('trustSection.hide')} \u25B4` : `${t('trustSection.learnMore')} \u25BE`}
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
          {items.map(({ icon, title, desc }) => (
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
