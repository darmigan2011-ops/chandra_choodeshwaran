'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SERVICES_PAGE, SERVICE_TIERS } from '@/content/services'

export function ServicesSection() {
  return (
    <section id="services" className="relative py-section md:py-section-lg bg-surface-cream">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{SERVICES_PAGE.badge}</span>
          <h2 className="mt-5 font-serif text-heading-2 text-text-primary">
            {SERVICES_PAGE.title}{' '}
            <span className="text-gradient">{SERVICES_PAGE.titleAccent}</span>
          </h2>
          <p className="mt-4 text-body-lg text-text-muted max-w-xl mx-auto">{SERVICES_PAGE.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {SERVICE_TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              className={`relative rounded-3xl overflow-hidden ${
                tier.featured ? 'bg-sage-500 text-white' : 'bg-white card-shadow'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gold-500 text-white text-xs font-medium px-4 py-1.5 rounded-bl-2xl">
                    Popular
                  </div>
                </div>
              )}

              <div className="p-8 md:p-10">
                <span className={`inline-block text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full ${
                  tier.featured ? 'bg-white/20 text-white' : 'bg-sage-50 text-sage-600'
                }`}>
                  {tier.duration}
                </span>

                <h3 className={`mt-5 font-serif text-2xl ${tier.featured ? 'text-white' : 'text-text-primary'}`}>
                  {tier.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${tier.featured ? 'text-white/80' : 'text-text-muted'}`}>
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.featured ? 'text-gold-300' : 'text-sage-500'}`} />
                      <span className={tier.featured ? 'text-white/90' : 'text-text-secondary'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <p className={`font-serif text-3xl ${tier.featured ? 'text-white' : 'text-text-primary'}`}>
                    {tier.price}
                  </p>
                  <p className={`text-xs mt-1 ${tier.featured ? 'text-white/60' : 'text-text-muted'}`}>
                    {tier.priceNote}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    tier.featured
                      ? 'bg-white text-sage-700 hover:bg-gold-50'
                      : 'bg-sage-500 text-white hover:bg-sage-600 shadow-lg shadow-sage-500/20'
                  }`}
                >
                  {tier.ctaLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
