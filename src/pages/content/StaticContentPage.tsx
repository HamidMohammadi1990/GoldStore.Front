import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import type { ContentPage } from '@/mocks/siteContent'

type StaticContentPageProps = {
  page: ContentPage
  breadcrumbs: { label: string; href?: string }[]
}

export function StaticContentPage({ page, breadcrumbs }: StaticContentPageProps) {
  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} breadcrumbs={breadcrumbs} />
      <Container className="max-w-3xl py-10">
        <div className="space-y-10">
          {page.sections.map((section, i) => (
            <section key={i}>
              {section.heading ? (
                <h2 className="text-lg font-semibold text-ink">{section.heading}</h2>
              ) : null}
              <div className={`space-y-4 ${section.heading ? 'mt-3' : ''}`}>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-sm leading-8 text-ink-muted">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}
