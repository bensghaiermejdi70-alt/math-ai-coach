'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE — SECTION INFORMATIQUE / [SLUG]
// Route : /bac/physique/informatique/[slug]
// Programme officiel MEN Tunisie · 4ème année Informatique
// 7 chapitres Physique + 6 chapitres Chimie = 13 au total
// Spécificités Info : condensateur seul, RLC amorti, prisme/dispersion,
//                     amides, tableau d'avancement dédié
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#8b5cf6', def:'#06d6a0', formule:'#f59e0b', prop:'#06b6d4', methode:'#ec4899', loi:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', loi:'Loi' }

const NAV_ORDER = [
  'condensateur-info','dipole-rc-info','bobine-rl-info','oscillations-lc-info',
  'ondes-mec-info','ondes-optique-info','nucleaire-info',
  'oscillations-forcees-info','filtres-info','multivibrateurs-info',
  'acide-base-info','cinetique-info','transformations-info',
  'equilibre-chimique-info','electrochimie-info','avancement-info',
]

const TITRES_NAV: Record<string,string> = {
  'condensateur-info':         'CH 01 — Condensateur',
  'dipole-rc-info':            'CH 02 — Dipôle RC',
  'bobine-rl-info':            'CH 03 — Bobine & RL',
  'oscillations-lc-info':      'CH 04 — Oscillations LC',
  'ondes-mec-info':            'CH 05 — Ondes mécaniques',
  'ondes-optique-info':        'CH 06 — Ondes & Optique',
  'nucleaire-info':            'CH 07 — Physique nucléaire',
  'oscillations-forcees-info': 'CH 08 — Oscillations forcées',
  'filtres-info':              'CH 09 — Filtres électriques',
  'multivibrateurs-info':      'CH 10 — Multivibrateurs',
  'acide-base-info':           'CH 11 — Acides & bases',
  'cinetique-info':            'CH 12 — Cinétique chimique',
  'transformations-info':      'CH 13 — Transformations',
  'equilibre-chimique-info':   'CH 14 — Équilibres chimiques',
  'electrochimie-info':        'CH 15 — Électrochimie',
  'avancement-info':           'CH 16 — Avancement',
}

const SEC_COLORS: Record<string,string> = {
  'condensateur-info':'#8b5cf6','dipole-rc-info':'#8b5cf6','bobine-rl-info':'#8b5cf6',
  'oscillations-lc-info':'#8b5cf6','ondes-mec-info':'#8b5cf6',
  'ondes-optique-info':'#14b8a6','nucleaire-info':'#14b8a6',
  'oscillations-forcees-info':'#8b5cf6','filtres-info':'#8b5cf6','multivibrateurs-info':'#8b5cf6',
  'acide-base-info':'#f59e0b','cinetique-info':'#f59e0b','transformations-info':'#f59e0b',
  'equilibre-chimique-info':'#f59e0b','electrochimie-info':'#f59e0b','avancement-info':'#f59e0b',
}

const IS_CHIMIE: Record<string,boolean> = {
  'acide-base-info':true,'cinetique-info':true,'transformations-info':true,
  'equilibre-chimique-info':true,'electrochimie-info':true,'avancement-info':true,
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; tag:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

const ALL_CHAPTERS: Record<string,Chap> = {

// ══════════════════════════════════════════════════════════════════════
// ████  PHYSIQUE — 7 CHAPITRES
// ══════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────
// CH 01 — CONDENSATEUR
// ─────────────────────────────────────────────────────────────────────
'condensateur-info': {
  id:'condensateur-info', emoji:'⚡', tag:'Physique', color:'#8b5cf6',
  titre:'Condensateur',
  desc:"Charge q=CU, capacité C en Farads, énergie E=½CU², condensateur plan. Applications : flash photographique, défibrillateur cardiaque, stockage d'énergie.",
  souschapitres:[
    {
      id:'sc-cond1', titre:'1.1 Charge, capacité et énergie',
      notions:['q=C·U_C (charge en Coulombs)','C en Farads (F), μF, nF, pF','E_C=½CU² (énergie emmagasinée)','Condensateur plan : C=ε₀S/d'],
      blocs:[
        {
          notion:'⚡ Condensateur — définition et propriétés',
          theoremes:[
            { id:'D-CO1', type:'def', nom:'Condensateur — charge et capacité',
              enonce:"Un condensateur est constitué de deux armatures conductrices séparées par un isolant.\n\nCHARGE :\nq = C·u_C  (q en Coulombs, C en Farads, u_C en Volts)\n\nCOURANT DE CHARGE/DÉCHARGE :\ni = dq/dt = C·du_C/dt\n\nCAPACITÉ C :\nC en Farads (F)\nEn pratique : μF = 10⁻⁶F, nF = 10⁻⁹F, pF = 10⁻¹²F\n\nCONDENSATEUR PLAN (armatures de surface S, distantes de d) :\nC = ε₀·S/d  avec ε₀ = 8,85×10⁻¹²F/m\n\nEN RÉGIME PERMANENT DC :\ni = 0 → circuit ouvert (condensateur chargé et stable)" },
            { id:'F-CO1', type:'formule', nom:'Énergie emmagasinée',
              enonce:"E_C = ½·C·U_C²  (en Joules)\n\nAUTRES FORMES :\nE_C = q²/(2C) = ½·q·U_C\n\nAPPLICATIONS :\nFlash photographique :\n→ C=500μF chargé à 300V : E=½×500×10⁻⁶×90000=22,5J\n→ Libéré en ~1ms → puissance énorme (22500W)\n\nDéfibrillateur cardiaque :\n→ C=32μF chargé à 5000V : E=400J\n→ Choc sur le cœur pour restaurer le rythme normal\n\nAlimentation informatique :\n→ Condensateurs filtrent les ondulations de tension",
              remarque:"Le condensateur emmagasine de l'énergie sous forme de champ électrique (entre les armatures). La bobine, elle, sous forme de champ magnétique." },
          ],
          exercices:[
            { id:'EX-CO1', niveau:'Facile', titre:'Charge et énergie',
              enonce:"Condensateur C=100μF sous une tension U=50V. Calculer q et E_C.",
              correction:"q=CU=100×10⁻⁶×50=5×10⁻³C=5mC.\nE_C=½×100×10⁻⁶×2500=0,125J=125mJ." },
            { id:'EX-CO2', niveau:'Intermédiaire', titre:'Flash photographique',
              enonce:"Flash : C=200μF chargé à 200V. Énergie stockée ? Si la durée du flash est 1ms, puissance moyenne ?",
              correction:"E=½×200×10⁻⁶×40000=4J.\nP=E/Δt=4/10⁻³=4000W=4kW." },
          ]
        },
      ]
    },
    {
      id:'sc-cond2', titre:'1.2 Charge et décharge du condensateur',
      notions:['Charge : q croît vers Q=CE','Décharge : q décroît vers 0','Courant i change de sens','Graphiques q(t), u_C(t), i(t)'],
      blocs:[
        {
          notion:'📈 Courbes de charge et décharge',
          theoremes:[
            { id:'D-CO2', type:'def', nom:'Charge et décharge — comportement qualitatif',
              enonce:"CHARGE (condensateur branché à un générateur E) :\n• Au début (t=0) : u_C=0, i=E/R (maximal)\n• En cours : u_C↑, i↓ (exponentielle)\n• Régime permanent : u_C=E, i=0 (condensateur chargé)\n\nDÉCHARGE (condensateur chargé à U₀, branché à R) :\n• Au début (t=0) : u_C=U₀, i=−U₀/R (maximal)\n• En cours : u_C↓, i↓ (exponentielle décroissante)\n• Régime permanent : u_C=0, i=0 (condensateur vide)\n\nLECTURE DES COURBES :\nConvexité de u_C(t) : concave pendant la charge\nla tangente en t=0 coupe l'asymptote en t=τ" },
          ],
          exercices:[
            { id:'EX-CO3', niveau:'Facile', titre:'Lecture graphique de τ',
              enonce:"Courbe u_C(t) lors d'une charge : tangente à l'origine coupe l'asymptote E=12V en t=40ms. Valeur de τ et R si C=10μF.",
              correction:"τ=40ms=0,04s.\nR=τ/C=0,04/(10×10⁻⁶)=4000Ω=4kΩ." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — DIPÔLE RC
// ─────────────────────────────────────────────────────────────────────
'dipole-rc-info': {
  id:'dipole-rc-info', emoji:'🔌', tag:'Physique', color:'#6d28d9',
  titre:'Dipôle RC',
  desc:"Équation différentielle RC·du_C/dt + u_C = E, résolution, constante de temps τ=RC, courbes u_C(t) et i(t), mesure de τ à l'oscilloscope, filtrage et temporisation.",
  souschapitres:[
    {
      id:'sc-rc1', titre:'2.1 Équation différentielle et solution',
      notions:['RC·du_C/dt + u_C = E','τ=RC (constante de temps)','u_C=E(1−e^(−t/τ)) charge','u_C=U₀·e^(−t/τ) décharge'],
      blocs:[
        {
          notion:'🔌 Circuit RC — équation et solution',
          theoremes:[
            { id:'F-RC1', type:'formule', nom:'Réponse complète du circuit RC',
              enonce:"ÉTABLISSEMENT (charge) :\nLoi des mailles : E = Ri + u_C = RC·du_C/dt + u_C\n\nÉQUATION DIFFÉRENTIELLE :\nRC·du_C/dt + u_C = E\n\nSOLUTION :\nu_C(t) = E·(1 − e^(−t/τ))  avec τ = RC\ni(t) = (E/R)·e^(−t/τ)\n\nRUPTURE (décharge sur R) :\nu_C(t) = U₀·e^(−t/τ)\ni(t) = −(U₀/R)·e^(−t/τ)\n\nMESURE DE τ À L'OSCILLOSCOPE :\n• Méthode 1 : tangente à l'origine coupe y=E en t=τ\n• Méthode 2 : u_C=0,63E → lire t=τ\n• Vérification : τ = RC\n\nRÉGIME PERMANENT :\nAprès 5τ : u_C ≈ E (99%)" },
            { id:'D-RC2', type:'def', nom:'Applications : filtrage et temporisation',
              enonce:"FILTRE PASSE-BAS RC :\nBasses fréquences : condensateur = circuit ouvert → signal passe\nHautes fréquences : condensateur = court-circuit → signal atténué\nFréquence de coupure : f_c = 1/(2πRC)\n\nTemporisation électronique :\nDélai de déclenchement ≈ τ = RC\nApplications : circuits de retard, minuterie, anti-rebond\n\nAPPLICATION INFORMATIQUE :\nConversion analogique-numérique (CAN) :\n→ Condensateur se charge jusqu'à référence → mesure du temps = mesure de la tension\nConversion numérique-analogique (CNA) :\n→ Réseau de condensateurs pondérés",
              remarque:"En informatique embarquée (microcontrôleurs), le circuit RC est utilisé pour générer des délais sans horloge externe et pour filtrer les perturbations." },
          ],
          exercices:[
            { id:'EX-RC1', niveau:'Facile', titre:'τ et régime permanent',
              enonce:"R=22kΩ, C=47μF, E=9V. Calculer τ et u_C à t=2τ.",
              correction:"τ=22000×47×10⁻⁶=1,034s≈1s.\nu_C(2τ)=9(1−e⁻²)=9×0,865≈7,78V." },
            { id:'EX-RC2', niveau:'Intermédiaire', titre:'Mesure de τ',
              enonce:"Sur un oscilloscope, la tangente à u_C en t=0 coupe y=5V en t=2ms. R=1kΩ. Calculer C.",
              correction:"τ=2ms. C=τ/R=2×10⁻³/1000=2×10⁻⁶F=2μF." },
          ]
        },
      ]
    },
    {
      id:'sc-rc2', titre:'2.2 RC en commutation et applications numériques',
      notions:['Réponse à un échelon de tension','Intégrateur / dérivateur RC','Anti-rebond et temporisation','Échantillonnage et anti-repliement'],
      blocs:[
        {
          notion:'💾 RC en électronique numérique',
          theoremes:[
            { id:'D-RC3', type:'def', nom:'Intégrateur et dérivateur RC',
              enonce:"INTÉGRATEUR (sortie sur condensateur, si f≫fc) :\nu_C ≈ (1/RC)·∫u_e·dt\n→ un créneau devient un signal triangulaire.\n\nDÉRIVATEUR (sortie sur résistance, si f≪fc) :\nu_R ≈ RC·du_e/dt\n→ un créneau devient des impulsions (fronts montants/descendants).\n\nCONSTANTE DE TEMPS et logique :\nLe temps de montée 0→63% vaut τ=RC : il limite la fréquence d'horloge maximale d'un bus (charge des capacités parasites).\n\nRÔLE NUMÉRIQUE :\n• Mise en forme de signaux d'horloge\n• Détection de fronts (déclenchement)\n• Lissage d'une sortie PWM → tension quasi continue",
              remarque:"Un signal PWM filtré par un RC passe-bas donne une tension moyenne proportionnelle au rapport cyclique : c'est un CNA simple très utilisé sur microcontrôleur." },
            { id:'M-RC2', type:'methode', nom:'Anti-rebond et anti-repliement',
              enonce:"ANTI-REBOND (debounce) d'un bouton-poussoir :\nUn contact mécanique « rebondit » quelques ms.\nUn RC (τ ≈ 10 ms) lisse les rebonds → un seul front propre.\nCondition : τ = RC ≫ durée des rebonds.\n\nANTI-REPLIEMENT (anti-aliasing) avant un CAN :\nThéorème de Shannon : fe > 2·f_max.\nUn filtre passe-bas RC (fc < fe/2) supprime les fréquences trop élevées AVANT l'échantillonnage, évitant le repliement de spectre.\n\nCHOIX de fc : fc = 1/(2πRC) placée juste au-dessus de la bande utile.",
              remarque:"Sans filtre anti-repliement, une fréquence supérieure à fe/2 se « replie » et apparaît comme une fausse fréquence basse dans le signal numérisé." },
          ],
          exercices:[
            { id:'EX-RC3', niveau:'Facile', titre:'Anti-rebond',
              enonce:"On veut une constante de temps d'anti-rebond τ=20ms avec C=2µF. Quelle résistance R ?",
              correction:"R=τ/C=20×10⁻³/2×10⁻⁶=10⁴=10 kΩ." },
            { id:'EX-RC4', niveau:'Difficile', titre:'Filtre anti-repliement',
              enonce:"CAN échantillonnant à fe=10kHz. Donner fc max acceptable, puis R si C=10nF.",
              correction:"Shannon : fc < fe/2 = 5 kHz.\nPrenons fc=5kHz : R=1/(2π·fc·C)=1/(2π×5000×10⁻⁸)≈3,18 kΩ." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — BOBINE & DIPÔLE RL
// ─────────────────────────────────────────────────────────────────────
'bobine-rl-info': {
  id:'bobine-rl-info', emoji:'🌀', tag:'Physique', color:'#4f6ef7',
  titre:'Bobine & Dipôle RL',
  desc:"Flux Φ=Li, FEM d'auto-induction e_L=−L·di/dt, loi de Lenz, énergie E_L=½LI², circuit RL : τ=L/R, établissement et rupture du courant.",
  souschapitres:[
    {
      id:'sc-rl1', titre:'3.1 Bobine — induction et auto-induction',
      notions:['Flux Φ=L·i (Li en Wb)','e_L=−L·di/dt (FEM auto-induction)','Loi de Lenz : oppose la variation','E_L=½LI² (énergie magnétique)'],
      blocs:[
        {
          notion:'🌀 Bobine — lois fondamentales',
          theoremes:[
            { id:'D-RL1', type:'def', nom:'Inductance et auto-induction',
              enonce:"Bobine d'inductance propre L (Henry H) :\nFlux propre : Φ = L·i\n\nFEM D'AUTO-INDUCTION :\ne_L = −dΦ/dt = −L·di/dt\n\nLOI DE LENZ :\nLe courant induit s'oppose à la cause qui le produit\n→ Signe (−) dans e_L = −L·di/dt\n\nTENSION AUX BORNES :\nu_L = L·di/dt\n\nÉNERGIE MAGNÉTIQUE :\nE_L = ½·L·I²\n\nRÉGIME PERMANENT DC :\ndi/dt = 0 → e_L = 0 → bobine = fil résistif\n\nPROPRIÉTÉ FONDAMENTALE :\ni ne peut pas varier BRUTALEMENT dans une bobine" },
          ],
          exercices:[
            { id:'EX-RL1', niveau:'Facile', titre:'Énergie et FEM',
              enonce:"L=200mH, i varie de 0 à 2A en 0,1s. Calculer e_L et E_L finale.",
              correction:"e_L=−L·Δi/Δt=−0,2×2/0,1=−4V.\nE_L=½×0,2×4=0,4J." },
          ]
        },
      ]
    },
    {
      id:'sc-rl2', titre:'3.2 Circuit RL — établissement et rupture',
      notions:['L·di/dt + R·i = E','τ=L/R ; I_max=E/R','i(t)=I_max(1−e^(−t/τ))','Surtension à la rupture → diode de roue libre'],
      blocs:[
        {
          notion:'📈 Réponse du circuit RL',
          theoremes:[
            { id:'F-RL2', type:'formule', nom:'Établissement et rupture du courant',
              enonce:"ÉTABLISSEMENT :\nL·di/dt + R·i = E\nτ = L/R  ;  I_max = E/R\ni(t) = I_max·(1 − e^(−t/τ))\nu_L(t) = E·e^(−t/τ)\n\nÀ t=τ : i ≈ 0,63·I_max\nÀ t=5τ : i ≈ I_max\n\nRUPTURE :\ni(t) = I_max·e^(−t/τ)\n\nSURTENSION DANGEREUSE :\nu_L = −L·di/dt → très grande si Δt petit\n(peut détruire les composants électroniques)\n\nPROTECTION :\nDiode de roue libre en antiparallèle à la bobine\n→ Évacue l'énergie sans surtension" },
          ],
          exercices:[
            { id:'EX-RL2', niveau:'Facile', titre:'Circuit RL',
              enonce:"E=12V, R=60Ω, L=0,3H. Calculer τ, I_max et i(τ).",
              correction:"τ=L/R=0,3/60=5ms.\nI_max=12/60=0,2A.\ni(τ)=0,2(1−e⁻¹)≈0,126A." },
            { id:'EX-RL3', niveau:'Intermédiaire', titre:'Énergie lors de la rupture',
              enonce:"L=100mH, I_max=1A. Énergie à dissiper si rupture ? Surtension si Δt=0,1ms, R=10Ω.",
              correction:"E_L=½×0,1×1=0,05J.\nu_L=L×ΔI/Δt=0,1×1/10⁻⁴=1000V (dangereux !)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — OSCILLATIONS ÉLECTRIQUES LIBRES (LC et RLC)
// ─────────────────────────────────────────────────────────────────────
'oscillations-lc-info': {
  id:'oscillations-lc-info', emoji:'〰️', tag:'Physique', color:'#06b6d4',
  titre:'Oscillations électriques libres',
  desc:"Circuit LC : oscillations non amorties T₀=2π√(LC), énergie conservée. Circuit RLC : régimes apériodique, critique, pseudo-périodique. Analogie mécanique.",
  souschapitres:[
    {
      id:'sc-lc1', titre:'4.1 Circuit LC — oscillations non amorties',
      notions:['d²q/dt²+(1/LC)q=0','T₀=2π√(LC) ; f₀=1/(2π√LC)','E_C+E_L=constante','q(t)=Q_max·cos(ω₀t+φ)'],
      blocs:[
        {
          notion:'〰️ Circuit LC idéal',
          theoremes:[
            { id:'F-LC1', type:'formule', nom:'Circuit LC — oscillations libres non amorties',
              enonce:"Circuit LC (sans résistance) :\nLoi des mailles : u_L + u_C = 0\nL·d²q/dt² + q/C = 0\n\nÉQUATION DIFFÉRENTIELLE :\nd²q/dt² + ω₀²·q = 0  avec ω₀ = 1/√(LC)\n\nSOLUTION :\nq(t) = Q_max·cos(ω₀t + φ)\nu_C(t) = Q_max/C·cos(ω₀t + φ)\ni(t) = −Q_max·ω₀·sin(ω₀t + φ)\n\nPÉRIODE PROPRE : T₀ = 2π/ω₀ = 2π√(LC)\nFRÉQUENCE PROPRE : f₀ = 1/(2π√(LC))\n\nÉNERGIE CONSERVÉE :\nE = ½Cu_C² + ½Li² = ½CQ_max²/C = constante\nÉchanges périodiques E_C ↔ E_L" },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:'Période propre',
              enonce:"L=20mH, C=0,5μF. Calculer T₀ et f₀.",
              correction:"T₀=2π√(20×10⁻³×0,5×10⁻⁶)=2π√(10⁻⁸)=2π×10⁻⁴≈6,28×10⁻⁴s=0,628ms.\nf₀=1/T₀≈1592Hz≈1,6kHz." },
          ]
        },
      ]
    },
    {
      id:'sc-rlc', titre:'4.2 Circuit RLC — oscillations amorties',
      notions:['L·d²q/dt²+R·dq/dt+q/C=0','Régime apériodique : R>2√(L/C)','Régime critique : R=2√(L/C)','Régime pseudo-périodique : R<2√(L/C)'],
      blocs:[
        {
          notion:'📉 Circuit RLC — amortissement',
          theoremes:[
            { id:'D-RLC1', type:'def', nom:'Régimes du circuit RLC',
              enonce:"Circuit RLC série :\nL·d²q/dt² + R·dq/dt + q/C = 0\n\nDISCRIMINANT : Δ = R²/4 − L/C\n\nRÉGIME APÉRIODIQUE (Δ>0, R>2√(L/C)) :\nPas d'oscillations, charge décroit vers 0 monotonement\n\nRÉGIME CRITIQUE (Δ=0, R=2√(L/C)) :\nRetour le plus rapide à 0 sans oscillation\n(utilisé dans les systèmes de commande rapide)\n\nRÉGIME PSEUDO-PÉRIODIQUE (Δ<0, R<2√(L/C)) :\nOscillations amorties : amplitude décroît exponentiellement\nq(t) = Q_max·e^(−αt)·cos(ω₁t + φ)\nα = R/(2L)  ;  ω₁ < ω₀\n\nANALOGIE MÉCANIQUE :\nCircuit LC ↔ Pendule/masse-ressort sans frottements\nCircuit RLC ↔ Pendule avec amortissement visqueux\nR↔coefficient d'amortissement ; L↔masse ; 1/C↔raideur",
              remarque:"Le régime critique est optimal pour les systèmes de mesure (galvanomètre, voltmètre) et les systèmes de commande : réponse rapide sans oscillation." },
          ],
          exercices:[
            { id:'EX-RLC1', niveau:'Intermédiaire', titre:'Identifier le régime',
              enonce:"L=0,1H, C=10μF, R=200Ω. Quel régime ?",
              correction:"2√(L/C)=2√(0,1/10⁻⁵)=2√10000=200.\nR=200Ω=2√(L/C) → régime critique." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — ONDES MÉCANIQUES PROGRESSIVES
// ─────────────────────────────────────────────────────────────────────
'ondes-mec-info': {
  id:'ondes-mec-info', emoji:'🌊', tag:'Physique', color:'#f59e0b',
  titre:'Ondes mécaniques progressives',
  desc:"Propagation d'une perturbation, célérité v, ondes transversales/longitudinales, longueur d'onde λ=vT, retard temporel, déphasage.",
  souschapitres:[
    {
      id:'sc-ondes1', titre:'5.1 Nature, propagation et ondes sinusoïdales',
      notions:['Onde : propagation d\'énergie sans transport de matière','Célérité v (dépend du milieu)','λ=vT=v/f','Retard Δt=d/v ; déphasage Δφ=2πd/λ'],
      blocs:[
        {
          notion:'🌊 Ondes mécaniques',
          theoremes:[
            { id:'D-OM1', type:'def', nom:'Nature et caractéristiques des ondes',
              enonce:"ONDE MÉCANIQUE :\nPropagation d'une perturbation dans un milieu matériel\nÉnergie transportée SANS déplacement de matière\n\nONDES TRANSVERSALES :\nVibration ⊥ propagation (cordes, séismes S)\n\nONDES LONGITUDINALES :\nVibration ∥ propagation (son, ultrasons)\n\nCÉLÉRITÉ v :\nDépend du milieu élastique (pas de la fréquence)\nSon dans l'air : v ≈ 340 m/s à 20°C\nUltrasons dans l'eau : v ≈ 1500 m/s" },
            { id:'F-OM1', type:'formule', nom:'Relations fondamentales et déphasage',
              enonce:"λ = v·T = v/f\n\nRETARD TEMPOREL entre A et B (distance d) :\nΔt = d/v  (B vibre comme A mais avec un retard)\n\nDÉPHASAGE :\nΔφ = 2π·Δt/T = 2π·d/λ  (en radians)\n\nEN PHASE : Δφ = 0, 2π, 4π… ↔ d = kλ\nEN OPPOSITION : Δφ = π, 3π… ↔ d = (k+½)λ\n\nFONCTION D'ONDE (sinusoïdale) :\ny(x,t) = A·cos(ωt − 2πx/λ + φ₀)\n\nAPPLICATIONS NUMÉRIQUES :\nSon 440Hz, v=340m/s → λ=340/440=0,77m" },
          ],
          exercices:[
            { id:'EX-OM1', niveau:'Facile', titre:'Calcul de λ et Δt',
              enonce:"Corde : f=50Hz, v=20m/s. λ ? Retard entre A et B séparés de 0,6m ?",
              correction:"λ=v/f=20/50=0,4m.\nΔt=d/v=0,6/20=0,03s=30ms." },
            { id:'EX-OM2', niveau:'Intermédiaire', titre:'Déphasage',
              enonce:"f=200Hz, v=340m/s, d=0,85m entre deux microphones. Déphasage ?",
              correction:"λ=340/200=1,7m.\nΔφ=2π×0,85/1,7=2π×0,5=π rad. En opposition de phase." },
          ]
        },
      ]
    },
    {
      id:'sc-ondes2', titre:'5.2 Réflexion, ondes stationnaires et écho',
      notions:['Réflexion : onde renvoyée par un obstacle','Ondes stationnaires : nœuds et ventres','Mesure de distance par écho (sonar, radar)','Effet Doppler : décalage de fréquence'],
      blocs:[
        {
          notion:'📡 Réflexion, stationnaires et applications',
          theoremes:[
            { id:'D-OM2', type:'def', nom:'Ondes stationnaires et résonance',
              enonce:"RÉFLEXION : à la rencontre d'un obstacle, l'onde est renvoyée\n(avec ou sans inversion de phase selon l'extrémité fixe/libre).\n\nONDE STATIONNAIRE (superposition incidente + réfléchie) :\nNŒUDS : points d'amplitude nulle (immobiles)\nVENTRES : points d'amplitude maximale\nDistance entre deux nœuds consécutifs = λ/2.\n\nCORDE FIXÉE AUX DEUX BOUTS (longueur ℓ) :\nRésonance si ℓ = n·λ/2  →  f_n = n·v/(2ℓ)  (harmoniques)\nFondamental (n=1) : f₁ = v/(2ℓ).\n\nTUYAU SONORE : modes propres selon ouvert/fermé.",
              remarque:"Les fréquences propres expliquent les notes des instruments : corde, tuyau d'orgue, colonne d'air d'une flûte." },
            { id:'F-OM2', type:'formule', nom:'Mesure par écho et effet Doppler',
              enonce:"MESURE DE DISTANCE PAR ÉCHO (sonar, radar, télémètre à ultrasons) :\nL'onde fait un aller-retour : d = v·Δt/2\n(Δt = durée entre émission et réception de l'écho)\n\nEFFET DOPPLER :\nLa fréquence perçue change si la source et le récepteur se rapprochent/s'éloignent.\nRapprochement → fréquence perçue plus élevée\nÉloignement → fréquence perçue plus basse\nf' ≈ f·(1 ± v_source/v)\n\nAPPLICATIONS : radar de vitesse, échographie Doppler, GPS, astronomie (décalage vers le rouge).",
              remarque:"Le capteur à ultrasons (HC-SR04) très utilisé en robotique/Arduino mesure une distance par le temps de vol de l'écho : d=v·Δt/2." },
          ],
          exercices:[
            { id:'EX-OM3', niveau:'Facile', titre:'Mesure par écho',
              enonce:"Un capteur à ultrasons (v=340m/s) reçoit l'écho 12ms après l'émission. Distance de l'obstacle ?",
              correction:"d=v·Δt/2=340×12×10⁻³/2=340×6×10⁻³=2,04 m." },
            { id:'EX-OM4', niveau:'Intermédiaire', titre:'Corde vibrante',
              enonce:"Corde de longueur ℓ=0,5m, célérité v=200m/s, fixée aux deux extrémités. Fréquence fondamentale ?",
              correction:"f₁=v/(2ℓ)=200/(2×0,5)=200 Hz.\nHarmoniques : f_n=n×200 Hz." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — ONDES ET OPTIQUE (avec PRISME et DISPERSION)
// ─────────────────────────────────────────────────────────────────────
'ondes-optique-info': {
  id:'ondes-optique-info', emoji:'🌈', tag:'Physique', color:'#14b8a6',
  titre:'Ondes et optique',
  desc:"Diffraction (θ≈λ/a), dispersion de la lumière (prisme, indice n(λ)), spectres atomiques d'émission et d'absorption, identification des éléments.",
  souschapitres:[
    {
      id:'sc-ol1', titre:'6.1 Diffraction et dispersion',
      notions:['Diffraction : θ≈λ/a si λ≈a','Prisme : n(λ) varie → dispersion','Violet dévié plus que rouge','n=c/v ; Snell-Descartes'],
      blocs:[
        {
          notion:'🌈 Diffraction et prisme',
          theoremes:[
            { id:'D-OL1', type:'def', nom:'Diffraction de la lumière',
              enonce:"CONDITION : λ ≈ a  (λ = longueur d'onde, a = largeur obstacle)\n\nANGLE DE DIFFRACTION :\nθ ≈ λ/a  (en radians, pour λ<<a)\n\nLARGEUR TACHE CENTRALE (écran à D) :\nL = 2λD/a\n\nSi a >> λ : pas de diffraction (optique géométrique)\nSi a ≈ λ : forte diffraction\n\nEXEMPLE :\nλ=600nm, a=0,3mm, D=1m :\nL=2×600×10⁻⁹×1/(0,3×10⁻³)=4×10⁻³m=4mm" },
            { id:'D-OL2', type:'def', nom:'Prisme et dispersion de la lumière',
              enonce:"INDICE DE RÉFRACTION :\nn = c/v = λ_vide/λ_milieu\n\nDISPERSION (en verre) :\nn dépend de λ → n(λ)\nn_violet > n_rouge  (violet plus dévié)\nLumière blanche → spectre des couleurs\n\nLOI DE SNELL-DESCARTES :\nn₁·sinθ₁ = n₂·sinθ₂\n\nPRISME (angle A) :\nDéviation D = θ_i + θ_r − A\nDeviation minimale : i = r  (rayon traverse symétriquement)\n\nSPECTRE VISIBLE : 400nm (violet) à 700nm (rouge)\nOrdre de déviation par prisme :\nViolet > bleu > vert > jaune > orange > rouge" },
          ],
          exercices:[
            { id:'EX-OL1', niveau:'Facile', titre:'Taille de la tache centrale',
              enonce:"λ=500nm, fente a=0,2mm, écran à D=80cm. Largeur de la tache centrale ?",
              correction:"L=2λD/a=2×500×10⁻⁹×0,8/(0,2×10⁻³)=4×10⁻³m=4mm." },
            { id:'EX-OL2', niveau:'Intermédiaire', titre:'Snell-Descartes',
              enonce:"Lumière passe de l'air (n=1) au verre (n=1,5) avec θ₁=45°. Calculer θ₂.",
              correction:"sinθ₂=sinθ₁/n=sin45°/1,5=0,707/1,5=0,471.\nθ₂=arcsin(0,471)≈28,1°." },
          ]
        },
      ]
    },
    {
      id:'sc-ol2', titre:'6.2 Spectres atomiques',
      notions:['Spectre d\'émission : raies brillantes sur fond noir','Spectre d\'absorption : raies sombres','Signature spectrale de chaque élément','Spectrométrie : identification chimique'],
      blocs:[
        {
          notion:'🔭 Spectroscopie atomique',
          theoremes:[
            { id:'D-OL3', type:'def', nom:'Spectres d\'émission et d\'absorption',
              enonce:"SPECTRE CONTINU :\nCorp chaud (solide/liquide) → toutes les longueurs d'onde\n\nSPECTRE D'ÉMISSION (raies brillantes) :\nGaz porté à haute température → raies colorées\nChaque élément a un spectre UNIQUE\nExemple : hydrogène → 656nm(rouge), 486nm(bleu), 434nm(violet)\n\nSPECTRE D'ABSORPTION (raies sombres) :\nLumière blanche traversant un gaz froid\n→ Raies sombres aux MÊMES longueurs d'onde que l'émission\n\nIDENTIFICATION :\nComparer les longueurs d'onde mesurées avec les spectres de référence\n\nAPPLICATION INFORMATIQUE :\n• Spectromètre CCD → spectre numérisé\n• Traitement d'image → identification automatique\n• Contrôle qualité par spectroscopie optique",
              remarque:"Les capteurs d'image (CCD/CMOS) dans les appareils photo et les smartphones convertissent la lumière en signal numérique — lien direct avec l'informatique et l'optique." },
          ],
          exercices:[
            { id:'EX-OL3', niveau:'Facile', titre:'Identification spectrale',
              enonce:"Raies à 589nm (jaune) et 589,6nm dans un spectre. Quel élément ?",
              correction:"Doublet jaune du sodium (Na) : doublet D₁/D₂ à 589,0 nm et 589,6 nm. C'est le sodium !" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — PHYSIQUE NUCLÉAIRE
// ─────────────────────────────────────────────────────────────────────
'nucleaire-info': {
  id:'nucleaire-info', emoji:'☢️', tag:'Physique', color:'#ef4444',
  titre:'Physique nucléaire',
  desc:"Notation nucléaire ᴬ_Z X, désintégrations α/β⁻/β⁺/γ, lois de conservation, loi de décroissance N=N₀e^(−λt), demi-vie t₁/₂, énergie E=Δm·c², fission et fusion.",
  souschapitres:[
    {
      id:'sc-nuc1', titre:'7.1 Noyau et radioactivité',
      notions:['Notation ᴬ_Z X : A nucléons, Z protons','Désintégration α : ²₄He émis','Désintégration β⁻ : e⁻ émis (n→p)','Lois de conservation A et Z'],
      blocs:[
        {
          notion:'☢️ Structure nucléaire et radioactivité',
          theoremes:[
            { id:'D-NR1', type:'def', nom:'Noyaux et désintégrations',
              enonce:"NOTATION : ᴬ_Z X\nA : nombre de masse (nucléons = protons + neutrons)\nZ : numéro atomique (protons)\nN = A−Z : neutrons\n\nLOIS DE CONSERVATION dans toute réaction nucléaire :\n• Conservation de A (nombre de masse)\n• Conservation de Z (charge)\n• Conservation de l'énergie (E=Δm·c²)\n\nDÉSINTÉGRATION α :\nᴬ_Z X → ᴬ⁻⁴_(Z-2) Y + ⁴_2 He\nÉxemple : ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He\n\nDÉSINTÉGRATION β⁻ :\nᴬ_Z X → ᴬ_(Z+1) Y + e⁻ + ν̄\nn → p + e⁻ + ν̄  (dans le noyau)\n\nDÉSINTÉGRATION β⁺ :\nᴬ_Z X → ᴬ_(Z-1) Y + e⁺ + ν\np → n + e⁺ + ν\n\nÉMISSION γ :\nÉmission d'un photon très énergétique\nA et Z inchangés" },
            { id:'F-NR1', type:'formule', nom:'Loi de décroissance radioactive',
              enonce:"N(t) = N₀·e^(−λt)\nA(t) = λ·N(t) = A₀·e^(−λt)  (activité en Bq)\n\nDEMI-VIE : t₁/₂ = ln2/λ ≈ 0,693/λ\nN(n·t₁/₂) = N₀/2ⁿ\n\nÉNERGIE (défaut de masse Δm) :\nE = Δm·c²  (1uma = 931,5 MeV)\nSi Δm > 0 : énergie libérée\n\nEXEMPLES DE DEMI-VIES :\nTc-99m : t₁/₂ = 6h (imagerie médicale)\nI-131 : t₁/₂ = 8j (thyroïde)\nC-14 : t₁/₂ = 5730ans (datation)\nU-238 : t₁/₂ = 4,5×10⁹ans" },
          ],
          exercices:[
            { id:'EX-NR1', niveau:'Facile', titre:'Équation de désintégration',
              enonce:"Écrire la désintégration α du radium ²²⁶₈₈Ra.",
              correction:"²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He\n(A: 226=222+4 ✓ ; Z: 88=86+2 ✓)" },
            { id:'EX-NR2', niveau:'Intermédiaire', titre:'Demi-vie',
              enonce:"N₀=10¹² noyaux de C-14 (t₁/₂=5730ans). N après 11460ans ?",
              correction:"n=11460/5730=2 demi-vies.\nN=10¹²/2²=10¹²/4=2,5×10¹¹." },
          ]
        },
      ]
    },
    {
      id:'sc-nuc2', titre:'7.2 Énergie nucléaire : fission, fusion et datation',
      notions:['Défaut de masse Δm et énergie de liaison E_l','Énergie de liaison par nucléon (courbe d\'Aston)','Fission / fusion : énergie libérée','Datation au carbone 14'],
      blocs:[
        {
          notion:'⚛️ Énergie de liaison et réactions',
          theoremes:[
            { id:'F-NR2', type:'formule', nom:'Défaut de masse et énergie de liaison',
              enonce:"DÉFAUT DE MASSE d'un noyau ᴬ_Z X :\nΔm = [Z·m_p + (A−Z)·m_n] − m_noyau  (Δm > 0)\n\nÉNERGIE DE LIAISON :\nE_l = Δm·c²  (énergie pour dissocier le noyau)\n1 u = 931,5 MeV/c²\n\nÉNERGIE DE LIAISON PAR NUCLÉON : E_l/A\n→ mesure la STABILITÉ du noyau.\nCourbe d'Aston : maximum vers A≈56 (fer, le plus stable).\n\nÉNERGIE LIBÉRÉE par une réaction :\nE = |Δm_réaction|·c² = (m_avant − m_après)·c²\n\nFISSION : noyau lourd → 2 noyaux moyens (réacteurs, U-235)\nFUSION : 2 noyaux légers → 1 noyau (étoiles, H→He)\nLes deux vont vers le maximum de E_l/A → libèrent de l'énergie.",
              remarque:"La fusion libère plus d'énergie par nucléon que la fission, mais nécessite des températures extrêmes (étoiles, ITER)." },
            { id:'M-NR1', type:'methode', nom:'Datation radioactive',
              enonce:"PRINCIPE : un échantillon contient N₀ noyaux radioactifs au départ ;\nà l'instant t, il en reste N(t)=N₀·e^(−λt).\n\nDATATION :\nMesurer le rapport N/N₀ (ou l'activité A/A₀).\nt = (1/λ)·ln(N₀/N) = (t₁/₂/ln2)·ln(N₀/N)\n\nCARBONE 14 (t₁/₂=5730 ans) :\nVivant : rapport ¹⁴C/¹²C constant.\nÀ la mort : plus d'échange → ¹⁴C décroît.\n→ dater os, bois, tissus (jusqu'à ~50 000 ans).\n\nAUTRES : U/Pb, K/Ar pour les roches (millions/milliards d'années).",
              remarque:"Le carbone 14 ne sert que pour les matières organiques récentes ; pour les roches anciennes on utilise des couples à longue demi-vie." },
          ],
          exercices:[
            { id:'EX-NR3', niveau:'Intermédiaire', titre:'Énergie de liaison',
              enonce:"Hélium ⁴₂He : Δm=0,0304 u. Calculer E_l et E_l/A (1u=931,5 MeV/c²).",
              correction:"E_l=0,0304×931,5≈28,3 MeV.\nE_l/A=28,3/4≈7,07 MeV/nucléon." },
            { id:'EX-NR4', niveau:'Difficile', titre:'Datation au carbone 14',
              enonce:"Un fossile a une activité C-14 égale à 25% de celle d'un organisme vivant. Âge ? (t₁/₂=5730 ans)",
              correction:"A/A₀=0,25=1/4 → 2 demi-vies.\nt=2×5730=11460 ans." },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// ████  CHIMIE — 6 CHAPITRES
// ══════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────
// CH 08 — ACIDES-BASES
// ─────────────────────────────────────────────────────────────────────
'acide-base-info': {
  id:'acide-base-info', emoji:'🧪', tag:'Chimie', color:'#10b981',
  titre:'Acides-bases',
  desc:"Théorie de Brønsted, couples AH/A⁻, pH=−log[H₃O⁺], Ka et pKa, diagramme de prédominance, dosages (pH-métrie, indicateurs colorés, conductimétrie).",
  souschapitres:[
    {
      id:'sc-ab1', titre:'8.1 pH, Ka et diagramme de prédominance',
      notions:['pH=−log[H₃O⁺]','Ka=[A⁻][H₃O⁺]/[AH] ; pKa=−logKa','pH<pKa : AH prédomine','pH>pKa : A⁻ prédomine'],
      blocs:[
        {
          notion:'🧪 Acide-base — pH et Ka',
          theoremes:[
            { id:'F-AB1', type:'formule', nom:'pH, Ka et prédominance',
              enonce:"pH = −log[H₃O⁺]  ;  [H₃O⁺] = 10^(−pH)\n\nKe = [H₃O⁺]·[OH⁻] = 10⁻¹⁴  (25°C)\npH + pOH = 14\n\nACIDE FORT : [H₃O⁺]=C → pH=−logC\nACIDE FAIBLE : [H₃O⁺]=√(Ka·C) → pH=½(pKa−logC)\n\nBASE FORTE : [OH⁻]=C → pOH=−logC → pH=14+logC\n\nCONSTANTE D'ACIDITÉ :\nKa=[A⁻][H₃O⁺]/[AH]  ;  pKa=−logKa\n\nDIAGRAMME DE PRÉDOMINANCE :\npH < pKa → AH prédomine\npH = pKa → [AH]=[A⁻] (équipartition)\npH > pKa → A⁻ prédomine" },
          ],
          exercices:[
            { id:'EX-AB1', niveau:'Facile', titre:'pH d\'un acide fort et d\'une base forte',
              enonce:"HCl : C=2×10⁻²mol/L. NaOH : C=5×10⁻³mol/L. Calculer les pH.",
              correction:"pH(HCl)=−log(2×10⁻²)=2−log2≈1,7.\npH(NaOH)=14+log(5×10⁻³)=14−log(200)=14−2,3=11,7." },
          ]
        },
      ]
    },
    {
      id:'sc-ab2', titre:'8.2 Dosages acide-base',
      notions:['Équivalence : n_a×C_a×V_a=n_b×C_b×V_b','pH-métrie : point d\'inflexion','Indicateurs colorés : pKi≈pH_éq','Conductimétrie : rupture de pente'],
      blocs:[
        {
          notion:'📊 Titrages acide-base',
          theoremes:[
            { id:'M-AB1', type:'methode', nom:'Méthodes de titrage',
              enonce:"ÉQUIVALENCE :\nn_A·C_A·V_A = n_B·C_B·V_B\n→ C_A = n_A·C_B·V_{Béq}/(n_B·V_A)\n\npH-MÉTRIE :\n• Courbe pH(V) : s'arrête, monte brusquement, plateau\n• Point d'équivalence = point d'inflexion\n• Méthode des tangentes ou dérivée d'pH/dV\n\nINDICATEURS :\n• Choisir pKi ≈ pH_éq\n• BBT (pKi≈7) pour dosage acide fort/base forte\n• Phénolphtaléine (pKi≈9) pour acide faible/base forte\n• Méthyl orange (pKi≈4) pour base faible/acide fort\n\nCONDUCTIMÉTRIE :\n• Courbe G(V) : deux droites qui se coupent à l'équivalence\n• Utile si pH-métrie difficile (solution trouble)" },
          ],
          exercices:[
            { id:'EX-AB2', niveau:'Intermédiaire', titre:'Titrage',
              enonce:"20mL de CH₃COOH titrés par NaOH à 0,15mol/L. Équivalence à V=25mL. C(acide) ?",
              correction:"C_acide=C_NaOH×V_éq/V_acide=0,15×25/20=0,1875mol/L." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — CINÉTIQUE CHIMIQUE
// ─────────────────────────────────────────────────────────────────────
'cinetique-info': {
  id:'cinetique-info', emoji:'⏱️', tag:'Chimie', color:'#f59e0b',
  titre:'Cinétique chimique',
  desc:"Vitesse v=−d[A]/dt, t₁/₂, facteurs cinétiques, ordre de réaction. Suivi expérimental : spectrophotométrie, conductimétrie, courbes cinétiques.",
  souschapitres:[
    {
      id:'sc-ck1', titre:'9.1 Vitesse, ordre et suivi expérimental',
      notions:['v=−(1/a)·d[A]/dt','t₁/₂ : [A]=[A]₀/2','Ordre 1 : t₁/₂=ln2/k (indépendant de [A]₀)','Spectrophotométrie : A=ε·l·c (Beer-Lambert)'],
      blocs:[
        {
          notion:'⏱️ Cinétique — suivi expérimental',
          theoremes:[
            { id:'D-CK1', type:'def', nom:'Vitesse et ordre de réaction',
              enonce:"VITESSE VOLUMIQUE :\nv = −(1/a)·d[A]/dt = (1/c)·d[C]/dt\n\nSUR UN GRAPHIQUE :\nv(t) = |pente tangente à [A](t)|\n\nORDRE DE RÉACTION 0 :\nv = k  (vitesse constante)\n[A](t) = [A]₀ − kt  (droite)\n\nORDRE DE RÉACTION 1 :\nv = k[A]\n[A](t) = [A]₀·e^(−kt)  (exponentielle)\nt₁/₂ = ln2/k  (indépendant de [A]₀)\n\nORDRE DE RÉACTION 2 :\nv = k[A]²\n1/[A] = 1/[A]₀ + kt  (droite)\nt₁/₂ = 1/(k[A]₀)" },
            { id:'D-CK2', type:'def', nom:'Méthodes de suivi expérimental',
              enonce:"SPECTROPHOTOMÉTRIE :\nLoi de Beer-Lambert : A = ε·l·c\nA : absorbance (sans unité)\nε : coefficient d'extinction molaire (L·mol⁻¹·cm⁻¹)\nl : trajet optique (cm) ; c : concentration (mol/L)\n→ Mesurer A → calculer c au cours du temps\n\nCONDUCTIMÉTRIE :\nMesurer la conductance G = σ·S/l\nG varie avec les concentrations ioniques\n→ Suivre l'avancement d'une réaction ionique\n\npH-MÉTRIE CINÉTIQUE :\nSuivre pH(t) → [H₃O⁺](t) → vitesse\n\nVOLUMÉTRIE DE GAZ :\nSuivre le volume de gaz dégagé → avancement",
              remarque:"La spectrophotométrie est la méthode la plus utilisée dans les laboratoires d'analyse (lien avec l'informatique : acquisition numérique des données spectrophotométriques)." },
          ],
          exercices:[
            { id:'EX-CK1', niveau:'Facile', titre:'Loi de Beer-Lambert',
              enonce:"Absorbance A=0,8, ε=200L·mol⁻¹·cm⁻¹, l=1cm. Concentration c ?",
              correction:"c=A/(ε·l)=0,8/(200×1)=4×10⁻³mol/L." },
            { id:'EX-CK2', niveau:'Intermédiaire', titre:'Ordre de réaction',
              enonce:"t₁/₂=20min pour [A]₀=0,1mol/L et t₁/₂=20min pour [A]₀=0,2mol/L. Ordre ?",
              correction:"t₁/₂ indépendant de [A]₀ → ordre 1.\nt₁/₂=ln2/k → k=ln2/20=0,035min⁻¹." },
          ]
        },
      ]
    },
    {
      id:'sc-ck2', titre:'9.2 Facteurs cinétiques et catalyse',
      notions:['Température : loi d\'Arrhenius k=A·e^(−Ea/RT)','Concentration : plus de chocs efficaces','Catalyseur : abaisse Ea','Trempe pour bloquer la réaction'],
      blocs:[
        {
          notion:'🌡️ Vitesse, température et catalyse',
          theoremes:[
            { id:'D-CK3', type:'def', nom:'Facteurs cinétiques',
              enonce:"FACTEURS QUI AUGMENTENT LA VITESSE :\n\n1. CONCENTRATION des réactifs ↑\n→ fréquence des chocs efficaces ↑\n\n2. TEMPÉRATURE ↑ (facteur le plus marquant)\nLoi d'Arrhenius : k = A·e^(−Ea/RT)\nEa = énergie d'activation (J/mol), R=8,314 J/K/mol\nRègle empirique : +10°C ≈ vitesse ×2 à ×3\n\n3. SURFACE de contact (solides divisés) ↑\n\n4. CATALYSEUR : abaisse Ea sans être consommé\nHomogène / Hétérogène / Enzymatique\n\nTREMPE : refroidir brutalement → fige la composition pour un dosage.",
              remarque:"Le catalyseur modifie le chemin réactionnel (Ea plus faible) mais ne change ni l'état final ni la constante d'équilibre K." },
            { id:'F-CK3', type:'formule', nom:'Exploitation de la loi d\'Arrhenius',
              enonce:"k = A·e^(−Ea/RT)\n\nFORME LINÉARISÉE :\nln k = ln A − Ea/(R·T)\n→ tracer ln k en fonction de 1/T : DROITE de pente −Ea/R.\n\nENTRE DEUX TEMPÉRATURES :\nln(k₂/k₁) = (Ea/R)·(1/T₁ − 1/T₂)\n\nINTERPRÉTATION :\nEa grande → réaction très sensible à la température.\n\nLien cinétique ↔ informatique : l'acquisition de [A](t) par capteur et la régression linéaire (ln k vs 1/T) se font par traitement numérique des mesures.",
              remarque:"Penser à convertir les températures en kelvins (T(K)=θ(°C)+273) dans la loi d'Arrhenius." },
          ],
          exercices:[
            { id:'EX-CK3', niveau:'Facile', titre:'Effet de la température',
              enonce:"Une réaction voit sa vitesse multipliée par 2 tous les 10°C. Par combien est-elle multipliée en passant de 20°C à 50°C ?",
              correction:"Δθ=30°C = 3 paliers de 10°C → ×2³ = ×8." },
            { id:'EX-CK4', niveau:'Difficile', titre:'Énergie d\'activation',
              enonce:"k₁=0,02 s⁻¹ à T₁=300K et k₂=0,08 s⁻¹ à T₂=320K. Calculer Ea (R=8,314).",
              correction:"ln(k₂/k₁)=ln4=1,386=(Ea/R)(1/300−1/320)=(Ea/8,314)×(2,08×10⁻⁴).\nEa=1,386×8,314/2,08×10⁻⁴≈55 400 J/mol≈55,4 kJ/mol." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — TRANSFORMATIONS CHIMIQUES (ESTÉRIFICATION + AMIDES)
// ─────────────────────────────────────────────────────────────────────
'transformations-info': {
  id:'transformations-info', emoji:'🔄', tag:'Chimie', color:'#06b6d4',
  titre:'Transformations chimiques',
  desc:"Estérification (acide+alcool⇌ester+H₂O), hydrolyse, formation d'amides (acide+amine→amide+H₂O), polycondensation. Taux d'avancement τ et rendement.",
  souschapitres:[
    {
      id:'sc-trans1', titre:'10.1 Estérification et hydrolyse',
      notions:['Acide+Alcool⇌Ester+H₂O (lente, limitée)','Hydrolyse (inverse, aussi limitée)','Saponification : ester+NaOH→ (totale)','Excès d\'un réactif → τ↑'],
      blocs:[
        {
          notion:'⚗️ Estérification — réaction et rendement',
          theoremes:[
            { id:'D-TR1', type:'def', nom:'Estérification et hydrolyse',
              enonce:"ESTÉRIFICATION :\nAcide carboxylique + Alcool ⇌ Ester + H₂O\nCatalyseur : H⁺ (H₂SO₄ conc.)\n\nCaractéristiques :\n• LENTE (heures à température ordinaire)\n• LIMITÉE (équilibre, K≈4 pour alcool primaire)\n• ATHERMIQUE (pratiquement)\n\nDÉPLACER L'ÉQUILIBRE VERS L'ESTER :\n• Excès de l'un des réactifs\n• Retirer l'ester ou l'eau produits (distillation)\n\nHYDROLYSE (inverse) :\nEster + H₂O ⇌ Acide + Alcool  (aussi limitée)\n\nSAPONIFICATION (base forte) :\nEster + NaOH → Alcool + Carboxylate de Na\nRéaction TOTALE et IRRÉVERSIBLE\nApplication : fabrication du savon" },
          ],
          exercices:[
            { id:'EX-TR1', niveau:'Facile', titre:'Estérification — nommer',
              enonce:"Réaction entre acide propanoïque et méthanol. Écrire et nommer l'ester.",
              correction:"CH₃CH₂COOH + CH₃OH ⇌ CH₃CH₂COOCH₃ + H₂O.\nEster : propanoate de méthyle." },
          ]
        },
      ]
    },
    {
      id:'sc-trans2', titre:'10.2 Formation d\'amides et polymères',
      notions:['Acide+Amine→Amide+H₂O (liaison amide −CO−NH−)','Liaison peptidique (biochimie)','Polyamide : Nylon 6-6 (diacide+diamine)','Degré de polymérisation n=M_pol/M_mono'],
      blocs:[
        {
          notion:'🔬 Amides et polymères',
          theoremes:[
            { id:'D-TR2', type:'def', nom:'Formation d\'amides',
              enonce:"RÉACTION ACIDE CARBOXYLIQUE + AMINE :\nR−COOH + R'−NH₂ → R−CO−NH−R' + H₂O\n\nLIAISON AMIDE : −CO−NH− (peptidique en biochimie)\n\nCARACTÉRISTIQUES :\nRéaction de polycondensation avec diacide + diamine\nRéversible (hydrolyse acide ou basique)\n\nPOLYAMIDE (NYLON 6-6) :\nAcide hexanédioïque (C₆) + Hexane-1,6-diamine (C₆)\n→ −(CO−(CH₂)₄−CO−NH−(CH₂)₆−NH)ₙ− + nH₂O\n\nLIAISON PEPTIDIQUE (protéines) :\nAcide aminé + Acide aminé → dipeptide + H₂O\n→ Même réaction mais avec acides α-aminés\n\nDEGRÉ DE POLYMÉRISATION :\nn = M_polymère / M_monomère" },
          ],
          exercices:[
            { id:'EX-TR2', niveau:'Intermédiaire', titre:'Liaison amide',
              enonce:"Acide acétique (CH₃COOH) + méthylamine (CH₃NH₂). Écrire le produit et identifier la liaison.",
              correction:"CH₃COOH + CH₃NH₂ → CH₃CO−NHCH₃ + H₂O.\nLiaison amide : −CO−NH−.\nProduit : N-méthylacétamide." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 11 — ÉQUILIBRE CHIMIQUE
// ─────────────────────────────────────────────────────────────────────
'equilibre-chimique-info': {
  id:'equilibre-chimique-info', emoji:'⚖️', tag:'Chimie', color:'#8b5cf6',
  titre:'Équilibre chimique',
  desc:"Quotient de réaction Qr, constante d'équilibre K, critère d'évolution (Qr vs K), loi de Le Chatelier, applications industrielles.",
  souschapitres:[
    {
      id:'sc-eq1', titre:'11.1 Qr, K et critère d\'évolution',
      notions:['Qr = produits/réactifs (concentrations)','K = Qr à l\'équilibre','Qr<K → sens direct ; Qr>K → sens inverse','Qr=K → équilibre (pas d\'évolution)'],
      blocs:[
        {
          notion:'⚖️ Équilibre et critère',
          theoremes:[
            { id:'D-EQ1', type:'def', nom:'Quotient de réaction et constante K',
              enonce:"Pour aA + bB ⇌ cC + dD :\nQr = [C]^c·[D]^d / ([A]^a·[B]^b)\n(concentrations en mol/L, à un instant t)\n\nCONSTANTE D'ÉQUILIBRE K :\nQr = K  quand le système est à l'équilibre\nK dépend uniquement de T\n\nCRITÈRE D'ÉVOLUTION :\nQr < K → évolution dans le sens DIRECT (→)\nQr > K → évolution dans le sens INVERSE (←)\nQr = K → système À L'ÉQUILIBRE (aucune évolution nette)" },
            { id:'T-EQ1', type:'thm', nom:'Loi de Le Chatelier',
              enonce:"Un système à l'équilibre modifié évolue pour s'opposer à la perturbation.\n\nAPPLICATIONS :\n\nCONCENTRATION :\nAjouter A (réactif) → sens direct → consomme A\nRetirer C (produit) → sens direct → produit C\n\nTEMPÉRATURE :\nAugmenter T → sens endothermique\nDiminuer T → sens exothermique\n\nPRESSION (gaz) :\nAugmenter P → sens diminuant n_gaz\n\nCATALYSEUR :\nPas d'effet sur la position de l'équilibre (K inchangé)\nAccélère seulement l'atteinte de l'équilibre" },
          ],
          exercices:[
            { id:'EX-EQ1', niveau:'Facile', titre:'Critère d\'évolution',
              enonce:"K=10⁻². Calculer Qr avec [A]=0,5mol/L, [B]=0,2mol/L, [C]=0,1mol/L pour A+B⇌C.",
              correction:"Qr=[C]/([A][B])=0,1/(0,5×0,2)=0,1/0,1=1.\nQr=1 > K=10⁻²=0,01 → sens INVERSE." },
          ]
        },
      ]
    },
    {
      id:'sc-eq2', titre:'11.2 Taux d\'avancement et calcul de K',
      notions:['Taux d\'avancement final τ=x_f/x_max','Réaction totale τ≈1 / limitée τ<1','Calcul de K à partir de l\'état d\'équilibre','Influence de la dilution'],
      blocs:[
        {
          notion:'⚗️ Avancement, taux et constante',
          theoremes:[
            { id:'M-EQ1', type:'methode', nom:'Calculer K à partir de l\'équilibre',
              enonce:"MÉTHODE :\n1. Tableau d'avancement (en mol).\n2. Concentrations à l'équilibre : [X]_éq = n_éq/V.\n3. K = Π[produits]^coeff / Π[réactifs]^coeff.\n\nTAUX D'AVANCEMENT FINAL :\nτ = x_f / x_max  (0 ≤ τ ≤ 1)\nτ ≈ 1 : réaction TOTALE ; τ < 1 : réaction LIMITÉE.\n\nACIDE FAIBLE AH (concentration C, taux τ) :\nAH + H₂O ⇌ A⁻ + H₃O⁺\n[H₃O⁺]=[A⁻]=τC ; [AH]=(1−τ)C\nKa = τ²C/(1−τ)  ≈ τ²C si τ petit → τ ≈ √(Ka/C)\n\nDILUTION : diluer (C↓) augmente le taux de dissociation τ (loi d'Ostwald).",
              remarque:"K est sans dimension et ne dépend que de T : changer les concentrations initiales modifie τ mais pas K." },
          ],
          exercices:[
            { id:'EX-EQ2', niveau:'Facile', titre:'Taux d\'avancement',
              enonce:"x_max=8×10⁻³ mol et x_f=2×10⁻³ mol. Taux τ ? Réaction totale ou limitée ?",
              correction:"τ=x_f/x_max=2/8=0,25=25%.\nτ<1 → réaction LIMITÉE." },
            { id:'EX-EQ3', niveau:'Intermédiaire', titre:'Constante d\'acidité',
              enonce:"Acide faible C=0,02 mol/L, taux de dissociation τ=0,03. Calculer Ka et pKa.",
              correction:"Ka=τ²C/(1−τ)=(0,03²×0,02)/0,97≈1,86×10⁻⁵.\npKa=−log(Ka)≈4,73." },
            { id:'EX-EQ4', niveau:'Difficile', titre:'Calcul de K',
              enonce:"H₂+I₂⇌2HI, V=1L. À l'équilibre [H₂]=0,1 ; [I₂]=0,1 ; [HI]=0,8 mol/L. Calculer K.",
              correction:"K=[HI]²/([H₂][I₂])=0,8²/(0,1×0,1)=0,64/0,01=64." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — ÉLECTROCHIMIE
// ─────────────────────────────────────────────────────────────────────
'electrochimie-info': {
  id:'electrochimie-info', emoji:'🔋', tag:'Chimie', color:'#f97316',
  titre:'Électrochimie',
  desc:"Piles électrochimiques (couples rédox, FEM, cathode/anode), électrolyse et loi de Faraday, galvanoplastie, batteries, raffinage de l'aluminium.",
  souschapitres:[
    {
      id:'sc-elec1', titre:'12.1 Piles et électrolyse',
      notions:['Couple Ox/Red : Ox+ne⁻⇌Red','Pile : cathode(+) réduction, anode(−) oxydation','FEM=V(+)−V(−)>0','Électrolyse : m=MIt/(nF), F=96500C/mol'],
      blocs:[
        {
          notion:'🔋 Piles et électrolyse — applications',
          theoremes:[
            { id:'D-EL1', type:'def', nom:'Piles et électrolyse',
              enonce:"COUPLE OX/RED : Ox + ne⁻ ⇌ Red\n\nPILE GALVANIQUE :\nAnode (−) : oxydation du réducteur\nCathode (+) : réduction de l'oxydant\nFEM = V(+) − V(−) > 0\n\nÉLECTROLYSE (réaction forcée) :\nAnode (+) : oxydation\nCathode (−) : réduction\n\nLOI DE FARADAY :\nm = M·I·t / (n·F)\nF = 96500 C/mol\nQ = I·t (charge en Coulombs)\n\nAPPLICATIONS :\nGalvanoplastie : dépôt de métal (argenture, dorure, chromage)\nBatteries (pile rechargeable) :\n→ Décharge : pile (spontané)\n→ Charge : électrolyse (forcé)\nRaffinage de l'aluminium (procédé Hall-Héroult) :\nAl₂O₃ fondu → Al (cathode) + O₂ (anode)" },
            { id:'M-EL1', type:'methode', nom:'Calcul par la loi de Faraday',
              enonce:"CALCUL DE MASSE DÉPOSÉE :\nm = M·I·t / (n·F)\n\nCALCUL DU TEMPS :\nt = m·n·F / (M·I)\n\nCALCUL DE LA CHARGE :\nQ = I·t = n·F·m/M\n\nEXEMPLE — Argenture :\nDéposer m=5g d'Ag (M=108g/mol, n=1) à I=2A\nt = 5×1×96500 / (108×2) = 482500/216 ≈ 2234s ≈ 37min" },
          ],
          exercices:[
            { id:'EX-EL1', niveau:'Facile', titre:'Loi de Faraday',
              enonce:"Électrolyse de CuSO₄ : I=3A, t=30min. Masse Cu déposée ? (M=64g/mol, n=2).",
              correction:"t=30×60=1800s.\nm=64×3×1800/(2×96500)=345600/193000≈1,79g." },
            { id:'EX-EL2', niveau:'Intermédiaire', titre:'Galvanoplastie',
              enonce:"Chromage : I=10A, surface 200cm². Épaisseur de Cr (M=52g/mol, n=3, ρ=7,2g/cm³) si t=20min.",
              correction:"m=52×10×1200/(3×96500)=624000/289500≈2,16g.\nVol=m/ρ=2,16/7,2=0,3cm³.\népaisseur=Vol/S=0,3/200=0,0015cm=15μm." },
          ]
        },
      ]
    },
    {
      id:'sc-elec2', titre:'12.2 Accumulateurs, capacité et corrosion',
      notions:['Accumulateur : charge (électrolyse) / décharge (pile)','Capacité Q en A·h ; énergie W=Q·U','Autonomie = Q/I','Corrosion et protection (anode sacrificielle)'],
      blocs:[
        {
          notion:'🔋 Batteries et durabilité',
          theoremes:[
            { id:'D-EL2', type:'def', nom:'Accumulateurs et capacité',
              enonce:"ACCUMULATEUR (pile rechargeable) :\nDÉCHARGE : fonctionne en pile (réaction spontanée, fournit du courant).\nCHARGE : fonctionne en électrolyse (réaction forcée par un générateur).\n\nCAPACITÉ : Q = I·t  (souvent en ampère-heure, 1 A·h = 3600 C)\nAUTONOMIE à courant I constant : t = Q/I.\nÉNERGIE STOCKÉE : W = Q·U  (U tension nominale)\n\nEXEMPLES : plomb-acide (voiture), Li-ion (téléphone, ordinateur portable).\n\nLIEN INFORMATIQUE : la gestion d'énergie (Battery Management System) mesure Q, I, U pour estimer l'état de charge d'un appareil.",
              remarque:"Une batterie « 5000 mAh » fournit 5 A pendant 1 h, ou 0,5 A pendant 10 h (à rendement constant)." },
            { id:'D-EL3', type:'def', nom:'Corrosion et protection',
              enonce:"CORROSION : oxydation spontanée d'un métal par le dioxygène/l'humidité.\nFer : Fe → Fe²⁺ + 2e⁻ (rouille).\n\nPROTECTION :\n• ANODE SACRIFICIELLE : relier le fer à un métal plus réducteur (zinc, magnésium).\nLe métal sacrificiel s'oxyde à la place du fer.\n• GALVANISATION : recouvrir d'une couche de zinc.\n• PROTECTION CATHODIQUE : imposer un potentiel par générateur.\n• PEINTURE / REVÊTEMENT : isoler de l'air et de l'eau.\n\nLe métal le plus réducteur (le plus bas dans la classification) est oxydé en premier.",
              remarque:"La coque des navires est protégée par des blocs de zinc (anodes sacrificielles) que l'on remplace périodiquement." },
          ],
          exercices:[
            { id:'EX-EL3', niveau:'Facile', titre:'Autonomie d\'une batterie',
              enonce:"Une batterie de 2000 mAh alimente un circuit consommant 250 mA. Autonomie ?",
              correction:"t=Q/I=2000/250=8 heures." },
            { id:'EX-EL4', niveau:'Intermédiaire', titre:'Énergie stockée',
              enonce:"Batterie Li-ion : Q=3 A·h sous U=3,7 V. Énergie en joules et en W·h ?",
              correction:"W=Q·U=3×3,7=11,1 W·h.\nEn joules : 11,1×3600≈39 960 J≈40 kJ." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 13 — TABLEAU D'AVANCEMENT
// ─────────────────────────────────────────────────────────────────────
'avancement-info': {
  id:'avancement-info', emoji:'📊', tag:'Chimie', color:'#ec4899',
  titre:"Tableau d'avancement",
  desc:"Variable d'avancement x, réactif limitant, x_max, taux d'avancement final τ=x_f/x_max, concentrations à l'état final, dosages par calcul stœchiométrique.",
  souschapitres:[
    {
      id:'sc-av1', titre:'13.1 Avancement, réactif limitant et taux τ',
      notions:['Variable x : avancement de la réaction','x_max : réactif limitant épuisé','τ=x_f/x_max (taux d\'avancement final)','Réaction totale τ=1 ; limitée τ<1'],
      blocs:[
        {
          notion:'📊 Tableau d\'avancement — méthode',
          theoremes:[
            { id:'M-AV1', type:'methode', nom:'Méthode du tableau d\'avancement',
              enonce:"Pour aA + bB → cC + dD :\n\nTABLEAU :\nÉtat    |  A          |   B          |   C    |   D\nInitial | n(A)₀       | n(B)₀        |   0    |   0\nCours x | n(A)₀−ax    | n(B)₀−bx     |  cx    |  dx\nFinal   | n(A)₀−ax_f  | n(B)₀−bx_f   | cx_f   | dx_f\n\nRÉACTIF LIMITANT :\nTrouver x_max = min(n(A)₀/a ; n(B)₀/b)\nLe réactif pour lequel n=0 en premier est limitant\n\nTAUX D'AVANCEMENT :\nτ = x_f / x_max\nτ = 1 : réaction TOTALE (réactif limitant épuisé)\n0 < τ < 1 : réaction LIMITÉE (équilibre)\n\nCONCENTRATIONS FINALES :\n[C]_f = cx_f / V_solution  (pour une réaction en solution)" },
            { id:'D-AV1', type:'def', nom:'Applications aux dosages',
              enonce:"DOSAGE STŒCHIOMÉTRIQUE :\nÀ l'équivalence (réaction totale) :\nn_A·C_A·V_A = n_B·C_B·V_B\nRéactif limitant = réactif titré (épuisé)\n\nEXEMPLE : dosage HCl par NaOH\nHCl + NaOH → NaCl + H₂O\n(ratio 1:1)\n\nn(HCl) = C_HCl×V_HCl = n(NaOH) = C_NaOH×V_éq\n→ C_HCl = C_NaOH×V_éq/V_HCl\n\nEXEMPLE 2 : dosage H₂SO₄ par NaOH\nH₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O\n(ratio 1:2)\nn(H₂SO₄) = C×V = n(NaOH)/2 = C_NaOH×V_éq/2",
              remarque:"Le tableau d'avancement est un outil universel en chimie : dosage, équilibre, cinétique. Maîtriser la méthode du réactif limitant et le calcul de τ." },
          ],
          exercices:[
            { id:'EX-AV1', niveau:'Facile', titre:'Réactif limitant',
              enonce:"2H₂ + O₂ → 2H₂O. n(H₂)=4mol, n(O₂)=1mol. Réactif limitant ?",
              correction:"x_max(H₂) = 4/2 = 2 mol.\nx_max(O₂) = 1/1 = 1 mol.\nMin = 1mol → O₂ est le réactif limitant.\nH₂O produit : 2×1=2mol." },
            { id:'EX-AV2', niveau:'Intermédiaire', titre:'Taux d\'avancement',
              enonce:"Estérification : n(acide)=n(alcool)=1mol, τ=0,67. Quantités à l'équilibre.",
              correction:"x_max=1mol. x_f=τ×x_max=0,67mol.\nn(ester)=0,67mol ; n(H₂O)=0,67mol.\nn(acide)=1−0,67=0,33mol ; n(alcool)=0,33mol." },
            { id:'EX-AV3', niveau:'Difficile', titre:'Dosage indirect',
              enonce:"H₂SO₄ 0,1mol/L (20mL) dosé par NaOH 0,2mol/L. V_éq ?",
              correction:"H₂SO₄+2NaOH→Na₂SO₄+2H₂O.\nn(H₂SO₄)=0,1×0,02=2×10⁻³mol.\nn(NaOH)=2×n(H₂SO₄)=4×10⁻³mol.\nV_éq=n(NaOH)/C_NaOH=4×10⁻³/0,2=0,02L=20mL." },
          ]
        },
      ]
    },
    {
      id:'sc-av2', titre:'13.2 Avancement avec gaz et dosage d\'oxydoréduction',
      notions:['Quantité de gaz : n=V/Vm (Vm≈24 L/mol)','Loi des gaz parfaits PV=nRT','Tableau d\'avancement pour un dégagement gazeux','Dosage rédox stœchiométrique'],
      blocs:[
        {
          notion:'🧮 Avancement, gaz et rédox',
          theoremes:[
            { id:'F-AV1', type:'formule', nom:'Avancement et quantité de gaz',
              enonce:"QUANTITÉ DE MATIÈRE GAZEUSE :\nn = V / V_m   (V_m ≈ 24 L/mol à 25°C, 22,4 L/mol à 0°C)\nou loi des gaz parfaits : P·V = n·R·T  (R=8,314 ; T en K ; P en Pa)\n\nTABLEAU D'AVANCEMENT avec dégagement gazeux :\nLe volume de gaz dégagé est proportionnel à l'avancement x :\nV_gaz = n_gaz·V_m = (coeff·x)·V_m\n→ suivre V_gaz(t) permet de suivre x(t) (méthode volumétrique).\n\nEXEMPLE : métal + acide → H₂(g)\nZn + 2H⁺ → Zn²⁺ + H₂\nx mol de Zn → x mol de H₂ → V = x·V_m.",
              remarque:"La mesure du volume de gaz dégagé (éprouvette renversée, capteur de pression) est une méthode de suivi cinétique courante." },
            { id:'M-AV2', type:'methode', nom:'Dosage d\'oxydoréduction',
              enonce:"DOSAGE RÉDOX : faire réagir totalement l'espèce à doser avec un réactif titrant.\n\n1. Écrire les deux demi-équations et l'équation bilan.\n2. À l'équivalence : les réactifs sont dans les proportions stœchiométriques.\nn(oxydant)/coeff_ox = n(réducteur)/coeff_red\n3. Repérer l'équivalence (changement de couleur, potentiel).\n\nEXEMPLE — dosage du fer(II) par le permanganate :\nMnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O\nÀ l'équivalence : n(Fe²⁺) = 5·n(MnO₄⁻)\nÉquivalence repérée par la persistance de la couleur violette.",
              remarque:"Le permanganate est son propre indicateur : la première goutte en excès colore durablement la solution en violet." },
          ],
          exercices:[
            { id:'EX-AV4', niveau:'Facile', titre:'Volume de gaz dégagé',
              enonce:"Zn + 2H⁺ → Zn²⁺ + H₂. On dissout 0,1 mol de Zn (en excès d'acide). Volume de H₂ (V_m=24 L/mol) ?",
              correction:"n(H₂)=n(Zn)=0,1 mol.\nV=n·V_m=0,1×24=2,4 L." },
            { id:'EX-AV5', niveau:'Difficile', titre:'Dosage par le permanganate',
              enonce:"20 mL de Fe²⁺ dosés par MnO₄⁻ 0,02 mol/L ; équivalence à 16 mL. Concentration en Fe²⁺ ?",
              correction:"n(MnO₄⁻)=0,02×0,016=3,2×10⁻⁴ mol.\nn(Fe²⁺)=5×n(MnO₄⁻)=1,6×10⁻³ mol.\nC(Fe²⁺)=1,6×10⁻³/0,02=0,08 mol/L." },
          ]
        },
      ]
    },
  ]
},


'oscillations-forcees-info': {
  id:'oscillations-forcees-info', emoji:'📶', tag:'Physique', color:'#8b5cf6',
  titre:"Oscillations électriques forcées",
  desc:"RLC forcé, résonance, Im=E/R à ω₀, facteur de qualité Q, bande passante Δf=f₀/Q.",
  souschapitres:[
    {
      id:'sc-ofi1', titre:"1. Résonance et facteur de qualité",
      notions:["Résonance à ω=ω₀=1/√(LC)","Im_max=E/R","Q=Lω₀/R","Bande passante Δf=f₀/Q"],
      blocs:[
        {
          notion:"📐 Oscillations forcées — RLC",
          theoremes:[
            { id:'F-OFI1', type:'formule', nom:"Résonance RLC série",
              enonce:"Circuit RLC série alimenté par e(t)=Em cos(ωt) :\n\nImpédance : Z = √[R² + (Lω - 1/(Cω))²]\nCourant : Im = Em/Z  ;  i(t) = Im·cos(ωt + φ)\n\nRésonance en intensité : ω_r = 1/√(LC) = ω₀\nÀ la résonance : Z_min=R  ⇒  Im_max = Em/R\n\nFacteur de qualité : Q = Lω₀/R = 1/(RCω₀)\nBande passante : Δf = f₀/Q  (Δω = R/L)" },
          ],
          exercices:[
            { id:'EX-OFI1', niveau:'Moyen', titre:"Résonance RLC",
              enonce:"RLC : R=10Ω, L=50mH, C=20µF. Calculer f₀, Q et la bande passante Δf.",
              correction:"ω₀=1/√(0,05×20×10⁻⁶)=1/√(10⁻⁶)=1000 rad/s. f₀≈159 Hz. Q=0,05×1000/10=5. Δf=159/5≈32 Hz." },
          ],
        },
      ],
    },
    {
      id:'sc-ofi2', titre:"2. Impédance, déphasage et puissance",
      notions:["Impédance Z=√(R²+(Lω−1/Cω)²)","Déphasage tanφ=(Lω−1/Cω)/R","Puissance P=U_eff·I_eff·cosφ","Facteur de puissance cosφ"],
      blocs:[
        {
          notion:"⚡ Régime sinusoïdal forcé",
          theoremes:[
            { id:'F-OFI2', type:'formule', nom:"Impédance et déphasage",
              enonce:"u(t)=Um·sin(ωt) ; i(t)=Im·sin(ωt+φ)\n\nIMPÉDANCE : Z = Um/Im = √[R² + (Lω − 1/(Cω))²]\n\nDÉPHASAGE de u par rapport à i :\ntanφ = (Lω − 1/(Cω))/R\n• Lω > 1/Cω → inductif (φ>0)\n• Lω < 1/Cω → capacitif (φ<0)\n• Lω = 1/Cω → résonance : Z=R, φ=0, Im max=Um/R" },
            { id:'F-OFI3', type:'formule', nom:"Puissance en régime sinusoïdal",
              enonce:"PUISSANCE MOYENNE (active, W) :\nP = U_eff·I_eff·cosφ = R·I_eff²\navec U_eff=Um/√2 , I_eff=Im/√2\n\nFACTEUR DE PUISSANCE : cosφ\nSeule R consomme de la puissance ; L et C ont une puissance moyenne nulle.\n\nÀ LA RÉSONANCE : φ=0 → cosφ=1 → P maximale = U_eff²/R.",
              remarque:"Un faible cosφ augmente le courant pour une même puissance utile : on relève le facteur de puissance avec des condensateurs." },
          ],
          exercices:[
            { id:'EX-OFI2', niveau:'Facile', titre:"Impédance hors résonance",
              enonce:"R=20Ω, Lω=60Ω, 1/Cω=20Ω. Calculer Z et φ.",
              correction:"Z=√(20²+(60−20)²)=√(400+1600)=√2000≈44,7Ω.\ntanφ=40/20=2 → φ≈63° (inductif)." },
            { id:'EX-OFI3', niveau:'Difficile', titre:"Puissance à la résonance",
              enonce:"À la résonance R=10Ω, U_eff=12V. Puissance moyenne et I_eff ?",
              correction:"À la résonance Z=R → I_eff=12/10=1,2A.\nP=U_eff·I_eff·cos0=12×1,2=14,4 W." },
          ],
        },
      ],
    },
  ],
},

'filtres-info': {
  id:'filtres-info', emoji:'📻', tag:'Physique', color:'#8b5cf6',
  titre:"Filtres électriques",
  desc:"Filtres RC passifs : passe-bas, passe-haut, passe-bande. Gain, fréquence de coupure, diagrammes de Bode.",
  souschapitres:[
    {
      id:'sc-fi1', titre:"1. Filtres RC et traitement du signal",
      notions:["Filtre passe-bas fc=1/(2πRC)","Filtre passe-haut — même fc","Gain G=Us/Ue","G(dB)=20 log(Us/Ue)"],
      blocs:[
        {
          notion:"📐 Filtres électriques",
          theoremes:[
            { id:'F-FI1', type:'formule', nom:"Filtres RC passe-bas et passe-haut",
              enonce:"FILTRE PASSE-BAS (RC, sortie sur condensateur) :\nG(f) = 1/√[1+(f/fc)²]\nfc = 1/(2πRC)\nÀ f=fc : G=1/√2 ≋ 0,707 (−3 dB)\nPasse f<fc, atténue f>fc\n\nFILTRE PASSE-HAUT (RC, sortie sur résistance) :\nG(f) = (f/fc)/√[1+(f/fc)²]\nMême fc, passe f>fc\n\nG(dB) = 20·log(Us/Ue)\nDiagramme de Bode : G(dB) vs log(f)" },
            { id:'F-FI2', type:'formule', nom:"Application informatique",
              enonce:"TRAITEMENT DU SIGNAL :\nFiltre passe-bas : élimine le bruit haute fréquence\nFiltre passe-haut : détecte les variations rapides (bords)\nFiltre passe-bande : sélectionne une fréquence utile\n\nANTI-ALIASING :\nFiltrage avant numérisation (théorème de Shannon : fe > 2·fmax)\nfe : fréquence échantillonnage ; fmax : fréquence maximale du signal" },
          ],
          exercices:[
            { id:'EX-FI1', niveau:'Facile', titre:"Fréquence de coupure",
              enonce:"Filtre RC passe-bas : R=10kΩ, C=16nF. Calculer fc.",
              correction:"fc=1/(2π×10×10³×16×10⁻⁹)=1/(2π×1,6×10⁻⁴)≈1000 Hz=1 kHz." },
          ],
        },
      ],
    },
    {
      id:'sc-fi2', titre:"2. Décibels, Bode et échantillonnage",
      notions:["Gain en dB : G_dB=20·log(Us/Ue)","Coupure à −3 dB","Pente ±20 dB/décade","Théorème de Shannon fe>2·fmax"],
      blocs:[
        {
          notion:"📊 Bode et numérisation",
          theoremes:[
            { id:'F-FI3', type:'formule', nom:"Gain en décibels et diagramme de Bode",
              enonce:"GAIN EN DÉCIBELS : G_dB = 20·log₁₀(Us/Ue)\n\nG=1 → 0 dB ; G=1/√2 → −3 dB (fréquence de coupure) ; G=1/10 → −20 dB\n\nDIAGRAMME DE BODE : G_dB en fonction de log(f).\nPasse-bas du 1er ordre :\n• f ≪ fc : plateau à 0 dB\n• f ≫ fc : pente −20 dB/décade (×10 sur f → −20 dB)\n\nDÉCADE = ×10 ; OCTAVE = ×2.\nUn filtre du 2nd ordre coupe plus raide (−40 dB/décade)." },
            { id:'D-FI3', type:'def', nom:"Filtrage et échantillonnage (Shannon)",
              enonce:"THÉORÈME DE SHANNON-NYQUIST :\nPour numériser sans perte un signal de fréquence max f_max :\nfe > 2·f_max  (fe = fréquence d'échantillonnage)\n\nFILTRE ANTI-REPLIEMENT :\nFiltre passe-bas placé AVANT le CAN, fc < fe/2,\nsupprime les fréquences trop hautes → évite le repliement (aliasing).\n\nFILTRE PASSE-BANDE :\nLaisse passer [f₁ ; f₂]. Largeur Δf=f₂−f₁, fréquence centrale f₀=√(f₁f₂), Q=f₀/Δf.\nQ élevé → filtre sélectif (radio, télécom).",
              remarque:"Audio CD : fe=44,1 kHz pour reproduire jusqu'à ~20 kHz (limite de l'audition), conformément à fe>2·f_max." },
          ],
          exercices:[
            { id:'EX-FI2', niveau:'Facile', titre:"Conversion en décibels",
              enonce:"Un filtre a un gain G=Us/Ue=0,05. Gain en décibels ?",
              correction:"G_dB=20·log(0,05)=20×(−1,3)=−26 dB." },
            { id:'EX-FI3', niveau:'Intermédiaire', titre:"Fréquence d'échantillonnage",
              enonce:"Un signal contient des fréquences jusqu'à 4 kHz. Fréquence d'échantillonnage minimale et fc du filtre anti-repliement ?",
              correction:"Shannon : fe>2×4=8 kHz.\nFiltre anti-repliement : fc<fe/2=4 kHz." },
          ],
        },
      ],
    },
  ],
},

'multivibrateurs-info': {
  id:'multivibrateurs-info', emoji:'💻', tag:'Physique', color:'#8b5cf6',
  titre:"Multivibrateurs & Électronique",
  desc:"Multivibrateur astable — signal carré, période T=f(R,C), transistors, horloge électronique.",
  souschapitres:[
    {
      id:'sc-mv1', titre:"1. Multivibrateur astable",
      notions:["Oscillation auto-entretenue","Signal carré périodique","Période T=0,7(R1C1+R2C2)","Applications horloge"],
      blocs:[
        {
          notion:"📐 Multivibrateur astable",
          theoremes:[
            { id:'D-MV1', type:'def', nom:"Multivibrateur astable — principe",
              enonce:"Le multivibrateur astable est un oscillateur à deux états instables.\n\nPRINCIPE :\n2 transistors T1 et T2 en commutation alternée\nQuand T1 sature (ON) : T2 bloque (OFF) et inversement\nLe basculement est commandé par les condensateurs de couplage\n\nPÉRIODE (multivibrateur symétrique) :\nT = 0,7·(R1C1 + R2C2) ≈ 1,4·RC (si R1=R2=R, C1=C2=C)\nf = 1/T\n\nAPPLICATIONS INFORMATIQUES :\nHorloge microprocesseur\nGénérateur de signal test\nCompteurs numériques" },
          ],
          exercices:[
            { id:'EX-MV1', niveau:'Facile', titre:"Période du multivibrateur",
              enonce:"Multivibrateur astable symétrique : R=10kΩ, C=10nF. Calculer T et f.",
              correction:"T=1,4×RC=1,4×10×10³×10×10⁻⁹=1,4×10⁻⁴ s=0,14 ms. f=1/T≈7142 Hz≈7 kHz." },
          ],
        },
      ],
    },
    {
      id:'sc-mv2', titre:"2. Monostable, NE555 et signaux logiques",
      notions:["Monostable : une impulsion calibrée","Rapport cyclique α=t_haut/T","NE555 : astable et monostable","Niveaux logiques 0/1 et horloge"],
      blocs:[
        {
          notion:"💻 Mise en forme et horloge numérique",
          theoremes:[
            { id:'D-MV2', type:'def', nom:"Monostable et rapport cyclique",
              enonce:"MULTIVIBRATEUR MONOSTABLE :\nUn seul état stable. Sur un déclenchement, il bascule pour une durée calibrée\nT ≈ 1,1·RC puis revient à l'état stable.\n→ génère une impulsion de durée fixe (temporisation, anti-rebond).\n\nRAPPORT CYCLIQUE (signal carré) :\nα = t_haut / T  (entre 0 et 1, souvent en %)\nValeur moyenne du signal = α·V_haut.\n\nNE555 : circuit intégré configurable en astable (oscillateur) ou monostable.\nAstable : T = 0,7·(R_A + 2R_B)·C ; f = 1/T.\n\nAPPLICATIONS : horloge, PWM (commande de moteur, variation de luminosité LED).",
              remarque:"En PWM, faire varier le rapport cyclique α règle la puissance moyenne envoyée à une charge sans dissiper d'énergie (commande efficace de moteurs et LED)." },
            { id:'D-MV3', type:'def', nom:"Niveaux logiques et horloge",
              enonce:"NIVEAUX LOGIQUES (logique TTL/CMOS) :\n0 logique ≈ 0 V (niveau bas) ; 1 logique ≈ 5 V (ou 3,3 V) (niveau haut).\nUne zone interdite sépare les deux pour la fiabilité.\n\nSIGNAL D'HORLOGE (clock) :\nSignal carré périodique qui cadence les circuits séquentiels (compteurs, processeurs).\nFréquence d'horloge f = 1/T → nombre de cycles par seconde (Hz).\nUn processeur à 2 GHz exécute 2×10⁹ cycles/s.\n\nLes multivibrateurs et oscillateurs à quartz fournissent ces horloges.",
              remarque:"La fréquence d'horloge limite le débit d'instructions : c'est un lien direct entre l'électronique (oscillateur) et la performance informatique." },
          ],
          exercices:[
            { id:'EX-MV2', niveau:'Facile', titre:"Monostable NE555",
              enonce:"Monostable : R=47kΩ, C=1µF. Durée de l'impulsion T≈1,1·RC ?",
              correction:"T=1,1×47×10³×10⁻⁶=1,1×0,047=0,0517 s≈52 ms." },
            { id:'EX-MV3', niveau:'Intermédiaire', titre:"PWM et valeur moyenne",
              enonce:"Signal PWM 0/5V, rapport cyclique α=30%. Tension moyenne appliquée à la LED ?",
              correction:"U_moy=α×V_haut=0,30×5=1,5 V." },
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
export default function PhysiqueInfoSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'condensateur-info'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
          <h2>Chapitre non trouvé</h2>
          <Link href="/bac/physique/informatique" style={{ color:'#8b5cf6' }}>← Retour Physique Info</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#8b5cf6'
  const isChimie = IS_CHIMIE[slug] || false

  const PHYS_SLUGS = NAV_ORDER.slice(0,10)
  const CHIM_SLUGS = NAV_ORDER.slice(10)

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Bac</Link><span>›</span>
          <Link href="/bac/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link><span>›</span>
          <Link href="/bac/physique/informatique" style={{ color:'var(--muted)', textDecoration:'none' }}>Informatique</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{chapter.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 270px', gap:32, alignItems:'start' }}>
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
                  <span style={{ fontSize:11, background:'rgba(139,92,246,0.15)',
                    color:'#a78bfa', padding:'2px 9px', borderRadius:10 }}>
                    {isChimie ? '🧪 Chimie' : '⚛️ Physique'} · Section Info · Tunisie
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Physique-Chimie Section Informatique Bac Tunisie')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/examens" style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                    borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                    color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>📋 Exercices Bac</Link>
                  <Link href="/simulation" style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                    borderRadius:10, background:`${secColor}10`, border:`1px solid ${secColor}30`,
                    color:secColor, fontSize:13, fontWeight:600, textDecoration:'none' }}>🎯 Simulation Bac</Link>
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
                                      <p style={{ fontSize:12, color:'var(--text2)', margin:0, lineHeight:1.65, whiteSpace:'pre-line' }}>{ex.enonce}</p>
                                    </div>
                                    <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>
                                      <Link href={`/solve?q=${encodeURIComponent('Physique-Chimie Info Tunisie — '+ex.enonce)}`}
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
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* NAV PREV / NEXT */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12,
                borderTop:'1px solid var(--border)', paddingTop:22, marginTop:8 }}>
                {prevSlug ? (
                  <Link href={`/bac/physique/informatique/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/physique/informatique/${nextSlug}`} style={{ textDecoration:'none' }}>
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
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#8b5cf6', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(139,92,246,0.08)' }}>⚛️ Physique — 7 chapitres</div>
                {PHYS_SLUGS.map(s => (
                  <Link key={s} href={`/bac/physique/informatique/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'8px 15px', borderBottom:'1px solid var(--border)',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>
                        {TITRES_NAV[s].split(' — ')[0]}
                      </div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>
                        {TITRES_NAV[s].replace(/CH \d+ — /,'').slice(0,26)}
                      </div>
                    </div>
                  </Link>
                ))}
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#10b981', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(16,185,129,0.08)' }}>🧪 Chimie — 6 chapitres</div>
                {CHIM_SLUGS.map(s => (
                  <Link key={s} href={`/bac/physique/informatique/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'8px 15px', borderBottom:'1px solid var(--border)',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>
                        {TITRES_NAV[s].split(' — ')[0]}
                      </div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>
                        {TITRES_NAV[s].replace(/CH \d+ — /,'').slice(0,26)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Section Informatique Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.tag}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Exercices type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/physique/informatique" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                  <Link href="/bac/physique" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📚 Autres sections</Link>
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