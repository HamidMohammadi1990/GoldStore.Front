import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { mockBlogPosts } from '@/mocks/blog'

export function BlogListingPage() {
  return (
    <>
      <PageHeader
        title="مجله گلداستور"
        description="راهنما، استایل و دانستنی‌های طلا"
        breadcrumbs={[{ label: 'خانه', href: '/' }, { label: 'مجله' }]}
      />
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {mockBlogPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated sm:flex-row"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="aspect-[16/10] shrink-0 overflow-hidden sm:w-2/5"
              >
                <img
                  src={post.imageUrl}
                  alt=""
                  className="size-full object-cover transition-transform group-hover:scale-[1.02]"
                />
              </Link>
              <div className="flex flex-col p-6">
                <time className="text-xs text-ink-subtle" dateTime={post.publishedAt}>
                  {new Intl.DateTimeFormat('fa-IR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(post.publishedAt))}
                </time>
                <h2 className="mt-2 text-lg font-semibold leading-relaxed group-hover:text-gold-800">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-2 flex-1 text-sm text-ink-muted">{post.excerpt}</p>
                <p className="mt-3 text-xs text-ink-subtle">
                  {post.readingMinutes} دقیقه مطالعه
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  )
}
