'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { routing } from '@/i18n/routing'

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  console.debug('[LocaleSwitcher] rendered, current locale:', locale)

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={cn(
            'px-1.5 py-0.5 rounded transition-colors uppercase',
            locale === loc
              ? 'text-primary font-bold'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {loc}
        </Link>
      ))}
    </div>
  )
}
