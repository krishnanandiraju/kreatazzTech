import { trackServiceInteraction } from '../utils/analytics'

function ServiceCard({ title, description, image, href }) {
  const handleServiceClick = (event) => {
    if (!href) {
      return
    }

    trackServiceInteraction(title, 'click')

    if (href.startsWith('/')) {
      event.preventDefault()
      window.history.pushState({}, '', href)
      window.dispatchEvent(new Event('locationchange'))
    }
  }

  const CardTag = href ? 'a' : 'article'

  return (
    <CardTag className={`service-card ${href ? 'service-card-link' : ''}`} href={href} onClick={handleServiceClick}>
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
