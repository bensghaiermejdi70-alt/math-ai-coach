'use client'
import { useState, useEffect } from 'react'

interface HistoryItem { expr: string; result: string; time: string; type: string }

interface SolverHistoryProps { onSelect: (expr: string) => void }

export default function SolverHistory({ onSelect }: SolverHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([
    { expr: '2x² - 5x + 3 = 0', result: 'x = 1  ou  x = 3/2', time: 'il y a 2 min', type: 'Équation' },
    { expr: '∫ x·e^x dx', result: 'e^x(x-1) + C', time: 'il y a 10 min', type: 'Intégrale' },
    { expr: 'lim x→∞ (1+1/x)^x', result: 'e', time: 'hier', type: 'Limite' },
    { expr: "f'(x) = x³·ln(x)", result: 'x²(3ln(x)+1)', time: 'hier', type: 'Dérivée' },
  ])

  const clear = () => setHistory([])

  if (!history.length) return (
    <div style={{ textAlign: 'center', padding: 32, color: 'var(--muted)' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>🕐</div>
      <p style={{ fontSize: 13 }}>Aucun historique</p>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Historique</span>
        <button onClick={clear} style={{ fontSize: 11, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Effacer tout</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {history.map((item, i) => (
          <div key={i} onClick={() => onSelect(item.expr)}
            style={{ padding: '12px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,110,247,0.3)'; e.currentTarget.style.background = 'var(--surface3)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface2)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.type}</span>
              <span style={{ fontSize: 10, color: 'var(--muted)' }}>{item.time}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>{item.expr}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--teal)' }}>→ {item.result}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
