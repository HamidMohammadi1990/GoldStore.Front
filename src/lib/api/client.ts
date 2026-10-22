import axios, { type AxiosError } from 'axios'

import type { ApiError } from '@/types/api'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const apiClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const normalized: ApiError = {
      message:
        error.response?.data?.message ??
        error.message ??
        'خطایی در ارتباط با سرور رخ داد.',
      statusCode: error.response?.status,
      errors: error.response?.data?.errors,
    }
    return Promise.reject(normalized)
  },
)
