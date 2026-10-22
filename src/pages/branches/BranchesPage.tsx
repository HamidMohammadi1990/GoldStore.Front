import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { mockBranches } from '@/mocks/siteContent'

export function BranchesPage() {
  return (
    <>
      <PageHeader
        title="شعب حضوری"
        description="مراجعه برای مشاوره، تحویل سفارش و سرویس"
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'شعب' }]}
      />
      <Container className="py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockBranches.map((branch) => (
            <article
              key={branch.id}
              className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft"
            >
              <h2 className="text-lg font-semibold text-ink">{branch.name}</h2>
              <p className="mt-1 text-sm text-gold-700">{branch.city}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{branch.address}</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-subtle">تلفن</dt>
                  <dd className="font-medium">{branch.phone}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ink-subtle">ساعات</dt>
                  <dd>{branch.hours}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </>
  )
}
