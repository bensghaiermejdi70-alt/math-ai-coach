'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StepByStep from '@/components/ui/StepByStep'

const EXAMPLES = [
  { label:'Équation 2°', expr:'2x² - 5x + 3 = 0' },
  { label:'Intégrale', expr:'∫ x² dx' },
  { label:'Dérivée', expr:"f'(x) = x³ + 2x" },
  { label:'Limites', expr:'lim x→∞ (1/x)' },
  { label:'Complexes', expr:'z² + 2z + 5 = 0' },
  { label:'Matrice', expr:'det([[2,1],[3,4]])' },
]

interface Step { label: string; math: string; note?: string }

export default function SolvePage() {
  const [expr, setExpr] = useState('')
  const [steps, setSteps] = useState<Step[]>([])
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState('')
  const [error, setError] = useState('')

  const solve = async () => {
    if (!expr.trim()) return
    setLoading(true); setError(''); setSteps([]); setResult('')
    try {
      const res = await fetch('http://localhost:8000/api/solve', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ expression: expr }),
      })
      const data = await res.json()
      if (data.error) setError(data.error)
      else { setSteps(data.steps || []); setResult(data.result || ''); setMethod(data.method || '') }
    } catch {
      setError('⚠️ Serveur backend non disponible. Lance le backend sur le port 8000.')
    }
    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:40 }}>
            <span className="label">🧮 Solveur Mathématique</span>
            <h1 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:12 }}>Résolution Étape<br/>par Étape</h1>
            <p style={{ maxWidth:500 }}>Écris ton équation ou exercice — l'IA le résout avec toutes les étapes pédagogiques.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:30, alignItems:'start' }}>

            {/* LEFT — Input */}
            <div>
              <div className="card" style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:13, color:'var(--muted)', marginBottom:10, fontFamily:'var(--font-mono)' }}>Expression mathématique</label>
                <textarea
                  className="input input-mono"
                  value={expr}
                  onChange={e => setExpr(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && e.ctrlKey && solve()}
                  placeholder="Ex: 2x² - 5x + 3 = 0&#10;ou: ∫ x² dx&#10;ou: lim x→0 sin(x)/x"
                  rows={4}
                  style={{ resize:'vertical', marginBottom:14 }}
                />
                <div style={{ display:'flex', gap:10 }}>
                  <button className="btn btn-primary" style={{ flex:1 }} onClick={solve} disabled={!expr.trim() || loading}>
                    {loading ? '⏳ Résolution...' : 'Résoudre avec IA →'}
                  </button>
                  <button className="btn btn-ghost" onClick={() => { setExpr(''); setSteps([]); setResult(''); setError('') }}>✕</button>
                </div>
              </div>

              {/* Examples */}
              <div className="card">
                <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)', marginBottom:14, textTransform:'uppercase', letterSpacing:'0.08em' }}>Exemples rapides</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {EXAMPLES.map(ex => (
                    <button key={ex.expr} onClick={() => { setExpr(ex.expr); setSteps([]); setResult('') }}
                      style={{ padding:'6px 14px', borderRadius:100, background:'rgba(79,110,247,0.1)', border:'1px solid rgba(79,110,247,0.2)', color:'var(--accent)', fontSize:12, cursor:'pointer', fontFamily:'var(--font-body)' }}>
                      {ex.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div style={{ marginTop:20, padding:20, background:'rgba(6,214,160,0.06)', border:'1px solid rgba(6,214,160,0.15)', borderRadius:14 }}>
                <div style={{ fontSize:12, color:'var(--teal)', fontFamily:'var(--font-mono)', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' }}>💡 Syntaxe supportée</div>
                {[
                  ['Équations', 'x² + 3x = 0, x + 2 = 8'],
                  ['Dérivées', "f'(x) = x³ + ln(x)"],
                  ['Intégrales', '∫ x·e^x dx, ∫ sin(x) dx'],
                  ['Limites', 'lim x→0 (sin x)/x'],
                  ['Systèmes', '2x + y = 5, x - y = 1'],
                ].map(([t, v]) => (
                  <div key={t} style={{ display:'flex', gap:12, marginBottom:6 }}>
                    <span style={{ fontSize:12, color:'var(--muted)', minWidth:80 }}>{t}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text2)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Result */}
            <div>
              {!steps.length && !loading && !error && (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:300, color:'var(--muted)', textAlign:'center' }}>
                  <div style={{ fontSize:60, marginBottom:20, animation:'float 3s ease infinite' }}>∫</div>
                  <p style={{ fontSize:16 }}>Écris un exercice à gauche<br/>et clique sur Résoudre</p>
                  <p style={{ fontSize:13, marginTop:8 }}>Ctrl+Entrée pour résoudre rapidement</p>
                </div>
              )}
              {error && (
                <div style={{ padding:20, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:14, color:'var(--red)' }}>
                  {error}
                </div>
              )}
              {method && (
                <div style={{ marginBottom:16 }}>
                  <span className="badge badge-blue">Méthode : {method}</span>
                </div>
              )}
              <StepByStep steps={steps} result={result} isLoading={loading} />

              {result && (
                <div style={{ marginTop:20, display:'flex', gap:10 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => { /* copy */ navigator.clipboard.writeText(result) }}>📋 Copier la solution</button>
                  <a href="/chat" className="btn btn-ghost btn-sm">🤖 Demander une explication</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:768px){.container>div{grid-template-columns:1fr!important;}}`}</style>
    </>
  )
}
