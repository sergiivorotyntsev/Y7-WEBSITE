export default function MultiCarIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Top car */}
      <path d="M4 10h16v-3l-2-3H6L4 7v3z" />
      <circle cx="7" cy="10" r="1.5" />
      <circle cx="17" cy="10" r="1.5" />
      {/* Bottom car */}
      <path d="M4 19h16v-3l-2-3H6L4 16v3z" />
      <circle cx="7" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}
