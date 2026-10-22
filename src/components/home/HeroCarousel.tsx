import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'
import type { HeroSlide } from '@/types/home'

type HeroCarouselProps = {
  slides: HeroSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const count = slides.length

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (count <= 1) return
    const timer = window.setInterval(() => go(1), 7000)
    return () => window.clearInterval(timer)
  }, [count, go])

  if (!count) return null

  const slide = slides[index]

  return (
    <section className="relative overflow-hidden bg-ink" aria-label="اسلایدر اصلی">
      <div className="relative min-h-[420px] md:min-h-[520px]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden={i !== index}
          >
            <img
              src={s.imageUrl}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-ink/85 via-ink/55 to-ink/25" />
          </div>
        ))}

        <Container className="relative z-10 flex min-h-[420px] flex-col justify-center py-16 md:min-h-[520px] md:py-20">
          <div className="max-w-xl text-white">
            {slide.accent === 'fast' ? (
              <span className="mb-4 inline-flex rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-medium">
                ارسال امروز
              </span>
            ) : (
              <span className="mb-4 inline-flex rounded-full border border-white/25 px-3 py-1 text-xs text-white/85">
                کالکشن اختصاصی
              </span>
            )}
            <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              {slide.title}
            </h1>
            {slide.subtitle ? (
              <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                {slide.subtitle}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={slide.ctaHref}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gold-500 px-8 text-base font-medium text-white shadow-soft transition-colors hover:bg-gold-400"
              >
                {slide.ctaLabel}
              </Link>
              <Link
                to="/products"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 px-8 text-base font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                همه محصولات
              </Link>
            </div>
          </div>
        </Container>

        {count > 1 ? (
          <>
            <button
              type="button"
              className="absolute start-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:inline-flex"
              onClick={() => go(-1)}
              aria-label="اسلاید قبلی"
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              type="button"
              className="absolute end-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:inline-flex"
              onClick={() => go(1)}
              aria-label="اسلاید بعدی"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === index ? 'w-8 bg-gold-400' : 'w-1.5 bg-white/40 hover:bg-white/70',
                  )}
                  onClick={() => setIndex(i)}
                  aria-label={`اسلاید ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
