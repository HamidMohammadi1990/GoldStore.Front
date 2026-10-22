import { forwardRef, type TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? props.name
    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'min-h-[120px] w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-subtle focus:border-gold-400 focus:ring-2 focus:ring-gold-200/60',
            error && 'border-rose-500',
            className,
          )}
          {...props}
        />
        {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
