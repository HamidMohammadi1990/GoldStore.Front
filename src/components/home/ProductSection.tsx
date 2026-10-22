import { Container } from '@/components/ui/Container'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { HomeSection } from '@/types/home'

type ProductSectionProps = {
  section: HomeSection
  className?: string
}

export function ProductSection({ section, className }: ProductSectionProps) {
  return (
    <section className={className} aria-labelledby={`section-${section.id}`}>
      <Container>
        <SectionTitle
          title={section.title}
          subtitle={section.subtitle}
          viewAllHref={section.viewAllHref}
        />
        <ProductGrid products={section.products} />
      </Container>
    </section>
  )
}
