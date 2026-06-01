'use client'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'   
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

// ════════════════════════════════════════════════════════════════════
// SYSTÈME VOIX — Reconnaissance vocale + Synthèse vocale (fr-FR)
// ════════════════════════════════════════════════════════════════════

interface VoiceState {
  isListening: boolean
  isSpeaking: boolean
  transcript: string
  interimTranscript: string
  autoSpeak: boolean
  voiceEnabled: boolean
  micError: string | null
}

function useVoiceSystem() {
  const [state, setState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    transcript: '',
    interimTranscript: '',
    autoSpeak: false,
    voiceEnabled: false,
    micError: null,
  })

  const recognitionRef = useRef<any>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const synthRef = useRef<typeof window.speechSynthesis | null>(null)

  // Détection support navigateur
  const browserSupportsSpeech = typeof window !== 'undefined' && (
    'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  )
  const browserSupportsTTS = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Initialisation
  useEffect(() => {
    if (!browserSupportsSpeech) return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'fr-FR'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setState(s => ({ ...s, isListening: true, micError: null, transcript: '', interimTranscript: '' }))
    }

    recognition.onresult = (event: any) => {
      let interim = ''
      let final = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          final += transcript
        } else {
          interim += transcript
        }
      }
      setState(s => ({ ...s, transcript: final || s.transcript, interimTranscript: interim }))
    }

    recognition.onerror = (event: any) => {
      const errors: Record<string, string> = {
        'no-speech': 'Aucune parole détectée',
        'audio-capture': 'Microphone non trouvé',
        'not-allowed': 'Permission micro refusée',
        'network': 'Erreur réseau — vérifie ta connexion',
        'aborted': 'Écoute annulée',
      }
      setState(s => ({ ...s, isListening: false, micError: errors[event.error] || `Erreur: ${event.error}` }))
    }

    recognition.onend = () => {
      setState(s => ({ ...s, isListening: false }))
    }

    recognitionRef.current = recognition
    synthRef.current = window.speechSynthesis

    // Charger préférences
    try {
      const saved = localStorage.getItem('bacai_voice_prefs')
      if (saved) {
        const prefs = JSON.parse(saved)
        setState(s => ({ ...s, autoSpeak: prefs.autoSpeak ?? false, voiceEnabled: prefs.voiceEnabled ?? true }))
      } else {
        setState(s => ({ ...s, voiceEnabled: true }))
      }
    } catch {}

    return () => {
      try { recognition.stop() } catch {}
      if (synthRef.current) synthRef.current.cancel()
    }
  }, [browserSupportsSpeech])

  // ── Hydration-safe mount flag ──
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])


  const startListening = useCallback(() => {
    if (!recognitionRef.current || state.isListening) return
    try {
      recognitionRef.current.start()
    } catch (e) {
      // Peut déjà être en cours, on réessaie après un délai
      setTimeout(() => {
        try { recognitionRef.current?.start() } catch {}
      }, 300)
    }
  }, [state.isListening])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return
    try { recognitionRef.current.stop() } catch {}
    setState(s => ({ ...s, isListening: false }))
  }, [])

  const toggleListening = useCallback(() => {
    if (state.isListening) stopListening()
    else startListening()
  }, [state.isListening, startListening, stopListening])

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!browserSupportsTTS || !synthRef.current || !state.voiceEnabled) return

    // Annuler toute lecture en cours
    synthRef.current.cancel()

    // Nettoyer le texte (enlever markdown, LaTeX, blocs graphiques)
    const cleanText = text
      // Blocs de code et graphiques
      .replace(/```graph[\s\S]*?```/g, 'graphique')
      .replace(/```[\s\S]*?```/g, 'bloc de code')
      // LaTeX
      .replace(/\$\$[\s\S]*?\$\$/g, 'formule mathématique')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 sur $2')
      .replace(/\\sqrt\{([^}]+)\}/g, 'racine carrée de $1')
      .replace(/\\[a-zA-Z]+/g, '')
      .replace(/\$[^$\n]+?\$/g, 'formule')
      // Markdown
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/__(.+?)__/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/^#{1,3}\s+/gm, '')
      .replace(/^[-*+]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      .replace(/^>\s+/gm, '')
      // URLs et liens
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/https?:\/\/\S+/g, 'lien')
      // Espaces et ponctuation
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, ' ')
      .replace(/\.{2,}/g, '.')
      .replace(/\s{2,}/g, ' ')
      .trim()

    if (!cleanText || cleanText.length < 3) return

    // ── Chunking : découper en paragraphes pour éviter coupure Chrome ──
    // Chrome TTS coupe les textes > ~250 mots — on découpe par paragraphes
    const MAX_CHUNK = 800 // caractères
    const paragraphs = cleanText.split(/(?<=[.!?])\s+(?=[A-ZÀÂÉÈÊËÎÏÔÙÛÜŒ])/)
    const chunks: string[] = []
    let current = ''
    for (const p of paragraphs) {
      if ((current + ' ' + p).length > MAX_CHUNK && current) {
        chunks.push(current.trim())
        current = p
      } else {
        current = current ? current + ' ' + p : p
      }
    }
    if (current.trim()) chunks.push(current.trim())
    if (!chunks.length) return

    // Préférences rate sauvegardées
    const savedPrefs = localStorage.getItem('bacai_voice_prefs')
    const savedRate = savedPrefs ? (JSON.parse(savedPrefs).rate ?? 0.88) : 0.88
    const speakRate = Math.max(0.6, Math.min(1.4, savedRate))

    // Lire tous les chunks en séquence avec pause naturelle entre eux
    let chunkIdx = 0
    const speakChunk = () => {
      if (chunkIdx >= chunks.length) { setState(s => ({ ...s, isSpeaking: false })); onEnd?.(); return }
      const utterance = new SpeechSynthesisUtterance(chunks[chunkIdx])
    utterance.lang = 'fr-FR'
    // Voix prof : débit naturel, ton légèrement chaleureux
    utterance.rate = speakRate
    utterance.pitch = 1.05
    utterance.volume = 1.0

    // Sélectionner la meilleure voix française (avec fallback dynamique)
    const pickVoice = () => {
      const voices = synthRef.current!.getVoices()
      return voices.find(v => v.lang === 'fr-FR' && v.name.toLowerCase().includes('google'))
        || voices.find(v => v.lang === 'fr-FR' && v.name.toLowerCase().includes('microsoft'))
        || voices.find(v => v.lang.startsWith('fr-'))
        || voices.find(v => v.lang.startsWith('fr'))
        || voices.find(v => v.lang.startsWith('en'))
    }
    const frVoice = pickVoice()
    if (frVoice) utterance.voice = frVoice


    if (chunkIdx === 0) utterance.onstart = () => setState(s => ({ ...s, isSpeaking: true }))
    utterance.onend = () => {
      chunkIdx++
      // Pause naturelle entre chunks (comme un prof qui reprend son souffle)
      setTimeout(speakChunk, 120)
    }
    utterance.onerror = () => { setState(s => ({ ...s, isSpeaking: false })); onEnd?.() }
    utteranceRef.current = utterance
    synthRef.current?.speak(utterance)
    }
    speakChunk()
  }, [browserSupportsTTS, state.voiceEnabled])

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setState(s => ({ ...s, isSpeaking: false }))
    }
  }, [])

  const toggleAutoSpeak = useCallback(() => {
    setState(s => {
      const next = { ...s, autoSpeak: !s.autoSpeak }
      localStorage.setItem('bacai_voice_prefs', JSON.stringify({ autoSpeak: next.autoSpeak, voiceEnabled: next.voiceEnabled }))
      return next
    })
  }, [])

  const toggleVoiceEnabled = useCallback(() => {
    setState(s => {
      const next = { ...s, voiceEnabled: !s.voiceEnabled }
      if (!next.voiceEnabled && synthRef.current) synthRef.current.cancel()
      localStorage.setItem('bacai_voice_prefs', JSON.stringify({ autoSpeak: next.autoSpeak, voiceEnabled: next.voiceEnabled }))
      return next
    })
  }, [])

  return {
    ...state,
    mounted,
    browserSupportsSpeech,
    browserSupportsTTS,
    startListening,
    stopListening,
    toggleListening,
    speak,
    stopSpeaking,
    toggleAutoSpeak,
    toggleVoiceEnabled,
  }
}


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

### TYPE 3 — SCHÉMAS PHYSIQUE & CHIMIE
Mots-clés déclencheurs : "circuit", "condensateur", "RC", "RL", "RLC", "ressort", "pendule", "lentille", "pile", "dosage", "dipôle", "charge", "décharge", "oscillation", "ondes"

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
          const f = new Function('x', `try{const v=(${fn.expr});return(isFinite(v)&&Math.abs(v)<1e6)?v:null}catch(e){return null}`)
          for (let i = 0; i <= N; i++) {
            const x = xMin + (i / N) * (xMax - xMin)
            const v = f(x)
            if (v !== null) allY.push(v)
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
          if (y === null || y < yMin - (yMax - yMin) * 0.5 || y > yMax + (yMax - yMin) * 0.5) { pen = false; continue }
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
  const re = /```graph\n?([\s\S]*?)```/g
  let last = 0, m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push({ type: 'text', content: text.slice(last, m.index) })
    try {
      const cfg = JSON.parse(m[1].trim())
      out.push({ type: 'graph', content: m[1], config: cfg })
    } catch {
      out.push({ type: 'text', content: m[0] })
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ type: 'text', content: text.slice(last) })
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

function formatContent(text: string) {
  const blocks = parseBlocks(text)
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.type === 'graph' && b.config) {
          if (b.config.type === 'geometry') return <GeometryGraph key={i} config={b.config} />
          return <FunctionGraph key={i} config={b.config} />
        }
        return <div key={i}>{renderText(b.content)}</div>
      })}
    </div>
  )
}

// ══════════════════════════════════════════
// BULLE MESSAGE
// ══════════════════════════════════════════
function MessageBubble({ msg, onDelete, onEdit, voice }: { msg: Msg; onDelete: (id: number) => void; onEdit: (id: number, c: string) => void; voice?: ReturnType<typeof useVoiceSystem> }) {
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
          {!isUser && voice?.mounted && voice?.browserSupportsTTS && (
            <button onClick={() => {
              if (voice.isSpeaking) voice.stopSpeaking()
              else voice.speak(msg.content)
            }} style={btn(voice.isSpeaking ? '#06d6a0' : undefined)}>
              {voice.isSpeaking ? '🔊 Arrêter' : '🔈 Lire'}
            </button>
          )}

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
  // ── Système Voix (reconnaissance + synthèse) ──
  const voice = useVoiceSystem()

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

  // ── Auto-envoi quand la reconnaissance vocale termine ──
  useEffect(() => {
    if (voice.transcript && !voice.isListening && voice.transcript.trim().length > 2) {
      const text = voice.transcript.trim()
      // Petit délai pour éviter les envois multiples
      const timer = setTimeout(() => {
        sendMessage(text)
        voice.stopListening()
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [voice.transcript, voice.isListening])

  // ── Auto-lecture des réponses de l'IA ──
  const lastAssistantMsg = useMemo(() => {
    const msgs = messages.filter(m => m.role === 'assistant')
    return msgs[msgs.length - 1]
  }, [messages])

  useEffect(() => {
    if (voice.autoSpeak && lastAssistantMsg && !loading) {
      voice.speak(lastAssistantMsg.content)
    }
  }, [lastAssistantMsg?.id, loading, voice.autoSpeak])

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

    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))

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

    try {
      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: ((): string => {
              const REFUS_MATHS = '\u{1F512} Ce module est réservé aux **Mathématiques**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const REFUS_PHYS  = '\u{1F512} Ce module est réservé à la **Physique-Chimie**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const REFUS_SVT   = '\u{1F512} Ce module est réservé aux **SVT**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const REFUS_ANG   = '\u{1F512} This module is reserved for **English**. For this question, please select the corresponding subject in the menu above.'
              const REFUS_INFO  = '\u{1F512} Ce module est réservé à l\'**Informatique**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const REFUS_LIT   = '\u{1F512} Ce module est réservé à la **Littérature Française**. Pour cette question, sélectionne la matière correspondante dans le menu ci-dessus.'
              const FORMAT = '\n\n## FORMAT\n- LaTeX : $inline$ ou $$bloc$$\n- Structure : ## parties, **gras** résultats\n- Graphiques si pertinent\n- Bienveillance toujours'

              const instructions: Record<string,string> = {
                mathematiques:
                  'Tu es EXCLUSIVEMENT un professeur de Mathématiques.\n'
                  + 'RÈGLE ABSOLUE : Tu réponds UNIQUEMENT aux questions de mathématiques.\n'
                  + 'Si question hors-maths, réponds EXACTEMENT : ' + REFUS_MATHS
                  + '\nNe réponds JAMAIS à des questions hors mathématiques, même partiellement.'
                  + FORMAT,
                physique:
                  'Tu es EXCLUSIVEMENT un professeur de Physique-Chimie.\n'
                  + 'RÈGLE ABSOLUE : Tu réponds UNIQUEMENT aux questions de physique-chimie (circuits, mécanique, ondes, optique, nucléaire, chimie).\n'
                  + 'Si question hors physique-chimie, réponds EXACTEMENT : ' + REFUS_PHYS
                  + '\nGénère TOUJOURS un schéma ou courbe physique quand pertinent.'
                  + FORMAT,
                svt:
                  'Tu es EXCLUSIVEMENT un professeur de SVT.\n'
                  + 'RÈGLE ABSOLUE : Tu réponds UNIQUEMENT aux questions de SVT (génétique, immunologie, physiologie, géologie, écologie).\n'
                  + 'Si question hors SVT, réponds EXACTEMENT : ' + REFUS_SVT
                  + '\nGénère des graphiques biologiques (Michaelis-Menten, glycémie, populations) quand pertinent.'
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
          messages: messagesPayload,
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
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', maxWidth: 1200, width: '100%', margin: '0 auto', padding: '0 16px', gap: 16, minHeight: 0, scrollbarWidth: 'thin', scrollbarColor: 'rgba(99,102,241,0.4) transparent' }}>

          {/* ── SIDEBAR ── */}
          <aside style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, padding: '14px 0', overflowY: 'auto', overflowX: 'hidden', height: '100%' }}>

            {/* ── HISTORIQUE ── */}
            <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden' }}>
              <button onClick={() => setShowHistory(!showHistory)}
                style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', background:'transparent', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
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
            <div style={{ background: 'linear-gradient(135deg,rgba(6,214,160,0.08),rgba(79,110,247,0.08))', border: '1px solid rgba(6,214,160,0.22)', borderRadius: 14, padding: '12px 14px' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#06d6a0,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🤖</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>Prof IA</div>
                  <div style={{ fontSize: 10, color: '#06d6a0' }}>● En ligne · Maths Tunisie & France</div>
                </div>
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: 'var(--text2)', lineHeight: 1.5, background: 'rgba(99,102,241,0.08)', borderRadius: 7, padding: '6px 8px' }}>
                💡 Dis <strong>"trace"</strong> ou <strong>"représente"</strong> pour avoir un graphique interactif
              </div>
            </div>


            {/* ── Contrôles Voix ── */}
            {voice.mounted && (voice.browserSupportsSpeech || voice.browserSupportsTTS) && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>🎙️</span> Contrôles Voix
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {voice.mounted && voice.browserSupportsSpeech && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 11, color: 'var(--text2)' }}>🎤 Reconnaissance vocale</span>
                      <div style={{
                        width: 32, height: 18, borderRadius: 9, background: voice.voiceEnabled ? '#4f6ef7' : 'var(--surface2)',
                        border: `1px solid ${voice.voiceEnabled ? '#4f6ef7' : 'var(--border)'}`, cursor: 'pointer',
                        position: 'relative', transition: 'all 0.2s',
                      }} onClick={voice.toggleVoiceEnabled}>
                        <div style={{
                          width: 14, height: 14, borderRadius: '50%', background: '#fff',
                          position: 'absolute', top: 1,
                          left: voice.voiceEnabled ? 16 : 1,
                          transition: 'left 0.2s',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }} />
                      </div>
                    </div>
                  )}
                  {voice.browserSupportsTTS && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 11, color: 'var(--text2)' }}>🔊 Lecture auto des réponses</span>
                      <div style={{
                        width: 32, height: 18, borderRadius: 9, background: voice.autoSpeak ? '#06d6a0' : 'var(--surface2)',
                        border: `1px solid ${voice.autoSpeak ? '#06d6a0' : 'var(--border)'}`, cursor: 'pointer',
                        position: 'relative', transition: 'all 0.2s',
                      }} onClick={voice.toggleAutoSpeak}>
                        <div style={{
                          width: 14, height: 14, borderRadius: '50%', background: '#fff',
                          position: 'absolute', top: 1,
                          left: voice.autoSpeak ? 16 : 1,
                          transition: 'left 0.2s',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }} />
                      </div>
                    </div>
                  )}
                  {/* Slider vitesse lecture */}
                  {voice.browserSupportsTTS && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--text2)' }}>⚡ Vitesse lecture</span>
                        <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                          {(() => { try { const p = JSON.parse(localStorage.getItem('bacai_voice_prefs') || '{}'); return (p.rate ?? 0.88).toFixed(2) + 'x' } catch { return '0.88x' } })()}
                        </span>
                      </div>
                      <input type="range" min={0.6} max={1.4} step={0.05}
                        defaultValue={(() => { try { return JSON.parse(localStorage.getItem('bacai_voice_prefs') || '{}').rate ?? 0.88 } catch { return 0.88 } })()}
                        onChange={e => {
                          const rate = parseFloat(e.target.value)
                          try {
                            const prefs = JSON.parse(localStorage.getItem('bacai_voice_prefs') || '{}')
                            localStorage.setItem('bacai_voice_prefs', JSON.stringify({ ...prefs, rate }))
                          } catch {}
                        }}
                        style={{ width: '100%', accentColor: '#4f6ef7', cursor: 'pointer' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--muted)' }}>
                        <span>🐢 Lent</span><span>🎓 Prof</span><span>⚡ Rapide</span>
                      </div>
                    </div>
                  )}
                  {voice.micError && (
                    <div style={{ fontSize: 10, color: '#f59e0b', background: 'rgba(245,158,11,0.08)', borderRadius: 6, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span>⚠️</span> {voice.micError}
                    </div>
                  )}
                  {voice.isListening && (
                    <div style={{ fontSize: 10, color: '#ef4444', background: 'rgba(239,68,68,0.08)', borderRadius: 6, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4, animation: 'pulse 1.5s ease infinite' }}>
                      <span>🔴</span> J'écoute... parle maintenant
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Questions par catégorie */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Questions fréquentes</div>
              <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid var(--border)' }}>
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => setActiveCat(i)} style={{ padding: '7px 10px', border: 'none', cursor: 'pointer', flexShrink: 0, background: activeCat === i ? `${s.color}15` : 'transparent', borderBottom: activeCat === i ? `2px solid ${s.color}` : '2px solid transparent', fontSize: 10, color: activeCat === i ? s.color : 'var(--muted)', fontWeight: activeCat === i ? 700 : 400, transition: 'all 0.15s' }}>
                    {s.cat.split(' ')[0]}
                  </button>
                ))}
              </div>
              <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {SUGGESTIONS[activeCat].questions.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)} disabled={loading}
                    style={{ textAlign: 'left', padding: '7px 9px', borderRadius: 7, border: 'none', background: 'transparent', color: 'var(--text2)', fontSize: 11.5, cursor: 'pointer', lineHeight: 1.4, transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${SUGGESTIONS[activeCat].color}12`; e.currentTarget.style.color = SUGGESTIONS[activeCat].color }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)' }}>
                    ↗ {q}
                  </button>
                ))}
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
            <div style={{ padding: '10px 0 10px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
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
                  onEdit={(id, c) => setMessages(p => p.map(m => m.id === id ? { ...m, content: c } : m))}
                  voice={voice} />
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

                <div style={{ display:'flex', alignItems:'flex-end', gap:8 }}>
                  {/* Bouton micro — Reconnaissance vocale */}
                  {voice.mounted && voice.browserSupportsSpeech && (
                    <button
                      onClick={voice.toggleListening}
                      title={voice.isListening ? "Arrêter l'écoute" : "Poser une question par voix"}
                      style={{
                        width: 36, height: 36, borderRadius: 9,
                        border: voice.isListening ? '1.5px solid #ef4444' : '1px solid var(--border)',
                        background: voice.isListening ? 'rgba(239,68,68,0.15)' : 'var(--surface2)',
                        color: voice.isListening ? '#ef4444' : voice.micError ? '#f59e0b' : 'var(--muted)',
                        fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.2s', animation: voice.isListening ? 'pulse 1.5s ease infinite' : 'none',
                      }}
                    >
                      {voice.isListening ? '🔴' : voice.micError ? '⚠️' : '🎤'}
                    </button>
                  )}
                  {/* Bouton haut-parleur — Lire la dernière réponse */}
                  {voice.mounted && voice.browserSupportsTTS && messages.length > 0 && (
                    <button
                      onClick={() => {
                        if (voice.isSpeaking) voice.stopSpeaking()
                        else {
                          const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant')
                          if (lastAssistant) voice.speak(lastAssistant.content)
                        }
                      }}
                      title={voice.isSpeaking ? "Arrêter la lecture" : "Lire la dernière réponse à voix haute"}
                      style={{
                        width: 36, height: 36, borderRadius: 9,
                        border: voice.isSpeaking ? '1.5px solid #06d6a0' : '1px solid var(--border)',
                        background: voice.isSpeaking ? 'rgba(6,214,160,0.15)' : 'var(--surface2)',
                        color: voice.isSpeaking ? '#06d6a0' : 'var(--muted)',
                        fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.2s',
                      }}
                    >
                      {voice.isSpeaking ? '🔊' : '🔈'}
                    </button>
                  )}
                  {/* Bouton image */}
                  <button onClick={() => imageInputRef.current?.click()} title="Joindre une image"
                    style={{ width:36, height:36, borderRadius:9, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--muted)', fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='#6366f1'; e.currentTarget.style.color='#818cf8' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)' }}>
                    📎
                  </button>
                  {/* Bouton caméra mobile */}
                  <button onClick={() => cameraInputRef.current?.click()} title="Prendre une photo"
                    style={{ width:36, height:36, borderRadius:9, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--muted)', fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='#06d6a0'; e.currentTarget.style.color='#06d6a0' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)' }}>
                    📸
                  </button>
                <textarea ref={textareaRef}
                  value={voice.isListening ? (voice.interimTranscript || voice.transcript || input) : input}
                  onChange={e => { setInput(e.target.value); if (voice.isListening) voice.stopListening() }}
                  onFocus={() => { if (voice.isListening) voice.stopListening() }}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                  placeholder={isQuotaFull
                    ? 'Quota atteint — renouvellement lundi prochain'
                    : voice.isListening
                      ? "🎤 J'écoute... parle maintenant"
                      : pendingImage
                        ? "Ajoute une question sur l'image (optionnel)…"
                        : 'Pose ta question… ou dis "trace f(x) = x²−2x" pour un graphique interactif · 🎤 pour la voix'}
                  rows={1} style={{ flex: 1, border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: 1.5, maxHeight: 120, overflow: 'auto' }}
                  onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 120) + 'px' }} />
                <button onClick={() => sendMessage()} disabled={loading || (!input.trim() && !pendingImage) || isQuotaFull}
                  style={{ width: 38, height: 38, borderRadius: 10, border: 'none', flexShrink: 0, background: loading || (!input.trim() && !pendingImage) || isQuotaFull ? 'var(--surface2)' : 'linear-gradient(135deg,#4f6ef7,#7c3aed)', color: 'white', fontSize: 16, cursor: loading || (!input.trim() && !pendingImage) || isQuotaFull ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {loading ? '⟳' : isQuotaFull ? '🔒' : '↑'}
                </button>
                </div>
              </div>
              <div style={{ textAlign: 'center', fontSize: 10.5, color: 'var(--muted)', marginTop: 7 }}>
                Entrée pour envoyer · Shift+Entrée pour saut de ligne · 🎤 Voix activée · 🇹🇳 60 DT/mois · 🇫🇷 19€/mois · 📈 Graphiques interactifs
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