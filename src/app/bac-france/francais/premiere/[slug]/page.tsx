'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// FRANÇAIS PREMIÈRE — PAGE SLUG COMPLÈTE
// 4 objets d'étude EAF + Méthodologie
// Route : /bac-france/francais/premiere/[slug]
// Programme officiel MEN 2026 — Œuvres imposées + Parcours
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Notion clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'litterature-idees-xvie-xviiie',
  'poesie-xixe-xxie',
  'roman-recit-moyen-age-xxie',
  'theatre-xviie-xxie',
  'methodologie-eaf',
]
const TITRES_NAV: Record<string,string> = {
  'litterature-idees-xvie-xviiie': 'OBJ.01 — Littérature d\'idées',
  'poesie-xixe-xxie':              'OBJ.02 — La Poésie XIXe–XXIe',
  'roman-recit-moyen-age-xxie':    'OBJ.03 — Roman et Récit',
  'theatre-xviie-xxie':            'OBJ.04 — Le Théâtre',
  'methodologie-eaf':              'Méthodologie EAF',
}
const SEC_COLORS: Record<string,string> = {
  'litterature-idees-xvie-xviiie': '#f59e0b',
  'poesie-xixe-xxie':              '#ec4899',
  'roman-recit-moyen-age-xxie':    '#8b5cf6',
  'theatre-xviie-xxie':            '#06b6d4',
  'methodologie-eaf':              '#10b981',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — 5 CHAPITRES COMPLETS
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

// ═══════════════════════════════════════════════════════════════════════
// OBJET 1 — LITTÉRATURE D'IDÉES XVIe-XVIIIe
// ═══════════════════════════════════════════════════════════════════════
'litterature-idees-xvie-xviiie': {
  id: 'litterature-idees-xvie-xviiie', emoji: '💡', badge: 'Objet d\'étude 1 · EAF', color: '#f59e0b',
  titre: 'Littérature d\'idées — XVIe au XVIIIe siècle',
  desc: 'La Boétie, Fontenelle, Mme de Graffigny — argumentation, humanisme, Lumières. Œuvres imposées EAF 2026 avec parcours associés. Programme Première MEN.',
  souschapitres: [
    {
      id: 'sc-la-boetie', titre: '1.1 La Boétie — Discours de la servitude volontaire',
      notions: ['Parcours : Défendre et entretenir la liberté','Tyrannie · Obéissance · Liberté','Argumentation directe · Rhétorique','Humanisme de la Renaissance'],
      blocs: [
        {
          notion: '📖 Œuvre : Discours de la servitude volontaire (vers 1548)',
          theoremes: [
            { id: 'D-LB1', type: 'def', nom: 'Contexte et thèse centrale',
              enonce: 'Étienne de LA BOÉTIE (1530-1563) — écrit ce discours vers 18 ans.\nPublié après sa mort, il devient un texte fondateur de la pensée politique.\n\nTHÈSE CENTRALE :\n"Les peuples participent à leur propre servitude — ils ne sont pas contraints par force, ils CONSENTENT à leur oppression."\n\nQuestion fondamentale : pourquoi les hommes obéissent-ils à un tyran alors qu\'ils sont plus nombreux ?\nRéponse de La Boétie : par habitude, par peur, par désir de participer aux privilèges du pouvoir.\n\nPARCOURS associé : "Défendre et entretenir la liberté"\n→ Axes : la liberté comme valeur absolue · le consentement des opprimés · les moyens de résistance' },
            { id: 'D-LB2', type: 'def', nom: 'Les mécanismes de la servitude volontaire',
              enonce: '1. L\'HABITUDE : "Les hommes s\'accoutument à la servitude" — l\'habitude de l\'obéissance fait oublier la liberté\n\n2. LES COMPLICES DU TYRAN : le tyran distribue des privilèges à quelques-uns qui l\'aident à soumettre tous les autres\n→ Structure pyramidale : 5 complices → 25 → etc.\n→ "Ce sont ses maléfiques qui font le mal"\n\n3. L\'OUBLI DE LA LIBERTÉ : les peuples nés sous la tyrannie ignorent la liberté — ils n\'ont pas de référence\n\n4. LES DIVERTISSEMENTS : spectacles, fêtes → "du pain et des jeux" (panem et circenses) — ancêtre de Machiavel\n\nRÉSISTANCE : La Boétie dit qu\'il suffit de ne PAS OBÉIR — pas besoin de révolte armée.' },
            { id: 'M-LB1', type: 'methode', nom: 'Analyser un extrait argumentatif de La Boétie',
              enonce: 'MÉTHODE COMMENTAIRE — texte argumentatif Lumières/Renaissance :\n\n1. IDENTIFIER LA THÈSE : quelle idée La Boétie défend-il dans cet extrait ?\n2. REPÉRER LES ARGUMENTS : logiques, d\'autorité, par analogie, par l\'exemple\n3. ANALYSER LA PROGRESSION : comment l\'auteur construit-il sa démonstration ?\n4. ÉTUDIER LA RHÉTORIQUE : questions rhétoriques, anaphores, ironie, apostrophes\n5. SITUER DANS LE PARCOURS : en quoi cet extrait illustre-t-il "Défendre la liberté" ?\n6. CONCLURE sur la portée du texte (actualité, influence sur Rousseau, Thoreau...)' },
          ],
          exercices: [
            { id: 'EX-LB1', niveau: 'Facile', titre: 'La thèse de La Boétie',
              enonce: 'En quoi la "servitude" dont parle La Boétie est-elle "volontaire" ? N\'est-ce pas une contradiction ?',
              correction: 'La contradiction est apparente — c\'est le paradoxe au cœur de l\'œuvre.\n"Servitude" désigne normalement une contrainte subie. "Volontaire" implique un choix.\n→ La Boétie montre que les peuples ne sont pas FORCÉS de servir — ils choisissent d\'obéir.\nPourquoi ? Par habitude, par peur, par espoir de récompenses, par ignorance de la liberté.\n\nExemple : un peuple qui a toujours vécu sous tyrannie ne connaît pas la liberté → il accepte ce qui lui semble naturel.\n\nPortée : cette idée est révolutionnaire — si la servitude est volontaire, la libération est possible SANS révolution armée :\nil suffit de cesser de consentir, de "ne rien faire que de ne pas vouloir servir".' },
            { id: 'EX-LB2', niveau: 'Intermédiaire', titre: 'Dissertation — La liberté est-elle un droit naturel ?',
              enonce: 'À partir du Discours de la servitude volontaire, rédigez un plan de dissertation pour : "La liberté est-elle un droit naturel ou une conquête ?"',
              correction: 'PROBLÉMATIQUE : La liberté est-elle une donnée de la nature humaine qu\'on ne peut qu\'aliéner, ou une valeur que l\'homme doit construire et défendre ?\n\nI. LA LIBERTÉ COMME DROIT NATUREL\n- La Boétie : les animaux naissent libres → l\'homme aussi ("les bêtes ne peuvent consentir à leur servitude")\n- Rousseau : "L\'homme est né libre" — la liberté est dans sa nature, la société la corrompt\n- Kant : la liberté morale est inhérente à tout être raisonnable\n\nII. LA LIBERTÉ COMME CONQUÊTE\n- La Boétie montre que les peuples OUBLIENT leur liberté naturelle → elle doit être RECONQUISE\n- Sartre : "L\'existence précède l\'essence" → la liberté n\'est pas donnée, elle est à construire\n- L\'histoire : les droits de l\'homme ont dû être arrachés (Révolution 1789, abolition esclavage...)\n\nIII. SYNTHÈSE\n- La liberté est naturelle dans son principe mais doit être défendue dans sa réalité\n- La Boétie : simplement "ne pas vouloir servir" suffit → la liberté est toujours là, il suffit de la vouloir\n- Conclusion : ni pure donnée ni pure conquête — la liberté est un droit naturel qui demande un effort permanent de vigilance.' },
          ],
        },
        {
          notion: '🔭 Fontenelle — Entretiens sur la pluralité des mondes',
          theoremes: [
            { id: 'D-FNT1', type: 'def', nom: 'Présentation et enjeux',
              enonce: 'Bernard Le Bouyer de FONTENELLE (1657-1757) — "Entretiens sur la pluralité des mondes" (1686)\n\nFORMAT ORIGINAL : dialogue entre un philosophe et une Marquise, lors de promenades nocturnes\n→ Vulgarisation scientifique élégante, accessible aux non-savants et aux femmes\n→ Mélange de séduction, de poésie et de rigueur scientifique\n\nCONTENU : présentation du système copernicien (Soleil au centre), hypothèse de mondes habités\n\nPARCOURS : "Le goût de la science"\n→ Axes : la vulgarisation scientifique · le rapport entre plaisir et connaissance · la Marquise comme personnage du savoir\n\nIMPORTANCE HISTORIQUE : Fontenelle montre que la science peut être plaisante → prépare l\'Encyclopédie' },
            { id: 'D-FNT2', type: 'def', nom: 'La vulgarisation comme démarche littéraire',
              enonce: 'La vulgarisation chez Fontenelle = rendre le savoir savant accessible au grand public sans le trahir.\n\nPROCÉDÉS UTILISÉS :\n• Dialogue : donne un rythme, simule la découverte progressive\n• Marquise ignorante = représentante du lecteur → ses questions = les nôtres\n• Métaphores : les étoiles comparées à des orangers, les planètes à des villages\n• Gradation : des vérités simples vers les hypothèses les plus audacieuses\n• Humour et légèreté : le ton galant contraste avec la gravité du sujet\n\nJEU AVEC LE GENRE : mélange du traité scientifique et de la conversation mondaine\n→ La science devient un sujet de salon, presque de séduction' },
          ],
          exercices: [
            { id: 'EX-FNT1', niveau: 'Intermédiaire', titre: 'La figure de la Marquise',
              enonce: 'Quel rôle joue la Marquise dans les Entretiens ? Pourquoi Fontenelle choisit-il une femme comme interlocutrice ?',
              correction: 'Rôle dramatique : la Marquise est le relais du lecteur — ses questions naïves permettent à Fontenelle d\'expliquer progressivement.\nElle représente le "honnête homme" cultivé mais non savant du XVIIe siècle.\n\nChoix d\'une femme :\n→ Geste d\'inclusion : au XVIIe s., les femmes sont exclues de l\'éducation scientifique\n→ Fontenelle montre que la science est accessible à tous → démocratisation du savoir\n→ La Marquise apprend vite et intelligemment → contre les préjugés sur l\'intelligence féminine\n→ Le cadre galant (promenade nocturne) rend le dialogue plus séduisant et moins intimidant\n\nPortée : Fontenelle préfigure l\'idéal encyclopédiste — le savoir doit circuler librement dans la société.' },
          ],
        },
      ],
    },
    {
      id: 'sc-graffigny', titre: '1.2 Mme de Graffigny — Lettres d\'une Péruvienne',
      notions: ['Parcours : Un nouvel univers s\'est offert à mes yeux','Roman épistolaire · Regard étranger','Condition féminine au XVIIIe s.','Critique de la société française'],
      blocs: [
        {
          notion: '📖 Œuvre et parcours : regard étranger et critique sociale',
          theoremes: [
            { id: 'D-GR1', type: 'def', nom: 'Le roman épistolaire et le regard étranger',
              enonce: 'Françoise de GRAFFIGNY (1695-1758) — "Lettres d\'une Péruvienne" (1747)\n\nGENRE : roman épistolaire — récit par lettres\nNARRATRICE : Zilia, Péruvienne captive emmenée en France\n\nPARCOURS : "Un nouvel univers s\'est offert à mes yeux"\n\nLE REGARD ÉTRANGER :\n→ Dispositif littéraire : un personnage étranger observe la France avec des yeux neufs\n→ Ce qu\'il voit d\'étrange = les habitudes françaises vues de l\'extérieur\n→ Effets :\n  - Dépaysement : le lecteur est décalé, voit différemment sa propre culture\n  - Critique sociale implicite : ce qui paraît normal est en fait arbitraire\n  - Relativisme culturel : aucune civilisation n\'est supérieure par nature\n\nPREDECESSEURS : Montesquieu (Lettres persanes, 1721) — même dispositif\nSUITE : Voltaire (L\'Ingénu, Candide) — la naïveté du héros étranger = miroir grossissant' },
          ],
          exercices: [
            { id: 'EX-GR1', niveau: 'Intermédiaire', titre: 'La critique de la France par Zilia',
              enonce: 'Montrez en quoi le regard de Zilia sur la France constitue une critique implicite de la société française du XVIIIe siècle.',
              correction: 'Zilia observe la France avec étonnement et incompréhension — ce qui révèle les absurdités françaises.\n\nCritiques implicites :\n1. Condition des femmes : Zilia remarque que les Françaises sont libres en apparence mais soumises aux hommes en réalité → critique du libertinage aristocratique et du mariage sans amour\n2. Superficialité des mœurs : Zilia est frappée par l\'importance des apparences, des vêtements, des conventions sociales → les Français semblent préférer le paraître à l\'être\n3. Religion : Zilia compare les pratiques chrétiennes à celles de sa religion inca → relativisme religieux implicite\n4. Rapport à l\'argent : la société française est dominée par l\'argent et le calcul → Zilia préfère les valeurs de sa culture\n\nEffet littéraire : la naïveté de Zilia est feinte ou réelle, mais elle force le lecteur français à se voir de l\'extérieur et à remettre en question l\'évidence de ses habitudes.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// OBJET 2 — POÉSIE XIXe-XXIe
// ═══════════════════════════════════════════════════════════════════════
'poesie-xixe-xxie': {
  id: 'poesie-xixe-xxie', emoji: '📜', badge: 'Objet d\'étude 2 · EAF', color: '#ec4899',
  titre: 'La Poésie du XIXe au XXIe siècle',
  desc: 'Rimbaud (Cahiers de Douai), Ponge (La Rage de l\'expression), Dorion (Mes forêts) — émancipation créatrice, travail du langage, nature et intime. EAF 2026.',
  souschapitres: [
    {
      id: 'sc-rimbaud', titre: '2.1 Rimbaud — Cahiers de Douai',
      notions: ['Parcours : Émancipations créatrices','Romantisme · Parnasse · Symbolisme','Liberté poétique · Révolte','Versification et vers libre'],
      blocs: [
        {
          notion: '📜 Œuvre : Cahiers de Douai (1870)',
          theoremes: [
            { id: 'D-RIM1', type: 'def', nom: 'Rimbaud et les Cahiers de Douai',
              enonce: 'Arthur RIMBAUD (1854-1891) — écrit les Cahiers de Douai à 15-16 ans (automne 1870)\n22 poèmes — écrits pendant une fugue à Douai, chez Izambard son professeur\n\nCONTEXT BIOGRAPHIQUE :\n→ Rimbaud fuit sa mère autoritaire et sa ville natale (Charleville)\n→ Il cherche la liberté absolue : affective, politique, poétique\n→ La Commune de Paris (1871) l\'enthousiasme (poème "Le Forgeron")\n\nPARCOURS : "Émancipations créatrices"\n→ Axes :\n  - Émancipation personnelle : fuir la famille, les conventions, la province\n  - Émancipation politique : sympathie pour la Commune, révolte contre l\'ordre\n  - Émancipation poétique : refuser les règles classiques, inventer un nouveau langage\n\nTHÈME CENTRAL : la jeunesse rebelle contre les institutions (famille, école, Église, armée)' },
            { id: 'D-RIM2', type: 'def', nom: 'Les grandes figures des Cahiers',
              enonce: 'POÈMES MAJEURS :\n\n"Ma bohème" : errance joyeuse, liberté, nature — le vagabond poète\n"Roman" : amour adolescent, rêverie, ironie légère\n"Le dormeur du val" : anti-militarisme — soldat mort dans la nature (chute finale : il est blessé)\n"Venus Anadyomène" : anti-idéalisme — la beauté décomposée, le corps réel\n"Sensation" : communion avec la nature, plaisir physique\n"Ophélie" : femme tragique, eau, mort, beauté\n\nÉVOLUTION DU STYLE :\n→ Début : alexandrins classiques (hommage à Hugo)\n→ Fin : vers plus libres, images plus audacieuses\n→ Transition vers la période "voyant" (Lettres du voyant, 1871)' },
            { id: 'M-RIM1', type: 'methode', nom: 'Analyse linéaire d\'un poème de Rimbaud',
              enonce: 'MÉTHODE ANALYSE LINÉAIRE (Oral EAF) :\n\nEXEMPLE : "Ma bohème"\n\n1. INTRODUCTION (1 min) :\n→ Situer : poème des Cahiers de Douai, automne 1870, fugue de Rimbaud\n→ Projet de lecture : montrer comment le poème met en scène l\'émancipation créatrice\n→ Annoncer le mouvement : 2-3 parties selon la progression du poème\n\n2. ANALYSE VERS PAR VERS (8 min) :\n→ Vers 1-4 : la liberté du vagabond — "Je m\'en allais, les poings dans mes poches crevées"\n  - "Poings" → résistance · "crevées" → pauvreté revendiquée\n→ Vers 5-8 : le lyrisme de la nature — les étoiles comme interlocutrices\n→ Vers 9-14 : la création poétique — les rimes comme "fantaisistes"\n  - "Je les écoutais, assis au bord des routes" → posture du poète-voyant\n\n3. CONCLUSION (1 min) :\n→ Bilan du projet de lecture\n→ Ouverture : lien avec Verlaine, avec le courant romantique' },
          ],
          exercices: [
            { id: 'EX-RIM1', niveau: 'Facile', titre: 'Chute du Dormeur du val',
              enonce: 'Dans "Le dormeur du val", la chute finale révèle que le soldat est mort. Analysez l\'effet de cette chute et son sens dans le cadre du parcours "Émancipations créatrices".',
              correction: 'La chute est : "Il a deux trous rouges au côté droit" — dernier vers, après 13 vers de description paisible.\n\nEffet de surprise :\n→ On croyait le soldat endormi dans la nature → révélation : il est mort\n→ Ironie dramatique : la nature indifférente berce un cadavre\n→ La beauté du paysage contraste avec la violence de la mort\n\nSens dans le parcours :\n→ Émancipation politique : le poème est un poème anti-guerre (1870 = guerre franco-prussienne)\n→ Rimbaud s\'émancipe des conventions : pas de discours patriotique → montrer la réalité de la mort\n→ La retenue ("deux trous rouges" — peu de mots, peu de sang visible) est plus violente que le pathos\n\nLien avec "Émancipations créatrices" : Rimbaud s\'émancipe des conventions poétiques du poème héroïque → il crée une poésie de la désillusion.' },
            { id: 'EX-RIM2', niveau: 'Intermédiaire', titre: 'La révolte dans les Cahiers de Douai',
              enonce: 'En quoi les Cahiers de Douai mettent-ils en scène une triple émancipation (personnelle, politique, poétique) ?',
              correction: '1. ÉMANCIPATION PERSONNELLE :\n→ Rimbaud fuit la mère ("La Maline", "Les Étrennes des orphelins"), la province, l\'autorité familiale\n→ "Ma bohème" : liberté de l\'errance, pauvreté revendiquée comme liberté\n→ Le "moi" poétique vagabond incarne le refus des contraintes bourgeoises\n\n2. ÉMANCIPATION POLITIQUE :\n→ "Le Forgeron" : défense du peuple et de la Commune\n→ "Le dormeur du val" : pacifisme, dénonciation de la guerre\n→ Rimbaud se range du côté des opprimés contre les puissants\n\n3. ÉMANCIPATION POÉTIQUE :\n→ Il part de l\'alexandrin classique (hommage à Hugo) mais le transgresse progressivement\n→ Images inédites : "Venus Anadyomène" anti-idéalise la beauté féminine\n→ "Ma bohème" : les rimes = "fantaisistes", la nature = interlocutrice\n→ Préparation de la "lettre du voyant" : le poète doit être voyant par dérèglement de tous les sens' },
          ],
        },
        {
          notion: '🪨 Ponge & Dorion — Le travail du langage et la nature',
          theoremes: [
            { id: 'D-PON1', type: 'def', nom: 'Ponge — La Rage de l\'expression',
              enonce: 'Francis PONGE (1899-1988) — "La Rage de l\'expression" (1952)\nRecueil de poèmes en prose et de carnets de travail\n\nDÉMARCHE ORIGINALE :\n→ Ponge part d\'objets ordinaires (le cageot, le galet, la mousse, le pré)\n→ Il cherche à ÉPUISER le langage sur ces objets — trouver le mot juste\n→ "La rage de l\'expression" = la frustration de ne jamais y arriver totalement\n\nPARCOURS : "Dans l\'atelier du poète"\n→ On voit Ponge AU TRAVAIL : ratures, versions successives, carnets\n→ La création poétique est montrée comme un processus, pas comme un don\n→ La perfection est impossible → c\'est ce qui pousse à continuer\n\nIMPORTANCE : Ponge refuse l\'idéalisme romantique (inspiration divine) → la poésie est un TRAVAIL artisanal' },
            { id: 'D-DOR1', type: 'def', nom: 'Hélène Dorion — Mes forêts',
              enonce: 'Hélène DORION (née 1954, Québec) — "Mes forêts" (2021)\n\nUNIVERS POÉTIQUE :\n→ La forêt comme métaphore de l\'intérieur humain\n→ Rapport sensible à la nature : pas de description pittoresque mais communion intime\n→ Vers libres, images lumineuses, tempo lent et méditatif\n\nPARCOURS : "La poésie, la nature, l\'intime"\n→ Axes :\n  - La nature comme espace de l\'intime — la forêt = l\'âme humaine\n  - La fragilité du monde : sensibilité écologique\n  - L\'intime et l\'universel : le "je" poétique touche à l\'humain commun\n\nSTYLE :\n→ Vers courts, blancs, respirations\n→ Syntaxe simple mais images denses\n→ Temps présent dominant : l\'être dans l\'instant' },
          ],
          exercices: [
            { id: 'EX-PON1', niveau: 'Intermédiaire', titre: 'Ponge et la poésie-travail',
              enonce: 'En quoi la démarche de Ponge dans La Rage de l\'expression renouvelle-t-elle la conception romantique du poète inspiré ?',
              correction: 'Conception romantique : le poète reçoit son inspiration d\'en haut (muse, génie) → la création est mystérieuse, spontanée, le poète est un élu.\n\nPonge fait le contraire :\n→ Il choisit des objets banals (pas de grands sujets sublimes)\n→ Il montre ses ratures, ses échecs, ses tentatives successives\n→ La poésie n\'est pas une révélation mais un TRAVAIL de la langue\n→ "La Rage de l\'expression" : la rage vient précisément de l\'inadéquation permanente entre les mots et les choses\n\nRupture fondamentale :\n→ Le poète n\'est pas inspiré → il est un ARTISAN du langage\n→ La perfection est inaccessible → c\'est ce qui donne sens au travail\n\nPortée : Ponge relie la poésie à la réalité concrète (objets) et au travail (effort) → influence sur la poésie contemporaine, sur Sartre (l\'engagement), sur le mouvement Nouveau Roman.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// OBJET 3 — LE ROMAN ET LE RÉCIT
// ═══════════════════════════════════════════════════════════════════════
'roman-recit-moyen-age-xxie': {
  id: 'roman-recit-moyen-age-xxie', emoji: '📖', badge: 'Objet d\'étude 3 · EAF', color: '#8b5cf6',
  titre: 'Le Roman et le Récit du Moyen Âge au XXIe siècle',
  desc: 'Manon Lescaut (Prévost), La Peau de chagrin (Balzac), Sido/Les Vrilles de la vigne (Colette) — passion, énergie, célébration. Œuvres imposées EAF 2026.',
  souschapitres: [
    {
      id: 'sc-manon-lescaut', titre: '3.1 Abbé Prévost — Manon Lescaut',
      notions: ['Parcours : Personnages en marge, plaisirs du romanesque','Roman sentimental · Passion amoureuse','Le chevalier Des Grieux · Marginalité','Narration rétrospective · Cadre du récit'],
      blocs: [
        {
          notion: '📖 Manon Lescaut (1731) — passion et destin tragique',
          theoremes: [
            { id: 'D-ML1', type: 'def', nom: 'Structure et personnages',
              enonce: 'Abbé PRÉVOST (1697-1763) — "Histoire du chevalier Des Grieux et de Manon Lescaut" (1731)\nVolume VII des Mémoires d\'un homme de qualité\n\nSTRUCTURE ORIGINALE :\n→ Récit enchâssé : l\'Homme de qualité rapporte ce que lui raconte Des Grieux\n→ Des Grieux = narrateur interne, donc subjectif — on ne voit Manon qu\'à travers ses yeux\n→ Manon reste mystérieuse : on ne sait jamais vraiment ce qu\'elle pense\n\nPERSONNAGES EN MARGE :\n→ Des Grieux : jeune noble qui abandonne tout (famille, carrière, honneur) pour Manon\n→ Manon : femme fatale, attirée par le luxe, infidèle mais sincèrement attachée à Des Grieux ?\n→ Tous deux vivent hors des normes sociales : tromperies, escroqueries, marginalité\n\nPARCOURS : "Personnages en marge, plaisirs du romanesque"\n→ Le plaisir du roman = l\'identification aux personnages immoraux mais attachants' },
          ],
          exercices: [
            { id: 'EX-ML1', niveau: 'Intermédiaire', titre: 'Manon, personnage ambigu',
              enonce: 'Comment le fait que Manon soit vue uniquement à travers les yeux de Des Grieux rend-elle ambiguë notre perception d\'elle ?',
              correction: 'Des Grieux est amoureux = il est partial. Sa narration déforme Manon.\n\nAmbigu : est-elle sincèrement amoureuse ou calculatrice ?\n→ Versions de Des Grieux : elle l\'aime vraiment mais ne peut résister au luxe\n→ Mais le lecteur peut douter : ses infidélités sont nombreuses, elle revient toujours à ses amants riches\n\nEffet de la focalisation interne :\n→ On partage la passion de Des Grieux → on excuse Manon comme lui\n→ Mais les faits objectifs (trahisons répétées) contredisent l\'image idéale qu\'il donne d\'elle\n\nRésultat : Manon est l\'un des personnages les plus ambigus de la littérature française\n→ Le lecteur oscille entre condamnation morale et fascination romantique\n→ Cette ambiguïté est au cœur du "plaisir du romanesque" : on aime ce qu\'on devrait condamner' },
          ],
        },
        {
          notion: '⚡ Balzac & Colette — Énergie et célébration',
          theoremes: [
            { id: 'D-BAL1', type: 'def', nom: 'Balzac — La Peau de chagrin (1831)',
              enonce: 'Honoré de BALZAC (1799-1850) — "La Peau de chagrin" (1831)\n\nINTRIGUE : Raphaël de Valentin reçoit une peau de chagrin magique — elle réalise tous ses vœux mais rétrécit à chaque désir, raccourcissant sa vie.\n\nSYMBOLISME CENTRAL :\n→ La peau = la vie elle-même\n→ Chaque désir consume une part de vie → métaphore de l\'énergie vitale\n→ Balzac pose la question : vaut-il mieux vouloir peu et vivre longtemps, ou tout désirer et consumer sa vie ?\n\nPARCOURS : "Les romans de l\'énergie : création et destruction"\n→ L\'énergie balzacienne : les personnages sont dévorés par leurs passions\n→ Désir et pouvoir : Raphaël veut tout — richesse, amour, gloire\n→ La destruction : le désir consume — on ne peut pas tout avoir\n\nRELATION AVEC LA COMÉDIE HUMAINE : Balzac analyse scientifiquement la société → les passions sont des forces physiques' },
            { id: 'D-COL1', type: 'def', nom: 'Colette — Sido et Les Vrilles de la vigne (1908)',
              enonce: 'COLETTE (1873-1954) — "Sido" et "Les Vrilles de la vigne" (1908)\n\nSIDO : portrait de sa mère Sidonie — femme libre, en communion avec la nature\n→ Sido = la figure maternelle idéale : présence au monde, sensualité de la nature\n→ Relation mère-fille : la mère reste le point d\'ancrage même après la mort\n\nLES VRILLES DE LA VIGNE : récits courts, poèmes en prose\n→ Thème : la liberté féminine et la nature\n→ Style : sensualité des sens, précision du mot juste, humour\n\nPARCOURS : "La célébration du monde"\n→ Colette célèbre : les parfums, les saveurs, la lumière, les corps, les animaux\n→ Écriture de la sensation : le monde est beau parce qu\'on le ressent pleinement\n→ Refus du pessimisme : écrire, c\'est célébrer, même la douleur, même la perte' },
          ],
          exercices: [
            { id: 'EX-COL1', niveau: 'Facile', titre: 'La célébration du monde chez Colette',
              enonce: 'En quoi l\'écriture de Colette peut-elle être qualifiée de "célébration du monde" ?',
              correction: '"Célébrer" = saluer, honorer, rendre visible ce qui est.\nColette célèbre dans ses textes :\n\n1. Les SENSATIONS : parfums, textures, goûts, lumières → écriture sensorielle qui rend le monde présent\n2. La NATURE : les animaux, les plantes, les saisons → le monde végétal et animal comme sujet littéraire digne\n3. Les FEMMES : Sido, figure maternelle libre et forte → célébration d\'un modèle féminin non conventionnel\n4. La VIE ORDINAIRE : Colette ne cherche pas les grandes épopées → la beauté est dans le quotidien\n\nStyle de la célébration :\n→ Phrases amples, rythmées, sensuelles\n→ Vocabulaire précis des plantes, des animaux, des goûts\n→ Présence du "je" qui reçoit et savoure le monde\n\nParadoxe : même les textes sur la perte (deuil de Sido) sont une célébration → écrire, c\'est maintenir vivant ce qu\'on a aimé.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// OBJET 4 — LE THÉÂTRE
// ═══════════════════════════════════════════════════════════════════════
'theatre-xviie-xxie': {
  id: 'theatre-xviie-xxie', emoji: '🎭', badge: 'Objet d\'étude 4 · EAF', color: '#06b6d4',
  titre: 'Le Théâtre du XVIIe au XXIe siècle',
  desc: 'Le Menteur (Corneille), On ne badine pas avec l\'amour (Musset), Pour un oui ou pour un non (Sarraute) — mensonge, passion, dispute. EAF 2026.',
  souschapitres: [
    {
      id: 'sc-corneille-musset', titre: '4.1 Corneille · Musset — Illusion et passion',
      notions: ['Parcours : Mensonge et comédie (Corneille)','Parcours : Les jeux du cœur et de la parole (Musset)','Comédie classique vs Drame romantique','Orgueil · Passion · Illusion théâtrale'],
      blocs: [
        {
          notion: '🎭 Corneille — Le Menteur (1644)',
          theoremes: [
            { id: 'D-COR1', type: 'def', nom: 'La comédie du mensonge',
              enonce: 'Pierre CORNEILLE (1606-1684) — "Le Menteur" (1644)\n\nINTRIGUE : Dorante, jeune homme arrivant à Paris, ment compulsivement pour se rendre intéressant.\nSes mensonges créent des quiproquos comiques et des situations impossibles.\n\nPARCOURS : "Mensonge et comédie"\n→ Axes :\n  - Le jeu des apparences : tout est représentation dans la société mondaine\n  - L\'illusion théâtrale : le théâtre lui-même est un mensonge (le spectateur sait que c\'est faux)\n  - La comédie du langage : les mots créent des réalités alternatives\n\nPARADOXE DE DORANTE :\n→ Il ment pour être admirable → il devient admirable par son art du mensonge\n→ Ses mensonges sont si brillants qu\'ils deviennent une forme de poésie\n→ Le valet Cliton = la raison pratique vs. Dorante = l\'imagination créatrice\n\nMORALE AMBIGU : Corneille ne condamne pas clairement → le mensonge peut être un art' },
          ],
          exercices: [
            { id: 'EX-COR1', niveau: 'Intermédiaire', titre: 'Le mensonge comme jeu social',
              enonce: 'Dans Le Menteur, Dorante ment pour "se faire valoir". En quoi ce comportement révèle-t-il quelque chose de la société mondaine du XVIIe siècle ?',
              correction: 'Dorante ne ment pas pour nuire mais pour être admirable dans une société qui valorise :\n→ L\'exploit militaire (ses faux faits de guerre)\n→ L\'aventure amoureuse (ses fausses conquêtes)\n→ Le bel esprit (la façon de raconter)\n\nRévélation sur la société mondaine :\n→ La société de cour = société du paraître, du spectacle de soi\n→ Ce qui compte : comment on présente les choses, pas ce qu\'elles sont\n→ Dorante fait exactement ce que tout le monde fait mais en exagérant → il révèle la vérité de la société par excès\n\nParadoxe de la comédie :\n→ Dans le monde du paraître, le menteur est plus "vrai" que les autres\n→ Son valet honnête Cliton est ennuyeux et inefficace\n→ Corneille suggère que la vie sociale est elle-même une comédie → le mensonge est une compétence sociale' },
          ],
        },
        {
          notion: '💔 Musset — On ne badine pas avec l\'amour (1834)',
          theoremes: [
            { id: 'D-MUS1', type: 'def', nom: 'Le drame romantique de l\'amour et de l\'orgueil',
              enonce: 'Alfred de MUSSET (1810-1857) — "On ne badine pas avec l\'amour" (1834)\n\nINTRIGUE : Perdican et Camille s\'aiment mais orgueil et jeux cruels conduisent à la mort de Rosette, la paysanne innocente.\n\nPARCOURS : "Les jeux du cœur et de la parole"\n→ Le langage comme arme : Perdican et Camille s\'expriment magnifiquement leur amour mais aussi leur orgueil\n→ Les mots peuvent blesser autant que des coups\n→ La parole sincère est impossible dans la société romantique\n\nTRAGÉDIE DE L\'ORGUEIL :\n→ Camille refuse d\'aimer par peur d\'être blessée (influence du couvent)\n→ Perdican, vexé, se venge en séduisant Rosette\n→ La mort de Rosette = conséquence du jeu cruel des deux protagonistes\n→ Les deux se retrouvent, mais trop tard : "Rosette est morte"\n\nMÉLANGE DES GENRES : comédie (personnages comiques : Baron, Maître Blazius) + tragédie (mort de Rosette)' },
          ],
          exercices: [
            { id: 'EX-MUS1', niveau: 'Intermédiaire', titre: 'Responsabilité de Perdican et Camille',
              enonce: 'Perdican ou Camille : qui est le plus responsable de la mort de Rosette ? Défendez une position argumentée.',
              correction: 'PERDICAN est davantage responsable (position défendable) :\n→ C\'est lui qui choisit délibérément de séduire Rosette pour se venger de Camille\n→ Il sait que Rosette l\'aime sincèrement et il en profite → manipulation cynique\n→ Camille refuse d\'aimer → c\'est une autodéfense blessante mais pas directement meurtrière\n→ C\'est l\'acte de Perdican (la séduction de Rosette) qui déclenche la chaîne tragique\n\nCAMILLE est aussi responsable (nuance nécessaire) :\n→ Elle provoque délibérément Perdican par des refus cruels\n→ Elle refuse l\'amour par peur et par orgueil (pas seulement par sagesse)\n→ Sans sa cruauté, Perdican n\'aurait pas eu de motif de vengeance\n\nCONCLUSION : Rosette est la victime d\'un JEU CRUEL à deux.\nMusset montre que l\'amour romantique est dangereux quand il est mélangé à l\'orgueil :\n"On ne badine pas avec l\'amour" = les jeux de l\'amour peuvent tuer les innocents.' },
          ],
        },
        {
          notion: '💬 Sarraute — Pour un oui ou pour un non (1982)',
          theoremes: [
            { id: 'D-SAR1', type: 'def', nom: 'Le théâtre du non-dit',
              enonce: 'Nathalie SARRAUTE (1900-1999) — "Pour un oui ou pour un non" (1982)\n\nINTRIGUE : Deux amis, H1 et H2, se disputent à cause d\'une phrase ("C\'est bien, ça...") dite avec un "certain ton".\nLa pièce explore la rupture amicale à partir d\'une infime nuance de langage.\n\nPARCOURS : "Théâtre et dispute"\n→ La dispute comme révélateur : ce qui semble anodin (un ton) cache des abîmes\n→ Le non-dit : la véritable raison de la brouille n\'est jamais dite clairement\n→ Le langage échoue : les mots ne peuvent pas tout dire, mais "le ton" dit tout\n\nTHÉÂTRE CONTEMPORAIN :\n→ Peu d\'action : tout est dans le dialogue\n→ Personnages sans nom (H1, H2) → universalité\n→ Temps présent, huis clos, tension psychologique\n\nHÉRITAGE : Sarraute invente le concept de "tropismes" — ces mouvements intérieurs infimes que les mots n\'arrivent pas à saisir' },
          ],
          exercices: [
            { id: 'EX-SAR1', niveau: 'Difficile', titre: 'Le langage chez Sarraute — analyse',
              enonce: 'Dans Pour un oui ou pour un non, pourquoi Sarraute choisit-elle de faire naître un conflit d\'une simple intonation ? Qu\'est-ce que cela révèle sur le langage ?',
              correction: 'CHOIX DRAMATURGIQUE :\nSarraute part de l\'infime — un "ton" sur "C\'est bien, ça..." — pour montrer que les grandes crises naissent de petits riens.\n\nCE QUE CELA RÉVÈLE SUR LE LANGAGE :\n\n1. L\'inadéquation du langage : les mots ne disent pas tout → le "ton" dit ce que les mots cachent (condescendance ? ironie ? pitié ?)\n2. La violence ordinaire du langage : une intonation peut blesser plus profondément qu\'une insulte\n3. L\'incompréhension constitutive : H1 et H2 ne s\'entendent pas car ils "n\'ont pas le même rapport au langage"\n4. Le non-dit comme sujet littéraire : Sarraute explore ce qui se passe SOUS les mots — les "tropismes"\n\nPORTÉE :\n→ Toute relation humaine est traversée de ces malentendus infimes\n→ La rupture de H1 et H2 est comique et tragique à la fois\n→ Sarraute révèle que le langage est autant un obstacle qu\'un moyen de communication' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// MÉTHODOLOGIE EAF
// ═══════════════════════════════════════════════════════════════════════
'methodologie-eaf': {
  id: 'methodologie-eaf', emoji: '✍️', badge: 'Méthode Bac · EAF', color: '#10b981',
  titre: 'Méthodologie EAF — Écrit & Oral',
  desc: 'Méthode complète : commentaire composé, dissertation littéraire, analyse linéaire à l\'oral. Préparer l\'Épreuve Anticipée de Français efficacement.',
  souschapitres: [
    {
      id: 'sc-commentaire', titre: 'Commentaire composé',
      notions: ['Introduction · Problématique · Plan','Analyse des procédés stylistiques','Construction des arguments littéraires','Conclusion et ouverture'],
      blocs: [
        {
          notion: '✍️ Le commentaire composé — méthode complète',
          theoremes: [
            { id: 'M-CC1', type: 'methode', nom: 'Structure du commentaire composé (4h)',
              enonce: 'INTRODUCTION (environ 150 mots) :\n1. Amorce : contexte de l\'œuvre, auteur, époque\n2. Présentation du texte : nature, situation dans l\'œuvre, thème\n3. Problématique : "En quoi ce texte... ?" — question littéraire sur le texte\n4. Annonce du plan : 2 ou 3 axes clairement nommés\n\nDÉVELOPPEMENT :\n• 2 ou 3 parties équilibrées\n• Chaque partie = 2-3 sous-parties\n• Structure de la sous-partie :\n  a) Idée directrice (phrase-topic)\n  b) Citation ou exemple textuel\n  c) Analyse du procédé stylistique\n  d) Interprétation / effet produit\n\nCONCLUSION :\n1. Bilan synthétique : réponse à la problématique\n2. Élargissement : mise en perspective (autre œuvre, autre époque, questionnement général)\n\nERREURS À ÉVITER :\n❌ Paraphrase (raconter le texte)\n❌ Vocabulaire vague ("beau", "intéressant")\n❌ Citations trop longues\n❌ Oublier d\'interpréter les procédés' },
            { id: 'M-CC2', type: 'methode', nom: 'Construire une problématique littéraire',
              enonce: 'La problématique doit :\n✅ Porter sur le TEXTE (pas sur le thème en général)\n✅ Être une VRAIE QUESTION (ouverte, pas de réponse évidente)\n✅ Être formulée en "En quoi...", "Comment...", "Dans quelle mesure..."\n✅ Guider toute l\'analyse\n\nEXEMPLES :\n❌ Mauvais : "Rimbaud parle de la liberté" (pas une question)\n❌ Mauvais : "Ce poème est-il beau ?" (trop vague)\n✅ Bon : "En quoi ce poème fait-il de la révolte une source d\'émancipation créatrice ?"\n✅ Bon : "Comment Balzac dépasse-t-il la simple description réaliste pour faire de cet incipit une mise en scène du destin de son héros ?"\n\nCONSEIL PRATIQUE :\nLire le texte → repérer le sujet central → trouver la tension, le paradoxe, l\'originalité → formuler la question que cette tension soulève.' },
          ],
          exercices: [
            { id: 'EX-CC1', niveau: 'Facile', titre: 'Formuler une problématique',
              enonce: 'À partir du poème "Ma bohème" de Rimbaud, formulez une problématique de commentaire composé.',
              correction: 'Étape 1 — Identifier le sujet central : la bohème (errance, liberté, pauvreté revendiquée) est présentée positivement.\nÉtape 2 — Trouver la tension : poème lyrique traditionnel (forme sonnet) MAIS contenu de révolte → paradoxe forme/fond.\nÉtape 3 — Formuler :\n\n✅ "En quoi ce poème fait-il de l\'errance une forme d\'émancipation créatrice ?" (lien avec le parcours)\n✅ "Comment Rimbaud subvertit-il les formes poétiques traditionnelles pour exprimer sa liberté ?" (angle formel)\n✅ "Dans quelle mesure ce poème met-il en scène la naissance d\'une vocation poétique ?" (angle biographique et littéraire)' },
          ],
        },
        {
          notion: '🎤 L\'Oral EAF — Analyse linéaire',
          theoremes: [
            { id: 'M-OL1', type: 'methode', nom: 'Structure de l\'analyse linéaire (oral EAF)',
              enonce: 'DURÉE : 20 minutes dont :\n• 10 min : votre exposé (analyse linéaire)\n• 10 min : entretien avec le jury\n\nSTRUCTURE DE L\'EXPOSÉ :\n1. INTRODUCTION (2 min) :\n   - Situer l\'extrait : auteur, œuvre, moment dans l\'œuvre\n   - Présenter le texte : de quoi parle cet extrait ?\n   - Projet de lecture (= problématique) : "En quoi cet extrait..."\n   - Annoncer le mouvement du texte : 2-3 parties selon la progression\n\n2. ANALYSE LINÉAIRE (6-7 min) :\n   - Commenter DANS L\'ORDRE du texte (ligne par ligne ou groupe de lignes)\n   - Identifier les procédés : figures de style, syntaxe, lexique, sonorités, images\n   - Interpréter l\'effet de chaque procédé\n   - Faire des liens avec le projet de lecture\n\n3. CONCLUSION (1 min) :\n   - Bilan : le projet de lecture est-il confirmé ?\n   - Ouverture : lien avec le parcours associé\n\nCONSEILS :\n→ Pas de lecture intégrale du texte\n→ Citer des fragments en analysant\n→ Regarder le jury, parler clairement\n→ En cas de blocage : "Je reviens à ce passage plus tard"' },
          ],
          exercices: [
            { id: 'EX-OL1', niveau: 'Intermédiaire', titre: 'Préparer l\'entretien EAF',
              enonce: 'Quelles questions le jury peut-il poser lors de l\'entretien de l\'oral EAF ? Comment s\'y préparer ?',
              correction: 'TYPES DE QUESTIONS DU JURY :\n\n1. APPROFONDISSEMENT : "Vous avez dit X, pouvez-vous développer ?"\n→ Toujours justifier et illustrer vos affirmations\n\n2. NUANCE : "N\'est-ce pas le contraire ? Peut-on dire aussi que..."\n→ Ne pas se laisser déstabiliser — concéder si nécessaire mais défendre votre analyse\n→ "Votre remarque est intéressante, en effet on pourrait aussi dire que... mais je maintiens que..."\n\n3. PARCOURS : "En quoi ce passage illustre-t-il le parcours [X] ?"\n→ Connaître impérativement le titre et les axes du parcours associé à chaque œuvre\n\n4. ŒUVRE ENTIÈRE : "Avez-vous lu l\'œuvre complète ? D\'autres passages illustrent-ils ce thème ?"\n→ Lire les œuvres intégralement !\n\n5. ÉCRITURE D\'INVENTION / DISSERTATION : "Si vous deviez disserter sur cette œuvre, quel sujet proposeriez-vous ?"\n→ Entraîner votre capacité à problématiser rapidement\n\nPRÉPARATION :\n→ Mémoriser 5-6 citations clés par œuvre\n→ Connaître les axes du parcours et avoir 2-3 exemples par axe\n→ Répéter à voix haute 10 fois votre analyse' },
          ],
        },
      ],
    },
  ],
},

} // fin ALL_CHAPTERS

// ─────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────

export default function FrancaisPremiereChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [activeTab, setActiveTab] = useState<string>('')

  const currentTabId = activeTab || (chapter?.souschapitres[0]?.id ?? '')
  const currentSC = chapter?.souschapitres.find(sc => sc.id === currentTabId) || chapter?.souschapitres[0]

  if (!chapter) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>📗</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/francais/premiere" className="btn btn-primary">← Retour Première</Link>
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
            <Link href="/bac-france/francais" style={{ color:'var(--muted)', textDecoration:'none' }}>Français</Link>
            <span>›</span>
            <Link href="/bac-france/francais/premiere" style={{ color:'var(--muted)', textDecoration:'none' }}>Première</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>OBJ.0{idx+1}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(236,72,153,0.15)', color:'#f472b6', fontWeight:700 }}>📗 Première · EAF</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(20px,3vw,34px)', marginBottom:10 }}>
              {chapter.emoji} {chapter.titre}
            </h1>
            <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7 }}>{chapter.desc}</p>
          </div>

          {/* Onglets */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:28, borderBottom:'1px solid var(--border)', paddingBottom:12 }}>
            {chapter.souschapitres.map(sc => (
              <button key={sc.id}
                onClick={() => { setActiveTab(sc.id); setOpenEx(null) }}
                style={{ padding:'7px 14px', borderRadius:10,
                  border:`1px solid ${(activeTab||chapter.souschapitres[0].id)===sc.id ? secColor : 'var(--border)'}`,
                  background:(activeTab||chapter.souschapitres[0].id)===sc.id ? `${secColor}18` : 'transparent',
                  color:(activeTab||chapter.souschapitres[0].id)===sc.id ? secColor : 'var(--muted)',
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
                      {currentSC.notions.map(n => <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:14, background:`${secColor}15`, color:'var(--text2)', border:`1px solid ${secColor}20` }}>{n}</span>)}
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
                                      background:ex.niveau==='Facile'?'rgba(16,185,129,0.15)':ex.niveau==='Difficile'?'rgba(239,68,68,0.15)':'rgba(245,158,11,0.15)',
                                      color:ex.niveau==='Facile'?'#34d399':ex.niveau==='Difficile'?'#f87171':'#fbbf24'
                                    }}>{ex.niveau}</span>
                                  </div>
                                </div>
                                <div style={{ flex:1 }}>
                                  <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{ex.titre}</div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.65 }}>{ex.enonce}</div>
                                </div>
                              </div>
                              <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>
                                <Link href={`/solve?subject=litterature&q=${encodeURIComponent('Français Première EAF — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                  📚 Analyser avec IA
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

              {/* Navigation */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/francais/premiere/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/francais/premiere/${nextSlug}`} style={{ textDecoration:'none' }}>
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

            {/* Sidebar */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  📗 Première EAF — 5 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/francais/premiere/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>OBJ.0{i+1}</div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^OBJ\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?subject=litterature&q=${encodeURIComponent('Explique-moi '+chapter.titre+' en Première EAF')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — EAF
                  </Link>
                  <Link href="/solve?subject=litterature" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📚 Solveur Français</Link>
                  <Link href="/bac-france/francais/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🎓 Vers la Terminale</Link>
                  <Link href="/bac-france/francais/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les objets d'étude</Link>
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