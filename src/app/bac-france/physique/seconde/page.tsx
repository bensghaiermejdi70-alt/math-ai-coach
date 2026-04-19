'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const CHAPITRES = [
  {
    id: 'atomes-noyau',
    num: '1',
    titre: 'Constitution & Transformations de la Matière',
    couleur: '#10b981',
    icone: '⚗️',
    tag: 'Chimie',
    souschap: [
      {
        titre: '1.1 Modélisation à l\'échelle microscopique',
        notions: ['Atomes, molécules, ions','Noyau atomique, isotopes','Tableau périodique des éléments','Électrons de valence, schémas de Lewis'],
        formules: [
          { f: 'A = Z + N', desc: 'Nombre de masse' },
          { f: 'Notation : ᴬ_Z X', desc: 'Symbole d\'un noyau' },
        ],
      },
      {
        titre: '1.2 Transformations chimiques',
        notions: ['Équations de réaction','Conservation de la masse','Combustions','Réactions d\'oxydo-réduction','Acides et bases, pH'],
        formules: [
          { f: 'pH = -log[H₃O⁺]', desc: 'Définition du pH' },
          { f: '[H₃O⁺]·[OH⁻] = Ke = 10⁻¹⁴', desc: 'Produit ionique de l\'eau' },
        ],
      },
    ],
  },
  {
    id: 'vecteur-vitesse',
    num: '2',
    titre: 'Mouvement & Interactions',
    couleur: '#4f6ef7',
    icone: '🚀',
    tag: 'Mécanique',
    souschap: [
      {
        titre: '2.1 Description du mouvement',
        notions: ['Référentiel, vecteur position','Vecteur vitesse, variation du vecteur vitesse','Trajectoire, mouvements rectiligne et circulaire'],
        formules: [
          { f: 'v = Δd/Δt', desc: 'Vitesse moyenne' },
          { f: 'v⃗ = dr⃗/dt', desc: 'Vecteur vitesse (dérivée)' },
        ],
      },
      {
        titre: '2.2 Actions mécaniques et forces',
        notions: ['Modélisation par des forces','Principe d\'inertie (1ère loi de Newton)','Poids, force électrostatique'],
        formules: [
          { f: 'P = mg', desc: 'Poids' },
          { f: 'Si ΣF⃗ = 0⃗ → v⃗ = cte', desc: 'Principe d\'inertie' },
        ],
      },
    ],
  },
  {
    id: 'ondes-sonores',
    num: '3',
    titre: 'Ondes & Signaux',
    couleur: '#8b5cf6',
    icone: '🌊',
    tag: 'Ondes',
    souschap: [
      {
        titre: '3.1 Ondes mécaniques',
        notions: ['Propagation d\'une perturbation','Ondes sonores, ultrasons','Vitesse de propagation, retard'],
        formules: [
          { f: 'v = d/t', desc: 'Vitesse de propagation' },
          { f: 'τ = d/v', desc: 'Retard' },
        ],
      },
      {
        titre: '3.2 Ondes lumineuses',
        notions: ['Propagation rectiligne de la lumière','Lentilles minces convergentes','Image réelle, image virtuelle','Distance focale f\', grandissement γ'],
        formules: [
          { f: '1/OA\' − 1/OA = 1/f\'', desc: 'Relation de conjugaison' },
          { f: 'γ = OA\'/OA = A\'B\'/AB', desc: 'Grandissement' },
          { f: 'D = 1/f\'', desc: 'Vergence (dioptries)' },
        ],
      },
      {
        titre: '3.3 Signaux électriques',
        notions: ['Tension électrique, intensité','Circuit en série et dérivation','Loi d\'Ohm','Puissance électrique, effet Joule'],
        formules: [
          { f: 'U = R·I', desc: 'Loi d\'Ohm' },
          { f: 'P = U·I = R·I²', desc: 'Puissance électrique' },
        ],
      },
    ],
  },
  {
    id: 'energies-formes',
    num: '4',
    titre: 'Conversions & Transferts d\'Énergie',
    couleur: '#f59e0b',
    icone: '🔋',
    tag: 'Énergie',
    souschap: [
      {
        titre: '4.1 Formes d\'énergie',
        notions: ['Énergie cinétique, énergie potentielle','Conservation de l\'énergie mécanique','Transferts thermiques (conduction, convection, rayonnement)'],
        formules: [
          { f: 'Ec = ½mv²', desc: 'Énergie cinétique' },
          { f: 'Ep = mgh', desc: 'Énergie potentielle' },
        ],
      },
      {
        titre: '4.2 Bilans énergétiques',
        notions: ['Bilan de puissance dans un circuit','Rendement d\'un convertisseur'],
        formules: [
          { f: 'η = P_utile/P_absorbée × 100%', desc: 'Rendement' },
        ],
      },
    ],
  },
]

export default function PhysiqueSecondePage() {
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
            <span style={{ color: '#34d399' }}>Seconde</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="label">⚛️ Seconde Générale & Technologique</span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.2)', color: '#34d399', fontWeight: 700 }}>Enseignement commun · 3h/semaine</span>
            </div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,42px)', marginBottom: 14 }}>
              Physique-Chimie<br />
              <span style={{ background: 'linear-gradient(90deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Seconde — Programme complet
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
              <span>📚 10 chapitres</span><span>·</span><span>📐 65+ formules</span><span>·</span><span>📝 70+ exercices</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/solve" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:10, background:'linear-gradient(135deg,#10b981,#059669)', color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>🧮 Solveur PC</Link>
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
                    <Link href={`/bac-france/physique/seconde/${ch.id}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:9, background:`${ch.couleur}15`, border:`1px solid ${ch.couleur}30`, color:ch.couleur, fontSize:12, fontWeight:700, textDecoration:'none' }}>📖 Voir le cours →</Link>
                    <Link href={`/solve?q=${encodeURIComponent('Exercice physique Seconde : ' + ch.titre)}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:9, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--muted)', fontSize:12, fontWeight:600, textDecoration:'none' }}>🧮 Résoudre</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bac-france/physique" style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.05)', color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>↑ Toutes les voies</Link>
            <Link href="/bac-france/physique/premiere" style={{ padding:'10px 20px', borderRadius:12, border:'1px solid rgba(79,110,247,0.3)', background:'rgba(79,110,247,0.08)', color:'#818cf8', fontSize:13, fontWeight:700, textDecoration:'none' }}>Première →</Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}