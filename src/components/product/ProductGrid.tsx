import { ProductCard } from '@/components/product/ProductCard'
import { cn } from '@/lib/utils/cn'
import type { ProductSummary } from '@/types/product'

type ProductGridProps = {
  products: ProductSummary[]
  className?: string
}

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-6',
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  )
}
