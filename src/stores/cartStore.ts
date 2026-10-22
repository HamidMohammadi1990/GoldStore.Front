import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { CartLineItem } from '@/types/cart'
import type { ProductSummary } from '@/types/product'

type CartState = {
  items: CartLineItem[]
  addItem: (
    product: ProductSummary,
    options?: { quantity?: number; size?: number },
  ) => void
  removeItem: (productId: string, size?: number) => void
  setQuantity: (productId: string, quantity: number, size?: number) => void
  clear: () => void
  totalItems: () => number
  subtotalToman: () => number
}

function lineKey(productId: string, size?: number) {
  return size ? `${productId}:${size}` : productId
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, options) => {
        const quantity = options?.quantity ?? 1
        const size = options?.size
        const key = lineKey(product.id, size)
        set((state) => {
          const existing = state.items.find(
            (i) => lineKey(i.productId, i.size) === key,
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                lineKey(i.productId, i.size) === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                title: product.title,
                code: product.code,
                imageUrl: product.imageUrl,
                priceToman: product.priceToman,
                weightGrams: product.weightGrams,
                quantity,
                size,
              },
            ],
          }
        })
      },
      removeItem: (productId, size) => {
        const key = lineKey(productId, size)
        set((state) => ({
          items: state.items.filter((i) => lineKey(i.productId, i.size) !== key),
        }))
      },
      setQuantity: (productId, quantity, size) => {
        const key = lineKey(productId, size)
        if (quantity < 1) {
          get().removeItem(productId, size)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            lineKey(i.productId, i.size) === key ? { ...i, quantity } : i,
          ),
        }))
      },
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotalToman: () =>
        get().items.reduce((sum, i) => sum + i.priceToman * i.quantity, 0),
    }),
    { name: 'goldstore-cart' },
  ),
)
