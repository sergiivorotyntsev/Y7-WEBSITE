export default function HandshakeIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11l-4-4-8 4-4-4" />
      <path d="M4 7l4 4 3-1.5L14 12l3-1 3 3" />
      <path d="M2 9l2-2 4 4" />
      <path d="M22 9l-2-2-4 4" />
      <path d="M10 17l-2 2" />
      <path d="M14 17l2 2" />
      <path d="M8 19l4-4 4 4" />
    </svg>
  );
}
