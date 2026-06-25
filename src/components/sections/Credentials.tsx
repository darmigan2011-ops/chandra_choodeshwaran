'use client'

import { motion } from 'framer-motion'
import { Award, Clock, BookOpen, Globe, Check } from 'lucide-react'
import { CREDENTIALS } from '@/content/services'

const credIcons: Record<string, React.ReactNode> = {
  'award': <Award className="h-6 w-6" />,
  'clock': <Clock className="h-6 w-6" />,
  'book-open': <BookOpen className="h-6 w-6" />,
  'globe': <Globe className="h-6 w-6" />,
}

export function Credentials() {
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
          <span className="section-label">{CREDENTIALS.badge}</span>
          <h2 className="mt-5 font-serif text-heading-2 text-text-primary">{CREDENTIALS.title}</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.items.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-3xl border border-border-light bg-white p-8 card-shadow-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-50 text-sage-600 mb-5">
                {credIcons[item.icon]}
              </div>
              <h3 className="font-serif text-lg text-text-primary mb-4">{item.title}</h3>
              <ul className="space-y-2.5">
                {item.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
