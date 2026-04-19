'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TERMINALE / [SLUG]
// Route : /bac-france/physique/terminale/[slug]
// Programme officiel Terminale Spécialité PC · Bac 2027
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'mesures-incertitudes',
  'cinetique-chimique','equilibres-chimiques','dosages-titrages','radioactivite',
  'deuxieme-loi-newton','satellites-planetes','fluides',
  'gaz-parfait','premier-principe','enthalpie','bilan-radiatif',
  'diffraction-interferences','effet-doppler','circuit-rlc','circuit-rc',
]

const TITRES: Record<string,string> = {
  'mesures-incertitudes':      'Mesures & Incertitudes',
  'cinetique-chimique':        'Cinétique chimique',
  'equilibres-chimiques':      'Équilibres chimiques',
  'dosages-titrages':          'Dosages & Titrages',
  'radioactivite':             'Radioactivité',
  'deuxieme-loi-newton':       '2ème loi de Newton',
  'satellites-planetes':       'Satellites & Planètes',
  'fluides':                   'Écoulement des fluides',
  'gaz-parfait':               'Gaz parfait & Thermodynamique',
  'premier-principe':          '1er principe de la thermodynamique',
  'enthalpie':                 'Énergie chimique & Enthalpie',
  'bilan-radiatif':            'Bilan radiatif terrestre',
  'diffraction-interferences': 'Diffraction & Interférences',
  'effet-doppler':             'Effet Doppler',
  'circuit-rlc':               'Circuit RLC — Résonance',
  'circuit-rc':                'Circuit RC',
}

const SEC_COLOR: Record<string,string> = {
  'mesures-incertitudes':'#6b7280',
  'cinetique-chimique':'#10b981','equilibres-chimiques':'#10b981','dosages-titrages':'#10b981','radioactivite':'#ef4444',
  'deuxieme-loi-newton':'#4f6ef7','satellites-planetes':'#4f6ef7','fluides':'#4f6ef7',
  'gaz-parfait':'#f59e0b','premier-principe':'#f59e0b','enthalpie':'#f59e0b','bilan-radiatif':'#f59e0b',
  'diffraction-interferences':'#8b5cf6','effet-doppler':'#8b5cf6','circuit-rlc':'#8b5cf6','circuit-rc':'#8b5cf6',
}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string;
  theoremes:{id:string; type:string; nom:string; enonce:string}[];
  exercices:{id:string; niveau:string; titre:string; enonce:string; correction:string}[];
}> = {

  'mesures-incertitudes': {
    ch:'CH 00', titre:'Mesures & Incertitudes', badge:'Transversal', duree:'~3h', section:'Chapitre transversal',
    desc:'Variabilité des mesures, incertitudes-types A et B, incertitude composée, écriture du résultat avec chiffres significatifs.',
    theoremes:[
      {id:'D1',type:'def',nom:'Variabilité de la mesure',enonce:'Toute mesure physique est entachée d\'une incertitude. On répète la mesure n fois pour estimer la valeur vraie.\n\nMoyenne : x̄ = (1/n) Σxᵢ\nÉcart-type expérimental : s = √[Σ(xᵢ−x̄)²/(n−1)]'},
      {id:'F1',type:'formule',nom:'Incertitudes-types',enonce:'Évaluation de type A (statistique) :\nu_A = s/√n\n\nÉvaluation de type B (instrumentale) :\nu_B = demi-largeur de l\'intervalle / √3  (distribution rectangulaire)\n\nIncertitude composée :\nu_c = √(u_A² + u_B²)\n\nIncertitude élargie (k=2, niveau de confiance 95%) :\nU = 2·u_c'},
      {id:'P1',type:'prop',nom:'Écriture du résultat',enonce:'Le résultat s\'écrit : x = x̄ ± U  (unité)\n\nRègles :\n• U s\'arrondit à 1 ou 2 chiffres significatifs\n• x̄ est arrondi au même rang décimal que U\n\nCritère de compatibilité :\n|x_exp − x_ref| ≤ 2·u_c → résultat compatible avec la référence'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul d\'incertitude',enonce:'On mesure 5 fois la période d\'un pendule : 1,24 ; 1,26 ; 1,23 ; 1,25 ; 1,22 s. Calculer x̄, s, u_A et U.',correction:'x̄ = (1,24+1,26+1,23+1,25+1,22)/5 = 6,20/5 = 1,240 s\ns = √[Σ(xᵢ−1,24)²/4] ≈ 0,016 s\nu_A = s/√5 = 0,016/2,24 ≈ 0,007 s\nU = 2×0,007 = 0,014 s\nRésultat : T = 1,240 ± 0,014 s'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Compatibilité d\'un résultat',enonce:'g_mesuré = 9,78 m/s², u_c = 0,05 m/s². La référence est g_ref = 9,81 m/s². Le résultat est-il compatible ?',correction:'|g_mesuré − g_ref| = |9,78 − 9,81| = 0,03 m/s²\n2·u_c = 2×0,05 = 0,10 m/s²\n0,03 ≤ 0,10 → Le résultat est COMPATIBLE avec la valeur de référence.'},
    ],
  },

  'radioactivite': {
    ch:'CH 05', titre:'Radioactivité', badge:'Noyau & Radioactivité', duree:'~6h', section:'Section 1 — Chimie',
    desc:'Stabilité des noyaux, radioactivité α β γ, lois de conservation, loi de décroissance, temps de demi-vie, datation et applications médicales.',
    theoremes:[
      {id:'D1',type:'def',nom:'Stabilité des noyaux',enonce:'Un noyau est caractérisé par Z (protons) et N (neutrons), avec A = Z + N.\n\nDiagramme (N,Z) : les noyaux stables forment la "vallée de stabilité".\n• Si N/Z trop grand → radioactivité β⁻\n• Si N/Z trop petit → radioactivité β⁺ ou capture électronique\n• Si A trop grand → radioactivité α'},
      {id:'D2',type:'def',nom:'Types de radioactivité',enonce:'Radioactivité α : émission ⁴₂He\n→ ᴬ_Z X → ᴬ⁻⁴_(Z-2) Y + ⁴₂He\n\nRadioactivité β⁻ : émission électron e⁻ + antineutrino ν̄\n→ ᴬ_Z X → ᴬ_(Z+1) Y + ⁰₋₁e + ν̄\n\nRadioactivité β⁺ : émission positron e⁺ + neutrino ν\n→ ᴬ_Z X → ᴬ_(Z-1) Y + ⁰₊₁e + ν\n\nRayonnement γ : photon γ haute énergie (Z et A inchangés)\n\nLois de conservation : conservation de A, de Z, de l\'énergie-masse'},
      {id:'F1',type:'formule',nom:'Loi de décroissance radioactive',enonce:'N(t) = N₀ · e^(−λt)\n\nA(t) = A₀ · e^(−λt)  [A = activité en Becquerel (Bq)]\n\nPériode radioactive (demi-vie) :\nt₁/₂ = ln2/λ ≈ 0,693/λ\n\nConstante radioactive :\nλ = ln2/t₁/₂\n\nRelation N et A : A = λN'},
      {id:'M1',type:'methode',nom:'Datation au carbone 14',enonce:'Principe : le ¹⁴C se désintègre avec t₁/₂ = 5730 ans.\n\nMéthode :\n1. Mesurer l\'activité A de l\'échantillon\n2. Connaître A₀ (activité d\'un organisme vivant)\n3. Calculer : A/A₀ = e^(−λt)\n4. Prendre ln : t = −(1/λ)·ln(A/A₀) = t₁/₂ · log₂(A₀/A)\n\nLimite : valable pour des âges de 500 à 50 000 ans.'},
      {id:'G1',type:'graphique',titre:'Courbe de décroissance radioactive N(t) = N₀·e^(−λt)',legende:'En bleu : N(t). La demi-vie t₁/₂ correspond à N = N₀/2',
       svg:`<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#aaa"/></marker></defs>
  <!-- Axes -->
  <line x1="50" y1="180" x2="470" y2="180" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#arr)"/>
  <line x1="50" y1="180" x2="50" y2="20" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#arr)"/>
  <!-- Labels axes -->
  <text x="475" y="184" fill="#aaa" fontSize="13">t</text>
  <text x="36" y="18" fill="#aaa" fontSize="13">N</text>
  <text x="52" y="195" fill="#aaa" fontSize="11">0</text>
  <!-- N0 -->
  <text x="18" y="42" fill="#ef4444" fontSize="11">N₀</text>
  <line x1="45" y1="38" x2="55" y2="38" stroke="#ef4444" strokeWidth="1" strokeDasharray="3"/>
  <!-- N0/2 -->
  <text x="10" y="95" fill="#f59e0b" fontSize="11">N₀/2</text>
  <line x1="45" y1="91" x2="55" y2="91" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3"/>
  <!-- t1/2 -->
  <text x="148" y="197" fill="#f59e0b" fontSize="11">t₁/₂</text>
  <line x1="160" y1="175" x2="160" y2="185" stroke="#f59e0b" strokeWidth="1"/>
  <line x1="50" y1="91" x2="160" y2="91" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4"/>
  <line x1="160" y1="91" x2="160" y2="180" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4"/>
  <!-- 2t1/2 -->
  <text x="258" y="197" fill="#8b5cf6" fontSize="11">2t₁/₂</text>
  <line x1="270" y1="175" x2="270" y2="185" stroke="#8b5cf6" strokeWidth="1"/>
  <line x1="50" y1="120" x2="270" y2="120" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3"/>
  <text x="10" y="124" fill="#8b5cf6" fontSize="11">N₀/4</text>
  <!-- Courbe exponentielle -->
  <path d="M50,38 C80,50 120,72 160,91 C200,110 240,118 270,120 C310,124 360,132 400,148 C430,159 455,166 470,172" fill="none" stroke="#ef4444" strokeWidth="2.5"/>
  <!-- Formule -->
  <text x="300" y="70" fill="#ef4444" fontSize="13" fontWeight="bold">N(t) = N₀·e^(−λt)</text>
</svg>`},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Activité après n demi-vies',enonce:'A₀ = 6400 Bq, t₁/₂ = 2 h. Calculer A après 8 h.',correction:'8 h = 4 × t₁/₂\nA = A₀/2⁴ = 6400/16 = 400 Bq\nVérification : A = 6400 × e^(−λ×8) avec λ = ln2/2 ≈ 0,347 h⁻¹\nA = 6400 × e^(−2,77) ≈ 400 Bq ✓'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Équation de désintégration',enonce:'Le Polonium 210 se désintègre par radioactivité α. Écrire l\'équation. t₁/₂ = 138 j. Calculer λ. Fraction restante après 414 j.',correction:'Équation : ²¹⁰₈₄Po → ²⁰⁶₈₂Pb + ⁴₂He\nλ = ln2/138 ≈ 5,02×10⁻³ j⁻¹\n414 j = 3 × t₁/₂\nN/N₀ = 1/2³ = 1/8 = 12,5%'},
      {id:'EX03',niveau:'Intermédiaire',titre:'Datation',enonce:'Un échantillon a une activité A = A₀/4. t₁/₂(¹⁴C) = 5730 ans. Quel est son âge ?',correction:'A/A₀ = 1/4 = (1/2)² → 2 demi-vies\nÂge = 2 × 5730 = 11 460 ans'},
    ],
  },

  'deuxieme-loi-newton': {
    ch:'CH 06', titre:'2ème loi de Newton', badge:'Mécanique', duree:'~7h', section:'Section 2 — Mécanique',
    desc:'Relation ΣF=ma, mouvements dans un champ uniforme (pesanteur, électrique), trajectoire parabolique, satellites et 3ème loi de Kepler.',
    theoremes:[
      {id:'T1',type:'thm',nom:'Deuxième loi de Newton',enonce:'Dans un référentiel galiléen :\nΣF⃗_ext = m·a⃗\n\nProjections sur les axes :\nΣFₓ = m·aₓ\nΣFᵧ = m·aᵧ\n\n1ère loi : si ΣF⃗ = 0⃗ → a⃗ = 0⃗ (MRU ou repos)\n3ème loi : F⃗(A→B) = −F⃗(B→A) (action-réaction)'},
      {id:'M1',type:'methode',nom:'Mouvement dans un champ uniforme',enonce:'Champ de pesanteur (sans frottements) :\nSeul le poids agit : P⃗ = mg⃗\n\nÉquations du mouvement :\nSuivant x : aₓ = 0 → vₓ = v₀cosα → x = v₀cosα·t\nSuivant y : aᵧ = −g → vᵧ = v₀sinα−gt → y = v₀sinα·t − ½gt²\n\nTrajectoire parabolique : y = x·tanα − gx²/(2v₀²cos²α)\n\nPortée : R = v₀²sin(2α)/g  (maximale pour α = 45°)\nHauteur max : H = v₀²sin²α/(2g)'},
      {id:'F1',type:'formule',nom:'Satellites et loi de Kepler',enonce:'Gravitation universelle : F = GMm/r²\nG = 6,67×10⁻¹¹ N·m²·kg⁻²\n\nSatellite en orbite circulaire :\nGMm/r² = mv²/r\n→ v = √(GM/r)\n→ T = 2πr/v = 2π√(r³/GM)\n\n3ème loi de Kepler : T²/r³ = 4π²/(GM) = constante\n\nSatellite géostationnaire : T = 24h, orbite équatoriale'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Chute libre',enonce:'Un objet est lâché sans vitesse initiale de h = 80 m. Calculer la durée de chute et la vitesse à l\'impact. (g = 10 m/s²)',correction:'y = h − ½gt² → t_chute = √(2h/g) = √(2×80/10) = √16 = 4 s\nv = g·t = 10×4 = 40 m/s'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Projectile',enonce:'v₀ = 20 m/s, α = 30°, g = 9,8 m/s². Calculer H et R.',correction:'H = v₀²sin²α/(2g) = 400×(0,5)²/(2×9,8) = 100/19,6 ≈ 5,1 m\nR = v₀²sin(2α)/g = 400×sin60°/9,8 = 400×0,866/9,8 ≈ 35,4 m'},
      {id:'EX03',niveau:'Difficile',titre:'Satellite géostationnaire',enonce:'M_Terre = 5,97×10²⁴ kg, G = 6,67×10⁻¹¹. Calculer r et v du satellite géostationnaire (T = 86400 s).',correction:'r³ = GMT²/(4π²) = 6,67×10⁻¹¹×5,97×10²⁴×(86400)²/(4π²)\nr³ = 7,54×10²² → r ≈ 4,22×10⁷ m ≈ 42 200 km\nv = 2πr/T = 2π×4,22×10⁷/86400 ≈ 3068 m/s ≈ 3,1 km/s'},
    ],
  },

  'gaz-parfait': {
    ch:'CH 09', titre:'Gaz parfait & Thermodynamique', badge:'Thermodynamique', duree:'~5h', section:'Section 3 — Énergie',
    desc:'Modèle du gaz parfait, équation d\'état PV=nRT, transformations isochore/isobare/isotherme, énergie interne, 1er principe.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Équation d\'état du gaz parfait',enonce:'PV = nRT\n\nAvec :\n• P = pression en Pascal (Pa)\n• V = volume en m³\n• n = quantité de matière en mol\n• R = 8,314 J·mol⁻¹·K⁻¹\n• T = température en Kelvin (T = θ°C + 273,15)\n\nRelation entre états 1 et 2 :\nP₁V₁/T₁ = P₂V₂/T₂ = nR = cte\n\nMasse volumique : ρ = PM/(RT)  (M = masse molaire)'},
      {id:'D1',type:'def',nom:'Transformations particulières',enonce:'Isotherme (T = cte) : PV = cte → P₁V₁ = P₂V₂ (loi de Boyle-Mariotte)\n\nIsobare (P = cte) : V/T = cte → V₁/T₁ = V₂/T₂ (loi de Charles)\n\nIsochore (V = cte) : P/T = cte → P₁/T₁ = P₂/T₂ (loi de Gay-Lussac)\n\nAdiabatique : pas d\'échange thermique (Q = 0)'},
      {id:'F2',type:'formule',nom:'1er principe de la thermodynamique',enonce:'ΔU = W + Q  (convention récepteur)\n\nAvec :\n• ΔU = variation d\'énergie interne (J)\n• W = travail reçu par le système (W < 0 si le gaz se détend)\n• Q = chaleur reçue par le système\n\nPour un gaz parfait : ΔU ne dépend que de T\nSolide/liquide incompressible : ΔU = m·c·ΔT\n\nCapacité thermique massique : Q = m·c·ΔT'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Loi des gaz parfaits',enonce:'n = 0,5 mol de gaz à T = 300 K, V = 10 L. Calculer P. Puis P si V → 5 L (isotherme).',correction:'P = nRT/V = 0,5×8,314×300/(10×10⁻³) = 1247/0,01 = 124 700 Pa ≈ 1,25 bar\nIsotherme : P₂ = P₁V₁/V₂ = 1,25×10/5 = 2,50 bar'},
      {id:'EX02',niveau:'Intermédiaire',titre:'1er principe',enonce:'On chauffe 200 g d\'eau de 20°C à 80°C. c = 4180 J·kg⁻¹·K⁻¹. Calculer Q. Travail si transformation isochore ?',correction:'Q = m·c·ΔT = 0,2×4180×60 = 50 160 J ≈ 50,2 kJ\nIsochore (V = cte) → W = 0\nΔU = Q = 50,2 kJ'},
    ],
  },

  'diffraction-interferences': {
    ch:'CH 13', titre:'Diffraction & Interférences', badge:'Optique ondulatoire', duree:'~7h', section:'Section 4 — Ondes & Signaux',
    desc:'Diffraction par une fente ou un obstacle, condition de diffraction, interférences lumineuses (fentes de Young), différence de marche, interfrange.',
    theoremes:[
      {id:'D1',type:'def',nom:'Diffraction',enonce:'Phénomène d\'étalement d\'une onde lors du passage par une ouverture (fente de largeur a) ou un obstacle.\n\nCondition de diffraction : λ ≈ a\n(la diffraction est notable quand la longueur d\'onde est de l\'ordre de la taille de l\'obstacle)\n\nAngle de diffraction : θ ≈ λ/a  (en radians, si θ petit)\n\nLargeur de la tache centrale : L = 2λD/a\n(D = distance fente-écran)'},
      {id:'F1',type:'formule',nom:'Interférences — Fentes de Young',enonce:'Deux fentes S₁ et S₂ (écart a) éclairées de façon cohérente :\n\nDifférence de marche : δ = S₁M − S₂M ≈ a·x/D\n(x = position sur l\'écran, D = distance fentes-écran)\n\nFranges brillantes : δ = k·λ  (k ∈ ℤ)\nFranges sombres : δ = (k+½)·λ\n\nInterfrange :\ni = λD/a\n\nLongueur d\'onde dans un milieu d\'indice n : λ_n = λ/n'},
      {id:'P1',type:'prop',nom:'Propriétés des interférences',enonce:'Conditions d\'obtention : ondes cohérentes (même longueur d\'onde, phase relative constante)\n\nLumière blanche → frange centrale blanche, puis irisations colorées\n\nSi on augmente a → interfrange i diminue (franges plus serrées)\nSi on augmente D → interfrange i augmente (franges plus espacées)\nSi on augmente λ → interfrange i augmente'},
    ],
    theoremes:[
      {id:'G1',type:'graphique',titre:'Fentes de Young — Interfrange i = λD/a',legende:'Franges brillantes (jaune) séparées de i. La frange centrale est la plus brillante.',
       svg:`<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <!-- Source lumineuse -->
  <circle cx="40" cy="100" r="10" fill="#fbbf24" opacity="0.8"/>
  <text x="20" y="125" fill="#fbbf24" fontSize="10">Source</text>
  <!-- Fentes -->
  <rect x="140" y="20" width="6" height="35" fill="#6b7280"/>
  <rect x="140" y="145" width="6" height="35" fill="#6b7280"/>
  <text x="120" y="100" fill="#6b7280" fontSize="10" textAnchor="middle">Fentes</text>
  <text x="120" y="112" fill="#6b7280" fontSize="10" textAnchor="middle">S₁,S₂</text>
  <text x="120" y="124" fill="#4f6ef7" fontSize="9" textAnchor="middle">écart a</text>
  <!-- Rayons -->
  <line x1="50" y1="100" x2="143" y2="60" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>
  <line x1="50" y1="100" x2="143" y2="158" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>
  <!-- Écran -->
  <rect x="380" y="10" width="6" height="180" fill="#374151"/>
  <text x="395" y="105" fill="#6b7280" fontSize="10">Écran</text>
  <!-- Franges brillantes -->
  <rect x="386" y="40" width="4" height="8" fill="#fbbf24" opacity="0.9"/>
  <rect x="386" y="63" width="4" height="8" fill="#fbbf24" opacity="0.7"/>
  <rect x="386" y="86" width="4" height="10" fill="#fbbf24"/>
  <rect x="386" y="108" width="4" height="8" fill="#fbbf24" opacity="0.7"/>
  <rect x="386" y="131" width="4" height="8" fill="#fbbf24" opacity="0.9"/>
  <!-- Interfrange -->
  <line x1="394" y1="91" x2="394" y2="113" stroke="#10b981" strokeWidth="1.5"/>
  <line x1="390" y1="91" x2="398" y2="91" stroke="#10b981" strokeWidth="1.5"/>
  <line x1="390" y1="113" x2="398" y2="113" stroke="#10b981" strokeWidth="1.5"/>
  <text x="400" y="105" fill="#10b981" fontSize="11" fontWeight="bold">i = λD/a</text>
  <!-- D -->
  <line x1="146" y1="190" x2="380" y2="190" stroke="#4f6ef7" strokeWidth="1"/>
  <text x="255" y="200" fill="#4f6ef7" fontSize="10" textAnchor="middle">D</text>
</svg>`},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Interfrange',enonce:'Fentes de Young : a = 0,2 mm, D = 1,5 m, λ = 589 nm. Calculer i.',correction:'i = λD/a = 589×10⁻⁹ × 1,5 / (0,2×10⁻³)\ni = 8,835×10⁻⁷/2×10⁻⁴ = 4,42×10⁻³ m = 4,42 mm'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Différence de marche',enonce:'a = 1 mm, D = 2 m, λ = 600 nm. Pour x = 3 mm, calculer δ. L\'interférence est-elle constructive ou destructive ?',correction:'δ = ax/D = 10⁻³×3×10⁻³/2 = 1,5×10⁻⁶ m = 1500 nm\nδ/λ = 1500/600 = 2,5 → δ = 2,5λ = (2+½)λ → DESTRUCTIVE (frange sombre)'},
    ],
  },

  'circuit-rc': {
    ch:'CH 16', titre:'Circuit RC', badge:'Électronique', duree:'~4h', section:'Section 4 — Ondes & Signaux',
    desc:'Charge et décharge d\'un condensateur à travers une résistance, constante de temps τ=RC, équation différentielle du 1er ordre, capteurs capacitifs.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Constante de temps et équations',enonce:'Constante de temps : τ = RC  (en secondes, si R en Ω et C en Farads)\n\nCharge du condensateur (E = tension source) :\nu_C(t) = E·(1 − e^(−t/τ))\ni(t) = (E/R)·e^(−t/τ)\n\nDécharge du condensateur (tension initiale U₀) :\nu_C(t) = U₀·e^(−t/τ)\ni(t) = −(U₀/R)·e^(−t/τ)\n\nÀ t = τ : u_C = E·(1−e⁻¹) ≈ 0,63E (charge) ou u_C = U₀·e⁻¹ ≈ 0,37U₀ (décharge)\nPresque complètement chargé/déchargé à t = 5τ'},
      {id:'D1',type:'def',nom:'Équation différentielle',enonce:'Lors de la charge : RC·(du_C/dt) + u_C = E\n\nC\'est une équation différentielle du 1er ordre à coefficients constants.\n\nSolution générale : u_C(t) = E + K·e^(−t/τ)\nCondition initiale u_C(0) = 0 → K = −E\n→ u_C(t) = E·(1−e^(−t/τ))\n\nVérification : à t=0, u_C=0 ✓ ; à t→∞, u_C=E ✓'},
      {id:'P1',type:'prop',nom:'Énergie stockée dans le condensateur',enonce:'Énergie emmagasinée : E_C = ½·C·u_C²\n\nÀ pleine charge : E_C = ½·C·E²\n\nCapteurs capacitifs :\n• Capteur de pression : déformation modifie la distance entre armatures → C change\n• Capteur d\'humidité : humidité modifie le diélectrique → C change'},
    ],
    theoremes:[
      {id:'G1',type:'graphique',titre:'Charge et décharge du condensateur u_C(t)',legende:'Charge (bleu) : u_C = E(1−e^(−t/τ)). Décharge (orange) : u_C = U₀·e^(−t/τ). À t=τ : 63% ou 37%',
       svg:`<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs><marker id="arr4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#aaa"/></marker></defs>
  <line x1="50" y1="180" x2="470" y2="180" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#arr4)"/>
  <line x1="50" y1="180" x2="50" y2="20" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#arr4)"/>
  <text x="475" y="184" fill="#aaa" fontSize="13">t</text>
  <text x="28" y="18" fill="#aaa" fontSize="11">u_C</text>
  <!-- E (tension source) -->
  <text x="10" y="38" fill="#aaa" fontSize="11">E</text>
  <line x1="45" y1="34" x2="55" y2="34" stroke="#aaa" strokeWidth="1" strokeDasharray="3"/>
  <line x1="50" y1="34" x2="470" y2="34" stroke="#aaa" strokeWidth="0.8" strokeDasharray="4" opacity="0.4"/>
  <!-- τ -->
  <text x="145" y="197" fill="#06b6d4" fontSize="12">τ</text>
  <line x1="155" y1="175" x2="155" y2="185" stroke="#06b6d4" strokeWidth="1"/>
  <!-- 63% -->
  <text x="8" y="79" fill="#06b6d4" fontSize="10">0,63E</text>
  <line x1="50" y1="75" x2="155" y2="75" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4"/>
  <line x1="155" y1="75" x2="155" y2="180" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4"/>
  <!-- Courbe CHARGE -->
  <path d="M50,180 C75,155 110,95 155,75 C200,57 280,40 350,36 C400,34 440,34 465,34" fill="none" stroke="#06b6d4" strokeWidth="2.5"/>
  <text x="380" y="30" fill="#06b6d4" fontSize="12">Charge</text>
  <!-- Courbe DÉCHARGE -->
  <path d="M50,34 C75,55 110,115 155,138 C200,157 280,170 350,176 C400,178 440,179 465,180" fill="none" stroke="#f59e0b" strokeWidth="2.5"/>
  <text x="380" y="165" fill="#f59e0b" fontSize="12">Décharge</text>
  <!-- 37% -->
  <text x="8" y="142" fill="#f59e0b" fontSize="10">0,37E</text>
  <line x1="50" y1="138" x2="155" y2="138" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4"/>
  <!-- 5τ -->
  <text x="318" y="197" fill="#aaa" fontSize="11">5τ</text>
  <line x1="330" y1="175" x2="330" y2="185" stroke="#aaa" strokeWidth="1"/>
</svg>`},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Constante de temps',enonce:'R = 10 kΩ, C = 100 μF. Calculer τ. À quel instant u_C = 9 V si E = 12 V ?',correction:'τ = RC = 10×10³ × 100×10⁻⁶ = 1 s\nu_C = E(1−e^(−t/τ)) → 9 = 12(1−e^(−t))\ne^(−t) = 1−9/12 = 0,25\n−t = ln(0,25) = −1,386\nt ≈ 1,39 s ≈ 1,4τ'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Décharge',enonce:'Un condensateur C = 50 μF chargé à U₀ = 20 V se décharge dans R = 2 kΩ. Calculer τ. Quand u_C = 5 V ?',correction:'τ = RC = 2×10³×50×10⁻⁶ = 0,1 s\nu_C = U₀·e^(−t/τ) → 5 = 20·e^(−t/0,1)\ne^(−10t) = 0,25 → −10t = ln(0,25) ≈ −1,386\nt ≈ 0,139 s'},
    ],
  },

  'cinetique-chimique': {
    ch:'CH 02', titre:'Cinétique chimique', badge:'Chimie', duree:'~5h', section:'Section 1 — Constitution & Transformations',
    desc:'La cinétique chimique étudie la vitesse d\'évolution des réactions. Elle permet de comprendre comment et pourquoi une réaction est rapide ou lente.',
    theoremes:[
      {id:'D1',type:'def',nom:'Vitesse de réaction',enonce:'Vitesse volumique de réaction :\nv = (1/ν_X)·|d[X]/dt|\n\nν_X = coefficient stœchiométrique de l\'espèce X\n[X] = concentration de X en mol/L\nt = temps en secondes\n\nv > 0 toujours (valeur absolue)'},
      {id:'D2',type:'def',nom:'Facteurs cinétiques',enonce:'Concentration : augmenter [réactifs] → augmente la vitesse\n\nTempérature : augmenter T → augmente v (règle de Van\'t Hoff : ×2 tous les 10°C)\n\nCatalyseur : abaisse l\'énergie d\'activation → accélère la réaction sans être consommé\n• Catalyse homogène : même phase que les réactifs\n• Catalyse hétérogène : phase différente\n• Catalyse enzymatique : enzyme biologique\n\nSurface de contact : solide finement divisé → réaction plus rapide'},
      {id:'F1',type:'formule',nom:'Temps de demi-réaction',enonce:'t₁/₂ : durée pour que la concentration d\'un réactif diminue de moitié.\n\nA t₁/₂ : [A] = [A]₀/2\n\nLecture graphique : sur la courbe [A] = f(t), tracer [A]₀/2 et lire t₁/₂\n\nReaction d\'ordre 1 : t₁/₂ = ln2/k = 0,693/k  (k = constante de vitesse)\nReaction d\'ordre 0 : t₁/₂ = [A]₀/(2k)'},
      {id:'M1',type:'methode',nom:'Lecture d\'une courbe cinétique',enonce:'Sur une courbe [réactif](t) :\n1. La tangente à l\'origine donne la vitesse initiale v₀\n2. La pente diminue → la réaction ralentit\n3. La courbe devient horizontale → équilibre atteint\n\nSur une courbe [produit](t) :\n1. Croissante puis plateau\n2. La valeur plateau → avancement maximal x_max'},
    ],
    theoremes:[
      {id:'G1',type:'graphique',titre:'Évolution de [réactif] et [produit] en fonction du temps',legende:'[A] décroît, [P] croît jusqu\'au plateau (avancement maximal)',
       svg:`<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#aaa"/></marker></defs>
  <line x1="50" y1="180" x2="470" y2="180" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#arr2)"/>
  <line x1="50" y1="180" x2="50" y2="20" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#arr2)"/>
  <text x="475" y="184" fill="#aaa" fontSize="13">t</text>
  <text x="28" y="18" fill="#aaa" fontSize="11">[X]</text>
  <!-- [A]0 -->
  <text x="10" y="38" fill="#10b981" fontSize="11">[A]₀</text>
  <line x1="45" y1="34" x2="55" y2="34" stroke="#10b981" strokeWidth="1" strokeDasharray="3"/>
  <!-- t1/2 -->
  <text x="158" y="197" fill="#aaa" fontSize="11">t₁/₂</text>
  <line x1="170" y1="175" x2="170" y2="185" stroke="#aaa" strokeWidth="1"/>
  <!-- Courbe [A] décroissante -->
  <path d="M50,34 C90,55 140,90 170,107 C210,128 280,148 340,158 C390,165 435,170 465,172" fill="none" stroke="#10b981" strokeWidth="2.5"/>
  <text x="380" y="168" fill="#10b981" fontSize="12">[A]</text>
  <!-- [A]0/2 -->
  <text x="10" y="111" fill="#10b981" fontSize="11">[A]₀/2</text>
  <line x1="50" y1="107" x2="170" y2="107" stroke="#10b981" strokeWidth="1" strokeDasharray="4"/>
  <line x1="170" y1="107" x2="170" y2="180" stroke="#10b981" strokeWidth="1" strokeDasharray="4"/>
  <!-- Courbe [P] croissante -->
  <path d="M50,172 C90,155 140,128 170,115 C210,100 280,72 340,58 C390,48 435,42 465,40" fill="none" stroke="#4f6ef7" strokeWidth="2.5"/>
  <text x="380" y="38" fill="#4f6ef7" fontSize="12">[P]</text>
  <!-- Tangente initiale [A] -->
  <line x1="50" y1="34" x2="120" y2="115" stroke="#10b981" strokeWidth="1" strokeDasharray="5" opacity="0.6"/>
  <text x="60" y="90" fill="#10b981" fontSize="10">pente = −v₀</text>
</svg>`},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Temps de demi-réaction',enonce:'La courbe de [H₂O₂] en fonction du temps montre que [H₂O₂]₀ = 0,80 mol/L et [H₂O₂] = 0,40 mol/L à t = 600 s. Déterminer t₁/₂.',correction:'t₁/₂ est le temps pour lequel [H₂O₂] = [H₂O₂]₀/2 = 0,40 mol/L\nD\'après les données : t₁/₂ = 600 s = 10 min'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Influence de la température',enonce:'Une réaction a une vitesse v = 2×10⁻³ mol·L⁻¹·s⁻¹ à 25°C. Estimer v à 45°C en appliquant la règle de Van\'t Hoff.',correction:'ΔT = 45−25 = 20°C = 2 × 10°C\nSelon Van\'t Hoff : v est multiplié par 2 tous les 10°C\nv(45°C) = v(25°C) × 2² = 2×10⁻³ × 4 = 8×10⁻³ mol·L⁻¹·s⁻¹'},
    ],
  },

  'equilibres-chimiques': {
    ch:'CH 03', titre:'Équilibres chimiques', badge:'Chimie', duree:'~6h', section:'Section 1 — Constitution & Transformations',
    desc:'Un équilibre chimique est un état dans lequel les vitesses de réaction directe et inverse sont égales. Le quotient de réaction Qr et la constante K permettent de prévoir l\'évolution.',
    theoremes:[
      {id:'D1',type:'def',nom:'Quotient de réaction Qr',enonce:'Pour la réaction : a A + b B ⇌ c C + d D\n\nQr = [C]^c · [D]^d / ([A]^a · [B]^b)\n\n• Les concentrations sont en mol/L\n• Les solides et solvants purs n\'apparaissent pas dans Qr\n• Qr varie au cours du temps\n\nÀ l\'équilibre : Qr = K (constante d\'équilibre)'},
      {id:'T1',type:'thm',nom:'Critère d\'évolution spontanée',enonce:'Comparaison Qr et K :\n\nQr < K → réaction évolue dans le sens direct (→)\n        (productions des produits favorisée)\n\nQr = K → système à l\'équilibre (pas d\'évolution nette)\n\nQr > K → réaction évolue dans le sens indirect (←)\n        (formation des réactifs favorisée)\n\nK dépend uniquement de la température.'},
      {id:'T2',type:'thm',nom:'Loi de Le Chatelier',enonce:'Tout système en équilibre réagit à une perturbation en s\'y opposant.\n\nConséquences :\n• Ajouter un réactif → équilibre se déplace vers les produits\n• Ajouter un produit → équilibre se déplace vers les réactifs\n• Augmenter T → favorise la réaction endothermique\n• Augmenter P (gaz) → favorise le sens qui diminue le nb de moles gazeuses'},
      {id:'M1',type:'methode',nom:'Calcul à l\'équilibre',enonce:'Méthode avec tableau ICE (Initial, Change, Equilibrium) :\n1. Écrire l\'équation équilibrée\n2. Tableau : n_i, variation (−x ou +x), n_éq\n3. Exprimer Qr en fonction de x\n4. Résoudre Qr = K pour trouver x_éq\n5. Calculer les concentrations à l\'équilibre'},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:'Critère d\'évolution',enonce:'N₂ + 3H₂ ⇌ 2NH₃  K = 977 à 25°C. État initial : [N₂]=1, [H₂]=1, [NH₃]=0,1 mol/L. Dans quel sens évolue le système ?',correction:'Qr = [NH₃]²/([N₂][H₂]³) = (0,1)²/(1×1³) = 0,01\nQr = 0,01 < K = 977 → Le système évolue dans le sens direct (→ vers NH₃)'},
      {id:'EX02',niveau:'Difficile',titre:'Calcul à l\'équilibre',enonce:'A ⇌ B, K = 4. [A]₀ = 1 mol/L, [B]₀ = 0. Calculer [A] et [B] à l\'équilibre.',correction:'Tableau ICE : [A] = 1−x, [B] = x\nQr = x/(1−x) = K = 4\nx = 4(1−x) = 4−4x → 5x = 4 → x = 0,8 mol/L\n[A]_éq = 1−0,8 = 0,2 mol/L\n[B]_éq = 0,8 mol/L\nVérif : Qr = 0,8/0,2 = 4 = K ✓'},
    ],
  },

  'dosages-titrages': {
    ch:'CH 04', titre:'Dosages & Titrages', badge:'Chimie analytique', duree:'~5h', section:'Section 1 — Constitution & Transformations',
    desc:'Le titrage est une méthode de dosage chimique permettant de déterminer la concentration d\'une espèce inconnue par réaction avec une espèce de concentration connue.',
    theoremes:[
      {id:'D1',type:'def',nom:'Principe d\'un titrage',enonce:'Titrage : on ajoute progressivement une solution titrante (concentration connue C_t) dans une solution titrée (concentration inconnue C_a).\n\nÉquivalence : point où les réactifs sont en proportions stœchiométriques\n→ Ni excès de titrant, ni excès de titré\n\nPour A + B → produits :\nn_A/ν_A = n_B/ν_B  →  C_a·V_a/ν_A = C_t·V_E/ν_B\n\nV_E = volume équivalent (lu sur la courbe)'},
      {id:'F1',type:'formule',nom:'Relation à l\'équivalence',enonce:'Cas général (A + B → produits, coefficients 1:1) :\nC_a·V_a = C_t·V_E\n→ C_a = C_t·V_E/V_a\n\nCas général (a A + b B → produits) :\nC_a·V_a/a = C_t·V_E/b\n→ C_a = (a·C_t·V_E)/(b·V_a)'},
      {id:'M1',type:'methode',nom:'Détection de l\'équivalence',enonce:'pH-métrie (titrage acide-base) :\n→ Point d\'inflexion de la courbe pH = f(V_ajouté)\n→ Saut de pH brusque à l\'équivalence\n\nConductimétrie :\n→ Changement de pente de σ = f(V_ajouté)\n→ Minimum (ou changement de signe de la pente)\n\nColorimétrie (indicateur coloré) :\n→ Changement de couleur à l\'équivalence\n→ Zone de virage de l\'indicateur doit englober le pH équivalent\n\nSpectrophotométrie :\n→ Absorbance minimale ou maximale à l\'équivalence'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Titrage acide-base',enonce:'On titre V_a = 20 mL de HCl par NaOH à C_t = 0,1 mol/L. L\'équivalence est à V_E = 15 mL. Calculer C_a.',correction:'C_a·V_a = C_t·V_E\nC_a = C_t·V_E/V_a = 0,1×15/20 = 0,075 mol/L'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Titrage rédox',enonce:'On titre 20 mL de Fe²⁺ par KMnO₄ à C = 0,02 mol/L. V_E = 10 mL. La réaction est : MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. Calculer [Fe²⁺].',correction:'n(MnO₄⁻) = C·V_E = 0,02×0,010 = 2×10⁻⁴ mol\nD\'après l\'équation : n(Fe²⁺) = 5×n(MnO₄⁻) = 5×2×10⁻⁴ = 10⁻³ mol\n[Fe²⁺] = n/V_a = 10⁻³/0,020 = 0,05 mol/L'},
    ],
  },

  'satellites-planetes': {
    ch:'CH 07', titre:'Satellites & Planètes', badge:'Mécanique céleste', duree:'~5h', section:'Section 2 — Mécanique',
    desc:'Les satellites et planètes obéissent aux lois de Newton et de Kepler. La gravitation universelle fournit la force centripète nécessaire au mouvement orbital.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Loi de gravitation universelle',enonce:'F = G·M·m/r²\n\nG = 6,67×10⁻¹¹ N·m²·kg⁻²\nM = masse du corps central\nm = masse du satellite\nr = distance centre à centre\n\nForce toujours attractive, dirigée vers le centre\n3ème loi de Newton : F sur satellite = −F sur planète'},
      {id:'T1',type:'thm',nom:'3 lois de Kepler',enonce:'1ère loi : Les planètes décrivent des ellipses dont le Soleil occupe un foyer.\n\n2ème loi (aires) : Le rayon vecteur Soleil-planète balaie des aires égales en des temps égaux.\n→ La planète va plus vite au périhélie (proche du Soleil)\n\n3ème loi (périodes) :\nT²/a³ = 4π²/(GM) = constante pour un système donné\n(a = demi-grand axe, T = période)'},
      {id:'F2',type:'formule',nom:'Satellite en orbite circulaire',enonce:'Équilibre gravitationnel-centripète :\nGMm/r² = mv²/r\n\nVitesse orbitale : v = √(GM/r)\n\nPériode : T = 2πr/v = 2π√(r³/GM)\n\n3ème loi : T²/r³ = 4π²/(GM)\n\nSatellite géostationnaire :\n• T = 24h = 86400 s\n• Orbite équatoriale\n• r ≈ 42 200 km du centre Terre'},
    ],
    theoremes:[
      {id:'G1',type:'graphique',titre:'Satellite en orbite circulaire — Équilibre des forces',legende:'La force gravitationnelle F_grav fournit la force centripète. v = √(GM/r)',
       svg:`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <!-- Planète centrale -->
  <circle cx="200" cy="150" r="45" fill="#1e40af" opacity="0.9"/>
  <text x="200" y="155" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">Terre</text>
  <text x="200" y="170" fill="#93c5fd" fontSize="10" textAnchor="middle">M</text>
  <!-- Orbite -->
  <circle cx="200" cy="150" r="110" fill="none" stroke="#4f6ef7" strokeWidth="1.5" strokeDasharray="6"/>
  <!-- Satellite -->
  <circle cx="310" cy="150" r="10" fill="#f59e0b"/>
  <text x="330" y="145" fill="#f59e0b" fontSize="11">m</text>
  <!-- Vecteur vitesse -->
  <line x1="310" y1="150" x2="310" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrv)"/>
  <defs><marker id="arrv" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#10b981"/></marker>
  <marker id="arrf" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ef4444"/></marker></defs>
  <text x="315" y="105" fill="#10b981" fontSize="12">v = √(GM/r)</text>
  <!-- Force gravitationnelle -->
  <line x1="308" y1="150" x2="258" y2="150" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrf)"/>
  <text x="245" y="140" fill="#ef4444" fontSize="10">F_grav</text>
  <!-- r -->
  <line x1="200" y1="150" x2="305" y2="150" stroke="#aaa" strokeWidth="1" strokeDasharray="3"/>
  <text x="250" y="167" fill="#aaa" fontSize="11">r</text>
  <!-- Formules -->
  <text x="30" y="260" fill="#4f6ef7" fontSize="11">GM/r² = v²/r</text>
  <text x="30" y="278" fill="#fbbf24" fontSize="11">T² = 4π²r³/GM</text>
</svg>`},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:'Vitesse orbitale ISS',enonce:'L\'ISS orbite à h = 400 km d\'altitude. R_Terre = 6370 km, M_Terre = 5,97×10²⁴ kg. Calculer v et T.',correction:'r = R_Terre + h = 6370+400 = 6770 km = 6,77×10⁶ m\nv = √(GM/r) = √(6,67×10⁻¹¹×5,97×10²⁴/6,77×10⁶)\nv = √(5,88×10⁷) ≈ 7668 m/s ≈ 7,7 km/s\nT = 2πr/v = 2π×6,77×10⁶/7668 ≈ 5545 s ≈ 92 min'},
      {id:'EX02',niveau:'Difficile',titre:'3ème loi de Kepler',enonce:'Mars a une période T = 687 jours. La Terre a T = 365 jours et a = 1 UA. Calculer la distance Mars-Soleil.',correction:'T²/a³ = cte → a_Mars³/a_Terre³ = T_Mars²/T_Terre²\na_Mars³ = 1³ × (687/365)² = 1 × (1,880)² = 3,534\na_Mars = ∛3,534 ≈ 1,52 UA'},
    ],
  },

  'fluides': {
    ch:'CH 08', titre:'Écoulement des fluides', badge:'Mécanique des fluides', duree:'~4h', section:'Section 2 — Mécanique',
    desc:'L\'écoulement des fluides obéit au théorème de Bernoulli (conservation de l\'énergie) et aux lois de conservation du débit.',
    theoremes:[
      {id:'D1',type:'def',nom:'Types d\'écoulement',enonce:'Écoulement laminaire : les filets fluides sont parallèles, ordonnés. Vitesse faible.\n\nÉcoulement turbulent : filets fluides désordonnés, tourbillons. Vitesse élevée.\n\nNombre de Reynolds : Re = ρvL/η\n• Re < 2000 → écoulement laminaire\n• Re > 4000 → écoulement turbulent\n\nDébit volumique : Qv = V/t = S·v  (m³/s)\nDébit massique : Qm = ρ·Qv  (kg/s)'},
      {id:'T1',type:'thm',nom:'Théorème de Bernoulli',enonce:'Pour un écoulement laminaire, permanent, d\'un fluide parfait (non visqueux) :\n\nP + ½ρv² + ρgh = constante le long d\'un filet fluide\n\nP = pression (Pa)\nρ = masse volumique (kg/m³)\nv = vitesse d\'écoulement (m/s)\nh = hauteur (m)\ng = 9,81 m/s²\n\nEquation de continuité (conservation du débit) :\nS₁·v₁ = S₂·v₂  (section × vitesse = constante)'},
      {id:'P1',type:'prop',nom:'Applications de Bernoulli',enonce:'Effet Venturi : réduction de section → augmentation de vitesse → diminution de pression\n→ Application : carburateur, atomiseur, débitmètre\n\nPortance : aile d\'avion, vitesse plus grande sur l\'extrados → P extrados < P intrados → portance vers le haut\n\nTube de Pitot : mesure de vitesse des avions\nP_totale = P_statique + ½ρv² → v = √(2ΔP/ρ)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Conservation du débit',enonce:'Une canalisation passe de S₁ = 4 cm² à S₂ = 1 cm². v₁ = 2 m/s. Calculer v₂ et Qv.',correction:'S₁v₁ = S₂v₂ → v₂ = S₁v₁/S₂ = 4×2/1 = 8 m/s\nQv = S₁v₁ = 4×10⁻⁴×2 = 8×10⁻⁴ m³/s'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Bernoulli',enonce:'Eau (ρ=1000 kg/m³) coule à v₁=1 m/s, P₁=2×10⁵ Pa, h₁=0. En h₂=2 m, S₂ = S₁/2. Calculer P₂.',correction:'v₂ = 2v₁ = 2 m/s (équation continuité)\nBernoulli : P₁+½ρv₁²+ρgh₁ = P₂+½ρv₂²+ρgh₂\n2×10⁵+½×1000×1+0 = P₂+½×1000×4+1000×10×2\n200500 = P₂+2000+20000\nP₂ = 200500−22000 = 178 500 Pa ≈ 1,79×10⁵ Pa'},
    ],
  },

  'premier-principe': {
    ch:'CH 10', titre:'1er principe de la thermodynamique', badge:'Thermodynamique', duree:'~5h', section:'Section 3 — Énergie',
    desc:'Le premier principe énonce la conservation de l\'énergie. Il relie la variation d\'énergie interne d\'un système aux échanges de travail et de chaleur.',
    theoremes:[
      {id:'T1',type:'thm',nom:'1er principe de la thermodynamique',enonce:'Pour un système fermé passant de l\'état 1 à l\'état 2 :\nΔU = W + Q\n\nW = travail reçu par le système (J)\nQ = chaleur reçue par le système (J)\nΔU = variation d\'énergie interne (J)\n\nConvention récepteur :\n• W > 0 si travail reçu par le système\n• Q > 0 si chaleur reçue par le système\n\nTransformation adiabatique : Q = 0 → ΔU = W'},
      {id:'F1',type:'formule',nom:'Capacité thermique',enonce:'Pour un solide ou liquide incompressible :\nQ = m·c·ΔT  (J)\n\nm = masse (kg)\nc = capacité thermique massique (J·kg⁻¹·K⁻¹)\nΔT = T_finale − T_initiale (K ou °C)\n\nValeurs usuelles :\nc_eau = 4180 J·kg⁻¹·K⁻¹\nc_fer = 444 J·kg⁻¹·K⁻¹\nc_aluminium = 900 J·kg⁻¹·K⁻¹\n\nTaux d\'échange thermique :\nP = Q/t  (Watts)'},
      {id:'D1',type:'def',nom:'Transformations particulières',enonce:'Isochore (V = cte) : W = 0 → ΔU = Q\nIsobare (P = cte) : W = −P·ΔV\nIsotherme (T = cte) : pour gaz parfait ΔU = 0 → W = −Q\nAdiabatique (Q = 0) : ΔU = W\n\nTemps caractéristique thermique :\nτ_th = temps pour atteindre 63% de la variation totale de T\nVariation de T : T(t) = T_final + (T_i − T_final)·e^(−t/τ_th)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul de chaleur',enonce:'On chauffe 500 g d\'eau de 20°C à 100°C. c = 4180 J·kg⁻¹·K⁻¹. Calculer Q. La transformation est isochore. Calculer ΔU.',correction:'Q = m·c·ΔT = 0,5×4180×80 = 167 200 J ≈ 167 kJ\nIsochore → W = 0 → ΔU = Q = 167 kJ'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Mélange de deux liquides',enonce:'On mélange 200 g d\'eau à 80°C avec 300 g d\'eau à 20°C. Calculer T_mélange.',correction:'Échange thermique : Q_chaud + Q_froid = 0 (système isolé)\nm₁·c·(T_m−T₁) + m₂·c·(T_m−T₂) = 0\n0,2(T_m−80) + 0,3(T_m−20) = 0\n0,2T_m−16 + 0,3T_m−6 = 0\n0,5T_m = 22 → T_m = 44°C'},
    ],
  },

  'enthalpie': {
    ch:'CH 11', titre:'Énergie chimique & Enthalpie', badge:'Thermochimie', duree:'~4h', section:'Section 3 — Énergie',
    desc:'L\'enthalpie de réaction quantifie l\'énergie échangée lors d\'une réaction chimique. Elle est calculable à partir des énergies de liaison.',
    theoremes:[
      {id:'D1',type:'def',nom:'Enthalpie de réaction',enonce:'ΔrH = énergie échangée lors de la réaction (à pression constante)\n\nΔrH < 0 : réaction exothermique (libère de la chaleur)\nΔrH > 0 : réaction endothermique (absorbe de la chaleur)\n\nUnités : kJ/mol ou J/mol\n\nRéaction de combustion : toujours exothermique\nReaction de dissolution : peut être exo ou endothermique'},
      {id:'F1',type:'formule',nom:'Calcul par les énergies de liaison',enonce:'ΔrH = Σ E(liaisons rompues) − Σ E(liaisons formées)\n\nRupture de liaison : absorbe de l\'énergie (endothermique)\nFormation de liaison : libère de l\'énergie (exothermique)\n\nExemple : H₂ + ½O₂ → H₂O\nLiaisons rompues : 1×E(H−H) + ½×E(O=O) = 436 + 249 = 685 kJ/mol\nLiaisons formées : 2×E(O−H) = 2×463 = 926 kJ/mol\nΔrH = 685 − 926 = −241 kJ/mol (exothermique ✓)'},
      {id:'D2',type:'def',nom:'Pouvoir calorifique',enonce:'Pouvoir calorifique (PCI ou PCS) : énergie libérée par combustion complète d\'1 kg de combustible.\n\nPCI = pouvoir calorifique inférieur (eau produite à l\'état gazeux)\nPCS = pouvoir calorifique supérieur (eau produite à l\'état liquide)\nPCS > PCI\n\nValeurs :\nGaz naturel (méthane) : PCI ≈ 50 MJ/kg\nEssence : PCI ≈ 43 MJ/kg\nBois : PCI ≈ 15 MJ/kg\nHydrogène : PCI ≈ 120 MJ/kg'},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:'Énergie de combustion',enonce:'La combustion du méthane : CH₄ + 2O₂ → CO₂ + 2H₂O. ΔrH = −890 kJ/mol. Calculer l\'énergie libérée en brûlant 1 kg de méthane (M = 16 g/mol).',correction:'n = m/M = 1000/16 = 62,5 mol\nQ = n×|ΔrH| = 62,5×890 = 55 625 kJ ≈ 55,6 MJ\nCohérent avec PCI méthane ≈ 50 MJ/kg ✓'},
    ],
  },

  'bilan-radiatif': {
    ch:'CH 12', titre:'Bilan radiatif terrestre', badge:'Climatologie', duree:'~3h', section:'Section 3 — Énergie',
    desc:'La Terre reçoit l\'énergie solaire et réémet de l\'énergie infrarouge. Le bilan radiatif détermine la température d\'équilibre de la planète.',
    theoremes:[
      {id:'D1',type:'def',nom:'Rayonnement solaire et terrestre',enonce:'Constante solaire : φ₀ = 1361 W/m² (flux reçu au sommet de l\'atmosphère)\n\nAlbédo a : fraction de l\'énergie solaire réfléchie\nTerre : a ≈ 0,30 (30% réfléchi)\n\nÉnergie absorbée par la Terre :\nP_abs = φ₀·π·R²·(1−a)\n\nÉnergie réémise (loi de Stefan-Boltzmann) :\nP_ém = σ·T⁴·4πR²\nσ = 5,67×10⁻⁸ W·m⁻²·K⁻⁴'},
      {id:'T1',type:'thm',nom:'Température d\'équilibre',enonce:'À l\'équilibre : P_abs = P_ém\nφ₀·π·R²·(1−a) = σ·T_éq⁴·4πR²\n\nT_éq = [φ₀(1−a)/(4σ)]^(1/4)\n\nSans atmosphère : T_éq ≈ 255 K = −18°C\nAvec effet de serre naturel : T_obs ≈ 288 K = +15°C\n\nDifférence de 33°C due à l\'effet de serre naturel'},
      {id:'D2',type:'def',nom:'Effet de serre',enonce:'Les gaz à effet de serre (GES) : CO₂, H₂O, CH₄, N₂O, O₃…\n\nMécanisme :\n1. Le Soleil émet des rayons visibles (courtes longueurs d\'onde)\n2. La surface terrestre absorbe et réémet de l\'infrarouge\n3. Les GES absorbent cet infrarouge et le réémet en partie vers la surface\n4. La surface se réchauffe davantage\n\nEffet de serre anthropique : augmentation de CO₂ (combustibles fossiles) → renforcement de l\'effet de serre → réchauffement climatique'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Température d\'équilibre',enonce:'Calculer T_éq de la Terre sans atmosphère. φ₀=1361 W/m², a=0,30, σ=5,67×10⁻⁸ W·m⁻²·K⁻⁴.',correction:'T_éq = [φ₀(1−a)/(4σ)]^(1/4)\n= [1361×0,70/(4×5,67×10⁻⁸)]^(1/4)\n= [952,7/(2,268×10⁻⁷)]^(1/4)\n= [4,2×10⁹]^(1/4)\n≈ 254,8 K ≈ 255 K ≈ −18°C'},
    ],
  },

  'effet-doppler': {
    ch:'CH 14', titre:'Effet Doppler', badge:'Ondes', duree:'~3h', section:'Section 4 — Ondes & Signaux',
    desc:'L\'effet Doppler est la modification de la fréquence perçue d\'une onde quand la source et l\'observateur sont en mouvement relatif.',
    theoremes:[
      {id:'D1',type:'def',nom:'Effet Doppler',enonce:'Quand la source se rapproche de l\'observateur :\n→ Les fronts d\'onde sont comprimés\n→ f_perçue > f_source (son aigu, lumière décalée vers le bleu)\n\nQuand la source s\'éloigne :\n→ Les fronts d\'onde sont étirés\n→ f_perçue < f_source (son grave, lumière décalée vers le rouge)'},
      {id:'F1',type:'formule',nom:'Formules Doppler',enonce:'Ondes sonores (v = célérité du son ≈ 340 m/s dans l\'air) :\n\nSource mobile, observateur fixe :\nf_obs = f_s × v/(v ∓ v_s)\n− si source s\'approche\n+ si source s\'éloigne\n\nObservateur mobile, source fixe :\nf_obs = f_s × (v ± v_obs)/v\n+ si observateur s\'approche\n− si observateur s\'éloigne\n\nOndes électromagnétiques (v_rel << c) :\nΔf/f = v_rel/c  (décalage Doppler relatif)'},
      {id:'P1',type:'prop',nom:'Applications',enonce:'Radar de vitesse (police) : ondes radio, mesure Δf → calcule v\n\nÉchographie médicale : ultrasons, mesure vitesse du sang\n\nAstrophysique : décalage vers le rouge (redshift) des galaxies → Univers en expansion\n\nMétéorologie : radar Doppler → détecte le mouvement des masses d\'air\n\nCardiovasculaire : écho-Doppler → mesure vitesse du sang dans les vaisseaux'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Ambulance',enonce:'Une ambulance (f = 440 Hz) roule à 30 m/s vers un observateur. v_son = 340 m/s. Calculer f_perçue.',correction:'f_obs = f_s × v/(v−v_s) = 440 × 340/(340−30) = 440 × 340/310\nf_obs = 440 × 1,097 ≈ 482 Hz'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Radar de vitesse',enonce:'Un radar émet à f₀ = 24 GHz et reçoit un signal de f = 24,000 002 4 GHz d\'une voiture qui s\'approche. Calculer v. (c = 3×10⁸ m/s)',correction:'Δf = f−f₀ = 2,4×10³ Hz\nv = c·Δf/f₀ = 3×10⁸×2,4×10³/(24×10⁹) = 30 m/s = 108 km/h'},
    ],
  },

  'circuit-rlc': {
    ch:'CH 15', titre:'Circuit RLC — Résonance', badge:'Électronique', duree:'~5h', section:'Section 4 — Ondes & Signaux',
    desc:'Le circuit RLC en régime sinusoïdal forcé présente un phénomène de résonance à la pulsation ω₀. C\'est la base des filtres et des systèmes de communication.',
    theoremes:[
      {id:'D1',type:'def',nom:'Régime sinusoïdal forcé',enonce:'Un circuit RLC série soumis à une tension u(t) = U_max·cos(ωt) établit un régime permanent sinusoïdal de même fréquence.\n\nCourant : i(t) = I_max·cos(ωt + φ)\n\nImpédances :\n• Résistance R : Z_R = R (pas de déphasage)\n• Condensateur C : Z_C = 1/(Cω) (courant en avance de π/2)\n• Bobine L : Z_L = Lω (courant en retard de π/2)'},
      {id:'F1',type:'formule',nom:'Impédance et résonance',enonce:'Impédance totale RLC série :\nZ = √[R² + (Lω − 1/Cω)²]\n\nDéphasage :\ntan φ = (Lω − 1/Cω)/R\n\nPulsation de résonance :\nω₀ = 1/√(LC)  (rad/s)\nf₀ = ω₀/(2π)  (Hz)\n\nÀ la résonance : Z = R (minimum) → I = U/R (maximum)\nLω₀ = 1/(Cω₀) → déphasage φ = 0'},
      {id:'D2',type:'def',nom:'Facteur de qualité',enonce:'Facteur de qualité Q (sans unité) :\nQ = Lω₀/R = 1/(RCω₀) = (1/R)·√(L/C)\n\nBande passante :\nΔω = ω₀/Q → plus Q est grand, plus la résonance est sélective\n\nInterprétation :\n• Q grand (faible R) → pic de résonance étroit et élevé\n• Q petit (grande R) → résonance large et peu marquée\n\nApplications : filtre passe-bande, circuit accordé (radio, TV)'},
    ],
    theoremes:[
      {id:'G1',type:'graphique',titre:'Courbe de résonance I(ω) — Circuit RLC série',legende:'À ω₀ = 1/√(LC) : I est maximal. Plus Q est grand, plus le pic est étroit.',
       svg:`<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
  <defs><marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#aaa"/></marker></defs>
  <line x1="50" y1="180" x2="470" y2="180" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#arr3)"/>
  <line x1="50" y1="180" x2="50" y2="20" stroke="#aaa" strokeWidth="1.5" markerEnd="url(#arr3)"/>
  <text x="475" y="184" fill="#aaa" fontSize="13">ω</text>
  <text x="28" y="18" fill="#aaa" fontSize="11">I</text>
  <text x="238" y="197" fill="#8b5cf6" fontSize="12">ω₀</text>
  <line x1="250" y1="175" x2="250" y2="185" stroke="#8b5cf6" strokeWidth="1"/>
  <!-- I_max -->
  <text x="10" y="38" fill="#8b5cf6" fontSize="11">I_max</text>
  <line x1="45" y1="34" x2="55" y2="34" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3"/>
  <line x1="50" y1="34" x2="250" y2="34" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3"/>
  <line x1="250" y1="34" x2="250" y2="180" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3"/>
  <!-- Courbe Q élevé (étroite) -->
  <path d="M50,172 C100,170 180,162 220,120 C235,80 245,40 250,34 C255,40 265,80 280,120 C320,162 400,170 465,172" fill="none" stroke="#8b5cf6" strokeWidth="2.5"/>
  <text x="360" y="145" fill="#8b5cf6" fontSize="11">Q élevé</text>
  <!-- Courbe Q faible (large) -->
  <path d="M50,165 C100,158 160,130 200,95 C225,72 240,52 250,48 C260,52 275,72 300,95 C340,130 400,158 465,165" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6"/>
  <text x="360" y="120" fill="#f59e0b" fontSize="11">Q faible</text>
  <!-- Bande passante -->
  <line x1="215" y1="60" x2="285" y2="60" stroke="#10b981" strokeWidth="1.5"/>
  <line x1="215" y1="55" x2="215" y2="65" stroke="#10b981" strokeWidth="1.5"/>
  <line x1="285" y1="55" x2="285" y2="65" stroke="#10b981" strokeWidth="1.5"/>
  <text x="220" y="52" fill="#10b981" fontSize="10">Δω = ω₀/Q</text>
</svg>`},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Pulsation de résonance',enonce:'L = 0,1 H, C = 10 μF. Calculer ω₀ et f₀.',correction:'ω₀ = 1/√(LC) = 1/√(0,1×10⁻⁵) = 1/√(10⁻⁶) = 1000 rad/s\nf₀ = ω₀/(2π) = 1000/(2π) ≈ 159 Hz'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Impédance et courant',enonce:'R=100Ω, L=0,1H, C=10μF, U=10V, f=200Hz. Calculer Z, I et φ.',correction:'ω = 2π×200 ≈ 1257 rad/s\nZ_L = Lω = 0,1×1257 = 125,7 Ω\nZ_C = 1/(Cω) = 1/(10⁻⁵×1257) = 79,6 Ω\nZ = √(100²+(125,7−79,6)²) = √(10000+2122) = √12122 ≈ 110 Ω\nI = U/Z = 10/110 ≈ 91 mA\ntan φ = (125,7−79,6)/100 = 0,461 → φ ≈ 25° (circuit inductif)'},
    ],
  },

}

export default function PhysiqueTerminaleChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)

  if (!ch) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>🔬</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/physique/terminale" className="btn btn-primary">← Retour Terminale PC</Link>
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

          {/* Fil d'Ariane */}
          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--muted)', marginBottom:24, flexWrap:'wrap' }}>
            <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link>
            <span>›</span>
            <Link href="/bac-france/physique/terminale" style={{ color:'var(--muted)', textDecoration:'none' }}>Terminale</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{ch.titre}</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>

            {/* Contenu principal */}
            <div>
              {/* Header */}
              <div style={{ marginBottom:28 }}>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>{ch.ch}</span>
                  <span className="label">{ch.badge}</span>
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(245,158,11,0.15)', color:'#fbbf24', fontWeight:700 }}>⭐ BAC · Coef.16</span>
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(255,255,255,0.07)', color:'var(--muted)', fontWeight:600 }}>⏱ {ch.duree}</span>
                </div>
                <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(22px,3vw,36px)', marginBottom:10 }}>{ch.titre}</h1>
                <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7, marginBottom:16 }}>{ch.desc}</p>
                <div style={{ fontSize:12, color:'var(--muted)', fontStyle:'italic' }}>{ch.section}</div>
              </div>

              {/* Théorèmes / Définitions / Graphiques */}
              <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:32 }}>
                {ch.theoremes.map(t => {
                  if (t.type === 'graphique') return (
                    <div key={t.id} style={{ borderRadius:12, overflow:'hidden', border:`1px solid ${secColor}25` }}>
                      <div style={{ fontSize:11, color:secColor, fontWeight:700, padding:'8px 14px', background:`${secColor}12`, borderBottom:`1px solid ${secColor}18` }}>📊 {t.titre}</div>
                      <div style={{ background:'rgba(0,0,0,0.25)', padding:'10px' }} dangerouslySetInnerHTML={{ __html: t.svg }} />
                      {t.legende && <div style={{ fontSize:11, color:'var(--muted)', padding:'6px 14px', textAlign:'center', fontStyle:'italic' }}>{t.legende}</div>}
                    </div>
                  )
                  return (
                    <div key={t.id} style={{ border:`1px solid ${C[t.type as keyof typeof C] || secColor}30`, borderLeft:`4px solid ${C[t.type as keyof typeof C] || secColor}`, borderRadius:'0 12px 12px 0', overflow:'hidden' }}>
                      <div style={{ background:`${C[t.type as keyof typeof C] || secColor}10`, padding:'10px 16px', display:'flex', gap:10, alignItems:'center' }}>
                        <span style={{ fontSize:10, fontWeight:800, color:C[t.type as keyof typeof C] || secColor, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', background:`${C[t.type as keyof typeof C] || secColor}20`, padding:'2px 8px', borderRadius:6 }}>{L[t.type] || t.type}</span>
                        <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{t.nom}</span>
                      </div>
                      <div style={{ padding:'14px 18px', background:'rgba(255,255,255,0.02)' }}>
                        <pre style={{ fontSize:13, color:'var(--text2)', lineHeight:1.85, margin:0, fontFamily:'var(--font-body)', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{t.enonce}</pre>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Exercices */}
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
                        <Link href={`/solve?q=${encodeURIComponent('Terminale PC France, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:12, padding:'6px 14px' }}>
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

              {/* Navigation prev/next */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:22 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/physique/terminale/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'13px 16px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/terminale/${nextSlug}`} style={{ textDecoration:'none' }}>
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

            {/* Sidebar */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', marginBottom:14 }}>
                <div style={{ padding:'11px 15px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>⚛️ Terminale PC — 16 chapitres</div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/physique/terminale/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+ch.titre+' en Terminale Spécialité PC')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {ch.titre}
                  </Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac PC</Link>
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
// CHAPITRES SUPPLÉMENTAIRES — ajout dans CHAPITRES object
// Ces entrées doivent être ajoutées dans le CHAPITRES object du fichier terminale_slug_page.tsx