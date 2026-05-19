'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE — SECTION SCIENCES TECHNIQUES / [SLUG]
// Route : /bac/physique/sciences-tech/[slug]
// Programme officiel MEN Tunisie · 4ème année Sciences Techniques
// 7 chapitres Physique + 5 chapitres Chimie = 12 au total
// Spécificités ST : applications industrielles et technologiques
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#10b981', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899', loi:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', loi:'Loi' }

const NAV_ORDER = [
  'dipole-rc-tech','dipole-rl-tech','oscillations-lc-tech','oscillations-mec-tech',
  'ondes-mec-tech','ondes-lum-tech','nucleaire-tech',
  'cinetique-tech','equilibres-tech','acide-base-tech','electrochimie-tech','organique-tech',
]

const TITRES_NAV: Record<string,string> = {
  'dipole-rc-tech':       'CH 01 — Dipôle RC',
  'dipole-rl-tech':       'CH 02 — Dipôle RL',
  'oscillations-lc-tech': 'CH 03 — Oscillations électriques (LC)',
  'oscillations-mec-tech':'CH 04 — Oscillations mécaniques',
  'ondes-mec-tech':       'CH 05 — Ondes mécaniques progressives',
  'ondes-lum-tech':       'CH 06 — Ondes lumineuses',
  'nucleaire-tech':       'CH 07 — Réactions nucléaires',
  'cinetique-tech':       'CH 08 — Cinétique chimique',
  'equilibres-tech':      'CH 09 — Équilibres chimiques',
  'acide-base-tech':      'CH 10 — Acides et bases',
  'electrochimie-tech':   'CH 11 — Électrochimie',
  'organique-tech':       'CH 12 — Chimie organique',
}

const SEC_COLORS: Record<string,string> = {
  'dipole-rc-tech':'#4f6ef7','dipole-rl-tech':'#8b5cf6','oscillations-lc-tech':'#06b6d4',
  'oscillations-mec-tech':'#10b981','ondes-mec-tech':'#f59e0b',
  'ondes-lum-tech':'#14b8a6','nucleaire-tech':'#ef4444',
  'cinetique-tech':'#f59e0b','equilibres-tech':'#8b5cf6','acide-base-tech':'#10b981',
  'electrochimie-tech':'#ef4444','organique-tech':'#06b6d4',
}

const IS_CHIMIE: Record<string,boolean> = {
  'cinetique-tech':true,'equilibres-tech':true,'acide-base-tech':true,
  'electrochimie-tech':true,'organique-tech':true,
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

'dipole-rc-tech': {
  id:'dipole-rc-tech', emoji:'🔌', tag:'Physique', color:'#4f6ef7',
  titre:'Dipôle RC',
  desc:"Condensateur (charge, décharge, E=½CU²), circuit RC : τ=RC, équation différentielle, courbes u_C(t), applications : filtrage passe-bas et temporisation électronique.",
  souschapitres:[
    {
      id:'sc-rc1', titre:'1.1 Condensateur et circuit RC',
      notions:['q=CU ; i=C·du_C/dt','τ=RC ; u_C=E(1−e^(−t/τ))','E_C=½CU²','Filtrage passe-bas (f_c=1/2πτ)'],
      blocs:[
        {
          notion:'🔌 Condensateur et réponse RC',
          theoremes:[
            { id:'D-RC1', type:'def', nom:'Condensateur',
              enonce:"Condensateur de capacité C :\nq = C·u_C  (charge en Coulombs)\ni = C·du_C/dt  (courant)\nÉNERGIE : E_C = ½Cu_C²\n\nEn régime continu permanent : i=0 → circuit ouvert\nLa tension u_C ne peut pas varier brutalement" },
            { id:'F-RC1', type:'formule', nom:'Charge et décharge RC',
              enonce:"CHARGE (condensateur déchargé au départ) :\nτ = RC  (constante de temps)\nu_C(t) = E·(1 − e^(−t/τ))\ni(t) = (E/R)·e^(−t/τ)\n\nÀ t=τ : u_C ≈ 0,63E\nÀ t=5τ : u_C ≈ E (régime permanent)\n\nDÉCHARGE :\nu_C(t) = U₀·e^(−t/τ)\ni(t) = −(U₀/R)·e^(−t/τ)\n\nAPPLICATION — Filtre passe-bas :\nFréquence de coupure : f_c = 1/(2πRC)\nSignaux basses fréquences passent, hautes sont atténuées",
              remarque:"Applications industrielles : filtrage des parasites dans les alimentations, temporisation dans les relais, circuit d'antirebond." },
            { id:'M-RC1', type:'methode', nom:'Lire τ graphiquement',
              enonce:"MÉTHODE 1 — Tangente à l'origine :\nTangente en t=0 coupe y=E en t=τ\n\nMÉTHODE 2 — Valeur à 63% :\nτ = temps pour u_C = 0,63·E\n\nVÉRIFICATION : τ = RC\n\nDIMENSIONS : [R]×[C] = Ω×F = s ✓" },
          ],
          exercices:[
            { id:'EX-RC1', niveau:'Facile', titre:'Constante de temps',
              enonce:"R=10kΩ, C=47μF. Calculer τ et l'énergie pour u_C=12V.",
              correction:"τ=10000×47×10⁻⁶=0,47s.\nE_C=½×47×10⁻⁶×144=3,38×10⁻³J=3,38mJ." },
            { id:'EX-RC2', niveau:'Intermédiaire', titre:'Fréquence de coupure',
              enonce:"Filtre RC : R=1kΩ, C=100nF. Fréquence de coupure ?",
              correction:"f_c=1/(2π×1000×100×10⁻⁹)=1/(2π×10⁻⁴)≈1592Hz≈1,6kHz." },
          ]
        },
      ]
    },
  ]
},

'dipole-rl-tech': {
  id:'dipole-rl-tech', emoji:'🌀', tag:'Physique', color:'#8b5cf6',
  titre:'Dipôle RL',
  desc:"Bobine : inductance L, FEM e_L=−L·di/dt, énergie E_L=½LI², réponse RL à un échelon τ=L/R. Applications : lissage de courant, protection contre surtensions.",
  souschapitres:[
    {
      id:'sc-rl1', titre:'2.1 Bobine et circuit RL',
      notions:['e_L=−L·di/dt ; E_L=½LI²','τ=L/R ; i=I_max(1−e^(−t/τ))','Protection surtension : diode de roue libre','Lissage du courant en alimentation DC'],
      blocs:[
        {
          notion:'🌀 Bobine et réponse RL',
          theoremes:[
            { id:'D-RL1', type:'def', nom:'Bobine — inductance',
              enonce:"Bobine d'inductance L (Henry) :\ne_L = −L·di/dt  (FEM d'auto-induction)\nu_L = L·di/dt  (tension aux bornes)\nÉNERGIE : E_L = ½LI²\n\nEn régime permanent DC : di/dt=0 → bobine = fil\ni ne peut pas varier brutalement (sinon |e_L|→∞)" },
            { id:'F-RL1', type:'formule', nom:'Établissement du courant dans RL',
              enonce:"ÉTABLISSEMENT :\nτ = L/R  ;  I_max = E/R\ni(t) = I_max·(1 − e^(−t/τ))\nu_L(t) = E·e^(−t/τ)\n\nRUPTURE DU COURANT :\ni(t) = I_max·e^(−t/τ)\n\nATTENTION : surtension lors de la rupture\nu_L = −L·di/dt → peut atteindre des milliers de volts\nProtection : diode de roue libre en antiparallèle\n\nAPPLICATIONS ST :\n• Lissage du courant en redressement\n• Inductance de choc dans les onduleurs\n• Moteurs électriques (bobinage du rotor)",
              remarque:"La bobine s'oppose aux variations de courant → rôle de lisseur. Utilisée dans toutes les alimentations à découpage." },
          ],
          exercices:[
            { id:'EX-RL1', niveau:'Facile', titre:'τ et I_max',
              enonce:"L=50mH, R=25Ω, E=5V. Calculer τ et I_max.",
              correction:"τ=L/R=0,05/25=2ms.\nI_max=E/R=5/25=0,2A." },
            { id:'EX-RL2', niveau:'Intermédiaire', titre:'Énergie emmagasinée',
              enonce:"Bobine L=0,5H, I=3A en régime permanent. Énergie ? Surtension à la rupture si Δt=1ms.",
              correction:"E_L=½×0,5×9=2,25J.\nu_L=L·ΔI/Δt=0,5×3/10⁻³=1500V → très dangereux !" },
          ]
        },
      ]
    },
  ]
},

'oscillations-lc-tech': {
  id:'oscillations-lc-tech', emoji:'〰️', tag:'Physique', color:'#06b6d4',
  titre:'Oscillations électriques libres',
  desc:"Circuit LC : oscillations libres, T₀=2π√(LC), conservation de l'énergie E_C+E_L=cste. Applications : circuits accordés, radio, télécommunications.",
  souschapitres:[
    {
      id:'sc-lc1', titre:'3.1 Circuit LC et oscillations',
      notions:['d²q/dt²+(1/LC)q=0','T₀=2π√(LC), f₀=1/(2π√(LC))','E_C+E_L=cste','Circuits accordés (radio, TV)'],
      blocs:[
        {
          notion:'〰️ Oscillations LC',
          theoremes:[
            { id:'F-LC1', type:'formule', nom:'Circuit LC — équation et période',
              enonce:"Loi des mailles : u_C + u_L = 0\nL·d²q/dt² + q/C = 0\n\nSOLUTION :\nq(t) = Q_max·cos(ω₀t + φ)\nω₀ = 1/√(LC) ; T₀ = 2π√(LC) ; f₀ = 1/(2π√(LC))\n\nÉNERGIE CONSERVÉE :\nE = ½Cu_C² + ½Li² = constante\n\nÉCHANGES PÉRIODIQUES :\nMax E_C (i=0) ↔ Max E_L (u_C=0)" },
            { id:'D-LC2', type:'def', nom:'Applications : circuits accordés ST',
              enonce:"CIRCUIT ACCORDÉ (RLC en résonance) :\nf_r = f₀ = 1/(2π√(LC))\nRésonance : amplitude maximale à f=f_r\n\nAPPLICATIONS EN TÉLÉCOMMUNICATIONS :\n• Sélection de la fréquence radio (tuner)\n• Filtre de fréquence\n• Oscillateur de référence (horloge)\n• Antenne accordée\n\nPRINCIPE DE LA RADIO :\nChaque station émet à une fréquence f\nOn ajuste L ou C pour que f₀=f → résonance → réception\n\nEXEMPLE : FM 100MHz\nf₀=100×10⁶Hz → LC=(1/(2π×10⁸))²≈2,5×10⁻¹⁸ H·F",
              remarque:"En ST : la résonance est un concept clé dans l'électronique de communication et les systèmes de contrôle." },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Facile', titre:'Fréquence propre',
              enonce:"L=250μH, C=100pF. Calculer f₀ (fréquence d'un circuit radio).",
              correction:"f₀=1/(2π√(250×10⁻⁶×100×10⁻¹²))=1/(2π√(2,5×10⁻¹⁴)).\n√(2,5×10⁻¹⁴)=1,58×10⁻⁷.\nf₀=1/(2π×1,58×10⁻⁷)≈10⁶Hz=1MHz." },
          ]
        },
      ]
    },
  ]
},

'oscillations-mec-tech': {
  id:'oscillations-mec-tech', emoji:'🔔', tag:'Physique', color:'#10b981',
  titre:'Oscillations mécaniques libres',
  desc:"Pendule T=2π√(l/g), masse-ressort T=2π√(m/k), énergie mécanique, amortissement. Applications ST : amortisseurs, suspensions, horloges.",
  souschapitres:[
    {
      id:'sc-mec1', titre:'4.1 Pendule, masse-ressort et applications ST',
      notions:['T_pendule=2π√(l/g)','T_ressort=2π√(m/k)','Em conservée sans frottements','Amortisseurs : absorber les vibrations'],
      blocs:[
        {
          notion:'🔔 Oscillateurs mécaniques — applications',
          theoremes:[
            { id:'F-OM1', type:'formule', nom:'Périodes propres',
              enonce:"PENDULE SIMPLE (petites oscillations) :\nT = 2π√(l/g)\nω₀ = √(g/l)\nT indépendant de m et θ_max → isochronisme\n\nMASSE-RESSORT :\nT = 2π√(m/k)\nω₀ = √(k/m)\n\nÉNERGIE MÉCANIQUE :\nEm = ½mv² + mgh = ½mv² + ½kx² = constante (sans frottements)\n\nAMORTISSEMENT :\nEm décroît → énergie dissipée par friction\nOscillations de plus en plus faibles",
              remarque:"Applications ST : horloge à pendule (précision), amortisseur hydraulique (automobile), résonateur à quartz (montre)." },
            { id:'D-OM2', type:'def', nom:'Applications industrielles ST',
              enonce:"AMORTISSEURS AUTOMOBILE :\nButée mécanique + amortisseur hydraulique\nEvite la résonance de la suspension\nCoeff. amortissement ζ optimal ≈ 0,7 (amorti critique)\n\nSUSPENSION DE BÂTIMENT (parasismique) :\nIsolateurs à la base (ressorts + amortisseurs)\nDécalage de la fréquence propre loin des fréquences sismiques\n\nHORLOGE À PENDULE :\nT = 2π√(l/g) → régulier et précis\nRéglage : ajuster l pour changer T\n\nGYROSCOPE ET GUIDAGE INERTIEL :\nConservation du moment cinétique → maintien de la direction" },
          ],
          exercices:[
            { id:'EX-OM1', niveau:'Facile', titre:'Période d\'un pendule',
              enonce:"Pendule l=0,8m sur Terre (g=9,8m/s²). Période ?",
              correction:"T=2π√(0,8/9,8)=2π×0,286≈1,8s." },
            { id:'EX-OM2', niveau:'Intermédiaire', titre:'Ressort industriel',
              enonce:"Masse m=5kg sur ressort k=800N/m. Fréquence d'oscillation ?",
              correction:"T=2π√(5/800)=2π×0,0791≈0,497s.\nf=1/T≈2,01Hz." },
          ]
        },
      ]
    },
  ]
},

'ondes-mec-tech': {
  id:'ondes-mec-tech', emoji:'🌊', tag:'Physique', color:'#f59e0b',
  titre:'Ondes mécaniques progressives',
  desc:"Propagation d'ondes, célérité v, λ=vT, retard temporel, réflexion et réfraction. Applications ST : contrôle par ultrasons, sonar, acoustique industrielle.",
  souschapitres:[
    {
      id:'sc-ondes1', titre:'5.1 Ondes et applications industrielles',
      notions:['λ=v·T=v/f','Retard Δt=d/v','Déphasage Δφ=2π·d/λ','Ultrasons : CND, échographie'],
      blocs:[
        {
          notion:'🌊 Ondes mécaniques — applications ST',
          theoremes:[
            { id:'F-ON1', type:'formule', nom:'Relations fondamentales des ondes',
              enonce:"λ = v·T = v/f\n\nRETARD TEMPOREL (entre A et B séparés de d) :\nΔt = d/v\n\nDÉPHASAGE :\nΔφ = 2π·Δt/T = 2π·d/λ\n\nONDES TRANSVERSALES : vibration ⊥ propagation\n(corde, séismes S)\nONDES LONGITUDINALES : vibration ∥ propagation\n(son, ultrasons, séismes P)" },
            { id:'D-ON2', type:'def', nom:'Applications industrielles des ultrasons',
              enonce:"ULTRASONS (f > 20 000 Hz) :\nNon audibles par l'homme\nCélérité dans l'acier : v ≈ 6000 m/s\nCélérité dans l'eau : v ≈ 1500 m/s\n\nCONTRÔLE NON DESTRUCTIF (CND) :\nÉmettre une impulsion ultrasonore\nMesurer le temps d'écho : t = 2d/v\nd = v·t/2 → localiser les défauts\n\nÉCHOGRAPHIE MÉDICALE :\nMême principe, f = 2-20 MHz\nImager les organes par réflexion ultrasonore\n\nSONAR MARIN :\nd = v_eau·t/2 → profondeur ou distance des sous-marins\n\nNETTOYAGE PAR ULTRASONS :\nCavitation acoustique → nettoyage de pièces",
              remarque:"Le CND ultrasonore remplace les rayons X pour contrôler les soudures, les pièces métalliques et les structures sans les détruire." },
          ],
          exercices:[
            { id:'EX-ON1', niveau:'Facile', titre:'CND ultrasonore',
              enonce:"Contrôle d'une pièce en acier (v=6000m/s). Echo reçu à t=10μs après émission. Profondeur du défaut ?",
              correction:"d=v·t/2=6000×10⁻⁵/2=0,03m=3cm." },
            { id:'EX-ON2', niveau:'Intermédiaire', titre:'Sonar',
              enonce:"Sonar marin : impulsion ultrasonore, écho après 2s. v_eau=1500m/s. Distance du fond ?",
              correction:"d=v·t/2=1500×2/2=1500m." },
          ]
        },
      ]
    },
  ]
},

'ondes-lum-tech': {
  id:'ondes-lum-tech', emoji:'🌈', tag:'Physique', color:'#14b8a6',
  titre:'Ondes lumineuses',
  desc:"Diffraction (λ≈a), interférences (i=λD/a), indice de réfraction n=c/v, loi de Snell-Descartes. Applications ST : laser industriel, fibre optique, contrôle qualité.",
  souschapitres:[
    {
      id:'sc-ol1', titre:'6.1 Diffraction, interférences et réfraction',
      notions:['Diffraction : λ≈a','Interfrange i=λD/a','n=c/v, Snell-Descartes n₁sinθ₁=n₂sinθ₂','Réflexion totale interne : fibres optiques'],
      blocs:[
        {
          notion:'🌈 Optique et applications industrielles',
          theoremes:[
            { id:'F-OL1', type:'formule', nom:'Diffraction, interférences et réfraction',
              enonce:"DIFFRACTION (observable si λ ≈ a) :\nTaille tache centrale : L = 2λD/a\n\nFENTES D'YOUNG :\nInterfrange : i = λD/a\nBrillante : δ = kλ\nSombre : δ = (2k+1)λ/2\nMesure de λ : λ = ia/D\n\nINDICE DE RÉFRACTION :\nn = c/v = λ_vide/λ_milieu\n\nSNELL-DESCARTES :\nn₁·sinθ₁ = n₂·sinθ₂\n\nRÉFLEXION TOTALE INTERNE :\nSi n₁ > n₂ et θ₁ ≥ θ_c avec sinθ_c = n₂/n₁" },
            { id:'D-OL2', type:'def', nom:'Applications ST — Laser et fibre optique',
              enonce:"LASER INDUSTRIEL :\nLumière cohérente et monochromatique\nApplications : découpe et soudure de métaux\n→ F = 10-50 kW/cm² → coupe l'acier\nMarquage et gravure de pièces\nMétrologie de précision (μm)\n\nFIBRE OPTIQUE :\nRéflexion totale interne : θ > θ_c = arcsin(n₂/n₁)\nCœur (n₁ ≈ 1,5) + gaine (n₂ ≈ 1,45)\nθ_c ≈ 75° → transmission quasi-totale\n\nAPPLICATIONS :\n• Télécommunications (Internet, téléphone)\n• Endoscope médical\n• Capteurs de température/pression\n• Réseaux industriels (vitesse, immunité EM)\n\nCONTRÔLE QUALITÉ OPTIQUE :\nInterférométrie : mesure de planéité < λ/4\nDétection de défauts de surface par diffraction",
              remarque:"La fibre optique a remplacé les câbles électriques dans les télécommunications : débit 1000× supérieur, immunité aux interférences électromagnétiques." },
          ],
          exercices:[
            { id:'EX-OL1', niveau:'Facile', titre:'Angle critique fibre optique',
              enonce:"Fibre : n₁=1,5 (cœur), n₂=1,46 (gaine). Angle critique θ_c ?",
              correction:"sinθ_c=n₂/n₁=1,46/1,5=0,973.\nθ_c=arcsin(0,973)≈76,7°." },
            { id:'EX-OL2', niveau:'Intermédiaire', titre:'Mesure par interférences',
              enonce:"Laser λ=633nm, fentes a=0,5mm, D=1m. Interfrange ?",
              correction:"i=λD/a=633×10⁻⁹×1/(0,5×10⁻³)=1,27×10⁻³m=1,27mm." },
          ]
        },
      ]
    },
  ]
},

'nucleaire-tech': {
  id:'nucleaire-tech', emoji:'☢️', tag:'Physique', color:'#ef4444',
  titre:'Réactions nucléaires',
  desc:"Radioactivité (α, β, γ), loi de décroissance N=N₀e^(−λt), demi-vie t₁/₂=ln2/λ, E=Δm·c². Applications ST : médecine nucléaire, datation, radioprotection.",
  souschapitres:[
    {
      id:'sc-nuc1', titre:'7.1 Radioactivité, décroissance et applications',
      notions:['N(t)=N₀·e^(−λt) ; t₁/₂=ln2/λ','α (He), β (e⁻), γ (photon)','E=Δm·c² (Einstein)','Médecine nucléaire, datation, radioprotection'],
      blocs:[
        {
          notion:'☢️ Réactions nucléaires — applications ST',
          theoremes:[
            { id:'F-NR1', type:'formule', nom:'Loi de décroissance radioactive',
              enonce:"N(t) = N₀·e^(−λt)\nA(t) = λ·N(t) = A₀·e^(−λt)  (activité en Bq)\nm(t) = m₀·e^(−λt)  (masse radioactive)\n\nDEMI-VIE : t₁/₂ = ln2/λ ≈ 0,693/λ\nN(n·t₁/₂) = N₀/2ⁿ\n\nÉNERGIE NUCLÉAIRE :\nE = Δm·c² (Δm = défaut de masse)\n1 uma = 931,5 MeV\n\nRADIODATATION (Carbone 14) :\nt₁/₂(C14) = 5730 ans\nt = t₁/₂·log₂(A₀/A_mesurée)" },
            { id:'D-NR2', type:'def', nom:'Applications industrielles et médicales',
              enonce:"MÉDECINE NUCLÉAIRE :\nDiagnostic par imagerie (scintigraphie) :\n→ Tc-99m : t₁/₂=6h, γ, utilisé car courte durée + faible dose\nTraitement par radiothérapie :\n→ Co-60, Ir-192 : irradiation des tumeurs\n\nDATATION ARCHÉOLOGIQUE :\nCarbone 14 : t₁/₂=5730 ans\nMesurer l'activité → calculer l'âge\n\nINDUSTRIE NUCLÉAIRE :\nContrôle de niveau (jauge radiométrique)\nStérilisation des instruments médicaux\nDéfauts de soudure (γ-graphie)\n\nRADIOPROTECTION :\nα : arrêté par feuille papier (dangereux si ingéré)\nβ : arrêté par quelques mm d'aluminium\nγ : nécessite blindage plomb/béton\nDose : Sievert (Sv) ; limite annuelle 1mSv",
              remarque:"Le Tc-99m est l'isotope le plus utilisé en médecine nucléaire (80% des examens) car sa demi-vie de 6h permet l'examen sans contamination prolongée." },
          ],
          exercices:[
            { id:'EX-NR1', niveau:'Facile', titre:'Activité résiduelle',
              enonce:"A₀=800MBq d'iode-131 (t₁/₂=8j). Activité après 24j ?",
              correction:"Nombre de demi-vies = 24/8=3.\nA=800/2³=800/8=100MBq." },
            { id:'EX-NR2', niveau:'Intermédiaire', titre:'Datation C14',
              enonce:"Objet archéologique : A=0,12A₀. Âge ? (t₁/₂=5730ans)",
              correction:"N=N₀·e^(−λt) → t=−ln(A/A₀)/λ=−ln(0,12)×t₁/₂/ln2.\nt=2,12×5730/0,693≈17540 ans." },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// ████  CHIMIE — 5 CHAPITRES
// ══════════════════════════════════════════════════════════════════════

'cinetique-tech': {
  id:'cinetique-tech', emoji:'⏱️', tag:'Chimie', color:'#f59e0b',
  titre:'Cinétique chimique',
  desc:"Vitesse v=−d[A]/dt, facteurs cinétiques, t₁/₂, catalyse. Applications ST : optimisation des procédés industriels, contrôle de production.",
  souschapitres:[
    {
      id:'sc-ck1', titre:'8.1 Vitesse, facteurs et applications industrielles',
      notions:['v=−d[A]/dt ; t₁/₂','Concentration, T, catalyseur, surface','Catalyse : homogène, hétérogène, enzymatique','Optimisation industrielle : Haber, Contact'],
      blocs:[
        {
          notion:'⏱️ Cinétique et procédés industriels',
          theoremes:[
            { id:'D-CK1', type:'def', nom:'Vitesse de réaction et facteurs',
              enonce:"VITESSE VOLUMIQUE :\nv = −(1/a)·d[A]/dt  (mol·L⁻¹·s⁻¹)\n\nGRAPHIQUEMENT :\nv(t) = |pente tangente à [A](t)|\n\nTEMPS DE DEMI-RÉACTION t₁/₂ :\n[A](t₁/₂) = [A]₀/2\n\nFACTEURS CINÉTIQUES :\n• CONCENTRATION : [R]↑ → v↑\n• TEMPÉRATURE : T↑ → v↑ fortement (Arrhenius)\n• CATALYSEUR : abaisse Ea → v↑ (non consommé)\n• SURFACE : solide divisé → v↑" },
            { id:'D-CK2', type:'def', nom:'Applications industrielles ST',
              enonce:"SYNTHÈSE DE L'AMMONIAC (procédé Haber) :\nN₂ + 3H₂ ⇌ 2NH₃  ΔH<0\nCatalyseur : Fe (hétérogène)\nT = 450°C, P = 200 atm\nCompromis : T élevée (v↑ mais K↓) + P élevée (K↑)\n\nACIDE SULFURIQUE (procédé Contact) :\n2SO₂ + O₂ → 2SO₃  (V₂O₅ catalyseur)\nSO₃ + H₂O → H₂SO₄\n\nRAFFINAGE DU PÉTROLE :\nCraquage catalytique → casse les grosses molécules\nRéforming → améliore l'indice d'octane\n\nPILE À COMBUSTIBLE :\nH₂ + ½O₂ → H₂O (électrochimie)\nCatalyseur Pt → accélère les réactions d'électrode",
              remarque:"Le catalyseur industriel est souvent coûteux (Pt, Pd, V₂O₅) → recyclage et régénération sont essentiels pour la rentabilité." },
          ],
          exercices:[
            { id:'EX-CK1', niveau:'Facile', titre:'Vitesse initiale',
              enonce:"[A]₀=1mol/L. Pente tangente à t=0 : −0,05 mol·L⁻¹·s⁻¹. Vitesse initiale ?",
              correction:"v₀=0,05 mol·L⁻¹·s⁻¹." },
          ]
        },
      ]
    },
  ]
},

'equilibres-tech': {
  id:'equilibres-tech', emoji:'⚖️', tag:'Chimie', color:'#8b5cf6',
  titre:'Équilibres chimiques',
  desc:"Avancement final τ=x_f/x_max, Qr vs K, loi de Le Chatelier. Applications ST : synthèse industrielle (Haber), traitement des eaux, optimisation des procédés.",
  souschapitres:[
    {
      id:'sc-eq1', titre:'9.1 Équilibre chimique et optimisation industrielle',
      notions:['τ=x_f/x_max (taux d\'avancement)','Qr<K→sens direct ; Qr>K→sens inverse','Le Chatelier : concentration, T, P','Optimisation : Haber (NH₃), Contact (H₂SO₄)'],
      blocs:[
        {
          notion:'⚖️ Équilibre et applications ST',
          theoremes:[
            { id:'M-EQ1', type:'methode', nom:'Tableau d\'avancement et taux τ',
              enonce:"Tableau d'avancement pour aA + bB ⇌ cC + dD :\nÉtat init : n(A)₀, n(B)₀, 0, 0\nAvancement x : n(A)₀−ax, n(B)₀−bx, cx, dx\n\nRÉACTIF LIMITANT :\nx_max = min(n(A)₀/a ; n(B)₀/b)\n\nTAUX D'AVANCEMENT FINAL :\nτ = x_f / x_max\nτ=1 : totale ; 0<τ<1 : limitée" },
            { id:'T-EQ1', type:'thm', nom:'Le Chatelier et optimisation industrielle',
              enonce:"LOI DE LE CHATELIER :\nToute perturbation déplace l'équilibre dans le sens qui l'atténue\n\nN₂ + 3H₂ ⇌ 2NH₃  ΔH = −92kJ (exothermique)\n\nMAXIMISER NH₃ :\n• T basse → sens direct (exo) ✓ mais v lente ✗\n  → Compromis : T=450°C + Fe (catalyseur)\n• P élevée (200 atm) → côté 2 moles NH₃ < 4 moles ✓\n• Retirer NH₃ en continu → équilibre déplacé vers le sens direct\n\nTRAITEMENT DES EAUX :\nAjuster le pH → déplacer les équilibres d'acidité\nCO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻\n\nSOLUBILITÉ DES MÉTAUX :\nContrôler les précipitations par ajustement du pH",
              remarque:"Le procédé Haber est le meilleur exemple de compromis cinétique/thermodynamique en industrie : 500 millions de tonnes de NH₃/an = 50% de l'azote des engrais mondiaux." },
          ],
          exercices:[
            { id:'EX-EQ1', niveau:'Facile', titre:'Taux d\'avancement',
              enonce:"Estérification : 1 mol acide + 1 mol alcool, x_f=0,67 mol. τ ?",
              correction:"x_max=1 mol. τ=0,67/1=67%." },
            { id:'EX-EQ2', niveau:'Intermédiaire', titre:'Déplacer l\'équilibre',
              enonce:"N₂+3H₂⇌2NH₃. On augmente la pression. Sens d\'évolution ?",
              correction:"Côté réactifs : 1+3=4 mol. Côté produits : 2 mol.\nAugmenter P → sens qui diminue le nb de moles de gaz → sens direct → production de NH₃." },
          ]
        },
      ]
    },
  ]
},

'acide-base-tech': {
  id:'acide-base-tech', emoji:'🧪', tag:'Chimie', color:'#10b981',
  titre:'Acides et bases',
  desc:"pH, Ka, pKa, diagramme de prédominance, dosage acide-base (pH-métrie, indicateurs colorés). Applications ST : contrôle qualité, traitement des eaux, environnement.",
  souschapitres:[
    {
      id:'sc-ab1', titre:'10.1 pH, Ka et dosage — applications industrielles',
      notions:['pH=−log[H₃O⁺] ; pKa=−log Ka','Diagramme prédominance : pH vs pKa','Dosage : équivalence n_a×C_a×V_a=n_b×C_b×V_b','Contrôle eaux industrielles et potables'],
      blocs:[
        {
          notion:'🧪 Acide-base — contrôle industriel',
          theoremes:[
            { id:'F-AB1', type:'formule', nom:'pH, Ka et dosage',
              enonce:"pH = −log[H₃O⁺]  ;  [H₃O⁺] = 10^(−pH)\nKe = 10⁻¹⁴  ;  pH + pOH = 14\n\nACIDE FORT : [H₃O⁺]=C → pH=−logC\nACIDE FAIBLE : [H₃O⁺]=√(Ka·C) → pH=½(pKa−logC)\n\nDIAGRAMME DE PRÉDOMINANCE :\npH < pKa → AH prédomine\npH = pKa → [AH]=[A⁻]\npH > pKa → A⁻ prédomine\n\nDOSAGE (équivalence) :\nn_a·C_a·V_a = n_b·C_b·V_b" },
            { id:'D-AB2', type:'def', nom:'Applications ST — contrôle qualité',
              enonce:"TRAITEMENT DES EAUX INDUSTRIELLES :\npH optimal eau potable : 6,5 à 8,5\nNeutralisation des effluents acides : ajout de NaOH\nNeutralisation des effluents basiques : ajout de HCl ou CO₂\n\nINDUSTRIE AGROALIMENTAIRE :\nContrôle du pH de fermentation (yaourt, bière)\nConservation par acidification (pH<4,6 → inhibition bactéries)\n\nINDUSTRIE PHARMACEUTIQUE :\npH des médicaments injectables : 7,0−7,8 (sang)\nStabilité des principes actifs selon le pH\n\nINDUSTRIE PAPETIÈRE :\npH du milieu de fabrication → qualité du papier\n\nCORROSION :\npH bas → corrosion accélérée des métaux\nProtection : tamponner le pH au-dessus de 7",
              remarque:"La pH-métrie en continu est un outil standard de surveillance dans toutes les usines de traitement de l'eau et de l'industrie chimique." },
          ],
          exercices:[
            { id:'EX-AB1', niveau:'Facile', titre:'pH d\'un effluent acide',
              enonce:"Effluent industriel : HCl à C=0,05mol/L. pH à neutraliser à pH=7 avec NaOH à 1mol/L. Volume ?",
              correction:"pH=−log(0,05)≈1,3 (acide fort).\nPour neutraliser : n(HCl)=n(NaOH).\nV(NaOH)=C(HCl)×V(HCl)/C(NaOH)=0,05/1×V(HCl). Ratio : 0,05 L de NaOH pour 1L d'effluent." },
          ]
        },
      ]
    },
  ]
},

'electrochimie-tech': {
  id:'electrochimie-tech', emoji:'⚗️', tag:'Chimie', color:'#ef4444',
  titre:'Électrochimie',
  desc:"Réactions redox, couples Ox/Red, piles, corrosion des métaux et protection (galvanisation, anode sacrificielle), électrolyse industrielle, loi de Faraday.",
  souschapitres:[
    {
      id:'sc-elec1', titre:'11.1 Redox, piles et corrosion — applications ST',
      notions:['Couples Ox/Red ; demi-équations','Piles : anode (−, oxydation), cathode (+, réduction)','Corrosion : mécanisme électrochimique','Protection : revêtement, galvanisation, anode sacrificielle'],
      blocs:[
        {
          notion:'⚗️ Électrochimie industrielle',
          theoremes:[
            { id:'D-EL1', type:'def', nom:'Réactions redox et piles',
              enonce:"COUPLES OX/RED : Ox + ne⁻ ⇌ Red\n\nPILE GALVANIQUE :\nAnode (−) : oxydation\nCathode (+) : réduction\nFEM = V(+) − V(−) > 0\n\nLOI DE FARADAY :\nm = M·I·t / (n·F)\nF = 96500 C/mol\n\nÉLECTROLYSE :\nAnode (+) : oxydation\nCathode (−) : réduction" },
            { id:'D-EL2', type:'def', nom:'Corrosion et protection — applications ST',
              enonce:"CORROSION ÉLECTROCHIMIQUE :\nDeux métaux différents en contact + électrolyte → pile locale\nMétal moins noble (réducteur) = anode → se corrode\n\nEXEMPLE : Fe en contact avec Cu (eau salée)\nFe → Fe²⁺ + 2e⁻  (anode, se corrode)\nCu²⁺ + 2e⁻ → Cu  (cathode, protégée)\n\nPROTECTION DE L'ACIER :\n\n1. REVÊTEMENT (zingage, peinture) :\nIsoler le métal de l'environnement\n\n2. GALVANISATION (zingage à chaud) :\nCouche de Zn (E°Zn/Zn²⁺ < E°Fe/Fe²⁺)\nZn s'oxyde en premier → protège le Fe\nMême si la couche est rayée : Zn continue à protéger\n\n3. ANODE SACRIFICIELLE :\nAttacher un métal moins noble (Mg, Al, Zn)\n→ Se corrode à la place du métal à protéger\n→ Navires, pipelines, structures offshore\n\n4. PROTECTION CATHODIQUE :\nImpulser un courant contraire → forcer le métal à être cathode\n→ Canalisations enterrées",
              remarque:"La galvanisation par Zn est la protection la plus économique de l'acier. Le Zn vaut moins cher que Fe mais est électrochimiquement plus actif → sacrificiel naturel." },
          ],
          exercices:[
            { id:'EX-EL1', niveau:'Facile', titre:'Loi de Faraday',
              enonce:"Dépôt de Cr (M=52g/mol, n=3) : I=5A, t=1h. Masse déposée ?",
              correction:"m=52×5×3600/(3×96500)=936000/289500≈3,23g." },
            { id:'EX-EL2', niveau:'Intermédiaire', titre:'Corrosion — identifier l\'anode',
              enonce:"Tige en Fe en contact avec tige en Cu, immergées dans eau salée. Quel métal se corrode ?",
              correction:"E°(Fe²⁺/Fe)=−0,44V < E°(Cu²⁺/Cu)=+0,34V.\nFe est plus réducteur → Fe est l'anode → Fe se corrode.\nCu est la cathode → Cu est protégé." },
          ]
        },
      ]
    },
  ]
},

'organique-tech': {
  id:'organique-tech', emoji:'🔬', tag:'Chimie', color:'#06b6d4',
  titre:'Chimie organique',
  desc:"Composés carbonylés (aldéhydes, cétones), acides carboxyliques, estérification, hydrolyse. Polymères : polyaddition et polycondensation. Applications : plastiques, fibres, biocarburants.",
  souschapitres:[
    {
      id:'sc-org1', titre:'12.1 Composés carbonylés et estérification',
      notions:['Aldéhyde −CHO, cétone >C=O','Tests : Fehling (aldéhyde), DNPH (C=O)','Estérification : acide + alcool ⇌ ester + H₂O','Hydrolyse et saponification'],
      blocs:[
        {
          notion:'🧬 Fonctions organiques',
          theoremes:[
            { id:'D-OR1', type:'def', nom:'Composés carbonylés',
              enonce:"ALDÉHYDE −CHO (extrémité de chaîne) :\nFormule : RCHO\nRéducteur → réagit avec Fehling (précipité rouge Cu₂O)\nRéagit avec DNPH → précipité jaune-orangé\n\nCÉTONE >C=O (milieu de chaîne) :\nFormule : RCOR'\nNon réducteur → ne réagit PAS avec Fehling\nRéagit avec DNPH → précipité jaune-orangé\n\nIDENTIFICATION :\nDNPH + précipité : C=O présent (aldéhyde ou cétone)\nFehling + précipité rouge : aldéhyde\nFehling sans précipité : cétone\n\nACIDE CARBOXYLIQUE −COOH :\npKa ≈ 4-5 (acide faible)" },
            { id:'D-OR2', type:'def', nom:'Estérification et applications',
              enonce:"ESTÉRIFICATION :\nAcide + Alcool ⇌ Ester + H₂O\nCatalyseur : H⁺  ;  Lente, limitée, athermique\n\nNOMENCLATURE :\nEster = alcanoate d'alkyle\n\nHYDROLYSE : ester + H₂O ⇌ acide + alcool (limitée)\nSAPONIFICATION : ester + NaOH → alcool + carboxylate (totale)\n\nBIOCARBURANTS :\nHuile végétale + méthanol ⇌ biodiesel + glycérol\n(transestérification, catalyse NaOH)\nBiodiesel = FAME (Fatty Acid Methyl Ester)\n\nPARFUMERIE ET ARÔMES :\nÉthanoate d'isoamyle : odeur banane\nButanoate d'éthyle : odeur ananas" },
          ],
          exercices:[
            { id:'EX-OR1', niveau:'Facile', titre:'Test Fehling',
              enonce:"CH₃CHO et CH₃COCH₃ mis avec liqueur de Fehling. Résultats ?",
              correction:"CH₃CHO (aldéhyde) : précipité rouge-brique (Cu₂O). ✓\nCH₃COCH₃ (cétone) : pas de réaction avec Fehling. ✗" },
          ]
        },
      ]
    },
    {
      id:'sc-org2', titre:'12.2 Polymères et matériaux technologiques',
      notions:['Polyaddition : PE, PVC, PS (monomères insaturés)','Polycondensation : polyesters, polyamides (Nylon)','Plastiques thermoplastiques vs thermodurcissables','Biocarburants, bioplastiques'],
      blocs:[
        {
          notion:'⚙️ Polymères et matériaux ST',
          theoremes:[
            { id:'D-OR3', type:'def', nom:'Polymères — synthèse et applications',
              enonce:"POLYADDITION (monomères C=C) :\nn CH₂=CH₂ → −(CH₂−CH₂)ₙ− (polyéthylène PE)\nn CH₂=CHCl → PVC\nn CH₂=CHCH₃ → polypropylène PP\nDegré de polymérisation n = M/M_monomère\n\nPOLYCONDENSATION (élimination d'eau/HCl) :\nPolyesters : diacide + diol → PET, polyester\nPolyamides : diacide + diamine → Nylon 6-6\n\nPROPRIÉTÉS MÉCANIQUES :\nThermoplastiques : fondent → moulage par injection\n(PE, PVC, PP, Nylon)\nThermodurcissables : réticulés → résistants T élevée\n(époxy, bakélite, mélamine)\n\nAPPLICATIONS ST :\n• PVC : tuyaux, câbles électriques, fenêtres\n• PE : sachets, flacons, isolants\n• Nylon : engrenages, roulements, fibres textiles\n• Époxy : colles, résines composites, circuits imprimés\n• Fibre de carbone + époxy : pièces aéronautiques",
              remarque:"Les matériaux composites (fibre de carbone + époxy) pèsent 5× moins que l'acier pour une résistance équivalente → usage intensif en aéronautique (Boeing 787 : 50% composite)." },
          ],
          exercices:[
            { id:'EX-OR2', niveau:'Facile', titre:'Degré de polymérisation',
              enonce:"PET : M=100000g/mol, monomère (M=192g/mol). Degré n ?",
              correction:"n=M/M_monomère=100000/192≈521." },
            { id:'EX-OR3', niveau:'Intermédiaire', titre:'Biodiesel',
              enonce:"Triglycéride M=884g/mol + 3 méthanol (M=32g/mol) → 3 FAME + glycérol. Si 1 tonne de triglycéride, masse de biodiesel ?",
              correction:"n_triglycéride=10⁶/884≈1131mol.\n3 FAME par mol → n_FAME=3393mol.\nM_FAME≈296g/mol (exemple). m=3393×296≈1004kg≈1 tonne." },
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
export default function PhysiqueScTechSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'dipole-rc-tech'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
          <h2>Chapitre non trouvé</h2>
          <Link href="/bac/physique/sciences-tech" style={{ color:'#10b981' }}>← Retour Sc. Tech.</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#10b981'
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
          <Link href="/bac/physique/sciences-tech" style={{ color:'var(--muted)', textDecoration:'none' }}>Sc. Tech.</Link><span>›</span>
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
                  <span style={{ fontSize:11, background:'rgba(16,185,129,0.15)',
                    color:'#34d399', padding:'2px 9px', borderRadius:10 }}>
                    {isChimie ? '🧪 Chimie' : '⚛️ Physique'} · Sc. Tech. · Tunisie
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Physique-Chimie Sc.Tech. Bac Tunisie')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`, color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
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
                                      <Link href={`/solve?q=${encodeURIComponent('Physique-Chimie Sc.Tech. Tunisie — '+ex.enonce)}`}
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
                  <Link href={`/bac/physique/sciences-tech/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/physique/sciences-tech/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  fontSize:11, color:'#4f6ef7', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(79,110,247,0.08)' }}>⚛️ Physique — 7 chapitres</div>
                {PHYS_SLUGS.map(s => (
                  <Link key={s} href={`/bac/physique/sciences-tech/${s}`} style={{ textDecoration:'none' }}>
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
                        {TITRES_NAV[s].replace(/CH \d+ — /,'').slice(0,28)}
                      </div>
                    </div>
                  </Link>
                ))}
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#10b981', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(16,185,129,0.08)' }}>🧪 Chimie — 5 chapitres</div>
                {CHIM_SLUGS.map(s => (
                  <Link key={s} href={`/bac/physique/sciences-tech/${s}`} style={{ textDecoration:'none' }}>
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
                        {TITRES_NAV[s].replace(/CH \d+ — /,'').slice(0,28)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Sc.Tech. Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.tag}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/physique/sciences-tech" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
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