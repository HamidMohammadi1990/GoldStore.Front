import { useMemo, useState, type FormEvent } from 'react'

import {
  AdminPage,
  AdminSearch,
  AdminTable,
  AdminToolbar,
  StatusPill,
  Td,
  TextAction,
  Th,
  fieldClass,
} from '@/components/admin/AdminBits'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { EmptyState } from '@/components/ui/EmptyState'
import { matchesQuery } from '@/lib/admin'
import { formatPersianDigits } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'
import type { AdminCategory } from '@/types/admin'

export function AdminCategoriesPage() {
  const categories = useAdminStore((state) => state.categories)
  const products = useAdminStore((state) => state.products)
  const saveCategory = useAdminStore((state) => state.saveCategory)
  const removeCategory = useAdminStore((state) => state.removeCategory)
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)

  const rows = useMemo(
    () => categories.filter((category) => matchesQuery(query, category.title, category.slug)),
    [categories, query],
  )

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title') ?? '').trim()
    const slug = String(form.get('slug') ?? '').trim()
    const childrenText = String(form.get('children') ?? '').trim()
    if (!title || !slug) {
      setError('عنوان و نامک لازم است.')
      return
    }
    if (categories.some((category) => category.slug === slug)) {
      setError('این نامک قبلاً استفاده شده است.')
      return
    }
    const category: AdminCategory = {
      id: `cat-${Date.now()}`,
      title,
      slug,
      published: true,
      children: childrenText
        ? childrenText
            .split(/[،,]/)
            .map((item) => item.trim())
            .filter(Boolean)
            .map((item, index) => ({
              slug: `${slug}-${index + 1}`,
              title: item,
            }))
        : [],
    }
    saveCategory(category)
    setError(null)
    event.currentTarget.reset()
  }

  return (
    <AdminPage title="دسته‌بندی‌ها" description="گروه‌های اصلی فروشگاه و زیرگروه‌های هر کدام.">
      <form
        onSubmit={onSubmit}
        className="mb-6 grid gap-4 rounded-2xl border border-border bg-surface-elevated p-5 lg:grid-cols-4"
      >
        <Input name="title" label="عنوان" placeholder="مثلاً گردنبند" />
        <Input name="slug" label="نامک" placeholder="necklace" dir="ltr" />
        <label className="block text-sm lg:col-span-2">
          <span className="mb-1.5 block font-medium text-ink">زیرگروه‌ها</span>
          <input name="children" placeholder="با ویرگول جدا کنید" className={fieldClass} />
        </label>
        <div className="lg:col-span-4">
          {error ? <p className="mb-3 text-sm text-rose-700">{error}</p> : null}
          <Button type="submit" size="sm">
            افزودن دسته
          </Button>
        </div>
      </form>

      <AdminToolbar>
        <AdminSearch value={query} onChange={setQuery} placeholder="جستجوی دسته" />
        <p className="text-xs text-ink-subtle">{formatPersianDigits(rows.length)} دسته</p>
      </AdminToolbar>

      {rows.length === 0 ? (
        <EmptyState title="دسته‌ای پیدا نشد" />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <Th>دسته</Th>
              <Th>زیرگروه</Th>
              <Th>محصول</Th>
              <Th>وضعیت</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((category) => {
              const count = products.filter((product) => product.categorySlug === category.slug).length
              return (
                <tr key={category.id} className="border-t border-border">
                  <Td>
                    <p className="font-medium">{category.title}</p>
                    <p className="mt-0.5 text-xs text-ink-subtle" dir="ltr">
                      {category.slug}
                    </p>
                  </Td>
                  <Td className="text-ink-muted">
                    {category.children?.map((child) => child.title).join('، ') || '—'}
                  </Td>
                  <Td>{formatPersianDigits(count)}</Td>
                  <Td>
                    <StatusPill
                      label={category.published ? 'فعال' : 'مخفی'}
                      tone={category.published ? 'green' : 'neutral'}
                    />
                  </Td>
                  <Td className="text-end">
                    <div className="flex justify-end gap-3">
                      <TextAction
                        onClick={() => saveCategory({ ...category, published: !category.published })}
                      >
                        {category.published ? 'مخفی کردن' : 'فعال کردن'}
                      </TextAction>
                      <TextAction
                        tone="danger"
                        onClick={() => {
                          if (window.confirm(`دسته «${category.title}» حذف شود؟`)) {
                            removeCategory(category.id)
                          }
                        }}
                      >
                        حذف
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
