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
    ch: 'CH 01', slug: 'complexes', titre: 'Nombres Complexes',
    badge: 'Algèbre', nbThm: 14, nbEx: 12,
    desc: "Formes algébrique z=a+ib, trigonométrique r(cosθ+isinθ), exponentielle re^(iθ). Formule de Moivre. Formules d'Euler. Racines n-ièmes. Applications géométriques dans ℂ.",
  },
  {
    ch: 'CH 02', slug: 'arithmetique', titre: 'Arithmétique dans ℤ',
    badge: 'Algèbre', nbThm: 13, nbEx: 10,
    desc: "Divisibilité, PGCD, algorithme d'Euclide. Identité de Bézout au+bv=PGCD(a,b). Théorème de Gauss. Nombres premiers. Congruences. Équations diophantiennes ax+by=c.",
  },
]

const PARTIE2_ANALYSE = [
  {
    ch: 'CH 03', slug: 'suites', titre: 'Suites Numériques',
    badge: 'Analyse', nbThm: 13, nbEx: 10,
    desc: "Suites arithmétiques, géométriques, récurrentes uₙ₊₁=f(uₙ), suites adjacentes, monotonie, bornitude, convergence.",
  },
  {
    ch: 'CH 04', slug: 'limites-continuite', titre: 'Limites et Continuité',
    badge: 'Analyse', nbThm: 14, nbEx: 11,
    desc: "Limites en un point et à l'infini, formes indéterminées, TVI, prolongement par continuité, asymptotes H/V/O.",
  },
  {
    ch: 'CH 05', slug: 'derivation', titre: 'Dérivabilité & Étude de Fonctions',
    badge: 'Analyse', nbThm: 12, nbEx: 10,
    desc: "Dérivabilité en un point, Rolle, accroissements finis, L'Hôpital, dérivées usuelles, tangente, concavité, inflexion, étude complète.",
  },
  {
    ch: 'CH 06', slug: 'fonctions-reciproques', titre: 'Fonctions Réciproques',
    badge: 'Analyse', nbThm: 10, nbEx: 8,
    desc: "Bijection et réciproque. arcsin ([-1,1]→[-π/2,π/2]), arccos ([-1,1]→[0,π]), arctan (ℝ→(-π/2,π/2)). Dérivées, propriétés, compositions.",
  },
  {
    ch: 'CH 07', slug: 'logarithme', titre: 'Logarithme Népérien',
    badge: 'Analyse', nbThm: 11, nbEx: 9,
    desc: "Définition intégrale ln x = ∫₁ˣ 1/t dt. Propriétés algébriques. Dérivée (ln u)'=u'/u. Limites en 0⁺ et +∞. Fonctions aˣ et logₐ(x).",
  },
  {
    ch: 'CH 08', slug: 'exponentielle', titre: 'Fonction Exponentielle',
    badge: 'Analyse', nbThm: 10, nbEx: 9,
    desc: "Réciproque de ln. Dérivée (eᵘ)'=u'eᵘ. Propriétés : eᵃ⁺ᵇ=eᵃeᵇ. Croissances comparées eˣ/xⁿ. Fonctions aˣ=eˣˡⁿᵃ.",
  },
  {
    ch: 'CH 09', slug: 'calcul-integral', titre: 'Calcul Intégral',
    badge: 'Analyse', nbThm: 12, nbEx: 10,
    desc: "Primitives des fonctions usuelles. Intégrale de Riemann ∫ₐᵇ f(x)dx. Théorème fondamental. IPP. Changement de variable. Aires planes et volumes de révolution.",
  },
  {
    ch: 'CH 10', slug: 'equations-differentielles', titre: 'Équations Différentielles',
    badge: 'Analyse', nbThm: 9, nbEx: 8,
    desc: "y'=ay → y=Ceᵃˣ. y'=ay+b → solution particulière + homogène. y''+ay'+by=0 : équation caractéristique r²+ar+b=0 (Δ>0, Δ=0, Δ<0 racines complexes).",
  },
]

const PARTIE3_GEOMETRIE = [
  {
    ch: 'CH 11', slug: 'geometrie-espace', titre: "Géométrie dans l'Espace",
    badge: 'Géométrie', nbThm: 10, nbEx: 8,
    desc: "Produit scalaire et vectoriel u⃗∧v⃗. Équations de plan et droite dans l'espace. Sphère. Distances point-plan, point-droite, entre droites.",
  },
  {
    ch: 'CH 12', slug: 'isometries-similitudes', titre: 'Isométries & Similitudes',
    badge: 'Géométrie', nbThm: 12, nbEx: 9,
    desc: "Isométries directes (translations, rotations) et indirectes (réflexions, retournements). Similitudes directes et indirectes. Expression complexe f(z)=az+b ou f(z)=az̄+b. Classification et point fixe.",
  },
  {
    ch: 'CH 13', slug: 'coniques', titre: 'Coniques',
    badge: 'Géométrie', nbThm: 11, nbEx: 9,
    desc: "Parabole (foyer F, directrice D, y²=2px). Ellipse (x²/a²+y²/b²=1, e<1, a²=b²+c²). Hyperbole (x²/a²-y²/b²=1, asymptotes y=±(b/a)x, e>1). Réduction à la forme canonique.",
  },
]

const PARTIE4_PROBA = [
  {
    ch: 'CH 14', slug: 'probabilites-discretes', titre: 'Probabilités Discrètes',
    badge: 'Probabilités', nbThm: 12, nbEx: 10,
    desc: "Probabilité conditionnelle P(A|B). Indépendance. Probabilités totales. Bayes. Variables aléatoires discrètes : espérance, variance. Loi binomiale B(n,p). Loi de Poisson P(λ).",
  },
  {
    ch: 'CH 15', slug: 'probabilites-continues', titre: 'Probabilités Continues & Loi Normale',
    badge: 'Probabilités', nbThm: 10, nbEx: 9,
    desc: "Variable aléatoire continue, densité f. Loi uniforme U([a,b]). Loi exponentielle ε(λ) sans mémoire. Loi normale N(μ,σ²) : courbe de Gauss, standardisation Z=(X-μ)/σ, table.",
  },
]

const PARTIE5_GRAPHES = [
  {
    ch: 'CH 16', slug: 'graphes', titre: 'Graphes et Algorithmique',
    badge: 'Info', nbThm: 8, nbEx: 6,
    desc: "Définitions (sommets, arêtes, ordre, degré), théorème d'Euler, algorithme de Dijkstra, matrice d'adjacence, graphe orienté, graphe probabiliste et matrice de transition.",
  },
]

const badgeColors: Record<string, { bg: string; color: string }> = {
  'Analyse':   { bg: 'rgba(79,110,247,0.15)',  color: '#4f6ef7' },
  'Algèbre':   { bg: 'rgba(124,58,237,0.15)',  color: '#a78bfa' },
  'Géométrie': { bg: 'rgba(6,214,160,0.15)',   color: '#06d6a0' },
  'Info':      { bg: 'rgba(245,200,66,0.15)',  color: '#f5c842' },
  'Probabilités': { bg: 'rgba(244,63,94,0.15)',   color: '#f43f5e' },
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
  const totalCh = PARTIE1_ALGEBRE.length + PARTIE2_ANALYSE.length + PARTIE3_GEOMETRIE.length + PARTIE4_PROBA.length + PARTIE5_GRAPHES.length
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
              Algèbre · Analyse · Géométrie · Probabilités · Graphes.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📐 {totalCh} chapitres</span><span>·</span>
              <span>📊 185+ théorèmes</span><span>·</span>
              <span>📝 150+ exercices</span>
            </div>
          </div>

          {/* Partie 1 — Algèbre */}
          <div style={{ marginBottom: 44 }}>
            <TomeHeader titre="🔢 Partie 1 — Algèbre" desc="Nombres complexes (Moivre, Euler, racines n-ièmes) · Arithmétique dans ℤ (Bézout, congruences)" color="#a78bfa" count={PARTIE1_ALGEBRE.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE1_ALGEBRE.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/maths/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 2 — Analyse */}
          <div style={{ marginBottom: 44 }}>
            <TomeHeader titre="📈 Partie 2 — Analyse" desc="Suites · Limites · Dérivabilité · Fonctions réciproques · Ln · Exp · Intégrales · Éq. diff." color={COLOR} count={PARTIE2_ANALYSE.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE2_ANALYSE.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/maths/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 3 — Géométrie */}
          <div style={{ marginBottom: 44 }}>
            <TomeHeader titre="📐 Partie 3 — Géométrie" desc="Géométrie dans l'espace (produit vectoriel) · Isométries & Similitudes · Coniques (ellipse, hyperbole, parabole)" color="#06d6a0" count={PARTIE3_GEOMETRIE.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE3_GEOMETRIE.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/maths/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 4 — Probabilités */}
          <div style={{ marginBottom: 44 }}>
            <TomeHeader titre="🎲 Partie 4 — Probabilités & Statistiques" desc="Probabilités conditionnelles · Loi binomiale · Loi de Poisson · Loi normale N(μ,σ²)" color="#f43f5e" count={PARTIE4_PROBA.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE4_PROBA.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/maths/${ch.slug}`} />)}
            </div>
          </div>

          {/* Partie 5 — Graphes */}
          <div style={{ marginBottom: 52 }}>
            <TomeHeader titre="🕸️ Partie 5 — Graphes & Algorithmique" desc="Graphes (Euler, Dijkstra) · Graphes probabilistes · Matrice de transition" color="#f5c842" count={PARTIE5_GRAPHES.length} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
              {PARTIE5_GRAPHES.map(ch => <ChapterCard key={ch.slug} ch={ch} href={`/bac/maths/${ch.slug}`} />)}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
            {[
              { href:'/bac/sciences-exp',  icon:'🔬', titre:'Sc. Expérimentales', desc:'8 chapitres · Coeff 3' },
              { href:'/bac/sciences-tech', icon:'⚙️', titre:'Sc. Techniques',     desc:'12 chapitres · Coeff 3' },
              { href:'/bac/eco-gestion',   icon:'💹', titre:'Éco-Gestion',        desc:'11 chapitres · Coeff 2' },
              { href:'/bac/informatique',  icon:'💻', titre:'Informatique',       desc:'10 chapitres · Coeff 3' },
              { href:'/bac/maths',          icon:'📐', titre:'Retour Maths',          desc:'16 chapitres · Coeff 4' },
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