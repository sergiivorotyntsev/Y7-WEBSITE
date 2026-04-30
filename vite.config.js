import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Chunks loaded via React.lazy() — downloaded on-demand when user navigates
// to that route, NOT preloaded on initial HTML. Mirrors manualChunks names.
const LAZY_ROUTE_CHUNKS = [
  'portal',
  'intl',
  'blog-articles',
  'seo-guide',
  'seo-service',
  'seo-location',
  'seo-route',
];

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
    modulePreload: {
      polyfill: true,
      resolveDependencies: (_filename, deps) => {
        return deps.filter(dep => {
          const isLazy = LAZY_ROUTE_CHUNKS.some(name =>
            dep.includes(`/${name}-`) || dep.endsWith(`/${name}.js`)
          );
          return !isLazy;
        });
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // node_modules split into focused vendor bundles
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'react-router';
            if (id.includes('react-helmet-async')) return 'helmet';
            if (id.includes('i18next')) return 'i18n';
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor';
            return 'vendor';
          }

          // Blog article bodies — only loaded when viewing /blog/:slug
          if (id.includes('/src/pages/blog/articles/')) return 'blog-articles';

          // Portal pages — only loaded for authenticated users
          if (id.includes('/src/pages/portal/')) return 'portal';

          // SEO landing pages — grouped by category for shared-chunk benefits
          // when a visitor browses similar topics.
          if (id.includes('/src/pages/seo/locations/')) return 'seo-location';
          if (id.includes('/src/pages/seo/routes/')) return 'seo-route';
          if (id.includes('/src/pages/seo/guides/')) return 'seo-guide';
          if (id.includes('/src/pages/seo/')) return 'seo-service';

          // Intl landing pages — one chunk per locale
          if (id.includes('/src/pages/intl/')) return 'intl';
        },
      },
    },
  },
})
