export default function EnclosedIcon({ size = 24, color = '#993C1D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Trailer body */}
      <rect x="1" y="6" width="18" height="11" rx="1" />
      {/* Cab */}
      <path d="M19 10h3a1 1 0 0 1 1 1v6H19" />
      {/* Wheels */}
      <circle cx="6" cy="19" r="2" />
      <circle cx="15" cy="19" r="2" />
      <circle cx="21" cy="19" r="2" />
      {/* Roof line */}
      <line x1="1" y1="6" x2="19" y2="6" />
    </svg>
  );
}
