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
import { formatPersianDigits, formatShortDate } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'

export function AdminWishlistsPage() {
  const wishlists = useAdminStore((state) => state.wishlists)
  const products = useAdminStore((state) => state.products)
  const removeWishlist = useAdminStore((state) => state.removeWishlist)
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    return wishlists.filter((list) => {
      const titles = list.productIds
        .map((id) => products.find((product) => product.id === id)?.title)
        .filter(Boolean)
        .join(' ')
      return matchesQuery(query, list.customerName, list.mobile, titles)
    })
  }, [wishlists, products, query])

  return (
    <AdminPage title="علاقه‌مندی‌ها" description="کالاهایی که مشتریان نشان کرده‌اند.">
      <AdminToolbar>
        <AdminSearch value={query} onChange={setQuery} placeholder="نام مشتری یا محصول" />
        <p className="text-xs text-ink-subtle">{formatPersianDigits(rows.length)} لیست</p>
      </AdminToolbar>

      {rows.length === 0 ? (
        <EmptyState title="لیست علاقه‌مندی نیست" />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <Th>مشتری</Th>
              <Th>کالاها</Th>
              <Th>تعداد</Th>
              <Th>به‌روزرسانی</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((list) => (
              <tr key={list.id} className="border-t border-border">
                <Td>
                  <p className="font-medium">{list.customerName}</p>
                  <p className="mt-0.5 text-xs text-ink-subtle" dir="ltr">
                    {list.mobile}
                  </p>
                </Td>
                <Td>
                  <div className="flex max-w-md flex-wrap gap-1.5">
                    {list.productIds.map((id) => {
                      const product = products.find((item) => item.id === id)
                      return (
                        <span key={id} className="rounded-full bg-gold-50 px-2.5 py-1 text-xs text-gold-900">
                          {product?.title ?? 'کالای حذف‌شده'}
                        </span>
                      )
                    })}
                  </div>
                </Td>
                <Td>{formatPersianDigits(list.productIds.length)}</Td>
                <Td className="text-ink-muted">{formatShortDate(list.updatedAt)}</Td>
                <Td className="text-end">
                  <TextAction
                    tone="danger"
                    onClick={() => {
                      if (window.confirm(`لیست ${list.customerName} حذف شود؟`)) removeWishlist(list.id)
                    }}
                  >
                    حذف
                  </TextAction>
                </Td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
    </AdminPage>
  )
}
