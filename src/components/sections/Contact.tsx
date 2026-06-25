'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Calendar, Send, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CONTACT_PAGE, CONTACT_FORM } from '@/content/contact'
import { SITE } from '@/config/site'
import { SocialLinks } from '@/components/ui/SocialLinks'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = formData
    const subject = encodeURIComponent('New Inquiry from Website')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="py-section md:py-section-lg bg-surface-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">{CONTACT_PAGE.badge}</span>
            <h2 className="mt-5 font-serif text-heading-2 text-text-primary">{CONTACT_PAGE.title}</h2>
            <p className="mt-4 text-body-lg text-text-muted max-w-md">{CONTACT_PAGE.subtitle}</p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-50 text-sage-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider">Email</p>
                  <a href={`mailto:${CONTACT_PAGE.email}`} className="text-sm font-medium text-text-primary hover:text-sage-600 transition-colors">
                    {CONTACT_PAGE.email}
                  </a>
                </div>
              </div>

              {CONTACT_PAGE.phone && (
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-50 text-sage-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider">Phone</p>
                    <a href={`tel:${CONTACT_PAGE.phone}`} className="text-sm font-medium text-text-primary hover:text-sage-600 transition-colors">
                      {CONTACT_PAGE.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-50 text-sage-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider">Location</p>
                  <p className="text-sm font-medium text-text-primary">{CONTACT_PAGE.location}</p>
                </div>
              </div>

              <Link
                href={CONTACT_PAGE.calendarUrl}
                className="inline-flex items-center gap-2 text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors mt-2"
              >
                <Calendar className="h-4 w-4" />
                {CONTACT_PAGE.calendarText} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="mt-10">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-4">Follow</p>
              <SocialLinks color="sage" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border-light bg-white p-8 md:p-10 card-shadow">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">{CONTACT_FORM.name.label}</label>
                  <input
                    type="text"
                    required={CONTACT_FORM.name.required}
                    placeholder={CONTACT_FORM.name.placeholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-border-light bg-surface-cream px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">{CONTACT_FORM.email.label}</label>
                  <input
                    type="email"
                    required={CONTACT_FORM.email.required}
                    placeholder={CONTACT_FORM.email.placeholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-border-light bg-surface-cream px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">{CONTACT_FORM.message.label}</label>
                  <textarea
                    required={CONTACT_FORM.message.required}
                    placeholder={CONTACT_FORM.message.placeholder}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-border-light bg-surface-cream px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all resize-none"
                  />
                </div>
                <button type="submit" className="pill-button-primary w-full inline-flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
