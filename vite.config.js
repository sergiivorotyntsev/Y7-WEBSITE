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
        manualChunks(id) {
          // node_modules split into focused vendor bundles
          if (id.includes('node_modules')) {
            // three.js — its own chunk so it stays lazy (only the DaytonaCargo
            // LP dynamic-imports it; never loaded on other pages).
            if (id.includes('node_modules/three')) return 'three';
            if (id.includes('react-router')) return 'react-router';
            if (id.includes('react-helmet-async')) return 'helmet';
            if (id.includes('i18next')) return 'i18n';
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor';
            return 'vendor';
          }

          // CWV-T03: blog article BODIES are leaf content (statically imported by
          // the lazy BlogArticle page for prerender; never reachable from the entry),
          // so grouping them is safe and keeps them out of the BlogArticle chunk.
          if (id.includes('/src/pages/blog/articles/')) return 'blog-articles';

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
  },
})
