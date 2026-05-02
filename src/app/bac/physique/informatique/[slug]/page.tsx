'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TUNISIE — Informatique — PAGE SLUG
// Route : /bac/physique/informatique/[slug]
// Programme officiel MEN Tunisie · 4ème année Informatique
// ══════════════════════════════════════════════════════════════════════

const C: Record<string, string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'condensateur-info','dipole-rc-info','bobine-rl-info','oscillations-lc-info','ondes-mec-info','ondes-optique-info','nucleaire-info',
  'acide-base-info','cinetique-info','transformations-info','equilibre-chimique-info','electrochimie-info','avancement-info'
]
const TITRES_NAV: Record<string,string> = {
  'condensateur-info':     'CH.1 — Condensateur',
  'dipole-rc-info':        'CH.2 — Dipôle RC',
  'bobine-rl-info':        'CH.3 — Bobine & Dipôle RL',
  'oscillations-lc-info':  'CH.4 — Oscillations électriques',
  'ondes-mec-info':        'CH.5 — Ondes mécaniques',
  'ondes-optique-info':    'CH.6 — Ondes et optique',
  'nucleaire-info':        'CH.7 — Physique nucléaire',
  'acide-base-info':       'CH.1 — Acides-bases',
  'cinetique-info':        'CH.2 — Cinétique chimique',
  'transformations-info':  'CH.3 — Transformations chimiques',
  'equilibre-chimique-info':'CH.4 — Équilibre chimique',
  'electrochimie-info':    'CH.5 — Électrochimie',
  "avancement-info":       "CH.6 — Tableau d'avancement",
}
const SEC_COLORS: Record<string,string> = {
  'condensateur-info':     '#8b5cf6',
  'dipole-rc-info':        '#6d28d9',
  'bobine-rl-info':        '#4f6ef7',
  'oscillations-lc-info':  '#06b6d4',
  'ondes-mec-info':        '#f59e0b',
  'ondes-optique-info':    '#14b8a6',
  'nucleaire-info':        '#ef4444',
  'acide-base-info':       '#10b981',
  'cinetique-info':        '#f59e0b',
  'transformations-info':  '#06b6d4',
  'equilibre-chimique-info':'#8b5cf6',
  'electrochimie-info':    '#f97316',
  'avancement-info':       '#ec4899',
}

// ═══════════════════════════════════════════════════════════════════
// DONNÉES — TOUS LES CHAPITRES
// ═══════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string, {
  id:string; titre:string; badge:string; color:string; emoji:string; desc:string;
  souschapitres: {
    id:string; titre:string; notions:string[];
    blocs: {
      notion:string;
      theoremes: {id:string; type:string; nom:string; enonce:string}[];
      exercices: {id:string; niveau:string; titre:string; enonce:string; correction:string}[];
    }[];
  }[];
}> ={

// ═══════════════════════════════════════════════════════════════════
// CH.1 — CONDENSATEUR (Physique T1)
// ═══════════════════════════════════════════════════════════════════
'condensateur-info': {
  id:'condensateur-info', emoji:'⚡', badge:'Physique T1', color:'#8b5cf6',
  titre:'Condensateur',
  desc:'Charge et décharge du condensateur, capacité, énergie électrostatique. Programme Bac Tunisie Informatique.',
  souschapitres:[
    {
      id:'sc-condo-charge', titre:'Charge et décharge',
      notions:['Charge q=CU','Décharge','Courbes u_C(t) et i(t)'],
      blocs:[
        {
          notion:'⚡ Charge d\'un condensateur',
          theoremes:[
            { id:'D-COND1', type:'def', nom:'Condensateur',
              enonce:'Un condensateur est un dipôle formé de deux conducteurs séparés par un isolant (diélectrique).\n\nRelation fondamentale : q = C·u_C\navec q la charge (C), C la capacité (F), u_C la tension (V).\n\nLors d\'une charge par un générateur de f.e.m. E à travers R :\nRC·du_C/dt + u_C = E\n\nSolution : u_C(t) = E(1 − e^(−t/τ)) avec τ = RC' },
            { id:'F-COND1', type:'formule', nom:'Constante de temps RC',
              enonce:'τ = R·C (en secondes)\n\nSignification physique :\n• À t = τ : u_C = E(1 − e⁻¹) ≈ 0,63E\n• À t = 5τ : condensateur pratiquement chargé (99,3%)' },
          ],
          exercices:[
            { id:'EX-COND1', niveau:'Facile', titre:'Calcul de τ',
              enonce:'Un condensateur C = 100 μF est en série avec R = 10 kΩ. Calculer τ et le temps de charge complet.',
              correction:'τ = RC = 10×10³ × 100×10⁻⁶ = 1 s\nTemps de charge complet ≈ 5τ = 5 s' },
          ]
        },
        {
          notion:'📉 Décharge du condensateur',
          theoremes:[
            { id:'F-COND2', type:'formule', nom:'Décharge RC',
              enonce:'Lors de la décharge d\'un condensateur préchargé à U₀ :\n\nRC·du_C/dt + u_C = 0\nSolution : u_C(t) = U₀·e^(−t/τ)\ni(t) = −(U₀/R)·e^(−t/τ)\n\nL\'énergie emmagasinée est restituée au circuit.' },
          ],
          exercices:[
            { id:'EX-COND2', niveau:'Intermédiaire', titre:'Décharge',
              enonce:'Un condensateur C=47μF chargé à U₀=12V se décharge dans R=4,7kΩ. Calculer u_C après t=τ.',
              correction:'τ = 4700×47×10⁻⁶ = 0,221 s\nu_C(τ) = 12×e⁻¹ ≈ 12×0,368 ≈ 4,4 V' },
          ]
        }
      ]
    },
    {
      id:'sc-condo-energie', titre:'Capacité et énergie électrostatique',
      notions:['Capacité C (Farads)','E=½CU²','Condensateur plan','Applications'],
      blocs:[
        {
          notion:'💡 Énergie stockée',
          theoremes:[
            { id:'F-COND3', type:'formule', nom:'Énergie électrostatique',
              enonce:'E_C = ½·C·U²\n\navec C en Farads, U en Volts, E_C en Joules.\n\nApplications : flash photographique, défibrillateur cardiaque, condensateurs de démarrage moteur.' },
          ],
          exercices:[
            { id:'EX-COND3', niveau:'Facile', titre:'Énergie stockée',
              enonce:'Calculer l\'énergie stockée dans C=470μF chargé à U=100V.',
              correction:'E = ½ × 470×10⁻⁶ × 100² = ½ × 470×10⁻⁶ × 10000 = 2,35 J' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.2 — DIPÔLE RC (Physique T1)
// ═══════════════════════════════════════════════════════════════════
'dipole-rc-info': {
  id:'dipole-rc-info', emoji:'🔌', badge:'Physique T1', color:'#6d28d9',
  titre:'Dipôle RC',
  desc:'Étude expérimentale du dipôle RC, équation différentielle, constante de temps, intensité du courant.',
  souschapitres:[
    {
      id:'sc-rc-eqdiff', titre:'Équation différentielle du dipôle RC',
      notions:['RC·du/dt + u = E','Solution générale','Conditions initiales'],
      blocs:[
        {
          notion:'📐 Mise en équation',
          theoremes:[
            { id:'T-RC1', type:'thm', nom:'Équation différentielle RC',
              enonce:'Pour un circuit RC série alimenté par générateur E :\n\nLoi des mailles : E = u_R + u_C = Ri + u_C\nOr i = C·du_C/dt\nDonc : RC·du_C/dt + u_C = E\n\nSolution : u_C(t) = E + (U₀ − E)·e^(−t/τ)\navec τ = RC (constante de temps)\n\nSi U₀ = 0 (charge) : u_C(t) = E(1 − e^(−t/τ))\nSi charge → décharge : u_C(t) = U₀·e^(−t/τ)' },
            { id:'F-RC1', type:'formule', nom:'Intensité du courant',
              enonce:'Charge : i(t) = (E/R)·e^(−t/τ)\nDécharge : i(t) = −(U₀/R)·e^(−t/τ)\n\nÀ t=0 : i(0) = E/R (maximum)\nÀ t→∞ : i→0 (condensateur bloqué en DC)' },
          ],
          exercices:[
            { id:'EX-RC1', niveau:'Intermédiaire', titre:'Équation et constante τ',
              enonce:'Circuit RC : E=9V, R=2kΩ, C=50μF, condensateur initialement déchargé. Écrire u_C(t) et calculer τ.',
              correction:'τ = RC = 2000×50×10⁻⁶ = 0,1 s\nu_C(t) = 9(1−e^(−t/0,1)) = 9(1−e^(−10t)) V' },
            { id:'EX-RC2', niveau:'Avancé', titre:'Lecture graphique',
              enonce:'Sur la courbe u_C(t), identifier τ et en déduire R si C=220μF.',
              correction:'τ se lit à u_C = 0,63×E sur la courbe.\nτ = RC → R = τ/C = τ/(220×10⁻⁶)' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.3 — BOBINE & DIPÔLE RL (Physique T1)
// ═══════════════════════════════════════════════════════════════════
'bobine-rl-info': {
  id:'bobine-rl-info', emoji:'🌀', badge:'Physique T1', color:'#4f6ef7',
  titre:'Bobine & Dipôle RL',
  desc:'Bobine : courant induit, loi de Lenz, auto-induction, énergie magnétique. Dipôle RL : équation différentielle, constante de temps.',
  souschapitres:[
    {
      id:'sc-bobine', titre:'Bobine — Auto-induction',
      notions:['Flux Φ=Li','e_L=−L·di/dt','Loi de Lenz','E_L=½LI²'],
      blocs:[
        {
          notion:'🌀 Auto-induction de la bobine',
          theoremes:[
            { id:'D-RL1', type:'def', nom:'Inductance et f.é.m. d\'auto-induction',
              enonce:'Une bobine d\'inductance L (en Henry) s\'oppose aux variations de courant :\ne_L = −L·di/dt\n\nLoi de Lenz : le courant induit s\'oppose à la cause qui lui a donné naissance.\n\nÉnergie magnétique stockée : E_m = ½·L·i²' },
            { id:'F-RL1', type:'formule', nom:'Énergie magnétique',
              enonce:'E_m = ½·L·I²\n\nL en Henry (H), I en Ampères (A), E_m en Joules (J).\n\nAnalogue à E_c = ½mv² en mécanique.' },
          ],
          exercices:[
            { id:'EX-RL1', niveau:'Facile', titre:'Énergie magnétique',
              enonce:'Bobine L=0,5H parcourue par I=2A. Calculer l\'énergie stockée.',
              correction:'E_m = ½×0,5×2² = ½×0,5×4 = 1 J' },
          ]
        },
        {
          notion:'📐 Équation différentielle RL',
          theoremes:[
            { id:'T-RL2', type:'thm', nom:'Dipôle RL — réponse transitoire',
              enonce:'Circuit RL série alimenté par générateur E :\n\nL·di/dt + Ri = E\nSolution : i(t) = (E/R)(1 − e^(−t/τ)) avec τ = L/R\n\nRupture du courant (ouverture) :\ni(t) = I₀·e^(−t/τ)\n→ f.é.m. élevée e_L = −L·di/dt (arc électrique possible)' },
            { id:'F-RL2', type:'formule', nom:'Constante de temps RL',
              enonce:'τ = L/R (en secondes)\n\nÀ t=τ : i = 0,63×(E/R)\nRégime permanent : i_∞ = E/R\n(bobine = fil en DC)' },
          ],
          exercices:[
            { id:'EX-RL2', niveau:'Intermédiaire', titre:'Réponse RL',
              enonce:'L=0,2H, R=100Ω, E=10V, i(0)=0. Écrire i(t) et calculer τ.',
              correction:'τ = L/R = 0,2/100 = 2×10⁻³ s = 2 ms\ni(t) = (10/100)(1−e^(−t/0,002)) = 0,1(1−e^(−500t)) A' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.4 — OSCILLATIONS ÉLECTRIQUES LIBRES (Physique T1-T2)
// ═══════════════════════════════════════════════════════════════════
'oscillations-lc-info': {
  id:'oscillations-lc-info', emoji:'〰️', badge:'Physique T2', color:'#06b6d4',
  titre:'Oscillations électriques libres',
  desc:'Oscillations libres amorties (RLC) et non amorties (LC). Régimes, énergie, équations différentielles.',
  souschapitres:[
    {
      id:'sc-lc-nonamorties', titre:'Oscillations libres non amorties — Circuit LC',
      notions:['T₀=2π√(LC)','Solution sinusoïdale','Échanges Ec↔Em','Fréquence propre f₀'],
      blocs:[
        {
          notion:'〰️ Circuit LC idéal',
          theoremes:[
            { id:'T-LC1', type:'thm', nom:'Oscillations libres non amorties',
              enonce:'Dans un circuit LC sans résistance :\nL·d²q/dt² + q/C = 0\n\nSolution : q(t) = Q_max·cos(ω₀t + φ)\n\nPériode propre : T₀ = 2π√(LC)\nPulsation : ω₀ = 1/√(LC)\nFréquence : f₀ = 1/(2π√(LC))\n\nÉchanges d\'énergie : Ec + Em = cte (énergie totale conservée)' },
            { id:'F-LC1', type:'formule', nom:'Période et fréquence propres',
              enonce:'T₀ = 2π√(LC)\nf₀ = 1/(2π√(LC))\nω₀ = 1/√(LC)\n\nL en Henry, C en Farads, T₀ en secondes.' },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:'Calcul de T₀',
              enonce:'L=10mH, C=100nF. Calculer T₀ et f₀.',
              correction:'T₀ = 2π√(10⁻²×10⁻⁷) = 2π×10⁻⁴·√10 ≈ 2π×3,16×10⁻⁴ ≈ 1,99×10⁻³ s\nf₀ = 1/T₀ ≈ 503 Hz' },
          ]
        }
      ]
    },
    {
      id:'sc-rlc-amorties', titre:'Oscillations libres amorties — Circuit RLC',
      notions:['Régime pseudo-périodique','Régime critique','Régime apériodique','Amortissement'],
      blocs:[
        {
          notion:'📉 Amortissement dans RLC',
          theoremes:[
            { id:'T-RLC1', type:'thm', nom:'Équation différentielle RLC',
              enonce:'L·d²q/dt² + R·dq/dt + q/C = 0\n\nRégimes selon R :\n• R < R_c (pseudo-périodique) : oscillations amorties, T_ps ≈ T₀\n• R = R_c = 2√(L/C) (critique) : retour rapide sans oscillation\n• R > R_c (apériodique) : retour lent sans oscillation\n\nL\'énergie est dissipée par effet Joule dans R.' },
          ],
          exercices:[
            { id:'EX-RLC1', niveau:'Intermédiaire', titre:'Résistance critique',
              enonce:'L=50mH, C=20μF. Calculer la résistance critique R_c.',
              correction:'R_c = 2√(L/C) = 2√(50×10⁻³/20×10⁻⁶) = 2√2500 = 2×50 = 100 Ω' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.5 — ONDES MÉCANIQUES (Physique T2)
// ═══════════════════════════════════════════════════════════════════
'ondes-mec-info': {
  id:'ondes-mec-info', emoji:'🌊', badge:'Physique T2', color:'#f59e0b',
  titre:'Ondes mécaniques progressives',
  desc:'Nature des ondes, célérité, retard temporel, longueur d\'onde. Programme Bac Tunisie Informatique.',
  souschapitres:[
    {
      id:'sc-ondes-nature', titre:'Nature et propagation des ondes',
      notions:['Ondes transversales/longitudinales','Célérité v','Retard τ=d/v'],
      blocs:[
        {
          notion:'🌊 Caractéristiques des ondes',
          theoremes:[
            { id:'D-ON1', type:'def', nom:'Onde mécanique progressive',
              enonce:'Une onde mécanique est la propagation d\'une perturbation dans un milieu matériel sans transport de matière.\n\n• Onde transversale : perturbation ⊥ direction de propagation (ex: corde)\n• Onde longitudinale : perturbation ∥ direction de propagation (ex: son)\n\nCélérité v : vitesse de propagation (m/s)\nRetard temporel : τ = d/v (avec d la distance)' },
            { id:'F-ON1', type:'formule', nom:'Longueur d\'onde',
              enonce:'λ = v·T = v/f\n\nλ : longueur d\'onde (m)\nv : célérité (m/s)\nT : période (s)\nf : fréquence (Hz)\n\nDéphasage : φ = 2π·d/λ = 2π·τ/T' },
          ],
          exercices:[
            { id:'EX-ON1', niveau:'Facile', titre:'Calcul de λ',
              enonce:'Une corde vibrante : f=440Hz, v=320m/s. Calculer λ.',
              correction:'λ = v/f = 320/440 ≈ 0,727 m' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.6 — ONDES ET OPTIQUE (Physique T2-T3)
// ═══════════════════════════════════════════════════════════════════
'ondes-optique-info': {
  id:'ondes-optique-info', emoji:'🌈', badge:'Physique T3', color:'#14b8a6',
  titre:'Ondes et optique',
  desc:'Diffraction, dispersion de la lumière, spectres atomiques. Programme Bac Tunisie Informatique.',
  souschapitres:[
    {
      id:'sc-diffraction', titre:'Diffraction',
      notions:['θ≈λ/a','Tache centrale','Limite de résolution'],
      blocs:[
        {
          notion:'🌀 Phénomène de diffraction',
          theoremes:[
            { id:'T-DIFF1', type:'thm', nom:'Diffraction par une fente',
              enonce:'La diffraction se produit quand λ ≈ a (taille de l\'obstacle).\n\nDemi-angle de la tache centrale : θ ≈ λ/a (en radians)\n\nLargeur de la tache centrale sur un écran (distance D) :\nL = 2λD/a\n\nCondition de diffraction notable : λ ≥ 0,1·a' },
          ],
          exercices:[
            { id:'EX-DIFF1', niveau:'Intermédiaire', titre:'Largeur de tache',
              enonce:'λ=600nm, a=0,1mm, D=2m. Calculer L.',
              correction:'L = 2λD/a = 2×600×10⁻⁹×2/(0,1×10⁻³) = 2400×10⁻⁹/10⁻⁴ = 0,024 m = 2,4 cm' },
          ]
        }
      ]
    },
    {
      id:'sc-spectres', titre:'Dispersion et spectres atomiques',
      notions:['Indice n(λ)','Dispersion prismatique','Spectre d\'émission/absorption'],
      blocs:[
        {
          notion:'🔬 Spectres atomiques',
          theoremes:[
            { id:'D-SPEC1', type:'def', nom:'Spectres atomiques',
              enonce:'Spectre d\'émission : raies brillantes sur fond noir\n→ atome passe d\'un niveau excité à un niveau inférieur\n→ émet un photon d\'énergie : E = hf = hc/λ\n\nSpectre d\'absorption : raies sombres sur fond continu\n→ atome absorbe un photon et passe à un niveau supérieur\n\nApplication : identification des éléments chimiques (astrophysique, analyse chimique).' },
          ],
          exercices:[
            { id:'EX-SPEC1', niveau:'Facile', titre:'Identification par spectre',
              enonce:'Un spectre montre des raies à 589nm et 590nm. À quel élément appartiennent-elles ?',
              correction:'Ces raies jaunes caractéristiques appartiennent au sodium (Na) — doublet D.' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.7 — PHYSIQUE NUCLÉAIRE (Physique T3)
// ═══════════════════════════════════════════════════════════════════
'nucleaire-info': {
  id:'nucleaire-info', emoji:'☢️', badge:'Physique T3', color:'#ef4444',
  titre:'Physique nucléaire',
  desc:'Noyau atomique, radioactivité α β γ, loi de décroissance, fission et fusion nucléaires.',
  souschapitres:[
    {
      id:'sc-radioactivite', titre:'Radioactivité',
      notions:['Notation ᴬ_ZX','α, β⁻, β⁺, γ','N(t)=N₀e^(−λt)','t₁/₂=ln2/λ'],
      blocs:[
        {
          notion:'☢️ Types de désintégrations',
          theoremes:[
            { id:'D-NUC1', type:'def', nom:'Radioactivité et désintégrations',
              enonce:'Radioactivité α : émission ⁴₂He → A diminue de 4, Z de 2\nRadioactivité β⁻ : émission e⁻ (n→p+e⁻+ν̄) → Z augmente de 1\nRadioactivité β⁺ : émission e⁺ (p→n+e⁺+ν) → Z diminue de 1\nRayonnement γ : émission de photons → pas de changement A ni Z\n\nLois de conservation : nombre de masse A et charge Z conservés.' },
            { id:'F-NUC1', type:'formule', nom:'Loi de décroissance radioactive',
              enonce:'N(t) = N₀·e^(−λt)\n\nDemi-vie : t₁/₂ = ln2/λ = 0,693/λ\nActivité : A(t) = λ·N(t) = A₀·e^(−λt)\n\nN₀ : nombre initial de noyaux\nλ : constante radioactive (s⁻¹)' },
          ],
          exercices:[
            { id:'EX-NUC1', niveau:'Facile', titre:'Demi-vie',
              enonce:'λ = 0,00693 s⁻¹. Calculer t₁/₂.',
              correction:'t₁/₂ = ln2/λ = 0,693/0,00693 = 100 s' },
            { id:'EX-NUC2', niveau:'Intermédiaire', titre:'Décroissance',
              enonce:'N₀ = 10⁸ noyaux, t₁/₂ = 5 ans. Combien reste-t-il après 15 ans ?',
              correction:'15 ans = 3×t₁/₂ → N = N₀/2³ = 10⁸/8 = 1,25×10⁷ noyaux' },
          ]
        }
      ]
    },
    {
      id:'sc-fission-fusion', titre:'Fission et Fusion nucléaires',
      notions:['Énergie E=Δm·c²','Réacteur nucléaire','Bombe H et réacteur à fusion'],
      blocs:[
        {
          notion:'💥 Réactions nucléaires — Énergie',
          theoremes:[
            { id:'F-NUC2', type:'formule', nom:'Relation masse-énergie',
              enonce:'E = Δm·c²\n\nΔm = défaut de masse = masse réactifs − masse produits\nc = 3×10⁸ m/s (célérité de la lumière)\n\nFission : noyau lourd → 2 noyaux légers + neutrons + énergie\n(Ex: ²³⁵U + n → ⁹²Kr + ¹⁴¹Ba + 3n)\n\nFusion : 2 noyaux légers → noyau plus lourd + énergie\n(Ex: ²H + ³H → ⁴He + n)' },
          ],
          exercices:[
            { id:'EX-NUC3', niveau:'Avancé', titre:'Énergie de fission',
              enonce:'Dans la fission de l\'uranium, Δm = 3,2×10⁻²⁸ kg. Calculer E.',
              correction:'E = Δm·c² = 3,2×10⁻²⁸ × (3×10⁸)² = 3,2×10⁻²⁸ × 9×10¹⁶ = 2,88×10⁻¹¹ J' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.1 CHIMIE — ACIDES-BASES (Chimie T1)
// ═══════════════════════════════════════════════════════════════════
'acide-base-info': {
  id:'acide-base-info', emoji:'🧪', badge:'Chimie T1', color:'#10b981',
  titre:'Acides-bases',
  desc:'Couples acide/base, pH, Ka, pKa, dosages et titrages acide-base.',
  souschapitres:[
    {
      id:'sc-ph-ka', titre:'pH, Ka et pKa',
      notions:['pH=−log[H₃O⁺]','Ka et pKa','Acides/bases faibles et forts'],
      blocs:[
        {
          notion:'🧪 Théorie acide-base (Brønsted)',
          theoremes:[
            { id:'D-AB1', type:'def', nom:'Couple acide/base',
              enonce:'Un acide est un donneur de proton H⁺.\nUne base est un accepteur de proton H⁺.\n\nCouple conjugué AH/A⁻ : AH + H₂O ⇌ A⁻ + H₃O⁺\n\nConstante d\'acidité : Ka = [A⁻][H₃O⁺]/[AH]\npKa = −log(Ka)\n\nÀ pH = pKa : [AH] = [A⁻] (demi-neutralisation)' },
            { id:'F-AB1', type:'formule', nom:'Calcul du pH',
              enonce:'Acide fort (concentration C) : pH = −log(C)\nBase forte (concentration C) : pH = 14 + log(C)\nAcide faible : pH ≈ ½(pKa − log C)\nBase faible : pH ≈ 7 + ½(pKa + log C)' },
          ],
          exercices:[
            { id:'EX-AB1', niveau:'Facile', titre:'pH acide fort',
              enonce:'Calculer le pH d\'une solution HCl à C=0,01 mol/L.',
              correction:'HCl fort : [H₃O⁺] = C = 0,01 = 10⁻² mol/L\npH = −log(10⁻²) = 2' },
          ]
        }
      ]
    },
    {
      id:'sc-dosage-ab', titre:'Dosages et titrages',
      notions:['Équivalence','Courbe de titrage pH-métrique','Indicateurs colorés'],
      blocs:[
        {
          notion:'⚗️ Titrage acide-base',
          theoremes:[
            { id:'T-AB2', type:'thm', nom:'Équivalence lors d\'un dosage',
              enonce:'Au point d\'équivalence : n(acide) = n(base) titrant\n\nC_A × V_A = C_B × V_B (monoacide/monobase)\n\nDétection :\n• pH-mètre : saut de pH brutal autour de l\'équivalence\n• Indicateur coloré : zone de virage autour du point équivalent\n• Conductimètre : changement de pente de la courbe σ=f(V)' },
          ],
          exercices:[
            { id:'EX-AB2', niveau:'Intermédiaire', titre:'Dosage',
              enonce:'On titre V_A=20mL d\'acide par NaOH à C_B=0,1mol/L. Équivalence à V_B=25mL. Calculer C_A.',
              correction:'C_A×20 = 0,1×25\nC_A = 2,5/20 = 0,125 mol/L' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.2 CHIMIE — CINÉTIQUE CHIMIQUE (Chimie T1-T2)
// ═══════════════════════════════════════════════════════════════════
'cinetique-info': {
  id:'cinetique-info', emoji:'⏱️', badge:'Chimie T2', color:'#f59e0b',
  titre:'Cinétique chimique',
  desc:'Vitesse de réaction, facteurs influents (concentration, température, catalyseur), suivi temporel.',
  souschapitres:[
    {
      id:'sc-vitesse', titre:'Vitesse de réaction',
      notions:['v=−d[A]/dt','Facteurs cinétiques','Ordre de réaction','Suivi temporel'],
      blocs:[
        {
          notion:'⏱️ Définition et mesure de la vitesse',
          theoremes:[
            { id:'D-CIN1', type:'def', nom:'Vitesse volumique de réaction',
              enonce:'Pour aA + bB → cC + dD :\nv = −(1/a)·d[A]/dt = −(1/b)·d[B]/dt = (1/c)·d[C]/dt\n\nMéthodes de suivi temporel :\n• Spectrophotométrie (loi de Beer-Lambert : A = ε·l·c)\n• Conductimétrie (σ proportionnel aux ions)\n• pH-métrie (pour réactions acide-base)\n• Manométrie (gaz produit)' },
            { id:'T-CIN2', type:'thm', nom:'Facteurs influençant la vitesse',
              enonce:'1. Concentration : v augmente avec [réactif]\n2. Température : v double environ tous les 10°C (loi d\'Arrhenius : k = A·e^(−Ea/RT))\n3. Catalyseur homogène : même phase que les réactifs\n   Catalyseur hétérogène : phase différente (surface)\n   Catalyseur enzymatique : enzyme biologique\n4. Surface de contact (solides)\n5. Solvant (polarité, viscosité)' },
          ],
          exercices:[
            { id:'EX-CIN1', niveau:'Intermédiaire', titre:'Vitesse et temps de demi-réaction',
              enonce:'Réaction d\'ordre 1 : [A](t) = [A]₀·e^(−kt) avec k=0,05s⁻¹. Calculer t₁/₂.',
              correction:'t₁/₂ = ln2/k = 0,693/0,05 = 13,9 s' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.3 CHIMIE — TRANSFORMATIONS CHIMIQUES (Chimie T2)
// ═══════════════════════════════════════════════════════════════════
'transformations-info': {
  id:'transformations-info', emoji:'🔄', badge:'Chimie T2', color:'#06b6d4',
  titre:'Transformations chimiques',
  desc:'Estérification, formation d\'amides, réversibilité, rendement.',
  souschapitres:[
    {
      id:'sc-esterification', titre:'Estérification et Transestérification',
      notions:['Acide + alcool → Ester + eau','Équilibre','Rendement','Excès de réactif'],
      blocs:[
        {
          notion:'🧪 Réaction d\'estérification',
          theoremes:[
            { id:'T-EST1', type:'thm', nom:'Estérification',
              enonce:'Acide carboxylique + alcool ⇌ Ester + eau\nR-COOH + R\'OH ⇌ R-COO-R\' + H₂O\n(catalysé par H⁺)\n\nRéaction limitée et lente :\n• Taux de conversion τ < 1 (typiquement ≈ 0,67 pour un mélange équimolaire)\n• Améliorer le rendement : excès d\'un réactif, distillation de l\'eau produite\n\nHydrolyse : réaction inverse (ester + eau → acide + alcool)' },
            { id:'D-EST2', type:'def', nom:'Formation d\'amides',
              enonce:'Acide carboxylique + amine → Amide + eau\nR-COOH + H₂N-R\' → R-CO-NH-R\' + H₂O\n\nLiaison amide : -CO-NH- (présente dans les protéines et les polyamides/nylon)\nPolycondensation : répétition de cette réaction pour former des polymères.' },
          ],
          exercices:[
            { id:'EX-EST1', niveau:'Facile', titre:'Rendement d\'estérification',
              enonce:'Mélange équimolaire donne τ=0,67. Pour avoir τ=0,9, que faire ?',
              correction:'Utiliser un excès d\'un réactif (acide ou alcool) ou éliminer l\'eau au fur et à mesure par distillation.' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.4 CHIMIE — ÉQUILIBRE CHIMIQUE (Chimie T2-T3)
// ═══════════════════════════════════════════════════════════════════
'equilibre-chimique-info': {
  id:'equilibre-chimique-info', emoji:'⚖️', badge:'Chimie T3', color:'#8b5cf6',
  titre:'Équilibre chimique',
  desc:'Loi de Le Chatelier, constante d\'équilibre Kéq, quotient de réaction Qr.',
  souschapitres:[
    {
      id:'sc-kequilibre', titre:'Constante d\'équilibre et critère d\'évolution',
      notions:['Quotient Qr','Constante Kéq','Qr<K → direct','τ_f et x_éq'],
      blocs:[
        {
          notion:'⚖️ État d\'équilibre',
          theoremes:[
            { id:'T-EQ1', type:'thm', nom:'Constante d\'équilibre',
              enonce:'Pour aA + bB ⇌ cC + dD :\nQr = [C]^c·[D]^d / ([A]^a·[B]^b)\n\nÀ l\'équilibre : Qr = Kéq = constante (à T fixée)\n\nCritère d\'évolution :\n• Qr < Kéq → réaction dans le sens direct →\n• Qr > Kéq → réaction dans le sens inverse ←\n• Qr = Kéq → état d\'équilibre (pas d\'évolution)' },
            { id:'T-EQ2', type:'thm', nom:'Loi de Le Chatelier (modération)',
              enonce:'Quand on perturbe un système à l\'équilibre, il évolue dans le sens qui s\'oppose à la perturbation :\n\n• Ajout de réactif → sens direct (consomme le réactif)\n• Augmentation de T → sens endothermique\n• Augmentation de pression → sens qui diminue le nb de moles de gaz\n\nApplications : synthèse de l\'ammoniac (Haber), de l\'acide sulfurique (Contact).' },
          ],
          exercices:[
            { id:'EX-EQ1', niveau:'Intermédiaire', titre:'Critère d\'évolution',
              enonce:'Kéq = 4. On prépare un mélange avec [A]=[B]=1mol/L et [C]=[D]=0,5mol/L. Dans quel sens évolue la réaction A+B⇌C+D ?',
              correction:'Qr = [C][D]/([A][B]) = 0,5×0,5/(1×1) = 0,25\nQr=0,25 < Kéq=4 → sens direct →' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.5 CHIMIE — ÉLECTROCHIMIE (Chimie T3)
// ═══════════════════════════════════════════════════════════════════
'electrochimie-info': {
  id:'electrochimie-info', emoji:'🔋', badge:'Chimie T3', color:'#f97316',
  titre:'Électrochimie',
  desc:'Piles électrochimiques, électrolyse, loi de Faraday, applications industrielles.',
  souschapitres:[
    {
      id:'sc-piles', titre:'Piles électrochimiques',
      notions:['Couples rédox','f.e.m. de pile','Cathode/Anode','Pile Daniell'],
      blocs:[
        {
          notion:'🔋 Fonctionnement d\'une pile',
          theoremes:[
            { id:'D-ELEC1', type:'def', nom:'Pile électrochimique',
              enonce:'Une pile convertit l\'énergie chimique en énergie électrique via des réactions rédox spontanées.\n\nAnomde (−) : oxydation (perd des e⁻)\nCathode (+) : réduction (gagne des e⁻)\nLes électrons circulent de l\'anode vers la cathode dans le circuit extérieur.\n\nPile Daniell : Zn|ZnSO₄||CuSO₄|Cu\nAnomde : Zn → Zn²⁺ + 2e⁻\nCathode : Cu²⁺ + 2e⁻ → Cu\nf.e.m. ≈ 1,1 V' },
          ],
          exercices:[
            { id:'EX-ELEC1', niveau:'Facile', titre:'Identification des électrodes',
              enonce:'Pile Fe|Fe²⁺||Ag⁺|Ag. Identifier l\'anode et la cathode.',
              correction:'E°(Ag⁺/Ag) = +0,80V > E°(Fe²⁺/Fe) = −0,44V\nAnomde : Fe → Fe²⁺ + 2e⁻ (oxydation)\nCathode : Ag⁺ + e⁻ → Ag (réduction)' },
          ]
        }
      ]
    },
    {
      id:'sc-electrolyse', titre:'Électrolyse et loi de Faraday',
      notions:['Électrolyse','m=MIt/nF','Quantité d\'électricité Q=It'],
      blocs:[
        {
          notion:'⚡ Électrolyse',
          theoremes:[
            { id:'T-ELEC2', type:'thm', nom:'Loi de Faraday',
              enonce:'L\'électrolyse est une transformation chimique forcée par un courant électrique.\n\nAnomde : oxydation (reliée au + du générateur)\nCathode : réduction (reliée au − du générateur)\n\nMasse déposée : m = M·I·t/(n·F)\navec F = 96500 C/mol (Faraday)\n      n = nombre d\'électrons échangés\n      I = intensité (A), t = durée (s)' },
          ],
          exercices:[
            { id:'EX-ELEC2', niveau:'Intermédiaire', titre:'Loi de Faraday',
              enonce:'Électrolyse CuSO₄ : I=2A, t=30min. Masse de cuivre déposée ? (M_Cu=64g/mol, n=2)',
              correction:'t = 30×60 = 1800 s\nm = 64×2×1800/(2×96500) = 230400/193000 ≈ 1,19 g' },
          ]
        }
      ]
    }
  ]
},

// ═══════════════════════════════════════════════════════════════════
// CH.6 CHIMIE — TABLEAU D'AVANCEMENT (Chimie T1)
// ═══════════════════════════════════════════════════════════════════
'avancement-info': {
  id:'avancement-info', emoji:'📊', badge:'Chimie T1', color:'#ec4899',
  titre:"Tableau d\'avancement",
  desc:"Avancement de réaction, réactif limitant, taux de conversion τ, bilan matière.",
  souschapitres:[
    {
      id:'sc-tableau-avancement', titre:"Tableau d\'avancement et réactif limitant",
      notions:['Variable x','Réactif limitant','x_max','τ = x_f/x_max'],
      blocs:[
        {
          notion:"📊 Construction du tableau d\'avancement",
          theoremes:[
            { id:'T-AV1', type:'thm', nom:"Tableau d\'avancement",
              enonce:"Pour aA + bB → cC + dD\n\nÉtat initial : n_A(0), n_B(0), n_C(0)=0, n_D(0)=0\nÉtat x : n_A(0)−ax, n_B(0)−bx, cx, dx\nÉtat final : x = x_max (réactif limitant épuisé)\n\nRéactif limitant : celui qui s\'épuise en premier\n→ n_A(0)/a < n_B(0)/b : A est limitant, x_max = n_A(0)/a" },
            { id:'F-AV1', type:'formule', nom:"Taux de conversion",
              enonce:"τ = x_f / x_max\n\n• Réaction totale : τ = 1 (réactif limitant totalement consommé)\n• Réaction limitée : τ < 1 (équilibre avant épuisement)\n\nRendement chimique : η = x_f/x_théorique (dans les synthèses)" },
          ],
          exercices:[
            { id:'EX-AV1', niveau:'Facile', titre:"Tableau d\'avancement",
              enonce:"2H₂ + O₂ → 2H₂O. Mélanges initiaux : n(H₂)=4mol, n(O₂)=1,5mol. Trouver le réactif limitant et x_max.",
              correction:"n(H₂)/2 = 4/2 = 2 ; n(O₂)/1 = 1,5/1 = 1,5\n1,5 < 2 → O₂ est limitant, x_max = 1,5 mol" },
            { id:'EX-AV2', niveau:'Intermédiaire', titre:"Taux de conversion",
              enonce:"Estérification équimolaire : x_max = 1 mol, x_f = 0,67 mol. Calculer τ.",
              correction:"τ = x_f/x_max = 0,67/1 = 0,67 → 67% de conversion" },
          ]
        }
      ]
    }
  ]
},

} // fin ALL_CHAPTERS

 // fin ALL_CHAPTERS

// ─── Composant principal ─────────────────────────────────────────────
export default function PhysiqueInformatiqueSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  const chapter = ALL_CHAPTERS[slug]
  if (!chapter) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop:120, paddingBottom:80 }}>
          <div className="container" style={{ textAlign:'center' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
            <h1 style={{ fontSize:24, marginBottom:12 }}>Chapitre introuvable</h1>
            <p style={{ color:'var(--muted)', marginBottom:24 }}>Le chapitre « {slug} » n'existe pas encore.</p>
            <Link href="/bac/physique/informatique" className="btn btn-primary">← Retour Informatique</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const secColor = chapter.color
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:32, paddingBottom:80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--muted)', marginBottom:24, flexWrap:'wrap' }}>
            <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link>
            <span>›</span>
            <Link href="/bac/physique/informatique" style={{ color:'var(--muted)', textDecoration:'none' }}>Informatique</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.titre}</span>
          </div>

          {/* LAYOUT : Contenu + Sidebar */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:24, alignItems:'start' }}>

            {/* ── CONTENU PRINCIPAL ── */}
            <div>
              {/* Header */}
              <div style={{ background:`${secColor}10`, border:`1px solid ${secColor}28`, borderRadius:18, padding:'24px 28px', marginBottom:24 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap', marginBottom:10 }}>
                  <span style={{ fontSize:36 }}>{chapter.emoji}</span>
                  <div>
                    <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', marginBottom:4 }}>
                      <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:secColor, fontWeight:700, background:`${secColor}18`, padding:'2px 8px', borderRadius:6 }}>
                        {chapter.badge} · Tunisie Maths
                      </span>
                    </div>
                    <h1 style={{ fontSize:'clamp(18px,2.5vw,26px)', fontWeight:900, color:'var(--text)', margin:0 }}>{chapter.titre}</h1>
                  </div>
                </div>
                <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7, margin:'10px 0 14px' }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' Bac Tunisie Informatique')}`} className="btn btn-primary" style={{ fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ fontSize:12 }}>🧮 Solveur PC</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ fontSize:12 }}>🎯 Simulation Bac</Link>
                </div>
              </div>

              {/* Légende des types */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
                {Object.entries(C).map(([type,color]) => (
                  <span key={type} style={{ fontSize:10, padding:'3px 10px', borderRadius:20, background:`${color}15`, color, border:`1px solid ${color}30`, fontWeight:700 }}>
                    {L[type]}
                  </span>
                ))}
              </div>

              {/* Sous-chapitres */}
              {chapter.souschapitres.map((sc, sci) => (
                <div key={sc.id} style={{ marginBottom:20 }}>
                  <button
                    onClick={() => setOpenSc(openSc===sc.id ? null : sc.id)}
                    style={{ width:'100%', textAlign:'left', background:`${secColor}10`, border:`1px solid ${secColor}28`, borderRadius:14, padding:'14px 18px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'inherit' }}>
                    <div>
                      <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:secColor, fontWeight:700, marginBottom:3 }}>
                        PARTIE {sci+1}
                      </div>
                      <div style={{ fontSize:15, fontWeight:800, color:'var(--text)' }}>{sc.titre}</div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:6 }}>
                        {sc.notions.map(n => (
                          <span key={n} style={{ fontSize:9, padding:'2px 7px', borderRadius:8, background:`${secColor}12`, color:'var(--text2)', border:`1px solid ${secColor}18` }}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ color:secColor, fontSize:18, flexShrink:0 }}>{openSc===sc.id ? '▲' : '▼'}</span>
                  </button>

                  {(openSc===sc.id || sci===0) && (
                    <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:16 }}>
                      {sc.blocs.map(bloc => (
                        <div key={bloc.notion} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden' }}>
                          {/* Notion header */}
                          <div style={{ background:`${secColor}0a`, borderBottom:'1px solid var(--border)', padding:'10px 18px' }}>
                            <div style={{ fontSize:13, fontWeight:700, color:secColor }}>{bloc.notion}</div>
                          </div>

                          <div style={{ padding:'16px 18px', display:'flex', flexDirection:'column', gap:12 }}>
                            {/* Théorèmes */}
                            {bloc.theoremes.map(thm => (
                              <div key={thm.id} style={{ borderRadius:11, border:`1px solid ${C[thm.type] ?? secColor}30`, overflow:'hidden' }}>
                                <div style={{ background:`${C[thm.type] ?? secColor}12`, borderBottom:`1px solid ${C[thm.type] ?? secColor}20`, padding:'8px 14px', display:'flex', gap:10, alignItems:'center' }}>
                                  <span style={{ fontSize:9, padding:'2px 8px', borderRadius:12, background:`${C[thm.type] ?? secColor}20`, color:C[thm.type] ?? secColor, fontWeight:800 }}>
                                    {L[thm.type] ?? thm.type}
                                  </span>
                                  <span style={{ fontSize:12, fontWeight:700, color:'var(--text)' }}>{thm.nom}</span>
                                  <span style={{ marginLeft:'auto', fontSize:9, fontFamily:'var(--font-mono)', color:'var(--muted)' }}>{thm.id}</span>
                                </div>
                                <div style={{ padding:'12px 16px', fontSize:12, color:'var(--text2)', lineHeight:1.75, whiteSpace:'pre-line', fontFamily: thm.type==='formule'?'var(--font-mono)':'inherit' }}>
                                  {thm.enonce}
                                </div>
                              </div>
                            ))}

                            {/* Exercices */}
                            {bloc.exercices.length > 0 && (
                              <div>
                                <div style={{ fontSize:11, fontWeight:700, color:'var(--muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.07em' }}>📝 Exercices</div>
                                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                                  {bloc.exercices.map(ex => (
                                    <div key={ex.id} style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
                                      <div style={{ padding:'10px 16px', display:'flex', gap:10, alignItems:'flex-start' }}>
                                        <div style={{ flexShrink:0 }}>
                                          <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--muted)' }}>{ex.id}</span>
                                          <div style={{ marginTop:2 }}>
                                            <span style={{ fontSize:9, padding:'2px 7px', borderRadius:20, fontWeight:700,
                                              background: ex.niveau==='Facile'?'rgba(16,185,129,0.15)':ex.niveau==='Difficile'?'rgba(239,68,68,0.15)':'rgba(245,158,11,0.15)',
                                              color: ex.niveau==='Facile'?'#34d399':ex.niveau==='Difficile'?'#f87171':'#fbbf24'
                                            }}>{ex.niveau}</span>
                                          </div>
                                        </div>
                                        <div style={{ flex:1 }}>
                                          <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{ex.titre}</div>
                                          <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.65 }}>{ex.enonce}</div>
                                        </div>
                                      </div>
                                      <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>
                                        <Link href={`/solve?q=${encodeURIComponent('Bac Tunisie PC Informatique — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                          🧮 Résoudre avec IA
                                        </Link>
                                        <button onClick={() => setOpenEx(openEx===ex.id?null:ex.id)}
                                          style={{ fontSize:11, padding:'5px 12px', borderRadius:7, border:'1px solid var(--border)', background:'transparent', color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Navigation prev/next */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac/physique/informatique/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{prevSlug ? (TITRES_NAV[prevSlug] || prevSlug) : ''}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/physique/informatique/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{nextSlug ? (TITRES_NAV[nextSlug] || nextSlug) : ''}</div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <aside style={{ position:'sticky', top:88 }}>

              {/* Navigation chapitres */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  💻 Informatique · {NAV_ORDER.length} chapitres
                </div>
                {/* Physique */}
                <div style={{ padding:'6px 14px 3px', fontSize:9, fontWeight:800, color:'#4f6ef7', textTransform:'uppercase', letterSpacing:'0.1em' }}>⚛️ Physique</div>
                {NAV_ORDER.filter(s => !['acide-base-info', 'cinetique-info', 'transformations-info', 'equilibre-chimique-info', 'electrochimie-info', 'avancement-info'].includes(s)).map((s,i) => (
                  <Link key={s} href={`/bac/physique/informatique/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'8px 14px', borderBottom:'1px solid var(--border)',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:10, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{(TITRES_NAV[s]||s).replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
                {/* Chimie */}
                <div style={{ padding:'6px 14px 3px', fontSize:9, fontWeight:800, color:'#10b981', textTransform:'uppercase', letterSpacing:'0.1em' }}>🧪 Chimie</div>
                {['acide-base-info', 'cinetique-info', 'transformations-info', 'equilibre-chimique-info', 'electrochimie-info', 'avancement-info'].map((s,i) => (
                  <Link key={s} href={`/bac/physique/informatique/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'8px 14px', borderBottom:i<4?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:10, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{(TITRES_NAV[s]||s).replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Autres sections Physique Tunisie */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'12px', marginBottom:12 }}>
                <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>🇹🇳 Autres sections</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {[
                    { href:'/bac/physique/maths', label:'📐 Section Maths', color:'#f59e0b' },
                    { href:'/bac/physique/sciences-tech', label:'⚙️ Sciences Tech.', color:'#10b981' },
                    { href:'/bac/physique/informatique', label:'💻 Informatique', color:'#8b5cf6' },
                    { href:'/bac/physique/eco-gestion', label:'📊 Éco-Gestion', color:'#f43f5e' },
                  ].map(s => (
                    <Link key={s.href} href={s.href} style={{ fontSize:11, padding:'6px 10px', borderRadius:8, background:`${s.color}10`, color:s.color, fontWeight:600, textDecoration:'none', border:`1px solid ${s.color}20` }}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Maths Tunisie */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'12px', marginBottom:12 }}>
                <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>📐 Maths — Bac Tunisie</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {[
                    { href:'/bac/maths/maths',        label:'📐 Section Maths',       color:'#4f6ef7' },
                    { href:'/bac/maths/sciences-exp',  label:'🔬 Sciences Exp.',        color:'#06d6a0' },
                    { href:'/bac/maths/sciences-tech', label:'⚙️ Sciences Tech.',       color:'#f59e0b' },
                    { href:'/bac/maths/eco-gestion',   label:'💹 Éco-Gestion',          color:'#10b981' },
                    { href:'/bac/maths/informatique',  label:'💻 Informatique',         color:'#8b5cf6' },
                  ].map(s => (
                    <Link key={s.href} href={s.href} style={{ fontSize:11, padding:'6px 10px', borderRadius:8, background:`${s.color}10`, color:s.color, fontWeight:600, textDecoration:'none', border:`1px solid ${s.color}20` }}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' Bac Tunisie Informatique')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧮 Solveur PC</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac/physique/informatique" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Informatique</Link>
                  <Link href="/bac/physique" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Physique-Chimie</Link>
                  <Link href="/bac" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🇹🇳 Bac Tunisie</Link>
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