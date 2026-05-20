function Footer({ companyName, email, note, services, products }) {
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
                  <a href={product.href} target="_blank" rel="noreferrer">
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
          <p className="footer-title">Contact</p>
          <a href={`mailto:${email}`}>{email}</a>
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
