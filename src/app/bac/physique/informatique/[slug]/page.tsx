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
  // Physique
  'condensateur-info','dipole-rc-info','bobine-rl-info','oscillations-lc-info',
  'ondes-mec-info','ondes-optique-info','nucleaire-info',
  // Chimie
  'acide-base-info','cinetique-info','transformations-info',
  'equilibre-chimique-info','electrochimie-info','avancement-info',
]

const TITRES_NAV: Record<string,string> = {
  'condensateur-info':      'CH 01 — Condensateur',
  'dipole-rc-info':         'CH 02 — Dipôle RC',
  'bobine-rl-info':         'CH 03 — Bobine & Dipôle RL',
  'oscillations-lc-info':   'CH 04 — Oscillations électriques libres',
  'ondes-mec-info':         'CH 05 — Ondes mécaniques progressives',
  'ondes-optique-info':     'CH 06 — Ondes et optique',
  'nucleaire-info':         'CH 07 — Physique nucléaire',
  'acide-base-info':        'CH 08 — Acides-bases',
  'cinetique-info':         'CH 09 — Cinétique chimique',
  'transformations-info':   'CH 10 — Transformations chimiques',
  'equilibre-chimique-info':'CH 11 — Équilibre chimique',
  'electrochimie-info':     'CH 12 — Électrochimie',
  'avancement-info':        'CH 13 — Tableau d\'avancement',
}

const SEC_COLORS: Record<string,string> = {
  'condensateur-info':'#8b5cf6','dipole-rc-info':'#6d28d9','bobine-rl-info':'#4f6ef7',
  'oscillations-lc-info':'#06b6d4','ondes-mec-info':'#f59e0b',
  'ondes-optique-info':'#14b8a6','nucleaire-info':'#ef4444',
  'acide-base-info':'#10b981','cinetique-info':'#f59e0b','transformations-info':'#06b6d4',
  'equilibre-chimique-info':'#8b5cf6','electrochimie-info':'#f97316','avancement-info':'#ec4899',
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

  const PHYS_SLUGS = NAV_ORDER.slice(0,7)
  const CHIM_SLUGS = NAV_ORDER.slice(7)

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