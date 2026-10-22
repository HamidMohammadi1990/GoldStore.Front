import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductPurchasePanel } from '@/components/product/ProductPurchasePanel'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { Skeleton } from '@/components/ui/Skeleton'
import { mockCategories } from '@/mocks/categories'
import { fetchProductBySlug, fetchRelatedProducts } from '@/lib/api/products.service'

export function ProductDetailPage() {
  const { slug } = useParams()
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug!),
    enabled: Boolean(slug),
  })

  const { data: related } = useQuery({
    queryKey: ['product', slug, 'related'],
    queryFn: () => fetchRelatedProducts(product!),
    enabled: Boolean(product),
  })

  if (isLoading) {
    return (
      <Container className="py-10">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Skeleton className="h-[17.5rem] rounded-2xl sm:h-[20rem]" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </Container>
    )
  }

  if (isError || !product) {
    return (
      <Container className="py-24 text-center">
        <p className="text-ink-muted">محصول مورد نظر یافت نشد.</p>
        <Link to="/products" className="mt-4 inline-block text-gold-700 hover:underline">
          بازگشت به محصولات
        </Link>
      </Container>
    )
  }

  const category = mockCategories.find((c) => c.slug === product.categorySlug)

  return (
    <>
      <Container className="py-6">
        <Breadcrumbs
          items={[
            { label: 'خانه', href: '/' },
            { label: 'محصولات', href: '/products' },
            ...(category
              ? [{ label: category.title, href: `/categories/${category.slug}` }]
              : []),
            { label: product.title },
          ]}
        />
      </Container>

      <Container className="pb-12">
        <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-8 xl:grid-cols-2 xl:gap-10">
          <ProductGallery images={product.images} title={product.title} />
          <ProductPurchasePanel product={product} />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-ink">توضیحات</h2>
            <p className="mt-3 text-sm leading-8 text-ink-muted">{product.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">مشخصات</h2>
            <dl className="mt-3 divide-y divide-border rounded-2xl border border-border">
              {product.specifications.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-ink-muted">{row.label}</dt>
                  <dd className="font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {related?.length ? (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-semibold text-ink">محصولات مرتبط</h2>
            <ProductGrid products={related} />
          </div>
        ) : null}
      </Container>
    </>
  )
}
