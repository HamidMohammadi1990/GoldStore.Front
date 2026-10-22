import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'default' | 'narrow' | 'wide'
}

const sizeClass = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-[90rem]',
}

export function Container({
  className,
  size = 'default',
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClass[size], className)}
      {...props}
    />
  )
}
