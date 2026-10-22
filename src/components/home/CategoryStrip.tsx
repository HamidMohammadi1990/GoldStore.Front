import { Link } from 'react-router-dom'

import { getCategoryIcon } from '@/config/categoryIcons'
import { Container } from '@/components/ui/Container'
import type { Category } from '@/types/category'

type CategoryStripProps = {
  categories: Category[]
}

export function CategoryStrip({ categories }: CategoryStripProps) {
  return (
    <section className="border-b border-border bg-surface-elevated py-8" aria-label="دسته‌بندی‌ها">
      <Container>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none md:grid md:grid-cols-4 md:gap-4 lg:grid-cols-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.slug}`}
              className="group flex min-w-[5.5rem] flex-col items-center gap-3 rounded-2xl border border-transparent p-3 transition-colors hover:border-gold-200 hover:bg-gold-50/50 md:min-w-0"
            >
              <span
                className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-200 text-lg text-gold-800 shadow-soft transition-transform group-hover:scale-105"
                aria-hidden
              >
                {getCategoryIcon(cat.slug)}
              </span>
              <span className="text-center text-xs font-medium text-ink sm:text-sm">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
