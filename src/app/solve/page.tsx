'use client'
import { useState, useRef, useCallback, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/lib/auth/AuthContext'

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
async function askClaude(prompt: string, system: string, maxTokens = 6000): Promise<string> {
  const r = await fetch('/api/anthropic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
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
  const r = await fetch('/api/anthropic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: prompt },
        ],
      }],
    }),
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const d = await r.json()
  return d.content?.map((b: any) => b.type === 'text' ? b.text : '').join('') || ''
}

// ══════════════════════════════════════════════════════════════════════
// GRAPHIQUES Plotly
// ── Sanitize expression : corrige les erreurs courantes de l'IA ──
function sanitizeExpr(expr: string): string {
  return expr
    .replace(/x\^4/g, 'x*x*x*x')
    .replace(/x\^3/g, 'x*x*x')
    .replace(/x\^2/g, 'x*x')
    .replace(/x\^(-?\d+)/g, (_, n) => `Math.pow(x,${n})`)
    .replace(/\(([^)]+)\)\^(\d+)/g, (_, base, exp) => `Math.pow(${base},${exp})`)
    .replace(/([a-zA-Z0-9_.]+)\^(\d+)/g, (_, base, exp) => `Math.pow(${base},${exp})`)
    .replace(/(\d)(x)/g, '$1*$2')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/abs\(/g, 'Math.abs(')
    .replace(/exp\(/g, 'Math.exp(')
    .replace(/pi/gi, 'Math.PI')
    .replace(/π/g, 'Math.PI')
    .replace(/(?<![a-zA-Z_])e(?![a-zA-Z_(])/g, 'Math.E')
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

function MathGraph({ spec }: { spec: GraphSpec }) {
  const divRef = useRef<HTMLDivElement>(null)
  const plotlyLoaded = useScript('https://cdn.plot.ly/plotly-2.27.0.min.js')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!plotlyLoaded || !divRef.current) return
    try {
      const xMin = spec.xMin ?? -6; const xMax = spec.xMax ?? 6
      const N = 500; const dx = (xMax - xMin) / N
      const colors = ['#4f6ef7', '#06d6a0', '#f59e0b', '#ec4899', '#8b5cf6']
      const traces: any[] = []

      spec.expressions.forEach((expr, i) => {
        const xs: number[] = [], ys: number[] = []
        for (let j = 0; j <= N; j++) {
          const x = xMin + j * dx
          try {
            const safeExpr = sanitizeExpr(expr)
            const fn = new Function('x', 'Math',
              `"use strict"; try { return (${safeExpr}); } catch { return null; }`)
            const y = fn(x, Math)
            xs.push(x)
            ys.push((y !== null && isFinite(y) && Math.abs(y) < 1e6) ? y : NaN)
          } catch { xs.push(x); ys.push(NaN) }
        }
        traces.push({
          x: xs, y: ys, mode: 'lines', type: 'scatter',
          name: spec.labels?.[i] || expr,
          line: { color: colors[i % colors.length], width: 2.5 }
        })
      })

      if (spec.points?.length) {
        traces.push({
          x: spec.points.map(p => p.x), y: spec.points.map(p => p.y),
          mode: 'markers+text', type: 'scatter',
          text: spec.points.map(p => p.label || ''),
          textposition: 'top center',
          marker: { color: '#f59e0b', size: 9, symbol: 'circle' },
          name: 'Points'
        })
      }

      const layout = {
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
        legend: {
          bgcolor: 'rgba(0,0,0,0.5)',
          bordercolor: 'rgba(255,255,255,0.1)', borderwidth: 1
        },
        margin: { t: 36, b: 44, l: 52, r: 16 }, height: 280,
      }
      ;(window as any).Plotly.newPlot(
        divRef.current, traces, layout,
        { responsive: true, displayModeBar: false }
      )
    } catch(e: any) { console.error('MathGraph:', e, spec); setError('Expression invalide : ' + (spec.expressions?.[0]?.slice(0,40) || '?')) }
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


// ── Dispatch : function/points → Plotly, geometry → SVG ──────────
function SmartGraph({ spec }: { spec: any }) {
  if (spec?.type === 'geometry') return <GeoGraph spec={spec as GeoSpec}/>
  return <MathGraph spec={spec as GraphSpec}/>
}


// Parser [GRAPH:{...}] robuste (gère JSON imbriqué)
function parseGraphSegments(text: string): Array<{ type: 'text' | 'graph'; content: string }> {
  const result: Array<{ type: 'text' | 'graph'; content: string }> = []
  let i = 0; const tag = '[GRAPH:'
  while (i < text.length) {
    const idx = text.indexOf(tag, i)
    if (idx === -1) { if (i < text.length) result.push({ type: 'text', content: text.slice(i) }); break }
    if (idx > i) result.push({ type: 'text', content: text.slice(i, idx) })
    const jsonStart = text.indexOf('{', idx + tag.length)
    if (jsonStart === -1) { result.push({ type: 'text', content: text.slice(idx) }); break }
    let depth = 0, j = jsonStart
    while (j < text.length) {
      if (text[j] === '{') depth++
      else if (text[j] === '}') { depth--; if (depth === 0) break }
      j++
    }
    const closeBracket = text.indexOf(']', j)
    if (closeBracket === -1) { result.push({ type: 'text', content: text.slice(idx) }); break }
    result.push({ type: 'graph', content: text.slice(jsonStart, j + 1) })
    i = closeBracket + 1
  }
  return result
}

// ── Rendu LaTeX inline avec KaTeX ─────────────────────────────────
function renderLatexLine(line: string): string {
  // Remplace $$...$$ (block) puis $...$ (inline) par du HTML KaTeX
  // On utilise une approche simple : convertir en HTML via pattern matching
  let result = line

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
          try { return <SmartGraph key={idx} spec={JSON.parse(seg.content)} /> }
          catch {
            return (
              <div key={idx} style={{ fontSize: 11, color: '#fcd34d', padding: '6px 10px', background: 'rgba(245,158,11,0.08)', borderRadius: 8, margin: '6px 0' }}>
                📊 Graphique non disponible
              </div>
            )
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
function buildSolutionHtml(exercise: string, solution: string, mode: string, preRenderedBody?: string): string {
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
    if (ln.match(/^\[GRAPH:/)) return '<div class="graph-note">📊 Voir le graphique dans l&#39;application Bac.AI Tunisie</div>'
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
<title>Bac.AI Tunisie — ${modeLabel}</title>
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
  .brand { font-size: 11px; font-weight: 700; color: #4f6ef7; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 4px; }
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
    <button class="print-btn" onclick="window.print()">🖨 Imprimer / Enregistrer en PDF</button>
    <span style="font-size:12px;color:#666">Boîte d'impression → <strong>Enregistrer en PDF</strong> · Cochez <strong>Graphiques d'arrière-plan</strong></span>
  </div>

  <!-- EN-TÊTE -->
  <div class="header">
    <div class="header-left">
      <div class="brand">∑ Bac.AI Tunisie · Solveur IA</div>
      <div class="htitle">${icon} ${modeLabel}</div>
      <div class="hsub">Programme officiel · Bac Tunisie & France</div>
    </div>
    <div class="header-right">
      <strong>Date :</strong> ${date}<br>
      <strong>Section :</strong> 4ème Année<br>
      <strong>Source :</strong> Bac.AI Tunisie
    </div>
  </div>

  <!-- EXERCICE -->
  <div class="ex-label">📝 Énoncé de l'exercice</div>
  <div class="ex-box">${esc(exercise)}</div>

  <!-- SOLUTION -->
  <div class="sol-box">
    <div class="sol-label">✅ ${modeLabel} — Bac.AI Tunisie</div>
    <div id="solution-body">
${bodyLines}
    </div>
  </div>

  <!-- PIED DE PAGE -->
  <div class="footer">
    <span><strong>Bac.AI Tunisie</strong> — Solveur IA · Programme CNP officiel</span>
    <span>Session Bac Tunisie & France ${new Date().getFullYear()}</span>
    <span>Page 1/1</span>
  </div>

</div>

<script>
  // Le LaTeX est déjà rendu (pré-rendu par KaTeX côté application)
  // Impression immédiate sans délai
  window.addEventListener('load', () => setTimeout(() => window.print(), 300));
<\/script>
</body>
</html>`
}

function openSolutionPdf(exercise: string, solution: string, mode: string) {
  // Pré-rendre le LaTeX avec KaTeX AVANT d'ouvrir la fenêtre
  // (utilise le KaTeX déjà chargé dans la page principale)
  function preRenderLatex(sol: string): string {
    const katex = (window as any).katex
    if (!katex) return sol.split('\n').map(convertLineForPdf).join('\n')
    return sol.split('\n').map((ln: string) => {
      if (!ln.trim()) return '<div class="spacer"></div>'
      const processed = convertLineForPdf(ln)
      // Rendre les $$...$$ (display)
      const withDisplay = processed.replace(/\$\$([^$]+?)\$\$/g, (_: string, math: string) => {
        try { return `<div class="katex-display-wrap">${katex.renderToString(math.trim(), {throwOnError:false, displayMode:true})}</div>` }
        catch { return math }
      })
      // Rendre les $...$ (inline)
      const withInline = withDisplay.replace(/\$([^$\n]+?)\$/g, (_: string, math: string) => {
        try { return katex.renderToString(math.trim(), {throwOnError:false, displayMode:false}) }
        catch { return math }
      })
      return withInline
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
    if (ln.match(/^\[GRAPH:/)) return '<div class="graph-note">📊 Graphique — voir l&#39;application</div>'
    if (ln.startsWith('## '))  return `<h2>${ep(ln.slice(3))}</h2>`
    if (ln.startsWith('### ')) return `<h3>${ep(ln.slice(4))}</h3>`
    if (ln.startsWith('#### ')) return `<h4>${ep(ln.slice(5))}</h4>`
    if (ln.startsWith('> '))   return `<div class="result">${ep(ln.slice(2))}</div>`
    if (ln.startsWith('- '))   return `<li>${ep(ln.slice(2))}</li>`
    if (ln.startsWith('|'))    return `<div class="tbl-row">${ep(ln)}</div>`
    if (!ln.trim())            return '<div class="spacer"></div>'
    return `<p>${ep(ln)}</p>`
  }

  const preRenderedBody = preRenderLatex(solution)
  const html = buildSolutionHtml(exercise, solution, mode, preRenderedBody)
  const w = window.open('', '_blank')
  if (!w) throw new Error('Popup bloqué')
  w.document.write(html); w.document.close()
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
    try {
      if (ext === 'txt' || ext === 'md') {
        const text = await file.text(); onExtracted(text.trim()); setLoading(false); return
      }
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1]
        try {
          let text = ''
          if (ext === 'pdf') {
            const r = await fetch('/api/solve', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1500, messages: [{ role: 'user', content: [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } }, { type: 'text', text: 'Extrais uniquement le texte de cet exercice (mathématiques, physique-chimie ou SVT). Garde tous les symboles, unités et formules. Pas de commentaires.' }] }] })
            })
            const d = await r.json()
            text = d.content?.map((c: any) => c.text || '').join('') || ''
          } else {
            const mediaType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'
            text = await askClaudeWithImage(
              'Transcris exactement le texte de cet exercice (maths, physique-chimie ou SVT). Garde tous les symboles, unités et formules. Retourne UNIQUEMENT le texte, sans commentaire.',
              'Tu es un OCR précis spécialisé en mathématiques, physique-chimie et SVT.', base64, mediaType, 1500
            )
          }
          onExtracted(text.trim())
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
const SOLVE_HISTORY_KEY = 'bacai_solve_history'
const MAX_SOLVE_HISTORY = 30

function saveSolveHistory(items: HistoryItem[]): void {
  try { localStorage.setItem(SOLVE_HISTORY_KEY, JSON.stringify(items.slice(0, MAX_SOLVE_HISTORY))) }
  catch {}
}

function loadSolveHistory(): HistoryItem[] {
  try { return JSON.parse(localStorage.getItem(SOLVE_HISTORY_KEY) || '[]') }
  catch { return [] }
}

function deleteSolveItem(id: string, current: HistoryItem[]): HistoryItem[] {
  const updated = current.filter(h => h.id !== id)
  saveSolveHistory(updated)
  return updated
}

// ══════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ══════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE — avec quotas Supabase
// ══════════════════════════════════════════════════════════════════════
function SolvePageInner() {
  const { isAdmin, hasActiveSubscription, checkQuota, incrementQuota, quotas, quotaLimits, isSprint } = useAuth()

  const [mode, setMode] = useState<Mode>('solve')
  const searchParams = useSearchParams()
  const [input, setInput] = useState(() => {
    // Pré-remplir depuis ?q= (venant d'une page chapitre)
    const q = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('q') : null
    return q ? decodeURIComponent(q) : ''
  })
  const [myAnswer, setMyAnswer] = useState('')
  const [phase, setPhase] = useState<Phase>('input')
  const [solution, setSolution] = useState('')
  const [error, setError] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>(() => loadSolveHistory())
  const [showHistory, setShowHistory] = useState(false)
  const [similarQ, setSimilarQ] = useState<string[]>([])
  const [pdfMsg, setPdfMsg] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll et focus si exercice pré-rempli depuis une page chapitre
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q')
    if (q && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        textareaRef.current?.focus()
      }, 300)
    }
  }, [])
  const solutionRef = useRef<HTMLDivElement>(null)

  // Quota depuis AuthContext (Supabase)
  const solverUsed      = quotas?.solver_used || 0
  const solverLimit     = quotaLimits.solver_per_week // -1 = illimité (Sprint Bac)
  const isQuotaFull     = !isAdmin && !checkQuota('solver')
  const quotaRemaining  = isAdmin || solverLimit === -1
    ? 999
    : Math.max(0, solverLimit - solverUsed)
  const isUnlimited     = isAdmin || isSprint || solverLimit === -1

  const insertSymbol = useCallback((sym: string) => {
    const ta = textareaRef.current
    if (!ta) { setInput(p => p + sym); return }
    const start = ta.selectionStart; const end = ta.selectionEnd
    const newVal = input.slice(0, start) + sym + input.slice(end)
    setInput(newVal)
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + sym.length, start + sym.length) }, 10)
  }, [input])

  const handleSolve = async () => {
    if (!input.trim()) return

    // Vérifier quota via AuthContext (Supabase)
    if (!isAdmin && !checkQuota('solver')) {
      alert(`Quota atteint — ${solverLimit} résolutions/semaine.\nRenouvellement lundi prochain.\n\n📚 MathBac Mensuel : 60 DT/mois · 20/sem (🇹🇳) | 19€/mois · 20/sem (🇫🇷)\n🚀 Sprint Bac : 90 DT/mois · Illimité (🇹🇳) | 29€/mois · Illimité (🇫🇷)\n🎓 Annuel : 600 DT (🇹🇳) | 199€ (🇫🇷)\n\n→ mathsbac.com/abonnement`)
      return
    }

    setPhase('solving'); setSolution(''); setError(''); setSimilarQ([])

    const system = `Tu es un professeur expert du Bac Tunisie ET du Bac France, spécialiste en mathématiques, physique-chimie et sciences de la vie et de la Terre (SVT).
Tu rédiges des corrections EXHAUSTIVES, ULTRA-DETAILLEES et PEDAGOGIQUES.
Ne résume JAMAIS. Développe TOUT. Tu as suffisamment de tokens — utilise-les entièrement.
Structure : ## pour les grandes parties, ### pour les sous-questions.
**gras** pour les résultats clés, > pour les encadrés importants.

═══════════════════════════════════════════
DÉTECTION AUTOMATIQUE DE LA MATIÈRE
═══════════════════════════════════════════
Tu détectes automatiquement la matière selon les mots-clés de l'exercice :

MATHÉMATIQUES → fonction, dérivée, intégrale, limite, suite, vecteur, complexe, probabilité, équation, matrice, logarithme, exponentielle

PHYSIQUE-CHIMIE → force, vitesse, accélération, énergie, tension, courant, résistance, onde, fréquence, concentration, réaction, pH, oxydant, réducteur, noyau, radioactivité, satellite, fluide, pression, enthalpie, thermodynamique, circuit, condensateur, Doppler, interférence, diffraction, Newton, Bernoulli

SVT → cellule, ADN, ARN, protéine, gène, chromosome, mitose, méiose, photosynthèse, respiration, neurone, hormone, enzyme, écosystème, évolution, mutation, génotype, phénotype, immunité, digestion, reproduction

NOTATION MATHÉMATIQUE OBLIGATOIRE — LaTeX strict :
- Toutes les formules DOIVENT être en LaTeX : $formule$ pour inline, $$formule$$ pour centré
- JAMAIS écrire "frac(2,5)" ou "2/5" brut — TOUJOURS $\frac{2}{5}$
- JAMAIS écrire "E(X) = -2/5" — TOUJOURS $E(X) = -\frac{2}{5}$
- Fractions : $\frac{num}{den}$ · Racines : $\sqrt{x}$ · Puissances : $x^{2}$ · Indices : $x_{n}$
- Intégrales : $\int_{a}^{b} f(x)\,dx$ · Sommes : $\sum_{i=1}^{n}$ · Limites : $\lim_{x \to 0}$
- Probabilités : $P(X = k)$, $\binom{n}{k}$, $\frac{1}{10}$
- Résultats encadrés : > **Résultat :** $$formule$$

NOTATION PHYSIQUE-CHIMIE :
- Unités TOUJOURS précisées : m/s, mol/L, J·mol⁻¹, Pa, K, Bq
- Vecteurs : $\vec{F}$, $\vec{v}$, $\vec{a}$
- Équations chimiques avec flèches et états physiques
- Notation nucléaire : $^{A}_{Z}X$
- Formules clés : $\sum \vec{F} = m\vec{a}$, $PV = nRT$, $N(t) = N_0 e^{-\lambda t}$, $v = \lambda f$, $\Delta U = W + Q$

NOTATION SVT :
- Vocabulaire scientifique précis : ADN, ARNm, ribosome, etc.
- Schémas décrits en texte structuré avec légende étape par étape
- Tableaux de génétique formatés en markdown
- Cycles biologiques décrits avec → entre les étapes

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

GRAPHIQUES PHYSIQUE-CHIMIE — OBLIGATOIRE :
- Exercice sur une FONCTION f(t), v(t), [A](t), u_C(t) → TOUJOURS un graphique "function"
- Exemples :
  * Décroissance radioactive → [GRAPH: {"type":"function","expressions":["Math.exp(-0.05*x)"],"xMin":0,"xMax":60,"labels":["N(t)/N₀"],"title":"Décroissance radioactive"}]
  * Circuit RC → [GRAPH: {"type":"function","expressions":["1-Math.exp(-x)","Math.exp(-x)"],"xMin":0,"xMax":5,"labels":["Charge","Décharge"],"title":"u_C(t)/E en fonction de t/τ"}]
  * Cinétique → [GRAPH: {"type":"function","expressions":["1/(1+x)","x/(1+x)"],"xMin":0,"xMax":5,"labels":["[Réactif]","[Produit]"],"title":"Évolution des concentrations"}]

QUAND UTILISER — OBLIGATOIRE :
- Exercice sur une FONCTION (f(x), étude, dérivée, extremum, convexité) → TOUJOURS un graphique "function" avec la courbe de f ET f' si dérivée étudiée
- LIMITE (x→+∞, x→0) → graphique "function" montrant le comportement asymptotique
- INTÉGRALE → graphique "function" avec l'aire entre les bornes
- SUITE → graphique "function" des premiers termes
- TRIANGLE, cercle, géométrie → TOUJOURS type "geometry" avec axes + grille + toutes les formes
- VECTEURS, repère → type "geometry" avec "axes" + "vector"
- PHYSIQUE : toute grandeur qui varie dans le temps → graphique "function"
- RÈGLE ABSOLUE : si l'exercice contient f(x), un triangle, un cercle, des vecteurs, ou une grandeur physique variable → un graphique DOIT apparaître`

    const prompt = mode === 'solve'
      ? `Résous cet exercice (programme Bac Tunisie ou Bac France — Mathématiques, Physique-Chimie ou SVT) de façon COMPLÈTE et PÉDAGOGIQUE.

EXERCICE :
${input}

Structure OBLIGATOIRE (adapte selon la matière détectée) :

## Identification de la matière et du chapitre
[Matière : Maths / Physique-Chimie / SVT — Chapitre concerné — Programme Tunisie ou France]

## Rappel du cours (formules et théorèmes utiles)
[Les 2-3 formules ou définitions clés nécessaires pour résoudre cet exercice]

## Résolution complète
[Pour chaque question — ne saute AUCUNE étape :
### Question X
**Méthode :** [Théorème/formule appliqué et POURQUOI]
**Calculs :**
- Étape 1 : [calcul complet avec UNITÉS pour la physique] → [résultat intermédiaire]
- Étape 2 : ...
> **Résultat :** [réponse finale encadrée avec unité SI]
]

## Synthèse & Points clés
[Résultats finals + formules clés à retenir + erreur classique à éviter sur ce type d'exercice]`

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
      const sol = await askClaude(prompt, system, 6000)

      // Vérifier si quota dépassé côté serveur (status 429)
      if (sol.startsWith('⚠️') && sol.includes('quota')) {
        setError(sol); setPhase('input'); return
      }

      // Incrémenter quota dans Supabase
      await incrementQuota('solver')

      setSolution(sol)
      setPhase('done')
      setHistory(prev => {
        const updated = [{
          id: Date.now().toString(), exercise: input,
          solution: sol, mode, timestamp: new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
        }, ...prev.slice(0, 29)]
        saveSolveHistory(updated)
        return updated
      })
      setTimeout(() => solutionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)

      // Questions similaires en arrière-plan (ne compte pas dans le quota)
      askClaude(
        `Exercice : "${input.slice(0, 200)}"\nGénère 3 exercices similaires de difficulté légèrement croissante pour Bac Tunisie ou Bac France (même matière : Maths, Physique-Chimie ou SVT).\nRéponds UNIQUEMENT en JSON : ["question1","question2","question3"]`,
        'Tu génères des exercices. Réponds UNIQUEMENT en JSON valide.', 500
      ).then(raw => {
        try {
          const arr = JSON.parse(raw.replace(/```json|```/g, '').trim())
          if (Array.isArray(arr)) setSimilarQ(arr.slice(0, 3))
        } catch { /* silencieux */ }
      }).catch(() => { /* silencieux */ })
    } catch (e: any) {
      setError(e.message || 'Erreur de résolution'); setPhase('input')
    }
  }

  const handlePdf = () => {
    try {
      openSolutionPdf(input, solution, mode)
      setPdfMsg('Ouvert dans un nouvel onglet !')
      setTimeout(() => setPdfMsg(''), 3000)
    } catch { setPdfMsg('Autorisez les popups') }
  }

  const reset = () => {
    setPhase('input'); setInput(''); setMyAnswer('')
    setSolution(''); setError(''); setSimilarQ([])
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
              <div style={{ fontSize: 11, fontWeight: 700, color: '#4f6ef7', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 }}>🧮 Solveur IA</div>
              <h1 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: '#e2e8f0', margin: '0 0 6px' }}>
                Résolution étape par étape
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, margin: 0 }}>
                Résous · Vérifie ta solution · Graphiques · PDF imprimable
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
                <button onClick={e => { e.stopPropagation(); const updated: HistoryItem[] = []; setHistory(updated); saveSolveHistory(updated) }}
                  style={{ fontSize:10, padding:'2px 8px', borderRadius:5, border:'1px solid rgba(239,68,68,0.3)', background:'transparent', color:'rgba(239,68,68,0.6)', cursor:'pointer', fontFamily:'inherit' }}>
                  Vider
                </button>
              </div>
              {history.map((item, i) => (
                <div key={item.id}
                  onClick={() => { setInput(item.exercise); setSolution(item.solution); setMode(item.mode); setPhase('done'); setShowHistory(false) }}
                  style={{ padding: '11px 18px', borderBottom: i < history.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,110,247,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontSize: 16 }}>{item.mode === 'verify' ? '🔍' : '🧮'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.exercise.slice(0, 70)}{item.exercise.length > 70 ? '…' : ''}
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                      {item.timestamp}
                    </p>
                  </div>
                  <span style={{ fontSize: 11, color: '#4f6ef7', flexShrink: 0 }}>Revoir →</span>
                  <button onClick={e => { e.stopPropagation(); setHistory(prev => deleteSolveItem(item.id, prev)) }}
                    style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(239,68,68,0.45)', fontSize:15, padding:'0 2px', flexShrink:0, lineHeight:1 }}
                    title="Supprimer">×</button>
                </div>
              ))}
            </div>
          )}
          {showHistory && history.length === 0 && (
            <div style={{ marginBottom: 24, padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
              Aucun exercice résolu pour le moment
            </div>
          )}

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
                      placeholder="Écris ici tes calculs, ta démarche et ton résultat…"
                      rows={5}
                      style={{ width: '100%', borderRadius: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(16,185,129,0.25)', color: '#e2e8f0', fontSize: 14, fontFamily: 'monospace', padding: '12px 14px', resize: 'vertical', outline: 'none', lineHeight: 1.7, boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = '#06d6a0'}
                      onBlur={e => e.target.style.borderColor = 'rgba(16,185,129,0.25)'}
                    />
                  </>
                )}

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
                    ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> L&apos;IA résout en cours…</>
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
                    🎨 Imprimer PDF
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
                          .replace(/\\left[|(\[.]/g,'').replace(/\\right[|)\].]/g,'')
                          .replace(/\\\\/g,'\n')
                          .replace(/\{/g,'').replace(/\}/g,'')
                          .replace(/\\[a-zA-Z]+\*/g,'').replace(/\\[a-zA-Z]+/g,'')
                      }
                      const lines = solution.split('\n').map((ln: string) => {
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
                  🎨 Imprimer cette solution
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
            Solveur alimenté par Claude AI · Programme Bac Tunisie & France 2026
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