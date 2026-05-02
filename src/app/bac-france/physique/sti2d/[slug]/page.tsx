'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE STI2D / [SLUG]
// Route : /bac-france/physique/sti2d/[slug]
// Programme officiel STI2D — Première & Terminale
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'mesures-sti2d',
  'energie-chimique',
  'energie-electrique',
  'energie-thermique',
  'energie-mecanique-sti2d',
  'energie-lumineuse',
  'materiaux',
  'ondes-information',
]

const TITRES: Record<string,string> = {
  'mesures-sti2d':          'Mesures & Incertitudes',
  'energie-chimique':       'Énergie chimique & Combustions',
  'energie-electrique':     'Énergie électrique & Circuits AC/DC',
  'energie-thermique':      'Énergie thermique & Transferts',
  'energie-mecanique-sti2d':'Énergie mécanique & Puissance',
  'energie-lumineuse':      'Énergie lumineuse & Photovoltaïque',
  'materiaux':              'Matière & Matériaux',
  'ondes-information':      'Ondes & Information',
}

const SEC_COLOR: Record<string,string> = {
  'mesures-sti2d':'#6b7280',
  'energie-chimique':'#f59e0b','energie-electrique':'#f59e0b','energie-thermique':'#f59e0b','energie-mecanique-sti2d':'#f59e0b','energie-lumineuse':'#f59e0b',
  'materiaux':'#10b981',
  'ondes-information':'#8b5cf6',
}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string;
  theoremes:{id:string; type:string; nom:string; enonce?:string; titre?:string; legende?:string; svg?:string}[];
  exercices:{id:string; niveau:string; titre:string; enonce:string; correction:string}[];
}> = {

  'mesures-sti2d': {
    ch:'CH 00', titre:'Mesures & Incertitudes', badge:'Métrologie', duree:'~2h', section:'Chapitre transversal',
    desc:'Incertitude-type, évaluation de type A (statistique) et type B (instrumentale), présentation du résultat et critère de compatibilité.',
    theoremes:[
      {id:'D1',type:'def',nom:'Incertitude-type',enonce:'Évaluation de type A (répétition de mesures, n fois) :\nu_A = s/√n\ns = écart-type expérimental\n\nÉvaluation de type B (lecture d\'un instrument) :\nu_B = demi-étendue / √3  (distribution rectangulaire)\n\nIncertitude composée :\nu_c = √(u_A² + u_B²)\n\nIncertitude élargie (k=2, confiance 95%) :\nU = 2 × u_c'},
      {id:'P1',type:'prop',nom:'Écriture du résultat et compatibilité',enonce:'Résultat : x = x̄ ± U  (unité)\n\nRègles :\n• U arrondi à 1-2 chiffres significatifs\n• x̄ arrondi au même rang décimal que U\n\nCritère de compatibilité :\n|x_exp − x_ref| ≤ 2·u_c → résultat compatible\n\nZ-score (écart normalisé) :\nEn = |x_exp − x_ref| / u_c\nEn < 2 → compatible (95%)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul d\'incertitude',enonce:'5 mesures de résistance : 98, 102, 100, 99, 101 Ω. Calculer x̄, s, u_A et U.',correction:'x̄ = (98+102+100+99+101)/5 = 500/5 = 100 Ω\ns = √[((−2)²+2²+0²+(−1)²+1²)/4] = √(10/4) ≈ 1,58 Ω\nu_A = 1,58/√5 = 0,71 Ω\nU = 2×0,71 = 1,42 Ω\nRésultat : R = 100 ± 1,4 Ω'},
    ],
  },

  'energie-chimique': {
    ch:'CH 01', titre:'Énergie chimique & Combustions', badge:'Énergie', duree:'~4h', section:'Section 1 — Énergie',
    desc:'Pouvoir calorifique des combustibles, piles et accumulateurs, énergie de réaction. Aspect quantitatif des transferts d\'énergie chimique.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Énergie de combustion',enonce:'Énergie libérée par combustion d\'une masse m :\nQ = m × Pci  (en Joules)\nPci = pouvoir calorifique inférieur (J/kg)\n\nValeurs :\n• Méthane CH₄ : Pci = 50 MJ/kg\n• Propane C₃H₈ : Pci = 46 MJ/kg\n• Essence : Pci = 43 MJ/kg\n• Fioul : Pci = 42 MJ/kg\n• Hydrogène H₂ : Pci = 120 MJ/kg\n\nRendement thermique :\nη = W_utile/(m × Pci)'},
      {id:'D1',type:'def',nom:'Piles et accumulateurs',enonce:'Pile : convertit énergie chimique → électrique (usage unique)\nAccumulateur (batterie) : rechargeable\n\nGrandeurs :\n• FEM (force électromotrice) ε : tension à vide\n• Résistance interne r : dissipation interne\n• Capacité C (Ah) : charge maximale stockée\n\nTension en charge :\nU = ε − r × I\n\nÉnergie stockée :\nW = U × C = U × I × t\n\nExemples STI2D :\n• Li-ion : énergie massique ≈ 150-200 Wh/kg (véhicule élec)\n• Pile à combustible H₂/O₂ : η ≈ 60%'},
      {id:'F2',type:'formule',nom:'Énergie électrique de la pile',enonce:'Énergie maximale disponible :\nW = ε × Q = ε × I × t\n\nÉnergie utile (pertes r·I²) :\nW_utile = U × I × t = (ε − rI) × I × t\n\nRendement de la pile :\nη_pile = W_utile/W_max = (ε − rI)/ε = 1 − rI/ε\n\nDécharge complète : I² × t_décharge = C²/C = C (capacité)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Autonomie d\'un VE',enonce:'Une voiture électrique a une batterie de 60 kWh. Consommation = 15 kWh/100 km. Calculer l\'autonomie.',correction:'Autonomie = 60/15 × 100 = 400 km'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Énergie de combustion du méthane',enonce:'Un chauffe-eau brûle 2 kg de méthane. Pci(CH₄) = 50 MJ/kg, η = 85%. Énergie utile ?',correction:'Q_brûlée = m × Pci = 2 × 50 = 100 MJ\nQ_utile = η × Q_brûlée = 0,85 × 100 = 85 MJ'},
    ],
  },

  'energie-electrique': {
    ch:'CH 02', titre:'Énergie électrique & Circuits AC/DC', badge:'Énergie', duree:'~6h', section:'Section 1 — Énergie',
    desc:'Régime continu (DC) et sinusoïdal (AC), valeur efficace, puissance active, facteur de puissance, dipôles R, L, C.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Valeur efficace et puissance AC',enonce:'Signal sinusoïdal : u(t) = U_max × cos(ωt)\n\nValeur efficace (RMS) :\nU_eff = U_max / √2  ≈ 0,707 × U_max\nI_eff = I_max / √2\n\nPuissance active (réelle) :\nP = U_eff × I_eff × cosφ  (Watts)\nφ = déphasage entre u et i\ncosφ = facteur de puissance (0 ≤ cosφ ≤ 1)\n\nPuissance réactive : Q = U_eff × I_eff × sinφ  (VAr)\nPuissance apparente : S = U_eff × I_eff  (VA)\nRelation : S² = P² + Q²'},
      {id:'D1',type:'def',nom:'Dipôles R, L, C en régime sinusoïdal',enonce:'Résistance R :\nU = R × I  (pas de déphasage, cosφ = 1)\nZ_R = R\n\nBobine d\'inductance L :\nZ_L = L × ω  (en Ω)\nCourant en retard de π/2 sur la tension\n→ Énergie stockée dans le champ magnétique\n\nCondensateur C :\nZ_C = 1/(C × ω)  (en Ω)\nCourant en avance de π/2 sur la tension\n→ Énergie stockée dans le champ électrique\n\nω = 2πf = pulsation (rad/s)'},
      {id:'M1',type:'methode',nom:'Circuit RLC série — Calcul d\'impédance',enonce:'Impédance totale :\nZ = √[R² + (Z_L − Z_C)²] = √[R² + (Lω − 1/Cω)²]\n\nDéphasage : tan φ = (Lω − 1/Cω)/R\n\nIntensité : I_eff = U_eff/Z\n\nRésonance : Z_L = Z_C → ω₀ = 1/√(LC)\nÀ la résonance : Z = R (minimum) → I_eff maximale\n\nApplication : filtre passe-bande, circuit accordé.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Valeur efficace',enonce:'Le réseau électrique en France : U_max = 325 V, f = 50 Hz. Calculer U_eff et ω.',correction:'U_eff = 325/√2 = 230 V ✓\nω = 2π×50 = 314 rad/s'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Puissance d\'un moteur AC',enonce:'Un moteur fonctionne sous U = 230 V, I = 10 A, cosφ = 0,85. Calculer P, Q et S.',correction:'S = U×I = 230×10 = 2300 VA\nP = S×cosφ = 2300×0,85 = 1955 W ≈ 1,96 kW\nQ = S×sinφ = 2300×sin(arccos0,85) = 2300×0,527 ≈ 1212 VAr'},
    ],
  },

  'energie-thermique': {
    ch:'CH 03', titre:'Énergie thermique & Transferts', badge:'Énergie', duree:'~4h', section:'Section 1 — Énergie',
    desc:'Capacité thermique massique, changements d\'état, transferts thermiques (conduction, convection, rayonnement), résistance thermique.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Énergie thermique',enonce:'Variation de température :\nQ = m × c × ΔT  (en Joules)\nm = masse (kg), c = capacité thermique massique (J·kg⁻¹·K⁻¹)\n\nValeurs :\n• Eau : c = 4186 J·kg⁻¹·K⁻¹\n• Aluminium : c = 900 J·kg⁻¹·K⁻¹\n• Acier : c = 500 J·kg⁻¹·K⁻¹\n\nChangement d\'état (à T constante) :\nQ = m × L_f  (fusion/solidification)\nQ = m × L_v  (vaporisation/condensation)\nLf(eau) = 334 kJ/kg ; Lv(eau) = 2260 kJ/kg'},
      {id:'D1',type:'def',nom:'Résistance thermique',enonce:'La résistance thermique R_th traduit la difficulté pour la chaleur à traverser une paroi :\nR_th = e/(λ × S)  (K/W)\ne = épaisseur (m), λ = conductivité thermique (W·m⁻¹·K⁻¹), S = surface (m²)\n\nValeurs de λ :\n• Cuivre : λ = 400 W·m⁻¹·K⁻¹\n• Aluminium : λ = 237 W·m⁻¹·K⁻¹\n• Béton : λ ≈ 2 W·m⁻¹·K⁻¹\n• Laine de verre : λ ≈ 0,04 W·m⁻¹·K⁻¹\n\nFlux thermique : Φ = ΔT/R_th  (Watts)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Énergie de fusion',enonce:'On fait fondre 500 g de glace à 0°C. Lf = 334 kJ/kg. Calculer Q.',correction:'Q = m × Lf = 0,5 × 334 000 = 167 000 J = 167 kJ'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Isolation thermique',enonce:'Une paroi de laine de verre (e = 10 cm, λ = 0,04 W·m⁻¹·K⁻¹, S = 20 m²). ΔT = 20°C. Calculer R_th et Φ.',correction:'R_th = e/(λ×S) = 0,10/(0,04×20) = 0,10/0,8 = 0,125 K/W\nΦ = ΔT/R_th = 20/0,125 = 160 W'},
    ],
  },

  'energie-mecanique-sti2d': {
    ch:'CH 04', titre:'Énergie mécanique & Puissance', badge:'Énergie', duree:'~4h', section:'Section 1 — Énergie',
    desc:'Travail d\'une force, puissance mécanique, énergie cinétique et potentielle, rendement des systèmes mécaniques.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Puissance et travail mécaniques',enonce:'Travail : W = F × d × cosα  (Joules)\n\nPuissance mécanique :\nP_mec = F × v  (Watts, avec v en m/s)\nP_mec = C × ω  (avec C = couple en N·m, ω = vitesse angulaire en rad/s)\n\nÉnergie cinétique : Ec = ½mv²\nÉnergie potentielle : Ep = mgh\n\nRendement mécanique :\nη = P_sortie/P_entrée = W_utile/W_fourni\n\nChute libre sans frottements :\nmgh = ½mv² → v = √(2gh)'},
      {id:'D1',type:'def',nom:'Puissance dans un système de transmission',enonce:'Dans une transmission (engrenages, courroies) :\nC₁ × ω₁ = C₂ × ω₂ (puissance constante si η = 1)\n\nRapport de transmission :\ni = ω_sortie/ω_entrée = n_sortie/n_entrée\n\nEngrenages : i = Z₁/Z₂\n(Z = nombre de dents)\n\nConvertisseur électrique→mécanique :\nP_mec = η × P_élec\nP_élec = U × I'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Puissance d\'un moteur',enonce:'Un moteur soulève une charge de 500 kg à v = 0,5 m/s. g = 9,8 m/s². Calculer P_mec.',correction:'P_mec = F × v = mg × v = 500×9,8×0,5 = 2450 W ≈ 2,45 kW'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Engrenage',enonce:'Engrenage : Z₁ = 20 dents, Z₂ = 60 dents, n₁ = 1500 tr/min. Calculer n₂ et le couple C₂ si C₁ = 5 N·m (η = 1).',correction:'i = Z₁/Z₂ = 20/60 = 1/3\nn₂ = n₁ × i = 1500 × (1/3) = 500 tr/min\nP conservée : C₁ω₁ = C₂ω₂ → C₂ = C₁ × ω₁/ω₂ = C₁ × n₁/n₂ = 5 × (1500/500) = 15 N·m'},
    ],
  },

  'energie-lumineuse': {
    ch:'CH 05', titre:'Énergie lumineuse & Photovoltaïque', badge:'Énergie', duree:'~3h', section:'Section 1 — Énergie',
    desc:'Spectre solaire, énergie des photons, panneaux photovoltaïques, rendement et caractéristiques I(U).',
    theoremes:[
      {id:'F1',type:'formule',nom:'Énergie d\'un photon',enonce:'Un photon de fréquence f porte l\'énergie :\nE = h × f = h × c/λ\n\nh = 6,63×10⁻³⁴ J·s (constante de Planck)\nc = 3×10⁸ m/s\nλ = longueur d\'onde (m)\n\nÉnergie en électronvolts :\n1 eV = 1,6×10⁻¹⁹ J\n\nSpectre solaire :\n• UV : λ < 400 nm\n• Visible : 400–700 nm (énergie 1,8–3,1 eV)\n• Infrarouge : λ > 700 nm'},
      {id:'D1',type:'def',nom:'Panneau photovoltaïque',enonce:'Effet photovoltaïque : un photon absorbé crée une paire électron-trou dans un semi-conducteur (Si) → courant électrique.\n\nCondition : E_photon ≥ E_gap  (énergie de bande interdite)\nSi : E_gap ≈ 1,1 eV → λ_max ≈ 1100 nm\n\nCaractéristique I(U) d\'une cellule PV :\n• Court-circuit : I = I_cc (courant max)\n• Circuit ouvert : U = U_co (tension max)\n• Point de puissance maximale (MPP) : P_max = I_mpp × U_mpp\n\nRendement : η = P_max/(E_rayonnement × S)  ≈ 15–22%\nE_rayonnement = irradiance (W/m²)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Énergie d\'un photon',enonce:'Un photon vert λ = 550 nm. Calculer E en Joules et en eV.',correction:'E = hc/λ = (6,63×10⁻³⁴×3×10⁸)/(550×10⁻⁹) = 3,62×10⁻¹⁹ J\nE = 3,62×10⁻¹⁹/1,6×10⁻¹⁹ = 2,26 eV'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Production photovoltaïque',enonce:'Une installation de 20 m² de panneaux PV (η = 18%, irradiance = 1000 W/m²). Calculer P_max et l\'énergie produite en 5h.',correction:'P_max = η × E × S = 0,18 × 1000 × 20 = 3600 W = 3,6 kW\nE_5h = 3,6 × 5 = 18 kWh'},
    ],
  },

  'materiaux': {
    ch:'CH 06', titre:'Matière & Matériaux', badge:'Matériaux', duree:'~4h', section:'Section 2 — Matière',
    desc:'Propriétés des matériaux (mécaniques, thermiques, électriques, optiques), organisation de la matière, oxydo-réduction et corrosion.',
    theoremes:[
      {id:'D1',type:'def',nom:'Classification des matériaux',enonce:'Familles de matériaux :\n\n1. Métaux et alliages : conducteurs électriques et thermiques, ductiles, opaques.\n   Ex : acier (Fe + C), aluminium, cuivre, titane.\n\n2. Céramiques et verres : isolants électriques, durs et fragiles, réfractaires.\n   Ex : alumine (Al₂O₃), verre SiO₂.\n\n3. Polymères (plastiques) : isolants, légers, déformables, variété de propriétés.\n   Ex : PVC, PTFE (Téflon), polycarbonate.\n\n4. Composites : association de plusieurs matériaux pour combiner les propriétés.\n   Ex : fibre de carbone + résine époxy (aéronautique).'},
      {id:'D2',type:'def',nom:'Corrosion et protection',enonce:'Corrosion : dégradation d\'un métal par réaction chimique avec l\'environnement.\n→ Réaction rédox : métal oxydé par O₂ ou H⁺\n\nEx : rouille du fer : 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃\n\nProtections contre la corrosion :\n• Barrière physique : peinture, galvanisation (dépôt de Zn)\n• Protection cathodique : anode sacrificielle (Zn, Mg plus oxydable que Fe)\n• Passivation : couche d\'oxyde protectrice (Al, Cr)\n• Acier inoxydable : alliage Fe + Cr (≥10,5%) → couche Cr₂O₃ protectrice\n\nPile de corrosion : deux métaux différents + électrolyte → pile galvanique → accélère la corrosion du moins noble.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Choix de matériau',enonce:'Pour la fabrication d\'un échangeur de chaleur (haute conductivité thermique, résistance à la corrosion), quel métal choisir entre l\'acier, l\'aluminium et le cuivre ?',correction:'Cuivre : λ = 400 W·m⁻¹·K⁻¹ (meilleure conductivité thermique)\nAluminium : λ = 237 W·m⁻¹·K⁻¹ (léger, bonne résistance à la corrosion)\nAcier inoxydable : λ ≈ 16 W·m⁻¹·K⁻¹ (moins bien thermiquement)\nChoix : cuivre pour la performance thermique, aluminium pour le rapport performance/masse.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Anode sacrificielle',enonce:'Un bateau en acier (Fe) est protégé par des anodes en zinc (Zn). Justifier le choix du zinc comme anode sacrificielle.',correction:'Le zinc est plus réducteur que le fer (potentiel standard E°(Zn²⁺/Zn) = −0,76 V < E°(Fe²⁺/Fe) = −0,44 V).\nLe Zn se corrode préférentiellement : Zn → Zn²⁺ + 2e⁻\nIl protège le fer en lui fournissant des électrons (protection cathodique).\nLe zinc est régulièrement remplacé car il se consomme.'},
    ],
  },

  'ondes-information': {
    ch:'CH 07', titre:'Ondes & Information', badge:'Ondes', duree:'~5h', section:'Section 3 — Ondes & Signaux',
    desc:'Propagation, absorption, réflexion. Ondes sonores et EM. Transmission d\'information. Numérisation.',
    theoremes:[
      {id:'D1',type:'def',nom:'Caractéristiques des ondes',enonce:'Onde : propagation d\'une perturbation sans transport de matière.\n\nRelation fondamentale : v = λ × f\n\nOndes sonores :\n• Longitudinale, besoin d\'un milieu matériel\n• v_air ≈ 340 m/s ; v_eau ≈ 1500 m/s\n• Niveau sonore : L = 10×log(I/I₀)  [dB]\n\nOndes électromagnétiques :\n• Transversale, se propage dans le vide à c = 3×10⁸ m/s\n• Spectre : radio, micro-ondes, IR, visible, UV, X, γ\n\nAtténuation d\'une onde : l\'amplitude diminue avec la distance et l\'absorption du milieu.'},
      {id:'F1',type:'formule',nom:'Transmission d\'information — Numérisation',enonce:'Critère de Shannon-Nyquist :\nfe ≥ 2 × f_max\nfe = fréquence d\'échantillonnage\nf_max = fréquence maximale du signal\n\nRésolution : q = (max − min)/2ⁿ  (n = nombre de bits)\n\nDébit binaire : D = fe × n  [bit/s]\n\nModulation :\n• AM (amplitude) : ampli du signal porteur modifiée\n• FM (fréquence) : fréquence du signal porteur modifiée\n→ FM plus résistante aux bruits que AM\n\nFibre optique : propagation par réflexion totale interne\n→ Très haut débit, faibles pertes, immunité EM'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Relation onde',enonce:'Un radar émet des ondes à f = 10 GHz. Calculer λ. c = 3×10⁸ m/s.',correction:'λ = c/f = 3×10⁸/(10×10⁹) = 3×10⁻² m = 3 cm (micro-ondes)'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Numérisation d\'un signal audio',enonce:'Un signal audio pour téléphonie (f_max = 4000 Hz) est numérisé sur n = 8 bits. Calculer fe_min et le débit.',correction:'fe_min = 2 × f_max = 2 × 4000 = 8000 Hz = 8 kHz\nDébit = fe × n = 8000 × 8 = 64 000 bit/s = 64 kbit/s'},
    ],
  },
}

export default function PhysiqueSTI2DChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)

  if (!ch) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>⚙️</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/physique/sti2d" className="btn btn-primary">← Retour STI2D</Link>
    </div>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLOR[slug] || '#8b5cf6'

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
            <Link href="/bac-france/physique/sti2d" style={{ color:'var(--muted)', textDecoration:'none' }}>STI2D</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{ch.titre}</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <div style={{ marginBottom:28 }}>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>{ch.ch}</span>
                  <span className="label">{ch.badge}</span>
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(139,92,246,0.15)', color:'#a78bfa', fontWeight:700 }}>⚙️ STI2D</span>
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(255,255,255,0.07)', color:'var(--muted)', fontWeight:600 }}>⏱ {ch.duree}</span>
                </div>
                <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(22px,3vw,36px)', marginBottom:10 }}>{ch.titre}</h1>
                <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7, marginBottom:16 }}>{ch.desc}</p>
                <div style={{ fontSize:12, color:'var(--muted)', fontStyle:'italic' }}>{ch.section}</div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:32 }}>
                {ch.theoremes.map(t => (
                  <div key={t.id} style={{ border:`1px solid ${C[t.type as keyof typeof C] || secColor}30`, borderLeft:`4px solid ${C[t.type as keyof typeof C] || secColor}`, borderRadius:'0 12px 12px 0', overflow:'hidden' }}>
                    <div style={{ background:`${C[t.type as keyof typeof C] || secColor}10`, padding:'10px 16px', display:'flex', gap:10, alignItems:'center' }}>
                      <span style={{ fontSize:10, fontWeight:800, color:C[t.type as keyof typeof C] || secColor, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', background:`${C[t.type as keyof typeof C] || secColor}20`, padding:'2px 8px', borderRadius:6 }}>{L[t.type] || t.type}</span>
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
                  {ch.exercices.map(ex => (
                    <div key={ex.id} style={{ border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                      <div style={{ padding:'12px 20px', display:'flex', gap:10, alignItems:'flex-start' }}>
                        <div style={{ flexShrink:0 }}>
                          <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--muted)' }}>{ex.id}</span>
                          <div style={{ marginTop:3 }}>
                            <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, fontWeight:700,
                              background: ex.niveau==='Facile'?'rgba(16,185,129,0.15)':ex.niveau==='Difficile'?'rgba(239,68,68,0.15)':'rgba(245,158,11,0.15)',
                              color: ex.niveau==='Facile'?'#34d399':ex.niveau==='Difficile'?'#f87171':'#fbbf24'
                            }}>{ex.niveau}</span>
                          </div>
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:6 }}>{ex.titre}</div>
                          <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7 }}>{ex.enonce}</div>
                        </div>
                      </div>
                      <div style={{ borderTop:'1px solid var(--border)', padding:'10px 20px', display:'flex', gap:10, flexWrap:'wrap' }}>
                        <Link href={`/solve?q=${encodeURIComponent('STI2D France, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:12, padding:'6px 14px' }}>
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
                {prevSlug ? (
                  <Link href={`/bac-france/physique/sti2d/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'13px 16px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/sti2d/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'13px 16px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[nextSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', marginBottom:14 }}>
                <div style={{ padding:'11px 15px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>⚙️ STI2D — 8 chapitres</div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/physique/sti2d/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+ch.titre+' en STI2D')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {ch.titre}
                  </Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac-france/physique/st2s" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🏥 Voir ST2S</Link>
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