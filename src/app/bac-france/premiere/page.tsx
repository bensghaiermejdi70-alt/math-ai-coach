'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// FRANCE / PREMIÈRE SPÉCIALITÉ MATHS
// Route : /bac-france/premiere
// Source : Programme officiel 2026-2027 · 4h/semaine
// 5 sections · 10 chapitres
// ══════════════════════════════════════════════════════════════════════

const SECTIONS = [
  {
    key: 's1', num: 'Section 1', titre: 'Algèbre', icon: '🔢',
    couleur: '#4f6ef7', bg: 'rgba(79,110,247,0.12)', border: 'rgba(79,110,247,0.3)', text: '#818cf8',
    chapitres: [
      { ch:'CH 01', slug:'suites-numeriques',   titre:'Suites numériques',    badge:'Algèbre',  nbThm:10, nbEx:14, desc:'Formule explicite, récurrence, suites croissantes/décroissantes, suites arithmétiques et géométriques, calculs de termes et sommes.' },
      { ch:'CH 02', slug:'second-degre',        titre:'Second degré',          badge:'Algèbre',  nbThm:10, nbEx:14, desc:'Forme canonique, forme factorisée, discriminant Δ, résolution ax²+bx+c=0, signe du trinôme, somme et produit des racines.' },
    ],
  },
  {
    key: 's2', num: 'Section 2', titre: 'Analyse', icon: '📈',
    couleur: '#06d6a0', bg: 'rgba(6,214,160,0.12)', border: 'rgba(6,214,160,0.3)', text: '#06d6a0',
    chapitres: [
      { ch:'CH 03', slug:'derivation',           titre:'Dérivation',            badge:'Analyse',  nbThm:11, nbEx:14, desc:'Taux d\'accroissement, nombre dérivé, dérivées usuelles, opérations (u+v, uv, u/v, ku), équation de la tangente, variations de f.' },
      { ch:'CH 04', slug:'exponentielle',        titre:'Fonction exponentielle', badge:'Analyse',  nbThm:9,  nbEx:12, desc:'Définition (f\'=f, f(0)=1), propriétés algébriques e^(a+b), étude de eˣ, croissances comparées, équations/inéquations.' },
      { ch:'CH 05', slug:'trigonometrie',        titre:'Fonctions trigonométriques', badge:'Analyse', nbThm:9, nbEx:10, desc:'Cercle trigo, radians, cos²x+sin²x=1, valeurs remarquables, périodicité, variations sur [0;2π], équations cosx=a, sinx=a.' },
    ],
  },
  {
    key: 's3', num: 'Section 3', titre: 'Géométrie', icon: '📐',
    couleur: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24',
    chapitres: [
      { ch:'CH 06', slug:'produit-scalaire',     titre:'Produit scalaire',      badge:'Géométrie', nbThm:9, nbEx:10, desc:'3 définitions (projection, cosinus, coordonnées), propriétés, formule d\'Al-Kashi, orthogonalité, applications (perpendicularité, angles).' },
      { ch:'CH 07', slug:'geometrie-reperee',    titre:'Géométrie repérée',     badge:'Géométrie', nbThm:8, nbEx:10, desc:'Équations de droite (réduite, cartésienne), vecteur directeur et normal, équation du cercle, positions relatives, intersections.' },
    ],
  },
  {
    key: 's4', num: 'Section 4', titre: 'Probabilités & Statistiques', icon: '🎲',
    couleur: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#a78bfa',
    chapitres: [
      { ch:'CH 08', slug:'probas-conditionnelles', titre:'Probabilités conditionnelles', badge:'Probas', nbThm:8, nbEx:10, desc:'P_A(B)=P(A∩B)/P(A), formule des proba. composées, arbres pondérés, partition de l\'univers, probabilités totales, indépendance.' },
      { ch:'CH 09', slug:'variables-aleatoires',   titre:'Variables aléatoires',        badge:'Probas', nbThm:7, nbEx:10, desc:'Définition, loi de probabilité, espérance E(X), variance V(X)=E(X²)−[E(X)]², écart-type σ(X), loi uniforme sur {1,…,n}.' },
    ],
  },
  {
    key: 's5', num: 'Section 5', titre: 'Algorithmique & Programmation', icon: '💻',
    couleur: '#ec4899', bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.3)', text: '#f472b6',
    chapitres: [
      { ch:'CH 10', slug:'python-algorithmes',   titre:'Python et algorithmes', badge:'Info',     nbThm:5,  nbEx:8,  desc:'Listes (création, parcours, compréhension, append/insert/remove), fonctions (def, return), suites, traitement de données, dichotomie.' },
    ],
  },
]

const badgeColors: Record<string, { bg: string; color: string }> = {
  'Algèbre':   { bg:'rgba(79,110,247,0.15)',  color:'#818cf8' },
  'Analyse':   { bg:'rgba(6,214,160,0.15)',   color:'#06d6a0' },
  'Géométrie': { bg:'rgba(245,158,11,0.15)',  color:'#fbbf24' },
  'Probas':    { bg:'rgba(139,92,246,0.15)',  color:'#a78bfa' },
  'Info':      { bg:'rgba(236,72,153,0.15)',  color:'#f472b6' },
}

function ChapCard({ ch, href, secColor }: { ch: typeof SECTIONS[0]['chapitres'][0]; href: string; secColor: string }) {
  const bc = badgeColors[ch.badge] || badgeColors['Algèbre']
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 22, height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${secColor}28` }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 6 }}>{ch.ch}</span>
            <span style={{ fontSize: 11, background: bc.bg, color: bc.color, padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>{ch.badge}</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.nbThm} thm</span>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{ch.titre}</h3>
        <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 14 }}>{ch.desc}</p>
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

export default function PremierePage() {
  const allCh = SECTIONS.flatMap(s => s.chapitres)
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac France</Link>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>Première — Spécialité Maths</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ marginBottom: 40 }}>
            <span style={{ background: 'rgba(79,110,247,0.15)', color: '#818cf8', padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12, display: 'inline-block' }}>
              📗 Lycée · Première · Spécialité · 4h/semaine · 2026-2027
            </span>
            <h1 style={{ fontSize: 'clamp(26px,4vw,42px)', marginBottom: 12 }}>Première Spécialité Mathématiques</h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.7 }}>
              Programme officiel MEN · 5 sections · {allCh.length} chapitres.
              Tous les théorèmes, définitions, formules et méthodes du programme.
              Épreuve anticipée coef. 2 en fin de Première (session 2026).
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📚 {allCh.length} chapitres</span><span>·</span>
              <span>🗂️ 5 sections</span><span>·</span>
              <span>📊 {allCh.reduce((s,c)=>s+c.nbThm,0)}+ théorèmes</span><span>·</span>
              <span>📝 {allCh.reduce((s,c)=>s+c.nbEx,0)}+ exercices</span>
            </div>
          </div>

          {SECTIONS.map(sec => (
            <div key={sec.key} style={{ marginBottom: 44 }}>
              <div style={{ background: `linear-gradient(135deg,${sec.bg},transparent)`, border: `1px solid ${sec.border}`, borderRadius: 16, padding: '18px 24px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 20 }}>{sec.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: sec.text, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{sec.num}</div>
                    <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{sec.titre}</h2>
                  </div>
                </div>
                <span style={{ background: `${sec.couleur}20`, color: sec.text, padding: '5px 14px', borderRadius: 20, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                  {sec.chapitres.length} chapitre{sec.chapitres.length > 1 ? 's' : ''}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
                {sec.chapitres.map(ch => (
                  <ChapCard key={ch.slug} ch={ch} href={`/bac-france/premiere/${ch.slug}`} secColor={sec.couleur} />
                ))}
              </div>
            </div>
          ))}

          {/* Navigation */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: 'var(--text2)' }}>Continuer en Terminale</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
              {[
                { href:'/bac-france/terminale',          icon:'🎓', label:'Terminale Générale', sub:'Bac 2027 · 13 chapitres' },
                { href:'/bac-france/terminale-expertes', icon:'⭐', label:'Option Expertes',     sub:'Arithmétique · Complexes · Matrices' },
                { href:'/bac-france/terminale-techno',   icon:'⚙️', label:'Terminale Techno',    sub:'STMG · STI2D · STL' },
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
