'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TERMINALE — PAGE SLUG COMPLÈTE
// Tous chapitres : CH1 Chimie · CH2 Mécanique · CH3 Énergie · CH4 Ondes
// Route : /bac-france/physique/terminale/[slug]
// Programme officiel Terminale Spécialité PC · Bac 2027
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

// ─── Navigation globale ───────────────────────────────────────────────
const NAV_ORDER = ['cinetique-equilibre','deuxieme-loi-newton','gaz-parfait','diffraction-interferences']
const TITRES_NAV: Record<string,string> = {
  'cinetique-equilibre':       'CH.1 — Constitution & Transformations',
  'deuxieme-loi-newton':       'CH.2 — Mouvement & Interactions',
  'gaz-parfait':               'CH.3 — Énergie & Thermodynamique',
  'diffraction-interferences': 'CH.4 — Ondes & Signaux',
}
const SEC_COLORS: Record<string,string> = {
  'cinetique-equilibre':'#10b981',
  'deuxieme-loi-newton':'#4f6ef7',
  'gaz-parfait':'#f59e0b',
  'diffraction-interferences':'#8b5cf6',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — TOUS LES CHAPITRES
// ═════════════════════════════════════════════════════════════════════

const ALL_CHAPTERS: Record<string, {
  id: string; titre: string; badge: string; color: string; emoji: string;
  desc: string;
  souschapitres: {
    id: string; titre: string; notions: string[];
    blocs: {
      notion: string;
      theoremes: { id:string; type:string; nom:string; enonce:string }[];
      exercices: { id:string; niveau:string; titre:string; enonce:string; correction:string }[];
    }[];
  }[];
}> = {

// ═══════════════════════════════════════════════════════════════════════
// CHAPITRE 1 — CONSTITUTION & TRANSFORMATIONS DE LA MATIÈRE
// ═══════════════════════════════════════════════════════════════════════
'cinetique-equilibre': {
  id: 'cinetique-equilibre', emoji:'⚗️', badge:'Chimie', color:'#10b981',
  titre: 'Constitution & Transformations de la Matière',
  desc: 'Dosages, cinétique chimique, équilibres et transformations nucléaires — Programme complet Terminale Spécialité PC.',
  souschapitres: [
    {
      id:'sc-dosages', titre:'1.1 Composition d\'un système — Dosages',
      notions:['Spectrophotométrie UV-visible','Conductimétrie','Titrages : pH-métrie, conductimétrie, colorimétrie','Équivalence, réactif limitant'],
      blocs:[
        {
          notion:'🔬 Spectrophotométrie UV-visible',
          theoremes:[
            { id:'D-SP1', type:'def', nom:'Principe de la spectrophotométrie',
              enonce:'La spectrophotométrie mesure l\'absorption de la lumière par une solution colorée.\n\nPrincipe : un faisceau monochromatique (longueur d\'onde λ) traverse la solution.\n→ L\'intensité transmise I est inférieure à l\'intensité incidente I₀.\n\nDomaines :\n• UV : 200–400 nm\n• Visible : 400–800 nm\n\nUtilisation : dosage des espèces colorées ou absorbant l\'UV.' },
            { id:'F-SP1', type:'formule', nom:'Loi de Beer-Lambert',
              enonce:'A = ε × l × c\n\nA = absorbance = log(I₀/I)  (sans unité)\nε = coefficient d\'absorption molaire (L·mol⁻¹·cm⁻¹)\nl = longueur du trajet optique (cm), souvent l = 1 cm\nc = concentration molaire (mol/L)\n\nDomaine de validité :\n• Solution diluée\n• Lumière monochromatique à λ_max\n• Pas d\'association ni de décomposition' },
            { id:'M-SP1', type:'methode', nom:'Dosage par étalonnage',
              enonce:'1. Choisir λ_max : maximum d\'absorption\n2. Préparer des solutions étalon c₁ < c₂ < … < cₙ\n3. Mesurer A₁, A₂, …, Aₙ → tracer A = f(c) (droite passant par O)\n4. Mesurer A_inconnu\n5. Lire c_inconnu sur la droite\n\nCritère : R² ≥ 0,999 — rester dans la plage d\'étalonnage.' },
          ],
          exercices:[
            { id:'EX-SP1', niveau:'Facile', titre:'Application Beer-Lambert',
              enonce:'A = 0,48. Droite d\'étalonnage : A = 1200×c (c en mol/L). Calculer c.',
              correction:'c = A/1200 = 0,48/1200 = 4,0×10⁻⁴ mol/L' },
            { id:'EX-SP2', niveau:'Intermédiaire', titre:'Vérification de linéarité',
              enonce:'Étalons glucose (mmol/L) : 2 ; 4 ; 6 ; 8. A : 0,12 ; 0,24 ; 0,35 ; 0,47. Un sérum donne A = 0,31. Calculer sa concentration.',
              correction:'A/c ≈ 0,059 → linéaire ✓\nDroite : A = 0,059×c → c = 0,31/0,059 ≈ 5,3 mmol/L (valeur normale ✓)' },
          ]
        },
        {
          notion:'⚡ Conductimétrie',
          theoremes:[
            { id:'D-CO1', type:'def', nom:'Conductance et conductivité',
              enonce:'G = 1/R  (Siemens, S)\nσ = G × l/S  (S·m⁻¹ ou mS·cm⁻¹)\nConstante de cellule : k_cell = l/S\n\nContributions des ions :\nσ = Σ λᵢ × cᵢ\n\nValeurs λᵢ (S·cm²·mol⁻¹) :\n• H₃O⁺ : 350  • OH⁻ : 198\n• Na⁺ : 50   • K⁺ : 73   • Cl⁻ : 76' },
            { id:'M-CO1', type:'methode', nom:'Titrage conductimétrique',
              enonce:'HCl par NaOH :\n• Avant équivalence : H₃O⁺ (λ=350) remplacé par Na⁺ (λ=50) → σ diminue\n• Équivalence : minimum de σ\n• Après : OH⁻ (λ=198) en excès → σ augmente\n\nDéterminer V_éq : intersection des deux droites sur σ = f(V).' },
          ],
          exercices:[
            { id:'EX-CO1', niveau:'Facile', titre:'Calcul de conductivité',
              enonce:'NaCl à 0,010 mol/L. λ(Na⁺)=50, λ(Cl⁻)=76 S·cm²·mol⁻¹. Calculer σ.',
              correction:'σ = (50+76)×0,010 = 1,26 mS·cm⁻¹' },
            { id:'EX-CO2', niveau:'Intermédiaire', titre:'Titrage conductimétrique',
              enonce:'V₀=20 mL HCl titré par NaOH 0,10 mol/L. V_éq=16,0 mL. Calculer c(HCl).',
              correction:'c(HCl) = c_b×V_éq/V₀ = 0,10×16,0/20,0 = 0,080 mol/L' },
          ]
        },
        {
          notion:'🧪 Titrages : pH-métrie, conductimétrie, colorimétrie',
          theoremes:[
            { id:'D-TI1', type:'def', nom:'Principe général d\'un titrage',
              enonce:'Réaction support : rapide, totale, unique, détectable.\n\nÀ l\'équivalence (stœchiométrie a/b) :\nc_a × V_a / a = c_t × V_éq / b' },
            { id:'M-TI1', type:'methode', nom:'Titrage pH-métrique',
              enonce:'Suivi par pH-mètre. Repérer V_éq :\na. Maximum de dpH/dV (méthode dérivée)\nb. Méthode des tangentes parallèles\nc. Saut de pH\n\nAcide fort/base forte :\n• V < V_éq : pH = −log([H₃O⁺] restant)\n• V = V_éq : pH = 7\n• V > V_éq : pH = 14 + log([OH⁻] excès)' },
            { id:'M-TI2', type:'methode', nom:'Indicateurs colorés',
              enonce:'Zone de virage de l\'indicateur HIn/In⁻ :\npKa_In − 1 < pH < pKa_In + 1\n\nChoix selon pH_éq :\n• Hélianthine : 3,1–4,4\n• BBT : 6,0–7,6\n• Phénolphtaléine : 8,2–10,0\n\nAcide fort/base forte → BBT\nAcide faible/base forte (pH_éq > 7) → phénolphtaléine' },
          ],
          exercices:[
            { id:'EX-TI1', niveau:'Facile', titre:'Choix d\'indicateur',
              enonce:'Titrage acide acétique/NaOH : pH_éq = 9,2. Quel indicateur ?',
              correction:'pH_éq = 9,2 → dans la zone phénolphtaléine (8,2–10,0) ✓' },
            { id:'EX-TI2', niveau:'Intermédiaire', titre:'Calcul de concentration',
              enonce:'V_a=20,0 mL HCl titré par NaOH 0,100 mol/L. V_éq=18,4 mL. Calculer c(HCl).',
              correction:'n(NaOH) = 0,100×18,4×10⁻³ = 1,84×10⁻³ mol\nc(HCl) = 1,84×10⁻³/20×10⁻³ = 0,092 mol/L' },
            { id:'EX-TI3', niveau:'Difficile', titre:'Dosage d\'un mélange',
              enonce:'HCl + CH₃COOH (20 mL) par NaOH 0,10 mol/L. Deux sauts : V₁=10 mL (HCl seul), V₂=25 mL (total). Calculer les deux concentrations.',
              correction:'c(HCl) = 0,10×10/20 = 0,050 mol/L\nc(CH₃COOH) = 0,10×(25−10)/20 = 0,075 mol/L' },
          ]
        },
        {
          notion:'⚖️ Équivalence & Réactif limitant',
          theoremes:[
            { id:'D-EQ1', type:'def', nom:'Point d\'équivalence',
              enonce:'Réactifs introduits dans les proportions stœchiométriques : ni excès d\'analyte, ni de titrant.\n\nPour aA + bB → produits :\nn_A/a = n_B/b\nc_a×V_a/a = c_t×V_éq/b\n\n⚠️ Équivalence ≠ neutralité (pH≠7 pour acide/base faible)' },
            { id:'M-EQ1', type:'methode', nom:'Tableau d\'avancement — Réactif limitant',
              enonce:'1. Écrire l\'équation équilibrée aA + bB → produits\n2. Calculer n₀(A) et n₀(B)\n3. x_A = n₀(A)/a ; x_B = n₀(B)/b\n4. Réactif limitant → plus petit x_max\n5. Concentrations finales en fonction de x_max' },
          ],
          exercices:[
            { id:'EX-EQ1', niveau:'Intermédiaire', titre:'Mélange acide/base et pH final',
              enonce:'30 mL CH₃COOH 0,10 mol/L + 20 mL NaOH 0,10 mol/L. Calculer [CH₃COOH] et [CH₃COO⁻] puis pH. pKa = 4,75.',
              correction:'n(acide)=3,0×10⁻³ ; n(base)=2,0×10⁻³ → NaOH limitant\nx_max=2,0×10⁻³ mol, V_tot=50 mL\n[CH₃COOH]=(3,0−2,0)×10⁻³/0,050=0,020 mol/L\n[CH₃COO⁻]=2,0×10⁻³/0,050=0,040 mol/L\npH=4,75+log(0,040/0,020)=4,75+0,30=5,05' },
          ]
        },
      ]
    },
    {
      id:'sc-cinetique', titre:'1.2 Suivi temporel — Cinétique',
      notions:['Vitesse de réaction','Facteurs cinétiques','Évolution des concentrations','Temps de demi-réaction t₁/₂'],
      blocs:[
        {
          notion:'⚡ Vitesse de réaction',
          theoremes:[
            { id:'D-VR1', type:'def', nom:'Vitesse volumique de réaction',
              enonce:'Pour aA + bB → cC + dD :\nv = −(1/a)d[A]/dt = (1/c)d[C]/dt\nUnité : mol·L⁻¹·s⁻¹\n\nLecture graphique : pente de la tangente à la courbe [A]=f(t)\nVitesse initiale v₀ = pente à t=0 (la plus grande)' },
            { id:'F-VR1', type:'formule', nom:'Loi de vitesse et ordre',
              enonce:'v = k × [A]ᵖ × [B]ᵠ\n\nk = constante de vitesse (dépend de T seulement)\np, q = ordres partiels\nn = p+q = ordre global\n\nOrdre 1 : [A](t) = [A]₀×e^(−kt)\nOrdre 0 : [A](t) = [A]₀ − kt\nArrhenius : k = A×e^(−Ea/RT)' },
          ],
          exercices:[
            { id:'EX-VR1', niveau:'Facile', titre:'Vitesse moyenne',
              enonce:'[A] passe de 0,80 à 0,62 mol/L en 30 s. Réaction A→produits. Calculer v_moy.',
              correction:'v_moy = −Δ[A]/Δt = (0,80−0,62)/30 = 6,0×10⁻³ mol·L⁻¹·s⁻¹' },
            { id:'EX-VR2', niveau:'Intermédiaire', titre:'Détermination des ordres',
              enonce:'Doubler [A]₀ → v×4. Tripler [B]₀ → v×3. Donner la loi de vitesse.',
              correction:'2ᵖ=4 → p=2 ; 3ᵠ=3 → q=1\nv = k[A]²[B]  (ordre global 3)' },
            { id:'EX-VR3', niveau:'Difficile', titre:'Énergie d\'activation',
              enonce:'k=1,5×10⁻² s⁻¹ à 300 K ; k=4,8×10⁻² s⁻¹ à 320 K. Calculer Ea. R=8,314.',
              correction:'ln(k₂/k₁) = Ea/R×(1/T₁−1/T₂)\nln(3,2) = 1,163\n1/T₁−1/T₂ = 1/300−1/320 = 2,08×10⁻⁴ K⁻¹\nEa = 1,163×8,314/2,08×10⁻⁴ ≈ 46 500 J/mol ≈ 46,5 kJ/mol' },
          ]
        },
        {
          notion:'🌡️ Facteurs cinétiques',
          theoremes:[
            { id:'D-FC1', type:'def', nom:'Concentration, température, catalyse',
              enonce:'1. Concentration↑ → chocs efficaces↑ → v↑\n2. Température↑ → énergie cinétique↑ → k↑ → v↑\n   Van\'t Hoff : k double tous les 10°C\n3. Catalyseur → abaisse Ea → accélère sans être consommé\n   • Homogène : même phase\n   • Hétérogène : phase solide + réactifs liquides/gazeux\n   • Enzymatique : protéine biologique (spécifique)' },
          ],
          exercices:[
            { id:'EX-FC1', niveau:'Facile', titre:'Effet de la température',
              enonce:'k=2,0×10⁻³ s⁻¹ à 25°C. Estimer k à 55°C (Van\'t Hoff).',
              correction:'ΔT=30°C=3×10°C → k×2³=k×8\nk(55°C) = 2,0×10⁻³×8 = 1,6×10⁻² s⁻¹' },
          ]
        },
        {
          notion:'⏱️ Temps de demi-réaction t₁/₂',
          theoremes:[
            { id:'D-TD1', type:'def', nom:'Définition et formules',
              enonce:'t₁/₂ : durée pour [A] = [A]₀/2\n\nLecture graphique : tracer [A]₀/2, lire t₁/₂\n\nOrdre 1 : t₁/₂ = ln2/k (CONSTANT, indépendant de [A]₀)\nOrdre 0 : t₁/₂ = [A]₀/(2k)\nOrdre 2 : t₁/₂ = 1/(k[A]₀)\n\n→ t₁/₂ constant tout au long = critère d\'ordre 1' },
          ],
          exercices:[
            { id:'EX-TD1', niveau:'Facile', titre:'Calcul de t₁/₂',
              enonce:'Réaction ordre 1, k=0,023 min⁻¹. Calculer t₁/₂.',
              correction:'t₁/₂ = ln2/0,023 = 0,693/0,023 ≈ 30 min' },
            { id:'EX-TD2', niveau:'Intermédiaire', titre:'Concentration après n demi-vies',
              enonce:'Médicament t₁/₂=4h, c₀=200 μg/mL. Concentrations après 12h et 24h ?',
              correction:'12h = 3×t₁/₂ → c = 200/8 = 25 μg/mL\n24h = 6×t₁/₂ → c = 200/64 = 3,1 μg/mL' },
          ]
        },
      ]
    },
    {
      id:'sc-equilibres', titre:'1.3 Équilibres chimiques',
      notions:['Réactions limitées & Quotient Qr','Constante d\'équilibre K','Évolution spontanée','Déplacement d\'équilibre (Le Chatelier)'],
      blocs:[
        {
          notion:'⇌ Quotient Qr & Constante K',
          theoremes:[
            { id:'F-EQC1', type:'formule', nom:'Quotient de réaction Qr',
              enonce:'Pour aA + bB ⇌ cC + dD :\nQr = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ)\n\n→ Solides et solvants purs exclus\nQr,éq = K (constante d\'équilibre)\nK dépend uniquement de T\n\nK>>1 : équilibre → produits (quasi-total)\nK<<1 : équilibre → réactifs (peu avancé)' },
            { id:'M-K1', type:'methode', nom:'Méthode ICE — Calcul à l\'équilibre',
              enonce:'I = Initial ; C = Change (±ax) ; E = Équilibre\n\n1. Remplir le tableau avec x\n2. Écrire K = f(x)\n3. Résoudre en x\n4. Calculer les concentrations\n\nSi K grand → supposer réaction totale puis vérifier' },
          ],
          exercices:[
            { id:'EX-K1', niveau:'Intermédiaire', titre:'Équilibre acide faible',
              enonce:'CH₃COOH 0,10 mol/L, Ka=1,8×10⁻⁵. Calculer [H₃O⁺] et pH.',
              correction:'Ka = x²/(c₀−x) ≈ x²/c₀\nx = √(1,8×10⁻⁵×0,10) = 1,34×10⁻³ mol/L\npH = −log(1,34×10⁻³) = 2,87' },
            { id:'EX-K2', niveau:'Difficile', titre:'Calcul de K',
              enonce:'N₂+3H₂⇌2NH₃. Départ : [N₂]=1 mol/L, [H₂]=3 mol/L. Équilibre : [NH₃]=0,40 mol/L. Calculer K.',
              correction:'x=0,20 → [N₂]=0,80, [H₂]=2,40, [NH₃]=0,40\nK=(0,40)²/((0,80)×(2,40)³) = 0,16/11,06 = 0,0145' },
          ]
        },
        {
          notion:'→ Évolution spontanée & Le Chatelier',
          theoremes:[
            { id:'T-EV1', type:'thm', nom:'Critère d\'évolution spontanée',
              enonce:'Qr < K → sens direct →\nQr = K → équilibre\nQr > K → sens indirect ←' },
            { id:'T-LC1', type:'thm', nom:'Principe de Le Chatelier',
              enonce:'Perturbation → le système s\'oppose en partie :\n\n1. Ajout réactif → Qr↓ → sens direct (consomme le réactif)\n2. Ajout produit → Qr↑ → sens inverse\n3. T↑ → sens endothermique (K modifié)\n4. P↑ (gaz) → côté avec moins de moles de gaz\n5. Dilution → côté avec plus de moles en solution\n\n⚠️ Catalyseur : accélère l\'atteinte de l\'équilibre mais K inchangé' },
          ],
          exercices:[
            { id:'EX-LC1', niveau:'Intermédiaire', titre:'Haber-Bosch et Le Chatelier',
              enonce:'N₂+3H₂⇌2NH₃ (ΔH<0). Pour chaque perturbation, indiquer le sens et l\'effet sur le rendement : (a) P↑, (b) T↑, (c) ajout N₂.',
              correction:'(a) P↑ : 4 mol gaz → 2 mol → sens direct → rendement↑\n(b) T↑ : exo → sens inverse → rendement↓ (mais cinétique↑ → compromis 500°C)\n(c) N₂ ajouté : Qr↓ → sens direct → rendement↑' },
          ]
        },
      ]
    },
    {
      id:'sc-nucleaire', titre:'1.4 Transformations nucléaires',
      notions:['Stabilité noyaux — diagramme N,Z','Radioactivité α β⁻ β⁺ γ','Lois de conservation A et Z','Décroissance N(t)=N₀e^(−λt)','Demi-vie t₁/₂=ln2/λ','Datation & applications médicales'],
      blocs:[
        {
          notion:'⚛️ Stabilité & Diagramme (N,Z)',
          theoremes:[
            { id:'D-NUC1', type:'def', nom:'Diagramme de stabilité',
              enonce:'Vallée de stabilité :\n• Z < 20 : N ≈ Z (N/Z ≈ 1)\n• Z > 20 : N > Z (jusqu\'à N/Z ≈ 1,5)\n\nInstabilité :\n• N/Z trop grand → β⁻\n• N/Z trop petit → β⁺ ou capture e⁻\n• A trop grand (Z>82) → α\n\nNombres magiques (très stables) : 2, 8, 20, 28, 50, 82, 126' },
          ],
          exercices:[
            { id:'EX-NUC0', niveau:'Facile', titre:'Prédire le type de radioactivité',
              enonce:'¹⁴C (Z=6, N=8). Stable ? Type de radioactivité ?',
              correction:'N/Z = 8/6 = 1,33 > 1 → trop de neutrons → β⁻\n¹⁴C → ¹⁴N + ⁰₋₁e + ν̄' },
          ]
        },
        {
          notion:'☢️ Radioactivité α, β⁻, β⁺, γ',
          theoremes:[
            { id:'D-RAD1', type:'def', nom:'Équations de désintégration',
              enonce:'α : ᴬ_Z X → ᴬ⁻⁴_(Z-2) Y + ⁴₂He\n→ A−4, Z−2 | peu pénétrant, très ionisant\n\nβ⁻ : ᴬ_Z X → ᴬ_(Z+1) Y + ⁰₋₁e + ν̄\n→ A conservé, Z+1 | n → p+e⁻+ν̄\n\nβ⁺ : ᴬ_Z X → ᴬ_(Z-1) Y + ⁰₊₁e + ν\n→ A conservé, Z−1 | p → n+e⁺+ν | base de la TEP\n\nγ : ᴬ_Z X* → ᴬ_Z X + γ\n→ A, Z inchangés | très pénétrant (plomb nécessaire)' },
          ],
          exercices:[
            { id:'EX-RAD1', niveau:'Facile', titre:'Désintégration α du Radon',
              enonce:'²²²₈₆Rn → ? + ⁴₂He. Identifier le noyau fils.',
              correction:'A=222−4=218 ; Z=86−2=84\n²²²₈₆Rn → ²¹⁸₈₄Po + ⁴₂He' },
            { id:'EX-RAD2', niveau:'Intermédiaire', titre:'Fission de l\'uranium',
              enonce:'²³⁵₉₂U + ¹₀n → ¹⁴⁴₅₆Ba + ⁸⁹₃₆Kr + x¹₀n. Calculer x.',
              correction:'A : 235+1 = 144+89+x → x = 3 neutrons\nZ : 92+0 = 56+36 ✓' },
          ]
        },
        {
          notion:'📉 Loi de décroissance & Demi-vie',
          theoremes:[
            { id:'F-DEC1', type:'formule', nom:'Loi de décroissance radioactive',
              enonce:'N(t) = N₀ × e^(−λt)\nA(t) = A₀ × e^(−λt)\n\nA = λN  [Becquerel, Bq = désintégration/s]\n\nλ = ln2/t₁/₂ = 0,693/t₁/₂\nt₁/₂ = ln2/λ\n\nAprès n demi-vies :\nN = N₀/2ⁿ  ;  A = A₀/2ⁿ\n\nCalcul de N₀ : N₀ = (m/M)×N_A' },
          ],
          exercices:[
            { id:'EX-DEC1', niveau:'Facile', titre:'Activité après n demi-vies',
              enonce:'A₀=400 MBq, t₁/₂=6h. Calculer A après 24h.',
              correction:'24h = 4×t₁/₂ → A = 400/2⁴ = 25 MBq' },
            { id:'EX-DEC2', niveau:'Intermédiaire', titre:'Calcul de λ et A₀',
              enonce:'¹³¹I : t₁/₂=8,02 j. Calculer λ(s⁻¹) et A₀ pour 1 μg. M=131 g/mol.',
              correction:'t₁/₂=8,02×86400=6,93×10⁵ s\nλ=0,693/6,93×10⁵=1,00×10⁻⁶ s⁻¹\nN₀=(10⁻⁶/131)×6,02×10²³=4,60×10¹⁵\nA₀=λN₀=4,60×10⁹ Bq=4,60 GBq' },
            { id:'EX-DEC3', niveau:'Difficile', titre:'Détermination de t₁/₂ expérimentalement',
              enonce:'A(0)=8000, A(2h)=5657, A(4h)=4000, A(6h)=2828 Bq. Déterminer t₁/₂.',
              correction:'A(4h)/A(0)=4000/8000=0,5=(1/2)¹ après 4h → t₁/₂=4h\nVérif : A(4h)=A(0)/2⁴/² → ln(A)=ln(A₀)−λt, pente=−0,173h⁻¹ → t₁/₂=4h ✓' },
          ]
        },
        {
          notion:'⏳ Datation & Applications médicales',
          theoremes:[
            { id:'M-DAT1', type:'methode', nom:'Datation carbone-14',
              enonce:'t₁/₂(¹⁴C)=5730 ans. Activité référence a₀=0,226 Bq/g.\n\nt = −(t₁/₂/ln2)×ln(a/a₀)\n\nLimites : 500 < t < 50 000 ans\nAutres : ²³⁸U/²⁰⁶Pb (4,5 Ga), ⁴⁰K/⁴⁰Ar' },
            { id:'D-MED1', type:'def', nom:'Applications médicales',
              enonce:'Diagnostic :\n• Scintigraphie : ⁹⁹ᵐTc (t₁/₂=6h, γ)\n• TEP : ¹⁸F (t₁/₂=110 min, β⁺ → 2γ à 180°)\n\nThérapeutique :\n• Radiothérapie : ⁶⁰Co (γ), accélérateur\n• Iodinothérapie : ¹³¹I (thyroïde)\n\nRadioprotection (3 règles) :\n1. Distance (F∝1/r²)\n2. Temps (réduire exposition)\n3. Écran (plomb, béton)' },
          ],
          exercices:[
            { id:'EX-DAT1', niveau:'Intermédiaire', titre:'Datation carbone-14',
              enonce:'a=0,0565 Bq/g, a₀=0,226 Bq/g. t₁/₂=5730 ans. Calculer l\'âge.',
              correction:'a/a₀=0,250=1/4=(1/2)² → 2 demi-vies\nt=2×5730=11 460 ans' },
          ]
        },
      ]
    },
  ]
},

// ═══════════════════════════════════════════════════════════════════════
// CHAPITRE 2 — MOUVEMENT & INTERACTIONS
// ═══════════════════════════════════════════════════════════════════════
'deuxieme-loi-newton': {
  id:'deuxieme-loi-newton', emoji:'🚀', badge:'Mécanique', color:'#4f6ef7',
  titre:'Mouvement & Interactions',
  desc:'Cinématique vectorielle, 2ème et 3ème lois de Newton, gravitation, satellites, lois de Kepler, fluides et théorème de Bernoulli.',
  souschapitres:[
    {
      id:'sc-mouvement', titre:'2.1 Décrire un mouvement',
      notions:['Vecteur position & vitesse','Vecteur accélération','Mouvements rectiligne & circulaire','Représentation paramétrique'],
      blocs:[
        {
          notion:'📍 Vecteur position & Vecteur vitesse',
          theoremes:[
            { id:'D-POS1', type:'def', nom:'Référentiel et vecteur position',
              enonce:'Référentiel = solide de référence + horloge\n• Terrestre, géocentrique, héliocentrique\n\nVecteur position OM⃗ : du point O vers M\n\nTrajectoire : ensemble des positions successives\n• Rectiligne, circulaire, elliptique, parabolique' },
            { id:'F-VIT1', type:'formule', nom:'Vecteur vitesse instantanée',
              enonce:'v⃗ = dOM⃗/dt\n\nComposantes : vₓ=dx/dt ; vᵧ=dy/dt\nNorme : v = √(vₓ²+vᵧ²)  [m/s]\n\nDirection : tangente à la trajectoire\nApprox. discrète : v⃗ᵢ ≈ (OM⃗ᵢ₊₁−OM⃗ᵢ₋₁)/(2Δt)\n\nMCU : v = Rω  ; ω = 2π/T = 2πf' },
          ],
          exercices:[
            { id:'EX-POS1', niveau:'Facile', titre:'Vitesse à partir de positions',
              enonce:'Chronophotographie Δt=0,1s. M₁(0;0), M₂(0,3;0,2), M₃(0,6;0,3) m. Calculer v⃗₂ et v₂.',
              correction:'vₓ=(0,6−0,0)/(2×0,1)=3,0 m/s\nvᵧ=(0,3−0,0)/(2×0,1)=1,5 m/s\nv₂=√(9+2,25)≈3,35 m/s' },
            { id:'EX-POS2', niveau:'Intermédiaire', titre:'Vitesse du satellite géostationnaire',
              enonce:'r=4,22×10⁷ m, T=24h. Calculer v.',
              correction:'v=2πr/T=2π×4,22×10⁷/86400≈3068 m/s' },
          ]
        },
        {
          notion:'📐 Vecteur accélération',
          theoremes:[
            { id:'F-ACC1', type:'formule', nom:'Accélération et décomposition',
              enonce:'a⃗ = dv⃗/dt  [m/s²]\n\nApprox. discrète : a⃗ᵢ≈(OM⃗ᵢ₊₁−2OM⃗ᵢ+OM⃗ᵢ₋₁)/Δt²\n\nDécomposition :\n• Tangentielle a_T = dv/dt (variation de norme)\n  a_T>0 : accélération ; a_T<0 : décélération\n• Normale a_N = v²/R (centripète, vers le centre)\n\nMRU : a⃗=0⃗ ; MRUA : a=cte ; MCU : a=v²/R centripète' },
          ],
          exercices:[
            { id:'EX-ACC1', niveau:'Facile', titre:'Accélération centripète',
              enonce:'Virage R=80m, v=72 km/h. Calculer a_N.',
              correction:'v=20 m/s → a_N=v²/R=400/80=5,0 m/s²' },
            { id:'EX-ACC2', niveau:'Intermédiaire', titre:'Calcul numérique de a⃗',
              enonce:'Δt=0,04s. M₁(0;0), M₂(0,08;0,06), M₃(0,14;0,08) m. Calculer a⃗₂.',
              correction:'aₓ=(0,14−2×0,08+0)/(0,04)²=−0,02/0,0016=−12,5 m/s²\naᵧ=(0,08−0,12+0)/0,0016=−25 m/s²\na=√(156,25+625)≈27,9 m/s²' },
          ]
        },
        {
          notion:'🔄 Équations horaires & Mouvements',
          theoremes:[
            { id:'M-PARAM1', type:'methode', nom:'Méthode générale — Équations horaires',
              enonce:'1. Bilan des forces\n2. ΣF⃗=ma⃗\n3. Projeter : aₓ=ΣFₓ/m ; aᵧ=ΣFᵧ/m\n4. Intégrer → vₓ(t), vᵧ(t) avec CI\n5. Intégrer → x(t), y(t)\n6. Éliminer t → équation cartésienne\n\nMRUA : v=v₀+at ; x=x₀+v₀t+½at² ; v²=v₀²+2aΔx' },
          ],
          exercices:[
            { id:'EX-PARAM1', niveau:'Intermédiaire', titre:'Projectile lancé obliquement',
              enonce:'v₀=18 m/s, α=30°, g=10 m/s². Écrire x(t), y(t). Calculer H et R.',
              correction:'v₀ₓ=15,6 m/s ; v₀ᵧ=9,0 m/s\nx=15,6t ; y=9t−5t²\nt_H=0,9s → H=9×0,9−5×0,81=4,05m\ny=0 → t=1,8s → R=15,6×1,8=28,1m' },
          ]
        },
      ]
    },
    {
      id:'sc-newton', titre:'2.2 Deuxième loi de Newton',
      notions:['ΣF⃗=ma⃗','Champ uniforme pesanteur & électrique','Gravitation newtonienne','Satellites & Kepler','3ème loi Newton'],
      blocs:[
        {
          notion:'⚡ ΣF⃗ = m·a⃗ — Lois de Newton',
          theoremes:[
            { id:'T-NEW1', type:'thm', nom:'2ème loi de Newton',
              enonce:'Dans un référentiel galiléen :\nΣF⃗_ext = m·a⃗\n\nProjections : ΣFₓ=maₓ ; ΣFᵧ=maᵧ\n\nCas particuliers :\n• ΣF⃗=0⃗ → a⃗=0⃗ (MRU/repos)\n• F⃗=cte → a⃗=cte (MRUA)' },
            { id:'T-NEW3', type:'thm', nom:'3ème loi — Action-Réaction',
              enonce:'F⃗(B→A) = −F⃗(A→B)\n• Même droite d\'action\n• Même norme\n• Sens opposé\n• Sur deux corps DIFFÉRENTS\n→ Ne se compensent PAS dans le bilan d\'un seul corps' },
            { id:'M-NEW1', type:'methode', nom:'Résoudre un problème de dynamique',
              enonce:'1. Définir système + référentiel galiléen\n2. Bilan des forces\n3. ΣF⃗=ma⃗\n4. Projeter sur axes\n5. Résoudre\n6. Intégrer pour v(t), x(t)' },
          ],
          exercices:[
            { id:'EX-NEW1', niveau:'Facile', titre:'Plan incliné avec frottements',
              enonce:'m=2kg, θ=30°, μ=0,20, g=10 m/s². Calculer a.',
              correction:'N=mgcosθ=17,3N ; f=μN=3,46N\na=(mgsinθ−f)/m=(10−3,46)/2=3,27 m/s²' },
            { id:'EX-NEW2', niveau:'Intermédiaire', titre:'Vitesse limite parachutiste',
              enonce:'m=80kg, f=kv avec k=50 N·s/m. Calculer v_L et a₀.',
              correction:'v_L=mg/k=80×9,8/50=15,7 m/s\na₀=g=9,8 m/s² (v=0 au départ)' },
            { id:'EX-NEW3', niveau:'Difficile', titre:'Machine d\'Atwood',
              enonce:'m₁=3kg, m₂=5kg, fil inextensible, poulie idéale. g=10 m/s². Calculer a et T.',
              correction:'(m₂−m₁)g=(m₁+m₂)a → a=(5−3)×10/8=2,5 m/s²\nT=m₁(g+a)=3×12,5=37,5N' },
          ]
        },
        {
          notion:'⬇️ Mouvement dans un champ uniforme',
          theoremes:[
            { id:'M-CHAMP1', type:'methode', nom:'Champ de pesanteur — Projectile',
              enonce:'a⃗=g⃗ (sans frottements)\naₓ=0 ; aᵧ=−g\n\nvₓ=v₀cosα (constant)\nvᵧ=v₀sinα−gt\nx=v₀cosα·t\ny=v₀sinα·t−½gt²\n\nPortée : R=v₀²sin(2α)/g (max α=45°)\nH_max=v₀²sin²α/(2g)' },
            { id:'M-CHAMP2', type:'methode', nom:'Champ électrique uniforme — Particule chargée',
              enonce:'Force : F⃗=qE⃗\nSi E⃗ vertical, v₀ horizontal :\naₓ=0 ; aᵧ=qE/m\n→ trajectoire parabolique\n\nAccélération par tension U :\n½mv²=qU → v=√(2qU/m)' },
          ],
          exercices:[
            { id:'EX-CHAMP1', niveau:'Intermédiaire', titre:'Déviation d\'un électron',
              enonce:'m=9,1×10⁻³¹kg, q=1,6×10⁻¹⁹C, v₀=2×10⁷m/s, E=5×10⁴V/m, L=4cm. Calculer la déviation y.',
              correction:'a=qE/m=8,79×10¹⁵m/s²\nt=L/v₀=2×10⁻⁹s\ny=½at²=½×8,79×10¹⁵×4×10⁻¹⁸=1,76cm' },
            { id:'EX-CHAMP2', niveau:'Facile', titre:'Proton accéléré',
              enonce:'Proton, q=1,6×10⁻¹⁹C, m=1,67×10⁻²⁷kg, U=500V. Calculer v finale.',
              correction:'v=√(2qU/m)=√(2×1,6×10⁻¹⁹×500/1,67×10⁻²⁷)≈3,09×10⁵m/s' },
          ]
        },
        {
          notion:'🌍 Gravitation & Satellites',
          theoremes:[
            { id:'T-GRAV1', type:'thm', nom:'Loi de gravitation universelle',
              enonce:'F = G×M×m/r²\nG=6,674×10⁻¹¹ N·m²·kg⁻²\n→ Toujours attractive\n\nChamp : g⃗=−(GM/r²)ê_r\nSur Terre : g=GM_T/R_T²≈9,8 m/s²\nVariation : g(h)=GM_T/(R_T+h)²' },
            { id:'F-SAT1', type:'formule', nom:'Satellite en orbite circulaire',
              enonce:'GMm/r²=mv²/r\n→ v=√(GM/r)  (vitesse orbitale)\n→ T=2π√(r³/GM)\n→ T²=(4π²/GM)×r³  (3ème loi Kepler)\n\nGéostationnaire :\nT=86400s → r≈4,22×10⁷m ≈ 42200km' },
            { id:'T-KEPLER', type:'thm', nom:'3 lois de Kepler',
              enonce:'1ère : orbites elliptiques (Soleil au foyer)\n2ème : aires égales en temps égaux → v max au périhélie\n3ème : T²/r³=4π²/(GM)=cte pour toutes les planètes du système\n\nApplication : calculer masse d\'une planète via sa lune' },
            { id:'D-VLIB', type:'def', nom:'Vitesse de libération',
              enonce:'Vitesse pour échapper au champ gravitationnel :\nv_L=√(2GM/R)\n\nTerre : v_L≈11,2km/s\nv_orbitale=√(GM/R)=v_L/√2≈7,9km/s' },
          ],
          exercices:[
            { id:'EX-SAT1', niveau:'Facile', titre:'Période satellite ISS',
              enonce:'h=400km, R_T=6370km, M_T=5,97×10²⁴kg. Calculer T.',
              correction:'r=6770km=6,77×10⁶m\nT=2π√(r³/GM)=2π√(3,10×10²⁰/3,98×10¹⁴)≈5543s≈92min ✓' },
            { id:'EX-SAT2', niveau:'Intermédiaire', titre:'Masse de Jupiter via Io',
              enonce:'Io : r=4,22×10⁸m, T=1,77j. Calculer M_Jupiter.',
              correction:'M=4π²r³/(GT²)=4π²×(4,22×10⁸)³/(6,67×10⁻¹¹×(1,529×10⁵)²)≈1,90×10²⁷kg ✓' },
            { id:'EX-SAT3', niveau:'Difficile', titre:'Vérification 3ème loi Kepler',
              enonce:'Terre (T=1an, r=1UA). Calculer r(Mars, T=1,88an) et r(Jupiter, T=11,86an).',
              correction:'r³=T² (UA³, avec T en années)\nMars : r=³√(1,88²)=³√3,534=1,524 UA ✓\nJupiter : r=³√(11,86²)=³√140,66=5,202 UA ✓' },
          ]
        },
      ]
    },
    {
      id:'sc-fluides', titre:'2.3 Écoulement d\'un fluide',
      notions:['Laminaire & turbulent','Débit volumique Qv','Théorème de Bernoulli','Applications : Venturi, portance'],
      blocs:[
        {
          notion:'💧 Régimes d\'écoulement & Débit',
          theoremes:[
            { id:'D-FL1', type:'def', nom:'Laminaire, turbulent, Reynolds',
              enonce:'Laminaire : filets parallèles, Re<2000\nTurbulent : tourbillons, Re>4000\nTransition : 2000<Re<4000\n\nNombre de Reynolds :\nRe = ρvL/η\nρ=masse volumique, v=vitesse, L=diamètre, η=viscosité' },
            { id:'F-DEB1', type:'formule', nom:'Débit & Équation de continuité',
              enonce:'Qv = S×v  [m³/s]\nQm = ρ×Qv  [kg/s]\n\nFluide incompressible :\nS₁v₁ = S₂v₂\n→ Section petite → vitesse grande\n→ Section grande → vitesse faible' },
          ],
          exercices:[
            { id:'EX-DEB1', niveau:'Facile', titre:'Continuité dans un tuyau',
              enonce:'D₁=4cm, v₁=0,5m/s, D₂=2cm. Calculer Qv et v₂.',
              correction:'S₁=π×0,02²=1,257×10⁻³m²\nQv=S₁v₁=6,28×10⁻⁴m³/s\nS₂=π×0,01²=3,14×10⁻⁴m²\nv₂=Qv/S₂=2,0m/s ✓' },
          ]
        },
        {
          notion:'🌊 Théorème de Bernoulli',
          theoremes:[
            { id:'T-BER1', type:'thm', nom:'Théorème de Bernoulli',
              enonce:'Fluide parfait, écoulement stationnaire laminaire :\nP + ½ρv² + ρgh = constante\n\nEntre A et B :\nP_A+½ρv_A²+ρgh_A = P_B+½ρv_B²+ρgh_B\n\nInterprétation : conservation énergie/volume\n→ v↑ → P↓ (effet Venturi)' },
            { id:'P-BER1', type:'prop', nom:'Applications de Bernoulli',
              enonce:'Venturi : S₁>S₂ → v₁<v₂ → P₁>P₂\n→ Carburateur, venturimètre, nébuliseur\n\nPortance : extrados plus rapide → P_dessus<P_dessous → portance\n\nTorricelli (grande cuve) :\nv_sortie=√(2gh)\n\nTube de Pitot : v=√(2ΔP/ρ)' },
          ],
          exercices:[
            { id:'EX-BER1', niveau:'Intermédiaire', titre:'Torricelli — vidange',
              enonce:'Cuve ouverte, trou à h=1,6m en dessous du niveau. Calculer v_sortie. g=9,8m/s².',
              correction:'P_atm+ρgh=P_atm+½ρv²\nv=√(2gh)=√(2×9,8×1,6)=5,6m/s' },
            { id:'EX-BER2', niveau:'Intermédiaire', titre:'Venturimètre',
              enonce:'S₁=50cm², v₁=2m/s, S₂=20cm², ρ_eau=1000kg/m³. Calculer P₁−P₂.',
              correction:'v₂=v₁×S₁/S₂=2×50/20=5m/s\nP₁−P₂=½ρ(v₂²−v₁²)=500×(25−4)=10500Pa' },
            { id:'EX-BER3', niveau:'Difficile', titre:'Durée de vidange d\'une cuve',
              enonce:'Cuve S=0,5m², orifice s=5cm² à la base, h₀=2m. Calculer le débit initial et la durée totale. g=9,8m/s².',
              correction:'v=√(2gh) → Qv_initial=s×√(2g×h₀)=5×10⁻⁴×√39,2=3,13×10⁻³m³/s\nÉquation différentielle : −S·dh=s·√(2gh)·dt\nIntégration : t_vidange=(S/s)×√(2h₀/g)=(0,5/5×10⁻⁴)×√(0,408)=639s≈10,7min' },
          ]
        },
      ]
    },
  ]
},

// ═══════════════════════════════════════════════════════════════════════
// CHAPITRE 3 — ÉNERGIE : CONVERSIONS & TRANSFERTS
// ═══════════════════════════════════════════════════════════════════════
'gaz-parfait': {
  id:'gaz-parfait', emoji:'🔥', badge:'Thermodynamique', color:'#f59e0b',
  titre:'Énergie : Conversions & Transferts',
  desc:'Gaz parfait, 1er principe de la thermodynamique, énergie chimique et enthalpie, bilan radiatif terrestre et effet de serre.',
  souschapitres:[
    {
      id:'sc-gaz', titre:'3.1 Gaz parfait',
      notions:['Modèle du gaz parfait','Équation d\'état PV=nRT','Transformations particulières','Masse volumique, température thermodynamique'],
      blocs:[
        {
          notion:'💨 Modèle du gaz parfait & Équation d\'état',
          theoremes:[
            { id:'D-GP1', type:'def', nom:'Modèle du gaz parfait',
              enonce:'Hypothèses :\n• Molécules assimilées à des points (volume propre nul)\n• Pas d\'interactions entre molécules (sauf chocs élastiques)\n• Valable à basse pression et haute température\n\nÉnergie interne U : ne dépend que de T (pas de P ni de V)\nU = n×Cv×T  (Cv = capacité molaire à volume constant)\n\nInterpretation microscopique de T :\n→ T est liée à l\'énergie cinétique moyenne des molécules\n→ T(K) = T(°C) + 273,15 (toujours en Kelvin dans les calculs)' },
            { id:'F-GP1', type:'formule', nom:'Équation d\'état du gaz parfait',
              enonce:'PV = nRT\n\nP = pression (Pa) — 1 atm = 101325 Pa\nV = volume (m³)\nn = quantité de matière (mol)\nR = 8,314 J·mol⁻¹·K⁻¹ (constante des gaz parfaits)\nT = température (K)\n\nFormes dérivées :\nMasse volumique : ρ = PM/(RT)  (M = masse molaire en kg/mol)\nConcentration : c = n/V = P/(RT)\n\nComparaison deux états :\nP₁V₁/T₁ = P₂V₂/T₂ = nR = constante' },
            { id:'D-GP2', type:'def', nom:'Transformations particulières',
              enonce:'Isotherme (T = cte) :\nPV = cte → P₁V₁ = P₂V₂ (loi de Boyle-Mariotte)\n→ Hyperbole dans le plan (P,V)\n\nIsobare (P = cte) :\nV/T = cte → V₁/T₁ = V₂/T₂ (loi de Charles)\n→ Droite dans le plan (V,T)\n\nIsochore (V = cte) :\nP/T = cte → P₁/T₁ = P₂/T₂ (loi de Gay-Lussac)\n→ Droite dans le plan (P,T)\n\nAdiabatique (Q = 0) :\nPas d\'échange thermique (système isolé thermiquement)\nΔU = W' },
          ],
          exercices:[
            { id:'EX-GP1', niveau:'Facile', titre:'Application de PV=nRT',
              enonce:'n=0,5 mol à T=300K, V=10L. Calculer P. Puis P si V→5L à T constante.',
              correction:'P=nRT/V=0,5×8,314×300/(10×10⁻³)=124700Pa≈1,25bar\nIsotherme : P₂=P₁V₁/V₂=1,25×10/5=2,50bar' },
            { id:'EX-GP2', niveau:'Intermédiaire', titre:'Masse volumique d\'un gaz',
              enonce:'Air (M=29g/mol=0,029kg/mol) à T=20°C=293K, P=10⁵Pa. Calculer ρ.',
              correction:'ρ=PM/(RT)=10⁵×0,029/(8,314×293)=2900/2436≈1,19kg/m³ ✓ (valeur tabulée ≈1,2kg/m³)' },
            { id:'EX-GP3', niveau:'Difficile', titre:'Transformation isotherme et isobare combinées',
              enonce:'Un gaz est à P₁=2bar, V₁=5L, T₁=300K. Il subit une compression isotherme jusqu\'à V₂=2L, puis un chauffage isobare jusqu\'à T₃=450K. Calculer P₂, V₃.',
              correction:'Isotherme (T=300K) : P₂=P₁V₁/V₂=2×5/2=5bar\nIsobare (P=P₂=5bar) : V₃=V₂×T₃/T₂=2×450/300=3L\nVérif PV/T : P₁V₁/T₁=2×5/300=0,0333 ; P₃V₃/T₃=5×3/450=0,0333 ✓' },
          ]
        },
      ]
    },
    {
      id:'sc-thermo', titre:'3.2 Premier principe de la thermodynamique',
      notions:['Énergie interne U','Transfert thermique Q & travail W','Capacité thermique Q=mcΔT','Bilan énergétique','Temps caractéristique thermique'],
      blocs:[
        {
          notion:'🔥 Énergie interne & 1er principe',
          theoremes:[
            { id:'T-1ER1', type:'thm', nom:'Premier principe de la thermodynamique',
              enonce:'L\'énergie interne U d\'un système fermé varie selon :\nΔU = W + Q\n\nConvention récepteur (le système reçoit) :\nW = travail reçu par le système (W<0 si le gaz se détend et fournit du travail)\nQ = chaleur reçue par le système (Q>0 si le système absorbe de la chaleur)\n\nConservation de l\'énergie : l\'énergie ne se crée ni ne se détruit, elle se transforme.\n\nPour un gaz parfait :\nΔU = n×Cv×ΔT  (ne dépend que de T)\n\nÀ T constante (isotherme) : ΔU = 0 → W = −Q\n(le travail reçu est intégralement rejeté sous forme de chaleur)' },
            { id:'F-1ER1', type:'formule', nom:'Travail de pression & Transfert thermique',
              enonce:'Travail reçu lors d\'une compression à pression constante :\nW = −P_ext × ΔV\n(W>0 si compression ΔV<0 ; W<0 si détente ΔV>0)\n\nTransfert thermique sensible :\nQ = m × c × ΔT\nm = masse (kg), c = capacité thermique massique (J·kg⁻¹·K⁻¹)\n\nValeurs de c :\n• Eau liquide : 4186 J·kg⁻¹·K⁻¹\n• Aluminium : 900 J·kg⁻¹·K⁻¹\n• Acier : 450 J·kg⁻¹·K⁻¹\n• Verre : 800 J·kg⁻¹·K⁻¹\n\nTransfert thermique latent (changement d\'état) :\nQ = m × L  (L = chaleur latente)' },
          ],
          exercices:[
            { id:'EX-1ER1', niveau:'Facile', titre:'Bilan thermique d\'un chauffe-eau',
              enonce:'200L d\'eau chauffés de 15°C à 60°C. c=4186 J·kg⁻¹·K⁻¹. Calculer Q.',
              correction:'m=200kg ; ΔT=45°C\nQ=200×4186×45=37674000J≈37,7MJ' },
            { id:'EX-1ER2', niveau:'Intermédiaire', titre:'Mélange thermique — température finale',
              enonce:'100g d\'eau à 80°C mélangés à 200g d\'eau à 20°C. Trouver T_f.',
              correction:'Échange : Q_cédé+Q_reçu=0\n100×4,186×(T_f−80)+200×4,186×(T_f−20)=0\n100(T_f−80)+200(T_f−20)=0\n100T_f−8000+200T_f−4000=0\n300T_f=12000 → T_f=40°C' },
            { id:'EX-1ER3', niveau:'Intermédiaire', titre:'1er principe — gaz comprimé',
              enonce:'Un gaz est comprimé à P_ext=2×10⁵Pa, ΔV=−3L. Il reçoit Q=−200J. Calculer W et ΔU.',
              correction:'W=−P_ext×ΔV=−2×10⁵×(−3×10⁻³)=600J\nΔU=W+Q=600+(−200)=400J\n→ L\'énergie interne augmente (compression + refroidissement partiel)' },
            { id:'EX-1ER4', niveau:'Difficile', titre:'Temps de refroidissement — Newton',
              enonce:'Un corps à T₀=80°C se refroidit dans une pièce à T_∞=20°C. Loi de Newton : dT/dt=−k(T−T_∞), k=0,02min⁻¹. Calculer T après 30min et le temps pour atteindre 30°C.',
              correction:'Solution : T(t)−T_∞=(T₀−T_∞)×e^(−kt)\nT(30)−20=60×e^(−0,02×30)=60×e^(−0,6)=60×0,549=32,9°C\nT(30)=52,9°C\n\nPour T=30°C : 30−20=60×e^(−0,02t)\ne^(−0,02t)=10/60=1/6\n−0,02t=ln(1/6)=−1,792\nt=89,6min≈90min' },
          ]
        },
        {
          notion:'🧊 Changements d\'état & Transferts thermiques',
          theoremes:[
            { id:'D-CE1', type:'def', nom:'Chaleur latente & changements d\'état',
              enonce:'Lors d\'un changement d\'état, T reste constante (palier) :\nQ = m × L\nL = chaleur latente (J/kg)\n\nValeurs pour l\'eau :\n• Fusion/solidification : Lf = 334 kJ/kg (0°C)\n• Vaporisation/condensation : Lv = 2260 kJ/kg (100°C)\n\nLv >> Lf : il faut beaucoup plus d\'énergie pour vaporiser que pour fondre.\n→ La transpiration refroidit efficacement car Lv est élevée.' },
            { id:'D-CE2', type:'def', nom:'Modes de transfert thermique',
              enonce:'1. Conduction : transfert dans un solide par agitation moléculaire\n→ Flux : Φ = λ×S×ΔT/e  (λ=conductivité thermique)\n→ Bons conducteurs : Cu (400), Al (237), Fe (80) W·m⁻¹·K⁻¹\n→ Isolants : laine de verre (0,04), polystyrène (0,035)\n\n2. Convection : transport de matière (fluide)\n→ Naturelle (densité) ou forcée (ventilation)\n\n3. Rayonnement : ondes électromagnétiques (IR)\n→ Loi de Stefan-Boltzmann : Φ = σ×T⁴\n→ Ne nécessite pas de milieu matériel (vide)\n\nRésistance thermique : R_th = e/(λ×S) [K/W]' },
          ],
          exercices:[
            { id:'EX-CE1', niveau:'Facile', titre:'Énergie de fonte de glace',
              enonce:'500g de glace à 0°C fondent puis l\'eau est chauffée à 20°C. c=4186, Lf=334kJ/kg. Calculer Q_total.',
              correction:'Q_fusion=0,5×334000=167000J\nQ_chauffage=0,5×4186×20=41860J\nQ_total=167000+41860=208860J≈209kJ' },
            { id:'EX-CE2', niveau:'Intermédiaire', titre:'Isolation thermique',
              enonce:'Paroi de laine de verre : e=10cm, λ=0,04W·m⁻¹·K⁻¹, S=20m². ΔT=20°C. Calculer R_th et Φ.',
              correction:'R_th=e/(λS)=0,10/(0,04×20)=0,125K/W\nΦ=ΔT/R_th=20/0,125=160W' },
          ]
        },
      ]
    },
    {
      id:'sc-enthalpie', titre:'3.3 Énergie chimique & Enthalpie',
      notions:['Énergie de liaison','Enthalpie de réaction ΔrH','Pouvoir calorifique','Énergie de combustion'],
      blocs:[
        {
          notion:'🔗 Énergie de liaison & Enthalpie de réaction',
          theoremes:[
            { id:'D-ENT1', type:'def', nom:'Enthalpie de réaction ΔrH',
              enonce:'ΔrH = énergie échangée avec le milieu extérieur lors de la réaction à pression constante.\n\nΔrH < 0 : réaction exothermique (libère de la chaleur)\nΔrH > 0 : réaction endothermique (absorbe de la chaleur)\n\nUnités : kJ/mol (par mole de réaction avancée d\'une unité)\n\nLoi de Hess :\nΔrH est indépendante du chemin suivi\n→ On peut additionner des réactions' },
            { id:'F-ENT1', type:'formule', nom:'Calcul par énergies de liaison',
              enonce:'ΔrH = Σ E(liaisons rompues) − Σ E(liaisons formées)\n\n• Rompre une liaison : absorbe de l\'énergie (endothermique, positif)\n• Former une liaison : libère de l\'énergie (exothermique, négatif)\n\nÉnergies de liaison (kJ/mol) :\nC−H : 414  C=C : 614  C≡C : 839\nO=O : 498  H−H : 436  O−H : 463\nC=O : 804  C−C : 346  N≡N : 945\n\nExemple H₂ + ½O₂ → H₂O :\nRompues : H−H(436) + ½×O=O(249) = 685 kJ\nFormées : 2×O−H(926) = 926 kJ\nΔrH = 685−926 = −241 kJ/mol (exo ✓)' },
          ],
          exercices:[
            { id:'EX-ENT1', niveau:'Intermédiaire', titre:'Combustion du méthane',
              enonce:'CH₄+2O₂→CO₂+2H₂O. ΔrH=−890kJ/mol. Énergie libérée par 1kg de méthane. M(CH₄)=16g/mol.',
              correction:'n=1000/16=62,5mol\nQ=62,5×890=55625kJ≈55,6MJ\n(cohérent avec Pci méthane≈50MJ/kg ✓)' },
            { id:'EX-ENT2', niveau:'Intermédiaire', titre:'Énergie de liaison — CH₃OH',
              enonce:'Combustion : CH₃OH + 3/2O₂ → CO₂ + 2H₂O. Calculer ΔrH en utilisant les énergies de liaison (C−H:414, C−O:360, O−H:463, O=O:498, C=O:804).',
              correction:'Liaisons rompues dans CH₃OH : 3×C−H(1242) + C−O(360) + O−H(463) = 2065kJ\nLiaisons rompues dans 3/2O₂ : 3/2×O=O(747) = 747kJ\nTotal rompues = 2812kJ\n\nLiaisons formées dans CO₂ : 2×C=O(1608) = 1608kJ\nLiaisons formées dans 2H₂O : 4×O−H(1852) = 1852kJ\nTotal formées = 3460kJ\n\nΔrH = 2812−3460 = −648kJ/mol' },
          ]
        },
        {
          notion:'⛽ Pouvoir calorifique & Combustion',
          theoremes:[
            { id:'D-PCI1', type:'def', nom:'Pouvoir calorifique (PCI / PCS)',
              enonce:'PCI = Pouvoir Calorifique Inférieur : énergie libérée par kg de combustible\n(eau produite considérée à l\'état gazeux)\n\nPCS = Pouvoir Calorifique Supérieur : eau à l\'état liquide\nPCS > PCI  (différence = chaleur de condensation)\n\nValeurs PCI (MJ/kg) :\n• Hydrogène H₂ : 120\n• Méthane CH₄ : 50\n• Propane C₃H₈ : 46\n• Gazole : 42\n• Essence : 43\n• Fioul : 42\n• Éthanol : 27\n• Bois sec : 15\n\nÉnergie libérée : Q = m × PCI\nRendement : η = W_utile/(m×PCI)' },
          ],
          exercices:[
            { id:'EX-PCI1', niveau:'Facile', titre:'Autonomie d\'un véhicule thermique',
              enonce:'Un moteur essence a η=35%, réservoir 50L (ρ=740kg/m³), Pci=43MJ/kg. Calculer l\'énergie utile maximale et comparer à une batterie de 60kWh.',
              correction:'m=50×10⁻³×740=37kg\nQ_totale=37×43=1591MJ\nQ_utile=0,35×1591=557MJ\n557MJ÷3,6 = 154,7kWh\n→ Réservoir essence ≈ 155kWh utiles vs batterie 60kWh → essence ~2,6× plus d\'énergie utile stockée' },
            { id:'EX-PCI2', niveau:'Intermédiaire', titre:'Bilan énergétique d\'une chaudière',
              enonce:'Chaudière gaz (méthane): puissance utile P=10kW, η=90%, Pci=50MJ/kg. Calculer la masse de gaz consommée en 24h.',
              correction:'P_absorbée=P_utile/η=10/0,9=11,11kW\nÉnergie absorbée/jour=11,11×24×3600=960000J/s×86400s\n=11,11kW×86400s=959904kJ≈960MJ\nm=Q/Pci=960/50=19,2kg de méthane' },
          ]
        },
      ]
    },
    {
      id:'sc-radiatif', titre:'3.4 Bilan radiatif terrestre',
      notions:['Rayonnement solaire & flux radiatif','Bilan thermique Terre-atmosphère','Albédo','Effet de serre'],
      blocs:[
        {
          notion:'☀️ Rayonnement solaire & Bilan radiatif',
          theoremes:[
            { id:'D-RAD1', type:'def', nom:'Constante solaire, albédo et flux radiatif',
              enonce:'Constante solaire : φ₀ = 1361 W/m²\n(flux reçu perpendiculairement au sommet de l\'atmosphère)\n\nAlbédo a : fraction de l\'énergie solaire réfléchie\n→ Terre entière : a ≈ 0,30\n→ Glace : a ≈ 0,80  ; Océan : a ≈ 0,06  ; Forêt : a ≈ 0,15\n\nÉnergie solaire absorbée par la Terre :\nP_abs = φ₀ × π × R² × (1−a)\n→ πR² : section transversale interceptant le rayonnement solaire' },
            { id:'T-BRF1', type:'thm', nom:'Température d\'équilibre de la Terre',
              enonce:'La Terre émet un rayonnement infrarouge (corps noir) :\nP_ém = σ × T⁴ × 4πR²\nσ = 5,67×10⁻⁸ W·m⁻²·K⁻⁴ (constante de Stefan-Boltzmann)\n4πR² : surface totale de la sphère terrestre\n\nÀ l\'équilibre énergétique : P_abs = P_ém\nφ₀×πR²×(1−a) = σ×T_éq⁴×4πR²\n\nT_éq = [φ₀(1−a)/(4σ)]^(1/4)\n\nSans atmosphère :\nT_éq = [1361×0,70/(4×5,67×10⁻⁸)]^(1/4) ≈ 255K = −18°C\n\nAvec effet de serre naturel : T_observée ≈ 288K = +15°C\n→ L\'effet de serre naturel réchauffe la Terre de +33°C !' },
          ],
          exercices:[
            { id:'EX-BRF1', niveau:'Facile', titre:'Température d\'équilibre',
              enonce:'Calculer T_éq de la Terre sans atmosphère. φ₀=1361W/m², a=0,30, σ=5,67×10⁻⁸.',
              correction:'T_éq=[1361×0,70/(4×5,67×10⁻⁸)]^(1/4)\n=[952,7/2,268×10⁻⁷]^(1/4)\n=[4,20×10⁹]^(1/4)≈254K≈−19°C' },
            { id:'EX-BRF2', niveau:'Intermédiaire', titre:'Impact d\'une variation d\'albédo',
              enonce:'Si l\'albédo passe de 0,30 à 0,28 (fonte des glaces). Calculer la variation ΔT_éq. Utiliser T_éq=[φ₀(1−a)/(4σ)]^(1/4) et la différentielle.',
              correction:'T_éq ∝ (1−a)^(1/4)\nT₁ = [1361×0,70/(4σ)]^(1/4) = 254,9K\nT₂ = [1361×0,72/(4σ)]^(1/4)\n(T₂/T₁)⁴ = 0,72/0,70 = 1,0286\nT₂/T₁ = 1,0286^(1/4) = 1,00710\nT₂ = 254,9×1,00710 = 256,7K\nΔT = +1,8K → Rétroaction positive : fonte → albédo↓ → T↑ → plus de fonte' },
          ]
        },
        {
          notion:'🌡️ Effet de serre & Changement climatique',
          theoremes:[
            { id:'D-ES1', type:'def', nom:'Mécanisme de l\'effet de serre',
              enonce:'1. Le Soleil émet principalement dans le visible (λ≈0,5μm, T≈5780K)\n2. La surface terrestre absorbe et réémet dans l\'infrarouge (λ≈10μm, T≈288K)\n3. Les gaz à effet de serre (GES) absorbent ce rayonnement IR\n   et le réémet dans toutes les directions, dont vers la surface\n4. La surface reçoit plus d\'énergie → se réchauffe davantage\n\nPrincipaux GES :\n• H₂O (vapeur) : GES naturel principal (60% de l\'effet de serre)\n• CO₂ : 20% — principale cible des politiques climatiques\n• CH₄ (méthane) : 20× plus puissant que CO₂\n• N₂O, O₃, HFC…\n\nEffect de serre anthropique :\n→ CO₂ atmosphérique : 280 ppm (1850) → 420 ppm (2024)\n→ Forçage radiatif ≈ +2,7 W/m² depuis 1750\n→ Réchauffement observé : +1,2°C depuis l\'ère préindustrielle' },
          ],
          exercices:[
            { id:'EX-ES1', niveau:'Intermédiaire', titre:'Forçage radiatif et T d\'équilibre',
              enonce:'L\'effet de serre ajoute un forçage radiatif F=+150W/m² (flux additionnel vers la surface). Nouveau bilan : φ₀(1−a)/4 + F = σT⁴. Calculer T_éq avec F=150W/m².',
              correction:'P_abs/surface = φ₀(1−a)/4 = 1361×0,70/4 = 238,2W/m²\nNouveau bilan : σT⁴ = 238,2+150 = 388,2W/m²\nT⁴ = 388,2/(5,67×10⁻⁸) = 6,845×10⁹\nT = (6,845×10⁹)^(1/4) = 287,8K ≈ 288K = +15°C ✓' },
          ]
        },
      ]
    },
  ]
},

// ═══════════════════════════════════════════════════════════════════════
// CHAPITRE 4 — ONDES & SIGNAUX
// ═══════════════════════════════════════════════════════════════════════
'diffraction-interferences': {
  id:'diffraction-interferences', emoji:'🌊', badge:'Physique des ondes', color:'#8b5cf6',
  titre:'Ondes & Signaux',
  desc:'Diffraction et interférences lumineuses, effet Doppler, circuits RLC en régime sinusoïdal, circuit RC et condensateur.',
  souschapitres:[
    {
      id:'sc-ondes', titre:'4.1 Propagation des ondes — Diffraction & Interférences',
      notions:['Diffraction — condition λ≈a','Interférences lumineuses (Young)','Différence de marche δ','Interfrange i=λD/a'],
      blocs:[
        {
          notion:'〰️ Diffraction',
          theoremes:[
            { id:'D-DIF1', type:'def', nom:'Phénomène de diffraction',
              enonce:'La diffraction est l\'étalement d\'une onde lors du passage par une ouverture ou autour d\'un obstacle.\n\nCondition de diffraction notable : λ ≈ a\nλ = longueur d\'onde, a = largeur de l\'ouverture ou taille de l\'obstacle\n\nAngle de diffraction (approximation petit angle) :\nθ ≈ λ/a  (en radians)\n\nLargeur de la tache centrale (sur un écran à distance D) :\nL = 2λD/a\n\nSi a >> λ : pas de diffraction notable (rayons lumineux ≈ rectiligne)\nSi a ≈ λ : diffraction maximale\nSi a << λ : l\'onde est totalement diffusée' },
            { id:'P-DIF1', type:'prop', nom:'Diffraction et résolution',
              enonce:'Limite de résolution (critère de Rayleigh) :\nθ_min ≈ 1,22λ/D\nD = diamètre de l\'ouverture (pupille, miroir…)\n\n→ Plus D est grand, meilleure est la résolution (télescopes, jumelles)\n→ Plus λ est petite, meilleure est la résolution (UV, X vs lumière visible)\n\nApplications :\n• Télescope James Webb (D=6,5m) vs Hubble (D=2,4m) → meilleure résolution\n• Microscopie électronique (λ_e << λ_visible) → résolution atomique\n• CD/DVD/Blu-ray : réseau de diffraction pour lire les pistes' },
          ],
          exercices:[
            { id:'EX-DIF1', niveau:'Facile', titre:'Largeur de la tache de diffraction',
              enonce:'Laser λ=633nm traverse une fente a=0,1mm, D=2m. Calculer la largeur L de la tache centrale.',
              correction:'L=2λD/a=2×633×10⁻⁹×2/(0,1×10⁻³)\nL=2536×10⁻⁹/10⁻⁴=2,536×10⁻²m≈2,5cm' },
            { id:'EX-DIF2', niveau:'Intermédiaire', titre:'Condition de diffraction',
              enonce:'La lumière visible (λ≈500nm) doit-elle être diffractée par : (a) un cheveu (a≈80μm), (b) une fente de a=0,5mm, (c) le réseau d\'un CD (a≈1,6μm) ?',
              correction:'(a) λ/a = 500×10⁻⁹/80×10⁻⁶ = 6,25×10⁻³ ≈ 0 → peu de diffraction\n(b) λ/a = 500×10⁻⁹/5×10⁻⁴ = 10⁻³ → légère diffraction\n(c) λ/a = 500×10⁻⁹/1,6×10⁻⁶ = 0,31 → forte diffraction (θ≈18°) → irisations ✓' },
          ]
        },
        {
          notion:'💡 Interférences lumineuses — Fentes de Young',
          theoremes:[
            { id:'F-INT1', type:'formule', nom:'Interférences — Fentes de Young',
              enonce:'Dispositif : deux fentes S₁ et S₂ séparées de a, écran à distance D, lumière de longueur d\'onde λ.\n\nDifférence de marche : δ = S₁M − S₂M ≈ a×x/D\n(x = position sur l\'écran depuis le centre O)\n\nFranges brillantes (interférences constructives) :\nδ = k×λ  (k ∈ ℤ) → x = k×λD/a\n\nFranges sombres (interférences destructives) :\nδ = (k+½)×λ → x = (k+½)×λD/a\n\nInterfrange :\ni = λD/a  (distance entre deux franges brillantes consécutives)\n\nDans un milieu d\'indice n : λ_n = λ/n → i diminue' },
            { id:'P-INT1', type:'prop', nom:'Propriétés des franges d\'interférences',
              enonce:'• Frange centrale (k=0) : brillante, la plus brillante (δ=0 quelle que soit λ)\n• Lumière blanche → frange centrale blanche, puis irisations de part et d\'autre\n\nInfluence des paramètres :\n• a↑ → i↓ (franges plus serrées)\n• D↑ → i↑ (franges plus espacées)\n• λ↑ → i↑ (rouge plus espacé que violet)\n\nConditions d\'obtention :\n• Sources cohérentes : même longueur d\'onde, différence de phase constante\n• Même polarisation (pour la lumière)\n\nApplications :\n• Mesure précise de λ (interféromètre)\n• Contrôle de planéité des surfaces optiques\n• Fibre optique, holographie' },
          ],
          exercices:[
            { id:'EX-INT1', niveau:'Facile', titre:'Calcul de l\'interfrange',
              enonce:'a=0,2mm, D=1,5m, λ=589nm (jaune sodium). Calculer i.',
              correction:'i=λD/a=589×10⁻⁹×1,5/(0,2×10⁻³)\ni=883,5×10⁻⁹/2×10⁻⁴=4,42×10⁻³m=4,42mm' },
            { id:'EX-INT2', niveau:'Intermédiaire', titre:'Nature d\'une frange',
              enonce:'a=1mm, D=2m, λ=600nm. Pour x=3mm, calculer δ. Frange brillante ou sombre ?',
              correction:'δ=ax/D=10⁻³×3×10⁻³/2=1,5×10⁻⁶m=1500nm\nδ/λ=1500/600=2,5=(2+½) → ordre k=2, demi → SOMBRE ✓' },
            { id:'EX-INT3', niveau:'Difficile', titre:'Mesure de longueur d\'onde',
              enonce:'On mesure 5 interfranges : Δx=18,0mm pour a=0,25mm, D=1,50m. Calculer λ. Identifier la couleur.',
              correction:'5i=18,0mm → i=3,60mm=3,60×10⁻³m\nλ=i×a/D=3,60×10⁻³×0,25×10⁻³/1,50\nλ=0,90×10⁻⁶/1,5×10⁰=6,0×10⁻⁷m=600nm → orange ✓' },
          ]
        },
      ]
    },
    {
      id:'sc-doppler', titre:'4.2 Effet Doppler',
      notions:['Décalage Doppler ondes mécaniques & EM','Fréquence perçue selon le mouvement','Applications : radar, médecine, astrophysique'],
      blocs:[
        {
          notion:'🔉 Effet Doppler — Principe et formules',
          theoremes:[
            { id:'D-DOP1', type:'def', nom:'Effet Doppler',
              enonce:'Lorsqu\'une source sonore ou EM et un observateur sont en mouvement relatif, la fréquence perçue f_obs diffère de la fréquence émise f_s.\n\nSource se rapproche → fronts d\'onde comprimés → f_obs > f_s (son aigu, lumière bleue)\nSource s\'éloigne → fronts d\'onde étirés → f_obs < f_s (son grave, lumière rouge)' },
            { id:'F-DOP1', type:'formule', nom:'Formules Doppler',
              enonce:'Ondes sonores (v = vitesse du son ≈ 340m/s dans l\'air) :\n\nSource mobile, observateur fixe :\nf_obs = f_s × v/(v ∓ v_s)\n− : source s\'approche ; + : source s\'éloigne\n\nObservateur mobile, source fixe :\nf_obs = f_s × (v ± v_obs)/v\n+ : observateur s\'approche ; − : s\'éloigne\n\nOndes électromagnétiques (v_rel << c) :\nΔf/f ≈ v_rel/c\n\nDécalage vers le rouge (redshift) z :\nz = (λ_obs−λ_em)/λ_em ≈ v_rec/c' },
            { id:'P-DOP1', type:'prop', nom:'Applications de l\'effet Doppler',
              enonce:'1. Radar de vitesse (police) :\n   Ondes radio, mesure Δf → v = cΔf/(2f₀)\n\n2. Échographie Doppler (médecine) :\n   Ultrasons, mesure v_sang dans les vaisseaux\n   → Détection des sténoses, thromboses\n\n3. Astrophysique — Expansion de l\'Univers :\n   Galaxies s\'éloignent → décalage vers le rouge (redshift)\n   z = v_rec/c → loi de Hubble : v = H₀×d\n   H₀ ≈ 67 km·s⁻¹·Mpc⁻¹\n\n4. Météorologie — Radar Doppler :\n   Mesure le mouvement des masses d\'air\n\n5. Sonar, LiDAR, navigation GPS' },
          ],
          exercices:[
            { id:'EX-DOP1', niveau:'Facile', titre:'Ambulance',
              enonce:'Ambulance f_s=440Hz, v_s=30m/s vers observateur fixe. v_son=340m/s. Calculer f_obs.',
              correction:'f_obs=f_s×v/(v−v_s)=440×340/(340−30)=440×340/310\n=440×1,097≈482Hz' },
            { id:'EX-DOP2', niveau:'Intermédiaire', titre:'Radar de vitesse',
              enonce:'Radar f₀=24GHz. Signal reçu d\'une voiture s\'approchant : f=24,000002 4GHz. Calculer v. c=3×10⁸m/s.',
              correction:'Δf=f−f₀=2400Hz\nv=cΔf/(2f₀)=3×10⁸×2400/(2×24×10⁹)\n=720×10⁸/(48×10⁹)=1,5×10⁰=1,5... Attendez:\nv=c×Δf/f₀=3×10⁸×2,4×10³/24×10⁹=30m/s=108km/h' },
            { id:'EX-DOP3', niveau:'Difficile', titre:'Redshift galactique',
              enonce:'La raie Hα (λ_em=656,3nm) d\'une galaxie est observée à λ_obs=720nm. Calculer z et la vitesse de récession. À quelle distance se trouve-t-elle ? H₀=67km/s/Mpc.',
              correction:'z=(720−656,3)/656,3=63,7/656,3=0,0970\nv_rec=z×c=0,097×3×10⁵=29100km/s\nd=v/H₀=29100/67=434Mpc≈1,4milliards d\'années-lumière' },
          ]
        },
      ]
    },
    {
      id:'sc-rlc', titre:'4.3 Circuits en régime sinusoïdal — RLC',
      notions:['Régime sinusoïdal forcé','Impédance Z & déphasage φ','Circuit RLC série','Résonance ω₀=1/√(LC)','Facteur de qualité Q'],
      blocs:[
        {
          notion:'〰️ Régime sinusoïdal forcé & Impédances',
          theoremes:[
            { id:'D-RLC1', type:'def', nom:'Régime sinusoïdal — Dipôles R, L, C',
              enonce:'Signal sinusoïdal : u(t) = U_max×cos(ωt) ; i(t) = I_max×cos(ωt+φ)\n\nImpédances :\n• Résistance R : Z_R = R (pas de déphasage, cosφ=1)\n• Bobine L : Z_L = Lω (courant en RETARD de π/2 sur u)\n• Condensateur C : Z_C = 1/(Cω) (courant en AVANCE de π/2 sur u)\n\nω = 2πf = pulsation (rad/s)\n\nValeur efficace :\nU_eff = U_max/√2 ≈ 0,707×U_max\nI_eff = I_max/√2' },
            { id:'F-RLC1', type:'formule', nom:'Circuit RLC série — Impédance et résonance',
              enonce:'Impédance totale RLC série :\nZ = √[R² + (Lω−1/Cω)²]\n\nDéphasage : tan φ = (Lω−1/Cω)/R\nφ>0 : circuit inductif (L dominant) ; φ<0 : capacitif (C dominant)\n\nCourant : I_eff = U_eff/Z\n\nPulsation de résonance :\nω₀ = 1/√(LC)\nf₀ = ω₀/(2π)\n\nÀ la résonance :\n→ Z_L = Z_C → Lω₀ = 1/(Cω₀)\n→ Z = R (minimum)\n→ I_eff = U_eff/R (maximum)\n→ φ = 0 (u et i en phase)' },
            { id:'D-RLC2', type:'def', nom:'Facteur de qualité Q',
              enonce:'Q = Lω₀/R = 1/(RCω₀) = (1/R)√(L/C)\n\nBande passante :\nΔω = ω₀/Q\n\nInterprétation :\n• Q grand (R faible) → pic de résonance étroit et élevé → sélectif\n• Q petit (R grand) → pic large et aplati → peu sélectif\n\nApplications :\n→ Circuit accordé (radio, TV) : sélectionne f₀\n→ Filtre passe-bande : laisse passer [ω₀−Δω/2 ; ω₀+Δω/2]\n→ Antenne de réception : accordée sur f_porteuse' },
          ],
          exercices:[
            { id:'EX-RLC1', niveau:'Facile', titre:'Pulsation de résonance',
              enonce:'L=0,1H, C=10μF. Calculer ω₀ et f₀.',
              correction:'ω₀=1/√(LC)=1/√(0,1×10⁻⁵)=1/√(10⁻⁶)=1000rad/s\nf₀=1000/(2π)≈159Hz' },
            { id:'EX-RLC2', niveau:'Intermédiaire', titre:'Impédance et courant hors résonance',
              enonce:'R=100Ω, L=0,1H, C=10μF, U=10V, f=200Hz. Calculer Z, I et φ.',
              correction:'ω=2π×200≈1257rad/s\nZ_L=Lω=0,1×1257=125,7Ω\nZ_C=1/(Cω)=1/(10⁻⁵×1257)=79,6Ω\nZ=√(100²+(125,7−79,6)²)=√(10000+2122)≈110Ω\nI=U/Z=10/110≈91mA\ntanφ=(125,7−79,6)/100=0,461 → φ≈25° (inductif)' },
            { id:'EX-RLC3', niveau:'Difficile', titre:'Facteur de qualité et sélectivité',
              enonce:'Circuit RLC série : L=50mH, C=2nF, R=10Ω. Calculer ω₀, f₀, Q et Δf (bande passante).',
              correction:'ω₀=1/√(50×10⁻³×2×10⁻⁹)=1/√(10⁻¹⁰)=10⁵rad/s\nf₀=10⁵/(2π)≈15920Hz≈15,9kHz\nQ=Lω₀/R=50×10⁻³×10⁵/10=500\nΔω=ω₀/Q=10⁵/500=200rad/s\nΔf=Δω/(2π)≈31,8Hz\n→ Circuit très sélectif (Q=500 >> 1)' },
          ]
        },
      ]
    },
    {
      id:'sc-rc', titre:'4.4 Circuit RC — Charge et décharge',
      notions:['Charge d\'un condensateur','Décharge — τ=RC','Équation différentielle 1er ordre','Capteurs capacitifs'],
      blocs:[
        {
          notion:'🔋 Circuit RC — Condensateur',
          theoremes:[
            { id:'D-RC1', type:'def', nom:'Condensateur — Relation u-i',
              enonce:'Un condensateur de capacité C [Farads] stocke des charges électriques.\n\nRelation fondamentale :\ni = C × du_C/dt\n\nÉnergie stockée :\nW_C = ½ × C × u_C²\n\nCapacités courantes :\n• Condensateur céramique : 1pF − 1μF\n• Électrolytique : 1μF − 10000μF\n• Supercondensateur : 1F − 3000F\n\nRôles : filtrage, couplage, réservoir d\'énergie, minuterie' },
            { id:'F-RC1', type:'formule', nom:'Constante de temps et équations',
              enonce:'Constante de temps : τ = R × C  (secondes, R en Ω, C en F)\n\nCharge (source E, condensateur initialement déchargé) :\nu_C(t) = E × (1 − e^(−t/τ))\ni(t) = (E/R) × e^(−t/τ)\n\nDécharge (u_C(0) = U₀, source déconnectée) :\nu_C(t) = U₀ × e^(−t/τ)\ni(t) = −(U₀/R) × e^(−t/τ)\n\nValeurs remarquables :\n• t = τ : u_C ≈ 0,632×E (charge) ou u_C ≈ 0,368×U₀ (décharge)\n• t = 5τ : u_C ≈ 0,993×E (≈ complètement chargé)\n• t = 2τ : u_C ≈ 0,865×E  ; t = 3τ : u_C ≈ 0,950×E' },
            { id:'D-RC2', type:'def', nom:'Équation différentielle et résolution',
              enonce:'Charge (loi des mailles : E = R×i + u_C) :\nRC × du_C/dt + u_C = E\n→ Équation différentielle 1er ordre à coefficients constants\n\nSolution générale : u_C(t) = E + K×e^(−t/τ)\nCondition initiale u_C(0) = 0 → K = −E\n→ u_C(t) = E×(1−e^(−t/τ)) ✓\n\nDécharge (pas de source) :\nRC × du_C/dt + u_C = 0\n→ u_C(t) = U₀×e^(−t/τ) ✓\n\nMéthode graphique pour trouver τ :\n→ Tangente à l\'origine : coupe l\'asymptote en t = τ\n→ Ou lire t pour u_C = 0,632×E (63,2%)' },
            { id:'P-RC1', type:'prop', nom:'Capteurs capacitifs',
              enonce:'La capacité d\'un condensateur plan : C = ε₀×ε_r×S/d\nε₀ = 8,85×10⁻¹² F/m, ε_r = permittivité relative, S = surface, d = distance\n\nVariation de C → variation de τ = RC → mesure du temps de charge → mesure de la grandeur physique\n\nCapteur de pression : déformation → d change → C change\nCapteur d\'humidité : eau dans diélectrique → ε_r change → C change\nCapteur de position : surface en regard S change → C change\nClaviers tactiles (smartphones) : capacité entre doigt et dalle' },
          ],
          exercices:[
            { id:'EX-RC1', niveau:'Facile', titre:'Constante de temps',
              enonce:'R=10kΩ, C=100μF. Calculer τ. À quel instant u_C=9V si E=12V ?',
              correction:'τ=RC=10×10³×100×10⁻⁶=1s\nu_C=E(1−e^(−t/τ)) → 9=12(1−e^(−t))\ne^(−t)=1−9/12=0,25\nt=−ln(0,25)=1,386s≈1,39τ' },
            { id:'EX-RC2', niveau:'Intermédiaire', titre:'Décharge et demi-décharge',
              enonce:'C=50μF chargé à U₀=20V, se décharge dans R=2kΩ. Calculer τ et quand u_C=5V.',
              correction:'τ=RC=2×10³×50×10⁻⁶=0,1s\nu_C=U₀×e^(−t/τ) → 5=20×e^(−10t)\ne^(−10t)=0,25 → t=ln(4)/10=0,139s≈1,39τ' },
            { id:'EX-RC3', niveau:'Difficile', titre:'Détermination de τ par la méthode graphique',
              enonce:'Relevé de la charge d\'un condensateur (E=10V) : t(ms) : 0 ; 1 ; 2 ; 3 ; 4 ; 5. u_C(V) : 0 ; 3,93 ; 6,32 ; 7,77 ; 8,65 ; 9,18. Déterminer τ par deux méthodes.',
              correction:'Méthode 1 (valeur 63,2%) :\nu_C=0,632×E=6,32V à t=2ms → τ=2ms\n\nMéthode 2 (tangente à l\'origine) :\nPente initiale=(du_C/dt)|₀=E/τ\nΔu_C/Δt≈(3,93−0)/(1−0)=3,93V/ms\nτ=E/(pente)=10/3,93≈2,5ms\n(légère différence due à la discrétisation)\n\nLecture directe τ≈2ms ✓ → C=τ/R (si R connu)' },
          ]
        },
      ]
    },
  ]
},
} // fin ALL_CHAPTERS

// ─────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────

export default function PhysiqueTerminaleChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [activeTab, setActiveTab] = useState<string>('')

  // Initialiser l'onglet actif si pas encore défini
  const currentTabId = activeTab || (chapter?.souschapitres[0]?.id ?? '')
  const currentSC = chapter?.souschapitres.find(sc => sc.id === currentTabId) || chapter?.souschapitres[0]

  if (!chapter) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>🔬</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/physique/terminale" className="btn btn-primary">← Retour Terminale PC</Link>
    </div>
  )

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
            <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/physique" style={{ color:'var(--muted)', textDecoration:'none' }}>Physique-Chimie</Link>
            <span>›</span>
            <Link href="/bac-france/physique/terminale" style={{ color:'var(--muted)', textDecoration:'none' }}>Terminale</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header chapitre */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>CH.0{idx+1}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(245,158,11,0.15)', color:'#fbbf24', fontWeight:700 }}>⭐ BAC · Coef.16</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(22px,3vw,36px)', marginBottom:10 }}>
              {chapter.emoji} {chapter.titre}
            </h1>
            <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7 }}>{chapter.desc}</p>
          </div>

          {/* Onglets sous-chapitres */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:28, borderBottom:'1px solid var(--border)', paddingBottom:12 }}>
            {chapter.souschapitres.map(sc => (
              <button key={sc.id}
                onClick={() => { setActiveTab(sc.id); setOpenEx(null) }}
                style={{ padding:'7px 14px', borderRadius:10,
                  border:`1px solid ${(activeTab||chapter.souschapitres[0].id)===sc.id ? secColor : 'var(--border)'}`,
                  background: (activeTab||chapter.souschapitres[0].id)===sc.id ? `${secColor}18` : 'transparent',
                  color: (activeTab||chapter.souschapitres[0].id)===sc.id ? secColor : 'var(--muted)',
                  fontSize:12, fontWeight:(activeTab||chapter.souschapitres[0].id)===sc.id ? 800 : 500,
                  cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                {sc.titre}
              </button>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:28, alignItems:'start' }}>

            {/* Contenu principal */}
            <div>
              {currentSC && (
                <>
                  {/* En-tête sous-chapitre */}
                  <div style={{ marginBottom:20, padding:'14px 18px', background:`${secColor}0a`, border:`1px solid ${secColor}25`, borderRadius:12 }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>Sous-chapitre actif</div>
                    <div style={{ fontSize:16, fontWeight:800, color:secColor }}>{currentSC.titre}</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:8 }}>
                      {currentSC.notions.map(n => (
                        <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:14, background:`${secColor}15`, color:'var(--text2)', border:`1px solid ${secColor}20` }}>{n}</span>
                      ))}
                    </div>
                  </div>

                  {/* Blocs notion par notion */}
                  {currentSC.blocs.map(bloc => (
                    <div key={bloc.notion} style={{ marginBottom:36 }}>
                      {/* Titre notion */}
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:8, borderBottom:`2px solid ${secColor}20` }}>
                        <div style={{ width:3, height:22, background:secColor, borderRadius:2 }}/>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>{bloc.notion}</h2>
                      </div>

                      {/* Théorèmes / Définitions */}
                      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:16 }}>
                        {bloc.theoremes.map(t => (
                          <div key={t.id} style={{ border:`1px solid ${C[t.type as keyof typeof C]||secColor}30`, borderLeft:`4px solid ${C[t.type as keyof typeof C]||secColor}`, borderRadius:'0 12px 12px 0', overflow:'hidden' }}>
                            <div style={{ background:`${C[t.type as keyof typeof C]||secColor}10`, padding:'9px 15px', display:'flex', gap:10, alignItems:'center' }}>
                              <span style={{ fontSize:10, fontWeight:800, color:C[t.type as keyof typeof C]||secColor, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', background:`${C[t.type as keyof typeof C]||secColor}20`, padding:'2px 8px', borderRadius:6 }}>{L[t.type]||t.type}</span>
                              <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{t.nom}</span>
                            </div>
                            <div style={{ padding:'12px 16px', background:'rgba(255,255,255,0.02)' }}>
                              <pre style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.85, margin:0, fontFamily:'var(--font-body)', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{t.enonce}</pre>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Exercices */}
                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.07em' }}>📝 Exercices</div>
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
                                <Link href={`/solve?q=${encodeURIComponent('Terminale PC — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
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
                    </div>
                  ))}
                </>
              )}

              {/* Navigation prev/next */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/physique/terminale/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/physique/terminale/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[nextSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* Sidebar */}
            <aside style={{ position:'sticky', top:88 }}>
              {/* Navigation chapitres */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  ⚛️ Terminale PC — 4 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/physique/terminale/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' en Terminale PC')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧮 Solveur PC</Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac-france/physique/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
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