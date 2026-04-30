import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { NAV_ITEMS } from '@/lib/navigation'

export async function Footer() {
  const t = await getTranslations()

  console.info('[Footer] rendered')

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="h-5 w-5 rounded bg-primary" aria-hidden="true" />
              Кировмаш
            </div>
            <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
          </div>

          <div>
            <p className="font-semibold mb-3 text-sm">{t('nav.catalog')}</p>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3 text-sm">{t('nav.contacts')}</p>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${t('footer.phone').replace(/\s/g, '')}`} className="hover:text-foreground transition-colors">
                  {t('footer.phone')}
                </a>
              </li>
              <li>
                <a href={`mailto:${t('footer.email')}`} className="hover:text-foreground transition-colors">
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
