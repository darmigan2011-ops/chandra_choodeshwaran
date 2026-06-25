import type { Metadata } from 'next'
import { ABOUT_HERO, ABOUT_BIO, ABOUT_PHILOSOPHY, ABOUT_CREDENTIALS } from '@/content/about'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'About Chandra Choodeshwaran M - Soft Skills Trainer & Counsellor in Hosur',
  description: 'Learn about Chandra Choodeshwaran M — a certified emotional intelligence coach, counsellor, and public speaking trainer based in Hosur, Tamil Nadu.',
  openGraph: { title: `About | ${SITE.name}`, description: ABOUT_BIO.paragraphs[0] },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface-cream pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6 md:px-8 lg:px-12">
        <span className="section-label">{ABOUT_HERO.badge}</span>
        <h1 className="mt-5 font-serif text-heading-1 text-text-primary">{ABOUT_HERO.name}</h1>
        <p className="mt-3 text-body-lg text-sage-600">{ABOUT_HERO.tagline}</p>

        <div className="mt-12 space-y-5">
          {ABOUT_BIO.paragraphs.map((p, i) => (
            <p key={i} className="text-body-lg text-text-muted leading-relaxed">{p}</p>
          ))}
        </div>

        <div className="mt-16">
          <span className="section-label">{ABOUT_PHILOSOPHY.badge}</span>
          <h2 className="mt-4 font-serif text-heading-3 text-text-primary">{ABOUT_PHILOSOPHY.title}</h2>
          <p className="mt-2 text-text-muted">{ABOUT_PHILOSOPHY.subtitle}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ABOUT_PHILOSOPHY.principles.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border-light bg-white p-6 card-shadow">
                <h3 className="font-serif text-lg text-text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <span className="section-label">{ABOUT_CREDENTIALS.badge}</span>
          <h2 className="mt-4 font-serif text-heading-3 text-text-primary">{ABOUT_CREDENTIALS.title}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {ABOUT_CREDENTIALS.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border-light bg-white p-6 card-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-text-primary">{item.title}</h3>
                    <p className="text-sm text-sage-600">{item.organization} &middot; {item.year}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
