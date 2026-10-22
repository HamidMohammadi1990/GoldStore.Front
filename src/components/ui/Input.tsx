import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? props.name
    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-xl border border-border bg-surface-elevated px-4 text-sm outline-none transition-colors placeholder:text-ink-subtle focus:border-gold-400 focus:ring-2 focus:ring-gold-200/60',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-200/60',
            className,
          )}
          {...props}
        />
        {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
      </div>
    )
  },
)
Input.displayName = 'Input'
