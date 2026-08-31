import { useMemo } from 'react'

function StickySubNav({ items = [] }) {
  const validItems = useMemo(
    () => items.filter((item) => item && item.label && item.href),
    [items],
  )

  if (!validItems.length) {
    return null
  }

  return (
    <nav className="sticky-subnav" aria-label="Section shortcuts">
      <div className="shell sticky-subnav-inner">
        {validItems.map((item) => (
          <a key={item.href} href={item.href} className="sticky-subnav-link">
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default StickySubNav
