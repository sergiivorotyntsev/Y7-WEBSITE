import { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';
import { WarningIcon } from './icons';

function isChunkLoadError(error) {
  if (!error) return false;
  const msg = error.message || '';
  return (
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('Failed to load module script') ||
    msg.includes('Loading chunk') ||
    msg.includes('Loading CSS chunk') ||
    error.name === 'ChunkLoadError'
  );
}

// ---------------------------------------------------------------------------
// WEB-CACHE-RESILIENCE-T02: chunk-failure retry guard.
// At most ONE cache-busting retry per navigation, then a human error — never an
// infinite reload loop. sessionStorage-backed (per-path, time-boxed), with an
// in-memory fallback for Safari private mode (where sessionStorage throws).
// No window/sessionStorage access at module load — only inside these functions,
// which run in the browser during a caught error (prerender stays safe).
// ---------------------------------------------------------------------------
const RETRY_TTL_MS = 2 * 60 * 1000; // a stale guard (>2 min) is ignored + cleaned,
//                                     so a transient incident never poisons later navs.
const inMemoryRetry = {}; // fallback: one retry per page lifetime when storage is unavailable.

function guardKey(pathname) {
  return `chunk_retry:${pathname}`;
}

function readGuardTs(pathname) {
  const key = guardKey(pathname);
  try {
    const v = window.sessionStorage.getItem(key);
    return v == null ? null : Number(v) || null;
  } catch {
    return inMemoryRetry[key] || null;
  }
}

function writeGuard(pathname) {
  const key = guardKey(pathname);
  const now = Date.now();
  try {
    window.sessionStorage.setItem(key, String(now));
  } catch {
    inMemoryRetry[key] = now;
  }
}

function clearGuard(pathname) {
  const key = guardKey(pathname);
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    delete inMemoryRetry[key];
  }
}

// True only if a retry was attempted RECENTLY (within the TTL). Stale entries are
// cleaned so the next navigation starts fresh.
function hasRecentRetry(pathname) {
  const ts = readGuardTs(pathname);
  if (!ts) return false;
  if (Date.now() - ts > RETRY_TTL_MS) {
    clearGuard(pathname);
    return false;
  }
  return true;
}

function currentPathname() {
  return typeof window !== 'undefined' && window.location ? window.location.pathname : '';
}

const centered = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: '40px 24px',
  textAlign: 'center',
};

// Localized error state (function component so it can use the i18n hook). Shown only
// after the single cache-busting retry has ALSO failed.
function ChunkRetryError({ onRefresh }) {
  const { t } = useTranslation('common');
  return (
    <div style={centered}>
      <div style={{ marginBottom: '16px' }}><WarningIcon size={48} /></div>
      <p style={{
        fontFamily: fonts.sans, fontSize: '16px', color: colors.textMuted,
        marginBottom: '24px', maxWidth: '420px', lineHeight: 1.5,
      }}>
        {t('errors.chunkLoadFailed')}
      </p>
      <button
        onClick={onRefresh}
        style={{
          fontFamily: fonts.sans, fontSize: '16px', fontWeight: 600,
          padding: '12px 28px', minHeight: '44px', background: colors.accent,
          color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer',
        }}
      >
        {t('errors.refresh')}
      </button>
    </div>
  );
}

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isChunkError: false, retryExhausted: false };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, isChunkError: isChunkLoadError(error), retryExhausted: false };
  }

  componentDidUpdate(prevProps) {
    // Clear the error on navigation so a recovered route renders normally.
    if (this.state.hasError && prevProps.location !== this.props.location) {
      this.setState({ hasError: false, isChunkError: false, retryExhausted: false });
    }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
    if (!isChunkLoadError(error)) return;

    const pathname = currentPathname();
    if (hasRecentRetry(pathname)) {
      // The one cache-busting retry already failed — STOP. Show the human error.
      this.setState({ hasError: true, isChunkError: true, retryExhausted: true });
      return;
    }

    // First failure for this navigation: record the guard, then retry ONCE in a way
    // that bypasses the HTTP cache (force a fresh index.html with the new asset names),
    // then reload. No ?_cb= junk on the visible URL.
    writeGuard(pathname);
    this.setState({ hasError: true, isChunkError: true, retryExhausted: false });
    (async () => {
      try {
        await fetch(window.location.href, { cache: 'reload' });
      } catch {
        /* offline / fetch blocked — reload anyway, the browser will revalidate */
      }
      window.location.reload();
    })();
  }

  handleRefresh() {
    const pathname = currentPathname();
    clearGuard(pathname);
    if (typeof window !== 'undefined') window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      if (this.state.isChunkError) {
        if (this.state.retryExhausted) {
          return <ChunkRetryError onRefresh={this.handleRefresh} />;
        }
        // First failure: the cache-busting reload is in flight — a brief neutral
        // spinner (no text) until the page reloads.
        return (
          <div style={centered}>
            <style>{'@keyframes y7spin{to{transform:rotate(360deg)}}'}</style>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              border: `3px solid ${colors.border}`, borderTopColor: 'var(--v2-red, #d70f24)',
              animation: 'y7spin 0.8s linear infinite',
            }} />
          </div>
        );
      }

      return (
        <div style={centered}>
          {/* SPRINT-W7 B2: V2 retoken (smoke-discovered V1 leftover). */}
          <div style={{ marginBottom: '16px' }}><WarningIcon size={48} /></div>
          <h1 style={{
            fontFamily: 'var(--v2-font-display, Oswald, system-ui)', textTransform: 'uppercase',
            letterSpacing: '0.01em', lineHeight: 1.05, fontWeight: 600,
            fontSize: '24px', color: 'var(--v2-ink, #050607)', marginBottom: '12px',
          }}>
            Something went wrong
          </h1>
          <p style={{
            fontFamily: fonts.sans, fontSize: '14px', color: 'var(--v2-ink-muted, #5c5851)',
            marginBottom: '24px', maxWidth: '400px',
          }}>
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600,
              padding: '12px 28px', background: 'var(--v2-red-gradient, linear-gradient(135deg, #d70f24, #a90918))',
              color: '#fff7ed', border: 'none', borderRadius: '8px', cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
