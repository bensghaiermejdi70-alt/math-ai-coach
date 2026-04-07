import { ReactNode } from 'react'

type Color = 'blue' | 'teal' | 'gold' | 'purple' | 'red' | 'orange' | 'green'

interface BadgeProps { children: ReactNode; color?: Color; dot?: boolean; pulse?: boolean }

const colors: Record<Color, { bg: string; border: string; text: string }> = {
  blue:   { bg: 'rgba(79,110,247,0.12)',  border: 'rgba(79,110,247,0.3)',  text: '#4f6ef7' },
  teal:   { bg: 'rgba(6,214,160,0.12)',   border: 'rgba(6,214,160,0.3)',   text: '#06d6a0' },
  gold:   { bg: 'rgba(245,200,66,0.12)',  border: 'rgba(245,200,66,0.3)',  text: '#f5c842' },
  purple: { bg: 'rgba(124,58,237,0.12)',  border: 'rgba(124,58,237,0.3)',  text: '#a78bfa' },
  red:    { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   text: '#ef4444' },
  orange: { bg: 'rgba(249,115,22,0.12)',  border: 'rgba(249,115,22,0.3)',  text: '#fb923c' },
  green:  { bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.3)',   text: '#22c55e' },
}

export default function Badge({ children, color = 'blue', dot = false, pulse = false }: BadgeProps) {
  const c = colors[color]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 100,
      fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em',
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.text, animation: pulse ? 'pulse 2s ease infinite' : undefined, flexShrink: 0 }} />}
      {children}
    </span>
  )
}
