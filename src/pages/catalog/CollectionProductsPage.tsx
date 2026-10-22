import { useParams } from 'react-router-dom'

import { mockCollections } from '@/mocks/collections'
import { ProductCatalogPage } from '@/pages/catalog/ProductCatalogPage'

export function CollectionProductsPage() {
  const { slug } = useParams()
  const collection = mockCollections.find((c) => c.slug === slug)

  return (
    <ProductCatalogPage
      config={{
        title: collection?.title ?? 'کالکشن',
        description: collection?.description,
        breadcrumbs: [
          { label: 'خانه', href: '/' },
          { label: 'کالکشن‌ها', href: '/collections' },
          { label: collection?.title ?? slug ?? 'کالکشن' },
        ],
        filterOverrides: { collectionSlug: slug },
      }}
    />
  )
}
