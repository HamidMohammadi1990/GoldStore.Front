export type ProductBadge = 'fast-shipping' | 'new' | 'bestseller' | 'limited'

export interface ProductSummary {
  id: string
  slug: string
  title: string
  code: string
  priceToman: number
  weightGrams: number
  imageUrl: string
  categorySlug: string
  collectionName?: string
  collectionSlug?: string
  badges?: ProductBadge[]
  isInStock: boolean
  createdAt?: string
}

export interface ProductDetail extends ProductSummary {
  description: string
  images: string[]
  karat: number
  makingFeePercent?: number
  updatedAt: string
  ringSizes?: number[]
  specifications: { label: string; value: string }[]
}
