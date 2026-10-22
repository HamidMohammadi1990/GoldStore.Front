import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { mockCollections } from '@/mocks/collections'

export function CollectionsPage() {
  return (
    <>
      <PageHeader
        title="کالکشن‌ها"
        description="مجموعه‌های طراحی اختصاصی گلداستور"
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'کالکشن‌ها' }]}
      />
      <Container className="py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {mockCollections.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={col.coverImageUrl}
                  alt=""
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-ink group-hover:text-gold-800">
                  {col.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{col.description}</p>
                <p className="mt-3 text-xs text-ink-subtle">
                  {col.productCount.toLocaleString('fa-IR')} محصول
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}
