import { useParams } from 'react-router-dom'

import { mockCategories } from '@/mocks/categories'
import { ProductCatalogPage } from '@/pages/catalog/ProductCatalogPage'

export function CategoryProductsPage() {
  const { slug } = useParams()
  const category = mockCategories.find((c) => c.slug === slug)

  if (!category) {
    return (
      <ProductCatalogPage
        config={{
          title: 'دسته‌بندی',
          breadcrumbs: [{ label: 'خانه', href: '/' }, { label: 'دسته‌بندی' }],
          filterOverrides: { categorySlug: slug },
        }}
      />
    )
  }

  return (
    <ProductCatalogPage
      config={{
        title: category.title,
        description: `مشاهده تمام محصولات دسته ${category.title}`,
        breadcrumbs: [
          { label: 'خانه', href: '/' },
          { label: 'دسته‌بندی‌ها', href: '/categories' },
          { label: category.title },
        ],
        filterOverrides: { categorySlug: category.slug },
      }}
    />
  )
}
