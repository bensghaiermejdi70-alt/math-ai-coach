'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// FRANÇAIS TERMINALE — PAGE SLUG COMPLÈTE
// Philosophie (4 notions) · HLP · Grand Oral
// Route : /bac-france/francais/terminale/[slug]
// Programme officiel MEN 2026/2027
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Notion clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = [
  'philosophie-le-sujet',
  'philosophie-la-culture',
  'philosophie-raison-reel',
  'philosophie-politique-morale',
  'hlp-humanites-litterature',
  'grand-oral-methodologie',
]
const TITRES_NAV: Record<string,string> = {
  'philosophie-le-sujet':          'NOT.01 — Le Sujet',
  'philosophie-la-culture':        'NOT.02 — La Culture',
  'philosophie-raison-reel':       'NOT.03 — La Raison et le Réel',
  'philosophie-politique-morale':  'NOT.04 — Politique & Morale',
  'hlp-humanites-litterature':     'HLP — Humanités, Litt. & Philo',
  'grand-oral-methodologie':       'Grand Oral — Méthodologie',
}
const SEC_COLORS: Record<string,string> = {
  'philosophie-le-sujet':         '#8b5cf6',
  'philosophie-la-culture':       '#ec4899',
  'philosophie-raison-reel':      '#06b6d4',
  'philosophie-politique-morale': '#f59e0b',
  'hlp-humanites-litterature':    '#10b981',
  'grand-oral-methodologie':      '#f43f5e',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — TOUS LES CHAPITRES
// ═════════════════════════════════════════════════════════════════════

const ALL_CHAPTERS: Record<string, {
  id: string; titre: string; badge: string; color: string; emoji: string;
  desc: string;
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
// NOTION 1 — LE SUJET
// ═══════════════════════════════════════════════════════════════════════
'philosophie-le-sujet': {
  id: 'philosophie-le-sujet', emoji: '🧠', badge: 'Philosophie · coef. 8', color: '#8b5cf6',
  titre: 'Le Sujet — Conscience · Liberté · Désir · Bonheur',
  desc: 'La conscience, l\'inconscient, la liberté, le désir et le bonheur — Descartes, Freud, Sartre, Kant. Programme Terminale Philosophie MEN 2026.',
  souschapitres: [
    {
      id: 'sc-conscience', titre: 'La Conscience et l\'Inconscient',
      notions: ['Conscience immédiate vs. réfléchie','La mauvaise foi (Sartre)','L\'inconscient freudien','Le cogito cartésien'],
      blocs: [
        {
          notion: '💡 La conscience — Descartes et Sartre',
          theoremes: [
            { id: 'D-C1', type: 'def', nom: 'Le cogito de Descartes',
              enonce: '"Je pense, donc je suis" — Descartes (Discours de la méthode, 1637)\n\nLe cogito est le fondement de la certitude : en doutant de tout, Descartes ne peut douter qu\'il doute.\nDonc il pense. Donc il est.\n\nImplications :\n• La conscience de soi est la première vérité indubitable\n• Je suis d\'abord une chose qui pense (res cogitans)\n• La conscience est transparente à elle-même (on sait ce que l\'on pense)\n\nLimite : Freud remettra en cause cette transparence — l\'inconscient prouve que la conscience ne se connaît pas toujours.' },
            { id: 'D-C2', type: 'def', nom: 'La mauvaise foi selon Sartre',
              enonce: 'La mauvaise foi (Sartre, L\'Être et le Néant, 1943) : se mentir à soi-même pour fuir la liberté.\n\nExemple du garçon de café : il joue à être garçon de café pour oublier qu\'il est libre, qu\'il aurait pu choisir autrement.\n\nStructure de la mauvaise foi :\n• Je suis une chose (factuelle, déterminée) → mais je suis aussi liberté\n• La mauvaise foi choisit de n\'être QUE factuelle → fuite de la responsabilité\n\n"L\'existence précède l\'essence" → nous ne sommes pas définis d\'avance, nous choisissons.' },
            { id: 'M-C1', type: 'methode', nom: 'Méthode : problématiser sur la conscience',
              enonce: 'Pour une question comme "La conscience est-elle transparente à elle-même ?" :\n\n1. THÈSE (oui) : Descartes — le cogito prouve que la conscience se connaît directement\n2. ANTITHÈSE (non) : Freud — l\'inconscient démontre que la conscience ignore ses propres motivations\n3. SYNTHÈSE : distinguer niveaux de conscience (immédiate vs. réfléchie) et types de connaissance de soi\n\nToujours mobiliser au moins 2 philosophes avec des positions différentes.' },
          ],
          exercices: [
            { id: 'EX-C1', niveau: 'Facile', titre: 'Le cogito de Descartes',
              enonce: 'Expliquez pourquoi Descartes choisit le doute comme méthode et en quoi le cogito est une certitude indubitable.',
              correction: 'Descartes choisit le doute méthodique pour trouver une vérité absolue (une certitude sur laquelle tout peut être reconstruit).\nIl doute de tout : ses sens peuvent le tromper, il peut rêver, un malin génie peut le tromper.\nMais : s\'il doute, il pense. S\'il pense, il est. → "Je pense, donc je suis."\nCette vérité est indubitable car pour nier qu\'on pense, il faut penser.\nLe cogito est ainsi la première certitude qui fonde la philosophie cartésienne.' },
            { id: 'EX-C2', niveau: 'Intermédiaire', titre: 'L\'inconscient remet-il en cause la liberté ?',
              enonce: 'En vous appuyant sur Freud et Sartre, montrez comment l\'inconscient pose le problème de la liberté humaine.',
              correction: 'Freud : l\'inconscient contient des pulsions refoulées qui agissent à notre insu (actes manqués, rêves, lapsus).\n→ Si mes actes sont déterminés par l\'inconscient, suis-je vraiment libre ?\n→ Freud semble dire : la liberté est une illusion — nous obéissons à des forces cachées.\n\nSartre répond : l\'inconscient n\'est qu\'une forme de mauvaise foi — dire "je n\'y peux rien, c\'est mon inconscient" est une manière de fuir la responsabilité.\n→ Sartre : "L\'homme est condamné à être libre" même face à ses désirs.\n\nSynthèse : l\'inconscient limite notre conscience mais non notre liberté au sens existentiel — nous pouvons toujours choisir notre attitude face à nos déterminations.' },
          ],
        },
        {
          notion: '⚡ La Liberté et le Déterminisme',
          theoremes: [
            { id: 'D-L1', type: 'def', nom: 'Déterminisme vs. Liberté',
              enonce: 'DÉTERMINISME : tout événement a une cause. Les actes humains sont donc déterminés par des causes (biologiques, psychologiques, sociales).\n\nThèse déterministe (Spinoza, Marx, Freud) :\n→ L\'homme croit être libre mais il ignore les causes qui le déterminent\n→ "Les hommes se croient libres parce qu\'ils sont conscients de leurs désirs, mais ignorants des causes qui les déterminent" (Spinoza)\n\nThèse libertaire (Kant, Sartre) :\n→ La liberté est irréductible : même déterminé biologiquement, l\'homme peut choisir son attitude\n→ Kant : la loi morale (impératif catégorique) prouve la liberté — on peut agir contre ses inclinations' },
            { id: 'F-L1', type: 'formule', nom: 'L\'impératif catégorique de Kant',
              enonce: '"Agis uniquement d\'après la maxime qui fait que tu peux vouloir en même temps qu\'elle devienne une loi universelle."\n— Kant, Fondements de la métaphysique des mœurs\n\nTest de l\'impératif catégorique :\n1. Formuler sa maxime (ex : "Je mens quand c\'est utile")\n2. Universaliser : "Et si tout le monde mentait ?" → Contradiction (le mensonge suppose que certains disent la vérité)\n3. Si contradiction → la maxime est contraire au devoir moral\n\nL\'impératif catégorique est inconditionnel (pas de "si...") → opposé à l\'impératif hypothétique ("si tu veux X, fais Y")' },
          ],
          exercices: [
            { id: 'EX-L1', niveau: 'Intermédiaire', titre: 'Dissertation — Sommes-nous libres ?',
              enonce: 'Rédigez un plan détaillé pour la dissertation : "Sommes-nous vraiment libres ?"',
              correction: 'INTRODUCTION : La liberté semble évidente (je lève le bras quand je veux), mais est-ce vrai ? Problématique : la liberté est-elle une réalité ou une illusion produite par notre ignorance des causes qui nous déterminent ?\n\nI. THÈSE — La liberté semble une illusion\n- Spinoza : nous croyons être libres car nous ignorons les causes\n- Freud : l\'inconscient détermine nos désirs et actes\n- Marx : la société et l\'économie déterminent nos pensées\n\nII. ANTITHÈSE — La liberté est irréductible\n- Sartre : "L\'homme est condamné à être libre" — l\'existence précède l\'essence\n- Kant : la loi morale prouve la liberté (on peut agir contre ses inclinations)\n- Expérience du remords : je me juge responsable → je me reconnais libre\n\nIII. SYNTHÈSE — Liberté et déterminisme sont compatibles\n- Compatibilisme (Hume) : libre = agir selon ses propres désirs (sans contrainte extérieure)\n- Distinguer libre arbitre (absolu) et liberté concrète (relative)\n- La liberté s\'exerce dans et avec les contraintes, pas malgré elles\n\nCONCLUSION : Nous ne sommes ni totalement libres ni totalement déterminés — la liberté est une conquête progressive sur nos déterminismes.' },
          ],
        },
      ],
    },
    {
      id: 'sc-desir-bonheur', titre: 'Le Désir et le Bonheur',
      notions: ['Désir manque vs. désir puissance','Bonheur épicurien vs. stoïcien','Hedonisme · Eudémonisme','Le bonheur est-il accessible ?'],
      blocs: [
        {
          notion: '🌟 Le désir — manque ou puissance ?',
          theoremes: [
            { id: 'D-D1', type: 'def', nom: 'Le désir comme manque — Platon',
              enonce: 'Platon (Le Banquet) : le désir est manque — on désire ce qu\'on n\'a pas.\n→ Mythe d\'Aristophane : les hommes sont des êtres coupés en deux, cherchant leur moitié\n→ Éros (Amour) est fils de Poros (l\'Abondance) et Pénia (la Pauvreté)\n→ Il est entre les deux : ni parfaitement riche ni parfaitement pauvre\n\nConséquence : si on obtient ce qu\'on désire, on cesse de le désirer.\nLe désir est infini car sitôt un désir satisfait, un autre naît.\n\nCritique épicurienne : distinguer désirs naturels/nécessaires (manger, boire) et désirs vains (richesse infinie, gloire).' },
            { id: 'D-D2', type: 'def', nom: 'Le désir comme puissance — Spinoza',
              enonce: 'Spinoza (Éthique) : le désir n\'est pas manque, c\'est l\'essence même de l\'homme — le "conatus" (effort pour persévérer dans son être).\n\n"Le désir est l\'essence de l\'homme"\n→ Le désir n\'est pas douloureux en soi — c\'est sa répression qui l\'est\n→ Nous ne désirons pas les choses parce qu\'elles sont bonnes : nous les appelons bonnes parce que nous les désirons\n\nConséquence : le bonheur ne vient pas de la suppression des désirs (stoïcisme) mais de leur compréhension et de leur accomplissement.' },
          ],
          exercices: [
            { id: 'EX-D1', niveau: 'Facile', titre: 'Le désir rend-il malheureux ?',
              enonce: 'Confrontez les thèses de Platon et Spinoza sur le désir. Lequel rend-il le mieux compte de l\'expérience humaine ?',
              correction: 'Platon : le désir est manque → il est structurellement insatisfaisable → source de souffrance.\nPreuve : dès qu\'un désir est satisfait, un autre apparaît (frustration permanente).\n\nSpinoza : le désir est élan vital → il n\'est pas malheureux en soi, c\'est sa répression qui l\'est.\nPreuve : l\'homme actif qui réalise ses désirs est plus heureux que celui qui les refoule.\n\nAnalyse : les deux ont raison selon le type de désir.\n→ Désirs vains (richesse, gloire) → logique platonicienne : insatisfaisables\n→ Désirs naturels (créer, aimer, comprendre) → logique spinoziste : accomplis, ils rendent heureux\nConclusion : le bonheur exige de distinguer les désirs et d\'orienter les désirs vers ce qui est bon pour nous.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// NOTION 2 — LA CULTURE
// ═══════════════════════════════════════════════════════════════════════
'philosophie-la-culture': {
  id: 'philosophie-la-culture', emoji: '🎨', badge: 'Philosophie · coef. 8', color: '#ec4899',
  titre: 'La Culture — Art · Langage · Travail · Technique · Religion',
  desc: 'L\'art, le langage, le travail, la technique et la religion — Hegel, Marx, Wittgenstein, Bergson. Programme Terminale Philosophie MEN 2026.',
  souschapitres: [
    {
      id: 'sc-art', titre: 'L\'Art et le Beau',
      notions: ['L\'art imite-t-il la réalité ?','Beau naturel vs. beau artistique','Kant : le jugement de goût','Hegel : l\'art révèle l\'Esprit'],
      blocs: [
        {
          notion: '🎨 Qu\'est-ce que l\'art ?',
          theoremes: [
            { id: 'D-ART1', type: 'def', nom: 'L\'art selon Platon — imitation trompeuse',
              enonce: 'Platon (La République) : l\'art est mimèsis (imitation) — mais imitation du monde sensible, qui est lui-même imitation du monde des Idées.\n→ L\'art est donc imitation d\'une imitation → il nous éloigne de la vérité\n→ Platon bannit les artistes de sa cité idéale : ils créent des illusions\n\nExemple : un tableau de lit est une copie du lit réel, qui est lui-même une copie de l\'Idée de lit.\n\nCritique : cette position sous-estime la capacité de l\'art à révéler des vérités que la raison ne peut pas saisir.' },
            { id: 'D-ART2', type: 'def', nom: 'L\'art selon Hegel — révélation de l\'Esprit',
              enonce: 'Hegel (Cours d\'Esthétique) : l\'art est une forme d\'accès à l\'Absolu — une des manières pour l\'Esprit de se connaître.\n→ L\'art n\'est pas simple imitation : il révèle une dimension spirituelle cachée dans les choses\n→ L\'art a une histoire : de l\'art symbolique (Égypte) → art classique (Grèce) → art romantique (intérieur/subjectif)\n\nHegel annonce la "fin de l\'art" : dans les sociétés modernes, la philosophie remplace l\'art comme mode d\'accès à l\'Absolu.\n\nImplication : l\'art a une valeur de vérité, pas seulement de plaisir.' },
            { id: 'F-ART1', type: 'formule', nom: 'Le jugement de goût selon Kant',
              enonce: '"Est beau ce qui plaît universellement sans concept"\n— Kant, Critique de la faculté de juger\n\nCaractéristiques du jugement esthétique :\n1. SUBJECTIF : il exprime un sentiment (pas une démonstration)\n2. UNIVERSEL : je prétends que tout le monde devrait trouver cela beau\n3. DÉSINTÉRESSÉ : je ne désire pas posséder l\'objet beau — je le contemple\n4. SANS CONCEPT : pas besoin de règles ou de catégories pour juger du beau\n\n→ Le beau naturel et le beau artistique sont distincts : l\'art implique le génie (création originale)' },
          ],
          exercices: [
            { id: 'EX-ART1', niveau: 'Intermédiaire', titre: 'L\'art dit-il la vérité ?',
              enonce: 'En confrontant Platon et Hegel, répondez à la question : l\'art peut-il nous donner accès à la vérité ?',
              correction: 'Platon : Non — l\'art est imitation (mimèsis) et nous éloigne de la vérité des Idées.\nL\'art produit des illusions et des émotions qui troublent la raison.\n\nHegel : Oui — l\'art révèle l\'Absolu sous une forme sensible ; il a une dimension de vérité spirituelle.\nL\'œuvre d\'art nous fait percevoir quelque chose d\'invisible (le divin, l\'universel) à travers le sensible.\n\nKant (compromis) : l\'art ne donne pas de connaissance conceptuelle, mais le sentiment du beau nous ouvre à une dimension morale et spirituelle.\n\nConclusion : l\'art dit une vérité différente de la vérité scientifique — une vérité existentielle, émotionnelle et spirituelle que la démonstration ne peut pas remplacer.' },
          ],
        },
        {
          notion: '🔧 La Technique et le Travail',
          theoremes: [
            { id: 'D-TECH1', type: 'def', nom: 'Le travail aliéné selon Marx',
              enonce: 'Marx (Manuscrits de 1844) : le travail devrait être l\'expression de l\'humanité — l\'homme crée, transforme le monde.\nMais dans le capitalisme, le travail est aliéné :\n\n4 formes d\'aliénation :\n1. Alienation du produit : le travailleur ne possède pas ce qu\'il produit\n2. Alienation de l\'activité : le travail est imposé, non choisi\n3. Alienation de l\'espèce : l\'homme perd sa dimension créatrice\n4. Alienation des autres : les rapports humains deviennent rapports marchands\n\n→ Le travail qui devrait libérer (Hegel) devient une prison dans le système capitaliste.' },
            { id: 'D-TECH2', type: 'def', nom: 'La technique — progrès ou danger ?',
              enonce: 'BERGSON (L\'Évolution créatrice) : l\'intelligence technique est propre à l\'homme — "homo faber" (l\'homme qui fabrique).\nLa technique est une extension du corps humain.\n\nHEIDEGGER (La Question de la technique) : la technique moderne n\'est pas neutre — elle impose une vision du monde qui traite la nature comme "fonds" (réserve d\'exploitation).\n→ La technique dépasse l\'homme : elle nous contrôle plus que nous ne la contrôlons\n→ "L\'essence de la technique n\'a rien de technique"\n\nELLUL : la technique devient autonome — elle se développe selon sa propre logique indépendamment des valeurs humaines.' },
          ],
          exercices: [
            { id: 'EX-TECH1', niveau: 'Intermédiaire', titre: 'La technique est-elle un progrès ?',
              enonce: 'En mobilisant Bergson et Heidegger, montrez que la technique peut être à la fois libération et aliénation.',
              correction: 'Bergson : la technique est libération — elle prolonge l\'intelligence humaine, libère du travail répétitif, crée du confort et de la liberté.\nL\'homme est homo faber : fabriquer est sa vocation naturelle.\n\nHeidegger : la technique moderne est aliénation — elle impose une logique d\'exploitation qui "arraisonne" la nature.\nLa centrale hydroélectrique transforme le Rhin en réservoir d\'énergie → la nature perd sa valeur intrinsèque.\n\nConclusion : la technique libère des contraintes naturelles mais peut aliéner en imposant sa propre logique.\nLe progrès technique n\'est progrès humain que si il est orienté par des valeurs éthiques et humanistes.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// NOTION 3 — LA RAISON ET LE RÉEL
// ═══════════════════════════════════════════════════════════════════════
'philosophie-raison-reel': {
  id: 'philosophie-raison-reel', emoji: '🔬', badge: 'Philosophie · coef. 8', color: '#06b6d4',
  titre: 'La Raison et le Réel — Vérité · Science · Démonstration · Expérience',
  desc: 'La vérité, la science, la démonstration et l\'expérience — Platon, Descartes, Kant, Bachelard, Popper. Programme Terminale Philosophie MEN 2026.',
  souschapitres: [
    {
      id: 'sc-verite', titre: 'La Vérité et la Connaissance',
      notions: ['Vérité correspondance · cohérence · pragmatique','Rationalisme vs. empirisme','Le problème de l\'induction','Falsifiabilité de Popper'],
      blocs: [
        {
          notion: '🔍 Qu\'est-ce que la vérité ?',
          theoremes: [
            { id: 'D-VER1', type: 'def', nom: 'Les trois théories de la vérité',
              enonce: '1. VÉRITÉ-CORRESPONDANCE (Aristote) : une proposition est vraie si elle correspond à la réalité\n→ "La neige est blanche" est vrai si et seulement si la neige est blanche\n→ Problème : comment accéder directement à la réalité pour vérifier ?\n\n2. VÉRITÉ-COHÉRENCE : une proposition est vraie si elle est cohérente avec l\'ensemble du système de croyances\n→ Problème : un système peut être cohérent et faux\n\n3. VÉRITÉ-PRAGMATIQUE (William James) : est vrai ce qui est utile, ce qui fonctionne\n→ "La théorie newtonienne est vraie car elle permet de calculer les trajectoires"\n→ Problème : quelque chose d\'utile peut être faux (ex : fausse croyance réconfortante)' },
            { id: 'D-VER2', type: 'def', nom: 'Rationalisme vs. Empirisme',
              enonce: 'RATIONALISME (Descartes, Spinoza, Leibniz) :\n→ La raison est la source principale de la connaissance\n→ Des idées innées existent indépendamment de l\'expérience\n→ Les mathématiques = modèle de connaissance certaine\n\nEMPIRISME (Locke, Hume, Berkeley) :\n→ Toute connaissance vient de l\'expérience sensible\n→ L\'esprit est une "tabula rasa" à la naissance\n→ On ne peut connaître que ce que les sens nous donnent\n\nKant (synthèse) : la connaissance nécessite des formes a priori (espace, temps, catégories) ET des données sensibles.\n"Des intuitions sans concepts sont aveugles, des concepts sans intuitions sont vides."' },
            { id: 'F-VER1', type: 'methode', nom: 'La falsifiabilité de Popper',
              enonce: 'Karl Popper (La logique de la découverte scientifique) : une théorie est scientifique si et seulement si elle est FALSIFIABLE (réfutable).\n\n→ Une théorie est falsifiable si on peut concevoir une expérience qui la réfuterait\n→ Si aucune expérience ne peut la réfuter → ce n\'est pas de la science (c\'est de la métaphysique ou de l\'idéologie)\n\nExemples :\n✅ "Tous les corps s\'attirent proportionnellement à leur masse" → falsifiable (on peut mesurer des contre-exemples)\n❌ "Les rêves révèlent nos désirs inconscients" → non-falsifiable (comment réfuter ?)\n\nImplication : la science progresse par réfutations successives, pas par accumulation de confirmations.' },
          ],
          exercices: [
            { id: 'EX-VER1', niveau: 'Intermédiaire', titre: 'La science peut-elle tout expliquer ?',
              enonce: 'En vous appuyant sur Bachelard et Popper, montrez que la science a des limites et que ces limites sont constitutives de sa méthode.',
              correction: 'Bachelard (La Formation de l\'esprit scientifique) : la science progresse contre l\'expérience immédiate.\n→ L\'esprit scientifique doit surmonter des "obstacles épistémologiques" : expérience première, généralisation hâtive, connaissance générale...\n→ Ex : l\'intuition du feu comme chaud ne suffit pas — il faut mesurer la température\nLimite : la science ne peut tout expliquer car elle travaille toujours dans un paradigme qui exclut certaines questions\n\nPopper : la science est limitée par nature — elle ne peut que formuler des hypothèses falsifiables.\n→ Tout ce qui ne peut être réfuté est hors de portée de la science (questions métaphysiques, éthiques...)\n\nConclusion : les limites de la science ne sont pas un défaut mais une exigence méthodologique — elles garantissent sa rigueur et son honnêteté intellectuelle.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// NOTION 4 — LA POLITIQUE ET LA MORALE
// ═══════════════════════════════════════════════════════════════════════
'philosophie-politique-morale': {
  id: 'philosophie-politique-morale', emoji: '⚖️', badge: 'Philosophie · coef. 8', color: '#f59e0b',
  titre: 'La Politique & La Morale — Justice · État · Droit · Devoir',
  desc: 'La justice, l\'État, le droit, le devoir et la responsabilité — Aristote, Rousseau, Rawls, Kant, Hannah Arendt. Programme Terminale Philosophie MEN 2026.',
  souschapitres: [
    {
      id: 'sc-justice-etat', titre: 'La Justice et l\'État',
      notions: ['Le contrat social','La justice distributive vs. corrective','L\'état de nature (Hobbes vs. Rousseau)','La désobéissance civile'],
      blocs: [
        {
          notion: '🏛️ Le contrat social et l\'État',
          theoremes: [
            { id: 'D-POL1', type: 'def', nom: 'L\'état de nature — Hobbes vs. Rousseau',
              enonce: 'HOBBES (Léviathan) : l\'état de nature = guerre de tous contre tous\n→ "L\'homme est un loup pour l\'homme"\n→ La vie naturelle est "solitaire, misérable, brutale et courte"\n→ Les hommes font un contrat social pour sortir de cette guerre : ils cèdent leur liberté à un souverain absolu (Léviathan)\n→ L\'État est légitime car il garantit la paix et la sécurité\n\nROUSSEAU (Du contrat social) : l\'état de nature = innocence et bonté naturelle\n→ "L\'homme est né bon, c\'est la société qui le corrompt"\n→ Le contrat social ne doit pas aliéner la liberté mais la transformer : volonté générale\n→ La souveraineté appartient au peuple — inalienable et indivisible' },
            { id: 'D-POL2', type: 'def', nom: 'La justice selon Rawls',
              enonce: 'John Rawls (Théorie de la justice, 1971) : qu\'est-ce qu\'une société juste ?\n\nExpérience de pensée : le "voile d\'ignorance"\n→ Imaginez que vous deviez choisir les principes de justice de votre société sans savoir qui vous serez (riche/pauvre, homme/femme, valide/handicapé...)\n→ Derrière ce voile, vous choisiriez des principes qui protègent les plus défavorisés\n\nDeux principes de Rawls :\n1. Principe d\'égale liberté : chacun a droit aux libertés fondamentales\n2. Principe de différence : les inégalités ne sont acceptables que si elles bénéficient aux plus défavorisés\n\nImplication : la justice ne demande pas l\'égalité absolue mais l\'équité.' },
          ],
          exercices: [
            { id: 'EX-POL1', niveau: 'Intermédiaire', titre: 'Pourquoi obéir aux lois ?',
              enonce: 'En mobilisant Rousseau et Rawls, répondez à la question : qu\'est-ce qui fonde l\'obligation d\'obéir aux lois ?',
              correction: 'Rousseau : j\'obéis aux lois parce qu\'elles expriment la volonté générale — c\'est-à-dire ma propre volonté en tant que citoyen.\n→ Obéir aux lois, c\'est obéir à soi-même (liberté civile)\n→ Limite : et si les lois sont injustes ? Rousseau admet le droit à la résistance si le pacte social est violé.\n\nRawls : j\'obéis aux lois parce qu\'elles sont justes — conformes aux principes que tous auraient choisi derrière le voile d\'ignorance.\n→ Mais l\'obligation n\'est pas absolue : les lois clairement injustes peuvent faire l\'objet de désobéissance civile\n→ La désobéissance civile doit être : publique, non-violente, visant à changer la loi, et acceptant les conséquences légales\n\nConclusion : l\'obligation d\'obéir aux lois repose sur leur légitimité (issue du consentement) et leur justice (équité). Elle cesse quand ces conditions ne sont plus remplies.' },
          ],
        },
        {
          notion: '⚖️ Le Devoir et la Responsabilité morale',
          theoremes: [
            { id: 'D-MOR1', type: 'def', nom: 'L\'impératif moral selon Kant',
              enonce: 'Kant : la morale repose sur la raison, pas sur le sentiment ou le bonheur.\n\nIMPÉRATIF CATÉGORIQUE (3 formulations) :\n1. Formule universelle : "Agis comme si la maxime de ton action devait devenir une loi universelle"\n2. Formule de l\'humanité : "Agis de façon à traiter l\'humanité toujours comme une fin, jamais seulement comme un moyen"\n3. Formule de l\'autonomie : "Agis comme si tu étais législateur de la nature"\n\nDEVOIR vs. INCLINATION :\n→ Agir par devoir = agir moralement (ex : aider par obligation morale)\n→ Agir par inclination = pas de valeur morale (ex : aider parce qu\'on aime aider)\nLa valeur morale d\'un acte ne dépend pas de ses conséquences mais de la maxime qui le guide.' },
          ],
          exercices: [
            { id: 'EX-MOR1', niveau: 'Difficile', titre: 'Faut-il toujours dire la vérité ?',
              enonce: 'Kant dit qu\'il ne faut jamais mentir, même pour sauver un innocent. Discutez cette position radicale.',
              correction: 'Position de Kant : on ne doit jamais mentir — le mensonge est inconditionnellement interdit.\nRaisonnement : si tout le monde mentait quand c\'est utile, la notion même de vérité disparaîtrait → contradiction logique.\nExemple du "meurtrier à la porte" : même à un meurtrier qui cherche votre ami, vous devez dire la vérité.\n\nCritiques :\n- Mill (utilitarisme) : une action est juste si elle maximise le bonheur total → mentir pour sauver une vie est non seulement permis mais obligatoire\n- Sartre : la situation concrète compte — l\'éthique de situation est plus adaptée que les règles absolues\n- Benjamin Constant : l\'obligation de vérité suppose que l\'interlocuteur a un droit à la vérité — un meurtrier perd ce droit\n\nConclusion : la position kantienne pointe une vérité importante (la vérité a une valeur absolue) mais son application rigide produit des conséquences absurdes. La sagesse pratique (phronesis d\'Aristote) est plus adaptée aux situations complexes.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// HLP — HUMANITÉS LITTÉRATURE ET PHILOSOPHIE
// ═══════════════════════════════════════════════════════════════════════
'hlp-humanites-litterature': {
  id: 'hlp-humanites-litterature', emoji: '📚', badge: 'Spécialité HLP · coef. 16', color: '#10b981',
  titre: 'HLP — Humanités, Littérature et Philosophie',
  desc: 'Spécialité HLP Terminale : La recherche de soi, l\'humanité en question, histoire et violence, l\'art et le sensible — Rousseau, Camus, Primo Levi, Hegel.',
  souschapitres: [
    {
      id: 'sc-recherche-soi', titre: 'Thème 1 — La Recherche de soi',
      notions: ['Éducation et formation de l\'individu','Sensibilité · Expression des émotions','Construction de l\'identité','Mémoire et récit de soi'],
      blocs: [
        {
          notion: '🪞 L\'identité et la construction de soi',
          theoremes: [
            { id: 'D-HLP1', type: 'def', nom: 'Montaigne — Se connaître soi-même',
              enonce: 'Montaigne (Les Essais, 1580-1588) : "Chaque homme porte la forme entière de l\'humaine condition"\n\nL\'essai comme genre de la recherche de soi :\n→ Montaigne invente un genre nouveau : l\'essai — réflexion personnelle, mobile, sans dogme\n→ Il s\'observe lui-même : ses humeurs, contradictions, évolutions\n→ "Je suis moi-même la matière de mon livre"\n\nLeçon philosophique : se connaître soi-même ne signifie pas trouver une essence fixe (Platon) mais accepter que le moi est mouvant, changeant, jamais figé.\n\nInfluence : Rousseau (Confessions), Proust (À la recherche du temps perdu)' },
            { id: 'D-HLP2', type: 'def', nom: 'Rousseau — L\'éducation et la nature',
              enonce: 'Rousseau (Émile ou De l\'éducation, 1762) : l\'éducation doit respecter la nature de l\'enfant.\n\n"Tout est bien sortant des mains de l\'Auteur des choses, tout dégénère entre les mains de l\'homme"\n\nPédagogie naturelle :\n→ Apprendre par l\'expérience et non par les livres (dans un premier temps)\n→ Respecter les stades de développement de l\'enfant\n→ Développer la sensibilité avant la raison\n→ Protéger l\'enfant de la corruption sociale\n\nOpposition à l\'éducation traditionnelle : l\'école classique formate, Rousseau libère.' },
          ],
          exercices: [
            { id: 'EX-HLP1', niveau: 'Intermédiaire', titre: 'La quête de soi dans les Confessions de Rousseau',
              enonce: 'Rousseau ouvre ses Confessions par : "Je veux montrer à mes semblables un homme dans toute la vérité de la nature ; et cet homme, ce sera moi." Analysez l\'ambition et les paradoxes de ce projet.',
              correction: 'Ambition : Rousseau veut être le premier homme à se montrer tel qu\'il est vraiment — sans masque, avec ses défauts.\n→ Projet révolutionnaire : l\'autobiographie devient morale et philosophique (pas seulement narrative)\n→ Affirme l\'originalité absolue de sa nature (nul n\'est comme moi)\n\nParadoxes :\n1. Peut-on être totalement transparent à soi-même ? (Freud dira : non, l\'inconscient l\'en empêche)\n2. L\'écriture transforme le vécu → toute autobiographie est une reconstruction, pas une copie\n3. "Je veux montrer la vérité" → mais le projet implique un choix de ce qu\'on montre\n\nConclusion : les Confessions sont une œuvre fondatrice de la littérature du moi — elles révèlent que la recherche de soi est toujours une construction narrative, jamais un accès direct à l\'essence.' },
          ],
        },
        {
          notion: '🌍 Thème 2 — L\'Humanité en question',
          theoremes: [
            { id: 'D-HLP3', type: 'def', nom: 'Camus — L\'absurde et la révolte',
              enonce: 'Albert Camus (Le Mythe de Sisyphe, 1942 ; L\'Homme révolté, 1951)\n\nL\'ABSURDE : sentiment né de la confrontation entre le désir humain de sens et le silence du monde.\n→ Le monde ne répond pas à nos questions de sens\n→ Faut-il se suicider ? Non → "Il faut imaginer Sisyphe heureux"\n→ La réponse à l\'absurde : la révolte, la liberté, la passion\n\nLA RÉVOLTE : Camus distingue révolte créatrice (affirme la vie) et nihilisme (dit non à tout).\n→ Contre les idéologies totalitaires qui sacrifient l\'homme présent au nom d\'un futur hypothétique\n→ "Je me révolte, donc nous sommes" → la révolte est un acte de solidarité humaine' },
          ],
          exercices: [
            { id: 'EX-HLP3', niveau: 'Intermédiaire', titre: 'Le devoir de mémoire — Primo Levi',
              enonce: 'Primo Levi (Si c\'est un homme, 1947) écrit : "Je n\'aurais pas de paix si je n\'avais pas écrit ce livre." En quoi le témoignage est-il à la fois un devoir éthique et une nécessité existentielle ?',
              correction: 'Devoir éthique :\n→ Témoigner contre l\'oubli : si les victimes ne parlent pas, les bourreaux peuvent nier\n→ "Cela est arrivé, donc cela peut arriver encore" (Levi) → la mémoire protège contre la répétition\n→ Rendre justice aux morts : donner une voix à ceux qui ne peuvent plus parler\n\nNécessité existentielle :\n→ Écrire pour comprendre ce qu\'on a vécu, mettre des mots sur le traumatisme\n→ L\'écriture comme thérapie et reconstruction de l\'identité après la destruction\n→ Mais aussi : la honte du survivant — "Pourquoi moi et pas eux ?" → écrire pour répondre\n\nTension : Levi dit aussi que le témoignage reste incomplet — les "vrais témoins" sont morts dans les camps.\n→ L\'écriture du témoin est toujours lacunaire, toujours insuffisante face à l\'ampleur de la catastrophe.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// GRAND ORAL — MÉTHODOLOGIE
// ═══════════════════════════════════════════════════════════════════════
'grand-oral-methodologie': {
  id: 'grand-oral-methodologie', emoji: '🎤', badge: 'Grand Oral · coef. 8', color: '#f43f5e',
  titre: 'Grand Oral — Préparation & Méthodologie complète',
  desc: 'Construire une problématique, maîtriser l\'exposé (5 min), réussir l\'entretien (10 min) et l\'échange (5 min). Méthode complète et exercices.',
  souschapitres: [
    {
      id: 'sc-construire-question', titre: 'Construire la question du Grand Oral',
      notions: ['Question au croisement de 2 spécialités','Problématique ouverte et vraie','Délimiter le sujet','Annoncer le plan'],
      blocs: [
        {
          notion: '🎯 La question idéale',
          theoremes: [
            { id: 'D-GO1', type: 'def', nom: 'Structure du Grand Oral',
              enonce: 'DURÉE TOTALE : 20 minutes\n\n1. PRÉPARATION (20 min) : vous recevez vos 2 questions, choisissez l\'une, préparez\n\n2. EXPOSÉ (5 min) : vous présentez votre réponse à la question choisie, SANS notes\n→ Introduire la question, la problématiser\n→ Développer 2-3 arguments clés\n→ Conclure avec une réponse claire\n\n3. ENTRETIEN (10 min) : le jury questionne votre exposé\n→ Vous approfondissez, nuancez, défendez vos arguments\n→ Restez calme face aux objections — c\'est normal !\n\n4. ÉCHANGE (5 min) : discussion sur votre projet d\'orientation\n→ Expliquez en quoi la question préparée est en lien avec vos études futures' },
            { id: 'F-GO1', type: 'formule', nom: 'Critères d\'une bonne question Grand Oral',
              enonce: 'UNE BONNE QUESTION DOIT :\n✅ Croiser 2 spécialités (ex : Maths + Physique · Littérature + Histoire...)\n✅ Être ouverte (pas de réponse oui/non) → "En quoi... ?" "Comment... ?" "Pourquoi... ?"\n✅ Être problématisable : on peut défendre plusieurs points de vue\n✅ Être traitée en 5 minutes (ni trop large, ni trop étroite)\n✅ Permettre de montrer des connaissances réelles\n\nEXEMPLES DE BONNES QUESTIONS :\n→ "Les algorithmes de recommandation menacent-ils la liberté de penser ?" (Maths + Philo)\n→ "En quoi la photographie a-t-elle transformé notre rapport au réel ?" (Arts + Philo)\n→ "La modélisation mathématique peut-elle tout prévoir ?" (Maths + Physique)\n→ "Faut-il craindre l\'intelligence artificielle ?" (NSI + Philo)' },
            { id: 'M-GO1', type: 'methode', nom: 'Structure de l\'exposé 5 minutes',
              enonce: 'TIMING 5 MINUTES :\n\n[0:00-0:30] ACCROCHE : anecdote, citation, fait marquant en lien avec la question\n[0:30-1:00] PRÉSENTATION DE LA QUESTION : reformulez, situez dans vos spécialités\n[1:00-1:20] PROBLÉMATIQUE : montrez pourquoi la question est complexe (tension, paradoxe)\n[1:20-1:40] ANNONCE DU PLAN : 2-3 parties clairement nommées\n[1:40-4:00] DÉVELOPPEMENT : chaque partie = argument + exemple + lien à la question\n[4:00-4:30] CONCLUSION : réponse nuancée à la question\n[4:30-5:00] OUVERTURE : perspective plus large\n\nTIPS :\n→ Parler lentement et distinctement (vous serez nerveux → tendance à accélérer)\n→ Regarder le jury (pas le plafond !)\n→ S\'arrêter si l\'on hésite → respirer → reprendre\n→ Répéter à voix haute au moins 10 fois' },
          ],
          exercices: [
            { id: 'EX-GO1', niveau: 'Facile', titre: 'Évaluer des questions Grand Oral',
              enonce: 'Évaluez ces questions selon les critères d\'une bonne question Grand Oral :\na) "Les mathématiques sont-elles belles ?"\nb) "En quoi la photographie a-t-elle changé notre rapport à la mémoire ?"\nc) "Que sont les mathématiques ?"',
              correction: 'a) "Les mathématiques sont-elles belles ?" → ACCEPTABLE MAIS FAIBLE\n+ Ouvert, problématisable (croise Maths + Esthétique/Philo)\n- Trop vague, "beauté" non défini, difficile à traiter en 5 min avec précision\nAmélioration : "En quoi les mathématiques peuvent-elles être considérées comme un art ?"\n\nb) "En quoi la photographie a-t-elle changé notre rapport à la mémoire ?" → EXCELLENTE\n+ Croise Arts/Histoire + Philo + Sciences\n+ Ouverte, problématisable, délimitée\n+ Permet exemples concrets et références philosophiques (Benjamin, Sontag)\n\nc) "Que sont les mathématiques ?" → MAUVAISE\n- Trop large (un cours entier ne suffirait pas)\n- Encyclopédique → pas une vraie problématique\n- Pas de tension, pas de croisement de spécialités' },
            { id: 'EX-GO2', niveau: 'Intermédiaire', titre: 'Répondre aux objections du jury',
              enonce: 'Vous avez soutenu que "l\'IA ne pourra jamais être créative". Le jury objecte : "Mais les IA produisent déjà de la musique, de la peinture et des textes qui trompent des experts." Comment répondez-vous ?',
              correction: 'Stratégie : ne pas se laisser déstabiliser — une objection n\'invalide pas votre thèse si vous nuancez.\n\n"C\'est une objection importante qui mérite d\'être précisée.\nEn effet, les IA génèrent des productions qui peuvent tromper des experts — c\'est un fait indéniable.\n\nMais la question est de savoir ce qu\'on entend par \'créativité\'.\nSi créer = produire quelque chose de nouveau et original → l\'IA produit effectivement du nouveau.\nMais si créer = intentionner, vouloir exprimer quelque chose, avoir une vision du monde → l\'IA ne crée pas.\n\nGPT-4 ne choisit pas d\'écrire sur tel sujet parce qu\'il en a envie : il optimise des probabilités statistiques.\nL\'artiste humain crée parce qu\'il a quelque chose à dire — une intention, une émotion, un regard sur le monde.\n\nJe maintiens donc ma thèse : l\'IA peut simuler la créativité mais ne peut pas authentiquement créer."' },
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

export default function FrancaisTerminaleChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [activeTab, setActiveTab] = useState<string>('')

  const currentTabId = activeTab || (chapter?.souschapitres[0]?.id ?? '')
  const currentSC = chapter?.souschapitres.find(sc => sc.id === currentTabId) || chapter?.souschapitres[0]

  if (!chapter) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>🧠</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/francais/terminale" className="btn btn-primary">← Retour Terminale</Link>
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
            <Link href="/bac-france/francais/terminale" style={{ color:'var(--muted)', textDecoration:'none' }}>Terminale</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header chapitre */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>NOT.0{idx+1}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(139,92,246,0.15)', color:'#a78bfa', fontWeight:700 }}>🎓 Terminale</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(20px,3vw,34px)', marginBottom:10 }}>
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

            {/* Contenu principal */}
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
                                <Link href={`/solve?subject=litterature&q=${encodeURIComponent('Philosophie Terminale — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                  🧠 Analyser avec IA
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

              {/* Navigation prev/next */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/francais/terminale/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/francais/terminale/${nextSlug}`} style={{ textDecoration:'none' }}>
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
                  🎓 Terminale — 6 thèmes
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/francais/terminale/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>NOT.0{i+1}</div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^NOT\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?subject=litterature&q=${encodeURIComponent('Explique-moi '+chapter.titre+' en Terminale')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — Philo
                  </Link>
                  <Link href="/solve?subject=litterature" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧠 Solveur Philo</Link>
                  <Link href="/bac-france/francais/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📗 Réviser la Première</Link>
                  <Link href="/bac-france/francais/terminale" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les thèmes</Link>
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