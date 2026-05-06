import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type Category = {
  slug: string
  name: string
}

type Props = {
  categories: Category[]
  activeCategorySlug?: string
  allCategoriesLabel: string
}

export function CatalogSidebar({ categories, activeCategorySlug, allCategoriesLabel }: Props) {
  return (
    <aside className="w-56 shrink-0">
      <nav className="sticky top-24 flex flex-col gap-0.5">
        <Link
          href="/catalog"
          className={cn(
            'rounded-md px-3 py-2 text-sm font-medium transition-colors',
            !activeCategorySlug
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground',
          )}
        >
          {allCategoriesLabel}
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/catalog/${cat.slug}`}
            className={cn(
              'rounded-md px-3 py-2 text-sm transition-colors',
              activeCategorySlug === cat.slug
                ? 'bg-primary/10 font-medium text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {cat.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
