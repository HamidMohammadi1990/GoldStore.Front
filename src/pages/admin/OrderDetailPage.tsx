import { Link, useParams } from 'react-router-dom'

import { AdminPage, AdminTable, StatusPill, Td, Th, fieldClass, orderTone } from '@/components/admin/AdminBits'
import { EmptyState } from '@/components/ui/EmptyState'
import { orderGrandTotal, orderItemsTotal, orderStatusLabel, orderStatuses } from '@/lib/admin'
import { formatPersianDigits, formatPriceToman, formatShortDate } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'
import type { OrderStatus } from '@/types/admin'

export function AdminOrderDetailPage() {
  const { id } = useParams()
  const order = useAdminStore((state) => state.orders.find((item) => item.id === id))
  const setOrderStatus = useAdminStore((state) => state.setOrderStatus)

  if (!order) {
    return (
      <AdminPage title="سفارش پیدا نشد">
        <EmptyState
          title="این شماره در فهرست سفارش‌ها نیست"
          action={
            <Link to="/admin/orders" className="text-sm font-medium text-gold-700 hover:underline">
              بازگشت به سفارش‌ها
            </Link>
          }
        />
      </AdminPage>
    )
  }

  return (
    <AdminPage
      title={order.number}
      description={`${order.customerName} · ${formatShortDate(order.createdAt)}`}
      action={<StatusPill label={orderStatusLabel[order.status]} tone={orderTone(order.status)} />}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-surface-elevated p-5 lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-ink">اقلام سفارش</h2>
          <AdminTable>
            <thead>
              <tr>
                <Th>کالا</Th>
                <Th>تعداد</Th>
                <Th>مبلغ</Th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.productId} className="border-t border-border">
                  <Td>
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-0.5 text-xs text-ink-subtle">{item.code}</p>
                  </Td>
                  <Td>{formatPersianDigits(item.quantity)}</Td>
                  <Td>{formatPriceToman(item.priceToman * item.quantity)}</Td>
                </tr>
              ))}
            </tbody>
          </AdminTable>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-muted">
              <dt>جمع کالا</dt>
              <dd>{formatPriceToman(orderItemsTotal(order))}</dd>
            </div>
            <div className="flex justify-between text-ink-muted">
              <dt>ارسال</dt>
              <dd>{order.shippingToman === 0 ? 'رایگان' : formatPriceToman(order.shippingToman)}</dd>
            </div>
            <div className="flex justify-between font-semibold text-ink">
              <dt>قابل پرداخت</dt>
              <dd>{formatPriceToman(orderGrandTotal(order))}</dd>
            </div>
          </dl>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5">
            <h2 className="text-sm font-semibold text-ink">گیرنده</h2>
            <p className="mt-3 text-sm text-ink">{order.customerName}</p>
            <p className="mt-1 text-sm text-ink-muted" dir="ltr">
              {order.mobile}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {order.city}، {order.address}
            </p>
            {order.note ? <p className="mt-3 text-sm text-gold-800">یادداشت: {order.note}</p> : null}
          </div>
          <div className="rounded-2xl border border-border bg-surface-elevated p-5">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-ink">تغییر وضعیت</span>
              <select
                value={order.status}
                onChange={(event) => setOrderStatus(order.id, event.target.value as OrderStatus)}
                className={fieldClass}
              >
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {orderStatusLabel[status]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
      </div>
    </AdminPage>
  )
}
