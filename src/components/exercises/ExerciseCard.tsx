'use client'
import { useState } from 'react'

interface ExerciseCardProps {
  id: string; title: string; question: string; difficulty: 'facile' | 'moyen' | 'difficile' | 'bac'
  chapter: string; points?: number; onSolve?: (id: string) => void
}

const diffColors: Record<string, string> = {
  facile: 'var(--teal)', moyen: 'var(--gold)', difficile: 'var(--red)', bac: 'var(--accent)'
}
const diffBadge: Record<string, string> = {
  facile: 'badge-teal', moyen: 'badge-gold', difficile: 'badge-red', bac: 'badge-blue'
}

export default function ExerciseCard({ id, title, question, difficulty, chapter, points, onSolve }: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="card" style={{ cursor:'pointer' }} onClick={() => setExpanded(!expanded)}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
        <div>
          <span className={`badge ${diffBadge[difficulty]}`} style={{ marginBottom:8, display:'inline-block' }}>{difficulty}</span>
          <h4 style={{ fontSize:15, fontWeight:600, color:'var(--text)', marginBottom:4 }}>{title}</h4>
          <span style={{ fontSize:12, color:'var(--muted)' }}>📚 {chapter}</span>
        </div>
        {points && <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--gold)' }}>{points} pts</span>}
      </div>
      {expanded && (
        <div style={{ animation:'fadeInUp 0.3s ease both' }}>
          <div className="math-display" style={{ marginBottom:16 }}>{question}</div>
          <div style={{ display:'flex', gap:10 }}>
            <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); onSolve?.(id) }}>
              Résoudre avec IA →
            </button>
            <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}>
              Voir correction
            </button>
          </div>
        </div>
      )}
      <div style={{ fontSize:12, color:'var(--muted)', marginTop:expanded?12:0, textAlign:'right' }}>
        {expanded ? '▲ Réduire' : '▼ Voir l\'exercice'}
      </div>
    </div>
  )
}
