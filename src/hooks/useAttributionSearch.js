import { useEffect, useState } from 'react';

// [WEBFIX-T05/T07] window.location.search, but only AFTER hydration.
//
// An href computed during render is baked into the prerender snapshot with an
// empty query (the snapshot has none), and React does not reconcile attribute
// mismatches while hydrating - so a link that read the live search in render
// would keep the snapshot's UTM-less href. Reading it in an effect makes the
// update a normal re-render, which does patch the attribute. Static links
// (<Link to> / <a href>) use this; click handlers read the live URL directly.
export default function useAttributionSearch() {
  const [search, setSearch] = useState('');
  useEffect(() => {
    setSearch(window.location.search || '');
  }, []);
  return search;
}
