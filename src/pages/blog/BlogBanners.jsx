import React from 'react';

const svgStyle = { width: '100%', height: '100%', display: 'block' };

export function BannerCarrier() {
  return (
    <svg viewBox="0 0 1200 400" style={svgStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bgC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#2d2d4a" />
        </linearGradient>
        <filter id="gnC"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0" /></filter>
      </defs>
      <rect width="1200" height="400" fill="url(#bgC)" />
      {/* US map silhouette */}
      <path d="M200 180 Q300 140 450 160 T750 150 Q900 145 1000 200 L980 250 Q850 280 700 270 T400 260 Q250 250 200 180Z" fill="#fff" opacity="0.04" />
      {/* Route lines */}
      <g stroke="#D85A30" strokeWidth="1.5" fill="none" opacity="0.25">
        <path d="M250 200 Q450 100 700 180" strokeDasharray="2 4" />
        <path d="M700 180 Q850 220 1000 160" strokeDasharray="2 4" />
        <path d="M250 200 Q400 280 600 240" strokeDasharray="2 4" />
      </g>
      {/* City dots */}
      <g fill="#D85A30" opacity="0.4">
        <circle cx="250" cy="200" r="4" /><circle cx="700" cy="180" r="4" />
        <circle cx="1000" cy="160" r="4" /><circle cx="600" cy="240" r="4" />
      </g>
      {/* Highway */}
      <rect x="0" y="320" width="1200" height="50" fill="#000" opacity="0.2" />
      <line x1="0" y1="345" x2="1200" y2="345" stroke="#fff" strokeWidth="2" strokeDasharray="20 25" opacity="0.15" />
      {/* Truck silhouettes */}
      <g opacity="0.18">
        <rect x="120" y="290" width="180" height="30" rx="3" fill="#D85A30" />
        <rect x="120" y="270" width="180" height="20" rx="2" fill="#D85A30" opacity="0.7" />
        <circle cx="155" cy="325" r="10" fill="#fff" /><circle cx="265" cy="325" r="10" fill="#fff" />
      </g>
      <g opacity="0.13">
        <rect x="850" y="295" width="160" height="28" rx="3" fill="#D85A30" />
        <rect x="850" y="277" width="160" height="18" rx="2" fill="#D85A30" opacity="0.7" />
        <circle cx="880" cy="328" r="9" fill="#fff" /><circle cx="980" cy="328" r="9" fill="#fff" />
      </g>
      {/* Channel labels */}
      <g fontFamily="monospace" fontSize="11" fill="#fff" opacity="0.12" letterSpacing="2">
        <text x="60" y="50">SMS</text><text x="160" y="50">{'·'}</text>
        <text x="190" y="50">EMAIL</text><text x="290" y="50">{'·'}</text>
        <text x="320" y="50">VOICE</text>
      </g>
      <text x="1140" y="380" textAnchor="end" fontFamily="monospace" fontSize="14" fill="#fff" opacity="0.15" fontWeight="500">{'y7°'}</text>
      <rect width="1200" height="400" filter="url(#gnC)" />
    </svg>
  );
}

export function BannerInsurance() {
  return (
    <svg viewBox="0 0 1200 400" style={svgStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bgI" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#993C1D" />
          <stop offset="100%" stopColor="#7A3017" />
        </linearGradient>
        <filter id="gnI"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" /></filter>
      </defs>
      <rect width="1200" height="400" fill="url(#bgI)" />
      {/* Ghost text */}
      <text x="600" y="280" textAnchor="middle" fontFamily="serif" fontSize="220" fill="#fff" opacity="0.04" fontWeight="900" letterSpacing="-5">$75,000</text>
      {/* Document 1 — back */}
      <g transform="translate(180, 80) rotate(-4)">
        <rect width="280" height="340" rx="4" fill="#fff" opacity="0.08" />
        <rect x="20" y="30" width="180" height="8" fill="#fff" opacity="0.12" />
        <rect x="20" y="50" width="240" height="3" fill="#fff" opacity="0.1" />
        <rect x="20" y="60" width="220" height="3" fill="#fff" opacity="0.1" />
        <rect x="20" y="90" width="100" height="3" fill="#fff" opacity="0.1" />
        <rect x="20" y="100" width="180" height="3" fill="#fff" opacity="0.1" />
        <rect x="20" y="140" width="240" height="3" fill="#fff" opacity="0.1" />
      </g>
      {/* Document 2 — ACORD 25 */}
      <g transform="translate(460, 60) rotate(2)">
        <rect width="280" height="340" rx="4" fill="#fff" opacity="0.11" />
        <text x="20" y="40" fontFamily="monospace" fontSize="14" fill="#fff" opacity="0.25" fontWeight="700">ACORD 25</text>
        <rect x="20" y="55" width="160" height="2" fill="#fff" opacity="0.2" />
        <rect x="20" y="80" width="120" height="3" fill="#fff" opacity="0.15" />
        <rect x="20" y="92" width="240" height="2" fill="#fff" opacity="0.12" />
        <rect x="20" y="100" width="220" height="2" fill="#fff" opacity="0.12" />
        <rect x="20" y="120" width="100" height="3" fill="#fff" opacity="0.15" />
        <rect x="20" y="160" width="240" height="2" fill="#fff" opacity="0.12" />
        {/* Stamp */}
        <circle cx="210" cy="260" r="48" fill="none" stroke="#fff" strokeWidth="2" opacity="0.2" />
        <circle cx="210" cy="260" r="40" fill="none" stroke="#fff" strokeWidth="1" opacity="0.15" />
        <text x="210" y="258" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#fff" opacity="0.3" fontWeight="700">CERTIFIED</text>
        <text x="210" y="272" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff" opacity="0.25">{'COI · 2026'}</text>
      </g>
      {/* Document 3 — front */}
      <g transform="translate(740, 90) rotate(-2)">
        <rect width="280" height="320" rx="4" fill="#fff" opacity="0.13" />
        <rect x="20" y="30" width="200" height="10" fill="#fff" opacity="0.18" />
        <rect x="20" y="60" width="240" height="3" fill="#fff" opacity="0.12" />
        <rect x="20" y="70" width="220" height="3" fill="#fff" opacity="0.12" />
        <rect x="20" y="100" width="100" height="3" fill="#fff" opacity="0.12" />
        <line x1="20" y1="270" x2="240" y2="270" stroke="#fff" strokeWidth="1" opacity="0.2" />
        <text x="20" y="288" fontFamily="monospace" fontSize="9" fill="#fff" opacity="0.2">AUTHORIZED REPRESENTATIVE</text>
      </g>
      <text x="1140" y="380" textAnchor="end" fontFamily="monospace" fontSize="14" fill="#fff" opacity="0.15" fontWeight="500">{'y7°'}</text>
      <rect width="1200" height="400" filter="url(#gnI)" />
    </svg>
  );
}

export function BannerFMCSA() {
  const checks = [0, 3, 5, 7, 8, 11, 13, 16, 19, 22];
  return (
    <svg viewBox="0 0 1200 400" style={svgStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bgF" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F6E56" />
          <stop offset="100%" stopColor="#0a4a3a" />
        </linearGradient>
        <filter id="gnF"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0" /></filter>
      </defs>
      <rect width="1200" height="400" fill="url(#bgF)" />
      {/* Vertical FMCSA */}
      <text x="80" y="320" fontFamily="serif" fontSize="180" fontWeight="900" fill="#fff" opacity="0.05" letterSpacing="-8" transform="rotate(-90 80 320)">FMCSA</text>
      {/* Seal */}
      <g transform="translate(880, 200)" opacity="0.1">
        <circle r="140" fill="none" stroke="#fff" strokeWidth="3" />
        <circle r="125" fill="none" stroke="#fff" strokeWidth="1" />
        <circle r="100" fill="none" stroke="#fff" strokeWidth="1" />
        <circle r="60" fill="none" stroke="#fff" strokeWidth="2" />
        <g stroke="#fff" strokeWidth="1">
          <line x1="0" y1="-100" x2="0" y2="-60" /><line x1="71" y1="-71" x2="42" y2="-42" />
          <line x1="100" y1="0" x2="60" y2="0" /><line x1="71" y1="71" x2="42" y2="42" />
          <line x1="0" y1="100" x2="0" y2="60" /><line x1="-71" y1="71" x2="-42" y2="42" />
          <line x1="-100" y1="0" x2="-60" y2="0" /><line x1="-71" y1="-71" x2="-42" y2="-42" />
        </g>
        <text textAnchor="middle" y="5" fontFamily="serif" fontSize="22" fill="#fff" fontWeight="900">FMCSA</text>
        <text textAnchor="middle" y="25" fontFamily="monospace" fontSize="9" fill="#fff">EST. 2000</text>
      </g>
      {/* Checkbox grid */}
      <g transform="translate(280, 100)">
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={i} transform={`translate(${(i % 6) * 36}, ${Math.floor(i / 6) * 36})`}>
            <rect width="24" height="24" rx="2" fill="none" stroke="#fff" strokeWidth="1" opacity="0.15" />
            {checks.includes(i) && <path d="M5 12 L10 17 L19 7" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />}
          </g>
        ))}
      </g>
      {/* Flag stripes */}
      <g transform="translate(1080, 30)" opacity="0.08">
        {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} y={i * 6} width="80" height="3" fill="#fff" />)}
      </g>
      {/* Regulatory strip */}
      <g transform="translate(0, 360)">
        <rect width="1200" height="40" fill="#000" opacity="0.2" />
        <text x="60" y="25" fontFamily="monospace" fontSize="11" fill="#fff" opacity="0.35" letterSpacing="2">
          {'49 CFR PART 387 · MC #1741537 · USDOT #4427359 · BMC-84 · BROKER AUTHORITY'}
        </text>
      </g>
      <text x="1140" y="350" textAnchor="end" fontFamily="monospace" fontSize="14" fill="#fff" opacity="0.15" fontWeight="500">{'y7°'}</text>
      <rect width="1200" height="400" filter="url(#gnF)" />
    </svg>
  );
}

export function BannerBroker() {
  return (
    <svg viewBox="0 0 1200 400" style={svgStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bgB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3c2878" />
          <stop offset="100%" stopColor="#5B3C96" />
        </linearGradient>
        <pattern id="dotsB" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1" fill="#fff" opacity="0.08" />
        </pattern>
        <filter id="gnB"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0" /></filter>
      </defs>
      <rect width="1200" height="400" fill="url(#bgB)" />
      <rect width="1200" height="400" fill="url(#dotsB)" />
      {/* Code background */}
      <g fontFamily="monospace" fontSize="10" fill="#fff" opacity="0.06">
        <text x="40" y="40">{'{ "event_type": "cd_export", "status": "queued", "idempotency_key": "a3f8b" }'}</text>
        <text x="40" y="60">{'INSERT INTO outbox_events (id, payload, created_at) VALUES (?, ?, NOW());'}</text>
        <text x="40" y="80">{'SELECT * FROM carrier_assignments WHERE load_id = \'TRC-04-FRD\' LIMIT 1;'}</text>
        <text x="40" y="350">{'async def process_outbox(): while True: events = await fetch_pending()'}</text>
        <text x="40" y="370">{'  try: await handler[e.type](e); await mark_complete(e.id)'}</text>
      </g>
      {/* Triangle */}
      <g transform="translate(600, 200)">
        <g stroke="#fff" strokeWidth="2" fill="none" opacity="0.18" strokeDasharray="4 4">
          <line x1="0" y1="-110" x2="-160" y2="80" />
          <line x1="0" y1="-110" x2="160" y2="80" />
          <line x1="-160" y1="80" x2="160" y2="80" />
        </g>
        <g fill="#fff" opacity="0.25">
          <polygon points="0,-100 -5,-90 5,-90" /><polygon points="-150,75 -160,68 -158,80" /><polygon points="155,80 165,75 158,88" />
        </g>
        <g>
          <circle cx="0" cy="-110" r="48" fill="#fff" opacity="0.12" />
          <circle cx="0" cy="-110" r="48" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
          <text x="0" y="-105" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#fff" opacity="0.5" fontWeight="700">BROKER</text>
        </g>
        <g>
          <circle cx="-160" cy="80" r="48" fill="#fff" opacity="0.12" />
          <circle cx="-160" cy="80" r="48" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
          <text x="-160" y="85" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#fff" opacity="0.5" fontWeight="700">CARRIER</text>
        </g>
        <g>
          <circle cx="160" cy="80" r="48" fill="#fff" opacity="0.12" />
          <circle cx="160" cy="80" r="48" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
          <text x="160" y="85" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#fff" opacity="0.5" fontWeight="700">SHIPPER</text>
        </g>
      </g>
      {/* Queue */}
      <g transform="translate(1000, 60)" opacity="0.18">
        {[0, 1, 2, 3, 4].map(i => <rect key={i} y={i * 18} width="120" height="14" rx="2" fill="#fff" />)}
        <text x="60" y="115" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff" opacity="0.6">OUTBOX QUEUE</text>
      </g>
      <text x="1140" y="380" textAnchor="end" fontFamily="monospace" fontSize="14" fill="#fff" opacity="0.15" fontWeight="500">{'y7°'}</text>
      <rect width="1200" height="400" filter="url(#gnB)" />
    </svg>
  );
}

export function BannerDealer() {
  return (
    <svg viewBox="0 0 1200 400" style={svgStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bgD" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14648C" />
          <stop offset="100%" stopColor="#0d4a6a" />
        </linearGradient>
        <filter id="gnD"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0" /></filter>
      </defs>
      <rect width="1200" height="400" fill="url(#bgD)" />
      {/* Parking lot grid */}
      <g stroke="#fff" strokeWidth="1" opacity="0.08">
        <line x1="0" y1="280" x2="1200" y2="280" /><line x1="0" y1="320" x2="1200" y2="320" />
        <line x1="0" y1="360" x2="1200" y2="360" />
        <line x1="100" y1="240" x2="50" y2="400" /><line x1="300" y1="240" x2="280" y2="400" />
        <line x1="500" y1="240" x2="520" y2="400" /><line x1="700" y1="240" x2="760" y2="400" />
        <line x1="900" y1="240" x2="1000" y2="400" /><line x1="1100" y1="240" x2="1240" y2="400" />
      </g>
      {/* Platform labels */}
      <g fontFamily="monospace" fontSize="14" fill="#fff" opacity="0.4" letterSpacing="3" fontWeight="700">
        <text x="60" y="55">COPART</text><text x="170" y="55" opacity="0.5">{'·'}</text>
        <text x="200" y="55">IAAI</text><text x="285" y="55" opacity="0.5">{'·'}</text>
        <text x="320" y="55">MANHEIM</text>
      </g>
      {/* Back row cars */}
      <g transform="translate(0, 200)" opacity="0.15">
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <g key={i} transform={`translate(${i * 145 + 30}, 0)`}>
            <rect y="10" width="100" height="40" rx="6" fill="#fff" />
            <rect y="0" x="15" width="70" height="20" rx="4" fill="#fff" />
            <rect x="20" y="5" width="60" height="13" rx="2" fill="#14648C" />
            <circle cx="22" cy="55" r="6" fill="#fff" /><circle cx="78" cy="55" r="6" fill="#fff" />
          </g>
        ))}
      </g>
      {/* Front row cars */}
      <g transform="translate(0, 290)" opacity="0.22">
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <g key={i} transform={`translate(${i * 175 + 20}, 0)`}>
            <rect y="14" width="135" height="55" rx="8" fill="#fff" />
            <rect x="20" y="0" width="95" height="28" rx="5" fill="#fff" />
            <rect x="26" y="6" width="83" height="18" rx="3" fill="#14648C" />
            <circle cx="28" cy="78" r="9" fill="#fff" /><circle cx="107" cy="78" r="9" fill="#fff" />
          </g>
        ))}
      </g>
      {/* Gate pass */}
      <g transform="translate(960, 90)" opacity="0.22">
        <rect width="200" height="100" rx="4" fill="#fff" />
        <g fill="#14648C">{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <circle key={i} cx="160" cy={10 + i * 10} r="2" />)}</g>
        <text x="15" y="22" fontFamily="monospace" fontSize="9" fill="#14648C" fontWeight="700">GATE PASS</text>
        <text x="15" y="38" fontFamily="monospace" fontSize="14" fill="#14648C" fontWeight="900">#GP-447821</text>
        <text x="15" y="55" fontFamily="monospace" fontSize="8" fill="#14648C">{'COPART · NJ'}</text>
        <text x="15" y="68" fontFamily="monospace" fontSize="8" fill="#14648C">LOT: 47281039</text>
        {/* Barcode */}
        <g fill="#14648C">
          {[0, 3, 5, 8, 10, 13, 16, 18, 21, 24, 26, 29, 32, 34, 37, 40, 42, 45, 48, 50, 53, 56, 58, 61, 64, 66, 69, 72, 74, 77].map((x, i) => (
            <rect key={i} x={15 + x} y="78" width={i % 3 === 0 ? 2 : 1} height="14" />
          ))}
        </g>
      </g>
      <text x="1140" y="380" textAnchor="end" fontFamily="monospace" fontSize="14" fill="#fff" opacity="0.18" fontWeight="500">{'y7°'}</text>
      <rect width="1200" height="400" filter="url(#gnD)" />
    </svg>
  );
}

export function BannerExporter() {
  return (
    <svg viewBox="0 0 1200 400" style={svgStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bgE" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8C5020" />
          <stop offset="100%" stopColor="#a05028" />
        </linearGradient>
        <filter id="gnE"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0" /></filter>
      </defs>
      <rect width="1200" height="400" fill="url(#bgE)" />
      {/* Globe */}
      <g transform="translate(150, 130)" opacity="0.12">
        <circle r="90" fill="none" stroke="#fff" strokeWidth="2" />
        <ellipse rx="90" ry="30" fill="none" stroke="#fff" strokeWidth="1" />
        <ellipse rx="60" ry="90" fill="none" stroke="#fff" strokeWidth="1" />
        <ellipse rx="30" ry="90" fill="none" stroke="#fff" strokeWidth="1" />
        <line x1="-90" y1="0" x2="90" y2="0" stroke="#fff" strokeWidth="1" />
        <path d="M-55-15Q-35-25-10-20L-5 5Q-25 15-50 5Z" fill="#fff" opacity="0.6" />
        <path d="M25-15Q45-20 60-10L55 8Q35 12 25 0Z" fill="#fff" opacity="0.6" />
        <path d="M-30-10Q10-55 40-8" fill="none" stroke="#D85A30" strokeWidth="2" opacity="0.7" strokeDasharray="3 3" />
        <circle cx="-30" cy="-10" r="3" fill="#D85A30" opacity="0.8" />
        <circle cx="40" cy="-8" r="3" fill="#D85A30" opacity="0.8" />
      </g>
      {/* Port labels */}
      <g fontFamily="monospace" fontSize="11" fill="#fff" opacity="0.35" letterSpacing="2" fontWeight="700">
        <text x="320" y="50">NEWARK</text><text x="425" y="50" opacity="0.5">{'·'}</text>
        <text x="445" y="50">HOUSTON</text><text x="555" y="50" opacity="0.5">{'·'}</text>
        <text x="575" y="50">SAVANNAH</text><text x="690" y="50" opacity="0.5">{'·'}</text>
        <text x="710" y="50">BRUNSWICK</text>
      </g>
      {/* Ocean waves */}
      <g stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.18">
        <path d="M0 285Q100 275 200 285T400 285T600 285T800 285T1000 285T1200 285" />
        <path d="M0 295Q100 305 200 295T400 295T600 295T800 295T1000 295T1200 295" opacity="0.5" />
      </g>
      {/* Ship */}
      <g transform="translate(380, 250)">
        <path d="M0 70L50 90L480 90L530 70L530 50L0 50Z" fill="#000" opacity="0.3" />
        <rect x="450" y="20" width="60" height="30" fill="#000" opacity="0.35" />
        <rect x="455" y="25" width="50" height="6" fill="#fff" opacity="0.3" />
        <g opacity="0.4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <rect key={`b${i}`} x={20 + i * 48} y="20" width="44" height="30" fill={['#D85A30', '#fff', '#a05028', '#fff', '#D85A30', '#fff', '#a05028', '#D85A30', '#fff'][i]} opacity="0.7" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <rect key={`t${i}`} x={45 + i * 48} y={-12} width="44" height="30" fill={['#fff', '#D85A30', '#fff', '#a05028', '#fff', '#D85A30', '#fff'][i]} opacity="0.6" />
          ))}
        </g>
      </g>
      {/* Container stack */}
      <g transform="translate(1000, 130)" opacity="0.2">
        <rect width="140" height="40" rx="2" fill="#fff" />
        <text x="70" y="25" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#a05028" fontWeight="700">40FT HC</text>
        <rect y="48" width="140" height="40" rx="2" fill="#fff" />
        <text x="70" y="73" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#a05028" fontWeight="700">20FT STD</text>
        <rect y="96" width="140" height="40" rx="2" fill="#fff" />
        <text x="70" y="121" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#a05028" fontWeight="700">RoRo</text>
      </g>
      <text x="1140" y="380" textAnchor="end" fontFamily="monospace" fontSize="14" fill="#fff" opacity="0.18" fontWeight="500">{'y7°'}</text>
      <rect width="1200" height="400" filter="url(#gnE)" />
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
