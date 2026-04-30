'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/navigation'

interface SiteNavProps {
  className?: string
  onNavigate?: () => void
}

export function SiteNav({ className, onNavigate }: SiteNavProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()

  console.debug('[SiteNav] rendered, active path:', pathname)

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      {NAV_ITEMS.map(({ key, href }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={key}
            href={href}
            onClick={onNavigate}
            className={cn(
              'px-3 py-2 text-sm rounded-md transition-colors',
              isActive
                ? 'text-primary font-semibold'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            {t(key)}
          </Link>
        )
      })}
    </nav>
  )
}
