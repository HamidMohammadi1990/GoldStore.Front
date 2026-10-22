export interface CategoryChild {
  slug: string
  title: string
}

export interface Category {
  id: string
  slug: string
  title: string
  icon?: string
  imageUrl?: string
  productCount?: number
  children?: CategoryChild[]
}
