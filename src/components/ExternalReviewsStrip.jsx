import { colors, fonts } from '../theme';

const SOURCES = [
  {
    key: 'google',
    name: 'Google',
    url: import.meta.env.VITE_GOOGLE_REVIEWS_URL,
    rating: import.meta.env.VITE_GOOGLE_REVIEWS_RATING,
    count: import.meta.env.VITE_GOOGLE_REVIEWS_COUNT,
  },
  {
    key: 'bbb',
    name: 'BBB',
    url: import.meta.env.VITE_BBB_URL,
    rating: import.meta.env.VITE_BBB_RATING || 'A+',
    count: null,
    isGrade: true,
  },
  {
    key: 'tr',
    name: 'TransportReviews',
    url: import.meta.env.VITE_TR_URL,
    rating: import.meta.env.VITE_TR_RATING,
    count: import.meta.env.VITE_TR_COUNT,
  },
  {
    key: 'trustpilot',
    name: 'Trustpilot',
    url: import.meta.env.VITE_TRUSTPILOT_ID ? `https://www.trustpilot.com/review/${import.meta.env.VITE_TRUSTPILOT_ID}` : null,
    rating: null,
    count: null,
  },
];

export default function ExternalReviewsStrip() {
  const visible = SOURCES.filter(s => s.url);
  if (visible.length === 0) return null;

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 16,
      justifyContent: 'center', alignItems: 'center',
      padding: '12px 0',
    }}>
      {visible.map(s => (
        <a
          key={s.key}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: fonts.sans, fontSize: 13, color: colors.text,
            textDecoration: 'none', padding: '6px 12px',
            background: colors.bgCard, border: `1px solid ${colors.border}`,
            borderRadius: 20,
          }}
        >
          <strong>{s.name}:</strong>
          {s.isGrade ? (
            <span style={{ color: colors.success, fontWeight: 700 }}>{s.rating} Rating</span>
          ) : (
            <>
              {s.rating && <span style={{ color: '#F5A623', fontWeight: 600 }}>{s.rating}&#9733;</span>}
              {s.count && <span style={{ color: colors.textMuted }}>({s.count} reviews)</span>}
            </>
          )}
        </a>
      ))}
    </div>
  );
}
