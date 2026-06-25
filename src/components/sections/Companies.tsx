'use client'

import { motion } from 'framer-motion'
import { COMPANIES } from '@/content/home'

export function Companies() {
  return (
    <section className="py-20 md:py-24 bg-surface-cream">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{COMPANIES.badge}</span>
          <h2 className="mt-4 font-serif text-heading-3 text-text-primary">{COMPANIES.title}</h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-8 md:grid-cols-6 md:gap-12 items-center">
          {COMPANIES.items.map((company, i) => (
            <motion.div
              key={company.name}
              className="flex items-center justify-center py-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="h-10 w-full rounded-xl bg-sage-100/50 flex items-center justify-center px-4 transition-all duration-300 hover:bg-sage-100 cursor-default">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wider group-hover:text-sage-600 transition-colors">
                  {company.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
