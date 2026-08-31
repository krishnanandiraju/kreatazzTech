import { useEffect, useMemo, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import IndustriesPage from './pages/IndustriesPage'
import LegacyPage from './pages/LegacyPage'
import SolutionsPage from './pages/SolutionsPage'
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

  if (normalized === '/industries') {
    return { type: 'industries' }
  }

  if (normalized === '/solutions') {
    return { type: 'solutions' }
  }

  if (normalized.startsWith('/blog/')) {
    return { type: 'blog-post', slug: normalized.replace('/blog/', '') }
  }

  return { type: 'legacy-page', slug: normalized.replace(/^\//, '') }
}

function toAbsoluteUrl(href) {
  if (!href) {
    return window.location.origin
  }

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href
  }

  return `${window.location.origin}${href}`
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

  const breadcrumbs = useMemo(() => {
    if (route.type === 'home') {
      return []
    }

    if (route.type === 'blog-list') {
      return [
        { label: 'Home', href: '/' },
        { label: 'Blog' },
      ]
    }

    if (route.type === 'blog-post') {
      const post = blogPostBySlug[route.slug]
      return [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog/' },
        { label: post?.title || 'Article' },
      ]
    }

    if (route.type === 'industries') {
      return [
        { label: 'Home', href: '/' },
        { label: 'Industries' },
      ]
    }

    if (route.type === 'solutions') {
      return [
        { label: 'Home', href: '/' },
        { label: 'Solutions' },
      ]
    }

    if (route.type === 'legacy-page') {
      const page = legacyPageBySlug[route.slug]
      return [
        { label: 'Home', href: '/' },
        { label: page?.title || 'Page' },
      ]
    }

    return []
  }, [route])

  useEffect(() => {
    const schemaScriptId = 'kz-breadcrumb-schema'
    const existingScript = document.getElementById(schemaScriptId)

    if (existingScript) {
      existingScript.remove()
    }

    const trail = breadcrumbs.length ? breadcrumbs : [{ label: 'Home', href: '/' }]
    const currentUrl = toAbsoluteUrl(window.location.pathname + window.location.search)

    const itemListElement = trail.map((item, index) => {
      const isLast = index === trail.length - 1
      const itemUrl = !isLast && item.href ? toAbsoluteUrl(item.href) : currentUrl

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: itemUrl,
      }
    })

    const script = document.createElement('script')
    script.id = schemaScriptId
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    })

    document.head.appendChild(script)
  }, [breadcrumbs, pathname])

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

      {route.type === 'blog-list' ? <BlogListPage posts={blogPosts} breadcrumbs={breadcrumbs} /> : null}

      {route.type === 'blog-post' ? <BlogPostPage post={blogPostBySlug[route.slug]} breadcrumbs={breadcrumbs} /> : null}

      {route.type === 'industries' ? <IndustriesPage items={siteContent.industries.items} breadcrumbs={breadcrumbs} /> : null}

      {route.type === 'solutions' ? <SolutionsPage items={siteContent.services.items} breadcrumbs={breadcrumbs} /> : null}

      {route.type === 'legacy-page' ? <LegacyPage page={legacyPageBySlug[route.slug]} breadcrumbs={breadcrumbs} /> : null}

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
