import { useSearchParams } from 'react-router-dom'

import { ProductCatalogPage } from '@/pages/catalog/ProductCatalogPage'

export function ProductsPage() {
  const [params] = useSearchParams()
  const q = params.get('q')

  return (
    <ProductCatalogPage
      config={{
        title: q ? `نتایج جستجو` : 'همه محصولات',
        description: q
          ? `جستجو برای «${q}»`
          : 'فهرست کامل زیورآلات طلا با فیلتر قیمت، وزن و ارسال فوری',
        breadcrumbs: [
          { label: 'خانه', href: '/' },
          { label: q ? 'جستجو' : 'محصولات' },
        ],
      }}
    />
  )
}
