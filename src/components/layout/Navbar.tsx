'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/config/navigation'
import MobileNav from './MobileNav'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevScroll, setPrevScroll] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handle = () => {
      const current = window.scrollY
      setIsScrolled(current > 20)
      setVisible(current < prevScroll || current < 50)
      setPrevScroll(current)
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [prevScroll])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          isScrolled ? 'glass-strong border-b border-border-light/50' : 'bg-transparent'
        )}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <nav className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6 md:px-8 lg:px-12">
          <Link href="/" className="group font-serif text-xl tracking-tight text-text-primary">
            <span className="text-sage-500">C</span>handra
            <span className="text-sage-400">choo</span>deshwaran
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(pathname)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative py-2 text-sm transition-colors duration-300',
                    active ? 'text-sage-600 font-medium' : 'text-text-muted hover:text-sage-500'
                  )}
                >
                  {item.label}
                  {active && <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-sage-500" />}
                </Link>
              )
            })}
          </div>

          <div className="hidden md:block">
            <Link href="/contact" className="pill-button-primary text-sm">
              Book a Session
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span className="h-px w-6 bg-text-primary" animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
            <motion.span className="h-px w-6 bg-text-primary" animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="h-px w-6 bg-text-primary" animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
