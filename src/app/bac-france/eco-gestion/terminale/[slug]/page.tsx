'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION — TERMINALE Spé SES — PAGE SLUG COMPLÈTE
// Route : /bac-france/eco-gestion/terminale/[slug]
// 10 chapitres — Bac 2027 · Coef. 16
// Programme officiel MEN — Spécialité SES
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = ['sources-defis-croissance','commerce-international','chomage-politiques-emploi','crises-financieres','politiques-economiques-europeennes','structure-sociale','ecole-mobilite-sociale','mutations-travail-emploi','engagement-politique','justice-sociale-inegalites']
const TITRES_NAV: Record<string,string> = {
  'sources-defis-croissance':           'CH.1 — Sources & défis de la croissance',
  'commerce-international':              'CH.2 — Le commerce international',
  'chomage-politiques-emploi':          'CH.3 — Chômage & politiques de l\'emploi',
  'crises-financieres':                 'CH.4 — Les crises financières',
  'politiques-economiques-europeennes': 'CH.5 — Politiques économiques européennes',
  'structure-sociale':                  'CH.6 — Structure sociale & inégalités',
  'ecole-mobilite-sociale':             'CH.7 — École & mobilité sociale',
  'mutations-travail-emploi':           'CH.8 — Mutations du travail & de l\'emploi',
  'engagement-politique':               'CH.9 — L\'engagement politique',
  'justice-sociale-inegalites':         'CH.10 — Justice sociale & inégalités',
}
const SEC_COLORS: Record<string,string> = {
  'sources-defis-croissance':'#10b981',
  'commerce-international':'#06b6d4',
  'chomage-politiques-emploi':'#0ea5e9',
  'crises-financieres':'#f59e0b',
  'politiques-economiques-europeennes':'#6366f1',
  'structure-sociale':'#8b5cf6',
  'ecole-mobilite-sociale':'#a855f7',
  'mutations-travail-emploi':'#ec4899',
  'engagement-politique':'#f43f5e',
  'justice-sociale-inegalites':'#14b8a6',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — TOUS LES CHAPITRES TERMINALE
// ═════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string, {
  id: string; titre: string; badge: string; color: string; emoji: string; desc: string;
  souschapitres: {
    id: string; titre: string; notions: string[];
    blocs: {
      notion: string;
      theoremes: { id:string; type:string; nom:string; enonce:string }[];
      exercices: { id:string; niveau:string; titre:string; enonce:string; correction:string }[];
    }[];
  }[];
}> = {

// ═══ CH1 — SOURCES & DÉFIS DE LA CROISSANCE ═══
'sources-defis-croissance': {
  id:'sources-defis-croissance', emoji:'📈', badge:'Économie', color:'#10b981',
  titre:'Sources et défis de la croissance économique',
  desc:'Facteurs de production, progrès technique, PGF, innovation et défis environnementaux de la croissance.',
  souschapitres:[
    {
      id:'sc-sources', titre:'1.1 Les sources de la croissance',
      notions:['Facteur travail','Facteur capital','PGF','Progrès technique','Innovation'],
      blocs:[
        {
          notion:'📈 D\'où vient la croissance ?',
          theoremes:[
            { id:'F-CR1', type:'formule', nom:'Le taux de croissance',
              enonce:'Taux de croissance = (PIBₙ − PIBₙ₋₁) / PIBₙ₋₁ × 100\n\nLa croissance économique = augmentation durable de la production (PIB réel) sur longue période.' },
            { id:'D-CR2', type:'def', nom:'Croissance extensive / intensive',
              enonce:'• Croissance extensive : par l\'augmentation de la quantité de facteurs (travail, capital).\n• Croissance intensive : par l\'augmentation de l\'efficacité des facteurs → productivité globale des facteurs (PGF), liée au progrès technique.' },
            { id:'D-CR3', type:'def', nom:'Innovation & destruction créatrice (Schumpeter)',
              enonce:'Le progrès technique est endogène : il provient de la R&D, du capital humain et des innovations. La « destruction créatrice » (Schumpeter) : les innovations détruisent des activités anciennes et en créent de nouvelles.' },
          ],
          exercices:[
            { id:'EX-CR1', niveau:'Moyen', titre:'Calcul du taux de croissance',
              enonce:'Le PIB réel passe de 2 200 à 2 266 milliards €. Calculez le taux de croissance.',
              correction:'t = (2 266 − 2 200)/2 200 × 100 = 66/2200 × 100 = 3 %.' },
            { id:'EX-CR2', niveau:'Facile', titre:'Extensive ou intensive ?',
              enonce:'Une économie croît surtout grâce à des gains de productivité issus du numérique. Croissance extensive ou intensive ?',
              correction:'Croissance intensive (hausse de l\'efficacité des facteurs / PGF), pas par ajout de facteurs.' },
          ],
        },
      ],
    },
    {
      id:'sc-defis', titre:'1.2 Les défis de la croissance',
      notions:['Développement durable','Soutenabilité','Capital naturel'],
      blocs:[
        {
          notion:'🌍 Une croissance soutenable ?',
          theoremes:[
            { id:'D-DD1', type:'def', nom:'Le développement durable',
              enonce:'Développement qui répond aux besoins du présent sans compromettre ceux des générations futures. Il repose sur 4 types de capital : physique, humain, naturel et social/institutionnel.' },
            { id:'P-DD2', type:'prop', nom:'Soutenabilité faible / forte',
              enonce:'• Soutenabilité faible : les capitaux sont substituables (le capital technique peut remplacer le capital naturel).\n• Soutenabilité forte : le capital naturel est irremplaçable et doit être préservé.' },
          ],
          exercices:[
            { id:'EX-DD1', niveau:'Facile', titre:'Le capital naturel',
              enonce:'Donnez deux exemples de capital naturel menacé par la croissance.',
              correction:'Par exemple : les ressources non renouvelables (pétrole), la biodiversité, la qualité de l\'air ou de l\'eau, le climat.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH2 — LE COMMERCE INTERNATIONAL ═══
'commerce-international': {
  id:'commerce-international', emoji:'🌍', badge:'Économie', color:'#06b6d4',
  titre:'Le commerce international',
  desc:'Avantages comparatifs, dotations factorielles, libre-échange, protectionnisme et mondialisation.',
  souschapitres:[
    {
      id:'sc-fondements', titre:'2.1 Les fondements de l\'échange',
      notions:['Avantage comparatif','Dotations factorielles','Commerce intra-branche'],
      blocs:[
        {
          notion:'🌍 Pourquoi les pays commercent-ils ?',
          theoremes:[
            { id:'D-CI1', type:'def', nom:'L\'avantage comparatif (Ricardo)',
              enonce:'Un pays a intérêt à se spécialiser dans la production pour laquelle il est relativement le plus efficace (ou le moins inefficace), même s\'il n\'a aucun avantage absolu.' },
            { id:'D-CI2', type:'def', nom:'Les dotations factorielles (HOS)',
              enonce:'Selon le modèle HOS, un pays exporte les biens qui utilisent intensément le facteur dont il est le mieux doté (travail, capital, ressources naturelles).' },
            { id:'D-CI3', type:'def', nom:'Le commerce intra-branche',
              enonce:'Échange de produits similaires mais différenciés entre pays comparables (ex : la France exporte ET importe des automobiles). Lié à la différenciation des produits.' },
          ],
          exercices:[
            { id:'EX-CI1', niveau:'Moyen', titre:'Avantage comparatif',
              enonce:'Le Portugal est plus efficace que l\'Angleterre pour le vin ET le drap, mais son avantage est plus net pour le vin. Que doit-il produire selon Ricardo ?',
              correction:'Le Portugal doit se spécialiser dans le vin (où son avantage relatif est le plus fort) et importer le drap : c\'est l\'avantage comparatif.' },
          ],
        },
      ],
    },
    {
      id:'sc-ouverture', titre:'2.2 Libre-échange et protectionnisme',
      notions:['Libre-échange','Protectionnisme','Mondialisation'],
      blocs:[
        {
          notion:'⚖️ Ouverture et protection',
          theoremes:[
            { id:'P-OU1', type:'prop', nom:'Gains et limites du libre-échange',
              enonce:'Gains : baisse des prix, plus de variété, gains de productivité, accès aux marchés.\nLimites : désindustrialisation, hausse des inégalités, dépendance, coûts environnementaux.' },
            { id:'D-OU2', type:'def', nom:'Le protectionnisme',
              enonce:'Mesures protégeant l\'économie nationale : droits de douane, quotas, normes, subventions.\nArguments : protéger une industrie naissante, l\'emploi. Risque : guerre commerciale.' },
          ],
          exercices:[
            { id:'EX-OU1', niveau:'Facile', titre:'Un instrument protectionniste',
              enonce:'Citez deux instruments du protectionnisme.',
              correction:'Par exemple : les droits de douane (taxe sur les importations) et les quotas (limites de quantités importées), ou les normes restrictives.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH3 — CHÔMAGE & POLITIQUES DE L'EMPLOI ═══
'chomage-politiques-emploi': {
  id:'chomage-politiques-emploi', emoji:'💼', badge:'Économie', color:'#0ea5e9',
  titre:'Chômage et politiques de l\'emploi',
  desc:'Mesure et types de chômage, marché du travail et politiques de lutte contre le chômage.',
  souschapitres:[
    {
      id:'sc-chomage', titre:'3.1 Comprendre le chômage',
      notions:['Chômage (BIT)','Population active','Chômage structurel / conjoncturel'],
      blocs:[
        {
          notion:'💼 Mesurer et expliquer le chômage',
          theoremes:[
            { id:'D-CH1', type:'def', nom:'Le chômage au sens du BIT',
              enonce:'Un chômeur est une personne sans emploi, disponible pour travailler et qui recherche activement un emploi.\nPopulation active = personnes en emploi + chômeurs.' },
            { id:'F-CH2', type:'formule', nom:'Le taux de chômage',
              enonce:'Taux de chômage = Nombre de chômeurs / Population active × 100' },
            { id:'D-CH3', type:'def', nom:'Les types de chômage',
              enonce:'• Conjoncturel : lié à une insuffisance de la demande (analyse keynésienne).\n• Structurel : lié aux institutions et aux inadéquations (qualifications, coût du travail).\n• Frictionnel : lié au temps de recherche entre deux emplois.' },
          ],
          exercices:[
            { id:'EX-CH1', niveau:'Moyen', titre:'Calcul du taux de chômage',
              enonce:'Population active : 30 millions, dont 2,4 millions de chômeurs. Calculez le taux de chômage.',
              correction:'Taux = 2,4 / 30 × 100 = 8 %.' },
          ],
        },
      ],
    },
    {
      id:'sc-politiques', titre:'3.2 Les politiques de l\'emploi',
      notions:['Coût du travail','Formation','Flexibilité','Soutien de la demande'],
      blocs:[
        {
          notion:'🛠️ Lutter contre le chômage',
          theoremes:[
            { id:'P-PO1', type:'prop', nom:'Les leviers des politiques de l\'emploi',
              enonce:'• Baisser le coût du travail (allègements de cotisations) → chômage structurel.\n• Former et accompagner (politiques actives) → adéquation offre/demande.\n• Flexibiliser le marché du travail.\n• Soutenir la demande globale (relance) → chômage conjoncturel.' },
          ],
          exercices:[
            { id:'EX-PO1', niveau:'Facile', titre:'Politique active ou passive ?',
              enonce:'(a) Indemnisation des chômeurs. (b) Formation des demandeurs d\'emploi. Classez.',
              correction:'(a) politique passive (indemniser).\n(b) politique active (agir sur le retour à l\'emploi).' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH4 — LES CRISES FINANCIÈRES ═══
'crises-financieres': {
  id:'crises-financieres', emoji:'📉', badge:'Économie', color:'#f59e0b',
  titre:'Les crises financières',
  desc:'Bulles spéculatives, aléa moral, risque systémique et régulation du système financier.',
  souschapitres:[
    {
      id:'sc-mecanismes', titre:'4.1 Les mécanismes des crises',
      notions:['Bulle spéculative','Aléa moral','Risque systémique'],
      blocs:[
        {
          notion:'📉 Comment naît une crise financière ?',
          theoremes:[
            { id:'D-CF1', type:'def', nom:'La bulle spéculative',
              enonce:'Hausse auto-entretenue du prix d\'un actif (immobilier, actions) déconnectée de sa valeur réelle, alimentée par l\'anticipation de gains. Son éclatement provoque un krach.' },
            { id:'D-CF2', type:'def', nom:'L\'aléa moral',
              enonce:'Comportement de prise de risque excessive d\'un agent qui se sait protégé contre les conséquences (ex : banque comptant sur un renflouement public).' },
            { id:'D-CF3', type:'def', nom:'Le risque systémique',
              enonce:'Risque que la défaillance d\'un acteur (ou marché) se propage à l\'ensemble du système financier par effet de contagion (effet domino).' },
          ],
          exercices:[
            { id:'EX-CF1', niveau:'Facile', titre:'Reconnaître une bulle',
              enonce:'Le prix d\'un actif monte fortement car chacun anticipe une revente plus chère. De quel phénomène s\'agit-il ?',
              correction:'D\'une bulle spéculative : la hausse est auto-entretenue par les anticipations, déconnectée de la valeur réelle.' },
          ],
        },
      ],
    },
    {
      id:'sc-regulation', titre:'4.2 La régulation financière',
      notions:['Supervision','Ratios prudentiels','Prêteur en dernier ressort'],
      blocs:[
        {
          notion:'🏛️ Réguler la finance',
          theoremes:[
            { id:'P-RG1', type:'prop', nom:'Les instruments de régulation',
              enonce:'• Supervision bancaire et contrôle des acteurs.\n• Ratios prudentiels (exigences de fonds propres — Bâle III).\n• Banque centrale « prêteur en dernier ressort » pour éviter les faillites en chaîne.' },
          ],
          exercices:[
            { id:'EX-RG1', niveau:'Facile', titre:'Rôle du régulateur',
              enonce:'Pourquoi imposer aux banques des fonds propres minimaux ?',
              correction:'Pour qu\'elles puissent absorber des pertes sans faire faillite, ce qui limite le risque systémique et protège les déposants.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH5 — POLITIQUES ÉCONOMIQUES EUROPÉENNES ═══
'politiques-economiques-europeennes': {
  id:'politiques-economiques-europeennes', emoji:'🇪🇺', badge:'Économie', color:'#6366f1',
  titre:'Les politiques économiques européennes',
  desc:'Politique monétaire (BCE), politique budgétaire, policy mix et coordination dans l\'Union.',
  souschapitres:[
    {
      id:'sc-politiques', titre:'5.1 Les politiques conjoncturelles',
      notions:['Politique monétaire','Politique budgétaire','Policy mix'],
      blocs:[
        {
          notion:'🇪🇺 Réguler l\'activité économique',
          theoremes:[
            { id:'D-PE1', type:'def', nom:'La politique monétaire (BCE)',
              enonce:'Pilotée par la Banque Centrale Européenne via les taux directeurs, elle vise la stabilité des prix (cible d\'inflation ≈ 2 %). Taux bas → relance ; taux hauts → freinage de l\'inflation.' },
            { id:'D-PE2', type:'def', nom:'La politique budgétaire',
              enonce:'Usage du budget de l\'État (dépenses publiques, impôts) pour réguler l\'activité : relance (déficit) ou rigueur (réduction du déficit).' },
            { id:'D-PE3', type:'def', nom:'Le policy mix',
              enonce:'Combinaison coordonnée des politiques monétaire et budgétaire pour atteindre les objectifs économiques.' },
          ],
          exercices:[
            { id:'EX-PE1', niveau:'Facile', titre:'Monétaire ou budgétaire ?',
              enonce:'(a) La BCE baisse ses taux directeurs. (b) L\'État augmente ses dépenses publiques. Classez.',
              correction:'(a) politique monétaire (BCE, taux).\n(b) politique budgétaire (budget de l\'État).' },
          ],
        },
      ],
    },
    {
      id:'sc-cadre', titre:'5.2 Le cadre européen',
      notions:['UEM','Coordination','Règles budgétaires'],
      blocs:[
        {
          notion:'🤝 La coordination européenne',
          theoremes:[
            { id:'P-CE1', type:'prop', nom:'Une union monétaire, des budgets nationaux',
              enonce:'Dans la zone euro, la politique monétaire est unique (BCE) mais les politiques budgétaires restent nationales, encadrées par des règles (limites de déficit et de dette). D\'où la nécessité de coordonner les politiques.' },
          ],
          exercices:[
            { id:'EX-CE1', niveau:'Moyen', titre:'Pourquoi coordonner ?',
              enonce:'Pourquoi la zone euro a-t-elle besoin de coordonner les politiques budgétaires nationales ?',
              correction:'Parce que la politique monétaire est commune mais les budgets nationaux : sans coordination, les décisions d\'un pays (déficit, dette) affectent toute la zone et l\'efficacité de la politique monétaire unique.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH6 — STRUCTURE SOCIALE & INÉGALITÉS ═══
'structure-sociale': {
  id:'structure-sociale', emoji:'👥', badge:'Sociologie', color:'#8b5cf6',
  titre:'La structure sociale et les inégalités',
  desc:'Classes sociales (Marx, Weber), CSP, stratification et multidimensionnalité des inégalités.',
  souschapitres:[
    {
      id:'sc-structure', titre:'6.1 Analyser la structure sociale',
      notions:['Classes sociales','CSP','Stratification','Inégalités'],
      blocs:[
        {
          notion:'👥 Comment décrire la société ?',
          theoremes:[
            { id:'D-SS1', type:'def', nom:'Les classes sociales (Marx / Weber)',
              enonce:'• Marx : les classes se définissent par le rapport aux moyens de production (bourgeoisie / prolétariat) → rapport conflictuel.\n• Weber : analyse multidimensionnelle (ordre économique = classe, ordre social = statut, ordre politique = parti).' },
            { id:'D-SS2', type:'def', nom:'Les CSP',
              enonce:'Les catégories socioprofessionnelles (nomenclature INSEE) permettent de classer la population selon la profession, le statut et la qualification.' },
            { id:'P-SS3', type:'prop', nom:'Des inégalités multiformes et cumulatives',
              enonce:'Les inégalités sont économiques (revenu, patrimoine) et sociales (diplôme, santé, genre, espérance de vie). Elles se cumulent souvent (cumul des désavantages).' },
          ],
          exercices:[
            { id:'EX-SS1', niveau:'Moyen', titre:'Marx vs Weber',
              enonce:'En quoi l\'analyse de Weber se distingue-t-elle de celle de Marx sur les classes ?',
              correction:'Marx définit les classes par un seul critère (rapport aux moyens de production) et insiste sur le conflit. Weber ajoute d\'autres dimensions (statut social, pouvoir politique) : la hiérarchie sociale est multidimensionnelle.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH7 — ÉCOLE & MOBILITÉ SOCIALE ═══
'ecole-mobilite-sociale': {
  id:'ecole-mobilite-sociale', emoji:'🎓', badge:'Sociologie', color:'#a855f7',
  titre:'École et mobilité sociale',
  desc:'Mobilité sociale, tables de mobilité, capital culturel, reproduction et démocratisation scolaire.',
  souschapitres:[
    {
      id:'sc-mobilite', titre:'7.1 La mobilité sociale',
      notions:['Mobilité sociale','Table de mobilité','Fluidité sociale'],
      blocs:[
        {
          notion:'🎓 Mesurer la mobilité sociale',
          theoremes:[
            { id:'D-MB1', type:'def', nom:'La mobilité sociale',
              enonce:'Changement de position sociale d\'un individu, le plus souvent entre générations (mobilité intergénérationnelle), comparant sa CSP à celle de son père/parent.' },
            { id:'M-MB2', type:'methode', nom:'Lire une table de mobilité',
              enonce:'Une table de mobilité croise la CSP d\'origine (parents) et la CSP d\'arrivée (enfants).\n• Diagonale = reproduction (immobilité).\n• Hors diagonale = mobilité ascendante ou descendante.\nLire une cellule : « X % des fils de [origine] sont devenus [arrivée] ».' },
            { id:'D-MB3', type:'def', nom:'Mobilité brute / fluidité',
              enonce:'• Mobilité brute (observée) : inclut l\'effet des changements de structure des emplois.\n• Fluidité sociale : mesure l\'égalité des chances réelle, indépendamment de l\'évolution des emplois.' },
          ],
          exercices:[
            { id:'EX-MB1', niveau:'Moyen', titre:'Lecture d\'une table de mobilité',
              enonce:'Dans une table de destinée, la cellule « cadres → cadres » vaut 52 %. Interprétez.',
              correction:'52 % des fils de cadres sont eux-mêmes devenus cadres : c\'est de la reproduction sociale (forte immobilité au sommet).' },
          ],
        },
      ],
    },
    {
      id:'sc-ecole', titre:'7.2 École et reproduction',
      notions:['Capital culturel','Reproduction','Démocratisation'],
      blocs:[
        {
          notion:'📚 Le rôle de l\'école',
          theoremes:[
            { id:'D-EC1', type:'def', nom:'Le capital culturel (Bourdieu)',
              enonce:'Ensemble des ressources culturelles (langage, savoirs, codes) transmises par la famille. Inégalement réparti, il avantage les enfants des milieux favorisés et contribue à la reproduction sociale.' },
            { id:'P-EC2', type:'prop', nom:'Massification ≠ démocratisation',
              enonce:'La massification scolaire (plus d\'élèves accèdent à des niveaux élevés) ne signifie pas démocratisation (égalité des chances) : les inégalités peuvent se déplacer vers les filières les plus valorisées.' },
          ],
          exercices:[
            { id:'EX-EC1', niveau:'Facile', titre:'Le capital culturel',
              enonce:'Donnez un exemple de capital culturel qui favorise la réussite scolaire.',
              correction:'Par exemple : la maîtrise du langage soutenu, l\'habitude de lire à la maison, l\'aide des parents diplômés, la familiarité avec les codes de l\'école.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH8 — MUTATIONS DU TRAVAIL & DE L'EMPLOI ═══
'mutations-travail-emploi': {
  id:'mutations-travail-emploi', emoji:'🛠️', badge:'Sociologie', color:'#ec4899',
  titre:'Mutations du travail et de l\'emploi',
  desc:'Organisation du travail, précarité, numérisation et rôle intégrateur du travail.',
  souschapitres:[
    {
      id:'sc-mutations', titre:'8.1 Le travail change',
      notions:['Taylorisme','Précarité','Numérisation','Télétravail'],
      blocs:[
        {
          notion:'🛠️ Les transformations du travail',
          theoremes:[
            { id:'D-MT1', type:'def', nom:'L\'organisation du travail',
              enonce:'Du taylorisme/fordisme (travail parcellisé, à la chaîne) vers le post-taylorisme (autonomie, polyvalence, flexibilité, management participatif).' },
            { id:'D-MT2', type:'def', nom:'Polarisation et précarité',
              enonce:'Hausse des emplois atypiques (CDD, intérim, temps partiel) et polarisation des qualifications (emplois très qualifiés / peu qualifiés), au détriment des emplois intermédiaires.' },
            { id:'P-MT3', type:'prop', nom:'Numérisation et nouvelles formes d\'emploi',
              enonce:'Le numérique transforme les métiers, développe le télétravail et de nouvelles formes d\'emploi (travail de plateforme, auto-entrepreneuriat).' },
          ],
          exercices:[
            { id:'EX-MT1', niveau:'Facile', titre:'Emploi atypique',
              enonce:'Citez deux exemples de formes particulières (atypiques) d\'emploi.',
              correction:'Par exemple : le CDD, l\'intérim, le temps partiel subi, le travail de plateforme.' },
          ],
        },
      ],
    },
    {
      id:'sc-integration', titre:'8.2 Travail et intégration sociale',
      notions:['Intégration','Lien social','Chômage'],
      blocs:[
        {
          notion:'🤝 Le travail comme intégrateur',
          theoremes:[
            { id:'P-IN1', type:'prop', nom:'Le travail intègre',
              enonce:'Le travail procure un revenu, une identité sociale et des liens sociaux (collègues). Sa fragilisation (chômage, précarité) affaiblit l\'intégration sociale.' },
          ],
          exercices:[
            { id:'EX-IN1', niveau:'Facile', titre:'Travail et lien social',
              enonce:'En quoi le chômage peut-il fragiliser l\'intégration sociale ?',
              correction:'Le chômage prive de revenu, d\'identité professionnelle et de liens avec les collègues : il affaiblit les trois dimensions de l\'intégration par le travail.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH9 — L'ENGAGEMENT POLITIQUE ═══
'engagement-politique': {
  id:'engagement-politique', emoji:'🗳️', badge:'Science politique', color:'#f43f5e',
  titre:'L\'engagement politique',
  desc:'Formes de l\'engagement, paradoxe de l\'action collective et variables de la participation.',
  souschapitres:[
    {
      id:'sc-engagement', titre:'9.1 S\'engager en politique',
      notions:['Participation','Répertoires d\'action','Action collective'],
      blocs:[
        {
          notion:'🗳️ Les formes de l\'engagement',
          theoremes:[
            { id:'D-EN1', type:'def', nom:'L\'engagement politique',
              enonce:'L\'engagement politique prend des formes variées : vote, militantisme partisan ou syndical, manifestation, pétition, consommation engagée, bénévolat associatif.' },
            { id:'D-EN2', type:'def', nom:'Le paradoxe de l\'action collective (Olson)',
              enonce:'Un individu rationnel peut être tenté de profiter de l\'action collective sans y participer (« passager clandestin »). Des incitations sélectives encouragent alors l\'engagement.' },
            { id:'P-EN3', type:'prop', nom:'Les variables de l\'engagement',
              enonce:'L\'engagement varie selon l\'âge, le diplôme, la catégorie sociale et l\'appartenance générationnelle.' },
          ],
          exercices:[
            { id:'EX-EN1', niveau:'Facile', titre:'Formes d\'engagement',
              enonce:'Citez trois formes d\'engagement politique autres que le vote.',
              correction:'Par exemple : adhérer à un parti ou un syndicat, manifester, signer une pétition, s\'engager dans une association ou pratiquer une consommation engagée.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH10 — JUSTICE SOCIALE & INÉGALITÉS ═══
'justice-sociale-inegalites': {
  id:'justice-sociale-inegalites', emoji:'⚖️', badge:'Regards croisés', color:'#14b8a6',
  titre:'Justice sociale et inégalités',
  desc:'Égalité, équité, redistribution et action des pouvoirs publics contre les inégalités.',
  souschapitres:[
    {
      id:'sc-justice', titre:'10.1 Qu\'est-ce qu\'une société juste ?',
      notions:['Égalité','Équité','Redistribution','Discrimination'],
      blocs:[
        {
          notion:'⚖️ Justice sociale et action publique',
          theoremes:[
            { id:'D-JS1', type:'def', nom:'Égalité et équité',
              enonce:'• Égalité des droits, des chances ou des situations.\n• Équité : traiter différemment des situations différentes pour réduire les inégalités (ex : discrimination positive).' },
            { id:'D-JS2', type:'def', nom:'La redistribution',
              enonce:'• Horizontale : couvre les risques sociaux (maladie, retraite) sans condition de revenu.\n• Verticale : transfère des plus aisés vers les plus modestes (impôts progressifs, prestations).' },
            { id:'M-JS3', type:'methode', nom:'Les leviers des pouvoirs publics',
              enonce:'Pour réduire les inégalités : fiscalité progressive, prestations sociales, services publics (école, santé), lutte contre les discriminations.' },
          ],
          exercices:[
            { id:'EX-JS1', niveau:'Moyen', titre:'Égalité des chances ou des situations ?',
              enonce:'(a) Garantir à tous l\'accès gratuit à l\'école. (b) Verser un revenu minimum pour rapprocher les niveaux de vie. Classez.',
              correction:'(a) égalité des chances (mêmes points de départ).\n(b) égalité des situations (rapprocher les résultats / niveaux de vie).' },
          ],
        },
      ],
    },
  ],
},

}

export default function EcoGestionTerminaleChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [activeTab, setActiveTab] = useState<string>('')

  const currentTabId = activeTab || (chapter?.souschapitres[0]?.id ?? '')
  const currentSC = chapter?.souschapitres.find(sc => sc.id === currentTabId) || chapter?.souschapitres[0]

  if (!chapter) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>📊</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/eco-gestion/terminale" className="btn btn-primary">← Retour Terminale SES</Link>
    </div>
  )

  const secColor = chapter.color
  const idx = NAV_ORDER.indexOf(slug)
  const numCh = String(idx+1).padStart(2,'0')
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:32, paddingBottom:80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--muted)', marginBottom:24, flexWrap:'wrap' }}>
            <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/eco-gestion" style={{ color:'var(--muted)', textDecoration:'none' }}>Économie & Gestion</Link>
            <span>›</span>
            <Link href="/bac-france/eco-gestion/terminale" style={{ color:'var(--muted)', textDecoration:'none' }}>Terminale Spé SES</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header chapitre */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>CH.{numCh}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(245,158,11,0.15)', color:'#fbbf24', fontWeight:700 }}>⭐ BAC 2027 · Coef.16</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(22px,3vw,36px)', marginBottom:10 }}>
              {chapter.emoji} {chapter.titre}
            </h1>
            <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7 }}>{chapter.desc}</p>
          </div>

          {/* Onglets sous-chapitres */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:28, borderBottom:'1px solid var(--border)', paddingBottom:12 }}>
            {chapter.souschapitres.map(sc => (
              <button key={sc.id}
                onClick={() => { setActiveTab(sc.id); setOpenEx(null) }}
                style={{ padding:'7px 14px', borderRadius:10,
                  border:`1px solid ${(activeTab||chapter.souschapitres[0].id)===sc.id ? secColor : 'var(--border)'}`,
                  background: (activeTab||chapter.souschapitres[0].id)===sc.id ? `${secColor}18` : 'transparent',
                  color: (activeTab||chapter.souschapitres[0].id)===sc.id ? secColor : 'var(--muted)',
                  fontSize:12, fontWeight:(activeTab||chapter.souschapitres[0].id)===sc.id ? 800 : 500,
                  cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                {sc.titre}
              </button>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:28, alignItems:'start' }}>

            <div>
              {currentSC && (
                <>
                  <div style={{ marginBottom:20, padding:'14px 18px', background:`${secColor}0a`, border:`1px solid ${secColor}25`, borderRadius:12 }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>Sous-chapitre actif</div>
                    <div style={{ fontSize:16, fontWeight:800, color:secColor }}>{currentSC.titre}</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:8 }}>
                      {currentSC.notions.map(n => (
                        <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:14, background:`${secColor}15`, color:'var(--text2)', border:`1px solid ${secColor}20` }}>{n}</span>
                      ))}
                    </div>
                  </div>

                  {currentSC.blocs.map(bloc => (
                    <div key={bloc.notion} style={{ marginBottom:36 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:8, borderBottom:`2px solid ${secColor}20` }}>
                        <div style={{ width:3, height:22, background:secColor, borderRadius:2 }}/>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>{bloc.notion}</h2>
                      </div>

                      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:16 }}>
                        {bloc.theoremes.map(t => (
                          <div key={t.id} style={{ border:`1px solid ${C[t.type as keyof typeof C]||secColor}30`, borderLeft:`4px solid ${C[t.type as keyof typeof C]||secColor}`, borderRadius:'0 12px 12px 0', overflow:'hidden' }}>
                            <div style={{ background:`${C[t.type as keyof typeof C]||secColor}10`, padding:'9px 15px', display:'flex', gap:10, alignItems:'center' }}>
                              <span style={{ fontSize:10, fontWeight:800, color:C[t.type as keyof typeof C]||secColor, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', background:`${C[t.type as keyof typeof C]||secColor}20`, padding:'2px 8px', borderRadius:6 }}>{L[t.type]||t.type}</span>
                              <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{t.nom}</span>
                            </div>
                            <div style={{ padding:'12px 16px', background:'rgba(255,255,255,0.02)' }}>
                              <pre style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.85, margin:0, fontFamily:'var(--font-body)', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{t.enonce}</pre>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.07em' }}>📝 Exercices</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {bloc.exercices.map(ex => (
                            <div key={ex.id} style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
                              <div style={{ padding:'10px 16px', display:'flex', gap:10, alignItems:'flex-start' }}>
                                <div style={{ flexShrink:0 }}>
                                  <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--muted)' }}>{ex.id}</span>
                                  <div style={{ marginTop:2 }}>
                                    <span style={{ fontSize:9, padding:'2px 7px', borderRadius:20, fontWeight:700,
                                      background: ex.niveau==='Facile'?'rgba(16,185,129,0.15)':ex.niveau==='Difficile'?'rgba(239,68,68,0.15)':'rgba(245,158,11,0.15)',
                                      color: ex.niveau==='Facile'?'#34d399':ex.niveau==='Difficile'?'#f87171':'#fbbf24'
                                    }}>{ex.niveau}</span>
                                  </div>
                                </div>
                                <div style={{ flex:1 }}>
                                  <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{ex.titre}</div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.65 }}>{ex.enonce}</div>
                                </div>
                              </div>
                              <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>
                                <Link href={`/solve?q=${encodeURIComponent('SES Terminale — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                  🧮 Résoudre avec IA
                                </Link>
                                <button onClick={() => setOpenEx(openEx===ex.id?null:ex.id)}
                                  style={{ fontSize:11, padding:'5px 12px', borderRadius:7, border:'1px solid var(--border)', background:'transparent', color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
                                  📋 {openEx===ex.id?'Masquer':'Correction'}
                                </button>
                              </div>
                              {openEx===ex.id && (
                                <div style={{ padding:'10px 16px', borderTop:'1px solid var(--border)', background:`${secColor}06` }}>
                                  <div style={{ fontSize:10, color:secColor, fontWeight:700, marginBottom:4 }}>✅ Correction</div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75, whiteSpace:'pre-line' }}>{ex.correction}</div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/eco-gestion/terminale/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/eco-gestion/terminale/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[nextSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  📊 Terminale SES — 10 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/eco-gestion/terminale/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.{String(i+1).padStart(2,'0')}</div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' en SES Terminale')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧮 Solveur SES</Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac-france/eco-gestion/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}