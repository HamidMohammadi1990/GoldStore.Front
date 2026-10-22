import { Link, useParams } from 'react-router-dom'

import { guidePages } from '@/mocks/siteContent'
import { StaticContentPage } from '@/pages/content/StaticContentPage'
import { Container } from '@/components/ui/Container'

export function GuidePage() {
  const { slug } = useParams()
  const key = slug ?? ''
  const page = guidePages[key]

  if (!page) {
    return (
      <Container className="py-24 text-center">
        <p className="text-ink-muted">صفحه راهنما پیدا نشد.</p>
        <Link to="/guides/purchase" className="mt-4 text-gold-700 hover:underline">
          راهنمای خرید
        </Link>
      </Container>
    )
  }

  return (
    <StaticContentPage
      page={page}
      breadcrumbs={[
        { label: 'خانه', href: '/' },
        { label: 'راهنما', href: '/guides/purchase' },
        { label: page.title },
      ]}
    />
  )
}
