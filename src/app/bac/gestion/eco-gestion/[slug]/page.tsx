'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// GESTION — SECTION SC. ÉCONOMIQUES ET GESTION / [SLUG] DÉTAIL COMPLET
// Route : /bac/gestion/eco-gestion/[slug]
// Programme officiel CNP Tunisie — 4ème Économie & Gestion
// 6 chapitres
// ══════════════════════════════════════════════════════════════════════

const C = { def:'#06b6d4', notion:'#8b5cf6', indicateur:'#f59e0b', mecanisme:'#ec4899', exemple:'#10b981', enjeu:'#f97316' }
const L: Record<string,string> = { def:'Définition', notion:'Notion clé', indicateur:'Calcul / Formule', mecanisme:'Mécanisme', exemple:'Exemple', enjeu:'Enjeu' }

const NAV_ORDER = [
  'evaluation-consolidation','approvisionnement','production',
  'commerciale','ressources-humaines','financiere',
]

const TITRES_NAV: Record<string,string> = {
  'evaluation-consolidation':'CH 01 — Évaluation & Consolidation',
  'approvisionnement':       'CH 02 — Approvisionnement',
  'production':              'CH 03 — Gestion de la production',
  'commerciale':             'CH 04 — Gestion commerciale',
  'ressources-humaines':     'CH 05 — Ressources humaines',
  'financiere':              'CH 06 — Gestion financière',
}

const SEC_COLORS: Record<string,string> = {
  'evaluation-consolidation':'#f43f5e','approvisionnement':'#f59e0b','production':'#8b5cf6',
  'commerciale':'#ec4899','ressources-humaines':'#14b8a6','financiere':'#0ea5e9',
}

// ══════════════════════════════════════════════════════════════════════
// TYPE
// ══════════════════════════════════════════════════════════════════════
type Thm  = { id:string; type:string; nom:string; enonce:string; remarque?:string }
type Exo  = { id:string; niveau:string; titre:string; enonce:string; correction:string }
type Bloc = { notion:string; theoremes:Thm[]; exercices:Exo[] }
type SC   = { id:string; titre:string; notions:string[]; blocs:Bloc[] }
type Chap = { id:string; titre:string; badge:string; color:string; emoji:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 6 CHAPITRES COMPLETS
// ══════════════════════════════════════════════════════════════════════
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ALL_CHAPTERS: Record<string, any> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — ÉVALUATION & CONSOLIDATION
// ─────────────────────────────────────────────────────────────────────
'evaluation-consolidation': {
  id:'evaluation-consolidation', emoji:'📒', badge:'Comptabilité', color:'#f43f5e',
  titre:'Module Évaluation – Consolidation',
  desc:"Patrimoine et bilan (comptable et fonctionnel), équilibre financier (FDR, BFR, TN), comptabilité générale (charges, produits, résultat, TVA), organisation de l'entreprise et système d'information.",
  souschapitres:[
    {
      id:'sc-eval-patrimoine', titre:'1.1 Patrimoine, bilan et équilibre financier',
      notions:['Patrimoine','Bilan comptable / fonctionnel','FDR','BFR','Trésorerie nette'],
      blocs:[
        {
          notion:'📒 Le bilan et l\'équilibre financier',
          theoremes:[
            { id:'D-EV1', type:'def', nom:'Entreprise et patrimoine',
              enonce:"ENTREPRISE : unité économique qui combine des facteurs de production (travail, capital) pour produire des biens et services destinés à être vendus.\n\nPATRIMOINE : ensemble des BIENS (emplois) et des DETTES (ressources) de l'entreprise à une date donnée." },
            { id:'D-EV2', type:'def', nom:'Bilan comptable',
              enonce:"Document qui décrit la situation patrimoniale à une date donnée :\n• ACTIF (emplois) : ce que l'entreprise possède (immobilisations, stocks, créances, trésorerie).\n• PASSIF (ressources) : d'où vient le financement (capitaux propres, dettes).\n\n→ TOTAL ACTIF = TOTAL PASSIF." },
            { id:'N-EV1', type:'notion', nom:'Bilan fonctionnel',
              enonce:"Reclassement du bilan en grandes masses pour analyser l'équilibre :\n• Emplois stables / Ressources stables (cycle long) ;\n• Actif circulant / Passif circulant (cycle d'exploitation) ;\n• Trésorerie active / passive." },
            { id:'I-EV1', type:'indicateur', nom:'FDR, BFR et Trésorerie nette',
              enonce:"FDR = Capitaux permanents − Actif immobilisé\n     (= Ressources stables − Emplois stables)\n\nBFR = Actif circulant (hors trésorerie) − Passif circulant (hors trésorerie)\n\nTN = FDR − BFR\n   (= Trésorerie active − Trésorerie passive)",
              remarque:"Équilibre financier : un FDR positif qui couvre le BFR (TN ≥ 0) traduit une situation saine." },
          ],
          exercices:[
            { id:'EX-EV1', niveau:'Moyen', titre:'Calcul du FDR, BFR et TN',
              enonce:"Capitaux permanents = 500 000 DT ; Actif immobilisé = 380 000 DT.\nActif circulant (hors trésorerie) = 200 000 DT ; Passif circulant (hors trésorerie) = 90 000 DT.\nCalculer le FDR, le BFR et la trésorerie nette.",
              correction:"FDR = 500 000 − 380 000 = 120 000 DT (positif).\nBFR = 200 000 − 90 000 = 110 000 DT.\nTN = FDR − BFR = 120 000 − 110 000 = 10 000 DT (positive).\n→ Le FDR couvre le BFR : l'équilibre financier est respecté." },
          ]
        },
      ]
    },
    {
      id:'sc-eval-compta', titre:'1.2 Comptabilité générale et organisation',
      notions:['Charges / Produits','Résultat','TVA','Fonctions de l\'entreprise','Système d\'information'],
      blocs:[
        {
          notion:'🧾 Charges, produits, résultat et TVA',
          theoremes:[
            { id:'D-EV3', type:'def', nom:'Charges, produits et résultat',
              enonce:"• CHARGES : emplois définitifs (consommations de l'exercice : achats, salaires...).\n• PRODUITS : ressources de l'exercice (ventes, produits financiers...)." },
            { id:'I-EV2', type:'indicateur', nom:'Résultat de l\'exercice',
              enonce:"Résultat = Total des PRODUITS − Total des CHARGES\n\n• Résultat > 0 → BÉNÉFICE\n• Résultat < 0 → PERTE" },
            { id:'I-EV3', type:'indicateur', nom:'TVA due',
              enonce:"TVA collectée (sur ventes) − TVA déductible (sur achats) :\nTVA due = TVA collectée − TVA déductible\n\nSi négative → crédit de TVA." },
            { id:'N-EV2', type:'notion', nom:'Organisation et système d\'information',
              enonce:"FONCTIONS : approvisionnement, production, commerciale, ressources humaines, financière.\nSTRUCTURE : organigramme, liens hiérarchiques, fonctionnels et de conseil.\nSYSTÈME D'INFORMATION : collecte et traite l'information (interne/externe) pour la prise de décision." },
          ],
          exercices:[
            { id:'EX-EV2', niveau:'Facile', titre:'Calcul du résultat',
              enonce:"Total des produits = 850 000 DT ; total des charges = 790 000 DT.\nCalculer le résultat et préciser sa nature.",
              correction:"Résultat = 850 000 − 790 000 = 60 000 DT.\nLe résultat est positif → l'entreprise réalise un BÉNÉFICE de 60 000 DT." },
            { id:'EX-EV3', niveau:'Facile', titre:'TVA due',
              enonce:"TVA collectée sur les ventes = 18 000 DT ; TVA déductible sur les achats = 11 000 DT.\nCalculer la TVA due.",
              correction:"TVA due = TVA collectée − TVA déductible = 18 000 − 11 000 = 7 000 DT.\n→ L'entreprise doit verser 7 000 DT à l'État." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — APPROVISIONNEMENT
// ─────────────────────────────────────────────────────────────────────
'approvisionnement': {
  id:'approvisionnement', emoji:'📦', badge:'Stocks', color:'#f59e0b',
  titre:'Gestion de l\'approvisionnement',
  desc:"Gestion comptable des stocks (CUMP, fiche de stock), analyse de l'évolution des stocks (stock moyen, rotation, durée de stockage) et gestion prévisionnelle (stock de sécurité, quantité économique, modèle de Wilson).",
  souschapitres:[
    {
      id:'sc-appro-stocks', titre:'2.1 Gestion comptable et analyse des stocks',
      notions:['CUMP','Stock moyen','Rotation des stocks','Durée de stockage'],
      blocs:[
        {
          notion:'📦 Valorisation et rotation des stocks',
          theoremes:[
            { id:'D-AP1', type:'def', nom:'Le stock et ses mouvements',
              enonce:"STOCK : ensemble des biens en attente d'utilisation ou de vente.\n• Stock initial (SI), stock final (SF).\n• Mouvements : ENTRÉES (bon d'entrée) et SORTIES (bon de sortie), suivis sur la FICHE DE STOCK." },
            { id:'I-AP1', type:'indicateur', nom:'Méthode CUMP',
              enonce:"Coût Unitaire Moyen Pondéré :\nCUMP = (Valeur du stock initial + Valeur des entrées) / (Quantité initiale + Quantités entrées)\n\nLes sorties sont valorisées à ce CUMP." },
            { id:'I-AP2', type:'indicateur', nom:'Stock moyen, rotation et durée',
              enonce:"Stock moyen : SM = (SI + SF) / 2\n\nCoefficient de rotation : Cr = Consommation / Stock moyen\n\nDurée moyenne de stockage : d = 360 / Cr  (en jours)",
              remarque:"Plus la rotation est rapide (Cr élevé, durée faible), moins le stock immobilise de capitaux." },
          ],
          exercices:[
            { id:'EX-AP1', niveau:'Moyen', titre:'Calcul du CUMP',
              enonce:"Stock initial : 100 unités à 20 DT. Entrée : 300 unités à 24 DT.\nCalculer le CUMP.",
              correction:"Valeur SI = 100 × 20 = 2 000 DT ; valeur entrée = 300 × 24 = 7 200 DT.\nCUMP = (2 000 + 7 200) / (100 + 300) = 9 200 / 400 = 23 DT l'unité." },
            { id:'EX-AP2', niveau:'Moyen', titre:'Rotation et durée de stockage',
              enonce:"Consommation annuelle = 480 000 DT ; stock moyen = 60 000 DT.\nCalculer le coefficient de rotation et la durée moyenne de stockage.",
              correction:"Cr = Consommation / Stock moyen = 480 000 / 60 000 = 8 (le stock tourne 8 fois par an).\nDurée = 360 / Cr = 360 / 8 = 45 jours." },
          ]
        },
      ]
    },
    {
      id:'sc-appro-previsionnel', titre:'2.2 Gestion prévisionnelle (modèle de Wilson)',
      notions:['Stock de sécurité','Quantité économique','Modèle de Wilson','Cadence'],
      blocs:[
        {
          notion:'⚙️ La quantité économique de commande',
          theoremes:[
            { id:'N-AP1', type:'notion', nom:'Stocks minimum, maximum et de sécurité',
              enonce:"• Stock de SÉCURITÉ : marge pour éviter la rupture en cas de retard ou de hausse de la demande.\n• Stock MINIMUM (d'alerte) : niveau déclenchant une nouvelle commande.\n• Stock MAXIMUM : niveau à ne pas dépasser (coût de stockage)." },
            { id:'I-AP3', type:'indicateur', nom:'Modèle de Wilson — quantité économique',
              enonce:"Q* = √( 2 × D × Cₗ / Cₛ )\n\nD = consommation (demande) annuelle\nCₗ = coût de passation (lancement) d'une commande\nCₛ = coût de stockage unitaire annuel\n\nNombre de commandes : N = D / Q*\nCadence (période entre 2 commandes) : 360 / N (jours)",
              remarque:"Q* minimise le coût total = coût de passation + coût de stockage." },
          ],
          exercices:[
            { id:'EX-AP3', niveau:'Difficile', titre:'Quantité économique (Wilson)',
              enonce:"Consommation annuelle D = 9 000 unités ; coût de lancement Cₗ = 40 DT ; coût de stockage Cₛ = 5 DT/unité/an.\nCalculer la quantité économique Q* et le nombre de commandes.",
              correction:"Q* = √(2 × 9 000 × 40 / 5) = √(720 000 / 5) = √144 000 ≈ 379,5 ≈ 380 unités.\nNombre de commandes N = D / Q* = 9 000 / 380 ≈ 23,7 ≈ 24 commandes par an." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — GESTION DE LA PRODUCTION
// ─────────────────────────────────────────────────────────────────────
'production': {
  id:'production', emoji:'🏭', badge:'Coûts', color:'#8b5cf6',
  titre:'Gestion de la production',
  desc:"Calcul des coûts (coûts complets : coût d'achat, de production, de revient ; coûts partiels : marge sur coût variable, seuil de rentabilité), contrôle par les écarts et lot économique de fabrication.",
  souschapitres:[
    {
      id:'sc-prod-couts', titre:'3.1 Calcul des coûts (complets et partiels)',
      notions:['Charges directes/indirectes','Coût de revient','Marge sur coût variable','Seuil de rentabilité'],
      blocs:[
        {
          notion:'🏭 Les coûts complets',
          theoremes:[
            { id:'D-PR1', type:'def', nom:'Charges directes et indirectes',
              enonce:"• Charges DIRECTES : affectables directement à un produit (matière première, main-d'œuvre directe).\n• Charges INDIRECTES : communes à plusieurs produits, réparties via les CENTRES D'ANALYSE." },
            { id:'I-PR1', type:'indicateur', nom:'Hiérarchie des coûts',
              enonce:"Coût d'ACHAT = prix d'achat + charges d'approvisionnement\nCoût de PRODUCTION = coût d'achat des matières consommées + charges de production\nCoût de REVIENT = coût de production des produits vendus + charges hors production (distribution, administration)\n\nRÉSULTAT ANALYTIQUE = Prix de vente − Coût de revient" },
          ],
          exercices:[
            { id:'EX-PR1', niveau:'Moyen', titre:'Coût de revient et résultat',
              enonce:"Coût de production des produits vendus = 80 000 DT ; charges de distribution = 12 000 DT.\nVentes = 110 000 DT. Calculer le coût de revient et le résultat analytique.",
              correction:"Coût de revient = 80 000 + 12 000 = 92 000 DT.\nRésultat analytique = Ventes − Coût de revient = 110 000 − 92 000 = 18 000 DT (bénéfice)." },
          ]
        },
        {
          notion:'📉 Les coûts partiels et le seuil de rentabilité',
          theoremes:[
            { id:'D-PR2', type:'def', nom:'Charges fixes et variables',
              enonce:"• Charges FIXES : indépendantes du volume produit (loyer, amortissements).\n• Charges VARIABLES : proportionnelles au volume (matières, énergie)." },
            { id:'I-PR2', type:'indicateur', nom:'Marge sur coût variable et seuil',
              enonce:"MCV = Chiffre d'affaires − Charges variables\nTaux de MCV = MCV / CA\n\nSeuil de rentabilité : SR = Charges fixes / Taux de MCV\nPoint mort (date d'atteinte du SR) = (SR / CA) × 12  (en mois)",
              remarque:"Au seuil de rentabilité, le résultat est nul (MCV = charges fixes)." },
          ],
          exercices:[
            { id:'EX-PR2', niveau:'Difficile', titre:'Seuil de rentabilité',
              enonce:"CA = 400 000 DT ; charges variables = 240 000 DT ; charges fixes = 100 000 DT.\nCalculer la MCV, le taux de MCV et le seuil de rentabilité.",
              correction:"MCV = 400 000 − 240 000 = 160 000 DT.\nTaux de MCV = 160 000 / 400 000 = 0,40 (40 %).\nSR = Charges fixes / Taux de MCV = 100 000 / 0,40 = 250 000 DT.\n→ L'entreprise devient rentable à partir de 250 000 DT de chiffre d'affaires." },
          ]
        },
      ]
    },
    {
      id:'sc-prod-ecarts', titre:'3.2 Contrôle des coûts et lot économique',
      notions:['Coûts préétablis','Écarts','Lot économique','Sous-traitance'],
      blocs:[
        {
          notion:'📊 Écarts et lot économique de fabrication',
          theoremes:[
            { id:'N-PR1', type:'notion', nom:'Coûts préétablis et écarts',
              enonce:"COÛT PRÉÉTABLI : coût prévu (standard) avant la production.\nÉCART = Coût RÉEL − Coût PRÉÉTABLI.\nL'analyse des écarts relève du CONTRÔLE DE GESTION et mesure la performance." },
            { id:'I-PR3', type:'indicateur', nom:'Lot économique de fabrication',
              enonce:"Q* = √( 2 × D × Cₗ / Cₛ )\noù Cₗ = coût de LANCEMENT d'une série de fabrication.\n\nMinimise le coût total (lancement + stockage) des séries produites." },
            { id:'N-PR2', type:'notion', nom:'Choix des quantités et sous-traitance',
              enonce:"Selon la CAPACITÉ DE PRODUCTION et les coûts, l'entreprise décide de FABRIQUER ou de SOUS-TRAITER (faire produire à l'extérieur)." },
          ],
          exercices:[
            { id:'EX-PR3', niveau:'Moyen', titre:'Calcul d\'un écart sur coût',
              enonce:"Coût réel d'un produit = 52 DT ; coût préétabli = 48 DT.\nCalculer l'écart et l'interpréter.",
              correction:"Écart = Coût réel − Coût préétabli = 52 − 48 = +4 DT.\nL'écart est DÉFAVORABLE (le coût réel dépasse le coût prévu de 4 DT) → il faut en analyser les causes (prix des matières, productivité...)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — GESTION COMMERCIALE
// ─────────────────────────────────────────────────────────────────────
'commerciale': {
  id:'commerciale', emoji:'🛒', badge:'Marketing', color:'#ec4899',
  titre:'Gestion commerciale',
  desc:"Étude de marché (environnement, consommateur, concurrence), segmentation et ciblage, politique commerciale (marketing-mix : produit, prix, communication, distribution), exécution et suivi des ventes.",
  souschapitres:[
    {
      id:'sc-com-marche', titre:'4.1 Étude de marché et marketing-mix',
      notions:['Étude de marché','Segmentation','Ciblage','Marketing-mix (4P)','Part de marché'],
      blocs:[
        {
          notion:'🛒 Du marché au marketing-mix',
          theoremes:[
            { id:'N-CM1', type:'notion', nom:'Étude de marché',
              enonce:"Collecte et analyse d'informations sur :\n• l'ENVIRONNEMENT (économique, juridique...) ;\n• le CONSOMMATEUR (besoins, comportements) ;\n• la CONCURRENCE ;\n• la DISTRIBUTION." },
            { id:'N-CM2', type:'notion', nom:'Segmentation et ciblage',
              enonce:"• SEGMENTATION : découper le marché en groupes homogènes (segments) selon des critères (âge, revenu, géographie...).\n• CIBLAGE : choisir le(s) segment(s) à viser (marché cible)." },
            { id:'N-CM3', type:'notion', nom:'Le marketing-mix (4P)',
              enonce:"• PRODUIT : gamme, marque, conditionnement.\n• PRIX : fixation, stratégies tarifaires.\n• COMMUNICATION : publicité, promotion, relations publiques.\n• DISTRIBUTION (Place) : circuits et canaux." },
            { id:'I-CM1', type:'indicateur', nom:'Part de marché',
              enonce:"PDM = (Ventes de l'entreprise / Ventes totales du marché) × 100\n\nMesure le poids de l'entreprise sur son marché." },
          ],
          exercices:[
            { id:'EX-CM1', niveau:'Facile', titre:'Calcul de la part de marché',
              enonce:"Ventes de l'entreprise = 1,2 million DT ; ventes totales du marché = 8 millions DT.\nCalculer la part de marché.",
              correction:"PDM = (1,2 / 8) × 100 = 15 %.\n→ L'entreprise détient 15 % du marché." },
          ]
        },
        {
          notion:'📋 Exécution et suivi des ventes',
          theoremes:[
            { id:'N-CM4', type:'notion', nom:'Le cycle de la vente',
              enonce:"COMMANDE → LIVRAISON → FACTURATION.\nPuis SUIVI commercial, CONTRÔLE des ventes et FIDÉLISATION des clients (service après-vente, programmes de fidélité)." },
          ],
          exercices:[
            { id:'EX-CM2', niveau:'Facile', titre:'Les 4P du marketing-mix',
              enonce:"Citer les quatre composantes du marketing-mix et donner un exemple pour chacune.",
              correction:"PRODUIT : choix de la gamme et de la marque. PRIX : fixer un prix promotionnel. COMMUNICATION : campagne publicitaire. DISTRIBUTION : vente en grande surface ou en ligne. Les 4P doivent être cohérents entre eux." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — GESTION DES RESSOURCES HUMAINES
// ─────────────────────────────────────────────────────────────────────
'ressources-humaines': {
  id:'ressources-humaines', emoji:'👥', badge:'RH', color:'#14b8a6',
  titre:'Gestion des ressources humaines',
  desc:"Les besoins en personnel (prévision des effectifs, analyse des écarts), le recrutement (interne/externe), la formation et la rémunération du personnel (salaire, prime, masse salariale).",
  souschapitres:[
    {
      id:'sc-rh-besoins', titre:'5.1 Besoins en personnel et recrutement',
      notions:['Prévision des effectifs','Pyramide des âges','Recrutement interne/externe','Intégration'],
      blocs:[
        {
          notion:'👥 Prévoir et recruter',
          theoremes:[
            { id:'N-RH1', type:'notion', nom:'Prévision des besoins en personnel',
              enonce:"Comparer les BESOINS futurs (en fonction de l'activité) et les RESSOURCES disponibles (effectif actuel, pyramide des âges).\nÉcart = Besoins − Ressources → recruter, former ou réduire l'effectif." },
            { id:'N-RH2', type:'notion', nom:'Le recrutement',
              enonce:"• INTERNE : promotion, mutation (rapide, motivant).\n• EXTERNE : embauche hors de l'entreprise (nouvelles compétences).\nProcessus : analyse du poste → sélection → entretien → INTÉGRATION." },
          ],
          exercices:[
            { id:'EX-RH1', niveau:'Facile', titre:'Calcul d\'un besoin de recrutement',
              enonce:"Besoins prévus = 120 salariés ; effectif disponible = 105 salariés.\nDéterminer l'écart et l'action à mener.",
              correction:"Écart = Besoins − Ressources = 120 − 105 = 15 salariés.\nL'écart est positif → l'entreprise doit RECRUTER 15 salariés (en interne et/ou externe)." },
          ]
        },
      ]
    },
    {
      id:'sc-rh-remuneration', titre:'5.2 Formation et rémunération',
      notions:['Formation continue','Salaire · Prime','Masse salariale','Motivation'],
      blocs:[
        {
          notion:'💵 Former et rémunérer',
          theoremes:[
            { id:'N-RH3', type:'notion', nom:'Formation du personnel',
              enonce:"• Formation INITIALE (avant l'emploi) et CONTINUE (en cours d'emploi).\n• Vise le DÉVELOPPEMENT DES COMPÉTENCES.\n• Représente un COÛT mais aussi un investissement en capital humain." },
            { id:'D-RH1', type:'def', nom:'Rémunération et motivation',
              enonce:"RÉMUNÉRATION : salaire (fixe) + primes (variables).\nLa politique de rémunération vise à MOTIVER et fidéliser le personnel." },
            { id:'I-RH1', type:'indicateur', nom:'Masse salariale',
              enonce:"Masse salariale = Σ (salaires bruts + charges patronales)\n\nC'est le coût total du travail pour l'entreprise." },
          ],
          exercices:[
            { id:'EX-RH2', niveau:'Moyen', titre:'Calcul de la masse salariale',
              enonce:"50 salariés ; salaire brut moyen = 1 200 DT/mois ; charges patronales = 16 % des salaires bruts.\nCalculer la masse salariale mensuelle.",
              correction:"Salaires bruts = 50 × 1 200 = 60 000 DT.\nCharges patronales = 60 000 × 16 % = 9 600 DT.\nMasse salariale = 60 000 + 9 600 = 69 600 DT par mois." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — GESTION FINANCIÈRE
// ─────────────────────────────────────────────────────────────────────
'financiere': {
  id:'financiere', emoji:'💰', badge:'Finance', color:'#0ea5e9',
  titre:'Gestion financière',
  desc:"Financement de l'investissement (autofinancement, emprunt, crédit-bail), analyse financière (FDR, BFR, trésorerie nette, ratios) et gestion prévisionnelle et budgétaire (budgets, contrôle budgétaire).",
  souschapitres:[
    {
      id:'sc-fin-financement', titre:'6.1 Financement de l\'investissement',
      notions:['Autofinancement','Emprunt','Crédit-bail','Choix du financement'],
      blocs:[
        {
          notion:'💰 Les modes de financement',
          theoremes:[
            { id:'D-FI1', type:'def', nom:'Les sources de financement',
              enonce:"• AUTOFINANCEMENT : financement INTERNE (par les ressources dégagées par l'entreprise).\n• EMPRUNT / crédit bancaire : financement EXTERNE remboursable avec intérêts.\n• CRÉDIT-BAIL (leasing) : location d'un bien avec option d'achat." },
            { id:'I-FI1', type:'indicateur', nom:'Autofinancement',
              enonce:"Autofinancement = CAF − Dividendes distribués\n(CAF = Capacité d'AutoFinancement)\n\nC'est la part des ressources internes conservées pour financer l'entreprise." },
            { id:'N-FI1', type:'notion', nom:'Choix du financement',
              enonce:"Le choix dépend du COÛT (taux d'intérêt), de la capacité de REMBOURSEMENT et de l'effet sur l'autonomie financière de l'entreprise." },
          ],
          exercices:[
            { id:'EX-FI1', niveau:'Facile', titre:'Calcul de l\'autofinancement',
              enonce:"CAF = 90 000 DT ; dividendes distribués = 30 000 DT.\nCalculer l'autofinancement.",
              correction:"Autofinancement = CAF − Dividendes = 90 000 − 30 000 = 60 000 DT.\n→ L'entreprise conserve 60 000 DT pour se financer." },
          ]
        },
      ]
    },
    {
      id:'sc-fin-analyse', titre:'6.2 Analyse financière et gestion budgétaire',
      notions:['FDR · BFR · TN','Ratios financiers','Budgets','Contrôle budgétaire'],
      blocs:[
        {
          notion:'📊 Équilibre financier et budgets',
          theoremes:[
            { id:'I-FI2', type:'indicateur', nom:'Équilibre financier et ratio d\'autonomie',
              enonce:"FDR = Ressources stables − Emplois stables\nBFR = Actif circulant − Passif circulant\nTN = FDR − BFR\n\nRatio d'autonomie financière = Capitaux propres / Total passif",
              remarque:"Un FDR positif couvrant le BFR traduit une structure financière équilibrée." },
            { id:'N-FI2', type:'notion', nom:'La gestion budgétaire',
              enonce:"Établissement de BUDGETS prévisionnels : ventes, achats, production, investissements, TRÉSORERIE.\nLe CONTRÔLE BUDGÉTAIRE compare PRÉVISIONS et RÉALISATIONS pour analyser les écarts." },
          ],
          exercices:[
            { id:'EX-FI2', niveau:'Moyen', titre:'Trésorerie nette',
              enonce:"FDR = 150 000 DT ; BFR = 175 000 DT.\nCalculer la trésorerie nette et commenter.",
              correction:"TN = FDR − BFR = 150 000 − 175 000 = −25 000 DT (négative).\n→ Le FDR ne couvre pas entièrement le BFR : l'entreprise doit recourir à des financements de trésorerie à court terme (découvert), signe d'un léger déséquilibre." },
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
export default function GestionSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'evaluation-consolidation'
  const chapter = ALL_CHAPTERS[slug] as any
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop:80, textAlign:'center', padding:'120px 20px' }}>
          <h1>Chapitre introuvable</h1>
          <Link href="/bac/gestion/eco-gestion" style={{ color:'#f43f5e' }}>← Retour Section Éco-Gestion</Link>
        </main>
        <Footer />
      </>
    )
  }

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#f43f5e'

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Bac</Link><span>›</span>
          <Link href="/bac/gestion" style={{ color:'var(--muted)', textDecoration:'none' }}>Gestion</Link><span>›</span>
          <Link href="/bac/gestion/eco-gestion" style={{ color:'var(--muted)', textDecoration:'none' }}>Sc. Éco & Gestion</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{chapter.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 270px', gap:32, alignItems:'start' }}>

            {/* ═══════════════════════════ CONTENU ═══════════════════════════ */}
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
                    background:`${secColor}14`, color:secColor, fontWeight:700 }}>{chapter.badge}</span>
                  <span style={{ fontSize:11, background:'rgba(244,63,94,0.12)',
                    color:'#fb7185', padding:'2px 9px', borderRadius:10 }}>Éco-Gestion · Tunisie</span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique '+chapter.titre+' — Gestion Bac Tunisie')}`}
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
                    📋 Exercices type Bac
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
              {chapter.souschapitres.map((sc: any, scIdx: number) => (
                <div key={sc.id} style={{ marginBottom:28,
                  background:`${secColor}05`, border:`1px solid ${secColor}20`,
                  borderRadius:18, overflow:'hidden' }}>

                  {/* En-tête sous-chapitre */}
                  <button
                    onClick={() => setOpenSc(openSc===sc.id ? null : sc.id)}
                    style={{ width:'100%', background:`${secColor}12`,
                      borderBottom:`1px solid ${secColor}20`, padding:'16px 22px',
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                      cursor:'pointer', border:'none', textAlign:'left' }}>
                    <div>
                      <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6, flexWrap:'wrap' }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                          color:secColor, fontWeight:700 }}>
                          {String(scIdx+1).padStart(2,'0')}
                        </span>
                        <h2 style={{ fontSize:16, fontWeight:800, color:'var(--text)', margin:0 }}>{sc.titre}</h2>
                      </div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                        {sc.notions.map((n: string) => (
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

                  {/* Contenu blocs */}
                  {(openSc===sc.id || scIdx===0) && (
                    <div style={{ padding:'18px 22px', display:'flex', flexDirection:'column', gap:28 }}>
                      {sc.blocs.map((bloc: any) => (
                        <div key={bloc.notion}>

                          {/* Titre notion */}
                          <div style={{ fontSize:14, fontWeight:800, color:secColor,
                            marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
                            {bloc.notion}
                          </div>

                          {/* Théorèmes / définitions */}
                          <div style={{ display:'flex', flexDirection:'column', gap:11, marginBottom:14 }}>
                            {bloc.theoremes.map((t: any) => {
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
                                    fontFamily:t.type==='indicateur'?'var(--font-mono)':'inherit' }}>
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

                          {/* Exercices */}
                          {bloc.exercices.length > 0 && (
                            <div>
                              <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                                textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>
                                Exercices
                              </div>
                              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                                {bloc.exercices.map((ex: any) => (
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
                                      <Link href={`/chat?q=${encodeURIComponent('Gestion Bac Tunisie — '+ex.enonce)}`}
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
                                      <div style={{ padding:'10px 16px',
                                        borderTop:'1px solid var(--border)',
                                        background:`${secColor}06` }}>
                                        <div style={{ fontSize:10, color:secColor,
                                          fontWeight:700, marginBottom:4 }}>✅ Correction</div>
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
                  <Link href={`/bac/gestion/eco-gestion/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[prevSlug].replace(/CH \d+ — /,'')}
                      </div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/gestion/eco-gestion/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right',
                      transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[nextSlug].replace(/CH \d+ — /,'')}
                      </div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* ═══════════════════════════ SIDEBAR ═══════════════════════════ */}
            <aside style={{ position:'sticky', top:88 }}>
              {/* Navigation chapitres */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  💼 Gestion · 6 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac/gestion/eco-gestion/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px',
                      borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1,
                        fontFamily:'var(--font-mono)' }}>
                        {TITRES_NAV[s].split(' — ')[0]}
                      </div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400,
                        color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>
                        {TITRES_NAV[s].replace(/CH \d+ — /,'')}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique '+chapter.titre+' Gestion Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/gestion/eco-gestion" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                  <Link href="/bac/gestion" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📚 Index Gestion</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){
          div[style*="grid-template-columns: 1fr 270px"]{
            grid-template-columns:1fr!important;
          }
          aside{display:none;}
        }
      `}</style>
    </>
  )
}