'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// SNT SECONDE — INFORMATIQUE FRANCE / [SLUG]
// Route : /bac-france/informatique/seconde/[slug]
// Sciences Numériques et Technologie · 1h30/semaine · Obligatoire
// 7 thèmes : Internet · Web · Réseaux sociaux · Données ·
//            Géolocalisation · Photographie · Objets connectés
// ══════════════════════════════════════════════════════════════════════

const C = {
  def:'#06b6d4', notion:'#8b5cf6', formule:'#f59e0b',
  methode:'#10b981', prop:'#ec4899'
}
const L: Record<string,string> = {
  def:'Définition', notion:'Notion clé', formule:'Formule clé',
  methode:'Méthode', prop:'À retenir'
}

const NAV_ORDER = [
  'internet','web','reseaux-sociaux','donnees',
  'geolocalisation','photographie','objets-connectes'
]

const TITRES_NAV: Record<string,string> = {
  'internet':         'TH 01 — Internet',
  'web':              'TH 02 — Le Web',
  'reseaux-sociaux':  'TH 03 — Réseaux sociaux',
  'donnees':          'TH 04 — Données structurées',
  'geolocalisation':  'TH 05 — Géolocalisation',
  'photographie':     'TH 06 — Photographie numérique',
  'objets-connectes': 'TH 07 — Objets connectés',
}

const SEC_COLORS: Record<string,string> = {
  'internet':'#06b6d4','web':'#8b5cf6','reseaux-sociaux':'#ec4899',
  'donnees':'#10b981','geolocalisation':'#f59e0b',
  'photographie':'#6366f1','objets-connectes':'#ef4444',
}

const ICONS: Record<string,string> = {
  'internet':'🌐','web':'🕸️','reseaux-sociaux':'👥',
  'donnees':'🗄️','geolocalisation':'📍',
  'photographie':'📷','objets-connectes':'🤖',
}

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; color:string; emoji:string; desc:string; objectif:string; souschapitres:SC[] }

const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// TH 01 — INTERNET
// ─────────────────────────────────────────────────────────────────────
'internet': {
  id:'internet', emoji:'🌐', color:'#06b6d4',
  titre:'Internet',
  objectif:'Comprendre comment Internet fonctionne',
  desc:"Fonctionnement d'Internet (né en 1969), adressage IPv4/IPv6, protocoles TCP/IP, DNS (annuaire), modèle client-serveur, routage des paquets.",
  souschapitres:[
    {
      id:'sc-int1', titre:'1.1 Définition, adresses IP et protocoles',
      notions:['Internet ≠ Web (infrastructure vs service)','IPv4 : 4×0-255 (ex: 192.168.1.1)','TCP : découpe en paquets, garantit livraison','IP : adresse et route chaque paquet'],
      blocs:[
        {
          notion:'🌐 Internet — fondamentaux',
          theoremes:[
            { id:'D-I1', type:'def', nom:"Internet et adresses IP",
              enonce:"INTERNET :\nRéseau mondial de réseaux interconnectés.\nNé en 1969 (ARPANET) — réseau décentralisé militaire.\n\nINTERNET ≠ WEB :\n→ Internet = infrastructure (réseau physique, câbles, routeurs)\n→ Web = service sur Internet (pages, sites)\nAutres services Internet : email, FTP, streaming, jeux en ligne\n\nADRESSE IP :\nIdentifiant unique de chaque machine sur Internet.\n\nIPv4 : 4 nombres de 0 à 255\nEx : 192.168.1.1 ; 142.250.74.46\n→ Environ 4 milliards d'adresses (bientôt épuisées)\n\nIPv6 : 8 groupes hexadécimaux\nEx : 2001:0db8:85a3::8a2e:0370:7334\n→ 340 sextillions d'adresses\n\nIP PUBLIQUE : visible sur Internet (attribuée par le FAI)\nIP PRIVÉE : réseau local (192.168.x.x, 10.x.x.x)" },
            { id:'N-I1', type:'notion', nom:"Protocoles TCP/IP",
              enonce:"TCP (Transmission Control Protocol) :\n• Découpe les données en PAQUETS numérotés\n• Garantit la LIVRAISON et l'ORDRE\n• Accusé de réception (ACK)\n→ Utilisé pour HTTP, email, FTP\n\nIP (Internet Protocol) :\n• ADRESSE et ROUTE chaque paquet\n• Chaque paquet peut prendre un chemin différent\n• Réassemblage à l'arrivée\n\nANALOGIE :\nTCP = la Poste (garantit la livraison)\nIP = le système d'adresses postales",
              remarque:"UDP = alternative à TCP, sans garantie de livraison, mais plus rapide → streaming, jeux en ligne, visioconférence." },
          ],
          exercices:[
            { id:'EX-I1', niveau:'Facile', titre:'Composants réseau domestique',
              enonce:"Dans une connexion Internet domestique, identifier le rôle de : routeur, modem, FAI, serveur DNS.",
              correction:"Modem : convertit signal analogique (fibre/ADSL) en numérique.\nRouteur : distribue la connexion en réseau local (WiFi).\nFAI : fournit l'accès Internet (Orange, Free, Ooredoo...).\nDNS : traduit noms de domaines en adresses IP." },
          ]
        },
      ]
    },
    {
      id:'sc-int2', titre:'1.2 DNS, routage et client-serveur',
      notions:['DNS : annuaire (nom → IP)','Routage : chemin optimal entre routeurs','Client : envoie requête ; Serveur : répond','Stateless : chaque requête est indépendante'],
      blocs:[
        {
          notion:'📡 DNS, routage et modèle client-serveur',
          theoremes:[
            { id:'D-I2', type:'def', nom:"DNS — Annuaire d'Internet",
              enonce:"DNS = Domain Name System\nTraduction : nom de domaine → adresse IP\nEx : google.com → 142.250.74.46\n\nÉTAPES DNS :\n1. Navigateur vérifie son CACHE DNS local\n2. Si absent : interroge le serveur DNS du FAI\n3. DNS répond avec l'adresse IP\n4. Navigateur contacte le serveur à cette IP\n\nCACHE DNS : mémorise les traductions pour accélérer\nDurée : quelques minutes à quelques heures (TTL)\n\nHIÉRARCHIE DNS :\nRacine . → .com → google.com → www.google.com" },
            { id:'N-I2', type:'notion', nom:"Routage et modèle client-serveur",
              enonce:"ROUTAGE :\nLes ROUTEURS acheminent les paquets IP\n→ Chaque routeur lit l'adresse IP destination\n→ Envoie le paquet vers le prochain routeur (hop)\n→ Tables de routage : meilleur chemin à chaque instant\n\nMODÈLE CLIENT-SERVEUR :\nClient (navigateur, app) → envoie une REQUÊTE\nServeur (puissant) → traite et RÉPOND\n\nEXEMPLE (naviguer sur un site) :\n1. Résolution DNS (domaine → IP)\n2. Connexion TCP avec le serveur\n3. Envoi requête HTTP\n4. Serveur renvoie la page HTML\n5. Navigateur affiche la page\n\nSTATELESS : chaque requête est indépendante\n→ Les cookies compensent cette absence d'état" },
          ],
          exercices:[
            { id:'EX-I2', niveau:'Facile', titre:'Chemin d\'un paquet',
              enonce:"Décrire les étapes d'envoi d'un email de Paris à Tokyo.",
              correction:"1. Email découpé en paquets TCP/IP.\n2. Chaque paquet part avec l'adresse IP destination.\n3. Routeurs successifs acheminent chaque paquet.\n4. Paquets transitent via câbles sous-marins.\n5. Réassemblés à l'arrivée à Tokyo.\nDurée : quelques millisecondes." },
            { id:'EX-I3', niveau:'Intermédiaire', titre:'Requête DNS complète',
              enonce:"Expliquer ce qui se passe quand on tape 'www.wikipedia.org' dans le navigateur.",
              correction:"1. Navigateur vérifie cache DNS local.\n2. Interroge le serveur DNS du FAI.\n3. DNS résout : wikipedia.org → 185.15.58.224\n4. Navigateur établit connexion TCP (SYN/SYN-ACK/ACK).\n5. Envoie requête HTTP GET /\n6. Serveur Wikipedia renvoie la page HTML.\n7. Navigateur affiche la page." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// TH 02 — LE WEB
// ─────────────────────────────────────────────────────────────────────
'web': {
  id:'web', emoji:'🕸️', color:'#8b5cf6',
  titre:'Le Web',
  objectif:'Créer une page web simple et comprendre les moteurs de recherche',
  desc:"Tim Berners-Lee (1989), URL (protocole/domaine/chemin), HTML (structure), CSS (mise en forme), moteurs de recherche (crawl → index → ranking).",
  souschapitres:[
    {
      id:'sc-web1', titre:'2.1 Web, URL et HTML/CSS',
      notions:['Web = pages + hyperliens via HTTP (≠ Internet)','URL : https://domaine/chemin?paramètres','HTML : structure (<h1>, <p>, <a>, <img>)','CSS : mise en forme (couleurs, marges, polices)'],
      blocs:[
        {
          notion:'🕸️ Web et pages HTML',
          theoremes:[
            { id:'D-W1', type:'def', nom:"Le Web — définition et URL",
              enonce:"WEB :\nEnsemble de pages reliées par des HYPERLIENS\naccessibles via le protocole HTTP.\nInventé par Tim Berners-Lee en 1989 au CERN.\n\nWEB ≠ INTERNET :\n• Internet = infrastructure (réseau de réseaux)\n• Web = service sur Internet (pages, sites)\n\nURL (Uniform Resource Locator) :\nprotocole://domaine:port/chemin?paramètres\n\nEXEMPLE :\nhttps://www.wikipedia.org/wiki/France\n\n• https : protocole sécurisé (HTTP + TLS)\n• www.wikipedia.org : nom de domaine\n• /wiki/France : chemin vers la ressource\n\nHTTPS = HTTP + chiffrement TLS\n→ Cadenas dans le navigateur\n→ Données chiffrées (mots de passe, CB)" },
            { id:'N-W1', type:'notion', nom:"HTML et CSS — bases",
              enonce:"HTML = HyperText Markup Language → STRUCTURE\n\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Ma page</title>\n    <link rel=\"stylesheet\" href=\"style.css\">\n  </head>\n  <body>\n    <h1>Titre principal</h1>\n    <p>Paragraphe de texte.</p>\n    <a href=\"https://...\">Lien</a>\n    <img src=\"photo.jpg\" alt=\"description\">\n    <ul>\n      <li>Élément liste</li>\n    </ul>\n  </body>\n</html>\n\nCSS = Cascading Style Sheets → APPARENCE\n\nh1 { color: blue; font-size: 24px; }\n.maClasse { background: #f0f0f0; }\n#monId { margin: 10px; padding: 5px; }\n\nSÉLECTEURS :\ntag {} → toutes les balises de ce type\n.class {} → éléments avec class=\"class\"\n#id {} → élément avec id=\"id\"" },
          ],
          exercices:[
            { id:'EX-W1', niveau:'Facile', titre:'Décoder une URL',
              enonce:"Analyser : https://docs.python.org/3/library/math.html\nIdentifier : protocole, domaine, chemin, fichier.",
              correction:"Protocole : https (connexion sécurisée TLS)\nDomaine : docs.python.org\nChemin : /3/library/\nFichier : math.html\n→ Page de doc Python sur le module math, version 3." },
            { id:'EX-W2', niveau:'Facile', titre:'Écrire du HTML',
              enonce:"Écrire le code HTML d'une page avec : titre 'Mon CV', sous-titre 'Compétences', liste de 3 langages.",
              correction:"<!DOCTYPE html>\n<html>\n<head><title>Mon CV</title></head>\n<body>\n  <h1>Mon CV</h1>\n  <h2>Compétences</h2>\n  <ul>\n    <li>Python</li>\n    <li>HTML/CSS</li>\n    <li>SQL</li>\n  </ul>\n</body>\n</html>" },
          ]
        },
      ]
    },
    {
      id:'sc-web2', titre:'2.2 Moteurs de recherche',
      notions:['1. Crawl : robots suivent les liens','2. Indexation : base de données de mots-clés','3. Ranking : PageRank + pertinence','Référencement naturel SEO vs payant'],
      blocs:[
        {
          notion:'🔍 Moteurs de recherche',
          theoremes:[
            { id:'M-W1', type:'methode', nom:"Fonctionnement d'un moteur de recherche",
              enonce:"3 ÉTAPES :\n\n1. EXPLORATION (Crawling) :\nDes robots (crawlers/spiders) parcourent le Web\nen suivant les liens de page en page.\nIls découvrent de nouvelles pages en continu.\n\n2. INDEXATION :\nContenu analysé et stocké dans une énorme base.\nMots-clés, méta-données, liens entrants...\n→ Index = dictionnaire inversé (mot → pages)\n\n3. CLASSEMENT (Ranking) :\nAlgorithme calcule la pertinence pour chaque requête.\nPageRank de Google : pages citées par beaucoup de pages\nvalent plus que les autres.\nCritères : pertinence, autorité, fraîcheur, rapidité.\n\nSEO (Search Engine Optimization) :\n→ Naturel : améliorer le site pour bien se classer\n→ Payant (SEA) : publicités en haut des résultats" },
          ],
          exercices:[
            { id:'EX-W3', niveau:'Intermédiaire', titre:'Analyser des résultats de recherche',
              enonce:"Pourquoi les premiers résultats Google ne sont pas forcément les meilleurs ? Expliquer le rôle des publicités et du référencement.",
              correction:"Les premiers résultats peuvent être :\n→ Des PUBLICITÉS payantes (marquées 'Annonce')\n→ Des sites avec un bon SEO (pas forcément le meilleur contenu)\n\nPageRank classe par nombre de liens entrants, mais :\n• Un site peut acheter des liens (spam)\n• Les grandes entreprises ont plus de budget SEO\n\nBon réflexe : regarder plusieurs résultats,\nvérifier la source, croiser les informations." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// TH 03 — RÉSEAUX SOCIAUX
// ─────────────────────────────────────────────────────────────────────
'reseaux-sociaux': {
  id:'reseaux-sociaux', emoji:'👥', color:'#ec4899',
  titre:'Réseaux sociaux',
  objectif:'Analyser les enjeux des réseaux sociaux',
  desc:"Modélisation par les graphes (sommets=utilisateurs, arêtes=liens), degré, diamètre, 6 degrés de séparation, algorithmes de recommandation, bulles de filtre.",
  souschapitres:[
    {
      id:'sc-rs1', titre:'3.1 Graphes et structure des réseaux',
      notions:['Graphe G=(V,E) : sommets=users, arêtes=liens','Degré = nb connexions directes','Orienté (Twitter) vs non orienté (Facebook)','Théorie des 6 degrés de séparation'],
      blocs:[
        {
          notion:'👥 Modélisation par les graphes',
          theoremes:[
            { id:'D-RS1', type:'def', nom:"Graphe social — définition",
              enonce:"GRAPHE G = (V, E) :\nV = ensemble de SOMMETS (noeuds)\nE = ensemble d'ARÊTES (liaisons)\n\nAPPLICATION aux réseaux sociaux :\n• Sommets = utilisateurs\n• Arêtes = liens d'amitié ou d'abonnement\n\nGRAPHE ORIENTÉ (Twitter/X, Instagram) :\nFlèche A → B : A suit B (pas forcément réciproque)\nA peut suivre B sans que B ne suive A\n\nGRAPHE NON ORIENTÉ (Facebook, LinkedIn) :\nLien mutuel A — B : les deux s'acceptent\n\nDEGRÉ d'un sommet :\n= nombre de connexions directes\nEx : Alice a 150 amis → degré(Alice) = 150\nNoeud central (HUB) = fort degré = influenceur\n\nDIAMÈTRE du graphe :\n= plus long chemin minimal entre 2 sommets quelconques\n\nTHÉORIE DES 6 DEGRÉS :\n2 personnes quelconques sont reliées par max 6 intermédiaires\n→ Facebook : diamètre moyen ≈ 3,5 (monde très connecté !)" },
            { id:'M-RS1', type:'methode', nom:"Analyser un graphe social",
              enonce:"1. Identifier les noeuds (utilisateurs).\n2. Tracer les arêtes (relations).\n3. Calculer le degré de chaque noeud.\n4. Repérer les hubs (fort degré).\n5. Identifier les communautés (clusters).\n6. Estimer le diamètre du graphe." },
          ],
          exercices:[
            { id:'EX-RS1', niveau:'Facile', titre:'Graphe d\'amis',
              enonce:"Alice est amie avec Bob et Charlie. Bob est ami avec Charlie et David. Calculer les degrés et identifier le hub.",
              correction:"Graphe non orienté :\nAlice — Bob, Alice — Charlie\nBob — Charlie, Bob — David\n\nDEGRÉS :\ndeg(Alice) = 2\ndeg(Bob) = 3 ← HUB\ndeg(Charlie) = 2\ndeg(David) = 1\n\nBob est le noeud le plus connecté (hub).\nDiamètre = 2 (Alice → Bob → David)." },
          ]
        },
      ]
    },
    {
      id:'sc-rs2', titre:'3.2 Algorithmes de recommandation et enjeux',
      notions:['Filtrage collaboratif : users similaires','Filtrage contenu : tes likes → profil','Bulle de filtre : opinions confirmées','Cyberharcèlement, désinformation, addiction'],
      blocs:[
        {
          notion:'🔄 Recommandation et enjeux sociaux',
          theoremes:[
            { id:'N-RS1', type:'notion', nom:"Algorithmes de recommandation",
              enonce:"FILTRAGE COLLABORATIF :\n'Les utilisateurs similaires à toi ont aimé X'\n→ Comparer profils d'utilisateurs\n\nFILTRAGE PAR CONTENU :\nAnalyse de tes likes, vues, durée de lecture\n→ Construit ton profil d'intérêts\n→ Te montre du contenu similaire\n\nENGAGEMENT MAXIMISÉ :\nObjectif des plateformes = maximiser le temps passé\n→ likes + commentaires + partages + temps\n→ Ce qui émeut (colère, peur) = plus engageant\n→ Modèle économique = publicité ciblée\n\nBULLE DE FILTRE :\nTu vois de plus en plus de contenu qui confirme\ntes opinions → isolement de points de vue différents\n\nEFFETS :\n• Radicalisation progressive des opinions\n• Propagation des fake news (plus engageantes)\n• Difficulté à former un avis nuancé" },
            { id:'P-RS1', type:'prop', nom:"Enjeux et protections",
              enonce:"CYBERHARCÈLEMENT :\nMauvais traitements répétés via outils numériques\n→ Signaler, ne pas hésiter à bloquer\n→ Conserver les preuves\n→ En parler à un adulte de confiance\n→ Signaler à la plateforme\n\nDÉSINFORMATION :\nVérifier : auteur, date, sources, d'autres sources\nSites de fact-checking : AFP Factuel, Libération CheckNews\n\nADDICTION PAR DESIGN :\nNotifications, likes, scroll infini = design addictif\n→ Limiter le temps d'écran\n→ Désactiver les notifications non essentielles\n\nDROITS NUMÉRIQUES :\nDroit à l'image : demander autorisation avant de publier\nDonnées personnelles : les plateformes collectent TOUT" },
          ],
          exercices:[
            { id:'EX-RS2', niveau:'Intermédiaire', titre:'Bulle de filtre',
              enonce:"Expliquer le phénomène de bulle de filtre et ses 3 principales conséquences.",
              correction:"Définition : l'algorithme montre en priorité les contenus\nconfirmant nos opinions précédentes.\n\nMécanisme :\n1. On like des contenus\n2. Algorithme apprend nos préférences\n3. Montre davantage de contenus similaires\n4. On voit de moins en moins d'autres points de vue\n\nConséquences :\n1. Radicalisation possible des opinions.\n2. Propagation de désinformation (fake news).\n3. Difficulté à former un avis nuancé et informé." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// TH 04 — DONNÉES STRUCTURÉES
// ─────────────────────────────────────────────────────────────────────
'donnees': {
  id:'donnees', emoji:'🗄️', color:'#10b981',
  titre:'Données structurées',
  objectif:'Comprendre comment les données sont structurées et protégées',
  desc:"Données et métadonnées, format CSV, tables (lignes/colonnes/clé primaire), opérations (sélection, projection, tri, agrégation), RGPD et droits.",
  souschapitres:[
    {
      id:'sc-don1', titre:'4.1 Données, tables et opérations',
      notions:['Donnée = information numérique','Métadonnée = donnée sur une donnée','CSV : ligne 1=en-têtes, lignes suivantes=enregistrements','Sélection, projection, tri, agrégation (COUNT/AVG)'],
      blocs:[
        {
          notion:'🗄️ Données structurées',
          theoremes:[
            { id:'D-D1', type:'def', nom:"Donnée, métadonnée et table",
              enonce:"DONNÉE = information représentée numériquement.\nTypes : texte, entier, décimal, date, booléen, image.\n\nMÉTADONNÉE = donnée SUR une donnée.\nEx : une photo contient des métadonnées :\n• Date et heure de prise de vue\n• Coordonnées GPS (lieu)\n• Modèle d'appareil photo\n• Résolution\n→ Révèle des infos sans voir le contenu !\n\nFORMAT CSV (Comma-Separated Values) :\nnom,sport,age\nAlice,natation,16\nBob,foot,17\n\nTABLE DE DONNÉES :\n• Ligne (enregistrement) = 1 entité\n• Colonne (attribut) = caractéristique\n• Clé primaire = identifiant unique\n\nEx : Table élèves :\nid | nom   | note | classe\n1  | Alice | 15   | 2nde A\n2  | Bob   | 12   | 2nde B" },
            { id:'N-D1', type:'notion', nom:"Opérations sur les tables",
              enonce:"SÉLECTION (filtre) :\nGarder les lignes vérifiant une condition.\nEx : élèves où note >= 10\n\nPROJECTION :\nGarder seulement certaines colonnes.\nEx : garder uniquement nom et note.\n\nTRI :\nOrdonner selon une colonne.\nEx : trier par note décroissante.\n\nAGRÉGATION :\nCOUNT : compter le nombre de lignes\nSUM : somme d'une colonne\nAVG : moyenne\nMAX / MIN : maximum / minimum\nEx : moyenne des notes = 13.5" },
          ],
          exercices:[
            { id:'EX-D1', niveau:'Facile', titre:'Lire une table CSV',
              enonce:"nom,sport,age\nAlice,natation,16\nBob,foot,17\nClara,natation,16\n\nQ1: Nb de lignes ? Q2: Attributs ? Q3: Sélectionner les élèves qui font natation.",
              correction:"Q1: 3 lignes de données (hors en-tête).\n\nQ2: 3 attributs : nom, sport, age.\n\nQ3: Sélection sport='natation' :\nnom   | sport    | age\nAlice | natation | 16\nClara | natation | 16\n→ 2 élèves pratiquent la natation." },
          ]
        },
      ]
    },
    {
      id:'sc-don2', titre:'4.2 RGPD et vie privée',
      notions:['RGPD (2018) : loi européenne protection données','Droits : accès, rectification, effacement, portabilité','Consentement : explicite, libre, révocable','CNIL : autorité française de contrôle'],
      blocs:[
        {
          notion:'🔒 RGPD et vie privée',
          theoremes:[
            { id:'D-D2', type:'def', nom:"RGPD — Règlement Général sur la Protection des Données",
              enonce:"RGPD (2018) = Règlement Européen\nS'applique dans toute l'Union Européenne\nObjectif : protéger les données personnelles des citoyens\n\nDONNÉE PERSONNELLE :\nToute info permettant d'identifier une personne\n(nom, email, IP, photo, localisation...)\n\nDROITS DES PERSONNES :\n• ACCÈS : savoir quelles données sont collectées\n• RECTIFICATION : corriger des erreurs\n• EFFACEMENT : 'droit à l'oubli'\n• PORTABILITÉ : récupérer ses données\n• OPPOSITION : refuser certains usages\n\nOBLIGATIONS des entreprises :\n• CONSENTEMENT explicite, libre, éclairé, révocable\n• Collecter le MINIMUM nécessaire\n• SÉCURISER les données\n• Signaler les failles dans 72h\n\nCNIL : autorité française de contrôle\nAMENDE MAX : 4% du chiffre d'affaires mondial\n(Ex : Google : 150M€ en 2022)",
              remarque:"Le consentement coché par défaut ou les cases pré-cochées ne sont PAS valides selon le RGPD. Le consentement doit être une action positive explicite." },
          ],
          exercices:[
            { id:'EX-D2', niveau:'Intermédiaire', titre:'Analyser une appli selon le RGPD',
              enonce:"Une appli collecte : nom, email, localisation GPS, historique de navigation. Analyser selon le RGPD.",
              correction:"Données personnelles collectées :\n• Nom : identification directe\n• Email : identification directe\n• GPS : donnée sensible (mouvements)\n• Historique : profil comportemental\n\nObligations RGPD :\n1. Informer l'utilisateur (transparence)\n2. Obtenir consentement explicite pour chaque usage\n3. Limiter la collecte au nécessaire\n4. Sécuriser les données\n5. Permettre l'effacement\n\nQuestion : le GPS est-il NÉCESSAIRE ?\n→ Seulement pour certaines fonctions (navigation)\n→ Ne pas activer par défaut" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// TH 05 — GÉOLOCALISATION
// ─────────────────────────────────────────────────────────────────────
'geolocalisation': {
  id:'geolocalisation', emoji:'📍', color:'#f59e0b',
  titre:'Géolocalisation',
  objectif:'Comprendre comment fonctionne la localisation géographique',
  desc:"GPS (24+ satellites à 20 200 km), d=c×t, trilatération (3 sphères), localisation sans GPS (WiFi, GSM, IP), enjeux vie privée.",
  souschapitres:[
    {
      id:'sc-geo1', titre:'5.1 GPS et calcul de distance',
      notions:['24+ satellites à 20 200 km d\'altitude','d = c × t (c=3×10⁸ m/s)','3 satellites → position 2D ; 4 → 3D','Précision civile : quelques mètres'],
      blocs:[
        {
          notion:'📍 GPS — principe et calcul',
          theoremes:[
            { id:'D-G1', type:'def', nom:"GPS — fonctionnement",
              enonce:"GPS = Global Positioning System (système américain)\n24+ satellites en orbite à 20 200 km d'altitude\n\nPRINCIPE :\n1. Chaque satellite émet en continu : heure + position\n2. Récepteur calcule le TEMPS DE PROPAGATION\n   (temps = heure réception − heure émission)\n3. DISTANCE = vitesse lumière × temps\n4. 3 satellites → position 2D (latitude, longitude)\n4 satellites → position 3D (altitude incluse)\n\nPRÉCISION :\n• Civil : quelques mètres\n• Militaire : < 1 mètre\n• Avec correction différentielle : < 10 cm\n\nAUTRES SYSTÈMES :\nGALILÉO (Europe), GLONASS (Russie), BeiDou (Chine)" },
            { id:'F-G1', type:'formule', nom:"Calcul de distance GPS",
              enonce:"d = c × t\n\nc = vitesse de la lumière = 3 × 10⁸ m/s\nt = temps de propagation du signal\n\nEXEMPLE :\nSignal reçu 0,07s après émission :\nd = 3 × 10⁸ × 0,07 = 21 000 000 m = 21 000 km\n\nEXEMPLE 2 :\nSignal reçu 0,08s après émission :\nd = 3 × 10⁸ × 0,08 = 24 000 000 m = 24 000 km\n\nATTENTION : le temps est très court !\n1 milliseconde → 300 km\n→ Les horloges GPS sont atomiques (précision extrême)" },
            { id:'N-G1', type:'notion', nom:"Trilatération et localisation sans GPS",
              enonce:"TRILATÉRATION (souvent appelée triangulation) :\nChaque satellite définit une SPHÈRE de rayon d\nIntersection de 3 sphères = 2 points\n4ème satellite élimine le mauvais point\n\nEn 2D (analogue) :\nSi on est à 3km de A, 4km de B, 5km de C\n→ Position = intersection des 3 cercles\n\nLOCALISATION SANS GPS :\nWiFi positioning :\n• BD des réseaux WiFi géoréférencés\n• Précision : quelques mètres en ville\n• Consomme peu d'énergie\n\nGSM (antennes téléphoniques) :\n• Trilatération entre 3 antennes proches\n• Précision : 100m à 1km\n\nAdresse IP : ville/région seulement (précision faible)\n\nCombiner GPS + WiFi + GSM = meilleur compromis",
              remarque:"Le WiFi positioning est utilisé quand le GPS n'est pas disponible (intérieur des bâtiments). Google a cartographié les réseaux WiFi lors du projet Street View." },
          ],
          exercices:[
            { id:'EX-G1', niveau:'Facile', titre:'Calculer une distance GPS',
              enonce:"Un satellite émet un signal. Le récepteur le reçoit 0,08 secondes plus tard. c=3×10⁸ m/s. Calculer la distance.",
              correction:"d = c × t = 3×10⁸ × 0,08 = 24 000 000 m = 24 000 km\n\nLe satellite est à 24 000 km du récepteur.\n(Cohérent avec les orbites GPS à ~20 000 km d'altitude.)" },
            { id:'EX-G2', niveau:'Intermédiaire', titre:'Vie privée et GPS',
              enonce:"Votre téléphone stocke votre historique GPS. Citer 3 risques et 3 protections.",
              correction:"RISQUES :\n1. Révélation de votre domicile et lieu de travail.\n2. Inférence de votre vie privée (médecin, religion, opinions).\n3. Revente des données à des publicitaires.\n\nPROTECTIONS :\n1. Désactiver la géolocalisation des apps inutiles.\n2. Refuser le partage de localisation non nécessaire.\n3. Désactiver l'historique de localisation Google/Apple." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// TH 06 — PHOTOGRAPHIE NUMÉRIQUE
// ─────────────────────────────────────────────────────────────────────
'photographie': {
  id:'photographie', emoji:'📷', color:'#6366f1',
  titre:'Photographie numérique',
  objectif:'Comprendre la représentation numérique des images',
  desc:"Pixel (plus petite unité), résolution (L×H), codage RGB (3 octets/pixel), taille = L×H×3, formats PNG (sans perte) vs JPEG (avec perte), compression.",
  souschapitres:[
    {
      id:'sc-photo1', titre:'6.1 Pixels, résolution et codage RGB',
      notions:['Pixel = plus petite unité d\'image','Résolution : L×H en pixels (ex: 1920×1080)','RGB : 3 composantes 0-255 (8 bits chacune)','1 pixel = 3 octets = 24 bits'],
      blocs:[
        {
          notion:'📷 Image numérique — représentation',
          theoremes:[
            { id:'D-P1', type:'def', nom:"Pixel et résolution",
              enonce:"PIXEL (picture element) :\nPlus petite unité d'une image numérique.\nChaque pixel a une couleur UNIFORME.\n\nRÉSOLUTION :\nLargeur × Hauteur en pixels\nEx : 1920 × 1080 = 2 073 600 pixels (~2 mégapixels)\n\nDPI (dots per inch) = densité pour l'impression :\n72 DPI : écran standard\n300 DPI : impression qualité photo\n\nPlus de pixels → image plus nette MAIS fichier plus lourd\n\nEXEMPLES :\nSmartphone récent : 12 à 200 mégapixels\nPhoto A4 qualité : 3508 × 2480 px (300 DPI)\nIcone web : 32 × 32 px suffit" },
            { id:'N-P1', type:'notion', nom:"Codage RGB des couleurs",
              enonce:"SYNTHÈSE ADDITIVE : Rouge + Vert + Bleu\nChaque composante : valeur de 0 à 255 (8 bits = 1 octet)\n\nEXEMPLES :\nRouge pur   : (255,   0,   0)\nVert pur    : (  0, 255,   0)\nBleu pur    : (  0,   0, 255)\nBlanc       : (255, 255, 255)\nNoir        : (  0,   0,   0)\nJaune       : (255, 255,   0)\nCyan        : (  0, 255, 255)\nMagenta     : (255,   0, 255)\nGris moyen  : (128, 128, 128)\n\n1 pixel RGB = 3 octets = 24 bits\n256³ = 16 777 216 couleurs possibles\n\nHTML : #FF0000 = rouge = rgb(255,0,0)" },
            { id:'F-P1', type:'formule', nom:"Taille d'une image non compressée",
              enonce:"Taille (octets) = Largeur × Hauteur × 3\n\nEXEMPLE 1 : image 800 × 600 :\n= 800 × 600 × 3 = 1 440 000 octets = 1,44 Mo\n\nEXEMPLE 2 : Full HD (1920 × 1080) :\n= 1920 × 1080 × 3 = 6 220 800 octets ≈ 6 Mo\n\nEXEMPLE 3 : 4K (3840 × 2160) :\n= 3840 × 2160 × 3 = 24 883 200 octets ≈ 24 Mo\n\nÀ MÉMORISER : × 3 car 3 composantes RGB" },
          ],
          exercices:[
            { id:'EX-P1', niveau:'Facile', titre:'Calculer la taille d\'une image',
              enonce:"Image de résolution 1200 × 800 pixels. Taille non compressée en Mo ?",
              correction:"Taille = 1200 × 800 × 3 = 2 880 000 octets\n= 2 880 000 / 1 000 000 ≈ 2,88 Mo\n\nSi compressé en JPEG (taux 10:1) ≈ 0,29 Mo" },
            { id:'EX-P2', niveau:'Facile', titre:'Codes RGB',
              enonce:"Q1: RGB de orange et gris clair.\nQ2: Quelle couleur est (0, 128, 255) ?",
              correction:"Q1:\nOrange : (255, 165, 0)\nGris clair : (200, 200, 200)\n(Gris : R = V = B)\n\nQ2: (0, 128, 255)\nRouge=0, Vert=128 (modéré), Bleu=255 (max)\n→ Bleu ciel / cyan foncé" },
          ]
        },
      ]
    },
    {
      id:'sc-photo2', titre:'6.2 Formats et compression',
      notions:['PNG : sans perte (logos, graphiques, texte)','JPEG : avec perte (photos, divisé par 5-10)','GIF : animations, max 256 couleurs','WebP : moderne, meilleur que PNG et JPEG'],
      blocs:[
        {
          notion:'📁 Formats d\'image',
          theoremes:[
            { id:'N-P2', type:'notion', nom:"Formats et compression d'image",
              enonce:"PNG — Sans perte (lossless) :\n• Qualité parfaite, fidèle au pixel près\n• Idéal : logos, graphiques, captures d'écran, texte\n• Supporte la transparence (fond transparent)\n• Fichier plus grand que JPEG\n\nJPEG — Avec perte (lossy) :\n• Compression importante (÷5 à ÷10)\n• Idéal : photos naturelles (dégradés de couleurs)\n• Artefacts visibles à fort taux de compression\n• Pas de transparence\n\nGIF :\n• Animations simples\n• Maximum 256 couleurs\n• Presque obsolète (remplacé par WebP)\n\nWebP (Google) :\n• Moderne : meilleure qualité + taille plus petite\n• Remplace PNG ET JPEG avantageusement\n• Pris en charge par tous les navigateurs modernes" },
          ],
          exercices:[
            { id:'EX-P3', niveau:'Intermédiaire', titre:'Choisir le bon format',
              enonce:"Choisir PNG ou JPEG pour :\na) Logo avec fond transparent\nb) Photo de vacances\nc) Graphique avec texte\nd) Portrait photographique",
              correction:"a) Logo → PNG\nFond transparent, formes nettes, pas de dégradation.\n\nb) Photo vacances → JPEG\nPhoto naturelle, compression efficace, pertes imperceptibles.\n\nc) Graphique → PNG\nTexte et lignes nettes, artefacts inacceptables.\n\nd) Portrait → JPEG\nPhoto avec dégradés, compression très efficace." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// TH 07 — OBJETS CONNECTÉS
// ─────────────────────────────────────────────────────────────────────
'objets-connectes': {
  id:'objets-connectes', emoji:'🤖', color:'#ef4444',
  titre:'Objets connectés',
  objectif:'Comprendre le fonctionnement des systèmes embarqués',
  desc:"Systèmes embarqués (microcontrôleur + capteurs + actionneurs), IoT (Internet of Things), bases de l'IA (apprentissage supervisé, données), sécurité des objets connectés.",
  souschapitres:[
    {
      id:'sc-iot1', titre:'7.1 Systèmes embarqués et IoT',
      notions:['Système embarqué : microcontrôleur + capteurs + actionneurs','Capteur : mesure (temp., son, lumière…)','Actionneur : agit (LED, moteur, buzzer)','IoT : milliards d\'objets connectés à Internet'],
      blocs:[
        {
          notion:'🤖 Objets connectés et IoT',
          theoremes:[
            { id:'D-IOT1', type:'def', nom:"Système embarqué et IoT",
              enonce:"SYSTÈME EMBARQUÉ :\nOrdinateur miniaturisé intégré dans un objet.\nComposants :\n• MICROCONTRÔLEUR (MCU) : mini-CPU + mémoire\n• CAPTEURS : mesurent l'environnement (entrée)\n• ACTIONNEURS : agissent sur l'environnement (sortie)\n• Batterie ou alimentation\n\nCAPTEURS (entrée) :\nTempérature, humidité, pression\nLumière, son, mouvement (accéléromètre)\nProximité, GPS, caméra\n\nACTIONNEURS (sortie) :\nLED, écran, moteur, buzzer\nPompe, résistance chauffante, servo-moteur\n\nEXEMPLES de systèmes embarqués :\nArduino, Raspberry Pi, micro:bit\nSmartphone, montre connectée, voiture\n\nIOT (Internet of Things) :\nMilliards d'objets connectés à Internet\nCompteurs électriques (Linky), voitures, maisons\nVille intelligente : feux, parkings, poubelles" },
            { id:'N-IOT1', type:'notion', nom:"Fonctionnement d'un objet connecté",
              enonce:"CYCLE D'UN OBJET CONNECTÉ :\n1. MESURER : capteur lit une valeur\n2. TRAITER : microcontrôleur analyse\n3. DÉCIDER : si condition → action\n4. AGIR : actionneur répond\n5. TRANSMETTRE : données envoyées au cloud\n\nEXEMPLE — Thermostat connecté :\n1. Capteur mesure T° = 18°C\n2. Comparaison avec consigne T° = 20°C\n3. T° < consigne → allumer chauffage\n4. Résistance chauffante activée\n5. Données envoyées à l'app smartphone\n\nCOMMUNICATION :\nWiFi, Bluetooth, Zigbee, LoRa (longue portée)\n→ Choix selon la distance, l'énergie, le débit" },
          ],
          exercices:[
            { id:'EX-IOT1', niveau:'Facile', titre:'Identifier capteurs et actionneurs',
              enonce:"Pour un système de surveillance de plante connectée :\nIdentifier les capteurs, actionneurs et la communication.",
              correction:"CAPTEURS (mesure) :\n• Humidité du sol\n• Luminosité ambiante\n• Température et humidité de l'air\n\nACTIONNEURS (action) :\n• Pompe à eau (irrigation automatique)\n• LED d'alerte\n• Notification smartphone\n\nCOMMUNICATION :\n• WiFi ou Bluetooth vers smartphone\n• App mobile pour visualiser et configurer\n\nFONCTIONNEMENT :\nSol sec (capteur < seuil) → activer pompe 5s\nEnvoyer notification 'Plante arrosée'" },
          ]
        },
      ]
    },
    {
      id:'sc-iot2', titre:'7.2 Bases de l\'IA et sécurité IoT',
      notions:['IA = apprentissage à partir de données','Supervisé : exemples étiquetés → modèle','Failles IoT : mots de passe faibles, pas de MAJ','RGPD s\'applique aux données IoT'],
      blocs:[
        {
          notion:'🧠 Intelligence artificielle et sécurité',
          theoremes:[
            { id:'N-IOT2', type:'notion', nom:"Bases de l'Intelligence Artificielle",
              enonce:"IA = techniques permettant aux machines d'imiter\ndes capacités cognitives humaines\n\nMACHINE LEARNING (apprentissage automatique) :\nDonnées d'entraînement → Algorithme → Modèle\nLe modèle peut alors faire des PRÉDICTIONS\n\nAPPRENTISSAGE SUPERVISÉ :\nExemples étiquetés (photos de chats ET de chiens\navec étiquettes 'chat'/'chien')\n→ Le modèle apprend les caractéristiques\n\nAPPRENTISSAGE NON SUPERVISÉ :\nPas d'étiquettes → trouver des groupes similaires\n→ Segmentation de clients, recommandation\n\nEXEMPLES CONCRETS :\n• Reconnaissance faciale (smartphone)\n• Assistant vocal (Siri, Alexa)\n• Recommandations YouTube, Netflix\n• Détection de spam dans les emails\n• Voiture autonome" },
            { id:'N-IOT3', type:'notion', nom:"Sécurité des objets connectés",
              enonce:"PROBLÈMES DE SÉCURITÉ IoT :\n• Mots de passe par défaut non changés\n• Pas de mises à jour de sécurité\n• Données envoyées sans chiffrement\n• Accumulation de données personnelles\n\nATTAQUES POSSIBLES :\n• Botnet : des milliers d'objets piratés\n  utilisés pour attaquer d'autres serveurs (DDoS)\n• Espionnage via caméra, micro\n• Prise de contrôle à distance\n\nEXEMPLE RÉEL :\nMirai (2016) : 500 000 objets IoT piratés\n→ DDoS ayant rendu Twitter, Netflix hors ligne\n\nBONNES PRATIQUES :\n✓ Changer le mot de passe par défaut\n✓ Mettre à jour le firmware régulièrement\n✓ Séparer le réseau IoT du réseau principal\n✓ Désactiver les objets non utilisés\n✓ Vérifier les données collectées (RGPD)",
              remarque:"Les objets connectés collectent souvent plus de données que nécessaire. Un aspirateur robot peut cartographier votre maison et envoyer ces données au fabricant." },
          ],
          exercices:[
            { id:'EX-IOT2', niveau:'Intermédiaire', titre:'IA — Apprentissage supervisé',
              enonce:"On veut créer un système de détection automatique de spam.\nExpliquer les étapes de création du modèle d'IA.",
              correction:"ÉTAPES :\n\n1. COLLECTE DES DONNÉES :\n   Rassembler des milliers d'emails\n   étiquetés 'spam' ou 'non spam'\n\n2. ENTRAÎNEMENT :\n   Algorithme analyse les mots, expéditeurs,\n   structures des emails spam vs normaux\n   → Construit un MODÈLE (règles apprises)\n\n3. ÉVALUATION :\n   Tester sur de nouveaux emails (non vus)\n   Mesurer le taux de bonne détection\n\n4. DÉPLOIEMENT :\n   Intégrer dans la messagerie\n   Continuer à apprendre des corrections\n\nPROBLÈMES POSSIBLES :\n• Faux positifs (email normal classé spam)\n• Biais si les données d'entraînement sont biaisées" },
            { id:'EX-IOT3', niveau:'Facile', titre:'Sécuriser une caméra connectée',
              enonce:"Une caméra de surveillance est installée avec le mot de passe par défaut 'admin'. Quels sont les risques ? Que faire ?",
              correction:"RISQUES :\n1. Piratage → accès aux images en temps réel\n2. Espionnage de votre maison\n3. Intégration dans un botnet (DDoS)\n4. Revente des images sur le darknet\n\nSOLUTIONS :\n1. Changer immédiatement le mot de passe\n   (mot de passe fort : 12+ car, maj, chiffres, symboles)\n2. Mettre à jour le firmware de la caméra\n3. Activer le chiffrement (HTTPS)\n4. Isoler sur un réseau WiFi séparé\n5. Vérifier les données collectées (RGPD)" },
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
export default function SNTSecondeSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'internet'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>💻</div>
          <h2>Thème non trouvé</h2>
          <Link href="/bac-france/informatique/seconde" style={{ color:'#06b6d4' }}>← Retour SNT Seconde</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#06b6d4'

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BARRE DE COULEUR + BREADCRUMB */}
        <div style={{ position:'relative', borderBottom:'1px solid var(--border)' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
            background:`linear-gradient(90deg,${secColor},${secColor}66)` }} />
          <div style={{ padding:'14px clamp(20px,5vw,60px)',
            display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
            <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
            <Link href="/bac-france/informatique" style={{ color:'var(--muted)', textDecoration:'none' }}>Informatique</Link><span>›</span>
            <Link href="/bac-france/informatique/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde SNT</Link><span>›</span>
            <span style={{ color:secColor, fontWeight:600 }}>{chapter.titre}</span>
          </div>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:32, alignItems:'start' }}>

            {/* CONTENU */}
            <div>
              {/* HEADER */}
              <div style={{ marginBottom:36 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:32 }}>{chapter.emoji}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:secColor,
                    background:`${secColor}18`, padding:'3px 10px', borderRadius:8, fontWeight:700 }}>
                    {TITRES_NAV[slug]?.split(' — ')[0]}
                  </span>
                  <span style={{ fontSize:11, padding:'2px 10px', borderRadius:20,
                    background:`${secColor}14`, color:secColor, fontWeight:700 }}>SNT</span>
                  <span style={{ fontSize:11, background:'rgba(6,182,212,0.15)',
                    color:'#22d3ee', padding:'2px 9px', borderRadius:10 }}>
                    📘 Seconde · Obligatoire · 1h30/sem
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:8 }}>
                  {chapter.emoji} {chapter.titre}
                </h1>
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px',
                  background:`${secColor}10`, border:`1px solid ${secColor}25`, borderRadius:10,
                  fontSize:12, color:secColor, fontWeight:600, marginBottom:14 }}>
                  🎯 {chapter.objectif}
                </div>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('SNT Seconde — '+chapter.titre)}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce thème
                  </Link>
                  <Link href="/bac-france/informatique/premiere"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📗 Suite en Première NSI
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
                              const isMono = t.type==='formule'
                              return (
                                <div key={t.id} style={{ borderLeft:`3px solid ${color}`, background:`${color}07`,
                                  borderRadius:'0 12px 12px 0', padding:'14px 18px', border:`1px solid ${color}18` }}>
                                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start',
                                    marginBottom:8, gap:10, flexWrap:'wrap' }}>
                                    <div style={{ fontWeight:700, fontSize:13 }}>{t.nom}</div>
                                    <TypeBadge type={t.type} />
                                  </div>
                                  <pre style={{ fontSize:12, color:'var(--text2)', lineHeight:1.85,
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
                                      <Link href={`/solve?q=${encodeURIComponent('SNT Seconde — '+ex.enonce)}`}
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
                                          whiteSpace:'pre-wrap', margin:0 }}>
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
                  <Link href={`/bac-france/informatique/seconde/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{ICONS[prevSlug]} {TITRES_NAV[prevSlug].replace(/TH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/informatique/seconde/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{ICONS[nextSlug]} {TITRES_NAV[nextSlug].replace(/TH \d+ — /,'')}</div>
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
                  fontSize:11, color:'#22d3ee', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(6,182,212,0.08)' }}>
                  📘 SNT Seconde · 7 thèmes
                </div>
                {NAV_ORDER.map(s => (
                  <Link key={s} href={`/bac-france/informatique/seconde/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'10px 15px', borderBottom:'1px solid var(--border)',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>
                        {TITRES_NAV[s].split(' — ')[0]}
                      </div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400,
                        color:s===slug?SEC_COLORS[s]:'var(--text2)', display:'flex', gap:5, alignItems:'center' }}>
                        <span>{ICONS[s]}</span>
                        <span>{TITRES_NAV[s].replace(/TH \d+ — /,'').slice(0,22)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('SNT Seconde — '+chapter.titre)}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.titre}
                  </Link>
                  <Link href="/bac-france/informatique/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📗 Première NSI</Link>
                  <Link href="/bac-france/informatique/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎓 Terminale NSI</Link>
                  <Link href="/bac-france/informatique/seconde" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les thèmes</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer/>
      <style>{`
        @media(max-width:900px){
          div[style*="grid-template-columns: 1fr 260px"]{grid-template-columns:1fr!important;}
          aside{display:none;}
        }
      `}</style>
    </>
  )
}