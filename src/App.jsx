import { useEffect, useMemo, useState } from 'react'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
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
  const [hash, setHash] = useState(window.location.hash)
  const [search, setSearch] = useState(window.location.search)

  useEffect(() => {
    const onLocationUpdate = () => {
      setPathname(window.location.pathname)
      setHash(window.location.hash)
      setSearch(window.location.search)

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

  useEffect(() => {
    const defaultTitle = 'Kreatazz | Operational Intelligence Company'
    const defaultDescription =
      'Kreatazz helps organizations operationalize AI through workflow intelligence, data platforms, and enterprise execution systems.'

    const legacyPage = route.type === 'legacy-page' ? legacyPageBySlug[route.slug] : null
    const blogPost = route.type === 'blog-post' ? blogPostBySlug[route.slug] : null

    const titleByRoute = {
      home: defaultTitle,
      'blog-list': 'Blog | Kreatazz Insights',
      industries: 'Industries | Operational Intelligence by Kreatazz',
      solutions: 'Solutions | Kreatazz Capabilities',
    }

    let title = titleByRoute[route.type] || defaultTitle
    let description = defaultDescription

    if (route.type === 'blog-post' && blogPost) {
      title = `${blogPost.title} | Kreatazz Blog`
      description = blogPost.excerpt
    }

    if (route.type === 'legacy-page' && legacyPage) {
      title = `${legacyPage.title} | Kreatazz`
      description = legacyPage.intro
    }

    const canonicalHref = `${window.location.origin}${pathname}${search}`

    const upsertMetaByName = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const upsertMetaByProperty = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    let canonicalTag = document.querySelector('link[rel="canonical"]')
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.setAttribute('href', canonicalHref)

    document.title = title
    upsertMetaByName('description', description)
    upsertMetaByName('robots', 'index,follow,max-image-preview:large')
    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:title', title)
    upsertMetaByName('twitter:description', description)

    upsertMetaByProperty('og:type', 'website')
    upsertMetaByProperty('og:title', title)
    upsertMetaByProperty('og:description', description)
    upsertMetaByProperty('og:url', canonicalHref)
    upsertMetaByProperty('og:site_name', 'Kreatazz')
  }, [route, pathname, search])

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
        currentPath={pathname}
        currentHash={hash}
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
        quickLinks={siteContent.footer.quickLinks}
      />

      <FloatingCTA />
    </>
  )
}

export default App
