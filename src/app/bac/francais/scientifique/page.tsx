'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// FRANÇAIS TUNISIE — Sections Scientifiques · Page index des modules
// Route : /bac/francais/scientifique
// Concerne : Maths · Sc.Exp · Sc.Tech · Informatique · Éco-Gestion
// ══════════════════════════════════════════════════════════════════════

const MODULES = [

  // ── MODULE 1 ──────────────────────────────────────────────────────
  {
    id: 'science-progres',
    num: '1',
    titre: 'Science et Progrès',
    couleur: '#8b5cf6',
    icone: '🔭',
    tag: 'Module 1',
    souschap: [
      { titre: 'Thèmes & axes', notions: ['Développement scientifique', 'Technologie', 'Intelligence humaine', 'Modernisation', 'Impact des découvertes'] },
      { titre: 'Types de textes', notions: ['Texte explicatif', 'Texte argumentatif', 'Article scientifique', 'Essai'] },
      { titre: 'Auteurs étudiés', notions: ['Albert Jacquard', 'Hubert Reeves', 'Rabelais'] },
    ],
    axes: [
      'La science améliore les conditions de vie',
      'Le progrès scientifique facilite la communication',
      'La technologie transforme la société',
      'Le progrès peut aussi créer des dangers',
    ],
    textes: ['Réflexions sur la science', 'Textes sur la technologie moderne', 'Articles scientifiques simplifiés'],
  },

  // ── MODULE 2 ──────────────────────────────────────────────────────
  {
    id: 'homme-nature',
    num: '2',
    titre: 'L\'Homme et la Nature',
    couleur: '#059669',
    icone: '🌿',
    tag: 'Module 2',
    souschap: [
      { titre: 'Thèmes & axes', notions: ['Protection de l\'environnement', 'Pollution', 'Écologie', 'Relation homme-nature', 'Développement durable'] },
      { titre: 'Types de textes', notions: ['Texte descriptif', 'Texte argumentatif', 'Article écologique', 'Témoignage'] },
      { titre: 'Auteurs étudiés', notions: ['Jean Giono', 'Nicolas Hulot', 'Albert Camus'] },
    ],
    axes: [
      'L\'homme détruit son environnement',
      'La pollution menace la planète',
      'Il faut protéger les ressources naturelles',
      'Le développement durable est nécessaire',
    ],
    textes: ['« L\'homme qui plantait des arbres »', 'Articles sur la pollution', 'Textes sur les catastrophes écologiques'],
  },

  // ── MODULE 3 ──────────────────────────────────────────────────────
  {
    id: 'communication-medias',
    num: '3',
    titre: 'Communication et Médias',
    couleur: '#0891b2',
    icone: '📡',
    tag: 'Module 3',
    souschap: [
      { titre: 'Thèmes & axes', notions: ['Médias modernes', 'Réseaux sociaux', 'Internet', 'Information', 'Influence des médias'] },
      { titre: 'Types de textes', notions: ['Texte argumentatif', 'Débat', 'Article de presse', 'Texte critique'] },
      { titre: 'Auteurs étudiés', notions: ['Marshall McLuhan', 'Umberto Eco'] },
    ],
    axes: [
      'Les médias rapprochent les peuples',
      'Internet facilite l\'accès au savoir',
      'Les réseaux sociaux peuvent manipuler',
      'L\'excès des médias peut isoler l\'homme',
    ],
    textes: ['Les avantages d\'Internet', 'Les dangers des réseaux sociaux', 'Les fake news'],
  },

  // ── MODULE 4 ──────────────────────────────────────────────────────
  {
    id: 'tolerance-humanisme',
    num: '4',
    titre: 'Tolérance et Humanisme',
    couleur: '#d97706',
    icone: '🕊️',
    tag: 'Module 4',
    souschap: [
      { titre: 'Thèmes & axes', notions: ['Respect de l\'autre', 'Tolérance', 'Liberté', 'Paix', 'Dialogue des cultures'] },
      { titre: 'Types de textes', notions: ['Texte humaniste', 'Discours', 'Essai', 'Témoignage'] },
      { titre: 'Auteurs étudiés', notions: ['Voltaire', 'Amin Maalouf', 'Tahar Ben Jelloun'] },
    ],
    axes: [
      'La tolérance favorise la paix',
      'Le racisme détruit les sociétés',
      'Le dialogue évite les conflits',
      'L\'éducation développe l\'humanisme',
    ],
    textes: ['« Traité sur la tolérance »', '« Le racisme expliqué à ma fille »', 'Discours humanistes'],
  },

  // ── MODULE 5 ──────────────────────────────────────────────────────
  {
    id: 'litterature-engagee',
    num: '5',
    titre: 'La Littérature Engagée',
    couleur: '#dc2626',
    icone: '✊',
    tag: 'Module 5',
    souschap: [
      { titre: 'Thèmes & axes', notions: ['Justice', 'Liberté', 'Engagement de l\'écrivain', 'Défense des droits humains'] },
      { titre: 'Types de textes', notions: ['Roman engagé', 'Discours', 'Poésie engagée', 'Article d\'opinion'] },
      { titre: 'Auteurs étudiés', notions: ['Victor Hugo', 'Émile Zola', 'Jean-Paul Sartre'] },
    ],
    axes: [
      'L\'écrivain doit défendre les opprimés',
      'La littérature peut changer les mentalités',
      'L\'art combat l\'injustice',
      'Les mots ont un pouvoir social',
    ],
    textes: ['« J\'accuse »', 'Extraits des « Misérables »', 'Textes contre les injustices sociales'],
  },

  // ── MODULE 6 — POÉSIE ─────────────────────────────────────────────
  {
    id: 'poesie-scientifique',
    num: '6',
    titre: 'La Poésie',
    couleur: '#e11d48',
    icone: '🌸',
    tag: 'Module 6',
    souschap: [
      { titre: 'Types de poésie', notions: ['Poésie lyrique', 'Poésie moderne', 'Poésie engagée'] },
      { titre: 'Notions & Figures', notions: ['Métaphore', 'Comparaison', 'Symboles', 'Musicalité', 'Figures de style'] },
      { titre: 'Poètes étudiés', notions: ['Charles Baudelaire', 'Paul Éluard', 'Arthur Rimbaud'] },
    ],
    axes: [
      'Expression des émotions',
      'Engagement du poète',
      'Beauté poétique',
      'Révolte et souffrance',
    ],
    textes: ['« Liberté » (Éluard)', 'Poèmes modernes', 'Extraits des « Fleurs du mal »'],
  },

  // ── MODULE 7 — LANGUE ─────────────────────────────────────────────
  {
    id: 'langue-expression-scientifique',
    num: '7',
    titre: 'Langue & Techniques d\'Expression',
    couleur: '#059669',
    icone: '📝',
    tag: 'Module 7',
    souschap: [
      { titre: 'Grammaire', notions: ['Connecteurs logiques', 'Modalisation', 'Subordination', 'Discours rapporté'] },
      { titre: 'Lexique', notions: ['Champ lexical', 'Registres de langue', 'Figures de style'] },
      { titre: 'Méthodologie', notions: ['Résumé', 'Synthèse', 'Essai argumentatif', 'Commentaire'] },
    ],
    axes: [
      'Maîtriser les connecteurs logiques',
      'Adapter le registre de langue',
      'Construire un résumé efficace',
      'Structurer un essai argumentatif',
    ],
    textes: ['Exercices de grammaire', 'Textes à résumer', 'Essais guidés'],
  },

  // ── MODULE 8 — PRODUCTION ÉCRITE ─────────────────────────────────
  {
    id: 'production-ecrite-scientifique',
    num: '8',
    titre: 'Production Écrite',
    couleur: '#7c3aed',
    icone: '✍️',
    tag: 'Module 8',
    souschap: [
      { titre: 'Exercices du Bac', notions: ['Sujet de réflexion', 'Essai argumentatif', 'Résumé', 'Production personnelle'] },
      { titre: 'Méthode', notions: ['Introduction', 'Problématique', 'Arguments', 'Exemples', 'Conclusion'] },
      { titre: 'Types d\'arguments', notions: ['Argument logique', 'Argument d\'autorité', 'Exemple concret', 'Analogie', 'Argument affectif'] },
    ],
    axes: [
      'Rédiger une introduction percutante',
      'Développer des arguments structurés',
      'Illustrer avec des exemples scientifiques',
      'Conclure en élargissant la réflexion',
    ],
    textes: ['Sujets type Bac scientifique', 'Essais corrigés', 'Modèles de production'],
  },
]

const SECTIONS_CONCERNEES = [
  { label: '📐 Mathématiques', color: '#f59e0b' },
  { label: '🔬 Sciences Expérimentales', color: '#06b6d4' },
  { label: '⚙️ Sciences Techniques', color: '#10b981' },
  { label: '💻 Informatique', color: '#8b5cf6' },
  { label: '📊 Économie & Gestion', color: '#ec4899' },
]

export default function FrancaisScientifiquePage() {
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
            <span style={{ color: '#8b5cf6' }}>Sections Scientifiques</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 36 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>
              🇹🇳 Programme officiel MEN Tunisie · Français Sections Scientifiques
            </span>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,44px)', marginBottom: 12 }}>
              Français — Sections Scientifiques<br />
              <span style={{ background: 'linear-gradient(90deg,#8b5cf6,#0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                4ème Année · Bac Tunisie
              </span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel CNP · Français · Toutes sections scientifiques.
              8 modules · Science & Progrès · Environnement · Médias · Tolérance · Production écrite.
            </p>
            {/* Sections concernées */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
              {SECTIONS_CONCERNEES.map(s => (
                <span key={s.label} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30`, fontWeight: 600 }}>
                  {s.label}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                ✍️ Solveur IA
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
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
                        <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>Scientifiques</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.souschap.length} parties · {ch.axes.length} axes d'argumentation</div>
                    </div>
                  </div>
                  <Link href={`/bac/francais/scientifique/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
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
            <Link href="/bac/francais/lettres" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.08)', color: '#f472b6', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              ← Section Lettres
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