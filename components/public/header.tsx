import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SiteNav } from './site-nav'
import { LocaleSwitcher } from './locale-switcher'
import { MobileMenu } from './mobile-menu'

export async function Header() {
  const t = await getTranslations('common')

  console.info('[Header] rendered')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
          <span className="h-5 w-5 rounded bg-primary" aria-hidden="true" />
          Кировмаш
        </Link>

        <SiteNav className="hidden md:flex" />

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <Link
            href="/contacts"
            className={cn(buttonVariants({ size: 'sm' }), 'hidden md:inline-flex')}
          >
            {t('cta.contactUs')}
          </Link>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
