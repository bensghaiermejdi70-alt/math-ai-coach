import { CSSProperties } from 'react'

interface StatCardProps {
  icon: string; num: string | number; label: string
  sublabel?: string; color?: string; trend?: number; style?: CSSProperties
}

export default function StatCard({ icon, num, label, sublabel, color = 'var(--accent)', trend, style }: StatCardProps) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: 24, ...style }}>
      <div style={{ fontSize: 30, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color, marginBottom: 4 }}>{num}</div>
      <div style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 500 }}>{label}</div>
      {sublabel && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{sublabel}</div>}
      {trend !== undefined && (
        <div style={{ marginTop: 8, fontSize: 12, color: trend >= 0 ? 'var(--teal)' : 'var(--red)', fontFamily: 'var(--font-mono)' }}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% cette semaine
        </div>
      )}
    </div>
  )
}