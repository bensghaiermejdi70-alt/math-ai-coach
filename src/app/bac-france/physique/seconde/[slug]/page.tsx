'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE SECONDE GÉNÉRALE & TECHNOLOGIQUE / [SLUG]
// Route : /bac-france/physique/seconde/[slug]
// Programme officiel · Enseignement commun · 3h/semaine
// 4 sections · 9 chapitres
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899', loi:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', loi:'Loi' }

const NAV_ORDER = [
  'atomes-noyau','transformations-chimiques',
  'description-mouvement','forces-interactions',
  'ondes-mecaniques-2','ondes-lumineuses','signaux-electriques-2',
  'formes-energie','bilans-energetiques-2',
]

const TITRES_NAV: Record<string,string> = {
  'atomes-noyau':             'CH 01 — Atomes, noyaux & Tableau périodique',
  'transformations-chimiques':'CH 02 — Transformations chimiques',
  'description-mouvement':    'CH 03 — Description du mouvement',
  'forces-interactions':      'CH 04 — Forces & Interactions',
  'ondes-mecaniques-2':       'CH 05 — Ondes mécaniques & sonores',
  'ondes-lumineuses':         'CH 06 — Ondes lumineuses & Lentilles',
  'signaux-electriques-2':    'CH 07 — Signaux électriques & Circuits',
  'formes-energie':           "CH 08 — Formes d'énergie",
  'bilans-energetiques-2':    "CH 09 — Bilans & Conversions d'énergie",
}

const SEC_COLORS: Record<string,string> = {
  'atomes-noyau':'#10b981','transformations-chimiques':'#10b981',
  'description-mouvement':'#4f6ef7','forces-interactions':'#4f6ef7',
  'ondes-mecaniques-2':'#8b5cf6','ondes-lumineuses':'#8b5cf6','signaux-electriques-2':'#8b5cf6',
  'formes-energie':'#f59e0b','bilans-energetiques-2':'#f59e0b',
}

const SEC_LABEL: Record<string,string> = {
  'atomes-noyau':'🧪 Chimie','transformations-chimiques':'🧪 Chimie',
  'description-mouvement':'⚛️ Mécanique','forces-interactions':'⚛️ Mécanique',
  'ondes-mecaniques-2':'🌊 Ondes','ondes-lumineuses':'🌊 Ondes','signaux-electriques-2':'🌊 Ondes',
  'formes-energie':'🔋 Énergie','bilans-energetiques-2':'🔋 Énergie',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

const ALL_CHAPTERS: Record<string,Chap> = {

// ══════════════════════════════════════════════════════════════════════
// SECTION 1 — CONSTITUTION DE LA MATIÈRE (Chimie)
// ══════════════════════════════════════════════════════════════════════

'atomes-noyau': {
  id:'atomes-noyau', emoji:'⚗️', badge:'Chimie', color:'#10b981',
  titre:'Atomes, noyaux & Tableau périodique',
  desc:"Structure de l'atome (noyau + électrons), notation ᴬ_ZX, isotopes, configuration électronique, tableau périodique, électrons de valence.",
  souschapitres:[
    {
      id:'sc-at1', titre:'1.1 Structure de l\'atome et isotopes',
      notions:['Noyau : Z protons + N neutrons','A=Z+N (nombre de masse)','Notation ᴬ_Z X','Isotopes : même Z, différents N'],
      blocs:[
        {
          notion:'⚗️ Structure atomique',
          theoremes:[
            { id:'D-AT1', type:'def', nom:'Structure de l\'atome',
              enonce:"ATOME (électriquement neutre) :\n• Noyau : protons (+e) + neutrons (neutres)\n• Cortège électronique : électrons (−e)\n\nNOTATIONS :\nZ = numéro atomique = nombre de protons = nombre d'électrons (atome neutre)\nN = nombre de neutrons\nA = nombre de masse = Z + N\n\nSYMBOLE : ᴬ_Z X\nExemple : ¹²_₆C (carbone-12 : Z=6, A=12, N=6)\n\nDIMENSIONS :\nAtome : d ≈ 10⁻¹⁰ m = 1 Å\nNoyau : d ≈ 10⁻¹⁵ m = 1 fm\n→ L'atome est surtout vide (noyau 10⁵× plus petit)" },
            { id:'D-AT2', type:'def', nom:'Isotopes',
              enonce:"Deux atomes isotopes :\n• Même Z (même élément chimique)\n• N différents (donc A différents)\n• Mêmes propriétés chimiques\n• Masses légèrement différentes\n\nEXEMPLES (carbone) :\n¹²C (98,9%, stable) ; ¹³C (1,1%, stable) ; ¹⁴C (traces, radioactif)\n\nEXEMPLES (hydrogène) :\n¹H (hydrogène) ; ²H (deutérium) ; ³H (tritium, radioactif)\n\nMASSE ATOMIQUE RELATIVE :\nMoyenne des masses isotopiques pondérée par les abondances.\nExemple Cl : 0,7577×34,97 + 0,2423×36,97 ≈ 35,45 g/mol",
              remarque:"Le C-14 est utilisé pour la datation archéologique car sa demi-vie (5730 ans) est bien connue." },
          ],
          exercices:[
            { id:'EX-AT1', niveau:'Facile', titre:'Lire un symbole nucléaire',
              enonce:"Donner Z, A, N pour ²³_₁₁Na. Combien d'électrons a l'ion Na⁺ ?",
              correction:"Z=11, A=23, N=23−11=12.\nNa neutre : 11 e⁻. Na⁺ : 11−1=10 e⁻." },
            { id:'EX-AT2', niveau:'Intermédiaire', titre:'Masse atomique du chlore',
              enonce:"³⁵Cl (75,77%, M=34,97g/mol) et ³⁷Cl (24,23%, M=36,97g/mol). Masse atomique ?",
              correction:"M(Cl)=0,7577×34,97+0,2423×36,97=26,50+8,96=35,46 g/mol." },
          ]
        },
      ]
    },
    {
      id:'sc-at2', titre:'1.2 Configuration électronique et tableau périodique',
      notions:['Couches K(n=1, max 2e), L(n=2, max 8e), M(n=3, max 18e)','Règle de remplissage : 1s,2s,2p,3s,3p,4s,3d…','Électrons de valence : dernière couche','Même groupe → mêmes e⁻ de valence → propriétés similaires'],
      blocs:[
        {
          notion:'📊 Configuration électronique',
          theoremes:[
            { id:'D-AT3', type:'def', nom:'Configuration électronique',
              enonce:"Électrons répartis en couches/sous-couches :\nK (n=1) : max 2 électrons (1s²)\nL (n=2) : max 8 électrons (2s² 2p⁶)\nM (n=3) : max 18 électrons (3s² 3p⁶ 3d¹⁰)\n\nOrdre de remplissage (Klechkowski) :\n1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → …\n\nÉLECTRONS DE VALENCE :\nÉlectrons de la couche externe (la plus haute n occupée)\n→ Déterminent les propriétés chimiques\n→ Même nombre d'e⁻ de valence ↔ même groupe ↔ propriétés similaires\n\nEXEMPLES :\nNa (Z=11) : 1s²2s²2p⁶3s¹ → 1 e⁻ de valence → colonne 1 (alcalin)\nCl (Z=17) : 1s²2s²2p⁶3s²3p⁵ → 7 e⁻ de valence → colonne 17 (halogène)\nNe (Z=10) : 1s²2s²2p⁶ → couche L saturée → gaz noble (colonne 18)",
              remarque:"La règle de l'octet : un atome tend à avoir 8 e⁻ de valence (comme un gaz noble) → base de la chimie des liaisons." },
          ],
          exercices:[
            { id:'EX-AT3', niveau:'Facile', titre:'Configuration de O et Ca',
              enonce:"Donner la configuration électronique de O (Z=8) et Ca (Z=20). Électrons de valence ?",
              correction:"O : 1s²2s²2p⁴ → 6 e⁻ de valence (colonne 16).\nCa : 1s²2s²2p⁶3s²3p⁶4s² → 2 e⁻ de valence (colonne 2, alcalino-terreux)." },
          ]
        },
      ]
    },
  ]
},

'transformations-chimiques': {
  id:'transformations-chimiques', emoji:'🔥', badge:'Chimie', color:'#10b981',
  titre:'Transformations chimiques',
  desc:"Équations de réaction, conservation de la masse (Lavoisier), combustions complètes et incomplètes, réactions acide-base, pH.",
  souschapitres:[
    {
      id:'sc-tc1', titre:'2.1 Équations de réaction et combustions',
      notions:['Conservation des atomes et des charges','m(réactifs)=m(produits) (Lavoisier)','Combustion complète : CO₂+H₂O','Combustion incomplète : CO (toxique)'],
      blocs:[
        {
          notion:'🔥 Équations chimiques',
          theoremes:[
            { id:'D-TC1', type:'def', nom:'Équilibrage d\'une équation chimique',
              enonce:"RÈGLES D'ÉQUILIBRAGE :\n1. Conservation des atomes (même nombre de chaque côté)\n2. Conservation des charges électriques\n\nMÉTHODE :\n• Équilibrer d'abord les éléments moins fréquents (C, N, S…)\n• Ensuite H, puis O en dernier\n• Vérifier la conservation des charges\n\nLOI DE LAVOISIER (conservation de la masse) :\nm(réactifs) = m(produits)\n\nEXEMPLE :\n2H₂ + O₂ → 2H₂O  (H : 4=4 ✓ ; O : 2=2 ✓)" },
            { id:'D-TC2', type:'def', nom:'Combustions',
              enonce:"COMBUSTION COMPLÈTE d'un hydrocarbure CₓHᵧ :\nCₓHᵧ + (x+y/4)O₂ → xCO₂ + (y/2)H₂O\n\nEXEMPLES :\nCH₄ + 2O₂ → CO₂ + 2H₂O  (méthane)\nC₃H₈ + 5O₂ → 3CO₂ + 4H₂O  (propane)\nC₂H₅OH + 3O₂ → 2CO₂ + 3H₂O  (éthanol)\n\nCOMBUSTION INCOMPLÈTE (manque d'O₂) :\n→ Produit du CO (monoxyde de carbone, TOXIQUE et INODORE)\n→ Aussi suie (carbone imbrûlé)\n\nDétecteur CO obligatoire dans les habitations avec chaudière.",
              remarque:"La combustion complète nécessite un excès d'air. En moteur, le ratio air/carburant est crucial pour réduire les émissions de CO et CO₂." },
          ],
          exercices:[
            { id:'EX-TC1', niveau:'Facile', titre:'Combustion du butane',
              enonce:"Équilibrer la combustion complète du butane C₄H₁₀.",
              correction:"C₄H₁₀ + 13/2 O₂ → 4CO₂ + 5H₂O.\n(ou : 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O)." },
            { id:'EX-TC2', niveau:'Intermédiaire', titre:'Conservation de masse',
              enonce:"4g de CH₄ brûlent complètement. Calculer les masses de CO₂ et H₂O produites. (M(CH₄)=16, M(CO₂)=44, M(H₂O)=18)",
              correction:"n(CH₄)=4/16=0,25mol.\nCH₄+2O₂→CO₂+2H₂O : ratio 1:1:2.\nn(CO₂)=0,25mol → m=0,25×44=11g.\nn(H₂O)=0,5mol → m=0,5×18=9g.\nVérif : 4+0,25×2×32=4+16=20g → 11+9=20g ✓" },
          ]
        },
      ]
    },
    {
      id:'sc-tc2', titre:'2.2 Acides, bases et pH',
      notions:['Acide de Brønsted : donne H⁺','Base de Brønsted : capte H⁺','pH=−log[H₃O⁺]','Ke=[H₃O⁺][OH⁻]=10⁻¹⁴ (25°C)'],
      blocs:[
        {
          notion:'🧪 Acide-base et pH',
          theoremes:[
            { id:'D-TC3', type:'def', nom:'Acides, bases et pH',
              enonce:"ACIDE DE BRØNSTED : espèce qui donne un proton H⁺\nBASE DE BRØNSTED : espèce qui capte un proton H⁺\n\nCOUPLE ACIDE/BASE : HA/A⁻\nAH ⇌ A⁻ + H⁺\n\npH = −log[H₃O⁺]\n[H₃O⁺] = 10^(−pH)\n\nSOLUTIONS :\npH < 7 : acide\npH = 7 : neutre\npH > 7 : basique\n\nPRODUIT IONIQUE DE L'EAU :\nKe = [H₃O⁺]×[OH⁻] = 10⁻¹⁴ (à 25°C)\n\nACIDE FORT (ex : HCl) : ionisation totale\n→ [H₃O⁺] = c → pH = −log c\n\nBASE FORTE (ex : NaOH) :\n→ [OH⁻] = c → pOH = −log c → pH = 14 − pOH",
              remarque:"Attention : pH = −log[H₃O⁺] est une fonction logarithme. pH augmente quand [H₃O⁺] diminue (solution plus basique). pH=1 est 10× plus acide que pH=2." },
          ],
          exercices:[
            { id:'EX-TC3', niveau:'Facile', titre:'pH de HCl',
              enonce:"Solution HCl à c=0,01mol/L (acide fort). Calculer [H₃O⁺] et pH.",
              correction:"[H₃O⁺]=c=0,01=10⁻² mol/L.\npH=2." },
            { id:'EX-TC4', niveau:'Intermédiaire', titre:'pH de NaOH',
              enonce:"Solution NaOH à c=5×10⁻³mol/L. Calculer [OH⁻], [H₃O⁺] et pH.",
              correction:"[OH⁻]=5×10⁻³mol/L.\n[H₃O⁺]=Ke/[OH⁻]=10⁻¹⁴/(5×10⁻³)=2×10⁻¹²mol/L.\npH=−log(2×10⁻¹²)≈11,7." },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 2 — MOUVEMENT & INTERACTIONS (Mécanique)
// ══════════════════════════════════════════════════════════════════════

'description-mouvement': {
  id:'description-mouvement', emoji:'🚀', badge:'Mécanique', color:'#4f6ef7',
  titre:'Description du mouvement',
  desc:"Référentiel, vecteur position, vecteur vitesse (v⃗=dr⃗/dt), vecteur accélération, types de mouvements (MRU, MRUA, MCU).",
  souschapitres:[
    {
      id:'sc-mv1', titre:'3.1 Référentiel, position et vitesse',
      notions:['Référentiel : solide de réf. + horloge','Vecteur position OM⃗','v⃗=dr⃗/dt (vitesse instantanée)','a⃗=dv⃗/dt (accélération)'],
      blocs:[
        {
          notion:'🚀 Cinématique',
          theoremes:[
            { id:'D-MV1', type:'def', nom:'Référentiel et vecteur position',
              enonce:"RÉFÉRENTIEL :\nSolide de référence + horloge\n• Terrestre : lié à la Terre (expériences courtes)\n• Géocentrique : lié au centre de la Terre\n• Héliocentrique : lié au Soleil (Kepler)\n\nVECTEUR POSITION :\nOM⃗ : du point O (origine) au point M (objet)\nTRAJECTOIRE : ensemble des positions successives\n• Rectiligne : droite\n• Circulaire : cercle\n• Parabolique, quelconque…\n\nLe mouvement est RELATIF : dépend du référentiel choisi." },
            { id:'F-MV1', type:'formule', nom:'Vecteur vitesse et accélération',
              enonce:"VITESSE MOYENNE :\nv⃗_moy = ΔOM⃗/Δt  (m/s)\n\nVITESSE INSTANTANÉE :\nv⃗ = dr⃗/dt  (dérivée du vecteur position)\n|v⃗| = v = norme de la vitesse (scalaire)\n\nACCÉLÉRATION :\na⃗ = dv⃗/dt  (dérivée du vecteur vitesse)\n\nMOUVEMENTS TYPES :\nMRU (v=cste) : a⃗=0⃗ ; x=x₀+v·t\nMRUA (a=cste) : v=v₀+a·t ; x=x₀+v₀t+½at²\n→ v²=v₀²+2a(x−x₀)  (relation sans t)\nMCU (|v|=cste, cercle) : a⃗ centripète ≠ 0⃗" },
          ],
          exercices:[
            { id:'EX-MV1', niveau:'Facile', titre:'Vitesse moyenne',
              enonce:"Voiture : 150km en 1h30min. Vitesse moyenne en km/h et m/s.",
              correction:"t=1,5h. v_moy=150/1,5=100km/h.\nEn m/s : 100×1000/3600≈27,8m/s." },
            { id:'EX-MV2', niveau:'Intermédiaire', titre:'MRUA — freinage',
              enonce:"v₀=72km/h, a=−5m/s². Distance de freinage (v_f=0) ?",
              correction:"v₀=72/3,6=20m/s.\nv_f²=v₀²+2ad → 0=400+2×(−5)×d → d=40m." },
          ]
        },
      ]
    },
  ]
},

'forces-interactions': {
  id:'forces-interactions', emoji:'⚡', badge:'Mécanique', color:'#4f6ef7',
  titre:'Forces & Interactions',
  desc:"Modélisation des forces, principe d'inertie (1ère loi de Newton), poids (P=mg), réaction normale, frottement, tension. Équilibre statique.",
  souschapitres:[
    {
      id:'sc-fi1', titre:'4.1 Principe d\'inertie et forces usuelles',
      notions:['1ère loi : si ΣF⃗=0⃗ → v⃗=cste (MRU ou repos)','Poids P⃗=mg⃗ (vertical, vers le bas)','Réaction normale N⃗ (⊥ surface)','Frottement f⃗ (s\'oppose au mouvement)'],
      blocs:[
        {
          notion:'⚡ Forces et équilibre',
          theoremes:[
            { id:'T-FI1', type:'thm', nom:'Principe d\'inertie (1ère loi de Newton)',
              enonce:"Dans un référentiel galiléen :\nSi ΣF⃗_ext = 0⃗ → a⃗ = 0⃗ → v⃗ = constante (MRU ou repos)\n\nRÉCIPROQUE : si a⃗ = 0⃗ (MRU) → ΣF⃗_ext = 0⃗\n\nRÉFÉRENTIEL GALILÉEN :\nRéférentiel dans lequel la 1ère loi est vérifiée.\nApproximations pratiques : terrestre (courtes durées), héliocentrique." },
            { id:'D-FI1', type:'def', nom:'Forces usuelles',
              enonce:"POIDS P⃗ :\nForce de gravitation exercée par la Terre\nP⃗ = m·g⃗  (vertical, vers le bas)\ng ≈ 9,8 m/s² (variable selon le lieu)\n\nRÉACTION NORMALE N⃗ :\nExercée par le support sur l'objet\n⊥ à la surface de contact\n\nFORCE DE FROTTEMENT f⃗ :\nTangentielle à la surface, s'oppose au mouvement relatif\n\nTENSION T⃗ :\nExercée par un fil ou câble\nSuivant le fil, dirigée en s'éloignant du corps\n\nFORCE ÉLECTROSTATIQUE :\nF = kq₁q₂/r² (loi de Coulomb)" },
            { id:'M-FI1', type:'methode', nom:'Résoudre un problème d\'équilibre statique',
              enonce:"1. SYSTÈME : définir le corps étudié\n2. BILAN DES FORCES : lister toutes les forces sur le système\n3. REPÈRE : choisir axes x et y adaptés\n4. PROJECTIONS (ΣF⃗=0⃗) :\n   ΣFₓ = 0  et  ΣFᵧ = 0\n5. RÉSOUDRE le système de 2 équations\n\nEXEMPLE — Objet sur plan incliné (angle θ, sans frottements) :\nAxe x (le long de la pente) : −Psinθ + T = 0 → T=mgsinθ\nAxe y (⊥ à la pente) : N − Pcosθ = 0 → N=mgcosθ" },
          ],
          exercices:[
            { id:'EX-FI1', niveau:'Facile', titre:'Objet suspendu',
              enonce:"Objet m=500g suspendu par un fil vertical. g=9,8m/s². Tension T ?",
              correction:"ΣF=0 → T−P=0 → T=P=mg=0,5×9,8=4,9N." },
            { id:'EX-FI2', niveau:'Intermédiaire', titre:'Plan incliné',
              enonce:"m=2kg sur plan incliné à 30°, sans frottement. g=10m/s². Calculer N et T.",
              correction:"N=mgcos30°=2×10×0,866≈17,3N.\nT=mgsin30°=2×10×0,5=10N." },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 3 — ONDES & SIGNAUX
// ══════════════════════════════════════════════════════════════════════

'ondes-mecaniques-2': {
  id:'ondes-mecaniques-2', emoji:'🌊', badge:'Ondes', color:'#8b5cf6',
  titre:'Ondes mécaniques & sonores',
  desc:"Propagation d'une perturbation mécanique, ondes sonores et ultrasons, célérité v, retard τ=d/v, longueur d'onde λ=vT, application sonar et échographie.",
  souschapitres:[
    {
      id:'sc-om1', titre:'5.1 Ondes mécaniques et grandeurs',
      notions:['Onde : énergie sans transport de matière','Transversale : dépl. ⊥ propagation','Longitudinale : dépl. ∥ propagation','v=λf ; τ=d/v ; sonar : d=vΔt/2'],
      blocs:[
        {
          notion:'🌊 Ondes et son',
          theoremes:[
            { id:'D-OM1', type:'def', nom:'Ondes mécaniques — définition',
              enonce:"ONDE MÉCANIQUE :\nPropagation d'une perturbation dans un milieu matériel\nÉnergie transportée SANS déplacement de matière\n\nONDE TRANSVERSALE :\nDéplacement ⊥ propagation (corde, surface eau)\n\nONDE LONGITUDINALE :\nDéplacement ∥ propagation (son, ultrasons)\n\nSON :\nFréquences audibles : 20 Hz – 20 000 Hz\nInfrasson : f < 20 Hz\nUltrason : f > 20 000 Hz\n\nCÉLÉRITÉS :\nSon dans l'air : v ≈ 340 m/s (20°C)\nSon dans l'eau : v ≈ 1480 m/s\nSon dans l'acier : v ≈ 5100 m/s" },
            { id:'F-OM1', type:'formule', nom:'Relations fondamentales des ondes',
              enonce:"v = λ × f = λ / T\n\nλ = longueur d'onde (m)\nf = fréquence (Hz) ; T = période (s) ; f = 1/T\n\nRETARD TEMPOREL :\nτ = d / v  (d = distance parcourue)\n\nAPPLICATION SONAR / ÉCHO :\nSignal aller-retour : d = v × (Δt/2)\n\nÉCHOGRAPHIE MÉDICALE :\nv ≈ 1500 m/s dans les tissus\nRésolution spatiale ≈ λ/2\n\nEXEMPLE : son f=440Hz dans l'air :\nλ=340/440≈0,77m",
              remarque:"Plus la fréquence est élevée, plus la longueur d'onde est courte → meilleure résolution pour l'échographie (mais atténuation plus forte en profondeur)." },
          ],
          exercices:[
            { id:'EX-OM1', niveau:'Facile', titre:'Écho sous-marin',
              enonce:"Sonar : signal retourne après Δt=0,8s. v=1500m/s. Profondeur ?",
              correction:"d=v×Δt/2=1500×0,4=600m." },
            { id:'EX-OM2', niveau:'Facile', titre:'Longueur d\'onde du son',
              enonce:"f=500Hz dans l'air (v=340m/s). Calculer λ.",
              correction:"λ=v/f=340/500=0,68m=68cm." },
          ]
        },
      ]
    },
  ]
},

'ondes-lumineuses': {
  id:'ondes-lumineuses', emoji:'🔭', badge:'Optique', color:'#8b5cf6',
  titre:'Ondes lumineuses & Lentilles',
  desc:"Propagation rectiligne de la lumière, lentilles minces convergentes, construction d'images (3 rayons), relation de conjugaison 1/OA'−1/OA=1/f', grandissement γ.",
  souschapitres:[
    {
      id:'sc-ol1', titre:'6.1 Lentilles convergentes et construction d\'images',
      notions:['Centre optique O : rayon non dévié','Foyer image F\' : rayon ∥ axe → F\'','Foyer objet F : passe par F → sort ∥','f\'>0 pour convergente'],
      blocs:[
        {
          notion:'🔭 Lentilles convergentes',
          theoremes:[
            { id:'D-OL1', type:'def', nom:'Éléments remarquables d\'une lentille convergente',
              enonce:"LENTILLE CONVERGENTE (bords minces) :\nFait converger les rayons parallèles vers F'\n\nÉLÉMENTS REMARQUABLES :\n• Centre optique O : rayon qui passe par O → non dévié\n• Foyer IMAGE F' : image d'un objet à l'infini ; OF' = f' > 0\n• Foyer OBJET F : symétrique de F' par rapport à O\n\nTROIS RAYONS POUR CONSTRUIRE UNE IMAGE :\n1. Rayon passant par O → non dévié\n2. Rayon ∥ à l'axe optique → passe par F' après la lentille\n3. Rayon passant par F → sort ∥ à l'axe après la lentille\n\nL'image est l'intersection de 2 de ces 3 rayons (ou de leurs prolongements)." },
            { id:'F-OL1', type:'formule', nom:'Relation de conjugaison et grandissement',
              enonce:"RELATION DE CONJUGAISON :\n1/OA' − 1/OA = 1/f' = D\n\nOA : algébrique (négatif si objet avant la lentille)\nOA' : algébrique (positif si image réelle après la lentille)\nf' : distance focale (m)\nD = 1/f' : vergence (dioptries, δ)\n\nGRANDISSEMENT ALGÉBRIQUE :\nγ = OA'/OA = A'B'/AB\n\nγ > 0 : image DROITE\nγ < 0 : image RENVERSÉE\n|γ| > 1 : image AGRANDIE\n|γ| < 1 : image RÉDUITE\n\nImage RÉELLE : OA' > 0 (côté opposé à l'objet)\nImage VIRTUELLE : OA' < 0 (même côté que l'objet)",
              remarque:"Moyen mnémotechnique : OA est NÉGATIF pour un objet réel (objet avant la lentille, sens − de l'axe). OA' est POSITIF pour une image réelle." },
          ],
          exercices:[
            { id:'EX-OL1', niveau:'Facile', titre:'Image par une lentille',
              enonce:"Objet à OA=−30cm, D=4δ. Calculer OA' et γ.",
              correction:"f'=1/4=0,25m=25cm.\n1/OA'=1/25+1/(−30)=0,04−0,0333=0,0067.\nOA'=150cm.\nγ=150/(−30)=−5 (image réelle, renversée, agrandie ×5)." },
            { id:'EX-OL2', niveau:'Intermédiaire', titre:'Loupe',
              enonce:"AB=2mm à OA=−8cm d'une loupe f'=10cm. OA' et A'B' ?",
              correction:"1/OA'=1/10+1/(−8)=0,10−0,125=−0,025.\nOA'=−40cm (image virtuelle).\nγ=(−40)/(−8)=5 (droite, agrandie).\nA'B'=5×2=10mm." },
          ]
        },
      ]
    },
  ]
},

'signaux-electriques-2': {
  id:'signaux-electriques-2', emoji:'⚡', badge:'Électricité', color:'#8b5cf6',
  titre:'Signaux électriques & Circuits',
  desc:"Tension U, intensité I, loi d'Ohm U=RI, associations de résistances (série/parallèle), loi des mailles et des nœuds, puissance P=UI, énergie électrique.",
  souschapitres:[
    {
      id:'sc-el1', titre:'7.1 Grandeurs électriques et loi d\'Ohm',
      notions:['Tension U (Volts) ; Intensité I (Ampères)','Loi d\'Ohm U=RI','Série : R_éq=R₁+R₂','Parallèle : 1/R_éq=1/R₁+1/R₂'],
      blocs:[
        {
          notion:'⚡ Circuits électriques',
          theoremes:[
            { id:'D-EL1', type:'def', nom:'Lois de Kirchhoff',
              enonce:"LOI DES MAILLES (Kirchhoff tension) :\nLa somme algébrique des tensions dans une maille = 0\n\nLOI DES NOEUDS (Kirchhoff courant) :\nΣ I_entrée = Σ I_sortie\n\nMONTAGE EN SÉRIE :\n• Même intensité partout\n• Tensions s'additionnent : U_total = U₁+U₂+…\n• R_éq = R₁+R₂+…\n\nMONTAGE EN PARALLÈLE :\n• Même tension aux bornes\n• Intensités s'additionnent : I_total = I₁+I₂+…\n• 1/R_éq = 1/R₁+1/R₂+…" },
            { id:'F-EL1', type:'formule', nom:'Loi d\'Ohm, puissance et énergie',
              enonce:"LOI D'OHM : U = R × I  (V = Ω × A)\n\nPUISSANCE :\nP = U × I = R×I² = U²/R  (Watts)\n\nÉNERGIE ÉLECTRIQUE :\nE = P × t  (Joules)\nE = U × I × t\n1 kWh = 3,6×10⁶ J\n\nDIVISEUR DE TENSION (pont) :\nU₂ = U × R₂/(R₁+R₂)\n\nEFFET JOULE :\nChaleur dissipée = R×I²×t" },
          ],
          exercices:[
            { id:'EX-EL1', niveau:'Facile', titre:'Loi d\'Ohm',
              enonce:"R=470Ω sous U=9,4V. Calculer I et P.",
              correction:"I=U/R=9,4/470=0,02A=20mA.\nP=UI=9,4×0,02=0,188W≈200mW." },
            { id:'EX-EL2', niveau:'Intermédiaire', titre:'Résistances en parallèle',
              enonce:"R₁=100Ω et R₂=200Ω en parallèle, U=12V. R_éq, I_total, I₁, I₂ ?",
              correction:"1/R_éq=1/100+1/200=0,015 → R_éq=66,7Ω.\nI_total=12/66,7=0,18A.\nI₁=12/100=0,12A ; I₂=12/200=0,06A.\nVérif : 0,12+0,06=0,18A ✓" },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 4 — CONVERSIONS & TRANSFERTS D'ÉNERGIE
// ══════════════════════════════════════════════════════════════════════

'formes-energie': {
  id:'formes-energie', emoji:'🔋', badge:'Énergie', color:'#f59e0b',
  titre:"Formes d'énergie",
  desc:"Énergie cinétique Ec=½mv², énergie potentielle Ep=mgh, conservation de l'énergie mécanique (sans frottements), transferts thermiques.",
  souschapitres:[
    {
      id:'sc-fe1', titre:'8.1 Énergie cinétique et potentielle',
      notions:['Ec=½mv² (Joules)','Ep=mgh (référence choisie)','Em=Ec+Ep (énergie mécanique)','Conservation : Em=cste (sans frottements)'],
      blocs:[
        {
          notion:'🔋 Énergie mécanique',
          theoremes:[
            { id:'F-FE1', type:'formule', nom:'Énergies cinétique et potentielle',
              enonce:"ÉNERGIE CINÉTIQUE :\nEc = ½ × m × v²  (Joules)\nm en kg, v en m/s\n\nÉNERGIE POTENTIELLE DE PESANTEUR :\nEp = m × g × h\nh = altitude par rapport à l'origine choisie\ng ≈ 9,8 m/s²\n\nÉNERGIE MÉCANIQUE :\nEm = Ec + Ep\n\nCONSERVATION (sans frottements) :\nEm = constante\n½mv₁² + mgh₁ = ½mv₂² + mgh₂\n\nAVEC FROTTEMENTS :\nEm diminue → énergie dissipée en chaleur\nΔEm = W_frottements < 0",
              remarque:"Choisir l'origine h=0 au point le plus bas du problème (ou là où h est connu). Em est la même en tous les points du trajet (sans frottements)." },
          ],
          exercices:[
            { id:'EX-FE1', niveau:'Facile', titre:'Chute libre et énergie',
              enonce:"Bille m=50g lâchée de h=3m. v à l'impact ? (sans frottements, g=10m/s²)",
              correction:"Conservation Em : ½mv²=mgh → v=√(2gh)=√(2×10×3)=√60≈7,75m/s." },
            { id:'EX-FE2', niveau:'Intermédiaire', titre:'Toboggan avec frottements',
              enonce:"Enfant 30kg, h=4m, v_bas=7m/s. g=10m/s². Calculer ΔEm et la force de frottement si le toboggan mesure 5m.",
              correction:"Em_i=mgh=30×10×4=1200J.\nEm_f=½mv²=½×30×49=735J.\nΔEm=735−1200=−465J.\nf=465/5=93N." },
          ]
        },
      ]
    },
    {
      id:'sc-fe2', titre:'8.2 Transferts thermiques',
      notions:['Conduction : contact direct (solide)','Convection : déplacement de fluide','Rayonnement : ondes électromagnétiques','Q=mCpΔT (énergie thermique)'],
      blocs:[
        {
          notion:'🌡️ Transferts thermiques',
          theoremes:[
            { id:'D-FE1', type:'def', nom:'Modes de transfert thermique',
              enonce:"CONDUCTION :\nTransfert dans un solide par vibration des atomes\nPlus efficace dans les métaux (bons conducteurs thermiques)\nIsolants : bois, laine, air (mauvais conducteurs)\n\nCONVECTION :\nTransfert par déplacement de fluide (air chaud monte, eau chaude monte)\nChauffage central, courants marins, météo\n\nRAYONNEMENT :\nTransfert par ondes électromagnétiques (IR)\nPas besoin de milieu matériel (vide spatial)\nTout corps à T>0K rayonne de l'énergie\n\nÉNERGIE THERMIQUE :\nQ = m × Cp × ΔT\nCp(eau) = 4186 J·kg⁻¹·K⁻¹",
              remarque:"En isolation thermique : on bloque les 3 modes. Double vitrage : lame d'air immobile (pas de convection, mauvais conducteur, réflexion IR)." },
          ],
          exercices:[
            { id:'EX-FE3', niveau:'Facile', titre:'Identifier les transferts',
              enonce:"Un radiateur chauffe une pièce. Identifier les 3 modes de transfert thermique.",
              correction:"Conduction : chaleur conduite à travers les parois du radiateur.\nConvection : l'air chaud monte, l'air froid descend → circulation.\nRayonnement : infrarouges émis par la surface chaude du radiateur." },
          ]
        },
      ]
    },
  ]
},

'bilans-energetiques-2': {
  id:'bilans-energetiques-2', emoji:'⚙️', badge:'Énergie', color:'#f59e0b',
  titre:"Bilans & Conversions d'énergie",
  desc:"Puissance P=UI, rendement η=P_utile/P_absorbée, conversions d'énergie, sources d'énergie renouvelables et non renouvelables, empreinte carbone.",
  souschapitres:[
    {
      id:'sc-be1', titre:'9.1 Rendement et bilans de puissance',
      notions:['P=UI (Watts) ; E=Pt (Joules)','η=P_utile/P_absorbée (0≤η≤1)','P_perdue=P_abs−P_utile','Chaîne de conversion énergétique'],
      blocs:[
        {
          notion:'⚙️ Rendement et conversions',
          theoremes:[
            { id:'D-BE1', type:'def', nom:'Rendement d\'un convertisseur d\'énergie',
              enonce:"η = P_utile / P_absorbée = E_utile / E_absorbée\n\n0 ≤ η ≤ 1  (ou 0% à 100%)\nη=1 : impossible (2ème principe de la thermodynamique)\n\nPUISSANCE DISSIPÉE (pertes, surtout chaleur) :\nP_perdue = P_absorbée − P_utile\n\nCHAÎNE ÉNERGÉTIQUE :\nη_global = η₁ × η₂ × … × ηₙ\n\nEXEMPLES :\n• LED : η ≈ 90% (élec → lumière)\n• Moteur électrique : η ≈ 85–95%\n• Centrale thermique : η ≈ 35–45%\n• Panneau solaire PV : η ≈ 15–22%\n• Ampoule incandescente : η ≈ 5% (95% de chaleur !)  ",
              remarque:"Un rendement de 40% pour une centrale thermique signifie que 60% de l'énergie du combustible est perdue en chaleur. C'est pour ça qu'on utilise des centrales à cogénération." },
            { id:'D-BE2', type:'def', nom:'Sources d\'énergie et empreinte carbone',
              enonce:"ÉNERGIES NON RENOUVELABLES (fossiles) :\nPétrole, gaz naturel, charbon → combustion → CO₂\nÉnergie nucléaire (fission) → peu de CO₂ mais déchets radioactifs\n\nÉNERGIES RENOUVELABLES :\n• Solaire (PV et thermique)\n• Éolien\n• Hydraulique (barrages)\n• Biomasse\n• Géothermie\n\nÉMISSIONS DE CO₂ (gCO₂/kWh électrique) :\nCharbon : ~1000 ; Gaz : ~400 ; Nucléaire : ~12 ; Éolien : ~11 ; Solaire : ~20\n\nEMPREINTE CARBONE D'UN FRANÇAIS ≈ 9 tonnes CO₂/an\nOBJECTIF 2050 : < 2 tonnes CO₂/an (accord de Paris)" },
          ],
          exercices:[
            { id:'EX-BE1', niveau:'Facile', titre:'Rendement d\'un moteur',
              enonce:"Moteur électrique : P_abs=500W, soulève m=20kg à v=1m/s. g=10m/s². Rendement ?",
              correction:"P_utile=Fv=mgv=200×1=200W.\nη=200/500=0,4=40%." },
            { id:'EX-BE2', niveau:'Intermédiaire', titre:'Chaîne de conversion',
              enonce:"Panneau solaire η₁=18% alimente un moteur η₂=85%. Rendement global ? Sur 1h avec P_solaire=500W, énergie utile ?",
              correction:"η_global=0,18×0,85=0,153=15,3%.\nP_utile=500×0,153=76,5W.\nE=P×t=76,5×3600=275400J≈275kJ." },
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
export default function PhysiqueSecondeSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'atomes-noyau'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
          <h2>Chapitre non trouvé</h2>
          <Link href="/bac-france/physique/seconde" style={{ color:'#10b981' }}>
            ← Retour Physique-Chimie Seconde
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#10b981'

  const GROUPS = [
    { label:'Section 1 — Constitution de la Matière', slugs:NAV_ORDER.slice(0,2) },
    { label:'Section 2 — Mouvement & Interactions', slugs:NAV_ORDER.slice(2,4) },
    { label:'Section 3 — Ondes & Signaux', slugs:NAV_ORDER.slice(4,7) },
    { label:'Section 4 — Conversions & Transferts', slugs:NAV_ORDER.slice(7) },
  ]

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link><span>›</span>
          <Link href="/bac-france/physique/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde</Link><span>›</span>
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
                  <span style={{ fontSize:11, background:'rgba(16,185,129,0.15)',
                    color:'#34d399', padding:'2px 9px', borderRadius:10 }}>
                    {SEC_LABEL[slug]} · Seconde · 3h/sem
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' en Physique-Chimie Seconde France')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/bac-france/physique/premiere"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📗 Suite en Première
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
                                      <Link href={`/solve?q=${encodeURIComponent('Physique-Chimie Seconde France — '+ex.enonce)}`}
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
                  <Link href={`/bac-france/physique/seconde/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/seconde/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  ⚛️ Physique-Chimie Seconde · 9 ch.
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'7px 15px 3px', fontSize:10, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac-france/physique/seconde/${s}`} style={{ textDecoration:'none' }}>
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
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Physique-Chimie Seconde France')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/bac-france/physique/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📗 Suite en Première</Link>
                  <Link href="/bac-france/physique/seconde" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
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