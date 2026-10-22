import { Accordion } from '@/components/ui/Accordion'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { mockFaq } from '@/mocks/siteContent'

export function FaqPage() {
  const categories = [...new Set(mockFaq.map((f) => f.category))]

  return (
    <>
      <PageHeader
        title="سوالات متداول"
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'سوالات متداول' }]}
      />
      <Container className="max-w-3xl py-12 space-y-10">
        {categories.map((cat) => (
          <section key={cat}>
            <h2 className="mb-4 text-lg font-semibold text-ink">{cat}</h2>
            <Accordion
              items={mockFaq
                .filter((f) => f.category === cat)
                .map((f) => ({
                  id: f.id,
                  title: f.question,
                  content: f.answer,
                }))}
            />
          </section>
        ))}
      </Container>
    </>
  )
}
