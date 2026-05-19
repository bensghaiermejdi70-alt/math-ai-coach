'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// TIC COMMUN — AUTRES SECTIONS / [SLUG]
// Route : /bac/info/autres-sections/[slug]
// Sections : Sc. Maths · Sc. Exp · Sc. Tech · Éco-Gestion
// 4 thèmes : Internet & Réseaux · Web HTML/CSS/JS · Systèmes · Sécurité
// ══════════════════════════════════════════════════════════════════════

const C = { def:'#4f6ef7', formule:'#f5c842', prop:'#06d6a0', ex:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = {
  def:'Définition', formule:'À retenir', prop:'Propriété', ex:'Exemple', methode:'Méthode'
}

const NAV_ORDER = [
  'internet-reseaux','web-html-css-js','systemes-informatiques','securite-informatique'
]

const TITRES_NAV: Record<string,string> = {
  'internet-reseaux':       'TH 01 — Internet & Réseaux',
  'web-html-css-js':        'TH 02 — Web — HTML / CSS / JavaScript',
  'systemes-informatiques': 'TH 03 — Systèmes informatiques',
  'securite-informatique':  'TH 04 — Sécurité informatique',
}

const SEC_COLORS: Record<string,string> = {
  'internet-reseaux':'#06d6a0',
  'web-html-css-js':'#4f6ef7',
  'systemes-informatiques':'#8b5cf6',
  'securite-informatique':'#ef4444',
}

const SECTIONS_LABEL = ['Sc. Mathématiques','Sc. Expérimentales','Sc. Techniques','Éco-Gestion']

type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; icon:string; color:string; desc:string; souschapitres:SC[] }

const ALL_CHAPTERS: Record<string,Chap> = {

// ─────────────────────────────────────────────────────────────────────
// TH 01 — INTERNET & RÉSEAUX
// ─────────────────────────────────────────────────────────────────────
'internet-reseaux': {
  id:'internet-reseaux', icon:'🌐', color:'#06d6a0',
  titre:'Internet & Réseaux',
  desc:"LAN/WAN/Internet/Intranet, modèle client-serveur, protocoles HTTP/HTTPS/TCP/IP/DNS/FTP, adressage IPv4, notion de routage et FAI.",
  souschapitres:[
    {
      id:'sc-net1', titre:'1.1 Types de réseaux et modèle client-serveur',
      notions:['LAN : réseau local (école, maison)','WAN : réseau étendu (ville, pays)','Internet : réseau mondial de réseaux','Modèle client-serveur : navigateur → serveur'],
      blocs:[
        {
          notion:'🌐 Réseaux et Internet',
          theoremes:[
            { id:'D-N1', type:'def', nom:"Types de réseaux",
              enonce:"LAN (Local Area Network) :\nRéseau LOCAL limité à un bâtiment ou campus\nExemples : réseau de l'école, réseau WiFi de la maison\n\nWAN (Wide Area Network) :\nRéseau ÉTENDU sur une ville, un pays ou plusieurs pays\n\nINTERNET :\nRéseau mondial = interconnexion de millions de réseaux\nPas de propriétaire unique\n\nINTRANET :\nRéseau PRIVÉ d'une entreprise/institution\nFonctionne comme Internet mais en interne\n(accès restreint aux employés)\n\nMODÈLE CLIENT-SERVEUR :\nClient (navigateur web) → envoie une requête\nServeur (ordinateur puissant) → répond avec les données\nExemple : ton navigateur demande www.google.com → le serveur Google répond avec la page" },
            { id:'F-N1', type:'formule', nom:"À retenir — Réseaux",
              enonce:"LAN = Local (maison, école)\nWAN = Étendu (ville, pays)\nInternet = Mondial (tous les réseaux)\nIntranet = Réseau privé d'entreprise\n\nFAI = Fournisseur d'Accès Internet\n(ex : Tunisie Telecom, Ooredoo, Orange)\n→ Relie ton ordinateur à Internet\n\nDébit = vitesse de transfert (Mo/s, Mbit/s)\n1 octet = 8 bits\n10 Mbit/s = 1,25 Mo/s" },
          ],
          exercices:[
            { id:'EX-N1', niveau:'Facile', titre:"Classifier les réseaux",
              enonce:"Classer chacun en LAN, WAN ou Internet :\n1) Le réseau WiFi de ton lycée\n2) Le réseau reliant Tunis à Sfax\n3) La connexion à YouTube\n4) Le réseau informatique d'une banque (interne)",
              correction:"1) LAN (réseau local du lycée)\n2) WAN (réseau étendu entre villes)\n3) Internet (réseau mondial)\n4) Intranet (réseau privé de la banque)" },
          ]
        },
      ]
    },
    {
      id:'sc-net2', titre:'1.2 Protocoles et adressage IP',
      notions:['HTTP (port 80) / HTTPS (port 443)','DNS : nom → adresse IP','TCP/IP : protocole de base d\'Internet','IPv4 : 4 octets ex: 192.168.1.15'],
      blocs:[
        {
          notion:'📡 Protocoles Internet',
          theoremes:[
            { id:'D-N2', type:'def', nom:"Protocoles principaux",
              enonce:"PROTOCOLE = règles de communication entre machines\n\nHTTP (HyperText Transfer Protocol) :\nPort 80 · Affichage des pages web\nNon sécurisé (données en clair)\n\nHTTPS (HTTP + chiffrement TLS/SSL) :\nPort 443 · Cadenas dans le navigateur\n→ Communications chiffrées (mots de passe, CB)\n\nTCP/IP :\nProtocole de BASE d'Internet\nDivise les données en PAQUETS → les envoie → les recompose\n\nDNS (Domain Name System) :\nTraduit un NOM en ADRESSE IP\nwww.google.com → 142.250.75.46\n→ Comme un annuaire téléphonique\n\nFTP (File Transfer Protocol) :\nPort 21 · Transfert de fichiers\n\nSMTP/IMAP : envoi et réception d'emails" },
            { id:'D-N3', type:'def', nom:"Adressage IPv4",
              enonce:"ADRESSE IPv4 :\n4 nombres de 0 à 255, séparés par des points\nExemple : 192.168.1.15\n\nIP PRIVÉE (réseau local) :\n192.168.x.x\n10.x.x.x\n172.16.x.x à 172.31.x.x\n→ Non accessible depuis Internet\n\nIP PUBLIQUE :\nUnique sur Internet\nAttribuée par le FAI\n→ Identifie ta connexion sur Internet\n\nPasGasserelle (routeur) :\nFait le lien entre réseau local et Internet\nA une IP privée ET une IP publique\n\nMASSQUE DE SOUS-RÉSEAU :\nEx: 255.255.255.0 → réseau /24\n→ Identifie les machines du même réseau" },
            { id:'F-N2', type:'formule', nom:"À retenir — Protocoles",
              enonce:"HTTP → pages web (non sécurisé)\nHTTPS → pages web SÉCURISÉES (cadenas)\nDNS → traduit www.site.com en IP\nFTP → transfert de fichiers\nTCP/IP → protocole de base d'Internet\n\nPORTS IMPORTANTS :\n80 = HTTP · 443 = HTTPS · 21 = FTP\n22 = SSH · 25 = SMTP · 53 = DNS" },
          ],
          exercices:[
            { id:'EX-N2', niveau:'Facile', titre:"Rôle des protocoles",
              enonce:"Associer chaque protocole à son usage :\nHTTP, HTTPS, DNS, FTP, SMTP",
              correction:"HTTP : afficher des pages web (non sécurisé)\nHTTPS : afficher des pages web sécurisées (chiffré)\nDNS : traduire un nom de domaine en adresse IP\nFTP : transférer des fichiers entre machines\nSMTP : envoyer des emails" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// TH 02 — WEB HTML / CSS / JAVASCRIPT
// ─────────────────────────────────────────────────────────────────────
'web-html-css-js': {
  id:'web-html-css-js', icon:'💡', color:'#4f6ef7',
  titre:'Web — HTML / CSS / JavaScript',
  desc:"Structure HTML (DOCTYPE, head, body, balises sémantiques), CSS (sélecteurs, propriétés, flexbox), JavaScript (variables, fonctions, manipulation DOM, événements).",
  souschapitres:[
    {
      id:'sc-web1', titre:'2.1 HTML — Structure et balises',
      notions:['<!DOCTYPE html>, <html>, <head>, <body>','Titres h1-h6, paragraphes p, liens a, images img','Listes ul/ol + li, tableaux table/tr/th/td','Balises sémantiques : header, nav, main, footer, section'],
      blocs:[
        {
          notion:'💡 Structure HTML',
          theoremes:[
            { id:'D-W1', type:'def', nom:"Structure complète d'une page HTML",
              enonce:"<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <title>Ma Page</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <header>\n    <h1>Titre principal</h1>\n    <nav>\n      <a href=\"index.html\">Accueil</a>\n      <a href=\"contact.html\">Contact</a>\n    </nav>\n  </header>\n\n  <main>\n    <h2>Sous-titre</h2>\n    <p>Paragraphe de texte.</p>\n    <img src=\"photo.jpg\" alt=\"Description de l'image\">\n\n    <ul>\n      <li>Élément 1</li>\n      <li>Élément 2</li>\n    </ul>\n  </main>\n\n  <footer>© 2024 Mon Site</footer>\n  <script src=\"script.js\"></script>\n</body>\n</html>" },
            { id:'D-W2', type:'def', nom:"Balises essentielles",
              enonce:"TEXTE ET TITRES :\nh1 à h6 : titres (h1 = plus important)\np : paragraphe · strong : gras · em : italique\nbr : saut de ligne · hr : ligne horizontale\n\nLIENS ET IMAGES :\na href=\"url\" : lien hypertexte\nimg src=\"fichier\" alt=\"description\"\n\nLISTES :\nul + li : liste à puces (non ordonnée)\nol + li : liste numérotée (ordonnée)\n\nTABLEAU :\ntable : tableau\ntr : ligne · th : en-tête · td : cellule\n\nFORMULAIRE :\nform : formulaire\ninput type=\"text/password/submit\"\ntextarea : zone de texte\nselect + option : liste déroulante\n\nSTRUCTURE SÉMANTIQUE :\nheader : en-tête · nav : navigation\nmain : contenu principal · section : section\narticle : article · footer : pied de page\ndiv : conteneur générique · span : inline" },
          ],
          exercices:[
            { id:'EX-W1', niveau:'Facile', titre:"Identifier les balises",
              enonce:"Quelle balise utiliser pour :\n1) Un titre principal\n2) Un lien vers une autre page\n3) Une liste à puces\n4) Une image\n5) Le pied de page",
              correction:"1) <h1>Titre</h1>\n2) <a href=\"page.html\">Lien</a>\n3) <ul><li>Item</li></ul>\n4) <img src=\"img.jpg\" alt=\"desc\">\n5) <footer>Pied de page</footer>" },
          ]
        },
      ]
    },
    {
      id:'sc-web2', titre:'2.2 CSS et JavaScript',
      notions:['Sélecteurs : tag, .classe, #id','Propriétés : color, background, font-size, margin, padding','display:flex (flexbox)','JS : var/let, alert, getElementById, function, onclick'],
      blocs:[
        {
          notion:'🎨 CSS — Mise en forme',
          theoremes:[
            { id:'D-W3', type:'def', nom:"CSS — Sélecteurs et propriétés essentielles",
              enonce:"SÉLECTEURS :\ntag { }          → toutes les balises de ce type\n.classe { }      → éléments avec class=\"classe\"\n#identifiant { } → élément avec id=\"id\" (unique)\n\nPROPRIÉTÉS COULEURS ET TEXTE :\ncolor: #4f6ef7;          /* couleur du texte */\nbackground-color: #fff;  /* couleur de fond */\nfont-size: 16px;         /* taille police */\nfont-weight: bold;       /* gras */\ntext-align: center;      /* alignement */\n\nMISE EN PAGE :\nmargin: 10px;   /* espace extérieur */\npadding: 15px;  /* espace intérieur */\nborder: 1px solid black;\nborder-radius: 8px;\nwidth: 300px; height: 200px;\n\nFLEXBOX :\ndisplay: flex;\njustify-content: center; /* horizontal */\nalign-items: center;     /* vertical */\ngap: 16px;\nflex-direction: row; /* ou column */" },
            { id:'D-W4', type:'def', nom:"JavaScript — Bases et manipulation DOM",
              enonce:"VARIABLES :\nvar x = 5;         // ancienne syntaxe\nlet nom = 'Ahmed'; // recommandé\nconst PI = 3.14;   // constante\n\nENTRÉES/SORTIES :\nalert('Message');\nconsole.log('Debug');\nlet saisie = prompt('Votre nom :');\n\nMANIPULATION DU DOM :\ndocument.getElementById('monId').innerHTML = 'Texte';\ndocument.getElementById('monId').style.color = 'red';\n\nÉVÉNEMENTS :\n// Dans le HTML :\n<button onclick=\"maFonction()\">Cliquer</button>\n\n// En JavaScript :\nfunction maFonction() {\n  let a = parseInt(prompt('Nombre :'));\n  let res = a * a;\n  document.getElementById('resultat').innerHTML = res;\n}\n\nCONDITIONS EN JS :\nif (x > 0) { alert('Positif'); }\nelse { alert('Négatif ou nul'); }" },
            { id:'F-W1', type:'formule', nom:"À retenir — Rôles HTML/CSS/JS",
              enonce:"HTML → STRUCTURE (le squelette de la page)\nCSS → APPARENCE (couleurs, polices, mise en page)\nJS  → INTERACTIONS (boutons, animations, calculs)\n\nORDRE D'EXÉCUTION :\n1. Navigateur charge HTML\n2. Navigateur charge CSS (mise en forme)\n3. Navigateur charge JS (comportement)\n\nFICHIERS :\nindex.html → page principale\nstyle.css  → feuille de style\nscript.js  → code JavaScript" },
          ],
          exercices:[
            { id:'EX-W2', niveau:'Intermédiaire', titre:"Page HTML complète",
              enonce:"Créer une page HTML avec : titre 'Mes Matières', liste de 3 matières, fond sombre (#1a1a2e), texte blanc, et titre en bleu (#4f6ef7).",
              correction:"<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Mes Matières</title>\n  <style>\n    body {\n      background-color: #1a1a2e;\n      color: white;\n      font-family: Arial, sans-serif;\n    }\n    h1 { color: #4f6ef7; }\n    li { margin: 8px 0; }\n  </style>\n</head>\n<body>\n  <h1>Mes Matières</h1>\n  <ul>\n    <li>Mathématiques</li>\n    <li>Informatique</li>\n    <li>Physique-Chimie</li>\n  </ul>\n</body>\n</html>" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// TH 03 — SYSTÈMES INFORMATIQUES
// ─────────────────────────────────────────────────────────────────────
'systemes-informatiques': {
  id:'systemes-informatiques', icon:'🖥️', color:'#8b5cf6',
  titre:'Systèmes informatiques',
  desc:"Hardware (CPU, RAM, ROM, stockage, périphériques), Software (OS, applications, libre/propriétaire), architecture Von Neumann, représentation binaire et conversions.",
  souschapitres:[
    {
      id:'sc-sys1', titre:'3.1 Hardware et Software',
      notions:['CPU : processeur, GHz, cœurs','RAM : volatile rapide ; ROM : permanent','HDD (magnétique) vs SSD (flash, plus rapide)','OS : Windows, Linux, macOS, Android'],
      blocs:[
        {
          notion:'🖥️ Composants d\'un ordinateur',
          theoremes:[
            { id:'D-S1', type:'def', nom:"Hardware — Matériel",
              enonce:"CPU (Processeur) :\nCerveau de l'ordinateur, exécute les instructions\nCaractérisé par : fréquence (GHz), nombre de cœurs\nEx : Intel Core i7, AMD Ryzen 5\n\nMÉMOIRES :\nRAM : mémoire VIVE, volatile (perdue à l'arrêt), rapide\n      Rôle : stockage temporaire des programmes en cours\nROM : mémoire permanente, non volatile\n      Contient le BIOS/UEFI (démarrage)\nCache : mémoire ultra-rapide dans le CPU\n\nSTOCKAGE :\nHDD (disque dur) : magnétique, grande capacité, lent\nSSD (flash) : électronique, rapide, moins chaud, silencieux\nClé USB / SD : stockage portable\n\nPÉRIPHÉRIQUES D'ENTRÉE :\nClavier, souris, scanner, webcam, microphone\n\nPÉRIPHÉRIQUES DE SORTIE :\nÉcran (moniteur), imprimante, haut-parleurs\n\nPÉRIPHÉRIQUES E/S :\nDisque dur externe, écran tactile, carte réseau" },
            { id:'D-S2', type:'def', nom:"Software — Logiciels",
              enonce:"SYSTÈME D'EXPLOITATION (OS) :\nLogiciel de BASE qui gère les ressources matérielles\nExemples :\n→ Windows (Microsoft) : ordinateurs personnels\n→ Linux (open source) : serveurs, développeurs\n→ macOS (Apple) : ordinateurs Mac\n→ Android / iOS : smartphones et tablettes\n\nAPPLICATIONS :\nNavigateur web : Chrome, Firefox, Edge\nTraitement de texte : Word, LibreOffice Writer\nSpreadsheet : Excel, LibreOffice Calc\nIDE : Visual Studio Code, PyCharm (programmation)\n\nLOGICIEL LIBRE (open source) :\nCode source accessible, modifiable, redistribuable\nExemples : LibreOffice, Firefox, Linux, Python, VLC\n\nLOGICIEL PROPRIÉTAIRE :\nCode source fermé, licence payante obligatoire\nExemples : Microsoft Office, Adobe Photoshop, Windows" },
            { id:'F-S1', type:'formule', nom:"À retenir — Composants",
              enonce:"RAM : rapide, volatile (perdu si coupure)\nROM : lent, permanent (BIOS)\nHDD < SSD en vitesse\n\nRÈGLE :\nPlus de RAM → programme tourne mieux\nPlus de GHz → CPU plus rapide\nSSD → démarrage et chargement plus rapides\n\nOS LIBRE : Linux, Android (basé Linux)\nOS PROPRIÉTAIRE : Windows, macOS, iOS" },
          ],
          exercices:[
            { id:'EX-S1', niveau:'Facile', titre:"Volatile ou permanent ?",
              enonce:"Pour chaque mémoire, indiquer si elle est volatile ou permanente :\nRAM, ROM, HDD, SSD, Clé USB",
              correction:"RAM : VOLATILE (données perdues à l'arrêt)\nROM : PERMANENTE (données conservées)\nHDD : PERMANENTE (stockage long terme)\nSSD : PERMANENTE (stockage long terme)\nClé USB : PERMANENTE (stockage portable)" },
          ]
        },
      ]
    },
    {
      id:'sc-sys2', titre:'3.2 Architecture Von Neumann et binaire',
      notions:['4 composants : UC, Mémoire, E/S, Bus','Cycle : Fetch → Decode → Execute','Binaire base 2 : 0 et 1','1011₂ = 8+0+2+1 = 11₁₀'],
      blocs:[
        {
          notion:'⚙️ Von Neumann et représentation binaire',
          theoremes:[
            { id:'D-S3', type:'def', nom:"Architecture Von Neumann",
              enonce:"Modèle fondamental de tous les ordinateurs modernes.\n\n4 COMPOSANTS :\n1. Unité Centrale (UC/CPU) :\n   → Unité arithmétique et logique (UAL) : calculs\n   → Unité de contrôle : orchestre les opérations\n\n2. Mémoire centrale (RAM) :\n   → Stocke les instructions et les données\n\n3. Unités d'Entrée/Sortie (E/S) :\n   → Clavier, écran, disques...\n\n4. Bus :\n   → Transfert des données entre composants\n   → Bus de données, d'adresses, de contrôle\n\nCYCLE D'INSTRUCTION :\nFetch → lire l'instruction en mémoire\nDecode → décoder l'instruction\nExecute → l'exécuter et stocker le résultat\n→ Ce cycle se répète des milliards de fois par seconde" },
            { id:'D-S4', type:'def', nom:"Représentation binaire",
              enonce:"SYSTÈME BINAIRE (base 2) :\nSeuls 2 chiffres : 0 et 1 (bits)\n\nUNITÉS :\n1 bit → 0 ou 1\n4 bits → 1 nibble\n8 bits → 1 octet (byte)\n1 Ko → 1024 octets\n1 Mo → 1024 Ko ≈ 10⁶ octets\n1 Go → 1024 Mo ≈ 10⁹ octets\n1 To → 1024 Go ≈ 10¹² octets\n\nCONVERSION BINAIRE → DÉCIMAL :\nPoids des positions : ..., 2³, 2², 2¹, 2⁰\n                      ...,  8,  4,  2,  1\n\n1011₂ = (1×8)+(0×4)+(1×2)+(1×1) = 8+0+2+1 = 11₁₀\n11001₂ = 16+8+0+0+1 = 25₁₀\n\nCONVERSION DÉCIMAL → BINAIRE :\nDiviser par 2, noter les restes, lire en remontant\n13 ÷ 2 = 6 r 1\n 6 ÷ 2 = 3 r 0\n 3 ÷ 2 = 1 r 1\n 1 ÷ 2 = 0 r 1\n→ 13₁₀ = 1101₂" },
            { id:'F-S2', type:'formule', nom:"À retenir — Binaire",
              enonce:"2⁰=1  2¹=2  2²=4  2³=8\n2⁴=16 2⁵=32 2⁶=64 2⁷=128\n\nMÉTHODE BINAIRE → DÉCIMAL :\n1. Numéroter positions de droite (0) à gauche\n2. Multiplier chaque bit par 2^position\n3. Additionner\n\nEXEMPLE : 1101\nPos : 3 2 1 0\nBit : 1 1 0 1\n= 8 + 4 + 0 + 1 = 13₁₀\n\n8 bits = 1 octet → max 255 (11111111)" },
          ],
          exercices:[
            { id:'EX-S2', niveau:'Facile', titre:"Conversions binaire/décimal",
              enonce:"1) Convertir en décimal : 1011₂, 11001₂, 1111₂\n2) Convertir en binaire : 7₁₀, 13₁₀",
              correction:"1) 1011₂ = 8+0+2+1 = 11₁₀\n   11001₂ = 16+8+0+0+1 = 25₁₀\n   1111₂ = 8+4+2+1 = 15₁₀\n\n2) 7 ÷ 2 = 3r1, 3÷2=1r1, 1÷2=0r1 → 111₂\n   13 → 1101₂ (voir exemple ci-dessus)" },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// TH 04 — SÉCURITÉ INFORMATIQUE
// ─────────────────────────────────────────────────────────────────────
'securite-informatique': {
  id:'securite-informatique', icon:'🔒', color:'#ef4444',
  titre:'Sécurité informatique',
  desc:"Types de menaces (virus, ransomware, phishing, spyware, DDoS), protections (antivirus, pare-feu, 2FA, HTTPS, sauvegardes), données personnelles et RGPD.",
  souschapitres:[
    {
      id:'sc-sec1', titre:'4.1 Menaces informatiques',
      notions:['Virus : se reproduit et propage','Ransomware : chiffre et rançon','Phishing : faux email/site pour voler','Spyware/Keylogger : surveiller, DDoS : saturer'],
      blocs:[
        {
          notion:'⚠️ Types de menaces',
          theoremes:[
            { id:'D-SEC1', type:'def', nom:"Principales menaces informatiques",
              enonce:"VIRUS :\nLogiciel malveillant qui se copie et se propage\nS'attache à des fichiers légitimes\nPeut ralentir, corrompre ou supprimer des données\n\nRANSOMWARE (logiciel de rançon) :\nChiffre tous tes fichiers → illisibles\nDemande une rançon (souvent en Bitcoin)\nExemple célèbre : WannaCry (2017, 200 000 victimes)\n\nPHISHING (hameçonnage) :\nFaux email/site imitant une banque ou service connu\n'Votre compte est bloqué, cliquez ici'\n→ Vol d'identifiants et données bancaires\n\nSPYWARE / KEYLOGGER :\nEnregistre frappes clavier, captures d'écran\n→ Vole mots de passe, numéros de CB\n\nDDoS (Denial of Service) :\nSurcharge un serveur avec millions de requêtes\n→ Serveur inaccessible (site web en panne)\n\nINGÉNIERIE SOCIALE :\nManipulation psychologique\n'Je suis du support technique, donnez-moi votre MDP'\n→ Toujours vérifier l'identité avant de donner des infos" },
          ],
          exercices:[
            { id:'EX-SEC1', niveau:'Facile', titre:"Identifier les attaques",
              enonce:"Identifier le type d'attaque :\n1) Tu reçois un email : 'Votre banque détecte une activité suspecte. Cliquez ici.'\n2) Tous tes fichiers sont chiffrés, tu reçois un message demandant 500€.\n3) Un logiciel enregistre tout ce que tu tapes au clavier.",
              correction:"1) Phishing → Ne jamais cliquer sur ce type de lien\n2) Ransomware → Avoir des sauvegardes régulières\n3) Keylogger → Utiliser un antivirus à jour" },
          ]
        },
      ]
    },
    {
      id:'sc-sec2', titre:'4.2 Protections et données personnelles',
      notions:['Antivirus : détecte malwares','Pare-feu : filtre connexions','Mot de passe fort : 8+, maj, chiffres, symboles','RGPD : droits sur tes données personnelles'],
      blocs:[
        {
          notion:'🛡️ Protections et RGPD',
          theoremes:[
            { id:'D-SEC2', type:'def', nom:"Moyens de protection",
              enonce:"ANTIVIRUS :\nDétecte, bloque et supprime les malwares\nMise à jour régulière obligatoire (nouvelles menaces)\n\nPARE-FEU (firewall) :\nFiltre le trafic réseau entrant et sortant\nBloque les connexions suspectes ou non autorisées\n\nMOT DE PASSE FORT :\n✓ Au moins 8 caractères\n✓ Majuscules + minuscules\n✓ Chiffres (1, 2, 3...)\n✓ Symboles (!, @, #, *)\n✓ Différent pour chaque service\n✗ Pas de prénom, date de naissance, 'azerty'\n\n2FA (Double authentification) :\nMot de passe + code SMS ou app\n→ Même si MDP volé → compte protégé\n\nHTTPS :\nCommunication chiffrée entre navigateur et serveur\nCadenas dans la barre d'adresse\n→ Toujours vérifier avant de taper un MDP ou CB\n\nSAUVEGARDE :\nRègle 3-2-1 : 3 copies, sur 2 supports, 1 hors site\n→ Protection contre ransomware, panne, vol\n\nMISES À JOUR :\nCorrigent les failles de sécurité\n→ Toujours accepter les mises à jour OS et applis" },
            { id:'D-SEC3', type:'def', nom:"Données personnelles et RGPD",
              enonce:"DONNÉES PERSONNELLES :\nToute information permettant d'identifier une personne :\nNom, prénom, email, téléphone, adresse, photo, IP...\n\nRGPD (Règlement Général sur la Protection des Données) :\nLoi européenne (2018) protégeant les données personnelles\n\nDROITS DES PERSONNES :\n→ Droit d'ACCÈS : voir les données que possède une entreprise\n→ Droit de RECTIFICATION : corriger les données erronées\n→ Droit À L'EFFACEMENT : 'droit à l'oubli'\n→ Droit D'OPPOSITION : refuser l'utilisation de ses données\n\nOBLIGATIONS DES ENTREPRISES :\n→ Demander le CONSENTEMENT avant de collecter\n→ Protéger les données collectées\n→ Notifier en cas de fuite de données\n→ Nommer un DPO (Data Protection Officer)\n\nCONSEILS PRATIQUES :\n→ Lire les conditions d'utilisation des applis\n→ Limiter les autorisations des applications\n→ Ne pas partager ses données inutilement" },
            { id:'F-SEC1', type:'formule', nom:"Bonnes pratiques — À retenir",
              enonce:"MOT DE PASSE FORT :\n8+ caractères | Maj | Min | Chiffre | Symbole\nEx : P@ss#2024! ✓ (vs 'ahmed2007' ✗)\n\nCHECK-LIST SÉCURITÉ :\n✓ Antivirus installé et à jour\n✓ Pare-feu activé\n✓ Mots de passe forts et uniques\n✓ 2FA activé sur les comptes importants\n✓ Ne pas cliquer sur liens suspects\n✓ Vérifier https:// avant de saisir des données\n✓ Sauvegardes régulières\n✓ Mises à jour OS et logiciels" },
          ],
          exercices:[
            { id:'EX-SEC2', niveau:'Facile', titre:"Évaluer un mot de passe",
              enonce:"Classer du plus faible au plus fort et justifier :\n1) '123456'\n2) 'Ahmed2007'\n3) 'P@ss#2024!'\n4) 'mathsbac'",
              correction:"Du plus faible au plus fort :\n1) '123456' : très faible (séquence de chiffres)\n4) 'mathsbac' : faible (que lettres, prévisible)\n2) 'Ahmed2007' : moyen (prénom + année, devinable)\n3) 'P@ss#2024!' : FORT (maj, min, chiffre, symboles)\n\nConseils : longueur > complexité, phrase secrète possible." },
            { id:'EX-SEC3', niveau:'Intermédiaire', titre:"RGPD — Droits et obligations",
              enonce:"Tu découvres qu'un site web possède des données incorrectes sur toi (mauvais email). Quels droits peux-tu exercer ? Que doit faire le site ?",
              correction:"Droits que tu peux exercer :\n→ Droit d'ACCÈS : demander quelles données sont stockées\n→ Droit de RECTIFICATION : demander la correction de l'email erroné\n\nObligations du site :\n→ Répondre dans un délai d'1 mois\n→ Corriger les données sans frais\n→ Prouver qu'il protège tes données (RGPD)" },
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
  const cfg = niveau==='Facile' || niveau==='Intermediaire'&&niveau!=='Intermédiaire'
    ? { bg:'rgba(6,214,160,0.15)', color:'#06d6a0' }
    : niveau==='Difficile'
    ? { bg:'rgba(239,68,68,0.15)', color:'#ef4444' }
    : { bg:'rgba(245,158,11,0.15)', color:'#f59e0b' }
  const label = niveau==='Intermediaire' ? 'Intermédiaire' : niveau
  return <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, fontWeight:600,
    background:cfg.bg, color:cfg.color }}>{label}</span>
}

// ══════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════
export default function AutresSectionsSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'internet-reseaux'
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
          <h2>Thème non trouvé</h2>
          <Link href="/bac/info/autres-sections" style={{ color:'#f59e0b' }}>← Retour TIC Commun</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#f59e0b'

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Bac</Link><span>›</span>
          <Link href="/bac/info" style={{ color:'var(--muted)', textDecoration:'none' }}>Informatique</Link><span>›</span>
          <Link href="/bac/info/autres-sections" style={{ color:'var(--muted)', textDecoration:'none' }}>TIC Commun</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{chapter.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:32, alignItems:'start' }}>

            {/* CONTENU */}
            <div>
              {/* HEADER */}
              <div style={{ marginBottom:36 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:28 }}>{chapter.icon}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:secColor,
                    background:`${secColor}18`, padding:'3px 10px', borderRadius:8, fontWeight:700 }}>
                    {TITRES_NAV[slug]?.split(' — ')[0]}
                  </span>
                  <span style={{ fontSize:11, padding:'2px 10px', borderRadius:20,
                    background:`${secColor}14`, color:secColor, fontWeight:700 }}>TIC COMMUN</span>
                  <span style={{ fontSize:11, background:'rgba(245,158,11,0.15)',
                    color:'#fbbf24', padding:'2px 9px', borderRadius:10 }}>
                    🎓 4 sections · Tunisie
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>
                  {chapter.icon} {chapter.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:14 }}>{chapter.desc}</p>

                {/* Badge sections */}
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:18 }}>
                  {SECTIONS_LABEL.map(s => (
                    <span key={s} style={{ fontSize:10, padding:'2px 10px', borderRadius:20,
                      background:'rgba(245,158,11,0.1)', color:'#f59e0b', fontWeight:600 }}>{s}</span>
                  ))}
                </div>

                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' TIC Bac Tunisie')}&subject=informatique`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce thème
                  </Link>
                  <Link href="/bac/info/informatique"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                      color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    💻 Programme Info complet
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
                              return (
                                <div key={t.id} style={{ borderLeft:`3px solid ${color}`, background:`${color}07`,
                                  borderRadius:'0 12px 12px 0', padding:'14px 18px', border:`1px solid ${color}18` }}>
                                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start',
                                    marginBottom:8, gap:10, flexWrap:'wrap' }}>
                                    <div style={{ fontWeight:700, fontSize:13 }}>{t.nom}</div>
                                    <TypeBadge type={t.type} />
                                  </div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.85, whiteSpace:'pre-line',
                                    fontFamily:t.type==='formule'?'var(--font-mono)':'inherit' }}>
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
                                      <Link href={`/solve?q=${encodeURIComponent('TIC Bac Tunisie — '+ex.enonce)}&subject=informatique`}
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
                                        <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75, whiteSpace:'pre-line' }}>{ex.correction}</div>
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
                  <Link href={`/bac/info/autres-sections/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/TH \d+ — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/info/autres-sections/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[nextSlug].replace(/TH \d+ — /,'')}</div>
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
                  fontSize:11, color:'#f59e0b', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(245,158,11,0.08)' }}>
                  🌐 TIC Commun · 4 thèmes
                </div>
                {NAV_ORDER.map(s => (
                  <Link key={s} href={`/bac/info/autres-sections/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'10px 15px', borderBottom:'1px solid var(--border)',
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
                        {TITRES_NAV[s].replace(/TH \d+ — /,'').slice(0,26)}
                      </div>
                    </div>
                  </Link>
                ))}
                {/* Séparateur + lien programme complet */}
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:10, color:'var(--muted)', background:'rgba(99,102,241,0.05)' }}>
                  💻 Section Sciences Informatiques
                </div>
                <Link href="/bac/info/informatique" style={{ textDecoration:'none' }}>
                  <div style={{ padding:'10px 15px', cursor:'pointer',
                    transition:'background 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(99,102,241,0.05)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{ fontSize:11, color:'#818cf8', fontWeight:600 }}>
                      Programme complet →
                    </div>
                    <div style={{ fontSize:10, color:'var(--muted)' }}>16 chapitres : Algo + BDD + TIC</div>
                  </div>
                </Link>
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+chapter.titre+' TIC Bac Tunisie')}&subject=informatique`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.titre}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Examens Bac</Link>
                  <Link href="/bac/info/autres-sections" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ TIC Commun</Link>
                  <Link href="/bac/info" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📚 Informatique Bac</Link>
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