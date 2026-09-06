import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { blogPosts } from '../src/data/blogPosts.js'
import { legacyPages } from '../src/data/legacyPages.js'

const siteUrl = 'https://kreatazz.tech'
const siteReleaseDate = '2026-09-06'
const distDirectory = path.resolve('dist')
const appShellPath = path.join(distDirectory, 'index.html')
const sitemapPath = path.join(distDirectory, 'sitemap.xml')

const [appShell, existingSitemap] = await Promise.all([
  readFile(appShellPath, 'utf8'),
  readFile(sitemapPath, 'utf8'),
])

const sitemapRoutes = [...existingSitemap.matchAll(/<loc>https:\/\/kreatazz\.tech([^<]*)<\/loc>/g)]
  .map((match) => match[1] || '/')

const routeOverrides = {
  '/': {
    title: 'Operational Intelligence Consulting in India | Kreatazz',
    description:
      'Kreatazz helps enterprises in India operationalize AI through intelligent workflows, data platforms, engineering systems, and human-centered execution.',
    schemaType: 'WebSite',
  },
  '/about/': {
    title: 'About Kreatazz Innovation Technology Solutions',
    description:
      'Learn how Kreatazz Innovation Technology Solutions helps enterprises connect AI, knowledge, workflows, systems, and people for reliable execution.',
  },
  '/blog/': {
    title: 'Operational Intelligence Insights | Kreatazz Blog',
    description:
      'Practical guidance on AI adoption, manufacturing intelligence, workflow modernization, engineering systems, workforce visibility, and cloud execution.',
    schemaType: 'CollectionPage',
  },
  '/industries/': {
    title: 'Operational Intelligence Industry Solutions | Kreatazz',
    description:
      'Explore Kreatazz operational intelligence solutions for manufacturing, engineering, healthcare, workforce, real estate, and enterprise operations.',
    schemaType: 'CollectionPage',
  },
  '/solutions/': {
    title: 'AI, Workflow and Product Engineering Solutions | Kreatazz',
    description:
      'Explore Kreatazz capabilities across AI and data platforms, workflow modernization, product engineering, healthcare data, cloud, and automation.',
    schemaType: 'CollectionPage',
  },
  '/manufacturing-intelligence/': {
    title: 'Manufacturing Intelligence & AI Operations | Kreatazz',
    description:
      'Improve manufacturing shift handovers, maintenance intelligence, quality visibility, production reporting, and operational decisions with Kreatazz.',
  },
  '/engineering-intelligence/': {
    title: 'AI Engineering Change Impact Analysis | Kreatazz',
    description:
      'Build engineering intelligence for change-impact analysis, requirements traceability, technical knowledge, design collaboration, and decision support.',
  },
  '/workforce-intelligence/': {
    title: 'Workforce Skills Visibility Platform India | Kreatazz',
    description:
      'Improve skills visibility, workforce planning, capability mapping, resource allocation, and people operations with Kreatazz workforce intelligence.',
  },
  '/enterprise-function-intelligence/': {
    title: 'Enterprise Workflow Intelligence Solutions | Kreatazz',
    description:
      'Connect sales, finance, procurement, projects, customer operations, and knowledge workflows through practical enterprise intelligence.',
  },
  '/enterprise-workflow-modernization/': {
    title: 'AI Workflow Modernization Services India | Kreatazz',
    description:
      'Modernize high-friction enterprise workflows with AI-assisted execution, clear ownership, measurable pilots, governance, and scalable automation.',
  },
  '/ai-ml-solutions/': {
    title: 'AI & Data Platform Services in India | Kreatazz',
    description:
      'Build model-ready data platforms, enterprise knowledge retrieval, AI agents, predictive analytics, and governed decision-support systems.',
  },
  '/cloud-migration/': {
    title: 'Cloud, DevOps & Automation Services | Kreatazz',
    description:
      'Modernize cloud infrastructure, CI/CD, observability, reliability, security, and cost accountability with Kreatazz cloud and DevOps services.',
  },
  '/mobile-and-web-application-development/': {
    title: 'Product Engineering & Application Development | Kreatazz',
    description:
      'Design and build maintainable web, mobile, workflow, and enterprise platforms with accountable product engineering and release delivery.',
  },
  '/healthcare-care-operations/': {
    title: 'Healthcare Workflow Intelligence Solutions | Kreatazz',
    description:
      'Create workflow-aware healthcare data and AI systems for care operations, clinical coordination, administrative execution, and decision support.',
  },
  '/real-estate-buyer-experience/': {
    title: 'Real Estate Buyer Personalization Platform | Kreatazz',
    description:
      'Improve the real estate buyer journey with guided personalization, visual decisions, digital collaboration, and conversion-focused experiences.',
  },
  '/staffing-solutions/': {
    title: 'Technology Staffing & Executive Search | Kreatazz',
    description:
      'Find specialized technology talent through structured role discovery, permanent recruitment, contract staffing, and executive search support.',
  },
}

const escapeAttribute = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

const absoluteUrl = (value) => (value?.startsWith('http') ? value : `${siteUrl}${value || '/'}`)
const safeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c')

const organizationReference = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Kreatazz',
  legalName: 'Kreatazz Innovation Technology Solutions Private Limited',
  url: `${siteUrl}/`,
  logo: absoluteUrl('/brand/logo-full-horizontal.jpeg'),
  email: 'sales@kreatazz.tech',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/kreatazz-innovation-technology-solutions-pvt-ltd',
  ],
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'CIN',
    value: 'U62099PN2024PTC232939',
  },
}

const legacyByPath = Object.fromEntries(
  legacyPages.map((page) => [
    `/${page.slug}/`,
    {
      title: `${page.title} | Kreatazz`,
      description: page.intro,
      name: page.title,
      schemaType: 'Service',
    },
  ]),
)

const blogByPath = Object.fromEntries(
  blogPosts.map((post) => [
    `/blog/${post.slug}/`,
    {
      title: `${post.title} | Kreatazz Blog`,
      description: post.excerpt,
      name: post.title,
      image: post.featuredImage,
      published: post.date,
      modified: post.date,
      schemaType: 'Article',
      category: post.category,
      tags: post.tags,
    },
  ]),
)

const metadataForRoute = (routePath) => {
  const base = legacyByPath[routePath] || blogByPath[routePath] || {}
  const override = routeOverrides[routePath] || {}
  return {
    title: override.title || base.title || 'Kreatazz | Operational Intelligence Company',
    description:
      override.description ||
      base.description ||
      'Kreatazz helps organizations operationalize AI through workflow intelligence, data platforms, and enterprise execution systems.',
    name: override.name || base.name || override.title || base.title || 'Kreatazz',
    schemaType: override.schemaType || base.schemaType || 'WebPage',
    image: override.image || base.image || '/brand/logo-full-horizontal.jpeg',
    published: base.published,
    modified: base.modified || siteReleaseDate,
    category: base.category,
    tags: base.tags,
  }
}

const breadcrumbSchema = (routePath, metadata) => {
  const parts = routePath.split('/').filter(Boolean)
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }]

  if (parts[0] === 'blog' && parts.length > 1) {
    items.push({ '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog/` })
  }

  if (routePath !== '/') {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: metadata.name.replace(/ \| Kreatazz(?: Blog)?$/, ''),
      item: absoluteUrl(routePath),
    })
  }

  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

const routeSchema = (routePath, metadata) => {
  const url = absoluteUrl(routePath)

  if (metadata.schemaType === 'Article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: metadata.name,
      description: metadata.description,
      image: absoluteUrl(metadata.image),
      datePublished: metadata.published,
      dateModified: metadata.modified,
      articleSection: metadata.category,
      keywords: metadata.tags?.join(', '),
      mainEntityOfPage: url,
      author: organizationReference,
      publisher: organizationReference,
    }
  }

  if (metadata.schemaType === 'Service') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: metadata.name,
      description: metadata.description,
      url,
      areaServed: { '@type': 'Country', name: 'India' },
      provider: organizationReference,
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': metadata.schemaType,
    name: metadata.name,
    description: metadata.description,
    url,
    publisher: organizationReference,
  }
}

const replaceMeta = (html, attribute, key, value) => {
  const pattern = new RegExp(`(<meta\\s+${attribute}=["']${key}["']\\s+content=["'])[^"']*(["']\\s*\\/?>)`, 'i')
  return html.replace(pattern, `$1${escapeAttribute(value)}$2`)
}

const renderRouteHtml = (routePath) => {
  const metadata = metadataForRoute(routePath)
  const canonical = absoluteUrl(routePath)
  const socialImage = absoluteUrl(metadata.image)
  let html = appShell

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(metadata.title)}</title>`)
  html = html.replace(
    new RegExp(`(<link\\s+rel=["']canonical["']\\s+href=["'])[^"']*(["']\\s*/?>)`, 'i'),
    `$1${canonical}$2`,
  )
  html = replaceMeta(html, 'name', 'description', metadata.description)

  const replacements = [
    ['property', 'og:title', metadata.title],
    ['property', 'og:description', metadata.description],
    ['property', 'og:url', canonical],
    ['property', 'og:image', socialImage],
    ['name', 'twitter:title', metadata.title],
    ['name', 'twitter:description', metadata.description],
    ['name', 'twitter:image', socialImage],
  ]

  for (const [attribute, key, value] of replacements) {
    const pattern = new RegExp(`(<meta\\s+${attribute}=["']${key}["']\\s+content=["'])[^"']*(["']\\s*\\/?>)`, 'i')
    html = html.replace(pattern, `$1${escapeAttribute(value)}$2`)
  }

  html = html.replace(
    new RegExp(`(<meta\\s+property=["']og:type["']\\s+content=["'])[^"']*(["']\\s*/?>)`, 'i'),
    `$1${metadata.schemaType === 'Article' ? 'article' : 'website'}$2`,
  )

  const schemas = [
    `<script id="kz-breadcrumb-schema" type="application/ld+json">${safeJson(breadcrumbSchema(routePath, metadata))}</script>`,
    `<script data-kz-route-schema type="application/ld+json">${safeJson(routeSchema(routePath, metadata))}</script>`,
  ]

  if (routePath === '/') {
    schemas.push(
      `<script data-kz-organization-schema type="application/ld+json">${safeJson({ '@context': 'https://schema.org', ...organizationReference })}</script>`,
    )
  }

  return html.replace('</head>', `    ${schemas.join('\n    ')}\n  </head>`)
}

const uniqueRoutes = [...new Set(sitemapRoutes)]

for (const routePath of uniqueRoutes) {
  const html = renderRouteHtml(routePath)

  if (routePath === '/') {
    await writeFile(appShellPath, html)
    continue
  }

  const relativePath = routePath.replace(/^\/+|\/+$/g, '')
  if (!relativePath || relativePath.includes('..')) {
    throw new Error(`Unsafe sitemap route: ${routePath}`)
  }

  const routeDirectory = path.join(distDirectory, relativePath)
  await mkdir(routeDirectory, { recursive: true })
  await writeFile(path.join(routeDirectory, 'index.html'), html)
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...uniqueRoutes.map((routePath) => {
    const metadata = metadataForRoute(routePath)
    return `  <url><loc>${absoluteUrl(routePath)}</loc><lastmod>${metadata.modified}</lastmod></url>`
  }),
  '</urlset>',
  '',
].join('\n')

await writeFile(sitemapPath, sitemap)

const notFoundHtml = renderRouteHtml('/404/')
  .replace(/<title>[\s\S]*?<\/title>/i, '<title>Page Not Found | Kreatazz</title>')
  .replace(
    /(<meta\s+name=["']robots["']\s+content=["'])[^"']*(["']\s*\/?>)/i,
    '$1noindex,follow$2',
  )
await writeFile(path.join(distDirectory, '404.html'), notFoundHtml)

console.log(`Generated SEO metadata for ${uniqueRoutes.length} routes and dist/404.html`)
