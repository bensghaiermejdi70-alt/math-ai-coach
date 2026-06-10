'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION — PREMIÈRE Spé SES — PAGE SLUG COMPLÈTE
// Route : /bac-france/eco-gestion/premiere/[slug]
// 9 chapitres : Économie · Sociologie · Science politique · Protection sociale
// Programme officiel MEN — Spécialité SES
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = ['marche-concurrentiel','defaillances-marche','financement-economie','monnaie','socialisation','liens-sociaux','deviance-controle-social','opinion-publique-vote','protection-sociale-risques']
const TITRES_NAV: Record<string,string> = {
  'marche-concurrentiel':       'CH.1 — Le marché concurrentiel',
  'defaillances-marche':        'CH.2 — Les défaillances du marché',
  'financement-economie':       'CH.3 — Le financement de l\'économie',
  'monnaie':                    'CH.4 — La monnaie',
  'socialisation':              'CH.5 — La socialisation',
  'liens-sociaux':              'CH.6 — Les liens sociaux',
  'deviance-controle-social':   'CH.7 — Déviance & contrôle social',
  'opinion-publique-vote':      'CH.8 — Opinion publique & vote',
  'protection-sociale-risques': 'CH.9 — Protection sociale',
}
const SEC_COLORS: Record<string,string> = {
  'marche-concurrentiel':'#10b981',
  'defaillances-marche':'#06b6d4',
  'financement-economie':'#0ea5e9',
  'monnaie':'#f59e0b',
  'socialisation':'#8b5cf6',
  'liens-sociaux':'#a855f7',
  'deviance-controle-social':'#ec4899',
  'opinion-publique-vote':'#f43f5e',
  'protection-sociale-risques':'#14b8a6',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — TOUS LES CHAPITRES PREMIÈRE
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

// ═══ CH1 — LE MARCHÉ CONCURRENTIEL ═══
'marche-concurrentiel': {
  id:'marche-concurrentiel', emoji:'💰', badge:'Économie', color:'#10b981',
  titre:'Le marché concurrentiel',
  desc:'Offre, demande, équilibre, élasticité et surplus — le fonctionnement d\'un marché en concurrence pure et parfaite.',
  souschapitres:[
    {
      id:'sc-equilibre', titre:'1.1 Offre, demande et équilibre',
      notions:['Concurrence pure et parfaite','Prix d\'équilibre','Élasticité-prix'],
      blocs:[
        {
          notion:'⚖️ L\'équilibre concurrentiel',
          theoremes:[
            { id:'D-MC1', type:'def', nom:'La concurrence pure et parfaite (CPP)',
              enonce:'Un marché est en CPP s\'il respecte 5 conditions :\n• atomicité (nombreux offreurs/demandeurs)\n• homogénéité du produit\n• libre entrée et sortie\n• transparence de l\'information\n• libre circulation des facteurs de production.' },
            { id:'P-MC2', type:'prop', nom:'La formation du prix d\'équilibre',
              enonce:'Le prix d\'équilibre égalise l\'offre et la demande.\n• Prix > équilibre → offre excédentaire → le prix baisse.\n• Prix < équilibre → demande excédentaire (pénurie) → le prix monte.' },
            { id:'F-MC3', type:'formule', nom:'Élasticité-prix de la demande',
              enonce:'e = (variation % de la quantité demandée) / (variation % du prix)\n\n• |e| > 1 : demande élastique (très sensible au prix)\n• |e| < 1 : demande inélastique (peu sensible)' },
          ],
          exercices:[
            { id:'EX-MC1', niveau:'Facile', titre:'Les conditions de la CPP',
              enonce:'Citez les 5 conditions de la concurrence pure et parfaite.',
              correction:'Atomicité, homogénéité du produit, libre entrée/sortie, transparence de l\'information, libre circulation des facteurs.' },
            { id:'EX-MC2', niveau:'Moyen', titre:'Calcul d\'élasticité',
              enonce:'Le prix d\'un bien augmente de 10 % et la quantité demandée baisse de 20 %. Calculez l\'élasticité-prix et concluez.',
              correction:'e = (−20 %)/(+10 %) = −2.\n|e| = 2 > 1 → la demande est élastique : les consommateurs sont très sensibles au prix.' },
          ],
        },
      ],
    },
    {
      id:'sc-surplus', titre:'1.2 Les surplus',
      notions:['Surplus du consommateur','Surplus du producteur'],
      blocs:[
        {
          notion:'💹 Surplus et gains à l\'échange',
          theoremes:[
            { id:'D-SU1', type:'def', nom:'Surplus du consommateur',
              enonce:'Différence entre le prix maximum qu\'un consommateur était prêt à payer et le prix effectivement payé.' },
            { id:'D-SU2', type:'def', nom:'Surplus du producteur',
              enonce:'Différence entre le prix de vente et le prix minimum auquel le producteur acceptait de vendre. Le marché concurrentiel maximise le surplus total.' },
          ],
          exercices:[
            { id:'EX-SU1', niveau:'Facile', titre:'Identifier le surplus',
              enonce:'Un consommateur était prêt à payer 50 € un bien qu\'il achète 35 €. Quel est son surplus ?',
              correction:'Surplus du consommateur = 50 − 35 = 15 €.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH2 — LES DÉFAILLANCES DU MARCHÉ ═══
'defaillances-marche': {
  id:'defaillances-marche', emoji:'⚠️', badge:'Économie', color:'#06b6d4',
  titre:'Les défaillances du marché',
  desc:'Externalités, biens publics, asymétries d\'information et intervention de l\'État pour corriger le marché.',
  souschapitres:[
    {
      id:'sc-defaillances', titre:'2.1 Les défaillances',
      notions:['Externalités','Biens publics','Asymétries d\'information'],
      blocs:[
        {
          notion:'⚠️ Quand le marché échoue',
          theoremes:[
            { id:'D-DF1', type:'def', nom:'Les externalités',
              enonce:'Une externalité est l\'effet de l\'activité d\'un agent sur le bien-être d\'autres agents, sans compensation par le marché.\n• Négative : pollution.\n• Positive : vaccination, recherche.' },
            { id:'D-DF2', type:'def', nom:'Les biens publics',
              enonce:'Un bien public est non rival (l\'usage par l\'un n\'empêche pas celui des autres) et non excluable (on ne peut empêcher quelqu\'un d\'en profiter). Ex : éclairage public, défense nationale. Le marché les sous-produit.' },
            { id:'D-DF3', type:'def', nom:'Les asymétries d\'information',
              enonce:'Situation où une partie de l\'échange détient plus d\'informations que l\'autre (ex : marché de la voiture d\'occasion → « antisélection »).' },
          ],
          exercices:[
            { id:'EX-DF1', niveau:'Facile', titre:'Externalité positive ou négative ?',
              enonce:'Classez : (a) une usine qui pollue une rivière, (b) un apiculteur dont les abeilles pollinisent les vergers voisins.',
              correction:'(a) externalité négative (coût supporté par les riverains).\n(b) externalité positive (bénéfice pour les agriculteurs voisins).' },
          ],
        },
      ],
    },
    {
      id:'sc-intervention', titre:'2.2 L\'intervention de l\'État',
      notions:['Taxe','Réglementation','Subvention','Marché de quotas'],
      blocs:[
        {
          notion:'🏛️ Corriger les défaillances',
          theoremes:[
            { id:'P-IN1', type:'prop', nom:'Internaliser les externalités',
              enonce:'L\'État peut corriger les externalités par :\n• une taxe (principe pollueur-payeur),\n• une réglementation (normes, interdictions),\n• un marché de quotas d\'émission,\n• une subvention (pour les externalités positives).' },
            { id:'M-IN2', type:'methode', nom:'La taxe pigouvienne',
              enonce:'Pour une externalité négative, fixer une taxe égale au coût externe (dommage causé à la collectivité) afin que le pollueur intègre ce coût dans sa décision.' },
          ],
          exercices:[
            { id:'EX-IN1', niveau:'Moyen', titre:'La taxe carbone',
              enonce:'Expliquez en quoi une taxe carbone permet de corriger une externalité négative.',
              correction:'La pollution est une externalité négative non payée par le pollueur. La taxe carbone « internalise » ce coût : émettre du CO₂ devient coûteux, ce qui incite à réduire les émissions (pollueur-payeur).' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH3 — LE FINANCEMENT DE L'ÉCONOMIE ═══
'financement-economie': {
  id:'financement-economie', emoji:'🏦', badge:'Économie', color:'#0ea5e9',
  titre:'Le financement de l\'économie',
  desc:'Épargne, crédit, marchés financiers — comment les agents financent leur activité.',
  souschapitres:[
    {
      id:'sc-besoins', titre:'3.1 Besoins et capacités de financement',
      notions:['Épargne','Investissement','Capacité / besoin de financement'],
      blocs:[
        {
          notion:'💶 Financer l\'activité',
          theoremes:[
            { id:'D-FI1', type:'def', nom:'Capacité / besoin de financement',
              enonce:'• Agent à capacité de financement : son épargne dépasse ses dépenses d\'investissement (souvent les ménages).\n• Agent à besoin de financement : ses investissements dépassent son épargne (souvent les entreprises, l\'État).' },
            { id:'D-FI2', type:'def', nom:'Financement interne / externe',
              enonce:'• Financement interne : autofinancement (épargne propre de l\'agent).\n• Financement externe : recours à d\'autres agents (crédit, marchés).' },
          ],
          exercices:[
            { id:'EX-FI1', niveau:'Facile', titre:'Capacité ou besoin ?',
              enonce:'Une entreprise veut investir 1 M€ mais n\'a épargné que 300 000 €. Est-elle en capacité ou en besoin de financement ?',
              correction:'En besoin de financement : ses investissements (1 M€) dépassent son épargne (0,3 M€). Elle doit recourir à un financement externe pour 700 000 €.' },
          ],
        },
      ],
    },
    {
      id:'sc-circuits', titre:'3.2 Les circuits de financement',
      notions:['Crédit bancaire','Marchés financiers','Action / Obligation'],
      blocs:[
        {
          notion:'🏦 Financement direct & indirect',
          theoremes:[
            { id:'D-CI1', type:'def', nom:'Financement indirect (intermédié)',
              enonce:'Les banques jouent le rôle d\'intermédiaire : elles collectent l\'épargne et accordent des crédits. C\'est le financement intermédié.' },
            { id:'D-CI2', type:'def', nom:'Financement direct',
              enonce:'L\'agent à besoin de financement se finance directement sur les marchés financiers en émettant des titres (actions, obligations) achetés par les agents à capacité.' },
            { id:'D-CI3', type:'def', nom:'Action / Obligation',
              enonce:'• Action : titre de propriété (part du capital) → dividende.\n• Obligation : titre de créance (prêt) → intérêt.' },
          ],
          exercices:[
            { id:'EX-CI1', niveau:'Facile', titre:'Action ou obligation ?',
              enonce:'Quel titre confère un droit de propriété sur l\'entreprise, et lequel correspond à un prêt remboursé avec intérêt ?',
              correction:'L\'action = titre de propriété (dividendes). L\'obligation = titre de créance / prêt (intérêts).' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH4 — LA MONNAIE ═══
'monnaie': {
  id:'monnaie', emoji:'🪙', badge:'Économie', color:'#f59e0b',
  titre:'La monnaie & sa création',
  desc:'Fonctions, formes, création monétaire et inflation — le rôle de la monnaie et des banques.',
  souschapitres:[
    {
      id:'sc-fonctions', titre:'4.1 Fonctions et formes de la monnaie',
      notions:['Unité de compte','Réserve de valeur','Intermédiaire des échanges','Monnaie fiduciaire / scripturale'],
      blocs:[
        {
          notion:'🪙 Les fonctions et formes',
          theoremes:[
            { id:'D-MO1', type:'def', nom:'Les 3 fonctions de la monnaie',
              enonce:'• Unité de compte : exprime la valeur des biens en une même unité.\n• Intermédiaire des échanges : évite le troc.\n• Réserve de valeur : permet d\'épargner, de différer un achat.' },
            { id:'D-MO2', type:'def', nom:'Les formes de la monnaie',
              enonce:'• Monnaie fiduciaire : pièces et billets.\n• Monnaie scripturale : dépôts à vue sur les comptes bancaires (l\'essentiel de la masse monétaire).' },
          ],
          exercices:[
            { id:'EX-MO1', niveau:'Facile', titre:'Reconnaître une fonction',
              enonce:'« Je garde 500 € sur mon compte pour un achat futur. » Quelle fonction de la monnaie est ici mobilisée ?',
              correction:'La fonction de réserve de valeur (la monnaie permet de différer la consommation).' },
          ],
        },
      ],
    },
    {
      id:'sc-creation', titre:'4.2 Création monétaire et inflation',
      notions:['Création monétaire','Banque centrale','Inflation'],
      blocs:[
        {
          notion:'🏦 Création monétaire & inflation',
          theoremes:[
            { id:'P-CR1', type:'prop', nom:'« Les crédits font les dépôts »',
              enonce:'Les banques commerciales créent de la monnaie scripturale lorsqu\'elles accordent des crédits. La monnaie est détruite quand le crédit est remboursé.' },
            { id:'D-CR2', type:'def', nom:'La banque centrale',
              enonce:'La banque centrale (BCE) supervise la création monétaire et mène la politique monétaire (taux directeurs) pour assurer la stabilité des prix (cible d\'inflation ≈ 2 %).' },
            { id:'F-CR3', type:'formule', nom:'Le taux d\'inflation',
              enonce:'Taux d\'inflation = (IPCₙ − IPCₙ₋₁) / IPCₙ₋₁ × 100\n\nL\'inflation est la hausse durable du niveau général des prix (IPC = indice des prix à la consommation).' },
          ],
          exercices:[
            { id:'EX-CR1', niveau:'Moyen', titre:'Calcul d\'inflation',
              enonce:'L\'IPC passe de 104 à 106,6 en un an. Calculez le taux d\'inflation.',
              correction:'Taux = (106,6 − 104)/104 × 100 = 2,6/104 × 100 = 2,5 %.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH5 — LA SOCIALISATION ═══
'socialisation': {
  id:'socialisation', emoji:'👥', badge:'Sociologie', color:'#8b5cf6',
  titre:'La socialisation',
  desc:'Processus, instances et diversité de la socialisation — comment l\'individu se construit socialement.',
  souschapitres:[
    {
      id:'sc-processus', titre:'5.1 Processus et instances',
      notions:['Socialisation primaire / secondaire','Normes','Valeurs','Instances'],
      blocs:[
        {
          notion:'👥 Le processus de socialisation',
          theoremes:[
            { id:'D-SC1', type:'def', nom:'Socialisation primaire / secondaire',
              enonce:'• Socialisation primaire : durant l\'enfance (famille, école) — la plus déterminante.\n• Socialisation secondaire : à l\'âge adulte (travail, conjugalité, groupes) — peut prolonger ou rompre avec la primaire.' },
            { id:'D-SC2', type:'def', nom:'Les instances de socialisation',
              enonce:'Famille, école, groupe de pairs, médias et monde du travail transmettent normes et valeurs.' },
          ],
          exercices:[
            { id:'EX-SC1', niveau:'Facile', titre:'Primaire ou secondaire ?',
              enonce:'Un adulte adopte les codes de son entreprise à son arrivée. Quelle socialisation ?',
              correction:'Socialisation secondaire (à l\'âge adulte, par le monde du travail).' },
          ],
        },
      ],
    },
    {
      id:'sc-diversite', titre:'5.2 La diversité des socialisations',
      notions:['Socialisation différenciée','Genre','Milieu social'],
      blocs:[
        {
          notion:'🔀 Une socialisation différenciée',
          theoremes:[
            { id:'P-DV1', type:'prop', nom:'Selon le genre et le milieu social',
              enonce:'La socialisation diffère selon le sexe (jeux, attentes) et selon le milieu social (langage, goûts, rapport à l\'école). Elle reproduit en partie les positions sociales.' },
          ],
          exercices:[
            { id:'EX-DV1', niveau:'Facile', titre:'Socialisation genrée',
              enonce:'Donnez un exemple de socialisation différenciée selon le genre.',
              correction:'Par exemple : offrir des jeux de construction aux garçons et des poupées aux filles, ce qui oriente les goûts et plus tard les choix d\'orientation.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH6 — LES LIENS SOCIAUX ═══
'liens-sociaux': {
  id:'liens-sociaux', emoji:'🔗', badge:'Sociologie', color:'#a855f7',
  titre:'Les liens sociaux',
  desc:'Formes, rôle et fragilisation des liens sociaux qui assurent la cohésion de la société.',
  souschapitres:[
    {
      id:'sc-formes', titre:'6.1 Formes et rôle des liens sociaux',
      notions:['Filiation','Participation','Citoyenneté','Cohésion sociale'],
      blocs:[
        {
          notion:'🔗 Les quatre liens sociaux',
          theoremes:[
            { id:'D-LS1', type:'def', nom:'Les 4 types de liens (S. Paugam)',
              enonce:'• Lien de filiation (famille).\n• Lien de participation élective (amis, conjoint, choisis).\n• Lien de participation organique (travail, rôle dans la production).\n• Lien de citoyenneté (appartenance à une nation).' },
            { id:'P-LS2', type:'prop', nom:'Le rôle des liens sociaux',
              enonce:'Les liens sociaux assurent la cohésion sociale, l\'intégration des individus et le sentiment d\'appartenance.' },
          ],
          exercices:[
            { id:'EX-LS1', niveau:'Facile', titre:'Identifier le lien',
              enonce:'À quel type de lien correspondent : (a) un emploi salarié, (b) la nationalité française ?',
              correction:'(a) lien de participation organique (travail), (b) lien de citoyenneté.' },
          ],
        },
      ],
    },
    {
      id:'sc-fragilisation', titre:'6.2 La fragilisation des liens',
      notions:['Isolement','Exclusion','Précarité','Désaffiliation'],
      blocs:[
        {
          notion:'⛓️ La fragilisation des liens',
          theoremes:[
            { id:'D-FR1', type:'def', nom:'Désaffiliation / exclusion',
              enonce:'La perte du travail et la précarité peuvent entraîner une rupture progressive des liens sociaux (désaffiliation, R. Castel) menant à l\'isolement et à l\'exclusion.' },
          ],
          exercices:[
            { id:'EX-FR1', niveau:'Facile', titre:'Cause de fragilisation',
              enonce:'Citez un facteur qui fragilise les liens de participation organique.',
              correction:'Le chômage ou la précarité de l\'emploi (perte du lien lié au travail).' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH7 — DÉVIANCE ET CONTRÔLE SOCIAL ═══
'deviance-controle-social': {
  id:'deviance-controle-social', emoji:'⚖️', badge:'Sociologie', color:'#ec4899',
  titre:'Déviance et contrôle social',
  desc:'Déviance, délinquance, explications sociologiques et formes du contrôle social.',
  souschapitres:[
    {
      id:'sc-deviance', titre:'7.1 La déviance',
      notions:['Déviance','Délinquance','Relativité des normes'],
      blocs:[
        {
          notion:'🚦 Déviance & normes',
          theoremes:[
            { id:'D-DE1', type:'def', nom:'Déviance et délinquance',
              enonce:'• Déviance : transgression d\'une norme sociale (sanctionnée par le groupe).\n• Délinquance : transgression d\'une norme juridique (sanctionnée par la loi).\nToute délinquance est déviante, mais l\'inverse est faux.' },
            { id:'P-DE2', type:'prop', nom:'La relativité de la déviance',
              enonce:'Ce qui est déviant dépend de l\'époque, de la société et du groupe : la déviance n\'est pas une propriété de l\'acte mais du regard social porté sur lui.' },
          ],
          exercices:[
            { id:'EX-DE1', niveau:'Facile', titre:'Déviance ou délinquance ?',
              enonce:'(a) Resquiller dans une file d\'attente. (b) Voler dans un magasin. Classez.',
              correction:'(a) déviance (norme sociale).\n(b) délinquance (norme juridique : vol puni par la loi).' },
          ],
        },
      ],
    },
    {
      id:'sc-controle', titre:'7.2 Explications et contrôle social',
      notions:['Anomie','Étiquetage','Contrôle formel / informel'],
      blocs:[
        {
          notion:'🔍 Expliquer et contrôler la déviance',
          theoremes:[
            { id:'D-CO1', type:'def', nom:'Anomie (Durkheim)',
              enonce:'L\'anomie est un affaiblissement ou une absence de normes claires, qui favorise les comportements déviants.' },
            { id:'D-CO2', type:'def', nom:'L\'étiquetage (H. Becker)',
              enonce:'La déviance résulte aussi du processus par lequel un groupe désigne (étiquette) certains individus comme déviants.' },
            { id:'D-CO3', type:'def', nom:'Le contrôle social',
              enonce:'• Contrôle social formel : institutions (police, justice).\n• Contrôle social informel : regard des proches, pression du groupe.' },
          ],
          exercices:[
            { id:'EX-CO1', niveau:'Moyen', titre:'Contrôle formel ou informel ?',
              enonce:'(a) Une amende pour excès de vitesse. (b) Les remarques des amis sur un comportement. Classez.',
              correction:'(a) contrôle social formel (institution = police/justice).\n(b) contrôle social informel (entourage).' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH8 — OPINION PUBLIQUE ET VOTE ═══
'opinion-publique-vote': {
  id:'opinion-publique-vote', emoji:'🗳️', badge:'Science politique', color:'#f43f5e',
  titre:'Opinion publique et vote',
  desc:'Formation de l\'opinion publique, comportements électoraux et facteurs sociaux du vote.',
  souschapitres:[
    {
      id:'sc-opinion', titre:'8.1 L\'opinion publique',
      notions:['Opinion publique','Sondages','Médias'],
      blocs:[
        {
          notion:'📣 L\'opinion publique',
          theoremes:[
            { id:'D-OP1', type:'def', nom:'L\'opinion publique',
              enonce:'Ensemble des opinions partagées par une population sur les questions publiques. Elle est mesurée par les sondages, dont les résultats doivent être interprétés avec prudence (échantillon, formulation des questions).' },
          ],
          exercices:[
            { id:'EX-OP1', niveau:'Facile', titre:'Limite des sondages',
              enonce:'Citez une limite des sondages d\'opinion.',
              correction:'Par exemple : la formulation des questions oriente les réponses, ou l\'échantillon n\'est pas parfaitement représentatif.' },
          ],
        },
      ],
    },
    {
      id:'sc-vote', titre:'8.2 Les comportements électoraux',
      notions:['Participation','Abstention','Variables lourdes'],
      blocs:[
        {
          notion:'🗳️ Le vote',
          theoremes:[
            { id:'D-VO1', type:'def', nom:'Les variables lourdes du vote',
              enonce:'Le vote est influencé par des variables sociales « lourdes » : âge, niveau de diplôme, catégorie socioprofessionnelle, sexe, religion.' },
            { id:'P-VO2', type:'prop', nom:'L\'abstention',
              enonce:'L\'abstention peut être constante (toujours s\'abstenir) ou différentielle (selon les scrutins). Elle est plus forte chez les jeunes et les moins diplômés.' },
          ],
          exercices:[
            { id:'EX-VO1', niveau:'Facile', titre:'Variables du vote',
              enonce:'Citez deux variables sociales qui influencent le vote.',
              correction:'Par exemple : la catégorie socioprofessionnelle et le niveau de diplôme (ou l\'âge, le sexe, la religion).' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH9 — PROTECTION SOCIALE ET GESTION DES RISQUES ═══
'protection-sociale-risques': {
  id:'protection-sociale-risques', emoji:'🛡️', badge:'Regards croisés', color:'#14b8a6',
  titre:'Protection sociale et gestion des risques',
  desc:'Risques sociaux, logiques d\'assurance et d\'assistance, et défis de la protection sociale.',
  souschapitres:[
    {
      id:'sc-risques', titre:'9.1 Risques sociaux et protection',
      notions:['Risques sociaux','Assurance','Assistance'],
      blocs:[
        {
          notion:'🛡️ La protection sociale',
          theoremes:[
            { id:'D-RS1', type:'def', nom:'Les risques sociaux',
              enonce:'Événements qui réduisent les ressources ou augmentent les dépenses : maladie, vieillesse, chômage, charges de famille, invalidité, accidents du travail.' },
            { id:'D-RS2', type:'def', nom:'Assurance / Assistance',
              enonce:'• Logique d\'assurance (Bismarck) : prestations financées par les cotisations, liées au travail.\n• Logique d\'assistance (Beveridge) : solidarité nationale financée par l\'impôt, sous conditions de ressources.' },
          ],
          exercices:[
            { id:'EX-RS1', niveau:'Moyen', titre:'Assurance ou assistance ?',
              enonce:'(a) Une pension de retraite financée par les cotisations. (b) le RSA versé sous conditions de ressources. Classez.',
              correction:'(a) logique d\'assurance (cotisations, Bismarck).\n(b) logique d\'assistance (solidarité, conditions de ressources, Beveridge).' },
          ],
        },
      ],
    },
    {
      id:'sc-defis', titre:'9.2 Les défis de la protection sociale',
      notions:['Financement','Vieillissement','Réformes'],
      blocs:[
        {
          notion:'⚖️ Les défis du système',
          theoremes:[
            { id:'P-DE1', type:'prop', nom:'Les défis actuels',
              enonce:'• Vieillissement de la population → hausse des dépenses de retraite et de santé.\n• Déficits des comptes sociaux.\n• Débat sur le financement (cotisations vs impôt/CSG).\n• Réformes (retraites, assurance chômage).' },
          ],
          exercices:[
            { id:'EX-DE1', niveau:'Facile', titre:'Un défi de financement',
              enonce:'Pourquoi le vieillissement de la population met-il sous tension la protection sociale ?',
              correction:'Le vieillissement augmente les dépenses (retraites, santé) alors que le nombre de cotisants par retraité diminue, ce qui creuse les déficits.' },
          ],
        },
      ],
    },
  ],
},

}

export default function EcoGestionPremiereChapPage() {
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
      <Link href="/bac-france/eco-gestion/premiere" className="btn btn-primary">← Retour Première SES</Link>
    </div>
  )

  const secColor = chapter.color
  const idx = NAV_ORDER.indexOf(slug)
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
            <Link href="/bac-france/eco-gestion/premiere" style={{ color:'var(--muted)', textDecoration:'none' }}>Première Spé SES</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header chapitre */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>CH.0{idx+1}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(79,110,247,0.15)', color:'#818cf8', fontWeight:700 }}>Première · Spé SES</span>
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
                                <Link href={`/solve?q=${encodeURIComponent('SES Première — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
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
                  <Link href={`/bac-france/eco-gestion/premiere/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/eco-gestion/premiere/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  📊 Première SES — 9 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/eco-gestion/premiere/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' en SES Première')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧮 Solveur SES</Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac-france/eco-gestion/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
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