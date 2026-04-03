export default function PersonalCarIcon({ size = 40, color = '#993C1D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Car body */}
      <path d="M6 30h36v-6l-4-2H10l-4 2v6z" />
      {/* Roof with windows */}
      <path d="M14 22l3-8h14l3 8" />
      {/* Window divider */}
      <line x1="24" y1="14" x2="24" y2="22" />
      {/* Undercarriage */}
      <path d="M6 30v2h6v-2" />
      <path d="M36 30v2h6v-2" />
      {/* Wheels */}
      <circle cx="13" cy="32" r="3.5" />
      <circle cx="13" cy="32" r="1" fill={color} stroke="none" />
      <circle cx="35" cy="32" r="3.5" />
      <circle cx="35" cy="32" r="1" fill={color} stroke="none" />
      {/* Headlight */}
      <line x1="42" y1="26" x2="43" y2="26" strokeWidth="2" />
    </svg>
  );
}
