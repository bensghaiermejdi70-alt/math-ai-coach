'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// GESTION TUNISIE — Section Sciences Économiques et Gestion
// Route : /bac/gestion/eco-gestion
// Programme officiel CNP Tunisie · 4ème année Économie & Gestion
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  {
    id: 'evaluation-consolidation',
    num: '1',
    titre: 'Module Évaluation – Consolidation',
    couleur: '#f43f5e',
    icone: '📒',
    tag: 'Comptabilité',
    souschap: [
      { titre: 'A. Comptabilité et patrimoine de l\'entreprise', notions: ['Notion d\'entreprise', 'Patrimoine · Emplois et ressources', 'Exercice comptable · Inventaire', 'Bilan comptable · Bilan fonctionnel', 'Capitaux propres · Actifs et passifs', 'FDR · BFR · Trésorerie nette', 'Équilibre financier'] },
      { titre: 'B. Comptabilité générale', notions: ['Charges et produits', 'Résultat de l\'entreprise', 'Journal comptable · Comptes', 'Pièces justificatives', 'TVA', 'Opérations commerciales', 'Plan comptable'] },
      { titre: 'C. Organisation de l\'entreprise', notions: ['Fonctions de l\'entreprise', 'Approvisionnement · Production · Commerciale', 'Ressources humaines · Financière', 'Structure · Organigramme', 'Liens hiérarchiques / fonctionnels / de conseil'] },
      { titre: 'D. Système d\'information', notions: ['Information et décision', 'Sources d\'information interne / externe', 'Système d\'information', 'Communication', 'Informatique de gestion · Internet'] },
    ],
    formules: [
      { f: 'FDR = Capitaux permanents − Actif immobilisé', desc: 'Fonds de roulement' },
      { f: 'BFR = Actif circulant − Passif circulant', desc: 'Besoin en fonds de roulement' },
      { f: 'TN = FDR − BFR', desc: 'Trésorerie nette' },
      { f: 'Résultat = Produits − Charges', desc: 'Résultat de l\'exercice' },
    ],
  },
  {
    id: 'approvisionnement',
    num: '2',
    titre: 'Gestion de l\'Approvisionnement',
    couleur: '#f59e0b',
    icone: '📦',
    tag: 'Stocks',
    souschap: [
      { titre: 'I. Gestion comptable des stocks', notions: ['Stock initial / final', 'Mouvements de stock', 'Bon d\'entrée / de sortie', 'Valorisation des stocks', 'Méthode CUMP', 'Fiche de stock'] },
      { titre: 'II. Analyse de l\'évolution des stocks', notions: ['Stock moyen', 'Rotation des stocks', 'Durée moyenne de stockage', 'Coût de stockage', 'Rupture de stock · Surstockage'] },
      { titre: 'III. Gestion prévisionnelle des stocks', notions: ['Stock minimum / maximum / de sécurité', 'Quantité économique', 'Date de commande', 'Cadence d\'approvisionnement', 'Modèle de Wilson', 'Optimisation des stocks'] },
    ],
    formules: [
      { f: 'CUMP = (Stock initial + Entrées) / (Qté initiale + Qté entrée)', desc: 'Coût unitaire moyen pondéré' },
      { f: 'Stock moyen = (Stock initial + Stock final) / 2', desc: 'Stock moyen' },
      { f: 'Rotation = Consommation / Stock moyen', desc: 'Coefficient de rotation' },
      { f: 'Durée de stockage = 360 / Rotation', desc: 'Durée moyenne (en jours)' },
      { f: 'Q* = √(2·D·Cₗ / Cₛ)', desc: 'Quantité économique (Wilson)' },
    ],
  },
  {
    id: 'production',
    num: '3',
    titre: 'Gestion de la Production',
    couleur: '#8b5cf6',
    icone: '🏭',
    tag: 'Coûts',
    souschap: [
      { titre: 'I-A. Les coûts complets', notions: ['Charges directes / indirectes', 'Centres d\'analyse', 'Coût d\'achat · de production · de revient', 'Résultat analytique'] },
      { titre: 'I-B. Les coûts partiels', notions: ['Charges fixes / variables', 'Marge sur coût variable', 'Seuil de rentabilité', 'Point mort'] },
      { titre: 'II. Choix des quantités à fabriquer', notions: ['Quantité optimale', 'Capacité de production', 'Sous-traitance', 'Décision de fabrication'] },
      { titre: 'III. Prévisions vs réalisations', notions: ['Coûts préétablis', 'Écarts sur coûts', 'Analyse des écarts', 'Contrôle de gestion', 'Mesure de performance'] },
      { titre: 'IV. Le lot économique', notions: ['Coût de lancement', 'Coût de stockage', 'Quantité économique de fabrication', 'Formule de Wilson', 'Optimisation des séries'] },
    ],
    formules: [
      { f: 'Coût de revient = Coût de production + Coûts hors production', desc: 'Coût de revient' },
      { f: 'MCV = Chiffre d\'affaires − Charges variables', desc: 'Marge sur coût variable' },
      { f: 'SR = Charges fixes / Taux de MCV', desc: 'Seuil de rentabilité' },
      { f: 'Résultat analytique = Prix de vente − Coût de revient', desc: 'Résultat analytique' },
    ],
  },
  {
    id: 'commerciale',
    num: '4',
    titre: 'Gestion Commerciale',
    couleur: '#ec4899',
    icone: '🛒',
    tag: 'Marketing',
    souschap: [
      { titre: 'I. Étude de marché', notions: ['Étude de l\'environnement', 'Étude du consommateur', 'Étude de la concurrence', 'Étude de la distribution', 'Collecte et analyse d\'informations'] },
      { titre: 'II-A/B. Segmentation & Ciblage', notions: ['Critères de segmentation', 'Segments de marché', 'Choix du marché cible'] },
      { titre: 'II-C. Politique commerciale (mix)', notions: ['Produit : gamme, marque, conditionnement', 'Prix : fixation, stratégies tarifaires', 'Communication : publicité, promotion, RP', 'Distribution : circuits et canaux'] },
      { titre: 'III. Exécution et suivi des ventes', notions: ['Commandes · Livraison · Facturation', 'Suivi commercial', 'Contrôle des ventes', 'Fidélisation des clients'] },
    ],
    formules: [
      { f: 'Part de marché = Ventes entreprise / Ventes totales × 100', desc: 'Part de marché (%)' },
    ],
  },
  {
    id: 'ressources-humaines',
    num: '5',
    titre: 'Gestion des Ressources Humaines',
    couleur: '#14b8a6',
    icone: '👥',
    tag: 'RH',
    souschap: [
      { titre: 'I. Les besoins en personnel', notions: ['Prévision des effectifs', 'Analyse des postes', 'Pyramide des âges', 'Besoins futurs / ressources disponibles', 'Analyse des écarts', 'Planification RH'] },
      { titre: 'II. Le recrutement', notions: ['Processus de recrutement', 'Recrutement interne / externe', 'Sélection · Entretien', 'Intégration du personnel'] },
      { titre: 'III. Formation du personnel', notions: ['Formation initiale / continue', 'Coût de la formation', 'Développement des compétences'] },
      { titre: 'IV. Rémunération du personnel', notions: ['Salaire · Prime', 'Motivation', 'Masse salariale', 'Charges sociales', 'Politique de rémunération'] },
    ],
    formules: [
      { f: 'Masse salariale = Σ (salaires bruts + charges patronales)', desc: 'Masse salariale' },
    ],
  },
  {
    id: 'financiere',
    num: '6',
    titre: 'Gestion Financière',
    couleur: '#0ea5e9',
    icone: '💰',
    tag: 'Finance',
    souschap: [
      { titre: 'I. Financement de l\'investissement', notions: ['Besoins d\'investissement', 'Autofinancement', 'Emprunt · Crédit bancaire', 'Crédit-bail (leasing)', 'Choix du financement'] },
      { titre: 'II. Analyse financière', notions: ['Bilan fonctionnel', 'Fonds de roulement · BFR · Trésorerie nette', 'Équilibre financier', 'Ratios financiers'] },
      { titre: 'III. Gestion prévisionnelle et budgétaire', notions: ['Budget des ventes / achats / production', 'Budget des investissements', 'Budget de trésorerie', 'Contrôle budgétaire', 'Prévision vs réalisation'] },
    ],
    formules: [
      { f: 'Autofinancement = CAF − Dividendes distribués', desc: 'Autofinancement net' },
      { f: 'Ratio d\'autonomie = Capitaux propres / Total passif', desc: 'Ratio d\'autonomie financière' },
    ],
  },
]

export default function GestionEcoGestionPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/gestion" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Gestion</Link>
            <span>›</span>
            <span style={{ color: '#fb7185' }}>Section Sciences Économiques et Gestion</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">💼 Sciences Économiques et Gestion · 4ème année</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(244,63,94,0.2)', color: '#fb7185', fontWeight: 800 }}>⭐ Baccalauréat Tunisie</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Gestion<br />
              <span style={{ background: 'linear-gradient(90deg,#f43f5e,#e11d48)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Programme complet — CNP Tunisie
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 6 chapitres</span><span>·</span>
              <span>📐 23 sections</span><span>·</span>
              <span>🧮 Comptabilité · Coûts · Finance</span><span>·</span>
              <span>🤖 Chat Prof intégré</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#f43f5e,#e11d48)', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                🤖 Chat Prof
              </Link>
              <Link href="/simulation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', color: '#fb7185', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                🎯 Simulation Bac
              </Link>
              <Link href="/examens" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                📋 Examens
              </Link>
            </div>
          </div>

          {/* SÉPARATEUR PROGRAMME */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🗂️ Programme de Gestion — 6 chapitres</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* CHAPITRES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {CHAPITRES.map(ch => (
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
                  <Link href={`/bac/gestion/eco-gestion/${ch.id}`}
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

          {/* Navigation */}
          <div style={{ marginTop: 16, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              ↑ Toutes les matières
            </Link>
            <Link href="/bac/economie/eco-gestion" style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.08)', color: '#22d3ee', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              📈 Économie →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}