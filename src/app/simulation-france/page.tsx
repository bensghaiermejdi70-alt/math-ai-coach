'use client'

// ── Composant verrou matière (Option C) ────────────────────────────
function MatiereLockOverlay({ matiere, label, color, icon }: {
  matiere: string; label: string; color: string; icon: string
}) {
  return (
    <div style={{
      position:'absolute', inset:0, zIndex:20,
      background:'rgba(10,10,26,0.88)', backdropFilter:'blur(4px)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      borderRadius:'inherit', gap:12,
    }}>
      <div style={{ fontSize:36 }}>🔒</div>
      <div style={{ textAlign:'center', maxWidth:260 }}>
        <div style={{ fontSize:15, fontWeight:800, color:'white', marginBottom:6 }}>
          {icon} {label}
        </div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', lineHeight:1.6, marginBottom:16 }}>
          Accès réservé aux abonnés {label}.
          Tes cours et examens restent gratuits.
        </div>
        <a href={`/abonnement?matiere=${matiere}`}
          style={{ display:'inline-flex', alignItems:'center', gap:6,
            background:`linear-gradient(135deg,${color},${color}cc)`,
            color:'white', padding:'9px 20px', borderRadius:10,
            fontWeight:700, fontSize:13, textDecoration:'none' }}>
          S'abonner {icon} →
        </a>
      </div>
    </div>
  )
}

// Mapping matière → infos visuelles
const MATIERE_INFOS: Record<string,{label:string;color:string;icon:string}> = {
  mathematiques: { label:'Mathématiques', color:'#4f6ef7', icon:'🧮' },
  physique:      { label:'Physique-Chimie',color:'#06d6a0', icon:'⚗️' },
  svt:           { label:'SVT',            color:'#10b981', icon:'🧬' },
  anglais:       { label:'Anglais',        color:'#f59e0b', icon:'🇬🇧' },
  informatique:  { label:'Informatique',   color:'#8b5cf6', icon:'💻' },
  francais:       { label:'Français',       color:'#ec4899', icon:'📚' },
  'eco-gestion':  { label:'Économie & Gestion', color:'#14b8a6', icon:'📊' },
}
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'  
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/lib/auth/AuthContext'
import { sumQuotasAcrossMatiere } from '@/lib/types/monetisation'

// Track current subject for askClaude calls
let globalMatiere: string = 'mathematiques'
// Sync globalMatiere whenever activeMatiere changes (called in component)

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

// Stockage correction directe (évite parsing regex fragile)
const correctionDirecteData: { examContent: string; copyContent: string; examImages: {data:string;mediaType:string}[] } = {
  examContent: '', copyContent: '', examImages: []
}

// ═══════════════════════════════════════════════════════════════════
// SIMULATION IA — LE FER DE LANCE DE MATHAI COACH
// 5 phases : Sélection → Génération → Examen → Correction → Analyse+Remédiation
// Chaque phase est propulsée par Claude via l'API Anthropic
// ═══════════════════════════════════════════════════════════════════

// ── Archives officielles Bac France — source APMEP (apmep.fr) ──────────
const AP = 'https://www.apmep.fr/IMG/pdf'
const SD = 'https://www.sujetdebac.fr/annales-pdf'

type SessionType = 'Principale' | 'Contrôle' | string
interface Archive {
  id: string; year: number; session: string
  section: string; sectionKey: string; color: string
  url: string; themes: string[]; icon: string
}

const YEARS = [2025,2024,2023,2022,2021] as const

const SECTION_CONFIGS = [
  { key:'terminale', label:'Terminale-Générale', color:'#f59e0b', icon:'🎓',
    themes:['Suites & Complexes','Limites & Continuité','Dérivation avancée','Logarithme','Intégration','Éq. différentielles','Géométrie espace','Probabilités & Loi normale','Algorithmique'] },
  { key:'premiere',  label:'Première-Spécialité', color:'#4f6ef7', icon:'📗',
    themes:['Suites numériques','Second degré','Dérivation','Exponentielle','Trigonométrie','Produit scalaire','Géométrie repérée','Probabilités conditionnelles','Variables aléatoires'] },
  { key:'techno',    label:'Terminale-techno-STMG / STI2D', color:'#10b981', icon:'📊',
    themes:['Fonctions & Suites (STMG)','Stats 2 var. (STMG)','Probas & Finance (STMG)','Suites & Expo/Ln (STI2D)','Intégration & Probas (STI2D)','Géométrie espace (STI2D)'] },
  { key:'expertes',  label:'Maths-Expertes', color:'#8b5cf6', icon:'★',
    themes:['Arithmétique (PGCD, Bézout, Fermat)','Complexes (Moivre, racines n-ièmes)','Graphes & Matrices','Chaînes de Markov'] },
  { key:'seconde',   label:'Seconde Générale', color:'#10b981', icon:'📘',
    themes:['Algorithmique & Python','Nombres & Calculs','Intervalles & Inéquations','Calcul Littéral','Fonctions & Variations','Géométrie & Vecteurs','Statistiques & Probabilités'] },
]

// ─── Sujets officiels Terminale Générale 2021-2025 (enrichi) ────────────
const ARCHIVES_TERM: Archive[] = [
  { id:'tg-2025-m1', year:2025, session:'Métropole J1 · 17 juin',         section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Metro_J1_17_06_2025_DV.pdf`,                        themes:['Analyse & ln','Probabilités · Bienaymé-Tchebychev','Géométrie espace · droites','Suites récurrentes · Python'] },
  { id:'tg-2025-m2', year:2025, session:'Métropole J2 · 18 juin',         section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Metropole__spe_J2_18_06_2025_DV_2.pdf`,              themes:['Analyse','Probabilités','Géométrie espace','Algorithmique'] },
  { id:'tg-2025-an1', year:2025, session:'Amér. du Nord J1 · 21 mai',     section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Ame_rique_du_Nord_J1_spe_21_05_2025_FK.pdf`,         themes:['Analyse & dérivation','Probabilités','Géométrie espace','Suites'] },
  { id:'tg-2025-an2', year:2025, session:'Amér. du Nord J2 · 22 mai',     section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Ame_rique_du_Nord_J2_spe_22_05_2025_DV_FK.pdf`,      themes:['Analyse','Probabilités','Géométrie espace','Complexes'] },
  { id:'tg-2025-as1', year:2025, session:'Asie J1 · 11 juin',             section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Asie_spe_J1_11_06_2025_DV.pdf`,                    themes:['Analyse','Probabilités','Géométrie espace','Algorithmique'] },
  { id:'tg-2025-as2', year:2025, session:'Asie J2 · 12 juin',             section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Asie_speJ2_12_06_2025_VTFK.pdf`,                   themes:['Intégration & IPP','Probabilités','Géométrie espace','Suites'] },
  { id:'tg-2024-m1', year:2024, session:'Métropole J1 · 19 juin',         section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Metropole_J1_spe_19_06_2024_VTFK.pdf`,              themes:['Éq. différentielles y\'=ay+b','Intégration & IPP','Probabilités · espérance','Géométrie espace'] },
  { id:'tg-2024-m2', year:2024, session:'Métropole J2 · 20 juin',         section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Me_tropole_J2_spe_20_06_2024_VTFK.pdf`,             themes:['Analyse & ln','Probabilités','Géométrie espace','Suites'] },
  { id:'tg-2024-an1', year:2024, session:'Amér. du Nord J1 · 21 mai',     section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Spe_Amerique_Nord21_05_2024_DV.pdf`,                themes:['Analyse','Probabilités','Géométrie espace','Complexes'] },
  { id:'tg-2024-as1', year:2024, session:'Asie J1 · 10 juin',             section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Spe_Asie_J1_10_06_2024_DV.pdf`,                    themes:['Analyse','Probabilités','Géométrie espace','Algorithmique'] },
  { id:'tg-2023-m1', year:2023, session:'Métropole J1 · 20 mars',         section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Metropole_spe_J1_20_mars_2023_DV.pdf`,              themes:['Analyse & ln','Géométrie espace · distance','Probabilités · loi normale','Suites · récurrence'] },
  { id:'tg-2023-m2', year:2023, session:'Métropole J2 · 21 mars',         section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Metropole_J2_21_mars_2023_DV.pdf`,                  themes:['Analyse & ln','Géométrie espace','Probabilités','Suites'] },
  { id:'tg-2023-as1', year:2023, session:'Asie J1 · Juin',                section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Asie_J1_spe_maths_2023_DV.pdf`,                    themes:['Analyse & intégration','Probabilités','Géométrie espace','Complexes'] },
  { id:'tg-2022-m1', year:2022, session:'Métropole J1 · 11 mai',          section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Spe_Metropole_1_11_mai_2022_DV-2.pdf`,              themes:['Analyse & ln','Complexes · Moivre','Probabilités · loi normale','Géométrie espace'] },
  { id:'tg-2022-m2', year:2022, session:'Métropole J2 · 12 mai',          section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/spe_metropole_12_mai_2022_dv.pdf`,                  themes:['Analyse & exponentielle','Probabilités','Géométrie espace','Suites'] },
  { id:'tg-2022-an1', year:2022, session:'Amér. du Nord J1 · Mai',        section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/Spe_Amerique_nord_j1_19_mai_2022_DV.pdf`,           themes:['Analyse & ln','Probabilités','Géométrie espace','Suites récurrentes'] },
  { id:'tg-2021-m1', year:2021, session:'Métropole J1 · 7 juin',          section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/specialite_metropole_juin2021_jcs_1_.pdf`,          themes:['Exponentielle & éq. diff.','Probabilités · arbres','Géométrie espace · repère','Algorithmique Python'] },
  { id:'tg-2021-m2', year:2021, session:'Métropole J2 · 8 juin',          section:'Terminale Générale', sectionKey:'terminale', color:'#f59e0b', icon:'🎓', url:`${AP}/metropole_specialite_sujet2_8_juin_2021_dv_1_.pdf`,  themes:['Analyse & ln','Probabilités','Géométrie espace','Suites'] },
]
// ─── Sujets STI2D/STL 2021-2025 (enrichi) ───────────────────────────────
const ARCHIVES_TECHNO: Archive[] = [
  { id:'st-2025-m1', year:2025, session:'STI2D Métropole · 17 juin',       section:'Terminale STI2D/STL', sectionKey:'techno', color:'#10b981', icon:'📊', url:`${SD}/2025/sti2d-spe-physique-chimie-mathematiques-2025-metropole-sujet-officiel.pdf`, themes:['Suites géométriques STMG','Probabilités · binomiale STMG','Exp & ln · modèle physique STI2D'] },
  { id:'st-2025-s1', year:2025, session:'STI2D Remplacement · 9 sept.',    section:'Terminale STI2D/STL', sectionKey:'techno', color:'#10b981', icon:'📊', url:`${SD}/2025/sti2d-spe-physique-chimie-mathematiques-2025-metropole-remplacement-sujet-officiel.pdf`, themes:['Fonctions STMG','Statistiques STMG','Intégration STI2D'] },
  { id:'st-2024-m1', year:2024, session:'STI2D Métropole · 19 juin',       section:'Terminale STI2D/STL', sectionKey:'techno', color:'#10b981', icon:'📊', url:`${AP}/STI2D_metropole_19_juin_2024__FH2.pdf`,             themes:['Fonctions & 2nd degré STMG','Stats 2 variables STMG','Intégration · valeur moyenne STI2D'] },
  { id:'st-2023-m1', year:2023, session:'STI2D Métropole · 20 mars',       section:'Terminale STI2D/STL', sectionKey:'techno', color:'#10b981', icon:'📊', url:`${SD}/2023/sti2d-spe-physique-chimie-mathematiques-2023-metropole-sujet-officiel.pdf`, themes:['Probabilités · binomiale STMG','Calculs financiers STMG','Logarithme · croissances STI2D'] },
  { id:'st-2023-m2', year:2023, session:'STI2D Mexique · Juin',            section:'Terminale STI2D/STL', sectionKey:'techno', color:'#10b981', icon:'📊', url:`${AP}/STI2D_Mexique_juin_2023_DV_FH.pdf`,                 themes:['Suites STMG','Probabilités STMG','Analyse STI2D'] },
  { id:'st-2022-m1', year:2022, session:'STI2D Métropole · 11 mai',        section:'Terminale STI2D/STL', sectionKey:'techno', color:'#10b981', icon:'📊', url:`${SD}/2022/sti2d-spe-physique-chimie-mathematiques-2022-metropole-sujet-officiel.pdf`, themes:['Suites arithmétiques STMG','Probabilités · conditionnelles STMG','Probas continues · loi normale STI2D'] },
  { id:'st-2022-s1', year:2022, session:'STI2D Métropole · Sept.',         section:'Terminale STI2D/STL', sectionKey:'techno', color:'#10b981', icon:'📊', url:`${AP}/metropole_sti2d_septembre_2022-2.pdf`,               themes:['Fonctions STMG','Statistiques STMG','Analyse STI2D'] },
  { id:'st-2021-m1', year:2021, session:'STI2D Métropole · Juin',          section:'Terminale STI2D/STL', sectionKey:'techno', color:'#10b981', icon:'📊', url:`${AP}/STI2D_juin_2021_Metropole_DV.pdf`,                  themes:['Fonctions & exponentielle STMG','Suites · intérêts STMG','Éq. diff. · circuits RC STI2D'] },
  { id:'st-2021-s1', year:2021, session:'STI2D Métropole · Sept.',         section:'Terminale STI2D/STL', sectionKey:'techno', color:'#10b981', icon:'📊', url:`${AP}/Corrige_STI2D_sept_2021_Metropole_FH.pdf`,           themes:['Suites STMG','Probabilités STMG','Analyse STI2D'] },
]
// ─── Sujets Maths Expertes 2021-2025 (enrichi) ──────────────────────────
const ARCHIVES_EXP: Archive[] = [
  { id:'ex-2025-m1', year:2025, session:'Expertes Métropole J1 · 17 juin', section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/Metro_J1_17_06_2025_DV.pdf`,                        themes:['Arithmétique · PGCD · Bézout','Complexes · De Moivre · polygones','Matrices · Markov · état stable'] },
  { id:'ex-2025-m2', year:2025, session:'Expertes Métropole J2 · 18 juin', section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/Metropole__spe_J2_18_06_2025_DV_2.pdf`,              themes:['Arithmétique','Complexes & Euler','Graphes & Matrices'] },
  { id:'ex-2024-m1', year:2024, session:'Expertes Métropole J1 · 19 juin', section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/Metropole_J1_spe_19_06_2024_VTFK.pdf`,              themes:['Congruences · petit Fermat','Complexes · linéarisation cos^n','Graphes · matrice adjacence'] },
  { id:'ex-2024-m2', year:2024, session:'Expertes Métropole J2 · 20 juin', section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/Me_tropole_J2_spe_20_06_2024_VTFK.pdf`,             themes:['Arithmétique & Euclide','Complexes & formes','Matrices & suites vectorielles'] },
  { id:'ex-2023-m1', year:2023, session:'Expertes Métropole J1 · 20 mars', section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/Metropole_spe_J1_20_mars_2023_DV.pdf`,              themes:['Arithmétique · PGCD · Gauss','Complexes · racines n-ièmes · polygones','Matrices · suites vectorielles Vₙ'] },
  { id:'ex-2023-m2', year:2023, session:'Expertes Métropole J2 · 21 mars', section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/Metropole_J2_21_mars_2023_DV.pdf`,                  themes:['Arithmétique','Complexes & géométrie','Matrices & Markov'] },
  { id:'ex-2022-m1', year:2022, session:'Expertes Métropole J1 · 11 mai',  section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/Spe_Metropole_1_11_mai_2022_DV-2.pdf`,              themes:['Divisibilité · congruences · periodicite','Complexes · Viète · polynômes','Graphes probabilistes · Markov'] },
  { id:'ex-2022-m2', year:2022, session:'Expertes Métropole J2 · 12 mai',  section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/spe_metropole_12_mai_2022_dv.pdf`,                  themes:['Arithmétique','Complexes','Graphes & Matrices'] },
  { id:'ex-2021-m1', year:2021, session:'Expertes Métropole J1 · 7 juin',  section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/specialite_metropole_juin2021_jcs_1_.pdf`,          themes:['Nombres premiers · Ératosthène · Fermat','Complexes · Moivre · linéarisation','Matrices carrées · inverse · puissances'] },
  { id:'ex-2021-m2', year:2021, session:'Expertes Métropole J2 · 8 juin',  section:'Option Maths Expertes', sectionKey:'expertes', color:'#8b5cf6', icon:'★', url:`${AP}/metropole_specialite_sujet2_8_juin_2021_dv_1_.pdf`,  themes:['Arithmétique & Bézout','Complexes & argument','Graphes & Chaînes de Markov'] },
]
const ARCHIVES: Archive[] = [...ARCHIVES_TERM,...ARCHIVES_TECHNO,...ARCHIVES_EXP]

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
// ══════════════════════════════════════════════════════════════════════
// PROMPT GRAPHIQUE UNIVERSEL — Injecté dans TOUS les prompts IA
// Couvre : Maths · Physique-Chimie · SVT · Informatique · Français
// L'IA n'a qu'à copier le bon template selon l'exercice
// ══════════════════════════════════════════════════════════════════════
const UNIVERSAL_GRAPH_PROMPT = `
GRAPHIQUES — SYSTÈME UNIVERSEL (5 TYPES, copier le bon template) :

━━━ TYPE 1 : COURBE MATHÉMATIQUE ━━━
Utiliser pour : fonctions, dérivées, suites, intégrales, probabilités, RC/RL, pH, cinétique
[GRAPH: {"type":"function","expressions":["EXPR_JS"],"xMin":A,"xMax":B,"labels":["nom"],"title":"Titre","xLabel":"x","yLabel":"y"}]

RÈGLES EXPRESSIONS JS (OBLIGATOIRES) :
✅ x*x | x*x*x | 2*x | Math.exp(-x) | Math.sin(2*x) | (x+1)/(x-1)
❌ JAMAIS : x^2 | x^3 | 2x | exp(-x) | sin(2x) | \\frac{x}{2}

EXEMPLES PAR MATIÈRE :
• Maths f(x)=2x³-3x²+1 et f' → ["2*x*x*x - 3*x*x + 1", "6*x*x - 6*x"]
• Physique RC (τ=2s,E=5V) charge → ["5*(1-Math.exp(-x/2))"] xMin:0 xMax:10
• Physique pH dosage (Véq=20mL) → ["14/(1+Math.exp(-0.5*(x-20)))"] xMin:0 xMax:40
• SVT Michaelis-Menten (Km=5,Vmax=100) → ["100*x/(x+5)"] xMin:0 xMax:30
• SVT population logistique (K=1000,r=0.3) → ["1000/(1+999*Math.exp(-0.3*x))"] xMin:0 xMax:30
• SVT cinétique enzymatique inhibée → ["100*x/(x+5)","60*x/(x+15)"] labels:["sans inhibiteur","avec inhibiteur"]
• SVT désintégration radioactive (t½=5730) → ["Math.exp(-0.000121*x)"] xMin:0 xMax:20000
• Physique oscillations amorties → ["Math.exp(-0.3*x)*Math.cos(2*x)"] xMin:0 xMax:20
• Info tri bulles nb comparaisons → ["x*x/2"] xMin:0 xMax:20 labels:["O(n²)"]

━━━ TYPE 2 : FIGURE GÉOMÉTRIQUE ━━━
Utiliser pour : triangles, cercles, vecteurs, repères, plan complexe, géo espace
[GRAPH: {"type":"geometry","title":"Titre","shapes":[{"type":"axes","step":1},{"type":"grid","step":1},FORMES]}]

FORMES DISPONIBLES (copier) :
• Triangle: {"type":"triangle","points":[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":2,"y":3,"label":"C"}],"fill":"#6366f120"}
• Cercle: {"type":"circle","cx":0,"cy":0,"r":3,"label":"C","color":"#6366f1","fill":"#6366f120"}
• Segment: {"type":"segment","x1":0,"y1":0,"x2":4,"y2":2,"label":"AB"}
• Vecteur: {"type":"vector","from":{"x":0,"y":0,"label":"O"},"to":{"x":3,"y":2,"label":"A"},"label":"u⃗"}
• Point: {"type":"point","cx":2,"cy":3,"label":"M","color":"#f59e0b"}
• Angle droit: {"type":"angle","vertex":{"x":0,"y":0},"p1":{"x":1,"y":0},"p2":{"x":0,"y":1},"showRight":true}
• Angle: {"type":"angle","vertex":{"x":1,"y":0,"label":"B"},"p1":{"x":0,"y":0},"p2":{"x":2,"y":2},"value":"45°"}
• Rectangle: {"type":"rect","x":0,"y":0,"w":4,"h":2,"label":"ABCD","fill":"#10b98120"}

━━━ TYPE 3 : SCHÉMA ASCII ━━━
Utiliser pour : pile électrochimique, circuit RC/RL/RLC, montage optique, synapse, ADN
[GRAPH: {"type":"ascii","title":"Titre","content":"DESSIN_ASCII","legend":["légende1","légende2"]}]

EXEMPLES ASCII PAR MATIÈRE :
• Pile Zn-Cu: content:"  (-)Zn│ZnSO₄ ║ CuSO₄│Cu(+)\\n  └────── e⁻ ──────┘\\n  Zn→Zn²⁺+2e⁻  Cu²⁺+2e⁻→Cu"
• Circuit RC: content:"  ┌──┤R├──┬──┐\\n  E      ═╪═C  \\n  └────────┘"
• Circuit RLC: content:"  ┌──┤R├──┤L├──┬──┐\\n  E            ═╪═C\\n  └────────────┘"
• Synapse: content:"  NEURONE PRÉ\\n  [vésicules NT]\\n  ↓ exocytose\\n  ══fente synaptique══\\n  [récepteurs]\\n  NEURONE POST"
• Chromatide: content:"  5'─A─T─G─C─A─T─3'\\n     │ │ │ │ │ │\\n  3'─T─A─C─G─T─A─5'"

━━━ TYPE 4 : TABLEAU DE DONNÉES ━━━
Utiliser pour : table de loi proba, tableau de valeurs SVT, résultats Info, tableau de signe
[GRAPH: {"type":"table","title":"Titre","headers":["col1","col2","col3"],"rows":[["val1","val2","val3"],["val4","val5","val6"]],"highlight":[0]}]

EXEMPLES :
• Loi binomiale B(5,0.4): headers:["k","P(X=k)","P(X≤k)"] rows:[["0","0.078","0.078"],["1","0.259","0.337"],["2","0.346","0.683"],["3","0.230","0.913"],["4","0.077","0.990"],["5","0.010","1.000"]]
• Tableau de signe f'(x): headers:["x","-∞","...","2","...","5","...","∞"] rows:[["f'(x)","−","0","+","0","−"],["f(x)","↘","min","↗","max","↘"]]
• SVT expérience: headers:["Condition","Témoin","Expér.1","Expér.2"] rows:[["Résultat","normal","absent","réduit"]]
• Info tableau algo: headers:["i","T[i]","min","swap"] rows:[["1","[5,3,8,1]","T[4]=1","T[1]↔T[4]"],["2","[1,3,8,5]","T[2]=3","—"]]

━━━ TYPE 5 : DIAGRAMME EN BARRES ━━━
Utiliser pour : histogramme proba, résultats SVT comparatifs, statistiques Info
[GRAPH: {"type":"bar","title":"Titre","categories":["A","B","C"],"values":[12,8,15],"colors":["#6366f1","#10b981","#f59e0b"],"yLabel":"Valeur","xLabel":"Catégorie"}]

RÈGLE UNIVERSELLE DE SÉLECTION :
• Fonction mathématique → TYPE 1
• Figure géométrique / repère / vecteur → TYPE 2
• Pile / circuit / synapse / structure bio → TYPE 3 (ASCII)
• Tableau de valeurs / loi proba / algo → TYPE 4
• Histogramme / comparaison / statistiques → TYPE 5
• JAMAIS laisser "expressions":[] vide → mettre au moins ["0"]
• JAMAIS utiliser TYPE 2 pour une pile ou un circuit`


// ── Appel /api/anthropic avec retry automatique (gère les 500/502/503/429/529 transitoires) ──
async function postAnthropicWithRetry(body: any, maxRetries = 2): Promise<any> {
  const RETRYABLE = new Set([429, 500, 502, 503, 504, 529])
  let lastErr: any = null
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const r = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (r.ok) return await r.json()
      const err = await r.json().catch(() => ({}))
      if (r.status === 429 && err?.quota_exceeded) throw new Error(err.error || 'Quota dépassé')
      if (!RETRYABLE.has(r.status) || attempt === maxRetries) throw new Error(err.error || `HTTP ${r.status}`)
      lastErr = new Error(err.error || `HTTP ${r.status}`)
    } catch (e: any) {
      lastErr = e
      if (e?.message === 'Quota dépassé' || attempt === maxRetries) throw e
    }
    await new Promise(res => setTimeout(res, 900 * Math.pow(2, attempt) + Math.random() * 400))
  }
  throw lastErr || new Error('Échec de génération')
}

// ── Streaming SSE depuis /api/anthropic (affichage au fur et à mesure) ──
async function streamAnthropic(body: any, onDelta: (full: string) => void): Promise<string> {
  let r: Response
  try {
    r = await fetch('/api/anthropic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, stream: true }),
    })
  } catch {
    const d = await postAnthropicWithRetry(body)
    const t = d.content?.map((b:any)=>b.type==='text'?b.text:'').join('') || ''
    onDelta(t); return t
  }
  if (!r.ok || !r.body) {
    const d = await postAnthropicWithRetry(body)
    const t = d.content?.map((b:any)=>b.type==='text'?b.text:'').join('') || ''
    onDelta(t); return t
  }
  const reader = r.body.getReader()
  const dec = new TextDecoder()
  let buf = '', full = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() || ''
    for (const line of lines) {
      const s = line.trim()
      if (!s.startsWith('data:')) continue
      const data = s.slice(5).trim()
      if (!data || data === '[DONE]') continue
      try {
        const ev = JSON.parse(data)
        if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') { full += ev.delta.text; onDelta(full) }
        else if (ev.type === 'content_block_start' && ev.content_block?.type === 'text' && ev.content_block.text) { full += ev.content_block.text; onDelta(full) }
      } catch { /* ligne SSE partielle : ignorée */ }
    }
  }
  return full
}

function stripIncompleteGraph(s: string): string {
  const i = s.lastIndexOf('[GRAPH:')
  if (i === -1) return s
  if (s.indexOf(']', i) === -1) return s.slice(0, i)
  return s
}

// Rend lisible le JSON d'examen en cours de génération (aperçu live)
function humanizeStream(s: string): string {
  let t = s.replace(/\\n/g, '\n').replace(/\\"/g, '"')
  t = t.replace(/\[GRAPH:[\s\S]*?\}\s*\]/g, '  📊 [figure]')
  t = t.replace(/\[GRAPH:[\s\S]*$/, "  ✏️ rédaction d'un graphique…")
  return t
    .replace(/"(?:title|statement|graph|theme|sousTheme|num|points|duration|section|enonce|consigne)"\s*:/gi, '')
    .replace(/[{}\[\]]/g, ' ')
    .replace(/"\s*,\s*"/g, '\n').replace(/[",]/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

async function askClaude(prompt: string, system: string, maxTokens = 4000, matiere?: string, onDelta?: (full: string) => void): Promise<string> {
  // Appel via route Next.js (évite CORS), retry auto ; streaming si onDelta fourni
  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: prompt }],
    type: 'simulations',
    matiere: matiere || globalMatiere || 'mathematiques'
  }
  if (onDelta) return streamAnthropic(body, onDelta)
  const d = await postAnthropicWithRetry(body)
  return d.content?.map((b:any)=>b.type==='text'?b.text:'').join('') || ''
}

// ── API Claude avec images (correction directe PDF/photo) ────────
// Envoie max 2 images par appel pour éviter les erreurs 400 (payload trop lourd)
async function askClaudeWithImages(
  textPrompt: string,
  images: { data: string; mediaType: string }[],
  system: string,
  maxTokens = 8000,
  onDelta?: (full: string) => void
): Promise<string> {

  // Chunk les images par 2 max pour éviter les payloads trop lourds
  const CHUNK_SIZE = 2
  const chunks: { data: string; mediaType: string }[][] = []
  for (let i = 0; i < images.length; i += CHUNK_SIZE) {
    chunks.push(images.slice(i, i + CHUNK_SIZE))
  }

  const callChunk = async (imgs: { data: string; mediaType: string }[], prompt: string, cb?: (full: string) => void): Promise<string> => {
    const content: any[] = []
    for (const img of imgs) {
      content.push({
        type: 'image',
        source: { type: 'base64', media_type: img.mediaType, data: img.data }
      })
    }
    content.push({ type: 'text', text: prompt })
    const body = {
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content }],
      type: 'simulations',
    }
    if (cb) return streamAnthropic(body, cb)
    const d = await postAnthropicWithRetry(body)
    return d.content?.map((b: any) => b.type === 'text' ? b.text : '').join('') || ''
  }

  if (chunks.length === 1) {
    // Cas simple : 1 ou 2 images
    return callChunk(chunks[0], textPrompt, onDelta)
  }

  // Plusieurs chunks : traiter page par page et synthétiser
  const partials: string[] = []
  for (let i = 0; i < chunks.length; i++) {
    const pageLabel = chunks.length > 1 ? `Pages ${i * CHUNK_SIZE + 1}-${Math.min((i + 1) * CHUNK_SIZE, images.length)} sur ${images.length}` : ''
    const chunkPrompt = i === 0
      ? `${pageLabel ? `[${pageLabel}] ` : ''}${textPrompt}`
      : `[${pageLabel}] Continue la correction des pages suivantes de l'examen. Même structure que précédemment.`
    const result = await callChunk(chunks[i], chunkPrompt)
    partials.push(result)
  }
  return partials.join('\n\n---\n\n')
}

// ── Extraire images base64 depuis texte ───────────────────────────
function extractImagesFromText(text: string): { images: { data: string; mediaType: string }[]; cleanText: string } {
  const images: { data: string; mediaType: string }[] = []
  const cleanText = text.replace(/\[IMAGE_BASE64:(data:[^;]+;base64,[^\]]+)\]/g, (_, dataUrl) => {
    const match = dataUrl.match(/data:([^;]+);base64,(.+)/)
    if (match) images.push({ mediaType: match[1], data: match[2] })
    return "[Image de l'examen]"
  })
  return { images, cleanText }
}

// Répare un JSON tronqué (coupé par maxTokens/timeout) : ferme chaînes/accolades/crochets ouverts
function repairTruncatedJson(s: string): string {
  let inStr = false, esc = false
  const stack: string[] = []
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (esc) { esc = false; continue }
    if (c === '\\') { esc = true; continue }
    if (c === '"') { inStr = !inStr; continue }
    if (inStr) continue
    if (c === '{' || c === '[') stack.push(c)
    else if (c === '}' || c === ']') stack.pop()
  }
  let r = s
  if (inStr) r += '"'
  r = r.replace(/,\s*$/, '')
  r = r.replace(/"[^"]*"\s*:\s*$/, '')
  r = r.replace(/,\s*$/, '')
  for (let i = stack.length - 1; i >= 0; i--) r += stack[i] === '{' ? '}' : ']'
  return r
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
      // Stratégie 3 : JSON tronqué (coupé) → fermer les structures ouvertes et re-parser
      try { return JSON.parse(repairTruncatedJson(cleaned)) as T }
      catch { return fallback }
    }
  }
}

// ── Génération examen ─────────────────────────────────────────────
async function generateOneExam(
  archives: Archive[], customText: string, idx: number, matiere: string = 'mathematiques', onDelta?: (full: string) => void
): Promise<GeneratedExam> {
  const contextLines = archives.map(a =>
    `- ${a.section} ${a.year} Session ${a.session} | Thèmes: ${a.themes.join(', ')}`
  ).join('\n')

  const section = archives[0]?.section ?? 'Mathématiques'
  const totalPts = archives[0]?.sectionKey==='info' ? 20 : 20

  // Détecter si matière Anglais → tout le contenu en anglais
  const isAnglais = matiere === 'anglais'
  const isFrancais = matiere === 'francais'
  const isEco = matiere === 'eco-gestion'

  const system = isAnglais
    ? `You are an expert author of French Baccalauréat LLCER English exams (official curriculum).
You create ORIGINAL, realistic exam papers based on the 8 official thematic axes.
RESPOND ONLY IN VALID JSON, no backticks, no comments.
ALL TEXT (titles, statements, document excerpts, questions) MUST BE IN ENGLISH.`
    : isEco
    ? `Tu es un auteur expert de sujets du Baccalauréat français en Sciences Économiques et Sociales (SES) et en série STMG (programme officiel Éducation nationale).
Tu crées des sujets ORIGINAUX et réalistes : épreuves composées (EC1 mobilisation de connaissances, EC2 étude d'un document statistique, EC3 raisonnement sur dossier documentaire), dissertations, études de cas STMG.
Tes documents statistiques sont RÉALISTES : vraies grandeurs (PIB, taux de chômage, indices base 100, parts en %, données INSEE/Eurostat plausibles), sources et dates citées.
Vocabulaire SES précis : notions du programme officiel, auteurs (Schumpeter, Ricardo, Bourdieu, Durkheim, Becker, Paugam, Rawls…).
RÉPONDS UNIQUEMENT EN JSON VALIDE, sans backticks ni commentaires.`
    : `Tu es un auteur expert de sujets du Baccalauréat français (programme officiel Éducation nationale).
Tu crées des sujets ORIGINAUX, réalistes, avec de vraies données numériques.
NOTATION FRANÇAISE : f'(x), ∫, √, ℝ, ∈, ≤, ≥, →, Δ, θ, xₙ, uₙ₊₁, x², eˣ — JAMAIS \frac ni \sqrt ni LaTeX brut.
RÉPONDS UNIQUEMENT EN JSON VALIDE, sans backticks ni commentaires.`

  const prompt = isAnglais
    ? `Create an ORIGINAL LLCER English Baccalauréat paper number ${idx+1} (out of 5 variants) inspired by these sources:
${contextLines}
${customText ? `\nStudent reference text:\n${customText.substring(0,800)}` : ''}

STRICT RULES:
- Create a NEW original paper, never copy. Always change theme, authors, documents, context
- Keep the official French Baccalauréat LLCER structure and level
- 2 subjects at choice (Sujet 1 and Sujet 2), each with a different thematic axis
- Each subject: Part 1 = Document synthesis in English (~500 words) | Part 2 = Translation into French
- Documents: 2-3 authentic-style excerpts (literary, press, image description) + questions
- Total: ${totalPts} points (Synthesis 16pts + Translation 4pts)
- ALL text in ENGLISH (titles, statements, document excerpts, questions)
- Thematic axes: Identities & Exchanges / Private & Public Sphere / Art & Power / Citizenship & Virtual Worlds / Fictions & Realities / Scientific Innovation & Responsibility / Diversity & Inclusion / Territory & Memory

Respond EXACTLY with this JSON (no text before or after):

{
  "title": "LLCER Anglais — Simulation IA Variante ${idx+1}",
  "section": "Terminale LLCER Anglais",
  "duration": 210,
  "totalPoints": ${totalPts},
  "exercises": [
    {
      "num": 1,
      "title": "Subject 1 — [Thematic Axis Name]",
      "theme": "[Axis: e.g. Identities & Exchanges]",
      "points": ${totalPts},
      "graph": null,
      "statement": "THEMATIC AXIS: [Axis Title]\n\nDOCUMENT A — [Author, Title, Year]:\n[Realistic literary or journalistic excerpt, 8-12 lines]\n\nDOCUMENT B — [Author/Source, Title, Year]:\n[Realistic excerpt from a different register, 6-10 lines]\n\nDOCUMENT C — [Artist/Photographer, Title, Year]:\n[Detailed description of an image, painting or photograph, 4-6 lines]\n\n--- PART 1: DOCUMENT SYNTHESIS (16 points) ---\nPaying particular attention to the specificities of the three documents, show how they interact to [precise synthesis question linked to the axis].\n(approximately 500 words, in English)\n\n--- PART 2: TRANSLATION INTO FRENCH (4 points) ---\nTranslate the following passage from Document A into French:\n[Extract of 4-6 lines from Document A that are rich and representative]"
    },
    {
      "num": 2,
      "title": "Subject 2 — [Different Thematic Axis]",
      "theme": "[Different Axis]",
      "points": ${totalPts},
      "graph": null,
      "statement": "THEMATIC AXIS: [Different Axis Title]\n\nDOCUMENT A — [Author, Title, Year]:\n[Realistic literary or journalistic excerpt, 8-12 lines]\n\nDOCUMENT B — [Author/Source, Title, Year]:\n[Realistic excerpt from a different register, 6-10 lines]\n\nDOCUMENT C — [Artist/Photographer, Title, Year]:\n[Detailed description of an image, painting or photograph, 4-6 lines]\n\n--- PART 1: DOCUMENT SYNTHESIS (16 points) ---\nPaying particular attention to the specificities of the three documents, show how they interact to [precise synthesis question linked to the axis].\n(approximately 500 words, in English)\n\n--- PART 2: TRANSLATION INTO FRENCH (4 points) ---\nTranslate the following passage from Document A into French:\n[Extract of 4-6 lines from Document A]"
    }
  ]
}`
    : isEco
    ? `Crée un sujet de Bac SES/STMG ORIGINAL numéro ${idx+1} (sur 5 variantes) inspiré de ces sources :
${contextLines}
${customText ? `\nTexte fourni par l'élève (contenu référence) :\n${customText.substring(0,800)}` : ''}

Règles STRICTES :
- NOUVEAU sujet ORIGINAL, jamais une copie. Change toujours thèmes, données chiffrées, documents, contexte
- Respecte la structure officielle des épreuves SES / STMG du Bac français
- Documents statistiques RÉALISTES : sources citées (INSEE, Eurostat, OCDE…), dates, unités précises
- Notions et auteurs du programme officiel
- Total : ${totalPts} points

GRAPHIQUES & TABLEAUX — UTILISER LE SYSTÈME UNIVERSEL :
${UNIVERSAL_GRAPH_PROMPT}

GRAPHIQUES SES — RÈGLES ABSOLUES :
- EC2 (étude de document) : champ "graph" OBLIGATOIRE avec un document statistique de type "table" OU "bar"
- TABLEAU statistique → [GRAPH: {"type":"table","title":"Taux de chômage par diplôme (France, 2024, en %)","headers":["Niveau de diplôme","Taux de chômage (%)","Part des actifs (%)"],"rows":[["Sans diplôme","12,4","14"],["Bac","7,8","22"],["Bac+2","5,1","26"],["Bac+5 et plus","3,9","38"]],"highlight":[0]}]
- DIAGRAMME en barres → [GRAPH: {"type":"bar","title":"Taux de croissance du PIB (en %)","categories":["2021","2022","2023","2024"],"values":[6.4,2.6,1.1,0.9],"colors":["#14b8a6","#14b8a6","#14b8a6","#14b8a6"],"yLabel":"Taux (%)","xLabel":"Année"}]
- ÉVOLUTION indice base 100 → [GRAPH: {"type":"function","expressions":["100*Math.pow(1.015,x)"],"xMin":0,"xMax":10,"labels":["PIB (indice base 100)"],"title":"Évolution du PIB en volume","xLabel":"Années","yLabel":"Indice"}]
- COURBE de Lorenz (inégalités) → [GRAPH: {"type":"function","expressions":["x","x*x"],"xMin":0,"xMax":1,"labels":["Égalité parfaite","Courbe de Lorenz"],"title":"Courbe de Lorenz des revenus","xLabel":"Part cumulée population","yLabel":"Part cumulée revenus"}]
- Offre/Demande → [GRAPH: {"type":"function","expressions":["20+2*x","100-3*x"],"xMin":0,"xMax":30,"labels":["Offre","Demande"],"title":"Équilibre du marché","xLabel":"Quantité","yLabel":"Prix"}]
- Le graphique va dans le champ "graph" SÉPARÉ — PAS dans "statement" — guillemets du JSON interne échappés \\"type\\"
- Valeur de "graph" : une string "[GRAPH: {JSON_VALIDE}]" OU null
- Dans "statement", écrire : "DOCUMENT — [Titre, Source, Année] [voir document ci-dessous] Questions : 1) ..."
- Les données du tableau/graphique doivent être COHÉRENTES avec les questions posées (calculs de taux de variation, lecture de données, parts en %)

Réponds EXACTEMENT avec ce JSON (aucun texte avant ou après).

STRUCTURE OBLIGATOIRE SELON LA SECTION :

Si section Terminale Spécialité SES → ÉPREUVE COMPOSÉE, 3 exercices (4+6+10=20) :
Ex1 = EC1 Mobilisation de connaissances (4 pts) : 2 questions de cours sur 2 chapitres différents (économie + sociologie/science politique), graph:null
Ex2 = EC2 Étude d'un document (6 pts) : un document STATISTIQUE (graph type "table" ou "bar" OBLIGATOIRE) + 2 questions (1. lecture/calcul de donnée précise — 2 pts ; 2. à l'aide du document et de vos connaissances — 4 pts)
Ex3 = EC3 Raisonnement appuyé sur un dossier documentaire (10 pts) : sujet de raisonnement + 2 documents décrits dans le statement (dont 1 statistique en graph type "table"), réponse organisée attendue (intro, arguments, conclusion)

Si section Première Spécialité SES → 3 exercices (6+6+8=20) :
Ex1 = Mobilisation de connaissances : définitions, mécanismes (6 pts), graph:null
Ex2 = Étude d'un document statistique avec calculs (élasticité, taux de variation, taux d'intérêt, inflation IPC) (6 pts), graph "table" ou "bar" OBLIGATOIRE
Ex3 = Raisonnement / mini-dissertation sur dossier (8 pts), graph "table" si données utiles

Si section Seconde SES → 4 exercices (5+5+5+5=20) :
Ex1 = Questions de cours (VA, PIB, socialisation, vote…) (5 pts), graph:null
Ex2 = Calculs économiques (VA = P − CI, taux de croissance, productivité, taux de chômage, recette) (5 pts), graph:null
Ex3 = Étude d'un document statistique (5 pts), graph "table" ou "bar" OBLIGATOIRE
Ex4 = Mini-raisonnement structuré (5 pts), graph:null

Si section STMG → ÉTUDE DE CAS, 3 exercices (7+6+7=20) :
Ex1 = Management & Sciences de gestion : analyse d'une organisation (finalités, parties prenantes, performance, SWOT, KPI) (7 pts), graph "table" possible (indicateurs de gestion)
Ex2 = Droit & Économie : qualification juridique (contrat, responsabilité, personne) + question économique (marché, chômage, inflation) (6 pts), graph:null
Ex3 = Gestion-Finance : calculs sur données chiffrées — résultat, FDR, BFR, trésorerie nette, MCV, seuil de rentabilité (7 pts), graph "table" OBLIGATOIRE (bilan ou compte de résultat simplifié)

{
  "title": "${section} — Simulation IA Variante ${idx+1}",
  "section": "${section}",
  "duration": 240,
  "totalPoints": ${totalPts},
  "exercises": [
    {
      "num": 1,
      "title": "Exercice 1 — [Intitulé précis : EC1 / Mobilisation / Management…]",
      "theme": "[Chapitre(s) du programme]",
      "points": 4,
      "graph": null,
      "statement": "Énoncé complet avec les questions numérotées 1), 2). Notions SES précises. Minimum 100 mots."
    },
    {
      "num": 2,
      "title": "Exercice 2 — [EC2 Étude d'un document / Document statistique]",
      "theme": "[Chapitre]",
      "points": 6,
      "graph": "[GRAPH: {JSON_TABLE_OU_BAR_ICI}] — OBLIGATOIRE pour cet exercice",
      "statement": "DOCUMENT — [Titre précis, Source : INSEE/Eurostat…, Année] [voir document ci-dessous]\\n\\nQuestions :\\n1) [Lecture ou calcul d'une donnée précise du document — taux de variation, part, écart en points] (2 pts)\\n2) À l'aide du document et de vos connaissances, [question d'analyse] (4 pts). Minimum 120 mots."
    },
    {
      "num": 3,
      "title": "Exercice 3 — [EC3 Raisonnement / Gestion-Finance…]",
      "theme": "[Chapitre]",
      "points": 10,
      "graph": "[GRAPH: {JSON_TABLE_ICI}] ou null",
      "statement": "SUJET : [Sujet de raisonnement précis]\\n\\nDOCUMENT 1 — [Titre, Source, Année] : [contenu textuel résumé 4-6 lignes]\\nDOCUMENT 2 — [Titre, Source, Année] [voir document ci-dessous si graph]\\n\\nConsigne : réponse organisée (introduction, arguments appuyés sur les documents et vos connaissances, conclusion). Minimum 140 mots."
    },
    {
      "num": 4,
      "title": "Exercice 4 — [SEULEMENT pour la Seconde SES, sinon SUPPRIMER cet exercice et répartir les points]",
      "theme": "[Chapitre]",
      "points": 5,
      "graph": null,
      "statement": "4ème exercice UNIQUEMENT pour la Seconde (4×5=20). Pour Terminale (4+6+10), Première (6+6+8) et STMG (7+6+7) : 3 exercices seulement. Minimum 80 mots."
    }
  ]
}`
    : `Crée un sujet de Bac ORIGINAL numéro ${idx+1} (sur 5 variantes) inspiré de ces sources :
${contextLines}
${customText ? `\nTexte fourni par l'élève (contenu référence) :\n${customText.substring(0,800)}` : ''}

Règles STRICTES :
- NOUVEAU sujet ORIGINAL, jamais une copie. Change toujours fonctions, valeurs, contexte
- Garde la structure et le niveau Bac Français officiel
- Chaque exercice a des sous-parties numérotées 1), 2), 3)…
- Données numériques précises et réalistes
- Totale : ${totalPts} points répartis sur 4 exercices
- Niveau Bac : au moins 1 exercice avec une courbe ou figure géométrique à étudier

GRAPHIQUES — UTILISER LE SYSTÈME UNIVERSEL :
${UNIVERSAL_GRAPH_PROMPT}

GRAPHIQUES DANS LES ÉNONCÉS — RÈGLES ABSOLUES :

FORMAT 1 — COURBE DE FONCTION :
[GRAPH: {"type":"function","expressions":["x*Math.exp(-x)+2"],"xMin":-1,"xMax":5,"labels":["f(x)"],"title":"Courbe de f"}]

FORMAT 2 — FIGURE GÉOMÉTRIQUE (triangle, cercle, vecteurs, angles) :
[GRAPH: {"type":"geometry","title":"Triangle ABC","shapes":[{"type":"axes","step":1},{"type":"grid","step":1},{"type":"triangle","points":[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":1,"y":3,"label":"C"}],"fill":"#6366f120"},{"type":"point","cx":0,"cy":0,"label":"A"},{"type":"point","cx":4,"cy":0,"label":"B"},{"type":"point","cx":1,"cy":3,"label":"C"}]}]

FORMAT 3 — GÉOMÉTRIE DANS L'ESPACE (projection 2D, JAMAIS de formes 3D) :
[GRAPH: {"type":"geometry","title":"Repère (O,i,j,k) — projection","shapes":[{"type":"axes","step":1},{"type":"vector","from":{"x":0,"y":0,"label":"O"},"to":{"x":3,"y":0},"label":"i","color":"#ef4444"},{"type":"vector","from":{"x":0,"y":0},"to":{"x":0,"y":3},"label":"j","color":"#10b981"},{"type":"vector","from":{"x":0,"y":0},"to":{"x":1.5,"y":1.5},"label":"k","color":"#f59e0b"},{"type":"segment","x1":0,"y1":0,"x2":2,"y2":1,"color":"#6366f1","label":"OA"},{"type":"point","cx":2,"cy":1,"label":"A(2,1,0)"}]}]

FORMAT 4 — PLAN COMPLEXE :
[GRAPH: {"type":"geometry","title":"Plan complexe","shapes":[{"type":"axes","step":1},{"type":"grid","step":1},{"type":"point","cx":2,"cy":3,"label":"M(z1)","color":"#6366f1"},{"type":"point","cx":-1,"cy":2,"label":"N(z2)","color":"#10b981"},{"type":"segment","x1":0,"y1":0,"x2":2,"y2":3,"color":"#6366f1","dashed":true}]}]

FORMAT 5 — SCHÉMA PILE ÉLECTROCHIMIQUE (ASCII) :
[GRAPH: {"type":"ascii","title":"Pile Zinc-Cuivre (Daniell)","content":"\n  (-)  Zn │ ZnSO₄  ║  CuSO₄ │ Cu  (+)\n       │              pont salin              │\n       │                                       │\n       └──────────── e⁻ ────────────────────┘\n  Anode: Zn → Zn²⁺ + 2e⁻    Cathode: Cu²⁺ + 2e⁻ → Cu","legend":["Anode (-): Zn se dissout","Cathode (+): Cu se dépose","Pont salin: transfert anions/cations","e⁻: courant électronique"]}]

FORMAT 6 — SCHÉMA CIRCUIT ÉLECTRIQUE (ASCII) :
[GRAPH: {"type":"ascii","title":"Circuit RC série","content":"\n  ┌───┤R├────┬───┐\n  │          │   │\n  E(t)      ═╪═ C  u_C\n  │          │   │\n  └──────────┴───┘","legend":["R: résistance (Ω)","C: condensateur (F)","E(t): générateur","u_C: tension condensateur"]}]

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
- Pile électrochimique / circuit RC/RL/RLC / montage optique → FORMAT 5 ou 6 (ascii)
- JAMAIS essayer de dessiner une pile ou un circuit avec type "geometry" — utiliser "ascii"

Réponds EXACTEMENT avec ce JSON (aucun texte avant ou après).

STRUCTURE OBLIGATOIRE SELON LA SECTION :

Si section Terminale Générale → 4 exercices de 5 pts chacun (4×5=20) :
Ex1=Analyse (ln/exp/intégration), Ex2=Probabilités (loi normale/binomiale), Ex3=Géométrie espace, Ex4=Suites ou Complexes ou Algo

Si section Terminale STI2D → 3 exercices (7+6+7=20) :
Ex1=Suites ou Fonctions (7 pts), Ex2=Probabilités (6 pts), Ex3=Analyse STI2D exp/ln ou intégration (7 pts)

Si section Maths Expertes → 3 exercices (7+7+6=20) :
Ex1=Arithmétique (7 pts), Ex2=Complexes (7 pts), Ex3=Matrices/Graphes/Markov (6 pts)

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
      "points": 5,
      "graph": "[GRAPH: {JSON_GRAPHIQUE_ICI}] ou null",
      "statement": "Énoncé SANS le bloc [GRAPH]. Notation FRANÇAISE : f'(x), ∫, √, ℝ, ∈, ∀, ∃, ≤, ≥, →, ↔, Δ, θ, λ. PAS de LaTeX \frac ni \sqrt. Sous-parties 1), 2), 3). Minimum 140 mots."
    },
    {
      "num": 2,
      "title": "Exercice 2 — [Thème précis]",
      "theme": "[Thème]",
      "points": 5,
      "graph": "[GRAPH: {JSON_GRAPHIQUE_ICI}] ou null",
      "statement": "Énoncé SANS le bloc [GRAPH]. Notation FRANÇAISE. Minimum 120 mots."
    },
    {
      "num": 3,
      "title": "Exercice 3 — [Thème précis]",
      "theme": "[Thème]",
      "points": 5,
      "graph": null,
      "statement": "Énoncé complet. Notation FRANÇAISE. Minimum 100 mots."
    },
    {
      "num": 4,
      "title": "Exercice 4 — [Thème précis, OBLIGATOIRE pour Terminale Générale]",
      "theme": "[Thème]",
      "points": 5,
      "graph": null,
      "statement": "4ème exercice OBLIGATOIRE pour Terminale Générale. Pour autres sections : supprimer cet exercice et ajuster les points. Minimum 80 mots."
    }
  ]
}`

  const raw = await askClaude(prompt, system, 5000, matiere, onDelta)
  const parsed = parseJSON<Omit<GeneratedExam,'id'|'index'>>(raw, {
    title: isAnglais ? `LLCER Anglais — Simulation Variante ${idx+1}` : `${section} — Simulation Variante ${idx+1}`,
    section: isAnglais ? 'Terminale LLCER Anglais' : section,
    duration: isAnglais ? 210 : isEco ? 240 : 180,
    totalPoints:totalPts,
    exercises:[{num:1,title: isAnglais ? 'Subject 1' : 'Exercice 1',theme: isAnglais ? 'Identities & Exchanges' : 'Analyse',points:20,statement: isAnglais ? 'Generation error — please retry.' : 'Erreur de génération — veuillez réessayer.'}]
  })
  return { ...parsed, id:`exam-${idx}-${Date.now()}`, index:idx }
}

// ── Génération correction ─────────────────────────────────────────
async function correctOneExercise(
  exercise: GeneratedExam['exercises'][number],
  totalPoints: number,
  studentWork: string,
  examTitle: string,
  onDelta?: (full: string) => void
): Promise<string> {
  // Détecter la matière via globalMatiere ET le titre/thème de l'exercice (double sécurité)
  const isAnglaisCorrect = globalMatiere === 'anglais'
    || examTitle?.toLowerCase().includes('llcer')
    || examTitle?.toLowerCase().includes('anglais')
    || exercise.theme?.toLowerCase().includes('exchange')
    || exercise.theme?.toLowerCase().includes('sphere')
    || exercise.theme?.toLowerCase().includes('subject')
    || exercise.theme?.toLowerCase().includes('fiction')
    || exercise.theme?.toLowerCase().includes('territory')
    || exercise.theme?.toLowerCase().includes('diversity')
    || exercise.theme?.toLowerCase().includes('innovation')
    || exercise.theme?.toLowerCase().includes('art &')
    || exercise.title?.toLowerCase().includes('subject 1')
    || exercise.title?.toLowerCase().includes('subject 2')

  const isEcoCorrect = globalMatiere === 'eco-gestion'

  const system = isAnglaisCorrect
    ? `You are an expert LLCER English examiner and teacher correcting a French Baccalauréat paper.
You write EXHAUSTIVE, DETAILED and PEDAGOGICAL corrections entirely in ENGLISH.
NEVER summarise a step. Develop EVERYTHING. The student must understand without any other resource.
Use markdown: ### for parts, **bold** for results, > for important points.
ALL your correction text MUST BE IN ENGLISH — vocabulary, explanations, feedback, everything.`
    : isEcoCorrect
    ? `Tu es un professeur correcteur du Baccalauréat français, spécialiste de SES (Sciences Économiques et Sociales) et de la série STMG.
Tu rédiges des corrections EXHAUSTIVES, ULTRA-DÉTAILLÉES et PÉDAGOGIQUES.
Ne résume JAMAIS une étape. Développe TOUT. L'élève doit comprendre sans autre ressource.
Tu as suffisamment de tokens pour tout rédiger. Ne t'arrête JAMAIS avant la fin.

NIVEAU DE DÉTAIL EXIGÉ (correction modèle notée 20/20) :
- MOBILISATION DE CONNAISSANCES (EC1) : définis chaque notion avec précision (définition du programme), illustre par un exemple ou un mécanisme, cite les auteurs pertinents (Schumpeter, Ricardo, Bourdieu, Durkheim, Becker, Paugam, Rawls…).
- ÉTUDE DE DOCUMENT (EC2) : montre COMMENT lire le document (titre, source, unités, champ), fais les CALCULS demandés en entier (taux de variation = (VA−VD)/VD×100, écarts en points de %, coefficients multiplicateurs, lecture d'une donnée : « Selon l'INSEE, en 2024, … »), puis structure la réponse (idée + donnée chiffrée à l'appui).
- RAISONNEMENT (EC3) / DISSERTATION : donne la méthode (analyse du sujet, mots-clés), propose un plan détaillé (I/A,B — II/A,B), rédige une introduction modèle (accroche, définitions, problématique, annonce du plan), développe CHAQUE argument en AEI (Affirmation, Explicitation, Illustration par les documents et les connaissances), conclusion modèle.
- STMG GESTION-FINANCE : pose chaque formule (FDR = capitaux permanents − actif immobilisé ; BFR = stocks + créances clients − dettes fournisseurs ; TN = FDR − BFR ; MCV = CA − charges variables ; taux de MCV = MCV/CA ; seuil de rentabilité = charges fixes / taux de MCV), montre le calcul complet, interprète le résultat (situation saine ou non, point mort…).
- Termine chaque question par le barème détaillé et les pièges classiques.
Utilise markdown : ### pour les parties, **gras** pour les résultats, > pour les points importants.
Vocabulaire SES rigoureux. Données chiffrées toujours accompagnées de leur unité et de leur source.`
    : `Tu es un professeur correcteur du Baccalaureat français, specialiste en mathematiques.
Tu rediges des corrections EXHAUSTIVES, ULTRA-DETAILLEES et PEDAGOGIQUES.
Ne resume JAMAIS une etape. Developpe TOUT. L'eleve doit comprendre sans autre ressource.
Tu as suffisamment de tokens pour tout rediger. Ne t'arrete JAMAIS avant la fin. Ne dis JAMAIS "je vais resumer" ou "et ainsi de suite". Redige CHAQUE etape jusqu'au bout sans exception.

NIVEAU DE DETAIL EXIGE (correction modele notee 20/20) :
- Pour CHAQUE etape : rappelle d'abord la propriete / theoreme / formule du cours utilise (avec ses conditions), PUIS montre le calcul INTEGRAL (aucun saut, chaque ligne de calcul visible), PUIS justifie pourquoi cette etape est valide.
- Explique le RAISONNEMENT, pas seulement le calcul : pourquoi cette methode, comment on sait quoi faire ensuite.
- Quand c'est pertinent, termine la question par une VERIFICATION du resultat (substitution, ordre de grandeur, cas particulier).
- Donne les valeurs exactes ET, si utile, une valeur approchee.
- Redige comme une copie de Bac modele : un eleve moyen doit pouvoir tout reproduire seul.
Utilise markdown : ### pour les parties, **gras** pour les resultats, > pour les points importants.

NOTATION MATHEMATIQUE FRANÇAISE OBLIGATOIRE :
- Derivee : f'(x) ou f''(x) — JAMAIS \\frac{d}{dx}
- Integrale : les vrais symboles Unicode ∫ₐᵇ f(x)dx
- Racine : √x, √(x²+1) — JAMAIS \\sqrt{x}
- Fraction : (a+b)/(c+d) ou notation en ligne — JAMAIS \\frac{a}{b}
- Ensembles : ℝ, ℕ, ℤ, ℂ, ∈, ∉, ∪, ∩
- Logique : ∀, ∃, ⟹, ⟺
- Vecteurs : écris toujours \\overrightarrow{AB} ou \\vec{u} (flèche AU-DESSUS), jamais une flèche après les lettres
- Exposants Unicode : x², x³, eˣ, e⁻ˣ
- Indices Unicode : xₙ, uₙ₊₁
- Inegalites : ≤, ≥, ≠, ≈, →, +∞, -∞
- Grec : θ, λ, α, β, γ, δ, Δ, σ, π, ω, ε

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

  // ── ANGLAIS LLCER : prompt spécialisé en anglais ──────────────────
  if (isAnglaisCorrect) {
    const anglaisPrompt = withWork
      ? `EXAM: ${examTitle}
SUBJECT TO CORRECT: ${exercise.title} — ${exercise.points} points out of ${totalPoints}

FULL STATEMENT:
${exercise.statement}

STUDENT'S WORK:
${studentWork}

Write the COMPLETE correction of this LLCER English subject ONLY. Structure REQUIRED:

## ${exercise.title} — Detailed Correction (${exercise.points} pts)

### PART 1 — Document Synthesis (16 pts)

**Synthesis approach:**
- Introduce the thematic axis and the synthesis question
- Show how to write the introduction (thematic statement + synthesis question + outline)
- Develop a model synthesis with: introduction, 2-3 structured paragraphs, conclusion

**Model synthesis:**
[Write a complete model synthesis (~500 words) responding to the synthesis question]

**Document analysis:**
For each document:
- Document A: [Key ideas + how it relates to the synthesis question]
- Document B: [Key ideas + how it illustrates/contrasts with A]
- Document C: [How the image/visual reinforces the theme]

**Assessment of student's work:**
✅ Correct: [What the student did well]
❌ To improve: [What is missing or inaccurate]
💡 Advice: [Specific methodological advice]

### PART 2 — Translation into French (4 pts)

**Model translation:**
[Precise, idiomatic French translation of the passage]

**Translation notes:**
- [Key translation choices and why]
- [Difficult phrases and how to handle them]
- [Register and style considerations]

**Student assessment:**
[Evaluation of student's translation]

> **Summary ${exercise.title}:** [X]/${exercise.points} pts — [Pedagogical comment]`
      : `EXAM: ${examTitle}
SUBJECT: ${exercise.title} — ${exercise.points} points out of ${totalPoints}

FULL STATEMENT:
${exercise.statement}

Write the COMPLETE and EXHAUSTIVE correction of this LLCER English subject ONLY. Structure REQUIRED:

## ${exercise.title} — Complete Correction (${exercise.points} pts)

### PART 1 — Document Synthesis (16 pts)

**Methodological approach:**
1. How to read and analyse the three documents
2. How to identify the synthesis question and thematic axis
3. Structure of an effective synthesis: introduction + 2-3 paragraphs + conclusion

**Complete model synthesis (~500 words):**
[Write a full, structured synthesis responding precisely to the question, using all three documents with clear cross-references]

**Document-by-document analysis:**
- Document A — [Author, Year]: [Main ideas, register, purpose, how it answers the question]
- Document B — [Author, Year]: [Main ideas, how it develops/contrasts with A]
- Document C — [Image]: [Visual argument, how it reinforces the thematic axis]

**Key vocabulary and expressions:**
[10-15 thematic vocabulary items useful for this axis]

### PART 2 — Translation into French (4 pts)

**Model translation:**
[Complete, precise and idiomatic French translation]

**Translation commentary:**
- Syntactic and lexical choices explained
- Difficult expressions handled
- Register maintained

> **Key points to remember for ${exercise.title}:** [Synthesis method + translation rules]`

    return askClaude(anglaisPrompt, system, 8000)
  }

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

Redige la correction COMPLETE de cet exercice UNIQUEMENT, en analysant la copie de l'eleve. RÉPONDS UNIQUEMENT aux questions réellement posées — aucune variante ni alternative hypothétique. Sois COMPLET mais DIRECT (pas de remplissage) et traite TOUTES les sous-questions jusqu'à la dernière. Structure :
## ${exercise.title} — Correction detaillee (${exercise.points} pts)
[Pour CHAQUE sous-question numerotee, dans l'ordre :]

### Question X
**Methode :** [Theoreme / formule / methode + pourquoi on l'applique ici, en 1-2 phrases]

**Resolution :**
- [Etape : action precise → calcul visible = resultat]
- [...continuer sans sauter d'etape jusqu'au resultat final]

> **Resultat :** [Reponse finale]

**Bareme :** [X] pts

**Analyse de la copie :** ✅ [ce que l'eleve a bien fait] · ❌ [ce qui est faux ou manquant + pourquoi] · 💡 [comment corriger]

[A la toute fin, UNE SEULE FOIS, apres avoir traite TOUTES les questions :]

---

> **Bilan ${exercise.title} :** [X]/${exercise.points} pts — [points forts, points a travailler, 1-2 pieges classiques a retenir]`
    : `EXAMEN : ${examTitle}
EXERCICE : ${exercise.title} — ${exercise.points} points sur ${totalPoints}

ENONCE COMPLET :
${exercise.statement}

Redige la correction COMPLETE de cet exercice UNIQUEMENT. RÉPONDS UNIQUEMENT aux questions réellement posées — AUCUNE variante ni « alternative pédagogique » hypothétique. Sois COMPLET mais DIRECT (pas de remplissage) et traite TOUTES les sous-questions jusqu'à la dernière. Structure :

## ${exercise.title} — Correction complete (${exercise.points} pts)

[Pour CHAQUE sous-question numerotee, dans l'ordre :]

### Question X
**Methode :** [Theoreme / formule appliquee + pourquoi, en 1-2 phrases]

**Resolution :**
- [Etape : action + justification → calcul visible = resultat]
- [...continuer sans sauter d'etape essentielle jusqu'au resultat final]

> **Resultat :** [Reponse finale]

**Bareme :** [X] pts — [demarche / calcul / conclusion]

[UNE SEULE FOIS, a la toute fin, apres avoir traite TOUTES les questions :]

---

> **📌 A retenir & pieges :** [2-3 formules/methodes cles + 1-2 erreurs classiques frequentes a eviter sur ce type d'exercice]`

  // ── Correction robuste avec CONTINUATION AUTO ──
  // Une longue correction maths peut être coupée au timeout proxy (~240s) avant 3b/3c.
  // On force une sentinelle de fin ; si elle manque, on relance pour terminer et on recolle.
  const FIN = '[[FIN_CORRECTION]]'
  const promptFull = prompt + "\n\nIMPÉRATIF ABSOLU : corrige TOUTES les sous-questions dans l'ordre, jusqu'à la TOUTE DERNIÈRE (ex. 3b, 3c…), sans en omettre aucune. Quand la correction est ENTIÈREMENT terminée, écris sur une dernière ligne EXACTEMENT : " + FIN

  let full = await askClaude(promptFull, system, 8000, undefined, onDelta)

  let tries = 0
  while (tries < 2 && !full.includes('FIN_CORRECTION')) {
    tries++
    const base = full
    const tail = base.slice(-1800)
    const contPrompt = "Tu corriges l'exercice \"" + exercise.title + "\". Voici la correction DÉJÀ rédigée (NE la répète SURTOUT PAS) :\n\n…" + tail
      + "\n\n---\nÉNONCÉ COMPLET (référence) :\n" + exercise.statement
      + "\n\nCONTINUE la correction EXACTEMENT là où elle s'est arrêtée ci-dessus, sans RIEN répéter, et traite TOUTES les sous-questions restantes jusqu'à la dernière. Même format (### Question X, **Méthode :**, **Résolution :**, > **Résultat :**, **Barème :**). Quand tout est terminé, écris sur une dernière ligne EXACTEMENT : " + FIN
    const cont = await askClaude(contPrompt, system, 8000, undefined,
      onDelta ? (pp: string) => onDelta(base + '\n' + pp) : undefined)
    full = base + '\n' + cont
  }

  // Retirer la sentinelle (et tout ce qui suit) du texte final
  return full.split(/[\[\]*\s]*FIN_CORRECTION[\s\S]*/)[0].trimEnd()
}

// Genere la correction exercice par exercice et appelle onProgress a chaque etape
// Corrige UN SEUL exercice (appelé à la demande depuis PhaseCorrection)
async function correctSingleExercise(
  exam: GeneratedExam,
  exerciseIndex: number,
  studentWork: string,
  onDelta?: (full: string) => void
): Promise<string> {
  const ex = exam.exercises[exerciseIndex]
  if (!ex) return ''

  // Extraire images depuis statement et copie (correction directe)
  const { images: examImgs, cleanText: cleanStmt } = extractImagesFromText(ex.statement || '')
  const { images: copyImgs, cleanText: cleanWork } = extractImagesFromText(studentWork || '')
  const allImages = [...examImgs, ...copyImgs]

  if (allImages.length > 0) {
    const isAnglais = exam.title.toLowerCase().includes('english') || exam.title.toLowerCase().includes('anglais')
    const system = isAnglais
      ? `You are an expert English teacher for the French Baccalaureate. Write an EXHAUSTIVE correction ENTIRELY IN ENGLISH based on the exam image(s). Use markdown.`
      : `Tu es un professeur correcteur expert du Baccalauréat français.
Tu analyses l'image de l'examen fournie et rédiges une CORRECTION COMPLÈTE, EXHAUSTIVE et PÉDAGOGIQUE.
Identifie tous les exercices et questions visibles dans l'image.
Pour chaque question : énoncé reconstitué, concept, résolution étape par étape, résultat.
Utilise markdown : ### pour les parties, **gras** pour les résultats, > pour les points importants.`
    const prompt = cleanWork && cleanWork !== '(Aucune copie — fournir la correction complète)'
      ? `Voici l'examen (image) et la copie de l'élève :

Copie :
${cleanWork}

Rédige la correction complète avec analyse de la copie.`
      : `Voici le sujet de l'examen en image. Rédige la correction complète et exhaustive de tous les exercices visibles, étape par étape.`
    return askClaudeWithImages(prompt, allImages, system, 12000, onDelta)
  }

  const cleanEx = { ...ex, statement: cleanStmt }
  return correctOneExercise(cleanEx, exam.totalPoints, cleanWork || studentWork, exam.title, onDelta)
}

// ── Analyse UN exercice immédiatement après correction ───────────
async function analyzeOneExerciseSim(
  exercise: { title:string; theme:string; points:number; statement:string },
  studentAnswer: string,
  correction: string,
  exIdx: number
): Promise<AnalysisResult> {
  const isAnglaisAnalyze = globalMatiere === 'anglais'
    || exercise.theme?.toLowerCase().includes('exchange')
    || exercise.theme?.toLowerCase().includes('sphere')
    || exercise.theme?.toLowerCase().includes('subject')
    || exercise.theme?.toLowerCase().includes('fiction')
    || exercise.theme?.toLowerCase().includes('territory')
    || exercise.title?.toLowerCase().includes('subject')
  const system = isAnglaisAnalyze
    ? `You are an expert LLCER English pedagogy specialist. Analyse ONE exercise and generate targeted remediation. RESPOND ONLY IN VALID JSON. ALL text fields in ENGLISH.`
    : globalMatiere === 'eco-gestion'
    ? `Tu es un expert en pédagogie des SES et de l'éco-gestion STMG (Bac français). Analyse UN exercice (EC1/EC2/EC3, dissertation, étude de cas, calculs économiques ou de gestion) et génère une remédiation ciblée : méthode (AEI, lecture de document statistique, calculs de taux de variation, FDR/BFR/seuil), notions et auteurs du programme. RÉPONDS UNIQUEMENT EN JSON VALIDE.`
    : `Tu es un expert en pédagogie mathématique. Analyse UN exercice et génère une remédiation ciblée. RÉPONDS UNIQUEMENT EN JSON VALIDE.`
  const prompt = `Analyse cet exercice de simulation Bac.

EXERCICE ${exIdx+1} : ${exercise.title} (${exercise.theme}, ${exercise.points} pts)
${exercise.statement.substring(0,250)}

RÉPONSE ÉLÈVE : ${studentAnswer||('(Aucune réponse)')}
CORRECTION : ${correction.substring(0,800)}

JSON requis :
{
  "estimatedScore": [0 à ${exercise.points}],
  "maxScore": ${exercise.points},
  "weakAreas": [{"theme":"${exercise.theme}","severity":"critical|moderate|good","description":"[Analyse précise de la lacune — UNIQUEMENT basée sur le travail fourni, jamais inventée]","priority":1,"chapter":"[Chapitre concerné]","targetScore":"[ex: +${exercise.points} pts si maîtrisé]"}],
  "globalAdvice": ["[Conseil CONCRET basé sur les lacunes observées]","[Méthode à retenir pour ce type d'exercice]","[Erreur classique à éviter au Bac]"],
  "remediationExercises": [
    {"id":"remSim${exIdx}-1","theme":"${exercise.theme}","difficulty":"introductory","objective":"[Consolider la notion de base]","statement":"Mini-exercice ORIGINAL avec données numériques précises. 2-3 sous-questions. Minimum 80 mots.","hint":"[Quelle formule appliquer — sans donner la réponse]","officialCorrection":"[Correction étape par étape. Minimum 60 mots.]"},
    {"id":"remSim${exIdx}-2","theme":"${exercise.theme}","difficulty":"standard","objective":"[Appliquer au niveau Bac]","statement":"Exercice niveau Bac sur ce thème. 3 sous-questions. Minimum 90 mots.","hint":"[Stratégie de résolution]","officialCorrection":"[Correction complète. Minimum 70 mots.]"},
    {"id":"remSim${exIdx}-3","theme":"${exercise.theme}","difficulty":"advanced","objective":"[Maîtriser en conditions Bac]","statement":"Exercice avancé type Bac France. 4 sous-parties. Minimum 100 mots.","hint":"[Conseil méthodologique niveau Bac]","officialCorrection":"[Correction officielle niveau Bac. Minimum 80 mots.]"}
  ]
}`
  const raw = await askClaude(prompt, system, 6000, undefined, () => {})
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
  const isAnglaisAnalyzeFull = globalMatiere === 'anglais'
    || exam.title?.toLowerCase().includes('llcer')
    || exam.title?.toLowerCase().includes('anglais')
    || exam.section?.toLowerCase().includes('anglais')
    || (exam.exercises?.[0]?.theme?.toLowerCase().includes('exchange') ?? false)
    || (exam.exercises?.[0]?.title?.toLowerCase().includes('subject') ?? false)
  const system = isAnglaisAnalyzeFull
    ? `You are an expert LLCER English pedagogy specialist and student work analyst.
You analyse student work and build a personalised improvement plan.
RESPOND ONLY IN VALID JSON. ALL text fields in ENGLISH.`
    : globalMatiere === 'eco-gestion'
    ? `Tu es un expert en pédagogie des SES et de l'éco-gestion STMG, et en remédiation scolaire.
Tu analyses les travaux d'élèves (épreuve composée EC1/EC2/EC3, dissertation, étude de cas STMG, calculs économiques et de gestion) et construis un plan d'amélioration personnalisé : méthodologie (AEI, plan, lecture de documents statistiques, calculs), notions et auteurs du programme.
RÉPONDS UNIQUEMENT EN JSON VALIDE.`
    : `Tu es un expert en pédagogie mathématique et remédiation scolaire.
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
  "scoreByExercise": [
    {"exerciseTitle":"[titre exercice]","estimated":[pts estimés],"max":[pts max],"comment":"[commentaire précis 1 phrase basé sur la réponse fournie]"}
  ],
  "weakAreas": [
    {
      "theme": "[Thème PRÉCIS ex: Dérivation — règle du quotient]",
      "severity": "critical|moderate|good",
      "description": "[Lacune OBSERVÉE dans le travail — JAMAIS inventée si pas de réponse]",
      "priority": [1=bloquant bac, 2=important, 3=secondaire],
      "chapter": "[Chapitre programme Bac France]",
      "targetScore": "[ex: +3 pts si maîtrisé]"
    }
  ],
  "globalAdvice": [
    "[Conseil ACTIONNABLE concret — ex: Refaire 10 exercices de dérivation]",
    "[Méthode mnémotechnique ou astuce concrète]",
    "[Priorité de révision sur les 2 semaines à venir]"
  ],
  "studyPlan": {
    "week1": ["[Action jour 1-2]","[Action jour 3-4]","[Action jour 5-7]"],
    "week2": ["[Action semaine 2 — approfondissement]"],
    "dailyGoal": "[Objectif quotidien réaliste en minutes]"
  },
  "remediationExercises": [
    {
      "id": "rem-1",
      "theme": "[Thème lacune prioritaire]",
      "difficulty": "introductory",
      "objective": "[Consolider la notion de base manquante]",
      "statement": "Exercice ORIGINAL avec données numériques. 3 sous-questions progressives. Minimum 100 mots.",
      "hint": "[Méthode de démarrage SANS donner la réponse]",
      "officialCorrection": "[Correction étape par étape. Minimum 80 mots.]"
    },
    {"id":"rem-2","theme":"[2ème thème faible]","difficulty":"standard","objective":"[Approfondissement ciblé]","statement":"Exercice standard niveau Bac. 3-4 sous-questions. Minimum 100 mots.","hint":"[Stratégie globale]","officialCorrection":"[Correction complète. Minimum 80 mots.]"},
    {"id":"rem-3","theme":"[3ème thème]","difficulty":"standard","objective":"[Maîtrise du thème]","statement":"Exercice de consolidation. Minimum 90 mots.","hint":"[Conseil de démarrage]","officialCorrection":"[Correction détaillée. Minimum 70 mots.]"},
    {"id":"rem-4","theme":"[Thème le plus critique]","difficulty":"advanced","objective":"[Préparation niveau Bac sur ce thème]","statement":"Exercice niveau Bac complet. 4 sous-parties. Minimum 120 mots.","hint":"[Stratégie de résolution globale]","officialCorrection":"[Correction officielle niveau Bac. Minimum 100 mots.]"}
  ]
}`

  const raw = await askClaude(prompt, system, 7000, undefined, () => {})
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
  const isAnglaisRem = globalMatiere === 'anglais'
    || exercise.theme?.toLowerCase().includes('exchange')
    || exercise.theme?.toLowerCase().includes('sphere')
    || exercise.theme?.toLowerCase().includes('synthesis')
    || exercise.statement?.toLowerCase().includes('thematic axis')
    || exercise.statement?.toLowerCase().includes('document a')
  const system = isAnglaisRem
    ? `You are a supportive but demanding LLCER English tutor.
You correct student responses on remediation exercises.
Be precise, encouraging, and identify exactly what is missing.
ALL your feedback MUST BE IN ENGLISH.`
    : globalMatiere === 'eco-gestion'
    ? `Tu es un tuteur SES / éco-gestion STMG bienveillant mais exigeant.
Tu corriges les réponses d'élèves sur des exercices de remédiation : définitions de notions, mécanismes économiques et sociologiques, calculs (taux de variation, élasticité, taux de chômage, FDR, BFR, seuil de rentabilité), lecture de documents statistiques, méthode AEI.
Sois précis, encourageant, et identifie exactement ce qui manque (notion, donnée chiffrée, étape de calcul, structure de l'argument).`
    : `Tu es un tuteur mathématiques bienveillant mais exigeant.
Tu corriges les réponses d'élèves sur des exercices de remédiation.
Sois précis, encourageant, et identifie exactement ce qui manque.`

  return askClaude(
    `EXERCICE DE REMÉDIATION — ${exercise.theme}
Objectif : ${exercise.objective}

Énoncé :
${exercise.statement}

Réponse de l'élève :
${studentAnswer || '(Aucune réponse fournie)'}

Correction officielle de référence :
${exercise.officialCorrection}

Rédige une correction personnalisée avec cette structure OBLIGATOIRE :

## ✅ Évaluation de ta réponse
[Notation claire : ce qui est juste ✅, incomplet ⚠️, faux ❌]
[Score estimé sur les points de l'exercice]

## 📝 Correction commentée étape par étape
[Pour CHAQUE sous-question : méthode → calcul LaTeX $formule$ → résultat encadré]
[> **Résultat :** $valeur$ pour les résultats clés]

## 🔑 Ce qu'il faut absolument retenir
[Max 3 règles ou formules ESSENTIELLES avec application directe]
[Erreur classique à éviter sur ce type d'exercice]

## 🎯 Exercice flash pour consolider
[UN petit exercice 1-2 questions sur le même concept — avec la réponse]

## 📈 Prochain pas
[Action concrète et spécifique pour maîtriser ce thème avant le Bac]`,
    system, 2500
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
  const isAnglaisGrade = globalMatiere === 'anglais'
    || exam.title?.toLowerCase().includes('llcer')
    || exam.title?.toLowerCase().includes('anglais')
    || (exam.exercises?.[0]?.title?.toLowerCase().includes('subject') ?? false)
  const system = isAnglaisGrade
    ? `You are a French Baccalauréat LLCER English examiner. Give a QUICK and FAIR grade.
Respond ONLY in valid JSON, no markdown, no explanation outside JSON. ALL text fields in ENGLISH.`
    : globalMatiere === 'eco-gestion'
    ? `Tu es un correcteur du Baccalaureat français en SES / éco-gestion STMG. Tu donnes une note RAPIDE et JUSTE selon les critères officiels (maîtrise des notions, exploitation des documents, calculs exacts, structure de l'argumentation).
Reponds UNIQUEMENT en JSON valide, sans markdown, sans explication hors JSON.`
    : `Tu es un correcteur du Baccalaureat français. Tu donnes une note RAPIDE et JUSTE.
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

// ══════════════════════════════════════════════════════════════════════
// SANITIZER UNIVERSEL — Gère TOUTES les matières sans cas particuliers
// Maths · Physique · SVT · Informatique · Français
// Entrée : expression IA brute (peut contenir LaTeX, Unicode, erreurs)
// Sortie : expression JS valide pour new Function('x', 'Math', ...)
// ══════════════════════════════════════════════════════════════════════
function sanitizeExpr(expr: string): string {
  if (!expr || typeof expr !== 'string') return '0'
  let e = expr.trim()

  // ── 0. Détecter et rejeter les non-expressions ─────────────────────
  // Si l'expression ressemble à du texte ou LaTeX complexe → retourner '0'
  if (e.startsWith('\\') && !e.includes('(')) return '0'
  if (e.length > 300) e = e.slice(0, 300)

  // ── 1. Unicode math → ASCII ─────────────────────────────────────────
  e = e
    .replace(/−/g, '-')           // tiret moins unicode U+2212
    .replace(/×/g, '*')           // × multiplication
    .replace(/÷/g, '/')           // ÷ division
    .replace(/·/g, '*')           // · point centré
    .replace(/²/g, '*x')          // ² exposant (contexte x²)
    .replace(/³/g, '*x*x')        // ³ exposant
    .replace(/\u00b2/g, '*x')
    .replace(/\u00b3/g, '*x*x')
    .replace(/\u221e/g, '1e15')   // ∞ → grande valeur
    .replace(/\u03c0/g, 'Math.PI')// π
    .replace(/\u03c4/g, '6.2832') // τ (tau = 2π, souvent constante RC)
    .replace(/\u03bb/g, '0.693')  // λ (lambda, constante désintégration)
    .replace(/\u03c9/g, 'x')      // ω souvent = variable fréquence

  // ── 2. LaTeX → JS ──────────────────────────────────────────────────
  e = e
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)')
    .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
    .replace(/\\sqrt/g, 'Math.sqrt')
    .replace(/\\left\(/g, '(').replace(/\\right\)/g, ')')
    .replace(/\\left\[/g, '(').replace(/\\right\]/g, ')')
    .replace(/\\left\|/g, 'Math.abs(').replace(/\\right\|/g, ')')
    .replace(/\\cdot/g, '*')
    .replace(/\\times/g, '*')
    .replace(/\\pm/g, '+')
    .replace(/\\ln\b/g, 'Math.log')
    .replace(/\\log\b/g, 'Math.log10')
    .replace(/\\sin\b/g, 'Math.sin')
    .replace(/\\cos\b/g, 'Math.cos')
    .replace(/\\tan\b/g, 'Math.tan')
    .replace(/\\exp\b/g, 'Math.exp')
    .replace(/\\pi\b/gi, 'Math.PI')
    .replace(/\\[a-zA-Z]+\*/g, '')
    .replace(/\\\\/g, '')
    .replace(/\{/g, '(').replace(/\}/g, ')')

  // ── 3. Puissances → Math.pow ────────────────────────────────────────
  // Ordre important : du plus spécifique au plus général
  e = e
    .replace(/x\*\*(\d+)/g, (_, n) => 'x*'.repeat(Number(n)-1) + 'x') // x**n → x*x*...
    .replace(/x\^(\d+)/g,   (_, n) => 'x*'.repeat(Number(n)-1) + 'x') // x^n
    .replace(/x\^(-\d+)/g,  (_, n) => `Math.pow(x,${n})`)             // x^-n
    .replace(/\(([^()]+)\)\^(\d+)/g, (_, b, n) => `Math.pow(${b},${n})`) // (expr)^n
    .replace(/([a-zA-Z0-9_.]+)\^(\d+)/g, (_, b, n) => `Math.pow(${b},${n})`) // base^n

  // ── 4. Multiplication implicite ──────────────────────────────────────
  e = e
    .replace(/(\d)([a-zA-Z(])/g, '$1*$2')   // 2x → 2*x | 2( → 2*(
    .replace(/\)([a-zA-Z0-9(])/g, ')*$1')   // )x → )*x | )( → )*(
    .replace(/([0-9])\s+([a-zA-Z])/g,'$1*$2')// "2 x" → "2*x"

  // ── 5. Fonctions math (lookbehind pour ne pas doubler Math.) ─────────
  const mathFns: [RegExp, string][] = [
    [/(?<![a-zA-Z0-9_.])ln\s*\(/g,      'Math.log('],
    [/(?<![a-zA-Z0-9_.])log10\s*\(/g,   'Math.log10('],
    [/(?<![a-zA-Z0-9_.])log\s*\(/g,     'Math.log10('],
    [/(?<![a-zA-Z0-9_.])sin\s*\(/g,     'Math.sin('],
    [/(?<![a-zA-Z0-9_.])cos\s*\(/g,     'Math.cos('],
    [/(?<![a-zA-Z0-9_.])tan\s*\(/g,     'Math.tan('],
    [/(?<![a-zA-Z0-9_.])sqrt\s*\(/g,    'Math.sqrt('],
    [/(?<![a-zA-Z0-9_.])abs\s*\(/g,     'Math.abs('],
    [/(?<![a-zA-Z0-9_.])exp\s*\(/g,     'Math.exp('],
    [/(?<![a-zA-Z0-9_.])asin\s*\(/g,    'Math.asin('],
    [/(?<![a-zA-Z0-9_.])acos\s*\(/g,    'Math.acos('],
    [/(?<![a-zA-Z0-9_.])atan\s*\(/g,    'Math.atan('],
    [/(?<![a-zA-Z0-9_.])atan2\s*\(/g,   'Math.atan2('],
    [/(?<![a-zA-Z0-9_.])floor\s*\(/g,   'Math.floor('],
    [/(?<![a-zA-Z0-9_.])ceil\s*\(/g,    'Math.ceil('],
    [/(?<![a-zA-Z0-9_.])round\s*\(/g,   'Math.round('],
    [/(?<![a-zA-Z0-9_.])max\s*\(/g,     'Math.max('],
    [/(?<![a-zA-Z0-9_.])min\s*\(/g,     'Math.min('],
    [/(?<![a-zA-Z0-9_.])pow\s*\(/g,     'Math.pow('],
    [/(?<![a-zA-Z0-9_.])sign\s*\(/g,    'Math.sign('],
    [/(?<![a-zA-Z0-9_.])sinh\s*\(/g,    'Math.sinh('],
    [/(?<![a-zA-Z0-9_.])cosh\s*\(/g,    'Math.cosh('],
    [/(?<![a-zA-Z0-9_.])tanh\s*\(/g,    'Math.tanh('],
    [/(?<![a-zA-Z0-9_.])log2\s*\(/g,    'Math.log2('],
  ]
  for (const [re2, repl] of mathFns) { e = e.replace(re2, repl) }

  // ── 6. Constantes ───────────────────────────────────────────────────
  e = e
    .replace(/\bpi\b/gi, 'Math.PI')
    .replace(/π/g, 'Math.PI')
    .replace(/(?<![a-zA-Z0-9_.])e(?![a-zA-Z0-9_(])/g, 'Math.E')
    .replace(/\bInfinity\b/g, '1e15')
    .replace(/\bNaN\b/g, '0')

  // ── 7. Nettoyage final ──────────────────────────────────────────────
  e = e
    .replace(/\*{2,}/g, '*')      // ** → * (déjà géré mais sécurité)
    .replace(/\s+/g, '')          // supprimer espaces
    .replace(/,,/g, ',')          // virgules doubles

  return e || '0'
}

// ══════════════════════════════════════════════════════════════════════
// AUTO-DÉTECTEUR DE TYPE — Analyse le contexte pour choisir le bon format
// Permet à l'IA de générer des graphiques sans connaître le type exact
// ══════════════════════════════════════════════════════════════════════
function autoDetectGraphType(spec: any): 'function' | 'geometry' | 'ascii' | 'table' | 'bar' {
  if (!spec) return 'function'
  if (spec.type && ['function','geometry','ascii','table','bar','points','parametric','probability'].includes(spec.type)) {
    return spec.type as any
  }
  // Auto-détection depuis le contenu
  if (spec.content && typeof spec.content === 'string') return 'ascii'
  if (spec.shapes && Array.isArray(spec.shapes)) return 'geometry'
  if (spec.rows && Array.isArray(spec.rows)) return 'table'
  if (spec.bars || spec.categories) return 'bar'
  if (spec.expressions && Array.isArray(spec.expressions)) return 'function'
  return 'function'
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
    let traces: any[] = []
    let layout: any = {}
    let config: any = { responsive: true, displayModeBar: false }
    try {
      const xMin = spec.xMin ?? -5
      const xMax = spec.xMax ?? 5
      const colors = ['#6366f1','#10b981','#f59e0b','#ec4899','#06b6d4']

      if (spec.type === 'function' || spec.type === 'parametric') {
        // Vérifier que expressions est valide
        const exprs = Array.isArray(spec.expressions)
          ? spec.expressions.filter((e: string) => e && e.trim() !== '')
          : []
        if (exprs.length === 0) {
          setError('Aucune expression à tracer')
          return
        }

        exprs.forEach((expr: string, i: number) => {
          // ── Pré-compiler UNE SEULE FOIS hors de la boucle ───────────
          const safeExpr = sanitizeExpr(expr)
          let safeFn: Function
          try {
            safeFn = new Function('x', 'Math',
              `"use strict"; try { const _r=(${safeExpr}); return (_r===undefined||_r===null)?null:_r; } catch(e){ return null; }`)
          } catch(compileErr) {
            console.warn('Expr compile error:', expr, compileErr)
            return
          }

          // ── Adapter la résolution selon la plage ─────────────────────
          // Haute fréquence (ex: sin(440*x)) → plus de points
          const hasHighFreq = safeExpr.includes('440') || safeExpr.includes('880') ||
                              safeExpr.includes('1000') || safeExpr.includes('2000')
          const N = hasHighFreq ? 2000 : 600
          const dx = (xMax - xMin) / N

          const xs: number[] = [], ys: number[] = []
          let hasValid = false
          let yMax = 0

          // Passe 1 : trouver la plage de valeurs réelles
          for (let j = 0; j <= N; j++) {
            const x = xMin + j * dx
            const y = safeFn(x, Math)
            if (y !== null && isFinite(y)) {
              yMax = Math.max(yMax, Math.abs(y))
              hasValid = true
            }
          }

          if (!hasValid) {
            console.warn('Aucun point valide pour:', expr)
            return
          }

          // Seuil dynamique : 100x la valeur max observée (pas un seuil fixe 1e6)
          const threshold = Math.max(yMax * 100, 1e10)

          // Passe 2 : tracer avec le bon seuil
          for (let j = 0; j <= N; j++) {
            const x = xMin + j * dx
            const y = safeFn(x, Math)
            xs.push(x)
            ys.push((y !== null && isFinite(y) && Math.abs(y) <= threshold) ? y : NaN)
          }

          traces.push({
            x: xs, y: ys, mode: 'lines', type: 'scatter',
            name: spec.labels?.[i] || expr,
            line: { color: colors[i % colors.length], width: 2.5 },
            connectgaps: false,
          })
        })

        if (traces.length === 0) {
          setError('Tracé impossible — aucune valeur calculable pour : ' + spec.expressions?.[0]?.slice(0,60))
          return
        }
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
      layout = {
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

      ;(window as any).Plotly.newPlot(divRef.current, traces, layout, config)
    } catch(e: any) {
      console.error('MathGraph error:', e, 'spec:', spec)
      const errMsg = e?.message || String(e) || 'Erreur inconnue'
      if (errMsg.includes('Plotly') || errMsg.includes('newPlot')) {
        setError('Graphique — Plotly non chargé, rechargez la page')
      } else if (errMsg.includes('SyntaxError') || errMsg.includes('ReferenceError')) {
        setError('Expression invalide : ' + (spec.expressions?.[0]?.slice(0,50) || '?'))
      } else {
        try {
          const safeTraces = (traces as any[]).map(tr => ({
            ...tr,
            y: (tr.y || []).map((v: any) => (v !== null && isFinite(v) ? v : null)),
            connectgaps: true
          }))
          if (divRef.current && safeTraces.length > 0) {
            ;(window as any).Plotly.newPlot(divRef.current, safeTraces, layout, config)
          }
        } catch {
          setError('Tracé impossible — ' + errMsg.slice(0, 60))
        }
      }
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


// ══════════════════════════════════════════════════════════════════════
// TABLE GRAPH — Tableau de données (loi proba, algo, SVT)
// ══════════════════════════════════════════════════════════════════════
function TableGraph({ spec }: { spec: any }) {
  const headers  = spec.headers  || []
  const rows     = spec.rows     || []
  const highlight = spec.highlight || []
  return (
    <div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(99,102,241,0.25)',margin:'14px 0'}}>
      {spec.title && (
        <div style={{padding:'8px 16px',background:'rgba(99,102,241,0.1)',borderBottom:'1px solid rgba(99,102,241,0.2)',fontSize:12,fontWeight:700,color:'#818cf8'}}>
          📋 {spec.title}
        </div>
      )}
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:12,fontFamily:'monospace'}}>
          {headers.length > 0 && (
            <thead>
              <tr>
                {headers.map((h: string, i: number) => (
                  <th key={i} style={{padding:'8px 12px',background:'rgba(99,102,241,0.12)',color:'#a5b4fc',fontWeight:700,borderBottom:'1px solid rgba(99,102,241,0.2)',textAlign:'center',whiteSpace:'nowrap'}}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row: string[], i: number) => (
              <tr key={i} style={{background: highlight.includes(i) ? 'rgba(99,102,241,0.1)' : i%2===0 ? 'rgba(255,255,255,0.02)' : 'transparent'}}>
                {row.map((cell: string, j: number) => (
                  <td key={j} style={{padding:'6px 12px',color:j===0?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.85)',borderBottom:'1px solid rgba(255,255,255,0.05)',textAlign:'center',whiteSpace:'nowrap'}}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════
// BAR GRAPH — Histogramme / Diagramme en barres
// ══════════════════════════════════════════════════════════════════════
function BarGraph({ spec }: { spec: any }) {
  const categories = spec.categories || []
  const values     = spec.values     || []
  const colors     = spec.colors     || ['#6366f1','#10b981','#f59e0b','#ec4899','#06b6d4']
  const maxVal     = Math.max(...values, 1)
  return (
    <div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(99,102,241,0.25)',margin:'14px 0',background:'rgba(8,8,23,0.95)',padding:'16px'}}>
      {spec.title && (
        <div style={{fontSize:12,fontWeight:700,color:'#818cf8',marginBottom:14,textAlign:'center'}}>{spec.title}</div>
      )}
      <div style={{display:'flex',alignItems:'flex-end',gap:8,height:160,paddingBottom:24,position:'relative'}}>
        {/* Axes Y */}
        {[0,25,50,75,100].map(p => (
          <div key={p} style={{position:'absolute',left:0,right:0,bottom:`${p/100*130+24}px`,borderTop:'1px solid rgba(255,255,255,0.06)',fontSize:9,color:'rgba(255,255,255,0.25)',paddingLeft:2}}>
            {Math.round(maxVal*p/100)}
          </div>
        ))}
        {categories.map((cat: string, i: number) => {
          const h = Math.max(4, (values[i]/maxVal)*130)
          const color = colors[i % colors.length]
          return (
            <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <div style={{fontSize:10,color:color,fontWeight:700}}>{values[i]}</div>
              <div style={{width:'100%',height:`${h}px`,background:color,borderRadius:'4px 4px 0 0',opacity:0.85,transition:'height 0.3s'}}/>
              <div style={{fontSize:10,color:'rgba(255,255,255,0.5)',textAlign:'center',lineHeight:1.2,marginTop:2}}>{cat}</div>
            </div>
          )
        })}
      </div>
      {spec.xLabel && <div style={{textAlign:'center',fontSize:11,color:'rgba(255,255,255,0.3)',marginTop:4}}>{spec.xLabel}</div>}
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════
// RENDERER ASCII — Schémas pile, circuit, montage physique/chimie
// ══════════════════════════════════════════════════════════════════════
function AsciiGraph({ spec }: { spec: any }) {
  const title   = spec.title   || ''
  const content = spec.content || ''
  const legend  = Array.isArray(spec.legend) ? spec.legend : []
  return (
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      border: '1px solid rgba(6,182,212,0.3)',
      margin: '14px 0',
      background: 'rgba(6,182,212,0.04)',
    }}>
      {title && (
        <div style={{
          padding: '8px 18px',
          borderBottom: '1px solid rgba(6,182,212,0.15)',
          fontSize: 12, fontWeight: 700, color: '#06b6d4',
          letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          📐 {title}
        </div>
      )}
      <div style={{ padding: '16px 20px' }}>
        {/* Schéma ASCII */}
        <pre style={{
          fontFamily: "'Courier New', Consolas, monospace",
          fontSize: 13,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.85)',
          background: 'rgba(0,0,0,0.35)',
          borderRadius: 10,
          padding: '14px 18px',
          margin: '0 0 14px',
          overflowX: 'auto',
          whiteSpace: 'pre',
          border: '1px solid rgba(6,182,212,0.15)',
        }}>
          {content}
        </pre>
        {/* Légende */}
        {legend.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {legend.map((item: string, i: number) => (
              <span key={i} style={{
                fontSize: 11, padding: '3px 10px',
                background: 'rgba(6,182,212,0.1)',
                color: '#67e8f9',
                border: '1px solid rgba(6,182,212,0.2)',
                borderRadius: 20, fontWeight: 600,
              }}>
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


// ── Dispatch : function/points → Plotly, geometry → SVG ──────────
function SmartGraph({ spec }: { spec: any }) {
  // Auto-détecter le type si absent ou inconnu
  const detectedType = autoDetectGraphType(spec)
  const effectiveSpec = detectedType !== spec?.type ? {...spec, type: detectedType} : spec

  if (effectiveSpec?.type === 'ascii')    return <AsciiGraph spec={effectiveSpec}/>
  if (effectiveSpec?.type === 'table')    return <TableGraph spec={effectiveSpec}/>
  if (effectiveSpec?.type === 'bar')      return <BarGraph   spec={effectiveSpec}/>
  if (effectiveSpec?.type === 'geometry') return <GeoGraph   spec={effectiveSpec as GeoSpec}/>
  return <MathGraph spec={effectiveSpec as GraphSpec}/>
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

// ── Vecteurs : flèche AU-DESSUS (comme le solveur), via un span CSS ──
function escVecHtml(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}
function vecToHtml(s: string): string {
  return s
    .replace(/\\overrightarrow\s*\{([^}]*)\}/g, '<span class="mb-vec">$1</span>')
    .replace(/\\vec\s*\{([^}]*)\}/g, '<span class="mb-vec">$1</span>')
    .replace(/([A-Za-zΑ-Ωα-ω()]{1,14})\u20d7/g, '<span class="mb-vec">$1</span>')
}
const MB_VEC_CSS = '.mb-vec{position:relative;display:inline-block;white-space:nowrap;padding-top:.22em}'
  + '.mb-vec::before{content:"";position:absolute;left:0;right:.16em;top:.04em;border-top:1.5px solid currentColor}'
  + '.mb-vec::after{content:"";position:absolute;right:-.05em;top:-.12em;border-left:.36em solid currentColor;border-top:.2em solid transparent;border-bottom:.2em solid transparent}'
if (typeof document !== 'undefined' && !document.getElementById('mb-vec-style')) {
  const _st = document.createElement('style'); _st.id = 'mb-vec-style'; _st.textContent = MB_VEC_CSS
  document.head.appendChild(_st)
}

// Nettoie le LaTeX résiduel ($...$, \lim, \frac, \mathbb, exposants…) → Unicode lisible
function cleanLatex(s: string): string {
  if (!s) return s
  let t = s
  t = t.replace(/[\[\]*\s]*FIN_CORRECTION[\[\]*\s]*/g, ' ').replace(/\**\[?\[?FIN[_A-Z]*$/g, '')
  t = t.replace(/\$\$([\s\S]*?)\$\$/g, ' $1 ').replace(/\$([^$\n]+?)\$/g, '$1')
  t = t.replace(/\\left|\\right|\\!|\\;|\\:|\\displaystyle/g, '').replace(/\\,/g, ' ').replace(/\\quad|\\qquad/g, '  ')
       .replace(/\\text\s*\{([^}]*)\}/g, '$1').replace(/\\mathrm\s*\{([^}]*)\}/g, '$1').replace(/\\operatorname\s*\{([^}]*)\}/g, '$1')
  t = t.replace(/\\lim_?\s*\{([^}]*)\}/g, 'lim($1)').replace(/\\lim\b/g, 'lim')
       .replace(/\\sum_?\s*\{([^}]*)\}\s*\^\s*\{([^}]*)\}/g, '\u03A3[$1\u2192$2]').replace(/\\sum\b/g, '\u03A3')
       .replace(/\\int_?\s*\{([^}]*)\}\s*\^\s*\{([^}]*)\}/g, '\u222B[$1\u2192$2]').replace(/\\int\b/g, '\u222B')
       .replace(/\\sqrt\s*\{([^}]*)\}/g, '\u221A($1)').replace(/\\frac\s*\{([^}]*)\}\s*\{([^}]*)\}/g, '($1)/($2)')
       .replace(/\\overrightarrow\s*\{([^}]*)\}/g, '$1\u20D7').replace(/\\vec\s*\{([^}]*)\}/g, '$1\u20D7')
  const sym: Record<string, string> = { 'to':'\u2192','rightarrow':'\u2192','Rightarrow':'\u21D2','infty':'\u221E','cdot':'\u00B7','times':'\u00D7','div':'\u00F7','pm':'\u00B1','mp':'\u2213','leq':'\u2264','le':'\u2264','geq':'\u2265','ge':'\u2265','neq':'\u2260','approx':'\u2248','equiv':'\u2261','notin':'\u2209','in':'\u2208','subset':'\u2282','cup':'\u222A','cap':'\u2229','forall':'\u2200','exists':'\u2203','partial':'\u2202','nabla':'\u2207','alpha':'\u03B1','beta':'\u03B2','gamma':'\u03B3','delta':'\u03B4','theta':'\u03B8','lambda':'\u03BB','mu':'\u00B5','pi':'\u03C0','rho':'\u03C1','sigma':'\u03C3','tau':'\u03C4','phi':'\u03C6','omega':'\u03C9','Delta':'\u0394','Omega':'\u03A9','Sigma':'\u03A3','Phi':'\u03A6' }
  for (const k of Object.keys(sym)) t = t.replace(new RegExp('\\\\' + k + '\\b', 'g'), sym[k])
  t = t.replace(/\\mathbb\s*\{R\}/g, '\u211D').replace(/\\mathbb\s*\{N\}/g, '\u2115').replace(/\\mathbb\s*\{Z\}/g, '\u2124').replace(/\\mathbb\s*\{Q\}/g, '\u211A').replace(/\\mathbb\s*\{C\}/g, '\u2102')
  const sup: Record<string, string> = { '0':'\u2070','1':'\u00B9','2':'\u00B2','3':'\u00B3','4':'\u2074','5':'\u2075','6':'\u2076','7':'\u2077','8':'\u2078','9':'\u2079','+':'\u207A','-':'\u207B','n':'\u207F','i':'\u2071' }
  const sub: Record<string, string> = { '0':'\u2080','1':'\u2081','2':'\u2082','3':'\u2083','4':'\u2084','5':'\u2085','6':'\u2086','7':'\u2087','8':'\u2088','9':'\u2089','n':'\u2099','i':'\u1D62','k':'\u2096','+':'\u208A','-':'\u208B' }
  t = t.replace(/\^\{([^}]*)\}/g, (_m: string, g: string) => [...g].every((c: string) => c in sup) ? [...g].map((c: string) => sup[c]).join('') : '^(' + g + ')')
       .replace(/\^([0-9])/g, (_m: string, g: string) => sup[g] || ('^' + g))
       .replace(/_\{([^}]*)\}/g, (_m: string, g: string) => [...g].every((c: string) => c in sub) ? [...g].map((c: string) => sub[c]).join('') : '_' + g)
       .replace(/_([0-9nik])/g, (_m: string, g: string) => sub[g] || ('_' + g))
  t = t.replace(/\\\\/g, ' ').replace(/\\[a-zA-Z]+/g, (m: string) => m.slice(1))
  return t
}

function TextWithGraphs({ text }: { text: string }) {
  const segments = parseGraphSegments(text)
  let gi = 0
  return (
    <div>
      {segments.map((seg, i) => {
        if (seg.type === 'text') {
          return seg.content ? <MDLines key={i} text={cleanLatex(seg.content)} /> : null
        } else {
          const myGi = gi++
          let inner
          try {
            const spec: GraphSpec = JSON.parse(seg.content)
            inner = <SmartGraph spec={spec} />
          } catch {
            // Si JSON invalide, afficher quand même proprement
            inner = <div style={{padding:'8px 12px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:8,fontSize:11,color:'#fcd34d',margin:'8px 0'}}>📊 Graphique non disponible (format invalide)</div>
          }
          return <div key={i} data-mbgraph={myGi}>{inner}</div>
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
  studentAnswers: string,
  autoDownload = false,
  graphImages: string[] = []
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

  /* ── inline : **gras**, `code` et vecteurs (flèche au-dessus) ── */
  const inline = (s: string) => vecToHtml(esc(cleanLatex(s)))
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
        `background:${col}14;color:${col}">${inline(t.slice(4))}</div>`
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
        const fax='<line x1="'+FP+'" y1="'+foy+'" x2="'+(FW-FP)+'" y2="'+foy+'" stroke="#475569" stroke-width="1.2"/>'
          +'<line x1="'+fox+'" y1="'+FP+'" x2="'+fox+'" y2="'+(FH-FP)+'" stroke="#475569" stroke-width="1.2"/>'
          +'<text x="'+(FW-FP+6)+'" y="'+(Number(foy)+4)+'" fill="#475569" font-size="12" font-style="italic">x</text>'
          +'<text x="'+(Number(fox)+5)+'" y="'+(FP-4)+'" fill="#475569" font-size="12" font-style="italic">y</text>'
        const fttl=sp.title?'<text x="'+(FW/2)+'" y="'+(FH-4)+'" fill="#64748b" font-size="11" text-anchor="middle">'+esc2(String(sp.title))+'</text>':''
        return '<div class="mb-graph" style="margin:12px 0;border-radius:10px;overflow:hidden;border:1px solid rgba(99,102,241,0.3);display:inline-block">'
          +(fleg?'<svg width="'+FW+'" height="20" xmlns="http://www.w3.org/2000/svg" style="background:#fff;display:block">'+fleg+'</svg>':'')
          +'<svg width="'+FW+'" height="'+FH+'" viewBox="0 0 '+FW+' '+FH+'" xmlns="http://www.w3.org/2000/svg" style="background:#fff;display:block">'+fax+fpaths+fttl+'</svg></div>'
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
            for(let gx=Math.ceil(gxMin);gx<=gxMax;gx++)gsvg+='<line x1="'+gtx(gx).toFixed(1)+'" y1="'+GP+'" x2="'+gtx(gx).toFixed(1)+'" y2="'+(GH-GP)+'" stroke="#1e293b14" stroke-width="1"/>'
            for(let gy=Math.ceil(gyMin);gy<=gyMax;gy++)gsvg+='<line x1="'+GP+'" y1="'+gty(gy).toFixed(1)+'" x2="'+(GW-GP)+'" y2="'+gty(gy).toFixed(1)+'" stroke="#1e293b14" stroke-width="1"/>'
          }else if(gs.type==='axes'){
            gsvg+='<line x1="'+GP+'" y1="'+gty(0).toFixed(1)+'" x2="'+(GW-GP)+'" y2="'+gty(0).toFixed(1)+'" stroke="#475569" stroke-width="1.5"/>'
              +'<line x1="'+gtx(0).toFixed(1)+'" y1="'+GP+'" x2="'+gtx(0).toFixed(1)+'" y2="'+(GH-GP)+'" stroke="#475569" stroke-width="1.5"/>'
              +'<text x="'+(GW-GP+8)+'" y="'+(gty(0)+4).toFixed(1)+'" fill="#475569" font-size="12" font-style="italic">x</text>'
              +'<text x="'+(gtx(0)+5).toFixed(1)+'" y="'+(GP-4)+'" fill="#475569" font-size="12" font-style="italic">y</text>'
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
        const gttl=sp.title?'<text x="'+(GW/2)+'" y="'+(GH-4)+'" fill="#64748b" font-size="11" text-anchor="middle">'+esc2(String(sp.title))+'</text>':''
        return '<div class="mb-graph" style="margin:12px 0;border-radius:10px;overflow:hidden;border:1px solid rgba(99,102,241,0.3);display:inline-block">'
          +'<svg width="'+GW+'" height="'+GH+'" viewBox="0 0 '+GW+' '+GH+'" xmlns="http://www.w3.org/2000/svg" style="background:#fff;display:block">'+gsvg+gttl+'</svg></div>'
      }
    }catch(_e){return ''}
    return ''
  }

  // ── Convertit texte + [GRAPH:] en HTML ──────────────────────────
  const textToHtml = (rawText: string): string => {
    const GTAG='[GRAPH:'
    const parts:string[]=[]
    let gp=0
    let gIdx=0
    while(gp<rawText.length){
      const gi=rawText.indexOf(GTAG,gp)
      if(gi===-1){parts.push(rawText.slice(gp).split('\n').map(line2html).join('\n'));break}
      if(gi>gp)parts.push(rawText.slice(gp,gi).split('\n').map(line2html).join('\n'))
      const jgs=rawText.indexOf('{',gi+GTAG.length)
      if(jgs===-1){parts.push(rawText.slice(gi).split('\n').map(line2html).join('\n'));break}
      let gd=0,gjj=jgs
      while(gjj<rawText.length){if(rawText[gjj]==='{')gd++;else if(rawText[gjj]==='}'){gd--;if(gd===0)break};gjj++}
      const gcb=rawText.indexOf(']',gjj)
      const captured=graphImages[gIdx]
      gIdx++
      if(captured){
        parts.push('<div class="mb-graph" style="margin:12px 0;text-align:center"><img src="'+captured+'" style="max-width:100%;display:block;margin:0 auto;border-radius:10px;border:1px solid #e5e7eb"/></div>')
      } else {
        const svg=graphToSvg(rawText.slice(jgs,gjj+1))
        parts.push(svg||'<div style="padding:8px 14px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:8px;font-size:11px;color:#fcd34d;margin:8px 0">📊 Figure mathématique</div>')
      }
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
    html{background:#ffffff}
    body{
      font-family:'Inter','Segoe UI',system-ui,sans-serif;
      background:#ffffff;color:#1f2937;
      font-size:13.5px;line-height:1.8;
      -webkit-print-color-adjust:exact;
      print-color-adjust:exact;
    }
    .wrap{max-width:860px;margin:0 auto;padding:32px 40px 80px;background:#ffffff}
    .mb-graph{break-inside:avoid;page-break-inside:avoid}
    .mb-graph svg{max-width:100%;height:auto}

    /* BARRE D'IMPRESSION */
    .print-bar{
      position:sticky;top:0;z-index:99;
      background:#ffffff;border-bottom:1px solid #e5e7eb;
      padding:10px 0 14px;margin-bottom:20px;
      display:flex;align-items:center;gap:12px;
    }
    .print-btn{
      background:linear-gradient(135deg,#6366f1,#8b5cf6);
      color:white;border:none;border-radius:8px;
      padding:10px 24px;font-size:14px;font-weight:700;
      cursor:pointer;font-family:inherit;
    }
    .print-hint{font-size:11.5px;color:#94a3b8;max-width:500px;line-height:1.5}

    /* TITRE */
    .doc-title{
      background:linear-gradient(135deg,#312e81,#5b21b6);
      border-radius:12px;
      padding:22px 28px;margin-bottom:28px;text-align:center;
    }
    .doc-title h1{font-size:20px;font-weight:900;color:#fff;margin-bottom:6px}
    .doc-title .sub{color:#c7d2fe;font-size:12px}

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
      background:#eff6ff;border-left:3px solid #3b82f6;
      border-radius:0 6px 6px 0;padding:10px 14px;
      color:#1e3a8a;font-size:12.5px;margin:8px 0;
    }

    /* ÉTAPES */
    .step{
      padding:5px 12px 5px 26px;margin:3px 0;
      color:#1f2937;font-size:12.5px;position:relative;
    }
    .step::before{content:'→';position:absolute;left:8px;color:#6366f1;font-weight:900}

    /* RÉSULTAT */
    .result-box{
      border:2px solid #10b981;background:#ecfdf5;
      border-radius:8px;padding:12px 18px;margin:14px 0;
      color:#065f46;font-weight:700;font-size:13.5px;
    }
    .result-inline{
      background:#ecfdf5;border:1px solid #10b981;
      border-radius:6px;padding:8px 14px;
      color:#065f46;font-weight:700;margin:8px 0;
    }

    /* BARÈME */
    .bareme{
      background:#f5f3ff;border:1px solid #ddd6fe;border-radius:6px;
      padding:7px 14px;color:#5b21b6;font-size:12px;margin:6px 0;
    }

    /* ERREUR */
    .err{
      background:#fef2f2;border-left:3px solid #ef4444;
      border-radius:0 6px 6px 0;padding:8px 14px;
      color:#991b1b;font-size:12px;margin:6px 0;
    }

    /* ASTUCE / TIP */
    .tip-line,.tip-box{
      background:#ecfeff;border-left:3px solid #06b6d4;
      border-radius:0 6px 6px 0;padding:8px 14px;
      color:#155e75;font-size:12px;margin:6px 0;
    }

    /* ANALYSE */
    .analysis{
      background:#f8fafc;border:1px solid #eef2f7;border-radius:5px;
      padding:5px 12px;margin:3px 0;font-size:12.5px;color:#334155;
    }

    /* BULLET / LISTE */
    .bullet{
      padding:3px 0 3px 20px;color:#374151;
      font-size:12.5px;position:relative;
    }
    .bullet::before{content:'›';position:absolute;left:6px;color:#6366f1;font-weight:700}

    p{color:#1f2937;font-size:12.5px;margin:4px 0}
    hr{border:0;border-top:1px solid #e5e7eb;margin:14px 0}
    strong{color:#0f172a;font-weight:700}
    code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-family:monospace;font-size:.9em;color:#334155}
    .spacer{height:6px}

    /* RÉPONSES ÉLÈVE */
    .answers-block{
      background:#eff6ff;border:1px solid #bfdbfe;
      border-radius:10px;padding:14px 18px;margin-bottom:24px;
    }
    .answers-block summary{
      font-weight:700;color:#1d4ed8;cursor:pointer;
      font-size:13px;margin-bottom:8px;
    }
    .answers-block pre{
      white-space:pre-wrap;font-family:inherit;
      font-size:12px;color:#334155;line-height:1.7;
    }

    /* FOOTER */
    .footer{
      margin-top:48px;padding-top:12px;
      border-top:1px solid #e5e7eb;
      text-align:center;color:#94a3b8;font-size:10.5px;
    }

    @media print{
      .print-bar{display:none!important}
      .wrap{padding:12px 20px}
      .mb-graph{page-break-inside:avoid}
      svg{max-width:100%!important}
    }
  `

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Correction — ${esc(exam.title)}</title>
<style>${css}
${MB_VEC_CSS}</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
</head>
<body>
<div class="wrap">

  <div class="print-bar">
    <button class="print-btn" onclick="telechargerPDF()">⬇ Télécharger PDF couleur</button>
    <button class="print-btn" onclick="window.print()" style="background:rgba(255,255,255,.08);color:#cbd5e1">🖨 Imprimer</button>
    <span class="print-hint">PDF couleur (graphiques inclus) ou impression. En impression → activez <strong style="color:rgba(255,255,255,.6)">« Couleurs de fond »</strong></span>
  </div>

  <div class="doc-title">
    <div style="font-size:14px;font-weight:800;letter-spacing:0.04em;color:#818cf8">MATHBAC.AI</div>
    <div style="font-size:11px;color:#6366f1;margin-bottom:10px"><a href="http://app.mathsbac.com" style="color:#6366f1;text-decoration:none">http://app.mathsbac.com</a></div>
    <h1>${esc(exam.title)}</h1>
    <div class="sub">Correction IA détaillée · ${exam.totalPoints}/20 pts · ${new Date().toLocaleDateString('fr-FR')}</div>
  </div>

  ${answersHtml}

  ${bodyHtml}

  <div class="footer">MATHBAC.AI · http://app.mathsbac.com — Correction générée par IA</div>
</div>
<script>
  function telechargerPDF(){
    var bar=document.querySelector('.print-bar'); if(bar)bar.style.display='none';
    var el=document.querySelector('.wrap');
    var opt={margin:[8,8,8,8],filename:'MathBac-correction.pdf',image:{type:'jpeg',quality:0.95},
      html2canvas:{scale:2,backgroundColor:'#ffffff',useCORS:true,logging:false},
      jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},pagebreak:{mode:['css','legacy'],avoid:'.mb-graph'}};
    if(typeof html2pdf==='undefined'){ alert('Chargement en cours, réessayez dans 1 seconde.'); if(bar)bar.style.display=''; return; }
    html2pdf().set(opt).from(el).save().then(function(){ if(bar)bar.style.display=''; });
  }
  ${autoDownload ? "window.addEventListener('load',function(){setTimeout(telechargerPDF,700)});" : ''}
</script>
</body>
</html>`
}

// ── Capture des graphiques AFFICHÉS à l'écran → images PNG (rendu identique à l'écran) ──
function svgToPng(svg: SVGElement): Promise<string> {
  return new Promise((resolve) => {
    try {
      const rect = svg.getBoundingClientRect()
      const w = Math.max(Math.round(rect.width), 320), h = Math.max(Math.round(rect.height), 240)
      const clone = svg.cloneNode(true) as SVGElement
      clone.setAttribute('width', String(w))
      clone.setAttribute('height', String(h))
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      const xml = new XMLSerializer().serializeToString(clone)
      const svg64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(xml)))
      const img = new Image()
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = w * 2; canvas.height = h * 2
          const ctx = canvas.getContext('2d')!
          ctx.scale(2, 2)
          ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h)
          ctx.drawImage(img, 0, 0, w, h)
          resolve(canvas.toDataURL('image/png'))
        } catch { resolve('') }
      }
      img.onerror = () => resolve('')
      img.src = svg64
    } catch { resolve('') }
  })
}

async function captureGraphsInOrder(container: HTMLElement | null): Promise<string[]> {
  if (!container || typeof document === 'undefined') return []
  // Capture par marqueur : 1 entrée par [GRAPH:] dans l'ordre du texte (alignement garanti)
  const wrappers = Array.from(container.querySelectorAll('[data-mbgraph]')) as HTMLElement[]
  wrappers.sort((a, b) => Number(a.getAttribute('data-mbgraph')) - Number(b.getAttribute('data-mbgraph')))
  const out: string[] = []
  const P = (window as any).Plotly
  for (const w of wrappers) {
    try {
      const plot = w.querySelector('.js-plotly-plot') as HTMLElement | null
      const svg = w.querySelector('svg') as SVGElement | null
      if (plot && P && typeof P.toImage === 'function') {
        const ww = plot.offsetWidth || 700, hh = plot.offsetHeight || 400
        out.push(await P.toImage(plot, { format: 'png', width: ww, height: hh, scale: 2 }))
      } else if (svg) {
        out.push(await svgToPng(svg as unknown as SVGElement))
      } else {
        // Type non capturable (ascii / table) → image vide, le fallback graphToSvg prendra le relais
        out.push('')
      }
    } catch {
      out.push('')
    }
  }
  return out
}

function openCorrectionPdf(
  exam: GeneratedExam,
  correctionText: string,
  studentAnswers: string,
  autoDownload = false,
  graphImages: string[] = []
) {
  const html = buildCorrectionHtml(exam, correctionText, studentAnswers, autoDownload, graphImages)
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
  const inl = (s: string) => vecToHtml(escVecHtml(s)).replace(/\*\*(.+?)\*\*/g,'<strong style="color:#e2e8f0;font-weight:700">$1</strong>')
  return (
    <div style={{lineHeight:1.85,color:'rgba(255,255,255,0.8)',fontSize:14}}>
      {text.split('\n').map((ln,i)=>{
        if(!ln.trim()) return <div key={i} style={{height:6}}/>
        if(ln.startsWith('## ')) return <h3 key={i} style={{fontSize:15,fontWeight:700,color:'#a5b4fc',marginTop:20,marginBottom:8,borderBottom:'1px solid rgba(99,102,241,0.2)',paddingBottom:6}} dangerouslySetInnerHTML={{__html:inl(ln.slice(3))}}/>
        if(ln.startsWith('### ')) return <h4 key={i} style={{fontSize:14,fontWeight:700,color:'#e2e8f0',marginTop:14,marginBottom:6}} dangerouslySetInnerHTML={{__html:inl(ln.slice(4))}}/>
        if(ln.startsWith('- ')) return <p key={i} style={{margin:'3px 0',paddingLeft:16,position:'relative',fontSize:13,color:'rgba(255,255,255,0.75)'}}>
          <span style={{position:'absolute',left:0,color:'#6366f1'}}>›</span><span dangerouslySetInnerHTML={{__html:inl(ln.slice(2))}}/>
        </p>
        if(ln.match(/^\d+\.\s/)) return <p key={i} style={{margin:'4px 0',paddingLeft:22,fontSize:13,position:'relative'}}>
          <strong style={{position:'absolute',left:0,color:'#6366f1'}}>{ln.split(/\.\s/)[0]}.</strong>
          <span dangerouslySetInnerHTML={{__html:inl(ln.replace(/^\d+\.\s/,''))}}/>
        </p>
        return <p key={i} style={{margin:'2px 0',fontSize:13}} dangerouslySetInnerHTML={{__html:inl(ln)}}/>
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
  key:string; label:string; color:string; icon:string
  chapitres:{slug:string;titre:string;badge:string;desc:string}[]
}> = {

  // ─── Terminale Générale — 13 chapitres (source: /bac-france/terminale-generale/[slug]) ───
  terminale: { key:'terminale', label:'Terminale Générale — Spécialité Maths', color:'#f59e0b', icon:'🎓',
    chapitres: [
      { slug:'suites-limites',         titre:'Suites — Limites et Convergence',          badge:'Algèbre',   desc:'Limites de suites, suites bornées monotones, suites récurrentes definies par recurrence, comparaison, raisonnement par recurrence avance.' },
      { slug:'nombres-complexes',       titre:'Nombres complexes',                         badge:'Algèbre',   desc:'Formes algebrique, trigonometrique et exponentielle, module, argument, formule de Moivre, racines n-iemes de l unite, equations dans C.' },
      { slug:'limites-continuite',      titre:'Limites et Continuite',                     badge:'Analyse',   desc:'Limites finies et infinies, operations sur les limites, formes indeterminees, continuite sur un intervalle, TVI, asymptotes.' },
      { slug:'derivation-avancee',      titre:'Derivation avancee',                        badge:'Analyse',   desc:'Derivees composees f(g(x)), convexite et inflexion, tangente, etude complete de fonctions, extrema globaux et locaux, inequalites.' },
      { slug:'logarithme-neperien',     titre:'Logarithme neperien',                       badge:'Analyse',   desc:'Definition comme primitive de 1/x, proprietes algebriques, derivee de ln(u), etude de fonctions, equations, croissances comparees.' },
      { slug:'integration',             titre:'Integration',                                badge:'Analyse',   desc:'Primitives usuelles, integrale definie, relation de Chasles, IPP, calcul d aires entre courbes, valeur moyenne, suites d integrales.' },
      { slug:'equations-differentielles', titre:'Equations differentielles',               badge:'Analyse',   desc:'y prime = ay solution C*exp(ax), y prime = ay+b, condition initiale, modeles : circuits RC, refroidissement Newton, croissance.' },
      { slug:'vecteurs-espace',         titre:'Vecteurs et Reperes dans l espace',         badge:'Geometrie', desc:'Vecteurs 3D, combinaison lineaire, coplanarité, produit scalaire 3D, orthogonalite, distances et angles dans l espace.' },
      { slug:'droites-plans',           titre:'Droites et Plans — Equations cartesiennes',  badge:'Geometrie', desc:'Vecteur normal, equation ax+by+cz+d=0, representation parametrique de droite, positions relatives, distance d un point a un plan.' },
      { slug:'loi-normale',             titre:'Loi normale (Gauss)',                        badge:'Probas',    desc:'Loi normale N(mu, sigma2), standardisation Z=(X-mu)/sigma, intervalles mu+/-k*sigma, approximation de la loi binomiale, TCL.' },
      { slug:'loi-binomiale',           titre:'Loi binomiale B(n,p)',                       badge:'Probas',    desc:'Schema de Bernoulli, P(X=k)=C(n,k)*p^k*(1-p)^(n-k), esperance np, variance np(1-p), inegalite de Bienayme-Tchebychev.' },
      { slug:'echantillonnage',         titre:'Echantillonnage et Estimation',              badge:'Probas',    desc:'Fluctuation d echantillonnage, intervalle de confiance a 95%, estimation d une frequence, taille d echantillon minimale.' },
      { slug:'python-avance',           titre:'Python avance et Algorithmique',             badge:'Info',      desc:'Recursivite, matrices comme listes de listes, algorithmes de tri, dichotomie, simulation de lois de probabilites, methode d Euler.' },
    ],
  },

  // ─── Première Spécialité — 10 chapitres (source: /bac-france/premiere/[slug]) ───
  premiere: { key:'premiere', label:'Premiere Specialite Mathematiques', color:'#4f6ef7', icon:'📗',
    chapitres: [
      { slug:'suites-numeriques',   titre:'Suites numeriques',                    badge:'Algebre',  desc:'Formule explicite, suites definies par recurrence, suites arithmetiques et geometriques, raisonnement par recurrence, monotonie, sommes.' },
      { slug:'second-degre',         titre:'Second degre',                          badge:'Algebre',  desc:'Forme canonique, forme factorisee, discriminant delta, resolution ax2+bx+c=0, signe du trinome, somme et produit des racines (Viete).' },
      { slug:'derivation',           titre:'Derivation',                            badge:'Analyse',  desc:'Taux d accroissement, nombre derive, derivees usuelles, regles (somme, produit, quotient, composee), tangente, tableau de variations.' },
      { slug:'exponentielle',        titre:'Fonction exponentielle',                badge:'Analyse',  desc:'Definition (f prime=f, f(0)=1), proprietes e^(a+b)=e^a*e^b, etude complete de exp(x), croissances comparees, equations avec exp.' },
      { slug:'trigonometrie',        titre:'Fonctions trigonometriques',            badge:'Analyse',  desc:'Cercle trigonometrique, radians, cos2x+sin2x=1, valeurs remarquables, periodicite, variations, formules d addition, equations.' },
      { slug:'produit-scalaire',     titre:'Produit scalaire',                      badge:'Geometrie',desc:'3 definitions (projection, cosinus, coordonnees), formule d Al-Kashi, orthogonalite, applications : perpendicularite, angles, distances.' },
      { slug:'geometrie-reperee',    titre:'Geometrie reperee',                     badge:'Geometrie',desc:'Equations de droite (reduite, cartesienne), vecteur directeur et normal, equation du cercle, positions relatives, intersections.' },
      { slug:'probas-conditionnelles', titre:'Probabilites conditionnelles',        badge:'Probas',   desc:'P_A(B)=P(A∩B)/P(A), probabilites composees, arbres ponderes, partition de l univers, probabilites totales, independance.' },
      { slug:'variables-aleatoires',   titre:'Variables aleatoires',               badge:'Probas',   desc:'Loi de probabilite, esperance E(X), variance V(X)=E(X2)-[E(X)]2, ecart-type sigma(X), loi binomiale B(n,p).' },
      { slug:'python-algorithmes',   titre:'Python et algorithmes',                 badge:'Info',     desc:'Listes (creation, parcours, comprehension, append/insert), fonctions (def, return), boucles, suites par algorithme, dichotomie.' },
    ],
  },

  // ─── Terminale Techno — 13 chapitres (source: /bac-france/terminale-techno/[slug]) ───
  techno: { key:'techno', label:'Terminale STMG / STI2D et STL', color:'#10b981', icon:'📊',
    chapitres: [
      { slug:'stmg-fonctions',   titre:'STMG — Fonctions (approfondissement)',   badge:'STMG',     desc:'Fonctions affines, second degre (forme canonique), exponentielle exp(x), croissance comparee, modeles economiques (cout, recette, benefice).' },
      { slug:'stmg-suites',      titre:'STMG — Suites numeriques',               badge:'STMG',     desc:'Suites arithmetiques et geometriques, formules explicites et recurrentes, sommes de termes, interets simples et composes, amortissements.' },
      { slug:'stmg-stats-2var',  titre:'STMG — Statistiques a 2 variables',     badge:'STMG',     desc:'Nuage de points, point moyen G, ajustement affine (moindres carres), coefficient de correlation r, previsions (interpolation, extrapolation).' },
      { slug:'stmg-probas',      titre:'STMG — Probabilites conditionnelles',   badge:'STMG',     desc:'P_A(B), probabilites totales, arbres ponderes, independance, variable aleatoire, esperance E(X), loi binomiale B(n,p).' },
      { slug:'stmg-pourcentages',titre:'STMG — Pourcentages et Evolutions',     badge:'STMG',     desc:'Taux d evolution, coefficients multiplicateurs, evolutions successives et reciproques, echelles et conversions.' },
      { slug:'stmg-financier',   titre:'STMG — Calculs financiers',             badge:'STMG',     desc:'Interets simples et composes, valeur actuelle et acquise, amortissements (lineaire, degressif), rentes et mensualites d emprunt.' },
      { slug:'sti-suites',       titre:'STI2D — Suites et Modelisation',        badge:'STI2D',    desc:'Suites arithmetiques et geometriques, modeles discrets (croissance exponentielle, decroissance), algorithme de seuil.' },
      { slug:'sti-exp-ln',       titre:'STI2D — Exponentielle et Logarithme',   badge:'STI2D',    desc:'Fonction exp(x) : proprietes, equations. Logarithme ln : primitive de 1/x, proprietes algebriques, resolution, croissances comparees. Modelisations physiques.' },
      { slug:'sti-integration',  titre:'STI2D — Integration',                   badge:'STI2D',    desc:'Primitives usuelles, integrale definie (aire, relation de Chasles), valeur moyenne (1/(b-a))*integrale_f, applications : aires, centre d inertie, travail.' },
      { slug:'sti-probas-cont',  titre:'STI2D — Probabilites continues',        badge:'STI2D',    desc:'Loi uniforme sur [a;b] (densite, esperance), loi normale N(mu,sigma2), standardisation Z=(X-mu)/sigma, intervalles, approximation binomiale.' },
      { slug:'sti-stat-inf',     titre:'STI2D — Statistiques inferentielles',   badge:'STI2D',    desc:'Fluctuation d echantillonnage, intervalle de confiance 95% [f+/-1/sqrt(n)], estimation d une proportion, taille d echantillon.' },
      { slug:'sti-geometrie',    titre:'STI2D — Geometrie dans l espace',       badge:'STI2D',    desc:'Vecteurs de l espace, coplanarité, equation cartesienne du plan ax+by+cz+d=0, representation parametrique d une droite, intersection, orthogonalite.' },
      { slug:'sti-eq-diff',      titre:'STI2D — Equations differentielles',     badge:'STI2D',    desc:'y prime = ay solution C*exp(ax) ; y prime = ay+b ; condition initiale ; circuits RC, refroidissement Newton, croissance bacterienne. IPP, changement de variable.' },
    ],
  },

  // ─── Option Maths Expertes — 8 chapitres (source: /bac-france/terminale-expertes/[slug]) ───
  expertes: { key:'expertes', label:'Option Maths Expertes — Terminale', color:'#8b5cf6', icon:'★',
    chapitres: [
      { slug:'divisibilite-z',      titre:'Divisibilite dans Z',                   badge:'Arithmetique', desc:'Multiples et diviseurs dans Z, division euclidienne (unicite), congruences (addition, multiplication), criteres de divisibilite, calculs modulaires.' },
      { slug:'pgcd-theoremes',      titre:'PGCD et Theoremes fondamentaux',         badge:'Arithmetique', desc:'PGCD par algorithme d Euclide, theoreme de Bezout (au+bv=PGCD), theoreme de Gauss, equations diophantiennes ax+by=c dans Z.' },
      { slug:'nombres-premiers',    titre:'Nombres premiers',                        badge:'Arithmetique', desc:'Definition, crible d Eratosthene, decomposition unique en facteurs premiers, petit theoreme de Fermat a^(p-1)=1[p], applications cryptographiques.' },
      { slug:'complexes-formes',    titre:'Formes trig. et exponentielles',          badge:'Complexes',   desc:'Module, argument, forme trigonometrique z=r(cos+isin), forme exponentielle r*exp(i*theta), formule d Euler, De Moivre, racines n-iemes de l unite.' },
      { slug:'polynomes-complexes', titre:'Equations polynomiales dans C',           badge:'Complexes',   desc:'Second degre dans C (delta<0), factorisation z^n-a^n, theoreme fondamental de l algebre (admis), factorisation par (z-a), relations de Viete.' },
      { slug:'theorie-graphes',     titre:'Theorie des graphes',                     badge:'Graphes',     desc:'Vocabulaire (sommets, aretes, degres), graphes orientes et non orientes, chaines euleriennes, matrice d adjacence, graphes probabilistes.' },
      { slug:'calcul-matriciel',    titre:'Calcul matriciel',                         badge:'Matrices',   desc:'Matrices carrees ordre 2 et 3, addition, multiplication, matrice identite I, matrice inverse A inverse (ordre 2), puissances M^n, transformations.' },
      { slug:'chaines-markov',      titre:'Chaines de Markov',                       badge:'Graphes',     desc:'Matrice de transition, evolution P(n+1)=P(n)*M, calcul P(n)=P0*M^n, etat stable pi=pi*M, convergence vers l etat stationnaire.' },
    ],
  },

  // ─── Seconde Générale — 7 thèmes (source: /bac-france/maths/seconde) ───
  seconde: { key:'seconde', label:'Seconde Générale — Mathématiques', color:'#10b981', icon:'📘',
    chapitres: [
      { slug:'python-seconde',       titre:'Algorithmique & Python',               badge:'Info',      desc:'Variables, types, conditions if/elif/else, boucles for/while, fonctions def/return, listes, algorithmes classiques : tri selection, dichotomie, seuil.' },
      { slug:'nombres-calculs',      titre:'Nombres & Calculs',                    badge:'Algèbre',   desc:'Puissances et proprietes (a^m*a^n=a^(m+n)), racines carrees (simplification, rationalisation), PGCD par Euclide, PPCM, ensembles N Z Q R, notation scientifique.' },
      { slug:'intervalles-inequations', titre:'Intervalles, Inégalités & Inéquations', badge:'Analyse', desc:'Notations intervalles, proprietes des inegalites (changement de sens), resolution inéquations 1er degre, valeur absolue |x-a|<r, encadrements.' },
      { slug:'calcul-litteral',      titre:'Calcul Littéral',                      badge:'Algèbre',   desc:'Identites remarquables (a+b)^2 (a-b)^2 (a+b)(a-b), factorisation, produit nul, fractions algebriques, simplification, equations du 2nd degre, discriminant.' },
      { slug:'fonctions-seconde',    titre:'Fonctions — Variations & Signes',      badge:'Analyse',   desc:'Image, antecedent, tableau de variations, extremums, fonctions de reference (x^2, 1/x, racine), parite, resolutions graphiques, tableau de signes.' },
      { slug:'geometrie-vecteurs',   titre:'Géométrie — Vecteurs & Droites',       badge:'Géométrie', desc:'Coordonnees de vecteurs, operations, colinearite (determinant), equations de droites, coefficient directeur, positions relatives, perpendiculaire, Thalès, Pythagore.' },
      { slug:'stats-probas-seconde', titre:'Statistiques & Probabilités',          badge:'Stats',     desc:'Moyenne, mediane, quartiles, ecart-type, taux d evolution, coefficient multiplicateur, probabilites (equiprobabilite, complementaire, union), intervalle de fluctuation.' },
    ],
  },

}
// ════════════════════════════════════════════════════════════════════
//  PHYSIQUE-CHIMIE FRANCE — Configs, Archives et Chapitres
//  Sources : sujetdebac.fr + apmep.fr (vérifié dans examens-france)
//  Sections : Terminale + Première + STI2D + ST2S
// ════════════════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════════════════
//  INFORMATIQUE NSI FRANCE
// ══════════════════════════════════════════════════════════════════════


// ════════════════════════════════════════════════════════════════════
//  FRANÇAIS FRANCE — Simulation IA
//  3 sections : Terminale (Philosophie EAF) · Première (EAF) · Seconde
//  Sources : sujetdebac.fr — URLs vérifiées
// ════════════════════════════════════════════════════════════════════

const SECTION_CONFIGS_FRANCAIS_FR = [
  { key:'terminale-francais', label:'Terminale — Philosophie (EAF)', color:'#8b5cf6', icon:'🧠',
    themes:['Dissertation philosophique','Explication de texte','La conscience','La liberté','La justice','L\'art','La technique','Le bonheur'] },
  { key:'premiere-francais',  label:'Première — EAF (Écrit + Oral)',  color:'#10b981', icon:'📗',
    themes:['Commentaire composé','Dissertation littéraire','Analyse linéaire','Grand Oral','Littérature d\'idées','Poésie XIXe-XXIe','Roman','Théâtre'] },
  { key:'seconde-francais',   label:'Seconde — Français',              color:'#ec4899', icon:'📘',
    themes:['Poésie du Moyen Âge au XVIIIe','Littérature d\'idées et Presse','Roman et Récit','Théâtre','Figures de style','Argumentation'] },
]

const ARCHIVES_FRANCAIS_FR: Archive[] = [
  // ── Terminale Philosophie — Métropole (sujetdebac.fr, URLs vérifiées 200 OK) ─
  { id:'tphilo-2025-m1', year:2025, session:'Terminale · Philosophie · Métropole · 16 juin 2025 (Série Générale)',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2025/philosophie-2025-metropole-sujet-officiel.pdf`,
    themes:['Dissertation philosophique','Explication de texte','Liberté et technique','Coef. 8'] },
  { id:'tphilo-2025-m2', year:2025, session:'Terminale · Philosophie · Métropole Secours · juin 2025',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2025/philosophie-2025-metropole-secours-sujet-officiel.pdf`,
    themes:['Dissertation','Explication de texte','Philosophie morale'] },
  { id:'tphilo-2025-s1', year:2025, session:'Terminale · Philosophie · Métropole Remplacement · sept. 2025',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2025/philosophie-2025-metropole-remplacement-sujet-officiel.pdf`,
    themes:['Dissertation','Explication de texte','Philosophie politique'] },
  { id:'tphilo-2024-m1', year:2024, session:'Terminale · Philosophie · Métropole · juin 2024 (Série Générale)',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2024/philosophie-2024-metropole-sujet-officiel.pdf`,
    themes:['Le travail aliène-t-il ?','Marx · Hegel · Arendt','Explication de texte'] },
  { id:'tphilo-2024-s1', year:2024, session:'Terminale · Philosophie · Métropole Remplacement · sept. 2024',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2024/philosophie-2024-metropole-remplacement-sujet-officiel.pdf`,
    themes:['Dissertation','Explication de texte'] },
  { id:'tphilo-2023-m1', year:2023, session:'Terminale · Philosophie · Métropole · juin 2023 (Série Générale)',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2023/philosophie-2023-metropole-sujet-officiel.pdf`,
    themes:['L\'art et la réalité','Platon · Hegel · Heidegger','Explication de texte'] },
  { id:'tphilo-2023-s1', year:2023, session:'Terminale · Philosophie · Métropole Remplacement · sept. 2023',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2023/philosophie-2023-metropole-remplacement-sujet-officiel.pdf`,
    themes:['Dissertation','Explication de texte'] },
  { id:'tphilo-2022-m1', year:2022, session:'Terminale · Philosophie · Métropole · juin 2022 (Série Générale)',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2022/philosophie-2022-metropole-sujet-officiel.pdf`,
    themes:['Liberté et déterminisme','Sartre · Spinoza · Marx','Explication de texte'] },
  { id:'tphilo-2022-s1', year:2022, session:'Terminale · Philosophie · Métropole Remplacement · sept. 2022',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2022/philosophie-2022-metropole-remplacement-sujet-officiel.pdf`,
    themes:['Dissertation','Explication de texte'] },
  { id:'tphilo-2021-m1', year:2021, session:'Terminale · Philosophie · Métropole · juin 2021 (Série Générale)',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2021/philosophie-2021-metropole-sujet-officiel.pdf`,
    themes:['Le bonheur est-il affaire privée ?','Épicure · Stoïciens · Kant','Explication de texte'] },
  { id:'tphilo-2021-s1', year:2021, session:'Terminale · Philosophie · Métropole Remplacement · sept. 2021',
    section:'Terminale — Philosophie', sectionKey:'terminale-francais',
    color:'#8b5cf6', icon:'🧠',
    url:`${SD}/2021/philosophie-2021-metropole-remplacement-sujet-officiel.pdf`,
    themes:['Dissertation','Explication de texte'] },
  // ── Première — EAF (pas d'examen officiel publié avant 2027 pour le programme 2021) ─
  // ── Seconde — pas d'examen officiel ──────────────────────────────────────────────
]

const CHAPITRES_FRANCAIS_FR: Record<string, {
  key: string; label: string; color: string; icon: string
  chapitres: { slug: string; titre: string; badge: string; desc: string }[]
}> = {

  'terminale-francais': {
    key:'terminale-francais', label:'Terminale — Philosophie (EAF)', color:'#8b5cf6', icon:'🧠',
    chapitres: [
      { slug:'conscience-sujet',    titre:'Le Sujet — Conscience & Inconscient', badge:'Philo Terminale',
        desc:'Conscience de soi, mauvaise foi (Sartre), inconscient freudien, psychanalyse, identité personnelle. Descartes, Freud, Nietzsche, Hegel.' },
      { slug:'liberte-determinisme',titre:'La Liberté & le Déterminisme',        badge:'Philo Terminale',
        desc:'Liberté comme valeur morale, libre arbitre, déterminisme naturel et social, responsabilité. Spinoza, Kant, Sartre, Marx, Schopenhauer.' },
      { slug:'art-technique',        titre:'L\'Art & la Technique',               badge:'Philo Terminale',
        desc:'Statut de l\'œuvre d\'art, mimèsis et création, technique comme extension humaine, aliénation par le travail. Platon, Hegel, Heidegger, Walter Benjamin.' },
      { slug:'justice-politique',   titre:'La Justice & le Politique',           badge:'Philo Terminale',
        desc:'Fondements de la justice, contrat social, légitimité du pouvoir, désobéissance civile. Platon, Rousseau, Rawls, Hobbes, Locke.' },
      { slug:'verite-raison',       titre:'La Vérité & la Raison',               badge:'Philo Terminale',
        desc:'Vérité, opinion et certitude. Méthode scientifique. Relativisme. Foi et raison. Descartes, Kant, Popper, Bachelard, Pascal.' },
      { slug:'bonheur-morale',      titre:'Le Bonheur & la Morale',              badge:'Philo Terminale',
        desc:'Bonheur et plaisir, eudémonisme, devoir moral, impératif catégorique. Épicure, Stoïciens, Kant, Nietzsche, Aristote.' },
      { slug:'methode-dissert',     titre:'Méthode Dissertation Philosophique',  badge:'Méthode EAF',
        desc:'Structure dissertation philo (problématique, thèse, antithèse, synthèse). Introduction, transitions, conclusion. Traitement du sujet. Coef. 8 · 4h.' },
      { slug:'methode-explication', titre:'Méthode Explication de Texte',        badge:'Méthode EAF',
        desc:'Analyser un texte philosophique : thèse, structure, procédés argumentatifs. Introduction, mouvements, conclusion. Coef. 8 · 4h.' },
    ]
  },

  'premiere-francais': {
    key:'premiere-francais', label:'Première — EAF (Écrit + Oral)', color:'#10b981', icon:'📗',
    chapitres: [
      { slug:'litterature-idees',   titre:'Littérature d\'idées XVIe-XVIIIe',   badge:'EAF Première',
        desc:'La Boétie (servitude volontaire), Fontenelle (vulgarisation), Graffigny (regard étranger). Humanisme, Lumières, argumentation directe et indirecte.' },
      { slug:'poesie-xixe-xxie',   titre:'Poésie XIXe-XXIe siècle',             badge:'EAF Première',
        desc:'Rimbaud (Cahiers de Douai · Émancipations créatrices), Ponge (atelier du poète), Hélène Dorion (nature et intime). Versification, analyse linéaire.' },
      { slug:'roman-moyen-xxie',   titre:'Roman du Moyen Âge au XXIe siècle',   badge:'EAF Première',
        desc:'Manon Lescaut (Prévost · personnages en marge), La Peau de chagrin (Balzac · énergie et destruction), Sido (Colette · célébration du monde).' },
      { slug:'theatre-premier',    titre:'Théâtre XVIIe-XXIe siècle',           badge:'EAF Première',
        desc:'Le Menteur (Corneille · mensonge et comédie), On ne badine pas (Musset · jeux du cœur), Pour un oui ou pour un non (Sarraute · théâtre et dispute).' },
      { slug:'commentaire-methode',titre:'Commentaire Composé — Méthode',       badge:'Méthode EAF',
        desc:'Structure du commentaire : introduction (problématique, plan), 2-3 axes thématiques, citation+procédé+effet, conclusion+ouverture. Coef. 5 · 4h.' },
      { slug:'dissertation-methode',titre:'Dissertation Littéraire — Méthode',  badge:'Méthode EAF',
        desc:'Plan dialectique ou thématique. Argument+exemple+analyse. Introduction avec problématique. Transition. Conclusion. Coef. 5 · 4h.' },
      { slug:'analyse-lineaire',   titre:'Analyse Linéaire — Méthode',          badge:'Méthode EAF',
        desc:'Mouvements du texte. Procédés stylistiques. Problématique littéraire. Introduction et conclusion. Grand Oral : présentation 10 min + entretien 10 min.' },
    ]
  },

  'seconde-francais': {
    key:'seconde-francais', label:'Seconde — Français', color:'#ec4899', icon:'📘',
    chapitres: [
      { slug:'poesie-moyen-age',   titre:'Poésie du Moyen Âge au XVIIIe',       badge:'Seconde',
        desc:'Sonnet pétrarquiste (Du Bellay, Ronsard), ballade médiévale (Villon), fable morale (La Fontaine). Carpe diem, figures de style, versification.' },
      { slug:'litterature-idees-presse', titre:'Littérature d\'idées et Presse', badge:'Seconde',
        desc:'Argumentation directe et indirecte. Genres journalistiques. Voltaire (ironie), Zola (engagement), Hugo (défense des opprimés), Camus (absurde).' },
      { slug:'roman-recit-seconde',titre:'Roman et Récit XVIIIe-XXIe',          badge:'Seconde',
        desc:'Focalisation (interne, externe, omnisciente), discours rapportés (DID, DIL), personnages (plat/rond), réalisme, naturalisme. Balzac, Flaubert, Maupassant.' },
      { slug:'theatre-seconde',    titre:'Théâtre XVIIe-XXIe siècle',           badge:'Seconde',
        desc:'Tragédie (Racine), comédie (Molière), drame romantique (Hugo, Musset), théâtre de l\'absurde (Beckett). 4 types de comique. Catharsis. Stichomythie.' },
      { slug:'figures-style',      titre:'Figures de style — Révision',         badge:'Seconde',
        desc:'Métaphore, comparaison, personnification, hyperbole, antithèse, oxymore, anaphore, chiasme, gradation, allitération, assonance. Méthode d\'analyse.' },
      { slug:'argumentation-seconde', titre:'Argumentation & Essai',            badge:'Seconde',
        desc:'Identifier thèse, arguments, exemples. Convaincre vs. persuader. Concession et réfutation. Plan 2-3 parties. Introduction et conclusion d\'essai.' },
    ]
  },
}

const SECTION_CONFIGS_INFO_FR = [
  { key:'terminale-nsi', label:'Terminale NSI — Spécialité', color:'#8b5cf6', icon:'🎓',
    themes:['Structures de données','Algorithmes & Complexité','Bases de données SQL','POO Python','Réseaux & OS','Récursivité'] },
  { key:'premiere-nsi',  label:'Première NSI — Spécialité',  color:'#06b6d4', icon:'📗',
    themes:['Types construits','Traitement de données','Web & HTTP','Architecture & OS','Algorithmique','Python'] },
  { key:'seconde-snt',   label:'Seconde — SNT',               color:'#10b981', icon:'📘',
    themes:['Internet','Le Web','Réseaux sociaux','Données structurées','Géolocalisation','Photographie numérique','Objets connectés'] },
]

const ARCHIVES_INFO_FR: Archive[] = [
  // ── Terminale NSI (sujetdebac.fr) ───────────────────────────────────
  { id:'tnsi-2025-m1', year:2025, session:'Terminale NSI · Métropole J1 · 17 juin 2025',     section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2025/spe-numerique-informatique-2025-metropole-1-sujet-officiel.pdf',         themes:['Structures de données','SQL avancé','Algorithmes Python','Récursivité'] },
  { id:'tnsi-2025-m2', year:2025, session:'Terminale NSI · Métropole J2 · 18 juin 2025',     section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2025/spe-numerique-informatique-2025-metropole-2-sujet-officiel.pdf',         themes:['Graphes','Bases de données','POO Python','Complexité'] },
  { id:'tnsi-2025-s1', year:2025, session:'Terminale NSI · Remplacement J1 · sept. 2025',    section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2025/spe-numerique-informatique-2025-metropole-1-remplacement-sujet-officiel.pdf', themes:['Piles & Files','SQL','Algorithmes','Réseaux'] },
  { id:'tnsi-2024-m1', year:2024, session:'Terminale NSI · Métropole J1 · 19 juin 2024',     section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2024/spe-numerique-informatique-2024-metropole-1-sujet-officiel.pdf',         themes:['Graphes DFS/BFS','SQL jointures','Classes Python','Tri fusion'] },
  { id:'tnsi-2024-m2', year:2024, session:'Terminale NSI · Métropole J2 · 20 juin 2024',     section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2024/spe-numerique-informatique-2024-metropole-2-sujet-officiel.pdf',         themes:['Arbres binaires','Bases de données','Récursivité','Algorithmique'] },
  { id:'tnsi-2024-s1', year:2024, session:'Terminale NSI · Remplacement · sept. 2024',        section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2024/spe-numerique-informatique-2024-metropole-1-remplacement-sujet-officiel.pdf', themes:['Structures de données','SQL','Python','Réseaux'] },
  { id:'tnsi-2023-m1', year:2023, session:'Terminale NSI · Métropole J1 · 20 mars 2023',     section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2023/spe-numerique-informatique-2023-metropole-1-sujet-officiel.pdf',         themes:['Récursivité & arbres','Bases de données','Tri & complexité','Réseaux'] },
  { id:'tnsi-2023-m2', year:2023, session:'Terminale NSI · Métropole J2 · 21 mars 2023',     section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2023/spe-numerique-informatique-2023-metropole-2-sujet-officiel.pdf',         themes:['Graphes','SQL avancé','POO Python','Algorithmique'] },
  { id:'tnsi-2022-m1', year:2022, session:'Terminale NSI · Métropole J1 · 11 mai 2022',      section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2022/spe-numerique-informatique-2022-metropole-1-sujet-officiel.pdf',         themes:['Piles LIFO','SQL GROUP BY','Dichotomie Python','Réseau & OS'] },
  { id:'tnsi-2022-m2', year:2022, session:'Terminale NSI · Métropole J2 · 12 mai 2022',      section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2022/spe-numerique-informatique-2022-metropole-2-sujet-officiel.pdf',         themes:['Arbres','Bases de données','Algorithmes de tri','Python avancé'] },
  { id:'tnsi-2021-m1', year:2021, session:'Terminale NSI · Métropole J1 · mai 2021',          section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2021/spe-numerique-informatique-2021-metropole-1-sujet-officiel.pdf',         themes:['Récursivité','SQL DDL/DML','Recherche dichotomique','Von Neumann'] },
  { id:'tnsi-2021-m2', year:2021, session:'Terminale NSI · Métropole J2 · mai 2021',          section:'Terminale NSI — Spécialité', sectionKey:'terminale-nsi', color:'#8b5cf6', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2021/spe-numerique-informatique-2021-metropole-2-sujet-officiel.pdf',         themes:['Fibonacci & Hanoï','Bases de données','Tri insertion','Réseaux'] },
  // ── Première NSI — archive vide (pas d'examen officiel) ─────────────
  // ── Seconde SNT — archive vide ──────────────────────────────────────
]

const CHAPITRES_INFO_FR: Record<string, {
  key: string; label: string; color: string; icon: string
  chapitres: { slug: string; titre: string; badge: string; desc: string }[]
}> = {
  'terminale-nsi': {
    key:'terminale-nsi', label:'Terminale NSI — Spécialité', color:'#8b5cf6', icon:'🎓',
    chapitres: [
      { slug:'structures-donnees',    titre:'Structures de données',           badge:'Avancé',      desc:'Piles LIFO, Files FIFO, Arbres binaires, ABR, Graphes — Implémentations Python' },
      { slug:'algorithmes-avances',   titre:'Algorithmes & Complexité',        badge:'Top Bac',     desc:'Tri fusion, Quicksort, DFS/BFS, Dijkstra — Notation Big-O, preuves de terminaison' },
      { slug:'bases-donnees-sql',     titre:'Bases de données SQL',            badge:'Top Bac',     desc:'Modèle relationnel, SELECT/JOIN/GROUP BY/HAVING, normalisation 3NF, sous-requêtes' },
      { slug:'programmation-avancee', titre:'Programmation avancée Python',    badge:'Top Bac',     desc:'Récursivité, POO — Classes/héritage/polymorphisme, encapsulation, méthodes spéciales' },
      { slug:'architecture-reseaux',  titre:'Architecture, OS & Réseaux',      badge:'Système',     desc:'Von Neumann, cycle machine, processus, TCP/IP, HTTP, sécurité web XSS/injection SQL' },
      { slug:'enjeux-numerique',      titre:'Enjeux du numérique',             badge:'Société',     desc:'RGPD, cybersécurité, IA — biais algorithmiques, deepfakes, empreinte carbone' },
      { slug:'projet-nsi-terminale',  titre:'Projet NSI',                      badge:'Obligatoire', desc:'Git, architecture MVC, tests pytest, documentation, présentation soutenance' },
    ]
  },
  'premiere-nsi': {
    key:'premiere-nsi', label:'Première NSI — Spécialité', color:'#06b6d4', icon:'📗',
    chapitres: [
      { slug:'representation-donnees', titre:'Représentation des données',     badge:'Fondamental', desc:'Binaire, hexadécimal, complément à deux, IEEE 754, ASCII, Unicode, UTF-8' },
      { slug:'types-construits',       titre:'Types construits Python',         badge:'Python',      desc:'Listes, tuples, dictionnaires, ensembles, compréhensions, slicing' },
      { slug:'traitement-donnees',     titre:'Traitement de données en tables', badge:'Données',     desc:'CSV, sélection, projection, tri, agrégation, jointure de tables' },
      { slug:'web-interaction',        titre:'Web & Interactions HTTP',         badge:'Web',         desc:'HTML, CSS, JavaScript, DOM, GET/POST, cookies, sessions, API REST' },
      { slug:'architecture-os-1re',    titre:'Architecture & OS',               badge:'Système',     desc:'Von Neumann, hiérarchie mémoire, processus, Linux, commandes shell' },
      { slug:'langages-python',        titre:'Langages & Programmation Python', badge:'Python',      desc:'Fonctions, récursivité, modules, gestion des erreurs, portée des variables' },
      { slug:'algorithmique-1re',      titre:'Algorithmique',                   badge:'Algo',        desc:'Recherche séquentielle/dichotomique, tri sélection/insertion, complexité, glouton' },
      { slug:'projet-nsi-premiere',    titre:'Projet NSI Première',             badge:'Projet',      desc:'Git, tests assert, documentation, refactoring, cahier des charges, GitHub' },
    ]
  },
  'seconde-snt': {
    key:'seconde-snt', label:'Seconde — SNT', color:'#10b981', icon:'📘',
    chapitres: [
      { slug:'snt-internet',          titre:'Internet',                        badge:'Réseaux',     desc:'Architecture TCP/IP, DNS, routage, client/serveur, IPv4/IPv6, sécurité réseau' },
      { slug:'snt-web',               titre:'Le Web',                          badge:'Web',         desc:'HTML, CSS, URL, HTTP, moteurs de recherche, PageRank, accessibilité' },
      { slug:'snt-reseaux-sociaux',   titre:'Réseaux sociaux',                 badge:'Graphes',     desc:'Graphes, degré, communautés, algorithmes de recommandation, bulle de filtre' },
      { slug:'snt-donnees',           titre:'Données structurées',             badge:'Données',     desc:'CSV, tables, RGPD, métadonnées, open data, types de données' },
      { slug:'snt-geolocalisation',   titre:'Géolocalisation',                 badge:'GPS',         desc:'GPS, satellites, trilateralisation, cartographie, vie privée, géofencing' },
      { slug:'snt-photographie',      titre:'Photographie numérique',          badge:'Image',       desc:'Pixels, RGB, résolution, compression, formats PNG/JPEG, deepfake, traitement' },
      { slug:'snt-objets-connectes',  titre:'Objets connectés & IA',           badge:'IoT',         desc:'IoT, capteurs, actionneurs, protocoles, intelligence artificielle, biais' },
    ]
  },
}


// ══════════════════════════════════════════════════════════════════════
//  ANGLAIS LLCER FRANCE — Archives 2021-2025 + Chapitres par section
// ══════════════════════════════════════════════════════════════════════

const SECTION_CONFIGS_ANGLAIS_FR = [
  { key:'terminale-anglais', label:'Terminale — Spé LLCER Anglais', color:'#f43f5e', icon:'🎓',
    themes:['Synthèse de documents','Traduction en français','Identities & Exchanges','Expression et construction de soi','Arts et débats','Voyages & territoires'] },
  { key:'premiere-anglais', label:'Première — Anglais (Épreuve anticipée)', color:'#8b5cf6', icon:'📗',
    themes:['Identities & Exchanges','Private & Public Sphere','Art & Power','Citizenship & Virtual Worlds','Fictions & Realities','Scientific Innovation'] },
  { key:'seconde-anglais', label:'Seconde — Anglais (Contrôle continu)', color:'#06b6d4', icon:'📘',
    themes:['Communication & Interaction','Reading Comprehension','Written Expression','Listening Comprehension','Grammar','Vocabulary & Culture'] },
]

const ARCHIVES_ANGLAIS_FR: Archive[] = [
  // ── Terminale LLCER Anglais (sujetdebac.fr — URLs vérifiées) ─────────
  { id:'tang-2025-m',  year:2025, session:'LLCER Anglais · Métropole · 18 juin 2025',      section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2025/spe-llcer-anglais-2025-metropole-sujet-officiel.pdf',           themes:['Expression et construction de soi','Voyages & territoires','Synthèse de documents'] },
  { id:'tang-2025-an', year:2025, session:'LLCER Anglais · Amérique du Nord · 2025',       section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2025/spe-llcer-anglais-2025-amerique-nord-sujet-officiel.pdf',       themes:['Synthèse de documents','Traduction en français'] },
  { id:'tang-2025-as', year:2025, session:'LLCER Anglais · Asie · 2025',                   section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2025/spe-llcer-anglais-2025-asie-sujet-officiel.pdf',                 themes:['Synthèse de documents','Arts et débats'] },
  { id:'tang-2025-po', year:2025, session:'LLCER Anglais · Polynésie · 2025',              section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2025/spe-llcer-anglais-2025-polynesie-sujet-officiel.pdf',             themes:['Synthèse de documents','Identities & Exchanges'] },
  { id:'tang-2025-nc', year:2025, session:'LLCER Anglais · Nouvelle-Calédonie · 2025',     section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2025/spe-llcer-anglais-2025-nouvelle-caledonie-sujet-officiel.pdf',   themes:['Synthèse de documents','Voyages & territoires'] },
  { id:'tang-2024-m',  year:2024, session:'LLCER Anglais · Métropole · 20 juin 2024',      section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2024/spe-llcer-anglais-2024-metropole-sujet-officiel.pdf',           themes:['Arts & debates d\'ideas','Expression and construction of identity'] },
  { id:'tang-2024-an', year:2024, session:'LLCER Anglais · Amérique du Nord · 2024',       section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2024/spe-llcer-anglais-2024-amerique-nord-sujet-officiel.pdf',       themes:['Synthèse de documents','Identities & Exchanges'] },
  { id:'tang-2024-as', year:2024, session:'LLCER Anglais · Asie · 2024',                   section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2024/spe-llcer-anglais-2024-asie-sujet-officiel.pdf',                 themes:['Synthèse de documents','Voyages & territoires'] },
  { id:'tang-2024-po', year:2024, session:'LLCER Anglais · Polynésie · 2024',              section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2024/spe-llcer-anglais-2024-polynesie-sujet-officiel.pdf',             themes:['Synthèse de documents','Arts et debats'] },
  { id:'tang-2023-m',  year:2023, session:'LLCER Anglais · Métropole · Juin 2023',         section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2023/spe-llcer-anglais-2023-metropole-sujet-officiel.pdf',           themes:['Voyages & territoires','Arts et debats','Identities & Exchanges'] },
  { id:'tang-2023-po', year:2023, session:'LLCER Anglais · Polynésie · 2023',              section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2023/spe-llcer-anglais-2023-polynesie-sujet-officiel.pdf',             themes:['Synthèse de documents','Expression de soi'] },
  { id:'tang-2022-m',  year:2022, session:'LLCER Anglais · Métropole · Juin 2022',         section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2022/spe-llcer-anglais-2022-metropole-sujet-officiel.pdf',           themes:['Fictions & Realities','Expressions politiques'] },
  { id:'tang-2022-an', year:2022, session:'LLCER Anglais · Amérique du Nord · 2022',       section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2022/spe-llcer-anglais-2022-amerique-nord-sujet-officiel.pdf',       themes:['Synthèse de documents','Identities & Exchanges'] },
  { id:'tang-2022-as', year:2022, session:'LLCER Anglais · Asie · 2022',                   section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2022/spe-llcer-anglais-2022-asie-sujet-officiel.pdf',                 themes:['Arts et debats','Voyages & territoires'] },
  { id:'tang-2022-po', year:2022, session:'LLCER Anglais · Polynésie · 2022',              section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2022/spe-llcer-anglais-2022-polynesie-sujet-officiel.pdf',             themes:['Synthèse de documents','Expression de soi'] },
  { id:'tang-2021-an', year:2021, session:'LLCER Anglais · Amérique du Nord · 2021',       section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2021/spe-llcer-anglais-2021-amerique-nord-sujet-officiel.pdf',       themes:['Identities & Exchanges','Synthèse de documents'] },
  { id:'tang-2021-as', year:2021, session:'LLCER Anglais · Asie · 2021',                   section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2021/spe-llcer-anglais-2021-asie-sujet-officiel.pdf',                 themes:['Synthèse de documents','Arts et debats'] },
  { id:'tang-2021-po', year:2021, session:'LLCER Anglais · Polynésie · 2021',              section:'Terminale — Spé LLCER Anglais', sectionKey:'terminale-anglais', color:'#f43f5e', icon:'🎓', url:'https://www.sujetdebac.fr/annales-pdf/2021/spe-llcer-anglais-2021-polynesie-sujet-officiel.pdf',             themes:['Voyages & territoires','Identities & Exchanges'] },
]

const CHAPITRES_ANGLAIS_FR: Record<string, {
  key: string; label: string; color: string; icon: string
  chapitres: { slug: string; titre: string; badge: string; desc: string }[]
}> = {
  'terminale-anglais': {
    key:'terminale-anglais', label:'Terminale — Spé LLCER Anglais', color:'#f43f5e', icon:'🎓',
    chapitres: [
      { slug:'identities-exchanges',    titre:'Identities & Exchanges',           badge:'Top Bac', desc:'American Dream, multiculturalism, migration, brain drain, Brexit, globalization' },
      { slug:'private-public',          titre:'Private & Public Sphere',          badge:'Top Bac', desc:'Social media, surveillance capitalism, GDPR, fake news, filter bubble, echo chamber' },
      { slug:'art-power',               titre:'Art & Power',                      badge:'LLCER',   desc:'Protest art, Banksy, propaganda, censorship, soft power, Fahrenheit 451, 1984' },
      { slug:'citizenship-virtual',     titre:'Citizenship & Virtual Worlds',     badge:'Top Bac', desc:'Online activism, deepfakes, AI and democracy, cyberbullying, digital rights' },
      { slug:'fictions-realities',      titre:'Fictions & Realities',             badge:'LLCER',   desc:'Dystopia, 1984, Lord of the Flies, narrative voice, science fiction, Orwell' },
      { slug:'scientific-innovation',   titre:'Scientific Innovation',            badge:'Top Bac', desc:'AI ethics, algorithmic bias, climate change, CRISPR, green economy, automation' },
      { slug:'diversity-inclusion',     titre:'Diversity & Inclusion',            badge:'Societe', desc:'Gender equality, intersectionality, affirmative action, MeToo, social mobility' },
      { slug:'territory-memory',        titre:'Territory & Memory',               badge:'Culture', desc:'Colonial legacy, commemoration, postcolonial literature, historical narratives' },
      { slug:'synthese-traduction',     titre:'Synthèse + Traduction',            badge:'Methode', desc:'Document synthesis methodology, translation techniques, thematic vocabulary' },
    ]
  },
  'premiere-anglais': {
    key:'premiere-anglais', label:'Première — Anglais (E.A.)', color:'#8b5cf6', icon:'📗',
    chapitres: [
      { slug:'identities-exchanges-p',    titre:'Identities & Exchanges',          badge:'Top Bac', desc:'American Dream, multiculturalism, migration, brain drain, Brexit, globalization, cultural identity, glocalization' },
      { slug:'private-public-p',          titre:'Private & Public Sphere',         badge:'Top Bac', desc:'Filter bubble, surveillance capitalism, GDPR, fake news, social media addiction, freedom of expression, echo chambers' },
      { slug:'art-power-p',               titre:'Art & Power',                     badge:'LLCER',   desc:'Banksy, protest art, propaganda, censorship, soft power, K-pop, Fahrenheit 451, cultural appropriation, museum restitution' },
      { slug:'citizenship-virtual-p',     titre:'Citizenship & Virtual Worlds',    badge:'Top Bac', desc:'Online activism, deepfakes, AI and democracy, #MeToo, cyberbullying, digital rights, e-democracy, fact-checking' },
      { slug:'fictions-realities-p',      titre:'Fictions & Realities',            badge:'LLCER',   desc:'Dystopia, 1984 Orwell, Lord of the Flies, Fahrenheit 451, narrative voice, science fiction, The Handmaid Tale, Atwood' },
      { slug:'scientific-innovation-p',   titre:'Scientific Innovation',           badge:'Top Bac', desc:'AI ethics, algorithmic bias, CRISPR, green economy, autonomous weapons, EU AI Act, climate psychology, Snowden' },
      { slug:'diversity-inclusion-p',     titre:'Diversity & Inclusion',           badge:'Societe', desc:'Gender pay gap, intersectionality, #MeToo, affirmative action, LGBTQ+ rights, systemic racism, social mobility, Popper' },
      { slug:'territory-memory-p',        titre:'Territory & Memory',              badge:'Culture', desc:'Colonial statues, postcolonial literature, war commemoration, TRC, collective memory, Halbwachs, France & Algeria, memory laws' },
      { slug:'synthese-traduction-p',     titre:'Synthèse + Traduction (Methode)', badge:'Methode', desc:'Document synthesis structure, translation techniques, thematic vocabulary, introduction/conclusion, cohesive devices, register' },
    ]
  },
  'seconde-anglais': {
    key:'seconde-anglais', label:'Seconde — Anglais', color:'#06b6d4', icon:'📘',
    chapitres: [
      { slug:'communication-interaction', titre:'Communication & Interaction',  badge:'Oral',     desc:'Indirect questions, opinions, debate, comparatives, signposting, turn-taking' },
      { slug:'reading-grammar',          titre:'Reading Comprehension & Grammar',badge:'Ecrit',   desc:'Tenses, passive voice, reported speech, conditionals, inference, text analysis' },
      { slug:'written-expression-2',     titre:'Written Expression',            badge:'Ecrit',    desc:'Essays, formal emails, narratives, for/against, descriptive, argumentative' },
      { slug:'listening',                titre:'Listening Comprehension',        badge:'Oral',     desc:'Predicting content, British vs American English, discourse markers, tone' },
      { slug:'grammar',                  titre:'Grammar',                        badge:'Grammaire',desc:'Tenses, modals, conditionals, relative clauses, error correction, advanced structures' },
      { slug:'vocabulary-culture',       titre:'Vocabulary & Cultural Themes',   badge:'Culture', desc:'English-speaking world, idioms, word formation, false friends, academic register' },
    ]
  },
}

const SECTION_CONFIGS_PHYS_FR = [
  { key:'terminale-phys', label:'Terminale-Générale — Physique-Chimie', color:'#f59e0b', icon:'⚗️',
    themes:['Ondes et signaux','Mécanique','Énergie','Chimie organique','Optique','Électricité'] },
  { key:'premiere-phys',  label:'Première-Spécialité — Physique-Chimie', color:'#4f6ef7', icon:'🔬',
    themes:['Constitution matière','Mécanique','Ondes','Chimie','Électricité','Optique'] },
  { key:'seconde-phys',   label:'Seconde — Physique-Chimie',              color:'#f97316', icon:'🔬',
    themes:['Atomes','Transformations chimiques','Mouvement','Forces','Ondes','Énergie'] },
  { key:'sti2d-phys',    label:'Terminale-STI2D — Physique-Chimie',      color:'#10b981', icon:'⚙️',
    themes:['Mécanique','Électricité','Ondes','Thermodynamique','Chimie des matériaux'] },
  { key:'st2s-phys',     label:'Terminale-ST2S — CBPH',                   color:'#8b5cf6', icon:'🏥',
    themes:['Chimie biologie','Acide-base','Oxydoréduction','Ondes médicales','Physique santé'] },
]

const ARCHIVES_PHYS_FR: Archive[] = [
  // ── Terminale Générale Physique-Chimie (sujetdebac.fr) ────────────────────
  { id:'tphys-2024-m', year:2024, session:'Terminale · Physique-Chimie · Métropole · juin 2024', section:'Terminale Générale — Physique-Chimie', sectionKey:'terminale-phys', color:'#f59e0b', icon:'⚗️', url:`${SD}/2024/terminale-physique-chimie-2024-metropole-sujet-officiel.pdf`, themes:['Ondes sonores','Mécanique quantique','Chimie organique','Électricité'] },
  { id:'tphys-2024-m2', year:2024, session:'Terminale · Physique-Chimie · Métropole · remplacement 2024', section:'Terminale Générale — Physique-Chimie', sectionKey:'terminale-phys', color:'#f59e0b', icon:'⚗️', url:`${SD}/2024/terminale-physique-chimie-2024-metropole-remplacement-sujet-officiel.pdf`, themes:['Mécanique','Ondes','Chimie'] },
  { id:'tphys-2023-m', year:2023, session:'Terminale · Physique-Chimie · Métropole · mars 2023', section:'Terminale Générale — Physique-Chimie', sectionKey:'terminale-phys', color:'#f59e0b', icon:'⚗️', url:`${SD}/2023/terminale-physique-chimie-2023-metropole-sujet-officiel.pdf`, themes:['Physique quantique','Mécanique','Ondes','Chimie organique'] },
  { id:'tphys-2022-m', year:2022, session:'Terminale · Physique-Chimie · Métropole · mai 2022', section:'Terminale Générale — Physique-Chimie', sectionKey:'terminale-phys', color:'#f59e0b', icon:'⚗️', url:`${SD}/2022/terminale-physique-chimie-2022-metropole-sujet-officiel.pdf`, themes:['Mécanique','Ondes','Chimie','Énergie'] },
  { id:'tphys-2021-m', year:2021, session:'Terminale · Physique-Chimie · Métropole · juin 2021', section:'Terminale Générale — Physique-Chimie', sectionKey:'terminale-phys', color:'#f59e0b', icon:'⚗️', url:`${SD}/2021/terminale-physique-chimie-2021-metropole-sujet-officiel.pdf`, themes:['Optique','Mécanique','Chimie organique'] },
  { id:'tphys-2024-an', year:2024, session:'Terminale · Physique-Chimie · Amérique du Nord 2024', section:'Terminale Générale — Physique-Chimie', sectionKey:'terminale-phys', color:'#f59e0b', icon:'⚗️', url:`${SD}/2024/terminale-physique-chimie-2024-amerique-du-nord-sujet-officiel.pdf`, themes:['Mécanique quantique','Ondes','Chimie'] },
  { id:'tphys-2023-an', year:2023, session:'Terminale · Physique-Chimie · Amérique du Nord 2023', section:'Terminale Générale — Physique-Chimie', sectionKey:'terminale-phys', color:'#f59e0b', icon:'⚗️', url:`${SD}/2023/terminale-physique-chimie-2023-amerique-du-nord-sujet-officiel.pdf`, themes:['Physique quantique','Mécanique','Chimie'] },
  // ── Terminale STI2D Physique-Chimie ───────────────────────────────────────
  { id:'sti-2025-m', year:2025, session:'STI2D · Physique-Chimie-Maths · Métropole · juin 2025', section:'Terminale STI2D — Physique-Chimie', sectionKey:'sti2d-phys', color:'#10b981', icon:'⚙️', url:`${SD}/2025/sti2d-spe-physique-chimie-mathematiques-2025-metropole-sujet-officiel.pdf`, themes:['Mécanique','Électricité','Ondes','Chimie matériaux'] },
  { id:'sti-2025-s', year:2025, session:'STI2D · Remplacement · sept. 2025', section:'Terminale STI2D — Physique-Chimie', sectionKey:'sti2d-phys', color:'#10b981', icon:'⚙️', url:`${SD}/2025/sti2d-spe-physique-chimie-mathematiques-2025-metropole-remplacement-sujet-officiel.pdf`, themes:['Mécanique','Électricité','Chimie'] },
  { id:'sti-2024-m', year:2024, session:'STI2D · Physique-Chimie · Métropole · 2024', section:'Terminale STI2D — Physique-Chimie', sectionKey:'sti2d-phys', color:'#10b981', icon:'⚙️', url:`${AP}/STI2D_metropole_19_juin_2024__FH2.pdf`, themes:['Mécanique','Ondes','Chimie','Électricité'] },
  { id:'sti-2023-m', year:2023, session:'STI2D · Physique-Chimie · Métropole · 2023', section:'Terminale STI2D — Physique-Chimie', sectionKey:'sti2d-phys', color:'#10b981', icon:'⚙️', url:`${SD}/2023/sti2d-spe-physique-chimie-mathematiques-2023-metropole-sujet-officiel.pdf`, themes:['Mécanique','Ondes','Chimie','Thermique'] },
  { id:'sti-2022-m', year:2022, session:'STI2D · Physique-Chimie · Métropole · 2022', section:'Terminale STI2D — Physique-Chimie', sectionKey:'sti2d-phys', color:'#10b981', icon:'⚙️', url:`${SD}/2022/sti2d-spe-physique-chimie-mathematiques-2022-metropole-sujet-officiel.pdf`, themes:['Mécanique','Électricité','Chimie','Ondes'] },
  { id:'sti-2021-m', year:2021, session:'STI2D · Physique-Chimie · Métropole · 2021', section:'Terminale STI2D — Physique-Chimie', sectionKey:'sti2d-phys', color:'#10b981', icon:'⚙️', url:`${AP}/STI2D_juin_2021_Metropole_DV.pdf`, themes:['Mécanique','Ondes','Chimie matériaux'] },
  // ── Terminale ST2S CBPH ───────────────────────────────────────────────────
  { id:'st2s-2025-m', year:2025, session:'ST2S · CBPH · Métropole · juin 2025', section:'Terminale ST2S — CBPH', sectionKey:'st2s-phys', color:'#8b5cf6', icon:'🏥', url:`${SD}/2025/st2s-spe-chimie-bio-physiopat-humaines-2025-metropole-sujet-officiel.pdf`, themes:['Acide-base santé','Biologie','Physique médicale'] },
  { id:'st2s-2024-m', year:2024, session:'ST2S · CBPH · Métropole · juin 2024', section:'Terminale ST2S — CBPH', sectionKey:'st2s-phys', color:'#8b5cf6', icon:'🏥', url:`${SD}/2024/st2s-spe-chimie-bio-physiopat-humaines-2024-metropole-sujet-officiel.pdf`, themes:['Chimie biologie','Oxydoréduction','Physique santé'] },
  { id:'st2s-2023-m', year:2023, session:'ST2S · CBPH · Métropole · juin 2023', section:'Terminale ST2S — CBPH', sectionKey:'st2s-phys', color:'#8b5cf6', icon:'🏥', url:`${SD}/2023/st2s-spe-chimie-bio-physiopat-humaines-2023-metropole-sujet-officiel.pdf`, themes:['Chimie médicale','Biologie','Physique santé'] },
  { id:'st2s-2022-m', year:2022, session:'ST2S · CBPH · Métropole · juin 2022', section:'Terminale ST2S — CBPH', sectionKey:'st2s-phys', color:'#8b5cf6', icon:'🏥', url:`${SD}/2022/st2s-spe-chimie-bio-physiopat-humaines-2022-metropole-sujet-officiel.pdf`, themes:['Acide-base','Biologie humaine','Physique médicale'] },
  { id:'st2s-2021-m', year:2021, session:'ST2S · CBPH · Métropole · juin 2021', section:'Terminale ST2S — CBPH', sectionKey:'st2s-phys', color:'#8b5cf6', icon:'🏥', url:`${SD}/2021/st2s-spe-chimie-bio-physiopat-humaines-2021-metropole-sujet-officiel.pdf`, themes:['Chimie biologie','Santé','Physique médicale'] },
]

// ================================================================
//  SVT FRANCE — Simulation IA
//  3 sections : Terminale + Premiere + Seconde
// ================================================================

const SECTION_CONFIGS_SVT_FR = [
  { key:'terminale-svt', label:'Terminale Specialite SVT', color:'#22c55e', icon:'🌱',
    themes:['Genetique et Evolution','Plantes et Paleoclimats','Corps humain et Sante','Immunite','Systeme nerveux','Tectonique'] },
  { key:'premiere-svt', label:'Premiere Specialite SVT', color:'#0891b2', icon:'📗',
    themes:['ADN et Expression genetique','Dynamique interne de la Terre','Ecosystemes et Services','Immunite','Genetique moleculaire','Ressources naturelles'] },
  { key:'seconde-svt', label:'Seconde SVT', color:'#16a34a', icon:'📘',
    themes:['La cellule unite du vivant','Metabolisme Respiration Photosynthese','Biodiversite et Evolution','Communication et Selection sexuelle','Geosciences Formation des paysages','Agrosystemes et Developpement durable'] },
]

const ARCHIVES_SVT_FR: Archive[] = [
  { id:'svt-2025-m1', year:2025, session:'Terminale SVT Metropole J1 juin 2025',    section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2025/spe-sciences-vie-terre-2025-metropole-1-sujet-officiel.pdf`, themes:['Meiose et brassage genetique','Photosynthese et paleoclimats','Sarcomere ATP glycemie'] },
  { id:'svt-2025-m2', year:2025, session:'Terminale SVT Metropole J2 juin 2025',    section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2025/spe-sciences-vie-terre-2025-metropole-2-sujet-officiel.pdf`, themes:['Genetique moleculaire','Evolution','Corps humain'] },
  { id:'svt-2024-m1', year:2024, session:'Terminale SVT Metropole J1 19 juin 2024', section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2024/spe-sciences-vie-terre-2024-metropole-1-sujet-officiel.pdf`, themes:['Tumeur cerebrale cortex moteur','Hardy-Weinberg selection naturelle','Photosynthese paleoclimats'] },
  { id:'svt-2024-m2', year:2024, session:'Terminale SVT Metropole J2 20 juin 2024', section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2024/spe-sciences-vie-terre-2024-metropole-2-sujet-officiel.pdf`, themes:['Genetique derive','Plantes domestication','Immunite vaccination'] },
  { id:'svt-2023-m1', year:2023, session:'Terminale SVT Metropole J1 juin 2023',    section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2023/spe-sciences-vie-terre-2023-metropole-1-sujet-officiel.pdf`, themes:['Meiose crossing-over','Immunite vaccination','Photosynthese geologie'] },
  { id:'svt-2023-m2', year:2023, session:'Terminale SVT Metropole J2 juin 2023',    section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2023/spe-sciences-vie-terre-2023-metropole-2-sujet-officiel.pdf`, themes:['Genetique','Evolution','Corps humain'] },
  { id:'svt-2022-m1', year:2022, session:'Terminale SVT Metropole J1 juin 2022',    section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2022/spe-sciences-vie-terre-2022-metropole-1-sujet-officiel.pdf`, themes:['Hardy-Weinberg effet fondateur','Reflexe myotatique cortex','Plantes paleoclimats'] },
  { id:'svt-2022-m2', year:2022, session:'Terminale SVT Metropole J2 juin 2022',    section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2022/spe-sciences-vie-terre-2022-metropole-2-sujet-officiel.pdf`, themes:['Genetique','Corps humain','Plantes'] },
  { id:'svt-2021-m1', year:2021, session:'Terminale SVT Metropole J1 juin 2021',    section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2021/spe-sciences-vie-terre-2021-metropole-1-sujet-officiel.pdf`, themes:['Meiose brassages endosymbiose','Photosynthese transpiration','Sarcomere ATP cortisol'] },
  { id:'svt-2021-m2', year:2021, session:'Terminale SVT Metropole J2 juin 2021',    section:'Terminale Specialite SVT', sectionKey:'terminale-svt', color:'#22c55e', icon:'🌱', url:`${SD}/2021/spe-sciences-vie-terre-2021-metropole-2-sujet-officiel.pdf`, themes:['Genetique','Plantes','Corps humain'] },
]

const CHAPITRES_SVT_FR: Record<string, {
  key: string; label: string; color: string; icon: string;
  chapitres: { slug: string; titre: string; badge: string; desc: string }[]
}> = {
  'terminale-svt': {
    key:'terminale-svt', label:'Terminale Specialite SVT', color:'#22c55e', icon:'🌱',
    chapitres: [
      { slug:'genetique-evolution-svt',  titre:'Genetique et Evolution',           badge:'Terminale SVT', desc:'Meiose et brassages genetiques. Frequences alleliques. Hardy-Weinberg. Derive genetique. Selection naturelle. Speciation. Phylogenie moleculaire. Endosymbiose.' },
      { slug:'plantes-paleoclimats-svt', titre:'Plantes et Paleoclimats',          badge:'Terminale SVT', desc:'Photosynthese phase lumineuse et cycle de Calvin. Nutrition minerale. Domestication des plantes. Cycles biogeochimiques. Paleoclimats delta18O et Milankovitch. Changement climatique et biodiversite.' },
      { slug:'corps-humain-sante-svt',   titre:'Corps humain et Sante',            badge:'Terminale SVT', desc:'Contraction musculaire sarcomere actine-myosine ATP. Regulation glycemie insuline glucagon. Immunite innee et adaptative LT CD4 CD8 LB anticorps. Vaccination. Prevention et traitements.' },
      { slug:'systeme-nerveux-svt',      titre:'Systeme nerveux et Comportements', badge:'Terminale SVT', desc:'Potentiel action. Synapse chimique. Neurotransmetteurs dopamine serotonine. Plasticite synaptique LTP. Maladies neurodegeneratives Alzheimer Parkinson. Addictions et circuit de recompense.' },
      { slug:'reproduction-svt',         titre:'Reproduction et Transmission',     badge:'Terminale SVT', desc:'Gametes et fecondation. Cycles sexuels. Heredite autosomique et liee au sexe. Dihybridisme. Mutations et maladies genetiques. Medecine predictive et therapie genique.' },
      { slug:'tectonique-term-svt',      titre:'Dynamique interne de la Terre',    badge:'Terminale SVT', desc:'Structure interne du globe ondes sismiques. Tectonique des plaques preuves subduction collision. Volcanisme et seismes. Risques geologiques. Paleomagnetisme et derive des continents.' },
    ]
  },
  'premiere-svt': {
    key:'premiere-svt', label:'Premiere Specialite SVT', color:'#0891b2', icon:'📗',
    chapitres: [
      { slug:'adn-expression-svt',       titre:'ADN et Expression genetique',      badge:'Premiere SVT', desc:'Structure de ADN. Replication semi-conservative. Transcription ARNm introns exons epissage. Traduction code genetique ribosomes. Mutations types agents mutagenes consequences. Regulation de expression genique.' },
      { slug:'tectonique-prem-svt',      titre:'Dynamique interne de la Terre',    badge:'Premiere SVT', desc:'Structure interne du globe enveloppes ondes P et S. Convection mantellique. Types de frontieres de plaques. Subduction et volcanisme explosif. Collision et formation des chaines de montagnes. Ophiolites et paleo-oceans.' },
      { slug:'ecosystemes-svt',          titre:'Ecosystemes et Services',          badge:'Premiere SVT', desc:'Reseaux trophiques et flux energie regle des 10 pourcent. Services ecosystemiques 4 categories. Indice de Shannon. Fragmentation des habitats. Corridors ecologiques. 6eme extinction de masse. Aires protegees.' },
      { slug:'ecosystemes-humains-svt',  titre:'Ecosystemes et Activite humaine',  badge:'Premiere SVT', desc:'5 pressions IPBES sur la biodiversite. Deforestation et surpeche. Trame Verte et Bleue. Conservation ex situ. Solutions fondees sur la Nature. Convention sur la Diversite Biologique CDB.' },
      { slug:'ressources-svt',           titre:'Ressources naturelles et DD',      badge:'Premiere SVT', desc:'Cycle de eau et ressources hydriques. Empreinte ecologique. Energies renouvelables vs fossiles. Matiere organique des sols. Economie circulaire. Limites planetaires Rockstrom. Objectifs de Developpement Durable.' },
      { slug:'immunite-premiere-svt',    titre:'Systeme immunitaire humain',       badge:'Premiere SVT', desc:'Immunite innee phagocytose inflammation interferons. Immunite adaptative LB anticorps LT CD8 cytotoxicite. Memoire immunologique. Vaccination types immunite collective. Allergies et maladies auto-immunes.' },
      { slug:'genetique-sante-svt',    titre:'Variation genetique et Sante',       badge:'Premiere SVT', desc:'Lois de Mendel segregation et assortiment independant. Genotype et phenotype. Maladies autosomiques dominantes et recessives. Heredite liee au sexe. Caryotype et anomalies chromosomiques trisomie 21. Cancer mutations oncogenes et suppresseurs de tumeur. Therapie genique et CRISPR.' },
      { slug:'systeme-nerveux-prem-svt',titre:'Fonctionnement du systeme nerveux', badge:'Premiere SVT', desc:'Structure du neurone dendrites axone gaine de myeliine. Potentiel de repos et potentiel action. Loi du tout ou rien. Synapse chimique et neurotransmetteurs. Plasticite synaptique LTP et memoire. Maladies Alzheimer Parkinson SEP. Addictions et circuit de recompense dopamine.' },
      { slug:'methodes-ece-svt',        titre:'Methodes scientifiques et ECE',      badge:'Premiere SVT', desc:'Demarche experimentale 8 etapes. Variables independante dependante et controlees. Groupe controle. Construction et analyse de graphiques scientifiques. Calcul de Rf en chromatographie. Statistiques descriptives. Protocole ECE lame microscopique et spectrophotometrie.' },
    ]
  },
  'seconde-svt': {
    key:'seconde-svt', label:'Seconde SVT', color:'#16a34a', icon:'📘',
    chapitres: [
      { slug:'cellules-seconde-svt',       titre:'La cellule unite du vivant',              badge:'Seconde SVT', desc:'Cellule animale vs vegetale. Organites noyau mitochondrie chloroplaste ribosome vacuole. Membrane plasmique et echanges. Differenciation cellulaire. Tissus et organes. Microscopie et schema biologique. Osmose et turgescence.' },
      { slug:'metabolisme-seconde-svt',    titre:'Metabolisme Respiration Photosynthese',   badge:'Seconde SVT', desc:'Equations bilan de la respiration et de la photosynthese. ATP role et bilan energetique. Autotrophes vs heterotrophes. Fermentation. Facteurs limitants de la photosynthese. Phase lumineuse et cycle de Calvin. Point de compensation.' },
      { slug:'biodiversite-seconde-svt',   titre:'Biodiversite et Evolution du vivant',     badge:'Seconde SVT', desc:'Les 3 niveaux de biodiversite. Notion d\'espece critere reproductif. Selection naturelle de Darwin 4 etapes. Arbre phylogenetique. Fossiles et stratigraphie. Derive genetique et frequences alleliques. Menaces sur la biodiversite.' },
      { slug:'communication-seconde-svt',  titre:'Communication et Selection sexuelle',     badge:'Seconde SVT', desc:'Types de signaux chimiques sonores visuels. Pheromones bombycol alarme. Selection sexuelle competition intrasexuelle choix intersexuel. Dimorphisme sexuel. Danse des abeilles. Comportements ritualises. Empreinte imprinting.' },
      { slug:'geosciences-seconde-svt',    titre:'Geosciences Formation des paysages',      badge:'Seconde SVT', desc:'Alteration mecanique et chimique des roches. Transport et sedimentation. Principe de superposition. Types de roches sedimentaires magmatiques metamorphiques. Sols et horizons. Cycle sedimentaire. Foraminiferes et paleoclimats delta18O.' },
      { slug:'erosion-humaine-seconde-svt',titre:'Erosion et Activite humaine',              badge:'Seconde SVT', desc:'Impact de la deforestation sur erosion. Agriculture intensive et sols. Urbanisation et impermeabilisation. Risques naturels aggraves. Haies bocageres et agriculture durable. Nitrates et eutrophisation. Desertification. Grande Muraille Verte.' },
      { slug:'agrosystemes-seconde-svt',   titre:'Agrosystemes et Developpement durable',   badge:'Seconde SVT', desc:'Agrosysteme vs ecosysteme naturel. Biomasse et production primaire nette. Elements nutritifs N P K Mg. Engrais organiques et mineraux. Rotation des cultures et fixation biologique de azote Rhizobium. Agriculture de precision. OGM.' },
      { slug:'fecondation-puberte-svt',    titre:'De la fecondation a la puberte',           badge:'Seconde SVT', desc:'Gametes spermatozoide et ovule. Fecondation et zygote. Developpement embryonnaire 8 etapes. Determination du sexe chromosomes X et Y. Puberte age et caracteres secondaires. Hormones sexuelles testosterone oestrogenes. Contraception.' },
      { slug:'cerveau-sante-seconde-svt',  titre:'Hormones Cerveau et Sante',               badge:'Seconde SVT', desc:'Microbiote intestinal definition et roles. Agents pathogenes virus bacteries parasites. VIH et SIDA. Immunite innee phagocytose inflammation. Vaccination. Perturbateurs endocriniens. Antibioresistance. Alimentation et sante.' },
    ]
  },
}

const CHAPITRES_PHYS_FR: Record<string, {
  key: string; label: string; color: string; icon: string
  chapitres: { slug: string; titre: string; badge: string; desc: string }[]
}> = {

  // ══ TERMINALE GÉNÉRALE — PHYSIQUE-CHIMIE ═══════════════════════════════════
  // Programme Physique-Chimie Terminale Générale (BO 2019, programme 2021+)
  'terminale-phys': {
    key:'terminale-phys', label:'Terminale Générale — Physique-Chimie', color:'#f59e0b', icon:'⚗️',
    chapitres: [
      // ── PHYSIQUE ──────────────────────────────────────────────────────────
      { slug:'meca-cin',         titre:"Mécanique — Cinématique & Dynamique",    badge:"Physique",     desc:"2ème loi de Newton ΣF=ma, équations horaires, chute libre, plan incliné, frottement, énergie cinétique Ec=½mv², travail W=F·d·cosθ, puissance." },
      { slug:'gravitation',      titre:"Gravitation universelle",                badge:"Physique",     desc:"Loi de gravitation F=G·m₁m₂/r², champ gravitationnel g=GM/r², satellites (lois de Kepler T²/R³=cte), vitesse de libération, orbites." },
      { slug:'energie-mecanique', titre:"Énergie mécanique",                    badge:"Physique",     desc:"Énergie cinétique, potentielle (de pesanteur et élastique), mécanique, conservation et non-conservation, travail des forces, puissance." },
      { slug:'oscillateurs',     titre:"Oscillateurs harmoniques",               badge:"Physique",     desc:"Pendule simple T=2π√(l/g), oscillateur masse-ressort T=2π√(m/k), énergie, analogie avec LC, amortissement." },
      { slug:'ondes-progressives',titre:"Ondes progressives — Caractéristiques", badge:"Physique",    desc:"Célérité v=λf, période, longueur d'onde, retard τ=d/v, déphasage, ondes transversales et longitudinales, double slit." },
      { slug:'physique-quantique',titre:"Physique quantique",                    badge:"Physique",     desc:"Dualité onde-corpuscule, photon E=hf, effet photoélectrique, modèle de Bohr, niveaux d'énergie, transitions, spectre d'émission/absorption." },
      { slug:'optique-ondulatoire',titre:"Optique ondulatoire",                  badge:"Physique",     desc:"Interférences (fentes d'Young, i=λD/a), diffraction (θ≈λ/a), polarisation, réseau de diffraction nλ=d·sinθ, cohérence." },
      { slug:'induction-lenz',   titre:"Induction — Faraday & Lenz",            badge:"Physique",     desc:"Flux magnétique Φ=BS·cosθ, loi de Faraday e=-dΦ/dt, loi de Lenz (opposition), auto-induction e=-L·di/dt, transformateur." },
      { slug:'courants-alternatifs',titre:"Courants alternatifs — RLC",          badge:"Physique",     desc:"Valeurs efficaces, impédances ZR=R, ZL=Lω, ZC=1/(Cω), circuit série RLC, résonance fréquence f₀=1/(2π√LC), facteur de qualité Q." },
      { slug:'thermodynamique',  titre:"Thermodynamique",                        badge:"Physique",     desc:"Systèmes thermodynamiques, échanges d'énergie, capacité thermique Q=mc·ΔT, bilan énergétique, diagramme énergie, rendements thermiques." },
      // ── CHIMIE ────────────────────────────────────────────────────────────
      { slug:'chimie-organ-struct',titre:"Chimie organique — Structure",         badge:"Chimie",       desc:"Familles de composés (alcanes, alcènes, alcools, acides, esters, amines, amides), isomérie de constitution, représentation topologique, nomenclature." },
      { slug:'chimie-organ-reactions',titre:"Chimie organique — Réactions",      badge:"Chimie",       desc:"Substitution, addition, élimination, estérification-hydrolyse, polymérisations (addition, condensation), mécanismes réactionnels, effets stériques." },
      { slug:'transformations-acides', titre:"Transformations acide-base",       badge:"Chimie",       desc:"Couples acide/base, constante Ka, pKa, pH, titrages (courbe, point équivalence, indicateurs), tampons, réaction prépondérante (pKa)." },
      { slug:'oxydoreduction',   titre:"Réactions d'oxydoréduction",             badge:"Chimie",       desc:"Nombres d'oxydation, couples Ox/Red, électrochimie (pile, électrolyse), demi-équations rédox, loi de Faraday, applications industrielles." },
      { slug:'cinetique-chimique',titre:"Cinétique chimique",                    badge:"Chimie",       desc:"Vitesse de réaction, facteurs cinétiques (T, concentration, catalyseur), temps de demi-réaction t₁/₂, suivi (spectrophotométrie, conductimétrie)." },
      { slug:'equilibres-chimiques',titre:"Équilibres chimiques",                badge:"Chimie",       desc:"Constante d'équilibre K, quotient de réaction Qr, déplacement d'équilibre (Le Chatelier), taux d'avancement, optimisation industrielle." },
      { slug:'chimie-verte',     titre:"Chimie verte & Développement durable",   badge:"Chimie",       desc:"12 principes de chimie verte, économie d'atomes, réactions en flux continu, solvants verts, biocarburants, CO₂ supercritique, bilan carbone." },
    ],
  },

  // ══ PREMIÈRE SPÉCIALITÉ — PHYSIQUE-CHIMIE ══════════════════════════════════
  // Programme Physique-Chimie Première Spécialité (BO 2019)
  'premiere-phys': {
    key:'premiere-phys', label:'Première Spécialité — Physique-Chimie', color:'#4f6ef7', icon:'🔬',
    chapitres: [
      // ── PHYSIQUE ──────────────────────────────────────────────────────────
      { slug:'constitution-matiere', titre:"Constitution et transformation de la matière", badge:"Physique/Chimie", desc:"Atomes, ions, molécules, liaisons chimiques (ionique, covalente), électronégativité, solides cristallins (ionique, moléculaire, covalent, métallique)." },
      { slug:'modele-quantique',  titre:"Modèle quantique de l'atome",           badge:"Physique",     desc:"Orbitales atomiques (s,p,d), configuration électronique, tableau périodique, liaisons de valence, VSEPR, géométrie moléculaire (AXnEm)." },
      { slug:'spectroscopie',    titre:"Spectroscopies IR et RMN",               badge:"Physique",     desc:"Spectroscopie IR (groupes fonctionnels, liaisons C=O, O-H, N-H), spectre RMN ¹H (déplacement chimique, multiplicité, intégration, identification)." },
      { slug:'optique-geometrique',titre:"Optique géométrique",                  badge:"Physique",     desc:"Réfraction (loi de Snell-Descartes n₁sinθ₁=n₂sinθ₂), réflexion totale interne, lentilles minces, relation conjugaison 1/f'=1/OA'-1/OA, grandissement." },
      { slug:'signaux-visuels',  titre:"Signaux et images",                      badge:"Physique",     desc:"Formation d'images (lentilles, appareil photo), persistance rétinienne, couleurs (synthèse additive/soustractive), spectre visible, radiations monochromatiques." },
      { slug:'ondes-1re',        titre:"Ondes mécaniques et sonores",            badge:"Physique",     desc:"Propagation, période T, fréquence f, longueur d'onde λ=vT, ondes sonores (spectre audible), ultrason (échographie), effet Doppler Δf/f=v_S/v." },
      { slug:'electricite-1re',  titre:"Électricité — Dipôles et lois",          badge:"Physique",     desc:"Dipôles R, L, C, lois de Kirchhoff, diviseur de tension, pont de Wheatstone, associations série/parallèle, puissance et énergie électrique." },
      // ── CHIMIE ────────────────────────────────────────────────────────────
      { slug:'chimie-organ-1re', titre:"Chimie organique — Familles et réactions", badge:"Chimie",    desc:"Groupes caractéristiques (hydroxyle, carbonyle, carboxyle, amine, ester), réactions de substitution (halogénation), addition (HX sur alcène), élimination." },
      { slug:'acide-base-1re',   titre:"Acides et bases — pH et Ka",            badge:"Chimie",       desc:"pH=-log[H₃O⁺], Ka, pKa, acides/bases forts et faibles, diagramme de prédominance, solution tampon, dosage acide-base (indicateurs, pH-métrique)." },
      { slug:'oxydoreduction-1re',titre:"Oxydoréduction — Couples Ox/Red",      badge:"Chimie",       desc:"Nombre d'oxydation, couples rédox, équilibrage demi-équations (méthode des e⁻), réactions spontanées, prévision (classement par potentiel standard)." },
      { slug:'cinet-1re',        titre:"Cinétique chimique — Suivi temporel",   badge:"Chimie",       desc:"Vitesse volumique de réaction, suivi temporel (spectrophotométrie Beer-Lambert, conductimétrie), facteurs cinétiques, temps de demi-réaction t₁/₂." },
    ],
  },

  // ══ SECONDE — PHYSIQUE-CHIMIE ══════════════════════════════════════════════
  // Programme Physique-Chimie Seconde (BO 2019) — Enseignement commun
  // Source: /bac-france/physique/seconde/[slug]
  'seconde-phys': {
    key:'seconde-phys', label:'Seconde — Physique-Chimie', color:'#f97316', icon:'🔬',
    chapitres: [
      // ── CHIMIE ────────────────────────────────────────────────────────────
      { slug:'atomes-noyau',            titre:"Atomes, noyaux & Tableau périodique",    badge:"Chimie",    desc:"Structure atomique (protons, neutrons, électrons), isotopes, notation AZX, configuration électronique (couches K,L,M), tableau périodique (familles, périodes, métaux/non-métaux)." },
      { slug:'transformations-chimiques',titre:"Transformations chimiques",             badge:"Chimie",    desc:"Réactions chimiques (réactifs, produits, conservation masse), équilibrage, avancement x, réactif limitant, transformations totales et équilibrées, écriture des équations." },
      // ── PHYSIQUE ──────────────────────────────────────────────────────────
      { slug:'description-mouvement',   titre:"Description du mouvement",              badge:"Physique",  desc:"Référentiel, trajectoire (rectiligne, circulaire, courbe), vecteur position et vitesse, vitesse scalaire v=d/t, mouvement uniforme et accéléré, chronophotographie." },
      { slug:'forces-interactions',     titre:"Forces & Interactions",                 badge:"Physique",  desc:"Interactions gravitationnelle (F=Gm₁m₂/r²) et électrique (Coulomb), caractéristiques d'une force (point, direction, sens, valeur), poids P=mg, Newton 1 et 3 (actions-réactions)." },
      { slug:'ondes-mecaniques-2',      titre:"Ondes mécaniques & sonores",            badge:"Physique",  desc:"Ondes progressives (transversales, longitudinales), célérité v=λ·f, période T, longueur d'onde λ, retard τ=d/v, ondes sonores (fréquence, intensité en dB), ultrasons." },
      { slug:'ondes-lumineuses',        titre:"Ondes lumineuses & Lentilles",          badge:"Physique",  desc:"Nature ondulatoire de la lumière, spectre visible (400-800nm), dispersion (prisme, arc-en-ciel), lentilles minces convergentes (foyers, relation conjugaison 1/f'=1/v-1/u, grandissement)." },
      { slug:'signaux-electriques-2',   titre:"Signaux électriques & Circuits",        badge:"Physique",  desc:"Grandeurs électriques (tension U, intensité I, résistance R), loi d'Ohm U=RI, circuit série et parallèle, lois de Kirchhoff (nœuds, mailles), puissance P=UI, énergie W=P·t." },
      { slug:'formes-energie',          titre:"Formes d'énergie",                      badge:"Physique",  desc:"Énergie cinétique Ec=½mv², énergie potentielle de pesanteur Ep=mgh, énergie mécanique Em=Ec+Ep, énergie interne, chimique, rayonnante, nucléaire — conversions, conservation." },
      { slug:'bilans-energetiques-2',   titre:"Bilans & Conversions d'énergie",        badge:"Physique",  desc:"Bilan énergétique global, rendement η=E_utile/E_fournie (%), transferts thermiques (conduction, convection, rayonnement), puissance P=E/t, développement durable et ressources." },
    ],
  },

  // ══ TERMINALE STI2D — PHYSIQUE-CHIMIE ════════════════════════════════════
  // Programme Physique-Chimie STI2D (mathématiques + PC combinés)
  'sti2d-phys': {
    key:'sti2d-phys', label:'Terminale STI2D — Physique-Chimie', color:'#10b981', icon:'⚙️',
    chapitres: [
      // ── PHYSIQUE ──────────────────────────────────────────────────────────
      { slug:'sti-mecanique',    titre:"Mécanique — Lois de Newton",             badge:"Physique STI2D", desc:"2ème loi de Newton (translation/rotation), moment d'une force, équilibres, machines (leviers, engrenages), travail, puissance, rendement mécanique." },
      { slug:'sti-energetique',  titre:"Conversions et bilans énergétiques",     badge:"Physique STI2D", desc:"Énergies électrique (P=UI), mécanique (Ec=½mv²), thermique (Q=mcΔT), chimique, conversion et stockage, rendement η=E_utile/E_fournie, bilan global." },
      { slug:'sti-ondes-mec',   titre:"Ondes mécaniques — Applications",         badge:"Physique STI2D", desc:"Propagation, v=λf, retard d/v, ondes sonores (décibels dB), ultrasons (contrôle non destructif, échographie), vibrations structure, résonance." },
      { slug:'sti-elec',        titre:"Électricité — Circuits et dipôles",       badge:"Physique STI2D", desc:"Dipôles R, L, C, régimes transitoires RC (τ=RC) et RL (τ=L/R), circuits RLC, courant alternatif, valeurs efficaces, puissance active/réactive." },
      { slug:'sti-optique',     titre:"Optique — Réfraction et instruments",      badge:"Physique STI2D", desc:"Réfraction n₁sinθ₁=n₂sinθ₂, angle limite, fibre optique, lentilles minces, formation d'images, appareil photo, loupe, microscope, lunette." },
      { slug:'sti-thermique',   titre:"Thermique — Transferts thermiques",        badge:"Physique STI2D", desc:"Conduction (Fourier), convection, rayonnement (Stefan-Boltzmann), résistance thermique R=e/(λS), bilan énergétique habitat, isolation." },
      { slug:'sti-nuc',         titre:"Énergie nucléaire",                        badge:"Physique STI2D", desc:"Nucléons, énergie de liaison, défaut de masse E=Δmc², fission (U-235), fusion (H+H), réacteur nucléaire, radioactivité et applications médicales." },
      // ── CHIMIE ────────────────────────────────────────────────────────────
      { slug:'sti-chimie-mater',titre:"Chimie des matériaux",                    badge:"Chimie STI2D", desc:"Métaux et alliages (structure, propriétés), polymères (thermoplastiques, thermodurcissables), céramiques, matériaux composites, traitements de surface." },
      { slug:'sti-chimie-corrosion',titre:"Corrosion et protection",             badge:"Chimie STI2D", desc:"Oxydation des métaux, corrosion électrochimique (piles galvaniques), protection cathodique, anodisation, galvanisation, peintures anticorrosion." },
      { slug:'sti-chimie-acides',titre:"Chimie des solutions",                   badge:"Chimie STI2D", desc:"Acides-bases (pH, Ka), dosages, oxydoréduction, piles électrochimiques, électrolyse industrielle (dépôt galvanique, production Al/Cl₂)." },
    ],
  },

  // ══ TERMINALE ST2S — CBPH ════════════════════════════════════════════════
  // Programme Chimie, Biologie et Physiopathologie Humaines (ST2S)
  'st2s-phys': {
    key:'st2s-phys', label:'Terminale ST2S — CBPH', color:'#8b5cf6', icon:'🏥',
    chapitres: [
      // ── CHIMIE ────────────────────────────────────────────────────────────
      { slug:'st2s-solutions',   titre:"Chimie des solutions — Concentrations",  badge:"Chimie CBPH", desc:"Concentrations massique et molaire, dilutions (C₁V₁=C₂V₂), solutions pharmaceutiques, dosages (spectrophotométrie Beer-Lambert A=εlc)." },
      { slug:'st2s-acide-base',  titre:"Acides-bases — Applications médicales", badge:"Chimie CBPH", desc:"pH sanguin (7,35-7,45), acidose/alcalose, tampons physiologiques (NaHCO₃/H₂CO₃), dosages pH-métriques, médicaments acides/bases (aspirine)." },
      { slug:'st2s-redox',       titre:"Oxydoréduction — Antiseptiques",        badge:"Chimie CBPH", desc:"Couples rédox, antiseptiques oxydants (eau oxygénée H₂O₂, permanganate KMnO₄), dosage iodométrique, taux d'alcoolémie (éthylotest)." },
      { slug:'st2s-organique',   titre:"Molécules organiques — Médicaments",    badge:"Chimie CBPH", desc:"Groupes fonctionnels médicaments (acides, amines, esters, amides), liaisons H, isomérie (stéréochimie), paracétamol, ibuprofène, aspirine structure-activité." },
      // ── PHYSIQUE ──────────────────────────────────────────────────────────
      { slug:'st2s-ondes-med',   titre:"Ondes — Imagerie médicale",             badge:"Physique CBPH", desc:"Ultrasons (v=d/t, f Doppler Δf=2f₀v/c), scanner IRM (RMN), radiographie X, endoscopie (fibre optique), ECG (courant électrique du cœur)." },
      { slug:'st2s-radioactivite',titre:"Radioactivité — Applications médicales",badge:"Physique CBPH", desc:"Rayonnements α, β, γ, loi N(t)=N₀e^(-λt), t₁/₂, activité A=λN, scintigraphie, TEP (tomographie), radiothérapie, radio-isotopes médicaux." },
      { slug:'st2s-optique-med', titre:"Optique médicale",                      badge:"Physique CBPH", desc:"Œil (modèle optique, défauts visuels), lunettes (vergence, correction), microscope médical, endoscope, fibre optique médicale, colorimétrie (spectre visible)." },
      { slug:'st2s-physio',      titre:"Physique de la physiologie",             badge:"Physique CBPH", desc:"Pression artérielle (Pa, mmHg), débit sanguin Q=S·v, viscosité (Poiseuille), ventilation pulmonaire (volumes, débits), bioélectricité (potentiel d'action, ECG)." },
    ],
  },
}

// ================================================================
//  ÉCONOMIE & GESTION FRANCE (SES + STMG) — Simulation IA
//  4 sections : Terminale Spé SES · Première Spé SES · Seconde SES · STMG
//  Annales Terminale vérifiées 200 OK (sujetdebac.fr, slug spe-sciences-eco-sociales)
// ================================================================

const SECTION_CONFIGS_ECO_FR = [
  { key:'terminale-eco', label:'Terminale Spécialité SES', color:'#14b8a6', icon:'📊',
    themes:['Croissance économique','Commerce international','Chômage','Crises financières','Politiques européennes','Structure sociale','École & mobilité','Travail & emploi','Engagement politique','Justice sociale'] },
  { key:'premiere-eco',  label:'Première Spécialité SES', color:'#4f6ef7', icon:'📗',
    themes:['Marché concurrentiel','Défaillances du marché','Financement','Monnaie','Socialisation','Liens sociaux','Déviance','Opinion publique & vote','Protection sociale'] },
  { key:'seconde-eco',   label:'Seconde SES', color:'#10b981', icon:'📘',
    themes:['Création & mesure des richesses','Formation des prix','Socialisation','Vie politique','Diplôme, emploi & salaire'] },
  { key:'stmg-eco',      label:'Terminale STMG — Éco-Gestion', color:'#8b5cf6', icon:'🏢',
    themes:['Management','Sciences de gestion & numérique','Droit','Économie','Gestion-Finance (FDR, BFR, seuil)'] },
]

const ARCHIVES_ECO_FR: Archive[] = [
  { id:'eco-2025-m1', year:2025, session:'Terminale SES · Métropole 1 · 17 juin 2025', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2025/spe-sciences-eco-sociales-2025-metropole-1-sujet-officiel.pdf`, themes:['Classes sociales & structure sociale','Politiques monétaire & budgétaire zone euro'] },
  { id:'eco-2025-m2', year:2025, session:'Terminale SES · Métropole 2 · 18 juin 2025', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2025/spe-sciences-eco-sociales-2025-metropole-2-sujet-officiel.pdf`, themes:['Asymétries d\'information & chômage structurel','PGF & croissance','Structure socioprofessionnelle'] },
  { id:'eco-2024-m1', year:2024, session:'Terminale SES · Métropole 1 · 19 juin 2024', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2024/spe-sciences-eco-sociales-2024-metropole-1-sujet-officiel.pdf`, themes:['Sources de la croissance','Commerce international & mondialisation'] },
  { id:'eco-2024-m2', year:2024, session:'Terminale SES · Métropole 2 · 20 juin 2024', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2024/spe-sciences-eco-sociales-2024-metropole-2-sujet-officiel.pdf`, themes:['Mobilité sociale','Marché & défaillances','Engagement politique'] },
  { id:'eco-2023-m1', year:2023, session:'Terminale SES · Métropole 1 · 20 mars 2023', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2023/spe-sciences-eco-sociales-2023-metropole-1-sujet-officiel.pdf`, themes:['Croissance & innovation','Justice sociale & inégalités'] },
  { id:'eco-2023-m2', year:2023, session:'Terminale SES · Métropole 2 · 21 mars 2023', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2023/spe-sciences-eco-sociales-2023-metropole-2-sujet-officiel.pdf`, themes:['Chômage','Commerce international','Structure sociale'] },
  { id:'eco-2022-m1', year:2022, session:'Terminale SES · Métropole 1 · 11 mai 2022', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2022/spe-sciences-eco-sociales-2022-metropole-1-sujet-officiel.pdf`, themes:['Action publique environnement','Mondialisation'] },
  { id:'eco-2022-m2', year:2022, session:'Terminale SES · Métropole 2 · 12 mai 2022', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2022/spe-sciences-eco-sociales-2022-metropole-2-sujet-officiel.pdf`, themes:['Monnaie & financement','Mobilité sociale','Déviance'] },
  { id:'eco-2021-m1', year:2021, session:'Terminale SES · Métropole 1 · 15 mars 2021', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2021/spe-sciences-eco-sociales-2021-metropole-1-sujet-officiel.pdf`, themes:['Sources de la croissance','Action publique environnement'] },
  { id:'eco-2021-m2', year:2021, session:'Terminale SES · Métropole 2 · juin 2021', section:'Terminale Spécialité SES', sectionKey:'terminale-eco', color:'#14b8a6', icon:'📊', url:`${SD}/2021/spe-sciences-eco-sociales-2021-metropole-2-sujet-officiel.pdf`, themes:['Marché & concurrence','Socialisation','Protection sociale'] },
]

const CHAPITRES_ECO_FR: Record<string, {
  key: string; label: string; color: string; icon: string
  chapitres: { slug: string; titre: string; badge: string; desc: string }[]
}> = {

  // ══ TERMINALE SPÉCIALITÉ SES (programme BO, épreuve coef.16) ══════════════
  'terminale-eco': {
    key:'terminale-eco', label:'Terminale Spécialité SES', color:'#14b8a6', icon:'📊',
    chapitres: [
      { slug:'sources-defis-croissance',  titre:"Sources et défis de la croissance",        badge:"Économie",    desc:"Facteurs de production, PGF, progrès technique, innovation (Schumpeter), croissance endogène, limites écologiques, soutenabilité, taux de croissance, PIB." },
      { slug:'commerce-international',    titre:"Fondements du commerce international",      badge:"Économie",    desc:"Avantages comparatifs (Ricardo), dotations factorielles, fragmentation chaîne de valeur, compétitivité prix/hors-prix, libre-échange vs protectionnisme, balance commerciale." },
      { slug:'chomage-politiques-emploi', titre:"Comment lutter contre le chômage ?",        badge:"Économie",    desc:"Chômage structurel/conjoncturel, taux de chômage BIT, appariement, asymétries d'information, salaire minimum, politiques de l'emploi (soutien demande, flexibilisation, formation)." },
      { slug:'crises-financieres',        titre:"Comprendre les crises financières",          badge:"Économie",    desc:"Crise de 1929 vs 2008, bulles spéculatives, comportements mimétiques, panique bancaire, effet de richesse négatif, régulation (ratios prudentiels, supervision)." },
      { slug:'politiques-economiques-europeennes', titre:"Politiques économiques dans l'UE", badge:"Économie",    desc:"Intégration européenne, marché unique, euro, politique monétaire BCE (taux directeurs, inflation 2%), politique budgétaire, coordination, chocs asymétriques." },
      { slug:'structure-sociale',         titre:"Structure de la société française",          badge:"Sociologie",  desc:"Classes sociales (Marx, Weber), PCS, moyennisation vs distances, rapports sociaux de genre, intersection des inégalités (revenus, patrimoine, diplôme)." },
      { slug:'ecole-mobilite-sociale',    titre:"École et mobilité sociale",                  badge:"Sociologie",  desc:"Massification vs démocratisation, capital culturel (Bourdieu), tables de mobilité (lecture en %, destinée/recrutement), mobilité observée, fluidité sociale, reproduction." },
      { slug:'mutations-travail-emploi',  titre:"Mutations du travail et de l'emploi",        badge:"Sociologie",  desc:"Taylorisme, post-taylorisme, polarisation des emplois, numérique et travail, précarisation, intégration par le travail, plateformes." },
      { slug:'engagement-politique',      titre:"L'engagement politique",                      badge:"Science po", desc:"Vote, militantisme, engagement associatif, consommation engagée, paradoxe de l'action collective (Olson), incitations sélectives, répertoires d'action, variables sociodémographiques." },
      { slug:'justice-sociale-inegalites', titre:"Justice sociale et action publique",         badge:"Regards",    desc:"Égalité des droits/chances/situations, théories de la justice (Rawls), redistribution, fiscalité (progressive, courbe de Lorenz, coefficient de Gini), discrimination positive, État-providence." },
    ],
  },

  // ══ PREMIÈRE SPÉCIALITÉ SES ═══════════════════════════════════════════════
  'premiere-eco': {
    key:'premiere-eco', label:'Première Spécialité SES', color:'#4f6ef7', icon:'📗',
    chapitres: [
      { slug:'marche-concurrentiel',   titre:"Le marché concurrentiel",            badge:"Économie",   desc:"CPP (atomicité, homogénéité…), offre/demande, prix d'équilibre, élasticité-prix, surplus consommateur/producteur, preneur de prix, gains à l'échange." },
      { slug:'defaillances-marche',    titre:"Les défaillances du marché",          badge:"Économie",   desc:"Externalités positives/négatives, biens publics (non-rival, non-excluable), asymétries d'information, antisélection, aléa moral, taxe pigouvienne, quotas, réglementation." },
      { slug:'financement-economie',   titre:"Le financement de l'économie",        badge:"Économie",   desc:"Capacité/besoin de financement, autofinancement, financement direct (actions, obligations) / indirect (crédit bancaire), taux d'intérêt, marché primaire/secondaire." },
      { slug:'monnaie',                titre:"La monnaie et sa création",            badge:"Économie",   desc:"Fonctions de la monnaie, monnaie fiduciaire/scripturale, création monétaire (crédits font les dépôts), banque centrale, taux directeurs, inflation, IPC, pouvoir d'achat." },
      { slug:'socialisation',          titre:"La socialisation",                     badge:"Sociologie", desc:"Socialisation primaire/secondaire, instances (famille, école, pairs, médias), normes/valeurs, socialisation différentielle (genre, milieu), trajectoires improbables." },
      { slug:'liens-sociaux',          titre:"Les liens sociaux",                    badge:"Sociologie", desc:"4 types de liens (Paugam : filiation, élective, organique, citoyenneté), solidarité mécanique/organique (Durkheim), intégration, désaffiliation (Castel), exclusion." },
      { slug:'deviance-controle-social', titre:"Déviance et contrôle social",        badge:"Sociologie", desc:"Déviance vs délinquance, relativité, anomie (Durkheim), étiquetage (Becker), stigmatisation, contrôle social formel/informel, chiffre noir, statistiques de délinquance." },
      { slug:'opinion-publique-vote',  titre:"Opinion publique et vote",             badge:"Science po", desc:"Opinion publique, sondages (échantillon, limites), participation/abstention (calculs), variables lourdes du vote, vote de classe, volatilité, vote sur enjeux." },
      { slug:'protection-sociale-risques', titre:"Protection sociale et risques",    badge:"Regards",    desc:"Risques sociaux, assurance (Bismarck, cotisations) / assistance (Beveridge, impôt), redistribution horizontale/verticale, branches Sécu, vieillissement, taux de remplacement." },
    ],
  },

  // ══ SECONDE SES ═══════════════════════════════════════════════════════════
  'seconde-eco': {
    key:'seconde-eco', label:'Seconde SES', color:'#10b981', icon:'📘',
    chapitres: [
      { slug:'richesses-creation-mesure', titre:"Création et mesure des richesses",  badge:"Économie",   desc:"Production marchande/non marchande, facteurs de production, VA = Production − CI, PIB (somme des VA), taux de croissance, productivité, limites du PIB." },
      { slug:'formation-prix-marche',     titre:"Formation des prix sur un marché",  badge:"Économie",   desc:"Loi de l'offre, loi de la demande, prix d'équilibre, excès d'offre/pénurie, déplacements de courbes, recette = prix × quantité, élasticité-prix (initiation)." },
      { slug:'socialisation-acteurs-sociaux', titre:"Socialisation et acteurs sociaux", badge:"Sociologie", desc:"Normes et valeurs, instances de socialisation (famille, école, pairs, médias), socialisation différenciée selon le genre et le milieu social." },
      { slug:'organisation-vie-politique', titre:"Organisation de la vie politique",  badge:"Science po", desc:"Démocratie directe/représentative, citoyenneté, séparation des pouvoirs (Montesquieu), suffrage universel, participation/abstention (taux), institutions." },
      { slug:'diplome-emploi-salaire',    titre:"Diplôme, emploi et salaire",         badge:"Regards",    desc:"Qualification, insertion professionnelle, salaire brut/net, SMIC, population active, chômage BIT, taux de chômage et taux d'activité (calculs), diplôme et chômage." },
    ],
  },

  // ══ TERMINALE STMG — ÉCO-GESTION ══════════════════════════════════════════
  'stmg-eco': {
    key:'stmg-eco', label:'Terminale STMG — Éco-Gestion', color:'#8b5cf6', icon:'🏢',
    chapitres: [
      { slug:'management',               titre:"Management",                           badge:"Management", desc:"Types d'organisations, finalités, parties prenantes, décisions stratégiques/opérationnelles, performance (efficacité/efficience), styles de direction, RSE, SWOT, part de marché." },
      { slug:'sciences-gestion-numerique', titre:"Sciences de gestion et numérique",   badge:"Gestion",    desc:"Système d'information, donnée/information/connaissance, bases de données (tables, requêtes), PGI/ERP, CRM, KPI, transformation numérique, RGPD, tableur (totaux, moyennes, taux d'évolution)." },
      { slug:'droit',                    titre:"Droit",                                 badge:"Droit",      desc:"Règle de droit, sources et hiérarchie des normes, personne physique/morale, capacité juridique, contrat (validité, obligations), responsabilité contractuelle/délictuelle, contrat de travail (CDI/CDD, subordination)." },
      { slug:'economie',                 titre:"Économie",                              badge:"Économie",   desc:"Marché (offre/demande, équilibre), croissance et PIB, VA, chômage BIT (taux), inflation et IPC, pouvoir d'achat, mondialisation, rôle de l'État, politiques conjoncturelles/structurelles." },
      { slug:'gestion-finance',          titre:"Gestion et Finance",                    badge:"Finance",    desc:"Bilan (actif/passif), compte de résultat (produits − charges), FDR = capitaux permanents − actif immobilisé, BFR = stocks + créances − dettes fournisseurs, TN = FDR − BFR, charges fixes/variables, MCV, taux de MCV, seuil de rentabilité = CF / taux de MCV, CAF." },
    ],
  },
}



// ── Fonction génération examen par chapitres ──────────────────────
async function generateChapterExam(
  chapitres: { titre: string; badge: string; desc: string }[],
  sectionKey: string,
  sectionLabel: string,
  idx: number,
  onDelta?: (full: string) => void
): Promise<GeneratedExam> {
  const chapList = chapitres.map((c, i) => `Exercice ${i+1} — ${c.titre} (${c.badge}) : ${c.desc}`).join('\n')
  const totalPts = 20
  const nEx = chapitres.length

  const system = `Tu es un auteur expert de sujets du Baccalauréat français (programme officiel Éducation nationale).
Tu crées des sujets ORIGINAUX, réalistes, avec de vraies données numériques.
NOTATION FRANÇAISE : f'(x), ∫, √, ℝ, ∈, ≤, ≥, →, Δ, θ, xₙ, uₙ₊₁, x², eˣ — JAMAIS \frac ni \sqrt ni LaTeX brut.
RÉPONDS UNIQUEMENT EN JSON VALIDE, sans backticks ni commentaires.`

  const prompt = `Crée un sujet de Bac ORIGINAL variante ${idx+1} centré sur CES CHAPITRES PRÉCIS :
${chapList}

Section : ${sectionLabel}
Total : ${totalPts} points répartis sur ${nEx} exercices (un exercice par chapitre sélectionné).

Règles STRICTES :
- Chaque exercice DOIT porter EXCLUSIVEMENT sur le chapitre assigné ci-dessus
- Niveau Bac Français officiel — vraies donnees numeriques precises
- Chaque exercice a des sous-parties 1), 2), 3)...
- Pour tout exercice sur une fonction : graphique OBLIGATOIRE

GRAPHIQUES — FORMATS :
FORMAT 1 — COURBE : [GRAPH: {"type":"function","expressions":["2*x*Math.exp(-x)"],"xMin":-1,"xMax":5,"labels":["f(x)"],"title":"Courbe de f"}]
FORMAT 2 — GÉOMÉTRIE : [GRAPH: {"type":"geometry","title":"Titre","shapes":[{"type":"axes","step":1},{"type":"triangle","points":[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":1,"y":3,"label":"C"}]}]}]
FORMAT 3 — PILE/CIRCUIT (ASCII) : [GRAPH: {"type":"ascii","title":"Pile Zn-Cu","content":"\n  Zn (-)  ||  Cu (+)\n  ZnSO₄  ||  CuSO₄\n  └───── e⁻ ─────┘","legend":["Anode: Zn→Zn²⁺+2e⁻","Cathode: Cu²⁺+2e⁻→Cu"]}]
RÈGLES : champ "graph" SÉPARÉ du "statement" · JAMAIS x^2 → x*x · JAMAIS 2x → 2*x · pile/circuit → FORMAT 3 ascii · JAMAIS "geometry" pour une pile

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

  const raw = await askClaude(prompt, system, 6000, undefined, onDelta)
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
function PhaseSelect({ onStart, archives: archivesProp, chapitresParSection: chapProp, sectionConfigs: scProp, matiere }: {
  onStart:(archives:Archive[], customText:string, chapitres?:{titre:string;badge:string;desc:string}[], sectionLabel?:string)=>void
  archives?: Archive[]
  chapitresParSection?: Record<string, { key:string; label:string; color:string; icon:string; chapitres:{slug:string;titre:string;badge:string;desc:string}[] }>
  sectionConfigs?: {key:string;label:string;color:string;icon:string;themes:string[]}[]
  matiere?: 'maths'|'physique'|'informatique'|'anglais'|'svt'|'francais'|'eco-gestion'
}) {
  const ARCHIVES_ACTIVE    = archivesProp ?? ARCHIVES
  const CHAPITRES_ACTIVE   = chapProp     ?? CHAPITRES_PAR_SECTION
  const SEC_CONFIGS_ACTIVE = scProp       ?? SECTION_CONFIGS
  const [tab, setTab] = useState<'archive'|'chapitre'|'import'|'correction-directe'>('archive')
  const searchParams = useSearchParams()

  // ── Onglet Archives ──
  const [filterSection, setFilterSection] = useState(() => {
    const sec = searchParams.get('section')
    const map: Record<string,string> = { 'terminale':'terminale','premiere':'premiere','techno':'techno','expertes':'expertes','seconde':'seconde' }
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
    const map: Record<string,string> = { 'terminale':'terminale','premiere':'premiere','techno':'techno','expertes':'expertes','seconde':'seconde' }
    return sec && map[sec] ? map[sec] : 'terminale'
  })
  const [selectedChaps, setSelectedChaps] = useState<{slug:string;titre:string;badge:string;desc:string}[]>([])

  const filtered = ARCHIVES_ACTIVE.filter(a=>
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
    else if(selectedChaps.length<4) setSelectedChaps(p=>[...p,ch])
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
  const canStartChap    = selectedChaps.length>=1 && selectedChaps.length<=4
  const currentSecData  = CHAPITRES_ACTIVE[chapSection]

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
          ['correction-directe','✅ Correction Directe'],
        ] as const).map(([k,lbl])=>(
          <button key={k} onClick={()=>setTab(k)}
            style={{padding:'10px 20px',borderRadius:9,border:'none',cursor:'pointer',fontWeight:600,fontSize:13,transition:'all 0.2s',fontFamily:'inherit',
              background:tab===k
                ? k==='chapitre'
                  ? 'linear-gradient(135deg,#06d6a0,#059669)'
                  : k==='correction-directe'
                    ? 'linear-gradient(135deg,#f59e0b,#f97316)'
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
                ['filterSection','Section',['all',...SEC_CONFIGS_ACTIVE.map(s=>s.key)],['Toutes',...SEC_CONFIGS_ACTIVE.map(s=>s.label.split(' ')[0])]],
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
              {Object.values(CHAPITRES_ACTIVE).map(sec=>(
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
              2 — Sélectionner jusqu'à 4 chapitres
            </p>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span style={{fontSize:13,color:'rgba(255,255,255,0.55)'}}>
                <strong style={{color:currentSecData?.color,fontSize:16}}>{selectedChaps.length}</strong>/4 chapitre{selectedChaps.length>1?'s':''}
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
                const blocked = !sel && selectedChaps.length>=4
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
              <p style={{fontSize:12,color:'rgba(255,255,255,0.3)',margin:0}}>Sélectionne entre 1 et 4 chapitres</p>
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
      {/* ── ONGLET CORRECTION DIRECTE ── */}
      {tab==='correction-directe' && (
        <CorrectionDirectePanel onStart={onStart} />
      )}
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════
// CORRECTION DIRECTE — Panel (France)
// L'élève importe son examen + sa copie → correction + remédiation
// ═══════════════════════════════════════════════════════════════════
// ── Compresser une image base64 avant envoi à l'API ─────────────
async function compressImageBase64(dataUrl: string, maxSize = 1200, quality = 0.75): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let { width, height } = img
      if (width > maxSize || height > maxSize) {
        if (width > height) { height = Math.round(height * maxSize / width); width = maxSize }
        else { width = Math.round(width * maxSize / height); height = maxSize }
      }
      canvas.width = width; canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}

function CorrectionDirectePanel({ onStart }: {
  onStart:(archives:Archive[], customText:string, chapitres?:any, sectionLabel?:string)=>void
}) {
  const [examFile, setExamFile] = useState('')
  const [examFileName, setExamFileName] = useState('')
  const [examImages, setExamImages] = useState<{name:string;data:string}[]>([])
  const [examReady, setExamReady] = useState(false)
  const [copyText, setCopyText] = useState('')
  const [copyFiles, setCopyFiles] = useState<{name:string;type:string;data:string}[]>([])
  const [step, setStep] = useState<'examen'|'copie'>('examen')
  const examRef = useRef<HTMLInputElement>(null)
  const copyRef = useRef<HTMLInputElement>(null)

  // Charger mammoth.js pour lire les fichiers Word
  useEffect(() => {
    if (!(window as any).mammoth) {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js'
      s.async = true
      document.head.appendChild(s)
    }
  }, [])

  const handleExamFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files||[]) as File[]
    if (!files.length) return
    const imgs: {name:string;data:string}[] = []
    for (const f of files) {
      if (f.type === 'application/pdf') {
        setExamFileName(f.name + ' ⚠️ PDF non supporté directement')
        setTimeout(() => {
          setExamFile("PDF detecte\n\n1 - Capture ecran : photo de chaque page en JPG/PNG\n2 - Word : convertir en .docx via smallpdf.com puis importer\n3 - Copier-coller : ouvrir le PDF, Ctrl+A puis Ctrl+C et coller ici")
        }, 100)
      } else if (f.type.startsWith('image/')) {
        const r = new FileReader()
        const rawData = await new Promise<string>(res => { r.onload = ()=>res(r.result as string); r.readAsDataURL(f) })
        // Compresser à max 1200px/75% pour éviter erreur 400 API
        const data = await compressImageBase64(rawData)
        imgs.push({ name:f.name, data })
      } else if (f.name.endsWith('.docx') || f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await f.arrayBuffer()
        const mammoth = (window as any).mammoth
        if (mammoth) {
          try {
            const result = await mammoth.extractRawText({ arrayBuffer })
            setExamFile(result.value); setExamFileName(f.name + ' ✅ Word importé')
          } catch { setExamFile("Erreur lecture Word — copiez-collez le texte ci-dessous.") }
        } else {
          await new Promise(r => setTimeout(r, 1500))
          const m2 = (window as any).mammoth
          if (m2) {
            try { const result = await m2.extractRawText({ arrayBuffer }); setExamFile(result.value); setExamFileName(f.name + ' ✅'); setExamReady(true) }
            catch { setExamFile("Erreur lecture Word.") }
          } else { setExamFile("Bibliothèque Word en cours de chargement — réessayez dans 2 secondes.") }
        }
      } else if (f.type.startsWith('text/') || f.name.endsWith('.txt')) {
        const text = await f.text()
        setExamFile(text); setExamFileName(f.name); setExamReady(true)
      }
    }
    if (imgs.length) { setExamImages(prev=>[...prev,...imgs]); setExamFileName(imgs.map(i=>i.name).join(', ')); setExamReady(true) }
    if (examRef.current) examRef.current.value = ''
  }

  const handleCopyFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files||[]) as File[]
    if (!files.length) return
    for (const f of files) {
      if (f.type.startsWith('image/')) {
        const r = new FileReader()
        const data = await new Promise<string>(res => { r.onload = ()=>res(r.result as string); r.readAsDataURL(f) })
        setCopyFiles(prev=>[...prev,{name:f.name,type:'image',data}])
      } else if (f.type.startsWith('text/') || f.name.endsWith('.txt')) {
        const text = await f.text()
        setCopyText(prev=>prev ? prev+'\n\n--- '+f.name+' ---\n'+text : text)
      }
    }
    if (copyRef.current) copyRef.current.value = ''
  }

  const canGoToCopie = examReady || examFile.trim().length > 20 || examImages.length > 0

  const handleCorrect = () => {
    const examContent = [
      examImages.length > 0 ? `[Examen importé : ${examImages.map(i=>i.name).join(', ')} — ${examImages.length} page(s)]` : '',
      examFile || '',
    ].filter(Boolean).join('\n\n')

    const copyContent = [
      copyText.trim(),
      copyFiles.filter(f=>f.type==='image').map(f=>`[Copie élève : ${f.name}]`).join('\n'),
    ].filter(Boolean).join('\n\n')

    // Stocker directement dans le ref global
    correctionDirecteData.examContent = examContent
    correctionDirecteData.copyContent = copyContent
    correctionDirecteData.examImages = examImages
      .filter(img => img.data.startsWith('data:image/'))
      .map(img => {
        const match = img.data.match(/data:([^;]+);base64,(.+)/)
        return match ? { mediaType: match[1], data: match[2] } : null
      })
      .filter(Boolean) as {data:string;mediaType:string}[]

    onStart([], '[CORRECTION_DIRECTE]')
  }

  return (
    <div style={{display:'flex',flexDirection:'column',gap:0}}>

      {/* Info banner */}
      <div style={{padding:'14px 18px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.25)',borderRadius:14,marginBottom:24,display:'flex',gap:12,alignItems:'flex-start'}}>
        <span style={{fontSize:20,flexShrink:0}}>⚡</span>
        <div>
          <p style={{margin:'0 0 3px',fontWeight:700,fontSize:14,color:'#e2e8f0'}}>Correction Directe — sans simulation</p>
          <p style={{margin:0,fontSize:12,color:'rgba(255,255,255,0.5)',lineHeight:1.6}}>
            Importe ton examen (sujet) + ta copie (réponses) → l'IA te génère la <strong style={{color:'#fbbf24'}}>correction complète</strong> + <strong style={{color:'#6ee7b7'}}>remédiation personnalisée</strong>.
          </p>
        </div>
      </div>

      {/* Stepper examen / copie */}
      <div style={{display:'flex',gap:0,marginBottom:28,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:12,overflow:'hidden'}}>
        {([
          {key:'examen',label:'1 — Importer le sujet',icon:'📄'},
          {key:'copie', label:'2 — Ajouter ta copie', icon:'✍️'},
        ] as const).map((s,i)=>(
          <button key={s.key}
            onClick={()=>{if(s.key==='copie'&&!canGoToCopie)return;setStep(s.key)}}
            style={{
              flex:1,padding:'14px 20px',border:'none',cursor:s.key==='copie'&&!canGoToCopie?'not-allowed':'pointer',
              fontFamily:'inherit',fontWeight:700,fontSize:13,
              display:'flex',alignItems:'center',justifyContent:'center',gap:8,
              background:step===s.key?s.key==='examen'?'linear-gradient(135deg,#6366f1,#8b5cf6)':'linear-gradient(135deg,#06d6a0,#059669)':'transparent',
              color:step===s.key?'white':s.key==='copie'&&!canGoToCopie?'rgba(255,255,255,0.2)':'rgba(255,255,255,0.5)',
              borderRight:i===0?'1px solid rgba(255,255,255,0.08)':'none',
              transition:'all 0.2s',
            }}>
            <span>{s.icon}</span> {s.label}
            {s.key==='examen'&&canGoToCopie&&<span style={{fontSize:14,color:'#6ee7b7'}}>✓</span>}
          </button>
        ))}
      </div>

      {/* ═══ STEP 1 — Importer le sujet ═══ */}
      {step==='examen' && (
        <div style={{display:'flex',flexDirection:'column',gap:16}}>

          {/* Zone upload examen */}
          <div
            onClick={()=>examRef.current?.click()}
            onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor='rgba(245,158,11,0.6)'}}
            onDragLeave={e=>{e.currentTarget.style.borderColor='rgba(245,158,11,0.3)'}}
            onDrop={e=>{e.preventDefault();e.currentTarget.style.borderColor='rgba(245,158,11,0.3)';const dt=e.dataTransfer;if(dt.files.length)handleExamFile({target:{files:dt.files}} as any)}}
            style={{
              border:'2px dashed rgba(245,158,11,0.3)',borderRadius:16,
              padding:'36px 28px',textAlign:'center',cursor:'pointer',
              background:examFileName?'rgba(245,158,11,0.06)':'rgba(245,158,11,0.03)',
              transition:'all 0.2s',
            }}>
            <input ref={examRef} type="file" accept=".txt,.docx,.png,.jpg,.jpeg,.webp" multiple onChange={handleExamFile} style={{display:'none'}}/>
            {examFileName ? (
              <>
                <div style={{fontSize:36,marginBottom:10}}>📄</div>
                <p style={{fontWeight:700,color:'#fbbf24',fontSize:14,margin:'0 0 4px'}}>{examFileName}</p>
                <p style={{fontSize:11,color:'rgba(255,255,255,0.35)',margin:0}}>Cliquez pour ajouter d'autres pages</p>
              </>
            ) : (
              <>
                <div style={{fontSize:40,marginBottom:12}}>📥</div>
                <p style={{fontWeight:700,fontSize:15,color:'rgba(255,255,255,0.85)',margin:'0 0 6px'}}>Importer le sujet de l'examen</p>
                <p style={{fontSize:12,color:'rgba(255,255,255,0.35)',margin:'0 0 14px'}}>Photos (JPG/PNG/WebP) ou texte — glissez ou cliquez</p>
                <div style={{display:'flex',justifyContent:'center',gap:8,flexWrap:'wrap'}}>
                  {[{icon:'📸',l:'Photo/Scan'},{icon:'📸',l:'JPG/PNG/WebP'},{icon:'📝',l:'Texte / Word'}].map(f=>(
                    <span key={f.l} style={{fontSize:11,padding:'4px 12px',background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:8,color:'rgba(255,255,255,0.5)'}}>
                      {f.icon} {f.l}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Ou coller texte */}
          <div>
            <p style={{fontSize:11,color:'rgba(255,255,255,0.3)',textAlign:'center',margin:'0 0 8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>ou coller le texte du sujet</p>
            <textarea value={examFile} onChange={e=>setExamFile(e.target.value)}
              placeholder="Copiez-collez ici l'énoncé de l'examen complet (exercices, questions...)..."
              style={{width:'100%',height:140,padding:'13px 15px',borderRadius:12,border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.85)',fontSize:13,resize:'vertical',outline:'none',fontFamily:'inherit',lineHeight:1.7,boxSizing:'border-box' as const,transition:'border 0.2s'}}
              onFocus={e=>e.target.style.borderColor='rgba(245,158,11,0.4)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
          </div>

          {examImages.length > 0 && (
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {examImages.map((img,i)=>(
                <div key={i} style={{position:'relative'}}>
                  <img src={img.data} alt={img.name} style={{width:80,height:80,objectFit:'cover',borderRadius:10,border:'1px solid rgba(245,158,11,0.3)'}}/>
                  <button onClick={()=>setExamImages(p=>p.filter((_,j)=>j!==i))}
                    style={{position:'absolute',top:-6,right:-6,width:20,height:20,borderRadius:'50%',background:'#ef4444',border:'none',color:'white',cursor:'pointer',fontSize:11,display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
                </div>
              ))}
            </div>
          )}

          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button
              onClick={()=>canGoToCopie&&setStep('copie')}
              disabled={!canGoToCopie}
              style={{
                padding:'12px 28px',borderRadius:12,border:'none',
                background:canGoToCopie?'linear-gradient(135deg,#f59e0b,#f97316)':'rgba(255,255,255,0.07)',
                color:canGoToCopie?'white':'rgba(255,255,255,0.25)',
                fontWeight:700,fontSize:14,cursor:canGoToCopie?'pointer':'not-allowed',
                fontFamily:'inherit',transition:'all 0.2s',
              }}>
              Suivant — Ajouter ma copie →
            </button>
          </div>
        </div>
      )}

      {/* ═══ STEP 2 — Ajouter la copie ═══ */}
      {step==='copie' && (
        <div style={{display:'flex',flexDirection:'column',gap:14}}>

          {/* Récap sujet */}
          <div style={{padding:'10px 16px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.25)',borderRadius:10,display:'flex',alignItems:'center',gap:10,fontSize:12,color:'#fbbf24'}}>
            <span>📄</span>
            <span style={{fontWeight:600}}>Sujet importé :</span>
            <span style={{color:'rgba(255,255,255,0.5)'}}>{examFileName || `${examFile.length} caractères`}</span>
            <button onClick={()=>setStep('examen')} style={{marginLeft:'auto',fontSize:11,padding:'2px 8px',borderRadius:6,border:'1px solid rgba(245,158,11,0.3)',background:'transparent',color:'rgba(245,158,11,0.7)',cursor:'pointer',fontFamily:'inherit'}}>Modifier</button>
          </div>

          <p style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.08em',margin:'4px 0'}}>
            Ta copie (tes réponses)
          </p>

          {/* Upload copie */}
          <div
            onClick={()=>copyRef.current?.click()}
            style={{border:'2px dashed rgba(99,102,241,0.3)',borderRadius:14,padding:'24px 20px',textAlign:'center',cursor:'pointer',background:'rgba(99,102,241,0.03)',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(99,102,241,0.5)';e.currentTarget.style.background='rgba(99,102,241,0.07)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(99,102,241,0.3)';e.currentTarget.style.background='rgba(99,102,241,0.03)'}}>
            <input ref={copyRef} type="file" accept=".txt,.jpg,.jpeg,.png,.webp" multiple onChange={handleCopyFile} style={{display:'none'}}/>
            <p style={{margin:0,fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.6)'}}>📎 Importer ma copie (photos, scan ou .txt)</p>
            <p style={{margin:'4px 0 0',fontSize:11,color:'rgba(255,255,255,0.3)'}}>Photos de ta copie papier ou fichier texte</p>
          </div>

          {copyFiles.length > 0 && (
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {copyFiles.map((f,i)=>(
                <div key={i} style={{position:'relative'}}>
                  {f.type==='image'
                    ? <img src={f.data} alt={f.name} style={{width:72,height:72,objectFit:'cover',borderRadius:8,border:'1px solid rgba(99,102,241,0.3)'}}/>
                    : <div style={{width:72,height:72,borderRadius:8,background:'rgba(99,102,241,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>📄</div>
                  }
                  <button onClick={()=>setCopyFiles(p=>p.filter((_,j)=>j!==i))}
                    style={{position:'absolute',top:-6,right:-6,width:18,height:18,borderRadius:'50%',background:'#ef4444',border:'none',color:'white',cursor:'pointer',fontSize:10,display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
                </div>
              ))}
            </div>
          )}

          <textarea value={copyText} onChange={e=>setCopyText(e.target.value)}
            placeholder={"Tape tes réponses ici ou laisse vide pour la correction complète...\n\nExercice 1 :\n1) ...\n2) ..."}
            style={{width:'100%',height:180,padding:'13px 15px',borderRadius:12,border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.85)',fontSize:13,resize:'vertical',outline:'none',fontFamily:'inherit',lineHeight:1.7,boxSizing:'border-box' as const,transition:'border 0.2s'}}
            onFocus={e=>e.target.style.borderColor='rgba(99,102,241,0.4)'}
            onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>

          <p style={{fontSize:11,color:'rgba(255,255,255,0.25)',margin:0,fontStyle:'italic'}}>
            💡 Sans copie → correction complète du sujet. Avec ta copie → correction personnalisée + remédiation ciblée.
          </p>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:8,borderTop:'1px solid rgba(255,255,255,0.06)',flexWrap:'wrap',gap:12}}>
            <button onClick={()=>setStep('examen')}
              style={{padding:'10px 18px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'rgba(255,255,255,0.4)',cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:600}}>
              ← Retour
            </button>
            <button onClick={handleCorrect}
              style={{
                padding:'14px 32px',borderRadius:13,border:'none',
                background:'linear-gradient(135deg,#f59e0b,#059669)',
                color:'white',fontWeight:800,fontSize:14,
                cursor:'pointer',fontFamily:'inherit',
                boxShadow:'0 6px 24px rgba(6,214,160,0.3)',
                display:'flex',alignItems:'center',gap:10,
              }}>
              <span>⚡</span>
              {copyText.trim().length > 0 || copyFiles.length > 0
                ? 'Corriger ma copie + Remédiation →'
                : 'Obtenir la correction complète →'
              }
            </button>
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
function PhaseGenerating({ archives, customText, onDone, matiere }: {
  archives:Archive[]; customText:string; onDone:(exams:GeneratedExam[])=>void; matiere?:string
}) {
  const { isAdmin, isSprint, checkQuota, incrementQuota, quotas, quotaLimits, matiereActive} = useAuth()
  // Sync globalMatiere depuis la prop matiere (UI) — priorité sur matiereActive (abonnement)
  const _matiereMapPG: Record<string,string> = {
    maths:'mathematiques', physique:'physique', informatique:'informatique', anglais:'anglais'
  }
  globalMatiere = (matiere ? _matiereMapPG[matiere] : null) || matiereActive || 'mathematiques'

  const [exams, setExams] = useState<GeneratedExam[]>([])
  const [generating, setGenerating] = useState(false)
  const [liveGen, setLiveGen] = useState('') // examen qui s'écrit en direct
  const [error, setError] = useState('')
  const [currentIdx, setCurrentIdx] = useState(0)
  const started = useRef(false)

  // Quota depuis Supabase
  const totalQuota = sumQuotasAcrossMatiere(quotas)
  // Quota cumulé tous abonnements
  const simUsed  = totalQuota.simulations_used || 0
  const simLimit = quotaLimits.simulations_per_week
  const isUnlimited  = isAdmin || simLimit === -1
  const simRemaining = isUnlimited ? 999 : Math.max(0, simLimit - simUsed)
  const limitReached = !isUnlimited && simUsed >= simLimit
  const maxExams     = isUnlimited ? 10 : simRemaining  // max examens générables cette session
  const canStart     = exams.length > 0

  const generateNext = useCallback(async (idx: number) => {
    setGenerating(true)
    setError('')
    setLiveGen('')
    try {
      const exam = await generateOneExam(archives, customText, idx, matiereActive, (pp)=>setLiveGen(pp))
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
            <p style={{margin:0,fontSize:12,color:'rgba(255,255,255,0.4)',textAlign:'center'}}>
              Generation de l&apos;examen {currentIdx+1}...{liveGen ? ` ✍️ ${liveGen.length.toLocaleString('fr-FR')} caractères` : ''}
            </p>
            {liveGen && (
              <div style={{width:'100%',maxHeight:200,overflow:'auto',background:'rgba(0,0,0,0.25)',borderRadius:8,padding:'10px 12px',fontSize:11,lineHeight:1.5,color:'rgba(255,255,255,0.55)',whiteSpace:'pre-wrap',fontFamily:'ui-monospace,monospace',textAlign:'left'}}>
                {humanizeStream(liveGen).slice(-1400)}
              </div>
            )}
          </div>
        )}

        {/* Badge quota Supabase */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,marginBottom:8,flexWrap:'wrap'}}>
          {!isAdmin && (
            <div style={{fontSize:12,color:limitReached?'rgba(239,68,68,0.8)':simRemaining<=1?'rgba(245,158,11,0.8)':'rgba(255,255,255,0.4)'}}>
              {limitReached
                ? <span>🔒 Quota atteint · <a href="/abonnement-france" style={{color:'#60a5fa',textDecoration:'none',fontWeight:700}}>🇫🇷 19€ · 29€ · 199€ →</a></span>
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
      const hasG=!!(ex.graph&&ex.graph!=='null')
      return `<div class="exercice">
        <div class="exercice-header">
          <span class="exercice-title">📐 ${esc2(ex.title)}</span>
          <span class="exercice-pts">${ex.points} points</span>
        </div>
        <div class="exercice-body">
          ${hasG?'<div style="text-align:center;padding:8px 0;color:#6366f1;font-size:13px">📊 Voir graphique dans l&#39;interface MathBac.AI</div>':''}
          <p style="white-space:pre-wrap">${esc2(cleanLatex(ex.statement))}</p>
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
      <strong>Bac.AI France</strong><br>
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
  <span>Bac.AI France — Simulation IA</span>
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

        {/* Plan d'étude personnalisé */}
        {(analysis as any).studyPlan && (
          <div style={{marginBottom:24,padding:'20px 24px',background:'rgba(16,185,129,0.07)',border:'1px solid rgba(16,185,129,0.25)',borderRadius:16}}>
            <h3 style={{margin:'0 0 16px',fontSize:15,fontWeight:800,color:'#10b981',display:'flex',alignItems:'center',gap:8}}>
              📅 Plan de travail personnalisé
            </h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
              <div style={{padding:'12px 16px',background:'rgba(16,185,129,0.08)',borderRadius:12,border:'1px solid rgba(16,185,129,0.2)'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#10b981',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>📆 Semaine 1</div>
                {((analysis as any).studyPlan?.week1||[]).map((a:string,i:number)=>(
                  <div key={i} style={{fontSize:12,color:'rgba(255,255,255,0.7)',marginBottom:5,paddingLeft:12,borderLeft:'2px solid rgba(16,185,129,0.4)'}}>• {a}</div>
                ))}
              </div>
              <div style={{padding:'12px 16px',background:'rgba(79,110,247,0.07)',borderRadius:12,border:'1px solid rgba(79,110,247,0.2)'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#818cf8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>📆 Semaine 2</div>
                {((analysis as any).studyPlan?.week2||[]).map((a:string,i:number)=>(
                  <div key={i} style={{fontSize:12,color:'rgba(255,255,255,0.7)',marginBottom:5,paddingLeft:12,borderLeft:'2px solid rgba(79,110,247,0.4)'}}>• {a}</div>
                ))}
              </div>
            </div>
            {(analysis as any).studyPlan?.dailyGoal && (
              <div style={{padding:'10px 14px',background:'rgba(245,158,11,0.09)',borderRadius:10,border:'1px solid rgba(245,158,11,0.25)',fontSize:13,color:'#fcd34d',fontWeight:600}}>
                ⏱ Objectif quotidien : {(analysis as any).studyPlan.dailyGoal}
              </div>
            )}
          </div>
        )}

        {/* Score par exercice */}
        {(analysis as any).scoreByExercise?.length > 0 && (
          <div style={{marginBottom:24,padding:'18px 22px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:16}}>
            <h3 style={{margin:'0 0 14px',fontSize:14,fontWeight:700,color:'rgba(255,255,255,0.6)',textTransform:'uppercase',letterSpacing:'0.08em'}}>
              📊 Détail par exercice
            </h3>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {((analysis as any).scoreByExercise as {exerciseTitle:string;estimated:number;max:number;comment:string}[]).map((ex,i)=>{
                const pct=Math.round((ex.estimated/ex.max)*100)
                const barColor=pct>=70?'#10b981':pct>=40?'#f59e0b':'#ef4444'
                return (
                  <div key={i} style={{padding:'10px 14px',background:'rgba(255,255,255,0.03)',borderRadius:10,border:'1px solid rgba(255,255,255,0.07)'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                      <span style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.8)'}}>{ex.exerciseTitle}</span>
                      <span style={{fontSize:13,fontWeight:700,color:barColor}}>{ex.estimated}/{ex.max} pts ({pct}%)</span>
                    </div>
                    <div style={{height:5,background:'rgba(255,255,255,0.07)',borderRadius:3,marginBottom:6,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${pct}%`,background:barColor,borderRadius:3}}/>
                    </div>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.45)'}}>{ex.comment}</div>
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
  const correctionRenderRef = useRef<HTMLDivElement>(null)
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
      const text = await correctSingleExercise(exam, currentIdx, answers, (partial) => {
        setCorrections(prev => ({ ...prev, [currentIdx]: stripIncompleteGraph(partial) }))
      })
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
  const openExercisePdf = async (idx: number, download = false) => {
    const ex = exam.exercises[idx]
    const corrText = corrections[idx] || ''
    const singleExam: GeneratedExam = {
      ...exam,
      title: `${exam.title} — Exercice ${idx + 1}`,
      exercises: [ex]
    }
    // Capture les graphiques affichés (rendu identique à l'écran) — seulement pour l'exercice visible
    let graphImgs: string[] = []
    if (idx === currentIdx && correctionRenderRef.current) {
      setPdfMsg(prev => ({ ...prev, [idx]: 'Préparation…' }))
      try { graphImgs = await captureGraphsInOrder(correctionRenderRef.current) } catch { graphImgs = [] }
    }
    try {
      openCorrectionPdf(singleExam, corrText, answers, download, graphImgs)
      setPdfMsg(prev => ({ ...prev, [idx]: download ? 'Téléchargement…' : 'Ouvert !' }))
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
        const text = await correctSingleExercise(exam, nextIdx, answers, (partial) => {
          setCorrections(prev => ({ ...prev, [nextIdx]: stripIncompleteGraph(partial) }))
        })
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
                <button onClick={() => openExercisePdf(currentIdx, true)}
                  style={{display:'flex',alignItems:'center',gap:6,padding:'7px 13px',
                    background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    border:'none',borderRadius:9,cursor:'pointer',
                    fontSize:12,fontWeight:700,color:'#fff',fontFamily:'inherit'}}>
                  ⬇ Télécharger PDF
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
                {generating ? '✍️ Rédaction en cours…' : '✅ Correction complète'}
              </p>
              <div ref={correctionRenderRef}>
                <MD text={currentCorrection}/>
              </div>
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
                    <button onClick={() => openExercisePdf(i, true)}
                      style={{flex:1,fontSize:11,padding:'6px 10px',borderRadius:8,border:'none',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',cursor:'pointer',fontFamily:'inherit',fontWeight:700}}>
                      ⬇ Télécharger
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

    const feedbackHtml = cleanLatex(feedback).split('\n').map(line => {
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
      +'<div class="enonce"></div>'
      +'<div class="enonce-text">'+cleanLatex(ex.statement)+'</div>'
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
function PhaseGeneratingChapitres({ chapitres, sectionLabel, onDone, matiere }: {
  chapitres: {titre:string;badge:string;desc:string}[]
  sectionLabel: string
  onDone: (exams: GeneratedExam[]) => void
  matiere?: string
}) {
  const { isAdmin, checkQuota, incrementQuota: incrementQuotaSub, quotas, quotaLimits, matiereActive } = useAuth()
  const _matiereMapPGC: Record<string,string> = {
    maths:'mathematiques', physique:'physique', informatique:'informatique', anglais:'anglais'
  }
  globalMatiere = (matiere ? _matiereMapPGC[matiere] : null) || matiereActive || 'mathematiques'
  const [exams, setExams] = useState<GeneratedExam[]>([])
  const [generating, setGenerating] = useState(false)
  const [liveGen, setLiveGen] = useState('')
  const [error, setError] = useState('')
  const started = useRef(false)

  const totalQuota = sumQuotasAcrossMatiere(quotas)
  // Quota cumulé tous abonnements
  const simUsed  = totalQuota.simulations_used || 0
  const simLimit = quotaLimits.simulations_per_week
  const isUnlimited  = isAdmin || simLimit === -1
  const limitReached = !isUnlimited && simUsed >= simLimit

  const generateNext = useCallback(async (idx: number) => {
    setGenerating(true); setError(''); setLiveGen('')
    try {
      const sectionKey = Object.values(CHAPITRES_PAR_SECTION).find(s=>s.label===sectionLabel)?.key || 'maths'
      const exam = await generateChapterExam(chapitres, sectionKey, sectionLabel, idx, (pp)=>setLiveGen(pp))
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
              Génération de l'examen ciblé sur<br/>{chapitres.map(c=>c.titre).join(', ')}...{liveGen ? ` ✍️ ${liveGen.length.toLocaleString('fr-FR')} caractères` : ''}
            </p>
            {liveGen && (
              <div style={{width:'100%',maxHeight:200,overflow:'auto',background:'rgba(0,0,0,0.25)',borderRadius:8,padding:'10px 12px',fontSize:11,lineHeight:1.5,color:'rgba(255,255,255,0.55)',whiteSpace:'pre-wrap',fontFamily:'ui-monospace,monospace',textAlign:'left'}}>
                {humanizeStream(liveGen).slice(-1400)}
              </div>
            )}
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

function SimulationFrancePageInner() {
  const { hasActiveSubscription, matiereActive, activeMatieres, checkMatiereAccess, isAdmin } = useAuth()
  // NE PAS écraser globalMatiere ici — le useEffect ci-dessous le gère correctement

  // ── Matière : maths, physique, informatique ou anglais ──────────
  const [activeMatiere, setActiveMatiere] = useState<'maths'|'physique'|'informatique'|'anglais'|'svt'|'francais'|'eco-gestion'>(() => {
    if (typeof window === 'undefined') return 'maths'
    const s = new URLSearchParams(window.location.search).get('subject')
    return s==='physique' ? 'physique' : s==='informatique' ? 'informatique' : s==='anglais' ? 'anglais' : s==='svt' ? 'svt' : s==='francais' ? 'francais' : 'maths'
  })
  // Synchroniser globalMatiere — activeMatiere (UI) prime sur matiereActive (AuthContext)
  useEffect(() => {
    const matiereMap: Record<string,string> = {
      maths:'mathematiques', physique:'physique', informatique:'informatique', anglais:'anglais', svt:'svt', francais:'francais', 'eco-gestion':'eco-gestion'
    }
    globalMatiere = matiereMap[activeMatiere] || 'mathematiques'
  }, [activeMatiere])
  // Sync initial immédiat (avant le premier render du useEffect)
  const matiereMapImmediat: Record<string,string> = {
    maths:'mathematiques', physique:'physique', informatique:'informatique', anglais:'anglais', svt:'svt', francais:'francais', 'eco-gestion':'eco-gestion'
  }
  globalMatiere = matiereMapImmediat[activeMatiere] || 'mathematiques'
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
    // ── Mode Correction Directe ──────────────────────────────
    if (txt.startsWith('[CORRECTION_DIRECTE]')) {
      // 3. Lire depuis correctionDirecteData (stockage direct)
      const examContent = correctionDirecteData.examContent
      const copyContent = correctionDirecteData.copyContent
      const examImgsFromRef = correctionDirecteData.examImages

      if (!examContent && examImgsFromRef.length === 0) {
        alert("Veuillez importer un sujet avant de lancer la correction.")
        return
      }
      // Vérification abonnement — correction directe compte comme 1 simulation
      if (!isAdmin && hasActiveSubscription) {
        const matiereUIKey = { maths:'mathematiques', physique:'physique', informatique:'informatique', anglais:'anglais', svt:'svt', francais:'francais', 'eco-gestion':'eco-gestion' }[activeMatiere] || activeMatiere
        if (!checkMatiereAccess(matiereUIKey as any)) {
          const matieresList = activeMatieres.length > 0 ? activeMatieres.join(', ') : matiereActive || 'votre matière'
          alert(`🔒 Votre abonnement ne couvre pas "${matiereUIKey}".

Vos abonnements actifs : ${matieresList}

→ mathsbac.com/abonnement?matiere=${matiereUIKey}`)
          return
        }
      }
      const stmtWithImages = examImgsFromRef.length > 0
        ? examImgsFromRef.map(img => `[IMAGE_BASE64:data:${img.mediaType};base64,${img.data}]`).join('\n') + (examContent ? '\n' + examContent : '')
        : examContent
      const fakeExam: GeneratedExam = {
        id: `direct-${Date.now()}`,
        index: 0,
        title: 'Correction Directe — Bac France',
        section: 'Bac France',
        duration: 180,
        totalPoints: 20,
        exercises: [{
          num: 1,
          title: 'Examen importé — Bac France',
          theme: 'Bac France',
          points: 20,
          statement: stmtWithImages || examContent,
        }],
      }
      setStudentAnswers(copyContent)
      setActiveExam(fakeExam)
      setCorrectionText('')
      setGradeResult(null)
      setPhase('correction')
      return
    }
    // Vérification abonnement : checkMatiereAccess gère les abonnements multiples
    if (!isAdmin && hasActiveSubscription) {
      const _mapCheck: Record<string,string> = {
        maths:'mathematiques', physique:'physique', informatique:'informatique',
        anglais:'anglais', svt:'svt', francais:'francais', 'eco-gestion':'eco-gestion'
      }
      const matiereUIKey = _mapCheck[activeMatiere] || activeMatiere
      // checkMatiereAccess vérifie si l'utilisateur a UN abonnement actif pour cette matière
      // (supporte les abonnements multiples — svt + francais + anglais en même temps)
      if (!checkMatiereAccess(matiereUIKey as any)) {
        const matieresList = activeMatieres.length > 0
          ? activeMatieres.join(', ')
          : matiereActive || 'votre matière'
        alert(`🔒 Votre abonnement ne couvre pas "${matiereUIKey}".\n\nVos abonnements actifs : ${matieresList}\n\n→ mathsbac.com/abonnement?matiere=${matiereUIKey}`)
        return
      }
    }
    if (chapitres && chapitres.length > 0) {
      setChapitresMode(true)
      setSelectedChapitres(chapitres)
      setChapSectionLabel(sectionLabel || 'Mathématiques')
    } else {
      setChapitresMode(false)
    }
    setArchives(arcs); setCustomText(txt); setPhase('generating')
  },[isAdmin, hasActiveSubscription, matiereActive, activeMatiere])

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
    try {
      const analysis = await analyzeStudentWork(activeExam, studentAnswers, fullCorrection)
      setAnalysisResult(analysis); setPhase('analysis')
    } catch (e) {
      console.error('[Analyse FR]', e)
      // Ne JAMAIS rester bloqué sur le spinner
      setAnalysisResult({
        estimatedScore: 0, maxScore: activeExam.totalPoints,
        weakAreas: [{ theme:'Analyse indisponible', severity:'moderate', description:"Le rapport n'a pas pu être généré (délai dépassé). Tu peux réessayer.", priority:1 }],
        strengths: [], globalAdvice: ["Réessaie l'analyse dans un moment."],
        remediationExercises: []
      } as AnalysisResult)
      setPhase('analysis')
    }
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
                IA · {chapitresMode ? '📚 Simulation Par Chapitre' : 'Simulation Bac France'}
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

          {/* ── ONGLETS MATIÈRE ── */}
          {phase === 'select' && (
            <div style={{display:'flex',gap:8,marginBottom:24,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:6,width:'fit-content'}}>
              {([
                { key:'maths'        as const, icon:'🧮', label:'Mathématiques',   color:'#f59e0b', matiere:'mathematiques' },
                { key:'physique'     as const, icon:'⚗️', label:'Physique-Chimie', color:'#06d6a0', matiere:'physique' },
                { key:'informatique' as const, icon:'💻', label:'Informatique NSI', color:'#8b5cf6', matiere:'informatique' },
                { key:'anglais'      as const, icon:'🇬🇧', label:'Anglais LLCER',   color:'#f43f5e', matiere:'anglais' },
                { key:'svt'          as const, icon:'🌱', label:'SVT',              color:'#22c55e', matiere:'svt' },
                { key:'francais'    as const, icon:'📚', label:'Français',         color:'#ec4899', matiere:'francais' },
                { key:'eco-gestion' as const, icon:'📊', label:'Éco & Gestion',    color:'#14b8a6', matiere:'eco-gestion' },
              ]).map(m => {
                const locked = false
                return (
                <button key={m.key} onClick={() => { if(!locked) setActiveMatiere(m.key) }}
                  style={{display:'flex',alignItems:'center',gap:8,padding:'11px 22px',borderRadius:12,border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:14,fontWeight:700,transition:'all 0.2s',
                    background:activeMatiere===m.key?m.color:'transparent',
                    color:activeMatiere===m.key?'white':'rgba(255,255,255,0.45)',
                    boxShadow:activeMatiere===m.key?`0 4px 20px ${m.color}40`:'none',
                    opacity: locked ? 0.55 : 1 }}>
                  <span style={{fontSize:18}}>{m.icon}</span>
                  <span>{m.label}</span>
                  {locked && <span style={{fontSize:12}}>🔒</span>}
                </button>
                )
              })}
            </div>
          )}

          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:24,padding:'30px 32px',backdropFilter:'blur(10px)'}}>

            {phase==='select'&&(
              <PhaseSelect
                onStart={handleStart}
                archives={activeMatiere==='physique' ? ARCHIVES_PHYS_FR : activeMatiere==='informatique' ? ARCHIVES_INFO_FR : activeMatiere==='anglais' ? ARCHIVES_ANGLAIS_FR : activeMatiere==='svt' ? ARCHIVES_SVT_FR : activeMatiere==='francais' ? ARCHIVES_FRANCAIS_FR : activeMatiere==='eco-gestion' ? ARCHIVES_ECO_FR : ARCHIVES}
                chapitresParSection={activeMatiere==='physique' ? CHAPITRES_PHYS_FR : activeMatiere==='informatique' ? CHAPITRES_INFO_FR : activeMatiere==='anglais' ? CHAPITRES_ANGLAIS_FR : activeMatiere==='svt' ? CHAPITRES_SVT_FR : activeMatiere==='francais' ? CHAPITRES_FRANCAIS_FR : activeMatiere==='eco-gestion' ? CHAPITRES_ECO_FR : CHAPITRES_PAR_SECTION}
                sectionConfigs={activeMatiere==='physique' ? SECTION_CONFIGS_PHYS_FR : activeMatiere==='informatique' ? SECTION_CONFIGS_INFO_FR : activeMatiere==='anglais' ? SECTION_CONFIGS_ANGLAIS_FR : activeMatiere==='svt' ? SECTION_CONFIGS_SVT_FR : activeMatiere==='francais' ? SECTION_CONFIGS_FRANCAIS_FR : activeMatiere==='eco-gestion' ? SECTION_CONFIGS_ECO_FR : SECTION_CONFIGS}
                matiere={activeMatiere}
              />
            )}

            {phase==='generating'&&(
              chapitresMode
                ? <PhaseGeneratingChapitres
                    chapitres={selectedChapitres}
                    sectionLabel={chapSectionLabel}
                    onDone={handleExamsReady}
                    matiere={activeMatiere}/>
                : <PhaseGenerating archives={archives} customText={customText} onDone={handleExamsReady} matiere={activeMatiere}/>
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

export default function SimulationFrancePage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#0c0c1a',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:14}}>Chargement...</div>}>
      <SimulationFrancePageInner />
    </Suspense>
  )
}