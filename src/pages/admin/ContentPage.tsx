import { useMemo, useState, type FormEvent } from 'react'

import {
  AdminPage,
  AdminSearch,
  FilterChips,
  StatusPill,
} from '@/components/admin/AdminBits'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { EmptyState } from '@/components/ui/EmptyState'
import { contentKindLabel, matchesQuery } from '@/lib/admin'
import { formatShortDate } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'
import type { ContentKind, ManagedContent } from '@/types/admin'

type KindFilter = 'all' | ContentKind

export function AdminContentPage() {
  const contents = useAdminStore((state) => state.contents)
  const saveContent = useAdminStore((state) => state.saveContent)
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<KindFilter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(contents[0]?.id ?? null)

  const rows = useMemo(() => {
    return contents.filter((item) => {
      if (kind !== 'all' && item.kind !== kind) return false
      return matchesQuery(query, item.title, item.meta, item.body)
    })
  }, [contents, query, kind])

  const selected = rows.find((item) => item.id === selectedId) ?? rows[0]

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selected) return
    const form = new FormData(event.currentTarget)
    const next: ManagedContent = {
      ...selected,
      title: String(form.get('title') ?? '').trim() || selected.title,
      meta: String(form.get('meta') ?? '').trim(),
      body: String(form.get('body') ?? '').trim(),
      published: form.get('published') === 'on',
      updatedAt: new Date().toISOString().slice(0, 10),
    }
    saveContent(next)
  }

  return (
    <AdminPage
      title="محتوا"
      description="راهنماها، قوانین، سوالات متداول و شعب فروشگاه."
    >
      <div className="mb-4 flex flex-col gap-3">
        <AdminSearch value={query} onChange={setQuery} placeholder="جستجو در عنوان یا متن" />
        <FilterChips
          value={kind}
          onChange={(value) => {
            setKind(value)
            setSelectedId(null)
          }}
          options={[
            { value: 'all', label: 'همه' },
            { value: 'guide', label: 'راهنما' },
            { value: 'legal', label: 'قوانین' },
            { value: 'faq', label: 'سوالات' },
            { value: 'branch', label: 'شعب' },
          ]}
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState title="محتوایی پیدا نشد" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ul className="space-y-2">
            {rows.map((item) => {
              const active = selected?.id === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full rounded-2xl border px-4 py-3 text-start transition-colors ${
                      active
                        ? 'border-gold-300 bg-gold-50'
                        : 'border-border bg-surface-elevated hover:border-gold-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-ink">{item.title}</p>
                      <StatusPill
                        label={item.published ? 'منتشر' : 'مخفی'}
                        tone={item.published ? 'green' : 'neutral'}
                      />
                    </div>
                    <p className="mt-1 text-xs text-ink-subtle">
                      {contentKindLabel[item.kind]} · {item.meta} · {formatShortDate(item.updatedAt)}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>

          {selected ? (
            <form
              key={selected.id}
              onSubmit={onSubmit}
              className="h-fit space-y-4 rounded-2xl border border-border bg-surface-elevated p-5"
            >
              <p className="text-xs text-ink-subtle">{contentKindLabel[selected.kind]}</p>
              <Input name="title" label="عنوان" defaultValue={selected.title} />
              <Input name="meta" label="برچسب یا شهر" defaultValue={selected.meta} />
              <Textarea name="body" label="متن" defaultValue={selected.body} className="min-h-48" />
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={selected.published}
                  className="size-4 accent-gold-600"
                />
                در سایت نمایش داده شود
              </label>
              <Button type="submit" size="sm">
                ذخیره محتوا
              </Button>
            </form>
          ) : null}
        </div>
      )}
    </AdminPage>
  )
}
