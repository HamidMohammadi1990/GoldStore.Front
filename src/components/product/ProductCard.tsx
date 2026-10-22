import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ProductBadgePill } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import { formatPriceToman, formatWeightGrams } from '@/lib/utils/format'
import { useWishlistStore } from '@/stores/wishlistStore'
import type { ProductSummary } from '@/types/product'

type ProductCardProps = {
  product: ProductSummary
  className?: string
  priority?: boolean
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const primaryBadge = product.badges?.[0]
  const { toggle, has } = useWishlistStore()
  const wished = has(product.id)

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated transition-shadow hover:shadow-card',
        className,
      )}
    >
      <Link
        to={`/products/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-gold-50"
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          loading={priority ? 'eager' : 'lazy'}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {primaryBadge ? (
          <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
            <ProductBadgePill type={primaryBadge} />
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/products/${product.slug}`} className="flex-1">
            <h3 className="line-clamp-2 text-sm font-medium leading-relaxed text-ink transition-colors group-hover:text-gold-800">
              {product.title}
            </h3>
            <p className="mt-1 text-xs text-ink-subtle">کد {product.code}</p>
          </Link>
          <button
            type="button"
            className="shrink-0 rounded-full p-2 text-ink-subtle transition-colors hover:bg-gold-50 hover:text-gold-700"
            aria-label="افزودن به علاقه‌مندی‌ها"
            aria-pressed={wished}
            onClick={() => toggle(product.id)}
          >
            <Heart className={cn('size-4', wished && 'fill-gold-500 text-gold-500')} />
          </button>
        </div>

        <div className="mt-auto space-y-1 border-t border-border pt-3">
          <p className="text-base font-semibold text-ink">
            {formatPriceToman(product.priceToman)}
          </p>
          <p className="text-xs text-ink-muted">{formatWeightGrams(product.weightGrams)}</p>
        </div>
      </div>
    </article>
  )
}
