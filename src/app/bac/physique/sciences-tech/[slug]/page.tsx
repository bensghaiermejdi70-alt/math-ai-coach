'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TUNISIE — Sciences Tech. — PAGE SLUG
// Route : /bac/physique/sciences-tech/[slug]
// Programme officiel MEN Tunisie · 4ème année Sciences Tech.
// ══════════════════════════════════════════════════════════════════════

const C: Record<string, string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = ['dipole-rc-tech', 'dipole-rl-tech', 'oscillations-lc-tech', 'oscillations-mec-tech', 'ondes-mec-tech', 'ondes-lum-tech', 'nucleaire-tech', 'cinetique-tech', 'equilibres-tech', 'acide-base-tech', 'electrochimie-tech', 'organique-tech']
const TITRES_NAV: Record<string,string> = {
  'dipole-rc-tech': 'CH.1 — Dipôle RC',
  'dipole-rl-tech': 'CH.2 — Dipôle RL',
  'oscillations-lc-tech': 'CH.3 — Oscillations LC',
  'oscillations-mec-tech': 'CH.4 — Oscillateurs mécaniques',
  'ondes-mec-tech': 'CH.5 — Ondes mécaniques',
  'ondes-lum-tech': 'CH.6 — Ondes lumineuses',
  'nucleaire-tech': 'CH.7 — Réactions nucléaires',
  'cinetique-tech': 'CH.1 — Cinétique chimique',
  'equilibres-tech': 'CH.2 — Équilibres chimiques',
  'acide-base-tech': 'CH.3 — Acides et bases',
  'electrochimie-tech': 'CH.4 — Électrochimie',
  'organique-tech': 'CH.5 — Chimie organique',
}
const SEC_COLORS: Record<string,string> = {
  'dipole-rc-tech':'#4f6ef7',
  'dipole-rl-tech':'#8b5cf6',
  'oscillations-lc-tech':'#06b6d4',
  'oscillations-mec-tech':'#10b981',
  'ondes-mec-tech':'#f59e0b',
  'ondes-lumineuses-tech':'#14b8a6',
  'nucleaire-tech':'#ef4444',
  'cinetique-tech':'#f59e0b',
  'equilibres-tech':'#8b5cf6',
  'acide-base-tech':'#10b981',
  'electrochimie-tech':'#ef4444',
  'organique-tech':'#06b6d4',
}

// ═══════════════════════════════════════════════════════════════════
// DONNÉES — TOUS LES CHAPITRES
// ═══════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string, {
  id:string; titre:string; badge:string; color:string; emoji:string; desc:string;
  souschapitres: {
    id:string; titre:string; notions:string[];
    blocs: {
      notion:string;
      theoremes: {id:string; type:string; nom:string; enonce:string}[];
      exercices: {id:string; niveau:string; titre:string; enonce:string; correction:string}[];
    }[];
  }[];
}> = {

'dipole-rc-tech': {
  id:'dipole-rc-tech', emoji:'🔌', badge:'Physique T1', color:'#4f6ef7',
  titre:"Dipôle RC",
  desc:"Charge et décharge du condensateur, constante de temps τ=RC, équation différentielle.",
  souschapitres:[
    { id:'sc-rc', titre:"Condensateur — charge et décharge",
      notions:["q=CU","E=½CU²","τ=RC","Décharge"],
      blocs:[{ notion:"⚡ Condensateur",
        theoremes:[
          { id:'D-RC1', type:'def', nom:"Condensateur",
            enonce:"Charge : u_C(t) = E(1 − e^(−t/τ)), τ = RC\nDécharge : u_C(t) = U₀·e^(−t/τ)\nÉnergie : E_C = ½·C·u_C²" },
          { id:'F-RC1', type:'formule', nom:"Constante de temps",
            enonce:"τ = R·C (secondes)\nÀ t=τ : u_C ≈ 0,63·E (charge)" },
        ],
        exercices:[
          { id:'EX-RC1', niveau:'Facile', titre:"Calcul de τ",
            enonce:"R = 10 kΩ, C = 100 μF. Calculer τ.",
            correction:"τ = RC = 10×10³ × 100×10⁻⁶ = 1 s" },
          { id:'EX-RC2', niveau:'Intermédiaire', titre:"Tension après τ",
            enonce:"E = 12V, τ = 2s. Valeur de u_C à t=2s ?",
            correction:"u_C(τ) = 12(1−e⁻¹) = 12×0,632 ≈ 7,6 V" },
        ]
      }]
    }
  ]
},
'dipole-rl-tech': {
  id:'dipole-rl-tech', emoji:'🌀', badge:'Physique T1', color:'#8b5cf6',
  titre:"Dipôle RL",
  desc:"Bobine, auto-induction, énergie magnétique E_m=½LI², constante de temps τ=L/R, rupture du courant.",
  souschapitres:[
    { id:'sc-rl', titre:"Bobine et dipôle RL",
      notions:["e_L=−L·di/dt","E_m=½LI²","τ=L/R","Rupture"],
      blocs:[{ notion:"🌀 Auto-induction",
        theoremes:[
          { id:'D-RL1', type:'def', nom:"Bobine idéale",
            enonce:"f.e.m. : e_L = −L·di/dt\nÉnergie : E_m = ½·L·I²\nDipôle RL : i(t) = (E/R)(1−e^(−t/τ)), τ = L/R\nRupture → surtension (arc électrique)" },
          { id:'F-RL1', type:'formule', nom:"Constante de temps RL",
            enonce:"τ = L/R (secondes)\ni_inf = E/R (régime permanent)" },
        ],
        exercices:[
          { id:'EX-RL1', niveau:'Facile', titre:"Énergie magnétique",
            enonce:"L = 0,5H, I = 2A. Calculer E_m.",
            correction:"E_m = ½×0,5×4 = 1 J" },
          { id:'EX-RL2', niveau:'Intermédiaire', titre:"Réponse RL",
            enonce:"L=0,2H, R=100Ω, E=10V. Écrire i(t) et τ.",
            correction:"τ=2ms, i(t)=0,1(1−e^(−500t)) A" },
        ]
      }]
    }
  ]
},
'oscillations-lc-tech': {
  id:'oscillations-lc-tech', emoji:'〰️', badge:'Physique T1', color:'#06b6d4',
  titre:"Oscillations électriques libres LC et RLC",
  desc:"Circuit LC non amorti T₀=2π√(LC), RLC amorti, régimes, échanges d'énergie.",
  souschapitres:[
    { id:'sc-lc', titre:"Circuit LC et RLC",
      notions:["T₀=2π√(LC)","ω₀=1/√(LC)","Régimes RLC","R_c=2√(L/C)"],
      blocs:[
        { notion:"〰️ Oscillations libres LC",
          theoremes:[
            { id:'T-LC1', type:'thm', nom:"Circuit LC",
              enonce:"L·d²q/dt² + q/C = 0\nq(t)=Q_max·cos(ω₀t+φ)\nT₀=2π√(LC), ω₀=1/√(LC)\nE_totale=E_C+E_m=cte" },
            { id:'F-LC1', type:'formule', nom:"Période propre",
              enonce:"T₀ = 2π√(LC)\nf₀ = 1/(2π√(LC))" },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:"Calcul T₀",
              enonce:"L=10mH, C=100nF. T₀ = ?",
              correction:"T₀ = 2π√(10⁻²×10⁻⁷) ≈ 1,99×10⁻³ s" },
          ]
        },
        { notion:"📉 Circuit RLC amorti",
          theoremes:[
            { id:'T-RLC1', type:'thm', nom:"Régimes RLC",
              enonce:"R_c = 2√(L/C)\nR<R_c : pseudo-périodique\nR=R_c : apériodique critique\nR>R_c : apériodique" },
          ],
          exercices:[
            { id:'EX-RLC1', niveau:'Intermédiaire', titre:"Résistance critique",
              enonce:"L=50mH, C=20μF. R_c = ?",
              correction:"R_c = 2√(50×10⁻³/20×10⁻⁶) = 100 Ω" },
          ]
        }
      ]
    }
  ]
},
'oscillations-mec-tech': {
  id:'oscillations-mec-tech', emoji:'🔄', badge:'Physique T2', color:'#10b981',
  titre:"Oscillateurs mécaniques",
  desc:"Pendule simple T=2π√(l/g), ressort T=2π√(m/k), analogie électromécanique.",
  souschapitres:[
    { id:'sc-osc', titre:"Pendule et ressort",
      notions:["T=2π√(l/g)","T=2π√(m/k)","Analogie","Énergie"],
      blocs:[{ notion:"🔄 Oscillateurs libres",
        theoremes:[
          { id:'T-OSC1', type:'thm', nom:"Pendule et ressort",
            enonce:"Pendule : T₀=2π√(l/g)\nRessort : T₀=2π√(m/k), ω₀=√(k/m)\nAnalogies : m↔L, k↔1/C, v↔i, x↔q" },
        ],
        exercices:[
          { id:'EX-OSC1', niveau:'Facile', titre:"Pendule simple",
            enonce:"l=1m, g=9,8m/s². T₀ = ?",
            correction:"T₀ = 2π√(1/9,8) ≈ 2,006 s" },
          { id:'EX-OSC2', niveau:'Intermédiaire', titre:"Ressort horizontal",
            enonce:"m=200g, k=80N/m. f₀ = ?",
            correction:"ω₀=√(80/0,2)=20 rad/s, f₀≈3,18 Hz" },
        ]
      }]
    }
  ]
},
'ondes-mec-tech': {
  id:'ondes-mec-tech', emoji:'🌊', badge:'Physique T2', color:'#f59e0b',
  titre:"Ondes mécaniques progressives",
  desc:"Célérité v, retard τ=d/v, longueur d'onde λ=vT, ondes stationnaires, ultrasons.",
  souschapitres:[
    { id:'sc-ondes', titre:"Propagation et ondes stationnaires",
      notions:["v=λf","τ=d/v","Déphasage","fn=nv/(2L)"],
      blocs:[
        { notion:"🌊 Ondes progressives",
          theoremes:[
            { id:'D-ON1', type:'def', nom:"Onde mécanique",
              enonce:"λ = v·T = v/f\nRetard : τ = d/v\nDéphasage : φ = 2πd/λ" },
          ],
          exercices:[
            { id:'EX-ON1', niveau:'Facile', titre:"Longueur d'onde",
              enonce:"v=340m/s, f=440Hz. λ = ?",
              correction:"λ = 340/440 ≈ 0,77 m" },
          ]
        },
        { notion:"〰️ Ondes stationnaires",
          theoremes:[
            { id:'T-ON2', type:'thm', nom:"Cordes et tuyaux",
              enonce:"Corde (L fixée) : f_n = n·v/(2L)\nTuyau ouvert : f_n = n·v/(2L)\nTuyau fermé : f_n = (2n−1)·v/(4L)" },
          ],
          exercices:[
            { id:'EX-ON2', niveau:'Intermédiaire', titre:"Corde vibrante",
              enonce:"L=0,8m, v=400m/s. f₁ = ?",
              correction:"f₁ = 400/(2×0,8) = 250 Hz" },
          ]
        }
      ]
    }
  ]
},
'ondes-lum-tech': {
  id:'ondes-lum-tech', emoji:'🌈', badge:'Physique T3', color:'#14b8a6',
  titre:"Ondes lumineuses",
  desc:"Diffraction θ≈λ/a, interférences Young i=λD/a, réseau nλ=d·sinθ, dispersion.",
  souschapitres:[
    { id:'sc-lum', titre:"Diffraction et interférences",
      notions:["θ≈λ/a","i=λD/a","nλ=d·sinθ","Dispersion"],
      blocs:[{ notion:"🌀 Diffraction et interférences",
        theoremes:[
          { id:'T-LUM1', type:'thm', nom:"Formules clés",
            enonce:"Diffraction : θ≈λ/a, L=2λD/a\nYoung : i=λD/a\nRéseau : d·sinθ_n=n·λ" },
        ],
        exercices:[
          { id:'EX-LUM1', niveau:'Intermédiaire', titre:"Interfrange Young",
            enonce:"λ=589nm, a=0,2mm, D=1,5m. i = ?",
            correction:"i = 589×10⁻⁹×1,5/(0,2×10⁻³) = 4,42 mm" },
        ]
      }]
    }
  ]
},
'nucleaire-tech': {
  id:'nucleaire-tech', emoji:'☢️', badge:'Physique T3', color:'#ef4444',
  titre:"Réactions nucléaires",
  desc:"Radioactivité α β γ, loi N(t)=N₀e^(-λt), demi-vie, fission, fusion, E=Δm·c².",
  souschapitres:[
    { id:'sc-nuc', titre:"Radioactivité et énergie nucléaire",
      notions:["N(t)=N₀e^(-λt)","t1/2=ln2/λ","E=Δm·c²","Fission/Fusion"],
      blocs:[{ notion:"☢️ Décroissance radioactive",
        theoremes:[
          { id:'T-NUC1', type:'thm', nom:"Loi de décroissance",
            enonce:"N(t) = N₀·e^(−λt)\nt_1/2 = ln2/λ\nActivité : A = λN\nÉnergie : E = Δm·c²" },
        ],
        exercices:[
          { id:'EX-NUC1', niveau:'Facile', titre:"Demi-vie",
            enonce:"λ=0,0693 s⁻¹. t1/2 = ?",
            correction:"t1/2 = ln2/0,0693 = 10 s" },
          { id:'EX-NUC2', niveau:'Intermédiaire', titre:"Décroissance",
            enonce:"N₀=10⁸, t1/2=5ans. N après 15ans ?",
            correction:"15=3×t1/2 → N=N₀/2³=1,25×10⁷" },
        ]
      }]
    }
  ]
},
'cinetique-tech': {
  id:'cinetique-tech', emoji:'⏱️', badge:'Chimie T1', color:'#f59e0b',
  titre:"Cinétique chimique",
  desc:"Vitesse v=−d[A]/dt, tableau avancement, taux conversion τ=x_f/x_max, facteurs cinétiques.",
  souschapitres:[
    { id:'sc-cin', titre:"Vitesse et avancement",
      notions:["v=−d[A]/dt","τ=x_f/x_max","Facteurs cinétiques","Catalyse"],
      blocs:[{ notion:"⏱️ Cinétique chimique",
        theoremes:[
          { id:'T-CIN1', type:'thm', nom:"Vitesse et avancement",
            enonce:"v = −(1/a)d[A]/dt\nτ = x_f/x_max\nOrdre 1 : [A](t) = [A]₀·e^(−kt), t1/2=ln2/k\nBeer-Lambert : A = ε·l·c" },
        ],
        exercices:[
          { id:'EX-CIN1', niveau:'Intermédiaire', titre:"Taux conversion",
            enonce:"x_max=0,5mol, x_f=0,35mol. τ = ?",
            correction:"τ = 0,35/0,5 = 0,70 soit 70%" },
        ]
      }]
    }
  ]
},
'equilibres-tech': {
  id:'equilibres-tech', emoji:'⚖️', badge:'Chimie T1', color:'#8b5cf6',
  titre:"Équilibres chimiques",
  desc:"Quotient Qr, constante Kéq, critère évolution, loi de modération (Le Chatelier).",
  souschapitres:[
    { id:'sc-eq', titre:"Équilibre et modération",
      notions:["Qr vs K","Sens direct/inverse","Le Chatelier","τf"],
      blocs:[{ notion:"⚖️ Équilibre chimique",
        theoremes:[
          { id:'T-EQ1', type:'thm', nom:"Critère évolution",
            enonce:"Qr < K → sens direct\nQr > K → sens inverse\nQr = K → équilibre\nLe Chatelier : opposition à toute perturbation" },
        ],
        exercices:[
          { id:'EX-EQ1', niveau:'Intermédiaire', titre:"Sens évolution",
            enonce:"K=4, Qr=0,25. Sens ?",
            correction:"Qr=0,25 < K=4 → sens direct" },
        ]
      }]
    }
  ]
},
'acide-base-tech': {
  id:'acide-base-tech', emoji:'🧪', badge:'Chimie T2', color:'#10b981',
  titre:"Acides et bases",
  desc:"Couples acide/base, pH, Ka, pKa, dosages pH-métriques et conductimètriques.",
  souschapitres:[
    { id:'sc-ab', titre:"pH, Ka et titrages",
      notions:["pH=−log[H₃O⁺]","Ka et pKa","Titrage","Indicateurs"],
      blocs:[{ notion:"🧪 Théorie acide-base",
        theoremes:[
          { id:'D-AB1', type:'def', nom:"Couple acide/base",
            enonce:"AH + H₂O ⇌ A⁻ + H₃O⁺\nKa=[A⁻][H₃O⁺]/[AH], pKa=−log(Ka)\npH acide fort : pH=−log C\nÉquivalence : C_A·V_A=C_B·V_B" },
        ],
        exercices:[
          { id:'EX-AB1', niveau:'Facile', titre:"pH acide fort",
            enonce:"HCl, C=0,01mol/L. pH = ?",
            correction:"pH = −log(0,01) = 2" },
          { id:'EX-AB2', niveau:'Intermédiaire', titre:"Dosage",
            enonce:"V_A=20mL, C_B=0,1mol/L, V_éq=25mL. C_A = ?",
            correction:"C_A = 0,1×25/20 = 0,125 mol/L" },
        ]
      }]
    }
  ]
},
'electrochimie-tech': {
  id:'electrochimie-tech', emoji:'🔋', badge:'Chimie T3', color:'#ef4444',
  titre:"Électrochimie",
  desc:"Couples rédox, pile électrochimique, formule de Nernst, électrolyse, loi de Faraday.",
  souschapitres:[
    { id:'sc-redox', titre:"Piles et électrolyse",
      notions:["Couples rédox","f.e.m.","Nernst","Faraday m=MIt/nF"],
      blocs:[{ notion:"🔋 Pile et électrolyse",
        theoremes:[
          { id:'T-ELEC1', type:'thm', nom:"Pile et Faraday",
            enonce:"Pile : Anode(−) oxydation, Cathode(+) réduction\nNernst : E = E° + (0,06/n)·log([Ox]/[Red])\nÉlectrolyse : m = M·I·t/(n·F)" },
        ],
        exercices:[
          { id:'EX-ELEC1', niveau:'Intermédiaire', titre:"Loi de Faraday",
            enonce:"CuSO₄ : I=2A, t=30min, M=64, n=2. Masse ?",
            correction:"m = 64×2×1800/(2×96500) ≈ 1,19 g" },
        ]
      }]
    }
  ]
},
'organique-tech': {
  id:'organique-tech', emoji:'🔬', badge:'Chimie T3', color:'#06b6d4',
  titre:"Chimie organique",
  desc:"Composés carbonylés, acides carboxyliques, estérification τ≈0,67, polymères.",
  souschapitres:[
    { id:'sc-org', titre:"Estérification et polymères",
      notions:["Aldéhydes/Cétones","Acides carboxyliques","Estérification","Polymères"],
      blocs:[{ notion:"🔬 Fonctions organiques",
        theoremes:[
          { id:'T-ORG1', type:'thm', nom:"Estérification",
            enonce:"Acide + alcool ⇌ Ester + eau (H⁺)\nτ≈0,67 (équimolaire)\nPolyaddition/Polycondensation → polymères" },
        ],
        exercices:[
          { id:'EX-ORG1', niveau:'Facile', titre:"Rendement",
            enonce:"Comment augmenter τ > 0,67 ?",
            correction:"Excès d'un réactif ou élimination de l'eau produite." },
        ]
      }]
    }
  ]
},

} // fin ALL_CHAPTERS

 // fin ALL_CHAPTERS

 // fin ALL_CHAPTERS

// ─── Composant principal ─────────────────────────────────────────────
export default function PhysiqueSciencesTechSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  const chapter = ALL_CHAPTERS[slug]
  if (!chapter) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop:120, paddingBottom:80 }}>
          <div className="container" style={{ textAlign:'center' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
            <h1 style={{ fontSize:24, marginBottom:12 }}>Chapitre introuvable</h1>
            <p style={{ color:'var(--muted)', marginBottom:24 }}>Le chapitre « {slug} » n'existe pas encore.</p>
            <Link href="/bac/physique/sciences-tech" className="btn btn-primary">← Retour Sciences Tech.</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const secColor = chapter.color
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:32, paddingBottom:80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--muted)', marginBottom:24, flexWrap:'wrap' }}>
            <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link>
            <span>›</span>
            <Link href="/bac/physique/sciences-tech" style={{ color:'var(--muted)', textDecoration:'none' }}>Sciences Tech.</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.titre}</span>
          </div>

          {/* LAYOUT : Contenu + Sidebar */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:24, alignItems:'start' }}>

            {/* ── CONTENU PRINCIPAL ── */}
            <div>
              {/* Header */}
              <div style={{ background:`${secColor}10`, border:`1px solid ${secColor}28`, borderRadius:18, padding:'24px 28px', marginBottom:24 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontSize:36 }}>{chapter.emoji}</span>
                  <div>
                    <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', marginBottom:4 }}>
                      <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:secColor, fontWeight:700, background:`${secColor}18`, padding:'2px 8px', borderRadius:6 }}>
                        {chapter.badge} · Tunisie Maths
                      </span>
                    </div>
                    <h1 style={{ fontSize:'clamp(18px,2.5vw,26px)', fontWeight:900, color:'var(--text)', margin:0 }}>{chapter.titre}</h1>
                  </div>
                </div>
                <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7, margin:'10px 0 14px' }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' Bac Tunisie Sciences Tech.')}`} className="btn btn-primary" style={{ fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ fontSize:12 }}>🧮 Solveur PC</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ fontSize:12 }}>🎯 Simulation Bac</Link>
                </div>
              </div>

              {/* Légende des types */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
                {Object.entries(C).map(([type,color]) => (
                  <span key={type} style={{ fontSize:10, padding:'3px 10px', borderRadius:20, background:`${color}15`, color, border:`1px solid ${color}30`, fontWeight:700 }}>
                    {L[type]}
                  </span>
                ))}
              </div>

              {/* Sous-chapitres */}
              {chapter.souschapitres.map((sc, sci) => (
                <div key={sc.id} style={{ marginBottom:20 }}>
                  <button
                    onClick={() => setOpenSc(openSc===sc.id ? null : sc.id)}
                    style={{ width:'100%', textAlign:'left', background:`${secColor}10`, border:`1px solid ${secColor}28`, borderRadius:14, padding:'14px 18px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'inherit' }}>
                    <div>
                      <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:secColor, fontWeight:700, marginBottom:3 }}>
                        PARTIE {sci+1}
                      </div>
                      <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>{sc.titre}</div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:6 }}>
                        {sc.notions.map(n => (
                          <span key={n} style={{ fontSize:9, padding:'2px 7px', borderRadius:8, background:`${secColor}12`, color:'var(--text2)', border:`1px solid ${secColor}18` }}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ color:secColor, fontSize:18, flexShrink:0 }}>{openSc===sc.id ? '▲' : '▼'}</span>
                  </button>

                  {(openSc===sc.id || sci===0) && (
                    <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:16 }}>
                      {sc.blocs.map(bloc => (
                        <div key={bloc.notion} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden' }}>
                          {/* Notion header */}
                          <div style={{ background:`${secColor}0a`, borderBottom:'1px solid var(--border)', padding:'10px 18px' }}>
                            <div style={{ fontSize:13, fontWeight:700, color:secColor }}>{bloc.notion}</div>
                          </div>

                          <div style={{ padding:'16px 18px', display:'flex', flexDirection:'column', gap:12 }}>
                            {/* Théorèmes */}
                            {bloc.theoremes.map(thm => (
                              <div key={thm.id} style={{ borderRadius:11, border:`1px solid ${C[thm.type] ?? secColor}30`, overflow:'hidden' }}>
                                <div style={{ background:`${C[thm.type] ?? secColor}12`, borderBottom:`1px solid ${C[thm.type] ?? secColor}20`, padding:'8px 14px', display:'flex', gap:10, alignItems:'center' }}>
                                  <span style={{ fontSize:9, padding:'2px 8px', borderRadius:12, background:`${C[thm.type] ?? secColor}20`, color:C[thm.type] ?? secColor, fontWeight:800 }}>
                                    {L[thm.type] ?? thm.type}
                                  </span>
                                  <span style={{ fontSize:12, fontWeight:700, color:'var(--text)' }}>{thm.nom}</span>
                                  <span style={{ marginLeft:'auto', fontSize:9, fontFamily:'var(--font-mono)', color:'var(--muted)' }}>{thm.id}</span>
                                </div>
                                <div style={{ padding:'12px 16px', fontSize:12, color:'var(--text2)', lineHeight:1.75, whiteSpace:'pre-line', fontFamily: thm.type==='formule'?'var(--font-mono)':'inherit' }}>
                                  {thm.enonce}
                                </div>
                              </div>
                            ))}

                            {/* Exercices */}
                            {bloc.exercices.length > 0 && (
                              <div>
                                <div style={{ fontSize:11, fontWeight:700, color:'var(--muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.07em' }}>📝 Exercices</div>
                                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                                  {bloc.exercices.map(ex => (
                                    <div key={ex.id} style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
                                      <div style={{ padding:'10px 16px', display:'flex', gap:10, alignItems:'flex-start' }}>
                                        <div style={{ flexShrink:0 }}>
                                          <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--muted)' }}>{ex.id}</span>
                                          <div style={{ marginTop:2 }}>
                                            <span style={{ fontSize:9, padding:'2px 7px', borderRadius:20, fontWeight:700,
                                              background: ex.niveau==='Facile'?'rgba(16,185,129,0.15)':ex.niveau==='Difficile'?'rgba(239,68,68,0.15)':'rgba(245,158,11,0.15)',
                                              color: ex.niveau==='Facile'?'#34d399':ex.niveau==='Difficile'?'#f87171':'#fbbf24'
                                            }}>{ex.niveau}</span>
                                          </div>
                                        </div>
                                        <div style={{ flex:1 }}>
                                          <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{ex.titre}</div>
                                          <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.65 }}>{ex.enonce}</div>
                                        </div>
                                      </div>
                                      <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>
                                        <Link href={`/solve?q=${encodeURIComponent('Bac Tunisie PC Sciences Tech. — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                          🧮 Résoudre avec IA
                                        </Link>
                                        <button onClick={() => setOpenEx(openEx===ex.id?null:ex.id)}
                                          style={{ fontSize:11, padding:'5px 12px', borderRadius:7, border:'1px solid var(--border)', background:'transparent', color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
                                          📋 {openEx===ex.id?'Masquer':'Correction'}
                                        </button>
                                      </div>
                                      {openEx===ex.id && (
                                        <div style={{ padding:'10px 16px', borderTop:'1px solid var(--border)', background:`${secColor}06` }}>
                                          <div style={{ fontSize:10, color:secColor, fontWeight:700, marginBottom:4 }}>✅ Correction</div>
                                          <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75, whiteSpace:'pre-line' }}>{ex.correction}</div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Navigation prev/next */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac/physique/sciences-tech/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{prevSlug ? (TITRES_NAV[prevSlug]||prevSlug) : ''}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/physique/sciences-tech/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{nextSlug ? (TITRES_NAV[nextSlug]||nextSlug) : ''}</div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <aside style={{ position:'sticky', top:88 }}>

              {/* Navigation chapitres */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  ⚙️ Sciences Tech. · {NAV_ORDER.length} chapitres
                </div>
                {/* Physique */}
                <div style={{ padding:'6px 14px 3px', fontSize:9, fontWeight:800, color:'#4f6ef7', textTransform:'uppercase', letterSpacing:'0.1em' }}>⚛️ Physique</div>
                {NAV_ORDER.filter(s => !['cinetique-tech', 'equilibres-tech', 'acide-base-tech', 'electrochimie-tech', 'organique-tech'].includes(s)).map((s,i) => (
                  <Link key={s} href={`/bac/physique/sciences-tech/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'8px 14px', borderBottom:'1px solid var(--border)',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:10, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{(TITRES_NAV[s]||s).replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
                {/* Chimie */}
                <div style={{ padding:'6px 14px 3px', fontSize:9, fontWeight:800, color:'#10b981', textTransform:'uppercase', letterSpacing:'0.1em' }}>🧪 Chimie</div>
                {['cinetique-tech', 'equilibres-tech', 'acide-base-tech', 'electrochimie-tech', 'organique-tech'].map((s,i) => (
                  <Link key={s} href={`/bac/physique/sciences-tech/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'8px 14px', borderBottom:i<4?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:10, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{(TITRES_NAV[s]||s).replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Autres sections Physique Tunisie */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'12px', marginBottom:12 }}>
                <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>🇹🇳 Autres sections</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {[
                    { href:'/bac/physique/maths', label:'📐 Section Maths', color:'#f59e0b' },
                    { href:'/bac/physique/sciences-tech', label:'⚙️ Sciences Tech.', color:'#10b981' },
                    { href:'/bac/physique/informatique', label:'💻 Informatique', color:'#8b5cf6' },
                    { href:'/bac/physique/eco-gestion', label:'📊 Éco-Gestion', color:'#f43f5e' },
                  ].map(s => (
                    <Link key={s.href} href={s.href} style={{ fontSize:11, padding:'6px 10px', borderRadius:8, background:`${s.color}10`, color:s.color, fontWeight:600, textDecoration:'none', border:`1px solid ${s.color}20` }}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Maths Tunisie */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'12px', marginBottom:12 }}>
                <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>📐 Maths — Bac Tunisie</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {[
                    { href:'/bac/maths/maths',        label:'📐 Section Maths',       color:'#4f6ef7' },
                    { href:'/bac/maths/sciences-exp',  label:'🔬 Sciences Exp.',        color:'#06d6a0' },
                    { href:'/bac/maths/sciences-tech', label:'⚙️ Sciences Tech.',       color:'#f59e0b' },
                    { href:'/bac/maths/eco-gestion',   label:'💹 Éco-Gestion',          color:'#10b981' },
                    { href:'/bac/maths/informatique',  label:'💻 Informatique',         color:'#8b5cf6' },
                  ].map(s => (
                    <Link key={s.href} href={s.href} style={{ fontSize:11, padding:'6px 10px', borderRadius:8, background:`${s.color}10`, color:s.color, fontWeight:600, textDecoration:'none', border:`1px solid ${s.color}20` }}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' Bac Tunisie Sciences Tech.')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧮 Solveur PC</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac/physique/sciences-tech" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Sciences Tech.</Link>
                  <Link href="/bac/physique" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Physique-Chimie</Link>
                  <Link href="/bac" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🇹🇳 Bac Tunisie</Link>
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