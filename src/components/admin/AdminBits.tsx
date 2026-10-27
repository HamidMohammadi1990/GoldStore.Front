import type { ReactNode } from 'react'
import { Search } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

export function AdminPage({
  title,
  description,
  action,
  children,
}: {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
          {description ? <p className="mt-1 max-w-2xl text-sm text-ink-muted">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

export function AdminToolbar({ children }: { children: ReactNode }) {
  return <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">{children}</div>
}

export function AdminSearch({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <div className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-border bg-surface-elevated ps-9 pe-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200/60"
      />
    </div>
  )
}

export function FilterChips<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              active
                ? 'bg-ink text-white'
                : 'bg-surface-elevated text-ink-muted ring-1 ring-border hover:text-ink',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

const toneClass = {
  gold: 'bg-gold-100 text-gold-800',
  green: 'bg-emerald-50 text-emerald-800',
  red: 'bg-rose-50 text-rose-800',
  amber: 'bg-amber-50 text-amber-900',
  neutral: 'bg-ink/5 text-ink-muted',
} as const

export type PillTone = keyof typeof toneClass

export function StatusPill({ label, tone }: { label: string; tone: PillTone }) {
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium', toneClass[tone])}>
      {label}
    </span>
  )
}

export function AdminTable({ children, fit = false }: { children: ReactNode; fit?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated">
      <div className={fit ? undefined : 'overflow-x-auto'}>
        <table className={cn('w-full border-collapse text-sm', !fit && 'min-w-[720px]')}>{children}</table>
      </div>
    </div>
  )
}

export function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <th className={cn('bg-surface px-4 py-3 text-start text-xs font-medium text-ink-subtle', className)}>
      {children}
    </th>
  )
}

export function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cn('px-4 py-3 align-middle text-ink', className)}>{children}</td>
}

export function TextAction({
  children,
  onClick,
  tone = 'gold',
}: {
  children: ReactNode
  onClick?: () => void
  tone?: 'gold' | 'danger'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-xs font-medium hover:underline',
        tone === 'danger' ? 'text-rose-700' : 'text-gold-700',
      )}
    >
      {children}
    </button>
  )
}

export const fieldClass =
  'h-11 w-full rounded-xl border border-border bg-surface-elevated px-4 text-sm outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-200/60'

export function orderTone(status: string): PillTone {
  if (status === 'delivered' || status === 'paid') return 'green'
  if (status === 'shipped' || status === 'processing') return 'gold'
  if (status === 'cancelled') return 'red'
  if (status === 'pending') return 'amber'
  return 'neutral'
}
