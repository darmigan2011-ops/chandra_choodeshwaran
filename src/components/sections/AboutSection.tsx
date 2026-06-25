'use client'

import { motion } from 'framer-motion'
import { Check, Quote } from 'lucide-react'
import { ABOUT_HOME } from '@/content/home'

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] } }),
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-section md:py-section-lg bg-surface-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden card-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-cream-100" />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <div>
                  <Quote className="h-8 w-8 text-sage-300 mx-auto" />
                  <p className="mt-4 font-serif text-lg text-text-muted italic leading-relaxed">
                    &ldquo;Understanding people changes everything.&rdquo;
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5" />
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 floating-badge card-shadow rounded-2xl bg-white p-5 max-w-[200px]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <p className="font-serif text-3xl text-sage-600">15+</p>
              <p className="text-xs text-text-muted mt-1">Years transforming lives</p>
            </motion.div>
          </motion.div>

          <div>
            <motion.div custom={0} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="section-label">{ABOUT_HOME.badge}</span>
            </motion.div>

            <motion.h2 custom={1} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-5 font-serif text-heading-2 leading-tight text-text-primary">
              {ABOUT_HOME.title}
            </motion.h2>

            {ABOUT_HOME.paragraphs.map((p, i) => (
              <motion.p key={i} custom={2 + i} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mt-5 text-body-lg text-text-muted leading-relaxed">
                {p}
              </motion.p>
            ))}

            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-8 rounded-2xl border border-sage-100 bg-sage-50/50 p-6 card-shadow">
              <div className="space-y-5">
                {ABOUT_HOME.values.map((v, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-500">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{v.title}</p>
                      <p className="text-sm text-text-muted mt-0.5">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
