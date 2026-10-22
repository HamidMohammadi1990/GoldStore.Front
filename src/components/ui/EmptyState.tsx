import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

type EmptyStateProps = {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-elevated px-6 py-16 text-center',
        className,
      )}
    >
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-ink-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
