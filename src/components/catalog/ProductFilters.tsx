import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils/cn'
import type { ProductSort } from '@/types/catalog'

const sortOptions: { value: ProductSort; label: string }[] = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'price-asc', label: 'ارزان‌ترین' },
  { value: 'price-desc', label: 'گران‌ترین' },
  { value: 'weight-asc', label: 'سبک‌ترین' },
  { value: 'weight-desc', label: 'سنگین‌ترین' },
]

type ProductFiltersProps = {
  showFastShipping?: boolean
  className?: string
}

export function ProductFilters({ showFastShipping, className }: ProductFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = (searchParams.get('sort') as ProductSort) || 'newest'
  const minPrice = searchParams.get('minPrice') ?? ''
  const maxPrice = searchParams.get('maxPrice') ?? ''
  const fast = searchParams.get('fast') === '1'

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams)
    if (value == null || value === '') next.delete(key)
    else next.set(key, value)
    if (key !== 'page') next.delete('page')
    setSearchParams(next)
  }

  const clearAll = () => setSearchParams({})

  return (
    <aside
      className={cn(
        'space-y-6 rounded-2xl border border-border bg-surface-elevated p-5 lg:sticky lg:top-36',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink">فیلترها</h2>
        <button
          type="button"
          className="text-xs text-gold-700 hover:underline"
          onClick={clearAll}
        >
          پاک کردن
        </button>
      </div>

      <div>
        <label htmlFor="sort" className="mb-2 block text-xs font-medium text-ink-muted">
          مرتب‌سازی
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => update('sort', e.target.value)}
          className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-gold-400"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="حداقل قیمت"
          name="minPrice"
          inputMode="numeric"
          placeholder="تومان"
          value={minPrice}
          onChange={(e) => update('minPrice', e.target.value)}
        />
        <Input
          label="حداکثر قیمت"
          name="maxPrice"
          inputMode="numeric"
          placeholder="تومان"
          value={maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
        />
      </div>

      {showFastShipping !== false ? (
        <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={fast}
            onChange={(e) => update('fast', e.target.checked ? '1' : null)}
            className="size-4 rounded border-border text-gold-600 focus:ring-gold-400"
          />
          فقط ارسال فوری
        </label>
      ) : null}

      <Button variant="outline" fullWidth onClick={() => update('page', '1')}>
        اعمال فیلتر
      </Button>
    </aside>
  )
}
