export default function DealerTradeIcon({ size = 40, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Left car facing right */}
      <path d="M4 28h16v-4l-2-4H8l-4 4v4z" />
      <line x1="4" y1="24" x2="20" y2="24" />
      <circle cx="8" cy="28" r="2" />
      <circle cx="16" cy="28" r="2" />
      {/* Right car facing left */}
      <path d="M28 28h16v-4l-2-4H32l-4 4v4z" />
      <line x1="28" y1="24" x2="44" y2="24" />
      <circle cx="32" cy="28" r="2" />
      <circle cx="40" cy="28" r="2" />
      {/* Arrows */}
      <line x1="16" y1="16" x2="32" y2="16" />
      <polyline points="29 13 32 16 29 19" />
      <line x1="32" y1="36" x2="16" y2="36" />
      <polyline points="19 33 16 36 19 39" />
    </svg>
  );
}
