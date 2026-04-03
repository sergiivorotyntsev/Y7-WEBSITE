export default function VerifiedIcon({ size = 24, color = '#993C1D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 2.3h3.3v3.3L20 10l-2.3 2.4v3.3h-3.3L12 18l-2.4-2.3H6.3v-3.3L4 10l2.3-2.4V4.3h3.3L12 2z" />
      <polyline points="9 10 11 12 15 8" />
    </svg>
  );
}
