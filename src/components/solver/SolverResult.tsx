'use client'
import StepByStep from '../ui/StepByStep'
import Badge from '../ui/Badge'
import Link from 'next/link'

interface Step { label: string; math: string; note?: string }
interface SolverResultProps {
  expression: string
  steps: Step[]
  result: string
  method: string
  type: string
  isLoading: boolean
  error?: string
}

const typeIcons: Record<string, string> = {
  equation: '⚖️', integral: '∫', derivative: "f'", limit: '→', complex: 'ℂ', matrix: '⊗', system: '⊕'
}

export default function SolverResult({ expression, steps, result, method, type, isLoading, error }: SolverResultProps) {
  if (isLoading) return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(79,110,247,0.15)', borderTopColor: 'var(--accent)', animation: 'spin 0.7s linear infinite' }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Résolution en cours...</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>L'IA analyse ton expression</div>
        </div>
      </div>
      {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 12, marginBottom: 10, animationDelay: `${i * 0.1}s` }} />)}
    </div>
  )

  if (error) return (
    <div style={{ padding: 24, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 16, color: 'var(--red)' }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>❌ Erreur</div>
      <div style={{ fontSize: 14 }}>{error}</div>
    </div>
  )

  if (!steps.length && !result) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, color: 'var(--muted)', textAlign: 'center' }}>
      <div style={{ fontSize: 70, marginBottom: 20, animation: 'float 3s ease infinite' }}>∑</div>
      <p style={{ fontSize: 16, marginBottom: 8 }}>Écris une expression mathématique</p>
      <p style={{ fontSize: 13 }}>et clique sur Résoudre pour voir les étapes</p>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Expression résolue :</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px' }}>{expression}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {type && <Badge color="blue">{typeIcons[type] || '📐'} {type}</Badge>}
          {method && <Badge color="purple">Méthode : {method}</Badge>}
        </div>
      </div>

      {/* Steps */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>📋 Résolution étape par étape</div>
        <StepByStep steps={steps} result={result} />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard?.writeText(`${expression}\n→ ${result}`)}>📋 Copier</button>
        <Link href={`/chat?q=${encodeURIComponent('Explique cet exercice : ' + expression)}`} className="btn btn-ghost btn-sm">🤖 Demander une explication</Link>
        <button className="btn btn-ghost btn-sm">📄 Exporter en PDF</button>
      </div>
    </div>
  )
}
