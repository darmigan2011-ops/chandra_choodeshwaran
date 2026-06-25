'use client'

import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '@/content/about'

export function Process() {
  return (
    <section className="py-section md:py-section-lg bg-surface-cream">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">PROCESS</span>
          <h2 className="mt-5 font-serif text-heading-2 text-text-primary">How It Works</h2>
          <p className="mt-4 text-body-lg text-text-muted max-w-xl mx-auto">
            A proven methodology for lasting transformation.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 h-full w-px bg-sage-200 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex flex-col md:flex-row gap-6 md:gap-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="timeline-dot shrink-0 mx-auto md:mx-0">
                  {step.number}
                </div>
                <div className="flex-1 pt-3 text-center md:text-left">
                  <h3 className="font-serif text-2xl text-text-primary">{step.title}</h3>
                  <p className="mt-3 text-body text-text-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
