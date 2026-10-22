import type { ProductListFilters, ProductListResult, ProductSort } from '@/types/catalog'
import type { ProductSummary } from '@/types/product'

const sortFns: Record<ProductSort, (a: ProductSummary, b: ProductSummary) => number> = {
  newest: (a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''),
  'price-asc': (a, b) => a.priceToman - b.priceToman,
  'price-desc': (a, b) => b.priceToman - a.priceToman,
  'weight-asc': (a, b) => a.weightGrams - b.weightGrams,
  'weight-desc': (a, b) => b.weightGrams - a.weightGrams,
}

export function filterProducts(
  source: ProductSummary[],
  filters: ProductListFilters,
): ProductListResult {
  const pageSize = filters.pageSize ?? 12
  const page = filters.page ?? 1
  let items = [...source]

  if (filters.categorySlug) {
    items = items.filter((p) => p.categorySlug === filters.categorySlug)
  }
  if (filters.collectionSlug) {
    items = items.filter((p) => p.collectionSlug === filters.collectionSlug)
  }
  if (filters.fastShipping) {
    items = items.filter((p) => p.badges?.includes('fast-shipping'))
  }
  if (filters.q?.trim()) {
    const q = filters.q.trim().toLowerCase()
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.collectionName?.includes(filters.q!.trim()),
    )
  }
  if (filters.minPrice != null) {
    items = items.filter((p) => p.priceToman >= filters.minPrice!)
  }
  if (filters.maxPrice != null) {
    items = items.filter((p) => p.priceToman <= filters.maxPrice!)
  }

  const sort = filters.sort ?? 'newest'
  items.sort(sortFns[sort])

  const totalCount = items.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalCount,
    totalPages,
  }
}
