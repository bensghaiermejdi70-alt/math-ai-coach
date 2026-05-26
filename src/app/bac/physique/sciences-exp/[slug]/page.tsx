'use client'

import { useState } from 'react'

import Navbar from '@/components/layout/Navbar'

import Footer from '@/components/layout/Footer'

import Link from 'next/link'

import { useParams } from 'next/navigation'



// ══════════════════════════════════════════════════════════════════════

// PHYSIQUE-CHIMIE — SECTION SCIENCES EXPÉRIMENTALES / [SLUG]

// Route : /bac/physique/sciences-exp/[slug]

// Programme officiel MEN Tunisie · 4ème année Sc. Exp.

// 7 chapitres Physique + 5 chapitres Chimie = 12 au total

// Spécificités : RC, RL, LC, oscillations mécaniques, ondes, nucléaire

// ══════════════════════════════════════════════════════════════════════



const C = { thm:'#06b6d4', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899', loi:'#f97316' }

const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', loi:'Loi' }



const NAV_ORDER = [
  'dipole-rc','dipole-rl','oscillations-lc','oscillations-mecaniques',
  'ondes-mecaniques','ondes-lumineuses-exp','nucleaire-exp',
  'oscillations-forcees-mec','interaction-onde-matiere',
  'cinetique-exp','equilibres-exp','acide-base-exp','electrochimie-exp','organique-exp',
]



const TITRES_NAV: Record<string,string> = {

  'dipole-rc':              'CH 01 — Dipôle RC',

  'dipole-rl':              'CH 02 — Dipôle RL',

  'oscillations-lc':        'CH 03 — Oscillations électriques (LC)',

  'oscillations-mecaniques':'CH 04 — Oscillations mécaniques libres',

  'ondes-mecaniques':       'CH 05 — Ondes mécaniques progressives',

  'ondes-lumineuses-exp':   'CH 06 — Ondes lumineuses',

  'nucleaire-exp':          'CH 07 — Réactions nucléaires',
  'oscillations-forcees-mec':'CH 08 — Oscillations forcées méc.',
  'interaction-onde-matiere': 'CH 09 — Interaction onde-matière',

  'cinetique-exp':          'CH 08 — Cinétique chimique',

  'equilibres-exp':         'CH 09 — Équilibres chimiques',

  'acide-base-exp':         'CH 10 — Acides et bases',

  'electrochimie-exp':      'CH 11 — Électrochimie',

  'organique-exp':          'CH 12 — Chimie organique',

}



const SEC_COLORS: Record<string,string> = {

  'dipole-rc':'#4f6ef7','dipole-rl':'#8b5cf6','oscillations-lc':'#06b6d4',

  'oscillations-mecaniques':'#10b981','ondes-mecaniques':'#f59e0b',

  'ondes-lumineuses-exp':'#14b8a6','nucleaire-exp':'#ef4444',

  'cinetique-exp':'#f59e0b','equilibres-exp':'#8b5cf6','acide-base-exp':'#10b981',

  'electrochimie-exp':'#ef4444','organique-exp':'#06b6d4',

}



const IS_CHIMIE: Record<string,boolean> = {

  'cinetique-exp':true,'equilibres-exp':true,'acide-base-exp':true,

  'electrochimie-exp':true,'organique-exp':true,

}



type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }

type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }

type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }

type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }

type Chap = { id:string; titre:string; tag:string; color:string; emoji:string; desc:string; souschapitres:SC[] }



// ══════════════════════════════════════════════════════════════════════

// DONNÉES — 12 CHAPITRES

// ══════════════════════════════════════════════════════════════════════

const ALL_CHAPTERS: Record<string,Chap> = {



// ══════════════════════════════════════════════════════════════════════

// ████  PHYSIQUE — 7 CHAPITRES

// ══════════════════════════════════════════════════════════════════════



// ─────────────────────────────────────────────────────────────────────

// CH 01 — DIPÔLE RC

// ─────────────────────────────────────────────────────────────────────

'dipole-rc': {

  id:'dipole-rc', emoji:'🔌', tag:'Physique', color:'#4f6ef7',

  titre:'Dipôle RC',

  desc:"Condensateur (charge, énergie E=½CU²), réponse du dipôle RC à un échelon de tension, constante de temps τ=RC, équation différentielle, courbes u_C(t) et i(t).",

  souschapitres:[

    {

      id:'sc-rc-capa', titre:'1.1 Condensateur — charge et énergie',

      notions:['Condensateur : q=CU (charge)','Capacité C en Farads (F)','E_C=½CU² (énergie)','Courant de charge i=C·du_C/dt'],

      blocs:[

        {

          notion:'🔌 Condensateur',

          theoremes:[

            { id:'D-RC1', type:'def', nom:'Condensateur — définition et propriétés',

              enonce:"Condensateur de capacité C :\nCharge q = C·u_C\nCourant : i = dq/dt = C·du_C/dt\n\nC s'exprime en Farads (F)\n(en pratique μF = 10⁻⁶F ou nF = 10⁻⁹F)\n\nÉNERGIE EMMAGASINÉE :\nE_C = ½C·U_C²  (en Joules)\n\nCONDENSATEUR CHARGÉ :\nSi i=0 → u_C=constante (régime permanent)\nEn continu : le condensateur est un circuit ouvert\n(bloque le courant continu en régime permanent)" },

          ],

          exercices:[

            { id:'EX-RC1', niveau:'Facile', titre:'Énergie d\'un condensateur',

              enonce:"Condensateur C=100μF chargé à U=20V. Énergie emmagasinée ?",

              correction:"E_C=½×100×10⁻⁶×400=2×10⁻²J=20mJ." },

          ]

        },

      ]

    },

    {

      id:'sc-rc-circuit', titre:'1.2 Circuit RC — charge et décharge',

      notions:['τ=RC (constante de temps)','Charge : u_C=E(1−e^(−t/τ))','Décharge : u_C=U₀·e^(−t/τ)','Détermination graphique de τ : à t=τ, u_C=0,63E'],

      blocs:[

        {

          notion:'📈 Réponse du circuit RC',

          theoremes:[

            { id:'F-RC1', type:'formule', nom:'Charge et décharge du condensateur',

              enonce:"CHARGE (condensateur initialement déchargé) :\nLoi des mailles : E = u_R + u_C = Ri + u_C\nComme i=C·du_C/dt :\nRC·du_C/dt + u_C = E  (équation différentielle)\n\nSOLUTION :\nu_C(t) = E·(1 − e^(−t/τ))  avec τ = RC\ni(t) = (E/R)·e^(−t/τ)\n\nÀ t=τ : u_C = E(1−e⁻¹) ≈ 0,63E  ← lire τ graphiquement\nÀ t=5τ : u_C ≈ 0,99E  (régime permanent atteint)\n\nDÉCHARGE (condensateur initialement chargé à U₀) :\nu_C(t) = U₀·e^(−t/τ)\ni(t) = −(U₀/R)·e^(−t/τ)  (courant en sens inverse)\n\nÀ t=τ : u_C = U₀·e⁻¹ ≈ 0,37U₀",

              remarque:"τ = RC est la seule constante de temps. Plus τ est grand, plus la charge/décharge est lente. Unité : τ en secondes si R en Ω et C en F." },

            { id:'M-RC1', type:'methode', nom:'Lire τ graphiquement',

              enonce:"MÉTHODE 1 — Tangente à l'origine :\nLa tangente à u_C(t) en t=0 coupe l'asymptote y=E en t=τ\n\nMÉTHODE 2 — Valeur à 63% :\nτ = t pour lequel u_C = 0,63·E (charge)\nτ = t pour lequel u_C = 0,37·U₀ (décharge)\n\nVÉRIFICATION :\nτ = RC (calculer avec les valeurs de R et C)" },

          ],

          exercices:[

            { id:'EX-RC2', niveau:'Facile', titre:'Constante de temps',

              enonce:"R=2kΩ, C=10μF. Calculer τ. À t=τ, quelle est la tension u_C si E=12V ?",

              correction:"τ=RC=2000×10×10⁻⁶=0,02s=20ms.\nu_C(τ)=12×(1−e⁻¹)=12×0,632≈7,58V." },

            { id:'EX-RC3', niveau:'Intermédiaire', titre:'Décharge RC',

              enonce:"Condensateur C=50μF chargé à U₀=10V, déchargé dans R=1kΩ. Tension après 100ms ?",

              correction:"τ=1000×50×10⁻⁶=0,05s=50ms.\nt/τ=100/50=2.\nu_C(100ms)=10·e⁻²=10×0,135=1,35V." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 02 — DIPÔLE RL

// ─────────────────────────────────────────────────────────────────────

'dipole-rl': {

  id:'dipole-rl', emoji:'🌀', tag:'Physique', color:'#8b5cf6',

  titre:'Dipôle RL',

  desc:"Bobine : inductance L, FEM e_L=−L·di/dt, réponse du dipôle RL à un échelon, τ=L/R, énergie E_L=½LI², régime permanent.",

  souschapitres:[

    {

      id:'sc-rl-bobine', titre:'2.1 Bobine — inductance et FEM',

      notions:['Inductance L en Henry (H)','FEM e_L=−L·di/dt','Énergie E_L=½LI²','En DC régime perm. : bobine = fil'],

      blocs:[

        {

          notion:'🌀 Bobine et auto-induction',

          theoremes:[

            { id:'D-RL1', type:'def', nom:'Bobine — inductance et FEM',

              enonce:"Bobine d'inductance L :\nFEM d'auto-induction : e_L = −L·di/dt\nTension aux bornes : u_L = L·di/dt\n\nL s'exprime en Henry (H) (en pratique mH = 10⁻³H)\n\nÉNERGIE EMMAGASINÉE :\nE_L = ½L·I²  (en Joules)\n\nEN RÉGIME PERMANENT CONTINU :\ndi/dt = 0 → e_L = 0 → la bobine se comporte comme un fil\n\nPROPRIÉTÉ : i ne peut pas varier brutalement dans une bobine\n(Sinon |e_L| = L|di/dt| → infini : impossible)" },

          ],

          exercices:[

            { id:'EX-RL1', niveau:'Facile', titre:'Énergie d\'une bobine',

              enonce:"Bobine L=0,1H traversée par I=4A. Énergie emmagasinée ?",

              correction:"E_L=½×0,1×16=0,8J." },

          ]

        },

      ]

    },

    {

      id:'sc-rl-circuit', titre:'2.2 Circuit RL — établissement et rupture du courant',

      notions:['τ=L/R (constante de temps)','Établissement : i=I_max(1−e^(−t/τ))','Rupture : i=I_max·e^(−t/τ)','I_max=E/R (régime permanent)'],

      blocs:[

        {

          notion:'📈 Réponse du circuit RL',

          theoremes:[

            { id:'F-RL1', type:'formule', nom:'Établissement et rupture du courant',

              enonce:"ÉTABLISSEMENT (circuit RL branché à E) :\nLoi des mailles : E = u_R + u_L = Ri + L·di/dt\nL·di/dt + R·i = E  (équation différentielle)\n\nSOLUTION :\ni(t) = I_max·(1 − e^(−t/τ))  avec τ = L/R et I_max = E/R\nu_L(t) = E·e^(−t/τ)\n\nÀ t=τ : i = I_max(1−e⁻¹) ≈ 0,63·I_max\nÀ t=5τ : i ≈ I_max (régime permanent)\n\nRUPTURE DU COURANT (générateur débranché) :\ni(t) = I_max·e^(−t/τ)\n\nATTENTION : lors de la rupture, u_L peut être très grande\n→ Arc électrique → protéger le circuit avec une diode de roue libre",

              remarque:"Analogie avec RC : τ=L/R pour RL, τ=RC pour RC. Dans RL, c'est le courant qui suit la loi exponentielle (pas la tension)." },

          ],

          exercices:[

            { id:'EX-RL2', niveau:'Facile', titre:'Constante de temps RL',

              enonce:"L=0,5H, R=100Ω, E=10V. Calculer τ, I_max et i(τ).",

              correction:"τ=L/R=0,5/100=5ms.\nI_max=E/R=10/100=0,1A.\ni(τ)=0,1×(1−e⁻¹)≈0,063A=63mA." },

            { id:'EX-RL3', niveau:'Intermédiaire', titre:'Énergie lors de l\'établissement',

              enonce:"L=0,2H, I_max=2A. Énergie emmagasinée à régime permanent ?",

              correction:"E_L=½×0,2×4=0,4J." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 03 — OSCILLATIONS ÉLECTRIQUES LIBRES (LC)

// ─────────────────────────────────────────────────────────────────────

'oscillations-lc': {

  id:'oscillations-lc', emoji:'〰️', tag:'Physique', color:'#06b6d4',

  titre:'Oscillations électriques libres',

  desc:"Circuit LC : oscillations libres non amorties, équation différentielle, période propre T₀=2π√(LC), conservation de l'énergie électromagnétique, analogie mécanique.",

  souschapitres:[

    {

      id:'sc-lc-oscil', titre:'3.1 Circuit LC — oscillations libres',

      notions:['q\'\'+(1/LC)q=0 (équation différentielle)','Solution q(t)=Q_max·cos(ω₀t+φ)','ω₀=1/√(LC), T₀=2π√(LC)','Échanges Ec ↔ EL periodiques'],

      blocs:[

        {

          notion:'〰️ Circuit LC et oscillations',

          theoremes:[

            { id:'D-LC1', type:'def', nom:'Oscillations libres dans un circuit LC',

              enonce:"Circuit LC (condensateur C + bobine L) :\nLoi des mailles : u_C + u_L = 0\nq/C + L·d²q/dt² = 0\n\nÉQUATION DIFFÉRENTIELLE :\nd²q/dt² + (1/LC)·q = 0\n\nSOLUTION GÉNÉRALE :\nq(t) = Q_max·cos(ω₀t + φ)\n\nPULSATION PROPRE : ω₀ = 1/√(LC)\nPÉRIODE PROPRE : T₀ = 2π/ω₀ = 2π√(LC)\nFRÉQUENCE PROPRE : f₀ = 1/(2π√(LC))\n\nTENSION : u_C(t) = Q_max/C·cos(ω₀t+φ)\nINTENSITÉ : i(t) = dq/dt = −Q_max·ω₀·sin(ω₀t+φ)",

              remarque:"Oscillations non amorties : modèle idéal (sans résistance). En réalité, une résistance dissipe l'énergie → oscillations amorties." },

            { id:'F-LC1', type:'formule', nom:'Énergie et analogie mécanique',

              enonce:"ÉNERGIE ÉLECTROMAGNÉTIQUE TOTALE :\nE = E_C + E_L = ½Cu_C² + ½Li² = constante\n(sans amortissement)\n\nÉCHANGES :\nMax E_C (i=0) ↔ Max E_L (u_C=0)\n\nANALOGIE avec le pendule (oscillateur mécanique) :\nCharge q ↔ position x\nCourant i ↔ vitesse v\nInductance L ↔ masse m\n1/C ↔ raideur k\nω₀=√(k/m) ↔ ω₀=√(1/LC)\n\nPériode propre : T₀ = 2π√(LC)  ↔  T = 2π√(m/k)" },

          ],

          exercices:[

            { id:'EX-LC1', niveau:'Facile', titre:'Période propre',

              enonce:"L=10mH, C=1μF. Calculer T₀ et f₀.",

              correction:"T₀=2π√(LC)=2π√(10⁻²×10⁻⁶)=2π×10⁻⁴≈6,28×10⁻⁴s.\nf₀=1/T₀≈1592 Hz≈1,6kHz." },

            { id:'EX-LC2', niveau:'Intermédiaire', titre:'Conservation d\'énergie',

              enonce:"Circuit LC : Q_max=0,2mC, C=20μF. Courant maximal ? (L=50mH)",

              correction:"E_C_max=Q_max²/(2C)=(4×10⁻⁸)/(4×10⁻⁵)=10⁻³J.\nE_L_max=½LI_max²=10⁻³J → I_max=√(2×10⁻³/0,05)=0,2A." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 04 — OSCILLATIONS MÉCANIQUES LIBRES

// ─────────────────────────────────────────────────────────────────────

'oscillations-mecaniques': {

  id:'oscillations-mecaniques', emoji:'🔔', tag:'Physique', color:'#10b981',

  titre:'Oscillations mécaniques libres',

  desc:"Pendule simple (T=2π√(l/g)), système masse-ressort (T=2π√(m/k)), énergie mécanique conservée, amortissement.",

  souschapitres:[

    {

      id:'sc-mec-pendule', titre:'4.1 Pendule simple et masse-ressort',

      notions:['Pendule : θ\'\'+(g/l)θ=0','T_pendule=2π√(l/g)','Masse-ressort : x\'\'+(k/m)x=0','T_ressort=2π√(m/k)'],

      blocs:[

        {

          notion:'🔔 Oscillateurs mécaniques',

          theoremes:[

            { id:'D-OM1', type:'def', nom:'Pendule simple',

              enonce:"Pendule de longueur l, masse m, angle θ :\nPour de PETITES oscillations (θ < 10°) :\n\nÉQUATION DIFFÉRENTIELLE :\nd²θ/dt² + (g/l)·θ = 0\n\nSOLUTION : θ(t) = θ_max·cos(ω₀t + φ)\n\nPULSATION : ω₀ = √(g/l)\nPÉRIODE : T₀ = 2π√(l/g)\n\nPROPRIÉTÉ :\nT₀ ne dépend PAS de la masse m, ni de θ_max (isochronisme)\n(valable pour petites oscillations uniquement)" },

            { id:'F-OM1', type:'formule', nom:'Système masse-ressort',

              enonce:"Masse m sur ressort de raideur k (horizontal, sans frottements) :\nÀ l'équilibre : x = 0\nDéplacée de x : Force de rappel F = −kx\n\nÉQUATION DIFFÉRENTIELLE :\nm·d²x/dt² + k·x = 0\nd²x/dt² + (k/m)·x = 0\n\nSOLUTION : x(t) = X_max·cos(ω₀t + φ)\n\nPULSATION : ω₀ = √(k/m)\nPÉRIODE : T₀ = 2π√(m/k)\n\nÉNERGIE MÉCANIQUE (sans frottements) :\nEm = ½mv² + ½kx² = ½kX_max² = constante",

              remarque:"Analogie LC/mécanique : ω₀=1/√(LC) ↔ ω₀=√(k/m). L↔m, 1/C↔k." },

          ],

          exercices:[

            { id:'EX-OM1', niveau:'Facile', titre:'Période d\'un pendule',

              enonce:"Pendule de longueur l=0,5m. Période sur Terre (g=9,8m/s²) et sur la Lune (g=1,6m/s²) ?",

              correction:"T_Terre=2π√(0,5/9,8)≈1,42s.\nT_Lune=2π√(0,5/1,6)≈3,52s." },

            { id:'EX-OM2', niveau:'Intermédiaire', titre:'Masse-ressort',

              enonce:"k=50N/m, m=200g. Calculer ω₀, T₀ et l'amplitude si v_max=1m/s.",

              correction:"ω₀=√(50/0,2)=√250≈15,8 rad/s.\nT₀=2π/ω₀≈0,4s.\nX_max=v_max/ω₀=1/15,8≈0,063m=6,3cm." },

          ]

        },

      ]

    },

    {

      id:'sc-mec-amort', titre:'4.2 Énergie et amortissement',

      notions:['Em=Ec+Ep=cste (sans frottements)','Amortissement : Em décroît','Oscillations amorties vs libres','Résonance : ω=ω₀'],

      blocs:[

        {

          notion:'⚡ Énergie mécanique et amortissement',

          theoremes:[

            { id:'T-OM1', type:'thm', nom:'Conservation et amortissement',

              enonce:"SANS FROTTEMENTS :\nEm = ½mv² + mgh = ½mv² + ½kx² = constante\nÉchanges Ec ↔ Ep périodiques\n\nAVEC FROTTEMENTS (amortissement) :\nEm décroît à chaque oscillation\nÉnergie dissipée = chaleur\nL'amplitude décroît exponentiellement\n\nOSCILLATIONS AMORTIES :\nx(t) = X₀·e^(−αt)·cos(ω₁t + φ)\nω₁ < ω₀ (fréquence légèrement diminuée)\n\nPour oscillations libres (peu d'amortissement) :\nω₁ ≈ ω₀" },

          ],

          exercices:[

            { id:'EX-OM3', niveau:'Intermédiaire', titre:'Énergie mécanique',

              enonce:"Pendule : θ_max=8°, l=0,6m, m=0,5kg. Énergie mécanique ? (g=10m/s²)",

              correction:"h_max=l(1−cosθ_max)=0,6(1−cos8°)=0,6×0,0098≈5,9×10⁻³m.\nEm=mgh_max=0,5×10×5,9×10⁻³≈0,029J." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 05 — ONDES MÉCANIQUES PROGRESSIVES

// ─────────────────────────────────────────────────────────────────────

'ondes-mecaniques': {

  id:'ondes-mecaniques', emoji:'🌊', tag:'Physique', color:'#f59e0b',

  titre:'Ondes mécaniques progressives',

  desc:"Propagation d'une perturbation, célérité v, ondes transversales/longitudinales, ondes sinusoïdales : longueur d'onde λ=vT, retard temporel.",

  souschapitres:[

    {

      id:'sc-om-def', titre:'5.1 Notion d\'onde et propriétés',

      notions:['Onde = propagation d\'énergie sans transport de matière','Ondes transversales (corde) / longitudinales (son)','Célérité v (dépend du milieu)','Retard τ=d/v entre deux points'],

      blocs:[

        {

          notion:'🌊 Ondes mécaniques',

          theoremes:[

            { id:'D-ON1', type:'def', nom:'Onde mécanique — définition',

              enonce:"ONDE MÉCANIQUE :\nPropagation d'une PERTURBATION dans un milieu matériel\nÉnergie transportée SANS déplacement de matière\nMilieu matériel nécessaire (pas dans le vide)\n\nONDES TRANSVERSALES :\nVibration ⊥ direction de propagation\nExemples : cordes, ondes à la surface de l'eau, séismes S\n\nONDES LONGITUDINALES :\nVibration ∥ direction de propagation\nExemples : son, ultrasons, séismes P\n\nCÉLÉRITÉ v :\nDépend du milieu (pas de la fréquence)\nSon dans l'air : v ≈ 340m/s (à 20°C)\nSon dans l'eau : v ≈ 1500m/s\nLumière dans le vide : c = 3×10⁸m/s" },

            { id:'F-ON1', type:'formule', nom:'Relations fondamentales des ondes',

              enonce:"RETARD TEMPOREL entre points A et B (séparés par d) :\nΔt = d/v\n\nSi la source vibre à la fréquence f :\nPÉRIODE TEMPORELLE : T = 1/f\nLONGUEUR D'ONDE λ :\nλ = v·T = v/f\n\nRÉSUMÉ :\nλ = vT = v/f  →  v = λf = λ/T\n\nUNITÉS :\nv en m/s ; T en s ; λ en m ; f en Hz\n\nINTERPRÉTATION :\nλ : distance parcourue par l'onde pendant une période T\nλ : distance entre deux points en phase (même état vibratoire)" },

          ],

          exercices:[

            { id:'EX-ON1', niveau:'Facile', titre:'Longueur d\'onde',

              enonce:"Son : f=440Hz (la₄), v=340m/s. Calculer λ et le retard pour d=10m.",

              correction:"λ=v/f=340/440≈0,77m.\nΔt=d/v=10/340≈0,029s=29ms." },

            { id:'EX-ON2', niveau:'Intermédiaire', titre:'Mesure de célérité',

              enonce:"Deux capteurs séparés de 30cm. Signal reçu par le 2e avec un retard de 1ms. Célérité ?",

              correction:"v=d/Δt=0,30/10⁻³=300m/s." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 06 — ONDES LUMINEUSES (Sc. Exp.)

// ─────────────────────────────────────────────────────────────────────

'ondes-lumineuses-exp': {

  id:'ondes-lumineuses-exp', emoji:'🌈', tag:'Physique', color:'#14b8a6',

  titre:'Ondes lumineuses',

  desc:"Diffraction (λ≈a), interférences lumineuses (fentes d'Young, i=λD/a), spectre électromagnétique, spectres d'émission et d'absorption des éléments.",

  souschapitres:[

    {

      id:'sc-ol-diff', titre:'6.1 Diffraction et interférences',

      notions:['Diffraction : tache centrale si λ≈a','Fentes d\'Young : i=λD/a','Interfranges brillantes : δ=kλ','Interfranges sombres : δ=(2k+1)λ/2'],

      blocs:[

        {

          notion:'🌈 Diffraction et interférences',

          theoremes:[

            { id:'D-OL1', type:'def', nom:'Diffraction de la lumière',

              enonce:"DIFFRACTION observable si : λ ≈ a (λ = longueur d'onde, a = largeur obstacle/fente)\n\nTACHE CENTRALE :\nLargeur L = 2λD/a  (D = distance fente-écran)\n\nConditions :\n• a > λ : pas de diffraction visible\n• a ≈ λ : diffraction très marquée\n• a < λ : diffraction généralisée\n\nEXEMPLES :\nλ_rouge ≈ 700nm, λ_violet ≈ 400nm" },

            { id:'F-OL1', type:'formule', nom:'Interférences — Fentes d\'Young',

              enonce:"Deux fentes distantes de a, écran à distance D :\n\nINTERFRANGE : i = λD/a\n\nFRANGES BRILLANTES (interférences constructives) :\nδ = kλ  (k entier : 0, ±1, ±2, …)\nx_k = k·i\n\nFRANGES SOMBRES (interférences destructives) :\nδ = (2k+1)·λ/2\nx_k = (2k+1)·i/2\n\nMESURE DE λ :\nλ = i·a/D  (mesurer i à la règle, a au pied à coulisse, D au mètre)",

              remarque:"En Sc. Exp. : les interférences par fentes d'Young permettent de mesurer λ précisément. L'interfrange est plus grand pour le rouge (λ plus grand) que pour le violet." },

          ],

          exercices:[

            { id:'EX-OL1', niveau:'Facile', titre:'Interfrange',

              enonce:"Fentes d'Young : a=0,5mm, D=2m, λ=550nm. Calculer l'interfrange.",

              correction:"i=λD/a=550×10⁻⁹×2/(0,5×10⁻³)=2,2×10⁻³m=2,2mm." },

            { id:'EX-OL2', niveau:'Intermédiaire', titre:'Détermination de λ',

              enonce:"On mesure 10 interfrages sur 18mm. a=0,3mm, D=1,5m. Trouver λ.",

              correction:"i=18/10=1,8mm=1,8×10⁻³m.\nλ=i·a/D=1,8×10⁻³×0,3×10⁻³/1,5=3,6×10⁻⁷m=360nm... Vérifier : λ=i×a/D=0,0018×0,0003/1,5=3,6×10⁻⁷m ≈ UV (à vérifier avec les données)." },

          ]

        },

      ]

    },

    {

      id:'sc-ol-spectres', titre:'6.2 Spectres d\'émission et d\'absorption',

      notions:['Spectre continu d\'un corps chaud','Spectre de raies d\'émission : discontinu','Spectre d\'absorption : raies sombres','Identification des éléments par spectroscopie'],

      blocs:[

        {

          notion:'🔬 Spectroscopie',

          theoremes:[

            { id:'D-OL2', type:'def', nom:'Spectres d\'émission et d\'absorption',

              enonce:"SPECTRE CONTINU :\nÉmis par un corps chaud (solide, liquide)\nToutes les longueurs d'onde du visible\n\nSPECTRE D'ÉMISSION (raies brillantes) :\nGaz chaud → raies colorées sur fond noir\nChaque élément a un spectre UNIQUE (empreinte digitale)\nExemple : sodium → raies jaunes (589nm)\n\nSPECTRE D'ABSORPTION (raies sombres) :\nLumière blanche à travers un gaz froid\n→ raies sombres aux mêmes longueurs d'onde que l'émission\n\nIDENTIFICATION :\nComparer avec des spectres de référence\nApplications : composition des étoiles, analyse chimique",

              remarque:"Le spectre du Soleil est un spectre d'absorption : lumière continue de la photosphère absorbée par la chromosphère (raies de Fraunhofer)." },

          ],

          exercices:[

            { id:'EX-OL3', niveau:'Facile', titre:'Identification d\'un élément',

              enonce:"Un spectre d'émission présente des raies à 656nm, 486nm, 434nm. Quel élément ?",

              correction:"Ces raies correspondent à l'hydrogène (série de Balmer : Hα=656nm rouge, Hβ=486nm bleu-vert, Hγ=434nm violet)." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 07 — RÉACTIONS NUCLÉAIRES (Sc. Exp.)

// ─────────────────────────────────────────────────────────────────────

'nucleaire-exp': {

  id:'nucleaire-exp', emoji:'☢️', tag:'Physique', color:'#ef4444',

  titre:'Réactions nucléaires',

  desc:"Radioactivité (α, β, γ), loi de décroissance N=N₀e^(−λt), demi-vie t₁/₂=ln2/λ, fission et fusion nucléaire, défaut de masse et énergie E=Δm·c².",

  souschapitres:[

    {

      id:'sc-nuc-radio', titre:'7.1 Radioactivité et loi de décroissance',

      notions:['Rayonnements α (²₄He), β (e⁻ ou e⁺), γ (photon)','N(t)=N₀·e^(−λt)','t₁/₂=ln2/λ≈0,693/λ','Activité A=λN'],

      blocs:[

        {

          notion:'☢️ Radioactivité',

          theoremes:[

            { id:'D-NR1', type:'def', nom:'Types de radioactivité',

              enonce:"RADIOACTIVITÉ : désintégration spontanée d'un noyau instable\n\nRAYONNEMENT α :\nÉmission d'un noyau d'hélium ⁴₂He\nPouvoir de pénétration : faible (arrêté par feuille de papier)\nCharge : +2 ; masse : 4 uma\nLoi : A_Z X → A-4_(Z-2) Y + ⁴₂He\n\nRAYONNEMENT β⁻ :\nÉmission d'un électron e⁻ et antineutrino ν̄\nConversion : n → p + e⁻ + ν̄\nCharge : −1 ; masse : ≈ 0\nLoi : A_Z X → A_(Z+1) Y + e⁻ + ν̄\n\nRAYONNEMENT γ :\nÉmission de photons très énergétiques\nPas de changement de A ni Z\nPouvoir de pénétration : très fort (béton, plomb nécessaires)" },

            { id:'F-NR1', type:'formule', nom:'Loi de décroissance radioactive',

              enonce:"LOI DE DÉCROISSANCE :\nN(t) = N₀·e^(−λt)\nA(t) = λ·N(t) = A₀·e^(−λt)\nm(t) = m₀·e^(−λt)\n\nλ : constante radioactive (s⁻¹, propre à chaque noyau)\nN₀ : nombre de noyaux à t=0\nA : activité en Becquerel (Bq = désintégration/s)\n\nDEMI-VIE (période radioactive) t₁/₂ :\nt₁/₂ = ln2/λ = 0,693/λ\nÀ t=t₁/₂ : N = N₀/2\n\nÀ t = n·t₁/₂ : N = N₀/2ⁿ\n\nExemples :\nCarbone 14 : t₁/₂ ≈ 5730 ans (datation)\nRa-226 : t₁/₂ ≈ 1600 ans\nTc-99m : t₁/₂ ≈ 6h (médecine nucléaire)",

              remarque:"La datation au C14 : mesurer l'activité d'un échantillon et comparer à l'activité initiale connue → t = t₁/₂·log₂(A₀/A)." },

          ],

          exercices:[

            { id:'EX-NR1', niveau:'Facile', titre:'Loi de décroissance',

              enonce:"N₀=10⁸ noyaux, λ=0,1s⁻¹. Combien après 10s ? Demi-vie ?",

              correction:"N(10)=10⁸×e^(−0,1×10)=10⁸×e⁻¹≈3,68×10⁷.\nt₁/₂=ln2/0,1=6,93s." },

            { id:'EX-NR2', niveau:'Intermédiaire', titre:'Nombre de demi-vies',

              enonce:"Après 3 demi-vies, quelle fraction reste ? Après 10 demi-vies ?",

              correction:"Après 3 t₁/₂ : N=N₀/2³=N₀/8 → 12,5%.\nAprès 10 t₁/₂ : N=N₀/2¹⁰=N₀/1024 ≈ 0,098%." },

          ]

        },

      ]

    },

    {

      id:'sc-nuc-energie', titre:'7.2 Réactions nucléaires et énergie',

      notions:['Conservation A (nucléons) et Z (charge)','Défaut de masse Δm','E=Δm·c² (Einstein)','Fission (²³⁵U) et fusion (H → He)'],

      blocs:[

        {

          notion:'⚡ Énergie nucléaire',

          theoremes:[

            { id:'F-NR2', type:'formule', nom:'Énergie des réactions nucléaires',

              enonce:"LOIS DE CONSERVATION :\n• Conservation du nombre de masse A (nucléons)\n• Conservation du nombre de charge Z\n\nDÉFAUT DE MASSE :\nΔm = Σm_réactifs − Σm_produits\n\nÉNERGIE LIBÉRÉE (Einstein) :\nE = Δm·c²  avec c = 3×10⁸ m/s\nSi Δm en kg → E en Joules\nSi Δm en uma → E en MeV (1uma·c² = 931,5 MeV)\n\nFISSION (exemple ²³⁵U) :\n²³⁵U + n → fragments + neutrons + énergie (~200 MeV)\n→ Réaction en chaîne → centrale nucléaire\n\nFUSION (exemple D + T) :\n²H + ³H → ⁴He + n + 17,6 MeV\n→ Condition : température > 10⁸ K\n→ Source d'énergie des étoiles" },

          ],

          exercices:[

            { id:'EX-NR3', niveau:'Intermédiaire', titre:'Énergie de désintégration',

              enonce:"Désintégration α : m_père=228,029 uma, m_fille=224,021 uma, m_He=4,003 uma. Énergie libérée ?",

              correction:"Δm=228,029−(224,021+4,003)=0,005 uma.\nE=0,005×931,5=4,66 MeV." },

          ]

        },

      ]

    },

  ]

},



// ══════════════════════════════════════════════════════════════════════

// ████  CHIMIE — 5 CHAPITRES

// ══════════════════════════════════════════════════════════════════════



// ─────────────────────────────────────────────────────────────────────

// CH 08 — CINÉTIQUE CHIMIQUE (Sc. Exp.)

// ─────────────────────────────────────────────────────────────────────

'cinetique-exp': {

  id:'cinetique-exp', emoji:'⏱️', tag:'Chimie', color:'#f59e0b',

  titre:'Cinétique chimique',

  desc:"Vitesse de réaction v=−d[A]/dt, facteurs cinétiques (concentration, température, catalyse), temps de demi-réaction t₁/₂, suivi expérimental.",

  souschapitres:[

    {

      id:'sc-ck-vitesse', titre:'8.1 Vitesse de réaction et facteurs cinétiques',

      notions:['v=−(1/a)·d[A]/dt','t₁/₂ : [A]=[A]₀/2','Facteurs : concentration, T, catalyseur','Profil énergétique : E_a'],

      blocs:[

        {

          notion:'⏱️ Cinétique chimique',

          theoremes:[

            { id:'D-CK1', type:'def', nom:'Vitesse de réaction',

              enonce:"Pour aA + bB → cC + dD :\n\nVITESSE VOLUMIQUE :\nv = −(1/a)·d[A]/dt = (1/c)·d[C]/dt\n\nÀ partir du graphique [A](t) :\nv(t) = |pente de la tangente| / a\n\nTEMPS DE DEMI-RÉACTION t₁/₂ :\nTemps pour lequel [A] = [A]₀/2\n(ou avancement x = x_max/2)" },

            { id:'D-CK2', type:'def', nom:'Facteurs cinétiques et catalyse',

              enonce:"FACTEURS INFLUENÇANT LA VITESSE :\n\n1. CONCENTRATION :\n[réactifs]↑ → v↑ (plus de chocs)\n\n2. TEMPÉRATURE :\nT↑ → v↑ fortement (énergie des chocs > Ea)\nRègle empirique : +10°C → v×2 à 3\n\n3. CATALYSEUR :\nAbaisse Ea sans être consommé → v↑\nHOMOGÈNE : même phase que les réactifs\nHÉTÉROGÈNE : phase différente (platine solide + gaz)\nENZYMATIQUE : catalyseur biologique (enzyme)\n\n4. SURFACE DE CONTACT :\nSolide divisé → v↑ (broyage, poudre)",

              remarque:"Le catalyseur ne déplace pas l'équilibre thermodynamique (K inchangé) mais diminue le temps pour l'atteindre." },

          ],

          exercices:[

            { id:'EX-CK1', niveau:'Facile', titre:'Temps de demi-réaction',

              enonce:"[A]₀=0,6 mol/L. À t=120s, [A]=0,3 mol/L. t₁/₂ ?",

              correction:"t₁/₂=120s (par définition : [A]=0,3=[A]₀/2)." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 09 — ÉQUILIBRES CHIMIQUES (Sc. Exp.)

// ─────────────────────────────────────────────────────────────────────

'equilibres-exp': {

  id:'equilibres-exp', emoji:'⚖️', tag:'Chimie', color:'#8b5cf6',

  titre:'Équilibres chimiques',

  desc:"Avancement final, taux d'avancement τ=x_f/x_max, réactif limitant, état d'équilibre dynamique, Qr, constante K, loi de Le Chatelier.",

  souschapitres:[

    {

      id:'sc-eq-avancement', titre:'9.1 Avancement et taux d\'avancement final',

      notions:['Tableau d\'avancement : x variable','x_max : réactif limitant épuisé','τ=x_f/x_max (taux d\'avancement)','τ=1 : réaction totale ; τ<1 : limitée'],

      blocs:[

        {

          notion:'📊 Avancement et équilibre',

          theoremes:[

            { id:'M-EQ1', type:'methode', nom:'Tableau d\'avancement',

              enonce:"Pour aA + bB → cC + dD :\n\nTABLEAU :\nÉtat  |  A    |   B    |   C    |   D\nInitial| n(A)₀ | n(B)₀ |   0    |   0\nInter | n(A)₀−ax|n(B)₀−bx|  cx  |  dx\nFinal | n(A)_f| n(B)_f | n(C)_f | n(D)_f\n\nRÉACTIF LIMITANT :\nx_max = min(n(A)₀/a ; n(B)₀/b)\n→ Le réactif qui donne le plus petit x_max est le réactif limitant\n\nTAUX D'AVANCEMENT FINAL :\nτ = x_f / x_max\nτ = 1 : réaction totale (réactif limitant totalement consommé)\n0 < τ < 1 : réaction limitée (équilibre)\n\nRÉACTION À L'ÉQUILIBRE :\nQr = K  (critère d'équilibre)" },

            { id:'D-EQ1', type:'def', nom:'État d\'équilibre et loi de Le Chatelier',

              enonce:"ÉQUILIBRE DYNAMIQUE :\nLes réactions directe et inverse se produisent simultanément\nLes concentrations sont STABLES (mais pas nulles)\n\nCONSTANTE D'ÉQUILIBRE K :\nQr = K  à l'équilibre\n\nLOI DE LE CHATELIER :\nToute perturbation d'un équilibre provoque une évolution qui tend à s'y opposer\n\nEXEMPLES :\n• Ajouter un réactif → déplacement vers les produits\n• Retirer un produit → déplacement vers les produits\n• Augmenter T → déplacement vers le sens endothermique",

              remarque:"En Sc. Exp., on insiste sur les méthodes expérimentales : mesure des concentrations par spectrophotométrie, pH-métrie, conductimétrie." },

          ],

          exercices:[

            { id:'EX-EQ1', niveau:'Intermédiaire', titre:'Taux d\'avancement',

              enonce:"CH₃COOH + C₂H₅OH ⇌ Ester + H₂O. Départ : 1 mol de chaque. À l'équilibre : 0,67 mol d'ester. τ ?",

              correction:"x_max=1 mol (réactifs en proportions stœchiométriques).\nx_f=0,67 mol.\nτ=0,67/1=0,67=67%." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 10 — ACIDES ET BASES (Sc. Exp.)

// ─────────────────────────────────────────────────────────────────────

'acide-base-exp': {

  id:'acide-base-exp', emoji:'🧪', tag:'Chimie', color:'#10b981',

  titre:'Acides et bases',

  desc:"Théorie de Brønsted, couples AH/A⁻, pH=−log[H₃O⁺], acides et bases forts/faibles, Ka et pKa, diagramme de prédominance, dosage acide-base.",

  souschapitres:[

    {

      id:'sc-ab-ph', titre:'10.1 pH, Ka et prédominance',

      notions:['pH=−log[H₃O⁺]','Ka=[A⁻][H₃O⁺]/[AH]','pKa=−log Ka','pH<pKa : AH prédomine ; pH>pKa : A⁻ prédomine'],

      blocs:[

        {

          notion:'🧪 Acide-base et pH',

          theoremes:[

            { id:'F-AB1', type:'formule', nom:'pH et constante d\'acidité',

              enonce:"pH = −log[H₃O⁺]\n[H₃O⁺] = 10^(−pH)\n\nSolution acide : pH < 7\nSolution neutre : pH = 7\nSolution basique : pH > 7\n\nKe = [H₃O⁺]·[OH⁻] = 10⁻¹⁴  (à 25°C)\npKe = 14\n\nACIDE FORT (HCl, H₂SO₄…) :\n[H₃O⁺] = C → pH = −log C\n\nACIDE FAIBLE (CH₃COOH, HF…) :\n[H₃O⁺] = √(Ka·C) → pH = ½(pKa − log C)\n\nCONSTANTE D'ACIDITÉ Ka :\nKa = [A⁻][H₃O⁺]/[AH]\npKa = −log Ka\n\nDIAGRAMME DE PRÉDOMINANCE :\npH < pKa → AH prédomine\npH = pKa → [AH] = [A⁻]\npH > pKa → A⁻ prédomine" },

          ],

          exercices:[

            { id:'EX-AB1', niveau:'Facile', titre:'pH d\'une base forte',

              enonce:"NaOH, C=10⁻²mol/L. pH ?",

              correction:"Base forte : [OH⁻]=10⁻²→pOH=2→pH=14−2=12." },

            { id:'EX-AB2', niveau:'Intermédiaire', titre:'pH acide faible',

              enonce:"CH₃COOH : C=0,1mol/L, Ka=1,8×10⁻⁵. pH ?",

              correction:"[H₃O⁺]=√(1,8×10⁻⁵×0,1)=√(1,8×10⁻⁶)≈1,34×10⁻³.\npH=−log(1,34×10⁻³)≈2,87." },

          ]

        },

      ]

    },

    {

      id:'sc-ab-dosage', titre:'10.2 Dosage acide-base',

      notions:['Équivalence : n_a·C_a·V_a=n_b·C_b·V_b','Courbe pH(V) : point d\'inflexion','Indicateurs colorés : virages','Conductimétrie : conductance G'],

      blocs:[

        {

          notion:'📊 Titrage acide-base',

          theoremes:[

            { id:'M-AB1', type:'methode', nom:'Méthodes de dosage',

              enonce:"DOSAGE pH-MÉTRIQUE :\nVerser progressivement le titrant, mesurer pH\nPoint d'équivalence : point d'inflexion de la courbe pH(V)\n\nINDICATEURS COLORÉS :\nChangent de couleur au voisinage de pH_eq\nChoisir : pKi ≈ pH_éq\nExemples : BBT (pKi≈7), phénolphtaléine (pKi≈9,5), méthyl orange (pKi≈4)\n\nCONDUCTIMÉTRIE :\nMesurer la conductance G pendant le titrage\nÉquivalence : rupture de pente sur la courbe G(V)\n\nCALCUL À L'ÉQUIVALENCE :\nHCl + NaOH → NaCl + H₂O  (1:1)\nC_acide = C_NaOH × V_NaOH_éq / V_acide\n\nPour H₂SO₄ + 2NaOH :\nC_acide = C_NaOH × V_NaOH_éq / (2 × V_acide)" },

          ],

          exercices:[

            { id:'EX-AB3', niveau:'Intermédiaire', titre:'Dosage pH-métrique',

              enonce:"25mL de HCl dosé par NaOH à 0,2mol/L. Équivalence à V=15mL. [HCl] ?",

              correction:"n(NaOH)=0,2×0,015=3×10⁻³mol.\nHCl+NaOH (ratio 1:1) → n(HCl)=3×10⁻³mol.\n[HCl]=3×10⁻³/0,025=0,12mol/L." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 11 — ÉLECTROCHIMIE (Sc. Exp.)

// ─────────────────────────────────────────────────────────────────────

'electrochimie-exp': {

  id:'electrochimie-exp', emoji:'⚗️', tag:'Chimie', color:'#ef4444',

  titre:'Électrochimie',

  desc:"Réactions d'oxydoréduction, couples Ox/Red, équilibrage redox, piles électrochimiques (FEM, anode, cathode), électrolyse et loi de Faraday.",

  souschapitres:[

    {

      id:'sc-elec-redox', titre:'11.1 Réactions redox et piles',

      notions:['Oxydant capte e⁻, réducteur cède e⁻','Demi-équations Ox/Red','Piles : anode (−, oxydation) / cathode (+, réduction)','Loi de Faraday : m=MIt/(nF)'],

      blocs:[

        {

          notion:'⚗️ Redox et électrochimie',

          theoremes:[

            { id:'D-EL1', type:'def', nom:'Réactions redox et piles',

              enonce:"OXYDANT : capte des électrons → se RÉDUIT\nRÉDUCTEUR : cède des électrons → s'OXYDE\n\nDEMI-ÉQUATION : Ox + ne⁻ ⇌ Red\n\nPILE GALVANIQUE :\nANODE (−) : oxydation du réducteur\nCATHODE (+) : réduction de l'oxydant\nFEM = V(+) − V(−) > 0\nPont salin : maintient l'électroneutralité\n\nÉLECTROLYSE :\nRéaction forcée par un générateur externe\nAnode (+) reliée au + du générateur → oxydation\nCathode (−) reliée au − → réduction\n\nLOI DE FARADAY :\nm = M·I·t / (n·F)\nF = 96500 C/mol ; n = nb d'électrons échangés" },

          ],

          exercices:[

            { id:'EX-EL1', niveau:'Intermédiaire', titre:'Électrolyse',

              enonce:"Électrolyse d'une solution de ZnSO₄ : I=1A pendant 2h. Masse de Zn déposée ? (M=65g/mol, n=2)",

              correction:"t=2×3600=7200s.\nm=65×1×7200/(2×96500)=468000/193000≈2,43g." },

          ]

        },

      ]

    },

  ]

},



// ─────────────────────────────────────────────────────────────────────

// CH 12 — CHIMIE ORGANIQUE (Sc. Exp.)

// ─────────────────────────────────────────────────────────────────────

'organique-exp': {

  id:'organique-exp', emoji:'🔬', tag:'Chimie', color:'#06b6d4',

  titre:'Chimie organique',

  desc:"Composés carbonylés (aldéhydes, cétones), acides carboxyliques, estérification (acide+alcool⇌ester+H₂O), hydrolyse, polymères (polyaddition, polycondensation).",

  souschapitres:[

    {

      id:'sc-org-carbonyle', titre:'12.1 Composés carbonylés et acides carboxyliques',

      notions:['Aldéhyde −CHO (extrémité)','Cétone >C=O (milieu)','Acide carboxylique −COOH','Tests : Fehling (aldéhyde) ; DNPH (carbonyle)'],

      blocs:[

        {

          notion:'🧬 Groupes fonctionnels',

          theoremes:[

            { id:'D-OR1', type:'def', nom:'Composés carbonylés et acides',

              enonce:"ALDÉHYDE (−CHO) :\nGroupe carbonyle en bout de chaîne\nFormule : RCHO\nExemple : méthanal HCHO, éthanal CH₃CHO\n\nCÉTONE (>C=O) :\nGroupe carbonyle en milieu de chaîne\nFormule : RCOR'\nExemple : propanone (acétone) CH₃COCH₃\n\nTESTS D'IDENTIFICATION :\n• DNPH : précipité jaune-orangé avec aldéhydes ET cétones\n• Liqueur de Fehling : précipité rouge brique avec aldéhydes SEULEMENT\n  (oxydation en acide : RCHO + [O] → RCOOH)\n• Eau de Schiff (rosaniline) : aldéhydes uniquement\n\nACIDE CARBOXYLIQUE (−COOH) :\nGroupe acidité : pKa ≈ 4,7 (acide acétique)\nExemple : acide acétique CH₃COOH" },

          ],

          exercices:[

            { id:'EX-OR1', niveau:'Facile', titre:'Identifier le groupe',

              enonce:"CH₃CHO réagit-il avec Fehling ? Et avec DNPH ?",

              correction:"CH₃CHO est un aldéhyde : réagit avec Fehling (précipité rouge) ✓ et avec DNPH (précipité jaune-orangé) ✓." },

          ]

        },

      ]

    },

    {

      id:'sc-org-ester', titre:'12.2 Estérification, hydrolyse et polymères',

      notions:['Acide + Alcool ⇌ Ester + H₂O (catalyse H⁺)','Réaction lente, équilibre, exothermique','Hydrolyse : ester + H₂O ⇌ acide + alcool','Polymères : polyaddition et polycondensation'],

      blocs:[

        {

          notion:'⚗️ Estérification et polymères',

          theoremes:[

            { id:'D-OR2', type:'def', nom:'Estérification et hydrolyse',

              enonce:"ESTÉRIFICATION :\nAcide carboxylique + Alcool ⇌ Ester + H₂O\nCatalyseur : H⁺ (H₂SO₄ conc.)\nRéaction LENTE, LIMITÉE (équilibre), ATHERMIQUE ou peu exothermique\n\nPour maximiser l'ester :\n• Excès d'un des réactifs\n• Éliminer l'eau produite\n• Éliminer l'ester au fur et à mesure\n\nNOMENCLATURE :\nEster = alcanoate d'alkyle\nCH₃COOC₂H₅ = éthanoate d'éthyle (ou acétate d'éthyle)\n\nHYDROLYSE (inverse, aussi limitée) :\nEster + H₂O ⇌ Acide + Alcool\n\nSAPONIFICATION (totale, irréversible) :\nEster + NaOH → Alcool + carboxylate de Na" },

            { id:'D-OR3', type:'def', nom:'Polymères',

              enonce:"POLYADDITION (sans élimination) :\nMonomères insaturés : −CH₂=CH₂ → −(−CH₂−CH₂−)ₙ−\nExemples : PE (polyéthylène), PVC, PS\n\nPOLYCONDENSATION (avec élimination d'eau ou HCl) :\nPolyester : diacide + diol → −(−CO−R−COO−R'−)ₙ−\nPolyamide : diacide + diamine → −(−CO−R−CO−NH−R'−NH−)ₙ−\nNylon 6,6 : hexanedioyl + hexan-1,6-diamine\n\nDEGRÉ DE POLYMÉRISATION n :\nM_polymère = n × M_monomère\n\nPROPRIÉTÉS :\nThermoplastiques : fondent à chaud (PE, PVC)\nThermodurcissables : ne fondent pas (bakélite, résines époxy)" },

          ],

          exercices:[

            { id:'EX-OR2', niveau:'Intermédiaire', titre:'Estérification',

              enonce:"Acide propanoïque + éthanol → ester + H₂O. Nommer l'ester et écrire l'équation.",

              correction:"CH₃CH₂COOH + C₂H₅OH ⇌ CH₃CH₂COOC₂H₅ + H₂O.\nEster : propanoate d'éthyle." },

            { id:'EX-OR3', niveau:'Difficile', titre:'Degré de polymérisation',

              enonce:"PVC : M=50000g/mol. M(monomère CH₂=CHCl)=62,5g/mol. Degré n ?",

              correction:"n=M/M_monomère=50000/62,5=800." },

          ]

        },

      ]

    },

  ]

},




'oscillations-forcees-mec': {
  id:'oscillations-forcees-mec', emoji:'📳', tag:'Physique', color:'#06b6d4',
  titre:"Oscillations mécaniques forcées",
  desc:"Oscillateur forcé, résonance mécanique, x(t)=Xm sin(ωt+φ), bande passante, facteur de qualité Q.",
  souschapitres:[
    {
      id:'sc-of1', titre:"1. Oscillateur forcé et résonance",
      notions:["Excitateur sinusoïdal","Régime forcé permanent","Résonance mécanique","Déphasage φ"],
      blocs:[
        {
          notion:"📐 Oscillations mécaniques forcées",
          theoremes:[
            { id:'F-OF1', type:'formule', nom:"Résonance mécanique",
              enonce:"Oscillateur forcé soumis à une excitation sinusoïdale de pulsation ω :\n\nÉquation du mouvement :\nmd²x/dt² + h·dx/dt + k·x = F₀·cos(ωt)\n\nSolution en régime permanent :\nx(t) = Xm·sin(ωt + φ)\n\nRésonance : ω = ω₀ = √(k/m)\nAmplitude maximale à la résonance\n\nFacteur de qualité : Q = mω₀/h\nBande passante : Δω = ω₀/Q" },
          ],
          exercices:[
            { id:'EX-OF1', niveau:'Moyen', titre:"Résonance mécanique",
              enonce:"Un oscillateur de masse m=0,1 kg, k=40 N/m est soumis à une excitation. Calculer f₀ et la pulsation de résonance.",
              correction:"ω₀=√(k/m)=√(40/0,1)=20 rad/s. f₀=ω₀/(2π)=20/(2π)≈3,18 Hz." },
          ],
        },
      ],
    },
  ],
},

'interaction-onde-matiere': {
  id:'interaction-onde-matiere', emoji:'🔬', tag:'Physique', color:'#06b6d4',
  titre:"Interaction onde-matière",
  desc:"Diffraction, interférences de Young, effet photoélectrique E=hf, dualité onde-corpuscule.",
  souschapitres:[
    {
      id:'sc-iom1', titre:"1. Diffraction et interférences",
      notions:["Diffraction par une fente a","Interférences (fentes de Young)","Interfrange i=λD/a","Sources cohérentes"],
      blocs:[
        {
          notion:"📐 Diffraction et interférences",
          theoremes:[
            { id:'F-IOM1', type:'formule', nom:"Interférences — fentes de Young",
              enonce:"DIFFRACTION (fente de largeur a, écran à distance D) :\nLargeur de la tache centrale : L = 2λD/a\nCondition : a ≈ λ\n\nINTERFÉRENCES (deux fentes distantes de a) :\nInterfrange : i = λD/a\nFranges brillantes : δ = kλ  (k entier)\nFranges sombres : δ = (2k+1)λ/2\nδ : différence de marche" },
            { id:'F-IOM2', type:'formule', nom:"Effet photoélectrique",
              enonce:"Énergie du photon : E = h·f = hc/λ\nh = 6,626×10⁻³´ J·s (constante de Planck)\nc = 3×10⁸ m/s\n\nEffect photoélectrique :\nÉnergie cinétique : Ec = hf - W₀\nW₀ : travail d'extraction (énergie de liaison)\nFréquence seuil : f₀ = W₀/h\n\nDualité onde-corpuscule (De Broglie) :\nλ = h/(mv)" },
          ],
          exercices:[
            { id:'EX-IOM1', niveau:'Moyen', titre:"Interfrange Young",
              enonce:"Fentes de Young : a=0,5 mm, D=2 m, λ=600 nm. Calculer l'interfrange.",
              correction:"i=λD/a=600×10⁻⁹×2/(0,5×10⁻³)=2,4×10⁻³ m=2,4 mm." },
          ],
        },
      ],
    },
  ],
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

export default function PhysiqueScExpSlugPage() {

  const params = useParams()

  const slug = (params?.slug as string) || 'dipole-rc'

  const chapter = ALL_CHAPTERS[slug]

  const [openEx, setOpenEx] = useState<string|null>(null)

  const [openSc, setOpenSc] = useState<string|null>(null)



  if (!chapter) return (

    <><Navbar/>

      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex',

        alignItems:'center', justifyContent:'center' }}>

        <div style={{ textAlign:'center' }}>

          <div style={{ fontSize:48, marginBottom:16 }}>📭</div>

          <h2>Chapitre non trouvé</h2>

          <Link href="/bac/physique/sciences-exp" style={{ color:'#06b6d4' }}>

            ← Retour Physique Sc. Exp.

          </Link>

        </div>

      </main><Footer/></>

  )



  const idx = NAV_ORDER.indexOf(slug)

  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null

  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  const secColor = SEC_COLORS[slug] || '#06b6d4'

  const isChimie = IS_CHIMIE[slug] || false



  const PHYS_SLUGS = NAV_ORDER.slice(0,9)

  const CHIM_SLUGS = NAV_ORDER.slice(9)



  return (

    <><Navbar/>

      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>



        {/* BREADCRUMB */}

        <div style={{ borderBottom:'1px solid var(--border)',

          padding:'12px clamp(20px,5vw,60px)',

          display:'flex', gap:8, fontSize:13, color:'var(--muted)',

          alignItems:'center', flexWrap:'wrap' }}>

          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Bac</Link><span>›</span>

          <Link href="/bac/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link><span>›</span>

          <Link href="/bac/physique/sciences-exp" style={{ color:'var(--muted)', textDecoration:'none' }}>Sc. Exp.</Link><span>›</span>

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

                  <span style={{ fontSize:11, background:'rgba(6,182,212,0.15)',

                    color:'#22d3ee', padding:'2px 9px', borderRadius:10 }}>

                    {isChimie ? '🧪 Chimie' : '⚛️ Physique'} · Sc. Exp. · Tunisie

                  </span>

                </div>

                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>

                  {chapter.titre}

                </h1>

                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,

                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>

                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>

                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Physique-Chimie Sc.Exp. Bac Tunisie')}`}

                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',

                      borderRadius:10, background:`linear-gradient(135deg,${secColor},${secColor}cc)`,

                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>

                    🤖 Chat IA — ce chapitre

                  </Link>

                  <Link href="/examens"

                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',

                      borderRadius:10, background:'rgba(255,255,255,0.06)',

                      border:'1px solid rgba(255,255,255,0.12)', color:'var(--text2)',

                      fontSize:13, fontWeight:600, textDecoration:'none' }}>

                    📋 Exercices Bac

                  </Link>

                  <Link href="/simulation"

                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',

                      borderRadius:10, background:`${secColor}10`,

                      border:`1px solid ${secColor}30`, color:secColor,

                      fontSize:13, fontWeight:600, textDecoration:'none' }}>

                    🎯 Simulation Bac

                  </Link>

                </div>

              </div>



              {/* SOUS-CHAPITRES */}

              {chapter.souschapitres.map((sc, scIdx) => (

                <div key={sc.id} style={{ marginBottom:24,

                  background:`${secColor}05`, border:`1px solid ${secColor}20`,

                  borderRadius:18, overflow:'hidden' }}>



                  <button

                    onClick={() => setOpenSc(openSc===sc.id ? null : sc.id)}

                    style={{ width:'100%', background:`${secColor}12`,

                      borderBottom:`1px solid ${secColor}20`, padding:'16px 22px',

                      display:'flex', justifyContent:'space-between', alignItems:'center',

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

                            background:`${secColor}12`, color:'var(--text2)',

                            border:`1px solid ${secColor}18` }}>{n}</span>

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

                                <div key={t.id} style={{ borderLeft:`3px solid ${color}`,

                                  background:`${color}07`, borderRadius:'0 12px 12px 0',

                                  padding:'14px 18px', border:`1px solid ${color}18` }}>

                                  <div style={{ display:'flex', justifyContent:'space-between',

                                    alignItems:'flex-start', marginBottom:8, gap:10, flexWrap:'wrap' }}>

                                    <div style={{ fontWeight:700, fontSize:13 }}>{t.nom}</div>

                                    <TypeBadge type={t.type} />

                                  </div>

                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.85,

                                    whiteSpace:'pre-line',

                                    fontFamily:t.type==='formule'?'var(--font-mono)':'inherit' }}>

                                    {t.enonce}

                                  </div>

                                  {t.remarque && (

                                    <div style={{ marginTop:10, paddingLeft:12,

                                      borderLeft:'2px solid rgba(245,158,11,0.5)',

                                      fontSize:11, color:'rgba(245,158,11,0.9)',

                                      fontStyle:'italic', lineHeight:1.6 }}>

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

                                textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>

                                Exercices

                              </div>

                              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>

                                {bloc.exercices.map(ex => (

                                  <div key={ex.id} style={{ background:'var(--surface)',

                                    border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>

                                    <div style={{ padding:'12px 16px' }}>

                                      <div style={{ display:'flex', gap:7, alignItems:'center',

                                        marginBottom:7, flexWrap:'wrap' }}>

                                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10,

                                          color:'var(--muted)', background:'var(--surface2)',

                                          padding:'2px 7px', borderRadius:5 }}>{ex.id}</span>

                                        <NiveauBadge niveau={ex.niveau} />

                                        <span style={{ fontWeight:600, fontSize:13 }}>{ex.titre}</span>

                                      </div>

                                      <p style={{ fontSize:12, color:'var(--text2)', margin:0,

                                        lineHeight:1.65, whiteSpace:'pre-line' }}>{ex.enonce}</p>

                                    </div>

                                    <div style={{ borderTop:'1px solid var(--border)',

                                      padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>

                                      <Link href={`/solve?q=${encodeURIComponent('Physique-Chimie Sc.Exp. Tunisie — '+ex.enonce)}`}

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

                                      <div style={{ padding:'10px 16px',

                                        borderTop:'1px solid var(--border)',

                                        background:`${secColor}06` }}>

                                        <div style={{ fontSize:10, color:secColor, fontWeight:700, marginBottom:4 }}>✅ Correction</div>

                                        <div style={{ fontSize:12, color:'var(--text2)',

                                          lineHeight:1.75, whiteSpace:'pre-line' }}>{ex.correction}</div>

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

                  <Link href={`/bac/physique/sciences-exp/${prevSlug}`} style={{ textDecoration:'none' }}>

                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}

                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}

                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>

                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>

                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>

                    </div>

                  </Link>

                ) : <div/>}

                {nextSlug ? (

                  <Link href={`/bac/physique/sciences-exp/${nextSlug}`} style={{ textDecoration:'none' }}>

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

                  fontSize:11, color:'#4f6ef7', fontWeight:700, textTransform:'uppercase',

                  letterSpacing:'0.08em', background:'rgba(79,110,247,0.08)' }}>

                  ⚛️ Physique — 7 chapitres

                </div>

                {PHYS_SLUGS.map(s => (

                  <Link key={s} href={`/bac/physique/sciences-exp/${s}`} style={{ textDecoration:'none' }}>

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

                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',

                  fontSize:11, color:'#10b981', fontWeight:700, textTransform:'uppercase',

                  letterSpacing:'0.08em', background:'rgba(16,185,129,0.08)' }}>

                  🧪 Chimie — 5 chapitres

                </div>

                {CHIM_SLUGS.map(s => (

                  <Link key={s} href={`/bac/physique/sciences-exp/${s}`} style={{ textDecoration:'none' }}>

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

              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',

                borderRadius:12, padding:'13px' }}>

                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,

                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>

                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>

                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Sc.Exp. Bac Tunisie')}`}

                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>

                    🤖 Chat IA — {chapter.tag}

                  </Link>

                  <Link href="/examens" className="btn btn-secondary"

                    style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>

                  <Link href="/simulation" className="btn btn-secondary"

                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>

                  <Link href="/bac/physique/sciences-exp" className="btn btn-secondary"

                    style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>

                  <Link href="/bac/physique" className="btn btn-secondary"

                    style={{ textAlign:'center', fontSize:12 }}>📚 Autres sections</Link>

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