import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Truck } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { ProductBadgePill } from '@/components/ui/Badge'
import { formatPriceToman, formatWeightGrams } from '@/lib/utils/format'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import type { ProductDetail } from '@/types/product'

type ProductPurchasePanelProps = {
  product: ProductDetail
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [size, setSize] = useState<number | undefined>(product.ringSizes?.[2])
  const [qty, setQty] = useState(1)
  const addItem = useCartStore((s) => s.addItem)
  const { toggle, has } = useWishlistStore()
  const wished = has(product.id)

  const needsSize = Boolean(product.ringSizes?.length)

  const handleAdd = () => {
    if (needsSize && size == null) return
    addItem(product, { quantity: qty, size })
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-soft sm:p-5 lg:sticky lg:top-28 lg:self-start">
      {product.badges?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {product.badges.map((b) => <ProductBadgePill key={b} type={b} />)}
        </div>
      ) : null}

      <h1 className="mt-2 text-base font-semibold leading-snug text-ink sm:mt-3 sm:text-lg">
        {product.title}
      </h1>
      <p className="mt-0.5 text-xs text-ink-subtle">کد {product.code}</p>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border pb-3">
        <p className="text-xl font-semibold text-ink sm:text-2xl">
          {formatPriceToman(product.priceToman)}
        </p>
        <p className="text-xs text-ink-muted sm:text-sm">{formatWeightGrams(product.weightGrams)}</p>
        <p className="w-full text-[11px] text-ink-subtle sm:w-auto">
          {product.karat} عیار · اجرت {product.makingFeePercent}٪
        </p>
      </div>

      {product.ringSizes?.length ? (
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-ink">سایز انگشتر</p>
            <Link to="/guides/size" className="text-[11px] text-gold-700 hover:underline">
              راهنما
            </Link>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.ringSizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`h-9 min-w-9 rounded-lg border px-2.5 text-xs transition-colors ${
                  size === s
                    ? 'border-gold-500 bg-gold-50 text-gold-800'
                    : 'border-border hover:border-gold-300'
                }`}
              >
                {s.toLocaleString('fa-IR')}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-muted">تعداد</span>
          <div className="inline-flex h-9 items-center rounded-full border border-border">
            <button
              type="button"
              className="flex size-9 items-center justify-center text-base"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="کاهش"
            >
              −
            </button>
            <span className="min-w-7 text-center text-sm font-medium">
              {qty.toLocaleString('fa-IR')}
            </span>
            <button
              type="button"
              className="flex size-9 items-center justify-center text-base"
              onClick={() => setQty((q) => q + 1)}
              aria-label="افزایش"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-2 sm:flex-1 sm:justify-end">
          <Button className="h-10 flex-1 px-4 sm:max-w-[11rem]" size="sm" onClick={handleAdd} disabled={!product.isInStock}>
            <ShoppingBag className="size-4" />
            افزودن به سبد
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-10 shrink-0 px-3"
            onClick={() => toggle(product.id)}
            aria-pressed={wished}
            aria-label={wished ? 'در علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی'}
          >
            <Heart className={`size-4 ${wished ? 'fill-gold-500 text-gold-500' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-gold-50/80 px-3 py-2.5 text-[11px] leading-relaxed text-ink-muted sm:text-xs">
        <Truck className="mt-0.5 size-3.5 shrink-0 text-gold-700" />
        <p>
          {product.badges?.includes('fast-shipping')
            ? 'ارسال فوری تهران — امروز یا فردا'
            : 'ارسال ۳ تا ۷ روز کاری · بیمه کامل'}
        </p>
      </div>
    </div>
  )
}
