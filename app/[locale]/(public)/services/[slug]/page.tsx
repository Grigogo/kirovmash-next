import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { db } from '@/lib/db'
import { pickTranslation, type Locale } from '@/lib/i18n'
import { generatePageMetadata } from '@/lib/seo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SupportedLocale = (typeof routing.locales)[number]

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const safeLocale: SupportedLocale = routing.locales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : routing.defaultLocale

  const service = await db.service.findUnique({
    where: { slug },
    include: { translations: { where: { locale: safeLocale } } },
  })

  if (!service) return {}

  const translation = pickTranslation(service.translations, safeLocale as Locale)
  return generatePageMetadata(safeLocale, {
    title: translation?.name ?? slug,
    description: translation?.description ?? undefined,
    path: `/${safeLocale}/services/${slug}`,
  })
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const safeLocale = locale as SupportedLocale
  setRequestLocale(safeLocale)

  const t = await getTranslations({ locale: safeLocale, namespace: 'services' })

  console.debug('[services/[slug]/page] slug:', slug, 'locale:', safeLocale)

  const service = await db.service.findUnique({
    where: { slug },
    include: { translations: { where: { locale: safeLocale } } },
  })

  if (!service || !service.published) notFound()

  const translation = pickTranslation(service.translations, safeLocale as Locale)
  const serviceName = translation?.name ?? slug

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/services" className="hover:text-foreground transition-colors">
          {t('title')}
        </Link>
        <span>/</span>
        <span className="text-foreground">{serviceName}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
          {service.images[0] ? (
            <Image
              src={service.images[0]}
              alt={serviceName}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="h-24 w-24 rounded-xl bg-primary/10" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold tracking-tight">{serviceName}</h1>

          <div className="text-lg font-semibold">
            {service.priceFrom ? (
              <span className="text-primary">
                {t('service.priceFrom')}: {String(service.priceFrom)} ₽
              </span>
            ) : (
              <span className="text-muted-foreground">{t('service.priceOnRequest')}</span>
            )}
          </div>

          {translation?.description && (
            <p className="text-muted-foreground leading-relaxed">{translation.description}</p>
          )}

          <Link href="/contacts" className={cn(buttonVariants(), 'mt-2 w-fit')}>
            {t('service.requestButton')}
          </Link>
        </div>
      </div>
    </div>
  )
}
