import { trackCTAClick } from '../utils/analytics'

function Hero({ content }) {
  const resolveInternalHref = (href) => {
    if (!href) {
      return href
    }

    if (href.startsWith('#')) {
      return `/${href}`
    }

    return href
  }

  const handlePrimaryCtaClick = (event) => {
    const resolvedHref = resolveInternalHref(content.primaryCta.href)
    trackCTAClick(content.primaryCta.label, 'hero', resolvedHref)

    if (resolvedHref?.startsWith('/')) {
      event.preventDefault()
      window.history.pushState({}, '', resolvedHref)
      window.dispatchEvent(new Event('locationchange'))
    }
  }

  const handleSecondaryCtaClick = (event) => {
    const resolvedHref = resolveInternalHref(content.secondaryCta.href)
    trackCTAClick(content.secondaryCta.label, 'hero', resolvedHref)

    if (resolvedHref?.startsWith('/')) {
      event.preventDefault()
      window.history.pushState({}, '', resolvedHref)
      window.dispatchEvent(new Event('locationchange'))
    }
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="hero-title">{content.headline}</h1>
          <p className="hero-copy">{content.subheadline}</p>
          {content.proofLine ? <p className="hero-proof">{content.proofLine}</p> : null}

          <div className="hero-actions">
            <a className="btn btn-primary" href={content.primaryCta.href} onClick={handlePrimaryCtaClick}>
              {content.primaryCta.label}
            </a>
            <a className="btn btn-secondary" href={content.secondaryCta.href} onClick={handleSecondaryCtaClick}>
              {content.secondaryCta.label}
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Operational intelligence highlights">
          <div className="hero-visual hero-visual-framework" aria-hidden="true">
            <img src={content.image} alt="" loading="eager" />
          </div>
          <p className="hero-supporting-copy">{content.supportingCopy}</p>
          <p className="hero-closing-line">{content.closingLine}</p>
        </aside>
      </div>
    </section>
  )
}

export default Hero
