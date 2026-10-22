import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { ProductListFilters, ProductSort } from '@/types/catalog'

export function useCatalogFilters(overrides?: Partial<ProductListFilters>) {
  const [searchParams] = useSearchParams()

  return useMemo(() => {
    const page = Number(searchParams.get('page') ?? '1')
    const sort = (searchParams.get('sort') as ProductSort) || 'newest'
    const min = searchParams.get('minPrice')
    const max = searchParams.get('maxPrice')

    return {
      page: Number.isFinite(page) ? page : 1,
      pageSize: 12,
      sort,
      q: searchParams.get('q') ?? undefined,
      minPrice: min ? Number(min.replace(/\D/g, '')) : undefined,
      maxPrice: max ? Number(max.replace(/\D/g, '')) : undefined,
      fastShipping:
        overrides?.fastShipping ??
        (searchParams.get('fast') === '1' ? true : undefined),
      categorySlug: overrides?.categorySlug,
      collectionSlug: overrides?.collectionSlug,
    } satisfies ProductListFilters
  }, [searchParams, overrides?.categorySlug, overrides?.collectionSlug, overrides?.fastShipping])
}
