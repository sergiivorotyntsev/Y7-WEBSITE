import { useState, useEffect } from 'react';
import { colors, fonts } from '../theme';

export default function Toast({ message, type = 'success', duration = 3000, onDismiss }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), duration - 400);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, duration);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, [duration, onDismiss]);

  if (!visible) return null;

  const bg = type === 'success' ? colors.success : colors.accent;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: bg,
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '10px',
      fontFamily: fonts.sans,
      fontSize: '14px',
      fontWeight: 600,
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      opacity: fading ? 0 : 1,
      transition: 'opacity 400ms ease',
      maxWidth: 'calc(100vw - 40px)',
    }}>
      <span>{message}</span>
      <button
        onClick={() => { setVisible(false); if (onDismiss) onDismiss(); }}
        style={{
          background: 'none', border: 'none', color: '#fff', fontSize: '18px',
          cursor: 'pointer', padding: 0, lineHeight: 1, opacity: 0.7,
        }}
      >
        &times;
      </button>
    </div>
  );
}
