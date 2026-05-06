import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  slug: string
  description?: string
  image?: string | null
  productCount?: number
}

export function CategoryCard({ name, slug, description, image, productCount }: Props) {
  return (
    <Link
      href={`/catalog/${slug}`}
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

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        )}
        {productCount !== undefined && (
          <p className="mt-auto pt-2 text-xs text-muted-foreground">{productCount} позиций</p>
        )}
      </div>
    </Link>
  )
}
