import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { colors, fonts } from '../theme';

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
    return <Navigate to="/portal/login" replace />;
  }

  return children;
}
