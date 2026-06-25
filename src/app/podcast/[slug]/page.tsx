import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Music2 } from 'lucide-react'
import { PODCAST_EPISODES } from '@/content/podcast'
import { SPOTIFY_SHOW_URL } from '@/config/social'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PODCAST_EPISODES.map((ep) => ({ slug: ep.title.toLowerCase().replace(/\s+/g, '-') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const episode = PODCAST_EPISODES.find((ep) => ep.title.toLowerCase().replace(/\s+/g, '-') === slug)
  if (!episode) return {}
  return { title: `Podcast: ${episode.title}`, description: episode.description }
}

export default async function PodcastEpisodePage({ params }: Props) {
  const { slug } = await params
  const episode = PODCAST_EPISODES.find((ep) => ep.title.toLowerCase().replace(/\s+/g, '-') === slug)
  if (!episode) notFound()

  return (
    <main className="min-h-screen bg-surface-cream pt-28 pb-20">
      <div className="mx-auto max-w-[600px] px-6 md:px-8 lg:px-12">
        <Link href="/podcast" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-sage-600 transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to Episodes
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-sm font-medium text-sage-600">
            {String(episode.episodeNumber).padStart(2, '0')}
          </span>
          <span className="text-xs text-sage-500 uppercase tracking-wider">{episode.duration}</span>
        </div>

        <h1 className="font-serif text-heading-2 text-text-primary">{episode.title}</h1>
        <p className="mt-4 text-body-lg text-text-muted leading-relaxed">{episode.description}</p>

        <Link href={SPOTIFY_SHOW_URL} target="_blank" rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 pill-button-primary text-sm">
          <Music2 className="h-4 w-4" /> Listen on Spotify <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </main>
  )
}
