'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// PHYSIQUE-CHIMIE — SECTION MATHS / [SLUG]
// Route : /bac/physique/maths/[slug]
// Programme officiel MEN Tunisie · 4ème année Maths
// 8 chapitres Physique + 5 chapitres Chimie = 13 au total
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899', loi:'#f97316' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode', loi:'Loi' }

const NAV_ORDER = [
  // Physique
  'cinematique','dynamique','satellites','champ-electrique',
  'champ-magnetique','induction','lentilles','ondes-lumineuses',
  // Chimie
  'redox','acide-base','cinetique','equilibre','organique',
]

const TITRES_NAV: Record<string,string> = {
  'cinematique':          'CH 01 — Cinématique du point',
  'dynamique':            'CH 02 — Dynamique du point matériel',
  'satellites':           'CH 03 — Mouvement des satellites',
  'champ-electrique':     'CH 04 — Champ électrique',
  'champ-magnetique':     'CH 05 — Champ magnétique',
  'induction':            'CH 06 — Induction électromagnétique',
  'lentilles':            'CH 07 — Lentilles minces',
  'ondes-lumineuses':     'CH 08 — Ondes lumineuses',
  'redox':                'CH 09 — Réactions d\'oxydoréduction',
  'acide-base':           'CH 10 — Réactions acide-base',
  'cinetique':            'CH 11 — Cinétique chimique',
  'equilibre':            'CH 12 — Équilibre chimique',
  'organique':            'CH 13 — Chimie organique',
}

const SEC_COLORS: Record<string,string> = {
  'cinematique':'#4f6ef7','dynamique':'#10b981','satellites':'#8b5cf6',
  'champ-electrique':'#f59e0b','champ-magnetique':'#06b6d4','induction':'#ec4899',
  'lentilles':'#f97316','ondes-lumineuses':'#14b8a6',
  'redox':'#ef4444','acide-base':'#10b981','cinetique':'#f59e0b',
  'equilibre':'#8b5cf6','organique':'#06b6d4',
}

const IS_CHIMIE: Record<string,boolean> = {
  'redox':true,'acide-base':true,'cinetique':true,'equilibre':true,'organique':true,
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; tag:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 13 CHAPITRES
// ══════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string,Chap> = {

// ══════════════════════════════════════════════════════════════════════
// ████  PHYSIQUE — 8 CHAPITRES
// ══════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────
// CH 01 — CINÉMATIQUE DU POINT
// ─────────────────────────────────────────────────────────────────────
'cinematique': {
  id:'cinematique', emoji:'🚀', tag:'Mécanique', color:'#4f6ef7',
  titre:'Cinématique du point',
  desc:"Vecteur position, trajectoire, vecteur vitesse instantanée, vecteur accélération, types de mouvements (MRU, MRUV, MCU), mouvement de projectiles.",
  souschapitres:[
    {
      id:'sc-cin-vitesse', titre:'1.1 Position, vitesse et accélération',
      notions:['r⃗(t) vecteur position','v⃗=dr⃗/dt vitesse instantanée','a⃗=dv⃗/dt accélération','Composantes tangentielle et normale'],
      blocs:[
        {
          notion:'📍 Vecteur position et vitesse',
          theoremes:[
            { id:'D-CK1', type:'def', nom:'Vecteur position et trajectoire',
              enonce:"Dans un repère (O ; x⃗ ; y⃗) :\nOM⃗(t) = x(t)·x⃗ + y(t)·y⃗\n\nTRAJECTOIRE : courbe décrite par M\n→ Éliminer t entre x(t) et y(t)\n\nVECTEUR DÉPLACEMENT :\nΔr⃗ = OM⃗(t₂) − OM⃗(t₁)" },
            { id:'D-CK2', type:'def', nom:'Vecteur vitesse instantanée',
              enonce:"v⃗(t) = lim(Δt→0) ΔOM⃗/Δt = dr⃗/dt\n\nComposantes :\nvₓ = dx/dt  ;  vᵧ = dy/dt\n\n|v⃗| = √(vₓ²+vᵧ²)  (vitesse scalaire)\n\nVitesse MOYENNE : v̄ = |ΔOM⃗|/Δt\n\nDirection : tangente à la trajectoire au point M(t)" },
            { id:'D-CK3', type:'def', nom:'Vecteur accélération',
              enonce:"a⃗(t) = dv⃗/dt\n\nComposantes :\naₓ = dvₓ/dt  ;  aᵧ = dvᵧ/dt\n\nDÉCOMPOSITION (base de Frenet) :\na⃗ = aₜ·t⃗ + aₙ·n⃗\naₜ = d|v⃗|/dt  (tangentielle : change la vitesse)\naₙ = |v⃗|²/R  (normale : change la direction, R = rayon de courbure)",
              remarque:"aₜ=0 → vitesse constante. aₙ=0 → mouvement rectiligne. MCU : aₜ=0, aₙ=v²/R=ω²R." },
          ],
          exercices:[
            { id:'EX-CK1', niveau:'Facile', titre:'Composantes de vitesse',
              enonce:"x(t)=3t+1, y(t)=−2t+4 (en m, t en s). Vitesse vₓ, vᵧ et |v⃗|.",
              correction:"vₓ=dx/dt=3 m/s ; vᵧ=dy/dt=−2 m/s.\n|v⃗|=√(9+4)=√13≈3,6 m/s." },
          ]
        },
      ]
    },
    {
      id:'sc-cin-types', titre:'1.2 Types de mouvements et projectiles',
      notions:['MRU : v=cste, a=0','MRUV : a=cste≠0, v=v₀+at','MCU : |v|=cste, aₙ=v²/R=ω²R','Projectile : xH uniforme + yV MRUV'],
      blocs:[
        {
          notion:'⚡ MRU, MRUV et projectile',
          theoremes:[
            { id:'F-CK1', type:'formule', nom:'MRU et MRUV',
              enonce:"MRU (Mouvement Rectiligne Uniforme) :\na=0 ; v=v₀ (constante)\nx(t) = x₀ + v₀t\n\nMRUV (Mouvement Rectiligne Uniformément Varié) :\na = constante ≠ 0\nv(t) = v₀ + at\nx(t) = x₀ + v₀t + ½at²\nv² = v₀² + 2a(x−x₀)  (relation sans t)\n\nMCU (Mouvement Circulaire Uniforme) :\n|v|=Rω=constante\nT = 2π/ω = 2πR/v\naₙ = v²/R = ω²R  (centripète)" },
            { id:'F-CK2', type:'formule', nom:'Mouvement de projectile (chute parabolique)',
              enonce:"Lancement à vitesse v₀, angle θ par rapport à l'horizontal :\n\nPHASE HORIZONTALE (pas de résistance) :\naₓ=0 ; vₓ=v₀cosθ ; x=v₀cosθ·t\n\nPHASE VERTICALE (accélération gravitationnelle) :\naᵧ=−g ; vᵧ=v₀sinθ−gt\ny = v₀sinθ·t − ½gt²\n\nTRAJECTOIRE :\nÉliminer t : y = x·tanθ − gx²/(2v₀²cos²θ)\n→ parabole\n\nHAUTEUR MAX : hmax = (v₀sinθ)²/(2g)  (vᵧ=0)\nPORTÉE : R = v₀²sin(2θ)/g  (y=0, θ≠0)\nMax pour θ=45°",
              remarque:"En l'absence de résistance de l'air : les mouvements H et V sont indépendants." },
          ],
          exercices:[
            { id:'EX-CK2', niveau:'Facile', titre:'MRUV',
              enonce:"v₀=20m/s, a=−4m/s². Vitesse à t=3s et distance parcourue.",
              correction:"v(3)=20−12=8 m/s.\nx=20×3+½(−4)×9=60−18=42 m." },
            { id:'EX-CK3', niveau:'Intermédiaire', titre:'Projectile',
              enonce:"Projectile lancé à v₀=40m/s à 30° de l'horizontal. Portée et hauteur max.",
              correction:"hmax=(40×sin30°)²/(2×10)=(20)²/20=20 m.\nR=40²×sin60°/10=1600×(√3/2)/10=80√3≈138,6 m." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — DYNAMIQUE DU POINT MATÉRIEL
// ─────────────────────────────────────────────────────────────────────
'dynamique': {
  id:'dynamique', emoji:'⚙️', tag:'Mécanique', color:'#10b981',
  titre:'Dynamique du point matériel',
  desc:"Lois de Newton (principe d'inertie, ΣF⃗=ma⃗, action-réaction), travail et énergie cinétique, énergie potentielle, conservation de l'énergie mécanique.",
  souschapitres:[
    {
      id:'sc-dyn-newton', titre:'2.1 Lois de Newton',
      notions:['1ère loi : référentiels galiléens, inertie','2ème loi : ΣF⃗=m·a⃗','3ème loi : action-réaction (F⃗₁₂=−F⃗₂₁)','Applications : plan incliné, ascenseur'],
      blocs:[
        {
          notion:'⚙️ Lois de Newton',
          theoremes:[
            { id:'L-DY1', type:'loi', nom:'Première loi de Newton — Principe d\'inertie',
              enonce:"Dans un référentiel galiléen :\nSi ΣF⃗=0⃗ → v⃗=constante (MRU ou repos)\n\nRÉFÉRENTIEL GALILÉEN : référentiel dans lequel la 1ère loi est vérifiée.\nExemple : référentiel terrestre (approximation), héliocentrique (Kepler)." },
            { id:'L-DY2', type:'loi', nom:'Deuxième loi de Newton',
              enonce:"ΣF⃗ = m·a⃗  (dans un référentiel galiléen)\n\nComposantes :\nΣFₓ = m·aₓ\nΣFᵧ = m·aᵧ\n\nQuantité de mouvement : p⃗ = m·v⃗\nΣF⃗ = dp⃗/dt\n\nCONSERVATION de la quantité de mouvement :\nSi ΣF⃗=0⃗ → p⃗=constante (système isolé)" },
            { id:'L-DY3', type:'loi', nom:'Troisième loi de Newton — Action-réaction',
              enonce:"F⃗(A/B) = −F⃗(B/A)\n\n• Même droite d'action, même norme\n• Sens opposés\n• S'appliquent sur des solides DIFFÉRENTS\n⚠️ Ces deux forces ne se compensent PAS (elles ne s'appliquent pas sur le même solide)",
              remarque:"Pour un ascenseur : R−mg=ma (R = réaction, m = masse, a = accélération). Si a=0 → R=mg." },
          ],
          exercices:[
            { id:'EX-DY1', niveau:'Facile', titre:'Plan incliné',
              enonce:"Bloc m=2kg sur plan incliné 30°, sans frottement. Accélération ?",
              correction:"ΣFₓ=mg·sin30°=m·a → a=g·sin30°=10×0,5=5 m/s²." },
            { id:'EX-DY2', niveau:'Intermédiaire', titre:'Ascenseur en accélération',
              enonce:"Ascenseur monte avec a=2m/s². Masse 60kg. Poids apparent ?",
              correction:"R=m(g+a)=60×(10+2)=720N. (Poids apparent > poids réel.)" },
          ]
        },
      ]
    },
    {
      id:'sc-dyn-energie', titre:'2.2 Travail et énergie',
      notions:['W=F·d·cosα','Ec=½mv²','ΔEc=Σ W(forces)','Em=Ec+Ep conservée si forces conservatives'],
      blocs:[
        {
          notion:'⚡ Énergie et conservation',
          theoremes:[
            { id:'F-DY1', type:'formule', nom:'Travail et théorème de l\'énergie cinétique',
              enonce:"TRAVAIL d'une force F⃗ constante :\nW = F·d·cosα  (α : angle entre F⃗ et déplacement)\n\nW > 0 : force motrice (accélère)\nW < 0 : force résistante (freine)\nW = 0 : force perpendiculaire au déplacement\n\nTHÉORÈME DE L'ÉNERGIE CINÉTIQUE :\nΔEc = Ec_f − Ec_i = ΣW(toutes les forces)\n\nEc = ½mv²  (énergie cinétique)\nUnité : Joule (J)" },
            { id:'F-DY2', type:'formule', nom:'Énergie potentielle et conservation',
              enonce:"ÉNERGIE POTENTIELLE GRAVITATIONNELLE :\nEp = mgh  (h : hauteur par rapport à la référence)\n\nÉNERGIE POTENTIELLE ÉLASTIQUE :\nEp_él = ½kx²  (k raideur, x allongement)\n\nÉNERGIE MÉCANIQUE :\nEm = Ec + Ep\n\nCONSERVATION (forces non-conservatives = 0, ex. frottements) :\nEm = constante → ΔEc + ΔEp = 0\n\nSi frottements : ΔEm = W_friction < 0  (dissipation)",
              remarque:"Em diminue en présence de frottements. La chaleur dissipée = −W_frottements = −ΔEm." },
          ],
          exercices:[
            { id:'EX-DY3', niveau:'Facile', titre:'Théorème de l\'énergie cinétique',
              enonce:"Corps m=3kg, v₀=4m/s. Force F=12N appliquée sur d=6m (même sens). Vitesse finale ?",
              correction:"W(F)=12×6=72J.\nΔEc=72J → ½×3×vf²−½×3×16=72.\n1,5vf²=72+24=96 → vf²=64 → vf=8 m/s." },
            { id:'EX-DY4', niveau:'Intermédiaire', titre:'Conservation de l\'énergie',
              enonce:"Toboggan sans frottement, h=5m. Vitesse au bas (v₀=0).",
              correction:"Em conservée : ½mv²=mgh → v=√(2gh)=√(2×10×5)=10 m/s." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — MOUVEMENT DES SATELLITES
// ─────────────────────────────────────────────────────────────────────
'satellites': {
  id:'satellites', emoji:'🛸', tag:'Mécanique', color:'#8b5cf6',
  titre:'Mouvement des satellites',
  desc:"Loi de gravitation universelle, champ gravitationnel g=GM/r², satellites en orbite circulaire, 3ème loi de Kepler T²=kr³, satellites géostationnaires.",
  souschapitres:[
    {
      id:'sc-sat-gravit', titre:'3.1 Gravitation et champ gravitationnel',
      notions:['F=GMm/r² (loi de Newton)','g=GM/r² (champ)','Poids P=mg','Variation de g avec l\'altitude'],
      blocs:[
        {
          notion:'🌍 Loi de gravitation universelle',
          theoremes:[
            { id:'L-SA1', type:'loi', nom:'Loi de gravitation universelle',
              enonce:"F⃗ = G·M·m/r² × u⃗  (attraction mutuelle)\n\nG = 6,67×10⁻¹¹ N·m²·kg⁻² (constante universelle)\nM, m : masses des deux corps\nr : distance entre les centres\nu⃗ : vecteur unitaire de m vers M\n\nCHAMP GRAVITATIONNEL créé par M :\ng⃗ = −G·M/r² · u⃗\n|g| = GM/r²\n\nPOIDS : P = m·g\nÀ la surface : g₀ = GM/R²\nÀ l'altitude h : g = GM/(R+h)²" },
          ],
          exercices:[
            { id:'EX-SA1', niveau:'Facile', titre:'Champ gravitationnel',
              enonce:"g à la surface de la Terre (M=6×10²⁴kg, R=6400km).",
              correction:"g=GM/R²=6,67×10⁻¹¹×6×10²⁴/(6,4×10⁶)²=4×10¹⁴/4,1×10¹³≈9,8 m/s²." },
          ]
        },
      ]
    },
    {
      id:'sc-sat-orbite', titre:'3.2 Orbite circulaire et loi de Kepler',
      notions:['v=√(GM/r) vitesse orbitale','T=2πr/v période','T²=(4π²/GM)·r³ (3ème loi de Kepler)','Satellite géostationnaire : T=24h'],
      blocs:[
        {
          notion:'🛸 Orbite et Kepler',
          theoremes:[
            { id:'F-SA1', type:'formule', nom:'Satellite en orbite circulaire',
              enonce:"Force gravitationnelle = force centripète :\nGMm/r² = mv²/r\n\nVITESSE ORBITALE :\nv = √(GM/r)\n\nPÉRIODE DE RÉVOLUTION :\nT = 2πr/v = 2π√(r³/GM)\n\n3ÈME LOI DE KEPLER :\nT² = (4π²/GM)·r³\n→ T²/r³ = 4π²/GM = constante (pour tous les satellites du même astre)\n\nSATELLITE GÉOSTATIONNAIRE :\nT = 24h = 86400s\nr_géo = (GM·T²/4π²)^(1/3) ≈ 42 000 km du centre\nAltitude ≈ 36 000 km",
              remarque:"La 3ème loi de Kepler : T²∝r³ → si on double r, T est multiplié par 2√2. S'applique à tous les satellites du même corps central." },
          ],
          exercices:[
            { id:'EX-SA2', niveau:'Intermédiaire', titre:'3ème loi de Kepler',
              enonce:"Satellite S₁ : T₁=90min, r₁=6800km. Satellite S₂ : r₂=27000km. Trouver T₂.",
              correction:"T₂²/T₁²=r₂³/r₁³ → T₂²=T₁²×(r₂/r₁)³=(90)²×(27000/6800)³.\n(27000/6800)≈3,97 → 3,97³≈62,5.\nT₂²=8100×62,5=506250 → T₂≈711 min≈11,9h." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — CHAMP ÉLECTRIQUE
// ─────────────────────────────────────────────────────────────────────
'champ-electrique': {
  id:'champ-electrique', emoji:'⚡', tag:'Électromagnétisme', color:'#f59e0b',
  titre:'Champ électrique',
  desc:"Loi de Coulomb, champ électrique d'une charge ponctuelle E=kq/r², condensateur plan, travail de la force électrique, potentiel électrique.",
  souschapitres:[
    {
      id:'sc-ce-coulomb', titre:'4.1 Loi de Coulomb et champ électrique',
      notions:['F=kq₁q₂/r² (Coulomb)','k=9×10⁹ N·m²/C²','E⃗=kq/r² (champ ponctuel)','Principe de superposition'],
      blocs:[
        {
          notion:'⚡ Loi de Coulomb et champ',
          theoremes:[
            { id:'L-CE1', type:'loi', nom:'Loi de Coulomb',
              enonce:"F⃗ = k·q₁·q₂/r² · u⃗₁₂\n\nk = 1/(4πε₀) = 9×10⁹ N·m²·C⁻²\nq₁, q₂ : charges (en Coulombs)\nr : distance entre les charges\n\nCharges de MÊME SIGNE → répulsion\nCharges de SIGNES OPPOSÉS → attraction\n\nCHAMP ÉLECTRIQUE créé par q :\nE⃗ = k·q/r² · u⃗  (vers la charge si q<0, vers l'extérieur si q>0)\n|E| = k|q|/r²\n\nFORCE sur une charge q₀ dans un champ E⃗ :\nF⃗ = q₀·E⃗" },
            { id:'D-CE1', type:'def', nom:'Condensateur plan et champ uniforme',
              enonce:"Condensateur plan : 2 armatures parallèles (distance d, tension U)\nCHAMP ENTRE LES ARMATURES :\nE = U/d  (uniforme, perpendiculaire aux armatures)\n\nMOUVEMENT D'UNE CHARGE dans le champ E⃗ uniforme :\nAnalogue au mouvement d'un projectile dans g⃗\n\na⃗ = q·E⃗/m  (accélération constante)\n\nDIRECTION ↗ E⃗ si q>0 ; ↘ si q<0" },
          ],
          exercices:[
            { id:'EX-CE1', niveau:'Facile', titre:'Force de Coulomb',
              enonce:"q₁=2×10⁻⁶C, q₂=−3×10⁻⁶C, r=0,1m. Force d'interaction ?",
              correction:"F=9×10⁹×2×10⁻⁶×3×10⁻⁶/0,01=9×10⁹×6×10⁻¹²/0,01=5,4N (attraction)." },
          ]
        },
      ]
    },
    {
      id:'sc-ce-potentiel', titre:'4.2 Travail et potentiel électrique',
      notions:['W=q·U_AB=q(V_A−V_B)','V=kq/r potentiel d\'une charge','Équipotentielles : V=cste','Relation E=-dV/dx (champ uniforme : E=U/d)'],
      blocs:[
        {
          notion:'🔋 Potentiel et travail électrique',
          theoremes:[
            { id:'F-CE1', type:'formule', nom:'Travail et potentiel électrique',
              enonce:"POTENTIEL ÉLECTRIQUE en un point A :\nV(A) = k·q/r_A  (créé par la charge q)\n\nTRAVAIL de la force électrique :\nW_{A→B} = q·U_{AB} = q·(V_A−V_B)\n\nSi W>0 : force motrice (q et U_{AB} même signe)\nSi W<0 : force résistante\n\nÉQUIPOTENTIELLES :\nV=constante → travail nul le long d'une équipotentielle\n\nLIEN E et V (champ uniforme) :\nE = U_{AB}/d = −dV/dx" },
          ],
          exercices:[
            { id:'EX-CE2', niveau:'Intermédiaire', titre:'Travail dans un condensateur',
              enonce:"Proton (q=1,6×10⁻¹⁹C) traversant U=500V. Vitesse finale (départ nul).",
              correction:"W=qU=1,6×10⁻¹⁹×500=8×10⁻¹⁷J.\nW=ΔEc → ½mv²=W → v=√(2W/m)=√(2×8×10⁻¹⁷/1,67×10⁻²⁷)≈3×10⁵ m/s." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — CHAMP MAGNÉTIQUE
// ─────────────────────────────────────────────────────────────────────
'champ-magnetique': {
  id:'champ-magnetique', emoji:'🧲', tag:'Électromagnétisme', color:'#06b6d4',
  titre:'Champ magnétique',
  desc:"Sources du champ magnétique, champ d'un solénoïde B=μ₀nI, force de Laplace F=ILBsinα, force de Lorentz F=qvBsinα, trajectoire circulaire.",
  souschapitres:[
    {
      id:'sc-cm-sources', titre:'5.1 Sources et champ magnétique',
      notions:['Aimant : lignes de champ N→S','Fil rectiligne : cercles concentriques','Solénoïde : B=μ₀nI à l\'intérieur','μ₀=4π×10⁻⁷ T·m/A'],
      blocs:[
        {
          notion:'🧲 Champ magnétique',
          theoremes:[
            { id:'D-CM1', type:'def', nom:'Sources et formules du champ magnétique',
              enonce:"AIMANT :\nLignes de champ : de N vers S (à l'extérieur)\nPôles identiques : répulsion\nPôles opposés : attraction\n\nFIL RECTILIGNE INFINI (courant I, distance r) :\nB = μ₀I/(2πr)\nDirection : cercles concentriques autour du fil\nSens : règle de la main droite (pouce dans le sens I)\n\nSOLÉNOÏDE (n spires/m, courant I) :\nB = μ₀nI  à l'intérieur (uniforme)\nB ≈ 0 à l'extérieur\n\nμ₀ = 4π×10⁻⁷ T·m·A⁻¹ (perméabilité du vide)" },
          ],
          exercices:[
            { id:'EX-CM1', niveau:'Facile', titre:'Champ solénoïde',
              enonce:"Solénoïde : 1000 spires, L=50cm, I=2A. B à l'intérieur ?",
              correction:"n=1000/0,5=2000 sp/m.\nB=4π×10⁻⁷×2000×2=16π×10⁻⁴≈5,03×10⁻³T=5,03mT." },
          ]
        },
      ]
    },
    {
      id:'sc-cm-forces', titre:'5.2 Forces de Laplace et de Lorentz',
      notions:['Laplace : F⃗=I·L⃗∧B⃗ (|F|=ILBsinα)','Lorentz : F⃗=q·v⃗∧B⃗ (|F|=qvBsinα)','Trajectoire circulaire : r=mv/(qB)','Spectrographe de masse'],
      blocs:[
        {
          notion:'⚡ Forces magnétiques',
          theoremes:[
            { id:'F-CM1', type:'formule', nom:'Force de Laplace et de Lorentz',
              enonce:"FORCE DE LAPLACE (sur un conducteur) :\nF⃗ = I·L⃗ ∧ B⃗\n|F| = I·L·B·sinα  (α : angle entre L⃗ et B⃗)\nSens : règle de la main droite (ou du bonhomme d'Ampère)\n\nFORCE DE LORENTZ (sur une charge en mouvement) :\nF⃗ = q·v⃗ ∧ B⃗\n|F| = |q|·v·B·sinα\n\nPROPRIÉTÉ : F⃗ ⊥ v⃗ → travail nul → vitesse constante\n→ TRAJECTOIRE CIRCULAIRE si v⃗⊥B⃗\n\nRAYON de la trajectoire circulaire :\nmv²/r = qvB → r = mv/(qB)\n\nAPPLICATION : spectrographe de masse\nr = mv/(qB) → m = qBr/v",
              remarque:"La force de Lorentz ne travaille jamais (⊥ à v⃗) : elle change la direction mais pas la vitesse." },
          ],
          exercices:[
            { id:'EX-CM2', niveau:'Intermédiaire', titre:'Trajectoire circulaire',
              enonce:"Proton (m=1,67×10⁻²⁷kg, q=1,6×10⁻¹⁹C) dans B=0,1T, v=10⁶m/s ⊥ B. Rayon ?",
              correction:"r=mv/(qB)=1,67×10⁻²⁷×10⁶/(1,6×10⁻¹⁹×0,1)=1,67×10⁻²¹/1,6×10⁻²⁰≈0,104m≈10,4cm." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — INDUCTION ÉLECTROMAGNÉTIQUE
// ─────────────────────────────────────────────────════════════════════
'induction': {
  id:'induction', emoji:'🔄', tag:'Électromagnétisme', color:'#ec4899',
  titre:'Induction électromagnétique',
  desc:"Flux magnétique Φ=BScosθ, loi de Faraday e=−dΦ/dt, loi de Lenz (opposition), auto-induction e_L=−L·di/dt, énergie emmagasinée.",
  souschapitres:[
    {
      id:'sc-ind-flux', titre:'6.1 Flux magnétique et loi de Faraday',
      notions:['Φ=B·S·cosθ (Weber)','e=−dΦ/dt (Faraday)','i=e/R (courant induit)','Loi de Lenz : oppose la variation de flux'],
      blocs:[
        {
          notion:'🔄 Flux et induction',
          theoremes:[
            { id:'D-IN1', type:'def', nom:'Flux magnétique',
              enonce:"Φ = B·S·cosθ\nB : champ magnétique (T)\nS : aire du circuit (m²)\nθ : angle entre B⃗ et la normale à S\n\nUnité : Weber (Wb) = T·m²\n\nΦ maximal si B⃗ ⊥ surface (θ=0°) : Φ=BS\nΦ nul si B⃗ parallèle à la surface (θ=90°)" },
            { id:'L-IN1', type:'loi', nom:'Loi de Faraday et loi de Lenz',
              enonce:"LOI DE FARADAY :\ne = −dΦ/dt\ne : force électromotrice (FEM) induite (en V)\nUn courant induit apparaît si Φ varie\n\nLOI DE LENZ :\nLe courant induit s'oppose à la cause qui le produit\n(i.e. crée un champ qui s'oppose à la variation de Φ)\n\nMNÉMONIQUE : Lenz = frein\nApplications : freinage électromagnétique, guitare électrique, compteurs électriques",
              remarque:"Le signe − dans e=−dΦ/dt vient de la loi de Lenz. En pratique on calcule |e| et on détermine le sens par Lenz." },
          ],
          exercices:[
            { id:'EX-IN1', niveau:'Facile', titre:'FEM induite',
              enonce:"Spire S=0,01m², B passe de 0,2T à 0,8T en 0,5s. FEM induite ?",
              correction:"ΔΦ=ΔB×S=(0,8−0,2)×0,01=0,006Wb.\n|e|=|ΔΦ/Δt|=0,006/0,5=0,012V=12mV." },
          ]
        },
      ]
    },
    {
      id:'sc-ind-auto', titre:'6.2 Auto-induction et énergie',
      notions:['e_L=−L·di/dt (auto-induction)','L : inductance (Henry H)','E_L=½LI² (énergie emmagasinée)','Circuit RL : τ=L/R (constante de temps)'],
      blocs:[
        {
          notion:'⚡ Auto-induction et bobine',
          theoremes:[
            { id:'F-IN1', type:'formule', nom:'Auto-induction et circuit RL',
              enonce:"FEM D'AUTO-INDUCTION :\ne_L = −L·di/dt\nL : inductance propre (en Henry, H)\n\nÉNERGIE EMMAGASINÉE dans une bobine :\nE_L = ½LI²\n\nCIRCUIT RL série :\nConstante de temps : τ = L/R\n\nÉtablissement du courant :\ni(t) = I_max(1 − e^(−t/τ))\nI_max = E/R  (régime permanent)\n\nRupture du courant :\ni(t) = I_max·e^(−t/τ)",
              remarque:"τ=L/R : à t=τ, i=63%·Imax. À t=5τ, régime permanent atteint (99%)." },
          ],
          exercices:[
            { id:'EX-IN2', niveau:'Intermédiaire', titre:'Circuit RL',
              enonce:"E=12V, R=3Ω, L=0,6H. Calculer τ, I_max et i(τ).",
              correction:"τ=L/R=0,6/3=0,2s.\nI_max=E/R=12/3=4A.\ni(τ)=4(1−e⁻¹)=4×0,632≈2,53A." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — LENTILLES MINCES
// ─────────────────────────────────────────────────────────────────────
'lentilles': {
  id:'lentilles', emoji:'🔭', tag:'Optique', color:'#f97316',
  titre:'Lentilles minces',
  desc:"Types de lentilles, construction géométrique, relation de conjugaison 1/OA'−1/OA=1/f', grandissement γ=OA'/OA, vergence, instruments d'optique.",
  souschapitres:[
    {
      id:'sc-len-conj', titre:'7.1 Relation de conjugaison et grandissement',
      notions:['Foyers : F objet, F\' image','1/OA\'−1/OA=1/f\'','γ=A\'B\'/AB=OA\'/OA','V=1/f\' vergence (dioptrie)'],
      blocs:[
        {
          notion:'🔭 Lentilles et conjugaison',
          theoremes:[
            { id:'D-LN1', type:'def', nom:'Types de lentilles et foyers',
              enonce:"LENTILLE CONVERGENTE (f'>0) : bords minces\nFoyer IMAGE F' : rayon ∥ axe → passe par F'\nFoyer OBJET F : passe par F → sort ∥ axe\nCentre optique O : rayon direct non dévié\n\nLENTILLE DIVERGENTE (f'<0) : bords épais\nImage virtuelle du côté de l'objet\n\nCONSTRUCTION GÉOMÉTRIQUE :\nRayon 1 : ∥ axe → passe par F' (ou son prolongement)\nRayon 2 : passe par O → non dévié\n(3e rayon facultatif : passe par F → sort ∥ axe)" },
            { id:'F-LN1', type:'formule', nom:'Relation de conjugaison et grandissement',
              enonce:"RELATION DE CONJUGAISON :\n1/OA' − 1/OA = 1/f'\n\nConvention de signes ALGÉBRIQUES :\nOA < 0 (objet réel à gauche de O)\nOA' > 0 → image réelle à droite\nOA' < 0 → image virtuelle à gauche\n\nGRANDISSEMENT TRANSVERSAL :\nγ = A'B'/AB = OA'/OA\nγ > 0 : image droite\nγ < 0 : image renversée\n|γ| > 1 : image agrandie\n\nVERGENCE : V = 1/f'  (dioptries si f' en mètres)\n\nAssociation de lentilles minces accolées :\n1/f'total = 1/f'₁ + 1/f'₂\nVtotal = V₁ + V₂",
              remarque:"Loupe : objet entre F et O, image droite, virtuelle, agrandie. Grandissement G=D/f' avec D=25cm (distance de vision distincte)." },
          ],
          exercices:[
            { id:'EX-LN1', niveau:'Facile', titre:'Position de l\'image',
              enonce:"Lentille convergente f'=10cm. Objet à OA=−30cm. Image ?",
              correction:"1/OA'=1/f'+1/OA=1/10+1/(−30)=3/30−1/30=2/30.\nOA'=15cm. Image réelle, à droite.\nγ=15/(−30)=−0,5 : renversée, réduite." },
            { id:'EX-LN2', niveau:'Intermédiaire', titre:'Loupe',
              enonce:"Loupe f'=5cm. Objet à 4cm de O. Grandissement G ?",
              correction:"G=D/f'=25/5=5× (grossissement commercial).\nVérifier : OA=−4cm, 1/OA'=1/5−1/4=4/20−5/20=−1/20 → OA'=−20cm (image virtuelle).\nγ=−20/(−4)=5 ✓" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — ONDES LUMINEUSES
// ─────────────────────────────────────────────────────────────────────
'ondes-lumineuses': {
  id:'ondes-lumineuses', emoji:'🌈', tag:'Optique', color:'#14b8a6',
  titre:'Ondes lumineuses',
  desc:"Diffraction (tache centrale, condition λ≈a), interférences (fentes d'Young, interfrange i=λD/a), indice de réfraction n=c/v, loi de Snell-Descartes.",
  souschapitres:[
    {
      id:'sc-ol-diff', titre:'8.1 Diffraction et interférences',
      notions:['Diffraction : tache centrale si λ≈a','Interfrange i=λD/a','Interférences construc. : δ=kλ','Destruc. : δ=(k+½)λ'],
      blocs:[
        {
          notion:'🌈 Ondes et interférences',
          theoremes:[
            { id:'D-OL1', type:'def', nom:'Diffraction de la lumière',
              enonce:"Diffraction observable si : λ ≈ a  (λ = longueur d'onde, a = largeur de la fente)\n\nTACHE CENTRALE (fringe centrale) :\nLargeur angulaire : 2θ ≈ 2λ/a\nLargeur sur écran à distance D : L = 2λD/a\n\nSi a ≫ λ → pas de diffraction (optique géométrique)\nSi a ≈ λ → diffraction très marquée\n\nLimite de résolution (critère de Rayleigh) :\nθ_min = λ/a" },
            { id:'F-OL1', type:'formule', nom:'Interférences — Fentes d\'Young',
              enonce:"Deux fentes distantes de a, écran à distance D :\n\nINTERFRANGE :\ni = λD/a\n\nFRANGES BRILLANTES (interférences CONSTRUCTIVES) :\nδ = kλ  (k entier)\nx_k = k·λD/a\n\nFRANGES SOMBRES (interférences DESTRUCTIVES) :\nδ = (2k+1)·λ/2\nx_k = (2k+1)·λD/(2a)\n\nδ : différence de marche entre les deux ondes\n\nORDRE d'une frange : k (nombre entier)",
              remarque:"Pour mesurer λ : i=λD/a → λ=ia/D. Mesurer i à la règle, a au pied à coulisse, D au mètre." },
          ],
          exercices:[
            { id:'EX-OL1', niveau:'Facile', titre:'Interfrange',
              enonce:"Fentes d'Young : a=0,2mm, D=1,5m, λ=600nm. Interfrange ?",
              correction:"i=λD/a=600×10⁻⁹×1,5/(0,2×10⁻³)=9×10⁻⁷/2×10⁻⁴=4,5×10⁻³m=4,5mm." },
            { id:'EX-OL2', niveau:'Intermédiaire', titre:'Détermination de λ',
              enonce:"Fentes : a=0,5mm, D=2m, i=2,4mm mesuré. Longueur d'onde ?",
              correction:"λ=i·a/D=2,4×10⁻³×0,5×10⁻³/2=6×10⁻⁷m=600nm (lumière orange)." },
          ]
        },
      ]
    },
    {
      id:'sc-ol-refract', titre:'8.2 Réfraction et spectre électromagnétique',
      notions:['n=c/v (indice de réfraction)','Loi de Snell-Descartes : n₁sinθ₁=n₂sinθ₂','Réflexion totale interne si θ≥θ_lim','Spectre : UV·Visible(400-700nm)·IR'],
      blocs:[
        {
          notion:'🌊 Réfraction et indice',
          theoremes:[
            { id:'L-OL1', type:'loi', nom:'Loi de Snell-Descartes',
              enonce:"n₁·sinθ₁ = n₂·sinθ₂\n\nn = c/v = λ_vide/λ_milieu  (indice de réfraction)\nc = 3×10⁸ m/s (vitesse de la lumière dans le vide)\nv : vitesse dans le milieu (v < c)\n\nn_vide = 1 ; n_eau ≈ 1,33 ; n_verre ≈ 1,5\n\nRÉFLEXION TOTALE INTERNE :\nCondition : n₁ > n₂  et  θ₁ ≥ θ_limite\nθ_limite = arcsin(n₂/n₁)\nApplication : fibres optiques\n\nSPECTRE ÉLECTROMAGNÉTIQUE :\nUV : λ < 400nm\nVisible : 400nm (violet) à 700nm (rouge)\nIR : λ > 700nm" },
          ],
          exercices:[
            { id:'EX-OL3', niveau:'Facile', titre:'Snell-Descartes',
              enonce:"Rayon dans l'air (n=1) frappe le verre (n=1,5) avec θ₁=30°. Angle réfracté ?",
              correction:"sinθ₂=sinθ₁×n₁/n₂=0,5/1,5=1/3.\nθ₂=arcsin(1/3)≈19,5°." },
            { id:'EX-OL4', niveau:'Intermédiaire', titre:'Angle limite',
              enonce:"Verre n=1,5 / air n=1. Angle limite de réflexion totale ?",
              correction:"sinθ_lim=n₂/n₁=1/1,5=2/3.\nθ_lim=arcsin(2/3)≈41,8°." },
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
// CH 09 — RÉACTIONS D'OXYDORÉDUCTION
// ─────────────────────────────────────────────────────────────────────
'redox': {
  id:'redox', emoji:'⚗️', tag:'Chimie', color:'#ef4444',
  titre:'Réactions d\'oxydoréduction',
  desc:"Transfert d'électrons, oxydant/réducteur, couples Ox/Red, demi-équations, nombre d'oxydation, piles électrochimiques, électrolyse, loi de Faraday.",
  souschapitres:[
    {
      id:'sc-rdx-concepts', titre:'9.1 Oxydant, réducteur et demi-équations',
      notions:['Oxydant : capte des e⁻','Réducteur : cède des e⁻','Couple Ox/Red : Ox+ne⁻→Red','Nombre d\'oxydation (n.o.)'],
      blocs:[
        {
          notion:'⚗️ Oxydoréduction',
          theoremes:[
            { id:'D-RX1', type:'def', nom:'Oxydant, réducteur et couples',
              enonce:"TRANSFERT D'ÉLECTRONS :\nOxydant (Ox) : capte des électrons → se RÉDUIT\nRéducteur (Red) : cède des électrons → s'OXYDE\n\nCOUPLE Ox/Red (notation Ox/Red) :\nOx + ne⁻ ⇌ Red  (demi-équation)\n\nExemples de couples :\nFe³⁺/Fe²⁺ : Fe³⁺ + e⁻ → Fe²⁺\nMnO₄⁻/Mn²⁺ : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O\nCu²⁺/Cu : Cu²⁺ + 2e⁻ → Cu\nZn²⁺/Zn : Zn²⁺ + 2e⁻ → Zn\n\nRÉACTION REDOX :\nL'Ox du couple 1 réagit avec le Red du couple 2\n(ou inversement selon les potentiels)\n\nNOMBRE D'OXYDATION :\nRègles : oxygène = −2, hydrogène = +1, somme = charge" },
            { id:'M-RX1', type:'methode', nom:'Équilibrer une réaction redox',
              enonce:"1. Écrire les demi-équations (Ox+ne⁻→Red)\n2. Équilibrer les atomes et les charges (ajouter H₂O, H⁺ ou OH⁻)\n3. Multiplier pour que les e⁻ s'annulent\n4. Additionner les demi-équations\n\nExemple : Zn + Cu²⁺ → Zn²⁺ + Cu\nZn → Zn²⁺ + 2e⁻  (oxydation)\nCu²⁺ + 2e⁻ → Cu  (réduction)\nBilan : Zn + Cu²⁺ → Zn²⁺ + Cu" },
          ],
          exercices:[
            { id:'EX-RX1', niveau:'Facile', titre:'Identifier Ox et Red',
              enonce:"Réaction : Fe²⁺ + Ce⁴⁺ → Fe³⁺ + Ce³⁺. Identifier l'oxydant et le réducteur.",
              correction:"Fe²⁺ → Fe³⁺ : perd 1e⁻ → Fe²⁺ est le RÉDUCTEUR.\nCe⁴⁺ → Ce³⁺ : gagne 1e⁻ → Ce⁴⁺ est l'OXYDANT." },
          ]
        },
      ]
    },
    {
      id:'sc-rdx-piles', titre:'9.2 Piles et électrolyse',
      notions:['Pile : anode (−, oxydation) / cathode (+, réduction)','FEM = V_cathode − V_anode','Électrolyse : réaction forcée par E_ext','Loi de Faraday : m=M·I·t/(n·F)'],
      blocs:[
        {
          notion:'🔋 Piles et électrolyse',
          theoremes:[
            { id:'D-RX2', type:'def', nom:'Piles et électrolyse',
              enonce:"PILE GALVANIQUE :\nANODE (−) : oxydation → Red₁ → Ox₁ + ne⁻\nCATHODE (+) : réduction → Ox₂ + ne⁻ → Red₂\nFEM = V(+) − V(−) > 0\n\nPONT SALIN : maintient l'électroneutralité\n\nPILE DANIELL : Zn/Zn²⁺ || Cu²⁺/Cu\nZn s'oxyde (anode −), Cu²⁺ se réduit (cathode +)\nFEM ≈ 1,1V\n\nÉLECTROLYSE :\nRéaction forcée par un générateur externe\nAnode (+) : oxydation ; Cathode (−) : réduction\n\nLOI DE FARADAY :\nm = M·I·t/(n·F)\nm : masse déposée (g)\nM : masse molaire (g/mol)\nn : nb d'e⁻ échangés\nF = 96500 C/mol",
              remarque:"Dans une pile : anode = − (cède des e⁻). Dans l'électrolyse : anode = + (reliée au + du générateur). Les rôles chimiques (oxydation à l'anode) restent les mêmes." },
          ],
          exercices:[
            { id:'EX-RX2', niveau:'Intermédiaire', titre:'Électrolyse — masse déposée',
              enonce:"Électrolyse du CuSO₄ : I=2A pendant 30min. Masse de Cu déposée ? (M_Cu=64g/mol, n=2).",
              correction:"t=30×60=1800s.\nm=M·I·t/(n·F)=64×2×1800/(2×96500)=230400/193000≈1,19g." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 10 — RÉACTIONS ACIDE-BASE
// ─────────────────────────────────────────────────────────────────────
'acide-base': {
  id:'acide-base', emoji:'🧪', tag:'Chimie', color:'#10b981',
  titre:'Réactions acide-base',
  desc:"Théorie de Brønsted, couples AH/A⁻, pH=−log[H₃O⁺], acides/bases forts et faibles, constante d'acidité Ka, pKa, diagramme de prédominance, dosage acido-basique.",
  souschapitres:[
    {
      id:'sc-ab-ph', titre:'10.1 pH, couples et constante d\'acidité',
      notions:['AH + H₂O ⇌ A⁻ + H₃O⁺','pH=−log[H₃O⁺]','Ka=[A⁻][H₃O⁺]/[AH]','pKa=−log Ka'],
      blocs:[
        {
          notion:'🧪 Acides, bases et pH',
          theoremes:[
            { id:'D-AB1', type:'def', nom:'Théorie de Brønsted et couples',
              enonce:"ACIDE (selon Brønsted) : cède un proton H⁺\nBASE (selon Brønsted) : capte un proton H⁺\n\nCOUPLE ACIDE/BASE :\nAH ⇌ A⁻ + H⁺  (conjugué : AH/A⁻)\nExemples :\nCH₃COOH/CH₃COO⁻ (acide acétique)\nNH₄⁺/NH₃\nH₂O/OH⁻\nH₃O⁺/H₂O\n\nRÉACTION ACIDE-BASE :\nAH + B → A⁻ + BH⁺\n(l'acide cède H⁺ à la base)" },
            { id:'F-AB1', type:'formule', nom:'pH et constante d\'acidité',
              enonce:"pH = −log[H₃O⁺]\n[H₃O⁺] = 10^(−pH)\n\nSolution acide : pH < 7  ([H₃O⁺] > [OH⁻])\nSolution neutre : pH = 7\nSolution basique : pH > 7\n\nKe = [H₃O⁺][OH⁻] = 10⁻¹⁴  (à 25°C)\npKe = 14 : pH + pOH = 14\n\nCONSTANTE D'ACIDITÉ :\nKa = [A⁻][H₃O⁺]/[AH]\npKa = −log Ka\n\nDIAGRAMME DE PRÉDOMINANCE :\npH < pKa → AH prédomine\npH > pKa → A⁻ prédomine\npH = pKa → [AH] = [A⁻]",
              remarque:"Acide fort : Ka→∞ (réaction totale). Acide faible : Ka<<1 (équilibre), calculer [H₃O⁺]=√(Ka×C)." },
          ],
          exercices:[
            { id:'EX-AB1', niveau:'Facile', titre:'pH d\'un acide fort',
              enonce:"Solution HCl de concentration C=10⁻²mol/L. pH ?",
              correction:"HCl acide fort : [H₃O⁺]=C=10⁻²mol/L.\npH=−log(10⁻²)=2." },
            { id:'EX-AB2', niveau:'Intermédiaire', titre:'Prédominance',
              enonce:"Couple CH₃COOH/CH₃COO⁻, pKa=4,7. Espèce majoritaire à pH=6 ?",
              correction:"pH=6 > pKa=4,7 → CH₃COO⁻ (base) prédomine." },
          ]
        },
      ]
    },
    {
      id:'sc-ab-dosage', titre:'10.2 Dosage acido-basique',
      notions:['Équivalence : n_a×Va=n_b×Vb','Point d\'équivalence : courbe pH(V)','Indicateurs colorés : virages autour du pKi','Conductimétrie : conductance maximale à l\'éq.'],
      blocs:[
        {
          notion:'📊 Titrage acido-basique',
          theoremes:[
            { id:'M-AB1', type:'methode', nom:'Méthode de dosage acide-base',
              enonce:"DOSAGE (titrage) :\nVerser la solution titrante (base forte NaOH ou acide fort HCl)\ndans la solution à doser (acide ou base inconnue)\n\nÉQUIVALENCE (réaction totale, stœchiométrie) :\nPour : n_A × C_A × V_A = n_B × C_B × V_B\n(n_A, n_B : coefficients stœchiométriques)\n\nDétermination du point d'éq. :\n• pH-métrie : point d'inflexion de la courbe pH(V)\n• Indicateurs colorés : changer de couleur au voisinage de pH_éq\n  → Choisir indicateur dont pKi ≈ pH_éq\n• Conductimétrie : minimum de conductance (parfois)\n\nCALCUL DE CONCENTRATION :\nC_A = n_A × C_B × V_{B,éq} / (n_B × V_A)" },
          ],
          exercices:[
            { id:'EX-AB3', niveau:'Intermédiaire', titre:'Dosage pH-métrique',
              enonce:"20mL de CH₃COOH dosé par NaOH (0,1mol/L). Équivalence à V_B=16mL. Concentration de l'acide ?",
              correction:"n_A=n_B (mono-acide/mono-base, ratio 1:1).\nC_A=C_B×V_B/V_A=0,1×16/20=0,08 mol/L." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 11 — CINÉTIQUE CHIMIQUE
// ─────────────────────────────────────────────────────────────────────
'cinetique': {
  id:'cinetique', emoji:'⏱️', tag:'Chimie', color:'#f59e0b',
  titre:'Cinétique chimique',
  desc:"Vitesse de réaction v=−d[A]/dt, facteurs cinétiques (concentration, température, catalyseur), temps de demi-réaction t₁/₂, ordre de réaction.",
  souschapitres:[
    {
      id:'sc-ck-vitesse', titre:'11.1 Vitesse de réaction et facteurs cinétiques',
      notions:['v=−(1/a)d[A]/dt','t₁/₂ : [A]=[A]₀/2','Facteurs : concentration, T, catalyseur','Profil énergétique : E_a (énergie d\'activation)'],
      blocs:[
        {
          notion:'⏱️ Vitesse et facteurs cinétiques',
          theoremes:[
            { id:'D-CK1', type:'def', nom:'Vitesse de réaction',
              enonce:"Pour aA + bB → cC + dD :\n\nVITESSE VOLUMIQUE :\nv = −(1/a)·d[A]/dt = −(1/b)·d[B]/dt = (1/c)·d[C]/dt\n(positive et indépendante du réactif choisi)\n\nGRAPHIQUEMENT :\nv(t) = pente de la tangente à la courbe [A](t) au temps t\nv(t=0) = pente à l'origine (vitesse initiale)\n\nTEMPS DE DEMI-RÉACTION t₁/₂ :\nt quand [A] = [A]₀/2\n(ou avancement = moitié de l'avancement maximal)" },
            { id:'D-CK2', type:'def', nom:'Facteurs cinétiques',
              enonce:"FACTEURS QUI INFLUENCENT LA VITESSE :\n\n1. CONCENTRATION :\nAugmenter [réactifs] → augmente la fréquence des chocs → v augmente\n\n2. TEMPÉRATURE :\nAugmenter T → plus de chocs ET chocs plus énergétiques → v augmente fortement\nLoi d'Arrhenius : k = A·e^(−Ea/RT)\n\n3. CATALYSEUR :\nAbaisse l'énergie d'activation Ea → v augmente\nCatalyseur non consommé\nHomogène (même phase) / Hétérogène (phase différente) / Enzymatique\n\n4. LUMIÈRE (photocatalyse) :\nCertaines réactions photo-activées",
              remarque:"Le catalyseur ne déplace pas l'équilibre thermodynamique (K inchangée) mais accélère l'atteinte de cet équilibre." },
          ],
          exercices:[
            { id:'EX-CK1', niveau:'Facile', titre:'Temps de demi-réaction',
              enonce:"[A]₀=0,4 mol/L. Graphique donne [A]=0,2 mol/L à t=180s. t₁/₂ ?",
              correction:"t₁/₂=180s (par lecture graphique : [A]=[A]₀/2)." },
            { id:'EX-CK2', niveau:'Intermédiaire', titre:'Vitesse initiale',
              enonce:"Courbe [A](t) : tangente à t=0 a pente −2×10⁻³ mol·L⁻¹·s⁻¹. Vitesse initiale ?",
              correction:"v₀=−d[A]/dt|_{t=0}=2×10⁻³ mol·L⁻¹·s⁻¹." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 12 — ÉQUILIBRE CHIMIQUE
// ─────────────────────────────────────────────────────────────────────
'equilibre': {
  id:'equilibre', emoji:'⚖️', tag:'Chimie', color:'#8b5cf6',
  titre:'Équilibre chimique',
  desc:"État d'équilibre dynamique, quotient de réaction Qr, constante d'équilibre K, critère d'évolution (Qr vs K), loi de Le Chatelier, déplacement d'équilibre.",
  souschapitres:[
    {
      id:'sc-eq-constante', titre:'12.1 Quotient de réaction et constante K',
      notions:['Qr = produit/réactifs (en concentrations)','K : constante d\'équilibre (à T fixée)','Qr<K → sens direct','Qr>K → sens inverse'],
      blocs:[
        {
          notion:'⚖️ Équilibre et critère d\'évolution',
          theoremes:[
            { id:'D-EQ1', type:'def', nom:'Quotient de réaction et constante K',
              enonce:"Réaction : aA + bB ⇌ cC + dD\n\nQUOTIENT DE RÉACTION :\nQr = [C]^c·[D]^d / ([A]^a·[B]^b)\n(concentrations en mol/L, solides et solvants exclus)\n\nCONSTANTE D'ÉQUILIBRE K :\nQr = K à l'équilibre\nK dépend uniquement de T (pas de la pression, ni des concentrations initiales)\n\nCRITÈRE D'ÉVOLUTION :\nQr < K → réaction évolue dans le SENS DIRECT\nQr > K → réaction évolue dans le SENS INVERSE\nQr = K → système à l'ÉQUILIBRE (pas d'évolution)" },
            { id:'T-EQ1', type:'thm', nom:'Loi de Le Chatelier',
              enonce:"Un système à l'équilibre modifié par une perturbation extérieure évolue de façon à s'opposer à cette perturbation.\n\nAPPLICATIONS :\n\n1. CONCENTRATION :\nAjouter un réactif → sens direct (le consomme)\nAjouter un produit → sens inverse\n\n2. TEMPÉRATURE :\nAugmenter T → sens endothermique\nDiminuer T → sens exothermique\n\n3. PRESSION (gaz) :\nAugmenter P → sens diminuant le nb de moles de gaz\nDiminuer P → sens augmentant le nb de moles de gaz\n\n4. CATALYSEUR :\nN'a PAS d'effet sur la position de l'équilibre\n(accélère uniquement l'atteinte de l'équilibre)",
              remarque:"Le Chatelier = principe de l'opposition. Il permet de déplacer un équilibre pour maximiser un produit industriel (exemple : synthèse de l'ammoniac, Haber-Bosch)." },
          ],
          exercices:[
            { id:'EX-EQ1', niveau:'Facile', titre:'Critère d\'évolution',
              enonce:"K=10⁻⁵. Qr calculé = 10⁻³. Sens d'évolution ?",
              correction:"Qr=10⁻³ > K=10⁻⁵ → sens INVERSE (vers les réactifs)." },
            { id:'EX-EQ2', niveau:'Intermédiaire', titre:'Le Chatelier — synthèse',
              enonce:"N₂(g)+3H₂(g)⇌2NH₃(g) ΔH<0 (exothermique). Pour maximiser NH₃ : augmenter ou diminuer T ? Augmenter ou diminuer P ?",
              correction:"ΔH<0 → sens direct exothermique → diminuer T favorise NH₃.\nSens direct : 4 moles gaz → 2 moles gaz → augmenter P favorise NH₃." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 13 — CHIMIE ORGANIQUE
// ─────────────────────────────────────────────────────────────────────
'organique': {
  id:'organique', emoji:'🔬', tag:'Chimie', color:'#06b6d4',
  titre:'Chimie organique',
  desc:"Structure des molécules organiques, isomérie, groupes caractéristiques, réactions (substitution, addition, élimination, oxydation, estérification), polymères.",
  souschapitres:[
    {
      id:'sc-org-struct', titre:'13.1 Structure et isomérie',
      notions:['Formule brute/développée/semi-développée','Isomérie : chaîne, position, fonction','Groupes caractéristiques : −OH, −CHO, −COOH, −COO−, −NH₂','Nomenclature IUPAC'],
      blocs:[
        {
          notion:'🧬 Structure et isomérie',
          theoremes:[
            { id:'D-OR1', type:'def', nom:'Formules et isomérie',
              enonce:"FORMULE BRUTE : CₙHₘOₚ… (composition atomique)\nFORMULE DÉVELOPPÉE : tous les liaisons représentées\nFORMULE SEMI-DÉVELOPPÉE : groupes CH₃, CH₂, … sans montrer C−H\n\nISOMÈRES : même formule brute, structures différentes\n\nISOMÉRIE DE CHAÎNE :\nMême formule, squelette carboné différent\nEx : C₄H₁₀ → n-butane / 2-méthylpropane\n\nISOMÉRIE DE POSITION :\nMême fonction, position différente\nEx : 1-butanol / 2-butanol\n\nISOMÉRIE DE FONCTION :\nFormule brute identique, fonctions différentes\nEx : acide / ester ; alcool / éther" },
            { id:'D-OR2', type:'def', nom:'Groupes caractéristiques',
              enonce:"ALCOOL : −OH  (sur C saturé)\nALDÉHYDE : −CHO  (extrémité de chaîne)\nCÉTONE : >C=O  (en milieu de chaîne)\nACIDE CARBOXYLIQUE : −COOH\nESTER : −COO−\nAMINE : −NH₂\nAMIDE : −CO−NH₂\n\nNOMENCLATURE IUPAC :\n1. Chaîne principale (la plus longue avec la fonction principale)\n2. Numéroter depuis l'extrémité la plus proche de la fonction\n3. Nommer les substituants (méthyl, éthyl…)\n4. Suffixe selon la fonction : -ol, -al, -one, -oïque, -oate" },
          ],
          exercices:[
            { id:'EX-OR1', niveau:'Facile', titre:'Identifier le groupe',
              enonce:"CH₃−CO−CH₂−CH₃. Groupe caractéristique et famille ?",
              correction:">C=O en milieu de chaîne → CÉTONE (butan-2-one ou méthyléthylcétone)." },
          ]
        },
      ]
    },
    {
      id:'sc-org-reactions', titre:'13.2 Réactions organiques et polymères',
      notions:['Substitution (alcanes + X₂ → RX + HX)','Addition (alcènes + H₂ → alcane)','Élimination (alcool → alcène + H₂O)','Estérification : acide + alcool ⇌ ester + H₂O (lente, équilibre)'],
      blocs:[
        {
          notion:'⚗️ Réactions et polymères',
          theoremes:[
            { id:'D-OR3', type:'def', nom:'Réactions organiques principales',
              enonce:"SUBSTITUTION (alcanes) :\nCH₄ + Cl₂ → CH₃Cl + HCl  (UV, radical)\n\nADDITION (alcènes) :\nCH₂=CH₂ + H₂ → CH₃−CH₃  (catalyseur Ni, Pt)\nCH₂=CH₂ + HBr → CH₃−CH₂Br  (Markovnikov)\n\nÉLIMINATION :\nAlcool + H₂SO₄ (conc., 170°C) → alcène + H₂O\nCH₃CH₂OH → CH₂=CH₂ + H₂O\n\nOXYDATION :\nAlcool primaire → aldéhyde → acide carboxylique\nAlcool secondaire → cétone (difficilement oxydée plus loin)\n\nESTÉRIFICATION :\nAcide + Alcool ⇌ Ester + H₂O\nLente, exothermique, équilibre (K ≈ 4 pour acide/alcool primaire)\nCatalyse acide H⁺\n\nHYDROLYSE des esters (inverse) :\nEster + H₂O ⇌ Acide + Alcool\n\nSAPONIFICATION (totale) :\nEster + NaOH → Alcool + carboxylate de Na" },
            { id:'D-OR4', type:'def', nom:'Polymères',
              enonce:"POLYADDITION (monomères insaturés) :\nPolyéthylène : nCH₂=CH₂ → −(CH₂−CH₂)ₙ−\nPVC : n(CH₂=CHCl) → −(CH₂−CHCl)ₙ−\n\nPOLYCONDENSATION (avec élimination d'eau ou HCl) :\nPolyesters : diacide + diol → −CO−R−COO−R'−OO−\nPolyamides (Nylon 6-6) : diacide + diamine\n\nPROPRIÉTÉS :\nThermoplastiques : ramollissent à chaud (recyclables)\nThermodurcissables : réticulés, infusibles\n\nDEGRÉ DE POLYMÉRISATION n :\nMasse molaire M = n × M_monomère" },
          ],
          exercices:[
            { id:'EX-OR2', niveau:'Intermédiaire', titre:'Estérification',
              enonce:"Estérification de l'acide acétique (CH₃COOH) avec l'éthanol (C₂H₅OH). Écrire l'équation et nommer l'ester.",
              correction:"CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O\nEster : acétate d'éthyle (éthanoate d'éthyle)." },
            { id:'EX-OR3', niveau:'Difficile', titre:'Degré de polymérisation',
              enonce:"Polyéthylène de masse molaire M=56000g/mol. M_monomère=28g/mol. Degré de polymérisation ?",
              correction:"n=M/M_monomère=56000/28=2000." },
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
export default function PhysiqueMathsSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'cinematique'
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
          <Link href="/bac/physique/maths" style={{ color:'#f59e0b' }}>
            ← Retour Physique-Chimie Maths
          </Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#f59e0b'
  const isChimie = IS_CHIMIE[slug] || false

  const PHYS_SLUGS = NAV_ORDER.slice(0,8)
  const CHIM_SLUGS = NAV_ORDER.slice(8)

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
          <Link href="/bac/physique/maths" style={{ color:'var(--muted)', textDecoration:'none' }}>Section Maths</Link><span>›</span>
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
                  <span style={{ fontSize:11, background:'rgba(245,158,11,0.15)',
                    color:'#fbbf24', padding:'2px 9px', borderRadius:10 }}>
                    {isChimie ? '🧪 Chimie' : '⚛️ Physique'} · Section Maths · Tunisie
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Physique Chimie Bac Tunisie Section Maths')}`}
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
                                      <Link href={`/solve?q=${encodeURIComponent('Physique-Chimie Section Maths Tunisie — '+ex.enonce)}`}
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
                  <Link href={`/bac/physique/maths/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/physique/maths/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                {/* Physique */}
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#4f6ef7', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(79,110,247,0.08)' }}>
                  ⚛️ Physique — 8 chapitres
                </div>
                {PHYS_SLUGS.map(s => (
                  <Link key={s} href={`/bac/physique/maths/${s}`} style={{ textDecoration:'none' }}>
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
                {/* Chimie */}
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#10b981', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(16,185,129,0.08)' }}>
                  🧪 Chimie — 5 chapitres
                </div>
                {CHIM_SLUGS.map(s => (
                  <Link key={s} href={`/bac/physique/maths/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Physique-Chimie Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.tag}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/physique/maths" className="btn btn-secondary"
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