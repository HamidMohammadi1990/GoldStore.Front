import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { siteConfig } from '@/config/site'

export function AboutPage() {
  return (
    <>
      <PageHeader
        title={`درباره ${siteConfig.name}`}
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'درباره ما' }]}
      />
      <Container className="max-w-3xl py-12">
        <p className="text-sm leading-8 text-ink-muted">{siteConfig.description}</p>
        <p className="mt-6 text-sm leading-8 text-ink-muted">
          تیم طراحی و تولید ما هر فصل کالکشن‌های جدیدی ارائه می‌کند و با شعب حضوری،
          تجربه خرید آنلاین و حضوری را یکپارچه می‌کند. هدف ما شفافیت در قیمت، اصالت کالا و
          خدمات پس از فروش است.
        </p>
      </Container>
    </>
  )
}
