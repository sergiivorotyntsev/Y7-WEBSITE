export default function HourglassIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="2" x2="18" y2="2" />
      <line x1="6" y1="22" x2="18" y2="22" />
      <path d="M7 2v4l5 6-5 6v4" />
      <path d="M17 2v4l-5 6 5 6v4" />
    </svg>
  );
}
