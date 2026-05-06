import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { db } from '@/lib/db'
import { pickTranslation, LOCALES, type Locale } from '@/lib/i18n'
import { generatePageMetadata } from '@/lib/seo'
import { CategoryCard } from '@/components/public/category-card'

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
  const t = await getTranslations({ locale: safeLocale, namespace: 'catalog' })
  return generatePageMetadata(safeLocale, {
    title: t('title'),
    description: t('description'),
    path: `/${safeLocale}/catalog`,
  })
}

export default async function CatalogPage({ params }: Props) {
  const { locale } = await params
  const safeLocale = locale as SupportedLocale
  setRequestLocale(safeLocale)

  const t = await getTranslations({ locale: safeLocale, namespace: 'catalog' })

  console.debug('[catalog/page] fetching categories, locale:', safeLocale)

  const categories = await db.category.findMany({
    where: { products: { some: { published: true } } },
    include: {
      translations: { where: { locale: safeLocale } },
      _count: { select: { products: { where: { published: true } } } },
    },
    orderBy: { createdAt: 'asc' },
  })

  console.debug('[catalog/page] locale:', safeLocale, 'count:', categories.length)

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mb-8 text-muted-foreground">{t('description')}</p>

      {categories.length === 0 ? (
        <p className="text-muted-foreground">{t('noCategories')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const translation = pickTranslation(cat.translations, safeLocale as Locale)
            return (
              <CategoryCard
                key={cat.slug}
                name={translation?.name ?? cat.slug}
                slug={cat.slug}
                description={translation?.description ?? undefined}
                image={cat.image}
                productCount={cat._count.products}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
