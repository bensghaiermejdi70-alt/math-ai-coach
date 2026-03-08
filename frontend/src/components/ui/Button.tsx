import { ReactNode, CSSProperties } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'teal' | 'gold' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  style?: CSSProperties
  onClick?: () => void
  type?: 'button' | 'submit'
  href?: string
}

const variants: Record<Variant, CSSProperties> = {
  primary:   { background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)', color: 'white', border: 'none', boxShadow: '0 0 30px rgba(79,110,247,0.35)' },
  secondary: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text)' },
  ghost:     { background: 'transparent', border: '1px solid rgba(79,110,247,0.2)', color: 'var(--text2)' },
  teal:      { background: 'linear-gradient(135deg,#06d6a0,#059669)', color: '#07080f', border: 'none' },
  gold:      { background: 'linear-gradient(135deg,#f5c842,#f97316)', color: '#07080f', border: 'none' },
  danger:    { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' },
}

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: '7px 14px', fontSize: 13, borderRadius: 8 },
  md: { padding: '10px 22px', fontSize: 14, borderRadius: 10 },
  lg: { padding: '14px 32px', fontSize: 16, borderRadius: 12 },
}

export default function Button({ children, variant = 'primary', size = 'md', disabled, loading, fullWidth, style, onClick, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: 'var(--font-body)', fontWeight: 600, cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.25s', letterSpacing: '0.01em', textDecoration: 'none',
        width: fullWidth ? '100%' : undefined,
        opacity: disabled || loading ? 0.5 : 1,
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
      onMouseEnter={e => {
        if (disabled || loading) return
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.opacity = '0.9'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.opacity = disabled || loading ? '0.5' : '1'
      }}
    >
      {loading ? (
        <><span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />Chargement...</>
      ) : children}
    </button>
  )
}