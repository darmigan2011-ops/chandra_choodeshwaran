export interface NavItem {
  label: string
  href: string
  isActive: (pathname: string) => boolean
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', isActive: (pathname) => pathname === '/' },
  { label: 'About', href: '/about', isActive: (pathname) => pathname.startsWith('/about') },
  { label: 'Services', href: '/services', isActive: (pathname) => pathname.startsWith('/services') },
  { label: 'Contact', href: '/contact', isActive: (pathname) => pathname.startsWith('/contact') },
]
