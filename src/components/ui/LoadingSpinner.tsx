interface SpinnerProps { size?: number; color?: string; label?: string }

export default function LoadingSpinner({ size = 32, color = 'var(--accent)', label }: SpinnerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        border: `${Math.max(2, size / 12)}px solid rgba(79,110,247,0.15)`,
        borderTopColor: color,
        animation: 'spin 0.7s linear infinite',
      }} />
      {label && <span style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</span>}
    </div>
  )
}

export function LoadingPage({ label = 'Chargement...' }: { label?: string }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingSpinner size={48} label={label} />
    </div>
  )
}

export function LoadingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 1.2s ease infinite', animationDelay: `${i * 0.2}s`, display: 'inline-block' }} />
      ))}
    </span>
  )
}
