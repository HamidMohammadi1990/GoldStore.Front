import { Link } from 'react-router-dom'
import { Heart, Inbox, Package, ShoppingBag, Store, Users } from 'lucide-react'

import { AdminPage, AdminTable, StatusPill, Td, Th, orderTone } from '@/components/admin/AdminBits'
import { countsAsRevenue, orderGrandTotal, orderStatusLabel } from '@/lib/admin'
import { formatPersianDigits, formatPriceToman, formatShortDate } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'

export function AdminDashboardPage() {
  const products = useAdminStore((state) => state.products)
  const orders = useAdminStore((state) => state.orders)
  const users = useAdminStore((state) => state.users)
  const carts = useAdminStore((state) => state.carts)
  const wishlists = useAdminStore((state) => state.wishlists)
  const messages = useAdminStore((state) => state.messages)

  const revenue = orders
    .filter((order) => countsAsRevenue(order.status))
    .reduce((sum, order) => sum + orderGrandTotal(order), 0)
  const openOrders = orders.filter(
    (order) => order.status === 'paid' || order.status === 'processing' || order.status === 'pending',
  ).length
  const unread = messages.filter((message) => !message.read).length
  const recent = [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)
  const outOfStock = products.filter((product) => !product.isInStock || !product.published)

  const stats = [
    {
      label: 'فروش ثبت‌شده',
      value: formatPriceToman(revenue),
      hint: 'به‌جز سفارش‌های لغو و پرداخت‌نشده',
      to: '/admin/orders',
      icon: Package,
    },
    {
      label: 'سفارش‌های باز',
      value: formatPersianDigits(openOrders),
      hint: 'در انتظار، پرداخت‌شده یا در حال آماده‌سازی',
      to: '/admin/orders',
      icon: ShoppingBag,
    },
    {
      label: 'محصولات',
      value: formatPersianDigits(products.length),
      hint: `${formatPersianDigits(products.filter((product) => product.published).length)} مورد منتشر شده`,
      to: '/admin/products',
      icon: Store,
    },
    {
      label: 'کاربران',
      value: formatPersianDigits(users.length),
      hint: `${formatPersianDigits(users.filter((user) => user.status === 'active').length)} حساب فعال`,
      to: '/admin/users',
      icon: Users,
    },
    {
      label: 'سبدهای باز',
      value: formatPersianDigits(carts.length),
      hint: `${formatPersianDigits(wishlists.length)} لیست علاقه‌مندی`,
      to: '/admin/carts',
      icon: Heart,
    },
    {
      label: 'پیام‌های نخوانده',
      value: formatPersianDigits(unread),
      hint: 'از فرم تماس و درخواست‌ها',
      to: '/admin/messages',
      icon: Inbox,
    },
  ]

  return (
    <AdminPage
      title="نمای کلی"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              to={stat.to}
              className="rounded-2xl border border-border bg-surface-elevated p-5 transition-colors hover:border-gold-300"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-ink-muted">{stat.label}</span>
                <span className="flex size-9 items-center justify-center rounded-full bg-gold-50 text-gold-800">
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="mt-3 text-xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-1 text-xs text-ink-subtle">{stat.hint}</p>
            </Link>
          )
        })}
      </div>

      <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">آخرین سفارش‌ها</h2>
            <Link to="/admin/orders" className="text-xs font-medium text-gold-700 hover:underline">
              همه سفارش‌ها
            </Link>
          </div>
          <AdminTable fit>
            <thead>
              <tr>
                <Th>شماره</Th>
                <Th>مشتری</Th>
                <Th>تاریخ</Th>
                <Th>مبلغ</Th>
                <Th>وضعیت</Th>
              </tr>
            </thead>
            <tbody>
              {recent.map((order) => (
                <tr key={order.id} className="border-t border-border">
                  <Td>
                    <Link to={`/admin/orders/${order.id}`} className="font-medium text-gold-800 hover:underline">
                      {order.number}
                    </Link>
                  </Td>
                  <Td>{order.customerName}</Td>
                  <Td className="text-ink-muted">{formatShortDate(order.createdAt)}</Td>
                  <Td>{formatPriceToman(orderGrandTotal(order))}</Td>
                  <Td>
                    <StatusPill label={orderStatusLabel[order.status]} tone={orderTone(order.status)} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </AdminTable>
      </section>

      {outOfStock.length > 0 || messages.some((message) => !message.read) ? (
        <section className="mt-6">
          <h2 className="mb-3 text-base font-semibold text-ink">نیاز به رسیدگی</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {outOfStock.map((product) => (
              <Link
                key={product.id}
                to={`/admin/products/${product.id}`}
                className="rounded-2xl border border-border bg-surface-elevated p-4 transition-colors hover:border-gold-300"
              >
                <p className="text-sm font-medium text-ink">{product.title}</p>
                <p className="mt-1 text-xs text-ink-muted">
                  {product.code} · {!product.published ? 'پیش‌نویس' : 'ناموجود'}
                </p>
              </Link>
            ))}
            {messages
              .filter((message) => !message.read)
              .map((message) => (
                <Link
                  key={message.id}
                  to="/admin/messages"
                  className="rounded-2xl border border-border bg-surface-elevated p-4 transition-colors hover:border-gold-300"
                >
                  <p className="text-sm font-medium text-ink">{message.subject}</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {message.name} · {formatShortDate(message.createdAt)}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      ) : null}
    </AdminPage>
  )
}
