export function isExternalHref(href?: string | null) {
  if (!href) return false;

  return /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(href) || /^(?:mailto|tel):/i.test(href);
}

export function externalLinkProps(href?: string | null) {
  if (!isExternalHref(href)) return {};

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}
