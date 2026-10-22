import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-semibold text-gold-300">۴۰۴</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink">صفحه پیدا نشد</h1>
      <p className="mt-2 max-w-md text-sm text-ink-muted">
        آدرس را بررسی کنید یا به صفحه اصلی بازگردید.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-white"
      >
        صفحه اصلی
      </Link>
    </Container>
  )
}
