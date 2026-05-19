'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// NSI TERMINALE — INFORMATIQUE FRANCE / [SLUG]
// Route : /bac-france/informatique/terminale/[slug]
// Spécialité NSI · 6h/semaine · Coef. 16 · Bac 2027
// 7 chapitres : Structures + Algo + BDD + POO + Archi + Enjeux + Projet
// ══════════════════════════════════════════════════════════════════════

const C = {
  def:'#06b6d4', notion:'#8b5cf6', algo:'#10b981',
  formule:'#f59e0b', methode:'#ec4899', prop:'#f97316'
}
const L: Record<string,string> = {
  def:'Définition', notion:'Notion clé', algo:'Algorithme',
  formule:'À retenir', methode:'Méthode', prop:'Propriété'
}

const NAV_ORDER = [
  'structures-donnees','algorithmes-avances','bases-donnees',
  'programmation-avancee','architecture-reseaux','enjeux-numerique','projet-nsi'
]

const TITRES_NAV: Record<string,string> = {
  'structures-donnees':    'D01 — Structures de données',
  'algorithmes-avances':   'D02 — Algorithmes avancés',
  'bases-donnees':         'D03 — Bases de données SQL',
  'programmation-avancee': 'D04 — Programmation avancée Python',
  'architecture-reseaux':  'D05 — Architecture, OS & Réseaux',
  'enjeux-numerique':      'D06 — Enjeux du numérique',
  'projet-nsi':            'D07 — Projet NSI',
}

const SEC_COLORS: Record<string,string> = {
  'structures-donnees':'#06b6d4','algorithmes-avances':'#8b5cf6',
  'bases-donnees':'#10b981','programmation-avancee':'#f59e0b',
  'architecture-reseaux':'#ef4444','enjeux-numerique':'#6366f1',
  'projet-nsi':'#f59e0b',
}

const BADGES: Record<string,string> = {
  'algorithmes-avances':'🔥 Top Bac',
  'bases-donnees':'🔥 Top Bac',
  'programmation-avancee':'🔥 Top Bac',
  'projet-nsi':'🔥 OBLIGATOIRE',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// D01 — STRUCTURES DE DONNÉES
// ─────────────────────────────────────────────────────────────────────
'structures-donnees': {
  id:'structures-donnees', emoji:'🌳', color:'#06b6d4',
  titre:'Structures de données',
  desc:"Piles (LIFO), files (FIFO), arbres binaires (parcours préfixe/infixe/postfixe), ABR, graphes orientés/non orientés, DFS et BFS en Python.",
  souschapitres:[
    {
      id:'sc-sd1', titre:'1.1 Piles et Files',
      notions:['Pile LIFO : push/pop (liste Python)','File FIFO : appendleft/pop (collections.deque)','Applications : Ctrl+Z, BFS, impression','Complexité O(1) pour push/pop'],
      blocs:[
        {
          notion:'📚 Piles (Stack) et Files (Queue)',
          theoremes:[
            { id:'D-SD1', type:'def', nom:'Pile (Stack) — LIFO',
              enonce:"LIFO = Last In, First Out (dernier entré, premier sorti)\n\nOpérations :\n• push : empiler (ajouter au sommet)\n• pop : dépiler (retirer du sommet)\n• peek : lire le sommet sans retirer\n• est_vide : tester si vide\n\nImplémentation Python (liste) :\npile = []\npile.append(5)   # push → [5]\npile.append(3)   # push → [5, 3]\nx = pile.pop()   # pop  → x=3, pile=[5]\n\nCOMPLEXITÉ : push et pop en O(1)\n\nAPPLICATIONS :\n• Ctrl+Z (undo/redo)\n• Appels de fonctions (call stack)\n• Vérification d'équilibre des parenthèses\n• Évaluation d'expressions",
              remarque:"La liste Python est naturellement une pile : append() = push, pop() = pop. Complexité O(1) amortie." },
            { id:'D-SD2', type:'def', nom:'File (Queue) — FIFO',
              enonce:"FIFO = First In, First Out (premier entré, premier sorti)\n\nOpérations :\n• enqueue : enfiler (ajouter en queue)\n• dequeue : défiler (retirer en tête)\n\nImplémentation Python (collections.deque) :\nfrom collections import deque\nfile = deque()\nfile.appendleft(5)   # enqueue → deque([5])\nfile.appendleft(3)   # enqueue → deque([3, 5])\nx = file.pop()       # dequeue → x=5, deque([3])\n\nCOMPLEXITÉ : O(1) pour appendleft et pop\n\nAPPLICATIONS :\n• File d'attente (print queue, CPU scheduling)\n• Parcours BFS de graphe\n• Traitement de messages (chat, serveur web)",
              remarque:"Toujours préférer collections.deque à la liste Python pour les files : insert(0, x) sur une liste est O(n) alors que appendleft sur deque est O(1)." },
          ],
          exercices:[
            { id:'EX-SD1', niveau:'Facile', titre:'Vérifier des parenthèses avec une pile',
              enonce:"Écrire parentheses_ok(expr) qui vérifie si les parenthèses, crochets et accolades sont équilibrés.\nEx: '(a+b)*(c-d)' → True | '((a+b)' → False | '([{}])' → True",
              correction:"def parentheses_ok(expr):\n    pile = []\n    ouvrants = '([{'\n    fermants = ')]}'\n    paires = {')':'(', ']':'[', '}':'{'}\n    \n    for c in expr:\n        if c in ouvrants:\n            pile.append(c)\n        elif c in fermants:\n            if not pile: return False\n            if pile[-1] != paires[c]: return False\n            pile.pop()\n    \n    return len(pile) == 0\n\nprint(parentheses_ok('(a+b)*(c-d)'))  # True\nprint(parentheses_ok('((a+b)'))        # False\nprint(parentheses_ok('([{}])'))        # True" },
          ]
        },
      ]
    },
    {
      id:'sc-sd2', titre:'1.2 Arbres binaires et ABR',
      notions:['Noeud : valeur + gauche + droit','Parcours préfixe/infixe/postfixe','ABR : gauche<racine<droit','Infixe d\'un ABR = liste triée'],
      blocs:[
        {
          notion:'🌳 Arbres binaires',
          theoremes:[
            { id:'D-SD3', type:'def', nom:'Arbre binaire — structure et parcours',
              enonce:"ARBRE BINAIRE :\nChaque noeud a : valeur + sous-arbre gauche + sous-arbre droit\nRacine : noeud sans parent\nFeuille : noeud sans enfant\nHauteur : longueur du plus long chemin racine→feuille\n\nImplementation Python :\nclass Noeud:\n    def __init__(self, val, g=None, d=None):\n        self.val = val\n        self.gauche = g\n        self.droit = d\n\nTROIS PARCOURS :\nPréfixe  : racine → gauche → droit  (copie, sérialisation)\nInfixe   : gauche → racine → droit  (tri pour ABR)\nPostfixe : gauche → droit → racine  (suppression, évaluation)\n\ndef parcours_infixe(noeud, res=None):\n    if res is None: res = []\n    if noeud:\n        parcours_infixe(noeud.gauche, res)\n        res.append(noeud.val)\n        parcours_infixe(noeud.droit, res)\n    return res" },
            { id:'N-SD1', type:'notion', nom:'Arbre Binaire de Recherche (ABR)',
              enonce:"PROPRIÉTÉ FONDAMENTALE :\nTout noeud gauche < racine < tout noeud droit (récursivement)\n\nRECHERCHE dans un ABR :\ndef recherche(noeud, val):\n    if noeud is None: return False\n    if noeud.val == val: return True\n    if val < noeud.val:\n        return recherche(noeud.gauche, val)\n    return recherche(noeud.droit, val)\n\nINSERTION :\ndef inserer(racine, val):\n    if racine is None: return Noeud(val)\n    if val < racine.val:\n        racine.gauche = inserer(racine.gauche, val)\n    else:\n        racine.droit = inserer(racine.droit, val)\n    return racine\n\nCOMPLEXITÉ :\nO(log n) si arbre équilibré\nO(n) si dégénéré (arbre = liste chaînée)\n\nPROPRIÉTÉ CLÉ : parcours infixe d'un ABR → liste triée !",
              remarque:"Un ABR dégénéré se forme si on insère dans l'ordre croissant ou décroissant. Les arbres AVL et arbres rouge-noir sont des ABR auto-équilibrés (hors programme NSI mais à connaître)." },
          ],
          exercices:[
            { id:'EX-SD2', niveau:'Intermédiaire', titre:'Parcours infixe d\'un ABR',
              enonce:"Construire l'ABR en insérant [5, 3, 7, 1, 4]. Écrire parcours_infixe et vérifier que le résultat est trié.",
              correction:"class Noeud:\n    def __init__(self, val):\n        self.val = val\n        self.gauche = None\n        self.droit = None\n\ndef inserer(racine, val):\n    if racine is None: return Noeud(val)\n    if val < racine.val:\n        racine.gauche = inserer(racine.gauche, val)\n    else:\n        racine.droit = inserer(racine.droit, val)\n    return racine\n\ndef parcours_infixe(noeud, res=None):\n    if res is None: res = []\n    if noeud:\n        parcours_infixe(noeud.gauche, res)\n        res.append(noeud.val)\n        parcours_infixe(noeud.droit, res)\n    return res\n\nracine = None\nfor v in [5, 3, 7, 1, 4]:\n    racine = inserer(racine, v)\n\nprint(parcours_infixe(racine))  # [1, 3, 4, 5, 7] ← trié !" },
          ]
        },
      ]
    },
    {
      id:'sc-sd3', titre:'1.3 Graphes — DFS et BFS',
      notions:['Graphe G=(V,E) : sommets + arêtes','Orienté/non orienté, pondéré','DFS : pile ou récursion (profondeur)','BFS : file → plus court chemin non pondéré'],
      blocs:[
        {
          notion:'🕸️ Graphes et parcours',
          theoremes:[
            { id:'D-SD4', type:'def', nom:'Graphe — représentation et parcours',
              enonce:"GRAPHE G = (V, E) :\nV = sommets (vertices)\nE = arêtes (edges)\nOrienté : arêtes avec direction (→)\nNon orienté : arêtes bidirectionnelles\nPondéré : arêtes avec poids\n\nREPRÉSENTATION (liste d'adjacence) :\ng = {\n  'A': ['B', 'C'],\n  'B': ['D'],\n  'C': ['D', 'E'],\n  'D': ['F'],\n  'E': ['F'],\n  'F': []\n}\n\nDFS (Depth-First Search — Profondeur) :\ndef dfs(g, debut, visite=None):\n    if visite is None: visite = set()\n    visite.add(debut)\n    for v in g[debut]:\n        if v not in visite:\n            dfs(g, v, visite)\n    return visite\n\nBFS (Breadth-First Search — Largeur) :\nfrom collections import deque\ndef bfs(g, debut):\n    file = deque([debut])\n    visite = {debut}\n    while file:\n        s = file.pop()\n        for v in g[s]:\n            if v not in visite:\n                visite.add(v)\n                file.appendleft(v)\n    return visite",
              remarque:"BFS garantit le plus court chemin (en nombre d'arêtes) dans un graphe non pondéré. DFS est plus adapté à la détection de cycles et à la recherche exhaustive." },
          ],
          exercices:[
            { id:'EX-SD3', niveau:'Difficile', titre:'BFS — Plus court chemin',
              enonce:"Graphe : {'A':['B','C'], 'B':['D'], 'C':['D','E'], 'D':['F'], 'E':['F'], 'F':[]}\nTrouver le plus court chemin de A à F avec BFS.",
              correction:"from collections import deque\n\ndef bfs_chemin(g, debut, fin):\n    file = deque([[debut]])\n    visite = {debut}\n    \n    while file:\n        chemin = file.pop()\n        noeud = chemin[-1]\n        \n        if noeud == fin:\n            return chemin\n        \n        for voisin in g[noeud]:\n            if voisin not in visite:\n                visite.add(voisin)\n                file.appendleft(chemin + [voisin])\n    \n    return None\n\ng = {'A':['B','C'],'B':['D'],'C':['D','E'],'D':['F'],'E':['F'],'F':[]}\nprint(bfs_chemin(g, 'A', 'F'))\n# ['A', 'C', 'E', 'F'] ou ['A', 'B', 'D', 'F'] (longueur 4)\n# BFS garantit la longueur minimale." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// D02 — ALGORITHMES AVANCÉS
// ─────────────────────────────────────────────────────────────────────
'algorithmes-avances': {
  id:'algorithmes-avances', emoji:'🧮', color:'#8b5cf6',
  titre:'Algorithmes avancés',
  desc:"Complexité Big-O, tri fusion O(n log n), quicksort O(n log n) moyen, algorithme de Dijkstra (plus court chemin pondéré).",
  souschapitres:[
    {
      id:'sc-algo1', titre:'2.1 Complexité Big-O et tris avancés',
      notions:['O(1) O(log n) O(n) O(n log n) O(n²)','Tri fusion : diviser pour régner, stable','Quicksort : pivot, O(n log n) moyen O(n²) pire','Tri fusion préféré pour données liées'],
      blocs:[
        {
          notion:'⚡ Complexité et tris',
          theoremes:[
            { id:'F-A1', type:'formule', nom:'Notation Big-O — complexités essentielles',
              enonce:"O(1)       : constant   — accès tableau par indice\nO(log n)   : logarith.  — dichotomie, ABR équilibré\nO(n)       : linéaire   — parcours liste\nO(n log n) : quasi-lin. — tri fusion, quicksort (moy.)\nO(n²)      : quadr.     — tri sélection/insertion\n\nCOMPARAISON pour n = 1 000 000 :\nO(1)       → 1 opération\nO(log n)   → 20 opérations\nO(n)       → 1 000 000\nO(n log n) → 20 000 000\nO(n²)      → 10¹² (inutilisable !)\n\nRègle : préférer O(n log n) à O(n²) dès n > 1000." },
            { id:'A-T1', type:'algo', nom:'Tri fusion (Merge Sort) — O(n log n)',
              enonce:"Paradigme : DIVISER POUR RÉGNER\nComplexité : O(n log n) garanti (pire ET meilleur cas)\nMémoire : O(n) supplémentaire\nStable : ✓ (préserve l'ordre des éléments égaux)\n\ndef tri_fusion(lst):\n    if len(lst) <= 1:\n        return lst\n    m = len(lst) // 2\n    g = tri_fusion(lst[:m])\n    d = tri_fusion(lst[m:])\n    return fusionner(g, d)\n\ndef fusionner(g, d):\n    res = []\n    i = j = 0\n    while i < len(g) and j < len(d):\n        if g[i] <= d[j]:\n            res.append(g[i]); i += 1\n        else:\n            res.append(d[j]); j += 1\n    return res + g[i:] + d[j:]\n\nprint(tri_fusion([38, 27, 43, 3]))  # [3, 27, 38, 43]",
              remarque:"Tri fusion est STABLE : idéal pour trier par plusieurs critères (ex: trier par nom puis par note — les égalités de note conservent l'ordre alphabétique)." },
            { id:'A-T2', type:'algo', nom:'Tri rapide (Quicksort) — O(n log n) moy.',
              enonce:"Paradigme : DIVISER POUR RÉGNER\nComplexité : O(n log n) moyen, O(n²) pire cas\nMémoire : O(log n) (récursion)\nPas stable mais très efficace en pratique\n\ndef quicksort(lst):\n    if len(lst) <= 1:\n        return lst\n    pivot = lst[len(lst) // 2]\n    gauche = [x for x in lst if x < pivot]\n    milieu = [x for x in lst if x == pivot]\n    droite = [x for x in lst if x > pivot]\n    return quicksort(gauche) + milieu + quicksort(droite)\n\nprint(quicksort([3, 6, 8, 10, 1, 2, 1]))  # [1, 1, 2, 3, 6, 8, 10]\n\nCHOIX DU PIVOT :\nPivot = milieu : bonne heuristique\nPivot aléatoire : évite le pire cas en pratique\nPire cas : liste déjà triée avec pivot=premier" },
          ],
          exercices:[
            { id:'EX-A1', niveau:'Facile', titre:'Trace du tri fusion',
              enonce:"Tracer le tri fusion de [38, 27, 43, 3, 9, 82]. Montrer les divisions et les fusions.",
              correction:"DIVISIONS :\n[38, 27, 43, 3, 9, 82]\n  [38, 27, 43]    |    [3, 9, 82]\n  [38] [27, 43]   |   [3] [9, 82]\n       [27] [43]  |       [9] [82]\n\nFUSIONS (remontée) :\n[27]+[43] → [27, 43]\n[38]+[27, 43] → [27, 38, 43]\n[9]+[82] → [9, 82]\n[3]+[9, 82] → [3, 9, 82]\n\nFUSION FINALE :\n[27, 38, 43] + [3, 9, 82] → [3, 9, 27, 38, 43, 82]" },
            { id:'EX-A2', niveau:'Intermédiaire', titre:'Comparer les complexités',
              enonce:"Pour trier n=10 000 éléments, combien d'opérations pour : tri insertion O(n²) vs tri fusion O(n log n) ? Ratio ?",
              correction:"n = 10 000\n\nTri insertion O(n²) :\nn² = 10 000² = 100 000 000 = 10⁸ opérations\n\nTri fusion O(n log n) :\nn × log₂(n) = 10 000 × log₂(10 000)\n≈ 10 000 × 13,3 ≈ 133 000 opérations\n\nRatio : 10⁸ / 133 000 ≈ 750× plus lent !\n\nConclusion : pour n=10 000, tri fusion est 750 fois\nplus rapide que tri insertion. Ce ratio explose avec n." },
          ]
        },
      ]
    },
    {
      id:'sc-algo2', titre:'2.2 Algorithme de Dijkstra',
      notions:['Plus court chemin dans graphe pondéré','d[début]=0 ; d[autres]=+∞','File de priorité (min-heap)','Relaxation : d[v]=min(d[v], d[s]+poids)'],
      blocs:[
        {
          notion:'🗺️ Dijkstra — Plus court chemin',
          theoremes:[
            { id:'N-A1', type:'notion', nom:'Algorithme de Dijkstra — principe',
              enonce:"OBJECTIF : plus court chemin dans un graphe PONDÉRÉ (poids positifs)\n\nPRINCIPE :\n1. Initialiser : d[début]=0, d[autres]=+∞\n2. File de priorité (min-heap) avec (distance, sommet)\n3. Extraire le sommet s de distance minimale\n4. RELAXATION pour chaque voisin v de s :\n   si d[s] + poids(s,v) < d[v] :\n       d[v] = d[s] + poids(s,v)\n       mettre à jour la file\n5. Répéter jusqu'à avoir traité tous les sommets\n\nimport heapq\ndef dijkstra(g, debut):\n    d = {s: float('inf') for s in g}\n    d[debut] = 0\n    file = [(0, debut)]\n    while file:\n        dist, s = heapq.heappop(file)\n        for v, poids in g[s]:\n            if d[s] + poids < d[v]:\n                d[v] = d[s] + poids\n                heapq.heappush(file, (d[v], v))\n    return d\n\nCOMPLEXITÉ : O((V+E) log V) avec file de priorité\nAPPLICATIONS : GPS, routage réseau, jeux vidéo",
              remarque:"Dijkstra ne fonctionne PAS avec des poids négatifs (utiliser Bellman-Ford dans ce cas). Pour NSI : connaître le principe et la relaxation suffit." },
          ],
          exercices:[
            { id:'EX-A3', niveau:'Difficile', titre:'Quicksort en place',
              enonce:"Implémenter quicksort en place (sans créer de nouvelles listes) avec partition par échanges.",
              correction:"def quicksort_inplace(lst, g=None, d=None):\n    if g is None: g = 0\n    if d is None: d = len(lst) - 1\n    if g < d:\n        pivot_idx = partition(lst, g, d)\n        quicksort_inplace(lst, g, pivot_idx - 1)\n        quicksort_inplace(lst, pivot_idx + 1, d)\n    return lst\n\ndef partition(lst, g, d):\n    pivot = lst[d]\n    i = g - 1\n    for j in range(g, d):\n        if lst[j] <= pivot:\n            i += 1\n            lst[i], lst[j] = lst[j], lst[i]\n    lst[i+1], lst[d] = lst[d], lst[i+1]\n    return i + 1\n\nlst = [10, 7, 8, 9, 1, 5]\nquicksort_inplace(lst)\nprint(lst)  # [1, 5, 7, 8, 9, 10]" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// D03 — BASES DE DONNÉES SQL
// ─────────────────────────────────────────────────────────────────────
'bases-donnees': {
  id:'bases-donnees', emoji:'🗄️', color:'#10b981',
  titre:'Bases de données SQL',
  desc:"Modèle relationnel (table, clé primaire, clé étrangère), SELECT complet, INNER JOIN / LEFT JOIN, GROUP BY / HAVING, sous-requêtes, normalisation 3NF.",
  souschapitres:[
    {
      id:'sc-bd1', titre:'3.1 Modèle relationnel et SELECT',
      notions:['Table, attribut, PK, FK, intégrité référentielle','SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT','LIKE, IN, BETWEEN, IS NULL','COUNT, SUM, AVG, MAX, MIN'],
      blocs:[
        {
          notion:'🗄️ SQL — Sélection et filtrage',
          theoremes:[
            { id:'D-BD1', type:'def', nom:'Modèle relationnel',
              enonce:"TABLE (relation) : lignes (tuples) × colonnes (attributs)\nClé primaire (PK) : identifie uniquement chaque ligne\nClé étrangère (FK) : référence vers PK d'une autre table\n\nEXEMPLE :\nELEVES(id PK, nom, classe_id FK→CLASSES.id)\nCLASSES(id PK, nom, niveau)\nNOTES(id PK, eleve_id FK, matiere, note)\n\nIntégrité référentielle :\nFK doit pointer vers PK existante (sinon erreur)\n\nCRÉATION :\nCREATE TABLE eleves (\n  id INTEGER PRIMARY KEY,\n  nom TEXT NOT NULL,\n  classe_id INTEGER REFERENCES classes(id)\n);" },
            { id:'N-BD1', type:'notion', nom:'SQL — SELECT complet',
              enonce:"SYNTAXE COMPLÈTE :\nSELECT col1, col2, COUNT(*) AS nb\nFROM table\nWHERE condition\nGROUP BY col\nHAVING condition_agregat\nORDER BY col ASC/DESC\nLIMIT n;\n\nOPÉRATEURS WHERE :\n=, !=, <, >, <=, >=\nLIKE '%motif%'   → contient 'motif'\nLIKE 'A%'       → commence par A\nIN (v1, v2)      → dans la liste\nBETWEEN 10 AND 20 → entre 10 et 20\nIS NULL / IS NOT NULL\nAND / OR / NOT\n\nAGRÉGATION :\nCOUNT(*) SUM(col) AVG(col) MAX(col) MIN(col)\n\nNOTE : WHERE filtre avant agrégation\n        HAVING filtre après agrégation" },
          ],
          exercices:[
            { id:'EX-BD1', niveau:'Facile', titre:'Requêtes SELECT',
              enonce:"Table FILMS(id, titre, annee, genre, note).\nÉcrire les requêtes SQL pour :\n1. Tous les films de genre 'Action'\n2. Films de 2020+, triés par note décroissante\n3. Nombre de films par genre",
              correction:"-- 1. Films Action\nSELECT *\nFROM films\nWHERE genre = 'Action';\n\n-- 2. Films récents triés\nSELECT titre, annee, note\nFROM films\nWHERE annee >= 2020\nORDER BY note DESC;\n\n-- 3. Comptage par genre\nSELECT genre, COUNT(*) AS nombre\nFROM films\nGROUP BY genre\nORDER BY nombre DESC;" },
          ]
        },
      ]
    },
    {
      id:'sc-bd2', titre:'3.2 Jointures, sous-requêtes et normalisation',
      notions:['INNER JOIN : lignes communes','LEFT JOIN : toutes lignes de gauche + NULL','Sous-requête : SELECT dans WHERE/FROM','3NF : éliminer dépendances transitives'],
      blocs:[
        {
          notion:'🔗 Jointures et normalisation',
          theoremes:[
            { id:'N-BD2', type:'notion', nom:'SQL — Jointures INNER et LEFT',
              enonce:"INNER JOIN (intersection) :\nSELECT e.nom, n.note\nFROM eleves e\nINNER JOIN notes n ON e.id = n.eleve_id\nWHERE n.matiere = 'NSI';\n→ Seulement les élèves ayant une note NSI\n\nLEFT JOIN (tous + NULL) :\nSELECT e.nom, n.note\nFROM eleves e\nLEFT JOIN notes n ON e.id = n.eleve_id;\n→ TOUS les élèves, note=NULL si pas de note\n\nJOINTURE TRIPLE :\nSELECT e.nom, c.nom AS classe, AVG(n.note) AS moy\nFROM eleves e\nJOIN classes c ON e.classe_id = c.id\nJOIN notes n ON e.id = n.eleve_id\nGROUP BY e.id, e.nom, c.nom\nHAVING AVG(n.note) > 12;" },
            { id:'N-BD3', type:'notion', nom:'Normalisation — 1NF, 2NF, 3NF',
              enonce:"OBJECTIF : éliminer la redondance et les anomalies\n\n1NF : attributs ATOMIQUES (une valeur par cellule)\n✗ telephone = '123,456,789'\n✓ Créer table TEL(id_personne, numero)\n\n2NF : pas de dépendance PARTIELLE à la clé\n(uniquement pour clés composites)\n\n3NF : pas de dépendance TRANSITIVE\nA→B et B→C (B non clé) → violation 3NF\n\nEXEMPLE VIOLATION 3NF :\nCOMMANDES(cmd_id, client_id, client_nom, client_ville)\nclient_ville dépend de client_id (pas de cmd_id !)\n\nSOLUTION :\nCOMMANDES(cmd_id, client_id#, montant)\nCLIENTS(client_id, client_nom, client_ville)" },
          ],
          exercices:[
            { id:'EX-BD2', niveau:'Intermédiaire', titre:'Jointures SQL',
              enonce:"Tables ELEVES(id,nom,classe), NOTES(id,eleve_id,matiere,note).\n1. Nom, matière et note de chaque élève\n2. Élèves avec note NSI > 15\n3. Moyenne NSI par classe",
              correction:"-- 1. Nom, matière, note\nSELECT e.nom, n.matiere, n.note\nFROM eleves e\nINNER JOIN notes n ON e.id = n.eleve_id\nORDER BY e.nom;\n\n-- 2. NSI > 15\nSELECT e.nom, n.note\nFROM eleves e\nINNER JOIN notes n ON e.id = n.eleve_id\nWHERE n.matiere = 'NSI' AND n.note > 15\nORDER BY n.note DESC;\n\n-- 3. Moyenne par classe\nSELECT e.classe, AVG(n.note) AS moy_nsi\nFROM eleves e\nINNER JOIN notes n ON e.id = n.eleve_id\nWHERE n.matiere = 'NSI'\nGROUP BY e.classe\nORDER BY moy_nsi DESC;" },
            { id:'EX-BD3', niveau:'Difficile', titre:'Normalisation 3NF',
              enonce:"Table COMMANDES(cmd_id, client_id, client_nom, client_ville, produit_id, produit_nom, produit_prix, quantite).\nIdentifier les violations 3NF et proposer un schéma normalisé.",
              correction:"VIOLATIONS 3NF :\n1. client_nom, client_ville → dépendent de client_id\n2. produit_nom, produit_prix → dépendent de produit_id\n\nSCHÉMA NORMALISÉ :\n\nCLIENTS(client_id PK, client_nom, client_ville)\n\nPRODUITS(produit_id PK, produit_nom, produit_prix)\n\nCOMMANDES(cmd_id PK, client_id FK, date)\n\nLIGNES_COMMANDE(\n  id PK,\n  cmd_id FK→COMMANDES,\n  produit_id FK→PRODUITS,\n  quantite\n)\n\nAvantages :\n→ Modifier client ou produit : 1 seul endroit\n→ Pas de redondance → pas d'anomalies" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// D04 — PROGRAMMATION AVANCÉE PYTHON
// ─────────────────────────────────────────────────────────────────────
'programmation-avancee': {
  id:'programmation-avancee', emoji:'🐍', color:'#f59e0b',
  titre:'Programmation avancée Python',
  desc:"Récursivité (cas de base + cas récursif), POO : classes, __init__, méthodes, encapsulation (@property), héritage (super()), polymorphisme.",
  souschapitres:[
    {
      id:'sc-py1', titre:'4.1 Récursivité',
      notions:['Cas de base obligatoire (arrêt)','Cas récursif : appel avec paramètre réduit','Factorielle, Fibonacci, PGCD, Hanoï','Stack overflow si récursion trop profonde'],
      blocs:[
        {
          notion:'🔄 Récursivité',
          theoremes:[
            { id:'D-PY1', type:'def', nom:'Fonctions récursives',
              enonce:"Fonction récursive = qui s'appelle elle-même.\n\nRÈGLES OBLIGATOIRES :\n1. Cas de BASE : condition d'arrêt (sans elle → récursion infinie)\n2. Cas RÉCURSIF : appel avec paramètre STRICTEMENT plus petit\n\nEXEMPLES CLASSIQUES :\n\n# Factorielle\ndef fact(n):\n    if n == 0: return 1      # cas de base\n    return n * fact(n - 1)   # cas récursif\n\n# Fibonacci\ndef fib(n):\n    if n <= 1: return n      # cas de base\n    return fib(n-1) + fib(n-2)\n\n# PGCD (Euclide)\ndef pgcd(a, b):\n    if b == 0: return a      # cas de base\n    return pgcd(b, a % b)    # cas récursif\n\nLIMITE Python : sys.getrecursionlimit() = 1000 par défaut",
              remarque:"Fibonacci récursif naïf est O(2ⁿ) car il recalcule les mêmes valeurs. Utiliser la mémoïsation (@functools.lru_cache) ou la version itérative pour les grands n." },
          ],
          exercices:[
            { id:'EX-PY1', niveau:'Facile', titre:'Puissance récursive',
              enonce:"Écrire puissance(base, exp) récursive calculant base^exp.\nCas de base : exp==0.\nTester avec puissance(2,10).",
              correction:"def puissance(base, exp):\n    if exp == 0:         # cas de base\n        return 1\n    return base * puissance(base, exp - 1)  # cas récursif\n\nprint(puissance(2, 10))  # 1024\nprint(puissance(3, 4))   # 81\nprint(puissance(5, 0))   # 1\n\n# Version optimisée O(log n) :\ndef puissance_rapide(base, exp):\n    if exp == 0: return 1\n    if exp % 2 == 0:\n        moitie = puissance_rapide(base, exp // 2)\n        return moitie * moitie\n    return base * puissance_rapide(base, exp - 1)" },
          ]
        },
      ]
    },
    {
      id:'sc-py2', titre:'4.2 Programmation Orientée Objet (POO)',
      notions:['class, __init__, self','Encapsulation : _attr, @property','Héritage : class Fils(Parent), super()','Polymorphisme : redéfinir méthodes'],
      blocs:[
        {
          notion:'🏗️ Classes et POO',
          theoremes:[
            { id:'D-PY2', type:'def', nom:'Classes et objets',
              enonce:"class Vehicule:\n    nb_roues_defaut = 4      # attribut de classe\n    \n    def __init__(self, marque, vmax):\n        self.marque = marque    # attribut d'instance\n        self.vitesse_max = vmax\n        self.vitesse = 0\n    \n    def accelerer(self, delta):\n        self.vitesse = min(self.vitesse + delta, self.vitesse_max)\n    \n    def freiner(self, delta):\n        self.vitesse = max(0, self.vitesse - delta)\n    \n    def __str__(self):\n        return f'{self.marque} ({self.vitesse} km/h)'\n\n# Instanciation et utilisation\nv = Vehicule('Toyota', 180)\nv.accelerer(50)\nprint(v)   # Toyota (50 km/h)\nprint(v.marque)        # Toyota\nprint(v.vitesse_max)   # 180" },
            { id:'N-PY1', type:'notion', nom:'Héritage et polymorphisme',
              enonce:"class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n    def parler(self):\n        return '...'\n    def __str__(self):\n        return f'{self.nom}: {self.parler()}'\n\nclass Chien(Animal):\n    def parler(self):       # POLYMORPHISME\n        return 'Ouaf !'\n\nclass Chat(Animal):\n    def parler(self):\n        return 'Miaou !'\n\n# Héritage avec super()\nclass ChienDresse(Chien):\n    def __init__(self, nom, maitre):\n        super().__init__(nom)   # appel constructeur parent\n        self.maitre = maitre\n    \n    def parler(self):\n        return f'Ouaf ! Je suis à {self.maitre}'\n\n# Polymorphisme en action\nanimaux = [Chien('Rex'), Chat('Mimi'), ChienDresse('Fido', 'Alice')]\nfor a in animaux:\n    print(a)  # chaque animal parle différemment" },
            { id:'M-PY1', type:'methode', nom:'Encapsulation — @property',
              enonce:"class Temperature:\n    def __init__(self, celsius):\n        self._celsius = celsius  # _attr : 'protégé'\n    \n    @property\n    def celsius(self):           # getter\n        return self._celsius\n    \n    @celsius.setter\n    def celsius(self, val):      # setter avec validation\n        if val < -273.15:\n            raise ValueError('Température impossible !')\n        self._celsius = val\n    \n    @property\n    def fahrenheit(self):        # propriété calculée\n        return self._celsius * 9/5 + 32\n\nt = Temperature(20)\nprint(t.celsius)      # 20\nprint(t.fahrenheit)   # 68.0\nt.celsius = -274      # → ValueError" },
          ],
          exercices:[
            { id:'EX-PY2', niveau:'Intermédiaire', titre:'Classe Pile POO',
              enonce:"Implémenter une classe Pile avec : empiler(), dépiler(), sommet(), est_vide(), __str__().",
              correction:"class Pile:\n    def __init__(self):\n        self._data = []\n    \n    def empiler(self, val):\n        self._data.append(val)\n    \n    def depiler(self):\n        if self.est_vide():\n            raise IndexError('Pile vide')\n        return self._data.pop()\n    \n    def sommet(self):\n        if self.est_vide():\n            raise IndexError('Pile vide')\n        return self._data[-1]\n    \n    def est_vide(self):\n        return len(self._data) == 0\n    \n    def __str__(self):\n        return f'Pile{self._data} ← sommet'\n\np = Pile()\np.empiler(5)\np.empiler(3)\np.empiler(8)\nprint(p)           # Pile[5, 3, 8] ← sommet\nprint(p.sommet())  # 8\nprint(p.depiler()) # 8\nprint(p)           # Pile[5, 3] ← sommet" },
            { id:'EX-PY3', niveau:'Difficile', titre:'Héritage — Formes géométriques',
              enonce:"Créer : Forme (abstraite), Rectangle(larg, haut), Cercle(rayon), Carre(côte) hérite de Rectangle.\nChacune implémente perimetre(), aire(), __str__().",
              correction:"import math\n\nclass Forme:\n    def perimetre(self): raise NotImplementedError\n    def aire(self): raise NotImplementedError\n    def __str__(self):\n        return f'{type(self).__name__}: P={self.perimetre():.2f}, A={self.aire():.2f}'\n\nclass Rectangle(Forme):\n    def __init__(self, larg, haut):\n        self.larg = larg\n        self.haut = haut\n    def perimetre(self): return 2*(self.larg+self.haut)\n    def aire(self): return self.larg*self.haut\n\nclass Cercle(Forme):\n    def __init__(self, rayon):\n        self.rayon = rayon\n    def perimetre(self): return 2*math.pi*self.rayon\n    def aire(self): return math.pi*self.rayon**2\n\nclass Carre(Rectangle):\n    def __init__(self, cote):\n        super().__init__(cote, cote)\n\nformes = [Rectangle(4,3), Cercle(5), Carre(4)]\nfor f in formes: print(f)" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// D05 — ARCHITECTURE, OS & RÉSEAUX
// ─────────────────────────────────────────────────────────────────────
'architecture-reseaux': {
  id:'architecture-reseaux', emoji:'⚙️', color:'#ef4444',
  titre:'Architecture, OS & Réseaux',
  desc:"Modèle Von Neumann, processus et ordonnancement CPU, système de fichiers, TCP/IP et adressage IP, HTTP/HTTPS et modèle client-serveur.",
  souschapitres:[
    {
      id:'sc-arch1', titre:'5.1 Architecture et systèmes d\'exploitation',
      notions:['Von Neumann : UC, Mémoire, E/S, Bus','Cycle Fetch-Decode-Execute','Processus : état Prêt/Actif/Bloqué','Ordonnancement : FCFS, Round-Robin'],
      blocs:[
        {
          notion:'⚙️ Architecture et OS',
          theoremes:[
            { id:'D-AR1', type:'def', nom:'Architecture Von Neumann',
              enonce:"4 COMPOSANTS :\n1. Unité Centrale (CPU) :\n   • UAL : calculs arithmétiques et logiques\n   • Unité de contrôle : orchestre les instructions\n   • Registres : mémoire ultra-rapide interne\n\n2. Mémoire centrale (RAM) :\n   → Stocke programme + données en cours\n   → Volatile (perdue à l'arrêt)\n\n3. Unités d'Entrée/Sortie :\n   → Clavier, écran, disques, réseau\n\n4. Bus :\n   → Transfert de données entre composants\n   → Bus de données, d'adresses, de contrôle\n\nCYCLE D'INSTRUCTION (Fetch-Decode-Execute) :\n1. Fetch : lire l'instruction en mémoire (PC)\n2. Decode : décoder l'instruction\n3. Execute : exécuter et stocker le résultat\n→ Répété ~10⁹ fois par seconde (1 GHz)" },
            { id:'D-AR2', type:'def', nom:'Processus et ordonnancement',
              enonce:"PROCESSUS = programme en cours d'exécution\nPossède : code, données, pile, registres, état\n\nÉTATS D'UN PROCESSUS :\nPrêt → Actif → Bloqué → Prêt\n→ Prêt : attend d'être sélectionné\n→ Actif : utilise le CPU\n→ Bloqué : attend une E/S\n\nMULTITÂCHE :\nL'OS partage le CPU entre les processus\n\nALGORITHMES D'ORDONNANCEMENT :\n• FCFS (First Come First Served) : ordre d'arrivée\n• Round-Robin : chaque proc. reçoit un quantum\n• Priorité : proc. de plus haute priorité d'abord\n\nSYSTÈME DE FICHIERS :\nOrganisation arborescente (/home/user/docs/)\ninode : métadonnées (droits, taille, propriétaire)\nDroits : rwx pour owner, group, others" },
          ],
          exercices:[
            { id:'EX-AR1', niveau:'Facile', titre:'Ordonnancement Round-Robin',
              enonce:"3 processus arrivent simultanément : P1 (4ms), P2 (2ms), P3 (3ms). Quantum=2ms.\nTracer le diagramme de Gantt et calculer le temps moyen d'attente.",
              correction:"QUANTUM = 2ms\n\nGantt : P1 | P2 | P3 | P1 | P3 | P1\n        0  2   4   6   8   9   10 ms\n\nP1 : termine à 10ms, arrivée 0 → attente = 10-4 = 6ms\nP2 : termine à 4ms, arrivée 0 → attente = 4-2 = 2ms\nP3 : termine à 9ms, arrivée 0 → attente = 9-3 = 6ms\n\nTMMA = (6+2+6)/3 = 14/3 ≈ 4,67ms" },
          ]
        },
      ]
    },
    {
      id:'sc-arch2', titre:'5.2 Internet — TCP/IP et HTTP',
      notions:['IPv4 : 4 octets, masque sous-réseau','Routage : tables de routage, TTL','TCP : connexion fiable (SYN/ACK)','HTTP : requête/réponse, codes 200/404/500'],
      blocs:[
        {
          notion:'🌐 Réseaux Internet',
          theoremes:[
            { id:'D-AR3', type:'def', nom:'TCP/IP — Protocoles Internet',
              enonce:"MODÈLE TCP/IP (4 couches) :\n4. Application : HTTP, DNS, FTP, SMTP\n3. Transport : TCP (fiable), UDP (rapide)\n2. Internet : IP (adressage et routage)\n1. Accès réseau : Ethernet, WiFi\n\nADRESSAGE IPv4 :\n4 octets : 192.168.1.15\nMasque : 255.255.255.0 (/24 → 254 hôtes)\nPasGasserelle (routeur) : accès Internet\n\nTCP (Transmission Control Protocol) :\nConnexion fiable avec accusé de réception\nHandshake : SYN → SYN-ACK → ACK\nUsage : HTTP, FTP, emails\n\nUDP (User Datagram Protocol) :\nPas de connexion, pas de garantie\nUsage : streaming, DNS, jeux en ligne\n\nHTTP (HyperText Transfer Protocol) :\nRequête : GET /page.html HTTP/1.1\nRéponse : 200 OK | 404 Not Found | 500 Server Error\nHTTPS = HTTP + TLS (chiffrement)" },
          ],
          exercices:[
            { id:'EX-AR2', niveau:'Intermédiaire', titre:'Analyse d\'une requête HTTP',
              enonce:"Décrire étape par étape ce qui se passe quand tu tapes 'https://www.google.com' dans ton navigateur.",
              correction:"1. Résolution DNS :\n   Le navigateur interroge le serveur DNS\n   → 'google.com' traduit en IP (ex: 142.250.75.46)\n\n2. Connexion TCP :\n   Navigateur → SYN → Serveur Google\n   Navigateur ← SYN-ACK ← Serveur\n   Navigateur → ACK → Serveur\n   (Handshake TCP = 3 paquets)\n\n3. Chiffrement TLS (HTTPS) :\n   Échange de certificats, clé de session\n\n4. Requête HTTP :\n   GET / HTTP/1.1\n   Host: www.google.com\n\n5. Réponse HTTP :\n   200 OK\n   Content-Type: text/html\n   [code HTML de la page]\n\n6. Rendu :\n   Navigateur parse HTML → CSS → JS → affiche la page" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// D06 — ENJEUX DU NUMÉRIQUE
// ─────────────────────────────────────────────────────────────────────
'enjeux-numerique': {
  id:'enjeux-numerique', emoji:'🌍', color:'#6366f1',
  titre:'Enjeux du numérique',
  desc:"Données personnelles et RGPD, cybersécurité (attaques et protections), intelligence artificielle (Machine Learning, biais), enjeux sociétaux et éthiques.",
  souschapitres:[
    {
      id:'sc-en1', titre:'6.1 Données personnelles et cybersécurité',
      notions:['RGPD : droits accès/rectification/effacement','Chiffrement symétrique (AES) et asymétrique (RSA)','HTTPS = HTTP + TLS','Attaques : phishing, SQL injection, MITM'],
      blocs:[
        {
          notion:'🔒 Sécurité et données personnelles',
          theoremes:[
            { id:'D-EN1', type:'def', nom:'RGPD et données personnelles',
              enonce:"DONNÉE PERSONNELLE :\nToute information permettant d'identifier une personne\n(nom, email, IP, photo, géolocalisation...)\n\nRGPD (2018 — Règlement Européen) :\nDROITS :\n• Accès : consulter ses données\n• Rectification : corriger les erreurs\n• Effacement : 'droit à l'oubli'\n• Opposition : refuser certains usages\n• Portabilité : récupérer ses données\n\nOBLIGATIONS des entreprises :\n• Consentement EXPLICITE avant collecte\n• Sécuriser les données\n• Signaler les failles dans 72h\n• Nommer un DPO (Data Protection Officer)\n\nSANCTIONS : jusqu'à 4% du CA mondial" },
            { id:'N-EN1', type:'notion', nom:'Cybersécurité — Attaques et protections',
              enonce:"ATTAQUES PRINCIPALES :\n\nPhishing : email usurpant une identité\n→ Vol d'identifiants\n\nInjection SQL :\nSELECT * FROM users WHERE nom=''+OR+1=1--'\n→ Contournement d'authentification\n→ Protection : requêtes paramétrées\n\nMITM (Man-in-The-Middle) :\nInterception des communications\n→ Protection : HTTPS + certificats\n\nRansomware : chiffrement et rançon\nDDoS : surcharge d'un serveur\n\nCHIFFREMENT :\nSymétrique (AES) : même clé chiffrement/déchiffrement\nAsymétrique (RSA) : clé publique/privée\n→ HTTPS utilise les deux\n\nBONNES PRATIQUES :\n✓ Mots de passe forts + gestionnaire\n✓ 2FA activé\n✓ Mises à jour OS\n✓ Vérifier HTTPS + certificat" },
          ],
          exercices:[
            { id:'EX-EN1', niveau:'Facile', titre:'Identifier les attaques et protections',
              enonce:"Pour chaque scénario, identifier l'attaque et la protection :\n1) Formulaire de connexion avec : nom='' OR 1=1 --\n2) Email de 'votre banque' demandant votre MDP\n3) Trafic réseau intercepté entre client et serveur",
              correction:"1) Injection SQL\n   → Protection : requêtes paramétrées (prepared statements)\n   cursor.execute('SELECT * FROM users WHERE nom=?', (nom,))\n\n2) Phishing\n   → Ne jamais cliquer sur le lien, aller directement sur le site\n   → Vérifier l'URL exacte (pas de .xyz ou .ru suspect)\n\n3) Attaque MITM (Man-in-The-Middle)\n   → Protection : HTTPS (chiffrement TLS)\n   → Vérifier le cadenas et le certificat dans le navigateur" },
          ]
        },
      ]
    },
    {
      id:'sc-en2', titre:'6.2 Intelligence artificielle et enjeux sociétaux',
      notions:['IA = apprentissage automatique (Machine Learning)','Données d\'entraînement → modèle → prédictions','Biais algorithmiques : données biaisées → décisions inéquitables','IA générative, impact emploi, empreinte carbone'],
      blocs:[
        {
          notion:'🤖 Intelligence artificielle et société',
          theoremes:[
            { id:'D-EN2', type:'def', nom:'Intelligence artificielle — bases',
              enonce:"IA = ensemble de techniques permettant aux machines\nd'imiter des capacités cognitives humaines\n\nMACHINE LEARNING (ML) :\nDonnées d'entraînement → Algorithme → Modèle → Prédictions\n\nTYPES PRINCIPAUX :\n• Supervisé : exemples étiquetés (classification d'images)\n• Non supervisé : regroupement (clustering)\n• Renforcement : récompense/punition (jeux, robotique)\n\nEXEMPLES d'applications :\nReconnaissance faciale, traduction, recommandations,\nvoitures autonomes, diagnostic médical\n\nIA GÉNÉRATIVE :\nGPT, DALL-E, Midjourney → génèrent textes/images\nBases : réseaux de neurones profonds (Deep Learning)" },
            { id:'N-EN2', type:'notion', nom:'Enjeux et risques du numérique',
              enonce:"BIAIS ALGORITHMIQUES :\nSi données d'entraînement biaisées → modèle biaisé\nEx: algorithme de sélection CV discriminant selon le genre\n→ Nécessite des données représentatives et diversifiées\n\nIMPACT ENVIRONNEMENTAL :\nCentres de données : 2-3% de l'électricité mondiale\nEntraîner GPT-3 : ~300 tonnes CO₂ (≈ vol Paris-NY × 300)\n→ IA frugale, optimisation, énergies renouvelables\n\nENJEUX DE L'EMPLOI :\nAutomatisation de tâches répétitives\n→ Nouveaux métiers : prompt engineer, data scientist\n→ Formation continue indispensable\n\nRÉSEAUX SOCIAUX :\nAlgorithme de recommandation → bulle de filtre\nViralité des fake news (engagement > vérité)\nAddiction par design (like, notification)\n\nÉTHIQUE :\nDécisions algorithmiques (justice, assurance)\nTransparence et explicabilité des IA\nRespect de la vie privée (surveillance de masse)" },
          ],
          exercices:[
            { id:'EX-EN2', niveau:'Intermédiaire', titre:'Analyser un biais algorithmique',
              enonce:"Un algorithme de tri de CV est entraîné sur les CV des employés recrutés les 10 dernières années (80% hommes). Quel problème se pose ? Que proposer ?",
              correction:"PROBLÈME : Biais de genre\nL'algo apprend que 'bon candidat' = homme\n→ Pénalise automatiquement les CV féminins\n→ Perpétue et amplifie la discrimination existante\n\nEXEMPLE RÉEL : Amazon a dû abandonner\nson outil de tri de CV en 2018 pour cette raison.\n\nSOLUTIONS :\n1. Diversifier les données d'entraînement\n2. Supprimer les caractéristiques sensibles (genre, prénom)\n3. Auditer régulièrement les décisions de l'IA\n4. Maintenir un contrôle humain sur les décisions finales\n5. Tests d'équité (fairness metrics)" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// D07 — PROJET NSI
// ─────────────────────────────────────────────────────────────────────
'projet-nsi': {
  id:'projet-nsi', emoji:'🚀', color:'#f59e0b',
  titre:'Projet NSI',
  desc:"Projet obligatoire en groupe (3-4 élèves). Conception, développement, tests et présentation orale (20 min). Applications web, jeux Python, scripts d'analyse de données.",
  souschapitres:[
    {
      id:'sc-proj1', titre:'7.1 Organisation et méthode de projet',
      notions:['Cahier des charges : besoins + contraintes','GitHub : versionning, branches, pull requests','Tests : tests unitaires (assert), débogage','Présentation orale : 5min exposé + 15min questions'],
      blocs:[
        {
          notion:'🚀 Méthodologie de projet NSI',
          theoremes:[
            { id:'M-P1', type:'methode', nom:'Conduite d\'un projet NSI',
              enonce:"PHASES DU PROJET :\n\n1. CONCEPTION :\n   → Définir le sujet et les fonctionnalités\n   → Cahier des charges : ce que fait l'app\n   → Répartition des tâches\n   → Choix techniques (Python, Web, BD...)\n\n2. DÉVELOPPEMENT :\n   → Utiliser Git dès le début\n   → Commits réguliers et explicites\n   → Code commenté, noms de variables explicites\n   → Séparation en modules/fichiers\n\n3. TESTS :\n   → Tests unitaires pour les fonctions clés\n   → Tester les cas limites\n   → Débogage systématique (print, debugger)\n\n4. PRÉSENTATION (20 min) :\n   → Démo fonctionnelle obligatoire\n   → Expliquer les choix techniques\n   → Répondre aux questions du jury" },
            { id:'N-P1', type:'notion', nom:'Git et tests unitaires',
              enonce:"GIT — COMMANDES ESSENTIELLES :\ngit init                    # initialiser le repo\ngit add fichier.py          # préparer les fichiers\ngit commit -m 'Message'     # sauvegarder\ngit push origin main        # envoyer sur GitHub\ngit pull                    # récupérer les mises à jour\ngit branch feature/truc     # créer une branche\ngit merge feature/truc      # fusionner\n\nTESTS UNITAIRES Python :\ndef test_fact():\n    assert fact(0) == 1\n    assert fact(1) == 1\n    assert fact(5) == 120\n    print('Tous les tests passés !')\n\nIMPORTANT : un test = 1 fonction, 1 comportement\nTester les cas normaux ET les cas limites" },
          ],
          exercices:[
            { id:'EX-P1', niveau:'Facile', titre:'Rédiger un cahier des charges',
              enonce:"Tu veux créer une application Python de gestion de bibliothèque. Rédiger le cahier des charges (fonctionnalités, contraintes, architecture).",
              correction:"CAHIER DES CHARGES — Bibliothèque NSI\n\nDESCRIPTION :\nApplication Python pour gérer les emprunts de livres\n\nFONCTIONNALITÉS :\n1. Ajouter/supprimer des livres\n2. Enregistrer un emprunt (livre + adhérent + date)\n3. Retour d'un livre\n4. Rechercher un livre (titre, auteur)\n5. Lister les emprunts en cours\n6. Afficher l'historique d'un adhérent\n\nCONTRAINTES TECHNIQUES :\n→ Python 3.10+\n→ Base de données SQLite (sqlite3)\n→ Interface console ou GUI (tkinter)\n→ Tests unitaires pour les fonctions clés\n→ Git avec commits réguliers\n\nARCHITECTURE :\nbibliotheque/\n  main.py          # point d'entrée\n  modeles.py       # classes Livre, Adherent, Emprunt\n  base_donnees.py  # connexion SQLite\n  interface.py     # menus et affichage\n  tests/\n    test_modeles.py" },
            { id:'EX-P2', niveau:'Intermédiaire', titre:'Mini-projet : application web Flask',
              enonce:"Décrire l'architecture minimale d'une application web Python Flask avec une route /notes qui affiche les notes depuis une BDD SQLite.",
              correction:"# Structure du projet\nnsi_notes/\n  app.py\n  notes.db\n  templates/\n    notes.html\n\n# app.py\nfrom flask import Flask, render_template\nimport sqlite3\n\napp = Flask(__name__)\n\ndef get_db():\n    conn = sqlite3.connect('notes.db')\n    conn.row_factory = sqlite3.Row\n    return conn\n\n@app.route('/')\ndef accueil():\n    return '<h1>App Notes NSI</h1>'\n\n@app.route('/notes')\ndef notes():\n    db = get_db()\n    notes = db.execute('SELECT * FROM notes ORDER BY matiere').fetchall()\n    db.close()\n    return render_template('notes.html', notes=notes)\n\nif __name__ == '__main__':\n    app.run(debug=True)\n\n# templates/notes.html\n# <!DOCTYPE html><html><body>\n# <table>\n# {% for n in notes %}\n# <tr><td>{{n.matiere}}</td><td>{{n.note}}</td></tr>\n# {% endfor %}\n# </table></body></html>" },
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
export default function NSITerminaleSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'structures-donnees'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>💻</div>
          <h2>Domaine non trouvé</h2>
          <Link href="/bac-france/informatique/terminale" style={{ color:'#f59e0b' }}>← Retour NSI Terminale</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#f59e0b'
  const badge = BADGES[slug]

  const GROUPS = [
    { label:'Structures & Algorithmes', slugs:['structures-donnees','algorithmes-avances'] },
    { label:'Données & Programmation', slugs:['bases-donnees','programmation-avancee'] },
    { label:'Système & Société', slugs:['architecture-reseaux','enjeux-numerique','projet-nsi'] },
  ]

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/informatique" style={{ color:'var(--muted)', textDecoration:'none' }}>Informatique NSI</Link><span>›</span>
          <Link href="/bac-france/informatique/terminale" style={{ color:'var(--muted)', textDecoration:'none' }}>Terminale</Link><span>›</span>
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
                  {badge && (
                    <span style={{ fontSize:11, background:`${secColor}20`, color:secColor,
                      padding:'2px 10px', borderRadius:20, fontWeight:700 }}>{badge}</span>
                  )}
                  <span style={{ fontSize:11, background:'rgba(245,158,11,0.15)',
                    color:'#fbbf24', padding:'2px 9px', borderRadius:10 }}>
                    🎓 NSI Terminale · Coef. 16
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.emoji} {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('NSI Terminale — '+chapter.titre)}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Résoudre un exercice IA
                  </Link>
                  <Link href="/simulation-france"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    🎯 Simulation Bac NSI
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
                              const isMono = ['algo','formule'].includes(t.type)
                              return (
                                <div key={t.id} style={{ borderLeft:`3px solid ${color}`, background:`${color}07`,
                                  borderRadius:'0 12px 12px 0', padding:'14px 18px', border:`1px solid ${color}18` }}>
                                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start',
                                    marginBottom:8, gap:10, flexWrap:'wrap' }}>
                                    <div style={{ fontWeight:700, fontSize:13 }}>{t.nom}</div>
                                    <TypeBadge type={t.type} />
                                  </div>
                                  <pre style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75,
                                    whiteSpace:'pre-wrap', margin:0,
                                    fontFamily:isMono?'var(--font-mono)':'inherit' }}>
                                    {t.enonce}
                                  </pre>
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
                                      <Link href={`/solve?q=${encodeURIComponent('NSI Terminale — '+ex.enonce)}`}
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
                                        <pre style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75,
                                          whiteSpace:'pre-wrap', margin:0, fontFamily:'var(--font-mono)' }}>
                                          {ex.correction}
                                        </pre>
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
                  <Link href={`/bac-france/informatique/terminale/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/D\d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/informatique/terminale/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[nextSlug].replace(/D\d+ — /,'')}</div>
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
                  fontSize:11, color:'#fbbf24', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(245,158,11,0.08)' }}>
                  🎓 NSI Terminale · 7 domaines
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'6px 15px 2px', fontSize:9, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac-france/informatique/terminale/${s}`} style={{ textDecoration:'none' }}>
                        <div style={{ padding:'8px 15px', borderBottom:'1px solid var(--border)',
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
                            {TITRES_NAV[s].replace(/D\d+ — /,'').slice(0,24)}
                            {BADGES[s] && <span style={{ marginLeft:4, fontSize:9 }}>{BADGES[s]}</span>}
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
                  <Link href={`/solve?q=${encodeURIComponent('NSI Terminale — '+chapter.titre)}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — NSI
                  </Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac NSI</Link>
                  <Link href="/bac-france/informatique/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📗 Première NSI</Link>
                  <Link href="/bac-france/informatique/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les domaines</Link>
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