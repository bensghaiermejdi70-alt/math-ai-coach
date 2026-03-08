'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ExerciseCard from '@/components/exercises/ExerciseCard'
import Link from 'next/link'

const ALL_EXERCISES = [
  { id:'1', title:'Résoudre une équation du 2° degré', question:'Résoudre dans ℝ : 2x² - 7x + 3 = 0', difficulty:'facile' as const, chapter:'Algèbre', points:3 },
  { id:'2', title:'Calcul de limite par forme indéterminée', question:'Calculer : lim x→∞ (3x² + 2x) / (x² - 1)', difficulty:'moyen' as const, chapter:'Limites', points:4 },
  { id:'3', title:'Dérivée d\'une fonction composée', question:'Calculer f\'(x) si f(x) = ln(x² + 3x + 1)', difficulty:'moyen' as const, chapter:'Dérivées', points:4 },
  { id:'4', title:'Intégrale par parties', question:'Calculer : ∫ x·e^x dx', difficulty:'difficile' as const, chapter:'Intégrales', points:6 },
  { id:'5', title:'Nombre complexe — forme exponentielle', question:'Écrire z = 1 + i√3 sous forme exponentielle', difficulty:'moyen' as const, chapter:'Complexes', points:4 },
  { id:'6', title:'Suite récurrente — convergence', question:'Soit uₙ₊₁ = √(uₙ + 2), u₀ = 1. Montrer que uₙ converge.', difficulty:'difficile' as const, chapter:'Suites', points:7 },
  { id:'7', title:'Variable aléatoire — loi binomiale', question:'X ~ B(10, 0.3). Calculer P(X ≥ 3).', difficulty:'moyen' as const, chapter:'Probabilités', points:5 },
  { id:'8', title:'Exercice type Bac — analyse complète', question:'Étudier la fonction f(x) = (x²-1)/(x+2) (domaine, limites, dérivée, tableau)', difficulty:'bac' as const, chapter:'Analyse', points:10 },
]

const CHAPTERS = ['Tous','Algèbre','Limites','Dérivées','Intégrales','Complexes','Suites','Probabilités','Analyse']
const DIFFS = ['Tous','facile','moyen','difficile','bac']

export default function ExercisesPage() {
  const [chapter, setChapter] = useState('Tous')
  const [diff, setDiff] = useState('Tous')

  const filtered = ALL_EXERCISES.filter(e =>
    (chapter === 'Tous' || e.chapter === chapter) &&
    (diff === 'Tous' || e.difficulty === diff)
  )

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          <div style={{ marginBottom:40 }}>
            <span className="label">📝 Exercices Interactifs</span>
            <h1 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:12 }}>Entraîne-toi<br/>sur le Programme</h1>
            <p style={{ maxWidth:500 }}>Exercices organisés par chapitre et difficulté — résolution IA incluse.</p>
          </div>

          {/* Filters */}
          <div style={{ display:'flex', gap:20, flexWrap:'wrap', marginBottom:32 }}>
            <div>
              <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.06em' }}>Chapitre</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {CHAPTERS.map(c => (
                  <button key={c} onClick={() => setChapter(c)} style={{ padding:'6px 14px', borderRadius:100, border:'1px solid', borderColor: chapter===c ? 'var(--accent)' : 'var(--border)', background: chapter===c ? 'rgba(79,110,247,0.15)' : 'transparent', color: chapter===c ? 'var(--accent)' : 'var(--muted)', fontSize:12, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all 0.2s' }}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.06em' }}>Difficulté</div>
              <div style={{ display:'flex', gap:6 }}>
                {DIFFS.map(d => (
                  <button key={d} onClick={() => setDiff(d)} style={{ padding:'6px 14px', borderRadius:100, border:'1px solid', borderColor: diff===d ? 'var(--accent)' : 'var(--border)', background: diff===d ? 'rgba(79,110,247,0.15)' : 'transparent', color: diff===d ? 'var(--accent)' : 'var(--muted)', fontSize:12, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all 0.2s' }}>{d}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <span style={{ fontSize:14, color:'var(--muted)' }}>{filtered.length} exercice{filtered.length>1?'s':''} trouvé{filtered.length>1?'s':''}</span>
            <Link href="/solve" className="btn btn-primary btn-sm">🧮 Solveur libre →</Link>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:16 }}>
            {filtered.map(ex => (
              <ExerciseCard key={ex.id} {...ex} onSolve={(id) => window.location.href = `/solve?ex=${id}`} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:60, color:'var(--muted)' }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
              <p>Aucun exercice trouvé pour ces filtres.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
