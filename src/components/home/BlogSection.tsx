import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { BlogPostSummary } from '@/types/home'

type BlogSectionProps = {
  posts: BlogPostSummary[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="bg-gold-50/60 py-14 lg:py-20" aria-label="مجله گلداستور">
      <Container>
        <SectionTitle
          title="مجله گلداستور"
          subtitle="راهنمای خرید، استایل و نگهداری زیورآلات"
          viewAllHref="/blog"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-soft transition-shadow hover:shadow-card"
            >
              <Link to={`/blog/${post.slug}`} className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <time className="text-xs text-ink-subtle" dateTime={post.publishedAt}>
                  {new Intl.DateTimeFormat('fa-IR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(post.publishedAt))}
                </time>
                <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-relaxed text-ink group-hover:text-gold-800">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-3 text-xs font-medium text-gold-700 hover:text-gold-600"
                >
                  ادامه مطلب
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
