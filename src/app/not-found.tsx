import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-cream px-4">
      <h1 className="font-serif text-[10rem] leading-none text-sage-300 md:text-[14rem]">404</h1>
      <p className="mt-4 text-center text-lg text-text-muted">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-8 pill-button-primary inline-flex items-center gap-2">
        &larr; Back to Home
      </Link>
    </main>
  )
}
