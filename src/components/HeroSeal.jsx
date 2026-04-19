import styles from './HeroSeal.module.css';

export default function HeroSeal({ size = 280, className = '' }) {
  const r = size / 2;
  const outerR = r * 0.82;
  const innerR = r * 0.76;
  const textR = r * 0.69;
  const fontSize = size * 0.35;
  const labelFs = size * 0.032;
  const dotR = size * 0.022;

  function circleText(text, startAngle, spacing) {
    return text.split('').map((ch, i) => {
      const angle = ((startAngle + i * spacing) * Math.PI) / 180;
      const x = r + textR * Math.cos(angle);
      const y = r + textR * Math.sin(angle);
      const rotation = startAngle + i * spacing + 90;
      return (
        <text
          key={i}
          x={x}
          y={y}
          fontSize={labelFs}
          fill="currentColor"
          opacity="0.3"
          textAnchor="middle"
          dominantBaseline="central"
          transform={`rotate(${rotation} ${x} ${y})`}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontWeight: 400 }}
        >
          {ch}
        </text>
      );
    });
  }

  return (
    <div className={`${styles.seal} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.svg}
        aria-hidden="true"
      >
        {/* Outer ring — slow rotation */}
        <g className={styles.ringOuter}>
          <circle cx={r} cy={r} r={outerR} fill="none" stroke="var(--color-accent, #993C1D)" strokeWidth={1.5} opacity={0.25} />
        </g>

        {/* Inner ring — slow counter-rotation */}
        <g className={styles.ringInner}>
          <circle cx={r} cy={r} r={innerR} fill="none" stroke="var(--color-accent, #993C1D)" strokeWidth={0.7} opacity={0.15} />
        </g>

        {/* Y7 text — static */}
        <text
          x={r * 0.92}
          y={r * 1.0}
          fontSize={fontSize}
          fontWeight="700"
          fill="currentColor"
          opacity="0.08"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: `-${size * 0.004}px` }}
        >
          Y7
        </text>

        {/* Dot with pulse */}
        <circle cx={r * 1.30} cy={r * 1.16} r={dotR * 2.5} fill="var(--color-accent, #993C1D)" opacity="0.08">
          <animate attributeName="r" values={`${dotR * 2.5};${dotR * 4};${dotR * 2.5}`} dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.08;0;0.08" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx={r * 1.30} cy={r * 1.16} r={dotR * 1.5} fill="var(--color-accent, #993C1D)" opacity="0.12">
          <animate attributeName="r" values={`${dotR * 1.5};${dotR * 3};${dotR * 1.5}`} dur="2.2s" repeatCount="indefinite" begin="0.3s" />
          <animate attributeName="opacity" values="0.12;0;0.12" dur="2.2s" repeatCount="indefinite" begin="0.3s" />
        </circle>
        <circle cx={r * 1.30} cy={r * 1.16} r={dotR} fill="var(--color-accent, #993C1D)" opacity="0.6">
          <animate attributeName="r" values={`${dotR};${dotR * 1.15};${dotR}`} dur="2.2s" repeatCount="indefinite" />
        </circle>

        {/* Curved text — rotates with outer ring */}
        <g className={styles.ringOuter}>
          {circleText("LICENSED FMCSA BROKER", -110, 10.5)}
          {circleText("MC #1741537", 110, 10.5)}
        </g>
      </svg>
    </div>
  );
}
