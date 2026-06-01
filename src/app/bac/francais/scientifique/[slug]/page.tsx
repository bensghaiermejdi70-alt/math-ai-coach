'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ════════════════════════════════════════════════════════════════════
// FRANÇAIS — SECTIONS SCIENTIFIQUES / [SLUG]
// Route : /bac/francais/scientifique/[slug]
// Programme officiel MEN Tunisie · Sections Scientifiques · 8 modules
// ════════════════════════════════════════════════════════════════════

const C = { thm: '#ec4899', def: '#f472b6', formule: '#d97706', prop: '#8b5cf6', methode: '#0891b2', loi: '#dc2626' }
const L: Record<string,string> = { thm: 'Thème', def: 'Définition', formule: 'Axe clé', prop: 'Propriété', methode: 'Méthode', loi: 'Auteur' }

const NAV_ORDER = [
  'science-progres', 'homme-nature', 'communication-medias', 'tolerance-humanisme',
  'litterature-engagee', 'poesie-scientifique', 'langue-expression-scientifique', 'production-ecrite-scientifique',
]

const TITRES_NAV: Record<string,string> = {
  'science-progres':                    'M01 — Science et Progrès',
  'homme-nature':                       'M02 — L\'Homme et la Nature',
  'communication-medias':               'M03 — Communication et Médias',
  'tolerance-humanisme':                'M04 — Tolérance et Humanisme',
  'litterature-engagee':                'M05 — La Littérature Engagée',
  'poesie-scientifique':                'M06 — La Poésie',
  'langue-expression-scientifique':     'M07 — Langue & Expression',
  'production-ecrite-scientifique':     'M08 — Production Écrite',
}

const SEC_COLORS: Record<string,string> = {
  'science-progres':                '#8b5cf6',
  'homme-nature':                   '#059669',
  'communication-medias':           '#0891b2',
  'tolerance-humanisme':            '#d97706',
  'litterature-engagee':            '#dc2626',
  'poesie-scientifique':            '#e11d48',
  'langue-expression-scientifique': '#059669',
  'production-ecrite-scientifique': '#7c3aed',
}

type Bloc = { notion: string; theoremes: { id: string; type: string; nom: string; enonce: string; remarque?: string }[]; exercices: { id: string; niveau: string; titre: string; enonce: string; correction: string }[] }
type SC   = { id: string; titre: string; notions: string[]; blocs: Bloc[] }
type Chap = { id: string; titre: string; tag: string; color: string; emoji: string; desc: string; souschapitres: SC[] }

// ════════════════════════════════════════════════════════════════════
// Modules Scientifiques — Programme MEN Tunisie
// ════════════════════════════════════════════════════════════════════

const ALL_MODULES: Record<string, Chap> = {

'science-progres': {
  id: 'science-progres', emoji: '🔭', tag: 'Scientifiques', color: '#8b5cf6',
  titre: 'Science et Progrès',
  desc: 'Le développement scientifique et technologique transforme profondément la société. Ce module explore les bienfaits du progrès mais aussi ses dangers, et interroge notre rapport à la science et à la modernité.',
  souschapitres: [
    {
      id: 'sc-sp-axes', titre: "1.1 Axes d'argumentation",
      notions: ['Développement scientifique', 'Technologie', 'Impact des découvertes', 'Progrès et dangers'],
      blocs: [
        {
          notion: '🔭 Axes principaux',
          theoremes: [
            { id: 'A-SP1', type: 'formule', nom: 'La science améliore les conditions de vie',
              enonce: "ARGUMENT CENTRAL :\nLe progrès scientifique a radicalement amélioré la vie humaine.\n\nDÉVELOPPEMENT :\n• Médecine : vaccins, antibiotiques, chirurgie — allongement de l'espérance de vie\n• Transports : avion, train, voiture — réduction des distances\n• Communication : Internet, téléphone — connexion mondiale instantanée\n• Agriculture : techniques modernes — lutte contre la faim\n\nEXEMPLES :\n• La vaccination a éradiqué la variole (OMS, 1980)\n• Internet permet l'accès au savoir pour des milliards de personnes\n• L'énergie solaire offre une alternative aux énergies fossiles\n\nCITATION (Albert Jacquard) :\n« La science ne peut être jugée que par ses effets sur la vie humaine. »",
              remarque: "Jacquard est un auteur clé de ce module. Citer son nom + son idée." },
            { id: 'A-SP2', type: 'formule', nom: 'Le progrès peut aussi créer des dangers',
              enonce: "ARGUMENT NUANCÉ — CONTRE :\n\nDANGERS DU PROGRÈS INCONTRÔLÉ :\n• Armement : bombes atomiques, armes chimiques — menace de destruction massive\n• Environnement : industrialisation → pollution, réchauffement climatique\n• Social : automatisation → chômage de masse\n• Éthique : biotechnologies → manipulation génétique, clonage\n\nCITATION DE RABELAIS (16ème s.) :\n« Science sans conscience n'est que ruine de l'âme. »\n\nSYNTHÈSE POSSIBLE :\nLe progrès est un outil. Ce qui compte, c'est l'usage que l'humanité en fait. La science doit être guidée par des valeurs éthiques." },
            { id: 'A-SP3', type: 'loi', nom: 'Albert Jacquard (1925-2013)',
              enonce: "PRÉSENTATION :\nGénéticien et humaniste français, auteur de nombreux essais de vulgarisation scientifique.\n\nIDÉES CLÉES :\n• La science ne vaut que si elle est mise au service de l'homme\n• L'intelligence humaine est une intelligence collective et partagée\n• Le progrès doit réduire les inégalités, pas les creuser\n\nŒUVRES UTILES :\n• « Éloge de la différence » (1978)\n• « J'accuse l'économie triomphante » (1995)\n• « Mon utopie » (2006)\n\nCITATION :\n« L'objectif de notre existence n'est pas d'être efficaces, mais d'être humains. »" },
          ],
          exercices: [
            { id: 'EX-SP1', niveau: 'Moyen', titre: 'Sujet de réflexion — Science et progrès',
              enonce: "Sujet : « Le progrès scientifique est-il toujours synonyme de bonheur pour l'humanité ? » Répondez en développant un essai argumentatif d'une vingtaine de lignes.",
              correction: "PLAN :\n\nINTRODUCTION : Définir le progrès scientifique. Problématique : le progrès garantit-il le bonheur ?\n\nI. Le progrès améliore indéniablement les conditions de vie :\n- Médecine : allongement de l'espérance de vie, éradication des maladies\n- Communication : connexion mondiale, accès au savoir\n- Confort matériel : électricité, eau courante, transports\nCitation : Jacquard\n\nII. Le progrès engendre aussi des dangers et de nouvelles souffrances :\n- Armes de destruction massive (bombe atomique, guerres modernes)\n- Crise environnementale : pollution, réchauffement climatique\n- Aliénation humaine : dépendance aux machines, isolement social\nCitation : Rabelais\n\nIII. Synthèse : le progrès est un outil à orienter éthiquement :\n- Le progrès n'est pas bon ou mauvais en soi\n- C'est l'usage humain qui détermine ses effets\n- Besoin d'une éthique scientifique et d'une réglementation internationale\n\nCONCLUSION : Le progrès ne garantit pas automatiquement le bonheur. Il doit être guidé par des valeurs humanistes pour servir l'ensemble de l'humanité." },
          ],
        },
      ],
    },
  ],
},

'homme-nature': {
  id: 'homme-nature', emoji: '🌿', tag: 'Scientifiques', color: '#059669',
  titre: "L'Homme et la Nature",
  desc: "La relation entre l'homme et son environnement naturel est au cœur des préoccupations contemporaines. Ce module explore les textes qui dénoncent la destruction de l'environnement et proposent un développement plus durable.",
  souschapitres: [
    {
      id: 'sc-hn-axes', titre: "2.1 Axes d'argumentation",
      notions: ['Environnement', 'Pollution', 'Développement durable', 'Écologie', 'Homme-nature'],
      blocs: [
        {
          notion: "🌿 L'homme face à la nature",
          theoremes: [
            { id: 'A-HN1', type: 'formule', nom: "L'homme détruit son environnement",
              enonce: "ARGUMENT — CONSTAT ALARMANT :\n\nDOMMAGES CAUSÉS PAR L'HOMME :\n• Déforestation : 10 millions d'hectares de forêts perdus chaque année\n• Pollution : plastiques dans les océans, pesticides dans les sols\n• Changement climatique : CO₂ → réchauffement global → fonte des glaces\n• Extinction d'espèces : 150 à 200 espèces disparaissent chaque jour\n\nEXEMPLES :\n• Amazonie : poumon vert de la planète en danger\n• Mer de plastique dans le Pacifique (2 fois la France)\n• Fonte des glaciers alpins et arctiques\n\nCITATION (Nicolas Hulot) :\n« La nature n'a pas besoin de nous, mais nous avons besoin d'elle. »" },
            { id: 'A-HN2', type: 'formule', nom: 'Le développement durable est nécessaire',
              enonce: "ARGUMENT — SOLUTION :\nUn développement qui répond aux besoins du présent sans compromettre ceux des générations futures (Rapport Brundtland, 1987).\n\n3 PILIERS DU DÉVELOPPEMENT DURABLE :\n• Économique : production efficace et rentable\n• Social : équité et bien-être pour tous\n• Environnemental : préservation des ressources naturelles\n\nEXEMPLES :\n• Énergies renouvelables (solaire, éolien)\n• Agriculture biologique et circuits courts\n• Économie circulaire (réduire, réutiliser, recycler)\n\nCITATION (Jean Giono) :\n« On n'habite pas un pays, on habite une langue. » — Giono est aussi l'auteur de « L'Homme qui plantait des arbres »" },
            { id: 'A-HN3', type: 'loi', nom: "Jean Giono — « L'Homme qui plantait des arbres » (1953)",
              enonce: "RÉSUMÉ DE L'ŒUVRE :\nUn berger solitaire, Elzéard Bouffier, plante des arbres pendant des décennies dans une région désertique de Provence. Grâce à sa persévérance, il redonne vie à toute une région.\n\nMESSAGE DE L'ŒUVRE :\n• Un seul homme peut changer son environnement par sa volonté et sa constance\n• La nature peut être restaurée si on lui en donne les moyens\n• L'harmonie avec la nature est possible\n\nAXES D'ARGUMENTATION TIRÉS DE L'ŒUVRE :\n• L'action individuelle a un impact collectif sur l'environnement\n• La patience et la persévérance peuvent régénérer un écosystème détruit\n• L'homme a la capacité de réparer les dommages causés à la nature" },
          ],
          exercices: [
            { id: 'EX-HN1', niveau: 'Moyen', titre: 'Essai — Homme et nature',
              enonce: "Sujet : « L'homme moderne a-t-il perdu le sens de la nature ? » Développez votre point de vue en vous appuyant sur des exemples et des auteurs précis.",
              correction: "PLAN :\n\nINTRODUCTION : Constater l'urbanisation croissante et l'éloignement de la nature. Problématique : l'homme a-t-il vraiment perdu le contact avec la nature ?\n\nI. L'homme moderne s'est éloigné de la nature :\n- Urbanisation : 55% de la population mondiale vit en ville\n- Technologie : l'écran remplace le paysage\n- Pollution et destruction inconscientes des écosystèmes\n\nII. L'homme reste profondément lié à la nature :\n- Le tourisme vert, la randonnée, les jardins potagers en ville\n- Le succès des mouvements écologiques (Greta Thunberg, Nicolas Hulot)\n- L'agriculture biologique comme retour aux sources\n\nIII. La nature comme ressource vitale et spirituelle :\n- Giono : la nature régénère l'homme\n- Les recherches sur la sylvothérapie (bain de forêt)\n- La crise environnementale nous force à reconsidérer notre rapport à la nature\n\nCONCLUSION : L'homme a souvent oublié la nature, mais les crises environnementales actuelles le poussent à la reconnecter. Ce retour est non seulement nécessaire mais urgent." },
          ],
        },
      ],
    },
  ],
},

'communication-medias': {
  id: 'communication-medias', emoji: '📡', tag: 'Scientifiques', color: '#0891b2',
  titre: 'Communication et Médias',
  desc: "Les médias modernes et Internet ont révolutionné la communication humaine. Ce module explore leur impact sur la société, les risques des réseaux sociaux et la question de la manipulation de l'information.",
  souschapitres: [
    {
      id: 'sc-cm-axes', titre: "3.1 Axes d'argumentation",
      notions: ['Internet', 'Réseaux sociaux', 'Fake news', 'Médias', 'Information'],
      blocs: [
        {
          notion: '📡 Les médias modernes',
          theoremes: [
            { id: 'A-CM1', type: 'formule', nom: "Internet facilite l'accès au savoir",
              enonce: "ARGUMENT POUR :\nInternet est la plus grande bibliothèque de l'histoire de l'humanité.\n\nBIENFAITS D'INTERNET :\n• Accès gratuit à des millions de livres, cours et ressources (Wikipedia, Coursera)\n• Communication instantanée à travers le monde\n• Démocratisation de l'information et du savoir\n• Outils de travail collaboratif à distance\n\nEXEMPLES :\n• Les MOOC (cours en ligne ouverts) offrent une éducation gratuite mondiale\n• Les réseaux de solidarité en ligne lors des catastrophes naturelles\n• La prise de parole des opprimés grâce aux réseaux sociaux (Printemps arabe)" },
            { id: 'A-CM2', type: 'formule', nom: 'Les réseaux sociaux peuvent manipuler',
              enonce: "ARGUMENT CONTRE — LES DANGERS :\n\nMANIPULATIONS ET DÉRIVES :\n• Fake news : informations fausses diffusées à grande vitesse\n• Bulle de filtre : les algorithmes ne montrent que ce qui confirme nos opinions\n• Cyberharcèlement et atteintes à la vie privée\n• Addiction aux écrans : perte de lien social réel\n• Influence politique : manipulation des élections\n\nEXEMPLE :\n• L'affaire Cambridge Analytica (2018) : exploitation de données Facebook pour influencer des élections\n• Les fake news sur la vaccination (anti-vax)\n\nCITATION (Umberto Eco) :\n« Les réseaux sociaux ont donné le droit de parole à des légions d'imbéciles. »" },
          ],
          exercices: [
            { id: 'EX-CM1', niveau: 'Moyen', titre: "Sujet de réflexion — Les réseaux sociaux",
              enonce: "Sujet : « Les réseaux sociaux sont-ils un progrès ou un danger pour la société ? » Développez un essai argumentatif en vous appuyant sur des exemples précis.",
              correction: "PLAN DIALECTIQUE :\n\nI. Les réseaux sociaux : un progrès indéniable :\n- Connexion mondiale : familles séparées, communautés diasporiques\n- Liberté d'expression et prise de parole des minorités\n- Outil de mobilisation sociale (Printemps arabe, #MeToo)\n- Accès à l'information en temps réel\n\nII. Les réseaux sociaux : de sérieux dangers :\n- Fake news et manipulation de l'opinion\n- Cyberharcèlement, notamment chez les adolescents\n- Addiction aux écrans et isolement social paradoxal\n- Atteinte à la vie privée (collecte de données)\n\nIII. Synthèse : des outils à réguler intelligemment :\n- Education aux médias dès l'école primaire\n- Réglementation par les États (RGPD en Europe)\n- Développement de l'esprit critique face aux informations\n\nCONCLUSION : Les réseaux sociaux ne sont ni purement bons ni purement mauvais. Leur impact dépend de l'usage que la société en fait et des régulations mises en place." },
          ],
        },
      ],
    },
  ],
},

'tolerance-humanisme': {
  id: 'tolerance-humanisme', emoji: '🕊️', tag: 'Scientifiques', color: '#d97706',
  titre: 'Tolérance et Humanisme',
  desc: "La tolérance et le respect de l'autre sont des valeurs universelles défendues par les grands penseurs humanistes. Ce module explore les textes qui prônent le dialogue interculturel et le refus du racisme.",
  souschapitres: [
    {
      id: 'sc-th-axes', titre: "4.1 Axes d'argumentation",
      notions: ['Tolérance', 'Humanisme', 'Dialogue interculturel', 'Racisme', 'Paix'],
      blocs: [
        {
          notion: '🕊️ Tolérance et humanisme',
          theoremes: [
            { id: 'A-TH1', type: 'formule', nom: 'La tolérance favorise la paix',
              enonce: "ARGUMENT CENTRAL :\nLa tolérance est la valeur fondamentale qui permet la coexistence pacifique des individus et des peuples.\n\nDÉVELOPPEMENT :\n• Accepter les différences culturelles, religieuses et idéologiques\n• Dialogue interculturel comme alternative à la violence\n• L'éducation à la tolérance dès l'enfance\n\nEXEMPLES :\n• Nelson Mandela : réconciliation en Afrique du Sud après l'apartheid\n• L'ONU et la Déclaration universelle des droits de l'homme (1948)\n• Les sociétés multiculturelles réussies (Canada, Nouvelle-Zélande)\n\nCITATION VOLTAIRE :\n« La tolérance est l'apanage de l'humanité ; nous en sommes tous pétris de faiblesses et d'erreurs : pardonnons-nous réciproquement nos sottises. »" },
            { id: 'A-TH2', type: 'loi', nom: "Voltaire — « Traité sur la tolérance » (1763)",
              enonce: "CONTEXTE : L'affaire Calas\nJean Calas, protestant, est accusé d'avoir tué son fils pour l'empêcher de se convertir au catholicisme. Il est condamné et exécuté à tort.\n\nRÉACTION DE VOLTAIRE :\nVoltaire s'engage pour réhabiliter Calas et rédige son « Traité sur la tolérance ».\n\nARGUMENTS DU TRAITÉ :\n• Le fanatisme religieux est la principale source d'intolérance\n• La raison doit triompher des préjugés religieux\n• Tous les hommes sont frères et méritent le même respect\n• Les différentes religions peuvent coexister pacifiquement\n\nCITATION :\n« C'est donc à l'humanité, à la tolérance, à la philosophie, qu'il faut attribuer la gloire d'avoir répandu les semences de la concorde. »" },
          ],
          exercices: [
            { id: 'EX-TH1', niveau: 'Moyen', titre: 'Essai — Tolérance et racisme',
              enonce: "Sujet : « La tolérance est-elle une valeur suffisante pour lutter contre le racisme ? » Développez votre point de vue en 20 lignes.",
              correction: "PLAN :\n\nI. La tolérance : une valeur indispensable dans la lutte contre le racisme :\n- Elle implique le respect de l'autre dans sa différence\n- Elle s'apprend dès l'enfance (Ben Jelloun, « Le racisme expliqué à ma fille »)\n- Elle est le fondement des sociétés démocratiques\n\nII. La tolérance seule est insuffisante :\n- Tolérer ne signifie pas comprendre ni apprécier\n- Sans éducation et connaissance, la tolérance reste superficielle\n- Les lois anti-discrimination sont aussi nécessaires\n\nIII. La tolérance doit s'accompagner d'une véritable rencontre de l'autre :\n- Connaissance mutuelle des cultures comme antidote aux préjugés\n- Voltaire : la raison et l'éducation contre le fanatisme\n- Le dialogue interculturel va au-delà de la simple tolérance\n\nCONCLUSION : La tolérance est un premier pas nécessaire mais insuffisant. La lutte contre le racisme exige une éducation active, des lois adaptées et un véritable dialogue interculturel." },
          ],
        },
      ],
    },
  ],
},

'litterature-engagee': {
  id: 'litterature-engagee', emoji: '✊', tag: 'Scientifiques', color: '#dc2626',
  titre: 'La Littérature Engagée',
  desc: "La littérature engagée place l'écrivain au service des causes justes. Hugo, Zola et Sartre illustrent comment la plume peut devenir une arme contre l'injustice et pour la défense des droits humains.",
  souschapitres: [
    {
      id: 'sc-le-axes', titre: "5.1 Axes d'argumentation",
      notions: ['Justice', 'Droits humains', "Engagement de l'écrivain", 'Liberté', 'Oppression'],
      blocs: [
        {
          notion: "✊ L'écrivain engagé",
          theoremes: [
            { id: 'A-LE1', type: 'formule', nom: "L'écrivain doit défendre les opprimés",
              enonce: "ARGUMENT PRINCIPAL :\nL'écrivain, par sa notoriété et son talent, a le devoir de défendre ceux qui n'ont pas de voix.\n\nDÉVELOPPEMENT :\n• L'écrivain dispose d'un outil puissant : la plume et le public\n• Sa renommée lui confère une tribune que le citoyen ordinaire n'a pas\n• Il a la capacité de toucher les émotions et de créer de l'empathie\n\nEXEMPLES :\n• Victor Hugo : défense des pauvres dans « Les Misérables »\n• Émile Zola : « J'accuse » pour défendre Dreyfus\n• Jean-Paul Sartre : engagement contre la guerre d'Algérie\n\nCITATION (Jean-Paul Sartre) :\n« L'écrivain est en situation dans son époque : chaque parole a des retentissements. »" },
            { id: 'A-LE2', type: 'formule', nom: 'La littérature peut changer les mentalités',
              enonce: "ARGUMENT :\nLes œuvres littéraires engagées ont réellement influencé le cours de l'histoire.\n\nMÉCANISME D'ACTION :\nLa fiction crée de l'empathie → le lecteur se met à la place des opprimés → ses valeurs évoluent → il agit différemment.\n\nEXEMPLES HISTORIQUES :\n• « Les Misérables » (Hugo) → prise de conscience des inégalités sociales en France\n• « Uncle Tom's Cabin » (Harriet Beecher Stowe) → impact sur le mouvement abolitionniste aux USA\n• « 1984 » (Orwell) → avertissement contre les totalitarismes toujours d'actualité\n\nCONCLUSION :\nMême si la littérature ne change pas le monde immédiatement, elle transforme les consciences, prépare les révolutions culturelles et garde vivante la mémoire des injustices." },
          ],
          exercices: [
            { id: 'EX-LE1', niveau: 'Difficile', titre: 'Dissertation — Rôle de l\'écrivain',
              enonce: "Sujet : « L'art doit-il nécessairement servir une cause ? » Rédigez un essai argumentatif complet en vous appuyant sur des auteurs et des œuvres précis.",
              correction: "PLAN DIALECTIQUE :\n\nI. L'art engagé : une tradition noble et efficace :\n- Zola (J'accuse), Hugo (Les Misérables), Éluard (Liberté)\n- L'art a le pouvoir de toucher le grand public et de changer les mentalités\n- La littérature engagée donne une voix aux sans-voix\n\nII. L'art pour l'art : une autre conception légitime :\n- Flaubert : l'artiste doit rester neutre pour créer librement\n- L'engagement politique peut nuire à la qualité artistique\n- L'art a une valeur esthétique intrinsèque indépendante de tout message\n\nIII. Synthèse : la liberté de l'artiste inclut le choix de l'engagement :\n- L'artiste peut choisir de s'engager ou non selon sa sensibilité\n- Les plus grandes œuvres sont souvent celles où l'engagement enrichit l'art\n- Sartre : l'artiste libre est responsable de ses choix\n\nCONCLUSION : L'art n'a pas l'obligation de servir une cause, mais les artistes qui choisissent de s'engager produisent souvent les œuvres les plus marquantes de l'histoire littéraire." },
          ],
        },
      ],
    },
  ],
},

'poesie-scientifique': {
  id: 'poesie-scientifique', emoji: '🌸', tag: 'Scientifiques', color: '#e11d48',
  titre: 'La Poésie',
  desc: "La poésie est un art du langage universel qui touche toutes les sections. Ce module explore les figures de style, les grands poètes français et les techniques d'analyse poétique au programme du Bac.",
  souschapitres: [
    {
      id: 'sc-poes-notions', titre: '6.1 Notions poétiques',
      notions: ['Métaphore', 'Comparaison', 'Symbolisme', 'Vers', 'Rime', 'Musicalité'],
      blocs: [
        {
          notion: '🌸 Figures de style essentielles',
          theoremes: [
            { id: 'A-PS1', type: 'def', nom: 'Figures de style — Définitions et exemples',
              enonce: "MÉTAPHORE :\nComparaison implicite sans outil comparatif.\nEx : « La vie est un voyage. »\n\nCOMPARAISON :\nRapprochement avec outil comparatif (comme, tel que, semblable à).\nEx : « Le temps passe comme une rivière. »\n\nALLÉGORIE :\nReprésentation abstraite sous forme concrète et personnifiée.\nEx : La Liberté guidant le peuple (Delacroix)\n\nANAPHORE :\nRépétition d'un mot ou groupe en début de vers ou de phrase.\nEx : « J'écris ton nom » × 21 strophes (Éluard, Liberté)\n\nPERSONNIFICATION :\nAttribut de qualités humaines à un non-humain.\nEx : « Le vent gémissait dans les arbres. »\n\nEUPHÉMISME :\nAtténuation d'une réalité dure.\nEx : « Il n'est plus parmi nous. » (pour : il est mort)" },
            { id: 'A-PS2', type: 'loi', nom: 'Paul Éluard — « Liberté » (1942)',
              enonce: "CONTEXTE ET RÉSISTANCE :\nPoème écrit sous l'Occupation nazie. Éluard, membre du Parti communiste, résistant.\n\nSTRUCTURE :\n• 21 strophes de 4 vers\n• Anaphore : « Sur... » commence chaque strophe\n• Mot final révélé : LIBERTÉ\n\nINTERPRÉTATION :\nÉluard écrit le mot « Liberté » sur tous les objets du quotidien (cahier, table, pierre, sol...). C'est un acte de résistance poétique.\n\nAXES D'ANALYSE :\n• La poésie comme acte de résistance politique\n• L'espoir et la liberté comme valeurs universelles\n• La technique de l'anaphore pour créer l'intensité\n\nCITATION :\n« Sur mes cahiers d'écolier / Sur mon pupitre et les arbres / Sur le sable sur la neige / J'écris ton nom »" },
          ],
          exercices: [
            { id: 'EX-PS1', niveau: 'Moyen', titre: "Analyse poétique — « Liberté » d'Éluard",
              enonce: "En vous appuyant sur le poème « Liberté » de Paul Éluard, expliquez en 10 lignes comment la forme du poème (structure, figures de style) renforce le message de l'auteur.",
              correction: "Dans « Liberté », Éluard utilise une structure très particulière pour renforcer son message. La répétition de l'anaphore « Sur... » au début de chacune des 21 strophes crée un effet de litanie, une accumulation qui suggère que la Liberté est omniprésente, qu'elle peut s'inscrire partout. Cette structure en catalogue d'objets du quotidien (cahier, pupitre, sable, neige...) universalise le désir de liberté : elle concerne chaque être humain, dans sa vie la plus ordinaire. La révélation du mot « Liberté » seulement à la dernière strophe crée un effet de surprise et d'apothéose : tout le poème tend vers ce seul mot. Ainsi, la forme poétique d'Éluard n'est pas une simple décoration ; elle est au service d'un acte de résistance qui proclame que la Liberté est indestructible." },
          ],
        },
      ],
    },
  ],
},

'langue-expression-scientifique': {
  id: 'langue-expression-scientifique', emoji: '📝', tag: 'Scientifiques', color: '#059669',
  titre: "Langue & Techniques d'Expression",
  desc: "La maîtrise des outils grammaticaux et rhétoriques est essentielle pour réussir les épreuves de Français. Ce module couvre les connecteurs logiques, la modalisation et la méthodologie de l'essai.",
  souschapitres: [
    {
      id: 'sc-lgs-gram', titre: '7.1 Grammaire et argumentation',
      notions: ['Connecteurs logiques', 'Modalisation', 'Discours rapporté', 'Champ lexical'],
      blocs: [
        {
          notion: '📝 Connecteurs logiques — Tableau complet',
          theoremes: [
            { id: 'A-LGS1', type: 'def', nom: 'Connecteurs par fonction',
              enonce: "ADDITION / RENFORCEMENT :\nDe plus · En outre · Par ailleurs · Également · Non seulement... mais encore\n\nOPPOSITION / CONCESSION :\nMais · Cependant · Toutefois · Néanmoins · Or · Pourtant · En revanche · Certes... mais\n\nCAUSE :\nCar · Parce que · Puisque · Étant donné que · En raison de\n\nCONSÉQUENCE :\nDonc · Ainsi · Par conséquent · C'est pourquoi · De ce fait · D'où\n\nILLUSTRATION :\nAinsi · Par exemple · Notamment · C'est le cas de · Tel que\n\nCONCLUSION :\nEn conclusion · En définitive · Finalement · Pour conclure · En somme · Ainsi donc\n\nRÈGLE ABSOLUE DU BAC :\nVarier les connecteurs. Ne jamais répéter le même dans une même production écrite.",
              remarque: "L'absence de connecteurs = perte de points assurée. Montrez que vous maîtrisez la logique de l'argumentation." },
          ],
          exercices: [
            { id: 'EX-LGS1', niveau: 'Facile', titre: 'Exercice — Connecteurs logiques',
              enonce: "Complétez avec le connecteur logique approprié :\n1. La science améliore la vie. ___ elle peut créer de nouveaux dangers.\n2. L'environnement est menacé par la pollution. ___ des espèces disparaissent chaque jour.\n3. La tolérance est une valeur importante. ___ l'éducation reste le premier vecteur de lutte contre le racisme.",
              correction: "1. La science améliore la vie. CEPENDANT / TOUTEFOIS / NÉANMOINS elle peut créer de nouveaux dangers. (opposition)\n2. L'environnement est menacé par la pollution. AINSI / PAR CONSÉQUENT / C'EST POURQUOI des espèces disparaissent chaque jour. (conséquence)\n3. La tolérance est une valeur importante. CEPENDANT / TOUTEFOIS / NÉANMOINS l'éducation reste le premier vecteur de lutte contre le racisme. (nuance/opposition)" },
          ],
        },
      ],
    },
  ],
},

'production-ecrite-scientifique': {
  id: 'production-ecrite-scientifique', emoji: '✍️', tag: 'Scientifiques', color: '#7c3aed',
  titre: 'Production Écrite',
  desc: "La production écrite est l'épreuve centrale du Bac Français. Ce module présente la méthode complète pour les sections scientifiques : sujet de réflexion, essai argumentatif, résumé de texte.",
  souschapitres: [
    {
      id: 'sc-pes-methode', titre: '8.1 Méthode et types de sujets',
      notions: ['Essai argumentatif', 'Sujet de réflexion', 'Résumé', 'Plan dialectique'],
      blocs: [
        {
          notion: '✍️ Méthode de production écrite',
          theoremes: [
            { id: 'A-PES1', type: 'methode', nom: "Structure de l'essai argumentatif",
              enonce: "STRUCTURE EN 5 PARTIES :\n\n1. INTRODUCTION (5-7 lignes) :\n   - Accroche (citation, question, constat)\n   - Présentation du thème\n   - Problématique (question centrale)\n   - Annonce du plan\n\n2. PARTIE I — THÈSE (8-10 lignes) :\n   - Argument principal + développement\n   - 2 exemples concrets (un scientifique, un littéraire)\n   - Phrase de transition\n\n3. PARTIE II — ANTITHÈSE (8-10 lignes) :\n   - Argument contraire ou nuance\n   - 2 exemples différents\n   - Phrase de transition\n\n4. PARTIE III — SYNTHÈSE (8-10 lignes) :\n   - Dépassement de la contradiction\n   - Position nuancée et originale\n\n5. CONCLUSION (4-5 lignes) :\n   - Bilan des idées\n   - Réponse à la problématique\n   - Ouverture (question plus vaste)",
              remarque: "Pour les sections scientifiques : toujours utiliser des exemples scientifiques ET littéraires. Citer au moins 1 auteur." },
          ],
          exercices: [
            { id: 'EX-PES1', niveau: 'Difficile', titre: 'Sujet type Bac — Production écrite',
              enonce: "Sujet : « La science peut-elle résoudre tous les problèmes de l'humanité ? » Rédigez un essai argumentatif complet en vous appuyant sur des exemples scientifiques et des auteurs.",
              correction: "INTRODUCTION :\n« La science sans conscience n'est que ruine de l'âme » disait Rabelais au 16ème siècle. Aujourd'hui, alors que la science semble capable de tout — guérir les maladies, explorer l'espace, connecter le monde —, on est en droit de se demander si elle peut réellement résoudre tous les problèmes de l'humanité. Nous verrons d'abord ses formidables succès, avant d'examiner ses limites, pour montrer enfin que les problèmes humains dépassent le seul cadre scientifique.\n\nI. La science a résolu d'immenses problèmes humains :\n- Médecine : vaccins (éradication de la variole), antibiotiques, chirurgie moderne\n- Alimentation : révolution verte, agriculture moderne\n- Communication : Internet, réduction des distances\n- Énergie : énergies renouvelables comme réponse à la crise climatique\n\nII. La science ne peut pas tout résoudre :\n- Les problèmes moraux et éthiques échappent à la science (guerre, racisme, injustice)\n- Les avancées scientifiques créent parfois de nouveaux problèmes (bombes atomiques, pollution industrielle)\n- La science ne peut pas remplacer les valeurs humaines (tolérance, solidarité, amour)\n\nIII. La science doit s'accompagner d'une éthique humaine :\n- Albert Jacquard : la science doit servir l'homme, pas le dominer\n- Nécessité d'une éthique scientifique internationale\n- L'humain et ses valeurs doivent guider le progrès\n\nCONCLUSION : La science est un outil extraordinaire mais insuffisant. Pour résoudre les problèmes de l'humanité, elle doit s'accompagner de valeurs éthiques, de solidarité et de sagesse humaine." },
          ],
        },
      ],
    },
  ],
},

} // fin ALL_MODULES

function TypeBadge({ type }: { type: string }) {
  const color = C[type as keyof typeof C] || C.def
  const label = L[type as keyof typeof L] || type
  return (
    <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: `${color}20`, color, fontWeight: 700, flexShrink: 0 }}>
      {label}
    </span>
  )
}

function NiveauBadge({ niveau }: { niveau: string }) {
  const colors: Record<string,string> = { 'Facile': '#22c55e', 'Moyen': '#f59e0b', 'Difficile': '#ef4444' }
  const c = colors[niveau] || '#06b6d4'
  return (
    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 12, background: `${c}18`, color: c, fontWeight: 700 }}>{niveau}</span>
  )
}

export default function FrancaisScientifiqueSlugPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug ?? '')
  const module_ = ALL_MODULES[slug]
  const [openSc, setOpenSc] = useState<string|null>(null)
  const [openEx, setOpenEx] = useState<string|null>(null)

  const curIdx   = NAV_ORDER.indexOf(slug)
  const prevSlug = curIdx > 0 ? NAV_ORDER[curIdx-1] : null
  const nextSlug = curIdx < NAV_ORDER.length-1 ? NAV_ORDER[curIdx+1] : null
  const secColor = SEC_COLORS[slug] || '#ec4899'

  if (!module_) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 120, minHeight: '60vh', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontSize: 24 }}>Module non trouvé</h1>
          <p style={{ color: 'var(--muted)' }}>Le module "{slug}" n'existe pas pour les sections scientifiques.</p>
          <Link href="/bac/francais/lettres" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 20 }}>
            ← Retour aux modules Scientifiques
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>

          {/* FIL D'ARIANE */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: 'var(--muted)', marginBottom: 20, flexWrap: 'wrap' }}>
            <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇹🇳 Tunisie</Link>
            <span>›</span>
            <Link href="/bac/francais" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Français</Link>
            <span>›</span>
            <Link href="/bac/francais/lettres" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Lettres</Link>
            <span>›</span>
            <span style={{ color: secColor }}>{module_.titre}</span>
          </div>

          {/* LAYOUT */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 270px', gap: 28, alignItems: 'start' }}>

            {/* ═══════ CONTENU PRINCIPAL ═══════ */}
            <div>
              {/* HEADER */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 28 }}>{module_.emoji}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: secColor, background: `${secColor}18`, padding: '3px 10px', borderRadius: 8, fontWeight: 700 }}>
                    {TITRES_NAV[slug]?.split(' — ')[0]}
                  </span>
                  <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, background: `${secColor}14`, color: secColor, fontWeight: 700 }}>Lettres</span>
                </div>
                <h1 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, marginBottom: 10 }}>{module_.titre}</h1>
                <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, maxWidth: 620, marginBottom: 18 }}>{module_.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Français Scientifiques Tunisie — ' + module_.titre)}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 10, background: `linear-gradient(135deg,${secColor},${secColor}cc)`, color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                    🤖 Chat IA — ce module
                  </Link>
                  <Link href="/examens"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                    📋 Exercices Bac
                  </Link>
                </div>
              </div>

              {/* SOUS-CHAPITRES */}
              {module_.souschapitres.map((sc, scIdx) => (
                <div key={sc.id} style={{ marginBottom: 24, background: `${secColor}05`, border: `1px solid ${secColor}20`, borderRadius: 18, overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenSc(openSc === sc.id ? null : sc.id)}
                    style={{ width: '100%', background: `${secColor}12`, borderBottom: `1px solid ${secColor}20`, padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: 'none', textAlign: 'left' }}>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: secColor, fontWeight: 700 }}>
                          {String(scIdx + 1).padStart(2,'0')}
                        </span>
                        <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{sc.titre}</h2>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {sc.notions.map(n => (
                          <span key={n} style={{ fontSize: 10, padding: '2px 9px', borderRadius: 12, background: `${secColor}12`, color: 'var(--text2)', border: `1px solid ${secColor}18` }}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: secColor, marginLeft: 12 }}>
                      {(openSc === sc.id || scIdx === 0) ? '▲' : '▼'}
                    </span>
                  </button>

                  {(openSc === sc.id || scIdx === 0) && (
                    <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                      {sc.blocs.map(bloc => (
                        <div key={bloc.notion}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: secColor, marginBottom: 14 }}>{bloc.notion}</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 14 }}>
                            {bloc.theoremes.map(t => {
                              const color = C[t.type as keyof typeof C] || C.def
                              return (
                                <div key={t.id} style={{ borderLeft: `3px solid ${color}`, background: `${color}07`, borderRadius: '0 12px 12px 0', padding: '14px 18px', border: `1px solid ${color}18` }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10, flexWrap: 'wrap' }}>
                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{t.nom}</div>
                                    <TypeBadge type={t.type} />
                                  </div>
                                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
                                    {t.enonce}
                                  </div>
                                  {t.remarque && (
                                    <div style={{ marginTop: 10, paddingLeft: 12, borderLeft: '2px solid rgba(245,158,11,0.5)', fontSize: 11, color: 'rgba(245,158,11,0.9)', fontStyle: 'italic', lineHeight: 1.6 }}>
                                      ⚡ {t.remarque}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          {bloc.exercices.length > 0 && (
                            <div>
                              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 9 }}>
                                Exercices
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                                {bloc.exercices.map(ex => (
                                  <div key={ex.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                                    <div style={{ padding: '12px 16px' }}>
                                      <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 7, flexWrap: 'wrap' }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 7px', borderRadius: 5 }}>{ex.id}</span>
                                        <NiveauBadge niveau={ex.niveau} />
                                        <span style={{ fontWeight: 600, fontSize: 13 }}>{ex.titre}</span>
                                      </div>
                                      <p style={{ fontSize: 12, color: 'var(--text2)', margin: 0, lineHeight: 1.65, whiteSpace: 'pre-line' }}>{ex.enonce}</p>
                                    </div>
                                    <div style={{ borderTop: '1px solid var(--border)', padding: '8px 16px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                      <Link href={`/solve?q=${encodeURIComponent('Français Scientifiques — ' + ex.enonce.slice(0,100))}`}
                                        className="btn btn-primary" style={{ fontSize: 11, padding: '5px 12px' }}>
                                        🤖 Résoudre avec IA
                                      </Link>
                                      <button onClick={() => setOpenEx(openEx === ex.id ? null : ex.id)}
                                        style={{ fontSize: 11, padding: '5px 12px', borderRadius: 7, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', cursor: 'pointer', fontFamily: 'inherit' }}>
                                        📋 {openEx === ex.id ? 'Masquer' : 'Correction'}
                                      </button>
                                    </div>
                                    {openEx === ex.id && (
                                      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', background: `${secColor}06` }}>
                                        <div style={{ fontSize: 10, color: secColor, fontWeight: 700, marginBottom: 4 }}>✅ Correction</div>
                                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{ex.correction}</div>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 22, marginTop: 8 }}>
                {prevSlug ? (
                  <Link href={`/bac/francais/scientifique/${prevSlug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '12px 15px' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>← Précédent</div>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{TITRES_NAV[prevSlug].replace(/M\d+ — /, '')}</div>
                    </div>
                  </Link>
                ) : <div />}
                {nextSlug ? (
                  <Link href={`/bac/francais/scientifique/${nextSlug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '12px 15px', textAlign: 'right' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>Suivant →</div>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{TITRES_NAV[nextSlug].replace(/M\d+ — /, '')}</div>
                    </div>
                  </Link>
                ) : <div />}
              </div>
            </div>

            {/* ═══════ SIDEBAR ═══════ */}
            <aside style={{ position: 'sticky', top: 88 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: 11, color: '#ec4899', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(236,72,153,0.08)' }}>
                  🔬 Modules Scientifiques
                </div>
                {NAV_ORDER.map(s => (
                  <Link key={s} href={`/bac/francais/scientifique/${s}`} style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '8px 15px', borderBottom: '1px solid var(--border)', background: s === slug ? `${SEC_COLORS[s]}12` : 'transparent', borderLeft: s === slug ? `3px solid ${SEC_COLORS[s]}` : '3px solid transparent', transition: 'all 0.15s', cursor: 'pointer' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 1, fontFamily: 'var(--font-mono)' }}>{TITRES_NAV[s].split(' — ')[0]}</div>
                      <div style={{ fontSize: 11, fontWeight: s === slug ? 700 : 400, color: s === slug ? SEC_COLORS[s] : 'var(--text2)' }}>{TITRES_NAV[s].replace(/M\d+ — /, '').slice(0,30)}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '13px' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 9 }}>Actions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Link href="/solve" className="btn btn-primary" style={{ textAlign: 'center', fontSize: 12 }}>🤖 Chat IA — Français</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>📋 Exercices Bac</Link>
                  <Link href="/simulation" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>🎯 Simulation Bac</Link>
                  <Link href="/bac/francais/lettres" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>↩ Tous les modules</Link>
                  <Link href="/bac/francais/lettres" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>📚 Section Lettres</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){
          div[style*="grid-template-columns: 1fr 270px"]{grid-template-columns:1fr!important;}
          aside{display:none;}
        }
      `}</style>
    </>
  )
}