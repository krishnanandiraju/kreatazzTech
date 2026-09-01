export function navigateTo(href) {
  if (!href || typeof window === 'undefined') {
    return
  }

  window.history.pushState({}, '', href)
  window.dispatchEvent(new Event('locationchange'))
}

export function resolveInternalHref(href) {
  if (!href) {
    return href
  }

  if (href.startsWith('#')) {
    return `/${href}`
  }

  return href
}
