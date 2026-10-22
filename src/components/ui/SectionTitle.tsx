import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

type SectionTitleProps = {
  title: string
  subtitle?: string
  viewAllHref?: string
  viewAllLabel?: string
  className?: string
}

export function SectionTitle({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = 'مشاهده همه',
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1.5 text-sm text-ink-muted sm:text-base">{subtitle}</p>
        ) : null}
      </div>
      {viewAllHref ? (
        <Link
          to={viewAllHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-gold-700 transition-colors hover:text-gold-600"
        >
          {viewAllLabel}
          <ChevronLeft className="size-4" aria-hidden />
        </Link>
      ) : null}
    </div>
  )
}
