import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { Textarea } from '@/components/ui/Textarea'
import { siteConfig } from '@/config/site'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHeader
        title="تماس با ما"
        description={siteConfig.support.hours}
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'تماس' }]}
      />
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-elevated p-6">
            <h2 className="font-semibold text-ink">اطلاعات تماس</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li>
                تلفن:{' '}
                <a href={siteConfig.support.phoneHref} className="text-gold-700">
                  {siteConfig.support.phone}
                </a>
              </li>
              <li>
                ایمیل:{' '}
                <a href={`mailto:${siteConfig.support.email}`} className="text-gold-700">
                  {siteConfig.support.email}
                </a>
              </li>
            </ul>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900">
              پیام شما ثبت شد. پس از اتصال API، تیکت به CRM ارسال می‌شود.
            </div>
          ) : (
            <form
              className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-6"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <Input label="نام" name="name" required />
              <Input label="موبایل" name="mobile" inputMode="tel" required />
              <Textarea label="پیام" name="message" required />
              <Button type="submit">ارسال پیام</Button>
            </form>
          )}
        </div>
      </Container>
    </>
  )
}
