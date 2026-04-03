import { Component } from 'react';
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

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isChunkError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, isChunkError: isChunkLoadError(error) };
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.location !== this.props.location) {
      this.setState({ hasError: false, isChunkError: false });
    }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
    if (isChunkLoadError(error)) {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.state.isChunkError) {
        return (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', minHeight: '60vh', padding: '40px 24px',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>
              New version available — reloading...
            </p>
          </div>
        );
      }

      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh', padding: '40px 24px',
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: '16px' }}><WarningIcon size={48} /></div>
          <h1 style={{
            fontFamily: fonts.serif, fontSize: '24px', color: colors.text, marginBottom: '12px',
          }}>
            Something went wrong
          </h1>
          <p style={{
            fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted,
            marginBottom: '24px', maxWidth: '400px',
          }}>
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600,
              padding: '12px 28px', background: colors.accent, color: '#fff',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
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
