import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import {
  AdminPage,
  AdminSearch,
  AdminTable,
  AdminToolbar,
  FilterChips,
  StatusPill,
  Td,
  TextAction,
  Th,
} from '@/components/admin/AdminBits'
import { EmptyState } from '@/components/ui/EmptyState'
import { matchesQuery } from '@/lib/admin'
import { formatPersianDigits, formatShortDate } from '@/lib/utils/format'
import { useAdminStore } from '@/stores/adminStore'
import type { PublishStatus } from '@/types/admin'

type StatusFilter = 'all' | PublishStatus

export function AdminBlogPage() {
  const posts = useAdminStore((state) => state.posts)
  const savePost = useAdminStore((state) => state.savePost)
  const removePost = useAdminStore((state) => state.removePost)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<StatusFilter>('all')

  const rows = useMemo(() => {
    return posts.filter((post) => {
      if (!matchesQuery(query, post.title, post.excerpt, post.author, post.tags.join(' '))) return false
      if (filter === 'all') return true
      return post.status === filter
    })
  }, [posts, query, filter])

  return (
    <AdminPage
      title="وبلاگ"
      description="نوشته‌های مجله گلداستور."
      action={
        <Link
          to="/admin/blog/new"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white hover:bg-ink/90"
        >
          <Plus className="size-4" />
          نوشته جدید
        </Link>
      }
    >
      <AdminToolbar>
        <AdminSearch value={query} onChange={setQuery} placeholder="جستجو در عنوان یا برچسب" />
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'همه' },
            { value: 'published', label: 'منتشر شده' },
            { value: 'draft', label: 'پیش‌نویس' },
          ]}
        />
        <p className="text-xs text-ink-subtle">{formatPersianDigits(rows.length)} نوشته</p>
      </AdminToolbar>

      {rows.length === 0 ? (
        <EmptyState title="نوشته‌ای پیدا نشد" />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <Th>نوشته</Th>
              <Th>نویسنده</Th>
              <Th>تاریخ</Th>
              <Th>وضعیت</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((post) => (
              <tr key={post.id} className="border-t border-border">
                <Td>
                  <p className="font-medium">{post.title}</p>
                  <p className="mt-0.5 line-clamp-1 max-w-md text-xs text-ink-subtle">{post.excerpt}</p>
                </Td>
                <Td className="text-ink-muted">{post.author}</Td>
                <Td className="text-ink-muted">{formatShortDate(post.publishedAt)}</Td>
                <Td>
                  <StatusPill
                    label={post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    tone={post.status === 'published' ? 'green' : 'neutral'}
                  />
                </Td>
                <Td className="text-end">
                  <div className="flex justify-end gap-3">
                    <Link to={`/admin/blog/${post.id}`} className="text-xs font-medium text-gold-700 hover:underline">
                      ویرایش
                    </Link>
                    <TextAction
                      onClick={() =>
                        savePost({
                          ...post,
                          status: post.status === 'published' ? 'draft' : 'published',
                        })
                      }
                    >
                      {post.status === 'published' ? 'پیش‌نویس' : 'انتشار'}
                    </TextAction>
                    <TextAction
                      tone="danger"
                      onClick={() => {
                        if (window.confirm(`نوشته «${post.title}» حذف شود؟`)) removePost(post.id)
                      }}
                    >
                      حذف
                    </TextAction>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
    </AdminPage>
  )
}
