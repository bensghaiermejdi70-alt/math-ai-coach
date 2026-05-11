'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = { thm:'#a78bfa', def:'#4f6ef7', formule:'#f5c842', prop:'#06d6a0', algo:'#60a5fa', sql:'#8b5cf6' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', algo:'Algorithme', sql:'Requête SQL' }

const NAV_ORDER = [
  'notions-base-algo','structures-controle','structures-donnees','sous-programmes','algorithmes-avances','programmation-pascal-python',
  'concepts-base-bd','modelisation-relationnelle','sql-requetes-simples','sql-requetes-avancees','sql-manipulation','normalisation',
  'internet-reseaux','web-html-css-js','systemes-informatiques','securite-informatique',
]

const TITRES: Record<string,string> = {
  'notions-base-algo':"Notions de base de l'algorithmique",
  'structures-controle':"Structures de contrôle",
  'structures-donnees':"Structures de données",
  'sous-programmes':"Sous-programmes",
  'algorithmes-avances':"Algorithmes avancés",
  'programmation-pascal-python':"Programmation Pascal / Python",
  'concepts-base-bd':"Concepts de base des bases de données",
  'modelisation-relationnelle':"Modélisation relationnelle",
  'sql-requetes-simples':"SQL — Requêtes simples",
  'sql-requetes-avancees':"SQL — Requêtes avancées",
  'sql-manipulation':"SQL — Manipulation de données",
  'normalisation':"Normalisation",
  'internet-reseaux':"Internet & Réseaux",
  'web-html-css-js':"Web — HTML / CSS / JavaScript",
  'systemes-informatiques':"Systèmes informatiques",
  'securite-informatique':"Sécurité informatique",
}

const NUMS: Record<string,string> = {
  'notions-base-algo':'CH 01','structures-controle':'CH 02','structures-donnees':'CH 03',
  'sous-programmes':'CH 04','algorithmes-avances':'CH 05','programmation-pascal-python':'CH 06',
  'concepts-base-bd':'CH 07','modelisation-relationnelle':'CH 08','sql-requetes-simples':'CH 09',
  'sql-requetes-avancees':'CH 10','sql-manipulation':'CH 11','normalisation':'CH 12',
  'internet-reseaux':'CH 13','web-html-css-js':'CH 14','systemes-informatiques':'CH 15',
  'securite-informatique':'CH 16',
}

const SEC_COLOR: Record<string,string> = {
  'notions-base-algo':'#4f6ef7','structures-controle':'#4f6ef7','structures-donnees':'#4f6ef7',
  'sous-programmes':'#4f6ef7','algorithmes-avances':'#4f6ef7','programmation-pascal-python':'#60a5fa',
  'concepts-base-bd':'#8b5cf6','modelisation-relationnelle':'#8b5cf6','sql-requetes-simples':'#8b5cf6',
  'sql-requetes-avancees':'#8b5cf6','sql-manipulation':'#8b5cf6','normalisation':'#8b5cf6',
  'internet-reseaux':'#06d6a0','web-html-css-js':'#06d6a0','systemes-informatiques':'#06d6a0',
  'securite-informatique':'#06d6a0',
}

const CHAPITRES: Record<string,{
  ch:string; titre:string; badge:string; desc:string; duree:string; section:string;
  theoremes:{id:string;type:string;nom:string;enonce:string}[];
  exercices:{id:string;niveau:string;titre:string;enonce:string;correction:string}[];
}> = {
  'notions-base-algo': {
    ch:'CH 01', titre:"Notions de base de l'algorithmique", badge:'Algorithmique',
    duree:'~4h', section:'Bloc 1 — Algorithmique & Programmation',
    desc:"Définition algorithme, structure, pseudo-code, variables (types), déclaration, affectation, Read/Write.",
    theoremes:[
      {id:'D1',type:'def',nom:"Structure d'un algorithme",
       enonce:"Algorithme NomAlgorithme\nDébut\n  [instructions]\nFin\n\nTypes : Entier, Réel, Booléen, Caractère, Chaîne\nDéclaration : VAR nom : TYPE\nConstante : CONST nom = valeur"},
      {id:'D2',type:'def',nom:"Affectation et opérateurs",
       enonce:"Affectation : variable <- expression\nArithmétique : + - * / DIV MOD\nComparaison : = <> < > <= >=\nBooléens : ET / OU / NON"},
      {id:'D3',type:'def',nom:"Entrée / Sortie",
       enonce:"Lecture : Lire(variable)\nÉcriture : Écrire(expression)\n\nExemple :\nVAR nom : CHAINE\nDébut\n  Écrire('Nom ?')\n  Lire(nom)\n  Écrire('Bonjour ', nom)\nFin"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Échange de variables",
       enonce:"Écrire un algorithme qui échange a et b.",
       correction:"VAR a, b, tmp : ENTIER\nDébut\n  Lire(a, b)\n  tmp <- a ; a <- b ; b <- tmp\n  Écrire(a, b)\nFin"},
      {id:'EX02',niveau:'Facile',titre:"Périmètre cercle",
       enonce:"Calculer P = 2*pi*r pour rayon r saisi.",
       correction:"CONST pi = 3.14159\nVAR r, P : REEL\nDébut\n  Lire(r)\n  P <- 2 * pi * r\n  Écrire(P)\nFin"},
    ],
  },
  'structures-controle': {
    ch:'CH 02', titre:'Structures de contrôle', badge:'Algorithmique',
    duree:'~5h', section:'Bloc 1 — Algorithmique & Programmation',
    desc:"SI/SINON, SELON, POUR, TANT QUE, RÉPÉTER...JUSQU'À, opérateurs ET/OU/NON.",
    theoremes:[
      {id:'D1',type:'def',nom:"Conditions",
       enonce:"SI condition ALORS\n  instructions\nSINON\n  instructions\nFIN SI\n\nSELON variable FAIRE\n  valeur1 : instruction1\n  SINON : defaut\nFIN SELON"},
      {id:'D2',type:'def',nom:"Boucles",
       enonce:"POUR i DE debut A fin FAIRE\n  instructions\nFIN POUR\n\nTANT QUE condition FAIRE\n  instructions\nFIN TANT QUE\n\nRÉPÉTER\n  instructions\nJUSQU'À condition"},
      {id:'F1',type:'formule',nom:"Choisir la bonne boucle",
       enonce:"POUR : nb iterations connu à l'avance\nTANT QUE : 0 ou plusieurs tours\nRÉPÉTER : au moins 1 tour garanti\n\nAttention boucle infinie :\n- Vérifier que la condition évolue\n- Initialiser avant la boucle"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Signe d'un nombre",
       enonce:"Lire n. Afficher positif, négatif ou nul.",
       correction:"SI n>0 ALORS Écrire('Positif')\nSINON SI n<0 ALORS Écrire('Négatif')\nSINON Écrire('Nul') FIN SI"},
      {id:'EX02',niveau:'Intermédiaire',titre:"Somme 1 à n",
       enonce:"Calculer S = 1+2+...+n avec POUR.",
       correction:"S <- 0\nPOUR i DE 1 A n FAIRE S <- S+i FIN POUR\nÉcrire(S)"},
      {id:'EX03',niveau:'Intermédiaire',titre:"Nombre premier",
       enonce:"Tester si n est premier.",
       correction:"premier <- VRAI\nPOUR i DE 2 A n-1 FAIRE\n  SI n MOD i = 0 ALORS premier <- FAUX FIN SI\nFIN POUR\nSI premier ALORS Écrire('Premier')"},
    ],
  },
  'structures-donnees': {
    ch:'CH 03', titre:'Structures de données', badge:'Algorithmique',
    duree:'~5h', section:'Bloc 1 — Algorithmique & Programmation',
    desc:"Tableaux 1D/2D, chaînes de caractères (fonctions), enregistrements (records).",
    theoremes:[
      {id:'D1',type:'def',nom:"Tableaux",
       enonce:"1D : TAB : TABLEAU[1..n] DE TYPE\nAccès : TAB[i]\n\n2D : M : TABLEAU[1..n, 1..p] DE TYPE\nAccès : M[i][j]\nParcours : 2 boucles POUR imbriquées"},
      {id:'D2',type:'def',nom:"Chaînes de caractères",
       enonce:"LONGUEUR(ch) : nombre de caractères\nCOPIE(ch, pos, len) : sous-chaîne\nPOS(ch, motif) : position\nEFFACER(ch, pos, len)\nINSERER(ch, pos, motif)\nCONCAT(ch1, ch2) ou ch1+ch2"},
      {id:'D3',type:'def',nom:"Enregistrements",
       enonce:"TYPE Etudiant = ENREGISTREMENT\n  nom : CHAINE\n  age : ENTIER\n  note : REEL\nFIN ENREGISTREMENT\n\nVAR e : Etudiant\nAccès : e.nom, e.age, e.note"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Maximum d'un tableau",
       enonce:"Trouver le maximum de TAB[1..n].",
       correction:"max <- TAB[1]\nPOUR i DE 2 A n FAIRE\n  SI TAB[i]>max ALORS max<-TAB[i] FIN SI\nFIN POUR\nÉcrire(max)"},
    ],
  },
  'sous-programmes': {
    ch:'CH 04', titre:'Sous-programmes', badge:'Algorithmique',
    duree:'~4h', section:'Bloc 1 — Algorithmique & Programmation',
    desc:"Procédures, fonctions, passage par valeur et par référence, portée.",
    theoremes:[
      {id:'D1',type:'def',nom:"Procédure vs Fonction",
       enonce:"Procédure : pas de retour\nProcédure NomP(p1:T1; VAR p2:T2)\nDébut ... Fin\nAppel : NomP(arg1, arg2)\n\nFonction : retourne une valeur\nFonction NomF(p:T) : TYPE_RETOUR\nDébut\n  RETOURNER valeur\nFin\nAppel : res <- NomF(arg)"},
      {id:'D2',type:'def',nom:"Passage de paramètres",
       enonce:"Par valeur : copie locale, pas d'effet sur l'appelant\n\nPar référence (VAR) :\n- Modification directe\n- Effet sur la variable de l'appelant\n- Pour retourner plusieurs valeurs\n\nPortée locale : visible dans le sous-programme\nPortée globale : visible partout (à éviter)"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Fonction puissance",
       enonce:"Écrire Puissance(a:REEL; n:ENTIER) : REEL",
       correction:"Fonction Puissance(a:REEL; n:ENTIER) : REEL\nVAR p:REEL; i:ENTIER\nDébut\n  p <- 1\n  POUR i DE 1 A n FAIRE p <- p*a FIN POUR\n  RETOURNER p\nFin"},
    ],
  },
  'algorithmes-avances': {
    ch:'CH 05', titre:'Algorithmes avancés', badge:'Algorithmique',
    duree:'~5h', section:'Bloc 1 — Algorithmique & Programmation',
    desc:"Tri sélection/insertion, recherche séquentielle/dichotomique, complexité.",
    theoremes:[
      {id:'A1',type:'algo',nom:"Tri par sélection — O(n²)",
       enonce:"POUR i DE 1 A n-1 FAIRE\n  posMin <- i\n  POUR j DE i+1 A n FAIRE\n    SI TAB[j] < TAB[posMin] ALORS posMin <- j\n  Echanger(TAB[i], TAB[posMin])\nFIN POUR"},
      {id:'A2',type:'algo',nom:"Tri par insertion — O(n²)",
       enonce:"POUR i DE 2 A n FAIRE\n  cle <- TAB[i]\n  j <- i-1\n  TANT QUE j>=1 ET TAB[j]>cle FAIRE\n    TAB[j+1] <- TAB[j] ; j <- j-1\n  FIN TANT QUE\n  TAB[j+1] <- cle\nFIN POUR"},
      {id:'A3',type:'algo',nom:"Recherche dichotomique — O(log n)",
       enonce:"Tableau trié requis !\ng <- 1 ; d <- n ; trouve <- FAUX\nTANT QUE g<=d ET NON trouve FAIRE\n  m <- (g+d) DIV 2\n  SI TAB[m]=x ALORS trouve <- VRAI\n  SINON SI x<TAB[m] ALORS d <- m-1\n  SINON g <- m+1\nFIN TANT QUE"},
      {id:'F1',type:'formule',nom:"Complexité",
       enonce:"O(1) : constant\nO(log n) : dichotomique\nO(n) : séquentiel\nO(n²) : tris sélection/insertion\n\nO(1) < O(log n) < O(n) < O(n²)"},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:"Tri sélection sur [5,2,8,1,4]",
       enonce:"Dérouler le tri par sélection sur TAB=[5,2,8,1,4].",
       correction:"i=1: min=1(pos4) -> [1,2,8,5,4]\ni=2: min=2(pos2) -> [1,2,8,5,4]\ni=3: min=4(pos5) -> [1,2,4,5,8]\nFinal : [1,2,4,5,8]"},
    ],
  },
  'programmation-pascal-python': {
    ch:'CH 06', titre:'Programmation Pascal / Python', badge:'Programmation',
    duree:'~6h', section:'Bloc 1 — Algorithmique & Programmation',
    desc:"Syntaxe Pascal et Python, transformation algorithme vers code, débogage.",
    theoremes:[
      {id:'F1',type:'formule',nom:"Correspondances Algo / Pascal / Python",
       enonce:"Déclaration :\n  Pascal : var x: integer;\n  Python : x = 0\n\nAffectation :\n  Pascal : x := 5;\n  Python : x = 5\n\nCondition :\n  Pascal : if x>0 then begin...end;\n  Python : if x>0:\\n    ...\n\nBoucle POUR :\n  Pascal : for i:=1 to n do begin...end;\n  Python : for i in range(1, n+1):"},
      {id:'F2',type:'formule',nom:"Syntaxe Pascal",
       enonce:"program MonProg;\nvar x: integer; s: string;\nbegin\n  readln(x);\n  writeln('Val : ', x);\n  for i:=1 to 10 do begin ... end;\n  while cond do begin ... end;\n  repeat ... until cond;\nend.\n\nprocedure NomP(var a: integer);\nfunction NomF(x: real): real;"},
      {id:'F3',type:'formule',nom:"Syntaxe Python",
       enonce:"x = int(input('Entrez x : '))\nprint('Val :', x)\n\nfor i in range(1, 11):\n    print(i)\n\nwhile cond:\n    instructions\n\ndef ma_fonction(param):\n    return resultat\n\ntab = [1, 2, 3]  # liste\nlen(tab)         # longueur"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Factorielle en Python",
       enonce:"Écrire factorielle(n) en Python.",
       correction:"def factorielle(n):\n    f = 1\n    for i in range(1, n+1):\n        f = f * i\n    return f\nprint(factorielle(5))  # 120"},
      {id:'EX02',niveau:'Intermédiaire',titre:"Tri sélection en Pascal",
       enonce:"Implémenter le tri par sélection en Pascal pour n=5 entiers.",
       correction:"var tab: array[1..5] of integer;\n    i,j,posMin,tmp: integer;\nbegin\n  for i:=1 to 4 do begin\n    posMin:=i;\n    for j:=i+1 to 5 do\n      if tab[j]<tab[posMin] then posMin:=j;\n    tmp:=tab[i]; tab[i]:=tab[posMin]; tab[posMin]:=tmp;\n  end;\nend."},
    ],
  },
  'concepts-base-bd': {
    ch:'CH 07', titre:'Concepts de base des bases de données', badge:'Bases de données',
    duree:'~3h', section:'Bloc 2 — Bases de données',
    desc:"Définition BDD, table, enregistrement, champ, clé primaire, SGBD.",
    theoremes:[
      {id:'D1',type:'def',nom:"Base de données",
       enonce:"Ensemble structuré de données organisées, partagées, sécurisées.\n\nAvantages :\n- Partage multi-utilisateurs\n- Intégrité et cohérence\n- Sécurité (droits d'accès)\n- Sans redondance\n- Requêtes SQL puissantes"},
      {id:'D2',type:'def',nom:"Table, enregistrement, champ",
       enonce:"Table : structure 2D (lignes et colonnes)\nEnregistrement/ligne : données d'une entité\nChamp/colonne : propriété de l'entité\nClé primaire : identifiant UNIQUE et NOT NULL\n\nSGBD : MySQL, SQLite, PostgreSQL, Oracle, Access"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Identifier les éléments",
       enonce:"PRODUIT(id_produit, nom, prix, stock). Clé primaire ?",
       correction:"Clé primaire : id_produit\nAttributs : nom, prix, stock\nEnregistrement : (1, 'Stylo', 0.5, 200)"},
    ],
  },
  'modelisation-relationnelle': {
    ch:'CH 08', titre:'Modélisation relationnelle', badge:'Bases de données',
    duree:'~4h', section:'Bloc 2 — Bases de données',
    desc:"Modèle E/A, relations 1-1, 1-N, N-N, clé étrangère, intégrité référentielle.",
    theoremes:[
      {id:'D1',type:'def',nom:"Types de relations",
       enonce:"1-N : CLASSE (1) -> ELEVES (N)\nClé étrangère dans la table N\n\nN-N : ELEVES <-> COURS\nTable de jonction : INSCRIPTION(id_eleve#, id_cours#)\n\n1-1 : PERSONNE <-> PASSEPORT"},
      {id:'D2',type:'def',nom:"Schéma relationnel",
       enonce:"ELEVE(id_eleve, nom, age, id_classe#)\nCLASSE(id_classe, niveau, section)\n\n# = clé étrangère\nIntégrité référentielle : valeur de # doit exister"},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:"Bibliothèque",
       enonce:"Membres empruntent des livres (N-N). Schéma relationnel ?",
       correction:"LIVRE(id_livre, titre, auteur)\nMEMBRE(id_membre, nom, email)\nEMPRUNT(id_emprunt, id_membre#, id_livre#, date_emprunt)"},
    ],
  },
  'sql-requetes-simples': {
    ch:'CH 09', titre:'SQL — Requêtes simples', badge:'Bases de données',
    duree:'~4h', section:'Bloc 2 — Bases de données',
    desc:"SELECT, FROM, WHERE, DISTINCT, BETWEEN, IN, LIKE.",
    theoremes:[
      {id:'S1',type:'sql',nom:"SELECT et WHERE",
       enonce:"SELECT col1, col2 FROM table\nSELECT * FROM table\nSELECT DISTINCT col FROM table\n\nFiltrage :\nSELECT * FROM ELEVE WHERE age > 16\nSELECT * FROM ELEVE WHERE age>16 AND note>=10"},
      {id:'S2',type:'sql',nom:"BETWEEN, IN, LIKE",
       enonce:"BETWEEN (bornes incluses) :\nWHERE prix BETWEEN 10 AND 50\n\nIN (liste de valeurs) :\nWHERE section IN ('Maths','Info')\n\nLIKE (motif) :\n% = 0+ caractères\n_ = exactement 1 caractère\nWHERE nom LIKE 'Ben%'"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Requête filtrée",
       enonce:"ELEVE(id, nom, age, note, section). Nom et note des élèves 'Info' avec note >= 15.",
       correction:"SELECT nom, note\nFROM ELEVE\nWHERE section = 'Info' AND note >= 15;"},
    ],
  },
  'sql-requetes-avancees': {
    ch:'CH 10', titre:'SQL — Requêtes avancées', badge:'Bases de données',
    duree:'~5h', section:'Bloc 2 — Bases de données',
    desc:"ORDER BY, GROUP BY, HAVING, COUNT/SUM/AVG/MAX/MIN, INNER JOIN.",
    theoremes:[
      {id:'S1',type:'sql',nom:"Agrégats et tri",
       enonce:"COUNT(*) SUM(col) AVG(col) MAX(col) MIN(col)\n\nSELECT AVG(note), MAX(note) FROM ELEVE\nSELECT * FROM ELEVE ORDER BY note DESC"},
      {id:'S2',type:'sql',nom:"GROUP BY et HAVING",
       enonce:"SELECT section, AVG(note)\nFROM ELEVE GROUP BY section\nHAVING AVG(note) > 12\n\nWHERE filtre lignes\nHAVING filtre groupes"},
      {id:'S3',type:'sql',nom:"INNER JOIN",
       enonce:"SELECT E.nom, C.section\nFROM ELEVE E\nINNER JOIN CLASSE C ON E.id_classe = C.id_classe"},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:"Ventes par ville",
       enonce:"VENTE(id, ville, montant). Villes avec total > 10000.",
       correction:"SELECT ville, SUM(montant) AS total\nFROM VENTE\nGROUP BY ville\nHAVING SUM(montant) > 10000\nORDER BY total DESC;"},
    ],
  },
  'sql-manipulation': {
    ch:'CH 11', titre:'SQL — Manipulation de données', badge:'Bases de données',
    duree:'~3h', section:'Bloc 2 — Bases de données',
    desc:"INSERT INTO, UPDATE SET WHERE, DELETE FROM WHERE, CREATE TABLE.",
    theoremes:[
      {id:'S1',type:'sql',nom:"INSERT, UPDATE, DELETE",
       enonce:"INSERT INTO table (col1, col2) VALUES (val1, val2)\n\nUPDATE table SET col1=val1 WHERE condition\n!! Sans WHERE = TOUTES les lignes !!\n\nDELETE FROM table WHERE condition\n!! Sans WHERE = TOUTES les lignes !!"},
      {id:'S2',type:'sql',nom:"CREATE TABLE",
       enonce:"CREATE TABLE ELEVE (\n  id INTEGER PRIMARY KEY,\n  nom VARCHAR(50) NOT NULL,\n  age INTEGER,\n  note DECIMAL(4,2)\n)"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"INSERT et UPDATE",
       enonce:"1) Insérer: id=20, nom='Sana', age=16, note=17\n2) Ajouter +2 pts aux notes section 'Maths'",
       correction:"INSERT INTO ELEVE (id,nom,age,note)\nVALUES (20,'Sana',16,17);\n\nUPDATE ELEVE\nSET note = note+2\nWHERE section = 'Maths';"},
    ],
  },
  'normalisation': {
    ch:'CH 12', titre:'Normalisation', badge:'Bases de données',
    duree:'~3h', section:'Bloc 2 — Bases de données',
    desc:"Dépendances fonctionnelles, 1FN, 2FN, 3FN — éviter redondance et anomalies.",
    theoremes:[
      {id:'D1',type:'def',nom:"1FN, 2FN, 3FN",
       enonce:"1FN : attributs atomiques (une valeur par cellule)\n\n2FN : 1FN + pas de dépendance partielle\nTout attribut dépend de TOUTE la clé primaire\n\n3FN : 2FN + pas de dépendance transitive\nAucun attribut non-clé ne dépend d'un autre non-clé\n\nDF : A -> B signifie A determine B"},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:"Normaliser en 3FN",
       enonce:"COMMANDE(id_cmd, id_client, nom_client, ville, montant). Problème ?",
       correction:"Dépendance transitive : id_client -> nom_client, ville\n\nNormalisation :\nCOMMANDE(id_cmd, id_client#, montant)\nCLIENT(id_client, nom_client, ville)"},
    ],
  },
  'internet-reseaux': {
    ch:'CH 13', titre:'Internet & Réseaux', badge:'TIC',
    duree:'~3h', section:'Bloc 3 — TIC',
    desc:"LAN/WAN/Internet, client-serveur, HTTP/TCP/IP/DNS, adresse IP.",
    theoremes:[
      {id:'D1',type:'def',nom:"Types de réseaux",
       enonce:"LAN : réseau local (école, maison)\nWAN : réseau étendu (ville, pays)\nInternet : réseau mondial\nIntranet : réseau privé entreprise\n\nModèle client-serveur :\nNavigateur (client) -> Serveur web -> Page HTML"},
      {id:'D2',type:'def',nom:"Protocoles et adressage IP",
       enonce:"HTTP/HTTPS : web (port 80/443)\nTCP/IP : protocole de base Internet\nDNS : nom -> adresse IP\nFTP : transfert de fichiers\n\nIPv4 : 4 octets ex: 192.168.1.15\nIP privée : 192.168.x.x (réseau local)\nIP publique : unique sur Internet"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Rôle des protocoles",
       enonce:"A quoi servent HTTP, DNS, FTP ?",
       correction:"HTTP : afficher pages web\nDNS : traduire www.google.com en adresse IP\nFTP : transférer des fichiers"},
    ],
  },
  'web-html-css-js': {
    ch:'CH 14', titre:'Web — HTML / CSS / JavaScript', badge:'TIC',
    duree:'~5h', section:'Bloc 3 — TIC',
    desc:"Structure HTML, balises sémantiques, CSS sélecteurs/propriétés, JS bases.",
    theoremes:[
      {id:'F1',type:'formule',nom:"Structure HTML",
       enonce:"<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Page</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Titre</h1>\n  <p>Paragraphe</p>\n  <a href=\"page2.html\">Lien</a>\n  <img src=\"photo.jpg\" alt=\"desc\">\n</body>\n</html>"},
      {id:'F2',type:'formule',nom:"CSS essentiel",
       enonce:"/* Sélecteurs */\ntag { }\n.classe { }\n#identifiant { }\n\n/* Propriétés */\ncolor: red;\nbackground-color: #1a1a2e;\nfont-size: 16px;\nmargin: 10px; padding: 15px;\nborder: 1px solid black;\ndisplay: flex;\njustify-content: center;"},
      {id:'F3',type:'formule',nom:"JavaScript bases",
       enonce:"var x = 5; let nom = 'Ahmed';\nalert('Bonjour');\nconsole.log(nom);\n\ndocument.getElementById('monId').innerHTML = 'Texte';\n\nfunction calcul() {\n  let a = parseInt(prompt('Nombre :'));\n  alert('Carré : ' + a*a);\n}"},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermédiaire',titre:"Page simple",
       enonce:"Créer page HTML avec titre, liste 3 matières, fond sombre.",
       correction:"<!DOCTYPE html><html><head><title>Ma Page</title>\n<style>\nbody { background:#1a1a2e; color:white; font-family:Arial; }\nh1 { color:#4f6ef7; }\n</style></head><body>\n<h1>Mes matières</h1>\n<ul><li>Maths</li><li>Info</li><li>Physique</li></ul>\n</body></html>"},
    ],
  },
  'systemes-informatiques': {
    ch:'CH 15', titre:'Systèmes informatiques', badge:'TIC',
    duree:'~3h', section:'Bloc 3 — TIC',
    desc:"Hardware (CPU, RAM, stockage, périphériques), Software (OS, apps), Von Neumann, binaire.",
    theoremes:[
      {id:'D1',type:'def',nom:"Hardware et Software",
       enonce:"CPU : processeur, fréquence GHz, cœurs\nRAM : mémoire vive volatile rapide\nSSD/HDD : stockage permanent\nPériphériques E : clavier, souris\nPériphériques S : écran, imprimante\n\nOS : Windows, Linux, macOS, Android\nApplications : navigateur, Word, Python\nLibre (open source) vs Propriétaire"},
      {id:'D2',type:'def',nom:"Architecture Von Neumann + Binaire",
       enonce:"4 composants : UC, Mémoire, E/S, Bus\nCycle : Fetch -> Decode -> Execute\n\nBinaire base 2 : 0 et 1\n1011₂ = 8+0+2+1 = 11₁₀\n1 bit, 8 bits = 1 octet, 1 Ko = 1024 octets"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Conversions binaire",
       enonce:"Convertir 1011₂ et 11001₂ en décimal.",
       correction:"1011₂ = 8+0+2+1 = 11₁₀\n11001₂ = 16+8+0+0+1 = 25₁₀"},
    ],
  },
  'securite-informatique': {
    ch:'CH 16', titre:'Sécurité informatique', badge:'TIC',
    duree:'~3h', section:'Bloc 3 — TIC',
    desc:"Menaces (virus, ransomware, phishing), protection (antivirus, 2FA), chiffrement.",
    theoremes:[
      {id:'D1',type:'def',nom:"Menaces",
       enonce:"Virus : se reproduit et propage\nRansomware : chiffre données, rançon\nPhishing : faux email/site pour voler\nSpyware/Keylogger : espionner\nDDoS : surcharger un serveur"},
      {id:'D2',type:'def',nom:"Protection et chiffrement",
       enonce:"Antivirus : détecte malwares\nPare-feu : filtre connexions\nMot de passe fort : 8+ car, maj, chiffres\n2FA : mot de passe + code SMS\nHTTPS : HTTP + chiffrement TLS\nSauvegarde : protéger contre perte"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Identifier les attaques",
       enonce:"1) Email demandant identifiants bancaires\n2) Fichiers chiffrés + demande 500€\n3) Logiciel enregistrant frappes clavier",
       correction:"1) Phishing\n2) Ransomware\n3) Keylogger (type spyware)"},
    ],
  },
}

function TypeBadge({type}:{type:string}) {
  const color = C[type as keyof typeof C] || C.def
  return <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,background:`${color}20`,color,border:`1px solid ${color}30`,flexShrink:0}}>{L[type as keyof typeof L]||type}</span>
}

const GROUPS = [
  {label:'Bloc 1 — Algorithmique & Programmation', slugs:['notions-base-algo','structures-controle','structures-donnees','sous-programmes','algorithmes-avances','programmation-pascal-python']},
  {label:'Bloc 2 — Bases de données', slugs:['concepts-base-bd','modelisation-relationnelle','sql-requetes-simples','sql-requetes-avancees','sql-manipulation','normalisation']},
  {label:'Bloc 3 — TIC', slugs:['internet-reseaux','web-html-css-js','systemes-informatiques','securite-informatique']},
]

export default function InfoSectionSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const secColor = SEC_COLOR[slug] || '#6366f1'
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  if (!ch) return (
    <><Navbar/>
      <main style={{paddingTop:80,minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:16}}>📭</div>
          <h2 style={{marginBottom:12}}>Chapitre non trouvé</h2>
          <Link href="/bac/info/informatique" style={{color:'#6366f1'}}>← Retour Informatique</Link>
        </div>
      </main><Footer/></>
  )

  return (
    <><Navbar/>
      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center',flexWrap:'wrap'}}>
          <Link href="/bac" style={{color:'var(--muted)',textDecoration:'none'}}>Bac</Link><span>›</span>
          <Link href="/bac/info/informatique" style={{color:'var(--muted)',textDecoration:'none'}}>Informatique</Link><span>›</span>
          <span style={{color:secColor,fontWeight:600}}>{ch.ch} — {ch.titre}</span>
        </div>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 275px',gap:32,alignItems:'start'}}>
            <div>
              <div style={{marginBottom:32}}>
                <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:12,background:'var(--surface2)',color:'var(--muted)',padding:'3px 10px',borderRadius:8}}>Sc. Informatiques · {ch.ch}</span>
                  <span style={{fontSize:12,background:`${secColor}20`,color:secColor,padding:'3px 10px',borderRadius:12,fontWeight:600}}>{ch.badge}</span>
                  <span style={{fontSize:11,background:'rgba(99,102,241,0.1)',color:'#6366f1',padding:'3px 10px',borderRadius:12}}>Bac Tunisie · Coef. 4</span>
                </div>
                <h1 style={{fontSize:'clamp(22px,3.5vw,36px)',marginBottom:8}}>{ch.titre}</h1>
                <div style={{fontSize:12,color:secColor,marginBottom:8}}>📂 {ch.section}</div>
                <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.65,marginBottom:14,maxWidth:640}}>{ch.desc}</p>
                <div style={{display:'flex',gap:16,fontSize:12,color:'var(--muted)',flexWrap:'wrap'}}>
                  <span>📊 {ch.theoremes.length} concepts</span><span>·</span>
                  <span>📝 {ch.exercices.length} exercices</span><span>·</span>
                  <span>⏱ {ch.duree}</span>
                </div>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:24,padding:'10px 14px',background:'var(--surface)',borderRadius:12,border:'1px solid var(--border)'}}>
                <span style={{fontSize:12,color:'var(--muted)',marginRight:4}}>Types :</span>
                {Object.entries(L).map(([k,v])=>(<span key={k} style={{fontSize:11,padding:'2px 10px',borderRadius:20,background:`${C[k as keyof typeof C]}18`,color:C[k as keyof typeof C],border:`1px solid ${C[k as keyof typeof C]}25`,fontWeight:600}}>{v}</span>))}
              </div>
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📚 Cours — Théorèmes, Formules & Algorithmes</h2>
                <div style={{display:'flex',flexDirection:'column',gap:13}}>
                  {ch.theoremes.map(t=>{
                    const color = C[t.type as keyof typeof C] || C.def
                    return (
                      <div key={t.id} style={{borderLeft:`3px solid ${color}`,background:`${color}07`,borderRadius:'0 12px 12px 0',padding:'15px 20px',border:`1px solid ${color}18`}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8,gap:10,flexWrap:'wrap'}}>
                          <div style={{fontWeight:700,fontSize:14}}>{t.nom}</div>
                          <TypeBadge type={t.type}/>
                        </div>
                        <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.8,whiteSpace:'pre-line',fontFamily:(t.type==='formule'||t.type==='algo'||t.type==='sql')?'var(--font-mono)':'inherit'}}>{t.enonce}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📝 Exercices</h2>
                <div style={{display:'flex',flexDirection:'column',gap:11}}>
                  {ch.exercices.map(ex=>(
                    <div key={ex.id} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
                      <div style={{padding:'15px 20px'}}>
                        <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
                          <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',background:'var(--surface2)',padding:'2px 8px',borderRadius:6}}>{ex.id}</span>
                          <span style={{fontSize:11,padding:'2px 8px',borderRadius:10,fontWeight:600,background:ex.niveau==='Facile'?'rgba(6,214,160,0.15)':'rgba(245,158,11,0.15)',color:ex.niveau==='Facile'?'#06d6a0':'#f59e0b'}}>{ex.niveau}</span>
                          <span style={{fontWeight:600,fontSize:14}}>{ex.titre}</span>
                        </div>
                        <p style={{fontSize:13,color:'var(--text2)',margin:0,lineHeight:1.6,whiteSpace:'pre-line'}}>{ex.enonce}</p>
                      </div>
                      <div style={{borderTop:'1px solid var(--border)',padding:'10px 20px',display:'flex',gap:10,flexWrap:'wrap'}}>
                        <Link href={`/solve?q=${encodeURIComponent('Informatique Bac — '+ch.titre+' — '+ex.enonce)}&subject=informatique`} className="btn btn-primary" style={{fontSize:12,padding:'6px 14px'}}>🤖 Résoudre avec IA</Link>
                        <button onClick={()=>setOpenEx(openEx===ex.id?null:ex.id)} style={{fontSize:12,padding:'6px 14px',borderRadius:8,border:'1px solid var(--border)',background:'transparent',color:'var(--text2)',cursor:'pointer',fontFamily:'inherit'}}>
                          {openEx===ex.id?'Masquer':'Voir correction'}
                        </button>
                      </div>
                      {openEx===ex.id&&(
                        <div style={{padding:'13px 20px',borderTop:'1px solid var(--border)',background:`${secColor}06`}}>
                          <div style={{fontSize:11,color:secColor,fontWeight:700,marginBottom:5}}>✅ Correction</div>
                          <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.75,whiteSpace:'pre-line',fontFamily:'var(--font-mono)'}}>{ex.correction}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,borderTop:'1px solid var(--border)',paddingTop:22}}>
                {prevSlug?(<Link href={`/bac/info/informatique/${prevSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>← Précédent</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[prevSlug]}</div></div></Link>):<div/>}
                {nextSlug?(<Link href={`/bac/info/informatique/${nextSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px',textAlign:'right',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>Suivant →</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[nextSlug]}</div></div></Link>):<div/>}
              </div>
            </div>
            <aside style={{position:'sticky',top:88}}>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',marginBottom:14}}>
                <div style={{padding:'11px 15px',borderBottom:'1px solid var(--border)',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>💻 Informatique · 16 ch.</div>
                {GROUPS.map(g=>(
                  <div key={g.label}>
                    <div style={{padding:'7px 15px 3px',fontSize:10,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',background:'rgba(255,255,255,0.02)'}}>{g.label}</div>
                    {g.slugs.map(s=>(
                      <Link key={s} href={`/bac/info/informatique/${s}`} style={{textDecoration:'none'}}>
                        <div style={{padding:'8px 15px',borderBottom:'1px solid var(--border)',background:s===slug?`${SEC_COLOR[s]}12`:'transparent',borderLeft:s===slug?`3px solid ${SEC_COLOR[s]}`:'3px solid transparent',transition:'all 0.15s'}}
                          onMouseEnter={e=>{if(s!==slug)(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.03)'}}
                          onMouseLeave={e=>{if(s!==slug)(e.currentTarget as HTMLElement).style.background='transparent'}}>
                          <div style={{fontSize:10,color:'var(--muted)',marginBottom:1,fontFamily:'var(--font-mono)'}}>{NUMS[s]}</div>
                          <div style={{fontSize:11,fontWeight:s===slug?700:400,color:s===slug?SEC_COLOR[s]:'var(--text2)'}}>{TITRES[s]}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:13,padding:'14px'}}>
                <div style={{fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Actions</div>
                <div style={{display:'flex',flexDirection:'column',gap:7}}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+ch.titre+' Informatique Bac Tunisie')}&subject=informatique`} className="btn btn-primary" style={{textAlign:'center',fontSize:12}}>🤖 Chat IA</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>📋 Exercice Bac</Link>
                  <Link href="/bac/info/informatique" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>← Retour</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer/>
      <style>{`@media(max-width:900px){div[style*="grid-template-columns: 1fr 275px"]{grid-template-columns:1fr!important;}aside{display:none;}}`}</style>
    </>
  )
}