'use client'

import { motion } from 'framer-motion'
import { Users, GraduationCap, Heart, Building2, Check } from 'lucide-react'
import { TARGET_AUDIENCE } from '@/content/home'

const icons: Record<string, React.ReactNode> = {
  'users': <Users className="h-6 w-6" />,
  'graduation-cap': <GraduationCap className="h-6 w-6" />,
  'heart': <Heart className="h-6 w-6" />,
  'building': <Building2 className="h-6 w-6" />,
}

export function TargetAudience() {
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
          <span className="section-label">{TARGET_AUDIENCE.badge}</span>
          <h2 className="mt-5 font-serif text-heading-2 text-text-primary">{TARGET_AUDIENCE.title}</h2>
          <p className="mt-4 text-body-lg text-text-muted max-w-xl mx-auto">{TARGET_AUDIENCE.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TARGET_AUDIENCE.items.map((item, i) => (
            <motion.div
              key={item.title}
              className="group rounded-3xl border border-border-light bg-white p-8 card-shadow-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-50 text-sage-600 mb-5 transition-colors duration-300 group-hover:bg-sage-500 group-hover:text-white">
                {icons[item.icon]}
              </div>
              <h3 className="font-serif text-xl text-text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-5">{item.description}</p>
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
