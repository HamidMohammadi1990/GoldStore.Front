import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

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
import { matchesQuery } from '@/lib/admin'
import { formatPersianDigits, formatPriceToman } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'

type StockFilter = 'all' | 'stock' | 'out' | 'draft'

export function AdminProductsPage() {
  const products = useAdminStore((state) => state.products)
  const categories = useAdminStore((state) => state.categories)
  const removeProduct = useAdminStore((state) => state.removeProduct)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<StockFilter>('all')

  const rows = useMemo(() => {
    return products.filter((product) => {
      const category = categories.find((item) => item.slug === product.categorySlug)?.title
      const matches = matchesQuery(query, product.title, product.code, product.slug, category)
      if (!matches) return false
      if (filter === 'stock') return product.published && product.isInStock
      if (filter === 'out') return !product.isInStock
      if (filter === 'draft') return !product.published
      return true
    })
  }, [products, categories, query, filter])

  return (
    <AdminPage
      title="محصولات"
      description="فهرست زیورآلات، موجودی و وضعیت انتشار."
      action={
        <Link
          to="/admin/products/new"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white hover:bg-ink/90"
        >
          <Plus className="size-4" />
          محصول جدید
        </Link>
      }
    >
      <AdminToolbar>
        <AdminSearch value={query} onChange={setQuery} placeholder="جستجو بر اساس نام یا کد" />
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'همه' },
            { value: 'stock', label: 'موجود' },
            { value: 'out', label: 'ناموجود' },
            { value: 'draft', label: 'پیش‌نویس' },
          ]}
        />
        <p className="text-xs text-ink-subtle">{formatPersianDigits(rows.length)} مورد</p>
      </AdminToolbar>

      {rows.length === 0 ? (
        <EmptyState title="محصولی پیدا نشد" description="عبارت جستجو یا فیلتر را تغییر دهید." />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <Th>محصول</Th>
              <Th>دسته</Th>
              <Th>قیمت</Th>
              <Th>وضعیت</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((product) => {
              const category = categories.find((item) => item.slug === product.categorySlug)
              return (
                <tr key={product.id} className="border-t border-border">
                  <Td>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="size-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="mt-0.5 text-xs text-ink-subtle">{product.code}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-ink-muted">{category?.title ?? '—'}</Td>
                  <Td>{formatPriceToman(product.priceToman)}</Td>
                  <Td>
                    <div className="flex flex-wrap gap-1.5">
                      <StatusPill
                        label={product.published ? 'منتشر شده' : 'پیش‌نویس'}
                        tone={product.published ? 'green' : 'neutral'}
                      />
                      <StatusPill
                        label={product.isInStock ? 'موجود' : 'ناموجود'}
                        tone={product.isInStock ? 'gold' : 'red'}
                      />
                    </div>
                  </Td>
                  <Td className="text-end">
                    <div className="flex justify-end gap-3">
                      <Link to={`/admin/products/${product.id}`} className="text-xs font-medium text-gold-700 hover:underline">
                        ویرایش
                      </Link>
                      <TextAction
                        tone="danger"
                        onClick={() => {
                          if (window.confirm(`«${product.title}» حذف شود؟`)) removeProduct(product.id)
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
