import { createBrowserRouter } from 'react-router-dom'

import { AdminLayout } from '@/components/admin/AdminLayout'
import { MainLayout } from '@/components/layout/MainLayout'
import { AdminBlogFormPage } from '@/pages/admin/BlogFormPage'
import { AdminBlogPage } from '@/pages/admin/BlogPage'
import { AdminCartsPage } from '@/pages/admin/CartsPage'
import { AdminCategoriesPage } from '@/pages/admin/CategoriesPage'
import { AdminCollectionsPage } from '@/pages/admin/CollectionsPage'
import { AdminContentPage } from '@/pages/admin/ContentPage'
import { AdminDashboardPage } from '@/pages/admin/DashboardPage'
import { AdminMessagesPage } from '@/pages/admin/MessagesPage'
import { AdminOrderDetailPage } from '@/pages/admin/OrderDetailPage'
import { AdminOrdersPage } from '@/pages/admin/OrdersPage'
import { AdminProductFormPage } from '@/pages/admin/ProductFormPage'
import { AdminProductsPage } from '@/pages/admin/ProductsPage'
import { AdminUsersPage } from '@/pages/admin/UsersPage'
import { AdminWishlistsPage } from '@/pages/admin/WishlistsPage'
import { AccountPage } from '@/pages/account/AccountPage'
import { AboutPage } from '@/pages/about/AboutPage'
import { BlogListingPage } from '@/pages/blog/BlogListingPage'
import { BlogPostPage } from '@/pages/blog/BlogPostPage'
import { BranchesPage } from '@/pages/branches/BranchesPage'
import { CartPage } from '@/pages/cart/CartPage'
import { CategoryProductsPage } from '@/pages/catalog/CategoryProductsPage'
import { CollectionProductsPage } from '@/pages/catalog/CollectionProductsPage'
import { FastShippingPage } from '@/pages/catalog/FastShippingPage'
import { ProductsPage } from '@/pages/catalog/ProductsPage'
import { CategoriesPage } from '@/pages/categories/CategoriesPage'
import { CheckoutPage } from '@/pages/checkout/CheckoutPage'
import { CollectionsPage } from '@/pages/collections/CollectionsPage'
import { ContactPage } from '@/pages/contact/ContactPage'
import { GuidePage } from '@/pages/content/GuidePage'
import { LegalPage } from '@/pages/content/LegalPage'
import { FaqPage } from '@/pages/faq/FaqPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProductDetailPage } from '@/pages/products/ProductDetailPage'
import { TreasuryPage } from '@/pages/treasury/TreasuryPage'
import { WishlistPage } from '@/pages/wishlist/WishlistPage'

export const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'products', element: <AdminProductsPage /> },
      { path: 'products/new', element: <AdminProductFormPage /> },
      { path: 'products/:id', element: <AdminProductFormPage /> },
      { path: 'categories', element: <AdminCategoriesPage /> },
      { path: 'collections', element: <AdminCollectionsPage /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'blog', element: <AdminBlogPage /> },
      { path: 'blog/new', element: <AdminBlogFormPage /> },
      { path: 'blog/:id', element: <AdminBlogFormPage /> },
      { path: 'content', element: <AdminContentPage /> },
      { path: 'carts', element: <AdminCartsPage /> },
      { path: 'orders', element: <AdminOrdersPage /> },
      { path: 'orders/:id', element: <AdminOrderDetailPage /> },
      { path: 'wishlists', element: <AdminWishlistsPage /> },
      { path: 'messages', element: <AdminMessagesPage /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },

      { path: 'categories', element: <CategoriesPage /> },
      { path: 'categories/:slug', element: <CategoryProductsPage /> },

      { path: 'fast-shipping', element: <FastShippingPage /> },

      { path: 'collections', element: <CollectionsPage /> },
      { path: 'collections/:slug', element: <CollectionProductsPage /> },

      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'account', element: <AccountPage /> },

      { path: 'blog', element: <BlogListingPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },

      { path: 'treasury', element: <TreasuryPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'branches', element: <BranchesPage /> },
      { path: 'faq', element: <FaqPage /> },

      { path: 'guides/:slug', element: <GuidePage /> },
      { path: 'legal/:slug', element: <LegalPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
