'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = { def:'#06b6d4', notion:'#8b5cf6', algo:'#10b981', formule:'#f59e0b', methode:'#ec4899' }
const L: Record<string,string> = { def:'Definition', notion:'Notion cle', algo:'Algorithme', formule:'A retenir', methode:'Methode' }

const NAV_ORDER = ['internet','web','reseaux-sociaux','donnees','geolocalisation','photographie','objets-connectes']
const TITRES: Record<string,string> = {
  'internet':'Internet','web':'Le Web','reseaux-sociaux':'Reseaux sociaux',
  'donnees':'Donnees structurees','geolocalisation':'Geolocalisation',
  'photographie':'Photographie numerique','objets-connectes':'Objets connectes',
}
const SEC_COLOR: Record<string,string> = {
  'internet':'#06b6d4','web':'#8b5cf6','reseaux-sociaux':'#ec4899',
  'donnees':'#10b981','geolocalisation':'#f59e0b','photographie':'#6366f1','objets-connectes':'#ef4444',
}

type Theoreme = { id:string; type:string; nom:string; enonce:string }
type Exercice = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Chapitre = { ch:string; titre:string; badge:string; duree:string; desc:string; theoremes:Theoreme[]; exercices:Exercice[] }

const CHAPITRES: Record<string,Chapitre> = {
  'internet': {
    ch:'TH 01', titre:'Internet', badge:'Reseaux', duree:'~4h',
    desc:'Fonctionnement d\'Internet, architecture reseau, protocoles TCP/IP et DNS.',
    theoremes:[
      { id:'D1', type:'def', nom:'Internet',
        enonce:'Internet = reseau mondial de reseaux interconnectes.\nNe en 1969 (ARPANET) - reseau decentralise militaire.\nDifference : Internet (infrastructure) ≠ Web (service sur Internet).\nFAI (Fournisseur Acces Internet) : Orange, Free, SFR...' },
      { id:'D2', type:'def', nom:'Adresse IP',
        enonce:'Adresse IP = identifiant unique de chaque machine sur Internet.\nIPv4 : 4 nombres de 0 a 255 (ex: 192.168.1.1)\nIPv6 : 8 groupes hexadecimaux (ex: 2001:0db8::1)\nIP publique (visible sur Internet) vs IP privee (reseau local).' },
      { id:'N1', type:'notion', nom:'Protocoles TCP/IP',
        enonce:'TCP (Transmission Control Protocol) :\n- Decoupe les donnees en paquets\n- Garantit la livraison et l\'ordre\n- Accuse de reception\n\nIP (Internet Protocol) :\n- Adressage et routage des paquets\n- Chaque paquet peut prendre un chemin different\n- Reassemblage a l\'arrivee' },
      { id:'D3', type:'def', nom:'DNS (Domain Name System)',
        enonce:'DNS = annuaire d\'Internet.\nTraduction : nom de domaine → adresse IP\nEx: google.com → 142.250.74.46\n\nEtapes :\n1. Navigateur interroge le serveur DNS\n2. DNS repond avec l\'adresse IP\n3. Navigateur contacte le serveur a cette IP\n\nCache DNS : memorisation pour accelerer.' },
      { id:'N2', type:'notion', nom:'Modele client/serveur',
        enonce:'Client : machine qui envoie une requete (navigateur, app).\nServeur : machine qui repond (stocke et envoie les donnees).\n\nEchange :\nClient → Requete HTTP → Serveur\nServeur → Reponse HTTP → Client\n\nEx: naviguer sur un site = client demande, serveur envoie la page HTML.' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Identifier les composants reseau',
        enonce:'Dans une connexion Internet domestique, identifier le role de : routeur, modem, FAI, serveur DNS.',
        correction:'Modem : convertit signal analogique (fibre/ADSL) en numerique.\nRouteur : distribue la connexion en reseau local (WiFi).\nFAI : fournit l\'acces Internet (Orange, Free...).\nDNS : traduit noms de domaines en adresses IP.' },
      { id:'EX02', niveau:'Facile', titre:'Chemin d\'un paquet',
        enonce:'Vous envoyez un email de Paris a Tokyo. Decrire les 5 etapes du trajet.',
        correction:'1. Email decoupe en paquets TCP/IP.\n2. Chaque paquet part avec adresse IP destination.\n3. Routeurs successifs acheminent chaque paquet.\n4. Paquets transitent via cables sous-marins (Atlantique/Pacifique).\n5. Reassembles a l\'arrivee a Tokyo.\nDuree : quelques millisecondes.' },
      { id:'EX03', niveau:'Intermediaire', titre:'Requete DNS',
        enonce:'Expliquer ce qui se passe quand vous tapez "www.wikipedia.org" dans votre navigateur.',
        correction:'1. Navigateur verifie son cache DNS local.\n2. Interroge le serveur DNS du FAI.\n3. DNS resout : wikipedia.org → 185.15.58.224\n4. Navigateur etablit connexion TCP avec ce serveur.\n5. Envoie requete HTTP GET /\n6. Serveur renvoie la page HTML.\n7. Navigateur affiche la page.' },
    ],
  },
  'web': {
    ch:'TH 02', titre:'Le Web', badge:'HTML/CSS', duree:'~5h',
    desc:'Fonctionnement du Web, HTML, CSS, URL, moteurs de recherche.',
    theoremes:[
      { id:'D1', type:'def', nom:'Le Web',
        enonce:'Web = ensemble de pages reliees par des hyperliens, accessibles via HTTP.\nInvente par Tim Berners-Lee en 1989 au CERN.\n\nWeb ≠ Internet :\n- Internet = infrastructure (reseau de reseaux)\n- Web = service sur Internet (pages, sites)\n\nAutres services Internet : email, FTP, streaming, jeux en ligne...' },
      { id:'D2', type:'def', nom:'URL (Uniform Resource Locator)',
        enonce:'Structure : protocole://domaine:port/chemin?parametres\nEx: https://www.wikipedia.org/wiki/France\n\n- https : protocole securise (HTTP + chiffrement TLS)\n- www.wikipedia.org : nom de domaine\n- /wiki/France : chemin vers la ressource\n\nHTTPS = HTTP + TLS (cadenas dans le navigateur).' },
      { id:'N1', type:'notion', nom:'HTML - Structure d\'une page',
        enonce:'HTML = HyperText Markup Language.\n\nStructure de base :\n<html>\n  <head>\n    <title>Titre de la page</title>\n  </head>\n  <body>\n    <h1>Titre principal</h1>\n    <p>Paragraphe de texte</p>\n    <a href="url">Lien hypertexte</a>\n    <img src="image.jpg" alt="description">\n  </body>\n</html>' },
      { id:'N2', type:'notion', nom:'CSS - Mise en forme',
        enonce:'CSS = Cascading Style Sheets.\n\nSelecteurs et proprietes :\nh1 { color: blue; font-size: 24px; }\n.maClasse { background: red; }\n#monId { margin: 10px; padding: 5px; }\n\nLien HTML/CSS :\n<link rel="stylesheet" href="style.css">\nou style inline : <p style="color:red">texte</p>' },
      { id:'M1', type:'methode', nom:'Creer une page web simple',
        enonce:'Etapes :\n1. Creer fichier index.html\n2. Ecrire structure HTML (html, head, body)\n3. Ajouter contenu : h1-h6, p, a, img, ul/li\n4. Creer style.css et lier avec <link>\n5. Appliquer classes CSS (.classe { propriete: valeur; })\n6. Ouvrir dans le navigateur pour tester\n7. Inspecter avec F12 (DevTools)' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Decoder une URL',
        enonce:'Analyser l\'URL : https://docs.python.org/3/library/math.html\nIdentifier : protocole, domaine, chemin, fichier.',
        correction:'Protocole : https (connexion securisee TLS)\nDomaine : docs.python.org\nChemin : /3/library/\nFichier : math.html\n=> Page de documentation Python sur le module math, version 3.' },
      { id:'EX02', niveau:'Facile', titre:'Ecrire du HTML',
        enonce:'Ecrire le code HTML pour une page avec : titre "Mon CV", sous-titre "Competences", liste de 3 langages.',
        correction:'<!DOCTYPE html>\n<html>\n<head><title>Mon CV</title></head>\n<body>\n  <h1>Mon CV</h1>\n  <h2>Competences</h2>\n  <ul>\n    <li>Python</li>\n    <li>HTML/CSS</li>\n    <li>SQL</li>\n  </ul>\n</body>\n</html>' },
      { id:'EX03', niveau:'Intermediaire', titre:'Moteur de recherche',
        enonce:'Expliquer les 3 etapes du fonctionnement d\'un moteur de recherche (Google, Bing).',
        correction:'1. Exploration (crawling) :\n   Des robots parcourent le Web en suivant les liens.\n   Ils decouvrent de nouvelles pages en continu.\n\n2. Indexation :\n   Le contenu est analyse et stocke dans une enorme base.\n   Mots-cles, meta-donnees, liens entrants...\n\n3. Classement (ranking) :\n   Algorithme PageRank de Google.\n   Criteres : pertinence du contenu, nombre de liens entrants, fraicheur, rapidite.' },
    ],
  },
  'reseaux-sociaux': {
    ch:'TH 03', titre:'Reseaux sociaux', badge:'Graphes', duree:'~4h',
    desc:'Modelisation par les graphes, algorithmes de recommandation, cyberharcèlement.',
    theoremes:[
      { id:'D1', type:'def', nom:'Graphe',
        enonce:'Graphe G = (V, E) :\n- V = ensemble de sommets (noeuds)\n- E = ensemble d\'aretes (liaisons)\n\nExemples reseaux sociaux :\n- Sommets = utilisateurs\n- Aretes = liens d\'amitie ou abonnement\n\nOriente (Twitter/X) : fleche A → B (A suit B)\nNon oriente (Facebook) : lien mutuel A — B' },
      { id:'D2', type:'def', nom:'Degre d\'un sommet',
        enonce:'Degre = nombre de connexions directes d\'un noeud.\n\nEx: Alice a 150 amis → degre(Alice) = 150.\n\nNoeud central (hub) = noeud a fort degre = influenceur.\nDiametre = plus long chemin entre 2 noeuds du graphe.\n\nTheorie des 6 degres : 2 personnes quelconques\nsont separees par maximum 6 intermediaires.' },
      { id:'N1', type:'notion', nom:'Algorithmes de recommandation',
        enonce:'Filtrage collaboratif :\n"Les utilisateurs similaires a toi ont aime X"\n\nFiltrage par contenu :\nAnalyse des posts et videos que tu as aimes/vus.\n\nEngagement maximise = likes + commentaires + temps\n→ L\'algorithme cree des "bulles de filtre" :\non voit surtout ce qui confirme nos opinions.' },
      { id:'M1', type:'methode', nom:'Analyser un graphe social',
        enonce:'1. Identifier les noeuds (utilisateurs).\n2. Tracer les aretes (relations).\n3. Calculer le degre de chaque noeud.\n4. Reperer les noeuds centraux (fort degre).\n5. Identifier les communautes (clusters densement connectes).\n6. Evaluer le diametre du graphe.' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Graphe d\'amis',
        enonce:'Alice est amie avec Bob et Charlie. Bob est ami avec Charlie et David. Tracer le graphe et calculer les degres.',
        correction:'Graphe non oriente :\nAlice — Bob, Alice — Charlie, Bob — Charlie, Bob — David\n\nDegres :\ndeg(Alice) = 2\ndeg(Bob) = 3  ← noeud central\ndeg(Charlie) = 2\ndeg(David) = 1\n\nBob est le noeud le plus connecte (hub).' },
      { id:'EX02', niveau:'Intermediaire', titre:'Bulle de filtre',
        enonce:'Expliquer le phenomene de bulle de filtre et ses 3 principales consequences.',
        correction:'Definition : l\'algorithme montre en priorite les contenus correspondant a nos opinions precedentes.\n\nMecanisme :\n1. On like des contenus\n2. Algorithme apprend nos preferences\n3. Montre davantage de contenus similaires\n4. On voit de moins en moins d\'autres points de vue\n\nConsequences :\n1. Radicalisation possible des opinions.\n2. Propagation de desinformation (fake news).\n3. Difficulte de former un avis nuance et informe.' },
    ],
  },
  'donnees': {
    ch:'TH 04', titre:'Donnees structurees', badge:'Bases de donnees', duree:'~5h',
    desc:'Donnees numeriques, tables CSV, traitement, RGPD et vie privee.',
    theoremes:[
      { id:'D1', type:'def', nom:'Donnee et metadonnee',
        enonce:'Donnee = information representee numeriquement.\nTypes : texte, entier, decimal, date, booleen, image.\n\nMetadonnee = donnee sur une donnee.\nEx: une photo contient des metadonnees :\n- Date et heure de prise de vue\n- Coordonnees GPS\n- Modele d\'appareil photo\n- Resolution\n\nFormat CSV (Comma-Separated Values) :\nnom,age,ville\nAlice,16,Paris' },
      { id:'D2', type:'def', nom:'Table de donnees',
        enonce:'Table = ensemble de lignes avec les memes attributs.\n\nStructure :\n- Ligne (enregistrement) = 1 entite (1 personne, 1 produit)\n- Colonne (attribut) = caracteristique (nom, age, prix)\n- Cle primaire = identifiant unique de chaque ligne\n\nEx: Table eleves :\nid | nom   | note | classe\n1  | Alice | 15   | 2nde A\n2  | Bob   | 12   | 2nde B' },
      { id:'N1', type:'notion', nom:'Operations sur les tables',
        enonce:'Selection (filtre) : garder les lignes verifiant une condition.\nEx: eleves ou note >= 10\n\nProjection : garder seulement certaines colonnes.\nEx: garder uniquement nom et note.\n\nTri : ordonner selon une colonne.\nEx: trier par note decroissante.\n\nAggregation : COUNT, SUM, AVG, MAX, MIN.\nEx: moyenne des notes = 13.5' },
      { id:'N2', type:'notion', nom:'RGPD et vie privee',
        enonce:'RGPD (2018) = Reglement General sur la Protection des Donnees.\nS\'applique dans toute l\'Union Europeenne.\n\nDroits des personnes :\n- Acces : savoir quelles donnees sont collectees\n- Rectification : corriger des erreurs\n- Effacement (droit a l\'oubli)\n- Portabilite : recuperer ses donnees\n\nConsentement : explicite, libre, eclaire, revocable.\nCNIL : autorite francaise de controle.\nAmende max : 4% du chiffre d\'affaires mondial.' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Lire une table CSV',
        enonce:'Donnees CSV :\nnom,sport,age\nAlice,natation,16\nBob,foot,17\nClara,natation,16\n\nQ1: Combien de lignes de donnees ?\nQ2: Quels sont les attributs ?\nQ3: Selectionner les eleves qui font natation.',
        correction:'Q1: 3 lignes de donnees (hors en-tete).\n\nQ2: 3 attributs : nom, sport, age.\n\nQ3: Selection sport = natation :\nnom  | sport    | age\nAlice| natation | 16\nClara| natation | 16\n=> 2 eleves pratiquent la natation.' },
      { id:'EX02', niveau:'Intermediaire', titre:'RGPD en pratique',
        enonce:'Une appli collecte : nom, email, localisation GPS, historique de navigation. Analyser selon le RGPD.',
        correction:'Donnees personnelles collectees :\n- Nom : identification directe\n- Email : identification directe\n- GPS : donnee sensible (mouvements)\n- Historique : profil comportemental\n\nObligations RGPD :\n1. Informer l\'utilisateur (transparence)\n2. Obtenir consentement explicite\n3. Limiter la collecte au necessaire\n4. Securiser les donnees\n5. Permettre l\'effacement\n\nAmende possible si non-respect.' },
    ],
  },
  'geolocalisation': {
    ch:'TH 05', titre:'Geolocalisation', badge:'GPS', duree:'~3h',
    desc:'GPS, satellites, trilateralisation, applications et enjeux vie privee.',
    theoremes:[
      { id:'D1', type:'def', nom:'GPS',
        enonce:'GPS = Global Positioning System (systeme americain).\n24+ satellites en orbite a 20 200 km d\'altitude.\n\nPrincipe :\n1. Chaque satellite emet heure + position en continu.\n2. Le recepteur calcule le temps de propagation.\n3. Distance = vitesse_lumiere x duree.\n4. 3 satellites → position 2D\n4 satellites → position 3D (altitude incluse).\n\nPrecision : quelques metres (civil).' },
      { id:'F1', type:'formule', nom:'Calcul de distance GPS',
        enonce:'distance = vitesse_lumiere x temps_propagation\n\nVitesse de la lumiere : c = 3 × 10⁸ m/s\n\nEx: signal recu 0.07 s apres emission :\nd = 3 × 10⁸ × 0.07 = 21 000 000 m = 21 000 km\n\nLe satellite est a 21 000 km du recepteur.' },
      { id:'N1', type:'notion', nom:'Trilateralisation',
        enonce:'(Souvent appelee triangulation par abus de langage.)\n\nPrincipe geometrique :\n- Chaque satellite definit une sphere de rayon d.\n- Intersection de 3 spheres = 2 points.\n- 4e satellite elimine le mauvais point.\n\nEn 2D (analogue) :\nSi on est a 3km de A, 4km de B, 5km de C\n→ Position = intersection des 3 cercles.' },
      { id:'N2', type:'notion', nom:'Localisation sans GPS',
        enonce:'WiFi positioning :\nBase de donnees des reseaux WiFi georeferencies.\nPrecision : quelques metres en ville.\n\nGSM (antennes telephoniques) :\nTriangulation entre 3 antennes proches.\nPrecision : 100m a 1km.\n\nAdresse IP :\nGeolocalisation approximative (ville, region).\nPrecision tres faible.\n\nCombiner GPS + WiFi + GSM : meilleur compromis.' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Calculer une distance GPS',
        enonce:'Un satellite emet un signal. Le recepteur le recoit 0.08 secondes plus tard. La vitesse de la lumiere est 3×10⁸ m/s. Calculer la distance recepteur-satellite.',
        correction:'Formule : distance = vitesse × temps\nd = 3 × 10⁸ m/s × 0.08 s\nd = 24 000 000 m = 24 000 km\n\nLe satellite est a 24 000 km du recepteur.\n(Coherent avec les orbites GPS a ~20 000 km d\'altitude.)' },
      { id:'EX02', niveau:'Intermediaire', titre:'Vie privee et GPS',
        enonce:'Votre telephone stocke votre historique de localisation GPS. Citer 3 risques et 3 protections.',
        correction:'Risques :\n1. Revelation de votre domicile et lieu de travail.\n2. Inference de votre vie privee (medecin, opinions, pratiques religieuses).\n3. Revente des donnees a des publicitaires ou piratage.\n\nProtections :\n1. Desactiver la geolocalisation des apps inutiles.\n2. Refuser le partage de localisation non necessaire.\n3. Utiliser le mode avion dans des lieux sensibles.' },
    ],
  },
  'photographie': {
    ch:'TH 06', titre:'Photographie numerique', badge:'Image', duree:'~5h',
    desc:'Image numerique, pixels, codage RGB, formats et compression.',
    theoremes:[
      { id:'D1', type:'def', nom:'Pixel et resolution',
        enonce:'Pixel (picture element) = plus petite unite d\'une image.\nChaque pixel a une couleur uniforme.\n\nResolution : largeur x hauteur en pixels.\nEx: 1920 x 1080 = 2 073 600 pixels (~2 megapixels).\n\nDPI (dots per inch) : densite pour l\'impression.\n72 DPI : ecran\n300 DPI : impression qualite photo\n\nPlus de pixels = image plus nette mais fichier plus lourd.' },
      { id:'N1', type:'notion', nom:'Codage RGB des couleurs',
        enonce:'Synthese additive : Rouge + Vert + Bleu.\nChaque composante : valeur de 0 a 255 (8 bits = 1 octet).\n\nExemples :\nRouge pur     : (255,   0,   0)\nVert pur      : (  0, 255,   0)\nBleu pur      : (  0,   0, 255)\nBlanc         : (255, 255, 255)\nNoir          : (  0,   0,   0)\nJaune         : (255, 255,   0)\nGris moyen    : (128, 128, 128)\n\n1 pixel RGB = 3 octets = 24 bits.' },
      { id:'F1', type:'formule', nom:'Taille d\'une image non compressee',
        enonce:'Taille (octets) = largeur × hauteur × 3\n\nExemple : image 800 × 600 pixels :\nTaille = 800 × 600 × 3 = 1 440 000 octets = 1.44 Mo\n\nImage Full HD (1920 × 1080) :\nTaille = 1920 × 1080 × 3 = 6 220 800 octets ≈ 6 Mo' },
      { id:'N2', type:'notion', nom:'Formats et compression',
        enonce:'PNG : sans perte (lossless)\n- Ideal pour logos, graphiques, captures d\'ecran\n- Fichier plus grand\n\nJPEG : avec perte (lossy)\n- Ideal pour photos naturelles\n- Taille divisee par 5 a 10\n- Artefacts visibles a fort taux de compression\n\nGIF : animations simples, max 256 couleurs\nWebP (Google) : moderne, PNG + JPEG en mieux' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Calculer la taille d\'une image',
        enonce:'Une image a une resolution de 1200 × 800 pixels. Calculer sa taille non compressee en Mo.',
        correction:'Taille = largeur × hauteur × 3 octets (RGB)\nTaille = 1200 × 800 × 3\nTaille = 2 880 000 octets\nTaille = 2 880 000 / 1 000 000 ≈ 2.88 Mo\n\nSi compresse en JPEG (taux 10:1) ≈ 0.29 Mo' },
      { id:'EX02', niveau:'Facile', titre:'Code couleur RGB',
        enonce:'Q1: Donner les codes RGB de orange et gris clair.\nQ2: Quelle couleur est (0, 128, 255) ?',
        correction:'Q1:\nOrange : (255, 165, 0)\nGris clair : (200, 200, 200)\n(Pour un gris : R = V = B)\n\nQ2: (0, 128, 255)\n- Rouge = 0 (absent)\n- Vert = 128 (modere)\n- Bleu = 255 (maximum)\n=> Bleu ciel / cyan fonce' },
      { id:'EX03', niveau:'Intermediaire', titre:'Choisir le bon format',
        enonce:'Pour chaque cas, choisir PNG ou JPEG et justifier :\na) Logo d\'entreprise avec fond transparent\nb) Photo de vacances\nc) Graphique statistique avec texte\nd) Portrait photographique',
        correction:'a) Logo → PNG\nFond transparent, formes nettes, pas de degradation.\n\nb) Photo vacances → JPEG\nPhoto naturelle, compression importante, pertes imperceptibles.\n\nc) Graphique → PNG\nTexte et lignes nettes, couleurs unies, artefacts inacceptables.\n\nd) Portrait → JPEG\nPhoto avec degrade de couleurs, compression tres efficace.' },
    ],
  },
  'objets-connectes': {
    ch:'TH 07', titre:'Objets connectes', badge:'IoT', duree:'~4h',
    desc:'Informatique embarquee, capteurs, IoT, bases de l\'intelligence artificielle.',
    theoremes:[
      { id:'D1', type:'def', nom:'Systeme embarque',
        enonce:'Systeme embarque = ordinateur miniaturise integre dans un objet.\nRealise une ou plusieurs taches specifiques.\n\nComposants :\n- Microcontroleur : processeur + memoire + E/S sur une puce\n- Capteurs : mesurent l\'environnement physique\n- Actionneurs : agissent sur l\'environnement\n- Source d\'alimentation (batterie, secteur)\n\nExemples : Arduino, Raspberry Pi, thermostat, montre connectee.' },
      { id:'D2', type:'def', nom:'Capteur et actionneur',
        enonce:'Capteur : convertit grandeur physique → signal numerique.\nEx: thermistance (temperature), photodiode (lumiere),\naccelerometre (mouvement), GPS (position), micro (son).\n\nActionneur : convertit signal numerique → action physique.\nEx: moteur, LED, buzzer sonore, ecran LCD, electrovannes.\n\nBoucle de controle :\nCAPTEUR → TRAITEMENT (microcontroleur) → ACTIONNEUR' },
      { id:'N1', type:'notion', nom:'Internet des Objets (IoT)',
        enonce:'IoT = Internet of Things = reseau d\'objets connectes a Internet.\n15+ milliards d\'objets connectes dans le monde.\n\nArchitecture :\n1. Objet connecte (capteur + microcontroleur)\n2. Passerelle (gateway) : agregation locale\n3. Cloud : stockage et traitement\n4. Application : interface utilisateur\n\nProtocoles IoT : WiFi, Bluetooth, ZigBee, LoRa\nApplications : maison connectee, sante, industrie 4.0.' },
      { id:'N2', type:'notion', nom:'Intelligence artificielle - bases',
        enonce:'IA = systemes qui simulent des capacites cognitives.\n\nMachine Learning :\n- L\'IA apprend a partir de donnees sans etre programmee explicitement.\n- Ex: 1 million de photos de chats/chiens → detection automatique.\n\nReseaux de neurones artificels :\n- Inspires du cerveau humain.\n- Couches de traitement en cascade.\n\nBiais algorithmique :\n- L\'IA reproduit les biais des donnees d\'entrainement.\n- Risque de discrimination automatisee.' },
    ],
    exercices:[
      { id:'EX01', niveau:'Facile', titre:'Maison connectee',
        enonce:'Une maison connectee a : thermostat, serrure connectee, ampoules LED, capteur de fumee. Identifier capteurs et actionneurs pour chaque objet.',
        correction:'Thermostat :\n- Capteur : temperature\n- Actionneur : commande la chaudiere/climatisation\n\nSerrure connectee :\n- Capteur : empreinte digitale, code, NFC\n- Actionneur : moteur de verrouillage\n\nAmpoule LED connectee :\n- Capteur : luminosite ambiante (parfois)\n- Actionneur : module LED variable\n\nCapteur de fumee :\n- Capteur : detecteur de particules/fumee\n- Actionneur : sirene d\'alerte sonore' },
      { id:'EX02', niveau:'Intermediaire', titre:'Biais algorithmique',
        enonce:'Un algorithme de reconnaissance faciale est entraine avec 80% de visages europeens. Quels problemes et quelles solutions ?',
        correction:'Problemes :\n1. Taux d\'erreur eleve pour les visages sous-representes.\n2. Discrimination systematique (refus d\'acces, fausses identifications).\n3. Violation potentielle du RGPD.\n4. Renforcement des inegalites existantes.\n\nExemple reel :\nAmazon Rekognition : 35% d\'erreurs sur femmes a peau foncee\nvs 1% pour hommes blancs.\n\nSolutions :\n1. Diversifier les donnees d\'entrainement.\n2. Audits reguliers du systeme.\n3. Regulation juridique des systemes IA.\n4. Equipes de developpement diversifiees.' },
    ],
  },
}

export default function BacFranceInfoSecondeSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)

  const color = SEC_COLOR[slug] || '#06b6d4'
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  if (!ch) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>💻</div>
      <h2>Theme en cours de redaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce theme sera disponible prochainement.</p>
      <Link href="/bac-france/informatique/seconde" className="btn btn-primary">Retour Seconde SNT</Link>
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
              <Link href="/bac-france/informatique/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde SNT</Link>
              <span>›</span>
              <span style={{ color:'var(--text2)' }}>{ch.titre}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12, flexWrap:'wrap' }}>
              <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color, fontWeight:700, background:`${color}18`, padding:'3px 10px', borderRadius:20 }}>{ch.ch}</span>
              <span style={{ fontSize:10, color:'var(--muted)', background:'var(--surface)', padding:'3px 10px', borderRadius:20 }}>SNT · Seconde</span>
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
              <div style={{ fontSize:13, color:'var(--muted)' }}>Le prof IA explique et resout pas a pas vos questions SNT.</div>
            </div>
            <Link href={`/chat?q=${encodeURIComponent('SNT Seconde ' + ch.titre)}`} className="btn btn-primary">
              Poser une question →
            </Link>
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
            {prevSlug ? (
              <Link href={`/bac-france/informatique/seconde/${prevSlug}`}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text2)', textDecoration:'none', fontSize:13 }}>
                ← {TITRES[prevSlug]}
              </Link>
            ) : (
              <Link href="/bac-france/informatique/seconde"
                style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text2)', textDecoration:'none', fontSize:13 }}>
                ← Retour Seconde SNT
              </Link>
            )}
            {nextSlug && (
              <Link href={`/bac-france/informatique/seconde/${nextSlug}`}
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