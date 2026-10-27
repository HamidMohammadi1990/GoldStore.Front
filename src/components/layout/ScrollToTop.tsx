import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

const SHOW_AFTER_PX = 400

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="رفتن به بالا"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed bottom-6 end-6 z-40 inline-flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-card transition-all duration-300 hover:from-gold-500 hover:to-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ChevronUp className="size-5" aria-hidden />
    </button>
  )
}
