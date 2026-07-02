import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  // Browser app code (src/)
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Ignore unused args/vars prefixed with underscore (convention for
      // intentionally-unused parameters like callback signatures). Capitalized
      // names are ignored in both positions because core no-unused-vars cannot
      // see JSX element usage (<Tag />, <Motion.div />) — components must be
      // capitalized, so the pattern covers them (same reason framer-motion is
      // imported as `motion as Motion`).
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_|^[A-Z]',
      }],
      // react-hooks v6 "compiler" advisory rules (2026-07): they flag real
      // but non-breaking perf patterns (sync setState in effects, ref writes
      // during render) across the existing portal auth/payment flows.
      // Refactoring those flows needs tests first, so keep the signals
      // visible as warnings without failing the build. Revisit when the
      // portal gets test coverage.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
    },
  },

  // Node-side scripts + server — use node globals, not browser.
  // Note: scripts/prerender.mjs inlines browser code that runs inside the
  // puppeteer page context via page.evaluate(), so we also allow a small
  // set of browser globals for that scenario.
  {
    files: ['server.js', 'scripts/**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        document: 'readonly',
        window: 'readonly',
        requestAnimationFrame: 'readonly',
      },
    },
  },
])
