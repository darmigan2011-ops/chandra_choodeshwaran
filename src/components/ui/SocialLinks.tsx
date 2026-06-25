import { SOCIAL_LINKS } from '@/config/social'
import { cn } from '@/lib/utils'

interface SocialLinksProps {
  className?: string
  showLabels?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'row' | 'grid'
  color?: 'sage' | 'gold' | 'white'
}

export function SocialLinks({ className, showLabels = false, size = 'md', variant = 'row', color = 'sage' }: SocialLinksProps) {
  const sizeClasses = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' }
  const iconSizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' }
  const colorClasses = {
    sage: 'text-text-muted hover:text-sage-600 hover:border-sage-300 hover:bg-sage-50',
    gold: 'text-text-muted hover:text-gold-600 hover:border-gold-300 hover:bg-gold-50',
    white: 'text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10',
  }

  return (
    <div className={cn(variant === 'row' ? 'flex flex-wrap gap-3' : 'grid grid-cols-2 gap-3', className)}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group inline-flex items-center gap-2 rounded-full border border-border-light transition-all duration-300',
              colorClasses[color],
              showLabels ? 'px-4 py-2' : 'items-center justify-center ' + sizeClasses[size]
            )}
            aria-label={link.ariaLabel}
          >
            <Icon className={cn(iconSizes[size], 'shrink-0')} />
            {showLabels && <span className="text-sm font-medium">{link.label}</span>}
          </a>
        )
      })}
    </div>
  )
}
