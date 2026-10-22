import { Headphones, ShieldCheck, Store, Truck } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { siteConfig } from '@/config/site'

const items = [
  {
    icon: ShieldCheck,
    title: 'ضمانت اصالت',
    description: 'گواهی معتبر و مهر عیار روی محصولات',
  },
  {
    icon: Truck,
    title: 'ارسال امن',
    description: 'بسته‌بندی ویژه و بیمه محموله',
  },
  {
    icon: Headphones,
    title: 'پشتیبانی تخصصی',
    description: siteConfig.support.hours,
  },
  {
    icon: Store,
    title: 'شعب حضوری',
    description: 'امکان تحویل و مشاوره در شعب منتخب',
  },
]

export function TrustBanner() {
  return (
    <section className="border-y border-border py-10" aria-label="مزایای خرید">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-800"
                aria-hidden
              >
                <item.icon className="size-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
