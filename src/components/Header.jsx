import { useState } from 'react'
import { trackNavigation } from '../utils/analytics'
import { navigateTo } from '../utils/navigation'

function normalize(path) {
  if (!path) return '/'
  const withoutTrailing = path.endsWith('/') ? path.slice(0, -1) : path
  return withoutTrailing || '/'
}

function Header({ companyName, brandShort, logoMark, nav, currentPath, currentHash }) {
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

  const isActiveNavItem = (href) => {
    if (!href) return false

    if (href.includes('#')) {
      const [hrefPath, hrefHash] = href.split('#')
      const pathMatch = normalize(hrefPath || '/') === normalize(currentPath)
      const hashMatch = `#${hrefHash || ''}` === (currentHash || '')
      return pathMatch && hashMatch
    }

    return normalize(href) === normalize(currentPath)
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
                  className={isActiveNavItem(item.href) ? 'is-active' : ''}
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
