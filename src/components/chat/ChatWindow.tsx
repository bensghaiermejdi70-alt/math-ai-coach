'use client'
import { useState, useRef, useEffect } from 'react'

interface Message { id: string; role: 'user' | 'ai'; content: string; time: string }

const WELCOME: Message = {
  id: '0', role: 'ai',
  content: `Bonjour ! Je suis ton professeur de mathématiques IA 👋\n\nJe suis spécialisé dans le programme officiel tunisien — Bac 4ème Maths et Licence FST.\n\nTu peux me poser des questions comme :\n• "Explique-moi les intégrales"\n• "Résoudre : x² - 5x + 6 = 0"\n• "Comment calculer la dérivée de e^(2x) ?"\n\nComment puis-je t'aider ?`,
  time: new Date().toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' }),
}

const QUICK = ['Explique les limites', 'Résoudre x² - 4 = 0', 'C\'est quoi une intégrale ?', 'Dérivée de ln(x)', 'Aide Bac 2024']

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, time: new Date().toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Call backend
    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages.slice(-6) }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: data.response || 'Désolé, je n\'ai pas pu traiter ta demande.', time: new Date().toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' }) }])
    } catch {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: '⚠️ Connexion au serveur impossible. Vérifie que le backend est lancé sur le port 8000.', time: new Date().toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' }) }])
    }
    setLoading(false)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', minHeight:500 }}>
      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'24px 0', display:'flex', flexDirection:'column', gap:16 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display:'flex', flexDirection:'column', alignItems: msg.role==='user'?'flex-end':'flex-start', animation:'fadeInUp 0.3s ease both' }}>
            {msg.role === 'ai' && (
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <div style={{ width:28, height:28, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>∑</div>
                <span style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)' }}>Prof IA · {msg.time}</span>
              </div>
            )}
            <div className={`bubble bubble-${msg.role}`} style={{ whiteSpace:'pre-wrap', maxWidth:'85%' }}>{msg.content}</div>
            {msg.role === 'user' && <span style={{ fontSize:11, color:'var(--muted)', marginTop:4, fontFamily:'var(--font-mono)' }}>{msg.time}</span>}
          </div>
        ))}
        {loading && (
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>∑</div>
            <div className="bubble bubble-ai" style={{ display:'flex', gap:6, alignItems:'center' }}>
              {[0,1,2].map(i => <div key={i} style={{ width:7, height:7, background:'var(--accent)', borderRadius:'50%', animation:'pulse 1.2s ease infinite', animationDelay:`${i*0.2}s` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick suggestions */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14 }}>
        {QUICK.map(q => (
          <button key={q} onClick={() => send(q)} style={{ padding:'6px 12px', borderRadius:100, background:'rgba(79,110,247,0.1)', border:'1px solid rgba(79,110,247,0.2)', color:'var(--accent)', fontSize:12, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all 0.2s' }}>{q}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ display:'flex', gap:10 }}>
        <input
          className="input input-mono" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
          placeholder="Pose ta question ou écris un exercice..."
          style={{ flex:1 }}
        />
        <button className="btn btn-primary" onClick={() => send(input)} disabled={!input.trim() || loading}
          style={{ opacity: !input.trim() || loading ? 0.5 : 1 }}>
          Envoyer →
        </button>
      </div>
    </div>
  )
}
