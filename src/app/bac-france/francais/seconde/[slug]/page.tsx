'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// FRANÇAIS SECONDE — PAGE SLUG COMPLÈTE
// 4 objets d'étude : Poésie · Littérature d'idées · Roman · Théâtre
// Route : /bac-france/francais/seconde/[slug]
// Programme officiel MEN 2026 — Seconde Générale & Technologique
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Notion clé', prop:'Propriété', methode:'Méthode' }

// ─── Navigation globale ───────────────────────────────────────────────
const NAV_ORDER = [
  'poesie-moyen-age-xviiie',
  'litterature-idees-presse',
  'roman-recit-xviiie-xxie',
  'theatre-xviie-xxie',
]
const TITRES_NAV: Record<string,string> = {
  'poesie-moyen-age-xviiie':  'OBJ.01 — La Poésie du Moyen Âge au XVIIIe',
  'litterature-idees-presse': 'OBJ.02 — Littérature d\'idées & Presse',
  'roman-recit-xviiie-xxie':  'OBJ.03 — Le Roman et le Récit',
  'theatre-xviie-xxie':       'OBJ.04 — Le Théâtre',
}
const SEC_COLORS: Record<string,string> = {
  'poesie-moyen-age-xviiie':  '#ec4899',
  'litterature-idees-presse': '#f59e0b',
  'roman-recit-xviiie-xxie':  '#8b5cf6',
  'theatre-xviie-xxie':       '#06b6d4',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — 4 OBJETS D'ÉTUDE COMPLETS
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
// OBJET D'ÉTUDE 1 — LA POÉSIE DU MOYEN ÂGE AU XVIIIe SIÈCLE
// ═══════════════════════════════════════════════════════════════════════
'poesie-moyen-age-xviiie': {
  id: 'poesie-moyen-age-xviiie', emoji: '📜', badge: 'Objet d\'étude 1', color: '#ec4899',
  titre: 'La Poésie du Moyen Âge au XVIIIe siècle',
  desc: 'Formes poétiques, langage poétique, musicalité et figures de style — Du Bellay, Ronsard, Villon, La Fontaine. Programme Seconde MEN 2026.',
  souschapitres: [
    {
      id: 'sc-formes-poetiques', titre: '1.1 Les Formes poétiques',
      notions: ['Sonnet · Ode · Ballade · Élégie','Structure des formes fixes','Rimes (croisées, embrassées, plates)','Vers et strophes'],
      blocs: [
        {
          notion: '📜 Le Sonnet',
          theoremes: [
            { id: 'D-S1', type: 'def', nom: 'Définition du Sonnet',
              enonce: 'Le sonnet est une forme poétique fixe composée de 14 vers, répartis en :\n• 2 quatrains (4 vers) — exposition\n• 2 tercets (3 vers) — développement et chute\n\nSchéma de rimes classique (Marot) : ABBA ABBA CCD EDE\nSchéma shakespearien : ABAB CDCD EFEF GG\n\nOrigine : Italie (Pétrarque) → France (Pléiade : Du Bellay, Ronsard)' },
            { id: 'F-S1', type: 'formule', nom: 'Structure du sonnet pétrarquiste',
              enonce: 'Octave (8 vers) = 2 quatrains\n→ Exposent une situation, un sentiment\n\nSexte (6 vers) = 2 tercets\n→ Développement + chute (volta) — tournant du poème\n\nLa volta marque un changement de ton, de point de vue ou de conclusion.' },
            { id: 'M-S1', type: 'methode', nom: 'Analyser un sonnet',
              enonce: '1. Identifier la forme : nombre de vers, strophes, schéma de rimes\n2. Repérer le thème dominant (amour, nature, temps...)\n3. Analyser la progression octave → sexte\n4. Identifier la volta : où se situe le tournant ?\n5. Étudier les figures de style et leur effet\n6. Conclure sur le message du poète' },
          ],
          exercices: [
            { id: 'EX-S1', niveau: 'Facile', titre: 'Identifier un sonnet',
              enonce: 'Comptez les vers et strophes du poème suivant. S\'agit-il d\'un sonnet ? Justifiez. (Référence : Heureux qui comme Ulysse — Du Bellay)',
              correction: 'Un sonnet comporte 14 vers = 2 quatrains + 2 tercets.\nHeureux qui comme Ulysse (Les Regrets, Du Bellay) : 4+4+3+3 = 14 vers ✓ → C\'est bien un sonnet.\nSchéma de rimes : ABBA ABBA CCD EDE (sonnet pétrarquiste).' },
            { id: 'EX-S2', niveau: 'Intermédiaire', titre: 'La volta dans un sonnet',
              enonce: 'Dans "Heureux qui comme Ulysse" de Du Bellay, identifiez la volta et expliquez le changement qu\'elle introduit.',
              correction: 'La volta se situe à l\'entrée du premier tercet (vers 9).\nDans les quatrains : éloge du voyage et du retour d\'Ulysse et Jason.\nDans les tercets : Du Bellay oppose le retour héroïque à sa propre situation d\'exilé à Rome.\nChangement : de l\'admiration générale à la plainte personnelle → dimension autobiographique.' },
          ],
        },
        {
          notion: '🎵 Musicalité et rythme',
          theoremes: [
            { id: 'D-M1', type: 'def', nom: 'L\'alexandrin',
              enonce: 'L\'alexandrin est un vers de 12 syllabes, divisé en deux hémistiches de 6 syllabes séparés par une césure.\n\nExemple : "Je / sui / s le / té /né / breux //— le / veu/f — l\'in/con/so/lé"\n(Nerval, El Desdichado)\n\nLe compte des syllabes : le "e" muet compte sauf en fin de vers ou devant voyelle (élision).' },
            { id: 'F-M1', type: 'formule', nom: 'Principales figures de sonorité',
              enonce: '• Allitération : répétition de consonnes — "Pour qui sont ces serpents qui sifflent sur vos têtes"\n• Assonance : répétition de voyelles — "Les sanglots longs des violons"\n• Anaphore : répétition en début de vers — "Rome, l\'unique objet de mon ressentiment"\n• Écho et rime : correspondances sonores entre les vers' },
          ],
          exercices: [
            { id: 'EX-M1', niveau: 'Facile', titre: 'Compter les syllabes',
              enonce: 'Comptez les syllabes de ce vers de Racine : "La fille de Minos et de Pasiphaé"',
              correction: 'La / fil / le / de / Mi / nos / et / de / Pa / si / pha / é = 12 syllabes\nLe "e" de "fille" compte car il est suivi d\'une consonne. C\'est un alexandrin ✓' },
            { id: 'EX-M2', niveau: 'Intermédiaire', titre: 'Identifier les figures de sonorité',
              enonce: 'Dans "Pour qui sont ces serpents qui sifflent sur vos têtes" (Racine), identifiez la figure de sonorité et son effet.',
              correction: 'Allitération en [s] : répétition du son /s/ dans "sont, serpents, sifflent, sur".\nEffet : imite le sifflement des serpents → crée un effet acoustique de menace et de danger. Renforce la dimension terrifiante de la vision.' },
          ],
        },
        {
          notion: '✒️ Auteurs et œuvres — Du Bellay, Ronsard, La Fontaine',
          theoremes: [
            { id: 'D-A1', type: 'def', nom: 'La Pléiade et l\'humanisme',
              enonce: 'La Pléiade (XVIe siècle) est un groupe de poètes humanistes français :\n→ Joachim du Bellay, Pierre de Ronsard, Pontus de Tyard...\n\nIdéaux :\n• Imiter les Anciens (Grecs et Latins) pour surpasser les modèles\n• Enrichir la langue française\n• Thèmes : amour, nature, temps qui passe (carpe diem), patrie\n\nŒuvres phares :\n• Du Bellay : Les Regrets (1558), Les Antiquités de Rome\n• Ronsard : Les Amours (1552), Odes' },
            { id: 'D-A2', type: 'def', nom: 'Jean de La Fontaine — La Fable',
              enonce: 'La Fontaine (1621-1695) renouvelle la fable en France au XVIIe siècle.\nSource : Ésope (Grec) et Phèdre (Latin)\n\nStructure de la fable :\n• Récit narratif (personnages, action)\n• Morale explicite ou implicite (leçon)\n• Animaux = allégories humaines\n\nLivres des Fables : 12 livres (1668-1694)\nExemples : Le Corbeau et le Renard · La Cigale et la Fourmi · Le Lièvre et la Tortue' },
          ],
          exercices: [
            { id: 'EX-A1', niveau: 'Facile', titre: 'La morale d\'une fable',
              enonce: 'Dans "La Cigale et la Fourmi" (La Fontaine), quelle est la morale implicite ? Quel trait humain critique-t-elle ?',
              correction: 'Morale implicite : il faut travailler et prévoir l\'avenir plutôt que de se divertir sans penser aux conséquences.\nLa cigale représente l\'insouciance et l\'imprévoyance. La fourmi représente la prévoyance et le travail.\nCritique : l\'imprudence, la légèreté face aux difficultés futures.\nNota : La Fontaine ne dit pas explicitement "travaillez", mais la conclusion ("Elle alla crier famine") suffit.' },
            { id: 'EX-A2', niveau: 'Intermédiaire', titre: 'L\'exil dans Les Regrets',
              enonce: 'Dans "Heureux qui comme Ulysse", du Bellay compare sa situation à celle d\'Ulysse et Jason. Analysez ce procédé et son effet sur le lecteur.',
              correction: 'Procédé : comparaison mythologique (référence à l\'Antiquité).\nEffet :\n→ Valorisation : Du Bellay se compare à des héros épiques\n→ Mais contraste : eux sont rentrés triomphants, lui est exilé à Rome, séparé d\'Anjou\n→ La comparaison souligne l\'amertume et la nostalgie (thème du mal du pays)\n→ Le dernier vers "Plus que le marbre dur me plaît l\'ardoise fine" : retour à la simplicité de la patrie vs. grandeur de Rome.' },
          ],
        },
      ],
    },
    {
      id: 'sc-figures-style', titre: '1.2 Les Figures de style et leur analyse',
      notions: ['Métaphore · Comparaison · Personnification','Hyperbole · Antithèse · Oxymore','Ironie · Allégorie · Symbole','Anaphore · Chiasme · Gradation'],
      blocs: [
        {
          notion: '🔤 Figures de substitution et d\'analogie',
          theoremes: [
            { id: 'D-FS1', type: 'def', nom: 'Métaphore et comparaison',
              enonce: 'COMPARAISON : rapprochement de deux éléments avec un outil comparatif (comme, tel, semblable à...)\nEx : "Il est fort comme un lion"\n\nMÉTAPHORE : rapprochement sans outil comparatif — identification directe\nEx : "C\'est un lion" (pour désigner un homme courageux)\n\nMétaphore filée : métaphore développée sur plusieurs vers ou tout un texte' },
            { id: 'D-FS2', type: 'def', nom: 'Personnification et allégorie',
              enonce: 'PERSONNIFICATION : attribution de caractéristiques humaines à un objet, animal ou idée abstraite\nEx : "La mer qui pleure", "Le vent qui gémit"\n\nALLÉGORIE : représentation concrète d\'une idée abstraite sous forme de personnage ou récit\nEx : La Justice = une femme aux yeux bandés tenant une balance\nEx littéraire : les animaux de La Fontaine représentent des types humains' },
            { id: 'D-FS3', type: 'def', nom: 'Hyperbole, antithèse, oxymore',
              enonce: 'HYPERBOLE : exagération pour amplifier le propos\nEx : "Je t\'ai dit mille fois"\n\nANTITHÈSE : opposition de deux idées dans le même énoncé\nEx : "Je vis, je meurs ; je me brûle et me noie" (Louise Labé)\n\nOXYMORE : alliance de deux termes contradictoires\nEx : "Cette obscure clarté" (Corneille, Le Cid)\n      "Un soleil noir" (Nerval)' },
          ],
          exercices: [
            { id: 'EX-FS1', niveau: 'Facile', titre: 'Identifier les figures',
              enonce: 'Identifiez la figure de style dans chaque exemple :\na) "Ses cheveux d\'or" (Ronsard)\nb) "Je vis, je meurs" (Louise Labé)\nc) "Cette obscure clarté" (Corneille)',
              correction: 'a) "Ses cheveux d\'or" → Métaphore : les cheveux sont comparés à de l\'or sans outil de comparaison\nb) "Je vis, je meurs" → Antithèse : opposition vivre/mourir dans le même vers\nc) "Cette obscure clarté" → Oxymore : association de deux termes contradictoires (obscure ≠ clarté)' },
            { id: 'EX-FS2', niveau: 'Intermédiaire', titre: 'Analyser l\'effet d\'une figure',
              enonce: 'Dans "Mignonne, allons voir si la rose" (Ronsard), identifiez la figure principale et analysez son effet dans le contexte du poème.',
              correction: 'Figure : la rose est une allégorie/métaphore filée de la femme aimée et de la jeunesse.\nRonsard compare implicitement la rose qui se fane à la beauté de la jeune femme qui passera.\nEffet : créer une leçon de carpe diem — profitez de la jeunesse maintenant.\nLa fragilité de la rose = fragilité de la jeunesse et de la beauté humaine.\nDimension mélancolique : la beauté est éphémère comme la rose.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// OBJET D'ÉTUDE 2 — LITTÉRATURE D'IDÉES ET LA PRESSE
// ═══════════════════════════════════════════════════════════════════════
'litterature-idees-presse': {
  id: 'litterature-idees-presse', emoji: '📰', badge: 'Objet d\'étude 2', color: '#f59e0b',
  titre: 'La Littérature d\'idées et la Presse du XIXe au XXIe siècle',
  desc: 'Argumentation, esprit critique, rôle des médias — Voltaire, Zola, Camus, Hugo. Analyse de discours, essais et articles de presse. Programme Seconde MEN 2026.',
  souschapitres: [
    {
      id: 'sc-argumentation', titre: '2.1 L\'argumentation et ses techniques',
      notions: ['Types d\'arguments : logique, autorité, exemple, affectif','Concession · Réfutation · Ironie','Convaincre vs. persuader','Structure d\'un texte argumentatif'],
      blocs: [
        {
          notion: '💡 Types d\'arguments et stratégies',
          theoremes: [
            { id: 'D-AR1', type: 'def', nom: 'Convaincre et persuader',
              enonce: 'CONVAINCRE : faire appel à la raison — arguments logiques, preuves, démonstration\n→ Vise l\'intellect\n→ Ex : discours scientifique, argumentation juridique\n\nPERSUADER : faire appel aux émotions et à la sensibilité\n→ Vise le cœur et les sentiments\n→ Ex : publicité, discours politique passionné\n\nUn texte argumentatif peut combiner les deux stratégies.' },
            { id: 'F-AR1', type: 'formule', nom: 'Les 5 types d\'arguments principaux',
              enonce: '1. Argument logique : raisonnement (si A alors B)\n2. Argument d\'autorité : citation d\'expert ou personnalité reconnue\n3. Argument par l\'exemple : cas concret illustrant la thèse\n4. Argument affectif (pathos) : appel aux émotions du lecteur\n5. Argument par analogie : comparaison avec une situation similaire\n\nAux arguments s\'opposent les contre-arguments (antithèse).' },
            { id: 'M-AR1', type: 'methode', nom: 'Identifier la thèse d\'un texte',
              enonce: '1. Lire le texte en entier\n2. Se demander : "Quelle est l\'idée principale défendue ?"\n3. Repérer les verbes d\'opinion : "je pense que", "il faut", "il est nécessaire"\n4. Chercher la conclusion : elle contient souvent la thèse\n5. Distinguer thèse (opinion de l\'auteur) et antithèse (opinion adverse)\n6. Repérer les arguments qui soutiennent la thèse' },
          ],
          exercices: [
            { id: 'EX-AR1', niveau: 'Facile', titre: 'Identifier les types d\'arguments',
              enonce: 'Dans "J\'accuse" de Zola, identifiez : a) un argument d\'autorité, b) un argument logique, c) un appel aux émotions.',
              correction: 'a) Argument d\'autorité : Zola cite les expertises militaires et les témoignages d\'officiers\nb) Argument logique : si les preuves sont fausses, alors la condamnation est injuste (syllogisme)\nc) Appel aux émotions : le sort d\'un homme innocent condamné à tort suscite indignation et pitié\nNota : "J\'accuse" est un pamphlet — il combine argumentation rationnelle et persuasion émotionnelle.' },
            { id: 'EX-AR2', niveau: 'Intermédiaire', titre: 'L\'ironie comme argument',
              enonce: 'Dans "Candide" (Voltaire), l\'ironie est une arme argumentative. Expliquez comment Voltaire utilise l\'ironie pour critiquer l\'optimisme de Leibniz.',
              correction: 'Voltaire fait dire à Pangloss que "tout est pour le mieux dans le meilleur des mondes possibles" alors que les personnages connaissent catastrophes, guerres et injustices.\nL\'ironie fonctionne par contraste : les paroles naïves de Pangloss s\'opposent aux horreurs vécues.\nEffet : le lecteur perçoit l\'absurdité de l\'optimisme aveugle → Voltaire critique sans dire directement que Leibniz a tort.\nL\'ironie = procédé de distanciation qui dénonce en faisant rire.' },
          ],
        },
        {
          notion: '📰 La presse et les médias',
          theoremes: [
            { id: 'D-PR1', type: 'def', nom: 'Les genres journalistiques',
              enonce: 'INFORMATION :\n• Article d\'information : faits, qui/quoi/où/quand/comment/pourquoi\n• Reportage : témoignage direct\n• Brève : information courte\n\nOPINION :\n• Éditorial : point de vue de la rédaction\n• Chronique : rubrique régulière d\'un journaliste\n• Tribune : texte d\'opinion signé par un expert ou personnalité\n• Pamphlet : texte virulent de dénonciation\n\nDIFFÉRENCE CLÉ : article d\'information = faits / article d\'opinion = jugements' },
            { id: 'D-PR2', type: 'def', nom: 'Les procédés rhétoriques du discours',
              enonce: 'ANAPHORE : répétition en début de phrases pour marteler une idée\n→ "Il faut agir. Il faut résister. Il faut construire." (discours politique)\n\nGRADATION : progression ascendante ou descendante\n→ "Je l\'accuse, je le dénonce, je le condamne"\n\nCHIASME : croisement symétrique de deux éléments\n→ "Il faut manger pour vivre et non vivre pour manger" (Molière)\n\nQUESTION RHÉTORIQUE : question sans réponse attendue — force l\'adhésion' },
          ],
          exercices: [
            { id: 'EX-PR1', niveau: 'Facile', titre: 'Genre journalistique',
              enonce: 'Classez ces titres selon leur genre : a) "Résultats du baccalauréat 2026" b) "La réforme du lycée, une chance manquée" c) "Lettre à un lycéen de 2030"',
              correction: 'a) "Résultats du baccalauréat 2026" → Article d\'information : faits, chiffres\nb) "La réforme du lycée, une chance manquée" → Éditorial ou chronique d\'opinion : jugement de valeur ("chance manquée")\nc) "Lettre à un lycéen de 2030" → Tribune ou texte d\'opinion : forme épistolaire, adresse directe' },
            { id: 'EX-PR2', niveau: 'Intermédiaire', titre: 'Analyser "J\'accuse" de Zola',
              enonce: 'Pourquoi "J\'accuse" (1898) de Zola est-il considéré comme un texte fondateur de l\'engagement de l\'intellectuel dans la vie publique ?',
              correction: '"J\'accuse" marque le moment où un écrivain célèbre quitte sa sphère littéraire pour intervenir dans une affaire d\'État (l\'Affaire Dreyfus).\n→ Zola utilise sa notoriété comme arme\n→ Il accepte le risque judiciaire (il sera condamné)\n→ Il parle au nom de la justice et de la vérité contre l\'armée et le pouvoir\nConséquence historique : acquittement de Dreyfus (1906)\nIl crée le concept moderne d\'intellectuel engagé — Sartre, Camus suivront.' },
          ],
        },
      ],
    },
    {
      id: 'sc-auteurs-idees', titre: '2.2 Auteurs de la littérature d\'idées',
      notions: ['Voltaire : conte philosophique · ironie','Zola : naturalisme · engagement','Camus : absurde · humanisme','Victor Hugo : romantisme · défense des opprimés'],
      blocs: [
        {
          notion: '✒️ Voltaire — L\'ironie philosophique',
          theoremes: [
            { id: 'D-V1', type: 'def', nom: 'Voltaire et le conte philosophique',
              enonce: 'Voltaire (1694-1778) est un philosophe des Lumières.\nIl utilise le conte philosophique pour critiquer la société sans censure directe.\n\nCaractéristiques du conte philosophique :\n• Récit fictif (voyage, aventures, personnages naïfs)\n• But réel : dénoncer les abus (guerre, esclavage, fanatisme, inégalités)\n• Ton : ironie, humour, légèreté apparente cachant une critique sévère\n• Naïveté du héros = miroir grossissant des absurdités humaines\n\nŒuvres : Candide (1759) · Zadig · L\'Ingénu · Micromégas' },
          ],
          exercices: [
            { id: 'EX-V1', niveau: 'Intermédiaire', titre: 'L\'ironie dans Candide',
              enonce: 'Analysez la phrase : "Il est démontré que les choses ne peuvent être autrement, car tout étant fait pour une fin, tout est nécessairement pour la meilleure fin." (Pangloss, Candide). En quoi est-ce ironique ?',
              correction: 'Pangloss récite la philosophie de Leibniz (optimisme) avec un ton dogmatique ("il est démontré").\nL\'ironie : cette affirmation est dite dans un contexte de catastrophes (tremblement de terre, guerre...).\nContraste entre la sérénité philosophique de Pangloss et les horreurs réelles → l\'optimisme devient absurde.\nVoltaire critique l\'aveuglement face à la réalité et la pensée dogmatique.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// OBJET D'ÉTUDE 3 — LE ROMAN ET LE RÉCIT
// ═══════════════════════════════════════════════════════════════════════
'roman-recit-xviiie-xxie': {
  id: 'roman-recit-xviiie-xxie', emoji: '📖', badge: 'Objet d\'étude 3', color: '#8b5cf6',
  titre: 'Le Roman et le Récit du XVIIIe au XXIe siècle',
  desc: 'Narration, personnages, critique sociale — Balzac, Flaubert, Maupassant, Proust. Roman réaliste, autobiographie, nouvelle. Programme Seconde MEN 2026.',
  souschapitres: [
    {
      id: 'sc-narration', titre: '3.1 La narration et ses techniques',
      notions: ['Narrateur : interne · externe · omniscient','Point de vue (focalisation) : zéro · interne · externe','Temps du récit : ordre · durée · fréquence','Discours direct · indirect · indirect libre'],
      blocs: [
        {
          notion: '🔭 Le point de vue narratif (focalisation)',
          theoremes: [
            { id: 'D-N1', type: 'def', nom: 'Les trois focalisations',
              enonce: 'FOCALISATION ZÉRO (narrateur omniscient) :\n→ Le narrateur sait tout sur tous les personnages\n→ Il accède aux pensées, sentiments de chacun\n→ Ex : romans réalistes (Balzac, Flaubert)\n\nFOCALISATION INTERNE :\n→ On ne voit que ce que voit/pense UN personnage\n→ Le lecteur est limité à sa perspective\n→ Ex : journaux intimes, monologues intérieurs (Proust)\n\nFOCALISATION EXTERNE :\n→ Le narrateur ne donne que ce qui est observable de l\'extérieur\n→ Pas d\'accès aux pensées\n→ Ex : romans behavioristes, certains romans policiers' },
            { id: 'D-N2', type: 'def', nom: 'Les types de discours rapportés',
              enonce: 'DISCOURS DIRECT : les paroles sont rapportées telles quelles, entre guillemets\n→ "Je viendrai demain", dit-il.\n\nDISCOURS INDIRECT : les paroles sont intégrées dans la syntaxe de la phrase principale\n→ Il dit qu\'il viendrait le lendemain.\n\nDISCOURS INDIRECT LIBRE : mélange de voix — les paroles/pensées sont intégrées sans verbe introducteur\n→ Il viendrait demain. Oui, il en était sûr.\n(on ne sait pas si c\'est le narrateur ou le personnage qui pense)' },
          ],
          exercices: [
            { id: 'EX-N1', niveau: 'Facile', titre: 'Identifier la focalisation',
              enonce: 'Identifiez la focalisation dans cet extrait de Madame Bovary : "Emma Bovary se demandait pourquoi elle avait épousé Charles. Elle le regardait dormir, et se disait qu\'elle méritait mieux que ça."',
              correction: 'Focalisation interne : le narrateur est dans la tête d\'Emma.\nOn accède à ses pensées ("se demandait", "se disait") — le lecteur partage exclusivement son point de vue.\nNotez que l\'on ne sait pas ce que pense Charles → focalisation interne sur Emma uniquement.' },
            { id: 'EX-N2', niveau: 'Intermédiaire', titre: 'Le discours indirect libre',
              enonce: 'Identifiez le procédé et son effet dans : "Elle était bien naïve de croire à sa promesse. Les hommes ne changeaient jamais. Il reviendrait, certes, mais pour mieux mentir."',
              correction: 'Discours indirect libre : les pensées du personnage sont intégrées sans guillemets ni verbe introducteur.\nOn hésite entre la voix du narrateur et celle du personnage → ambiguïté volontaire.\nEffet : le lecteur est dans la tête du personnage sans que cela soit explicitement dit → immersion, intimité\nIl peut aussi créer de l\'ironie si le lecteur sait que le personnage se trompe.' },
          ],
        },
        {
          notion: '👤 Le personnage de roman',
          theoremes: [
            { id: 'D-P1', type: 'def', nom: 'Construction du personnage',
              enonce: 'Le personnage est construit par :\n\n1. PORTRAIT PHYSIQUE : description de l\'apparence\n→ Souvent révèle le caractère (physiognomonie balzacienne)\n\n2. PORTRAIT MORAL/PSYCHOLOGIQUE : traits de caractère, valeurs\n\n3. ACTIONS : ce que fait le personnage révèle ce qu\'il est\n\n4. PAROLES : le dialogue caractérise (niveau de langue, idées...)\n\n5. REGARD DES AUTRES : ce que les autres personnages pensent de lui\n\n6. NOM : souvent symbolique (Goriot = goret ? Bovary = bovin ?)' },
            { id: 'D-P2', type: 'def', nom: 'Types de personnages',
              enonce: 'PERSONNAGE PLAT (type) : un seul trait dominant, prévisible, sans évolution\n→ Ex : l\'avare (Harpagon), le naïf (Candide)\n\nPERSONNAGE ROND (complexe) : plusieurs facettes, évolue au cours du récit\n→ Ex : Emma Bovary — romantique/déçue/manipulatrice/naïve\n\nPERSONNAGE ÉPONYME : donne son nom au titre du roman\n→ Ex : Manon Lescaut · Madame Bovary · Germinal\n\nFONCTIONS : héros · antagoniste · adjuvant · opposant (schéma actantiel)' },
          ],
          exercices: [
            { id: 'EX-P1', niveau: 'Facile', titre: 'Personnage plat ou rond ?',
              enonce: 'Classez ces personnages : a) Harpagon (L\'Avare, Molière) b) Emma Bovary (Madame Bovary, Flaubert) c) Candide (Voltaire). Justifiez.',
              correction: 'a) Harpagon → personnage plat : un seul trait dominant, l\'avarice, sans évolution, caricatural\nb) Emma Bovary → personnage rond : romantique, déçue, manipulatrice, naïve ; elle évolue et se transforme tout au long du roman\nc) Candide → personnage plat au départ (naïf pur), mais il acquiert une sagesse à la fin ("il faut cultiver notre jardin") → évolution partielle' },
          ],
        },
      ],
    },
    {
      id: 'sc-realisme', titre: '3.2 Le réalisme et le naturalisme',
      notions: ['Réalisme : reproduction fidèle du réel','Naturalisme : déterminisme social et biologique','Balzac · Flaubert · Zola · Maupassant','Critique sociale à travers le roman'],
      blocs: [
        {
          notion: '🏙️ Le réalisme (XIXe siècle)',
          theoremes: [
            { id: 'D-R1', type: 'def', nom: 'Le mouvement réaliste',
              enonce: 'Le réalisme (1830-1880) veut reproduire la réalité sociale avec précision.\n\nPrincipes :\n• Observation du monde contemporain\n• Description minutieuse des milieux sociaux\n• Personnages ordinaires (pas de héros exceptionnels)\n• Critique implicite de la société\n\nAuteurs : Balzac, Stendhal, Flaubert, Maupassant\n\nŒuvres phares :\n• La Comédie humaine (Balzac) — tableau de la société française\n• Madame Bovary (Flaubert) — la province bourgeoise\n• Bel-Ami (Maupassant) — ascension sociale par l\'opportunisme' },
          ],
          exercices: [
            { id: 'EX-R1', niveau: 'Intermédiaire', titre: 'La description réaliste',
              enonce: 'Dans l\'incipit du Père Goriot (Balzac), la pension Vauquer est décrite minutieusement. Pourquoi une telle description ? Quel est son rôle dans un roman réaliste ?',
              correction: 'La description de la pension Vauquer remplit plusieurs fonctions réalistes :\n1. Ancrage dans le réel : détails précis (odeurs, meubles, atmosphère) créent l\'illusion de réalité\n2. Révélateur social : la pension misérable révèle la condition de ses pensionnaires (pauvres, déchus)\n3. Milieu déterminant : selon Balzac, le cadre de vie forme les personnages → déterminisme social\n4. Symbolique : la décadence de la pension préfigure celle de ses habitants\nBalzac dit que l\'on peut lire le caractère des gens dans leur milieu.' },
          ],
        },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// OBJET D'ÉTUDE 4 — LE THÉÂTRE
// ═══════════════════════════════════════════════════════════════════════
'theatre-xviie-xxie': {
  id: 'theatre-xviie-xxie', emoji: '🎭', badge: 'Objet d\'étude 4', color: '#06b6d4',
  titre: 'Le Théâtre du XVIIe au XXIe siècle',
  desc: 'Genres théâtraux, conflit dramatique, dialogue — Molière, Racine, Corneille, Musset. Tragédie, comédie, drame romantique. Programme Seconde MEN 2026.',
  souschapitres: [
    {
      id: 'sc-genres-theatraux', titre: '4.1 Les genres théâtraux',
      notions: ['Tragédie : hamartia · catharsis · destin','Comédie : comique de situation/mots/gestes/caractère','Drame romantique : mélange des genres','Théâtre contemporain : épique · absurde'],
      blocs: [
        {
          notion: '⚡ La tragédie classique',
          theoremes: [
            { id: 'D-T1', type: 'def', nom: 'La tragédie et ses règles',
              enonce: 'La tragédie classique (XVIIe siècle) obéit à des règles strictes :\n\nRÈGLE DES TROIS UNITÉS :\n• Unité de temps : l\'action dure 24 heures maximum\n• Unité de lieu : l\'action se déroule en un seul endroit\n• Unité d\'action : une seule intrigue principale\n\nRÈGLE DE BIENSÉANCE : on ne montre pas la violence sur scène\nRÈGLE DE VRAISEMBLANCE : l\'action doit sembler possible\n\nHÉROS TRAGIQUE : issu d\'une famille noble, victime d\'une faute (hamartia)\nDÉNOUEMENT : mort ou malheur inéluctable → CATHARSIS (purification des passions)' },
            { id: 'D-T2', type: 'def', nom: 'La comédie classique',
              enonce: 'La comédie vise à faire rire pour corriger les mœurs (castigat ridendo mores).\n\nTypes de comique :\n• Comique de situation : quiproquo, méprise, travestissement\n• Comique de mots : jeux de mots, répétitions absurdes, patois\n• Comique de gestes : lazzi, coups de bâton, mimiques\n• Comique de caractère : un défaut poussé à l\'extrême (avarice, hypocrisie)\n\nMolière (1622-1673) :\nL\'Avare · Le Misanthrope · Tartuffe · Le Bourgeois Gentilhomme\nChaque pièce cible un vice social à travers un personnage-type' },
          ],
          exercices: [
            { id: 'EX-T1', niveau: 'Facile', titre: 'Tragédie ou comédie ?',
              enonce: 'Classez ces pièces et justifiez : a) Phèdre (Racine) b) L\'Avare (Molière) c) On ne badine pas avec l\'amour (Musset)',
              correction: 'a) Phèdre (Racine) → TRAGÉDIE : héroïne noble (fille du roi Minos), passion interdite pour Hippolyte, mort finale, règle des 3 unités respectée, catharsis\nb) L\'Avare (Molière) → COMÉDIE : critique de l\'avarice d\'Harpagon, quiproquos, dénouement heureux (mariage), comique de caractère\nc) On ne badine pas avec l\'amour (Musset) → DRAME ROMANTIQUE : mélange du comique et du tragique, dénouement fatal (mort de Rosette), révolte contre les conventions, XVIIIe, non-respect des unités' },
            { id: 'EX-T2', niveau: 'Intermédiaire', titre: 'Les types de comique dans L\'Avare',
              enonce: 'Dans la scène du monologue d\'Harpagon ("Au voleur ! Au voleur !"), identifiez les différents types de comique à l\'œuvre.',
              correction: 'Comique de situation : Harpagon cherche le voleur et s\'attrape lui-même (quiproquo)\nComique de gestes : il gesticule, court partout, tombe peut-être\nComique de mots : répétitions ("Au voleur ! Au voleur !"), tirade excessive\nComique de caractère : l\'avarice poussée à l\'extrême rend la situation absurde\nIronie dramatique : le spectateur sait quelque chose que Harpagon ne sait pas\nL\'accumulation de ces comiques crée un effet burlesque qui tourne en dérision l\'avarice.' },
          ],
        },
        {
          notion: '🎪 La représentation théâtrale',
          theoremes: [
            { id: 'D-REP1', type: 'def', nom: 'Spécificité du théâtre',
              enonce: 'Le théâtre est un texte ÉCRIT pour être JOUÉ — double nature :\n\nTEXTE LU :\n• Didascalies (stage directions) : indications de mise en scène\n• Répliques, tirades, monologues, dialogues\n• Aparté : parole d\'un personnage destinée au public, pas aux autres\n\nSPECTACLE JOUÉ :\n• Décors, costumes, lumières, son\n• Corps des acteurs, voix, mouvement\n• Espace scénique : avant-scène, jardin/cour, coulisses\n\nTYPES DE RÉPLIQUES :\n• Monologue : personnage seul sur scène\n• Tirade : longue réplique d\'un personnage\n• Stichomythie : échange rapide de courtes répliques (tension)' },
          ],
          exercices: [
            { id: 'EX-REP1', niveau: 'Facile', titre: 'Didascalies et mise en scène',
              enonce: 'Que révèlent les didascalies sur la mise en scène ? Donnez un exemple tiré de n\'importe quelle pièce vue en classe.',
              correction: 'Les didascalies (italiques dans le texte) donnent les indications de mise en scène :\n→ Décor : "Une chambre bourgeoise" → situe l\'action socialement\n→ Gestes : "Il saisit le bras de..." → tension physique entre personnages\n→ Ton : "(ironiquement)" → indique l\'interprétation de l\'acteur\n→ Entrées/sorties : rythment l\'action\nExemple : dans L\'Avare, la didascalie "il s\'attrape lui-même le bras" illustre le comique de geste.' },
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

export default function FrancaisSecondeChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [activeTab, setActiveTab] = useState<string>('')

  const currentTabId = activeTab || (chapter?.souschapitres[0]?.id ?? '')
  const currentSC = chapter?.souschapitres.find(sc => sc.id === currentTabId) || chapter?.souschapitres[0]

  if (!chapter) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>📚</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/francais/seconde" className="btn btn-primary">← Retour Français Seconde</Link>
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
            <Link href="/bac-france/francais/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header chapitre */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>OBJ.0{idx+1}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(236,72,153,0.15)', color:'#f472b6', fontWeight:700 }}>📘 Seconde</span>
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
                  {/* En-tête sous-chapitre */}
                  <div style={{ marginBottom:20, padding:'14px 18px', background:`${secColor}0a`, border:`1px solid ${secColor}25`, borderRadius:12 }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>Sous-chapitre actif</div>
                    <div style={{ fontSize:16, fontWeight:800, color:secColor }}>{currentSC.titre}</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:8 }}>
                      {currentSC.notions.map(n => (
                        <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:14, background:`${secColor}15`, color:'var(--text2)', border:`1px solid ${secColor}20` }}>{n}</span>
                      ))}
                    </div>
                  </div>

                  {/* Blocs notion par notion */}
                  {currentSC.blocs.map(bloc => (
                    <div key={bloc.notion} style={{ marginBottom:36 }}>
                      {/* Titre notion */}
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:8, borderBottom:`2px solid ${secColor}20` }}>
                        <div style={{ width:3, height:22, background:secColor, borderRadius:2 }}/>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>{bloc.notion}</h2>
                      </div>

                      {/* Théorèmes / Définitions */}
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

                      {/* Exercices */}
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
                                <Link href={`/solve?subject=litterature&q=${encodeURIComponent('Français Seconde — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
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

              {/* Navigation prev/next */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/francais/seconde/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/francais/seconde/${nextSlug}`} style={{ textDecoration:'none' }}>
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
              {/* Navigation objets d'étude */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  📘 Seconde — 4 objets d'étude
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/francais/seconde/${s}`} style={{ textDecoration:'none' }}>
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

              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?subject=litterature&q=${encodeURIComponent('Explique-moi '+chapter.titre+' en Seconde')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/solve?subject=litterature" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📚 Solveur Français</Link>
                  <Link href="/bac-france/francais/premiere" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📗 Vers la Première EAF</Link>
                  <Link href="/bac-france/francais/seconde" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les objets d'étude</Link>
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