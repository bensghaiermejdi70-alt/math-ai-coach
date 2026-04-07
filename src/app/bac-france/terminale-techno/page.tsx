'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// TERMINALE TECHNOLOGIQUE
// Route : /bac-france/terminale-techno
// Branches : STMG · STI2D · STL · ST2S
// Source : programme_terminal_france.txt lignes 480–635
// ══════════════════════════════════════════════════════════════════════

const BRANCHES = [
  {
    key:'stmg', badge:'STMG', icon:'📊',
    titre:'STMG — Sciences & Technologies du Management',
    horaire:'3h/semaine', eval:'CC Première coef.3 + CC Terminale coef.3 + Épreuve anticipée fin Première coef.2',
    couleur:'#4f6ef7', bg:'rgba(79,110,247,0.12)', border:'rgba(79,110,247,0.3)', text:'#818cf8',
    sections:[
      {
        label:'Section 1 — Analyse & Représentation de données',
        chapitres:[
          {ch:'CH 01',slug:'stmg-fonctions',     titre:'Fonctions (approfondissement)',   badge:'Analyse',   nbThm:8, nbEx:10, desc:'Fonctions affines, second degré (forme canonique), fonction exponentielle eˣ, croissance comparée, modèles économiques.'},
          {ch:'CH 02',slug:'stmg-suites',        titre:'Suites numériques',               badge:'Algèbre',   nbThm:7, nbEx:10, desc:'Suites arithmétiques et géométriques, formules explicites et récurrentes, sommes de termes, intérêts simples/composés, amortissements.'},
        ],
      },
      {
        label:'Section 2 — Probabilités & Statistiques',
        chapitres:[
          {ch:'CH 03',slug:'stmg-stats-2var',    titre:'Statistiques à deux variables',   badge:'Stats',     nbThm:6, nbEx:8,  desc:'Nuage de points, point moyen, ajustement affine (moindres carrés), coefficient de corrélation, prévisions (interpolation, extrapolation).'},
          {ch:'CH 04',slug:'stmg-probas',        titre:'Probabilités conditionnelles',    badge:'Probas',    nbThm:7, nbEx:8,  desc:'P_A(B), formule des probabilités totales, arbres pondérés, indépendance, variable aléatoire, espérance E(X), loi binomiale B(n,p).'},
        ],
      },
      {
        label:'Section 3 — Calculs commerciaux & Financiers',
        chapitres:[
          {ch:'CH 05',slug:'stmg-pourcentages',  titre:'Pourcentages & Évolutions',       badge:'Calcul',    nbThm:5, nbEx:8,  desc:'Taux d\'évolution, coefficients multiplicateurs, évolutions successives et réciproques, échelles.'},
          {ch:'CH 06',slug:'stmg-financier',     titre:'Calculs financiers',              badge:'Finance',   nbThm:6, nbEx:8,  desc:'Intérêts simples et composés, valeur actuelle/acquise, amortissements (linéaire, dégressif), rentes et mensualités d\'emprunt.'},
        ],
      },
    ],
  },
  {
    key:'sti2d', badge:'STI2D · STL', icon:'⚙️',
    titre:'STI2D & STL — Sciences & Technologies Industrie',
    horaire:'3h/semaine (commun) + 3h spécialité PCM',
    eval:'CC coef.3 commun + CC coef.3 spécialité + Épreuve terminale commune Physique-Chimie coef.16 (dont 6 pts maths)',
    couleur:'#10b981', bg:'rgba(16,185,129,0.12)', border:'rgba(16,185,129,0.3)', text:'#34d399',
    sections:[
      {
        label:'Section A — Analyse (STI2D/STL)',
        chapitres:[
          {ch:'CH 07',slug:'sti-suites',         titre:'Suites & Modélisation',           badge:'Algèbre',   nbThm:6, nbEx:8,  desc:'Suites arithmétiques et géométriques, modèles discrets (croissance exponentielle, décroissance), algorithme de seuil.'},
          {ch:'CH 08',slug:'sti-exp-ln',         titre:'Exponentielle & Logarithme',      badge:'Analyse',   nbThm:9, nbEx:10, desc:'Fonction eˣ : propriétés, équations eᵃ=eᵇ⟺a=b. Logarithme ln : primitive de 1/x, propriétés algébriques, résolution, croissances comparées. Modélisations physiques.'},
          {ch:'CH 09',slug:'sti-integration',    titre:'Intégration',                     badge:'Analyse',   nbThm:7, nbEx:8,  desc:'Primitives usuelles, intégrale définie (aire, relation de Chasles), valeur moyenne (1/(b−a))∫f, applications : aires, centre d\'inertie, travail d\'une force.'},
        ],
      },
      {
        label:'Section B — Probabilités & Statistiques',
        chapitres:[
          {ch:'CH 10',slug:'sti-probas-cont',    titre:'Probabilités continues',          badge:'Probas',    nbThm:6, nbEx:8,  desc:'Loi uniforme sur [a;b] (densité, espérance), loi normale N(μ,σ²), standardisation Z=(X−μ)/σ, intervalles μ±σ, μ±2σ, approximation binomiale.'},
          {ch:'CH 11',slug:'sti-stat-inf',       titre:'Statistiques inférentielles',     badge:'Stats',     nbThm:5, nbEx:6,  desc:'Fluctuation d\'échantillonnage, intervalle de confiance 95% [f±1/√n], estimation d\'une proportion, taille d\'échantillon.'},
        ],
      },
      {
        label:'Section C — Géométrie (STI2D) & Section D — Spécialité PCM (STL/STI2D)',
        chapitres:[
          {ch:'CH 12',slug:'sti-geometrie',      titre:'Géométrie dans l\'espace',        badge:'Géométrie', nbThm:7, nbEx:8,  desc:'Vecteurs de l\'espace, coplanarité, équation cartésienne du plan ax+by+cz+d=0, représentation paramétrique d\'une droite, intersection, orthogonalité.'},
          {ch:'CH 13',slug:'sti-eq-diff',        titre:'Équations différentielles & Compléments', badge:'Analyse', nbThm:7, nbEx:8, desc:'y\'=ay → y=Ceᵃˣ ; y\'=ay+b → Ceᵃˣ−b/a ; condition initiale ; circuits RC, refroidissement Newton, croissance bactérienne. Convexité f\'\', IPP, changement de variable.'},
        ],
      },
    ],
  },
]

const badgeColors: Record<string,{bg:string;color:string}> = {
  'Analyse':   {bg:'rgba(6,214,160,0.15)',   color:'#06d6a0'},
  'Algèbre':   {bg:'rgba(79,110,247,0.15)',  color:'#818cf8'},
  'Stats':     {bg:'rgba(245,158,11,0.15)',  color:'#fbbf24'},
  'Probas':    {bg:'rgba(139,92,246,0.15)',  color:'#a78bfa'},
  'Calcul':    {bg:'rgba(79,110,247,0.15)',  color:'#4f6ef7'},
  'Finance':   {bg:'rgba(16,185,129,0.15)',  color:'#34d399'},
  'Géométrie': {bg:'rgba(245,158,11,0.15)',  color:'#f59e0b'},
}

function ChapCard({ ch, href, secColor }: { ch: typeof BRANCHES[0]['sections'][0]['chapitres'][0]; href: string; secColor: string }) {
  const bc = badgeColors[ch.badge] || badgeColors['Analyse']
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 20, height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${secColor}28` }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 6 }}>{ch.ch}</span>
            <span style={{ fontSize: 11, background: bc.bg, color: bc.color, padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>{ch.badge}</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.nbThm} thm</span>
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{ch.titre}</h3>
        <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>{ch.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['Déf', 'Thm', 'Formule'].map(l => (
              <span key={l} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${secColor}18`, color: secColor }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: secColor, fontWeight: 700 }}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

export default function TerminaleTechnoPage() {
  const allCh = BRANCHES.flatMap(b => b.sections.flatMap(s => s.chapitres))
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac France</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Terminale Technologique</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12, display: 'inline-block' }}>
              ⚙️ Lycée · Terminale Technologique · 2026-2027
            </span>
            <h1 style={{ fontSize: 'clamp(26px,4vw,42px)', marginBottom: 12 }}>Terminale Technologique</h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.7 }}>
              Programme officiel MEN · STMG · STI2D · STL · ST2S.
              {allCh.length} chapitres répartis en deux branches principales.
              Tous les théorèmes, formules et méthodes du programme officiel.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📚 {allCh.length} chapitres</span><span>·</span>
              <span>🏫 2 branches (STMG · STI2D/STL)</span><span>·</span>
              <span>📊 {allCh.reduce((s, c) => s + c.nbThm, 0)}+ théorèmes</span><span>·</span>
              <span>📝 {allCh.reduce((s, c) => s + c.nbEx, 0)}+ exercices</span>
            </div>
          </div>

          {/* BRANCHES */}
          {BRANCHES.map(branch => (
            <div key={branch.key} style={{ marginBottom: 52 }}>
              {/* Header branche */}
              <div style={{ background: `linear-gradient(135deg,${branch.bg},transparent)`, border: `1px solid ${branch.border}`, borderRadius: 18, padding: '20px 26px', marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 32 }}>{branch.icon}</span>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: `${branch.couleur}20`, color: branch.text, padding: '2px 10px', borderRadius: 8, fontWeight: 700 }}>{branch.badge}</span>
                        <span style={{ fontSize: 11, color: branch.text }}>· {branch.horaire}</span>
                      </div>
                      <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, marginBottom: 4 }}>{branch.titre}</h2>
                      <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>📋 Évaluation : {branch.eval}</div>
                    </div>
                  </div>
                  <span style={{ background: `${branch.couleur}20`, color: branch.text, padding: '5px 14px', borderRadius: 20, fontSize: 12, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                    {branch.sections.flatMap(s => s.chapitres).length} chapitres
                  </span>
                </div>
              </div>

              {/* Sections de la branche */}
              {branch.sections.map((sec, si) => (
                <div key={si} style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: branch.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, paddingLeft: 4 }}>
                    {sec.label}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 14 }}>
                    {sec.chapitres.map(ch => (
                      <ChapCard key={ch.slug} ch={ch} href={`/bac-france/terminale-techno/${ch.slug}`} secColor={branch.couleur} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Navigation autres branches */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: 'var(--text2)' }}>Autres branches Terminale</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
              {[
                { href: '/bac-france/terminale-generale', icon: '🎓', label: 'Terminale Générale', sub: 'Spécialité · Bac 2027 · 13 ch.' },
                { href: '/bac-france/terminale-expertes', icon: '⭐', label: 'Option Maths Expertes', sub: 'Arithmétique · Complexes · Matrices' },
                { href: '/bac-france/premiere', icon: '📗', label: 'Première Spécialité', sub: '10 chapitres' },
              ].map(n => (
                <Link key={n.href} href={n.href} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'center', transition: 'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <span style={{ fontSize: 24 }}>{n.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{n.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{n.sub}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
