'use client'

import { useRef, useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: string
  label: string
  className?: string
}

export function AnimatedCounter({ value, label, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) setHasAnimated(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return
    const numMatch = value.match(/(\d+)/)
    if (!numMatch) { setDisplayValue(value); return }
    const targetNum = parseInt(numMatch[1])
    const suffix = value.replace(numMatch[1], '')
    const duration = 2000
    const startTime = Date.now()
    let rafId: number
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(`${Math.floor(eased * targetNum)}${suffix}`)
      if (progress < 1) rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [hasAnimated, value])

  return (
    <div ref={ref} className={className}>
      <span className="block font-serif text-number-lg text-sage-600 leading-none">{displayValue}</span>
      <span className="mt-2 block text-body-sm text-text-muted">{label}</span>
    </div>
  )
}
