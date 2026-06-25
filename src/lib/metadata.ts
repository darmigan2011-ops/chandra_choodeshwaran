import type { Metadata } from 'next'
import { SITE } from '@/config/site'
import { DEFAULT_SEO } from '@/config/seo'

interface PageSEOProps {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'profile' | 'article'
  keywords?: string[]
  publishedTime?: string
  images?: { url: string; width: number; height: number }[]
}

export function buildMetadata({
  title,
  description,
  path,
  ogType = 'website',
  keywords = [],
  publishedTime,
  images,
}: PageSEOProps): Metadata {
  const url = `${SITE.baseUrl}${path}`
  const siteTitle = `${title} | ${SITE.name}`

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: siteTitle,
      description,
      url,
      siteName: SITE.name,
      type: ogType,
      locale: DEFAULT_SEO.locale,
      ...(publishedTime && { publishedTime }),
      images: images || [{ url: `${SITE.baseUrl}/images/og-default.svg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description,
      images: images || [`${SITE.baseUrl}/images/og-default.svg`],
    },
  }
}
