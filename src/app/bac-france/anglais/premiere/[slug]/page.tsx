'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
//  ANGLAIS PREMIÈRE FRANCE — [SLUG]
//  Route : /bac-france/anglais/premiere/[slug]
//  8 axes thématiques · Programme officiel MEN 2026/2027
//  Niveau B2 · Argumentation · Analyse · Grand Oral
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

type Exo  = { id:string; niveau:'Facile'|'Intermédiaire'|'Difficile'; titre:string; enonce:string; correction:string }
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
// DONNÉES — 8 AXES PREMIÈRE
// ══════════════════════════════════════════════════════════════════════
const ALL_AXES: Record<string,Axe> = {

// ─────────────────────────────────────────────────────────────────────
// AXE 1 — IDENTITIES AND EXCHANGES
// ─────────────────────────────────────────────────────────────────────
'ax1-identities-exchanges': {
  id:'ax1-identities-exchanges', num:1, emoji:'🌍',
  color:'#f59e0b',
  titre:'Identities and Exchanges',
  desc:"Cultural identity, migration, globalization, the American Dream and multicultural societies. Foundation of the 8-axis programme.",
  souschapitres:[
    {
      id:'sc-p-ax1-1', titre:'1.1 Cultural Identity & the American Dream',
      notions:[
        'Cultural identity: sense of belonging shaped by language, history, values, and traditions',
        'The American Dream: the ideal that success is achievable through determination and hard work, regardless of origin',
        'Multiculturalism: the coexistence of multiple cultures in one society — enrichment vs. tension',
        'Migration and identity: how moving between cultures shapes and challenges personal identity',
      ],
      vocab:[
        { en:'identity',      fr:'identité',          exemple:'Cultural identity is shaped by language, tradition and history.' },
        { en:'heritage',      fr:'patrimoine',        exemple:'Our cultural heritage connects us to our ancestors.' },
        { en:'immigrant',     fr:'immigré(e)',         exemple:'Her grandmother was an immigrant from Ireland.' },
        { en:'assimilation',  fr:'assimilation',       exemple:'Assimilation often means giving up one\'s original culture.' },
        { en:'belonging',     fr:'sentiment d\'appartenance',exemple:'She felt a strong sense of belonging to her community.' },
        { en:'multicultural', fr:'multiculturel',      exemple:'London is one of the world\'s most multicultural cities.' },
        { en:'diaspora',      fr:'diaspora',           exemple:'The Irish diaspora is spread across the globe.' },
        { en:'melting pot',   fr:'creuset',            exemple:'America has been called a melting pot of cultures.' },
      ],
      grammar:[
        {
          regle:"Present Perfect for ongoing situations and life experience:\nHave/has + past participle\nKey time expressions: since, for, ever, never, already, yet, just",
          exemples:[
            "Immigration has transformed British society since the 1950s. (ongoing consequence)",
            "I have never experienced discrimination based on my identity. (life experience)",
            "She has already visited 15 countries — her sense of identity is global. (completed with relevance)",
          ]
        },
        {
          regle:"Expressing concession and contrast:\nAlthough/Even though + clause (concession)\nDespite/In spite of + noun/gerund\nWhile/Whereas (comparing two contrasting ideas)",
          exemples:[
            "Although multiculturalism enriches society, it can also create tensions.",
            "Despite centuries of immigration, questions of national identity persist.",
            "While the American Dream promises opportunity, social mobility has declined.",
          ]
        },
      ],
      exercices:[
        { id:'EX-P-AX1-1', niveau:'Intermédiaire', titre:'Analysis — The American Dream',
          enonce:"Read: 'The American Dream holds that every person, regardless of background, can achieve success through hard work. Yet research shows that the USA has lower social mobility than most European countries.'\n\nQ1: Summarize the American Dream in your own words.\nQ2: What paradox does the text reveal?\nQ3: In your opinion, is the American Dream still relevant today? Justify in 4-5 lines.",
          correction:"Q1: The American Dream is the belief that anyone in America can achieve success and prosperity through determination and hard work, regardless of their social origin or background.\n\nQ2: The paradox is that while the American Dream promises equal opportunity and upward mobility, reality shows that the USA has lower social mobility than most European countries — meaning the conditions for achieving the dream are actually harder than the ideal suggests.\n\nQ3: Model answer: I believe the American Dream remains a powerful cultural myth, but it has become increasingly difficult to achieve. Rising inequality, the cost of education and healthcare, and structural discrimination mean that success depends heavily on circumstances of birth. However, the ideal continues to inspire immigrants who still see America as a land of possibility." },
        { id:'EX-P-AX1-2', niveau:'Difficile', titre:'Argumentative essay — Multiculturalism',
          enonce:"'Multiculturalism is a source of strength for modern societies.' Write a structured argumentative essay (180-200 words) discussing this statement.",
          correction:"Introduction: Multiculturalism — the coexistence of multiple cultures within one society — is among the defining features of contemporary democracies. I believe it is, fundamentally, a source of strength.\n\nFor — enrichment: Diverse societies benefit from a wider range of perspectives, which drives creativity and innovation. Research consistently shows that ethnically diverse teams make better decisions. Cities like London, Toronto and New York demonstrate that cultural diversity and economic dynamism often go hand in hand. Moreover, exposure to different cultures broadens individual horizons and fosters empathy.\n\nNuance — challenges: Multiculturalism is not without difficulties. Social integration requires sustained investment in education, language learning and inclusive institutions. Without this, cultural misunderstandings can fuel inequality and tension.\n\nConclusion: Multiculturalism's success depends not on the diversity itself, but on how societies manage it — through policies that promote genuine inclusion, equal opportunity and intercultural dialogue. When these conditions are met, diversity becomes one of society's greatest assets." },
      ],
      specs:[
        { parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Migration économique, brain drain, mondialisation et marchés du travail',
          vocab:['brain drain','remittances','labour market','economic migrant','push/pull factors','integration policy'],
          exercice:{ id:'EX-P-AX1-S1', niveau:'Difficile', titre:'Brain Drain & Economy (SES)',
            enonce:"'Brain drain is a growing challenge for developing countries.' Explain what brain drain is and analyse its economic consequences for sending and receiving countries.",
            correction:"Brain drain refers to the emigration of highly skilled workers — doctors, engineers, researchers — from developing countries to wealthier nations in search of better pay and opportunities.\n\nFor sending countries:\n• Loss of human capital built through years of public education investment\n• Reduced tax revenue and weakened public services (healthcare, education)\n• However, remittances sent home can partially offset losses and boost local consumption\n\nFor receiving countries:\n• Fills critical skills gaps (healthcare, technology, academia)\n• Boosts innovation and GDP growth\n• Risk of dependency on immigrant talent rather than developing domestic skills\n\nConclusion: Brain drain creates a global inequality paradox — it benefits wealthy nations while deepening the disadvantage of poorer ones. Solutions require international cooperation: fairer wages, circular migration programmes and investment in education and research in developing countries." }
        },
        { parcours:'💻 NSI/Sciences', icon:'🔬', color:'#6366f1',
          focus:'Mobilité scientifique internationale, collaboration et échanges technologiques',
          vocab:['scientific collaboration','research network','fellowship','STEM','knowledge sharing','open access'],
          exercice:{ id:'EX-P-AX1-S2', niveau:'Intermédiaire', titre:'International Science Collaboration (NSI)',
            enonce:"How has digital technology changed international scientific exchange? Give 3 concrete examples.",
            correction:"1. Open-access publishing: platforms like arXiv allow researchers globally to share preprints immediately, without paywalls — democratizing access to cutting-edge science regardless of institutional resources.\n\n2. International mega-projects: CERN, the Human Genome Project and the James Webb Space Telescope all required coordinated collaboration between thousands of scientists across dozens of countries — made possible by digital communication tools.\n\n3. Remote collaboration: tools like Zoom, shared cloud databases and version-controlled code repositories allow international research teams to co-author papers and share data in real time, without ever meeting physically.\n\nConclusion: Digital connectivity has transformed science from a predominantly national activity into a genuinely global endeavour, accelerating discovery and reducing duplication." }
        },
        { parcours:'📚 LLCER', icon:'📚', color:'#ec4899',
          focus:"Identité culturelle dans la littérature — analyse d'œuvres",
          vocab:['postcolonial','narrator','voice','exile','belonging','cultural clash','allegory','subtext'],
          exercice:{ id:'EX-P-AX1-L1', niveau:'Difficile', titre:'Literary Analysis — Identity (LLCER)',
            enonce:"In the texts you have studied, how does literature explore the complexity of cultural identity? Analyse with reference to at least one specific work.",
            correction:"Literature is uniquely positioned to explore the tension between inherited identity and chosen belonging. Unlike statistics or political discourse, fiction allows us to inhabit multiple perspectives simultaneously.\n\nIn Chimamanda Ngozi Adichie's 'Americanah', the protagonist Ifemelu arrives in the USA as a confident Nigerian and discovers she has become 'Black' — a category that did not exist in her home country. Identity, Adichie shows, is not fixed but is constructed differently depending on social context.\n\nSimilarly, in 'The Kite Runner', Khaled Hosseini explores how cultural identity is shaped by memory, guilt and displacement. Amir carries Afghanistan within him across decades and continents.\n\nConclusion: The literature of migration and cultural encounter consistently reveals that identity is not a stable essence but a dynamic process — constantly negotiated, challenged and reconstructed through experience of the Other." }
        },
      ],
    },
    {
      id:'sc-p-ax1-2', titre:'1.2 Globalization & International Exchanges',
      notions:[
        'Globalization: increasing economic, cultural and political interconnection between nations',
        'Cultural globalization: the worldwide spread of media, music, food and consumer culture',
        'Glocalization: the adaptation of global products to local cultural contexts',
        'Brexit as a case study: tensions between globalization and national sovereignty',
      ],
      vocab:[
        { en:'interconnected',  fr:'interconnecté',    exemple:'Modern economies are deeply interconnected.' },
        { en:'sovereignty',     fr:'souveraineté',     exemple:'Brexit was partly a vote to reclaim national sovereignty.' },
        { en:'trade',           fr:'commerce',         exemple:'International trade has grown rapidly since 1990.' },
        { en:'outsourcing',     fr:'délocalisation',   exemple:'Many companies outsource production to reduce costs.' },
        { en:'homogenization',  fr:'homogénéisation',  exemple:'Cultural globalization risks leading to homogenization.' },
        { en:'glocalization',   fr:'glocalisation',    exemple:'McDonald\'s adapts its menus locally — glocalization in action.' },
        { en:'interdependence', fr:'interdépendance',  exemple:'The pandemic revealed how deep our global interdependence is.' },
        { en:'protectionism',   fr:'protectionnisme',  exemple:'Protectionist policies try to shield domestic industries.' },
      ],
      grammar:[
        {
          regle:"Cause and consequence — academic register:\nCause: because of / due to / as a result of + noun\nConsequence: therefore / consequently / as a result / this has led to",
          exemples:[
            "Due to trade liberalization, global inequality has increased.",
            "As a result of Brexit, many EU citizens living in the UK faced uncertainty.",
            "Globalization has led to the spread of English as a global lingua franca.",
          ]
        },
      ],
      exercices:[
        { id:'EX-P-AX1-3', niveau:'Intermédiaire', titre:'Brexit — Essay paragraph',
          enonce:"Write ONE well-developed paragraph (80-100 words) explaining why Brexit happened. Use cause and consequence language, and include at least one specific fact or example.",
          correction:"Brexit — the UK's departure from the European Union — resulted from a combination of economic anxiety, concerns about sovereignty and cultural identity. Due to rising immigration following EU expansion in 2004, many communities felt that their local services and jobs were under pressure. As a result, support grew for politicians who promised to 'take back control'. In June 2016, 52% of British voters chose to leave. Consequently, the UK formally left the EU in January 2020, triggering years of complex trade negotiations and raising fundamental questions about the future of the United Kingdom itself." },
      ],
      specs:[
        { parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Économie mondiale — libre-échange, inégalités, politiques commerciales',
          vocab:['comparative advantage','WTO','tariff','trade deficit','multinational','supply chain','neoliberalism'],
          exercice:{ id:'EX-P-AX1-S3', niveau:'Difficile', titre:'Globalization & Inequality (SES)',
            enonce:"'Globalization has increased global wealth but also widened inequality within countries.' Discuss this statement using economic concepts and examples.",
            correction:"The statement reflects a genuine paradox of contemporary globalization.\n\nEvidence for — increased wealth: Since the 1990s, hundreds of millions in China and Southeast Asia have been lifted out of extreme poverty. Global GDP has quadrupled. Free trade has lowered prices for consumers worldwide.\n\nEvidence for — widened inequality within countries: In developed nations, manufacturing workers lost jobs to cheaper overseas competition. In the USA and UK, the top 1% of earners captured a disproportionate share of economic gains since 1980. The Gini coefficient has risen in most OECD countries.\n\nConclusion: The benefits of globalization have been real but unevenly distributed. Progressive taxation, investment in education and retraining, and stronger social protection are needed to ensure its gains are shared — rather than concentrating at the top." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// AXE 2 — PRIVATE & PUBLIC SPHERE
// ─────────────────────────────────────────────────────────────────────
'ax2-private-public-sphere': {
  id:'ax2-private-public-sphere', num:2, emoji:'📱',
  color:'#8b5cf6',
  titre:'Private Sphere & Public Sphere',
  desc:"Social media, digital identity, media power, privacy, surveillance and freedom of expression in the digital age.",
  souschapitres:[
    {
      id:'sc-p-ax2-1', titre:'2.1 Social Media, Digital Identity & Privacy',
      notions:[
        'Digital identity: the online representation of a person — profiles, posts, data trail',
        'Surveillance capitalism: personal data as the economic resource sold to advertisers (Shoshana Zuboff)',
        'Echo chamber / filter bubble: algorithmic tendency to reinforce existing beliefs',
        'Right to privacy vs freedom of information: fundamental tension in the digital age',
      ],
      vocab:[
        { en:'surveillance',     fr:'surveillance',         exemple:'Mass surveillance threatens civil liberties.' },
        { en:'data',             fr:'données',              exemple:'Personal data is the new oil of the digital economy.' },
        { en:'algorithm',        fr:'algorithme',           exemple:'Algorithms decide what content we see online.' },
        { en:'privacy',          fr:'vie privée',           exemple:'Users have a right to privacy online.' },
        { en:'consent',          fr:'consentement',         exemple:'GDPR requires explicit consent before data collection.' },
        { en:'tracking',         fr:'traçage',              exemple:'Online tracking follows users across websites.' },
        { en:'influencer',       fr:'influenceur',          exemple:'Influencers shape consumer behaviour and opinion.' },
        { en:'misinformation',   fr:'désinformation',       exemple:'Misinformation spreads faster than corrections.' },
      ],
      grammar:[
        {
          regle:"Passive voice — academic and journalistic writing:\nPresent Passive: is/are + past participle\nPast Passive: was/were + past participle\nPerfect Passive: has/have been + past participle",
          exemples:[
            "Personal data is collected and monetized without users' knowledge.",
            "Millions of accounts were compromised in the 2021 data breach.",
            "GDPR regulations have been adopted across the European Union.",
          ]
        },
        {
          regle:"Modals for criticizing current practices:\nShould → moral recommendation\nMust → strong obligation (often for laws/rules)\nCould/might → possibility, suggestion",
          exemples:[
            "Tech companies should be more transparent about how they use data.",
            "Governments must regulate artificial intelligence to prevent harm.",
            "Citizens could demand greater accountability from digital platforms.",
          ]
        },
      ],
      exercices:[
        { id:'EX-P-AX2-1', niveau:'Intermédiaire', titre:'Filter bubble — Analysis',
          enonce:"Q1: Explain in your own words what a 'filter bubble' is and how it is created.\nQ2: Describe 2 consequences for public debate and democracy.\nQ3: Suggest 2 practical strategies to escape your filter bubble.",
          correction:"Q1: A filter bubble is the result of social media algorithms that progressively show users only content matching their existing interests and opinions. By prioritizing engagement over breadth, platforms gradually shield users from opposing viewpoints, creating a personalized information environment.\n\nQ2: Consequences:\n• Political polarization — users become increasingly convinced their view is the majority, making compromise and dialogue harder.\n• Susceptibility to manipulation — isolated in their bubble, users are more vulnerable to targeted misinformation and propaganda.\n\nQ3: Strategies:\n• Deliberately follow accounts and media outlets with different political perspectives.\n• Regularly visit news websites across the political spectrum, rather than relying on social media feeds." },
        { id:'EX-P-AX2-2', niveau:'Difficile', titre:'Essay — Surveillance capitalism',
          enonce:"'In the digital economy, if you are not paying for the product, you are the product.' Write a structured essay (180-200 words) discussing this statement.",
          correction:"Introduction: The phrase 'if you are not paying, you are the product' captures a fundamental truth about the digital economy: the services we use for free — social media, search engines, email — are funded by selling our attention and data to advertisers.\n\nExplanation of the model: This is what Shoshana Zuboff calls 'surveillance capitalism'. Companies collect vast quantities of behavioral data — what we click, how long we watch, what we buy — and use it to build predictive profiles. These profiles are sold to advertisers for targeted marketing. The more time we spend on the platform, the more data is collected and the more valuable we become.\n\nCritique: The problem is not the economic model itself, but its lack of transparency. Most users have no idea how much data is collected or how it is used. Moreover, the pursuit of engagement has led platforms to amplify divisive content because outrage drives clicks.\n\nConclusion: Regulation — particularly meaningful consent requirements and algorithmic transparency — is urgently needed to rebalance power between users and platforms." },
      ],
      specs:[
        { parcours:'💻 NSI', icon:'💻', color:'#06b6d4',
          focus:'GDPR, encryption, data privacy, algorithmes de recommandation',
          vocab:['encryption','GDPR','metadata','data breach','anonymization','API','tracking cookie','hashing'],
          exercice:{ id:'EX-P-AX2-N1', niveau:'Difficile', titre:'GDPR Technical Analysis (NSI)',
            enonce:"Explain what the GDPR is, describe 3 rights it grants to citizens, and explain one technical measure companies use to comply with it.",
            correction:"The GDPR (General Data Protection Regulation), adopted in 2018, is the EU's comprehensive data protection law applying to any organization handling EU residents' data.\n\nThree key rights:\n1. Right to access: citizens can request all data held about them by a company.\n2. Right to erasure: individuals can demand deletion of their data when no longer necessary.\n3. Right to data portability: users can obtain their data in a machine-readable format to transfer to another service.\n\nTechnical compliance measure: Data anonymization — companies replace personally identifiable information (names, emails) with pseudonyms or remove it entirely, so data cannot be traced back to individuals even if breached. This reduces risk and simplifies GDPR compliance, since anonymized data is exempt from many regulations." }
        },
        { parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Économie de l\'attention, pouvoir des médias, opinion publique',
          vocab:['attention economy','media concentration','agenda-setting','public opinion','digital advertising','revenue model'],
          exercice:{ id:'EX-P-AX2-S1', niveau:'Difficile', titre:'The Attention Economy (SES)',
            enonce:"'Social media companies do not sell products — they sell users\' attention.' Explain this business model and discuss its societal consequences.",
            correction:"Social media platforms like Meta, TikTok and YouTube operate on what economist Herbert Simon called the 'attention economy': in a world of information abundance, human attention becomes the scarce resource, and therefore the commodity.\n\nThe business model:\nPlatforms provide free services to attract users, then monetize their time through targeted advertising. The more time users spend on the platform, the more ads are shown and the greater the revenue. In 2022, Meta earned $116 billion almost entirely from advertising.\n\nSocietal consequences:\n1. Design for addiction: features like infinite scroll, notifications and variable reward (not knowing when you'll get a 'like') are deliberately engineered to maximize time spent, borrowing techniques from casino design.\n2. Misinformation: outrage and fear generate more engagement than balanced information, incentivizing the spread of divisive or false content.\n3. Mental health: research links heavy social media use to anxiety and depression, especially among adolescents.\n\nConclusion: Regulating the attention economy requires not just privacy laws, but restrictions on addictive design and greater algorithmic transparency." }
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
  desc:"Art as protest and propaganda, censorship, music and politics, cinema and power, soft power.",
  souschapitres:[
    {
      id:'sc-p-ax3-1', titre:'3.1 Art as Protest & Propaganda',
      notions:[
        'Art as protest: challenging authority, exposing injustice, advocating for change',
        'Propaganda: the use of art and media to manipulate opinion and spread ideology',
        'Censorship: the suppression of artistic or journalistic expression by power',
        'Soft power (Joseph Nye): cultural influence as an instrument of foreign policy',
      ],
      vocab:[
        { en:'protest',       fr:'protestation',     exemple:'The mural was an act of artistic protest.' },
        { en:'censorship',    fr:'censure',          exemple:'Censorship of the press undermines democracy.' },
        { en:'propaganda',    fr:'propagande',       exemple:'Soviet propaganda used art to glorify communism.' },
        { en:'dissident',     fr:'dissident(e)',     exemple:'The dissident writer was forced into exile.' },
        { en:'subversive',    fr:'subversif/ive',    exemple:'Her subversive art questioned social norms.' },
        { en:'satire',        fr:'satire',           exemple:'Political satire uses humour to criticize power.' },
        { en:'soft power',    fr:'soft power',       exemple:'Hollywood exports American soft power globally.' },
        { en:'patronage',     fr:'mécénat',          exemple:'State patronage of the arts can compromise artistic freedom.' },
      ],
      grammar:[
        {
          regle:"Relative clauses — adding information about people, things and places:\nWho → people | Which/That → things | Whose → possession | Where → places\nDefining (no commas): essential to meaning\nNon-defining (with commas): additional information",
          exemples:[
            "Artists who challenge authority often face censorship. (defining)",
            "Banksy, whose real identity is unknown, is the world's most famous street artist. (non-defining)",
            "The gallery where the exhibition was held was immediately shut down. (defining)",
          ]
        },
      ],
      exercices:[
        { id:'EX-P-AX3-1', niveau:'Intermédiaire', titre:'Banksy & Protest Art',
          enonce:"Write a developed paragraph (80-100 words) explaining how Banksy's work represents art as a form of political protest. Use specific examples.",
          correction:"Banksy, the anonymous British street artist, represents one of the most powerful examples of art as political protest. His work appears without permission in public spaces worldwide — an act that is itself a challenge to authority and private property. Works such as 'Girl with Balloon', 'Napalm' and his murals on the West Bank separation wall directly confront war, inequality and political repression. By remaining anonymous, Banksy also subverts the art market's obsession with celebrity and commodity value. His art is democratic — displayed on streets for everyone, not locked in galleries for the privileged few." },
        { id:'EX-P-AX3-2', niveau:'Difficile', titre:'Essay — Can art change the world?',
          enonce:"'Art has the power to change the world.' Write a structured argumentative essay (180-200 words) discussing this statement.",
          correction:"Introduction: Whether art can genuinely change the world is one of the oldest questions in aesthetics and politics. I believe it can — not by itself, but as a catalyst for consciousness and action.\n\nFor — art as a force for change: History provides compelling evidence. Harriet Beecher Stowe's 'Uncle Tom's Cabin' (1852) helped shift Northern American opinion against slavery. Bob Dylan's protest songs gave voice to the Civil Rights movement. Picasso's 'Guernica' (1937) made the horrors of the Spanish Civil War visible to the world. These works did not alone end injustice — but they changed minds, which changed politics.\n\nNuance — limits: Art rarely changes the world on its own. It works best in conjunction with political movements, journalism and civic action. Authoritarian regimes fear art precisely because they understand its power — and they also use it as propaganda.\n\nConclusion: Art changes the world not through force but through feeling — by making the abstract human, the distant immediate, and the comfortable unbearable. In this sense, its power is real, if indirect." },
      ],
      specs:[
        { parcours:'📚 LLCER', icon:'📚', color:'#ec4899',
          focus:"Analyse d'œuvres — littérature et cinéma engagés — programme officiel LLCER",
          vocab:['dystopian','allegory','symbolism','totalitarianism','narrative voice','subtext','protagonist','imagery'],
          exercice:{ id:'EX-P-AX3-L1', niveau:'Difficile', titre:'Fahrenheit 451 — Art & Censorship (LLCER)',
            enonce:"In Ray Bradbury's 'Fahrenheit 451', books are burned by the state. How does the novel explore the relationship between art (literature), censorship and power?",
            correction:"Fahrenheit 451 presents a chilling vision of a future in which literature — the most subversive of art forms — has been eliminated by a totalitarian state. The title refers to the temperature at which paper ignites: book-burning is not a metaphor but state policy.\n\nBradbury's dystopia functions as an allegory for conformism and intellectual oppression. Captain Beatty articulates the regime's logic: books make people unhappy because they contain contradictions and difficult truths. A society that burns books burns the possibility of thought itself.\n\nThe protagonist Montag's journey from fireman to book-memorizer represents the individual's awakening to art's radical value. He discovers that literature preserves what regimes seek to destroy: memory, empathy and the capacity for moral reflection.\n\nConclusion: Bradbury's novel argues that censorship is never politically neutral — it is always an act of power, designed to preserve conformity and prevent the unsettling truths that art uniquely conveys. Reading this in 2026, the novel feels less like science fiction than warning." }
        },
        { parcours:'🎓 Général', icon:'🎓', color:'#f59e0b',
          focus:"Analyse culturelle — rôle de l'art dans la société contemporaine",
          vocab:['cultural impact','representation','medium','audience','influence','social commentary','imagery'],
          exercice:{ id:'EX-P-AX3-G1', niveau:'Intermédiaire', titre:'Music & Political Protest (Général)',
            enonce:"Give 2 specific examples of musicians who used their art as political protest and explain the impact they had.",
            correction:"1. Bob Dylan (USA, 1960s): During the Civil Rights movement, Dylan wrote protest songs like 'Blowin\' in the Wind' and 'The Times They Are A-Changin\'' that gave voice to demands for racial equality and against the Vietnam War. His lyrics reached millions and helped create a cultural climate that supported political change.\n\n2. Fela Kuti (Nigeria, 1970s-80s): The Afrobeat musician used his music to denounce the Nigerian military government's corruption and brutality. Despite multiple arrests, he continued to perform, becoming a symbol of resistance across Africa.\n\nIn both cases, music provided a language for political emotion that reached audiences conventional protest could not — demonstrating that art's power lies precisely in its ability to move people emotionally as well as intellectually." }
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
  desc:"Digital citizenship, online activism, fake news, AI influence, internet and democratic participation.",
  souschapitres:[
    {
      id:'sc-p-ax4-1', titre:'4.1 Digital Citizenship & Online Activism',
      notions:[
        'Digital citizenship: rights and responsibilities in online spaces — respect, privacy, critical thinking',
        'Online activism (hashtivism): using social media to advocate for social change (#MeToo, #BlackLivesMatter)',
        'Fake news: deliberately false information presented as journalism — amplified by social media',
        'Digital divide: unequal access to technology between social groups and countries',
      ],
      vocab:[
        { en:'activism',      fr:'activisme',        exemple:'Online activism has become a powerful tool for change.' },
        { en:'petition',      fr:'pétition',         exemple:'The online petition gathered 3 million signatures.' },
        { en:'hashtag',       fr:'hashtag',          exemple:'The hashtag went viral and reached global attention.' },
        { en:'viral',         fr:'viral',            exemple:'The video went viral overnight.' },
        { en:'disinformation',fr:'désinformation',   exemple:'State-sponsored disinformation campaigns are increasing.' },
        { en:'transparency',  fr:'transparence',     exemple:'Transparency from governments builds public trust.' },
        { en:'accountability',fr:'responsabilité',   exemple:'Corporations must be held accountable for data breaches.' },
        { en:'cyberbullying', fr:'cyberharcèlement', exemple:'Cyberbullying has serious mental health consequences.' },
      ],
      grammar:[
        {
          regle:"Conditionals in argumentative writing:\nType 1 (real/possible): If + present simple, will + infinitive\nType 2 (hypothetical/unreal): If + past simple, would + infinitive\nType 3 (impossible past): If + past perfect, would have + past participle",
          exemples:[
            "If governments regulate social media, misinformation will spread less rapidly. (Type 1)",
            "If citizens were better informed, they would be less susceptible to fake news. (Type 2)",
            "If the internet had not been invented, political activism would have looked very different. (Type 3)",
          ]
        },
      ],
      exercices:[
        { id:'EX-P-AX4-1', niveau:'Intermédiaire', titre:'Online Activism — Analysis',
          enonce:"Read: '#BlackLivesMatter began as a social media hashtag in 2013 and grew into one of the world's largest civil rights movements, reaching 47 million tweets in one week in 2020.'\n\nQ1: What does this example show about the power of online activism?\nQ2: In your opinion, does online activism create real change, or is it just 'slacktivism'? Justify in 5-6 lines.",
          correction:"Q1: This example shows that online activism can transform a local or national issue into a global movement rapidly and at minimal cost. Social media amplifies voices that traditional media might ignore and creates solidarity across borders.\n\nQ2: Model answer: I believe online activism can create real change, but only when it translates into offline action. #BlackLivesMatter is a strong example — it contributed to policy changes in policing in many US cities and triggered global debates about systemic racism. However, simply liking or sharing a post without further engagement risks reducing serious issues to mere performance. The most effective movements combine online visibility with grassroots organizing, legal action and political engagement." },
      ],
      specs:[
        { parcours:'💻 NSI', icon:'💻', color:'#06b6d4',
          focus:'Cybersécurité, IA et démocratie numérique — aspects techniques',
          vocab:['encryption','authentication','bot','deepfake','algorithm','open-source','dark web','phishing'],
          exercice:{ id:'EX-P-AX4-N1', niveau:'Difficile', titre:'Deepfakes & Democracy (NSI)',
            enonce:"'Deepfake technology poses a serious threat to democratic processes.' Explain what deepfakes are technically and analyse 2 specific democratic risks they pose.",
            correction:"What are deepfakes technically?\nDeepfakes are synthetic audio-visual content generated using deep learning techniques — specifically Generative Adversarial Networks (GANs). Two neural networks compete: one generates fake content, the other evaluates its authenticity. Through millions of iterations, the generator produces increasingly convincing outputs. The technology requires large datasets of real footage to train on.\n\nTwo democratic risks:\n1. Electoral manipulation: deepfake videos can show politicians saying things they never said, potentially damaging their reputation days before an election when corrections cannot reach the same audience.\n\n2. Erosion of trust: as deepfakes proliferate, the 'liar's dividend' emerges — even authentic footage can be dismissed as fake, undermining the evidentiary value of video in journalism and legal proceedings, and eroding public trust in institutions." }
        },
        { parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Opinion publique, démocratie et réseaux sociaux',
          vocab:['public opinion','democracy','polarization','echo chamber','misinformation','civil society','lobby'],
          exercice:{ id:'EX-P-AX4-S1', niveau:'Difficile', titre:'Social Media & Democracy (SES)',
            enonce:"'Social media has strengthened democracy by giving citizens a voice.' Discuss this statement from a political sociology perspective.",
            correction:"Social media's relationship with democracy is deeply ambivalent — it has simultaneously strengthened and weakened democratic processes.\n\nFor — a democratizing force: Social media has given previously marginalized voices access to public debate. The Arab Spring (2010-12) showed how platforms could enable citizens to organize against authoritarian regimes. Petitions reach millions in days. Investigative journalism is crowdfunded. Whistleblowers can publish documents directly to the public.\n\nAgainst — a threat to deliberation: However, the algorithmic logic of social media prioritizes engagement over reason. Filter bubbles reinforce existing beliefs. Misinformation spreads faster than corrections. Foreign interference in elections — as documented in 2016 and 2020 — exploits platform vulnerabilities. Political polarization has intensified in most democracies since the rise of social media.\n\nConclusion: Social media has expanded the quantity of political participation without necessarily improving its quality. Democratic strength requires not just more voices, but better conditions for reasoned, informed debate — which algorithmic platforms do not reliably provide." }
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
  desc:"Literature, cinema, dystopia, storytelling and the boundary between imagination and reality.",
  souschapitres:[
    {
      id:'sc-p-ax5-1', titre:'5.1 Dystopia, Utopia & Science Fiction',
      notions:[
        'Dystopia: a fictional society of oppression and suffering — a warning about potential futures',
        'Utopia: an imagined ideal society — a critique of present imperfections',
        'Science fiction as social commentary: SF explores present anxieties through imagined futures',
        'LLCER texts: 1984 (Orwell), Lord of the Flies (Golding), Fahrenheit 451 (Bradbury)',
      ],
      vocab:[
        { en:'dystopian',      fr:'dystopique',       exemple:'Orwell\'s dystopian vision feels increasingly relevant.' },
        { en:'totalitarian',   fr:'totalitaire',      exemple:'The totalitarian state controls every aspect of life.' },
        { en:'allegory',       fr:'allégorie',        exemple:'Animal Farm is an allegory of the Soviet Revolution.' },
        { en:'utopia',         fr:'utopie',           exemple:'Thomas More coined the word utopia in 1516.' },
        { en:'surveillance',   fr:'surveillance',     exemple:'In 1984, citizens live under constant surveillance.' },
        { en:'speculative',    fr:'spéculatif',       exemple:'Speculative fiction imagines alternative versions of reality.' },
        { en:'narrator',       fr:'narrateur/trice',  exemple:'The unreliable narrator creates suspense and uncertainty.' },
        { en:'foreshadowing',  fr:'présage',          exemple:'The author uses foreshadowing to build tension.' },
      ],
      grammar:[
        {
          regle:"Past narrative tenses — telling a story:\nPast Simple: completed sequential actions\nPast Continuous: background, interrupted or ongoing action\nPast Perfect: action that happened BEFORE another past action",
          exemples:[
            "Winston opened his diary and began to write. (Past Simple — sequence)",
            "While he was writing, he heard footsteps outside. (Past Continuous — interrupted)",
            "The thought police had already installed cameras in his room. (Past Perfect — prior action)",
          ]
        },
      ],
      exercices:[
        { id:'EX-P-AX5-1', niveau:'Difficile', titre:'Lord of the Flies — Essay',
          enonce:"'Lord of the Flies suggests that civilization is just a thin veneer over human savagery.' Write a structured essay (180-200 words) discussing this interpretation.",
          correction:"Introduction: Golding's 'Lord of the Flies' presents a disturbing thought experiment: what happens when the rules of civilization are removed? His answer is bleak — and deliberately so.\n\nFor the interpretation: The novel traces the rapid disintegration of order among a group of boys stranded on an island. Ralph's democratic conch is progressively drowned out by Jack's tribal violence. The boys who were choir boys become hunters who murder. Simon — a Christ-like figure of empathy — is killed by the group in a frenzy. Piggy, representing rationality, is killed last. Golding seems to suggest that civilization is not instinctive but learned — and easily forgotten.\n\nNuance: However, not all boys succumb. Ralph never fully abandons his values, and his grief at the novel's end signals that conscience survives even in darkness. Golding does not claim all humans are savage — rather that the conditions for savagery are always latent.\n\nConclusion: Writing in the shadow of Auschwitz and Hiroshima, Golding's message is sobering: civilization requires constant, conscious effort. Without it, the beast within — not from without — is the real danger." },
      ],
      specs:[
        { parcours:'📚 LLCER', icon:'📚', color:'#ec4899',
          focus:"Œuvres LLCER — analyse littéraire approfondie",
          vocab:['literary analysis','motif','theme','character arc','irony','symbolism','narrative structure','author\'s intent'],
          exercice:{ id:'EX-P-AX5-L1', niveau:'Difficile', titre:'To Kill a Mockingbird — Justice (LLCER)',
            enonce:"In 'To Kill a Mockingbird', Harper Lee explores the gap between ideal justice and social reality. Analyse with reference to specific scenes or characters.",
            correction:"Harper Lee's novel contrasts two visions of justice: the formal legal system, embodied by Atticus Finch, and the extralegal racism of Maycomb's white society.\n\nAtticus represents the ideal of justice as blind equality before the law. His defence of Tom Robinson — a Black man falsely accused of rape — is legally impeccable. The evidence is clear. Yet the jury convicts, because in Maycomb, justice is not blind to race. Lee exposes the gap between the letter of the law and its practice.\n\nScout's perspective is crucial. Viewing events through a child's eyes, the novel shows injustice in its naked irrationality — Scout cannot understand why adults behave as they do, which forces the reader to confront the absurdity of prejudice.\n\nConclusion: Lee argues that justice requires not just good laws but moral courage — the willingness to stand for what is right in the face of social pressure. Atticus loses the case but retains his integrity. The novel suggests this is the only form of justice within our power." }
        },
        { parcours:'🎓 Général', icon:'🎓', color:'#f59e0b',
          focus:"Analyse de documents — extraits littéraires et films",
          vocab:['text analysis','documentary','extract','theme','symbol','tone','message','audience'],
          exercice:{ id:'EX-P-AX5-G1', niveau:'Intermédiaire', titre:'Film Analysis (Général)',
            enonce:"Choose a film you have studied or seen. In 8-10 lines, explain how it uses fiction to comment on a real social or political reality.",
            correction:"Model answer — based on 'The Truman Show' (Peter Weir, 1998):\n\nThe Truman Show uses science fiction to comment on the reality television industry and, more broadly, on surveillance, media manipulation and the nature of consent.\n\nTruman Burbank lives in a constructed reality without his knowledge — his entire life is broadcast as entertainment. The film asks: if Truman had always been watched, can he be considered free? Does ignorance of surveillance make it acceptable?\n\nThese questions were ahead of their time in 1998 but feel urgently contemporary in the era of social media, where we voluntarily broadcast our lives for corporate profit. The film suggests that the line between audience and subject, between performance and authentic life, is increasingly blurred — and that the most dangerous prison is one whose bars are invisible." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// AXE 6 — SCIENTIFIC INNOVATION
// ─────────────────────────────────────────────────────────────────────
'ax6-scientific-innovation': {
  id:'ax6-scientific-innovation', num:6, emoji:'🔬',
  color:'#6366f1',
  titre:'Scientific Innovation & Responsibility',
  desc:"AI, climate change, biotechnology, medical ethics, green technology. Essential for Sciences, NSI and SES students.",
  souschapitres:[
    {
      id:'sc-p-ax6-1', titre:'6.1 Artificial Intelligence & Society',
      notions:[
        'AI: systems that simulate human intelligence — machine learning, neural networks, natural language processing',
        'Automation: AI\'s impact on employment — job displacement and creation of new roles',
        'Algorithmic bias: AI systems can perpetuate or amplify existing social inequalities',
        'AI ethics: the need for transparent, accountable and fair AI governance',
      ],
      vocab:[
        { en:'machine learning', fr:'apprentissage automatique',exemple:'Machine learning enables systems to improve from experience.' },
        { en:'neural network',   fr:'réseau de neurones',       exemple:'Neural networks can identify faces in milliseconds.' },
        { en:'bias',             fr:'biais',                    exemple:'Algorithmic bias can discriminate against minorities.' },
        { en:'automation',       fr:'automatisation',           exemple:'Automation is transforming manufacturing and services.' },
        { en:'ethics',           fr:'éthique',                  exemple:'AI ethics asks who is responsible when AI causes harm.' },
        { en:'transparency',     fr:'transparence',             exemple:'Algorithmic transparency allows independent auditing.' },
        { en:'disruptive',       fr:'disruptif/ive',            exemple:'AI is the most disruptive technology of our era.' },
        { en:'accountability',   fr:'responsabilité',           exemple:'AI developers must be held accountable for harms.' },
      ],
      grammar:[
        {
          regle:"Future forms — predictions and possibilities:\nWill + infinitive: confident prediction\nMight/May + infinitive: uncertain possibility\nIs/are going to: expected future based on current trends\nShould: expected outcome (recommendation/expectation)",
          exemples:[
            "AI will transform healthcare within a decade. (confident prediction)",
            "Some jobs might disappear entirely; others will be created. (uncertain)",
            "AI regulation is going to become a major political issue. (current trend)",
            "Governments should ensure AI is developed responsibly. (recommendation)",
          ]
        },
      ],
      exercices:[
        { id:'EX-P-AX6-1', niveau:'Difficile', titre:'Essay — AI: opportunity or threat?',
          enonce:"'Artificial intelligence is humanity\'s greatest tool — or its greatest threat.' Write a structured essay (180-200 words) discussing this statement.",
          correction:"Introduction: Artificial intelligence stands at the centre of one of the most consequential debates of our era: will it empower or endanger humanity?\n\nFor — a transformative tool: AI is already saving lives. DeepMind's AlphaFold has solved protein folding — a 50-year scientific challenge — accelerating drug discovery. AI diagnostic tools detect certain cancers more accurately than experienced radiologists. Climate modelling powered by AI is improving the accuracy of projections that guide global policy.\n\nAgainst — serious dangers: Yet the same technology raises profound risks. Algorithmic bias can automate discrimination at scale. Deepfakes erode trust in visual evidence. Mass automation threatens to displace millions of workers before retraining is possible. And autonomous weapons systems could make lethal decisions without meaningful human oversight.\n\nConclusion: AI is neither inherently liberating nor inherently dangerous — it reflects the values and choices of those who design and deploy it. The crucial question is governance: who decides how AI is built, by whom, for whom, and with what accountability? The answer will determine whether AI serves humanity's best interests or its worst impulses." },
      ],
      specs:[
        { parcours:'🔬 Sciences/NSI', icon:'🔬', color:'#6366f1',
          focus:'🔥 Axe très important — textes scientifiques, IA technique, éthique',
          vocab:['training data','deep learning','overfitting','reinforcement learning','neural architecture','quantum computing','biotechnology'],
          exercice:{ id:'EX-P-AX6-S1', niveau:'Difficile', titre:'AI & Medicine (Sciences)',
            enonce:"'AI is transforming medical diagnosis, but raises serious ethical questions.' Explain with specific examples and discuss 2 ethical issues.",
            correction:"AI transformation of diagnosis:\nAI systems trained on millions of medical images can now detect diabetic retinopathy, skin cancer and certain tumours with accuracy matching or exceeding that of experienced specialists. Google's DeepMind achieved 94.5% accuracy in diagnosing over 50 eye diseases. AI can analyse ECGs for cardiac conditions in seconds.\n\nTwo ethical issues:\n1. Algorithmic bias: if training data overrepresents certain populations (typically white males in clinical trials), AI diagnostic tools may perform less accurately for women, elderly patients or ethnic minorities — potentially widening existing healthcare disparities.\n\n2. Liability and accountability: if an AI system misdiagnoses a patient, who is legally responsible — the doctor who relied on it, the hospital that deployed it, or the company that built it? Current legal frameworks are not equipped to answer this question, creating a dangerous accountability gap.\n\nConclusion: AI's medical potential is extraordinary, but its deployment must be accompanied by rigorous validation across diverse populations, transparent reporting of performance and clear legal frameworks for accountability." }
        },
        { parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Impact économique de l\'IA — emploi, revenus, régulation',
          vocab:['disruption','reskilling','labour market','universal basic income','productivity','inequality','taxation','regulation'],
          exercice:{ id:'EX-P-AX6-S2', niveau:'Difficile', titre:'AI & Employment (SES)',
            enonce:"'AI will create more jobs than it destroys.' Do you agree? Discuss from an economic perspective.",
            correction:"The historical argument: Each technological revolution — steam, electricity, computers — ultimately created more jobs than it eliminated, though it destroyed specific occupations and required major workforce transitions.\n\nFor the optimistic view: AI creates new categories of jobs (data scientists, AI ethicists, machine trainers) and increases productivity, generating economic growth that creates further employment. Countries leading in AI development (USA, China) show strong job growth.\n\nFor the pessimistic view: The pace of AI disruption is unprecedented. Previous technological shifts occurred over generations; AI could eliminate millions of routine jobs within a decade. Low-skill, repetitive work — data entry, basic legal research, customer service — is most vulnerable. Many workers may lack the resources or time to reskill.\n\nConclusion: The net employment effect of AI depends critically on policy choices: investment in education and retraining, social protection for displaced workers, and potentially progressive taxation of AI-generated profits to fund a universal basic income. Without these, the gains of AI will concentrate among a narrow technological elite." }
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
  desc:"Gender equality, minorities and representation, social justice, discrimination, the #MeToo movement.",
  souschapitres:[
    {
      id:'sc-p-ax7-1', titre:'7.1 Gender Equality & Social Justice',
      notions:[
        'Gender equality: equal rights and opportunities for all genders in all social, economic and political spheres',
        'Intersectionality (Kimberlé Crenshaw): multiple overlapping identities create compounded discrimination',
        '#MeToo: the global movement exposing sexual harassment, sparked by the Weinstein scandal (2017)',
        'Glass ceiling: the invisible barrier that prevents women and minorities from reaching leadership positions',
      ],
      vocab:[
        { en:'gender equality', fr:'égalité des genres',   exemple:'Gender equality is fundamental to human rights.' },
        { en:'discrimination',  fr:'discrimination',        exemple:'Racial discrimination is illegal but still widespread.' },
        { en:'representation',  fr:'représentation',        exemple:'Women are underrepresented in STEM careers.' },
        { en:'empowerment',     fr:'émancipation',          exemple:'Education is key to the empowerment of women.' },
        { en:'glass ceiling',   fr:'plafond de verre',     exemple:'Women still face a glass ceiling in many professions.' },
        { en:'bias',            fr:'biais',                 exemple:'Unconscious bias affects hiring and promotion decisions.' },
        { en:'minority',        fr:'minorité',              exemple:'Minority communities face structural disadvantages.' },
        { en:'privilege',       fr:'privilège',             exemple:'Privilege often goes unrecognised by those who have it.' },
      ],
      grammar:[
        {
          regle:"Reported speech — citing studies, experts and arguments:\nsay/claim/argue/suggest that + clause\nAccording to + source\nResearch/Studies show/suggest/indicate + that",
          exemples:[
            "Studies suggest that the gender pay gap is caused by structural rather than individual factors.",
            "According to the World Economic Forum, gender equality will not be achieved for 132 years at the current pace.",
            "Crenshaw argues that intersectionality reveals how multiple forms of discrimination compound each other.",
          ]
        },
      ],
      exercices:[
        { id:'EX-P-AX7-1', niveau:'Difficile', titre:'Essay — Is true equality possible?',
          enonce:"'True equality is impossible as long as structural discrimination persists.' Write a structured essay (180-200 words) discussing this statement.",
          correction:"Introduction: The question of equality is one of the most contested in contemporary political philosophy. I believe true equality requires not just legal rights, but the dismantling of structural barriers — which is far harder.\n\nFor the statement: Formal equality — equality before the law — has been achieved in most democracies. Yet material outcomes remain dramatically unequal. In the UK, the gender pay gap persists at nearly 15%. Black graduates earn on average 24% less than white graduates despite similar qualifications. Research shows that CV applications with 'ethnic-sounding' names receive significantly fewer callbacks. These inequalities are not individual failures — they reflect systemic patterns.\n\nNuance: Progress is real. Female labour force participation has increased dramatically. LGBTQ+ rights have expanded. Awareness of systemic racism has grown. Change is possible.\n\nConclusion: True equality requires more than removing formal barriers — it requires actively addressing the historical disadvantages that continue to shape outcomes. This means targeted policies, unconscious bias training, and continuous monitoring of outcomes. Without this, formal equality remains a hollow promise." },
      ],
      specs:[
        { parcours:'📊 SES', icon:'📊', color:'#10b981',
          focus:'Inégalités sociales, politiques de redistribution, sociologie',
          vocab:['affirmative action','social mobility','welfare state','redistribution','socioeconomic','Gini coefficient','structural'],
          exercice:{ id:'EX-P-AX7-S1', niveau:'Difficile', titre:'Affirmative Action (SES)',
            enonce:"'Affirmative action policies are necessary to correct historical injustices.' Evaluate this statement using sociological and economic arguments.",
            correction:"Affirmative action refers to policies giving preferential treatment to historically disadvantaged groups in education, employment or public procurement.\n\nArguments for:\n• Historical injustice creates compounding structural disadvantage — centuries of exclusion from education and property cannot be corrected by 'equal treatment' alone.\n• Evidence from the USA, India and Brazil shows measurable increases in minority representation in universities and professional roles following such policies.\n• Diverse organizations show better decision-making and innovation.\n\nArguments against:\n• Critics argue it constitutes reverse discrimination against equally qualified majority candidates.\n• Some research suggests it can be stigmatizing — creating doubt about whether beneficiaries earned their positions on merit.\n• It treats groups as homogeneous, ignoring class differences within minority groups.\n\nConclusion: The sociological evidence strongly supports some form of targeted policy to correct structural inequality. However, policies should be carefully designed to maximize inclusion without stigmatization — combining outreach, mentoring and contextual admissions with targeted support." }
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
  desc:"War memory, colonial history, national identity, heritage, historical narratives and commemoration.",
  souschapitres:[
    {
      id:'sc-p-ax8-1', titre:'8.1 War Memory & Colonial Legacy',
      notions:[
        'Collective memory: the shared understanding of historical events within a community or nation',
        'Commemoration: practices — ceremonies, monuments, anniversaries — that honour the past',
        'Colonial legacy: the long-term political, economic and cultural consequences of imperialism',
        'Decolonization of knowledge: the challenge to Eurocentric historical narratives',
      ],
      vocab:[
        { en:'commemoration',  fr:'commémoration',    exemple:'The D-Day commemoration is held every year in Normandy.' },
        { en:'legacy',         fr:'héritage, legs',   exemple:'The colonial legacy continues to shape global inequality.' },
        { en:'reconciliation', fr:'réconciliation',   exemple:'Truth and Reconciliation Commissions help heal societies.' },
        { en:'decolonization', fr:'décolonisation',   exemple:'Decolonization of school curricula is a growing demand.' },
        { en:'reparation',     fr:'réparation',       exemple:'Reparations for slavery remain a deeply contested issue.' },
        { en:'archive',        fr:'archive',          exemple:'Historical archives preserve evidence of past events.' },
        { en:'narrative',      fr:'récit',            exemple:'Who controls the narrative controls how history is remembered.' },
        { en:'indigenous',     fr:'autochtone',       exemple:'Indigenous communities demand the right to tell their own story.' },
      ],
      grammar:[
        {
          regle:"Past Perfect — sequencing historical events:\nhad + past participle\nUsed for actions BEFORE another past event\nKey expressions: by the time, before, after, already, not yet",
          exemples:[
            "By the time the Nuremberg Trials began, Nazi leaders had committed crimes against millions.",
            "Many former colonies had been independent for decades before the full consequences of colonialism were acknowledged.",
            "Britain had built the largest empire in history before it began to crumble in the 20th century.",
          ]
        },
        {
          regle:"Passive in historical writing:\nUsed when the action or its result is more important than the agent\nOr when the agent is obvious, unknown or less relevant",
          exemples:[
            "Hiroshima was bombed on August 6, 1945. (agent less important than event)",
            "Millions of Africans were enslaved and transported across the Atlantic. (victims emphasized)",
            "The Berlin Wall was built in 1961 and torn down in 1989. (actions more important than agents)",
          ]
        },
      ],
      exercices:[
        { id:'EX-P-AX8-1', niveau:'Difficile', titre:'Essay — Should colonial statues be removed?',
          enonce:"'Removing statues of colonial figures does not erase history — it corrects how we honour it.' Write a structured essay (180-200 words) discussing this statement.",
          correction:"Introduction: The debate over colonial monuments intensified globally after the removal of Edward Colston's statue in Bristol in 2020, forcing societies to confront fundamental questions about public memory.\n\nFor the statement: Statues are not neutral — they are choices about who deserves celebration in public space. A slave trader's statue in a city centre does not simply 'record history'; it honours the person. Removing it does not erase history — museums, education and plaques can contextualize the past far more effectively. It simply ends an endorsement.\n\nAgainst: Others argue removal sets a dangerous precedent — who decides which historical figures are acceptable? Discomfort with the past can drive genuine historical reckoning; covering it up may not. Some propose adding context rather than removing.\n\nConclusion: I believe the most productive approach combines community dialogue, contextualization and the elevation of previously silenced voices. Statues of slave traders and colonial architects of atrocity do not belong on pedestals — but the history they represent must be taught honestly and completely. The goal is not comfortable history, but truthful public space." },
      ],
      specs:[
        { parcours:'📚 LLCER', icon:'📚', color:'#ec4899',
          focus:'Littérature postcoloniale — analyse historique approfondie',
          vocab:['postcolonial','decolonize','narrative','subaltern','archive','diaspora','voice','representation'],
          exercice:{ id:'EX-P-AX8-L1', niveau:'Difficile', titre:'Postcolonial Literature (LLCER)',
            enonce:"How does postcolonial literature challenge the dominant historical narrative? Analyse with reference to at least one specific text or author.",
            correction:"Postcolonial literature is fundamentally an act of narrative reclamation — the insistence on the right to tell one's own story, in one's own terms, without the mediation of the former colonizer.\n\nChimamanda Ngozi Adichie captures this in her celebrated TED Talk 'The Danger of a Single Story' (2009): when only one story is told about Africa — poverty, conflict, disease — it becomes 'the' story, erasing the complexity of an entire continent. Literature's role is to multiply stories.\n\nChinua Achebe's 'Things Fall Apart' (1958) was explicitly written as a counter-narrative to Conrad's 'Heart of Darkness'. By presenting Igbo society from within — with its cultural richness, internal conflicts and humanity — Achebe refuses the colonial framework in which Africans are background figures in a white narrative.\n\nConclusion: Postcolonial literature challenges not just what is remembered, but who is allowed to remember and how. It is an epistemological intervention — a demand that the diversity of human experience be represented in the stories a civilization tells about itself." }
        },
        { parcours:'🎓 Général', icon:'🎓', color:'#f59e0b',
          focus:'Analyse de documents historiques contemporains',
          vocab:['commemoration','memorial','historical bias','perspective','primary source','testimony','heritage'],
          exercice:{ id:'EX-P-AX8-G1', niveau:'Intermédiaire', titre:'War Memory & Commemoration (Général)',
            enonce:"Why is it important to commemorate historical events, particularly wars? Give 3 reasons and illustrate with examples.",
            correction:"1. Honouring victims and preserving dignity:\nCommemoration gives meaning to suffering and ensures that victims are not forgotten. The annual D-Day ceremonies in Normandy honour the soldiers who died liberating Europe — preventing their sacrifice from being reduced to statistics.\n\n2. Learning from the past to prevent repetition:\nHolocaust memorials and education programmes aim to ensure such atrocities cannot be minimized or denied. The phrase 'never again' represents a collective commitment that requires constant renewal.\n\n3. Building shared identity and values:\nCommemoration creates moments of collective reflection that strengthen community bonds and reinforce shared values. Remembrance Day in the UK unites citizens across political differences around the values of peace and sacrifice.\n\nConclusion: Commemoration is not simply about the past — it is about who we choose to be in the present. How a society remembers reflects its deepest values and commitments." }
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
  return <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10,
    fontWeight:600, background:cfg.bg, color:cfg.color }}>{niveau}</span>
}

// ══════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════
export default function AnglaisPremiereSlugPage() {
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
          <div style={{ fontSize:48, marginBottom:16 }}>📗</div>
          <h2>Axe non trouvé</h2>
          <Link href="/bac-france/anglais/premiere" style={{ color:'#8b5cf6' }}>← Retour Première</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#8b5cf6'

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
          <Link href="/bac-france/anglais/premiere" style={{ color:'var(--muted)', textDecoration:'none' }}>Première</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{axe.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:32, alignItems:'start' }}>

            {/* CONTENU PRINCIPAL */}
            <div>
              {/* Header */}
              <div style={{ marginBottom:36 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:32 }}>{axe.emoji}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:secColor,
                    background:`${secColor}18`, padding:'3px 12px', borderRadius:8, fontWeight:700 }}>
                    AXE {axe.num}
                  </span>
                  <span style={{ fontSize:11, background:'rgba(139,92,246,0.15)', color:'#a78bfa',
                    padding:'2px 9px', borderRadius:10 }}>
                    📗 Première · B2 · Grand Oral
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:8 }}>
                  {axe.emoji} {axe.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:580, marginBottom:18 }}>{axe.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Anglais Première France — Axe '+axe.num+' — '+axe.titre)}&subject=anglais`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat Prof — cet axe
                  </Link>
                  <Link href={`/bac-france/anglais/terminale/${slug}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:'rgba(255,255,255,0.06)',
                      border:'1px solid rgba(255,255,255,0.12)', color:'var(--text2)',
                      fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    🎓 Voir en Terminale →
                  </Link>
                </div>
              </div>

              {/* SOUS-CHAPITRES */}
              {axe.souschapitres.map((sc, scIdx) => (
                <div key={sc.id} style={{ marginBottom:24, background:`${secColor}05`,
                  border:`1px solid ${secColor}20`, borderRadius:18, overflow:'hidden' }}>

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
                        <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>💡 Key Notions</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {sc.notions.map(n => (
                            <div key={n} style={{ display:'flex', gap:10, padding:'10px 14px',
                              background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10 }}>
                              <span style={{ color:secColor, fontWeight:700, flexShrink:0 }}>▸</span>
                              <span style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6 }}>{n}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* VOCAB */}
                      <div>
                        <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:14 }}>📝 Vocabulary</div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                          {sc.vocab.map(v => (
                            <div key={v.en} style={{ background:'rgba(255,255,255,0.03)',
                              border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, padding:'10px 12px' }}>
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
                          <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>✍️ Grammar Focus</div>
                          {sc.grammar.map((g, gi) => {
                            const gKey = `${sc.id}-g${gi}`
                            return (
                              <div key={gKey} style={{ border:`1px solid ${secColor}25`,
                                borderRadius:12, overflow:'hidden', marginBottom:10 }}>
                                <button onClick={() => setOpenGram(openGram===gKey ? null : gKey)}
                                  style={{ width:'100%', padding:'12px 16px', background:`${secColor}10`,
                                    border:'none', textAlign:'left', cursor:'pointer',
                                    display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                  <span style={{ fontSize:12, fontWeight:700, color:secColor }}>
                                    {g.regle.split('\n')[0]}
                                  </span>
                                  <span style={{ color:secColor }}>{openGram===gKey ? '▲' : '▼'}</span>
                                </button>
                                {openGram===gKey && (
                                  <div style={{ padding:'14px 16px', background:'rgba(0,0,0,0.2)' }}>
                                    <pre style={{ fontSize:12, color:'var(--text2)', whiteSpace:'pre-wrap',
                                      margin:'0 0 12px', fontFamily:'var(--font-mono)', lineHeight:1.7 }}>
                                      {g.regle}
                                    </pre>
                                    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                                      {g.exemples.map((ex, ei) => (
                                        <div key={ei} style={{ fontSize:12, color:'var(--text2)', fontStyle:'italic',
                                          background:'rgba(255,255,255,0.04)', padding:'8px 12px',
                                          borderRadius:8, borderLeft:`3px solid ${secColor}` }}>
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

                      {/* EXERCICES */}
                      {sc.exercices.length > 0 && (
                        <div>
                          <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>📝 Exercices</div>
                          {sc.exercices.map(ex => (
                            <div key={ex.id} style={{ background:'var(--surface)',
                              border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', marginBottom:10 }}>
                              <div style={{ padding:'12px 16px' }}>
                                <div style={{ display:'flex', gap:7, alignItems:'center', marginBottom:7, flexWrap:'wrap' }}>
                                  <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                                    color:'var(--muted)', background:'var(--surface2)',
                                    padding:'2px 7px', borderRadius:5 }}>{ex.id}</span>
                                  <NiveauBadge niveau={ex.niveau} />
                                  <span style={{ fontWeight:600, fontSize:13 }}>{ex.titre}</span>
                                </div>
                                <p style={{ fontSize:12, color:'var(--text2)', margin:0,
                                  lineHeight:1.65, whiteSpace:'pre-line' }}>{ex.enonce}</p>
                              </div>
                              <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px',
                                display:'flex', gap:8, flexWrap:'wrap' }}>
                                <Link href={`/solve?q=${encodeURIComponent('Anglais Première France — '+ex.enonce)}&subject=anglais`}
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
                                <div style={{ padding:'10px 16px', borderTop:'1px solid var(--border)',
                                  background:`${secColor}06` }}>
                                  <div style={{ fontSize:10, color:secColor, fontWeight:700, marginBottom:4 }}>✅ Model Answer</div>
                                  <pre style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75,
                                    whiteSpace:'pre-wrap', margin:0 }}>{ex.correction}</pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* SPÉCIFICITÉS */}
                      {sc.specs.length > 0 && (
                        <div style={{ borderTop:`2px solid ${secColor}30`, paddingTop:24 }}>
                          <div style={{ marginBottom:16 }}>
                            <div style={{ fontSize:13, fontWeight:800, color:'var(--text)', marginBottom:6 }}>✨ Spécificités par parcours</div>
                            <div style={{ fontSize:12, color:'var(--muted)' }}>Contenu adapté selon votre filière.</div>
                          </div>
                          <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
                            {sc.specs.map((sp, si) => (
                              <button key={sp.parcours} onClick={() => setActiveSpec(si)}
                                style={{ padding:'7px 14px', borderRadius:10, border:'2px solid',
                                  borderColor: activeSpec===si ? sp.color : 'rgba(255,255,255,0.1)',
                                  background: activeSpec===si ? `${sp.color}18` : 'transparent',
                                  color: activeSpec===si ? sp.color : 'rgba(255,255,255,0.4)',
                                  fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
                                  display:'flex', alignItems:'center', gap:5, transition:'all 0.15s' }}>
                                <span>{sp.icon}</span><span>{sp.parcours}</span>
                              </button>
                            ))}
                          </div>
                          {(() => {
                            const sp = sc.specs[activeSpec]
                            if (!sp) return null
                            return (
                              <div style={{ background:`${sp.color}08`, border:`1.5px solid ${sp.color}25`,
                                borderRadius:14, padding:'20px 22px' }}>
                                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14 }}>
                                  <span style={{ fontSize:22 }}>{sp.icon}</span>
                                  <div>
                                    <div style={{ fontSize:10, color:sp.color, fontWeight:700,
                                      textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{sp.parcours}</div>
                                    <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{sp.focus}</div>
                                  </div>
                                </div>
                                <div style={{ marginBottom:14 }}>
                                  <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700,
                                    textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>
                                    Vocabulaire spécifique
                                  </div>
                                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                                    {sp.vocab.map(v => (
                                      <span key={v} style={{ fontSize:11, padding:'3px 10px', borderRadius:20,
                                        background:`${sp.color}14`, color:sp.color,
                                        border:`1px solid ${sp.color}25`, fontWeight:600 }}>{v}</span>
                                    ))}
                                  </div>
                                </div>
                                <div style={{ background:'var(--surface)', border:`1px solid ${sp.color}20`,
                                  borderRadius:12, overflow:'hidden' }}>
                                  <div style={{ padding:'12px 16px' }}>
                                    <div style={{ display:'flex', gap:7, alignItems:'center', marginBottom:7, flexWrap:'wrap' }}>
                                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:sp.color,
                                        background:`${sp.color}14`, padding:'2px 8px', borderRadius:5 }}>
                                        {sp.exercice.id}
                                      </span>
                                      <NiveauBadge niveau={sp.exercice.niveau} />
                                      <span style={{ fontWeight:600, fontSize:13 }}>{sp.exercice.titre}</span>
                                    </div>
                                    <p style={{ fontSize:12, color:'var(--text2)', margin:0,
                                      lineHeight:1.65, whiteSpace:'pre-line' }}>{sp.exercice.enonce}</p>
                                  </div>
                                  <div style={{ borderTop:`1px solid ${sp.color}20`, padding:'8px 16px',
                                    display:'flex', gap:8, flexWrap:'wrap' }}>
                                    <Link href={`/solve?q=${encodeURIComponent(sp.exercice.enonce)}&subject=anglais`}
                                      className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>🤖 Aide IA</Link>
                                    <button onClick={() => setOpenEx(openEx===sp.exercice.id ? null : sp.exercice.id)}
                                      style={{ fontSize:11, padding:'5px 12px', borderRadius:7,
                                        border:`1px solid ${sp.color}30`, background:'transparent',
                                        color:sp.color, cursor:'pointer', fontFamily:'inherit' }}>
                                      📋 {openEx===sp.exercice.id ? 'Masquer' : 'Model Answer'}
                                    </button>
                                  </div>
                                  {openEx===sp.exercice.id && (
                                    <div style={{ padding:'10px 16px', borderTop:`1px solid ${sp.color}20`,
                                      background:`${sp.color}06` }}>
                                      <div style={{ fontSize:10, color:sp.color, fontWeight:700, marginBottom:4 }}>✅ Model Answer</div>
                                      <pre style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75,
                                        whiteSpace:'pre-wrap', margin:0 }}>{sp.exercice.correction}</pre>
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

              {/* NAV */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12,
                borderTop:'1px solid var(--border)', paddingTop:22, marginTop:8 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/anglais/premiere/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug].replace(/AX\d — /,'')}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/anglais/premiere/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[nextSlug].replace(/AX\d — /,'')}</div>
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
                  fontSize:11, color:'#a78bfa', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(139,92,246,0.08)' }}>
                  📗 Première · 8 Axes
                </div>
                {NAV_ORDER.map(s => (
                  <Link key={s} href={`/bac-france/anglais/premiere/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'10px 15px', borderBottom:'1px solid var(--border)',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:9, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>
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
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Anglais Première — '+axe.titre)}&subject=anglais`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat Prof Anglais
                  </Link>
                  <Link href={`/bac-france/anglais/terminale/${slug}`} className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎓 Même axe en Terminale</Link>
                  <Link href="/bac-france/anglais/seconde" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📘 Seconde</Link>
                  <Link href="/bac-france/anglais/premiere" className="btn btn-secondary"
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