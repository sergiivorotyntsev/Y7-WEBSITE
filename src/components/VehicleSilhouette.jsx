import { colors, fonts } from '../theme';

// Simple SVG silhouettes by body type
const SILHOUETTES = {
  sedan: (
    <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 55 Q35 35 65 28 Q90 22 110 22 Q140 22 155 35 Q170 45 180 55 Z" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <rect x="20" y="55" width="165" height="12" rx="4" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <circle cx="55" cy="67" r="10" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
      <circle cx="150" cy="67" r="10" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
    </svg>
  ),
  suv: (
    <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 50 Q30 25 55 20 Q80 16 120 16 Q150 16 165 25 Q175 35 180 50 Z" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <rect x="18" y="50" width="170" height="14" rx="4" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <circle cx="52" cy="64" r="11" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
      <circle cx="152" cy="64" r="11" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50 Q35 25 60 20 Q85 16 100 18 L100 50 Z" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <rect x="100" y="30" width="75" height="22" rx="3" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <rect x="18" y="50" width="170" height="14" rx="4" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <circle cx="52" cy="64" r="11" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
      <circle cx="155" cy="64" r="11" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
    </svg>
  ),
  coupe: (
    <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 55 Q42 30 75 24 Q100 20 125 24 Q155 30 170 45 Q175 50 178 55 Z" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <rect x="22" y="55" width="162" height="11" rx="4" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <circle cx="58" cy="66" r="10" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
      <circle cx="148" cy="66" r="10" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
    </svg>
  ),
  van: (
    <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 55 Q28 18 50 14 Q75 10 130 10 Q160 10 170 20 Q178 30 180 55 Z" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <rect x="18" y="55" width="170" height="12" rx="4" fill={colors.bgMuted} stroke={colors.border} strokeWidth="1.5"/>
      <circle cx="50" cy="67" r="10" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
      <circle cx="155" cy="67" r="10" fill={colors.bgCard} stroke={colors.textMuted} strokeWidth="2"/>
    </svg>
  ),
};

function getBodyType(bodyClass) {
  if (!bodyClass) return 'sedan';
  const b = bodyClass.toLowerCase();
  if (b.includes('truck') || b.includes('pickup')) return 'truck';
  if (b.includes('suv') || b.includes('sport utility') || b.includes('crossover')) return 'suv';
  if (b.includes('coupe') || b.includes('convertible')) return 'coupe';
  if (b.includes('van') || b.includes('wagon') || b.includes('minivan')) return 'van';
  return 'sedan';
}

export default function VehicleSilhouette({ make, model, year, bodyClass }) {
  const type = getBodyType(bodyClass);
  const label = [year, make, model].filter(Boolean).join(' ');

  return (
    <div style={{
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginTop: '8px',
      animation: 'fadeUp 300ms ease',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ width: '100px', flexShrink: 0 }}>
        {SILHOUETTES[type]}
      </div>
      <div>
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '15px',
          fontWeight: 600,
          color: colors.text,
        }}>
          {label || 'Vehicle'}
        </div>
        {bodyClass && (
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            color: colors.textMuted,
            marginTop: '2px',
          }}>
            {bodyClass}
          </div>
        )}
      </div>
    </div>
  );
}
