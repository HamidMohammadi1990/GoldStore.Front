import { useMemo, useState } from 'react'

import {
  AdminPage,
  AdminSearch,
  FilterChips,
  StatusPill,
} from '@/components/admin/AdminBits'
import { EmptyState } from '@/components/ui/EmptyState'
import { matchesQuery } from '@/lib/admin'
import { formatShortDate } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'

type ReadFilter = 'all' | 'unread' | 'read'

export function AdminMessagesPage() {
  const messages = useAdminStore((state) => state.messages)
  const markMessageRead = useAdminStore((state) => state.markMessageRead)
  const removeMessage = useAdminStore((state) => state.removeMessage)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<ReadFilter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const rows = useMemo(() => {
    return [...messages]
      .filter((message) => {
        if (filter === 'unread' && message.read) return false
        if (filter === 'read' && !message.read) return false
        return matchesQuery(query, message.name, message.email, message.subject, message.body)
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [messages, query, filter])

  const selected = rows.find((message) => message.id === selectedId) ?? rows[0]

  return (
    <AdminPage title="پیام‌ها" description="درخواست‌های تماس، تعویض و هماهنگی شعب.">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <AdminSearch value={query} onChange={setQuery} placeholder="نام، ایمیل یا موضوع" />
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'همه' },
            { value: 'unread', label: 'نخوانده' },
            { value: 'read', label: 'خوانده‌شده' },
          ]}
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState title="پیامی نیست" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <ul className="space-y-2">
            {rows.map((message) => {
              const active = selected?.id === message.id
              return (
                <li key={message.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(message.id)
                      if (!message.read) markMessageRead(message.id, true)
                    }}
                    className={`w-full rounded-2xl border px-4 py-3 text-start transition-colors ${
                      active
                        ? 'border-gold-300 bg-gold-50'
                        : 'border-border bg-surface-elevated hover:border-gold-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-ink">{message.subject}</p>
                      {!message.read ? <StatusPill label="جدید" tone="gold" /> : null}
                    </div>
                    <p className="mt-1 text-xs text-ink-subtle">
                      {message.name} · {formatShortDate(message.createdAt)}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>

          {selected ? (
            <article className="rounded-2xl border border-border bg-surface-elevated p-5">
              <h2 className="text-lg font-semibold text-ink">{selected.subject}</h2>
              <p className="mt-2 text-sm text-ink-muted">
                {selected.name}
                <span dir="ltr" className="ms-2">
                  {selected.email}
                </span>
              </p>
              <p className="mt-1 text-xs text-ink-subtle">{formatShortDate(selected.createdAt)}</p>
              <p className="mt-5 text-sm leading-7 text-ink">{selected.body}</p>
              <div className="mt-6 flex gap-4 text-xs font-medium">
                <button
                  type="button"
                  className="text-gold-700 hover:underline"
                  onClick={() => markMessageRead(selected.id, !selected.read)}
                >
                  {selected.read ? 'علامت به‌عنوان نخوانده' : 'خواندم'}
                </button>
                <button
                  type="button"
                  className="text-rose-700 hover:underline"
                  onClick={() => {
                    if (window.confirm('این پیام حذف شود؟')) {
                      removeMessage(selected.id)
                      setSelectedId(null)
                    }
                  }}
                >
                  حذف
                </button>
              </div>
            </article>
          ) : null}
        </div>
      )}
    </AdminPage>
  )
}
