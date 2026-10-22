import { Link, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

type PaginationProps = {
  page: number
  totalPages: number
  basePath?: string
}

export function Pagination({ page, totalPages, basePath = '' }: PaginationProps) {
  const [searchParams] = useSearchParams()

  if (totalPages <= 1) return null

  const makeHref = (p: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(p))
    const qs = params.toString()
    return `${basePath}${qs ? `?${qs}` : ''}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  )

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="صفحه‌بندی">
      {page > 1 ? (
        <Link
          to={makeHref(page - 1)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-ink-muted hover:border-gold-300 hover:text-gold-800"
          aria-label="صفحه قبل"
        >
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span className="inline-flex size-10 items-center justify-center opacity-30" aria-hidden>
          <ChevronRight className="size-4" />
        </span>
      )}

      {pages.map((p, idx) => {
        const prev = pages[idx - 1]
        const showEllipsis = prev != null && p - prev > 1
        return (
          <span key={p} className="flex items-center gap-1">
            {showEllipsis ? <span className="px-1 text-ink-subtle">…</span> : null}
            <Link
              to={makeHref(p)}
              className={cn(
                'inline-flex min-w-10 h-10 items-center justify-center rounded-full px-2 text-sm font-medium transition-colors',
                p === page
                  ? 'bg-ink text-white'
                  : 'border border-border text-ink-muted hover:border-gold-300',
              )}
              aria-current={p === page ? 'page' : undefined}
            >
              {p.toLocaleString('fa-IR')}
            </Link>
          </span>
        )
      })}

      {page < totalPages ? (
        <Link
          to={makeHref(page + 1)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-ink-muted hover:border-gold-300 hover:text-gold-800"
          aria-label="صفحه بعد"
        >
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <span className="inline-flex size-10 items-center justify-center opacity-30" aria-hidden>
          <ChevronLeft className="size-4" />
        </span>
      )}
    </nav>
  )
}
