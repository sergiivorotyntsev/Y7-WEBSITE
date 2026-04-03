export default function PortIcon({ size = 24, color = '#993C1D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Anchor ring */}
      <circle cx="12" cy="5" r="2" />
      {/* Vertical shaft */}
      <line x1="12" y1="7" x2="12" y2="21" />
      {/* Horizontal bar */}
      <line x1="8" y1="10" x2="16" y2="10" />
      {/* Left arm */}
      <path d="M5 21c0-4 3.5-7 7-7" />
      {/* Right arm */}
      <path d="M19 21c0-4-3.5-7-7-7" />
    </svg>
  );
}
