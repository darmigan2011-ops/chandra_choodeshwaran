import type { MetadataRoute } from 'next'
import { SITE } from '@/config/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.baseUrl
  const pages = [
    { path: '', changeFreq: 'weekly' as const, priority: 1.0 },
    { path: '/about', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/services', changeFreq: 'monthly' as const, priority: 0.9 },
    { path: '/contact', changeFreq: 'monthly' as const, priority: 0.7 },
  ]
  return pages.map(({ path, changeFreq, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }))
}
