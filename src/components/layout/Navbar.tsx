'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'

// ── Dropdown Bac Blanc ───────────────────────────────────────────────
function BacBlancBtn({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const today = new Date()
  const isMay = today.getMonth() === 4 || today.getMonth() === 5
  const day = today.getDate()
  const isActive = pathname.startsWith('/bac-blanc')

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display:'inline-flex', alignItems:'center', gap:6,
        padding:'6px 14px', borderRadius:50,
        background: isActive
          ? 'linear-gradient(135deg,#f59e0b,#fbbf24)'
          : isMay
            ? 'linear-gradient(135deg,rgba(245,158,11,0.25),rgba(251,191,36,0.15))'
            : 'rgba(245,158,11,0.1)',
        border:`1px solid ${isActive ? '#f59e0b' : 'rgba(245,158,11,0.5)'}`,
        color: isActive ? '#0a0a1a' : '#fbbf24',
        fontSize:13, fontWeight:700, cursor:'pointer',
        letterSpacing:'0.02em', fontFamily:'var(--font-body)',
        boxShadow: isMay ? '0 0 16px rgba(245,158,11,0.3)' : 'none',
        transition:'all 0.2s',
        animation: isMay && !isActive ? 'pulse-bb 2.5s ease-in-out infinite' : 'none',
      }}>
        <span style={{fontSize:14}}>🏆</span>
        <span>Bac Blanc</span>
        {isMay && !isActive && (
          <span style={{background:'#f59e0b',color:'#0a0a1a',fontSize:9,fontWeight:900,padding:'1px 5px',borderRadius:50,letterSpacing:'0.05em'}}>LIVE</span>
        )}
        <span style={{fontSize:9,marginLeft:2,transform:open?'rotate(180deg)':'none',display:'inline-block',transition:'0.2s'}}>▼</span>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{position:'fixed',inset:0,zIndex:150}}/>
          <div style={{
            position:'absolute', top:'calc(100% + 10px)', right:0,
            minWidth:240, background:'var(--surface)',
            border:'1px solid var(--border)', borderRadius:16,
            boxShadow:'0 20px 60px rgba(0,0,0,0.4)',
            zIndex:200, overflow:'hidden',
            animation:'fadeInDown 0.18s ease both',
          }}>
            <div style={{padding:'10px 14px',borderBottom:'1px solid var(--border)',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>
              🏆 Choisir le Bac Blanc
            </div>
            <Link href="/bac-blanc" onClick={() => setOpen(false)} style={{textDecoration:'none'}}>
              <div style={{padding:'13px 16px',display:'flex',gap:12,alignItems:'center',transition:'background 0.15s',cursor:'pointer',
                background:pathname==='/bac-blanc'?'rgba(245,158,11,0.08)':'transparent'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e=>e.currentTarget.style.background=pathname==='/bac-blanc'?'rgba(245,158,11,0.08)':'transparent'}>
                <div style={{width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,rgba(220,38,38,0.2),rgba(234,88,12,0.15))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🇹🇳</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'var(--text)',marginBottom:2}}>Bac Blanc Tunisie</div>
                  <div style={{fontSize:11,color:'var(--muted)'}}>Maths · Sc.Ex · Info · Technique · Éco</div>
                  <div style={{fontSize:10,color:'#f59e0b',fontWeight:600,marginTop:1}}>Programme CNP · Concours national</div>
                </div>
              </div>
            </Link>
            <div style={{height:1,background:'var(--border)',margin:'0 12px'}}/>
            <Link href="/bac-blanc-france" onClick={() => setOpen(false)} style={{textDecoration:'none'}}>
              <div style={{padding:'13px 16px',display:'flex',gap:12,alignItems:'center',transition:'background 0.15s',cursor:'pointer',
                background:pathname.startsWith('/bac-blanc-france')?'rgba(59,130,246,0.08)':'transparent'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e=>e.currentTarget.style.background=pathname.startsWith('/bac-blanc-france')?'rgba(59,130,246,0.08)':'transparent'}>
                <div style={{width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(99,102,241,0.15))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🇫🇷</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'var(--text)',marginBottom:2}}>Bac Blanc France</div>
                  <div style={{fontSize:11,color:'var(--muted)'}}>Terminale Générale · Première · STMG</div>
                  <div style={{fontSize:10,color:'#4f6ef7',fontWeight:600,marginTop:1}}>Programme officiel · Éducation nationale</div>
                </div>
              </div>
            </Link>
            <div style={{padding:'7px 14px',borderTop:'1px solid var(--border)',background:'rgba(245,158,11,0.04)'}}>
              <div style={{fontSize:10,color:'var(--muted)',textAlign:'center'}}>🎯 Examen complet · Correction IA · Classement</div>
            </div>
          </div>
        </>
      )}
      <style>{`@keyframes pulse-bb{0%,100%{box-shadow:0 0 8px rgba(245,158,11,0.3);}50%{box-shadow:0 0 20px rgba(245,158,11,0.6),0 0 40px rgba(245,158,11,0.2);}}`}</style>
    </div>
  )
}

// ── Dropdown Simulation IA ───────────────────────────────────────
function SimulationDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isActive = pathname.startsWith('/simulation')

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display:'inline-flex', alignItems:'center', gap:5,
        padding:'6px 14px', borderRadius:50, cursor:'pointer',
        background: isActive ? 'linear-gradient(135deg,var(--accent),var(--accent2))' : 'rgba(255,255,255,0.04)',
        border:'1px solid ' + (isActive ? 'transparent' : 'var(--border)'),
        color: isActive ? '#fff' : 'var(--text2)',
        fontSize:14, fontWeight:600, fontFamily:'var(--font-body)', transition:'all 0.2s', whiteSpace:'nowrap',
      }}
      >
        Simulation IA
        <span style={{ fontSize:9, transition:'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', display:'inline-block', marginLeft:1 }}>▼</span>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, zIndex:150 }} />
          <div style={{
            position:'absolute', top:'calc(100% + 12px)', left:'50%', transform:'translateX(-50%)',
            minWidth:260, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16,
            boxShadow:'0 20px 60px rgba(0,0,0,0.4)', zIndex:200, overflow:'hidden',
            animation:'fadeInDown 0.18s ease both',
          }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
              🧠 Choisir le programme
            </div>

            <Link href="/simulation" onClick={() => setOpen(false)} style={{ textDecoration:'none' }}>
              <div style={{
                padding:'14px 18px', display:'flex', gap:14, alignItems:'center',
                transition:'background 0.15s', cursor:'pointer',
                background: pathname === '/simulation' ? 'rgba(99,102,241,0.08)' : 'transparent',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = pathname === '/simulation' ? 'rgba(99,102,241,0.08)' : 'transparent'}
              >
                <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,rgba(220,38,38,0.2),rgba(234,88,12,0.15))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🇹🇳</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:3 }}>Simulation Tunisie</div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>Bac Maths · Sc.Ex · Info · Éco · Technique</div>
                  <div style={{ fontSize:10, color:'#6366f1', fontWeight:600, marginTop:2 }}>Archives bacweb.tn · Par chapitre</div>
                </div>
              </div>
            </Link>

            <div style={{ height:1, background:'var(--border)', margin:'0 14px' }} />

            <Link href="/simulation-france" onClick={() => setOpen(false)} style={{ textDecoration:'none' }}>
              <div style={{
                padding:'14px 18px', display:'flex', gap:14, alignItems:'center',
                transition:'background 0.15s', cursor:'pointer',
                background: pathname.startsWith('/simulation-france') ? 'rgba(245,158,11,0.08)' : 'transparent',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = pathname.startsWith('/simulation-france') ? 'rgba(245,158,11,0.08)' : 'transparent'}
              >
                <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(99,102,241,0.15))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🇫🇷</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:3 }}>Simulation France</div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>Terminale Générale · Première · STMG · Expertes</div>
                  <div style={{ fontSize:10, color:'#f59e0b', fontWeight:600, marginTop:2 }}>Archives APMEP · Par chapitre</div>
                </div>
              </div>
            </Link>

            <div style={{ padding:'8px 16px', borderTop:'1px solid var(--border)', background:'rgba(99,102,241,0.04)' }}>
              <div style={{ fontSize:10, color:'var(--muted)', textAlign:'center' }}>🧠 Correction IA · 📊 Analyse des faiblesses</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ── Dropdown Examens ─────────────────────────────────────────────────
function ExamensDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isActive = pathname.startsWith('/examens') || pathname.startsWith('/examens-france')

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display:'inline-flex', alignItems:'center', gap:5,
          padding:'6px 14px', borderRadius:50, cursor:'pointer',
          background: isActive ? 'linear-gradient(135deg,var(--accent),var(--accent2))' : 'rgba(255,255,255,0.04)',
          border:'1px solid ' + (isActive ? 'transparent' : 'var(--border)'),
          color: isActive ? '#fff' : 'var(--text2)',
          fontSize:14, fontWeight:600, fontFamily:'var(--font-body)', transition:'all 0.2s', whiteSpace:'nowrap',
        }}
      >
        Examens
        <span style={{
          fontSize:9, transition:'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display:'inline-block', marginLeft:1,
        }}>▼</span>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, zIndex:150 }} />
          <div style={{
            position:'absolute', top:'calc(100% + 12px)', left:'50%',
            transform:'translateX(-50%)',
            minWidth:240, background:'var(--surface)',
            border:'1px solid var(--border)', borderRadius:16,
            boxShadow:'0 20px 60px rgba(0,0,0,0.4)',
            zIndex:200, overflow:'hidden',
            animation:'fadeInDown 0.18s ease both',
          }}>
            {/* Header */}
            <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
              📋 Choisir les annales
            </div>

            {/* Option Tunisie */}
            <Link href="/examens" onClick={() => setOpen(false)} style={{ textDecoration:'none' }}>
              <div style={{
                padding:'14px 18px', display:'flex', gap:14, alignItems:'center',
                transition:'background 0.15s', cursor:'pointer',
                background: pathname.startsWith('/examens') && !pathname.startsWith('/examens-france')
                  ? 'rgba(79,110,247,0.08)' : 'transparent',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = pathname.startsWith('/examens') && !pathname.startsWith('/examens-france') ? 'rgba(79,110,247,0.08)' : 'transparent'}
              >
                <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,rgba(220,38,38,0.2),rgba(234,88,12,0.15))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🇹🇳</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:3 }}>Examens Tunisie</div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>Bac Maths · Sc.Ex · Info · Technique</div>
                  <div style={{ fontSize:10, color:'#4f6ef7', fontWeight:600, marginTop:2 }}>2015 → 2025 · bacweb.tn</div>
                </div>
              </div>
            </Link>

            <div style={{ height:1, background:'var(--border)', margin:'0 14px' }} />

            {/* Option France */}
            <Link href="/examens-france" onClick={() => setOpen(false)} style={{ textDecoration:'none' }}>
              <div style={{
                padding:'14px 18px', display:'flex', gap:14, alignItems:'center',
                transition:'background 0.15s', cursor:'pointer',
                background: pathname.startsWith('/examens-france') ? 'rgba(245,158,11,0.08)' : 'transparent',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = pathname.startsWith('/examens-france') ? 'rgba(245,158,11,0.08)' : 'transparent'}
              >
                <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(99,102,241,0.15))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🇫🇷</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:3 }}>Examens France</div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>Bac Terminale · STMG · STI2D/STL</div>
                  <div style={{ fontSize:10, color:'#f59e0b', fontWeight:600, marginTop:2 }}>2021 → 2025 · apmep.fr · annales2maths</div>
                </div>
              </div>
            </Link>

            {/* Footer badge */}
            <div style={{ padding:'8px 16px', borderTop:'1px solid var(--border)', background:'rgba(79,110,247,0.04)' }}>
              <div style={{ fontSize:10, color:'var(--muted)', textAlign:'center' }}>
                📄 Sujets officiels + ✅ Corrigés PDF gratuits
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ── Nav links (sans Examens, géré séparément) ─────────────────────
const navLinks = [
  { href:'/bac',        label:'Tunisie' },
  { href:'/bac-france', label:'France' },
  // Examens → dropdown géré séparément
  { href:'/solve',      label:'Solveur' },
  { href:'/chat',       label:'Chat IA' },
  // Simulation → dropdown géré séparément
  // Plans → dropdown géré séparément
]

// ── Simulation mobile ────────────────────────────────────────────
function SimulationMobile({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const isActive = pathname.startsWith('/simulation')
  return (
    <div>
      <button onClick={() => setOpen(o => !o)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'12px 16px', borderRadius:10, background:isActive?'rgba(99,102,241,0.08)':'transparent', border:'none', color:isActive?'var(--accent)':'var(--text)', fontSize:15, fontWeight:500, cursor:'pointer', fontFamily:'var(--font-body)' }}>
        <span>🧠 Simulation IA</span>
        <span style={{ fontSize:11, transform:open?'rotate(180deg)':'none', display:'inline-block', transition:'transform 0.2s' }}>▼</span>
      </button>
      {open && (
        <div style={{ paddingLeft:12, display:'flex', flexDirection:'column', gap:4, marginTop:4 }}>
          <Link href="/simulation" onClick={() => { onClose(); setOpen(false) }} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 16px', borderRadius:10, background:pathname==='/simulation'?'rgba(99,102,241,0.08)':'rgba(255,255,255,0.03)', color:'var(--text2)', textDecoration:'none', fontSize:14 }}>
            <span>🇹🇳</span>
            <div><div style={{ fontWeight:600 }}>Simulation Tunisie</div><div style={{ fontSize:11, color:'var(--muted)' }}>Bac · Archives · Par chapitre</div></div>
          </Link>
          <Link href="/simulation-france" onClick={() => { onClose(); setOpen(false) }} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 16px', borderRadius:10, background:pathname.startsWith('/simulation-france')?'rgba(245,158,11,0.08)':'rgba(255,255,255,0.03)', color:'var(--text2)', textDecoration:'none', fontSize:14 }}>
            <span>🇫🇷</span>
            <div><div style={{ fontWeight:600 }}>Simulation France</div><div style={{ fontSize:11, color:'var(--muted)' }}>Terminale · Première · STMG</div></div>
          </Link>
        </div>
      )}
    </div>
  )
}

// ── Dropdown Plans & Tarifs ──────────────────────────────────────
function AbonnementDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isActive = pathname.startsWith('/abonnement')

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display:'inline-flex', alignItems:'center', gap:5,
        color:'var(--gold)', background:'rgba(245,200,66,0.08)',
        border:'1px solid rgba(245,200,66,0.35)', padding:'5px 12px',
        borderRadius:50, cursor:'pointer', fontSize:13, fontWeight:700,
        fontFamily:'var(--font-body)', transition:'all 0.2s',
      }}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(245,200,66,0.16)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(245,200,66,0.08)'}
      >
        💳 Plans & Tarifs
        <span style={{ fontSize:9, transform:open?'rotate(180deg)':'none', display:'inline-block', transition:'0.2s', marginLeft:2 }}>▼</span>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, zIndex:150 }} />
          <div style={{
            position:'absolute', top:'calc(100% + 10px)', right:0,
            minWidth:250, background:'var(--surface)', border:'1px solid var(--border)',
            borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.4)',
            zIndex:200, overflow:'hidden', animation:'fadeInDown 0.18s ease both',
          }}>
            <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
              💳 Choisir le programme
            </div>

            <Link href="/abonnement" onClick={() => setOpen(false)} style={{ textDecoration:'none' }}>
              <div style={{
                padding:'13px 16px', display:'flex', gap:12, alignItems:'center',
                transition:'background 0.15s', cursor:'pointer',
                background: pathname==='/abonnement' ? 'rgba(245,200,66,0.08)' : 'transparent',
              }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e=>e.currentTarget.style.background=pathname==='/abonnement'?'rgba(245,200,66,0.08)':'transparent'}
              >
                <div style={{ width:34, height:34, borderRadius:9, background:'linear-gradient(135deg,rgba(220,38,38,0.2),rgba(234,88,12,0.15))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>🇹🇳</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:2 }}>Abonnement Tunisie</div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>60 DT · 90 DT · 600 DT/an</div>
                  <div style={{ fontSize:10, color:'var(--gold)', fontWeight:600, marginTop:1 }}>Paiement D17 · versement espece . virement </div>
                </div>
              </div>
            </Link>

            <div style={{ height:1, background:'var(--border)', margin:'0 12px' }} />

            <Link href="/abonnement-france" onClick={() => setOpen(false)} style={{ textDecoration:'none' }}>
              <div style={{
                padding:'13px 16px', display:'flex', gap:12, alignItems:'center',
                transition:'background 0.15s', cursor:'pointer',
                background: pathname.startsWith('/abonnement-france') ? 'rgba(79,110,247,0.08)' : 'transparent',
              }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e=>e.currentTarget.style.background=pathname.startsWith('/abonnement-france')?'rgba(79,110,247,0.08)':'transparent'}
              >
                <div style={{ width:34, height:34, borderRadius:9, background:'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(99,102,241,0.15))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>🇫🇷</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:2 }}>Abonnement France</div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>19€ · 29€ · 199€/an</div>
                  <div style={{ fontSize:10, color:'#60a5fa', fontWeight:600, marginTop:1 }}>Paiement sécurisé Stripe · Carte bancaire</div>
                </div>
              </div>
            </Link>

            <div style={{ padding:'7px 14px', borderTop:'1px solid var(--border)', background:'rgba(245,200,66,0.04)' }}>
              <div style={{ fontSize:10, color:'var(--muted)', textAlign:'center' }}>🎓 Coach IA · Bac Tunisie & France</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ─── CONFIG CONTACT & LIENS (valeurs reprises de la page d'accueil) ───
const WHATSAPP     = '21699268970'
const CONTACT_MAIL = 'bensghaiermejdi70@gmail.com'
const YOUTUBE_URL  = 'https://www.youtube.com/@mathbacai'
const DEMO_URL     = 'https://www.youtube.com/watch?v=_6atlDlzhwI'  // démo complète 25 min

// ─── Dropdown Contact (WhatsApp + Email) ───
function ContactDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function h(e: MouseEvent){ if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:50,
        background:'rgba(6,214,160,0.1)', border:'1px solid rgba(6,214,160,0.35)',
        color:'var(--teal)', fontSize:13, fontWeight:600, cursor:'pointer',
        fontFamily:'var(--font-body)', transition:'all 0.2s', whiteSpace:'nowrap',
      }}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(6,214,160,0.18)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(6,214,160,0.1)'}>
        ✉️ Contact
        <span style={{ fontSize:9, transform:open?'rotate(180deg)':'none', display:'inline-block', transition:'0.2s' }}>▼</span>
      </button>
      {open && (
        <>
          <div onClick={()=>setOpen(false)} style={{ position:'fixed', inset:0, zIndex:150 }} />
          <div style={{ position:'absolute', top:'calc(100% + 10px)', right:0, minWidth:240,
            background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14,
            boxShadow:'0 20px 60px rgba(0,0,0,0.4)', zIndex:200, overflow:'hidden',
            animation:'fadeInDown 0.18s ease both' }}>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none', display:'block' }}>
              <div style={{ padding:'12px 16px', display:'flex', gap:12, alignItems:'center', cursor:'pointer', transition:'background 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <div style={{ width:34, height:34, borderRadius:9, background:'rgba(37,211,102,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>💬</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>WhatsApp</div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>+216 99 268 970 · réponse rapide</div>
                </div>
              </div>
            </a>
            <div style={{ height:1, background:'var(--border)', margin:'0 12px' }} />
            <a href={`mailto:${CONTACT_MAIL}`} style={{ textDecoration:'none', display:'block' }}>
              <div style={{ padding:'12px 16px', display:'flex', gap:12, alignItems:'center', cursor:'pointer', transition:'background 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <div style={{ width:34, height:34, borderRadius:9, background:'rgba(79,110,247,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>✉️</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>Email</div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>{CONTACT_MAIL}</div>
                </div>
              </div>
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [open, setOpen]               = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [examMobileOpen, setExamMobileOpen] = useState(false)
  const [simMobileOpen,  setSimMobileOpen]  = useState(false)
  const pathname = usePathname()

  const auth = useAuth()
  const user                  = auth?.user
  const profile               = auth?.profile
  const hasActiveSubscription = auth?.hasActiveSubscription
  const daysRemaining         = auth?.daysRemaining
  const isAdmin               = auth?.isAdmin
  const signOut               = auth?.signOut

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isExamActive = pathname.startsWith('/examens') || pathname.startsWith('/examens-france')

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        display:'flex', flexDirection:'column', gap:10,
        padding:'12px clamp(20px,5vw,60px)',
        background: scrolled ? 'rgba(7,8,15,0.95)' : 'rgba(7,8,15,0.7)',
        backdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(79,110,247,0.15)',
        transition:'background 0.3s',
      }}>

        {/* ═══ LIGNE 1 : logo · utilitaires · auth ═══ */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', gap:16 }}>

          {/* Logo */}
          <Link href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none',fontFamily:'var(--font-display)',fontWeight:800,fontSize:20,color:'var(--text)'}}>
            <div style={{width:36,height:36,background:'linear-gradient(135deg,#4f6ef7,#7c3aed)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>∑</div>
            Math<span style={{color:'var(--accent)'}}>Bac</span>.AI
          </Link>

          {/* Utilitaires + Auth (desktop) */}
          <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',justifyContent:'flex-end'}} className="nav-desktop">

            {/* Comment ça marche */}
            {DEMO_URL.startsWith('http')
              ? <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 13px',borderRadius:50,background:'linear-gradient(135deg,rgba(79,110,247,0.18),rgba(124,58,237,0.12))',border:'1px solid rgba(79,110,247,0.4)',color:'var(--accent)',fontSize:13,fontWeight:600,textDecoration:'none',fontFamily:'var(--font-body)',whiteSpace:'nowrap'}}>▶ Comment ça marche</a>
              : <Link href={DEMO_URL} style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 13px',borderRadius:50,background:'linear-gradient(135deg,rgba(79,110,247,0.18),rgba(124,58,237,0.12))',border:'1px solid rgba(79,110,247,0.4)',color:'var(--accent)',fontSize:13,fontWeight:600,textDecoration:'none',fontFamily:'var(--font-body)',whiteSpace:'nowrap'}}>▶ Comment ça marche</Link>}

            {/* YouTube */}
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:50,background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.35)',color:'#f87171',fontSize:13,fontWeight:600,textDecoration:'none',fontFamily:'var(--font-body)',whiteSpace:'nowrap'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,0.18)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(239,68,68,0.1)'}>▶ YouTube</a>

            {/* Contact */}
            <ContactDropdown />

            <div style={{width:1,height:22,background:'var(--border)',margin:'0 2px'}} />

            {hasActiveSubscription && daysRemaining !== null && daysRemaining !== undefined && daysRemaining <= 7 && (
              <Link href="/abonnement" style={{fontSize:11,color:'var(--orange)',background:'rgba(249,115,22,0.1)',border:'1px solid rgba(249,115,22,0.3)',borderRadius:20,padding:'4px 10px',textDecoration:'none',fontFamily:'var(--font-mono)'}}>
                ⏰ {daysRemaining}j
              </Link>
            )}

            {user ? (
            <div style={{position:'relative'}}>
              <button onClick={() => setProfileOpen(!profileOpen)} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 12px 5px 5px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(79,110,247,0.2)',borderRadius:24,cursor:'pointer',transition:'border-color 0.2s'}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(79,110,247,0.4)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(79,110,247,0.2)')}>
                <div style={{width:28,height:28,background:'linear-gradient(135deg,#4f6ef7,#7c3aed)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'white'}}>
                  {(profile?.full_name || user.email || 'U')[0].toUpperCase()}
                </div>
                <span style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>
                  {profile?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                </span>
                {hasActiveSubscription && (
                  <span style={{width:7,height:7,background:'var(--teal)',borderRadius:'50%',animation:'pulse 2s ease infinite',display:'inline-block'}} />
                )}
              </button>
              {profileOpen && (
                <>
                  <div onClick={() => setProfileOpen(false)} style={{position:'fixed',inset:0,zIndex:150}} />
                  <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,minWidth:200,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,boxShadow:'var(--shadow)',overflow:'hidden',zIndex:200,animation:'fadeInDown 0.2s ease both'}}>
                    <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
                      <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{profile?.full_name || user.email?.split('@')[0]}</div>
                      <div style={{fontSize:10,color:hasActiveSubscription?'var(--teal)':'var(--muted)',fontFamily:'var(--font-mono)',marginTop:3}}>
                        {hasActiveSubscription
  ? `✅ Abonné · ${daysRemaining ?? 0}j restants`
  : '🔓 Compte gratuit'}
                      </div>
                    </div>
                    {[
                      {href:'/profile',    label:'Mon profil',  icon:'👤'},
                      ...(isAdmin ? [{href:'/admin/payments',label:'Admin Panel',icon:'⚙️'}] : []),
                    ].map(item=>(
                      <Link key={item.href} href={item.href} onClick={()=>setProfileOpen(false)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',fontSize:13,color:'var(--text2)',textDecoration:'none',transition:'background 0.15s'}}
                        onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.05)')}
                        onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                        {item.icon} {item.label}
                      </Link>
                    ))}
                    {/* Abonnements — 2 options TN + FR */}
                    <div style={{borderTop:'1px solid var(--border)', padding:'6px 0'}}>
                      <div style={{fontSize:10,color:'var(--muted)',padding:'4px 16px',textTransform:'uppercase',letterSpacing:'0.06em'}}>💳 Abonnements</div>
                      <Link href="/abonnement" onClick={()=>setProfileOpen(false)} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 16px',fontSize:13,color:'var(--text2)',textDecoration:'none',transition:'background 0.15s'}}
                        onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.05)')}
                        onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                        🇹🇳 Plan Tunisie
                      </Link>
                      <Link href="/abonnement-france" onClick={()=>setProfileOpen(false)} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 16px',fontSize:13,color:'var(--text2)',textDecoration:'none',transition:'background 0.15s'}}
                        onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.05)')}
                        onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                        🇫🇷 Plan France
                      </Link>
                    </div>
                    <button onClick={async()=>{setProfileOpen(false);await signOut?.()}} style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'10px 16px',fontSize:13,color:'var(--red)',background:'transparent',border:'none',borderTop:'1px solid var(--border)',cursor:'pointer',transition:'background 0.15s'}}
                      onMouseEnter={e=>(e.currentTarget.style.background='rgba(239,68,68,0.08)')}
                      onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                      🚪 Déconnexion
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
              <>
                <Link href="/login"    className="btn btn-ghost btn-sm">Connexion</Link>
                <Link href="/register" className="btn btn-primary btn-sm">Inscription</Link>
              </>
            )}
          </div>

          {/* Hamburger mobile */}
          <button onClick={() => setOpen(!open)} className="nav-mobile"
            style={{background:'none',border:'none',cursor:'pointer',padding:8,display:'none'}} aria-label="Menu">
            <div style={{width:22,height:2,background:'var(--text)',marginBottom:5,transition:'all 0.3s',transform:open?'rotate(45deg) translate(5px,5px)':'none'}} />
            <div style={{width:22,height:2,background:'var(--text)',marginBottom:5,opacity:open?0:1}} />
            <div style={{width:22,height:2,background:'var(--text)',transform:open?'rotate(-45deg) translate(5px,-5px)':'none',transition:'all 0.3s'}} />
          </button>

        </div>

        {/* ═══ LIGNE 2 : navigation principale (desktop) ═══ */}
        <div style={{display:'flex',gap:10,alignItems:'center',justifyContent:'flex-start',flexWrap:'wrap'}} className="nav-desktop">
          {navLinks.map(l => {
            const isActive = pathname.startsWith(l.href) && l.href !== '/'
            return (
              <Link key={l.href} href={l.href} style={{display:'inline-flex',alignItems:'center',padding:'6px 14px',borderRadius:50,fontSize:14,fontWeight:600,textDecoration:'none',whiteSpace:'nowrap',transition:'all 0.2s',color:isActive?'#fff':'var(--text2)',background:isActive?'linear-gradient(135deg,var(--accent),var(--accent2))':'rgba(255,255,255,0.04)',border:'1px solid '+(isActive?'transparent':'var(--border)')}}>
                {l.label}
              </Link>
            )
          })}
          <SimulationDropdown pathname={pathname} />
          <ExamensDropdown pathname={pathname} />
          <BacBlancBtn pathname={pathname} />
          <AbonnementDropdown pathname={pathname} />
        </div>

        <style>{`
          @media(max-width:900px){.nav-desktop{display:none!important;}.nav-mobile{display:block!important;}}
          @keyframes fadeInDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        `}</style>
      </nav>

      {/* ── Menu mobile ── */}
      {open && (
        <div style={{position:'fixed',top:73,left:0,right:0,zIndex:99,background:'rgba(7,8,15,0.98)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(79,110,247,0.15)',padding:20,display:'flex',flexDirection:'column',gap:4,animation:'fadeInDown 0.2s ease both'}}>
          {navLinks.map(l => {
            const isActive = pathname.startsWith(l.href) && l.href !== '/'
            return (
              <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} style={{display:'block',padding:'12px 16px',borderRadius:10,color:isActive?'var(--accent)':'var(--text)',textDecoration:'none',fontSize:15,fontWeight:500,background:isActive?'rgba(79,110,247,0.08)':'transparent'}}>
                {l.label}
              </Link>
            )
          })}
          {/* Plans & Tarifs mobile */}
          <Link href="/abonnement" onClick={()=>setOpen(false)} style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:10,background:'rgba(245,200,66,0.08)',border:'1px solid rgba(245,200,66,0.25)',color:'var(--gold)',textDecoration:'none',fontSize:14,fontWeight:700}}>
            <span>🇹🇳</span> Plans Tunisie (DT)
          </Link>
          <Link href="/abonnement-france" onClick={()=>setOpen(false)} style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:10,background:'rgba(59,130,246,0.08)',border:'1px solid rgba(59,130,246,0.25)',color:'#60a5fa',textDecoration:'none',fontSize:14,fontWeight:700}}>
            <span>🇫🇷</span> Plans France (€)
          </Link>

          {/* Utilitaires mobile */}
          {DEMO_URL.startsWith('http')
            ? <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:10,background:'rgba(79,110,247,0.08)',border:'1px solid rgba(79,110,247,0.25)',color:'var(--accent)',textDecoration:'none',fontSize:14,fontWeight:700}}><span>▶</span> Comment ça marche</a>
            : <Link href={DEMO_URL} onClick={()=>setOpen(false)} style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:10,background:'rgba(79,110,247,0.08)',border:'1px solid rgba(79,110,247,0.25)',color:'var(--accent)',textDecoration:'none',fontSize:14,fontWeight:700}}><span>▶</span> Comment ça marche</Link>}
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:10,background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.25)',color:'#f87171',textDecoration:'none',fontSize:14,fontWeight:700}}><span>▶</span> YouTube</a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:10,background:'rgba(6,214,160,0.08)',border:'1px solid rgba(6,214,160,0.25)',color:'var(--teal)',textDecoration:'none',fontSize:14,fontWeight:700}}><span>💬</span> WhatsApp</a>
          <a href={`mailto:${CONTACT_MAIL}`} style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.03)',border:'1px solid var(--border2)',color:'var(--text2)',textDecoration:'none',fontSize:14,fontWeight:700}}><span>✉️</span> Email</a>


          {/* Simulation IA mobile */}
          <SimulationMobile pathname={pathname} onClose={() => setOpen(false)} />

          {/* Examens mobile — section dépliable */}
          <div>
            <button onClick={()=>setExamMobileOpen(o=>!o)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',padding:'12px 16px',borderRadius:10,background:isExamActive?'rgba(79,110,247,0.08)':'transparent',border:'none',color:isExamActive?'var(--accent)':'var(--text)',textDecoration:'none',fontSize:15,fontWeight:500,cursor:'pointer',fontFamily:'var(--font-body)'}}>
              <span>📋 Examens</span>
              <span style={{fontSize:11,transform:examMobileOpen?'rotate(180deg)':'none',display:'inline-block',transition:'transform 0.2s'}}>▼</span>
            </button>
            {examMobileOpen && (
              <div style={{paddingLeft:12,display:'flex',flexDirection:'column',gap:4,marginTop:4}}>
                <Link href="/examens" onClick={()=>{setOpen(false);setExamMobileOpen(false)}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',borderRadius:10,background:pathname.startsWith('/examens')&&!pathname.startsWith('/examens-france')?'rgba(79,110,247,0.08)':'rgba(255,255,255,0.03)',color:'var(--text2)',textDecoration:'none',fontSize:14}}>
                  <span>🇹🇳</span>
                  <div><div style={{fontWeight:600}}>Examens Tunisie</div><div style={{fontSize:11,color:'var(--muted)'}}>Bac Maths · Sc.Ex · Info</div></div>
                </Link>
                <Link href="/examens-france" onClick={()=>{setOpen(false);setExamMobileOpen(false)}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',borderRadius:10,background:pathname.startsWith('/examens-france')?'rgba(245,158,11,0.08)':'rgba(255,255,255,0.03)',color:'var(--text2)',textDecoration:'none',fontSize:14}}>
                  <span>🇫🇷</span>
                  <div><div style={{fontWeight:600}}>Examens France</div><div style={{fontSize:11,color:'var(--muted)'}}>Bac Terminale · STMG · STI2D</div></div>
                </Link>
              </div>
            )}
          </div>

          {/* Bac Blanc mobile */}
          <Link href="/bac-blanc" onClick={()=>setOpen(false)} style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:10,background:pathname==='/bac-blanc'?'rgba(245,158,11,0.15)':'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.3)',color:'#fbbf24',textDecoration:'none',fontSize:14,fontWeight:700}}>
            <span>🇹🇳</span> Bac Blanc Tunisie
          </Link>
          <Link href="/bac-blanc-france" onClick={()=>setOpen(false)} style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderRadius:10,background:pathname.startsWith('/bac-blanc-france')?'rgba(59,130,246,0.15)':'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.3)',color:'#93c5fd',textDecoration:'none',fontSize:14,fontWeight:700}}>
            <span>🇫🇷</span> Bac Blanc France
          </Link>

          <div style={{height:1,background:'rgba(255,255,255,0.06)',margin:'8px 0'}} />

          {/* Auth mobile */}
          {user ? (
            <>
              <div style={{padding:'10px 16px',fontSize:13,color:'var(--text2)'}}>
                👤 {profile?.full_name || user.email?.split('@')[0]}
                {hasActiveSubscription && <span style={{marginLeft:8,fontSize:10,color:'var(--teal)',fontFamily:'var(--font-mono)'}}>✅ Abonné</span>}
              </div>
              <Link href="/profile"    onClick={()=>setOpen(false)} style={{display:'block',padding:'12px 16px',borderRadius:10,color:'var(--text2)',textDecoration:'none',fontSize:15}}>👤 Mon profil</Link>
              <Link href="/abonnement" onClick={()=>setOpen(false)} style={{display:'block',padding:'12px 16px',borderRadius:10,color:'var(--text2)',textDecoration:'none',fontSize:15}}>💳 Abonnements</Link>
              {isAdmin && <Link href="/admin" onClick={()=>setOpen(false)} style={{display:'block',padding:'12px 16px',borderRadius:10,color:'var(--gold)',textDecoration:'none',fontSize:15}}>⚙️ Admin</Link>}
              <button onClick={async()=>{setOpen(false);await signOut?.()}} style={{display:'block',width:'100%',textAlign:'left',padding:'12px 16px',borderRadius:10,background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',color:'var(--red)',fontSize:15,cursor:'pointer',fontFamily:'inherit'}}>
                🚪 Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login"    onClick={()=>setOpen(false)} style={{display:'block',padding:'12px 16px',borderRadius:10,color:'var(--text2)',textDecoration:'none',fontSize:15}}>Connexion</Link>
              <Link href="/register" onClick={()=>setOpen(false)} style={{display:'block',padding:'12px 16px',borderRadius:10,background:'linear-gradient(135deg,#4f6ef7,#7c3aed)',color:'white',textDecoration:'none',fontSize:15,fontWeight:600,textAlign:'center'}}>Inscription</Link>
            </>
          )}
        </div>
      )}
    </>
  )
}