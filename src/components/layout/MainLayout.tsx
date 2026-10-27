import { useQuery } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { TopBar } from '@/components/layout/TopBar'
import { fetchHomeContent } from '@/lib/api/home.service'
import { mockCategories } from '@/mocks/categories'

export function MainLayout() {
  const { data } = useQuery({
    queryKey: ['home', 'content'],
    queryFn: fetchHomeContent,
  })

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Header categories={data?.categories ?? mockCategories} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
