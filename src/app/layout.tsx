import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { PersonSchema, PodcastSeriesSchema } from '@/components/ui/JsonLd'
import BackToTop from '@/components/layout/BackToTop'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#5C7A5D',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://chandrachoodeshwaran.com'),
  title: {
    default: 'Chandra Choodeshwaran M | Emotional Intelligence & Soft Skills Trainer',
    template: '%s | Chandra Choodeshwaran M',
  },
  description: 'Helping people communicate, lead, and grow through emotional intelligence. Soft Skills Trainer in Hosur, Tamil Nadu.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Chandra Choodeshwaran M | Emotional Intelligence & Soft Skills Trainer',
    description: 'Helping people communicate, lead, and grow through emotional intelligence.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Chandra Choodeshwaran M',
    images: [{ url: '/images/og-default.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chandra Choodeshwaran M | Emotional Intelligence & Soft Skills Trainer',
    description: 'Helping people communicate, lead, and grow through emotional intelligence.',
    images: ['/images/og-default.svg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="noise-overlay">
        <PersonSchema />
        <PodcastSeriesSchema />
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Providers>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
        <BackToTop />
      </body>
    </html>
  )
}
