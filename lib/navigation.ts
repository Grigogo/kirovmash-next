export type NavItem = {
  key: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'about', href: '/about' },
  { key: 'catalog', href: '/catalog' },
  { key: 'solutions', href: '/solutions' },
  { key: 'services', href: '/services' },
  { key: 'contacts', href: '/contacts' },
]

export function getNavItems(): NavItem[] {
  return NAV_ITEMS
}
