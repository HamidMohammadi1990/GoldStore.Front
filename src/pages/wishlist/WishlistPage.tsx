import { Link } from 'react-router-dom'

import { ProductGrid } from '@/components/product/ProductGrid'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { mockProductsEnriched } from '@/mocks/productDetails'
import { filterWishlistProducts, useWishlistStore } from '@/stores/wishlistStore'

export function WishlistPage() {
  const ids = useWishlistStore((s) => s.productIds)
  const products = filterWishlistProducts(mockProductsEnriched, ids)

  return (
    <>
      <PageHeader
        title="علاقه‌مندی‌ها"
        description="محصولاتی که برای خرید بعدی ذخیره کرده‌اید"
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'علاقه‌مندی‌ها' }]}
      />
      <Container className="py-10">
        {products.length === 0 ? (
          <EmptyState
            title="لیست علاقه‌مندی خالی است"
            description="با کلیک روی آیکن قلب، محصول را ذخیره کنید."
            action={
              <Link
                to="/products"
                className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-white"
              >
                مشاهده محصولات
              </Link>
            }
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </Container>
    </>
  )
}
