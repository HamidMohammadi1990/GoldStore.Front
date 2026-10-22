import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAuthStore } from '@/stores/authStore'

export function AccountPage() {
  const user = useAuthStore((s) => s.user)
  const login = useAuthStore((s) => s.login)
  const register = useAuthStore((s) => s.register)
  const logout = useAuthStore((s) => s.logout)
  const [params] = useSearchParams()
  const orderSuccess = params.get('order') === 'success'

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onLogin = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const ok = await login(String(fd.get('mobile')), String(fd.get('password')))
    setLoading(false)
    if (!ok) setError('ورود ناموفق بود.')
  }

  const onRegister = async (e: { preventDefault: () => void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const ok = await register({
      fullName: String(fd.get('fullName')),
      mobile: String(fd.get('mobile')),
      password: String(fd.get('password')),
    })
    setLoading(false)
    if (!ok) setError('ثبت‌نام ناموفق بود.')
  }

  return (
    <>
      <PageHeader
        title="حساب کاربری"
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'حساب کاربری' }]}
      />
      <Container className="py-10">
        {orderSuccess ? (
          <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
            سفارش شما با موفقیت ثبت شد. جزئیات پس از اتصال API در بخش سفارش‌ها نمایش داده می‌شود.
          </div>
        ) : null}

        {user ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface-elevated p-8">
            <p className="text-sm text-ink-muted">خوش آمدید</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">{user.fullName}</h2>
            <p className="mt-2 text-sm text-ink-muted">{user.mobile}</p>
            {user.email ? (
              <p className="text-sm text-ink-muted">{user.email}</p>
            ) : null}

            <ul className="mt-8 space-y-2 text-sm">
              <li>
                <Link to="/orders" className="text-gold-700 hover:underline">
                  سفارش‌های من (به‌زودی با API)
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gold-700 hover:underline">
                  علاقه‌مندی‌ها
                </Link>
              </li>
            </ul>

            <Button variant="outline" className="mt-8" onClick={logout}>
              خروج از حساب
            </Button>
          </div>
        ) : (
          <div className="mx-auto max-w-md">
            <div className="mb-6 flex rounded-full border border-border p-1">
              <button
                type="button"
                className={`flex-1 rounded-full py-2 text-sm font-medium ${
                  mode === 'login' ? 'bg-ink text-white' : 'text-ink-muted'
                }`}
                onClick={() => setMode('login')}
              >
                ورود
              </button>
              <button
                type="button"
                className={`flex-1 rounded-full py-2 text-sm font-medium ${
                  mode === 'register' ? 'bg-ink text-white' : 'text-ink-muted'
                }`}
                onClick={() => setMode('register')}
              >
                ثبت‌نام
              </button>
            </div>

            {mode === 'login' ? (
              <form
                onSubmit={onLogin}
                className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-6"
              >
                <Input label="موبایل" name="mobile" required inputMode="tel" />
                <Input label="رمز عبور" name="password" type="password" required />
                {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                <Button type="submit" fullWidth disabled={loading}>
                  {loading ? '...' : 'ورود'}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={onRegister}
                className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-6"
              >
                <Input label="نام کامل" name="fullName" required />
                <Input label="موبایل" name="mobile" required inputMode="tel" />
                <Input label="رمز عبور" name="password" type="password" required minLength={6} />
                {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                <Button type="submit" fullWidth disabled={loading}>
                  {loading ? '...' : 'ایجاد حساب'}
                </Button>
              </form>
            )}
          </div>
        )}
      </Container>
    </>
  )
}
