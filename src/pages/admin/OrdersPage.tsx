import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  AdminPage,
  AdminSearch,
  AdminTable,
  AdminToolbar,
  FilterChips,
  StatusPill,
  Td,
  Th,
  orderTone,
} from '@/components/admin/AdminBits'
import { EmptyState } from '@/components/ui/EmptyState'
import { matchesQuery, orderGrandTotal, orderStatusLabel } from '@/lib/admin'
import { formatPersianDigits, formatPriceToman, formatShortDate } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'
import type { OrderStatus } from '@/types/admin'

type StatusFilter = 'all' | OrderStatus

const filters: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'همه' },
  { value: 'pending', label: 'در انتظار' },
  { value: 'paid', label: 'پرداخت‌شده' },
  { value: 'processing', label: 'آماده‌سازی' },
  { value: 'shipped', label: 'ارسال‌شده' },
  { value: 'delivered', label: 'تحویل‌شده' },
  { value: 'cancelled', label: 'لغو' },
]

export function AdminOrdersPage() {
  const orders = useAdminStore((state) => state.orders)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')

  const rows = useMemo(() => {
    return [...orders]
      .filter((order) => {
        if (status !== 'all' && order.status !== status) return false
        return matchesQuery(query, order.customerName, order.mobile, order.city, order.number)
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [orders, query, status])

  return (
    <AdminPage title="سفارش‌ها" description="پیگیری پرداخت، آماده‌سازی و ارسال.">
      <AdminToolbar>
        <AdminSearch value={query} onChange={setQuery} placeholder="شماره سفارش، نام یا شهر" />
        <p className="text-xs text-ink-subtle">{formatPersianDigits(rows.length)} سفارش</p>
      </AdminToolbar>
      <div className="mb-4">
        <FilterChips value={status} onChange={setStatus} options={filters} />
      </div>

      {rows.length === 0 ? (
        <EmptyState title="سفارشی با این مشخصات نیست" />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <Th>شماره</Th>
              <Th>مشتری</Th>
              <Th>شهر</Th>
              <Th>اقلام</Th>
              <Th>مبلغ</Th>
              <Th>تاریخ</Th>
              <Th>وضعیت</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((order) => (
              <tr key={order.id} className="border-t border-border">
                <Td>
                  <Link to={`/admin/orders/${order.id}`} className="font-medium text-gold-800 hover:underline">
                    {order.number}
                  </Link>
                </Td>
                <Td>
                  <p>{order.customerName}</p>
                  <p className="mt-0.5 text-xs text-ink-subtle" dir="ltr">
                    {order.mobile}
                  </p>
                </Td>
                <Td>{order.city}</Td>
                <Td>{formatPersianDigits(order.items.reduce((sum, item) => sum + item.quantity, 0))}</Td>
                <Td>{formatPriceToman(orderGrandTotal(order))}</Td>
                <Td className="text-ink-muted">{formatShortDate(order.createdAt)}</Td>
                <Td>
                  <StatusPill label={orderStatusLabel[order.status]} tone={orderTone(order.status)} />
                </Td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
    </AdminPage>
  )
}
