function ServiceCard({ title, description, image, href }) {
  const CardTag = href ? 'a' : 'article'

  return (
    <CardTag className={`service-card ${href ? 'service-card-link' : ''}`} href={href}>
      <div className="service-visual" aria-hidden="true">
        <img src={image} alt="" loading="lazy" />
        <span className="media-overlay" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </CardTag>
  )
}

export default ServiceCard
