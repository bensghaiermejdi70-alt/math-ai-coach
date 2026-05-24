'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
//  ANGLAIS SECONDE FRANCE — [SLUG]
//  Route : /bac-france/anglais/seconde/[slug]
//  6 skills · Common core · Official MEN programme 2026/2027
//  Thème global : L'art de vivre ensemble
// ══════════════════════════════════════════════════════════════════════

const NAV_ORDER = [
  'communication-interaction',
  'comprehension-ecrite',
  'comprehension-orale',
  'expression-ecrite',
  'grammaire',
  'vocabulaire-culture',
]

const SEC_COLORS: Record<string,string> = {
  'communication-interaction': '#06b6d4',
  'comprehension-ecrite':      '#8b5cf6',
  'comprehension-orale':       '#ec4899',
  'expression-ecrite':         '#10b981',
  'grammaire':                 '#f59e0b',
  'vocabulaire-culture':       '#f43f5e',
}

const TITRES_NAV: Record<string,string> = {
  'communication-interaction': 'C1 — Communication & Interaction',
  'comprehension-ecrite':      'C2 — Reading Comprehension',
  'comprehension-orale':       'C3 — Listening Comprehension',
  'expression-ecrite':         'C4 — Written Expression',
  'grammaire':                 'C5 — Grammar',
  'vocabulaire-culture':       'C6 — Vocabulary & Culture',
}

type Exo  = { id:string; niveau:'Facile'|'Intermédiaire'|'Difficile'; titre:string; enonce:string; correction:string }
type Spec = { orientation:string; icon:string; color:string; focus:string; vocab:string[]; exercice:Exo }
type SC   = {
  id:string; titre:string; notions:string[]
  vocab:{ en:string; fr:string; exemple:string }[]
  grammar:{ regle:string; exemples:string[] }[]
  exercices:Exo[]
  specs:Spec[]
}
type Comp = { id:string; num:number; emoji:string; titre:string; color:string; desc:string; souschapitres:SC[] }

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 6 COMPÉTENCES SECONDE
// ══════════════════════════════════════════════════════════════════════
const ALL_COMPS: Record<string,Comp> = {

// ─────────────────────────────────────────────────────────────────────
// C1 — COMMUNICATION & INTERACTION
// ─────────────────────────────────────────────────────────────────────
'communication-interaction': {
  id:'communication-interaction', num:1, emoji:'💬',
  color:'#06b6d4',
  titre:'Communication & Interaction',
  desc:"Learn to communicate in English — asking and answering questions, giving your opinion, describing situations and debating.",
  souschapitres:[
    {
      id:'sc-c1-1', titre:'1.1 Interaction orale — Dialogue & Débat',
      notions:[
        'Asking and answering questions: direct vs indirect questions',
        'Expressing opinion: I think / I believe / In my view / As far as I\'m concerned',
        'Agreeing and disagreeing: I agree / I disagree / That\'s a good point / I see your point but…',
        'Turn-taking in conversation: Actually, / Well, / You know, / By the way,',
      ],
      vocab:[
        { en:'debate',      fr:'débat',           exemple:'We had a debate about social media in class.' },
        { en:'opinion',     fr:'opinion',          exemple:'In my opinion, technology is both useful and dangerous.' },
        { en:'argue',       fr:'argumenter',       exemple:'She argued that online learning has many advantages.' },
        { en:'agree',       fr:'être d\'accord',  exemple:'I agree with your point about climate change.' },
        { en:'disagree',    fr:'ne pas être d\'accord',exemple:'I disagree — I think social media can be positive.' },
        { en:'point of view',fr:'point de vue',   exemple:'From my point of view, education is the key.' },
        { en:'convince',    fr:'convaincre',       exemple:'He tried to convince us with strong arguments.' },
        { en:'perspective', fr:'perspective',      exemple:'Let\'s consider this from a different perspective.' },
      ],
      grammar:[
        {
          regle:"Indirect questions — polite way to ask:\nDirect: Where does she live?\nIndirect: Could you tell me where she lives?\nNOTE: Word order returns to normal (no inversion)",
          exemples:[
            "Direct: What time is it? → Indirect: Do you know what time it is?",
            "Direct: Where did he go? → Indirect: Could you tell me where he went?",
            "Direct: Why is she crying? → Indirect: Do you have any idea why she is crying?",
          ]
        },
        {
          regle:"Question tags — checking information or seeking agreement:\nPositive sentence → negative tag\nNegative sentence → positive tag",
          exemples:[
            "You're French, aren't you?",
            "She didn't go to school yesterday, did she?",
            "It's a beautiful day, isn't it?",
          ]
        },
      ],
      exercices:[
        { id:'EX-C1-1', niveau:'Facile', titre:'Express your opinion',
          enonce:"Write 5 sentences giving your opinion on the following topic, using a different expression each time:\n'Social media has changed the way young people communicate.'\n\nExpressions to use: I think… / In my opinion… / I believe… / As far as I'm concerned… / From my point of view…",
          correction:"Model answers:\n1. I think social media has made communication faster but less personal.\n2. In my opinion, platforms like Instagram create unrealistic expectations.\n3. I believe the benefits of social media outweigh its risks if used responsibly.\n4. As far as I'm concerned, young people spend too much time on their phones.\n5. From my point of view, social media can strengthen friendships between people in different countries." },
        { id:'EX-C1-2', niveau:'Intermédiaire', titre:'Transform direct to indirect questions',
          enonce:"Rewrite these direct questions as indirect/polite questions:\n1. What is the capital of Australia?\n2. How old are you?\n3. When does the film start?\n4. Why didn't she come to the meeting?\n5. How many students are in your class?",
          correction:"1. Could you tell me what the capital of Australia is?\n2. Do you mind if I ask how old you are?\n3. Do you know when the film starts?\n4. Do you have any idea why she didn't come to the meeting?\n5. Could you tell me how many students are in your class?" },
      ],
      specs:[
        { orientation:'🔬 Sciences/Tech', icon:'🔬', color:'#6366f1',
          focus:'Communication logique et précise — présenter des données, expliquer un processus',
          vocab:['demonstrate','hypothesis','process','result','evidence','data','conclude','analyse'],
          exercice:{ id:'EX-C1-S1', niveau:'Intermédiaire', titre:'Scientific Presentation (Sciences)',
            enonce:"You are presenting your science project to the class. Write a 6-8 sentence introduction that:\n• States your topic clearly\n• Explains why it is important\n• Outlines what you will demonstrate",
            correction:"Good afternoon everyone. Today I am going to present my project on renewable energy sources. I chose this topic because climate change is one of the most urgent challenges facing our generation.\n\nFirst, I will explain what renewable energy is and why it is necessary. Then, I will compare three main sources — solar, wind and hydroelectric — and analyse their advantages and limitations. Finally, I will present data showing their growth over the past ten years.\n\nI hope by the end of this presentation you will understand why transitioning to renewable energy is not just possible, but essential." }
        },
        { orientation:'📊 Economics/SES', icon:'📊', color:'#10b981',
          focus:'Débat sur des questions sociales et économiques, persuasion',
          vocab:['inequality','policy','economy','society','impact','argue','propose','solution'],
          exercice:{ id:'EX-C1-S2', niveau:'Intermédiaire', titre:'Social Debate (SES)',
            enonce:"You are in a class debate on: 'Should the minimum wage be increased?' Write 5-6 sentences arguing FOR the increase, using persuasive language.",
            correction:"I strongly believe that the minimum wage should be increased, and I would like to explain why.\n\nFirst and foremost, the current minimum wage is simply not enough for people to cover their basic expenses — rent, food and transport. Moreover, studies consistently show that higher wages stimulate consumer spending, which benefits the entire economy. In addition, reducing wage inequality has proven social benefits: it lowers crime rates and improves health outcomes.\n\nTherefore, I would argue that raising the minimum wage is not just a moral imperative — it is an economic necessity." }
        },
      ],
    },
    {
      id:'sc-c1-2', titre:'1.2 Speaking — Presentation & Opinion',
      notions:[
        'Structuring a presentation: introduction → main points → conclusion',
        'Signposting language: First of all… / Moving on to… / To conclude…',
        'Describing personal experience: I remember when… / Once I… / At the time…',
        'Making comparisons: whereas / while / on the other hand / by contrast',
      ],
      vocab:[
        { en:'introduce',   fr:'présenter',         exemple:'Let me introduce today\'s topic: social media.' },
        { en:'outline',     fr:'exposer, décrire',   exemple:'I\'ll outline the main points of my presentation.' },
        { en:'conclude',    fr:'conclure',           exemple:'To conclude, I think we must act now.' },
        { en:'emphasize',   fr:'souligner',          exemple:'I would like to emphasize one key point.' },
        { en:'summarize',   fr:'résumer',            exemple:'To summarize, there are three main solutions.' },
        { en:'illustrate',  fr:'illustrer',          exemple:'Let me illustrate this with an example.' },
        { en:'refer to',    fr:'se référer à',       exemple:'I\'d like to refer to a recent study.' },
        { en:'highlight',   fr:'mettre en avant',    exemple:'This graph highlights the increase in CO₂ levels.' },
      ],
      grammar:[
        {
          regle:"Comparative and superlative forms:\nShort adjectives: -er / -est (fast → faster → fastest)\nLong adjectives: more / most (important → more important → most important)\nIrregular: good → better → best | bad → worse → worst",
          exemples:[
            "Online learning is more flexible than classroom learning.",
            "Climate change is the most urgent problem of our century.",
            "Electric cars are better for the environment than petrol cars.",
          ]
        },
      ],
      exercices:[
        { id:'EX-C1-3', niveau:'Facile', titre:'Signposting language practice',
          enonce:"Complete these sentences with appropriate signposting expressions:\n(First of all / Moving on to / However / To conclude / Moreover / For example)\n\n1. ___, I would like to talk about climate change.\n2. ___, there are several solutions we can adopt.\n3. Renewable energy is clean. ___, it can be expensive.\n4. ___, consider the use of solar panels in homes.\n5. ___ the economic benefits, green jobs are being created.\n6. ___, we must act together to protect our planet.",
          correction:"1. First of all, I would like to talk about climate change.\n2. To conclude, there are several solutions we can adopt.\n3. Renewable energy is clean. However, it can be expensive.\n4. For example, consider the use of solar panels in homes.\n5. Moving on to the economic benefits, green jobs are being created.\n6. To conclude, we must act together to protect our planet." },
      ],
      specs:[
        { orientation:'📚 Literary', icon:'📚', color:'#ec4899',
          focus:'Personal expression, creative narration and descriptive writing',
          vocab:['narrative','describe','evoke','atmosphere','imagery','personal experience','recollect','vivid'],
          exercice:{ id:'EX-C1-L1', niveau:'Difficile', titre:'Personal Narrative (Littéraire)',
            enonce:"Write a short oral presentation (6-8 lines) beginning with: 'I remember the first time I…' Describe a personal experience that changed your perspective on something.",
            correction:"I remember the first time I visited a refugee camp — it was during a school trip organized by a charity. Until that moment, I had only seen images on television, and somehow the distance made it feel unreal. But standing there, talking to a boy my age who had walked for three weeks to reach safety, everything changed.\n\nHe wasn\'t a statistic or a news story — he was a person with dreams, favourite songs and a sense of humour. That experience taught me that empathy begins the moment we stop seeing people as categories and start seeing them as individuals.\n\nFrom that day, I have been more attentive to the stories behind the headlines." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// C2 — COMPRÉHENSION ÉCRITE
// ─────────────────────────────────────────────────────────────────────
'comprehension-ecrite': {
  id:'comprehension-ecrite', num:2, emoji:'📖',
  color:'#8b5cf6',
  titre:'Reading Comprehension',
  desc:"Understand different types of texts — identify the main idea, analyse details and deduce meaning from context.",
  souschapitres:[
    {
      id:'sc-c2-1', titre:'2.1 Types de textes et stratégies de lecture',
      notions:[
        'News article: headline → lead paragraph → body → conclusion',
        'Formal letter/email: greeting → purpose → body → closing',
        'Literary extract: characters, setting, narrative voice, atmosphere',
        'Reading strategies: skimming (global meaning) vs scanning (specific information)',
      ],
      vocab:[
        { en:'headline',    fr:'titre (presse)',    exemple:'The headline immediately captures the reader\'s attention.' },
        { en:'paragraph',   fr:'paragraphe',        exemple:'Each paragraph develops one main idea.' },
        { en:'imply',       fr:'sous-entendre',     exemple:'The author implies that the situation is serious.' },
        { en:'infer',       fr:'déduire',           exemple:'We can infer that the character is afraid.' },
        { en:'reference',   fr:'référence',         exemple:'The text makes a reference to the 2008 financial crisis.' },
        { en:'evidence',    fr:'preuve, indice',    exemple:'There is clear evidence in paragraph 2.' },
        { en:'purpose',     fr:'intention, but',    exemple:'The author\'s purpose is to persuade the reader.' },
        { en:'audience',    fr:'public cible',      exemple:'This article is written for a general audience.' },
      ],
      grammar:[
        {
          regle:"Present Simple vs Present Continuous:\nPresent Simple → habits, facts, permanent states\nPresent Continuous → actions happening now, temporary situations",
          exemples:[
            "Scientists study the effects of climate change every year. (Simple — regular fact)",
            "Scientists are currently studying a new vaccine. (Continuous — ongoing project)",
            "Young people spend a lot of time online. (Simple — general habit)",
          ]
        },
        {
          regle:"Reference words — avoiding repetition:\nPronouns: he, she, it, they, this, that, these, those\nSynonyms and paraphrase used by authors",
          exemples:[
            "The scientist published her results. She had worked on them for three years.",
            "'The invention' → later referred to as 'this discovery' / 'it'",
            "'Young people' → 'they' / 'teenagers' / 'this generation'",
          ]
        },
      ],
      exercices:[
        { id:'EX-C2-1', niveau:'Facile', titre:'Identify text type and purpose',
          enonce:"Read these three extracts. For each one, identify: (a) the type of text, (b) the author's main purpose.\n\nExtract 1: 'Dear Editor, I am writing to express my concern about the recent increase in car traffic in our city...'\n\nExtract 2: 'Scientists have discovered a new species of deep-sea fish that can survive at extreme depths. The creature, found in the Pacific Ocean...'\n\nExtract 3: 'She stood at the window, watching the rain fall. Nothing had been the same since he left, and she knew, with a certainty that frightened her, that nothing ever would be again.'",
          correction:"Extract 1:\na) Type: Formal letter to the editor (opinion/complaint)\nb) Purpose: To persuade — express concern and push for action on traffic.\n\nExtract 2:\na) Type: News article (science journalism)\nb) Purpose: To inform — report a scientific discovery to a general audience.\n\nExtract 3:\na) Type: Literary extract (fiction/novel)\nb) Purpose: To engage emotionally — create atmosphere and explore character emotion." },
        { id:'EX-C2-2', niveau:'Intermédiaire', titre:'Inference questions',
          enonce:"Read: 'Despite winning three international awards, Maya still arrived at the ceremony alone, quietly slipping into the back row before anyone noticed her. When her name was called, she seemed genuinely surprised.'\n\nQ1: What can we infer about Maya's personality?\nQ2: Find a word that shows she did not want attention.\nQ3: Why might the writer use the word 'genuinely'?",
          correction:"Q1: We can infer that Maya is modest and humble — despite her international recognition, she does not seek attention or status.\n\nQ2: 'quietly' — it suggests she deliberately tried not to be noticed.\n\nQ3: 'Genuinely' emphasizes that her surprise was real, not performed for the audience — reinforcing her humble character. It distinguishes authentic emotion from the false modesty that public figures sometimes display." },
      ],
      specs:[
        { orientation:'🔬 Sciences', icon:'🔬', color:'#6366f1',
          focus:'Technical and scientific texts — data extraction and logical analysis',
          vocab:['data','graph','demonstrate','conclude','hypothesis','variable','significant','findings'],
          exercice:{ id:'EX-C2-S1', niveau:'Intermédiaire', titre:'Reading Scientific Text (Sciences)',
            enonce:"Read: 'A recent study involving 5,000 participants found that students who slept at least 8 hours per night scored on average 23% higher on memory tests than those who slept 6 hours or less. Furthermore, the group with adequate sleep showed significantly lower stress hormone levels.'\n\nQ1: What was the study's main finding?\nQ2: Give two differences between the two groups.\nQ3: What does 'furthermore' indicate about the relationship between the two findings?",
            correction:"Q1: Students who sleep at least 8 hours per night perform significantly better on memory tests (23% higher scores) than those who sleep 6 hours or less.\n\nQ2: Differences:\n• Memory performance: 8h group scored 23% higher\n• Stress hormones: 8h group had significantly lower levels\n\nQ3: 'Furthermore' indicates that the second finding (lower stress hormones) is an additional supporting point — it reinforces the conclusion that adequate sleep has multiple measurable benefits." }
        },
        { orientation:'📊 Economics/SES', icon:'📊', color:'#10b981',
          focus:'Economic and social articles — identifying arguments and counter-arguments',
          vocab:['statistics','argue','economic','impact','society','policy','evidence','trend'],
          exercice:{ id:'EX-C2-S2', niveau:'Intermédiaire', titre:'Reading Economic Article (SES)',
            enonce:"Read: 'The gig economy — in which workers are hired as independent contractors rather than full-time employees — has grown dramatically. Proponents argue it offers flexibility. Critics, however, point to the absence of benefits like health insurance, sick pay and job security.'\n\nQ1: What is the 'gig economy'?\nQ2: Identify one argument FOR and one argument AGAINST.\nQ3: What does 'however' signal in this text?",
            correction:"Q1: The gig economy is a labour market where workers are hired as independent contractors (freelancers) rather than permanent employees. Examples include Uber drivers and Deliveroo couriers.\n\nQ2:\n• FOR: Flexibility — workers can choose their own hours and workload\n• AGAINST: Lack of benefits — no health insurance, sick pay or job security\n\nQ3: 'However' signals a contrast or counterargument — it introduces the opposing view after presenting the supporters' position." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// C3 — COMPRÉHENSION ORALE
// ─────────────────────────────────────────────────────────────────────
'comprehension-orale': {
  id:'comprehension-orale', num:3, emoji:'🎧',
  color:'#ec4899',
  titre:'Listening Comprehension',
  desc:"Understand spoken English — dialogues, interviews, videos and films. Identify key information and understand different accents.",
  souschapitres:[
    {
      id:'sc-c3-1', titre:'3.1 Stratégies d\'écoute et types de supports',
      notions:[
        'Global listening: understand the main idea and general context without every word',
        'Selective listening: focus on specific information (names, numbers, dates, places)',
        'Predicting: use the topic and images to anticipate content before listening',
        'British vs American English: key pronunciation and vocabulary differences',
      ],
      vocab:[
        { en:'listen for',  fr:'écouter pour trouver',exemple:'Listen for the main idea, not every word.' },
        { en:'context',     fr:'contexte',            exemple:'Use the context to understand unknown words.' },
        { en:'key word',    fr:'mot-clé',             exemple:'Identify key words before listening.' },
        { en:'accent',      fr:'accent',              exemple:'British and American accents differ significantly.' },
        { en:'tone',        fr:'ton',                 exemple:'The speaker\'s tone suggests she is worried.' },
        { en:'pause',       fr:'pause',               exemple:'Pauses help identify important information.' },
        { en:'hesitation',  fr:'hésitation',          exemple:'Hesitations like "um" and "well" are common in speech.' },
        { en:'intonation',  fr:'intonation',          exemple:'Rising intonation often signals a question.' },
      ],
      grammar:[
        {
          regle:"British vs American English — key vocabulary differences:\nBritish → American\napartment (flat) | elevator (lift) | subway (tube/underground)\ncookies (biscuits) | truck (lorry) | vacation (holiday)",
          exemples:[
            "British: 'I'll take the lift to the first floor.'\nAmerican: 'I'll take the elevator to the second floor.'",
            "British: 'He goes on holiday every summer.'\nAmerican: 'He goes on vacation every summer.'",
          ]
        },
        {
          regle:"Discourse markers in spoken English:\nTo add information: also, as well, besides, what's more\nTo contrast: but, however, though, on the other hand\nTo give examples: for instance, like, such as\nTo conclude: so, anyway, in the end",
          exemples:[
            "I like London. It's multicultural. Also, the museums are amazing.",
            "The food was good, though the service was slow.",
            "I like outdoor activities, like hiking and cycling.",
          ]
        },
      ],
      exercices:[
        { id:'EX-C3-1', niveau:'Facile', titre:'Predicting content',
          enonce:"Before listening to a documentary about the Great Barrier Reef, you see the title and the image of a bleached coral reef.\n\nQ1: What topic do you predict the documentary will address?\nQ2: List 5 words you expect to hear.\nQ3: Write 2 questions you hope the documentary will answer.",
          correction:"Q1: The documentary will probably address coral bleaching and its causes — likely related to climate change and rising ocean temperatures.\n\nQ2: Expected vocabulary: coral, reef, temperature, bleaching, endangered, ocean, Australia, climate change, species, protect.\n\nQ3:\n• What is causing the coral bleaching in the Great Barrier Reef?\n• What can be done to protect the reef from further damage?" },
        { id:'EX-C3-2', niveau:'Intermédiaire', titre:'British vs American English',
          enonce:"Match each British English word with its American English equivalent:\nBritish: flat / lift / holiday / biscuit / lorry / autumn / chemist / queue\nAmerican: fall / line / cookie / truck / vacation / elevator / drugstore / apartment",
          correction:"flat → apartment\nlift → elevator\nholiday → vacation\nbiscuit → cookie\nlorry → truck\nautumn → fall\nchemist → drugstore\nqueue → line" },
      ],
      specs:[
        { orientation:'💻 NSI/Tech', icon:'💻', color:'#06b6d4',
          focus:'Technology audio content — tech podcasts, tutorials and presentations',
          vocab:['tutorial','code','debug','interface','algorithm','software','user','platform'],
          exercice:{ id:'EX-C3-N1', niveau:'Intermédiaire', titre:'Tech Podcast Comprehension (NSI)',
            enonce:"You listen to a tech podcast intro: 'Welcome to Code and Society. Today we're exploring how artificial intelligence is being used in healthcare — from diagnosing diseases to personalizing treatments. But we'll also ask the big question: should machines make life-or-death decisions?'\n\nQ1: What is the topic of this podcast episode?\nQ2: Name two specific AI applications mentioned.\nQ3: What ethical question will the podcast raise?",
            correction:"Q1: The podcast explores the use of artificial intelligence in healthcare.\n\nQ2: Two AI applications:\n• Diagnosing diseases\n• Personalizing treatments for patients\n\nQ3: The ethical question: Should machines (AI) make life-or-death decisions in medical contexts?" }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// C4 — EXPRESSION ÉCRITE
// ─────────────────────────────────────────────────────────────────────
'expression-ecrite': {
  id:'expression-ecrite', num:4, emoji:'✍️',
  color:'#10b981',
  titre:'Written Expression',
  desc:"Write correctly in English — emails, narratives, descriptions and argumentative texts. Organize ideas and use cohesive devices.",
  souschapitres:[
    {
      id:'sc-c4-1', titre:'4.1 Types d\'écriture et structure',
      notions:[
        'Formal email: subject line, greeting, clear purpose, formal register, closing',
        'Narrative text: setting, characters, plot, time markers, descriptive language',
        'Descriptive text: adjectives, senses, atmosphere, showing not telling',
        'Argumentative text: thesis, arguments + evidence, counterargument, conclusion',
      ],
      vocab:[
        { en:'structure',    fr:'structure',          exemple:'A well-structured essay has a clear introduction.' },
        { en:'argument',     fr:'argument',           exemple:'She supported her argument with statistics.' },
        { en:'evidence',     fr:'preuve',             exemple:'Always back up your claims with evidence.' },
        { en:'coherent',     fr:'cohérent',           exemple:'The essay was coherent and well-organized.' },
        { en:'register',     fr:'registre de langue', exemple:'Use a formal register in academic writing.' },
        { en:'draft',        fr:'brouillon',          exemple:'Always write a draft before the final version.' },
        { en:'revise',       fr:'relire, réviser',    exemple:'Revise your work for grammar and clarity.' },
        { en:'elaborate',    fr:'développer',         exemple:'Please elaborate on your second argument.' },
      ],
      grammar:[
        {
          regle:"Cohesive devices — connecting ideas:\nAddition: and, also, moreover, furthermore, in addition\nContrast: but, however, although, despite, on the other hand\nCause: because, since, as, due to\nResult: so, therefore, as a result, consequently\nExample: for example, for instance, such as",
          exemples:[
            "Social media has many advantages. However, it can also be addictive.",
            "Moreover, studies show that screen time affects sleep quality.",
            "For example, Instagram reported 1 billion users in 2022.",
          ]
        },
        {
          regle:"Formal vs informal register:\nFormal: I am writing to… / I would like to… / I am delighted to…\nInformal: I'm writing because… / I wanted to… / It's great to…\nFormal vocabulary: obtain / assist / commence / numerous\nInformal vocabulary: get / help / start / lots of",
          exemples:[
            "Formal: I am writing to enquire about the position advertised on your website.",
            "Informal: I'm writing because I saw your job ad online.",
          ]
        },
      ],
      exercices:[
        { id:'EX-C4-1', niveau:'Facile', titre:'Cohesive devices practice',
          enonce:"Connect these pairs of sentences using the word in brackets:\n1. Exercise is good for your health. It can be difficult to start a routine. (however)\n2. Many young people use social media. It affects their sleep. (moreover)\n3. He studied hard. He passed his exams. (as a result)\n4. Electric cars are expensive. They are better for the environment. (although)\n5. She learned to code. She got a job at a tech company. (consequently)",
          correction:"1. Exercise is good for your health; however, it can be difficult to start a routine.\n2. Many young people use social media. Moreover, it affects their sleep.\n3. He studied hard. As a result, he passed his exams.\n4. Although electric cars are expensive, they are better for the environment.\n5. She learned to code; consequently, she got a job at a tech company." },
        { id:'EX-C4-2', niveau:'Intermédiaire', titre:'Write a formal email',
          enonce:"Write a formal email (70-80 words) to your English school asking for information about:\n• Available English courses\n• Dates and timetable\n• Cost and payment options\n\nUse appropriate formal expressions.",
          correction:"Subject: Enquiry about English Language Courses\n\nDear Sir or Madam,\n\nI am writing to enquire about the English language courses currently available at your school. Could you please provide information regarding the dates and timetable of your upcoming classes, as well as the costs and available payment options?\n\nI would be grateful if you could send me a detailed prospectus at your earliest convenience.\n\nYours faithfully,\n[Your name]" },
        { id:'EX-C4-3', niveau:'Difficile', titre:'Argumentative paragraph',
          enonce:"Write one well-developed argumentative paragraph (80-100 words) on the following statement:\n'Smartphones should be banned in schools.'\n\nYour paragraph must include: a clear position, 2 arguments with examples, and a concluding sentence.",
          correction:"I firmly believe that smartphones should be banned in schools during class time. First and foremost, mobile phones are a major source of distraction — students who use their phones during lessons retain significantly less information than those who do not. Moreover, excessive smartphone use has been linked to anxiety and reduced social interaction among teenagers. A study conducted in France, where smartphones were banned in schools in 2018, showed a measurable improvement in academic performance. Consequently, I believe a clear policy restricting phone use would benefit students' learning and well-being." },
      ],
      specs:[
        { orientation:'📚 Literary', icon:'📚', color:'#ec4899',
          focus:'Creative narration and description — rich vocabulary and stylistic range',
          vocab:['metaphor','imagery','atmosphere','tension','vivid','sensory detail','narrator','evoke'],
          exercice:{ id:'EX-C4-L1', niveau:'Difficile', titre:'Creative Writing (Littéraire)',
            enonce:"Write a short descriptive paragraph (80-100 words) about a place you know well. Use at least 3 of the 5 senses, 2 comparisons, and create a clear atmosphere (positive or melancholy).",
            correction:"The market comes alive before sunrise. The air smells of freshly baked bread and roasting coffee — warm, familiar, like a memory you can't quite name. Voices rise and fall in a dozen languages, wrapping around you like music. The rough stone of the cobblestones presses through the thin soles of your shoes. Towers of bright vegetables — orange, red, green — catch the early light and glow like stained glass. Everything feels urgent and unhurried at the same time, as though time here has its own particular rhythm, slower and kinder than the rest of the world." }
        },
        { orientation:'🔬 Sciences', icon:'🔬', color:'#6366f1',
          focus:'Clear and logical writing — reports, summaries and process descriptions',
          vocab:['process','step','result','therefore','demonstrate','analyse','conclude','measure'],
          exercice:{ id:'EX-C4-S1', niveau:'Intermédiaire', titre:'Describe a Process (Sciences)',
            enonce:"Write a short factual paragraph (60-80 words) explaining how solar panels work. Use logical sequencing words (first, then, next, finally).",
            correction:"Solar panels work by converting sunlight into electricity through a process called the photovoltaic effect. First, sunlight strikes the silicon cells inside the panel, causing electrons to be released. These electrons then move through a circuit, generating a direct current (DC). Next, an inverter converts the DC into alternating current (AC), which can be used to power household appliances. Finally, any surplus electricity can be stored in batteries or fed back into the national grid." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// C5 — GRAMMAIRE
// ─────────────────────────────────────────────────────────────────────
'grammaire': {
  id:'grammaire', num:5, emoji:'📐',
  color:'#f59e0b',
  titre:'Grammar',
  desc:"Master the grammar structures of the official Seconde programme — tenses, modals, passive, reported speech and more.",
  souschapitres:[
    {
      id:'sc-g1', titre:'5.1 Les temps — Présent, Passé, Futur',
      notions:[
        'Present Simple: habits, facts, permanent states, schedules → she works, it rains',
        'Present Continuous: actions now, temporary situations, future plans → she is working',
        'Past Simple: completed actions at a specific time → he went, they saw',
        'Present Perfect: past action with present relevance, life experience → I have visited',
        'Future: will (spontaneous/prediction) vs going to (planned intention)',
      ],
      vocab:[
        { en:'habit',       fr:'habitude',           exemple:'I have the habit of reading before bed.' },
        { en:'routine',     fr:'routine',             exemple:'My morning routine includes exercise.' },
        { en:'temporary',   fr:'temporaire',          exemple:'She is staying with us temporarily.' },
        { en:'experience',  fr:'expérience',          exemple:'I have had the experience of living abroad.' },
        { en:'prediction',  fr:'prédiction',          exemple:'Scientists predict temperatures will rise.' },
        { en:'intention',   fr:'intention',           exemple:'I\'m going to study medicine next year.' },
        { en:'schedule',    fr:'programme, horaire',  exemple:'The train leaves at 9am according to the schedule.' },
        { en:'spontaneous', fr:'spontané',            exemple:'I\'ll help you! (spontaneous decision)' },
      ],
      grammar:[
        {
          regle:"Present Perfect — 3 main uses:\n1. Experience (ever/never): Have you ever been to London?\n2. Recent past with present result: She has just arrived.\n3. Unfinished time period: I haven't eaten today.",
          exemples:[
            "I have never tried sushi. (experience)",
            "He has already finished his homework. (recent — now done)",
            "We have lived here for five years. (still here now)",
          ]
        },
        {
          regle:"Will vs Going to:\nWill → spontaneous decision, prediction without evidence, promise\nGoing to → planned intention, prediction with visible evidence",
          exemples:[
            "'The phone is ringing.' — 'I'll get it!' (spontaneous)",
            "I'm going to study in Paris next year. (plan — already decided)",
            "Look at those clouds — it's going to rain. (evidence visible)",
          ]
        },
        {
          regle:"Past Simple vs Present Perfect:\nPast Simple → finished time (yesterday, in 2020, last week)\nPresent Perfect → no specific time or link to present",
          exemples:[
            "She visited Paris last summer. (Past Simple — specific time)",
            "She has visited Paris three times. (Present Perfect — experience, no specific time)",
          ]
        },
      ],
      exercices:[
        { id:'EX-G1-1', niveau:'Facile', titre:'Choisir le bon temps',
          enonce:"Choose the correct tense (Present Simple, Continuous, Past Simple or Present Perfect):\n1. I (live) in London since 2020.\n2. She (study) for her exam at the moment.\n3. We (visit) Rome last summer — it was incredible.\n4. He never (try) raw fish before.\n5. The sun (rise) in the east every morning.\n6. I (go) to the cinema — want to join?",
          correction:"1. I have lived in London since 2020. (Present Perfect — from past to now)\n2. She is studying for her exam at the moment. (Present Continuous — now)\n3. We visited Rome last summer. (Past Simple — specific time)\n4. He has never tried raw fish before. (Present Perfect — experience)\n5. The sun rises in the east every morning. (Present Simple — fact)\n6. I'm going to the cinema — want to join? (Present Continuous — future plan)" },
        { id:'EX-G1-2', niveau:'Intermédiaire', titre:'Will vs Going to',
          enonce:"Complete with will or going to:\n1. 'I promise I ___ help you with your project.' (promise)\n2. She ___ study medicine — she has already applied. (plan)\n3. 'The bag is too heavy!' 'I ___ carry it for you.' (offer)\n4. Look at that ice! He ___ fall! (evidence)\n5. Scientists predict temperatures ___ rise by 2°C. (prediction)",
          correction:"1. will help (promise)\n2. is going to study (plan already made)\n3. will carry (spontaneous offer)\n4. is going to fall (evidence visible)\n5. will rise (prediction — scientific)" },
      ],
      specs:[
        { orientation:'🎓 All streams', icon:'🎓', color:'#f59e0b',
          focus:'Complete review of tenses — mixed grammar exercise',
          vocab:['tense','auxiliary','irregular verb','conjugate','agreement','subject','predicate'],
          exercice:{ id:'EX-G1-A1', niveau:'Difficile', titre:'Mixed Tenses — Paragraph',
            enonce:"Put the verbs in brackets into the correct tense:\n\nMy grandmother (be) born in 1945, just after the Second World War (end). She (grow up) in a small village where everyone (know) each other. When she (be) 18, she (move) to London — she (never / see) such a big city before. She (live) there for 40 years now and (not / want) to leave. Last year, she (celebrate) her 75th birthday and she (tell) us that London (change) enormously since she first (arrive).",
            correction:"My grandmother was born in 1945, just after the Second World War had ended. She grew up in a small village where everyone knew each other. When she was 18, she moved to London — she had never seen such a big city before. She has lived there for 40 years now and doesn't want to leave. Last year, she celebrated her 75th birthday and she told us that London has changed enormously since she first arrived." }
        },
      ],
    },
    {
      id:'sc-g2', titre:'5.2 Modaux, Passif et Discours indirect',
      notions:[
        'Modals: can (ability/possibility), must (strong obligation), should (advice), may/might (possibility)',
        'Passive voice: subject receives the action → is/are/was/were + past participle',
        'Reported speech: tense shift when reporting what someone said',
        'Comparatives & superlatives: -er/-est for short adjectives, more/most for long adjectives',
      ],
      vocab:[
        { en:'obligation',  fr:'obligation',          exemple:'Wearing a seatbelt is a legal obligation.' },
        { en:'permission',  fr:'permission',          exemple:'May I leave the room, please?' },
        { en:'ability',     fr:'capacité',            exemple:'She can speak four languages.' },
        { en:'advice',      fr:'conseil',             exemple:'You should see a doctor about that cough.' },
        { en:'possibility', fr:'possibilité',         exemple:'It might rain later — take an umbrella.' },
        { en:'report',      fr:'rapporter',           exemple:'He reported that the situation was serious.' },
        { en:'agent',       fr:'agent (passif)',       exemple:'The bridge was built by the Romans.' },
        { en:'transform',   fr:'transformer',         exemple:'Transform the sentence into the passive voice.' },
      ],
      grammar:[
        {
          regle:"Passive voice — formation and use:\nPresent: is/are + past participle\nPast: was/were + past participle\nUse: when the action is more important than the agent, or agent is unknown",
          exemples:[
            "Active: Scientists discovered penicillin in 1928.\nPassive: Penicillin was discovered in 1928. (agent less important)",
            "English is spoken by 1.5 billion people. (Present Passive)",
            "The bridge is being repaired. (Present Continuous Passive)",
          ]
        },
        {
          regle:"Reported speech — tense shifts:\nDirect → Reported\npresent simple → past simple\npresent continuous → past continuous\nwill → would\ncan → could\nmust → had to",
          exemples:[
            "'I am tired.' → She said (that) she was tired.",
            "'We will help you.' → They promised (that) they would help us.",
            "'You must study.' → The teacher said we had to study.",
          ]
        },
      ],
      exercices:[
        { id:'EX-G2-1', niveau:'Facile', titre:'Passive voice transformation',
          enonce:"Transform these sentences from active to passive:\n1. Shakespeare wrote Hamlet around 1600.\n2. They produce this cheese in France.\n3. Someone has stolen my bicycle.\n4. They are building a new school in our town.\n5. Edison invented the light bulb.",
          correction:"1. Hamlet was written by Shakespeare around 1600.\n2. This cheese is produced in France.\n3. My bicycle has been stolen.\n4. A new school is being built in our town.\n5. The light bulb was invented by Edison." },
        { id:'EX-G2-2', niveau:'Intermédiaire', titre:'Reported speech',
          enonce:"Report what these people said:\n1. Mary: 'I love reading science fiction.'\n2. The teacher: 'You must submit your essay tomorrow.'\n3. Tom: 'I will call you later.'\n4. Ana: 'I am studying for my exams.'\n5. The doctor: 'You should rest for a week.'",
          correction:"1. Mary said (that) she loved reading science fiction.\n2. The teacher said (that) we had to submit our essay the next day.\n3. Tom said (that) he would call us later.\n4. Ana said (that) she was studying for her exams.\n5. The doctor said (that) I should rest for a week." },
      ],
      specs:[
        { orientation:'🎓 All streams', icon:'🎓', color:'#f59e0b',
          focus:'Mixed grammar exercise — Year 10 level',
          vocab:['modal','auxiliary','passive','reported','transform','rewrite','clause'],
          exercice:{ id:'EX-G2-A1', niveau:'Difficile', titre:'Grammar — Mixed Exercises',
            enonce:"A) Rewrite using the passive: 'They have discovered a new planet.'\nB) Report: 'I can\'t come tomorrow,' she said.\nC) Choose the correct modal:\n  'You ___ smoke here — it\'s against the rules.' (must not / don't have to)\nD) Write a conditional type 1: if / study / pass",
            correction:"A) A new planet has been discovered.\n\nB) She said (that) she couldn't come the next day.\n\nC) 'You must not smoke here — it's against the rules.'\n(must not = prohibition; don't have to = no obligation)\n\nD) If you study regularly, you will pass your exams." }
        },
      ],
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// C6 — VOCABULAIRE & THÈMES CULTURELS
// ─────────────────────────────────────────────────────────────────────
'vocabulaire-culture': {
  id:'vocabulaire-culture', num:6, emoji:'🌍',
  color:'#f43f5e',
  titre:'Vocabulary & Cultural Themes',
  desc:"Discover the English-speaking world — UK, USA, Commonwealth, traditions, society. Theme: living together, diversity and culture.",
  souschapitres:[
    {
      id:'sc-v1', titre:'6.1 Pays anglophones et cultures',
      notions:[
        'UK: England, Scotland, Wales, Northern Ireland — monarchy, Parliament, NHS, Brexit legacy',
        'USA: federal republic, 50 states — diversity, political system, cultural influence',
        'Commonwealth: 56 member states — shared history, common institutions, diverse cultures',
        'Cultural differences: British understatement, American directness, Australian informality',
      ],
      vocab:[
        { en:'monarchy',     fr:'monarchie',          exemple:'The United Kingdom is a constitutional monarchy.' },
        { en:'parliament',   fr:'parlement',           exemple:'The British Parliament is divided into two Houses.' },
        { en:'federal',      fr:'fédéral',             exemple:'The USA is a federal republic with 50 states.' },
        { en:'democracy',    fr:'démocratie',          exemple:'Democracy requires active citizen participation.' },
        { en:'constitution', fr:'constitution',        exemple:'The US Constitution was written in 1787.' },
        { en:'commonwealth', fr:'Commonwealth',        exemple:'The Commonwealth unites 56 nations and 2.5 billion people.' },
        { en:'tradition',    fr:'tradition',           exemple:'Bonfire Night is a British tradition held on November 5th.' },
        { en:'institution',  fr:'institution',         exemple:'The BBC is one of Britain\'s most respected institutions.' },
      ],
      grammar:[
        {
          regle:"Expressing contrast between cultures:\nWhereas / While: contrast two different things simultaneously\nIn contrast to / Unlike: compare and highlight difference",
          exemples:[
            "British people tend to understate, whereas Americans are often more direct.",
            "While the UK has a monarchy, the USA is a republic.",
            "In contrast to France, the UK does not have a written constitution.",
          ]
        },
      ],
      exercices:[
        { id:'EX-V1-1', niveau:'Facile', titre:'English-speaking world quiz',
          enonce:"Answer these questions in complete English sentences:\n1. What are the four countries that make up the United Kingdom?\n2. How many states are in the USA?\n3. What is the Commonwealth?\n4. Name 3 countries where English is an official language outside the UK and USA.",
          correction:"1. The United Kingdom is made up of four countries: England, Scotland, Wales and Northern Ireland.\n\n2. The United States of America is made up of 50 states.\n\n3. The Commonwealth is an international organization of 56 countries, most of which were formerly part of the British Empire. Members share common values and institutions.\n\n4. English is an official language in: Canada, Australia, New Zealand, India, South Africa, Nigeria, Jamaica (many possible answers)." },
        { id:'EX-V1-2', niveau:'Intermédiaire', titre:'Cultural comparison essay intro',
          enonce:"Write a short introduction (50-60 words) comparing British and American culture. Use contrast expressions (whereas, while, in contrast to, unlike).",
          correction:"Although British and American cultures share the same language, they differ in many ways. British communication tends to be indirect and understated, whereas Americans are generally more direct and expressive. In contrast to the UK's constitutional monarchy, the USA is a federal republic. Despite these differences, both nations share deep cultural and political ties forged over centuries." },
      ],
      specs:[
        { orientation:'📊 Economics/SES', icon:'📊', color:'#10b981',
          focus:'Political and economic systems of English-speaking countries — comparisons',
          vocab:['welfare state','GDP','inequality','federal','electoral','lobby','policy','taxation'],
          exercice:{ id:'EX-V1-S1', niveau:'Difficile', titre:'UK vs USA Political Systems (SES)',
            enonce:"Compare the political and social systems of the UK and USA. Focus on: type of government, healthcare, and attitude to inequality. (100-120 words)",
            correction:"The United Kingdom and the United States differ significantly in their political and social organisation. The UK is a constitutional monarchy with a parliamentary system, while the USA is a federal republic with a presidential system. In terms of healthcare, the UK provides free universal care through the NHS, funded by taxation. The USA, by contrast, relies primarily on private insurance, leaving millions uninsured.\n\nRegarding inequality, both nations have significant wealth gaps; however, the UK\'s stronger welfare state — including unemployment benefits, social housing and free education — provides a greater safety net. Americans generally place greater emphasis on individual responsibility, while the British tradition favours collective provision. These differences reflect deep cultural values about the role of the state." }
        },
      ],
    },
    {
      id:'sc-v2', titre:'6.2 Thème global — Vivre ensemble',
      notions:[
        'Living together: shared rules, mutual respect, public space and civic responsibility',
        'Diversity: different backgrounds, beliefs and lifestyles coexisting in a shared society',
        'Solidarity: the sense of community and mutual support between citizens',
        'Environmental responsibility: living sustainably and protecting shared resources',
      ],
      vocab:[
        { en:'solidarity',    fr:'solidarité',         exemple:'The pandemic revealed the importance of community solidarity.' },
        { en:'civic',         fr:'civique',            exemple:'Voting is a fundamental civic duty.' },
        { en:'coexist',       fr:'coexister',          exemple:'Different cultures can coexist peacefully.' },
        { en:'sustainable',   fr:'durable',            exemple:'Sustainable development meets present needs without harming the future.' },
        { en:'tolerance',     fr:'tolérance',          exemple:'Tolerance is the foundation of a peaceful society.' },
        { en:'community',     fr:'communauté',         exemple:'A strong community looks after its most vulnerable members.' },
        { en:'responsibility',fr:'responsabilité',     exemple:'We all share a responsibility to protect the environment.' },
        { en:'inclusive',     fr:'inclusif',           exemple:'An inclusive society welcomes all its citizens equally.' },
      ],
      grammar:[
        {
          regle:"Expressing obligation, advice and possibility (review of modals):\nMust/have to → obligation\nShould/ought to → advice, moral recommendation\nCan/could → ability, possibility\nMay/might → uncertainty, polite permission",
          exemples:[
            "We must protect our environment for future generations. (obligation)",
            "Citizens should participate in democratic processes. (advice)",
            "Young people can make a real difference through activism. (possibility)",
            "Climate change might be irreversible if we don't act now. (uncertainty)",
          ]
        },
      ],
      exercices:[
        { id:'EX-V2-1', niveau:'Intermédiaire', titre:'Living together — essay',
          enonce:"Write a structured paragraph (80-100 words) answering: 'What does it mean to live together in a modern diverse society?' Use at least 3 key vocabulary words from this chapter.",
          correction:"Living together in a diverse society requires more than simply occupying the same space — it demands active tolerance, mutual respect and a genuine commitment to inclusion. A truly cohesive community is one where different cultures, beliefs and backgrounds are not merely accepted but celebrated. This means creating inclusive institutions, ensuring equal opportunities and fostering solidarity among citizens. Environmental responsibility is also part of living together — we share one planet, and our choices affect future generations. Ultimately, a sustainable society is built not on uniformity, but on the recognition that diversity is a strength." },
      ],
      specs:[
        { orientation:'🎓 Tronc commun', icon:'🎓', color:'#f43f5e',
          focus:'Complete thematic vocabulary — Year 10 final review',
          vocab:['diversity','tolerance','community','inclusion','solidarity','civic','sustainable','coexist'],
          exercice:{ id:'EX-V2-A1', niveau:'Difficile', titre:'Final Essay — Seconde',
            enonce:"Write a structured essay (150-180 words): 'Diversity makes society stronger.' Do you agree? Use arguments, examples and appropriate vocabulary.",
            correction:"Introduction: Diversity — whether cultural, linguistic or social — is often seen as a challenge. I believe, however, that it is one of society's greatest assets.\n\nFor: Diverse societies benefit from a wider range of perspectives, driving creativity and innovation. Research consistently shows that diverse teams produce better decisions. Cities like London, Toronto and Singapore — among the world's most multicultural — are also among its most dynamic economically. Furthermore, exposure to different cultures broadens individual horizons and fosters empathy.\n\nNuance: Diversity does not automatically lead to cohesion — it requires investment in inclusion, education and civic solidarity. Without these, inequality and misunderstanding can create tension.\n\nConclusion: I strongly agree that diversity makes society stronger, provided that it is accompanied by genuine tolerance and equal opportunity. A society that embraces its differences, while building on shared values, is both richer and more resilient than one that demands conformity." }
        },
      ],
    },
  ],
},

} // fin ALL_COMPS

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
export default function AnglaisSecondeSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'communication-interaction'
  const comp = ALL_COMPS[slug]

  const [openSc, setOpenSc]     = useState<string|null>(null)
  const [openEx, setOpenEx]     = useState<string|null>(null)
  const [openGram, setOpenGram] = useState<string|null>(null)
  const [activeSpec, setActiveSpec] = useState<number>(0)

  if (!comp) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex',
        alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📘</div>
          <h2>Skill not found</h2>
          <Link href="/bac-france/anglais/seconde" style={{ color:'#06b6d4' }}>← Back to Year 10</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#06b6d4'

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
          <Link href="/bac-france/anglais/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{comp.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:32, alignItems:'start' }}>

            {/* CONTENU PRINCIPAL */}
            <div>
              {/* Header */}
              <div style={{ marginBottom:36 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:32 }}>{comp.emoji}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:secColor,
                    background:`${secColor}18`, padding:'3px 12px', borderRadius:8, fontWeight:700 }}>
                    SKILL {comp.num}
                  </span>
                  <span style={{ fontSize:11, background:'rgba(6,182,212,0.15)', color:'#22d3ee',
                    padding:'2px 9px', borderRadius:10 }}>
                    📘 Year 10 · Common core
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:8 }}>
                  {comp.emoji} {comp.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7,
                  maxWidth:580, marginBottom:18 }}>{comp.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('English Year 10 France — '+comp.titre)}&subject=anglais`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 AI Tutor — this skill
                  </Link>
                  <Link href="/bac-france/anglais/premiere" style={{ display:'inline-flex',
                    alignItems:'center', gap:7, padding:'8px 16px', borderRadius:10,
                    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                    color:'var(--text2)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📗 Continue in Year 11
                  </Link>
                </div>
              </div>

              {/* SOUS-CHAPITRES */}
              {comp.souschapitres.map((sc, scIdx) => (
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

                      {/* EXERCICES */}
                      {sc.exercices.length > 0 && (
                        <div>
                          <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>
                            📝 Exercises — Common core
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
                                <Link href={`/solve?q=${encodeURIComponent('Anglais Seconde — '+ex.enonce)}&subject=anglais`}
                                  className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                  🤖 Aide IA
                                </Link>
                                <button onClick={() => setOpenEx(openEx===ex.id ? null : ex.id)}
                                  style={{ fontSize:11, padding:'5px 12px', borderRadius:7,
                                    border:'1px solid var(--border)', background:'transparent',
                                    color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
                                  📋 {openEx===ex.id ? 'Hide' : 'Answer key'}
                                </button>
                              </div>
                              {openEx===ex.id && (
                                <div style={{ padding:'10px 16px',
                                  borderTop:'1px solid var(--border)',
                                  background:`${secColor}06` }}>
                                  <div style={{ fontSize:10, color:secColor,
                                    fontWeight:700, marginBottom:4 }}>✅ Answer key</div>
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

                      {/* SPÉCIFICITÉS */}
                      {sc.specs.length > 0 && (
                        <div style={{ borderTop:`2px solid ${secColor}30`, paddingTop:24 }}>
                          <div style={{ marginBottom:16 }}>
                            <div style={{ fontSize:13, fontWeight:800, color:'var(--text)', marginBottom:6 }}>
                              ✨ According to your stream
                            </div>
                            <div style={{ fontSize:12, color:'var(--muted)' }}>
                              Content adapted to your future stream.
                            </div>
                          </div>
                          <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
                            {sc.specs.map((sp, si) => (
                              <button key={sp.orientation} onClick={() => setActiveSpec(si)}
                                style={{ padding:'7px 14px', borderRadius:10, border:'2px solid',
                                  borderColor: activeSpec===si ? sp.color : 'rgba(255,255,255,0.1)',
                                  background: activeSpec===si ? `${sp.color}18` : 'transparent',
                                  color: activeSpec===si ? sp.color : 'rgba(255,255,255,0.4)',
                                  fontSize:12, fontWeight:700, cursor:'pointer',
                                  fontFamily:'inherit', display:'flex', alignItems:'center',
                                  gap:5, transition:'all 0.15s' }}>
                                <span>{sp.icon}</span>
                                <span>{sp.orientation}</span>
                              </button>
                            ))}
                          </div>
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
                                      {sp.orientation}
                                    </div>
                                    <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{sp.focus}</div>
                                  </div>
                                </div>
                                <div style={{ marginBottom:14 }}>
                                  <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700,
                                    textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>
                                    Specific vocabulary
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
                                <div style={{ background:'var(--surface)',
                                  border:`1px solid ${sp.color}20`, borderRadius:12, overflow:'hidden' }}>
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
                                      📋 {openEx===sp.exercice.id ? 'Hide' : 'Model answer'}
                                    </button>
                                  </div>
                                  {openEx===sp.exercice.id && (
                                    <div style={{ padding:'10px 16px',
                                      borderTop:`1px solid ${sp.color}20`,
                                      background:`${sp.color}06` }}>
                                      <div style={{ fontSize:10, color:sp.color,
                                        fontWeight:700, marginBottom:4 }}>✅ Answer key</div>
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
                  <Link href={`/bac-france/anglais/seconde/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Previous</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[prevSlug].replace(/C\d — /,'')}
                      </div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/anglais/seconde/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right',
                      transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Next →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[nextSlug].replace(/C\d — /,'')}
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
                  fontSize:11, color:'#22d3ee', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(6,182,212,0.08)' }}>
                  📘 Year 10 · 6 Skills
                </div>
                {NAV_ORDER.map(s => (
                  <Link key={s} href={`/bac-france/anglais/seconde/${s}`} style={{ textDecoration:'none' }}>
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
                        {TITRES_NAV[s].replace(/C\d — /,'').slice(0,24)}
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
                  <Link href={`/solve?q=${encodeURIComponent('Anglais Seconde — '+comp.titre)}&subject=anglais`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat Prof Anglais
                  </Link>
                  <Link href="/bac-france/anglais/premiere" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>📗 Year 11</Link>
                  <Link href="/bac-france/anglais/terminale" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>🎓 Year 13</Link>
                  <Link href="/bac-france/anglais/seconde" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>↩ All skills</Link>
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