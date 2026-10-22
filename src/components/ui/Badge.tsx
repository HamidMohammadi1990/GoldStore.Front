import { cn } from '@/lib/utils/cn'
import type { ProductBadge } from '@/types/product'

const badgeLabels: Record<ProductBadge, string> = {
  'fast-shipping': 'ارسال فوری',
  new: 'جدید',
  bestseller: 'پرفروش',
  limited: 'محدود',
}

const badgeStyles: Record<ProductBadge, string> = {
  'fast-shipping': 'bg-emerald-700/90 text-white',
  new: 'bg-gold-500 text-white',
  bestseller: 'bg-ink text-white',
  limited: 'bg-rose-800/90 text-white',
}

type BadgeProps = {
  type: ProductBadge
  className?: string
}

export function ProductBadgePill({ type, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide',
        badgeStyles[type],
        className,
      )}
    >
      {badgeLabels[type]}
    </span>
  )
}
