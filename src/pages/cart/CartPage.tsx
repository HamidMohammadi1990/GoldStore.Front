import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { formatPriceToman, formatWeightGrams } from '@/lib/utils/format'
import { useCartStore } from '@/stores/cartStore'

const SHIPPING_FEE = 0

export function CartPage() {
  const items = useCartStore((s) => s.items)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore((s) => s.subtotalToman())

  return (
    <>
      <PageHeader
        title="سبد خرید"
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'سبد خرید' }]}
      />
      <Container className="py-10 lg:py-12">
        {items.length === 0 ? (
          <EmptyState
            title="سبد خرید شما خالی است"
            description="زیورآلات مورد علاقه را به سبد اضافه کنید."
            action={
              <Link
                to="/products"
                className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-white"
              >
                مشاهده محصولات
              </Link>
            }
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size ?? ''}`}
                  className="flex gap-4 rounded-2xl border border-border bg-surface-elevated p-4"
                >
                  <Link
                    to={`/products/${item.slug}`}
                    className="size-24 shrink-0 overflow-hidden rounded-xl bg-gold-50 sm:size-28"
                  >
                    <img src={item.imageUrl} alt="" className="size-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link
                      to={`/products/${item.slug}`}
                      className="text-sm font-medium text-ink hover:text-gold-800"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-xs text-ink-subtle">
                      کد {item.code}
                      {item.size != null ? ` · سایز ${item.size.toLocaleString('fa-IR')}` : ''}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                      {formatWeightGrams(item.weightGrams)}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          className="p-2"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1, item.size)
                          }
                          aria-label="کاهش"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.quantity.toLocaleString('fa-IR')}
                        </span>
                        <button
                          type="button"
                          className="p-2"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1, item.size)
                          }
                          aria-label="افزایش"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <p className="font-semibold text-ink">
                        {formatPriceToman(item.priceToman * item.quantity)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="self-start rounded-full p-2 text-ink-subtle hover:bg-rose-50 hover:text-rose-600"
                    onClick={() => removeItem(item.productId, item.size)}
                    aria-label="حذف"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft lg:sticky lg:top-36">
              <h2 className="text-lg font-semibold text-ink">خلاصه سفارش</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">جمع جزء</dt>
                  <dd>{formatPriceToman(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">هزینه ارسال</dt>
                  <dd>{SHIPPING_FEE === 0 ? 'رایگان' : formatPriceToman(SHIPPING_FEE)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <dt>مبلغ قابل پرداخت</dt>
                  <dd>{formatPriceToman(subtotal + SHIPPING_FEE)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-ink-subtle">
                قیمت نهایی ممکن است با نرخ روز طلا قبل از پرداخت به‌روز شود.
              </p>
              <Link to="/checkout" className="mt-6 block">
                <Button fullWidth>ادامه تسویه حساب</Button>
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </>
  )
}
