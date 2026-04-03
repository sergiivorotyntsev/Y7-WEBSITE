import { colors, fonts } from '../theme';

export default function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '16px',
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{
        width: '36px',
        height: '36px',
        border: `3px solid ${colors.border}`,
        borderTopColor: colors.accent,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{
        fontFamily: fonts.sans,
        fontSize: '13px',
        color: colors.textMuted,
        letterSpacing: '0.3px',
      }}>
        Loading...
      </span>
    </div>
  );
}
