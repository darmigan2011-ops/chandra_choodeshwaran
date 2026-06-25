import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import { FIVE_PILLARS } from '@/content/pillars'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return FIVE_PILLARS.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pillar = FIVE_PILLARS.find((p) => p.id === slug)
  if (!pillar) return {}
  return { title: `${pillar.title} - Services`, description: pillar.description }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const pillar = FIVE_PILLARS.find((p) => p.id === slug)
  if (!pillar) notFound()

  return (
    <main className="min-h-screen bg-surface-cream pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6 md:px-8 lg:px-12">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-sage-600 transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>

        <span className="section-label">{pillar.number}</span>
        <h1 className="mt-5 font-serif text-heading-1 text-text-primary">{pillar.title}</h1>
        <p className="mt-2 text-body-lg text-sage-600">{pillar.subtitle}</p>
        <p className="mt-6 text-body-lg text-text-muted leading-relaxed">{pillar.description}</p>

        {pillar.metrics && (
          <div className="mt-10 grid grid-cols-3 gap-6">
            {pillar.metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-border-light bg-white p-6 text-center card-shadow">
                <p className="font-serif text-3xl text-sage-600">{m.value}</p>
                <p className="mt-1 text-xs text-text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/contact" className="pill-button-primary inline-flex items-center gap-2">
            Book a Session
          </Link>
        </div>
      </div>
    </main>
  )
}
