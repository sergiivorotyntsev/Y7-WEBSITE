import { useState, useEffect, useRef } from 'react';
import { API_URL } from '../config';
import { colors, fonts, keyframes } from '../theme';
import { TruckIcon, PackageIcon, CheckIcon, LinkIcon, RouteIcon, StarFilledIcon } from './icons';

const ACTION_ICONS = {
  'dispatched': <TruckIcon size={16} />,
  'picked up': <PackageIcon size={16} />,
  'delivered': <CheckIcon size={16} />,
  'carrier assigned': <LinkIcon size={16} />,
  'in transit': <RouteIcon size={16} />,
};

export default function LiveActivityFeed() {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/api/public/activity`)
      .then(r => r.json())
      .then(data => setEvents(data.events || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    setVisible(0);
    timerRef.current = setInterval(() => {
      setVisible(prev => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [events]);

  if (events.length === 0) return null;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px 24px',
      textAlign: 'center',
    }}>
      {/* LIVE indicator */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '14px',
        fontFamily: fonts.sans,
        fontSize: '11px',
        fontWeight: 700,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#EF4444',
          display: 'inline-block',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        LIVE
      </div>

      <style>{keyframes}</style>

      {/* Event display */}
      <div style={{ minHeight: '24px', position: 'relative' }} aria-live="polite" aria-atomic="true">
        {events.map((ev, i) => (
          <div key={`${i}-${visible}`} style={{
            display: i === visible ? 'block' : 'none',
            animation: i === visible ? 'fadeSwitch 4s ease-in-out' : 'none',
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.textMuted,
          }}>
            <span style={{ marginRight: '6px' }}>{ACTION_ICONS[ev.type] || <StarFilledIcon size={16} />}</span>
            <span style={{ color: colors.text, fontWeight: 500 }}>
              {ev.vehicle}
            </span>
            {' '}
            {ev.type} {ev.from_city} &rarr; {ev.to_city}
            <span style={{ marginLeft: '8px', fontSize: '11px', color: colors.textHint }}>
              {ev.time_ago}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
