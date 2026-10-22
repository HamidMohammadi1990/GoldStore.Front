import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

import { getCategoryIcon } from '@/config/categoryIcons'
import { cn } from '@/lib/utils/cn'
import type { Category } from '@/types/category'

function subCategoryHref(parentSlug: string, childTitle: string) {
  const params = new URLSearchParams({ q: childTitle })
  return `/categories/${parentSlug}?${params.toString()}`
}

type CategoryNavBlockProps = {
  categories: Category[]
  onNavigate?: () => void
  /** compact: منوی موبایل — default: صفحه دسته‌بندی */
  variant?: 'drawer' | 'page'
  defaultExpandedId?: string | null
}

export function CategoryNavBlock({
  categories,
  onNavigate,
  variant = 'drawer',
  defaultExpandedId = null,
}: CategoryNavBlockProps) {
  const [expandedId, setExpandedId] = useState<string | null>(defaultExpandedId)

  const toggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <ul className={cn('m-0 list-none p-0', variant === 'drawer' ? 'space-y-3' : 'grid gap-4 sm:grid-cols-2')}>
      {categories.map((cat) => {
        const hasChildren = Boolean(cat.children?.length)
        const open = expandedId === cat.id
        const icon = getCategoryIcon(cat.slug)

        if (variant === 'page') {
          return (
            <li
              key={cat.id}
              className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-soft"
            >
              <Link
                to={`/categories/${cat.slug}`}
                onClick={onNavigate}
                className="flex items-center gap-3 border-b border-border bg-gradient-to-l from-gold-50/80 to-transparent px-5 py-4 transition-colors hover:from-gold-100/80"
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-base text-gold-800"
                  aria-hidden
                >
                  {icon}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-base font-semibold text-ink">{cat.title}</span>
                  <span className="text-xs text-ink-subtle">مشاهده همه</span>
                </div>
              </Link>
              {hasChildren ? (
                <ul className="m-0 grid list-none gap-1 p-3 pt-2 sm:grid-cols-2">
                  {cat.children!.map((child) => (
                    <li key={child.slug}>
                      <Link
                        to={subCategoryHref(cat.slug, child.title)}
                        onClick={onNavigate}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-gold-50 hover:text-gold-800"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden />
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          )
        }

        return (
          <li
            key={cat.id}
            className="overflow-hidden rounded-2xl border border-border bg-surface-elevated"
          >
            <div className="flex items-stretch">
              <Link
                to={`/categories/${cat.slug}`}
                onClick={onNavigate}
                className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 transition-colors hover:bg-gold-50/60"
              >
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-100 to-gold-200/90 text-sm text-gold-900"
                  aria-hidden
                >
                  {icon}
                </span>
                <span className="text-sm font-semibold text-ink">{cat.title}</span>
              </Link>
              {hasChildren ? (
                <button
                  type="button"
                  className="flex w-12 shrink-0 items-center justify-center border-s border-border text-ink-muted transition-colors hover:bg-gold-50"
                  onClick={() => toggle(cat.id)}
                  aria-expanded={open}
                  aria-label={`زیرگروه‌های ${cat.title}`}
                >
                  <ChevronDown
                    className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
                  />
                </button>
              ) : null}
            </div>

            {hasChildren && open ? (
              <ul
                className="m-0 list-none border-t border-dashed border-gold-200/80 bg-gold-50/35 p-2"
                role="group"
                aria-label={`زیرگروه ${cat.title}`}
              >
                {cat.children!.map((child) => (
                  <li key={child.slug}>
                    <Link
                      to={subCategoryHref(cat.slug, child.title)}
                      onClick={onNavigate}
                      className="relative flex min-h-10 items-center gap-2 rounded-lg py-2 pe-3 ps-8 text-xs text-ink-muted transition-colors hover:bg-white/80 hover:text-gold-800"
                    >
                      <span
                        className="pointer-events-none absolute start-4 top-1/2 h-px w-3 -translate-y-1/2 bg-gold-300"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute start-3.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full border border-gold-400 bg-surface-elevated"
                        aria-hidden
                      />
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
