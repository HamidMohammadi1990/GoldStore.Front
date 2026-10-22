import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@/components/layout/MainLayout'
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
