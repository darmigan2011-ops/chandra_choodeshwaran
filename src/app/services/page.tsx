import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES_PAGE, SERVICE_TIERS, CREDENTIALS } from '@/content/services'
import { SITE } from '@/config/site'
import { Check, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services - Soft Skills Training, Counselling & EI Coaching in Hosur',
  description: 'Explore professional services: soft skills training, emotional intelligence coaching, counselling, career guidance, and public speaking training in Hosur.',
  openGraph: { title: `Services | ${SITE.name}`, description: SERVICES_PAGE.subtitle },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-surface-cream pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="section-label">{SERVICES_PAGE.badge}</span>
          <h1 className="mt-5 font-serif text-heading-1 text-text-primary">
            {SERVICES_PAGE.title} <span className="text-gradient">{SERVICES_PAGE.titleAccent}</span>
          </h1>
          <p className="mt-4 text-body-lg text-text-muted max-w-xl mx-auto">{SERVICES_PAGE.subtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {SERVICE_TIERS.map((tier) => (
            <div key={tier.id} className={`relative rounded-3xl overflow-hidden ${tier.featured ? 'bg-sage-500 text-white' : 'bg-white card-shadow'}`}>
              {tier.featured && <div className="absolute top-0 right-0 bg-gold-500 text-white text-xs font-medium px-4 py-1.5 rounded-bl-2xl">Popular</div>}
              <div className="p-8 md:p-10">
                <span className={`inline-block text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full ${tier.featured ? 'bg-white/20 text-white' : 'bg-sage-50 text-sage-600'}`}>
                  {tier.duration}
                </span>
                <h2 className={`mt-5 font-serif text-2xl ${tier.featured ? 'text-white' : 'text-text-primary'}`}>{tier.title}</h2>
                <p className={`mt-3 text-sm leading-relaxed ${tier.featured ? 'text-white/80' : 'text-text-muted'}`}>{tier.description}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.featured ? 'text-gold-300' : 'text-sage-500'}`} />
                      <span className={tier.featured ? 'text-white/90' : 'text-text-secondary'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <p className={`font-serif text-3xl ${tier.featured ? 'text-white' : 'text-text-primary'}`}>{tier.price}</p>
                  <p className={`text-xs mt-1 ${tier.featured ? 'text-white/60' : 'text-text-muted'}`}>{tier.priceNote}</p>
                </div>
                <Link href="/contact" className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${tier.featured ? 'bg-white text-sage-700 hover:bg-gold-50' : 'bg-sage-500 text-white hover:bg-sage-600 shadow-lg shadow-sage-500/20'}`}>
                  {tier.ctaLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="section-label">{CREDENTIALS.badge}</span>
            <h2 className="mt-4 font-serif text-heading-2 text-text-primary">{CREDENTIALS.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.items.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border-light bg-white p-8 card-shadow">
                <h3 className="font-serif text-lg text-text-primary mb-4">{item.title}</h3>
                <ul className="space-y-2.5">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <Check className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                      {b}
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
