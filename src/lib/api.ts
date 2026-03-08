const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface SolveResponse {
  result: string
  steps: { label: string; math: string; note?: string }[]
  method: string
  type: string
  error?: string
}

export interface ChatResponse { response: string; error?: string }
export interface ExercisesResponse { exercises: Exercise[] }
export interface Exercise {
  id: string; title: string; question: string
  difficulty: 'facile' | 'moyen' | 'difficile' | 'bac'
  chapter: string; points: number; solution?: string
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export const api = {
  solve: (expression: string) =>
    apiFetch<SolveResponse>('/api/solve', { method: 'POST', body: JSON.stringify({ expression }) }),

  chat: (message: string, history = []) =>
    apiFetch<ChatResponse>('/api/chat', { method: 'POST', body: JSON.stringify({ message, history }) }),

  exercises: (chapter?: string, difficulty?: string) =>
    apiFetch<ExercisesResponse>(`/api/exercises?chapter=${chapter||''}&difficulty=${difficulty||''}`),

  exams: (year?: number, country = 'tunisie') =>
    apiFetch<{ exams: Exam[] }>(`/api/exams?country=${country}&year=${year||''}`),

  profile: () => apiFetch<UserProfile>('/api/profile'),
  progress: () => apiFetch<Progress>('/api/progress'),
}

export interface Exam { id: string; year: number; country: string; level: string; pdfUrl: string; solutionUrl: string }
export interface UserProfile { id: string; name: string; email: string; level: string; country: string; joinedAt: string; stats: { solved: number; streak: number; score: number; rank: number } }
export interface Progress { byChapter: { chapter: string; score: number; total: number }[]; weak: string[]; strong: string[] }
