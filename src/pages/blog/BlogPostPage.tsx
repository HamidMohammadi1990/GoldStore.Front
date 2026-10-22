import { Link, useParams } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { getBlogPostBySlug } from '@/mocks/blog'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? getBlogPostBySlug(slug) : undefined

  if (!post) {
    return (
      <Container className="py-24 text-center">
        <p className="text-ink-muted">مقاله پیدا نشد.</p>
        <Link to="/blog" className="mt-4 inline-block text-gold-700 hover:underline">
          بازگشت به مجله
        </Link>
      </Container>
    )
  }

  return (
    <article>
      <div className="aspect-[21/9] max-h-[420px] w-full overflow-hidden bg-ink">
        <img src={post.imageUrl} alt="" className="size-full object-cover opacity-90" />
      </div>
      <Container className="py-8">
        <Breadcrumbs
          items={[
            { label: 'خانه', href: '/' },
            { label: 'مجله', href: '/blog' },
            { label: post.title },
          ]}
        />
        <header className="mx-auto max-w-3xl pt-6 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gold-100 px-3 py-0.5 text-xs text-gold-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-2xl font-semibold leading-relaxed text-ink sm:text-3xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-ink-muted">
            {post.author} ·{' '}
            {new Intl.DateTimeFormat('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(post.publishedAt))}
          </p>
        </header>
        <div className="prose prose-sm mx-auto mt-10 max-w-3xl space-y-6 text-sm leading-8 text-ink-muted">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  )
}
