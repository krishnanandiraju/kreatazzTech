import { useState } from 'react'
import { trackNavigation } from '../utils/analytics'
import { navigateTo } from '../utils/navigation'

function Header({ companyName, brandShort, logoMark, nav }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigateInternal = (event, href, label = '') => {
    if (!href?.startsWith('/')) {
      return
    }

    event.preventDefault()
    const currentPage = window.location.pathname
    trackNavigation(currentPage, href)
    navigateTo(href)
  }

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  return (
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <a
          href="/"
          className="brand"
          aria-label={`${companyName} home`}
          onClick={(event) => {
            handleNavClick()
            navigateInternal(event, '/', 'logo')
          }}
        >
          <img
            className="brand-mark"
            src={logoMark}
            alt=""
            aria-hidden="true"
            loading="eager"
          />
          <span className="brand-text-wrap">
            <span className="brand-text">{brandShort}</span>
            <span className="brand-company">{companyName}</span>
          </span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>

        <nav id="primary-nav" aria-label="Primary" className={menuOpen ? 'nav-open' : ''}>
          <ul className="nav-list">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    handleNavClick()
                    navigateInternal(event, item.href, item.label)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
