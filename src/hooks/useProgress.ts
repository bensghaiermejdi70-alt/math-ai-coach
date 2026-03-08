'use client'
import { useState, useEffect } from 'react'

interface ChapterProgress { chapter: string; score: number; total: number; completed: number }
interface ProgressData {
  overall: number; byChapter: ChapterProgress[]
  weak: string[]; strong: string[]; streak: number
  totalSolved: number; rank: number
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8000/api/progress')
      .then(r => r.json())
      .then(d => setProgress(d))
      .catch(() => {
        // Fallback mock data for dev
        setProgress({
          overall: 72,
          byChapter: [
            { chapter: 'Complexes', score: 82, total: 32, completed: 26 },
            { chapter: 'Limites', score: 68, total: 24, completed: 16 },
            { chapter: 'Dérivées', score: 90, total: 36, completed: 32 },
            { chapter: 'Intégrales', score: 42, total: 30, completed: 13 },
            { chapter: 'Probabilités', score: 78, total: 26, completed: 20 },
          ],
          weak: ['Intégrales', 'Logarithme'],
          strong: ['Dérivées', 'Complexes'],
          streak: 12, totalSolved: 247, rank: 34,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return { progress, loading }
}
