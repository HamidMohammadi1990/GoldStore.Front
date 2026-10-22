import { useState } from 'react'

import { cn } from '@/lib/utils/cn'

type ProductGalleryProps = {
  images: string[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const list = images.length ? images : ['/favicon.svg']

  return (
    <div className="w-full lg:max-w-xl">
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-border bg-gold-50',
          'h-[min(72vw,17.5rem)] sm:h-[20rem] lg:h-[22rem] xl:h-[24rem]',
        )}
      >
        <img
          src={list[active]}
          alt={title}
          className="size-full object-cover object-center"
        />
      </div>
      {list.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5">
          {list.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'size-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:size-16',
                i === active ? 'border-gold-500' : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <img src={src} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
