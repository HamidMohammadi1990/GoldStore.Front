import { useMemo, useState } from 'react'

import {
  AdminPage,
  AdminSearch,
  AdminTable,
  AdminToolbar,
  Td,
  TextAction,
  Th,
} from '@/components/admin/AdminBits'
import { EmptyState } from '@/components/ui/EmptyState'
import { matchesQuery } from '@/lib/admin'
import { formatPersianDigits, formatPriceToman, formatShortDate } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'

export function AdminCartsPage() {
  const carts = useAdminStore((state) => state.carts)
  const removeCart = useAdminStore((state) => state.removeCart)
  const [query, setQuery] = useState('')

  const rows = useMemo(
    () =>
      carts.filter((cart) =>
        matchesQuery(
          query,
          cart.customerName,
          cart.mobile,
          ...cart.items.map((item) => `${item.title} ${item.code}`),
        ),
      ),
    [carts, query],
  )

  return (
    <AdminPage title="سبدهای خرید" description="سبدهایی که هنوز به سفارش تبدیل نشده‌اند.">
      <AdminToolbar>
        <AdminSearch value={query} onChange={setQuery} placeholder="نام مشتری یا کد کالا" />
        <p className="text-xs text-ink-subtle">{formatPersianDigits(rows.length)} سبد</p>
      </AdminToolbar>

      {rows.length === 0 ? (
        <EmptyState title="سبد بازی نیست" description="وقتی مشتری کالایی را در سبد بگذارد اینجا دیده می‌شود." />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <Th>مشتری</Th>
              <Th>اقلام</Th>
              <Th>جمع</Th>
              <Th>آخرین تغییر</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((cart) => {
              const total = cart.items.reduce((sum, item) => sum + item.priceToman * item.quantity, 0)
              return (
                <tr key={cart.id} className="border-t border-border">
                  <Td>
                    <p className="font-medium">{cart.customerName}</p>
                    <p className="mt-0.5 text-xs text-ink-subtle" dir="ltr">
                      {cart.mobile}
                    </p>
                  </Td>
                  <Td className="max-w-sm text-ink-muted">
                    {cart.items.map((item) => `${item.title} × ${formatPersianDigits(item.quantity)}`).join(' · ')}
                  </Td>
                  <Td>{formatPriceToman(total)}</Td>
                  <Td className="text-ink-muted">{formatShortDate(cart.updatedAt)}</Td>
                  <Td className="text-end">
                    <TextAction
                      tone="danger"
                      onClick={() => {
                        if (window.confirm(`سبد ${cart.customerName} پاک شود؟`)) removeCart(cart.id)
                      }}
                    >
                      پاک کردن
                    </TextAction>
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </AdminTable>
      )}
    </AdminPage>
  )
}
