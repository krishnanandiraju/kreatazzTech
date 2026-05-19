function Header({ companyName, brandShort, brandMark, nav }) {
  return (
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <a href="#top" className="brand" aria-label={`${companyName} home`}>
          <span className="brand-mark" aria-hidden="true">
            {brandMark}
          </span>
          <span className="brand-text">{brandShort}</span>
        </a>

        <nav aria-label="Primary">
          <ul className="nav-list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
