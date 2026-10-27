import type { BlogPost } from '@/types/blog'
import type { Category } from '@/types/category'
import type { Collection } from '@/types/collection'
import type { ProductSummary } from '@/types/product'

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type UserRole = 'customer' | 'admin'
export type UserStatus = 'active' | 'blocked'
export type PublishStatus = 'published' | 'draft'
export type ContentKind = 'guide' | 'legal' | 'faq' | 'branch'

export type AdminProduct = ProductSummary & {
  published: boolean
}

export type AdminCategory = Category & {
  published: boolean
}

export type AdminCollection = Collection & {
  published: boolean
}

export type AdminBlogPost = BlogPost & {
  status: PublishStatus
}

export interface AdminUser {
  id: string
  fullName: string
  mobile: string
  email: string
  city: string
  role: UserRole
  status: UserStatus
  joinedAt: string
}

export interface AdminOrderItem {
  productId: string
  title: string
  code: string
  quantity: number
  priceToman: number
}

export interface AdminOrder {
  id: string
  number: string
  customerName: string
  mobile: string
  city: string
  address: string
  status: OrderStatus
  createdAt: string
  shippingToman: number
  note?: string
  items: AdminOrderItem[]
}

export interface AdminCartItem {
  title: string
  code: string
  quantity: number
  priceToman: number
}

export interface AdminCart {
  id: string
  customerName: string
  mobile: string
  updatedAt: string
  items: AdminCartItem[]
}

export interface AdminWishlist {
  id: string
  customerName: string
  mobile: string
  updatedAt: string
  productIds: string[]
}

export interface AdminMessage {
  id: string
  name: string
  email: string
  subject: string
  body: string
  createdAt: string
  read: boolean
}

export interface ManagedContent {
  id: string
  kind: ContentKind
  title: string
  body: string
  meta: string
  published: boolean
  updatedAt: string
}
