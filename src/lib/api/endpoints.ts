export const apiEndpoints = {
  products: {
    list: '/products',
    featured: '/products/featured',
    fastShipping: '/products/fast-shipping',
    bySlug: (slug: string) => `/products/${slug}`,
  },
  categories: {
    list: '/categories',
    tree: '/categories/tree',
  },
  home: {
    content: '/home',
  },
  cart: {
    root: '/cart',
  },
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
} as const
