
'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE TUNISIE — Section Maths — PAGE SLUG
// Route : /bac/physique/maths/[slug]
// Programme officiel MEN Tunisie · 4ème année Maths
// ══════════════════════════════════════════════════════════════════════

const C: Record<string, string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'cinematique','dynamique','satellites',
  'champ-electrique','champ-magnetique','induction',
  'lentilles','ondes-lumineuses',
  'redox','acide-base','cinetique','equilibre','organique',
]
const TITRES_NAV: Record<string,string> = {
  'cinematique':        'CH.1 — Cinématique du point',
  'dynamique':          'CH.2 — Dynamique du point matériel',
  'satellites':         'CH.3 — Mouvement des satellites',
  'champ-electrique':   'CH.4 — Champ électrique',
  'champ-magnetique':   'CH.5 — Champ magnétique',
  'induction':          'CH.6 — Induction électromagnétique',
  'lentilles':          'CH.7 — Lentilles minces',
  'ondes-lumineuses':   'CH.8 — Ondes lumineuses',
  'redox':              'CH.1 — Réactions Redox',
  'acide-base':         'CH.2 — Acides et bases',
  'cinetique':          'CH.3 — Cinétique chimique',
  'equilibre':          'CH.4 — Équilibre chimique',
  'organique':          'CH.5 — Chimie organique',
}
const SEC_COLORS: Record<string,string> = {
  'cinematique':'#4f6ef7','dynamique':'#10b981','satellites':'#8b5cf6',
  'champ-electrique':'#f59e0b','champ-magnetique':'#06b6d4','induction':'#ec4899',
  'lentilles':'#f97316','ondes-lumineuses':'#14b8a6',
  'redox':'#ef4444','acide-base':'#10b981','cinetique':'#f59e0b','equilibre':'#8b5cf6','organique':'#06b6d4',
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
}> = {

// ═══════════════════════════════════
// CH.1 — CINÉMATIQUE
// ═══════════════════════════════════
'cinematique': {
  id:'cinematique', emoji:'🚀', badge:'Mécanique', color:'#4f6ef7',
  titre:'Cinématique du point',
  desc:'Vecteurs position, vitesse, accélération. Types de mouvements. Mouvement de projectiles. Programme complet Bac Tunisie Section Maths.',
  souschapitres:[
    {
      id:'sc-vecteurs', titre:'Vecteur position & trajectoire',
      notions:['Repère de référence','Coordonnées cartésiennes','Trajectoire d\'un point'],
      blocs:[
        {
          notion:'📍 Vecteur position & repère',
          theoremes:[
            { id:'D-CIN1', type:'def', nom:'Vecteur position',
              enonce:'Le vecteur position OM⃗ d\'un point matériel M dans un repère (O;x,y,z) est défini par ses coordonnées (x, y, z).\n\nLa trajectoire est l\'ensemble des positions successives occupées par le point M au cours du temps.' },
            { id:'D-CIN2', type:'def', nom:'Référentiel',
              enonce:'Un référentiel est un solide de référence + une horloge.\nEx : référentiel terrestre (lié à la Terre), référentiel géocentrique, référentiel héliocentrique.\n\nUn référentiel galiléen est un référentiel dans lequel la loi d\'inertie est vérifiée.' },
          ],
          exercices:[
            { id:'EX-CIN1', niveau:'Facile', titre:'Lecture de coordonnées',
              enonce:'Un point M a pour coordonnées M(3 ; −2) à t = 0 s et M\'(7 ; 4) à t = 2 s. Calculer le déplacement ΔOM⃗.',
              correction:'Δx = 7 − 3 = 4 m\nΔy = 4 − (−2) = 6 m\nDéplacement : ΔOM⃗ = (4 ; 6)' },
          ]
        },
        {
          notion:'⚡ Vecteur vitesse',
          theoremes:[
            { id:'F-CIN1', type:'formule', nom:'Vecteur vitesse instantanée',
              enonce:'v⃗(t) = dOM⃗/dt\n\nComposantes :\n• vₓ = dx/dt\n• vᵧ = dy/dt\n\nNorme (vitesse scalaire) :\nv = |v⃗| = √(vₓ² + vᵧ²)\n\nUnité : m/s ou km/h' },
            { id:'D-CIN3', type:'def', nom:'Vitesse moyenne',
              enonce:'v⃗_moy = ΔOM⃗/Δt = (OM⃗₂ − OM⃗₁)/(t₂ − t₁)\n\nLa vitesse instantanée est la limite de la vitesse moyenne quand Δt → 0.' },
          ],
          exercices:[
            { id:'EX-CIN2', niveau:'Facile', titre:'Calcul de vitesse',
              enonce:'x(t) = 4t + 1 et y(t) = 3t − 2 (en m, s). Calculer le vecteur vitesse et sa norme.',
              correction:'vₓ = dx/dt = 4 m/s\nvᵧ = dy/dt = 3 m/s\nv = √(4² + 3²) = √(16+9) = √25 = 5 m/s' },
            { id:'EX-CIN3', niveau:'Intermédiaire', titre:'Type MRU',
              enonce:'Un mobile a pour équations : x(t) = 10t et y(t) = 5. Identifier le type de mouvement et tracer la trajectoire.',
              correction:'vₓ = 10 m/s = constante, vᵧ = 0\nv = 10 m/s = constante, direction constante → MRU\nTrajectoire : y = 5 → droite horizontale' },
          ]
        },
        {
          notion:'🔄 Vecteur accélération',
          theoremes:[
            { id:'F-CIN2', type:'formule', nom:'Vecteur accélération',
              enonce:'a⃗(t) = dv⃗/dt = d²OM⃗/dt²\n\nComposantes :\n• aₓ = dvₓ/dt = d²x/dt²\n• aᵧ = dvᵧ/dt = d²y/dt²\n\nMouvement rectiligne uniforme (MRU) : a⃗ = 0⃗\nMouvement rectiligne uniformément varié (MRUV) : a⃗ = constante ≠ 0⃗' },
            { id:'T-CIN1', type:'thm', nom:'Types de mouvements',
              enonce:'• MRU : v = cte, trajectoire rectiligne, a = 0\n• MRUV : a = cte ≠ 0, rectiligne accéléré/décéléré\n• MCU : v = cte, trajectoire circulaire, a ⊥ v⃗\n• MCUV : a tangentielle ≠ 0, trajectoire circulaire\n\nFormules MRUV :\nv(t) = v₀ + at\nx(t) = x₀ + v₀t + ½at²\nv² = v₀² + 2a(x−x₀)' },
          ],
          exercices:[
            { id:'EX-CIN4', niveau:'Intermédiaire', titre:'MRUV',
              enonce:'Un véhicule part de v₀ = 0 et accélère à a = 3 m/s². Calculer sa vitesse et sa position après 5 s.',
              correction:'v(5) = 0 + 3×5 = 15 m/s\nx(5) = 0 + 0 + ½×3×5² = 37,5 m' },
          ]
        },
        {
          notion:'🎯 Mouvement de projectiles',
          theoremes:[
            { id:'T-CIN2', type:'thm', nom:'Équations du mouvement de projectile',
              enonce:'Dans le référentiel terrestre, sans frottement, avec g = 9,8 m/s² :\n\nConditions initiales : v₀, angle θ avec l\'horizontale.\n\n• aₓ = 0 → vₓ = v₀cosθ → x(t) = v₀cosθ·t\n• aᵧ = −g → vᵧ = v₀sinθ − gt → y(t) = v₀sinθ·t − ½gt²\n\nÉquation de la trajectoire :\ny = x·tanθ − gx²/(2v₀²cos²θ)\n→ parabole' },
            { id:'F-CIN3', type:'formule', nom:'Portée et hauteur maximale',
              enonce:'Portée horizontale : R = v₀²·sin(2θ)/g\nPortée maximale pour θ = 45°\n\nHauteur maximale : H = v₀²·sin²θ/(2g)\n\nTemps de vol total : T = 2v₀sinθ/g' },
          ],
          exercices:[
            { id:'EX-CIN5', niveau:'Intermédiaire', titre:'Projectile',
              enonce:'Un ballon est lancé avec v₀ = 20 m/s à θ = 30°. Calculer la portée R et la hauteur max H (g = 10 m/s²).',
              correction:'R = 20²×sin(60°)/10 = 400×0,866/10 = 34,6 m\nH = 20²×sin²(30°)/(2×10) = 400×0,25/20 = 5 m' },
            { id:'EX-CIN6', niveau:'Difficile', titre:'Portée maximale',
              enonce:'Un projectile doit atteindre une cible à 80 m. Quelle valeur de v₀ faut-il pour θ = 45° ? (g = 10 m/s²)',
              correction:'R = v₀²sin(90°)/g = v₀²/g\n80 = v₀²/10\nv₀² = 800\nv₀ = √800 ≈ 28,3 m/s' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CH.2 — DYNAMIQUE
// ═══════════════════════════════════
'dynamique': {
  id:'dynamique', emoji:'⚙️', badge:'Mécanique', color:'#10b981',
  titre:'Dynamique du point matériel',
  desc:'Lois de Newton, travail, énergie cinétique, énergie potentielle, conservation de l\'énergie mécanique. Programme Bac Tunisie Maths.',
  souschapitres:[
    {
      id:'sc-newton', titre:'Lois de Newton',
      notions:['Principe d\'inertie','2ème loi de Newton','3ème loi de Newton'],
      blocs:[
        {
          notion:'⚖️ Les trois lois de Newton',
          theoremes:[
            { id:'T-DYN1', type:'thm', nom:'1ère loi — Principe d\'inertie',
              enonce:'Dans un référentiel galiléen, tout corps soumis à des forces dont la résultante est nulle est soit au repos, soit en mouvement rectiligne uniforme.\n\nSi ΣF⃗ = 0⃗ → v⃗ = constante' },
            { id:'F-DYN1', type:'formule', nom:'2ème loi de Newton',
              enonce:'ΣF⃗ = m·a⃗\n\nProjections :\n• Σ Fₓ = m·aₓ\n• Σ Fᵧ = m·aᵧ\n\nUnités : F en Newtons (N), m en kg, a en m/s²\n\nApplications :\n• Chute libre : P⃗ = m·g⃗ → a⃗ = g⃗\n• Plan incliné : résoudre le système projeté' },
            { id:'T-DYN2', type:'thm', nom:'3ème loi de Newton — Actions réciproques',
              enonce:'Si A exerce une force F⃗_{A→B} sur B, alors B exerce sur A une force F⃗_{B→A} telle que :\nF⃗_{B→A} = −F⃗_{A→B}\n\nMêmes : droite d\'action, norme\nOpposées : sens\nS\'appliquent sur des corps DIFFÉRENTS' },
          ],
          exercices:[
            { id:'EX-DYN1', niveau:'Facile', titre:'Application 2ème loi',
              enonce:'Un objet de masse m = 5 kg est soumis à une force F = 20 N horizontale. Calculer son accélération (surface sans frottement).',
              correction:'ΣF = F = 20 N\na = F/m = 20/5 = 4 m/s²' },
            { id:'EX-DYN2', niveau:'Intermédiaire', titre:'Plan incliné',
              enonce:'Un bloc de 3 kg glisse sans frottement sur un plan incliné à 30°. Calculer son accélération (g = 10 m/s²).',
              correction:'Forces : P = mg = 30 N, N normale au plan\nProjection axe plan : ma = mgsin(30°)\na = g·sin(30°) = 10×0,5 = 5 m/s²' },
          ]
        },
        {
          notion:'⚡ Travail et énergie',
          theoremes:[
            { id:'F-DYN2', type:'formule', nom:'Travail d\'une force',
              enonce:'W = F·d·cosα\n\nW : travail (Joules J)\nF : norme de la force (N)\nd : déplacement (m)\nα : angle entre F⃗ et déplacement\n\n• W > 0 : force motrice\n• W < 0 : force résistante\n• W = 0 si F⊥déplacement (ex: force normale)' },
            { id:'T-DYN3', type:'thm', nom:'Théorème de l\'énergie cinétique',
              enonce:'ΔEc = Ec₂ − Ec₁ = ΣW(F⃗)\n\nEc = ½mv²\n\nLa variation d\'énergie cinétique est égale à la somme algébrique des travaux de toutes les forces appliquées.' },
            { id:'F-DYN3', type:'formule', nom:'Énergie potentielle & conservation',
              enonce:'Énergie potentielle gravitationnelle :\nEp = mgh  (h : altitude par rapport au niveau de référence)\n\nÉnergie mécanique :\nEm = Ec + Ep = ½mv² + mgh\n\nConservation : si seules les forces conservatives travaillent :\nEm = constante → ½mv₁² + mgh₁ = ½mv₂² + mgh₂' },
          ],
          exercices:[
            { id:'EX-DYN3', niveau:'Facile', titre:'Conservation énergie',
              enonce:'Une bille de 200 g tombe de h = 5 m (depuis le repos). Calculer sa vitesse à l\'impact (g = 10 m/s²).',
              correction:'Conservation Em : mgh = ½mv²\nv = √(2gh) = √(2×10×5) = √100 = 10 m/s' },
            { id:'EX-DYN4', niveau:'Intermédiaire', titre:'Travail d\'une force',
              enonce:'Une force F = 50 N à 60° du déplacement pousse un objet sur 4 m. Calculer W.',
              correction:'W = F·d·cos60° = 50×4×0,5 = 100 J' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CH.3 — SATELLITES
// ═══════════════════════════════════
'satellites': {
  id:'satellites', emoji:'🛸', badge:'Mécanique', color:'#8b5cf6',
  titre:'Mouvement des satellites',
  desc:'Gravitation universelle, champ gravitationnel, orbites circulaires, 3ème loi de Kepler, satellites géostationnaires.',
  souschapitres:[
    {
      id:'sc-gravitation', titre:'Loi de gravitation & champ',
      notions:['Loi de Newton','Champ gravitationnel g = GM/r²','Orbites circulaires'],
      blocs:[
        {
          notion:'🌍 Gravitation universelle',
          theoremes:[
            { id:'F-SAT1', type:'formule', nom:'Loi de Newton — Gravitation',
              enonce:'F = G·M·m/r²\n\nG = 6,67×10⁻¹¹ N·m²·kg⁻² (constante gravitationnelle)\nM : masse du corps attracteur (kg)\nm : masse du satellite (kg)\nr : distance centre à centre (m)\n\nDirection : selon la droite joignant les deux corps\nSens : attractif' },
            { id:'F-SAT2', type:'formule', nom:'Champ gravitationnel',
              enonce:'g = GM/r²  (m·s⁻²)\n\nÀ la surface terrestre : g₀ ≈ 9,8 m/s²\nM_Terre = 5,97×10²⁴ kg\nR_Terre = 6,37×10⁶ m\n\nÀ l\'altitude h : g(h) = GM/(R+h)²' },
            { id:'F-SAT3', type:'formule', nom:'Satellite en orbite circulaire',
              enonce:'Pour un satellite d\'orbite circulaire de rayon r :\n\nCondition : F_gravité = F_centripète\nGMm/r² = mv²/r\n\n→ v = √(GM/r)  (vitesse orbitale)\n→ T = 2πr/v = 2πr√(r/GM)\n\n3ème loi de Kepler : T² = (4π²/GM)·r³ = K·r³' },
          ],
          exercices:[
            { id:'EX-SAT1', niveau:'Facile', titre:'Vitesse orbitale',
              enonce:'Un satellite orbite à h = 400 km. Calculer sa vitesse. (R_T = 6370 km, GM = 3,98×10¹⁴ m³/s²)',
              correction:'r = R_T + h = 6370 + 400 = 6770 km = 6,77×10⁶ m\nv = √(GM/r) = √(3,98×10¹⁴/6,77×10⁶) ≈ 7670 m/s ≈ 7,67 km/s' },
            { id:'EX-SAT2', niveau:'Intermédiaire', titre:'Loi de Kepler',
              enonce:'Un satellite a une période T = 24 h. Calculer son rayon orbital r. (GM = 3,98×10¹⁴ m³/s²)',
              correction:'T = 24×3600 = 86400 s\nr³ = GM·T²/(4π²) = 3,98×10¹⁴×(86400)²/(4π²)\nr³ = 7,54×10²² m³\nr ≈ 4,22×10⁷ m = 42 200 km → satellite géostationnaire' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CH.4 — CHAMP ÉLECTRIQUE
// ═══════════════════════════════════
'champ-electrique': {
  id:'champ-electrique', emoji:'⚡', badge:'Électromagnétisme', color:'#f59e0b',
  titre:'Champ électrique',
  desc:'Loi de Coulomb, champ électrique, condensateur plan, travail de la force électrique, potentiel électrique.',
  souschapitres:[
    {
      id:'sc-coulomb', titre:'Interaction électrostatique & champ',
      notions:['Loi de Coulomb','Champ électrique E = kq/r²','Condensateur plan'],
      blocs:[
        {
          notion:'⚡ Loi de Coulomb & champ électrique',
          theoremes:[
            { id:'F-EL1', type:'formule', nom:'Loi de Coulomb',
              enonce:'F = k·|q₁|·|q₂|/r²\n\nk = 9×10⁹ N·m²·C⁻² (constante électrostatique)\nq₁, q₂ : charges en Coulombs (C)\nr : distance entre les charges (m)\n\n→ Charges de même signe : répulsion\n→ Charges de signes opposés : attraction' },
            { id:'F-EL2', type:'formule', nom:'Champ électrique d\'une charge ponctuelle',
              enonce:'E = k·|q|/r²  (V/m ou N/C)\n\nDirection : droite reliant la source au point M\nSens : s\'éloigne de q si q > 0, vers q si q < 0\n\nPrincipe de superposition : E⃗_total = ΣE⃗ᵢ' },
            { id:'F-EL3', type:'formule', nom:'Condensateur plan — Champ uniforme',
              enonce:'Entre les armatures d\'un condensateur plan :\nE = U/d  (uniforme)\n\nU : tension entre armatures (V)\nd : distance entre armatures (m)\n\nTravail de la force électrique :\nW_{A→B} = q·U_{AB} = q(V_A − V_B)' },
          ],
          exercices:[
            { id:'EX-EL1', niveau:'Facile', titre:'Coulomb',
              enonce:'Deux charges q₁ = 2×10⁻⁶ C et q₂ = −3×10⁻⁶ C sont séparées de r = 30 cm. Calculer F.',
              correction:'F = 9×10⁹×2×10⁻⁶×3×10⁻⁶/(0,30)² = 9×10⁹×6×10⁻¹²/0,09 = 0,6 N (attraction)' },
            { id:'EX-EL2', niveau:'Intermédiaire', titre:'Condensateur',
              enonce:'Un condensateur a U = 100 V et d = 5 mm. Calculer E. Quelle est la force sur une charge q = 1 μC ?',
              correction:'E = U/d = 100/0,005 = 20 000 V/m\nF = qE = 10⁻⁶×20000 = 0,02 N = 20 mN' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CH.5 — CHAMP MAGNÉTIQUE
// ═══════════════════════════════════
'champ-magnetique': {
  id:'champ-magnetique', emoji:'🧲', badge:'Électromagnétisme', color:'#06b6d4',
  titre:'Champ magnétique',
  desc:'Sources du champ magnétique, force de Laplace, force de Lorentz, trajectoire circulaire d\'une charge.',
  souschapitres:[
    {
      id:'sc-laplace', titre:'Forces magnétiques',
      notions:['Force de Laplace F = BILsinα','Force de Lorentz F = qvBsinα','Trajectoire circulaire'],
      blocs:[
        {
          notion:'🧲 Champ magnétique & forces',
          theoremes:[
            { id:'F-MAG1', type:'formule', nom:'Champ magnétique du solénoïde',
              enonce:'B = μ₀·n·I\n\nμ₀ = 4π×10⁻⁷ T·m·A⁻¹\nn : nombre de spires par unité de longueur (m⁻¹)\nI : intensité (A)\nB : champ magnétique (Tesla, T)\n\nDirection : axe du solénoïde\nSens : règle de la main droite (ou du tire-bouchon)' },
            { id:'F-MAG2', type:'formule', nom:'Force de Laplace',
              enonce:'F = I·L·B·sinα\n\nI : intensité (A)\nL : longueur du conducteur dans B⃗ (m)\nB : champ magnétique (T)\nα : angle entre le conducteur et B⃗\n\nDirection : perpendiculaire au plan (I⃗, B⃗)\nSens : règle de la main droite (ou des trois doigts)' },
            { id:'F-MAG3', type:'formule', nom:'Force de Lorentz',
              enonce:'F = q·v·B·sinα\n\nq : charge (C), v : vitesse (m/s), B : champ (T)\nα : angle entre v⃗ et B⃗\n\nSi v⃗ ⊥ B⃗ : F = qvB\n→ Trajectoire circulaire uniforme\n→ Rayon : r = mv/(|q|B)\n→ Période : T = 2πm/(|q|B) (indépendant de v !)' },
          ],
          exercices:[
            { id:'EX-MAG1', niveau:'Facile', titre:'Force de Laplace',
              enonce:'Un conducteur de L = 20 cm parcouru par I = 3 A est perpendiculaire à B = 0,5 T. Calculer F.',
              correction:'F = I×L×B×sin90° = 3×0,20×0,5×1 = 0,30 N' },
            { id:'EX-MAG2', niveau:'Intermédiaire', titre:'Lorentz — rayon de trajectoire',
              enonce:'Un proton (m = 1,67×10⁻²⁷ kg, q = 1,6×10⁻¹⁹ C) se déplace à v = 2×10⁶ m/s dans B = 0,1 T (perpendiculaire). Calculer r.',
              correction:'r = mv/(qB) = 1,67×10⁻²⁷×2×10⁶/(1,6×10⁻¹⁹×0,1)\nr = 3,34×10⁻²¹/1,6×10⁻²⁰ = 0,209 m ≈ 20,9 cm' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CH.6 — INDUCTION
// ═══════════════════════════════════
'induction': {
  id:'induction', emoji:'🔄', badge:'Électromagnétisme', color:'#ec4899',
  titre:'Induction électromagnétique',
  desc:'Flux magnétique, loi de Faraday, loi de Lenz, auto-induction, énergie d\'une bobine.',
  souschapitres:[
    {
      id:'sc-faraday', titre:'Faraday & Lenz',
      notions:['Flux Φ = BS·cosθ','e = −dΦ/dt','Loi de Lenz'],
      blocs:[
        {
          notion:'🔄 Induction — Lois fondamentales',
          theoremes:[
            { id:'F-IND1', type:'formule', nom:'Flux magnétique',
              enonce:'Φ = B·S·cosθ  (Webers, Wb)\n\nB : champ magnétique (T)\nS : aire de la surface (m²)\nθ : angle entre B⃗ et la normale n⃗ à la surface\n\nSi B⃗ perpendiculaire au plan : θ = 0° → Φ = BS' },
            { id:'F-IND2', type:'formule', nom:'Loi de Faraday',
              enonce:'e = −dΦ/dt  (Volts, V)\n\ne : force électromotrice (FEM) induite\nLe signe « − » traduit la loi de Lenz.\n\nSi Φ varie linéairement : e = −ΔΦ/Δt' },
            { id:'T-IND1', type:'thm', nom:'Loi de Lenz',
              enonce:'Le courant induit est de sens tel qu\'il s\'oppose à la cause qui lui a donné naissance (variation de flux).\n\nPratique :\n• Φ augmente → courant induit crée B⃗ opposé à B⃗ extérieur\n• Φ diminue → courant induit crée B⃗ dans le même sens que B⃗ extérieur' },
            { id:'F-IND3', type:'formule', nom:'Auto-induction',
              enonce:'e_L = −L·di/dt\n\nL : inductance (Henry, H)\ne_L : FEM d\'auto-induction\n\nÉnergie emmagasinée dans une bobine :\nE_L = ½·L·I²  (Joules)' },
          ],
          exercices:[
            { id:'EX-IND1', niveau:'Facile', titre:'FEM induite',
              enonce:'Un flux passe de Φ₁ = 0,05 Wb à Φ₂ = 0,02 Wb en Δt = 0,1 s. Calculer la FEM induite.',
              correction:'e = −ΔΦ/Δt = −(0,02 − 0,05)/0,1 = −(−0,03)/0,1 = +0,3 V' },
            { id:'EX-IND2', niveau:'Intermédiaire', titre:'Énergie bobine',
              enonce:'Une bobine L = 0,2 H est traversée par I = 3 A. Calculer l\'énergie emmagasinée.',
              correction:'E_L = ½×L×I² = ½×0,2×9 = 0,9 J' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CH.7 — LENTILLES
// ═══════════════════════════════════
'lentilles': {
  id:'lentilles', emoji:'🔭', badge:'Optique', color:'#f97316',
  titre:'Lentilles minces',
  desc:'Lentilles convergentes et divergentes, relation de conjugaison, grandissement, instruments d\'optique.',
  souschapitres:[
    {
      id:'sc-conjugaison', titre:'Relation de conjugaison & grandissement',
      notions:['1/OA\' − 1/OA = 1/f\'','Grandissement γ = OA\'/OA','Instruments d\'optique'],
      blocs:[
        {
          notion:'🔭 Lentilles — Formules fondamentales',
          theoremes:[
            { id:'D-LEN1', type:'def', nom:'Types de lentilles et éléments',
              enonce:'Lentille convergente : bords minces, f\' > 0 (foyer image réel)\nLentille divergente : bords épais, f\' < 0 (foyer image virtuel)\n\nÉléments caractéristiques :\n• Centre optique O : point d\'intersection des rayons non déviés\n• Foyer objet F : OA = −f\' \n• Foyer image F\' : OF\' = f\' > 0 (convergente)\n• Vergence : D = 1/f\' en dioptries (δ)' },
            { id:'F-LEN1', type:'formule', nom:'Relation de conjugaison',
              enonce:'1/OA\' − 1/OA = 1/f\'\n\nOA : distance algébrique objet (OA < 0 si objet réel)\nOA\' : distance algébrique image\nf\' : distance focale image\n\nConvention des signes : positif dans le sens des rayons lumineux (gauche → droite)' },
            { id:'F-LEN2', type:'formule', nom:'Grandissement transversal',
              enonce:'γ = A\'B\'/AB = OA\'/OA\n\n|γ| > 1 : image agrandie\n|γ| < 1 : image réduite\nγ > 0 : image droite (même sens que l\'objet)\nγ < 0 : image renversée\n\nLoupe : G = D/f\' = D×vergence (D = 0,25 m = distance maximale de vision distincte)' },
          ],
          exercices:[
            { id:'EX-LEN1', niveau:'Facile', titre:'Image par une lentille convergente',
              enonce:'Lentille convergente f\' = 10 cm. Objet à OA = −30 cm. Calculer OA\' et γ.',
              correction:'1/OA\' = 1/f\' + 1/OA = 1/10 + 1/(−30) = 3/30 − 1/30 = 2/30\nOA\' = 15 cm (image réelle, de l\'autre côté)\nγ = OA\'/OA = 15/(−30) = −0,5 (image renversée, réduite)' },
            { id:'EX-LEN2', niveau:'Intermédiaire', titre:'Vergence et loupe',
              enonce:'Une loupe a f\' = 5 cm. Calculer sa vergence et son grossissement (D = 25 cm).',
              correction:'D = 1/f\' = 1/0,05 = 20 dioptries\nG = D/f\' = 25/5 = 5 (grossissement ×5)' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CH.8 — ONDES LUMINEUSES
// ═══════════════════════════════════
'ondes-lumineuses': {
  id:'ondes-lumineuses', emoji:'🌈', badge:'Optique', color:'#14b8a6',
  titre:'Ondes lumineuses',
  desc:'Diffraction, interférences par les fentes d\'Young, indice de réfraction, spectre électromagnétique.',
  souschapitres:[
    {
      id:'sc-young', titre:'Diffraction & interférences',
      notions:['Interfrange i = λD/a','Interférences constructives/destructives','Indice de réfraction n = c/v'],
      blocs:[
        {
          notion:'🌈 Ondes lumineuses — Formules clés',
          theoremes:[
            { id:'T-OND1', type:'thm', nom:'Diffraction — Condition',
              enonce:'La diffraction est observable lorsque la dimension de l\'obstacle ou de l\'ouverture a est comparable à la longueur d\'onde λ.\n\nCondition : a ≈ λ\n\nTache centrale de diffraction :\n• Largeur angulaire : θ = 2λ/a\n• Plus a est petit → plus la tache est large\n• Plus λ est grande → plus la tache est large' },
            { id:'F-OND1', type:'formule', nom:'Interfrange — Fentes d\'Young',
              enonce:'i = λ·D/a\n\ni : interfrange (m) — distance entre deux franges brillantes consécutives\nλ : longueur d\'onde (m)\nD : distance fentes-écran (m)\na : distance entre les deux fentes (m)\n\nInterférences constructives (franges brillantes) : δ = kλ (k entier)\nInterférences destructives (franges sombres) : δ = (2k+1)·λ/2' },
            { id:'F-OND2', type:'formule', nom:'Indice de réfraction',
              enonce:'n = c/v\n\nc = 3×10⁸ m/s (vitesse lumière dans le vide)\nv : vitesse de la lumière dans le milieu (m/s)\nn ≥ 1 (n = 1 dans le vide)\n\nLoi de Snell-Descartes :\nn₁·sinθ₁ = n₂·sinθ₂\n\nLongueur d\'onde dans un milieu :\nλ_milieu = λ_vide/n' },
          ],
          exercices:[
            { id:'EX-OND1', niveau:'Facile', titre:'Interfrange',
              enonce:'Fentes d\'Young : a = 0,2 mm, D = 1,5 m, λ = 589 nm. Calculer l\'interfrange i.',
              correction:'i = λD/a = 589×10⁻⁹×1,5/(0,2×10⁻³) = 883,5×10⁻⁹/2×10⁻⁴ = 4,42×10⁻³ m = 4,42 mm' },
            { id:'EX-OND2', niveau:'Intermédiaire', titre:'Nombre de franges',
              enonce:'Une zone d\'interférences a une largeur L = 2,2 cm avec i = 2 mm. Combien de franges brillantes observe-t-on ?',
              correction:'N = L/i = 22/2 = 11 franges brillantes' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CHIMIE — CH.1 REDOX
// ═══════════════════════════════════
'redox': {
  id:'redox', emoji:'⚗️', badge:'Chimie', color:'#ef4444',
  titre:'Réactions d\'oxydoréduction',
  desc:'Oxydant, réducteur, nombre d\'oxydation, équilibrage, piles électrochimiques, électrolyse.',
  souschapitres:[
    {
      id:'sc-redox', titre:'Oxydoréduction — Fondamentaux',
      notions:['Couple Ox/Red','Nombre d\'oxydation','Piles électrochimiques','Électrolyse'],
      blocs:[
        {
          notion:'⚗️ Oxydoréduction',
          theoremes:[
            { id:'D-RDX1', type:'def', nom:'Oxydant et réducteur',
              enonce:'Réaction d\'oxydoréduction = transfert d\'électrons\n\n• Oxydant (Ox) : capte les électrons → se réduit\n• Réducteur (Red) : donne les électrons → s\'oxyde\n\nCouple Ox/Red : Ox + ne⁻ ⇌ Red\nEx : Fe³⁺/Fe²⁺ → Fe³⁺ + e⁻ ⇌ Fe²⁺\n\nRègle du gamma (γ) pour écrire les réactions.' },
            { id:'M-RDX1', type:'methode', nom:'Nombre d\'oxydation (n.o.)',
              enonce:'Règles :\n1. Élément seul : n.o. = 0\n2. Monoatomique : n.o. = charge\n3. H : n.o. = +1 (sauf hydrures : −1)\n4. O : n.o. = −2 (sauf OF₂ : +2, O₂²⁻ : −1)\n5. Somme n.o. = charge totale de la molécule/ion\n\nOxydation : n.o. augmente\nRéduction : n.o. diminue' },
            { id:'F-RDX1', type:'formule', nom:'Électrolyse — Loi de Faraday',
              enonce:'m = M·I·t/(n·F)\n\nm : masse déposée (g)\nM : masse molaire (g/mol)\nI : intensité (A)\nt : durée (s)\nn : nombre d\'électrons échangés\nF = 96 500 C/mol (Faraday)' },
          ],
          exercices:[
            { id:'EX-RDX1', niveau:'Facile', titre:'Identification Ox/Red',
              enonce:'Dans la réaction Zn + 2HCl → ZnCl₂ + H₂, identifier l\'oxydant et le réducteur.',
              correction:'Zn : n.o. passe de 0 à +2 → oxydation → Zn est le réducteur\nH : n.o. passe de +1 à 0 → réduction → H⁺ est l\'oxydant' },
            { id:'EX-RDX2', niveau:'Intermédiaire', titre:'Électrolyse du cuivre',
              enonce:'Électrolyse CuSO₄ : I = 2 A pendant 30 min. Masse de Cu déposée ? (M_Cu = 64 g/mol, n = 2)',
              correction:'t = 30×60 = 1800 s\nm = 64×2×1800/(2×96500) = 230400/193000 ≈ 1,19 g' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CHIMIE — CH.2 ACIDE-BASE
// ═══════════════════════════════════
'acide-base': {
  id:'acide-base', emoji:'🧪', badge:'Chimie', color:'#10b981',
  titre:'Réactions acide-base',
  desc:'Théorie de Brønsted, pH, constante d\'acidité Ka, pKa, diagramme de prédominance, dosages.',
  souschapitres:[
    {
      id:'sc-ph', titre:'pH & constante d\'acidité',
      notions:['pH = −log[H₃O⁺]','Ka = [A⁻][H₃O⁺]/[AH]','Diagramme de prédominance'],
      blocs:[
        {
          notion:'🧪 Acide-base — Lois et formules',
          theoremes:[
            { id:'D-AB1', type:'def', nom:'Théorie de Brønsted',
              enonce:'• Acide : cède un proton H⁺\n• Base : capte un proton H⁺\n\nCouple acide/base : AH/A⁻\nEx : CH₃COOH/CH₃COO⁻ ; NH₄⁺/NH₃\n\nRéaction acide-base :\nAH₁ + A₂⁻ ⇌ A₁⁻ + AH₂\n(acide 1 + base 2 ⇌ base 1 + acide 2)' },
            { id:'F-AB1', type:'formule', nom:'pH et constante Ka',
              enonce:'pH = −log[H₃O⁺]\n[H₃O⁺] = 10^(−pH)\n\nKa = [A⁻][H₃O⁺]/[AH] (constante d\'acidité)\npKa = −log Ka\n\nAcide fort (HCl, HNO₃) : dissociation totale\npH = −log C_a\n\nBase forte (NaOH) :\npH = 14 + log C_b' },
            { id:'T-AB1', type:'thm', nom:'Diagramme de prédominance',
              enonce:'Pour un couple AH/A⁻ de pKa :\n• pH < pKa : AH prédomine\n• pH = pKa : [AH] = [A⁻]\n• pH > pKa : A⁻ prédomine\n\nÀ l\'équivalence d\'un dosage acide faible/base forte :\npH_éq > 7 (solution basique)\nIndicateur coloré : phénolphtaléine (8,2–10,0)' },
          ],
          exercices:[
            { id:'EX-AB1', niveau:'Facile', titre:'Calcul de pH',
              enonce:'Solution HCl 0,01 mol/L. Calculer le pH.',
              correction:'HCl fort → dissociation totale\n[H₃O⁺] = 0,01 = 10⁻² mol/L\npH = −log(10⁻²) = 2' },
            { id:'EX-AB2', niveau:'Intermédiaire', titre:'Dosage acide-base',
              enonce:'V₀ = 20 mL CH₃COOH dosé par NaOH 0,10 mol/L. V_éq = 25 mL. Calculer C(CH₃COOH).',
              correction:'C_a × V_a = C_b × V_éq\nC_a = 0,10 × 25/20 = 0,125 mol/L' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CHIMIE — CH.3 CINÉTIQUE
// ═══════════════════════════════════
'cinetique': {
  id:'cinetique', emoji:'⏱️', badge:'Chimie', color:'#f59e0b',
  titre:'Cinétique chimique',
  desc:'Vitesse de réaction, facteurs cinétiques, temps de demi-réaction, catalyse.',
  souschapitres:[
    {
      id:'sc-vitesse', titre:'Vitesse & facteurs cinétiques',
      notions:['v = −d[A]/dt','Temps de demi-réaction t₁/₂','Catalyse'],
      blocs:[
        {
          notion:'⏱️ Cinétique chimique',
          theoremes:[
            { id:'F-CIN1', type:'formule', nom:'Vitesse de réaction',
              enonce:'v = −(1/a)·d[A]/dt = (1/b)·d[B]/dt\n\nPour aA + bB → cC + dD\n\nv : vitesse volumique (mol·L⁻¹·s⁻¹)\n[A] : concentration molaire\n\nGraphiquement : v = |pente de la courbe [A](t)|' },
            { id:'D-CIN2', type:'def', nom:'Facteurs cinétiques',
              enonce:'• Concentration : v augmente quand [réactif] augmente\n• Température : v augmente quand T augmente (règle de Van\'t Hoff : ×2 pour +10°C)\n• Catalyseur : abaisse l\'énergie d\'activation → accélère sans être consommé\n  - Homogène : même phase\n  - Hétérogène : phase différente\n  - Enzymatique : biologique' },
            { id:'D-CIN3', type:'def', nom:'Temps de demi-réaction t₁/₂',
              enonce:'t₁/₂ est la durée nécessaire pour que la concentration du réactif diminue de moitié :\n[A](t₁/₂) = [A]₀/2\n\nGraphiquement : lire t₁/₂ sur la courbe [A](t).\nPlus t₁/₂ est petit → réaction plus rapide.' },
          ],
          exercices:[
            { id:'EX-CIN1', niveau:'Facile', titre:'Lecture t₁/₂',
              enonce:'Sur une courbe [A](t), [A]₀ = 0,4 mol/L et [A] = 0,2 mol/L à t = 120 s. Quel est t₁/₂ ?',
              correction:'[A] = [A]₀/2 = 0,2 mol/L atteint à t = 120 s → t₁/₂ = 120 s' },
            { id:'EX-CIN2', niveau:'Intermédiaire', titre:'Vitesse instantanée',
              enonce:'Entre t = 0 et t = 60 s, [A] passe de 1,0 à 0,7 mol/L. Estimer la vitesse moyenne.',
              correction:'v_moy = −Δ[A]/Δt = −(0,7 − 1,0)/60 = 0,3/60 = 5×10⁻³ mol·L⁻¹·s⁻¹' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CHIMIE — CH.4 ÉQUILIBRE
// ═══════════════════════════════════
'equilibre': {
  id:'equilibre', emoji:'⚖️', badge:'Chimie', color:'#8b5cf6',
  titre:'Équilibre chimique',
  desc:'Quotient de réaction Qr, constante d\'équilibre K, critère d\'évolution, loi de Le Chatelier.',
  souschapitres:[
    {
      id:'sc-equilibre', titre:'Quotient Qr & constante K',
      notions:['Qr = [C]^c[D]^d/([A]^a[B]^b)','Qr < K → sens direct','Loi de modération (Le Chatelier)'],
      blocs:[
        {
          notion:'⚖️ Équilibre chimique',
          theoremes:[
            { id:'F-EQ1', type:'formule', nom:'Quotient de réaction Qr',
              enonce:'Pour : aA + bB ⇌ cC + dD\n\nQr = [C]^c · [D]^d / ([A]^a · [B]^b)\n\nÀ l\'équilibre : Qr = K (constante d\'équilibre)\n\nK dépend uniquement de la température.' },
            { id:'T-EQ1', type:'thm', nom:'Critère d\'évolution',
              enonce:'Comparaison de Qr avec K :\n• Qr < K → évolution dans le sens direct (→)\n• Qr > K → évolution dans le sens inverse (←)\n• Qr = K → système à l\'équilibre\n\nTaux d\'avancement final τ = x_f/x_max\nτ = 1 → réaction totale\nτ < 1 → réaction limitée' },
            { id:'T-EQ2', type:'thm', nom:'Loi de Le Chatelier (modération)',
              enonce:'Si un système à l\'équilibre est soumis à une perturbation, il évolue dans le sens qui tend à minimiser cette perturbation.\n\nInfluence de :\n• ↑ concentration d\'un réactif → sens direct\n• ↑ concentration d\'un produit → sens inverse\n• ↑ T → sens endothermique\n• ↓ T → sens exothermique' },
          ],
          exercices:[
            { id:'EX-EQ1', niveau:'Facile', titre:'Critère d\'évolution',
              enonce:'K = 100. À un instant, Qr = 10. Dans quel sens évolue le système ?',
              correction:'Qr = 10 < K = 100 → sens direct (→)' },
            { id:'EX-EQ2', niveau:'Intermédiaire', titre:'Taux d\'avancement',
              enonce:'A + B → C. [A]₀ = [B]₀ = 1 mol/L, x_f = 0,8 mol/L. Calculer τ.',
              correction:'x_max = 1 mol/L (réactif limitant épuisé)\nτ = x_f/x_max = 0,8/1 = 0,8 → 80% de réaction' },
          ]
        },
      ],
    },
  ],
},

// ═══════════════════════════════════
// CHIMIE — CH.5 ORGANIQUE
// ═══════════════════════════════════
'organique': {
  id:'organique', emoji:'🔬', badge:'Chimie', color:'#06b6d4',
  titre:'Chimie organique',
  desc:'Structure des molécules organiques, réactions (substitution, addition, estérification), polymères.',
  souschapitres:[
    {
      id:'sc-organique', titre:'Structure & réactions organiques',
      notions:['Formules brute/développée/semi-développée','Groupes caractéristiques','Estérification & Polymères'],
      blocs:[
        {
          notion:'🔬 Chimie organique — Essentiels',
          theoremes:[
            { id:'D-ORG1', type:'def', nom:'Groupes caractéristiques',
              enonce:'• Alcool R−OH : ex CH₃CH₂OH (éthanol)\n• Aldéhyde R−CHO : ex CH₃CHO (éthanal)\n• Cétone R−CO−R\' : ex CH₃COCH₃ (propanone)\n• Acide carboxylique R−COOH : ex CH₃COOH (acide acétique)\n• Ester R−COO−R\' : ex CH₃COOC₂H₅\n• Amine R−NH₂\n\nIsomérie : même formule brute, structures différentes' },
            { id:'T-ORG1', type:'thm', nom:'Réactions fondamentales',
              enonce:'• Substitution : alcanes + halogène → halogénoalcane + HX (UV)\n• Addition : alcène + H₂ → alcane (hydrogénation)\n• Élimination : alcool → alcène + H₂O (déshydratation, H₂SO₄)\n• Oxydation : alcool primaire → aldéhyde → acide carboxylique\n• Estérification : R-COOH + R\'OH ⇌ R-COOR\' + H₂O\n  (réaction lente, limitée, athermique, catalysée par H⁺)' },
            { id:'D-ORG2', type:'def', nom:'Polymères',
              enonce:'• Polyaddition : monomère à double liaison → polymère\n  Ex : nCH₂=CH₂ → (−CH₂−CH₂−)ₙ  (polyéthylène)\n       nCH₂=CHCl → (−CH₂−CHCl−)ₙ  (PVC)\n\n• Polycondensation : réaction avec élimination d\'eau\n  Ex : polyesters (ex : Dacron) ; polyamides (ex : Nylon)' },
          ],
          exercices:[
            { id:'EX-ORG1', niveau:'Facile', titre:'Identification de groupe',
              enonce:'Identifier le groupe caractéristique : CH₃CH₂COOH',
              correction:'Groupe −COOH → acide carboxylique : acide propanoïque' },
            { id:'EX-ORG2', niveau:'Intermédiaire', titre:'Réaction d\'estérification',
              enonce:'Écrire l\'équation d\'estérification entre l\'acide éthanoïque et l\'éthanol. Nommer l\'ester formé.',
              correction:'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O\nEster : éthanoate d\'éthyle (ou acétate d\'éthyle)' },
          ]
        },
      ],
    },
  ],
},

} // fin ALL_CHAPTERS

// ─── Composant principal ─────────────────────────────────────────────
export default function PhysiqueMathsSlugPage() {
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
            <Link href="/bac/physique/maths" className="btn btn-primary">← Retour Section Maths</Link>
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
            <Link href="/bac/physique/maths" style={{ color:'var(--muted)', textDecoration:'none' }}>Section Maths</Link>
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
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' Bac Tunisie Maths')}`} className="btn btn-primary" style={{ fontSize:12 }}>
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
                                        <Link href={`/solve?q=${encodeURIComponent('Bac Tunisie PC — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
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
                  <Link href={`/bac/physique/maths/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/physique/maths/${nextSlug}`} style={{ textDecoration:'none' }}>
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

            {/* ── SIDEBAR ── */}
            <aside style={{ position:'sticky', top:88 }}>

              {/* Navigation chapitres */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  📐 Section Maths · {NAV_ORDER.length} chapitres
                </div>
                {/* Physique */}
                <div style={{ padding:'6px 14px 3px', fontSize:9, fontWeight:800, color:'#4f6ef7', textTransform:'uppercase', letterSpacing:'0.1em' }}>⚛️ Physique</div>
                {NAV_ORDER.filter(s => !['redox','acide-base','cinetique','equilibre','organique'].includes(s)).map((s,i) => (
                  <Link key={s} href={`/bac/physique/maths/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'8px 14px', borderBottom:'1px solid var(--border)',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:10, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
                {/* Chimie */}
                <div style={{ padding:'6px 14px 3px', fontSize:9, fontWeight:800, color:'#10b981', textTransform:'uppercase', letterSpacing:'0.1em' }}>🧪 Chimie</div>
                {['redox','acide-base','cinetique','equilibre','organique'].map((s,i) => (
                  <Link key={s} href={`/bac/physique/maths/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'8px 14px', borderBottom:i<4?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:10, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Autres sections Physique Tunisie */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'12px', marginBottom:12 }}>
                <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>🇹🇳 Autres sections</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {[
                    { href:'/bac/physique/sciences-exp', label:'🔬 Sciences Exp.', color:'#06b6d4' },
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
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' Bac Tunisie')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧮 Solveur PC</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Examens Bac</Link>
                  <Link href="/bac/physique/maths" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ 📐 Section Maths</Link>
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