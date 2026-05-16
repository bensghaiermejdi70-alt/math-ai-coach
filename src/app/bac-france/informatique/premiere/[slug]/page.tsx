'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = { def:'#8b5cf6', notion:'#06b6d4', algo:'#10b981', formule:'#f59e0b', methode:'#ec4899' }
const L: Record<string,string> = { def:'Definition', notion:'Notion cle', algo:'Algorithme', formule:'A retenir', methode:'Methode' }

const NAV_ORDER = [
  'histoire-informatique','representation-donnees','traitement-donnees',
  'web-interaction','architecture-os','langages-programmation','algorithmique','projet'
]
const TITRES: Record<string,string> = {
  'histoire-informatique':"Histoire de l'informatique",
  'representation-donnees':'Representation des donnees',
  'traitement-donnees':'Traitement des donnees',
  'web-interaction':'Web et interaction',
  'architecture-os':"Architecture et OS",
  'langages-programmation':'Langages et Python',
  'algorithmique':'Algorithmique',
  'projet':'Projet informatique',
}
const SEC_COLOR: Record<string,string> = {
  'histoire-informatique':'#06b6d4','representation-donnees':'#8b5cf6',
  'traitement-donnees':'#10b981','web-interaction':'#f59e0b',
  'architecture-os':'#ef4444','langages-programmation':'#6366f1',
  'algorithmique':'#ec4899','projet':'#f59e0b',
}

type Theoreme = { id:string; type:string; nom:string; enonce:string }
type Exercice = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Chapitre = { ch:string; titre:string; badge:string; duree:string; desc:string; theoremes:Theoreme[]; exercices:Exercice[] }

const CHAPITRES: Record<string,Chapitre> = {
  'histoire-informatique': {
    ch:'CH 01', titre:"Histoire de l'informatique", badge:'Culture', duree:'~3h',
    desc:'Evolution des ordinateurs, grandes figures, architecture Von Neumann.',
    theoremes:[
      { id:'D1', type:'def', nom:'Les pionniers',
        enonce:'Blaise Pascal (1642) : Pascaline, premiere calculatrice mecanique.\nCharles Babbage (1837) : machine analytique (concept d\'ordinateur programmable).\nAda Lovelace : premier algorithme (pour la machine de Babbage).\nAlan Turing (1936) : machine de Turing, modele theorique universel.\nClaude Shannon (1948) : theorie de l\'information, bit.' },
      { id:'D2', type:'def', nom:'Generations d\'ordinateurs',
        enonce:'1ere gen (1945-1956) : tubes electroniques — ENIAC, UNIVAC.\n2eme gen (1956-1963) : transistors — plus petits, plus fiables.\n3eme gen (1963-1971) : circuits integres — miniaturisation.\n4eme gen (1971-) : microprocesseurs — Intel 4004, PC.\n5eme gen (actuel) : IA, cloud, calcul quantique.' },
      { id:'N1', type:'notion', nom:'Architecture Von Neumann',
        enonce:'Modele (1945) : unité centrale + memoire + E/S\n\nComposants :\n- UAL : operationsarithmetiques et logiques\n- UC (Unite de controle) : sequencement des instructions\n- Memoire : stockage programme + donnees\n- Bus : liaisons entre composants\n\nCycle machine :\nFetch (lire) → Decode → Execute → Store' },
      { id:'D3', type:'def', nom:'Langages de programmation',
        enonce:'Langage machine (binaire) → Assembleur → Langages haut niveau\n\nExemples :\n- Fortran (1957) : calcul scientifique\n- COBOL (1959) : gestion\n- C (1972) : systeme\n- Python (1991) : polyvalent\n- Java (1995) : portable\n\nCompile (C) : traduit en binaire avant execution.\nInterprete (Python) : execute ligne par ligne.' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Chronologie informatique',
        enonce:'Placer dans l\'ordre chronologique : transistor, machine de Turing, Python, ENIAC, microprocesseur Intel.',
        correction:'1936 : Machine de Turing (theorie)\n1945 : ENIAC (premier ordinateur electronique)\n1947 : Transistor (Bell Labs)\n1971 : Microprocesseur Intel 4004\n1991 : Python (Guido van Rossum)\n\nOrdre : machine Turing → ENIAC → transistor → Intel 4004 → Python' },
      { id:'EX02', niveau:'Intermediaire', titre:'Cycle machine Von Neumann',
        enonce:'Expliquer les 4 etapes du cycle machine pour executer l\'instruction : ADD R1, R2 (R1 = R1 + R2).',
        correction:'1. FETCH (Chercher) :\n   Le PC (Program Counter) pointe vers l\'instruction.\n   Instruction chargee depuis la memoire dans le registre IR.\n   PC incremente (pointe vers l\'instruction suivante).\n\n2. DECODE (Decoder) :\n   L\'UC interprete le code de l\'instruction.\n   Identifie : operation = ADD, operandes = R1, R2.\n\n3. EXECUTE (Executer) :\n   L\'UAL calcule R1 + R2.\n   Resultat stocke dans R1.\n\n4. STORE (Stocker) :\n   Resultat ecrit en memoire si necessaire.' },
    ],
  },
  'representation-donnees': {
    ch:'CH 02', titre:'Representation des donnees', badge:'Codage', duree:'~6h',
    desc:'Types Python, binaire, hexadecimal, texte ASCII et Unicode.',
    theoremes:[
      { id:'D1', type:'def', nom:'Types simples Python',
        enonce:'int : entier    ex: a = 42, b = -7\nfloat : reel    ex: pi = 3.14, x = -0.5\nbool : booleen  ex: True, False\nstr : chaine    ex: "Bonjour", \'NSI\'\n\nConversions :\nint("42")   → 42\nfloat("3.14") → 3.14\nstr(42)     → "42"\ntype(42)    → <class \'int\'>' },
      { id:'D2', type:'def', nom:'Types construits Python',
        enonce:'list : mutable, ordonnee\n  ex: [1, 2, 3], lst[0], lst.append(4)\n\ntuple : immuable, ordonne\n  ex: (1, 2, 3), t[0]\n\ndict : cles/valeurs\n  ex: {"nom": "Alice", "age": 16}\n  d["nom"] → "Alice"\n\nset : ensemble sans doublon\n  ex: {1, 2, 3}, ajouter avec .add()' },
      { id:'N1', type:'notion', nom:'Codage binaire',
        enonce:'Bit = 0 ou 1 (plus petite information).\nOctet = 8 bits → 256 valeurs (0 a 255).\n\nBinaire → Decimal :\n1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11\n1101₂ = 1×8 + 1×4 + 0×2 + 1×1 = 13\n\nDecimal → Binaire (divisions par 2) :\n13 ÷ 2 = 6 r 1\n6  ÷ 2 = 3 r 0\n3  ÷ 2 = 1 r 1\n1  ÷ 2 = 0 r 1\n13 = 1101₂  (lire les restes de bas en haut)' },
      { id:'N2', type:'notion', nom:'Codage du texte',
        enonce:'ASCII (1963) : 128 caracteres codes sur 7 bits.\nEx: A=65, B=66, a=97, 0=48\n\nLimites ASCII : pas d\'accents, pas de caracteres non latins.\n\nUnicode : standard universel (140 000+ caracteres).\nUTF-8 : encodage variable (1 a 4 octets), compatible ASCII.\n\nPython :\nord("A") → 65\nchr(65) → "A"\nlen("Bonjour") → 7' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Conversion binaire',
        enonce:'Q1: Convertir 25 en binaire.\nQ2: Convertir 11010₂ en decimal.\nQ3: Quelle est la valeur max sur 8 bits ?',
        correction:'Q1: 25 en binaire\n25 ÷ 2 = 12 r 1\n12 ÷ 2 = 6  r 0\n6  ÷ 2 = 3  r 0\n3  ÷ 2 = 1  r 1\n1  ÷ 2 = 0  r 1\n25 = 11001₂\n\nQ2: 11010₂ = 1×16 + 1×8 + 0×4 + 1×2 + 0×1 = 26\n\nQ3: 11111111₂ = 255 (valeur max sur 8 bits)' },
      { id:'EX02', niveau:'Facile', titre:'Types Python',
        enonce:'Donner le type de chaque valeur Python :\n3.14 | "hello" | True | [1,2,3] | {"a":1} | (1,2)',
        correction:'3.14      → float\n"hello"   → str\nTrue      → bool\n[1,2,3]   → list\n{"a":1}   → dict\n(1,2)     → tuple' },
      { id:'EX03', niveau:'Intermediaire', titre:'Codage ASCII',
        enonce:'Q1: Donner les codes ASCII de H, i, !\nQ2: Decoder le message ASCII : 78 83 73\nQ3: Pourquoi UTF-8 a remplace ASCII ?',
        correction:'Q1:\nH = 72\ni = 105\n! = 33\n\nQ2: 78=N, 83=S, 73=I → "NSI"\n\nQ3: ASCII ne code que 128 caracteres (lettres latines).\nUTF-8 code 140 000+ caracteres : accents, arabe,\nchinois, emojis...\nUTF-8 est compatible ASCII (memes codes 0-127).' },
    ],
  },
  'traitement-donnees': {
    ch:'CH 03', titre:'Traitement des donnees', badge:'Donnees', duree:'~5h',
    desc:'Tables CSV, operations Python : selection, tri, agregation, jointure.',
    theoremes:[
      { id:'D1', type:'def', nom:'Tables de donnees (CSV)',
        enonce:'CSV = Comma-Separated Values.\nLigne 1 = en-tetes (noms des colonnes).\nLignes suivantes = enregistrements.\n\nEx fichier notes.csv :\nnom,matiere,note\nAlice,Maths,15\nBob,Maths,12\nAlice,NSI,18\n\nEn Python :\nimport csv\nwith open("notes.csv") as f:\n    data = list(csv.DictReader(f))' },
      { id:'N1', type:'notion', nom:'Operations sur les tables',
        enonce:'Selection (filtre) :\n[e for e in table if e["note"] >= 10]\n\nProjection :\n[e["nom"] for e in table]\n\nTri :\nsorted(table, key=lambda e: e["note"], reverse=True)\n\nAggregation :\nnotes = [e["note"] for e in table]\nmoyenne = sum(notes) / len(notes)' },
      { id:'N2', type:'notion', nom:'Jointure de tables',
        enonce:'Jointure = relier 2 tables par une cle commune.\n\nEx:\neleves = [{"id":1,"nom":"Alice"}, {"id":2,"nom":"Bob"}]\nnotes  = [{"id_eleve":1,"note":15}, {"id_eleve":2,"note":12}]\n\nJointure :\n[{"nom":e["nom"],"note":n["note"]}\n for e in eleves\n for n in notes\n if e["id"] == n["id_eleve"]]' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Filtrer une table',
        enonce:'Table : [{nom:"Alice",note:15},{nom:"Bob",note:9},{nom:"Clara",note:12}]\nQ1: Selectionner les eleves avec note >= 10.\nQ2: Trier par note decroissante.\nQ3: Calculer la moyenne.',
        correction:'Q1: Selection note >= 10\n[e for e in table if e["note"] >= 10]\n→ [{"nom":"Alice","note":15}, {"nom":"Clara","note":12}]\n\nQ2: Tri decroissant\nsorted(table, key=lambda e:e["note"], reverse=True)\n→ Alice(15), Clara(12), Bob(9)\n\nQ3: Moyenne\nsum(e["note"] for e in table) / len(table)\n= (15+9+12)/3 = 12.0' },
      { id:'EX02', niveau:'Intermediaire', titre:'Traiter un fichier CSV',
        enonce:'Ecrire le code Python pour lire "eleves.csv" et afficher le nom de l\'eleve avec la meilleure note.',
        correction:'import csv\n\nwith open("eleves.csv", encoding="utf-8") as f:\n    data = list(csv.DictReader(f))\n\n# Convertir les notes en entiers\nfor e in data:\n    e["note"] = int(e["note"])\n\n# Trouver le maximum\nmeilleur = max(data, key=lambda e: e["note"])\nprint(f"Meilleur eleve : {meilleur[\'nom\']} ({meilleur[\'note\']})")' },
    ],
  },
  'web-interaction': {
    ch:'CH 04', titre:'Web et interaction', badge:'HTTP', duree:'~4h',
    desc:'Protocole HTTP, client/serveur, formulaires HTML, cookies.',
    theoremes:[
      { id:'D1', type:'def', nom:'Protocole HTTP',
        enonce:'HTTP = HyperText Transfer Protocol\nHTTPS = HTTP + chiffrement TLS\n\nMethodes :\n- GET : recuperer une ressource (URL visible)\n- POST : envoyer des donnees (corps de la requete)\n- PUT : modifier, DELETE : supprimer\n\nCodes de statut :\n200 : OK\n301/302 : Redirection\n404 : Not Found\n500 : Server Error' },
      { id:'N1', type:'notion', nom:'Architecture client/serveur',
        enonce:'Client (navigateur) :\n1. Resout le DNS (domaine → IP)\n2. Etablit une connexion TCP\n3. Envoie une requete HTTP\n4. Recoit la reponse et affiche\n\nServeur :\n1. Ecoute sur le port 80 (HTTP) ou 443 (HTTPS)\n2. Recoit la requete\n3. Traite (acces BDD, logique metier)\n4. Renvoie la reponse HTTP\n\nStateless : chaque requete est independante.' },
      { id:'N2', type:'notion', nom:'Formulaires HTML',
        enonce:'<form action="/traitement" method="POST">\n  <input type="text" name="nom" placeholder="Votre nom">\n  <input type="email" name="email">\n  <input type="password" name="mdp">\n  <select name="classe">\n    <option value="1">Premiere</option>\n    <option value="2">Terminale</option>\n  </select>\n  <input type="submit" value="Envoyer">\n</form>\n\nGET : donnees dans l\'URL (?nom=Alice&email=...)\nPOST : donnees dans le corps (plus securise)' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Analyser une requete HTTP',
        enonce:'Requete : GET /search?q=python HTTP/1.1\nHost: www.google.fr\nUser-Agent: Firefox/120\n\nQ1: Methode ? Q2: Ressource demandee ? Q3: Parametre de recherche ?',
        correction:'Q1: Methode = GET (recuperation de ressource)\n\nQ2: Ressource = /search (page de resultats)\n\nQ3: Parametre q = "python"\n(q est le parametre de recherche Google)\n\nURL complete : https://www.google.fr/search?q=python\nReponse attendue : 200 OK + page HTML des resultats' },
      { id:'EX02', niveau:'Intermediaire', titre:'GET vs POST',
        enonce:'Pour chaque cas, choisir GET ou POST et justifier :\na) Rechercher "cours NSI" sur un moteur\nb) Se connecter avec login/mdp\nc) Consulter la fiche produit d\'un article\nd) Envoyer un formulaire de commande',
        correction:'a) Recherche → GET\nLes resultats de recherche sont partageables via URL.\nPas de donnees sensibles.\n\nb) Connexion → POST\nMot de passe ne doit pas apparaitre dans l\'URL.\nDonnees dans le corps de la requete.\n\nc) Fiche produit → GET\nPage consultable, URL partageable, pas de modification.\n\nd) Commande → POST\nModification de la base de donnees.\nDonnees personnelles et bancaires a proteger.' },
    ],
  },
  'architecture-os': {
    ch:'CH 05', titre:"Architecture et Systemes d'exploitation", badge:'Systeme', duree:'~5h',
    desc:'CPU, memoire, OS, processus, systeme de fichiers.',
    theoremes:[
      { id:'D1', type:'def', nom:'Architecture materielle',
        enonce:'CPU (processeur) : execute les instructions — mesure en GHz.\nRAM : memoire vive temporaire — rapide mais volatile.\nSSD/HDD : stockage permanent — lent mais durable.\n\nHierarchie memoire (rapide → lent) :\nRegistres CPU → Cache L1/L2/L3 → RAM → SSD → HDD\n\nBus : liaison entre CPU, memoire et peripheriques.\nGPU : processeur graphique (calculs paralleles).' },
      { id:'D2', type:'def', nom:"Systeme d'exploitation (OS)",
        enonce:'OS = logiciel de base qui gere le materiel.\nExemples : Windows, Linux, macOS, Android.\n\nRoles :\n- Gestion des processus (multitache)\n- Gestion de la memoire (allocation)\n- Gestion du systeme de fichiers\n- Gestion des peripheriques (drivers)\n- Interface utilisateur (CLI ou GUI)\n\nNoyau (kernel) : partie basse, communique avec le materiel.' },
      { id:'N1', type:'notion', nom:'Processus et multitache',
        enonce:'Processus = programme en cours d\'execution.\nPID : identifiant unique (ex: ps aux sous Linux).\n\nEtats d\'un processus :\nNouveau → Pret → En execution → Bloque → Termine\n\nMultitache : CPU alterne rapidement entre processus.\nThread : sous-processus partageant la memoire.\n\nOrdonnancement Round-Robin :\nChaque processus a un quantum de temps CPU.' },
      { id:'N2', type:'notion', nom:'Systeme de fichiers',
        enonce:'Arborescence : repertoires et fichiers.\nChemin absolu : /home/user/Documents/fichier.txt\nChemin relatif : ../Documents/fichier.txt\n\nCommandes Unix essentielles :\nls    : lister le contenu\ncd    : changer de repertoire\nmkdir : creer un repertoire\ncp    : copier\nmv    : deplacer/renommer\nrm    : supprimer\ncat   : afficher\n\nDroits : r (lecture) w (ecriture) x (execution)' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Hierarchie memoire',
        enonce:'Classer de la plus rapide a la plus lente : SSD, RAM, registres CPU, cache L1, disque dur.',
        correction:'De la plus rapide a la plus lente :\n\n1. Registres CPU (< 1 ns, quelques dizaines d\'octets)\n2. Cache L1 (< 1 ns, 32-64 Ko)\n3. Cache L2/L3 (1-10 ns, quelques Mo)\n4. RAM (10-100 ns, 4-64 Go)\n5. SSD (0.1-1 ms, 256 Go - 4 To)\n6. Disque dur HDD (5-15 ms, 1-20 To)\n\nRapidite ≈ inverse de la taille.' },
      { id:'EX02', niveau:'Intermediaire', titre:'Commandes Linux',
        enonce:'Ecrire les commandes Linux pour :\n1. Aller dans /home/user/Documents\n2. Creer un dossier "Projet_NSI"\n3. Creer le fichier main.py\n4. Lister le contenu avec droits\n5. Copier main.py vers ../Backup/',
        correction:'1. cd /home/user/Documents\n2. mkdir Projet_NSI\n3. touch Projet_NSI/main.py\n   (ou echo "" > Projet_NSI/main.py)\n4. ls -la\n   (affiche droits, taille, dates)\n5. cp Projet_NSI/main.py ../Backup/main.py' },
    ],
  },
  'langages-programmation': {
    ch:'CH 06', titre:'Langages et Programmation Python', badge:'Python', duree:'~8h',
    desc:'Variables, conditions, boucles, fonctions, modules Python.',
    theoremes:[
      { id:'D1', type:'def', nom:'Variables et types',
        enonce:'# Affectation\nx = 5           # int\nnom = "Alice"   # str\npr = 3.14       # float\nok = True       # bool\n\n# Verification\ntype(x)                 → <class \'int\'>\nisinstance(x, int)      → True\n\n# Operateurs arithmetiques\n+ - * / // % **\n# // : division entiere, % : modulo, ** : puissance' },
      { id:'N1', type:'notion', nom:'Conditions et boucles',
        enonce:'Conditions :\nif note >= 10:\n    print("Admis")\nelif note >= 8:\n    print("Rattrapage")\nelse:\n    print("Refuse")\n\nBoucle bornee :\nfor i in range(5):     # 0,1,2,3,4\n    print(i)\n\nBoucle non bornee :\nwhile n > 0:\n    n = n // 2\n\nbreak : sortir | continue : passer' },
      { id:'D2', type:'def', nom:'Fonctions',
        enonce:'# Definition\ndef carre(x):\n    return x ** 2\n\n# Parametres par defaut\ndef saluer(nom, titre="M."):\n    return f"Bonjour {titre} {nom}"\n\n# Plusieurs valeurs de retour\ndef divmod_entier(a, b):\n    return a // b, a % b\n\nq, r = divmod_entier(17, 5)  # q=3, r=2\n\n# Docstring\ndef aire(l, h):\n    """Calcule l\'aire d\'un rectangle.\"\"\"\n    return l * h' },
      { id:'M1', type:'methode', nom:'Deboguer un programme Python',
        enonce:'Types d\'erreurs :\n1. SyntaxError : parenthese manquante, indentation\n2. NameError : variable non definie\n3. TypeError : operation sur types incompatibles\n4. IndexError : indice hors limites\n5. KeyError : cle absente dans un dictionnaire\n\nTechniques de debug :\n- Ajouter des print() intermediaires\n- Lire le message d\'erreur (ligne + type)\n- Tester avec des valeurs simples\n- Utiliser assert pour verifier les conditions' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Fonctions Python',
        enonce:'Ecrire les fonctions Python suivantes :\n1. estPair(n) : renvoie True si n est pair\n2. maximum(a, b, c) : renvoie le maximum de 3 nombres\n3. compteMots(phrase) : compte les mots',
        correction:'# 1. estPair\ndef estPair(n):\n    return n % 2 == 0\n# Test : estPair(4) → True, estPair(7) → False\n\n# 2. maximum\ndef maximum(a, b, c):\n    return max(a, b, c)\n# Ou sans max() :\n# if a >= b and a >= c: return a\n# elif b >= c: return b\n# else: return c\n\n# 3. compteMots\ndef compteMots(phrase):\n    return len(phrase.split())\n# Test : compteMots("Bonjour tout le monde") → 4' },
      { id:'EX02', niveau:'Intermediaire', titre:'Manipulation de listes',
        enonce:'Ecrire en Python :\n1. Calculer la somme d\'une liste de nombres\n2. Supprimer les doublons d\'une liste\n3. Inverser une liste sans utiliser reverse()',
        correction:'# 1. Somme\ndef somme(lst):\n    return sum(lst)\n# Ou : total = 0; for x in lst: total += x\n\n# 2. Sans doublons\ndef sans_doublons(lst):\n    return list(set(lst))\n# Ou pour preserver l\'ordre :\n# vu = []; [vu.append(x) for x in lst if x not in vu]\n\n# 3. Inverser\ndef inverser(lst):\n    return lst[::-1]\n# Ou : return [lst[i] for i in range(len(lst)-1, -1, -1)]' },
    ],
  },
  'algorithmique': {
    ch:'CH 07', titre:'Algorithmique', badge:'Algo', duree:'~6h',
    desc:'Recherche sequentielle et dichotomique, tri par selection et insertion.',
    theoremes:[
      { id:'D1', type:'def', nom:'Recherche sequentielle',
        enonce:'Parcourir la liste element par element.\nComplexite : O(n) — n comparaisons au pire.\n\ndef recherche_seq(lst, valeur):\n    for i in range(len(lst)):\n        if lst[i] == valeur:\n            return i  # indice trouvé\n    return -1  # absent\n\nFonctionne sur n\'importe quelle liste (meme non triee).' },
      { id:'D2', type:'def', nom:'Recherche dichotomique',
        enonce:'Necessite un tableau TRIE.\nDivise l\'espace de recherche en deux a chaque etape.\nComplexite : O(log n)\n\ndef recherche_dicho(lst, valeur):\n    g, d = 0, len(lst) - 1\n    while g <= d:\n        m = (g + d) // 2\n        if lst[m] == valeur: return m\n        elif lst[m] < valeur: g = m + 1\n        else: d = m - 1\n    return -1\n\n1 million d\'elements → max 20 etapes.' },
      { id:'N1', type:'notion', nom:'Tri par selection',
        enonce:'Principe : chercher le minimum dans le reste, le placer en tete.\n\ndef tri_selection(lst):\n    n = len(lst)\n    for i in range(n):\n        i_min = i\n        for j in range(i+1, n):\n            if lst[j] < lst[i_min]:\n                i_min = j\n        lst[i], lst[i_min] = lst[i_min], lst[i]\n    return lst\n\nComplexite : O(n²)\nn(n-1)/2 comparaisons.' },
      { id:'N2', type:'notion', nom:'Tri par insertion',
        enonce:'Principe : inserer chaque element a sa bonne place (comme des cartes).\n\ndef tri_insertion(lst):\n    for i in range(1, len(lst)):\n        cle = lst[i]\n        j = i - 1\n        while j >= 0 and lst[j] > cle:\n            lst[j+1] = lst[j]\n            j -= 1\n        lst[j+1] = cle\n    return lst\n\nComplexite : O(n²) au pire, O(n) si deja trie.\nStable : preserve l\'ordre des elements egaux.' },
      { id:'F1', type:'formule', nom:'Comparaison des complexites',
        enonce:'O(1)     : constant — acces tableau par indice\nO(log n) : logarithmique — dichotomie\nO(n)     : lineaire — recherche sequentielle\nO(n²)    : quadratique — tris basiques\n\nPour n = 1 000 000 :\nO(1)     → 1 operation\nO(log n) → ~20 operations\nO(n)     → 1 000 000 operations\nO(n²)    → 10¹² operations (TRES lent)' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Trace de tri par selection',
        enonce:'Tracer le tri par selection de la liste : [5, 2, 8, 1, 9, 3]\nMontrer chaque etape (echange effectue).',
        correction:'Liste initiale : [5, 2, 8, 1, 9, 3]\n\nEtape 1 : minimum = 1 (indice 3) ↔ [0]\n→ [1, 2, 8, 5, 9, 3]\n\nEtape 2 : minimum = 2 (indice 1) → deja en place\n→ [1, 2, 8, 5, 9, 3]\n\nEtape 3 : minimum = 3 (indice 5) ↔ [2]\n→ [1, 2, 3, 5, 9, 8]\n\nEtape 4 : minimum = 5 (indice 3) → deja en place\n→ [1, 2, 3, 5, 9, 8]\n\nEtape 5 : minimum = 8 (indice 5) ↔ [4]\n→ [1, 2, 3, 5, 8, 9]\n\nListe finale : [1, 2, 3, 5, 8, 9]' },
      { id:'EX02', niveau:'Intermediaire', titre:'Dichotomie - analyse',
        enonce:'Liste triee : [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nRechercher la valeur 23 par dichotomie. Montrer toutes les etapes.',
        correction:'lst = [2,5,8,12,16,23,38,56,72,91]\nRecherche de 23.\n\nEtape 1 : g=0, d=9, m=4, lst[4]=16\n16 < 23 → g = 5\n\nEtape 2 : g=5, d=9, m=7, lst[7]=56\n56 > 23 → d = 6\n\nEtape 3 : g=5, d=6, m=5, lst[5]=23\n23 == 23 → TROUVE, indice = 5 ✓\n\n3 etapes suffisent pour 10 elements.\nPour 1 000 elements : max 10 etapes.' },
    ],
  },
  'projet': {
    ch:'CH 08', titre:'Projet informatique', badge:'Projet', duree:'~10h',
    desc:'Conception, developpement et presentation d\'un projet en groupe.',
    theoremes:[
      { id:'D1', type:'def', nom:'Cahier des charges',
        enonce:'Document qui definit ce que doit faire le projet.\n\nContenu :\n1. Contexte et objectifs\n2. Liste des fonctionnalites (user stories)\n3. Contraintes techniques\n4. Maquettes (wireframes)\n5. Repartition des taches\n6. Planning (jalons)\n\nEx user story :\n"En tant qu\'utilisateur, je veux pouvoir\ncreeer un compte avec email et mot de passe."' },
      { id:'N1', type:'notion', nom:'Git et GitHub',
        enonce:'Git = outil de controle de version.\nGitHub = plateforme d\'hebergement de depots Git.\n\nCommandes essentielles :\ngit init          : initialiser un depot\ngit add .         : ajouter tous les fichiers\ngit commit -m "msg" : sauvegarder un etat\ngit push          : envoyer vers GitHub\ngit pull          : recuperer les changements\ngit branch nom    : creer une branche\ngit merge nom     : fusionner une branche' },
      { id:'M1', type:'methode', nom:'Presenter son projet',
        enonce:'Structure d\'une bonne presentation (10 min) :\n1. Contexte : quel probleme resout votre projet ?\n2. Demo fonctionnelle : montrer ce qui marche.\n3. Architecture technique : schema des composants.\n4. Choix techniques : pourquoi ce langage, ce framework ?\n5. Difficultes rencontrees et solutions.\n6. Ce qui pourrait etre ameliore.\n7. Questions-reponses : anticiper les questions.' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Choisir un type de projet',
        enonce:'Proposer 3 idees de projet NSI realistes en 2 mois, avec les technologies utilisees.',
        correction:'Idee 1 : Application de quiz culture generale\nTechnologies : Python + Tkinter (GUI) ou Flask + HTML/CSS\nFonctionnalites : questions aléatoires, score, chronometre\n\nIdee 2 : Gestionnaire de taches (To-Do)\nTechnologies : HTML/CSS/JavaScript + LocalStorage\nFonctionnalites : ajouter/supprimer/cocher des taches\n\nIdee 3 : Analyseur de CSV (notes de classe)\nTechnologies : Python + matplotlib + csv\nFonctionnalites : moyenne, histogramme, export PDF' },
      { id:'EX02', niveau:'Intermediaire', titre:'Workflow Git',
        enonce:'Alice et Bob travaillent sur le meme projet GitHub. Bob modifie le fichier app.py. Ecrire les commandes Git pour : creer une branche, coder, commiter, merger dans main.',
        correction:'# 1. Bob cree une branche de travail\ngit checkout -b feature/ajout-login\n\n# 2. Bob code et modifie app.py\n# ... modifications dans app.py ...\n\n# 3. Bob sauvegarde\ngit add app.py\ngit commit -m "feat: ajout systeme de login"\n\n# 4. Bob envoie vers GitHub\ngit push origin feature/ajout-login\n\n# 5. Bob ouvre une Pull Request sur GitHub\n# Alice revise le code\n\n# 6. Merge dans main (sur GitHub ou en CLI)\ngit checkout main\ngit merge feature/ajout-login\ngit push origin main' },
    ],
  },
}

export default function BacFranceInfoPremiereSlugPage() {
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
      <h2>Chapitre en cours de redaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/informatique/premiere" className="btn btn-primary">Retour Premiere NSI</Link>
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
              <Link href="/bac-france/informatique/premiere" style={{ color:'var(--muted)', textDecoration:'none' }}>Premiere NSI</Link>
              <span>›</span>
              <span style={{ color:'var(--text2)' }}>{ch.titre}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12, flexWrap:'wrap' }}>
              <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color, fontWeight:700, background:`${color}18`, padding:'3px 10px', borderRadius:20 }}>{ch.ch}</span>
              <span style={{ fontSize:10, color:'var(--muted)', background:'var(--surface)', padding:'3px 10px', borderRadius:20 }}>NSI · Premiere</span>
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
              <div style={{ fontSize:13, color:'var(--muted)' }}>Le solveur IA resout pas a pas vos exercices NSI.</div>
            </div>
            <Link href={`/solve?q=${encodeURIComponent('NSI Premiere ' + ch.titre)}`} className="btn btn-primary">
              Resoudre un exercice →
            </Link>
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
            {prevSlug ? (
              <Link href={`/bac-france/informatique/premiere/${prevSlug}`}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text2)', textDecoration:'none', fontSize:13 }}>
                ← {TITRES[prevSlug]}
              </Link>
            ) : (
              <Link href="/bac-france/informatique/premiere"
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text2)', textDecoration:'none', fontSize:13 }}>
                ← Retour Premiere NSI
              </Link>
            )}
            {nextSlug && (
              <Link href={`/bac-france/informatique/premiere/${nextSlug}`}
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