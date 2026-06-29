'use client'
import { useState, useRef, useCallback, useEffect, Suspense } from 'react' 
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/lib/auth/AuthContext'
import { sumQuotasAcrossMatiere } from '@/lib/types/monetisation'

// ════════════════════════════════════════════════════════════════════
// QUOTAS HEBDOMADAIRES — Solveur IA (géré par Supabase via AuthContext)
// Standard  : 30 résolutions IA/semaine
// Sprint Bac: illimité (solver_per_week = -1)
// Solveur SymPy (/api/solve) : TOUJOURS illimité (calcul local, 0 coût IA)
// Admin bensghaiermejdi70@gmail.com = ILLIMITÉ (tous les PC)
// ════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════
// HELPERS API
// ══════════════════════════════════════════════════════════════════════
// ══ PROMPT GRAPHIQUE UNIVERSEL — 5 types, toutes matières ══
const UNIVERSAL_GRAPH_PROMPT = `
GRAPHIQUES — 5 TYPES UNIVERSELS :
TYPE 1 — COURBE : [GRAPH: {"type":"function","expressions":["EXPR_JS"],"xMin":A,"xMax":B,"labels":["nom"],"title":"Titre","xLabel":"x","yLabel":"y"}]
RÈGLES JS : JAMAIS x^2→x*x | 2x→2*x | exp(-x)→Math.exp(-x) | décimaux OK: 2.1+11.8/(1+Math.exp(-0.8*(x-12.5)))
TYPE 2 — GÉOMÉTRIE : [GRAPH: {"type":"geometry","title":"Titre","shapes":[{"type":"axes"},FORMES]}]
TYPE 3 — ASCII (pile/circuit/synapse) : [GRAPH: {"type":"ascii","title":"Titre","content":"DESSIN","legend":["item"]}]
TYPE 4 — TABLEAU : [GRAPH: {"type":"table","title":"Titre","headers":["col1","col2"],"rows":[["v1","v2"]]}]
TYPE 5 — BARRES : [GRAPH: {"type":"bar","title":"Titre","categories":["A","B"],"values":[12,8]}]
RÈGLE : fonction→TYPE1 | géo→TYPE2 | pile/circuit/bio→TYPE3 | tableau→TYPE4 | histo→TYPE5
JAMAIS expressions:[] vide · JAMAIS x^2 · JAMAIS [FIGURE:...] texte`


async function askClaude(prompt: string, system: string, maxTokens = 6000, matiere?: string): Promise<string> {
  const _subj = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('subject') || '') : ''
  const _matiereMap: Record<string,string> = { physique:'physique', informatique:'informatique', anglais:'anglais', svt:'svt', litterature:'francais' }
  const _matiere = matiere || _matiereMap[_subj] || 'mathematiques'
  // Garde-temps client : un appel ne doit jamais rester bloqué (le serveur coupe à 115 s)
  const _ctrl = new AbortController()
  const _timer = setTimeout(() => _ctrl.abort(), 125000)
  let r: Response
  try {
    r = await fetch('/api/anthropic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: maxTokens,
        system,
        messages: [{ role: 'user', content: prompt }],
        type: 'solver',
        matiere: _matiere
      }),
      signal: _ctrl.signal,
    })
  } finally {
    clearTimeout(_timer)
  }
  if (!r.ok) {
    const err = await r.json().catch(() => ({}))
    throw new Error((err as any).error || `HTTP ${r.status}`)
  }
  const d = await r.json()
  return d.content?.map((b: any) => b.type === 'text' ? b.text : '').join('') || ''
}

async function askClaudeWithImage(
  prompt: string, system: string, base64: string,
  mediaType: string, maxTokens = 1500
): Promise<string> {
  const _subj2 = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('subject') || '') : ''
  const _matiereMap2: Record<string,string> = { physique:'physique', informatique:'informatique', anglais:'anglais', svt:'svt', litterature:'francais' }
  const _matiere = _matiereMap2[_subj2] || 'mathematiques'
  const r = await fetch('/api/anthropic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: prompt },
        ],
      }],
      type: 'solver',
      matiere: _matiere
    }),
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const d = await r.json()
  return d.content?.map((b: any) => b.type === 'text' ? b.text : '').join('') || ''
}

// ── API Claude avec pièces jointes (figure/tableau/annexe : images ou PDF) ──
async function askClaudeWithAttachments(
  prompt: string, system: string,
  attachments: { data: string; mediaType: string }[],
  maxTokens = 2000, matiere?: string
): Promise<string> {
  const _subj = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('subject') || '') : ''
  const _matiereMap: Record<string,string> = { physique:'physique', informatique:'informatique', anglais:'anglais', svt:'svt', litterature:'francais' }
  const _matiere = matiere || _matiereMap[_subj] || 'mathematiques'
  const content: any[] = []
  for (const att of attachments.slice(0, 4)) {
    if (att.mediaType === 'application/pdf') {
      content.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: att.data } })
    } else {
      content.push({ type: 'image', source: { type: 'base64', media_type: att.mediaType, data: att.data } })
    }
  }
  content.push({ type: 'text', text: prompt })

  const _ctrl = new AbortController()
  const _timer = setTimeout(() => _ctrl.abort(), 125000)
  let r: Response
  try {
    r = await fetch('/api/anthropic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: maxTokens,
        system,
        messages: [{ role: 'user', content }],
        type: 'solver',
        matiere: _matiere,
      }),
      signal: _ctrl.signal,
    })
  } finally {
    clearTimeout(_timer)
  }
  if (!r.ok) {
    const err = await r.json().catch(() => ({}))
    throw new Error((err as any).error || `HTTP ${r.status}`)
  }
  const d = await r.json()
  return d.content?.map((b: any) => b.type === 'text' ? b.text : '').join('') || ''
}

// ══════════════════════════════════════════════════════════════════════
// GRAPHIQUES Plotly
// ── Sanitize expression : corrige les erreurs courantes de l'IA ──
function sanitizeExpr(expr: string): string {
  if (!expr || typeof expr !== 'string') return '0'
  let e = expr.trim()
  if (e.startsWith('\\') && !e.includes('(')) return '0'
  if (e.length > 300) e = e.slice(0, 300)
  // ── Unicode math → ASCII ─────────────────────────────────────────
  e = e.replace(/−/g,'-').replace(/×/g,'*').replace(/÷/g,'/').replace(/·/g,'*')
       .replace(/²/g,'*x').replace(/³/g,'*x*x')
       .replace(/\u00b2/g,'*x').replace(/\u00b3/g,'*x*x')
       .replace(/\u221e/g,'1e15').replace(/\u03c0/g,'Math.PI')
       .replace(/\u03c4/g,'6.2832').replace(/\u03bb/g,'0.693')
  // ── LaTeX → JS ────────────────────────────────────────────────────
  e = e.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g,'($1)/($2)')
       .replace(/\\sqrt\{([^{}]+)\}/g,'Math.sqrt($1)')
       .replace(/\\sqrt/g,'Math.sqrt')
       .replace(/\\left\(/g,'(').replace(/\\right\)/g,')')
       .replace(/\\cdot/g,'*').replace(/\\times/g,'*')
       .replace(/\\ln\b/g,'Math.log').replace(/\\log\b/g,'Math.log10')
       .replace(/\\sin\b/g,'Math.sin').replace(/\\cos\b/g,'Math.cos')
       .replace(/\\tan\b/g,'Math.tan').replace(/\\exp\b/g,'Math.exp')
       .replace(/\\pi\b/gi,'Math.PI').replace(/\{/g,'(').replace(/\}/g,')')
  // ── Notation physique e^(...) ────────────────────────────────────
  e = e.replace(/e\^\(([^)]+)\)/g,(_,a)=>'Math.exp('+a+')')
       .replace(/e\^(-?[a-zA-Z0-9.*/]+)/g,(_,a)=>'Math.exp('+a+')')
  // ── Valeur absolue ───────────────────────────────────────────────
  e = e.replace(/\|([^|]+)\|/g,(_,a)=>'Math.abs('+a+')')
  // ── Puissances ───────────────────────────────────────────────────
  e = e.replace(/x\*\*(\d+)/g,(_,n)=>'x*'.repeat(Number(n)-1)+'x')
       .replace(/x\^(\d+)/g,  (_,n)=>'x*'.repeat(Number(n)-1)+'x')
       .replace(/x\^(-\d+)/g, (_,n)=>`Math.pow(x,${n})`)
       .replace(/\(([^()]+)\)\^(\d+)/g,(_,b,n)=>`Math.pow(${b},${n})`)
       .replace(/([a-zA-Z0-9_.]+)\^(\d+)/g,(_,b,n)=>`Math.pow(${b},${n})`)
  // ── Multiplication implicite ──────────────────────────────────────
  e = e.replace(/(\d)([a-zA-Z(])/g,'$1*$2')
       .replace(/\)([a-zA-Z0-9(])/g,')*$1')
  // ── Fonctions math (23+) ──────────────────────────────────────────
  const fns:[RegExp,string][]=[
    [/(?<![a-zA-Z0-9_.])ln\s*\(/g,'Math.log('],
    [/(?<![a-zA-Z0-9_.])log10\s*\(/g,'Math.log10('],
    [/(?<![a-zA-Z0-9_.])log\s*\(/g,'Math.log10('],
    [/(?<![a-zA-Z0-9_.])sin\s*\(/g,'Math.sin('],
    [/(?<![a-zA-Z0-9_.])cos\s*\(/g,'Math.cos('],
    [/(?<![a-zA-Z0-9_.])tan\s*\(/g,'Math.tan('],
    [/(?<![a-zA-Z0-9_.])sqrt\s*\(/g,'Math.sqrt('],
    [/(?<![a-zA-Z0-9_.])abs\s*\(/g,'Math.abs('],
    [/(?<![a-zA-Z0-9_.])exp\s*\(/g,'Math.exp('],
    [/(?<![a-zA-Z0-9_.])sinh\s*\(/g,'Math.sinh('],
    [/(?<![a-zA-Z0-9_.])cosh\s*\(/g,'Math.cosh('],
    [/(?<![a-zA-Z0-9_.])tanh\s*\(/g,'Math.tanh('],
    [/(?<![a-zA-Z0-9_.])asin\s*\(/g,'Math.asin('],
    [/(?<![a-zA-Z0-9_.])acos\s*\(/g,'Math.acos('],
    [/(?<![a-zA-Z0-9_.])atan\s*\(/g,'Math.atan('],
    [/(?<![a-zA-Z0-9_.])atan2\s*\(/g,'Math.atan2('],
    [/(?<![a-zA-Z0-9_.])floor\s*\(/g,'Math.floor('],
    [/(?<![a-zA-Z0-9_.])ceil\s*\(/g,'Math.ceil('],
    [/(?<![a-zA-Z0-9_.])round\s*\(/g,'Math.round('],
    [/(?<![a-zA-Z0-9_.])max\s*\(/g,'Math.max('],
    [/(?<![a-zA-Z0-9_.])min\s*\(/g,'Math.min('],
    [/(?<![a-zA-Z0-9_.])pow\s*\(/g,'Math.pow('],
    [/(?<![a-zA-Z0-9_.])log2\s*\(/g,'Math.log2('],
  ]
  for(const [re,repl] of fns) e=e.replace(re,repl)
  // ── Constantes ───────────────────────────────────────────────────
  e = e.replace(/\bpi\b/gi,'Math.PI').replace(/π/g,'Math.PI')
       .replace(/(?<![a-zA-Z0-9_.])e(?![a-zA-Z0-9_(])/g,'Math.E')
       .replace(/\s+/g,'')
  return e || '0'
}
function autoDetectGraphType(spec: any): string {
  if (!spec) return 'function'
  if (spec.type && ['function','geometry','ascii','table','bar','points','parametric'].includes(spec.type)) return spec.type
  if (spec.content && typeof spec.content === 'string') return 'ascii'
  if (spec.shapes && Array.isArray(spec.shapes)) return 'geometry'
  if (spec.rows && Array.isArray(spec.rows)) return 'table'
  if (spec.bars || spec.categories) return 'bar'
  if (spec.expressions && Array.isArray(spec.expressions)) return 'function'
  return 'function'
}

// ══════════════════════════════════════════════════════════════════════
function useScript(src: string) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if ((window as any).Plotly) { setLoaded(true); return }
    const s = document.createElement('script')
    s.src = src; s.async = true
    s.onload = () => setLoaded(true)
    document.head.appendChild(s)
  }, [src])
  return loaded
}

interface GraphSpec {
  type: 'function' | 'points'
  expressions: string[]
  xMin?: number; xMax?: number
  labels?: string[]
  title?: string
  xLabel?: string; yLabel?: string
  points?: { x: number; y: number; label?: string }[]
}

function MathGraph({ spec }: { spec: any }) {
  const divRef = useRef<HTMLDivElement>(null)
  const plotlyLoaded = useScript('https://cdn.plot.ly/plotly-2.27.0.min.js')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!plotlyLoaded || !divRef.current) return
    let traces: any[] = []
    let layout: any = {}
    let config: any = { responsive: true, displayModeBar: false }
    try {
      const xMin = spec.xMin ?? -6; const xMax = spec.xMax ?? 6
      const colors = ['#4f6ef7', '#06d6a0', '#f59e0b', '#ec4899', '#8b5cf6']

      // Vérifier que expressions est valide et non-vide
      const exprs = Array.isArray(spec.expressions) ? spec.expressions.filter((e: string) => e && e.trim() !== '') : []
      if (exprs.length === 0) {
        setError('Aucune expression à tracer — vérifiez le format [GRAPH: ...]')
        return
      }

      exprs.forEach((expr: string, i: number) => {
        const safeExpr = sanitizeExpr(expr)
        let fn: Function
        try {
          fn = new Function('x', 'Math',
            `"use strict"; try { const _r=(${safeExpr}); return (_r===undefined||_r===null)?null:_r; } catch(e) { return null; }`)
        } catch(compileErr) {
          console.warn('Expression invalide:', expr, '→', safeExpr, compileErr)
          traces.push({ x:[], y:[], mode:'lines', type:'scatter', name: `⚠️ ${expr.slice(0,30)}`, line:{ color: colors[i % colors.length], width:1, dash:'dot' } })
          return
        }
        // Haute fréquence → plus de points
        const hasHighFreq = safeExpr.includes('440')||safeExpr.includes('880')||safeExpr.includes('1000')||safeExpr.includes('2000')
        const N = hasHighFreq ? 2000 : 600
        const dx = (xMax - xMin) / N
        let yMax = 0, hasValid = false
        // Passe 1 : trouver la plage réelle
        for (let j = 0; j <= N; j++) {
          const x = xMin + j * dx
          const y = fn(x, Math)
          if (y !== null && isFinite(y)) { yMax = Math.max(yMax, Math.abs(y)); hasValid = true }
        }
        if (!hasValid) { console.warn('Courbe vide:', expr); return }
        // Seuil dynamique — résout sigmoid/exp croissante
        const threshold = Math.max(yMax * 100, 1e10)
        const xs: number[] = [], ys: number[] = []
        // Passe 2 : tracer
        for (let j = 0; j <= N; j++) {
          const x = xMin + j * dx
          const y = fn(x, Math)
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

      if (spec.points?.length) {
        traces.push({
          x: spec.points.map((p: {x:number;y:number;label?:string}) => p.x), y: spec.points.map((p: {x:number;y:number;label?:string}) => p.y),
          mode: 'markers+text', type: 'scatter',
          text: spec.points.map((p: {x:number;y:number;label?:string}) => p.label || ''),
          textposition: 'top center',
          marker: { color: '#f59e0b', size: 9, symbol: 'circle' },
          name: 'Points'
        })
      }

      if (traces.length === 0) { setError('Aucune courbe calculable'); return }
      layout = {
        title: { text: spec.title || '', font: { color: '#e2e8f0', size: 12 } },
        paper_bgcolor: 'rgba(10,10,25,0.95)',
        plot_bgcolor: 'rgba(16,16,35,0.9)',
        font: { color: '#94a3b8', size: 11 },
        xaxis: {
          title: spec.xLabel || 'x',
          gridcolor: 'rgba(255,255,255,0.07)',
          zerolinecolor: 'rgba(255,255,255,0.2)',
          zerolinewidth: 1.5, range: [xMin, xMax]
        },
        yaxis: {
          title: spec.yLabel || 'y',
          gridcolor: 'rgba(255,255,255,0.07)',
          zerolinecolor: 'rgba(255,255,255,0.2)',
          zerolinewidth: 1.5
        },
        legend: { bgcolor: 'rgba(0,0,0,0.5)', bordercolor: 'rgba(255,255,255,0.1)', borderwidth: 1 },
        margin: { t: 36, b: 44, l: 52, r: 16 }, height: 280,
      }
      ;(window as any).Plotly.newPlot(divRef.current, traces, layout, config)
    } catch(e: any) {
      console.error('MathGraph:', e, spec)
      const errMsg = e?.message || String(e) || ''
      if (errMsg.includes('SyntaxError') || errMsg.includes('ReferenceError')) {
        setError('Expression invalide : ' + (spec.expressions?.[0]?.slice(0,40) || '?'))
      } else {
        // Retry Plotly avec connectgaps:true (résout certaines discontinuités)
        try {
          const safeTraces = traces.map(tr => ({
            ...tr,
            y: (tr.y||[]).map((v: any) => (v !== null && isFinite(v) ? v : null)),
            connectgaps: true
          }))
          if (divRef.current && safeTraces.length > 0) {
            ;(window as any).Plotly.newPlot(divRef.current, safeTraces, layout, config)
          }
        } catch { setError('Tracé impossible — ' + errMsg.slice(0, 60)) }
      }
    }
  }, [plotlyLoaded, spec])

  if (!plotlyLoaded) return (
    <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
      Chargement graphique...
    </div>
  )
  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(79,110,247,0.25)', margin: '14px 0' }}>
      {error
        ? <div style={{ padding: 12, fontSize: 12, color: '#fca5a5' }}>{error}</div>
        : <div ref={divRef} />
      }
    </div>
  )
}

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


// ── AsciiGraph — pile, circuit, synapse ──────────────────────────
function AsciiGraph({spec}:{spec:any}){
  const legend=Array.isArray(spec.legend)?spec.legend:[]
  return(<div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(6,182,212,0.3)',margin:'14px 0',background:'rgba(6,182,212,0.04)'}}>
    {spec.title&&<div style={{padding:'8px 18px',borderBottom:'1px solid rgba(6,182,212,0.15)',fontSize:12,fontWeight:700,color:'#06b6d4',letterSpacing:'0.08em'}}>📐 {spec.title}</div>}
    <div style={{padding:'14px 18px'}}>
      <pre style={{fontFamily:"'Courier New',Consolas,monospace",fontSize:13,lineHeight:1.7,color:'rgba(255,255,255,0.85)',background:'rgba(0,0,0,0.35)',borderRadius:10,padding:'14px 18px',margin:'0 0 12px',overflowX:'auto',whiteSpace:'pre',border:'1px solid rgba(6,182,212,0.15)'}}>{spec.content}</pre>
      {legend.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:6}}>{legend.map((item:string,i:number)=><span key={i} style={{fontSize:11,padding:'3px 10px',background:'rgba(6,182,212,0.1)',color:'#67e8f9',border:'1px solid rgba(6,182,212,0.2)',borderRadius:20,fontWeight:600}}>{item}</span>)}</div>}
    </div>
  </div>)
}
// ── TableGraph — loi proba, tableau de signe, algo ────────────────
function TableGraph({spec}:{spec:any}){
  const h=spec.headers||[],r=spec.rows||[],hl=spec.highlight||[]
  return(<div style={{borderRadius:12,overflow:'hidden',border:'1px solid rgba(99,102,241,0.25)',margin:'14px 0'}}>
    {spec.title&&<div style={{padding:'8px 16px',background:'rgba(99,102,241,0.1)',borderBottom:'1px solid rgba(99,102,241,0.2)',fontSize:12,fontWeight:700,color:'#818cf8'}}>📋 {spec.title}</div>}
    <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:12,fontFamily:'monospace'}}>
      {h.length>0&&<thead><tr>{h.map((c:string,i:number)=><th key={i} style={{padding:'8px 12px',background:'rgba(99,102,241,0.12)',color:'#a5b4fc',fontWeight:700,borderBottom:'1px solid rgba(99,102,241,0.2)',textAlign:'center',whiteSpace:'nowrap'}}>{c}</th>)}</tr></thead>}
      <tbody>{r.map((row:string[],i:number)=><tr key={i} style={{background:hl.includes(i)?'rgba(99,102,241,0.1)':i%2===0?'rgba(255,255,255,0.02)':'transparent'}}>{row.map((cell:string,j:number)=><td key={j} style={{padding:'6px 12px',color:j===0?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.85)',borderBottom:'1px solid rgba(255,255,255,0.05)',textAlign:'center',whiteSpace:'nowrap'}}>{cell}</td>)}</tr>)}</tbody>
    </table></div>
  </div>)
}
// ── BarGraph — histogramme, comparaison SVT ───────────────────────
function BarGraph({spec}:{spec:any}){
  const cats=spec.categories||[],vals=spec.values||[],colors=spec.colors||['#4f6ef7','#06d6a0','#f59e0b','#ec4899','#8b5cf6'],mx=Math.max(...vals,1)
  return(<div style={{borderRadius:12,border:'1px solid rgba(99,102,241,0.25)',margin:'14px 0',background:'rgba(10,10,25,0.95)',padding:'16px'}}>
    {spec.title&&<div style={{fontSize:12,fontWeight:700,color:'#818cf8',marginBottom:14,textAlign:'center'}}>{spec.title}</div>}
    <div style={{display:'flex',alignItems:'flex-end',gap:8,height:160,paddingBottom:24,position:'relative'}}>
      {[0,25,50,75,100].map(p=><div key={p} style={{position:'absolute',left:0,right:0,bottom:`${p/100*130+24}px`,borderTop:'1px solid rgba(255,255,255,0.06)',fontSize:9,color:'rgba(255,255,255,0.25)'}}>{Math.round(mx*p/100)}</div>)}
      {cats.map((cat:string,i:number)=>{const h=Math.max(4,(vals[i]/mx)*130);const c=colors[i%colors.length];return(<div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:10,color:c,fontWeight:700}}>{vals[i]}</div><div style={{width:'100%',height:`${h}px`,background:c,borderRadius:'4px 4px 0 0',opacity:0.85}}/><div style={{fontSize:10,color:'rgba(255,255,255,0.5)',textAlign:'center',lineHeight:1.2,marginTop:2}}>{cat}</div></div>)})}
    </div>
    {spec.xLabel&&<div style={{textAlign:'center',fontSize:11,color:'rgba(255,255,255,0.3)',marginTop:4}}>{spec.xLabel}</div>}
  </div>)
}
// ── Dispatch universel : 5 types ──────────────────────────────────
function SmartGraph({ spec }: { spec: any }) {
  if (!spec || typeof spec !== 'object') return (
    <div style={{padding:'10px 14px',fontSize:12,color:'#fcd34d',background:'rgba(245,158,11,0.08)',borderRadius:8,margin:'6px 0'}}>
      📊 Format graphique invalide
    </div>
  )
  const t = autoDetectGraphType(spec)
  const s = t !== spec.type ? {...spec, type: t} : spec
  if (s.type === 'ascii')    return <AsciiGraph spec={s}/>
  if (s.type === 'table')    return <TableGraph spec={s}/>
  if (s.type === 'bar')      return <BarGraph   spec={s}/>
  if (s.type === 'geometry') return <GeoGraph   spec={s as GeoSpec}/>
  // function/points/parametric → MathGraph
  if (!Array.isArray(s.expressions) || s.expressions.length === 0) {
    if (typeof s.expressions === 'string') s.expressions = [s.expressions]
    else return (
      <div style={{padding:'10px 14px',fontSize:12,color:'#fcd34d',background:'rgba(245,158,11,0.08)',borderRadius:8,margin:'6px 0'}}>
        📊 Aucune expression fournie — relancez la résolution
      </div>
    )
  }
  return <MathGraph spec={s}/>
}


// Parser [GRAPH:{...}] robuste (gère JSON imbriqué + blocs tronqués)
function parseGraphSegments(text: string): Array<{ type: 'text' | 'graph'; content: string }> {
  const result: Array<{ type: 'text' | 'graph'; content: string }> = []
  let i = 0; const tag = '[GRAPH:'
  while (i < text.length) {
    const idx = text.indexOf(tag, i)
    if (idx === -1) { if (i < text.length) result.push({ type: 'text', content: text.slice(i) }); break }
    if (idx > i) result.push({ type: 'text', content: text.slice(i, idx) })
    const jsonStart = text.indexOf('{', idx + tag.length)
    if (jsonStart === -1) { result.push({ type: 'text', content: '\n📊 (figure)\n' }); break }
    let depth = 0, j = jsonStart, closed = false
    while (j < text.length) {
      if (text[j] === '{') depth++
      else if (text[j] === '}') { depth--; if (depth === 0) { closed = true; break } }
      j++
    }
    if (!closed) {
      // Objet JSON tronqué (graphique coupé). On remplace par une note propre,
      // PUIS on reprend après le bloc tronqué (au prochain saut de paragraphe /
      // titre) pour NE PAS perdre le contenu qui suit (ex. la question suivante).
      result.push({ type: 'text', content: '\n📊 (figure)\n' })
      const after = text.slice(jsonStart)
      const rel = after.search(/\n\s*\n|\n#{1,3}\s|\n>/)
      if (rel === -1) break
      i = jsonStart + rel
      continue
    }
    // Objet complet : on récupère le graphe même si le ']' final manque
    const closeBracket = text.indexOf(']', j)
    result.push({ type: 'graph', content: text.slice(jsonStart, j + 1) })
    i = (closeBracket === -1 ? j + 1 : closeBracket + 1)
  }
  return result
}

// Retire un éventuel bloc [GRAPH:{...}] tronqué (JSON non refermé) d'une réponse,
// pour qu'un graphique coupé n'avale jamais le contenu suivant lors de l'assemblage.
function stripIncompleteGraph(text: string): string {
  let out = ''
  let i = 0
  const tag = '[GRAPH:'
  while (i < text.length) {
    const idx = text.indexOf(tag, i)
    if (idx === -1) { out += text.slice(i); break }
    const jsonStart = text.indexOf('{', idx + tag.length)
    if (jsonStart === -1) { out += text.slice(i, idx); break }
    let depth = 0, j = jsonStart, closed = false
    while (j < text.length) {
      if (text[j] === '{') depth++
      else if (text[j] === '}') { depth--; if (depth === 0) { closed = true; break } }
      j++
    }
    if (!closed) { out += text.slice(i, idx).replace(/\s*$/, '') ; break }  // graphe tronqué → on coupe ici
    const cb = text.indexOf(']', j)
    out += text.slice(i, cb === -1 ? j + 1 : cb + 1)
    i = (cb === -1 ? j + 1 : cb + 1)
  }
  return out
}
function renderLatexLine(line: string): string {
  // Remplace $$...$$ (block) puis $...$ (inline) par du HTML KaTeX
  // On utilise une approche simple : convertir en HTML via pattern matching
  let result = line

  // Convertir les délimiteurs \[...\] et \(...\) en $$...$$ / $...$ (rendus ensuite)
  result = result
    .replace(/\\\[/g, () => '$$')
    .replace(/\\\]/g, () => '$$')
    .replace(/\\\(/g, () => '$')
    .replace(/\\\)/g, () => '$')

  // Bold markdown → HTML
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e2e8f0;font-weight:700">$1</strong>')

  // $$...$$ → formule bloc centrée
  result = result.replace(/\$\$([^$]+?)\$\$/g, (_: string, math: string) => {
    try {
      // @ts-ignore
      return `<span class="katex-block" style="display:block;text-align:center;margin:10px 0;font-size:15px">${(window as any).katex?.renderToString(math.trim(), {throwOnError:false,displayMode:true}) ?? math}</span>`
    } catch { return math }
  })

  // $...$ → formule inline
  result = result.replace(/\$([^$\n]+?)\$/g, (_: string, math: string) => {
    try {
      // @ts-ignore
      return (window as any).katex?.renderToString(math.trim(), {throwOnError:false,displayMode:false}) ?? math
    } catch { return math }
  })

  // Retirer les éventuels '$' résiduels (délimiteurs non appariés) pour ne jamais les afficher
  result = result.replace(/\$/g, '')

  return result
}

function LatexLine({ line, style }: { line: string; style?: React.CSSProperties }) {
  const html = renderLatexLine(line)
  return <span dangerouslySetInnerHTML={{ __html: html }} style={style} />
}

function RichText({ text }: { text: string }) {
  const segments = parseGraphSegments(text)
  return (
    <div style={{ lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
      {/* KaTeX CSS chargé dynamiquement */}
      <KaTeXLoader />
      {segments.map((seg, idx) => {
        if (seg.type === 'graph') {
          try {
            const parsed = JSON.parse(seg.content)
            return <div key={idx} className="graph-capture" data-graph-idx={segments.slice(0, idx).filter(s => s.type === 'graph').length}><SmartGraph spec={parsed} /></div>
          } catch(parseErr) {
            // Tentative de réparation JSON simple (guillemets manquants, trailing comma)
            try {
              const fixed = seg.content
                .replace(/,\s*}/g, '}')           // trailing comma
                .replace(/,\s*]/g, ']')           // trailing comma dans array
                .replace(/([{,]\s*)(\w+):/g, '$1"$2":')  // clés sans guillemets
              const parsed = JSON.parse(fixed)
              return <div key={idx} className="graph-capture" data-graph-idx={segments.slice(0, idx).filter(s => s.type === 'graph').length}><SmartGraph spec={parsed} /></div>
            } catch {
              return (
                <div key={idx} style={{ fontSize: 11, color: '#fcd34d', padding: '8px 12px', background: 'rgba(245,158,11,0.08)', borderRadius: 8, margin: '6px 0', fontFamily:'monospace' }}>
                  📊 Graphique — expression IA non parseable. Relancez la résolution.
                </div>
              )
            }
          }
        }
        return seg.content ? (
          <div key={idx}>
            {seg.content.split('\n').map((ln, j) => {
              if (!ln.trim()) return <div key={j} style={{ height: 7 }} />
              if (ln.startsWith('## ')) return (
                <h3 key={j} style={{ fontSize: 15, fontWeight: 700, color: '#818cf8', marginTop: 22, marginBottom: 8, borderBottom: '1px solid rgba(99,102,241,0.2)', paddingBottom: 5 }}>
                  <LatexLine line={ln.slice(3)} />
                </h3>
              )
              if (ln.startsWith('### ')) return (
                <h4 key={j} style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', marginTop: 16, marginBottom: 6 }}>
                  <LatexLine line={ln.slice(4)} />
                </h4>
              )
              if (ln.startsWith('> ')) return (
                <blockquote key={j} style={{ margin: '10px 0', padding: '10px 16px', borderLeft: '3px solid #4f6ef7', background: 'rgba(79,110,247,0.08)', borderRadius: '0 8px 8px 0', color: '#a5b4fc', fontSize: 13 }}>
                  <LatexLine line={ln.slice(2)} />
                </blockquote>
              )
              if (ln.startsWith('- ')) return (
                <p key={j} style={{ margin: '3px 0', paddingLeft: 18, position: 'relative', fontSize: 13 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#4f6ef7', fontWeight: 700 }}>›</span>
                  <LatexLine line={ln.slice(2)} />
                </p>
              )
              if (ln.match(/^\d+\.\s/)) return (
                <p key={j} style={{ margin: '4px 0', paddingLeft: 24, fontSize: 13, position: 'relative' }}>
                  <strong style={{ position: 'absolute', left: 0, color: '#4f6ef7' }}>{ln.split(/\.\s/)[0]}.</strong>
                  <LatexLine line={ln.replace(/^\d+\.\s/, '')} />
                </p>
              )
              // Ligne normale avec LaTeX
              return (
                <p key={j} style={{ margin: '2px 0', fontSize: 13 }}>
                  <LatexLine line={ln} />
                </p>
              )
            })}
          </div>
        ) : null
      })}
    </div>
  )
}

// Charge KaTeX CSS + JS une seule fois
function KaTeXLoader() {
  useEffect(() => {
    if ((window as any).__katexLoaded) return
    ;(window as any).__katexLoaded = true
    // CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css'
    document.head.appendChild(link)
    // JS
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js'
    script.onload = () => { (window as any).__katexReady = true }
    document.head.appendChild(script)
  }, [])
  return null
}

// ══════════════════════════════════════════════════════════════════════
// PDF COLORÉ
// ══════════════════════════════════════════════════════════════════════
function buildSolutionHtml(exercise: string, solution: string, mode: string, preRenderedBody?: string, action: 'print' | 'download' = 'print'): string {
  const date = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
  const modeLabel = mode === 'verify' ? 'Vérification de solution' : 'Résolution complète'
  const icon = mode === 'verify' ? '🔍' : '🧮'

  const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

  // Convertit une ligne markdown+LaTeX en HTML
  // Préserve les formules $...$ et $$...$$ sans les échapper
  function escPreservingLatex(s: string): string {
    // Découpe la ligne en segments: texte normal et formules LaTeX
    const parts: string[] = []
    let i = 0
    while (i < s.length) {
      // $$...$$
      if (s[i] === '$' && s[i+1] === '$') {
        const end = s.indexOf('$$', i+2)
        if (end > i) { parts.push(s.slice(i, end+2)); i = end+2; continue }
      }
      // $...$
      if (s[i] === '$') {
        const end = s.indexOf('$', i+1)
        if (end > i && !s.slice(i+1,end).includes('\n')) { parts.push(s.slice(i, end+1)); i = end+1; continue }
      }
      // Texte normal — trouver le prochain $
      const nextDollar = s.indexOf('$', i)
      const chunk = nextDollar > i ? s.slice(i, nextDollar) : s.slice(i)
      parts.push(esc(chunk).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'))
      i += chunk.length
      if (nextDollar <= i && nextDollar > -1) continue
      break
    }
    return parts.join('')
  }

  function convertLine(ln: string): string {
    // Ignorer les graphiques
    if (ln.match(/^\[GRAPH:/)) return '<div class="graph-note">📊 Voir le graphique dans l&#39;application mathbac.ai : http://app.mathsbac.com</div>'
    // Titres
    if (ln.startsWith('## '))  return `<h2>${escPreservingLatex(ln.slice(3))}</h2>`
    if (ln.startsWith('### ')) return `<h3>${escPreservingLatex(ln.slice(4))}</h3>`
    if (ln.startsWith('#### ')) return `<h4 style="font-size:13px;font-weight:700;margin:12px 0 4px">${escPreservingLatex(ln.slice(5))}</h4>`
    // Blockquote → résultat encadré
    if (ln.startsWith('> '))   return `<div class="result">${escPreservingLatex(ln.slice(2))}</div>`
    // Liste à puces
    if (ln.startsWith('- '))   return `<li>${escPreservingLatex(ln.slice(2))}</li>`
    // Tableau markdown → garder tel quel pour KaTeX
    if (ln.startsWith('|'))    return `<div class="tbl-row">${escPreservingLatex(ln)}</div>`
    // Ligne vide
    if (!ln.trim())            return '<div class="spacer"></div>'
    // Ligne normale
    return `<p>${escPreservingLatex(ln)}</p>`
  }

  const bodyLines = preRenderedBody ?? solution.split('\n').map(convertLine).join('\n')

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>mathbac.ai — ${modeLabel}</title>
<!-- KaTeX CSS pour les formules pré-rendues -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #fff;
    color: #1a1a2e;
    font-size: 14px;
    line-height: 1.85;
  }
  .page { max-width: 800px; margin: 0 auto; padding: 32px 40px 60px; }

  /* EN-TÊTE */
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    border: 2px solid #1a1a2e;
    border-radius: 4px;
    margin-bottom: 24px;
    overflow: hidden;
  }
  .header-left { padding: 18px 24px; }
  .brand { font-size: 13px; font-weight: 800; color: #4f6ef7; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 2px; }
  .brand-url { font-size: 10px; font-weight: 600; color: #4f6ef7; margin-bottom: 6px; text-decoration: none; }
  .htitle { font-size: 20px; font-weight: 800; color: #1a1a2e; margin-bottom: 2px; }
  .hsub { font-size: 12px; color: #666; }
  .header-right {
    background: #1a1a2e;
    color: #fff;
    padding: 18px 24px;
    text-align: right;
    font-size: 12px;
    line-height: 1.7;
  }
  .header-right strong { font-size: 13px; }

  /* EXERCICE */
  .ex-box {
    border: 1px solid #1a1a2e;
    border-left: 4px solid #4f6ef7;
    border-radius: 0 6px 6px 0;
    padding: 14px 18px;
    margin-bottom: 20px;
    background: #f8f9ff;
    font-size: 13.5px;
    color: #1a1a2e;
    white-space: pre-wrap;
  }
  .ex-label { font-size: 10px; font-weight: 700; color: #4f6ef7; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 8px; }

  /* SOLUTION */
  .sol-box {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 20px 24px;
    margin-bottom: 20px;
  }
  .sol-label { font-size: 10px; font-weight: 700; color: #1a1a2e; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 14px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }

  /* CONTENU */
  h2 { font-size: 15px; font-weight: 700; color: #4f6ef7; margin: 20px 0 8px; border-bottom: 1px solid #e0e7ff; padding-bottom: 5px; }
  h3 { font-size: 14px; font-weight: 700; color: #1a1a2e; margin: 14px 0 6px; }
  p { margin: 4px 0; font-size: 13.5px; }
  li { margin: 3px 0 3px 20px; font-size: 13.5px; list-style-type: disc; }
  .result {
    background: #f0f4ff;
    border: 1px solid #c7d4f5;
    border-left: 4px solid #4f6ef7;
    border-radius: 0 6px 6px 0;
    padding: 10px 16px;
    margin: 10px 0;
    font-weight: 600;
    color: #1e1b4b;
    font-size: 14px;
  }
  .tbl-row { font-family: monospace; font-size: 12px; white-space: pre; color: #444; }
  .spacer { height: 8px; }
  .graph-note { color: #6366f1; font-size: 12px; font-style: italic; padding: 6px 10px; background: #f0f4ff; border-radius: 6px; margin: 8px 0; }
  .graph-img { text-align: center; margin: 14px 0; }
  .graph-img img { max-width: 100%; height: auto; border: 1px solid #e2e8f0; border-radius: 8px; background: #0f1020; }

  /* KaTeX display override pour l'impression */
  .katex-display { margin: 10px 0 !important; overflow-x: auto; }
  .katex { font-size: 1em !important; }
  .katex-display-wrap { display: block; text-align: center; margin: 10px 0; overflow-x: auto; }
  .katex-display { margin: 0 !important; }

  /* PIED DE PAGE */
  .footer {
    margin-top: 32px;
    padding-top: 12px;
    border-top: 2px solid #1a1a2e;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #666;
  }
  .footer strong { color: #1a1a2e; }

  /* BARRE D'IMPRESSION */
  .print-bar {
    position: sticky; top: 0; z-index: 99;
    background: #fff;
    border-bottom: 2px solid #1a1a2e;
    padding: 10px 0 12px;
    margin-bottom: 20px;
    display: flex; align-items: center; gap: 12px;
  }
  .print-btn {
    background: #1a1a2e; color: #fff; border: none; border-radius: 6px;
    padding: 9px 22px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit;
  }
  @media print {
    .print-bar { display: none !important; }
    .page { padding: 10px 20px; }
    body { font-size: 13px; }
  }
</style>
</head>
<body>
<div class="page">

  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">🖨 Imprimer</button>
    <button class="print-btn" id="dl-btn" style="background:#4f6ef7">⬇️ Télécharger le PDF (couleur)</button>
    <span style="font-size:12px;color:#666">Astuce : « Télécharger » génère directement un PDF couleur. Sinon Imprimer → <strong>Enregistrer en PDF</strong> (cochez <strong>Graphiques d'arrière-plan</strong>).</span>
  </div>

  <!-- EN-TÊTE -->
  <div class="header">
    <div class="header-left">
      <div class="brand">MATHBAC.AI</div>
      <a class="brand-url" href="http://app.mathsbac.com">http://app.mathsbac.com</a>
      <div class="htitle">${icon} ${modeLabel}</div>
    </div>
    <div class="header-right">
      <strong>Date :</strong> ${date}<br>
      <strong>Section :</strong> 4ème Année
    </div>
  </div>

  <!-- EXERCICE -->
  <div class="ex-label">📝 Énoncé de l'exercice</div>
  <div class="ex-box">${esc(exercise.replace(/\\\[/g, ' ').replace(/\\\]/g, ' ').replace(/\\\(/g, ' ').replace(/\\\)/g, ' ').replace(/\$\$/g, ' ').replace(/\$/g, ''))}</div>

  <!-- SOLUTION -->
  <div class="sol-box">
    <div class="sol-label">✅ ${modeLabel} — mathbac.ai : http://app.mathsbac.com</div>
    <div id="solution-body">
${bodyLines}
    </div>
  </div>

  <!-- PIED DE PAGE -->
  <div class="footer">
    <span><strong>MATHBAC.AI</strong> · http://app.mathsbac.com</span>
    <span>Page 1/1</span>
  </div>

</div>

<script>
  function loadH2P(cb){
    if (window.html2pdf) { cb(); return; }
    var s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    s.onload=cb;
    s.onerror=function(){ alert('Téléchargement PDF indisponible (réseau). Utilisez le bouton Imprimer → Enregistrer en PDF.'); };
    document.head.appendChild(s);
  }
  function downloadPdf(){
    var bar=document.querySelector('.print-bar');
    loadH2P(function(){
      if(bar) bar.style.display='none';
      var el=document.querySelector('.page');
      window.html2pdf().set({
        margin:[8,8,10,8],
        filename:'MathBac-solution.pdf',
        image:{type:'jpeg',quality:0.98},
        html2canvas:{scale:2,backgroundColor:'#ffffff',useCORS:true},
        jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},
        pagebreak:{mode:['avoid-all','css','legacy']}
      }).from(el).save().then(function(){ if(bar) bar.style.display=''; });
    });
  }
  var dlb=document.getElementById('dl-btn'); if(dlb) dlb.addEventListener('click', downloadPdf);
  window.addEventListener('load', function(){
    ${action === 'download'
      ? 'setTimeout(downloadPdf, 450);'
      : "setTimeout(function(){ window.print(); }, 300);"}
  });
<\/script>
</body>
</html>`
}

async function openSolutionPdf(exercise: string, solution: string, mode: string, action: 'print' | 'download' = 'print', targetWin?: Window | null) {
  // Capture les graphiques DÉJÀ rendus dans la page (SVG/Plotly) en images PNG
  function ensureHtml2Canvas(): Promise<any> {
    return new Promise(res => {
      const w = window as any
      if (w.html2canvas) return res(w.html2canvas)
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
      s.onload = () => res((window as any).html2canvas)
      s.onerror = () => res(null)
      document.head.appendChild(s)
    })
  }
  async function captureGraphs(): Promise<string[]> {
    try {
      const box = document.getElementById('solution-render-box')
      if (!box) return []
      const nodes = Array.from(box.querySelectorAll('.graph-capture')) as HTMLElement[]
      if (nodes.length === 0) return []
      const h2c = await ensureHtml2Canvas()
      if (!h2c) return []
      const imgs: string[] = []
      for (const n of nodes) {
        try {
          const canvas = await h2c(n, { backgroundColor: '#0f1020', scale: 2, useCORS: true, logging: false })
          imgs.push(canvas.toDataURL('image/png'))
        } catch { imgs.push('') }
      }
      return imgs
    } catch { return [] }
  }
  const graphImgs = await captureGraphs()

  // Remplace chaque bloc [GRAPH:{...}] (multi-lignes) par un placeholder indexé
  function collapseGraphBlocks(sol: string): string {
    try {
      let gi = -1
      return parseGraphSegments(sol).map(s => s.type === 'graph' ? `\n[[GRAPHIMG:${++gi}]]\n` : s.content).join('')
    } catch { return sol }
  }
  // Pré-rendre le LaTeX avec KaTeX AVANT d'ouvrir la fenêtre
  // (utilise le KaTeX déjà chargé dans la page principale)
  function preRenderLatex(sol: string): string {
    const katex = (window as any).katex
    let collapsed = collapseGraphBlocks(sol)
    // Convertir les délimiteurs \[...\] et \(...\) en $$...$$ / $...$
    collapsed = collapsed
      .replace(/\\\[/g, () => '$$')
      .replace(/\\\]/g, () => '$$')
      .replace(/\\\(/g, () => '$')
      .replace(/\\\)/g, () => '$')

    if (!katex) {
      // Pas de KaTeX : au moins retirer les $ pour ne pas les afficher
      return collapsed.split('\n').map(convertLineForPdf).map(l => l.replace(/\$/g, '')).join('\n')
    }

    // 1) Rendre les blocs $$...$$ MÊME multi-lignes, AVANT le découpage en lignes
    const mathBlocks: string[] = []
    collapsed = collapsed.replace(/\$\$([\s\S]+?)\$\$/g, (_: string, math: string) => {
      const m = math.trim()
      // Garde-fou anti "$$ mal apparié" : un vrai bloc maths ne contient ni titre (#),
      // ni citation (>), ni ligne vide. Sinon on laisse le texte au pipeline ligne-par-ligne.
      if (/(^|\n)\s*#{1,4}\s/.test(m) || /(^|\n)\s*>\s/.test(m) || /\n\s*\n/.test(m) || m.length > 700) {
        return '\n' + m + '\n'
      }
      try {
        const html = `<div class="katex-display-wrap">${katex.renderToString(m, { throwOnError: false, displayMode: true })}</div>`
        mathBlocks.push(html)
        return `\n[[MATHBLOCK:${mathBlocks.length - 1}]]\n`
      } catch { return '\n' + m + '\n' }
    })

    // 2) Traiter ligne par ligne (titres, listes, résultats…) + inline $...$
    return collapsed.split('\n').map((ln: string) => {
      if (!ln.trim()) return '<div class="spacer"></div>'
      const mb = ln.trim().match(/^\[\[MATHBLOCK:(\d+)\]\]$/)
      if (mb) return mathBlocks[Number(mb[1])] || ''
      let processed = convertLineForPdf(ln)
      processed = processed.replace(/\$([^$\n]+?)\$/g, (_: string, math: string) => {
        try { return katex.renderToString(math.trim(), { throwOnError: false, displayMode: false }) }
        catch { return math }
      })
      // Retirer les $ résiduels (délimiteurs non appariés) pour ne jamais les afficher
      processed = processed.replace(/\$/g, '')
      return processed
    }).join('\n')
  }

  function convertLineForPdf(ln: string): string {
    const esc2 = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    function ep(s: string): string {
      // Préserver $..$ sans échapper leur contenu
      const parts: string[] = []
      let i = 0
      while (i < s.length) {
        if (s[i]==='$' && s[i+1]==='$') {
          const e=s.indexOf('$$',i+2); if(e>i){parts.push(s.slice(i,e+2));i=e+2;continue}
        }
        if (s[i]==='$') {
          const e=s.indexOf('$',i+1); if(e>i&&!s.slice(i+1,e).includes('\n')){parts.push(s.slice(i,e+1));i=e+1;continue}
        }
        const nd=s.indexOf('$',i); const chunk=nd>i?s.slice(i,nd):s.slice(i)
        parts.push(esc2(chunk).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>'))
        i+=chunk.length; if(nd<=i&&nd>-1)continue; break
      }
      return parts.join('')
    }
    const gimg = ln.match(/^\[\[GRAPHIMG:(\d+)\]\]/)
    if (gimg) {
      const im = graphImgs[Number(gimg[1])]
      return im
        ? `<div class="graph-img"><img src="${im}" alt="graphique"/></div>`
        : '<div class="graph-note">📊 Graphique interactif — disponible dans l&#39;application sur http://app.mathsbac.com</div>'
    }
    if (ln.match(/^\[GRAPH:/)) return '<div class="graph-note">📊 Graphique interactif — disponible dans l&#39;application sur http://app.mathsbac.com</div>'
    if (ln.startsWith('## '))  return `<h2>${ep(ln.slice(3))}</h2>`
    if (ln.startsWith('### ')) return `<h3>${ep(ln.slice(4))}</h3>`
    if (ln.startsWith('#### ')) return `<h4>${ep(ln.slice(5))}</h4>`
    if (ln.startsWith('> '))   return `<div class="result">${ep(ln.slice(2))}</div>`
    if (ln.startsWith('- '))   return `<li>${ep(ln.slice(2))}</li>`
    if (ln.startsWith('|'))    return `<div class="tbl-row">${ep(ln)}</div>`
    if (!ln.trim())            return '<div class="spacer"></div>'
    // Ligne d'équation SANS délimiteurs $ : si elle ressemble à du LaTeX, la rendre en bloc KaTeX
    const _k = (window as any).katex
    if (_k && !ln.includes('$') && /\\(frac|sqrt|overrightarrow|overline|widehat|vec|angle|left|right|begin|sum|int|prod|lim|cdot|times|div|pi|alpha|beta|gamma|theta|lambda|mu|Delta|nabla|partial|infty|leq|geq|neq|approx|equiv|forall|exists|mathbb|mathcal|displaystyle)\b/.test(ln)) {
      try { return `<div class="katex-display-wrap">${_k.renderToString(ln.trim(), { throwOnError: false, displayMode: true })}</div>` } catch {}
    }
    return `<p>${ep(ln)}</p>`
  }

  const preRenderedBody = preRenderLatex(solution)
  const html = buildSolutionHtml(exercise, solution, mode, preRenderedBody, action)
  const w = targetWin || window.open('', '_blank')
  if (!w) throw new Error('Popup bloqué')
  w.document.open(); w.document.write(html); w.document.close()
}

// ══════════════════════════════════════════════════════════════════════
// SYMBOLES
// ══════════════════════════════════════════════════════════════════════
const SYMBOL_GROUPS = [
  { label: 'Opérations', symbols: ['+', '−', '×', '÷', '=', '≠', '±', '√()', '∛()', '|x|'].map(s => ({ label: s, insert: s })) },
  { label: 'Analyse',    symbols: ['∫', '∫ᵃᵇ', "f'(x)", '∂', '∑', '∏', 'lim(x→)', '→', '∞', 'Δ'].map(s => ({ label: s, insert: s })) },
  { label: 'Fonctions',  symbols: ['ln()', 'log()', 'exp()', 'eˣ', 'arcsin()', 'arccos()', 'arctan()'].map(s => ({ label: s, insert: s })) },
  { label: 'Trigo',      symbols: ['sin()', 'cos()', 'tan()', 'π', '°', 'sinh()', 'cosh()'].map(s => ({ label: s, insert: s })) },
  { label: 'Exposants',  symbols: ['²', '³', 'ⁿ', '⁻¹', '₀', '₁', 'ₙ', 'ₖ'].map(s => ({ label: s, insert: s })) },
  { label: 'Comparaison',symbols: ['<', '>', '≤', '≥', '≈', '≠', '∝'].map(s => ({ label: s, insert: s })) },
  { label: 'Ensembles',  symbols: ['ℝ', 'ℤ', 'ℕ', 'ℚ', 'ℂ', '∈', '∉', '⊂', '∪', '∩', '∅', '∀', '∃'].map(s => ({ label: s, insert: s })) },
  { label: 'Géométrie',  symbols: ['u⃗', '·', '⊥', '∥', '∠', '△', '∼', '≅'].map(s => ({ label: s, insert: s })) },
  { label: 'Probas',     symbols: ['P(A)', 'P(A|B)', 'Ω', 'E(X)', 'V(X)', 'σ', 'μ'].map(s => ({ label: s, insert: s })) },
  { label: 'Logique',    symbols: ['⇒', '⟺', '∴', '∵', '¬', '∧', '∨', '½'].map(s => ({ label: s, insert: s })) },
]

function SymbolPad({ onInsert }: { onInsert: (s: string) => void }) {
  const [activeGroup, setActiveGroup] = useState(0)
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginBottom: 14 }}>
      <button onClick={() => setOpen(p => !p)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 10, border: `1px solid ${open ? 'rgba(79,110,247,0.5)' : 'rgba(255,255,255,0.1)'}`, background: open ? 'rgba(79,110,247,0.12)' : 'rgba(255,255,255,0.04)', color: open ? '#818cf8' : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}>
        <span style={{ fontSize: 15 }}>∑</span> Tablette de symboles
        <span style={{ fontSize: 10, opacity: 0.5, marginLeft: 2 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ marginTop: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 2, padding: '8px 10px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.07)', overflowX: 'auto' }}>
            {SYMBOL_GROUPS.map((g, i) => (
              <button key={i} onClick={() => setActiveGroup(i)}
                style={{ padding: '4px 11px', borderRadius: 7, border: 'none', background: activeGroup === i ? '#4f6ef7' : 'transparent', color: activeGroup === i ? 'white' : 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'inherit' }}>
                {g.label}
              </button>
            ))}
          </div>
          <div style={{ padding: '12px 14px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {SYMBOL_GROUPS[activeGroup].symbols.map((sym, i) => (
              <button key={i} onClick={() => onInsert(sym.insert)} title={`Insérer : ${sym.insert}`}
                style={{ minWidth: 44, height: 38, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.85)', fontSize: 13, fontFamily: 'monospace', fontWeight: 600, cursor: 'pointer', transition: 'all 0.12s', padding: '0 8px' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,110,247,0.2)'; e.currentTarget.style.borderColor = '#4f6ef7'; e.currentTarget.style.color = '#818cf8' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}>
                {sym.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════
// UPLOAD FICHIER
// ══════════════════════════════════════════════════════════════════════
function FileUpload({ onExtracted }: { onExtracted: (text: string) => void }) {
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    setError(''); setFileName(file.name); setLoading(true)
    const ext = file.name.split('.').pop()?.toLowerCase()
    // Nettoie le texte importé : retire les délimiteurs LaTeX et les symboles $ (que l'utilisateur ne veut pas voir)
    const cleanImported = (t: string) => t
      .replace(/\\\[/g, ' ').replace(/\\\]/g, ' ')
      .replace(/\\\(/g, ' ').replace(/\\\)/g, ' ')
      .replace(/\$\$/g, ' ').replace(/\$/g, '')
      .replace(/[ \t]{2,}/g, ' ')
      .trim()
    try {
      if (ext === 'txt' || ext === 'md') {
        const text = await file.text(); onExtracted(cleanImported(text)); setLoading(false); return
      }
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1]
        try {
          let text = ''
          if (ext === 'pdf') {
            const r = await fetch('/api/solve', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 6000, messages: [{ role: 'user', content: [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } }, { type: 'text', text: "Transcris INTÉGRALEMENT le texte de cet exercice de mathématiques, de la première à la dernière ligne, sans rien omettre ni résumer (toutes les questions et sous-questions). IMPORTANT : n'utilise AUCUN symbole dollar $ ni délimiteur LaTeX ($...$, \\(...\\), \\[...\\]). Écris les maths en notation lisible avec des symboles Unicode (½, √, π, ℂ, ζ, ≤, ≥, ∈, ∞, z̄ pour le conjugué, u⃗ pour les vecteurs, |z|, etc.). Aucune introduction ni commentaire." }] }] })
            })
            const d = await r.json()
            text = d.content?.map((c: any) => c.text || '').join('') || ''
          } else {
            const mediaType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'
            text = await askClaudeWithImage(
              "Transcris INTÉGRALEMENT le texte de cet exercice de mathématiques, de haut en bas, sans rien omettre (tous les énoncés, questions et sous-questions). IMPORTANT : n'utilise AUCUN symbole dollar $ ni délimiteur LaTeX. Écris les maths en notation lisible avec des symboles Unicode (½, √, π, ℂ, ζ, ≤, ≥, ∈, ∞, z̄ pour le conjugué, u⃗ pour les vecteurs, |z|, etc.). Retourne UNIQUEMENT le texte transcrit, sans commentaire.",
              'Tu es un OCR mathématique précis et exhaustif.', base64, mediaType, 6000
            )
          }
          onExtracted(cleanImported(text))
        } catch { setError('Erreur de lecture. Vérifie ta clé API dans .env.local') }
        setLoading(false)
      }
      reader.readAsDataURL(file)
    } catch { setError('Erreur fichier.'); setLoading(false) }
  }, [onExtracted])

  return (
    <div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
        📎 Importer un exercice
      </div>

      {/* ── Bouton photo caméra mobile ─────────────────────── */}
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
      <button
        onClick={() => !loading && cameraRef.current?.click()}
        disabled={loading}
        style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'12px', borderRadius:12, marginBottom:10, border:'1px solid rgba(6,214,160,0.35)', background:'rgba(6,214,160,0.08)', color: loading ? 'rgba(255,255,255,0.3)' : '#06d6a0', fontSize:14, fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer', transition:'all 0.2s', fontFamily:'inherit' }}
        onMouseEnter={e => { if(!loading){e.currentTarget.style.background='rgba(6,214,160,0.15)';e.currentTarget.style.borderColor='rgba(6,214,160,0.6)'}}}
        onMouseLeave={e => {e.currentTarget.style.background='rgba(6,214,160,0.08)';e.currentTarget.style.borderColor='rgba(6,214,160,0.35)'}}
      >
        <span style={{ fontSize:20 }}>📸</span>
        {loading ? 'Analyse en cours...' : "Prendre une photo de l'exercice"}
      </button>

      {/* ── Zone drag & drop fichier ───────────────────────── */}
      <div
        onClick={() => !loading && inputRef.current?.click()}
        onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        style={{ border:`2px dashed ${dragging ? '#4f6ef7' : 'rgba(255,255,255,0.12)'}`, borderRadius:12, padding:'16px', textAlign:'center', cursor: loading ? 'wait' : 'pointer', background: dragging ? 'rgba(79,110,247,0.08)' : 'rgba(255,255,255,0.03)', transition:'all 0.2s' }}>
        <input ref={inputRef} type="file" accept=".txt,.md,.pdf,.png,.jpg,.jpeg,.webp" style={{ display:'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
        {loading ? (
          <div style={{ color:'#818cf8', fontSize:13 }}>
            <div style={{ fontSize:22, marginBottom:4, display:'inline-block', animation:'spin 1s linear infinite' }}>⟳</div>
            <div>Extraction OCR...</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize:24, marginBottom:4 }}>{fileName ? '✅' : '📁'}</div>
            <div style={{ fontSize:13, fontWeight:600, color: fileName ? '#06d6a0' : 'rgba(255,255,255,0.5)', marginBottom:3 }}>
              {fileName || 'Ou dépose un fichier ici'}
            </div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.25)' }}>.txt · .pdf · .png · .jpg · .webp</div>
          </>
        )}
      </div>
      {error && (
        <div style={{ marginTop:8, fontSize:11, color:'#ef4444', background:'rgba(239,68,68,0.08)', padding:'6px 10px', borderRadius:8 }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════
type Mode = 'solve' | 'verify'
type Phase = 'input' | 'solving' | 'done'
interface HistoryItem {
  id: string; exercise: string; solution: string
  mode: Mode; timestamp: string  // string pour localStorage
}

// ── Persistance localStorage ──────────────────────────
const SOLVE_HISTORY_PREFIX = 'bacai_solve_history_' 
const SOLVE_HISTORY_LEGACY_KEY = 'bacai_solve_history'
const MAX_SOLVE_HISTORY = 30

function getSolveHistoryKey(userId?: string): string {
  return userId ? `${SOLVE_HISTORY_PREFIX}${userId}` : `${SOLVE_HISTORY_PREFIX}guest`
}

function migrateSolveHistory(userId?: string): void {
  const newKey = getSolveHistoryKey(userId)
  if (localStorage.getItem(newKey)) return
  const legacyValue = localStorage.getItem(SOLVE_HISTORY_LEGACY_KEY)
  if (!legacyValue) return
  try {
    const parsed = JSON.parse(legacyValue)
    if (Array.isArray(parsed)) {
      localStorage.setItem(newKey, JSON.stringify(parsed.slice(0, MAX_SOLVE_HISTORY)))
    }
  } catch {}
}

function saveSolveHistory(items: HistoryItem[], userId?: string): void {
  try { localStorage.setItem(getSolveHistoryKey(userId), JSON.stringify(items.slice(0, MAX_SOLVE_HISTORY))) }
  catch {}
}

function loadSolveHistory(userId?: string): HistoryItem[] {
  try {
    migrateSolveHistory(userId)
    return JSON.parse(localStorage.getItem(getSolveHistoryKey(userId)) || '[]')
  }
  catch { return [] }
}

function deleteSolveItem(id: string, current: HistoryItem[], userId?: string): HistoryItem[] {
  const updated = current.filter(h => h.id !== id)
  saveSolveHistory(updated, userId)
  return updated
}

// ══════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ══════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE — avec quotas Supabase
// ══════════════════════════════════════════════════════════════════════
function SolvePageInner() {
  const { user, isAdmin, hasActiveSubscription, checkQuota, incrementQuota, quotas, quotaLimits, isSprint, matiereActive, quotaVersion, refreshSubscription, activeMatieres, checkMatiereAccess } = useAuth()

  const [mode, setMode] = useState<Mode>('solve')
  const searchParams = useSearchParams()
  const [input, setInput] = useState(() => {
    // Pré-remplir depuis ?q= (venant d'une page chapitre)
    const q = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('q') : null
    return q ? decodeURIComponent(q) : ''
  })
  const [myAnswer, setMyAnswer] = useState('')
  // Matière détectée depuis ?subject= (physique | informatique | maths)
  const [subject] = useState<'maths'|'physique'|'informatique'|'svt'|'anglais'|'litterature'>(() => {
    if (typeof window === 'undefined') return 'maths'
    const s = new URLSearchParams(window.location.search).get('subject') || ''
    const valid = ['physique','informatique','svt','anglais','litterature']
    return valid.includes(s) ? s as any : 'maths'
  })
  const [phase, setPhase] = useState<Phase>('input')

  // ── Sélecteur de matière ────────────────────────────────────────
  // Détection programme pour ÉCO uniquement : abonnement éco-gestion → France (1 matière) ;
  // sinon → Tunisie (économie + gestion). Admin voit les 3 pour pouvoir tester.
  // Les 6 autres matières sont universelles (mêmes pour tous les programmes).
  const isFranceEco = (activeMatieres as string[] | undefined || []).includes('eco-gestion')
  const MATIERE_LIST_SOLVE = [
    { key: 'mathematiques', label: 'Maths',    icon: '🧮', color: '#f59e0b' },
    { key: 'physique',      label: 'Physique',  icon: '⚗️', color: '#06d6a0' },
    { key: 'svt',           label: 'SVT',       icon: '🧬', color: '#10b981' },
    { key: 'anglais',       label: 'Anglais',   icon: '🇬🇧', color: '#f43f5e' },
    { key: 'informatique',  label: 'Info',      icon: '💻', color: '#8b5cf6' },
    { key: 'litterature',   label: 'Français',  icon: '🇫🇷', color: '#e879f9' },
    ...(isAdmin
      ? [{ key: 'economie', label: 'Économie', icon: '📈', color: '#06b6d4' },
         { key: 'gestion',   label: 'Gestion',  icon: '💼', color: '#f43f5e' },
         { key: 'eco-gestion', label: 'Éco-Gestion', icon: '📊', color: '#14b8a6' }]
      : isFranceEco
      ? [{ key: 'eco-gestion', label: 'Éco-Gestion', icon: '📊', color: '#14b8a6' }]
      : [{ key: 'economie', label: 'Économie', icon: '📈', color: '#06b6d4' },
         { key: 'gestion',   label: 'Gestion',  icon: '💼', color: '#f43f5e' }]),
  ]

  const [selectedMatiere, setSelectedMatiere] = useState<string>(() => {
    // Priorité : URL ?subject= → mathematiques par défaut
    // NE PAS utiliser matiereActive ici (1 seule matière) — laisser l'utilisateur choisir
    if (typeof window !== 'undefined') {
      const s = new URLSearchParams(window.location.search).get('subject')
      if (s && ['physique','informatique','svt','anglais','litterature','economie','gestion','eco-gestion'].includes(s)) return s
    }
    return 'mathematiques'
  })

  // Sync à la connexion : sélectionner la matière de l'abonnement SEULEMENT si
  // l'utilisateur n'a qu'un seul abonnement actif (pas de multi-abonnements)
  useEffect(() => {
    if (matiereActive && activeMatieres.length === 1) {
      setSelectedMatiere(matiereActive)
    }
    // Si multi-abonnements → ne pas forcer, laisser 'mathematiques' ou le choix de l'URL
  }, [matiereActive, activeMatieres])
  const [solution, setSolution] = useState('')
  const [error, setError] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [similarQ, setSimilarQ] = useState<string[]>([])
  const [pdfMsg, setPdfMsg] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [passNum, setPassNum] = useState(0)
  const [attachments, setAttachments] = useState<{ data: string; mediaType: string; name: string }[]>([])

  useEffect(() => {
    setHistory(loadSolveHistory(user?.id ?? undefined))
  }, [user?.id])

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll et focus si exercice pré-rempli depuis une page chapitre
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q    = params.get('q')
    const year = params.get('year')
    const sess = params.get('session')
    const subj = params.get('subject')
    if ((q || year) && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        textareaRef.current?.focus()
      }, 300)
    }
    // Remplir automatiquement si year+session fournis (depuis page examens)
    if (year && sess && subj && !q) {
      const label = subj === 'physique' ? 'Physique-Chimie' : subj === 'informatique' ? 'Informatique' : 'Maths'
      const section = params.get('section') || ''
      const sectionLabel = section.includes('exp') ? 'Sciences Expérimentales' : section.includes('tech') ? 'Sciences Techniques' : section.includes('info') ? 'Informatique' : section.includes('math') ? 'Mathématiques' : section
      const msg = 'Corrige l\'examen de ' + label
        + ' — Bac Tunisie ' + year
        + ' — ' + (sess === 'principale' ? 'Session Principale' : 'Session de Contrôle')
        + (sectionLabel ? ' — Section ' + sectionLabel : '')
        + '.\n\nVeuillez consulter le sujet officiel sur bacweb.tn :\nhttp://www.bacweb.tn/bac/' + year + '/' + sess + '/' + section.replace('-phys','').replace('-math','') + '/physique.pdf'
        + '\n\nEnsuite, corrigez chaque exercice de façon complète et détaillée.'
      setInput(msg)
    }
  }, [])
  const solutionRef = useRef<HTMLDivElement>(null)

  // solverUsed recalculé à chaque render — quotaVersion force re-render après loadQuotas
  const _totalQuota  = sumQuotasAcrossMatiere(quotas as any)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _qv = quotaVersion // Lire quotaVersion pour déclencher re-render quand quotas change
  const solverUsed   = _totalQuota.solver_used || 0
  const solverLimit = quotaLimits.solver_per_week
  // Pour les abonnements non-Maths (Anglais, Physique...) : utiliser quota cumulé
  const _effectiveLimit = solverLimit || (hasActiveSubscription ? 20 : 0)
  const isQuotaFull     = !isAdmin && !hasActiveSubscription
    ? true
    : !isAdmin && _effectiveLimit > 0 && solverUsed >= _effectiveLimit
  const quotaRemaining  = isAdmin || solverLimit === -1
    ? 999
    : Math.max(0, _effectiveLimit - solverUsed)
  const isUnlimited     = isAdmin || isSprint || solverLimit === -1

  const insertSymbol = useCallback((sym: string) => {
    const ta = textareaRef.current
    if (!ta) { setInput(p => p + sym); return }
    const start = ta.selectionStart; const end = ta.selectionEnd
    const newVal = input.slice(0, start) + sym + input.slice(end)
    setInput(newVal)
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + sym.length, start + sym.length) }, 10)
  }, [input])

  const addAttachment = (file: File) => {
    if (!file) return
    const okTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf']
    const mediaType = file.type === 'image/jpg' ? 'image/jpeg' : file.type
    if (!okTypes.includes(file.type)) { setError('Pièce jointe : formats acceptés = image (PNG, JPG, WEBP) ou PDF.'); return }
    if (file.size > 8 * 1024 * 1024) { setError('Pièce jointe trop lourde (max 8 Mo).'); return }
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = ((e.target?.result as string) || '').split(',')[1]
      if (base64) setAttachments(prev => [...prev, { data: base64, mediaType, name: file.name }].slice(0, 4))
    }
    reader.readAsDataURL(file)
  }
  const removeAttachment = (i: number) => setAttachments(prev => prev.filter((_, idx) => idx !== i))

  const handleSolve = async () => {
    if (!input.trim()) return

    // Vérifier accès matière selon abonnement
    if (!isAdmin && hasActiveSubscription) {
      const _matCheck = selectedMatiere === 'litterature' ? 'francais' : selectedMatiere
      if (!checkMatiereAccess(_matCheck as any)) {
        const allowed = (activeMatieres as string[]).map((m: string) => {
          const found = MATIERE_LIST_SOLVE.find(x => x.key === m)
          return found ? found.icon + ' ' + found.label : m
        }).join(', ')
        setError('🔒 Accès limité — Votre abonnement couvre : ' + allowed + '\nSélectionnez la bonne matière dans le menu ci-dessus.')
        return
      }
    }

    // Vérifier quota via AuthContext (Supabase)
    // Pour les abonnements Anglais/Physique/etc. : checkQuota peut retourner false
    // si quotaLimits.solver_per_week n'est pas défini pour cette matière.
    // On contourne : si l'utilisateur a un abonnement actif, on lui donne accès au solveur
    // en utilisant le quota cumulé toutes matières (sumQuotasAcrossMatiere).
    const _hasAnyActiveSub = hasActiveSubscription
    const _quotaOk = isAdmin || _hasAnyActiveSub
      ? (solverLimit === -1 || solverUsed < (solverLimit || 20))
      : checkQuota('solver')
    if (!isAdmin && !_quotaOk) {
      alert(`Quota atteint — ${solverUsed}/${solverLimit || 20} résolutions cette semaine.\nRenouvellement lundi prochain.\n\n📚 MathBac Mensuel : 60 DT/mois · 20/sem (🇹🇳) | 19€/mois · 20/sem (🇫🇷)\n🚀 Sprint Bac : 90 DT/mois · Illimité (🇹🇳) | 29€/mois · Illimité (🇫🇷)\n🎓 Annuel : 600 DT (🇹🇳) | 199€ (🇫🇷)\n\n→ mathsbac.com/abonnement`)
      return
    }

    setPhase('solving'); setSolution(''); setError(''); setSimilarQ([])
    setStreaming(true); setPassNum(0)
    console.log('[Solve] ▶ démarrage — version v6 (2 niveaux : question + sous-question)')

    // ─── Détecter la matière depuis URL ?subject= ──────────────────────
    // Utiliser selectedMatiere (UI) au lieu de l'URL
    const activeSubj: 'maths'|'physique'|'informatique'|'svt'|'anglais'|'litterature'|'economie'|'gestion'|'eco-gestion' =
      (['physique','informatique','svt','anglais','litterature','economie','gestion','eco-gestion'].includes(selectedMatiere)
        ? selectedMatiere : 'maths') as any

    // ─── Infixe commun aux 3 system prompts ─────────────────────────────────
    const COMMON_FORMAT = `
Structure : ## pour les grandes parties, ### pour les sous-questions.
**gras** pour les résultats clés, > pour les encadrés importants.`

    const SYSTEM_MATHS = `Tu es un professeur expert du Bac Tunisie, spécialiste en mathématiques.
Tu rédiges des corrections EXHAUSTIVES, ULTRA-DETAILLEES et PEDAGOGIQUES.
Ne résume JAMAIS. Développe TOUT. Tu as suffisamment de tokens — utilise-les entièrement.
${COMMON_FORMAT}
NOTATION MATHÉMATIQUE OBLIGATOIRE — LaTeX strict :
- Toutes les formules DOIVENT être en LaTeX : $formule$ pour inline, $$formule$$ pour centré
- JAMAIS écrire "frac(2,5)" ou "2/5" brut — TOUJOURS $\\frac{2}{5}$
- JAMAIS écrire "E(X) = -2/5" — TOUJOURS $E(X) = -\\frac{2}{5}$
- Fractions : $\\frac{num}{den}$ · Racines : $\\sqrt{x}$ · Puissances : $x^{2}$ · Indices : $x_{n}$
- Intégrales : $\\int_{a}^{b} f(x)\\,dx$ · Sommes : $\\sum_{i=1}^{n}$ · Limites : $\\lim_{x \\to 0}$
- Probabilités : $P(X = k)$, $\\binom{n}{k}$, $\\frac{1}{10}$
- Résultats encadrés : > **Résultat :** $$formule$$
- Les tableaux de loi de probabilité avec | xi | ... | p(xi) | ... |

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

QUAND UTILISER — RÈGLES ABSOLUES (AUCUNE EXCEPTION) :
- FONCTION f(x) (étude, dérivée, extremum, convexité, tableau de variations) → graphique "function" OBLIGATOIRE avec f ET f' tracées
- INTERPRÉTATION GRAPHIQUE demandée → graphique AVEC les courbes tracées, jamais un repère vide
- LIMITE (x→+∞, x→0±) → graphique "function" montrant les asymptotes et le comportement
- INTÉGRALE → graphique "function" avec la courbe ET l'aire colorée entre les bornes (utilise "fill":true si possible)
- SUITE (uₙ) → graphique "function" des premiers termes + droite y=L si convergente
- PROBABILITÉS avec loi continue (normale, exponentielle) → graphique "function" de la densité
- TRIANGLE, cercle, polygone, géométrie → type "geometry" avec {"type":"axes"} + {"type":"grid"} + TOUTES les formes nommées
- VECTEURS, repère → type "geometry" avec "axes" + chaque vecteur en "vector"
- TABLEAU DE SIGNE → représenter graphiquement la fonction pour illustrer les signes

EXEMPLES CORRECTS — interprétation graphique :
f(x) = 2x³ - 3x² - 12x + 5 → TRACER les deux courbes :
[GRAPH: {"type":"function","expressions":["2*x*x*x - 3*x*x - 12*x + 5","6*x*x - 6*x - 12"],"xMin":-3,"xMax":4,"labels":["f(x) = 2x³-3x²-12x+5","f\'(x) = 6x²-6x-12"],"title":"Courbe de f et sa dérivée","xLabel":"x","yLabel":"y","colors":["#6366f1","#f59e0b"]}]

RÈGLE CRITIQUE : quand on te demande "interpréter graphiquement" ou "représenter" → JAMAIS un repère vide — TOUJOURS les courbes/points tracés avec les bonnes expressions JS`

    const SYSTEM_PHYSIQUE = `Tu es un professeur expert du Bac (Tunisie ET France), spécialiste en PHYSIQUE-CHIMIE.
Tu rédiges des corrections EXHAUSTIVES, ULTRA-DETAILLEES et PEDAGOGIQUES.
Ne résume JAMAIS. Développe TOUT. Tu as suffisamment de tokens — utilise-les entièrement.
${COMMON_FORMAT}

NOTATION SCIENTIFIQUE — LaTeX strict :
- Formules : $formule$ inline, $$formule$$ centré
- Unités SI : $\\mathrm{mol \\cdot L^{-1}}$, $\\mathrm{m \\cdot s^{-2}}$, $\\mathrm{V}$, $\\mathrm{\\Omega}$, $\\mathrm{Hz}$, $\\mathrm{J}$
- Constantes : $k_a$, $K_e = 10^{-14}$, $\\lambda$, $\\omega_0$, $T_{1/2}$, $\\tau$, $\\tau_f$
- Vecteurs : $\\vec{F}$, $\\vec{a}$, $\\vec{v}$, $\\vec{p}$ — Dérivées : $\\frac{dq}{dt}$, $\\frac{d^2x}{dt^2}$
- Résultats encadrés : > **Résultat :** $$valeur\ \\mathrm{unité}$$

PROGRAMME COMPLET PHYSIQUE-CHIMIE (Bac Tunisie + Bac France) :
**Chimie :** cinétique (vitesse, ordre, Ka, Arrhenius), acide-base (pH, pKa, tampons, titrage), oxydoréduction (pile, Nernst, électrolyse, Faraday), équilibres (Kéq, Qr, Le Chatelier), chimie organique (estérification, polymères, groupes fonctionnels).
**Physique Électricité :** condensateur (q=Cu, Ec=½Cu²), dipôles RC/RL (τ=RC, τ=L/R), RLC libre/forcé (ω₀=1/√LC, résonance, Q), induction (Faraday, Lenz).
**Physique Mécanique :** 2ème loi de Newton (ΣF=ma), plan incliné, pendule (T=2π√(l/g)), ressort (T=2π√(m/k)), énergie cinétique/potentielle, satellites.
**Physique Ondes :** propagation (v=λf), ondes sonores, Doppler, diffraction (θ≈λ/a), interférences (Young i=λD/a), optique géométrique (lentilles, Snell-Descartes).
**Physique Nucléaire :** désintégrations α,β,γ, loi N(t)=N₀e^(-λt), t₁/₂=ln2/λ, E=Δmc².
**Thermodynamique :** transferts thermiques, Q=mcΔT, rendement, bilan énergétique.

GRAPHIQUES PHYSIQUE — OBLIGATOIRE :
Tu DOIS générer des graphiques pour :
- Circuit RC : courbe u_C(t) charge/décharge avec τ marqué
- Oscillations RLC : courbe sinusoïdale amortie
- Dosage : courbe pH=f(V) avec point équivalent
- Cinétique : courbe [A]=f(t) décroissante
- Mécanique : trajectoire, vecteurs forces sur schéma
- Ondes : courbe sinusoïdale y=A·sin(ωt)
- Pendule/ressort : schéma avec vecteurs

FORMAT GRAPHIQUE (utilise exactement ce format) :
Courbe RC charge : [GRAPH: {"type":"function","expressions":["1-Math.exp(-x)"],"xMin":0,"xMax":5,"labels":["u_C(t)/E"],"title":"Charge condensateur RC","xLabel":"t/τ","yLabel":"u_C/E"}]
Courbe RC décharge : [GRAPH: {"type":"function","expressions":["Math.exp(-x)"],"xMin":0,"xMax":5,"labels":["u_C(t)/U₀"],"title":"Décharge condensateur RC","xLabel":"t/τ","yLabel":"u_C/U₀"}]
Oscillations LC : [GRAPH: {"type":"function","expressions":["Math.cos(x)","Math.exp(-0.3*x)*Math.cos(x)"],"xMin":0,"xMax":20,"labels":["LC non amorti","RLC amorti"],"title":"Oscillations électriques libres","xLabel":"t (s)","yLabel":"u_C (V)"}]
Dosage pH : [GRAPH: {"type":"function","expressions":["14/(1+Math.exp(-0.6*(x-15)))"],"xMin":0,"xMax":30,"labels":["pH=f(V)"],"title":"Courbe de dosage pH-métrique","xLabel":"V titrant (mL)","yLabel":"pH"}]
Cinétique [A](t) : [GRAPH: {"type":"function","expressions":["Math.exp(-0.3*x)"],"xMin":0,"xMax":15,"labels":["[A]=f(t)"],"title":"Évolution concentration ordre 1","xLabel":"t (min)","yLabel":"[A] (mol/L)"}]
Ondes sinusoïdales : [GRAPH: {"type":"function","expressions":["Math.sin(x)","Math.sin(x-1.5)"],"xMin":0,"xMax":10,"labels":["source","récepteur (retard τ)"],"title":"Ondes progressives","xLabel":"t (s)","yLabel":"y (m)"}]

SCHÉMAS CIRCUITS ÉLECTRIQUES (format texte structuré) :
Pour les circuits, utilise ce format ASCII enrichi :
\`\`\`
Circuit RC série :
+E─────┤R├─────┬─────+
                    │
                  ═╪═ C
                    │
─────────────────────────
Dipôles : R=résistance, C=condensateur, L=bobine, G=générateur, A=ampèremètre, V=voltmètre
\`\`\`

SCHÉMAS MÉCANIQUES (format texte) :
\`\`\`
Plan incliné (angle θ) :
         ╱ P·sinθ (// plan)
    M ──╱──→
      ╲╱ θ   ↓ P·cosθ (⊥ plan)
       ════════════════
N ↑ (normale)    → T (tension corde)
\`\`\`

MÉTHODE OBLIGATOIRE pour chaque question :
1. Identifier la loi/formule et justifier son choix
2. Poser l'équation avec toutes les grandeurs nommées et leurs unités
3. Substituer les valeurs numériques avec unités
4. Calculer et encadrer le résultat
5. GRAPHIQUE OBLIGATOIRE si applicable — avec les VRAIES valeurs numériques calculées :
   - τ=RC calculé → utiliser Math.exp(-x/τ) avec la vraie valeur de τ dans l'expression
   - ω₀ calculé → utiliser Math.cos(ω₀*x) dans l'expression
   - [A]₀ calculée → utiliser la vraie valeur initiale dans Math.exp(-k*x)
   - JAMAIS un graphique avec des paramètres génériques quand les valeurs numériques sont connues

EXEMPLES AVEC VALEURS NUMÉRIQUES :
Circuit RC (R=1kΩ, C=1mF → τ=1s, E=10V) :
[GRAPH: {"type":"function","expressions":["10*(1-Math.exp(-x))","10*Math.exp(-x)"],"xMin":0,"xMax":5,"labels":["u_C charge (V)","u_R décharge (V)"],"title":"Circuit RC — τ=1s, E=10V","xLabel":"t (s)","yLabel":"Tension (V)"}]

Dosage acide-base (V_éq = 20 mL) :
[GRAPH: {"type":"function","expressions":["14/(1+Math.exp(-0.6*(x-20)))"],"xMin":0,"xMax":40,"labels":["pH = f(V versé)"],"title":"Dosage pH — V_éq = 20 mL","xLabel":"V NaOH versé (mL)","yLabel":"pH"}]`

    const SYSTEM_INFO = `Tu es un professeur expert du Bac Tunisie ET un ingénieur informatique senior.
Tu produis des corrections EXHAUSTIVES, ULTRA-COMPLÈTES et PÉDAGOGIQUES — les meilleures qui existent.
Ne résume JAMAIS. Développe TOUT. Chaque exercice doit être une leçon complète.
${COMMON_FORMAT}

═══════════════════════════════════════════════════════════
RÈGLES DE FORMAT ABSOLUES — TOUJOURS RESPECTÉES
═══════════════════════════════════════════════════════════

1. ALGORITHMIQUE → TOUJOURS donner :
   a) Code PASCAL complet avec commentaires
   b) Code PYTHON équivalent complet
   c) TABLEAU D'ÉVOLUTION pas à pas (itération par itération)
   d) TRACE D'EXÉCUTION si récursivité
   e) COMPLEXITÉ temporelle et spatiale avec justification

2. SQL → TOUJOURS donner :
   a) Requête complète formatée et indentée
   b) Explication de CHAQUE clause (SELECT, FROM, WHERE, JOIN, GROUP BY, HAVING, ORDER BY)
   c) TABLEAU du résultat attendu avec données fictives
   d) Alternative si elle existe (ex: NOT IN vs LEFT JOIN IS NULL vs NOT EXISTS)

3. RÉSEAUX → TOUJOURS donner :
   a) Calcul binaire détaillé du masque
   b) Tableau complet des sous-réseaux (réseau, premier hôte, dernier hôte, broadcast)
   c) Nombre d'hôtes utilisables avec formule 2^n - 2
   d) Table de routage si demandée

4. LOGIQUE BOOLÉENNE → TOUJOURS donner :
   a) Table de vérité complète
   b) Simplification algébrique étape par étape
   c) Simplification par Karnaugh si applicable
   d) Schéma de portes logiques décrit textuellement

═══════════════════════════════════════════════════════════
PROGRAMME COMPLET BAC INFORMATIQUE TUNISIE
═══════════════════════════════════════════════════════════

## ALGORITHMIQUE ET STRUCTURES DE DONNÉES

### Tri et Recherche — avec TABLEAU D'ÉVOLUTION OBLIGATOIRE
Tri à bulles : comparer paires adjacentes, permuter si nécessaire — O(n²)
Tri par insertion : insérer chaque élément à sa place — O(n²)
Tri par sélection : trouver le min et l'échanger — O(n²)
Recherche séquentielle : parcours linéaire — O(n)
Recherche dichotomique : diviser par 2 à chaque étape — O(log n)

EXEMPLE TABLEAU D'ÉVOLUTION (tri par sélection sur T=[5,3,8,1]) :
| Passe | Tableau avant | Min trouvé | Échange | Tableau après |
|-------|--------------|------------|---------|---------------|
| i=1   | [5,3,8,1]    | T[4]=1     | T[1]↔T[4] | [1,3,8,5]  |
| i=2   | [1,3,8,5]    | T[2]=3     | pas d'éch | [1,3,8,5]  |
| i=3   | [1,3,8,5]    | T[3]=5     | T[3]↔T[4] | [1,3,5,8]  |
Résultat final : [1, 3, 5, 8]

### Récursivité
- Cas de base (condition d'arrêt) + Cas récursif
- Trace d'exécution : arbre des appels récursifs
- Exemples : factorielle, Fibonacci, PGCD, puissance, tours de Hanoï

### Structures de données
Enregistrements (RECORD en Pascal, dict en Python)
Tableaux 1D et 2D
Fichiers séquentiels : RESET, REWRITE, EOF, READ, WRITE

═══════════════════════════════════════════════════════════
## PASCAL — SYNTAXE COMPLÈTE

PROGRAMME COMPLET :
\`\`\`pascal
PROGRAM NomProgramme;
USES Crt;
CONST MAX = 100;
TYPE
  TabInt = ARRAY[1..MAX] OF Integer;
  Etudiant = RECORD
    nom    : String;
    note   : Real;
    admis  : Boolean;
  END;
VAR
  T : TabInt;
  N : Integer;
  E : Etudiant;

{ ── Procédure ── }
PROCEDURE Afficher(var T: TabInt; N: Integer);
VAR i: Integer;
BEGIN
  FOR i := 1 TO N DO
    Write(T[i], ' ');
  WriteLn;
END;

{ ── Fonction ── }
FUNCTION Somme(var T: TabInt; N: Integer): Integer;
VAR i, s: Integer;
BEGIN
  s := 0;
  FOR i := 1 TO N DO
    s := s + T[i];
  Somme := s;
END;

{ ── Tri par sélection ── }
PROCEDURE TriSelection(var T: TabInt; N: Integer);
VAR i, j, iMin, tmp: Integer;
BEGIN
  FOR i := 1 TO N-1 DO
  BEGIN
    iMin := i;
    FOR j := i+1 TO N DO
      IF T[j] < T[iMin] THEN iMin := j;
    IF iMin <> i THEN
    BEGIN
      tmp    := T[i];
      T[i]   := T[iMin];
      T[iMin]:= tmp;
    END;
  END;
END;

{ ── Recherche dichotomique ── }
FUNCTION RechercheDicho(T: TabInt; N, val: Integer): Integer;
VAR g, d, m: Integer;
BEGIN
  g := 1; d := N;
  RechercheDicho := -1;
  WHILE g <= d DO
  BEGIN
    m := (g + d) DIV 2;
    IF T[m] = val THEN
    BEGIN
      RechercheDicho := m;
      EXIT;
    END
    ELSE IF T[m] < val THEN g := m + 1
    ELSE d := m - 1;
  END;
END;

BEGIN { PROGRAMME PRINCIPAL }
  ClrScr;
  { ... }
END.
\`\`\`

═══════════════════════════════════════════════════════════
## PYTHON — ÉQUIVALENT COMPLET

\`\`\`python
# Tri par sélection
def tri_selection(T):
    n = len(T)
    for i in range(n-1):
        i_min = i
        for j in range(i+1, n):
            if T[j] < T[i_min]:
                i_min = j
        if i_min != i:
            T[i], T[i_min] = T[i_min], T[i]
    return T

# Recherche dichotomique
def recherche_dicho(T, val):
    g, d = 0, len(T) - 1
    while g <= d:
        m = (g + d) // 2
        if T[m] == val:
            return m
        elif T[m] < val:
            g = m + 1
        else:
            d = m - 1
    return -1

# Fonction récursive — factorielle
def factorielle(n):
    if n == 0:   # Cas de base
        return 1
    return n * factorielle(n - 1)  # Cas récursif

# Lecture d'un enregistrement (dict Python)
def creer_etudiant(nom, note):
    return {"nom": nom, "note": note, "admis": note >= 10}
\`\`\`

═══════════════════════════════════════════════════════════
## BASES DE DONNÉES — SQL COMPLET

### Format de réponse SQL OBLIGATOIRE :

**Requête :**
\`\`\`sql
SELECT E.nom, E.prenom, COUNT(*) AS nb_emprunts
FROM ELEVE E
INNER JOIN EMPRUNT EM ON E.id_eleve = EM.id_eleve
WHERE EM.date_retour IS NULL      -- Emprunts en cours seulement
GROUP BY E.id_eleve, E.nom, E.prenom
HAVING COUNT(*) > 2               -- Filtre après agrégation
ORDER BY nb_emprunts DESC;
\`\`\`

**Explication clause par clause :**
- SELECT : colonnes affichées + COUNT(*) compte les lignes par groupe
- FROM ELEVE E : table principale avec alias E
- INNER JOIN : joint uniquement les élèves ayant des emprunts
- WHERE date_retour IS NULL : filtre AVANT le groupement (emprunts non rendus)
- GROUP BY : regroupe par élève pour appliquer COUNT
- HAVING COUNT(*) > 2 : filtre APRÈS le groupement (différent de WHERE)
- ORDER BY DESC : tri décroissant

**Tableau résultat (exemple) :**
| nom    | prenom | nb_emprunts |
|--------|--------|-------------|
| Martin | Emma   | 5           |
| Dupont | Lucas  | 3           |

**Alternatives SQL connues :**
\`\`\`sql
-- Livres jamais empruntés — 3 méthodes équivalentes :
-- Méthode 1 : LEFT JOIN + IS NULL (recommandée, performante)
SELECT L.titre FROM LIVRE L
LEFT JOIN EMPRUNT E ON L.id_livre = E.id_livre
WHERE E.id_livre IS NULL;

-- Méthode 2 : NOT EXISTS (très lisible)
SELECT titre FROM LIVRE L
WHERE NOT EXISTS (SELECT 1 FROM EMPRUNT E WHERE E.id_livre = L.id_livre);

-- Méthode 3 : NOT IN (attention aux NULL!)
SELECT titre FROM LIVRE
WHERE id_livre NOT IN (SELECT DISTINCT id_livre FROM EMPRUNT WHERE id_livre IS NOT NULL);
\`\`\`

═══════════════════════════════════════════════════════════
## RÉSEAUX — CALCUL CIDR COMPLET

### Format OBLIGATOIRE pour les sous-réseaux :

**Calcul détaillé 192.168.10.0/26 :**

Étape 1 — Masque en binaire :
/26 = 11111111.11111111.11111111.11000000 = 255.255.255.192

Étape 2 — Bits hôtes : 32 - 26 = 6 bits
Hôtes utilisables = 2^6 - 2 = 62

Étape 3 — Division en 3 sous-réseaux (/28) :
⌈log₂(3)⌉ = 2 bits supplémentaires → /28
Hôtes par sous-réseau = 2^4 - 2 = 14 | Taille bloc = 16

**Tableau complet des sous-réseaux :**
| N° | Réseau         | 1er hôte       | Dernier hôte   | Broadcast      | Hôtes |
|----|----------------|----------------|----------------|----------------|-------|
| 1  | 192.168.10.0   | 192.168.10.1   | 192.168.10.14  | 192.168.10.15  | 14    |
| 2  | 192.168.10.16  | 192.168.10.17  | 192.168.10.30  | 192.168.10.31  | 14    |
| 3  | 192.168.10.32  | 192.168.10.33  | 192.168.10.46  | 192.168.10.47  | 14    |
| 4* | 192.168.10.48  | 192.168.10.49  | 192.168.10.62  | 192.168.10.63  | 14    |
*Sous-réseau 4 = réserve disponible

═══════════════════════════════════════════════════════════
## COMPLEXITÉ — ANALYSE COMPLÈTE

Pour CHAQUE algorithme, fournir :
| Algo              | Meilleur | Moyen   | Pire    | Espace |
|-------------------|----------|---------|---------|--------|
| Tri bulles        | O(n)     | O(n²)   | O(n²)   | O(1)   |
| Tri insertion     | O(n)     | O(n²)   | O(n²)   | O(1)   |
| Tri sélection     | O(n²)    | O(n²)   | O(n²)   | O(1)   |
| Recherche séq.    | O(1)     | O(n)    | O(n)    | O(1)   |
| Recherche dicho.  | O(1)     | O(log n)| O(log n)| O(1)   |
| Récursion fact.   | O(n)     | O(n)    | O(n)    | O(n)   |

## LOGIQUE BOOLÉENNE
Table de vérité complète → Expression booléenne → Simplification Karnaugh → Schéma portes`

    const SYSTEM_SVT = `Tu es un professeur expert du Bac (Tunisie ET France), spécialiste en SVT — Sciences de la Vie et de la Terre.
Tu rédiges des corrections EXHAUSTIVES, ULTRA-DETAILLEES et PEDAGOGIQUES.
Ne résume JAMAIS. Développe TOUT. Tu as suffisamment de tokens — utilise-les entièrement.
${COMMON_FORMAT}

PROGRAMME SVT COMPLET :
**Biologie cellulaire :** ADN (double hélice, bases azotées A-T-G-C), réplication semi-conservative, transcription (ARNm), traduction (ribosomes, code génétique, ARNt), mitose (4 phases : prophase, métaphase, anaphase, télophase), méiose (2 divisions, crossing-over, gamètes haploïdes).
**Génétique :** lois de Mendel (ségrégation, assortiment indépendant), hérédité liée au sexe (chromosomes X et Y), groupes sanguins (ABO, Rh), arbres généalogiques (dominant/récessif, autosomique/gonosomique), mutations, génie génétique (PCR, électrophorèse).
**Immunologie :** immunité innée (phagocytose, inflammation), immunité adaptative (lymphocytes B → anticorps, lymphocytes T cytotoxiques), mémoire immunitaire, vaccins (actifs/passifs), greffes (compatibilité HLA, rejet), SIDA (VIH, CD4, trithérapie).
**Physiologie végétale :** photosynthèse (phase claire ATP+NADPH, phase sombre cycle Calvin), nutrition minérale, transpiration, géotropisme/phototropisme, hormones végétales (auxines, gibbérellines, cytokinines, ABA, éthylène).
**Physiologie humaine :** digestion (enzymes : amylase, lipase, pepsine, trypsine ; bile, absorption intestinale), respiration (hématose, échanges gazeux, volumes respiratoires VT/CV/VRI/VRE), circulation (cœur 4 cavités, pression systolique/diastolique, ECG : onde P/QRS/T), système nerveux (neurone : dendrites/axone/myéline, synapse chimique : NT, récepteurs, potentiel d'action, réflexe myotatique), hormones (insuline/glucagon boucle de régulation, cortisol, TSH/T3/T4, œstrogènes/progestérone/testostérone), reproduction (gamétogenèse, fécondation, développement embryonnaire).
**Géologie :** tectonique des plaques (subduction, collision, dorsales océaniques, points chauds), séismes (épicentre, foyer, ondes P/S/L), roches (magmatiques : granite/basalte ; sédimentaires ; métamorphiques), évolution (sélection naturelle Darwin, dérive génétique, spéciation allopatrique/sympatrique, phylogénèse, cladogrammes), datation (stratigraphie, fossiles stratigraphiques, radiométrie K/Ar, C14).

GRAPHIQUES SVT — OBLIGATOIRE :
Tu DOIS générer des graphiques pour :
- Courbe de croissance/décroissance population : [GRAPH: {"type":"function","expressions":["100*Math.exp(0.3*x)","100/(1+Math.exp(-0.5*(x-10)))"],"xMin":0,"xMax":20,"labels":["croissance exponentielle","croissance logistique"],"title":"Dynamique des populations","xLabel":"Temps (années)","yLabel":"Effectif N"}]
- Courbe glycémie/hormone : [GRAPH: {"type":"function","expressions":["1+0.3*Math.sin(x)","1-0.3*Math.sin(x)"],"xMin":0,"xMax":10,"labels":["Glycémie (g/L)","Insuline (µUI/mL)"],"title":"Régulation glycémique","xLabel":"Temps (h)","yLabel":"Concentration"}]
- ECG simplifié : [GRAPH: {"type":"function","expressions":["x<0.1?0:x<0.15?5*(x-0.1):x<0.2?-5*(x-0.15)+0.25:x<0.25?0:x<0.3?3*(x-0.25):x<0.35?-6*(x-0.3)+1.5:x<0.4?2*(x-0.35)-1.5:x<0.45?3*(x-0.4)-0.5:0"],"xMin":0,"xMax":0.8,"labels":["ECG"],"title":"Tracé ECG — un cycle cardiaque","xLabel":"Temps (s)","yLabel":"Potentiel (mV)"}]
- Cinétique enzymatique (Michaelis-Menten) : [GRAPH: {"type":"function","expressions":["100*x/(x+5)","100*x/(x+20)"],"xMin":0,"xMax":50,"labels":["enzyme normale (Km=5)","enzyme inhibée (Km=20)"],"title":"Cinétique enzymatique","xLabel":"[S] (mmol/L)","yLabel":"Vitesse V (µmol/min)"}]
- Courbe de survie/mortalité : [GRAPH: {"type":"function","expressions":["Math.exp(-0.1*x)","Math.exp(-0.5*x)"],"xMin":0,"xMax":20,"labels":["espèce K","espèce r"],"title":"Courbes de survie","xLabel":"Âge (années)","yLabel":"Proportion survivants"}]
- Photosynthèse/respiration : [GRAPH: {"type":"function","expressions":["2*x/(x+100)-1","1+0*(x)"],"xMin":0,"xMax":1000,"labels":["Bilan net (Pn=Pb-R)","Point de compensation"],"title":"Courbe d'activité photosynthétique","xLabel":"Éclairement (lux)","yLabel":"O₂ échangé (mL/h)"}]

SCHÉMAS SVT OBLIGATOIRES (format texte structuré) :
Pour les schémas complexes (synapse, cellule, arbre généalogique), utilise un format clair :

**Schéma synapse :**
\`\`\`
NEURONE PRÉSYNAPTIQUE
     ↓ axone
[Bouton synaptique] → vésicules de NT (ex: acétylcholine)
     ↓ exocytose (dépolarisation Ca²⁺)
═══════════════════ Fente synaptique (20-50 nm)
     ↓ liaison NT + récepteurs
[Membrane postsynaptique] → ouverture canaux ioniques
     ↓
NEURONE POSTSYNAPTIQUE (PPSE ou PPSI)
\`\`\`

**Arbre généalogique (format standard) :**
\`\`\`
Génération I :  □—◯   (□=homme sain, ◯=femme saine, ■=homme atteint, ●=femme atteinte)
                |
Génération II : □  ■  ◯  ●
\`\`\`

MÉTHODE SVT OBLIGATOIRE :
1. Définir TOUS les termes scientifiques dès leur première apparition
2. Pour chaque expérience : Hypothèse → Protocole → Résultats attendus → Conclusion
3. Exploiter les documents : décrire, analyser, interpréter, conclure (D.A.I.C.)
4. Schéma bilan OBLIGATOIRE pour : mitose/méiose, synapse, immunité, photosynthèse, régulation hormonale
5. Graphique OBLIGATOIRE si données chiffrées — avec les VRAIES valeurs des données fournies
6. Pour les courbes : utiliser les paramètres numériques fournis dans l'exercice (Km, Vmax, N₀, etc.)
7. Conclure en intégrant dans le contexte biologique global

RÈGLE GRAPHIQUE SVT : si l'exercice contient des valeurs numériques (tableau de données, mesures)
→ tracer le graphique avec ces vraies valeurs, pas des courbes génériques`

    const SYSTEM_ANGLAIS = `You are an expert English teacher for Bac students (Tunisia AND France).
You write EXHAUSTIVE, ULTRA-DETAILED and PEDAGOGICAL corrections.
NEVER summarize. Develop EVERYTHING. Use all your tokens entirely.
${COMMON_FORMAT}

ALWAYS RESPOND IN ENGLISH when the question is in English.
RESPOND IN FRENCH only if the student explicitly asks in French.

COMPLETE ENGLISH PROGRAMME — BAC TUNISIA & FRANCE :

GRAMMAR (full programme) :
- Tenses : Present Simple/Continuous/Perfect/Perfect Continuous, Past Simple/Continuous/Perfect, Future (will/going to/present continuous for future)
- Modals : can/could (ability/possibility), may/might (probability), must/have to (obligation), should/ought to (advice), would (conditional/habit), need/dare
- Conditionals : Zero (If+present,present), First (If+present,will+V), Second (If+past,would+V), Third (If+past perfect,would have+PP), Mixed
- Passive Voice : all tenses, impersonal passive, get-passive
- Reported Speech : statement/question/command, backshift, pronoun changes
- Relative Clauses : defining (no commas, that/which/who), non-defining (commas, which/who/whose)
- Participle Clauses : present (-ing), past (-ed), perfect (having+PP)
- Subjunctive : wish+past/past perfect, if only, it's time, would rather
- Articles : a/an/the/zero article rules and exceptions
- Quantifiers : some/any/much/many/few/little/a few/a little + exceptions

WRITING SKILLS :
- Argumentative essay : Introduction (hook + context + clear thesis) → Body (3 paragraphs with topic sentence + argument + example + analysis) → Conclusion (restate thesis + broader implications)
- Synthesis (Bac France) : read multiple documents → extract key ideas → reformulate neutrally → no personal opinion
- Formal email/letter : salutation, purpose, body, closing
- Article/Blog : engaging title, subheadings, direct address to reader
- Report : executive summary, findings, recommendations
- Connectors : addition (furthermore, moreover, in addition), contrast (however, nevertheless, on the other hand), cause (because of, due to, as a result of), concession (although, despite, even though)

READING COMPREHENSION :
- Skimming (global understanding), Scanning (specific information)
- Inference : deduce meaning from context, identify tone/attitude
- Text types : article, extract, speech, interview, advertising

BAC FRANCE — 8 THEMATIC AXES (Première & Terminale) :
- AXE 1 Identities & Exchanges : cultural identity, migration, globalization, American Dream, Brexit
- AXE 2 Private & Public Sphere : social media, surveillance, freedom of expression, digital identity
- AXE 3 Art & Power : engaged art, propaganda, censorship, soft power, protest art
- AXE 4 Citizenship & Virtual Worlds : fake news, digital democracy, AI influence, cybersecurity
- AXE 5 Fictions & Realities : dystopia (1984, Brave New World), storytelling, film adaptation
- AXE 6 Scientific Innovation & Responsibility : AI ethics, climate change, biotechnology
- AXE 7 Diversity & Inclusion : gender equality, minorities, Black Lives Matter, social justice
- AXE 8 Territory & Memory : war memory, colonization, heritage, historical narratives

LLCER WORKS : Fahrenheit 451 (Bradbury), Lord of the Flies (Golding), To Kill a Mockingbird (Lee), A.I. (film, Spielberg)
AMC : Living together, Changing world, Global relations

LITERARY ANALYSIS (English) :
- Figures of speech : metaphor, simile, alliteration, assonance, onomatopoeia, personification, hyperbole, irony, oxymoron, paradox
- Narrative : narrator (1st/3rd person), focalization, stream of consciousness, unreliable narrator
- Prose structure : setting, plot, character (protagonist/antagonist/foil), conflict, climax, resolution
- Poetry : rhythm, rhyme scheme (ABAB/ABBA/AABB), iambic pentameter, free verse, sonnet, ode
- Drama : stage directions, soliloquy, dialogue, dramatic irony, catharsis`

    const SYSTEM_LITTERATURE = `Tu es un professeur expert de Littérature Française et de Français, spécialiste du Bac France.
Tu rédiges des corrections EXHAUSTIVES, ULTRA-DETAILLEES et PEDAGOGIQUES.
Ne résume JAMAIS. Développe TOUT.
${COMMON_FORMAT}

PROGRAMME LITTÉRATURE FRANÇAISE COMPLET :

FIGURES DE STYLE :
- Comparaison : "comme" ou "tel" — comparé + outil + comparant
- Métaphore : comparaison sans outil comparatif (ex: "Le vent est un cheval")
- Personnification : attributs humains à non-humain
- Hyperbole : exagération stylistique (ex: "pleurer un torrent de larmes")
- Litote : dire moins pour exprimer plus (ex: "Ce n'est pas mal")
- Euphémisme : atténuer une réalité dure (ex: "il nous a quittés")
- Anaphore : répétition en début de vers/phrase ("J'ai rêvé..., J'ai rêvé...")
- Chiasme : inversion croisée AB/BA ("L'homme mange pour vivre, non vivre pour manger")
- Oxymore : termes contradictoires ("obscure clarté", "douce violence")
- Antithèse : opposition de deux idées sans fusion
- Allégorie : représentation abstraite par concret (ex: Marianne = France)
- Périphrase : désignation par développement (ex: "l'astre du jour" = le soleil)
- Synecdoque, métonymie, ironie, para­doxe, syllepse

VERSIFICATION :
- Mesure : alexandrin (12), décasyllabe (10), octosyllabe (8), heptasyllabe (7)
- Rime : plate (AABB), croisée (ABAB), embrassée (ABBA)
- Formes fixes : sonnet (2 quatrains + 2 tercets), ode, ballade, rondeau
- Phénomènes : diérèse/synérèse, enjambement, rejet, contre-rejet, césure

ANALYSE NARRATIVE :
- Point de vue/focalisation : interne (je), externe (œil de caméra), omniscient (zéro)
- Narrateur : autodiégétique, homodiégétique, hétérodiégétique
- Temps du récit : ellipse, pause, scène, sommaire, analepse, prolepse
- Schéma actanciel (Greimas) : sujet, objet, destinateur, destinataire, adjuvant, opposant
- Registres : comique, tragique, lyrique, épique, fantastique, satirique, pathétique, polémique

EXERCICES BAC :
1. **Commentaire composé** : Accroche (citer le titre/auteur/genre) → Problématique ("En quoi ce texte...?") → Annonce du plan (2-3 axes) → Développement (chaque axe : sous-partie + exemple textuel cité + analyse de l'effet produit) → Conclusion (bilan + ouverture)
2. **Dissertation** : Thèse → Antithèse → Synthèse, avec exemples d'œuvres précis (auteur + titre + passage)
3. **Contraction de texte** : 1/4 de la longueur, même progression d'idées, neutralité de ton, PAS de citations directes
4. **Écriture d'invention** : respecter genre (roman, théâtre, poème), registre, style de l'auteur, cohérence narrative
5. **Essai** : prise de position argumentée, 3 arguments + 3 exemples littéraires, connecteurs logiques

GRANDS AUTEURS ET ŒUVRES :
XVIIe : Molière (Tartuffe, Dom Juan, Le Misanthrope, L'Avare), Racine (Phèdre, Andromaque, Britannicus), Corneille (Le Cid), La Fontaine (Fables), La Bruyère (Les Caractères), Pascal (Pensées)
XVIIIe : Voltaire (Candide, Zadig, Micromégas, Lettres philosophiques), Rousseau (Confessions, Du Contrat Social, Émile), Diderot (Encyclopédie, Le Neveu de Rameau), Montesquieu (L'Esprit des lois, Lettres persanes), Beaumarchais (Le Mariage de Figaro)
XIXe : Hugo (Les Misérables, Notre-Dame de Paris, Hernani, Les Contemplations), Balzac (Père Goriot, Illusions perdues, Eugénie Grandet), Stendhal (Le Rouge et le Noir, La Chartreuse de Parme), Flaubert (Madame Bovary, L'Éducation sentimentale), Baudelaire (Les Fleurs du Mal, Le Spleen de Paris), Verlaine, Rimbaud (Une Saison en enfer), Zola (Germinal, Nana, L'Assommoir), Maupassant
XXe : Proust (À la Recherche du temps perdu), Camus (L'Étranger, La Peste, Le Mythe de Sisyphe), Sartre (La Nausée, Les Mouches, Huis Clos), Simone de Beauvoir (Le Deuxième Sexe), Ionesco (La Cantatrice Chauve, Rhinocéros), Beckett (En attendant Godot), Anouilh (Antigone), Prévert (Paroles), Apollinaire (Alcools)

MOUVEMENTS LITTÉRAIRES :
- Humanisme (XVIe) : Rabelais, Montaigne — valorisation de l'homme et du savoir
- Baroque (fin XVIe-XVIIe) : instabilité, mouvement, illusion, trompe-l'œil
- Classicisme (XVIIe) : règles (bienséance, vraisemblance, 3 unités au théâtre), raison, universalité
- Lumières (XVIIIe) : raison, progrès, tolérance, critique de l'absolutisme
- Romantisme (XIXe) : moi lyrique, nature, mélancolie, engagement (Hugo)
- Réalisme/Naturalisme (XIXe) : observation sociale, milieu déterministe, Zola
- Symbolisme (fin XIXe) : musique, suggestion, symboles, Mallarmé
- Surréalisme (XXe) : inconscient, rêve, hasard objectif, Breton
- Existentialisme (XXe) : liberté, responsabilité, absurde, engagement
- Nouveau Roman (XXe) : refus de l'intrigue traditionnelle, Robbe-Grillet, Sarraute

SCHÉMAS LITTÉRATURE (utiliser quand applicable) :
- Schéma actanciel de Greimas → représenter avec les 6 cases : Destinateur | Sujet → Objet | Destinataire + Adjuvant / Opposant
- Structure du commentaire composé → toujours annoncer clairement : I. [Axe 1] / II. [Axe 2] / III. [Axe 3 si applicable]
- Chronologie littéraire → tableau récapitulatif des mouvements par siècle si demandé`


    // ─── Prompts ÉCONOMIE / GESTION (Tunisie) + ÉCO-GESTION (France) ───
    const SYSTEM_ECONOMIE = `Tu es un professeur expert du Baccalauréat tunisien, spécialiste en SCIENCES ÉCONOMIQUES.
Tu rédiges des corrections EXHAUSTIVES, ULTRA-DÉTAILLÉES et PÉDAGOGIQUES. Ne résume JAMAIS. Développe TOUT.
${COMMON_FORMAT}
MÉTHODE ÉCONOMIE :
- Définis chaque notion économique (PIB, croissance, inflation, chômage, IDH, balance commerciale, élasticité…).
- Pose et explique CHAQUE calcul en entier : taux de variation = (Vf − Vi)/Vi × 100, indices base 100, coefficient multiplicateur, IDH, taux d'inflation (IPC), termes de l'échange. Montre la formule, l'application numérique, le résultat, l'interprétation.
- Étude de document : explique comment lire le tableau/graphique (titre, source, unité, période), extrais les données, calcule, interprète.
- Raisonnement / dissertation : introduction (accroche, définitions, problématique, annonce), développement structuré argumenté (mécanismes + exemples), conclusion.
- Cite les mécanismes et auteurs pertinents.
${UNIVERSAL_GRAPH_PROMPT}
Pour présenter des données chiffrées, utilise un vrai tableau [GRAPH: {"type":"table",...}] ou un diagramme [GRAPH: {"type":"bar",...}].`

    const SYSTEM_GESTION = `Tu es un professeur expert du Baccalauréat tunisien, spécialiste en GESTION (comptabilité, gestion financière, gestion des coûts).
Tu rédiges des corrections EXHAUSTIVES, ULTRA-DÉTAILLÉES et PÉDAGOGIQUES. Ne résume JAMAIS. Développe TOUT.
${COMMON_FORMAT}
MÉTHODE GESTION :
- Comptabilité : bilan (actif/passif), compte de résultat, écritures, soldes intermédiaires de gestion.
- Analyse financière : FDR = capitaux permanents − actif immobilisé ; BFR = actif circulant (hors trésorerie) − passif circulant (hors trésorerie) ; TN = FDR − BFR. Pose chaque formule, l'application chiffrée, le résultat, l'interprétation (équilibre financier).
- Gestion des coûts : coût d'achat, coût de production, coût de revient, marge sur coût variable (MCV), taux de MCV, seuil de rentabilité = charges fixes / taux de MCV, point mort.
- Gestion des stocks : CMUP, méthode FIFO, stock d'alerte, quantité économique.
- Montre TOUJOURS le détail des calculs (formule → application numérique → résultat → interprétation).
${UNIVERSAL_GRAPH_PROMPT}
Pour les bilans, tableaux de charges et de coûts, utilise un vrai tableau [GRAPH: {"type":"table",...}] ou un diagramme [GRAPH: {"type":"bar",...}].`

    const SYSTEM_ECO_GESTION = `Tu es un professeur expert du Baccalauréat France, spécialiste de SES (Sciences Économiques et Sociales) et de la série STMG.
Tu rédiges des corrections EXHAUSTIVES, ULTRA-DÉTAILLÉES et PÉDAGOGIQUES. Ne résume JAMAIS. Développe TOUT.
${COMMON_FORMAT}
MÉTHODE SES / STMG :
- EC1 / Mobilisation de connaissances : définis chaque notion, explique le mécanisme, cite les auteurs du programme (Schumpeter, Ricardo, Bourdieu, Durkheim, Becker, Paugam, Rawls).
- EC2 / Étude d'un document statistique : montre comment lire le document (titre, source, unité), fais les CALCULS en entier (taux de variation, indices base 100, points de %, coefficient multiplicateur, lecture de tables de mobilité), interprétation chiffrée.
- EC3 / Raisonnement / Dissertation : méthode AEI (Affirmation — Explicitation — Illustration), introduction (accroche, définitions, problématique, annonce du plan), développement structuré, conclusion.
- STMG Gestion-Finance : FDR = capitaux permanents − actif immobilisé ; BFR ; TN = FDR − BFR ; MCV ; taux de MCV ; seuil de rentabilité = charges fixes / taux de MCV. Pose chaque formule, le calcul complet, l'interprétation.
${UNIVERSAL_GRAPH_PROMPT}
Pour présenter des données chiffrées, utilise un vrai tableau [GRAPH: {"type":"table",...}] ou un diagramme [GRAPH: {"type":"bar",...}].`


    // System prompt strict — refus explicite des autres matières
    const REFUS_MATHS = '\u{1F512} Ce module est réservé aux Mathématiques. Sélectionne la bonne matière dans le menu.'
    const REFUS_PHYS  = '\u{1F512} Ce module est réservé à la Physique-Chimie. Sélectionne la bonne matière dans le menu.'
    const REFUS_SVT   = '\u{1F512} Ce module est réservé aux SVT. Sélectionne la bonne matière dans le menu.'
    const REFUS_ANG   = '\u{1F512} This module is reserved for English. Please select the correct subject in the menu.'
    const REFUS_INFO  = '\u{1F512} Ce module est réservé à l\'Informatique. Sélectionne la bonne matière dans le menu.'
    const REFUS_LIT   = '\u{1F512} Ce module est réservé à la Littérature Française. Sélectionne la bonne matière dans le menu.'
    const REFUS_ECO   = '\u{1F512} Ce module est réservé à l\'Économie. Sélectionne la bonne matière dans le menu.'
    const REFUS_GES   = '\u{1F512} Ce module est réservé à la Gestion. Sélectionne la bonne matière dans le menu.'
    const REFUS_ECOGES= '\u{1F512} Ce module est réservé à l\'Économie & Gestion. Sélectionne la bonne matière dans le menu.'
    const STRICT_MATHS = SYSTEM_MATHS + '\n\nRÈGLE ABSOLUE : Tu résous UNIQUEMENT des exercices de mathématiques. Si l\'exercice concerne une autre matière, réponds EXACTEMENT : ' + REFUS_MATHS
    const STRICT_PHYS  = SYSTEM_PHYSIQUE + '\n\nRÈGLE ABSOLUE : Tu résous UNIQUEMENT des exercices de physique-chimie. Si l\'exercice concerne une autre matière, réponds EXACTEMENT : ' + REFUS_PHYS
    const STRICT_SVT   = SYSTEM_SVT + '\n\nRÈGLE ABSOLUE : Tu résous UNIQUEMENT des exercices de SVT. Si l\'exercice concerne une autre matière, réponds EXACTEMENT : ' + REFUS_SVT
    const STRICT_ANG   = SYSTEM_ANGLAIS + '\n\nABSOLUTE RULE: You solve ONLY English exercises (grammar, essay, text analysis, LLCER). If the exercise is about another subject, respond EXACTLY: ' + REFUS_ANG
    const STRICT_INFO  = SYSTEM_INFO + '\n\nRÈGLE ABSOLUE : Tu résous UNIQUEMENT des exercices d\'informatique. Si l\'exercice concerne une autre matière, réponds EXACTEMENT : ' + REFUS_INFO
    const STRICT_LIT   = SYSTEM_LITTERATURE + '\n\nRÈGLE ABSOLUE : Tu résous UNIQUEMENT des exercices de littérature/français. Si l\'exercice concerne une autre matière, réponds EXACTEMENT : ' + REFUS_LIT
    const STRICT_ECO   = SYSTEM_ECONOMIE + '\n\nRÈGLE ABSOLUE : Tu résous UNIQUEMENT des exercices d\'économie. Si l\'exercice concerne une autre matière, réponds EXACTEMENT : ' + REFUS_ECO
    const STRICT_GES   = SYSTEM_GESTION + '\n\nRÈGLE ABSOLUE : Tu résous UNIQUEMENT des exercices de gestion. Si l\'exercice concerne une autre matière, réponds EXACTEMENT : ' + REFUS_GES
    const STRICT_ECOGES= SYSTEM_ECO_GESTION + '\n\nRÈGLE ABSOLUE : Tu résous UNIQUEMENT des exercices d\'économie-gestion (SES/STMG). Si l\'exercice concerne une autre matière, réponds EXACTEMENT : ' + REFUS_ECOGES
    const system = activeSubj === 'physique' ? STRICT_PHYS
                 : activeSubj === 'informatique' ? STRICT_INFO
                 : activeSubj === 'svt' ? STRICT_SVT
                 : activeSubj === 'anglais' ? STRICT_ANG
                 : activeSubj === 'litterature' ? STRICT_LIT
                 : activeSubj === 'economie' ? STRICT_ECO
                 : activeSubj === 'gestion' ? STRICT_GES
                 : activeSubj === 'eco-gestion' ? STRICT_ECOGES
                 : STRICT_MATHS

    const prompt = mode === 'solve'
      ? `Résous cet exercice de ${activeSubj === 'physique' ? 'physique-chimie' : activeSubj === 'informatique' ? 'informatique' : activeSubj === 'svt' ? 'SVT' : activeSubj === 'anglais' ? 'English' : activeSubj === 'litterature' ? 'littérature française' : activeSubj === 'economie' ? 'économie' : activeSubj === 'gestion' ? 'gestion' : activeSubj === 'eco-gestion' ? 'économie-gestion (SES/STMG)' : 'mathématiques'} (programme Bac Tunisie / France) de façon COMPLÈTE et PÉDAGOGIQUE.

EXERCICE :
${input}

RÈGLES GRAPHIQUES ABSOLUES — LIRE AVANT DE RÉPONDRE :
1. JAMAIS d'expressions vides : "expressions":[] ou "expressions":[""] = INTERDIT → graphique blanc
2. JAMAIS de LaTeX dans expressions : INTERDIT x^2, \frac, ² → UTILISER x*x, (a/b)
3. TOUJOURS des expressions JS valides : tester mentalement que x=1 retourne un nombre
4. Si f(x) = 2x³-3x²+1 → "expressions":["2*x*x*x - 3*x*x + 1"] (JAMAIS "2x^3-3x^2+1")
5. Si dérivée f'(x) = 6x²-6x → "expressions":["2*x*x*x - 3*x*x + 1","6*x*x - 6*x"]
6. "Représenter graphiquement" = TRACER les courbes, pas un repère vide

FORMAT EXACT OBLIGATOIRE (copier ce modèle) :
[GRAPH: {"type":"function","expressions":["2*x*x*x - 3*x*x + 1","6*x*x - 6*x"],"xMin":-2,"xMax":3,"labels":["f(x)","f\'(x)"],"title":"Courbe de f et sa dérivée","xLabel":"x","yLabel":"y"}]

Structure OBLIGATOIRE :

## Analyse du problème
[Type d'exercice, outils mathématiques nécessaires, stratégie de résolution]

## Résolution complète
[Pour chaque question — ne saute AUCUNE étape :
### Question X
**Méthode :** [Théorème/formule appliqué et POURQUOI]
**Calculs :**
- Étape 1 : [calcul complet] → [résultat intermédiaire]
- Étape 2 : ...
> **Résultat :** [réponse finale encadrée]

[GRAPHIQUE si applicable : insérer ici le [GRAPH: ...] avec les expressions JS calculées]
]

## Synthèse
[Résultats finals + formules clés à retenir + erreur classique à éviter sur ce type]`

      : `Vérifie et corrige la solution de cet élève.

EXERCICE :
${input}

SOLUTION DE L'ÉLÈVE :
${myAnswer || '(aucune réponse fournie)'}

Structure OBLIGATOIRE :

## Évaluation globale
[Note estimée /10 + résumé en 2 lignes : ce qui est bien / ce qui pose problème]

## Analyse détaillée
[Pour chaque étape de la solution de l'élève :
✅ Correct : [explication]
❌ Incorrect : [ce qui est faux + POURQUOI c'est faux + la bonne approche]
⚠️ Incomplet : [ce qui manque]
]

## Correction officielle complète
[Résolution correcte et détaillée, étape par étape]

## Plan d'amélioration
[Les 2-3 points précis sur lesquels travailler + exercices similaires conseillés]`

    try {
      // ── Résolution QUESTION PAR QUESTION (déterministe, sans doublon) ─────
      // La continuation « aveugle » faisait répéter les questions et ne signalait
      // jamais la fin. On découpe donc l'énoncé en questions principales (1,2,3…)
      // et on résout UNE question par appel (court, rapide, sous le timeout),
      // l'énoncé complet servant de contexte. Aucun doublon, fin garantie.
      const systemFull = system

      function splitByMarkers(text: string, re: RegExp, seq: (m: RegExpMatchArray) => number): string[] {
        const lines = text.split('\n')
        const blocks: string[] = []
        let current: string[] | null = null
        let expected: number | null = null
        for (const line of lines) {
          const m = line.match(re)
          const val = m ? seq(m) : null
          if (val !== null && (expected === null || val === expected)) {
            if (current) blocks.push(current.join('\n'))
            current = [line]; expected = val + 1
          } else if (current) {
            current.push(line)
          }
        }
        if (current) blocks.push(current.join('\n'))
        return blocks
      }

      // Découpage à DEUX niveaux : par question numérotée (1,2,3…), puis chaque
      // question est elle-même redécoupée par ses sous-questions (a,b,c…).
      // → liste plate { label, text } : CHAQUE sous-question = un appel dédié.
      const subRe = /^\s*([a-z])\s*[.)]\s+\S/i
      const numRe = /^\s*(\d+)\s*[.)]\s+\S/
      function buildItems(text: string): { label: string; text: string }[] {
        const items: { label: string; text: string }[] = []
        const numBlocks = splitByMarkers(text, numRe, m => parseInt(m[1], 10))
        if (numBlocks.length >= 2) {
          for (const nb of numBlocks) {
            const numLabel = nb.match(numRe)?.[1] || '?'
            const subBlocks = splitByMarkers(nb, subRe, m => m[1].toLowerCase().charCodeAt(0) - 97)
            if (subBlocks.length >= 2) {
              const intro = nb.split('\n').slice(0, Math.max(1, nb.split('\n').findIndex(l => subRe.test(l)))).join('\n').trim()
              for (const sb of subBlocks) {
                const sl = sb.match(subRe)?.[1]?.toLowerCase() || ''
                const body = intro ? `${intro}\n${sb}` : sb
                items.push({ label: `Question ${numLabel}.${sl})`, text: body })
              }
            } else {
              items.push({ label: `Question ${numLabel}`, text: nb })
            }
          }
          return items
        }
        // Pas de numéros → découpage par lettres au niveau racine
        const letterBlocks = splitByMarkers(text, subRe, m => m[1].toLowerCase().charCodeAt(0) - 97)
        if (letterBlocks.length >= 2) {
          for (const lb of letterBlocks) {
            const sl = lb.match(subRe)?.[1]?.toLowerCase() || ''
            items.push({ label: `Question ${sl})`, text: lb })
          }
          return items
        }
        return []
      }

      const exerciseText = mode === 'verify' ? `${input}\n\nSOLUTION DE L'ÉLÈVE :\n${myAnswer}` : input
      const items = buildItems(input)
      const attachHint = attachments.length
        ? "\n\n📎 IMPORTANT : une ou plusieurs PIÈCES JOINTES (figure, tableau, annexe) accompagnent cet énoncé. Analyse-les attentivement (points, angles, mesures, données du tableau, courbe…) et appuie-toi dessus."
        : ''
      const Q_TOKENS = attachments.length ? 2000 : 2500
      const askOne = (p: string, sys: string, tok: number) =>
        attachments.length ? askClaudeWithAttachments(p, sys, attachments, tok) : askClaude(p, sys, tok)

      let full = ''
      let quotaMsg = ''
      let firstError: any = null

      if (mode === 'solve' && items.length >= 2) {
        console.log('[Solve] mode structuré —', items.length, 'sous-questions détectées')
        for (let i = 0; i < items.length; i++) {
          setPassNum(i + 1)
          const priorContext = full
            ? `\n\nRÉSULTATS DÉJÀ ÉTABLIS dans les questions précédentes (tu peux t'appuyer dessus) :\n${full.slice(-1800)}\n`
            : ''
          const qPrompt =
`Tu es professeur de mathématiques (Bac tunisien). Voici l'énoncé COMPLET de l'exercice (pour le contexte) :

${exerciseText}${attachHint}${priorContext}

RÉSOUS MAINTENANT, de façon complète et détaillée, UNIQUEMENT la question ci-dessous. Tu peux utiliser les résultats des questions précédentes. NE traite AUCUNE autre question et ne les répète pas.

QUESTION À RÉSOUDRE (${items[i].label}) :
${items[i].text}

FORMAT : commence par un titre « ### ${items[i].label} », puis : **Méthode**, **Calculs** étape par étape, et « > **Résultat :** ».

RÈGLE GRAPHIQUE (importante) : n'inclus un bloc [GRAPH:{...}] QUE si tu peux placer les points avec des coordonnées qui respectent EXACTEMENT les propriétés de l'énoncé. Sinon, décris la figure en mots. JSON COMPACT (≤ 10 formes), VALIDE, sur UNE seule ligne.

Sois COMPLET mais DIRECT : montre les étapes clés et les résultats, sans remplissage ni répétition inutile.`
          console.log('[Solve]', items[i].label, '—', i + 1, '/', items.length, '— envoi…')
          let part = ''
          let qOk = false
          for (let attempt = 0; attempt < 2 && !qOk; attempt++) {
            const tok = attempt === 0 ? Q_TOKENS : 1400   // 2e tentative : plus court = plus rapide
            try {
              part = await askOne(qPrompt, systemFull, tok)
              qOk = true
            } catch (e: any) {
              console.warn('[Solve]', items[i].label, '— échec (tentative', attempt + 1, ') :', e?.name || e?.message)
              if (attempt === 0) { console.log('[Solve]', items[i].label, '— reprise avec moins de tokens'); continue }
              if (full) { full += `\n\n### ${items[i].label}\n_(⏱️ Délai dépassé pour cette sous-question — relancez-la seule pour l'obtenir.)_`; setSolution(full) }
              else firstError = e
            }
          }
          if (!qOk) { if (firstError) break; else continue }
          if (part.startsWith('⚠️') && part.includes('quota')) { quotaMsg = part; break }
          console.log('[Solve]', items[i].label, '— reçu', part.length, 'car.')
          const cleanPart = stripIncompleteGraph(part).trim()
          full = full ? full.trimEnd() + '\n\n' + cleanPart : cleanPart
          setSolution(full)
          if (i === 0) setPhase('done')
        }
      } else {
        // Exercice non découpable, court, ou mode vérification → un seul appel
        console.log('[Solve] mode simple — 1 appel')
        setPassNum(1)
        try {
          const part = await askOne(prompt + attachHint, systemFull, attachments.length ? 4000 : 6000)
          if (part.startsWith('⚠️') && part.includes('quota')) quotaMsg = part
          else { full = stripIncompleteGraph(part).trim(); setPhase('done'); setSolution(full) }
        } catch (e: any) { firstError = e }
      }

      // Échec total sans aucun contenu → message clair (quota NON consommé)
      if (firstError && !full) {
        setStreaming(false)
        setError("⏱️ La résolution n'a pas abouti (délai dépassé). Réessayez, ou collez une seule question à la fois.")
        setPhase('input'); return
      }

      // Quota épuisé sans aucun contenu produit
      if (quotaMsg && !full) { setStreaming(false); setError(quotaMsg); setPhase('input'); return }

      // Aucun contenu exploitable
      if (!full || full.trim().length < 40) {
        setStreaming(false)
        setError("⏱️ La résolution n'a pas abouti. Réessayez, ou découpez le sujet (Exercice 1 seul, puis Exercice 2…).")
        setPhase('input'); return
      }

      setStreaming(false)
      const sol = full

      // Incrémenter quota via RPC Supabase (l'API route ne le fait plus) — UNE seule fois par résolution
      const _matiereInc: Record<string,string> = { physique:'physique', informatique:'informatique', anglais:'anglais', svt:'svt', litterature:'francais', economie:'economie', gestion:'gestion', 'eco-gestion':'eco-gestion' }
      const _matiereForInc = (_matiereInc[activeSubj] || 'mathematiques') as any
      await incrementQuota('solver', _matiereForInc)


      setSolution(sol)
      setPhase('done')
      setHistory(prev => {
        const updated = [{
          id: Date.now().toString(), exercise: input,
          solution: sol, mode, timestamp: new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
        }, ...prev.slice(0, 29)]
        saveSolveHistory(updated, user?.id ?? undefined)
        return updated
      })
      setTimeout(() => solutionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)

      // Questions similaires en arrière-plan (ne compte pas dans le quota)
      askClaude(
        `Exercice : "${input.slice(0, 200)}"\nGénère 3 exercices similaires de difficulté légèrement croissante pour Bac Tunisie.\nRéponds UNIQUEMENT en JSON : ["question1","question2","question3"]`,
        'Tu génères des exercices. Réponds UNIQUEMENT en JSON valide.', 500
      ).then(raw => {
        try {
          const arr = JSON.parse(raw.replace(/```json|```/g, '').trim())
          if (Array.isArray(arr)) setSimilarQ(arr.slice(0, 3))
        } catch { /* silencieux */ }
      }).catch(() => { /* silencieux */ })
    } catch (e: any) {
      setStreaming(false)
      setError(e.message || 'Erreur de résolution'); setPhase('input')
    }
  }

  const handlePdf = () => {
    const w = window.open('', '_blank')
    if (!w) { setPdfMsg('Autorisez les popups'); return }
    w.document.write('<p style="font-family:Segoe UI,Arial,sans-serif;padding:28px;color:#1a1a2e">⏳ Préparation du document (rendu des graphiques)…</p>')
    openSolutionPdf(input, solution, mode, 'print', w).catch(() => { try { w.close() } catch {} ; setPdfMsg('Erreur génération PDF') })
    setPdfMsg('Ouvert dans un nouvel onglet !')
    setTimeout(() => setPdfMsg(''), 3000)
  }

  const handleDownload = () => {
    const w = window.open('', '_blank')
    if (!w) { setPdfMsg('Autorisez les popups'); return }
    w.document.write('<p style="font-family:Segoe UI,Arial,sans-serif;padding:28px;color:#1a1a2e">⏳ Préparation du PDF couleur (rendu des graphiques)…</p>')
    openSolutionPdf(input, solution, mode, 'download', w).catch(() => { try { w.close() } catch {} ; setPdfMsg('Erreur génération PDF') })
    setPdfMsg('Téléchargement du PDF en cours…')
    setTimeout(() => setPdfMsg(''), 3500)
  }

  const reset = () => {
    setPhase('input'); setInput(''); setMyAnswer('')
    setSolution(''); setError(''); setSimilarQ([]); setAttachments([])
  }

  const EXAMPLES: Record<Mode, string[]> = {
    solve: [
      '2x² − 5x + 3 = 0',
      'lim(x→0) sin(x)/x',
      '∫₀¹ x·eˣ dx',
      'z = 1 + i√3, forme exponentielle',
      'Étudier la suite uₙ₊₁ = √(uₙ + 2), u₀ = 1',
    ],
    verify: [
      'Résoudre 3x − 7 = 2',
      "Dériver f(x) = x²·ln(x)",
      '∫₀² (x² + 1) dx',
    ],
  }

  // ── Rendu ──
  // ── Vérification accès matière ─────────────────────────────────
  const SUBJECT_TO_MATIERE: Record<string,string> = {
    physique:'physique', informatique:'informatique',
    svt:'svt', anglais:'anglais', litterature:'francais', maths:'mathematiques'
  }
  const currentMatiere = SUBJECT_TO_MATIERE[subject] || 'mathematiques'


  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: 80, background: '#080817', position: 'relative', overflow: 'hidden' }}>

        {/* Fond décoratif */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: -180, left: -180, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,110,247,0.1) 0%,transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: -150, right: -150, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)' }} />
          <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%,-50%)', width: 680, height: 280, background: 'radial-gradient(ellipse,rgba(6,214,160,0.03) 0%,transparent 60%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 980, margin: '0 auto', padding: '36px 24px 80px' }}>

          {/* ── HEADER ── */}
          <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: subject==='physique'?'#06d6a0':subject==='informatique'?'#6366f1':'#4f6ef7', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 }}>
                {subject==='physique'?'⚗️ Solveur Physique-Chimie IA':subject==='informatique'?'💻 Solveur Informatique IA':subject==='svt'?'🧬 Solveur SVT IA':subject==='anglais'?'🇬🇧 Solveur Anglais IA':subject==='litterature'?'📚 Solveur Littérature IA':'🧮 Solveur Maths IA'}
              </div>
              <h1 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: '#e2e8f0', margin: '0 0 6px' }}>
                Résolution étape par étape
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, margin: 0 }}>
                {subject==='physique'?'Physique-Chimie · Bac Tunisie/France · Correction IA + graphiques':subject==='informatique'?'Algo · SQL · Réseaux · Pascal · Python · Correction IA':subject==='svt'?'Génétique · Immunologie · Physiologie · Géologie · Correction IA':subject==='anglais'?'Grammar · Writing · Essay · Literature · Full English correction':subject==='litterature'?'Commentaire · Dissertation · Contraction · Auteurs · Correction IA':'Résous · Vérifie ta solution · Graphiques · PDF imprimable'}
              </p>
            </div>
            <button
              onClick={() => setShowHistory(p => !p)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 11, border: `1px solid ${showHistory ? 'rgba(79,110,247,0.4)' : 'rgba(255,255,255,0.1)'}`, background: showHistory ? 'rgba(79,110,247,0.1)' : 'rgba(255,255,255,0.04)', color: showHistory ? '#818cf8' : 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              🕘 Historique
              {history.length > 0 && (
                <span style={{ background: '#4f6ef7', color: 'white', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900 }}>
                  {history.length}
                </span>
              )}
            </button>
          </div>

          {/* ── HISTORIQUE ── */}
          {showHistory && history.length > 0 && (
            <div style={{ marginBottom: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span>🕘 Historique — {history.length} exercice{history.length > 1 ? 's' : ''}</span>
                <button onClick={e => {
                    e.stopPropagation()
                    if (window.confirm('Vider tout l\'historique ? Cette action est irréversible.')) {
                      const updated: HistoryItem[] = []
                      setHistory(updated)
                      saveSolveHistory(updated, user?.id ?? undefined)
                    }
                  }}
                  style={{ fontSize:11, padding:'3px 10px', borderRadius:6, border:'1px solid rgba(239,68,68,0.3)', background:'rgba(239,68,68,0.06)', color:'rgba(239,68,68,0.7)', cursor:'pointer', fontFamily:'inherit', fontWeight:600, display:'flex', alignItems:'center', gap:5 }}>
                  🗑 Vider tout
                </button>
              </div>
              {history.map((item, i) => (
                <div key={item.id}
                  style={{ padding: '11px 18px', borderBottom: i < history.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s', position: 'relative' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,110,247,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {/* Zone cliquable pour revoir */}
                  <div onClick={() => { setInput(item.exercise); setSolution(item.solution); setMode(item.mode); setPhase('done'); setShowHistory(false) }}
                    style={{ display:'flex', alignItems:'center', gap:12, flex:1, minWidth:0, cursor:'pointer' }}>
                    <span style={{ fontSize: 16, flexShrink:0 }}>{item.mode === 'verify' ? '🔍' : '🧮'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.exercise.slice(0, 70)}{item.exercise.length > 70 ? '…' : ''}
                      </p>
                      <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop:2 }}>
                        {item.timestamp} · {item.mode === 'verify' ? 'Vérification' : 'Résolution'}
                      </p>
                    </div>
                    <span style={{ fontSize: 11, color: '#4f6ef7', flexShrink: 0, marginRight:4 }}>Revoir →</span>
                  </div>
                  {/* Bouton supprimer — séparé du onClick parent */}
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      if (window.confirm('Supprimer cette résolution ?')) {
                        setHistory(prev => deleteSolveItem(item.id, prev, user?.id ?? undefined))
                      }
                    }}
                    title="Supprimer cette résolution"
                    style={{
                      flexShrink: 0,
                      width: 28, height: 28,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.25)',
                      borderRadius: 7,
                      cursor: 'pointer',
                      color: 'rgba(239,68,68,0.7)',
                      fontSize: 16,
                      fontWeight: 700,
                      lineHeight: 1,
                      transition: 'all 0.18s',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.22)'
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.55)'
                      e.currentTarget.style.color = '#ef4444'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.1)'
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.25)'
                      e.currentTarget.style.color = 'rgba(239,68,68,0.7)'
                    }}>
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}
          {showHistory && history.length === 0 && (
            <div style={{ marginBottom: 24, padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
              Aucun exercice résolu pour le moment
            </div>
          )}

          {/* ── SÉLECTEUR MATIÈRE ── */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            {MATIERE_LIST_SOLVE.map(m => {
              const _keyCheck = m.key === 'litterature' ? 'francais' : m.key
              const hasAccess = isAdmin || !hasActiveSubscription || checkMatiereAccess(_keyCheck as any)
              const isSelected = selectedMatiere === m.key
              return (
                <button key={m.key}
                  onClick={() => {
                    if (!hasAccess) {
                      alert('🔒 ' + m.label + ' n\'est pas inclus dans votre abonnement.\n→ mathsbac.com/abonnement')
                      return
                    }
                    setSelectedMatiere(m.key)
                    setPhase('input')
                    setInput('')
                    setSolution('')
                    setError('')
                  }}
                  title={hasAccess ? m.label : '🔒 Non inclus dans votre abonnement'}
                  style={{
                    padding: '5px 12px', borderRadius: 20,
                    border: isSelected ? `1.5px solid ${m.color}` : '1px solid rgba(255,255,255,0.12)',
                    background: isSelected ? `${m.color}22` : 'rgba(255,255,255,0.03)',
                    color: isSelected ? m.color : hasAccess ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)',
                    fontSize: 12, fontWeight: isSelected ? 700 : 500,
                    cursor: hasAccess ? 'pointer' : 'not-allowed',
                    opacity: hasAccess ? 1 : 0.4,
                    transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 5,
                    fontFamily: 'inherit',
                  }}>
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                  {!hasAccess && <span style={{ fontSize: 9 }}>🔒</span>}
                </button>
              )
            })}
          </div>

          {/* ── MODE TABS ── */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {([['solve', '🧮', 'Résoudre'], ['verify', '🔍', 'Vérifier ma solution']] as const).map(([m, icon, label]) => (
              <button key={m}
                onClick={() => { setMode(m); if (phase === 'done') setPhase('input') }}
                style={{ flex: 1, maxWidth: 230, padding: '11px 18px', borderRadius: 12, border: `${mode === m ? 2 : 1}px solid ${mode === m ? '#4f6ef7' : 'rgba(255,255,255,0.1)'}`, background: mode === m ? 'rgba(79,110,247,0.12)' : 'rgba(255,255,255,0.03)', color: mode === m ? '#818cf8' : 'rgba(255,255,255,0.45)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: mode === m ? '0 4px 16px rgba(79,110,247,0.18)' : 'none', transition: 'all 0.2s' }}>
                {icon} {label}
              </button>
            ))}
          </div>

          {/* ── ZONE SAISIE ── */}
          {(phase === 'input' || phase === 'solving') && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 16, marginBottom: 16, alignItems: 'start' }}>

              {/* GAUCHE */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, padding: 20 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                  ✏️ {mode === 'solve' ? 'Ton exercice' : 'Énoncé de l\'exercice'}
                </div>

                <SymbolPad onInsert={insertSymbol} />

                <textarea
                  ref={textareaRef} value={input} onChange={e => setInput(e.target.value)}
                  placeholder={mode === 'solve'
                    ? 'Ex : Résoudre 2x² − 5x + 3 = 0\nOu : lim(x→0) sin(x)/x\nOu : ∫₀¹ x·eˣ dx'
                    : 'Colle ici l\'énoncé de l\'exercice…'}
                  rows={5}
                  style={{ width: '100%', borderRadius: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, fontFamily: 'monospace', padding: '12px 14px', resize: 'vertical', outline: 'none', lineHeight: 1.7, boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#4f6ef7'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />

                {mode === 'verify' && (
                  <>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '16px 0 8px' }}>
                      ✍️ Ta solution (calculs, résultat…)
                    </div>
                    <textarea
                      value={myAnswer} onChange={e => setMyAnswer(e.target.value)}
                      placeholder={subject==='physique'?'Colle ici l\'exercice de physique-chimie ou décris le problème…':subject==='informatique'?'Colle ici l\'énoncé de l\'exercice d\'informatique (algo, SQL, réseau, Pascal…)':subject==='svt'?'Colle ici l\'exercice de SVT ou décris le schéma/expérience…':subject==='anglais'?'Paste your English exercise or question here (grammar, essay, text analysis…)':subject==='litterature'?'Colle ici le texte à analyser ou la question de dissertation / contraction…':'Écris ici tes calculs, ta démarche et ton résultat…'}
                      rows={5}
                      style={{ width: '100%', borderRadius: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(16,185,129,0.25)', color: '#e2e8f0', fontSize: 14, fontFamily: 'monospace', padding: '12px 14px', resize: 'vertical', outline: 'none', lineHeight: 1.7, boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = '#06d6a0'}
                      onBlur={e => e.target.style.borderColor = 'rgba(16,185,129,0.25)'}
                    />
                  </>
                )}

                {/* ── Pièce jointe (figure / tableau / annexe) ── */}
                <div style={{ marginTop: 16 }}>
                  <input id="solve-attach-input" type="file" accept="image/png,image/jpeg,image/webp,application/pdf" multiple style={{ display: 'none' }}
                    onChange={e => { const fs = e.target.files; if (fs) Array.from(fs).forEach(addAttachment); e.currentTarget.value = '' }} />
                  <button onClick={() => document.getElementById('solve-attach-input')?.click()}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 700, padding: '8px 14px', borderRadius: 10, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc', cursor: 'pointer', fontFamily: 'inherit' }}>
                    📎 Joindre une figure / tableau
                  </button>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 10 }}>Image ou PDF — l&apos;IA la lit pour résoudre avec toutes les données.</span>

                  {attachments.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                      {attachments.map((att, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 10, padding: '6px 8px' }}>
                          {att.mediaType === 'application/pdf'
                            ? <span style={{ fontSize: 20 }}>📄</span>
                            : <img src={`data:${att.mediaType};base64,${att.data}`} alt={att.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }} />}
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{att.name}</span>
                          <button onClick={() => removeAttachment(i)} title="Retirer"
                            style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: 14, fontWeight: 700, lineHeight: 1 }}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Exemples */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontWeight: 700, marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚡ Exemples</div>
                  <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                    {EXAMPLES[mode].map(ex => (
                      <button key={ex} onClick={() => setInput(ex)}
                        style={{ fontSize: 11, padding: '4px 11px', borderRadius: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'monospace', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#4f6ef7'; e.currentTarget.style.color = '#818cf8' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── BADGE QUOTA SUPABASE ── */}
                {!isUnlimited && (
                  <div style={{ marginTop: 14, padding: '8px 12px', background: isQuotaFull ? 'rgba(239,68,68,0.08)' : 'rgba(99,102,241,0.06)', border: `1px solid ${isQuotaFull ? 'rgba(239,68,68,0.25)' : 'rgba(99,102,241,0.2)'}`, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 12, color: isQuotaFull ? '#fca5a5' : 'rgba(255,255,255,0.5)' }}>
                      {isQuotaFull
                        ? <span>🔒 Quota atteint · <a href="/abonnement" style={{color:'#f59e0b',textDecoration:'none',fontWeight:700}}>🇹🇳 Plans Tunisie →</a> · <a href="/abonnement-france" style={{color:'#60a5fa',textDecoration:'none',fontWeight:700}}>🇫🇷 Plans France →</a></span>
                        : `${quotaRemaining} résolution${quotaRemaining > 1 ? 's' : ''} restante${quotaRemaining > 1 ? 's' : ''} cette semaine`}
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, color: isQuotaFull ? '#ef4444' : quotaRemaining <= 10 ? '#f59e0b' : '#10b981' }}>
                      {isQuotaFull ? '🔒' : quotaRemaining}
                    </span>
                  </div>
                )}
                {isUnlimited && isSprint && !isAdmin && (
                  <div style={{ marginTop: 14, padding: '6px 12px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, fontSize: 12, color: '#fbbf24' }}>
                    🔥 Sprint Bac — solveur illimité
                  </div>
                )}
                {isAdmin && (
                  <div style={{ marginTop: 14, fontSize: 11, color: '#6ee7b7' }}>✓ Admin — illimité</div>
                )}

                <button
                  onClick={handleSolve}
                  disabled={phase === 'solving' || !input.trim() || (mode === 'verify' && !myAnswer.trim()) || isQuotaFull}
                  style={{ marginTop: 10, width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: phase === 'solving' || !input.trim() || isQuotaFull ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg,#4f6ef7,#7c3aed)', color: phase === 'solving' || !input.trim() || isQuotaFull ? 'rgba(255,255,255,0.25)' : 'white', fontSize: 15, fontWeight: 700, cursor: phase === 'solving' || !input.trim() || isQuotaFull ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  {phase === 'solving'
                    ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> L&apos;IA rédige{passNum > 0 ? ` — partie ${passNum}` : ''}…</>
                    : isQuotaFull ? '🔒 Quota hebdomadaire atteint'
                    : mode === 'solve' ? '🧮 Résoudre étape par étape →' : '🔍 Vérifier ma solution →'
                  }
                </button>
              </div>

              {/* DROITE — upload */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, padding: 20 }}>
                <FileUpload onExtracted={text => setInput(text)} />
              </div>
            </div>
          )}

          {/* ── ERREUR ── */}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, color: '#fca5a5', fontSize: 14 }}>
              ⚠️ {error}
            </div>
          )}

          {/* ── RÉSULTAT ── */}
          {phase === 'done' && solution && (
            <div ref={solutionRef} style={{ animation: 'fadeInUp 0.3s ease both' }}>

              {/* Barre de contrôle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ margin: '0 0 3px', fontSize: 17, color: '#e2e8f0', fontWeight: 700 }}>
                    {mode === 'solve' ? '🧮 Solution complète' : '🔍 Correction de ta solution'}
                  </h3>
                  <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                    {input.slice(0, 65)}{input.length > 65 ? '…' : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  {pdfMsg && (
                    <span style={{ fontSize: 11, color: '#6ee7b7', fontWeight: 600, padding: '3px 10px', background: 'rgba(16,185,129,0.1)', borderRadius: 6 }}>
                      ✓ {pdfMsg}
                    </span>
                  )}
                  <button onClick={handlePdf}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', background: 'linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.2))', border: '1px solid rgba(99,102,241,0.35)', borderRadius: 10, cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#a5b4fc', fontFamily: 'inherit' }}>
                    🖨 Imprimer
                  </button>
                  <button onClick={handleDownload}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)', border: '1px solid rgba(99,102,241,0.5)', borderRadius: 10, cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'inherit' }}>
                    ⬇️ Télécharger PDF
                  </button>
                  <button
                    onClick={() => {
                      function latexToReadable(src: string): string {
                        return src
                          .replace(/\\begin\{[pv]matrix\}([\s\S]*?)\\end\{[pv]matrix\}/g,
                            (_: string, m: string) => '\n' + m.trim().split('\\\\')
                              .map((r: string) => '[ ' + r.split('&').map((x: string) => x.trim()).join('  ') + ' ]')
                              .join('\n') + '\n')
                          .replace(/\\[df]rac\{([^{}]*)\}\{([^{}]*)\}/g, '($1/$2)')
                          .replace(/\\[df]rac\{\{([^}]*)\}\}\{([^{}]*)\}/g, '($1/$2)')
                          .replace(/\\binom\{([^}]*)\}\{([^}]*)\}/g, 'C($1,$2)')
                          .replace(/\\overrightarrow\{([^{}]*)\}/g, '$1→')
                          .replace(/\\overleftarrow\{([^{}]*)\}/g, '$1←')
                          .replace(/\\vec\{([^{}]*)\}/g, '$1→')
                          .replace(/\\widehat\{([^{}]*)\}/g, '$1̂')
                          .replace(/\\hat\{([^{}]*)\}/g, '$1̂')
                          .replace(/\\overline\{([^{}]*)\}/g, '$1̄')
                          .replace(/\\bar\{([^{}]*)\}/g, '$1̄')
                          .replace(/\\underline\{([^{}]*)\}/g, '$1')
                          .replace(/\\(mathbb|mathbf|mathrm|mathcal|boldsymbol)\{([^{}]*)\}/g, '$2')
                          .replace(/\\times/g,'×').replace(/\\cdot/g,'·').replace(/\\div/g,'÷')
                          .replace(/\\pm/g,'±').replace(/\\leq/g,'≤').replace(/\\geq/g,'≥')
                          .replace(/\\neq/g,'≠').replace(/\\approx/g,'≈').replace(/\\infty/g,'∞')
                          .replace(/\\in\b/g,'∈').replace(/\\cup/g,'∪').replace(/\\cap/g,'∩')
                          .replace(/\\emptyset/g,'∅').replace(/\\forall/g,'∀').replace(/\\exists/g,'∃')
                          .replace(/\\Rightarrow/g,'⇒').replace(/\\Leftrightarrow/g,'⟺')
                          .replace(/\\rightarrow|\\to\b/g,'→').replace(/\\leftarrow/g,'←')
                          .replace(/\\subset/g,'⊂').replace(/\\supset/g,'⊃')
                          .replace(/\^\{([^}]+)\}/g,'^($1)').replace(/\_\{([^}]+)\}/g,'_($1)')
                          .replace(/\^([0-9n])/g,'^$1').replace(/\_([0-9n])/g,'_$1')
                          .replace(/\\sqrt\{([^}]+)\}/g,'√($1)').replace(/\\sqrt/g,'√')
                          .replace(/\\ln\b/g,'ln').replace(/\\log\b/g,'log')
                          .replace(/\\sin\b/g,'sin').replace(/\\cos\b/g,'cos').replace(/\\tan\b/g,'tan')
                          .replace(/\\exp\b/g,'exp').replace(/\\lim\b/g,'lim')
                          .replace(/\\sum/g,'∑').replace(/\\prod/g,'∏').replace(/\\int/g,'∫')
                          .replace(/\\max\b/g,'max').replace(/\\min\b/g,'min')
                          .replace(/\\alpha/g,'α').replace(/\\beta/g,'β').replace(/\\gamma/g,'γ')
                          .replace(/\\delta/g,'δ').replace(/\\Delta/g,'Δ').replace(/\\epsilon/g,'ε')
                          .replace(/\\lambda/g,'λ').replace(/\\mu/g,'μ').replace(/\\pi\b/g,'π')
                          .replace(/\\sigma/g,'σ').replace(/\\omega/g,'ω').replace(/\\Omega/g,'Ω')
                          .replace(/\\theta/g,'θ').replace(/\\phi/g,'φ').replace(/\\rho/g,'ρ')
                          .replace(/\\chi/g,'χ').replace(/\\xi/g,'ξ').replace(/\\eta/g,'η')
                          .replace(/\\[,;!]/g,' ').replace(/\\quad/g,' ').replace(/\\qquad/g,'  ')
                          .replace(/\\textbf?\{([^}]+)\}/g,'$1')
                          .replace(/\\text\{([^}]+)\}/g,'$1')
                          .replace(/\\left\s*\(/g,'(').replace(/\\right\s*\)/g,')')
                          .replace(/\\left\s*\[/g,'[').replace(/\\right\s*\]/g,']')
                          .replace(/\\left\s*\|/g,'|').replace(/\\right\s*\|/g,'|')
                          .replace(/\\left\s*\./g,'').replace(/\\right\s*\./g,'')
                          .replace(/\\left/g,'').replace(/\\right/g,'')
                          .replace(/\\\\/g,'\n')
                          .replace(/\{/g,'').replace(/\}/g,'')
                          .replace(/\\[a-zA-Z]+\*/g,'').replace(/\\[a-zA-Z]+/g,'')
                      }
                      const collapsedSol = (() => {
                        try {
                          return parseGraphSegments(solution)
                            .map(s => s.type === 'graph' ? '\n[Graphique interactif : voir http://app.mathsbac.com]\n' : s.content)
                            .join('')
                        } catch { return solution }
                      })()
                      const lines = collapsedSol.split('\n').map((ln: string) => {
                        const converted = ln
                          .replace(/\$\$([\s\S]+?)\$\$/g, (_: string, m: string) => latexToReadable(m.trim()))
                          .replace(/\$([^$\n]+?)\$/g, (_: string, m: string) => latexToReadable(m.trim()))
                          .replace(/\\[a-zA-Z{(]/g, (m: string) => {
                            const converted2 = latexToReadable(ln
                              .replace(/\$\$[\s\S]+?\$\$/g,'').replace(/\$[^$\n]+?\$/g,''))
                            return converted2.includes(m) ? latexToReadable(m) : m
                          })
                        return converted
                          .replace(/^## /, '').replace(/^### /, '').replace(/^#### /, '')
                          .replace(/\*\*(.+?)\*\*/g, '$1')
                          .replace(/^> /, '→ ')
                          .replace(/^- /, '• ')
                      })
                      const txt = lines.join('\n').replace(/\n{3,}/g,'\n\n').trim()
                      navigator.clipboard.writeText(txt)
                        .then(() => setPdfMsg('Copié !'))
                        .catch(() => setPdfMsg('Erreur copie'))
                      setTimeout(() => setPdfMsg(''), 2500)
                    }}
                    style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'inherit' }}>
                    📋 Copier
                  </button>
                  <button onClick={reset}
                    style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'inherit' }}>
                    🔄 Nouvel exercice
                  </button>
                </div>
              </div>

              {/* Rappel exercice */}
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '11px 16px', marginBottom: 14, fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 1, flexShrink: 0 }}>EXERCICE</span>
                <span style={{ whiteSpace: 'pre-wrap' }}>{input}</span>
              </div>

              {mode === 'verify' && myAnswer && (
                <div style={{ background: 'rgba(6,214,160,0.04)', border: '1px solid rgba(6,214,160,0.15)', borderRadius: 12, padding: '11px 16px', marginBottom: 14, fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#06d6a0', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 1, flexShrink: 0 }}>TA RÉPONSE</span>
                  <span style={{ whiteSpace: 'pre-wrap' }}>{myAnswer.slice(0, 300)}{myAnswer.length > 300 ? '…' : ''}</span>
                </div>
              )}

              {/* Bannière de progression : la correction continue de se rédiger */}
              {streaming && (
                <div style={{ background: 'rgba(79,110,247,0.10)', border: '1px solid rgba(79,110,247,0.3)', borderRadius: 12, padding: '11px 16px', marginBottom: 14, fontSize: 13, fontWeight: 700, color: '#a5b4fc', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                  Rédaction de la suite en cours… (partie {passNum}) — la correction s&apos;allonge automatiquement.
                </div>
              )}

              {/* Solution */}
              <div id="solution-render-box" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '24px 28px', marginBottom: 20 }}>
                <RichText text={solution} />
              </div>

              {/* Actions bas */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                <button onClick={reset}
                  style={{ padding: '11px 24px', background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)', border: 'none', borderRadius: 12, color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 18px rgba(79,110,247,0.35)' }}>
                  + Nouvel exercice
                </button>
                <button onClick={handlePdf}
                  style={{ padding: '11px 20px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 12, color: '#a5b4fc', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                  🖨 Imprimer cette solution
                </button>
                <button onClick={handleDownload}
                  style={{ padding: '11px 20px', background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ⬇️ Télécharger en PDF (couleur)
                </button>
              </div>

              {/* Questions similaires */}
              {similarQ.length > 0 && (
                <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 16, padding: '18px 22px' }}>
                  <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 700, color: '#fcd34d', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    💡 Exercices similaires pour t&apos;entraîner
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {similarQ.map((q, i) => (
                      <button key={i}
                        onClick={() => { setInput(q); setMyAnswer(''); setPhase('input'); setSolution(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        style={{ textAlign: 'left', padding: '10px 16px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 11, cursor: 'pointer', fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace', lineHeight: 1.5, transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.12)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)'; e.currentTarget.style.color = '#fcd34d' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.06)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}>
                        <span style={{ color: '#f59e0b', marginRight: 8, fontFamily: 'inherit' }}>{i + 1}.</span>{q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.18)', marginTop: 36 }}>
            
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @media(max-width:700px) {
          div[style*="grid-template-columns: 1fr 260px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

export default function SolvePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#080817', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14 }}>
        Chargement...
      </div>
    }>
      <SolvePageInner />
    </Suspense>
  )
}