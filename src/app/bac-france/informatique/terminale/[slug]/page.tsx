'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = { def:'#06b6d4', notion:'#8b5cf6', algo:'#10b981', formule:'#f59e0b', methode:'#ec4899' }
const L: Record<string,string> = { def:'Definition', notion:'Notion cle', algo:'Algorithme', formule:'A retenir', methode:'Methode' }

const NAV_ORDER = [
  'structures-donnees','algorithmes-avances','bases-donnees',
  'programmation-avancee','architecture-reseaux','enjeux-numerique','projet-nsi'
]
const TITRES: Record<string,string> = {
  'structures-donnees':'Structures de donnees',
  'algorithmes-avances':'Algorithmes avances',
  'bases-donnees':'Bases de donnees SQL',
  'programmation-avancee':'Programmation avancee Python',
  'architecture-reseaux':'Architecture et Reseaux',
  'enjeux-numerique':'Enjeux du numerique',
  'projet-nsi':'Projet NSI',
}
const SEC_COLOR: Record<string,string> = {
  'structures-donnees':'#06b6d4','algorithmes-avances':'#8b5cf6',
  'bases-donnees':'#10b981','programmation-avancee':'#f59e0b',
  'architecture-reseaux':'#ef4444','enjeux-numerique':'#6366f1','projet-nsi':'#f59e0b',
}

type Theoreme = { id:string; type:string; nom:string; enonce:string }
type Exercice = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Chapitre = { ch:string; titre:string; badge:string; duree:string; desc:string; theoremes:Theoreme[]; exercices:Exercice[] }

const CHAPITRES: Record<string,Chapitre> = {

  'structures-donnees': {
    ch:'D 01', titre:'Structures de donnees', badge:'Avance', duree:'~8h',
    desc:'Piles, files, arbres binaires, ABR, graphes — structures et implementations Python.',
    theoremes:[
      { id:'D1', type:'def', nom:'Pile (Stack) — LIFO',
        enonce:'LIFO = Last In, First Out (dernier entre, premier sorti).\n\nOperations :\n- push : empiler (ajouter au sommet)\n- pop : depiler (retirer du sommet)\n- peek : lire le sommet sans retirer\n\nImplementation Python :\npile = []\npile.append(5)  # push → [5]\npile.append(3)  # push → [5, 3]\nx = pile.pop()  # pop  → x=3, pile=[5]\n\nApplications : Ctrl+Z, appels de fonctions, parentheses.' },
      { id:'D2', type:'def', nom:'File (Queue) — FIFO',
        enonce:'FIFO = First In, First Out (premier entre, premier sorti).\n\nOperations :\n- enqueue : enfiler (ajouter en queue)\n- dequeue : defiler (retirer en tete)\n\nImplementation Python :\nfrom collections import deque\nfile = deque()\nfile.appendleft(5)   # enqueue → deque([5])\nfile.appendleft(3)   # enqueue → deque([3, 5])\nx = file.pop()       # dequeue → x=5, deque([3])\n\nApplications : file d\'attente, BFS, impression.' },
      { id:'D3', type:'def', nom:'Arbre binaire',
        enonce:'Noeud = valeur + sous-arbre gauche + sous-arbre droit.\nRacine : noeud sans parent.\nFeuille : noeud sans enfant.\nHauteur = longueur du plus long chemin racine → feuille.\n\nImplementation Python :\nclass Noeud:\n    def __init__(self, val, g=None, d=None):\n        self.val = val\n        self.gauche = g\n        self.droit = d\n\nParcours :\nPrefixe  : racine → gauche → droit\nInfixe   : gauche → racine → droit\nPostfixe : gauche → droit  → racine' },
      { id:'N1', type:'notion', nom:'Arbre Binaire de Recherche (ABR)',
        enonce:'Propriete fondamentale :\ntous les noeuds gauche < racine < tous les noeuds droit\n\nRecherche dans un ABR :\ndef recherche(noeud, val):\n    if noeud is None: return False\n    if noeud.val == val: return True\n    if val < noeud.val:\n        return recherche(noeud.gauche, val)\n    return recherche(noeud.droit, val)\n\nComplexite :\nO(log n) si equilibre — O(n) si degenere.\nParcours infixe d\'un ABR → liste triee.' },
      { id:'D4', type:'def', nom:'Graphe',
        enonce:'Graphe G = (V, E) : V = sommets, E = aretes.\nOriente : aretes avec direction (→).\nPondere : aretes avec poids.\n\nRepresentation :\n# Liste d\'adjacence\ng = {\n  "A": ["B", "C"],\n  "B": ["D"],\n  "C": ["D"],\n  "D": []\n}\n\nDFS (profondeur) : pile ou recursion.\nBFS (largeur) : file → plus court chemin non pondere.' },
      { id:'A1', type:'algo', nom:'DFS et BFS',
        enonce:'DFS (Depth-First Search) :\ndef dfs(g, debut, visite=None):\n    if visite is None: visite = set()\n    visite.add(debut)\n    for voisin in g[debut]:\n        if voisin not in visite:\n            dfs(g, voisin, visite)\n    return visite\n\nBFS (Breadth-First Search) :\nfrom collections import deque\ndef bfs(g, debut):\n    file = deque([debut])\n    visite = {debut}\n    while file:\n        s = file.pop()\n        for v in g[s]:\n            if v not in visite:\n                visite.add(v)\n                file.appendleft(v)\n    return visite' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Verifier des parentheses avec une pile',
        enonce:'Ecrire une fonction parentheses_ok(expr) qui verifie si les parentheses d\'une expression sont bien equilibrees.\nEx: "(a+b)*(c-d)" → True | "((a+b)" → False',
        correction:'def parentheses_ok(expr):\n    pile = []\n    ouvrants = "([{"\n    fermants = ")]}"  \n    paires = {")":"(", "]":"[", "}":"{"}\n    \n    for c in expr:\n        if c in ouvrants:\n            pile.append(c)\n        elif c in fermants:\n            if not pile: return False\n            if pile[-1] != paires[c]: return False\n            pile.pop()\n    \n    return len(pile) == 0\n\n# Tests\nprint(parentheses_ok("(a+b)*(c-d)"))  # True\nprint(parentheses_ok("((a+b)"))        # False\nprint(parentheses_ok("([{}])"))        # True' },
      { id:'EX02', niveau:'Intermediaire', titre:'Parcours infixe d\'un ABR',
        enonce:'Ecrire la fonction parcours_infixe(noeud) et verifier que le parcours infixe d\'un ABR donne une liste triee.\nABR : inserer 5, 3, 7, 1, 4.',
        correction:'class Noeud:\n    def __init__(self, val):\n        self.val = val\n        self.gauche = None\n        self.droit = None\n\ndef inserer(racine, val):\n    if racine is None:\n        return Noeud(val)\n    if val < racine.val:\n        racine.gauche = inserer(racine.gauche, val)\n    else:\n        racine.droit = inserer(racine.droit, val)\n    return racine\n\ndef parcours_infixe(noeud, result=None):\n    if result is None: result = []\n    if noeud:\n        parcours_infixe(noeud.gauche, result)\n        result.append(noeud.val)\n        parcours_infixe(noeud.droit, result)\n    return result\n\n# Construction ABR : 5, 3, 7, 1, 4\nracine = None\nfor v in [5, 3, 7, 1, 4]:\n    racine = inserer(racine, v)\n\nprint(parcours_infixe(racine))  # [1, 3, 4, 5, 7] ← trie !' },
      { id:'EX03', niveau:'Difficile', titre:'BFS — plus court chemin',
        enonce:'Graphe : {"A":["B","C"], "B":["D"], "C":["D","E"], "D":["F"], "E":["F"], "F":[]}\nTrouver le plus court chemin de A a F avec BFS.',
        correction:'from collections import deque\n\ndef bfs_chemin(g, debut, fin):\n    file = deque([[debut]])\n    visite = {debut}\n    \n    while file:\n        chemin = file.pop()\n        noeud = chemin[-1]\n        \n        if noeud == fin:\n            return chemin\n        \n        for voisin in g[noeud]:\n            if voisin not in visite:\n                visite.add(voisin)\n                file.appendleft(chemin + [voisin])\n    \n    return None\n\ng = {"A":["B","C"],"B":["D"],"C":["D","E"],"D":["F"],"E":["F"],"F":[]}\nprint(bfs_chemin(g, "A", "F"))  # ["A","C","E","F"] ou ["A","B","D","F"]\n# BFS garantit le plus court (en nombre d\'aretes).' },
    ],
  },

  'algorithmes-avances': {
    ch:'D 02', titre:'Algorithmes avances', badge:'Top Bac', duree:'~8h',
    desc:'Tri fusion, quicksort, complexite Big-O, Dijkstra.',
    theoremes:[
      { id:'F1', type:'formule', nom:'Notation Big-O — complexites essentielles',
        enonce:'O(1)      : constant   — acces tableau par indice\nO(log n)  : log        — dichotomie, ABR equilibre\nO(n)      : lineaire   — parcours liste\nO(n log n): quasi-lin. — tri fusion, quicksort moyen\nO(n²)     : quadr.     — tri selection/insertion\n\nComparaison pour n = 1 000 000 :\nO(1)      → 1\nO(log n)  → 20\nO(n)      → 1 000 000\nO(n log n)→ 20 000 000\nO(n²)     → 10¹²   (inutilisable en pratique)' },
      { id:'A1', type:'algo', nom:'Tri fusion (Merge Sort)',
        enonce:'Paradigme diviser pour regner.\nComplexite : O(n log n) — garantie.\n\ndef tri_fusion(lst):\n    if len(lst) <= 1:\n        return lst\n    m = len(lst) // 2\n    g = tri_fusion(lst[:m])\n    d = tri_fusion(lst[m:])\n    return fusionner(g, d)\n\ndef fusionner(g, d):\n    res = []\n    i = j = 0\n    while i < len(g) and j < len(d):\n        if g[i] <= d[j]:\n            res.append(g[i]); i += 1\n        else:\n            res.append(d[j]); j += 1\n    return res + g[i:] + d[j:]\n\nStable : preserve l\'ordre des egaux.\nInconvenient : O(n) memoire supplementaire.' },
      { id:'A2', type:'algo', nom:'Tri rapide (Quicksort)',
        enonce:'Paradigme diviser pour regner.\nComplexite : O(n log n) moyen, O(n²) pire cas.\n\ndef quicksort(lst):\n    if len(lst) <= 1:\n        return lst\n    pivot = lst[len(lst) // 2]\n    gauche  = [x for x in lst if x < pivot]\n    milieu  = [x for x in lst if x == pivot]\n    droite  = [x for x in lst if x > pivot]\n    return quicksort(gauche) + milieu + quicksort(droite)\n\nEn place (version classique) : pas de memoire extra.\nChoix du pivot : aleatoire evite le pire cas.' },
      { id:'N1', type:'notion', nom:'Dijkstra — concept',
        enonce:'Plus court chemin dans un graphe pondere (poids positifs).\n\nPrincipe :\n1. Distances d[] initialisees a +infini, d[debut]=0.\n2. File de priorite (min-heap).\n3. Extraire le sommet s de distance minimale.\n4. Relaxation : pour chaque voisin v de s :\n   si d[s] + poids(s,v) < d[v] :\n       d[v] = d[s] + poids(s,v)\n5. Repeter jusqu\'a atteindre la destination.\n\nComplexite : O((V+E) log V) avec file de priorite.\nApplications : GPS, routage reseau, OSRM.' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Trace tri fusion',
        enonce:'Tracer le tri fusion de la liste [38, 27, 43, 3, 9, 82]. Montrer les divisions et fusions.',
        correction:'[38, 27, 43, 3, 9, 82]\n\nDivision :\n[38, 27, 43]    |    [3, 9, 82]\n[38] [27, 43]   |   [3] [9, 82]\n     [27] [43]  |       [9] [82]\n\nFusion (remontee) :\n[27] + [43] → [27, 43]\n[38] + [27, 43] → [27, 38, 43]\n[9] + [82] → [9, 82]\n[3] + [9, 82] → [3, 9, 82]\n\nFusion finale :\n[27, 38, 43] + [3, 9, 82] → [3, 9, 27, 38, 43, 82]' },
      { id:'EX02', niveau:'Intermediaire', titre:'Comparer complexites',
        enonce:'Pour trier 10 000 elements, combien d\'operations pour : tri insertion O(n²) vs tri fusion O(n log n) ?\nConclusion ?',
        correction:'n = 10 000\n\nTri insertion O(n²) :\nn² = 10 000² = 100 000 000 = 10⁸ operations\n\nTri fusion O(n log n) :\nn × log₂(n) = 10 000 × log₂(10 000)\n≈ 10 000 × 13.3 ≈ 133 000 operations\n\nRatio : 10⁸ / 133 000 ≈ 750 fois plus lent.\n\nConclusion :\nPour des grandes listes, le choix de l\'algorithme\nest critique. Tri fusion est ~750x plus rapide ici.\nPour n petit (< 20), tri insertion peut etre prefere\n(pas d\'overhead de recursivite).' },
      { id:'EX03', niveau:'Difficile', titre:'Implementer Quicksort en place',
        enonce:'Implementer quicksort en place (sans creer de nouvelles listes) avec partition par echanges.',
        correction:'def quicksort_inplace(lst, g=None, d=None):\n    if g is None: g = 0\n    if d is None: d = len(lst) - 1\n    \n    if g < d:\n        pivot_idx = partition(lst, g, d)\n        quicksort_inplace(lst, g, pivot_idx - 1)\n        quicksort_inplace(lst, pivot_idx + 1, d)\n    return lst\n\ndef partition(lst, g, d):\n    pivot = lst[d]  # dernier element comme pivot\n    i = g - 1\n    for j in range(g, d):\n        if lst[j] <= pivot:\n            i += 1\n            lst[i], lst[j] = lst[j], lst[i]\n    lst[i+1], lst[d] = lst[d], lst[i+1]\n    return i + 1\n\n# Test\nlst = [10, 7, 8, 9, 1, 5]\nquicksort_inplace(lst)\nprint(lst)  # [1, 5, 7, 8, 9, 10]' },
    ],
  },

  'bases-donnees': {
    ch:'D 03', titre:'Bases de donnees SQL', badge:'Top Bac', duree:'~7h',
    desc:'Modele relationnel, SQL avance, jointures, agregation, normalisation.',
    theoremes:[
      { id:'D1', type:'def', nom:'Modele relationnel',
        enonce:'Table (relation) : ensemble de lignes (tuples).\nAttribut : colonne avec un type (int, text, date).\nCle primaire (PK) : identifie uniquement chaque ligne.\nCle etrangere (FK) : reference vers PK d\'une autre table.\n\nEx schema :\nELEVES(id PK, nom, classe_id FK→CLASSES.id)\nCLASSES(id PK, nom, niveau)\nNOTES(id PK, eleve_id FK, matiere, note)\n\nIntegrite referentielle : FK doit pointer vers PK existante.' },
      { id:'N1', type:'notion', nom:'SQL — Requetes SELECT',
        enonce:'Syntaxe complete :\nSELECT col1, col2\nFROM table\nWHERE condition\nGROUP BY col\nHAVING condition_agregat\nORDER BY col ASC/DESC\nLIMIT n;\n\nOperateurs WHERE :\n=, !=, <, >, <=, >=\nLIKE \'%motif%\'\nIN (val1, val2)\nBETWEEN 10 AND 20\nIS NULL / IS NOT NULL\nAND / OR / NOT' },
      { id:'N2', type:'notion', nom:'SQL — Jointures',
        enonce:'INNER JOIN : lignes communes aux deux tables.\nSELECT e.nom, n.note\nFROM eleves e\nINNER JOIN notes n ON e.id = n.eleve_id\nWHERE n.matiere = \'NSI\';\n\nLEFT JOIN : toutes les lignes de gauche.\nSELECT e.nom, n.note\nFROM eleves e\nLEFT JOIN notes n ON e.id = n.eleve_id;\n(note = NULL si pas de note pour cet eleve)\n\nJointure triple :\nFROM a\nJOIN b ON a.id = b.a_id\nJOIN c ON b.id = c.b_id;' },
      { id:'N3', type:'notion', nom:'SQL — Agregation',
        enonce:'Fonctions d\'agregation :\nCOUNT(*) : nombre de lignes\nSUM(col) : somme\nAVG(col) : moyenne\nMAX(col) : maximum\nMIN(col) : minimum\n\nEx :\nSELECT classe, COUNT(*) AS nb_eleves, AVG(note) AS moyenne\nFROM notes\nWHERE matiere = \'NSI\'\nGROUP BY classe\nHAVING COUNT(*) > 5\nORDER BY moyenne DESC;\n\nWHERE : filtre avant agregation.\nHAVING : filtre apres agregation.' },
      { id:'N4', type:'notion', nom:'Normalisation',
        enonce:'Objectif : eliminer la redondance, eviter les anomalies.\n\n1NF : attributs atomiques (pas de listes dans une cellule).\nEx: telephone TEXT pas liste\n\n2NF : pas de dependance partielle a la cle.\n(Pour cle composite uniquement)\n\n3NF : pas de dependance transitive.\nSi A→B et B→C (B non cle), alors sortir B et C.\n\nEx: COMMANDES(id, client_nom, client_ville)\nclient_ville depend de client_nom (pas directement de id)\n→ Creer TABLE CLIENTS(id, nom, ville)' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Requetes SELECT simples',
        enonce:'Table FILMS(id, titre, annee, genre, note).\nEcrire les requetes SQL pour :\n1. Tous les films du genre "Action"\n2. Films de 2020 ou apres, tries par note desc\n3. Nombre de films par genre',
        correction:'-- 1. Films Action\nSELECT *\nFROM films\nWHERE genre = \'Action\';\n\n-- 2. Films recents tries par note\nSELECT titre, annee, note\nFROM films\nWHERE annee >= 2020\nORDER BY note DESC;\n\n-- 3. Nombre par genre\nSELECT genre, COUNT(*) AS nombre\nFROM films\nGROUP BY genre\nORDER BY nombre DESC;' },
      { id:'EX02', niveau:'Intermediaire', titre:'Jointures SQL',
        enonce:'Tables :\nELEVES(id, nom, classe)\nNOTES(id, eleve_id, matiere, note)\n\n1. Afficher nom, matiere et note de chaque eleve.\n2. Eleves avec note NSI > 15.\n3. Moyenne NSI par classe.',
        correction:'-- 1. Nom, matiere, note\nSELECT e.nom, n.matiere, n.note\nFROM eleves e\nINNER JOIN notes n ON e.id = n.eleve_id\nORDER BY e.nom;\n\n-- 2. Eleves note NSI > 15\nSELECT e.nom, n.note\nFROM eleves e\nINNER JOIN notes n ON e.id = n.eleve_id\nWHERE n.matiere = \'NSI\' AND n.note > 15\nORDER BY n.note DESC;\n\n-- 3. Moyenne NSI par classe\nSELECT e.classe, AVG(n.note) AS moyenne_nsi\nFROM eleves e\nINNER JOIN notes n ON e.id = n.eleve_id\nWHERE n.matiere = \'NSI\'\nGROUP BY e.classe\nORDER BY moyenne_nsi DESC;' },
      { id:'EX03', niveau:'Difficile', titre:'Normalisation 3NF',
        enonce:'Table COMMANDES(cmd_id, client_id, client_nom, client_ville, produit_id, produit_nom, produit_prix, quantite).\nIdentifier les violations 3NF et proposer un schema normalise.',
        correction:'Violations 3NF detectees :\n1. client_nom, client_ville dependent de client_id (pas de cmd_id)\n2. produit_nom, produit_prix dependent de produit_id (pas de cmd_id)\n\nSchema normalise :\n\nCLIENTS(client_id PK, client_nom, client_ville)\n\nPRODUITS(produit_id PK, produit_nom, produit_prix)\n\nCOMMANDES(\n  cmd_id PK,\n  client_id FK→CLIENTS,\n  date_commande\n)\n\nLIGNES_COMMANDE(\n  id PK,\n  cmd_id FK→COMMANDES,\n  produit_id FK→PRODUITS,\n  quantite\n)\n\nAvantages :\n- Modifier le nom d\'un client : 1 seul endroit\n- Modifier le prix d\'un produit : 1 seul endroit\n- Pas de redondance → pas d\'anomalies' },
    ],
  },

  'programmation-avancee': {
    ch:'D 04', titre:'Programmation avancee Python', badge:'Top Bac', duree:'~8h',
    desc:'Recursivite, POO (classes), encapsulation, heritage, polymorphisme.',
    theoremes:[
      { id:'D1', type:'def', nom:'Recursivite',
        enonce:'Fonction recursive = qui s\'appelle elle-meme.\n\nRegles obligatoires :\n1. Cas de base : condition d\'arret (sans elle → infini).\n2. Cas recursif : appel avec parametre plus petit.\n\nExemples :\n# Factorielle\ndef fact(n):\n    if n == 0: return 1      # cas de base\n    return n * fact(n - 1)   # cas recursif\n\n# Fibonacci\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\n\n# PGCD (Euclide)\ndef pgcd(a, b):\n    if b == 0: return a\n    return pgcd(b, a % b)' },
      { id:'D2', type:'def', nom:'Classes et objets (POO)',
        enonce:'class Vehicule:\n    # Attribut de classe (partage)\n    nb_roues_defaut = 4\n    \n    def __init__(self, marque, vitesse_max):\n        # Attributs d\'instance\n        self.marque = marque\n        self.vitesse_max = vitesse_max\n        self.vitesse = 0\n    \n    def accelerer(self, delta):\n        self.vitesse = min(self.vitesse + delta, self.vitesse_max)\n    \n    def __str__(self):\n        return f"{self.marque} ({self.vitesse} km/h)"\n\n# Instanciation\nv = Vehicule("Toyota", 180)\nv.accelerer(50)\nprint(v)  # Toyota (50 km/h)' },
      { id:'N1', type:'notion', nom:'Heritage et polymorphisme',
        enonce:'class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n    def parler(self):\n        return "..."\n    def __str__(self):\n        return f"{self.nom}: {self.parler()}"\n\nclass Chien(Animal):       # heritage de Animal\n    def parler(self):       # polymorphisme\n        return "Ouaf !"\n\nclass Chat(Animal):\n    def parler(self):\n        return "Miaou !"\n\n# super() : appel constructeur parent\nclass ChienDresse(Chien):\n    def __init__(self, nom, maitre):\n        super().__init__(nom)\n        self.maitre = maitre\n\n# Polymorphisme en action\nanimaux = [Chien("Rex"), Chat("Mimi")]\nfor a in animaux:\n    print(a)  # Chaque animal parle differemment' },
      { id:'M1', type:'methode', nom:'Encapsulation et conventions Python',
        enonce:'Python utilise des conventions (pas de vrai prive) :\n_attribut  : "protege" (usage interne, pas interdit)\n__attribut : "prive" (name mangling)\n\nGetters et setters avec @property :\nclass Temperature:\n    def __init__(self, celsius):\n        self._celsius = celsius\n    \n    @property\n    def celsius(self):\n        return self._celsius\n    \n    @celsius.setter\n    def celsius(self, val):\n        if val < -273.15:\n            raise ValueError("Temperature impossible")\n        self._celsius = val\n    \n    @property\n    def fahrenheit(self):\n        return self._celsius * 9/5 + 32\n\nt = Temperature(20)\nprint(t.fahrenheit)  # 68.0' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Recursivite — Puissance',
        enonce:'Ecrire une fonction recursive puissance(base, exp) qui calcule base^exp.\nCas de base : exp == 0.\nTester avec puissance(2, 10).',
        correction:'def puissance(base, exp):\n    # Cas de base\n    if exp == 0:\n        return 1\n    # Cas recursif\n    return base * puissance(base, exp - 1)\n\n# Tests\nprint(puissance(2, 10))   # 1024\nprint(puissance(3, 4))    # 81\nprint(puissance(5, 0))    # 1\n\n# Version optimisee (exponentiation rapide)\n# O(log n) au lieu de O(n)\ndef puissance_rapide(base, exp):\n    if exp == 0: return 1\n    if exp % 2 == 0:\n        moitie = puissance_rapide(base, exp // 2)\n        return moitie * moitie\n    return base * puissance_rapide(base, exp - 1)' },
      { id:'EX02', niveau:'Intermediaire', titre:'Classe Pile Python',
        enonce:'Implementer une classe Pile avec : empiler(val), depiler(), sommet(), est_vide(), __str__().\nVerifier le bon fonctionnement avec une serie d\'operations.',
        correction:'class Pile:\n    def __init__(self):\n        self._data = []\n    \n    def empiler(self, val):\n        self._data.append(val)\n    \n    def depiler(self):\n        if self.est_vide():\n            raise IndexError("Pile vide")\n        return self._data.pop()\n    \n    def sommet(self):\n        if self.est_vide():\n            raise IndexError("Pile vide")\n        return self._data[-1]\n    \n    def est_vide(self):\n        return len(self._data) == 0\n    \n    def __str__(self):\n        return f"Pile{self._data} ← sommet"\n\n# Test\np = Pile()\np.empiler(5)\np.empiler(3)\np.empiler(8)\nprint(p)             # Pile[5, 3, 8] ← sommet\nprint(p.sommet())    # 8\nprint(p.depiler())   # 8\nprint(p)             # Pile[5, 3] ← sommet' },
      { id:'EX03', niveau:'Difficile', titre:'Heritage — Formes geometriques',
        enonce:'Creer une hierarchie de classes :\n- Forme (abstraite) : perimetre(), aire(), __str__()\n- Rectangle : herite de Forme\n- Cercle : herite de Forme\n- Carre : herite de Rectangle',
        correction:'import math\n\nclass Forme:\n    def perimetre(self):\n        raise NotImplementedError\n    def aire(self):\n        raise NotImplementedError\n    def __str__(self):\n        return f"{type(self).__name__}: aire={self.aire():.2f}, perim={self.perimetre():.2f}"\n\nclass Rectangle(Forme):\n    def __init__(self, largeur, hauteur):\n        self.largeur = largeur\n        self.hauteur = hauteur\n    def perimetre(self):\n        return 2 * (self.largeur + self.hauteur)\n    def aire(self):\n        return self.largeur * self.hauteur\n\nclass Carre(Rectangle):\n    def __init__(self, cote):\n        super().__init__(cote, cote)\n\nclass Cercle(Forme):\n    def __init__(self, rayon):\n        self.rayon = rayon\n    def perimetre(self):\n        return 2 * math.pi * self.rayon\n    def aire(self):\n        return math.pi * self.rayon ** 2\n\n# Tests (polymorphisme)\nformes = [Rectangle(4,3), Carre(5), Cercle(3)]\nfor f in formes:\n    print(f)' },
    ],
  },

  'architecture-reseaux': {
    ch:'D 05', titre:'Architecture, OS et Reseaux', badge:'Systeme', duree:'~6h',
    desc:'Von Neumann avance, processus, ordonnancement, TCP/IP, HTTP, securite.',
    theoremes:[
      { id:'D1', type:'def', nom:'Architecture Von Neumann — details',
        enonce:'CPU = UAL + UC + Registres.\nUAL : operations arithmetiques (+,-,x,÷) et logiques (AND, OR, NOT, XOR).\nUC (Unite de controle) : sequencement des instructions.\n\nRegistres importants :\n- PC (Program Counter) : adresse prochaine instruction\n- IR (Instruction Register) : instruction en cours\n- ACC (Accumulateur) : resultat intermediaire\n\nCycle machine (3 etapes) :\nFetch : PC → memoire → IR, PC++\nDecode : UC interprete IR\nExecute : UAL ou acces memoire ou saut\n\nFrequence horloge : nombre de cycles/seconde (GHz).' },
      { id:'N1', type:'notion', nom:'Processus et ordonnancement',
        enonce:'Processus = instance d\'un programme en execution.\nPID : identifiant unique.\n\nEtats :\nNouveau → Pret → Execution ⇄ Bloque → Termine\n\nChangement de contexte : sauvegarde/restauration registres.\n\nAlgorithmes d\'ordonnancement :\nFIFO : premier arrive, premier servi.\nRound-Robin : quantum de temps egal pour chaque processus.\nPriorite : processus systeme > utilisateur.\n\nDeadlock : 2 processus s\'attendent mutuellement → blocage.' },
      { id:'N2', type:'notion', nom:'Protocoles Internet',
        enonce:'Modele en couches TCP/IP :\n4. Application  : HTTP, FTP, SSH, DNS\n3. Transport    : TCP (fiable), UDP (rapide)\n2. Internet     : IP (adressage + routage)\n1. Acces reseau : Ethernet, WiFi, 4G/5G\n\nTCP vs UDP :\nTCP : connexion, accusé de reception, ordre garanti → web, email\nUDP : sans connexion, pas de garantie → video live, jeux\n\nIP : IPv4 (32 bits, ~4 milliards) / IPv6 (128 bits)\nNAT : partager une IP publique entre plusieurs machines.' },
      { id:'N3', type:'notion', nom:'Securite web',
        enonce:'Attaques courantes :\nInjection SQL : INSERT malveillant dans un formulaire\nEx: \' OR 1=1 --\n\nXSS (Cross-Site Scripting) :\nInjecter du JavaScript dans une page web.\n\nPhishing : faux site imitant un vrai.\n\nProtections :\nSQL : requetes preparees (parameterized queries)\nXSS : echapper les caracteres speciaux (<, >, &)\nHTTPS : chiffrement TLS\nMFA : double authentification\nHachage : bcrypt pour les mots de passe (jamais en clair)' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Decoder un echange HTTP',
        enonce:'Analyser cet echange HTTP :\nRequete : POST /login HTTP/1.1 Host: site.fr\nCorps : username=alice&password=1234\nReponse : HTTP/1.1 302 Found Location: /dashboard\n\nQ1: Methode et route ? Q2: Que fait la reponse 302 ?',
        correction:'Q1: Methode = POST (envoi donnees)\nRoute = /login (traitement de connexion)\n\nDonnees envoyees dans le corps (pas dans l\'URL) :\nusername = alice\npassword = 1234\n\nQ2: Code 302 = Redirection temporaire.\nLe serveur dit au navigateur :\n"La connexion a reussi, va sur /dashboard"\nLe navigateur fait automatiquement une requete GET vers /dashboard.\n\nProbleme de securite ici :\nle mot de passe "1234" est en clair.\nEn production : HTTPS obligatoire + hachage cote serveur.' },
      { id:'EX02', niveau:'Intermediaire', titre:'Injection SQL',
        enonce:'Code PHP vulnerable :\n$query = "SELECT * FROM users WHERE login=\'$login\' AND mdp=\'$mdp\'";\n\nSi login = admin\'-- et mdp = nimportequoi\nQue se passe-t-il ? Comment corriger ?',
        correction:'Analyse de l\'attaque :\n$query devient :\n"SELECT * FROM users WHERE login=\'admin\'--\' AND mdp=\'nimportequoi\'"\n\n-- commente le reste en SQL.\nRequete executee :\n"SELECT * FROM users WHERE login=\'admin\'"\n\nL\'attaquant se connecte sans connaitre le mot de passe !\n\nCorrection — requete preparee en PHP :\n$stmt = $pdo->prepare(\n  "SELECT * FROM users WHERE login=? AND mdp=?"\n);\n$stmt->execute([$login, $mdp]);\n\nLes ? sont des parametres echappes automatiquement.\nL\'injection SQL est impossible car les apostrophes\nsont neutralisees.' },
    ],
  },

  'enjeux-numerique': {
    ch:'D 06', titre:'Enjeux du numerique', badge:'Societe', duree:'~4h',
    desc:'Donnees personnelles, RGPD, cybersecurite, intelligence artificielle.',
    theoremes:[
      { id:'D1', type:'def', nom:'RGPD — Reglement europeen',
        enonce:'RGPD (2018) = Reglement General sur la Protection des Donnees.\nS\'applique a toute organisation traitant des donnees de citoyens UE.\n\nPrincipes fondamentaux :\n1. Licéite : base legale (consentement, contrat, interet legitime)\n2. Finalite : donnees collectees pour un but precis\n3. Minimisation : collecter le minimum necessaire\n4. Exactitude : donnees a jour\n5. Conservation limitee : supprimer quand inutiles\n6. Securite : proteger contre les acces non autorises\n\nDroits : acces, rectification, effacement, portabilite.\nCNIL : autorite francaise. Amende max : 4% CA mondial.' },
      { id:'N1', type:'notion', nom:'Cybersecurite',
        enonce:'Principales menaces :\nMalware : logiciel malveillant\n  - Virus : auto-replication\n  - Ransomware : chiffre les fichiers (Bitcoin)\n  - Spyware : espionne l\'utilisateur\n\nPhishing : email/SMS frauduleux imitant une entite connue.\nInjection SQL, XSS : attaques web.\nBrute force : essayer tous les mots de passe.\nMITM (Man-in-the-Middle) : interception communications.\n\nProtections :\nMFA, mots de passe forts, HTTPS, mises a jour, sauvegardes.' },
      { id:'N2', type:'notion', nom:'Intelligence artificielle',
        enonce:'IA = systemes simulant des capacites cognitives.\n\nMachine Learning (apprentissage automatique) :\n- Supervise : donnees etiquetees → classification\n- Non supervise : trouver des structures cachees\n- Renforcement : apprendre par essais/erreurs\n\nReseau de neurones :\n- Couche d\'entree → couches cachees → couche de sortie\n- Chaque neurone applique une fonction d\'activation\n- Entrainement par retropropagation du gradient\n\nBiais algorithmique :\n- IA reproduit les biais des donnees d\'entrainement\n- Ex: discrimination raciale dans les systemes de credit\n\nEnjeux : emploi, surveillance, deepfakes, desinformation.' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Audit RGPD d\'une application',
        enonce:'Application mobile collecte : nom, email, GPS en continu, contacts, photos, historique de navigation, identifiant publicitaire.\nAnalyser selon les principes RGPD.',
        correction:'Analyse RGPD :\n\nDonnees collectees et base legale necessaire :\n- Nom + email : necessaire si compte utilisateur ✓\n- GPS en continu : seulement si service de localisation utile\n  (pas en arriere-plan sans consentement) ⚠\n- Contacts : consentement explicit necessaire ⚠\n- Photos : consentement explicite ⚠\n- Historique navigation : consentement + droit a l\'oubli ⚠\n- Identifiant publicitaire : opt-in obligatoire depuis 2021 ⚠\n\nViolations probables :\n1. Collecte excessive (pas le minimum necessaire)\n2. Absence de consentement granulaire\n3. Conservation indefinie sans politique claire\n\nCorrections :\n- Demander permissions une a une avec explication\n- Option de refus de chaque permission\n- Politique de confidentialite claire et accessible' },
      { id:'EX02', niveau:'Intermediaire', titre:'Biais algorithmique',
        enonce:'Un algorithme de credit est entraine sur donnees historiques (1990-2010) ou les femmes avaient moins souvent acces au credit. Quels problemes et solutions ?',
        correction:'Probleme 1 : Biais historique reproduit\nL\'algo apprend que "femme → risque eleve"\nalors que c\'etait une discrimination historique,\npas une realite economique.\n\nProbleme 2 : Discrimination illegale\nRefuser un credit sur base du genre = illegal en France\net en Europe (article 225-1 Code penal).\n\nProbleme 3 : Perpetuation des inegalites\nL\'algo renforce la discrimination au lieu de la corriger.\n\nSolutions :\n1. Auditer les donnees d\'entrainement (reperer les biais)\n2. Supprimer les variables proxy du genre (prenom, adresse...)\n3. Tester l\'equite (meme precision pour tous les groupes)\n4. Equipes de dev diversifiees\n5. Explainability : pouvoir expliquer chaque decision\n6. Supervision humaine pour les decisions importantes' },
    ],
  },

  'projet-nsi': {
    ch:'D 07', titre:'Projet NSI', badge:'Obligatoire', duree:'~12h',
    desc:'Conception, developpement, tests et presentation d\'un projet complet.',
    theoremes:[
      { id:'D1', type:'def', nom:'Cahier des charges technique',
        enonce:'Document de reference du projet.\n\nSections :\n1. Contexte et problematique\n2. Objectifs et fonctionnalites (user stories)\n3. Contraintes : technologies, delais, equipe\n4. Architecture technique :\n   - Frontend : HTML/CSS/JS ou Python Tkinter\n   - Backend : Flask/Django ou scripts Python\n   - BDD : SQLite, PostgreSQL, JSON\n5. Maquettes (wireframes)\n6. Planning : jalons et repartition taches\n7. Criteres de validation\n\nEx user story :\n"En tant qu\'eleve, je veux voir mes notes par matiere\npour suivre mon evolution."' },
      { id:'N1', type:'notion', nom:'Architecture MVC',
        enonce:'MVC = Model-View-Controller\n\nModel : donnees et logique metier\n  - Classes Python, acces base de donnees\n  - Ex: class Eleve, def get_notes(eleve_id)\n\nView : interface utilisateur\n  - HTML/CSS/JS (web) ou Tkinter (bureau)\n  - Affiche les donnees, capte les entrees\n\nController : orchestration\n  - Recoit les requetes (routes Flask)\n  - Appelle le Model, retourne la View\n\nAvantages : separation des responsabilites,\nfacilite la maintenance et les tests.' },
      { id:'M1', type:'methode', nom:'Workflow Git collaboratif',
        enonce:'Workflow Feature Branch :\n\n1. Partir de main : git checkout main && git pull\n2. Creer une branche : git checkout -b feature/login\n3. Developper : modifier les fichiers\n4. Commiter : git add . && git commit -m "feat: ajout login"\n5. Pousser : git push origin feature/login\n6. Pull Request sur GitHub : description + screenshots\n7. Review par un coequipier\n8. Merge dans main apres validation\n9. Supprimer la branche : git branch -d feature/login\n\nConventions de commit :\nfeat: nouvelle fonctionnalite\nfix: correction de bug\ndocs: documentation\ntest: ajout de tests' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Choisir une architecture',
        enonce:'Projet : application web de gestion de bibliotheque (livres, emprunts, utilisateurs).\nProposer l\'architecture MVC et les technologies.',
        correction:'Architecture MVC :\n\nMODEL (Python) :\n- class Livre(id, titre, auteur, isbn, disponible)\n- class Utilisateur(id, nom, email)\n- class Emprunt(id, livre_id, user_id, date_debut, date_fin)\n- Fonctions : ajouter_livre(), emprunter(livre_id, user_id), rendre(emprunt_id)\n\nVIEW (HTML/CSS/Jinja2) :\n- index.html : liste des livres disponibles\n- livres.html : catalogue complet avec recherche\n- profil.html : emprunts en cours de l\'utilisateur\n- admin.html : gestion des livres\n\nCONTROLLER (Flask) :\n- GET /livres : afficher catalogue\n- POST /emprunter : traiter un emprunt\n- GET /profil : historique utilisateur\n\nBDD : SQLite (simple pour projet scolaire)\nTechnos : Flask + Jinja2 + SQLite + Bootstrap CSS' },
      { id:'EX02', niveau:'Intermediaire', titre:'Tests unitaires Python',
        enonce:'Ecrire des tests unitaires pytest pour une fonction moyenne(notes) qui calcule la moyenne d\'une liste de notes (0-20).',
        correction:'# fichier test_moyenne.py\nimport pytest\n\ndef moyenne(notes):\n    if not notes:\n        raise ValueError("Liste vide")\n    if any(n < 0 or n > 20 for n in notes):\n        raise ValueError("Note hors limites (0-20)")\n    return sum(notes) / len(notes)\n\n# Tests\ndef test_moyenne_simple():\n    assert moyenne([10, 14, 16]) == pytest.approx(13.33, rel=1e-2)\n\ndef test_moyenne_une_note():\n    assert moyenne([15]) == 15\n\ndef test_moyenne_zero():\n    assert moyenne([0, 0, 0]) == 0\n\ndef test_liste_vide():\n    with pytest.raises(ValueError, match="Liste vide"):\n        moyenne([])\n\ndef test_note_invalide():\n    with pytest.raises(ValueError):\n        moyenne([10, 25])  # 25 > 20 → erreur\n\n# Lancer : pytest test_moyenne.py -v' },
    ],
  },
}

export default function BacFranceInfoTerminaleSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)

  const color = SEC_COLOR[slug] || '#8b5cf6'
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  if (!ch) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>💻</div>
      <h2>Domaine en cours de redaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce domaine sera disponible prochainement.</p>
      <Link href="/bac-france/informatique/terminale" className="btn btn-primary">Retour Terminale NSI</Link>
    </div>
  )

  return (
    <>
      <Navbar />
      <main style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)' }}>

        <section style={{ padding:'80px clamp(20px,5vw,60px) 32px', borderBottom:'1px solid var(--border)', position:'relative' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${color},${color}88)` }} />
          <div style={{ maxWidth:900, margin:'0 auto' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--muted)', marginBottom:16, flexWrap:'wrap' }}>
              <Link href="/bac-france/informatique" style={{ color:'var(--muted)', textDecoration:'none' }}>Informatique France</Link>
              <span>›</span>
              <Link href="/bac-france/informatique/terminale" style={{ color:'var(--muted)', textDecoration:'none' }}>Terminale NSI</Link>
              <span>›</span>
              <span style={{ color:'var(--text2)' }}>{ch.titre}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12, flexWrap:'wrap' }}>
              <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color, fontWeight:700, background:`${color}18`, padding:'3px 10px', borderRadius:20 }}>{ch.ch}</span>
              <span style={{ fontSize:10, color:'var(--muted)', background:'var(--surface)', padding:'3px 10px', borderRadius:20 }}>NSI · Terminale</span>
              <span style={{ fontSize:10, color:'var(--muted)', background:'var(--surface)', padding:'3px 10px', borderRadius:20 }}>⏱ {ch.duree}</span>
              <span style={{ fontSize:10, color, background:`${color}15`, padding:'3px 10px', borderRadius:20, fontWeight:600 }}>{ch.badge}</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(22px,3.5vw,40px)', marginBottom:10 }}>{ch.titre}</h1>
            <p style={{ fontSize:14, color:'var(--text2)', maxWidth:700, lineHeight:1.6 }}>{ch.desc}</p>
          </div>
        </section>

        <div style={{ maxWidth:900, margin:'0 auto', padding:'32px clamp(20px,5vw,60px) 80px' }}>

          <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ color }}>📖</span> Cours complet
          </h2>
          <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:40 }}>
            {ch.theoremes.map((t) => (
              <div key={t.id} style={{ background:'var(--surface)', border:`1px solid ${C[t.type as keyof typeof C] || color}28`, borderLeft:`3px solid ${C[t.type as keyof typeof C] || color}`, borderRadius:12, padding:'16px 20px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <span style={{ fontSize:10, fontWeight:800, padding:'2px 10px', borderRadius:20, background:`${C[t.type as keyof typeof C] || color}18`, color:C[t.type as keyof typeof C] || color }}>
                    {L[t.type] || t.type}
                  </span>
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15 }}>{t.nom}</span>
                </div>
                <pre style={{ fontFamily:'var(--font-mono)', fontSize:12.5, color:'var(--text2)', whiteSpace:'pre-wrap', margin:0, lineHeight:1.65 }}>
                  {t.enonce}
                </pre>
              </div>
            ))}
          </div>

          {ch.exercices.length > 0 && (
            <>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ color }}>✏️</span> Exercices corriges
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
                {ch.exercices.map((ex) => (
                  <div key={ex.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
                    <button onClick={() => setOpenEx(openEx === ex.id ? null : ex.id)}
                      style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', background:'transparent', border:'none', cursor:'pointer', fontFamily:'var(--font-body)', color:'var(--text)' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20, fontWeight:700,
                          background: ex.niveau==='Facile' ? 'rgba(6,214,160,0.15)' : ex.niveau==='Intermediaire' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                          color: ex.niveau==='Facile' ? '#06d6a0' : ex.niveau==='Intermediaire' ? '#f59e0b' : '#ef4444' }}>
                          {ex.niveau}
                        </span>
                        <span style={{ fontWeight:600, fontSize:14 }}>{ex.titre}</span>
                      </div>
                      <span style={{ color:'var(--muted)', transition:'transform 0.2s', transform: openEx===ex.id ? 'rotate(180deg)' : 'none' }}>▼</span>
                    </button>
                    {openEx === ex.id && (
                      <div style={{ padding:'0 20px 20px', borderTop:'1px solid var(--border)' }}>
                        <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:8, padding:'12px 16px', marginBottom:12 }}>
                          <div style={{ fontSize:11, color:'var(--muted)', fontWeight:600, marginBottom:6 }}>ENONCE</div>
                          <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.7, margin:0 }}>{ex.enonce}</p>
                        </div>
                        <div style={{ background:`${color}10`, border:`1px solid ${color}25`, borderRadius:8, padding:'12px 16px' }}>
                          <div style={{ fontSize:11, color, fontWeight:700, marginBottom:6 }}>CORRECTION</div>
                          <pre style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text2)', whiteSpace:'pre-wrap', margin:0, lineHeight:1.6 }}>
                            {ex.correction}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{ background:'rgba(79,110,247,0.07)', border:'1px solid rgba(79,110,247,0.2)', borderRadius:12, padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, marginBottom:32 }}>
            <div>
              <div style={{ fontWeight:700, marginBottom:4 }}>🤖 Besoin d'aide sur un exercice ?</div>
              <div style={{ fontSize:13, color:'var(--muted)' }}>Le solveur IA resout pas a pas vos exercices NSI Terminale.</div>
            </div>
            <Link href={`/solve?q=${encodeURIComponent('NSI Terminale ' + ch.titre)}`} className="btn btn-primary">
              Resoudre un exercice →
            </Link>
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
            {prevSlug ? (
              <Link href={`/bac-france/informatique/terminale/${prevSlug}`}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text2)', textDecoration:'none', fontSize:13 }}>
                ← {TITRES[prevSlug]}
              </Link>
            ) : (
              <Link href="/bac-france/informatique/terminale"
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text2)', textDecoration:'none', fontSize:13 }}>
                ← Retour Terminale NSI
              </Link>
            )}
            {nextSlug && (
              <Link href={`/bac-france/informatique/terminale/${nextSlug}`}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:`1px solid ${color}40`, background:`${color}10`, color, textDecoration:'none', fontSize:13, fontWeight:600 }}>
                {TITRES[nextSlug]} →
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}