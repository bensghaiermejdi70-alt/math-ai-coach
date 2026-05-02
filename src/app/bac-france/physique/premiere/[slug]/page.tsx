'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE PREMIÈRE / [SLUG]
// Route : /bac-france/physique/premiere/[slug]
// Programme officiel Première Spécialité PC · Bac 2027
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'quantite-matiere',
  'reactions-redox',
  'structure-entites',
  'loi-coulomb',
  'fluides',
  'deuxieme-loi-newton-approche',
  'energie-mecanique',
  'bilans-energetiques',
  'energie-chimique-thermique',
  'ondes-mecaniques',
  'ondes-sonores',
  'ondes-electromagnetiques',
  'signaux-electriques',
]

const TITRES: Record<string,string> = {
  'quantite-matiere':           'Quantité de matière & Réactions',
  'reactions-redox':            'Réactions d\'oxydo-réduction',
  'structure-entites':          'Structure des entités & Propriétés physiques',
  'loi-coulomb':                'Loi de Coulomb & Champs',
  'fluides':                    'Fluides au repos',
  'deuxieme-loi-newton-approche':'2ème loi de Newton (approche)',
  'energie-mecanique':          'Aspects énergétiques mécaniques',
  'bilans-energetiques':        'Bilans énergétiques',
  'energie-chimique-thermique': 'Énergie chimique & thermique',
  'ondes-mecaniques':           'Ondes mécaniques progressives',
  'ondes-sonores':              'Ondes sonores',
  'ondes-electromagnetiques':   'Ondes électromagnétiques & couleurs',
  'signaux-electriques':        'Signaux électriques & numérisation',
}

const SEC_COLOR: Record<string,string> = {
  'quantite-matiere':'#10b981','reactions-redox':'#10b981','structure-entites':'#10b981',
  'loi-coulomb':'#4f6ef7','fluides':'#4f6ef7','deuxieme-loi-newton-approche':'#4f6ef7',
  'energie-mecanique':'#f59e0b','bilans-energetiques':'#f59e0b','energie-chimique-thermique':'#f59e0b',
  'ondes-mecaniques':'#8b5cf6','ondes-sonores':'#8b5cf6','ondes-electromagnetiques':'#8b5cf6','signaux-electriques':'#8b5cf6',
}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string;
  theoremes:{id:string; type:string; nom:string; enonce?:string; titre?:string; legende?:string; svg?:string}[];
  exercices:{id:string; niveau:string; titre:string; enonce:string; correction:string}[];
}> = {

  'quantite-matiere': {
    ch:'CH 01', titre:'Quantité de matière & Réactions', badge:'Chimie', duree:'~5h', section:'Section 1 — Constitution & Transformations',
    desc:'La mole est l\'unité de quantité de matière. Le tableau d\'avancement permet de suivre l\'évolution d\'un système chimique et de déterminer le réactif limitant.',
    theoremes:[
      {id:'D1',type:'def',nom:'La mole et ses relations',enonce:'La mole (mol) est la quantité de matière contenant N_A = 6,02×10²³ entités (atomes, molécules, ions…).\n\nRelations fondamentales :\nn = m/M          (masse molaire M en g/mol)\nn = V/Vm         (volume molaire Vm = 22,4 L/mol aux CNT)\nn = c×V_solution  (concentration molaire c en mol/L)\n\nMasse volumique : ρ = m/V  →  n = ρ·V/M'},
      {id:'F1',type:'formule',nom:'Tableau d\'avancement',enonce:'Pour la réaction : aA + bB → cC + dD\n\nÉtat initial (x=0) : n₀(A), n₀(B), 0, 0\nÉtat intermédiaire : n₀(A)−ax, n₀(B)−bx, cx, dx\nÉtat final (x_max) : atteint quand le réactif limitant est épuisé.\n\nRéactif limitant : celui qui s\'épuise en premier.\nx_max = min[ n₀(A)/a ; n₀(B)/b ]\n\nTaux d\'avancement final : τ = x_max/x_max_theorique\nTaux = 1 → réaction totale ; taux < 1 → réaction limitée'},
      {id:'P1',type:'prop',nom:'Concentrations et dilution',enonce:'Concentration molaire : c = n/V  (mol/L)\nConcentration massique : t = m/V  (g/L)\nRelation : c = t/M\n\nDilution : c₁V₁ = c₂V₂\n(la quantité de matière est conservée lors d\'une dilution)\n\nVérification d\'une équation : conservation de la masse et des charges.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul de quantité de matière',enonce:'On dissout 5,85 g de NaCl (M = 58,5 g/mol) dans 250 mL d\'eau. Calculer n(NaCl) et c(NaCl).',correction:'n = m/M = 5,85/58,5 = 0,100 mol\nc = n/V = 0,100/(250×10⁻³) = 0,400 mol/L'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Réactif limitant',enonce:'On mélange n(A) = 0,3 mol et n(B) = 0,4 mol. Réaction : 2A + 3B → produits. Quel est le réactif limitant ? Calculer x_max.',correction:'x_max limité par A : 0,3/2 = 0,150 mol\nx_max limité par B : 0,4/3 = 0,133 mol\nLe réactif limitant est B (donne le plus petit x_max)\nx_max = 0,133 mol'},
      {id:'EX03',niveau:'Difficile',titre:'Dilution en chaîne',enonce:'On prépare une solution S₁ à c₁ = 0,50 mol/L en prélevant V₀ = 20 mL d\'une solution mère à c₀ = 2,5 mol/L. Vérifier. Puis on dilue 10 fois S₁ pour obtenir S₂. Calculer c₂.',correction:'c₁V₁ = c₀V₀ : c₁ = c₀V₀/V_final = 2,5×0,020/0,100 = 0,50 mol/L ✓\nc₂ = c₁/10 = 0,050 mol/L'},
    ],
  },

  'reactions-redox': {
    ch:'CH 02', titre:'Réactions d\'oxydo-réduction', badge:'Chimie', duree:'~4h', section:'Section 1 — Constitution & Transformations',
    desc:'Une réaction rédox implique un transfert d\'électrons entre un oxydant et un réducteur. L\'équilibrage des demi-équations permet d\'écrire l\'équation bilan.',
    theoremes:[
      {id:'D1',type:'def',nom:'Couple oxydant/réducteur',enonce:'Oxydant (Ox) : espèce pouvant accepter des électrons.\nRéducteur (Red) : espèce pouvant céder des électrons.\n\nDemi-équation : Ox + ne⁻ ⇌ Red\n\nExemples :\nCu²⁺/Cu : Cu²⁺ + 2e⁻ → Cu\nFe³⁺/Fe²⁺ : Fe³⁺ + e⁻ → Fe²⁺\nMnO₄⁻/Mn²⁺ : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O'},
      {id:'M1',type:'methode',nom:'Équilibrage des équations rédox',enonce:'Méthode en milieu acide :\n1. Écrire les deux demi-équations électroniques\n2. Équilibrer les atomes (O avec H₂O, H avec H⁺)\n3. Équilibrer les charges avec e⁻\n4. Multiplier les demi-équations pour éliminer les électrons\n5. Additionner : équation globale\n\nRègle : le réducteur cède des e⁻ à l\'oxydant.\nOx1 + Red2 → Red1 + Ox2'},
      {id:'F1',type:'formule',nom:'Nombre d\'oxydation (NO)',enonce:'Le NO indique la charge fictive d\'un atome en supposant les liaisons ioniques.\n\nRègles :\n• Métal pur : NO = 0\n• Ion monoatomique : NO = charge de l\'ion\n• H : NO = +I (sauf hydrures : −I)\n• O : NO = −II (sauf H₂O₂ : −I)\n• Somme des NO dans un composé = charge totale\n\nOxydation : augmentation du NO (perte e⁻)\nRéduction : diminution du NO (gain e⁻)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Demi-équation électronique',enonce:'Écrire la demi-équation de réduction de Cr₂O₇²⁻ en Cr³⁺ en milieu acide.',correction:'Cr₂O₇²⁻ → 2Cr³⁺\nÉquilibrer O avec H₂O : Cr₂O₇²⁻ → 2Cr³⁺ + 7H₂O\nÉquilibrer H avec H⁺ : Cr₂O₇²⁻ + 14H⁺ → 2Cr³⁺ + 7H₂O\nÉquilibrer charges avec e⁻ : charge gauche = −2+14 = +12 ; droite = +6\nCr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Équation bilan rédox',enonce:'Écrire l\'équation de la réaction entre MnO₄⁻/Mn²⁺ et Fe²⁺/Fe³⁺ en milieu acide.',correction:'Réduction : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O  (×1)\nOxydation : Fe²⁺ → Fe³⁺ + e⁻  (×5)\nBilan : MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺'},
    ],
  },

  'structure-entites': {
    ch:'CH 03', titre:'Structure des entités & Propriétés physiques', badge:'Chimie', duree:'~5h', section:'Section 1 — Constitution & Transformations',
    desc:'La géométrie des molécules (modèle VSEPR) et les interactions intermoléculaires expliquent les propriétés physiques des substances (solubilité, température d\'ébullition…).',
    theoremes:[
      {id:'D1',type:'def',nom:'Schémas de Lewis et VSEPR',enonce:'Schéma de Lewis : représentation des liaisons et des doublets non liants.\nRègles :\n• Octet pour les atomes de la 2e période (sauf H : duet)\n• Liaisons simples, doubles ou triples\n\nModèle VSEPR : les doublets se repoussent au maximum.\nGeométries :\n• 4 doublets liants + 0 non liant → tétraédrique (H₂O non, CH₄ oui)\n• 3 liants + 1 non liant → pyramide trigonale (NH₃)\n• 2 liants + 2 non liants → coudée (H₂O)\n• 3 liants + 0 non liant → trigonale plane (BF₃)\n• 2 liants + 0 non liant → linéaire (CO₂, BeCl₂)'},
      {id:'D2',type:'def',nom:'Électronégativité et polarité',enonce:'Électronégativité χ : tendance d\'un atome à attirer les électrons d\'une liaison.\n→ croît de gauche à droite et de bas en haut dans le tableau périodique.\nF > O > N > Cl > Br > C ≈ H\n\nLiaison polaire : Δχ > 0,4 → création d\'un dipôle δ⁺—δ⁻\nMolécule polaire : liaisons polaires non compensées par la géométrie.\n→ H₂O polaire (coudée) ; CO₂ apolaire (linéaire, symétrie)\n\nMoment dipolaire μ = q × d  (en Debye, D)'},
      {id:'P1',type:'prop',nom:'Interactions intermoléculaires',enonce:'1. Liaison hydrogène : X−H···Y (X, Y = F, O, N)\nForte (5–40 kJ/mol) → élève T_éb, explique les anomalies de l\'eau.\n\n2. Interactions de Van der Waals (dipôle-dipôle, London) :\n→ Plus la molécule est grande/polarisable, plus elles sont fortes.\n\n3. Forces électrostatiques (ion–dipôle, ion–ion) : les plus fortes.\n\nConséquences :\n• T_éb croît avec la force des interactions\n• Solubilité : "les semblables dissolvent les semblables"\n  − Solvant polaire (eau) → solubilise les solutés polaires/ioniques\n  − Solvant apolaire (hexane) → solubilise les solutés apolaires'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Géométrie VSEPR',enonce:'Donner la géométrie de NH₃ et de H₂O en appliquant le modèle VSEPR.',correction:'NH₃ : N entouré de 3 liaisons N−H et 1 doublet non liant\n→ 4 doublets au total → arrangement tétraédrique\n→ Géométrie : pyramide trigonale\n\nH₂O : O entouré de 2 liaisons O−H et 2 doublets non liants\n→ 4 doublets → arrangement tétraédrique\n→ Géométrie : coudée (angle ≈ 104,5°)'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Polarité et solubilité',enonce:'Parmi l\'éthanol (CH₃CH₂OH) et le cyclohexane (C₆H₁₂), lequel est miscible à l\'eau ? Justifier.',correction:'L\'eau est polaire et forme des liaisons hydrogène.\nL\'éthanol possède un groupe −OH polaire → liaisons H avec l\'eau → miscible.\nLe cyclohexane est apolaire (C et H, Δχ faible) → pas d\'interactions avec l\'eau → non miscible.'},
    ],
  },

  'loi-coulomb': {
    ch:'CH 04', titre:'Loi de Coulomb & Champs', badge:'Physique', duree:'~5h', section:'Section 2 — Mouvement & Interactions',
    desc:'Deux interactions fondamentales à longue portée : gravitationnelle et électrostatique. Elles sont décrites par des champs vectoriels.',
    theoremes:[
      {id:'T1',type:'thm',nom:'Loi de Coulomb',enonce:'Force électrostatique entre deux charges ponctuelles q₁ et q₂ distantes de r :\n\nF = k × |q₁||q₂|/r²\n\nk = 1/(4πε₀) ≈ 9,0×10⁹ N·m²·C⁻²\nε₀ = 8,85×10⁻¹² F/m (permittivité du vide)\n\nCaractéristiques :\n• Si q₁ et q₂ de mêmes signes → répulsion\n• Si signes opposés → attraction\n• Direction : droite reliant les deux charges\n• F₁₂ = −F₂₁ (3ème loi de Newton)'},
      {id:'T2',type:'thm',nom:'Loi de Newton — Gravitation',enonce:'Force gravitationnelle entre deux masses m₁ et m₂ distantes de r :\n\nF = G × m₁m₂/r²\n\nG = 6,674×10⁻¹¹ N·m²·kg⁻²\n\nToujours attractive.\nTrès faible comparée à Coulomb (facteur ~10³⁶)\n\nPoids : P = mg  avec  g = GM_Terre/R_Terre² ≈ 9,8 m/s²'},
      {id:'D1',type:'def',nom:'Champs électrique et gravitationnel',enonce:'Champ électrique E⃗ créé par une charge Q en un point M distant r :\nE = kQ/r²  (N/C ou V/m)\nDirection : radial à partir de Q\n\nForce sur une charge q dans le champ E⃗ : F⃗ = qE⃗\n\nChamp de pesanteur g⃗ :\nF⃗ = mg⃗\ng⃗ uniforme près de la surface terrestre\n\nLignes de champ : tangentes au vecteur champ en chaque point\n→ Champ uniforme : lignes parallèles et équidistantes'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Force de Coulomb',enonce:'Deux protons (q = 1,6×10⁻¹⁹ C) sont distants de r = 1,0×10⁻¹⁵ m (rayon nucléaire). Calculer F_coulomb. (k = 9×10⁹)',correction:'F = k×q²/r² = 9×10⁹×(1,6×10⁻¹⁹)²/(10⁻¹⁵)²\nF = 9×10⁹×2,56×10⁻³⁸/10⁻³⁰\nF = 9×2,56×10⁹⁻³⁸⁺³⁰ = 23×10¹ ≈ 230 N\nEnorme ! C\'est pourquoi il faut la force nucléaire forte pour maintenir le noyau.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Champ électrique uniforme',enonce:'Un électron (m = 9,1×10⁻³¹ kg, q = −1,6×10⁻¹⁹ C) est placé dans un champ E = 1000 V/m. Calculer l\'accélération.',correction:'F = qE = 1,6×10⁻¹⁹×1000 = 1,6×10⁻¹⁶ N\na = F/m = 1,6×10⁻¹⁶/9,1×10⁻³¹ ≈ 1,76×10¹⁴ m/s²\nDirection opposée à E⃗ (car charge négative).'},
    ],
  },

  'fluides': {
    ch:'CH 05', titre:'Fluides au repos', badge:'Mécanique des fluides', duree:'~3h', section:'Section 2 — Mouvement & Interactions',
    desc:'Hydrostatique : pression dans un fluide en équilibre, théorème de Pascal, poussée d\'Archimède et modèle du gaz parfait.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Pression dans un fluide',enonce:'Pression hydrostatique à la profondeur h :\nP = P₀ + ρgh\n\nP₀ = pression à la surface (Pa)\nρ = masse volumique du fluide (kg/m³)\ng ≈ 9,8 m/s²\nh = profondeur (m)\n\nThéorème de Pascal : toute variation de pression en un point d\'un fluide incompressible au repos se transmet intégralement en tout point du fluide.\n→ Application : vérin hydraulique, frein hydraulique\nF₁/S₁ = F₂/S₂'},
      {id:'T1',type:'thm',nom:'Poussée d\'Archimède',enonce:'Tout corps plongé dans un fluide subit de la part du fluide une force verticale, dirigée vers le haut, appelée poussée d\'Archimède :\n\nF_A = ρ_fluide × V_immergé × g\n\nρ_fluide : masse volumique du fluide\nV_immergé : volume du corps dans le fluide\n\nConditions :\n• Corps flotte : F_A = P  →  ρ_corps = ρ_fluide × V_immergé/V_total\n• Corps coule : F_A < P  →  ρ_corps > ρ_fluide\n• Corps remonte : F_A > P  →  ρ_corps < ρ_fluide'},
      {id:'F2',type:'formule',nom:'Modèle du gaz parfait',enonce:'Équation d\'état : PV = nRT\n\nP en Pa, V en m³, n en mol, T en K\nR = 8,314 J·mol⁻¹·K⁻¹\n\nConversion : T(K) = T(°C) + 273,15\n\nTransformations :\nIsotherme (T cte) : P₁V₁ = P₂V₂\nIsobare (P cte) : V₁/T₁ = V₂/T₂\nIsochore (V cte) : P₁/T₁ = P₂/T₂'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Pression sous l\'eau',enonce:'Calculer la pression à 10 m de profondeur dans la mer. P₀ = 10⁵ Pa, ρ_eau = 1025 kg/m³, g = 9,8 m/s².',correction:'P = P₀ + ρgh = 10⁵ + 1025×9,8×10 = 10⁵ + 100450 ≈ 2,00×10⁵ Pa = 2 bars\nLa pression double tous les ~10 m en mer.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Flottabilité',enonce:'Un iceberg de densité ρ_glace = 917 kg/m³ flotte dans l\'eau de mer ρ_mer = 1025 kg/m³. Quelle fraction est immergée ?',correction:'À l\'équilibre : F_A = P → ρ_mer × V_immergé × g = ρ_glace × V_total × g\nV_immergé/V_total = ρ_glace/ρ_mer = 917/1025 ≈ 0,895 = 89,5%\nEnviron 90% de l\'iceberg est immergé. ✓'},
    ],
  },

  'deuxieme-loi-newton-approche': {
    ch:'CH 06', titre:'2ème loi de Newton (approche)', badge:'Mécanique', duree:'~4h', section:'Section 2 — Mouvement & Interactions',
    desc:'Introduction qualitative à la relation force–accélération, mouvements dans un champ uniforme de pesanteur ou électrique.',
    theoremes:[
      {id:'T1',type:'thm',nom:'2ème loi de Newton',enonce:'Dans un référentiel galiléen :\nΣF⃗_ext = m × a⃗\n\nProjections :\nΣFₓ = m·aₓ\nΣFᵧ = m·aᵧ\n\n1ère loi (inertie) : si ΣF⃗ = 0⃗ alors a⃗ = 0⃗\n→ Le corps est en MRU (ou au repos).\n\n3ème loi : action-réaction\nF⃗(A→B) = −F⃗(B→A) : forces égales et opposées.'},
      {id:'M1',type:'methode',nom:'Mouvement parabolique',enonce:'Projectile lancé avec v₀ à l\'angle α (champ g uniforme, sans frottements) :\n\nSuivant x (pas de force) :\naₓ = 0 → vₓ = v₀cosα → x = v₀cosα·t\n\nSuivant y (poids seul) :\naᵧ = −g → vᵧ = v₀sinα − gt → y = v₀sinα·t − ½gt²\n\nTrajectoire parabolique :\ny = x·tanα − gx²/(2v₀²cos²α)\n\nPortée : R = v₀²sin(2α)/g  (max pour α = 45°)\nHauteur maximale : H = v₀²sin²α/(2g)'},
      {id:'D1',type:'def',nom:'Mouvement dans un champ électrique uniforme',enonce:'Particule de charge q et masse m dans un champ E⃗ uniforme :\nForce : F⃗ = qE⃗\n\nSi E⃗ vertical (condensateur plan horizontal) :\nL\'électron suit une trajectoire parabolique identique à celle sous pesanteur.\n→ Accélération verticale : a = qE/m\n\nApplication : tubes cathodiques, accélérateurs de particules.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Chute libre',enonce:'Un objet est lâché sans vitesse initiale depuis h = 45 m. g = 10 m/s². Durée de chute et vitesse d\'impact ?',correction:'h = ½gt² → t = √(2h/g) = √(90/10) = 3 s\nv = g×t = 10×3 = 30 m/s'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Projectile',enonce:'Un ballon est lancé avec v₀ = 15 m/s à α = 45°. g = 10 m/s². Calculer H_max et la portée R.',correction:'H = v₀²sin²α/(2g) = 225×(0,707)²/20 = 225×0,5/20 = 5,63 m\nR = v₀²sin(2α)/g = 225×sin90°/10 = 225/10 = 22,5 m'},
    ],
  },

  'energie-mecanique': {
    ch:'CH 07', titre:'Aspects énergétiques mécaniques', badge:'Énergie', duree:'~5h', section:'Section 3 — Énergie',
    desc:'Travail d\'une force, théorème de l\'énergie cinétique, énergie potentielle de pesanteur, conservation de l\'énergie mécanique.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Travail d\'une force',enonce:'Travail d\'une force constante F⃗ sur un déplacement d⃗ :\nW = F·d·cosα\n\nα = angle entre F⃗ et d⃗\n\nW > 0 : force motrice (dans le sens du déplacement)\nW < 0 : force résistante (opposée au déplacement)\nW = 0 : force perpendiculaire au déplacement (ex : force normale)\n\nTravail du poids : W_P = mgΔh (positif si descente, négatif si montée)\nTravail de la tension d\'un fil : W_T = 0 (perpendiculaire au mouvement circulaire)'},
      {id:'T1',type:'thm',nom:'Théorème de l\'énergie cinétique',enonce:'La variation d\'énergie cinétique d\'un système est égale à la somme des travaux de toutes les forces :\n\nΔEc = Σ W(forces)\nEc_f − Ec_i = W_total\n\nAvec : Ec = ½mv²  (Joules)\n\nSi le mouvement est freiné (frottements) : ΔEc = W_poids + W_frottement\n\nCas particulier : si les forces sont conservatives → énergie mécanique conservée.'},
      {id:'F2',type:'formule',nom:'Énergie mécanique',enonce:'Énergie potentielle de pesanteur (origine choisie à z = 0) :\nEp = mgz  (Joules)\n\nÉnergie mécanique :\nEm = Ec + Ep = ½mv² + mgz\n\nConservation : si forces non conservatives (frottements) nulles :\nEm = cte  →  ½mv₁² + mgz₁ = ½mv₂² + mgz₂\n\nSi frottements : ΔEm = W_frottements < 0\n(l\'énergie mécanique diminue, convertie en chaleur)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Travail du poids',enonce:'Un objet de 2 kg tombe de h = 5 m. Calculer W_poids et v à l\'impact (départ au repos, sans frottements). g = 10 m/s².',correction:'W_poids = mgh = 2×10×5 = 100 J\nThéorème Ec : ΔEc = W_poids → ½mv² − 0 = 100 J\nv² = 200/2 = 100 → v = 10 m/s\n(Vérification par Em : ½mv² = mgh ✓)'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Piste avec frottements',enonce:'Un skieur de 70 kg dévale une piste de h = 80 m. Il arrive avec v = 35 m/s. g = 10 m/s². Calculer le travail des frottements et la force résistante si la pente mesure 500 m.',correction:'ΔEm = Em_f − Em_i = ½×70×35² − 70×10×80 = 42875 − 56000 = −13125 J\nW_frottements = −13125 J\nf = |W_f|/d = 13125/500 = 26,25 N'},
    ],
  },

  'bilans-energetiques': {
    ch:'CH 08', titre:'Bilans énergétiques', badge:'Énergie', duree:'~4h', section:'Section 3 — Énergie',
    desc:'Bilan de puissance dans un circuit électrique, effet Joule, rendement d\'un convertisseur d\'énergie.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Puissance et énergie électrique',enonce:'Puissance électrique reçue par un dipôle :\nP = U × I  (Watts)\nU en Volts, I en Ampères\n\nÉnergie électrique : E = P × t  (Joules)\nAlternativement : E = U × I × t\n\nEffet Joule (résistance R) :\nP_Joule = R × I² = U²/R\n\nLoi d\'Ohm : U = R × I\n\nLouis d\'association :\nRérie : R_éq = R₁ + R₂ + …\nParallèle : 1/R_éq = 1/R₁ + 1/R₂ + …'},
      {id:'D1',type:'def',nom:'Rendement d\'un convertisseur',enonce:'Le rendement η traduit l\'efficacité d\'une conversion d\'énergie :\n\nη = P_utile / P_absorbée = E_utile / E_absorbée\n\n0 ≤ η ≤ 1  (souvent exprimé en %)\n\nP_perdue = P_absorbée − P_utile\n\nExemples :\n• Moteur électrique : énergie élec → énergie mécanique + chaleur\n• Panneau solaire : énergie lumineuse → énergie électrique (η ≈ 15–22%)\n• LED : énergie élec → lumière (η ≈ 90% vs 5% pour incandescence)'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Puissance électrique',enonce:'Un radiateur de 2000 W fonctionne 3h. Calculer l\'énergie consommée en Joules et en kWh. Coût si 1 kWh = 0,20 €.',correction:'E = P×t = 2000×3×3600 = 21 600 000 J = 21,6 MJ\nE = 2 kW × 3 h = 6 kWh\nCoût = 6 × 0,20 = 1,20 €'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Rendement d\'un moteur',enonce:'Un moteur électrique absorbe P_abs = 500 W. Il soulève une charge de 20 kg à v = 1 m/s. g = 10 m/s². Calculer η.',correction:'P_utile = F×v = P×v = mG×v = 20×10×1 = 200 W\nη = P_utile/P_abs = 200/500 = 0,40 = 40%\nPerte thermique : 500 − 200 = 300 W par effet Joule.'},
    ],
  },

  'energie-chimique-thermique': {
    ch:'CH 09', titre:'Énergie chimique & thermique', badge:'Énergie', duree:'~4h', section:'Section 3 — Énergie',
    desc:'Énergie de réaction, pouvoir calorifique, bilan thermique. Transferts thermiques dans le corps humain.',
    theoremes:[
      {id:'F1',type:'formule',nom:'Énergie thermique',enonce:'Énergie échangée lors d\'une variation de température :\nQ = m × Cp × ΔT\n\nm = masse (kg ou g), Cp = capacité thermique massique, ΔT en K ou °C\n\nValeurs usuelles :\n• Eau : Cp = 4 186 J·kg⁻¹·K⁻¹ ≈ 4,18 J·g⁻¹·K⁻¹\n• Aluminium : Cp ≈ 900 J·kg⁻¹·K⁻¹\n• Fer : Cp ≈ 450 J·kg⁻¹·K⁻¹\n\nMélange : Q_perdu + Q_reçu = 0  (conservation de l\'énergie)'},
      {id:'D1',type:'def',nom:'Énergie de combustion',enonce:'Énergie libérée par la combustion complète d\'une masse m de combustible :\nQ = m × Pci\n\nPci = pouvoir calorifique inférieur (J/kg ou MJ/kg)\nValeurs approximatives :\n• Méthane : Pci ≈ 50 MJ/kg\n• Essence : Pci ≈ 43 MJ/kg\n• Bois sec : Pci ≈ 15 MJ/kg\n• Hydrogène : Pci ≈ 120 MJ/kg\n\nRendement thermique d\'un moteur thermique : η = W_utile/(m×Pci)'},
      {id:'P1',type:'prop',nom:'Bilan thermique du corps humain',enonce:'Le corps humain est un convertisseur d\'énergie chimique :\nMétabolisme de base ≈ 80 W (au repos)\nEffort intense : jusqu\'à 1000 W\n\nÉchanges de chaleur :\n• Conduction : par contact direct\n• Convection : par déplacement de fluide (air, eau)\n• Rayonnement : infrarouge (important pour le maintien de la T°)\n• Évaporation : transpiration (refroidissement efficace)\n\nRégulation : la T° centrale est maintenue à 37°C (homéothermie).'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Chauffe-eau',enonce:'Un chauffe-eau chauffe 200 L d\'eau de 15°C à 60°C. Cp(eau) = 4186 J·kg⁻¹·K⁻¹. Calculer l\'énergie nécessaire.',correction:'m = ρ×V = 1×200 = 200 kg\nQ = mCpΔT = 200×4186×(60−15) = 200×4186×45 = 37 674 000 J ≈ 37,7 MJ'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Mélange thermique',enonce:'On mélange 100 g d\'eau à 80°C et 200 g d\'eau à 20°C. Trouver T_mélange.',correction:'Q_perdu + Q_reçu = 0\n100×4,18×(T_f−80) + 200×4,18×(T_f−20) = 0\n100(T_f−80) + 200(T_f−20) = 0\n100T_f − 8000 + 200T_f − 4000 = 0\n300T_f = 12000\nT_f = 40°C'},
    ],
  },

  'ondes-mecaniques': {
    ch:'CH 10', titre:'Ondes mécaniques progressives', badge:'Ondes', duree:'~4h', section:'Section 4 — Ondes & Signaux',
    desc:'Propagation d\'une onde mécanique, grandeurs caractéristiques (célérité, période, longueur d\'onde), retard temporel.',
    theoremes:[
      {id:'D1',type:'def',nom:'Onde mécanique progressive',enonce:'Une onde mécanique est la propagation d\'une perturbation dans un milieu matériel sans transport de matière.\n\nTypes :\n• Onde transversale : vibration ⊥ à la propagation (corde, eau, ondes S sismiques)\n• Onde longitudinale : vibration ∥ à la propagation (son, ondes P sismiques)\n\nCaractéristiques d\'une onde sinusoïdale :\n• T = période (s)\n• f = 1/T = fréquence (Hz)\n• λ = longueur d\'onde (m) : distance parcourue en une période\n• v = célérité (m/s) : vitesse de propagation'},
      {id:'F1',type:'formule',nom:'Relations fondamentales',enonce:'Relation célérité – longueur d\'onde – fréquence :\nv = λ × f = λ/T\n\nRetard temporel : lorsqu\'une onde parcourt une distance d :\nτ = d/v\n\nExpression d\'une onde : y(x,t) = A·sin[2π(t/T − x/λ)]\nA = amplitude\n\nCélérités caractéristiques :\n• Son dans l\'air : v ≈ 340 m/s (20°C)\n• Son dans l\'eau : v ≈ 1500 m/s\n• Lumière dans le vide : c = 3×10⁸ m/s'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Longueur d\'onde du son',enonce:'Un son de fréquence f = 1 700 Hz se propage à v = 340 m/s. Calculer λ.',correction:'λ = v/f = 340/1700 = 0,20 m = 20 cm'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Retard temporel – éclair/tonnerre',enonce:'On observe un éclair et on entend le tonnerre 4,5 s plus tard. v_son = 340 m/s. Quelle est la distance de l\'orage ?',correction:'d = v × τ = 340 × 4,5 = 1530 m ≈ 1,5 km'},
    ],
  },

  'ondes-sonores': {
    ch:'CH 11', titre:'Ondes sonores', badge:'Ondes', duree:'~4h', section:'Section 4 — Ondes & Signaux',
    desc:'Caractéristiques des sons purs et composés, analyse spectrale, niveau d\'intensité sonore en décibels.',
    theoremes:[
      {id:'D1',type:'def',nom:'Son pur et son composé',enonce:'Son pur : vibration sinusoïdale d\'une seule fréquence f.\n→ Produit par un diapason.\n\nSon composé (musical) : superposition d\'un fondamental f₀ et d\'harmoniques kf₀ (k entier).\n→ Le timbre d\'un instrument dépend des harmoniques présentes et de leurs amplitudes.\n→ Hauteur : déterminée par f₀\n→ Timbre : déterminé par le spectre harmonique\n→ Intensité : liée à l\'amplitude'},
      {id:'F1',type:'formule',nom:'Niveau d\'intensité sonore',enonce:'Niveau d\'intensité sonore L (en décibels, dB) :\nL = 10 × log(I/I₀)\n\nI₀ = 10⁻¹² W/m² = seuil d\'audibilité\nI = intensité sonore (W/m²)\n\nValeurs typiques :\n• Conversation normale : 60 dB\n• Circulation : 70–80 dB\n• Concert rock : 110–120 dB\n• Seuil de douleur : 130 dB\n\nAddition d\'intensités (sources incohérentes) : I_tot = I₁ + I₂\n→ Doubler I : +3 dB ; multiplier I par 10 : +10 dB'},
      {id:'P1',type:'prop',nom:'Analyse spectrale',enonce:'Le spectre d\'un son représente l\'amplitude de chaque fréquence.\n\nSon pur : 1 seule raie à f\nSon musical : raies à f₀, 2f₀, 3f₀, …\nSon complexe (bruit) : spectre continu\n\nTransformée de Fourier : décompose tout signal périodique en somme de sinusoïdes.\n\nApplications :\n• Synthèse vocale : reproduction du spectre de la voix\n• Audiométrie : mesure de l\'acuité auditive par fréquence\n• Acoustique musicale'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Calcul de niveau sonore',enonce:'I = 10⁻⁵ W/m². Calculer L en dB. I₀ = 10⁻¹² W/m².',correction:'L = 10×log(10⁻⁵/10⁻¹²) = 10×log(10⁷) = 10×7 = 70 dB'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Doublement de sources',enonce:'Un haut-parleur produit 60 dB. On ajoute un 2ème haut-parleur identique. Quel est le nouveau niveau sonore ?',correction:'I₁ correspond à 60 dB, I₂ = I₁\nI_total = 2I₁\nL = 10×log(2I₁/I₀) = 10×log(I₁/I₀) + 10×log2 = 60 + 10×0,301 = 60 + 3 = 63 dB'},
    ],
  },

  'ondes-electromagnetiques': {
    ch:'CH 12', titre:'Ondes électromagnétiques & couleurs', badge:'Optique', duree:'~3h', section:'Section 4 — Ondes & Signaux',
    desc:'Le spectre électromagnétique, la lumière visible, les synthèses additive et soustractive des couleurs.',
    theoremes:[
      {id:'D1',type:'def',nom:'Spectre électromagnétique',enonce:'Les ondes EM se propagent dans le vide à c = 3×10⁸ m/s.\nClassement par λ croissante (f décroissante) :\nRayons γ → Rayons X → UV → Visible → IR → Micro-ondes → Radio\n\nLumière visible : 400 nm (violet) → 700 nm (rouge)\nCouleurs : violet (400), bleu (450), vert (550), jaune (580), orange (610), rouge (700)\n\nÉnergie d\'un photon : E = hf = hc/λ\nh = 6,63×10⁻³⁴ J·s (constante de Planck)'},
      {id:'P1',type:'prop',nom:'Synthèse additive et soustractive',enonce:'Synthèse additive (lumières colorées) :\nCouleurs primaires : rouge (R), vert (V), bleu (B)\nR + V + B = blanc\nR + V = jaune ; R + B = magenta ; V + B = cyan\n→ Utilisée par les écrans (LCD, OLED)\n\nSynthèse soustractive (colorants, filtres, pigments) :\nCouleurs primaires : cyan (C), magenta (M), jaune (Y)\nC + M + Y = noir (théorique)\n→ Utilisée en impression\n\nCouleur d\'un objet :\nÉclairage blanc → l\'objet absorbe certaines λ et réfléchit les autres.\nEx : un objet vert absorbe R et B, réfléchit V.'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Fréquence d\'une lumière',enonce:'La lumière verte a λ = 550 nm. Calculer f et l\'énergie d\'un photon. h = 6,63×10⁻³⁴ J·s.',correction:'f = c/λ = 3×10⁸/(550×10⁻⁹) = 5,45×10¹⁴ Hz\nE = hf = 6,63×10⁻³⁴×5,45×10¹⁴ = 3,61×10⁻¹⁹ J'},
      {id:'EX02',niveau:'Facile',titre:'Synthèse additive',enonce:'Quelles couleurs primaires doit-on mélanger (synthèse additive) pour obtenir du cyan et du jaune ?',correction:'Cyan = vert + bleu (V + B)\nJaune = rouge + vert (R + V)'},
    ],
  },

  'signaux-electriques': {
    ch:'CH 13', titre:'Signaux électriques & numérisation', badge:'Numérique', duree:'~4h', section:'Section 4 — Ondes & Signaux',
    desc:'Signal analogique vs signal numérique, numérisation par échantillonnage et quantification, critère de Shannon.',
    theoremes:[
      {id:'D1',type:'def',nom:'Signal analogique et numérique',enonce:'Signal analogique : valeur continue, peut prendre une infinité de valeurs entre deux bornes.\n→ Ex : tension d\'un microphone, température, pression…\n\nSignal numérique : valeur discrète, représenté par des 0 et des 1 (bits).\n→ Plus robuste face au bruit, traitable par ordinateur, stockable facilement.\n\nConversion analogique-numérique (CAN / ADC) :\n1. Échantillonnage : mesure à instants réguliers (période d\'échantillonnage Te = 1/fe)\n2. Quantification : arrondi à la valeur la plus proche parmi 2ⁿ niveaux (n = nombre de bits)\n3. Codage : représentation en binaire'},
      {id:'T1',type:'thm',nom:'Critère de Shannon-Nyquist',enonce:'Pour pouvoir reconstruire fidèlement un signal à partir de ses échantillons, la fréquence d\'échantillonnage doit être au moins deux fois supérieure à la fréquence maximale du signal :\n\nfe ≥ 2 × f_max\n\nSi fe < 2f_max → repliement de spectre (aliasing) : déformation irrémédiable du signal.\n\nExemples :\n• CD audio : f_max(son) ≈ 20 kHz → fe = 44,1 kHz ≥ 2×20 kHz ✓\n• Téléphonie : fe = 8 kHz → f_max = 4 kHz (voix limitée à 3,4 kHz) ✓'},
      {id:'F1',type:'formule',nom:'Quantification et débit numérique',enonce:'Résolution (pas de quantification) :\nq = (U_max − U_min) / 2ⁿ\nn = nombre de bits\n\nNombre de niveaux de quantification : N = 2ⁿ\n\nDébit binaire (bit/s) :\nD = fe × n\n\nTaille d\'un fichier audio stéréo :\nTaille = D × t × 2 (canaux)\n\nExemple CD : fe = 44100 Hz, n = 16 bits, 2 canaux\nD = 44100 × 16 × 2 = 1 411 200 bit/s ≈ 1,41 Mbit/s'},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:'Critère de Shannon',enonce:'Un signal audio a f_max = 8 kHz. Quelle fréquence d\'échantillonnage minimale faut-il utiliser ?',correction:'fe ≥ 2 × f_max = 2 × 8000 = 16 000 Hz = 16 kHz\nEn pratique on prend fe = 22,05 kHz ou 44,1 kHz.'},
      {id:'EX02',niveau:'Intermédiaire',titre:'Taille d\'un fichier audio',enonce:'On numérise un signal audio stéréo avec fe = 44,1 kHz, n = 16 bits, pendant 3 minutes. Calculer la taille du fichier non compressé.',correction:'Débit = fe × n × nb_canaux = 44100 × 16 × 2 = 1 411 200 bit/s\nDurée = 3 × 60 = 180 s\nTaille = 1 411 200 × 180 = 254 016 000 bits = 31 752 000 octets ≈ 30,3 Mo'},
    ],
  },
}

export default function PhysiquePremierChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)

  if (!ch) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>🔬</div>
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

          {/* Fil d'Ariane */}
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

            {/* Contenu principal */}
            <div>
              {/* Header */}
              <div style={{ marginBottom:28 }}>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>{ch.ch}</span>
                  <span className="label">{ch.badge}</span>
                  <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(79,110,247,0.15)', color:'#818cf8', fontWeight:700 }}>⭐ Spécialité PC · 1ère</span>
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
                      <div style={{ background:'rgba(0,0,0,0.25)', padding:'10px' }} dangerouslySetInnerHTML={{ __html: t.svg! }} />
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

              {/* Navigation prev/next */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:22 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/physique/premiere/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'13px 16px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:11, color:'var(--muted)', marginBottom:3 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:13 }}>{TITRES[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/premiere/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                <div style={{ padding:'11px 15px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>⚛️ Première PC — 13 chapitres</div>
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
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+ch.titre+' en Première Spécialité PC')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {ch.titre}
                  </Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac PC</Link>
                  <Link href="/bac-france/physique/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📗 Voir Terminale PC</Link>
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