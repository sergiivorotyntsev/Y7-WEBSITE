import { useAuth } from '../hooks/useAuth';
import { colors, fonts } from '../theme';
import ActionRequired from './ActionRequired';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontFamily: fonts.sans,
        fontSize: '14px',
        color: colors.textMuted,
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <ActionRequired type="session_expired" />;
  }

  return children;
}
