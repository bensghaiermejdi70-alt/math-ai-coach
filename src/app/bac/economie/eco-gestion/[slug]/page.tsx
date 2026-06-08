'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE — SECTION SC. ÉCONOMIQUES ET GESTION / [SLUG] DÉTAIL COMPLET
// Route : /bac/economie/eco-gestion/[slug]
// Programme officiel CNP Tunisie — 4ème Économie & Gestion
// 4 parties · 9 chapitres
// ══════════════════════════════════════════════════════════════════════

const C = { def:'#06b6d4', notion:'#8b5cf6', indicateur:'#f59e0b', mecanisme:'#ec4899', exemple:'#10b981', enjeu:'#f97316' }
const L: Record<string,string> = { def:'Définition', notion:'Notion clé', indicateur:'Indicateur', mecanisme:'Mécanisme', exemple:'Exemple', enjeu:'Enjeu' }

const NAV_ORDER = [
  'croissance-economique','facteurs-croissance',
  'structure-production','modes-de-vie',
  'couts-croissance','developpement-durable',
  'echanges-internationaux','mutations-commerce','firmes-multinationales',
]

const TITRES_NAV: Record<string,string> = {
  'croissance-economique':  'CH 01 — La croissance économique',
  'facteurs-croissance':    'CH 02 — Les facteurs de la croissance',
  'structure-production':   'CH 03 — La structure de production',
  'modes-de-vie':           'CH 04 — Les modes de vie',
  'couts-croissance':       'CH 05 — Les coûts de la croissance',
  'developpement-durable':  'CH 06 — Le développement durable',
  'echanges-internationaux':'CH 07 — Les échanges internationaux',
  'mutations-commerce':     'CH 08 — Les mutations du commerce',
  'firmes-multinationales': 'CH 09 — Les firmes multinationales',
}

const SEC_COLORS: Record<string,string> = {
  'croissance-economique':'#06b6d4','facteurs-croissance':'#0ea5e9',
  'structure-production':'#8b5cf6','modes-de-vie':'#a855f7',
  'couts-croissance':'#f59e0b','developpement-durable':'#22c55e',
  'echanges-internationaux':'#ec4899','mutations-commerce':'#f43f5e','firmes-multinationales':'#14b8a6',
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
// DONNÉES — 9 CHAPITRES COMPLETS
// ══════════════════════════════════════════════════════════════════════
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ALL_CHAPTERS: Record<string, any> = {

// ─────────────────────────────────────────────────────────────────────
// CH 01 — LA CROISSANCE ÉCONOMIQUE
// ─────────────────────────────────────────────────────────────────────
'croissance-economique': {
  id:'croissance-economique', emoji:'📈', badge:'Partie I — Croissance', color:'#06b6d4',
  titre:'La croissance économique',
  desc:"Définition et mesure de la croissance (PIB, PNB, PIB réel/nominal, PPA, taux de croissance, TCAM, indices), croissance quantitative/qualitative, extensive/intensive, et l'irrégularité de la croissance (cycles, fluctuations, trend).",
  souschapitres:[
    {
      id:'sc-croi-mesure', titre:'1.1 Définition et mesure de la croissance',
      notions:['PIB / PNB','PIB nominal / réel','PPA','Taux de croissance · TCAM','Quantitative / qualitative','Extensive / intensive'],
      blocs:[
        {
          notion:'📊 Définir et mesurer la croissance',
          theoremes:[
            { id:'D-CR1', type:'def', nom:'Croissance économique',
              enonce:"Augmentation soutenue et durable, sur une longue période, de la production de biens et services d'une économie.\n\nElle se mesure par le TAUX DE VARIATION du PIB réel (en volume).\n\n→ C'est un phénomène QUANTITATIF et de LONG TERME (à distinguer de l'expansion, qui est conjoncturelle)." },
            { id:'N-CR1', type:'notion', nom:'Croissance quantitative et qualitative',
              enonce:"• QUANTITATIVE : augmentation des quantités produites (mesurée par le PIB).\n• QUALITATIVE : amélioration du bien-être et des conditions de vie (santé, éducation, environnement) → relève plutôt du DÉVELOPPEMENT.",
              remarque:"Le PIB mesure la croissance quantitative, pas le bien-être : c'est sa principale limite." },
            { id:'D-CR2', type:'def', nom:'PIB et PNB',
              enonce:"PIB (Produit Intérieur Brut) : valeur de tous les biens et services produits sur le TERRITOIRE national (résidents + non-résidents) pendant une année.\n\nPNB (Produit National Brut) : production des agents NATIONAUX (sur le territoire + à l'étranger).\nPNB = PIB + revenus reçus de l'étranger − revenus versés à l'étranger." },
            { id:'D-CR3', type:'def', nom:'PIB nominal, PIB réel et PPA',
              enonce:"• PIB NOMINAL (en valeur) : évalué aux PRIX COURANTS de l'année.\n• PIB RÉEL (en volume) : évalué aux PRIX CONSTANts d'une année de base → élimine l'effet de l'inflation.\n• PIB en PPA (Parité de Pouvoir d'Achat) : convertit le PIB pour comparer le pouvoir d'achat réel entre pays." },
            { id:'I-CR1', type:'indicateur', nom:'Taux de croissance et TCAM',
              enonce:"Taux de croissance annuel :\nt = (PIBₙ − PIBₙ₋₁) / PIBₙ₋₁ × 100\n\nTaux de croissance annuel moyen (TCAM) sur n années :\nTCAM = [ (PIBₙ / PIB₀)^(1/n) − 1 ] × 100\n\nIndice : Indice = (Valeurₙ / Valeur₀) × 100\nPIB réel = PIB nominal / déflateur × 100" },
            { id:'N-CR2', type:'notion', nom:'Croissance extensive et intensive',
              enonce:"• EXTENSIVE : obtenue par l'augmentation des QUANTITÉS de facteurs (plus de travail, plus de capital).\n• INTENSIVE : obtenue par l'amélioration de la PRODUCTIVITÉ des facteurs (progrès technique, meilleure organisation).",
              remarque:"La croissance durable repose surtout sur la croissance intensive (gains de productivité)." },
          ],
          exercices:[
            { id:'EX-CR1', niveau:'Facile', titre:'Calcul d\'un taux de croissance',
              enonce:"Le PIB réel d'un pays passe de 120 000 MD en 2022 à 126 000 MD en 2023.\nCalculer le taux de croissance du PIB en 2023.",
              correction:"t = (126 000 − 120 000) / 120 000 × 100\nt = 6 000 / 120 000 × 100 = 5 %\n→ La croissance économique a été de 5 % en 2023." },
            { id:'EX-CR2', niveau:'Moyen', titre:'Taux de croissance annuel moyen (TCAM)',
              enonce:"Le PIB réel passe de 100 (base) à 133,1 au bout de 3 ans.\nCalculer le TCAM.",
              correction:"TCAM = [ (133,1 / 100)^(1/3) − 1 ] × 100\n(1,331)^(1/3) = 1,10\nTCAM = (1,10 − 1) × 100 = 10 %\n→ Croissance moyenne de 10 % par an sur 3 ans." },
          ]
        },
      ]
    },
    {
      id:'sc-croi-irregularite', titre:'1.2 L\'irrégularité de la croissance',
      notions:['Expansion · Récession · Dépression · Reprise','Cycles économiques','Fluctuations','Trend','Crises'],
      blocs:[
        {
          notion:'📉 Cycles, fluctuations et tendance',
          theoremes:[
            { id:'D-CR4', type:'def', nom:'Le cycle économique',
              enonce:"Succession de phases qui se répètent dans le temps :\n1. EXPANSION : hausse durable de l'activité.\n2. CRISE / RÉCESSION : retournement, ralentissement de l'activité.\n3. DÉPRESSION : baisse forte et prolongée.\n4. REPRISE : redémarrage de l'activité." },
            { id:'N-CR3', type:'notion', nom:'Récession et dépression',
              enonce:"• RÉCESSION : ralentissement de la croissance (baisse du taux de croissance, souvent PIB négatif sur 2 trimestres consécutifs).\n• DÉPRESSION : baisse durable, profonde et longue de l'activité économique." },
            { id:'N-CR4', type:'notion', nom:'Fluctuations et tendance (trend)',
              enonce:"• FLUCTUATIONS : variations de l'activité à court terme autour de la tendance (conjoncture).\n• TREND : tendance de LONG terme de la croissance, une fois les fluctuations conjoncturelles éliminées." },
            { id:'E-CR1', type:'exemple', nom:'Les Trente Glorieuses',
              enonce:"1945–1975 : période de forte et régulière croissance dans les pays industrialisés (reconstruction, consommation de masse, progrès technique).\nLe choc pétrolier de 1973 marque la fin de cette période." },
          ],
          exercices:[
            { id:'EX-CR3', niveau:'Facile', titre:'Distinguer récession et dépression',
              enonce:"Expliquer la différence entre une récession et une dépression.",
              correction:"La RÉCESSION est un simple ralentissement de la croissance (le taux de croissance baisse, parfois devient négatif sur quelques trimestres). La DÉPRESSION est une baisse durable, profonde et prolongée de l'activité, beaucoup plus grave et longue qu'une récession." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 02 — LES FACTEURS DE LA CROISSANCE
// ─────────────────────────────────────────────────────────────────────
'facteurs-croissance': {
  id:'facteurs-croissance', emoji:'⚙️', badge:'Partie I — Croissance', color:'#0ea5e9',
  titre:'Les facteurs de la croissance économique',
  desc:"Le facteur travail (population active, qualification, capital humain, productivité), le facteur capital (investissement, accumulation, progrès technique) et la contribution des échanges extérieurs (ouverture, compétitivité, exportations).",
  souschapitres:[
    {
      id:'sc-fac-travail-capital', titre:'2.1 Les facteurs travail et capital',
      notions:['Population active','Productivité','Capital humain','Investissement','Progrès technique'],
      blocs:[
        {
          notion:'👷 Le facteur travail',
          theoremes:[
            { id:'D-FA1', type:'def', nom:'Population active',
              enonce:"Ensemble des personnes en âge de travailler qui occupent un emploi ou en recherchent un :\nPopulation active = Actifs occupés + Chômeurs.\n(Les inactifs : étudiants, retraités, etc. n'en font pas partie.)" },
            { id:'I-FA1', type:'indicateur', nom:'Productivité du travail',
              enonce:"Production obtenue par unité de travail :\nProductivité du travail = Production / Quantité de travail\n(par travailleur, ou par heure travaillée)\n\nUne hausse de la productivité du travail est une source majeure de croissance." },
            { id:'N-FA1', type:'notion', nom:'Qualification et capital humain',
              enonce:"CAPITAL HUMAIN : ensemble des connaissances, compétences et qualifications accumulées par les travailleurs grâce à l'éducation, la formation et l'expérience.\n\nIl améliore la productivité et l'EMPLOYABILITÉ → moteur de la croissance intensive.",
              remarque:"Investir dans l'éducation et la formation = investir dans le capital humain." },
          ],
          exercices:[
            { id:'EX-FA1', niveau:'Facile', titre:'Calcul de la productivité du travail',
              enonce:"Une entreprise produit 12 000 unités avec 40 ouvriers.\nCalculer la productivité du travail par ouvrier.",
              correction:"Productivité = Production / Nombre d'ouvriers\n= 12 000 / 40 = 300 unités par ouvrier." },
          ]
        },
        {
          notion:'🏭 Le facteur capital',
          theoremes:[
            { id:'D-FA2', type:'def', nom:'Investissement et capital fixe',
              enonce:"INVESTISSEMENT : acquisition de biens de production durables (CAPITAL FIXE : machines, bâtiments, équipements) destinés à produire d'autres biens.\n\n• Investissement de RENOUVELLEMENT : remplacer le capital usé.\n• Investissement de CAPACITÉ : augmenter la production.\n• Investissement de PRODUCTIVITÉ : moderniser pour produire plus efficacement." },
            { id:'I-FA2', type:'indicateur', nom:'Productivité du capital',
              enonce:"Productivité du capital = Production / Capital utilisé\n\nMesure l'efficacité du capital dans la production." },
            { id:'N-FA2', type:'notion', nom:'Progrès technique',
              enonce:"Ensemble des innovations qui améliorent les méthodes de production et accroissent la productivité globale des facteurs.\n\nC'est le principal moteur de la croissance INTENSIVE (Schumpeter : innovation et « destruction créatrice »)." },
          ],
          exercices:[
            { id:'EX-FA2', niveau:'Moyen', titre:'Croissance extensive ou intensive ?',
              enonce:"Une économie double sa production en embauchant deux fois plus de travailleurs, sans gain de productivité. De quel type de croissance s'agit-il ?",
              correction:"Il s'agit d'une croissance EXTENSIVE : elle provient uniquement de l'augmentation de la quantité de facteur travail, et non d'une amélioration de la productivité (qui caractériserait une croissance intensive)." },
          ]
        },
      ]
    },
    {
      id:'sc-fac-echanges', titre:'2.2 La contribution des échanges extérieurs',
      notions:['Ouverture économique','Compétitivité','Exportations','Miracle asiatique'],
      blocs:[
        {
          notion:'🌐 Ouverture et compétitivité',
          theoremes:[
            { id:'N-FA3', type:'notion', nom:'Ouverture économique',
              enonce:"Insertion croissante d'une économie dans les échanges internationaux (exportations et importations).\nElle élargit les débouchés et l'accès aux ressources." },
            { id:'D-FA3', type:'def', nom:'Compétitivité',
              enonce:"Capacité d'une économie (ou entreprise) à faire face à la concurrence sur les marchés.\n• Compétitivité-PRIX : par les coûts et les prix.\n• Compétitivité-HORS PRIX : par la qualité, l'innovation, l'image, les délais." },
            { id:'N-FA4', type:'notion', nom:'Contribution des exportations à la croissance',
              enonce:"Les EXPORTATIONS élargissent les débouchés et stimulent la production.\nLes IMPORTATIONS apportent biens d'équipement, technologies et matières premières nécessaires à la production." },
            { id:'E-FA1', type:'exemple', nom:'Le miracle asiatique',
              enonce:"Corée du Sud, Taïwan, Singapour, Hong Kong : forte croissance tirée par les exportations de produits manufacturés (stratégie d'ouverture et d'industrialisation)." },
          ],
          exercices:[
            { id:'EX-FA3', niveau:'Moyen', titre:'Compétitivité-prix vs hors-prix',
              enonce:"Donner un exemple de gain de compétitivité-prix et un exemple de compétitivité hors-prix.",
              correction:"Compétitivité-PRIX : réduire les coûts de production pour baisser les prix de vente (ex. délocalisation, gains de productivité).\nCompétitivité HORS-PRIX : améliorer la qualité, innover, soigner l'image de marque (ex. produit haut de gamme, design, service après-vente)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 03 — LA STRUCTURE DE PRODUCTION
// ─────────────────────────────────────────────────────────────────────
'structure-production': {
  id:'structure-production', emoji:'🏭', badge:'Partie II — Mutations', color:'#8b5cf6',
  titre:'Les transformations de la structure de production',
  desc:"Répartition sectorielle (primaire, secondaire, tertiaire), tertiarisation et désindustrialisation, évolution des techniques de production (mécanisation, automatisation), et concentration des entreprises (horizontale, verticale, conglomérale).",
  souschapitres:[
    {
      id:'sc-stru-secteurs', titre:'3.1 Répartition sectorielle et techniques',
      notions:['Secteurs primaire/secondaire/tertiaire','Tertiarisation','Désindustrialisation','Automatisation'],
      blocs:[
        {
          notion:'🏭 Secteurs et tertiarisation',
          theoremes:[
            { id:'D-ST1', type:'def', nom:'Les trois secteurs d\'activité',
              enonce:"• Secteur PRIMAIRE : agriculture, pêche, mines (exploitation directe de la nature).\n• Secteur SECONDAIRE : industrie, BTP (transformation des matières).\n• Secteur TERTIAIRE : services (commerce, transport, banque, santé, éducation...)." },
            { id:'N-ST1', type:'notion', nom:'Tertiarisation et désindustrialisation',
              enonce:"• TERTIARISATION : augmentation du poids du secteur tertiaire dans la production et l'emploi.\n• DÉSINDUSTRIALISATION : baisse de la part de l'industrie (secondaire) dans la production et l'emploi.",
              remarque:"Ces évolutions modifient aussi la répartition de la population active entre secteurs." },
            { id:'N-ST2', type:'notion', nom:'Évolution des techniques de production',
              enonce:"MÉCANISATION (machines) → AUTOMATISATION (machines automatiques) → PRODUCTIQUE / robotisation et INFORMATIQUE.\nLa FLEXIBILITÉ est la capacité de l'entreprise à s'adapter rapidement (production, organisation, emploi)." },
          ],
          exercices:[
            { id:'EX-ST1', niveau:'Facile', titre:'Lire une répartition sectorielle',
              enonce:"Dans un pays, le tertiaire représente 60 % des emplois en 2010 et 70 % en 2023. Que peut-on en conclure ?",
              correction:"La part du tertiaire dans l'emploi a augmenté de 10 points : il y a un phénomène de TERTIARISATION de l'économie. Cela s'accompagne souvent d'une baisse relative des secteurs primaire et secondaire." },
          ]
        },
      ]
    },
    {
      id:'sc-stru-concentration', titre:'3.2 La concentration des entreprises',
      notions:['Concentration horizontale/verticale/conglomérale','Fusion · Absorption','Oligopole'],
      blocs:[
        {
          notion:'🔗 Les formes de concentration',
          theoremes:[
            { id:'D-ST2', type:'def', nom:'Les types de concentration',
              enonce:"• HORIZONTALE : regroupement d'entreprises au MÊME stade de production (mêmes produits) → augmente la part de marché.\n• VERTICALE : regroupement de stades complémentaires (amont/aval) → maîtrise de la filière.\n• CONGLOMÉRALE : regroupement d'activités DIFFÉRENTES → diversification des risques." },
            { id:'N-ST3', type:'notion', nom:'Fusion et absorption',
              enonce:"• FUSION : deux sociétés se réunissent pour former une nouvelle société.\n• ABSORPTION : une société absorbe une autre, qui disparaît." },
            { id:'D-ST3', type:'def', nom:'Oligopole',
              enonce:"Structure de marché dominée par un PETIT NOMBRE de grandes entreprises, qui détiennent l'essentiel de l'offre." },
          ],
          exercices:[
            { id:'EX-ST2', niveau:'Moyen', titre:'Identifier le type de concentration',
              enonce:"Un constructeur automobile rachète son fournisseur de pneus. De quelle concentration s'agit-il ?",
              correction:"Il s'agit d'une concentration VERTICALE (vers l'AMONT) : l'entreprise prend le contrôle d'un stade situé en amont de sa production (la fourniture de pneus), afin de maîtriser ses approvisionnements." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 04 — LES MODES DE VIE
// ─────────────────────────────────────────────────────────────────────
'modes-de-vie': {
  id:'modes-de-vie', emoji:'🏙️', badge:'Partie II — Mutations', color:'#a855f7',
  titre:'Les transformations des modes de vie',
  desc:"Amélioration du niveau de vie (revenu, pouvoir d'achat, consommation), évolution de la structure de consommation (coefficients budgétaires, loi d'Engel) et transformations des modes de vie (urbanisation, mobilité, communication).",
  souschapitres:[
    {
      id:'sc-mode-niveau', titre:'4.1 Niveau de vie et consommation',
      notions:['Pouvoir d\'achat','Niveau de vie','Coefficient budgétaire','Loi d\'Engel'],
      blocs:[
        {
          notion:'💶 Niveau de vie et structure de consommation',
          theoremes:[
            { id:'D-MV1', type:'def', nom:'Pouvoir d\'achat et niveau de vie',
              enonce:"POUVOIR D'ACHAT : quantité de biens et services qu'un revenu permet d'acheter. Il dépend du revenu ET des prix.\n\nNIVEAU DE VIE : quantité de biens et services dont dispose une personne ou un ménage (lié au revenu réel).",
              remarque:"Si les prix augmentent plus vite que le revenu, le pouvoir d'achat BAISSE." },
            { id:'I-MV1', type:'indicateur', nom:'Coefficient budgétaire',
              enonce:"Part d'un poste de dépense dans la dépense totale :\nCb = (Dépense d'un poste / Dépense totale) × 100\n\n→ Permet d'analyser la STRUCTURE de la consommation." },
            { id:'N-MV1', type:'notion', nom:'La loi d\'Engel',
              enonce:"Quand le revenu augmente :\n• la PART de l'alimentation dans le budget DIMINUE ;\n• la part des dépenses de loisirs, santé, culture et services AUGMENTE.\n→ La structure de consommation se transforme avec le niveau de vie." },
          ],
          exercices:[
            { id:'EX-MV1', niveau:'Facile', titre:'Calcul d\'un coefficient budgétaire',
              enonce:"Un ménage dépense 1 200 DT en alimentation sur un budget total de 4 000 DT.\nCalculer le coefficient budgétaire de l'alimentation.",
              correction:"Cb = (1 200 / 4 000) × 100 = 30 %\n→ L'alimentation représente 30 % du budget du ménage." },
          ]
        },
      ]
    },
    {
      id:'sc-mode-societe', titre:'4.2 Les transformations sociales',
      notions:['Urbanisation','Métropolisation','Mobilité','Communication'],
      blocs:[
        {
          notion:'🏙️ Évolution des modes de vie',
          theoremes:[
            { id:'N-MV2', type:'notion', nom:'Urbanisation et métropolisation',
              enonce:"• URBANISATION : concentration croissante de la population dans les villes.\n• MÉTROPOLISATION : concentration des activités et des populations dans les grandes métropoles." },
            { id:'N-MV3', type:'notion', nom:'Mobilité, communication et loisirs',
              enonce:"La hausse du niveau de vie et le progrès technique transforment les modes de vie : plus de MOBILITÉ (transports), de COMMUNICATION (TIC, internet) et de LOISIRS, ainsi qu'une évolution de la structure de la FAMILLE." },
          ],
          exercices:[
            { id:'EX-MV2', niveau:'Moyen', titre:'Loi d\'Engel et structure de consommation',
              enonce:"Dans un pays, la part de l'alimentation dans le budget passe de 45 % à 25 % en 30 ans. Comment l'expliquer ?",
              correction:"Cette baisse illustre la LOI D'ENGEL : avec la hausse du niveau de vie (revenu réel), la part de l'alimentation dans le budget diminue, au profit des services, loisirs et biens durables. La structure de consommation se modifie." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 05 — LES COÛTS DE LA CROISSANCE
// ─────────────────────────────────────────────────────────────────────
'couts-croissance': {
  id:'couts-croissance', emoji:'⚠️', badge:'Partie III — Dév. durable', color:'#f59e0b',
  titre:'Les coûts de la croissance',
  desc:"Les coûts socio-économiques (chômage, pauvreté, inégalités, exclusion, précarité) et les coûts environnementaux (pollution, effet de serre, réchauffement climatique, épuisement des ressources).",
  souschapitres:[
    {
      id:'sc-cout-socio', titre:'5.1 Les coûts socio-économiques',
      notions:['Chômage','Pauvreté · Exclusion','Inégalités','Précarité'],
      blocs:[
        {
          notion:'⚠️ Les effets sociaux négatifs',
          theoremes:[
            { id:'D-CT1', type:'def', nom:'Le chômage',
              enonce:"Situation des personnes ACTIVES, sans emploi, disponibles et à la recherche d'un emploi.\nC'est un coût social majeur de la croissance lorsqu'elle ne crée pas assez d'emplois." },
            { id:'N-CT1', type:'notion', nom:'Pauvreté, exclusion et inégalités',
              enonce:"Une croissance MAL RÉPARTIE engendre :\n• PAUVRETÉ : insuffisance de ressources pour vivre dignement.\n• EXCLUSION / MARGINALISATION : mise à l'écart de la société.\n• INÉGALITÉS sociales : écarts de revenus et de patrimoine.\n• PRÉCARITÉ : instabilité de l'emploi et des conditions de vie." },
          ],
          exercices:[
            { id:'EX-CT1', niveau:'Moyen', titre:'Croissance et inégalités',
              enonce:"Pourquoi la croissance économique peut-elle s'accompagner d'une hausse des inégalités ?",
              correction:"La croissance augmente la richesse globale (PIB) mais ne garantit pas une RÉPARTITION équitable. Si les fruits de la croissance profitent surtout à une minorité (capital, hauts revenus), les inégalités de revenus et de patrimoine peuvent se creuser malgré la hausse du PIB." },
          ]
        },
      ]
    },
    {
      id:'sc-cout-environ', titre:'5.2 Les coûts environnementaux',
      notions:['Pollution','Effet de serre','Réchauffement','Épuisement des ressources'],
      blocs:[
        {
          notion:'🌫️ Les coûts écologiques',
          theoremes:[
            { id:'N-CT2', type:'notion', nom:'Pollution et réchauffement climatique',
              enonce:"La croissance et l'industrialisation génèrent :\n• POLLUTION de l'air, de l'eau et des sols ;\n• EFFET DE SERRE et RÉCHAUFFEMENT CLIMATIQUE (émissions de CO₂)." },
            { id:'N-CT3', type:'notion', nom:'Épuisement des ressources et dégradation',
              enonce:"• ÉPUISEMENT des ressources naturelles non renouvelables (pétrole, minerais).\n• DÉFORESTATION, dégradation et érosion des sols.\n→ La croissance peut compromettre les ressources des générations futures." },
          ],
          exercices:[
            { id:'EX-CT2', niveau:'Facile', titre:'Coûts environnementaux de la croissance',
              enonce:"Citer trois coûts environnementaux de la croissance économique.",
              correction:"Par exemple : (1) la pollution de l'air, de l'eau et des sols ; (2) l'effet de serre et le réchauffement climatique ; (3) l'épuisement des ressources naturelles (et/ou la déforestation, la dégradation des sols)." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 06 — LE DÉVELOPPEMENT DURABLE
// ─────────────────────────────────────────────────────────────────────
'developpement-durable': {
  id:'developpement-durable', emoji:'🌱', badge:'Partie III — Dév. durable', color:'#22c55e',
  titre:'Le développement durable',
  desc:"Notion de développement et de développement durable, ses trois composantes (économique, sociale, environnementale), équité et solidarité intergénérationnelle, et ses indicateurs (IDH, limites du PIB).",
  souschapitres:[
    {
      id:'sc-dev-notion', titre:'6.1 Notion et composantes',
      notions:['Développement','Développement durable','3 dimensions','Équité'],
      blocs:[
        {
          notion:'🌱 Définir le développement durable',
          theoremes:[
            { id:'D-DD1', type:'def', nom:'Développement',
              enonce:"Ensemble des transformations économiques, sociales et institutionnelles qui accompagnent la croissance et améliorent durablement les conditions de vie d'une population.\n→ Le développement est QUALITATIF, la croissance est QUANTITATIVE." },
            { id:'D-DD2', type:'def', nom:'Développement durable',
              enonce:"« Développement qui répond aux besoins du PRÉSENT sans compromettre la capacité des générations FUTURES à répondre aux leurs » (Rapport Brundtland, 1987).",
              remarque:"Il repose sur la SOLIDARITÉ INTERGÉNÉRATIONNELLE." },
            { id:'N-DD1', type:'notion', nom:'Les trois dimensions (les 3 piliers)',
              enonce:"Le développement durable concilie :\n• Dimension ÉCONOMIQUE (croissance efficace) ;\n• Dimension SOCIALE (équité, réduction des inégalités) ;\n• Dimension ENVIRONNEMENTALE (préservation des ressources)." },
          ],
          exercices:[
            { id:'EX-DD1', niveau:'Moyen', titre:'Croissance vs développement durable',
              enonce:"Pourquoi la croissance économique ne suffit-elle pas à assurer le développement durable ?",
              correction:"La croissance mesure seulement l'augmentation QUANTITATIVE de la production (PIB). Le développement durable exige en plus le respect de l'ÉQUITÉ sociale et de l'ENVIRONNEMENT, ainsi que la préservation des ressources pour les générations futures. Une croissance qui détruit l'environnement ou creuse les inégalités n'est donc pas durable." },
          ]
        },
      ]
    },
    {
      id:'sc-dev-indicateurs', titre:'6.2 Les indicateurs du développement',
      notions:['IDH','Espérance de vie','Limites du PIB'],
      blocs:[
        {
          notion:'📊 Mesurer le développement',
          theoremes:[
            { id:'D-DD3', type:'def', nom:'L\'IDH (Indice de Développement Humain)',
              enonce:"Indicateur COMPOSITE, compris entre 0 et 1, qui combine trois dimensions :\n• SANTÉ (espérance de vie à la naissance) ;\n• ÉDUCATION (alphabétisation et scolarisation) ;\n• NIVEAU DE VIE (revenu/PIB par habitant)." },
            { id:'I-DD1', type:'indicateur', nom:'Calcul simplifié de l\'IDH',
              enonce:"IDH = (I_santé + I_éducation + I_revenu) / 3\n\nPlus l'IDH est proche de 1, plus le niveau de développement humain est élevé." },
            { id:'N-DD2', type:'notion', nom:'Les limites du PIB',
              enonce:"Le PIB ne mesure ni le BIEN-ÊTRE, ni les INÉGALITÉS, ni la dégradation de l'ENVIRONNEMENT, ni le travail non marchand.\n→ D'où le recours à des indicateurs complémentaires comme l'IDH." },
          ],
          exercices:[
            { id:'EX-DD2', niveau:'Facile', titre:'Interpréter un IDH',
              enonce:"Le pays A a un IDH de 0,9 et le pays B un IDH de 0,5. Qu'en conclure ?",
              correction:"Le pays A (IDH = 0,9, proche de 1) a un niveau de développement humain ÉLEVÉ (bonne santé, éducation, niveau de vie). Le pays B (IDH = 0,5) a un développement humain plus FAIBLE. L'IDH étant composite, il reflète mieux le développement que le seul PIB par habitant." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 07 — LES ÉCHANGES INTERNATIONAUX
// ─────────────────────────────────────────────────────────────────────
'echanges-internationaux': {
  id:'echanges-internationaux', emoji:'🌍', badge:'Partie IV — Mondialisation', color:'#ec4899',
  titre:'Les échanges internationaux et leur évolution',
  desc:"Présentation des échanges (commerce international, flux, solde commercial) et leurs indicateurs (taux de couverture, d'ouverture, d'effort, de dépendance, termes de l'échange), libre-échange et protectionnisme.",
  souschapitres:[
    {
      id:'sc-ech-indicateurs', titre:'7.1 Présentation et indicateurs',
      notions:['Solde commercial','Taux de couverture','Taux d\'ouverture','Termes de l\'échange'],
      blocs:[
        {
          notion:'🌍 Mesurer les échanges internationaux',
          theoremes:[
            { id:'D-EC1', type:'def', nom:'Commerce international et flux',
              enonce:"COMMERCE INTERNATIONAL : ensemble des échanges de biens et services entre les pays.\n• Flux PHYSIQUES : marchandises.\n• Flux IMMATÉRIELS : services, capitaux, informations." },
            { id:'I-EC1', type:'indicateur', nom:'Solde commercial',
              enonce:"Solde commercial = Exportations (X) − Importations (M) de biens\n\n• Solde > 0 → EXCÉDENT commercial.\n• Solde < 0 → DÉFICIT commercial." },
            { id:'I-EC2', type:'indicateur', nom:'Taux de couverture',
              enonce:"Taux de couverture = (Exportations / Importations) × 100\n\n• > 100 % → les exportations couvrent les importations (excédent).\n• < 100 % → déficit commercial." },
            { id:'I-EC3', type:'indicateur', nom:'Taux d\'ouverture, d\'effort et de dépendance',
              enonce:"Taux d'ouverture = ((X + M) / 2) / PIB × 100\nTaux d'effort à l'exportation = X / PIB × 100\nTaux de dépendance = M / PIB × 100" },
            { id:'I-EC4', type:'indicateur', nom:'Termes de l\'échange',
              enonce:"Termes de l'échange = (Indice des prix à l'export / Indice des prix à l'import) × 100\n\n• En hausse → amélioration (on exporte « plus cher » par rapport aux importations)." },
          ],
          exercices:[
            { id:'EX-EC1', niveau:'Facile', titre:'Solde et taux de couverture',
              enonce:"Un pays exporte 80 000 MD et importe 100 000 MD.\nCalculer le solde commercial et le taux de couverture.",
              correction:"Solde = X − M = 80 000 − 100 000 = −20 000 MD → DÉFICIT commercial.\nTaux de couverture = (80 000 / 100 000) × 100 = 80 %\n→ Les exportations ne couvrent que 80 % des importations." },
            { id:'EX-EC2', niveau:'Moyen', titre:'Taux d\'ouverture',
              enonce:"PIB = 200 000 MD, exportations = 60 000 MD, importations = 40 000 MD.\nCalculer le taux d'ouverture.",
              correction:"Taux d'ouverture = ((X + M) / 2) / PIB × 100\n= ((60 000 + 40 000) / 2) / 200 000 × 100\n= 50 000 / 200 000 × 100 = 25 %." },
          ]
        },
      ]
    },
    {
      id:'sc-ech-essor', titre:'7.2 L\'essor des échanges',
      notions:['Libre-échange','Protectionnisme','Internationalisation'],
      blocs:[
        {
          notion:'📜 Libre-échange et protectionnisme',
          theoremes:[
            { id:'D-EC2', type:'def', nom:'Libre-échange',
              enonce:"Politique commerciale d'ABSENCE d'obstacles aux échanges entre pays (pas de droits de douane ni de barrières)." },
            { id:'D-EC3', type:'def', nom:'Protectionnisme',
              enonce:"Politique de PROTECTION du marché national contre la concurrence étrangère :\n• Droits de DOUANE (barrières tarifaires) ;\n• QUOTAS, normes, subventions (barrières non tarifaires)." },
            { id:'N-EC1', type:'notion', nom:'L\'internationalisation des économies',
              enonce:"Depuis la révolution industrielle, le commerce mondial s'est fortement développé : baisse des coûts de transport, ouverture des marchés, internationalisation puis MONDIALISATION des économies." },
          ],
          exercices:[
            { id:'EX-EC3', niveau:'Moyen', titre:'Libre-échange ou protectionnisme ?',
              enonce:"Un pays instaure des droits de douane élevés sur les voitures importées. Quelle politique applique-t-il et dans quel but ?",
              correction:"Il applique une politique PROTECTIONNISTE (barrière tarifaire). Le but est de protéger la production nationale de voitures en renchérissant les importations, afin de soutenir l'industrie et l'emploi locaux. L'inconvénient : prix plus élevés pour les consommateurs et risque de représailles." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 08 — LES MUTATIONS DU COMMERCE
// ─────────────────────────────────────────────────────────────────────
'mutations-commerce': {
  id:'mutations-commerce', emoji:'🚢', badge:'Partie IV — Mondialisation', color:'#f43f5e',
  titre:'Les mutations du commerce international',
  desc:"Évolution de la structure des échanges par produit, commerce interbranche et intrabranche, division internationale du travail (avantages comparatifs et compétitifs), et géographie des échanges (Triade, pays émergents).",
  souschapitres:[
    {
      id:'sc-mut-dit', titre:'8.1 Structure des échanges et DIT',
      notions:['Interbranche / Intrabranche','DIT','Avantage comparatif','Avantage compétitif'],
      blocs:[
        {
          notion:'🚢 Commerce et division du travail',
          theoremes:[
            { id:'N-MC1', type:'notion', nom:'Commerce interbranche et intrabranche',
              enonce:"• Commerce INTERBRANCHE : échange de produits de branches DIFFÉRENTES (ex. blé contre voitures).\n• Commerce INTRABRANCHE : échange de produits d'une MÊME branche (ex. voitures contre voitures de marques différentes)." },
            { id:'D-MC1', type:'def', nom:'Division Internationale du Travail (DIT)',
              enonce:"Répartition de la production et des SPÉCIALISATIONS entre les pays au niveau mondial : chaque pays se spécialise dans certaines productions." },
            { id:'N-MC2', type:'notion', nom:'Avantage comparatif (Ricardo)',
              enonce:"Un pays a intérêt à se SPÉCIALISER dans la production pour laquelle il dispose de l'avantage RELATIF le plus grand (où il est relativement le plus efficace), puis à échanger.\n→ Justification théorique du libre-échange." },
            { id:'N-MC3', type:'notion', nom:'Avantage compétitif',
              enonce:"Avantage CONSTRUIT par un pays ou une entreprise grâce à la technologie, l'innovation, la qualité ou l'organisation (et non donné par la nature)." },
          ],
          exercices:[
            { id:'EX-MC1', niveau:'Moyen', titre:'Interbranche vs intrabranche',
              enonce:"La France exporte des voitures vers l'Allemagne et en importe d'Allemagne. De quel type de commerce s'agit-il ?",
              correction:"Il s'agit de commerce INTRABRANCHE : les deux pays échangent des produits d'une même branche (l'automobile). Ce commerce, fréquent entre pays développés, repose sur la différenciation des produits (modèles, marques, gammes)." },
          ]
        },
      ]
    },
    {
      id:'sc-mut-geo', titre:'8.2 Géographie des échanges mondiaux',
      notions:['Triade','Pays émergents','Spécialisation'],
      blocs:[
        {
          notion:'🗺️ Les pôles du commerce mondial',
          theoremes:[
            { id:'N-MC4', type:'notion', nom:'La Triade',
              enonce:"Les trois grands pôles qui dominent le commerce mondial : AMÉRIQUE DU NORD, EUROPE (UE) et ASIE DE L'EST.\nL'essentiel des échanges se fait entre ces pôles et à l'intérieur de chacun." },
            { id:'N-MC5', type:'notion', nom:'Les pays émergents',
              enonce:"Pays à forte croissance qui s'intègrent rapidement au commerce mondial (Chine, Inde, Brésil...).\nIls modifient la géographie des échanges et la spécialisation internationale." },
          ],
          exercices:[
            { id:'EX-MC2', niveau:'Facile', titre:'La Triade',
              enonce:"Qu'appelle-t-on la « Triade » dans le commerce mondial ?",
              correction:"La Triade désigne les trois grands pôles qui dominent les échanges mondiaux : l'Amérique du Nord, l'Union européenne (Europe) et l'Asie de l'Est. Ils concentrent la majeure partie du commerce et des flux d'investissement." },
          ]
        },
      ]
    },
  ]
},

// ─────────────────────────────────────────────────────────────────────
// CH 09 — LES FIRMES MULTINATIONALES
// ─────────────────────────────────────────────────────────────────────
'firmes-multinationales': {
  id:'firmes-multinationales', emoji:'🏢', badge:'Partie IV — Mondialisation', color:'#14b8a6',
  titre:'Les firmes multinationales',
  desc:"Notion de firme multinationale (FMN), formes de filiales, échanges intrafirmes, mobiles de la multinationalisation (marchés, coûts, ressources, délocalisation) et effets sur les pays d'origine et d'accueil.",
  souschapitres:[
    {
      id:'sc-fmn-notion', titre:'9.1 Notion et mobiles de la multinationalisation',
      notions:['FMN','Filiales','Échanges intrafirmes','Délocalisation'],
      blocs:[
        {
          notion:'🏢 Qu\'est-ce qu\'une FMN ?',
          theoremes:[
            { id:'D-FM1', type:'def', nom:'Firme multinationale (FMN)',
              enonce:"Entreprise qui possède ou contrôle des unités de production (FILIALES) dans PLUSIEURS pays, à partir d'une maison mère." },
            { id:'N-FM1', type:'notion', nom:'Filiales et échanges intrafirmes',
              enonce:"• FILIALE : société contrôlée par la maison mère (détention de capital).\n• ÉCHANGES INTRAFIRMES : échanges réalisés ENTRE les unités d'une même FMN (maison mère ↔ filiales) ; ils représentent une part croissante du commerce mondial." },
            { id:'N-FM2', type:'notion', nom:'Les mobiles de la multinationalisation',
              enonce:"Une firme se multinationalise pour :\n• conquérir de nouveaux MARCHÉS (proximité de la demande) ;\n• réduire les COÛTS (main-d'œuvre, fiscalité) → DÉLOCALISATION ;\n• accéder à des RESSOURCES (matières premières, compétences)." },
          ],
          exercices:[
            { id:'EX-FM1', niveau:'Facile', titre:'Définir une FMN',
              enonce:"Qu'est-ce qu'une firme multinationale et qu'appelle-t-on une délocalisation ?",
              correction:"Une FIRME MULTINATIONALE (FMN) est une entreprise qui possède ou contrôle des unités de production (filiales) dans plusieurs pays. La DÉLOCALISATION consiste à transférer une activité de production vers un autre pays, généralement pour réduire les coûts (main-d'œuvre moins chère, fiscalité avantageuse)." },
          ]
        },
      ]
    },
    {
      id:'sc-fmn-effets', titre:'9.2 Les effets de la multinationalisation',
      notions:['Pays d\'origine','Pays d\'accueil','Transfert de technologie','Dépendance'],
      blocs:[
        {
          notion:'⚖️ Effets sur les pays',
          theoremes:[
            { id:'N-FM3', type:'notion', nom:'Effets sur le pays d\'origine',
              enonce:"• POSITIFS : rapatriement de profits, renforcement de la compétitivité, débouchés.\n• NÉGATIFS : risque de perte d'EMPLOIS (délocalisations) et de désindustrialisation." },
            { id:'N-FM4', type:'notion', nom:'Effets sur le pays d\'accueil',
              enonce:"• POSITIFS : création d'EMPLOIS, TRANSFERT DE TECHNOLOGIE, entrée de capitaux (IDE), formation.\n• NÉGATIFS : DÉPENDANCE économique, concurrence pour les entreprises locales, rapatriement des profits." },
          ],
          exercices:[
            { id:'EX-FM2', niveau:'Moyen', titre:'Effets d\'une FMN sur le pays d\'accueil',
              enonce:"Citer deux effets positifs et un effet négatif de l'implantation d'une FMN dans un pays d'accueil.",
              correction:"Effets POSITIFS (deux au choix) : création d'emplois, transfert de technologie et de savoir-faire, entrée de capitaux (investissements directs étrangers), formation de la main-d'œuvre.\nEffet NÉGATIF : dépendance économique vis-à-vis de la FMN (et/ou concurrence qui fragilise les entreprises locales, rapatriement des profits vers le pays d'origine)." },
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
export default function EconomieSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'croissance-economique'
  const chapter = ALL_CHAPTERS[slug] as any
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [openSc, setOpenSc] = useState<string|null>(null)

  if (!chapter) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop:80, textAlign:'center', padding:'120px 20px' }}>
          <h1>Chapitre introuvable</h1>
          <Link href="/bac/economie/eco-gestion" style={{ color:'#06b6d4' }}>← Retour Section Éco-Gestion</Link>
        </main>
        <Footer />
      </>
    )
  }

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#06b6d4'

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Bac</Link><span>›</span>
          <Link href="/bac/economie" style={{ color:'var(--muted)', textDecoration:'none' }}>Économie</Link><span>›</span>
          <Link href="/bac/economie/eco-gestion" style={{ color:'var(--muted)', textDecoration:'none' }}>Sc. Éco & Gestion</Link><span>›</span>
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
                  <span style={{ fontSize:11, background:'rgba(6,182,212,0.12)',
                    color:'#22d3ee', padding:'2px 9px', borderRadius:10 }}>Éco-Gestion · Tunisie</span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:10 }}>{chapter.titre}</h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:620, marginBottom:18 }}>{chapter.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique '+chapter.titre+' — Économie Bac Tunisie')}`}
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
                                      <Link href={`/chat?q=${encodeURIComponent('Économie Bac Tunisie — '+ex.enonce)}`}
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
                  <Link href={`/bac/economie/eco-gestion/${prevSlug}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/bac/economie/eco-gestion/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  📈 Économie · 9 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac/economie/eco-gestion/${s}`} style={{ textDecoration:'none' }}>
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
                  <Link href={`/chat?q=${encodeURIComponent('Explique '+chapter.titre+' Économie Bac Tunisie')}`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/examens" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📋 Exercice type Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/economie/eco-gestion" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
                  <Link href="/bac/economie" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📚 Index Économie</Link>
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