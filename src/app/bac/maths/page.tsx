'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  Programme officiel CNP Tunisie — Section Mathématiques
//  4ème année secondaire · Coefficient 4
//  Mis à jour selon programme officiel CNP
// ═══════════════════════════════════════════════════════════════

const COLOR = '#4f6ef7'

const PARTIE1_ALGEBRE = [
  {
    ch: 'CH 01', slug: 'second-degre', titre: 'Problèmes du second degré',
    badge: 'Algèbre', nbThm: 12, nbEx: 10,
    desc: 'Trinôme ax²+bx+c, discriminant, signe d\'un trinôme, équations et inéquations du 2nd degré, systèmes linéaires (méthode du pivot de Gauss).'
  },
  {
    ch: 'CH 02', slug: 'complexes', titre: 'Nombres Complexes',
    badge: 'Algèbre', nbThm: 14, nbEx: 10,
    desc: 'Opérations algébriques, module |z|, argument arg(z), forme trigonométrique, équations à coefficients complexes.'
  },
  {
    ch: 'CH 03', slug: 'matrices-systemes', titre: 'Systèmes Linéaires & Matrices',
    badge: 'Algèbre', nbThm: 11, nbEx: 9,
    desc: 'Matrices (n×p) avec n,p≤3, opérations, déterminant d\'ordre 2 et 3, inverse A⁻¹, résolution de systèmes linéaires.'
  },
]

const PARTIE2_ANALYSE = [
  {
    ch: 'CH 04', slug: 'suites', titre: 'Suites Numériques',
    badge: 'Analyse', nbThm: 13, nbEx: 10,
    desc: 'Suites arithmétiques (u_{n+1}=u_n+r), géométriques (u_{n+1}=q·u_n), récurrentes (u_{n+1}=au_n+b), homographiques, limite, principe de récurrence, majorant/minorant.'
  },
  {
    ch: 'CH 05', slug: 'limites-continuite', titre: 'Limites et Continuité',
    badge: 'Analyse', nbThm: 14, nbEx: 11,
    desc: 'Limite d\'une fonction en un point et à l\'infini, continuité, TVI (f(x)=k), dichotomie, asymptotes verticales/horizontales/obliques.'
  },
  {
    ch: 'CH 06', slug: 'derivation', titre: 'Dérivation',
    badge: 'Analyse', nbThm: 12, nbEx: 10,
    desc: 'Nombre dérivé, taux d\'accroissement, dérivées usuelles (xⁿ, √x, 1/x, sin, cos, eˣ, ln x), tangente, approximation affine f(x)≈f(a)+f\'(a)(x-a), opérations.'
  },
  {
    ch: 'CH 07', slug: 'etude-fonctions', titre: 'Étude de Fonctions',
    badge: 'Analyse', nbThm: 11, nbEx: 10,
    desc: 'Variations et signe de f\'(x), extrema locaux/globaux, polynômes (deg 1,2,3, bicarrées), rationnelles, irrationnelles √f(x), circulaires sin/cos, exponentielle eˣ et logarithme ln x, représentation graphique, asymptotes, position relative.'
  },
]

const PARTIE3_GEOMETRIE = [
  {
    ch: 'CH 08', slug: 'geometrie-plane', titre: 'Géométrie Plane',
    badge: 'Géométrie', nbThm: 9, nbEx: 7,
    desc: 'Vecteurs du plan (colinéarité, bases, repères), droites (équations cartésiennes et réduites), cercles (équation, tangente).'
  },
  {
    ch: 'CH 09', slug: 'geometrie-espace', titre: 'Géométrie dans l\'Espace',
    badge: 'Géométrie', nbThm: 10, nbEx: 8,
    desc: 'Vecteurs de l\'espace, bases et repères orthonormés, droites et plans (équations paramétriques et cartésiennes), positions relatives droite-droite, droite-plan, plan-plan, produit scalaire dans l\'espace, distance point-plan et point-droite.'
  },
]

const PARTIE4_GRAPHES = [
  {
    ch: 'CH 10', slug: 'graphes', titre: 'Graphes et Algorithmique',
    badge: 'Info', nbThm: 8, nbEx: 6,
    desc: 'Définitions (sommets, arêtes, ordre, degré), théorème d\'Euler, chaînes eulériennes, chemin et distance, algorithme de Dijkstra, matrice associée, graphe orienté (boucle, circuit), graphe probabiliste et matrice de transition.'
  },
]

const badgeColors: Record<string, { bg: string; color: string }> = {
  'Analyse':   { bg: 'rgba(79,110,247,0.15)',  color: '#4f6ef7' },
  'Algèbre':   { bg: 'rgba(124,58,237,0.15)',  color: '#a78bfa' },
  'Géométrie': { bg: 'rgba(6,214,160,0.15)',   color: '#06d6a0' },
  'Info':      { bg: 'rgba(245,200,66,0.15)',  color: '#f5c842' },
}

function ChapterCard({ ch, href }: { ch: typeof PARTIE1_ALGEBRE[0]; href: string }) {
  const bc = badgeColors[ch.badge] || badgeColors['Analyse']
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 22, height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 32px ${COLOR}22` }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 6 }}>{ch.ch}</span>
            <span style={{ fontSize: 11, background: bc.bg, color: bc.color, padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>{ch.badge}</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.nbThm} théorèmes</span>
        </div>
        <h3 style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 8 }}>{ch.titre}</h3>
        <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 14 }}>{ch.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>📝 {ch.nbEx} exercices</span>
          <span style={{ fontSize: 12, color: COLOR, fontWeight: 600 }}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

function TomeHeader({ titre, desc, color, count }: { titre: string; desc: string; color: string; count: number }) {
  return (
    <div style={{ background: `linear-gradient(135deg,${color}12,${color}04)`, border: `1px solid ${color}28`, borderRadius: 16, padding: '18px 26px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
      <div>
        <h2 style={{ fontSize: 22, marginBottom: 3 }}>{titre}</h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>{desc}</p>
      </div>
      <span style={{ background: `${color}20`, color, padding: '5px 13px', borderRadius: 20, fontSize: 12, fontFamily: 'var(--font-mono)' }}>{count} ch.</span>
    </div>
  )
}

export default function MathsSectionPage() {
  const totalCh = PARTIE1_ALGEBRE.length + PARTIE2_ANALYSE.length + PARTIE3_GEOMETRIE.length + PARTIE4_GRAPHES.length
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link><span>›</span>
          <span style={{ color: 'var(--text)' }}>Section Mathématiques</span>
        </div>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          <div style={{ marginBottom: 44 }}>
            <span style={{ background: 'rgba(79,110,247,0.15)', color: COLOR, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12, display: 'inline-block' }}>Coefficient 4</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 10 }}>Section Mathématiques</h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', marginBottom: 16 }}>
              Programme officiel CNP Tunisie — 4ème année secondaire. {totalCh} chapitres répartis en 4 parties :
              Algèbre · Analyse · Géométrie · Graphes & Algorithmique.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📐 {totalCh} chapitres</span><span>·</span>
              <span>📊 110+ théorèmes</span><span>·</span>
              <span>📝 90+ exercices</span>
            </div>
          </div>

          {/* Partie 1 — Algèbre */}
          <div style={{ marginBottom: 44 }}>
            <TomeHeader titre="🔢 Partie 1 — Algèbre" desc="Second degré · Nombres complexes · Systèmes linéaires & Matrices" color="#a78bfa" count={PARTIE1_ALGEBRE.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE1_ALGEBRE.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/maths/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 2 — Analyse */}
          <div style={{ marginBottom: 44 }}>
            <TomeHeader titre="📈 Partie 2 — Analyse" desc="Suites · Limites & Continuité · Dérivation · Étude de fonctions (ln, exp, trig)" color={COLOR} count={PARTIE2_ANALYSE.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE2_ANALYSE.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/maths/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 3 — Géométrie */}
          <div style={{ marginBottom: 44 }}>
            <TomeHeader titre="📐 Partie 3 — Géométrie" desc="Géométrie plane (vecteurs, droites, cercles) · Géométrie dans l'espace (plans, produit scalaire, distances)" color="#06d6a0" count={PARTIE3_GEOMETRIE.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE3_GEOMETRIE.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/maths/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 4 — Graphes */}
          <div style={{ marginBottom: 52 }}>
            <TomeHeader titre="🕸️ Partie 4 — Graphes & Algorithmique" desc="Graphes (Euler, Dijkstra) · Graphes probabilistes · Matrice de transition" color="#f5c842" count={PARTIE4_GRAPHES.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE4_GRAPHES.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/maths/${ch.slug}`} />)}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
            {[
              { href:'/bac/sciences-exp',  icon:'🔬', titre:'Sc. Expérimentales', desc:'8 chapitres · Coeff 3' },
              { href:'/bac/sciences-tech', icon:'⚙️', titre:'Sc. Techniques',     desc:'12 chapitres · Coeff 3' },
              { href:'/bac/eco-gestion',   icon:'💹', titre:'Éco-Gestion',        desc:'11 chapitres · Coeff 2' },
              { href:'/bac/informatique',  icon:'💻', titre:'Informatique',       desc:'10 chapitres · Coeff 3' },
            ].map(s => (
              <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 18, display: 'flex', gap: 12, alignItems: 'center', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: 24 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{s.titre}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}