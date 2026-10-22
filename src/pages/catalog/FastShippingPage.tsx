import { ProductCatalogPage } from '@/pages/catalog/ProductCatalogPage'

export function FastShippingPage() {
  return (
    <ProductCatalogPage
      config={{
        title: 'ارسال فوری',
        description: 'محصولات آماده ارسال امروز — مناسب تهران و کرج',
        breadcrumbs: [
          { label: 'خانه', href: '/' },
          { label: 'ارسال فوری' },
        ],
        filterOverrides: { fastShipping: true },
        hideFastFilter: true,
      }}
    />
  )
}
