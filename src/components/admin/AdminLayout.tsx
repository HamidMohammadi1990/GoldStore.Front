import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import {
  BookOpen,
  ChevronDown,
  FileText,
  Heart,
  Inbox,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  Menu,
  Package,
  ShoppingBag,
  Store,
  Users,
  X,
} from 'lucide-react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils/cn'
import { useAdminStore } from '@/stores/adminStore'

const navGroups = [
  {
    title: 'فروشگاه',
    items: [
      { to: '/admin', label: 'نمای کلی', icon: LayoutDashboard, end: true },
      { to: '/admin/products', label: 'محصولات', icon: Store, end: false },
      { to: '/admin/categories', label: 'دسته‌بندی‌ها', icon: LayoutGrid, end: false },
      { to: '/admin/collections', label: 'کالکشن‌ها', icon: Layers, end: false },
    ],
  },
  {
    title: 'فروش',
    items: [
      { to: '/admin/orders', label: 'سفارش‌ها', icon: Package, end: false },
      { to: '/admin/carts', label: 'سبدهای خرید', icon: ShoppingBag, end: false },
      { to: '/admin/wishlists', label: 'علاقه‌مندی‌ها', icon: Heart, end: false },
    ],
  },
  {
    title: 'مخاطبان',
    items: [
      { to: '/admin/users', label: 'کاربران', icon: Users, end: false },
      { to: '/admin/messages', label: 'پیام‌ها', icon: Inbox, end: false },
    ],
  },
  {
    title: 'محتوا',
    items: [
      { to: '/admin/blog', label: 'وبلاگ', icon: BookOpen, end: false },
      { to: '/admin/content', label: 'صفحات و محتوا', icon: FileText, end: false },
    ],
  },
]

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const unread = useAdminStore((state) => state.messages.filter((message) => !message.read).length)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navGroups.map((group) => [group.title, false])),
  )

  const toggleGroup = (title: string) => {
    setOpenGroups((current) => ({ ...current, [title]: !current[title] }))
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
          aria-label="بستن منو"
          onClick={onClose}
        />
      ) : null}
      <aside
        data-open={open ? 'true' : 'false'}
        className="admin-sidebar fixed inset-y-0 start-0 z-50 flex w-64 flex-col border-e border-border bg-surface-elevated"
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/admin" className="flex items-center gap-2" onClick={onClose}>
            <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-sm font-bold text-white">
              G
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{siteConfig.name}</span>
              <span className="block text-[11px] text-ink-subtle">پنل مدیریت</span>
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full text-ink-muted lg:hidden"
            onClick={onClose}
            aria-label="بستن منو"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-6" aria-label="منوی داشبورد">
          {navGroups.map((group) => {
            const isOpen = openGroups[group.title] ?? false
            const panelId = `admin-nav-${group.title}`
            const showUnread = group.items.some((item) => item.to === '/admin/messages') && unread > 0
            return (
              <div key={group.title} className="admin-nav-group" data-open={isOpen ? 'true' : 'false'}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleGroup(group.title)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-ink-muted transition-colors hover:bg-gold-50 hover:text-ink"
                >
                  <span className="flex items-center gap-2">
                    {group.title}
                    {showUnread && !isOpen ? (
                      <span className="rounded-full bg-gold-500 px-1.5 text-[10px] font-semibold text-white">
                        {unread.toLocaleString('fa-IR')}
                      </span>
                    ) : null}
                  </span>
                  <ChevronDown className="admin-nav-chevron size-3.5" aria-hidden />
                </button>
                <div
                  id={panelId}
                  className="admin-submenu"
                  data-open={isOpen ? 'true' : 'false'}
                  aria-hidden={!isOpen}
                >
                  <div className="admin-submenu-inner">
                    <ul className="space-y-1 pt-1">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.to}>
                            <NavLink
                              to={item.to}
                              end={item.end}
                              tabIndex={isOpen ? 0 : -1}
                              onClick={onClose}
                              className={({ isActive }) =>
                                cn(
                                  'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                                  isActive
                                    ? 'bg-gold-100 text-gold-900'
                                    : 'text-ink-muted hover:bg-gold-50 hover:text-ink',
                                )
                              }
                            >
                              <Icon className="size-4 shrink-0" />
                              <span className="flex-1">{item.label}</span>
                              {item.to === '/admin/messages' && unread > 0 ? (
                                <span className="rounded-full bg-gold-500 px-1.5 text-[10px] font-semibold text-white">
                                  {unread.toLocaleString('fa-IR')}
                                </span>
                              ) : null}
                            </NavLink>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export function AdminLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:ps-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-surface-elevated/95 px-4 backdrop-blur-md lg:px-8">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="باز کردن منو"
          >
            <Menu className="size-5" />
          </button>
          <p className="hidden text-sm text-ink-muted sm:block">داشبورد مدیریت {siteConfig.name}</p>
          <Link to="/" className="ms-auto text-sm font-medium text-gold-700 hover:text-gold-800">
            مشاهده فروشگاه
          </Link>
        </header>
        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
