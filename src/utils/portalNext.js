// CO5W-T03: the internal-return-path guard, extracted.
//
// CO3W-T05 put this predicate inline in the portal Login screen so a magic
// deep link could survive a login round-trip. The session-expired screen needs
// the identical rule, and a second copy of a security predicate is how the two
// drift apart — so both now read this one definition.
//
// The rule: only in-app portal paths pass. A protocol-relative "//evil.com"
// starts with a slash and would otherwise sail through startsWith('/portal')
// checks on some parsers, so it is rejected explicitly; absolute URLs
// ("https://…", "javascript:…") never match the prefix in the first place.

export function internalNextPath(raw) {
  const s = String(raw || '');
  return s.startsWith('/portal') && !s.startsWith('//') ? s : null;
}

// Build the login href that returns the customer to `pathname + search`.
// Falls back to a bare /portal/login when the target is not an internal
// portal path — never round-trips something we would refuse to honor.
export function loginHrefFor(pathname, search = '') {
  const next = internalNextPath(`${pathname || ''}${search || ''}`);
  return next ? `/portal/login?next=${encodeURIComponent(next)}` : '/portal/login';
}
