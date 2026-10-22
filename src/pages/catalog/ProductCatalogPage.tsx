import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

import { Pagination } from '@/components/catalog/Pagination'
import { ProductFilters } from '@/components/catalog/ProductFilters'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/Skeleton'
import { useCatalogFilters } from '@/hooks/useCatalogFilters'
import { fetchProductList } from '@/lib/api/products.service'
import type { Crumb } from '@/components/ui/Breadcrumbs'
import { Link } from 'react-router-dom'

export type CatalogPageConfig = {
  title: string
  description?: string
  breadcrumbs: Crumb[]
  filterOverrides?: Parameters<typeof useCatalogFilters>[0]
  hideFastFilter?: boolean
}

export function ProductCatalogPage({ config }: { config: CatalogPageConfig }) {
  const location = useLocation()
  const filters = useCatalogFilters(config.filterOverrides)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProductList(filters),
  })

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        breadcrumbs={config.breadcrumbs}
      />
      <Container className="py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <ProductFilters showFastShipping={!config.hideFastFilter} />
          <div>
            <div className="mb-6 text-sm text-ink-muted">
              {isLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : data ? (
                <span>
                  {data.totalCount.toLocaleString('fa-IR')} محصول
                  {filters.q ? ` برای «${filters.q}»` : ''}
                </span>
              ) : null}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
                ))}
              </div>
            ) : isError || !data ? (
              <EmptyState title="خطا در بارگذاری محصولات" description="لطفاً دوباره تلاش کنید." />
            ) : data.items.length === 0 ? (
              <EmptyState
                title="محصولی پیدا نشد"
                description="فیلترها را تغییر دهید یا به فهرست کامل بازگردید."
                action={
                  <Link
                    to="/products"
                    className="inline-flex h-11 items-center rounded-full border border-border-strong px-6 text-sm font-medium"
                  >
                    همه محصولات
                  </Link>
                }
              />
            ) : (
              <>
                <ProductGrid products={data.items} />
                <div className="mt-10">
                  <Pagination
                    page={data.page}
                    totalPages={data.totalPages}
                    basePath={location.pathname}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
