import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { LOCALES } from '@/lib/i18n'
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

  const t = await getTranslations({ locale: safeLocale, namespace: 'about' })
  return generatePageMetadata(safeLocale, {
    title: t('title'),
    description: t('description'),
    path: `/${safeLocale}/about`,
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const safeLocale = locale as SupportedLocale
  setRequestLocale(safeLocale)

  console.debug('[about/page] locale:', safeLocale)

  const t = await getTranslations({ locale: safeLocale, namespace: 'about' })

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mb-12 text-lg text-muted-foreground">{t('description')}</p>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">{t('mission.title')}</h2>
        <p className="text-muted-foreground leading-relaxed">{t('mission.text')}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">{t('values.title')}</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {['quality', 'reliability', 'innovation', 'partnership'].map((value) => (
            <li
              key={value}
              className="rounded-lg border bg-card p-5"
            >
              <div className="h-2 w-8 rounded-full bg-primary mb-3" />
              <p className="font-medium capitalize">{value}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">{t('team.title')}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t('description')}
        </p>
      </section>
    </div>
  )
}
