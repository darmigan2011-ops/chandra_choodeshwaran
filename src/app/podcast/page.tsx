import type { Metadata } from 'next'
import Link from 'next/link'
import { PODCAST_PAGE, PODCAST_EPISODES } from '@/content/podcast'
import { SITE } from '@/config/site'
import { SPOTIFY_SHOW_URL } from '@/config/social'
import { ExternalLink, Music2 } from 'lucide-react'

export const metadata: Metadata = {
  title: "Podcast - Chandru's Psychology In Tamil",
  description: PODCAST_PAGE.subtitle,
  openGraph: { title: `Podcast | ${SITE.name}`, description: PODCAST_PAGE.subtitle },
}

export default function PodcastPage() {
  return (
    <main className="min-h-screen bg-surface-cream pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="section-label">{PODCAST_PAGE.badge}</span>
          <h1 className="mt-5 font-serif text-heading-1 text-text-primary">{PODCAST_PAGE.title}</h1>
          <p className="mt-3 text-lg text-sage-600 italic">{PODCAST_PAGE.tamilMotto}</p>
          <p className="mt-4 text-body-lg text-text-muted max-w-xl mx-auto">{PODCAST_PAGE.subtitle}</p>
          <Link href={SPOTIFY_SHOW_URL} target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 pill-button-primary text-sm">
            <Music2 className="h-4 w-4" /> Listen on Spotify <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {PODCAST_EPISODES.map((ep) => (
            <div key={ep.episodeNumber} className="rounded-2xl border border-border-light bg-white p-6 card-shadow-hover">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-100 text-xs font-medium text-sage-600">
                  {String(ep.episodeNumber).padStart(2, '0')}
                </span>
                {ep.featured && <span className="text-[10px] uppercase tracking-wider text-gold-600 font-medium">Featured</span>}
              </div>
              <h3 className="font-serif text-lg text-text-primary">{ep.title}</h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">{ep.description}</p>
              <p className="mt-3 text-xs text-sage-500">{ep.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
