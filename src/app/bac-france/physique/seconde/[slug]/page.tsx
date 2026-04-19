'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'atomes-noyau','tableau-periodique','reactions-chimiques','acides-bases',
  'vecteur-vitesse','principe-inertie','forces-interactions',
  'ondes-sonores','lentilles-convergentes','circuits-electriques',
  'energies-formes','transferts-thermiques','rendement',
]

const TITRES: Record<string,string> = {
  'atomes-noyau':           'Atomes & Noyau atomique',
  'tableau-periodique':     'Tableau périodique',
  'reactions-chimiques':    'Réactions chimiques',
  'acides-bases':           'Acides, bases & pH',
  'vecteur-vitesse':        'Vecteur vitesse & Trajectoire',
  'principe-inertie':       'Principe d\'inertie',
  'forces-interactions':    'Forces & Interactions',
  'ondes-sonores':          'Ondes sonores',
  'lentilles-convergentes': 'Lentilles convergentes',
  'circuits-electriques':   'Circuits électriques',
  'energies-formes':        'Formes d\'énergie',
  'transferts-thermiques':  'Transferts thermiques',
  'rendement':              'Rendement d\'un convertisseur',
}

const SEC_COLOR: Record<string,string> = {
  'atomes-noyau':'#10b981','tableau-periodique':'#10b981','reactions-chimiques':'#10b981','acides-bases':'#10b981',
  'vecteur-vitesse':'#4f6ef7','principe-inertie':'#4f6ef7','forces-interactions':'#4f6ef7',
  'ondes-sonores':'#8b5cf6','lentilles-convergentes':'#06b6d4','circuits-electriques':'#f59e0b',
  'energies-formes':'#f59e0b','transferts-thermiques':'#f59e0b','rendement':'#f59e0b',
}

const CHAPITRES: Record<string,any> = {
  'atomes-noyau': {
    ch:'CH 01', titre:'Atomes & Noyau atomique', badge:'Chimie', duree:'~3h', section:'Section 1 — Constitution de la matière',
    desc:'L\'atome est constitué d\'un noyau (protons et neutrons) entouré d\'électrons. La notation symbolique permet de caractériser un noyau.',
    theoremes:[
      {id:'D1',type:'def',nom:'Structure de l\'atome',enonce:'Noyau (au centre) :\n• Protons (charge +e) : nombre Z = numéro atomique\n• Neutrons (neutres) : nombre N\n• A = Z + N = nombre de masse\n\nÉlectrons (autour du noyau) :\n• Charge −e\n• Nombre = Z (atome électriquement neutre)\n\nNotation : ᴬ_Z X  (X = symbole de l\'élément)'},
      {id:'D2',type:'def',nom:'Isotopes',enonce:'Isotopes : atomes du même élément (même Z) mais avec un nombre de neutrons N différent.\n\n→ Même Z : même élément, même position dans le tableau périodique\n→ N différent : masse différente\n→ Mêmes propriétés chimiques (même configuration électronique)\n\nExemple : ¹²₆C (6 protons, 6 neutrons) et ¹⁴₆C (6 protons, 8 neutrons)'},
      {id:'F1',type:'formule',nom:'Notation et calculs',enonce:'ᴬ_Z X → Z protons, N = A−Z neutrons, Z électrons\n\nMasse d\'un proton ≈ masse d\'un neutron ≈ 1,67×10⁻²⁷ kg\nMasse d\'un électron ≈ 9,11×10⁻³¹ kg  (≈ 2000 fois plus légère)\n\nDimension d\'un atome : ≈ 10⁻¹⁰ m\nDimension du noyau : ≈ 10⁻¹⁵ m\n→ L\'atome est quasi vide !'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Nombre de nucléons',enonce:'L\'atome de fer a Z = 26 et A = 56. Combien de protons, neutrons et électrons ?',correction:'Protons : Z = 26\nNeutrons : N = A−Z = 56−26 = 30\nÉlectrons : 26 (atome neutre)'},
      {id:'EX02',niveau:'Facile',titre:'Isotopes',enonce:'L\'uranium 235 est noté ²³⁵₉₂U et l\'uranium 238 est noté ²³⁸₉₂U. Sont-ils isotopes ? Justifier.',correction:'Oui, isotopes : même Z = 92 (même élément uranium) mais A différent (235 ≠ 238).\n²³⁵U : N = 235−92 = 143 neutrons\n²³⁸U : N = 238−92 = 146 neutrons'},
    ],
  },

  'reactions-chimiques': {
    ch:'CH 03', titre:'Réactions chimiques', badge:'Chimie', duree:'~4h', section:'Section 1 — Constitution de la matière',
    desc:'Une équation de réaction traduit la transformation de réactifs en produits en respectant la conservation des atomes et des charges.',
    theoremes:[
      {id:'T1',type:'thm',nom:'Conservation de la matière (Lavoisier)',enonce:'Lors d\'une réaction chimique :\n→ Les atomes sont conservés (nature et nombre)\n→ La masse totale est conservée\n\nConséquences :\n• L\'équation doit être équilibrée (même nb d\'atomes de chaque côté)\n• Les nombres stœchiométriques assurent l\'équilibre'},
      {id:'M1',type:'methode',nom:'Équilibrer une équation',enonce:'Méthode par étapes :\n1. Écrire les formules des réactifs et produits\n2. Compter les atomes de chaque espèce\n3. Ajuster les coefficients (nombres stœchiométriques)\n4. Vérifier l\'équilibre\n\nExemple : combustion du propane C₃H₈\nC₃H₈ + O₂ → CO₂ + H₂O\n→ C₃H₈ + 5O₂ → 3CO₂ + 4H₂O\nVérif : 3C, 8H, 10O de chaque côté ✓'},
      {id:'D1',type:'def',nom:'Types de réactions',enonce:'Combustion : réaction avec dioxygène O₂\n→ Combustion complète : produits CO₂ + H₂O\n→ Combustion incomplète : produit CO (monoxyde de carbone, toxique)\n\nOxydo-réduction : transfert d\'électrons\n→ Oxydant : capte des électrons (se réduit)\n→ Réducteur : cède des électrons (s\'oxyde)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Équilibrer une équation',enonce:'Équilibrer : C₂H₆ + O₂ → CO₂ + H₂O',correction:'C₂H₆ + 7/2 O₂ → 2CO₂ + 3H₂O\nou en entiers : 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O\nVérif : 4C, 12H, 14O de chaque côté ✓'},
    ],
  },

  'vecteur-vitesse': {
    ch:'CH 05', titre:'Vecteur vitesse & Trajectoire', badge:'Mécanique', duree:'~4h', section:'Section 2 — Mouvement & Interactions',
    desc:'Pour décrire un mouvement, on doit choisir un référentiel. Le vecteur vitesse caractérise l\'état de mouvement à chaque instant.',
    theoremes:[
      {id:'D1',type:'def',nom:'Référentiel et trajectoire',enonce:'Référentiel : solide de référence + horloge.\n• Référentiel terrestre : lié à la Terre\n• Référentiel géocentrique : centré sur la Terre, axes fixes par rapport aux étoiles\n\nTrajectoire : ensemble des positions successives du point étudié.\nTypes : rectiligne, circulaire, parabolique, elliptique…'},
      {id:'F1',type:'formule',nom:'Vecteur vitesse',enonce:'Vecteur vitesse moyen entre A et B :\nv⃗_moy = AB⃗/Δt  (m/s)\n\nVitesse instantanée (dérivée) :\nv⃗ = dr⃗/dt\n\nNorme (valeur de la vitesse) :\nv = |v⃗| = √(vₓ² + vᵧ²)\n\nMovement rectiligne uniforme (MRU) :\nv = cste → d = v·t'},
      {id:'D2',type:'def',nom:'Types de mouvements',enonce:'MRU (Mouvement Rectiligne Uniforme) :\n→ Trajectoire rectiligne + v = constante\n→ ΣF⃗ = 0⃗\n\nMRUA (Mouvement Rectiligne Uniformément Accéléré) :\n→ a = constante ≠ 0\n→ v(t) = v₀ + a·t\n→ x(t) = x₀ + v₀·t + ½a·t²\n\nMouvement circulaire uniforme :\n→ v = constante, direction change\n→ accélération centripète : a = v²/R (vers le centre)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Voiture en accélération',enonce:'Une voiture passe de 0 à 90 km/h en 8 s. Calculer a et la distance parcourue.',correction:'v = 90 km/h = 25 m/s\na = Δv/Δt = 25/8 = 3,125 m/s²\nd = ½·a·t² = ½×3,125×64 = 100 m'},
    ],
  },

  'lentilles-convergentes': {
    ch:'CH 08', titre:'Lentilles convergentes', badge:'Optique', duree:'~5h', section:'Section 3 — Ondes & Signaux',
    desc:'Les lentilles convergentes dévient les rayons lumineux pour former des images. La relation de conjugaison permet de les calculer.',
    theoremes:[
      {id:'D1',type:'def',nom:'Éléments caractéristiques',enonce:'Centre optique O : tout rayon passant par O n\'est pas dévié.\n\nFoyer objet F : tout rayon issu de F sort parallèle à l\'axe.\nFoyer image F\' : tout rayon incident parallèle converge en F\'.\n\nDistance focale f\' = OF\' (> 0 pour convergente)\n\nVergence : D = 1/f\'  (en dioptries δ, f\' en mètres)\nExemple : f\' = 20 cm → D = 1/0,20 = 5 δ'},
      {id:'F1',type:'formule',nom:'Relation de conjugaison',enonce:'1/OA\' − 1/OA = 1/f\' = D\n\nConventions algébriques :\n• O = centre de la lentille (origine)\n• OA < 0 si objet avant la lentille (cas habituel)\n• OA\' > 0 si image réelle (après la lentille)\n• OA\' < 0 si image virtuelle (avant la lentille)\n\nGrandissement algébrique :\nγ = OA\'/OA = A\'B\'/AB'},
      {id:'P1',type:'prop',nom:'Nature et position de l\'image',enonce:'Image réelle : OA\' > 0 (après la lentille) → renversée (γ < 0)\nImage virtuelle : OA\' < 0 (avant la lentille) → droite (γ > 0)\n\n|γ| > 1 : image agrandie\n|γ| < 1 : image réduite\n|γ| = 1 : image même taille\n\nCas particuliers :\n• Objet à l\'infini → image en F\' (appareil photo)\n• Objet entre O et F → image virtuelle, droite, agrandie (loupe)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:'Position et nature de l\'image',enonce:'Lentille f\' = 10 cm. Objet à OA = −30 cm. Calculer OA\' et γ.',correction:'1/OA\' = 1/f\' + 1/OA = 1/10 + 1/(−30) = 3/30 − 1/30 = 2/30\nOA\' = 30/2 = +15 cm → image RÉELLE (après la lentille)\nγ = OA\'/OA = 15/(−30) = −0,5 → image renversée, réduite (|γ|<1)'},
    ],
  },

  'circuits-electriques': {
    ch:'CH 09', titre:'Circuits électriques', badge:'Électricité', duree:'~5h', section:'Section 3 — Ondes & Signaux',
    desc:'Les circuits électriques obéissent aux lois d\'Ohm et de Kirchhoff. En série et en dérivation, les grandeurs électriques se combinent différemment.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Loi d\'Ohm et puissance',enonce:'Loi d\'Ohm : U = R·I\n(U en V, R en Ω, I en A)\n\nPuissance électrique :\nP = U·I = R·I² = U²/R  (en Watts)\n\nÉnergie électrique :\nE = P·t  (en Joules ou kWh)\n1 kWh = 3,6×10⁶ J'},
      {id:'P1',type:'prop',nom:'Associations de résistances',enonce:'En série :\n→ Même courant I\n→ U_total = ΣU_k\n→ R_eq = ΣR_k\n\nEn dérivation (parallèle) :\n→ Même tension U\n→ I_total = ΣI_k\n→ 1/R_eq = Σ(1/R_k)\n\nLois de Kirchhoff :\n• Loi des nœuds : ΣI_entrants = ΣI_sortants\n• Loi des mailles : Σ(tensions) = 0 (sur une maille fermée)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Loi d\'Ohm',enonce:'R = 220 Ω sous U = 12 V. Calculer I et P.',correction:'I = U/R = 12/220 ≈ 0,055 A = 55 mA\nP = U·I = 12×0,055 ≈ 0,655 W\nou P = U²/R = 144/220 ≈ 0,655 W'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Résistances en dérivation',enonce:'R₁ = 100 Ω et R₂ = 200 Ω en dérivation sous U = 12 V. Calculer I₁, I₂, I_total et R_eq.',correction:'I₁ = U/R₁ = 12/100 = 0,12 A\nI₂ = U/R₂ = 12/200 = 0,06 A\nI_total = 0,12 + 0,06 = 0,18 A\n1/R_eq = 1/100 + 1/200 = 3/200 → R_eq = 200/3 ≈ 66,7 Ω'},
    ],
  },
}

export default function PhysiqueSecondeChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)

  if (!ch) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>🔬</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/physique/seconde" className="btn btn-primary">← Retour Seconde PC</Link>
    </div>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLOR[slug] || '#10b981'

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
            <Link href="/bac-france/physique/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{ch.titre}</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <div style={{ marginBottom:28 }}>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>{ch.ch}</span>
                  <span className="label">{ch.badge}</span>
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(16,185,129,0.15)', color:'#34d399', fontWeight:700 }}>Seconde PC</span>
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
                            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, fontWeight:700, background:'rgba(16,185,129,0.15)', color:'#34d399' }}>{ex.niveau}</span>
                          </div>
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:6 }}>{ex.titre}</div>
                          <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7 }}>{ex.enonce}</div>
                        </div>
                      </div>
                      <div style={{ borderTop:'1px solid var(--border)', padding:'10px 20px', display:'flex', gap:10, flexWrap:'wrap' }}>
                        <Link href={`/solve?q=${encodeURIComponent('Seconde PC France, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:12, padding:'6px 14px' }}>🧮 Résoudre avec IA</Link>
                        <button onClick={() => setOpenEx(openEx===ex.id?null:ex.id)} style={{ fontSize:12, padding:'6px 14px', borderRadius:8, border:'1px solid var(--border)', background:'transparent', color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
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
                {prevSlug?(<Link href={`/bac-france/physique/seconde/${prevSlug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ padding:'13px 16px', transition:'transform 0.15s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>← Précédent</div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[prevSlug]}</div>
                  </div>
                </Link>):<div/>}
                {nextSlug?(<Link href={`/bac-france/physique/seconde/${nextSlug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ padding:'13px 16px', textAlign:'right', transition:'transform 0.15s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>Suivant →</div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[nextSlug]}</div>
                  </div>
                </Link>):<div/>}
              </div>
            </div>

            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', marginBottom:14 }}>
                <div style={{ padding:'11px 15px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>⚛️ Seconde PC — 13 chapitres</div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/physique/seconde/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+ch.titre+' en Seconde')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>🤖 Chat IA — {ch.titre}</Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧮 Solveur PC</Link>
                  <Link href="/bac-france/physique/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📗 Voir Première PC</Link>
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