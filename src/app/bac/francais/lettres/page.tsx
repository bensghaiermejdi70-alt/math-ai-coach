'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// FRANÇAIS TUNISIE — Section Lettres · Page index des modules
// Route : /bac/francais/lettres
// Programme officiel MEN Tunisie · 4ème Lettres
// ══════════════════════════════════════════════════════════════════════

const MODULES = [

  // ── MODULE 1 ──────────────────────────────────────────────────────
  {
    id: 'partage',
    num: '1',
    titre: 'Le Partage',
    couleur: '#ec4899',
    icone: '🤝',
    tag: 'Module 1',
    souschap: [
      { titre: 'Thèmes & axes', notions: ['Solidarité', 'Tolérance', 'Vivre ensemble', 'Dialogue des cultures', 'Respect de l\'autre'] },
      { titre: 'Types de textes', notions: ['Texte argumentatif', 'Article de presse', 'Témoignage', 'Essai'] },
      { titre: 'Auteurs étudiés', notions: ['Albert Camus', 'Amin Maalouf', 'Tahar Ben Jelloun'] },
    ],
    axes: [
      'Le partage rapproche les peuples',
      'La solidarité réduit les conflits',
      'La communication favorise la paix',
      'Le rejet de l\'autre crée la violence',
    ],
    textes: ['« Le racisme expliqué à ma fille »', 'Textes sur la tolérance et la coexistence', 'Articles sur les relations humaines'],
  },

  // ── MODULE 2 ──────────────────────────────────────────────────────
  {
    id: 'engagement-litterature',
    num: '2',
    titre: 'L\'Engagement en Littérature',
    couleur: '#7c3aed',
    icone: '✊',
    tag: 'Module 2',
    souschap: [
      { titre: 'Thèmes & axes', notions: ['Liberté', 'Justice', 'Défense des droits humains', 'Refus de l\'oppression', 'Engagement de l\'écrivain'] },
      { titre: 'Types de textes', notions: ['Discours', 'Roman engagé', 'Poésie engagée', 'Essai philosophique'] },
      { titre: 'Auteurs & œuvres', notions: ['Victor Hugo', 'Voltaire', 'Jean-Paul Sartre', 'Émile Zola'] },
    ],
    axes: [
      'L\'écrivain doit défendre la vérité',
      'La littérature peut changer la société',
      'L\'art doit dénoncer l\'injustice',
      'La parole est une arme contre l\'oppression',
    ],
    textes: ['« J\'accuse » (Zola)', 'Extraits des « Misérables » (Hugo)', 'Textes contre l\'injustice sociale', 'Discours humanistes'],
  },

  // ── MODULE 3 ──────────────────────────────────────────────────────
  {
    id: 'appel-modernite',
    num: '3',
    titre: 'L\'Appel de la Modernité',
    couleur: '#0891b2',
    icone: '🔬',
    tag: 'Module 3',
    souschap: [
      { titre: 'Thèmes & axes', notions: ['Technologie', 'Modernisation', 'Science', 'Évolution des sociétés', 'Tradition et modernité'] },
      { titre: 'Types de textes', notions: ['Texte explicatif', 'Texte critique', 'Essai', 'Débat d\'idées'] },
      { titre: 'Auteurs étudiés', notions: ['Denis Diderot', 'Jean-Jacques Rousseau', 'Albert Jacquard'] },
    ],
    axes: [
      'Le progrès améliore la vie humaine',
      'La technologie peut isoler l\'homme',
      'La modernité transforme les valeurs',
      'Il faut équilibrer tradition et progrès',
    ],
    textes: ['Internet et société', 'Les dangers des nouvelles technologies', 'L\'impact du progrès scientifique'],
  },

  // ── MODULE 4 ──────────────────────────────────────────────────────
  {
    id: 'lumiere-raison',
    num: '4',
    titre: 'À la Lumière de la Raison',
    couleur: '#d97706',
    icone: '💡',
    tag: 'Module 4',
    souschap: [
      { titre: 'Thèmes & axes', notions: ['Esprit critique', 'Raison', 'Science', 'Philosophie des Lumières', 'Liberté de pensée'] },
      { titre: 'Types de textes', notions: ['Texte philosophique', 'Essai argumentatif', 'Texte réflexif'] },
      { titre: 'Auteurs étudiés', notions: ['Montesquieu', 'Voltaire', 'Denis Diderot'] },
    ],
    axes: [
      'La raison combat l\'ignorance',
      'L\'éducation libère l\'homme',
      'La pensée critique protège la société',
      'La science développe les civilisations',
    ],
    textes: ['Textes des Lumières', 'Réflexions sur la liberté', 'Critique des préjugés'],
  },

  // ── MODULE 5 — POÉSIE ─────────────────────────────────────────────
  {
    id: 'poesie',
    num: '5',
    titre: 'La Poésie',
    couleur: '#e11d48',
    icone: '🌸',
    tag: 'Module 5',
    souschap: [
      { titre: 'Types de poésie', notions: ['Poésie lyrique', 'Poésie engagée', 'Poésie moderne'] },
      { titre: 'Figures de style', notions: ['Métaphore', 'Comparaison', 'Symbolisme', 'Musicalité', 'Images poétiques'] },
      { titre: 'Poètes étudiés', notions: ['Charles Baudelaire', 'Arthur Rimbaud', 'Paul Éluard', 'Alphonse de Lamartine'] },
    ],
    axes: [
      'Expression des sentiments',
      'Souffrance humaine',
      'Beauté du monde',
      'Révolte et engagement',
    ],
    textes: ['« Liberté » (Éluard)', 'Poèmes lyriques et engagés', 'Extraits des « Fleurs du mal »'],
  },

  // ── MODULE 6 — LANGUE ─────────────────────────────────────────────
  {
    id: 'langue-expression',
    num: '6',
    titre: 'Langue & Techniques d\'Expression',
    couleur: '#059669',
    icone: '📝',
    tag: 'Module 6',
    souschap: [
      { titre: 'Grammaire', notions: ['Connecteurs logiques', 'Subordination', 'Modalisation', 'Types de phrases'] },
      { titre: 'Lexique & Styles', notions: ['Champ lexical', 'Registres de langue', 'Figures de style', 'Argumentation'] },
      { titre: 'Méthodologie', notions: ['Résumé', 'Synthèse', 'Dissertation', 'Commentaire composé'] },
    ],
    axes: [
      'Connecter les idées avec logique',
      'Adapter le registre au contexte',
      'Utiliser les figures de style',
      'Structurer une argumentation',
    ],
    textes: ['Exercices de connecteurs', 'Analyses stylistiques', 'Méthodologie dissertation'],
  },

  // ── MODULE 7 — PRODUCTION ÉCRITE ─────────────────────────────────
  {
    id: 'production-ecrite',
    num: '7',
    titre: 'Production Écrite',
    couleur: '#7c3aed',
    icone: '✍️',
    tag: 'Module 7',
    souschap: [
      { titre: 'Exercices du Bac', notions: ['Essai argumentatif', 'Commentaire littéraire', 'Résumé de texte', 'Sujet de réflexion'] },
      { titre: 'Structure & Méthode', notions: ['Introduction', 'Problématique', 'Développement argumenté', 'Conclusion'] },
      { titre: 'Types d\'arguments', notions: ['Arguments logiques', 'Arguments d\'exemples', 'Arguments d\'autorité', 'Arguments affectifs'] },
    ],
    axes: [
      'Construire une problématique solide',
      'Développer des arguments convaincants',
      'Illustrer avec des exemples précis',
      'Rédiger une conclusion efficace',
    ],
    textes: ['Sujets type Bac', 'Dissertations corrigées', 'Essais commentés'],
  },

  // ── MODULE 8 — CULTURE LITTÉRAIRE ────────────────────────────────
  {
    id: 'culture-litteraire',
    num: '8',
    titre: 'Culture Littéraire',
    couleur: '#b45309',
    icone: '📖',
    tag: 'Module 8',
    souschap: [
      { titre: 'Mouvements littéraires', notions: ['Humanisme', 'Classicisme', 'Lumières', 'Romantisme', 'Réalisme', 'Symbolisme'] },
      { titre: 'Genres littéraires', notions: ['Roman', 'Théâtre', 'Poésie', 'Essai'] },
      { titre: 'Objectifs', notions: ['Analyse critique', 'Comprendre les auteurs', 'Culture littéraire solide'] },
    ],
    axes: [
      'Situer une œuvre dans son contexte',
      'Identifier les caractéristiques d\'un mouvement',
      'Analyser le style d\'un auteur',
      'Construire une culture littéraire',
    ],
    textes: ['Extraits d\'œuvres classiques', 'Biographies d\'auteurs', 'Analyses de mouvements'],
  },
]

export default function FrancaisLettresPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* FIL D'ARIANE */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/francais" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Français</Link>
            <span>›</span>
            <span style={{ color: '#ec4899' }}>Section Lettres</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 36 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
              🇹🇳 Programme officiel MEN Tunisie · Français Section Lettres
            </span>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,44px)', marginBottom: 12 }}>
              Français — Section Lettres<br />
              <span style={{ background: 'linear-gradient(90deg,#ec4899,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                4ème Année · Bac Tunisie
              </span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel CNP · Français · Section Lettres · Baccalauréat Tunisie.
              8 modules · Littérature engagée · Poésie · Production écrite · Auteurs classiques.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📚 8 modules</span><span>·</span>
              <span>✊ Littérature engagée</span><span>·</span>
              <span>🌸 Poésie lyrique</span><span>·</span>
              <span>🤖 Solveur IA intégré</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#ec4899,#db2777)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                ✍️ Solveur IA
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)', color: '#f472b6', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation Bac
              </Link>
            </div>
          </div>

          {/* MODULES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {MODULES.map(ch => (
              <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{ch.icone}</div>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                        <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>Lettres</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.souschap.length} parties · {ch.axes.length} axes d'argumentation</div>
                    </div>
                  </div>
                  <Link href={`/bac/francais/lettres/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                    📖 Cours complet →
                  </Link>
                </div>
                <div style={{ padding: '14px 22px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8, marginBottom: 12 }}>
                    {ch.souschap.map(sc => (
                      <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '10px 13px' }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: ch.couleur, marginBottom: 5 }}>{sc.titre}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {sc.notions.map(n => (
                            <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Axes d'argumentation */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {ch.axes.map(a => (
                      <div key={a} style={{ background: `${ch.couleur}10`, border: `1px solid ${ch.couleur}22`, borderRadius: 8, padding: '5px 11px', fontSize: 11, color: ch.couleur, fontWeight: 600 }}>
                        💬 {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac/francais/scientifique" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.08)', color: '#a78bfa', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              🔬 Section Scientifiques →
            </Link>
            <Link href="/bac/francais" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              ↑ Toutes les sections
            </Link>
            <Link href="/bac" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'var(--muted)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              ← Toutes matières
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}