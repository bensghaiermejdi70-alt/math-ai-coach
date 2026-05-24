'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
//  ANGLAIS TERMINALE FRANCE — [SLUG]
//  Route : /bac-france/anglais/terminale/[slug]
//  8 axes thématiques · Programme officiel MEN 2026/2027
// ══════════════════════════════════════════════════════════════════════

const NAV_ORDER = [
  'ax1-identities-exchanges',
  'ax2-private-public-sphere',
  'ax3-art-power',
  'ax4-citizenship-virtual',
  'ax5-fictions-realities',
  'ax6-scientific-innovation',
  'ax7-diversity-inclusion',
  'ax8-territory-memory',
]

const SEC_COLORS: Record<string,string> = {
  'ax1-identities-exchanges':  '#f59e0b',
  'ax2-private-public-sphere': '#8b5cf6',
  'ax3-art-power':             '#ec4899',
  'ax4-citizenship-virtual':   '#06b6d4',
  'ax5-fictions-realities':    '#10b981',
  'ax6-scientific-innovation': '#6366f1',
  'ax7-diversity-inclusion':   '#f97316',
  'ax8-territory-memory':      '#84cc16',
}

const TITRES_NAV: Record<string,string> = {
  'ax1-identities-exchanges':  'AX1 — Identities and Exchanges',
  'ax2-private-public-sphere': 'AX2 — Private & Public Sphere',
  'ax3-art-power':             'AX3 — Art and Power',
  'ax4-citizenship-virtual':   'AX4 — Citizenship & Virtual Worlds',
  'ax5-fictions-realities':    'AX5 — Fictions and Realities',
  'ax6-scientific-innovation': 'AX6 — Scientific Innovation',
  'ax7-diversity-inclusion':   'AX7 — Diversity & Inclusion',
  'ax8-territory-memory':      'AX8 — Territory & Memory',
}

type Exo = { id:string; niveau:'Facile'|'Intermédiaire'|'Difficile'; titre:string; enonce:string; correction:string }
type Spec = { parcours:string; icon:string; color:string; focus:string; vocab:string[]; exercice:Exo }
type SC   = {
  id:string; titre:string; notions:string[]
  vocab:{ en:string; fr:string; exemple:string }[]
  grammar:{ regle:string; exemples:string[] }[]
  exercices:Exo[]
  specs:Spec[]
}
type Axe  = { id:string; num:number; emoji:string; titre:string; color:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 8 AXES TERMINALE
// ══════════════════════════════════════════════════════════════════════
const ALL_AXES: Record<string,Axe> = {

// ─────────────────────────────────────────────────────────────────────
// AXE 1 — IDENTITIES AND EXCHANGES
// ─────────────────────────────────────────────────────────────────────
'ax1-identities-exchanges': {
  id:'ax1-identities-exchanges', num:1, emoji:'🌍',
  color:'#f59e0b',
  titre:'Identities and Exchanges',
  desc:"Cultural identity, migration, globalization and international exchanges. Key examples: American Dream, Brexit, multicultural societies.",
  souschapitres:[
    {
      id:'sc-ax1-1', titre:'1.1 Cultural Identity & Multiculturalism',
      notions:[
        'Cultural identity = the sense of belonging to a group through shared language, history, values and traditions',
        'Multiculturalism: coexistence of multiple cultures in one society — UK, USA, Canada as models',
        'Assimilation vs integration: two opposite approaches to managing diversity',
        'American Dream: the belief that success is achievable through hard work, regardless of origin',
      ],
      vocab:[
        { en:'heritage',      fr:'patrimoine',         exemple:'Cultural heritage must be preserved for future generations.' },
        { en:'assimilation',  fr:'assimilation',       exemple:'Some immigrants face pressure to assimilate.' },
        { en:'diaspora',      fr:'diaspora',           exemple:'The Irish diaspora spread across the world after the famine.' },
        { en:'melting pot',   fr:'creuset culturel',   exemple:'The USA is often described as a melting pot of cultures.' },
        { en:'integration',   fr:'intégration',        exemple:'Successful integration requires mutual effort.' },
        { en:'multicultural', fr:'multiculturel',      exemple:'London is one of the most multicultural cities in the world.' },
        { en:'diversity',     fr:'diversité',          exemple:'Diversity enriches societies with new perspectives.' },
        { en:'indigenous',    fr:'autochtone',         exemple:'Indigenous communities fight to preserve their traditions.' },
      ],
      grammar:[
        {
          regle:"Present Perfect vs Past Simple:\nPresent Perfect → link to present, ongoing relevance\nPast Simple → completed action, specific time",
          exemples:[
            "Multiculturalism has transformed British society since the 1950s. (Present Perfect — ongoing effect)",
            "The Windrush generation arrived in Britain in 1948. (Past Simple — specific date)",
          ]
        },
        {
          regle:"Expressing contrast and concession:\nAlthough / Even though + clause\nDespite / In spite of + noun/gerund\nHowever / Nevertheless (between two sentences)",
          exemples:[
            "Although multiculturalism has enriched societies, it has also created tensions.",
            "Despite efforts at integration, discrimination persists.",
            "The country welcomed immigrants. However, challenges remain.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-AX1-1', niveau:'Intermédiaire', titre:'Analysis — The American Dream',
          enonce:"Read: 'The American Dream holds that every citizen has an equal opportunity to achieve success through determination. However, studies show that social mobility in the USA is lower than in most European countries.'\n\nQ1: What is the American Dream according to this passage?\nQ2: What contradiction does the text reveal?\nQ3: Do you think the American Dream is still relevant today? Justify.",
          correction:"Q1: The American Dream is the belief that any citizen can achieve success through hard work and determination, regardless of their background.\n\nQ2: The contradiction is that while the American Dream promises equal opportunity, social mobility in the USA is actually lower than in most European countries — suggesting the dream is harder to achieve than the ideal suggests.\n\nQ3: Model answer: I believe the American Dream remains a powerful cultural myth, but its relevance has diminished. Structural inequalities — in education, healthcare and housing — make it increasingly difficult for those at the bottom to rise. However, the ideal continues to inspire millions of immigrants who still see America as a land of opportunity.",
        },
        {
          id:'EX-AX1-2', niveau:'Difficile', titre:'Essay — Is multiculturalism a success or a failure?',
          enonce:"Write a structured argumentative essay (180-200 words): 'Multiculturalism has enriched societies but also created serious challenges.' Discuss.",
          correction:"Introduction: Multiculturalism — the coexistence of multiple cultures within one society — has become one of the defining features of contemporary democracies.\n\nFor — enrichment: Multicultural societies benefit from cultural diversity, which drives creativity, innovation and economic dynamism. Cities like London and New York demonstrate that diverse communities can thrive together, producing rich artistic and culinary cultures.\n\nAgainst — challenges: However, multiculturalism is not without difficulties. Cultural misunderstandings, linguistic barriers and social segregation can fuel tensions. In several European countries, debates about national identity and immigration have intensified.\n\nConclusion: In my view, multiculturalism is neither a complete success nor a failure — it is a work in progress. Its success depends on policies that promote genuine inclusion, equal opportunity and intercultural dialogue.",
        },
      ],
      specs:[
        {
          parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Migration économique, mondialisation et marchés du travail',
          vocab:['brain drain','remittances','labour market','economic migrant','push/pull factors','GDP contribution'],
          exercice:{ id:'EX-AX1-S1', niveau:'Difficile', titre:'Migration & Economy (SES)',
            enonce:"'Brain drain describes the emigration of highly educated people from developing countries to wealthier ones.' Analyse the economic consequences for both sending and receiving countries.",
            correction:"For sending countries:\n• Loss of skilled workers (doctors, engineers, teachers)\n• Reduced tax revenue and innovation capacity\n• However: remittances sent back can boost local economies\n\nFor receiving countries:\n• Fill skills gaps in key sectors (healthcare, tech)\n• Boost GDP and innovation\n• Lower labour costs in some sectors\n\nConclusion: Brain drain creates a paradox — it benefits receiving nations while potentially deepening inequality in developing countries. Sustainable solutions require international cooperation on fair wages and education funding." }
        },
        {
          parcours:'🔬 Sciences/NSI', icon:'🔬', color:'#6366f1',
          focus:'Mobilité internationale des chercheurs, échanges scientifiques',
          vocab:['scientific collaboration','research mobility','international fellowship','STEM','knowledge transfer','open science'],
          exercice:{ id:'EX-AX1-S2', niveau:'Intermédiaire', titre:'Scientific Exchanges (Sciences)',
            enonce:"How has international scientific collaboration changed in the digital age? Give 3 specific examples.",
            correction:"1. Open-access publishing platforms allow researchers worldwide to share findings instantly, regardless of location.\n2. International projects like CERN and the International Space Station require collaboration between scientists from dozens of countries.\n3. Remote collaboration tools (Zoom, shared databases, cloud computing) have made it possible for research teams to work across continents in real time.\n\nConclusion: Digital technology has democratized science, enabling researchers from developing nations to contribute to and benefit from global knowledge." }
        },
        {
          parcours:'📚 LLCER', icon:'📚', color:'#ec4899',
          focus:"Analyse littéraire — identité culturelle dans la littérature anglophone",
          vocab:['narrator','identity crisis','cultural clash','belonging','exile','voice','postcolonial'],
          exercice:{ id:'EX-AX1-S3', niveau:'Difficile', titre:'Literary Analysis — Identity (LLCER)',
            enonce:"How does literature explore the theme of cultural identity? Analyse with reference to a text or film you have studied.",
            correction:"Literature is a privileged space for exploring the complexity of cultural identity. In many postcolonial works, characters navigate between two cultures, neither fully belonging to one nor the other.\n\nIn Chimamanda Ngozi Adichie's 'Americanah', for example, the protagonist discovers that identity is not fixed but constantly reconstructed through experience. The novel shows how migration forces individuals to question their assumptions about race, class and belonging.\n\nSimilarly, in 'The Kite Runner', cultural memory and guilt shape the protagonist's identity across two continents.\n\nConclusion: Literature reveals that identity is not a stable essence but a dynamic process, shaped by history, displacement and encounter with the Other." }
        },
      ],
    },
    {
      id:'sc-ax1-2', titre:'1.2 Globalization & International Exchanges',
      notions:[
        'Globalization: the increasing interconnection of economies, cultures and societies worldwide',
        'Trade liberalization: removal of barriers to international trade (WTO, EU single market)',
        'Cultural globalization: spread of cultural products (films, music, food) across borders',
        'Brexit: the UK\'s departure from the EU — a symbol of tensions between globalization and nationalism',
      ],
      vocab:[
        { en:'globalization', fr:'mondialisation',    exemple:'Globalization has created both opportunities and inequalities.' },
        { en:'interconnected',fr:'interconnecté',    exemple:'Modern economies are deeply interconnected.' },
        { en:'free trade',    fr:'libre-échange',    exemple:'Free trade agreements reduce tariffs between countries.' },
        { en:'outsourcing',   fr:'délocalisation',   exemple:'Many companies outsource production to cheaper countries.' },
        { en:'sovereignty',   fr:'souveraineté',     exemple:'Brexit was driven by concerns about national sovereignty.' },
        { en:'trade deficit', fr:'déficit commercial',exemple:'The trade deficit widened after the new tariffs.' },
        { en:'supply chain',  fr:'chaîne logistique',exemple:'The pandemic disrupted global supply chains.' },
        { en:'tariff',        fr:'droit de douane',  exemple:'High tariffs make imported goods more expensive.' },
      ],
      grammar:[
        {
          regle:"Cause and consequence structures:\nBecause / Since / As + clause (cause)\nTherefore / As a result / Consequently (consequence)\nLead to / Result in / Cause + noun",
          exemples:[
            "Since trade barriers were lifted, global exchanges have intensified.",
            "The financial crisis led to a rise in protectionism.",
            "As a result of globalization, cultural homogenization has increased.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-AX1-3', niveau:'Intermédiaire', titre:'Brexit — Synthesis',
          enonce:"Explain in 6-8 lines: What was Brexit? What were the main arguments for and against? What has been its main consequence?",
          correction:"Brexit refers to the United Kingdom's withdrawal from the European Union, following a referendum in June 2016 in which 52% of voters chose to leave.\n\nArguments for Leave:\n• Reclaim national sovereignty and control over laws\n• Reduce EU immigration\n• Stop contributing to the EU budget ('£350m a week for the NHS')\n\nArguments for Remain:\n• Economic interdependence with EU partners\n• Freedom of movement for workers and students\n• Britain's influence in international affairs\n\nMain consequences: Brexit has disrupted trade between the UK and EU, caused shortages of workers in key sectors, and reignited debates about Scottish independence and Irish reunification.",
        },
      ],
      specs:[
        {
          parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Impact économique de la mondialisation — inégalités, commerce, emploi',
          vocab:['comparative advantage','protectionism','WTO','multinational','global value chain','trade war'],
          exercice:{ id:'EX-AX1-S4', niveau:'Difficile', titre:'Globalization & Inequality (SES)',
            enonce:"'Globalization has increased wealth globally but also widened inequalities within countries.' Discuss with economic examples.",
            correction:"Evidence for the statement:\n• Global GDP has risen dramatically since the 1990s, lifting hundreds of millions out of extreme poverty in China and India.\n• However, within developed nations, the manufacturing working class has suffered from deindustrialization and wage stagnation.\n• The top 1% of earners have captured a disproportionate share of economic gains.\n\nCounterarguments:\n• Some economists argue globalization creates more jobs than it destroys over time.\n• Trade lowers prices for consumers, increasing purchasing power.\n\nConclusion: The benefits of globalization have been unevenly distributed, requiring redistribution policies — progressive taxation, education, social protection — to ensure inclusive growth." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// AXE 2 — PRIVATE SPHERE & PUBLIC SPHERE
// ─────────────────────────────────────────────────────────────────────
'ax2-private-public-sphere': {
  id:'ax2-private-public-sphere', num:2, emoji:'📱',
  color:'#8b5cf6',
  titre:'Private Sphere & Public Sphere',
  desc:"Social media, digital identity, media power, privacy vs surveillance, freedom of expression.",
  souschapitres:[
    {
      id:'sc-ax2-1', titre:'2.1 Digital Identity & Social Media',
      notions:[
        'Digital identity: the online representation of a person — profile, posts, data trail',
        'Influencers: individuals with large online followings who shape opinion and consumption',
        'Surveillance capitalism: the economic model where personal data is the product sold to advertisers',
        'Filter bubble: the algorithmic tendency to show users only content that confirms their existing views',
      ],
      vocab:[
        { en:'algorithm',        fr:'algorithme',          exemple:'Social media algorithms determine what we see.' },
        { en:'data privacy',     fr:'vie privée des données',exemple:'Data privacy laws protect personal information.' },
        { en:'surveillance',     fr:'surveillance',         exemple:'Mass surveillance raises civil liberties concerns.' },
        { en:'influencer',       fr:'influenceur',          exemple:'Many influencers earn millions through brand deals.' },
        { en:'echo chamber',     fr:'chambre d\'écho',     exemple:'Social media creates echo chambers of opinion.' },
        { en:'digital footprint',fr:'empreinte numérique', exemple:'Every click leaves a digital footprint.' },
        { en:'consent',          fr:'consentement',         exemple:'Users must give consent before their data is collected.' },
        { en:'misinformation',   fr:'désinformation',       exemple:'Misinformation spreads faster than corrections online.' },
      ],
      grammar:[
        {
          regle:"Passive voice — emphasizing the object/victim of an action:\nPresent: is/are + past participle\nPast: was/were + past participle\nPerfect: has/have been + past participle",
          exemples:[
            "Personal data is collected and sold to advertisers without users' knowledge.",
            "Millions of accounts were hacked in the 2021 breach.",
            "The algorithm has been designed to maximize engagement, not truth.",
          ]
        },
        {
          regle:"Modal verbs for obligation and recommendation:\nShould/ought to → recommendation\nMust/have to → strong obligation\nCould/might → possibility, suggestion",
          exemples:[
            "Governments should regulate social media platforms more strictly.",
            "Companies must obtain explicit consent before collecting data.",
            "Citizens could demand greater transparency from tech companies.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-AX2-1', niveau:'Intermédiaire', titre:'The Filter Bubble',
          enonce:"Explain in your own words what a 'filter bubble' is. Give 2 consequences for democracy and 2 ways to avoid it.",
          correction:"Definition: A filter bubble occurs when social media algorithms show users only content that matches their existing preferences and beliefs, gradually shielding them from opposing viewpoints.\n\nConsequences for democracy:\n1. Polarization — people become increasingly convinced that their views represent the majority, making compromise harder.\n2. Vulnerability to manipulation — users in a bubble are more susceptible to targeted misinformation.\n\nWays to avoid it:\n1. Actively seek out news sources with different political perspectives.\n2. Adjust privacy settings to limit algorithmic profiling and follow a diverse range of accounts.",
        },
      ],
      specs:[
        {
          parcours:'💻 NSI', icon:'💻', color:'#06b6d4',
          focus:'Data privacy, cybersécurité, algorithmes de recommandation',
          vocab:['encryption','GDPR','metadata','tracking','API','data breach','anonymization'],
          exercice:{ id:'EX-AX2-N1', niveau:'Difficile', titre:'GDPR & Data Rights (NSI)',
            enonce:"Explain what the GDPR is and describe 3 specific rights it gives to European citizens regarding their personal data.",
            correction:"The General Data Protection Regulation (GDPR), adopted by the EU in 2018, is a comprehensive data protection law that applies to any organization processing the data of EU residents.\n\nThree key rights it grants:\n1. Right to access: citizens can request a copy of all data held about them by any company.\n2. Right to erasure ('right to be forgotten'): individuals can ask for their data to be deleted when it is no longer necessary.\n3. Right to data portability: users can request their data in a machine-readable format to transfer to another service provider.\n\nThe GDPR also requires explicit consent before data collection and mandates that data breaches be reported within 72 hours." }
        },
        {
          parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:"Médias et opinion publique, pouvoir des plateformes",
          vocab:['media concentration','public opinion','agenda-setting','gatekeeping','press freedom','fourth estate'],
          exercice:{ id:'EX-AX2-S1', niveau:'Difficile', titre:'Media Power & Democracy (SES)',
            enonce:"'The media no longer inform the public — they shape public opinion.' Discuss this statement with sociological examples.",
            correction:"The statement reflects the concept of media power — the capacity of mass media to influence not just what people think about, but how they think.\n\nEvidence for:\n• Agenda-setting theory (McCombs & Shaw): the media determines which issues the public considers important.\n• Social media platforms prioritize engagement over truth, amplifying extreme content.\n• In the 2016 US election, Cambridge Analytica used data to micro-target voters with tailored misinformation.\n\nNuance:\n• Citizens retain critical agency — media literacy education empowers people to question what they consume.\n• Alternative media and fact-checking organizations provide counterweights to mainstream narratives.\n\nConclusion: The media does shape opinion, but the relationship is reciprocal — audiences also influence what the media produces. The solution lies in media literacy and stronger regulation of digital platforms." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// AXE 3 — ART AND POWER
// ─────────────────────────────────────────────────────────────────────
'ax3-art-power': {
  id:'ax3-art-power', num:3, emoji:'🎨',
  color:'#ec4899',
  titre:'Art and Power',
  desc:"Art as protest, propaganda, censorship, music and politics, cinema and power, soft power and cultural influence.",
  souschapitres:[
    {
      id:'sc-ax3-1', titre:'3.1 Art as Protest & Propaganda',
      notions:[
        'Art as protest: artworks that challenge authority, expose injustice or advocate for change',
        'Propaganda: the use of art, media and communication to spread ideology and manipulate opinion',
        'Censorship: the suppression of artistic or journalistic expression by authorities',
        'Soft power: the ability to influence others through cultural attraction rather than coercion (Joseph Nye)',
      ],
      vocab:[
        { en:'censorship',    fr:'censure',          exemple:'Censorship of the press undermines democracy.' },
        { en:'propaganda',    fr:'propagande',       exemple:'Soviet propaganda used art to glorify the state.' },
        { en:'protest art',   fr:'art contestataire',exemple:'Banksy\'s protest art appears on walls worldwide.' },
        { en:'soft power',    fr:'soft power',       exemple:'Hollywood exports American soft power globally.' },
        { en:'dissident',     fr:'dissident',        exemple:'The dissident artist was imprisoned for her work.' },
        { en:'satire',        fr:'satire',           exemple:'Political satire challenges power through humour.' },
        { en:'subversive',    fr:'subversif',        exemple:'Subversive art questions accepted norms.' },
        { en:'patronage',     fr:'mécénat',          exemple:'Royal patronage shaped Renaissance art.' },
      ],
      grammar:[
        {
          regle:"Relative clauses (defining and non-defining):\nDefining: who/which/that — no commas — essential information\nNon-defining: who/which — commas — additional information",
          exemples:[
            "Artists who challenge political authority often face censorship. (defining)",
            "Banksy, whose identity remains unknown, is the world's most famous street artist. (non-defining)",
            "The film that won the Palme d\'Or dealt with political repression. (defining)",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-AX3-1', niveau:'Intermédiaire', titre:'Banksy — Art & Power',
          enonce:"Describe in 6-8 lines who Banksy is and explain why his work is considered an example of art challenging power.",
          correction:"Banksy is a British street artist whose real identity remains unknown. Since the 1990s, he has been creating provocative stencil artworks in public spaces around the world, from London to Gaza.\n\nHis work challenges authority in several ways:\n1. His art appears without permission — the act itself defies property laws and the ownership of public space.\n2. His images target political systems, consumerism and war. Works like 'Girl with Balloon' and 'Napalm' expose the gap between political rhetoric and reality.\n3. By remaining anonymous, Banksy subverts the art market's obsession with celebrity and commodity.\n\nBanksy demonstrates that art can be both democratic (accessible to all on streets) and radical (capable of challenging power structures).",
        },
      ],
      specs:[
        {
          parcours:'📚 LLCER', icon:'📚', color:'#ec4899',
          focus:"Analyse d'œuvres — littérature et cinéma engagés",
          vocab:['dystopian','totalitarianism','allegory','symbolism','narrative voice','protagonist'],
          exercice:{ id:'EX-AX3-L1', niveau:'Difficile', titre:'1984 — Art & Power (LLCER)',
            enonce:"In George Orwell's '1984', how does art (language, music, writing) serve as both a tool of oppression and a form of resistance?",
            correction:"In Orwell's '1984', the Party controls reality through language. Newspeak systematically eliminates words that could express dissent — if a word for 'freedom' does not exist, the concept becomes unthinkable. Language itself becomes a tool of totalitarian oppression.\n\nHowever, art also represents resistance. Winston's diary — his secret act of writing — is a form of protest against the erasure of memory and truth. The nursery rhyme about St Clement's church, preserved in folk memory, symbolizes the survival of authentic culture beneath official propaganda.\n\nOrwell suggests that art and language are fundamentally connected to freedom. When a regime controls expression, it controls thought itself. But even in the most oppressive systems, the human impulse to create and remember persists — in secret, fragile, but undeniable." }
        },
        {
          parcours:'🎓 Général', icon:'🎓', color:'#f59e0b',
          focus:"Rôle de l'art dans la société, cinéma et politique",
          vocab:['engagement','social comment','critical lens','mainstream','counter-culture','documentary'],
          exercice:{ id:'EX-AX3-G1', niveau:'Intermédiaire', titre:'Cinema & Power (Général)',
            enonce:"How can cinema be used as a political tool? Give one example of a film that challenged power and explain its impact.",
            correction:"Cinema has historically been one of the most powerful political tools, capable of reaching mass audiences and shaping public opinion.\n\nExample — 'Schindler\'s List' (1993, Spielberg): This film about the Holocaust gave an emotional face to historical facts that many people only knew intellectually. By humanizing victims and perpetrators alike, it generated renewed public awareness of genocide and contributed to Holocaust education programmes worldwide.\n\nAnother example — documentaries like 'An Inconvenient Truth' (2006): Al Gore\'s climate documentary mobilized millions and contributed to the political momentum behind the Paris Agreement.\n\nConclusion: Cinema challenges power when it makes the invisible visible — forcing audiences to confront realities that official narratives prefer to minimize." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// AXE 4 — CITIZENSHIP & VIRTUAL WORLDS
// ─────────────────────────────────────────────────────────────────────
'ax4-citizenship-virtual': {
  id:'ax4-citizenship-virtual', num:4, emoji:'💻',
  color:'#06b6d4',
  titre:'Citizenship & Virtual Worlds',
  desc:"Digital citizenship, fake news, online activism, AI influence, democracy in the digital age.",
  souschapitres:[
    {
      id:'sc-ax4-1', titre:'4.1 Fake News & Digital Democracy',
      notions:[
        'Fake news: deliberately fabricated or misleading information presented as factual news',
        'Digital democracy: the use of digital tools to enhance civic participation and political engagement',
        'Online activism: the use of the internet to advocate for social or political change (hashtag movements)',
        'Post-truth era: a political environment where emotional appeals matter more than objective facts',
      ],
      vocab:[
        { en:'disinformation',  fr:'désinformation',    exemple:'State-sponsored disinformation campaigns have increased.' },
        { en:'fact-checking',   fr:'vérification des faits',exemple:'Fact-checking organizations expose false claims.' },
        { en:'clickbait',       fr:'appât à clics',     exemple:'Clickbait headlines generate traffic but mislead readers.' },
        { en:'viral',           fr:'viral',             exemple:'The video went viral within hours.' },
        { en:'bot',             fr:'bot',               exemple:'Automated bots spread propaganda on social media.' },
        { en:'transparency',    fr:'transparence',      exemple:'Transparency from tech companies is urgently needed.' },
        { en:'accountability',  fr:'responsabilisation',exemple:'Politicians must be held accountable for their statements.' },
        { en:'petition',        fr:'pétition',          exemple:'The online petition gathered 2 million signatures.' },
      ],
      grammar:[
        {
          regle:"Conditionals type 2 and 3:\nType 2 (hypothetical present): If + past simple, would + infinitive\nType 3 (impossible past): If + past perfect, would have + past participle",
          exemples:[
            "If social media platforms regulated content more strictly, misinformation would spread less rapidly. (Type 2)",
            "If citizens had been better educated in media literacy, they might not have believed the fake news. (Type 3)",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-AX4-1', niveau:'Intermédiaire', titre:'Fake News — Analysis',
          enonce:"Q1: Define 'fake news' and explain why it spreads so rapidly online.\nQ2: Describe 2 concrete strategies individuals can use to identify and combat misinformation.",
          correction:"Q1: Fake news refers to deliberately false or misleading information disguised as legitimate journalism. It spreads rapidly online because:\n• Algorithms prioritize engaging content over accurate content — outrage and fear generate more clicks.\n• Social media allows instant sharing before verification.\n• Confirmation bias makes people more likely to share content that confirms their existing beliefs.\n\nQ2: Individual strategies:\n1. Check the source: verify the URL, look for author credentials, and cross-reference with trusted fact-checking sites (AFP Factuel, Snopes, Full Fact).\n2. Apply the SIFT method: Stop before sharing; Investigate the source; Find better coverage; Trace claims to their original context.",
        },
      ],
      specs:[
        {
          parcours:'💻 NSI', icon:'💻', color:'#06b6d4',
          focus:'IA, algorithmes, cybersécurité et démocratie numérique',
          vocab:['machine learning','recommendation system','neural network','phishing','malware','open-source','encryption'],
          exercice:{ id:'EX-AX4-N1', niveau:'Difficile', titre:'AI & Democracy (NSI)',
            enonce:"'Artificial intelligence poses serious risks to democratic processes.' Explain this statement with at least 2 technical examples.",
            correction:"1. Deepfakes: AI-generated synthetic videos can convincingly show political figures saying things they never said. This technology makes it increasingly difficult to distinguish authentic from fabricated footage, undermining public trust in video evidence.\n\n2. Microtargeting: Machine learning algorithms can analyse vast amounts of personal data to deliver hyper-personalized political messages. Cambridge Analytica used this technique in the 2016 US election to target swing voters with emotionally manipulative content.\n\n3. Automated bot networks: AI-powered bots can flood social media with coordinated narratives, making fringe views appear mainstream — a technique known as 'astroturfing'.\n\nConclusion: AI amplifies both the reach and sophistication of disinformation campaigns, requiring regulation of algorithmic transparency and digital political advertising." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// AXE 5 — FICTIONS AND REALITIES
// ─────────────────────────────────────────────────────────────────────
'ax5-fictions-realities': {
  id:'ax5-fictions-realities', num:5, emoji:'📚',
  color:'#10b981',
  titre:'Fictions and Realities',
  desc:"Literature, cinema, dystopia and utopia, storytelling, the relationship between imagination and reality.",
  souschapitres:[
    {
      id:'sc-ax5-1', titre:'5.1 Dystopia & Utopia in Literature',
      notions:[
        'Dystopia: a fictional society characterized by oppression, suffering and totalitarian control — warning about the future',
        'Utopia: an imagined perfect society — often used to critique present imperfections',
        'Allegory: a narrative in which characters and events symbolize deeper truths about society',
        'Science fiction as social commentary: SF explores present anxieties through imagined futures',
      ],
      vocab:[
        { en:'dystopian',      fr:'dystopique',       exemple:'Orwell created a chilling dystopian vision of the future.' },
        { en:'totalitarian',   fr:'totalitaire',      exemple:'The totalitarian regime controlled every aspect of life.' },
        { en:'surveillance',   fr:'surveillance',     exemple:'Citizens lived under constant surveillance in the novel.' },
        { en:'allegory',       fr:'allégorie',        exemple:'Animal Farm is an allegory of the Soviet Revolution.' },
        { en:'protagonist',    fr:'protagoniste',     exemple:'The protagonist resists the oppressive system alone.' },
        { en:'foreshadowing',  fr:'présage',          exemple:'The author uses foreshadowing to create tension.' },
        { en:'narrative voice',fr:'voix narrative',   exemple:'The first-person narrative voice creates intimacy.' },
        { en:'speculative',    fr:'spéculatif',       exemple:'Speculative fiction imagines alternative realities.' },
      ],
      grammar:[
        {
          regle:"Past narrative tenses:\nPast Simple: sequence of actions\nPast Continuous: background actions\nPast Perfect: action before another past action",
          exemples:[
            "Winston opened his diary. (Past Simple — action)",
            "He was writing when he heard a knock at the door. (Past Continuous — interrupted action)",
            "Big Brother had already destroyed all historical records. (Past Perfect — prior action)",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-AX5-1', niveau:'Difficile', titre:'Essay — Why do dystopian novels remain relevant?',
          enonce:"'Dystopian fiction such as 1984 or Fahrenheit 451 is more relevant today than when it was written.' Write a structured argumentative essay (180-200 words).",
          correction:"Introduction: Dystopian fiction, born in the anxieties of the 20th century, has lost none of its power in the digital age.\n\nFor — enduring relevance: The concerns that drove Orwell and Bradbury — mass surveillance, propaganda, the erosion of truth — have become disturbingly literal realities. Government surveillance programmes, revealed by Snowden in 2013, echo Big Brother's watchful eye. Social media's addiction to outrage mirrors Fahrenheit 451's culture of distraction. Fake news and post-truth politics make the Ministry of Truth feel uncomfortably real.\n\nFor — new dimensions: Digital technology has given dystopian warnings new forms. AI deepfakes, algorithmic manipulation and social credit systems in authoritarian states suggest that Orwell's imagination was, if anything, too limited.\n\nConclusion: Dystopian fiction endures because it holds a mirror to our present. Reading Orwell today is not an exercise in historical nostalgia — it is an urgent warning that the conditions for totalitarianism never entirely disappear.",
        },
      ],
      specs:[
        {
          parcours:'📚 LLCER', icon:'📚', color:'#ec4899',
          focus:'Œuvres obligatoires LLCER — analyse approfondie',
          vocab:['literary analysis','author\'s intent','symbolism','motif','theme','character development','plot'],
          exercice:{ id:'EX-AX5-L1', niveau:'Difficile', titre:'Lord of the Flies — LLCER',
            enonce:"In 'Lord of the Flies' (Golding), how does the island become a microcosm of society? What does the novel suggest about human nature?",
            correction:"Golding's island is a miniature society that strips away the veneer of civilization to reveal what he believes lies beneath: the human capacity for violence and self-destruction.\n\nAt first, the boys attempt to establish order — Ralph's conch shell represents democracy, rational governance and the rule of law. But as fear grows and leadership fragments, the primal instinct for domination overwhelms social norms. The descent from choir boy to murderous tribesman is disturbingly rapid.\n\nThe novel suggests that civilization is not humanity's natural state but a fragile construct, maintained only through sustained effort. Golding, writing in the aftermath of World War Two, saw the Holocaust as proof that ordinary people — even children — are capable of extraordinary cruelty under the right conditions.\n\nConclusion: 'Lord of the Flies' remains a disturbing allegory because it refuses comforting answers. It suggests that the real danger lies not in monsters from outside, but in the darkness within us all." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// AXE 6 — SCIENTIFIC INNOVATION & RESPONSIBILITY
// ─────────────────────────────────────────────────────────────────────
'ax6-scientific-innovation': {
  id:'ax6-scientific-innovation', num:6, emoji:'🔬',
  color:'#6366f1',
  titre:'Scientific Innovation & Responsibility',
  desc:"AI, climate change, biotechnology, medical ethics, green technology. Key axis for Sciences, NSI and SES students.",
  souschapitres:[
    {
      id:'sc-ax6-1', titre:'6.1 Artificial Intelligence & Ethics',
      notions:[
        'Artificial intelligence: systems that simulate human intelligence — machine learning, neural networks, deep learning',
        'AI ethics: the set of principles governing the responsible development and use of AI (fairness, transparency, accountability)',
        'Automation and employment: AI\'s impact on the labour market — job destruction and creation',
        'Algorithmic bias: systematic errors in AI systems that produce unfair outcomes for certain groups',
      ],
      vocab:[
        { en:'machine learning',fr:'apprentissage automatique',exemple:'Machine learning enables computers to learn from data.' },
        { en:'neural network',  fr:'réseau de neurones',       exemple:'Neural networks recognize patterns in images.' },
        { en:'bias',            fr:'biais',                    exemple:'Algorithmic bias can perpetuate discrimination.' },
        { en:'autonomous',      fr:'autonome',                 exemple:'Autonomous vehicles are tested on public roads.' },
        { en:'transparency',    fr:'transparence',             exemple:'Algorithmic transparency allows auditing of decisions.' },
        { en:'accountability',  fr:'responsabilité',           exemple:'AI companies must be held accountable for harm.' },
        { en:'ethics',          fr:'éthique',                  exemple:'AI ethics is one of the biggest debates of our era.' },
        { en:'automation',      fr:'automatisation',           exemple:'Automation threatens millions of routine jobs.' },
      ],
      grammar:[
        {
          regle:"Future forms — predictions and certainties:\nWill → certain prediction or promise\nMight / may → possibility\nIs going to → planned/expected future\nShould → recommendation, expectation",
          exemples:[
            "AI will transform every sector of the economy within a decade.",
            "Some jobs might disappear entirely; others will be created.",
            "Governments should regulate AI before it becomes uncontrollable.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-AX6-1', niveau:'Difficile', titre:'AI — Benefits and Risks',
          enonce:"Write a for & against essay (180-200 words): 'Artificial intelligence: humanity's greatest tool or its greatest threat?'",
          correction:"Introduction: Artificial intelligence stands at the centre of one of the most important debates of our era — will it liberate or endanger humanity?\n\nFor — an extraordinary tool: AI has already saved lives by accelerating drug discovery (DeepMind's AlphaFold), improving medical diagnosis and powering climate models. It democratizes access to expertise — a student in a remote village can access an AI tutor as sophisticated as any private teacher.\n\nAgainst — serious risks: Yet AI also raises profound dangers. Algorithmic bias can automate discrimination. Deepfakes erode public trust in visual evidence. Mass automation threatens to displace millions of workers before societies can adapt. And autonomous weapons systems could one day make life-or-death decisions without human oversight.\n\nConclusion: AI is neither inherently good nor evil — it reflects the values and choices of those who build and deploy it. The question is not whether to develop AI, but how to govern it: with transparency, accountability and genuine democratic participation.",
        },
      ],
      specs:[
        {
          parcours:'🔬 Sciences/NSI', icon:'🔬', color:'#6366f1',
          focus:'🔥 Axe très important — textes scientifiques, IA technique, biotech',
          vocab:['neural network','training data','algorithm','deep learning','quantum computing','CRISPR','genome'],
          exercice:{ id:'EX-AX6-S1', niveau:'Difficile', titre:'CRISPR & Bioethics (Sciences)',
            enonce:"'CRISPR technology allows scientists to edit the human genome with unprecedented precision. However, its implications raise serious ethical questions.' Analyse both dimensions.",
            correction:"Scientific dimension:\nCRISPR-Cas9 is a gene-editing tool that allows scientists to cut, modify or replace specific DNA sequences. Its medical applications are transformative — potential cures for genetic diseases such as sickle cell anaemia, cystic fibrosis and certain cancers are now within reach. In 2023, the first CRISPR-based treatment received FDA approval.\n\nEthical dimension:\n1. Germline editing: modifications to embryos or reproductive cells are hereditary — raising concerns about 'designer babies' and genetic enhancement of non-medical traits.\n2. Access inequality: if CRISPR therapies remain extremely expensive, they will only be available to the wealthy, deepening health inequalities.\n3. Unintended consequences: off-target mutations could have unpredictable effects on future generations.\n\nConclusion: CRISPR represents a genuine scientific revolution, but its governance requires international consensus. The scientific community and regulators must distinguish therapeutic applications from enhancement, and ensure democratic oversight of this powerful technology." }
        },
        {
          parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Impact économique des innovations, marché vert, disruption',
          vocab:['disruption','R&D investment','green economy','patent','venture capital','externality','GDP'],
          exercice:{ id:'EX-AX6-E1', niveau:'Intermédiaire', titre:'Green Innovation Economy (SES)',
            enonce:"'Investing in green technology is not just an environmental necessity — it is an economic opportunity.' Discuss with examples.",
            correction:"The green economy represents both a response to climate change and a major economic opportunity.\n\nEvidence:\n1. The renewable energy sector now employs more people globally than fossil fuels. Solar and wind energy costs have fallen by 89% and 70% respectively since 2010, making them the cheapest energy sources in history.\n2. Countries that lead in green innovation (Germany, Denmark, South Korea) are capturing growing global markets in electric vehicles, clean hydrogen and energy-efficient technologies.\n3. The EU's Green Deal commits €1 trillion in green investment, creating an estimated 1 million new jobs.\n\nRisks:\n• The transition may displace workers in fossil fuel industries — requiring significant retraining investment.\n• Developing countries may lack the capital to transition at the same pace.\n\nConclusion: Green innovation is an economic imperative as much as an ecological one. Nations that invest now will lead the industries of tomorrow." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// AXE 7 — DIVERSITY & INCLUSION
// ─────────────────────────────────────────────────────────────────────
'ax7-diversity-inclusion': {
  id:'ax7-diversity-inclusion', num:7, emoji:'⚖️',
  color:'#f97316',
  titre:'Diversity & Inclusion',
  desc:"Gender equality, minorities and representation, social justice, discrimination and the law, inclusive society.",
  souschapitres:[
    {
      id:'sc-ax7-1', titre:'7.1 Gender Equality & Social Justice',
      notions:[
        'Gender equality: equal rights, responsibilities and opportunities for all genders in all spheres of life',
        'Intersectionality (Kimberlé Crenshaw): the way multiple identities (race, gender, class) create overlapping systems of discrimination',
        'Glass ceiling: the invisible barrier preventing women and minorities from reaching top positions',
        '#MeToo movement: the global movement exposing sexual harassment and advocating for women\'s rights',
      ],
      vocab:[
        { en:'equality',         fr:'égalité',          exemple:'Equality before the law is a fundamental right.' },
        { en:'equity',           fr:'équité',           exemple:'Equity means giving people what they need, not the same thing.' },
        { en:'gender pay gap',   fr:'écart salarial',   exemple:'The gender pay gap persists in most industries.' },
        { en:'discrimination',   fr:'discrimination',   exemple:'Racial discrimination is illegal but still widespread.' },
        { en:'empowerment',      fr:'émancipation',     exemple:'Education is key to the empowerment of women.' },
        { en:'minority',         fr:'minorité',         exemple:'Minorities are underrepresented in parliament.' },
        { en:'representation',   fr:'représentation',   exemple:'Representation matters in media and politics.' },
        { en:'bias',             fr:'biais',            exemple:'Unconscious bias affects hiring decisions.' },
      ],
      grammar:[
        {
          regle:"Reported speech — reporting arguments and studies:\nSay/claim/argue/suggest + that + clause\nAccording to + source\nResearch shows/suggests/indicates + that",
          exemples:[
            "Researchers claim that the gender pay gap is caused by structural rather than individual factors.",
            "According to the World Economic Forum, gender equality will not be achieved for another 132 years at the current pace.",
            "Studies suggest that diverse boards make better business decisions.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-AX7-1', niveau:'Intermédiaire', titre:'The Gender Pay Gap',
          enonce:"Read: 'In the UK, women earn on average 14.9% less than men for equivalent work. This gap is partly explained by occupational segregation — women are overrepresented in lower-paid sectors — and partly by unconscious bias in hiring and promotion.'\n\nQ1: What is the gender pay gap in the UK?\nQ2: Give two explanations from the text.\nQ3: Propose two policy measures that could reduce the pay gap.",
          correction:"Q1: Women in the UK earn on average 14.9% less than men for equivalent work.\n\nQ2: Two explanations:\n• Occupational segregation — women are concentrated in lower-paid sectors such as care, cleaning and administrative work.\n• Unconscious bias in hiring and promotion decisions disadvantages women.\n\nQ3: Possible policy measures:\n1. Mandatory pay transparency: require companies to publish salary data broken down by gender, making discrimination visible and enforceable.\n2. Affordable childcare: subsidized childcare would allow more women to maintain full-time careers and reduce the 'motherhood penalty'.",
        },
      ],
      specs:[
        {
          parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Inégalités sociales, politiques de redistribution, sociologie des inégalités',
          vocab:['social mobility','socioeconomic','redistribution','affirmative action','welfare state','Gini coefficient'],
          exercice:{ id:'EX-AX7-S1', niveau:'Difficile', titre:'Social Inequality & Policy (SES)',
            enonce:"'Affirmative action policies are necessary to correct historical injustices.' Discuss from a sociological and economic perspective.",
            correction:"Affirmative action refers to policies that give preferential treatment to historically disadvantaged groups in education, employment or public contracts.\n\nArguments for:\n• Historical injustice creates structural disadvantage that cannot be corrected by 'equal treatment' alone. Centuries of discrimination in housing, education and employment compound over generations.\n• Research shows diverse organizations are more innovative and productive. Affirmative action corrects market failures caused by discrimination.\n• Countries with targeted policies (USA, India, Brazil, South Africa) have seen measurable increases in minority representation in universities and professions.\n\nArguments against:\n• Critics argue it constitutes 'reverse discrimination' against equally qualified majority candidates.\n• Some studies suggest it can be stigmatizing — creating doubt about whether minority members earned their positions on merit.\n\nConclusion: The debate ultimately turns on whether equality means identical treatment or equitable outcomes. Most sociologists argue that without deliberate corrective policies, structural inequalities perpetuate themselves indefinitely." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// AXE 8 — TERRITORY & MEMORY
// ─────────────────────────────────────────────────────────────────────
'ax8-territory-memory': {
  id:'ax8-territory-memory', num:8, emoji:'🏛️',
  color:'#84cc16',
  titre:'Territory & Memory',
  desc:"War memory, colonial history, national identity, heritage preservation, historical narratives.",
  souschapitres:[
    {
      id:'sc-ax8-1', titre:'8.1 War Memory & Historical Narratives',
      notions:[
        'Collective memory: the shared understanding of historical events within a community or nation',
        'Commemoration: practices (ceremonies, memorials, anniversaries) that honour past events and victims',
        'Historical revisionism: the reinterpretation of historical events — legitimate scholarship vs. distortion',
        'Colonial legacy: the long-term political, economic and cultural consequences of colonialism',
      ],
      vocab:[
        { en:'commemoration',    fr:'commémoration',    exemple:'The annual commemoration of D-Day draws world leaders.' },
        { en:'memorial',         fr:'mémorial',         exemple:'The Vietnam Veterans Memorial is in Washington D.C.' },
        { en:'legacy',           fr:'héritage, legs',   exemple:'The colonial legacy continues to shape geopolitics.' },
        { en:'reconciliation',   fr:'réconciliation',   exemple:'Truth and Reconciliation Commissions promote healing.' },
        { en:'identity',         fr:'identité',         exemple:'Shared history is central to national identity.' },
        { en:'trauma',           fr:'traumatisme',      exemple:'Collective trauma shapes societies for generations.' },
        { en:'archive',          fr:'archives',         exemple:'Digital archives preserve historical documents.' },
        { en:'reparation',       fr:'réparation',       exemple:'Reparations for slavery remain a contested issue.' },
      ],
      grammar:[
        {
          regle:"Past Perfect — sequencing historical events:\nHad + past participle\nUsed to indicate an action completed before another past action",
          exemples:[
            "By the time the Nuremberg Trials began, Nazi leaders had committed crimes against millions.",
            "Many former colonies had been independent for decades before the full consequences of colonialism were acknowledged.",
          ]
        },
        {
          regle:"Passive constructions in historical writing:\nEmphasis on the action/object rather than the agent\nUseful when the agent is unknown or less important",
          exemples:[
            "Hiroshima was bombed on August 6, 1945.",
            "Millions of Africans were enslaved and transported across the Atlantic.",
            "The Berlin Wall was torn down in November 1989.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-AX8-1', niveau:'Difficile', titre:'Essay — Should colonial-era monuments be removed?',
          enonce:"'Removing statues of colonial figures erases history rather than confronting it.' Write a structured argumentative essay (180-200 words).",
          correction:"Introduction: The debate over colonial monuments has intensified since the removal of Edward Colston's statue in Bristol in 2020, forcing societies to confront difficult questions about how to remember a contested past.\n\nFor removal: Statues are not neutral historical records — they are choices about who is celebrated in public space. Honouring slave traders sends a message to their descendants about whose history is valued. Removing or relocating such statues does not erase history; it removes an endorsement. Museums and educational programmes can contextualize the past far more effectively than uncritical public celebration.\n\nAgainst removal: Some argue that removing statues sets a dangerous precedent — who decides which historical figures deserve celebration? Furthermore, erasure prevents the discomfort that drives genuine historical reckoning. Better to add context — plaques, counter-monuments — than to remove.\n\nConclusion: History cannot be erased, but public space can be reimagined. The most productive approach combines contextualisation, community dialogue and the elevation of previously silenced voices — transforming memorials from endorsements into genuine historical engagement.",
        },
      ],
      specs:[
        {
          parcours:'📚 LLCER', icon:'📚', color:'#ec4899',
          focus:"Analyse historique approfondie, littérature postcoloniale",
          vocab:['postcolonial','decolonization','subaltern','narrative power','diaspora','archive','voice'],
          exercice:{ id:'EX-AX8-L1', niveau:'Difficile', titre:'Postcolonial Literature (LLCER)',
            enonce:"How does postcolonial literature challenge dominant historical narratives? Analyse with reference to a text or author you have studied.",
            correction:"Postcolonial literature fundamentally challenges the idea that history has a single, authoritative narrative. By giving voice to those who were colonized, silenced and marginalized, it disrupts the comfortable certainties of the colonial perspective.\n\nChimamanda Ngozi Adichie's famous TED talk 'The Danger of a Single Story' (2009) captures this perfectly: when only one version of Africa is told — poverty, conflict, disease — it becomes 'the' story, erasing the complexity and humanity of 54 nations and hundreds of cultures.\n\nIn literature, Chinua Achebe's 'Things Fall Apart' deliberately challenges the Conradian vision of Africa as a 'heart of darkness'. By presenting Igbo society from within — its richness, internal conflicts and humanity — Achebe insists that colonization destroyed not chaos but civilization.\n\nConclusion: Postcolonial literature is ultimately an act of epistemic justice — the recovery of the right to tell one's own story, in one's own terms." }
        },
      ],
    },
  ],
},

} // fin ALL_AXES

// ══════════════════════════════════════════════════════════════════════
// UI HELPERS
// ══════════════════════════════════════════════════════════════════════
function NiveauBadge({ niveau }: { niveau:string }) {
  const cfg = niveau==='Facile'
    ? { bg:'rgba(6,214,160,0.15)', color:'#06d6a0' }
    : niveau==='Difficile'
    ? { bg:'rgba(239,68,68,0.15)', color:'#ef4444' }
    : { bg:'rgba(245,158,11,0.15)', color:'#f59e0b' }
  return (
    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, fontWeight:600,
      background:cfg.bg, color:cfg.color }}>{niveau}</span>
  )
}

// ══════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════
export default function AnglaisTerminaleSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'ax1-identities-exchanges'
  const axe = ALL_AXES[slug]

  const [openSc, setOpenSc]     = useState<string|null>(null)
  const [openEx, setOpenEx]     = useState<string|null>(null)
  const [openGram, setOpenGram] = useState<string|null>(null)
  const [activeSpec, setActiveSpec] = useState<number>(0)

  if (!axe) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex',
        alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📖</div>
          <h2>Axe non trouvé</h2>
          <Link href="/bac-france/anglais/terminale" style={{ color:'#f43f5e' }}>← Retour Terminale</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#f43f5e'

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom:'1px solid var(--border)',
          padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)',
          alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link><span>›</span>
          <Link href="/bac-france/anglais" style={{ color:'var(--muted)', textDecoration:'none' }}>🇬🇧 Anglais</Link><span>›</span>
          <Link href="/bac-france/anglais/terminale" style={{ color:'var(--muted)', textDecoration:'none' }}>Terminale</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{axe.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:32, alignItems:'start' }}>

            {/* CONTENU PRINCIPAL */}
            <div>
              {/* HEADER */}
              <div style={{ marginBottom:36 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:32 }}>{axe.emoji}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:secColor,
                    background:`${secColor}18`, padding:'3px 12px', borderRadius:8, fontWeight:700 }}>
                    AXE {axe.num}
                  </span>
                  <span style={{ fontSize:11, background:'rgba(244,63,94,0.15)', color:'#fb7185',
                    padding:'2px 9px', borderRadius:10 }}>
                    🇬🇧 Terminale · Bac 2027
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:8 }}>
                  {axe.emoji} {axe.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:580, marginBottom:18 }}>{axe.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Anglais Terminale France — Axe '+axe.num+' — '+axe.titre)}&subject=anglais`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7,
                      padding:'8px 16px', borderRadius:10,
                      background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat Prof — cet axe
                  </Link>
                  <Link href="/simulation-france" style={{ display:'inline-flex', alignItems:'center', gap:7,
                    padding:'8px 16px', borderRadius:10, background:'rgba(255,255,255,0.06)',
                    border:'1px solid rgba(255,255,255,0.12)', color:'var(--text2)',
                    fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    🎯 Simulation Bac France
                  </Link>
                </div>
              </div>

              {/* SOUS-CHAPITRES */}
              {axe.souschapitres.map((sc, scIdx) => (
                <div key={sc.id} style={{ marginBottom:24, background:`${secColor}05`,
                  border:`1px solid ${secColor}20`, borderRadius:18, overflow:'hidden' }}>

                  {/* Header */}
                  <button onClick={() => setOpenSc(openSc===sc.id ? null : sc.id)}
                    style={{ width:'100%', background:`${secColor}12`, padding:'16px 22px',
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                      cursor:'pointer', border:'none', textAlign:'left' }}>
                    <div>
                      <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6 }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                          color:secColor, fontWeight:700 }}>
                          {String(scIdx+1).padStart(2,'0')}
                        </span>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>
                          {sc.titre}
                        </h2>
                      </div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                        {sc.notions.slice(0,2).map(n => (
                          <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:12,
                            background:`${secColor}12`, color:'var(--text2)',
                            border:`1px solid ${secColor}18`, maxWidth:280,
                            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize:18, color:secColor, marginLeft:12 }}>
                      {(openSc===sc.id || scIdx===0) ? '▲' : '▼'}
                    </span>
                  </button>

                  {(openSc===sc.id || scIdx===0) && (
                    <div style={{ padding:'22px 24px', display:'flex', flexDirection:'column', gap:28 }}>

                      {/* NOTIONS */}
                      <div>
                        <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>
                          💡 Key Notions
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {sc.notions.map(n => (
                            <div key={n} style={{ display:'flex', gap:10, padding:'10px 14px',
                              background:'rgba(255,255,255,0.03)',
                              border:'1px solid rgba(255,255,255,0.07)', borderRadius:10 }}>
                              <span style={{ color:secColor, fontWeight:700, flexShrink:0 }}>▸</span>
                              <span style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6 }}>{n}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* VOCABULAIRE */}
                      <div>
                        <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:14 }}>
                          📝 Vocabulary
                        </div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                          {sc.vocab.map(v => (
                            <div key={v.en} style={{ background:'rgba(255,255,255,0.03)',
                              border:'1px solid rgba(255,255,255,0.07)',
                              borderRadius:10, padding:'10px 12px' }}>
                              <div style={{ display:'flex', gap:8, alignItems:'baseline', marginBottom:4 }}>
                                <span style={{ fontWeight:800, fontSize:13, color:secColor }}>{v.en}</span>
                                <span style={{ fontSize:11, color:'var(--muted)', fontStyle:'italic' }}>{v.fr}</span>
                              </div>
                              <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5,
                                fontStyle:'italic', borderLeft:`2px solid ${secColor}40`, paddingLeft:8 }}>
                                "{v.exemple}"
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* GRAMMAR */}
                      {sc.grammar.length > 0 && (
                        <div>
                          <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>
                            ✍️ Grammar Focus
                          </div>
                          {sc.grammar.map((g, gi) => {
                            const gKey = `${sc.id}-g${gi}`
                            return (
                              <div key={gKey} style={{ border:`1px solid ${secColor}25`,
                                borderRadius:12, overflow:'hidden', marginBottom:10 }}>
                                <button onClick={() => setOpenGram(openGram===gKey ? null : gKey)}
                                  style={{ width:'100%', padding:'12px 16px',
                                    background:`${secColor}10`, border:'none', textAlign:'left',
                                    cursor:'pointer', display:'flex',
                                    justifyContent:'space-between', alignItems:'center' }}>
                                  <span style={{ fontSize:12, fontWeight:700, color:secColor }}>
                                    {g.regle.split('\n')[0]}
                                  </span>
                                  <span style={{ color:secColor }}>{openGram===gKey ? '▲' : '▼'}</span>
                                </button>
                                {openGram===gKey && (
                                  <div style={{ padding:'14px 16px', background:'rgba(0,0,0,0.2)' }}>
                                    <pre style={{ fontSize:12, color:'var(--text2)',
                                      whiteSpace:'pre-wrap', margin:'0 0 12px',
                                      fontFamily:'var(--font-mono)', lineHeight:1.7 }}>
                                      {g.regle}
                                    </pre>
                                    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                                      {g.exemples.map((ex, ei) => (
                                        <div key={ei} style={{ fontSize:12, color:'var(--text2)',
                                          fontStyle:'italic', background:'rgba(255,255,255,0.04)',
                                          padding:'8px 12px', borderRadius:8,
                                          borderLeft:`3px solid ${secColor}` }}>
                                          "{ex}"
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {/* EXERCICES COMMUNS */}
                      {sc.exercices.length > 0 && (
                        <div>
                          <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>
                            📝 Exercices — Tronc commun
                          </div>
                          {sc.exercices.map(ex => (
                            <div key={ex.id} style={{ background:'var(--surface)',
                              border:'1px solid var(--border)', borderRadius:12,
                              overflow:'hidden', marginBottom:10 }}>
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
                                <Link href={`/solve?q=${encodeURIComponent('Anglais Terminale France — '+ex.enonce)}&subject=anglais`}
                                  className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                  🤖 Aide IA
                                </Link>
                                <button onClick={() => setOpenEx(openEx===ex.id ? null : ex.id)}
                                  style={{ fontSize:11, padding:'5px 12px', borderRadius:7,
                                    border:'1px solid var(--border)', background:'transparent',
                                    color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
                                  📋 {openEx===ex.id ? 'Masquer' : 'Correction'}
                                </button>
                              </div>
                              {openEx===ex.id && (
                                <div style={{ padding:'10px 16px',
                                  borderTop:'1px solid var(--border)',
                                  background:`${secColor}06` }}>
                                  <div style={{ fontSize:10, color:secColor,
                                    fontWeight:700, marginBottom:4 }}>✅ Model Answer</div>
                                  <pre style={{ fontSize:12, color:'var(--text2)',
                                    lineHeight:1.75, whiteSpace:'pre-wrap', margin:0 }}>
                                    {ex.correction}
                                  </pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* SPÉCIFICITÉS PAR PARCOURS */}
                      {sc.specs.length > 0 && (
                        <div style={{ borderTop:`2px solid ${secColor}30`, paddingTop:24 }}>
                          <div style={{ marginBottom:16 }}>
                            <div style={{ fontSize:13, fontWeight:800, color:'var(--text)', marginBottom:6 }}>
                              ✨ Spécificités par parcours
                            </div>
                            <div style={{ fontSize:12, color:'var(--muted)' }}>
                              Contenu adapté selon votre filière.
                            </div>
                          </div>
                          {/* Sélecteur parcours */}
                          <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
                            {sc.specs.map((sp, si) => (
                              <button key={sp.parcours} onClick={() => setActiveSpec(si)}
                                style={{ padding:'7px 14px', borderRadius:10,
                                  border:`2px solid`,
                                  borderColor: activeSpec===si ? sp.color : 'rgba(255,255,255,0.1)',
                                  background: activeSpec===si ? `${sp.color}18` : 'transparent',
                                  color: activeSpec===si ? sp.color : 'rgba(255,255,255,0.4)',
                                  fontSize:12, fontWeight:700, cursor:'pointer',
                                  fontFamily:'inherit', display:'flex',
                                  alignItems:'center', gap:5, transition:'all 0.15s' }}>
                                <span>{sp.icon}</span>
                                <span>{sp.parcours.replace(/[^ -~]+/g,'').trim()}</span>
                              </button>
                            ))}
                          </div>
                          {/* Contenu spec active */}
                          {(() => {
                            const sp = sc.specs[activeSpec]
                            if (!sp) return null
                            return (
                              <div style={{ background:`${sp.color}08`,
                                border:`1.5px solid ${sp.color}25`,
                                borderRadius:14, padding:'20px 22px' }}>
                                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14 }}>
                                  <span style={{ fontSize:22 }}>{sp.icon}</span>
                                  <div>
                                    <div style={{ fontSize:10, color:sp.color, fontWeight:700,
                                      textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>
                                      {sp.parcours}
                                    </div>
                                    <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>
                                      {sp.focus}
                                    </div>
                                  </div>
                                </div>
                                {/* Vocab spécifique */}
                                <div style={{ marginBottom:14 }}>
                                  <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700,
                                    textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>
                                    Vocabulaire spécifique
                                  </div>
                                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                                    {sp.vocab.map(v => (
                                      <span key={v} style={{ fontSize:11, padding:'3px 10px',
                                        borderRadius:20, background:`${sp.color}14`,
                                        color:sp.color, border:`1px solid ${sp.color}25`,
                                        fontWeight:600 }}>{v}</span>
                                    ))}
                                  </div>
                                </div>
                                {/* Exercice spécifique */}
                                <div style={{ background:'var(--surface)',
                                  border:`1px solid ${sp.color}20`,
                                  borderRadius:12, overflow:'hidden' }}>
                                  <div style={{ padding:'12px 16px' }}>
                                    <div style={{ display:'flex', gap:7, alignItems:'center',
                                      marginBottom:7, flexWrap:'wrap' }}>
                                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                                        color:sp.color, background:`${sp.color}14`,
                                        padding:'2px 8px', borderRadius:5 }}>
                                        {sp.exercice.id}
                                      </span>
                                      <NiveauBadge niveau={sp.exercice.niveau} />
                                      <span style={{ fontWeight:600, fontSize:13 }}>
                                        {sp.exercice.titre}
                                      </span>
                                    </div>
                                    <p style={{ fontSize:12, color:'var(--text2)', margin:0,
                                      lineHeight:1.65, whiteSpace:'pre-line' }}>
                                      {sp.exercice.enonce}
                                    </p>
                                  </div>
                                  <div style={{ borderTop:`1px solid ${sp.color}20`,
                                    padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>
                                    <Link href={`/solve?q=${encodeURIComponent(sp.exercice.enonce)}&subject=anglais`}
                                      className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                      🤖 Aide IA
                                    </Link>
                                    <button onClick={() => setOpenEx(openEx===sp.exercice.id ? null : sp.exercice.id)}
                                      style={{ fontSize:11, padding:'5px 12px', borderRadius:7,
                                        border:`1px solid ${sp.color}30`, background:'transparent',
                                        color:sp.color, cursor:'pointer', fontFamily:'inherit' }}>
                                      📋 {openEx===sp.exercice.id ? 'Masquer' : 'Model Answer'}
                                    </button>
                                  </div>
                                  {openEx===sp.exercice.id && (
                                    <div style={{ padding:'10px 16px',
                                      borderTop:`1px solid ${sp.color}20`,
                                      background:`${sp.color}06` }}>
                                      <div style={{ fontSize:10, color:sp.color,
                                        fontWeight:700, marginBottom:4 }}>✅ Model Answer</div>
                                      <pre style={{ fontSize:12, color:'var(--text2)',
                                        lineHeight:1.75, whiteSpace:'pre-wrap', margin:0 }}>
                                        {sp.exercice.correction}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* NAV PREV / NEXT */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12,
                borderTop:'1px solid var(--border)', paddingTop:22, marginTop:8 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/anglais/terminale/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[prevSlug].replace(/AX\d — /,'')}
                      </div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/anglais/terminale/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right',
                      transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[nextSlug].replace(/AX\d — /,'')}
                      </div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* SIDEBAR */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#fb7185', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(244,63,94,0.08)' }}>
                  🇬🇧 Terminale · 8 Axes
                </div>
                {NAV_ORDER.map(s => (
                  <Link key={s} href={`/bac-france/anglais/terminale/${s}`}
                    style={{ textDecoration:'none' }}>
                    <div style={{ padding:'10px 15px', borderBottom:'1px solid var(--border)',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1,
                        fontFamily:'var(--font-mono)' }}>
                        {TITRES_NAV[s].split(' — ')[0]}
                      </div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400,
                        color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>
                        {TITRES_NAV[s].replace(/AX\d — /,'').slice(0,22)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>
                  Actions
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Anglais Terminale — '+axe.titre)}&subject=anglais`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat Prof Anglais
                  </Link>
                  <Link href="/bac-france/anglais/premiere" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📗 Première</Link>
                  <Link href="/bac-france/anglais/seconde" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📘 Seconde</Link>
                  <Link href="/bac-france/anglais/terminale" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>↩ Tous les axes</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer/>
      <style>{`
        @media(max-width:900px){
          div[style*="grid-template-columns: 1fr 260px"]{grid-template-columns:1fr!important;}
          aside{display:none;}
        }
        @media(max-width:600px){
          div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}
        }
      `}</style>
    </>
  )
}