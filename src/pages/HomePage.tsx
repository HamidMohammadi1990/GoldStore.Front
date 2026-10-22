import { useQuery } from '@tanstack/react-query'

import { BlogSection } from '@/components/home/BlogSection'
import { CategoryStrip } from '@/components/home/CategoryStrip'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import { ProductSection } from '@/components/home/ProductSection'
import { SeoIntro } from '@/components/home/SeoIntro'
import { TrustBanner } from '@/components/home/TrustBanner'
import { Container } from '@/components/ui/Container'
import { Skeleton } from '@/components/ui/Skeleton'
import { fetchHomeContent } from '@/lib/api/home.service'

function HomePageSkeleton() {
  return (
    <div className="space-y-8 py-8">
      <Skeleton className="mx-auto h-[420px] max-w-7xl rounded-none" />
      <Container>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </Container>
    </div>
  )
}

export function HomePage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['home', 'content'],
    queryFn: fetchHomeContent,
  })

  if (isLoading) return <HomePageSkeleton />

  if (isError || !data) {
    return (
      <Container className="py-24 text-center">
        <p className="text-ink-muted">
          {(error as { message?: string })?.message ?? 'بارگذاری صفحه با خطا مواجه شد.'}
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-medium text-gold-700 underline"
          onClick={() => refetch()}
        >
          تلاش مجدد
        </button>
      </Container>
    )
  }

  return (
    <>
      <HeroCarousel slides={data.heroSlides} />
      <CategoryStrip categories={data.categories} />
      <TrustBanner />
      <ProductSection section={data.fastShipping} className="py-14 lg:py-20" />
      <ProductSection section={data.newArrivals} className="pb-14 lg:pb-20" />
      <ProductSection section={data.collections} className="pb-14 lg:pb-20" />
      <BlogSection posts={data.blogPosts} />
      <SeoIntro />
    </>
  )
}
