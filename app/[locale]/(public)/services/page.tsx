import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { db } from '@/lib/db'
import { pickTranslation, LOCALES, type Locale } from '@/lib/i18n'
import { generatePageMetadata } from '@/lib/seo'
import { ServiceCard } from '@/components/public/service-card'

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
  const t = await getTranslations({ locale: safeLocale, namespace: 'services' })
  return generatePageMetadata(safeLocale, {
    title: t('title'),
    description: t('description'),
    path: `/${safeLocale}/services`,
  })
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const safeLocale = locale as SupportedLocale
  setRequestLocale(safeLocale)

  const t = await getTranslations({ locale: safeLocale, namespace: 'services' })

  console.debug('[services/page] fetching services, locale:', safeLocale)

  const services = await db.service.findMany({
    where: { published: true },
    include: { translations: { where: { locale: safeLocale } } },
    orderBy: { createdAt: 'asc' },
  })

  console.debug('[services/page] locale:', safeLocale, 'count:', services.length)

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mb-8 text-muted-foreground">{t('description')}</p>

      {services.length === 0 ? (
        <p className="text-muted-foreground">{t('noServices')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const translation = pickTranslation(service.translations, safeLocale as Locale)
            return (
              <ServiceCard
                key={service.slug}
                name={translation?.name ?? service.slug}
                slug={service.slug}
                description={translation?.description}
                image={service.images[0] ?? null}
                priceFrom={service.priceFrom !== null ? String(service.priceFrom) : null}
                priceFromLabel={t('service.priceFrom')}
                priceOnRequestLabel={t('service.priceOnRequest')}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
