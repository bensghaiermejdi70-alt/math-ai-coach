'use client'
import { useRouter } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════
// COMPOSANT SolveButton — À importer dans toutes les pages chapitres
// Envoie l'exercice directement dans le Solveur IA
//
// Usage :
//   import SolveButton from '@/components/SolveButton'
//   <SolveButton exercice="Soit f(x) = x² - 3x + 2. Étudier les variations de f." />
// ══════════════════════════════════════════════════════════════════

interface SolveButtonProps {
  exercice: string
  label?: string
  style?: React.CSSProperties
}

export default function SolveButton({ exercice, label = '🔍 Résoudre avec IA', style }: SolveButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    // Encoder l'exercice dans l'URL ?q=
    const encoded = encodeURIComponent(exercice)
    router.push(`/solve?q=${encoded}`)
  }

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 18px',
        background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)',
        color: 'white',
        border: 'none',
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        transition: 'opacity 0.2s',
        boxShadow: '0 4px 14px rgba(79,110,247,0.35)',
        ...style,
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      {label}
    </button>
  )
}