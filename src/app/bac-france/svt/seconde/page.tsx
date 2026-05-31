'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// SVT FRANCE — Classe de Seconde
// Route : /bac-france/svt/seconde
// Programme officiel MEN 2026 · Enseignement commun
// 3 grands thèmes · 9 chapitres
// ══════════════════════════════════════════════════════════════════════

const COULEUR = '#22c55e'

const THEMES = [
  {
    tag: 'La Terre, la vie & le vivant',
    couleur: '#22c55e',
    iconeTheme: '🔬',
    chapitres: [
      {
        id: 'cellules-seconde',
        num: '1',
        titre: 'L\'organisme pluricellulaire — cellules spécialisées',
        icone: '🔬',
        tag: 'La Terre, la vie & le vivant',
        souschap: [
          { titre: 'La cellule animale et végétale', notions: ['Membrane plasmique','Noyau','Cytoplasme','Organites','Chloroplastes (végétaux)','Vacuoles (végétaux)'] },
          { titre: 'Différenciation cellulaire', notions: ['ADN commun','Expression différentielle','Tissu & organe','Spécialisation morphologique'] },
          { titre: 'Observation microscopique', notions: ['Microscope optique','Préparations histologiques','Coloration (Lugol, Bleu de méthylène)','Schémas biologiques'] },
        ],
        notionsCles: ['Cellule','ADN','Différenciation','Tissu','Organe','Organites'],
      },
      {
        id: 'metabolisme-seconde',
        num: '2',
        titre: 'Le métabolisme des cellules',
        icone: '⚡',
        tag: 'La Terre, la vie & le vivant',
        souschap: [
          { titre: 'Respiration cellulaire', notions: ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP','Mitochondrie','Hétérotrophe','Consommation O₂'] },
          { titre: 'Photosynthèse', notions: ['6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂','Chloroplaste','Autotrophe','Chlorophylle','Lumière & CO₂'] },
          { titre: 'ATP et énergie cellulaire', notions: ['ATP = énergie universelle','Production d\'ATP','Métabolisme autotrophe vs hétérotrophe','Enzymes'] },
        ],
        notionsCles: ['Respiration cellulaire','Photosynthèse','ATP','Autotrophe','Hétérotrophe','Enzyme'],
        formules: [
          { f: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP', desc: 'Équation de la respiration cellulaire' },
          { f: '6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂', desc: 'Équation bilan de la photosynthèse' },
        ],
      },
      {
        id: 'biodiversite-evolution-seconde',
        num: '3',
        titre: 'Biodiversité et évolution',
        icone: '🌿',
        tag: 'La Terre, la vie & le vivant',
        souschap: [
          { titre: 'Échelles de la biodiversité', notions: ['Diversité génétique','Diversité spécifique','Diversité des écosystèmes','Inventaire du vivant'] },
          { titre: 'Forces évolutives', notions: ['Sélection naturelle (Darwin)','Dérive génétique','Mutation','Adaptation des espèces'] },
          { titre: 'Évolution & fossiles', notions: ['Fossiles stratigraphiques','Arbres phylogénétiques','Comparaison d\'espèces','Homologie anatomique'] },
        ],
        notionsCles: ['Biodiversité','Sélection naturelle','Dérive génétique','Fossile','Phylogénie','Mutation'],
      },
      {
        id: 'communication-selection-sexuelle',
        num: '4',
        titre: 'Communication intraspécifique & sélection sexuelle',
        icone: '🦚',
        tag: 'La Terre, la vie & le vivant',
        souschap: [
          { titre: 'Signaux de communication', notions: ['Signaux chimiques (phéromones)','Signaux sonores','Signaux visuels','Comportement animal'] },
          { titre: 'Sélection sexuelle', notions: ['Parade nuptiale','Choix du partenaire','Dimorphisme sexuel','Investissement parental'] },
        ],
        notionsCles: ['Phéromones','Sélection sexuelle','Parade nuptiale','Communication animale'],
      },
    ],
  },
  {
    tag: 'Enjeux contemporains de la planète',
    couleur: '#f59e0b',
    iconeTheme: '🌍',
    chapitres: [
      {
        id: 'geosciences-paysages',
        num: '5',
        titre: 'Géosciences & dynamique des paysages',
        icone: '🏔️',
        tag: 'Enjeux contemporains',
        souschap: [
          { titre: 'Érosion et transport', notions: ['Altération des roches','Transport sédimentaire','Sédimentation','Formation des paysages','Action de l\'eau'] },
          { titre: 'Cartes géologiques', notions: ['Lecture de cartes','Relief terrestre','Dynamique des rivières','Milieux sédimentaires'] },
        ],
        notionsCles: ['Érosion','Sédimentation','Altération','Paysage','Roches'],
      },
      {
        id: 'erosion-humaine',
        num: '6',
        titre: 'Érosion & activité humaine',
        icone: '🏭',
        tag: 'Enjeux contemporains',
        souschap: [
          { titre: 'Impact humain sur les sols', notions: ['Déforestation','Urbanisation','Agriculture intensive','Pollution des sols'] },
          { titre: 'Risques naturels', notions: ['Gestion des risques','Inondations','Glissements de terrain','Protection des sols'] },
        ],
        notionsCles: ['Déforestation','Pollution','Risques naturels','Développement durable'],
      },
      {
        id: 'agrosystemes',
        num: '7',
        titre: 'Agrosystèmes & développement durable',
        icone: '🌾',
        tag: 'Enjeux contemporains',
        souschap: [
          { titre: 'Fonctionnement des agrosystèmes', notions: ['Production de biomasse','Sols agricoles','Engrais organiques & minéraux','Biodiversité agricole'] },
          { titre: 'Gestion durable', notions: ['Agriculture raisonnée','Agroécologie','Fertilité des sols','Nourrir la population'] },
        ],
        notionsCles: ['Agrosystème','Biomasse','Fertilité','Agriculture durable','Biodiversité agricole'],
      },
    ],
  },
  {
    tag: 'Corps humain & santé',
    couleur: '#ec4899',
    iconeTheme: '🏥',
    chapitres: [
      {
        id: 'fecondation-puberte',
        num: '8',
        titre: 'De la fécondation à la puberté',
        icone: '👶',
        tag: 'Corps humain & santé',
        souschap: [
          { titre: 'Reproduction humaine', notions: ['Fécondation','Développement embryonnaire','Puberté','Caractères sexuels primaires & secondaires'] },
          { titre: 'Appareils reproducteurs', notions: ['Appareil génital masculin','Appareil génital féminin','Hormones sexuelles (intro)','Différences biologiques H/F'] },
        ],
        notionsCles: ['Fécondation','Puberté','Embryon','Gamètes','Hormones sexuelles'],
      },
      {
        id: 'cerveau-sante',
        num: '9',
        titre: 'Hormones, cerveau & santé',
        icone: '🧠',
        tag: 'Corps humain & santé',
        souschap: [
          { titre: 'Hormones & procréation', notions: ['Testostérone','Œstrogènes','Cycle menstruel (intro)','Contrôle hormonal'] },
          { titre: 'Cerveau & comportements', notions: ['Système nerveux (intro)','Plaisir & émotions','Sexualité & genre','Construction de l\'identité'] },
          { titre: 'Agents pathogènes & immunité', notions: ['Virus · Bactéries · Parasites','Maladies vectorielles (paludisme · dengue · VIH)','Microbiote intestinal','Défenses immunitaires (intro)'] },
        ],
        notionsCles: ['Hormones','Microbiote','Agent pathogène','VIH','Immunité','Cerveau'],
      },
    ],
  },
]

export default function SVTSecondePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/svt" style={{ color: 'var(--muted)', textDecoration: 'none' }}>SVT</Link>
            <span>›</span>
            <span style={{ color: COULEUR }}>Seconde</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">📘 Seconde Générale & Technologique</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(34,197,94,0.2)', color: '#86efac', fontWeight: 800 }}>Enseignement commun</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              SVT — Classe de Seconde<br />
              <span style={{ background: 'linear-gradient(90deg,#22c55e,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Programme complet 2026
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 9 chapitres</span><span>·</span>
              <span>🔬 3 grands thèmes</span><span>·</span>
              <span>📊 50+ notions</span><span>·</span>
              <span>🤖 IA professeur SVT</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#22c55e,#10b981)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🌱 Solveur IA SVT
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
            </div>
          </div>

          {/* THÈMES + CHAPITRES */}
          {THEMES.map(theme => (
            <div key={theme.tag} style={{ marginBottom: 40 }}>
              {/* Séparateur thème */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: theme.couleur, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {theme.iconeTheme} {theme.tag}
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {theme.chapitres.map(ch => (
                  <div key={ch.id} style={{ background: `${theme.couleur}08`, border: `1px solid ${theme.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                    {/* Header chapitre */}
                    <div style={{ background: `${theme.couleur}14`, borderBottom: `1px solid ${theme.couleur}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${theme.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{ch.icone}</div>
                        <div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: theme.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                          </div>
                          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 4 }}>
                            {ch.notionsCles.slice(0, 4).map(n => (
                              <span key={n} style={{ fontSize: 9, padding: '1px 7px', borderRadius: 8, background: `${theme.couleur}18`, color: theme.couleur, border: `1px solid ${theme.couleur}25`, fontWeight: 600 }}>{n}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Link href={`/bac-france/svt/seconde/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${theme.couleur}20`, border: `1px solid ${theme.couleur}40`, color: theme.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        📖 Cours complet →
                      </Link>
                    </div>

                    {/* Sous-chapitres */}
                    <div style={{ padding: '14px 22px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8, marginBottom: (ch as any).formules?.length > 0 ? 12 : 0 }}>
                        {ch.souschap.map(sc => (
                          <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '10px 13px' }}>
                            <div style={{ fontWeight: 700, fontSize: 11, color: theme.couleur, marginBottom: 5 }}>{sc.titre}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                              {sc.notions.map(n => (
                                <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${theme.couleur}12`, color: 'var(--text2)', border: `1px solid ${theme.couleur}18` }}>{n}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Formules si présentes */}
                      {(ch as any).formules?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {(ch as any).formules.map((f: any) => (
                            <div key={f.f} style={{ background: `${theme.couleur}14`, border: `1px solid ${theme.couleur}28`, borderRadius: 9, padding: '7px 13px' }}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: theme.couleur, fontWeight: 700, marginBottom: 1 }}>{f.f}</div>
                              <div style={{ fontSize: 10, color: 'var(--muted)' }}>{f.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Navigation */}
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/svt" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.08)', color: '#86efac', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>↑ Tous les niveaux SVT</Link>
            <Link href="/bac-france/svt/premiere" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)', color: '#34d399', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Première SVT →</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}