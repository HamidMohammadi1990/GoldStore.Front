import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { LayoutGrid, Sparkles, User, X } from 'lucide-react'

import { CategoryNavBlock } from '@/components/catalog/CategoryNavBlock'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils/cn'
import type { Category } from '@/types/category'

type NavItem = { label: string; href: string }

type MobileNavDrawerProps = {
  open: boolean
  onClose: () => void
  categories: Category[]
  mainNav: NavItem[]
}

function NavSectionTitle({
  icon,
  title,
  hint,
}: {
  icon: ReactNode
  title: string
  hint?: string
}) {
  return (
    <div className="mb-3 flex items-center gap-2 px-1">
      <span className="flex size-7 items-center justify-center rounded-lg bg-gold-100 text-gold-800">
        {icon}
      </span>
      <div>
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        {hint ? <p className="text-[11px] text-ink-subtle">{hint}</p> : null}
      </div>
    </div>
  )
}

export function MobileNavDrawer({
  open,
  onClose,
  categories,
  mainNav,
}: MobileNavDrawerProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="منوی موبایل"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] transition-opacity"
        aria-label="بستن منو"
        onClick={onClose}
      />

      <div
        className={cn(
          'mobile-nav-panel absolute inset-y-0 start-0 flex w-full max-w-[min(100%,22rem)] flex-col',
          'border-e border-border bg-surface shadow-card',
        )}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface-elevated px-4">
          <span className="font-semibold text-ink">{siteConfig.name}</span>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-gold-50 hover:text-ink"
            onClick={onClose}
            aria-label="بستن منو"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4"
          aria-label="موبایل"
        >
          <section className="mb-5">
            <NavSectionTitle
              icon={<LayoutGrid className="size-4" />}
              title="دسته‌بندی محصولات"
              hint="روی فلش بزنید برای زیرگروه‌ها"
            />
            <CategoryNavBlock
              categories={categories}
              onNavigate={onClose}
              variant="drawer"
              defaultExpandedId={categories[0]?.id ?? null}
            />
            <Link
              to="/categories"
              onClick={onClose}
              className="mt-3 flex min-h-10 items-center justify-center rounded-xl border border-dashed border-gold-300 bg-gold-50/50 text-sm font-medium text-gold-800"
            >
              نمایش همه دسته‌ها
            </Link>
          </section>

          <div className="my-4 h-px bg-gradient-to-l from-transparent via-border to-transparent" />

          <section className="rounded-2xl border border-border bg-ink/[0.03] p-3">
            <NavSectionTitle
              icon={<Sparkles className="size-4" />}
              title="منوی فروشگاه"
              hint="صفحات ویژه و خدمات"
            />
            <ul className="m-0 list-none space-y-1 p-0">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-ink transition-colors active:bg-white hover:bg-surface-elevated"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </nav>

        <div className="shrink-0 border-t border-border bg-surface-elevated p-3">
          <Link
            to="/admin"
            className="mb-2 flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm font-medium text-ink"
            onClick={onClose}
          >
            داشبورد مدیریت
          </Link>
          <Link
            to="/account"
            className="flex min-h-11 items-center gap-2 rounded-xl bg-ink px-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            onClick={onClose}
          >
            <User className="size-4 shrink-0" />
            ورود / ثبت‌نام
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  )
}
