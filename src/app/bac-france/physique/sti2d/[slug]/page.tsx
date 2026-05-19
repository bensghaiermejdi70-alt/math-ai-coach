'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE STI2D / [SLUG]
// Route : /bac-france/physique/sti2d/[slug]
// Programme officiel STI2D — Première & Terminale
// 8 chapitres : Métrologie + 5 formes d'énergie + Matériaux + Ondes
// Accent STI2D : systèmes industriels, rendement, énergie
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#8b5cf6', def:'#06d6a0', formule:'#f59e0b', prop:'#06b6d4', methode:'#ec4899', loi:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', loi:'Loi' }

const NAV_ORDER = [
  'mesures-sti2d',
  'energie-chimique','energie-electrique','energie-thermique',
  'energie-mecanique-sti2d','energie-lumineuse',
  'materiaux','ondes-information',
]

const TITRES_NAV: Record<string,string> = {
  'mesures-sti2d':          'CH 00 — Mesures & Incertitudes',
  'energie-chimique':       'CH 01 — Énergie chimique & Combustions',
  'energie-electrique':     'CH 02 — Énergie électrique & AC/DC',
  'energie-thermique':      'CH 03 — Énergie thermique & Transferts',
  'energie-mecanique-sti2d':'CH 04 — Énergie mécanique & Puissance',
  'energie-lumineuse':      'CH 05 — Énergie lumineuse & Photovoltaïque',
  'materiaux':              'CH 06 — Matière & Matériaux',
  'ondes-information':      'CH 07 — Ondes & Information',
}

const SEC_COLORS: Record<string,string> = {
  'mesures-sti2d':'#6b7280',
  'energie-chimique':'#f59e0b','energie-electrique':'#f59e0b',
  'energie-thermique':'#f59e0b','energie-mecanique-sti2d':'#f59e0b','energie-lumineuse':'#f59e0b',
  'materiaux':'#10b981','ondes-information':'#8b5cf6',
}

const SEC_LABEL: Record<string,string> = {
  'mesures-sti2d':'📏 Métrologie',
  'energie-chimique':'⚡ Énergie','energie-electrique':'⚡ Énergie',
  'energie-thermique':'⚡ Énergie','energie-mecanique-sti2d':'⚡ Énergie','energie-lumineuse':'⚡ Énergie',
  'materiaux':'⚗️ Matériaux','ondes-information':'🌊 Ondes',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 00 — MESURES & INCERTITUDES
// ─────────────────────────────────────────────────────────────────────
'mesures-sti2d': {
  id:'mesures-sti2d', emoji:'📏', badge:'Métrologie', color:'#6b7280',
  titre:'Mesures & Incertitudes',
  desc:"Incertitude-type de type A (répétitions statistiques) et type B (instrumentale), incertitude composée, incertitude élargie U=2u_c, présentation du résultat, critère de compatibilité.",
  souschapitres:[
    {
      id:'sc-mes1', titre:'0.1 Incertitudes de type A et B',
      notions:['Type A : u_A=s/√n (statistique)','Type B : u_B=demi-étendue/√3 (instrument)','Incertitude composée : u_c=√(u_A²+u_B²)','Résultat : x=x̄±U avec U=2u_c (k=2)'],
      blocs:[
        {
          notion:'📏 Incertitudes de mesure',
          theoremes:[
            { id:'D-MES1', type:'def', nom:'Incertitude-type — Types A et B',
              enonce:"ÉVALUATION DE TYPE A (répétitions de mesures) :\ns = écart-type expérimental\nu_A = s / √n\n(n = nombre de mesures)\n\nÉVALUATION DE TYPE B (lecture d'instrument) :\nRésolution de l'instrument = plus petite graduation\nDemi-étendue = résolution/2\nu_B = (demi-étendue) / √3\n(loi rectangulaire uniforme)\n\nINCERTITUDE COMPOSÉE :\nu_c = √(u_A² + u_B²)\n\nINCERTITUDE ÉLARGIE (k=2, intervalle de confiance 95%) :\nU = 2 × u_c\n\nRÉSULTAT : x = x̄ ± U  (unité)" },
            { id:'P-MES1', type:'prop', nom:'Présentation du résultat et compatibilité',
              enonce:"RÈGLES D'ARRONDI :\n• U arrondi à 1–2 chiffres significatifs\n• x̄ arrondi au même rang décimal que U\n\nExemple :\nu_c = 0,71 Ω → U = 1,4 Ω → R = 100 ± 1,4 Ω ✓\n(Pas : 100,0 ± 1,42 Ω — trop de chiffres sur U)\n(Pas : 100 ± 1 Ω — U arrondi trop grossièrement)\n\nCRITÈRE DE COMPATIBILITÉ :\n|x_exp − x_ref| ≤ 2 × u_c → résultat COMPATIBLE (95%)\n\nÉCART NORMALISÉ (Z-score) :\nEn = |x_exp − x_ref| / u_c\nEn < 2 → compatible  ;  En > 2 → incompatible",
              remarque:"En STI2D, les incertitudes sont au cœur des mesures expérimentales sur les bancs d'essai. Un résultat sans incertitude est incomplet." },
          ],
          exercices:[
            { id:'EX-MES1', niveau:'Facile', titre:'Calcul d\'incertitude',
              enonce:"5 mesures de résistance : 98, 102, 100, 99, 101 Ω. Calculer x̄, s, u_A, u_c (u_B=0,3Ω) et U.",
              correction:"x̄=(98+102+100+99+101)/5=100 Ω.\ns=√[(4+4+0+1+1)/4]=√(10/4)≈1,58 Ω.\nu_A=1,58/√5≈0,71 Ω.\nu_c=√(0,71²+0,3²)=√(0,504+0,09)≈0,77 Ω.\nU=2×0,77≈1,5 Ω.\nRésultat : R = 100 ± 1,5 Ω." },
            { id:'EX-MES2', niveau:'Intermédiaire', titre:'Compatibilité avec valeur théorique',
              enonce:"x̄=9,82 m/s², u_c=0,05 m/s². Valeur théorique g=9,81 m/s². Résultat compatible ?",
              correction:"En=|9,82−9,81|/0,05=0,01/0,05=0,2 < 2 → COMPATIBLE ✓." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 01 — ÉNERGIE CHIMIQUE
// ─────────────────────────────────────────────────────────────────────
'energie-chimique': {
  id:'energie-chimique', emoji:'🔥', badge:'Énergie', color:'#f59e0b',
  titre:'Énergie chimique & Combustions',
  desc:"Pouvoir calorifique inférieur (Pci), énergie de combustion Q=m·Pci, rendement thermique, piles et accumulateurs (FEM, résistance interne, capacité), pile H₂ et Li-ion.",
  souschapitres:[
    {
      id:'sc-ech1', titre:'1.1 Combustions et pouvoir calorifique',
      notions:['Q=m·Pci (Joules)','Pci CH₄=50MJ/kg ; H₂=120MJ/kg ; essence=43MJ/kg','η=W_utile/(m·Pci)','Combustion complète : CO₂+H₂O'],
      blocs:[
        {
          notion:'🔥 Énergie de combustion',
          theoremes:[
            { id:'F-ECH1', type:'formule', nom:'Énergie de combustion et rendement',
              enonce:"ÉNERGIE LIBÉRÉE PAR COMBUSTION :\nQ = m × Pci  (en Joules)\nm = masse du combustible (kg)\nPci = Pouvoir Calorifique Inférieur (J/kg)\n\nVALEURS DE Pci :\n• Méthane CH₄ : 50 MJ/kg\n• Propane C₃H₈ : 46 MJ/kg\n• Essence : 43 MJ/kg\n• Fioul lourd : 42 MJ/kg\n• Bois sec : 15 MJ/kg\n• Hydrogène H₂ : 120 MJ/kg ← record massique\n\nRENDEMENT THERMIQUE :\nη = W_utile / (m × Pci)\n\nEx : moteur thermique η ≈ 35–40% ; chaudière condensation η ≈ 105% (PCS !)",
              remarque:"L'hydrogène a le Pci massique le plus élevé, mais sa densité volumique est très faible → problème de stockage pour les applications STI2D (véhicule, drone)." },
          ],
          exercices:[
            { id:'EX-ECH1', niveau:'Facile', titre:'Énergie d\'un chauffe-eau',
              enonce:"Un chauffe-eau brûle 2kg de méthane. Pci=50MJ/kg, η=85%. Énergie utile ?",
              correction:"Q_brûlée=2×50=100MJ.\nQ_utile=0,85×100=85MJ." },
            { id:'EX-ECH2', niveau:'Intermédiaire', titre:'Autonomie d\'un drone thermique',
              enonce:"Drone avec 0,5kg d'essence (Pci=43MJ/kg). Moteur η=30%, consommation=2kW. Autonomie ?",
              correction:"Q_utile=0,5×43×10⁶×0,30=6,45×10⁶J.\nt=Q_utile/P=6,45×10⁶/2000=3225s≈54min." },
          ]
        },
      ]
    },
    {
      id:'sc-ech2', titre:'1.2 Piles et accumulateurs',
      notions:['FEM ε, résistance interne r','U=ε−r·I (tension en charge)','Capacité C (Ah) : W=U·C','Li-ion : 150-200Wh/kg ; pile H₂/O₂ : η≈60%'],
      blocs:[
        {
          notion:'🔋 Piles et batteries industrielles',
          theoremes:[
            { id:'D-ECH2', type:'def', nom:'Piles et accumulateurs — modèle électrique',
              enonce:"PILE : énergie chimique → électrique (usage unique)\nACCUMULATEUR : rechargeable (batterie)\n\nMODÈLE ÉLECTRIQUE :\nFEM ε : tension à vide (générateur idéal)\nRésistance interne r : dissipation interne\n\nTENSION EN CHARGE :\nU = ε − r × I  (en Volts)\n\nCAPACITÉ C : charge totale disponible (Ampère-heure, Ah)\nÉNERGIE STOCKÉE :\nW = U × I × t = U × C\n\nRENDEMENT DE LA PILE :\nη = W_utile/W_max = (ε−rI)/ε\n\nEXEMPLES STI2D :\n• Li-ion : énergie massique ≈ 150–200 Wh/kg ; recharge ≈ 1–2h\n• LiFePO₄ : plus sûr, plus durable (vélo électrique)\n• Pile à combustible H₂/O₂ : η ≈ 60% ; sous-produit = eau !\n• Supercondensateur : puissance élevée, énergie faible (récupération freinage)",
              remarque:"En STI2D : comparer énergie massique (Wh/kg) et puissance massique (W/kg) selon l'application. Un drone demande de la puissance ; un VE demande de l'énergie." },
          ],
          exercices:[
            { id:'EX-ECH3', niveau:'Facile', titre:'Autonomie d\'un VE',
              enonce:"Batterie 60kWh, consommation 15kWh/100km. Autonomie ?",
              correction:"Autonomie=60/15×100=400km." },
            { id:'EX-ECH4', niveau:'Intermédiaire', titre:'Tension en charge',
              enonce:"Accu : ε=12,6V, r=0,1Ω, I=20A. Tension aux bornes et puissance dissipée dans r ?",
              correction:"U=12,6−0,1×20=12,6−2=10,6V.\nP_r=r×I²=0,1×400=40W." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — ÉNERGIE ÉLECTRIQUE
// ─────────────────────────────────────────────────────────────────────
'energie-electrique': {
  id:'energie-electrique', emoji:'⚡', badge:'Énergie', color:'#f59e0b',
  titre:'Énergie électrique & Circuits AC/DC',
  desc:"Régime continu DC et sinusoïdal AC. Valeur efficace U_eff=U_max/√2, puissance active P=UI·cosφ, réactive Q, apparente S. Dipôles R, L, C. Impédance. Résonance.",
  souschapitres:[
    {
      id:'sc-ele1', titre:'2.1 Régime sinusoïdal — valeur efficace et puissances',
      notions:['u(t)=U_max·cos(ωt) ; U_eff=U_max/√2','P=U_eff·I_eff·cosφ (Watts)','Q=U_eff·I_eff·sinφ (VAr)','S=U_eff·I_eff (VA) ; S²=P²+Q²'],
      blocs:[
        {
          notion:'⚡ Grandeurs AC et puissances',
          theoremes:[
            { id:'F-ELE1', type:'formule', nom:'Valeur efficace et triangle des puissances',
              enonce:"SIGNAL SINUSOÏDAL : u(t) = U_max × cos(ωt + φ)\nω = 2πf (rad/s) ; f = 50 Hz en France\n\nVALEUR EFFICACE (RMS) :\nU_eff = U_max / √2 ≈ 0,707 × U_max\nI_eff = I_max / √2\n\nRéseau France : U_max=325V → U_eff=230V ✓\n\nPUISSANCES :\nPuissance ACTIVE : P = U_eff × I_eff × cosφ  (W)\nPuissance RÉACTIVE : Q = U_eff × I_eff × sinφ  (VAr)\nPuissance APPARENTE : S = U_eff × I_eff  (VA)\n\nTRIANGLE DES PUISSANCES : S² = P² + Q²\n\ncosφ = facteur de puissance (0 ≤ cosφ ≤ 1)\ncosφ = 1 → charge purement résistive (idéal)\ncosφ < 1 → charges inductives (moteurs, bobines)",
              remarque:"En industrie : EDF facture la puissance apparente S si cosφ < 0,93. Les industries installent des batteries de condensateurs pour corriger le facteur de puissance et réduire la facture." },
          ],
          exercices:[
            { id:'EX-ELE1', niveau:'Facile', titre:'Valeur efficace réseau France',
              enonce:"U_max=325V, f=50Hz. Calculer U_eff et ω.",
              correction:"U_eff=325/√2≈230V ✓.\nω=2π×50≈314 rad/s." },
            { id:'EX-ELE2', niveau:'Intermédiaire', titre:'Puissance d\'un moteur AC',
              enonce:"Moteur : U=230V, I=10A, cosφ=0,85. Calculer P, Q et S.",
              correction:"S=230×10=2300VA.\nP=2300×0,85≈1955W.\nsinφ=√(1−0,85²)=√(0,2775)≈0,527.\nQ=2300×0,527≈1212VAr." },
          ]
        },
      ]
    },
    {
      id:'sc-ele2', titre:'2.2 Dipôles R, L, C et résonance',
      notions:['Z_R=R ; Z_L=Lω ; Z_C=1/(Cω)','Z_RLC=√(R²+(Z_L−Z_C)²)','Résonance : ω₀=1/√(LC)','À ω₀ : Z=R minimal → I maximal'],
      blocs:[
        {
          notion:'🔌 Impédances et résonance',
          theoremes:[
            { id:'D-ELE2', type:'def', nom:'Dipôles R, L, C en régime sinusoïdal',
              enonce:"RÉSISTANCE R :\nZ_R = R (Ω) ; pas de déphasage\ncosφ = 1 ; puissance uniquement active\n\nBOBINE D'INDUCTANCE L :\nZ_L = L × ω (Ω)\nCourant en RETARD de π/2 sur la tension\nÉnergie stockée dans le champ magnétique\n\nCONDENSATEUR C :\nZ_C = 1/(C × ω) (Ω)\nCourant en AVANCE de π/2 sur la tension\nÉnergie stockée dans le champ électrique\n\nCIRCUIT RLC SÉRIE :\nZ = √[R² + (Z_L − Z_C)²] = √[R² + (Lω − 1/Cω)²]\ntanφ = (Lω − 1/Cω) / R\nI_eff = U_eff / Z\n\nRÉSONANCE (Z_L=Z_C) :\nω₀ = 1/√(LC) ; f₀ = ω₀/(2π)\nÀ f₀ : Z=R (minimum) → I maximal → résonance !" },
            { id:'M-ELE1', type:'methode', nom:'Calcul d\'un circuit RLC série',
              enonce:"1. Calculer Z_L = Lω et Z_C = 1/(Cω)\n2. Z = √[R² + (Z_L−Z_C)²]\n3. tanφ = (Z_L−Z_C)/R → déduire φ\n4. I_eff = U_eff/Z\n5. U_R = R×I ; U_L = Z_L×I ; U_C = Z_C×I\n6. P = R×I_eff²\n\nAPPLICATIONS STI2D :\n• Filtre passe-bande (sélection fréquence)\n• Circuit accordé (radio, RFID)\n• Compensation du facteur de puissance" },
          ],
          exercices:[
            { id:'EX-ELE3', niveau:'Intermédiaire', titre:'Circuit RLC série',
              enonce:"R=100Ω, L=50mH, C=10μF, f=50Hz, U_eff=230V. Calculer Z, I_eff, P.",
              correction:"Z_L=50×10⁻³×2π×50≈15,7Ω.\nZ_C=1/(10⁻⁵×2π×50)≈318Ω.\nZ=√(100²+(15,7−318)²)=√(10000+91350)≈318Ω.\nI_eff=230/318≈0,72A.\nP=R×I²=100×0,52≈52W." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — ÉNERGIE THERMIQUE
// ─────────────────────────────────────────────────────────────────────
'energie-thermique': {
  id:'energie-thermique', emoji:'🌡️', badge:'Énergie', color:'#f59e0b',
  titre:'Énergie thermique & Transferts',
  desc:"Q=mCpΔT, changements d'état (fusion Lf, vaporisation Lv), résistance thermique R_th=e/(λS), flux thermique Φ=ΔT/R_th, isolation industrielle.",
  souschapitres:[
    {
      id:'sc-eth1', titre:'3.1 Énergie thermique et changements d\'état',
      notions:['Q=m·c·ΔT (J)','c_eau=4186 J·kg⁻¹·K⁻¹','Fusion : Q=m·Lf ; Lf(eau)=334kJ/kg','Vaporisation : Q=m·Lv ; Lv(eau)=2260kJ/kg'],
      blocs:[
        {
          notion:'🌡️ Énergie thermique',
          theoremes:[
            { id:'F-ETH1', type:'formule', nom:'Énergie thermique et changements d\'état',
              enonce:"VARIATION DE TEMPÉRATURE :\nQ = m × c × ΔT  (Joules)\nm en kg ; c en J·kg⁻¹·K⁻¹ ; ΔT = T_f − T_i (K ou °C)\n\nVALEURS DE c :\n• Eau : 4186 J·kg⁻¹·K⁻¹\n• Aluminium : 900 J·kg⁻¹·K⁻¹\n• Acier : 500 J·kg⁻¹·K⁻¹\n• Cuivre : 385 J·kg⁻¹·K⁻¹\n\nCHANGEMENT D'ÉTAT (T = constante) :\nFusion/solidification : Q = m × Lf\nVaporisation/condensation : Q = m × Lv\n\nPOUR L'EAU :\nLf = 334 kJ/kg (à 0°C)\nLv = 2260 kJ/kg (à 100°C)",
              remarque:"En STI2D : la vaporisation de l'eau consomme 7× plus d'énergie que la fusion. Important pour les systèmes thermiques industriels (chaudières, échangeurs, réfrigération)." },
          ],
          exercices:[
            { id:'EX-ETH1', niveau:'Facile', titre:'Fusion de la glace',
              enonce:"Fondre 500g de glace à 0°C. Lf=334kJ/kg. Énergie nécessaire ?",
              correction:"Q=m×Lf=0,5×334000=167000J=167kJ." },
            { id:'EX-ETH2', niveau:'Intermédiaire', titre:'Chauffe-eau industriel',
              enonce:"Chauffer 200L d'eau de 15°C à 60°C. c=4186J·kg⁻¹·K⁻¹. Énergie et puissance si durée=2h.",
              correction:"Q=200×4186×45=37,67×10⁶J≈37,7MJ≈10,5kWh.\nP=Q/t=37,67×10⁶/(2×3600)≈5231W≈5,2kW." },
          ]
        },
      ]
    },
    {
      id:'sc-eth2', titre:'3.2 Résistance thermique et isolation STI2D',
      notions:['R_th=e/(λ·S) (K/W)','Φ=ΔT/R_th (Watts)','Série : R_th_total=ΣR_th_i','λ_laine=0,04 ; λ_béton=2 ; λ_Cu=400 (W·m⁻¹·K⁻¹)'],
      blocs:[
        {
          notion:'🏗️ Résistance thermique industrielle',
          theoremes:[
            { id:'F-ETH2', type:'formule', nom:'Résistance thermique et flux',
              enonce:"RÉSISTANCE THERMIQUE D'UNE PAROI :\nR_th = e / (λ × S)  (K/W)\ne = épaisseur (m)\nλ = conductivité thermique (W·m⁻¹·K⁻¹)\nS = surface (m²)\n\nFLUX THERMIQUE (analogue loi d'Ohm) :\nΦ = ΔT / R_th  (Watts) → ΔT = Φ × R_th\n\nPAROI MULTICOUCHE (résistances en série) :\nR_th_total = R_th1 + R_th2 + … + R_th_n\n\nVALEURS DE λ :\n• Cuivre : 400 W·m⁻¹·K⁻¹\n• Aluminium : 237 W·m⁻¹·K⁻¹\n• Acier inox : 16 W·m⁻¹·K⁻¹\n• Béton : ~2 W·m⁻¹·K⁻¹\n• Plâtre : ~0,5 W·m⁻¹·K⁻¹\n• Laine de verre : ~0,04 W·m⁻¹·K⁻¹\n• Polyuréthane : ~0,025 W·m⁻¹·K⁻¹\n\nFACTEUR U (bâtiment) : U = 1/R_th  (W·m⁻²·K⁻¹)",
              remarque:"La laine de verre (λ=0,04) est 10000× moins conductrice que le cuivre (λ=400). En isolation, doubler l'épaisseur double R_th et divise le flux par 2." },
          ],
          exercices:[
            { id:'EX-ETH3', niveau:'Intermédiaire', titre:'Isolation d\'un bâtiment',
              enonce:"Paroi laine de verre : e=10cm, λ=0,04 W·m⁻¹·K⁻¹, S=20m². ΔT=20°C. R_th et Φ ?",
              correction:"R_th=0,10/(0,04×20)=0,10/0,8=0,125 K/W.\nΦ=20/0,125=160W." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — ÉNERGIE MÉCANIQUE
// ─────────────────────────────────────────────────────────────────────
'energie-mecanique-sti2d': {
  id:'energie-mecanique-sti2d', emoji:'⚙️', badge:'Énergie', color:'#f59e0b',
  titre:'Énergie mécanique & Puissance',
  desc:"Travail W=F·d·cosα, puissance P_mec=F·v=C·ω, énergie cinétique/potentielle, rendement, systèmes de transmission (engrenages, courroies), rapport de réduction.",
  souschapitres:[
    {
      id:'sc-emec1', titre:'4.1 Travail, puissance et énergie',
      notions:['W=F·d·cosα (Joules)','P_mec=F·v=C·ω (Watts)','Ec=½mv² ; Ep=mgh','η=P_sortie/P_entrée'],
      blocs:[
        {
          notion:'⚙️ Mécanique industrielle',
          theoremes:[
            { id:'F-EMEC1', type:'formule', nom:'Travail, puissance et énergie mécanique',
              enonce:"TRAVAIL d'une force constante :\nW = F × d × cosα  (Joules)\nα = angle entre F⃗ et déplacement\n\nPUISSANCE MÉCANIQUE :\nP_mec = F × v  (Watts ; F en N, v en m/s)\nP_mec = C × ω  (Nm × rad/s)\nC = couple (N·m) ; ω = vitesse angulaire (rad/s)\nω = 2πn/60  (n en tr/min)\n\nÉNERGIE CINÉTIQUE : Ec = ½mv²\nÉNERGIE POTENTIELLE : Ep = mgh\n\nRENDEMENT MÉCANIQUE :\nη = P_sortie / P_entrée = W_utile / W_fourni\n\nSi η inconnu : η ≈ 0,85–0,95 pour systèmes mécaniques classiques" },
            { id:'D-EMEC1', type:'def', nom:'Systèmes de transmission — engrenages et courroies',
              enonce:"RAPPORT DE TRANSMISSION :\ni = ω_sortie / ω_entrée = n_sortie / n_entrée\n\nENGREAGES :\ni = Z₁/Z₂  (Z = nombre de dents)\n\nCOURROIE / POULIE :\ni = D₁/D₂  (D = diamètre des poulies)\n\nCONSERVATION DE LA PUISSANCE (si η=1) :\nC₁ × ω₁ = C₂ × ω₂\nC₂ = C₁ × ω₁/ω₂ = C₁ / i\n\nSi ω₂ < ω₁ (réduction) → C₂ > C₁ (amplification du couple)\n→ Réducteur : gain en couple, perte en vitesse\n\nAPPLICATION : moteur 3000tr/min → roue 150tr/min → i=1/20 → couple ×20" },
          ],
          exercices:[
            { id:'EX-EMEC1', niveau:'Facile', titre:'Puissance d\'un moteur',
              enonce:"Un moteur soulève 500kg à v=0,5m/s. g=9,8m/s². P_mec ?",
              correction:"P_mec=F×v=500×9,8×0,5=2450W≈2,45kW." },
            { id:'EX-EMEC2', niveau:'Intermédiaire', titre:'Engrenage réducteur',
              enonce:"Z₁=20 dents, Z₂=60 dents, n₁=1500tr/min, C₁=5N·m. Calculer n₂, ω₁, ω₂ et C₂ (η=1).",
              correction:"i=Z₁/Z₂=20/60=1/3.\nn₂=1500×(1/3)=500tr/min.\nω₁=2π×1500/60≈157 rad/s ; ω₂≈52,4 rad/s.\nP conservée → C₂=C₁×ω₁/ω₂=5×(1500/500)=15N·m." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — ÉNERGIE LUMINEUSE & PHOTOVOLTAÏQUE
// ─────────────────────────────────────────────────────────────────────
'energie-lumineuse': {
  id:'energie-lumineuse', emoji:'☀️', badge:'Énergie', color:'#f59e0b',
  titre:'Énergie lumineuse & Photovoltaïque',
  desc:"Énergie d'un photon E=hf=hc/λ, spectre solaire, effet photovoltaïque (E_photon≥E_gap), caractéristique I(U) d'une cellule PV, rendement η=P_max/(irradiance·S).",
  souschapitres:[
    {
      id:'sc-elum1', titre:'5.1 Photon et spectre solaire',
      notions:['E=hf=hc/λ (Joule ou eV)','1eV=1,6×10⁻¹⁹J','h=6,63×10⁻³⁴J·s','UV<400nm ; Visible 400-700nm ; IR>700nm'],
      blocs:[
        {
          notion:'☀️ Énergie lumineuse',
          theoremes:[
            { id:'F-ELUM1', type:'formule', nom:'Énergie d\'un photon',
              enonce:"E = h × f = h × c / λ\n\nh = 6,63×10⁻³⁴ J·s (constante de Planck)\nc = 3×10⁸ m/s (vitesse de la lumière)\nf = fréquence (Hz) ; λ = longueur d'onde (m)\n\nUNITÉ PRATIQUE :\n1 eV = 1,6×10⁻¹⁹ J\n\nEXEMPLES :\nPhoton rouge (λ=700nm) : E=1,77 eV\nPhoton vert (λ=550nm) : E=2,26 eV\nPhoton UV (λ=300nm) : E=4,14 eV\n\nSPECTRE SOLAIRE :\nUV : λ < 400nm (environ 7% de l'énergie solaire)\nVisible : 400–700nm (environ 46%)\nIR : λ > 700nm (environ 47%)" },
          ],
          exercices:[
            { id:'EX-ELUM1', niveau:'Facile', titre:'Énergie d\'un photon vert',
              enonce:"Photon de λ=550nm. Calculer f et E. h=6,63×10⁻³⁴J·s.",
              correction:"f=c/λ=3×10⁸/550×10⁻⁹=5,45×10¹⁴Hz.\nE=hf=6,63×10⁻³⁴×5,45×10¹⁴≈3,61×10⁻¹⁹J≈2,26eV." },
          ]
        },
      ]
    },
    {
      id:'sc-elum2', titre:'5.2 Panneau photovoltaïque',
      notions:['Effet PV : photon → paire e⁻/trou si E_photon≥E_gap','Si : E_gap=1,1eV → λ_max≈1100nm','Caractéristique I(U) : I_cc, U_co, MPP','η=P_max/(irradiance×S)≈15-22%'],
      blocs:[
        {
          notion:'🔆 Cellule photovoltaïque',
          theoremes:[
            { id:'D-ELUM2', type:'def', nom:'Panneau photovoltaïque — principe et caractéristiques',
              enonce:"EFFET PHOTOVOLTAÏQUE :\nUn photon absorbé par un semi-conducteur crée une paire électron-trou\n→ Migration des charges → courant électrique\n\nCONDITION : E_photon ≥ E_gap (énergie de bande interdite)\nSilicium Si : E_gap ≈ 1,1 eV → λ_max ≈ 1100 nm\n(longueurs d'onde > 1100nm ne créent pas de courant)\n\nCARACTÉRISTIQUE I(U) :\n• Court-circuit (U=0) : I = I_cc (courant maximal)\n• Circuit ouvert (I=0) : U = U_co (tension maximale)\n• Point de Puissance Maximale (MPP ou MPPT) :\n  P_max = I_MPP × U_MPP\n\nRENDEMENT :\nη = P_max / (E_rayonnement × S)\nE_rayonnement = irradiance (W/m²), standard : 1000 W/m² (STC)\nη ≈ 15–22% pour les cellules monocristallines\n\nASSOCIATIONS :\nSérie → additionne les tensions (même courant)\nParallèle → additionne les courants (même tension)",
              remarque:"En STI2D, on dimensionne des installations PV : nombre de panneaux = P_besoin / (η × irradiance × S_panneau). Ne pas oublier l'onduleur (DC→AC) et son propre rendement (~95%)." },
          ],
          exercices:[
            { id:'EX-ELUM2', niveau:'Intermédiaire', titre:'Rendement d\'un panneau PV',
              enonce:"Panneau : S=1,6m², P_max=320W sous irradiance=1000W/m². Rendement ?",
              correction:"η=P_max/(E_ray×S)=320/(1000×1,6)=320/1600=0,20=20%." },
            { id:'EX-ELUM3', niveau:'Difficile', titre:'Dimensionnement installation',
              enonce:"Besoin : P=3kW. Panneaux 320W, η_onduleur=95%. Nb de panneaux ?",
              correction:"P_PV nécessaire=3000/0,95≈3158W.\nNb panneaux=3158/320≈9,87 → 10 panneaux." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — MATIÈRE & MATÉRIAUX
// ─────────────────────────────────────────────────────────────────────
'materiaux': {
  id:'materiaux', emoji:'⚗️', badge:'Matériaux', color:'#10b981',
  titre:'Matière & Matériaux',
  desc:"Propriétés des matériaux (électriques, thermiques, mécaniques, optiques), organisation de la matière, combustions, oxydoréduction, corrosion et protection des métaux.",
  souschapitres:[
    {
      id:'sc-mat1', titre:'6.1 Propriétés des matériaux',
      notions:['Conducteurs/isolants/semi-conducteurs','Propriétés thermiques : λ, c','Propriétés mécaniques : E (Young), Rm','Propriétés optiques : transparence, indice n'],
      blocs:[
        {
          notion:'🔩 Matériaux et leurs propriétés',
          theoremes:[
            { id:'D-MAT1', type:'def', nom:'Classification et propriétés des matériaux',
              enonce:"FAMILLES DE MATÉRIAUX :\n• Métaux et alliages : Fe, Al, Cu, acier, inox\n• Polymères : plastiques (PE, PVC, PTFE), élastomères\n• Céramiques et verres : Al₂O₃, SiO₂, béton\n• Composites : fibre carbone/époxy, béton armé\n\nPROPRIÉTÉS ÉLECTRIQUES :\nConducteurs : ρ < 10⁻⁶ Ω·m (métaux)\nSemi-conducteurs : 10⁻⁶ < ρ < 10⁴ Ω·m (Si, Ge)\nIsolants : ρ > 10⁸ Ω·m (plastiques, céramiques)\n\nPROPRIÉTÉS THERMIQUES :\nConductivité λ (W·m⁻¹·K⁻¹) : Cu>Al>acier>béton>isolants\nCapacité thermique c (J·kg⁻¹·K⁻¹) : eau>alu>acier>cuivre\n\nPROPRIÉTÉS MÉCANIQUES :\nModule de Young E (GPa) : rigidité élastique\nLimite à la rupture Rm (MPa)\nDureté, résilience, ductilité" },
          ],
          exercices:[
            { id:'EX-MAT1', niveau:'Facile', titre:'Choix de matériau',
              enonce:"Pour un dissipateur thermique (haute conductivité, légèreté), quel métal entre Al, Cu, acier ?",
              correction:"Aluminium : λ=237 W·m⁻¹·K⁻¹, ρ=2700 kg/m³ → meilleur rapport λ/densité.\nCuivre : λ=400 mais plus lourd (8900 kg/m³).\nChoix : aluminium pour légèreté, cuivre pour performance maximale." },
          ]
        },
      ]
    },
    {
      id:'sc-mat2', titre:'6.2 Corrosion et protection des métaux',
      notions:['Corrosion : réaction rédox (métal + O₂ ou H⁺)','Galvanisation : dépôt de Zn (anode sacrificielle)','Passivation : couche Cr₂O₃ (acier inox)','Potentiels standard : E°(Zn)=−0,76V < E°(Fe)=−0,44V'],
      blocs:[
        {
          notion:'🛡️ Corrosion et protection industrielle',
          theoremes:[
            { id:'D-MAT2', type:'def', nom:'Corrosion et protection des métaux',
              enonce:"CORROSION ÉLECTROCHIMIQUE :\nRéaction d'oxydoréduction : métal + environnement\n4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃  (rouille)\n\nPILE DE CORROSION :\nDeux métaux différents + électrolyte → pile galvanique\n→ Le métal le plus oxydable (anode) se corrode\n→ Plus la différence de potentiels est grande, plus la corrosion est rapide\n\nPROTECTIONS :\n\n1. BARRIÈRE PHYSIQUE :\nPeinture, laque, revêtement plastique\n→ Isole le métal de l'environnement\n\n2. GALVANISATION (dépôt de Zn) :\nE°(Zn²⁺/Zn)=−0,76V < E°(Fe²⁺/Fe)=−0,44V\nZn se corrode préférentiellement → protège Fe\nMême si rayure → le Zn continue à protéger\n\n3. PASSIVATION :\nAl : couche Al₂O₃ naturelle et adhérente\nAcier inox : ≥10,5% Cr → couche Cr₂O₃ protectrice\n\n4. ANODE SACRIFICIELLE :\nZn ou Mg fixé sur la structure à protéger\n→ Applications : navires, pipelines, réservoirs enterrés",
              remarque:"L'acier inox doit sa résistance à la corrosion non pas à l'acier mais au chrome (Cr). Pas de contact fer/cuivre en présence d'eau → pile galvanique → corrosion accélérée du fer." },
          ],
          exercices:[
            { id:'EX-MAT2', niveau:'Intermédiaire', titre:'Anode sacrificielle',
              enonce:"Un bateau en acier (Fe) est protégé par des anodes en zinc. Justifier le choix du zinc.",
              correction:"E°(Zn²⁺/Zn)=−0,76V < E°(Fe²⁺/Fe)=−0,44V.\nZn est plus réducteur → s'oxyde préférentiellement : Zn → Zn²⁺ + 2e⁻.\nLe fer est protégé (cathode) car il reçoit les électrons du Zn.\nLe zinc est régulièrement remplacé (anode consommée)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — ONDES & INFORMATION
// ─────────────────────────────────────────────────────────────────────
'ondes-information': {
  id:'ondes-information', emoji:'🌊', badge:'Ondes', color:'#8b5cf6',
  titre:'Ondes & Information',
  desc:"Ondes mécaniques et EM (v=λf), niveau sonore L=10log(I/I₀), numérisation (Shannon fe≥2fmax, débit D=fe×n), modulation AM/FM, fibre optique.",
  souschapitres:[
    {
      id:'sc-ond1', titre:'7.1 Ondes mécaniques et électromagnétiques',
      notions:['v=λ·f (relation fondamentale)','Son : longitudinale, v≈340m/s','EM : transversale, c=3×10⁸m/s dans le vide','L=10·log(I/I₀) (décibels)'],
      blocs:[
        {
          notion:'🌊 Caractéristiques des ondes',
          theoremes:[
            { id:'D-OND1', type:'def', nom:'Ondes mécaniques et EM',
              enonce:"RELATION FONDAMENTALE : v = λ × f\n\nONDES MÉCANIQUES :\n• Nécessitent un milieu matériel\n• Longitudinale (son, ultrasons) ou transversale (corde)\n• Son dans l'air : v ≈ 340 m/s (20°C)\n• Son dans l'eau : v ≈ 1500 m/s\n• Ultrasons : f > 20 kHz → CND, échographie\n\nONDES ÉLECTROMAGNÉTIQUES :\n• Se propagent dans le vide : c = 3×10⁸ m/s\n• Transversales\n• Spectre : radio → micro-ondes → IR → visible → UV → X → γ\n\nATTÉNUATION :\n• Amplitude diminue avec la distance et l'absorption du milieu\n• Réflexion et réfraction aux interfaces" },
            { id:'F-OND1', type:'formule', nom:'Niveau sonore en décibels',
              enonce:"L = 10 × log(I / I₀)  [dB]\n\nI₀ = 10⁻¹² W/m² (seuil d'audibilité)\n\nVALEURS TYPIQUES :\n• Seuil audibilité : 0 dB\n• Chuchotement : 20 dB\n• Conversation : 60 dB\n• Circulation routière : 75 dB\n• Atelier industriel : 85–95 dB ← seuil de protection STI2D\n• Marteau-piqueur : 100 dB\n• Seuil de douleur : 130 dB\n\nPROPRIÉTÉS :\n+10 dB → intensité ×10\n+3 dB → intensité ×2\n\nEPI OBLIGATOIRES si L > 85 dB (Code du travail)",
              remarque:"En STI2D : les ateliers industriels atteignent souvent 85–100 dB. Le port de protections auditives (atténuation ~25 dB) est obligatoire. La surdité professionnelle est irréversible." },
          ],
          exercices:[
            { id:'EX-OND1', niveau:'Facile', titre:'Longueur d\'onde d\'un radar',
              enonce:"Radar : f=10GHz. Calculer λ. c=3×10⁸m/s.",
              correction:"λ=c/f=3×10⁸/(10×10⁹)=3×10⁻²m=3cm (micro-ondes)." },
            { id:'EX-OND2', niveau:'Facile', titre:'Niveau sonore',
              enonce:"I=10⁻⁴W/m². L ? I₀=10⁻¹²W/m².",
              correction:"L=10×log(10⁻⁴/10⁻¹²)=10×log(10⁸)=80dB." },
          ]
        },
      ]
    },
    {
      id:'sc-ond2', titre:'7.2 Numérisation et transmission d\'information',
      notions:['Shannon : fe≥2·fmax','Résolution q=(max−min)/2ⁿ','Débit D=fe×n (bit/s)','Fibre optique : réflexion totale interne, haut débit'],
      blocs:[
        {
          notion:'💻 Numérisation et communication',
          theoremes:[
            { id:'F-OND2', type:'formule', nom:'Numérisation — critère de Shannon et débit',
              enonce:"CRITÈRE DE SHANNON-NYQUIST :\nfe ≥ 2 × f_max\nfe = fréquence d'échantillonnage (Hz)\nf_max = fréquence maximale du signal\n\nRÉSOLUTION EN TENSION :\nq = (U_max − U_min) / 2ⁿ\nn = nombre de bits\nExemple : n=8 bits → 2⁸=256 niveaux\n\nDÉBIT BINAIRE :\nD = fe × n  (bit/s)\n\nEXEMPLES :\nTéléphonie : f_max=4kHz → fe=8kHz, n=8bits → D=64kbit/s\nCD audio : fe=44,1kHz, n=16bits → D=706kbit/s (×2 stéréo)\nWiFi 802.11n : jusqu'à 600 Mbit/s\n\nMODULATION :\nAM : amplitude du signal porteur modifiée\nFM : fréquence modifiée → plus robuste aux parasites\n\nFIBRE OPTIQUE :\nPropagation par réflexion totale interne (n_cœur > n_gaine)\nAvantages : haut débit, faibles pertes, immunité EM\nApplications : internet haut débit, réseaux industriels",
              remarque:"Le débit D=fe×n est pour un signal non compressé (PCM). La compression (MP3, AAC, JPEG) réduit le débit sans perte auditive/visuelle perceptible — point clé en STI2D SIN (Systèmes d'Information et Numérique)." },
          ],
          exercices:[
            { id:'EX-OND3', niveau:'Intermédiaire', titre:'Numérisation téléphonie',
              enonce:"Signal téléphonique : f_max=4000Hz, n=8bits. Calculer fe_min et le débit.",
              correction:"fe_min=2×4000=8000Hz=8kHz.\nD=8000×8=64000bit/s=64kbit/s." },
            { id:'EX-OND4', niveau:'Difficile', titre:'Poids d\'un fichier audio',
              enonce:"Musique : fe=44100Hz, n=16bits, stéréo, durée=3min. Poids non compressé ?",
              correction:"D=44100×16×2=1411200bit/s.\nt=3×60=180s.\nBits=1411200×180=254016000bits.\nOctets=254016000/8=31752000 octets≈30,3MB." },
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
export default function PhysiqueSTI2DSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'mesures-sti2d'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>⚙️</div>
          <h2>Chapitre non trouvé</h2>
          <Link href="/bac-france/physique/sti2d" style={{ color:'#8b5cf6' }}>← Retour STI2D</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#8b5cf6'

  const GROUPS = [
    { label:'Métrologie', slugs:['mesures-sti2d'] },
    { label:'Section Énergie — 5 formes', slugs:['energie-chimique','energie-electrique','energie-thermique','energie-mecanique-sti2d','energie-lumineuse'] },
    { label:'Matière & Ondes', slugs:['materiaux','ondes-information'] },
  ]

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link><span>›</span>
          <Link href="/bac-france/physique/sti2d" style={{ color:'var(--muted)', textDecoration:'none' }}>STI2D</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{chapter.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 270px', gap:32, alignItems:'start' }}>

            {/* CONTENU */}
            <div>
              <div style={{ marginBottom:36 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:28 }}>{chapter.emoji}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:secColor,
                    background:`${secColor}18`, padding:'3px 10px', borderRadius:8, fontWeight:700 }}>
                    {TITRES_NAV[slug]?.split(' — ')[0]}
                  </span>
                  <span style={{ fontSize:11, padding:'2px 10px', borderRadius:20,
                    background:`${secColor}14`, color:secColor, fontWeight:700 }}>{chapter.badge}</span>
                  <span style={{ fontSize:11, background:'rgba(139,92,246,0.15)',
                    color:'#a78bfa', padding:'2px 9px', borderRadius:10 }}>
                    {SEC_LABEL[slug]} · STI2D
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' en Physique-Chimie STI2D France')}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/simulation-france"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📋 Simulation Bac STI2D
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
                                      <Link href={`/solve?q=${encodeURIComponent('STI2D Physique-Chimie — '+ex.enonce)}`}
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
                  <Link href={`/bac-france/physique/sti2d/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/sti2d/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  fontSize:11, color:'#a78bfa', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(139,92,246,0.08)' }}>
                  ⚙️ STI2D · 8 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'6px 15px 2px', fontSize:9, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac-france/physique/sti2d/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' en STI2D Physique-Chimie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac-france/physique/st2s" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🏥 Voir ST2S</Link>
                  <Link href="/bac-france/physique/sti2d" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
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