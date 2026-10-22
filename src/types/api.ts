export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface ApiError {
  message: string
  statusCode?: number
  errors?: Record<string, string[]>
}
