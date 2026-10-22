import type { ProductSummary } from '@/types/product'

export type ProductSort =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'weight-asc'
  | 'weight-desc'

export interface ProductListFilters {
  page?: number
  pageSize?: number
  sort?: ProductSort
  categorySlug?: string
  collectionSlug?: string
  fastShipping?: boolean
  q?: string
  minPrice?: number
  maxPrice?: number
}

export interface ProductListResult {
  items: ProductSummary[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}
