'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ════════════════════════════════════════════════════════════════════
// FRANÇAIS — SECTION LETTRES / [SLUG]
// Route : /bac/francais/lettres/[slug]
// Programme officiel MEN Tunisie · 4ème Lettres · 8 modules
// ════════════════════════════════════════════════════════════════════

const C = { thm: '#ec4899', def: '#f472b6', formule: '#d97706', prop: '#8b5cf6', methode: '#0891b2', loi: '#dc2626' }
const L: Record<string,string> = { thm: 'Thème', def: 'Définition', formule: 'Axe clé', prop: 'Propriété', methode: 'Méthode', loi: 'Auteur' }

const NAV_ORDER = [
  'partage', 'engagement-litterature', 'appel-modernite', 'lumiere-raison',
  'poesie', 'langue-expression', 'production-ecrite', 'culture-litteraire',
]

const TITRES_NAV: Record<string,string> = {
  'partage':              'M01 — Le Partage',
  'engagement-litterature':'M02 — L\'Engagement en Littérature',
  'appel-modernite':      'M03 — L\'Appel de la Modernité',
  'lumiere-raison':       'M04 — À la Lumière de la Raison',
  'poesie':               'M05 — La Poésie',
  'langue-expression':    'M06 — Langue & Expression',
  'production-ecrite':    'M07 — Production Écrite',
  'culture-litteraire':   'M08 — Culture Littéraire',
}

const SEC_COLORS: Record<string,string> = {
  'partage': '#ec4899',
  'engagement-litterature': '#7c3aed',
  'appel-modernite': '#0891b2',
  'lumiere-raison': '#d97706',
  'poesie': '#e11d48',
  'langue-expression': '#059669',
  'production-ecrite': '#7c3aed',
  'culture-litteraire': '#b45309',
}

type Bloc = { notion: string; theoremes: { id: string; type: string; nom: string; enonce: string; remarque?: string }[]; exercices: { id: string; niveau: string; titre: string; enonce: string; correction: string }[] }
type SC   = { id: string; titre: string; notions: string[]; blocs: Bloc[] }
type Chap = { id: string; titre: string; tag: string; color: string; emoji: string; desc: string; souschapitres: SC[] }

const ALL_MODULES: Record<string, Chap> = {

// ── MODULE 1 — LE PARTAGE ────────────────────────────────────────────
'partage': {
  id: 'partage', emoji: '🤝', tag: 'Lettres', color: '#ec4899',
  titre: 'Le Partage',
  desc: 'Le partage, la solidarité et le dialogue des cultures sont des valeurs universelles qui rapprochent les peuples et favorisent la paix. Ce module explore les textes argumentatifs et les témoignages sur la tolérance et le vivre ensemble.',
  souschapitres: [
    {
      id: 'sc-partage-themes', titre: '1.1 Thèmes et axes d\'argumentation',
      notions: ['Solidarité', 'Tolérance', 'Vivre ensemble', 'Dialogue des cultures', 'Respect de l\'autre'],
      blocs: [
        {
          notion: '🤝 Axes d\'argumentation principaux',
          theoremes: [
            { id: 'A-P1', type: 'formule', nom: 'Le partage rapproche les peuples',
              enonce: 'ARGUMENT PRINCIPAL :\nLe partage crée des liens entre les individus et les peuples.\n\nDÉVELOPPEMENT :\n• La générosité et l\'entraide renforcent les relations sociales\n• Le partage des cultures favorise la compréhension mutuelle\n• L\'échange des connaissances profite à tous\n\nEXEMPLES À UTILISER :\n• Les échanges culturels entre pays (musique, art, gastronomie)\n• Les organisations humanitaires internationales (Croix-Rouge, ONG)\n• Les programmes d\'aide au développement\n\nCITATION :\n« Nul n\'est une île » — John Donne',
              remarque: 'Toujours illustrer avec un exemple concret et une citation d\'auteur.' },
            { id: 'A-P2', type: 'formule', nom: 'La solidarité réduit les conflits',
              enonce: 'ARGUMENT :\nLa solidarité entre les peuples est un rempart contre les conflits.\n\nDÉVELOPPEMENT :\n• Les nations solidaires coopèrent plutôt qu\'elles ne s\'affrontent\n• L\'entraide internationale prévient les crises humanitaires\n• La solidarité économique réduit les inégalités sources de tensions\n\nEXEMPLES :\n• L\'Union Européenne : coopération pour éviter les guerres\n• Les accords de paix fondés sur des coopérations économiques\n• Les échanges universitaires Erasmus' },
            { id: 'A-P3', type: 'formule', nom: 'Le rejet de l\'autre crée la violence',
              enonce: 'CONTRE-ARGUMENT / THÈSE ADVERSE :\nL\'intolérance et le rejet de l\'autre mènent à la violence et aux conflits.\n\nEXEMPLES HISTORIQUES :\n• L\'apartheid en Afrique du Sud\n• Les génocides du 20ème siècle\n• La montée des extrémismes et de la xénophobie\n\nCONCLUSION POSSIBLE :\nSeuls le dialogue et le respect mutuel permettent de vivre ensemble en paix.' },
          ],
          exercices: [
            { id: 'EX-P1', niveau: 'Moyen', titre: 'Sujet de réflexion — Le partage',
              enonce: 'Sujet : « Le partage est le fondement de toute société harmonieuse. » Dans un essai argumentatif d\'une vingtaine de lignes, développez cette affirmation en vous appuyant sur des exemples précis.',
              correction: 'PLAN SUGGÉRÉ :\n\nINTRODUCTION : Définir le partage (matériel, culturel, intellectuel). Problématique : en quoi le partage est-il fondamental pour la société ?\n\nI. Le partage matériel crée la solidarité sociale\n   - Exemple : les associations caritatives, les banques alimentaires\n   - Citation : « L\'homme est un loup pour l\'homme » (Hobbes) → réfuter par le partage\n\nII. Le partage culturel favorise la compréhension mutuelle\n   - Exemple : les échanges interculturels, les festivals mondiaux\n   - Référence : Amin Maalouf, « Les Identités meurtrières »\n\nIII. Le partage des connaissances développe les sociétés\n   - Exemple : Internet, l\'éducation gratuite, la science ouverte\n\nCONCLUSION : Sans partage, la société se fragmente. C\'est par le partage que naît la paix.' },
          ],
        },
      ],
    },
    {
      id: 'sc-partage-auteurs', titre: '1.2 Auteurs et textes étudiés',
      notions: ['Albert Camus', 'Amin Maalouf', 'Tahar Ben Jelloun', 'Le racisme expliqué à ma fille'],
      blocs: [
        {
          notion: '✍️ Auteurs du module',
          theoremes: [
            { id: 'A-P4', type: 'loi', nom: 'Albert Camus (1913-1960)',
              enonce: 'PRÉSENTATION :\nAlbert Camus est un écrivain franco-algérien, Prix Nobel de Littérature 1957.\n\nŒUVRES PRINCIPALES :\n• « L\'Étranger » (1942) — roman de l\'absurde\n• « La Peste » (1947) — solidarité face au malheur collectif\n• « L\'Homme révolté » (1951) — essai philosophique\n\nIDÉES CLÉS :\n• La solidarité comme réponse à l\'absurde\n• La fraternité humaine face au malheur\n• Le refus de toute forme d\'oppression\n\nCITATION UTILE :\n« Au milieu de l\'hiver, j\'apprenais enfin qu\'il y avait en moi un été invincible. »',
              remarque: 'Camus est souvent associé aux thèmes du partage et de la solidarité dans les textes du Bac Lettres.' },
            { id: 'A-P5', type: 'loi', nom: 'Tahar Ben Jelloun — « Le Racisme expliqué à ma fille »',
              enonce: 'PRÉSENTATION DE L\'ŒUVRE :\nPublié en 1998, cet essai explique le racisme à travers un dialogue entre un père et sa fille.\n\nTHÈMES :\n• Qu\'est-ce que le racisme ? (peur de l\'autre, ignorance)\n• L\'importance de la tolérance et du respect\n• Comment lutter contre les préjugés\n\nEXTRAITS UTILES :\n• Définition du racisme : « avoir peur de celui qui est différent de nous »\n• L\'éducation comme antidote au racisme\n\nARGUMENTS TIRÉS DE L\'ŒUVRE :\n• La tolérance s\'apprend dès l\'enfance\n• L\'ignorance est la principale cause du racisme\n• Le dialogue interculturel est la solution' },
          ],
          exercices: [
            { id: 'EX-P2', niveau: 'Facile', titre: 'Comprendre l\'auteur',
              enonce: 'En vous référant à l\'œuvre de Tahar Ben Jelloun, expliquez en 5 lignes pourquoi l\'éducation est le principal remède au racisme.',
              correction: 'Selon Ben Jelloun, le racisme naît de l\'ignorance et de la peur de ce qui est différent. L\'éducation permet à l\'enfant de découvrir les autres cultures, de comprendre que la diversité est une richesse et non une menace. En apprenant à connaître l\'autre, on dépasse les préjugés et les stéréotypes. L\'école est donc le lieu privilégié pour transmettre les valeurs de tolérance et de respect mutuel, fondements d\'une société harmonieuse.' },
          ],
        },
      ],
    },
  ],
},

// ── MODULE 2 — L'ENGAGEMENT EN LITTÉRATURE ───────────────────────────
'engagement-litterature': {
  id: 'engagement-litterature', emoji: '✊', tag: 'Lettres', color: '#7c3aed',
  titre: "L'Engagement en Littérature",
  desc: "La littérature engagée place l'écrivain au service de causes justes : liberté, justice, défense des droits humains. Des auteurs comme Victor Hugo, Émile Zola et Sartre ont utilisé leurs œuvres comme armes contre l'oppression.",
  souschapitres: [
    {
      id: 'sc-eng-axes', titre: "2.1 Axes d'argumentation",
      notions: ['Liberté', 'Justice', "Droits humains", "Rôle de l'écrivain", "Engagement"],
      blocs: [
        {
          notion: "✊ L'écrivain engagé",
          theoremes: [
            { id: 'A-E1', type: 'formule', nom: "L'écrivain doit défendre la vérité",
              enonce: "ARGUMENT CENTRAL :\nL'écrivain a une responsabilité sociale et morale envers la société.\n\nDÉVELOPPEMENT :\n• L'écrivain dispose d'un pouvoir : la plume — plus fort que l'épée\n• Il doit dénoncer les injustices que le citoyen ordinaire ne peut voir\n• Sa notoriété lui confère une tribune et une responsabilité\n\nEXEMPLES :\n• Zola : « J'accuse » (1898) — défense de Dreyfus\n• Hugo : engagement contre la peine de mort\n• Sartre : engagement contre la guerre d'Algérie\n\nCITATION SARTRE :\n« L'écrivain est en situation dans son époque : chaque parole a des retentissements. »" },
            { id: 'A-E2', type: 'formule', nom: 'La littérature peut changer la société',
              enonce: "ARGUMENT :\nLes œuvres littéraires engagées ont réellement changé l'histoire.\n\nEXEMPLES HISTORIQUES :\n• « Uncle Tom's Cabin » (Stowe) → mobilisation contre l'esclavage\n• « Les Misérables » (Hugo) → prise de conscience des inégalités sociales\n• « 1984 » (Orwell) → avertissement contre les totalitarismes\n\nMÉCANISME D'ACTION :\nLa fiction permet d'émouvoir le lecteur, de le mettre à la place des opprimés, de créer de l'empathie. C'est plus efficace qu'un discours politique direct." },
            { id: 'A-E3', type: 'formule', nom: "L'art doit dénoncer l'injustice",
              enonce: "ARGUMENT :\nL'art (littérature, peinture, cinéma) est un outil de dénonciation des injustices.\n\nFORMES D'ENGAGEMENT ARTISTIQUE :\n• Roman social : Zola (Germinal), Dickens (Oliver Twist)\n• Poésie engagée : Éluard, Aragon (Résistance française)\n• Théâtre engagé : Brecht, Sartre\n• Essai : Voltaire (Candide, Traité sur la tolérance)\n\nARGUMENT CONTRE : L'art pour l'art\nCertains défendent que l'art ne doit pas servir une cause politique. Réfutation : Toute œuvre est le produit d'une époque et reflète des valeurs." },
          ],
          exercices: [
            { id: 'EX-E1', niveau: 'Difficile', titre: "Dissertation — L'engagement de l'écrivain",
              enonce: "Sujet : « L'écrivain doit-il s'engager dans les affaires de son temps ? » Répondez en développant un plan dialectique (thèse, antithèse, synthèse) en une vingtaine de lignes.",
              correction: "PLAN DIALECTIQUE :\n\nTHÈSE : L'écrivain doit s'engager\n- Sa plume est une arme : Zola, Hugo, Sartre\n- La littérature peut changer les mentalités\n- L'écrivain a une responsabilité envers la société\n\nANTITHÈSE : L'art pour l'art — l'écrivain n'a pas à s'engager\n- Flaubert : l'artiste doit rester neutre pour créer librement\n- L'engagement peut nuire à la qualité littéraire\n- La propagande déguisée en littérature est dangereuse\n\nSYNTHÈSE : L'écrivain libre choisit son engagement\n- Il peut s'engager sans perdre sa liberté créatrice\n- L'engagement sincère produit les plus grandes œuvres (Hugo, Zola)\n- L'art engagé = art humaniste universel\n\nCONCLUSION : L'engagement n'est pas une obligation mais une vocation pour les plus grands écrivains." },
          ],
        },
      ],
    },
    {
      id: 'sc-eng-auteurs', titre: '2.2 Auteurs et œuvres',
      notions: ['Victor Hugo', 'Émile Zola', 'Jean-Paul Sartre', 'Voltaire'],
      blocs: [
        {
          notion: '✍️ Auteurs incontournables',
          theoremes: [
            { id: 'A-E4', type: 'loi', nom: 'Victor Hugo (1802-1885)',
              enonce: "FIGURE DE L'ÉCRIVAIN ENGAGÉ :\n• Combat contre la peine de mort (« Le Dernier Jour d'un condamné »)\n• Défense des misérables (« Les Misérables »)\n• Opposition à Napoléon III (exil à Guernesey)\n\nCITATION CLÉE :\n« La misère est une maladie du corps social comme la tuberculose est une maladie du corps humain. »\n\nENGAGEMENT POLITIQUE :\nHugo est pair de France, puis républicain convaincu. Il utilise sa notoriété pour défendre les pauvres, les opprimés, les enfants." },
            { id: 'A-E5', type: 'loi', nom: "Émile Zola — « J'accuse » (1898)",
              enonce: "CONTEXTE : L'affaire Dreyfus\nAlfred Dreyfus, officier juif, accusé à tort d'espionnage.\n\n« J'ACCUSE » — Lettre ouverte au Président de la République, publiée dans L'Aurore le 13 janvier 1898.\n\nPORTÉE :\n• Dénonce l'antisémitisme et l'injustice de l'armée française\n• Divise la France en dreyfusards et anti-dreyfusards\n• Zola est condamné et s'exile en Angleterre\n• Dreyfus sera finalement réhabilité en 1906\n\nCITATION :\n« La vérité est en marche et rien ne l'arrêtera. »\n\nSIGNIFICATION POUR LE BAC :\nExemple parfait de l'écrivain qui utilise sa plume comme arme de justice." },
          ],
          exercices: [
            { id: 'EX-E2', niveau: 'Moyen', titre: "Analyse — L'engagement de Zola",
              enonce: "En vous appuyant sur « J'accuse », expliquez en 8 lignes comment Émile Zola illustre la puissance de la plume comme outil de justice.",
              correction: "Dans « J'accuse » (1898), Zola illustre parfaitement le pouvoir de la littérature engagée. En prenant la défense de Dreyfus, faussement accusé, il risque sa réputation et sa liberté. Sa lettre ouverte, publiée en première page de L'Aurore, mobilise l'opinion publique française et internationale. Le style direct et accusateur de Zola — répétant « J'accuse » — crée un effet rhétorique puissant. Cette œuvre montre que l'écrivain, par sa notoriété et son talent, peut influencer le cours de l'histoire, défier les institutions corrompues et contribuer au triomphe de la justice." },
          ],
        },
      ],
    },
  ],
},

// ── MODULE 3 — L'APPEL DE LA MODERNITÉ ────────────────────────────────
'appel-modernite': {
  id: 'appel-modernite', emoji: '🔬', tag: 'Lettres', color: '#0891b2',
  titre: "L'Appel de la Modernité",
  desc: "La modernité transforme nos sociétés à travers la technologie, la science et l'évolution des mœurs. Ce module explore la tension entre tradition et progrès, et les questions éthiques que soulève l'avancée technologique.",
  souschapitres: [
    {
      id: 'sc-mod-axes', titre: '3.1 Axes et textes',
      notions: ['Technologie', 'Modernisation', 'Tradition vs modernité', 'Progrès et dangers'],
      blocs: [
        {
          notion: '🔬 Axes d\'argumentation',
          theoremes: [
            { id: 'A-M1', type: 'formule', nom: 'Le progrès améliore la vie humaine',
              enonce: "ARGUMENT POUR LE PROGRÈS :\n\nDÉVELOPPEMENT :\n• Médecine : allongement de l'espérance de vie\n• Transports : réduction des distances\n• Communication : connexion mondiale instantanée\n• Éducation : accès au savoir pour tous via Internet\n\nEXEMPLES :\n• Vaccination : éradication de la variole\n• Internet : révolution de l'information\n• Énergies renouvelables : lutte contre le réchauffement\n\nCITATION DE RABELAIS :\n« Science sans conscience n'est que ruine de l'âme. »" },
            { id: 'A-M2', type: 'formule', nom: 'Il faut équilibrer tradition et progrès',
              enonce: "SYNTHÈSE / THÈSE NUANCÉE :\nNi refus total du progrès ni abandon des traditions.\n\nARGUMENT :\n• Les traditions portent l'identité culturelle et la mémoire des peuples\n• Le progrès doit servir l'humain, pas le dominer\n• Une modernité sans racines crée l'aliénation\n\nEXEMPLE :\n• Les sociétés asiatiques (Japon, Corée) : très technologiques tout en préservant leurs traditions\n• Les artisans qui allient savoir-faire ancestral et outils modernes\n\nARGUMENT FINAL :\nLe vrai progrès est celui qui respecte et enrichit l'humain." },
          ],
          exercices: [
            { id: 'EX-M1', niveau: 'Moyen', titre: 'Essai — Tradition et modernité',
              enonce: "Sujet : « La modernité et la tradition sont-elles incompatibles ? » En vous appuyant sur des exemples précis, développez votre point de vue en une vingtaine de lignes.",
              correction: "INTRODUCTION : La modernité semble s'opposer aux traditions en bouleversant les modes de vie. Mais cette opposition est-elle inévitable ?\n\n1. La modernité menace les traditions : uniformisation culturelle, perte des langues régionales, disparition des métiers artisanaux face à l'industrialisation.\n\n2. La tradition résiste et s'adapte : le Japon technologique qui préserve le théâtre Nô et le samouraï ; la Tunisie qui modernise son économie tout en maintenant ses fêtes et pratiques culturelles.\n\n3. La vraie modernité intègre les traditions : les architectes contemporains qui s'inspirent des techniques ancestrales ; l'alimentation biologique qui revient aux méthodes agricoles traditionnelles.\n\nCONCLUSION : Tradition et modernité ne sont pas incompatibles. La sagesse consiste à choisir ce que le progrès apporte de meilleur sans renier les héritages qui fondent notre identité." },
          ],
        },
      ],
    },
  ],
},

// ── MODULE 4 — À LA LUMIÈRE DE LA RAISON ─────────────────────────────
'lumiere-raison': {
  id: 'lumiere-raison', emoji: '💡', tag: 'Lettres', color: '#d97706',
  titre: 'À la Lumière de la Raison',
  desc: "Les philosophes des Lumières (18ème siècle) ont défendu la raison, la liberté de penser et l'éducation comme remparts contre l'ignorance et le fanatisme. Voltaire, Montesquieu et Diderot restent des références incontournables.",
  souschapitres: [
    {
      id: 'sc-lum-axes', titre: '4.1 Les Lumières — philosophes et idées',
      notions: ['Raison', 'Liberté de pensée', 'Éducation', 'Philosophie des Lumières', 'Lumières'],
      blocs: [
        {
          notion: '💡 Philosophes des Lumières',
          theoremes: [
            { id: 'A-L1', type: 'loi', nom: 'Voltaire (1694-1778)',
              enonce: "IDÉES PRINCIPALES :\n• Liberté de pensée et de conscience\n• Tolérance religieuse\n• Critique des fanatismes et des superstitions\n• Défense des victimes d'injustice\n\nŒUVRES CLÉES :\n• « Candide » (1759) — conte philosophique, satire de l'optimisme naïf\n• « Traité sur la tolérance » (1763) — après l'affaire Calas\n• « Dictionnaire philosophique » (1764)\n\nAFFAIRE CALAS :\nVoltaire défend Jean Calas, protestant condamné à mort injustement. Il obtient sa réhabilitation posthume.\n\nCITATION CÉLÈBRE :\n« Je ne suis pas d'accord avec ce que vous dites, mais je me battrai jusqu'à la mort pour que vous ayez le droit de le dire. »" },
            { id: 'A-L2', type: 'formule', nom: "La raison combat l'ignorance",
              enonce: "ARGUMENT CENTRAL DU MODULE :\nLa raison est l'outil par excellence de l'émancipation humaine.\n\nDÉVELOPPEMENT :\n• L'ignorance entretient les préjugés, les superstitions et le fanatisme\n• La raison, éclairée par la science, permet de distinguer le vrai du faux\n• L'éducation est le moyen de diffuser la raison dans la société\n\nEXEMPLES :\n• La lutte contre les fake news (raisonnement critique)\n• L'éducation scientifique contre les théories complotistes\n• Les Lumières contre l'obscurantisme religieux du 18ème siècle\n\nCITATION DIDEROT :\n« La raison est pour le philosophe ce que la grâce est pour le chrétien. »" },
          ],
          exercices: [
            { id: 'EX-L1', niveau: 'Moyen', titre: 'Analyse — Les Lumières',
              enonce: "En vous référant à Voltaire et aux philosophes des Lumières, expliquez en 10 lignes pourquoi ils considéraient l'éducation comme une priorité absolue.",
              correction: "Pour Voltaire et les philosophes des Lumières, l'éducation est la clé de l'émancipation humaine. Ils considèrent que l'ignorance est la source principale de tous les maux : fanatisme, superstition, injustice et tyrannie. En éduquant le peuple, on lui donne les outils de la raison pour résister aux manipulations des puissants et des fanatiques religieux. Voltaire lui-même, dans son « Dictionnaire philosophique », cherche à diffuser les idées critiques et rationalistes auprès du plus grand nombre. Diderot et D'Alembert, avec l'Encyclopédie, ont voulu recenser tout le savoir humain pour le rendre accessible. Pour les Lumières, un peuple instruit est un peuple libre, capable de penser par lui-même et de refuser l'arbitraire." },
          ],
        },
      ],
    },
  ],
},

// ── MODULE 5 — LA POÉSIE ──────────────────────────────────────────────
'poesie': {
  id: 'poesie', emoji: '🌸', tag: 'Lettres', color: '#e11d48',
  titre: 'La Poésie',
  desc: "La poésie est un art du langage qui joue sur les sons, les images et les émotions. Des romantiques (Lamartine) aux surréalistes (Éluard), en passant par Baudelaire, la poésie française explore tous les registres de l'âme humaine.",
  souschapitres: [
    {
      id: 'sc-poe-notions', titre: '5.1 Notions poétiques essentielles',
      notions: ['Métaphore', 'Comparaison', 'Symbolisme', 'Musicalité', 'Images poétiques'],
      blocs: [
        {
          notion: '🌸 Figures de style et analyse',
          theoremes: [
            { id: 'A-Po1', type: 'def', nom: 'Figures de style — Définitions',
              enonce: "MÉTAPHORE :\nComparaison implicite sans outil comparatif.\nEx : « La vie est un voyage. » (Pas de 'comme')\n\nCOMPARAISON :\nRapprochement explicite avec outil comparatif (comme, tel, semblable à).\nEx : « Le temps passe comme une rivière. »\n\nSYMBOLE :\nImage qui représente une idée abstraite.\nEx : La colombe = la paix ; la rose = l'amour\n\nPERSONNIFICATION :\nAttribuer des qualités humaines à un objet ou une idée.\nEx : « Le vent gémissait dans les arbres. »\n\nALLITÉRATION :\nRépétition de consonnes pour créer un effet sonore.\nEx : « Pour qui sont ces serpents qui sifflent sur vos têtes ? » (Racine)" },
            { id: 'A-Po2', type: 'loi', nom: 'Charles Baudelaire — Les Fleurs du Mal (1857)',
              enonce: "PRÉSENTATION :\nRecueil de poèmes majeur de la littérature française.\nThème central : la tension entre la Beauté idéale et la condition humaine misérable (le Spleen).\n\nPOÈMES CLÉES :\n• « L'Albatros » : le poète incompris dans la société\n• « Correspondances » : les sens se répondent (synesthésie)\n• « Invitation au voyage » : rêve d'un ailleurs idéal\n\nSPLEEN ET IDÉAL :\nSpleen = mélancolie, ennui profond, souffrance existentielle\nIdéal = aspiration à la beauté, à l'absolu\n\nCITATION :\n« La Nature est un temple où de vivants piliers / Laissent parfois sortir de confuses paroles. » (Correspondances)\n\nAXE D'ANALYSE :\nBaudelaire transforme la laideur et la souffrance en beauté poétique." },
            { id: 'A-Po3', type: 'loi', nom: 'Paul Éluard — « Liberté » (1942)',
              enonce: "CONTEXTE : Poème de résistance écrit pendant l'Occupation nazie.\n\nSTRUCTURE :\n• 21 strophes de 4 vers\n• Anaphore : chaque strophe commence par « Sur... »\n• Dernier vers : « J'écris ton nom » — révélation du mot LIBERTÉ\n\nINTERPRÉTATION :\nÉluard écrit le nom de la Liberté sur tous les objets du quotidien, exprimant ainsi le désir universel de liberté pendant la période de l'Occupation.\n\nEFFET POÉTIQUE :\nL'anaphore crée un effet de litanie, une accumulation qui rend le désir de liberté de plus en plus intense jusqu'à l'apothéose finale.\n\nAXES D'ANALYSE :\n• Poésie comme acte de résistance\n• L'espoir dans les moments les plus sombres\n• La liberté comme valeur universelle" },
          ],
          exercices: [
            { id: 'EX-Po1', niveau: 'Moyen', titre: "Analyse — L'Albatros de Baudelaire",
              enonce: "Dans « L'Albatros », Baudelaire compare le poète à un grand oiseau marin malmené par les marins. En 8 lignes, analysez cette métaphore et ce qu'elle révèle de la vision du poète par Baudelaire.",
              correction: "Dans « L'Albatros », Baudelaire développe une métaphore filée entre le poète et l'albatros, grand oiseau majestueux en vol mais ridicule sur le pont du navire. Cette comparaison révèle la condition du poète dans la société moderne : sublime et visionnaire dans son art (« comme des avirons ses grandes ailes blanches »), mais incompris et moqué par ses contemporains quand il descend dans la réalité quotidienne. Le poète, comme l'albatros, n'est pas fait pour le monde ordinaire : son génie le rend étranger aux hommes du commun. Baudelaire exprime ainsi la solitude douloureuse de l'artiste, inadapté à une société bourgeoise et matérialiste qui ne comprend pas sa sensibilité et sa quête du Beau." },
          ],
        },
      ],
    },
  ],
},

// ── MODULE 6 — LANGUE & EXPRESSION ────────────────────────────────────
'langue-expression': {
  id: 'langue-expression', emoji: '📝', tag: 'Lettres', color: '#059669',
  titre: "Langue & Techniques d'Expression",
  desc: "Maîtriser les outils grammaticaux, stylistiques et rhétoriques est indispensable pour réussir les épreuves de Français au Bac. Ce module couvre les connecteurs logiques, la modalisation, les figures de style et la méthodologie.",
  souschapitres: [
    {
      id: 'sc-lang-gram', titre: '6.1 Grammaire et connecteurs',
      notions: ['Connecteurs logiques', 'Subordination', 'Modalisation', 'Types de phrases'],
      blocs: [
        {
          notion: '📝 Connecteurs logiques',
          theoremes: [
            { id: 'A-Lg1', type: 'def', nom: 'Connecteurs logiques — Tableau complet',
              enonce: "ADDITION / RENFORCEMENT :\nDe plus, en outre, par ailleurs, également, non seulement... mais encore\n\nOPPOSITION / CONCESSION :\nMais, cependant, toutefois, néanmoins, or, pourtant, en revanche, certes... mais\n\nCAUSE :\nCar, parce que, puisque, étant donné que, vu que, en raison de\n\nCONSÉQUENCE :\nDonc, ainsi, par conséquent, c'est pourquoi, de ce fait, d'où\n\nILLUSTRATION :\nAinsi, par exemple, notamment, c'est le cas de, tel que\n\nCONCLUSION :\nEn conclusion, en définitive, finalement, pour conclure, en somme\n\nRÈGLE BAC :\nVarier les connecteurs. Ne jamais utiliser 2 fois le même dans un essai.",
              remarque: "Au Bac, l'absence de connecteurs logiques est sévèrement pénalisée. Ils montrent que vous maîtrisez la logique de l'argumentation." },
          ],
          exercices: [
            { id: 'EX-Lg1', niveau: 'Facile', titre: 'Exercice — Connecteurs',
              enonce: "Reliez les phrases suivantes avec un connecteur logique adapté :\n1. La technologie facilite la communication. ___ elle peut créer de la dépendance.\n2. L'éducation est fondamentale. ___ les gouvernements doivent y investir.\n3. L'homme pollue la planète. ___ des espèces disparaissent chaque jour.",
              correction: "1. La technologie facilite la communication. CEPENDANT / TOUTEFOIS elle peut créer de la dépendance. (connecteur d'opposition)\n2. L'éducation est fondamentale. C'EST POURQUOI / PAR CONSÉQUENT les gouvernements doivent y investir. (connecteur de conséquence)\n3. L'homme pollue la planète. AINSI / DE CE FAIT des espèces disparaissent chaque jour. (connecteur de conséquence)" },
          ],
        },
      ],
    },
  ],
},

// ── MODULE 7 — PRODUCTION ÉCRITE ─────────────────────────────────────
'production-ecrite': {
  id: 'production-ecrite', emoji: '✍️', tag: 'Lettres', color: '#7c3aed',
  titre: 'Production Écrite',
  desc: "La production écrite est l'épreuve centrale du Bac Français. Ce module présente la méthode complète pour rédiger un essai argumentatif, un commentaire littéraire et un résumé de texte conformes aux exigences du jury.",
  souschapitres: [
    {
      id: 'sc-prod-methode', titre: '7.1 Méthode de la dissertation',
      notions: ['Introduction', 'Problématique', 'Plan dialectique', 'Développement', 'Conclusion'],
      blocs: [
        {
          notion: '✍️ Méthode dissertation',
          theoremes: [
            { id: 'A-Pr1', type: 'methode', nom: 'Structure de l\'essai argumentatif',
              enonce: "STRUCTURE EN 5 PARTIES :\n\n1. INTRODUCTION (5-7 lignes) :\n   - Accroche : citation, question rhétorique, paradoxe\n   - Présentation du thème\n   - Problématique (question centrale)\n   - Annonce du plan\n\n2. PARTIE I — THÈSE (8-10 lignes) :\n   - Argument principal\n   - Développement + exemples (2 minimum)\n   - Phrase de transition\n\n3. PARTIE II — ANTITHÈSE (8-10 lignes) :\n   - Argument contraire ou nuance\n   - Développement + exemples\n   - Phrase de transition\n\n4. PARTIE III — SYNTHÈSE (8-10 lignes) :\n   - Dépassement de l'opposition\n   - Position personnelle nuancée\n   - Exemples originaux\n\n5. CONCLUSION (4-5 lignes) :\n   - Bilan des arguments\n   - Réponse à la problématique\n   - Ouverture (question plus large)",
              remarque: "Ne jamais commencer une partie par 'Je'. Utiliser les formes impersonnelles ou 'On peut affirmer que...'." },
          ],
          exercices: [
            { id: 'EX-Pr1', niveau: 'Difficile', titre: 'Sujet type Bac — Production écrite',
              enonce: "Sujet : « La littérature est-elle une arme efficace contre les injustices sociales ? » Rédigez un essai argumentatif complet (introduction, deux ou trois parties développées, conclusion) en vous appuyant sur des œuvres et des auteurs précis.",
              correction: "CORRIGÉ MODÈLE :\n\nINTRODUCTION : « La plume est plus forte que l'épée », affirmait Bulwer-Lytton. À l'heure où les injustices sociales persistent malgré les progrès, on est en droit de se demander si la littérature constitue réellement un outil efficace de lutte contre ces mêmes injustices. Pour répondre à cette question, nous verrons d'abord que la littérature a historiquement contribué à dénoncer les injustices, avant d'envisager ses limites, pour montrer enfin qu'elle reste indispensable comme éveilleur de conscience.\n\nI. La littérature, un témoignage puissant contre les injustices : Zola (J'accuse, Germinal), Hugo (Les Misérables), Harriet Beecher Stowe (Uncle Tom's Cabin).\n\nII. Les limites de la littérature comme outil de changement : elle s'adresse aux lettrés, l'impact est différé, elle ne remplace pas l'action politique.\n\nIII. La littérature, indispensable éveilleuse de conscience : même si elle ne change pas le monde directement, elle transforme les mentalités, crée de l'empathie, prépare les révolutions culturelles.\n\nCONCLUSION : La littérature n'est pas une arme à effet immédiat, mais son pouvoir sur les consciences en fait un outil irremplaçable dans la lutte contre les injustices." },
          ],
        },
      ],
    },
  ],
},

// ── MODULE 8 — CULTURE LITTÉRAIRE ─────────────────────────────────────
'culture-litteraire': {
  id: 'culture-litteraire', emoji: '📖', tag: 'Lettres', color: '#b45309',
  titre: 'Culture Littéraire',
  desc: "La culture littéraire regroupe la connaissance des grands mouvements, genres et auteurs qui ont façonné la littérature française. Indispensable pour les références dans les essais et les analyses de textes.",
  souschapitres: [
    {
      id: 'sc-cult-mvt', titre: '8.1 Mouvements littéraires',
      notions: ['Humanisme', 'Classicisme', 'Lumières', 'Romantisme', 'Réalisme', 'Symbolisme'],
      blocs: [
        {
          notion: '📖 Les grands mouvements',
          theoremes: [
            { id: 'A-C1', type: 'def', nom: 'Tableau des mouvements littéraires',
              enonce: "HUMANISME (15e-16e s.) :\n• Auteurs : Rabelais, Montaigne, Erasme\n• Valeurs : l'homme au centre, confiance en la raison, redécouverte de l'Antiquité\n\nCLASSICISME (17e s.) :\n• Auteurs : Racine, Molière, La Fontaine, Corneille\n• Règles : unités de temps/lieu/action, bienséance, vraisemblance\n\nLUMIÈRES (18e s.) :\n• Auteurs : Voltaire, Rousseau, Diderot, Montesquieu\n• Idées : raison, liberté, tolérance, critique de l'absolutisme\n\nROMANTISME (19e s.) :\n• Auteurs : Hugo, Lamartine, Vigny, Musset\n• Caractéristiques : sentiment, nature, exotisme, mal du siècle\n\nRÉALISME (19e s.) :\n• Auteurs : Balzac, Flaubert, Zola (naturalisme)\n• Objectif : représenter fidèlement la réalité sociale\n\nSYMBOLISME (fin 19e s.) :\n• Auteurs : Baudelaire, Verlaine, Rimbaud, Mallarmé\n• Langage des symboles, musicalité, mystère" },
          ],
          exercices: [
            { id: 'EX-C1', niveau: 'Facile', titre: 'Identifier les mouvements',
              enonce: "Associez chaque auteur à son mouvement littéraire :\n1. Voltaire — 2. Lamartine — 3. Zola — 4. Baudelaire — 5. Molière",
              correction: "1. Voltaire → LUMIÈRES (18e s.) — auteur de Candide et du Traité sur la tolérance\n2. Lamartine → ROMANTISME (19e s.) — auteur des Méditations poétiques\n3. Zola → RÉALISME/NATURALISME (19e s.) — auteur de Germinal et de J'accuse\n4. Baudelaire → SYMBOLISME (fin 19e s.) — auteur des Fleurs du Mal\n5. Molière → CLASSICISME (17e s.) — auteur de L'Avare et du Misanthrope" },
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

export default function FrancaisLettresSlugPage() {
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
          <p style={{ color: 'var(--muted)' }}>Le module "{slug}" n'existe pas pour la section Lettres.</p>
          <Link href="/bac/francais/lettres" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 20 }}>
            ← Retour aux modules Lettres
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
                  <Link href={`/solve?q=${encodeURIComponent('Français Lettres Tunisie — ' + module_.titre)}`}
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
                                      <Link href={`/solve?q=${encodeURIComponent('Français Lettres — ' + ex.enonce.slice(0,100))}`}
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
                  <Link href={`/bac/francais/lettres/${prevSlug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: '12px 15px' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>← Précédent</div>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{TITRES_NAV[prevSlug].replace(/M\d+ — /, '')}</div>
                    </div>
                  </Link>
                ) : <div />}
                {nextSlug ? (
                  <Link href={`/bac/francais/lettres/${nextSlug}`} style={{ textDecoration: 'none' }}>
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
                  📚 Modules Lettres
                </div>
                {NAV_ORDER.map(s => (
                  <Link key={s} href={`/bac/francais/lettres/${s}`} style={{ textDecoration: 'none' }}>
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
                  <Link href="/bac/francais/scientifique" className="btn btn-secondary" style={{ textAlign: 'center', fontSize: 12 }}>🔬 Section Scientifiques</Link>
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