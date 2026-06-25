export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-sage-200 border-t-sage-500 animate-spin" />
        <p className="text-sm text-text-muted animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
