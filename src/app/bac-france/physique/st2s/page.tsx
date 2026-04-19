'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const CHAPITRES = [
  {
    id: 'biophysique',
    num: '1',
    titre: 'Biophysique',
    couleur: '#ec4899',
    icone: '🏥',
    tag: 'Physique médicale',
    notions: [
      'Mécanique des fluides biologiques',
      'Pression artérielle, débit sanguin',
      'Loi de Poiseuille',
      'Diffusion, osmose',
      'Potentiel électrique membranaire',
    ],
    formules: [
      { f: 'Qv = ΔP·πr⁴/(8ηL)', desc: 'Loi de Poiseuille' },
      { f: 'P = ρgh', desc: 'Pression hydrostatique' },
    ],
  },
  {
    id: 'medicaments',
    num: '2',
    titre: 'Propriétés des Médicaments',
    couleur: '#14b8a6',
    icone: '💊',
    tag: 'Chimie pharmaceutique',
    notions: [
      'Structure des molécules actives',
      'Acides, bases et médicaments',
      'pH et efficacité des médicaments',
      'Solubilité et biodisponibilité',
      'Réactions chimiques en milieu biologique',
    ],
    formules: [
      { f: 'pH = pKa + log([A⁻]/[AH])', desc: 'Équation de Henderson-Hasselbalch' },
      { f: 'pKa + pKb = 14', desc: 'Relation pKa/pKb' },
    ],
  },
  {
    id: 'analyses',
    num: '3',
    titre: 'Analyses Médicales',
    couleur: '#f59e0b',
    icone: '🔬',
    tag: 'Biochimie analytique',
    notions: [
      'Spectrophotométrie UV-visible',
      'Loi de Beer-Lambert',
      'Dosages colorimétrique',
      'Chromatographie en phase liquide',
      'Électrophorèse',
    ],
    formules: [
      { f: 'A = ε·l·c', desc: 'Loi de Beer-Lambert' },
      { f: 'A = log(I₀/I)', desc: 'Absorbance' },
    ],
  },
  {
    id: 'rayonnements',
    num: '4',
    titre: 'Rayonnements Ionisants en Médecine',
    couleur: '#8b5cf6',
    icone: '☢️',
    tag: 'Radioactivité médicale',
    notions: [
      'Radioactivité α, β, γ',
      'Activité, dose absorbée',
      'Effets biologiques des rayonnements',
      'Applications diagnostiques (scintigraphie, PET scan)',
      'Applications thérapeutiques (radiothérapie)',
      'Radioprotection',
    ],
    formules: [
      { f: 'A = λN', desc: 'Activité radioactive' },
      { f: 'D = E/m', desc: 'Dose absorbée (Gray)' },
      { f: 'H = D·w_R', desc: 'Dose équivalente (Sievert)' },
    ],
  },
  {
    id: 'optique',
    num: '5',
    titre: 'Optique & Imagerie Médicale',
    couleur: '#06b6d4',
    icone: '👁️',
    tag: 'Optique médicale',
    notions: [
      'Lentilles et système optique de l\'œil',
      'Défauts visuels et corrections',
      'Endoscopie, fibroscopie',
      'Microscopie optique',
      'Imagerie par ultrasons (échographie)',
      'IRM — principes de base',
    ],
    formules: [
      { f: '1/f\' = 1/OA\' − 1/OA', desc: 'Vergence d\'une lentille' },
      { f: 'D = 1/f\'', desc: 'Vergence (dioptries)' },
    ],
  },
]

export default function PhysiqueST2SPage() {
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
            <span style={{ color: '#f472b6' }}>ST2S</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">🏥 Voie Technologique · Santé & Social</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(236,72,153,0.2)', color: '#f472b6', fontWeight: 700 }}>PCPS · Première / CBPH · Terminale</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Physique-Chimie pour la Santé<br />
              <span style={{ background: 'linear-gradient(90deg,#ec4899,#14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ST2S — Programme complet
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 6 chapitres</span><span>·</span><span>📐 40+ formules</span><span>·</span><span>📝 35+ exercices</span><span>·</span><span>🏥 Applications médicales</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:10, background:'linear-gradient(135deg,#ec4899,#be185d)', color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>🧮 Solveur PC</Link>
              <Link href="/chat" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)', color:'var(--text)', fontSize:13, fontWeight:600, textDecoration:'none' }}>🤖 Chat Prof</Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CHAPITRES.map(ch => (
              <div key={ch.id} style={{ background: `${ch.couleur}08`, border: `1px solid ${ch.couleur}28`, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ background: `${ch.couleur}14`, borderBottom: `1px solid ${ch.couleur}20`, padding: '18px 24px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: `${ch.couleur}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{ch.icone}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: ch.couleur, fontWeight: 700 }}>CH.{ch.num}</span>
                    <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{ch.titre}</h2>
                    <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${ch.couleur}20`, color: ch.couleur, fontWeight: 700 }}>{ch.tag}</span>
                  </div>
                </div>
                <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {ch.notions.map(n => (
                      <span key={n} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 18, background: `${ch.couleur}12`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                    ))}
                  </div>
                  {ch.formules.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {ch.formules.map(f => (
                        <div key={f.f} style={{ background: `${ch.couleur}18`, border: `1px solid ${ch.couleur}30`, borderRadius: 10, padding: '8px 14px' }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: ch.couleur, fontWeight: 700, marginBottom: 2 }}>{f.f}</div>
                          <div style={{ fontSize: 10, color: 'var(--muted)' }}>{f.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/bac-france/physique/st2s/${ch.id}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:9, background:`${ch.couleur}15`, border:`1px solid ${ch.couleur}30`, color:ch.couleur, fontSize:12, fontWeight:700, textDecoration:'none' }}>📖 Voir le cours →</Link>
                    <Link href={`/solve?q=${encodeURIComponent('Exercice physique ST2S : ' + ch.titre)}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:9, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--muted)', fontSize:12, fontWeight:600, textDecoration:'none' }}>🧮 Résoudre</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/physique/sti2d" style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(139,92,246,0.3)', background:'rgba(139,92,246,0.08)', color:'#a78bfa', fontSize:13, fontWeight:700, textDecoration:'none' }}>← STI2D</Link>
            <Link href="/bac-france/physique" style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.05)', color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>↑ Toutes les voies</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}