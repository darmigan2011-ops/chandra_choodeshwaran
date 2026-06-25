import { SITE } from '@/config/site'
import { SOCIAL_LINKS, SPOTIFY_SHOW_URL } from '@/config/social'

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    givenName: 'Chandra Choodeshwaran',
    familyName: 'M',
    jobTitle: 'Emotional Intelligence Trainer · Counsellor · Public Speaking Coach',
    description: 'Soft Skills Trainer, Emotional Intelligence Specialist, Counsellor, and Public Speaking Trainer based in Hosur, Tamil Nadu.',
    url: SITE.baseUrl,
    sameAs: SOCIAL_LINKS.filter(l => l.platform !== 'Email').map(l => l.href),
    address: { '@type': 'PostalAddress', addressLocality: 'Hosur', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
    knowsAbout: ['Emotional Intelligence', 'Soft Skills Training', 'Public Speaking', 'Counselling', 'Career Guidance', 'Leadership Development', 'Communication Skills'],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function PodcastSeriesSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: "Chandru's Psychology In Tamil",
    description: 'A Tamil-language podcast exploring emotional intelligence, psychology, communication, and personal growth.',
    url: SPOTIFY_SHOW_URL,
    inLanguage: 'ta',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

interface BreadcrumbItem { name: string; href: string }

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.baseUrl}${item.href}`,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
