import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

type PageHeaderProps = {
  title: string
  description?: string
  subtitle?: string
  breadcrumbs?: Crumb[]
  className?: string
}

export function PageHeader({
  title,
  description,
  subtitle,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  const desc = description ?? subtitle
  return (
    <div className={cn('border-b border-border bg-surface-elevated', className)}>
      <Container className="py-8 lg:py-10">
        {breadcrumbs?.length ? (
          <Breadcrumbs items={breadcrumbs} className="mb-4" />
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h1>
        {desc ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {desc}
          </p>
        ) : null}
      </Container>
    </div>
  )
}
