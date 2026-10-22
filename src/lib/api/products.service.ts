import { apiClient } from '@/lib/api/client'
import { apiEndpoints } from '@/lib/api/endpoints'
import { filterProducts } from '@/lib/catalog/filterProducts'
import {
  getProductDetailBySlug,
  getRelatedProducts,
  mockProductsEnriched,
} from '@/mocks/productDetails'
import type { ApiResponse, PaginatedResponse } from '@/types/api'
import type { ProductListFilters } from '@/types/catalog'
import type { ProductDetail, ProductSummary } from '@/types/product'

const useMock = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export async function fetchProductList(filters: ProductListFilters = {}) {
  if (useMock) {
    await delay(150)
    return filterProducts(mockProductsEnriched, filters)
  }

  const { data } = await apiClient.get<ApiResponse<PaginatedResponse<ProductSummary>>>(
    apiEndpoints.products.list,
    { params: filters },
  )
  const p = data.data
  return {
    items: p.items,
    page: p.page,
    pageSize: p.pageSize,
    totalCount: p.totalCount,
    totalPages: p.totalPages,
  }
}

export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
  if (useMock) {
    await delay(120)
    return getProductDetailBySlug(slug) ?? null
  }
  const { data } = await apiClient.get<ApiResponse<ProductDetail>>(
    apiEndpoints.products.bySlug(slug),
  )
  return data.data
}

export async function fetchRelatedProducts(product: ProductSummary) {
  if (useMock) {
    return getRelatedProducts(product)
  }
  const { data } = await apiClient.get<ApiResponse<ProductSummary[]>>(
    `${apiEndpoints.products.bySlug(product.slug)}/related`,
  )
  return data.data
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
