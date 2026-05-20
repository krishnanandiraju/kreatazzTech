function CTASection({
  id,
  title,
  text,
  ctaLabel,
  secondaryCtaLabel,
  secondaryCtaHref,
  email,
  phone,
  location,
}) {
  return (
    <section id={id} className="contact" aria-labelledby="contact-title">
      <div className="shell contact-wrap">
        <div className="contact-copy">
          <h2 id="contact-title">{title}</h2>
          <p>{text}</p>
          <ul className="contact-meta">
            <li>{email}</li>
            <li>{phone}</li>
            <li>{location}</li>
          </ul>
        </div>
        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${email}`}>
            {ctaLabel}
          </a>
          <a className="btn btn-secondary" href={secondaryCtaHref}>
            {secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection
