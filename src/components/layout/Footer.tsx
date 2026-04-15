'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(79,110,247,0.12)',
        padding: '40px clamp(20px,5vw,60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
      }}
    >
      {/* LOGO / NOM */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        MathBac.<span style={{ color: 'var(--accent)' }}>AI</span>

        <div
          style={{
            fontSize: 11,
            color: 'var(--muted)',
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            marginTop: 2,
          }}
        >
          Tunisie 🇹🇳 • France 🇫🇷
        </div>
      </div>

      {/* LIENS */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[
          { href: '/bac', l: 'Programme Bac' },
          { href: '/examens', l: 'Examens' },
          { href: '/chat', l: 'Chat IA' },
          { href: '/#contact', l: 'Contact' },
        ].map(({ href, l }) => (
          <Link
            key={href}
            href={href}
            style={{
              color: 'var(--muted)',
              textDecoration: 'none',
              fontSize: 13,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'var(--text)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'var(--muted)')
            }
          >
            {l}
          </Link>
        ))}
      </div>

      {/* COPYRIGHT */}
      <div style={{ color: 'var(--muted)', fontSize: 12 }}>
        © 2026 MathBac.AI
      </div>
    </footer>
  )
}