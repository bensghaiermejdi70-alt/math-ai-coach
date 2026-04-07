'use client'
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'  
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/lib/auth/AuthContext'

// ════════════════════════════════════════════════════════════════════
// QUOTAS HEBDOMADAIRES — Simulation IA (géré par Supabase via AuthContext)
// Standard   : 5 simulations/semaine
// Sprint Bac :10 simulations/semaine
// Admin bensghaiermejdi70@gmail.com = ILLIMITÉ (tous les PC)
// ════════════════════════════════════════════════════════════════════

// Plotly chargé dynamiquement (CDN)
// jsPDF chargé dynamiquement (CDN)
declare const Plotly: any
declare const jspdf: any

// ═══════════════════════════════════════════════════════════════════
// SIMULATION IA — LE FER DE LANCE DE MATHAI COACH
// 5 phases : Sélection → Génération → Examen → Correction → Analyse+Remédiation
// Chaque phase est propulsée par Claude via l'API Anthropic
// ═══════════════════════════════════════════════════════════════════

// ── Données Archives bacweb.tn ────────────────────────────────────
const W = 'http://www.bacweb.tn/bac'
const bw = (y: number, s: 'principale'|'controle', f: string, fi: string) =>
  `${W}/${y}/${s}/${f}/${fi}`

type SessionType = 'Principale' | 'Contrôle'
interface Archive {
  id: string; year: number; session: SessionType
  section: string; sectionKey: string; color: string
  url: string; themes: string[]; icon: string
}

const YEARS = [2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015] as const

const SECTION_CONFIGS = [
  { key:'maths', label:'Bac-Mathématiques', color:'#6366f1', icon:'∑', folder:'math', file:'math.pdf',
    themes:['Analyse & Suites','Nombres complexes','Probabilités','Géométrie espace','Isométries'] },
  { key:'scexp', label:'Sciences-Expérimentales', color:'#06d6a0', icon:'⚗', folder:'sciences_ex', file:'math.pdf',
    themes:['Analyse','Complexes','Probabilités','Géométrie','Intégrales'] },
  { key:'sctech', label:'Sciences-Techniques', color:'#f59e0b', icon:'⚙', folder:'technique', file:'technique.pdf',
    themes:['Analyse','Arithmétique','Probabilités','Complexes','Géométrie'] },
  { key:'eco', label:'Éco-Gestion', color:'#10b981', icon:'💹', folder:'economie_gestion', file:'math.pdf',
    themes:['Analyse & Suites','Probabilités & Statistiques','Matrices & Systèmes','Maths Financières','Logarithme & Exponentielle'] },
  { key:'info', label:'Informatique', color:'#8b5cf6', icon:'⌨', folder:'informatique', file:'algorithme.pdf',
    themes:['Algorithmique','Bases de données','Mathématiques','STI Web'] },
]

const ARCHIVES: Archive[] = YEARS.flatMap(y =>
  SECTION_CONFIGS.flatMap(sc => [
    { id:`${sc.key}-${y}-p`, year:y, session:'Principale' as SessionType,
      section:sc.label, sectionKey:sc.key, color:sc.color, icon:sc.icon,
      url:bw(y,'principale',sc.folder,sc.file), themes:sc.themes },
    { id:`${sc.key}-${y}-c`, year:y, session:'Contrôle' as SessionType,
      section:sc.label, sectionKey:sc.key, color:sc.color, icon:sc.icon,
      url:bw(y,'controle',sc.folder,sc.file), themes:sc.themes },
  ])
)

// ── Types ──────────────────────────────────────────────────────────
interface GeneratedExam {
  id: string; index: number; title: string; section: string
  duration: number; totalPoints: number
  exercises: { num:number; title:string; theme:string; points:number; statement:string; graph?:string }[]
}

interface AnalysisResult {
  estimatedScore: number; maxScore: number
  weakAreas: { theme:string; severity:'critical'|'moderate'|'good'; description:string; priority:number }[]
  strengths: string[]
  globalAdvice: string[]
  remediationExercises: {
    id: string; theme:string; difficulty:'introductory'|'standard'|'advanced'
    objective:string; statement:string; hint:string; officialCorrection:string
  }[]
}

type Phase = 'select' | 'generating' | 'choose-exam' | 'exam' | 'grading' | 'graded' | 'correcting' | 'correction' | 'analysing' | 'analysis'

// ── API Claude ────────────────────────────────────────────────────
async function askClaude(prompt: string, system: string, maxTokens = 4000): Promise<string> {
  // Appel via route Next.js pour eviter les erreurs CORS
  const r = await fetch('/api/anthropic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system,
      messages: [{ role:'user', content:prompt }],
    }),
  })
  if (!r.ok) {
    const err = await r.json().catch(()=>({}))
    throw new Error(err.error || `HTTP ${r.status}`)
  }
  const d = await r.json()
  return d.content?.map((b:any)=>b.type==='text'?b.text:'').join('') || ''
}

function parseJSON<T>(raw: string, fallback: T): T {
  const cleaned = raw.replace(/```json\s*/g,'').replace(/```\s*/g,'').trim()
  try { return JSON.parse(cleaned) }
  catch {
    // Tentative de réparation : extraire les champs statement cassés par les guillemets du [GRAPH:]
    // Stratégie : extraire chaque "statement": "..." en gérant les guillemets imbriqués mal échappés
    try {
      // Remplacer les [GRAPH: {...}] dans les strings JSON par un placeholder
      // puis re-parser, puis réinjecter
      let repaired = cleaned
      // Trouver et sauvegarder les blocs [GRAPH: {...}]
      const graphBlocks: string[] = []
      repaired = repaired.replace(/\[GRAPH:\s*(\{(?:[^{}]|\{[^{}]*\})*\})\]/g, (_match, json) => {
        graphBlocks.push(json)
        return `__GRAPH_${graphBlocks.length - 1}__`
      })
      // Maintenant tenter le parse
      const parsed = JSON.parse(repaired)
      // Ré-injecter les blocs graphiques dans les statements
      const reInject = (s: string) => s.replace(/__GRAPH_(\d+)__/g, (_m, i) => `[GRAPH: ${graphBlocks[Number(i)]}]`)
      if (parsed?.exercises) {
        parsed.exercises = parsed.exercises.map((ex: any) => ({
          ...ex,
          statement: ex.statement ? reInject(ex.statement) : ex.statement
        }))
      }
      return parsed as T
    } catch {
      return fallback
    }
  }
}

// ── Génération examen ─────────────────────────────────────────────
async function generateOneExam(
  archives: Archive[], customText: string, idx: number
): Promise<GeneratedExam> {
  const contextLines = archives.map(a =>
    `- ${a.section} ${a.year} Session ${a.session} | Thèmes: ${a.themes.join(', ')}`
  ).join('\n')

  const section = archives[0]?.section ?? 'Mathématiques'
  const totalPts = archives[0]?.sectionKey==='info' ? 20 : 20

  const system = `Tu es un auteur expert de sujets du Baccalauréat tunisien (programme CNP officiel).
Tu crées des sujets ORIGINAUX, réalistes, avec de vraies données numériques.
RÉPONDS UNIQUEMENT EN JSON VALIDE, sans backticks ni commentaires.`

  const prompt = `Crée un sujet de Bac ORIGINAL numéro ${idx+1} (sur 5 variantes) inspiré de ces sources :
${contextLines}
${customText ? `\nTexte fourni par l'élève (contenu référence) :\n${customText.substring(0,800)}` : ''}

Règles STRICTES :
- NOUVEAU sujet ORIGINAL, jamais une copie. Change toujours fonctions, valeurs, contexte
- Garde la structure et le niveau Bac Tunisien officiel
- Chaque exercice a des sous-parties numérotées 1), 2), 3)…
- Données numériques précises et réalistes
- Totale : ${totalPts} points répartis sur 4 exercices
- Niveau Bac : au moins 1 exercice avec une courbe ou figure géométrique à étudier

GRAPHIQUES DANS LES ÉNONCÉS — RÈGLES ABSOLUES :

FORMAT 1 — COURBE DE FONCTION :
[GRAPH: {"type":"function","expressions":["x*Math.exp(-x)+2"],"xMin":-1,"xMax":5,"labels":["f(x)"],"title":"Courbe de f"}]

FORMAT 2 — FIGURE GÉOMÉTRIQUE (triangle, cercle, vecteurs, angles) :
[GRAPH: {"type":"geometry","title":"Triangle ABC","shapes":[{"type":"axes","step":1},{"type":"grid","step":1},{"type":"triangle","points":[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":1,"y":3,"label":"C"}],"fill":"#6366f120"},{"type":"point","cx":0,"cy":0,"label":"A"},{"type":"point","cx":4,"cy":0,"label":"B"},{"type":"point","cx":1,"cy":3,"label":"C"}]}]

FORMAT 3 — GÉOMÉTRIE DANS L'ESPACE (projection 2D, JAMAIS de formes 3D) :
[GRAPH: {"type":"geometry","title":"Repère (O,i,j,k) — projection","shapes":[{"type":"axes","step":1},{"type":"vector","from":{"x":0,"y":0,"label":"O"},"to":{"x":3,"y":0},"label":"i","color":"#ef4444"},{"type":"vector","from":{"x":0,"y":0},"to":{"x":0,"y":3},"label":"j","color":"#10b981"},{"type":"vector","from":{"x":0,"y":0},"to":{"x":1.5,"y":1.5},"label":"k","color":"#f59e0b"},{"type":"segment","x1":0,"y1":0,"x2":2,"y2":1,"color":"#6366f1","label":"OA"},{"type":"point","cx":2,"cy":1,"label":"A(2,1,0)"}]}]

FORMAT 4 — PLAN COMPLEXE :
[GRAPH: {"type":"geometry","title":"Plan complexe","shapes":[{"type":"axes","step":1},{"type":"grid","step":1},{"type":"point","cx":2,"cy":3,"label":"M(z1)","color":"#6366f1"},{"type":"point","cx":-1,"cy":2,"label":"N(z2)","color":"#10b981"},{"type":"segment","x1":0,"y1":0,"x2":2,"y2":3,"color":"#6366f1","dashed":true}]}]

RÈGLES ABSOLUES :
- Le graphique va dans le champ "graph" SÉPARÉ — PAS dans "statement" — pour éviter les guillemets imbriqués
- Valeur de "graph" : une string "[GRAPH: {JSON_VALIDE}]" OU null si pas de graphique
- INTERDIT dans shapes : "line3d", "point3d", "segment3d" — utiliser "segment","point","vector","line"
- Expressions JS : JAMAIS x^2 ou x^3 — TOUJOURS x*x ou x*x*x | JAMAIS 2x — TOUJOURS 2*x
- Dans "graph", les guillemets du JSON interne DOIVENT être échappés : \"type\":\"function\"
- Exercice fonction/analyse : champ "graph" OBLIGATOIRE avec la courbe
- Exercice géométrie : champ "graph" OBLIGATOIRE avec la figure complète
- Exercice complexes : champ "graph" avec le plan complexe et les affixes
- Dans "statement", écrire : "Soit f la fonction représentée ci-dessous. [voir graphique] 1) ..."

Réponds EXACTEMENT avec ce JSON (aucun texte avant ou après) :
{
  "title": "${section} — Simulation IA Variante ${idx+1}",
  "section": "${section}",
  "duration": 180,
  "totalPoints": ${totalPts},
  "exercises": [
    {
      "num": 1,
      "title": "Exercice 1 — [Thème précis]",
      "theme": "[Thème]",
      "points": 6,
      "graph": "[GRAPH: {JSON_GRAPHIQUE_ICI}] ou null si pas de graphique",
      "statement": "Énoncé SANS le bloc [GRAPH]. Toutes les données, sous-parties 1), 2), 3). Minimum 140 mots. Écrire juste avant les questions : voir graphique ci-dessus."
    },
    {
      "num": 2,
      "title": "Exercice 2 — [Thème précis]",
      "theme": "[Thème]",
      "points": 6,
      "graph": "[GRAPH: {JSON_GRAPHIQUE_ICI}] ou null si pas de graphique",
      "statement": "Énoncé SANS le bloc [GRAPH]. Minimum 120 mots."
    },
    {
      "num": 3,
      "title": "Exercice 3 — [Thème précis]",
      "theme": "[Thème]",
      "points": 4,
      "graph": null,
      "statement": "Énoncé complet. Minimum 80 mots."
    },
    {
      "num": 4,
      "title": "Exercice 4 — [Thème précis]",
      "theme": "[Thème]",
      "points": 4,
      "graph": null,
      "statement": "Énoncé complet. Minimum 80 mots."
    }
  ]
}`

  const raw = await askClaude(prompt, system, 5000)
  const parsed = parseJSON<Omit<GeneratedExam,'id'|'index'>>(raw, {
    title:`${section} — Simulation Variante ${idx+1}`,
    section, duration:180, totalPoints:totalPts,
    exercises:[{num:1,title:'Exercice 1',theme:'Analyse',points:20,statement:'Erreur de génération — veuillez réessayer.'}]
  })
  return { ...parsed, id:`exam-${idx}-${Date.now()}`, index:idx }
}

// ── Génération correction ─────────────────────────────────────────
async function correctOneExercise(
  exercise: GeneratedExam['exercises'][number],
  totalPoints: number,
  studentWork: string,
  examTitle: string
): Promise<string> {
  const system = `Tu es un professeur correcteur du Baccalaureat tunisien, specialiste en mathematiques.
Tu rediges des corrections EXHAUSTIVES, ULTRA-DETAILLEES et PEDAGOGIQUES.
Ne resume JAMAIS une etape. Developpe TOUT. L'eleve doit comprendre sans autre ressource.
Tu as suffisamment de tokens pour tout rediger. Ne t'arrete JAMAIS avant la fin. Ne dis JAMAIS "je vais resumer" ou "et ainsi de suite". Redige CHAQUE etape jusqu'au bout sans exception.
Utilise markdown : ### pour les parties, **gras** pour les resultats, > pour les points importants.

GRAPHIQUES MATHEMATIQUES — INSTRUCTIONS COMPLETES :

═══ TYPE 1 : COURBES DE FONCTIONS (Plotly) ═══
[GRAPH: {"type":"function","expressions":["2*x*x*x - 6*x*x + 3*x + 1","(6*x*x - 12*x + 3)/3"],"xMin":-2,"xMax":4,"labels":["f(x)","g(x)"],"title":"Courbes","xLabel":"x","yLabel":"y"}]
RÈGLES JS : JAMAIS x^2 → x*x | JAMAIS x^3 → x*x*x | JAMAIS 2x → 2*x | fractions : (num)/(den)

═══ TYPE 2 : FIGURES GÉOMÉTRIQUES (SVG) ═══
[GRAPH: {"type":"geometry","title":"Titre","shapes":[...]}]

FORMES DISPONIBLES (shapes) — exemples :

**Cercle** {"type":"circle","cx":0,"cy":0,"r":3,"label":"C","color":"#6366f1","fill":"#6366f120"}
**Ellipse** {"type":"ellipse","cx":0,"cy":0,"rx":4,"ry":2,"label":"E"}
**Demi-cercle** {"type":"semicircle","cx":0,"cy":0,"r":3,"startAngle":0,"endAngle":180}
**Rectangle** {"type":"rect","x":0,"y":0,"w":4,"h":2,"label":"ABCD","fill":"#10b98120"}
**Carré** {"type":"square","x":0,"y":0,"w":3,"label":"ABCD"}
**Triangle** {"type":"triangle","points":[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":2,"y":3,"label":"C"}],"showRight":false,"fill":"#6366f120"}
**Polygone** {"type":"polygon","points":[{"x":0,"y":0},{"x":3,"y":0},{"x":4,"y":2},{"x":1,"y":2}]}
**Segment** {"type":"segment","x1":0,"y1":0,"x2":4,"y2":0,"label":"AB"}
**Ligne droite** {"type":"line","x1":0,"y1":0,"x2":1,"y2":2,"label":"d","dashed":true}
**Vecteur** {"type":"vector","from":{"x":0,"y":0,"label":"A"},"to":{"x":3,"y":2,"label":"B"},"label":"u⃗"}
**Angle** {"type":"angle","vertex":{"x":1,"y":0,"label":"B"},"p1":{"x":0,"y":0,"label":"A"},"p2":{"x":1,"y":2,"label":"C"},"value":"60°"}
**Angle droit** {"type":"angle","vertex":{"x":0,"y":0},"p1":{"x":1,"y":0},"p2":{"x":0,"y":1},"showRight":true}
**Arc** {"type":"arc","cx":0,"cy":0,"r":2,"startAngle":0,"endAngle":120}
**Point** {"type":"point","cx":2,"cy":3,"label":"M"}
**Médiane** {"type":"median","points":[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":2,"y":3,"label":"C"}],"targetVertex":2}
**Hauteur** {"type":"altitude","points":[{"x":0,"y":0},{"x":4,"y":0},{"x":1,"y":3}],"targetVertex":2}
**Bissectrice** {"type":"bisector","vertex":{"x":1,"y":0},"p1":{"x":0,"y":0},"p2":{"x":1,"y":2}}
**Cote/dimension** {"type":"dimension","x1":0,"y1":0,"x2":4,"y2":0,"label":"4 cm","color":"#f59e0b"}
**Axes** {"type":"axes","step":1}
**Grille** {"type":"grid","step":1}
**Fonction dans repère géo** {"type":"function_on_geo","expr":"x*x - 2","label":"y=x²-2"}

COMBINAISON (plusieurs formes dans un seul graphique) :
[GRAPH: {"type":"geometry","title":"Triangle rectangle ABC","shapes":[
  {"type":"axes","step":1},
  {"type":"grid","step":1},
  {"type":"triangle","points":[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":0,"y":3,"label":"C"}],"fill":"#6366f120"},
  {"type":"angle","vertex":{"x":0,"y":0},"p1":{"x":4,"y":0},"p2":{"x":0,"y":3},"showRight":true},
  {"type":"altitude","points":[{"x":0,"y":0},{"x":4,"y":0},{"x":0,"y":3}],"targetVertex":2,"label":"h"},
  {"type":"dimension","x1":0,"y1":0,"x2":4,"y2":0,"label":"4","color":"#f59e0b"},
  {"type":"dimension","x1":0,"y1":0,"x2":0,"y2":3,"label":"3","color":"#10b981"}
]}]

FORMES DISPONIBLES dans shapes : circle, triangle, polygon, segment, line, vector, angle, arc, point, axes, grid, dimension, median, altitude, bisector, function_on_geo
STRICTEMENT INTERDIT dans shapes : "line3d", "point3d", "segment3d" — toujours projeter en 2D

QUAND UTILISER (OBLIGATOIRE dans la correction) :
- Étude de fonction (limites, variations, extrema, asymptotes) → [GRAPH: type "function"] courbe + points remarquables
- Géométrie plane (triangle, cercle, quadrilatère) → [GRAPH: type "geometry"] figure complète avec labels
- Géométrie espace → [GRAPH: type "geometry"] projection 2D oblique avec "segment","point","vector" uniquement
- Complexes → [GRAPH: type "geometry"] plan complexe avec points affixes nommés
- Suites → [GRAPH: type "function"] courbe u_n + droite horizontale de la limite
- Probabilités (loi binomiale/normale) → [GRAPH: type "function"] courbe de densité ou diagramme
- Place le [GRAPH: ...] juste APRÈS l'explication théorique, AVANT les calculs
- Exercice mixte → graphique "function" ET graphique "geometry" séparés`

  const withWork = studentWork.trim().length > 10

  // Détecter si l'élève a soumis des images (photos de copie)
  const hasImages = studentWork.includes('[Image jointe :')
  const imageNote = hasImages
    ? "\n\nNOTE : L'élève a soumis des photos de sa copie papier. Traite sa réponse comme si tu avais vu sa copie (tu ne peux pas réellement voir les images mais utilise le contexte disponible pour une correction personnalisée)."
    : ''

  const prompt = withWork
    ? `EXAMEN : ${examTitle}
EXERCICE A CORRIGER : ${exercise.title} — ${exercise.points} points sur ${totalPoints}

ENONCE COMPLET :
${exercise.statement}

REPONSE DE L'ELEVE :
${studentWork}${imageNote}

Redige la correction COMPLETE de cet exercice UNIQUEMENT. Structure OBLIGATOIRE :

## ${exercise.title} — Correction detaillee (${exercise.points} pts)

[Pour CHAQUE sous-question numerotee dans l'enonce :]

### Question X —
**Concept utilise :** [Theoreme / formule / methode — et POURQUOI on l'applique ici specifiquement]

**Resolution etape par etape :**
- Etape 1 : [Action precise] → [Resultat intermediaire avec calcul visible]
- Etape 2 : [Action precise] → [Resultat intermediaire avec calcul visible]
- Etape 3 : [Action precise] → [Resultat final]

> **Resultat :** [Reponse finale encadree]

**Bareme question X :** [X] pts
- [X] pt : [pour quoi exactement]
- [X] pt : [pour quoi exactement]

**Analyse reponse eleve :**
✅ Correct : [ce que l'eleve a bien fait]
❌ Incorrect : [ce qui est faux ou manquant, avec explication du pourquoi]
💡 Conseil : [comment corriger cette erreur specifique]

**Piege classique :** [L'erreur la plus frequente sur ce type de question et pourquoi elle est fausse]

---

> **Bilan ${exercise.title} :** [X]/${exercise.points} pts — [commentaire pedagogique global]`
    : `EXAMEN : ${examTitle}
EXERCICE : ${exercise.title} — ${exercise.points} points sur ${totalPoints}

ENONCE COMPLET :
${exercise.statement}

Redige la correction COMPLETE et EXHAUSTIVE de cet exercice UNIQUEMENT. Structure OBLIGATOIRE :

## ${exercise.title} — Correction complete (${exercise.points} pts)

[Pour CHAQUE sous-question numerotee dans l'enonce :]

### Question X —
**Concept et methode :** [Theoreme / formule appliquee — expliquer POURQUOI on choisit cette methode et pas une autre. Donner le theoreme exact avec ses conditions d'application.]

**Demonstration complete :**
- Etape 1 : [Action + justification theorique] → [Calcul complet visible] = [Resultat]
- Etape 2 : [Action + justification] → [Calcul] = [Resultat]
- Etape 3 : ... (continuer jusqu'au resultat final, AUCUNE etape sautee)

> **Resultat :** [Reponse finale]

**Bareme :** [X] pts — [Detail : X pt pour la demarche, X pt pour le calcul, X pt pour la conclusion]

**Point pedagogique important :** [Generalisation, remarque de methode, variante possible]

**Erreur classique :** [Piege frequent sur CE TYPE PRECIS de question — explication detaillee de pourquoi c'est faux]

---

> **A retenir pour ${exercise.title} :** [2-3 formules ou methodes cles a memoriser absolument]`

  return askClaude(prompt, system, 8000)
}

// Genere la correction exercice par exercice et appelle onProgress a chaque etape
// Corrige UN SEUL exercice (appelé à la demande depuis PhaseCorrection)
async function correctSingleExercise(
  exam: GeneratedExam,
  exerciseIndex: number,
  studentWork: string
): Promise<string> {
  const ex = exam.exercises[exerciseIndex]
  if (!ex) return ''
  return correctOneExercise(ex, exam.totalPoints, studentWork, exam.title)
}

// ── Analyse UN exercice immédiatement après correction ───────────
async function analyzeOneExerciseSim(
  exercise: { title:string; theme:string; points:number; statement:string },
  studentAnswer: string,
  correction: string,
  exIdx: number
): Promise<AnalysisResult> {
  const system = `Tu es un expert en pédagogie mathématique. Analyse UN exercice et génère une remédiation ciblée. RÉPONDS UNIQUEMENT EN JSON VALIDE.`
  const prompt = `Analyse cet exercice de simulation Bac.

EXERCICE ${exIdx+1} : ${exercise.title} (${exercise.theme}, ${exercise.points} pts)
${exercise.statement.substring(0,250)}

RÉPONSE ÉLÈVE : ${studentAnswer||('(Aucune réponse)')}
CORRECTION : ${correction.substring(0,800)}

JSON requis :
{
  "estimatedScore": [0 à ${exercise.points}],
  "maxScore": ${exercise.points},
  "weakAreas": [{"theme":"${exercise.theme}","severity":"critical|moderate|good","description":"[Analyse précise]","priority":1}],
  "strengths": ["[Ce qui est bien]"],
  "globalAdvice": ["[Conseil ciblé]","[Méthode à retenir]"],
  "remediationExercises": [
    {"id":"remSim${exIdx}-1","theme":"${exercise.theme}","difficulty":"introductory","objective":"[Consolider la lacune]","statement":"Mini-exercice ciblé. 2-3 sous-questions. Minimum 60 mots.","hint":"[Indice]","officialCorrection":"[Correction complète]"},
    {"id":"remSim${exIdx}-2","theme":"${exercise.theme}","difficulty":"standard","objective":"[Approfondir]","statement":"Exercice standard. Minimum 60 mots.","hint":"[Méthode]","officialCorrection":"[Correction]"}
  ]
}`
  const raw = await askClaude(prompt, system, 3000)
  return parseJSON<AnalysisResult>(raw, {
    estimatedScore:0, maxScore:exercise.points,
    weakAreas:[{theme:exercise.theme,severity:'moderate',description:'Analyse indisponible',priority:1}],
    strengths:[], globalAdvice:['Retravailler ce chapitre'],
    remediationExercises:[]
  })
}

// ── Analyse faiblesses ────────────────────────────────────────────
async function analyzeStudentWork(
  exam: GeneratedExam, studentWork: string, correction: string
): Promise<AnalysisResult> {
  const system = `Tu es un expert en pédagogie mathématique et remédiation scolaire.
Tu analyses les travaux d'élèves et construis un plan d'amélioration personnalisé.
RÉPONDS UNIQUEMENT EN JSON VALIDE.`

  const prompt = `Analyse ce travail d'élève et génère un rapport de remédiation complet.

SUJET :
${exam.exercises.map(e=>`${e.title} (${e.theme}, ${e.points}pts) : ${e.statement.substring(0,200)}`).join('\n')}

TRAVAIL ÉLÈVE :
${studentWork || '(Aucune réponse fournie — analyser comme un élève non préparé)'}

CORRECTION :
${correction.substring(0,1200)}

Génère ce JSON :
{
  "estimatedScore": [entre 0 et ${exam.totalPoints}, estimation réaliste],
  "maxScore": ${exam.totalPoints},
  "weakAreas": [
    {
      "theme": "[Thème précis ex: Suites récurrentes]",
      "severity": "critical|moderate|good",
      "description": "[Explication précise de la lacune ou de la maîtrise]",
      "priority": [1=très urgent, 2=important, 3=secondaire]
    }
  ],
  "strengths": ["[Point fort 1]", "[Point fort 2]"],
  "globalAdvice": ["[Conseil pratique et actionnable 1]", "[Conseil 2]", "[Conseil 3]"],
  "remediationExercises": [
    {
      "id": "rem-1",
      "theme": "[Thème à travailler en priorité]",
      "difficulty": "introductory|standard|advanced",
      "objective": "[Ce que l'élève va acquérir en faisant cet exercice]",
      "statement": "Mini-exercice complet et original avec données précises. 3 à 4 sous-questions. Minimum 80 mots.",
      "hint": "Indication méthodologique pour commencer sans donner la réponse",
      "officialCorrection": "Correction complète et développée, étape par étape"
    },
    { "id": "rem-2", "theme": "[2ème thème faible]", "difficulty": "standard", "objective": "...", "statement": "...", "hint": "...", "officialCorrection": "..." },
    { "id": "rem-3", "theme": "[3ème thème faible]", "difficulty": "introductory", "objective": "...", "statement": "...", "hint": "...", "officialCorrection": "..." }
  ]
}`

  const raw = await askClaude(prompt, system, 5000)
  return parseJSON<AnalysisResult>(raw, {
    estimatedScore:0, maxScore:exam.totalPoints,
    weakAreas:[{theme:'Général',severity:'moderate',description:'Analyse non disponible',priority:1}],
    strengths:[], globalAdvice:['Continuer à s\'entraîner régulièrement'],
    remediationExercises:[]
  })
}

// ── Correction exercice de remédiation ────────────────────────────
async function correctRemediationExercise(
  exercise: AnalysisResult['remediationExercises'][number],
  studentAnswer: string
): Promise<string> {
  const system = `Tu es un tuteur mathématiques bienveillant mais exigeant.
Tu corriges les réponses d'élèves sur des exercices de remédiation.
Sois précis, encourageant, et identifie exactement ce qui manque.`

  return askClaude(
    `EXERCICE DE REMÉDIATION — ${exercise.theme}\nObjectif : ${exercise.objective}\n\nÉnoncé :\n${exercise.statement}\n\nRéponse de l'élève :\n${studentAnswer || '(Aucune réponse)'}\n\nCorrection officielle :\n${exercise.officialCorrection}\n\nFournis :\n## Évaluation de la réponse\n[Ce qui est correct, ce qui est incomplet, ce qui est faux]\n\n## Correction commentée\n[Correction étape par étape avec explications]\n\n## Ce qu'il faut retenir\n[Règle, formule ou méthode clé — max 3 points essentiels]\n\n## Prochain pas\n[Une action concrète pour continuer à progresser sur ce thème]`,
    system, 2000
  )
}

// ═══════════════════════════════════════════════════════════════════
// COMPOSANTS VISUELS
// ═══════════════════════════════════════════════════════════════════

// ── Estimation rapide de la note avant correction ────────────────
async function estimateGrade(exam: GeneratedExam, studentWork: string): Promise<{
  score: number; maxScore: number; comment: string
  breakdown: {title:string;pts:number;max:number;reason:string}[]
}> {
  const hasWork = studentWork.trim().length > 10
  const system = `Tu es un correcteur du Baccalaureat tunisien. Tu donnes une note RAPIDE et JUSTE.
Reponds UNIQUEMENT en JSON valide, sans markdown, sans explication hors JSON.`

  const exList = exam.exercises.map(e=>`${e.title} (${e.points} pts): ${e.statement.slice(0,180)}`).join(' | ')
  const prompt = hasWork
    ? `Estime la note de cet eleve sur ${exam.totalPoints} points. SUJET: ${exList} REPONSE: ${studentWork.slice(0,1200)} JSON: {"score":[entier 0-${exam.totalPoints}],"maxScore":${exam.totalPoints},"comment":"[phrase encourageante 1-2 phrases]","breakdown":[{"title":"[ex]","pts":[accordes],"max":[max],"reason":"[raison]"}]}`
    : `{"score":0,"maxScore":${exam.totalPoints},"comment":"Aucune reponse soumise. La correction complete va tout vous apprendre !","breakdown":${JSON.stringify(exam.exercises.map(e=>({title:e.title,pts:0,max:e.points,reason:'Non repondu'})))}}`

  const raw = await askClaude(prompt, system, 800)
  try {
    return JSON.parse(raw.replace(/\`\`\`json|\`\`\`/g,'').trim())
  } catch {
    return {
      score: Math.round(exam.totalPoints * 0.5),
      maxScore: exam.totalPoints,
      comment: 'Estimation calculee automatiquement.',
      breakdown: exam.exercises.map(e=>({title:e.title,pts:Math.round(e.points*0.5),max:e.points,reason:'Evaluation automatique'}))
    }
  }
}

// ── Timeline de phases ────────────────────────────────────────────
const PHASES_META: {key:Phase; label:string; icon:string}[] = [
  {key:'select',      label:'Source',     icon:'📂'},
  {key:'generating',  label:'Génération', icon:'🧠'},
  {key:'choose-exam', label:'Sélection',  icon:'📋'},
  {key:'exam',        label:'Examen',     icon:'✍️'},
  {key:'correction',  label:'Correction', icon:'✅'},
  {key:'analysis',    label:'Analyse',    icon:'📊'},
]
const DISPLAY_PHASES = ['select','choose-exam','exam','correction','analysis'] as Phase[]

function PhaseTimeline({ phase }: { phase: Phase }) {
  const current = DISPLAY_PHASES.indexOf(phase === 'generating' ? 'choose-exam' :
    phase === 'correcting' ? 'correction' : phase === 'analysing' ? 'analysis' : phase)
  return (
    <div style={{display:'flex',alignItems:'center',marginBottom:32,gap:0}}>
      {DISPLAY_PHASES.map((p,i)=>{
        const meta = PHASES_META.find(m=>m.key===p)!
        const done = i < current, active = i === current
        return (
          <div key={p} style={{display:'flex',alignItems:'center',flex:i<DISPLAY_PHASES.length-1?1:'none'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5,flexShrink:0}}>
              <div style={{
                width:40,height:40,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
                background: active ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : done ? '#10b981' : 'rgba(255,255,255,0.06)',
                border: active ? '2px solid #8b5cf6' : done ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.12)',
                fontSize:16, fontWeight:700, color:'white',
                boxShadow: active ? '0 0 20px rgba(99,102,241,0.6)' : 'none',
                transition:'all 0.4s',
              }}>{done ? '✓' : meta.icon}</div>
              <span style={{fontSize:10,fontWeight:600,color:active?'#a5b4fc':done?'#6ee7b7':'rgba(255,255,255,0.35)',letterSpacing:'0.04em',whiteSpace:'nowrap'}}>{meta.label}</span>
            </div>
            {i < DISPLAY_PHASES.length-1 && (
              <div style={{flex:1,height:1,background:done?'#10b981':'rgba(255,255,255,0.1)',margin:'0 6px',marginBottom:22,transition:'background 0.4s'}}/>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Chargement dynamique de scripts externes ─────────────────────
function useScript(src: string) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`)) { setLoaded(true); return }
    const s = document.createElement('script')
    s.src = src; s.async = true
    s.onload = () => setLoaded(true)
    document.head.appendChild(s)
  }, [src])
  return loaded
}

// ── Sanitize expression : corrige les erreurs courantes de l'IA ──────
function sanitizeExpr(expr: string): string {
  let e = expr
    .replace(/x\^4/g, 'x*x*x*x')
    .replace(/x\^3/g, 'x*x*x')
    .replace(/x\^2/g, 'x*x')
    .replace(/x\^(-?\d+)/g, (_, n) => `Math.pow(x,${n})`)
    .replace(/\(([^)]+)\)\^(\d+)/g, (_, base, exp) => `Math.pow(${base},${exp})`)
    .replace(/([a-zA-Z0-9_.]+)\^(\d+)/g, (_, base, exp) => `Math.pow(${base},${exp})`)
    .replace(/(\d)(x)/g, '$1*$2')
    .replace(/\bpi\b/gi, 'Math.PI')
    .replace(/\u03c0/g, 'Math.PI')
  // Préfixer les fonctions maths SEULEMENT si pas déjà préfixées par Math.
  // lookbehind négatif sur alphanumérique/point → évite Math.exp → Math.Math.exp
  const mathFns: [RegExp, string][] = [
    [/(?<![a-zA-Z0-9_.])ln\s*\(/g,   'Math.log('],
    [/(?<![a-zA-Z0-9_.])log\s*\(/g,  'Math.log10('],
    [/(?<![a-zA-Z0-9_.])sin\s*\(/g,  'Math.sin('],
    [/(?<![a-zA-Z0-9_.])cos\s*\(/g,  'Math.cos('],
    [/(?<![a-zA-Z0-9_.])tan\s*\(/g,  'Math.tan('],
    [/(?<![a-zA-Z0-9_.])sqrt\s*\(/g, 'Math.sqrt('],
    [/(?<![a-zA-Z0-9_.])abs\s*\(/g,  'Math.abs('],
    [/(?<![a-zA-Z0-9_.])exp\s*\(/g,  'Math.exp('],
  ]
  for (const [re2, repl] of mathFns) { e = e.replace(re2, repl) }
  // e isolé → Math.E (pas suivi ni précédé de lettre/chiffre/point/()
  e = e.replace(/(?<![a-zA-Z0-9_.])e(?![a-zA-Z0-9_(])/g, 'Math.E')
  return e
}


// ── Composant graphique mathématique (Plotly) ─────────────────────
interface GraphSpec {
  type: 'function' | 'parametric' | 'points' | 'probability'
  expressions: string[]   // ex: ["Math.sin(x)", "x*x - 2"]
  xMin?: number; xMax?: number
  labels?: string[]
  title?: string
  xLabel?: string; yLabel?: string
  points?: {x:number;y:number;label?:string}[]
}

function MathGraph({ spec }: { spec: GraphSpec; [key: string]: any }) {
  const divRef = useRef<HTMLDivElement>(null)
  const plotlyLoaded = useScript('https://cdn.plot.ly/plotly-2.27.0.min.js')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!plotlyLoaded || !divRef.current) return
    try {
      const xMin = spec.xMin ?? -5
      const xMax = spec.xMax ?? 5
      const N = 400
      const dx = (xMax - xMin) / N
      const traces: any[] = []
      const colors = ['#6366f1','#10b981','#f59e0b','#ec4899','#06b6d4']

      if (spec.type === 'function' || spec.type === 'parametric') {
        spec.expressions.forEach((expr, i) => {
          const xs: number[] = [], ys: number[] = []
          for (let j = 0; j <= N; j++) {
            const x = xMin + j * dx
            try {
              // Sanitize + évaluation sécurisée
              const safeExpr = sanitizeExpr(expr)
              const safeFn = new Function('x', 'Math',
                `"use strict"; try { return (${safeExpr}); } catch(e) { return null; }`)
              const y = safeFn(x, Math)
              if (y !== null && isFinite(y) && Math.abs(y) < 1e6) {
                xs.push(x); ys.push(y)
              } else {
                xs.push(x); ys.push(NaN)
              }
            } catch { xs.push(x); ys.push(NaN) }
          }
          traces.push({
            x: xs, y: ys, mode: 'lines', type: 'scatter',
            name: spec.labels?.[i] || expr,
            line: { color: colors[i % colors.length], width: 2.5 }
          })
        })
      }

      if (spec.points && spec.points.length > 0) {
        traces.push({
          x: spec.points.map(p=>p.x),
          y: spec.points.map(p=>p.y),
          mode: 'markers+text',
          type: 'scatter',
          text: spec.points.map(p=>p.label||''),
          textposition: 'top center',
          marker: { color: '#f59e0b', size: 8, symbol: 'circle' },
          name: 'Points remarquables'
        })
      }

      // Axes
      const layout = {
        title: { text: spec.title || '', font: { color: '#e2e8f0', size: 13 } },
        paper_bgcolor: 'rgba(15,15,30,0.9)',
        plot_bgcolor: 'rgba(20,20,40,0.8)',
        font: { color: '#a0aec0', size: 11 },
        xaxis: {
          title: spec.xLabel || 'x',
          gridcolor: 'rgba(255,255,255,0.08)',
          zerolinecolor: 'rgba(255,255,255,0.25)',
          zerolinewidth: 1.5,
          tickcolor: 'rgba(255,255,255,0.3)',
          range: [xMin, xMax],
        },
        yaxis: {
          title: spec.yLabel || 'y',
          gridcolor: 'rgba(255,255,255,0.08)',
          zerolinecolor: 'rgba(255,255,255,0.25)',
          zerolinewidth: 1.5,
          tickcolor: 'rgba(255,255,255,0.3)',
        },
        legend: { bgcolor: 'rgba(0,0,0,0.4)', bordercolor: 'rgba(255,255,255,0.1)', borderwidth:1 },
        margin: { t:40, b:50, l:55, r:20 },
        height: 300,
      }

      const config = { responsive: true, displayModeBar: false }
      ;(window as any).Plotly.newPlot(divRef.current, traces, layout, config)
    } catch(e: any) {
      console.error('MathGraph error:', e, 'spec:', spec)
      setError('Tracé impossible — expression : ' + (spec.expressions?.[0] || '?'))
    }
  }, [plotlyLoaded, spec])

  if (!plotlyLoaded) return (
    <div style={{height:80,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'rgba(255,255,255,0.3)'}}>
      Chargement du graphique...
    </div>
  )

  return (
    <div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(99,102,241,0.2)',marginTop:12,marginBottom:12}}>
      {error ? (
        <div style={{padding:16,fontSize:12,color:'#fca5a5'}}>{error}</div>
      ) : (
        <div ref={divRef}/>
      )}
    </div>
  )
}

// ── Extraction et rendu des graphiques depuis le texte IA ──────────
// L'IA peut insérer des specs de graphique sous la forme:
// [GRAPH: {"type":"function","expressions":["Math.sin(x)"],"title":"..."}]


// ══════════════════════════════════════════════════════════════════════
// MOTEUR GÉOMÉTRIQUE SVG COMPLET
// Formes : circle, ellipse, rect, square, triangle, polygon, line, segment,
//          vector, angle, arc, semicircle, point, axes, grid,
//          dimension (cote), median, altitude, bisector, function_on_geo
// ══════════════════════════════════════════════════════════════════════
interface GeoPoint { x: number; y: number; label?: string; color?: string }
interface GeoShape {
  type: 'circle' | 'ellipse' | 'rect' | 'square' | 'triangle' | 'line' | 'segment'
       | 'angle' | 'polygon' | 'vector' | 'arc' | 'semicircle'
       | 'point' | 'axes' | 'grid' | 'dimension' | 'median' | 'altitude'
       | 'bisector' | 'function_on_geo'
  // Cercle / Ellipse / Arc / Demi-cercle
  cx?: number; cy?: number; r?: number; rx?: number; ry?: number
  startAngle?: number; endAngle?: number
  // Rect / Carré
  x?: number; y?: number; w?: number; h?: number
  // Ligne / Segment / Vecteur
  x1?: number; y1?: number; x2?: number; y2?: number
  from?: GeoPoint; to?: GeoPoint
  // Polygone / Triangle
  points?: GeoPoint[]
  // Angle
  vertex?: GeoPoint; p1?: GeoPoint; p2?: GeoPoint
  showRight?: boolean; value?: string
  // Dimension (cote)
  offset?: number   // distance perpendiculaire de la cote en unités coord
  // Médiane / Hauteur / Bissectrice — triangle via points[]
  targetVertex?: number  // index du sommet cible (0,1,2)
  // Fonction tracée sur repère géo
  expr?: string
  // Grille / Axes
  step?: number; xMin?: number; xMax?: number; yMin?: number; yMax?: number
  // Styles
  label?: string; color?: string; dashed?: boolean; fill?: string
  strokeWidth?: number; fontSize?: number
}
interface GeoSpec {
  type: 'geometry'
  title?: string
  width?: number; height?: number
  xMin?: number; xMax?: number; yMin?: number; yMax?: number
  shapes: GeoShape[]
  labels?: { x: number; y: number; text: string; color?: string; size?: number }[]
}

function makeTx(xMin: number, xMax: number, yMin: number, yMax: number, W: number, H: number) {
  const pad = 44
  const uw = W - 2*pad; const uh = H - 2*pad
  const tx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * uw
  const ty = (y: number) => H - pad - ((y - yMin) / (yMax - yMin)) * uh
  const scaleX = (d: number) => (d / (xMax - xMin)) * uw
  const scaleY = (d: number) => (d / (yMax - yMin)) * uh
  return { tx, ty, scaleX, scaleY, pad, uw, uh }
}

function RightAngleMark({ vertex, p1, p2, tx, ty, color }: {
  vertex: GeoPoint; p1: GeoPoint; p2: GeoPoint
  tx: (x:number)=>number; ty: (y:number)=>number; color: string
}) {
  const s = 10
  const vx=tx(vertex.x); const vy=ty(vertex.y)
  const d1x=tx(p1.x)-vx; const d1y=ty(p1.y)-vy; const l1=Math.sqrt(d1x*d1x+d1y*d1y)||1
  const d2x=tx(p2.x)-vx; const d2y=ty(p2.y)-vy; const l2=Math.sqrt(d2x*d2x+d2y*d2y)||1
  const q1x=vx+(d1x/l1)*s; const q1y=vy+(d1y/l1)*s
  const q2x=vx+(d2x/l2)*s; const q2y=vy+(d2y/l2)*s
  const px=q1x+(d2x/l2)*s; const py=q1y+(d2y/l2)*s
  return <path d={`M${q1x},${q1y} L${px},${py} L${q2x},${q2y}`} stroke={color} strokeWidth="1.5" fill="none"/>
}

function AngleArc({ vertex, p1, p2, tx, ty, color, value }: {
  vertex: GeoPoint; p1: GeoPoint; p2: GeoPoint
  tx: (x:number)=>number; ty: (y:number)=>number; color: string; value?: string
}) {
  const vx=tx(vertex.x); const vy=ty(vertex.y)
  const a1=Math.atan2(ty(p1.y)-vy, tx(p1.x)-vx)
  const a2=Math.atan2(ty(p2.y)-vy, tx(p2.x)-vx)
  const R=22
  const x1=vx+R*Math.cos(a1); const y1=vy+R*Math.sin(a1)
  const x2=vx+R*Math.cos(a2); const y2=vy+R*Math.sin(a2)
  let da=a2-a1; if(da<0) da+=2*Math.PI
  const laf=da>Math.PI?1:0
  const ma=(a1+a2)/2; const mx=vx+(R+12)*Math.cos(ma); const my=vy+(R+12)*Math.sin(ma)
  return <>
    <path d={`M${x1},${y1} A${R},${R} 0 ${laf},1 ${x2},${y2}`} stroke={color} strokeWidth="1.5" fill="none"/>
    {value&&<text x={mx} y={my} fontSize="11" fill={color} textAnchor="middle" dominantBaseline="middle">{value}</text>}
  </>
}

function GeoArrow({ x1, y1, x2, y2, color, sw=2 }: { x1:number;y1:number;x2:number;y2:number;color:string;sw?:number }) {
  const angle=Math.atan2(y2-y1, x2-x1)
  const a=9; const b=Math.PI/6
  return <>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={sw}/>
    <polygon points={`${x2},${y2} ${x2-a*Math.cos(angle-b)},${y2-a*Math.sin(angle-b)} ${x2-a*Math.cos(angle+b)},${y2-a*Math.sin(angle+b)}`} fill={color}/>
  </>
}

function DimensionLine({ x1,y1,x2,y2,label,color,offset=16 }: {
  x1:number;y1:number;x2:number;y2:number;label?:string;color:string;offset?:number
}) {
  const dx=x2-x1; const dy=y2-y1; const len=Math.sqrt(dx*dx+dy*dy)||1
  const nx=-dy/len*offset; const ny=dx/len*offset
  const ax=x1+nx; const ay=y1+ny; const bx=x2+nx; const by=y2+ny
  const tick=6
  return <>
    <line x1={x1+nx*0.3} y1={y1+ny*0.3} x2={ax} y2={ay} stroke={color} strokeWidth="1" strokeDasharray="3,3"/>
    <line x1={x2+nx*0.3} y1={y2+ny*0.3} x2={bx} y2={by} stroke={color} strokeWidth="1" strokeDasharray="3,3"/>
    <line x1={ax-dy/len*tick} y1={ay+dx/len*tick} x2={ax+dy/len*tick} y2={ay-dx/len*tick} stroke={color} strokeWidth="1.5"/>
    <line x1={bx-dy/len*tick} y1={by+dx/len*tick} x2={bx+dy/len*tick} y2={by-dx/len*tick} stroke={color} strokeWidth="1.5"/>
    <line x1={ax} y1={ay} x2={bx} y2={by} stroke={color} strokeWidth="1.5"/>
    {label&&<text x={(ax+bx)/2+ny*0.6} y={(ay+by)/2-nx*0.6} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={color} fontWeight="600">{label}</text>}
  </>
}

function GeoGraph({ spec }: { spec: GeoSpec }) {
  const W=spec.width||500; const H=spec.height||360
  const COLORS=['#6366f1','#10b981','#f59e0b','#ec4899','#06b6d4','#a78bfa','#34d399','#fb923c']
  let ci=0
  const nc=(ov?: string)=>ov||COLORS[ci++%COLORS.length]

  // Auto-bornes à partir des formes
  const ax: number[]=[]; const ay: number[]=[]
  spec.shapes.forEach(s=>{
    if(s.cx!==undefined){ax.push(s.cx-(s.rx||s.r||0),s.cx+(s.rx||s.r||0));ay.push((s.cy||0)-(s.ry||s.r||0),(s.cy||0)+(s.ry||s.r||0))}
    if(s.x!==undefined&&s.w!==undefined){ax.push(s.x,s.x+s.w);ay.push(s.y||0,(s.y||0)+(s.h||s.w))}
    if(s.x1!==undefined){ax.push(s.x1,s.x2||0);ay.push(s.y1||0,s.y2||0)}
    if(s.points)s.points.forEach(p=>{ax.push(p.x);ay.push(p.y)})
    if(s.from){ax.push(s.from.x);ay.push(s.from.y)}
    if(s.to){ax.push(s.to.x);ay.push(s.to.y)}
    if(s.vertex){ax.push(s.vertex.x);ay.push(s.vertex.y)}
    if(s.p1){ax.push(s.p1.x);ay.push(s.p1.y)}
    if(s.p2){ax.push(s.p2.x);ay.push(s.p2.y)}
  })
  ;(spec.labels||[]).forEach(l=>{ax.push(l.x);ay.push(l.y)})
  const mg=1.5
  const rxMin=spec.xMin??(ax.length?Math.min(...ax)-mg:-6)
  const rxMax=spec.xMax??(ax.length?Math.max(...ax)+mg:6)
  const ryMin=spec.yMin??(ay.length?Math.min(...ay)-mg:-6)
  const ryMax=spec.yMax??(ay.length?Math.max(...ay)+mg:6)
  const {tx,ty,scaleX,scaleY}=makeTx(rxMin,rxMax,ryMin,ryMax,W,H)

  const renderShape=(s: GeoShape, i: number): React.ReactNode=>{
    const c=nc(s.color)
    const fill=s.fill||'none'
    const filla=fill==='none'?`${c}14`:fill
    const sw=s.strokeWidth||2
    const dash=s.dashed?'8,5':''

    switch(s.type){
      case 'circle':{
        if(s.cx===undefined||s.r===undefined) return null
        const pr=Math.abs(scaleX(s.r))
        return <g key={i}>
          <circle cx={tx(s.cx)} cy={ty(s.cy!)} r={pr} stroke={c} strokeWidth={sw} fill={filla} strokeDasharray={dash}/>
          <circle cx={tx(s.cx)} cy={ty(s.cy!)} r="3.5" fill={c}/>
          {s.label&&<text x={tx(s.cx)} y={ty(s.cy!)-pr-8} textAnchor="middle" fontSize={s.fontSize||12} fontWeight="700" fill={c}>{s.label}</text>}
          {s.r&&<text x={tx(s.cx)+4} y={ty(s.cy!)-pr/2} fontSize="10" fill={`${c}bb`} fontStyle="italic">r={s.r}</text>}
        </g>
      }
      case 'ellipse':{
        if(s.cx===undefined) return null
        const prx=Math.abs(scaleX(s.rx||s.r||1)); const pry=Math.abs(scaleY(s.ry||s.r||1))
        return <g key={i}>
          <ellipse cx={tx(s.cx)} cy={ty(s.cy!)} rx={prx} ry={pry} stroke={c} strokeWidth={sw} fill={filla} strokeDasharray={dash}/>
          <circle cx={tx(s.cx)} cy={ty(s.cy!)} r="3" fill={c}/>
          {s.label&&<text x={tx(s.cx)} y={ty(s.cy!)-pry-8} textAnchor="middle" fontSize={s.fontSize||12} fontWeight="700" fill={c}>{s.label}</text>}
        </g>
      }
      case 'semicircle':{
        if(s.cx===undefined||s.r===undefined) return null
        const pr=Math.abs(scaleX(s.r))
        const sa=((s.startAngle??0)*Math.PI)/180
        const ea=((s.endAngle??180)*Math.PI)/180
        // Arc path + fermeture diamètre
        const x1=tx(s.cx)+pr*Math.cos(sa); const y1=ty(s.cy!)-pr*Math.sin(sa)
        const x2=tx(s.cx)+pr*Math.cos(ea); const y2=ty(s.cy!)-pr*Math.sin(ea)
        return <g key={i}>
          <path d={`M${x1},${y1} A${pr},${pr} 0 1,0 ${x2},${y2} Z`} stroke={c} strokeWidth={sw} fill={filla} strokeDasharray={dash}/>
          <circle cx={tx(s.cx)} cy={ty(s.cy!)} r="3" fill={c}/>
          {s.label&&<text x={tx(s.cx)} y={ty(s.cy!)-pr-8} textAnchor="middle" fontSize={s.fontSize||12} fontWeight="700" fill={c}>{s.label}</text>}
        </g>
      }
      case 'rect':case 'square':{
        if(s.x===undefined||s.w===undefined) return null
        const ht=s.type==='square'?s.w:s.h!
        const px=tx(s.x); const py=ty((s.y||0)+ht)
        const pw=Math.abs(tx(s.x+s.w)-tx(s.x)); const ph=Math.abs(ty(s.y||0)-ty((s.y||0)+ht))
        return <g key={i}>
          <rect x={px} y={py} width={pw} height={ph} stroke={c} strokeWidth={sw} fill={filla} strokeDasharray={dash}/>
          {s.type==='square'&&<>
            <line x1={px+pw/2-5} y1={py-4} x2={px+pw/2+5} y2={py-4} stroke={c} strokeWidth="1.5"/>
            <line x1={px+pw+4} y1={py+ph/2-5} x2={px+pw+4} y2={py+ph/2+5} stroke={c} strokeWidth="1.5"/>
          </>}
          {s.label&&<text x={px+pw/2} y={py+ph/2} textAnchor="middle" dominantBaseline="middle" fontSize={s.fontSize||12} fill={c}>{s.label}</text>}
          {s.w&&<text x={px+pw/2} y={py-9} textAnchor="middle" fontSize="11" fill={`${c}cc`}>{s.w}</text>}
          {s.h&&<text x={px+pw+11} y={py+ph/2+4} fontSize="11" fill={`${c}cc`}>{s.h}</text>}
        </g>
      }
      case 'triangle':{
        if(!s.points||s.points.length<3) return null
        const pts=s.points.map(p=>`${tx(p.x)},${ty(p.y)}`).join(' ')
        const cxc=(tx(s.points[0].x)+tx(s.points[1].x)+tx(s.points[2].x))/3
        const cyc=(ty(s.points[0].y)+ty(s.points[1].y)+ty(s.points[2].y))/3
        return <g key={i}>
          <polygon points={pts} stroke={c} strokeWidth={sw} fill={filla} strokeDasharray={dash}/>
          {s.points.map((p,j)=>p.label&&<text key={j} x={tx(p.x)+(tx(p.x)<cxc?-15:10)} y={ty(p.y)+(ty(p.y)>cyc?15:-9)} fontSize={s.fontSize||13} fontWeight="700" fill={p.color||c}>{p.label}</text>)}
          {s.showRight&&<RightAngleMark vertex={s.points[0]} p1={s.points[1]} p2={s.points[2]} tx={tx} ty={ty} color={c}/>}
          {s.label&&<text x={cxc} y={cyc} textAnchor="middle" dominantBaseline="middle" fontSize={s.fontSize||12} fill={c}>{s.label}</text>}
        </g>
      }
      case 'polygon':{
        if(!s.points||s.points.length<2) return null
        const pts=s.points.map(p=>`${tx(p.x)},${ty(p.y)}`).join(' ')
        const cxc=s.points.reduce((a,p)=>a+tx(p.x),0)/s.points.length
        const cyc=s.points.reduce((a,p)=>a+ty(p.y),0)/s.points.length
        return <g key={i}>
          <polygon points={pts} stroke={c} strokeWidth={sw} fill={filla} strokeDasharray={dash}/>
          {s.points.map((p,j)=>p.label&&<text key={j} x={tx(p.x)+(tx(p.x)<cxc?-14:9)} y={ty(p.y)+(ty(p.y)>cyc?13:-8)} fontSize={s.fontSize||12} fontWeight="700" fill={p.color||c}>{p.label}</text>)}
          {s.label&&<text x={cxc} y={cyc} textAnchor="middle" dominantBaseline="middle" fontSize={s.fontSize||12} fill={c}>{s.label}</text>}
        </g>
      }
      case 'line':{
        if(s.x1===undefined) return null
        const dxl=(s.x2||0)-s.x1; const dyl=(s.y2||0)-(s.y1||0); const big=300
        return <g key={i}>
          <line x1={tx(s.x1-dxl*big)} y1={ty((s.y1||0)-dyl*big)} x2={tx(s.x1+dxl*big)} y2={ty((s.y1||0)+dyl*big)} stroke={c} strokeWidth={sw} strokeDasharray={dash||'9,5'}/>
          {s.label&&<text x={tx(s.x2||0)+9} y={ty(s.y2||0)-7} fontSize={s.fontSize||12} fill={c}>{s.label}</text>}
        </g>
      }
      case 'segment':{
        if(s.x1===undefined) return null
        const mx=(tx(s.x1)+tx(s.x2!))/2; const my=(ty(s.y1!)+ty(s.y2!))/2
        return <g key={i}>
          <line x1={tx(s.x1)} y1={ty(s.y1!)} x2={tx(s.x2!)} y2={ty(s.y2!)} stroke={c} strokeWidth={sw} strokeDasharray={dash}/>
          <circle cx={tx(s.x1)} cy={ty(s.y1!)} r="3.5" fill={c}/>
          <circle cx={tx(s.x2!)} cy={ty(s.y2!)} r="3.5" fill={c}/>
          {s.label&&<text x={mx+8} y={my-7} textAnchor="middle" fontSize={s.fontSize||11} fill={c} fontWeight="600">{s.label}</text>}
        </g>
      }
      case 'vector':{
        if(!s.from||!s.to) return null
        return <g key={i}>
          <GeoArrow x1={tx(s.from.x)} y1={ty(s.from.y)} x2={tx(s.to.x)} y2={ty(s.to.y)} color={c} sw={sw}/>
          {s.from.label&&<text x={tx(s.from.x)-12} y={ty(s.from.y)+5} fontSize={s.fontSize||13} fontWeight="700" fill={s.from.color||c}>{s.from.label}</text>}
          {s.to.label&&<text x={tx(s.to.x)+10} y={ty(s.to.y)-6} fontSize={s.fontSize||13} fontWeight="700" fill={s.to.color||c}>{s.to.label}</text>}
          {s.label&&<text x={(tx(s.from.x)+tx(s.to.x))/2+10} y={(ty(s.from.y)+ty(s.to.y))/2-8} fontSize={s.fontSize||12} fill={c} fontStyle="italic">{s.label}</text>}
        </g>
      }
      case 'angle':{
        if(!s.vertex||!s.p1||!s.p2) return null
        return <g key={i}>
          <line x1={tx(s.vertex.x)} y1={ty(s.vertex.y)} x2={tx(s.p1.x)} y2={ty(s.p1.y)} stroke={c} strokeWidth={sw}/>
          <line x1={tx(s.vertex.x)} y1={ty(s.vertex.y)} x2={tx(s.p2.x)} y2={ty(s.p2.y)} stroke={c} strokeWidth={sw}/>
          {s.showRight
            ?<RightAngleMark vertex={s.vertex} p1={s.p1} p2={s.p2} tx={tx} ty={ty} color={c}/>
            :<AngleArc vertex={s.vertex} p1={s.p1} p2={s.p2} tx={tx} ty={ty} color={c} value={s.value}/>
          }
          {s.vertex.label&&<text x={tx(s.vertex.x)-14} y={ty(s.vertex.y)+5} fontSize={s.fontSize||13} fontWeight="700" fill={c}>{s.vertex.label}</text>}
          {s.p1.label&&<text x={tx(s.p1.x)+8} y={ty(s.p1.y)-6} fontSize={s.fontSize||13} fontWeight="700" fill={c}>{s.p1.label}</text>}
          {s.p2.label&&<text x={tx(s.p2.x)+8} y={ty(s.p2.y)+13} fontSize={s.fontSize||13} fontWeight="700" fill={c}>{s.p2.label}</text>}
        </g>
      }
      case 'arc':{
        if(s.cx===undefined||s.r===undefined) return null
        const pr=Math.abs(scaleX(s.r))
        const sa=((s.startAngle??0)*Math.PI)/180
        const ea=((s.endAngle??180)*Math.PI)/180
        const da=(s.endAngle??180)-(s.startAngle??0)
        const ax1=tx(s.cx)+pr*Math.cos(-sa); const ay1=ty(s.cy!)+pr*Math.sin(-sa)
        const ax2=tx(s.cx)+pr*Math.cos(-ea); const ay2=ty(s.cy!)+pr*Math.sin(-ea)
        return <g key={i}>
          <path d={`M${ax1},${ay1} A${pr},${pr} 0 ${da>180?1:0},1 ${ax2},${ay2}`} stroke={c} strokeWidth={sw} fill={filla} strokeDasharray={dash}/>
          {s.label&&<text x={tx(s.cx)} y={ty(s.cy!)-pr-9} textAnchor="middle" fontSize={s.fontSize||12} fill={c}>{s.label}</text>}
        </g>
      }
      case 'point':{
        if(s.cx===undefined) return null
        return <g key={i}>
          <circle cx={tx(s.cx)} cy={ty(s.cy!)} r="5.5" fill={c} stroke="#08081a" strokeWidth="2"/>
          {s.label&&<text x={tx(s.cx)+11} y={ty(s.cy!)-8} fontSize={s.fontSize||13} fontWeight="700" fill={c}>{s.label}</text>}
        </g>
      }
      case 'dimension':{
        // Cote entre deux points avec étiquette de mesure
        if(s.x1===undefined) return null
        const offPx=(s.offset??20) // déjà en pixels pour simplifier
        return <DimensionLine
          x1={tx(s.x1)} y1={ty(s.y1!)} x2={tx(s.x2!)} y2={ty(s.y2!)}
          label={s.label} color={c} offset={offPx}
        />
      }
      case 'median':{
        // Médiane d'un triangle : de s.points[targetVertex] vers milieu du côté opposé
        if(!s.points||s.points.length<3) return null
        const tv=s.targetVertex??0
        const opp=s.points.filter((_,j)=>j!==tv)
        const mx2=(opp[0].x+opp[1].x)/2; const my2=(opp[0].y+opp[1].y)/2
        const from=s.points[tv]
        return <g key={i}>
          <line x1={tx(from.x)} y1={ty(from.y)} x2={tx(mx2)} y2={ty(my2)} stroke={c} strokeWidth={sw} strokeDasharray="6,3"/>
          <circle cx={tx(mx2)} cy={ty(my2)} r="4" fill={c}/>
          {s.label&&<text x={(tx(from.x)+tx(mx2))/2+9} y={(ty(from.y)+ty(my2))/2} fontSize={s.fontSize||11} fill={c} fontStyle="italic">{s.label}</text>}
        </g>
      }
      case 'altitude':{
        // Hauteur depuis s.points[targetVertex] vers le côté opposé (pied perpendiculaire)
        if(!s.points||s.points.length<3) return null
        const tv=s.targetVertex??0
        const opp=s.points.filter((_,j)=>j!==tv)
        const [A,B]=[opp[0],opp[1]]; const P=s.points[tv]
        const abx=B.x-A.x; const aby=B.y-A.y; const len2=abx*abx+aby*aby||1
        const t=((P.x-A.x)*abx+(P.y-A.y)*aby)/len2
        const Hx=A.x+t*abx; const Hy=A.y+t*aby
        return <g key={i}>
          <line x1={tx(P.x)} y1={ty(P.y)} x2={tx(Hx)} y2={ty(Hy)} stroke={c} strokeWidth={sw} strokeDasharray="6,3"/>
          <RightAngleMark vertex={{x:Hx,y:Hy}} p1={P} p2={B} tx={tx} ty={ty} color={c}/>
          <circle cx={tx(Hx)} cy={ty(Hy)} r="3.5" fill={c}/>
          {s.label&&<text x={(tx(P.x)+tx(Hx))/2+9} y={(ty(P.y)+ty(Hy))/2} fontSize={s.fontSize||11} fill={c} fontStyle="italic">{s.label}</text>}
        </g>
      }
      case 'bisector':{
        // Bissectrice de l'angle en s.vertex entre s.p1 et s.p2
        if(!s.vertex||!s.p1||!s.p2) return null
        const d1x=s.p1.x-s.vertex.x; const d1y=s.p1.y-s.vertex.y; const l1=Math.sqrt(d1x*d1x+d1y*d1y)||1
        const d2x=s.p2.x-s.vertex.x; const d2y=s.p2.y-s.vertex.y; const l2=Math.sqrt(d2x*d2x+d2y*d2y)||1
        const bx=s.vertex.x+(d1x/l1+d2x/l2)*3; const by=s.vertex.y+(d1y/l1+d2y/l2)*3
        return <g key={i}>
          <line x1={tx(s.vertex.x)} y1={ty(s.vertex.y)} x2={tx(bx)} y2={ty(by)} stroke={c} strokeWidth={sw} strokeDasharray="7,4"/>
          {s.label&&<text x={tx(bx)+9} y={ty(by)} fontSize={s.fontSize||11} fill={c} fontStyle="italic">{s.label}</text>}
        </g>
      }
      case 'function_on_geo':{
        // Trace une fonction mathématique dans le repère géométrique
        if(!s.expr) return null
        const safeE=sanitizeExpr(s.expr)
        const N=300; const pts: string[]=[]
        for(let j=0;j<=N;j++){
          const x=rxMin+(rxMax-rxMin)*j/N
          try{
            const fn=new Function('x','Math',`"use strict";try{return (${safeE});}catch{return null;}`)
            const y=fn(x,Math)
            if(y!==null&&isFinite(y)&&Math.abs(y)<1e6) pts.push(`${tx(x)},${ty(y)}`)
          }catch{/*skip*/}
        }
        return <g key={i}>
          <polyline points={pts.join(' ')} stroke={c} strokeWidth={sw} fill="none" strokeDasharray={dash}/>
          {s.label&&<text x={tx(rxMax)-5} y={ty(new Function('x','Math',`return (${safeE})`)(rxMax,Math))-9} fontSize={s.fontSize||12} fill={c} textAnchor="end" fontStyle="italic">{s.label}</text>}
        </g>
      }
      case 'axes':{
        const x0=tx(0); const y0=ty(0); const step=s.step||1
        const ticks: React.ReactNode[]=[]
        for(let v=Math.ceil(rxMin);v<=Math.floor(rxMax);v+=step){if(v===0)continue;ticks.push(<g key={`tx${v}`}><line x1={tx(v)} y1={y0-5} x2={tx(v)} y2={y0+5} stroke="rgba(255,255,255,0.35)" strokeWidth="1"/><text x={tx(v)} y={y0+17} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.45)">{v}</text></g>)}
        for(let v=Math.ceil(ryMin);v<=Math.floor(ryMax);v+=step){if(v===0)continue;ticks.push(<g key={`ty${v}`}><line x1={x0-5} y1={ty(v)} x2={x0+5} y2={ty(v)} stroke="rgba(255,255,255,0.35)" strokeWidth="1"/><text x={x0-9} y={ty(v)+4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.45)">{v}</text></g>)}
        return <g key={i}>
          <GeoArrow x1={42} y1={y0} x2={W-22} y2={y0} color="rgba(255,255,255,0.5)"/>
          <GeoArrow x1={x0} y1={H-42} x2={x0} y2={22} color="rgba(255,255,255,0.5)"/>
          <text x={W-16} y={y0+5} fontSize="13" fill="rgba(255,255,255,0.6)" fontStyle="italic">x</text>
          <text x={x0-5} y={17} fontSize="13" fill="rgba(255,255,255,0.6)" fontStyle="italic">y</text>
          <text x={x0-10} y={y0+17} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.4)">O</text>
          {ticks}
        </g>
      }
      case 'grid':{
        const step=s.step||1; const lines: React.ReactNode[]=[]
        for(let v=Math.ceil(rxMin);v<=Math.floor(rxMax);v+=step) lines.push(<line key={`gx${v}`} x1={tx(v)} y1={44} x2={tx(v)} y2={H-44} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>)
        for(let v=Math.ceil(ryMin);v<=Math.floor(ryMax);v+=step) lines.push(<line key={`gy${v}`} x1={44} y1={ty(v)} x2={W-44} y2={ty(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>)
        return <g key={i}>{lines}</g>
      }
      // ── Formes 3D projetées en 2D (vue de dessus / projection oblique) ──
      case 'line3d' as any:case 'segment3d' as any: {
        // Projection oblique simple : (x,y,z) → (x + z*0.4, y + z*0.3)
        const proj = (p: {x:number;y:number;z?:number}) => ({ x: p.x + (p.z||0)*0.4, y: p.y + (p.z||0)*0.3 })
        const from3 = s.from || (s as any).start || {x:s.x1||0, y:s.y1||0, z:0}
        const to3   = s.to   || (s as any).end   || {x:s.x2||0, y:s.y2||0, z:0}
        const pf = proj(from3), pt = proj(to3)
        return <g key={i}>
          <line x1={tx(pf.x)} y1={ty(pf.y)} x2={tx(pt.x)} y2={ty(pt.y)} stroke={c} strokeWidth={sw} strokeDasharray={dash}/>
          {s.label && <text x={(tx(pf.x)+tx(pt.x))/2+9} y={(ty(pf.y)+ty(pt.y))/2-8} fontSize={s.fontSize||12} fontWeight="700" fill={c}>{s.label}</text>}
        </g>
      }
      case 'point3d' as any: {
        const proj3 = (p: {x:number;y:number;z?:number}) => ({ x: p.x + (p.z||0)*0.4, y: p.y + (p.z||0)*0.3 })
        const pp = proj3({ x: s.x||s.cx||0, y: s.y||s.cy||0, z: (s as any).z||0 })
        return <g key={i}>
          <circle cx={tx(pp.x)} cy={ty(pp.y)} r="5.5" fill={c} stroke="#08081a" strokeWidth="2"/>
          {s.label && <text x={tx(pp.x)+11} y={ty(pp.y)-8} fontSize={s.fontSize||13} fontWeight="700" fill={c}>{s.label}</text>}
        </g>
      }
      case 'label' as any: {
        return <text key={i} x={tx(s.x||0)} y={ty(s.y||0)} fontSize={s.fontSize||13} fontWeight="700" fill={c} textAnchor="middle">{s.label}</text>
      }
      default: return null
    }
  }

  return (
    <div style={{borderRadius:14,overflow:'hidden',border:'1px solid rgba(99,102,241,0.25)',margin:'14px 0',background:'rgba(8,8,23,0.97)'}}>
      {spec.title&&<div style={{padding:'8px 18px',borderBottom:'1px solid rgba(255,255,255,0.07)',fontSize:12,fontWeight:700,color:'#818cf8',letterSpacing:'0.08em'}}>📐 {spec.title}</div>}
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}>
        <rect width={W} height={H} fill="rgba(8,8,23,0.97)"/>
        {spec.shapes.map((s,i)=>renderShape(s,i))}
        {(spec.labels||[]).map((l,i)=><text key={i} x={tx(l.x)} y={ty(l.y)} fontSize={l.size||13} fill={l.color||'#e2e8f0'} fontWeight="700" textAnchor="middle">{l.text}</text>)}
      </svg>
    </div>
  )
}


// ── Dispatch : function/points → Plotly, geometry → SVG ──────────
function SmartGraph({ spec }: { spec: any }) {
  if (spec?.type === 'geometry') return <GeoGraph spec={spec as GeoSpec}/>
  return <MathGraph spec={spec as GraphSpec}/>
}

// Extrait le premier [GRAPH: {...}] d'un texte (ex: correction IA)
function extractFirstGraph(text: string): string | null {
  const tag = '[GRAPH:'
  const idx = text.indexOf(tag)
  if (idx === -1) return null
  const jsonStart = text.indexOf('{', idx + tag.length)
  if (jsonStart === -1) return null
  let depth = 0, j = jsonStart
  while (j < text.length) {
    if (text[j] === '{') depth++
    else if (text[j] === '}') { depth--; if (depth === 0) break }
    j++
  }
  const closeBracket = text.indexOf(']', j)
  if (closeBracket === -1) return null
  return text.slice(idx, closeBracket + 1)
}

// Extrait les segments [GRAPH: {...}] en gérant les JSON imbriqués
function parseGraphSegments(text: string): Array<{type:'text'|'graph'; content:string}> {
  const result: Array<{type:'text'|'graph'; content:string}> = []
  let i = 0
  const tag = '[GRAPH:'
  while (i < text.length) {
    const idx = text.indexOf(tag, i)
    if (idx === -1) {
      if (i < text.length) result.push({ type:'text', content: text.slice(i) })
      break
    }
    if (idx > i) result.push({ type:'text', content: text.slice(i, idx) })
    // Trouver le { qui ouvre le JSON
    const jsonStart = text.indexOf('{', idx + tag.length)
    if (jsonStart === -1) { result.push({ type:'text', content: text.slice(idx) }); break }
    // Trouver la accolade fermante équilibrée
    let depth = 0, j = jsonStart
    while (j < text.length) {
      if (text[j] === '{') depth++
      else if (text[j] === '}') { depth--; if (depth === 0) break }
      j++
    }
    const jsonEnd = j // position du } fermant
    // Chercher le ] de fermeture
    const closeBracket = text.indexOf(']', jsonEnd)
    if (closeBracket === -1) { result.push({ type:'text', content: text.slice(idx) }); break }
    const jsonStr = text.slice(jsonStart, jsonEnd + 1)
    result.push({ type:'graph', content: jsonStr })
    i = closeBracket + 1
  }
  return result
}

function TextWithGraphs({ text }: { text: string }) {
  const segments = parseGraphSegments(text)
  return (
    <div>
      {segments.map((seg, i) => {
        if (seg.type === 'text') {
          return seg.content ? <MDLines key={i} text={seg.content} /> : null
        } else {
          try {
            const spec: GraphSpec = JSON.parse(seg.content)
            return <SmartGraph key={i} spec={spec} />
          } catch {
            // Si JSON invalide, afficher quand même proprement
            return <div key={i} style={{padding:'8px 12px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:8,fontSize:11,color:'#fcd34d',margin:'8px 0'}}>📊 Graphique non disponible (format invalide)</div>
          }
        }
      })}
    </div>
  )
}

// ── PDF coloré : génération HTML + print navigateur ──────────────

// ── PDF coloré : génération HTML + print navigateur ──────────────
// Approche : HTML stylé ouvert dans un onglet → Ctrl+P → Enregistrer en PDF
// Résultat : polices parfaites, symboles mathématiques, couleurs fidèles

function buildCorrectionHtml(
  exam: GeneratedExam,
  correctionText: string,
  studentAnswers: string
): string {

  const C = {
    ex:  ['#6366f1','#10b981','#f59e0b','#8b5cf6','#06b6d4'],
    exBg:['#1e1b4b','#052e16','#431407','#2e1065','#082f49'],
    exTx:['#a5b4fc','#6ee7b7','#fcd34d','#c4b5fd','#67e8f9'],
  }

  let exIdx = -1

  /* ── escape HTML basique ── */
  const esc = (s: string) => s
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')

  /* ── inline : **gras** et `code` ── */
  const inline = (s: string) => esc(s)
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/`(.+?)`/g,'<code>$1</code>')

  /* ── convertit une ligne Markdown en HTML ── */
  const line2html = (raw: string): string => {
    const t = raw.trim()
    if (!t) return '<div class="spacer"></div>'

    // ## Exercice N
    if (t.startsWith('## ')) {
      exIdx = Math.min(exIdx + 1, C.ex.length - 1)
      return (
        `<div class="ex-hdr" style="background:${C.exBg[exIdx]};` +
        `border-left:5px solid ${C.ex[exIdx]};color:${C.exTx[exIdx]}">` +
        `${inline(t.slice(3))}</div>`
      )
    }

    // ### Partie / Question
    if (t.startsWith('### ')) {
      const col = C.ex[Math.max(exIdx,0)]
      const bg  = C.exBg[Math.max(exIdx,0)]
      return (
        `<div class="q-hdr" style="border-left:3px solid ${col};` +
        `background:${bg}88;color:${col}">${inline(t.slice(4))}</div>`
      )
    }

    // > **Résultat / Bilan**
    if (t.startsWith('>')) {
      const inner = t.replace(/^>\s*/,'')
      if (inner.startsWith('**')) {
        return `<div class="result-box">${inline(inner)}</div>`
      }
      return `<div class="tip-box">${inline(inner)}</div>`
    }

    // --- séparateur
    if (t === '---') return '<hr>'

    // Ligne **Concept / Méthode
    if (/^\*\*(Concept|M.thode|Th.or.me|Rappel|D.finition)/i.test(t))
      return `<div class="concept">${inline(t)}</div>`

    // **Résultat :**
    if (/^\*\*(R.sultat|Conclusion)/i.test(t))
      return `<div class="result-inline">${inline(t)}</div>`

    // **Barème / Bilan Exercice
    if (/^\*\*(Bar.me|Bilan|Note)/i.test(t))
      return `<div class="bareme">${inline(t)}</div>`

    // **Erreur / Piège
    if (/^\*\*(Erreur|Pi.ge|Attention)/i.test(t))
      return `<div class="err">${inline(t)}</div>`

    // **Point pédago / À retenir
    if (/^\*\*(Point|Astuce|. retenir|Key)/i.test(t))
      return `<div class="tip-line">${inline(t)}</div>`

    // Analyse élève ✅ ❌ 💡
    if (/[✅❌💡]/.test(t))
      return `<div class="analysis">${inline(t)}</div>`

    // Étapes : - Étape N ou • Étape
    if (/^[-•]\s*[Éé]tape\s*\d/i.test(t) || /^[Éé]tape\s*\d/i.test(t))
      return `<div class="step">${inline(t)}</div>`

    // Bullet générique
    if (t.startsWith('- ') || t.startsWith('• '))
      return `<div class="bullet">${inline(t.slice(2))}</div>`

    // Texte normal
    return `<p>${inline(t)}</p>`
  }

  // ── Convertit [GRAPH:{...}] en SVG inline pour l'impression ─────
  const graphToSvg = (jsonStr: string): string => {
    try {
      const sp = JSON.parse(jsonStr)
      const GC = ['#6366f1','#10b981','#f59e0b','#ec4899','#06b6d4']
      const esc2 = (s: string) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      const proj3 = (p: {x:number;y?:number;z?:number}) => ({ x:(p.x||0)+(((p as any).z)||0)*0.4, y:(p.y||0)+(((p as any).z)||0)*0.3 })

      if (sp.type === 'function') {
        const FW=520,FH=260,FP=46
        const fxMin:number=sp.xMin??-5, fxMax:number=sp.xMax??5, FN=300
        const allFY:number[]=[]
        const fnData:(number[])[] = (sp.expressions as string[]||[]).map(expr=>{
          const row:number[]=[]
          for(let i=0;i<=FN;i++){
            const x=fxMin+(i/FN)*(fxMax-fxMin)
            try{ const fn2=new Function('x','Math',`try{return(${sanitizeExpr(expr)})}catch(e){return null}`)
              const y:number|null=fn2(x,Math); if(y!==null&&isFinite(y)&&Math.abs(y)<1e5){row.push(y);allFY.push(y)}else row.push(NaN)
            }catch{row.push(NaN)}
          }; return row
        })
        const fyMin=(allFY.length?Math.min(...allFY.filter(isFinite)):-3)-0.5
        const fyMax=(allFY.length?Math.max(...allFY.filter(isFinite)):5)+0.5
        const ftx=(x:number)=>FP+((x-fxMin)/(fxMax-fxMin))*(FW-2*FP)
        const fty=(y:number)=>FH-FP-((y-fyMin)/(fyMax-fyMin))*(FH-2*FP)
        let fpaths='', fleg=''
        fnData.forEach((row,fi)=>{
          const fc=GC[fi%GC.length]; let fd=''
          for(let i=0;i<=FN;i++){const y=row[i],x=fxMin+(i/FN)*(fxMax-fxMin); if(!isNaN(y)&&isFinite(y))fd+=(fd===''?'M':'L')+ftx(x).toFixed(1)+','+fty(y).toFixed(1)+' '; else fd+=' '}
          fpaths+='<path d="'+fd+'" fill="none" stroke="'+fc+'" stroke-width="2.5"/>'
          const lbl=(sp.labels as string[])?.[fi]||(sp.expressions as string[])[fi]
          fleg+='<text x="'+(FP+fi*140)+'" y="15" fill="'+fc+'" font-size="11" font-family="monospace">'+esc2(lbl)+'</text>'
        })
        const fox=ftx(0).toFixed(1),foy=fty(0).toFixed(1)
        const fax='<line x1="'+FP+'" y1="'+foy+'" x2="'+(FW-FP)+'" y2="'+foy+'" stroke="#555" stroke-width="1.2"/>'
          +'<line x1="'+fox+'" y1="'+FP+'" x2="'+fox+'" y2="'+(FH-FP)+'" stroke="#555" stroke-width="1.2"/>'
          +'<text x="'+(FW-FP+6)+'" y="'+(Number(foy)+4)+'" fill="#888" font-size="12" font-style="italic">x</text>'
          +'<text x="'+(Number(fox)+5)+'" y="'+(FP-4)+'" fill="#888" font-size="12" font-style="italic">y</text>'
        const fttl=sp.title?'<text x="'+(FW/2)+'" y="'+(FH-4)+'" fill="#aaa" font-size="11" text-anchor="middle">'+esc2(String(sp.title))+'</text>':''
        return '<div style="margin:12px 0;border-radius:10px;overflow:hidden;border:1px solid rgba(99,102,241,0.3);display:inline-block">'
          +(fleg?'<svg width="'+FW+'" height="20" style="background:#0a0a18;display:block">'+fleg+'</svg>':'')
          +'<svg width="'+FW+'" height="'+FH+'" viewBox="0 0 '+FW+' '+FH+'" style="background:#0f0f1e;display:block">'+fax+fpaths+fttl+'</svg></div>'
      }

      if (sp.type === 'geometry') {
        const GW:number=sp.width||440, GH:number=sp.height||340, GP=44
        const gsh:any[]=sp.shapes||[]
        // Calcul auto des bornes à partir de tous les points
        const allGX:number[]=[], allGY:number[]=[]
        const addPt=(p:any)=>{if(!p)return;const pp=proj3(p);allGX.push(pp.x);allGY.push(pp.y)}
        gsh.forEach((s:any)=>{
          if(s.points)(s.points as any[]).forEach(addPt)
          if(s.from)addPt(s.from); if(s.to)addPt(s.to); if(s.start)addPt(s.start); if(s.end)addPt(s.end)
          if(s.cx!==undefined){allGX.push(s.cx+(s.r||0));allGY.push(s.cy+(s.r||0));allGX.push(s.cx-(s.r||0));allGY.push(s.cy-(s.r||0))}
          if(s.x1!==undefined){allGX.push(s.x1,s.x2||0);allGY.push(s.y1||0,s.y2||0)}
          if(s.x!==undefined)addPt(s)
          // points 3D
          if(s.type==='point3d'||s.type==='line3d'||s.type==='segment3d'){
            if(s.x!==undefined)addPt({x:s.x,y:s.y||0,z:s.z||0})
          }
        })
        const gMg=1.5
        const gxMin=allGX.length?Math.min(...allGX)-gMg:-1, gxMax=allGX.length?Math.max(...allGX)+gMg:6
        const gyMin=allGY.length?Math.min(...allGY)-gMg:-1, gyMax=allGY.length?Math.max(...allGY)+gMg:5
        const gtx=(x:number)=>GP+((x-gxMin)/(gxMax-gxMin))*(GW-2*GP)
        const gty=(y:number)=>GH-GP-((y-gyMin)/(gyMax-gyMin))*(GH-2*GP)
        let gsvg=''; let gci=0
        for(const gs of gsh){
          const gc:string=gs.color||GC[gci++%GC.length]
          const gf:string=gs.fill||'none'
          if(gs.type==='grid'){
            for(let gx=Math.ceil(gxMin);gx<=gxMax;gx++)gsvg+='<line x1="'+gtx(gx).toFixed(1)+'" y1="'+GP+'" x2="'+gtx(gx).toFixed(1)+'" y2="'+(GH-GP)+'" stroke="#ffffff12" stroke-width="1"/>'
            for(let gy=Math.ceil(gyMin);gy<=gyMax;gy++)gsvg+='<line x1="'+GP+'" y1="'+gty(gy).toFixed(1)+'" x2="'+(GW-GP)+'" y2="'+gty(gy).toFixed(1)+'" stroke="#ffffff12" stroke-width="1"/>'
          }else if(gs.type==='axes'){
            gsvg+='<line x1="'+GP+'" y1="'+gty(0).toFixed(1)+'" x2="'+(GW-GP)+'" y2="'+gty(0).toFixed(1)+'" stroke="#ffffff55" stroke-width="1.5"/>'
              +'<line x1="'+gtx(0).toFixed(1)+'" y1="'+GP+'" x2="'+gtx(0).toFixed(1)+'" y2="'+(GH-GP)+'" stroke="#ffffff55" stroke-width="1.5"/>'
              +'<text x="'+(GW-GP+8)+'" y="'+(gty(0)+4).toFixed(1)+'" fill="#888" font-size="12" font-style="italic">x</text>'
              +'<text x="'+(gtx(0)+5).toFixed(1)+'" y="'+(GP-4)+'" fill="#888" font-size="12" font-style="italic">y</text>'
          }else if(gs.type==='triangle'&&gs.points){
            const gpts=(gs.points as any[]).map((p:any)=>gtx(p.x).toFixed(1)+','+gty(p.y).toFixed(1)).join(' ')
            gsvg+='<polygon points="'+gpts+'" fill="'+gf+'" stroke="'+gc+'" stroke-width="2"/>'
            for(const gp of gs.points as any[]){if(gp.label)gsvg+='<text x="'+(gtx(gp.x)+7).toFixed(1)+'" y="'+(gty(gp.y)-7).toFixed(1)+'" fill="'+gc+'" font-size="12" font-weight="bold">'+esc2(gp.label)+'</text>'}
          }else if(gs.type==='circle'&&gs.cx!==undefined){
            const gr:number=gs.r||1
            const gpr=Math.abs((gr/(gxMax-gxMin))*(GW-2*GP))
            gsvg+='<circle cx="'+gtx(gs.cx).toFixed(1)+'" cy="'+gty(gs.cy).toFixed(1)+'" r="'+gpr.toFixed(1)+'" fill="'+gf+'" stroke="'+gc+'" stroke-width="2"/>'
            if(gs.label)gsvg+='<text x="'+(gtx(gs.cx)+gpr+5).toFixed(1)+'" y="'+(gty(gs.cy)+4).toFixed(1)+'" fill="'+gc+'" font-size="11">'+esc2(gs.label)+'</text>'
          }else if((gs.type==='segment'||gs.type==='line')&&gs.x1!==undefined){
            const gd=(gs.dashed)?' stroke-dasharray="5,4"':''
            gsvg+='<line x1="'+gtx(gs.x1).toFixed(1)+'" y1="'+gty(gs.y1).toFixed(1)+'" x2="'+gtx(gs.x2).toFixed(1)+'" y2="'+gty(gs.y2).toFixed(1)+'" stroke="'+gc+'" stroke-width="2"'+gd+'/>'
            if(gs.label){const gmx=(gtx(gs.x1)+gtx(gs.x2))/2,gmy=(gty(gs.y1)+gty(gs.y2))/2;gsvg+='<text x="'+(gmx+5).toFixed(1)+'" y="'+(gmy-5).toFixed(1)+'" fill="'+gc+'" font-size="11">'+esc2(gs.label)+'</text>'}
          }else if(gs.type==='vector'&&gs.from&&gs.to){
            const gvx1=gtx(gs.from.x),gvy1=gty(gs.from.y),gvx2=gtx(gs.to.x),gvy2=gty(gs.to.y)
            const gang=Math.atan2(gvy2-gvy1,gvx2-gvx1),ga=9,gb2=0.5
            gsvg+='<line x1="'+gvx1.toFixed(1)+'" y1="'+gvy1.toFixed(1)+'" x2="'+gvx2.toFixed(1)+'" y2="'+gvy2.toFixed(1)+'" stroke="'+gc+'" stroke-width="2"/>'
              +'<polygon points="'+gvx2.toFixed(1)+','+gvy2.toFixed(1)+' '+(gvx2-ga*Math.cos(gang-gb2)).toFixed(1)+','+(gvy2-ga*Math.sin(gang-gb2)).toFixed(1)+' '+(gvx2-ga*Math.cos(gang+gb2)).toFixed(1)+','+(gvy2-ga*Math.sin(gang+gb2)).toFixed(1)+'" fill="'+gc+'"/>'
            if(gs.label)gsvg+='<text x="'+((gvx1+gvx2)/2+7).toFixed(1)+'" y="'+((gvy1+gvy2)/2-7).toFixed(1)+'" fill="'+gc+'" font-size="12" font-weight="bold">'+esc2(gs.label)+'</text>'
          }else if(gs.type==='point'||gs.type==='point3d'){
            const gpp=gs.type==='point3d'?proj3({x:gs.x||0,y:gs.y||0,z:gs.z||0}):{x:gs.cx||gs.x||0,y:gs.cy||gs.y||0}
            gsvg+='<circle cx="'+gtx(gpp.x).toFixed(1)+'" cy="'+gty(gpp.y).toFixed(1)+'" r="5" fill="'+gc+'"/>'
            if(gs.label)gsvg+='<text x="'+(gtx(gpp.x)+8).toFixed(1)+'" y="'+(gty(gpp.y)-8).toFixed(1)+'" fill="'+gc+'" font-size="12" font-weight="bold">'+esc2(gs.label)+'</text>'
          }else if(gs.type==='line3d'||gs.type==='segment3d'){
            const gsf=proj3(gs.from||gs.start||{x:0,y:0,z:0}),gst=proj3(gs.to||gs.end||{x:1,y:0,z:0})
            gsvg+='<line x1="'+gtx(gsf.x).toFixed(1)+'" y1="'+gty(gsf.y).toFixed(1)+'" x2="'+gtx(gst.x).toFixed(1)+'" y2="'+gty(gst.y).toFixed(1)+'" stroke="'+gc+'" stroke-width="2"/>'
            if(gs.label){const gmx2=(gtx(gsf.x)+gtx(gst.x))/2,gmy2=(gty(gsf.y)+gty(gst.y))/2;gsvg+='<text x="'+(gmx2+6).toFixed(1)+'" y="'+(gmy2-6).toFixed(1)+'" fill="'+gc+'" font-size="11" font-weight="bold">'+esc2(gs.label)+'</text>'}
          }
        }
        const gttl=sp.title?'<text x="'+(GW/2)+'" y="'+(GH-4)+'" fill="#aaa" font-size="11" text-anchor="middle">'+esc2(String(sp.title))+'</text>':''
        return '<div style="margin:12px 0;border-radius:10px;overflow:hidden;border:1px solid rgba(99,102,241,0.3);display:inline-block">'
          +'<svg width="'+GW+'" height="'+GH+'" viewBox="0 0 '+GW+' '+GH+'" style="background:#0f0f1e;display:block">'+gsvg+gttl+'</svg></div>'
      }
    }catch(_e){return ''}
    return ''
  }

  // ── Convertit texte + [GRAPH:] en HTML ──────────────────────────
  const textToHtml = (rawText: string): string => {
    const GTAG='[GRAPH:'
    const parts:string[]=[]
    let gp=0
    while(gp<rawText.length){
      const gi=rawText.indexOf(GTAG,gp)
      if(gi===-1){parts.push(rawText.slice(gp).split('\n').map(line2html).join('\n'));break}
      if(gi>gp)parts.push(rawText.slice(gp,gi).split('\n').map(line2html).join('\n'))
      const jgs=rawText.indexOf('{',gi+GTAG.length)
      if(jgs===-1){parts.push(rawText.slice(gi).split('\n').map(line2html).join('\n'));break}
      let gd=0,gjj=jgs
      while(gjj<rawText.length){if(rawText[gjj]==='{')gd++;else if(rawText[gjj]==='}'){gd--;if(gd===0)break};gjj++}
      const gcb=rawText.indexOf(']',gjj)
      const svg=graphToSvg(rawText.slice(jgs,gjj+1))
      parts.push(svg||'<div style="padding:8px 14px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:8px;font-size:11px;color:#fcd34d;margin:8px 0">📊 Figure mathématique</div>')
      gp=(gcb!==-1?gcb:gjj)+1
    }
    return parts.join('\n')
  }

  const bodyHtml = textToHtml(correctionText)

  const answersHtml = studentAnswers.trim().length > 10
    ? `<details class="answers-block" open>
        <summary>Réponses soumises par l'élève</summary>
        <pre>${esc(studentAnswers)}</pre>
       </details>`
    : ''

  /* ── CSS de base ── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html{background:#0c0c1a}
    body{
      font-family:'Inter','Segoe UI',system-ui,sans-serif;
      background:#0c0c1a;color:#e2e8f0;
      font-size:13.5px;line-height:1.8;
      -webkit-print-color-adjust:exact;
      print-color-adjust:exact;
    }
    .wrap{max-width:860px;margin:0 auto;padding:32px 40px 80px}

    /* BARRE D'IMPRESSION */
    .print-bar{
      position:sticky;top:0;z-index:99;
      background:#0c0c1a;border-bottom:1px solid rgba(255,255,255,.1);
      padding:10px 0 14px;margin-bottom:20px;
      display:flex;align-items:center;gap:12px;
    }
    .print-btn{
      background:linear-gradient(135deg,#6366f1,#8b5cf6);
      color:white;border:none;border-radius:8px;
      padding:10px 24px;font-size:14px;font-weight:700;
      cursor:pointer;font-family:inherit;
    }
    .print-hint{font-size:11.5px;color:rgba(255,255,255,.4);max-width:500px;line-height:1.5}

    /* TITRE */
    .doc-title{
      background:linear-gradient(135deg,#1e1b4b,#2e1065);
      border:1px solid #6366f1;border-radius:12px;
      padding:22px 28px;margin-bottom:28px;text-align:center;
    }
    .doc-title h1{font-size:20px;font-weight:900;color:#fff;margin-bottom:6px}
    .doc-title .sub{color:#a5b4fc;font-size:12px}

    /* EN-TÊTE EXERCICE */
    .ex-hdr{
      border-radius:8px;padding:14px 20px;
      margin:32px 0 16px;font-size:16px;font-weight:800;
      page-break-before:always;
    }
    .ex-hdr:first-of-type{page-break-before:avoid}

    /* EN-TÊTE QUESTION */
    .q-hdr{
      border-radius:0 6px 6px 0;padding:8px 14px;
      margin:14px 0 8px;font-size:13px;font-weight:700;
    }

    /* CONCEPT */
    .concept{
      background:#1e3254;border-left:3px solid #60a5fa;
      border-radius:0 6px 6px 0;padding:10px 14px;
      color:#bfdbfe;font-size:12.5px;margin:8px 0;
    }

    /* ÉTAPES */
    .step{
      padding:5px 12px 5px 26px;margin:3px 0;
      color:#e2e8f0;font-size:12.5px;position:relative;
    }
    .step::before{content:'→';position:absolute;left:8px;color:#6366f1;font-weight:900}

    /* RÉSULTAT */
    .result-box{
      border:2px solid #10b981;background:#052e16;
      border-radius:8px;padding:12px 18px;margin:14px 0;
      color:#6ee7b7;font-weight:700;font-size:13.5px;
    }
    .result-inline{
      background:#052e16;border:1px solid #10b981;
      border-radius:6px;padding:8px 14px;
      color:#6ee7b7;font-weight:700;margin:8px 0;
    }

    /* BARÈME */
    .bareme{
      background:#2e1065;border-radius:6px;
      padding:7px 14px;color:#c4b5fd;font-size:12px;margin:6px 0;
    }

    /* ERREUR */
    .err{
      background:#450a0a;border-left:3px solid #ef4444;
      border-radius:0 6px 6px 0;padding:8px 14px;
      color:#fca5a5;font-size:12px;margin:6px 0;
    }

    /* ASTUCE / TIP */
    .tip-line,.tip-box{
      background:#0c2340;border-left:3px solid #0ea5e9;
      border-radius:0 6px 6px 0;padding:8px 14px;
      color:#7dd3fc;font-size:12px;margin:6px 0;
    }

    /* ANALYSE */
    .analysis{
      background:rgba(255,255,255,.04);border-radius:5px;
      padding:5px 12px;margin:3px 0;font-size:12.5px;
    }

    /* BULLET / LISTE */
    .bullet{
      padding:3px 0 3px 20px;color:#cbd5e1;
      font-size:12.5px;position:relative;
    }
    .bullet::before{content:'›';position:absolute;left:6px;color:#6366f1;font-weight:700}

    p{color:#cbd5e1;font-size:12.5px;margin:4px 0}
    hr{border:0;border-top:1px solid rgba(255,255,255,.1);margin:14px 0}
    strong{color:#f1f5f9;font-weight:700}
    code{background:rgba(255,255,255,.1);padding:1px 6px;border-radius:4px;font-family:monospace;font-size:.9em}
    .spacer{height:6px}

    /* RÉPONSES ÉLÈVE */
    .answers-block{
      background:#1e3a5f;border:1px solid #3b82f6;
      border-radius:10px;padding:14px 18px;margin-bottom:24px;
    }
    .answers-block summary{
      font-weight:700;color:#93c5fd;cursor:pointer;
      font-size:13px;margin-bottom:8px;
    }
    .answers-block pre{
      white-space:pre-wrap;font-family:inherit;
      font-size:12px;color:#cbd5e1;line-height:1.7;
    }

    /* FOOTER */
    .footer{
      margin-top:48px;padding-top:12px;
      border-top:1px solid rgba(255,255,255,.08);
      text-align:center;color:rgba(255,255,255,.25);font-size:10.5px;
    }

    @media print{
      .print-bar{display:none!important}
      .wrap{padding:12px 20px}
      div[style*="border-radius:10px"][style*="inline-block"]{page-break-inside:avoid}
      svg{max-width:100%!important}
    }
  `

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Correction — ${esc(exam.title)}</title>
<style>${css}</style>
</head>
<body>
<div class="wrap">

  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">🖨 Imprimer / Enregistrer en PDF</button>
    <span class="print-hint">Dans la boîte d'impression → <strong style="color:rgba(255,255,255,.6)">Enregistrer en PDF</strong> · Activez <strong style="color:rgba(255,255,255,.6)">« Couleurs de fond »</strong></span>
  </div>

  <div class="doc-title">
    <h1>${esc(exam.title)}</h1>
    <div class="sub">Correction IA détaillée · ${exam.totalPoints}/20 pts · ${new Date().toLocaleDateString('fr-FR')}</div>
  </div>

  ${answersHtml}

  ${bodyHtml}

  <div class="footer">MathAI Coach — Correction générée par IA — ${esc(exam.title)}</div>
</div>
</body>
</html>`
}

function openCorrectionPdf(
  exam: GeneratedExam,
  correctionText: string,
  studentAnswers: string
) {
  const html = buildCorrectionHtml(exam, correctionText, studentAnswers)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const win  = window.open(url, '_blank')
  if (!win) {
    // Popup bloqué → télécharger le fichier HTML
    const a = document.createElement('a')
    a.href = url
    a.download = `Correction-${exam.title.replace(/[^\w-]/g,'-')}.html`
    a.click()
  }
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}



// ── Rendu Markdown minimaliste (sans graphiques) ──────────────────
function MDLines({ text }: { text: string; [key: string]: any }) {
  return (
    <div style={{lineHeight:1.85,color:'rgba(255,255,255,0.8)',fontSize:14}}>
      {text.split('\n').map((ln,i)=>{
        if(!ln.trim()) return <div key={i} style={{height:6}}/>
        if(ln.startsWith('## ')) return <h3 key={i} style={{fontSize:15,fontWeight:700,color:'#a5b4fc',marginTop:20,marginBottom:8,borderBottom:'1px solid rgba(99,102,241,0.2)',paddingBottom:6}}>{ln.slice(3)}</h3>
        if(ln.startsWith('### ')) return <h4 key={i} style={{fontSize:14,fontWeight:700,color:'#e2e8f0',marginTop:14,marginBottom:6}}>{ln.slice(4)}</h4>
        if(ln.startsWith('- ')) return <p key={i} style={{margin:'3px 0',paddingLeft:16,position:'relative',fontSize:13,color:'rgba(255,255,255,0.75)'}}>
          <span style={{position:'absolute',left:0,color:'#6366f1'}}>›</span>{ln.slice(2)}
        </p>
        if(ln.match(/^\d+\.\s/)) return <p key={i} style={{margin:'4px 0',paddingLeft:22,fontSize:13,position:'relative'}}>
          <strong style={{position:'absolute',left:0,color:'#6366f1'}}>{ln.split(/\.\s/)[0]}.</strong>
          {ln.replace(/^\d+\.\s/,'')}
        </p>
        const boldParsed = ln.replace(/\*\*(.+?)\*\*/g,'<strong style="color:#e2e8f0;font-weight:700">$1</strong>')
        return <p key={i} style={{margin:'2px 0',fontSize:13}} dangerouslySetInnerHTML={{__html:boldParsed}}/>
      })}
    </div>
  )
}

// ── Bouton principal ──────────────────────────────────────────────
function MD({ text }: { text: string }) {
  return <TextWithGraphs text={text} />
}


function PrimaryBtn({ onClick, disabled=false, loading=false, children, fullWidth=false, style: extraStyle }: {
  onClick:()=>void; disabled?:boolean; loading?:boolean; children:React.ReactNode; fullWidth?:boolean; style?:React.CSSProperties
}) {
  return (
    <button onClick={onClick} disabled={disabled||loading}
      style={{
        display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,
        padding:'14px 28px',borderRadius:14,border:'none',cursor:disabled?'not-allowed':'pointer',
        fontSize:14,fontWeight:700,letterSpacing:'0.02em',
        background:disabled?'rgba(255,255,255,0.07)':'linear-gradient(135deg,#6366f1,#8b5cf6)',
        color:disabled?'rgba(255,255,255,0.3)':'white',
        boxShadow:disabled?'none':'0 8px 24px rgba(99,102,241,0.45)',
        width:fullWidth?'100%':'auto',
        transition:'all 0.2s',
        transform:'translateY(0)',
        ...(!disabled && extraStyle ? extraStyle : {}),
      }}
      onMouseEnter={e=>{if(!disabled)e.currentTarget.style.transform='translateY(-2px)'}}
      onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)'}}>
      {loading && <span style={{width:16,height:16,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',animation:'spin 0.7s linear infinite',flexShrink:0}}/>}
      {children}
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════
// CHAPITRES PAR SECTION — Programme officiel CNP Tunisie
// Source : pages bac/maths, bac/sciences-exp, bac/sciences-tech,
//          bac/informatique, bac/eco-gestion
// ═══════════════════════════════════════════════════════════════════
const CHAPITRES_PAR_SECTION: Record<string, {
  key: string; label: string; color: string; icon: string
  chapitres: { slug: string; titre: string; badge: string; desc: string }[]
}> = {
  maths: {
    key:'maths', label:'Bac-Mathématiques', color:'#6366f1', icon:'∑',
    chapitres: [
      { slug:'limites',              titre:'Continuité et Limites',           badge:'Analyse',   desc:'Limites finies/infinies, TVI, asymptotes, point fixe, prolongement par continuité.' },
      { slug:'suites',               titre:'Suites Réelles',                  badge:'Analyse',   desc:'Suites arithmétiques/géométriques, convergence, suite monotone bornée, suites adjacentes, récurrentes.' },
      { slug:'derivabilite',         titre:'Dérivabilité',                    badge:'Analyse',   desc:'Dérivées usuelles, règles, Rolle, TAF, convexité, règle de L\'Hôpital.' },
      { slug:'fonctions-reciproques',titre:'Fonctions réciproques',           badge:'Analyse',   desc:'Bijections, réciproque, arcsin, arccos, arctan, dérivées des réciproques.' },
      { slug:'primitives',           titre:'Primitives et Intégrales',        badge:'Analyse',   desc:'Primitives usuelles, intégrale de Riemann, IPP, changement de variable, aires.' },
      { slug:'complexes',            titre:'Nombres Complexes',               badge:'Algèbre',   desc:'Formes algébrique/trig/expo, module, argument, Moivre, racines n-ièmes, géométrie complexe.' },
      { slug:'isometries',           titre:'Isométries du plan',              badge:'Géométrie', desc:'Déplacements, translations, rotations, symétries axiales. Classification directes/indirectes.' },
      { slug:'deplacements',         titre:'Déplacements et Antidéplacements',badge:'Géométrie', desc:'Groupe des déplacements, antidéplacements, écriture complexe, décomposition en symétries.' },
      { slug:'similitudes',          titre:'Similitudes',                     badge:'Géométrie', desc:'Similitudes directes/indirectes, homothéties, point fixe, rapport, composées, applications.' },
    ],
  },
  scexp: {
    key:'scexp', label:'Sciences Expérimentales', color:'#06d6a0', icon:'⚗',
    chapitres: [
      { slug:'limites',          titre:'Continuité et Limites',    badge:'Analyse',       desc:'Limites finies et infinies, continuité, TVI, prolongement par continuité.' },
      { slug:'suites',           titre:'Suites numériques',         badge:'Analyse',       desc:'Suites arithmétiques, géométriques, convergence, monotonie, suites récurrentes.' },
      { slug:'derivabilite',     titre:'Dérivabilité',              badge:'Analyse',       desc:'Dérivées usuelles, règles de dérivation, TAF, convexité, étude de fonctions.' },
      { slug:'fonctions-reciproques', titre:'Fonctions réciproques',badge:'Analyse',       desc:'Bijections, arcsin, arccos, arctan, logarithme, exponentielle.' },
      { slug:'logarithme',       titre:'Fonction logarithme',       badge:'Analyse',       desc:'Logarithme népérien, propriétés, dérivée, étude de fonctions logarithmiques.' },
      { slug:'exponentielle',    titre:'Fonction exponentielle',    badge:'Analyse',       desc:'Exponentielle, propriétés, dérivée, étude de fonctions exponentielles.' },
      { slug:'primitives',       titre:'Primitives',                badge:'Intégration',   desc:'Primitives des fonctions usuelles, méthodes de calcul.' },
      { slug:'integrales',       titre:'Intégrales',                badge:'Intégration',   desc:'Intégrale de Riemann, calcul d\'aires et de volumes, IPP.' },
      { slug:'equations-diff',   titre:'Équations différentielles', badge:'Analyse',       desc:'Équations du 1er et 2nd ordre, résolution, applications physiques.' },
      { slug:'complexes',        titre:'Nombres complexes',         badge:'Algèbre',       desc:'Formes algébrique/trigonométrique, module, argument, formule de Moivre.' },
      { slug:'geometrie-espace', titre:'Géométrie dans l\'espace',  badge:'Géométrie',     desc:'Vecteurs, droites et plans, distances, angles, produit scalaire 3D.' },
      { slug:'probabilites',     titre:'Probabilités',              badge:'Probabilités',  desc:'Dénombrement, probabilités conditionnelles, loi binomiale, loi normale.' },
      { slug:'variables-aleatoires', titre:'Variables aléatoires',  badge:'Probabilités',  desc:'Variables discrètes/continues, espérance, variance, lois usuelles.' },
      { slug:'statistiques',     titre:'Statistiques',              badge:'Statistiques',  desc:'Statistiques descriptives, régression, corrélation, intervalles de confiance.' },
    ],
  },
  sctech: {
    key:'sctech', label:'Sciences Techniques', color:'#f59e0b', icon:'⚙',
    chapitres: [
      { slug:'limites-continuite',   titre:'Continuité et Limites',    badge:'Analyse',   desc:'Limites finies et infinies, continuité, TVI, asymptotes.' },
      { slug:'suites',               titre:'Suites Réelles',            badge:'Analyse',   desc:'Suites numériques, convergence, monotonie, récurrences.' },
      { slug:'derivabilite',         titre:'Dérivabilité',              badge:'Analyse',   desc:'Dérivées, règles, convexité, étude de fonctions.' },
      { slug:'fonctions-reciproques',titre:'Fonctions Réciproques',     badge:'Analyse',   desc:'Bijections, arcsin, arccos, arctan et leurs dérivées.' },
      { slug:'logarithme',           titre:'Logarithme Népérien',       badge:'Analyse',   desc:'Logarithme, propriétés, dérivée, étude de fonctions.' },
      { slug:'exponentielle',        titre:'Fonction Exponentielle',    badge:'Analyse',   desc:'Exponentielle, propriétés, dérivée, applications.' },
      { slug:'primitives',           titre:'Primitives',                badge:'Intégration',desc:'Primitives des fonctions usuelles.' },
      { slug:'integrales',           titre:'Calcul Intégral',           badge:'Intégration',desc:'Intégrales, calcul d\'aires, IPP, changement de variable.' },
      { slug:'complexes',            titre:'Nombres Complexes',         badge:'Algèbre',   desc:'Formes, module, argument, Moivre, racines n-ièmes.' },
      { slug:'geometrie-espace',     titre:'Géométrie dans l\'espace',  badge:'Géométrie', desc:'Vecteurs 3D, droites, plans, distances, angles.' },
      { slug:'arithmetique',         titre:'Arithmétique',              badge:'Algèbre',   desc:'Divisibilité, PGCD, PPCM, congruences, théorèmes.' },
      { slug:'probabilites',         titre:'Probabilités',              badge:'Probabilités',desc:'Probabilités conditionnelles, loi binomiale, espérance.' },
      { slug:'statistiques',         titre:'Statistiques',              badge:'Statistiques',desc:'Statistiques descriptives, régression linéaire.' },
    ],
  },
  eco: {
    key:'eco', label:'Éco-Gestion', color:'#10b981', icon:'💹',
    chapitres: [
      { slug:'logique-raisonnement',     titre:'Logique & Raisonnement',          badge:'Fondements',   desc:'Logique mathématique, raisonnement par récurrence, implication, équivalence.' },
      { slug:'limites-continuite',       titre:'Continuité & Limites',            badge:'Analyse',      desc:'Limites finies et infinies, continuité, TVI, asymptotes.' },
      { slug:'suites-numeriques',        titre:'Suites Numériques',               badge:'Analyse',      desc:'Suites arithmétiques/géométriques, convergence, suites récurrentes.' },
      { slug:'derivabilite',             titre:'Dérivabilité & Applications',     badge:'Analyse',      desc:'Dérivées, règles, convexité, étude de fonctions économiques.' },
      { slug:'primitives-integrales',    titre:'Primitives & Intégrales',         badge:'Intégration',  desc:'Primitives, intégrales, calcul d\'aires, applications économiques.' },
      { slug:'logarithme',               titre:'Logarithme Népérien',             badge:'Analyse',      desc:'Logarithme, propriétés, applications en économie/finance.' },
      { slug:'exponentielle',            titre:'Fonction Exponentielle',          badge:'Analyse',      desc:'Exponentielle, propriétés, croissance, intérêts composés.' },
      { slug:'probabilites',             titre:'Probabilités',                    badge:'Probabilités', desc:'Probabilités conditionnelles, dénombrement, loi binomiale.' },
      { slug:'statistiques',             titre:'Statistiques',                    badge:'Statistiques', desc:'Statistiques descriptives, régression, corrélation, décision.' },
      { slug:'matrices',                 titre:'Matrices & Systèmes',             badge:'Algèbre',      desc:'Matrices, opérations, déterminants, systèmes linéaires, applications.' },
      { slug:'arithmetique',             titre:'Arithmétique',                    badge:'Algèbre',      desc:'Divisibilité, PGCD, congruences, applications financières.' },
      { slug:'mathematiques-financieres',titre:'Mathématiques Financières',       badge:'Finance',      desc:'Intérêts simples/composés, actualisation, annuités, amortissement.' },
    ],
  },
  info: {
    key:'info', label:'Informatique', color:'#8b5cf6', icon:'⌨',
    chapitres: [
      { slug:'suites',          titre:'Suites réelles',                       badge:'Maths',   desc:'Suites numériques, convergence, monotonie, suites récurrentes.' },
      { slug:'limite-continuite',titre:'Limite et continuité',                badge:'Maths',   desc:'Limites finies et infinies, continuité, TVI, asymptotes.' },
      { slug:'derivabilite',    titre:'Dérivabilité & étude de fonctions',    badge:'Maths',   desc:'Dérivées, règles, convexité, étude complète de fonctions.' },
      { slug:'log-exp',         titre:'Fonctions logarithme et exponentielle',badge:'Maths',   desc:'Logarithme et exponentielle, propriétés, dérivées, applications.' },
      { slug:'calcul-integral', titre:'Calcul intégral & primitives',         badge:'Maths',   desc:'Primitives, intégrales, calcul d\'aires, IPP.' },
      { slug:'complexes',       titre:'Nombres complexes',                    badge:'Maths',   desc:'Formes, module, argument, Moivre, racines n-ièmes.' },
      { slug:'probabilites',    titre:'Probabilités sur un ensemble fini',    badge:'Maths',   desc:'Dénombrement, probabilités conditionnelles, loi binomiale.' },
      { slug:'statistiques',    titre:'Statistiques',                         badge:'Maths',   desc:'Statistiques descriptives, régression, corrélation.' },
    ],
  },
}

// ── Fonction génération examen par chapitres ──────────────────────
async function generateChapterExam(
  chapitres: { titre: string; badge: string; desc: string }[],
  sectionKey: string,
  sectionLabel: string,
  idx: number
): Promise<GeneratedExam> {
  const chapList = chapitres.map((c, i) => `Exercice ${i+1} — ${c.titre} (${c.badge}) : ${c.desc}`).join('\n')
  const totalPts = 20
  const nEx = Math.max(chapitres.length, 3)

  const system = `Tu es un auteur expert de sujets du Baccalauréat tunisien (programme CNP officiel).
Tu crées des sujets ORIGINAUX, réalistes, avec de vraies données numériques.
RÉPONDS UNIQUEMENT EN JSON VALIDE, sans backticks ni commentaires.`

  const prompt = `Crée un sujet de Bac ORIGINAL variante ${idx+1} centré sur CES CHAPITRES PRÉCIS :
${chapList}

Section : ${sectionLabel}
Total : ${totalPts} points répartis sur ${nEx} exercices (un exercice par chapitre sélectionné).

Règles STRICTES :
- Chaque exercice DOIT porter EXCLUSIVEMENT sur le chapitre assigné ci-dessus
- Niveau Bac Tunisien officiel — vraies données numériques précises
- Chaque exercice a des sous-parties 1), 2), 3)...
- Pour tout exercice sur une fonction : graphique OBLIGATOIRE

GRAPHIQUES — FORMATS :
FORMAT 1 — COURBE : [GRAPH: {"type":"function","expressions":["2*x*Math.exp(-x)"],"xMin":-1,"xMax":5,"labels":["f(x)"],"title":"Courbe de f"}]
FORMAT 2 — GÉOMÉTRIE : [GRAPH: {"type":"geometry","title":"Titre","shapes":[{"type":"axes","step":1},{"type":"triangle","points":[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":1,"y":3,"label":"C"}]}]}]
RÈGLES : champ "graph" SÉPARÉ du "statement" · JAMAIS x^2 → x*x · JAMAIS 2x → 2*x

Réponds EXACTEMENT avec ce JSON :
{
  "title": "${sectionLabel} — Simulation Chapitres Variante ${idx+1}",
  "section": "${sectionLabel}",
  "duration": 180,
  "totalPoints": ${totalPts},
  "exercises": [
${chapitres.map((c,i)=>`    {
      "num": ${i+1},
      "title": "Exercice ${i+1} — ${c.titre}",
      "theme": "${c.titre}",
      "points": ${Math.round(totalPts/chapitres.length)},
      "graph": null,
      "statement": "Énoncé complet sur ${c.titre}. Minimum 120 mots. Sous-parties numérotées 1), 2), 3)."
    }`).join(',\n')}
  ]
}`

  const raw = await askClaude(prompt, system, 6000)
  const parsed = parseJSON<Omit<GeneratedExam,'id'|'index'>>(raw, {
    title:`${sectionLabel} — Chapitres Variante ${idx+1}`,
    section:sectionLabel, duration:180, totalPoints:totalPts,
    exercises: chapitres.map((c,i)=>({num:i+1,title:`Exercice ${i+1} — ${c.titre}`,theme:c.titre,points:Math.round(totalPts/chapitres.length),statement:'Erreur de génération — réessayez.'}))
  })
  return { ...parsed, id:`ch-exam-${idx}-${Date.now()}`, index:idx }
}

// ═══════════════════════════════════════════════════════════════════
// PHASE 1 — SÉLECTION DES SOURCES (3 onglets)
// ═══════════════════════════════════════════════════════════════════
function PhaseSelect({ onStart }: {
  onStart:(archives:Archive[], customText:string, chapitres?:{titre:string;badge:string;desc:string}[], sectionLabel?:string)=>void
}) {
  const [tab, setTab] = useState<'archive'|'chapitre'|'import'>('archive')
  const searchParams = useSearchParams()

  // ── Onglet Archives ──
  const [filterSection, setFilterSection] = useState(() => {
    const sec = searchParams.get('section')
    const map: Record<string,string> = { 'maths':'maths','sc-exp':'scexp','sc-tech':'sctech','info':'info','eco':'eco' }
    return sec && map[sec] ? map[sec] : 'all'
  })
  const [filterYear, setFilterYear]       = useState('all')
  const [filterSession, setFilterSession] = useState('all')
  const [selected, setSelected]           = useState<Archive[]>([])
  const [customText, setCustomText]       = useState('')
  const [fileName, setFileName]           = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // ── Onglet Par Chapitre ──
  const [chapSection, setChapSection] = useState<string>(() => {
    const sec = searchParams.get('section')
    const map: Record<string,string> = { 'maths':'maths','sc-exp':'scexp','sc-tech':'sctech','info':'info','eco':'eco' }
    return sec && map[sec] ? map[sec] : 'maths'
  })
  const [selectedChaps, setSelectedChaps] = useState<{slug:string;titre:string;badge:string;desc:string}[]>([])

  const filtered = ARCHIVES.filter(a=>
    (filterSection==='all'||a.sectionKey===filterSection) &&
    (filterYear==='all'||a.year===Number(filterYear)) &&
    (filterSession==='all'||a.session===filterSession)
  )

  const toggle = (a:Archive) => {
    if(selected.find(s=>s.id===a.id)) setSelected(p=>p.filter(s=>s.id!==a.id))
    else if(selected.length<3) setSelected(p=>[...p,a])
  }

  const toggleChap = (ch:{slug:string;titre:string;badge:string;desc:string}) => {
    if(selectedChaps.find(c=>c.slug===ch.slug)) setSelectedChaps(p=>p.filter(c=>c.slug!==ch.slug))
    else if(selectedChaps.length<3) setSelectedChaps(p=>[...p,ch])
  }

  const handleFile = (e:React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if(!f) return
    setFileName(f.name)
    if(f.type==='text/plain') {
      const r=new FileReader()
      r.onload=ev=>setCustomText(ev.target?.result as string||'')
      r.readAsText(f)
    } else {
      setCustomText(`[Fichier importé : ${f.name} — ${(f.size/1024).toFixed(0)} Ko]`)
    }
  }

  const canStartArchive = selected.length>0 || customText.trim().length>20
  const canStartChap    = selectedChaps.length>=1 && selectedChaps.length<=3
  const currentSecData  = CHAPITRES_PAR_SECTION[chapSection]

  const BADGE_COLORS: Record<string,string> = {
    'Analyse':'#6366f1','Algèbre':'#8b5cf6','Géométrie':'#06d6a0',
    'Intégration':'#10b981','Probabilités':'#f59e0b','Statistiques':'#f97316',
    'Finance':'#ec4899','Fondements':'#a78bfa','Maths':'#6366f1',
  }

  return (
    <div>
      {/* Info banner */}
      <div style={{padding:'16px 20px',background:'rgba(99,102,241,0.1)',border:'1px solid rgba(99,102,241,0.25)',borderRadius:14,marginBottom:24,display:'flex',gap:14,alignItems:'flex-start'}}>
        <span style={{fontSize:22,flexShrink:0}}>💡</span>
        <div>
          <p style={{margin:'0 0 4px',fontWeight:700,fontSize:14,color:'#e2e8f0'}}>Deux modes de simulation</p>
          <p style={{margin:0,fontSize:13,color:'rgba(255,255,255,0.6)',lineHeight:1.7}}>
            <strong style={{color:'#a5b4fc'}}>Archives</strong> — basé sur les vrais examens Bac 2015–2025 ·
            <strong style={{color:'#6ee7b7'}}> Par Chapitre</strong> — cible jusqu'à 3 chapitres de ton choix selon la section
          </p>
        </div>
      </div>

      {/* Tabs — 3 onglets */}
      <div style={{display:'flex',gap:4,marginBottom:24,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:12,padding:4,width:'fit-content'}}>
        {([
          ['archive','🗂️ Archives officielles'],
          ['chapitre','📚 Par Chapitre'],
          ['import','📁 Importer'],
        ] as const).map(([k,lbl])=>(
          <button key={k} onClick={()=>setTab(k)}
            style={{padding:'10px 20px',borderRadius:9,border:'none',cursor:'pointer',fontWeight:600,fontSize:13,transition:'all 0.2s',fontFamily:'inherit',
              background:tab===k
                ? k==='chapitre'
                  ? 'linear-gradient(135deg,#06d6a0,#059669)'
                  : 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                : 'transparent',
              color:tab===k?'white':'rgba(255,255,255,0.45)',
              boxShadow:tab===k?'0 4px 14px rgba(99,102,241,0.45)':'none'}}>
            {lbl}
          </button>
        ))}
      </div>

      {/* ── ONGLET ARCHIVES ── */}
      {tab==='archive' && (
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:12}}>
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <span style={{fontSize:13,color:'rgba(255,255,255,0.55)'}}>
                <strong style={{color:'#a5b4fc',fontSize:16}}>{selected.length}</strong>/3 sélectionné{selected.length>1?'s':''}
              </span>
              {selected.length>0&&<button onClick={()=>setSelected([])} style={{fontSize:11,padding:'3px 10px',borderRadius:6,border:'1px solid rgba(255,255,255,0.12)',background:'transparent',color:'rgba(255,255,255,0.4)',cursor:'pointer'}}>Effacer</button>}
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {([
                ['filterSection','Section',['all',...SECTION_CONFIGS.map(s=>s.key)],['Toutes',...SECTION_CONFIGS.map(s=>s.label.split(' ')[0])]],
                ['filterYear','Année',['all',...YEARS.map(String)],['Toutes',...YEARS.map(String)]],
                ['filterSession','Session',['all','Principale','Contrôle'],['Les 2','Principale','Contrôle']],
              ] as [string,string,string[],string[]][]).map(([id,,vals,labels])=>(
                <select key={id}
                  value={id==='filterSection'?filterSection:id==='filterYear'?filterYear:filterSession}
                  onChange={e=>{ if(id==='filterSection')setFilterSection(e.target.value); else if(id==='filterYear')setFilterYear(e.target.value); else setFilterSession(e.target.value); }}
                  style={{fontSize:12,padding:'7px 12px',borderRadius:9,border:'1px solid rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.8)',cursor:'pointer',outline:'none'}}>
                  {vals.map((v,i)=><option key={v} value={v} style={{background:'#1a1a2e'}}>{labels[i]}</option>)}
                </select>
              ))}
            </div>
          </div>
          {selected.length>0&&(
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:16,padding:'12px 14px',background:'rgba(99,102,241,0.08)',borderRadius:12,border:'1px solid rgba(99,102,241,0.2)'}}>
              {selected.map(a=>(
                <span key={a.id} style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:12,fontWeight:600,padding:'5px 12px',borderRadius:20,background:`${a.color}22`,color:a.color,border:`1px solid ${a.color}40`}}>
                  {a.icon} {a.section.split(' ')[0]} {a.year} · {a.session}
                  <button onClick={()=>toggle(a)} style={{background:'transparent',border:'none',cursor:'pointer',color:a.color,fontSize:15,lineHeight:1,padding:'0 0 0 2px',opacity:.8}}>×</button>
                </span>
              ))}
            </div>
          )}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(172px,1fr))',gap:10,maxHeight:440,overflowY:'auto',paddingRight:2}}>
            {filtered.map(a=>{
              const sel = !!selected.find(s=>s.id===a.id)
              const blocked = !sel && selected.length>=3
              return (
                <div key={a.id} onClick={()=>!blocked&&toggle(a)}
                  style={{padding:'14px 15px',borderRadius:12,cursor:blocked?'not-allowed':'pointer',
                    background:sel?`${a.color}18`:'rgba(255,255,255,0.04)',
                    border:sel?`2px solid ${a.color}`:'1px solid rgba(255,255,255,0.08)',
                    opacity:blocked?0.4:1,transition:'all 0.18s',position:'relative',
                    boxShadow:sel?`0 4px 20px ${a.color}35`:'none'}}
                  onMouseEnter={e=>{if(!blocked&&!sel)e.currentTarget.style.borderColor='rgba(255,255,255,0.22)'}}
                  onMouseLeave={e=>{if(!sel)e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'}}>
                  {sel&&<div style={{position:'absolute',top:8,right:8,width:20,height:20,borderRadius:'50%',background:a.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'white',fontWeight:800}}>✓</div>}
                  <div style={{fontSize:22,marginBottom:6,opacity:0.9}}>{a.icon}</div>
                  <div style={{fontSize:11,fontWeight:700,color:a.color,marginBottom:3,lineHeight:1.3}}>{a.section.replace('Bac ','').replace('Sciences ','Sc.')}</div>
                  <div style={{fontWeight:800,fontSize:20,color:'rgba(255,255,255,0.9)',fontVariantNumeric:'tabular-nums'}}>{a.year}</div>
                  <div style={{fontSize:10,marginTop:4,color:'rgba(255,255,255,0.35)',display:'flex',alignItems:'center',gap:4}}>
                    <span>{a.session==='Principale'?'📌':'🔄'}</span>{a.session}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{marginTop:28,display:'flex',justifyContent:'flex-end',alignItems:'center',gap:16,flexWrap:'wrap'}}>
            {canStartArchive&&<p style={{fontSize:12,color:'rgba(255,255,255,0.4)',margin:0}}>
              L'IA va créer <strong style={{color:'#a5b4fc'}}>10 examens originaux</strong> en quelques secondes
            </p>}
            <PrimaryBtn onClick={()=>canStartArchive&&onStart(selected,customText)} disabled={!canStartArchive}>
              🧠 Générer mes examens →
            </PrimaryBtn>
          </div>
        </div>
      )}

      {/* ── ONGLET PAR CHAPITRE ── */}
      {tab==='chapitre' && (
        <div>
          {/* Sélecteur de section */}
          <div style={{marginBottom:20}}>
            <p style={{fontSize:12,color:'rgba(255,255,255,0.5)',marginBottom:10,textTransform:'uppercase',letterSpacing:'0.06em',fontWeight:600}}>
              1 — Choisir la section
            </p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {Object.values(CHAPITRES_PAR_SECTION).map(sec=>(
                <button key={sec.key} onClick={()=>{setChapSection(sec.key);setSelectedChaps([])}}
                  style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 16px',borderRadius:10,cursor:'pointer',fontWeight:600,fontSize:13,transition:'all 0.2s',fontFamily:'inherit',
                    background:chapSection===sec.key?`${sec.color}25`:'rgba(255,255,255,0.04)',
                    border:`1px solid ${chapSection===sec.key?sec.color:'rgba(255,255,255,0.1)'}`,
                    color:chapSection===sec.key?sec.color:'rgba(255,255,255,0.55)',
                    boxShadow:chapSection===sec.key?`0 0 20px ${sec.color}30`:'none'}}>
                  <span style={{fontSize:16}}>{sec.icon}</span>
                  {sec.label.replace('Bac-','').replace('Sciences-','Sc.')}
                </button>
              ))}
            </div>
          </div>

          {/* Compteur chapitres sélectionnés */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <p style={{fontSize:12,color:'rgba(255,255,255,0.5)',margin:0,textTransform:'uppercase',letterSpacing:'0.06em',fontWeight:600}}>
              2 — Sélectionner jusqu'à 3 chapitres
            </p>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span style={{fontSize:13,color:'rgba(255,255,255,0.55)'}}>
                <strong style={{color:currentSecData?.color,fontSize:16}}>{selectedChaps.length}</strong>/3 chapitre{selectedChaps.length>1?'s':''}
              </span>
              {selectedChaps.length>0&&(
                <button onClick={()=>setSelectedChaps([])} style={{fontSize:11,padding:'3px 10px',borderRadius:6,border:'1px solid rgba(255,255,255,0.12)',background:'transparent',color:'rgba(255,255,255,0.4)',cursor:'pointer'}}>
                  Effacer
                </button>
              )}
            </div>
          </div>

          {/* Tags sélectionnés */}
          {selectedChaps.length>0&&(
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:16,padding:'12px 14px',background:`${currentSecData?.color}10`,borderRadius:12,border:`1px solid ${currentSecData?.color}30`}}>
              {selectedChaps.map(c=>{
                const col = BADGE_COLORS[c.badge]||currentSecData?.color||'#6366f1'
                return (
                  <span key={c.slug} style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:12,fontWeight:600,padding:'5px 12px',borderRadius:20,background:`${col}22`,color:col,border:`1px solid ${col}40`}}>
                    📚 {c.titre}
                    <button onClick={()=>toggleChap(c)} style={{background:'transparent',border:'none',cursor:'pointer',color:col,fontSize:15,lineHeight:1,padding:'0 0 0 2px',opacity:.8}}>×</button>
                  </span>
                )
              })}
            </div>
          )}

          {/* Grille chapitres */}
          {currentSecData && (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:10,maxHeight:480,overflowY:'auto',paddingRight:2}}>
              {currentSecData.chapitres.map(ch=>{
                const sel = !!selectedChaps.find(c=>c.slug===ch.slug)
                const blocked = !sel && selectedChaps.length>=3
                const col = BADGE_COLORS[ch.badge]||currentSecData.color
                return (
                  <div key={ch.slug} onClick={()=>!blocked&&toggleChap(ch)}
                    style={{padding:'16px',borderRadius:12,cursor:blocked?'not-allowed':'pointer',
                      background:sel?`${col}18`:'rgba(255,255,255,0.04)',
                      border:sel?`2px solid ${col}`:'1px solid rgba(255,255,255,0.08)',
                      opacity:blocked?0.4:1,transition:'all 0.18s',position:'relative',
                      boxShadow:sel?`0 4px 20px ${col}35`:'none'}}
                    onMouseEnter={e=>{if(!blocked&&!sel){e.currentTarget.style.borderColor='rgba(255,255,255,0.22)';e.currentTarget.style.background='rgba(255,255,255,0.06)'}}}
                    onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';e.currentTarget.style.background='rgba(255,255,255,0.04)'}}}>
                    {sel&&<div style={{position:'absolute',top:8,right:8,width:20,height:20,borderRadius:'50%',background:col,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'white',fontWeight:800}}>✓</div>}
                    <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:8}}>
                      <span style={{fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:6,background:`${col}20`,color:col,border:`1px solid ${col}40`}}>{ch.badge}</span>
                    </div>
                    <div style={{fontWeight:700,fontSize:13,color:'rgba(255,255,255,0.9)',marginBottom:6,lineHeight:1.35}}>{ch.titre}</div>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',lineHeight:1.5}}>{ch.desc}</div>
                  </div>
                )
              })}
            </div>
          )}

          {/* CTA chapitre */}
          <div style={{marginTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap',paddingTop:16,borderTop:'1px solid rgba(255,255,255,0.07)'}}>
            {canStartChap ? (
              <p style={{fontSize:12,color:'rgba(255,255,255,0.4)',margin:0}}>
                Examen centré sur : <strong style={{color:currentSecData?.color}}>
                  {selectedChaps.map(c=>c.titre).join(' · ')}
                </strong>
              </p>
            ) : (
              <p style={{fontSize:12,color:'rgba(255,255,255,0.3)',margin:0}}>Sélectionne entre 1 et 3 chapitres</p>
            )}
            <PrimaryBtn
              onClick={()=>canStartChap&&onStart([],`Chapitres : ${selectedChaps.map(c=>c.titre).join(', ')}`,selectedChaps,currentSecData?.label)}
              disabled={!canStartChap}>
              📚 Générer l'examen par chapitre →
            </PrimaryBtn>
          </div>
        </div>
      )}

      {/* ── ONGLET IMPORTER ── */}
      {tab==='import' && (
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div onClick={()=>fileRef.current?.click()}
            style={{border:'2px dashed rgba(99,102,241,0.4)',borderRadius:16,padding:'40px 30px',textAlign:'center',cursor:'pointer',background:fileName?'rgba(16,185,129,0.06)':'rgba(99,102,241,0.04)',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(99,102,241,0.7)';e.currentTarget.style.background='rgba(99,102,241,0.08)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(99,102,241,0.4)';e.currentTarget.style.background=fileName?'rgba(16,185,129,0.06)':'rgba(99,102,241,0.04)'}}>
            <input ref={fileRef} type="file" accept=".txt,.pdf,.png,.jpg" onChange={handleFile} style={{display:'none'}}/>
            {fileName ? (
              <><div style={{fontSize:38,marginBottom:10}}>✅</div>
              <p style={{fontWeight:700,color:'#6ee7b7',fontSize:15,margin:'0 0 4px'}}>{fileName}</p>
              <p style={{fontSize:12,color:'rgba(255,255,255,0.4)',margin:0}}>Cliquez pour changer de fichier</p></>
            ) : (
              <><div style={{fontSize:42,marginBottom:10}}>📁</div>
              <p style={{fontWeight:700,fontSize:15,color:'rgba(255,255,255,0.8)',margin:'0 0 6px'}}>Déposez votre fichier</p>
              <p style={{fontSize:12,color:'rgba(255,255,255,0.4)',margin:0}}>PDF, image (JPG/PNG) ou texte — exercice ou examen complet</p></>
            )}
          </div>
          <div style={{position:'relative'}}>
            <p style={{fontSize:12,color:'rgba(255,255,255,0.35)',textAlign:'center',margin:'0 0 10px',textTransform:'uppercase',letterSpacing:'0.08em'}}>ou collez votre texte</p>
            <textarea value={customText} onChange={e=>setCustomText(e.target.value)}
              placeholder="Copiez-collez ici votre exercice, énoncé de cours, ou examen..."
              style={{width:'100%',height:160,padding:'14px 16px',borderRadius:12,border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.85)',fontSize:13,resize:'vertical',outline:'none',fontFamily:'inherit',lineHeight:1.7,boxSizing:'border-box',transition:'border 0.2s'}}
              onFocus={e=>e.target.style.borderColor='rgba(99,102,241,0.5)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
          </div>
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <PrimaryBtn onClick={()=>(customText.trim().length>20||fileName)&&onStart([],customText)} disabled={customText.trim().length<=20&&!fileName}>
              🧠 Générer mes examens →
            </PrimaryBtn>
          </div>
        </div>
      )}
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════
// PHASE 2 — GÉNÉRATION EN COURS
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// PHASE 2 — GÉNÉRATION EN COURS (quota via Supabase AuthContext)
// ═══════════════════════════════════════════════════════════════════
function PhaseGenerating({ archives, customText, onDone }: {
  archives:Archive[]; customText:string; onDone:(exams:GeneratedExam[])=>void
}) {
  const { isAdmin, isSprint, checkQuota, incrementQuota, quotas, quotaLimits } = useAuth()

  const [exams, setExams] = useState<GeneratedExam[]>([])
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [currentIdx, setCurrentIdx] = useState(0)
  const started = useRef(false)

  // Quota depuis Supabase
  const simUsed      = quotas?.simulations_used || 0
  const simLimit     = quotaLimits.simulations_per_week  // -1 = illimité
  const isUnlimited  = isAdmin || simLimit === -1
  const simRemaining = isUnlimited ? 999 : Math.max(0, simLimit - simUsed)
  const limitReached = !isUnlimited && simUsed >= simLimit
  const maxExams     = isUnlimited ? 10 : simRemaining  // max examens générables cette session
  const canStart     = exams.length > 0

  const generateNext = useCallback(async (idx: number) => {
    setGenerating(true)
    setError('')
    try {
      const exam = await generateOneExam(archives, customText, idx)
      setExams(prev => [...prev, exam])
      setCurrentIdx(idx + 1)
      // Incrémenter quota dans Supabase
      await incrementQuota('simulations')
    } catch(e) {
      setError('Erreur lors de la generation. Verifiez votre connexion.')
    }
    setGenerating(false)
  }, [archives, customText, incrementQuota])

  // Générer le premier automatiquement au montage
  useEffect(() => {
    if (started.current) return
    started.current = true
    if (!isAdmin && !checkQuota('simulations')) return
    generateNext(0)
  }, [])

  return (
    <div>
      <div style={{marginBottom:28}}>
        <h3 style={{margin:'0 0 6px',fontSize:20,color:'#e2e8f0'}}>Generation de vos examens IA</h3>
        <p style={{margin:0,color:'rgba(255,255,255,0.45)',fontSize:14}}>
          Chaque examen est unique et original. Commencez des le premier ou generez-en plusieurs.
        </p>
      </div>

      {/* Grille des examens generes */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:14,marginBottom:24,minHeight:100}}>
        {exams.map((ex, i) => {
          const colors = ['#6366f1','#10b981','#f59e0b','#8b5cf6','#ec4899','#06b6d4','#f97316','#84cc16','#a855f7','#0ea5e9']
          const c = colors[i % colors.length]
          return (
            <div key={ex.id}
              style={{padding:'18px 20px',background:'rgba(255,255,255,0.05)',border:`1px solid ${c}40`,borderRadius:14,animation:'fadeSlideIn 0.4s ease forwards',opacity:0,animationDelay:`${i*0.05}s`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div style={{width:32,height:32,borderRadius:8,background:`${c}20`,border:`1px solid ${c}50`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,color:c}}>#{i+1}</div>
                <span style={{fontSize:11,color:c,background:`${c}15`,padding:'3px 10px',borderRadius:8,fontWeight:700}}>{ex.totalPoints}/20</span>
              </div>
              <p style={{margin:'0 0 8px',fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.85)',lineHeight:1.3}}>{ex.title.split('—')[1]?.trim()||ex.title}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                {ex.exercises.map((e,j)=>(
                  <span key={j} style={{fontSize:10,padding:'2px 7px',borderRadius:5,background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.4)'}}>{e.theme}</span>
                ))}
              </div>
              <div style={{marginTop:10,fontSize:11,color:'#6ee7b7',fontWeight:600}}>✓ Pret</div>
            </div>
          )
        })}

        {/* Carte "en cours" */}
        {generating && (
          <div style={{padding:'18px 20px',background:'rgba(99,102,241,0.06)',border:'1px dashed rgba(99,102,241,0.3)',borderRadius:14,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,minHeight:130}}>
            <div style={{width:36,height:36,borderRadius:'50%',border:'3px solid rgba(99,102,241,0.2)',borderTopColor:'#6366f1',animation:'spin 0.8s linear infinite'}}/>
            <p style={{margin:0,fontSize:12,color:'rgba(255,255,255,0.4)',textAlign:'center'}}>Generation de l&apos;examen {currentIdx+1}...</p>
          </div>
        )}

        {/* Badge quota Supabase */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,marginBottom:8,flexWrap:'wrap'}}>
          {!isAdmin && (
            <div style={{fontSize:12,color:limitReached?'rgba(239,68,68,0.8)':simRemaining<=1?'rgba(245,158,11,0.8)':'rgba(255,255,255,0.4)'}}>
              {limitReached
                ? <span>🔒 Quota atteint — renouvellement lundi · <a href="/abonnement" style={{color:'#f59e0b',textDecoration:'none',fontWeight:700}}>Sprint Bac →</a></span>
                : isSprint
                  ? `🔥 Sprint Bac — ${simRemaining} simulation${simRemaining>1?'s':''} restante${simRemaining>1?'s':''}`
                  : `${simRemaining} simulation${simRemaining>1?'s':''} restante${simRemaining>1?'s':''} cette semaine`
              }
            </div>
          )}
          {isAdmin && <div style={{fontSize:12,color:'#6ee7b7'}}>✓ Admin — illimité</div>}
        </div>

        {/* Carte "générer suivant" */}
        {!generating && exams.length < maxExams && exams.length > 0 && !limitReached && (
          <div
            onClick={() => generateNext(currentIdx)}
            style={{padding:'18px 20px',background:'rgba(255,255,255,0.02)',border:'1px dashed rgba(255,255,255,0.12)',borderRadius:14,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,cursor:'pointer',minHeight:130,transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(99,102,241,0.4)';e.currentTarget.style.background='rgba(99,102,241,0.06)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';e.currentTarget.style.background='rgba(255,255,255,0.02)'}}>
            <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(99,102,241,0.15)',border:'1px solid rgba(99,102,241,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,color:'#a5b4fc'}}>+</div>
            <p style={{margin:0,fontSize:12,color:'rgba(255,255,255,0.4)',textAlign:'center',lineHeight:1.5}}>
              Generer examen #{exams.length+1}<br/>
              <span style={{fontSize:10,color:'rgba(255,255,255,0.25)'}}>{maxExams - exams.length} restant{maxExams-exams.length>1?'s':''}</span>
            </p>
          </div>
        )}

        {/* Limite atteinte */}
        {!generating && (exams.length >= maxExams || limitReached) && (
          <div style={{padding:'18px 20px',background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.25)',borderRadius:14,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,minHeight:130}}>
            <div style={{fontSize:28}}>✅</div>
            <p style={{margin:0,fontSize:12,color:'#6ee7b7',textAlign:'center',fontWeight:600}}>
              {limitReached ? `Quota atteint — ${simLimit} simulations/semaine` : `${exams.length} simulation${exams.length>1?'s':''} générée${exams.length>1?'s':''}`}
            </p>
            <p style={{margin:0,fontSize:10,color:'rgba(255,255,255,0.3)',textAlign:'center'}}>
              Renouvellement lundi prochain
            </p>
          </div>
        )}
      </div>

      {/* Erreur */}
      {error && (
        <div style={{marginBottom:16,padding:'12px 16px',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:10,display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
          <span style={{fontSize:13,color:'#fca5a5'}}>⚠️ {error}</span>
          <button onClick={()=>generateNext(currentIdx)}
            style={{fontSize:12,padding:'5px 12px',borderRadius:7,border:'1px solid rgba(239,68,68,0.4)',background:'transparent',color:'#fca5a5',cursor:'pointer',fontFamily:'inherit',flexShrink:0}}>
            Reessayer
          </button>
        </div>
      )}

      {/* Boutons action */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,paddingTop:4,borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <p style={{margin:0,fontSize:13,color:'rgba(255,255,255,0.35)'}}>
          {exams.length} simulation{exams.length>1?'s':''} prête{exams.length>1?'s':''}
          {!limitReached && simRemaining>0 && ` · ${simRemaining} restante${simRemaining>1?'s':''} cette semaine`}
          {limitReached && ' · Quota hebdomadaire atteint — renouvellement lundi'}
        </p>
        <PrimaryBtn onClick={()=>onDone(exams)} disabled={!canStart}>
          {canStart ? `Choisir parmi ${exams.length} examen${exams.length>1?'s':''} →` : 'En attente...'}
        </PrimaryBtn>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(10px); }
          to { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}



function PhaseChooseExam({ exams, onChoose }: {
  exams:GeneratedExam[]; onChoose:(exam:GeneratedExam)=>void
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number|null>(null)
  const [expandedIdx, setExpandedIdx] = useState<number|null>(null)

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h3 style={{margin:'0 0 8px',fontSize:20,color:'#e2e8f0'}}>10 examens originaux générés pour vous</h3>
        <p style={{margin:0,color:'rgba(255,255,255,0.45)',fontSize:14}}>
          Chacun est unique. Survolez pour voir le contenu, puis cliquez pour démarrer l'examen.
        </p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
        {exams.map((ex,i)=>{
          const hov = hoveredIdx===i
          const exp = expandedIdx===i
          const colorDot = ['#6366f1','#10b981','#f59e0b','#8b5cf6','#ec4899','#06b6d4','#f97316','#84cc16','#a855f7','#0ea5e9'][i]
          return (
            <div key={ex.id}
              onMouseEnter={()=>setHoveredIdx(i)}
              onMouseLeave={()=>setHoveredIdx(null)}
              style={{
                background:hov?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.04)',
                border:hov?`1px solid ${colorDot}60`:'1px solid rgba(255,255,255,0.07)',
                borderRadius:16,overflow:'hidden',
                transition:'all 0.22s',
                boxShadow:hov?`0 8px 28px ${colorDot}25`:'none',
              }}>
              {/* Header carte */}
              <div style={{padding:'16px 18px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:32,height:32,borderRadius:8,background:`${colorDot}20`,border:`1px solid ${colorDot}40`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,color:colorDot}}>#{i+1}</div>
                    <span style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.6)'}}>{ex.title.split('—')[1]?.trim()||ex.title}</span>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:colorDot,background:`${colorDot}15`,padding:'3px 10px',borderRadius:8}}>{ex.totalPoints}/20</span>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                  {ex.exercises.map((e,j)=>(
                    <span key={j} style={{fontSize:10,padding:'2px 8px',borderRadius:6,background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.45)'}}>{e.theme}</span>
                  ))}
                </div>
              </div>

              {/* Aperçu exercices */}
              {exp&&(
                <div style={{padding:'12px 18px 8px',maxHeight:200,overflowY:'auto'}}>
                  {ex.exercises.map((e,j)=>(
                    <div key={j} style={{marginBottom:10}}>
                      <p style={{fontSize:12,fontWeight:700,color:colorDot,margin:'0 0 3px'}}>{e.title} ({e.points} pts)</p>
                      <p style={{fontSize:11,color:'rgba(255,255,255,0.45)',margin:0,lineHeight:1.6}}>{e.statement.substring(0,120)}...</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div style={{padding:'12px 18px',display:'flex',gap:8}}>
                <button onClick={()=>setExpandedIdx(exp?null:i)}
                  style={{flex:1,padding:'8px 12px',borderRadius:9,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:12,fontWeight:600,transition:'all 0.15s',fontFamily:'inherit'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
                  {exp?'▲ Masquer':'👁 Aperçu'}
                </button>
                <button onClick={()=>onChoose(ex)}
                  style={{flex:2,padding:'8px 12px',borderRadius:9,border:'none',background:`linear-gradient(135deg,${colorDot},${colorDot}cc)`,color:'white',cursor:'pointer',fontSize:12,fontWeight:700,transition:'all 0.15s',fontFamily:'inherit',boxShadow:`0 4px 14px ${colorDot}40`}}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='none'}}>
                  ✍️ Passer cet examen
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PHASE 4 — PASSAGE DE L'EXAMEN
// ═══════════════════════════════════════════════════════════════════
function PhaseExam({ exam, onSubmit }: {
  exam: GeneratedExam
  onSubmit: (answers: string) => void
}) {
  const [answers, setAnswers] = useState('')
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60)
  const [timerOn, setTimerOn] = useState(false)
  const [panel, setPanel] = useState<'both'|'subject'|'answer'>('both')
  const [savedMsg, setSavedMsg] = useState('')
  const [uploadMode, setUploadMode] = useState<'type'|'upload'>('type')
  const [uploadedFiles, setUploadedFiles] = useState<{name:string; content:string; type:string}[]>([])
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!timerOn) return
    const id = setInterval(() => setTimeLeft(t => t <= 0 ? (setTimerOn(false), 0) : t - 1), 1000)
    return () => clearInterval(id)
  }, [timerOn])

  const fmt = (s: number) =>
    `${Math.floor(s/3600)}h ${String(Math.floor((s%3600)/60)).padStart(2,'0')}m ${String(s%60).padStart(2,'0')}s`
  const pct = (timeLeft / (exam.duration * 60)) * 100
  const timerColor = pct > 40 ? '#10b981' : pct > 15 ? '#f59e0b' : '#ef4444'

  /* ── Télécharger sujet ── */
  const openSubjectPdf = () => {
    const esc2=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    const css=`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;900&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      html,body{background:#fff;color:#1a1a1a;font-family:'Noto Sans','Segoe UI',Arial,sans-serif;font-size:14px;line-height:1.8}
      .wrap{max-width:780px;margin:0 auto;padding:20px 32px 60px}
      .print-bar{position:sticky;top:0;z-index:99;background:#fff;border-bottom:2px solid #1a1a2e;padding:10px 0 12px;margin-bottom:16px;display:flex;align-items:center;gap:12px}
      .print-btn{background:#1a1a2e;color:#fff;border:none;border-radius:6px;padding:9px 22px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
      .header-official{border:2px solid #1a1a2e;border-radius:4px;margin-bottom:20px;overflow:hidden}
      .header-top{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:14px 20px;border-bottom:1px solid #1a1a2e;gap:12px}
      .header-left{font-size:12px;line-height:1.7;color:#333}
      .header-center{text-align:center}
      .header-center .logo{font-size:30px;margin-bottom:4px}
      .header-center h1{font-size:16px;font-weight:900;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:2px}
      .header-center .subtitle{font-size:12px;color:#555;font-style:italic}
      .header-right{font-size:12px;line-height:1.8;color:#333;text-align:right}
      .header-bottom{background:#1a1a2e;padding:10px 20px;display:flex;justify-content:space-between;align-items:center}
      .header-bottom .section-badge{color:#fff;font-size:15px;font-weight:800;letter-spacing:0.04em}
      .header-bottom .meta{color:rgba(255,255,255,0.8);font-size:12px;display:flex;gap:24px}
      .instructions{background:#f0f4ff;border:1px solid #c7d4f5;border-left:4px solid #1a1a2e;border-radius:0 4px 4px 0;padding:10px 14px;margin-bottom:20px;font-size:11.5px;color:#2c2c5e}
      .instructions ul{margin:6px 0 0 18px}.instructions li{margin:3px 0}
      .exercice{margin-bottom:24px;border:1px solid #1a1a2e;border-radius:4px;overflow:hidden;page-break-inside:avoid}
      .exercice-header{background:#1a1a2e;padding:10px 18px;display:flex;justify-content:space-between;align-items:center}
      .exercice-title{color:#fff;font-size:14px;font-weight:800}
      .exercice-pts{background:rgba(255,255,255,0.2);color:#fff;font-size:12px;font-weight:700;padding:3px 10px;border-radius:12px}
      .exercice-body{padding:16px 20px;background:#fff;font-size:13px;line-height:1.9;text-align:justify}
      .footer{margin-top:32px;padding-top:12px;border-top:2px solid #1a1a2e;display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#666}
      .footer-center{text-align:center;font-weight:700;color:#1a1a2e;font-size:11px}
      @media print{.print-bar{display:none!important}.wrap{padding:8px 16px}.exercice{page-break-inside:avoid}}
    `
    const exHtml=exam.exercises.map(ex=>{
      const hasG=!!((ex as any).graph&&(ex as any).graph!=='null')
      return `<div class="exercice">
        <div class="exercice-header">
          <span class="exercice-title">📐 ${esc2(ex.title)}</span>
          <span class="exercice-pts">${ex.points} points</span>
        </div>
        <div class="exercice-body">
          ${hasG?'<div style="text-align:center;padding:8px 0;color:#6366f1;font-size:13px">📊 Voir graphique dans l&#39;interface MathBac.AI</div>':''}
          <p style="white-space:pre-wrap">${esc2(ex.statement)}</p>
        </div>
      </div>`
    }).join('\n')
    const html=`<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>${esc2(exam.title)}</title><style>${css}</style></head>
<body><div class="wrap">
<div class="print-bar">
  <button class="print-btn" onclick="window.print()">🖨 Imprimer / Enregistrer en PDF</button>
  <span style="font-size:11px;color:#666">Boîte d'impression → <strong>Enregistrer en PDF</strong> · Cochez <strong>Couleurs de fond</strong></span>
</div>
<div class="header-official">
  <div class="header-top">
    <div class="header-left">
      <strong>MathBac.AI</strong><br>
      Simulation IA — Préparation Bac<br>
      <strong>Variante n°${exam.index+1}</strong>
    </div>
    <div class="header-center">
      <div class="logo">🎓</div>
      <h1>Simulation IA — Sujet ${exam.index+1}</h1>
      <div class="subtitle">${esc2(exam.section)}</div>
    </div>
    <div class="header-right">
      <strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR')}<br>
      <strong>Durée :</strong> ${exam.duration} min<br>
      <strong>Total :</strong> ${exam.totalPoints} points
    </div>
  </div>
  <div class="header-bottom">
    <span class="section-badge">📋 ${esc2(exam.section)}</span>
    <div class="meta">
      <span>⏱ ${exam.duration} min</span>
      <span>📊 ${exam.totalPoints} points</span>
      <span>🤖 Généré par IA</span>
    </div>
  </div>
</div>
<div class="instructions">
  <strong>Instructions :</strong>
  <ul>
    <li>La présentation, la lisibilité et la rigueur du raisonnement sont prises en compte.</li>
    <li>Les exercices sont indépendants et peuvent être traités dans n'importe quel ordre.</li>
    <li>Toute réponse non justifiée sera considérée comme incomplète.</li>
  </ul>
</div>
${exHtml}
<div class="footer">
  <span>MathBac.AI — Simulation IA</span>
  <span class="footer-center">${esc2(exam.title)}</span>
  <span>${new Date().toLocaleDateString('fr-FR')}</span>
</div>
</div></body></html>`
    const blob=new Blob([html],{type:'text/html;charset=utf-8'})
    const url=URL.createObjectURL(blob)
    const win=window.open(url,'_blank')
    if(!win){const a=document.createElement('a');a.href=url;a.download=`Sujet-${exam.title.replace(/[^\w-]/g,'-')}.html`;a.click()}
    setTimeout(()=>URL.revokeObjectURL(url),12000)
  }

  /* ── Télécharger les réponses tapées ── */
  const downloadAnswers = () => {
    if (!answers.trim()) return
    const blob = new Blob([
      `MES RÉPONSES — ${exam.title}\nDate : ${new Date().toLocaleString('fr-FR')}\n${'='.repeat(60)}\n\n${answers}`
    ], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `Reponses-${exam.title.replace(/[^\w-]/g,'-')}.txt`
    a.click(); URL.revokeObjectURL(url)
    setSavedMsg('Réponses téléchargées !'); setTimeout(() => setSavedMsg(''), 2500)
  }

  const copyAnswers = () => {
    if (!answers.trim()) return
    navigator.clipboard.writeText(answers).then(() => {
      setSavedMsg('Copié !'); setTimeout(() => setSavedMsg(''), 2000)
    })
  }

  /* ── Lecture fichier uploadé ── */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[]
    if (!files.length) return
    setUploadError('')
    const results: {name:string; content:string; type:string}[] = []
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() || ''
      // Fichier texte
      if (['txt','md','tex'].includes(ext) || file.type.startsWith('text/')) {
        const text = await file.text()
        results.push({ name: file.name, content: text, type: 'text' })
      }
      // Image (photo de copie)
      else if (file.type.startsWith('image/')) {
        const dataUrl = await new Promise<string>(res => {
          const r = new FileReader(); r.onload = () => res(r.result as string); r.readAsDataURL(file)
        })
        results.push({ name: file.name, content: dataUrl, type: 'image' })
      }
      // PDF
      else if (ext === 'pdf' || file.type === 'application/pdf') {
        results.push({ name: file.name, content: '', type: 'pdf' })
        setUploadError('PDF détecté — pour l\'instant, convertissez votre PDF en images ou copiez le texte.')
      }
      else {
        setUploadError(`Format non supporté : ${file.name}. Utilisez .txt, .jpg, .png.`)
      }
    }
    if (results.length) {
      setUploadedFiles(prev => [...prev, ...results])
      // Si texte, l'injecter dans la zone réponse
      const textFiles = results.filter(r => r.type === 'text')
      if (textFiles.length) {
        const combined = textFiles.map(f => `--- ${f.name} ---\n${f.content}`).join('\n\n')
        setAnswers(prev => prev ? prev + '\n\n' + combined : combined)
      }
    }
    // Reset input pour permettre re-upload du même fichier
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_,i) => i !== idx))
  }

  /* ── Soumission : texte + images ── */
  const handleSubmit = () => {
    // Construire le texte final pour l'IA
    const imageDescriptions = uploadedFiles
      .filter(f => f.type === 'image')
      .map(f => `[Image jointe : ${f.name} — L'élève a soumis une photo de sa copie]`)
      .join('\n')
    const finalText = [answers.trim(), imageDescriptions].filter(Boolean).join('\n\n')
    onSubmit(finalText || '')
  }

  const hasContent = answers.trim().length > 0 || uploadedFiles.length > 0

  return (
    <div>
      {/* Barre contrôles */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,padding:'14px 20px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,flexWrap:'wrap',gap:12}}>
        <div>
          <p style={{margin:'0 0 2px',fontWeight:700,fontSize:15,color:'#e2e8f0'}}>{exam.title}</p>
          <p style={{margin:0,fontSize:11,color:'rgba(255,255,255,0.35)'}}>Durée : {exam.duration} min · {exam.totalPoints}/20 pts · {exam.exercises.length} exercices</p>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          {/* Chrono */}
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 14px',background:'rgba(0,0,0,0.3)',borderRadius:10,border:`1px solid ${timerColor}40`}}>
            <div style={{width:28,height:28,position:'relative',flexShrink:0}}>
              <svg width="28" height="28" style={{transform:'rotate(-90deg)'}}>
                <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5"/>
                <circle cx="14" cy="14" r="11" fill="none" stroke={timerColor} strokeWidth="2.5"
                  strokeDasharray={`${(pct/100)*69.1} 69.1`} strokeLinecap="round" style={{transition:'stroke-dasharray 1s linear'}}/>
              </svg>
            </div>
            <span style={{fontFamily:'monospace',fontSize:16,fontWeight:800,color:timerColor}}>{fmt(timeLeft)}</span>
            <button onClick={() => setTimerOn(!timerOn)}
              style={{padding:'3px 10px',borderRadius:6,border:`1px solid ${timerColor}40`,background:'transparent',color:timerColor,cursor:'pointer',fontSize:11,fontWeight:700,fontFamily:'inherit'}}>
              {timerOn ? '⏸' : '▶'}
            </button>
          </div>
          {/* Vue */}
          <div style={{display:'flex',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:9,overflow:'hidden'}}>
            {(['both','subject','answer'] as const).map(v => (
              <button key={v} onClick={() => setPanel(v)}
                style={{padding:'7px 13px',border:'none',background:panel===v?'rgba(99,102,241,0.3)':'transparent',
                  color:panel===v?'#a5b4fc':'rgba(255,255,255,0.4)',cursor:'pointer',fontSize:12,fontFamily:'inherit'}}
                title={v==='both'?'Vue partagée':v==='subject'?'Sujet':''}>
                {v==='both'?'↔':v==='subject'?'📋':'✍️'}
              </button>
            ))}
          </div>
          <button onClick={openSubjectPdf}
            style={{padding:'8px 14px',borderRadius:9,border:'1px solid rgba(255,255,255,0.15)',background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.8)',cursor:'pointer',fontSize:12,fontWeight:700,fontFamily:'inherit',display:'flex',alignItems:'center',gap:6}}>
            📄 Sujet PDF
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div style={{display:'grid',gridTemplateColumns:panel==='both'?'1fr 1fr':panel==='subject'?'1fr 0':'0 1fr',gap:20}}>

        {/* Sujet */}
        {panel !== 'answer' && (
          <div>
            <p style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.3)',marginBottom:12,fontWeight:600}}>📋 Sujet</p>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {exam.exercises.map(ex => (
                <div key={ex.num} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderLeft:'3px solid #6366f1',borderRadius:12,padding:'16px 18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:10,alignItems:'center',gap:8,flexWrap:'wrap'}}>
                    <span style={{fontWeight:700,fontSize:13,color:'#a5b4fc'}}>{ex.title}</span>
                    <span style={{fontFamily:'monospace',fontSize:12,color:'#fbbf24',fontWeight:700}}>{ex.points} pts</span>
                  </div>
                  {(ex as any).graph && (ex as any).graph !== 'null' && <TextWithGraphs text={(ex as any).graph} />}
                  <TextWithGraphs text={ex.statement} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Zone réponse */}
        {panel !== 'subject' && (
          <div style={{display:'flex',flexDirection:'column',gap:10}}>

            {/* Header zone réponse */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
              <p style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.3)',margin:0,fontWeight:600}}>✍️ Votre feuille de réponse</p>
              <div style={{display:'flex',gap:7,alignItems:'center'}}>
                {savedMsg && (
                  <span style={{fontSize:11,color:'#6ee7b7',fontWeight:600,padding:'3px 10px',background:'rgba(16,185,129,0.1)',borderRadius:6}}>✓ {savedMsg}</span>
                )}
                <button onClick={copyAnswers} disabled={!answers.trim()}
                  style={{padding:'5px 10px',borderRadius:7,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:answers.trim()?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.2)',cursor:answers.trim()?'pointer':'not-allowed',fontSize:11,fontWeight:600,fontFamily:'inherit'}}>
                  📋 Copier
                </button>
                <button onClick={downloadAnswers} disabled={!answers.trim()}
                  style={{padding:'5px 10px',borderRadius:7,border:'1px solid rgba(99,102,241,0.3)',background:answers.trim()?'rgba(99,102,241,0.1)':'transparent',color:answers.trim()?'#a5b4fc':'rgba(255,255,255,0.2)',cursor:answers.trim()?'pointer':'not-allowed',fontSize:11,fontWeight:600,fontFamily:'inherit'}}>
                  ⬇ Sauvegarder
                </button>
              </div>
            </div>

            {/* Toggle : Taper / Uploader */}
            <div style={{display:'flex',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,overflow:'hidden'}}>
              {(['type','upload'] as const).map(m => (
                <button key={m} onClick={() => setUploadMode(m)}
                  style={{flex:1,padding:'9px',border:'none',cursor:'pointer',fontFamily:'inherit',fontWeight:600,fontSize:12,transition:'all 0.2s',
                    background:uploadMode===m?'rgba(99,102,241,0.25)':'transparent',
                    color:uploadMode===m?'#a5b4fc':'rgba(255,255,255,0.4)'}}>
                  {m==='type' ? '⌨️ Taper mes réponses' : '📁 Importer un fichier'}
                </button>
              ))}
            </div>

            {/* MODE TAPER */}
            {uploadMode === 'type' && (
              <>
                <div style={{padding:'9px 13px',background:'rgba(251,191,36,0.06)',border:'1px solid rgba(251,191,36,0.15)',borderRadius:9,fontSize:11,color:'rgba(255,255,255,0.45)',lineHeight:1.6}}>
                  💡 Faites l&apos;examen sur papier puis recopiez ici, ou tapez directement.
                </div>
                <textarea value={answers} onChange={e => setAnswers(e.target.value)}
                  placeholder={`Exercice 1 :\n1) ...\n2) ...\n\nExercice 2 :\n1) ...\n\n(Laissez vide pour la correction complète directe)`}
                  style={{flex:1,minHeight:panel==='answer'?500:400,width:'100%',padding:'14px 16px',borderRadius:11,border:'1px solid rgba(255,255,255,0.1)',background:'rgba(0,0,0,0.25)',color:'rgba(255,255,255,0.85)',fontSize:13,resize:'vertical',outline:'none',fontFamily:'inherit',lineHeight:1.85,boxSizing:'border-box',transition:'border 0.2s'}}
                  onFocus={e => e.target.style.borderColor='rgba(99,102,241,0.5)'}
                  onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:11,color:'rgba(255,255,255,0.22)'}}>
                  <span>{answers.length} caractères</span>
                </div>
              </>
            )}

            {/* MODE UPLOAD */}
            {uploadMode === 'upload' && (
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {/* Zone de dépôt */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor='rgba(99,102,241,0.6)'; e.currentTarget.style.background='rgba(99,102,241,0.08)' }}
                  onDragLeave={e => { e.currentTarget.style.borderColor='rgba(99,102,241,0.25)'; e.currentTarget.style.background='rgba(99,102,241,0.04)' }}
                  onDrop={e => {
                    e.preventDefault()
                    e.currentTarget.style.borderColor='rgba(99,102,241,0.25)'
                    e.currentTarget.style.background='rgba(99,102,241,0.04)'
                    const dt = e.dataTransfer
                    if (dt.files.length) {
                      const synth = { target: { files: dt.files } } as any
                      handleFileUpload(synth)
                    }
                  }}
                  style={{border:'2px dashed rgba(99,102,241,0.25)',borderRadius:14,padding:'32px 20px',textAlign:'center',cursor:'pointer',background:'rgba(99,102,241,0.04)',transition:'all 0.2s'}}>
                  <div style={{fontSize:40,marginBottom:12}}>📎</div>
                  <p style={{margin:'0 0 6px',fontWeight:700,fontSize:14,color:'rgba(255,255,255,0.75)'}}>Glissez vos fichiers ici</p>
                  <p style={{margin:'0 0 14px',fontSize:12,color:'rgba(255,255,255,0.35)'}}>ou cliquez pour parcourir</p>
                  <div style={{display:'flex',justifyContent:'center',gap:8,flexWrap:'wrap'}}>
                    {[
                      {icon:'📄',label:'Texte (.txt)',desc:'Réponses tapées'},
                      {icon:'🖼️',label:'Photo (.jpg/.png)',desc:'Photo de copie'},
                      {icon:'📸',label:'Scan',desc:'Copie scannée'},
                    ].map((f,i) => (
                      <div key={i} style={{padding:'6px 12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,fontSize:11,color:'rgba(255,255,255,0.5)',textAlign:'center'}}>
                        <div style={{fontSize:16,marginBottom:2}}>{f.icon}</div>
                        <div style={{fontWeight:600,color:'rgba(255,255,255,0.7)'}}>{f.label}</div>
                        <div style={{color:'rgba(255,255,255,0.35)'}}>{f.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <input ref={fileInputRef} type="file" multiple accept=".txt,.md,.jpg,.jpeg,.png,.webp,.bmp"
                  onChange={handleFileUpload} style={{display:'none'}}/>

                {/* Erreur */}
                {uploadError && (
                  <div style={{padding:'10px 14px',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.25)',borderRadius:9,fontSize:12,color:'#fca5a5'}}>
                    ⚠️ {uploadError}
                  </div>
                )}

                {/* Fichiers uploadés */}
                {uploadedFiles.length > 0 && (
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                    <p style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.4)',margin:0,textTransform:'uppercase',letterSpacing:'0.06em'}}>
                      {uploadedFiles.length} fichier{uploadedFiles.length>1?'s':''} importé{uploadedFiles.length>1?'s':''}
                    </p>
                    {uploadedFiles.map((f, idx) => (
                      <div key={idx} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'rgba(16,185,129,0.07)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:10}}>
                        <span style={{fontSize:20,flexShrink:0}}>{f.type==='image'?'🖼️':'📄'}</span>
                        <div style={{flex:1,minWidth:0}}>
                          <p style={{margin:0,fontSize:12,fontWeight:600,color:'#6ee7b7',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.name}</p>
                          <p style={{margin:0,fontSize:11,color:'rgba(255,255,255,0.35)'}}>
                            {f.type==='image' ? 'Photo — l\'IA analysera l\'image' : `Texte importé (${f.content.length} car.)`}
                          </p>
                        </div>
                        {/* Aperçu image */}
                        {f.type==='image' && (
                          <img src={f.content} alt={f.name}
                            style={{width:52,height:52,objectFit:'cover',borderRadius:7,border:'1px solid rgba(255,255,255,0.1)',flexShrink:0}}/>
                        )}
                        <button onClick={() => removeFile(idx)}
                          style={{padding:'4px 8px',borderRadius:6,border:'1px solid rgba(239,68,68,0.3)',background:'transparent',color:'#fca5a5',cursor:'pointer',fontSize:12,flexShrink:0,fontFamily:'inherit'}}>
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Zone texte complémentaire en mode upload */}
                <div>
                  <p style={{fontSize:11,color:'rgba(255,255,255,0.3)',margin:'4px 0 6px',fontWeight:600}}>
                    COMMENTAIRES COMPLÉMENTAIRES (optionnel)
                  </p>
                  <textarea value={answers} onChange={e => setAnswers(e.target.value)}
                    placeholder="Ajoutez des précisions ou réponses supplémentaires ici..."
                    style={{width:'100%',height:90,padding:'10px 13px',borderRadius:9,border:'1px solid rgba(255,255,255,0.08)',background:'rgba(0,0,0,0.2)',color:'rgba(255,255,255,0.7)',fontSize:12,resize:'none',outline:'none',fontFamily:'inherit',lineHeight:1.7,boxSizing:'border-box'}}
                    onFocus={e=>e.target.style.borderColor='rgba(99,102,241,0.4)'}
                    onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}/>
                </div>
              </div>
            )}

            {/* Bouton soumettre */}
            <button onClick={handleSubmit}
              style={{padding:'14px 24px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'white',borderRadius:12,border:'none',cursor:'pointer',fontSize:14,fontWeight:700,boxShadow:'0 8px 24px rgba(99,102,241,0.45)',display:'flex',alignItems:'center',justifyContent:'center',gap:10,transition:'all 0.2s',fontFamily:'inherit',marginTop:4}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none'}}>
              {uploadedFiles.filter(f=>f.type==='image').length > 0
                ? `📤 Soumettre ${uploadedFiles.length} fichier${uploadedFiles.length>1?'s':''} + obtenir correction →`
                : hasContent
                  ? '📤 Soumettre mes réponses et obtenir la correction →'
                  : '📤 Obtenir la correction complète directement →'
              }
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════
// PHASE INTERMÉDIAIRE — NOTE AVANT CORRECTION
// ═══════════════════════════════════════════════════════════════════
function PhaseGrade({ exam, grade, correctionReady, correctionProgress, onSeeCorrection }: {
  exam: GeneratedExam
  grade: {score:number;maxScore:number;comment:string;breakdown:{title:string;pts:number;max:number;reason:string}[]}|null
  correctionReady: boolean
  correctionProgress: number
  onSeeCorrection: ()=>void
}) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (grade) setTimeout(() => setRevealed(true), 300)
  }, [grade])

  if (!grade) {
    return (
      <div style={{textAlign:'center',padding:'60px 20px'}}>
        <div style={{fontSize:52,marginBottom:16,animation:'float 2s ease-in-out infinite'}}>⚖️</div>
        <h3 style={{color:'#e2e8f0',marginBottom:8}}>Évaluation en cours...</h3>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:13}}>L&apos;IA analyse votre copie et calcule votre note</p>
        <div style={{width:260,height:4,borderRadius:4,background:'rgba(255,255,255,0.06)',margin:'24px auto 0',overflow:'hidden'}}>
          <div style={{height:'100%',background:'linear-gradient(90deg,#6366f1,#f59e0b)',borderRadius:4,animation:'slideBar 1.8s ease-in-out infinite'}}/>
        </div>
      </div>
    )
  }

  const pct = Math.round((grade.score / grade.maxScore) * 100)
  const scoreColor = pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : pct >= 30 ? '#f97316' : '#ef4444'
  const scoreGrad  = pct >= 70
    ? 'linear-gradient(135deg,#10b981,#059669)'
    : pct >= 50
    ? 'linear-gradient(135deg,#f59e0b,#d97706)'
    : 'linear-gradient(135deg,#ef4444,#dc2626)'
  const mention = pct >= 80 ? 'Très Bien 🏆' : pct >= 70 ? 'Bien 👏' : pct >= 60 ? 'Assez Bien 👍' : pct >= 50 ? 'Passable 🎯' : pct >= 30 ? 'Insuffisant 💪' : 'À retravailler 📚'
  const circumference = 2 * Math.PI * 54
  const dashOffset = circumference - (pct / 100) * circumference

  return (
    <div style={{maxWidth:680,margin:'0 auto'}}>

      {/* Titre */}
      <div style={{textAlign:'center',marginBottom:32}}>
        <h3 style={{margin:'0 0 6px',fontSize:20,color:'#e2e8f0'}}>Résultat de votre simulation</h3>
        <p style={{margin:0,fontSize:13,color:'rgba(255,255,255,0.4)'}}>{exam.title}</p>
      </div>

      {/* Score principal animé */}
      <div style={{
        display:'flex',flexDirection:'column',alignItems:'center',
        padding:'40px 32px',marginBottom:24,
        background:'rgba(255,255,255,0.03)',
        border:`1px solid ${scoreColor}30`,
        borderRadius:24,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transition:'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Donut SVG animé */}
        <div style={{position:'relative',marginBottom:20}}>
          <svg width="140" height="140" style={{transform:'rotate(-90deg)'}}>
            <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
            <circle cx="70" cy="70" r="54" fill="none" stroke={scoreColor} strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={revealed ? dashOffset : circumference}
              strokeLinecap="round"
              style={{transition:'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s',filter:`drop-shadow(0 0 10px ${scoreColor}80)`}}/>
          </svg>
          <div style={{
            position:'absolute',inset:0,display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',
          }}>
            <span style={{
              fontSize:42,fontWeight:900,color:scoreColor,lineHeight:1,
              opacity: revealed ? 1 : 0,
              transition:'opacity 0.5s ease 0.8s',
            }}>{grade.score}</span>
            <span style={{fontSize:15,color:'rgba(255,255,255,0.35)',fontWeight:600}}>/{grade.maxScore}</span>
          </div>
        </div>

        {/* Mention */}
        <div style={{
          padding:'8px 24px',borderRadius:20,
          background:`${scoreColor}20`,border:`1px solid ${scoreColor}40`,
          fontSize:16,fontWeight:800,color:scoreColor,marginBottom:14,
          opacity: revealed ? 1 : 0,
          transition:'opacity 0.4s ease 1s',
        }}>
          {mention}
        </div>

        {/* Commentaire IA */}
        <p style={{
          textAlign:'center',fontSize:14,color:'rgba(255,255,255,0.65)',
          lineHeight:1.75,maxWidth:420,margin:0,
          opacity: revealed ? 1 : 0,
          transition:'opacity 0.4s ease 1.2s',
        }}>
          {grade.comment}
        </p>
      </div>

      {/* Détail par exercice */}
      {grade.breakdown.length > 0 && (
        <div style={{
          marginBottom:24,
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(16px)',
          transition:'all 0.5s ease 0.9s',
        }}>
          <h4 style={{margin:'0 0 12px',fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.45)',textTransform:'uppercase',letterSpacing:'0.08em'}}>
            Détail par exercice
          </h4>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {grade.breakdown.map((b, i) => {
              const exPct = b.max > 0 ? (b.pts / b.max) * 100 : 0
              const exCol = exPct >= 70 ? '#10b981' : exPct >= 50 ? '#f59e0b' : '#ef4444'
              return (
                <div key={i} style={{
                  padding:'12px 16px',
                  background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.07)',
                  borderRadius:12,
                }}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:7,gap:8,flexWrap:'wrap'}}>
                    <span style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.8)'}}>{b.title}</span>
                    <span style={{fontSize:13,fontWeight:800,color:exCol,flexShrink:0}}>{b.pts}/{b.max} pts</span>
                  </div>
                  {/* Barre de progression */}
                  <div style={{height:4,borderRadius:4,background:'rgba(255,255,255,0.06)',marginBottom:6,overflow:'hidden'}}>
                    <div style={{
                      height:'100%',borderRadius:4,background:exCol,
                      width: revealed ? `${exPct}%` : '0%',
                      transition:`width 1s ease ${0.9 + i * 0.15}s`,
                    }}/>
                  </div>
                  <p style={{fontSize:11,color:'rgba(255,255,255,0.35)',margin:0}}>{b.reason}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Bouton voir correction */}
      <div style={{
        textAlign:'center',
        opacity: revealed ? 1 : 0,
        transition:'opacity 0.4s ease 1.4s',
      }}>
        <button onClick={onSeeCorrection}
          style={{
            padding:'16px 36px',
            background: scoreGrad,
            color:'white',borderRadius:14,border:'none',
            cursor:'pointer',fontSize:15,fontWeight:800,
            boxShadow:`0 8px 28px ${scoreColor}50`,
            display:'inline-flex',alignItems:'center',gap:12,
            transition:'all 0.2s',fontFamily:'inherit',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow=`0 14px 36px ${scoreColor}60`}}
          onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 8px 28px ${scoreColor}50`}}>
          <span style={{fontSize:20}}>📝</span>
          Voir la correction détaillée
          <span style={{fontSize:18,opacity:0.8}}>→</span>
        </button>
        {/* Info correction en cours si pas encore prête */}
        {!correctionReady && (
          <p style={{marginTop:12,fontSize:12,color:'rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',gap:7}}>
            <span style={{width:10,height:10,borderRadius:'50%',border:'2px solid rgba(255,255,255,0.15)',borderTopColor:'rgba(255,255,255,0.4)',animation:'spin 0.8s linear infinite',display:'inline-block'}}/>
            Correction en préparation ({correctionProgress}/{exam.exercises.length} exercices)...
          </p>
        )}
        {correctionReady && (
          <p style={{marginTop:10,fontSize:12,color:'#6ee7b7'}}>
            ✓ Correction prête
          </p>
        )}
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════
// PHASE 5 — CORRECTION EXERCICE PAR EXERCICE
// Chaque exercice est corrigé séparément : l'élève peut imprimer avant de continuer
// ═══════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// PAGE ANALYSE EXERCICE — Pleine page avec bouton Retour (Simulation)
// ════════════════════════════════════════════════════════════════════
function PageAnalyseExercice({
  analysis, exercise, exerciseNum, onBack
}: {
  analysis: AnalysisResult
  exercise: { title: string; theme: string; points: number; statement: string; graph?: string }
  exerciseNum: number
  onBack: () => void
}) {
  const [remAnswers, setRemAnswers] = useState<Record<string,string>>({})
  const [remFeedback, setRemFeedback] = useState<Record<string,string>>({})
  const [remLoading, setRemLoading] = useState<Record<string,boolean>>({})
  const [showHint, setShowHint] = useState<Record<string,boolean>>({})
  const [showOfficiel, setShowOfficiel] = useState<Record<string,boolean>>({})

  const score = analysis.estimatedScore
  const max = analysis.maxScore
  const pct = Math.round((score / max) * 100)
  const scoreColor = pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444'
  const mention = pct >= 80 ? 'Excellent 🌟' : pct >= 60 ? 'Bien 👍' : pct >= 40 ? 'À améliorer 📚' : 'À retravailler 💪'

  const checkRem = async (rem: AnalysisResult['remediationExercises'][number]) => {
    if (remLoading[rem.id] || remFeedback[rem.id]) return
    setRemLoading(p => ({ ...p, [rem.id]: true }))
    try {
      const sys = `Tu es un tuteur mathématiques bienveillant. Corrige la réponse de l'élève sur cet exercice de remédiation. Sois précis et encourageant.`
      const prompt = `Exercice : ${rem.statement}\n\nRéponse de l'élève : ${remAnswers[rem.id] || '(Aucune réponse)'}\n\nCorrection officielle : ${rem.officialCorrection}\n\nFournis une correction commentée et encourageante :`
      const text = await askClaude(prompt, sys, 2500)
      setRemFeedback(p => ({ ...p, [rem.id]: text }))
    } catch {}
    setRemLoading(p => ({ ...p, [rem.id]: false }))
  }

  const sevColor: Record<string,string> = { critical:'#ef4444', moderate:'#f59e0b', good:'#10b981' }
  const sevLabel: Record<string,string> = { critical:'Priorité haute', moderate:'À améliorer', good:'Maîtrisé' }
  const diffColor: Record<string,string> = { introductory:'#10b981', standard:'#f59e0b', advanced:'#ef4444' }
  const diffLabel: Record<string,string> = { introductory:'Initiation', standard:'Standard', advanced:'Avancé' }

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:200,
      background:'#0a0a1a', overflowY:'auto',
      fontFamily:'system-ui', color:'white',
    }}>
      {/* Header fixe */}
      <div style={{
        position:'sticky', top:0, zIndex:10,
        background:'rgba(10,10,26,0.97)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(255,255,255,0.08)',
        padding:'14px 24px', display:'flex', alignItems:'center', gap:16,
      }}>
        <button onClick={onBack}
          style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'9px 18px', borderRadius:9,
            border:'1px solid rgba(255,255,255,0.15)',
            background:'rgba(255,255,255,0.06)',
            color:'white', fontSize:13, fontWeight:700,
            cursor:'pointer', fontFamily:'inherit',
            transition:'all 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)'}}>
          ← Retour à la correction
        </button>
        <div style={{flex:1}}>
          <div style={{fontWeight:800, fontSize:15, color:'#a5b4fc'}}>
            📊 Analyse — Exercice {exerciseNum}
          </div>
          <div style={{fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:2}}>
            {exercise.title} · {exercise.theme}
          </div>
        </div>
        {/* Score compact dans le header */}
        <div style={{
          background:`${scoreColor}15`, border:`2px solid ${scoreColor}`,
          borderRadius:10, padding:'8px 16px', textAlign:'center',
        }}>
          <div style={{fontSize:24, fontWeight:900, color:scoreColor, lineHeight:1}}>
            {score}<span style={{fontSize:14, color:'rgba(255,255,255,0.4)'}}>/{max}</span>
          </div>
          <div style={{fontSize:11, color:scoreColor, marginTop:2}}>{mention}</div>
        </div>
      </div>

      {/* Contenu */}
      <div style={{maxWidth:860, margin:'0 auto', padding:'28px 20px 60px'}}>

        {/* Score visuel */}
        <div style={{
          display:'grid', gridTemplateColumns:'150px 1fr', gap:24,
          background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:16, padding:'24px', marginBottom:24, alignItems:'center',
        }}>
          <div style={{textAlign:'center'}}>
            <svg width="110" height="110" style={{transform:'rotate(-90deg)'}}>
              <circle cx="55" cy="55" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9"/>
              <circle cx="55" cy="55" r="45" fill="none" stroke={scoreColor} strokeWidth="9"
                strokeDasharray={`${(pct/100)*283} 283`} strokeLinecap="round"
                style={{transition:'stroke-dasharray 1.2s ease'}}/>
            </svg>
            <div style={{marginTop:-56, marginBottom:36}}>
              <div style={{fontSize:36, fontWeight:900, color:scoreColor}}>{score}</div>
              <div style={{fontSize:14, color:'rgba(255,255,255,0.35)'}}>/{max} pts</div>
            </div>
            <div style={{fontSize:12, fontWeight:700, color:scoreColor}}>{mention}</div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            {analysis.strengths.length > 0 && (
              <div>
                <p style={{fontSize:11, fontWeight:700, color:'#6ee7b7', textTransform:'uppercase', letterSpacing:'0.08em', margin:'0 0 8px'}}>
                  💪 Points forts
                </p>
                <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
                  {analysis.strengths.map((s,i) => (
                    <span key={i} style={{fontSize:12, padding:'4px 12px', background:'rgba(16,185,129,0.12)', color:'#6ee7b7', border:'1px solid rgba(16,185,129,0.25)', borderRadius:20}}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {analysis.globalAdvice.length > 0 && (
              <div>
                <p style={{fontSize:11, fontWeight:700, color:'#a5b4fc', textTransform:'uppercase', letterSpacing:'0.08em', margin:'0 0 8px'}}>
                  🎯 Conseils personnalisés
                </p>
                <div style={{display:'flex', flexDirection:'column', gap:5}}>
                  {analysis.globalAdvice.map((a,i) => (
                    <div key={i} style={{display:'flex', gap:10, alignItems:'flex-start', padding:'7px 12px', background:'rgba(99,102,241,0.08)', borderRadius:8, fontSize:12, color:'rgba(255,255,255,0.7)'}}>
                      <span style={{color:'#6366f1', fontWeight:700, flexShrink:0}}>{i+1}.</span>{a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zones faibles */}
        {analysis.weakAreas.length > 0 && (
          <div style={{marginBottom:24}}>
            <h3 style={{fontSize:15, fontWeight:700, color:'rgba(255,255,255,0.8)', marginBottom:12}}>
              🔍 Diagnostic par thème
            </h3>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {analysis.weakAreas.map((w,i) => {
                const wc = sevColor[w.severity] || '#10b981'
                return (
                  <div key={i} style={{
                    padding:'12px 16px', background:`${wc}08`,
                    borderLeft:`4px solid ${wc}`, borderRadius:'0 10px 10px 0',
                    border:`1px solid ${wc}20`,
                  }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
                      <span style={{fontWeight:700, fontSize:13, color:wc}}>{w.theme}</span>
                      <span style={{fontSize:10, background:`${wc}20`, color:wc, padding:'2px 8px', borderRadius:10, fontWeight:700}}>
                        {sevLabel[w.severity]}
                      </span>
                    </div>
                    <p style={{fontSize:12, color:'rgba(255,255,255,0.6)', lineHeight:1.6, margin:0}}>{w.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Exercices de remédiation */}
        {analysis.remediationExercises.length > 0 && (
          <div>
            <h3 style={{fontSize:15, fontWeight:700, color:'rgba(255,255,255,0.8)', margin:'0 0 6px'}}>
              🔧 Exercices de remédiation ciblés
            </h3>
            <p style={{fontSize:13, color:'rgba(255,255,255,0.4)', marginBottom:20}}>
              Exercices créés spécialement pour renforcer les lacunes de cet exercice.
            </p>
            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {analysis.remediationExercises.map((rem, i) => {
                const dc = diffColor[rem.difficulty] || '#f59e0b'
                return (
                  <div key={rem.id} style={{
                    background:'rgba(255,255,255,0.03)',
                    border:'1px solid rgba(255,255,255,0.08)',
                    borderRadius:14, overflow:'hidden',
                  }}>
                    {/* Header rem */}
                    <div style={{
                      padding:'12px 18px',
                      background:'rgba(255,255,255,0.03)',
                      borderBottom:'1px solid rgba(255,255,255,0.06)',
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                    }}>
                      <div style={{display:'flex', gap:10, alignItems:'center'}}>
                        <div style={{
                          width:28, height:28, borderRadius:7,
                          background:`${dc}20`, border:`1px solid ${dc}40`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontWeight:800, fontSize:13, color:dc,
                        }}>{i+1}</div>
                        <div>
                          <p style={{margin:0, fontWeight:700, fontSize:13, color:'rgba(255,255,255,0.85)'}}>{rem.theme}</p>
                          <p style={{margin:0, fontSize:11, color:'rgba(255,255,255,0.4)'}}>{rem.objective}</p>
                        </div>
                      </div>
                      <span style={{fontSize:10, fontWeight:700, color:dc, background:`${dc}15`, padding:'3px 10px', borderRadius:10}}>
                        {diffLabel[rem.difficulty]}
                      </span>
                    </div>

                    {/* Corps rem */}
                    <div style={{padding:'16px 18px', display:'flex', flexDirection:'column', gap:12}}>
                      {/* Énoncé */}
                      <div style={{background:'rgba(0,0,0,0.2)', borderRadius:10, padding:'12px 14px'}}>
                        <p style={{fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', margin:'0 0 8px'}}>Énoncé</p>
                        <TextWithGraphs text={rem.statement}/>
                      </div>

                      {/* Indice */}
                      <button onClick={()=>setShowHint(p=>({...p,[rem.id]:!p[rem.id]}))}
                        style={{alignSelf:'flex-start', fontSize:12, fontWeight:600, color:'#fbbf24', background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.2)', borderRadius:8, padding:'6px 14px', cursor:'pointer', fontFamily:'inherit'}}>
                        {showHint[rem.id] ? '▲ Masquer' : '💡 Voir'} l&apos;indice
                      </button>
                      {showHint[rem.id] && (
                        <div style={{padding:'10px 14px', background:'rgba(251,191,36,0.06)', border:'1px solid rgba(251,191,36,0.18)', borderRadius:8, fontSize:12, color:'rgba(255,255,255,0.7)'}}>
                          {rem.hint}
                        </div>
                      )}

                      {/* Réponse élève */}
                      {!remFeedback[rem.id] && (
                        <>
                          <textarea
                            value={remAnswers[rem.id]||''}
                            onChange={e=>setRemAnswers(p=>({...p,[rem.id]:e.target.value}))}
                            placeholder="Rédigez votre réponse ici…"
                            style={{
                              width:'100%', height:100, padding:'11px 13px',
                              borderRadius:9, border:'1px solid rgba(255,255,255,0.09)',
                              background:'rgba(0,0,0,0.2)', color:'rgba(255,255,255,0.85)',
                              fontSize:13, resize:'vertical', outline:'none',
                              fontFamily:'inherit', lineHeight:1.7, boxSizing:'border-box' as any,
                            }}/>
                          <button
                            onClick={()=>checkRem(rem)}
                            disabled={remLoading[rem.id]}
                            style={{
                              padding:'11px 22px', borderRadius:10, border:'none',
                              background:remLoading[rem.id]?'rgba(255,255,255,0.07)':'linear-gradient(135deg,#6366f1,#8b5cf6)',
                              color:remLoading[rem.id]?'rgba(255,255,255,0.3)':'white',
                              fontSize:13, fontWeight:700, cursor:remLoading[rem.id]?'not-allowed':'pointer',
                              fontFamily:'inherit', alignSelf:'flex-start',
                              display:'flex', alignItems:'center', gap:8,
                            }}>
                            {remLoading[rem.id] && (
                              <span style={{width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',animation:'spin 0.7s linear infinite',display:'inline-block'}}/>
                            )}
                            {remLoading[rem.id] ? 'Correction en cours…' : 'Corriger par IA →'}
                          </button>
                        </>
                      )}

                      {/* Feedback IA */}
                      {remFeedback[rem.id] && (
                        <div style={{padding:'14px 16px', background:'rgba(99,102,241,0.07)', border:'1px solid rgba(99,102,241,0.22)', borderRadius:10}}>
                          <p style={{fontSize:10, fontWeight:700, color:'#a5b4fc', textTransform:'uppercase', margin:'0 0 10px'}}>
                            🤖 Correction IA personnalisée
                          </p>
                          <MD text={remFeedback[rem.id]}/>
                        </div>
                      )}

                      {/* Correction officielle */}
                      <button onClick={()=>setShowOfficiel(p=>({...p,[rem.id]:!p[rem.id]}))}
                        style={{alignSelf:'flex-start', fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.45)', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'6px 14px', cursor:'pointer', fontFamily:'inherit'}}>
                        {showOfficiel[rem.id] ? '▲ Masquer' : '📖 Voir'} la correction officielle
                      </button>
                      {showOfficiel[rem.id] && (
                        <div style={{padding:'12px 14px', background:'rgba(16,185,129,0.06)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:9}}>
                          <MD text={rem.officialCorrection}/>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Bouton retour en bas aussi */}
        <div style={{textAlign:'center', marginTop:40, paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.07)'}}>
          <button onClick={onBack}
            style={{
              padding:'12px 28px', borderRadius:10,
              border:'1px solid rgba(255,255,255,0.15)',
              background:'rgba(255,255,255,0.05)',
              color:'white', fontSize:14, fontWeight:700,
              cursor:'pointer', fontFamily:'inherit',
              display:'inline-flex', alignItems:'center', gap:8,
            }}>
            ← Retour à la correction
          </button>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}


function PhaseCorrection({ exam, answers, onAnalyse, onGraphExtracted, onOpenAnalyse }: {
  exam: GeneratedExam
  answers: string
  onAnalyse: (fullCorrection: string) => void
  onGraphExtracted?: (exerciseIdx: number, graph: string) => void
  onOpenAnalyse?: (idx: number, analysis: AnalysisResult, exercise: GeneratedExam['exercises'][number]) => void
}) {
  const totalEx = exam.exercises.length
  const colors = ['#6366f1','#10b981','#f59e0b','#8b5cf6','#ec4899','#06b6d4']

  // Index de l'exercice en cours (0-based)
  const [currentIdx, setCurrentIdx] = useState(0)
  // Correction de chaque exercice stockée séparément
  const [corrections, setCorrections] = useState<Record<number, string>>({})
  // Est-ce qu'on génère en ce moment ?
  const [generating, setGenerating] = useState(false)
  // Message PDF
  const [pdfMsg, setPdfMsg] = useState<Record<number,string>>({})
  // Analyse par exercice
  const [perExAnalysis, setPerExAnalysis] = useState<Record<number,AnalysisResult>>({})
  const [analyzingEx, setAnalyzingEx] = useState<number|null>(null)
  const [showAnalysisIdx, setShowAnalysisIdx] = useState<number|null>(null)

  const currentEx = exam.exercises[currentIdx]
  const currentCorrection = corrections[currentIdx] || ''
  const allDone = Object.keys(corrections).length >= totalEx

  // Génère la correction de l'exercice courant (utilisé pour l'ex 0 et pour retry)
  const generateCurrent = useCallback(async () => {
    if (generating || corrections[currentIdx]) return
    setGenerating(true)
    try {
      const text = await correctSingleExercise(exam, currentIdx, answers)
      setCorrections(prev => ({ ...prev, [currentIdx]: text }))
      // Extraire le graphique de la correction → injecter dans l'énoncé du sujet
      if (onGraphExtracted) {
        const extracted = extractFirstGraph(text)
        if (extracted) onGraphExtracted(currentIdx, extracted)
      }
      // Lancer l'analyse de cet exercice en arrière-plan
      const exAnswerPart = answers.split('=== ').find((p:string)=>p.startsWith(`Exercice ${currentIdx+1}`)) || answers
      setAnalyzingEx(currentIdx)
      analyzeOneExerciseSim(exam.exercises[currentIdx], exAnswerPart, text, currentIdx)
        .then(r=>{setPerExAnalysis(prev=>({...prev,[currentIdx]:r}));setAnalyzingEx(null)})
        .catch(()=>setAnalyzingEx(null))
    } catch(e) {
      setCorrections(prev => ({ ...prev, [currentIdx]: '⚠️ Erreur de génération — réessayez.' }))
    }
    setGenerating(false)
  }, [currentIdx, generating, corrections, exam, answers, onGraphExtracted])

  // Auto-lancer uniquement au premier montage (exercice 0)
  const didMount = useRef(false)
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      if (!corrections[0] && !generating) generateCurrent()
    }
  }, [])

  // Ouvrir le PDF d'un exercice spécifique
  const openExercisePdf = (idx: number) => {
    const ex = exam.exercises[idx]
    const corrText = corrections[idx] || ''
    const singleExam: GeneratedExam = {
      ...exam,
      title: `${exam.title} — Exercice ${idx + 1}`,
      exercises: [ex]
    }
    try {
      openCorrectionPdf(singleExam, corrText, answers)
      setPdfMsg(prev => ({ ...prev, [idx]: 'Ouvert !' }))
      setTimeout(() => setPdfMsg(prev => ({ ...prev, [idx]: '' })), 3000)
    } catch {
      setPdfMsg(prev => ({ ...prev, [idx]: 'Autorisez les popups' }))
    }
  }

  // Passer à l'exercice suivant et lancer sa correction automatiquement
  const goNext = useCallback(async () => {
    if (currentIdx >= totalEx - 1) return
    const nextIdx = currentIdx + 1
    setCurrentIdx(nextIdx)
    // Si pas encore corrigé, lancer la correction
    if (!corrections[nextIdx]) {
      setGenerating(true)
      try {
        const text = await correctSingleExercise(exam, nextIdx, answers)
        setCorrections(prev => ({ ...prev, [nextIdx]: text }))
        if (onGraphExtracted) {
          const extracted = extractFirstGraph(text)
          if (extracted) onGraphExtracted(nextIdx, extracted)
        }
        const exAP = answers.split('=== ').find((p:string)=>p.startsWith(`Exercice ${nextIdx+1}`)) || answers
        setAnalyzingEx(nextIdx)
        analyzeOneExerciseSim(exam.exercises[nextIdx], exAP, text, nextIdx)
          .then(r=>{setPerExAnalysis(prev=>({...prev,[nextIdx]:r}));setAnalyzingEx(null)})
          .catch(()=>setAnalyzingEx(null))
      } catch {
        setCorrections(prev => ({ ...prev, [nextIdx]: '⚠️ Erreur de génération — réessayez.' }))
      }
      setGenerating(false)
    }
  }, [currentIdx, totalEx, corrections, exam, answers, generating])

  // Terminer — passer à l'analyse avec tout le texte agrégé
  const handleFinish = () => {
    const fullText = exam.exercises.map((_, i) => corrections[i] || '').join('\n\n---\n\n')
    onAnalyse(fullText)
  }

  return (
    <div>
      {/* Header global */}
      <div style={{marginBottom:24}}>
        <h3 style={{margin:'0 0 4px',fontSize:18,color:'#e2e8f0'}}>Correction exercice par exercice</h3>
        <p style={{margin:0,fontSize:13,color:'rgba(255,255,255,0.4)'}}>{exam.title}</p>
      </div>

      {/* Stepper des exercices — lecture seule, navigation libre seulement sur exercices déjà corrigés */}
      <div style={{display:'flex',gap:8,marginBottom:28,flexWrap:'wrap',alignItems:'center'}}>
        {exam.exercises.map((ex, i) => {
          const done = !!corrections[i]
          const active = i === currentIdx
          const locked = !done && i !== currentIdx
          const c = colors[i % colors.length]
          return (
            <button key={i}
              onClick={() => { if (done && !active) setCurrentIdx(i) }}
              disabled={locked}
              title={locked ? 'Corrigez les exercices précédents en ordre' : done ? 'Revoir cet exercice' : ''}
              style={{
                display:'flex',alignItems:'center',gap:8,
                padding:'8px 16px',borderRadius:10,fontSize:12,fontWeight:700,
                cursor: locked ? 'not-allowed' : done ? 'pointer' : 'default',
                border: active ? `2px solid ${c}` : done ? `1px solid ${c}60` : '1px solid rgba(255,255,255,0.08)',
                background: active ? `${c}18` : done ? `${c}0a` : 'rgba(255,255,255,0.02)',
                color: active ? c : done ? `${c}cc` : 'rgba(255,255,255,0.2)',
                boxShadow: active ? `0 4px 16px ${c}30` : 'none',
                opacity: locked ? 0.4 : 1,
                transition:'all 0.2s',
              }}>
              {done
                ? <span style={{width:18,height:18,borderRadius:'50%',background:c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'white',fontWeight:900,flexShrink:0}}>✓</span>
                : active && generating
                  ? <span style={{width:14,height:14,borderRadius:'50%',border:`2px solid ${c}40`,borderTopColor:c,animation:'spin 0.7s linear infinite',display:'inline-block',flexShrink:0}}/>
                  : <span style={{width:18,height:18,borderRadius:'50%',border:`2px solid ${active?c:'rgba(255,255,255,0.15)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:active?c:'rgba(255,255,255,0.2)',fontWeight:900,flexShrink:0}}>{i+1}</span>
              }
              <span>Ex.{i+1}</span>
              <span style={{opacity:0.5,fontSize:10}}>({ex.points}pts)</span>
              {locked && <span style={{fontSize:9,opacity:0.5}}>🔒</span>}
            </button>
          )
        })}
        {allDone && (
          <button onClick={handleFinish}
            style={{marginLeft:'auto',padding:'9px 20px',borderRadius:10,background:'linear-gradient(135deg,#10b981,#059669)',border:'none',color:'white',fontWeight:700,fontSize:12,cursor:'pointer',boxShadow:'0 4px 16px rgba(16,185,129,0.35)',display:'flex',alignItems:'center',gap:8}}>
            📊 Analyser mes points faibles →
          </button>
        )}
      </div>

      {/* Carte exercice courant */}
      <div style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${colors[currentIdx%colors.length]}30`,borderRadius:20,overflow:'hidden'}}>

        {/* Header exercice */}
        <div style={{padding:'16px 24px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,background:`${colors[currentIdx%colors.length]}08`}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:`${colors[currentIdx%colors.length]}20`,border:`2px solid ${colors[currentIdx%colors.length]}50`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:16,color:colors[currentIdx%colors.length]}}>
              {currentIdx+1}
            </div>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:14,color:'rgba(255,255,255,0.9)'}}>{currentEx?.title}</p>
              <p style={{margin:0,fontSize:11,color:'rgba(255,255,255,0.4)'}}>{currentEx?.theme} · {currentEx?.points} pts</p>
            </div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
            {pdfMsg[currentIdx] && (
              <span style={{fontSize:11,color:'#6ee7b7',fontWeight:600,padding:'3px 10px',background:'rgba(16,185,129,0.1)',borderRadius:6}}>✓ {pdfMsg[currentIdx]}</span>
            )}
            {currentCorrection && (
              <>
                <button onClick={() => openExercisePdf(currentIdx)}
                  style={{display:'flex',alignItems:'center',gap:6,padding:'7px 13px',
                    background:'linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.2))',
                    border:'1px solid rgba(99,102,241,0.35)',borderRadius:9,cursor:'pointer',
                    fontSize:12,fontWeight:700,color:'#a5b4fc',fontFamily:'inherit'}}>
                  🎨 Imprimer
                </button>
                <button onClick={()=>{ if(perExAnalysis[currentIdx] && onOpenAnalyse) onOpenAnalyse(currentIdx, perExAnalysis[currentIdx], exam.exercises[currentIdx]) }}
                  style={{display:'flex',alignItems:'center',gap:6,padding:'7px 13px',
                    background:perExAnalysis[currentIdx]?'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(6,214,160,0.15))':'rgba(255,255,255,0.04)',
                    border:perExAnalysis[currentIdx]?'1px solid rgba(16,185,129,0.5)':'1px solid rgba(255,255,255,0.1)',
                    borderRadius:9,cursor:perExAnalysis[currentIdx]?'pointer':'not-allowed',fontSize:12,fontWeight:700,
                    color:perExAnalysis[currentIdx]?'#6ee7b7':'rgba(255,255,255,0.3)',fontFamily:'inherit',
                    boxShadow:perExAnalysis[currentIdx]?'0 0 12px rgba(16,185,129,0.25)':'none'}}>
                  {analyzingEx===currentIdx&&!perExAnalysis[currentIdx]
                    ?<><span style={{width:10,height:10,border:'2px solid rgba(16,185,129,0.3)',borderTopColor:'#10b981',borderRadius:'50%',animation:'spin 0.8s linear infinite',display:'inline-block',marginRight:4}}/><span>Analyse…</span></>
                    :<>📊 Voir l&apos;analyse</>
                  }
                </button>
                {currentIdx<totalEx-1&&(
                  <button onClick={goNext}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 13px',
                      background:'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.25))',
                      border:'1px solid rgba(99,102,241,0.45)',
                      borderRadius:9,cursor:'pointer',fontSize:12,fontWeight:700,color:'#c4b5fd',fontFamily:'inherit'}}>
                    Ex.{currentIdx+2} →
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Énoncé */}
        <div style={{padding:'16px 24px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(0,0,0,0.2)'}}>
          <p style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 8px'}}>Énoncé</p>
          {currentEx?.graph && currentEx.graph !== 'null' && <TextWithGraphs text={currentEx.graph} />}
          <TextWithGraphs text={currentEx?.statement || ''} />
        </div>

        {/* Correction */}
        <div style={{padding:'20px 24px'}}>
          {generating && !currentCorrection ? (
            <div style={{textAlign:'center',padding:'40px 20px'}}>
              <div style={{fontSize:44,marginBottom:14,animation:'float 2s ease-in-out infinite'}}>⚡</div>
              <h4 style={{color:'#e2e8f0',marginBottom:8,fontSize:16}}>Correction de l&apos;exercice {currentIdx+1}...</h4>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:13,marginBottom:20}}>L&apos;IA rédige la correction complète et détaillée</p>
              <div style={{width:240,height:3,borderRadius:3,background:'rgba(255,255,255,0.06)',margin:'0 auto',overflow:'hidden'}}>
                <div style={{height:'100%',background:`linear-gradient(90deg,${colors[currentIdx%colors.length]},#10b981)`,borderRadius:3,animation:'slideBar 1.8s ease-in-out infinite'}}/>
              </div>
            </div>
          ) : currentCorrection ? (
            <div>
              <p style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 14px'}}>
                ✅ Correction complète
              </p>
              <MD text={currentCorrection}/>
            </div>
          ) : (
            <div style={{textAlign:'center',padding:'20px'}}>
              <button onClick={generateCurrent}
                style={{padding:'12px 24px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:12,color:'white',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'inherit'}}>
                ⚡ Générer la correction
              </button>
            </div>
          )}
        </div>

        {/* Analyse par exercice — apparaît après correction */}
        {/* Badge analyse → ouvre page pleine */}
        {currentCorrection&&(
          <div style={{margin:'8px 20px 12px',display:'flex',alignItems:'center',gap:10}}>
            {analyzingEx===currentIdx&&!perExAnalysis[currentIdx]&&(
              <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',borderRadius:8,background:'rgba(99,102,241,0.06)',border:'1px solid rgba(99,102,241,0.15)',fontSize:12,color:'rgba(255,255,255,0.5)'}}>
                <div style={{width:12,height:12,border:'2px solid rgba(99,102,241,0.3)',borderTopColor:'#6366f1',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
                Analyse de l&apos;exercice {currentIdx+1} en cours…
              </div>
            )}
            {perExAnalysis[currentIdx]&&(
              <button onClick={()=>{ if(onOpenAnalyse) onOpenAnalyse(currentIdx, perExAnalysis[currentIdx], exam.exercises[currentIdx]) }}
                style={{display:'flex',alignItems:'center',gap:10,padding:'10px 20px',borderRadius:10,
                  background:'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,214,160,0.1))',
                  border:'1px solid rgba(16,185,129,0.4)',cursor:'pointer',fontFamily:'inherit',
                  boxShadow:'0 0 16px rgba(16,185,129,0.2)'}}>
                <span style={{fontSize:20,fontWeight:900,color:perExAnalysis[currentIdx].estimatedScore/perExAnalysis[currentIdx].maxScore>=0.6?'#10b981':'#f59e0b'}}>
                  {perExAnalysis[currentIdx].estimatedScore}/{perExAnalysis[currentIdx].maxScore}
                </span>
                <div style={{textAlign:'left'}}>
                  <div style={{fontSize:12,fontWeight:700,color:'#6ee7b7'}}>📊 Analyse disponible</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>Cliquez pour voir le détail et la remédiation →</div>
                </div>
              </button>
            )}
          </div>
        )}
        {/* Footer navigation */}
        {currentCorrection && (
          <div style={{padding:'16px 24px',borderTop:'1px solid rgba(255,255,255,0.07)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.35)'}}>
              Exercice {currentIdx+1} / {totalEx} corrigé ✓
            </div>
            <div style={{display:'flex',gap:10}}>
              {currentIdx < totalEx - 1 ? (
                <button onClick={goNext}
                  style={{padding:'10px 24px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',borderRadius:11,color:'white',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 16px rgba(99,102,241,0.4)',display:'flex',alignItems:'center',gap:8}}>
                  Exercice {currentIdx+2} →
                  {corrections[currentIdx+1]
                    ? <span style={{fontSize:11,opacity:0.7}}>déjà corrigé</span>
                    : <span style={{fontSize:11,opacity:0.7}}>générer</span>
                  }
                </button>
              ) : (
                <button onClick={handleFinish}
                  style={{padding:'10px 24px',background:'linear-gradient(135deg,#10b981,#059669)',border:'none',borderRadius:11,color:'white',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 16px rgba(16,185,129,0.4)',display:'flex',alignItems:'center',gap:8}}>
                  📊 Analyser mes points faibles →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tableau récapitulatif final — visible quand tous les exercices sont corrigés */}
      {allDone && (
        <div style={{marginTop:28,padding:'20px 24px',background:'linear-gradient(135deg,rgba(16,185,129,0.06),rgba(6,214,160,0.04))',border:'1px solid rgba(16,185,129,0.2)',borderRadius:18}}>
          <p style={{fontSize:12,fontWeight:700,color:'#6ee7b7',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 14px',display:'flex',alignItems:'center',gap:8}}>
            ✅ Toutes les corrections sont prêtes — Téléchargez par exercice
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:10}}>
            {exam.exercises.map((ex, i) => {
              const c = colors[i % colors.length]
              return (
                <div key={i} style={{padding:'14px 16px',background:'rgba(255,255,255,0.03)',border:`1px solid ${c}30`,borderRadius:12,display:'flex',flexDirection:'column',gap:10}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{width:28,height:28,borderRadius:'50%',background:c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,color:'white',fontWeight:900,flexShrink:0}}>{i+1}</span>
                    <div>
                      <p style={{margin:0,fontWeight:700,fontSize:12,color:'rgba(255,255,255,0.85)'}}>{ex.title}</p>
                      <p style={{margin:0,fontSize:10,color:'rgba(255,255,255,0.35)'}}>{ex.theme} · {ex.points} pts</p>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    {pdfMsg[i] && <span style={{fontSize:10,color:'#6ee7b7',fontWeight:600}}>✓ {pdfMsg[i]}</span>}
                    <button onClick={() => setCurrentIdx(i)}
                      style={{flex:1,fontSize:11,padding:'6px 10px',borderRadius:8,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontFamily:'inherit',fontWeight:600}}>
                      👁 Revoir
                    </button>
                    <button onClick={() => openExercisePdf(i)}
                      style={{flex:1,fontSize:11,padding:'6px 10px',borderRadius:8,border:`1px solid ${c}50`,background:`${c}12`,color:c,cursor:'pointer',fontFamily:'inherit',fontWeight:700}}>
                      🎨 Imprimer
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>

  )
}

// ═══════════════════════════════════════════════════════════════════
// PHASE 6 — ANALYSE + REMÉDIATION
// ═══════════════════════════════════════════════════════════════════
function PhaseAnalysis({ analysis, onRestart }: {
  analysis:AnalysisResult|null; onRestart:()=>void
}) {
  const [remAnswers, setRemAnswers] = useState<Record<string,string>>({})
  const [remFeedback, setRemFeedback] = useState<Record<string,string>>({})
  const [remLoading, setRemLoading] = useState<Record<string,boolean>>({})
  const [showHint, setShowHint] = useState<Record<string,boolean>>({})
  const [showCorrection, setShowCorrection] = useState<Record<string,boolean>>({})
  const [remSavedMsg, setRemSavedMsg] = useState<Record<string,string>>({})
  const remFileRefs = useRef<Record<string,HTMLInputElement|null>>({})

  const showMsg = (id: string, msg: string) => {
    setRemSavedMsg(p=>({...p,[id]:msg}))
    setTimeout(()=>setRemSavedMsg(p=>({...p,[id]:''})), 2500)
  }

  const downloadRemAnswer = (ex: AnalysisResult['remediationExercises'][number]) => {
    const ans = remAnswers[ex.id] || ''
    if (!ans.trim()) return
    const blob = new Blob([
      `REMÉDIATION — ${ex.theme}\nDate : ${new Date().toLocaleString('fr-FR')}\n${'='.repeat(50)}\n\nÉnoncé :\n${ex.statement}\n\n${'='.repeat(50)}\n\nMa réponse :\n${ans}`
    ], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `Remediation-${ex.theme.replace(/[^\w-]/g,'-')}.txt`
    a.click(); URL.revokeObjectURL(url)
    showMsg(ex.id, 'Réponse téléchargée !')
  }

  const downloadRemFeedback = (ex: AnalysisResult['remediationExercises'][number]) => {
    const feedback = remFeedback[ex.id] || ''
    if (!feedback.trim()) return
    const blob = new Blob([
      `CORRECTION IA — ${ex.theme}\nDate : ${new Date().toLocaleString('fr-FR')}\n${'='.repeat(50)}\n\nÉnoncé :\n${ex.statement}\n\nMa réponse :\n${remAnswers[ex.id]||''}\n\n${'='.repeat(50)}\n\nCorrection IA :\n${feedback}`
    ], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `Correction-Rem-${ex.theme.replace(/[^\w-]/g,'-')}.txt`
    a.click(); URL.revokeObjectURL(url)
    showMsg(ex.id, 'Correction téléchargée !')
  }

  const handleRemFile = async (e: React.ChangeEvent<HTMLInputElement>, exId: string) => {
    const files = Array.from(e.target.files || []) as File[]
    if (!files.length) return
    for (const file of files) {
      if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const text = await file.text()
        setRemAnswers(p=>({...p,[exId]: p[exId] ? p[exId]+'\n\n--- '+file.name+' ---\n'+text : text}))
        showMsg(exId, 'Fichier importé !')
      } else if (file.type.startsWith('image/')) {
        showMsg(exId, 'Image reçue — recopiez votre réponse en texte pour la correction IA')
      }
    }
    if (remFileRefs.current[exId]) remFileRefs.current[exId]!.value = ''
  }

  const openRemFeedbackPdf = (ex: AnalysisResult['remediationExercises'][number]) => {
    const feedback = remFeedback[ex.id] || ''
    const answer   = remAnswers[ex.id]  || ''
    const diffLabel: Record<string,string> = {introductory:'Introductif',standard:'Standard',advanced:'Avancé'}
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:'Inter','Segoe UI',system-ui,sans-serif;background:#0c0c1a;color:#e2e8f0;font-size:13.5px;line-height:1.8;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .wrap{max-width:820px;margin:0 auto;padding:28px 36px 60px}
      .print-bar{position:sticky;top:0;z-index:99;background:#0c0c1a;border-bottom:1px solid rgba(255,255,255,.1);padding:10px 0 14px;margin-bottom:20px;display:flex;align-items:center;gap:12px}
      .print-btn{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;border-radius:8px;padding:10px 24px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
      .print-hint{font-size:11.5px;color:rgba(255,255,255,.4);max-width:460px;line-height:1.5}
      .doc-title{background:linear-gradient(135deg,#1e1b4b,#2e1065);border:1px solid #8b5cf6;border-radius:12px;padding:20px 24px;margin-bottom:24px;text-align:center}
      .doc-title h1{font-size:17px;font-weight:900;color:#fff;margin-bottom:4px}
      .doc-title .sub{color:#c4b5fd;font-size:12px}
      .badge{display:inline-block;padding:3px 12px;border-radius:12px;font-size:11px;font-weight:700;margin:0 4px}
      .enonce{background:#1a1a35;border:1px solid rgba(255,255,255,.1);border-left:4px solid #8b5cf6;border-radius:8px;padding:16px 18px;margin-bottom:8px;font-size:13px;color:#e2e8f0;line-height:1.8}
    .enonce-text{background:#1a1a35;border:1px solid rgba(255,255,255,.1);border-left:4px solid #8b5cf6;border-radius:8px;padding:12px 18px;margin-bottom:20px;white-space:pre-wrap;font-size:13px;color:#e2e8f0;line-height:1.8}
      .section-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;margin-top:20px}
      .answer-block{background:#0f2040;border:1px solid #3b82f6;border-radius:10px;padding:14px 18px;white-space:pre-wrap;font-size:13px;color:#bfdbfe;line-height:1.8}
      .correction-block{background:#0c1a10;border:1px solid #10b981;border-radius:10px;padding:16px 20px;margin-top:20px}
      .correction-block h2{color:#34d399;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px}
      .hint-block{background:#1c2a10;border-left:3px solid #84cc16;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:14px;color:#bef264;font-size:12px}
      p{color:#cbd5e1;font-size:12.5px;margin:5px 0}
      strong{color:#f1f5f9;font-weight:700}
      em{color:#94a3b8}
      code{background:rgba(255,255,255,.1);padding:1px 6px;border-radius:4px;font-family:monospace;font-size:.9em}
      hr{border:0;border-top:1px solid rgba(255,255,255,.08);margin:16px 0}
      .footer{margin-top:40px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08);text-align:center;color:rgba(255,255,255,.25);font-size:10.5px}
      @media print{.print-bar{display:none!important}.wrap{padding:12px 20px}}
    `
    const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    const md2html = (s: string) => esc(s)
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/`(.+?)`/g,'<code>$1</code>')

    const feedbackHtml = feedback.split('\n').map(line => {
      const t = line.trim()
      if (!t) return '<div style="height:5px"></div>'
      if (t.startsWith('## ')) return '<h3 style="color:#a5b4fc;font-size:14px;font-weight:800;margin:18px 0 8px">'+md2html(t.slice(3))+'</h3>'
      if (t.startsWith('### ')) return '<h4 style="color:#e2e8f0;font-size:13px;font-weight:700;margin:12px 0 6px">'+md2html(t.slice(4))+'</h4>'
      if (t.startsWith('> ')) return '<div style="background:#052e16;border:2px solid #10b981;border-radius:7px;padding:10px 14px;color:#6ee7b7;font-weight:700;margin:10px 0">'+md2html(t.slice(2))+'</div>'
      if (t.startsWith('- ')) return '<div style="padding:3px 0 3px 18px;position:relative;color:#cbd5e1"><span style="position:absolute;left:4px;color:#8b5cf6;font-weight:700">›</span>'+md2html(t.slice(2))+'</div>'
      if (t === '---') return '<hr>'
      if (/^\*\*(Concept|Resultat|Bareme|Erreur|Astuce|Point)/i.test(t)) {
        const bg = /Resultat/i.test(t)?'#052e16':/Erreur/i.test(t)?'#450a0a':/Bareme/i.test(t)?'#2e1065':'#1e3254'
        const col = /Resultat/i.test(t)?'#6ee7b7':/Erreur/i.test(t)?'#fca5a5':/Bareme/i.test(t)?'#c4b5fd':'#bfdbfe'
        return '<div style="background:'+bg+';border-radius:6px;padding:8px 14px;color:'+col+';margin:6px 0">'+md2html(t)+'</div>'
      }
      return '<p>'+md2html(t)+'</p>'
    }).join('\n')

    const hintHtml = ex.hint
      ? '<div class="hint-block"><strong>💡 Indice :</strong> '+esc(ex.hint)+'</div>' : ''
    const answerHtml = answer.trim()
      ? '<div class="section-label" style="color:#93c5fd">Ma réponse soumise</div><div class="answer-block">'+esc(answer)+'</div>' : ''

    const html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Correction Remédiation — '+esc(ex.theme)+'</title><style>'+css+'</style></head><body><div class="wrap">'
      +'<div class="print-bar"><button class="print-btn" onclick="window.print()">🖨 Imprimer / Enregistrer en PDF</button>'
      +'<span class="print-hint">Boîte d\'impression → <strong style="color:rgba(255,255,255,.6)">Enregistrer en PDF</strong> · Activez <strong style="color:rgba(255,255,255,.6)">Couleurs de fond</strong></span></div>'
      +'<div class="doc-title"><h1>Exercice de remédiation</h1>'
      +'<div class="sub">'+esc(ex.theme)
        +' · <span class="badge" style="background:rgba(139,92,246,.2);color:#c4b5fd">'+esc(diffLabel[ex.difficulty]||ex.difficulty)+'</span>'
        +' · '+esc(ex.objective)+'</div></div>'
      +'<div class="section-label" style="color:#94a3b8">Énoncé</div>'
      +'<div class="enonce">'+''+'</div>'
      +'<div class="enonce-text">'+ex.statement+'</div>'
      +hintHtml
      +answerHtml
      +'<div class="correction-block"><h2>🤖 Correction IA personnalisée</h2>'+feedbackHtml+'</div>'
      +'<div class="footer">MathAI Coach — Remédiation · '+esc(ex.theme)+' · '+new Date().toLocaleDateString('fr-FR')+'</div>'
      +'</div></body></html>'

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url  = URL.createObjectURL(blob)
    const win  = window.open(url, '_blank')
    if (!win) {
      const a = document.createElement('a')
      a.href = url; a.download = 'Remediation-'+ex.theme.replace(/[^\w-]/g,'-')+'.html'
      a.click()
    }
    setTimeout(() => URL.revokeObjectURL(url), 8000)
  }

  const checkRemediation = async(ex:AnalysisResult['remediationExercises'][number]) => {
    setRemLoading(p=>({...p,[ex.id]:true}))
    const feedback = await correctRemediationExercise(ex, remAnswers[ex.id]||'')
    setRemFeedback(p=>({...p,[ex.id]:feedback}))
    setRemLoading(p=>({...p,[ex.id]:false}))
  }

  if (!analysis) {
    return (
      <div style={{textAlign:'center',padding:'60px 20px'}}>
        <div style={{fontSize:52,marginBottom:16,animation:'float 2s ease-in-out infinite'}}>🔬</div>
        <h3 style={{color:'#e2e8f0'}}>Analyse en cours...</h3>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:13}}>
          L&apos;IA identifie vos points faibles et prepare vos exercices de remediation
        </p>
        <div style={{width:260,height:4,borderRadius:4,background:'rgba(255,255,255,0.06)',margin:'24px auto 0',overflow:'hidden'}}>
          <div style={{height:'100%',background:'linear-gradient(90deg,#8b5cf6,#ec4899)',borderRadius:4,animation:'slideBar 1.8s ease-in-out infinite'}}/>
        </div>
      </div>
    )
  }

  const scoreColor = analysis.estimatedScore/analysis.maxScore >= 0.7 ? '#10b981'
    : analysis.estimatedScore/analysis.maxScore >= 0.5 ? '#f59e0b' : '#ef4444'
  const scorePct = Math.round((analysis.estimatedScore/analysis.maxScore)*100)
  const sevColor: Record<string,string> = {critical:'#ef4444',moderate:'#f59e0b',good:'#10b981'}
  const sevLabel: Record<string,string> = {critical:'Priorite haute',moderate:'A ameliorer',good:'Maitrise'}
  const diffColor: Record<string,string> = {introductory:'#10b981',standard:'#f59e0b',advanced:'#ef4444'}
  const diffLabel: Record<string,string> = {introductory:'Introductif',standard:'Standard',advanced:'Avance'}

  return (
    <div>
      {/* Score + resume */}
      <div style={{display:'grid',gridTemplateColumns:'160px 1fr',gap:24,marginBottom:32,padding:'24px 28px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,alignItems:'center'}}>
        <div style={{textAlign:'center'}}>
          <svg width="120" height="120" style={{transform:'rotate(-90deg)'}}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke={scoreColor} strokeWidth="10"
              strokeDasharray={`${(scorePct/100)*314} 314`} strokeLinecap="round"
              style={{transition:'stroke-dasharray 1.2s ease'}}/>
          </svg>
          <div style={{marginTop:-60,marginBottom:40}}>
            <div style={{fontSize:42,fontWeight:900,color:scoreColor}}>{analysis.estimatedScore}</div>
            <div style={{fontSize:16,color:'rgba(255,255,255,0.35)'}}>/{analysis.maxScore}</div>
          </div>
          <div style={{fontSize:12,fontWeight:700,color:scoreColor}}>
            {scorePct>=80?'Excellent ! 🏆':scorePct>=60?'Bien 👍':scorePct>=40?'En progres':'A travailler 💪'}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {analysis.strengths.length>0&&(
            <div>
              <p style={{fontSize:11,fontWeight:700,color:'#6ee7b7',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 8px'}}>Points forts</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                {analysis.strengths.map((s,i)=>(
                  <span key={i} style={{fontSize:12,padding:'4px 13px',background:'rgba(16,185,129,0.12)',color:'#6ee7b7',border:'1px solid rgba(16,185,129,0.25)',borderRadius:20}}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {analysis.globalAdvice.length>0&&(
            <div>
              <p style={{fontSize:11,fontWeight:700,color:'#a5b4fc',textTransform:'uppercase',letterSpacing:'0.08em',margin:'0 0 8px'}}>Recommandations personnalisees</p>
              <div style={{display:'flex',flexDirection:'column',gap:5}}>
                {analysis.globalAdvice.map((a,i)=>(
                  <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',padding:'7px 13px',background:'rgba(99,102,241,0.08)',borderRadius:9,fontSize:12,color:'rgba(255,255,255,0.7)'}}>
                    <span style={{color:'#6366f1',fontWeight:700,flexShrink:0}}>{i+1}.</span>{a}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analyse par theme */}
      {analysis.weakAreas.length>0&&(
        <div style={{marginBottom:32}}>
          <h4 style={{margin:'0 0 14px',display:'flex',alignItems:'center',gap:8,color:'#e2e8f0'}}>
            Analyse par theme
          </h4>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:12}}>
            {[...analysis.weakAreas].sort((a,b)=>a.priority-b.priority).map((w,i)=>{
              const c = sevColor[w.severity]||'#10b981'
              return (
                <div key={i} style={{padding:'15px 18px',background:'rgba(255,255,255,0.03)',borderLeft:`3px solid ${c}`,border:`1px solid rgba(255,255,255,0.06)`,borderRadius:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:7,gap:8}}>
                    <span style={{fontWeight:700,fontSize:13,color:'rgba(255,255,255,0.85)'}}>{w.theme}</span>
                    <span style={{fontSize:9,background:`${c}20`,color:c,padding:'2px 8px',borderRadius:10,fontWeight:700,flexShrink:0}}>{sevLabel[w.severity]}</span>
                  </div>
                  <p style={{fontSize:12,color:'rgba(255,255,255,0.5)',lineHeight:1.65,margin:0}}>{w.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Exercices de remediation */}
      {analysis.remediationExercises.length>0&&(
        <div style={{marginBottom:32}}>
          <h4 style={{margin:'0 0 6px',color:'#e2e8f0'}}>Exercices de remediation personnalises</h4>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginBottom:20}}>
            Exercices crees pour renforcer vos points faibles. Soumettez vos reponses pour une correction IA instantanee.
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:20}}>
            {analysis.remediationExercises.map((ex,i)=>{
              const dc = diffColor[ex.difficulty]||'#f59e0b'
              const hasFeedback = !!remFeedback[ex.id]
              return (
                <div key={ex.id} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:18,overflow:'hidden'}}>
                  <div style={{padding:'14px 20px',background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
                    <div style={{display:'flex',gap:10,alignItems:'center'}}>
                      <div style={{width:30,height:30,borderRadius:8,background:`${dc}20`,border:`1px solid ${dc}40`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:12,color:dc,flexShrink:0}}>{i+1}</div>
                      <div>
                        <p style={{margin:0,fontWeight:700,fontSize:13,color:'rgba(255,255,255,0.85)'}}>{ex.theme}</p>
                        <p style={{margin:0,fontSize:11,color:'rgba(255,255,255,0.35)'}}>{ex.objective}</p>
                      </div>
                    </div>
                    <span style={{fontSize:10,fontWeight:700,color:dc,background:`${dc}15`,padding:'3px 12px',borderRadius:10}}>{diffLabel[ex.difficulty]}</span>
                  </div>
                  <div style={{padding:'20px 20px 0'}}>
                    <div style={{marginBottom:14,padding:'14px 16px',background:'rgba(0,0,0,0.2)',borderRadius:11}}>
                      <p style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',margin:'0 0 8px'}}>Enonce</p>
                      {(ex as any).graph && (ex as any).graph !== 'null' && <TextWithGraphs text={(ex as any).graph} />}
                      <TextWithGraphs text={ex.statement} />
                    </div>
                    <div style={{marginBottom:14}}>
                      <button onClick={()=>setShowHint(p=>({...p,[ex.id]:!p[ex.id]}))}
                        style={{fontSize:12,fontWeight:600,color:'#fbbf24',background:'rgba(251,191,36,0.08)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:9,padding:'7px 14px',cursor:'pointer',fontFamily:'inherit'}}>
                        {showHint[ex.id]?'Masquer':'Voir'} indice
                      </button>
                      {showHint[ex.id]&&(
                        <div style={{marginTop:8,padding:'11px 15px',background:'rgba(251,191,36,0.06)',border:'1px solid rgba(251,191,36,0.18)',borderRadius:9,fontSize:12,color:'rgba(255,255,255,0.65)'}}>
                          {ex.hint}
                        </div>
                      )}
                    </div>
                    {!hasFeedback&&(
                      <div style={{marginBottom:14}}>
                        {/* Barre outils réponse */}
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6,flexWrap:'wrap',gap:6}}>
                          <span style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Votre réponse</span>
                          <div style={{display:'flex',gap:6,alignItems:'center'}}>
                            {remSavedMsg[ex.id] && (
                              <span style={{fontSize:11,color:'#6ee7b7',fontWeight:600,padding:'2px 8px',background:'rgba(16,185,129,0.1)',borderRadius:5}}>
                                ✓ {remSavedMsg[ex.id]}
                              </span>
                            )}
                            {/* Import fichier */}
                            <button
                              onClick={()=>remFileRefs.current[ex.id]?.click()}
                              style={{padding:'4px 10px',borderRadius:7,border:'1px solid rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.45)',cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}
                              title="Importer un fichier .txt ou une photo">
                              📁 Importer
                            </button>
                            <input
                              ref={el=>{ remFileRefs.current[ex.id]=el }}
                              type="file" accept=".txt,.md,.jpg,.jpeg,.png,.webp"
                              multiple onChange={e=>handleRemFile(e, ex.id)}
                              style={{display:'none'}}/>
                            {/* Télécharger réponse */}
                            <button
                              onClick={()=>downloadRemAnswer(ex)}
                              disabled={!remAnswers[ex.id]?.trim()}
                              style={{padding:'4px 10px',borderRadius:7,
                                border:'1px solid rgba(99,102,241,0.3)',
                                background:remAnswers[ex.id]?.trim()?'rgba(99,102,241,0.1)':'transparent',
                                color:remAnswers[ex.id]?.trim()?'#a5b4fc':'rgba(255,255,255,0.2)',
                                cursor:remAnswers[ex.id]?.trim()?'pointer':'not-allowed',
                                fontSize:11,fontWeight:600,fontFamily:'inherit',display:'flex',alignItems:'center',gap:4}}
                              title="Télécharger ma réponse en .txt">
                              ⬇ Sauvegarder
                            </button>
                          </div>
                        </div>
                        <textarea
                          value={remAnswers[ex.id]||''}
                          onChange={e=>setRemAnswers(p=>({...p,[ex.id]:e.target.value}))}
                          placeholder="Rédigez votre réponse ici, ou importez un fichier .txt..."
                          style={{width:'100%',height:110,padding:'12px 14px',borderRadius:10,border:'1px solid rgba(255,255,255,0.09)',background:'rgba(0,0,0,0.2)',color:'rgba(255,255,255,0.8)',fontSize:13,resize:'vertical',outline:'none',fontFamily:'inherit',lineHeight:1.75,boxSizing:'border-box',transition:'border 0.2s'}}
                          onFocus={e=>e.target.style.borderColor='rgba(99,102,241,0.4)'}
                          onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.09)'}/>
                        {remAnswers[ex.id] && (
                          <p style={{fontSize:10,color:'rgba(255,255,255,0.2)',margin:'4px 0 0',textAlign:'right'}}>{remAnswers[ex.id].length} caractères</p>
                        )}
                      </div>
                    )}
                    <div style={{display:'flex',gap:10,marginBottom:16,flexWrap:'wrap'}}>
                      {!hasFeedback&&(
                        <PrimaryBtn onClick={()=>checkRemediation(ex)} loading={remLoading[ex.id]}>
                          {remLoading[ex.id]?'Correction en cours...':'Corriger par IA →'}
                        </PrimaryBtn>
                      )}
                      <button onClick={()=>setShowCorrection(p=>({...p,[ex.id]:!p[ex.id]}))}
                        style={{padding:'9px 16px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'rgba(255,255,255,0.45)',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:'inherit'}}>
                        {showCorrection[ex.id]?'Masquer':'Voir'} correction officielle
                      </button>
                    </div>
                    {showCorrection[ex.id]&&(
                      <div style={{marginBottom:16,padding:'14px 16px',background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:10}}>
                        <MD text={ex.officialCorrection}/>
                      </div>
                    )}
                    {hasFeedback&&(
                      <div style={{marginBottom:20,padding:'16px 18px',background:'rgba(99,102,241,0.07)',border:'1px solid rgba(99,102,241,0.22)',borderRadius:12}}>
                        {/* Header feedback */}
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,flexWrap:'wrap',gap:8}}>
                          <p style={{fontSize:10,fontWeight:700,color:'#a5b4fc',textTransform:'uppercase',margin:0}}>🤖 Correction IA personnalisée</p>
                          <div style={{display:'flex',gap:7,alignItems:'center',flexWrap:'wrap'}}>
                            {remSavedMsg[ex.id] && (
                              <span style={{fontSize:11,color:'#6ee7b7',fontWeight:600,padding:'2px 8px',background:'rgba(16,185,129,0.1)',borderRadius:5}}>
                                ✓ {remSavedMsg[ex.id]}
                              </span>
                            )}
                            {/* Télécharger .txt */}
                            <button onClick={()=>downloadRemFeedback(ex)}
                              style={{padding:'5px 10px',borderRadius:7,
                                border:'1px solid rgba(255,255,255,0.12)',
                                background:'rgba(255,255,255,0.05)',
                                color:'rgba(255,255,255,0.55)',cursor:'pointer',
                                fontSize:11,fontWeight:600,fontFamily:'inherit',
                                display:'flex',alignItems:'center',gap:4}}
                              title="Télécharger en .txt">
                              📄 .txt
                            </button>
                            {/* Ouvrir PDF coloré */}
                            <button onClick={()=>openRemFeedbackPdf(ex)}
                              style={{padding:'5px 12px',borderRadius:7,
                                border:'1px solid rgba(99,102,241,0.35)',
                                background:'rgba(99,102,241,0.12)',
                                color:'#a5b4fc',cursor:'pointer',
                                fontSize:11,fontWeight:700,fontFamily:'inherit',
                                display:'flex',alignItems:'center',gap:5}}
                              title="Ouvrir correction colorée → Imprimer → PDF">
                              🎨 PDF coloré
                            </button>
                          </div>
                        </div>
                        <MD text={remFeedback[ex.id]}/>
                        <button
                          onClick={()=>{
                            setRemFeedback(p=>{const n={...p};delete n[ex.id];return n})
                            setRemAnswers(p=>({...p,[ex.id]:''}))
                          }}
                          style={{marginTop:14,fontSize:11,padding:'6px 14px',borderRadius:8,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'rgba(255,255,255,0.35)',cursor:'pointer',fontFamily:'inherit'}}>
                          ↩ Refaire cet exercice
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div style={{marginTop:20,padding:'28px 32px',background:'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.06))',border:'1px solid rgba(99,102,241,0.2)',borderRadius:20,textAlign:'center'}}>
        <p style={{fontSize:22,marginBottom:8}}>🚀</p>
        <h4 style={{margin:'0 0 8px',color:'#e2e8f0',fontSize:17}}>Pret pour une nouvelle simulation ?</h4>
        <p style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginBottom:20}}>Chaque session renforce vos competences.</p>
        <PrimaryBtn onClick={onRestart}>Nouvelle simulation →</PrimaryBtn>
      </div>
    </div>
  )
}



// ═══════════════════════════════════════════════════════════════════
// PHASE GÉNÉRATION — MODE CHAPITRE (1 seul examen ciblé)
// ═══════════════════════════════════════════════════════════════════
function PhaseGeneratingChapitres({ chapitres, sectionLabel, onDone }: {
  chapitres: {titre:string;badge:string;desc:string}[]
  sectionLabel: string
  onDone: (exams: GeneratedExam[]) => void
}) {
  const { isAdmin, checkQuota, incrementQuota: incrementQuotaSub, quotas, quotaLimits } = useAuth()
  const [exams, setExams] = useState<GeneratedExam[]>([])
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const started = useRef(false)

  const simUsed      = quotas?.simulations_used || 0
  const simLimit     = quotaLimits.simulations_per_week
  const isUnlimited  = isAdmin || simLimit === -1
  const limitReached = !isUnlimited && simUsed >= simLimit

  const generateNext = useCallback(async (idx: number) => {
    setGenerating(true); setError('')
    try {
      const sectionKey = Object.values(CHAPITRES_PAR_SECTION).find(s=>s.label===sectionLabel)?.key || 'maths'
      const exam = await generateChapterExam(chapitres, sectionKey, sectionLabel, idx)
      setExams(prev => [...prev, exam])
      await incrementQuotaSub('simulations')
    } catch(e) {
      setError('Erreur lors de la génération. Vérifiez votre connexion.')
    }
    setGenerating(false)
  }, [chapitres, sectionLabel, incrementQuotaSub])

  useEffect(() => {
    if (started.current) return
    started.current = true
    if (!isAdmin && !checkQuota('simulations')) return
    generateNext(0)
  }, [])

  const canStart = exams.length > 0

  const BADGE_COLORS: Record<string,string> = {
    'Analyse':'#6366f1','Algèbre':'#8b5cf6','Géométrie':'#06d6a0',
    'Intégration':'#10b981','Probabilités':'#f59e0b','Statistiques':'#f97316',
    'Finance':'#ec4899','Fondements':'#a78bfa','Maths':'#6366f1',
  }

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h3 style={{margin:'0 0 6px',fontSize:20,color:'#e2e8f0'}}>📚 Génération de votre examen ciblé</h3>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:10}}>
          {chapitres.map(c=>{
            const col = BADGE_COLORS[c.badge]||'#6366f1'
            return (
              <span key={c.titre} style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:12,fontWeight:600,padding:'5px 12px',borderRadius:20,background:`${col}20`,color:col,border:`1px solid ${col}40`}}>
                📚 {c.titre}
              </span>
            )
          })}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:14,marginBottom:24}}>
        {exams.map((ex, i)=>{
          const colors = ['#06d6a0','#6366f1','#f59e0b','#8b5cf6','#ec4899']
          const c = colors[i % colors.length]
          return (
            <div key={ex.id} style={{padding:'18px 20px',background:'rgba(255,255,255,0.05)',border:`1px solid ${c}40`,borderRadius:14}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div style={{width:32,height:32,borderRadius:8,background:`${c}20`,border:`1px solid ${c}50`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,color:c}}>#{i+1}</div>
                <span style={{fontSize:11,color:c,background:`${c}15`,padding:'3px 10px',borderRadius:8,fontWeight:700}}>{ex.totalPoints}/20</span>
              </div>
              <p style={{margin:'0 0 8px',fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.85)',lineHeight:1.3}}>
                {ex.exercises.map(e=>e.theme).join(' · ')}
              </p>
              <div style={{marginTop:10,fontSize:11,color:'#6ee7b7',fontWeight:600}}>✓ Prêt</div>
            </div>
          )
        })}

        {generating && (
          <div style={{padding:'18px 20px',background:'rgba(6,214,160,0.06)',border:'1px dashed rgba(6,214,160,0.3)',borderRadius:14,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,minHeight:130}}>
            <div style={{width:36,height:36,borderRadius:'50%',border:'3px solid rgba(6,214,160,0.2)',borderTopColor:'#06d6a0',animation:'spin 0.8s linear infinite'}}/>
            <p style={{margin:0,fontSize:12,color:'rgba(255,255,255,0.4)',textAlign:'center'}}>
              Génération de l'examen ciblé sur<br/>{chapitres.map(c=>c.titre).join(', ')}...
            </p>
          </div>
        )}

        {!generating && exams.length < 3 && exams.length > 0 && !limitReached && (
          <div onClick={()=>generateNext(exams.length)}
            style={{padding:'18px 20px',background:'rgba(255,255,255,0.02)',border:'1px dashed rgba(255,255,255,0.12)',borderRadius:14,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,cursor:'pointer',minHeight:130,transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(6,214,160,0.4)';e.currentTarget.style.background='rgba(6,214,160,0.06)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';e.currentTarget.style.background='rgba(255,255,255,0.02)'}}>
            <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(6,214,160,0.15)',border:'1px solid rgba(6,214,160,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,color:'#06d6a0'}}>+</div>
            <p style={{margin:0,fontSize:12,color:'rgba(255,255,255,0.4)',textAlign:'center',lineHeight:1.5}}>
              Générer variante #{exams.length+1}<br/>
              <span style={{fontSize:10,color:'rgba(255,255,255,0.25)'}}>Même chapitres, énoncé différent</span>
            </p>
          </div>
        )}
      </div>

      {error && (
        <div style={{marginBottom:16,padding:'12px 16px',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:10,display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
          <span style={{fontSize:13,color:'#fca5a5'}}>⚠️ {error}</span>
          <button onClick={()=>generateNext(exams.length)}
            style={{fontSize:12,padding:'5px 12px',borderRadius:7,border:'1px solid rgba(239,68,68,0.4)',background:'transparent',color:'#fca5a5',cursor:'pointer',fontFamily:'inherit',flexShrink:0}}>
            Réessayer
          </button>
        </div>
      )}

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,paddingTop:4,borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <p style={{margin:0,fontSize:13,color:'rgba(255,255,255,0.35)'}}>
          {exams.length} variante{exams.length>1?'s':''} générée{exams.length>1?'s':''}
          {isAdmin && ' · 👑 Admin — illimité'}
        </p>
        <PrimaryBtn onClick={()=>onDone(exams)} disabled={!canStart}
          style={{background:'linear-gradient(135deg,#06d6a0,#059669)'}}>
          {canStart ? `Choisir parmi ${exams.length} variante${exams.length>1?'s':''} →` : 'En attente...'}
        </PrimaryBtn>
      </div>

      <style>{`@keyframes fadeSlideIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}

function SimulationIAPageInner() {
  const [phase, setPhase] = useState<Phase>('select')
  const [archives, setArchives] = useState<Archive[]>([])
  const [customText, setCustomText] = useState('')
  const [generatedExams, setGeneratedExams] = useState<GeneratedExam[]>([])
  const [activeExam, setActiveExam] = useState<GeneratedExam|null>(null)
  const [examGraphs, setExamGraphs] = useState<Record<number,string>>({})
  const [studentAnswers, setStudentAnswers] = useState('')
  const [correctionText, setCorrectionText] = useState('')
  const [gradeResult, setGradeResult] = useState<{score:number;maxScore:number;comment:string;breakdown:{title:string;pts:number;max:number;reason:string}[]}|null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult|null>(null)
  const [analysePageData, setAnalysePageData] = useState<{
    analysis: AnalysisResult
    exercise: { title:string; theme:string; points:number; statement:string; graph?:string }
    exerciseNum: number
  } | null>(null)

  // ── Mode chapitre ──
  const [chapitresMode, setChapitresMode] = useState(false)
  const [selectedChapitres, setSelectedChapitres] = useState<{titre:string;badge:string;desc:string}[]>([])
  const [chapSectionLabel, setChapSectionLabel] = useState('')

  const handleStart = useCallback((
    arcs: Archive[], txt: string,
    chapitres?: {titre:string;badge:string;desc:string}[],
    sectionLabel?: string
  ) => {
    if (chapitres && chapitres.length > 0) {
      setChapitresMode(true)
      setSelectedChapitres(chapitres)
      setChapSectionLabel(sectionLabel || 'Mathématiques')
    } else {
      setChapitresMode(false)
    }
    setArchives(arcs); setCustomText(txt); setPhase('generating')
  },[])

  const handleExamsReady = useCallback((exams: GeneratedExam[]) => {
    setGeneratedExams(exams); setPhase('choose-exam')
  },[])

  const handleChooseExam = useCallback((exam: GeneratedExam) => {
    setActiveExam(exam); setPhase('exam')
  },[])

  const handleGraphExtracted = useCallback((exIdx: number, graph: string) => {
    setExamGraphs(prev => ({ ...prev, [exIdx]: graph }))
    setActiveExam(prev => {
      if (!prev) return prev
      const exs = [...prev.exercises]
      if (exs[exIdx] && !exs[exIdx].graph) exs[exIdx] = { ...exs[exIdx], graph }
      return { ...prev, exercises: exs }
    })
  }, [])

  const handleSubmitExam = useCallback(async(ans: string) => {
    if(!activeExam) return
    setStudentAnswers(ans); setCorrectionText(''); setGradeResult(null); setPhase('grading')
    const grade = await estimateGrade(activeExam, ans)
    setGradeResult(grade); setPhase('graded')
  },[activeExam])

  const handleSeeCorrection = useCallback(() => { setPhase('correction') },[])

  const handleGoAnalyse = useCallback(async(fullCorrection: string) => {
    if(!activeExam) return
    setCorrectionText(fullCorrection); setPhase('analysing')
    const analysis = await analyzeStudentWork(activeExam, studentAnswers, fullCorrection)
    setAnalysisResult(analysis); setPhase('analysis')
  },[activeExam, studentAnswers])

  const handleOpenAnalyse = useCallback((idx: number, analysis: AnalysisResult, exercise: any) => {
    setAnalysePageData({ analysis, exercise, exerciseNum: idx + 1 })
  }, [])

  const handleRestart = useCallback(() => {
    setPhase('select'); setArchives([]); setCustomText(''); setGeneratedExams([])
    setActiveExam(null); setStudentAnswers(''); setCorrectionText(''); setGradeResult(null)
    setAnalysisResult(null); setChapitresMode(false); setSelectedChapitres([])
  },[])

  return (
    <>
      <Navbar/>
      <main style={{minHeight:'100vh',paddingTop:80,background:'#0c0c1a',position:'relative',overflow:'hidden'}}>
        <div style={{position:'fixed',inset:0,pointerEvents:'none',overflow:'hidden',zIndex:0}}>
          <div style={{position:'absolute',top:-200,left:-200,width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)'}}/>
          <div style={{position:'absolute',bottom:-200,right:-200,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)'}}/>
          <div style={{position:'absolute',top:'40%',left:'50%',transform:'translate(-50%,-50%)',width:800,height:400,background:'radial-gradient(ellipse,rgba(16,185,129,0.04) 0%,transparent 60%)'}}/>
        </div>

        <div style={{position:'relative',zIndex:1,maxWidth:1100,margin:'0 auto',padding:'40px 24px 80px'}}>

          {/* HEADER */}
          <div style={{marginBottom:36}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'5px 14px',background:'rgba(99,102,241,0.15)',border:'1px solid rgba(99,102,241,0.3)',borderRadius:20,marginBottom:14}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#6366f1',animation:'pulse 2s ease infinite'}}/>
              <span style={{fontSize:11,fontWeight:700,color:'#a5b4fc',letterSpacing:'0.06em',textTransform:'uppercase'}}>
                IA · {chapitresMode ? '📚 Simulation Par Chapitre' : 'Simulation Bac Tunisie'}
              </span>
            </div>
            <h1 style={{fontSize:'clamp(26px,4vw,46px)',fontWeight:900,color:'#f1f5f9',marginBottom:12,lineHeight:1.15,letterSpacing:'-0.02em'}}>
              Simulation Intelligente<br/>
              <span style={{background: chapitresMode
                ? 'linear-gradient(135deg,#06d6a0,#059669,#10b981)'
                : 'linear-gradient(135deg,#6366f1,#8b5cf6,#a78bfa)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                {chapitresMode ? 'Par Chapitre Ciblé' : 'Personnalisée par l\'IA'}
              </span>
            </h1>
            <p style={{maxWidth:580,color:'rgba(255,255,255,0.5)',lineHeight:1.75,fontSize:14,margin:0}}>
              {chapitresMode
                ? <>Examen ciblé sur <strong style={{color:'rgba(255,255,255,0.75)'}}>{selectedChapitres.map(c=>c.titre).join(' · ')}</strong> · Correction + Analyse complète</>
                : <>L'IA génère un <strong style={{color:'rgba(255,255,255,0.75)'}}>examen original</strong> · Correction détaillée · Analyse des faiblesses</>
              }
            </p>
          </div>

          <PhaseTimeline phase={phase}/>

          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:24,padding:'30px 32px',backdropFilter:'blur(10px)'}}>

            {phase==='select'&&<PhaseSelect onStart={handleStart}/>}

            {phase==='generating'&&(
              chapitresMode
                ? <PhaseGeneratingChapitres
                    chapitres={selectedChapitres}
                    sectionLabel={chapSectionLabel}
                    onDone={handleExamsReady}/>
                : <PhaseGenerating archives={archives} customText={customText} onDone={handleExamsReady}/>
            )}

            {phase==='choose-exam'&&
              <PhaseChooseExam exams={generatedExams} onChoose={handleChooseExam}/>}

            {phase==='exam'&&activeExam&&
              <PhaseExam exam={activeExam} onSubmit={handleSubmitExam}/>}

            {(phase==='grading'||phase==='graded')&&activeExam&&
              <PhaseGrade
                exam={activeExam} grade={gradeResult}
                correctionReady={true} correctionProgress={activeExam.exercises.length}
                onSeeCorrection={handleSeeCorrection}/>}

            {(phase==='correcting'||phase==='correction')&&activeExam&&
              <PhaseCorrection
                exam={activeExam} answers={studentAnswers}
                onAnalyse={handleGoAnalyse} onGraphExtracted={handleGraphExtracted}
                onOpenAnalyse={handleOpenAnalyse}/>}

            {(phase==='analysing'||phase==='analysis')&&
              <PhaseAnalysis analysis={analysisResult} onRestart={handleRestart}/>}

          </div>
        </div>
      </main>
      <Footer/>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
        @keyframes slideBar {
          0%{transform:translateX(-100%);width:60%}
          50%{transform:translateX(80%);width:60%}
          100%{transform:translateX(200%);width:60%}
        }
        select option { background:#1a1a2e; color:white; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background:rgba(99,102,241,0.4); border-radius:3px; }
        ::-webkit-scrollbar-thumb:hover { background:rgba(99,102,241,0.7); }
      `}</style>

      {analysePageData && (
        <PageAnalyseExercice
          analysis={analysePageData.analysis}
          exercise={analysePageData.exercise}
          exerciseNum={analysePageData.exerciseNum}
          onBack={() => setAnalysePageData(null)}
        />
      )}
    </>
  )
}

export default function SimulationIAPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#0c0c1a',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:14}}>Chargement...</div>}>
      <SimulationIAPageInner />
    </Suspense>
  )
}
