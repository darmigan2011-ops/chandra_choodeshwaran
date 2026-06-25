'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { NAV_ITEMS } from '@/config/navigation'
import { X } from 'lucide-react'

interface MobileNavProps { onClose: () => void }

export default function MobileNav({ onClose }: MobileNavProps) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-2xl md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-end px-6 pt-6">
        <button onClick={onClose} className="flex h-10 w-10 items-center justify-center text-text-muted hover:text-text-primary" aria-label="Close menu">
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col items-center justify-center gap-10">
        {NAV_ITEMS.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
          >
            <Link href={item.href} onClick={onClose} className="group text-2xl text-text-muted transition-colors duration-300 hover:text-sage-500">
              <span className="font-serif">{item.label}</span>
              <span className="mx-auto mt-1 block h-px w-0 bg-sage-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
          <Link href="/contact" onClick={onClose} className="pill-button-primary">
            Book a Session
          </Link>
        </motion.div>
      </nav>
    </motion.div>
  )
}
