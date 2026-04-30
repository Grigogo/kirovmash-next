import type { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/i18n'
import { getBaseUrl } from '@/lib/seo'
import { db } from '@/lib/db'

const BASE_URL = getBaseUrl()

const staticRoutes = ['', '/about', '/contacts', '/catalog', '/services']

function localeUrls(path: string): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}/ru${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}${path}`]),
      ),
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticRoutes.map(localeUrls)

  let dynamicEntries: MetadataRoute.Sitemap = []
  try {
    const [categories, products, services] = await Promise.all([
      db.category.findMany({ select: { slug: true, updatedAt: true } }),
      db.product.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true, category: { select: { slug: true } } },
      }),
      db.service.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ])

    const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${BASE_URL}/ru/catalog/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}/catalog/${c.slug}`]),
        ),
      },
    }))

    const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${BASE_URL}/ru/catalog/${p.category.slug}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [
            locale,
            `${BASE_URL}/${locale}/catalog/${p.category.slug}/${p.slug}`,
          ]),
        ),
      },
    }))

    const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
      url: `${BASE_URL}/ru/services/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}/services/${s.slug}`]),
        ),
      },
    }))

    dynamicEntries = [...categoryEntries, ...productEntries, ...serviceEntries]
  } catch {
    // DB unavailable during static generation — skip dynamic routes
  }

  return [...staticEntries, ...dynamicEntries]
}
