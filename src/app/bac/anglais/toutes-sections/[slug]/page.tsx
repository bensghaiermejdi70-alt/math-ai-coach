'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// ANGLAIS — TOUTES SECTIONS / [SLUG]
// Route : /bac/anglais/toutes-sections/[slug]
// Programme officiel CNP Tunisie · 4ème année secondaire
// Structure : chapitres COMMUNS + blocs SPÉCIFIQUES par section
// ══════════════════════════════════════════════════════════════════════

// ── Types ─────────────────────────────────────────────────────────────
type ExoNiveau = 'Facile' | 'Intermédiaire' | 'Difficile'

type Exercice = {
  id: string
  niveau: ExoNiveau
  titre: string
  enonce: string
  correction: string
}

type Specifique = {
  focus: string
  exemples: string[]
  vocab: string[]
  exercice: Exercice
}

type SousChapitre = {
  id: string
  titre: string
  vocab: { en: string; fr: string; exemple?: string }[]
  notions: string[]
  grammar?: { regle: string; exemples: string[] }[]
  exercices: Exercice[]
  // Spécificités par section (optionnel)
  spec_sciences?: Specifique
  spec_eco?: Specifique
  spec_lettres?: Specifique
}

type Unit = {
  id: string
  num: number
  icon: string
  titre: string
  color: string
  desc: string
  grammar_unite: string[]
  souschapitres: SousChapitre[]
}

// ── Navigation ────────────────────────────────────────────────────────
const NAV_ORDER = [
  'unit1-art-shows-holidaying',
  'unit2-education-matters',
  'unit3-creative-inventive-minds',
  'unit4-life-issues',
]

const TITRES_NAV: Record<string, string> = {
  'unit1-art-shows-holidaying':   'Unit 1 — Art Shows & Holidaying',
  'unit2-education-matters':      'Unit 2 — Education Matters',
  'unit3-creative-inventive-minds':'Unit 3 — Creative & Inventive Minds',
  'unit4-life-issues':            'Unit 4 — Life Issues',
}

const SEC_COLORS: Record<string, string> = {
  'unit1-art-shows-holidaying':   '#f59e0b',
  'unit2-education-matters':      '#6366f1',
  'unit3-creative-inventive-minds':'#06d6a0',
  'unit4-life-issues':            '#ec4899',
}

// ── Sections spécifiques ──────────────────────────────────────────────
const SECTIONS_SPEC = [
  { key:'sciences', label:'Sciences / Math / Info / Tech', icon:'🔬', color:'#6366f1' },
  { key:'eco',      label:'Éco-Gestion',                  icon:'📊', color:'#10b981' },
  { key:'lettres',  label:'Lettres',                      icon:'📚', color:'#ec4899' },
]

// ══════════════════════════════════════════════════════════════════════
// DONNÉES — 4 UNITS COMPLÈTES
// ══════════════════════════════════════════════════════════════════════
const ALL_UNITS: Record<string, Unit> = {

// ─────────────────────────────────────────────────────────────────────
// UNIT 1 — ART SHOWS & HOLIDAYING
// ─────────────────────────────────────────────────────────────────────
'unit1-art-shows-holidaying': {
  id:'unit1-art-shows-holidaying', num:1, icon:'🎨',
  color:'#f59e0b',
  titre:'Art Shows & Holidaying',
  desc:"Tourism, art, culture and travel — Present/Past tenses, Comparatives, Opinion expressions.",
  grammar_unite:['Present Simple / Continuous / Past Simple / Past Continuous','Comparatives & Superlatives','Expressing opinion (I think, In my opinion, As far as I\'m concerned…)'],
  souschapitres:[
    {
      id:'sc-u1-1',
      titre:'Chapter 1 — Art Shows & Museums',
      vocab:[
        { en:'exhibition',   fr:'exposition',        exemple:'An art exhibition at the National Museum.' },
        { en:'gallery',      fr:'galerie',           exemple:'We visited a photography gallery.' },
        { en:'sculpture',    fr:'sculpture',         exemple:'The sculpture was made of marble.' },
        { en:'masterpiece',  fr:'chef-d\'œuvre',     exemple:'The Mona Lisa is a masterpiece.' },
        { en:'curator',      fr:'conservateur/trice',exemple:'The curator explained each painting.' },
        { en:'heritage',     fr:'patrimoine',        exemple:'Cultural heritage must be preserved.' },
        { en:'portrait',     fr:'portrait',          exemple:'He painted a portrait of the king.' },
        { en:'landscape',    fr:'paysage',           exemple:'A beautiful landscape painting.' },
      ],
      notions:[
        'Role of art in society : education, emotion, culture, identity',
        'Types of art : painting, sculpture, photography, digital art',
        'Museums vs galleries : public institutions vs private spaces',
        'Art criticism : beauty, meaning, technique, impact',
      ],
      grammar:[
        {
          regle:"Present Simple → habitual facts about art and culture\nPresent Continuous → ongoing exhibitions",
          exemples:[
            "The museum opens at 9am every day. (Simple)",
            "The gallery is currently exhibiting modern art. (Continuous)",
          ]
        },
        {
          regle:"Expressing opinion :\nI think / I believe / In my opinion / As far as I\'m concerned + clause",
          exemples:[
            "In my opinion, art plays a crucial role in education.",
            "As far as I\'m concerned, museums should be free for all.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-U1-1', niveau:'Facile', titre:'Vocabulary matching',
          enonce:"Match each word with its definition:\n1. exhibition  2. curator  3. masterpiece  4. heritage\n\nA) A person who manages a museum collection\nB) A great work of art\nC) A public display of artworks\nD) Cultural traditions passed down through generations",
          correction:"1-C  2-A  3-B  4-D",
        },
        {
          id:'EX-U1-2', niveau:'Intermédiaire', titre:'Opinion paragraph',
          enonce:"Write a short paragraph (5-6 lines) expressing your opinion on: 'Art museums should be free for everyone.'",
          correction:"Model answer:\nIn my opinion, art museums should be free for everyone. First, culture and heritage belong to all citizens, not only to those who can afford it. Moreover, free museums encourage young people to discover art from an early age. As far as I\'m concerned, the government should fund museums through taxes rather than entry fees. In conclusion, making museums accessible to all is a sign of a civilized and equal society.",
        },
      ],
      spec_sciences:{
        focus:"Technology in art: digital art, virtual museums, 3D restoration",
        exemples:[
          "AI is now used to create and restore artworks.",
          "Virtual reality allows people to visit museums from home.",
          "3D printing is used to recreate damaged sculptures.",
        ],
        vocab:['digital art','virtual reality','3D printing','AI-generated','restoration','interactive'],
        exercice:{
          id:'EX-U1-SC1', niveau:'Intermédiaire', titre:'Technology & Art (Sciences)',
          enonce:"Read: 'Artificial intelligence can now generate paintings, music and poetry. Some argue this is a threat to human creativity.'\nQ1: What can AI generate?\nQ2: Give your opinion: Is AI a threat to human creativity?",
          correction:"Q1: AI can generate paintings, music and poetry.\nQ2: Model: I believe AI is not a threat but a tool. It can inspire artists and help them explore new forms of creativity. However, human emotion and experience remain irreplaceable in true art.",
        },
      },
      spec_eco:{
        focus:"Art as an economic sector: tourism, cultural industries, art market",
        exemples:[
          "Tourism generates billions through cultural sites.",
          "The global art market is worth over 65 billion dollars.",
          "Museums create jobs and boost local economies.",
        ],
        vocab:['cultural tourism','art market','revenue','investment','economic impact','cultural industry'],
        exercice:{
          id:'EX-U1-EC1', niveau:'Intermédiaire', titre:'Art & Economy (Éco-Gestion)',
          enonce:"'Cultural tourism represents 40% of world tourism revenue.' Explain how art contributes to the economy using 3 arguments.",
          correction:"1. Museums and cultural sites attract millions of tourists who spend on hotels, restaurants and transport.\n2. The art market (galleries, auctions) generates billions in transactions.\n3. Cultural events create jobs for artists, curators, guides and organizers.",
        },
      },
      spec_lettres:{
        focus:"Art description, narration, emotional and aesthetic response",
        exemples:[
          "The painting conveys a deep sense of loneliness.",
          "The artist uses warm colors to express joy.",
          "Standing before the sculpture, I felt overwhelmed.",
        ],
        vocab:['convey','express','emotion','aesthetic','narrative','symbolism','evoke','atmosphere'],
        exercice:{
          id:'EX-U1-LT1', niveau:'Difficile', titre:'Describe a work of art (Lettres)',
          enonce:"Describe a painting, sculpture or artwork you find meaningful. Explain what it represents and how it makes you feel. (8-10 lines)",
          correction:"Model answer:\nOne of my favourite paintings is 'Starry Night' by Vincent van Gogh. The painting depicts a swirling night sky over a peaceful village. Van Gogh uses deep blues and bright yellows to create a striking contrast between darkness and light. The brushstrokes are energetic and expressive, conveying a sense of movement and emotion. In my view, the painting symbolizes the artist's inner turmoil and his deep connection with nature. Every time I look at it, I feel a mixture of awe and melancholy. Great art, I believe, speaks to the soul.",
        },
      },
    },
    {
      id:'sc-u1-2',
      titre:'Chapter 2 — Space Tourism',
      vocab:[
        { en:'spacecraft',    fr:'vaisseau spatial',  exemple:'The spacecraft landed safely.' },
        { en:'orbit',         fr:'orbite',            exemple:'The satellite is in orbit.' },
        { en:'astronaut',     fr:'astronaute',        exemple:'She became the first female astronaut.' },
        { en:'innovation',    fr:'innovation',        exemple:'Space tourism requires major innovation.' },
        { en:'weightlessness',fr:'apesanteur',        exemple:'Astronauts experience weightlessness.' },
        { en:'launch',        fr:'lancement',         exemple:'The rocket launch was successful.' },
        { en:'affordable',    fr:'abordable',         exemple:'Space travel is not yet affordable.' },
        { en:'pioneer',       fr:'pionnier/ière',     exemple:'Elon Musk is a pioneer in space tourism.' },
      ],
      notions:[
        'Space tourism : commercial flights beyond Earth\'s atmosphere',
        'Key companies : SpaceX, Blue Origin, Virgin Galactic',
        'Advantages : scientific research, inspiration, new industry',
        'Disadvantages : cost, environmental impact, safety risks',
      ],
      grammar:[
        {
          regle:"Future forms for predictions:\nWill + verb → certain prediction\nMight / may + verb → possibility",
          exemples:[
            "Space tourism will become more affordable in the future.",
            "Ordinary people might travel to the Moon by 2050.",
          ]
        },
        {
          regle:"Comparatives :\n-er than / more… than / less… than",
          exemples:[
            "Space travel is more expensive than any other form of tourism.",
            "Electric rockets are cleaner than fuel-powered ones.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-U1-3', niveau:'Facile', titre:'True or False',
          enonce:"Read and say if the statements are True or False:\n'Space tourism refers to commercial activities that allow people to travel to space. Companies like SpaceX and Blue Origin offer flights beyond Earth's atmosphere. However, a ticket currently costs millions of dollars.'\n\n1. Space tourism is only for government astronauts. (T/F)\n2. SpaceX and Blue Origin are involved in space tourism. (T/F)\n3. Space travel is currently very cheap. (T/F)",
          correction:"1. False — Space tourism is open to paying civilians.\n2. True.\n3. False — It costs millions of dollars.",
        },
        {
          id:'EX-U1-4', niveau:'Difficile', titre:'For & Against essay',
          enonce:"Write a for & against essay on: 'Space tourism: is it a dream or a danger?' (10-12 lines)",
          correction:"Introduction: Space tourism is one of the most exciting and controversial developments of our time.\n\nFor: Space tourism can inspire a new generation of scientists and engineers. It can also fund further space research and lead to technological breakthroughs.\n\nAgainst: However, the environmental cost is significant — rockets consume enormous amounts of fuel. Moreover, it remains inaccessible to most people due to its prohibitive cost.\n\nConclusion: In my opinion, space tourism has great potential, but it must be developed responsibly, with strict environmental regulations.",
        },
      ],
      spec_sciences:{
        focus:"Science & technology behind space travel: propulsion, materials, physics",
        exemples:[
          "Rocket propulsion relies on Newton's third law of action-reaction.",
          "Heat-resistant materials protect spacecraft during re-entry.",
          "Solar panels power satellites in orbit.",
        ],
        vocab:['propulsion','thrust','re-entry','solar panel','orbit','G-force','trajectory','fuel'],
        exercice:{
          id:'EX-U1-SC2', niveau:'Difficile', titre:'Space Science (Sciences)',
          enonce:"Explain in English how a rocket overcomes Earth's gravity. Use scientific vocabulary from the lesson. (6-8 lines)",
          correction:"A rocket overcomes Earth's gravity through thrust generated by burning fuel. According to Newton's third law, the force pushing gases downward propels the rocket upward. The rocket must reach escape velocity, approximately 11.2 km/s, to break free from Earth's gravitational pull. Modern rockets use staged systems to reduce weight progressively. Advanced materials must withstand extreme temperatures during launch and re-entry.",
        },
      },
      spec_eco:{
        focus:"Space tourism as a new economic market",
        exemples:[
          "Virgin Galactic charges $450,000 per seat.",
          "The space economy is worth over $470 billion globally.",
          "Space tourism creates thousands of high-tech jobs.",
        ],
        vocab:['market','investment','startup','revenue','industry','cost','profit','commercial'],
        exercice:{
          id:'EX-U1-EC2', niveau:'Intermédiaire', titre:'Space Economy (Éco-Gestion)',
          enonce:"'The global space economy could reach $1 trillion by 2040.' Discuss the economic opportunities and challenges of space tourism.",
          correction:"Opportunities:\n- New market for ultra-luxury tourism\n- Creation of high-tech jobs\n- Technological spin-offs benefiting other industries\n\nChallenges:\n- Enormous R&D investment required\n- Very limited customer base (only the very wealthy)\n- Insurance and liability issues\n- Heavy regulatory environment",
        },
      },
      spec_lettres:{
        focus:"Imagination, narration, describing a dream experience",
        exemples:[
          "Floating in zero gravity, I felt as if I were dreaming.",
          "The Earth below looked like a fragile blue marble.",
          "It was the adventure of a lifetime.",
        ],
        vocab:['imagination','dream','adventure','awe','describe','narrative','sensation','experience'],
        exercice:{
          id:'EX-U1-LT2', niveau:'Difficile', titre:'Creative writing (Lettres)',
          enonce:"Write a short narrative (8-10 lines): You are the first tourist in space. Describe what you see, feel and think as you look at Earth from above.",
          correction:"Model answer:\nThe countdown ended and the rocket roared to life beneath me. Within minutes, the blue sky faded into the dark silence of space. I pressed my face against the window and gasped — there was Earth, hanging in the void like a fragile jewel. Its blues and greens shimmered beneath thin clouds. I felt an overwhelming sense of wonder and smallness. All the wars, borders and problems of humanity seemed impossibly trivial from up here. In that moment, I understood what astronauts mean when they talk about the overview effect — the profound feeling that we are all one.",
        },
      },
    },
    {
      id:'sc-u1-3',
      titre:'Chapter 3 — A Package Tour',
      vocab:[
        { en:'package tour',  fr:'voyage organisé',  exemple:'We booked a package tour to Greece.' },
        { en:'itinerary',     fr:'itinéraire',       exemple:'The travel agent gave us an itinerary.' },
        { en:'guided tour',   fr:'visite guidée',    exemple:'We joined a guided tour of the city.' },
        { en:'accommodation', fr:'hébergement',      exemple:'The accommodation was excellent.' },
        { en:'resort',        fr:'station balnéaire', exemple:'We stayed at a beach resort.' },
        { en:'backpacker',    fr:'routard/e',        exemple:'She traveled as a backpacker.' },
        { en:'sustainable',   fr:'durable',          exemple:'Sustainable tourism protects nature.' },
        { en:'souvenir',      fr:'souvenir',         exemple:'He bought a souvenir from each city.' },
      ],
      notions:[
        'Package tour vs individual travel : advantages and disadvantages of each',
        'Eco-tourism : respecting local culture and environment',
        'Mass tourism : impact on local communities and environment',
        'Responsible travel : sustainable practices',
      ],
      grammar:[
        {
          regle:"Past Simple vs Past Continuous :\nPast Simple → completed actions\nPast Continuous → ongoing background actions",
          exemples:[
            "We visited the Colosseum last summer. (Simple)",
            "While we were walking, it started to rain. (Continuous + Simple)",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-U1-5', niveau:'Intermédiaire', titre:'Package tour vs individual travel',
          enonce:"Compare package tours and individual travel. Give 2 advantages and 1 disadvantage of each.",
          correction:"Package tour:\nAdvantages: Everything is organized (transport, hotels, guide). Less stressful, especially for first-time travelers.\nDisadvantage: Less flexibility — you follow a fixed programme.\n\nIndividual travel:\nAdvantages: Complete freedom to choose your own route and activities. More authentic cultural experiences.\nDisadvantage: Requires more planning and can be more expensive.",
        },
      ],
      spec_sciences:{
        focus:"Technology in travel: GPS, apps, booking platforms, electric transport",
        exemples:['GPS navigation systems','Online booking algorithms','Electric buses and trains for eco-tourism'],
        vocab:['GPS','app','platform','algorithm','electric vehicle','carbon footprint','tracking'],
        exercice:{
          id:'EX-U1-SC3', niveau:'Facile', titre:'Technology & Travel (Sciences)',
          enonce:"How has technology changed the way people travel? Give 3 examples.",
          correction:"1. GPS and mapping apps allow travelers to navigate without a guide.\n2. Online platforms like Booking or Airbnb make finding accommodation easier and cheaper.\n3. Electric vehicles and trains reduce the carbon footprint of travel.",
        },
      },
      spec_eco:{
        focus:"Tourism economics: revenue, employment, GDP, tourism industry",
        exemples:['Tourism accounts for 10% of global GDP.','It creates 1 in 10 jobs worldwide.','Package tours benefit travel agencies, hotels and airlines.'],
        vocab:['GDP','revenue','employment','industry','sector','profit','economic benefit'],
        exercice:{
          id:'EX-U1-EC3', niveau:'Intermédiaire', titre:'Tourism & Economy (Éco-Gestion)',
          enonce:"Tourism is one of the world's largest industries. Explain its economic importance using data and examples.",
          correction:"Tourism generates approximately 10% of global GDP. It is a major employer, creating 1 in 10 jobs worldwide. Countries like France, Spain and Tunisia depend heavily on tourist revenue. Package tours benefit multiple sectors simultaneously: airlines, hotels, restaurants and local craftsmen. However, over-tourism can damage infrastructure and raise costs for local residents.",
        },
      },
      spec_lettres:{
        focus:"Travel writing, description of places, personal experience",
        exemples:['The medina was a labyrinth of colors and sounds.','I wandered through narrow streets, lost in another world.'],
        vocab:['describe','atmosphere','impression','wander','discover','vibrant','picturesque','journey'],
        exercice:{
          id:'EX-U1-LT3', niveau:'Difficile', titre:'Travel writing (Lettres)',
          enonce:"Write a travel blog entry (8-10 lines) describing a place you have visited or would like to visit.",
          correction:"Model answer:\nThe moment I stepped into the old medina of Tunis, I felt transported to another era. The narrow alleyways wound through a maze of colorful stalls selling spices, leather and silver jewelry. The air was thick with the scent of jasmine and fresh bread. Merchants called out in Arabic and French, creating a joyful symphony of voices. I paused at a small café, sipping mint tea and watching life unfold around me. Every corner revealed a new story — a faded mosaic, an ancient door, a smiling face. That afternoon, I understood what travel truly means: not moving from place to place, but opening your eyes and your heart.",
        },
      },
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// UNIT 2 — EDUCATION MATTERS
// ─────────────────────────────────────────────────────────────────────
'unit2-education-matters': {
  id:'unit2-education-matters', num:2, icon:'📚',
  color:'#6366f1',
  titre:'Education Matters',
  desc:"Education systems, lifelong learning, online education — Modals, Passive voice, Conditionals.",
  grammar_unite:['Modals : can, could, must, should, ought to, have to','Passive Voice : is/are/was/were + past participle','Conditionals : Type 1 (real), Type 2 (unreal), Type 3 (past unreal)'],
  souschapitres:[
    {
      id:'sc-u2-1',
      titre:'Chapter 1 — Education for All',
      vocab:[
        { en:'literacy',     fr:'alphabétisation',   exemple:'Literacy rates have improved globally.' },
        { en:'equality',     fr:'égalité',           exemple:'Education promotes equality.' },
        { en:'access',       fr:'accès',             exemple:'All children deserve access to education.' },
        { en:'compulsory',   fr:'obligatoire',       exemple:'Education is compulsory up to age 16.' },
        { en:'dropout',      fr:'abandon scolaire',  exemple:'The dropout rate is too high.' },
        { en:'scholarship',  fr:'bourse',            exemple:'She received a scholarship to study abroad.' },
        { en:'curriculum',   fr:'programme scolaire',exemple:'The curriculum includes arts and sciences.' },
        { en:'inclusive',    fr:'inclusif/ive',      exemple:'Inclusive education welcomes all students.' },
      ],
      notions:[
        'Right to education : Article 26 of the Universal Declaration of Human Rights',
        'Gender equality in education : girls\' access to school',
        'Education in developing countries : barriers and solutions',
        'UNESCO goals : Education for All by 2030',
      ],
      grammar:[
        {
          regle:"Modals for obligation and advice:\nMust → strong obligation\nShould → advice\nHave to → external obligation",
          exemples:[
            "Every child must have access to quality education.",
            "Governments should invest more in rural schools.",
            "Students have to pass exams to graduate.",
          ]
        },
        {
          regle:"Passive Voice : Subject + is/are/was/were + past participle\nUsed when the agent is unknown, unimportant or obvious",
          exemples:[
            "Education is considered a fundamental right.",
            "Many schools were built in rural areas last year.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-U2-1', niveau:'Facile', titre:'Modals practice',
          enonce:"Complete with the correct modal (must, should, can, have to):\n1. Every child __ go to school — it\'s the law.\n2. Teachers __ be more patient with struggling students.\n3. In Tunisia, students __ study both Arabic and French.\n4. She __ speak English fluently after years of practice.",
          correction:"1. must / has to\n2. should\n3. have to\n4. can",
        },
        {
          id:'EX-U2-2', niveau:'Difficile', titre:'Argumentative essay',
          enonce:"'Education is the most powerful weapon to change the world.' (Nelson Mandela)\nWrite an argumentative essay discussing this quote. (10-12 lines)",
          correction:"Nelson Mandela's words ring as true today as ever. Education is indeed the most transformative force available to humanity. First, education empowers individuals to think critically and make informed decisions. It breaks the cycle of poverty by providing skills and opportunities. Second, educated citizens contribute to economic development and social progress. Countries with high literacy rates tend to be more stable and prosperous. Moreover, education promotes tolerance and understanding between cultures. Without it, ignorance and inequality flourish. However, education must be quality, accessible and relevant to be truly powerful. In conclusion, investing in education is the wisest investment any nation can make.",
        },
      ],
      spec_sciences:{
        focus:"E-learning, educational technology, data-driven education",
        exemples:['AI tutors can adapt to each student\'s learning pace.','Digital platforms make education accessible worldwide.','Educational data analytics help identify struggling students.'],
        vocab:['e-learning','platform','adaptive learning','digital divide','algorithm','data analytics','access'],
        exercice:{
          id:'EX-U2-SC1', niveau:'Intermédiaire', titre:'Technology in Education (Sciences)',
          enonce:"'Technology can eliminate the digital divide in education.' Do you agree? Justify with 3 arguments.",
          correction:"Arguments for:\n1. Online platforms like Khan Academy give free access to quality education globally.\n2. Smartphones reach remote areas where building schools is impossible.\n3. AI-powered tools adapt to each student's individual needs.\n\nNuance: Technology alone is not enough — internet access, devices and training are also required.",
        },
      },
      spec_eco:{
        focus:"Education and the labour market, ROI of education, skills economy",
        exemples:['University graduates earn 55% more than non-graduates.','Skills gaps cost businesses billions each year.','Education is the best investment for economic growth.'],
        vocab:['labour market','employability','skills gap','ROI','graduate','productivity','workforce'],
        exercice:{
          id:'EX-U2-EC1', niveau:'Intermédiaire', titre:'Education & Employment (Éco-Gestion)',
          enonce:"Explain the relationship between education and economic development. Use specific examples.",
          correction:"Education directly boosts economic productivity. Educated workers are more efficient and innovative, contributing to GDP growth. Countries that invest in education, such as South Korea and Finland, consistently rank among the world's most competitive economies. Moreover, a skilled workforce attracts foreign investment. Conversely, high dropout rates and skills gaps limit economic potential and increase unemployment costs.",
        },
      },
      spec_lettres:{
        focus:"Education as social equality, personal stories, rights and justice",
        exemples:['Education gave Malala the courage to fight back.','School changed my life and my family\'s future.'],
        vocab:['justice','equality','empower','voice','narrative','social change','rights','privilege'],
        exercice:{
          id:'EX-U2-LT1', niveau:'Difficile', titre:'Personal narrative (Lettres)',
          enonce:"Write a personal narrative (8-10 lines): Describe how education has changed or could change someone's life.",
          correction:"Model answer:\nMy grandmother grew up in a small village where girls were not expected to go to school. Yet, against all odds, she walked miles every day to attend the only classroom in the region. Education gave her something no one could take away: knowledge and dignity. She learned to read, to write and to dream beyond the limits of her village. Years later, she became a teacher herself. Every time I complain about homework, I think of her determination. Education, I have come to understand, is not a privilege — it is a right and a revolution.",
        },
      },
    },
    {
      id:'sc-u2-2',
      titre:'Chapter 2 — Online Learning & Virtual Schools',
      vocab:[
        { en:'distance learning', fr:'apprentissage à distance', exemple:'Distance learning grew during the pandemic.' },
        { en:'webinar',           fr:'webinaire',               exemple:'She attended an online webinar.' },
        { en:'interactive',       fr:'interactif/ive',          exemple:'The platform is very interactive.' },
        { en:'self-paced',        fr:'à son propre rythme',     exemple:'Self-paced courses suit working adults.' },
        { en:'broadband',         fr:'haut débit',              exemple:'Fast broadband is needed for e-learning.' },
        { en:'certificate',       fr:'certificat',              exemple:'She earned an online certificate.' },
        { en:'engagement',        fr:'engagement',              exemple:'Student engagement is key in online learning.' },
        { en:'asynchronous',      fr:'asynchrone',              exemple:'Asynchronous learning allows flexibility.' },
      ],
      notions:[
        'Online learning : MOOCs, virtual classrooms, video conferences',
        'Advantages : flexibility, accessibility, self-paced, global reach',
        'Disadvantages : lack of social interaction, digital divide, motivation',
        'Hybrid learning : combining online and face-to-face education',
      ],
      grammar:[
        {
          regle:"Conditionals :\nType 1 (real/possible) : If + present, will + base verb\nType 2 (unreal/hypothetical) : If + past, would + base verb",
          exemples:[
            "If students have internet access, they will benefit from e-learning. (Type 1)",
            "If every school were connected, more children would succeed. (Type 2)",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-U2-3', niveau:'Intermédiaire', titre:'Online vs traditional learning',
          enonce:"Write a paragraph (6-8 lines) comparing online learning and traditional classroom learning. Use comparatives.",
          correction:"Online learning is more flexible than traditional classroom education. Students can study at their own pace and access courses from anywhere in the world. However, face-to-face learning is more interactive and allows for immediate feedback from teachers. Moreover, a physical classroom encourages social skills and teamwork, which are harder to develop online. In my view, a combination of both approaches — known as hybrid learning — is the most effective model.",
        },
      ],
      spec_sciences:{ focus:"EdTech, AI tutors, learning algorithms", exemples:['Adaptive learning algorithms adjust difficulty based on performance.','AI can identify learning gaps in real time.'], vocab:['adaptive','algorithm','feedback','performance','AI tutor','data'], exercice:{ id:'EX-U2-SC2', niveau:'Difficile', titre:'AI in Education (Sciences)', enonce:"How can artificial intelligence improve online learning? Give 3 specific examples.", correction:"1. AI tutors can adapt exercises to each student's level in real time.\n2. Machine learning algorithms identify which students are at risk of dropping out.\n3. Natural language processing enables instant feedback on writing tasks." } },
      spec_eco:{ focus:"EdTech market, online course business models", exemples:['Coursera is valued at over $2 billion.','Online education is a $350 billion global market.'], vocab:['EdTech','subscription','freemium','market','revenue','platform','business model'], exercice:{ id:'EX-U2-EC2', niveau:'Intermédiaire', titre:'EdTech Business (Éco-Gestion)', enonce:"Describe the business model of an online learning platform like Coursera or Udemy.", correction:"Online platforms like Coursera use a freemium model: basic courses are free, but certificates and premium content require payment. They generate revenue through individual subscriptions, corporate training contracts and university partnerships. The low marginal cost of scaling digital content makes EdTech highly profitable once the initial investment is recovered." } },
      spec_lettres:{ focus:"Personal reflection on distance learning experience", exemples:['Studying alone can be isolating without a classroom community.','Online learning requires extraordinary self-discipline.'], vocab:['isolation','discipline','motivation','reflection','community','adapt','challenge'], exercice:{ id:'EX-U2-LT2', niveau:'Difficile', titre:'Reflection essay (Lettres)', enonce:"Reflect on the advantages and difficulties of online learning from a personal perspective. (8-10 lines)", correction:"Online learning transformed my relationship with education. On one hand, the flexibility was invaluable — I could study when I felt most focused, without commuting or rigid schedules. On the other hand, I deeply missed the energy of a classroom, the spontaneous discussions and the encouragement of a teacher's presence. Motivation became my greatest challenge. Without the structure of school, I sometimes felt adrift. Yet this experience taught me something valuable: true learning is ultimately self-driven. The best online learner is one who has learned to learn." } },
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// UNIT 3 — CREATIVE & INVENTIVE MINDS
// ─────────────────────────────────────────────────────────────────────
'unit3-creative-inventive-minds': {
  id:'unit3-creative-inventive-minds', num:3, icon:'💡',
  color:'#06d6a0',
  titre:'Creative & Inventive Minds',
  desc:"Creativity, innovation, technology and AI — Relative clauses, Linking words, Gerund/Infinitive.",
  grammar_unite:['Relative clauses : who, which, that, whose, where','Linking words : however, moreover, therefore, although, despite','Gerund (-ing) vs Infinitive (to + verb)'],
  souschapitres:[
    {
      id:'sc-u3-1',
      titre:'Chapter 1 — Creativity & Innovation',
      vocab:[
        { en:'creativity',    fr:'créativité',       exemple:'Creativity is the key to innovation.' },
        { en:'breakthrough',  fr:'percée, avancée',  exemple:'A scientific breakthrough changed medicine.' },
        { en:'patent',        fr:'brevet',           exemple:'She filed a patent for her invention.' },
        { en:'prototype',     fr:'prototype',        exemple:'They built a prototype of the device.' },
        { en:'entrepreneur',  fr:'entrepreneur/e',   exemple:'Young entrepreneurs are changing the world.' },
        { en:'brainstorm',    fr:'remue-méninges',   exemple:'Let\'s brainstorm ideas for the project.' },
        { en:'innovative',    fr:'innovant/e',       exemple:'The innovative design won a prize.' },
        { en:'disruptive',    fr:'disruptif/ive',    exemple:'Smartphones were disruptive technology.' },
      ],
      notions:[
        'Creativity : thinking differently, making connections, problem-solving',
        'Innovation : applying creative ideas to real-world problems',
        'Inventors vs Entrepreneurs : creating ideas vs building businesses',
        'Famous inventors : Tesla, Curie, Edison, Jobs, Turing',
      ],
      grammar:[
        {
          regle:"Relative clauses :\nWho → people\nWhich / That → things\nWhose → possession\nWhere → places",
          exemples:[
            "Alan Turing was a mathematician who invented the concept of computing.",
            "The invention that changed everything was the internet.",
            "The lab where she worked became world-famous.",
          ]
        },
        {
          regle:"Gerund vs Infinitive :\nGerund after : enjoy, avoid, consider, keep, finish\nInfinitive after : want, decide, hope, plan, refuse",
          exemples:[
            "Scientists enjoy discovering new solutions.",
            "Edison decided to keep working despite 1000 failures.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-U3-1', niveau:'Facile', titre:'Relative clauses practice',
          enonce:"Join the sentences using a relative clause:\n1. Marie Curie was a scientist. She won two Nobel Prizes.\n2. The telephone is an invention. It changed human communication.\n3. Silicon Valley is a place. The world's biggest tech companies are based there.",
          correction:"1. Marie Curie was a scientist who won two Nobel Prizes.\n2. The telephone is an invention that/which changed human communication.\n3. Silicon Valley is a place where the world's biggest tech companies are based.",
        },
        {
          id:'EX-U3-2', niveau:'Difficile', titre:'Are we losing creativity in the digital age?',
          enonce:"Write an argumentative essay (10-12 lines) on: 'Digital technology is killing human creativity.'",
          correction:"Introduction: The rise of digital technology has transformed every aspect of our lives, including the way we create and think.\n\nFor: Some argue that technology makes us passive consumers rather than active creators. Scrolling through social media replaces reading, drawing and inventing. Moreover, AI can now generate art, music and writing, potentially making human creativity redundant.\n\nAgainst: However, technology also provides unprecedented creative tools. Designers, musicians and filmmakers use digital platforms to reach global audiences. The internet democratizes creativity by giving everyone a voice.\n\nConclusion: Technology does not kill creativity — it transforms it. The challenge is to use digital tools as a means of expression, not a substitute for thinking.",
        },
      ],
      spec_sciences:{ focus:"AI, robotics, engineering, scientific method", exemples:['Machine learning enables computers to learn from data.','Robotics combines mechanics, electronics and programming.','The scientific method : observe, hypothesize, test, conclude.'], vocab:['algorithm','robotics','machine learning','neural network','data','engineering','prototype'], exercice:{ id:'EX-U3-SC1', niveau:'Difficile', titre:'AI & Creativity (Sciences)', enonce:"'Artificial intelligence is more creative than humans.' Discuss this statement scientifically.", correction:"AI can generate impressive outputs — music, art, text — by analyzing patterns in large datasets. However, AI does not truly understand meaning or emotion; it reproduces patterns without genuine comprehension. Human creativity involves intuition, emotion and cultural context that AI cannot replicate. AI is a powerful creative tool, but not a truly creative mind." } },
      spec_eco:{ focus:"Innovation economy, startups, R&D investment", exemples:['Countries that invest in R&D grow faster economically.','Startups create millions of jobs globally.','Patents protect innovation and encourage investment.'], vocab:['startup','R&D','venture capital','patent','scalable','disruption','investment'], exercice:{ id:'EX-U3-EC1', niveau:'Intermédiaire', titre:'Innovation Economy (Éco-Gestion)', enonce:"Why is innovation essential for economic competitiveness? Give 3 economic arguments.", correction:"1. Innovation increases productivity, allowing companies to produce more with less.\n2. New products and services create new markets and employment opportunities.\n3. Countries that lead in R&D (US, Germany, South Korea) consistently dominate global trade and attract foreign investment." } },
      spec_lettres:{ focus:"Artistic creativity, imagination, literary and artistic expression", exemples:['Literature is the highest form of human creativity.','Poetry transforms pain into beauty.','Art gives form to what cannot be said in words.'], vocab:['imagination','inspiration','express','artistic','literary','aesthetic','original','vision'], exercice:{ id:'EX-U3-LT1', niveau:'Difficile', titre:'Creative writing (Lettres)', enonce:"Write a short poem OR a creative paragraph on the theme of 'creativity'. (6-8 lines)", correction:"Model paragraph:\nCreativity is not a gift bestowed upon the chosen few — it is a flame that lives in every human heart. It is the child who sees a dragon in the clouds, the musician who hears a melody in falling rain, the engineer who imagines a bridge where others see only a river. To be creative is to refuse to accept the world as it is and to dare to imagine it as it could be. In a world that often rewards conformity, creativity is the ultimate act of courage." } },
    },
    {
      id:'sc-u3-2',
      titre:'Chapter 2 — Modern Technology & AI',
      vocab:[
        { en:'artificial intelligence', fr:'intelligence artificielle', exemple:'AI is transforming every industry.' },
        { en:'automation',              fr:'automatisation',            exemple:'Automation replaced many factory jobs.' },
        { en:'digital revolution',      fr:'révolution numérique',     exemple:'We are living through a digital revolution.' },
        { en:'big data',                fr:'mégadonnées',              exemple:'Big data helps companies make decisions.' },
        { en:'cybersecurity',           fr:'cybersécurité',            exemple:'Cybersecurity is a growing concern.' },
        { en:'chatbot',                 fr:'chatbot',                  exemple:'The chatbot answered customer queries.' },
        { en:'augmented reality',       fr:'réalité augmentée',        exemple:'AR glasses overlay digital information.' },
        { en:'blockchain',              fr:'chaîne de blocs',          exemple:'Blockchain secures digital transactions.' },
      ],
      notions:[
        'AI : machine learning, deep learning, neural networks',
        'Impact of AI on jobs : automation vs job creation',
        'Ethical questions : bias, privacy, decision-making by machines',
        'Future of technology : smart cities, autonomous vehicles, metaverse',
      ],
      grammar:[
        {
          regle:"Linking words :\nAddition : moreover, furthermore, in addition\nContrast : however, although, despite, on the other hand\nCause : because, since, as a result\nConclusion : therefore, in conclusion, to sum up",
          exemples:[
            "AI creates new jobs. However, it also makes some jobs obsolete.",
            "Although automation increases productivity, it raises concerns about employment.",
            "Therefore, governments must invest in retraining programmes.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-U3-3', niveau:'Intermédiaire', titre:'AI : benefits and risks',
          enonce:"Complete the table with 2 benefits and 2 risks of artificial intelligence:\nBenefits | Risks",
          correction:"Benefits:\n1. AI speeds up medical diagnosis and drug discovery.\n2. Automation increases industrial productivity and reduces human error.\n\nRisks:\n1. AI can perpetuate biases present in training data.\n2. Mass automation may cause large-scale unemployment in certain sectors.",
        },
      ],
      spec_sciences:{ focus:"How AI works: neural networks, training, data, algorithms", exemples:['A neural network learns by adjusting weights based on errors.','Training data must be large and diverse to avoid bias.'], vocab:['neural network','training data','algorithm','accuracy','bias','model','deep learning'], exercice:{ id:'EX-U3-SC2', niveau:'Difficile', titre:'How AI learns (Sciences)', enonce:"Explain in simple English how a neural network learns to recognize images.", correction:"A neural network consists of layers of interconnected nodes that process data. During training, the network receives thousands of labeled images (e.g., cats and dogs). It adjusts the mathematical weights between nodes each time it makes an error, gradually improving its accuracy. After thousands of iterations, it can recognize patterns and classify new images it has never seen. This process is called supervised learning." } },
      spec_eco:{ focus:"AI and the future of work, economic disruption", exemples:['McKinsey estimates 30% of jobs could be automated by 2030.','New AI-related jobs: data scientist, prompt engineer, AI ethicist.'], vocab:['automation','disruption','reskilling','labour market','GDP','economic impact','transition'], exercice:{ id:'EX-U3-EC2', niveau:'Difficile', titre:'AI & Employment (Éco-Gestion)', enonce:"'AI will create more jobs than it destroys.' Discuss this statement from an economic perspective.", correction:"For: Historically, each technological revolution (steam, electricity, computers) ultimately created more jobs than it eliminated. AI creates new professions: data scientists, AI trainers, robot technicians.\nAgainst: The speed of AI disruption is unprecedented. Many workers may not have time or resources to reskill. Low-skill, routine jobs face the greatest risk.\nConclusion: The outcome depends on government investment in education, social protection and retraining programmes." } },
      spec_lettres:{ focus:"AI in literature, dystopia/utopia, philosophical reflection", exemples:['Orwell\'s 1984 predicted mass surveillance.','Will machines ever have feelings?','Technology without ethics is dangerous.'], vocab:['dystopia','utopia','philosophical','humanity','consciousness','ethics','surveillance','predict'], exercice:{ id:'EX-U3-LT2', niveau:'Difficile', titre:'Philosophical reflection (Lettres)', enonce:"'If a machine can think, does it deserve rights?' Write a philosophical reflection. (8-10 lines)", correction:"The question of machine consciousness is perhaps the most profound philosophical challenge of our era. If a machine can simulate thought, memory and emotion with perfect accuracy, what distinguishes it from a living mind? René Descartes argued that the ability to think proves existence — 'I think, therefore I am.' Yet true consciousness involves not merely processing information but experiencing it — feeling joy, pain, wonder. Today's AI, however sophisticated, remains a mirror reflecting human thought without truly possessing it. Nevertheless, as AI grows more complex, these questions will demand answers — legal, ethical and deeply human." } },
    },
  ],
},

// ─────────────────────────────────────────────────────────────────────
// UNIT 4 — LIFE ISSUES
// ─────────────────────────────────────────────────────────────────────
'unit4-life-issues': {
  id:'unit4-life-issues', num:4, icon:'🌍',
  color:'#ec4899',
  titre:'Life Issues',
  desc:"Environment, society, health and teen life — Reported speech, Future forms, Complex sentences.",
  grammar_unite:['Reported speech : said (that), asked (if/whether), told + infinitive','Future forms : will, going to, present continuous, might','Complex sentences : although, unless, provided that, as long as'],
  souschapitres:[
    {
      id:'sc-u4-1',
      titre:'Chapter 1 — Environmental Issues',
      vocab:[
        { en:'pollution',      fr:'pollution',         exemple:'Air pollution causes respiratory diseases.' },
        { en:'climate change', fr:'changement climatique', exemple:'Climate change threatens ecosystems.' },
        { en:'renewable',      fr:'renouvelable',      exemple:'Renewable energy reduces carbon emissions.' },
        { en:'deforestation',  fr:'déforestation',     exemple:'Deforestation destroys natural habitats.' },
        { en:'greenhouse gas', fr:'gaz à effet de serre', exemple:'CO₂ is the main greenhouse gas.' },
        { en:'biodiversity',   fr:'biodiversité',      exemple:'Biodiversity must be protected.' },
        { en:'sustainability', fr:'durabilité',        exemple:'Sustainability is essential for the future.' },
        { en:'carbon footprint',fr:'empreinte carbone',exemple:'We must reduce our carbon footprint.' },
      ],
      notions:[
        'Global warming : causes (greenhouse gases) and effects (rising temperatures, extreme weather)',
        'Solutions : renewable energy, electric vehicles, recycling, reforestation',
        'International agreements : Paris Agreement, COP summits',
        'Individual vs collective responsibility',
      ],
      grammar:[
        {
          regle:"Future forms :\nWill → prediction, promise, decision at moment of speaking\nGoing to → planned intention, prediction based on evidence\nMight → possibility",
          exemples:[
            "Temperatures will rise by 2°C by 2050 if nothing changes. (will = prediction)",
            "The government is going to invest in solar energy. (planned)",
            "Sea levels might rise dramatically within a century. (possibility)",
          ]
        },
        {
          regle:"Complex sentences with condition and concession :\nUnless = if not\nProvided that / As long as = on condition that\nAlthough / Even though = despite the fact that",
          exemples:[
            "Unless we act now, climate change will be irreversible.",
            "Renewable energy is viable as long as investment continues.",
            "Although solar panels are expensive, they save money in the long run.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-U4-1', niveau:'Facile', titre:'Environmental vocabulary',
          enonce:"Define in English (1 sentence each):\n1. carbon footprint\n2. renewable energy\n3. deforestation",
          correction:"1. Carbon footprint: the total amount of greenhouse gases produced by human activities.\n2. Renewable energy: energy from natural sources that are constantly replenished, such as sun, wind and water.\n3. Deforestation: the large-scale cutting down of forests, which destroys habitats and increases CO₂ levels.",
        },
        {
          id:'EX-U4-2', niveau:'Difficile', titre:'Problem / Solution essay',
          enonce:"Write a problem/solution essay on: 'Climate change is the greatest challenge of our generation.' (10-12 lines)",
          correction:"Introduction: Climate change is no longer a future threat — it is a present reality.\n\nProblems: Rising global temperatures are causing more frequent extreme weather events, including floods, droughts and wildfires. Melting polar ice raises sea levels, threatening coastal cities. Biodiversity loss is accelerating at an alarming rate.\n\nSolutions: Transitioning to renewable energy sources — solar, wind and hydropower — is essential. Governments must set binding carbon reduction targets. Individuals can reduce their footprint through sustainable consumption.\n\nConclusion: Addressing climate change requires global cooperation. Unless we act decisively today, future generations will face consequences far worse than those we see now.",
        },
      ],
      spec_sciences:{ focus:"Environmental science, carbon cycles, technology solutions", exemples:['The carbon cycle regulates CO₂ levels in the atmosphere.','Solar panels convert sunlight into electricity at 20-25% efficiency.','Carbon capture technology removes CO₂ from the atmosphere.'], vocab:['carbon cycle','ecosystem','photosynthesis','emission','capture','efficiency','renewable'], exercice:{ id:'EX-U4-SC1', niveau:'Difficile', titre:'Environmental Science (Sciences)', enonce:"Explain the greenhouse effect scientifically and describe two technological solutions to reduce it.", correction:"The greenhouse effect occurs when solar radiation penetrates the atmosphere and warms the Earth's surface. Greenhouse gases (CO₂, methane, water vapour) trap the outgoing infrared radiation, preventing heat from escaping.\n\nTechnological solutions:\n1. Carbon capture and storage (CCS): CO₂ is captured at emission sources (power plants) and stored underground.\n2. Solar and wind energy: replacing fossil fuels with clean energy sources eliminates CO₂ emissions at source." } },
      spec_eco:{ focus:"Green economy, environmental costs, sustainable development", exemples:['Climate disasters cost the global economy $650 billion in 2022.','The green economy creates 24 million jobs worldwide.','Carbon taxes incentivize businesses to reduce emissions.'], vocab:['green economy','carbon tax','sustainable','cost-benefit','externality','investment','ESG'], exercice:{ id:'EX-U4-EC1', niveau:'Intermédiaire', titre:'Green Economy (Éco-Gestion)', enonce:"What is the green economy and why is it important from an economic perspective?", correction:"The green economy is an economic model that reduces environmental risks while promoting social well-being and sustainable development. It prioritizes renewable energy, sustainable agriculture and eco-friendly manufacturing. Economically, it reduces long-term costs by preventing environmental disasters (estimated $650 billion/year globally), creates new markets and jobs, and attracts ESG-conscious investors. Countries that transition early gain competitive advantages in the emerging global green market." } },
      spec_lettres:{ focus:"Nature writing, environmental poetry, social conscience", exemples:['The sky wept acid rain over the dying forest.','We borrowed this Earth from our children.','Nature does not negotiate.'], vocab:['metaphor','imagery','conscience','warn','lament','mourn','urgent','legacy'], exercice:{ id:'EX-U4-LT1', niveau:'Difficile', titre:'Environmental writing (Lettres)', enonce:"Write a short opinion article for a school newspaper on: 'We are the last generation that can save the planet.' (8-10 lines)", correction:"Model:\nWe stand at a crossroads. Scientists agree that the decisions made in the next decade will determine the fate of our planet for centuries to come. Wildfires rage across continents, glaciers retreat like wounded animals and species disappear at a rate a thousand times faster than natural. Yet our leaders continue to postpone meaningful action. As young people, we have inherited not just this Earth but this crisis. We did not create it, but we must solve it. Every tree planted, every plastic bag refused, every vote cast for climate action matters. We are not the generation of despair — we are the generation of last chances. Let us not waste it." } },
    },
    {
      id:'sc-u4-2',
      titre:'Chapter 2 — Social Issues & Teen Life',
      vocab:[
        { en:'inequality',    fr:'inégalité',       exemple:'Social inequality continues to grow.' },
        { en:'peer pressure', fr:'pression sociale',exemple:'Many teens face peer pressure online.' },
        { en:'cyberbullying', fr:'cyberharcèlement',exemple:'Cyberbullying destroys self-confidence.' },
        { en:'addiction',     fr:'dépendance',      exemple:'Social media addiction is widespread.' },
        { en:'well-being',    fr:'bien-être',       exemple:'Mental well-being must be prioritized.' },
        { en:'stereotype',    fr:'stéréotype',      exemple:'We must challenge harmful stereotypes.' },
        { en:'resilience',    fr:'résilience',      exemple:'Resilience helps teens face difficulties.' },
        { en:'empathy',       fr:'empathie',        exemple:'Empathy is the foundation of kindness.' },
      ],
      notions:[
        'Social media : influence on identity, self-image, relationships',
        'Cyberbullying : definition, causes, effects, solutions',
        'Mental health in teens : anxiety, depression, stress',
        'Positive activism : youth movements (Greta Thunberg, Malala)',
      ],
      grammar:[
        {
          regle:"Reported speech :\nDirect: She said, 'I am stressed.'\nReported: She said (that) she was stressed.\nTense shift : am→was, will→would, can→could, have→had",
          exemples:[
            "He said, 'Social media is addictive.' → He said (that) social media was addictive.",
            "She asked, 'Do you feel happy?' → She asked if I felt happy.",
          ]
        },
      ],
      exercices:[
        {
          id:'EX-U4-3', niveau:'Facile', titre:'Reported speech practice',
          enonce:"Report these sentences:\n1. 'I spend 6 hours a day on social media,' he admitted.\n2. 'Are you affected by peer pressure?' the researcher asked.\n3. 'We will take action against cyberbullying,' the school promised.",
          correction:"1. He admitted (that) he spent 6 hours a day on social media.\n2. The researcher asked if/whether I was affected by peer pressure.\n3. The school promised (that) they would take action against cyberbullying.",
        },
        {
          id:'EX-U4-4', niveau:'Difficile', titre:'Opinion article',
          enonce:"Write an opinion article (10-12 lines): 'Social media: a tool of connection or a source of isolation?'",
          correction:"Social media promised to connect humanity — and in many ways, it has. Families separated by oceans can share moments in real time. Social movements gain momentum through hashtags. Artists reach audiences impossible to imagine before the digital age. Yet for many teenagers, social media has become a mirror that only reflects their insecurities. The relentless pressure to perform, to look perfect and to accumulate likes has created an epidemic of anxiety and depression. Research shows that heavy social media use correlates with lower self-esteem and higher loneliness. The platform designed to connect us is, paradoxically, making us feel more alone. The solution is not to abandon social media but to use it consciously — setting limits, seeking real connections and valuing life beyond the screen.",
        },
      ],
      spec_sciences:{ focus:"Neuroscience of addiction, psychology of social media", exemples:['Dopamine is released when we receive a like or notification.','Screen addiction activates the same brain pathways as substance abuse.'], vocab:['dopamine','neuroscience','addiction','psychology','brain','reward','cognitive','behavior'], exercice:{ id:'EX-U4-SC2', niveau:'Difficile', titre:'Psychology of Social Media (Sciences)', enonce:"Explain scientifically why social media is addictive. Use neuroscience concepts.", correction:"Social media platforms are designed to exploit the brain's reward system. Each like, comment or notification triggers the release of dopamine — a neurotransmitter associated with pleasure and reward. This creates a feedback loop: the brain learns to seek more stimulation, making compulsive checking a habitual behavior. Over time, this can alter neural pathways, reducing tolerance and increasing the need for digital stimulation — a mechanism similar to substance addiction." } },
      spec_eco:{ focus:"Social media industry, attention economy, advertising", exemples:['Meta earned $116 billion in 2022, mostly from advertising.','Your attention is the product sold to advertisers.','The attention economy values engagement above truth.'], vocab:['attention economy','advertising','revenue','data','monetize','engagement','algorithm'], exercice:{ id:'EX-U4-EC2', niveau:'Difficile', titre:'Attention Economy (Éco-Gestion)', enonce:"Explain the concept of the 'attention economy' and its economic implications for social media companies.", correction:"The attention economy refers to a model where human attention is treated as a scarce and valuable commodity. Social media companies generate revenue by selling targeted advertising — the more time users spend on the platform, the more ads are shown and the higher the revenue. Facebook (Meta) earned over $116 billion in advertising revenue in 2022. Algorithms are designed to maximize engagement, often prioritizing emotionally charged or controversial content. Critics argue this model incentivizes addiction and misinformation as tools for profit." } },
      spec_lettres:{ focus:"Personal essay, identity, social pressure, youth voice", exemples:['Who am I when no one is watching?','Behind the filtered photo lies a real human being.'], vocab:['identity','authentic','vulnerable','pressure','mask','reflection','voice','youth'], exercice:{ id:'EX-U4-LT2', niveau:'Difficile', titre:'Personal essay (Lettres)', enonce:"Write a personal essay (8-10 lines): 'The social media version of me is not really me.'", correction:"Every morning, before I am even fully awake, I reach for my phone. I scroll through a world of carefully filtered lives, each image more perfect than the last. And then I wonder: who is the person I present online? She smiles in every photo, travels to beautiful places, says witty things. But she is a construction — a highlight reel of moments carefully chosen to impress strangers. The real me wakes up with messy hair and doubts. The real me fails and questions and worries. Social media has given us the extraordinary power to curate our identity — but in doing so, it has made authenticity the rarest currency of our age. Perhaps the bravest thing a young person can do today is simply to be honestly, imperfectly themselves." } },
    },
  ],
},

} // fin ALL_UNITS

// ══════════════════════════════════════════════════════════════════════
// UI HELPERS
// ══════════════════════════════════════════════════════════════════════
function NiveauBadge({ niveau }: { niveau: ExoNiveau }) {
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
export default function AnglaisSlugPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'unit1-art-shows-holidaying'
  const unit = ALL_UNITS[slug]

  const [openSc, setOpenSc]       = useState<string|null>(null)
  const [openEx, setOpenEx]       = useState<string|null>(null)
  const [openGram, setOpenGram]   = useState<string|null>(null)
  const [activeSpec, setActiveSpec] = useState<'sciences'|'eco'|'lettres'>('sciences')

  if (!unit) return (
    <><Navbar/>
      <main style={{ paddingTop:80, minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📖</div>
          <h2>Unit non trouvée</h2>
          <Link href="/bac/anglais/toutes-sections" style={{ color:'#f59e0b' }}>← Retour</Link>
        </div>
      </main><Footer/></>
  )

  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx>0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx<NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null
  const secColor = SEC_COLORS[slug] || '#f59e0b'

  const specColors: Record<string,string> = { sciences:'#6366f1', eco:'#10b981', lettres:'#ec4899' }
  const specIcons:  Record<string,string> = { sciences:'🔬', eco:'📊', lettres:'📚' }
  const specLabels: Record<string,string> = { sciences:'Sciences / Math / Info / Tech', eco:'Éco-Gestion', lettres:'Lettres' }

  return (
    <><Navbar/>
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* BREADCRUMB */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'12px clamp(20px,5vw,60px)',
          display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>🇹🇳 Bac</Link><span>›</span>
          <Link href="/bac/anglais" style={{ color:'var(--muted)', textDecoration:'none' }}>🇬🇧 Anglais</Link><span>›</span>
          <Link href="/bac/anglais/toutes-sections" style={{ color:'var(--muted)', textDecoration:'none' }}>Toutes sections</Link><span>›</span>
          <span style={{ color:secColor, fontWeight:600 }}>{unit.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:36, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 260px', gap:32, alignItems:'start' }}>

            {/* ── CONTENU PRINCIPAL ── */}
            <div>
              {/* HEADER */}
              <div style={{ marginBottom:36 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:32 }}>{unit.icon}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:secColor,
                    background:`${secColor}18`, padding:'3px 12px', borderRadius:8, fontWeight:700 }}>
                    UNIT {unit.num}
                  </span>
                  <span style={{ fontSize:11, background:'rgba(245,158,11,0.15)', color:'#fbbf24',
                    padding:'2px 9px', borderRadius:10 }}>
                    🇬🇧 Anglais · Tunisie · Toutes sections
                  </span>
                </div>
                <h1 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, marginBottom:8 }}>
                  {unit.icon} {unit.titre}
                </h1>
                <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.7, maxWidth:580, marginBottom:18 }}>
                  {unit.desc}
                </p>

                {/* Grammar rapide */}
                <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
                  borderRadius:12, padding:'12px 16px', marginBottom:18 }}>
                  <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700, textTransform:'uppercase',
                    letterSpacing:'0.06em', marginBottom:8 }}>✍️ Grammar — Unit {unit.num}</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                    {unit.grammar_unite.map(g => (
                      <div key={g} style={{ display:'flex', gap:6, fontSize:12, color:'var(--text2)' }}>
                        <span style={{ color:secColor, flexShrink:0 }}>▸</span>{g}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link href={`/solve?q=${encodeURIComponent('Anglais Bac Tunisie — '+unit.titre)}&subject=anglais`}
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px',
                      borderRadius:10, background:`linear-gradient(135deg,${secColor},${secColor}cc)`,
                      color:'white', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                    🤖 Chat IA — ce chapitre
                  </Link>
                  <Link href="/examens" style={{ display:'inline-flex', alignItems:'center', gap:7,
                    padding:'8px 16px', borderRadius:10, background:'rgba(255,255,255,0.06)',
                    border:'1px solid rgba(255,255,255,0.12)', color:'var(--text2)',
                    fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    📋 Examens Bac
                  </Link>
                </div>
              </div>

              {/* ── SOUS-CHAPITRES ── */}
              {unit.souschapitres.map((sc, scIdx) => (
                <div key={sc.id} style={{ marginBottom:24, background:`${secColor}05`,
                  border:`1px solid ${secColor}20`, borderRadius:18, overflow:'hidden' }}>

                  {/* Header sous-chapitre */}
                  <button onClick={() => setOpenSc(openSc===sc.id ? null : sc.id)}
                    style={{ width:'100%', background:`${secColor}12`, padding:'16px 22px',
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                      cursor:'pointer', border:'none', textAlign:'left' }}>
                    <div>
                      <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6 }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:secColor, fontWeight:700 }}>
                          {String(scIdx+1).padStart(2,'0')}
                        </span>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>{sc.titre}</h2>
                      </div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                        {sc.notions.slice(0,2).map(n => (
                          <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:12,
                            background:`${secColor}12`, color:'var(--text2)', border:`1px solid ${secColor}18`,
                            maxWidth:240, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
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

                      {/* ── VOCABULAIRE ── */}
                      <div>
                        <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:14 }}>
                          📝 Vocabulary
                        </div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                          {sc.vocab.map(v => (
                            <div key={v.en} style={{ background:'rgba(255,255,255,0.03)',
                              border:'1px solid rgba(255,255,255,0.07)', borderRadius:10,
                              padding:'10px 12px' }}>
                              <div style={{ display:'flex', gap:8, alignItems:'baseline', marginBottom:4 }}>
                                <span style={{ fontWeight:800, fontSize:13, color:secColor }}>{v.en}</span>
                                <span style={{ fontSize:11, color:'var(--muted)', fontStyle:'italic' }}>{v.fr}</span>
                              </div>
                              {v.exemple && (
                                <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5,
                                  fontStyle:'italic', borderLeft:`2px solid ${secColor}40`, paddingLeft:8 }}>
                                  "{v.exemple}"
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ── NOTIONS ── */}
                      <div>
                        <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>
                          💡 Key Notions
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {sc.notions.map(n => (
                            <div key={n} style={{ display:'flex', gap:10, padding:'10px 14px',
                              background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
                              borderRadius:10 }}>
                              <span style={{ color:secColor, fontWeight:700, flexShrink:0 }}>▸</span>
                              <span style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6 }}>{n}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ── GRAMMAR ── */}
                      {sc.grammar && sc.grammar.length > 0 && (
                        <div>
                          <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>
                            ✍️ Grammar Focus
                          </div>
                          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                            {sc.grammar.map((g, gi) => {
                              const gKey = `${sc.id}-g${gi}`
                              return (
                                <div key={gKey} style={{ border:`1px solid ${secColor}25`,
                                  borderRadius:12, overflow:'hidden' }}>
                                  <button onClick={() => setOpenGram(openGram===gKey ? null : gKey)}
                                    style={{ width:'100%', padding:'12px 16px',
                                      background:`${secColor}10`, border:'none', textAlign:'left',
                                      cursor:'pointer', display:'flex', justifyContent:'space-between',
                                      alignItems:'center' }}>
                                    <span style={{ fontSize:12, fontWeight:700, color:secColor,
                                      fontFamily:'var(--font-mono)', whiteSpace:'pre-line' }}>
                                      {g.regle.split('\n')[0]}
                                    </span>
                                    <span style={{ color:secColor }}>{openGram===gKey ? '▲' : '▼'}</span>
                                  </button>
                                  {openGram===gKey && (
                                    <div style={{ padding:'14px 16px', background:'rgba(0,0,0,0.2)' }}>
                                      <pre style={{ fontSize:12, color:'var(--text2)', whiteSpace:'pre-wrap',
                                        margin:'0 0 12px', fontFamily:'var(--font-mono)',
                                        lineHeight:1.7 }}>{g.regle}</pre>
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
                        </div>
                      )}

                      {/* ── EXERCICES COMMUNS ── */}
                      {sc.exercices.length > 0 && (
                        <div>
                          <div style={{ fontSize:13, fontWeight:800, color:secColor, marginBottom:12 }}>
                            📝 Exercices — Toutes sections
                          </div>
                          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                            {sc.exercices.map(ex => (
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
                                <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px',
                                  display:'flex', gap:8, flexWrap:'wrap' }}>
                                  <Link href={`/solve?q=${encodeURIComponent('Anglais Bac — '+ex.enonce)}&subject=anglais`}
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
                                    <div style={{ fontSize:10, color:secColor, fontWeight:700, marginBottom:4 }}>
                                      ✅ Model Answer
                                    </div>
                                    <pre style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75,
                                      whiteSpace:'pre-wrap', margin:0 }}>{ex.correction}</pre>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════════════════════
                          BLOC SPÉCIFICITÉS PAR SECTION
                          ══════════════════════════════════════════════════════ */}
                      {(sc.spec_sciences || sc.spec_eco || sc.spec_lettres) && (
                        <div style={{ borderTop:`2px solid ${secColor}30`, paddingTop:24 }}>

                          {/* Titre bloc */}
                          <div style={{ marginBottom:16 }}>
                            <div style={{ fontSize:13, fontWeight:800, color:'var(--text)', marginBottom:6 }}>
                              ✨ Spécificités par section
                            </div>
                            <div style={{ fontSize:12, color:'var(--muted)' }}>
                              Le contenu ci-dessous est adapté selon votre section.
                            </div>
                          </div>

                          {/* Sélecteur de section */}
                          <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
                            {SECTIONS_SPEC.map(s => {
                              const hasSpec = (
                                (s.key==='sciences' && !!sc.spec_sciences) ||
                                (s.key==='eco' && !!sc.spec_eco) ||
                                (s.key==='lettres' && !!sc.spec_lettres)
                              )
                              if (!hasSpec) return null
                              const isActive = activeSpec === s.key
                              return (
                                <button key={s.key}
                                  onClick={() => setActiveSpec(s.key as any)}
                                  style={{ padding:'8px 16px', borderRadius:10, border:`2px solid`,
                                    borderColor: isActive ? s.color : 'rgba(255,255,255,0.1)',
                                    background: isActive ? `${s.color}18` : 'transparent',
                                    color: isActive ? s.color : 'rgba(255,255,255,0.4)',
                                    fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
                                    display:'flex', alignItems:'center', gap:6, transition:'all 0.15s' }}>
                                  <span>{s.icon}</span>
                                  <span>{s.label}</span>
                                </button>
                              )
                            })}
                          </div>

                          {/* Contenu spécifique */}
                          {(() => {
                            const spec =
                              activeSpec==='sciences' ? sc.spec_sciences :
                              activeSpec==='eco'      ? sc.spec_eco :
                              sc.spec_lettres
                            if (!spec) return null
                            const specColor = specColors[activeSpec]
                            return (
                              <div style={{ background:`${specColor}08`,
                                border:`1.5px solid ${specColor}25`, borderRadius:14, padding:'20px 22px' }}>

                                {/* Focus */}
                                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14 }}>
                                  <span style={{ fontSize:20 }}>{specIcons[activeSpec]}</span>
                                  <div>
                                    <div style={{ fontSize:10, color:specColor, fontWeight:700,
                                      textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>
                                      {specLabels[activeSpec]}
                                    </div>
                                    <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>
                                      {spec.focus}
                                    </div>
                                  </div>
                                </div>

                                {/* Exemples */}
                                <div style={{ marginBottom:14 }}>
                                  <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700,
                                    textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>
                                    Exemples & phrases clés
                                  </div>
                                  {spec.exemples.map((ex, i) => (
                                    <div key={i} style={{ fontSize:12, color:'var(--text2)',
                                      fontStyle:'italic', padding:'6px 10px', marginBottom:4,
                                      borderLeft:`3px solid ${specColor}60`, paddingLeft:12 }}>
                                      "{ex}"
                                    </div>
                                  ))}
                                </div>

                                {/* Vocabulaire spécifique */}
                                <div style={{ marginBottom:16 }}>
                                  <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700,
                                    textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>
                                    Vocabulaire spécifique
                                  </div>
                                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                                    {spec.vocab.map(v => (
                                      <span key={v} style={{ fontSize:11, padding:'3px 10px', borderRadius:20,
                                        background:`${specColor}14`, color:specColor,
                                        border:`1px solid ${specColor}25`, fontWeight:600 }}>
                                        {v}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Exercice spécifique */}
                                <div style={{ background:'var(--surface)', border:`1px solid ${specColor}20`,
                                  borderRadius:12, overflow:'hidden' }}>
                                  <div style={{ padding:'12px 16px' }}>
                                    <div style={{ display:'flex', gap:7, alignItems:'center',
                                      marginBottom:7, flexWrap:'wrap' }}>
                                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                                        color:specColor, background:`${specColor}14`,
                                        padding:'2px 8px', borderRadius:5 }}>{spec.exercice.id}</span>
                                      <NiveauBadge niveau={spec.exercice.niveau} />
                                      <span style={{ fontWeight:600, fontSize:13 }}>{spec.exercice.titre}</span>
                                    </div>
                                    <p style={{ fontSize:12, color:'var(--text2)', margin:0,
                                      lineHeight:1.65, whiteSpace:'pre-line' }}>{spec.exercice.enonce}</p>
                                  </div>
                                  <div style={{ borderTop:`1px solid ${specColor}20`, padding:'8px 16px',
                                    display:'flex', gap:8, flexWrap:'wrap' }}>
                                    <Link href={`/solve?q=${encodeURIComponent(spec.exercice.enonce)}&subject=anglais`}
                                      className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                      🤖 Aide IA
                                    </Link>
                                    <button onClick={() => setOpenEx(openEx===spec.exercice.id ? null : spec.exercice.id)}
                                      style={{ fontSize:11, padding:'5px 12px', borderRadius:7,
                                        border:`1px solid ${specColor}30`, background:'transparent',
                                        color:specColor, cursor:'pointer', fontFamily:'inherit' }}>
                                      📋 {openEx===spec.exercice.id ? 'Masquer' : 'Model Answer'}
                                    </button>
                                  </div>
                                  {openEx===spec.exercice.id && (
                                    <div style={{ padding:'10px 16px', borderTop:`1px solid ${specColor}20`,
                                      background:`${specColor}06` }}>
                                      <div style={{ fontSize:10, color:specColor, fontWeight:700, marginBottom:4 }}>
                                        ✅ Model Answer
                                      </div>
                                      <pre style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75,
                                        whiteSpace:'pre-wrap', margin:0 }}>{spec.exercice.correction}</pre>
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
                  <Link href={`/bac/anglais/toutes-sections/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[prevSlug].replace(/Unit \d — /,'')}
                      </div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac/anglais/toutes-sections/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>
                        {TITRES_NAV[nextSlug].replace(/Unit \d — /,'')}
                      </div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)',
                  fontSize:11, color:'#fbbf24', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', background:'rgba(245,158,11,0.08)' }}>
                  🇬🇧 Anglais · 4 Units
                </div>
                {NAV_ORDER.map(s => (
                  <Link key={s} href={`/bac/anglais/toutes-sections/${s}`} style={{ textDecoration:'none' }}>
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
                        {TITRES_NAV[s].replace(/Unit \d — /,'').slice(0,24)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/solve?q=${encodeURIComponent('Anglais Bac Tunisie — '+unit.titre)}&subject=anglais`}
                    className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — Anglais
                  </Link>
                  <Link href="/examens" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>
                    📋 Examens Bac
                  </Link>
                  <Link href="/bac/anglais/toutes-sections" className="btn btn-secondary"
                    style={{ textAlign:'center', fontSize:12 }}>
                    ↩ Toutes les Units
                  </Link>
                  <Link href="/bac/anglais" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>
                    🇬🇧 Anglais
                  </Link>
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