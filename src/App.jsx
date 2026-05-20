import { useEffect, useMemo, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import LegacyPage from './pages/LegacyPage'
import { blogPosts, blogPostBySlug } from './data/blogPosts'
import { legacyPageBySlug } from './data/legacyPages'
import { siteContent } from './data/siteContent'
import Home from './pages/Home'

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/'

  const trimmed = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  return trimmed || '/'
}

function getRoute(pathname) {
  const normalized = normalizePathname(pathname)

  if (normalized === '/') {
    return { type: 'home' }
  }

  if (normalized === '/blog') {
    return { type: 'blog-list' }
  }

  if (normalized.startsWith('/blog/')) {
    return { type: 'blog-post', slug: normalized.replace('/blog/', '') }
  }

  return { type: 'legacy-page', slug: normalized.replace(/^\//, '') }
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationUpdate = () => {
      setPathname(window.location.pathname)

      if (window.location.hash) {
        const target = document.querySelector(window.location.hash)

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }

      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', onLocationUpdate)
    window.addEventListener('locationchange', onLocationUpdate)

    return () => {
      window.removeEventListener('popstate', onLocationUpdate)
      window.removeEventListener('locationchange', onLocationUpdate)
    }
  }, [])

  const route = useMemo(() => getRoute(pathname), [pathname])

  const navItems = useMemo(() => {
    if (route.type === 'home') {
      return siteContent.nav
    }

    return siteContent.nav.map((item) => ({
      ...item,
      href: item.href.startsWith('#') ? `/${item.href}` : item.href,
    }))
  }, [route.type])

  return (
    <>
      <Header
        companyName={siteContent.companyName}
        brandShort={siteContent.brandShort}
        logoMark={siteContent.brand.logoMark}
        nav={navItems}
      />

      {route.type === 'home' ? <Home content={siteContent} blogPosts={blogPosts} /> : null}

      {route.type === 'blog-list' ? <BlogListPage posts={blogPosts} /> : null}

      {route.type === 'blog-post' ? <BlogPostPage post={blogPostBySlug[route.slug]} /> : null}

      {route.type === 'legacy-page' ? <LegacyPage page={legacyPageBySlug[route.slug]} /> : null}

      <Footer
        companyName={siteContent.companyName}
        email={siteContent.email}
        note={siteContent.footer.note}
        services={siteContent.footer.services}
        products={siteContent.footer.products}
      />
    </>
  )
}

export default App
