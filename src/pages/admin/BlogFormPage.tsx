import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AdminPage, fieldClass } from '@/components/admin/AdminBits'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { localImages } from '@/config/images'
import { useAdminStore } from '@/stores/adminStore'
import type { AdminBlogPost, PublishStatus } from '@/types/admin'

export function AdminBlogFormPage() {
  const { id } = useParams()
  return <BlogForm key={id ?? 'new'} postId={id} />
}

function BlogForm({ postId }: { postId?: string }) {
  const navigate = useNavigate()
  const posts = useAdminStore((state) => state.posts)
  const savePost = useAdminStore((state) => state.savePost)
  const existing = posts.find((post) => post.id === postId)
  const [error, setError] = useState<string | null>(null)

  if (postId && !existing) {
    return (
      <AdminPage title="نوشته پیدا نشد">
        <EmptyState
          title="این نوشته در مجله نیست"
          action={
            <Link to="/admin/blog" className="text-sm font-medium text-gold-700 hover:underline">
              بازگشت به وبلاگ
            </Link>
          }
        />
      </AdminPage>
    )
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title') ?? '').trim()
    const slug = String(form.get('slug') ?? '').trim()
    const excerpt = String(form.get('excerpt') ?? '').trim()
    const author = String(form.get('author') ?? '').trim()
    const content = String(form.get('content') ?? '').trim()
    const tags = String(form.get('tags') ?? '')
      .split('،')
      .join(',')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
    const readingMinutes = Number(form.get('readingMinutes'))
    const status = String(form.get('status') ?? 'draft') as PublishStatus

    if (!title || !slug || !excerpt || !content) {
      setError('عنوان، نامک، خلاصه و متن را کامل کنید.')
      return
    }
    if (posts.some((post) => post.slug === slug && post.id !== existing?.id)) {
      setError('این نامک برای نوشته دیگری ثبت شده است.')
      return
    }

    const post: AdminBlogPost = {
      id: existing?.id ?? `b-${Date.now()}`,
      title,
      slug,
      excerpt,
      author: author || 'تحریریه گلداستور',
      content: content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
      imageUrl: existing?.imageUrl ?? localImages.blog.b1,
      publishedAt: existing?.publishedAt ?? new Date().toISOString().slice(0, 10),
      readingMinutes: Number.isFinite(readingMinutes) && readingMinutes > 0 ? readingMinutes : 5,
      tags,
      status,
    }
    savePost(post)
    navigate('/admin/blog')
  }

  return (
    <AdminPage title={existing ? 'ویرایش نوشته' : 'نوشته جدید'} description="متن مجله را اینجا بنویسید. هر پاراگراف را با یک خط خالی جدا کنید.">
      <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-border bg-surface-elevated p-5 sm:p-6">
        <Input name="title" label="عنوان" defaultValue={existing?.title} required />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input name="slug" label="نامک" defaultValue={existing?.slug} dir="ltr" required />
          <Input name="author" label="نویسنده" defaultValue={existing?.author ?? 'تحریریه گلداستور'} />
        </div>
        <Textarea name="excerpt" label="خلاصه" defaultValue={existing?.excerpt} />
        <Textarea name="content" label="متن" defaultValue={existing?.content.join('\n\n')} className="min-h-48" />
        <div className="grid gap-5 sm:grid-cols-3">
          <Input name="tags" label="برچسب‌ها" defaultValue={existing?.tags.join('، ')} />
          <Input
            name="readingMinutes"
            label="زمان مطالعه (دقیقه)"
            type="number"
            min={1}
            defaultValue={existing?.readingMinutes ?? 5}
          />
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink">وضعیت</span>
            <select name="status" defaultValue={existing?.status ?? 'draft'} className={fieldClass}>
              <option value="draft">پیش‌نویس</option>
              <option value="published">منتشر شده</option>
            </select>
          </label>
        </div>
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        <div className="flex gap-3">
          <Button type="submit">{existing ? 'ذخیره نوشته' : 'ثبت نوشته'}</Button>
          <Link
            to="/admin/blog"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong bg-surface-elevated px-6 text-sm font-medium text-ink hover:border-gold-400 hover:text-gold-700"
          >
            انصراف
          </Link>
        </div>
      </form>
    </AdminPage>
  )
}
