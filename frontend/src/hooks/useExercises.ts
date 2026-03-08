'use client'
import { useState, useEffect, useCallback } from 'react'

export interface Exercise {
  id: string; title: string; question: string
  difficulty: 'facile' | 'moyen' | 'difficile' | 'bac'
  chapter: string; points: number
  solution?: string; steps?: { label: string; math: string }[]
}

interface Filters { chapter?: string; difficulty?: string; level?: 'bac' | 'universite' }

export function useExercises(filters: Filters = {}) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetch_ = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.chapter) params.set('chapter', filters.chapter)
      if (filters.difficulty) params.set('difficulty', filters.difficulty)
      if (filters.level) params.set('level', filters.level)

      const res = await fetch(`http://localhost:8000/api/exercises?${params}`)
      const data = await res.json()
      setExercises(data.exercises || [])
    } catch {
      setError('Impossible de charger les exercices.')
    }
    setLoading(false)
  }, [filters.chapter, filters.difficulty, filters.level])

  useEffect(() => { fetch_() }, [fetch_])

  const submitAnswer = useCallback(async (exerciseId: string, answer: string) => {
    const res = await fetch('http://localhost:8000/api/exercises/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exerciseId, answer }),
    })
    return res.json()
  }, [])

  return { exercises, loading, error, refetch: fetch_, submitAnswer }
}