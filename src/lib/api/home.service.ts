import { apiClient } from '@/lib/api/client'
import { apiEndpoints } from '@/lib/api/endpoints'
import { mockHomeContent } from '@/mocks/home'
import type { ApiResponse } from '@/types/api'
import type { HomeContent } from '@/types/home'

const useMock = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export async function fetchHomeContent(): Promise<HomeContent> {
  if (useMock) {
    await delay(200)
    return mockHomeContent
  }

  const { data } = await apiClient.get<ApiResponse<HomeContent>>(
    apiEndpoints.home.content,
  )
  return data.data
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
