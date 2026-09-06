'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function FichesFrancePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80, minHeight: '100vh' }}>
        <div className="container" style={{ paddingTop: 100, paddingBottom: 100, maxWidth: 700, textAlign: 'center' }}>
          <div style={{ fontSize: 60, marginBottom: 20 }}>🇫🇷</div>
          <h1 style={{ fontSize: 'clamp(24px,3.5vw,38px)', marginBottom: 16 }}>Fiches Bac France — bientôt disponibles</h1>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            On y travaille. En attendant, les fiches du Bac Tunisie sont déjà en ligne.
          </p>
          <Link href="/fiches-revision/tunisie" className="btn btn-primary">
            Voir les fiches Bac Tunisie
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}