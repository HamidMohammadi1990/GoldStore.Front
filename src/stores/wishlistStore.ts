import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { ProductSummary } from '@/types/product'

type WishlistState = {
  productIds: string[]
  toggle: (productId: string) => void
  has: (productId: string) => boolean
  count: () => number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) =>
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        })),
      has: (productId) => get().productIds.includes(productId),
      count: () => get().productIds.length,
    }),
    { name: 'goldstore-wishlist' },
  ),
)

export function filterWishlistProducts(
  products: ProductSummary[],
  ids: string[],
): ProductSummary[] {
  const set = new Set(ids)
  return products.filter((p) => set.has(p.id))
}
