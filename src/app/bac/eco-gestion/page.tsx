'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  Programme officiel CNP Tunisie — 4ème Économie & Gestion
//  Mathématiques : coefficient 3
// ═══════════════════════════════════════════════════════════════

const COLOR = '#10b981'   // vert émeraude Éco-Gestion

const TOME1 = [
  { ch:'CH 01', slug:'logique-raisonnement',    titre:'Logique & Raisonnement',       badge:'Logique',       nbThm:10, nbEx:8,  desc:'Propositions, connecteurs logiques, tables de vérité, implication, équivalence, modes de raisonnement (direct, contraposé, absurde, récurrence).' },
  { ch:'CH 02', slug:'limites-continuite',       titre:'Continuité & Limites',         badge:'Analyse',       nbThm:13, nbEx:10, desc:'Limites finies/infinies, théorème des gendarmes, TVI, asymptotes, prolongement par continuité.' },
  { ch:'CH 03', slug:'suites-numeriques',        titre:'Suites Numériques',            badge:'Analyse',       nbThm:11, nbEx:9,  desc:'Suites arithmétiques, géométriques, convergence, monotone bornée, suites récurrentes, limite.' },
  { ch:'CH 04', slug:'derivabilite',             titre:'Dérivabilité & Applications',  badge:'Analyse',       nbThm:12, nbEx:10, desc:'Dérivées usuelles, règles de dérivation, Rolle, TAF, extrema, convexité, tableau de variation complet.' },
  { ch:'CH 05', slug:'primitives-integrales',    titre:'Primitives & Intégrales',      badge:'Analyse',       nbThm:10, nbEx:9,  desc:'Table des primitives, formes composées, intégration par parties, théorème fondamental, calcul d\'aires.' },
  { ch:'CH 06', slug:'logarithme',               titre:'Logarithme Népérien',          badge:'Analyse',       nbThm:9,  nbEx:7,  desc:'Définition intégrale, propriétés algébriques, dérivées, limites, inégalité de convexité.' },
  { ch:'CH 07', slug:'exponentielle',            titre:'Fonction Exponentielle',       badge:'Analyse',       nbThm:9,  nbEx:7,  desc:'Réciproque de ln, propriétés, dérivées, limites, croissance comparée, base quelconque.' },
]

const TOME2 = [
  { ch:'CH 01', slug:'probabilites',             titre:'Probabilités',                 badge:'Probabilités',  nbThm:11, nbEx:9,  desc:'Probabilités conditionnelles, formule des probabilités totales, Bayes, indépendance, loi binomiale.' },
  { ch:'CH 02', slug:'statistiques',             titre:'Statistiques',                 badge:'Statistiques',  nbThm:8,  nbEx:7,  desc:'Série à deux variables, covariance, corrélation, droite de régression, ajustement affine.' },
  { ch:'CH 03', slug:'matrices',                 titre:'Matrices & Systèmes',          badge:'Algèbre',       nbThm:12, nbEx:10, desc:'Opérations matricielles, déterminant, matrice inverse, systèmes linéaires, méthode de Gauss-Jordan.' },
  { ch:'CH 04', slug:'arithmetique',             titre:'Arithmétique',                 badge:'Algèbre',       nbThm:10, nbEx:8,  desc:'Divisibilité, algorithme d\'Euclide, théorème de Bézout, Gauss, congruences modulo n, applications.' },
  { ch:'CH 05', slug:'mathematiques-financieres',titre:'Mathématiques Financières',    badge:'Finances',      nbThm:9,  nbEx:10, desc:'Intérêts simples et composés, valeur actuelle, annuités, emprunts indivis, amortissement linéaire/dégressif.' },
]

const badgeColors: Record<string, { bg: string; color: string }> = {
  'Analyse':      { bg: 'rgba(79,110,247,0.15)',  color: '#4f6ef7' },
  'Algèbre':      { bg: 'rgba(124,58,237,0.15)',  color: '#a78bfa' },
  'Probabilités': { bg: 'rgba(245,200,66,0.15)',  color: '#f5c842' },
  'Statistiques': { bg: 'rgba(249,115,22,0.15)',  color: '#f97316' },
  'Logique':      { bg: 'rgba(6,214,160,0.15)',   color: '#06d6a0' },
  'Finances':     { bg: 'rgba(16,185,129,0.15)',  color: '#10b981' },
}

function ChapterCard({ ch, href }: { ch: typeof TOME1[0]; href: string }) {
  const bc = badgeColors[ch.badge] || badgeColors['Analyse']
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 22, height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(16,185,129,0.15)' }}
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
            <div style={{ height: '100%', width: '0%', background: `linear-gradient(90deg,${COLOR},#34d399)`, borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>0 / {ch.nbEx} exercices</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['Th', 'Déf', 'Form'].map(l => (
              <span key={l} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8,
                background: l==='Th' ? 'rgba(124,58,237,0.15)' : l==='Déf' ? 'rgba(79,110,247,0.15)' : 'rgba(16,185,129,0.15)',
                color:      l==='Th' ? '#a78bfa'               : l==='Déf' ? '#4f6ef7'               : '#10b981' }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: COLOR, fontWeight: 600 }}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

export default function EcoGestionPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Économie & Gestion</span>
        </div>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* HEADER */}
          <div style={{ marginBottom: 48 }}>
            <span style={{ background: 'rgba(16,185,129,0.15)', color: COLOR, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12, display: 'inline-block' }}>Coefficient 3</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 12 }}>Économie & Gestion</h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', marginBottom: 20 }}>
              Programme officiel CNP Tunisie — 4ème année secondaire. 12 chapitres répartis en 2 tomes.
              Tous les théorèmes, définitions, formules et exercices type Bac.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>💹 12 chapitres</span><span>·</span>
              <span>📖 2 tomes</span><span>·</span>
              <span>📊 104+ théorèmes</span><span>·</span>
              <span>📝 84+ exercices</span>
            </div>
          </div>

          {/* TOME I — Analyse */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ background: 'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,154,114,0.05))', border: `1px solid rgba(16,185,129,0.25)`, borderRadius: 16, padding: '20px 28px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 24, marginBottom: 4 }}>📗 Tome I — Analyse</h2>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Logique · Limites · Suites · Dérivabilité · Primitives · Logarithme · Exponentielle</p>
              </div>
              <span style={{ background: 'rgba(16,185,129,0.15)', color: COLOR, padding: '6px 14px', borderRadius: 20, fontSize: 13, fontFamily: 'var(--font-mono)' }}>7 chapitres</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {TOME1.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/eco-gestion/${ch.slug}`} />)}
            </div>
          </div>

          {/* TOME II — Algèbre, Probabilités & Finances */}
          <div style={{ marginBottom: 60 }}>
            <div style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.1),rgba(79,110,247,0.05))', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 16, padding: '20px 28px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 24, marginBottom: 4 }}>📘 Tome II — Algèbre, Probabilités & Finances</h2>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Probabilités · Statistiques · Matrices · Arithmétique · Mathématiques Financières ★</p>
              </div>
              <span style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontFamily: 'var(--font-mono)' }}>5 chapitres</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {TOME2.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/eco-gestion/${ch.slug}`} />)}
            </div>
          </div>

          {/* Note spécifique */}
          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: '14px 20px', marginBottom: 40, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18 }}>★</span>
            <div>
              <strong style={{ color: COLOR, fontSize: 13 }}>Spécificité Économie & Gestion</strong>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
                Le chapitre <em>Mathématiques Financières</em> est exclusif à cette section : intérêts simples/composés, valeur actuelle/acquise, annuités constantes, emprunts indivis et tableau d'amortissement — directement liés aux applications économiques.
              </p>
            </div>
          </div>

          {/* Navigation inter-sections */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
            {[
              { href:'/bac/maths',         icon:'🧮', titre:'Section Mathématiques',     desc:'9 chapitres — Analyse · Algèbre · Isométries' },
              { href:'/bac/sciences-exp',  icon:'🔬', titre:'Sciences Expérimentales',   desc:'14 chapitres — Analyse · Complexes · Probabilités' },
              { href:'/bac/sciences-tech', icon:'⚙️', titre:'Sciences Techniques',       desc:'13 chapitres — Analyse · Arithmétique · Géométrie' },
              { href:'/bac/informatique',  icon:'💻', titre:'Sciences Informatiques',    desc:'18 chapitres — Algo · BD · Web · STI' },
            ].map(s => (
              <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 20, display: 'flex', gap: 12, alignItems: 'center', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: 26 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{s.titre}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:640px){
          div[style*="grid-template-columns: repeat(auto-fill,minmax(300px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
