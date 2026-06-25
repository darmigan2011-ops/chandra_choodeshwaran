'use client'

import { motion } from 'framer-motion'
import { HOME_STATS } from '@/content/home'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function Stats() {
  return (
    <section className="relative py-20 md:py-24 bg-surface-sage overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 75% 50%, #fff 0%, transparent 50%)' }} />
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {HOME_STATS.items.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="group cursor-default">
                <AnimatedCounter
                  value={String(stat.value) + stat.suffix}
                  label={stat.label}
                  className="[&>span:first-child]:text-white [&>span:last-child]:text-white/70"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
