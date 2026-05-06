import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  slug: string
  categorySlug: string
  image?: string | null
  price?: number | string | null
  priceOnRequest: boolean
  inStock: boolean
  priceLabel: string
  priceOnRequestLabel: string
  inStockLabel: string
  outOfStockLabel: string
}

export function ProductCard({
  name,
  slug,
  categorySlug,
  image,
  price,
  priceOnRequest,
  inStock,
  priceLabel,
  priceOnRequestLabel,
  inStockLabel,
  outOfStockLabel,
}: Props) {
  return (
    <Link
      href={`/catalog/${categorySlug}/${slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border bg-card transition-all',
        'hover:border-primary hover:shadow-md',
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="h-16 w-16 rounded-lg bg-primary/10" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-sm font-medium">
            {priceOnRequest || !price ? (
              <span className="text-muted-foreground">{priceOnRequestLabel}</span>
            ) : (
              <span className="text-primary">
                {priceLabel}: {price}
              </span>
            )}
          </span>

          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium',
              inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {inStock ? inStockLabel : outOfStockLabel}
          </span>
        </div>
      </div>
    </Link>
  )
}
