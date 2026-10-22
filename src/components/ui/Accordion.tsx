import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

export type AccordionItem = {
  id: string
  title: string
  content: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  defaultOpenId?: string
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null)

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface-elevated">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-medium text-ink transition-colors hover:bg-gold-50/50"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              {item.title}
              <ChevronDown
                className={cn('size-4 shrink-0 text-ink-subtle transition-transform', open && 'rotate-180')}
                aria-hidden
              />
            </button>
            {open ? (
              <div className="px-5 pb-4 text-sm leading-7 text-ink-muted">{item.content}</div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
