import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { Textarea } from '@/components/ui/Textarea'
import { formatPriceToman } from '@/lib/utils/format'
import { useCartStore } from '@/stores/cartStore'

export function CheckoutPage() {
  const navigate = useNavigate()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotalToman())
  const clear = useCartStore((s) => s.clear)
  const [submitting, setSubmitting] = useState(false)

  if (items.length === 0) {
    return (
      <Container className="py-24 text-center">
        <p className="text-ink-muted">سبد خرید خالی است.</p>
        <Link to="/products" className="mt-4 inline-block text-gold-700 hover:underline">
          بازگشت به فروشگاه
        </Link>
      </Container>
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    clear()
    setSubmitting(false)
    navigate('/account?order=success')
  }

  return (
    <>
      <PageHeader
        title="تسویه حساب"
        breadcrumbs={[
          { label: 'خانه', href: '/' },
          { label: 'سبد', href: '/cart' },
          { label: 'تسویه' },
        ]}
      />
      <Container className="py-10">
        <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-border bg-surface-elevated p-6">
              <h2 className="font-semibold text-ink">اطلاعات گیرنده</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input label="نام و نام خانوادگی" name="fullName" required />
                <Input label="شماره موبایل" name="mobile" required inputMode="tel" />
                <Input label="شهر" name="city" required className="sm:col-span-1" />
                <Input label="کد پستی" name="postalCode" inputMode="numeric" />
                <div className="sm:col-span-2">
                  <Textarea label="آدرس کامل" name="address" required />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-surface-elevated p-6">
              <h2 className="font-semibold text-ink">روش ارسال</h2>
              <div className="mt-4 space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gold-300 bg-gold-50/50 p-4">
                  <input type="radio" name="shipping" defaultChecked className="text-gold-600" />
                  <span className="text-sm">
                    <span className="font-medium">پست پیشتاز</span>
                    <span className="block text-ink-muted">۲ تا ۴ روز کاری — رایگان</span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4">
                  <input type="radio" name="shipping" className="text-gold-600" />
                  <span className="text-sm">
                    <span className="font-medium">پیک فوری تهران</span>
                    <span className="block text-ink-muted">همان روز — ۱۵۰٬۰۰۰ تومان</span>
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-surface-elevated p-6">
              <h2 className="font-semibold text-ink">پرداخت</h2>
              <p className="mt-2 text-sm text-ink-muted">
                در نسخه متصل به بک‌اند، درگاه پرداخت .NET اینجا فراخوانی می‌شود.
              </p>
              <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4">
                <input type="radio" name="payment" defaultChecked />
                <span className="text-sm font-medium">پرداخت آنلاین (درگاه بانکی)</span>
              </label>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-surface-elevated p-6 lg:sticky lg:top-36">
            <p className="text-sm text-ink-muted">{items.length} قلم کالا</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{formatPriceToman(subtotal)}</p>
            <Button type="submit" fullWidth className="mt-6" disabled={submitting}>
              {submitting ? 'در حال ثبت...' : 'پرداخت و ثبت سفارش'}
            </Button>
            <Link
              to="/cart"
              className="mt-3 block text-center text-sm text-gold-700 hover:underline"
            >
              بازگشت به سبد
            </Link>
          </aside>
        </form>
      </Container>
    </>
  )
}
