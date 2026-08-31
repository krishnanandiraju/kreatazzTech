import { navigateTo } from '../utils/navigation'

function Breadcrumbs({ items = [] }) {
  if (!items.length) {
    return null
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`}>
              {isLast || !item.href ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <a
                  href={item.href}
                  onClick={(event) => {
                    if (!item.href.startsWith('/')) {
                      return
                    }

                    event.preventDefault()
                    navigateTo(item.href)
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
