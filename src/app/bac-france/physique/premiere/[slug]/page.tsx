'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE PREMIÈRE GÉNÉRALE / [SLUG]
// Route : /bac-france/physique/premiere/[slug]
// Programme officiel Spécialité PC · Première · Bac 2027 · 6h/semaine
// 4 sections · 13 chapitres
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899', loi:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', loi:'Loi' }

const NAV_ORDER = [
  // Section 1 — Constitution & Transformations (Chimie)
  'quantite-matiere','reactions-redox','structure-entites',
  // Section 2 — Mouvement & Interactions (Physique)
  'loi-coulomb','fluides','deuxieme-loi-newton-approche',
  // Section 3 — Énergie
  'energie-mecanique','bilans-energetiques','energie-chimique-thermique',
  // Section 4 — Ondes & Signaux
  'ondes-mecaniques','ondes-sonores','ondes-electromagnetiques','signaux-electriques',
]

const TITRES_NAV: Record<string,string> = {
  'quantite-matiere':            'CH 01 — Quantité de matière & Réactions',
  'reactions-redox':             "CH 02 — Réactions d'oxydo-réduction",
  'structure-entites':           'CH 03 — Structure des entités & Propriétés',
  'loi-coulomb':                 'CH 04 — Loi de Coulomb & Champs',
  'fluides':                     'CH 05 — Fluides au repos',
  'deuxieme-loi-newton-approche':'CH 06 — 2ème loi de Newton',
  'energie-mecanique':           'CH 07 — Aspects énergétiques mécaniques',
  'bilans-energetiques':         'CH 08 — Bilans énergétiques',
  'energie-chimique-thermique':  'CH 09 — Énergie chimique & thermique',
  'ondes-mecaniques':            'CH 10 — Ondes mécaniques progressives',
  'ondes-sonores':               'CH 11 — Ondes sonores',
  'ondes-electromagnetiques':    'CH 12 — Ondes électromagnétiques & couleurs',
  'signaux-electriques':         'CH 13 — Signaux électriques & numérisation',
}

const SEC_COLORS: Record<string,string> = {
  'quantite-matiere':'#10b981','reactions-redox':'#10b981','structure-entites':'#10b981',
  'loi-coulomb':'#4f6ef7','fluides':'#4f6ef7','deuxieme-loi-newton-approche':'#4f6ef7',
  'energie-mecanique':'#f59e0b','bilans-energetiques':'#f59e0b','energie-chimique-thermique':'#f59e0b',
  'ondes-mecaniques':'#8b5cf6','ondes-sonores':'#8b5cf6','ondes-electromagnetiques':'#8b5cf6',
  'signaux-electriques':'#8b5cf6',
}

const SEC_LABEL: Record<string,string> = {
  'quantite-matiere':'🧪 Chimie','reactions-redox':'🧪 Chimie','structure-entites':'🧪 Chimie',
  'loi-coulomb':'⚛️ Physique','fluides':'⚛️ Physique','deuxieme-loi-newton-approche':'⚛️ Physique',
  'energie-mecanique':'🔋 Énergie','bilans-energetiques':'🔋 Énergie','energie-chimique-thermique':'🔋 Énergie',
  'ondes-mecaniques':'🌊 Ondes','ondes-sonores':'🌊 Ondes','ondes-electromagnetiques':'🌊 Ondes',
  'signaux-electriques':'💻 Numérique',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 13 CHAPITRES
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ══════════════════════════════════════════════════════════════════════
// SECTION 1 — CONSTITUTION & TRANSFORMATIONS (Chimie)
// ══════════════════════════════════════════════════════════════════════

'quantite-matiere': {
  id:'quantite-matiere', emoji:'⚗️', badge:'Chimie', color:'#10b981',
  titre:'Quantité de matière & Réactions',
  desc:"La mole, masse molaire, concentration molaire, volume molaire. Tableau d'avancement, réactif limitant, taux d'avancement. Dilution et mélanges.",
  souschapitres:[
    {
      id:'sc-qm1', titre:'1.1 La mole et ses relations',
      notions:['n=m/M ; n=V/V_m ; n=c×V','N_A=6,02×10²³ (nombre d\'Avogadro)','V_m=22,4L/mol aux CNT ; 24L/mol à 20°C','Concentration molaire c (mol/L) et massique t (g/L)'],
      blocs:[
        {
          notion:'⚗️ La mole et les concentrations',
          theoremes:[
            { id:'D-QM1', type:'def', nom:'La mole et ses relations fondamentales',
              enonce:"MOLE :\nn = m/M  (m en g, M en g/mol)\nn = V/V_m  (gaz) avec V_m = 22,4 L/mol (CNT : 0°C, 1atm) ou 24,0 L/mol (CNTP : 20°C, 1atm)\nn = c×V_solution  (solution) avec c en mol/L et V en L\n\nN_A = 6,02×10²³ entités/mol\nN = n × N_A  (nombre d'entités)\n\nCONCENTRATION MOLAIRE : c = n/V (mol/L)\nCONCENTRATION MASSIQUE : t = m/V (g/L)\nRelation : c = t/M\n\nMASSE VOLUMIQUE : ρ = m/V → n = ρV/M" },
            { id:'F-QM1', type:'formule', nom:'Dilution',
              enonce:"Lors d'une dilution : la quantité de matière est conservée\nn = c₁V₁ = c₂V₂\n\nFacteur de dilution : F = c₁/c₂ = V₂/V₁\n\nMode opératoire :\n1. Prélever V₁ mL de solution mère (c₁)\n2. Introduire dans fiole de V₂ mL\n3. Compléter avec le solvant jusqu'au trait de jauge\n\nApproximation : si F > 10 → c₂ << c₁",
              remarque:"Ne jamais verser l'eau dans l'acide (exothermique violent) : toujours verser l'acide dans l'eau." },
          ],
          exercices:[
            { id:'EX-QM1', niveau:'Facile', titre:'Quantité de matière',
              enonce:"Dissoudre 5,85g de NaCl (M=58,5g/mol) dans 250mL. Calculer n et c.",
              correction:"n=5,85/58,5=0,1mol.\nc=0,1/0,250=0,4mol/L." },
            { id:'EX-QM2', niveau:'Intermédiaire', titre:'Dilution en chaîne',
              enonce:"Solution mère HCl : c₀=2,5mol/L. Préparer 100mL à c₁=0,5mol/L puis diluer 10× pour avoir c₂. Calculer V₀ et c₂.",
              correction:"c₀V₀=c₁V₁ → V₀=0,5×100/2,5=20mL.\nc₂=c₁/10=0,05mol/L." },
          ]
        },
      ]
    },
    {
      id:'sc-qm2', titre:'1.2 Tableau d\'avancement et réactif limitant',
      notions:['Variable d\'avancement x (mol)','x_max=min(n₀(A)/a ; n₀(B)/b)','Réactif limitant : épuisé en premier','Taux d\'avancement τ=x_f/x_max'],
      blocs:[
        {
          notion:'📊 Tableau d\'avancement',
          theoremes:[
            { id:'M-QM1', type:'methode', nom:'Tableau d\'avancement complet',
              enonce:"Pour aA + bB → cC + dD :\n\nÉTAT  |  A          |  B          |  C   |  D\nInit  | n₀(A)       | n₀(B)       |  0   |  0\nCours | n₀(A)−ax    | n₀(B)−bx    |  cx  |  dx\nFinal | n₀(A)−ax_max| n₀(B)−bx_max| cx_max| dx_max\n\nRÉACTIF LIMITANT :\nx_max = min(n₀(A)/a ; n₀(B)/b)\n→ Le réactif pour lequel n=0 en premier\n\nRÉACTION TOTALE : τ=1 (réactif limitant épuisé)\nRÉACTION LIMITÉE : τ<1 (équilibre)\n\nTAUX D'AVANCEMENT : τ = x_f/x_max_théorique",
              remarque:"Toujours vérifier que les quantités restantes sont positives ou nulles. Si négatives : x_max est trop grand → recalculer le réactif limitant." },
          ],
          exercices:[
            { id:'EX-QM3', niveau:'Intermédiaire', titre:'Réactif limitant',
              enonce:"Réaction 2A + 3B → produits. n₀(A)=0,3mol, n₀(B)=0,4mol. Réactif limitant et x_max ?",
              correction:"x_max(A)=0,3/2=0,15mol.\nx_max(B)=0,4/3=0,133mol.\nLimitant : B (x_max le plus petit).\nx_max=0,133mol." },
          ]
        },
      ]
    },
  ]
},

'reactions-redox': {
  id:'reactions-redox', emoji:'⚡', badge:'Chimie', color:'#10b981',
  titre:"Réactions d'oxydo-réduction",
  desc:"Transfert d'électrons, couples Ox/Red, nombre d'oxydation, équilibrage des demi-équations, titrages par oxydoréduction.",
  souschapitres:[
    {
      id:'sc-rx1', titre:'2.1 Couples Ox/Red et nombre d\'oxydation',
      notions:['Oxydant capte e⁻ ; réducteur cède e⁻','Couple Ox/Red : Ox+ne⁻⇌Red','NO(O)=−II ; NO(H)=+I','Oxydation : NO↑ ; réduction : NO↓'],
      blocs:[
        {
          notion:'⚡ Oxydoréduction',
          theoremes:[
            { id:'D-RX1', type:'def', nom:'Couple oxydant/réducteur',
              enonce:"OXYDANT : capte des électrons → se RÉDUIT\nRÉDUCTEUR : cède des électrons → s'OXYDE\n\nDEMI-ÉQUATION : Ox + ne⁻ ⇌ Red\n\nEXEMPLES :\nCu²⁺/Cu : Cu²⁺ + 2e⁻ → Cu\nFe³⁺/Fe²⁺ : Fe³⁺ + e⁻ → Fe²⁺\nMnO₄⁻/Mn²⁺ : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O\nCr₂O₇²⁻/Cr³⁺ : Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O" },
            { id:'D-RX2', type:'def', nom:'Nombre d\'oxydation (NO)',
              enonce:"Le NO est la charge fictive en supposant les liaisons ioniques.\n\nRÈGLES :\n• Métal pur : NO = 0\n• Ion monoatomique : NO = charge de l'ion\n• H : NO = +I (sauf hydrures métalliques : −I)\n• O : NO = −II (sauf H₂O₂ : −I ; OF₂ : +II)\n• Somme des NO = charge totale de la formule\n\nREPÉRER LA TRANSFORMATION :\nOxydation ↔ NO augmente (perte e⁻)\nRéduction ↔ NO diminue (gain e⁻)" },
            { id:'M-RX1', type:'methode', nom:'Équilibrer une équation rédox en milieu acide',
              enonce:"1. Identifier les deux demi-équations (Ox/Red)\n2. Équilibrer les atomes autres que O et H\n3. Équilibrer O avec H₂O\n4. Équilibrer H avec H⁺\n5. Équilibrer les charges avec e⁻\n6. Multiplier pour éliminer les e⁻\n7. Additionner les deux demi-équations\n\nEXEMPLE : MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺\nRéd : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O  (×1)\nOx : Fe²⁺ → Fe³⁺ + e⁻  (×5)\nBilan : MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺" },
          ],
          exercices:[
            { id:'EX-RX1', niveau:'Facile', titre:'Demi-équation de Cr₂O₇²⁻',
              enonce:"Écrire la demi-équation de réduction de Cr₂O₇²⁻ en Cr³⁺ en milieu acide.",
              correction:"Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O\n(vérifier : gauche +12, droite +6 avant e⁻ → +6 e⁻ ✓)" },
            { id:'EX-RX2', niveau:'Intermédiaire', titre:'Titrage KMnO₄ / Fe²⁺',
              enonce:"On titre Fe²⁺ par KMnO₄ (0,02mol/L). V_eq=12,5mL pour 20mL de Fe²⁺. Calculer [Fe²⁺].",
              correction:"MnO₄⁻ + 5Fe²⁺ → ratio 1:5.\nn(MnO₄⁻)=0,02×0,0125=2,5×10⁻⁴mol.\nn(Fe²⁺)=5×2,5×10⁻⁴=1,25×10⁻³mol.\n[Fe²⁺]=1,25×10⁻³/0,020=0,0625mol/L." },
          ]
        },
      ]
    },
  ]
},

'structure-entites': {
  id:'structure-entites', emoji:'🔬', badge:'Chimie', color:'#10b981',
  titre:'Structure des entités & Propriétés physiques',
  desc:"Schémas de Lewis, modèle VSEPR (géométrie moléculaire), électronégativité, polarité, interactions intermoléculaires, solubilité, extraction liquide-liquide.",
  souschapitres:[
    {
      id:'sc-se1', titre:'3.1 Lewis, VSEPR et polarité',
      notions:['Schéma de Lewis : doublets liants et non liants','VSEPR : géométrie par répulsion des doublets','Électronégativité : F>O>N>Cl>Br>C≈H','Molécule polaire : liaisons polaires non compensées'],
      blocs:[
        {
          notion:'🔬 Structure et géométrie',
          theoremes:[
            { id:'D-SE1', type:'def', nom:'Schémas de Lewis et modèle VSEPR',
              enonce:"RÈGLES DE LEWIS :\n• Octet pour C, N, O, F (2ème période)\n• Duet pour H et He\n• Liaisons simples, doubles (=), triples (≡)\n• Doublets non liants : :\n\nMODÈLE VSEPR :\nLes paires d'électrons (liantes + non liantes) se repoussent au maximum.\n\nGÉOMÉTRIES :\n4 liantes + 0 non liant → tétraédrique (CH₄, 109°)\n3 liantes + 1 non liant → pyramide trigonale (NH₃, 107°)\n2 liantes + 2 non liants → coudée (H₂O, 104°)\n3 liantes + 0 non liant → trigonale plane (BF₃, 120°)\n2 liantes + 0 non liant → linéaire (CO₂, 180°)" },
            { id:'D-SE2', type:'def', nom:'Électronégativité et polarité',
              enonce:"ÉLECTRONÉGATIVITÉ χ :\nTendance à attirer les électrons d'une liaison\nCroît → à droite et ↑ en haut du tableau périodique\nF > O > N > Cl > Br > C ≈ H\n\nLIAISON POLAIRE : Δχ > 0,4 → dipôle δ⁺—δ⁻\nMoment dipolaire μ = q × d (en Debye)\n\nMOLÉCULE POLAIRE :\n• Liaisons polaires non compensées par la géométrie\nH₂O : polaire (coudée, moments non compensés)\nCO₂ : apolaire (linéaire, moments opposés s'annulent)\nCH₄ : apolaire (tétraédrique, symétrique)" },
          ],
          exercices:[
            { id:'EX-SE1', niveau:'Facile', titre:'Géométrie VSEPR',
              enonce:"Donner la géométrie de : NH₃, CO₂ et H₂O.",
              correction:"NH₃ : 3 liants + 1 non liant → pyramide trigonale.\nCO₂ : 2 liants doubles + 0 non liant → linéaire.\nH₂O : 2 liants + 2 non liants → coudée." },
          ]
        },
      ]
    },
    {
      id:'sc-se2', titre:'3.2 Interactions intermoléculaires et propriétés',
      notions:['Liaison hydrogène X−H···Y (X,Y=F,O,N)','Van der Waals : dipôle-dipôle, London','Solubilité : semblable-semblable','Extraction liquide-liquide : coefficient de partage'],
      blocs:[
        {
          notion:'🔗 Interactions et propriétés macroscopiques',
          theoremes:[
            { id:'P-SE1', type:'prop', nom:'Interactions intermoléculaires',
              enonce:"1. LIAISON HYDROGÈNE (5–40 kJ/mol) :\nX−H···Y  avec X, Y = F, O ou N\n→ Forte → T_éb et T_fus élevées\n→ Explique les anomalies de l'eau (T_éb=100°C au lieu de −80°C)\n\n2. INTERACTIONS DE VAN DER WAALS :\nDipôle permanent – dipôle permanent (Keesom)\nDipôle permanent – dipôle induit (Debye)\nDipôle induit – dipôle induit (London) — universelles\n→ Plus la molécule est grande → London plus forte\n\n3. FORCES ÉLECTROSTATIQUES (ion–ion) : les plus fortes\n\nCONSÉQUENCES :\nT_éb croît avec la force des interactions\n'Les semblables dissolvent les semblables' :\n→ Eau (polaire) : dissout les solides ioniques et molécules polaires\n→ Hexane (apolaire) : dissout les graisses et huiles" },
            { id:'M-SE1', type:'methode', nom:'Extraction liquide-liquide',
              enonce:"Séparer un soluté A entre deux solvants non miscibles S₁ et S₂\n\nCOEFFICIENT DE PARTAGE :\nD = c(A dans S₁) / c(A dans S₂)  (à l'équilibre)\n\nPLUSIEURS EXTRACTIONS :\nRendement meilleur avec plusieurs petites extractions qu'une seule grande\n\nPROCÉDURE (ampoule à décanter) :\n1. Ajouter solvant extractant\n2. Agiter (dégazer régulièrement)\n3. Laisser décanter\n4. Récupérer la phase contenant le soluté\n\nAPPLICATION : extraire la caféine du café, purifier un médicament",
              remarque:"La phase la moins dense est toujours en haut. Identifier les deux phases avant de séparer." },
          ],
          exercices:[
            { id:'EX-SE2', niveau:'Intermédiaire', titre:'Solubilité et interactions',
              enonce:"Parmi : NaCl, I₂, éthanol, hexane. Lesquels sont solubles dans l'eau ? Dans l'hexane ?",
              correction:"Dans l'eau (polaire) : NaCl (ionique ✓), éthanol (OH polaire ✓).\nInsoluble dans l'eau : I₂ (apolaire), hexane (apolaire).\nDans l'hexane (apolaire) : I₂ ✓, hexane ✓.\nInsol. dans hexane : NaCl (ionique), éthanol (partiellement)." },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 2 — MOUVEMENT & INTERACTIONS (Physique)
// ══════════════════════════════════════════════════════════════════════

'loi-coulomb': {
  id:'loi-coulomb', emoji:'⚡', badge:'Physique', color:'#4f6ef7',
  titre:'Loi de Coulomb & Champs',
  desc:"Loi de Coulomb (force électrostatique), loi de Newton (gravitation universelle), champ électrique E=kQ/r², champ gravitationnel g, lignes de champ.",
  souschapitres:[
    {
      id:'sc-lc1', titre:'4.1 Interactions fondamentales et champs',
      notions:['F=kq₁q₂/r² (Coulomb)','F=GMm/r² (Newton)','E=kQ/r² ; g=GM/r²','F⃗=qE⃗ ; P⃗=mg⃗'],
      blocs:[
        {
          notion:'⚡ Lois de Coulomb et Newton',
          theoremes:[
            { id:'L-LC1', type:'loi', nom:'Loi de Coulomb',
              enonce:"F = k × |q₁| × |q₂| / r²\n\nk = 9×10⁹ N·m²·C⁻² (constante électrostatique)\nq₁, q₂ : charges (Coulombs)\nr : distance entre les charges\n\nMêmes signes → RÉPULSION\nSignes opposés → ATTRACTION\n\nCHAMP ÉLECTRIQUE créé par Q en M :\nE = kQ/r²  (N/C ou V/m)\nF⃗ = q×E⃗ (force sur la charge q dans le champ)" },
            { id:'L-LC2', type:'loi', nom:'Gravitation universelle',
              enonce:"F = G × M × m / r²\n\nG = 6,67×10⁻¹¹ N·m²·kg⁻² (constante universelle)\nForce TOUJOURS attractive\n\nCHAMP GRAVITATIONNEL :\ng = GM/r²  (N/kg ou m/s²)\nP⃗ = m×g⃗ (poids)\n\nCOMPARAISON Coulomb/Gravitation :\nF_élec/F_grav ≈ 10³⁶ pour deux protons\n→ Gravitation totalement négligeable à l'échelle atomique" },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:'Force de Coulomb entre protons',
              enonce:"Deux protons (q=1,6×10⁻¹⁹C) séparés de r=10⁻¹⁵m. Calculer F_Coulomb.",
              correction:"F=9×10⁹×(1,6×10⁻¹⁹)²/(10⁻¹⁵)²=9×10⁹×2,56×10⁻³⁸/10⁻³⁰≈230N.\n(Force énorme → besoin de la force nucléaire forte.)" },
            { id:'EX-LC2', niveau:'Intermédiaire', titre:'Champ et accélération',
              enonce:"Électron (m=9,1×10⁻³¹kg, q=−1,6×10⁻¹⁹C) dans E=1000V/m. Accélération ?",
              correction:"F=|q|E=1,6×10⁻¹⁹×1000=1,6×10⁻¹⁶N.\na=F/m=1,6×10⁻¹⁶/9,1×10⁻³¹≈1,76×10¹⁴m/s² (opposé à E⃗, car q<0)." },
          ]
        },
      ]
    },
  ]
},

'fluides': {
  id:'fluides', emoji:'💧', badge:'Physique', color:'#4f6ef7',
  titre:'Fluides au repos',
  desc:"Pression dans un fluide (P=P₀+ρgh), théorème de Pascal, poussée d'Archimède (F_A=ρ_fluide·V·g), modèle du gaz parfait (PV=nRT).",
  souschapitres:[
    {
      id:'sc-fl1', titre:'5.1 Pression, Pascal et Archimède',
      notions:['P=P₀+ρgh (pression hydrostatique)','Pascal : variation de P transmise intégralement','F_A=ρ_fluide×V_immergé×g (Archimède)','Corps flotte si ρ_corps<ρ_fluide'],
      blocs:[
        {
          notion:'💧 Hydrostatique',
          theoremes:[
            { id:'F-FL1', type:'formule', nom:'Pression hydrostatique et Pascal',
              enonce:"PRESSION À LA PROFONDEUR h :\nP = P₀ + ρgh\nP₀ = pression en surface (Pa)\nρ = masse volumique du fluide (kg/m³)\ng ≈ 9,8 m/s²\n\nTHÉORÈME DE PASCAL :\nToute variation de pression dans un fluide incompressible au repos est transmise intégralement en tout point.\n\nVÉRIN HYDRAULIQUE :\nF₁/S₁ = F₂/S₂ = P appliquée\nAmplification de force si S₂ > S₁" },
            { id:'T-FL1', type:'thm', nom:'Poussée d\'Archimède',
              enonce:"Tout corps immergé dans un fluide reçoit une force verticale vers le haut :\n\nF_A = ρ_fluide × V_immergé × g\n\nCONDITIONS DE FLOTTABILITÉ :\nρ_corps < ρ_fluide → corps flotte (F_A > P)\nρ_corps = ρ_fluide → équilibre indifférent\nρ_corps > ρ_fluide → corps coule (F_A < P)\n\nPOURCENTAGE IMMERGÉ (corps flottant) :\nF_A = P → ρ_fluide × V_imm × g = ρ_corps × V_total × g\nV_imm/V_total = ρ_corps/ρ_fluide",
              remarque:"L'iceberg : ρ_glace/ρ_mer = 917/1025 ≈ 0,895 → 89,5% du volume est immergé." },
          ],
          exercices:[
            { id:'EX-FL1', niveau:'Facile', titre:'Pression sous-marine',
              enonce:"Pression à 20m de profondeur. P₀=10⁵Pa, ρ_eau=1000kg/m³, g=9,8m/s².",
              correction:"P=10⁵+1000×9,8×20=10⁵+1,96×10⁵=2,96×10⁵Pa≈3atm." },
            { id:'EX-FL2', niveau:'Intermédiaire', titre:'Iceberg',
              enonce:"ρ_glace=917kg/m³, ρ_mer=1025kg/m³. Fraction immergée ?",
              correction:"V_imm/V_total=917/1025≈89,5%. Environ 90% immergé !" },
          ]
        },
      ]
    },
    {
      id:'sc-fl2', titre:'5.2 Modèle du gaz parfait',
      notions:['PV=nRT (loi d\'état)','R=8,314 J·mol⁻¹·K⁻¹ ; T en Kelvin','Isotherme : P₁V₁=P₂V₂','Isobare : V₁/T₁=V₂/T₂'],
      blocs:[
        {
          notion:'💨 Gaz parfait',
          theoremes:[
            { id:'F-FL2', type:'formule', nom:'Loi d\'état des gaz parfaits',
              enonce:"PV = nRT\n\nP en Pa ; V en m³ ; n en mol ; T en K\nR = 8,314 J·mol⁻¹·K⁻¹\nT(K) = T(°C) + 273,15\n\nTRANSFORMATIONS :\nIsotherme (T = cte) : P₁V₁ = P₂V₂\nIsobare (P = cte) : V₁/T₁ = V₂/T₂\nIsochore (V = cte) : P₁/T₁ = P₂/T₂\n\nVolume molaire à T,P :\nV_m = RT/P  (22,4 L/mol aux CNT ; 24,4 L/mol à 25°C, 1atm)" },
          ],
          exercices:[
            { id:'EX-FL3', niveau:'Facile', titre:'Gaz parfait',
              enonce:"n=0,5mol de gaz à T=300K, P=10⁵Pa. Volume occupé ?",
              correction:"V=nRT/P=0,5×8,314×300/10⁵=1247/100000≈0,0125m³=12,5L." },
            { id:'EX-FL4', niveau:'Intermédiaire', titre:'Transformation isobare',
              enonce:"Gaz à V₁=2L, T₁=20°C. Chauffé à T₂=100°C à P=cte. V₂ ?",
              correction:"V₂=V₁×T₂/T₁=2×373/293≈2,55L." },
          ]
        },
      ]
    },
  ]
},

'deuxieme-loi-newton-approche': {
  id:'deuxieme-loi-newton-approche', emoji:'🚀', badge:'Physique', color:'#4f6ef7',
  titre:'2ème loi de Newton (approche)',
  desc:"ΣF⃗=ma⃗, mouvements dans un champ uniforme (pesanteur ou électrique), mouvement parabolique, composantes du mouvement.",
  souschapitres:[
    {
      id:'sc-nw1', titre:'6.1 Deuxième loi et mouvement parabolique',
      notions:['ΣF⃗=m·a⃗ (référentiel galiléen)','Inertie : si ΣF⃗=0⃗ → v⃗=cste (MRU)','Chute libre : aₓ=0, aᵧ=−g','Portée R=v₀²sin2α/g (max pour α=45°)'],
      blocs:[
        {
          notion:'🚀 2ème loi de Newton et mouvement parabolique',
          theoremes:[
            { id:'T-NW1', type:'thm', nom:'2ème loi de Newton',
              enonce:"Dans un référentiel galiléen :\nΣF⃗_ext = m × a⃗\n\n1ÈRE LOI (inertie) : si ΣF⃗=0⃗ → a⃗=0⃗ → MRU\n3ÈME LOI : F⃗(A→B) = −F⃗(B→A)\n(action-réaction, sur corps DIFFÉRENTS)\n\nPROJECTIONS :\nΣFₓ = m·aₓ\nΣFᵧ = m·aᵧ" },
            { id:'M-NW1', type:'methode', nom:'Mouvement parabolique',
              enonce:"Projectile (v₀, angle α, sans frottements) :\n\nHORIZONTAL (pas de force) :\naₓ=0 → vₓ=v₀cosα → x=v₀cosα·t\n\nVERTICAL (poids seul) :\naᵧ=−g → vᵧ=v₀sinα−gt → y=v₀sinα·t−½gt²\n\nTRAJECTOIRE PARABOLIQUE :\ny = x·tanα − gx²/(2v₀²cos²α)\n\nHAUTEUR MAX (vᵧ=0) :\nH = v₀²sin²α / (2g)\n\nPORTÉE (y=0) :\nR = v₀²sin(2α) / g  → MAX pour α = 45°",
              remarque:"En l'absence de frottements, les mouvements horizontal et vertical sont indépendants. À retenir pour le Bac : choisir un repère adapté et projeter." },
          ],
          exercices:[
            { id:'EX-NW1', niveau:'Facile', titre:'Chute libre',
              enonce:"Objet lâché de h=45m. g=10m/s². Temps de chute et vitesse d'impact ?",
              correction:"h=½gt² → t=√(2h/g)=√9=3s.\nv=gt=30m/s." },
            { id:'EX-NW2', niveau:'Intermédiaire', titre:'Portée et hauteur',
              enonce:"v₀=20m/s, α=30°, g=10m/s². Calculer H et R.",
              correction:"H=(20×sin30°)²/(2×10)=100×0,25/20=1,25m.\nR=400×sin60°/10=400×0,866/10≈34,6m." },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 3 — ÉNERGIE
// ══════════════════════════════════════════════════════════════════════

'energie-mecanique': {
  id:'energie-mecanique', emoji:'🔋', badge:'Énergie', color:'#f59e0b',
  titre:'Aspects énergétiques mécaniques',
  desc:"Travail d'une force W=F·d·cosα, énergie cinétique Ec=½mv², théorème de l'énergie cinétique, énergie potentielle, conservation de l'énergie mécanique.",
  souschapitres:[
    {
      id:'sc-em1', titre:'7.1 Travail et théorème de l\'énergie cinétique',
      notions:['W=F·d·cosα (travail d\'une force constante)','W>0 : motrice ; W<0 : résistante','ΔEc=ΣW (théorème Ec)','Ec=½mv² (Joules)'],
      blocs:[
        {
          notion:'🔋 Travail et énergie cinétique',
          theoremes:[
            { id:'F-EM1', type:'formule', nom:'Travail et théorème de l\'énergie cinétique',
              enonce:"TRAVAIL d'une force constante F sur déplacement d :\nW = F · d · cosα\nα = angle entre F⃗ et déplacement\n\nW > 0 : force motrice (accélère)\nW < 0 : force résistante (freine)\nW = 0 : force ⊥ au déplacement (normale, tension d'un pendule)\n\nTravail du poids : W_P = mgΔh = mg(z₁−z₂)\n(positif si descente)\n\nTHÉORÈME DE L'ÉNERGIE CINÉTIQUE :\nΔEc = Ec_f − Ec_i = Σ W(toutes les forces)\nEc = ½mv²" },
            { id:'F-EM2', type:'formule', nom:'Énergie mécanique et conservation',
              enonce:"ÉNERGIE POTENTIELLE DE PESANTEUR :\nEp = mgz  (z = hauteur, origine choisie)\n\nÉNERGIE MÉCANIQUE :\nEm = Ec + Ep = ½mv² + mgz\n\nCONSERVATION (sans frottements) :\nEm = constante\n½mv₁² + mgz₁ = ½mv₂² + mgz₂\n\nAVEC FROTTEMENTS :\nΔEm = W_frottements < 0\n(énergie mécanique diminue → chaleur)",
              remarque:"L'énergie mécanique est une constante du mouvement en l'absence de forces non conservatives. Avec frottements : ΔEm=W_frottements=−f·d." },
          ],
          exercices:[
            { id:'EX-EM1', niveau:'Facile', titre:'Travail et vitesse',
              enonce:"Corps m=2kg tombe de h=5m. W_poids ? Vitesse à l'impact (départ nul, sans frottements). g=10m/s².",
              correction:"W_P=mgh=2×10×5=100J.\nΔEc=W_P → ½mv²=100 → v²=100 → v=10m/s." },
            { id:'EX-EM2', niveau:'Intermédiaire', titre:'Skieur avec frottements',
              enonce:"Skieur 70kg, h=80m, arrive à v=35m/s, pente=500m. g=10m/s². Calculer W_frottements et force de frottement f.",
              correction:"ΔEm=½×70×35²−70×10×80=42875−56000=−13125J.\nW_f=−13125J → f=13125/500=26,25N." },
          ]
        },
      ]
    },
  ]
},

'bilans-energetiques': {
  id:'bilans-energetiques', emoji:'⚙️', badge:'Énergie', color:'#f59e0b',
  titre:'Bilans énergétiques',
  desc:"Puissance électrique P=UI, énergie E=Pt, effet Joule P_J=RI², rendement η=P_utile/P_absorbée, associations de résistances, loi d'Ohm.",
  souschapitres:[
    {
      id:'sc-be1', titre:'8.1 Puissance électrique, Joule et rendement',
      notions:['P=UI (Watts) ; E=Pt (Joules)','P_Joule=RI²=U²/R','η=P_utile/P_absorbée','1kWh=3,6×10⁶J'],
      blocs:[
        {
          notion:'⚙️ Bilans énergétiques électriques',
          theoremes:[
            { id:'F-BE1', type:'formule', nom:'Puissance et énergie électrique',
              enonce:"PUISSANCE ÉLECTRIQUE :\nP = U × I  (Watts)\n\nÉNERGIE ÉLECTRIQUE :\nE = P × t  (Joules)\nE = U × I × t\n\nCONVERSION : 1 kWh = 3,6×10⁶ J\n\nEFFET JOULE (résistance R) :\nP_J = R × I² = U²/R\n\nLOI D'OHM : U = R × I\n\nASSOCIATIONS :\nSérie : R_eq = R₁+R₂+…\nParallèle : 1/R_eq = 1/R₁+1/R₂+…" },
            { id:'D-BE1', type:'def', nom:'Rendement d\'un convertisseur',
              enonce:"η = P_utile / P_absorbée = E_utile / E_absorbée\n0 ≤ η ≤ 1  (souvent en %)\n\nP_dissipée = P_absorbée − P_utile\n\nEXEMPLES DE RENDEMENT :\n• Moteur électrique : η ≈ 85–95%\n• Panneau solaire : η ≈ 15–22%\n• LED : η ≈ 80–90%\n• Ampoule incandescente : η ≈ 5%\n• Centrale thermique : η ≈ 35–45%\n\nCHAÎNE DE CONVERSION :\nη_global = η₁ × η₂ × … × ηₙ",
              remarque:"Un rendement de 100% est impossible (2ème principe de la thermodynamique). Toute transformation énergétique produit de la chaleur." },
          ],
          exercices:[
            { id:'EX-BE1', niveau:'Facile', titre:'Radiateur électrique',
              enonce:"Radiateur 2000W, 3h. Énergie en Joules et kWh. Coût si 1kWh=0,20€.",
              correction:"E=2000×3×3600=21,6×10⁶J=21,6MJ.\nE=2×3=6kWh. Coût=6×0,20=1,20€." },
            { id:'EX-BE2', niveau:'Intermédiaire', titre:'Rendement d\'un moteur',
              enonce:"Moteur 500W soulève m=20kg à v=1m/s. g=10m/s². Rendement ?",
              correction:"P_utile=Fv=mgv=200×1=200W.\nη=200/500=40%.\nPerte thermique=300W." },
          ]
        },
      ]
    },
  ]
},

'energie-chimique-thermique': {
  id:'energie-chimique-thermique', emoji:'🔥', badge:'Énergie', color:'#f59e0b',
  titre:'Énergie chimique & thermique',
  desc:"Q=mCpΔT, capacité thermique massique, pouvoir calorifique (Pci), mélange thermique, bilan thermique du corps humain.",
  souschapitres:[
    {
      id:'sc-ect1', titre:'9.1 Énergie thermique et combustion',
      notions:['Q=m·Cp·ΔT','Cp(eau)=4186J·kg⁻¹·K⁻¹','Q_combustion=m·Pci','Conservation : Q_perdu+Q_reçu=0'],
      blocs:[
        {
          notion:'🔥 Énergie thermique et combustion',
          theoremes:[
            { id:'F-EC1', type:'formule', nom:'Énergie thermique échangée',
              enonce:"Q = m × Cp × ΔT\nm en kg ; Cp en J·kg⁻¹·K⁻¹ ; ΔT = T_f − T_i en K (ou °C)\n\nVALEURS DE Cp (USUELLES) :\nEau : 4186 J·kg⁻¹·K⁻¹\nAluminium : ~900 J·kg⁻¹·K⁻¹\nFer : ~450 J·kg⁻¹·K⁻¹\nAir : ~1000 J·kg⁻¹·K⁻¹\n\nMÉLANGE THERMIQUE (conservation) :\nQ_perdu + Q_reçu = 0\nΣ mᵢ·Cpᵢ·(T_f − Tᵢ) = 0" },
            { id:'D-EC1', type:'def', nom:'Pouvoir calorifique et corps humain',
              enonce:"POUVOIR CALORIFIQUE INFÉRIEUR (Pci) :\nQ_combustion = m × Pci\n\nVALEURS APPROXIMATIVES :\nMéthane CH₄ : 50 MJ/kg\nEssence : 43 MJ/kg\nHydrogène H₂ : 120 MJ/kg\nBois sec : 15 MJ/kg\nCharbon : 30 MJ/kg\n\nRENDEMENT THERMIQUE :\nη = W_utile / (m×Pci)\n\nCORPS HUMAIN (convertisseur d'énergie chimique) :\nMétabolisme de base : ~80 W (au repos)\nEffort intense : jusqu'à 1000 W\nÉchanges thermiques : conduction, convection, rayonnement, évaporation",
              remarque:"L'hydrogène a le Pci massique le plus élevé mais sa densité volumique est faible → difficile à stocker. Problème central des piles à combustible." },
          ],
          exercices:[
            { id:'EX-EC1', niveau:'Facile', titre:'Chauffe-eau',
              enonce:"200L d'eau de 15°C à 60°C. Cp=4186J·kg⁻¹·K⁻¹. Énergie nécessaire ?",
              correction:"m=200kg. Q=200×4186×45≈37,7×10⁶J=37,7MJ≈10,5kWh." },
            { id:'EX-EC2', niveau:'Intermédiaire', titre:'Mélange thermique',
              enonce:"100g d'eau à 80°C + 200g d'eau à 20°C. T_mélange ?",
              correction:"m₁Cp(T_f−80)+m₂Cp(T_f−20)=0.\n100(T_f−80)+200(T_f−20)=0.\n300T_f=8000+4000=12000 → T_f=40°C." },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 4 — ONDES & SIGNAUX
// ══════════════════════════════════════════════════════════════════════

'ondes-mecaniques': {
  id:'ondes-mecaniques', emoji:'🌊', badge:'Ondes', color:'#8b5cf6',
  titre:'Ondes mécaniques progressives',
  desc:"Propagation d'une perturbation, célérité v, longueur d'onde λ=vT, retard temporel τ=d/v, ondes transversales et longitudinales.",
  souschapitres:[
    {
      id:'sc-om1', titre:'10.1 Nature, caractéristiques et relations',
      notions:['Onde : propagation d\'énergie sans transport de matière','Transversale : vibration ⊥ propagation','Longitudinale : vibration ∥ propagation','v=λ×f=λ/T ; τ=d/v'],
      blocs:[
        {
          notion:'🌊 Ondes mécaniques',
          theoremes:[
            { id:'D-OM1', type:'def', nom:'Onde mécanique — définition et types',
              enonce:"ONDE MÉCANIQUE :\nPropagation d'une perturbation dans un milieu matériel\nÉnergie transportée SANS déplacement de matière\nMilieu matériel nécessaire (no wave in vacuum)\n\nONDE TRANSVERSALE :\nVibration ⊥ direction de propagation\nExemples : corde, ondes à la surface de l'eau, séismes S\n\nONDE LONGITUDINALE :\nVibration ∥ direction de propagation\nExemples : son, ultrasons, séismes P\n\nCÉLÉRITÉS TYPIQUES :\nSon dans l'air : v ≈ 340 m/s (20°C)\nSon dans l'eau : v ≈ 1500 m/s\nSon dans l'acier : v ≈ 5000 m/s\nLumière dans le vide : c = 3×10⁸ m/s" },
            { id:'F-OM1', type:'formule', nom:'Relations fondamentales',
              enonce:"v = λ × f = λ / T\n\nλ = longueur d'onde (m) : distance parcourue en une période\nf = 1/T = fréquence (Hz)\nT = période (s)\n\nRETARD TEMPOREL :\nτ = d / v\n(B vibre comme A mais avec un retard τ)\n\nFONCTION D'ONDE SINUSOÏDALE :\ny(x,t) = A·sin[2π(t/T − x/λ)]\nA = amplitude" },
          ],
          exercices:[
            { id:'EX-OM1', niveau:'Facile', titre:'Longueur d\'onde du son',
              enonce:"Son f=1700Hz, v=340m/s. Calculer λ.",
              correction:"λ=v/f=340/1700=0,20m=20cm." },
            { id:'EX-OM2', niveau:'Facile', titre:'Éclair et tonnerre',
              enonce:"Tonnerre entendu 4,5s après l'éclair. v_son=340m/s. Distance de l'orage ?",
              correction:"d=v×τ=340×4,5=1530m≈1,5km." },
          ]
        },
      ]
    },
  ]
},

'ondes-sonores': {
  id:'ondes-sonores', emoji:'🎵', badge:'Ondes', color:'#8b5cf6',
  titre:'Ondes sonores',
  desc:"Son pur et son composé, analyse spectrale (fondamental + harmoniques), niveau d'intensité sonore L=10log(I/I₀) en décibels, timbre, hauteur.",
  souschapitres:[
    {
      id:'sc-os1', titre:'11.1 Sons purs, sons composés et analyse spectrale',
      notions:['Son pur : une seule fréquence f','Son composé : fondamental f₀ + harmoniques kf₀','Timbre = composition spectrale','Hauteur = fréquence fondamentale f₀'],
      blocs:[
        {
          notion:'🎵 Caractéristiques des sons',
          theoremes:[
            { id:'D-OS1', type:'def', nom:'Son pur, son composé et spectre',
              enonce:"SON PUR :\nVibration sinusoïdale d'une seule fréquence f\nProduit par un diapason\nSpectre : 1 seule raie à f\n\nSON COMPOSÉ (musical) :\nFondamental f₀ + harmoniques 2f₀, 3f₀, 4f₀, …\nHAUTEUR : déterminée par f₀\nTIMBRE : déterminé par le spectre des harmoniques\nINTENSITÉ : liée à l'amplitude\n\nANALYSE SPECTRALE :\nTransformée de Fourier : décompose tout signal périodique en sinusoïdes\nSpectre d'un son musical : raies à f₀, 2f₀, 3f₀, …\nBruit : spectre continu (non périodique)\n\nDOMAINE AUDIBLE : 20 Hz – 20 000 Hz\nInfrasson < 20 Hz ; Ultrason > 20 kHz" },
            { id:'F-OS1', type:'formule', nom:'Niveau d\'intensité sonore',
              enonce:"L = 10 × log(I/I₀)  (en décibels, dB)\n\nI₀ = 10⁻¹² W/m²  (seuil d'audibilité)\n\nVALEURS TYPIQUES :\n• Seuil d'audibilité (I₀) : 0 dB\n• Chuchotement : 20 dB\n• Conversation : 60 dB\n• Circulation : 70–80 dB\n• Concert rock : 110–120 dB\n• Seuil de douleur : 130 dB\n\nPROPRIÉTÉS :\nDoubler I : L augmente de 3 dB\nMultiplier I par 10 : L augmente de 10 dB\nAddition de sources incohérentes : I_tot = I₁ + I₂",
              remarque:"La surdité est irréversible au-delà de 90 dB prolongé. Au-delà de 140 dB : rupture du tympan." },
          ],
          exercices:[
            { id:'EX-OS1', niveau:'Facile', titre:'Niveau sonore',
              enonce:"I=10⁻⁵W/m². Calculer L. I₀=10⁻¹²W/m².",
              correction:"L=10×log(10⁻⁵/10⁻¹²)=10×log(10⁷)=70dB." },
            { id:'EX-OS2', niveau:'Intermédiaire', titre:'Doublement de sources',
              enonce:"Un HP produit 60dB. Ajout d'un 2ème HP identique. Nouveau niveau ?",
              correction:"I₂=2I₁. L=10×log(2I₁/I₀)=10×log(I₁/I₀)+10×log2=60+3=63dB." },
          ]
        },
      ]
    },
  ]
},

'ondes-electromagnetiques': {
  id:'ondes-electromagnetiques', emoji:'🌈', badge:'Ondes', color:'#8b5cf6',
  titre:'Ondes électromagnétiques & couleurs',
  desc:"Spectre électromagnétique, lumière visible (400-700nm), synthèses additive (R+V+B) et soustractive (C+M+Y), couleur des objets, énergie d'un photon E=hf.",
  souschapitres:[
    {
      id:'sc-oe1', titre:'12.1 Spectre électromagnétique et synthèse des couleurs',
      notions:['c=3×10⁸m/s dans le vide','Visible : 400nm (violet) à 700nm (rouge)','Synthèse additive : R+V+B=blanc','Synthèse soustractive : C+M+Y=noir'],
      blocs:[
        {
          notion:'🌈 Ondes électromagnétiques',
          theoremes:[
            { id:'D-OE1', type:'def', nom:'Spectre électromagnétique',
              enonce:"Toutes les OEM se propagent à c = 3×10⁸ m/s dans le vide.\n\nSPECTRE (λ croissante, f décroissante) :\nRayons γ < Rayons X < UV < Visible < IR < Micro-ondes < Radio\n\nVISIBLE : 400nm (violet) → 700nm (rouge)\nVIOLET : ~400nm\nBLEU : ~450nm\nVERT : ~550nm\nJAUNE : ~580nm\nORANGE : ~610nm\nROUGE : ~700nm\n\nÉNERGIE D'UN PHOTON :\nE = hf = hc/λ\nh = 6,63×10⁻³⁴ J·s (constante de Planck)\nE croît quand λ diminue → UV plus énergétique que IR" },
            { id:'P-OE1', type:'prop', nom:'Synthèse des couleurs',
              enonce:"SYNTHÈSE ADDITIVE (sources lumineuses, écrans) :\nPrimaires : Rouge (R), Vert (V), Bleu (B)\nR + V = Jaune\nR + B = Magenta\nV + B = Cyan\nR + V + B = Blanc\nAbsence de lumière = Noir\n→ Ecrans LCD/OLED/TV\n\nSYNTHÈSE SOUSTRACTIVE (colorants, encres, filtres) :\nPrimaires : Cyan (C), Magenta (M), Jaune (Y)\nC + M = Bleu\nC + Y = Vert\nM + Y = Rouge\nC + M + Y = Noir (théorique ; en pratique + noir K)\n→ Impression CMYK\n\nCOULEUR D'UN OBJET :\nSous lumière blanche : absorbe certaines λ, réfléchit le reste.\nObjet rouge : absorbe V et B, réfléchit R.",
              remarque:"Moyen mnémotechnique additive : 'RVB' = les 3 pixels de l'écran. Soustractive : 'CMJ' = les 3 encres de l'imprimante." },
          ],
          exercices:[
            { id:'EX-OE1', niveau:'Facile', titre:'Énergie d\'un photon',
              enonce:"Photon λ=550nm (vert). Calculer f et E. h=6,63×10⁻³⁴J·s.",
              correction:"f=c/λ=3×10⁸/550×10⁻⁹≈5,45×10¹⁴Hz.\nE=hf=6,63×10⁻³⁴×5,45×10¹⁴≈3,61×10⁻¹⁹J." },
            { id:'EX-OE2', niveau:'Facile', titre:'Synthèse additive',
              enonce:"Quelles couleurs mélanger pour obtenir : cyan, magenta, blanc ? (synthèse additive)",
              correction:"Cyan = V + B.\nMagenta = R + B.\nBlanc = R + V + B." },
          ]
        },
      ]
    },
  ]
},

'signaux-electriques': {
  id:'signaux-electriques', emoji:'💻', badge:'Numérique', color:'#8b5cf6',
  titre:'Signaux électriques & numérisation',
  desc:"Signal analogique vs numérique, numérisation : échantillonnage (critère de Shannon fe≥2fmax), quantification (2ⁿ niveaux, n bits), conversion CAN/CNA.",
  souschapitres:[
    {
      id:'sc-se1', titre:'13.1 Signaux analogique et numérique',
      notions:['Analogique : continu, ∞ de valeurs','Numérique : discret, 0 et 1 (bits)','Échantillonnage : mesure à intervalles Te=1/fe','Quantification : 2ⁿ niveaux pour n bits'],
      blocs:[
        {
          notion:'💻 Numérisation des signaux',
          theoremes:[
            { id:'D-SE1', type:'def', nom:'Signal analogique et numérique',
              enonce:"ANALOGIQUE :\nValeur continue → infinité de valeurs possibles\nExemples : tension microphone, température, pression\n\nNUMÉRIQUE :\nValeur discrète → 0 ou 1 (bits)\nAvantages : robustesse, stockage, traitement\n\nCONVERSION CAN (ADC) :\n1. ÉCHANTILLONNAGE : mesure à intervalles Te = 1/fe\n2. QUANTIFICATION : arrondi parmi 2ⁿ niveaux\n3. CODAGE : représentation binaire sur n bits\n\nCONVERSION CNA (DAC) :\nReconstruction d'un signal analogique depuis les bits" },
            { id:'F-SE1', type:'formule', nom:'Critère de Shannon et qualité numérique',
              enonce:"CRITÈRE DE SHANNON-NYQUIST :\nfe ≥ 2 × fmax\nfe = fréquence d'échantillonnage\nfmax = fréquence maximale du signal\n\nSi non respecté → repliement spectral (aliasing)\n\nQUANTIFICATION :\n2ⁿ niveaux pour n bits\n• n=8 bits → 256 niveaux (CD audio : n=16 → 65536 niveaux)\n• Résolution = plage/2ⁿ\n\nEXEMPLES DE NUMÉRISATION :\nCD audio : fe=44100 Hz, n=16 bits (f_audible max ≈ 22050 Hz)\nTéléphone : fe=8000 Hz, n=8 bits\nPhoto 24MP : 24×10⁶ pixels, n=24 bits/pixel\n\nPOIDS D'UN FICHIER :\nFichier audio non compressé (1s) = fe × n (bits) = fe × n/8 (octets)",
              remarque:"Shannon a démontré en 1948 que fe=2fmax est la limite théorique. En pratique, on prend une marge : fe ≈ 2,2 à 2,5 × fmax pour éviter l'aliasing." },
          ],
          exercices:[
            { id:'EX-SE1', niveau:'Facile', titre:'Critère de Shannon',
              enonce:"Signal audio fmax=20000Hz. Fréquence d'échantillonnage minimale ?",
              correction:"fe_min = 2×fmax = 2×20000 = 40000 Hz = 40 kHz.\n(CD audio utilise 44,1 kHz pour sécurité.)" },
            { id:'EX-SE2', niveau:'Intermédiaire', titre:'Poids d\'un fichier audio',
              enonce:"Chanson de 3min, fe=44100Hz, n=16bits, stéréo (2 canaux). Poids non compressé ?",
              correction:"Nb d'échantillons=3×60×44100=7938000.\nBits=7938000×16×2=254016000 bits.\nOctets=254016000/8=31752000 octets≈30MB." },
            { id:'EX-SE3', niveau:'Intermédiaire', titre:'Niveaux de quantification',
              enonce:"Quantification sur n=10 bits. Combien de niveaux ? Résolution si plage [0;5V] ?",
              correction:"Niveaux = 2¹⁰ = 1024.\nRésolution = 5/1024 ≈ 4,9×10⁻³V ≈ 5mV." },
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
export default function PhysiquePremiereSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'quantite-matiere'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
          <h2>Chapitre non trouvé</h2>
          <Link href="/bac-france/physique/premiere" style={{ color:'#4f6ef7' }}>
            ← Retour Physique-Chimie Première
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#4f6ef7'

  const GROUPS = [
    { label:'Section 1 — Constitution & Transformations', slugs:NAV_ORDER.slice(0,3) },
    { label:'Section 2 — Mouvement & Interactions', slugs:NAV_ORDER.slice(3,6) },
    { label:'Section 3 — Énergie', slugs:NAV_ORDER.slice(6,9) },
    { label:'Section 4 — Ondes & Signaux', slugs:NAV_ORDER.slice(9) },
  ]

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link><span>›</span>
          <Link href="/bac-france/physique/premiere" style={{ color:'var(--muted)', textDecoration:'none' }}>Première</Link><span>›</span>
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
                    background:`${secColor}14`, color:secColor, fontWeight:700 }}>{chapter.badge}</span>
                  <span style={{ fontSize:11, background:'rgba(79,110,247,0.15)',
                    color:'#818cf8', padding:'2px 9px', borderRadius:10 }}>
                    {SEC_LABEL[slug]} · Première · 6h/sem
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Physique-Chimie Première France Bac 2027')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/simulation-france"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    🎯 Simulation Bac PC
                  </Link>
                  <Link href="/bac-france/physique/terminale"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`${secColor}10`, border:`1px solid ${secColor}30`,
                      color:secColor, fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📗 Suite en Terminale
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
                                      <Link href={`/solve?q=${encodeURIComponent('Physique-Chimie Première France — '+ex.enonce)}`}
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
                  <Link href={`/bac-france/physique/premiere/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/premiere/${nextSlug}`} style={{ textDecoration:'none' }}>
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

            {/* ═══════ SIDEBAR ═══════ */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  ⚛️ Physique-Chimie Première · 13 ch.
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac-france/physique/premiere/${s}`} style={{ textDecoration:'none' }}>
                        <div style={{ padding:'8px 15px', borderBottom:'1px solid var(--border)',
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
                ))}
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Physique-Chimie Première France')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac PC</Link>
                  <Link href="/bac-france/physique/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📗 Terminale PC</Link>
                  <Link href="/bac-france/physique/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
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