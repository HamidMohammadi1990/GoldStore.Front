import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

export type Crumb = { label: string; href?: string }

type BreadcrumbsProps = {
  items: Crumb[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="مسیر صفحه" className={cn('text-sm text-ink-muted', className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link to={item.href} className="transition-colors hover:text-gold-700">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-medium text-ink' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronLeft className="size-3.5 text-ink-subtle" aria-hidden />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
