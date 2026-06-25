import type { Metadata } from 'next'
import { EXPERIENCE_PAGE, TIMELINE, PROFESSIONAL_HIGHLIGHTS } from '@/content/experience'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'Experience - Chandra Choodeshwaran M',
  description: EXPERIENCE_PAGE.subtitle,
  openGraph: { title: `Experience | ${SITE.name}`, description: EXPERIENCE_PAGE.subtitle },
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-surface-cream pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="section-label">{EXPERIENCE_PAGE.badge}</span>
          <h1 className="mt-5 font-serif text-heading-1 text-text-primary">{EXPERIENCE_PAGE.title}</h1>
          <p className="mt-4 text-body-lg text-text-muted max-w-xl mx-auto">{EXPERIENCE_PAGE.subtitle}</p>
        </div>

        <div className="space-y-8">
          {TIMELINE.map((item) => (
            <div key={item.year} className="rounded-2xl border border-border-light bg-white p-8 card-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-serif text-4xl text-sage-500">{item.year}</span>
                  <h2 className="mt-2 font-serif text-xl text-text-primary">{item.title}</h2>
                  <p className="text-sm text-sage-600">{item.organization}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-serif text-heading-3 text-text-primary mb-8 text-center">Professional Highlights</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {PROFESSIONAL_HIGHLIGHTS.map((h) => (
              <div key={h.category} className="rounded-2xl border border-border-light bg-white p-6 card-shadow">
                <h3 className="font-medium text-text-primary mb-4">{h.category}</h3>
                <ul className="space-y-2">
                  {h.items.map((item, i) => (
                    <li key={i} className="text-sm text-text-muted flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
