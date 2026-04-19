'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'quantite-matiere','avancement-reaction','oxydoreduction','geometrie-moleculaire',
  'loi-coulomb','champ-electrique-gravitationnel','pression-fluides','deuxieme-loi-approche',
  'energie-cinetique','energie-mecanique','bilan-energetique','energie-chimique',
  'ondes-mecaniques','ondes-sonores','ondes-electromagnetiques','numerisation',
]

const TITRES: Record<string,string> = {
  'quantite-matiere':              'Quantité de matière & Mole',
  'avancement-reaction':           'Avancement d\'une réaction',
  'oxydoreduction':                'Réactions d\'oxydo-réduction',
  'geometrie-moleculaire':         'Géométrie moléculaire (VSEPR)',
  'loi-coulomb':                   'Loi de Coulomb',
  'champ-electrique-gravitationnel':'Champs électrique & gravitationnel',
  'pression-fluides':              'Pression dans les fluides',
  'deuxieme-loi-approche':         '2ème loi de Newton (approche)',
  'energie-cinetique':             'Énergie cinétique & travail',
  'energie-mecanique':             'Énergie mécanique',
  'bilan-energetique':             'Bilans énergétiques',
  'energie-chimique':              'Énergie chimique & thermique',
  'ondes-mecaniques':              'Ondes mécaniques progressives',
  'ondes-sonores':                 'Ondes sonores & acoustique',
  'ondes-electromagnetiques':      'Ondes électromagnétiques',
  'numerisation':                  'Numérisation du signal',
}

const SEC_COLOR: Record<string,string> = {
  'quantite-matiere':'#10b981','avancement-reaction':'#10b981','oxydoreduction':'#10b981','geometrie-moleculaire':'#10b981',
  'loi-coulomb':'#4f6ef7','champ-electrique-gravitationnel':'#4f6ef7','pression-fluides':'#4f6ef7','deuxieme-loi-approche':'#4f6ef7',
  'energie-cinetique':'#f59e0b','energie-mecanique':'#f59e0b','bilan-energetique':'#f59e0b','energie-chimique':'#f59e0b',
  'ondes-mecaniques':'#8b5cf6','ondes-sonores':'#8b5cf6','ondes-electromagnetiques':'#8b5cf6','numerisation':'#8b5cf6',
}

const CHAPITRES: Record<string,any> = {
  'quantite-matiere': {
    ch:'CH 01', titre:'Quantité de matière & Mole', badge:'Chimie', duree:'~3h', section:'Section 1 — Constitution & Transformations',
    desc:'La mole est l\'unité fondamentale de quantité de matière. Elle permet de relier la masse, le volume et le nombre d\'entités.',
    theoremes:[
      {id:'D1',type:'def',nom:'La mole et la constante d\'Avogadro',enonce:'1 mole contient Nₐ = 6,022×10²³ entités (atomes, molécules, ions…)\nNₐ = constante d\'Avogadro\n\nQuantité de matière : n (en mol)\nMasse molaire : M (en g/mol)\n→ M = masse d\'une mole de l\'entité'},
      {id:'F1',type:'formule',nom:'Relations fondamentales',enonce:'n = m/M  (m en g, M en g/mol)\n\nn = C·V  (solution : C en mol/L, V en L)\n\nn = V_gaz/Vm  (Vm = 24,0 L/mol à 25°C et 1 bar)\n\nn = N/Nₐ  (N = nombre d\'entités)\n\nConcentration massique :\nCm = m/V  (en g/L)'},
      {id:'P1',type:'prop',nom:'Masse molaire d\'une molécule',enonce:'M(molécule) = somme des masses molaires atomiques\n\nExemples :\nM(H₂O) = 2×1 + 16 = 18 g/mol\nM(CO₂) = 12 + 2×16 = 44 g/mol\nM(NaCl) = 23 + 35,5 = 58,5 g/mol'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Préparation d\'une solution',enonce:'Calculer la masse de NaCl (M = 58,5 g/mol) pour préparer 250 mL à C = 0,2 mol/L.',correction:'n = C·V = 0,2×0,250 = 0,05 mol\nm = n·M = 0,05×58,5 = 2,925 g ≈ 2,93 g'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Nombre de molécules',enonce:'2 g de dihydrogène H₂ (M = 2 g/mol). Calculer n et le nombre de molécules.',correction:'n = m/M = 2/2 = 1 mol\nN = n·Nₐ = 1×6,022×10²³ = 6,022×10²³ molécules'},
    ],
  },

  'avancement-reaction': {
    ch:'CH 02', titre:'Avancement d\'une réaction', badge:'Chimie', duree:'~4h', section:'Section 1 — Constitution & Transformations',
    desc:'Le tableau d\'avancement permet de suivre l\'évolution des quantités de matière au cours d\'une réaction chimique.',
    theoremes:[
      {id:'D1',type:'def',nom:'Avancement x',enonce:'L\'avancement x (en mol) décrit la progression de la réaction.\n\nPour la réaction : a A + b B → c C + d D\n\nÀ l\'état initial : n₀(A), n₀(B), 0, 0\nÀ l\'avancement x : n(A) = n₀(A)−ax, n(B) = n₀(B)−bx, n(C) = cx, n(D) = dx\n\nContrainte : toutes les quantités sont ≥ 0'},
      {id:'M1',type:'methode',nom:'Tableau d\'avancement — Réactif limitant',enonce:'Méthode :\n1. Écrire l\'équation équilibrée\n2. Remplir le tableau d\'avancement\n3. Trouver x_max : le réactif qui s\'annule en premier\n\nRéactif limitant A : x_max = n₀(A)/a\nRéactif limitant B : x_max = n₀(B)/b\n→ x_max = min(n₀(A)/a, n₀(B)/b)\n\nRéaction totale : un réactif est entièrement consommé\nRéaction limitée : équilibre chimique (aucun réactif totalement consommé)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Réactif limitant',enonce:'2H₂ + O₂ → 2H₂O. On a n₀(H₂) = 4 mol, n₀(O₂) = 3 mol. Trouver le réactif limitant et x_max.',correction:'x_max si H₂ limitant : x = n₀(H₂)/2 = 4/2 = 2 mol\nx_max si O₂ limitant : x = n₀(O₂)/1 = 3/1 = 3 mol\nx_max = min(2, 3) = 2 mol → H₂ est le réactif limitant\nn(H₂O) = 2×x_max = 4 mol'},
    ],
  },

  'loi-coulomb': {
    ch:'CH 05', titre:'Loi de Coulomb', badge:'Physique', duree:'~4h', section:'Section 2 — Mouvement & Interactions',
    desc:'La loi de Coulomb décrit l\'interaction électrostatique entre charges ponctuelles. Analogie avec la gravitation universelle.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Loi de Coulomb',enonce:'Force électrostatique entre deux charges q₁ et q₂ séparées de r :\n\nF = k·|q₁|·|q₂|/r²\n\nk = 1/(4πε₀) = 9×10⁹ N·m²·C⁻²\n\n• Même signe → répulsion\n• Signes opposés → attraction\n• F suit la 3ème loi de Newton'},
      {id:'F2',type:'formule',nom:'Champ électrique',enonce:'Champ créé par une charge ponctuelle Q au point M (à distance r) :\nE = k·|Q|/r²  (en N/C ou V/m)\n\nForce sur une charge q dans un champ E⃗ :\nF⃗ = q·E⃗\n\nComparaison avec la gravitation :\nF_grav = G·M·m/r²  (G = 6,67×10⁻¹¹)\nAnalogies : q ↔ m, k ↔ G  (mais gravitation toujours attractive)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Force de Coulomb',enonce:'q₁ = +2 μC, q₂ = −3 μC, r = 0,1 m. Calculer F. Attractive ou répulsive ?',correction:'F = k|q₁||q₂|/r² = 9×10⁹×2×10⁻⁶×3×10⁻⁶/(0,1)²\nF = 9×10⁹×6×10⁻¹²/0,01 = 54×10⁻³/0,01 = 5,4 N\nCharges de signes opposés → ATTRACTIVE'},
    ],
  },

  'ondes-mecaniques': {
    ch:'CH 13', titre:'Ondes mécaniques progressives', badge:'Ondes', duree:'~4h', section:'Section 4 — Ondes & Signaux',
    desc:'Une onde mécanique est la propagation d\'une perturbation dans un milieu matériel sans transport de matière.',
    theoremes:[
      {id:'D1',type:'def',nom:'Onde progressive périodique',enonce:'Onde progressive : perturbation se propageant dans un milieu avec une célérité v.\n\nOnde périodique : perturbation qui se reproduit identiquement à intervalles réguliers.\n\nPériode T (s) : durée d\'un cycle\nFréquence f (Hz) : f = 1/T\nLongueur d\'onde λ (m) : distance parcourue en une période'},
      {id:'F1',type:'formule',nom:'Relation fondamentale',enonce:'v = λ/T = λ·f\n\nRetard temporel :\nτ = d/v  (d = distance source-point M)\n\nÀ l\'instant t, le point M reproduit l\'état de la source à l\'instant (t−τ).\n\nDéphasage : φ = 2π·d/λ = 2π·τ/T'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Célérité et longueur d\'onde',enonce:'Son dans l\'air : f = 440 Hz, v = 340 m/s. Calculer λ et τ pour d = 85 m.',correction:'λ = v/f = 340/440 ≈ 0,773 m\nτ = d/v = 85/340 = 0,25 s'},
    ],
  },

  'numerisation': {
    ch:'CH 16', titre:'Numérisation du signal', badge:'Signal', duree:'~3h', section:'Section 4 — Ondes & Signaux',
    desc:'La numérisation convertit un signal analogique en signal numérique par échantillonnage et quantification.',
    theoremes:[
      {id:'D1',type:'def',nom:'Échantillonnage et quantification',enonce:'Échantillonnage : mesure du signal à intervalles réguliers (période Te = 1/fe).\n\nQuantification : arrondi de la valeur mesurée sur n bits.\n→ 2ⁿ niveaux de quantification\n\nConversion : Convertisseur Analogique-Numérique (CAN)'},
      {id:'T1',type:'thm',nom:'Critère de Shannon (Nyquist)',enonce:'Pour pouvoir reconstituer fidèlement le signal numérisé :\nfe ≥ 2·fmax\n\nfe = fréquence d\'échantillonnage\nfmax = fréquence maximale du signal\n\nSi fe < 2fmax → repliement spectral (aliasing) : distorsion du signal\n\nExemple : CD audio\n• fe = 44 100 Hz → reproduit jusqu\'à 22 050 Hz (limite auditive ≈ 20 000 Hz) ✓\n• n = 16 bits → 2¹⁶ = 65 536 niveaux'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Critère de Shannon',enonce:'Un signal contient des fréquences jusqu\'à f_max = 8 kHz. Quelle fréquence d\'échantillonnage minimale ?',correction:'fe_min = 2·f_max = 2×8000 = 16 000 Hz = 16 kHz'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Débit binaire',enonce:'fe = 44 100 Hz, n = 16 bits, stéréo (2 canaux). Calculer le débit binaire.',correction:'Débit = fe × n × nb_canaux = 44100 × 16 × 2 = 1 411 200 bits/s ≈ 1,41 Mbit/s'},
    ],
  },
}

export default function PhysiquePremChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)

  if (!ch) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>⚗️</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/physique/premiere" className="btn btn-primary">← Retour Première PC</Link>
    </div>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLOR[slug] || '#4f6ef7'

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:32, paddingBottom:80 }}>

          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--muted)', marginBottom:24, flexWrap:'wrap' }}>
            <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link>
            <span>›</span>
            <Link href="/bac-france/physique/premiere" style={{ color:'var(--muted)', textDecoration:'none' }}>Première</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{ch.titre}</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <div style={{ marginBottom:28 }}>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>{ch.ch}</span>
                  <span className="label">{ch.badge}</span>
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(79,110,247,0.15)', color:'#818cf8', fontWeight:700 }}>Première PC</span>
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(255,255,255,0.07)', color:'var(--muted)', fontWeight:600 }}>⏱ {ch.duree}</span>
                </div>
                <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(22px,3vw,36px)', marginBottom:10 }}>{ch.titre}</h1>
                <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7, marginBottom:16 }}>{ch.desc}</p>
                <div style={{ fontSize:12, color:'var(--muted)', fontStyle:'italic' }}>{ch.section}</div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:32 }}>
                {ch.theoremes.map((t: any) => (
                  <div key={t.id} style={{ border:`1px solid ${C[t.type as keyof typeof C]}30`, borderLeft:`4px solid ${C[t.type as keyof typeof C]}`, borderRadius:'0 12px 12px 0', overflow:'hidden' }}>
                    <div style={{ background:`${C[t.type as keyof typeof C]}10`, padding:'10px 16px', display:'flex', gap:10, alignItems:'center' }}>
                      <span style={{ fontSize:10, fontWeight:800, color:C[t.type as keyof typeof C], fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', background:`${C[t.type as keyof typeof C]}20`, padding:'2px 8px', borderRadius:6 }}>{L[t.type]}</span>
                      <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{t.nom}</span>
                    </div>
                    <div style={{ padding:'14px 18px', background:'rgba(255,255,255,0.02)' }}>
                      <pre style={{ fontSize:13, color:'var(--text2)', lineHeight:1.85, margin:0, fontFamily:'var(--font-body)', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{t.enonce}</pre>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom:32 }}>
                <h2 style={{ fontSize:17, fontWeight:800, marginBottom:14 }}>📝 Exercices d'entraînement</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {ch.exercices.map((ex: any) => (
                    <div key={ex.id} style={{ border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                      <div style={{ padding:'12px 20px', display:'flex', gap:10, alignItems:'flex-start' }}>
                        <div style={{ flexShrink:0 }}>
                          <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--muted)' }}>{ex.id}</span>
                          <div style={{ marginTop:3 }}>
                            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, fontWeight:700,
                              background: ex.niveau==='Facile'?'rgba(16,185,129,0.15)':'rgba(245,158,11,0.15)',
                              color: ex.niveau==='Facile'?'#34d399':'#fbbf24'
                            }}>{ex.niveau}</span>
                          </div>
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:6 }}>{ex.titre}</div>
                          <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7 }}>{ex.enonce}</div>
                        </div>
                      </div>
                      <div style={{ borderTop:'1px solid var(--border)', padding:'10px 20px', display:'flex', gap:10, flexWrap:'wrap' }}>
                        <Link href={`/solve?q=${encodeURIComponent('Première PC France, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:12, padding:'6px 14px' }}>
                          🧮 Résoudre avec IA
                        </Link>
                        <button onClick={() => setOpenEx(openEx===ex.id?null:ex.id)}
                          style={{ fontSize:12, padding:'6px 14px', borderRadius:8, border:'1px solid var(--border)', background:'transparent', color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
                          📋 {openEx===ex.id?'Masquer':'Correction'}
                        </button>
                      </div>
                      {openEx===ex.id && (
                        <div style={{ padding:'13px 20px', borderTop:'1px solid var(--border)', background:`${secColor}06` }}>
                          <div style={{ fontSize:11, color:secColor, fontWeight:700, marginBottom:5 }}>✅ Correction</div>
                          <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.75, whiteSpace:'pre-line' }}>{ex.correction}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:22 }}>
                {prevSlug?(<Link href={`/bac-france/physique/premiere/${prevSlug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ padding:'13px 16px', transition:'transform 0.15s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>← Précédent</div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[prevSlug]}</div>
                  </div>
                </Link>):<div/>}
                {nextSlug?(<Link href={`/bac-france/physique/premiere/${nextSlug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ padding:'13px 16px', textAlign:'right', transition:'transform 0.15s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>Suivant →</div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[nextSlug]}</div>
                  </div>
                </Link>):<div/>}
              </div>
            </div>

            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', marginBottom:14 }}>
                <div style={{ padding:'11px 15px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>⚛️ Première PC — 16 chapitres</div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/physique/premiere/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none', background:s===slug?`${SEC_COLOR[s]}12`:'transparent', borderLeft:s===slug?`3px solid ${SEC_COLOR[s]}`:'3px solid transparent', transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH {String(i+1).padStart(2,'0')}</div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLOR[s]:'var(--text2)' }}>{TITRES[s]}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:13, padding:'14px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+ch.titre+' en Première PC')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>🤖 Chat IA — {ch.titre}</Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac PC</Link>
                  <Link href="/bac-france/physique/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎓 Voir Terminale PC</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}