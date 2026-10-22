import { Link, useParams } from 'react-router-dom'

import { legalPages } from '@/mocks/siteContent'
import { StaticContentPage } from '@/pages/content/StaticContentPage'
import { Container } from '@/components/ui/Container'

export function LegalPage() {
  const { slug } = useParams()
  const page = slug ? legalPages[slug] : undefined

  if (!page) {
    return (
      <Container className="py-24 text-center">
        <p className="text-ink-muted">صفحه پیدا نشد.</p>
        <Link to="/legal/terms" className="mt-4 text-gold-700 hover:underline">
          قوانین و مقررات
        </Link>
      </Container>
    )
  }

  return (
    <StaticContentPage
      page={page}
      breadcrumbs={[
        { label: 'خانه', href: '/' },
        { label: page.title },
      ]}
    />
  )
}
