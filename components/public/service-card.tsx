import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  slug: string
  description?: string | null
  image?: string | null
  priceFrom?: number | string | null
  priceFromLabel: string
  priceOnRequestLabel: string
}

export function ServiceCard({
  name,
  slug,
  description,
  image,
  priceFrom,
  priceFromLabel,
  priceOnRequestLabel,
}: Props) {
  return (
    <Link
      href={`/services/${slug}`}
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

        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        )}

        <div className="mt-auto pt-2 text-sm font-medium">
          {priceFrom ? (
            <span className="text-primary">
              {priceFromLabel}: {priceFrom} ₽
            </span>
          ) : (
            <span className="text-muted-foreground">{priceOnRequestLabel}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
