import type { Metadata } from 'next'
import { AWARDS_PAGE, JOURNEY_MILESTONES } from '@/content/awards'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'Awards & Recognition - Chandra Choodeshwaran M',
  description: AWARDS_PAGE.subtitle,
  openGraph: { title: `Awards | ${SITE.name}`, description: AWARDS_PAGE.subtitle },
}

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-surface-cream pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="section-label">{AWARDS_PAGE.badge}</span>
          <h1 className="mt-5 font-serif text-heading-1 text-text-primary">{AWARDS_PAGE.title}</h1>
          <p className="mt-4 text-body-lg text-text-muted max-w-xl mx-auto">{AWARDS_PAGE.subtitle}</p>
        </div>

        <div className="space-y-8">
          {JOURNEY_MILESTONES.map((m) => (
            <div key={m.year} className="rounded-2xl border border-border-light bg-white p-8 card-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-serif text-4xl text-sage-500">{m.year}</span>
                  <h2 className="mt-2 font-serif text-xl text-text-primary">{m.title}</h2>
                  <p className="text-sm text-sage-600">{m.organization}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-text-muted leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
