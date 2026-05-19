'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE POUR LA SANTÉ — ST2S / [SLUG]
// Route : /bac-france/physique/st2s/[slug]
// Programme officiel · PCPS (Première) + CBPH (Terminale)
// 5 chapitres · Applications médicales et paramédicales
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#ec4899', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#14b8a6', loi:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', loi:'Loi' }

const NAV_ORDER = ['biophysique','medicaments','analyses','rayonnements','optique']

const TITRES_NAV: Record<string,string> = {
  'biophysique':  'CH 01 — Biophysique & Fluides biologiques',
  'medicaments':  'CH 02 — Propriétés des médicaments',
  'analyses':     'CH 03 — Analyses médicales',
  'rayonnements': 'CH 04 — Rayonnements ionisants en médecine',
  'optique':      'CH 05 — Optique & Imagerie médicale',
}

const SEC_COLORS: Record<string,string> = {
  'biophysique':'#ec4899','medicaments':'#14b8a6','analyses':'#f59e0b',
  'rayonnements':'#8b5cf6','optique':'#06b6d4',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; tag:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — BIOPHYSIQUE
// ─────────────────────────────────────────────────────────────────────
'biophysique': {
  id:'biophysique', emoji:'🏥', tag:'Physique médicale', color:'#ec4899',
  titre:'Biophysique & Mécanique des fluides biologiques',
  desc:"Pression artérielle (systolique/diastolique), débit sanguin, loi de Poiseuille (Qv∝r⁴), phénomènes de diffusion (loi de Fick) et osmose (pression osmotique), potentiel membranaire.",
  souschapitres:[
    {
      id:'sc-bio1', titre:'1.1 Pression artérielle et débit sanguin',
      notions:['Pression artérielle : systolique 120mmHg / diastolique 80mmHg','P=ρgh (hydrostatique)','Qv=ΔP·πr⁴/(8ηL) (Poiseuille)','Résistance hydraulique R_h=8ηL/(πr⁴)'],
      blocs:[
        {
          notion:'🏥 Pression et débit sanguin',
          theoremes:[
            { id:'D-BIO1', type:'def', nom:'Pression artérielle',
              enonce:"Pression exercée par le sang sur la paroi des artères.\n\nVALEURS NORMALES :\nSystolique (cœur en contraction) : 120 mmHg ≈ 16 kPa\nDiastolique (cœur au repos) : 80 mmHg ≈ 10,6 kPa\n→ Notation : 12/8 ou 120/80 mmHg\n\nCONVERSIONS :\n1 mmHg = 133 Pa\n1 atm = 101 325 Pa = 760 mmHg\n\nHYPERTENSION : > 140/90 mmHg → risque cardiovasculaire\nHYPOTENSION : < 90/60 mmHg → risque de malaise\n\nPRESSION HYDROSTATIQUE :\nP = ρ × g × h\n(La position du corps modifie la pression sanguine : debout vs allongé)" },
            { id:'F-BIO1', type:'formule', nom:'Loi de Poiseuille — débit vasculaire',
              enonce:"DÉBIT VOLUMIQUE dans un tube cylindrique :\nQv = ΔP × π × r⁴ / (8 × η × L)\n\nQv : débit volumique (m³/s)\nΔP : différence de pression (Pa)\nr : rayon du tube (m)\nη : viscosité dynamique (Pa·s)\nL : longueur (m)\n\nÉQUIVALENT LOI D'OHM :\nRésistance hydraulique : R_h = 8ηL/(πr⁴)\nΔP = Qv × R_h\n\nCONSÉQUENCES MÉDICALES :\n• Qv ∝ r⁴ : réduire r de moitié → débit divisé par 16 !\n• Athérosclérose : dépôts lipidiques réduisent r → R_h augmente\n→ Cœur doit augmenter ΔP pour maintenir Qv → hypertension",
              remarque:"La dépendance en r⁴ explique la gravité des sténoses vasculaires : une réduction de 30% du rayon divise le débit par 4 environ (0,7⁴≈0,24)." },
          ],
          exercices:[
            { id:'EX-BIO1', niveau:'Facile', titre:'Débit cardiaque',
              enonce:"Cœur : 75 bpm, volume systolique = 70 mL/battement. Calculer le débit cardiaque en L/min.",
              correction:"Débit = 75 × 70 = 5250 mL/min = 5,25 L/min ≈ 88 mL/s." },
            { id:'EX-BIO2', niveau:'Intermédiaire', titre:'Loi de Poiseuille',
              enonce:"Artère : r=3mm, L=10cm, η=3×10⁻³Pa·s, ΔP=4kPa. Calculer Qv.",
              correction:"Qv=4000×π×(3×10⁻³)⁴/(8×3×10⁻³×0,10)\n=(4000×π×8,1×10⁻¹¹)/(2,4×10⁻³)\n≈4,24×10⁻⁴ m³/s=424 mL/s." },
          ]
        },
      ]
    },
    {
      id:'sc-bio2', titre:'1.2 Diffusion, osmose et potentiel membranaire',
      notions:['Diffusion : Fick J=−D·dc/dx','Osmose : eau vers forte concentration en soluté','Pression osmotique Π=cRT','Plasma : 290 mOsm/L ; sérum physio : NaCl 9g/L'],
      blocs:[
        {
          notion:'🔬 Diffusion et osmose cellulaire',
          theoremes:[
            { id:'D-BIO2', type:'def', nom:'Diffusion et loi de Fick',
              enonce:"DIFFUSION :\nMouvement spontané des molécules d'une zone de forte concentration vers une zone de faible concentration (gradient de concentration).\n→ Transport PASSIF (sans énergie)\n\nLOI DE FICK :\nJ = −D × (dc/dx)\nJ = flux de diffusion (mol·m⁻²·s⁻¹)\nD = coefficient de diffusion (m²/s)\ndc/dx = gradient de concentration (mol·m⁻³·m⁻¹)\n\nAPPLICATIONS :\n• Échanges gazeux O₂/CO₂ dans les alvéoles pulmonaires\n• Diffusion des médicaments à travers les membranes cellulaires\n• Dialyse rénale (épuration du sang)" },
            { id:'D-BIO3', type:'def', nom:'Osmose et pression osmotique',
              enonce:"OSMOSE :\nPassage de l'eau à travers une membrane semi-perméable,\ndu côté de faible concentration en soluté → côté de forte concentration.\n(La membrane laisse passer l'eau mais pas le soluté)\n\nPRESSION OSMOTIQUE :\nΠ = c × R × T\nc = concentration du soluté (mol/L) ; R = 8,314 J·mol⁻¹·K⁻¹ ; T en K\n\nSOLUTIONS ISOTONIQUES (même Π que plasma) :\nPlasma : osmolarité ≈ 290 mOsm/L\nSérum physiologique : NaCl à 9 g/L = 154 mmol/L → isotonique\n\nHYPERTONIQUE (Π > plasma) → déshydratation cellulaire\nHYPOTONIQUE (Π < plasma) → gonflement/lyse cellulaire",
              remarque:"En soins infirmiers : toujours vérifier l'osmolarité des perfusions. Un sérum glucosé 5% (isotonique) devient hypotonique après métabolisation du glucose." },
          ],
          exercices:[
            { id:'EX-BIO3', niveau:'Intermédiaire', titre:'Pression osmotique',
              enonce:"Sérum physiologique NaCl à 9g/L (M=58,5g/mol). Calculer l'osmolarité et comparer au plasma (290 mOsm/L).",
              correction:"n(NaCl)=9/58,5≈0,154mol/L.\nNaCl → Na⁺ + Cl⁻ : 2 particules.\nOsmolarité=2×0,154=0,308 Osm/L=308 mOsm/L≈290 mOsm/L ✓ (isotonique)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — PROPRIÉTÉS DES MÉDICAMENTS
// ─────────────────────────────────────────────────────────────────────
'medicaments': {
  id:'medicaments', emoji:'💊', tag:'Chimie pharmaceutique', color:'#14b8a6',
  titre:'Propriétés des médicaments',
  desc:"Structure moléculaire des principes actifs, propriétés acide-base (Henderson-Hasselbalch), pH et absorption, solubilité et biodisponibilité, règle des 5 de Lipinski.",
  souschapitres:[
    {
      id:'sc-med1', titre:'2.1 Acides-bases et absorption des médicaments',
      notions:['Henderson-Hasselbalch : pH=pKa+log([A⁻]/[HA])','pH<pKa : forme AH prédomine','Forme neutre → traverse les membranes','Estomac pH≈2 : acides faibles mieux absorbés'],
      blocs:[
        {
          notion:'💊 pH et absorption médicamenteuse',
          theoremes:[
            { id:'D-MED1', type:'def', nom:'Acide-base et médicaments',
              enonce:"De nombreux médicaments sont des acides ou des bases faibles.\n\nACIDE FAIBLE HA :\nHA + H₂O ⇌ A⁻ + H₃O⁺\nKa = [A⁻][H₃O⁺]/[HA]  ;  pKa = −log(Ka)\n\nBASE FAIBLE B :\nB + H₂O ⇌ BH⁺ + OH⁻\n\nÉQUATION DE HENDERSON-HASSELBALCH :\npH = pKa + log([A⁻]/[HA])\n\nRÈGLE :\npH < pKa → forme ACIDE HA prédomine\npH = pKa → [HA] = [A⁻] (moitié-moitié)\npH > pKa → forme BASE A⁻ prédomine" },
            { id:'P-MED1', type:'prop', nom:'Biodisponibilité et absorption intestinale',
              enonce:"PRINCIPE :\nForme NON IONISÉE (neutre) : traverse facilement les membranes lipidiques → bonne absorption\nForme IONISÉE : chargée → difficulté à traverser les membranes → faible absorption\n\nESTOMAC (pH ≈ 2) :\nAcides faibles (aspirine, pKa≈3,5) :\n[A⁻]/[HA]=10^(2−3,5)=10^(−1,5)≈0,03 → 97% forme AH → bonne absorption gastrique\n\nBases faibles (morphine, pKa≈8) :\n[B]/[BH⁺]=10^(2−8)=10^(−6) → quasi-totalement ionisée → peu absorbée\n\nINTESTIN GRÊLE (pH ≈ 6–7) :\nBases faibles : mieux absorbées car plus de forme neutre\n\nCONCLUSION :\nLe pH du milieu biologique détermine l'efficacité d'absorption.",
              remarque:"Certains médicaments sont formulés avec un enrobage entérique (résistant à l'acide gastrique) pour être libérés uniquement dans l'intestin à pH 6-7." },
          ],
          exercices:[
            { id:'EX-MED1', niveau:'Facile', titre:'Aspirine dans le plasma',
              enonce:"Aspirine : pKa=3,5. Calculer [A⁻]/[HA] dans le plasma (pH=7,4).",
              correction:"7,4=3,5+log([A⁻]/[HA]).\nlog([A⁻]/[HA])=3,9 → [A⁻]/[HA]=10³·⁹≈7943.\n→ Quasi totalement ionisée dans le plasma." },
            { id:'EX-MED2', niveau:'Intermédiaire', titre:'Morphine — absorption',
              enonce:"Morphine : base faible, pKa=8,0. Comparer l'absorption dans l'estomac (pH=2) et l'intestin (pH=7).",
              correction:"Estomac : log([B]/[BH⁺])=2−8=−6 → [B]/[BH⁺]=10⁻⁶ → forme ionisée BH⁺ quasi-totale → peu absorbée.\nIntestin : log([B]/[BH⁺])=7−8=−1 → [B]/[BH⁺]=0,1 → 9% neutre → mieux absorbée. ✓" },
          ]
        },
      ]
    },
    {
      id:'sc-med2', titre:'2.2 Solubilité et biodisponibilité',
      notions:['Produit de solubilité Ks','Règle de Lipinski (règle des 5)','logP : coefficient de partage huile/eau','Stratégies pour améliorer la solubilité'],
      blocs:[
        {
          notion:'🔬 Solubilité pharmaceutique',
          theoremes:[
            { id:'D-MED2', type:'def', nom:'Solubilité et règle de Lipinski',
              enonce:"PRODUIT DE SOLUBILITÉ :\nPour un sel peu soluble AₘBₙ : Ks = [Aⁿ⁺]ᵐ × [Bᵐ⁻]ⁿ\n\nRÈGLE DES 5 DE LIPINSKI (médicament par voie orale) :\n• Masse molaire < 500 g/mol\n• logP < 5  (P = coeff. de partage huile/eau = lipophilie)\n• Donneurs de liaisons H ≤ 5\n• Accepteurs de liaisons H ≤ 10\n→ Si ≥ 2 règles violées : faible biodisponibilité orale\n\nSTRATÉGIES POUR AMÉLIORER LA SOLUBILITÉ :\n• Formation de sel sodique ou potassique\n• Nanoparticules et liposomes\n• Cyclodextrines (complexation)\n• Cosolvants (PEG, éthanol)\n\nBIODISPONIBILITÉ F :\nF = (Dose absorbée/Dose administrée) × 100%\nVoie IV : F = 100% (référence)\nVoie orale : F variable (0–100%)",
              remarque:"L'aspirine (M=180g/mol, logP=1,2, 2 donneurs H) respecte la règle de Lipinski → bonne biodisponibilité orale. La cyclosporine (M=1203g/mol) la viole → problèmes d'absorption." },
          ],
          exercices:[
            { id:'EX-MED3', niveau:'Facile', titre:'Règle de Lipinski',
              enonce:"Médicament A : M=320g/mol, logP=3,2, 3 donneurs H, 7 accepteurs H. Respecte la règle de Lipinski ?",
              correction:"M=320<500 ✓ ; logP=3,2<5 ✓ ; 3 donneurs<5 ✓ ; 7 accepteurs<10 ✓.\nToutes les règles respectées → bonne biodisponibilité orale probable." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — ANALYSES MÉDICALES
// ─────────────────────────────────────────────────────────────────────
'analyses': {
  id:'analyses', emoji:'🔬', tag:'Biochimie analytique', color:'#f59e0b',
  titre:'Analyses médicales',
  desc:"Spectrophotométrie UV-visible (loi de Beer-Lambert A=εlc), courbe d'étalonnage, dosage colorimétrique, chromatographie (CCM, HPLC), électrophorèse.",
  souschapitres:[
    {
      id:'sc-an1', titre:'3.1 Spectrophotométrie et loi de Beer-Lambert',
      notions:['A=ε·l·c (Beer-Lambert)','A=log(I₀/I) ; T=I/I₀','ε : coefficient extinction molaire (L·mol⁻¹·cm⁻¹)','Courbe d\'étalonnage : A=f(c)'],
      blocs:[
        {
          notion:'📊 Spectrophotométrie médicale',
          theoremes:[
            { id:'T-AN1', type:'thm', nom:'Loi de Beer-Lambert',
              enonce:"A = ε × l × c\n\nA = absorbance (sans unité, 0 ≤ A ≤ 2 en pratique)\nε = coefficient d'absorption molaire (L·mol⁻¹·cm⁻¹) — spécifique au soluté et à λ\nl = longueur du trajet optique dans la cuve (cm)\nc = concentration molaire (mol/L)\n\nABSORBANCE :\nA = log(I₀/I) = −log(T)\nT = I/I₀ = transmittance (0 à 1)\n\nDOMAINE DE VALIDITÉ :\n• Solutions diluées (c < 0,01 mol/L)\n• Lumière monochromatique (λ fixée)\n• Pas d'association ou décomposition du soluté\n\nAPPLICATIONS MÉDICALES :\n• Dosage glycémie, créatinine, bilirubine\n• Numération des globules rouges\n• Dosage de l'hémoglobine glyquée (HbA1c)",
              remarque:"Travailler à λ_max (maximum d'absorption) pour une meilleure sensibilité et une meilleure linéarité de la réponse." },
            { id:'M-AN1', type:'methode', nom:'Courbe d\'étalonnage — protocole',
              enonce:"MÉTHODE DE DOSAGE :\n1. Préparer des solutions étalon c₁, c₂, c₃… (concentrations connues)\n2. Mesurer A₁, A₂, A₃… pour chaque étalon à λ_max\n3. Tracer A = f(c) → droite de pente (ε×l)\n4. Mesurer A_inconnue de la solution à doser\n5. Lire c_inconnue sur la droite (ou calculer c = A/(ε×l))\n\nDROITE D'ÉTALONNAGE :\nA = ε × l × c  (passe par l'origine)\nPente = ε × l\n\nCRITÈRES DE QUALITÉ :\n• Coefficient de détermination R² ≥ 0,999\n• Solution inconnue doit être dans la gamme d'étalonnage\n• Blanc (solvant pur) mesuré en premier" },
          ],
          exercices:[
            { id:'EX-AN1', niveau:'Facile', titre:'Beer-Lambert — calcul de concentration',
              enonce:"Glucose : ε=720L·mol⁻¹·cm⁻¹, l=1cm, A=0,36. Calculer c.",
              correction:"c=A/(ε×l)=0,36/(720×1)=5×10⁻⁴mol/L=0,5mmol/L." },
            { id:'EX-AN2', niveau:'Intermédiaire', titre:'Dosage de l\'hémoglobine',
              enonce:"Hémoglobine : ε=70000L·mol⁻¹·cm⁻¹, l=1cm, A=0,56. Concentration en g/L si M(Hb)=64500g/mol ?",
              correction:"c=A/(ε×l)=0,56/70000=8×10⁻⁶mol/L.\nm/V=c×M=8×10⁻⁶×64500≈0,516g/L.\n(Valeur normale : 120–170g/L → l'échantillon doit avoir été dilué.)" },
          ]
        },
      ]
    },
    {
      id:'sc-an2', titre:'3.2 Chromatographie et électrophorèse',
      notions:['CCM : Rf=d_tache/d_front (0<Rf<1)','HPLC : analyse quantitative médicaments dans le sang','Électrophorèse : migration selon charge/taille','Anions → anode ; cations → cathode'],
      blocs:[
        {
          notion:'🧫 Techniques de séparation analytique',
          theoremes:[
            { id:'D-AN2', type:'def', nom:'Chromatographie',
              enonce:"PRINCIPE :\nSéparation des espèces selon leur affinité pour une phase stationnaire vs une phase mobile.\n\nCCM (Chromatographie sur Couche Mince) :\n• Phase stationnaire : silice (polaire)\n• Phase mobile : solvant\n• Rf = d_tache / d_front  (0 < Rf < 1)\n→ Identification d'un composé (comparaison Rf)\n→ Contrôle de pureté (1 seule tache = pur)\n\nHPLC (Haute Performance Liquide) :\n• Phase mobile liquide, haute pression\n• Analyse quantitative des médicaments dans le sang\n• Dosage de l'alcoolémie, drogues, anticancéreux\n\nCPG (Phase Gazeuse) :\n• Composés volatils : arômes, parfums\n• Couplage CPG-SM : identification par spectre de masse" },
            { id:'D-AN3', type:'def', nom:'Électrophorèse',
              enonce:"PRINCIPE :\nSéparation des espèces chargées sous l'effet d'un champ électrique.\n\nMIGRATION :\n→ Anions (charge −) : migrent vers l'anode (+)\n→ Cations (charge +) : migrent vers la cathode (−)\n\nMOBILITÉ ∝ charge/taille\n→ Plus chargé et plus petit = migration plus rapide\n\nAPPLICATIONS MÉDICALES :\n• Électrophorèse des protéines sériques : diagnostic myélome, déficits immunitaires\n• Électrophorèse de l'hémoglobine : dépistage drépanocytose\n• Migration de l'ADN sur gel d'agarose : biologie moléculaire, test de paternité\n\nÉLECTROPHORÈSE CAPILLAIRE :\nHaute résolution, automatisée, utilisée en laboratoire clinique",
              remarque:"L'électrophorèse des protéines sériques donne 5 pics (albumine, α1, α2, β, γ globulines). Une élévation de la fraction γ évoque une immunoglobuline monoclonale (myélome)." },
          ],
          exercices:[
            { id:'EX-AN3', niveau:'Facile', titre:'Facteur de rétention Rf (CCM)',
              enonce:"Sur une CCM : tache migre de 3,6cm, front de solvant de 6,0cm. Calculer Rf. Référence : Rf=0,60. Conclusion ?",
              correction:"Rf=3,6/6,0=0,60=Rf_réf → co-migration → probablement même composé.\n(Confirmation : réaliser une CCM dans un autre solvant.)" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — RAYONNEMENTS IONISANTS EN MÉDECINE
// ─────────────────────────────────────────────────────────────────────
'rayonnements': {
  id:'rayonnements', emoji:'☢️', tag:'Radioactivité médicale', color:'#8b5cf6',
  titre:'Rayonnements ionisants en médecine',
  desc:"Radioactivité (α, β⁻, β⁺, γ), loi de décroissance N=N₀e^(−λt), activité A=λN, dose absorbée D (Gray), dose équivalente H=D·wR (Sievert), applications diagnostiques et thérapeutiques, radioprotection.",
  souschapitres:[
    {
      id:'sc-ray1', titre:'4.1 Types de rayonnements et loi de décroissance',
      notions:['α : ⁴₂He, faible pénétration','β⁻ : électron, stoppé par Al','β⁺ : positon → 2γ (511keV) → TEP','γ : très pénétrant, nécessite Pb/béton'],
      blocs:[
        {
          notion:'☢️ Rayonnements ionisants',
          theoremes:[
            { id:'D-RAY1', type:'def', nom:'Types de rayonnements',
              enonce:"RADIOACTIVITÉ α :\nÉmission d'un noyau d'hélium ⁴₂He\nᴬ_ZX → ᴬ⁻⁴_(Z-2)Y + ⁴₂He\nFaible pénétration (arrêté par feuille de papier)\nTrès ionisant → dangereux si ingéré (α interne)\n\nRADIOACTIVITÉ β⁻ :\nÉmission d'un électron e⁻ + antineutrino ν̄\nᴬ_ZX → ᴬ_(Z+1)Y + e⁻ + ν̄  (n→p)\nStoppé par quelques mm d'aluminium\n\nRADIOACTIVITÉ β⁺ :\nÉmission d'un positon e⁺ + neutrino ν\nAnnihilation : e⁺ + e⁻ → 2 photons γ de 511 keV\n→ BASE DE LA TEP (Tomographie par Émission de Positons)\nExemple : ¹⁸F-FDG (glucose fluoré) → scintigraphie cancers\n\nRAYONNEMENT γ :\nPhoton haute énergie (E = hf)\nTrès pénétrant → nécessite blindage plomb ou béton\nUtilisé en scintigraphie (⁹⁹ᵐTc) et radiothérapie (⁶⁰Co)" },
            { id:'F-RAY1', type:'formule', nom:'Loi de décroissance radioactive',
              enonce:"N(t) = N₀ × e^(−λt)\nA(t) = λ × N(t) = A₀ × e^(−λt)  (Becquerel, Bq)\n1 Bq = 1 désintégration/seconde\n\nCONSTANTE RADIOACTIVE : λ = ln2 / t₁/₂\nDEMI-VIE : t₁/₂ = 0,693 / λ\nAprès n demi-vies : N = N₀/2ⁿ ; A = A₀/2ⁿ\n\nDEMI-VIES MÉDICALES IMPORTANTES :\n• ⁹⁹ᵐTc : t₁/₂ = 6,02h → scintigraphie os, cœur, thyroïde\n• ¹⁸F : t₁/₂ = 110 min → TEP oncologique\n• ¹³¹I : t₁/₂ = 8,02 j → traitement cancer thyroïde\n• ¹²⁵I : t₁/₂ = 59,4 j → dosages radio-immunologiques",
              remarque:"Le ⁹⁹ᵐTc est l'isotope médical le plus utilisé (80% des examens) : courte demi-vie (6h) → faible irradiation du patient ; uniquement γ → détectable extérieurement." },
          ],
          exercices:[
            { id:'EX-RAY1', niveau:'Facile', titre:'Activité après n demi-vies',
              enonce:"A₀(⁹⁹ᵐTc)=800MBq, t₁/₂=6h. Calculer A après 24h.",
              correction:"24h = 4×t₁/₂.\nA=A₀/2⁴=800/16=50MBq." },
            { id:'EX-RAY2', niveau:'Intermédiaire', titre:'Activité à t quelconque',
              enonce:"A₀=400MBq de ¹³¹I (t₁/₂=8,02j). Activité après 20 jours ?",
              correction:"λ=ln2/8,02=0,0864 j⁻¹.\nA=400×e^(−0,0864×20)=400×e^(−1,728)=400×0,178≈71MBq." },
          ]
        },
      ]
    },
    {
      id:'sc-ray2', titre:'4.2 Dosimétrie et radioprotection',
      notions:['Dose absorbée D=E/m (Gray=J/kg)','Dose équivalente H=D×wR (Sievert)','wR : photons γ=1 ; α=20','Limites : 1mSv/an (public) ; 20mSv/an (travailleurs)'],
      blocs:[
        {
          notion:'🛡️ Dosimétrie et radioprotection',
          theoremes:[
            { id:'D-RAY2', type:'def', nom:'Grandeurs dosimétriques',
              enonce:"DOSE ABSORBÉE D :\nÉnergie déposée par rayonnement par unité de masse\nD = E_absorbée / m  [Gray, Gy = J/kg]\n\nDOSE ÉQUIVALENTE H :\nTient compte du type de rayonnement (pouvoir ionisant)\nH = D × w_R  [Sievert, Sv]\n\nFACTEURS DE PONDÉRATION w_R :\n• Photons γ, X, β (électrons) : w_R = 1\n• Protons : w_R = 2\n• Neutrons rapides : w_R = 10–20\n• Particules α : w_R = 20\n\nDOSE EFFICACE E :\nTient compte de la radiosensibilité des organes (facteur tissulaire wT)\nE = Σ wT × H_T  [Sievert, Sv]\n\nRADIOSENSIBILITÉ :\nMoelle osseuse, intestins > poumons, thyroïde > peau, os" },
            { id:'D-RAY3', type:'def', nom:'Radioprotection — 3 principes CIPR',
              enonce:"PRINCIPES DE LA RADIOPROTECTION (CIPR) :\n\n1. JUSTIFICATION :\nTout acte irradiant doit avoir un bénéfice net supérieur au risque\n\n2. OPTIMISATION (ALARA) :\nAs Low As Reasonably Achievable\n→ Minimiser les doses autant que possible\n\n3. LIMITATION :\nDose annuelle maximale :\n• Public : ≤ 1 mSv/an\n• Travailleurs exposés : ≤ 20 mSv/an\n• Dose naturelle en France : ≈ 2,4 mSv/an (radon, cosmiques, sol)\n\nMOYENS DE PROTECTION :\n• Distance : D ∝ 1/r² (doublement distance → dose divisée par 4)\n• Écrans : plomb (γ, X), béton, eau\n• Temps : minimiser la durée d'exposition\n\nDOSIMÈTRE PASSIF :\nBadge thermoluminescent → contrôle mensuel des travailleurs",
              remarque:"Le paradoxe du scanographe : très utile médicalement (≈5-10mSv/examen) mais irradiant. L'IRM est non irradiante → alternative privilégiée quand possible." },
          ],
          exercices:[
            { id:'EX-RAY3', niveau:'Intermédiaire', titre:'Dose équivalente mixte',
              enonce:"Patient : D=0,5Gy de γ + D=0,01Gy de α. Doses équivalentes et dose totale.",
              correction:"H(γ)=0,5×1=0,5Sv.\nH(α)=0,01×20=0,20Sv.\nH_total=0,70Sv.\n(Les α, bien que 50× moins en dose absorbée, contribuent 40% de la dose équivalente !)" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — OPTIQUE & IMAGERIE MÉDICALE
// ─────────────────────────────────────────────────────────────────────
'optique': {
  id:'optique', emoji:'👁️', tag:'Optique médicale', color:'#06b6d4',
  titre:'Optique & Imagerie médicale',
  desc:"Système optique de l'œil (accommodation, défauts visuels, correction), endoscopie par fibre optique, échographie ultrasonore, principes de l'IRM.",
  souschapitres:[
    {
      id:'sc-opt1', titre:'5.1 L\'œil et les défauts visuels',
      notions:['Œil : lentilles convergentes, image sur rétine','Accommodation : variation de f\'','Myopie → divergente (D<0)','Hypermétropie → convergente (D>0)'],
      blocs:[
        {
          notion:'👁️ Optique de l\'œil',
          theoremes:[
            { id:'F-OPT1', type:'formule', nom:'Relation de conjugaison et vergence',
              enonce:"RELATION DE CONJUGAISON :\n1/OA' − 1/OA = 1/f' = D\n\nVERGENCE : D = 1/f'  (en dioptries δ, avec f' en mètres)\n\nGRANDISSEMENT : γ = OA'/OA\n\nŒIL NORMAL (emmétrope) :\n• Punctum Proximum (PP) = 25 cm (vision distincte nette la plus proche)\n• Punctum Remotum (PR) = ∞ (vision nette à l'infini)\n\nACCOMMODATION :\nAjustement de la vergence du cristallin pour mettre au point\nAmplitude : A = D_max − D_min  (en dioptries)\n\nŒIL ÉQUIVALENT :\nVergence totale ≈ 60 δ (cornée ≈ 43δ + cristallin ≈ 17δ)" },
            { id:'D-OPT1', type:'def', nom:'Défauts visuels et corrections',
              enonce:"MYOPIE :\nŒil trop convergent (axe oculaire trop long)\n→ Image se forme AVANT la rétine\n→ Vision de loin floue ; vision de près nette\n→ PR < ∞  (ex : PR = 2 m)\n→ Correction : lentille DIVERGENTE (D < 0)\n\nHYPERMÉTROPIE :\nŒil pas assez convergent\n→ Image se forme DERRIÈRE la rétine (effort d'accommodation permanent)\n→ Vision de près floue ; vision de loin possible par accommodation\n→ Correction : lentille CONVERGENTE (D > 0)\n\nPRESBYOPIE :\nDiminution de l'accommodation avec l'âge (cristallin rigide)\n→ PP s'éloigne (> 25 cm)\n→ Correction : lunettes de lecture (convergentes)\n\nASTIGMATISME :\nCourbure inégale de la cornée → image déformée\n→ Correction : lentilles toriques (différentes courbures selon l'axe)" },
          ],
          exercices:[
            { id:'EX-OPT1', niveau:'Facile', titre:'Correction d\'un myope',
              enonce:"Myope avec PR=2m. Vergence de la lentille correctrice pour voir à l'infini ?",
              correction:"Objet à OA=−∞. Image doit se former au PR=−2m (côté objet).\n1/f'=1/OA'−1/OA=1/(−2)−0=−0,5 m⁻¹.\nD=−0,5δ (lentille divergente)." },
            { id:'EX-OPT2', niveau:'Intermédiaire', titre:'Vérification — image sur la rétine',
              enonce:"Œil avec rétine à OA'=+17mm, vergence totale D=+60δ. Objet à OA=−25cm. Image sur la rétine ?",
              correction:"1/OA'=1/f'+1/OA=60+1/(−0,25)=60−4=56 m⁻¹.\nOA'=1/56≈0,0179m=17,9mm≈17mm ✓ (image sur la rétine)." },
          ]
        },
      ]
    },
    {
      id:'sc-opt2', titre:'5.2 Imagerie médicale — ultrasons et IRM',
      notions:['Échographie : d=v×τ/2 (v≈1540m/s)','Endoscopie : réflexion totale interne','IRM : protons H, champ magnétique, ondes RF','Avantages IRM : non irradiant, excellent contraste des tissus mous'],
      blocs:[
        {
          notion:'🔬 Techniques d\'imagerie médicale',
          theoremes:[
            { id:'D-OPT2', type:'def', nom:'Échographie et endoscopie par fibre optique',
              enonce:"ÉCHOGRAPHIE :\nÉmission d'ultrasons (f > 20 kHz, médicale : 1–20 MHz)\nRéflexion aux interfaces de milieux différents (différences de densité)\nMesure du retard τ_aller-retour → profondeur : d = v × τ/2\nv_son ≈ 1540 m/s dans les tissus\n\nAVANTAGES :\n• Non irradiant (pas de rayonnements ionisants)\n• Temps réel (imagerie dynamique, flux sanguin)\n• Économique et portable\n• Utilisé sans danger pendant la grossesse\n\nENDOSCOPIE (fibroscopie) :\nFibres optiques → transmission par réflexion totale interne\nn₁ > n₂ et θ > θ_c  (angle critique)\nsinθ_c = n₂/n₁\n\nApplications :\n• Coloscopie, gastroscopie, bronchoscopie\n• Transmission d'image + lumière d'éclairage + outils chirurgicaux" },
            { id:'D-OPT3', type:'def', nom:'IRM — principes de base',
              enonce:"IRM (Imagerie par Résonance Magnétique) :\n\nPRINCIPE :\n1. Champ magnétique intense (0,5–3 Tesla) alignent les protons H (dans l'eau des tissus)\n2. Impulsion radiofréquence (RF) perturbe cet alignement\n3. Les protons relaxent → émettent un signal RF\n4. Détection et reconstruction informatique → image\n\nCONTRASTE :\nExcellent contraste entre les tissus mous (cerveau, muscles, organes)\nT1, T2 : constantes de relaxation, différentes selon les tissus\n\nAVANTAGES :\n• NON IRRADIANT (pas de rayonnements ionisants)\n• Excellent contraste des tissus mous\n• Coupes dans tous les plans\n• Fonctionnelle (IRM fonctionnelle = IRMf, activité cérébrale)\n\nLIMITES :\n• Durée longue (20–60 min) ; Bruyant\n• Contre-indication : pacemaker, implants ferromagnétiques\n• Coûteux (≈800€/examen vs 100€ scanner)",
              remarque:"Depuis 2019, l'IRM 3 Tesla permet d'imager les structures cérébrales à moins de 1mm de résolution, révolutionnant le diagnostic neurologique." },
          ],
          exercices:[
            { id:'EX-OPT3', niveau:'Facile', titre:'Échographie — profondeur',
              enonce:"Écho reçu τ=26μs après émission. v_son=1540m/s. Profondeur de la structure ?",
              correction:"d=v×τ/2=1540×26×10⁻⁶/2=1540×13×10⁻⁶≈0,020m=2,0cm." },
            { id:'EX-OPT4', niveau:'Intermédiaire', titre:'Angle critique fibre optique',
              enonce:"Fibre : cœur n₁=1,52, gaine n₂=1,48. Angle critique θ_c ?",
              correction:"sinθ_c=n₂/n₁=1,48/1,52=0,974.\nθ_c=arcsin(0,974)≈76,9°.\n(Tout rayon avec θ>76,9° est totalement réfléchi → confiné dans la fibre.)" },
          ]
        },
      ]
    },
  ]
},

} // fin ALL_CHAPTERS

// ══════════════════════════════════════════════════════════════════════
// UI HELPERS
// ══════════════════════════════════════════════════════════════════════
function TypeBadge({ type }: { type: string }) {
  const color = C[type as keyof typeof C] || C.def
  return (
    <span style={{ fontSize:10, padding:'2px 10px', borderRadius:20, fontWeight:700,
      background:`${color}20`, color, whiteSpace:'nowrap' }}>
      {L[type] || type}
    </span>
  )
}
function NiveauBadge({ niveau }: { niveau: string }) {
  const cfg = niveau==='Facile'
    ? { bg:'rgba(6,214,160,0.15)', color:'#06d6a0' }
    : niveau==='Difficile'
    ? { bg:'rgba(239,68,68,0.15)', color:'#ef4444' }
    : { bg:'rgba(245,158,11,0.15)', color:'#f59e0b' }
  return <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, fontWeight:600,
    background:cfg.bg, color:cfg.color }}>{niveau}</span>
}

// ══════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════
export default function PhysiqueST2SSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'biophysique'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🏥</div>
          <h2>Chapitre non trouvé</h2>
          <Link href="/bac-france/physique/st2s" style={{ color:'#ec4899' }}>← Retour ST2S</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#ec4899'

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link><span>›</span>
          <Link href="/bac-france/physique/st2s" style={{ color:'var(--muted)', textDecoration:'none' }}>ST2S</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{chapter.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 270px', gap:32, alignItems:'start' }}>

            {/* ═══════ CONTENU ═══════ */}
            <div>
              {/* HEADER */}
              <div style={{ marginBottom:36 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:28 }}>{chapter.emoji}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:secColor,
                    background:`${secColor}18`, padding:'3px 10px', borderRadius:8, fontWeight:700 }}>
                    {TITRES_NAV[slug]?.split(' — ')[0]}
                  </span>
                  <span style={{ fontSize:11, padding:'2px 10px', borderRadius:20,
                    background:`${secColor}14`, color:secColor, fontWeight:700 }}>{chapter.tag}</span>
                  <span style={{ fontSize:11, background:'rgba(236,72,153,0.15)',
                    color:'#f472b6', padding:'2px 9px', borderRadius:10 }}>
                    🏥 ST2S · Physique-Chimie pour la Santé
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' en Physique-Chimie ST2S France')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/simulation-france"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📋 Simulation Bac ST2S
                  </Link>
                </div>
              </div>

              {/* SOUS-CHAPITRES */}
              {chapter.souschapitres.map((sc, scIdx) => (
                <div key={sc.id} style={{ marginBottom:24, background:`${secColor}05`,
                  border:`1px solid ${secColor}20`, borderRadius:18, overflow:'hidden' }}>
                  <button onClick={() => setOpenSc(openSc===sc.id ? null : sc.id)}
                    style={{ width:'100%', background:`${secColor}12`, borderBottom:`1px solid ${secColor}20`,
                      padding:'16px 22px', display:'flex', justifyContent:'space-between', alignItems:'center',
                      cursor:'pointer', border:'none', textAlign:'left' }}>
                    <div>
                      <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6 }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:secColor, fontWeight:700 }}>
                          {String(scIdx+1).padStart(2,'0')}
                        </span>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>{sc.titre}</h2>
                      </div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                        {sc.notions.map(n => (
                          <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:12,
                            background:`${secColor}12`, color:'var(--text2)', border:`1px solid ${secColor}18` }}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize:18, color:secColor, marginLeft:12 }}>
                      {(openSc===sc.id || scIdx===0) ? '▲' : '▼'}
                    </span>
                  </button>

                  {(openSc===sc.id || scIdx===0) && (
                    <div style={{ padding:'18px 22px', display:'flex', flexDirection:'column', gap:24 }}>
                      {sc.blocs.map(bloc => (
                        <div key={bloc.notion}>
                          <div style={{ fontSize:14, fontWeight:800, color:secColor, marginBottom:14 }}>{bloc.notion}</div>
                          <div style={{ display:'flex', flexDirection:'column', gap:11, marginBottom:14 }}>
                            {bloc.theoremes.map(t => {
                              const color = C[t.type as keyof typeof C] || C.def
                              return (
                                <div key={t.id} style={{ borderLeft:`3px solid ${color}`, background:`${color}07`,
                                  borderRadius:'0 12px 12px 0', padding:'14px 18px', border:`1px solid ${color}18` }}>
                                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start',
                                    marginBottom:8, gap:10, flexWrap:'wrap' }}>
                                    <div style={{ fontWeight:700, fontSize:13 }}>{t.nom}</div>
                                    <TypeBadge type={t.type} />
                                  </div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.85, whiteSpace:'pre-line',
                                    fontFamily:t.type==='formule'?'var(--font-mono)':'inherit' }}>
                                    {t.enonce}
                                  </div>
                                  {t.remarque && (
                                    <div style={{ marginTop:10, paddingLeft:12,
                                      borderLeft:'2px solid rgba(245,158,11,0.5)',
                                      fontSize:11, color:'rgba(245,158,11,0.9)', fontStyle:'italic', lineHeight:1.6 }}>
                                      ⚡ {t.remarque}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                          {bloc.exercices.length > 0 && (
                            <div>
                              <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                                textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Exercices</div>
                              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                {bloc.exercices.map(ex => (
                                  <div key={ex.id} style={{ background:'var(--surface)',
                                    border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                                    <div style={{ padding:'12px 16px' }}>
                                      <div style={{ display:'flex', gap:7, alignItems:'center', marginBottom:7, flexWrap:'wrap' }}>
                                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)',
                                          background:'var(--surface2)', padding:'2px 7px', borderRadius:5 }}>{ex.id}</span>
                                        <NiveauBadge niveau={ex.niveau} />
                                        <span style={{ fontWeight:600, fontSize:13 }}>{ex.titre}</span>
                                      </div>
                                      <p style={{ fontSize:12, color:'var(--text2)', margin:0,
                                        lineHeight:1.65, whiteSpace:'pre-line' }}>{ex.enonce}</p>
                                    </div>
                                    <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px',
                                      display:'flex', gap:8, flexWrap:'wrap' }}>
                                      <Link href={`/solve?q=${encodeURIComponent('ST2S Physique-Chimie pour la Santé — '+ex.enonce)}`}
                                        className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                        🧮 Résoudre avec IA
                                      </Link>
                                      <button onClick={() => setOpenEx(openEx===ex.id?null:ex.id)}
                                        style={{ fontSize:11, padding:'5px 12px', borderRadius:7,
                                          border:'1px solid var(--border)', background:'transparent',
                                          color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
                                        📋 {openEx===ex.id?'Masquer':'Correction'}
                                      </button>
                                    </div>
                                    {openEx===ex.id && (
                                      <div style={{ padding:'10px 16px', borderTop:'1px solid var(--border)',
                                        background:`${secColor}06` }}>
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
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* NAV PREV / NEXT */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12,
                borderTop:'1px solid var(--border)', paddingTop:22, marginTop:8 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/physique/st2s/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/st2s/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[nextSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* SIDEBAR */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#f472b6', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(236,72,153,0.08)' }}>
                  🏥 ST2S · 5 chapitres médicaux
                </div>
                {NAV_ORDER.map(s => (
                  <Link key={s} href={`/bac-france/physique/st2s/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'10px 15px', borderBottom:'1px solid var(--border)',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>
                        {TITRES_NAV[s].split(' — ')[0]}
                      </div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400,
                        color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>
                        {TITRES_NAV[s].replace(/CH \d+ — /,'').slice(0,28)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' en ST2S Physique pour la Santé')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.tag}
                  </Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac-france/physique" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📚 Autres voies PC</Link>
                  <Link href="/bac-france/physique/st2s" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer/>
      <style>{`
        @media(max-width:900px){
          div[style*="grid-template-columns: 1fr 270px"]{grid-template-columns:1fr!important;}
          aside{display:none;}
        }
      `}</style>
    </>
  )
}