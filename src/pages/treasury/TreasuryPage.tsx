import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'

const steps = [
  { title: 'انتخاب طرح', text: 'مبلغ ماهانه یا هفتگی را تعیین کنید.' },
  { title: 'واریز تدریجی', text: 'از کیف پول گنجینه یا درگاه بانکی شارژ کنید.' },
  { title: 'انتخاب محصول', text: 'پس از رسیدن به سقف، زیورآلات را تحویل بگیرید.' },
]

export function TreasuryPage() {
  return (
    <>
      <PageHeader
        title="گنجینه طلا"
        description="پس‌انداز هوشمند برای خرید زیورآلات ۱۸ عیار"
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'گنجینه طلا' }]}
      />
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm leading-8 text-ink-muted">
              با گنجینه گلداستور بدون فشار مالی یک‌جا، به‌صورت مرحله‌ای برای زیورآلات دلخواه
              پس‌انداز کنید. موجودی شما شفاف است و در هر زمان می‌توانید طرح را متوقف یا
              تغییر دهید.
            </p>
            <ul className="mt-8 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-white"
                    aria-hidden
                  >
                    {(i + 1).toLocaleString('fa-IR')}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/account" className="mt-8 inline-block">
              <Button>شروع گنجینه (ورود به حساب)</Button>
            </Link>
          </div>
          <div
            className="aspect-square rounded-3xl bg-gradient-to-br from-gold-100 via-gold-200 to-gold-400 p-10 shadow-card"
            aria-hidden
          >
            <div className="flex h-full flex-col justify-end rounded-2xl border border-white/40 bg-white/30 p-6 backdrop-blur">
              <p className="text-sm text-ink/80">موجودی نمونه</p>
              <p className="text-3xl font-semibold text-ink">۲۴٬۵۰۰٬۰۰۰ تومان</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
