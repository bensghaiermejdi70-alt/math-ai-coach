'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE ST2S / [SLUG]
// Route : /bac-france/physique/st2s/[slug]
// Programme officiel ST2S — Physique-Chimie pour la Santé
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'biophysique',
  'medicaments',
  'analyses',
  'rayonnements',
  'optique',
]

const TITRES: Record<string,string> = {
  'biophysique':   'Biophysique & Mécanique des fluides biologiques',
  'medicaments':   'Propriétés des médicaments',
  'analyses':      'Analyses médicales',
  'rayonnements':  'Rayonnements ionisants en médecine',
  'optique':       'Optique & Imagerie médicale',
}

const SEC_COLOR: Record<string,string> = {
  'biophysique':'#ec4899',
  'medicaments':'#14b8a6',
  'analyses':'#f59e0b',
  'rayonnements':'#8b5cf6',
  'optique':'#06b6d4',
}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string;
  theoremes:{id:string; type:string; nom:string; enonce?:string; titre?:string; legende?:string; svg?:string}[];
  exercices:{id:string; niveau:string; titre:string; enonce:string; correction:string}[];
}> = {

  'biophysique': {
    ch:'CH 01', titre:'Biophysique', badge:'Physique médicale', duree:'~6h', section:'Section 1 — Physique du corps humain',
    desc:'Mécanique des fluides biologiques : pression artérielle, débit sanguin, loi de Poiseuille. Phénomènes de diffusion et d\'osmose à l\'échelle cellulaire.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Loi de Poiseuille — Débit sanguin',enonce:'Débit volumique d\'un liquide visqueux dans un tube cylindrique :\nQv = ΔP × π × r⁴ / (8 × η × L)\n\nQv : débit volumique (m³/s)\nΔP : différence de pression (Pa)\nr : rayon du tube (m)\nη : viscosité dynamique du liquide (Pa·s)\nL : longueur du tube (m)\n\nConséquences médicales :\n→ Qv ∝ r⁴ : réduire le rayon de moitié → débit divisé par 16 !\n→ L\'athérosclérose (réduction de r) augmente la résistance vasculaire\n→ Le cœur doit augmenter ΔP pour maintenir Qv\n\nRésistance hydraulique : R_h = 8ηL/(πr⁴)\nΔP = Qv × R_h  (analogue loi d\'Ohm)'},
      {id:'D1',type:'def',nom:'Pression artérielle',enonce:'La pression artérielle est la pression exercée par le sang sur la paroi des artères.\n\nValeurs normales :\n• Systolique (cœur en contraction) : 120 mmHg ≈ 16 kPa\n• Diastolique (cœur au repos) : 80 mmHg ≈ 10,6 kPa\n→ Noté 12/8 ou 120/80 mmHg\n\nConversion : 1 mmHg = 133 Pa\n1 bar = 10⁵ Pa ; 1 atm = 101325 Pa\n\nHypertension : > 140/90 mmHg (risque cardiovasculaire)\nHypotension : < 90/60 mmHg\n\nPression hydrostatique : P = ρ × g × h\n→ La position du corps modifie la pression sanguine'},
      {id:'D2',type:'def',nom:'Osmose et diffusion',enonce:'Diffusion : mouvement spontané des molécules d\'une zone de forte concentration vers une zone de faible concentration.\n→ Transport passif (sans énergie)\n\nLoi de Fick : J = −D × (dc/dx)\nJ = flux de diffusion (mol·m⁻²·s⁻¹)\nD = coefficient de diffusion (m²/s)\ndc/dx = gradient de concentration\n\nOsmose : passage de l\'eau à travers une membrane semi-perméable, du côté de faible concentration en soluté vers le côté de forte concentration.\n\nPression osmotique :\nΠ = n × R × T / V = c × R × T\n\nIsotonicité (plasma sanguin) : osmolarité ≈ 290 mOsm/L\n→ Sérum physiologique : NaCl à 9 g/L = 154 mmol/L'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Débit cardiaque',enonce:'Le cœur bat à 75 bpm et éjecte à chaque battement 70 mL. Calculer le débit cardiaque en L/min et mL/s.',correction:'Débit = 75 × 70 = 5250 mL/min = 5,25 L/min\nEn mL/s : 5250/60 = 87,5 mL/s ≈ 87,5 cm³/s'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Loi de Poiseuille — artère',enonce:'Une artère a r = 3 mm, L = 10 cm, η = 3×10⁻³ Pa·s, ΔP = 4 kPa. Calculer Qv.',correction:'Qv = ΔP × πr⁴/(8ηL)\n= 4000 × π × (3×10⁻³)⁴/(8 × 3×10⁻³ × 0,10)\n= 4000 × π × 8,1×10⁻¹¹/(2,4×10⁻³)\n= 4000 × 1,06×10⁻⁷\n≈ 4,24×10⁻⁴ m³/s = 424 mL/s\n(Valeur élevée car c\'est une grande artère)'},
    ],
  },

  'medicaments': {
    ch:'CH 02', titre:'Propriétés des médicaments', badge:'Chimie pharmaceutique', duree:'~6h', section:'Section 2 — Chimie des médicaments',
    desc:'Structure moléculaire des principes actifs, propriétés acide-base, pH et efficacité des médicaments, solubilité et biodisponibilité.',
    theoremes:[
      {id:'D1',type:'def',nom:'Acide-base et médicaments',enonce:'De nombreux médicaments sont des acides ou des bases faibles.\n\nAcide faible HA : HA + H₂O ⇌ A⁻ + H₃O⁺\nKa = [A⁻][H₃O⁺]/[HA]  ;  pKa = −log(Ka)\n\nBase faible B : B + H₂O ⇌ BH⁺ + OH⁻\n\nÉquation de Henderson-Hasselbalch :\npH = pKa + log([A⁻]/[HA])\n\nRègle :\n• pH < pKa : forme acide prédominante (HA)\n• pH > pKa : forme basique prédominante (A⁻)\n• pH = pKa : [HA] = [A⁻] (moitié-moitié)'},
      {id:'P1',type:'prop',nom:'Biodisponibilité et absorption',enonce:'La forme ionisée/non ionisée d\'un médicament conditionne son absorption :\n\n→ Forme non ionisée (neutre) : traverse facilement les membranes lipidiques → bonne absorption\n→ Forme ionisée : chargée → difficile à traverser les membranes\n\nEstomac (pH ≈ 2) :\n→ Acides faibles (aspirine, pKa ≈ 3,5) : majoritairement non ionisés → bien absorbés\n→ Bases faibles (morphine, pKa ≈ 8) : ionisées → peu absorbées (mieux en intestin)\n\nIntestin grêle (pH ≈ 6–7) :\n→ Base faibles : non ionisées → bonne absorption\n\nConclusion : le pH du milieu détermine l\'efficacité d\'absorption.'},
      {id:'F1',type:'formule',nom:'Solubilité des médicaments',enonce:'Produit de solubilité Ks (pour des sels peu solubles A_m B_n) :\nKs = [Aⁿ⁺]ᵐ × [Bᵐ⁻]ⁿ\n\nSolubilité s : s = [Ks/(mᵐnⁿ)]^(1/(m+n))\n\nFacteurs améliorant la solubilité :\n• Ajout de cosolvants (éthanol, PEG)\n• Formation de sels (sel de sodium plus soluble)\n• Nanotechnologies (nanoparticules, liposomes)\n• Cyclodextrines (complexation)\n\nSolubilité dans l\'eau : critère de Lipinski (règle des cinq)\n• Masse molaire < 500 g/mol\n• logP < 5  (P = coefficient de partage eau/huile)\n• Liaisons H donneur ≤ 5, accepteur ≤ 10'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Henderson-Hasselbalch',enonce:'L\'acide acétylsalicylique (aspirine) a pKa = 3,5. À pH = 7,4 (plasma), calculer le ratio [A⁻]/[HA].',correction:'pH = pKa + log([A⁻]/[HA])\n7,4 = 3,5 + log([A⁻]/[HA])\nlog([A⁻]/[HA]) = 3,9\n[A⁻]/[HA] = 10³·⁹ ≈ 7943\n→ Dans le plasma, l\'aspirine est très majoritairement sous forme ionisée (A⁻).'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Absorption gastrique',enonce:'La morphine (base faible, pKa = 8,0) est-elle mieux absorbée dans l\'estomac (pH ≈ 2) ou dans l\'intestin (pH ≈ 7) ? Justifier.',correction:'Morphine : base faible, forme non ionisée = B (base libre), forme ionisée = BH⁺\npH = pKa + log([B]/[BH⁺])\n\nEstomac (pH = 2) :\nlog([B]/[BH⁺]) = 2−8 = −6 → [B]/[BH⁺] = 10⁻⁶ → quasi-totalement ionisée (BH⁺)\n→ Peu absorbée.\n\nIntestin (pH = 7) :\nlog([B]/[BH⁺]) = 7−8 = −1 → [B]/[BH⁺] = 0,1 → 9% de forme non ionisée\n→ Mieux absorbée dans l\'intestin grêle. ✓'},
    ],
  },

  'analyses': {
    ch:'CH 03', titre:'Analyses médicales', badge:'Biochimie analytique', duree:'~6h', section:'Section 3 — Techniques analytiques',
    desc:'Spectrophotométrie UV-visible (loi de Beer-Lambert), dosages colorimétriques, chromatographie, électrophorèse.',
    theoremes:[
      {id:'T1',type:'thm',nom:'Loi de Beer-Lambert',enonce:'L\'absorbance A d\'une solution colorée est liée à sa concentration c :\nA = ε × l × c\n\nA = absorbance (sans unité, 0 ≤ A ≤ 2 en pratique)\nε = coefficient d\'absorption molaire (L·mol⁻¹·cm⁻¹) – spécifique au soluté et à λ\nl = longueur du trajet optique dans la cuve (cm)\nc = concentration molaire (mol/L)\n\nAbsorbance : A = log(I₀/I) = −log(T)\nT = I/I₀ = transmittance\n\nDomaine de validité :\n• Solutions diluées (c < 0,01 mol/L)\n• Lumière monochromatique\n• Pas d\'association ou décomposition du soluté'},
      {id:'M1',type:'methode',nom:'Courbe d\'étalonnage',enonce:'Méthode de dosage colorimétrique :\n1. Préparer des solutions étalon de concentration connue c₁, c₂, c₃…\n2. Mesurer A₁, A₂, A₃… pour chaque étalon\n3. Tracer A = f(c) → droite étalonnage (si Beer-Lambert vérifié)\n4. Mesurer A_inconnu de la solution à doser\n5. Lire c_inconnu sur la droite étalonnage\n\nDroite d\'étalonnage : A = ε × l × c\nPente = ε × l → permet de calculer ε\n\nCritères de qualité :\n• Coefficient de corrélation R² ≥ 0,999\n• Travail à λ_max (maximum d\'absorption)'},
      {id:'D1',type:'def',nom:'Chromatographie et électrophorèse',enonce:'Chromatographie : séparation des espèces selon leur affinité pour une phase stationnaire et une phase mobile.\n\n• CCM (chromatographie sur couche mince) : phase stat = silice, phase mobile = solvant\n  → Rf = d_tache/d_front  (facteur de rétention, 0 < Rf < 1)\n• HPLC (haute performance) : analyse quantitative des médicaments dans le sang\n• CPG (phase gazeuse) : analyse des composés volatils\n\nÉlectrophorèse :\nSéparation des espèces chargées sous l\'effet d\'un champ électrique.\n→ Migration vers l\'anode : anions (charges −)\n→ Migration vers la cathode : cations (charges +)\n→ Mobilité ∝ charge/taille\nApplication : séparation des protéines sériques, ADN, hémoglobine.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Application de Beer-Lambert',enonce:'Une solution de glucose (ε = 720 L·mol⁻¹·cm⁻¹, l = 1 cm) donne A = 0,36. Calculer c.',correction:'A = ε × l × c\n0,36 = 720 × 1 × c\nc = 0,36/720 = 5×10⁻⁴ mol/L = 0,5 mmol/L'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Chromatographie CCM',enonce:'Sur une CCM, une tache migre de 3,6 cm et le front de solvant de 6,0 cm. Calculer Rf. Un produit pur de référence a Rf = 0,60. L\'échantillon est-il pur ?',correction:'Rf = 3,6/6,0 = 0,60\nRf_éch = 0,60 = Rf_réf → les deux co-migrent → même composé ou mélange fortuit.\nConclusion partielle : les Rf sont identiques → probablement le même composé, mais confirmation nécessaire avec un autre solvant.'},
    ],
  },

  'rayonnements': {
    ch:'CH 04', titre:'Rayonnements ionisants en médecine', badge:'Radioactivité médicale', duree:'~6h', section:'Section 4 — Radioactivité',
    desc:'Radioactivité α, β, γ, activité, dose absorbée, dose équivalente, applications diagnostiques (scintigraphie, TEP) et thérapeutiques (radiothérapie), radioprotection.',
    theoremes:[
      {id:'D1',type:'def',nom:'Types de rayonnements ionisants',enonce:'Radioactivité α (alpha) : émission de ⁴₂He\n→ ᴬ_Z X → ᴬ⁻⁴_(Z-2) Y + ⁴₂He\n→ Faible pénétration (arrêté par feuille de papier)\n→ Très ionisant → dangereux si ingéré\n\nRadioactivité β⁻ : émission e⁻ + ν̄\n→ ᴬ_Z X → ᴬ_(Z+1) Y + e⁻ + ν̄\n→ Stoppé par quelques mm d\'aluminium\n\nRadioactivité β⁺ : émission e⁺ + ν\n→ Annihilation : e⁺ + e⁻ → 2γ (511 keV)\n→ Base de la TEP (tomographie par émission de positons)\n\nRayonnement γ : photon haute énergie (E = hf)\n→ Très pénétrant (nécessite plomb ou béton épais)\n→ Utilisé en scintigraphie et radiothérapie'},
      {id:'F1',type:'formule',nom:'Loi de décroissance radioactive',enonce:'Nombre de noyaux radioactifs au temps t :\nN(t) = N₀ × e^(−λt)\n\nActivité : A(t) = λ × N(t) = A₀ × e^(−λt)  [Becquerel, Bq]\n1 Bq = 1 désintégration/seconde\n\nConstante radioactive : λ = ln2/t₁/₂\n\nPériode radioactive (demi-vie) : t₁/₂ = ln2/λ ≈ 0,693/λ\n\nDemi-vies médicales :\n• ⁹⁹ᵐTc : t₁/₂ = 6,02 h  (scintigraphie)\n• ¹⁸F : t₁/₂ = 110 min  (TEP)\n• ¹³¹I : t₁/₂ = 8,02 j  (thérapie thyroïde)'},
      {id:'D2',type:'def',nom:'Grandeurs dosimétries et radioprotection',enonce:'Dose absorbée D : énergie déposée par unité de masse :\nD = E_absorbée / m  [Gray, Gy = J/kg]\n\nDose équivalente H : dose pondérée par le type de rayonnement :\nH = D × w_R  [Sievert, Sv]\n\nFacteurs w_R :\n• Photons γ, X, β : w_R = 1\n• Protons : w_R = 2\n• Neutrons rapides : w_R = 20\n• Particules α : w_R = 20\n\nDose efficace E (Sievert) : tient compte de la radiosensibilité des organes.\n\nRadioprotection — 3 principes :\n1. Justification : bénéfice > risque\n2. Optimisation (ALARA : As Low As Reasonably Achievable)\n3. Limitation : dose annuelle ≤ 1 mSv (public) ; ≤ 20 mSv (travailleurs)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Activité après n demi-vies',enonce:'A₀(⁹⁹ᵐTc) = 800 MBq, t₁/₂ = 6 h. Calculer A après 24 h.',correction:'24 h = 4 × t₁/₂\nA = A₀/2⁴ = 800/16 = 50 MBq'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Dose équivalente',enonce:'Un patient reçoit une dose absorbée D = 0,5 Gy de rayons γ et D = 0,01 Gy de particules α. Calculer les doses équivalentes et la dose totale.',correction:'γ : H₁ = D₁ × w_R = 0,5 × 1 = 0,5 Sv\nα : H₂ = D₂ × w_R = 0,01 × 20 = 0,20 Sv\nDose totale H = 0,5 + 0,20 = 0,70 Sv\n\nCommentaire : même si D(α) = 0,01 Gy << D(γ) = 0,5 Gy, les α contribuent significativement à la dose équivalente car w_R = 20.'},
    ],
  },

  'optique': {
    ch:'CH 05', titre:'Optique & Imagerie médicale', badge:'Optique médicale', duree:'~5h', section:'Section 5 — Imagerie médicale',
    desc:'Lentilles minces et œil, défauts visuels et corrections, endoscopie par fibre optique, échographie ultrasonore, principes de l\'IRM.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Système optique de l\'œil',enonce:'L\'œil est assimilé à un système de lentilles convergentes.\n\nRelation de conjugaison :\n1/OA\' − 1/OA = 1/f\' = D\n\nGrandissement : γ = OA\'/OA\n\nŒil normal (emmétrope) :\n• Point proche (punctum proximum) : PP = 25 cm\n• Point éloigné (punctum remotum) : PR = ∞\n\nAccommodation : l\'œil fait varier f\' (via muscles ciliaires) pour mettre au point.\nAmplitude d\'accommodation : A = D_max − D_min\n\nDioptrie (δ) = 1/f\' (avec f\' en mètres)'},
      {id:'D1',type:'def',nom:'Défauts visuels et corrections',enonce:'Myopie : l\'œil est trop convergent (axe trop long) → image se forme avant la rétine\n→ Vision de loin floue, nette de près\n→ Correction : lentille divergente (f\' < 0, D < 0)\n\nHypermétropie : l\'œil pas assez convergent → image se forme derrière la rétine\n→ Vision de près floue (fatigue le cristallin)\n→ Correction : lentille convergente (f\' > 0, D > 0)\n\nPresbyopie : perte d\'accommodation liée à l\'âge (cristallin rigide)\n→ Vision de près difficile\n→ Correction : lunettes de lecture (convergentes)\n\nAstigmatisme : courbure inégale de la cornée → image déformée\n→ Correction : lentilles toriques'},
      {id:'D2',type:'def',nom:'Échographie et IRM',enonce:'Échographie :\n→ Émission d\'ultrasons (f > 20 kHz, médicale : 1–20 MHz)\n→ Réflexion aux interfaces de milieux différents (os/tissu, liquide/solide)\n→ Mesure du retard τ → calcul de profondeur : d = v × τ/2\n→ v_son ≈ 1540 m/s dans les tissus\n→ Avantages : non irradiant, temps réel, économique\n\nIRM (Imagerie par Résonance Magnétique) :\n→ Utilise les protons d\'hydrogène (eau dans les tissus)\n→ Champ magnétique intense (0,5–3 Tesla) + ondes radiofréquences\n→ Les protons résonnent puis relaxent → signal détecté\n→ Excellent contraste des tissus mous\n→ Non irradiant (pas de rayonnement ionisant)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Vergence d\'une lentille correctrice',enonce:'Un myope voit net jusqu\'à 2 m (punctum remotum = 2 m). Quelle lentille correctrice lui faut-il pour voir à l\'infini ?',correction:'L\'objet à corriger est à l\'infini (OA = −∞).\nL\'image doit se former au PR = −2 m (objet virtuel pour l\'œil, à 2 m).\n1/f\' = 1/OA\' − 1/OA = 1/(−2) − 0 = −0,5 m⁻¹\nD = −0,5 δ (dioptries)\nLentille divergente, vergence −0,5 δ.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Échographie — mesure de profondeur',enonce:'Une sonde d\'échographie reçoit un écho 26 μs après l\'émission. v_son = 1540 m/s dans les tissus. Calculer la profondeur de la structure.',correction:'Aller-retour : τ_total = 26×10⁻⁶ s\nAller seul : τ = 13×10⁻⁶ s\nd = v × τ = 1540 × 13×10⁻⁶ = 0,020 m = 2,0 cm'},
    ],
  },
}

export default function PhysiqueST2SChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)

  if (!ch) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>🏥</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/physique/st2s" className="btn btn-primary">← Retour ST2S</Link>
    </div>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLOR[slug] || '#ec4899'

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
            <Link href="/bac-france/physique/st2s" style={{ color:'var(--muted)', textDecoration:'none' }}>ST2S</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{ch.titre}</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <div style={{ marginBottom:28 }}>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>{ch.ch}</span>
                  <span className="label">{ch.badge}</span>
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(236,72,153,0.15)', color:'#f472b6', fontWeight:700 }}>🏥 ST2S</span>
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
                        <Link href={`/solve?q=${encodeURIComponent('ST2S France, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:12, padding:'6px 14px' }}>
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
                  <Link href={`/bac-france/physique/st2s/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'13px 16px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/st2s/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                <div style={{ padding:'11px 15px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>🏥 ST2S — 5 chapitres</div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/physique/st2s/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+ch.titre+' en ST2S')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {ch.titre}
                  </Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac-france/physique/sti2d" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>⚙️ Voir STI2D</Link>
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