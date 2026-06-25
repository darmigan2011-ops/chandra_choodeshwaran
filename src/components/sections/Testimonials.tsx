'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS_PAGE, TESTIMONIALS } from '@/content/testimonials'

export function Testimonials() {
  return (
    <section className="py-section md:py-section-lg bg-surface-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{TESTIMONIALS_PAGE.badge}</span>
          <h2 className="mt-5 font-serif text-heading-2 text-text-primary">{TESTIMONIALS_PAGE.title}</h2>
          <p className="mt-4 text-body-lg text-text-muted max-w-xl mx-auto">{TESTIMONIALS_PAGE.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="group rounded-3xl border border-border-light bg-white p-8 card-shadow-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="star-rating mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold-500 text-gold-500" />
                ))}
              </div>

              <Quote className="h-6 w-6 text-sage-200 mb-3" />

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-sage-600 text-sm font-medium">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}{t.organization ? `, ${t.organization}` : ''}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
