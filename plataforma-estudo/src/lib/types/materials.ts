export type StudyMaterial = {
  id: string
  topic_id: string
  title: string
  content_path: string | null
  video_url: string | null
  pdf_url: string | null
  created_at: string
}

export type Topic = {
  id: string
  code: string
  name: string
  subject_id: string
  order_index: number
}

// Para tratamento de erros
export type ApiError = {
  detail: string
  status?: number
}

// Para estados de loading
export type ApiResponse<T> = {
  data: T | null
  error: ApiError | null
  loading: boolean
}