'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const TOME1 = [
  { ch:'CH 01', slug:'limites-continuite',       titre:'Continuité et Limites',     badge:'Analyse',   nbThm:14, nbEx:12, desc:'Limites finies/infinies, théorème des gendarmes, TVI, asymptotes, branches infinies, prolongement par continuité.' },
  { ch:'CH 02', slug:'suites',                   titre:'Suites Réelles',            badge:'Analyse',   nbThm:12, nbEx:9,  desc:'Suites arithmétiques/géométriques, convergence, monotone bornée, suites adjacentes, récurrentes.' },
  { ch:'CH 03', slug:'derivabilite',             titre:'Dérivabilité',              badge:'Analyse',   nbThm:11, nbEx:9,  desc:'Dérivées usuelles, règles, Rolle, TAF, L\'Hôpital, convexité, étude complète de fonctions.' },
  { ch:'CH 04', slug:'fonctions-reciproques',    titre:'Fonctions Réciproques',     badge:'Analyse',   nbThm:10, nbEx:7,  desc:'Bijections, réciproque, arcsin, arccos, arctan, dérivées et valeurs remarquables.' },
  { ch:'CH 05', slug:'logarithme',               titre:'Logarithme Népérien',       badge:'Analyse',   nbThm:9,  nbEx:7,  desc:'Définition intégrale, propriétés algébriques, dérivées composées, limites, inégalités.' },
  { ch:'CH 06', slug:'exponentielle',            titre:'Fonction Exponentielle',    badge:'Analyse',   nbThm:9,  nbEx:7,  desc:'Réciproque de ln, propriétés, dérivées, limites, inégalité de convexité, base quelconque.' },
  { ch:'CH 07', slug:'primitives',               titre:'Primitives',                badge:'Analyse',   nbThm:8,  nbEx:7,  desc:'Table des primitives, formes composées u\'f(u), intégration par parties (IPP).' },
  { ch:'CH 08', slug:'integrales',               titre:'Calcul Intégral',           badge:'Analyse',   nbThm:9,  nbEx:8,  desc:'Théorème fondamental, Chasles, valeur moyenne, calcul d\'aires et volumes de révolution.' },
]

const TOME2 = [
  { ch:'CH 01', slug:'complexes',            titre:'Nombres Complexes',         badge:'Algèbre',      nbThm:12, nbEx:9,  desc:'Forme algébrique, module, argument, Euler, De Moivre, racines n-ièmes, transformations du plan.' },
  { ch:'CH 02', slug:'geometrie-espace',     titre:'Géométrie dans l\'Espace',  badge:'Géométrie',    nbThm:10, nbEx:7,  desc:'Produit scalaire, vectoriel, plans, droites, distances, sphère dans l\'espace.' },
  { ch:'CH 03', slug:'arithmetique',         titre:'Arithmétique',              badge:'Algèbre',      nbThm:10, nbEx:7,  desc:'Divisibilité, algorithme d\'Euclide, Bézout, Gauss, congruences, applications.' },
  { ch:'CH 04', slug:'probabilites',         titre:'Probabilités',              badge:'Probabilités', nbThm:7,  nbEx:6,  desc:'Probabilités conditionnelles, formule des probabilités totales, Bayes, indépendance.' },
  { ch:'CH 05', slug:'statistiques',         titre:'Statistiques',              badge:'Statistiques', nbThm:6,  nbEx:5,  desc:'Série à deux variables, covariance, corrélation, droite de régression, quartiles.' },
]

const badgeColors: Record<string, { bg: string; color: string }> = {
  'Analyse':      { bg: 'rgba(79,110,247,0.15)',  color: '#4f6ef7' },
  'Algèbre':      { bg: 'rgba(124,58,237,0.15)',  color: '#a78bfa' },
  'Géométrie':    { bg: 'rgba(6,214,160,0.15)',   color: '#06d6a0' },
  'Probabilités': { bg: 'rgba(245,200,66,0.15)',  color: '#f5c842' },
  'Statistiques': { bg: 'rgba(249,115,22,0.15)',  color: '#f97316' },
}

function ChapterCard({ ch, href }: { ch: typeof TOME1[0]; href: string }) {
  const bc = badgeColors[ch.badge] || badgeColors['Analyse']
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 22, height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,110,247,0.15)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 6 }}>{ch.ch}</span>
            <span style={{ fontSize: 11, background: bc.bg, color: bc.color, padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>{ch.badge}</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.nbThm} théorèmes</span>
        </div>
        <h3 style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{ch.titre}</h3>
        <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 16 }}>{ch.desc}</p>
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginBottom: 5 }}>
            <span>Progression</span><span>0%</span>
          </div>
          <div style={{ height: 4, background: 'var(--surface2)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg,#f97316,#f5c842)', borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>0 / {ch.nbEx} exercices</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['Th', 'Déf', 'Prop'].map(l => (
              <span key={l} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8,
                background: l==='Th' ? 'rgba(124,58,237,0.15)' : l==='Déf' ? 'rgba(79,110,247,0.15)' : 'rgba(6,214,160,0.15)',
                color:      l==='Th' ? '#a78bfa'               : l==='Déf' ? '#4f6ef7'               : '#06d6a0' }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#f97316', fontWeight: 600 }}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

export default function SciencesTechPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Sciences Techniques</span>
        </div>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* HEADER */}
          <div style={{ marginBottom: 48 }}>
            <span style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12, display: 'inline-block' }}>Coefficient 3</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 12 }}>Sciences Techniques</h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', marginBottom: 20 }}>
              Programme officiel CNP Tunisie — 4ème année secondaire. 13 chapitres répartis en 2 tomes.
              Tous les théorèmes, définitions, formules et exercices type Bac.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>⚙️ 13 chapitres</span><span>·</span>
              <span>📖 2 tomes</span><span>·</span>
              <span>📊 107+ théorèmes</span><span>·</span>
              <span>📝 93+ exercices</span>
            </div>
          </div>

          {/* TOME I */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.12),rgba(245,200,66,0.06))', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 16, padding: '20px 28px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 24, marginBottom: 4 }}>📗 Tome I — Analyse</h2>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Continuité · Suites · Dérivabilité · Fonctions réciproques · Ln · Exp · Primitives · Intégrales</p>
              </div>
              <span style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontFamily: 'var(--font-mono)' }}>8 chapitres</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {TOME1.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/sciences-tech/${ch.slug}`} />)}
            </div>
          </div>

          {/* TOME II */}
          <div style={{ marginBottom: 60 }}>
            <div style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.1),rgba(79,110,247,0.05))', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 16, padding: '20px 28px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 24, marginBottom: 4 }}>📘 Tome II — Algèbre & Probabilités</h2>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Nombres Complexes · Géométrie Espace · Arithmétique · Probabilités · Statistiques</p>
              </div>
              <span style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontFamily: 'var(--font-mono)' }}>5 chapitres</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {TOME2.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/sciences-tech/${ch.slug}`} />)}
            </div>
          </div>

          {/* Navigation inter-sections */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Link href="/bac/maths" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'center', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: 28 }}>🧮</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Section Mathématiques</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Voir le programme Maths — 9 chapitres (2 tomes)</div>
                </div>
              </div>
            </Link>
            <Link href="/bac/sciences-exp" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'center', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: 28 }}>🔬</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Sciences Expérimentales</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Voir le programme Sc.Exp — 14 chapitres (2 tomes)</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
