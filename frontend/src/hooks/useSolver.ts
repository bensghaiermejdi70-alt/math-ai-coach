'use client'
import { useState, useCallback } from 'react'

interface Step { label: string; math: string; note?: string }

interface SolverState {
  expression: string; steps: Step[]; result: string
  method: string; type: string; loading: boolean; error: string
}

export function useSolver() {
  const [state, setState] = useState<SolverState>({
    expression: '', steps: [], result: '', method: '', type: '', loading: false, error: ''
  })

  const solve = useCallback(async (expr: string) => {
    if (!expr.trim()) return
    setState(s => ({ ...s, expression: expr, loading: true, error: '', steps: [], result: '' }))

    try {
      const res = await fetch('http://localhost:8000/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: expr }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      if (data.error) {
        setState(s => ({ ...s, loading: false, error: data.error }))
      } else {
        setState(s => ({
          ...s, loading: false,
          steps: data.steps || [],
          result: data.result || '',
          method: data.method || '',
          type: data.type || '',
        }))
      }
    } catch (err: any) {
      setState(s => ({ ...s, loading: false, error: '⚠️ Backend non disponible. Lance le serveur sur le port 8000.' }))
    }
  }, [])

  const reset = useCallback(() => {
    setState({ expression: '', steps: [], result: '', method: '', type: '', loading: false, error: '' })
  }, [])

  return { ...state, solve, reset }
}