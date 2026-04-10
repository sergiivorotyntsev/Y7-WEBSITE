import React from 'react';

const svgStyle = { width: '100%', height: '100%', display: 'block' };

export function BannerCarrier() {
  return (
    <svg viewBox="0 0 800 280" style={svgStyle} aria-hidden="true">
      <defs>
        <linearGradient id="gCarrier" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2C2C2A" />
          <stop offset="100%" stopColor="#3d3d3e" />
        </linearGradient>
      </defs>
      <rect width="800" height="280" fill="url(#gCarrier)" />
      <circle cx="680" cy="60" r="120" fill="#fff" opacity="0.04" />
      <circle cx="120" cy="220" r="80" fill="#fff" opacity="0.03" />
      <line x1="0" y1="140" x2="800" y2="140" stroke="#fff" strokeWidth="0.5" opacity="0.06" />
      <rect x="300" y="80" width="200" height="120" rx="8" fill="#fff" opacity="0.03" />
    </svg>
  );
}

export function BannerInsurance() {
  return (
    <svg viewBox="0 0 800 280" style={svgStyle} aria-hidden="true">
      <defs>
        <linearGradient id="gInsurance" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#993C1D" />
          <stop offset="100%" stopColor="#7A3017" />
        </linearGradient>
      </defs>
      <rect width="800" height="280" fill="url(#gInsurance)" />
      <path d="M400 40 L440 100 L360 100 Z" fill="#fff" opacity="0.05" />
      <circle cx="650" cy="200" r="100" fill="#fff" opacity="0.04" />
      <rect x="60" y="60" width="160" height="160" rx="80" fill="#fff" opacity="0.03" />
      <line x1="200" y1="0" x2="600" y2="280" stroke="#fff" strokeWidth="0.5" opacity="0.06" />
    </svg>
  );
}

export function BannerFMCSA() {
  return (
    <svg viewBox="0 0 800 280" style={svgStyle} aria-hidden="true">
      <defs>
        <linearGradient id="gFMCSA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F6E56" />
          <stop offset="100%" stopColor="#0a4a3a" />
        </linearGradient>
      </defs>
      <rect width="800" height="280" fill="url(#gFMCSA)" />
      <rect x="580" y="40" width="180" height="200" rx="6" fill="#fff" opacity="0.04" />
      <rect x="600" y="60" width="140" height="8" rx="4" fill="#fff" opacity="0.06" />
      <rect x="600" y="80" width="100" height="8" rx="4" fill="#fff" opacity="0.05" />
      <rect x="600" y="100" width="120" height="8" rx="4" fill="#fff" opacity="0.04" />
      <circle cx="100" cy="140" r="90" fill="#fff" opacity="0.03" />
    </svg>
  );
}

export function BannerBroker() {
  return (
    <svg viewBox="0 0 800 280" style={svgStyle} aria-hidden="true">
      <defs>
        <linearGradient id="gBroker" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3c2878" />
          <stop offset="100%" stopColor="#5B3C96" />
        </linearGradient>
      </defs>
      <rect width="800" height="280" fill="url(#gBroker)" />
      <rect x="80" y="80" width="120" height="120" rx="4" fill="#fff" opacity="0.04" />
      <rect x="220" y="80" width="120" height="120" rx="4" fill="#fff" opacity="0.03" />
      <line x1="140" y1="200" x2="280" y2="80" stroke="#fff" strokeWidth="1" opacity="0.06" />
      <circle cx="650" cy="100" r="60" fill="#fff" opacity="0.04" />
      <circle cx="700" cy="200" r="40" fill="#fff" opacity="0.03" />
    </svg>
  );
}

export function BannerDealer() {
  return (
    <svg viewBox="0 0 800 280" style={svgStyle} aria-hidden="true">
      <defs>
        <linearGradient id="gDealer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14648C" />
          <stop offset="100%" stopColor="#0d4a6a" />
        </linearGradient>
      </defs>
      <rect width="800" height="280" fill="url(#gDealer)" />
      <rect x="60" y="100" width="680" height="80" rx="40" fill="#fff" opacity="0.03" />
      <circle cx="150" cy="140" r="30" fill="#fff" opacity="0.05" />
      <circle cx="400" cy="140" r="30" fill="#fff" opacity="0.05" />
      <circle cx="650" cy="140" r="30" fill="#fff" opacity="0.05" />
      <line x1="180" y1="140" x2="370" y2="140" stroke="#fff" strokeWidth="1" opacity="0.06" />
      <line x1="430" y1="140" x2="620" y2="140" stroke="#fff" strokeWidth="1" opacity="0.06" />
    </svg>
  );
}

export function BannerExporter() {
  return (
    <svg viewBox="0 0 800 280" style={svgStyle} aria-hidden="true">
      <defs>
        <linearGradient id="gExporter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8C5020" />
          <stop offset="100%" stopColor="#a05028" />
        </linearGradient>
      </defs>
      <rect width="800" height="280" fill="url(#gExporter)" />
      <path d="M0 200 Q200 120 400 180 Q600 240 800 160 L800 280 L0 280 Z" fill="#fff" opacity="0.04" />
      <circle cx="200" cy="80" r="50" fill="#fff" opacity="0.04" />
      <circle cx="600" cy="60" r="70" fill="#fff" opacity="0.03" />
    </svg>
  );
}

const BANNER_MAP = {
  carrier: BannerCarrier,
  insurance: BannerInsurance,
  fmcsa: BannerFMCSA,
  broker: BannerBroker,
  dealer: BannerDealer,
  exporter: BannerExporter,
};

export default BANNER_MAP;
