import { Link } from 'react-router-dom'

import { CategoryNavBlock } from '@/components/catalog/CategoryNavBlock'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { mockCategories } from '@/mocks/categories'

export function CategoriesPage() {
  return (
    <>
      <PageHeader
        title="دسته‌بندی محصولات"
        description="دسته اصلی را انتخاب کنید یا مستقیم به زیرگروه بروید"
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'دسته‌بندی‌ها' }]}
      />
      <Container className="py-10 lg:py-12">
        <CategoryNavBlock categories={mockCategories} variant="page" />
        <p className="mt-8 text-center text-sm text-ink-muted">
          <Link to="/products" className="font-medium text-gold-700 hover:underline">
            مشاهده همه محصولات
          </Link>
        </p>
      </Container>
    </>
  )
}
