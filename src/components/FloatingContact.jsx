import { useState, useEffect, useRef } from 'react';
import { colors, fonts, keyframes } from '../theme';
import { TelegramIcon, EmailIcon, CloseIcon } from './icons';
import { trackEvent } from '../utils/trackEvent';

const CHANNELS = [
  { icon: <TelegramIcon size={18} />, label: 'Telegram', href: 'https://t.me/y7dispatch_bot', event: 'telegram_cta_click' },
  { icon: <EmailIcon size={18} />, label: 'Email', href: 'mailto:info@y7agency.com', event: 'email_cta_click' },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Focus first link when menu opens, close on Escape
  useEffect(() => {
    if (!open) return;
    const firstLink = menuRef.current?.querySelector('a');
    if (firstLink) firstLink.focus();
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  if (!visible) return null;

  return (
    <>
      <style>{keyframes}</style>

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
        <div ref={menuRef} style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          animation: 'popUp 200ms ease',
        }}>
          {CHANNELS.map(({ icon, label, href, event }, i) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={() => { if (event) trackEvent(event, { location: 'mobile_cta' }); setOpen(false); }}
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
              {icon}
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
        {open ? <CloseIcon size={24} color="#fff" /> : <TelegramIcon size={24} color="#fff" />}
      </button>
    </>
  );
}
