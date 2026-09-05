/**
 * Conservative, route-owned dependency discovery for sitemap <lastmod>.
 *
 * Deliberate policy: a route depends only on its own content component, its
 * colocated CSS module, and its own locale namespace. Port routes additionally
 * depend on the file-level port registry. Shared components, shared locale
 * namespaces, global chrome, public assets, and build tooling are excluded.
 * Search engines treat lastmod as a hint; preserving signal is more valuable
 * than reporting every generated-byte change.
 */
import {
  existsSync,
  readFileSync,
  statSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RESOLVE_EXTENSIONS = ['', '.js', '.jsx', '.mjs', '.css'];
const APP_FILE = 'src/App.jsx';
const PORT_DATA = 'src/pages/ports/portData.js';
const BLOG_ARTICLE_ROOT = 'src/pages/blog/BlogArticle.jsx';
const ROUTE_WRAPPERS = new Set(['LangGuard', 'ProtectedRoute', 'Navigate']);
const ROUTE_OWNED_NAMESPACES = new Map([
  ['/', 'home'],
  ['/services', 'services'],
  ['/dealers', 'dealers'],
  ['/exporters', 'exporters'],
  ['/ship-my-car', 'shipMycar'],
  ['/about', 'about'],
  ['/faq', 'faq'],
  ['/quote', 'quote'],
  ['/privacy', 'privacy'],
  ['/terms', 'terms'],
  ['/certificate-of-origin', 'certificateOfOrigin'],
  ['/ports/:slug', 'ports'],
]);

function fromRepoPath(relativePath) {
  return path.join(REPO_ROOT, ...relativePath.split('/'));
}

function toRepoPath(absolutePath) {
  return path.relative(REPO_ROOT, absolutePath).split(path.sep).join('/');
}

function isFile(file) {
  return existsSync(file) && statSync(file).isFile();
}

function resolveLocalImport(importer, rawSpecifier) {
  const specifier = rawSpecifier.split(/[?#]/, 1)[0];
  if (!specifier.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromRepoPath(importer)), specifier);
  const candidates = [
    ...RESOLVE_EXTENSIONS.map((extension) => `${base}${extension}`),
    ...RESOLVE_EXTENSIONS.slice(1).map((extension) => path.join(base, `index${extension}`)),
  ];
  const resolved = candidates.find(isFile);
  if (!resolved) throw new Error(`Could not resolve "${rawSpecifier}" from ${importer}`);
  return toRepoPath(resolved);
}

function directCssModules(componentFile) {
  const source = readFileSync(fromRepoPath(componentFile), 'utf8');
  const componentDirectory = path.posix.dirname(componentFile);
  const modules = new Set();
  const importPattern = /\bimport\s+(?:[\s\S]*?\s+from\s+)?(['"])([^'"]+\.module\.css)\1\s*;?/g;
  let match;
  while ((match = importPattern.exec(source))) {
    const resolved = resolveLocalImport(componentFile, match[2]);
    // Shared V2/style-system modules are intentionally outside content-lastmod.
    if (resolved && path.posix.dirname(resolved) === componentDirectory) modules.add(resolved);
  }
  return [...modules];
}

function directScriptImports(componentFile) {
  const source = readFileSync(fromRepoPath(componentFile), 'utf8');
  const imports = new Set();
  const pattern = /\bimport\s+(?:[\s\S]*?\s+from\s+)?(['"])([^'"]+)\1\s*;?/g;
  let match;
  while ((match = pattern.exec(source))) {
    const resolved = resolveLocalImport(componentFile, match[2]);
    if (resolved && /\.(?:js|jsx|mjs)$/.test(resolved)) imports.add(resolved);
  }
  return [...imports];
}

function literalTranslationNamespaces(files) {
  const namespaces = new Set();
  const pattern = /\buseTranslation\s*\(\s*(['"])([^'"]+)\1/g;
  for (const file of files) {
    const source = readFileSync(fromRepoPath(file), 'utf8');
    let match;
    while ((match = pattern.exec(source))) namespaces.add(match[2]);
    pattern.lastIndex = 0;
  }
  return namespaces;
}

function componentBindings(appSource) {
  const bindings = new Map();
  const patterns = [
    /\bimport\s+([A-Za-z_$][\w$]*)\s+from\s+(['"])([^'"]+)\2\s*;?/g,
    /\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*lazyWithRetry\(\(\)\s*=>\s*import\((['"])([^'"]+)\2\)\)\s*;?/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(appSource))) {
      const [, binding, , specifier] = match;
      const resolved = resolveLocalImport(APP_FILE, specifier);
      if (resolved) bindings.set(binding, resolved);
    }
  }
  return bindings;
}

function renderedComponent(elementSource) {
  const tags = [...elementSource.matchAll(/<([A-Z][\w$]*)\b/g)].map((match) => match[1]);
  return tags.find((tag) => !ROUTE_WRAPPERS.has(tag)) || null;
}

function routeComponentBindings(appSource) {
  const routes = new Map();

  function record(route, elementSource) {
    const binding = renderedComponent(elementSource);
    if (!binding) return;
    if (routes.has(route) && routes.get(route) !== binding) {
      throw new Error(
        `App route ${route} renders both ${routes.get(route)} and ${binding}; `
        + 'the sitemap dependency mapping cannot choose safely',
      );
    }
    routes.set(route, binding);
  }

  const literalPattern = /<Route\s+path="([^"]+)"\s+element=\{([\s\S]*?)\}\s*\/>/g;
  let match;
  while ((match = literalPattern.exec(appSource))) record(match[1], match[2]);

  const localizedPattern = /<Route\s+[^>]*path=\{`\/\$\{lang\}([^`]*)`\}\s+element=\{([\s\S]*?)\}\s*\/>/g;
  while ((match = localizedPattern.exec(appSource))) {
    record(`/:lang${match[1]}`, match[2]);
  }

  return routes;
}

/**
 * Fail closed when the maintained sitemap mapping no longer matches App.jsx.
 * App.jsx is validation input only: it never enters a route's lastmod set.
 */
export function validatePageSourceMappings(expectedMappings) {
  const appSource = readFileSync(fromRepoPath(APP_FILE), 'utf8');
  const bindings = componentBindings(appSource);
  const routes = routeComponentBindings(appSource);

  for (const [route, expectedFile] of Object.entries(expectedMappings)) {
    const binding = routes.get(route);
    if (!binding) throw new Error(`No rendered component found for App route ${route}`);
    const actualFile = bindings.get(binding);
    if (!actualFile) throw new Error(`No local component import found for ${binding} (${route})`);
    if (actualFile !== expectedFile) {
      throw new Error(
        `Stale sitemap page mapping for ${route}: expected ${expectedFile}, `
        + `App.jsx renders ${actualFile}`,
      );
    }

    const namespace = ownNamespace(route);
    if (namespace) {
      // /quote delegates its own namespace to directly rendered form/flow
      // components. Other route-owned namespaces are declared on the page root.
      const evidenceFiles = route.replace(/^\/:lang(?=\/|$)/, '') === '/quote'
        ? [actualFile, ...directScriptImports(actualFile)]
        : [actualFile];
      const usedNamespaces = literalTranslationNamespaces(evidenceFiles);
      if (!usedNamespaces.has(namespace)) {
        throw new Error(
          `Stale sitemap namespace mapping for ${route}: expected ${namespace}, `
          + `but it is not used by ${evidenceFiles.join(', ')}`,
        );
      }
    }
  }
}

function selectedBlogArticleComponent(route) {
  const slugMatch = route.match(/^\/blog\/([^/]+)$/);
  if (!slugMatch) return null;

  const slug = slugMatch[1];
  const source = readFileSync(fromRepoPath(BLOG_ARTICLE_ROOT), 'utf8');
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const entry = source.match(new RegExp(`['"]${escapedSlug}['"]\\s*:\\s*([\\w$]+)`));
  if (!entry) throw new Error(`No ARTICLE_COMPONENTS entry for blog route ${route}`);

  const binding = entry[1];
  const escapedBinding = binding.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const bindingImport = source.match(
    new RegExp(`import\\s+${escapedBinding}\\s+from\\s+(['"])([^'"]+)\\1`),
  );
  if (!bindingImport) throw new Error(`Could not find import for ${binding} (${route})`);
  return resolveLocalImport(BLOG_ARTICLE_ROOT, bindingImport[2]);
}

function stripLocale(route) {
  return route.replace(/^\/(?:pl|ua|ru|:lang)(?=\/|$)/, '') || '/';
}

function routeLocale(route) {
  return route.match(/^\/(pl|ua|ru)(?:\/|$)/)?.[1] || 'en';
}

function ownNamespace(route) {
  const base = stripLocale(route);
  const registryKey = /^\/ports\/(?:[^/]+|:slug)$/.test(base) ? '/ports/:slug' : base;
  return ROUTE_OWNED_NAMESPACES.get(registryKey) || null;
}

/**
 * Return a stable dependency set for a sitemap route.
 *
 * Blog detail routes use their selected article body rather than the shared
 * BlogArticle template, which prevents a template edit from declaring the
 * entire article archive updated. Their explicit dateISO is considered by the
 * sitemap generator separately.
 */
export function collectRouteContentDependencies(route, rootFile) {
  if (!rootFile || !isFile(fromRepoPath(rootFile))) {
    throw new Error(`Missing page source mapping for sitemap route ${route}`);
  }

  const selectedArticle = selectedBlogArticleComponent(route);
  const contentComponent = selectedArticle || rootFile;
  const files = new Set([contentComponent, ...directCssModules(contentComponent)]);
  const locale = routeLocale(route);
  const namespace = ownNamespace(route);
  const localeFile = namespace ? `src/locales/${locale}/${namespace}.json` : null;

  if (localeFile && !isFile(fromRepoPath(localeFile))) {
    throw new Error(`Missing ${localeFile} for route-owned namespace ${namespace}`);
  }
  if (localeFile) files.add(localeFile);

  if (/^(?:\/(?:pl|ua|ru))?\/ports\/[^/]+$/.test(route)) files.add(PORT_DATA);

  return {
    files: [...files].sort(),
    locale,
    namespaces: localeFile ? [namespace] : [],
  };
}
