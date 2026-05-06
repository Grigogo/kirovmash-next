import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { db } from '@/lib/db'
import { pickTranslation, type Locale } from '@/lib/i18n'
import { CatalogSidebar } from '@/components/public/catalog-sidebar'

type SupportedLocale = (typeof routing.locales)[number]

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function CatalogLayout({ children, params }: Props) {
  const { locale } = await params
  const safeLocale = locale as SupportedLocale
  setRequestLocale(safeLocale)

  const t = await getTranslations({ locale: safeLocale, namespace: 'catalog' })

  console.debug('[catalog/layout] fetching categories, locale:', safeLocale)

  const categories = await db.category.findMany({
    where: { products: { some: { published: true } } },
    include: { translations: { where: { locale: safeLocale } } },
    orderBy: { createdAt: 'asc' },
  })

  console.debug('[catalog/layout] fetched categories count:', categories.length)

  const sidebarCategories = categories.map((cat) => {
    const translation = pickTranslation(cat.translations, safeLocale as Locale)
    return {
      slug: cat.slug,
      name: translation?.name ?? cat.slug,
    }
  })

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex gap-8">
        <CatalogSidebar
          categories={sidebarCategories}
          allCategoriesLabel={t('category.allProducts')}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}
