'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// NSI PREMIÈRE — INFORMATIQUE FRANCE / [SLUG]
// Route : /bac-france/informatique/premiere/[slug]
// Spécialité NSI · 4h/semaine · Bac 2027
// 8 chapitres : Histoire + Représentation + Traitement + Web +
//               Architecture + Python + Algo + Projet
// ══════════════════════════════════════════════════════════════════════

const C = {
  def:'#8b5cf6', notion:'#06b6d4', algo:'#10b981',
  formule:'#f59e0b', methode:'#ec4899', prop:'#f97316'
}
const L: Record<string,string> = {
  def:'Définition', notion:'Notion clé', algo:'Algorithme',
  formule:'À retenir', methode:'Méthode', prop:'Propriété'
}

const NAV_ORDER = [
  'histoire-informatique','representation-donnees','traitement-donnees',
  'web-interaction','architecture-os','langages-programmation','algorithmique','projet'
]

const TITRES_NAV: Record<string,string> = {
  'histoire-informatique':   "CH 01 — Histoire de l'informatique",
  'representation-donnees':  'CH 02 — Représentation des données',
  'traitement-donnees':      'CH 03 — Traitement des données',
  'web-interaction':         'CH 04 — Web & Interaction',
  'architecture-os':         "CH 05 — Architecture & OS",
  'langages-programmation':  'CH 06 — Langages & Python',
  'algorithmique':           'CH 07 — Algorithmique',
  'projet':                  'CH 08 — Projet informatique',
}

const SEC_COLORS: Record<string,string> = {
  'histoire-informatique':'#06b6d4','representation-donnees':'#8b5cf6',
  'traitement-donnees':'#10b981','web-interaction':'#f59e0b',
  'architecture-os':'#ef4444','langages-programmation':'#6366f1',
  'algorithmique':'#ec4899','projet':'#f59e0b',
}

const BADGES: Record<string,string> = {
  'projet':'🔥 Important',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — HISTOIRE DE L'INFORMATIQUE
// ─────────────────────────────────────────────────────────────────────
'histoire-informatique': {
  id:'histoire-informatique', emoji:'🏛️', color:'#06b6d4',
  titre:"Histoire de l'informatique",
  desc:"Pionniers (Turing, Lovelace, Shannon), générations d'ordinateurs, architecture Von Neumann, langages de programmation.",
  souschapitres:[
    {
      id:'sc-hist1', titre:'1.1 Pionniers et générations',
      notions:['Pascaline (1642), Babbage, Ada Lovelace (1ᵉʳ algo)','Alan Turing (1936) : machine de Turing','Shannon (1948) : théorie de l\'information, bit','5 générations : tubes → transistors → CI → microproc → IA'],
      blocs:[
        {
          notion:'🏛️ Pionniers et générations',
          theoremes:[
            { id:'D-H1', type:'def', nom:'Les grandes figures de l\'informatique',
              enonce:"Blaise Pascal (1642) : Pascaline, première calculatrice mécanique.\n\nCharles Babbage (1837) : machine analytique\n(concept d'ordinateur programmable — jamais terminé)\n\nAda Lovelace (1843) : premier algorithme\n(pour calculer les nombres de Bernoulli sur la machine de Babbage)\n→ Considérée comme la première programmatrice\n\nAlan Turing (1936) : machine de Turing\n(modèle théorique universel de calcul)\n→ Père de l'informatique théorique\n→ Décryptage Enigma (WWII)\n\nClaude Shannon (1948) : théorie de l'information\n→ Le bit (binary digit) = unité d'information\n→ Fondements du codage numérique\n\nGrace Hopper : premier compilateur (A-0, 1952)\n→ Inventé le terme 'bug' (vrai insecte dans le calculateur)" },
            { id:'D-H2', type:'def', nom:'5 générations d\'ordinateurs',
              enonce:"1ère génération (1945-1956) :\nTubes électroniques — ENIAC (18 000 tubes, 30 tonnes)\nVitesse : milliers d'opérations/s\n\n2ème génération (1956-1963) :\nTransistors — plus petits, moins chauds, plus fiables\nVitesse : millions d'opérations/s\n\n3ème génération (1963-1971) :\nCircuits intégrés — miniaturisation\n\n4ème génération (1971- ) :\nMicroprocesseurs — Intel 4004 (1971)\nPC personnels : Apple, IBM PC\n\n5ème génération (actuel) :\nIA, cloud, calcul quantique, IoT" },
          ],
          exercices:[
            { id:'EX-H1', niveau:'Facile', titre:'Chronologie informatique',
              enonce:"Placer dans l'ordre chronologique :\nPython, machine de Turing, ENIAC, transistor, Intel 4004, Ada Lovelace",
              correction:"1843 : Ada Lovelace (premier algorithme)\n1936 : Machine de Turing (théorie)\n1945 : ENIAC (premier ordinateur électronique)\n1947 : Transistor (Bell Labs)\n1971 : Microprocesseur Intel 4004\n1991 : Python (Guido van Rossum)" },
          ]
        },
      ]
    },
    {
      id:'sc-hist2', titre:'1.2 Architecture Von Neumann et langages',
      notions:['UC (UAL + contrôle) + Mémoire + E/S + Bus','Cycle : Fetch → Decode → Execute','Compilé (C) vs Interprété (Python)','Fortran (1957), C (1972), Python (1991), Java (1995)'],
      blocs:[
        {
          notion:'⚙️ Von Neumann et langages',
          theoremes:[
            { id:'N-H1', type:'notion', nom:'Architecture Von Neumann',
              enonce:"Modèle (1945) : unité centrale + mémoire + E/S\n\nCOMPOSANTS :\n• UAL : opérations arithmétiques et logiques\n• Unité de contrôle : séquencement des instructions\n• Mémoire centrale : stockage programme + données\n• Bus : liaisons entre composants\n\nCYCLE MACHINE :\nFetch (lire instruction) → Decode → Execute → Store\n→ Répété des milliards de fois par seconde\n\nREGISTRES :\nPC (Program Counter) : adresse de la prochaine instruction\nIR (Instruction Register) : instruction en cours\nACC (Accumulateur) : résultat courant" },
            { id:'D-H3', type:'def', nom:'Langages de programmation',
              enonce:"Langage machine (binaire) → Assembleur → Langages haut niveau\n\nEXEMPLES HISTORIQUES :\nFortran (1957) : premier langage haut niveau (calcul scientifique)\nCOBOL (1959) : gestion d'entreprise\nC (1972) : systèmes, proche du matériel\nC++ (1983) : orienté objet\nPython (1991) : polyvalent, lisible\nJava (1995) : portable, 'Write once, run anywhere'\n\nCOMPILÉ vs INTERPRÉTÉ :\nCompilé (C, C++) : traduit en binaire AVANT exécution\n→ Plus rapide à l'exécution\n\nInterprété (Python) : traduit ligne par ligne PENDANT l'exécution\n→ Plus souple, plus lent" },
          ],
          exercices:[
            { id:'EX-H2', niveau:'Intermédiaire', titre:'Cycle Von Neumann',
              enonce:"Décrire les 4 étapes du cycle machine pour exécuter : ADD R1, R2 (R1 = R1 + R2).",
              correction:"1. FETCH (Chercher) :\n   PC pointe vers l'instruction en mémoire.\n   Instruction chargée dans le registre IR.\n   PC incrémenté (prochaine instruction).\n\n2. DECODE (Décoder) :\n   L'UC interprète l'instruction.\n   Identifie : opération=ADD, opérandes=R1, R2.\n\n3. EXECUTE (Exécuter) :\n   L'UAL calcule R1 + R2.\n   Résultat dans R1.\n\n4. STORE (Stocker) :\n   Résultat écrit en mémoire si nécessaire." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — REPRÉSENTATION DES DONNÉES
// ─────────────────────────────────────────────────────────────────────
'representation-donnees': {
  id:'representation-donnees', emoji:'🔢', color:'#8b5cf6',
  titre:'Représentation des données',
  desc:"Types Python (int, float, bool, str, list, dict, tuple, set), codage binaire et hexadécimal, texte ASCII et Unicode (UTF-8).",
  souschapitres:[
    {
      id:'sc-rep1', titre:'2.1 Types Python simples et construits',
      notions:['int, float, bool, str (immuables)','list : mutable, ordonnée — [1,2,3]','dict : clés/valeurs — {"a":1}','tuple (immuable) et set (sans doublon)'],
      blocs:[
        {
          notion:'🐍 Types de données Python',
          theoremes:[
            { id:'D-R1', type:'def', nom:'Types simples',
              enonce:"int : entier    ex: a = 42, b = -7, c = 0\nfloat : réel    ex: pi = 3.14, x = -0.5, e = 2.718\nbool : booléen  ex: True, False\nstr : chaîne    ex: 'Bonjour', 'NSI'\n\nCONVERSIONS :\nint('42')    → 42\nfloat('3.14')→ 3.14\nstr(42)      → '42'\nbool(0)      → False ; bool(1) → True\n\nTYPE et TEST :\ntype(42)             → <class 'int'>\nisinstance(42, int)  → True\n\nOPÉRATEURS arithmétiques :\n+ - * /  //  %  **\n# // : division entière\n# %  : modulo (reste)\n# ** : puissance" },
            { id:'D-R2', type:'def', nom:'Types construits',
              enonce:"LIST (liste mutable, ordonnée) :\nlst = [1, 'deux', 3.0]\nlst[0]          → 1  (indice commence à 0)\nlst[-1]         → 3.0 (dernier)\nlst[1:3]        → ['deux', 3.0] (slice)\nlst.append(4)   → ajoute en fin\nlst.insert(0,0) → insère à l'indice 0\nlen(lst)        → longueur\n\nDICT (dictionnaire clés/valeurs) :\nd = {'nom': 'Alice', 'age': 16}\nd['nom']         → 'Alice'\nd['note'] = 18   → ajoute\nd.keys()         → dict_keys(['nom','age'])\nd.values()       → dict_values(['Alice',16])\n'nom' in d       → True\n\nTUPLE (immuable, ordonné) :\nt = (1, 2, 3) ; t[0] = 1 ; pas de modification\n\nSET (ensemble, sans doublon) :\ns = {1, 2, 3, 2} → {1, 2, 3}\ns.add(4) ; s.discard(1)\nunion : s1 | s2 ; intersection : s1 & s2" },
          ],
          exercices:[
            { id:'EX-R1', niveau:'Facile', titre:'Types Python',
              enonce:"Donner le type de chaque valeur Python :\n3.14 | 'hello' | True | [1,2,3] | {'a':1} | (1,2) | {1,2,3}",
              correction:"3.14      → float\n'hello'   → str\nTrue      → bool\n[1,2,3]   → list\n{'a':1}   → dict\n(1,2)     → tuple\n{1,2,3}   → set" },
          ]
        },
      ]
    },
    {
      id:'sc-rep2', titre:'2.2 Binaire, hexadécimal et texte',
      notions:['Bit (0/1), octet (8 bits)','Binaire→Décimal : ×puissances de 2','Hex : base 16 (0-9 + A-F)','ASCII : 128 car. ; UTF-8 : 140 000+'],
      blocs:[
        {
          notion:'🔢 Codage binaire et texte',
          theoremes:[
            { id:'N-R1', type:'notion', nom:'Codage binaire et hexadécimal',
              enonce:"SYSTÈME BINAIRE (base 2) :\nBit = 0 ou 1 ; Octet = 8 bits → 256 valeurs (0 à 255)\n\nBINAIRE → DÉCIMAL :\n1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11₁₀\n1101₂ = 1×8 + 1×4 + 0×2 + 1×1 = 13₁₀\n\nDÉCIMAL → BINAIRE (divisions par 2) :\n13 ÷ 2 = 6 r 1\n 6 ÷ 2 = 3 r 0\n 3 ÷ 2 = 1 r 1\n 1 ÷ 2 = 0 r 1\n→ 13₁₀ = 1101₂\n\nHEXADÉCIMAL (base 16) :\nChiffres : 0-9 puis A(10) B(11) C(12) D(13) E(14) F(15)\nFF₁₆ = 15×16 + 15 = 255₁₀\n\nUsages : couleurs HTML (#1A2B3C), adresses mémoire\n\nPython :\nbin(13)    → '0b1101'\nhex(255)   → '0xff'\nint('FF',16) → 255" },
            { id:'N-R2', type:'notion', nom:'Codage du texte — ASCII et Unicode',
              enonce:"ASCII (1963) : 128 caractères sur 7 bits\nEx : A=65, B=66, a=97, '0'=48, ' '=32\n\nLIMITES ASCII : pas d'accents, pas de caractères non latins\n\nUNICODE : standard universel (140 000+ caractères)\nChaque caractère a un point de code unique (code point)\nEx : é = U+00E9, 中 = U+4E2D, 😀 = U+1F600\n\nUTF-8 : encodage variable (1 à 4 octets par caractère)\n→ Compatible ASCII (codes 0-127 identiques)\n→ Standard du Web\n\nPython :\nord('A')   → 65\nchr(65)    → 'A'\nord('é')   → 233\nlen('Bonjour') → 7\n'NSI'.encode('utf-8') → b'NSI'" },
          ],
          exercices:[
            { id:'EX-R2', niveau:'Facile', titre:'Conversions binaire',
              enonce:"Q1: Convertir 25₁₀ en binaire.\nQ2: Convertir 11010₂ en décimal.\nQ3: Valeur max sur 8 bits ?",
              correction:"Q1: 25₁₀ en binaire\n25÷2=12r1 | 12÷2=6r0 | 6÷2=3r0 | 3÷2=1r1 | 1÷2=0r1\n→ 25₁₀ = 11001₂\n\nQ2: 11010₂ = 1×16+1×8+0×4+1×2+0×1 = 26₁₀\n\nQ3: 11111111₂ = 255₁₀ (valeur max sur 8 bits)" },
            { id:'EX-R3', niveau:'Intermédiaire', titre:'Codage ASCII et UTF-8',
              enonce:"Q1: Codes ASCII de H, i, !\nQ2: Décoder 78 83 73\nQ3: Pourquoi UTF-8 a remplacé ASCII ?",
              correction:"Q1: H=72, i=105, !=33\n\nQ2: 78='N', 83='S', 73='I' → 'NSI'\n\nQ3: ASCII ne code que 128 caractères (lettres latines).\nUTF-8 code 140 000+ caractères : accents, arabe,\nchinois, emojis...\nUTF-8 est compatible ASCII (mêmes codes 0-127)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — TRAITEMENT DES DONNÉES
// ─────────────────────────────────────────────────────────────────────
'traitement-donnees': {
  id:'traitement-donnees', emoji:'📊', color:'#10b981',
  titre:'Traitement des données',
  desc:"Tables de données CSV (csv.DictReader), sélection (list comprehension), projection, tri (sorted + lambda), agrégation (sum/max/min), jointure de tables.",
  souschapitres:[
    {
      id:'sc-data1', titre:'3.1 Tables CSV et opérations de base',
      notions:['CSV : fichier texte, virgules, en-têtes','csv.DictReader → liste de dicts','Sélection : [e for e in table if cond]','Tri : sorted(table, key=lambda e: e["col"])'],
      blocs:[
        {
          notion:'📊 Tables de données',
          theoremes:[
            { id:'D-D1', type:'def', nom:'Format CSV et lecture Python',
              enonce:"CSV = Comma-Separated Values\nLigne 1 = en-têtes (noms des colonnes)\nLignes suivantes = enregistrements\n\nFICHIER notes.csv :\nnom,matiere,note\nAlice,Maths,15\nBob,Maths,12\nAlice,NSI,18\n\nLECTURE Python :\nimport csv\nwith open('notes.csv', encoding='utf-8') as f:\n    data = list(csv.DictReader(f))\n# data = [\n#   {'nom':'Alice','matiere':'Maths','note':'15'},\n#   ...\n# ]\n\n# Convertir les nombres en int/float\nfor e in data:\n    e['note'] = int(e['note'])" },
            { id:'N-D1', type:'notion', nom:'Opérations sur les tables',
              enonce:"SÉLECTION (filtrage, WHERE équivalent) :\n[e for e in table if e['note'] >= 10]\n\nPROJECTION (choisir colonnes) :\n[e['nom'] for e in table]\n[{'nom':e['nom'],'note':e['note']} for e in table]\n\nTRI (ORDER BY équivalent) :\nsorted(table, key=lambda e: e['note'])           # croissant\nsorted(table, key=lambda e: e['note'], reverse=True)  # décroissant\nsorted(table, key=lambda e: (e['classe'], e['nom']))  # double critère\n\nAGRÉGATION :\nnotes = [e['note'] for e in table]\nmoyenne = sum(notes) / len(notes)\nmax_note = max(notes)\nmin_note = min(notes)\n\nmeilleur = max(table, key=lambda e: e['note'])" },
            { id:'N-D2', type:'notion', nom:'Jointure de tables',
              enonce:"Jointure = relier 2 tables par une clé commune\n(équivalent du INNER JOIN SQL)\n\nEXEMPLE :\neleves = [{'id':1,'nom':'Alice'}, {'id':2,'nom':'Bob'}]\nnotes  = [{'id_eleve':1,'note':15}, {'id_eleve':2,'note':12}]\n\nJOINTURE :\njoint = [\n    {'nom': e['nom'], 'note': n['note']}\n    for e in eleves\n    for n in notes\n    if e['id'] == n['id_eleve']\n]\n# → [{'nom':'Alice','note':15}, {'nom':'Bob','note':12}]" },
          ],
          exercices:[
            { id:'EX-D1', niveau:'Facile', titre:'Filtrer et trier une table',
              enonce:"Table = [{'nom':'Alice','note':15},{'nom':'Bob','note':9},{'nom':'Clara','note':12}]\nQ1: Élèves avec note>=10. Q2: Trier par note desc. Q3: Moyenne.",
              correction:"Q1: Sélection note>=10\nresult = [e for e in table if e['note'] >= 10]\n# [{'nom':'Alice','note':15},{'nom':'Clara','note':12}]\n\nQ2: Tri décroissant\ntrie = sorted(table, key=lambda e: e['note'], reverse=True)\n# Alice(15), Clara(12), Bob(9)\n\nQ3: Moyenne\nmoy = sum(e['note'] for e in table) / len(table)\n# (15+9+12)/3 = 12.0" },
            { id:'EX-D2', niveau:'Intermédiaire', titre:'Traiter un fichier CSV',
              enonce:"Écrire le code Python pour lire 'eleves.csv' (colonnes: nom, note) et afficher l'élève avec la meilleure note.",
              correction:"import csv\n\nwith open('eleves.csv', encoding='utf-8') as f:\n    data = list(csv.DictReader(f))\n\n# Convertir les notes\nfor e in data:\n    e['note'] = int(e['note'])\n\n# Trouver le maximum\nmeilleur = max(data, key=lambda e: e['note'])\nprint(f\"Meilleur : {meilleur['nom']} ({meilleur['note']})\")" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — WEB & INTERACTION
// ─────────────────────────────────────────────────────────────────────
'web-interaction': {
  id:'web-interaction', emoji:'🌐', color:'#f59e0b',
  titre:'Web & Interaction',
  desc:"Protocole HTTP (méthodes GET/POST, codes statut), architecture client-serveur, formulaires HTML (GET vs POST), cookies et sessions.",
  souschapitres:[
    {
      id:'sc-web1', titre:'4.1 Protocole HTTP et client/serveur',
      notions:['GET : récupérer (URL visible)','POST : envoyer (corps, sécurisé)','200 OK | 404 Not Found | 500 Server Error','Client : DNS → TCP → requête → affichage'],
      blocs:[
        {
          notion:'🌐 HTTP et architecture web',
          theoremes:[
            { id:'D-W1', type:'def', nom:'Protocole HTTP — méthodes et codes',
              enonce:"HTTP = HyperText Transfer Protocol\nHTTPS = HTTP + chiffrement TLS (cadenas)\n\nMÉTHODES HTTP :\nGET    : récupérer une ressource (URL visible)\nPOST   : envoyer des données (corps de la requête)\nPUT    : modifier une ressource\nDELETE : supprimer une ressource\n\nCODES DE STATUT :\n200 OK          : succès\n201 Created     : ressource créée (POST)\n301 Redirect    : redirection permanente\n302 Found       : redirection temporaire\n400 Bad Request : requête mal formée\n401 Unauthorized: authentification requise\n403 Forbidden   : accès refusé\n404 Not Found   : ressource introuvable\n500 Server Error: erreur côté serveur\n\nSTRUCTURE D'UNE REQUÊTE :\nGET /search?q=python HTTP/1.1\nHost: www.google.fr\nUser-Agent: Firefox/120" },
            { id:'N-W1', type:'notion', nom:'Architecture client-serveur',
              enonce:"CLIENT (navigateur) :\n1. Résolution DNS : 'google.com' → IP\n2. Connexion TCP (SYN/SYN-ACK/ACK)\n3. Envoi requête HTTP(S)\n4. Réception réponse\n5. Rendu HTML + CSS + JS\n\nSERVEUR :\n1. Écoute port 80 (HTTP) ou 443 (HTTPS)\n2. Reçoit la requête\n3. Traite (base de données, logique)\n4. Renvoie la réponse HTTP\n\nCARAC. IMPORTANTES :\nStateless : chaque requête est indépendante\n→ Les cookies compensent ce manque d'état\n\nURLs : https://exemple.com:443/page?param=val#section\nProtocole://Hôte:Port/Chemin?Paramètres#Fragment" },
          ],
          exercices:[
            { id:'EX-W1', niveau:'Facile', titre:'Analyser une requête HTTP',
              enonce:"Requête : GET /search?q=python HTTP/1.1\nHost: www.google.fr\n\nQ1: Méthode ? Q2: Ressource ? Q3: Paramètre de recherche ?",
              correction:"Q1: Méthode = GET (récupération de ressource)\n\nQ2: Ressource = /search (page de résultats)\n\nQ3: Paramètre q = 'python'\nURL complète : https://www.google.fr/search?q=python\n\nRéponse attendue : 200 OK + page HTML des résultats" },
            { id:'EX-W2', niveau:'Intermédiaire', titre:'GET vs POST — choisir',
              enonce:"Choisir GET ou POST et justifier :\na) Rechercher 'cours NSI' sur un moteur\nb) Se connecter avec login/mdp\nc) Consulter la fiche d'un produit\nd) Envoyer un formulaire de commande",
              correction:"a) Recherche → GET\nRésultats partageables via URL, pas de données sensibles.\n\nb) Connexion → POST\nMot de passe ne doit pas apparaître dans l'URL.\nDonnées dans le corps de la requête.\n\nc) Fiche produit → GET\nPage consultable, URL partageable, aucune modification.\n\nd) Commande → POST\nModification de la BDD, données personnelles à protéger." },
          ]
        },
      ]
    },
    {
      id:'sc-web2', titre:'4.2 Formulaires HTML et cookies',
      notions:['<form action method="POST/GET">','<input>, <select>, <textarea>','Cookie : identifiant client stocké navigateur','Session : données serveur liées au cookie'],
      blocs:[
        {
          notion:'📋 Formulaires et cookies',
          theoremes:[
            { id:'D-W2', type:'def', nom:'Formulaires HTML',
              enonce:"<form action=\"/traitement\" method=\"POST\">\n  <label>Nom :\n    <input type=\"text\" name=\"nom\" required>\n  </label>\n  <input type=\"email\" name=\"email\" placeholder=\"Email\">\n  <input type=\"password\" name=\"mdp\">\n  <select name=\"classe\">\n    <option value=\"premiere\">Première</option>\n    <option value=\"terminale\">Terminale</option>\n  </select>\n  <textarea name=\"message\" rows=\"4\"></textarea>\n  <input type=\"submit\" value=\"Envoyer\">\n</form>\n\nGET → données dans l'URL (?nom=Alice&email=...)\nPOST → données dans le corps (plus sécurisé)\n\nINPUT TYPES :\ntext, email, password, number, date,\nradio, checkbox, file, hidden, submit" },
            { id:'D-W3', type:'def', nom:'Cookies et sessions',
              enonce:"COOKIE :\nPetit fichier texte stocké par le navigateur\nEnvoyé automatiquement avec chaque requête\n\nUSAGES :\n• Session : maintenir la connexion (après login)\n• Préférences : langue, thème\n• Tracking : publicité ciblée (RGPD !)\n\nSESSION :\nDonnées stockées côté SERVEUR\nIdentifiée par un identifiant unique (session_id)\n→ session_id envoyé dans un cookie\n\nEXEMPLE (connexion) :\n1. Utilisateur envoie login/mdp (POST)\n2. Serveur vérifie, crée une session\n3. Serveur envoie Set-Cookie: session_id=ABC123\n4. Navigateur stocke le cookie\n5. Requêtes suivantes : Cookie: session_id=ABC123" },
          ],
          exercices:[
            { id:'EX-W3', niveau:'Intermédiaire', titre:'Formulaire HTML complet',
              enonce:"Créer un formulaire HTML d'inscription avec : nom, email, mot de passe (×2), classe (liste). Méthode POST.",
              correction:"<form action=\"/inscription\" method=\"POST\">\n  <div>\n    <label>Nom :\n      <input type=\"text\" name=\"nom\" required>\n    </label>\n  </div>\n  <div>\n    <label>Email :\n      <input type=\"email\" name=\"email\" required>\n    </label>\n  </div>\n  <div>\n    <label>Mot de passe :\n      <input type=\"password\" name=\"mdp\" required minlength=\"8\">\n    </label>\n  </div>\n  <div>\n    <label>Confirmer :\n      <input type=\"password\" name=\"mdp2\" required>\n    </label>\n  </div>\n  <div>\n    <label>Classe :\n      <select name=\"classe\">\n        <option value=\"1ere\">Première</option>\n        <option value=\"term\">Terminale</option>\n      </select>\n    </label>\n  </div>\n  <button type=\"submit\">S'inscrire</button>\n</form>" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — ARCHITECTURE & OS
// ─────────────────────────────────────────────────────────────────────
'architecture-os': {
  id:'architecture-os', emoji:'⚙️', color:'#ef4444',
  titre:"Architecture & Systèmes d'exploitation",
  desc:"CPU/RAM/SSD, hiérarchie mémoire, OS (rôles, processus, multitâche), système de fichiers, commandes Linux essentielles.",
  souschapitres:[
    {
      id:'sc-os1', titre:'5.1 Architecture matérielle',
      notions:['CPU : UAL + UC, mesure en GHz','RAM : volatile, rapide — ROM : permanent','Hiérarchie : registres → cache → RAM → SSD → HDD','GPU : calculs parallèles (IA, 3D)'],
      blocs:[
        {
          notion:'⚙️ Matériel informatique',
          theoremes:[
            { id:'D-OS1', type:'def', nom:'Composants et hiérarchie mémoire',
              enonce:"CPU (processeur) : exécute les instructions\n→ Fréquence en GHz, nombre de cœurs\n\nRAM : mémoire vive, volatile (perdue à l'arrêt)\n→ Stockage temporaire des programmes actifs\n\nSSD/HDD : stockage permanent\n→ SSD (flash) : rapide, silencieux\n→ HDD (magnétique) : moins cher, plus lent\n\nHIÉRARCHIE MÉMOIRE (rapide→lent, petit→grand) :\nRegistres CPU : < 1ns — quelques ko\nCache L1/L2 : 1-10ns — 64Ko à 16Mo\nRAM : 10-100ns — 4 à 64 Go\nSSD : 0,1ms — 256 Go à 4 To\nHDD : 5-15ms — 1 à 20 To\n\nRègle : vitesse ↓ quand taille ↑\n\nGPU : processeur graphique\n→ Milliers de cœurs simples (calculs parallèles)\n→ IA, rendu 3D, cryptomonnaies" },
          ],
          exercices:[
            { id:'EX-OS1', niveau:'Facile', titre:'Hiérarchie mémoire',
              enonce:"Classer de la plus rapide à la plus lente :\nSSD, RAM, registres CPU, cache L1, disque dur HDD",
              correction:"1. Registres CPU (< 1ns, quelques dizaines d'octets)\n2. Cache L1 (< 1ns, 32-64 Ko)\n3. Cache L2/L3 (1-10ns, quelques Mo)\n4. RAM (10-100ns, 4-64 Go)\n5. SSD (0,1-1ms, 256Go-4To)\n6. HDD (5-15ms, 1-20 To)\n\nRapidité ≈ inverse de la capacité." },
          ]
        },
      ]
    },
    {
      id:'sc-os2', titre:'5.2 Systèmes d\'exploitation et fichiers',
      notions:['OS : gestion processus, mémoire, fichiers, périphériques','Processus : Prêt → Actif → Bloqué','Chemin absolu /home/user vs relatif ../doc','Commandes Linux : ls, cd, mkdir, cp, mv, rm'],
      blocs:[
        {
          notion:'💻 OS et ligne de commande',
          theoremes:[
            { id:'D-OS2', type:'def', nom:"Système d'exploitation",
              enonce:"OS = logiciel de base qui gère le matériel\n\nEXEMPLES :\nWindows, Linux, macOS (ordinateurs)\nAndroid, iOS (mobiles)\n\nRÔLES :\n• Gestion des PROCESSUS (multitâche, ordonnancement)\n• Gestion de la MÉMOIRE (allocation, libération)\n• Gestion du SYSTÈME DE FICHIERS\n• Gestion des PÉRIPHÉRIQUES (drivers)\n• Interface utilisateur (CLI ou GUI)\n\nNOYAU (kernel) : partie basse, dialogue avec le matériel\n\nPROCESSUS :\nProgramme en cours d'exécution\nÉtats : Nouveau → Prêt → En exécution → Bloqué → Terminé\nPID : identifiant unique de chaque processus" },
            { id:'N-OS1', type:'notion', nom:'Système de fichiers et Linux',
              enonce:"ARBORESCENCE :\n/                 (racine)\n├── home/\n│   └── user/\n│       ├── Documents/\n│       └── Bureau/\n├── etc/          (configuration)\n└── usr/          (programmes)\n\nChemin ABSOLU : /home/user/Documents/fichier.txt\nChemin RELATIF : ../../etc/hosts\n\nCOMMANDES UNIX essentielles :\nls       : lister le contenu\nls -la   : liste détaillée avec droits\ncd dir   : changer de répertoire\ncd ..    : remonter d'un niveau\nmkdir dir: créer un répertoire\ntouch f  : créer un fichier vide\ncat f    : afficher le contenu\ncp src dst : copier\nmv src dst : déplacer/renommer\nrm f     : supprimer fichier\nrm -r dir: supprimer répertoire\npwd      : afficher le chemin actuel\n\nDROITS : rwx (lecture/écriture/exécution)\npour : owner | group | others\nex: -rwxr-xr-- (owner=rwx, group=r-x, others=r--)" },
          ],
          exercices:[
            { id:'EX-OS2', niveau:'Intermédiaire', titre:'Commandes Linux',
              enonce:"Écrire les commandes Linux pour :\n1. Aller dans /home/user/Documents\n2. Créer un dossier 'Projet_NSI'\n3. Créer le fichier main.py\n4. Lister le contenu avec droits\n5. Copier main.py vers ../Backup/",
              correction:"1. cd /home/user/Documents\n2. mkdir Projet_NSI\n3. touch Projet_NSI/main.py\n4. ls -la\n5. cp Projet_NSI/main.py ../Backup/main.py" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — LANGAGES & PROGRAMMATION PYTHON
// ─────────────────────────────────────────────────────────────────────
'langages-programmation': {
  id:'langages-programmation', emoji:'🐍', color:'#6366f1',
  titre:'Langages & Programmation Python',
  desc:"Variables et opérateurs, conditions (if/elif/else), boucles (for/while), fonctions (paramètres, return, docstring), modules, débogage.",
  souschapitres:[
    {
      id:'sc-py1', titre:'6.1 Variables, conditions et boucles',
      notions:['Affectation x=5, opérateurs + - * / // % **','if/elif/else, opérateurs de comparaison','for i in range(n), for x in liste','while cond, break, continue'],
      blocs:[
        {
          notion:'🐍 Python — bases',
          theoremes:[
            { id:'D-PY1', type:'def', nom:'Variables et conditions',
              enonce:"# AFFECTATION\nx = 5           # int\nnom = 'Alice'   # str\npi = 3.14       # float\nok = True       # bool\n\n# OPÉRATEURS\n+ - * /         # arithmétiques standards\n//              # division entière : 17//5=3\n%               # modulo (reste) : 17%5=2\n**              # puissance : 2**10=1024\n\n# CONDITIONS\nif note >= 10:\n    print('Admis')\nelif note >= 8:\n    print('Rattrapage')\nelse:\n    print('Refusé')\n\n# OPÉRATEURS COMPARAISON :\n== != < > <= >=\n\n# OPÉRATEURS LOGIQUES :\nand or not\nif a > 0 and a < 10:\n    print('Entre 0 et 10')" },
            { id:'N-PY1', type:'notion', nom:'Boucles for et while',
              enonce:"# BOUCLE for (nombre d'itérations connu)\nfor i in range(5):      # 0,1,2,3,4\n    print(i)\n\nfor i in range(1, 11, 2):  # 1,3,5,7,9\n    print(i)\n\nfor x in ['a','b','c']:  # itérer une liste\n    print(x)\n\nfor i, x in enumerate(['a','b','c']):\n    print(i, x)  # 0 a | 1 b | 2 c\n\n# BOUCLE while (condition)\nn = 10\nwhile n > 0:\n    print(n)\n    n = n // 2  # 10,5,2,1\n\n# CONTRÔLE\nbreak     : sortir immédiatement de la boucle\ncontinue  : passer à l'itération suivante\n\n# Compréhension de liste\ncarres = [x**2 for x in range(5)]  # [0,1,4,9,16]\npairs = [x for x in range(10) if x%2==0]" },
          ],
          exercices:[
            { id:'EX-PY1', niveau:'Facile', titre:'Fonctions Python simples',
              enonce:"Écrire en Python :\n1. est_pair(n) : True si n est pair\n2. maximum(a,b,c) : maximum de 3 nombres\n3. compte_mots(phrase) : nb de mots",
              correction:"def est_pair(n):\n    return n % 2 == 0\n# est_pair(4) → True | est_pair(7) → False\n\ndef maximum(a, b, c):\n    return max(a, b, c)\n# Sans max() : if a>=b and a>=c: return a...\n\ndef compte_mots(phrase):\n    return len(phrase.split())\n# compte_mots('Bonjour tout le monde') → 4" },
          ]
        },
      ]
    },
    {
      id:'sc-py2', titre:'6.2 Fonctions et modules',
      notions:['def nom(params): ... return val','Paramètres par défaut : def f(x, titre="M.")','Modules : import math, random, csv','Débogage : SyntaxError, NameError, IndexError'],
      blocs:[
        {
          notion:'🔧 Fonctions et modules',
          theoremes:[
            { id:'D-PY2', type:'def', nom:'Fonctions avancées',
              enonce:"# DÉFINITION COMPLÈTE\ndef saluer(nom, titre='M.'):\n    \"\"\"Retourne une salutation.\"\"\"\n    return f'Bonjour {titre} {nom}'\n\nprint(saluer('Dupont'))         # Bonjour M. Dupont\nprint(saluer('Curie', 'Mme'))  # Bonjour Mme Curie\n\n# PLUSIEURS VALEURS DE RETOUR\ndef division(a, b):\n    return a // b, a % b  # retourne un tuple\n\nq, r = division(17, 5)  # q=3, r=2\n\n# PORTÉE DES VARIABLES\nx = 10  # variable globale\n\ndef f():\n    x = 5  # variable locale (différente !)\n    print(x)  # 5\n\nf()        # 5\nprint(x)  # 10 (inchangé)" },
            { id:'D-PY3', type:'def', nom:'Modules Python essentiels',
              enonce:"import math\nmath.sqrt(16)    → 4.0\nmath.pi          → 3.14159...\nmath.floor(3.7)  → 3\nmath.ceil(3.2)   → 4\n\nimport random\nrandom.randint(1, 6)      # dé de 6\nrandom.random()           # float [0,1[\nrandom.choice(['a','b'])  # élément aléatoire\nrandom.shuffle(liste)     # mélanger en place\n\nimport csv\nwith open('f.csv') as f:\n    data = list(csv.DictReader(f))\n\n# DÉBOGAGE — Types d'erreurs :\n# SyntaxError  : parenthèse/indentation manquante\n# NameError    : variable non définie\n# TypeError    : opération sur types incompatibles\n# IndexError   : indice hors limites\n# KeyError     : clé absente dans dict\n# ZeroDivisionError : division par zéro" },
          ],
          exercices:[
            { id:'EX-PY2', niveau:'Intermédiaire', titre:'Manipulation de listes',
              enonce:"Écrire en Python :\n1. somme(lst) : somme d'une liste\n2. sans_doublons(lst) : supprimer les doublons\n3. inverser(lst) : inverser sans .reverse()",
              correction:"# 1. Somme\ndef somme(lst):\n    return sum(lst)\n# Ou : total=0; for x in lst: total+=x\n\n# 2. Sans doublons (ordre préservé)\ndef sans_doublons(lst):\n    vu = []\n    for x in lst:\n        if x not in vu:\n            vu.append(x)\n    return vu\n# Rapide mais sans ordre: list(set(lst))\n\n# 3. Inverser\ndef inverser(lst):\n    return lst[::-1]\n# Ou : [lst[i] for i in range(len(lst)-1,-1,-1)]" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — ALGORITHMIQUE
// ─────────────────────────────────────────────────────────────────────
'algorithmique': {
  id:'algorithmique', emoji:'🧮', color:'#ec4899',
  titre:'Algorithmique',
  desc:"Recherche séquentielle O(n), dichotomique O(log n), tri par sélection O(n²), tri par insertion O(n²), notion de complexité.",
  souschapitres:[
    {
      id:'sc-algo1', titre:'7.1 Recherche séquentielle et dichotomique',
      notions:['Séquentielle : parcours liste, O(n)','Dichotomique : tableau trié requis, O(log n)','g,d,m=(g+d)//2 : couper en deux','log₂(1000)≈10 comparaisons vs 1000'],
      blocs:[
        {
          notion:'🔍 Algorithmes de recherche',
          theoremes:[
            { id:'D-A1', type:'def', nom:'Recherche séquentielle — O(n)',
              enonce:"Parcourir la liste élément par élément.\nComplexité : O(n) — n comparaisons au pire.\n\ndef recherche_seq(lst, valeur):\n    for i in range(len(lst)):\n        if lst[i] == valeur:\n            return i   # indice trouvé\n    return -1          # absent\n\nAVANTAGE : fonctionne sur TOUTE liste (même non triée)\nINconvénient : lent pour grandes listes" },
            { id:'D-A2', type:'def', nom:'Recherche dichotomique — O(log n)',
              enonce:"Prérequis : liste TRIÉE en ordre croissant.\n\ndef recherche_dicho(lst, valeur):\n    g, d = 0, len(lst) - 1\n    while g <= d:\n        m = (g + d) // 2\n        if lst[m] == valeur:\n            return m         # trouvé\n        elif valeur < lst[m]:\n            d = m - 1        # chercher à gauche\n        else:\n            g = m + 1        # chercher à droite\n    return -1                # absent\n\nCOMPLEXITÉ : O(log₂ n)\nN=1000 → 10 comparaisons max\nN=10⁶  → 20 comparaisons max\n\nPRINCIPE : couper la liste en 2 à chaque étape" },
          ],
          exercices:[
            { id:'EX-A1', niveau:'Facile', titre:'Dérouler la dichotomie',
              enonce:"lst = [2, 5, 8, 12, 16, 23, 38]. Chercher 23 par dichotomie.\nDonner g, d, m à chaque étape.",
              correction:"n=7, cherche 23\nÉtape 1 : g=0, d=6, m=3, lst[3]=12 < 23 → g=4\nÉtape 2 : g=4, d=6, m=5, lst[5]=23 = 23 → TROUVÉ en pos 5\n\n2 comparaisons seulement !\nRechercheséq. aurait fait 6 comparaisons." },
          ]
        },
      ]
    },
    {
      id:'sc-algo2', titre:'7.2 Tris et complexité',
      notions:['Tri sélection : min → placer, O(n²)','Tri insertion : insérer en bonne place, O(n²)','O(1)<O(log n)<O(n)<O(n²)','n=10000 : 100M ops vs 100K ops'],
      blocs:[
        {
          notion:'🔄 Tris et complexité',
          theoremes:[
            { id:'A-T1', type:'algo', nom:'Tri par sélection — O(n²)',
              enonce:"Principe : chercher le minimum, le placer en tête.\n\ndef tri_selection(lst):\n    n = len(lst)\n    for i in range(n-1):\n        pos_min = i\n        for j in range(i+1, n):\n            if lst[j] < lst[pos_min]:\n                pos_min = j\n        lst[i], lst[pos_min] = lst[pos_min], lst[i]\n    return lst\n\nTRACE sur [64, 25, 12, 22] :\ni=0 : min=12 (pos2) → [12, 25, 64, 22]\ni=1 : min=22 (pos3) → [12, 22, 64, 25]\ni=2 : min=25 (pos3) → [12, 22, 25, 64]" },
            { id:'A-T2', type:'algo', nom:'Tri par insertion — O(n²)',
              enonce:"Principe : insérer chaque élément à sa bonne position.\n\ndef tri_insertion(lst):\n    for i in range(1, len(lst)):\n        cle = lst[i]\n        j = i - 1\n        while j >= 0 and lst[j] > cle:\n            lst[j+1] = lst[j]\n            j -= 1\n        lst[j+1] = cle\n    return lst\n\nAVANTAGE : efficace si liste presque triée\nINCONVÉNIENT : O(n²) en général" },
            { id:'F-A1', type:'formule', nom:'Complexité — récapitulatif',
              enonce:"O(1)      : constant — accès par indice\nO(log n)  : logarithmique — dichotomie\nO(n)      : linéaire — parcours\nO(n²)     : quadratique — tris sélection/insertion\n\nCOMPARAISON n=10 000 :\nO(log n)  → ~14 opérations\nO(n)      → 10 000 opérations\nO(n²)     → 100 000 000 opérations\n\nPOUR LE BAC :\nRechercheséquentielle → O(n)\nDichotomique → O(log n)\nTri sélection → O(n²)\nTri insertion → O(n²)" },
          ],
          exercices:[
            { id:'EX-A2', niveau:'Intermédiaire', titre:'Comparer les recherches',
              enonce:"Liste de 10 millions d'éléments triés. Comparer le nombre de comparaisons pour recherche séquentielle vs dichotomique.",
              correction:"Recherche SÉQUENTIELLE O(n) :\nPire cas : 10 000 000 comparaisons\n\nRecherche DICHOTOMIQUE O(log n) :\nlog₂(10 000 000) ≈ 23 comparaisons max !\n\nRatio : 10⁷ / 23 ≈ 435 000× plus efficace.\n\nConclusion : dichotomique indispensable\npour grandes listes TRIÉES.\nMais nécessite que la liste soit préalablement triée." },
            { id:'EX-A3', niveau:'Difficile', titre:'Trace tri insertion',
              enonce:"Dérouler le tri par insertion sur [5, 2, 8, 1, 4].",
              correction:"État initial : [5, 2, 8, 1, 4]\ni=1 : cle=2, 5>2 → décaler 5 → insérer 2 → [2, 5, 8, 1, 4]\ni=2 : cle=8, 5<8 → [2, 5, 8, 1, 4] (pas de changement)\ni=3 : cle=1, 8>1,5>1,2>1 → déc. → insérer 1 → [1, 2, 5, 8, 4]\ni=4 : cle=4, 8>4,5>4,2<4 → insérer 4 → [1, 2, 4, 5, 8]\nRésultat : [1, 2, 4, 5, 8] ✓" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — PROJET INFORMATIQUE
// ─────────────────────────────────────────────────────────────────────
'projet': {
  id:'projet', emoji:'🚀', color:'#f59e0b',
  titre:'Projet informatique',
  desc:"Mini-projet en groupe : cahier des charges, développement Python ou Web, tests, Git (workflow, branches, pull requests), présentation orale.",
  souschapitres:[
    {
      id:'sc-proj1', titre:'8.1 Cahier des charges et types de projets',
      notions:['Fonctionnalités + contraintes techniques','Application Python (quiz, To-Do, analyseur CSV)','Application web (HTML/CSS/JS)','Git : init, add, commit, push, branch, merge'],
      blocs:[
        {
          notion:'🚀 Projet NSI Première',
          theoremes:[
            { id:'M-P1', type:'methode', nom:'Conduite d\'un projet NSI Première',
              enonce:"PHASES :\n1. IDÉE ET CAHIER DES CHARGES\n   → Fonctionnalités\n   → Contraintes (technologies, temps)\n   → Répartition des tâches\n\n2. DÉVELOPPEMENT\n   → Utiliser Git dès le début\n   → Commits réguliers et explicites\n   → Code commenté et structuré\n\n3. TESTS\n   → Tester les cas normaux\n   → Tester les cas limites\n   → Corriger les bugs\n\n4. PRÉSENTATION\n   → Démo fonctionnelle\n   → Expliquer les choix\n   → Code commenté à montrer\n\nIDÉES DE PROJETS :\n• Quiz de culture générale (Python + tkinter)\n• Gestionnaire de tâches (HTML/CSS/JS)\n• Analyseur de données CSV (Python + matplotlib)\n• Jeu simple (Python : dé, deviner, snake)\n• Site de recettes (HTML/CSS/JS)" },
            { id:'N-P1', type:'notion', nom:'Git — workflow essentiel',
              enonce:"COMMANDES GIT :\ngit init                   # initialiser\ngit add fichier.py         # préparer\ngit commit -m 'Message'   # sauvegarder\ngit push origin main       # envoyer GitHub\ngit pull                   # récupérer\n\nWORKFLOW EN ÉQUIPE :\n# 1. Créer sa branche de travail\ngit checkout -b feature/mon-ajout\n\n# 2. Développer et commiter\ngit add mon_fichier.py\ngit commit -m 'feat: ajout fonction X'\n\n# 3. Envoyer sur GitHub\ngit push origin feature/mon-ajout\n\n# 4. Créer une Pull Request sur GitHub\n# → L'équipe review le code\n\n# 5. Merger dans main\ngit checkout main\ngit merge feature/mon-ajout\n\nBONNES PRATIQUES :\n✓ Commits petits et fréquents\n✓ Messages de commit explicites\n✓ Ne jamais commiter des mots de passe" },
          ],
          exercices:[
            { id:'EX-P1', niveau:'Facile', titre:'Idées de projets NSI',
              enonce:"Proposer 3 idées de projets NSI Première avec les technologies utilisées et les fonctionnalités principales.",
              correction:"Idée 1 : Quiz de culture générale\nTechnologies : Python + tkinter (GUI)\nFonctionnalités : questions aléatoires, score, chronomètre, top 5\n\nIdée 2 : Gestionnaire de tâches (To-Do)\nTechnologies : HTML/CSS/JavaScript + LocalStorage\nFonctionnalités : ajouter/supprimer/cocher, filtres, persistance\n\nIdée 3 : Analyseur de notes de classe\nTechnologies : Python + csv + matplotlib\nFonctionnalités : moyenne, min/max, histogramme, export" },
            { id:'EX-P2', niveau:'Intermédiaire', titre:'Workflow Git en équipe',
              enonce:"Alice et Bob collaborent sur GitHub. Bob ajoute une fonction login dans app.py. Écrire les commandes Git complètes.",
              correction:"# 1. Bob crée sa branche\ngit checkout -b feature/login\n\n# 2. Bob développe login dans app.py\n# ... modifications ...\n\n# 3. Bob sauvegarde\ngit add app.py\ngit commit -m 'feat: ajout système de login'\n\n# 4. Bob envoie sur GitHub\ngit push origin feature/login\n\n# 5. Bob crée une Pull Request sur GitHub\n# Alice revise le code\n\n# 6. Après validation, merger dans main\ngit checkout main\ngit merge feature/login\ngit push origin main\n\n# 7. Supprimer la branche terminée\ngit branch -d feature/login" },
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
export default function NSIPremiereSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'histoire-informatique'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>💻</div>
          <h2>Chapitre non trouvé</h2>
          <Link href="/bac-france/informatique/premiere" style={{ color:'#8b5cf6' }}>← Retour NSI Première</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#8b5cf6'
  const badge = BADGES[slug]

  const GROUPS = [
    { label:'Histoire & Données', slugs:['histoire-informatique','representation-donnees','traitement-donnees'] },
    { label:'Web & Système', slugs:['web-interaction','architecture-os'] },
    { label:'Python & Algo', slugs:['langages-programmation','algorithmique','projet'] },
  ]

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/informatique" style={{ color:'var(--muted)', textDecoration:'none' }}>Informatique NSI</Link><span>›</span>
          <Link href="/bac-france/informatique/premiere" style={{ color:'var(--muted)', textDecoration:'none' }}>Première</Link><span>›</span>
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
                    <span style={{ fontSize:11, background:'rgba(245,158,11,0.15)', color:'#f59e0b',
                      padding:'2px 10px', borderRadius:20, fontWeight:700 }}>{badge}</span>
                  )}
                  <span style={{ fontSize:11, background:'rgba(139,92,246,0.15)',
                    color:'#a78bfa', padding:'2px 9px', borderRadius:10 }}>
                    📗 NSI Première · 4h/sem
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.emoji} {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('NSI Première — '+chapter.titre)}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Résoudre avec IA
                  </Link>
                  <Link href="/bac-france/informatique/terminale"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    🎓 Suite en Terminale
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
                                      <Link href={`/solve?q=${encodeURIComponent('NSI Première — '+ex.enonce)}`}
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
                  <Link href={`/bac-france/informatique/premiere/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/informatique/premiere/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  📗 NSI Première · 8 chapitres
                </div>
                {GROUPS.map(g => (
                  <div key={g.label}>
                    <div style={{ padding:'6px 15px 2px', fontSize:9, color:'var(--muted)',
                      fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background:'rgba(255,255,255,0.02)' }}>{g.label}</div>
                    {g.slugs.map(s => (
                      <Link key={s} href={`/bac-france/informatique/premiere/${s}`} style={{ textDecoration:'none' }}>
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
                            {TITRES_NAV[s].replace(/CH \d+ — /,'').slice(0,24)}
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
                  <Link href={`/solve?q=${encodeURIComponent('NSI Première — '+chapter.titre)}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — NSI
                  </Link>
                  <Link href="/bac-france/informatique/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎓 Terminale NSI</Link>
                  <Link href="/bac-france/informatique/seconde" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📘 Seconde SNT</Link>
                  <Link href="/bac-france/informatique/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
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