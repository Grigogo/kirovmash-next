import type { Metadata } from 'next'
import { LOCALES, type Locale } from './i18n'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://kirovmash.ru'

type SeoStrings = {
  title: string
  description: string
  siteName: string
}

const seoStrings: Record<Locale, SeoStrings> = {
  ru: {
    title: 'Кировмаш — конвейерное оборудование',
    description:
      'Производство и обслуживание конвейерного оборудования: ленточные, винтовые, скребковые конвейеры, нории, элеваторы.',
    siteName: 'Кировмаш',
  },
  en: {
    title: 'Kirovmash — conveyor equipment',
    description:
      'Manufacturing and servicing conveyor equipment: belt, screw, scraper conveyors, bucket elevators.',
    siteName: 'Kirovmash',
  },
}

const ogLocale: Record<Locale, string> = {
  ru: 'ru_RU',
  en: 'en_US',
}

export function getBaseUrl(): string {
  return BASE_URL
}

export function generatePageMetadata(
  locale: Locale,
  overrides?: Partial<SeoStrings & { path?: string }>,
): Metadata {
  const t: SeoStrings = { ...seoStrings[locale], ...overrides }
  const pagePath = overrides?.path ?? `/${locale}`
  const canonicalUrl = `${BASE_URL}${pagePath}`

  const alternateLanguages = Object.fromEntries(
    LOCALES.map((l) => [l, `${BASE_URL}/${l}${pagePath.replace(`/${locale}`, '')}`]),
  )

  return {
    title: {
      default: t.title,
      template: `%s | ${t.siteName}`,
    },
    description: t.description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: t.title,
      description: t.description,
      siteName: t.siteName,
      locale: ogLocale[locale],
      type: 'website',
      url: canonicalUrl,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
  }
}
