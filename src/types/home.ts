import type { Category } from '@/types/category'
import type { ProductSummary } from '@/types/product'

export interface HeroSlide {
  id: string
  title: string
  subtitle?: string
  ctaLabel: string
  ctaHref: string
  imageUrl: string
  accent?: string
}

export interface HomeSection {
  id: string
  title: string
  subtitle?: string
  viewAllHref?: string
  products: ProductSummary[]
}

export interface BlogPostSummary {
  id: string
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  publishedAt: string
}

export interface HomeContent {
  heroSlides: HeroSlide[]
  categories: Category[]
  fastShipping: HomeSection
  newArrivals: HomeSection
  collections: HomeSection
  blogPosts: BlogPostSummary[]
}
