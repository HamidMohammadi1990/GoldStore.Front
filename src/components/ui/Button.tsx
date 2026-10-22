import { forwardRef, type ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-white hover:bg-ink/90 shadow-soft focus-visible:ring-gold-400',
  secondary:
    'bg-gold-500 text-white hover:bg-gold-600 shadow-soft focus-visible:ring-gold-300',
  ghost: 'text-ink hover:bg-gold-50 focus-visible:ring-gold-300',
  outline:
    'border border-border-strong bg-surface-elevated text-ink hover:border-gold-400 hover:text-gold-700 focus-visible:ring-gold-300',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth,
      type = 'button',
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantClass[variant],
        sizeClass[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
