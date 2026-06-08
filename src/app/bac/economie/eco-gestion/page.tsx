'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE TUNISIE — Section Sciences Économiques et Gestion
// Route : /bac/economie/eco-gestion
// Programme officiel CNP Tunisie · 4ème année Économie & Gestion
// ══════════════════════════════════════════════════════════════════════

const PARTIES = [
  { num: 1, label: 'La croissance économique et ses facteurs', icone: '📊', couleur: '#06b6d4' },
  { num: 2, label: 'Les mutations des structures économiques', icone: '🏭', couleur: '#8b5cf6' },
  { num: 3, label: 'Le développement durable', icone: '🌱', couleur: '#22c55e' },
  { num: 4, label: 'La mondialisation et ses enjeux', icone: '🌍', couleur: '#ec4899' },
]

const CHAPITRES = [
  // ── PARTIE I — Croissance économique ─────────────────────────────
  {
    id: 'croissance-economique',
    num: '1',
    partie: 1,
    titre: 'La croissance économique',
    couleur: '#06b6d4',
    icone: '📈',
    tag: 'Partie I',
    souschap: [
      { titre: 'Définition et mesure de la croissance', notions: ['Croissance quantitative et qualitative', 'PIB et PNB', 'PIB nominal et PIB réel', 'PIB à parité de pouvoir d\'achat (PPA)', 'Croissance extensive', 'Croissance intensive'] },
      { titre: 'L\'irrégularité de la croissance', notions: ['Expansion · Récession · Dépression · Reprise', 'Cycles économiques', 'Fluctuations économiques', 'Tendance de long terme (Trend)', 'Les Trente Glorieuses', 'Crises économiques'] },
    ],
    formules: [
      { f: 'Taux = (PIBₙ − PIBₙ₋₁) / PIBₙ₋₁ × 100', desc: 'Taux de croissance annuel' },
      { f: 'TCAM = [(PIBₙ/PIB₀)^(1/n) − 1] × 100', desc: 'Taux de croissance annuel moyen' },
      { f: 'Indice = (Valeurₙ / Valeur₀) × 100', desc: 'Indice du PIB / PNB' },
      { f: 'PIB réel = PIB nominal / déflateur × 100', desc: 'PIB en volume' },
    ],
  },
  {
    id: 'facteurs-croissance',
    num: '2',
    partie: 1,
    titre: 'Les facteurs de la croissance économique',
    couleur: '#0ea5e9',
    icone: '⚙️',
    tag: 'Partie I',
    souschap: [
      { titre: 'Le facteur travail', notions: ['Population active', 'Emploi et chômage', 'Qualification', 'Productivité du travail', 'Capital humain', 'Formation professionnelle', 'Employabilité'] },
      { titre: 'Le facteur capital', notions: ['Capital fixe', 'Investissement', 'Accumulation du capital', 'Renouvellement du capital', 'Productivité du capital', 'Progrès technique'] },
      { titre: 'Contribution des échanges extérieurs', notions: ['Exportations · Importations', 'Ouverture économique', 'Commerce extérieur', 'Compétitivité', 'Miracle asiatique', 'Mondialisation et croissance'] },
    ],
    formules: [
      { f: 'Pₜ = Production / Quantité de travail', desc: 'Productivité du travail' },
      { f: 'Pᵏ = Production / Capital utilisé', desc: 'Productivité du capital' },
    ],
  },
  // ── PARTIE II — Mutations des structures ─────────────────────────
  {
    id: 'structure-production',
    num: '3',
    partie: 2,
    titre: 'Les transformations de la structure de production',
    couleur: '#8b5cf6',
    icone: '🏭',
    tag: 'Partie II',
    souschap: [
      { titre: 'Les modifications de la répartition sectorielle', notions: ['Secteur primaire', 'Secteur secondaire', 'Secteur tertiaire', 'Tertiarisation', 'Désindustrialisation', 'Répartition de la population active'] },
      { titre: 'L\'évolution des techniques de production', notions: ['Mécanisation', 'Automatisation', 'Informatique', 'Productique', 'Flexibilité', 'Innovation technologique'] },
      { titre: 'La concentration des entreprises', notions: ['Concentration horizontale / verticale / conglomérale', 'Fusion · Absorption', 'Oligopole', 'Grandes entreprises'] },
    ],
    formules: [],
  },
  {
    id: 'modes-de-vie',
    num: '4',
    partie: 2,
    titre: 'Les transformations des modes de vie',
    couleur: '#a855f7',
    icone: '🏙️',
    tag: 'Partie II',
    souschap: [
      { titre: 'L\'amélioration du niveau de vie', notions: ['Revenu', 'Pouvoir d\'achat', 'Consommation', 'Équipement des ménages', 'Conditions de vie'] },
      { titre: 'L\'évolution de la structure de la consommation', notions: ['Coefficients budgétaires', 'Loi d\'Engel', 'Consommation de biens', 'Consommation de services', 'Nouveaux besoins'] },
      { titre: 'Les transformations des modes de vie', notions: ['Urbanisation · Métropolisation', 'Loisirs · Mobilité', 'Communication', 'Évolution de la famille'] },
    ],
    formules: [
      { f: 'Cb = Dépense d\'un poste / Dépense totale × 100', desc: 'Coefficient budgétaire' },
    ],
  },
  // ── PARTIE III — Développement durable ───────────────────────────
  {
    id: 'couts-croissance',
    num: '5',
    partie: 3,
    titre: 'Les coûts de la croissance',
    couleur: '#f59e0b',
    icone: '⚠️',
    tag: 'Partie III',
    souschap: [
      { titre: 'Les coûts socio-économiques', notions: ['Chômage', 'Exclusion', 'Pauvreté', 'Inégalités sociales', 'Délinquance', 'Marginalisation', 'Précarité'] },
      { titre: 'Les coûts environnementaux', notions: ['Pollution', 'Effet de serre', 'Réchauffement climatique', 'Déforestation', 'Dégradation des sols · Érosion', 'Épuisement des ressources naturelles'] },
    ],
    formules: [],
  },
  {
    id: 'developpement-durable',
    num: '6',
    partie: 3,
    titre: 'Le développement durable',
    couleur: '#22c55e',
    icone: '🌱',
    tag: 'Partie III',
    souschap: [
      { titre: 'Notion de développement durable', notions: ['Développement', 'Développement durable', 'Limites de la croissance'] },
      { titre: 'Les composantes du développement durable', notions: ['Dimension économique', 'Dimension sociale', 'Dimension environnementale', 'Équité', 'Solidarité intergénérationnelle'] },
      { titre: 'Les indicateurs du développement durable', notions: ['IDH', 'Espérance de vie', 'Taux d\'alphabétisation', 'PIB par habitant', 'Indicateurs environnementaux'] },
    ],
    formules: [
      { f: 'IDH = (I_santé + I_éducation + I_revenu) / 3', desc: 'Indice de développement humain (0 à 1)' },
    ],
  },
  // ── PARTIE IV — Mondialisation ───────────────────────────────────
  {
    id: 'echanges-internationaux',
    num: '7',
    partie: 4,
    titre: 'Les échanges internationaux et leur évolution',
    couleur: '#ec4899',
    icone: '🌍',
    tag: 'Partie IV',
    souschap: [
      { titre: 'Présentation des échanges internationaux', notions: ['Commerce international', 'Flux physiques / immatériels', 'Solde commercial', 'Taux de couverture', 'Taux d\'effort à l\'exportation', 'Taux d\'ouverture', 'Taux de dépendance', 'Termes de l\'échange'] },
      { titre: 'L\'essor des échanges internationaux', notions: ['Commerce avant le XIXe siècle', 'Révolution industrielle', 'Libre-échange', 'Protectionnisme', 'Internationalisation des économies'] },
    ],
    formules: [
      { f: 'Taux de couverture = (Exportations / Importations) × 100', desc: 'Couverture des importations par les exportations' },
      { f: 'Taux d\'ouverture = ((X + M) / 2) / PIB × 100', desc: 'Degré d\'ouverture de l\'économie' },
      { f: 'Termes de l\'échange = (Indice prix X / Indice prix M) × 100', desc: 'Termes de l\'échange' },
    ],
  },
  {
    id: 'mutations-commerce',
    num: '8',
    partie: 4,
    titre: 'Les mutations du commerce international',
    couleur: '#f43f5e',
    icone: '🚢',
    tag: 'Partie IV',
    souschap: [
      { titre: 'Évolution de la structure des échanges par produit', notions: ['Produits agricoles', 'Produits manufacturés', 'Services', 'Produits technologiques'] },
      { titre: 'Commerce interbranche et intrabranche', notions: ['Commerce interbranche', 'Commerce intrabranche', 'Spécialisation'] },
      { titre: 'Division internationale du travail (DIT)', notions: ['Avantages comparatifs', 'Avantages compétitifs', 'Spécialisation internationale'] },
      { titre: 'Évolution géographique des échanges mondiaux', notions: ['Triade', 'Pays émergents', 'Asie · Union européenne · Amérique du Nord'] },
    ],
    formules: [],
  },
  {
    id: 'firmes-multinationales',
    num: '9',
    partie: 4,
    titre: 'Les firmes multinationales',
    couleur: '#14b8a6',
    icone: '🏢',
    tag: 'Partie IV',
    souschap: [
      { titre: 'Notion de FMN et formes de filiales', notions: ['Firme multinationale', 'Différentes formes de filiales', 'Développement des échanges intrafirmes'] },
      { titre: 'Les mobiles de la multinationalisation', notions: ['Recherche de marchés', 'Recherche de coûts plus faibles', 'Recherche de ressources', 'Délocalisation'] },
      { titre: 'Les effets de la multinationalisation', notions: ['Pays d\'origine : emploi, investissement, compétitivité', 'Pays d\'accueil : création d\'emplois, transfert de technologie', 'Dépendance économique'] },
    ],
    formules: [],
  },
]

export default function EconomieEcoGestionPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/economie" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Économie</Link>
            <span>›</span>
            <span style={{ color: '#22d3ee' }}>Section Sciences Économiques et Gestion</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">📈 Sciences Économiques et Gestion · 4ème année</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(6,182,212,0.2)', color: '#22d3ee', fontWeight: 800 }}>⭐ Baccalauréat Tunisie</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Économie<br />
              <span style={{ background: 'linear-gradient(90deg,#06b6d4,#0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Programme complet — CNP Tunisie
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 9 chapitres</span><span>·</span>
              <span>🗂️ 4 parties</span><span>·</span>
              <span>📐 25 sections</span><span>·</span>
              <span>🤖 Chat Prof intégré</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#06b6d4,#0891b2)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation Bac
              </Link>
              <Link href="/examens" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                📋 Examens
              </Link>
            </div>
          </div>

          {/* PARTIES + CHAPITRES */}
          {PARTIES.map(partie => (
            <div key={partie.num}>
              {/* Séparateur de partie */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, marginTop: partie.num === 1 ? 0 : 8 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: partie.couleur, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {partie.icone} Partie {partie.num} — {partie.label}
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>

              {/* Cartes chapitres de la partie */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                {CHAPITRES.filter(ch => ch.partie === partie.num).map(ch => (
                  <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                    <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                          {ch.icone}
                        </div>
                        <div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                            <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.souschap.length} sections</div>
                        </div>
                      </div>
                      <Link href={`/bac/economie/eco-gestion/${ch.id}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: `${ch.couleur}20`, border: `1px solid ${ch.couleur}40`, color: ch.couleur, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                        📖 Cours complet →
                      </Link>
                    </div>
                    <div style={{ padding: '14px 22px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8, marginBottom: (ch.formules?.length ?? 0) > 0 ? 12 : 0 }}>
                        {ch.souschap.map(sc => (
                          <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '10px 13px' }}>
                            <div style={{ fontWeight: 700, fontSize: 11, color: ch.couleur, marginBottom: 5 }}>{sc.titre}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                              {(sc.notions ?? []).map(n => (
                                <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {(ch.formules?.length ?? 0) > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {(ch.formules ?? []).map(f => (
                            <div key={f.f} style={{ background: `${ch.couleur}14`, border: `1px solid ${ch.couleur}28`, borderRadius: 9, padding: '7px 13px' }}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: ch.couleur, fontWeight: 700, marginBottom: 1 }}>{f.f}</div>
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
          <div style={{ marginTop: 16, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              ↑ Toutes les matières
            </Link>
            <Link href="/bac/gestion/eco-gestion" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(244,63,94,0.3)', background: 'rgba(244,63,94,0.08)', color: '#fb7185', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              💼 Gestion →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}