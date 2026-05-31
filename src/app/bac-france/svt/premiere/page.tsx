'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// SVT FRANCE — Classe de Première Spécialité
// Route : /bac-france/svt/premiere
// Programme officiel MEN 2026 · Spécialité 4h/semaine
// 3 grands thèmes · 10 chapitres
// ══════════════════════════════════════════════════════════════════════

const COULEUR = '#10b981'

const THEMES = [
  {
    tag: 'La Terre, la vie & le vivant',
    couleur: '#10b981',
    iconeTheme: '🔬',
    chapitres: [
      {
        id: 'adn-genome-premiere',
        num: '1',
        titre: 'Transmission, variation & expression du patrimoine génétique',
        icone: '🧬',
        souschap: [
          { titre: 'Structure de l\'ADN', notions: ['Double hélice','Nucléotides (A·T·G·C)','Complémentarité des bases','Chromosomes'] },
          { titre: 'Réplication de l\'ADN', notions: ['Duplication semi-conservative','Enzymes (ADN polymérase)','Mitose & conservation génétique','Cycle cellulaire'] },
          { titre: 'Mutations génétiques', notions: ['Mutations ponctuelles','Mutations chromosomiques','Agents mutagènes (UV, substances chimiques)','Diversité génétique'] },
          { titre: 'Expression du patrimoine génétique', notions: ['Transcription (ADN → ARNm)','Traduction (ARNm → protéine)','Code génétique','Synthèse des protéines'] },
        ],
        notionsCles: ['ADN','Réplication','Mutation','Transcription','Traduction','Gène','Allèle'],
      },
      {
        id: 'tectonique-premiere',
        num: '2',
        titre: 'Dynamique interne de la Terre',
        icone: '🌋',
        souschap: [
          { titre: 'Structure du globe terrestre', notions: ['Croûte continentale & océanique','Manteau lithosphérique','Noyau externe & interne','Ondes sismiques (P et S)'] },
          { titre: 'Mobilité des plaques lithosphériques', notions: ['Divergence (dorsales)','Convergence (subduction)','Collision continentale','Convection mantellique'] },
          { titre: 'Risques géologiques', notions: ['Séismes (foyer, épicentre)','Volcanisme (types de laves)','Prévention des catastrophes','Tsunamis'] },
        ],
        notionsCles: ['Tectonique des plaques','Subduction','Dorsale','Séisme','Volcanisme','Lithosphère'],
      },
      {
        id: 'ecosystemes-premiere',
        num: '3',
        titre: 'Écosystèmes & services environnementaux',
        icone: '🌿',
        souschap: [
          { titre: 'Fonctionnement des écosystèmes', notions: ['Chaînes alimentaires','Producteurs primaires','Consommateurs & décomposeurs','Flux de matière & énergie'] },
          { titre: 'Biodiversité', notions: ['Diversité génétique','Diversité spécifique','Diversité des écosystèmes','Indicateurs de biodiversité'] },
          { titre: 'Services écosystémiques', notions: ['Pollinisation','Fertilité des sols','Régulation climatique','Ressources naturelles','Impact humain'] },
        ],
        notionsCles: ['Écosystème','Chaîne alimentaire','Biodiversité','Services écosystémiques','Producteur primaire'],
      },
    ],
  },
  {
    tag: 'Enjeux contemporains de la planète',
    couleur: '#f59e0b',
    iconeTheme: '🌍',
    chapitres: [
      {
        id: 'ecosystemes-humains-premiere',
        num: '4',
        titre: 'Écosystèmes & activité humaine',
        icone: '🏭',
        souschap: [
          { titre: 'Pressions anthropiques', notions: ['Déforestation','Pollution (air, eau, sols)','Réchauffement climatique','Artificialisation des sols','Exploitation des ressources'] },
          { titre: 'Gestion durable des écosystèmes', notions: ['Aires protégées','Restauration écologique','Développement durable','Objectifs de l\'ONU'] },
        ],
        notionsCles: ['Impact humain','Déforestation','Réchauffement climatique','Développement durable'],
      },
      {
        id: 'ressources-naturelles-premiere',
        num: '5',
        titre: 'Ressources naturelles & développement durable',
        icone: '💧',
        souschap: [
          { titre: 'Ressources en eau et sols', notions: ['Cycle de l\'eau','Nappe phréatique','Fertilité des sols','Agriculture durable'] },
          { titre: 'Ressources énergétiques', notions: ['Énergies renouvelables vs fossiles','Bilan carbone','Transition énergétique','Empreinte écologique'] },
        ],
        notionsCles: ['Cycle de l\'eau','Ressources renouvelables','Agriculture durable','Transition énergétique'],
      },
    ],
  },
  {
    tag: 'Corps humain & santé',
    couleur: '#8b5cf6',
    iconeTheme: '🏥',
    chapitres: [
      {
        id: 'immunite-premiere',
        num: '6',
        titre: 'Le système immunitaire humain',
        icone: '🛡️',
        souschap: [
          { titre: 'Immunité innée (non spécifique)', notions: ['Barrières naturelles (peau, muqueuses)','Phagocytose (neutrophiles, macrophages)','Inflammation','Réponse immédiate'] },
          { titre: 'Immunité adaptative — Humorale', notions: ['Lymphocytes B','Plasmocytes & anticorps','Immunoglobulines','Épitope & paratope'] },
          { titre: 'Immunité adaptative — Cellulaire', notions: ['Lymphocytes T cytotoxiques','LT CD4 (auxiliaires)','Destruction des cellules infectées','CMH'] },
          { titre: 'Mémoire immunitaire & vaccination', notions: ['Clones mémoires B et T','Réponse secondaire rapide','Principe du vaccin','Protection collective','VIH & SIDA'] },
        ],
        notionsCles: ['Phagocytose','Anticorps','Lymphocyte B','Lymphocyte T','Vaccination','Mémoire immunitaire'],
      },
      {
        id: 'genetique-sante-premiere',
        num: '7',
        titre: 'Variation génétique & santé',
        icone: '🔭',
        souschap: [
          { titre: 'Maladies génétiques', notions: ['Maladies monogéniques','Mucoviscidose (CFTR)','Drépanocytose','Hérédité autosomique récessive'] },
          { titre: 'Cancer & mutations', notions: ['Oncogènes','Gènes suppresseurs de tumeurs','Mutation somatique vs germinale','Facteurs environnementaux (tabac, UV)'] },
        ],
        notionsCles: ['Maladie génétique','Mucoviscidose','Cancer','Oncogène','Mutation somatique'],
      },
      {
        id: 'systeme-nerveux-premiere',
        num: '8',
        titre: 'Fonctionnement du système nerveux',
        icone: '🧠',
        souschap: [
          { titre: 'Communication nerveuse', notions: ['Neurone (corps cellulaire, dendrites, axone, gaine myéline)','Potentiel d\'action','Synapse chimique','Neurotransmetteurs (dopamine, sérotonine, acétylcholine)'] },
          { titre: 'Plasticité cérébrale & apprentissage', notions: ['Plasticité synaptique','Mémoire (court/long terme)','Apprentissage','Rôle de l\'hippocampe'] },
          { titre: 'Drogues & cerveau', notions: ['Mécanismes d\'action (agoniste/antagoniste)','Dopamine & circuit de récompense','Dépendance','Addictions'] },
        ],
        notionsCles: ['Neurone','Potentiel d\'action','Synapse','Plasticité','Dopamine','Dépendance'],
      },
      {
        id: 'methodes-scientifiques-premiere',
        num: '9',
        titre: 'Méthodes scientifiques & ECE',
        icone: '🔬',
        souschap: [
          { titre: 'Démarche expérimentale', notions: ['Protocole expérimental','Groupe témoin & groupe test','Variables indépendantes / dépendantes','Interprétation des résultats'] },
          { titre: 'Outils numériques', notions: ['Microscope numérique','Logiciels scientifiques','Bases de données ADN (GenBank)','Simulations numériques'] },
        ],
        notionsCles: ['Démarche expérimentale','Protocole','Variable','Interprétation','Modélisation'],
      },
    ],
  },
]

export default function SVTPremierePage() {
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
            <span style={{ color: COULEUR }}>Première</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">📗 Première Générale — Spécialité SVT</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.2)', color: '#34d399', fontWeight: 800 }}>Spécialité · 4h/semaine</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              SVT — Classe de Première<br />
              <span style={{ background: 'linear-gradient(90deg,#10b981,#22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Spécialité — Programme complet 2026
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 9 chapitres</span><span>·</span>
              <span>🔬 3 grands thèmes</span><span>·</span>
              <span>📊 70+ notions clés</span><span>·</span>
              <span>🤖 IA professeur SVT</span>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, fontSize: 12, color: 'var(--text2)' }}>
              ⚠️ <strong style={{ color: '#34d399' }}>Épreuve anticipée de Première :</strong> À partir de 2026, l'épreuve de spécialité SVT de Première est intégrée au Baccalauréat final. Programme couvre environ 40% du Bac.
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#10b981,#22c55e)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🌱 Solveur IA SVT
              </Link>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation-france" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation Bac
              </Link>
            </div>
          </div>

          {/* THÈMES + CHAPITRES */}
          {THEMES.map(theme => (
            <div key={theme.tag} style={{ marginBottom: 40 }}>
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
                    <div style={{ background: `${theme.couleur}14`, borderBottom: `1px solid ${theme.couleur}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${theme.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{ch.icone}</div>
                        <div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: theme.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                          </div>
                          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 4 }}>
                            {ch.notionsCles.slice(0, 5).map(n => (
                              <span key={n} style={{ fontSize: 9, padding: '1px 7px', borderRadius: 8, background: `${theme.couleur}18`, color: theme.couleur, border: `1px solid ${theme.couleur}25`, fontWeight: 600 }}>{n}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Link href={`/bac-france/svt/premiere/${ch.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${theme.couleur}20`, border: `1px solid ${theme.couleur}40`, color: theme.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        📖 Cours complet →
                      </Link>
                    </div>
                    <div style={{ padding: '14px 22px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8 }}>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Navigation */}
          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/svt/seconde" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.08)', color: '#86efac', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Seconde SVT</Link>
            <Link href="/bac-france/svt" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>↑ Tous les niveaux</Link>
            <Link href="/bac-france/svt/terminale" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(22,163,74,0.3)', background: 'rgba(22,163,74,0.08)', color: '#4ade80', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Terminale SVT ⭐ →</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}