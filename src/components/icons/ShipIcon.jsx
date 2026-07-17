export default function ShipIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20l2-2h16l2 2" />
      <path d="M4 18l-1-6h18l-1 6" />
      <rect x="9" y="6" width="6" height="6" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <rect x="11" y="2" width="3" height="1" />
    </svg>
  );
}
