export default function GlobeRouteIcon({ size = 40, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Globe */}
      <circle cx="24" cy="24" r="18" />
      {/* Vertical meridian */}
      <ellipse cx="24" cy="24" rx="8" ry="18" />
      {/* Equator */}
      <line x1="6" y1="24" x2="42" y2="24" />
      {/* Dashed route arc */}
      <path d="M12 16c4 -6 16 -2 24 16" strokeDasharray="3 3" />
      {/* Point A */}
      <circle cx="12" cy="16" r="2.5" fill={color} stroke="none" />
      {/* Point B */}
      <circle cx="36" cy="32" r="2.5" fill={color} stroke="none" />
    </svg>
  );
}
