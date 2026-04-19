'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const CHAPITRES = [
  {
    id: 'mesures',
    num: '1',
    titre: 'Mesures & Incertitudes',
    couleur: '#6b7280',
    icone: '📏',
    tag: 'Métrologie',
    notions: ['Incertitude-type, évaluation de type A et B','Présentation des résultats de mesure','Chiffres significatifs'],
    formules: [{ f: 'U = k·u_c', desc: 'Incertitude élargie (k=2)' }],
  },
  {
    id: 'energie',
    num: '2',
    titre: 'Énergie — Pôle Central STI2D',
    couleur: '#f59e0b',
    icone: '⚡',
    tag: 'Énergie',
    souschap: [
      {
        titre: '2.1 Énergie chimique',
        notions: ['Combustions, pouvoir calorifique','Énergies de combustion','Piles et accumulateurs'],
        formules: [
          { f: 'E = Pci × m', desc: 'Énergie de combustion' },
          { f: 'W = U·I·t', desc: 'Énergie électrique' },
        ],
      },
      {
        titre: '2.2 Énergie électrique',
        notions: ['Circuits en régime continu et variable','Valeur moyenne, valeur efficace','Puissance électrique'],
        formules: [
          { f: 'U_eff = U_max/√2', desc: 'Valeur efficace (sinusoïdal)' },
          { f: 'P = U_eff·I_eff·cosφ', desc: 'Puissance active' },
        ],
      },
      {
        titre: '2.3 Énergie interne & Transferts thermiques',
        notions: ['Transfert thermique, capacité thermique','Changements d\'état'],
        formules: [
          { f: 'Q = m·c·ΔT', desc: 'Énergie thermique sensible' },
          { f: 'Q = m·Lf', desc: 'Énergie de changement d\'état' },
        ],
      },
      {
        titre: '2.4 Énergie mécanique',
        notions: ['Travail d\'une force, énergie cinétique','Énergie potentielle, puissance mécanique'],
        formules: [
          { f: 'P_mec = F·v', desc: 'Puissance mécanique' },
          { f: 'Ec = ½mv²', desc: 'Énergie cinétique' },
        ],
      },
      {
        titre: '2.5 Énergie lumineuse',
        notions: ['Spectre solaire, panneaux photovoltaïques','Laser et applications'],
        formules: [
          { f: 'E = hf = hc/λ', desc: 'Énergie d\'un photon' },
        ],
      },
    ],
  },
  {
    id: 'matiere',
    num: '3',
    titre: 'Matière & Matériaux',
    couleur: '#10b981',
    icone: '⚗️',
    tag: 'Matériaux',
    notions: [
      'Propriétés des matériaux (électriques, thermiques, mécaniques, optiques)',
      'Organisation de la matière (atomes, liaisons, molécules)',
      'Combustions (alcanes, alcènes, alcools)',
      'Oxydo-réduction, corrosion, piles',
    ],
    formules: [],
  },
  {
    id: 'ondes',
    num: '4',
    titre: 'Ondes & Information',
    couleur: '#8b5cf6',
    icone: '🌊',
    tag: 'Ondes',
    notions: [
      'Notion d\'onde, propagation, absorption, réflexion',
      'Ondes sonores (caractéristiques, applications médicales)',
      'Ondes électromagnétiques (spectre, applications, transmission)',
      'Signal analogique vs numérique',
    ],
    formules: [
      { f: 'v = λ·f', desc: 'Relation onde' },
      { f: 'L = 10·log(I/I₀)', desc: 'Niveau sonore (dB)' },
    ],
  },
]

function ChapCard({ ch }: { ch: any }) {
  return (
    <div style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
      <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '18px 24px', display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{ch.icone}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
          <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
        </div>
      </div>
      <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ch.notions && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ch.notions.map((n: string) => (
              <span key={n} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 18, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
            ))}
          </div>
        )}
        {ch.formules && ch.formules.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ch.formules.map((f: any) => (
              <div key={f.f} style={{ background: `${ch.couleur}18`, border: `1px solid ${ch.couleur}30`, borderRadius: 10, padding: '8px 14px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: ch.couleur, fontWeight: 700, marginBottom: 2 }}>{f.f}</div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        )}
        {ch.souschap?.map((sc: any) => (
          <div key={sc.titre} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 12, padding: '14px 18px' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: ch.couleur, marginBottom: 10 }}>{sc.titre}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: sc.formules?.length ? 12 : 0 }}>
              {sc.notions.map((n: string) => (
                <span key={n} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 18, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
              ))}
            </div>
            {sc.formules && sc.formules.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {sc.formules.map((f: any) => (
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
          <Link href={`/bac-france/physique/sti2d/${ch.id}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:9, background:`${ch.couleur}15`, border:`1px solid ${ch.couleur}30`, color:ch.couleur, fontSize:12, fontWeight:700, textDecoration:'none' }}>📖 Voir le cours →</Link>
          <Link href={`/solve?q=${encodeURIComponent('Exercice physique STI2D : ' + ch.titre)}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:9, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--muted)', fontSize:12, fontWeight:600, textDecoration:'none' }}>🧮 Résoudre</Link>
        </div>
      </div>
    </div>
  )
}

export default function PhysiqueSTI2DPage() {
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
            <span style={{ color: '#a78bfa' }}>STI2D</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">⚙️ Voie Technologique · Sciences de l'Industrie</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(139,92,246,0.2)', color: '#a78bfa', fontWeight: 700 }}>STI2D · Première & Terminale</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Physique-Chimie<br />
              <span style={{ background: 'linear-gradient(90deg,#8b5cf6,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                STI2D — Programme complet
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 8 chapitres</span><span>·</span><span>📐 60+ formules</span><span>·</span><span>📝 55+ exercices</span><span>·</span><span>🔧 Accent sur l'énergie et l'industrie</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:10, background:'linear-gradient(135deg,#8b5cf6,#6d28d9)', color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>🧮 Solveur PC</Link>
              <Link href="/chat" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)', color:'var(--text)', fontSize:13, fontWeight:600, textDecoration:'none' }}>🤖 Chat Prof</Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CHAPITRES.map(ch => <ChapCard key={ch.id} ch={ch} />)}
          </div>

          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/physique" style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.05)', color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>↑ Toutes les voies</Link>
            <Link href="/bac-france/physique/st2s" style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(236,72,153,0.3)', background:'rgba(236,72,153,0.08)', color:'#f472b6', fontSize:13, fontWeight:700, textDecoration:'none' }}>ST2S →</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}