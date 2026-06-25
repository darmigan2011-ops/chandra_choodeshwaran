import type { StaticImageData } from 'next/image'

export interface StatItem {
  value: number
  suffix: string
  label: string
}

export interface ValueItem {
  title: string
  description: string
}

export interface TargetAudienceItem {
  icon: string
  title: string
  description: string
  bullets: string[]
}

export interface CompanyItem {
  name: string
  src: string
}

export interface ServiceTier {
  id: string
  duration: string
  title: string
  description: string
  features: string[]
  price: string
  priceNote: string
  ctaLabel: string
  featured: boolean
}

export interface CredentialItem {
  icon: string
  title: string
  bullets: string[]
}

export interface TestimonialItem {
  name: string
  role: string
  organization?: string
  quote: string
  rating: number
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}
