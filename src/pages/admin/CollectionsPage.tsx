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
} from '@/components/admin/AdminBits'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { EmptyState } from '@/components/ui/EmptyState'
import { localImages } from '@/config/images'
import { matchesQuery } from '@/lib/admin'
import { formatPersianDigits } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'
import type { AdminCollection } from '@/types/admin'

export function AdminCollectionsPage() {
  const collections = useAdminStore((state) => state.collections)
  const products = useAdminStore((state) => state.products)
  const saveCollection = useAdminStore((state) => state.saveCollection)
  const removeCollection = useAdminStore((state) => state.removeCollection)
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)

  const rows = useMemo(
    () => collections.filter((item) => matchesQuery(query, item.title, item.slug, item.description)),
    [collections, query],
  )

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title') ?? '').trim()
    const slug = String(form.get('slug') ?? '').trim()
    const description = String(form.get('description') ?? '').trim()
    if (!title || !slug || !description) {
      setError('عنوان، نامک و توضیح را کامل کنید.')
      return
    }
    if (collections.some((item) => item.slug === slug)) {
      setError('این نامک قبلاً استفاده شده است.')
      return
    }
    const collection: AdminCollection = {
      id: `col-${Date.now()}`,
      title,
      slug,
      description,
      coverImageUrl: localImages.collections.marina,
      productCount: 0,
      published: true,
    }
    saveCollection(collection)
    setError(null)
    event.currentTarget.reset()
  }

  return (
    <AdminPage title="کالکشن‌ها" description="مجموعه‌های موضوعی مثل مارینا و آیریس.">
      <form onSubmit={onSubmit} className="mb-6 grid gap-4 rounded-2xl border border-border bg-surface-elevated p-5 lg:grid-cols-2">
        <Input name="title" label="عنوان" />
        <Input name="slug" label="نامک" dir="ltr" />
        <div className="lg:col-span-2">
          <Textarea name="description" label="توضیح کوتاه" />
        </div>
        <div className="lg:col-span-2">
          {error ? <p className="mb-3 text-sm text-rose-700">{error}</p> : null}
          <Button type="submit" size="sm">
            افزودن کالکشن
          </Button>
        </div>
      </form>

      <AdminToolbar>
        <AdminSearch value={query} onChange={setQuery} placeholder="جستجوی کالکشن" />
      </AdminToolbar>

      {rows.length === 0 ? (
        <EmptyState title="کالکشنی پیدا نشد" />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <Th>کالکشن</Th>
              <Th>محصول</Th>
              <Th>وضعیت</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((collection) => {
              const count = products.filter((product) => product.collectionSlug === collection.slug).length
              return (
                <tr key={collection.id} className="border-t border-border">
                  <Td>
                    <div className="flex items-center gap-3">
                      <img src={collection.coverImageUrl} alt="" className="size-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-medium">{collection.title}</p>
                        <p className="mt-0.5 line-clamp-1 max-w-sm text-xs text-ink-subtle">{collection.description}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>{formatPersianDigits(count || collection.productCount)}</Td>
                  <Td>
                    <StatusPill
                      label={collection.published ? 'فعال' : 'مخفی'}
                      tone={collection.published ? 'green' : 'neutral'}
                    />
                  </Td>
                  <Td className="text-end">
                    <div className="flex justify-end gap-3">
                      <TextAction onClick={() => saveCollection({ ...collection, published: !collection.published })}>
                        {collection.published ? 'مخفی کردن' : 'فعال کردن'}
                      </TextAction>
                      <TextAction
                        tone="danger"
                        onClick={() => {
                          if (window.confirm(`کالکشن «${collection.title}» حذف شود؟`)) {
                            removeCollection(collection.id)
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
