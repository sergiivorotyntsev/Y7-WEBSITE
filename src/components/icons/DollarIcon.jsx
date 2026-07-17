export default function DollarIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="6" x2="12" y2="18" />
      <path d="M15.5 9.5c0-1.38-1.57-2.5-3.5-2.5S8.5 8.12 8.5 9.5 10.07 12 12 12s3.5 1.12 3.5 2.5-1.57 2.5-3.5 2.5-3.5-1.12-3.5-2.5" />
    </svg>
  );
}
