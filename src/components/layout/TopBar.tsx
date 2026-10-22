import { TrendingUp } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { formatPriceToman } from '@/lib/utils/format'

type TopBarProps = {
  goldPricePerGram?: number
}

export function TopBar({ goldPricePerGram }: TopBarProps) {
  return (
    <div className="border-b border-border bg-ink text-white">
      <Container className="flex h-10 items-center justify-between gap-4 text-xs sm:text-sm">
        <p className="truncate text-white/85">
          ارسال امن به سراسر کشور · ضمانت اصالت کالا · مشاوره رایگان خرید
        </p>
        {goldPricePerGram ? (
          <div className="hidden shrink-0 items-center gap-1.5 text-gold-200 sm:flex">
            <TrendingUp className="size-3.5" aria-hidden />
            <span>هر گرم ۱۸ عیار:</span>
            <span className="font-medium text-white">
              {formatPriceToman(goldPricePerGram)}
            </span>
          </div>
        ) : null}
      </Container>
    </div>
  )
}
