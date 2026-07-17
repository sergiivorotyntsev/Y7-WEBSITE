export default function RouteIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="10" y2="2" />
      <line x1="21" y1="22" x2="14" y2="2" />
      <line x1="9" y1="9" x2="10.5" y2="9" strokeDasharray="2 2" />
      <line x1="10" y1="13" x2="11.5" y2="13" strokeDasharray="2 2" />
      <line x1="11" y1="17" x2="12.5" y2="17" strokeDasharray="2 2" />
    </svg>
  );
}
