'use client'
import { useState, useRef, useEffect, useCallback } from 'react'   
import Navbar from '@/components/layout/Navbar'
import { useAuth } from '@/lib/auth/AuthContext'
import { sumQuotasAcrossMatiere } from '@/lib/types/monetisation'

// ── Charge KaTeX une seule fois globalement ───────────────────────
function useKaTeX() {
  useEffect(() => {
    if ((window as any).__katexLoaded) return
    ;(window as any).__katexLoaded = true
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js'
    script.crossOrigin = 'anonymous'
    script.onload = () => { (window as any).__katexReady = true }
    document.head.appendChild(script)
  }, [])
}

// ── Rendu LaTeX inline + block avec KaTeX ────────────────────────
function renderKaTeX(text: string): string {
  let result = text

  // ✅ $$...$$ → BLOCK (avec data-latex pour copie)
  result = result.replace(/\$\$([\s\S]+?)\$\$/g, (_: string, math: string) => {
    try {
      const katex = (window as any).katex
      if (!katex) return `<span style="font-style:italic;color:var(--muted)">[formule mathématique]</span>`
      const rendered = katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
      const safeMath = math.trim().replace(/"/g, '&quot;').replace(/\n/g, ' ')
      return `<div style="text-align:center;margin:10px 0;overflow-x:auto" data-latex="$$${safeMath}$$">${rendered}</div>`
    } catch {
      return `<code>${math}</code>`
    }
  })

  // ✅ $...$ → INLINE (avec data-latex pour copie)
  result = result.replace(/\$([^$]+?)\$/g, (_: string, math: string) => {
    try {
      const katex = (window as any).katex
      if (!katex) return `<span style="font-style:italic">${math}</span>`
      const rendered = katex.renderToString(math.trim(), { throwOnError: false, displayMode: false })
      const safeMath = math.trim().replace(/"/g, '&quot;')
      return `<span data-latex="$${safeMath}$" style="display:inline">${rendered}</span>`
    } catch {
      return `<code>${math}</code>`
    }
  })

  return result
}

// ════════════════════════════════════════════════════════════════════
// QUOTAS HEBDOMADAIRES — Chat IA (géré par Supabase via AuthContext)
// Standard  : 35 questions/semaine
// Sprint Bac (avr-mai) : 50/semaine  
// Admin bensghaiermejdi70@gmail.com = ILLIMITÉ (tous les PC)
// ════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════
// HISTORIQUE — Sauvegarde / Restauration localStorage
// ══════════════════════════════════════════════════════════════════════
const HISTORY_KEY = 'bacai_chat_history'
const MAX_SESSIONS = 20  // max sessions sauvegardées

interface ChatSession {
  id: string
  title: string
  date: string
  messages: { role: string; content: string; id: number }[]
  preview: string
}

function saveSession(messages: { role: string; content: string; id: number }[]): void {
  if (messages.length < 2) return  // Pas de session vide
  try {
    const sessions: ChatSession[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
    const firstUser = messages.find(m => m.role === 'user')
    const title = firstUser ? firstUser.content.slice(0, 60) : 'Conversation'
    const preview = messages.filter(m => m.role === 'assistant')[0]?.content.slice(0, 100) || ''
    const session: ChatSession = {
      id: Date.now().toString(),
      title,
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      messages,
      preview,
    }
    const updated = [session, ...sessions.filter(s => s.id !== session.id)].slice(0, MAX_SESSIONS)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  } catch {}
}

function loadSessions(): ChatSession[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') }
  catch { return [] }
}

function deleteSession(id: string): void {
  try {
    const sessions = loadSessions().filter(s => s.id !== id)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions))
  } catch {}
}

// ══════════════════════════════════════════════════════════════════════
// PDF COLORÉ — Conversation complète
// ══════════════════════════════════════════════════════════════════════
function buildChatHtml(messages: { role: string; content: string }[], graphImages: string[] = [], svgImages: string[] = []): string {
  const date = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

  function convertLine(ln: string): string {
    // Ignorer les blocs graphiques JSON bruts
    if (ln.trim().startsWith('{') || ln.trim().startsWith('"type"') || 
        ln.trim().startsWith('"title"') || ln.trim().startsWith('"xrange"') ||
        ln.trim().startsWith('"functions"') || ln.trim().startsWith('"points"') ||
        ln.trim().startsWith('"shapes"') || ln.trim().startsWith('"asymptotes"') ||
        ln.trim() === '```' || ln.trim() === '```graph') return ''
    if (!ln.trim()) return '<div style="height:6px"></div>'
    const ep = (s: string): string => {
      // 1. Blocs $$...$$ → span centré avec texte lisible
      let r = s.replace(/\$\$([\s\S]+?)\$\$/g, (_: string, math: string) => {
        const readable = latexToReadable(math.trim())
        return `<div style="text-align:center;margin:6px 0;padding:4px 0;font-family:'Cambria Math','Times New Roman',serif;font-size:14px;color:#1a1a2e">${esc(readable)}</div>`
      })
      // 2. $...$ inline → span avec texte lisible
      r = r.replace(/\$([^$\n]+?)\$/g, (_: string, math: string) => {
        const readable = latexToReadable(math.trim())
        return `<span style="font-family:'Cambria Math','Times New Roman',serif;color:#1e1b4b">${esc(readable)}</span>`
      })
      // 3. Markdown bold/italic
      r = r.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')
      // 4. Échapper le reste (déjà partiellement échappé via esc dans latexToReadable)
      return r
    }
    if (ln.startsWith('## '))  return `<h3 style="font-size:14px;font-weight:700;color:#4f6ef7;margin:14px 0 5px;border-bottom:1px solid #e0e7ff;padding-bottom:4px">${ep(ln.slice(3))}</h3>`
    if (ln.startsWith('### ')) return `<h4 style="font-size:13px;font-weight:700;color:#1a1a2e;margin:10px 0 4px">${ep(ln.slice(4))}</h4>`
    if (ln.startsWith('> '))   return `<div style="background:#f0f4ff;border-left:3px solid #4f6ef7;padding:8px 12px;margin:6px 0;border-radius:0 6px 6px 0;font-weight:600;color:#1e1b4b">${ep(ln.slice(2))}</div>`
    if (ln.startsWith('- '))   return `<li style="margin:2px 0 2px 18px;font-size:13px">${ep(ln.slice(2))}</li>`
    if (/^\d+\.\s/.test(ln)) return `<li style="margin:2px 0 2px 18px;font-size:13px;list-style-type:decimal">${ep(ln.replace(/^\d+\.\s/,''))}</li>`
    return `<p style="margin:3px 0;font-size:13.5px;line-height:1.75">${ep(ln)}</p>`
  }

  const msgHtml = messages.map(m => {
    const isUser = m.role === 'user'
    // Remplacer les blocs ```graph...``` (ouverts ou fermés) par une note propre
    let graphIdx = 0
    let svgIdx = 0
    const cleanContent = m.content
      .replace(/```graph[\s\S]*?```/g, () => {
        // Essayer d'abord un canvas capturé
        const canvasImg = graphImages[graphIdx]
        const svgImg = svgImages[svgIdx]
        if (canvasImg) {
          graphIdx++
          return `<div style="margin:12px 0;text-align:center"><img src="${canvasImg}" style="max-width:100%;border-radius:8px;border:1px solid #e2e8f0" alt="Graphique"/></div>`
        } else if (svgImg) {
          svgIdx++
          return `<div style="margin:12px 0;text-align:center"><img src="${svgImg}" style="max-width:100%;border-radius:8px;border:1px solid #e2e8f0" alt="Graphique"/></div>`
        }
        return '<div style="background:#f0f4ff;border-left:3px solid #4f6ef7;padding:8px 12px;margin:8px 0;border-radius:0 6px 6px 0;font-style:italic;color:#4f6ef7;font-size:12px">📊 Graphique — ouvrir dans MathBac.AI pour visualiser</div>'
      })
    const bodyLines = cleanContent.split('\n').map(convertLine).join('')
    return `
    <div style="margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <div style="width:28px;height:28px;border-radius:50%;background:${isUser?'linear-gradient(135deg,#4f6ef7,#7c3aed)':'linear-gradient(135deg,#06d6a0,#059669)'};display:flex;align-items:center;justify-content:center;font-size:14px;color:white;flex-shrink:0">${isUser?'👤':'🤖'}</div>
        <strong style="font-size:12px;color:${isUser?'#4f6ef7':'#059669'}">${isUser?'Élève':'Prof IA'}</strong>
      </div>
      <div style="margin-left:36px;background:${isUser?'#f8f9ff':'#ffffff'};border:1px solid ${isUser?'#c7d4f5':'#e2e8f0'};border-left:3px solid ${isUser?'#4f6ef7':'#06d6a0'};border-radius:0 8px 8px 0;padding:12px 16px">
        ${bodyLines}
      </div>
    </div>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>MathBac.AI — Chat Prof IA</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1a1a2e;font-size:14px;line-height:1.7}
  .page{max-width:800px;margin:0 auto;padding:32px 40px 60px}
  .print-bar{position:sticky;top:0;z-index:99;background:#fff;border-bottom:2px solid #1a1a2e;padding:10px 0 12px;margin-bottom:20px;display:flex;align-items:center;gap:12px}
  .print-btn{background:#1a1a2e;color:#fff;border:none;border-radius:6px;padding:9px 22px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
  .header{display:grid;grid-template-columns:1fr auto;align-items:center;border:2px solid #1a1a2e;border-radius:4px;margin-bottom:24px;overflow:hidden}
  .header-left{padding:16px 22px}
  .brand{font-size:11px;font-weight:700;color:#4f6ef7;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
  .htitle{font-size:19px;font-weight:800;color:#1a1a2e}
  .header-right{background:#1a1a2e;color:#fff;padding:16px 20px;text-align:right;font-size:12px;line-height:1.7}
  .footer{margin-top:32px;padding-top:12px;border-top:2px solid #1a1a2e;display:flex;justify-content:space-between;font-size:10px;color:#666}
  .katex-display{margin:8px 0!important;overflow-x:auto}
  @media print{.print-bar{display:none!important}.page{padding:10px 20px}}
</style>
</head>
<body>
<div class="page">
  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">🖨 Imprimer / Enregistrer en PDF</button>
    <span style="font-size:12px;color:#666">Boîte d'impression → <strong>Enregistrer en PDF</strong></span>
  </div>
  <div class="header">
    <div class="header-left">
      <div class="brand">🤖 MathBac.AI · Chat Prof IA</div>
      <div class="htitle">Conversation mathématiques</div>
    </div>
    <div class="header-right">
      <strong>Date :</strong> ${date}<br>
      <strong>Messages :</strong> ${messages.length}<br>
      <strong>Source :</strong> MathBac.AI
    </div>
  </div>
  ${msgHtml}
  <div class="footer">
    <span><strong>MathBac.AI</strong> — Chat Prof IA · Programme CNP officiel</span>
    <span>MathBac.AI ${new Date().getFullYear()}</span>
  </div>
</div>
<script>
  const katexCDN='https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js'
  const s=document.createElement('script');s.src=katexCDN;s.onload=()=>{
    document.querySelectorAll('p,h3,h4,li,div').forEach(el=>{
      try{if(el.children.length===0)el.innerHTML=el.innerHTML
        .replace(/\\$\\$([\\s\\S]+?)\\$\\$/g,(_,m)=>katex.renderToString(m.trim(),{throwOnError:false,displayMode:true}))
        .replace(/\\$([^$\\n]+?)\\$/g,(_,m)=>katex.renderToString(m.trim(),{throwOnError:false,displayMode:false}))}catch(e){}
    })
    setTimeout(()=>window.print(),600)
  };document.head.appendChild(s)
<\/script>
</body>
</html>`
}

function openChatPdf(messages: { role: string; content: string }[]): void {
  // 1. Capturer tous les graphiques visibles dans le DOM avant de générer le PDF
  const graphImages: string[] = []

  // Canvas (FunctionGraph)
  document.querySelectorAll('canvas').forEach((canvas) => {
    try {
      const dataUrl = canvas.toDataURL('image/png')
      graphImages.push(dataUrl)
    } catch { /* canvas cross-origin ignoré */ }
  })

  // SVG (GeometryGraph) → convertir en image PNG via blob
  // On les capture comme SVG inline (plus simple et fiable)
  const svgImages: string[] = []
  document.querySelectorAll('svg').forEach((svg) => {
    try {
      const serializer = new XMLSerializer()
      const svgStr = serializer.serializeToString(svg)
      const encoded = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr)
      svgImages.push(encoded)
    } catch { /* ignoré */ }
  })

  const html = buildChatHtml(messages, graphImages, svgImages)
  const w = window.open('', '_blank')
  if (!w) { alert('Popup bloqué — autorisez les popups pour ce site'); return }
  w.document.write(html); w.document.close()
}

function latexToReadable(src: string): string {
  return src
    .replace(/\\begin\{[pv]matrix\}([\s\S]*?)\\end\{[pv]matrix\}/g,
      (_: string, m: string) => '\n' + m.trim().split('\\\\')
        .map((r: string) => '[ ' + r.split('&').map((x: string) => x.trim()).join('  ') + ' ]')
        .join('\n') + '\n')
    .replace(/\\[df]rac\{([^{}]*)\}\{([^{}]*)\}/g, '($1/$2)')
    .replace(/\\binom\{([^}]*)\}\{([^}]*)\}/g, 'C($1,$2)')
    .replace(/\\times/g,'×').replace(/\\cdot/g,'·').replace(/\\div/g,'÷')
    .replace(/\\pm/g,'±').replace(/\\leq/g,'≤').replace(/\\geq/g,'≥')
    .replace(/\\neq/g,'≠').replace(/\\approx/g,'≈').replace(/\\infty/g,'∞')
    .replace(/\\in\b/g,'∈').replace(/\\cup/g,'∪').replace(/\\cap/g,'∩')
    .replace(/\\emptyset/g,'∅').replace(/\\forall/g,'∀').replace(/\\exists/g,'∃')
    .replace(/\\Rightarrow/g,'⇒').replace(/\\Leftrightarrow/g,'⟺')
    .replace(/\\rightarrow|\\to\b/g,'→').replace(/\\leftarrow/g,'←')
    .replace(/\\overrightarrow\{([^}]*)\}/g,'$1⃗')
    .replace(/\\vec\{([^}]*)\}/g,'$1⃗')
    .replace(/\\sqrt\{([^}]+)\}/g,'√($1)').replace(/\\sqrt/g,'√')
    .replace(/\\ln\b/g,'ln').replace(/\\log\b/g,'log')
    .replace(/\\sin\b/g,'sin').replace(/\\cos\b/g,'cos').replace(/\\tan\b/g,'tan')
    .replace(/\\sum/g,'∑').replace(/\\prod/g,'∏').replace(/\\int/g,'∫')
    .replace(/\\alpha/g,'α').replace(/\\beta/g,'β').replace(/\\gamma/g,'γ')
    .replace(/\\delta/g,'δ').replace(/\\Delta/g,'Δ').replace(/\\pi\b/g,'π')
    .replace(/\\sigma/g,'σ').replace(/\\omega/g,'ω').replace(/\\theta/g,'θ')
    .replace(/\\left\s*\(/g,'(').replace(/\\right\s*\)/g,')')
    .replace(/\\left\s*\[/g,'[').replace(/\\right\s*\]/g,']')
    .replace(/\\left\s*\|/g,'|').replace(/\\right\s*\|/g,'|')
    .replace(/\\left/g,'').replace(/\\right/g,'')
    // Sommes avec bornes : \sum_{k=1}^{n} → ∑(k=1 to n)
    .replace(/∑_\{([^}]*)\}\^\{([^}]*)\}/g,'∑(k=$1 to $2)')
    .replace(/∫_\{([^}]*)\}\^\{([^}]*)\}/g,'∫($1 to $2)')
    .replace(/\^\{([^}]+)\}/g,'^($1)').replace(/\_\{([^}]+)\}/g,'_($1)')
    .replace(/\^([0-9a-z])/g,'^$1').replace(/_([0-9a-z])/g,'_$1')
    .replace(/\\\\|\{|\}/g,' ').replace(/\\[a-zA-Z]+/g,'').replace(/\s+/g,' ').trim()
}


// ── Copie robuste (fonctionne même si document non focalisé) ──────
function copyToClipboard(text: string): Promise<void> {
  // Méthode 1 : Clipboard API moderne
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text))
  }
  return fallbackCopy(text)
}

function fallbackCopy(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    try {
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      ok ? resolve() : reject(new Error('execCommand failed'))
    } catch (e) {
      document.body.removeChild(ta)
      reject(e)
    }
  })
}

const SYSTEM_PROMPT = `Tu es le Professeur IA de MathBac.AI — enseignant polyvalent expert, couvrant TOUTES les matières du Bac tunisien ET du Bac français.
Tu maîtrises : Mathématiques, Physique-Chimie, SVT, Informatique, Anglais, Littérature française, Français.
Tu réponds en français ET en anglais selon la langue de la question de l'élève.

## TON IDENTITÉ
- Tu t'appelles "Prof IA" ou "Professeur MathBac"
- Tu es bienveillant, pédagogique, encourageant et rigoureux
- Tu n'as AUCUNE restriction de matière : toute question d'un élève mérite une réponse complète
- Si la question est en anglais → tu réponds ENTIÈREMENT en anglais
- Si la question est en français → tu réponds en français
- Tu ne refuses JAMAIS une question en disant que tu es limité à une matière

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎨 CAPACITÉ GRAPHIQUE — RÈGLE ABSOLUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quand l'élève demande : "trace", "représente", "graphique", "courbe", "figure", "dessin", "schéma", "visualise", "montre", "plot", "esquisse" — ou quand c'est pédagogiquement utile — tu DOIS générer un bloc graphique dans ta réponse.

### TYPE 1 — FONCTIONS (courbes mathématiques)
Utilise ce format JSON exact dans un bloc \`\`\`graph :

\`\`\`graph
{
  "type": "function",
  "title": "Courbe de f(x) = x²",
  "xrange": [-4, 4],
  "yrange": [-1, 10],
  "functions": [
    { "expr": "x*x", "label": "f(x) = x²", "color": "#6366f1" },
    { "expr": "2*x+1", "label": "g(x) = 2x+1", "color": "#06d6a0" }
  ],
  "points": [
    { "x": 0, "y": 0, "label": "Sommet S(0,0)", "color": "#f59e0b" }
  ],
  "asymptotes": [
    { "type": "vertical", "x": 0, "label": "x=0" },
    { "type": "horizontal", "y": 2, "label": "y=2" }
  ]
}
\`\`\`

### Expressions JS valides pour les fonctions :
- x² → x*x  |  x³ → x*x*x  |  xⁿ → Math.pow(x,n)
- √x → Math.sqrt(x)  |  |x| → Math.abs(x)
- sin(x) → Math.sin(x)  |  cos(x) → Math.cos(x)  |  tan(x) → Math.tan(x)
- ln(x) → Math.log(x)  |  log₁₀(x) → Math.log10(x)
- eˣ → Math.exp(x)  |  1/x → 1/x

### TYPE 2 — GÉOMÉTRIE (figures géométriques)
\`\`\`graph
{
  "type": "geometry",
  "title": "Triangle ABC et ses médianes",
  "width": 420,
  "height": 380,
  "shapes": [
    { "type": "axes", "xrange": [-1, 5], "yrange": [-1, 4] },
    { "type": "grid" },
    { "type": "triangle", "points": [[0,0],[4,0],[2,3]], "color": "#6366f1", "fill": "rgba(99,102,241,0.08)", "label": "ABC" },
    { "type": "point", "x": 0, "y": 0, "color": "#ef4444", "label": "A" },
    { "type": "point", "x": 4, "y": 0, "color": "#ef4444", "label": "B" },
    { "type": "point", "x": 2, "y": 3, "color": "#ef4444", "label": "C" }
  ]
}
\`\`\`

Formes disponibles : axes, grid, point, segment, line, vector, circle, triangle, polygon, rect, angle, arc, median, label, rightangle

### TYPE 3 — SCHÉMAS ASCII (pile, circuit, synapse, ADN)
Mots-clés déclencheurs : "circuit", "condensateur", "RC", "RL", "RLC", "pile", "dosage", "synapse", "ADN", "lentille"
Format :
\`\`\`graph
{"type":"ascii","title":"Circuit RLC série","content":"  ┌──┤R├──┤L├──┬──┐\n  │             ═╪═C\n  E(t)           │\n  └─────────────┘","legend":["R: résistance (Ω)","L: bobine (H)","C: condensateur (F)"]}
\`\`\`

### TYPE 4 — TABLEAU DE DONNÉES
Mots-clés : "tableau", "loi de proba", "tableau de signe", "tableau de valeurs", "résultats", "algo"
\`\`\`graph
{"type":"table","title":"Loi binomiale B(5, 0.4)","headers":["k","P(X=k)","P(X≤k)"],"rows":[["0","0.078","0.078"],["1","0.259","0.337"],["2","0.346","0.683"],["3","0.230","0.913"],["4","0.077","0.990"],["5","0.010","1.000"]],"highlight":[2]}
\`\`\`

### TYPE 5 — HISTOGRAMME / BARRES
Mots-clés : "histogramme", "diagramme en barres", "comparaison", "statistiques SVT"
\`\`\`graph
{"type":"bar","title":"Comparaison","categories":["A","B","C","D"],"values":[23,45,12,67],"colors":["#6366f1","#10b981","#f59e0b","#ec4899"],"xLabel":"Groupes","yLabel":"Fréquence"}
\`\`\`

RÈGLE ABSOLUE : JAMAIS écrire [FIGURE : ...] ou [SCHÉMA : ...] — TOUJOURS générer le bloc graphique correspondant.
pile/circuit → TYPE 3 ascii · courbe → TYPE 1 · géo → TYPE 2 · tableau → TYPE 4 · histo → TYPE 5

**Circuit RC charge :**
\`\`\`graph
{
  "type": "geometry",
  "title": "Circuit RC — charge du condensateur",
  "width": 500, "height": 340,
  "shapes": [
    { "type": "axes", "xrange": [-1,10], "yrange": [-1,6] },
    { "type": "rect", "x": 0, "y": 1, "w": 0.4, "h": 4, "color": "#2563eb", "fill": "rgba(37,99,235,0.15)", "label": "E=4.5V" },
    { "type": "rect", "x": 3.5, "y": 3.5, "w": 1.5, "h": 0.8, "color": "#ef4444", "fill": "rgba(239,68,68,0.2)", "label": "R" },
    { "type": "rect", "x": 5.5, "y": 1.5, "w": 0.5, "h": 2, "color": "#8b5cf6", "fill": "rgba(139,92,246,0.15)", "label": "C" },
    { "type": "segment", "x1": 0, "y1": 5, "x2": 10, "y2": 5, "color": "#374151" },
    { "type": "segment", "x1": 0, "y1": 0, "x2": 10, "y2": 0, "color": "#374151" },
    { "type": "segment", "x1": 10, "y1": 0, "x2": 10, "y2": 5, "color": "#374151" },
    { "type": "vector", "x1": 2, "y1": 5, "x2": 3.5, "y2": 5, "color": "#dc2626", "label": "i" },
    { "type": "label", "x": 1.5, "y": 3, "text": "u_C", "color": "#059669", "bold": true },
    { "type": "label", "x": 4.2, "y": 4.5, "text": "u_R", "color": "#7c3aed", "bold": true }
  ]
}
\`\`\`

**Courbes RC charge/décharge :**
\`\`\`graph
{
  "type": "function",
  "title": "Charge et décharge RC — u_C(t)",
  "xrange": [0, 5],
  "yrange": [-0.2, 1.2],
  "functions": [
    { "expr": "1 - Math.exp(-x)", "label": "Charge u_C(t) = E(1−e^(−t/τ))", "color": "#4f6ef7" },
    { "expr": "Math.exp(-x)", "label": "Décharge u_C(t) = U₀·e^(−t/τ)", "color": "#ef4444" }
  ],
  "points": [
    { "x": 1, "y": 0.632, "label": "t=τ : 0,63E", "color": "#f59e0b" },
    { "x": 1, "y": 0.368, "label": "t=τ : 0,37U₀", "color": "#10b981" }
  ],
  "asymptotes": [
    { "type": "horizontal", "y": 1, "label": "E (asymptote charge)" },
    { "type": "horizontal", "y": 0, "label": "0 (asymptote décharge)" },
    { "type": "vertical", "x": 1, "label": "τ = RC" }
  ]
}
\`\`\`

**Oscillations LC/RLC :**
\`\`\`graph
{
  "type": "function",
  "title": "Oscillations RLC — u_C(t)",
  "xrange": [0, 12],
  "yrange": [-1.2, 1.2],
  "functions": [
    { "expr": "Math.cos(x)", "label": "LC libre non amorti", "color": "#4f6ef7" },
    { "expr": "Math.exp(-0.3*x)*Math.cos(x)", "label": "RLC amorti", "color": "#ef4444" }
  ],
  "asymptotes": [{ "type": "horizontal", "y": 0, "label": "équilibre" }]
}
\`\`\`

**Ressort horizontal :**
\`\`\`graph
{
  "type": "geometry",
  "title": "Oscillateur masse-ressort",
  "width": 480, "height": 280,
  "shapes": [
    { "type": "axes", "xrange": [-1,9], "yrange": [-3,3] },
    { "type": "rect", "x": -0.5, "y": -2.5, "w": 0.5, "h": 5, "color": "#374151", "fill": "#6b7280", "label": "Mur" },
    { "type": "segment", "x1": 0, "y1": 0, "x2": 1, "y2": 0, "color": "#2563eb" },
    { "type": "segment", "x1": 1, "y1": 0, "x2": 1.3, "y2": 0.5, "color": "#f59e0b" },
    { "type": "segment", "x1": 1.3, "y1": 0.5, "x2": 1.7, "y2": -0.5, "color": "#f59e0b" },
    { "type": "segment", "x1": 1.7, "y1": -0.5, "x2": 2.1, "y2": 0.5, "color": "#f59e0b" },
    { "type": "segment", "x1": 2.1, "y1": 0.5, "x2": 2.5, "y2": -0.5, "color": "#f59e0b" },
    { "type": "segment", "x1": 2.5, "y1": -0.5, "x2": 3, "y2": 0, "color": "#f59e0b" },
    { "type": "segment", "x1": 3, "y1": 0, "x2": 3.5, "y2": 0, "color": "#2563eb" },
    { "type": "rect", "x": 3.5, "y": -0.8, "w": 1.2, "h": 1.6, "color": "#4f6ef7", "fill": "rgba(79,110,247,0.2)", "label": "m" },
    { "type": "label", "x": 1.8, "y": 1.3, "text": "k (raideur)", "color": "#f59e0b", "bold": true },
    { "type": "label", "x": 4.1, "y": -1.8, "text": "T = 2π√(m/k)", "color": "#374151" }
  ]
}
\`\`\`

**Pendule simple :**
\`\`\`graph
{
  "type": "geometry",
  "title": "Pendule simple — oscillations",
  "width": 400, "height": 380,
  "shapes": [
    { "type": "axes", "xrange": [-4,4], "yrange": [-5,1] },
    { "type": "segment", "x1": -3.5, "y1": 0.2, "x2": 3.5, "y2": 0.2, "color": "#374151" },
    { "type": "segment", "x1": 0, "y1": 0.2, "x2": 0, "y2": -3.5, "color": "#6b7280", "dashed": true, "label": "l" },
    { "type": "segment", "x1": 0, "y1": 0.2, "x2": -2, "y2": -3, "color": "#2563eb" },
    { "type": "circle", "cx": -2, "cy": -3, "r": 0.35, "color": "#4f6ef7", "fill": "rgba(79,110,247,0.4)", "label": "m" },
    { "type": "vector", "x1": -2, "y1": -3, "x2": -2, "y2": -4.2, "color": "#ef4444", "label": "P=mg" },
    { "type": "label", "x": 0.8, "y": -3.5, "text": "T = 2π√(l/g)", "color": "#374151" }
  ]
}
\`\`\`

**Dosage acide-base (courbe pH-métrique) :**
\`\`\`graph
{
  "type": "function",
  "title": "Courbe de dosage pH-métrique",
  "xrange": [0, 30],
  "yrange": [0, 14],
  "functions": [
    { "expr": "14 / (1 + Math.exp(-0.5*(x-15)))", "label": "pH = f(V_titrant)", "color": "#4f6ef7" }
  ],
  "points": [
    { "x": 15, "y": 7, "label": "Point équivalent (V_éq=15mL)", "color": "#ef4444" }
  ],
  "asymptotes": [
    { "type": "vertical", "x": 15, "label": "V_éq" }
  ]
}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧬 GRAPHIQUES SVT — OBLIGATOIRES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mots-clés déclencheurs : "ADN", "cellule", "mitose", "méiose", "synapse", "neurone", "immunité", "photosynthèse", "glycémie", "insuline", "ECG", "population", "enzyme", "Michaelis", "arbre généalogique", "génétique", "chromosome", "radioactivité", "décroissance"

**Dynamique des populations :**
\`\`\`graph
{
  "type": "function",
  "title": "Dynamique des populations",
  "xrange": [0, 20],
  "yrange": [0, 220],
  "functions": [
    { "expr": "100*Math.exp(0.3*x)", "label": "Croissance exponentielle", "color": "#ef4444" },
    { "expr": "200/(1+Math.exp(-0.5*(x-10)))", "label": "Croissance logistique (K=200)", "color": "#4f6ef7" }
  ],
  "asymptotes": [{ "type": "horizontal", "y": 200, "label": "K = capacité limite" }]
}
\`\`\`

**Cinétique enzymatique (Michaelis-Menten) :**
\`\`\`graph
{
  "type": "function",
  "title": "Cinétique enzymatique — Michaelis-Menten",
  "xrange": [0, 50],
  "yrange": [0, 120],
  "functions": [
    { "expr": "100*x/(x+5)", "label": "Enzyme non inhibée (Km=5)", "color": "#4f6ef7" },
    { "expr": "100*x/(x+20)", "label": "Inhibition compétitive (Km=20)", "color": "#ef4444" },
    { "expr": "70*x/(x+5)", "label": "Inhibition non-compétitive (Vmax↓)", "color": "#f59e0b" }
  ],
  "asymptotes": [{ "type": "horizontal", "y": 100, "label": "Vmax = 100 µmol/min" }],
  "points": [{ "x": 5, "y": 50, "label": "Km = 5 mmol/L", "color": "#4f6ef7" }]
}
\`\`\`

**Régulation glycémique :**
\`\`\`graph
{
  "type": "function",
  "title": "Régulation de la glycémie après un repas",
  "xrange": [0, 6],
  "yrange": [0.6, 2.2],
  "functions": [
    { "expr": "1 + 0.9*Math.exp(-x)*Math.sin(2*x) + 0.1*Math.exp(-0.5*x)", "label": "Glycémie (g/L)", "color": "#f59e0b" },
    { "expr": "1 + 0*x", "label": "Valeur normale (1 g/L)", "color": "#10b981" }
  ],
  "asymptotes": [{ "type": "horizontal", "y": 1, "label": "Normoglycémie = 1 g/L" }],
  "points": [{ "x": 0.5, "y": 1.8, "label": "Pic hyperglycémique", "color": "#ef4444" }]
}
\`\`\`

**Courbes de survie :**
\`\`\`graph
{
  "type": "function",
  "title": "Courbes de survie — stratégies r et K",
  "xrange": [0, 10],
  "yrange": [0, 1100],
  "functions": [
    { "expr": "1000*Math.exp(-0.005*Math.pow(x-9,2)*10)", "label": "Type I — mortalité tardive (Humains)", "color": "#4f6ef7" },
    { "expr": "1000*Math.exp(-0.3*x)", "label": "Type II — mortalité constante (Oiseaux)", "color": "#10b981" },
    { "expr": "1000*Math.pow(0.4,x)", "label": "Type III — mortalité juvénile (Poissons)", "color": "#ef4444" }
  ]
}
\`\`\`

**Photosynthèse vs éclairement :**
\`\`\`graph
{
  "type": "function",
  "title": "Activité photosynthétique nette",
  "xrange": [0, 1000],
  "yrange": [-3, 12],
  "functions": [
    { "expr": "10*x/(x+200) - 2", "label": "Pn = Pb - R (mL O₂/h)", "color": "#10b981" },
    { "expr": "0*x - 2", "label": "Respiration R = constante", "color": "#ef4444" }
  ],
  "asymptotes": [{ "type": "horizontal", "y": 0, "label": "Point de compensation" }],
  "points": [{ "x": 66, "y": 0, "label": "Point de compensation lumineux", "color": "#f59e0b" }]
}
\`\`\`

**Décroissance radioactive :**
\`\`\`graph
{
  "type": "function",
  "title": "Décroissance radioactive N(t) = N₀·e^(−λt)",
  "xrange": [0, 5],
  "yrange": [0, 1.1],
  "functions": [
    { "expr": "Math.exp(-Math.log(2)*x)", "label": "N(t)/N₀ — noyaux restants", "color": "#4f6ef7" },
    { "expr": "1 - Math.exp(-Math.log(2)*x)", "label": "Noyaux désintégrés", "color": "#ef4444" }
  ],
  "points": [
    { "x": 1, "y": 0.5, "label": "t₁/₂ : N = N₀/2", "color": "#f59e0b" },
    { "x": 2, "y": 0.25, "label": "2t₁/₂ : N = N₀/4", "color": "#10b981" }
  ]
}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 💻 GRAPHIQUES INFORMATIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Complexité algorithmique Big O :**
\`\`\`graph
{
  "type": "function",
  "title": "Complexité algorithmique — Big O notation",
  "xrange": [1, 20],
  "yrange": [0, 150],
  "functions": [
    { "expr": "1 + 0*x", "label": "O(1) — Accès tableau", "color": "#10b981" },
    { "expr": "Math.log2(x)", "label": "O(log n) — Recherche dichotomique", "color": "#4f6ef7" },
    { "expr": "x", "label": "O(n) — Parcours liste", "color": "#f59e0b" },
    { "expr": "x*Math.log2(x)", "label": "O(n·log n) — Tri fusion/rapide", "color": "#8b5cf6" },
    { "expr": "x*x", "label": "O(n²) — Tri bulles/insertion", "color": "#ef4444" }
  ]
}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚗️ PHYSIQUE SUPPLÉMENTAIRE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Interférences — fentes de Young :**
\`\`\`graph
{
  "type": "function",
  "title": "Figure d'interférences — Fentes de Young",
  "xrange": [-5, 5],
  "yrange": [-0.1, 1.2],
  "functions": [
    { "expr": "Math.pow(Math.cos(Math.PI*x), 2)", "label": "Intensité I(x)/I₀", "color": "#f59e0b" }
  ],
  "points": [
    { "x": 0, "y": 1, "label": "Frange centrale (ordre 0)", "color": "#ef4444" },
    { "x": 1, "y": 1, "label": "Ordre +1", "color": "#4f6ef7" },
    { "x": -1, "y": 1, "label": "Ordre -1", "color": "#4f6ef7" }
  ]
}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TES CAPACITÉS PAR MATIÈRE (résumé)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 🧮 MATHÉMATIQUES — Programme complet Bac Tunisie + France
Analyse (limites, dérivées, intégrales, éq. différentielles), Complexes (formes, racines n-ièmes), Géométrie (vectorielle, analytique, espace), Probabilités (lois : B, P, N, exp — IC, TCL), Matrices, Arithmétique (PGCD, Bézout, congruences), Suites, Maths Financières

### ⚗️ PHYSIQUE-CHIMIE — Programme complet Bac Tunisie + France
Électricité (RC/RL/RLC), Mécanique (Newton, oscillateurs), Ondes (Young, Doppler, diffraction), Optique (Snell, lentilles), Nucléaire (désintégration, E=Δmc²), Chimie (acide-base, oxydoréduction, cinétique, équilibres, organique)

### 🧬 SVT — Programme complet Bac Tunisie + France
Biologie moléculaire (ADN→ARN→Protéines), Génétique (Mendel, arbres généalogiques, génie génétique), Immunologie (innée+adaptative, SIDA, vaccins), Physiologie (digestion, respiration, cardiologie, neurologie, endocrinologie), Géologie (tectonique, pétrologie, évolution, datation)

### 💻 INFORMATIQUE — Programme complet Bac Tunisie
Algorithmique + complexité Big O, Structures de données (pile, file, arbre, graphe), Bases de données SQL, Python (POO, modules), Réseaux (OSI, TCP/IP, sécurité)

### 🇬🇧 ANGLAIS ★ — RÈGLE ABSOLUE
Réponse COMPLÈTE en anglais si question en anglais. Grammaire (tous temps, modaux, conditionnels), Expression écrite (essay, synthesis, letter), Analyse littéraire, Bac France LLCER (8 axes), Œuvres (1984, Fahrenheit 451, Lord of the Flies, To Kill a Mockingbird)

### 🇫🇷 LITTÉRATURE FRANÇAISE & FRANÇAIS
Figures de style (25+), Versification (alexandrin, sonnet, odes), Exercices Bac (commentaire, dissertation, contraction, invention), Grands auteurs XVIIe→XXe, Mouvements littéraires

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FORMAT DE RÉPONSE — PROFESSEUR NIVEAU SUPÉRIEUR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- **📌 Théorème/Définition :** résultat clé encadré > **Résultat :**
- **✏️ Solution :** calculs détaillés étape par étape — JAMAIS de saut
- **💡 Astuce :** méthode rapide, mnémotechnique
- **⚠️ Erreur fréquente :** piège classique à signaler avec bienveillance
- **✅ Réponse finale :** encadrée
- **📊 Graphique OBLIGATOIRE** pour : f(x), circuits, données biologiques chiffrées, complexité algo
- Formules : LaTeX OBLIGATOIRE — $inline$ ou $$bloc$$
- Symboles : ∈ ∀ ∃ ⟹ ⟺ ≤ ≥ ≠ ± ∞ π θ α β γ λ ω ε σ μ

## EXIGENCE ABSOLUE
Tu es un VRAI PROFESSEUR IA de niveau supérieur. Tu réponds TOUJOURS complètement.
Aucune restriction de matière. Chaque question mérite une réponse exhaustive et pédagogique.
**Graphiques OBLIGATOIRES :** toute fonction, circuit, phénomène oscillatoire, donnée biologique chiffrée, complexité algorithmique, figure géométrique.
Encourage TOUJOURS l'élève. Explique POURQUOI une réponse est incorrecte avec bienveillance.`

// ══════════════════════════════════════════
// DONNÉES UI
// ══════════════════════════════════════════
const SUGGESTIONS = [
  { cat: '📐 Analyse', color: '#4f6ef7', questions: [
    'Trace la courbe de f(x) = x² − 2x + 1 avec son sommet',
    'Représente graphiquement ln(x) et eˣ sur le même repère',
    'Comment calculer lim(x→0) sin(x)/x ?',
    'Explique le TVI avec un graphique',
    'Résoudre y\' − 2y = e^(2x)',
    '∫₀¹ xeˣ dx par intégration par parties',
  ]},
  { cat: '🔢 Complexes', color: '#7c3aed', questions: [
    'Représente z = 1+i√3 sur le plan complexe',
    'Écrire z = −1 + i en forme exponentielle',
    'Trouver les racines 4ièmes de −16',
    'Résoudre z² − (2+i)z + (1+2i) = 0 dans ℂ',
    'Calculer l\'argument de z = (1+i)⁸',
  ]},
  { cat: '📊 Probas', color: '#06d6a0', questions: [
    'Trace la courbe de la loi normale N(0,1)',
    'Calculer E(X) et V(X) pour B(10, 0.3)',
    'Expliquer la loi de Poisson P(3)',
    'Calculer un intervalle de confiance à 95%',
    'Différence entre loi binomiale et Poisson',
  ]},
  { cat: '📏 Géométrie', color: '#f59e0b', questions: [
    'Trace un triangle et ses trois médianes',
    'Représente une rotation de centre O et angle 60°',
    'Équation d\'un plan dans l\'espace 3D',
    'Distance d\'un point A à un plan P',
    'Montrer que deux droites sont gauches',
  ]},
  { cat: '🧬 SVT', color: '#10b981', questions: [
    'Trace la courbe de cinétique enzymatique Michaelis-Menten',
    'Montre la régulation de la glycémie avec un graphique',
    'Trace les courbes de survie des populations (type I, II, III)',
    'Explique la synapse avec un schéma',
    'Trace la courbe de décroissance radioactive N(t)',
    'Compare photosynthese brute et nette selon l\'eclairement',
  ]},
  { cat: '💹 Éco-Gestion', color: '#10b981', questions: [
    'Calculer la valeur actuelle d\'annuités constantes',
    'Tableau d\'amortissement d\'un emprunt 10 000€',
    'Résoudre un système 3×3 par matrices',
    'Intérêts composés : capital doublé en combien d\'années ?',
  ]},
  { cat: '💻 Info', color: '#6366f1', questions: [
    'Trace la complexité des algorithmes de tri',
    'Récursivité : factorielle et suite de Fibonacci',
    'Requête SQL avec JOIN et GROUP BY',
    'Différence entre pile et file (stack/queue)',
  ]},
  { cat: '🇫🇷 France', color: '#4f6ef7', questions: [
    'Terminale France : étude de f(x) = x·ln(x)',
    'Loi normale N(0,1) : calculer P(-1 ≤ X ≤ 1)',
    'Complexes Terminale : racines n-ièmes de l\'unité',
    'Première France : variations de f(x) = x²-3x+2',
    'STI2D : équation différentielle circuit RC y\'=ay+b',
    'Maths Expertes : PGCD(84, 36) par algorithme d\'Euclide',
  ]},
]

const STARTERS = [
  { icon: '📈', text: 'Trace f(x) = x² − 2x + 1 avec son sommet', tag: 'Maths' },
  { icon: '⚗️', text: 'Trace la courbe de charge RC avec τ marqué', tag: 'Physique' },
  { icon: '🧬', text: 'Montre la cinétique enzymatique de Michaelis-Menten avec graphique', tag: 'SVT' },
  { icon: '💻', text: 'Compare la complexité O(n²) vs O(n log n) — graphique', tag: 'Info' },
  { icon: '🇬🇧', text: 'Write an argumentative essay about AI and education', tag: 'Anglais' },
  { icon: '🔢', text: 'Représente z = 1+i√3 sur le plan complexe', tag: 'Complexes' },
]

// ══════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════
type Msg = { role: 'user' | 'assistant'; content: string; id: number; imagePreview?: string }

// ══════════════════════════════════════════
// MOTEUR GRAPHIQUE — FONCTIONS (Canvas SVG)
// ══════════════════════════════════════════
function FunctionGraph({ config }: { config: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Protection si config invalide
    if (!config || typeof config !== 'object') return

    const W = 560, H = 340
    const PAD = { top: 36, right: 20, bottom: 40, left: 52 }
    const plotW = W - PAD.left - PAD.right
    const plotH = H - PAD.top - PAD.bottom
    const xMin = config.xrange?.[0] ?? -5
    const xMax = config.xrange?.[1] ?? 5
    const N = 800
    
    // Auto-calcul yrange si absent
    let yMin = config.yrange?.[0], yMax = config.yrange?.[1]
    if (yMin === undefined || yMax === undefined) {
      const allY: number[] = []
      for (const fn of (config.functions || [])) {
        try {
          if (!fn?.expr) continue
          // eslint-disable-next-line no-new-func
          const f = new Function('x', `"use strict";try{const _r=(${fn.expr});return(_r===undefined||_r===null)?null:_r;}catch(e){return null}`)
          for (let i = 0; i <= N; i++) {
            const x = xMin + (i / N) * (xMax - xMin)
            const v = f(x)
            // Seuil dynamique : pas de seuil fixe 1e6 qui coupe les sigmoides
            if (v !== null && isFinite(v)) allY.push(v)
          }
        } catch {}
      }
      for (const pt of (config.points || [])) {
        if (pt && typeof pt.y === 'number') allY.push(pt.y)
      }
      if (allY.length === 0) { yMin = -5; yMax = 5 }
      else {
        const range = Math.max(...allY) - Math.min(...allY)
        yMin = Math.min(...allY) - range * 0.12
        yMax = Math.max(...allY) + range * 0.12
      }
    }
    
    const toPixX = (x: number) => PAD.left + ((x - xMin) / (xMax - xMin)) * plotW
    const toPixY = (y: number) => PAD.top + ((yMax - y) / (yMax - yMin)) * plotH

    // Fond
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = 'rgba(10,12,30,0.97)'
    ctx.fillRect(0, 0, W, H)

    // Grille
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 1
    const xStep = niceStep(xMax - xMin, 8)
    const yStep = niceStep(yMax - yMin, 6)
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const px = toPixX(x)
      ctx.beginPath(); ctx.moveTo(px, PAD.top); ctx.lineTo(px, PAD.top + plotH); ctx.stroke()
    }
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      const py = toPixY(y)
      ctx.beginPath(); ctx.moveTo(PAD.left, py); ctx.lineTo(PAD.left + plotW, py); ctx.stroke()
    }

    // Axes
    const ox = toPixX(0), oy = toPixY(0)
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'
    ctx.lineWidth = 1.5
    if (oy >= PAD.top && oy <= PAD.top + plotH) { ctx.beginPath(); ctx.moveTo(PAD.left, oy); ctx.lineTo(PAD.left + plotW, oy); ctx.stroke() }
    if (ox >= PAD.left && ox <= PAD.left + plotW) { ctx.beginPath(); ctx.moveTo(ox, PAD.top); ctx.lineTo(ox, PAD.top + plotH); ctx.stroke() }

    // Labels axes
    ctx.fillStyle = '#64748b'; ctx.font = '10px monospace'; ctx.textAlign = 'center'
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) < 0.001) continue
      ctx.fillText(round2(x).toString(), toPixX(x), PAD.top + plotH + 16)
    }
    ctx.textAlign = 'right'
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) < 0.001) continue
      ctx.fillText(round2(y).toString(), PAD.left - 6, toPixY(y) + 3)
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = 'italic 12px serif'
    ctx.textAlign = 'center'; ctx.fillText('x', PAD.left + plotW + 12, oy + 4)
    ctx.textAlign = 'left'; ctx.fillText('y', ox + 6, PAD.top - 6)

    // Asymptotes
    for (const a of (config.asymptotes || [])) {
      if (!a) continue
      ctx.strokeStyle = '#ef444466'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4])
      ctx.beginPath()
      if (a.type === 'vertical') { ctx.moveTo(toPixX(a.x), PAD.top); ctx.lineTo(toPixX(a.x), PAD.top + plotH) }
      if (a.type === 'horizontal') { ctx.moveTo(PAD.left, toPixY(a.y)); ctx.lineTo(PAD.left + plotW, toPixY(a.y)) }
      ctx.stroke(); ctx.setLineDash([])
      if (a.label) {
        ctx.fillStyle = '#ef4444'; ctx.font = '10px monospace'; ctx.textAlign = 'center'
        if (a.type === 'vertical') ctx.fillText(a.label, toPixX(a.x) + 2, PAD.top + 12)
        if (a.type === 'horizontal') { ctx.textAlign = 'left'; ctx.fillText(a.label, PAD.left + 4, toPixY(a.y) - 4) }
      }
    }

    // Courbes
    const COLORS = ['#6366f1', '#06d6a0', '#f59e0b', '#ef4444', '#a78bfa', '#38bdf8']
    ;(config.functions || []).forEach((fn: any, fi: number) => {
      if (!fn?.expr) return
      const color = fn.color || COLORS[fi % COLORS.length]
      try {
        // eslint-disable-next-line no-new-func
        const f = new Function('x', `try{const v=(${fn.expr});return(isFinite(v)&&Math.abs(v)<1e6)?v:null}catch(e){return null}`)
        ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.setLineDash([])
        ctx.beginPath(); let pen = false
        for (let i = 0; i <= N; i++) {
          const x = xMin + (i / N) * (xMax - xMin)
          const y = f(x)
          if (y === null || !isFinite(y) || y < yMin - (yMax - yMin) * 0.5 || y > yMax + (yMax - yMin) * 0.5) { pen = false; continue }
          const px = toPixX(x), py = toPixY(y)
          if (!pen) { ctx.moveTo(px, py); pen = true } else ctx.lineTo(px, py)
        }
        ctx.stroke()
        // Légende
        const lx = PAD.left + 10 + fi * 140
        ctx.strokeStyle = color; ctx.lineWidth = 2.5
        ctx.beginPath(); ctx.moveTo(lx, PAD.top - 18); ctx.lineTo(lx + 22, PAD.top - 18); ctx.stroke()
        ctx.fillStyle = color; ctx.font = '11px monospace'; ctx.textAlign = 'left'
        ctx.fillText(fn.label || fn.expr, lx + 26, PAD.top - 14)
      } catch {}
    })

    // Points remarquables - CORRIGÉ (plus de duplication)
    for (const pt of (config.points || [])) {
      if (!pt || typeof pt.x !== 'number' || typeof pt.y !== 'number') continue
      const px = toPixX(pt.x), py = toPixY(pt.y)
      ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2)
      ctx.fillStyle = pt.color || '#f59e0b'; ctx.fill()
      ctx.strokeStyle = '#0a0c1e'; ctx.lineWidth = 2; ctx.stroke()
      if (pt.label) {
        ctx.fillStyle = pt.color || '#f59e0b'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'
        ctx.fillText(pt.label, px, py - 10)
      }
    }

    // Titre
    if (config.title) {
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'
      ctx.fillText(config.title, W / 2, 18)
    }
  }, [config])

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', margin: '12px 0', border: '1px solid rgba(99,102,241,0.3)', background: '#0a0c1e' }}>
      <canvas ref={canvasRef} width={560} height={340} style={{ width: '100%', display: 'block' }} />
    </div>
  )
}

function niceStep(range: number, targetTicks: number): number {
  const rough = range / targetTicks
  const pow = Math.pow(10, Math.floor(Math.log10(rough)))
  const candidates = [1, 2, 2.5, 5, 10]
  return pow * (candidates.find(c => c * pow >= rough) || 10)
}
function round2(x: number) { return Math.round(x * 100) / 100 }
// ══════════════════════════════════════════
// MOTEUR GRAPHIQUE — GÉOMÉTRIE (SVG)
// ══════════════════════════════════════════
function GeometryGraph({ config }: { config: any }) {
  const W = config.width || 420
  const H = config.height || 380
  const PAD = 44

  const axesShape = config.shapes?.find((s: any) => s.type === 'axes')
  const xrange: [number, number] = axesShape?.xrange || [-5, 5]
  const yrange: [number, number] = axesShape?.yrange || [-5, 5]

  const toX = (x: number) => PAD + ((x - xrange[0]) / (xrange[1] - xrange[0])) * (W - 2 * PAD)
  const toY = (y: number) => (H - PAD) - ((y - yrange[0]) / (yrange[1] - yrange[0])) * (H - 2 * PAD)

  const els: React.ReactNode[] = []
  let k = 0

  const arrow = (x1: number, y1: number, x2: number, y2: number, color: string, size = 7) => {
    const a = Math.atan2(y2 - y1, x2 - x1)
    const a1x = x2 - size * Math.cos(a - 0.4), a1y = y2 - size * Math.sin(a - 0.4)
    const a2x = x2 - size * Math.cos(a + 0.4), a2y = y2 - size * Math.sin(a + 0.4)
    return <polygon key={k++} points={`${x2},${y2} ${a1x},${a1y} ${a2x},${a2y}`} fill={color} />
  }

  for (const sh of (config.shapes || [])) {
    switch (sh.type) {
      case 'grid': {
        const xStep = Math.max(0.5, (xrange[1] - xrange[0]) / 10)
        const yStep = Math.max(0.5, (yrange[1] - yrange[0]) / 10)
        for (let x = Math.ceil(xrange[0] / xStep) * xStep; x <= xrange[1] + 0.01; x += xStep) {
          els.push(<line key={k++} x1={toX(x)} y1={PAD} x2={toX(x)} y2={H - PAD} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />)
          if (Math.abs(x) > 0.01) els.push(<text key={k++} x={toX(x)} y={H - PAD + 14} textAnchor="middle" fill="#64748b" fontSize={9}>{round2(x)}</text>)
        }
        for (let y = Math.ceil(yrange[0] / yStep) * yStep; y <= yrange[1] + 0.01; y += yStep) {
          els.push(<line key={k++} x1={PAD} y1={toY(y)} x2={W - PAD} y2={toY(y)} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />)
          if (Math.abs(y) > 0.01) els.push(<text key={k++} x={PAD - 6} y={toY(y) + 3} textAnchor="end" fill="#64748b" fontSize={9}>{round2(y)}</text>)
        }
        break
      }
      case 'axes': {
        const ox = toX(0), oy = toY(0)
        els.push(<line key={k++} x1={PAD} y1={oy} x2={W - PAD} y2={oy} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} />)
        els.push(<line key={k++} x1={ox} y1={PAD} x2={ox} y2={H - PAD} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} />)
        els.push(arrow(PAD, oy, W - PAD, oy, 'rgba(255,255,255,0.3)'))
        els.push(arrow(ox, H - PAD, ox, PAD, 'rgba(255,255,255,0.3)'))
        els.push(<text key={k++} x={W - PAD + 10} y={oy + 4} fill="#94a3b8" fontSize={13} fontStyle="italic">x</text>)
        els.push(<text key={k++} x={ox + 8} y={PAD - 4} fill="#94a3b8" fontSize={13} fontStyle="italic">y</text>)
        break
      }
      case 'circle': {
        const rx = (sh.r / (xrange[1] - xrange[0])) * (W - 2 * PAD)
        const ry = (sh.r / (yrange[1] - yrange[0])) * (H - 2 * PAD)
        els.push(<ellipse key={k++} cx={toX(sh.cx)} cy={toY(sh.cy)} rx={Math.abs(rx)} ry={Math.abs(ry)}
          fill={sh.fill || 'rgba(99,102,241,0.06)'} stroke={sh.color || '#6366f1'} strokeWidth={2} />)
        if (sh.label) els.push(<text key={k++} x={toX(sh.cx) + Math.abs(rx) + 5} y={toY(sh.cy) + 4} fill={sh.color || '#6366f1'} fontSize={11}>{sh.label}</text>)
        break
      }
      case 'triangle': {
        const pts = (sh.points as [number, number][]).map(([x, y]) => `${toX(x)},${toY(y)}`).join(' ')
        els.push(<polygon key={k++} points={pts} fill={sh.fill || 'rgba(99,102,241,0.08)'} stroke={sh.color || '#6366f1'} strokeWidth={2} />)
        if (sh.label) {
          const [cx, cy] = [(sh.points[0][0] + sh.points[1][0] + sh.points[2][0]) / 3, (sh.points[0][1] + sh.points[1][1] + sh.points[2][1]) / 3]
          els.push(<text key={k++} x={toX(cx)} y={toY(cy)} textAnchor="middle" fill={sh.color || '#6366f1'} fontSize={11} fontStyle="italic">{sh.label}</text>)
        }
        break
      }
      case 'polygon': {
        const pts = (sh.points as [number, number][]).map(([x, y]) => `${toX(x)},${toY(y)}`).join(' ')
        els.push(<polygon key={k++} points={pts} fill={sh.fill || 'rgba(99,102,241,0.08)'} stroke={sh.color || '#6366f1'} strokeWidth={2} />)
        break
      }
      case 'rect': {
        const pw = (sh.w / (xrange[1] - xrange[0])) * (W - 2 * PAD)
        const ph = (sh.h / (yrange[1] - yrange[0])) * (H - 2 * PAD)
        els.push(<rect key={k++} x={toX(sh.x)} y={toY(sh.y + sh.h)} width={Math.abs(pw)} height={Math.abs(ph)}
          fill={sh.fill || 'rgba(245,158,11,0.1)'} stroke={sh.color || '#f59e0b'} strokeWidth={2} />)
        if (sh.label) els.push(<text key={k++} x={toX(sh.x + sh.w / 2)} y={toY(sh.y + sh.h / 2)} textAnchor="middle" fill={sh.color || '#f59e0b'} fontSize={11}>{sh.label}</text>)
        break
      }
      case 'segment':
      case 'median':
      case 'altitude':
      case 'bisector': {
        const [x1, y1] = sh.from || [sh.x1, sh.y1]
        const [x2, y2] = sh.to || [sh.x2, sh.y2]
        const dashed = sh.dashed || sh.type === 'altitude' || sh.type === 'bisector'
        els.push(<line key={k++} x1={toX(x1)} y1={toY(y1)} x2={toX(x2)} y2={toY(y2)}
          stroke={sh.color || '#94a3b8'} strokeWidth={sh.width || 1.8} strokeDasharray={dashed ? '5,4' : ''} />)
        if (sh.label) {
          const mx = (toX(x1) + toX(x2)) / 2, my = (toY(y1) + toY(y2)) / 2
          els.push(<text key={k++} x={mx + 5} y={my - 5} fill={sh.color || '#94a3b8'} fontSize={10}>{sh.label}</text>)
        }
        break
      }
      case 'line': {
        const [x1, y1] = [sh.x1, sh.y1], [x2, y2] = [sh.x2, sh.y2]
        if (x1 === x2) {
          els.push(<line key={k++} x1={toX(x1)} y1={PAD} x2={toX(x1)} y2={H - PAD} stroke={sh.color || '#94a3b8'} strokeWidth={1.8} strokeDasharray={sh.dashed ? '6,4' : ''} />)
        } else {
          const slope = (y2 - y1) / (x2 - x1)
          const ly1 = y1 + slope * (xrange[0] - x1), ly2 = y1 + slope * (xrange[1] - x1)
          els.push(<line key={k++} x1={toX(xrange[0])} y1={toY(ly1)} x2={toX(xrange[1])} y2={toY(ly2)} stroke={sh.color || '#94a3b8'} strokeWidth={1.8} strokeDasharray={sh.dashed ? '6,4' : ''} />)
        }
        if (sh.label) els.push(<text key={k++} x={toX(x2) + 4} y={toY(y2) - 6} fill={sh.color || '#94a3b8'} fontSize={11}>{sh.label}</text>)
        break
      }
      case 'vector': {
        const px1 = toX(sh.x1), py1 = toY(sh.y1), px2 = toX(sh.x2), py2 = toY(sh.y2)
        els.push(<line key={k++} x1={px1} y1={py1} x2={px2} y2={py2} stroke={sh.color || '#06d6a0'} strokeWidth={2.2} />)
        els.push(arrow(px1, py1, px2, py2, sh.color || '#06d6a0', 9))
        if (sh.label) els.push(<text key={k++} x={(px1 + px2) / 2 + 7} y={(py1 + py2) / 2 - 7} fill={sh.color || '#06d6a0'} fontSize={12} fontWeight={700}>{sh.label}</text>)
        break
      }
      case 'angle': {
        const cx = toX(sh.cx), cy = toY(sh.cy)
        const r = (sh.r / (xrange[1] - xrange[0])) * (W - 2 * PAD)
        const a1r = sh.a1 * Math.PI / 180, a2r = sh.a2 * Math.PI / 180
        const x1 = cx + r * Math.cos(a1r), y1 = cy - r * Math.sin(a1r)
        const x2 = cx + r * Math.cos(a2r), y2 = cy - r * Math.sin(a2r)
        const large = (sh.a2 - sh.a1) > 180 ? 1 : 0
        els.push(<path key={k++} d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 0 ${x2} ${y2}`}
          fill={sh.fill || 'rgba(245,158,11,0.15)'} stroke={sh.color || '#f59e0b'} strokeWidth={1.5} />)
        const midA = ((sh.a1 + sh.a2) / 2) * Math.PI / 180
        els.push(<text key={k++} x={cx + (r + 14) * Math.cos(midA)} y={cy - (r + 14) * Math.sin(midA)} textAnchor="middle" fill={sh.color || '#f59e0b'} fontSize={10}>{sh.label}</text>)
        break
      }
      case 'arc': {
        const cx = toX(sh.cx), cy = toY(sh.cy)
        const r = (sh.r / (xrange[1] - xrange[0])) * (W - 2 * PAD)
        const a1r = sh.a1 * Math.PI / 180, a2r = sh.a2 * Math.PI / 180
        const x1 = cx + r * Math.cos(a1r), y1 = cy - r * Math.sin(a1r)
        const x2 = cx + r * Math.cos(a2r), y2 = cy - r * Math.sin(a2r)
        els.push(<path key={k++} d={`M ${x1} ${y1} A ${r} ${r} 0 ${(sh.a2 - sh.a1) > 180 ? 1 : 0} 0 ${x2} ${y2}`}
          fill="none" stroke={sh.color || '#6366f1'} strokeWidth={2} />)
        break
      }
      case 'rightangle': {
        const cx = toX(sh.cx), cy = toY(sh.cy)
        const s = (sh.size || 0.3) / (xrange[1] - xrange[0]) * (W - 2 * PAD)
        els.push(<rect key={k++} x={cx} y={cy - s} width={s} height={s} fill="none" stroke={sh.color || '#94a3b8'} strokeWidth={1.5} />)
        break
      }
      case 'point': {
        els.push(<circle key={k++} cx={toX(sh.x)} cy={toY(sh.y)} r={sh.r || 4.5} fill={sh.color || '#ef4444'} />)
        els.push(<circle key={k++} cx={toX(sh.x)} cy={toY(sh.y)} r={(sh.r || 4.5) + 1.5} fill="none" stroke="rgba(10,12,30,0.8)" strokeWidth={2} />)
        if (sh.label) {
          const dx = sh.labelOffsetX ?? 9, dy = sh.labelOffsetY ?? -9
          els.push(<text key={k++} x={toX(sh.x) + dx} y={toY(sh.y) + dy} fill={sh.color || '#ef4444'} fontSize={12} fontWeight={700}>{sh.label}</text>)
        }
        break
      }
      case 'label': {
        els.push(<text key={k++} x={toX(sh.x)} y={toY(sh.y)} textAnchor={sh.anchor || 'middle'}
          fill={sh.color || '#94a3b8'} fontSize={sh.size || 12} fontWeight={sh.bold ? 700 : 400} fontStyle={sh.italic ? 'italic' : 'normal'}>{sh.text}</text>)
        break
      }
    }
  }

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', margin: '12px 0', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(10,12,30,0.97)' }}>
      <div style={{ padding: '7px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
        📐 {config.title || 'Figure géométrique'}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, display: 'block', margin: '0 auto' }}>
        {els}
      </svg>
    </div>
  )
}

// ══════════════════════════════════════════
// PARSER — détecte les blocs ```graph```
// ══════════════════════════════════════════
function parseBlocks(text: string): Array<{ type: 'text' | 'graph'; content: string; config?: any }> {
  const out: Array<{ type: 'text' | 'graph'; content: string; config?: any }> = []
  // Normaliser [GRAPH: {JSON}] → format interne unifié
  const normalized = text.replace(/\[GRAPH:\s*(\{[\s\S]*?\})\s*\]/g, (_match, json) => {
    try {
      const parsed = JSON.parse(json)
      return '```graph\n' + JSON.stringify(parsed, null, 2) + '\n```'
    } catch { return _match }
  })
  // Intercepter [FIGURE : ...] → ascii générique
  const withFigure = normalized.replace(/\[FIGURE\s*:[^\]]+\]/gi, (m) => {
    const title = m.replace(/^\[FIGURE\s*:\s*/i,'').replace(/\]$/,'').trim()
    const isRLC = /RLC/i.test(title), isRC = /RC\b/i.test(title) && !isRLC
    const content = isRLC ? '  ┌──┤R├──┤L├──┬──┐\n  E             ═╪═C\n  └─────────────┘'
                  : isRC  ? '  ┌──┤R├──┬──┐\n  E       ═╪═C\n  └────────┘'
                  : '  [Schéma : ' + title + ']'
    const obj = {type:'ascii',title,content,legend:['Voir énoncé pour les valeurs']}
    return '```graph\n' + JSON.stringify(obj) + '\n```'
  })
  const re = /```graph\n?([\s\S]*?)```/g
  let last = 0, m: RegExpExecArray | null
  while ((m = re.exec(withFigure)) !== null) {
    if (m.index > last) out.push({ type: 'text', content: withFigure.slice(last, m.index) })
    try {
      const cfg = JSON.parse(m[1].trim())
      out.push({ type: 'graph', content: m[1], config: cfg })
    } catch {
      out.push({ type: 'text', content: m[0] })
    }
    last = m.index + m[0].length
  }
  if (last < withFigure.length) out.push({ type: 'text', content: withFigure.slice(last) })
  return out
}

// ══════════════════════════════════════════
// FORMATAGE TEXTE
// ══════════════════════════════════════════
function inlineFmt(t: string) {
  // 1. KaTeX d'abord (avant tout autre remplacement pour ne pas casser les formules)
  let result = renderKaTeX(t)
  // 2. Markdown inline
  result = result
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, `<code style="font-family:monospace;background:rgba(79,110,247,0.14);color:#a78bfa;padding:1px 6px;border-radius:4px;font-size:12px">$1</code>`)
  return result
}

function renderText(text: string) {
  const lines = text.split('\n')
  const els: React.ReactNode[] = []
  let k = 0
  const MARKERS = ['**📌', '**💡', '**⚠️', '**✅', '**✏️', '**📊']
  const MARKER_COLORS: Record<string, string> = { '⚠️': '#f59e0b', '💡': '#06d6a0', '✅': '#06d6a0', '📊': '#a78bfa', '📌': '#4f6ef7', '✏️': '#4f6ef7' }
  const MARKER_BGS: Record<string, string> = { '⚠️': 'rgba(245,158,11,0.08)', '💡': 'rgba(6,214,160,0.08)', '✅': 'rgba(6,214,160,0.1)', '📊': 'rgba(167,139,250,0.08)', '📌': 'rgba(79,110,247,0.08)', '✏️': 'rgba(79,110,247,0.08)' }

  for (const line of lines) {
    if (MARKERS.some(m => line.startsWith(m))) {
      const match = line.match(/\*\*([^*]+)\*\*(.*)/)
      if (match) {
        const tag = match[1], rest = match[2]
        const key = Object.keys(MARKER_COLORS).find(k => tag.includes(k)) || '📌'
        const color = MARKER_COLORS[key], bg = MARKER_BGS[key]
        els.push(<div key={k++} style={{ background: bg, border: `1px solid ${color}25`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: '10px 14px', margin: '8px 0' }}>
          <span style={{ color, fontWeight: 700, fontSize: 13 }}>{tag}</span>
          {rest && <span style={{ fontSize: 14, color: 'var(--text2)', marginLeft: 4 }} dangerouslySetInnerHTML={{ __html: inlineFmt(rest) }} />}
        </div>)
        continue
      }
    }
    if (line.startsWith('### ')) { els.push(<div key={k++} style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent)', marginTop: 14, marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: inlineFmt(line.slice(4)) }} />); continue }
    if (line.startsWith('## ')) { els.push(<div key={k++} style={{ fontWeight: 700, fontSize: 16, marginTop: 16, marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: inlineFmt(line.slice(3)) }} />); continue }
    if (/^[-*] /.test(line)) {
      els.push(<div key={k++} style={{ display: 'flex', gap: 8, fontSize: 14, lineHeight: 1.6, marginBottom: 2 }}>
        <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>▸</span>
        <span dangerouslySetInnerHTML={{ __html: inlineFmt(line.slice(2)) }} />
      </div>); continue
    }
    if (/^\d+\. /.test(line)) {
      const num = line.match(/^(\d+)\. /)?.[1] || '1'
      els.push(<div key={k++} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.6, marginBottom: 4 }}>
        <span style={{ color: 'var(--accent)', fontWeight: 700, fontFamily: 'monospace', minWidth: 22, flexShrink: 0 }}>{num}.</span>
        <span dangerouslySetInnerHTML={{ __html: inlineFmt(line.slice(num.length + 2)) }} />
      </div>); continue
    }
    if (line.trim() === '') { els.push(<div key={k++} style={{ height: 6 }} />); continue }
    els.push(<p key={k++} style={{ fontSize: 14, lineHeight: 1.72, marginBottom: 3 }} dangerouslySetInnerHTML={{ __html: inlineFmt(line) }} />)
  }
  return <div>{els}</div>
}

// ── AsciiGraph inline ────────────────────────────────────────────
function AsciiBlock({cfg}:{cfg:any}){
  const legend=Array.isArray(cfg.legend)?cfg.legend:[]
  return(<div style={{borderRadius:10,overflow:'hidden',border:'1px solid rgba(6,182,212,0.3)',margin:'12px 0',background:'rgba(6,182,212,0.04)'}}>
    {cfg.title&&<div style={{padding:'7px 16px',borderBottom:'1px solid rgba(6,182,212,0.15)',fontSize:12,fontWeight:700,color:'#06b6d4'}}>📐 {cfg.title}</div>}
    <div style={{padding:'12px 16px'}}>
      <pre style={{fontFamily:"'Courier New',Consolas,monospace",fontSize:12,lineHeight:1.7,color:'rgba(255,255,255,0.85)',background:'rgba(0,0,0,0.3)',borderRadius:8,padding:'10px 14px',margin:'0 0 10px',overflowX:'auto',whiteSpace:'pre'}}>{cfg.content}</pre>
      {legend.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:5}}>{legend.map((item:string,i:number)=><span key={i} style={{fontSize:11,padding:'2px 9px',background:'rgba(6,182,212,0.1)',color:'#67e8f9',border:'1px solid rgba(6,182,212,0.2)',borderRadius:20}}>{item}</span>)}</div>}
    </div>
  </div>)
}
// ── TableBlock inline ─────────────────────────────────────────────
function TableBlock({cfg}:{cfg:any}){
  const h=cfg.headers||[],r=cfg.rows||[],hl=cfg.highlight||[]
  return(<div style={{borderRadius:10,overflow:'hidden',border:'1px solid rgba(99,102,241,0.25)',margin:'12px 0'}}>
    {cfg.title&&<div style={{padding:'7px 14px',background:'rgba(99,102,241,0.1)',borderBottom:'1px solid rgba(99,102,241,0.2)',fontSize:12,fontWeight:700,color:'#818cf8'}}>📋 {cfg.title}</div>}
    <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:12,fontFamily:'monospace'}}>
      {h.length>0&&<thead><tr>{h.map((c:string,i:number)=><th key={i} style={{padding:'7px 10px',background:'rgba(99,102,241,0.12)',color:'#a5b4fc',fontWeight:700,borderBottom:'1px solid rgba(99,102,241,0.2)',textAlign:'center',whiteSpace:'nowrap'}}>{c}</th>)}</tr></thead>}
      <tbody>{r.map((row:string[],i:number)=><tr key={i} style={{background:hl.includes(i)?'rgba(99,102,241,0.1)':i%2===0?'rgba(255,255,255,0.02)':'transparent'}}>{row.map((cell:string,j:number)=><td key={j} style={{padding:'5px 10px',color:j===0?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.85)',borderBottom:'1px solid rgba(255,255,255,0.05)',textAlign:'center',whiteSpace:'nowrap'}}>{cell}</td>)}</tr>)}</tbody>
    </table></div>
  </div>)
}
// ── BarBlock inline ───────────────────────────────────────────────
function BarBlock({cfg}:{cfg:any}){
  const cats=cfg.categories||[],vals=cfg.values||[],colors=cfg.colors||['#6366f1','#10b981','#f59e0b','#ec4899','#06b6d4'],mx=Math.max(...vals,1)
  return(<div style={{borderRadius:10,border:'1px solid rgba(99,102,241,0.25)',margin:'12px 0',background:'rgba(10,10,25,0.95)',padding:'14px'}}>
    {cfg.title&&<div style={{fontSize:12,fontWeight:700,color:'#818cf8',marginBottom:10,textAlign:'center'}}>{cfg.title}</div>}
    <div style={{display:'flex',alignItems:'flex-end',gap:6,height:130,paddingBottom:20,position:'relative'}}>
      {cats.map((cat:string,i:number)=>{const h=Math.max(4,(vals[i]/mx)*110);const c=colors[i%colors.length];return(<div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}><div style={{fontSize:10,color:c,fontWeight:700}}>{vals[i]}</div><div style={{width:'100%',height:`${h}px`,background:c,borderRadius:'3px 3px 0 0',opacity:0.85}}/><div style={{fontSize:10,color:'rgba(255,255,255,0.5)',textAlign:'center',lineHeight:1.2}}>{cat}</div></div>)})}
    </div>
  </div>)
}
function formatContent(text: string) {
  const blocks = parseBlocks(text)
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.type === 'graph' && b.config) {
          const t = b.config.type
          if (t === 'ascii')    return <AsciiBlock    key={i} cfg={b.config}/>
          if (t === 'table')    return <TableBlock    key={i} cfg={b.config}/>
          if (t === 'bar')      return <BarBlock      key={i} cfg={b.config}/>
          if (t === 'geometry') return <GeometryGraph key={i} config={b.config}/>
          return <FunctionGraph key={i} config={b.config}/>
        }
        return <div key={i}>{renderText(b.content)}</div>
      })}
    </div>
  )
}

// ══════════════════════════════════════════
// BULLE MESSAGE
// ══════════════════════════════════════════
function MessageBubble({ msg, onDelete, onEdit }: { msg: Msg; onDelete: (id: number) => void; onEdit: (id: number, c: string) => void }) {
  const isUser = msg.role === 'user'
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editVal, setEditVal] = useState(msg.content)
  const [confirmDel, setConfirmDel] = useState(false)

  const btn = (color = 'var(--muted)'): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6,
    border: 'none', background: 'var(--surface2)', color, fontSize: 11,
    fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
  })

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: isUser ? 'row-reverse' : 'row', marginBottom: 20 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setConfirmDel(false) }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: isUser ? 'linear-gradient(135deg,#4f6ef7,#7c3aed)' : 'linear-gradient(135deg,#06d6a0,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, marginTop: 2 }}>
        {isUser ? '👤' : '🤖'}
      </div>
      <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: 6, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <div style={{ background: isUser ? 'linear-gradient(135deg,rgba(79,110,247,0.18),rgba(124,58,237,0.13))' : 'var(--surface)', border: isUser ? '1px solid rgba(79,110,247,0.28)' : '1px solid var(--border)', borderRadius: isUser ? '18px 4px 18px 18px' : '4px 18px 18px 18px', padding: '12px 16px', width: '100%' }}>
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <textarea value={editVal} onChange={e => setEditVal(e.target.value)} autoFocus rows={3}
                style={{ width: '100%', borderRadius: 8, border: '1px solid #4f6ef7', background: 'var(--surface2)', color: 'var(--text)', fontSize: 14, fontFamily: 'inherit', padding: '8px 10px', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => { if (editVal.trim()) onEdit(msg.id, editVal.trim()); setEditing(false) }} style={{ ...btn('#06d6a0'), background: 'rgba(6,214,160,0.12)' }}>✓ Sauvegarder</button>
                <button onClick={() => { setEditing(false); setEditVal(msg.content) }} style={btn()}>✕ Annuler</button>
              </div>
            </div>
          ) : (
            isUser ? <p style={{ fontSize: 14, lineHeight: 1.65, margin: 0 }}>{msg.content}</p> : formatContent(msg.content)
          )}
        </div>
        <div style={{ display: 'flex', gap: 5, flexDirection: isUser ? 'row-reverse' : 'row', opacity: hovered && !editing ? 1 : 0, transition: 'opacity 0.15s', pointerEvents: hovered && !editing ? 'auto' : 'none' }}>
          <button onClick={() => {
              // Copie avec conversion LaTeX → lisible
              const lines = msg.content.split('\n').map((ln: string) =>
                ln.replace(/\$\$([\s\S]+?)\$\$/g, (_: string, m: string) => latexToReadable(m))
                  .replace(/\$([^$\n]+?)\$/g, (_: string, m: string) => latexToReadable(m))
                  .replace(/^## /,'').replace(/^### /,'').replace(/\*\*(.+?)\*\*/g,'$1')
                  .replace(/^> /,'→ ').replace(/^- /,'• ')
              )
              copyToClipboard(lines.join('\n').trim()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }).catch(() => {})
            }} style={btn(copied ? '#06d6a0' : undefined)}>
            {copied ? '✓ Copié !' : '📋 Copier'}
          </button>
          {isUser && <button onClick={() => { setEditing(true); setEditVal(msg.content) }} style={btn('#4f6ef7')}>✏️ Éditer</button>}
          {!confirmDel
            ? <button onClick={() => setConfirmDel(true)} style={btn('#ef4444')}>🗑 Supprimer</button>
            : <><button onClick={() => onDelete(msg.id)} style={{ ...btn('white'), background: '#ef4444' }}>✓ Confirmer</button><button onClick={() => setConfirmDel(false)} style={btn()}>✕</button></>}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════
// PAGE PRINCIPALE — avec quotas Supabase
// ══════════════════════════════════════════
export default function ChatPage() {
  const { isAdmin, hasActiveSubscription, checkQuota, incrementQuota, quotas, quotaLimits, refreshSubscription, matiereActive, activeMatieres, checkMatiereAccess } = useAuth()
  // Recalculer à chaque render (quotas peut changer après refreshSubscription)
  // Matière sélectionnée — initialisée depuis l'abonnement actif
  const MATIERE_LIST = [
    { key: 'mathematiques', label: 'Maths',    icon: '🧮', color: '#f59e0b' },
    { key: 'physique',      label: 'Physique',  icon: '⚗️', color: '#06d6a0' },
    { key: 'svt',           label: 'SVT',       icon: '🧬', color: '#10b981' },
    { key: 'anglais',       label: 'Anglais',   icon: '🇬🇧', color: '#f43f5e' },
    { key: 'informatique',  label: 'Info',      icon: '💻', color: '#8b5cf6' },
    { key: 'litterature',   label: 'Français',  icon: '🇫🇷', color: '#e879f9' },
  ] as const

  const [selectedMatiere, setSelectedMatiere] = useState<string>(() => matiereActive || 'mathematiques')

  // Sync si matiereActive change (connexion)
  useEffect(() => {
    if (matiereActive) setSelectedMatiere(matiereActive)
  }, [matiereActive])

  const _totalQuota = sumQuotasAcrossMatiere(quotas as any)
  // State local : incrément immédiat avant que Supabase réponde
  const [localChatExtra, setLocalChatExtra] = useState(0)
  const [lastSyncedChatUsed, setLastSyncedChatUsed] = useState(0)
  // Sync quand quotas change — utiliser JSON.stringify pour détecter le vrai changement
  useEffect(() => {
    const fromDb = sumQuotasAcrossMatiere(quotas as any).chat_used || 0
    setLastSyncedChatUsed(fromDb)
    setLocalChatExtra(0) // Supabase à jour → reset incrément local
  }, [JSON.stringify(quotas)])
  useKaTeX()

  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeCat, setActiveCat] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const [nextMsgId, setNextMsgId] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  // ── Historique ──
  const [showHistory, setShowHistory] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [copyMsg, setCopyMsg] = useState('')
  const [pdfMsg, setPdfMsg] = useState('')
  const [pendingImage, setPendingImage] = useState<{base64:string; mediaType:string; name:string} | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  // Charger l'historique au montage
  useEffect(() => { setSessions(loadSessions()) }, [])

  // Recharger les quotas depuis Supabase à chaque montage (navigation Next.js)
  useEffect(() => {
    refreshSubscription?.()
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') refreshSubscription?.()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const chatUsed = lastSyncedChatUsed + localChatExtra
  const chatLimit = quotaLimits.chat_per_week
  const isQuotaFull = !isAdmin && !checkQuota('chat')
  const quotaRemaining = isAdmin || chatLimit === -1
    ? 999
    : Math.max(0, chatLimit - chatUsed)

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  // Scroll vers le bas via scrollTop (pas scrollIntoView qui perturbe le layout)
  useEffect(() => {
    const el = messagesContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading])
  const getId = useCallback(() => { const id = nextMsgId; setNextMsgId(p => p + 1); return id }, [nextMsgId])

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return

    if (!isAdmin && !checkQuota('chat')) {
      alert(`Quota atteint — ${chatLimit} messages/semaine.\nRenouvellement lundi prochain.\n\n📚 MathBac Mensuel : 60 DT/mois · 20 msg/sem\n🚀 Sprint Bac (mai-juin) : 90 DT/mois · 30 msg/sem\n🎓 Annuel : 600 DT/an (Sprint inclus)\n\n→ mathsbac.com/abonnement`)
      return
    }

    // Vérifier accès matière selon abonnement
    if (!isAdmin && hasActiveSubscription) {
      const _matCheck = selectedMatiere === 'litterature' ? 'francais' : selectedMatiere
      if (!checkMatiereAccess(_matCheck as any)) {
        const allowed = (activeMatieres as string[]).map((m: string) => {
          const found = MATIERE_LIST.find((x: any) => x.key === m)
          return found ? (found as any).icon + ' ' + (found as any).label : m
        }).join(', ')
        alert('🔒 Accès limité — Votre abonnement couvre : ' + allowed + '\nSélectionnez la bonne matière dans le menu ci-dessus.')
        return
      }
    }

    const userMsg: Msg = { role: 'user', content, id: nextMsgId }
    setNextMsgId(p => p + 1)
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setShowWelcome(false)
    setLoading(true)

    const allMsgs = [...messages, userMsg]
    const history = allMsgs.slice(-12).map(m => ({ role: m.role, content: m.content }))

    // Si image en attente, remplacer le dernier message par un message multi-modal
    const messagesPayload = pendingImage
      ? [...history.slice(0, -1), {
          role: 'user' as const,
          content: [
            { type: 'image', source: { type: 'base64', media_type: pendingImage.mediaType, data: pendingImage.base64 } },
            { type: 'text', text: input || 'Analyse cette image et réponds à ma question.' }
          ]
        }]
      : history

    setPendingImage(null)

    // ── Prompt caching de l'historique : marque la fin du contexte comme point de cache.
    //    AUCUN impact sur la réponse (même contenu, même modèle, même max_tokens).
    //    Les tours précédents sont relus à -90 % dès que la conversation dépasse ~1024 tokens.
    const cachedPayload = (messagesPayload as any[]).map((m, i) => {
      if (i !== messagesPayload.length - 1) return m
      if (typeof m.content === 'string') {
        return { ...m, content: [{ type: 'text', text: m.content, cache_control: { type: 'ephemeral' } }] }
      }
      if (Array.isArray(m.content) && m.content.length > 0) {
        const blocks = m.content.map((b: any, j: number) =>
          j === m.content.length - 1 ? { ...b, cache_control: { type: 'ephemeral' } } : b
        )
        return { ...m, content: blocks }
      }
      return m
    })

    try {
      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 6000, // relevé pour des réponses exhaustives (reste sous le timeout serveur 115s)
          system: ((): string => {
              const REFUS_MATHS = '\u{1F512} Ce module est réservé aux **Mathématiques**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const REFUS_PHYS  = '\u{1F512} Ce module est réservé à la **Physique-Chimie**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const REFUS_SVT   = '\u{1F512} Ce module est réservé aux **SVT**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const REFUS_ANG   = '\u{1F512} This module is reserved for **English**. For this question, please select the corresponding subject in the menu above.'
              const REFUS_INFO  = '\u{1F512} Ce module est réservé à l\'**Informatique**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const REFUS_LIT   = '\u{1F512} Ce module est réservé à la **Littérature Française**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const FORMAT = '\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
                + '## RÉPONSE EXHAUSTIVE — RÈGLE ABSOLUE\n'
                + 'Réponds TOUJOURS de façon COMPLÈTE et DÉTAILLÉE, jamais abrégée ni tronquée.\n'
                + 'Pour chaque question : (1) rappelle la définition/notion utile ; (2) explique la MÉTHODE étape par étape ; '
                + '(3) détaille TOUS les calculs sans sauter aucune étape, en justifiant chaque passage ; '
                + '(4) traite TOUTES les sous-questions une par une, sans en oublier aucune ; '
                + '(5) si plusieurs cas ou méthodes existent, traite chaque cas ; '
                + '(6) termine par une **Conclusion** claire puis un encadré **📌 À retenir**.\n'
                + 'Ajoute des exemples concrets quand cela aide la compréhension. Reste rigoureux, structuré et bienveillant.\n\n'
                + '## FORMAT\n'
                + '- LaTeX OBLIGATOIRE : $formule$ en ligne, $$formule$$ en bloc.\n'
                + '- Structure : titres ## pour les parties, **gras** pour les résultats clés, listes à puces pour les étapes.\n\n'
                + '## GRAPHIQUES — CAPACITÉ COMPLÈTE (au niveau du solveur)\n'
                + 'Pour TOUTE courbe, fonction, figure géométrique, circuit, schéma ou diagramme : génère TOUJOURS un bloc ```graph en JSON valide. '
                + 'JAMAIS de schéma ASCII, JAMAIS [FIGURE:...].\n'
                + 'FONCTION — ```graph {"type":"function","title":"...","xrange":[-5,5],"yrange":[-2,10],"functions":[{"expr":"x*x","label":"f(x)","color":"#6366f1"}],"points":[{"x":1,"y":1,"label":"A","color":"#f59e0b"}],"asymptotes":[{"type":"horizontal","y":0,"label":"y=0"}]} ``` '
                + '(expressions JS : x*x, Math.sqrt(x), Math.abs(x), Math.sin(x), Math.exp(x), Math.log(x), Math.PI).\n'
                + 'GÉOMÉTRIE — ```graph {"type":"geometry","title":"...","shapes":[ ... ]} ``` ; formes et paramètres EXACTS : '
                + 'point {"type":"point","x":1,"y":2,"label":"A","color":"#f59e0b"} ; '
                + 'segment {"type":"segment","x1":0,"y1":0,"x2":3,"y2":2,"label":"AB"} ; '
                + 'vector {"type":"vector","x1":0,"y1":0,"x2":2,"y2":1,"label":"u","color":"#06d6a0"} ; '
                + 'circle {"type":"circle","cx":0,"cy":0,"r":2,"label":"C","color":"#4f6ef7"} ; '
                + 'triangle {"type":"triangle","points":[[0,0],[4,0],[2,3]],"label":"ABC","fill":"rgba(99,102,241,0.08)"} ; '
                + 'polygon {"type":"polygon","points":[[0,0],[2,0],[2,2],[0,2]]} ; '
                + 'rect {"type":"rect","x":0,"y":0,"w":2,"h":1,"label":"R"} ; '
                + 'line {"type":"line","x1":0,"y1":0,"x2":1,"y2":2,"dashed":true} ; '
                + 'angle {"type":"angle","cx":0,"cy":0,"r":1,"a1":0,"a2":60,"label":"60°"} ; '
                + 'arc {"type":"arc","cx":0,"cy":0,"r":1,"a1":0,"a2":90} ; '
                + 'rightangle {"type":"rightangle","cx":1,"cy":0,"size":0.3} ; '
                + 'label {"type":"label","x":1,"y":1,"text":"texte"} ; ajoute si utile {"type":"axes"} et {"type":"grid"}.\n\n'
                + '## MÉTHODE PÉDAGOGIQUE\n'
                + '- Adapte le niveau au programme officiel du Bac (Tunisie et France) et au contexte de l\'élève.\n'
                + '- Vérifie systématiquement le résultat avant de conclure : cohérence, unités, ordre de grandeur, cas limites.\n'
                + '- Signale explicitement les pièges et erreurs fréquentes sur ce type de question.\n'
                + '- Donne la rédaction-type attendue le jour du Bac : justifications complètes, quantificateurs, théorèmes cités, phrases de conclusion.\n'
                + '- Quand c\'est pertinent, propose une courte vérification, un schéma, ou un contre-exemple éclairant.\n'
                + '- Si une notion préalable est nécessaire, explique-la brièvement avant de poursuivre, sans supposer qu\'elle est acquise.\n'
                + '- Pour les démonstrations, rédige chaque implication et chaque hypothèse ; ne saute aucun maillon logique.\n'
                + '- Numérote les étapes, présente les résultats intermédiaires clés, et mets clairement en évidence la réponse finale.\n'
                + '- Bienveillance et encouragement systématiques.'

              const instructions: Record<string,string> = {
                mathematiques:
                  'Tu es EXCLUSIVEMENT un professeur de Mathématiques Bac (Tunisie + France).\n'
                  + 'RÈGLE ABSOLUE : Tu réponds UNIQUEMENT aux questions de mathématiques.\n'
                  + 'Si question hors-maths, réponds EXACTEMENT : ' + REFUS_MATHS + '\n'
                  + 'Ne réponds JAMAIS à des questions hors mathématiques, même partiellement.\n\n'
                  + '## GRAPHIQUES — RÈGLE ABSOLUE\n'
                  + 'Pour TOUTE demande de courbe/graphique/trace/représente/figure, génère OBLIGATOIREMENT un bloc ```graph avec ce format JSON EXACT :\n'
                  + '```graph\n{ "type": "function", "title": "Titre", "xrange": [-5,5], "yrange": [-2,10], "functions": [{ "expr": "x*x", "label": "f(x)=x²", "color": "#6366f1" }], "points": [{ "x": 1, "y": 1, "label": "A(1,1)", "color": "#f59e0b" }] }\n```\n\n'
                  + 'Expressions JS : x² = x*x, x³ = x*x*x, √x = Math.sqrt(x), |x| = Math.abs(x), sin(x) = Math.sin(x), eˣ = Math.exp(x), ln(x) = Math.log(x)\n'
                  + 'Pour géométrie : "type": "geometry" avec "shapes": [axes, grid, point, segment, vector, circle, triangle, polygon, rect, angle, arc, label]\n'
                  + 'NE JAMAIS faire de graphique ASCII — TOUJOURS utiliser le JSON ```graph'
                  + FORMAT,
                physique:
                  'Tu es EXCLUSIVEMENT un professeur de Physique-Chimie Bac.\n'
                  + 'RÈGLE ABSOLUE : Tu réponds UNIQUEMENT aux questions de physique-chimie.\n'
                  + 'Si question hors physique-chimie, réponds EXACTEMENT : ' + REFUS_PHYS + '\n\n'
                  + '## GRAPHIQUES PHYSIQUE — OBLIGATOIRES\n'
                  + 'Pour circuits RC/RL/RLC, courbes u(t)/i(t), dosage pH, oscillations → génère ```graph JSON.\n'
                  + 'Charge RC : { "type":"function", "functions":[{"expr":"1-Math.exp(-x)","label":"u_C(t)","color":"#4f6ef7"}] }\n'
                  + 'Circuit géométrie : { "type":"geometry", "shapes":[{"type":"rect","x":3,"y":1,"w":1.5,"h":0.8,"color":"#ef4444","label":"R"},{"type":"rect","x":5,"y":1.5,"w":0.5,"h":2,"color":"#8b5cf6","label":"C"}] }\n'
                  + 'NE JAMAIS faire de schéma ASCII — TOUJOURS utiliser le JSON ```graph'
                  + FORMAT,
                svt:
                  'Tu es EXCLUSIVEMENT un professeur de SVT Bac.\n'
                  + 'RÈGLE ABSOLUE : Tu réponds UNIQUEMENT aux questions de SVT.\n'
                  + 'Si question hors SVT, réponds EXACTEMENT : ' + REFUS_SVT + '\n\n'
                  + '## GRAPHIQUES SVT — OBLIGATOIRES\n'
                  + 'Michaelis-Menten : { "type":"function", "functions":[{"expr":"100*x/(x+5)","label":"Vmax=100, Km=5","color":"#4f6ef7"}] }\n'
                  + 'Glycémie : { "type":"function", "yrange":[0.6,2.2], "functions":[{"expr":"1+0.9*Math.exp(-x)*Math.sin(2*x)","label":"Glycémie g/L","color":"#f59e0b"}] }\n'
                  + 'NE JAMAIS faire de graphique ASCII — TOUJOURS utiliser le JSON ```graph'
                  + FORMAT,
                anglais:
                  'You are EXCLUSIVELY an English teacher.\n'
                  + 'ABSOLUTE RULE: You respond ONLY to questions about English (grammar, writing, reading, literary analysis, LLCER axes, vocabulary).\n'
                  + 'You ALWAYS respond ENTIRELY in English.\n'
                  + 'If question is about another subject, respond EXACTLY: ' + REFUS_ANG
                  + '\nNEVER answer questions outside English language and literature.'
                  + FORMAT,
                informatique:
                  'Tu es EXCLUSIVEMENT un professeur d\'Informatique.\n'
                  + 'RÈGLE ABSOLUE : Tu réponds UNIQUEMENT aux questions d\'informatique (algorithmique, complexité, structures de données, SQL, Python, réseaux, POO).\n'
                  + 'Si question hors informatique, réponds EXACTEMENT : ' + REFUS_INFO
                  + '\nGénère des traces d\'exécution et graphiques de complexité Big O quand pertinent.'
                  + FORMAT,
                litterature:
                  'Tu es EXCLUSIVEMENT un professeur de Littérature Française et Français.\n'
                  + 'RÈGLE ABSOLUE : Tu réponds UNIQUEMENT aux questions de littérature française (commentaire composé, dissertation, figures de style, versification, auteurs, mouvements).\n'
                  + 'Si question hors littérature/français, réponds EXACTEMENT : ' + REFUS_LIT
                  + FORMAT,
              }
              return instructions[selectedMatiere] || instructions['mathematiques']
            })(),
          messages: cachedPayload,
        }),
      })
      const data = await res.json()

      if (res.status === 429) {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${data.error || 'Quota hebdomadaire atteint. Renouvellement lundi.'}`, id: nextMsgId }])
        setNextMsgId(p => p + 1)
        setLoading(false)
        return
      }

      const reply = data.content?.map((c: any) => c.text || '').join('') || 'Désolé, je n\'ai pas pu générer une réponse.'

      const _matiereChat = selectedMatiere === 'litterature' ? 'francais' : selectedMatiere
      await incrementQuota('chat', _matiereChat as any)
      setLocalChatExtra(prev => prev + 1) // Mise à jour immédiate affichage

      const updatedMsgs = [...messages, userMsg, { role: 'assistant', content: reply, id: nextMsgId }]
      setMessages(prev => [...prev, { role: 'assistant', content: reply, id: nextMsgId }])
      setNextMsgId(p => p + 1)
      // Sauvegarder dans l'historique
      setTimeout(() => { saveSession(updatedMsgs); setSessions(loadSessions()) }, 100)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Erreur de connexion. Vérifie que le serveur est bien démarré.', id: nextMsgId }])
      setNextMsgId(p => p + 1)
    }
    setLoading(false)
  }, [input, loading, messages, nextMsgId, isAdmin, checkQuota, incrementQuota, chatLimit])

  return (
    <>
      <Navbar />
      <main style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '0 8px', gap: 16, minHeight: 0, scrollbarWidth: 'thin', scrollbarColor: 'rgba(99,102,241,0.4) transparent' }}>

          {/* ── SIDEBAR ── */}
          <aside style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16, padding: '36px 0 14px', overflowY: 'auto', overflowX: 'hidden', height: '100%' }}>

            {/* ── HISTORIQUE ── */}
            <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:18, overflow:'hidden' }}>
              <button onClick={() => setShowHistory(!showHistory)}
                style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px', background:'transparent', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
                <span style={{ fontSize:12, fontWeight:700, color:'var(--text2)' }}>🕐 Historique ({sessions.length})</span>
                <span style={{ fontSize:11, color:'var(--muted)', transform: showHistory ? 'rotate(180deg)' : 'none', transition:'0.2s' }}>▼</span>
              </button>
              {showHistory && (
                <div style={{ maxHeight:200, overflowY:'auto', borderTop:'1px solid var(--border)' }}>
                  {sessions.length === 0 ? (
                    <div style={{ padding:'14px', fontSize:12, color:'var(--muted)', textAlign:'center' }}>Aucune conversation sauvegardée</div>
                  ) : sessions.map(s => (
                    <div key={s.id} style={{ borderBottom:'1px solid var(--border)', padding:'10px 12px', cursor:'pointer', transition:'all 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,110,247,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:4 }}>
                        <button onClick={() => {
                          setMessages(s.messages as Msg[]); setShowWelcome(false); setShowHistory(false)
                        }} style={{ flex:1, textAlign:'left', background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit' }}>
                          <div style={{ fontSize:11, fontWeight:700, color:'var(--text)', lineHeight:1.35, marginBottom:2 }}>{s.title}</div>
                          <div style={{ fontSize:10, color:'var(--muted)' }}>{s.date} · {s.messages.length} msg</div>
                          <div style={{ fontSize:10, color:'var(--muted)', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.preview.slice(0,50)}…</div>
                        </button>
                        <button onClick={e => { e.stopPropagation(); deleteSession(s.id); setSessions(loadSessions()) }}
                          style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(239,68,68,0.5)', fontSize:14, flexShrink:0, padding:'0 2px' }}
                          title="Supprimer">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Prof IA card — compacte */}
            <div style={{ background: 'linear-gradient(135deg,rgba(6,214,160,0.08),rgba(79,110,247,0.08))', border: '1px solid rgba(6,214,160,0.22)', borderRadius: 14, padding: '20px 18px' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#06d6a0,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🤖</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Prof IA</div>
                  <div style={{ fontSize: 10, color: '#06d6a0' }}>● En ligne · Maths Tunisie & France</div>
                </div>
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: 'var(--text2)', lineHeight: 1.5, background: 'rgba(99,102,241,0.08)', borderRadius: 7, padding: '6px 8px' }}>
                💡 Dis <strong>"trace"</strong> ou <strong>"représente"</strong> pour avoir un graphique interactif
              </div>
            </div>


            {messages.length > 0 && (
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                <button onClick={() => openChatPdf(messages.map(m => ({ role: m.role, content: m.content })))}
                  style={{ display:'flex', alignItems:'center', gap:7, padding:'8px 14px', background:'linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.2))', border:'1px solid rgba(99,102,241,0.35)', borderRadius:10, cursor:'pointer', fontSize:12, fontWeight:700, color:'#a5b4fc', fontFamily:'inherit', width:'100%', justifyContent:'center' }}>
                  🎨 Imprimer PDF
                </button>
                <button onClick={() => {
                  const lines = messages.map(m => {
                    const clean = m.content
                      .replace(/```graph[\s\S]*?```/g, '[Graphique interactif]')
                      .split('\n').map((ln: string) =>
                        ln.replace(/\$\$([\s\S]+?)\$\$/g, (_: string, math: string) => latexToReadable(math))
                          .replace(/\$([^$\n]+?)\$/g, (_: string, math: string) => latexToReadable(math))
                          .replace(/^## /,'').replace(/^### /,'').replace(/\*\*(.+?)\*\*/g,'$1')
                          .replace(/^> /,'→ ').replace(/^- /,'• ')
                      ).join('\n')
                    return (m.role === 'user' ? '👤 Élève:\n' : '🤖 Prof IA:\n') + clean
                  }).join('\n\n─────────────\n\n')
                  copyToClipboard(lines.trim()).then(() => { setPdfMsg('Copié !'); setTimeout(() => setPdfMsg(''), 2500) }).catch(() => setPdfMsg('Erreur copie'))
                }}
                  style={{ padding:'8px 14px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, cursor:'pointer', fontSize:12, color: pdfMsg ? '#6ee7b7' : 'rgba(255,255,255,0.5)', fontFamily:'inherit', width:'100%', textAlign:'center' }}>
                  {pdfMsg ? `✓ ${pdfMsg}` : '📋 Copier la conversation'}
                </button>
                <button onClick={() => { saveSession(messages); setSessions(loadSessions()); setMessages([]); setShowWelcome(true); setInput('') }}
                  style={{ padding:'7px 14px', borderRadius:10, border:'1px solid var(--border)', background:'transparent', color:'var(--muted)', fontSize:11, cursor:'pointer', width:'100%', textAlign:'center' }}>
                  🗑 Nouvelle conversation
                </button>
              </div>
            )}
          </aside>

          {/* ── ZONE CHAT ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0, overflow: 'hidden' }}>

            {/* Header avec sélecteur de matière */}
            <div style={{ padding: '24px 0 10px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#06d6a0', animation: 'pulse 2s ease infinite', flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: 15, flexShrink: 0 }}>Professeur IA</span>
              {/* Sélecteur de matières */}
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', flex: 1 }}>
                {MATIERE_LIST.map(m => {
                  const _keyCheck = m.key === 'litterature' ? 'francais' : m.key
                  const hasAccess = isAdmin || !hasActiveSubscription || checkMatiereAccess(_keyCheck as any)
                  const isSelected = selectedMatiere === m.key
                  return (
                    <button key={m.key}
                      onClick={() => {
                        if (!hasAccess) {
                          alert(`🔒 Votre abonnement ne couvre pas ${m.label}.\nAbonnez-vous sur mathsbac.com/abonnement`)
                          return
                        }
                        setSelectedMatiere(m.key)
                        setMessages([])
                        setShowWelcome(true)
                      }}
                      title={hasAccess ? m.label : `🔒 Non inclus dans votre abonnement`}
                      style={{
                        padding: '4px 10px', borderRadius: 20, border: isSelected ? `1.5px solid ${m.color}` : '1px solid var(--border)',
                        background: isSelected ? `${m.color}22` : 'transparent',
                        color: isSelected ? m.color : hasAccess ? 'var(--text2)' : 'var(--muted)',
                        fontSize: 11, fontWeight: isSelected ? 700 : 500, cursor: hasAccess ? 'pointer' : 'not-allowed',
                        opacity: hasAccess ? 1 : 0.45, transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 4
                      }}>
                      <span>{m.icon}</span>
                      <span>{m.label}</span>
                      {!hasAccess && <span style={{ fontSize: 9 }}>🔒</span>}
                    </button>
                  )
                })}
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'monospace', flexShrink: 0 }}>
                {messages.length > 0 ? `${Math.ceil(messages.length / 2)} échanges` : ''}
              </span>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '20px 4px' }}>

              {/* Écran d'accueil */}
              {showWelcome && messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '36px 20px' }}>
                  <div style={{ fontSize: 46, marginBottom: 14 }}>🎓</div>
                  <h2 style={{ fontSize: 21, marginBottom: 8 }}>Bonjour ! Je suis ton Prof IA</h2>
                  <p style={{ color: 'var(--text2)', fontSize: 14, maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.6 }}>
                    Pose-moi n&apos;importe quelle question — maths · physique · chimie · SVT · informatique · anglais.<br />
                    Je peux <strong style={{ color: '#a78bfa' }}>tracer des courbes</strong>, dessiner des <strong style={{ color: '#f59e0b' }}>figures géométriques</strong>, et expliquer tous les chapitres du programme.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(185px,1fr))', gap: 9, maxWidth: 620, margin: '0 auto' }}>
                    {STARTERS.map((s, i) => (
                      <button key={i} onClick={() => sendMessage(s.text)}
                        style={{ textAlign: 'left', padding: '12px 14px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.background = 'rgba(99,102,241,0.06)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)' }}>
                        <div style={{ fontSize: 19, marginBottom: 5 }}>{s.icon}</div>
                        <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.4, fontFamily: 'monospace' }}>{s.text}</div>
                        <div style={{ fontSize: 10, color: '#6366f1', marginTop: 5, fontWeight: 600 }}>{s.tag}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map(msg => (
                <MessageBubble key={msg.id} msg={msg}
                  onDelete={id => setMessages(p => p.filter(m => m.id !== id))}
                  onEdit={(id, c) => setMessages(p => p.map(m => m.id === id ? { ...m, content: c } : m))} />
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#06d6a0,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px 18px 18px 18px', padding: '14px 18px', display: 'flex', gap: 5, alignItems: 'center' }}>
                    {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#06d6a0', animation: `bounce 1.2s ease ${i * 0.2}s infinite` }} />)}
                  </div>
                </div>
              )}

            </div>

            {/* ── BANNIÈRE QUOTA SUPABASE ── */}
            <div style={{ padding: '6px 0 2px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                {/* Badge quota */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11,
                  color: isAdmin ? 'rgba(110,231,183,0.9)' : isQuotaFull ? 'rgba(239,68,68,0.9)' : quotaRemaining <= 5 ? 'rgba(245,158,11,0.9)' : 'rgba(255,255,255,0.4)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: isAdmin ? '#10b981' : isQuotaFull ? '#ef4444' : quotaRemaining <= 5 ? '#f59e0b' : '#10b981', display: 'inline-block' }}/>
                  {isAdmin
                    ? '✓ Admin — illimité'
                    : isQuotaFull
                      ? 'Quota atteint — renouvellement lundi'
                      : `${quotaRemaining} question${quotaRemaining > 1 ? 's' : ''} restante${quotaRemaining > 1 ? 's' : ''} cette semaine`}
                </div>

                {/* Lien upgrade si quota presque plein */}
                {!isAdmin && quotaRemaining <= 5 && !isQuotaFull && (
                  <div style={{ fontSize:10, lineHeight:1.5 }}>
                    <a href="/abonnement" style={{ color:'var(--gold)', textDecoration:'none', fontWeight:700, display:'block' }}>
                      🇹🇳 Plans Tunisie : 60 DT · 90 DT · 600 DT →
                    </a>
                    <a href="/abonnement-france" style={{ color:'#60a5fa', textDecoration:'none', fontWeight:700, display:'block' }}>
                      🇫🇷 Plans France : 19€ · 29€ · 199€ →
                    </a>
                  </div>
                )}
                {!isAdmin && isQuotaFull && (
                  <div style={{ fontSize:11, lineHeight:1.6 }}>
                    <div style={{ color:'#ef4444', fontWeight:700, marginBottom:3 }}>🔒 Quota atteint</div>
                    <a href="/abonnement" style={{ color:'var(--gold)', textDecoration:'none', fontWeight:600, display:'block' }}>
                      🇹🇳 Abonnement Tunisie →
                    </a>
                    <a href="/abonnement-france" style={{ color:'#60a5fa', textDecoration:'none', fontWeight:600, display:'block' }}>
                      🇫🇷 Abonnement France →
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Zone de saisie */}
            <div style={{ padding: '4px 0 14px', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '10px 12px', transition: 'border-color 0.2s' }}
                onFocusCapture={e => (e.currentTarget.style.borderColor = '#6366f1')}
                onBlurCapture={e => (e.currentTarget.style.borderColor = 'var(--border)')}>

                {/* Preview image en attente */}
                {pendingImage && (
                  <div style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 10px', background:'rgba(99,102,241,0.1)', borderRadius:8, margin:'0 0 6px', fontSize:12 }}>
                    <span>🖼️</span>
                    <span style={{ color:'#818cf8', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{pendingImage.name}</span>
                    <button onClick={() => setPendingImage(null)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:14, padding:'0 2px' }}>×</button>
                  </div>
                )}

                {/* Inputs cachés */}
                <input ref={imageInputRef} type="file" accept=".png,.jpg,.jpeg,.webp,.gif" style={{ display:'none' }}
                  onChange={e => {
                    const f = e.target.files?.[0]; if (!f) return
                    const reader = new FileReader()
                    reader.onload = ev => {
                      const b64 = (ev.target?.result as string).split(',')[1]
                      const mt = f.type || 'image/jpeg'
                      setPendingImage({ base64: b64, mediaType: mt, name: f.name })
                    }
                    reader.readAsDataURL(f)
                    e.target.value = ''
                  }} />
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display:'none' }}
                  onChange={e => {
                    const f = e.target.files?.[0]; if (!f) return
                    const reader = new FileReader()
                    reader.onload = ev => {
                      const b64 = (ev.target?.result as string).split(',')[1]
                      setPendingImage({ base64: b64, mediaType: f.type || 'image/jpeg', name: f.name || 'photo.jpg' })
                    }
                    reader.readAsDataURL(f)
                    e.target.value = ''
                  }} />

                {/* Colonne gauche : boutons + textarea pleine largeur */}
                <div style={{ flex:1, display:'flex', flexDirection:'column', gap:5, minWidth:0 }}>
                  <div style={{ display:'flex', gap:6 }}>
                    <button onClick={() => imageInputRef.current?.click()} title="Joindre une image"
                      style={{ width:30, height:30, borderRadius:7, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--muted)', fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='#6366f1'; e.currentTarget.style.color='#818cf8' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)' }}>
                      📎
                    </button>
                    <button onClick={() => cameraInputRef.current?.click()} title="Prendre une photo"
                      style={{ width:30, height:30, borderRadius:7, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--muted)', fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='#06d6a0'; e.currentTarget.style.color='#06d6a0' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)' }}>
                      📸
                    </button>
                  </div>
                  <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                    placeholder={isQuotaFull ? 'Quota atteint — renouvellement lundi prochain' : pendingImage ? "Ajoute une question sur l'image (optionnel)…" : 'Pose ta question… ou dis "trace f(x) = x²−2x" pour un graphique interactif'}
                    rows={1} style={{ width:'100%', border:'none', background:'transparent', color:'var(--text)', fontSize:14, fontFamily:'inherit', resize:'none', outline:'none', lineHeight:1.5, maxHeight:120, overflow:'auto', boxSizing:'border-box' }}
                    onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height='auto'; t.style.height=Math.min(t.scrollHeight,120)+'px' }} />
                </div>
                <button onClick={() => sendMessage()} disabled={loading || (!input.trim() && !pendingImage) || isQuotaFull}
                  style={{ width:38, height:38, borderRadius:10, border:'none', flexShrink:0, alignSelf:'flex-end', background: loading || (!input.trim() && !pendingImage) || isQuotaFull ? 'var(--surface2)' : 'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', fontSize:16, cursor: loading || (!input.trim() && !pendingImage) || isQuotaFull ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
                  {loading ? '⏳' : isQuotaFull ? '🔒' : '↑'}
                </button>
              </div>
              <div style={{ textAlign: 'center', fontSize: 10.5, color: 'var(--muted)', marginTop: 7 }}>
                Entrée pour envoyer · Shift+Entrée pour saut de ligne · 🇹🇳 60 DT/mois · 🇫🇷 19€/mois · 📈 Graphiques interactifs
              </div>
            </div>
          </div>
        </div>
      </main>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media(max-width:768px){ aside{display:none!important} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.7); }
      `}</style>
    </>
  )
}