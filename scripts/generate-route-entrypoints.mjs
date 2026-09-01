import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const distDirectory = path.resolve('dist')
const appShellPath = path.join(distDirectory, 'index.html')
const sitemapPath = path.join(distDirectory, 'sitemap.xml')

const [appShell, sitemap] = await Promise.all([
  readFile(appShellPath, 'utf8'),
  readFile(sitemapPath, 'utf8'),
])

const routePaths = [...sitemap.matchAll(/<loc>https:\/\/kreatazz\.tech([^<]*)<\/loc>/g)]
  .map((match) => match[1])
  .filter((routePath) => routePath && routePath !== '/')

for (const routePath of routePaths) {
  const relativePath = routePath.replace(/^\/+|\/+$/g, '')

  if (!relativePath || relativePath.includes('..')) {
    throw new Error(`Unsafe sitemap route: ${routePath}`)
  }

  const routeDirectory = path.join(distDirectory, relativePath)
  await mkdir(routeDirectory, { recursive: true })
  await writeFile(path.join(routeDirectory, 'index.html'), appShell)
}

await cp(appShellPath, path.join(distDirectory, '404.html'))

console.log(`Generated ${routePaths.length} route entry points and dist/404.html`)
