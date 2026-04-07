'use client'

interface ProgressBarProps { value: number; max?: number; label?: string; color?: string; showPercent?: boolean }

export default function ProgressBar({ value, max = 100, label, color = 'linear-gradient(90deg, var(--accent), var(--teal))', showPercent = true }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div>
      {(label || showPercent) && (
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          {label && <span style={{ fontSize:13, color:'var(--text2)' }}>{label}</span>}
          {showPercent && <span style={{ fontSize:13, fontFamily:'var(--font-mono)', color:'var(--accent)' }}>{pct}%</span>}
        </div>
      )}
      <div className="progress">
        <div className="progress-fill" style={{ width:`${pct}%`, background:color }} />
      </div>
    </div>
  )
}
