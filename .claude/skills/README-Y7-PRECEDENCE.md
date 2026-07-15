# Y7-WEBSITE design skill precedence rules

The design skills in this folder (ui-ux-pro-max, frontend-design, design-taste-frontend,
senior-frontend) are ADVISORY. Y7-WEBSITE invariants ALWAYS override skill suggestions:

1. NO Tailwind. Skills suggesting Tailwind classes: translate to inline styles / CSS modules.
2. theme.js is the single design-token source. New tokens go there, not into scattered hex values.
3. NO React.lazy — breaks Puppeteer prerender. No skill suggestion may introduce it.
4. Augment-don't-rewrite: the site ranks well and earns AI citations. Never cut or
   restructure existing ranking content/markup for aesthetic reasons — only augment.
5. Broker compliance in all copy suggestions: "Licensed & Bonded FMCSA Broker" only;
   never "Licensed & Insured", never carrier claims, never GPS/real-time tracking claims,
   never phone numbers.
6. New npm packages require explicit justification; prerender compatibility must be verified.
7. Locale parity: visual changes must render correctly on EN root and /ru/, /pl/, /ua/.

Usage order in design sprints:
- design-taste-frontend + frontend-design = taste/direction layer (read first)
- senior-frontend = pre-existing project skill, same layer; precedence rules apply to it too
- ui-ux-pro-max = data lookup layer (palettes, typography, UX rules via search.py)
