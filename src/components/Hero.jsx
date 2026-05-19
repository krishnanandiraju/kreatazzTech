function Hero({ content }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="hero-title">{content.headline}</h1>
          <p className="hero-copy">{content.subheadline}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href={content.primaryCta.href}>
              {content.primaryCta.label}
            </a>
            <a className="btn btn-secondary" href={content.secondaryCta.href}>
              {content.secondaryCta.label}
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Delivery highlights">
          <h2>{content.panelTitle}</h2>
          <ul>
            {content.stats.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default Hero
