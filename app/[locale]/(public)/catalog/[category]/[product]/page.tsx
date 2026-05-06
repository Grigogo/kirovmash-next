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
  params: Promise<{ locale: string; category: string; product: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: categorySlug, product: productSlug } = await params
  const safeLocale: SupportedLocale = routing.locales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : routing.defaultLocale

  const product = await db.product.findUnique({
    where: { slug: productSlug },
    include: { translations: { where: { locale: safeLocale } } },
  })

  if (!product) return {}

  const translation = pickTranslation(product.translations, safeLocale as Locale)
  return generatePageMetadata(safeLocale, {
    title: translation?.name ?? productSlug,
    description: translation?.description ?? undefined,
    path: `/${safeLocale}/catalog/${categorySlug}/${productSlug}`,
  })
}

export default async function ProductPage({ params }: Props) {
  const { locale, category: categorySlug, product: productSlug } = await params
  const safeLocale = locale as SupportedLocale
  setRequestLocale(safeLocale)

  const t = await getTranslations({ locale: safeLocale, namespace: 'catalog' })

  console.debug('[catalog/[category]/[product]/page] slug:', productSlug, 'locale:', safeLocale)

  const product = await db.product.findUnique({
    where: { slug: productSlug },
    include: {
      translations: { where: { locale: safeLocale } },
      category: { include: { translations: { where: { locale: safeLocale } } } },
    },
  })

  if (!product || product.category.slug !== categorySlug) notFound()

  const translation = pickTranslation(product.translations, safeLocale as Locale)
  const categoryTranslation = pickTranslation(
    product.category.translations,
    safeLocale as Locale,
  )

  const productName = translation?.name ?? productSlug
  const categoryName = categoryTranslation?.name ?? categorySlug
  const specs = product.specs as Record<string, string> | null

  return (
    <div>
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/catalog" className="hover:text-foreground transition-colors">
          {t('title')}
        </Link>
        <span>/</span>
        <Link
          href={`/catalog/${categorySlug}`}
          className="hover:text-foreground transition-colors"
        >
          {categoryName}
        </Link>
        <span>/</span>
        <span className="text-foreground">{productName}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={productName}
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

          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted"
                >
                  <Image
                    src={img}
                    alt={`${productName} ${i + 2}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold tracking-tight">{productName}</h1>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-sm font-medium',
                product.inStock
                  ? 'bg-green-100 text-green-700'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              {product.inStock ? t('product.inStock') : t('product.outOfStock')}
            </span>
          </div>

          <div className="text-lg font-semibold">
            {product.priceOnRequest || !product.price ? (
              <span className="text-muted-foreground">{t('product.priceOnRequest')}</span>
            ) : (
              <span className="text-primary">
                {t('product.price')}: {String(product.price)} ₽
              </span>
            )}
          </div>

          {translation?.description && (
            <p className="text-muted-foreground leading-relaxed">{translation.description}</p>
          )}

          <Link
            href="/contacts"
            className={cn(buttonVariants(), 'mt-2 w-fit')}
          >
            {t('product.requestButton')}
          </Link>
        </div>
      </div>

      {specs && Object.keys(specs).length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">{t('product.specs')}</h2>
          <table className="w-full border-collapse text-sm">
            <tbody>
              {Object.entries(specs).map(([key, value]) => (
                <tr key={key} className="border-b last:border-0">
                  <td className="py-2 pr-4 font-medium text-muted-foreground w-1/2">{key}</td>
                  <td className="py-2 text-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
