import { useState, useEffect } from 'react';
import { colors, fonts } from '../theme';

const CHANNELS = [
  { icon: '\uD83D\uDCAC', label: 'Telegram', href: 'https://t.me/y7dispatch_bot' },
  { icon: '\uD83D\uDFE2', label: 'WhatsApp', href: 'https://wa.me/18578958555' },
  { icon: '\uD83D\uDCDE', label: 'Call us', href: 'tel:+18578958555' },
  { icon: '\u2709\uFE0F', label: 'Email', href: 'mailto:info@y7agency.com' },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0); }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes popUp {
          from { opacity: 0; transform: translateY(10px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
          }}
        />
      )}

      {/* Channel menu */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          animation: 'popUp 200ms ease',
        }}>
          {CHANNELS.map(({ icon, label, href }, i) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                fontFamily: fonts.sans,
                fontSize: '13px',
                fontWeight: 500,
                color: colors.text,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                animation: `popUp 200ms ease ${i * 50}ms both`,
              }}
            >
              <span style={{ fontSize: '18px' }}>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: colors.accent,
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 16px rgba(153, 60, 29, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'bounceIn 500ms ease',
          transition: 'transform 200ms ease',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
        }}
        aria-label="Contact us"
      >
        {open ? '\u2715' : '\uD83D\uDCAC'}
      </button>
    </>
  );
}
