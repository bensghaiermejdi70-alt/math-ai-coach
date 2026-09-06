'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { FICHES_TUNISIE } from '@/lib/fiches-data'

export default function FichesTunisiePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80, minHeight: '100vh' }}>
        <div className="container" style={{ paddingTop: 64, paddingBottom: 80, maxWidth: 1000 }}>

          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
              🇹🇳 Fiches de révision — Bac Tunisie
            </span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,50px)', marginBottom: 16, lineHeight: 1.15 }}>
              Choisis ta{' '}
              <span style={{ background: 'linear-gradient(90deg,#4f6ef7,#06d6a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                matière
              </span>
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Cours complets, quiz et flashcards par chapitre.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 20 }}>
            {FICHES_TUNISIE.map(m => {
              const card = (
                <div
                  style={{
                    padding: '32px 24px',
                    background: m.disponible ? 'rgba(79,110,247,0.06)' : 'rgba(255,255,255,0.02)',
                    border: '1.5px solid ' + (m.disponible ? 'rgba(79,110,247,0.22)' : 'var(--border)'),
                    borderRadius: 20,
                    textAlign: 'left',
                    transition: 'all 0.22s',
                    height: '100%',
                    opacity: m.disponible ? 1 : 0.6,
                  }}
                  onMouseEnter={e => { if (m.disponible) { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(79,110,247,0.55)'; e.currentTarget.style.background = 'rgba(79,110,247,0.11)' } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = m.disponible ? 'rgba(79,110,247,0.22)' : 'var(--border)'; e.currentTarget.style.background = m.disponible ? 'rgba(79,110,247,0.06)' : 'rgba(255,255,255,0.02)' }}
                >
                  <div style={{ fontSize: 42, marginBottom: 12 }}>{m.icone}</div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, color: 'var(--text)' }}>{m.nom}</h2>
                  {m.disponible ? (
                    <p style={{ fontSize: 12.5, color: 'var(--text2)', margin: 0 }}>{m.chapitres.length} chapitres</p>
                  ) : (
                    <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: 0 }}>Bientôt disponible</p>
                  )}
                </div>
              )
              return m.disponible ? (
                <Link key={m.slug} href={`/fiches-revision/tunisie/${m.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  {card}
                </Link>
              ) : (
                <div key={m.slug} style={{ cursor: 'not-allowed' }}>{card}</div>
              )
            })}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}