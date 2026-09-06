import { readFile } from 'node:fs/promises'

const host = 'kreatazz.tech'
const key = '13d8236f0d5f3d71a60c8bb916e744e6'
const keyLocation = `https://${host}/${key}.txt`
const endpoint = 'https://api.indexnow.org/indexnow'

const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])

if (urlList.length === 0) {
  throw new Error('No URLs found in dist/sitemap.xml')
}

for (const url of urlList) {
  const parsed = new URL(url)
  if (parsed.protocol !== 'https:' || parsed.hostname !== host) {
    throw new Error(`Refusing to submit URL outside https://${host}: ${url}`)
  }
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
})

if (![200, 202].includes(response.status)) {
  const body = await response.text()
  throw new Error(`IndexNow returned HTTP ${response.status}: ${body}`)
}

console.log(`IndexNow accepted ${urlList.length} changed URLs (HTTP ${response.status}).`)
