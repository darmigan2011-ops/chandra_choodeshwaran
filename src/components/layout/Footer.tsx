import Link from 'next/link'
import { SITE } from '@/config/site'
import { SocialLinks } from '@/components/ui/SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-surface-dark text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl text-white">
              <span className="text-sage-400">C</span>handra
              <span className="text-gold-400">choo</span>deshwaran
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">{SITE.positioning}</p>
            <p className="mt-3 text-sm text-white/30">Based in {SITE.location}</p>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.15em] text-white/30">Quick Links</p>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Contact'].map((label) => (
                <li key={label}>
                  <Link
                    href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-sage-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.15em] text-white/30">Connect</p>
            <SocialLinks showLabels variant="grid" color="white" />
            <div className="mt-6 space-y-1.5">
              <p className="text-sm text-white/40">{SITE.email}</p>
              {SITE.phone && <p className="text-sm text-white/40">{SITE.phone}</p>}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/30">&copy; {year} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/30 transition-colors hover:text-white/50">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/30 transition-colors hover:text-white/50">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
