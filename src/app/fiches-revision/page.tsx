'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function FichesRevisionPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80, minHeight: '100vh' }}>
        <div className="container" style={{ paddingTop: 64, paddingBottom: 80, maxWidth: 900 }}>

          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
              📚 Fiches de révision
            </span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,50px)', marginBottom: 16, lineHeight: 1.15 }}>
              Choisis ton{' '}
              <span style={{ background: 'linear-gradient(90deg,#4f6ef7,#06d6a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                programme
              </span>
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Des fiches de cours, quiz et flashcards par chapitre, conformes au programme officiel.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            <Link
              href="/fiches-revision/tunisie"
              style={{ padding: '44px 32px', background: 'rgba(79,110,247,0.06)', border: '1.5px solid rgba(79,110,247,0.22)', borderRadius: 22, textAlign: 'left', transition: 'all 0.22s', textDecoration: 'none', display: 'block' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(79,110,247,0.55)'; e.currentTarget.style.background = 'rgba(79,110,247,0.11)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(79,110,247,0.22)'; e.currentTarget.style.background = 'rgba(79,110,247,0.06)' }}
            >
              <div style={{ fontSize: 52, marginBottom: 14 }}>🇹🇳</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>Bac Tunisie</h2>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: 0 }}>
                Chimie, Anglais, Économie disponibles — d'autres matières arrivent bientôt.
              </p>
            </Link>

            <Link
              href="/fiches-revision/france"
              style={{ padding: '44px 32px', background: 'rgba(255,255,255,0.03)', border: '1.5px solid var(--border)', borderRadius: 22, textAlign: 'left', transition: 'all 0.22s', textDecoration: 'none', display: 'block' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <div style={{ fontSize: 52, marginBottom: 14 }}>🇫🇷</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>Bac France</h2>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: 0 }}>
                Bientôt disponible.
              </p>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}