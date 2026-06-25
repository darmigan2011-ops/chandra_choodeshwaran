'use client'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-cream px-4">
      <h1 className="font-serif text-7xl text-sage-500 md:text-9xl">Oops!</h1>
      <p className="mt-4 max-w-md text-center text-text-muted">Something went wrong. Please try again or come back later.</p>
      <button onClick={reset} className="mt-8 pill-button-secondary">Try Again</button>
    </main>
  )
}
