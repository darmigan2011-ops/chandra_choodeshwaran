'use client'
import { useState, useEffect } from 'react'
export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  useEffect(() => {
    let last = 0
    const handle = () => { const y = window.scrollY; setDirection(y > last ? 'down' : 'up'); last = y }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return direction
}
