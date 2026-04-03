import { Component } from 'react';
import { colors, fonts } from '../theme';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    // Reset error state when location changes (navigation after crash)
    if (this.state.hasError && prevProps.location !== this.props.location) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#9888;</div>
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: '24px',
            color: colors.text,
            marginBottom: '12px',
          }}>
            Something went wrong
          </h1>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '14px',
            color: colors.textMuted,
            marginBottom: '24px',
            maxWidth: '400px',
          }}>
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              fontFamily: fonts.sans,
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 28px',
              background: colors.accent,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
