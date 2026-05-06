import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { db } from '@/lib/db'
import { pickTranslation, type Locale } from '@/lib/i18n'
import { generatePageMetadata } from '@/lib/seo'
import { ProductCard } from '@/components/public/product-card'

type SupportedLocale = (typeof routing.locales)[number]

type Props = {
  params: Promise<{ locale: string; category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: categorySlug } = await params
  const safeLocale: SupportedLocale = routing.locales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : routing.defaultLocale

  const category = await db.category.findUnique({
    where: { slug: categorySlug },
    include: { translations: { where: { locale: safeLocale } } },
  })

  if (!category) return {}

  const translation = pickTranslation(category.translations, safeLocale as Locale)
  return generatePageMetadata(safeLocale, {
    title: translation?.name ?? categorySlug,
    description: translation?.description ?? undefined,
    path: `/${safeLocale}/catalog/${categorySlug}`,
  })
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category: categorySlug } = await params
  const safeLocale = locale as SupportedLocale
  setRequestLocale(safeLocale)

  const t = await getTranslations({ locale: safeLocale, namespace: 'catalog' })

  console.debug('[catalog/[category]/page] slug:', categorySlug, 'locale:', safeLocale)

  const category = await db.category.findUnique({
    where: { slug: categorySlug },
    include: {
      translations: { where: { locale: safeLocale } },
      products: {
        where: { published: true },
        include: { translations: { where: { locale: safeLocale } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!category) notFound()

  const categoryTranslation = pickTranslation(category.translations, safeLocale as Locale)
  const categoryName = categoryTranslation?.name ?? categorySlug

  console.debug(
    '[catalog/[category]/page] slug:',
    categorySlug,
    'products:',
    category.products.length,
  )

  return (
    <div>
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/catalog" className="hover:text-foreground transition-colors">
          {t('title')}
        </Link>
        <span>/</span>
        <span className="text-foreground">{categoryName}</span>
      </nav>

      <h1 className="mb-8 text-2xl font-bold tracking-tight">{categoryName}</h1>

      {category.products.length === 0 ? (
        <p className="text-muted-foreground">{t('category.noProducts')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {category.products.map((product) => {
            const translation = pickTranslation(product.translations, safeLocale as Locale)
            return (
              <ProductCard
                key={product.slug}
                name={translation?.name ?? product.slug}
                slug={product.slug}
                categorySlug={categorySlug}
                image={product.images[0] ?? null}
                price={product.price !== null ? String(product.price) : null}
                priceOnRequest={product.priceOnRequest}
                inStock={product.inStock}
                priceLabel={t('product.price')}
                priceOnRequestLabel={t('product.priceOnRequest')}
                inStockLabel={t('product.inStock')}
                outOfStockLabel={t('product.outOfStock')}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
