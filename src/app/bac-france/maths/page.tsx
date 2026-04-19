'use client'
// src/app/bac-france/maths/page.tsx
// Redirect vers l'ancien contenu maths — copie exacte de l'ancien /bac-france/page.tsx
// mais avec fil d'ariane mis à jour

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const SECTIONS = [
  {
    slug: 'seconde',
    icon: '📘',
    titre: 'Seconde Générale — Mathématiques',
    niveau: 'Lycée · Classe de Seconde',
    annee: '2025–2026',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.16),rgba(6,182,212,0.08))',
    border: 'rgba(16,185,129,0.3)',
    badgeColor: '#34d399',
    badge: '13 chapitres · Programme complet',
    sections: [
      { label: '🐍 Algorithmique',  items: ['Python','Variables','Boucles','Fonctions'] },
      { label: '🔢 Nombres',        items: ['Puissances','Racines','PGCD','Ensembles'] },
      { label: '📐 Géométrie',      items: ['Vecteurs','Repère','Droites','Systèmes'] },
      { label: '📈 Fonctions',      items: ['Généralités','Variations','Signe','Parite'] },
      { label: '📊 Stats & Probas', items: ['Statistiques','Évolutions','Probabilités'] },
    ],
    nbCh: 13, nbThm: 52, nbEx: 39,
  },
  {
    slug: 'premiere',
    icon: '📗',
    titre: 'Première — Spécialité Mathématiques',
    niveau: 'Lycée · Classe de Première',
    annee: '2026–2027',
    couleur: '#4f6ef7',
    gradient: 'linear-gradient(135deg,rgba(79,110,247,0.16),rgba(124,58,237,0.08))',
    border: 'rgba(79,110,247,0.3)',
    badgeColor: '#818cf8',
    badge: 'Spécialité · 4h/semaine',
    sections: [
      { label: '📐 Algèbre',       items: ['Suites numériques','Second degré'] },
      { label: '📈 Analyse',        items: ['Dérivation','Fonction exponentielle','Fonctions trigonométriques'] },
      { label: '📏 Géométrie',      items: ['Produit scalaire','Géométrie repérée'] },
      { label: '🎲 Probabilités',   items: ['Probabilités conditionnelles','Variables aléatoires'] },
      { label: '💻 Algorithmique',  items: ['Python et algorithmes'] },
    ],
    nbCh: 10, nbThm: 95, nbEx: 90,
  },
  {
    slug: 'terminale-generale',
    icon: '🎓',
    titre: 'Terminale Générale — Spécialité Maths',
    niveau: 'Lycée · Classe de Terminale · Année du Bac',
    annee: '2027 (Bac)',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.16),rgba(249,115,22,0.08))',
    border: 'rgba(245,158,11,0.3)',
    badgeColor: '#fbbf24',
    badge: 'Bac 2027 · Coef. 16',
    sections: [
      { label: '🧮 Algèbre & Géo.',  items: ['Suites (limites)','Nombres complexes'] },
      { label: '📈 Analyse',          items: ['Limites & Continuité','Dérivation avancée','Logarithme','Intégration','Équations différentielles'] },
      { label: '🌐 Géo. espace',      items: ['Vecteurs 3D','Droites & Plans'] },
      { label: '🎲 Probas & Stats',   items: ['Loi normale','Loi binomiale','Échantillonnage'] },
      { label: '💻 Algorithmique',    items: ['Python avancé'] },
    ],
    nbCh: 13, nbThm: 130, nbEx: 110,
  },
  {
    slug: 'terminale-expertes',
    icon: '⭐',
    titre: 'Terminale — Option Maths Expertes',
    niveau: 'Option Terminale · 3h/semaine',
    annee: '2027',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.16),rgba(99,102,241,0.08))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    badge: 'Option · Coef. 2 CC',
    sections: [
      { label: 'Arithmétique',    items: ['Divisibilité','PGCD & Bézout','Nombres premiers'] },
      { label: 'Complexes',       items: ['Formes trig. & expo.','Équations dans ℂ'] },
      { label: 'Graphes & Matrices', items: ['Théorie des graphes','Calcul matriciel','Chaînes de Markov'] },
    ],
    nbCh: 8, nbThm: 72, nbEx: 60,
  },
  {
    slug: 'terminale-techno',
    icon: '⚙️',
    titre: 'Terminale Technologique',
    niveau: 'STMG · STI2D · STL · ST2S',
    annee: '2027',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.07))',
    border: 'rgba(16,185,129,0.3)',
    badgeColor: '#34d399',
    badge: 'Tronc commun',
    sections: [
      { label: 'STMG — Analyse',   items: ['Fonctions','Suites','Calculs financiers'] },
      { label: 'STMG — Probas',    items: ['Stats 2 variables','Proba conditionnelles','Loi binomiale'] },
      { label: 'STI2D — Analyse',  items: ['Exp. & Logarithme','Intégration','Éq. différentielles'] },
    ],
    nbCh: 10, nbThm: 70, nbEx: 65,
  },
]

export default function MathsFrancePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <span style={{ color: '#fbbf24' }}>Mathématiques</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>🇫🇷 Éducation Nationale France · Lycée</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              Mathématiques France<br />
              <span style={{ background: 'linear-gradient(90deg,#f59e0b,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Première & Terminale
              </span>
            </h1>
            <p style={{ maxWidth: 600, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programmes officiels MEN · Première Spécialité · Terminale Générale Bac 2027 ·
              Option Maths Expertes · Terminale Technologique.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🏫 4 voies</span><span>·</span>
              <span>📚 41 chapitres</span><span>·</span>
              <span>📊 367+ théorèmes</span><span>·</span>
              <span>📝 325+ exercices</span>
            </div>
          </div>

          {/* SECTIONS — identique à l'ancienne page */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SECTIONS.map(s => (
              <Link key={s.slug} href={`/bac-france/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: s.gradient, border: `1px solid ${s.border}`, borderRadius: 20, padding: '24px 28px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${s.couleur}22` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 36, flexShrink: 0 }}>{s.icon}</span>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                          <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{s.titre}</h2>
                          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${s.couleur}22`, color: s.badgeColor, fontWeight: 700 }}>{s.badge}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{s.niveau} · {s.annee}</div>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12 }}>
                          <span style={{ color: s.couleur, fontWeight: 600 }}>📚 {s.nbCh} chapitres</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📊 {s.nbThm}+ théorèmes</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📝 {s.nbEx}+ exercices</span>
                        </div>
                      </div>
                    </div>
                    <span style={{ color: s.couleur, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>Ouvrir →</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
                    {s.sections.map(sec => (
                      <div key={sec.label} style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: s.couleur, marginBottom: 6 }}>{sec.label}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {sec.items.map(it => (
                            <span key={it} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${s.couleur}18`, color: 'var(--text2)', border: `1px solid ${s.couleur}18` }}>{it}</span>
                          ))}
                        </div>
                      </div>
                    ))}
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