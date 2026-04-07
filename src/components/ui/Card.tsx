import { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  hover?: boolean
  glow?: boolean
  variant?: 'default' | 'glass' | 'gradient' | 'bordered'
  onClick?: () => void
}

export default function Card({ children, style, hover = true, glow = false, variant = 'default', onClick }: CardProps) {
  const base: CSSProperties = {
    borderRadius: 16,
    padding: 24,
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    cursor: onClick ? 'pointer' : undefined,
    position: 'relative',
    overflow: 'hidden',
  }

  const variants: Record<string, CSSProperties> = {
    default: {
      background: 'var(--surface)',
      border: '1px solid var(--border)',
    },
    glass: {
      background: 'rgba(17,20,43,0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
    },
    gradient: {
      background: 'linear-gradient(135deg, rgba(79,110,247,0.1), rgba(124,58,237,0.1))',
      border: '1px solid rgba(79,110,247,0.25)',
    },
    bordered: {
      background: 'var(--surface)',
      border: '1px solid rgba(79,110,247,0.4)',
    },
  }

  return (
    <div
      onClick={onClick}
      style={{
        ...base,
        ...variants[variant],
        ...(glow ? { boxShadow: '0 0 40px rgba(79,110,247,0.15)' } : {}),
        ...style,
      }}
      onMouseEnter={e => {
        if (!hover) return
        const el = e.currentTarget
        el.style.transform = 'translateY(-4px)'
        el.style.borderColor = 'rgba(79,110,247,0.4)'
        el.style.boxShadow = '0 20px 50px rgba(0,0,0,0.25)'
      }}
      onMouseLeave={e => {
        if (!hover) return
        const el = e.currentTarget
        el.style.transform = ''
        el.style.borderColor = ''
        el.style.boxShadow = glow ? '0 0 40px rgba(79,110,247,0.15)' : ''
      }}
    >
      {children}
    </div>
  )
}
