'use client'
import { useState } from 'react'

interface SolverInputProps {
  onSolve: (expr: string) => void
  loading?: boolean
}

const EXAMPLES = [
  { label: 'Équation 1°', expr: '3x + 7 = 22' },
  { label: 'Équation 2°', expr: '2x² - 5x + 3 = 0' },
  { label: 'Complexes', expr: 'z² + 2z + 5 = 0' },
  { label: 'Dérivée', expr: "f'(x) = x³ + 2x + ln(x)" },
  { label: 'Intégrale', expr: '∫ x·e^x dx' },
  { label: 'Intégrale 2', expr: '∫ sin(x)·cos(x) dx' },
  { label: 'Limite', expr: 'lim x→0 sin(x)/x' },
  { label: 'Limite ∞', expr: 'lim x→∞ (3x²+1)/(x²-2)' },
  { label: 'Système', expr: '2x + y = 5, x - y = 1' },
  { label: 'Matrice det', expr: 'det([[2,1],[3,4]])' },
]

const SYMBOLS = ['∫','∞','√','²','³','π','≤','≥','≠','∈','∑','Δ','α','β','θ','→']

export default function SolverInput({ onSolve, loading }: SolverInputProps) {
  const [expr, setExpr] = useState('')

  const insertSymbol = (s: string) => setExpr(prev => prev + s)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Symbols toolbar */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Symboles rapides</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SYMBOLS.map(s => (
            <button key={s} onClick={() => insertSymbol(s)} style={{
              width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)',
              background: 'var(--surface2)', color: 'var(--text)', fontFamily: 'var(--font-mono)',
              fontSize: 16, cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Main input */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Expression mathématique</div>
        <textarea
          value={expr}
          onChange={e => setExpr(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); onSolve(expr) } }}
          placeholder={"Ex: 2x² - 5x + 3 = 0\nou: ∫ x·e^x dx\nou: lim x→0 sin(x)/x"}
          rows={4}
          style={{
            width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '14px 16px', color: 'var(--text)',
            fontFamily: 'var(--font-mono)', fontSize: 16, outline: 'none',
            resize: 'vertical', transition: 'border-color 0.2s',
          }}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
        />
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>Ctrl+Entrée pour résoudre rapidement</div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => onSolve(expr)}
          disabled={!expr.trim() || loading}
          style={{
            flex: 1, padding: '13px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)', color: 'white',
            fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s', opacity: !expr.trim() || loading ? 0.5 : 1,
            boxShadow: '0 0 30px rgba(79,110,247,0.3)',
          }}
        >
          {loading ? '⏳ Résolution en cours...' : '✨ Résoudre avec IA →'}
        </button>
        <button
          onClick={() => setExpr('')}
          style={{ padding: '13px 18px', borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontSize: 16, transition: 'all 0.2s' }}
          title="Effacer"
        >✕</button>
      </div>

      {/* Examples */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Exemples par type</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {EXAMPLES.map(ex => (
            <button key={ex.expr} onClick={() => setExpr(ex.expr)}
              style={{ padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(79,110,247,0.2)', background: 'rgba(79,110,247,0.08)', color: 'var(--accent)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,110,247,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(79,110,247,0.08)'}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
