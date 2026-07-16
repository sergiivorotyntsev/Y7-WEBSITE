import Reveal from './Reveal/Reveal';

/* DESIGN-V2-W2-T10 blocker fix — ScrollReveal is now a thin delegate to Reveal.
 *
 * The old implementation was hidden-by-default (inline opacity:0 until an
 * IntersectionObserver fired) with NO __Y7_PRERENDER/__Y7_STATIC_SHOWN gates.
 * Consequence: prerendered snapshots carried 6 mid-page sections with inline
 * opacity:0 — invisible without JS. That violates the Reveal Gate Rule
 * (DESIGN.md §6, "hard technical law") and was a pre-existing V1 defect that
 * W2 verification surfaced. It also used a 20px rise (law caps entrances at
 * 16px). Reveal is visible-by-default (base opacity 1; the entrance animation
 * is a progressive enhancement added on scroll-into-view) and carries both
 * prerender gates, so snapshots bake at rest and no-JS renders everything.
 */
export default function ScrollReveal({ children, delay = 0, style, ...rest }) {
  return (
    <Reveal delay={delay} style={style} {...rest}>
      {children}
    </Reveal>
  );
}
