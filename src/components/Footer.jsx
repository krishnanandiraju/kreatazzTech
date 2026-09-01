import { trackExternalLinkClick, trackFormSubmission } from '../utils/analytics'
import { navigateTo } from '../utils/navigation'

function Footer({ companyName, email, note, services, products, quickLinks = [] }) {
  const handleProductLinkClick = (productLabel, productHref) => {
    trackExternalLinkClick(productLabel, productHref, 'product')
  }

  const handleEmailClick = () => {
    trackFormSubmission('contact_email_footer', email)
  }

  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <p className="footer-title">{companyName}</p>
          <p>{note}</p>
        </div>
        <div>
          <p className="footer-title">Services</p>
          <ul className="footer-list">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Products</p>
          <ul className="footer-list">
            {products.map((product) => (
              <li key={product.label}>
                {product.href ? (
                  <a href={product.href} target="_blank" rel="noreferrer" onClick={() => handleProductLinkClick(product.label, product.href)}>
                    {product.label}
                  </a>
                ) : (
                  <span>{product.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Quick Links</p>
          <ul className="footer-list">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    if (!link.href.startsWith('/')) {
                      return
                    }

                    event.preventDefault()
                    navigateTo(link.href)
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Contact</p>
          <a href={`mailto:${email}`} onClick={handleEmailClick}>{email}</a>
        </div>
      </div>
      <div className="shell footer-copy">
        <small>
          © {new Date().getFullYear()} {companyName}
        </small>
      </div>
    </footer>
  )
}

export default Footer
