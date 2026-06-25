'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Award, Users, ShieldCheck } from 'lucide-react'
import { HOME_HERO } from '@/content/home'
import { SITE } from '@/config/site'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-cream">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] right-[-10%] h-[60vh] w-[60vh] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #5C7A5D 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-5%] h-[50vh] w-[50vh] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #B89567 0%, transparent 70%)' }} />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8 lg:px-12 pt-32 pb-20">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="section-label">{HOME_HERO.badge}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-6 font-serif text-display-xl leading-[0.95] tracking-[-0.03em] text-text-primary">
              {HOME_HERO.headline}{' '}
              <span className="text-gradient-gold">{HOME_HERO.headlineAccent}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-body-lg text-text-muted max-w-lg">
              {HOME_HERO.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="pill-button-primary btn-ripple inline-flex items-center gap-2">
                Book a Free Call <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#about" className="pill-button-secondary">
                Learn More
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 gap-6">
              {HOME_HERO.trustItems.slice(0, 3).map((item, i) => {
                const icons = [Award, Users, ShieldCheck]
                const Icon = icons[i]
                return (
                  <div key={item} className="flex items-start gap-3">
                    <Icon className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto rounded-3xl overflow-hidden card-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-cream-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-sage-500/10 mx-auto flex items-center justify-center">
                    <span className="font-serif text-4xl text-sage-600">CC</span>
                  </div>
                  <p className="mt-4 font-serif text-lg text-text-muted">{SITE.tagline}</p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5" />
            </div>

            <motion.div
              className="absolute -bottom-4 -left-4 floating-badge card-shadow flex items-center gap-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Award className="h-5 w-5 text-gold-500" />
              <div>
                <p className="text-sm font-medium text-text-primary">15+ Years</p>
                <p className="text-xs text-text-muted">of Impact</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
