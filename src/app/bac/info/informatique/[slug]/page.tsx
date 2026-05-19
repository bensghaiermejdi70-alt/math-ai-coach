'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// INFORMATIQUE — SECTION SCIENCES INFORMATIQUES / [SLUG]
// Route : /bac/info/informatique/[slug]
// Programme officiel CNP Tunisie · 4ème année Sciences Informatiques
// 16 chapitres : Algo&Prog (6) + Bases de données (6) + TIC (4)
// ══════════════════════════════════════════════════════════════════════

const C = {
  thm:'#a78bfa', def:'#4f6ef7', formule:'#f5c842',
  prop:'#06d6a0', algo:'#60a5fa', sql:'#8b5cf6', methode:'#ec4899'
}
const L: Record<string,string> = {
  thm:'Théorème', def:'Définition', formule:'Formule clé',
  prop:'Propriété', algo:'Algorithme', sql:'Requête SQL', methode:'Méthode'
}

const NAV_ORDER = [
  'notions-base-algo','structures-controle','structures-donnees',
  'sous-programmes','algorithmes-avances','programmation-pascal-python',
  'concepts-base-bd','modelisation-relationnelle','sql-requetes-simples',
  'sql-requetes-avancees','sql-manipulation','normalisation',
  'internet-reseaux','web-html-css-js','systemes-informatiques','securite-informatique',
]

const TITRES_NAV: Record<string,string> = {
  'notions-base-algo':          "CH 01 — Notions de base de l'algorithmique",
  'structures-controle':        'CH 02 — Structures de contrôle',
  'structures-donnees':         'CH 03 — Structures de données',
  'sous-programmes':            'CH 04 — Sous-programmes',
  'algorithmes-avances':        'CH 05 — Algorithmes avancés',
  'programmation-pascal-python':'CH 06 — Programmation Pascal / Python',
  'concepts-base-bd':           'CH 07 — Concepts de base des BDD',
  'modelisation-relationnelle': 'CH 08 — Modélisation relationnelle',
  'sql-requetes-simples':       'CH 09 — SQL — Requêtes simples',
  'sql-requetes-avancees':      'CH 10 — SQL — Requêtes avancées',
  'sql-manipulation':           'CH 11 — SQL — Manipulation de données',
  'normalisation':              'CH 12 — Normalisation',
  'internet-reseaux':           'CH 13 — Internet & Réseaux',
  'web-html-css-js':            'CH 14 — Web — HTML / CSS / JS',
  'systemes-informatiques':     'CH 15 — Systèmes informatiques',
  'securite-informatique':      'CH 16 — Sécurité informatique',
}

const SEC_COLORS: Record<string,string> = {
  'notions-base-algo':'#4f6ef7','structures-controle':'#4f6ef7',
  'structures-donnees':'#4f6ef7','sous-programmes':'#4f6ef7',
  'algorithmes-avances':'#4f6ef7','programmation-pascal-python':'#60a5fa',
  'concepts-base-bd':'#8b5cf6','modelisation-relationnelle':'#8b5cf6',
  'sql-requetes-simples':'#8b5cf6','sql-requetes-avancees':'#8b5cf6',
  'sql-manipulation':'#8b5cf6','normalisation':'#8b5cf6',
  'internet-reseaux':'#06d6a0','web-html-css-js':'#06d6a0',
  'systemes-informatiques':'#06d6a0','securite-informatique':'#06d6a0',
}

const BLOC_LABEL: Record<string,string> = {
  'notions-base-algo':'🧮 Algo','structures-controle':'🧮 Algo',
  'structures-donnees':'🧮 Algo','sous-programmes':'🧮 Algo',
  'algorithmes-avances':'🧮 Algo','programmation-pascal-python':'💻 Prog',
  'concepts-base-bd':'🗄️ BDD','modelisation-relationnelle':'🗄️ BDD',
  'sql-requetes-simples':'🗄️ BDD','sql-requetes-avancees':'🗄️ BDD',
  'sql-manipulation':'🗄️ BDD','normalisation':'🗄️ BDD',
  'internet-reseaux':'🌐 TIC','web-html-css-js':'🌐 TIC',
  'systemes-informatiques':'🌐 TIC','securite-informatique':'🌐 TIC',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

const ALL_CHAPTERS: Record<string,Chap> = {

// ══════════════════════════════════════════════════════════════════════
// BLOC 1 — ALGORITHMIQUE & PROGRAMMATION
// ══════════════════════════════════════════════════════════════════════

'notions-base-algo': {
  id:'notions-base-algo', emoji:'🧮', badge:'Algorithmique', color:'#4f6ef7',
  titre:"Notions de base de l'algorithmique",
  desc:"Structure d'un algorithme, types de variables (Entier/Réel/Booléen/Chaîne), déclaration, affectation ←, opérateurs arithmétiques et logiques, Lire/Écrire.",
  souschapitres:[
    {
      id:'sc-algo1', titre:'1.1 Structure d\'un algorithme et types',
      notions:['Algorithme NomAlgo / Début / Fin','VAR nom : TYPE (Entier, Réel, Booléen, Chaîne)','CONST nom = valeur','Affectation : variable ← expression'],
      blocs:[
        {
          notion:'🧮 Structure d\'un algorithme',
          theoremes:[
            { id:'D-A1', type:'def', nom:"Structure d'un algorithme",
              enonce:"Algorithme NomAlgorithme\nVAR\n  [déclarations de variables]\nDébut\n  [instructions]\nFin\n\nTYPES PRIMITIFS :\nEntier : nombres entiers (−∞ à +∞)\nRéel : nombres décimaux (3.14)\nBooléen : VRAI ou FAUX\nCaractère : un seul caractère ('a')\nChaîne : suite de caractères ('Ahmed')\n\nDÉCLARATION :\nVAR nom : TYPE\nVAR x, y : Entier\nVAR prenom : Chaîne\n\nCONSTANTE :\nCONST PI = 3.14159" },
            { id:'D-A2', type:'def', nom:"Affectation et opérateurs",
              enonce:"AFFECTATION : variable ← expression\n(la variable reçoit la valeur de l'expression)\n\nOPÉRATEURS ARITHMÉTIQUES :\n+ (addition) ; − (soustraction)\n* (multiplication) ; / (division réelle)\nDIV (division entière) ; MOD (reste)\n\nOPÉRATEURS DE COMPARAISON :\n= (égal) ; <> (différent)\n< > <= >= \n\nOPÉRATEURS LOGIQUES :\nET (AND) ; OU (OR) ; NON (NOT)\n\nPRIORITÉ : NON > ET > OU" },
            { id:'D-A3', type:'def', nom:"Entrée / Sortie",
              enonce:"LECTURE : Lire(variable)  ou  Saisir(variable)\n→ L'utilisateur entre une valeur au clavier\n\nÉCRITURE : Écrire(expression)  ou  Afficher(expression)\n→ Affiche le résultat à l'écran\n\nEXEMPLE COMPLET :\nAlgorithme Bonjour\nVAR nom : Chaîne\nDébut\n  Écrire('Quel est votre nom ?')\n  Lire(nom)\n  Écrire('Bonjour ', nom, ' !')\nFin",
              remarque:"Toujours initialiser les variables avant de les utiliser dans un calcul. x ← 0 avant x ← x + 1." },
          ],
          exercices:[
            { id:'EX-A1', niveau:'Facile', titre:"Échange de deux variables",
              enonce:"Écrire un algorithme qui échange les valeurs de a et b (sans utiliser a←b directement).",
              correction:"VAR a, b, tmp : Entier\nDébut\n  Lire(a, b)\n  tmp ← a\n  a ← b\n  b ← tmp\n  Écrire('a=', a, '  b=', b)\nFin" },
            { id:'EX-A2', niveau:'Facile', titre:"Périmètre d'un cercle",
              enonce:"Calculer et afficher P = 2×π×r pour un rayon r saisi.",
              correction:"CONST PI = 3.14159\nVAR r, P : Réel\nDébut\n  Lire(r)\n  P ← 2 * PI * r\n  Écrire('Périmètre = ', P)\nFin" },
          ]
        },
      ]
    },
  ]
},

'structures-controle': {
  id:'structures-controle', emoji:'🔀', badge:'Algorithmique', color:'#4f6ef7',
  titre:'Structures de contrôle',
  desc:"Conditions (SI/SINON, SELON), boucles (POUR, TANT QUE, RÉPÉTER), opérateurs ET/OU/NON, choix de la bonne structure.",
  souschapitres:[
    {
      id:'sc-ctrl1', titre:'2.1 Conditions — SI et SELON',
      notions:['SI cond ALORS...SINON...FIN SI','SI imbriqués','SELON variable FAIRE...FIN SELON','Opérateurs ET / OU / NON'],
      blocs:[
        {
          notion:'🔀 Structures conditionnelles',
          theoremes:[
            { id:'D-C1', type:'def', nom:"SI / SINON et SELON",
              enonce:"CONDITION SIMPLE :\nSI condition ALORS\n  instructions\nFIN SI\n\nCONDITION AVEC ALTERNATIVE :\nSI condition ALORS\n  instructions1\nSINON\n  instructions2\nFIN SI\n\nCONDITIONS IMBRIQUÉES :\nSI cond1 ALORS\n  ...\nSINON SI cond2 ALORS\n  ...\nSINON\n  ...\nFIN SI\n\nSELON variable FAIRE\n  valeur1 : instruction1\n  valeur2 : instruction2\n  SINON : instruction_défaut\nFIN SELON" },
          ],
          exercices:[
            { id:'EX-C1', niveau:'Facile', titre:"Signe d'un nombre",
              enonce:"Lire n. Afficher 'Positif', 'Négatif' ou 'Nul'.",
              correction:"SI n > 0 ALORS\n  Écrire('Positif')\nSINON SI n < 0 ALORS\n  Écrire('Négatif')\nSINON\n  Écrire('Nul')\nFIN SI" },
          ]
        },
      ]
    },
    {
      id:'sc-ctrl2', titre:'2.2 Boucles — POUR, TANT QUE, RÉPÉTER',
      notions:['POUR i DE début A fin FAIRE','TANT QUE condition FAIRE (0 ou + tours)','RÉPÉTER...JUSQU\'À cond (≥1 tour)','Choisir selon le contexte'],
      blocs:[
        {
          notion:'🔁 Structures itératives',
          theoremes:[
            { id:'D-C2', type:'def', nom:"Les trois boucles",
              enonce:"POUR (nb d'itérations connu à l'avance) :\nPOUR i DE debut A fin FAIRE\n  instructions\nFIN POUR\n(i s'incrémente automatiquement de 1)\n\nTANT QUE (0 ou plusieurs tours) :\nTANT QUE condition FAIRE\n  instructions\nFIN TANT QUE\n(tester AVANT d'entrer)\n\nRÉPÉTER (au moins 1 tour) :\nRÉPÉTER\n  instructions\nJUSQU'À condition\n(tester APRÈS chaque tour)" },
            { id:'F-C1', type:'formule', nom:"Choisir la bonne boucle",
              enonce:"POUR → nombre d'itérations connu à l'avance\n         (parcourir un tableau de n éléments)\n\nTANT QUE → peut ne pas s'exécuter du tout\n         (menu : si déjà valide, pas de boucle)\n\nRÉPÉTER → au moins un tour garanti\n         (saisie obligatoire : lire au moins une fois)\n\n⚠️ BOUCLE INFINIE : éviter si condition ne change jamais !\nToujours modifier la variable de condition dans la boucle.",
              remarque:"RÉPÉTER s'arrête quand la condition est VRAIE (≠ TANT QUE qui s'arrête quand elle est FAUSSE)." },
          ],
          exercices:[
            { id:'EX-C2', niveau:'Facile', titre:"Somme 1 à n",
              enonce:"Calculer S = 1+2+...+n avec une boucle POUR.",
              correction:"VAR i, n, S : Entier\nDébut\n  Lire(n)\n  S ← 0\n  POUR i DE 1 A n FAIRE\n    S ← S + i\n  FIN POUR\n  Écrire('Somme = ', S)\nFin" },
            { id:'EX-C3', niveau:'Intermédiaire', titre:"Nombre premier",
              enonce:"Déterminer si n est premier (n>1).",
              correction:"VAR n, i : Entier\nVAR premier : Booléen\nDébut\n  Lire(n)\n  premier ← VRAI\n  POUR i DE 2 A n-1 FAIRE\n    SI n MOD i = 0 ALORS\n      premier ← FAUX\n    FIN SI\n  FIN POUR\n  SI premier ALORS Écrire(n, ' est premier')\n  SINON Écrire(n, ' n est pas premier')\n  FIN SI\nFin" },
          ]
        },
      ]
    },
  ]
},

'structures-donnees': {
  id:'structures-donnees', emoji:'📦', badge:'Algorithmique', color:'#4f6ef7',
  titre:'Structures de données',
  desc:"Tableaux 1D et 2D (déclaration, parcours), chaînes de caractères (fonctions : LONGUEUR, COPIE, POS, CONCAT), enregistrements (records).",
  souschapitres:[
    {
      id:'sc-data1', titre:'3.1 Tableaux 1D et 2D',
      notions:['TAB : TABLEAU[1..n] DE TYPE','Accès : TAB[i]','2D : M[1..n, 1..p], accès M[i][j]','Parcours avec boucles POUR imbriquées'],
      blocs:[
        {
          notion:'📦 Tableaux',
          theoremes:[
            { id:'D-D1', type:'def', nom:"Tableaux 1D et 2D",
              enonce:"TABLEAU 1D (vecteur) :\nVAR TAB : TABLEAU[1..n] DE TYPE\nAccès : TAB[i]  (i de 1 à n)\n\nPARCOURS :\nPOUR i DE 1 A n FAIRE\n  Traitement(TAB[i])\nFIN POUR\n\nTABLEAU 2D (matrice) :\nVAR M : TABLEAU[1..n, 1..p] DE TYPE\nAccès : M[i][j]  (ligne i, colonne j)\n\nPARCOURS LIGNE PAR LIGNE :\nPOUR i DE 1 A n FAIRE\n  POUR j DE 1 A p FAIRE\n    Traitement(M[i][j])\n  FIN POUR\nFIN POUR" },
          ],
          exercices:[
            { id:'EX-D1', niveau:'Facile', titre:"Maximum d'un tableau",
              enonce:"Trouver le maximum de TAB[1..n].",
              correction:"VAR max, i : Entier\nDébut\n  max ← TAB[1]\n  POUR i DE 2 A n FAIRE\n    SI TAB[i] > max ALORS\n      max ← TAB[i]\n    FIN SI\n  FIN POUR\n  Écrire('Maximum = ', max)\nFin" },
          ]
        },
      ]
    },
    {
      id:'sc-data2', titre:'3.2 Chaînes de caractères et enregistrements',
      notions:['LONGUEUR(ch) : nb de caractères','COPIE(ch, pos, len) : sous-chaîne','POS(ch, motif) : position','Enregistrement : TYPE Struct = ENREGISTREMENT...'],
      blocs:[
        {
          notion:'📝 Chaînes et enregistrements',
          theoremes:[
            { id:'D-D2', type:'def', nom:"Fonctions sur les chaînes",
              enonce:"LONGUEUR(ch) : nombre de caractères\nCOPIE(ch, pos, longueur) : sous-chaîne\nPOS(ch, motif) : position du motif dans ch (0 si absent)\nEFFACER(ch, pos, longueur) : supprimer\nINSERER(ch, pos, motif) : insérer\nCONCAT(ch1, ch2) ou ch1 + ch2 : concaténation\nMAJUSCULE(ch) : convertir en majuscules\nMINUSCULE(ch) : convertir en minuscules\n\nEXEMPLES :\nLONGUEUR('Ahmed') → 5\nCOPIE('Ahmed', 2, 3) → 'hme'\nPOS('Ahmed', 'me') → 3" },
            { id:'D-D3', type:'def', nom:"Enregistrements (records)",
              enonce:"DÉFINITION D'UN TYPE ENREGISTREMENT :\nTYPE Etudiant = ENREGISTREMENT\n  nom : Chaîne\n  age : Entier\n  note : Réel\nFIN ENREGISTREMENT\n\nDÉCLARATION ET ACCÈS :\nVAR e : Etudiant\nAccès aux champs : e.nom, e.age, e.note\n\nTABLEAU D'ENREGISTREMENTS :\nVAR Classe : TABLEAU[1..30] DE Etudiant\nAccès : Classe[i].nom, Classe[i].note\n\nUTILITÉ : regrouper des données liées logiquement" },
          ],
          exercices:[
            { id:'EX-D2', niveau:'Intermédiaire', titre:"Inverser une chaîne",
              enonce:"Écrire un algorithme qui inverse la chaîne ch (ex: 'abc' → 'cba').",
              correction:"VAR ch, inv : Chaîne\nVAR i, n : Entier\nDébut\n  Lire(ch)\n  n ← LONGUEUR(ch)\n  inv ← ''\n  POUR i DE n A 1 FAIRE\n    inv ← inv + COPIE(ch, i, 1)\n  FIN POUR\n  Écrire('Inversée : ', inv)\nFin" },
          ]
        },
      ]
    },
  ]
},

'sous-programmes': {
  id:'sous-programmes', emoji:'🔧', badge:'Algorithmique', color:'#4f6ef7',
  titre:'Sous-programmes',
  desc:"Procédures (sans retour) vs Fonctions (avec retour), passage par valeur vs par référence (VAR), portée locale et globale.",
  souschapitres:[
    {
      id:'sc-sp1', titre:'4.1 Procédures et fonctions',
      notions:['Procédure : sans retour (affichage, modification)','Fonction : retourne une valeur','RETOURNER valeur','Appel : res ← NomFonction(args)'],
      blocs:[
        {
          notion:'🔧 Procédures et fonctions',
          theoremes:[
            { id:'D-SP1', type:'def', nom:"Procédure vs Fonction",
              enonce:"PROCÉDURE (pas de valeur retournée) :\nProcédure NomP(p1 : T1 ; VAR p2 : T2)\nDébut\n  [instructions]\nFin\nAppel : NomP(arg1, arg2)\n\nFONCTION (retourne une valeur) :\nFonction NomF(p1 : T1 ; p2 : T2) : TYPE_RETOUR\nDébut\n  ...\n  RETOURNER valeur\nFin\nAppel : res ← NomF(arg1, arg2)" },
            { id:'D-SP2', type:'def', nom:"Passage de paramètres",
              enonce:"PAR VALEUR (défaut) :\n→ Copie locale, le paramètre de l'appelant N'EST PAS modifié\nFonction NomF(a : Entier) : Réel\n\nPAR RÉFÉRENCE (VAR) :\n→ Modification directe de la variable de l'appelant\n→ Utiliser pour retourner plusieurs valeurs\nProcédure NomP(VAR x : Entier)\n\nPORTÉE :\nLocale : variable déclarée dans le sous-programme (invisible ailleurs)\nGlobale : variable déclarée dans l'algorithme principal (visible partout)\n→ Préférer les paramètres aux variables globales",
              remarque:"Si une fonction doit retourner 2 résultats, utiliser une procédure avec 2 paramètres VAR, ou retourner un enregistrement." },
          ],
          exercices:[
            { id:'EX-SP1', niveau:'Facile', titre:"Fonction puissance",
              enonce:"Écrire la fonction Puissance(a:Réel ; n:Entier) : Réel qui calcule aⁿ.",
              correction:"Fonction Puissance(a : Réel ; n : Entier) : Réel\nVAR p : Réel ; i : Entier\nDébut\n  p ← 1\n  POUR i DE 1 A n FAIRE\n    p ← p * a\n  FIN POUR\n  RETOURNER p\nFin\n\n// Appel :\nres ← Puissance(2, 10)  // → 1024" },
            { id:'EX-SP2', niveau:'Intermédiaire', titre:"Procédure Echanger",
              enonce:"Écrire Echanger(VAR a, b : Entier) et l'utiliser.",
              correction:"Procédure Echanger(VAR a, b : Entier)\nVAR tmp : Entier\nDébut\n  tmp ← a ; a ← b ; b ← tmp\nFin\n\n// Dans le programme principal :\nVAR x, y : Entier\nDébut\n  x ← 5 ; y ← 10\n  Echanger(x, y)\n  Écrire(x, y)  // → 10  5\nFin" },
          ]
        },
      ]
    },
  ]
},

'algorithmes-avances': {
  id:'algorithmes-avances', emoji:'⚡', badge:'Algorithmique', color:'#4f6ef7',
  titre:'Algorithmes avancés',
  desc:"Tri par sélection O(n²), tri par insertion O(n²), recherche séquentielle O(n), recherche dichotomique O(log n), complexité algorithmique.",
  souschapitres:[
    {
      id:'sc-adv1', titre:'5.1 Tris — Sélection et Insertion',
      notions:['Tri sélection : trouver le min et le placer','Tri insertion : insérer à la bonne position','Complexité O(n²) pour les deux','Stable vs instable'],
      blocs:[
        {
          notion:'⚡ Algorithmes de tri',
          theoremes:[
            { id:'A-T1', type:'algo', nom:"Tri par sélection — O(n²)",
              enonce:"Principe : chercher le minimum dans TAB[i..n], le mettre en position i.\n\nPOUR i DE 1 A n-1 FAIRE\n  posMin ← i\n  POUR j DE i+1 A n FAIRE\n    SI TAB[j] < TAB[posMin] ALORS\n      posMin ← j\n    FIN SI\n  FIN POUR\n  Echanger(TAB[i], TAB[posMin])\nFIN POUR\n\nNb comparaisons : n(n-1)/2 → O(n²)" },
            { id:'A-T2', type:'algo', nom:"Tri par insertion — O(n²)",
              enonce:"Principe : insérer chaque élément à sa bonne position dans la partie déjà triée.\n\nPOUR i DE 2 A n FAIRE\n  cle ← TAB[i]\n  j ← i - 1\n  TANT QUE j >= 1 ET TAB[j] > cle FAIRE\n    TAB[j+1] ← TAB[j]\n    j ← j - 1\n  FIN TANT QUE\n  TAB[j+1] ← cle\nFIN POUR\n\nAvantage : efficace si tableau presque trié." },
          ],
          exercices:[
            { id:'EX-ADV1', niveau:'Intermédiaire', titre:"Déroulement tri sélection",
              enonce:"Dérouler le tri par sélection sur TAB = [5, 2, 8, 1, 4].",
              correction:"i=1 : min=1 (pos 4) → échange TAB[1] et TAB[4] → [1, 2, 8, 5, 4]\ni=2 : min=2 (pos 2) → pas d'échange → [1, 2, 8, 5, 4]\ni=3 : min=4 (pos 5) → échange TAB[3] et TAB[5] → [1, 2, 4, 5, 8]\ni=4 : min=5 (pos 4) → pas d'échange → [1, 2, 4, 5, 8]\nFinal : [1, 2, 4, 5, 8] ✓" },
          ]
        },
      ]
    },
    {
      id:'sc-adv2', titre:'5.2 Recherche et complexité',
      notions:['Recherche séquentielle : O(n)','Recherche dichotomique : O(log n) — tableau trié requis','O(1)<O(log n)<O(n)<O(n log n)<O(n²)','Dichotomie : g,d,m=(g+d) DIV 2'],
      blocs:[
        {
          notion:'🔍 Recherche et complexité',
          theoremes:[
            { id:'A-R1', type:'algo', nom:"Recherche dichotomique — O(log n)",
              enonce:"Prérequis : tableau TRIÉ en ordre croissant.\n\ng ← 1 ; d ← n ; trouve ← FAUX\nTANT QUE g <= d ET NON trouve FAIRE\n  m ← (g + d) DIV 2\n  SI TAB[m] = x ALORS\n    trouve ← VRAI\n  SINON SI x < TAB[m] ALORS\n    d ← m - 1\n  SINON\n    g ← m + 1\n  FIN SI\nFIN TANT QUE\nSI trouve ALORS Écrire('Trouvé en pos ', m)\nSINON Écrire('Non trouvé')\n\nNb max de comparaisons : log₂(n) + 1" },
            { id:'F-R1', type:'formule', nom:"Complexité algorithmique",
              enonce:"NOTATION O :\nO(1) : constant (accès direct tableau)\nO(log n) : dichotomique (exemple n=1000 → 10 étapes)\nO(n) : recherche séquentielle\nO(n log n) : tri rapide, fusion\nO(n²) : tris sélection, insertion, bulles\n\nORDRE : O(1) < O(log n) < O(n) < O(n log n) < O(n²)\n\nEXEMPLE n=1000 :\nDichotomique : ~10 comparaisons\nSéquentielle : ~500 comparaisons (moyenne)\nTri sélection : ~500 000 comparaisons",
              remarque:"En Bac, retenir : recherche dichotomique = O(log n) (beaucoup plus rapide pour grands tableaux), tris sélection/insertion = O(n²)." },
          ],
          exercices:[
            { id:'EX-ADV2', niveau:'Intermédiaire', titre:"Dichotomique sur [1,3,5,7,9,11] cherche 7",
              enonce:"Dérouler la recherche dichotomique de x=7 dans TAB=[1,3,5,7,9,11].",
              correction:"n=6, g=1, d=6\nÉtape 1 : m=(1+6) DIV 2=3, TAB[3]=5 < 7 → g=4\nÉtape 2 : m=(4+6) DIV 2=5, TAB[5]=9 > 7 → d=4\nÉtape 3 : m=(4+4) DIV 2=4, TAB[4]=7 = 7 → trouvé en pos 4 ✓\n3 comparaisons vs 4 séquentielles." },
          ]
        },
      ]
    },
  ]
},

'programmation-pascal-python': {
  id:'programmation-pascal-python', emoji:'💻', badge:'Programmation', color:'#60a5fa',
  titre:'Programmation Pascal / Python',
  desc:"Correspondances Algo↔Pascal↔Python, syntaxe complète des deux langages, transformation algorithme→code, fonctions et débogage.",
  souschapitres:[
    {
      id:'sc-pp1', titre:'6.1 Correspondances Algo / Pascal / Python',
      notions:['Déclaration : var (Pascal), = (Python)','IF/ELSE ; for/while dans les deux langages','begin/end vs indentation Python',':= affectation Pascal vs = Python'],
      blocs:[
        {
          notion:'💻 Syntaxe comparée',
          theoremes:[
            { id:'F-P1', type:'formule', nom:"Tableau comparatif Algo / Pascal / Python",
              enonce:"DÉCLARATION :\nAlgo  : VAR x : Entier\nPascal: var x: integer;\nPython: x = 0  (pas de déclaration explicite)\n\nAFFECTATION :\nAlgo  : x ← 5\nPascal: x := 5;\nPython: x = 5\n\nENTRÉE/SORTIE :\nAlgo  : Lire(x) / Écrire(x)\nPascal: readln(x); / writeln(x);\nPython: x = int(input()) / print(x)\n\nCONDITION :\nAlgo  : SI x>0 ALORS...FIN SI\nPascal: if x>0 then begin...end;\nPython: if x>0:\\n           ...\n\nBOUCLE POUR :\nAlgo  : POUR i DE 1 A n FAIRE\nPascal: for i:=1 to n do begin...end;\nPython: for i in range(1, n+1):" },
            { id:'F-P2', type:'formule', nom:"Syntaxe Pascal complète",
              enonce:"program MonProg;\nvar\n  x: integer;\n  s: string;\n  t: array[1..10] of integer;\nbegin\n  readln(x);\n  writeln('Valeur : ', x);\n  for i:=1 to 10 do begin\n    ...\n  end;\n  while cond do begin\n    ...\n  end;\n  repeat\n    ...\n  until cond;\nend.\n\nprocedure Echange(var a, b: integer);\nvar tmp: integer;\nbegin\n  tmp:=a; a:=b; b:=tmp;\nend;\n\nfunction Fact(n: integer): integer;\nbegin\n  if n=0 then Fact:=1\n  else Fact:=n*Fact(n-1);\nend;" },
            { id:'F-P3', type:'formule', nom:"Syntaxe Python complète",
              enonce:"x = int(input('Entrez x : '))\nprint('Valeur :', x)\n\n# Liste (tableau)\ntab = [1, 2, 3, 4, 5]\nlen(tab)         # longueur\ntab[0]           # premier élément (indice 0 !)\n\nfor i in range(1, 11):  # 1 à 10 inclus\n    print(i)\n\nwhile condition:\n    instructions\n\ndef ma_fonction(param):\n    return resultat\n\n# Chaîne\ns = 'Ahmed'\nlen(s)           # 5\ns[0]             # 'A'\ns[1:4]           # 'hme'\ns.upper()        # 'AHMED'\ns.find('me')     # 2",
              remarque:"⚠️ Python : indices commencent à 0 (tab[0] = premier). Algorithme : indices commencent à 1 (TAB[1] = premier). Attention lors de la traduction !" },
          ],
          exercices:[
            { id:'EX-P1', niveau:'Facile', titre:"Factorielle en Python",
              enonce:"Écrire la fonction factorielle(n) en Python.",
              correction:"def factorielle(n):\n    f = 1\n    for i in range(1, n+1):\n        f = f * i\n    return f\n\nprint(factorielle(5))  # → 120" },
            { id:'EX-P2', niveau:'Intermédiaire', titre:"Tri sélection en Pascal",
              enonce:"Implémenter le tri par sélection en Pascal pour n=5 entiers.",
              correction:"var tab: array[1..5] of integer;\n    i, j, posMin, tmp: integer;\nbegin\n  for i:=1 to 4 do begin\n    posMin := i;\n    for j:=i+1 to 5 do\n      if tab[j] < tab[posMin] then posMin := j;\n    tmp := tab[i];\n    tab[i] := tab[posMin];\n    tab[posMin] := tmp;\n  end;\nend." },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// BLOC 2 — BASES DE DONNÉES
// ══════════════════════════════════════════════════════════════════════

'concepts-base-bd': {
  id:'concepts-base-bd', emoji:'🗄️', badge:'Bases de données', color:'#8b5cf6',
  titre:'Concepts de base des bases de données',
  desc:"Définition BDD, table, enregistrement, champ, clé primaire, SGBD (MySQL, SQLite, Access), avantages sur les fichiers.",
  souschapitres:[
    {
      id:'sc-bd1', titre:'7.1 Tables, clés et SGBD',
      notions:['BDD : données structurées, partagées, sécurisées','Table = entité ; enregistrement = ligne ; champ = colonne','Clé primaire : UNIQUE et NOT NULL','SGBD : MySQL, SQLite, PostgreSQL, Access'],
      blocs:[
        {
          notion:'🗄️ Base de données relationnelle',
          theoremes:[
            { id:'D-BD1', type:'def', nom:"Base de données — définition et avantages",
              enonce:"BASE DE DONNÉES :\nEnsemble structuré de données organisées, partagées et sécurisées.\n\nAVANTAGES vs FICHIERS :\n• Partage multi-utilisateurs simultané\n• Intégrité et cohérence des données\n• Sécurité (droits d'accès différenciés)\n• Pas de redondance (normalisation)\n• Requêtes SQL puissantes\n• Indépendance données/applications" },
            { id:'D-BD2', type:'def', nom:"Table, enregistrement, champ, clé primaire",
              enonce:"TABLE : structure à 2 dimensions (lignes × colonnes)\n→ Représente une ENTITÉ du monde réel\n\nENREGISTREMENT (ligne) : données d'une occurrence\nCHAMP (colonne) : propriété de l'entité\nCELLULE : intersection ligne × colonne\n\nCLÉ PRIMAIRE :\n→ Identifie chaque enregistrement de façon UNIQUE\n→ Valeur obligatoire (NOT NULL)\n→ Non modifiable de préférence\n→ Souvent un entier auto-incrémenté (id)\n\nEXEMPLE :\nPRODUIT(id_produit, nom, prix, stock)\nClé primaire : id_produit\n(1, 'Stylo', 0.5, 200)\n(2, 'Cahier', 1.2, 150)\n\nSGBD populaires :\nMySQL/MariaDB, PostgreSQL (gratuit/open source)\nOracle, SQL Server (commercial)\nSQLite (embarqué), Microsoft Access (débutant)" },
          ],
          exercices:[
            { id:'EX-BD1', niveau:'Facile', titre:"Identifier les éléments",
              enonce:"PRODUIT(id_produit, nom, prix, stock). Identifier clé primaire, champs, enregistrements.",
              correction:"Clé primaire : id_produit\nChamps : nom, prix, stock\nExemple d'enregistrement : (1, 'Stylo', 0.5, 200)\nNb champs : 4 ; Nb enregistrements = nb de lignes de la table." },
          ]
        },
      ]
    },
  ]
},

'modelisation-relationnelle': {
  id:'modelisation-relationnelle', emoji:'🔗', badge:'Bases de données', color:'#8b5cf6',
  titre:'Modélisation relationnelle',
  desc:"Modèle Entité-Association (E/A), types de relations (1-1, 1-N, N-N), clé étrangère (#), intégrité référentielle, schéma relationnel.",
  souschapitres:[
    {
      id:'sc-mod1', titre:'8.1 Relations et schéma relationnel',
      notions:['1-N : clé étrangère côté N','N-N : table de jonction avec 2 clés étrangères','Clé étrangère # : référence clé primaire autre table','Intégrité référentielle : valeur # doit exister'],
      blocs:[
        {
          notion:'🔗 Modélisation relationnelle',
          theoremes:[
            { id:'D-M1', type:'def', nom:"Types de relations et clé étrangère",
              enonce:"RELATION 1-N (une classe a plusieurs élèves) :\n→ Clé étrangère dans la table côté N\nCLASSE(id_classe, niveau, section)\nELEVE(id_eleve, nom, age, id_classe#)\nid_classe# → fait référence à CLASSE.id_classe\n\nRELATION N-N (un élève suit plusieurs cours, un cours a plusieurs élèves) :\n→ Table de JONCTION avec deux clés étrangères\nELEVE(id_eleve, nom, age)\nCOURS(id_cours, intitule, prof)\nINSCRIPTION(id_eleve#, id_cours#, date, note)\n→ Clé primaire composite : (id_eleve, id_cours)\n\nRELATION 1-1 (personne a un passeport) :\n→ Clé étrangère dans l'une des deux tables\n\nINTÉGRITÉ RÉFÉRENTIELLE :\nToute valeur de clé étrangère # DOIT exister dans la table référencée.\n→ On ne peut pas ajouter un ELEVE avec id_classe=99 si la classe 99 n'existe pas.",
              remarque:"Notation : # indique une clé étrangère dans le schéma relationnel. En SQL, c'est FOREIGN KEY REFERENCES." },
          ],
          exercices:[
            { id:'EX-M1', niveau:'Intermédiaire', titre:"Bibliothèque — relation N-N",
              enonce:"Des membres empruntent des livres. Un membre peut emprunter plusieurs livres, un livre peut être emprunté par plusieurs membres. Écrire le schéma relationnel.",
              correction:"MEMBRE(id_membre, nom, prenom, email)\nLIVRE(id_livre, titre, auteur, isbn)\nEMPRUNT(id_emprunt, id_membre#, id_livre#, date_emprunt, date_retour)\n\nLa table EMPRUNT résout la relation N-N.\nid_membre# → MEMBRE.id_membre\nid_livre# → LIVRE.id_livre" },
          ]
        },
      ]
    },
  ]
},

'sql-requetes-simples': {
  id:'sql-requetes-simples', emoji:'🔍', badge:'Bases de données', color:'#8b5cf6',
  titre:'SQL — Requêtes simples',
  desc:"SELECT, FROM, WHERE, DISTINCT, BETWEEN, IN, LIKE (% et _), ordre des clauses.",
  souschapitres:[
    {
      id:'sc-sql1', titre:'9.1 SELECT, WHERE et opérateurs de filtrage',
      notions:['SELECT col FROM table','WHERE condition','DISTINCT : supprimer doublons','BETWEEN, IN, LIKE'],
      blocs:[
        {
          notion:'🔍 Requêtes SQL de sélection',
          theoremes:[
            { id:'S-1', type:'sql', nom:"SELECT, FROM, WHERE",
              enonce:"-- Sélectionner toutes les colonnes\nSELECT * FROM ELEVE;\n\n-- Sélectionner des colonnes précises\nSELECT nom, note FROM ELEVE;\n\n-- Supprimer les doublons\nSELECT DISTINCT section FROM ELEVE;\n\n-- Filtrer avec WHERE\nSELECT * FROM ELEVE WHERE age > 16;\nSELECT * FROM ELEVE\n  WHERE age > 16 AND note >= 10;\nSELECT * FROM ELEVE\n  WHERE section = 'Info' OR note > 18;" },
            { id:'S-2', type:'sql', nom:"BETWEEN, IN, LIKE",
              enonce:"-- BETWEEN (bornes INCLUSES)\nSELECT * FROM PRODUIT\n  WHERE prix BETWEEN 10 AND 50;\n\n-- IN (liste de valeurs)\nSELECT * FROM ELEVE\n  WHERE section IN ('Maths', 'Info', 'Sciences');\n\n-- LIKE (motif avec jokers)\n-- % = 0 ou plusieurs caractères\n-- _ = exactement 1 caractère\nSELECT * FROM ELEVE WHERE nom LIKE 'Ben%';\nSELECT * FROM ELEVE WHERE nom LIKE '%ali%';\nSELECT * FROM ELEVE WHERE nom LIKE '_hmed';",
              remarque:"LIKE n'est pas sensible à la casse dans certains SGBD. 'Ben%' trouve 'Ben', 'Bensalem', 'Benaissa'..." },
          ],
          exercices:[
            { id:'EX-SQL1', niveau:'Facile', titre:"Requête filtrée",
              enonce:"ELEVE(id, nom, age, note, section). Noms et notes des élèves de section 'Info' avec note >= 15.",
              correction:"SELECT nom, note\nFROM ELEVE\nWHERE section = 'Info' AND note >= 15;" },
            { id:'EX-SQL2', niveau:'Intermédiaire', titre:"Produits entre deux prix",
              enonce:"PRODUIT(id, nom, prix, stock). Produits dont le prix est entre 5 et 20 DT et dont le nom commence par 'A'.",
              correction:"SELECT *\nFROM PRODUIT\nWHERE prix BETWEEN 5 AND 20\n  AND nom LIKE 'A%';" },
          ]
        },
      ]
    },
  ]
},

'sql-requetes-avancees': {
  id:'sql-requetes-avancees', emoji:'📊', badge:'Bases de données', color:'#8b5cf6',
  titre:'SQL — Requêtes avancées',
  desc:"Fonctions d'agrégation (COUNT, SUM, AVG, MAX, MIN), ORDER BY, GROUP BY, HAVING, INNER JOIN, sous-requêtes.",
  souschapitres:[
    {
      id:'sc-sql2', titre:'10.1 Agrégation, tri, jointure',
      notions:['COUNT(*), SUM, AVG, MAX, MIN','ORDER BY col ASC/DESC','GROUP BY col + HAVING','INNER JOIN ON clé=clé'],
      blocs:[
        {
          notion:'📊 Requêtes avancées SQL',
          theoremes:[
            { id:'S-3', type:'sql', nom:"Fonctions d'agrégation et tri",
              enonce:"-- Fonctions d'agrégation\nSELECT COUNT(*) FROM ELEVE;        -- nb de lignes\nSELECT AVG(note) FROM ELEVE;       -- moyenne\nSELECT MAX(note), MIN(note) FROM ELEVE;\nSELECT SUM(montant) FROM COMMANDE;\n\n-- Tri\nSELECT * FROM ELEVE ORDER BY note DESC;\nSELECT * FROM ELEVE ORDER BY nom ASC;\n\n-- Combiné\nSELECT nom, note\nFROM ELEVE\nWHERE section = 'Info'\nORDER BY note DESC;" },
            { id:'S-4', type:'sql', nom:"GROUP BY et HAVING",
              enonce:"-- Moyenne par section\nSELECT section, AVG(note) AS moyenne\nFROM ELEVE\nGROUP BY section;\n\n-- Sections dont la moyenne > 12\nSELECT section, AVG(note) AS moyenne\nFROM ELEVE\nGROUP BY section\nHAVING AVG(note) > 12;\n\n-- Nb d'élèves par section\nSELECT section, COUNT(*) AS nb\nFROM ELEVE\nGROUP BY section\nORDER BY nb DESC;\n\n-- WHERE filtre les LIGNES (avant GROUP BY)\n-- HAVING filtre les GROUPES (après GROUP BY)" },
            { id:'S-5', type:'sql', nom:"INNER JOIN",
              enonce:"-- Afficher nom de l'élève et section de sa classe\nSELECT E.nom, C.section, C.niveau\nFROM ELEVE E\nINNER JOIN CLASSE C ON E.id_classe = C.id_classe;\n\n-- Jointure avec filtre\nSELECT E.nom, E.note, C.section\nFROM ELEVE E\nINNER JOIN CLASSE C ON E.id_classe = C.id_classe\nWHERE C.section = 'Info'\nORDER BY E.note DESC;",
              remarque:"INNER JOIN ne retourne que les lignes qui ont une correspondance dans les deux tables. Si un élève a id_classe=NULL, il n'apparaît pas dans le résultat." },
          ],
          exercices:[
            { id:'EX-SQL3', niveau:'Intermédiaire', titre:"Ventes par ville",
              enonce:"VENTE(id, ville, montant, date). Villes dont le total des ventes dépasse 10000, triées par total décroissant.",
              correction:"SELECT ville, SUM(montant) AS total\nFROM VENTE\nGROUP BY ville\nHAVING SUM(montant) > 10000\nORDER BY total DESC;" },
            { id:'EX-SQL4', niveau:'Difficile', titre:"Jointure 3 tables",
              enonce:"ELEVE(id_eleve, nom), INSCRIPTION(id_eleve#, id_cours#), COURS(id_cours, intitule). Noms des élèves inscrits au cours 'Informatique'.",
              correction:"SELECT E.nom\nFROM ELEVE E\nINNER JOIN INSCRIPTION I ON E.id_eleve = I.id_eleve\nINNER JOIN COURS C ON I.id_cours = C.id_cours\nWHERE C.intitule = 'Informatique';" },
          ]
        },
      ]
    },
  ]
},

'sql-manipulation': {
  id:'sql-manipulation', emoji:'✏️', badge:'Bases de données', color:'#8b5cf6',
  titre:'SQL — Manipulation de données',
  desc:"INSERT INTO (insertion), UPDATE SET WHERE (modification), DELETE FROM WHERE (suppression), CREATE TABLE (création), contraintes.",
  souschapitres:[
    {
      id:'sc-sql3', titre:'11.1 INSERT, UPDATE, DELETE, CREATE TABLE',
      notions:['INSERT INTO table (col) VALUES (val)','UPDATE table SET col=val WHERE cond','DELETE FROM table WHERE cond','CREATE TABLE avec types et contraintes'],
      blocs:[
        {
          notion:'✏️ Manipulation des données',
          theoremes:[
            { id:'S-6', type:'sql', nom:"INSERT, UPDATE, DELETE",
              enonce:"-- INSERTION\nINSERT INTO ELEVE (id, nom, age, note)\nVALUES (20, 'Sana', 16, 17);\n\n-- MODIFICATION\nUPDATE ELEVE\nSET note = note + 2\nWHERE section = 'Maths';\n\n⚠️ Sans WHERE : TOUTES les lignes sont modifiées !\n\n-- SUPPRESSION\nDELETE FROM ELEVE\nWHERE note < 5;\n\n⚠️ Sans WHERE : TOUTES les lignes sont supprimées !\nDELETE FROM ELEVE; ← vide toute la table !" },
            { id:'S-7', type:'sql', nom:"CREATE TABLE",
              enonce:"CREATE TABLE ELEVE (\n  id        INTEGER      PRIMARY KEY,\n  nom       VARCHAR(50)  NOT NULL,\n  prenom    VARCHAR(50)  NOT NULL,\n  age       INTEGER,\n  note      DECIMAL(4,2),\n  section   VARCHAR(20)  DEFAULT 'Info',\n  id_classe INTEGER      REFERENCES CLASSE(id_classe)\n);\n\nTYPES SQL courants :\nINTEGER / INT : entier\nVARCHAR(n) : chaîne variable (max n car)\nCHAR(n) : chaîne fixe\nDECIMAL(p,d) : décimal (p chiffres, d décimales)\nDATE : date (AAAA-MM-JJ)\nBOOLEAN : vrai/faux\n\nCONTRAINTES :\nPRIMARY KEY : clé primaire\nNOT NULL : valeur obligatoire\nUNIQUE : valeur unique\nDEFAULT val : valeur par défaut" },
          ],
          exercices:[
            { id:'EX-SQL5', niveau:'Facile', titre:"INSERT et UPDATE",
              enonce:"1) Insérer l'élève : id=25, nom='Farah', age=17, note=14, section='Info'\n2) Ajouter 1 point à tous les élèves de section 'Maths'",
              correction:"-- 1) Insertion\nINSERT INTO ELEVE (id, nom, age, note, section)\nVALUES (25, 'Farah', 17, 14, 'Info');\n\n-- 2) Mise à jour\nUPDATE ELEVE\nSET note = note + 1\nWHERE section = 'Maths';" },
          ]
        },
      ]
    },
  ]
},

'normalisation': {
  id:'normalisation', emoji:'⚙️', badge:'Bases de données', color:'#8b5cf6',
  titre:'Normalisation',
  desc:"Dépendances fonctionnelles (DF), 1ère Forme Normale (1FN), 2ème Forme Normale (2FN), 3ème Forme Normale (3FN) — éliminer redondance et anomalies.",
  souschapitres:[
    {
      id:'sc-norm1', titre:'12.1 Formes normales 1FN, 2FN, 3FN',
      notions:['DF : A→B (A détermine B)','1FN : attributs atomiques (une valeur/cellule)','2FN : 1FN + pas de dépendance partielle','3FN : 2FN + pas de dépendance transitive'],
      blocs:[
        {
          notion:'⚙️ Normalisation des BDD',
          theoremes:[
            { id:'D-N1', type:'def', nom:"Dépendances fonctionnelles et 3 formes normales",
              enonce:"DÉPENDANCE FONCTIONNELLE (DF) :\nA → B : connaître A permet de déterminer B\nExemple : id_client → nom_client, ville\n\n1FN — Première Forme Normale :\nTout attribut doit être ATOMIQUE\n(une seule valeur par cellule, pas de listes)\n\nVIOLATION : ELEVE(id, nom, cours_suivis)\ncours_suivis = 'Maths, Info, Anglais' → ✗\nSOLUTION : table séparée INSCRIPTION(id_eleve#, cours)\n\n2FN — Deuxième Forme Normale :\n1FN + tout attribut non-clé dépend de TOUTE la clé primaire\n(uniquement utile si clé primaire composite)\n\n3FN — Troisième Forme Normale :\n2FN + aucun attribut non-clé ne dépend d'un autre attribut non-clé\n(pas de dépendance TRANSITIVE)\n\nEXEMPLE de violation 3FN :\nCOMMANDE(id_cmd, id_client, nom_client, ville, montant)\nDF : id_client → nom_client, ville  (transitive !)\n\nSOLUTION :\nCOMMANDE(id_cmd, id_client#, montant)\nCLIENT(id_client, nom_client, ville)",
              remarque:"La normalisation évite les ANOMALIES : anomalie d'insertion (ne peut pas insérer sans données complètes), de modification (modifier en plusieurs endroits), de suppression (perte d'informations)." },
          ],
          exercices:[
            { id:'EX-N1', niveau:'Intermédiaire', titre:"Normaliser en 3FN",
              enonce:"COMMANDE(id_cmd, id_client, nom_client, ville_client, montant). Identifier les problèmes et normaliser en 3FN.",
              correction:"PROBLÈME : Dépendance transitive\nid_client → nom_client, ville_client (transitif via id_client)\n\nSi on modifie la ville d'un client, il faut modifier toutes ses commandes.\n\nNORMALISATION EN 3FN :\nCOMMANDE(id_cmd, id_client#, montant)\nCLIENT(id_client, nom_client, ville_client)\n\nMaintenant :\nChanger la ville = modifier 1 seule ligne dans CLIENT ✓" },
          ]
        },
      ]
    },
  ]
},

// ══════════════════════════════════════════════════════════════════════
// BLOC 3 — TIC
// ══════════════════════════════════════════════════════════════════════

'internet-reseaux': {
  id:'internet-reseaux', emoji:'🌐', badge:'TIC', color:'#06d6a0',
  titre:'Internet & Réseaux',
  desc:"LAN/WAN/Internet, modèle client-serveur, protocoles HTTP/HTTPS/TCP/IP/DNS/FTP, adressage IPv4, notion de routage.",
  souschapitres:[
    {
      id:'sc-net1', titre:'13.1 Types de réseaux et protocoles',
      notions:['LAN (local), WAN (étendu), Internet (mondial)','Client-serveur : navigateur → serveur','HTTP(80)/HTTPS(443), DNS, FTP, TCP/IP','IPv4 : 4 octets (ex: 192.168.1.15)'],
      blocs:[
        {
          notion:'🌐 Réseaux et protocoles Internet',
          theoremes:[
            { id:'D-NET1', type:'def', nom:"Types de réseaux et protocoles",
              enonce:"TYPES DE RÉSEAUX :\nLAN (Local Area Network) : réseau local (école, maison, entreprise)\nWAN (Wide Area Network) : réseau étendu (ville, pays)\nInternet : réseau mondial (interconnexion de WAN)\nIntranet : réseau privé d'entreprise (internet interne)\n\nMODÈLE CLIENT-SERVEUR :\nClient (navigateur) → envoie requête HTTP\nServeur web → retourne page HTML\n\nPROTOCOLES PRINCIPAUX :\nHTTP (port 80) : affichage pages web\nHTTPS (port 443) : HTTP + chiffrement TLS\nTCP/IP : protocole de base d'Internet\nDNS : traduit nom → adresse IP\n  (www.google.com → 142.250.75.46)\nFTP (port 21) : transfert de fichiers\n\nADRESSAGE IPv4 :\n4 octets en décimal : 192.168.1.15\nIP privée : 192.168.x.x (réseau local)\nIP publique : unique sur Internet\nMasque sous-réseau : 255.255.255.0" },
          ],
          exercices:[
            { id:'EX-NET1', niveau:'Facile', titre:"Rôle des protocoles",
              enonce:"À quoi servent HTTP, DNS, FTP, HTTPS ?",
              correction:"HTTP : afficher des pages web (non chiffré)\nHTTPS : afficher des pages web sécurisées (chiffrement TLS)\nDNS : traduire un nom de domaine (www.google.com) en adresse IP (142.250.75.46)\nFTP : transférer des fichiers entre ordinateurs" },
          ]
        },
      ]
    },
  ]
},

'web-html-css-js': {
  id:'web-html-css-js', emoji:'🖥️', badge:'TIC', color:'#06d6a0',
  titre:'Web — HTML / CSS / JavaScript',
  desc:"Structure HTML (balises, head/body), balises sémantiques, CSS (sélecteurs, propriétés, flexbox), JavaScript (variables, fonctions, DOM).",
  souschapitres:[
    {
      id:'sc-web1', titre:'14.1 HTML, CSS et JavaScript',
      notions:['<!DOCTYPE html>, <html>, <head>, <body>','Balises : h1-h6, p, a, img, ul, li, table','CSS : sélecteurs (tag .classe #id), couleurs, marges','JS : var/let, alert, getElementById, function'],
      blocs:[
        {
          notion:'🖥️ Technologies Web',
          theoremes:[
            { id:'F-W1', type:'formule', nom:"Structure HTML complète",
              enonce:"<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <title>Ma Page</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <header>\n    <h1>Titre principal</h1>\n    <nav><a href=\"index.html\">Accueil</a></nav>\n  </header>\n  <main>\n    <h2>Sous-titre</h2>\n    <p>Paragraphe de texte.</p>\n    <img src=\"photo.jpg\" alt=\"Description\">\n    <ul>\n      <li>Élément 1</li>\n      <li>Élément 2</li>\n    </ul>\n  </main>\n  <footer>Pied de page</footer>\n  <script src=\"script.js\"></script>\n</body>\n</html>" },
            { id:'F-W2', type:'formule', nom:"CSS essentiel",
              enonce:"/* SÉLECTEURS */\ntag { }          /* toutes les balises de ce type */\n.classe { }      /* éléments avec class=\"classe\" */\n#identifiant { } /* élément avec id=\"identifiant\" */\n\n/* PROPRIÉTÉS TEXTE */\ncolor: #4f6ef7;\nfont-size: 16px;\nfont-weight: bold;\ntext-align: center;\n\n/* MISE EN PAGE */\nbackground-color: #1a1a2e;\nmargin: 10px;    /* extérieur */\npadding: 15px;   /* intérieur */\nborder: 2px solid black;\nborder-radius: 8px;\nwidth: 100%; max-width: 800px;\n\n/* FLEXBOX */\ndisplay: flex;\njustify-content: center;\nalign-items: center;\ngap: 16px;" },
            { id:'F-W3', type:'formule', nom:"JavaScript bases",
              enonce:"// Variables\nlet nom = 'Ahmed';\nlet age = 17;\nlet actif = true;\n\n// Entrées/sorties\nalert('Message');\nconsole.log('Debug');\nlet saisie = prompt('Entrez votre nom :');\n\n// Manipulation du DOM\ndocument.getElementById('monId').innerHTML = 'Texte';\ndocument.getElementById('monId').style.color = 'red';\n\n// Fonctions\nfunction calculer() {\n  let a = parseInt(prompt('Nombre :'));\n  let carre = a * a;\n  document.getElementById('resultat').innerHTML = carre;\n}\n\n// Événements\n// <button onclick=\"calculer()\">Calculer</button>" },
          ],
          exercices:[
            { id:'EX-W1', niveau:'Intermédiaire', titre:"Page HTML complète",
              enonce:"Créer une page HTML avec : titre 'Mes Matières', liste de 3 matières, fond sombre (#1a1a2e), texte blanc.",
              correction:"<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Mes Matières</title>\n  <style>\n    body { background:#1a1a2e; color:white; font-family:Arial; }\n    h1 { color:#4f6ef7; }\n    li { margin:8px 0; color:#06d6a0; }\n  </style>\n</head>\n<body>\n  <h1>Mes Matières</h1>\n  <ul>\n    <li>Mathématiques</li>\n    <li>Informatique</li>\n    <li>Physique-Chimie</li>\n  </ul>\n</body>\n</html>" },
          ]
        },
      ]
    },
  ]
},

'systemes-informatiques': {
  id:'systemes-informatiques', emoji:'🖥️', badge:'TIC', color:'#06d6a0',
  titre:'Systèmes informatiques',
  desc:"Hardware (CPU, RAM, stockage, périphériques), Software (OS, applications), architecture Von Neumann, représentation binaire et conversions.",
  souschapitres:[
    {
      id:'sc-sys1', titre:'15.1 Hardware, Software et Von Neumann',
      notions:['CPU : processeur, GHz, cœurs','RAM : volatile rapide, SSD/HDD : permanent','OS : Windows, Linux, macOS','Von Neumann : UC + Mémoire + E/S + Bus'],
      blocs:[
        {
          notion:'🖥️ Architecture des systèmes',
          theoremes:[
            { id:'D-SYS1', type:'def', nom:"Hardware et Software",
              enonce:"HARDWARE (matériel) :\nCPU (processeur) : exécute les instructions\n  → Fréquence en GHz, nombre de cœurs\nRAM : mémoire vive VOLATILE (perdue à l'arrêt)\n  → Rapide (DDR4, DDR5), en Go\nSSD/HDD : stockage PERMANENT (persiste)\n  → SSD (flash, rapide), HDD (disque, moins cher)\nGPU : carte graphique (calculs massivement parallèles)\n\nPÉRIPHÉRIQUES :\nEntrée : clavier, souris, scanner, webcam, micro\nSortie : écran, imprimante, haut-parleur\nE/S : disque dur, clé USB, carte réseau\n\nSOFTWARE (logiciel) :\nSystème d'exploitation (OS) : Windows, Linux, macOS, Android\nLogiciels libres/open source : LibreOffice, Python, Firefox\nLogiciels propriétaires : Microsoft Office, Photoshop" },
            { id:'D-SYS2', type:'def', nom:"Architecture Von Neumann et binaire",
              enonce:"ARCHITECTURE VON NEUMANN :\n4 composants principaux :\n1. Unité Centrale (CPU) : UA + UAL\n2. Mémoire centrale (RAM) : programme + données\n3. Unités d'Entrée/Sortie\n4. Bus (transport données/adresses/commandes)\n\nCYCLE D'INSTRUCTION (Fetch-Decode-Execute) :\n1. Fetch : lire l'instruction en mémoire\n2. Decode : décoder l'instruction\n3. Execute : exécuter l'instruction\n\nSYSTÈME BINAIRE :\nBase 2 : chiffres 0 et 1\n1 bit = un chiffre binaire\n8 bits = 1 octet (byte)\n1 Ko = 1024 octets ; 1 Mo = 1024 Ko\n\nCONVERSION binaire → décimal :\n1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8+0+2+1 = 11₁₀" },
          ],
          exercices:[
            { id:'EX-SYS1', niveau:'Facile', titre:"Conversions binaire/décimal",
              enonce:"Convertir en décimal : 1011₂ et 11001₂",
              correction:"1011₂ = 8+0+2+1 = 11₁₀\n11001₂ = 16+8+0+0+1 = 25₁₀" },
            { id:'EX-SYS2', niveau:'Intermédiaire', titre:"Décimal vers binaire",
              enonce:"Convertir 13₁₀ et 25₁₀ en binaire.",
              correction:"13 ÷ 2 = 6 r 1\n6 ÷ 2 = 3 r 0\n3 ÷ 2 = 1 r 1\n1 ÷ 2 = 0 r 1\n→ 13₁₀ = 1101₂\n\n25 ÷ 2 = 12 r 1\n12 ÷ 2 = 6 r 0\n6 ÷ 2 = 3 r 0\n3 ÷ 2 = 1 r 1\n1 ÷ 2 = 0 r 1\n→ 25₁₀ = 11001₂ ✓" },
          ]
        },
      ]
    },
  ]
},

'securite-informatique': {
  id:'securite-informatique', emoji:'🔒', badge:'TIC', color:'#06d6a0',
  titre:'Sécurité informatique',
  desc:"Menaces (virus, ransomware, phishing, keylogger, DDoS), protections (antivirus, pare-feu, 2FA, HTTPS, sauvegarde), bonnes pratiques.",
  souschapitres:[
    {
      id:'sc-sec1', titre:'16.1 Menaces et protections',
      notions:['Virus, ransomware, phishing, spyware','Antivirus, pare-feu, 2FA','Mot de passe fort : 8+ car, maj, chiffres, symboles','HTTPS = HTTP + chiffrement TLS'],
      blocs:[
        {
          notion:'🔒 Sécurité et protection',
          theoremes:[
            { id:'D-SEC1', type:'def', nom:"Types de menaces informatiques",
              enonce:"VIRUS :\nLogiciel malveillant qui se reproduit et se propage\nS'attache à des fichiers légitimes\n\nRANSOMWARE :\nChiffre les données et demande une rançon\nExemple : WannaCry (2017) a touché 200 000 ordinateurs\n\nPHISHING (hameçonnage) :\nFaux email/site imitant une banque ou service connu\n→ Vol d'identifiants et données bancaires\n\nSPYWARE / KEYLOGGER :\nEnregistre les frappes clavier et captures d'écran\n→ Vole mots de passe et informations confidentielles\n\nDDoS (Distributed Denial of Service) :\nSurcharge un serveur avec millions de requêtes\n→ Rend le service indisponible\n\nINGÉNIERIE SOCIALE :\nManipulation psychologique pour obtenir des informations\n'Votre compte sera bloqué, cliquez ici...'" },
            { id:'D-SEC2', type:'def', nom:"Protections et bonnes pratiques",
              enonce:"ANTIVIRUS :\nDétecte, bloque et supprime les malwares\nMettre à jour régulièrement (nouvelles signatures)\n\nPARE-FEU (firewall) :\nFiltre les connexions réseau entrantes/sortantes\n→ Bloque les connexions suspectes\n\nMOT DE PASSE FORT :\n≥ 8 caractères, majuscules, chiffres, symboles\nDifférent pour chaque service\nGestionnaire de mots de passe recommandé\n\n2FA (Double authentification) :\nMot de passe + code SMS ou app\n→ Même si MDP volé, compte protégé\n\nHTTPS :\nHTTP + chiffrement TLS/SSL\nCadenas dans le navigateur\n→ Données chiffrées (mot de passe, CB)\n\nSAUVEGARDE (backup) :\nRègle 3-2-1 : 3 copies, 2 supports, 1 hors site\n→ Protection contre ransomware et pannes\n\nMISES À JOUR :\nCorrections des failles de sécurité (patch)\n→ Toujours mettre à jour OS et applications" },
          ],
          exercices:[
            { id:'EX-SEC1', niveau:'Facile', titre:"Identifier les attaques",
              enonce:"1) Email : 'Votre banque détecte une activité suspecte. Cliquez pour vérifier.'\n2) Tous vos fichiers sont chiffrés, payez 500€ en Bitcoin.\n3) Logiciel qui enregistre vos frappes clavier.",
              correction:"1) Phishing → Ne jamais cliquer, aller directement sur le site officiel de la banque.\n2) Ransomware → Avoir des sauvegardes hors ligne, ne pas payer.\n3) Keylogger (type spyware) → Antivirus, ne pas installer de logiciels suspects." },
            { id:'EX-SEC2', niveau:'Intermédiaire', titre:"Évaluer un mot de passe",
              enonce:"Comparer : '1234567', 'Ahmed2007', 'P@ss#2024!'. Lequel est le plus sécurisé ? Pourquoi ?",
              correction:"'1234567' : très faible (séquence, 7 car, que chiffres)\n'Ahmed2007' : faible (prénom + date de naissance, prévisible)\n'P@ss#2024!' : fort (10 car, maj, min, chiffre, symboles, non prévisible)\n\nBonnes pratiques : longueur > complexité, phrase secrète possible." },
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
      background:`${color}20`, color, whiteSpace:'nowrap', border:`1px solid ${color}30` }}>
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
export default function InfoSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'notions-base-algo'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>💻</div>
          <h2>Chapitre non trouvé</h2>
          <Link href="/bac/info/informatique" style={{ color:'#4f6ef7' }}>← Retour Informatique</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#4f6ef7'

  const GROUPS = [
    { label:'🧮 Bloc 1 — Algorithmique & Programmation',
      slugs:NAV_ORDER.slice(0,6) },
    { label:'🗄️ Bloc 2 — Bases de données',
      slugs:NAV_ORDER.slice(6,12) },
    { label:'🌐 Bloc 3 — TIC',
      slugs:NAV_ORDER.slice(12) },
  ]

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Bac</Link><span>›</span>
          <Link href="/bac/info" style={{ color:'var(--muted)', textDecoration:'none' }}>Informatique</Link><span>›</span>
          <Link href="/bac/info/informatique" style={{ color:'var(--muted)', textDecoration:'none' }}>Section Info</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{chapter.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 275px', gap:32, alignItems:'start' }}>

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
                  <span style={{ fontSize:11, background:'rgba(99,102,241,0.15)',
                    color:'#818cf8', padding:'2px 9px', borderRadius:10 }}>
                    {BLOC_LABEL[slug]} · Informatique · Tunisie
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Informatique Bac Tunisie')}&subject=informatique`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/examens"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📋 Exercices Bac
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
                              const isMono = ['formule','algo','sql'].includes(t.type)
                              return (
                                <div key={t.id} style={{ borderLeft:`3px solid ${color}`, background:`${color}07`,
                                  borderRadius:'0 12px 12px 0', padding:'14px 18px', border:`1px solid ${color}18` }}>
                                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start',
                                    marginBottom:8, gap:10, flexWrap:'wrap' }}>
                                    <div style={{ fontWeight:700, fontSize:13 }}>{t.nom}</div>
                                    <TypeBadge type={t.type} />
                                  </div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.85, whiteSpace:'pre-line',
                                    fontFamily:isMono?'var(--font-mono)':'inherit' }}>
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
                                      <Link href={`/solve?q=${encodeURIComponent('Informatique Bac Tunisie — '+ex.enonce)}&subject=informatique`}
                                        className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                        🤖 Résoudre avec IA
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
                                        <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75,
                                          whiteSpace:'pre-line', fontFamily:'var(--font-mono)' }}>{ex.correction}</div>
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
                  <Link href={`/bac/info/informatique/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/info/informatique/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  fontSize:11, color:'#818cf8', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(99,102,241,0.08)' }}>
                  💻 Informatique · 16 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'6px 15px 2px', fontSize:9, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac/info/informatique/${s}`} style={{ textDecoration:'none' }}>
                        <div style={{ padding:'7px 15px', borderBottom:'1px solid var(--border)',
                          background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                          borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                          transition:'all 0.15s', cursor:'pointer' }}
                          onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                          onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                          <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>
                            {TITRES_NAV[s].split(' — ')[0]}
                          </div>
                          <div style={{ fontSize:11, fontWeight:s===slug?700:400,
                            color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>
                            {TITRES_NAV[s].replace(/CH \d+ — /,'').slice(0,26)}
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
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' Informatique Bac Tunisie')}&subject=informatique`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Exercice Bac</Link>
                  <Link href="/bac/info/informatique" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                  <Link href="/bac/info" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📚 Autres matières Info</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer/>
      <style>{`
        @media(max-width:900px){
          div[style*="grid-template-columns: 1fr 275px"]{grid-template-columns:1fr!important;}
          aside{display:none;}
        }
      `}</style>
    </>
  )
}