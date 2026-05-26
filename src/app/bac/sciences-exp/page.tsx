'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  Programme officiel CNP Tunisie — Sciences Expérimentales
//  4ème année secondaire · Mathématiques Coefficient 3
//  Mis à jour selon programme officiel CNP
// ═══════════════════════════════════════════════════════════════

const COLOR = '#06d6a0'

// PARTIE 1 — ANALYSE (5 chapitres)
const PARTIE1 = [
  {
    ch: 'CH 01', slug: 'fonctions-generalites', titre: 'Fonctions — Généralités',
    badge: 'Analyse', nbThm: 8, nbEx: 7,
    desc: 'Ensemble de définition, parité (fonctions paires/impaires/périodiques), restriction, majorant/minorant, fonctions bornées, fonction √f (conditions d\'existence), opérations (somme, produit, quotient, composée), fonctions affines par intervalles.'
  },
  {
    ch: 'CH 02', slug: 'limites-continuite', titre: 'Limites et Continuité',
    badge: 'Analyse', nbThm: 14, nbEx: 11,
    desc: 'Limite finie en un réel a, prolongement par continuité, opérations sur les limites finies, signe de la limite, limites finies ou infinies (en un point, à l\'infini), asymptotes verticales/horizontales/obliques, branches infinies, formes indéterminées, limites des fonctions usuelles.'
  },
  {
    ch: 'CH 03', slug: 'derivation', titre: 'Dérivation',
    badge: 'Analyse', nbThm: 11, nbEx: 9,
    desc: 'Dérivabilité en un point (nombre dérivé, interprétation géométrique), approximation affine f(x)≈f(a)+f\'(a)(x−a), tangente et demi-tangente, dérivabilité des fonctions usuelles, dérivabilité sur un intervalle, opérations (somme, produit, quotient, composée), signe de f\'(x) et variations, extrema locaux.'
  },
  {
    ch: 'CH 04', slug: 'etude-fonctions', titre: 'Étude de Fonctions',
    badge: 'Analyse', nbThm: 10, nbEx: 9,
    desc: 'Fonctions polynômes (deg 1, 2, 3, bicarrées ax⁴+bx²+c), rationnelles types 1/2/3 (ax+b/cx+d, ax²+bx+c/dx+e, ax²+bx+c/dx²+ex+f), irrationnelles types 1/2 (√(ax+b), √(ax²+bx+c)), circulaires (sin(ax+b), cos(ax+b), tan x).'
  },
  {
    ch: 'CH 05', slug: 'suites', titre: 'Suites Numériques',
    badge: 'Analyse', nbThm: 12, nbEx: 10,
    desc: 'Comportement global (croissante, décroissante, majorée, minorée), suites arithmétiques (u_{n+1}=u_n+r, somme, limite), géométriques (u_{n+1}=q·u_n, somme, limite), suites du type u_n=f(n), récurrentes u_{n+1}=f(u_n) (cas affine au_n+b, cas homographique), principe de récurrence, limite d\'une suite (convergence, divergence), théorème des gendarmes.'
  },
]

// PARTIE 2 — FONCTIONS USUELLES & INTÉGRALES (5 chapitres)
const PARTIE2 = [
  {
    ch: 'CH 06', slug: 'fonctions-reciproques', titre: 'Fonctions Réciproques',
    badge: 'Analyse', nbThm: 8, nbEx: 6,
    desc: "Bijection — fonction réciproque f⁻¹. Domaine de définition. Représentation graphique (symétrie par rapport à y=x). Dérivée : (f⁻¹)'(y)=1/f'(f⁻¹(y)). Étude de fonctions réciproques.",
  },
  {
    ch: 'CH 07', slug: 'logarithme', titre: 'Logarithme Népérien',
    badge: 'Analyse', nbThm: 11, nbEx: 9,
    desc: "Fonction ln x sur ]0,+∞[. Propriétés : ln(ab)=ln a+ln b, ln(aⁿ)=n·ln a. Dérivée (ln u)'=u'/u. Variations, limites en 0⁺ et +∞. Équations et inéquations logarithmiques.",
  },
  {
    ch: 'CH 08', slug: 'exponentielle', titre: 'Fonction Exponentielle',
    badge: 'Analyse', nbThm: 10, nbEx: 9,
    desc: "Réciproque de ln. Dérivée (eᵘ)'=u'eᵘ. Propriétés : eᵃ⁺ᵇ=eᵃeᵇ, e⁻ˣ=1/eˣ. Croissances comparées. Équations exponentielles. Étude complète.",
  },
  {
    ch: 'CH 09', slug: 'primitives-integrales', titre: 'Primitives & Intégrales',
    badge: 'Analyse', nbThm: 10, nbEx: 8,
    desc: "Primitives des fonctions usuelles. Linéarité. Intégrale définie ∫ₐᵇ f(x)dx. Interprétation géométrique — aire sous une courbe. Théorème fondamental de l'analyse.",
  },
  {
    ch: 'CH 10', slug: 'equations-differentielles', titre: 'Équations Différentielles',
    badge: 'Analyse', nbThm: 7, nbEx: 6,
    desc: "Équation y'=ay+b : solution générale y=Ceᵃˣ−b/a. Condition initiale y(x₀)=y₀. Applications : loi de refroidissement, croissance, circuit RC.",
  },
]

// PARTIE 3 — ALGÈBRE (1 chapitre)
const PARTIE3 = [
  {
    ch: 'CH 11', slug: 'complexes', titre: 'Nombres Complexes',
    badge: 'Algèbre', nbThm: 13, nbEx: 10,
    desc: "Forme algébrique z=a+ib. Module |z|, argument arg(z), conjugué z̄. Forme trigonométrique r(cosθ+isinθ). Forme exponentielle reⁱᶿ. Formule de Moivre. Racines carrées dans ℂ. Résolution d'équations du 2nd degré dans ℂ.",
  },
]

// PARTIE 4 — GÉOMÉTRIE (2 chapitres)
const PARTIE4 = [
  {
    ch: 'CH 12', slug: 'vecteurs-espace', titre: "Vecteurs de l'Espace",
    badge: 'Géométrie', nbThm: 9, nbEx: 7,
    desc: "Vecteurs de l'espace, bases. Produit scalaire (orthogonalité, angles). Produit vectoriel u⃗∧v⃗ (aire, volume).",
  },
  {
    ch: 'CH 13', slug: 'droites-plans-espace', titre: "Droites & Plans dans l'Espace",
    badge: 'Géométrie', nbThm: 10, nbEx: 8,
    desc: "Droites (paramétrique, cartésienne). Plans (équation cartésienne). Positions relatives. Distances (point-plan, point-droite). Sphères.",
  },
]

// PARTIE 5 — PROBABILITÉS & STATISTIQUES (4 chapitres)
const PARTIE5 = [
  {
    ch: 'CH 14', slug: 'denombrement', titre: 'Dénombrement',
    badge: 'Probabilités', nbThm: 7, nbEx: 6,
    desc: "Arrangements Aₙᵖ=n!/(n−p)!, permutations n!, combinaisons Cₙᵖ. Formule du binôme (a+b)ⁿ=Σ Cₙᵏ aᵏ bⁿ⁻ᵏ.",
  },
  {
    ch: 'CH 15', slug: 'probabilites', titre: 'Probabilités',
    badge: 'Probabilités', nbThm: 10, nbEx: 8,
    desc: "Probabilité conditionnelle P(A|B)=P(A∩B)/P(B). Indépendance. Probabilités totales. Théorème de Bayes. Arbre pondéré.",
  },
  {
    ch: 'CH 16', slug: 'variables-aleatoires', titre: 'Variables Aléatoires & Loi Binomiale',
    badge: 'Probabilités', nbThm: 9, nbEx: 8,
    desc: "Variable aléatoire discrète. Espérance E(X)=Σxᵢpᵢ. Variance V(X)=E(X²)−[E(X)]². Loi binomiale B(n,p) : P(X=k)=Cₙᵏ pᵏ(1-p)ⁿ⁻ᵏ, E(X)=np, V(X)=np(1-p).",
  },
  {
    ch: 'CH 17', slug: 'statistiques', titre: 'Statistiques',
    badge: 'Probabilités', nbThm: 6, nbEx: 6,
    desc: "Moyenne x̄, variance s², écart-type s. Séries simples et regroupées en classes. Histogrammes, diagrammes cumulatifs, courbes statistiques.",
  },
]

const badgeColors: Record<string, { bg: string; color: string }> = {
  'Analyse':      { bg: 'rgba(6,214,160,0.15)',   color: '#06d6a0' },
  'Géométrie':    { bg: 'rgba(79,110,247,0.15)',  color: '#4f6ef7' },
  'Probabilités': { bg: 'rgba(245,200,66,0.15)',  color: '#f5c842' },
  'Algèbre':      { bg: 'rgba(124,58,237,0.15)',   color: '#a78bfa' },
}

function ChapterCard({ ch, href }: { ch: typeof PARTIE1[0]; href: string }) {
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
        <h3 style={{ fontSize: 15, fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 8 }}>{ch.titre}</h3>
        <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 14 }}>{ch.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>📝 {ch.nbEx} exercices</span>
          <span style={{ fontSize: 12, color: COLOR, fontWeight: 600 }}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

function PartieHeader({ titre, desc, color, count }: { titre: string; desc: string; color: string; count: number }) {
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

export default function SciencesExpPage() {
  const totalCh = PARTIE1.length + PARTIE2.length + PARTIE3.length + PARTIE4.length + PARTIE5.length
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link><span>›</span>
          <span style={{ color: 'var(--text)' }}>Sciences Expérimentales</span>
        </div>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          <div style={{ marginBottom: 44 }}>
            <span style={{ background: 'rgba(6,214,160,0.15)', color: COLOR, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12, display: 'inline-block' }}>Coefficient 3</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 10 }}>Sciences Expérimentales</h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', marginBottom: 16 }}>
              Programme officiel CNP Tunisie — 4ème année secondaire. {totalCh} chapitres répartis en 3 parties :
              Analyse · Fonctions usuelles · Algèbre · Géométrie · Probabilités & Statistiques.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🔬 {totalCh} chapitres</span><span>·</span>
              <span>📊 150+ théorèmes</span><span>·</span>
              <span>📝 120+ exercices</span>
            </div>
          </div>

          {/* Partie 1 — Analyse */}
          <div style={{ marginBottom: 44 }}>
            <PartieHeader titre="📈 Partie 1 — Analyse" desc="Fonctions · Limites & Continuité · Dérivation · Étude de fonctions · Suites" color={COLOR} count={PARTIE1.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE1.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/sciences-exp/${ch.slug}`} />)}
            </div>
          </div>

                    {/* Partie 2 — Fonctions usuelles */}
          <div style={{ marginBottom: 44 }}>
            <PartieHeader titre="📊 Partie 2 — Fonctions usuelles & Intégrales" desc="Fonctions réciproques · Logarithme · Exponentielle · Primitives · Éq. différentielles" color={COLOR} count={PARTIE2.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE2.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/sciences-exp/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 3 — Algèbre */}
          <div style={{ marginBottom: 44 }}>
            <PartieHeader titre="🔢 Partie 3 — Algèbre" desc="Nombres complexes (formes algébrique, trigonométrique, exponentielle · Moivre · équations dans ℂ)" color="#a78bfa" count={PARTIE3.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE3.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/sciences-exp/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 4 — Géométrie */}
          <div style={{ marginBottom: 44 }}>
            <PartieHeader titre="📐 Partie 4 — Géométrie" desc="Vecteurs de l'espace · Produit scalaire & vectoriel · Droites, plans, sphères" color="#4f6ef7" count={PARTIE4.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE4.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/sciences-exp/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 5 — Probabilités & Statistiques */}
          <div style={{ marginBottom: 52 }}>
            <PartieHeader titre="🎲 Partie 5 — Probabilités & Statistiques" desc="Dénombrement · Probabilités conditionnelles · Variables aléatoires · Loi binomiale · Statistiques" color="#f5c842" count={PARTIE5.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE5.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/sciences-exp/${ch.slug}`} />)}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
            {[
              { href:'/bac/maths',         icon:'📐', titre:'Section Maths',     desc:'10 chapitres · Coeff 4' },
              { href:'/bac/sciences-tech', icon:'⚙️', titre:'Sc. Techniques',    desc:'12 chapitres · Coeff 3' },
              { href:'/bac/eco-gestion',   icon:'💹', titre:'Éco-Gestion',       desc:'11 chapitres · Coeff 2' },
              { href:'/bac/informatique',  icon:'💻', titre:'Informatique',      desc:'10 chapitres · Coeff 3' },
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