import { Link } from 'react-router-dom'
import { Mail, Phone, Send } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { siteConfig, footerNav } from '@/config/site'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-ink text-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span
                className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-sm font-bold"
                aria-hidden
              >
                G
              </span>
              <span className="text-xl font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-400 hover:text-gold-300"
                aria-label="اینستاگرام"
              >
                <span className="text-xs font-semibold">IG</span>
              </a>
              <a
                href={siteConfig.social.telegram}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-400 hover:text-gold-300"
                aria-label="تلگرام"
              >
                <Send className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gold-200">خرید آنلاین</h3>
              <ul className="mt-4 space-y-2.5">
                {footerNav.shop.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gold-200">گلداستور</h3>
              <ul className="mt-4 space-y-2.5">
                {footerNav.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-sm font-semibold text-gold-200">پشتیبانی</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>
                  <a
                    href={siteConfig.support.phoneHref}
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <Phone className="size-4 shrink-0 text-gold-400" />
                    {siteConfig.support.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.support.email}`}
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <Mail className="size-4 shrink-0 text-gold-400" />
                    {siteConfig.support.email}
                  </a>
                </li>
                <li className="text-white/55">{siteConfig.support.hours}</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gold-200">عضویت در خبرنامه</h3>
            <p className="mt-2 text-sm text-white/65">
              از تخفیف‌ها و کالکشن‌های جدید باخبر شوید.
            </p>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="newsletter-email">ایمیل</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="ایمیل شما"
                className="h-11 flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-full bg-gold-500 px-5 text-sm font-medium text-white transition-colors hover:bg-gold-400"
              >
                عضویت
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-center text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-start">
          <p>© {new Date().getFullYear()} {siteConfig.name}. تمامی حقوق محفوظ است.</p>
          <p>طراحی و توسعه فرانت‌اند — آماده اتصال به API .NET</p>
        </div>
      </Container>
    </footer>
  )
}
