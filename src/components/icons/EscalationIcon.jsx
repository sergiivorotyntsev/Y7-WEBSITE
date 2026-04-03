export default function EscalationIcon({ size = 24, color = '#993C1D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 20 10 14 14 18 20 4" />
      <polyline points="14 4 20 4 20 10" />
    </svg>
  );
}
