export default function ScalesIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="4" y1="7" x2="20" y2="7" />
      <path d="M4 7l2 8h0a3 3 0 0 0 6 0h0l-2-8" />
      <path d="M14 7l2 8h0a3 3 0 0 0 6 0h0l-2-8" />
    </svg>
  );
}
