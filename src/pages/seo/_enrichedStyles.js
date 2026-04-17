// Shared inline-style objects for the SEO-DEEP enriched landing pages.
// Keeps typography consistent across 13 pages without bloating CSS modules.

export const prose = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '15px',
  color: '#2C2C2A',
  lineHeight: 1.75,
  margin: '0 0 16px',
};

export const muted = { ...prose, color: '#4A4A46' };

export const subhead = {
  fontFamily: 'Georgia, serif',
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#2C2C2A',
  margin: '24px 0 10px',
};

export const tableWrap = { overflowX: 'auto', margin: '12px 0 20px' };

export const table = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '14px',
};

export const th = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: '2px solid #E5E0D8',
  color: '#2C2C2A',
  fontWeight: 700,
};

export const td = {
  padding: '10px 12px',
  borderBottom: '1px solid #E5E0D8',
  color: '#4A4A46',
};

export const calloutBox = {
  background: '#F7F5F0',
  borderLeft: '3px solid #993C1D',
  padding: '16px 20px',
  margin: '16px 0',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '14px',
  color: '#4A4A46',
  lineHeight: 1.65,
  borderRadius: '0 6px 6px 0',
};
