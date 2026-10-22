export interface CartLineItem {
  productId: string
  slug: string
  title: string
  code: string
  imageUrl: string
  priceToman: number
  weightGrams: number
  quantity: number
  size?: number
}
