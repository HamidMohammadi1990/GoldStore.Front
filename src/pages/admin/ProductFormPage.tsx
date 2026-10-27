import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AdminPage, fieldClass } from '@/components/admin/AdminBits'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { EmptyState } from '@/components/ui/EmptyState'
import { localImages } from '@/config/images'
import { useAdminStore } from '@/stores/adminStore'
import type { AdminProduct } from '@/types/admin'

export function AdminProductFormPage() {
  const { id } = useParams()
  return <ProductForm key={id ?? 'new'} productId={id} />
}

function ProductForm({ productId }: { productId?: string }) {
  const navigate = useNavigate()
  const products = useAdminStore((state) => state.products)
  const categories = useAdminStore((state) => state.categories)
  const collections = useAdminStore((state) => state.collections)
  const saveProduct = useAdminStore((state) => state.saveProduct)
  const existing = products.find((product) => product.id === productId)
  const [error, setError] = useState<string | null>(null)

  if (productId && !existing) {
    return (
      <AdminPage title="محصول پیدا نشد">
        <EmptyState
          title="این محصول در فهرست نیست"
          action={
            <Link to="/admin/products" className="text-sm font-medium text-gold-700 hover:underline">
              بازگشت به محصولات
            </Link>
          }
        />
      </AdminPage>
    )
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title') ?? '').trim()
    const code = String(form.get('code') ?? '').trim()
    const slug = String(form.get('slug') ?? '').trim() || code.toLowerCase()
    const priceToman = Number(form.get('priceToman'))
    const weightGrams = Number(form.get('weightGrams'))
    const categorySlug = String(form.get('categorySlug') ?? '')
    const collectionSlug = String(form.get('collectionSlug') ?? '')
    const collection = collections.find((item) => item.slug === collectionSlug)

    if (!title || !code || !slug) {
      setError('نام، کد و نامک را کامل کنید.')
      return
    }
    if (!Number.isFinite(priceToman) || priceToman <= 0 || !Number.isFinite(weightGrams) || weightGrams <= 0) {
      setError('قیمت و وزن باید عدد بزرگ‌تر از صفر باشند.')
      return
    }
    if (products.some((product) => product.slug === slug && product.id !== existing?.id)) {
      setError('این نامک برای محصول دیگری ثبت شده است.')
      return
    }
    if (products.some((product) => product.code === code && product.id !== existing?.id)) {
      setError('این کد کالا تکراری است.')
      return
    }

    const product: AdminProduct = {
      id: existing?.id ?? `p-${Date.now()}`,
      slug,
      title,
      code,
      priceToman,
      weightGrams,
      imageUrl: existing?.imageUrl ?? localImages.products.p1,
      categorySlug,
      collectionName: collection?.title,
      collectionSlug: collection?.slug,
      badges: existing?.badges,
      isInStock: form.get('isInStock') === 'on',
      published: form.get('published') === 'on',
      createdAt: existing?.createdAt ?? new Date().toISOString().slice(0, 10),
    }
    saveProduct(product)
    navigate('/admin/products')
  }

  return (
    <AdminPage
      title={existing ? 'ویرایش محصول' : 'محصول جدید'}
      description={existing ? existing.code : 'محصول بعد از ذخیره در فهرست مدیریت دیده می‌شود.'}
    >
      <form
        onSubmit={onSubmit}
        className="grid gap-5 rounded-2xl border border-border bg-surface-elevated p-5 sm:p-6 lg:grid-cols-2"
      >
        <Input name="title" label="نام محصول" defaultValue={existing?.title} required />
        <Input name="code" label="کد کالا" defaultValue={existing?.code} required />
        <Input name="slug" label="نامک" defaultValue={existing?.slug} dir="ltr" />
        <Input
          name="priceToman"
          label="قیمت (تومان)"
          type="number"
          min={1}
          defaultValue={existing?.priceToman ?? ''}
          required
        />
        <Input
          name="weightGrams"
          label="وزن (گرم)"
          type="number"
          min={0.01}
          step="0.01"
          defaultValue={existing?.weightGrams ?? ''}
          required
        />
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">دسته‌بندی</span>
          <select name="categorySlug" defaultValue={existing?.categorySlug ?? categories[0]?.slug} className={fieldClass}>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">کالکشن</span>
          <select name="collectionSlug" defaultValue={existing?.collectionSlug ?? ''} className={fieldClass}>
            <option value="">بدون کالکشن</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.slug}>
                {collection.title}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap items-center gap-6 lg:col-span-2">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              name="isInStock"
              defaultChecked={existing?.isInStock ?? true}
              className="size-4 accent-gold-600"
            />
            موجود در انبار
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              name="published"
              defaultChecked={existing?.published ?? true}
              className="size-4 accent-gold-600"
            />
            منتشر شود
          </label>
        </div>
        {error ? <p className="text-sm text-rose-700 lg:col-span-2">{error}</p> : null}
        <div className="flex gap-3 lg:col-span-2">
          <Button type="submit">{existing ? 'ذخیره تغییرات' : 'افزودن محصول'}</Button>
          <Link
            to="/admin/products"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong bg-surface-elevated px-6 text-sm font-medium text-ink hover:border-gold-400 hover:text-gold-700"
          >
            انصراف
          </Link>
        </div>
      </form>
    </AdminPage>
  )
}
