'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE SECONDE / [SLUG]
// Route : /bac-france/physique/seconde/[slug]
// Programme officiel Seconde Générale & Technologique
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'atomes-noyau',
  'transformations-chimiques',
  'description-mouvement',
  'forces-interactions',
  'ondes-mecaniques-2',
  'ondes-lumineuses',
  'signaux-electriques-2',
  'formes-energie',
  'bilans-energetiques-2',
]

const TITRES: Record<string,string> = {
  'atomes-noyau':            'Atomes, noyaux & Tableau périodique',
  'transformations-chimiques':'Transformations chimiques',
  'description-mouvement':   'Description du mouvement',
  'forces-interactions':     'Forces & Interactions',
  'ondes-mecaniques-2':      'Ondes mécaniques & sonores',
  'ondes-lumineuses':        'Ondes lumineuses & Lentilles',
  'signaux-electriques-2':   'Signaux électriques & Circuits',
  'formes-energie':          'Formes d\'énergie',
  'bilans-energetiques-2':   'Bilans & Conversions d\'énergie',
}

const SEC_COLOR: Record<string,string> = {
  'atomes-noyau':'#10b981','transformations-chimiques':'#10b981',
  'description-mouvement':'#4f6ef7','forces-interactions':'#4f6ef7',
  'ondes-mecaniques-2':'#8b5cf6','ondes-lumineuses':'#8b5cf6','signaux-electriques-2':'#8b5cf6',
  'formes-energie':'#f59e0b','bilans-energetiques-2':'#f59e0b',
}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string;
  theoremes:{id:string; type:string; nom:string; enonce?:string; titre?:string; legende?:string; svg?:string}[];
  exercices:{id:string; niveau:string; titre:string; enonce:string; correction:string}[];
}> = {

  'atomes-noyau': {
    ch:'CH 01', titre:'Atomes, noyaux & Tableau périodique', badge:'Chimie', duree:'~4h', section:'Section 1 — Constitution de la Matière',
    desc:'L\'atome est constitué d\'un noyau (protons + neutrons) entouré d\'électrons. Le tableau périodique classe les éléments selon leur numéro atomique Z.',
    theoremes:[
      {id:'D1',type:'def',nom:'Structure de l\'atome',enonce:'L\'atome est électriquement neutre :\n• Noyau : protons (charge +e) + neutrons (neutres)\n• Cortège électronique : électrons (charge −e)\n\nNotations :\nZ = numéro atomique = nombre de protons = nombre d\'électrons (atome neutre)\nA = nombre de masse = Z + N  (N = neutrons)\nSymbole : ᴬ_Z X\n\nDimensions :\n• Atome : diamètre ≈ 10⁻¹⁰ m = 1 Å\n• Noyau : diamètre ≈ 10⁻¹⁵ m = 1 fm\n→ Le noyau est 100 000 fois plus petit que l\'atome'},
      {id:'D2',type:'def',nom:'Isotopes',enonce:'Deux atomes isotopes ont le même Z (même élément) mais des N différents (→ même A différent).\n\nExemples du carbone :\n• ¹²_₆C (carbone-12, stable, 98,9%)\n• ¹³_₆C (carbone-13, stable, 1,1%)\n• ¹⁴_₆C (carbone-14, radioactif, traces)\n\nMasse atomique relative = moyenne des masses des isotopes pondérée par leur abondance.'},
      {id:'P1',type:'prop',nom:'Tableau périodique & électrons de valence',enonce:'Les éléments sont classés par Z croissant en lignes (périodes) et colonnes (groupes).\n\nConfiguration électronique :\n• 1ère couche K : max 2 électrons (1s²)\n• 2ème couche L : max 8 électrons (2s²2p⁶)\n• 3ème couche M : max 18 électrons (3s²3p⁶3d¹⁰)\n\nRègle de Klechkowski : on remplit dans l\'ordre des (n+l) croissants.\n→ 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p…\n\nÉlectrons de valence : électrons de la dernière couche remplie.\n→ Détermine les propriétés chimiques.\n→ Même groupe = même nb d\'électrons de valence = propriétés similaires.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Configuration électronique',enonce:'Donner la configuration électronique de Na (Z=11) et Cl (Z=17). Identifier les électrons de valence.',correction:'Na : 1s²2s²2p⁶3s¹ → 1 électron de valence → métallique, colonne 1\nCl : 1s²2s²2p⁶3s²3p⁵ → 7 électrons de valence → halogène, colonne 17'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Isotopes du chlore',enonce:'Le chlore a deux isotopes : ³⁵Cl (75,77%, M=34,97) et ³⁷Cl (24,23%, M=36,97). Calculer la masse atomique relative.',correction:'M(Cl) = 0,7577×34,97 + 0,2423×36,97\n= 26,50 + 8,96 = 35,45 g/mol ✓ (valeur tabulée)'},
    ],
  },

  'transformations-chimiques': {
    ch:'CH 02', titre:'Transformations chimiques', badge:'Chimie', duree:'~5h', section:'Section 1 — Constitution de la Matière',
    desc:'Équations de réaction, conservation de la masse, combustions, réactions acide-base et oxydo-réduction. Notion de pH.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Équilibrage d\'une équation chimique',enonce:'Une équation chimique est équilibrée si :\n1. Conservation des atomes (même nombre de chaque élément de chaque côté)\n2. Conservation des charges électriques\n\nMéthode :\n• Équilibrer d\'abord les éléments les moins fréquents\n• Finir par H et O\n• Vérifier la conservation des charges\n\nLoi de conservation de la masse (Lavoisier) :\nm(réactifs) = m(produits)'},
      {id:'D1',type:'def',nom:'Acides, bases et pH',enonce:'Acide de Brønsted : espèce qui peut donner un proton H⁺\nBase de Brønsted : espèce qui peut accepter un proton H⁺\n\nCouple acide/base : HA / A⁻ (différence d\'un proton H⁺)\n\npH = −log[H₃O⁺]\n[H₃O⁺] = 10^(−pH)\n\nProduit ionique de l\'eau :\nKe = [H₃O⁺][OH⁻] = 10⁻¹⁴ à 25°C\npH < 7 : solution acide\npH = 7 : solution neutre\npH > 7 : solution basique'},
      {id:'D2',type:'def',nom:'Combustions',enonce:'Combustion complète d\'un hydrocarbure C_xH_y :\nC_xH_y + (x + y/4)O₂ → xCO₂ + (y/2)H₂O\n\nExemples :\nCH₄ + 2O₂ → CO₂ + 2H₂O  (méthane)\nC₃H₈ + 5O₂ → 3CO₂ + 4H₂O  (propane)\nC₂H₅OH + 3O₂ → 2CO₂ + 3H₂O  (éthanol)\n\nCombustion incomplète : manque d\'O₂ → produit du CO (monoxyde de carbone, toxique)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'pH d\'une solution',enonce:'On prépare une solution d\'HCl à c = 0,01 mol/L. HCl est un acide fort (ionisation totale). Calculer [H₃O⁺] et pH.',correction:'HCl → H⁺ + Cl⁻ (totalement)\n[H₃O⁺] = c = 0,01 = 10⁻² mol/L\npH = −log(10⁻²) = 2'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Équation de combustion',enonce:'Équilibrer la combustion complète du butane C₄H₁₀.',correction:'C₄H₁₀ + ? O₂ → 4CO₂ + 5H₂O\nO à droite : 4×2 + 5×1 = 8+5 = 13 → 13/2 O₂\nC₄H₁₀ + 13/2 O₂ → 4CO₂ + 5H₂O\nOu : 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O'},
    ],
  },

  'description-mouvement': {
    ch:'CH 03', titre:'Description du mouvement', badge:'Mécanique', duree:'~4h', section:'Section 2 — Mouvement & Interactions',
    desc:'Référentiel, vecteur position, vecteur vitesse, accélération. Types de mouvements : rectiligne uniforme, rectiligne uniformément varié, circulaire.',
    theoremes:[
      {id:'D1',type:'def',nom:'Référentiel et vecteur position',enonce:'Référentiel : solide de référence + horloge\nExemples : terrestre, géocentrique, héliocentrique\n\nVecteur position OM⃗ : du point O (origine) au point M (objet)\n\nCoordonnées cartésiennes : M(x, y, z)\n\nTrajectoire : ensemble des positions successives du point mobile.\n• Rectiligne : ligne droite\n• Circulaire : cercle\n• Quelconque : courbe quelconque'},
      {id:'F1',type:'formule',nom:'Vecteur vitesse et accélération',enonce:'Vecteur vitesse moyen sur [t₁, t₂] :\nv⃗_moy = ΔOM⃗/Δt\n\nVitesse instantanée (dérivée) :\nv⃗ = dr⃗/dt\n\nValeur (norme) : v = |v⃗|  (m/s)\n\nVecteur accélération (dérivée de v⃗) :\na⃗ = dv⃗/dt\n\nMouvements particuliers :\n• MRU (v = cte) : a⃗ = 0⃗\n• MRUA (v variable uniformément) : a = cte\n  → v = v₀ + a·t ; x = x₀ + v₀t + ½at²\n• MCU (v = cte, trajectoire circulaire) : a⃗ centripète ≠ 0⃗'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Vitesse moyenne',enonce:'Une voiture parcourt 150 km en 1h30min. Calculer sa vitesse moyenne en km/h et m/s.',correction:'t = 1,5 h\nv_moy = 150/1,5 = 100 km/h\nEn m/s : 100×1000/3600 = 27,8 m/s'},
      {id:'EX02',niveau:'Intermédiaire',titre:'MRUA — freinage',enonce:'Une voiture roule à v₀ = 72 km/h et freine avec a = −5 m/s². Calculer la distance de freinage (v_f = 0).',correction:'v₀ = 72/3,6 = 20 m/s\nv_f² = v₀² + 2a×d → 0 = 400 − 10d → d = 40 m'},
    ],
  },

  'forces-interactions': {
    ch:'CH 04', titre:'Forces & Interactions', badge:'Mécanique', duree:'~4h', section:'Section 2 — Mouvement & Interactions',
    desc:'Modélisation des actions mécaniques par des forces, principe d\'inertie (1ère loi de Newton), poids et force normale.',
    theoremes:[
      {id:'T1',type:'thm',nom:'Principe d\'inertie (1ère loi de Newton)',enonce:'Dans un référentiel galiléen :\nSi ΣF⃗_ext = 0⃗ alors a⃗ = 0⃗\n→ le centre de masse est en MRU ou au repos.\n\nRéciproque : si a⃗ = 0⃗ (MRU) alors ΣF⃗_ext = 0⃗\n\nUn référentiel galiléen est un référentiel dans lequel le principe d\'inertie est vérifié.\n→ Approximations : terrestre (expériences courtes), héliocentrique.'},
      {id:'D1',type:'def',nom:'Forces usuelles',enonce:'Poids P⃗ : force de gravitation exercée par la Terre\nP⃗ = m·g⃗  (vertical, vers le bas)\ng ≈ 9,8 m/s² (variable selon le lieu)\n\nRéaction normale N⃗ : force perpendiculaire exercée par un support.\nSur un plan horizontal : N⃗ = −P⃗ si ΣF⃗ = 0⃗\n\nForce de frottement f⃗ : force tangentielle à la surface, s\'oppose au mouvement.\n\nTension T⃗ : exercée par un fil ou ressort, suivant le fil, s\'éloignant du corps.'},
      {id:'F1',type:'formule',nom:'Équilibre statique',enonce:'Un objet est en équilibre si ΣF⃗_ext = 0⃗\n\nMéthode :\n1. Identifier toutes les forces\n2. Choisir un repère (axes x et y)\n3. Projeter : ΣFₓ = 0 ; ΣFᵧ = 0\n4. Résoudre le système\n\nExemple : objet sur plan incliné (angle θ), sans frottement :\nSuivant x (axe de la pente) : −Psinθ + T = 0 → T = mgsinθ\nSuivant y (normal à la pente) : N − Pcosθ = 0 → N = mgcosθ'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Equilibre d\'un objet suspendu',enonce:'Un objet de 500 g est suspendu par un fil vertical. g = 9,8 m/s². Calculer la tension T.',correction:'ΣF = 0 → T − P = 0 → T = P = mg = 0,5×9,8 = 4,9 N'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Plan incliné',enonce:'Un objet de 2 kg est posé sur un plan incliné à 30°, sans frottement. Calculer N et la force retenant l\'objet. g = 10 m/s².',correction:'N = mgcos30° = 2×10×0,866 = 17,3 N\nT = mgsin30° = 2×10×0,5 = 10 N'},
    ],
  },

  'ondes-mecaniques-2': {
    ch:'CH 05', titre:'Ondes mécaniques & sonores', badge:'Ondes', duree:'~4h', section:'Section 3 — Ondes & Signaux',
    desc:'Propagation d\'une perturbation mécanique, ondes sonores et ultrasons, vitesse de propagation, retard.',
    theoremes:[
      {id:'D1',type:'def',nom:'Ondes mécaniques',enonce:'Une onde mécanique est la propagation d\'une perturbation dans un milieu matériel, sans transport de matière.\n\nTypes :\n• Onde transversale : déplacement ⊥ propagation (corde vibrante)\n• Onde longitudinale : déplacement ∥ propagation (son)\n\nSon :\n• Fréquences audibles : 20 Hz – 20 000 Hz\n• Infrasons : f < 20 Hz\n• Ultrasons : f > 20 000 Hz\n\nCélérités :\n• Son dans l\'air : ≈ 340 m/s (20°C)\n• Son dans l\'eau : ≈ 1480 m/s\n• Son dans l\'acier : ≈ 5100 m/s'},
      {id:'F1',type:'formule',nom:'Grandeurs d\'une onde',enonce:'Célérité v (m/s), période T (s), fréquence f (Hz), longueur d\'onde λ (m) :\n\nv = λ × f = λ/T\n\nRetard : τ = d/v\n(d = distance parcourue)\n\nApplication sonar/écho :\naller-retour : d = v × (Δt/2)\n\nUltrasons médicaux (échographie) :\nv ≈ 1500 m/s dans les tissus\nRésolution spatiale ≈ λ/2'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Echo sous-marin',enonce:'Un sonar émet un signal qui revient après Δt = 0,8 s. v_son = 1500 m/s dans l\'eau. Calculer la profondeur.',correction:'d_aller = v × (Δt/2) = 1500 × 0,4 = 600 m'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Longueur d\'onde du son',enonce:'Un haut-parleur émet un son à f = 500 Hz dans l\'air (v = 340 m/s). Calculer λ.',correction:'λ = v/f = 340/500 = 0,68 m = 68 cm'},
    ],
  },

  'ondes-lumineuses': {
    ch:'CH 06', titre:'Ondes lumineuses & Lentilles', badge:'Optique', duree:'~5h', section:'Section 3 — Ondes & Signaux',
    desc:'Propagation rectiligne de la lumière, lentilles minces convergentes, construction d\'images, relation de conjugaison, grandissement.',
    theoremes:[
      {id:'D1',type:'def',nom:'Lentilles minces convergentes',enonce:'Une lentille convergente (bords minces) fait converger les rayons lumineux vers un foyer F\'.\n\nÉléments remarquables :\n• Centre optique O : point de la lentille, les rayons passent non déviés\n• Foyer image F\' : image d\'un objet à l\'infini\n• Foyer objet F : conjugué de F\', symétrique par rapport à O\n• Distance focale : f\' = OF\'  (positive pour une lentille convergente)\n\nRayons particuliers pour la construction :\n1. Rayon passant par O → non dévié\n2. Rayon ∥ à l\'axe → passe par F\' après la lentille\n3. Rayon passant par F → ressort ∥ à l\'axe'},
      {id:'F1',type:'formule',nom:'Relation de conjugaison et grandissement',enonce:'Relation de conjugaison (convention algébrique) :\n1/OA\' − 1/OA = 1/f\' = D\n\nOA = distance objet–lentille (négatif si objet avant la lentille)\nOA\' = distance lentille–image (positif si image après la lentille)\nf\' = distance focale (m)\nD = vergence (dioptries, δ) = 1/f\'\n\nGrandissement algébrique :\nγ = OA\'/OA = A\'B\'/AB\nγ > 0 : image droite ; γ < 0 : image renversée\n|γ| > 1 : image plus grande ; |γ| < 1 : image plus petite'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Construction d\'image',enonce:'Un objet est placé à OA = −30 cm d\'une lentille de vergence D = 4 δ. Calculer OA\' et γ.',correction:'f\' = 1/D = 1/4 = 0,25 m = 25 cm\n1/OA\' = 1/f\' + 1/OA = 1/25 + 1/(−30) = 0,04 − 0,0333 = 0,00667 cm⁻¹\nOA\' = 150 cm\nγ = OA\'/OA = 150/(−30) = −5 (image réelle, renversée, agrandie ×5)'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Loupe',enonce:'Un objet de taille AB = 2 mm est placé à OA = −8 cm d\'une loupe de f\' = 10 cm. Calculer OA\' et la taille A\'B\'.',correction:'1/OA\' = 1/10 + 1/(−8) = 0,10 − 0,125 = −0,025 cm⁻¹\nOA\' = −40 cm (image virtuelle, même côté que l\'objet)\nγ = OA\'/OA = (−40)/(−8) = 5 (image droite et agrandie)\nA\'B\' = |γ|×AB = 5×2 = 10 mm'},
    ],
  },

  'signaux-electriques-2': {
    ch:'CH 07', titre:'Signaux électriques & Circuits', badge:'Électricité', duree:'~4h', section:'Section 3 — Ondes & Signaux',
    desc:'Tension et intensité électrique, loi d\'Ohm, circuits série et dérivation, puissance électrique et effet Joule.',
    theoremes:[
      {id:'D1',type:'def',nom:'Grandeurs électriques fondamentales',enonce:'Tension électrique U (en Volts, V) : différence de potentiel entre deux points.\nIntensité I (en Ampères, A) : débit de charge électrique.\n\nLoi des mailles (Kirchhoff tension) :\nLa somme algébrique des tensions dans une maille = 0.\n\nLoi des nœuds (Kirchhoff courant) :\nLa somme des courants entrant = somme des courants sortants.\n\nSérie : même intensité, tensions s\'additionnent\nDérivation : même tension, intensités s\'additionnent'},
      {id:'F1',type:'formule',nom:'Loi d\'Ohm et puissance',enonce:'Loi d\'Ohm (résistance) : U = R × I\n\nRésistances en série : R_éq = R₁ + R₂ + … + Rₙ\nRésistances en parallèle : 1/R_éq = 1/R₁ + 1/R₂ + …\n\nPuissance dissipée dans une résistance :\nP = U × I = R × I² = U²/R\n\nÉnergie électrique : E = P × t = U × I × t  (en Joules)\n1 kWh = 3,6 × 10⁶ J\n\nDiviseur de tension (pont) : U₂ = U × R₂/(R₁ + R₂)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Loi d\'Ohm',enonce:'Une résistance R = 470 Ω est soumise à U = 9,4 V. Calculer I et P.',correction:'I = U/R = 9,4/470 = 0,02 A = 20 mA\nP = UI = 9,4×0,02 = 0,188 W ≈ 200 mW'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Circuit mixte',enonce:'R₁ = 100 Ω et R₂ = 200 Ω en parallèle, alimenté par U = 12 V. Calculer R_éq, I_total, I₁ et I₂.',correction:'1/R_éq = 1/100 + 1/200 = 0,01 + 0,005 = 0,015 → R_éq = 66,7 Ω\nI_total = U/R_éq = 12/66,7 = 0,18 A\nI₁ = U/R₁ = 12/100 = 0,12 A\nI₂ = U/R₂ = 12/200 = 0,06 A\nVérif : 0,12+0,06 = 0,18 A ✓'},
    ],
  },

  'formes-energie': {
    ch:'CH 08', titre:'Formes d\'énergie', badge:'Énergie', duree:'~4h', section:'Section 4 — Conversions & Transferts',
    desc:'Énergie cinétique, énergie potentielle de pesanteur, conservation de l\'énergie mécanique, transferts thermiques.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Énergie cinétique et potentielle',enonce:'Énergie cinétique :\nEc = ½ × m × v²  (en Joules)\nm en kg, v en m/s\n\nÉnergie potentielle de pesanteur :\nEp = m × g × h\nh = altitude par rapport à la référence choisie\ng ≈ 9,8 m/s²\n\nÉnergie mécanique :\nEm = Ec + Ep\n\nConservation de l\'énergie mécanique :\n(sans frottements) Em = cte\n½mv₁² + mgh₁ = ½mv₂² + mgh₂'},
      {id:'D1',type:'def',nom:'Transferts thermiques',enonce:'L\'énergie peut se transférer de trois façons :\n\n1. Conduction (solides) : transmission par contact entre atomes sans déplacement de matière.\n→ Bons conducteurs : métaux ; Isolants : bois, polystyrène\n\n2. Convection (fluides) : déplacement macroscopique de matière (courants de convection).\n→ Ex : chauffe de l\'air au-dessus d\'un radiateur\n\n3. Rayonnement : propagation sous forme d\'onde électromagnétique (infrarouge).\n→ Ne nécessite pas de milieu matériel (transfert dans le vide possible)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Énergie cinétique',enonce:'Une voiture de 1200 kg roule à 90 km/h. Calculer Ec.',correction:'v = 90/3,6 = 25 m/s\nEc = ½×1200×25² = ½×1200×625 = 375 000 J = 375 kJ'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Conservation de l\'énergie mécanique',enonce:'Une bille de 50 g est lancée verticalement vers le haut à v₀ = 10 m/s depuis h = 0. g = 10 m/s². Trouver h_max.',correction:'Conservation : Em_i = Em_f\n½mv₀² + 0 = 0 + mgh_max\nh_max = v₀²/(2g) = 100/(20) = 5 m'},
    ],
  },

  'bilans-energetiques-2': {
    ch:'CH 09', titre:'Bilans & Conversions d\'énergie', badge:'Énergie', duree:'~3h', section:'Section 4 — Conversions & Transferts',
    desc:'Bilan de puissance dans un circuit électrique, rendement d\'un convertisseur d\'énergie.',
    theoremes:[
      {id:'D1',type:'def',nom:'Rendement d\'un convertisseur',enonce:'Le rendement η traduit l\'efficacité d\'une conversion :\n\nη = E_utile / E_fournie = P_utile / P_fournie\n0 ≤ η ≤ 1 (souvent en %)\n\nÉnergies perdues (chaleur, frottements…) = E_fournie − E_utile\n\nExemples :\n• Moteur à essence : η ≈ 30–40%\n• Moteur électrique : η ≈ 85–95%\n• Panneau solaire : η ≈ 15–22%\n• LED : η ≈ 80–90% (vs ampoule incandescente : ~5%)'},
      {id:'F1',type:'formule',nom:'Chaîne énergétique',enonce:'Une chaîne énergétique représente les conversions successives d\'énergie.\n\nEx : centrale électrique :\nÉnergie chimique (fuel) → Énergie thermique → Énergie mécanique → Énergie électrique\n\nRendement global : η_global = η₁ × η₂ × η₃ × …\n\nBilan énergie électrique :\nE_élec = U × I × t\n→ Facture EDF en kWh : 1 kWh = 3,6 × 10⁶ J'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Rendement d\'un moteur',enonce:'Un moteur électrique absorbe P = 800 W et fournit P_mec = 600 W. Calculer η et les pertes.',correction:'η = P_mec/P = 600/800 = 0,75 = 75%\nPertes = 800 − 600 = 200 W (par effet Joule)'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Consommation électrique',enonce:'Un climatiseur de 2000 W fonctionne 6h par jour pendant 30 jours. Calculer la consommation en kWh et le coût à 0,22 €/kWh.',correction:'E = P×t = 2 kW × (6×30 h) = 2×180 = 360 kWh\nCoût = 360 × 0,22 = 79,20 €'},
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
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(16,185,129,0.15)', color:'#34d399', fontWeight:700 }}>Seconde — Enseignement commun</span>
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
                        <Link href={`/solve?q=${encodeURIComponent('Seconde PC France, '+ch.titre+' — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:12, padding:'6px 14px' }}>
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
                  <Link href={`/bac-france/physique/seconde/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'13px 16px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/seconde/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                <div style={{ padding:'11px 15px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>⚛️ Seconde — 9 chapitres</div>
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
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+ch.titre+' en Seconde')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
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