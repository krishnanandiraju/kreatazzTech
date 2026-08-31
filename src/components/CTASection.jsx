import { trackFormSubmission, trackCTAClick } from '../utils/analytics'

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
  const handleEmailClick = () => {
    trackFormSubmission('contact_email', email)
  }

  const handleSecondaryCtaClick = () => {
    trackCTAClick(secondaryCtaLabel, 'cta-section', secondaryCtaHref)
  }

  return (
    <section id={id} className="contact" aria-labelledby="contact-title">
      <div className="shell contact-wrap">
        <div className="contact-copy">
          <h2 id="contact-title">{title}</h2>
          <p>{text}</p>
          <ul className="contact-meta">
            <li>{email}</li>
            {phone ? <li>{phone}</li> : null}
            <li>{location}</li>
          </ul>
        </div>
        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${email}`} onClick={handleEmailClick}>
            {ctaLabel}
          </a>
          <a className="btn btn-secondary" href={secondaryCtaHref} onClick={handleSecondaryCtaClick}>
            {secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection
