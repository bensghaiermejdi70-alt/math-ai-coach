'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  Programme officiel CNP Tunisie — Sciences Informatiques
//  4ème année secondaire · Mathématiques Coefficient 3
//  Mis à jour selon programme officiel CNP (tadris.tn)
// ═══════════════════════════════════════════════════════════════

const COLOR = '#6366f1'

// PARTIE 1 — ANALYSE (7 chapitres)
const PARTIE1 = [
  {
    ch: 'CH 01', slug: 'fonctions-generalites', titre: 'Fonctions — Généralités',
    badge: 'Analyse', nbThm: 8, nbEx: 6,
    desc: 'Ensemble de définition (détermination, restriction), parité (fonctions paires, impaires), opérations sur les fonctions (somme, produit, quotient, composée), fonction √f (conditions d\'existence f(x)≥0).'
  },
  {
    ch: 'CH 02', slug: 'limites-continuite', titre: 'Limites et Continuité',
    badge: 'Analyse', nbThm: 13, nbEx: 10,
    desc: 'Limite finie en un point (définition, propriétés), limite infinie (en un point et à l\'infini), opérations sur les limites (somme, produit, quotient), formes indéterminées (résolution), continuité (définition, opérations), TVI (f(x)=k), asymptotes verticales/horizontales/obliques.'
  },
  {
    ch: 'CH 03', slug: 'derivation', titre: 'Dérivation',
    badge: 'Analyse', nbThm: 11, nbEx: 9,
    desc: 'Nombre dérivé (taux d\'accroissement, limite), fonction dérivée (dérivabilité sur un intervalle), dérivées usuelles (tableau complet), opérations (somme, produit, quotient, composée), tangente y=f\'(a)(x−a)+f(a), signe de la dérivée et sens de variation, extrema (maximum, minimum).'
  },
  {
    ch: 'CH 04', slug: 'etude-fonctions', titre: 'Étude de Fonctions',
    badge: 'Analyse', nbThm: 10, nbEx: 8,
    desc: 'Polynômes deg 2, deg 3, bicarrées, rationnelles (ax+b/cx+d, ax²+bx+c/dx+e), irrationnelles (√(ax+b), √(ax²+bx+c)), circulaires (sin(ax+b), cos(ax+b), tan x).'
  },
  {
    ch: 'CH 05', slug: 'logarithme', titre: 'Fonction Logarithme Népérien',
    badge: 'Analyse', nbThm: 9, nbEx: 7,
    desc: 'Définition ln x pour x>0, propriétés algébriques, dérivée (ln x)\'=1/x et (ln u)\'=u\'/u, étude complète (variations, limites, courbe représentative), fonctions du type x↦ln(u(x)) (dérivée, étude).'
  },
  {
    ch: 'CH 06', slug: 'exponentielle', titre: 'Fonction Exponentielle',
    badge: 'Analyse', nbThm: 9, nbEx: 7,
    desc: 'Définition eˣ (réciproque de ln), propriétés algébriques, dérivée (eˣ)\'=eˣ et (eᵘ)\'=u\'·eᵘ, étude complète (variations, limites, courbe représentative), fonctions du type x↦e^(u(x)) (dérivée, étude).'
  },
  {
    ch: 'CH 07', slug: 'suites', titre: 'Suites Numériques',
    badge: 'Analyse', nbThm: 11, nbEx: 8,
    desc: 'Suites arithmétiques (u_{n+1}=u_n+r, terme général, somme), géométriques (u_{n+1}=q·u_n, terme général, somme), récurrentes u_{n+1}=f(u_n) avec u₀ donné, limite d\'une suite (convergence, divergence), principe de récurrence (démonstration).'
  },
]

// PARTIE 2 — GÉOMÉTRIE (1 chapitre)
const PARTIE2 = [
  {
    ch: 'CH 08', slug: 'geometrie-espace', titre: 'Géométrie dans l\'Espace',
    badge: 'Géométrie', nbThm: 9, nbEx: 7,
    desc: 'Vecteurs de l\'espace (composantes, opérations), produit scalaire dans l\'espace (définition, propriétés, applications), droites dans l\'espace (représentations paramétrique et cartésienne), plans (équation cartésienne ax+by+cz+d=0), positions relatives (droite-droite, droite-plan, plan-plan), distance point-plan et point-droite.'
  },
]

// PARTIE 3 — PROBABILITÉS (2 chapitres)
const PARTIE3 = [
  {
    ch: 'CH 09', slug: 'denombrement', titre: 'Dénombrement',
    badge: 'Probabilités', nbThm: 6, nbEx: 5,
    desc: 'Arrangements Aₙᵖ = n!/(n−p)!, permutations n!, combinaisons Cₙᵖ = (n choose p), formule du binôme (a+b)ⁿ = Σ Cₙᵏ aᵏ bⁿ⁻ᵏ.'
  },
  {
    ch: 'CH 10', slug: 'probabilites', titre: 'Probabilités',
    badge: 'Probabilités', nbThm: 9, nbEx: 7,
    desc: 'Vocabulaire probabiliste (univers Ω, événements élémentaires), probabilité sur ensemble fini (définition), probabilité de la réunion P(A∪B), probabilité de l\'intersection P(A∩B), équiprobabilité P(A)=card(A)/card(Ω), probabilités conditionnelles P_A(B)=P(A∩B)/P(A), indépendance P(A∩B)=P(A)×P(B).'
  },
]

const badgeColors: Record<string, { bg: string; color: string }> = {
  'Analyse':      { bg: 'rgba(99,102,241,0.15)',  color: '#6366f1' },
  'Géométrie':    { bg: 'rgba(79,110,247,0.15)',  color: '#4f6ef7' },
  'Probabilités': { bg: 'rgba(245,200,66,0.15)',  color: '#f5c842' },
}

function ChapterCard({ ch, href }: { ch: typeof PARTIE1[0]; href: string }) {
  const bc = badgeColors[ch.badge] || badgeColors['Analyse']
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 22, height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 32px ${COLOR}22` }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
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

export default function InformatiquePage() {
  const totalCh = PARTIE1.length + PARTIE2.length + PARTIE3.length
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link><span>›</span>
          <span style={{ color: 'var(--text)' }}>Sciences Informatiques</span>
        </div>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          <div style={{ marginBottom: 44 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(99,102,241,0.15)', color: COLOR, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Coefficient 3</span>
              <span style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)', color: 'white', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20, letterSpacing: '0.08em' }}>NOUVEAU PROGRAMME</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 10 }}>Sciences Informatiques — Mathématiques</h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', marginBottom: 16 }}>
              Programme officiel CNP Tunisie — 4ème année secondaire. {totalCh} chapitres répartis en 3 parties :
              Analyse · Géométrie de l'espace · Probabilités.
              Source : <span style={{ color: COLOR, fontFamily: 'var(--font-mono)', fontSize: 13 }}>tadris.tn</span>
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>💻 {totalCh} chapitres</span><span>·</span>
              <span>📊 85+ théorèmes</span><span>·</span>
              <span>📝 67+ exercices</span>
            </div>
          </div>

          {/* Partie 1 */}
          <div style={{ marginBottom: 44 }}>
            <PartieHeader titre="📈 Partie 1 — Analyse" desc="Fonctions · Limites & Continuité · Dérivation · Étude de fonctions · Ln · Exp · Suites" color={COLOR} count={PARTIE1.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE1.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/informatique/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 2 */}
          <div style={{ marginBottom: 44 }}>
            <PartieHeader titre="📐 Partie 2 — Géométrie dans l'Espace" desc="Vecteurs · Produit scalaire · Droites et plans · Distances" color="#4f6ef7" count={PARTIE2.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE2.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/informatique/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 3 */}
          <div style={{ marginBottom: 52 }}>
            <PartieHeader titre="🎲 Partie 3 — Dénombrement & Probabilités" desc="Arrangements, Permutations, Combinaisons, Formule du binôme · Probabilités conditionnelles" color="#f5c842" count={PARTIE3.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE3.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/informatique/${ch.slug}`} />)}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
            {[
              { href:'/bac/maths',         icon:'📐', titre:'Section Maths',    desc:'10 chapitres · Coeff 4' },
              { href:'/bac/sciences-exp',  icon:'🔬', titre:'Sc. Expérim.',     desc:'9 chapitres · Coeff 3' },
              { href:'/bac/sciences-tech', icon:'⚙️', titre:'Sc. Techniques',   desc:'12 chapitres · Coeff 3' },
              { href:'/bac/eco-gestion',   icon:'💹', titre:'Éco-Gestion',      desc:'11 chapitres · Coeff 2' },
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