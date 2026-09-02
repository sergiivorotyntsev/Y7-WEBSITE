import { useSyncExternalStore } from 'react';

// [WEBFIX-T05/T07] window.location.search as an external store, with an empty
// "server" snapshot.
//
// The prerender pass runs at a URL with no query, so the snapshot's hrefs are
// baked in empty; on the real visit main.jsx createRoot()s over the snapshot
// and the first client render already reads the live value - which is what
// puts utm_* / gclid / fbclid onto a static <a href> / <Link to>. The empty
// server snapshot is what a hydrateRoot() would need to match the markup, so
// the hook stays correct if the entry point ever changes. Click handlers do
// not need this; they read the live URL at click time.
const subscribe = (onChange) => {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
};
const getSnapshot = () => window.location.search;
const getServerSnapshot = () => '';

export default function useAttributionSearch() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
