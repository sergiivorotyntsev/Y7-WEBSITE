export default function AuctionIcon({ size = 24, color = '#993C1D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Gavel head */}
      <rect x="7" y="3" width="10" height="4" rx="1" transform="rotate(-45 12 5)" />
      {/* Handle */}
      <line x1="10" y1="12" x2="3" y2="19" />
      {/* Strike base */}
      <line x1="13" y1="20" x2="21" y2="20" />
      <line x1="17" y1="16" x2="17" y2="20" />
    </svg>
  );
}
