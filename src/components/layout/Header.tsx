import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Heart,
  LayoutDashboard,
  Menu,
  Search,
  ShoppingBag,
  User,
} from 'lucide-react'

import { MobileNavDrawer } from '@/components/layout/MobileNavDrawer'

import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'
import { siteConfig } from '@/config/site'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import type { Category } from '@/types/category'

type HeaderProps = {
  categories: Category[]
}

const mainNav = [
  { label: 'جدیدترین‌ها', href: '/products?sort=newest' },
  { label: 'ارسال فوری', href: '/fast-shipping' },
  { label: 'کالکشن‌ها', href: '/collections' },
  { label: 'گنجینه طلا', href: '/treasury' },
  { label: 'مجله', href: '/blog' },
]

export function Header({ categories }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const cartCount = useCartStore((s) => s.totalItems())
  const wishCount = useWishlistStore((s) => s.count())

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-elevated/95 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-4 lg:h-[4.5rem]">
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="باز کردن منو"
        >
          <Menu className="size-5" />
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span
            className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-sm font-bold text-white shadow-soft"
            aria-hidden
          >
            G
          </span>
          <div className="hidden sm:block">
            <span className="block text-base font-semibold tracking-tight text-ink">
              {siteConfig.name}
            </span>
            <span className="block text-[10px] text-ink-subtle">{siteConfig.tagline}</span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="اصلی">
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-gold-50 text-gold-800'
                    : 'text-ink-muted hover:bg-gold-50/80 hover:text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-0.5 sm:gap-1">
          <Link
            to="/admin"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-gold-50 hover:text-ink"
            aria-label="داشبورد مدیریت"
          >
            <LayoutDashboard className="size-5" />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-gold-50 hover:text-ink"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="جستجو"
            aria-expanded={searchOpen}
          >
            <Search className="size-5" />
          </button>
          <Link
            to="/account"
            className="hidden size-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-gold-50 hover:text-ink sm:inline-flex"
            aria-label="حساب کاربری"
          >
            <User className="size-5" />
          </Link>
          <Link
            to="/wishlist"
            className="relative inline-flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-gold-50 hover:text-ink"
            aria-label="علاقه‌مندی‌ها"
          >
            <Heart className="size-5" />
            {wishCount > 0 ? (
              <span className="absolute end-1 top-1 flex size-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-semibold text-white">
                {wishCount.toLocaleString('fa-IR')}
              </span>
            ) : null}
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-gold-50 hover:text-ink"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 ? (
              <span className="absolute end-1 top-1 flex size-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-semibold text-white">
                {cartCount.toLocaleString('fa-IR')}
              </span>
            ) : null}
          </Link>
        </div>
      </Container>

      {searchOpen ? (
        <div className="border-t border-border bg-surface-elevated">
          <Container className="py-3">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault()
                const q = searchQuery.trim()
                navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
                setSearchOpen(false)
              }}
            >
              <label className="sr-only" htmlFor="site-search">جستجو در محصولات</label>
              <div className="relative">
                <Search className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-ink-subtle" />
                <input
                  id="site-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو بر اساس نام، کد یا کالکشن..."
                  className="h-12 w-full rounded-full border border-border bg-surface pe-4 ps-12 text-sm outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-200/60"
                  autoFocus
                />
              </div>
            </form>
          </Container>
        </div>
      ) : null}

      <div className="hidden border-t border-border lg:block">
        <Container>
          <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm scrollbar-none">
            {categories.map((cat) => (
              <li key={cat.id} className="shrink-0">
                <Link
                  to={`/categories/${cat.slug}`}
                  className="inline-flex rounded-full px-3 py-1.5 text-ink-muted transition-colors hover:bg-gold-50 hover:text-gold-800"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
            <li className="shrink-0">
              <Link
                to="/categories"
                className="inline-flex rounded-full px-3 py-1.5 font-medium text-gold-700 hover:bg-gold-50"
              >
                بیشتر
              </Link>
            </li>
          </ul>
        </Container>
      </div>

      <MobileNavDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
        mainNav={mainNav}
      />
    </header>
  )
}
