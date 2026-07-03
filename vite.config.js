import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// P1-TECH-T02: code-split the bundle via rollup manualChunks.
// Approach:
//   - function form of manualChunks, so we don't have to enumerate every
//     portal/SEO/blog file individually (ids are matched by substring)
//   - vendor chunks for react/router and i18n (cached long-term)
//   - rarely-together chunks for portal, SEO, and blog articles
//   - keep prerender-safe (no React.lazy)
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    // CWV-T02: stop emitting speculative <link rel="modulepreload"> for heavy,
    // non-home async route chunks (portal/intl/blog-articles/seo-*). Vite/Rolldown
    // was preloading ~1 MB of route JS into every page's <head>. resolveDependencies
    // is called for the entry HTML and each dynamic import; we drop the heavy
    // route chunks from preload lists while keeping shared vendors (react/i18n/
    // helmet) preloaded. Does not affect actual on-demand loading when a route is
    // visited — only removes the wasteful up-front hints.
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((d) => !/(?:^|\/)(portal|intl|blog-articles|seo-(?:service|location|route|guide))-/.test(d)),
    },
    rollupOptions: {
      output: {
        // PSIFIX-T01: manualChunks -> advancedChunks. Under Vite 8/Rolldown the
        // function-form manualChunks group RECURSIVELY captures a matched module's
        // dependencies (rolldown manual-code-splitting semantics), so the forced
        // 'blog-articles' group swallowed react-router + react/jsx-runtime — no
        // react-router chunk was emitted and the ENTRY statically imported
        // blog-articles-*.js (63 KiB gz, ~90% article prose) on every page.
        // Explicit groups with priorities fix it: a higher-priority group claims
        // its modules FIRST and "modules of that group will be removed from other
        // groups" (rolldown docs), so every node_modules dependency is captured
        // by a vendor group (priority >= 20) before blog-articles (10) can
        // recursively swallow it. The article bodies import only react +
        // react-router-dom, both covered.
        advancedChunks: {
          groups: [
            // three.js — its own chunk so it stays lazy (only the DaytonaCargo
            // LP dynamic-imports it; never loaded on other pages).
            { name: 'three', test: /node_modules[\\/]three[\\/]/, priority: 50 },
            // react-router before react-vendor: 'react-router(-dom)' also matches
            // the react-vendor test, priority breaks the tie the same way the old
            // if-order did.
            { name: 'react-router', test: /node_modules[\\/]react-router/, priority: 45 },
            { name: 'helmet', test: /node_modules[\\/]react-helmet-async[\\/]/, priority: 44 },
            { name: 'i18n', test: /i18next/, priority: 43 },
            { name: 'react-vendor', test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/, priority: 42 },
            { name: 'vendor', test: /node_modules[\\/]/, priority: 20 },
            // CWV-T03: blog article BODIES are leaf content (statically imported by
            // the lazy BlogArticle page for prerender; never reachable from the
            // entry), grouped so they stay out of the BlogArticle chunk.
            {
              name: 'blog-articles',
              test: /[\\/]src[\\/]pages[\\/]blog[\\/]articles[\\/]/,
              priority: 10,
            },
          ],
        },

        // NOTE: the former page-category grouping (portal/seo/intl/'chrome') was
        // removed. Forcing route pages into named chunks made Rolldown absorb
        // SHARED components (e.g. LanguageSwitcher, imported by both the global
        // Header and the intl pages) INTO a route chunk, turning that whole route
        // (intl: 9 pages, 305 KiB JS + 49 KiB CSS) into a synchronous dependency
        // of EVERY page — render-blocking on home. Letting Rolldown auto-split the
        // remaining app code hoists shared modules to a common chunk and keeps
        // route-only code in per-route async chunks, so nothing leaks onto home.
      },
    },
  },
})
