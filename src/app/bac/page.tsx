'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  PAGE BAC TUNISIE — Page intermédiaire Maths / Physique-Chimie / SVT
//  Programme officiel CNP Tunisie — 4ème année secondaire
// ═══════════════════════════════════════════════════════════════

type Matiere = 'maths' | 'physique-chimie' | null

// ──────────────────────────────────────────────────────────────
//  DONNÉES MATHÉMATIQUES — Programme officiel CNP mis à jour
// ──────────────────────────────────────────────────────────────

const SECTIONS_MATHS = [
  {
    slug: 'maths',
    icon: '📐',
    titre: 'Section Mathématiques',
    coeff: 'Coefficient 4',
    couleur: '#4f6ef7',
    gradient: 'linear-gradient(135deg,rgba(79,110,247,0.15),rgba(124,58,237,0.08))',
    border: 'rgba(79,110,247,0.25)',
    tomes: [
      {
        label: 'Partie 1 — Algèbre',
        chapitres: [
          'Problèmes du second degré (trinôme, discriminant, inéquations)',
          'Nombres complexes (module, argument, forme trigonométrique)',
          'Systèmes linéaires et matrices (opérations, déterminant, inverse)',
        ],
      },
      {
        label: 'Partie 2 — Analyse',
        chapitres: [
          'Suites numériques (arithmétiques, géométriques, récurrentes, limite)',
          'Limites et continuité (TVI, asymptotes, dichotomie)',
          'Dérivation (dérivées usuelles, tangente, approximation affine)',
          'Étude de fonctions (polynômes, rationnelles, irrationnelles, trig, exp, ln)',
        ],
      },
      {
        label: 'Partie 3 — Géométrie',
        chapitres: [
          'Géométrie plane (vecteurs, droites, cercles)',
          'Géométrie dans l\'espace (vecteurs, droites, plans, produit scalaire, distance)',
        ],
      },
      {
        label: 'Partie 4 — Graphes & Algorithmique',
        chapitres: [
          'Graphes (Euler, Dijkstra, matrice d\'adjacence, graphe probabiliste)',
        ],
      },
    ],
    nbCh: 10,
    nbThm: 110,
    nbEx: 90,
  },
  {
    slug: 'sciences-exp',
    icon: '🔬',
    titre: 'Section Sciences Expérimentales',
    coeff: 'Coefficient 3',
    couleur: '#06d6a0',
    gradient: 'linear-gradient(135deg,rgba(6,214,160,0.12),rgba(5,154,114,0.06))',
    border: 'rgba(6,214,160,0.25)',
    tomes: [
      {
        label: 'Partie 1 — Analyse',
        chapitres: [
          'Fonctions — Généralités (domaine, parité, opérations, √f)',
          'Limites et continuité (TVI, asymptotes, branches infinies)',
          'Dérivation (dérivées usuelles, tangente, extrema)',
          'Étude de fonctions (polynômes, rationnelles, irrationnelles, circulaires)',
          'Suites numériques (arithmétiques, géométriques, récurrentes, limite)',
        ],
      },
      {
        label: 'Partie 2 — Géométrie',
        chapitres: [
          'Vecteurs de l\'espace, produit scalaire et vectoriel',
          'Droites et plans dans l\'espace, distances, sphères',
        ],
      },
      {
        label: 'Partie 3 — Dénombrement & Probabilités',
        chapitres: [
          'Dénombrement (arrangements A_n^p, permutations n!, combinaisons C_n^p, binôme)',
          'Probabilités (conditionnelles, indépendance, équiprobabilité)',
        ],
      },
    ],
    nbCh: 8,
    nbThm: 128,
    nbEx: 98,
  },
  {
    slug: 'sciences-tech',
    icon: '⚙️',
    titre: 'Section Sciences Techniques',
    coeff: 'Coefficient 3',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.06))',
    border: 'rgba(245,158,11,0.25)',
    tomes: [
      {
        label: 'Partie 1 — Analyse',
        chapitres: [
          'Fonctions — Généralités (domaine, parité, périodicité, valeur absolue)',
          'Limites et continuité (TVI, théorème de la bijection, asymptotes)',
          'Dérivation (dérivées usuelles, tangente, extrema)',
          'Étude de fonctions (polynômes, rationnelles, irrationnelles, circulaires)',
          'Logarithme népérien (définition, propriétés, dérivée, étude complète)',
          'Fonction exponentielle (définition, propriétés, dérivée, étude complète)',
          'Suites numériques (arithmétiques, géométriques, récurrentes, limite, récurrence)',
        ],
      },
      {
        label: 'Partie 2 — Géométrie',
        chapitres: [
          'Géométrie plane (vecteurs, droites, cercles, coniques : ellipse, hyperbole, parabole)',
          'Géométrie dans l\'espace (produit scalaire, vectoriel, droites, plans, distances)',
        ],
      },
      {
        label: 'Parties 3 & 4 — Stats & Probabilités',
        chapitres: [
          'Statistiques (nuage de points, droite de régression, coefficient de corrélation r)',
          'Dénombrement & Probabilités (arrangements, combinaisons, probabilités conditionnelles)',
        ],
      },
    ],
    nbCh: 12,
    nbThm: 108,
    nbEx: 90,
    note: '★ Coniques (ellipse, hyperbole, parabole) — spécifique Sciences Techniques',
  },
  {
    slug: 'eco-gestion',
    icon: '💹',
    titre: 'Section Économie & Gestion',
    coeff: 'Coefficient 2',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,154,114,0.06))',
    border: 'rgba(16,185,129,0.25)',
    tomes: [
      {
        label: 'Partie 1 — Analyse',
        chapitres: [
          'Fonctions — Généralités (domaine, parité, valeur absolue, restriction)',
          'Limites et continuité (TVI, théorème de la bijection, asymptotes)',
          'Dérivation (dérivées usuelles, tangente, extrema)',
          'Étude de fonctions (polynômes, rationnelles, irrationnelles, circulaires)',
          'Logarithme népérien (définition, propriétés, dérivée, étude complète)',
          'Fonction exponentielle (définition, propriétés, dérivée, étude complète)',
          'Suites numériques (arithmétiques, géométriques, récurrentes, limite)',
        ],
      },
      {
        label: 'Parties 2, 3 & 4 — Géométrie, Stats & Probabilités',
        chapitres: [
          'Géométrie dans l\'espace (vecteurs, produit scalaire, droites, plans, distances)',
          'Statistiques (nuage de points, droite de régression, coefficient r)',
          'Dénombrement & Probabilités (arrangements, combinaisons, probabilités conditionnelles)',
        ],
      },
    ],
    nbCh: 11,
    nbThm: 106,
    nbEx: 86,
    note: '★ Programme spécifique EG — sans coniques ni graphes',
  },
  {
    slug: 'informatique',
    icon: '💻',
    titre: 'Section Sciences Informatiques',
    coeff: 'Coefficient 3',
    couleur: '#6366f1',
    gradient: 'linear-gradient(135deg,rgba(99,102,241,0.14),rgba(124,58,237,0.07))',
    border: 'rgba(99,102,241,0.3)',
    isNew: true,
    tomes: [
      {
        label: 'Partie 1 — Analyse',
        chapitres: [
          'Fonctions — Généralités (domaine, parité, composée, √f)',
          'Limites et continuité (TVI, asymptotes, formes indéterminées)',
          'Dérivation (dérivées usuelles, tangente, extrema)',
          'Étude de fonctions (polynômes, rationnelles, irrationnelles, circulaires)',
          'Logarithme népérien (définition, dérivée, étude complète)',
          'Fonction exponentielle (définition, dérivée, étude complète)',
          'Suites numériques (arithmétiques, géométriques, récurrentes, récurrence)',
        ],
      },
      {
        label: 'Parties 2 & 3 — Géométrie & Probabilités',
        chapitres: [
          'Géométrie dans l\'espace (produit scalaire, droites, plans, distances)',
          'Dénombrement (arrangements, combinaisons, binôme de Newton)',
          'Probabilités (conditionnelles, indépendance, équiprobabilité)',
        ],
      },
    ],
    nbCh: 10,
    nbThm: 95,
    nbEx: 78,
    note: 'Programme officiel CNP — source : tadris.tn & bac.org.tn',
  },
]

// ──────────────────────────────────────────────────────────────
//  DONNÉES PHYSIQUE-CHIMIE — Programme officiel CNP
// ──────────────────────────────────────────────────────────────

const SECTIONS_PC = [
  {
    slug: 'maths',
    icon: '📐',
    titre: 'Section Mathématiques',
    coeff: 'Coefficient 3',
    couleur: '#4f6ef7',
    gradient: 'linear-gradient(135deg,rgba(79,110,247,0.15),rgba(124,58,237,0.08))',
    border: 'rgba(79,110,247,0.25)',
    physique: {
      label: '⚡ Physique — 3 thèmes · 8 chapitres',
      chapitres: [
        { titre: 'Mécanique', sous: 'Cinématique · Dynamique (Newton) · Satellites & Kepler' },
        { titre: 'Électricité & Électromagnétisme', sous: 'Champ électrique · Champ magnétique · Induction' },
        { titre: 'Optique', sous: 'Lentilles minces · Ondes lumineuses · Diffraction & Interférences' },
      ],
    },
    chimie: {
      label: '🧪 Chimie — 2 thèmes · 7 chapitres',
      chapitres: [
        { titre: 'Transformation de la matière', sous: 'Rédox & piles · Acide-base & pH · Cinétique · Équilibre chimique (Le Chatelier)' },
        { titre: 'Chimie organique', sous: 'Structure des molécules · Réactions organiques · Polymères' },
      ],
    },
    nbCh: 15,
    coeff_phys: 3,
    coeff_chim: 2,
  },
  {
    slug: 'sciences-exp',
    icon: '🔬',
    titre: 'Section Sciences Expérimentales',
    coeff: 'Coefficient 4',
    couleur: '#06d6a0',
    gradient: 'linear-gradient(135deg,rgba(6,214,160,0.12),rgba(5,154,114,0.06))',
    border: 'rgba(6,214,160,0.25)',
    physique: {
      label: '⚡ Physique — 7 chapitres',
      chapitres: [
        { titre: 'Dipôle RC', sous: 'Condensateur, charge/décharge, τ = RC' },
        { titre: 'Dipôle RL', sous: 'Bobine, induction, τ = L/R' },
        { titre: 'Oscillations électriques libres', sous: 'Circuit LC, T₀ = 2π√(LC)' },
        { titre: 'Oscillations mécaniques libres', sous: 'Pendule, masse-ressort, énergie mécanique' },
        { titre: 'Ondes mécaniques progressives', sous: 'Célérité, λ = vT, propagation' },
        { titre: 'Ondes lumineuses', sous: 'Diffraction, interférences (Young), spectres' },
        { titre: 'Réactions nucléaires', sous: 'Radioactivité α β γ, fission, fusion' },
      ],
    },
    chimie: {
      label: '🧪 Chimie — 5 chapitres',
      chapitres: [
        { titre: 'Cinétique chimique', sous: 'Vitesse de réaction, catalyse, suivi temporel' },
        { titre: 'Équilibres chimiques', sous: "Taux d\'avancement, Qr, K, loi de modération" },
        { titre: 'Acides et bases', sous: 'pH, Ka, pKa, dosage acide-base' },
        { titre: 'Électrochimie', sous: 'Rédox, piles, électrolyse' },
        { titre: 'Chimie organique', sous: 'Composés carbonylés, estérification, polymères' },
      ],
    },
    nbCh: 12,
    coeff_phys: 4,
    coeff_chim: 3,
  },
  {
    slug: 'sciences-tech',
    icon: '⚙️',
    titre: 'Section Sciences Techniques',
    coeff: 'Coefficient 3',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.06))',
    border: 'rgba(245,158,11,0.25)',
    physique: {
      label: '⚡ Physique — 7 chapitres',
      chapitres: [
        { titre: 'Dipôle RC', sous: 'Condensateur E=½CU², τ=RC, filtrage, temporisation' },
        { titre: 'Dipôle RL', sous: 'Bobine E=½LI², τ=L/R, lissage, protection' },
        { titre: 'Oscillations électriques libres', sous: 'Circuit LC, oscillateur, circuit accordé' },
        { titre: 'Oscillations mécaniques libres', sous: 'Pendule T=2π√(l/g), amortisseur, suspension' },
        { titre: 'Ondes mécaniques progressives', sous: 'Célérité, λ=vT, réflexion, réfraction' },
        { titre: 'Ondes lumineuses', sous: 'Diffraction, Young, laser, fibre optique' },
        { titre: 'Réactions nucléaires', sous: 'N=N₀e^(−λt), fission, fusion, centrale nucléaire' },
      ],
    },
    chimie: {
      label: '🧪 Chimie — 5 chapitres',
      chapitres: [
        { titre: 'Cinétique chimique', sous: 'Vitesse, catalyse, industrie chimique' },
        { titre: 'Équilibres chimiques', sous: "Taux d\'avancement, K, synthèse Haber/Contact" },
        { titre: 'Acides et bases', sous: 'pH, Ka, dosage, contrôle qualité' },
        { titre: 'Électrochimie', sous: 'Rédox, piles, électrolyse, corrosion, batterie' },
        { titre: 'Chimie organique', sous: 'Estérification, polymères, biocarburants' },
      ],
    },
    nbCh: 12,
    coeff_phys: 3,
    coeff_chim: 2,
  },
  {
    slug: 'informatique',
    icon: '💻',
    titre: "Section Informatique",
    coeff: 'Coefficient 3',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.12),rgba(109,40,217,0.06))',
    border: 'rgba(139,92,246,0.25)',
    physique: {
      label: "⚡ Physique — 7 chapitres",
      chapitres: [
        { titre: "Condensateur", sous: "Charge, décharge, capacité, énergie électrostatique E=½CU²" },
        { titre: "Dipôle RC", sous: "Équation différentielle, constante de temps τ=RC, intensité du courant" },
        { titre: "Bobine & Dipôle RL", sous: "Courant induit, loi de Lenz, auto-induction, τ=L/R, rupture du courant" },
        { titre: "Oscillations électriques libres", sous: "RLC amorties, LC non amorties, T₀=2π√(LC), équation différentielle" },
        { titre: "Ondes mécaniques progressives", sous: "Célérité v, retard temporel, λ=vT, types d'ondes" },
        { titre: "Ondes et optique", sous: "Diffraction, dispersion, spectres atomiques" },
        { titre: "Physique nucléaire", sous: "Noyau, radioactivité α β γ, fission, fusion, N(t)=N₀e^(-λt)" },
      ],
    },
    chimie: {
      label: "🧪 Chimie — 6 chapitres",
      chapitres: [
        { titre: "Acides-bases", sous: "Couples acide/base, dosages, titrages, pH, Ka, pKa" },
        { titre: "Cinétique chimique", sous: "Vitesse de réaction, facteurs influents, suivi temporel" },
        { titre: "Transformations chimiques", sous: "Estérification, formation d'amides, réversibilité" },
        { titre: "Équilibre chimique", sous: "Loi de Le Chatelier, constantes d'équilibre Kéq" },
        { titre: "Électrochimie", sous: "Piles électrochimiques, électrolyse, applications industrielles" },
        { titre: "Tableau d'avancement", sous: "Avancement x, taux de conversion τ, état final, rendement" },
      ],
    },
    nbCh: 13,
    coeff_phys: 3,
    coeff_chim: 2,
  },
]

// ──────────────────────────────────────────────────────────────
//  COMPOSANT CARTE SECTION MATHS
// ──────────────────────────────────────────────────────────────
function CarteMaths({ sec }: { sec: typeof SECTIONS_MATHS[0] }) {
  return (
    <div style={{
      background: sec.gradient,
      border: `1.5px solid ${sec.border}`,
      borderRadius: 20,
      padding: '28px 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {(sec as any).isNew && (
        <div style={{ position: 'absolute', top: 20, right: 20, background: 'linear-gradient(135deg,#6366f1,#a78bfa)', color: 'white', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20, letterSpacing: '0.08em' }}>
          NOUVEAU
        </div>
      )}

      {/* En-tête */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ fontSize: 38 }}>{sec.icon}</div>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'clamp(17px,2.5vw,22px)', margin: 0 }}>{sec.titre}</h2>
              <span style={{ background: `${sec.couleur}25`, color: sec.couleur, fontSize: 11, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 20 }}>{sec.coeff}</span>
            </div>
            {(sec as any).note && (
              <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic', marginTop: 2 }}>{(sec as any).note}</div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
          <span>📚 {sec.nbCh} chapitres</span>
          <span>·</span>
          <span>📐 {sec.nbThm}+ concepts</span>
          <span>·</span>
          <span>📝 {sec.nbEx}+ exercices</span>
        </div>
      </div>

      {/* Tomes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14, marginBottom: 20 }}>
        {sec.tomes.map((tome, ti) => (
          <div key={ti} style={{ background: 'rgba(0,0,0,0.15)', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: sec.couleur, marginBottom: 8 }}>
              {tome.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {tome.chapitres.map((ch, ci) => (
                <div key={ci} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>
                  <span style={{ color: sec.couleur, fontSize: 9, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span>{ch}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bouton */}
      <Link
        href={`/bac/${sec.slug}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: sec.couleur, color: 'white',
          padding: '10px 22px', borderRadius: 12,
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
          textDecoration: 'none', transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Voir tous les chapitres →
      </Link>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  COMPOSANT CARTE SECTION PHYSIQUE-CHIMIE
// ──────────────────────────────────────────────────────────────
function CartePC({ sec }: { sec: typeof SECTIONS_PC[0] }) {
  return (
    <div style={{
      background: sec.gradient,
      border: `1.5px solid ${sec.border}`,
      borderRadius: 20,
      padding: '28px 32px',
      position: 'relative',
    }}>
      {/* En-tête */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ fontSize: 38 }}>{sec.icon}</div>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'clamp(17px,2.5vw,22px)', margin: 0 }}>{sec.titre}</h2>
              <span style={{ background: `${sec.couleur}25`, color: sec.couleur, fontSize: 11, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 20 }}>
                Phys. Coeff. {sec.coeff_phys} · Chim. Coeff. {sec.coeff_chim}
              </span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
          ⚗️ {sec.physique.chapitres.length} ch. Physique · 🧪 {sec.chimie.chapitres.length} ch. Chimie
        </div>
      </div>

      {/* Physique + Chimie */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        {/* Physique */}
        <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#818cf8', marginBottom: 10 }}>
            {sec.physique.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sec.physique.chapitres.map((ch, i) => (
              <Link key={i} href={`/bac/physique/${sec.slug}/${ch.titre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`}
                style={{ textDecoration:'none', display:'block' }}>
                <div style={{ fontSize: 11, padding:'3px 6px', borderRadius:6, cursor:'pointer', transition:'background 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(99,102,241,0.1)'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent'}}>
                  <span style={{ color: '#818cf8', fontWeight: 600 }}>{ch.titre} →</span>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: 10, marginTop: 1, lineHeight: 1.4 }}>{ch.sous}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Chimie */}
        <div style={{ background: 'rgba(6,214,160,0.06)', border: '1px solid rgba(6,214,160,0.2)', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#06d6a0', marginBottom: 10 }}>
            {sec.chimie.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sec.chimie.chapitres.map((ch, i) => (
              <div key={i} style={{ fontSize: 11 }}>
                <span style={{ color: '#06d6a0', fontWeight: 600 }}>{ch.titre}</span>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: 10, marginTop: 1, lineHeight: 1.4 }}>{ch.sous}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bouton */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link
          href={`/bac/physique/${sec.slug}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: 'white',
            padding: '9px 20px', borderRadius: 11,
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          📚 Cours complets →
        </Link>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  PAGE PRINCIPALE
// ──────────────────────────────────────────────────────────────
export default function BacTunisiePage() {
  const [matiere, setMatiere] = useState<Matiere>(null)

  // ── PAGE INTERMÉDIAIRE ──────────────────────────────────────
  if (matiere === null) {
    return (
      <>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1, paddingTop: 80, minHeight: '100vh' }}>
          <div className="container" style={{ paddingTop: 64, paddingBottom: 80, maxWidth: 960 }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
                🇹🇳 Programme officiel CNP Tunisie
              </span>
              <h1 style={{ fontSize: 'clamp(28px,4vw,50px)', marginBottom: 16, lineHeight: 1.15 }}>
                Bac Tunisie — 4ème Année<br />
                <span style={{ background: 'linear-gradient(90deg,#4f6ef7,#06d6a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Choisissez votre matière
                </span>
              </h1>
              <p style={{ color: 'var(--text2)', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                Tous les chapitres du programme officiel CNP, théorèmes, définitions, formules et exercices type Bac.
              </p>
            </div>

            {/* Cartes matières */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 52 }}>

              {/* MATHÉMATIQUES */}
              <button
                onClick={() => setMatiere('maths')}
                style={{ padding: '36px 28px', background: 'rgba(79,110,247,0.06)', border: '1.5px solid rgba(79,110,247,0.22)', borderRadius: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(79,110,247,0.55)'; e.currentTarget.style.background = 'rgba(79,110,247,0.11)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(79,110,247,0.22)'; e.currentTarget.style.background = 'rgba(79,110,247,0.06)' }}
              >
                <div style={{ fontSize: 52, marginBottom: 14 }}>📐</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: '#818cf8' }}>Mathématiques</h2>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 18px' }}>
                  Analyse · Algèbre · Géométrie · Probabilités<br />
                  5 sections : Maths · Sc.Exp · Sc.Tech · EG · Info
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                  {['Sc. Maths', 'Sc. Exp', 'Sc. Tech', 'Éco-Gestion', 'Informatique'].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, background: 'rgba(79,110,247,0.12)', color: '#818cf8', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#818cf8', fontWeight: 700, fontSize: 13 }}>
                  Voir les programmes →
                </span>
              </button>

              {/* PHYSIQUE-CHIMIE */}
              <button
                onClick={() => setMatiere('physique-chimie')}
                style={{ padding: '36px 28px', background: 'rgba(6,214,160,0.06)', border: '1.5px solid rgba(6,214,160,0.22)', borderRadius: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(6,214,160,0.55)'; e.currentTarget.style.background = 'rgba(6,214,160,0.11)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(6,214,160,0.22)'; e.currentTarget.style.background = 'rgba(6,214,160,0.06)' }}
              >
                <div style={{ fontSize: 52, marginBottom: 14 }}>⚗️</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: '#06d6a0' }}>Physique-Chimie</h2>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 18px' }}>
                  Physique · Chimie — Programme complet<br />
                  4 sections : Maths · Sc.Exp · Sc.Tech · EG
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                  {['Sc. Maths', 'Sc. Exp', 'Sc. Tech', 'Éco-Gestion'].map(t => (
                    <span key={t} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 20, background: 'rgba(6,214,160,0.12)', color: '#06d6a0', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#06d6a0', fontWeight: 700, fontSize: 13 }}>
                  Voir les programmes →
                </span>
              </button>

              {/* SVT */}
              <button
                disabled
                style={{ padding: '36px 28px', background: 'rgba(255,255,255,0.02)', border: '1.5px solid rgba(255,255,255,0.07)', borderRadius: 20, cursor: 'not-allowed', textAlign: 'left', fontFamily: 'var(--font-body)', opacity: 0.42 }}
              >
                <div style={{ fontSize: 52, marginBottom: 14 }}>🌱</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: 'var(--muted)' }}>SVT</h2>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 18px' }}>
                  Sciences de la Vie et de la Terre<br />
                  Bientôt disponible
                </p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', fontSize: 12, fontWeight: 600 }}>
                  🚧 En construction
                </span>
              </button>
            </div>

            {/* Stats globales */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 40 }}>
              {[
                { num: '5', label: 'Sections', icon: '🎓' },
                { num: '57+', label: 'Chapitres Maths', icon: '📐' },
                { num: '45+', label: 'Chapitres PC', icon: '⚗️' },
                { num: '500+', label: 'Exercices', icon: '📝' },
              ].map(s => (
                <div key={s.label} className="card" style={{ textAlign: 'center', padding: '16px 10px' }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--accent)' }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Lien vers examens */}
            <div style={{ textAlign: 'center', paddingTop: 28, borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>Prêt pour le Bac ?</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/examens" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  📋 Examens Bac Tunisie →
                </Link>
                <Link href="/chat" className="btn btn-ghost" style={{ textDecoration: 'none' }}>
                  🤖 Chat IA →
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── PAGE MATHÉMATIQUES ──────────────────────────────────────
  if (matiere === 'maths') {
    return (
      <>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

            {/* Header avec retour */}
            <div style={{ marginBottom: 40 }}>
              <button
                onClick={() => setMatiere(null)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 16, transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,110,247,0.45)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                ← Toutes les matières
              </button>
              <span className="label" style={{ marginBottom: 12, display: 'block' }}>
                🇹🇳 Programme officiel CNP Tunisie — 📐 Mathématiques
              </span>
              <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 12 }}>
                Mathématiques — Toutes Sections<br />
                <span style={{ color: 'var(--accent)' }}>Bac 4ème Année Secondaire</span>
              </h1>
              <p style={{ maxWidth: 580, color: 'var(--text2)', marginBottom: 20 }}>
                Programme officiel CNP mis à jour — Analyse · Algèbre · Géométrie · Probabilités · Graphes.
                Théorèmes, définitions, formules et exercices type Bac.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link href="/examens" className="btn btn-secondary" style={{ textDecoration: 'none' }}>📋 Examens Bac</Link>
                <Link href="/chat" className="btn btn-ghost" style={{ textDecoration: 'none' }}>🤖 Chat IA →</Link>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 48 }}>
              {[
                { num: '5', label: 'Sections', icon: '🎓' },
                { num: '57+', label: 'Chapitres', icon: '📚' },
                { num: '547+', label: 'Concepts', icon: '📐' },
                { num: '442+', label: 'Exercices', icon: '📝' },
              ].map(s => (
                <div key={s.label} className="card" style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--accent)' }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Sections Maths */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {SECTIONS_MATHS.map(sec => (
                <CarteMaths key={sec.slug} sec={sec} />
              ))}
            </div>

            {/* CTA bas */}
            <div style={{ marginTop: 52, background: 'linear-gradient(135deg,rgba(79,110,247,0.1),rgba(124,58,237,0.1))', border: '1px solid rgba(79,110,247,0.2)', borderRadius: 20, padding: 40, textAlign: 'center' }}>
              <h3 style={{ marginBottom: 12 }}>Prêt pour la simulation Bac ? 🎓</h3>
              <p style={{ marginBottom: 24, maxWidth: 400, margin: '0 auto 24px', color: 'var(--text2)' }}>
                Teste-toi avec un vrai sujet de Bac — chrono, correction automatique et note estimée.
              </p>
              <Link href="/examens" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>Passer une simulation →</Link>
            </div>

            {/* Switcher vers PC */}
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <button
                onClick={() => setMatiere('physique-chimie')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', transition: 'all 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(6,214,160,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                ⚗️ Voir Physique-Chimie →
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <style>{`
          @media(max-width:700px){
            div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
            div[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>
      </>
    )
  }

  // ── PAGE PHYSIQUE-CHIMIE ────────────────────────────────────
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Header avec retour */}
          <div style={{ marginBottom: 40 }}>
            <button
              onClick={() => setMatiere(null)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 9, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 16, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(6,214,160,0.45)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              ← Toutes les matières
            </button>
            <span className="label" style={{ marginBottom: 12, display: 'block' }}>
              🇹🇳 Programme officiel CNP Tunisie — ⚗️ Physique-Chimie
            </span>
            <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 12 }}>
              Physique-Chimie — Toutes Sections<br />
              <span style={{ color: '#06d6a0' }}>Bac 4ème Année Secondaire</span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', marginBottom: 20 }}>
              Programme officiel CNP — Physique (Mécanique · Électromagnétisme · Optique · Oscillations · Ondes · Nucléaire)
              et Chimie (Cinétique · Équilibres · Acides-bases · Électrochimie · Organique).
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/examens" className="btn btn-secondary" style={{ textDecoration: 'none' }}>📋 Examens Bac</Link>
              <Link href="/chat" className="btn btn-ghost" style={{ textDecoration: 'none' }}>🤖 Chat IA →</Link>
            </div>
          </div>

          {/* Légende coefficients */}
          <div style={{ background: 'rgba(6,214,160,0.06)', border: '1px solid rgba(6,214,160,0.2)', borderRadius: 14, padding: '14px 20px', marginBottom: 36, display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, color: 'var(--text2)' }}>
            <div><span style={{ color: '#818cf8', fontWeight: 700 }}>⚡ Physique</span> — coefficients selon la section</div>
            <div><span style={{ color: '#06d6a0', fontWeight: 700 }}>🧪 Chimie</span> — coefficients selon la section</div>
            <div style={{ color: 'var(--muted)', fontSize: 11 }}>Section Sc.Exp = plus fort coefficient global en PC</div>
          </div>

          {/* Sections PC */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {SECTIONS_PC.map(sec => (
              <CartePC key={sec.slug} sec={sec} />
            ))}
          </div>

          {/* Note programme */}
          <div style={{ marginTop: 40, background: 'rgba(6,214,160,0.05)', border: '1px solid rgba(6,214,160,0.18)', borderRadius: 14, padding: '16px 22px' }}>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
              <strong style={{ color: '#06d6a0' }}>ℹ️ Programme officiel CNP</strong> — Toutes les sections partagent un tronc commun en Physique
              (Dipôle RC/RL, oscillations, ondes, nucléaire) et en Chimie (cinétique, équilibres, acides-bases, électrochimie, organique).
              La section Mathématiques ajoute la Mécanique, l'Électromagnétisme et l'Optique géométrique.
            </p>
          </div>

          {/* Switcher vers Maths */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button
              onClick={() => setMatiere('maths')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', transition: 'all 0.18s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,110,247,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              📐 Voir Mathématiques →
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:700px){
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  )
}