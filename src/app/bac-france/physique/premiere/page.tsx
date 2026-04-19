'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const CHAPITRES = [
  {
    id: 'quantite-matiere',
    num: '1',
    titre: 'Constitution & Transformations de la Matière',
    couleur: '#10b981',
    icone: '⚗️',
    tag: 'Chimie',
    souschap: [
      {
        titre: '1.1 Suivi d\'évolution d\'un système chimique',
        notions: ['Quantité de matière (mole)','Masse molaire, volume molaire','Concentration molaire et massique','Avancement d\'une réaction','Tableau d\'avancement, avancement maximal','Réactions totales et limitées'],
        formules: [
          { f: 'n = m/M', desc: 'Quantité de matière' },
          { f: 'c = n/V', desc: 'Concentration molaire' },
          { f: 'Vm = 22,4 L/mol (CNT)', desc: 'Volume molaire' },
        ],
      },
      {
        titre: '1.2 Réactions d\'oxydo-réduction',
        notions: ['Transfert d\'électrons entre espèces','Couples oxydant/réducteur','Nombre d\'oxydation','Équations des réactions rédox','Titrages par oxydo-réduction'],
        formules: [
          { f: 'Ox + ne⁻ → Red', desc: 'Demi-équation de réduction' },
        ],
      },
      {
        titre: '1.3 Structure des entités — Propriétés physiques',
        notions: ['Schémas de Lewis','Géométrie VSEPR','Électronégativité, polarité','Interactions intermoléculaires (ponts H, Van der Waals)','Solubilité, miscibilité','Extraction liquide-liquide, chromatographie'],
      },
    ],
  },
  {
    id: 'loi-coulomb',
    num: '2',
    titre: 'Mouvement & Interactions',
    couleur: '#4f6ef7',
    icone: '⚡',
    tag: 'Physique',
    souschap: [
      {
        titre: '2.1 Interactions fondamentales & Champs',
        notions: ['Loi de Coulomb (interaction électrostatique)','Loi de Newton (gravitation)','Champ électrique, champ gravitationnel','Lignes de champ, représentation vectorielle'],
        formules: [
          { f: 'F = k·q₁q₂/r²', desc: 'Loi de Coulomb' },
          { f: 'F = GMm/r²', desc: 'Gravitation universelle' },
          { f: 'E = F/q', desc: 'Champ électrique' },
        ],
      },
      {
        titre: '2.2 Fluide au repos',
        notions: ['Pression dans un fluide','Théorème de Pascal','Poussée d\'Archimède','Modèle du gaz parfait'],
        formules: [
          { f: 'P = ρgh', desc: 'Pression hydrostatique' },
          { f: 'F_A = ρ_fluide·V·g', desc: 'Poussée d\'Archimède' },
          { f: 'PV = nRT', desc: 'Gaz parfait' },
        ],
      },
      {
        titre: '2.3 2ème loi de Newton (approche qualitative)',
        notions: ['Lien force — variation de vitesse','Introduction à l\'accélération','Mouvement dans un champ uniforme'],
        formules: [
          { f: 'ΣF⃗ = m·a⃗', desc: '2ème loi de Newton' },
        ],
      },
    ],
  },
  {
    id: 'energie-mecanique',
    num: '3',
    titre: 'L\'Énergie : Conversions & Transferts',
    couleur: '#f59e0b',
    icone: '🔋',
    tag: 'Énergie',
    souschap: [
      {
        titre: '3.1 Aspects énergétiques mécaniques',
        notions: ['Travail d\'une force constante','Énergie cinétique Ec','Théorème de l\'énergie cinétique','Énergie potentielle de pesanteur','Énergie mécanique, conservation'],
        formules: [
          { f: 'W = F·d·cosα', desc: 'Travail d\'une force' },
          { f: 'Ec = ½mv²', desc: 'Énergie cinétique' },
          { f: 'Ep = mgh', desc: 'Énergie potentielle de pesanteur' },
          { f: 'Em = Ec + Ep', desc: 'Énergie mécanique' },
        ],
      },
      {
        titre: '3.2 Bilans énergétiques',
        notions: ['Bilan de puissance dans un circuit électrique','Effet Joule','Rendement d\'un convertisseur'],
        formules: [
          { f: 'P = UI', desc: 'Puissance électrique' },
          { f: 'η = P_utile/P_totale', desc: 'Rendement' },
          { f: 'P_Joule = R·I²', desc: 'Effet Joule' },
        ],
      },
      {
        titre: '3.3 Énergie chimique & thermique',
        notions: ['Énergie molaire de réaction','Pouvoir calorifique massique','Énergie libérée lors d\'une combustion','Bilan thermique du corps humain'],
        formules: [
          { f: 'Q = m·Cp·ΔT', desc: 'Énergie thermique' },
        ],
      },
    ],
  },
  {
    id: 'ondes-mecaniques',
    num: '4',
    titre: 'Ondes & Signaux',
    couleur: '#8b5cf6',
    icone: '🌊',
    tag: 'Ondes',
    souschap: [
      {
        titre: '4.1 Ondes mécaniques progressives',
        notions: ['Onde progressive périodique','Célérité, retard','Ondes sinusoïdales','Période T, longueur d\'onde λ'],
        formules: [
          { f: 'v = λ/T = λ·f', desc: 'Relation célérité-longueur d\'onde' },
          { f: 'τ = d/v', desc: 'Retard temporel' },
        ],
      },
      {
        titre: '4.2 Ondes sonores',
        notions: ['Son pur vs son composé','Spectre d\'amplitude','Fréquence fondamentale, harmoniques','Hauteur, timbre, intensité sonore','Niveau d\'intensité (décibels)'],
        formules: [
          { f: 'L = 10·log(I/I₀)', desc: 'Niveau d\'intensité sonore (dB)' },
          { f: 'I₀ = 10⁻¹² W/m²', desc: 'Seuil d\'audibilité' },
        ],
      },
      {
        titre: '4.3 Ondes électromagnétiques',
        notions: ['Spectre électromagnétique','Couleurs, longueurs d\'onde','Synthèse additive et soustractive','Couleur des objets'],
      },
      {
        titre: '4.4 Signaux électriques',
        notions: ['Signal analogique vs numérique','Numérisation : échantillonnage, quantification','Conversion analogique-numérique'],
        formules: [
          { f: 'fe ≥ 2·fmax', desc: 'Critère de Shannon' },
        ],
      },
    ],
  },
]

export default function PhysiquePremierePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/physique" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Physique-Chimie</Link>
            <span>›</span>
            <span style={{ color: '#818cf8' }}>Première</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">⚛️ Première Générale · Spécialité PC</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(79,110,247,0.2)', color: '#818cf8', fontWeight: 700 }}>6h/semaine</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Physique-Chimie<br />
              <span style={{ background: 'linear-gradient(90deg,#4f6ef7,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Première Générale — Programme complet
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 14 chapitres</span><span>·</span><span>📐 110+ formules</span><span>·</span><span>📝 95+ exercices</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:10, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>🧮 Solveur PC</Link>
              <Link href="/chat" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)', color:'var(--text)', fontSize:13, fontWeight:600, textDecoration:'none' }}>🤖 Chat Prof</Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CHAPITRES.map(ch => (
              <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '18px 24px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{ch.icone}</div>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                      <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                      <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {ch.souschap.map(sc => (
                    <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 12, padding: '14px 18px' }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: ch.couleur, marginBottom: 10 }}>{sc.titre}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: sc.formules?.length ? 12 : 0 }}>
                        {sc.notions.map(n => (
                          <span key={n} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 18, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                        ))}
                      </div>
                      {sc.formules && sc.formules.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {sc.formules.map(f => (
                            <div key={f.f} style={{ background: `${ch.couleur}18`, border: `1px solid ${ch.couleur}30`, borderRadius: 10, padding: '8px 14px' }}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: ch.couleur, fontWeight: 700, marginBottom: 2 }}>{f.f}</div>
                              <div style={{ fontSize: 10, color: 'var(--muted)' }}>{f.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/bac-france/physique/premiere/${ch.id}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:9, background:`${ch.couleur}15`, border:`1px solid ${ch.couleur}30`, color:ch.couleur, fontSize:12, fontWeight:700, textDecoration:'none' }}>📖 Voir le cours →</Link>
                    <Link href={`/solve?q=${encodeURIComponent('Exercice physique Première : ' + ch.titre)}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:9, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--muted)', fontSize:12, fontWeight:600, textDecoration:'none' }}>🧮 Résoudre</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/physique/seconde" style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(16,185,129,0.3)', background:'rgba(16,185,129,0.08)', color:'#34d399', fontSize:13, fontWeight:700, textDecoration:'none' }}>← Seconde</Link>
            <Link href="/bac-france/physique" style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.05)', color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>↑ Toutes les voies</Link>
            <Link href="/bac-france/physique/terminale" style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(245,158,11,0.3)', background:'rgba(245,158,11,0.08)', color:'#fbbf24', fontSize:13, fontWeight:700, textDecoration:'none' }}>Terminale →</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}