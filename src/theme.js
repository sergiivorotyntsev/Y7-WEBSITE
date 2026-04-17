export const colors = {
  bg: '#F7F5F0',
  bgCard: '#FFFFFF',
  bgMuted: '#EFECE6',
  bgInput: '#F7F5F0',
  text: '#2C2C2A',
  textMuted: '#888780',
  textHint: '#999',
  accent: '#993C1D',
  accentHover: '#7A3017',
  dark: '#2C2C2A',
  success: '#0F6E56',
  successBg: '#E1F5EE',
  border: '#e5e0d8',
  borderInput: '#ddd',
  blogPurple: '#5B3C96',
  blogBlue: '#14648C',
  blogBrown: '#8C5020',
};

export const fonts = {
  serif: "Georgia, 'Times New Roman', serif",
  sans: "system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};

export const keyframes = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
  @keyframes bounceIn { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
  @keyframes popUp { from { opacity: 0; transform: translateY(10px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes fadeSwitch { 0% { opacity: 0; transform: translateY(8px); } 10% { opacity: 1; transform: translateY(0); } 90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-8px); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes growBar { from { width: 0; } to { width: 100%; } }
`;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64 };

export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
  md: '0 2px 8px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
  lg: '0 4px 12px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)',
  xl: '0 8px 24px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.12)',
};

export const radii = { sm: 4, md: 8, lg: 12, xl: 16, pill: 20, round: '50%' };

export const transitions = {
  fast: '150ms ease-out',
  normal: '250ms ease-out',
  slow: '400ms ease-out',
};

export const breakpoints = { mobile: 480, tablet: 768, desktop: 1024, wide: 1280 };

export const typography = {
  sectionTitle: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  body: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    lineHeight: 1.7,
  },
  label: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  mono: {
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
  },
};

export const button = {
  primary: {
    background: colors.dark,
    color: colors.bg,
    padding: '10px 24px',
    borderRadius: '20px',
    fontSize: '12px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: fonts.sans,
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  secondary: {
    background: 'transparent',
    color: colors.dark,
    padding: '10px 24px',
    borderRadius: '20px',
    border: '0.5px solid #ccc',
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: fonts.sans,
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  accent: {
    background: colors.accent,
    color: '#fff',
    padding: '10px 24px',
    borderRadius: '20px',
    fontSize: '12px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: fonts.sans,
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
};
