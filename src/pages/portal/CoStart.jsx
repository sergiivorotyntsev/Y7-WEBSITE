// CO3W-T05: email deep-link landing (/portal/co/start?t=...).
// Logged in -> exchanges the token for a prefilled CO request and redirects to
// its workspace. Not logged in -> login link that returns here (?next=).
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../theme';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';
import { apiDetail, coJson } from './coShared';

export default function CoStart() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const token = searchParams.get('t') || '';
  const [error, setError] = useState(null);
  const firedRef = useRef(false);

  useEffect(() => {
    if (loading || !user || !token || firedRef.current) return;
    firedRef.current = true;
    (async () => {
      const { ok, status, body } = await coJson('/api/portal/data/co-requests/from-token', {
        method: 'POST',
        body: JSON.stringify({ t: token }),
      });
      if (ok) {
        navigate(`/portal/co/requests/${body.id}`, { replace: true });
      } else if (status === 410) {
        setError('expired');
      } else if (status === 403) {
        setError('wrong_account');
      } else {
        setError(apiDetail(body, 'Something went wrong opening this link.'));
      }
    })();
  }, [loading, user, token, navigate]);

  const shell = (children, box = pp.card) => (
    <div className={`${pp.shell} ${pp.measureNarrow}`}>
      <PageMeta title="Certificate of Origin — Y7 Portal" path="/portal/co/start" noindex />
      <div className={box} style={box === pp.card ? { padding: 32 } : undefined}>{children}</div>
    </div>
  );

  if (!token) {
    return shell(
      <>
        <h1 className={pp.pageTitle}>Certificate of Origin</h1>
        <p style={{ fontSize: 14 }}>This link is missing its token.</p>
        <Link to="/portal/co" className={v2b.cta}>
          Go to CO requests
        </Link>
      </>,
    );
  }

  if (loading) {
    return shell('Checking your session…', pp.notice);
  }

  if (!user) {
    const next = encodeURIComponent(`/portal/co/start?t=${token}`);
    return shell(
      <>
        <h1 className={pp.pageTitle}>Order your Certificate of Origin package</h1>
        <p style={{ fontSize: 14 }}>
          Log in to your Y7 portal account and we will open the prefilled request
          for your vehicle.
        </p>
        <Link
          to={`/portal/login?next=${next}`}
          className={v2b.cta}
        >
          Log in to continue
        </Link>
      </>,
    );
  }

  if (error === 'expired') {
    return shell(
      <>
        <h1 className={pp.pageTitle}>This link has expired</h1>
        <p style={{ fontSize: 14 }}>
          Email links are valid for 30 days. No problem — you can screen the VIN
          again in a few seconds.
        </p>
        <Link to="/portal/co" className={v2b.cta}>
          Start a new request
        </Link>
      </>,
    );
  }

  if (error === 'wrong_account') {
    return shell(
      <>
        <h1 className={pp.pageTitle}>This link belongs to a different account</h1>
        <p style={{ fontSize: 14 }}>
          You are logged in as a different customer than the one this vehicle belongs to.
          Log in with the account that received the email, or contact info@y7agency.com.
        </p>
        <Link to="/portal/co" style={{ color: colors.accent }}>Go to my CO requests</Link>
      </>,
    );
  }

  if (error) {
    return shell(
      <>
        <h1 className={pp.pageTitle}>Could not open this link</h1>
        <div className={pp.errorBlock}>{error}</div>
        <Link to="/portal/co" style={{ color: colors.accent }}>Go to CO requests</Link>
      </>,
    );
  }

  return shell('Opening your request…', pp.notice);
}
