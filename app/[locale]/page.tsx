import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LOCALES } from '@/lib/i18n'
import { routing } from '@/i18n/routing'
import { generatePageMetadata } from '@/lib/seo'

type SupportedLocale = (typeof routing.locales)[number]

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const safeLocale: SupportedLocale = routing.locales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : routing.defaultLocale
  return generatePageMetadata(safeLocale, { path: `/${safeLocale}` })
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params
  const safeLocale = locale as SupportedLocale
  setRequestLocale(safeLocale)

  const t = await getTranslations({ locale: safeLocale, namespace: 'home' })

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
      <p className="mt-4 text-xl text-muted-foreground">{t('hero.subtitle')}</p>
      <p className="mt-2 max-w-xl text-center text-muted-foreground">
        {t('hero.description')}
      </p>
    </main>
  )
}
