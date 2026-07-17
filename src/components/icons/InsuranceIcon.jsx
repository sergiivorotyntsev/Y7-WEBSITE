export default function InsuranceIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <path d="M14.5 10.5c0-1.1-1.12-2-2.5-2s-2.5.9-2.5 2 1.12 2 2.5 2 2.5.9 2.5 2-1.12 2-2.5 2-2.5-.9-2.5-2" />
    </svg>
  );
}
