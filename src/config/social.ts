import { Instagram, Music2, Linkedin, Mail } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

export interface SocialLink {
  label: string
  href: string
  icon: IconType
  ariaLabel: string
  platform: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/chandra_choodeshwaran',
    icon: Instagram,
    ariaLabel: 'Follow Chandra Choodeshwaran on Instagram',
    platform: 'Instagram',
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/show/7jte6TL6cXPKVdqgO2jqqu',
    icon: Music2,
    ariaLabel: "Listen to Chandru's Psychology In Tamil on Spotify",
    platform: 'Spotify',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/chandrachoodeshwaran',
    icon: Linkedin,
    ariaLabel: 'Connect with Chandra Choodeshwaran on LinkedIn',
    platform: 'LinkedIn',
  },
  {
    label: 'Email',
    href: 'mailto:chandrachoodeshwaran@gmail.com',
    icon: Mail,
    ariaLabel: 'Send an email to Chandra Choodeshwaran',
    platform: 'Email',
  },
]

export const SPOTIFY_SHOW_URL = 'https://open.spotify.com/show/7jte6TL6cXPKVdqgO2jqqu'
export const SPOTIFY_EMBED_URL = 'https://open.spotify.com/embed/show/7jte6TL6cXPKVdqgO2jqqu'
