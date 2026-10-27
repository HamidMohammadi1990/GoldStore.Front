import { useMemo, useState } from 'react'

import {
  AdminPage,
  AdminSearch,
  AdminTable,
  AdminToolbar,
  FilterChips,
  StatusPill,
  Td,
  TextAction,
  Th,
} from '@/components/admin/AdminBits'
import { EmptyState } from '@/components/ui/EmptyState'
import { matchesQuery, userRoleLabel, userStatusLabel } from '@/lib/admin'
import { formatPersianDigits, formatShortDate } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'
import type { UserRole, UserStatus } from '@/types/admin'

type RoleFilter = 'all' | UserRole

export function AdminUsersPage() {
  const users = useAdminStore((state) => state.users)
  const orders = useAdminStore((state) => state.orders)
  const setUserStatus = useAdminStore((state) => state.setUserStatus)
  const setUserRole = useAdminStore((state) => state.setUserRole)
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<RoleFilter>('all')

  const rows = useMemo(() => {
    return users.filter((user) => {
      const matches = matchesQuery(query, user.fullName, user.mobile, user.email, user.city)
      if (!matches) return false
      if (role === 'all') return true
      return user.role === role
    })
  }, [users, query, role])

  const toggleStatus = (id: string, status: UserStatus) => {
    setUserStatus(id, status === 'active' ? 'blocked' : 'active')
  }

  return (
    <AdminPage title="کاربران" description="حساب مشتریان و مدیران فروشگاه.">
      <AdminToolbar>
        <AdminSearch value={query} onChange={setQuery} placeholder="نام، موبایل یا ایمیل" />
        <FilterChips
          value={role}
          onChange={setRole}
          options={[
            { value: 'all', label: 'همه' },
            { value: 'customer', label: 'مشتری' },
            { value: 'admin', label: 'مدیر' },
          ]}
        />
        <p className="text-xs text-ink-subtle">{formatPersianDigits(rows.length)} نفر</p>
      </AdminToolbar>

      {rows.length === 0 ? (
        <EmptyState title="کاربری پیدا نشد" />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <Th>کاربر</Th>
              <Th>شهر</Th>
              <Th>نقش</Th>
              <Th>سفارش</Th>
              <Th>عضویت</Th>
              <Th>وضعیت</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((user) => {
              const orderCount = orders.filter((order) => order.mobile === user.mobile).length
              return (
                <tr key={user.id} className="border-t border-border">
                  <Td>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="mt-0.5 text-xs text-ink-subtle" dir="ltr">
                      {user.mobile} · {user.email}
                    </p>
                  </Td>
                  <Td>{user.city}</Td>
                  <Td>
                    <StatusPill
                      label={userRoleLabel[user.role]}
                      tone={user.role === 'admin' ? 'gold' : 'neutral'}
                    />
                  </Td>
                  <Td>{formatPersianDigits(orderCount)}</Td>
                  <Td className="text-ink-muted">{formatShortDate(user.joinedAt)}</Td>
                  <Td>
                    <StatusPill
                      label={userStatusLabel[user.status]}
                      tone={user.status === 'active' ? 'green' : 'red'}
                    />
                  </Td>
                  <Td className="text-end">
                    <div className="flex justify-end gap-3">
                      <TextAction
                        onClick={() =>
                          setUserRole(user.id, user.role === 'admin' ? 'customer' : 'admin')
                        }
                      >
                        {user.role === 'admin' ? 'تبدیل به مشتری' : 'تبدیل به مدیر'}
                      </TextAction>
                      <TextAction tone="danger" onClick={() => toggleStatus(user.id, user.status)}>
                        {user.status === 'active' ? 'مسدود کردن' : 'رفع مسدودی'}
                      </TextAction>
                    </div>
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
