function CTASection({ id, title, text, ctaLabel, email }) {
  return (
    <section id={id} className="contact" aria-labelledby="contact-title">
      <div className="shell contact-wrap">
        <div>
          <h2 id="contact-title">{title}</h2>
          <p>{text}</p>
        </div>
        <a className="btn btn-primary" href={`mailto:${email}`}>
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}

export default CTASection
