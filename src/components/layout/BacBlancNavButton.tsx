'use client'
import Link from 'next/link'

// ── Bouton Bac Blanc pour la Navbar ──────────────────────────────
// Ajouter dans votre Navbar à côté des boutons Examens / Simulation IA / Chat
// Ce bouton est DISTINCTIF avec un style doré concours national

export function BacBlancNavButton() {
  const today = new Date()
  const isMay = today.getMonth() === 4 // 0-indexed, 4 = mai
  const day = today.getDate()

  return (
    <Link href="/bac-blanc"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '8px 16px',
        borderRadius: 50,
        // Gradient doré distinctif — différent des autres boutons
        background: isMay
          ? 'linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)'
          : 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(251,191,36,0.1))',
        border: '1px solid rgba(245,158,11,0.6)',
        color: isMay ? '#0a0a1a' : '#fbbf24',
        fontSize: 13,
        fontWeight: 700,
        textDecoration: 'none',
        letterSpacing: '0.03em',
        boxShadow: isMay
          ? '0 2px 12px rgba(245,158,11,0.4), 0 0 24px rgba(245,158,11,0.15)'
          : '0 2px 8px rgba(245,158,11,0.15)',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
        // Effet pulse léger pendant mai
        animation: isMay ? 'pulse-gold 2s ease-in-out infinite' : 'none',
      }}
    >
      {/* Effet brillance */}
      {isMay && (
        <span style={{
          position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          animation: 'shimmer 2.5s ease-in-out infinite',
        }}/>
      )}
      <span style={{ fontSize: 15, zIndex: 1 }}>🏆</span>
      <span style={{ zIndex: 1 }}>Bac Blanc{isMay ? ` — Jour ${day}` : ''}</span>
      {isMay && (
        <span style={{
          background: '#0a0a1a', color: '#fbbf24', fontSize: 10,
          fontWeight: 800, padding: '2px 6px', borderRadius: 50,
          zIndex: 1, letterSpacing: '0.05em',
        }}>
          LIVE
        </span>
      )}

      <style>{`
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 2px 12px rgba(245,158,11,0.4), 0 0 24px rgba(245,158,11,0.15); }
          50% { box-shadow: 0 2px 20px rgba(245,158,11,0.7), 0 0 40px rgba(245,158,11,0.3); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </Link>
  )
}
