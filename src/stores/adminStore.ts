import { create } from 'zustand'

import { adminSeed } from '@/mocks/admin'
import type {
  AdminBlogPost,
  AdminCart,
  AdminCategory,
  AdminCollection,
  AdminMessage,
  AdminOrder,
  AdminProduct,
  AdminUser,
  AdminWishlist,
  ManagedContent,
  OrderStatus,
  UserRole,
  UserStatus,
} from '@/types/admin'

type WithId = { id: string }

function upsert<T extends WithId>(items: T[], item: T): T[] {
  const exists = items.some((entry) => entry.id === item.id)
  if (!exists) return [item, ...items]
  return items.map((entry) => (entry.id === item.id ? item : entry))
}

function removeById<T extends WithId>(items: T[], id: string): T[] {
  return items.filter((entry) => entry.id !== id)
}

type AdminState = {
  products: AdminProduct[]
  categories: AdminCategory[]
  collections: AdminCollection[]
  posts: AdminBlogPost[]
  users: AdminUser[]
  orders: AdminOrder[]
  carts: AdminCart[]
  wishlists: AdminWishlist[]
  messages: AdminMessage[]
  contents: ManagedContent[]
  saveProduct: (product: AdminProduct) => void
  removeProduct: (id: string) => void
  saveCategory: (category: AdminCategory) => void
  removeCategory: (id: string) => void
  saveCollection: (collection: AdminCollection) => void
  removeCollection: (id: string) => void
  savePost: (post: AdminBlogPost) => void
  removePost: (id: string) => void
  setUserStatus: (id: string, status: UserStatus) => void
  setUserRole: (id: string, role: UserRole) => void
  setOrderStatus: (id: string, status: OrderStatus) => void
  removeCart: (id: string) => void
  removeWishlist: (id: string) => void
  saveContent: (item: ManagedContent) => void
  markMessageRead: (id: string, read?: boolean) => void
  removeMessage: (id: string) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  ...adminSeed,
  saveProduct: (product) => set((state) => ({ products: upsert(state.products, product) })),
  removeProduct: (id) => set((state) => ({ products: removeById(state.products, id) })),
  saveCategory: (category) => set((state) => ({ categories: upsert(state.categories, category) })),
  removeCategory: (id) => set((state) => ({ categories: removeById(state.categories, id) })),
  saveCollection: (collection) =>
    set((state) => ({ collections: upsert(state.collections, collection) })),
  removeCollection: (id) => set((state) => ({ collections: removeById(state.collections, id) })),
  savePost: (post) => set((state) => ({ posts: upsert(state.posts, post) })),
  removePost: (id) => set((state) => ({ posts: removeById(state.posts, id) })),
  setUserStatus: (id, status) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, status } : user)),
    })),
  setUserRole: (id, role) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, role } : user)),
    })),
  setOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)),
    })),
  removeCart: (id) => set((state) => ({ carts: removeById(state.carts, id) })),
  removeWishlist: (id) => set((state) => ({ wishlists: removeById(state.wishlists, id) })),
  saveContent: (item) => set((state) => ({ contents: upsert(state.contents, item) })),
  markMessageRead: (id, read = true) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === id ? { ...message, read } : message,
      ),
    })),
  removeMessage: (id) => set((state) => ({ messages: removeById(state.messages, id) })),
}))
