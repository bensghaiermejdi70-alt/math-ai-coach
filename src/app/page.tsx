'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ── Data ────────────────────────────────────────────────────────────
const SECTIONS_TN = [
  { href:'/bac/maths',         icon:'🧮', titre:'Mathématiques',   couleur:'#4f6ef7', desc:'9 chapitres · Analyse, Algèbre, Géométrie', coeff:'Coeff. 4' },
  { href:'/bac/sciences-exp',  icon:'⚗️',  titre:'Sciences Exp.',   couleur:'#10b981', desc:'Biologie, Physique, Chimie intégrées',       coeff:'Coeff. 3' },
  { href:'/bac/sciences-tech', icon:'⚙️',  titre:'Sciences Tech.',  couleur:'#06b6d4', desc:'Analyse & Algèbre appliquées',               coeff:'Coeff. 3' },
  { href:'/bac/informatique',  icon:'💻',  titre:'Informatique',    couleur:'#8b5cf6', desc:'Logique, Algorithmique, Fonctions',           coeff:'Coeff. 3', isNew:true },
  { href:'/bac/eco-gestion',   icon:'📊',  titre:'Économie-Gestion',couleur:'#f59e0b', desc:'Statistiques, Suites financières, Analyse',  coeff:'Coeff. 2', isNew:true },
]

const SECTIONS_FR = [
  { href:'/bac-france/terminale-generale', icon:'🎓', titre:'Terminale Générale',  couleur:'#4f6ef7', desc:'Suites, Complexes, Géométrie espace, Proba', coeff:'Coeff. 16' },
  { href:'/bac-france/premiere',           icon:'📗', titre:'Première Spécialité', couleur:'#3b82f6', desc:'Second degré, Dérivation, Trigonométrie',     coeff:'Épreuve anticipée' },
  { href:'/bac-france/terminale-techno',   icon:'📊', titre:'STMG / STI2D',       couleur:'#10b981', desc:'Suites financières, Stats 2 variables, Exp.', coeff:'Maths techno' },
  { href:'/bac-france/expertes',           icon:'★',  titre:'Maths Expertes',     couleur:'#8b5cf6', desc:'Arithmétique, Matrices, Chaînes de Markov',   coeff:'Option Terminale', isNew:true },
]

const FEATURES = [
  { icon:'🧮', title:'Solveur Étape par Étape',  desc:'Chaque étape expliquée avec justification. La méthode complète, pas juste le résultat.', color:'#4f6ef7', href:'/solve' },
  { icon:'🤖', title:'Chat IA Professeur',        desc:'Pose tes questions en français. L\'IA répond comme un enseignant avec graphiques interactifs.', color:'#7c3aed', href:'/chat' },
  { icon:'🏆', title:'Bac Blanc National',        desc:'Concours quotidien avec chrono, correction IA, classement national et analyse des faiblesses.', color:'#f59e0b', href:'/bac-blanc' },
  { icon:'🎯', title:'Simulation IA',             desc:'Examens originaux générés par IA, corrigés exercice par exercice avec remédiation personnalisée.', color:'#10b981', href:'/simulation' },
  { icon:'📐', title:'Cours & Programme Officiel',desc:'Tous les chapitres, définitions, théorèmes, formules et exercices corrigés du programme CNP.', color:'#06b6d4', href:'/bac' },
  { icon:'📈', title:'Analyse & Remédiation',     desc:'Détection des lacunes, exercices ciblés et plan de révision personnalisé généré par l\'IA.', color:'#ec4899', href:'/chat' },
]

const DEMO_STEPS = [
  { label:'Identifier le type',            math:'Équation du 2ème degré : ax² + bx + c = 0', ok:true },
  { label:'Coefficients',                  math:'a = 2,   b = −5,   c = 3', ok:true },
  { label:'Discriminant',                  math:'Δ = b² − 4ac = 25 − 24 = 1', ok:true },
  { label:'Δ > 0  →  deux solutions réelles', math:'x = (−b ± √Δ) / 2a', ok:true },
  { label:'Solutions finales',             math:'x₁ = 3/2       x₂ = 1', ok:false },
]

// ── Micro-composants ────────────────────────────────────────────────
function Pill({ children, color='#4f6ef7' }: { children:React.ReactNode; color?:string }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4,
      fontSize:11, fontWeight:700, padding:'3px 11px', borderRadius:20,
      background:`${color}18`, color, border:`1px solid ${color}28`,
    }}>{children}</span>
  )
}

function SectionCard({ s, country }: { s:any; country:'tn'|'fr' }) {
  const [hov, setHov] = useState(false)
  return (
    <Link href={s.href} style={{ textDecoration:'none' }}>
      <div style={{
        background: hov ? `${s.couleur}0d` : 'rgba(255,255,255,0.025)',
        border:`1px solid ${hov ? s.couleur+'40' : 'rgba(255,255,255,0.07)'}`,
        borderRadius:16, padding:'22px 20px',
        transition:'all 0.25s ease', cursor:'pointer',
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov ? `0 16px 40px ${s.couleur}18` : 'none',
        position:'relative', overflow:'hidden',
      }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {s.isNew && (
          <div style={{ position:'absolute', top:10, right:10, background:'linear-gradient(135deg,#6366f1,#a78bfa)', color:'white', fontSize:8, fontWeight:900, padding:'2px 7px', borderRadius:20, letterSpacing:'0.06em' }}>NEW</div>
        )}
        <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
        <div style={{ fontWeight:700, fontSize:14, marginBottom:5, color:'var(--text)' }}>{s.titre}</div>
        <div style={{ fontSize:11, color:'var(--muted)', marginBottom:12, lineHeight:1.55 }}>{s.desc}</div>
        <Pill color={s.couleur}>{s.coeff}</Pill>
      </div>
    </Link>
  )
}

function FeatureCard({ f, i }: { f:typeof FEATURES[0]; i:number }) {
  const [hov, setHov] = useState(false)
  return (
    <Link href={f.href} style={{ textDecoration:'none' }}>
      <div style={{
        background: hov ? `${f.color}0a` : 'rgba(255,255,255,0.025)',
        border:`1px solid ${hov ? f.color+'35' : 'rgba(255,255,255,0.07)'}`,
        borderRadius:18, padding:26,
        transition:'all 0.3s ease', cursor:'pointer',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 20px 50px ${f.color}12` : 'none',
        animationDelay:`${i * 0.07}s`,
      }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div style={{
          width:50, height:50, borderRadius:15,
          background:`${f.color}18`, border:`1px solid ${f.color}28`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:22, marginBottom:18,
        }}>{f.icon}</div>
        <div style={{ fontWeight:700, fontSize:15, marginBottom:9, color:'var(--text)' }}>{f.title}</div>
        <div style={{ fontSize:13, lineHeight:1.65, color:'var(--text2)' }}>{f.desc}</div>
        <div style={{ marginTop:16, fontSize:12, color:f.color, fontWeight:700, opacity: hov ? 1 : 0.6, transition:'opacity 0.2s' }}>
          Découvrir →
        </div>
      </div>
    </Link>
  )
}

// ── Page principale ─────────────────────────────────────────────────

// ── Composant Video Player avec thumbnail cliquable ──────────────
const VIDEO_ID = '_6atlDlzhwI'

function VideoPlayer() {
  const [playing, setPlaying] = useState(false)

  return (
    <div style={{ maxWidth:820, margin:'0 auto', position:'relative', borderRadius:22, overflow:'hidden', boxShadow:'0 40px 100px rgba(0,0,0,0.6)' }}>
      {!playing ? (
        /* ── Thumbnail cliquable ── */
        <div
          onClick={() => setPlaying(true)}
          style={{ position:'relative', cursor:'pointer', display:'block', lineHeight:0 }}
        >
          {/* Image de couverture */}
          <img
            src="/Réussis_ton_Bac_avec_MATHBAC_AI.png"
            alt="MathBac.AI — Présentation"
            style={{ width:'100%', display:'block', borderRadius:22 }}
          />
          {/* Overlay sombre au hover */}
          <div style={{
            position:'absolute', inset:0, borderRadius:22,
            background:'rgba(0,0,0,0.25)',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background='rgba(0,0,0,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.background='rgba(0,0,0,0.25)')}
          >
            {/* Bouton play */}
            <div style={{
              width:80, height:80, borderRadius:'50%',
              background:'rgba(255,255,255,0.95)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
              transition:'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='scale(1.1)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M8 5.14v14l11-7-11-7z" fill="#1a1a2e"/>
              </svg>
            </div>
            {/* Badge durée */}
            <div style={{
              position:'absolute', bottom:16, right:20,
              background:'rgba(0,0,0,0.8)', color:'white',
              fontSize:13, fontWeight:700, padding:'4px 10px', borderRadius:8,
              fontFamily:'var(--font-mono)',
            }}>
              30 min
            </div>
          </div>
        </div>
      ) : (
        /* ── Iframe YouTube ── */
        <div style={{ position:'relative', paddingBottom:'56.25%', height:0, background:'#000', borderRadius:22, overflow:'hidden' }}>
          <iframe
            style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
            title="MathBac.AI — Présentation complète"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && (x.target as HTMLElement).classList.add('visible')),
      { threshold:0.07, rootMargin:'0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, overflow:'hidden' }}>

        {/* ═══════════════════════════════════════════════════ HERO */}
        <section style={{
          minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
          textAlign:'center', padding:'120px clamp(20px,5vw,60px) 80px', position:'relative',
        }}>
          {/* Orbs atmosphériques */}
          <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:'10%', left:'5%', width:460, height:460, background:'radial-gradient(circle,rgba(79,110,247,0.13) 0%,transparent 60%)', filter:'blur(50px)' }} />
            <div style={{ position:'absolute', top:'20%', right:'4%', width:380, height:380, background:'radial-gradient(circle,rgba(96,165,250,0.1) 0%,transparent 60%)', filter:'blur(50px)' }} />
            <div style={{ position:'absolute', bottom:'15%', left:'35%', width:520, height:280, background:'radial-gradient(ellipse,rgba(124,58,237,0.08) 0%,transparent 70%)', filter:'blur(60px)' }} />
          </div>

          <div style={{ maxWidth:880, position:'relative' }}>
            {/* Badge bilingue */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:12,
              background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.11)',
              borderRadius:100, padding:'8px 22px', fontSize:12, color:'var(--text2)',
              marginBottom:36, animation:'fadeInDown 0.7s ease both',
            }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#10b981', display:'inline-block', animation:'pulse 2s ease infinite' }} />
              <span style={{ color:'#60a5fa', fontWeight:700 }}>🇫🇷 Bac France</span>
              <span style={{ color:'rgba(255,255,255,0.2)' }}>·</span>
              <span style={{ color:'#4f6ef7', fontWeight:700 }}>🇹🇳 Bac Tunisie</span>
              <span style={{ color:'rgba(255,255,255,0.2)' }}>·</span>
              <span>IA Pédagogique</span>
            </div>

            {/* Titre principal */}
            <h1 style={{
              fontFamily:'var(--font-display)', fontWeight:900,
              fontSize:'clamp(22px,3.5vw,46px)', lineHeight:1.05,
              letterSpacing:'-0.03em', marginBottom:30,
              animation:'fadeInUp 0.7s ease 0.1s both',
            }}>
              <span style={{ display:'block', marginBottom:4 }}>Ton Professeur de</span>
              <span style={{
                display:'block',
                background:'linear-gradient(95deg,#4f6ef7 0%,#7c3aed 45%,#60a5fa 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                marginBottom:4,
              }}>Mathématiques</span>
              <span style={{
                display:'block',
                background:'linear-gradient(95deg,#f5c842 0%,#f97316 70%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>Alimenté par l'IA</span>
            </h1>

            {/* Sous-titre */}
            <p style={{
              fontSize:'clamp(15px,2vw,19px)', color:'var(--muted)',
              maxWidth:600, margin:'0 auto 48px', fontWeight:300, lineHeight:1.75,
              animation:'fadeInUp 0.7s ease 0.2s both',
            }}>
              Résolution étape par étape · Simulation Bac IA · Bac Blanc national · Remédiation personnalisée —
              pour le <span style={{ color:'#4f6ef7', fontWeight:600 }}>Bac Tunisie</span> et le <span style={{ color:'#60a5fa', fontWeight:600 }}>Bac France</span>.
            </p>

            {/* CTA buttons */}
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:70, animation:'fadeInUp 0.7s ease 0.3s both' }}>
              <Link href="/bac" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                background:'linear-gradient(135deg,#4f6ef7,#7c3aed)',
                color:'white', padding:'14px 26px', borderRadius:13,
                fontWeight:800, fontSize:14, textDecoration:'none',
                boxShadow:'0 8px 28px rgba(79,110,247,0.45)', transition:'all 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 14px 36px rgba(79,110,247,0.55)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 28px rgba(79,110,247,0.45)'}}
              >🇹🇳 Programme Tunisie</Link>

              <Link href="/bac-france" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                background:'linear-gradient(135deg,#2563eb,#4f6ef7)',
                color:'white', padding:'14px 26px', borderRadius:13,
                fontWeight:800, fontSize:14, textDecoration:'none',
                boxShadow:'0 8px 28px rgba(37,99,235,0.4)', transition:'all 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)'}}
              >🇫🇷 Programme France</Link>

              <Link href="/solve" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.14)',
                color:'var(--text)', padding:'14px 26px', borderRadius:13,
                fontWeight:600, fontSize:14, textDecoration:'none', transition:'all 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.11)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)'}}
              >▶ Tester le solveur</Link>
            </div>

            {/* Stats */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              gap:'clamp(28px,6vw,64px)', flexWrap:'wrap',
              animation:'fadeInUp 0.7s ease 0.4s both',
            }}>
              {[
                { n:'2',    l:'Programmes',  s:'Tunisie & France' },
                { n:'9+',   l:'Sections Bac', s:'TN + FR' },
                { n:'10+',  l:'Ans d\'examens', s:'Archives officielles' },
                { n:'24/7', l:'Prof IA',      s:'Toujours disponible' },
              ].map((s,i) => (
                <div key={i} style={{ textAlign:'center' }}>
                  <div style={{
                    fontFamily:'var(--font-display)', fontWeight:900,
                    fontSize:'clamp(26px,3.5vw,38px)', lineHeight:1,
                    background:'linear-gradient(135deg,var(--text),var(--accent))',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                  }}>{s.n}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--text2)', marginTop:3 }}>{s.l}</div>
                  <div style={{ fontSize:10, color:'var(--muted)' }}>{s.s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════ VIDÉO DÉMO */}
        <section className="section container reveal">
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <span className="label">Voir en action</span>
            <h2 style={{ marginBottom:12 }}>Comment ça marche ?</h2>
            <p style={{ maxWidth:500, margin:'0 auto', color:'var(--text2)', fontSize:14, lineHeight:1.65 }}>
              Simulation Bac · Correction IA · Bac Blanc national · Programme personnalisé — tout en un.
            </p>
          </div>
          <VideoPlayer />
        </section>

        {/* ═══════════════════════════════ 2 PROGRAMMES CÔTE À CÔTE */}
        <section className="section container reveal">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <span className="label">Deux pays · Un coach</span>
            <h2 style={{ fontSize:'clamp(24px,4vw,44px)', lineHeight:1.15, marginBottom:14 }}>
              Tunisie <span style={{ color:'rgba(255,255,255,0.15)' }}>&</span> France —<br/>
              <span style={{ background:'linear-gradient(90deg,#4f6ef7,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>le même niveau d'excellence</span>
            </h2>
            <p style={{ fontSize:15, color:'var(--text2)', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
              MathBac.AI couvre les deux programmes officiels avec cours, examens, simulations IA et Bac Blanc quotidien.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28 }}>

            {/* ── Tunisie */}
            <div style={{
              background:'linear-gradient(145deg,rgba(79,110,247,0.09),rgba(79,110,247,0.03))',
              border:'1px solid rgba(79,110,247,0.22)', borderRadius:24,
              padding:'36px 40px', position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', top:-60, right:-60, width:200, height:200, background:'radial-gradient(circle,rgba(79,110,247,0.18) 0%,transparent 70%)', filter:'blur(30px)', pointerEvents:'none' }} />
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:22 }}>
                <span style={{ fontSize:52 }}>🇹🇳</span>
                <div>
                  <div style={{ fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em', color:'#4f6ef7', marginBottom:3 }}>Programme CNP 2026</div>
                  <h3 style={{ fontSize:'clamp(20px,2.5vw,26px)', fontFamily:'var(--font-display)', fontWeight:800, margin:0 }}>Bac Tunisie</h3>
                </div>
              </div>
              <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7, marginBottom:22 }}>
                5 sections couvertes intégralement — tous les théorèmes, formules et 10 ans d'examens officiels avec corrections.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:28 }}>
                {SECTIONS_TN.map(s => <SectionCard key={s.href} s={s} country="tn" />)}
              </div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:24 }}>
                {['/bac','Cours','/examens','Examens','/simulation','Simulation','/bac-blanc','Bac Blanc'].reduce((acc,v,i,a)=> i%2===0 ? [...acc, {href:a[i],label:a[i+1]}] : acc, [] as {href:string;label:string}[]).map(l => (
                  <Link key={l.href} href={l.href} style={{ fontSize:12, fontWeight:600, padding:'6px 14px', borderRadius:9, background:'rgba(79,110,247,0.1)', border:'1px solid rgba(79,110,247,0.2)', color:'#a5b4fc', textDecoration:'none', transition:'all 0.2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(79,110,247,0.2)'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(79,110,247,0.1)'}}
                  >{l.label}</Link>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>

                <Link href="/bac" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', padding:'11px 22px', borderRadius:12, fontWeight:700, fontSize:14, textDecoration:'none', boxShadow:'0 6px 20px rgba(79,110,247,0.35)', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.opacity='0.88'}}
                  onMouseLeave={e=>{e.currentTarget.style.opacity='1'}}
                >Explorer le programme →</Link>
              </div>
            </div>

            {/* ── France */}
            <div style={{
              background:'linear-gradient(145deg,rgba(59,130,246,0.09),rgba(59,130,246,0.03))',
              border:'1px solid rgba(59,130,246,0.22)', borderRadius:24,
              padding:'36px 40px', position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', top:-60, right:-60, width:200, height:200, background:'radial-gradient(circle,rgba(59,130,246,0.18) 0%,transparent 70%)', filter:'blur(30px)', pointerEvents:'none' }} />
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:22 }}>
                <span style={{ fontSize:52 }}>🇫🇷</span>
                <div>
                  <div style={{ fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em', color:'#60a5fa', marginBottom:3 }}>Programme officiel — Éducation nationale</div>
                  <h3 style={{ fontSize:'clamp(20px,2.5vw,26px)', fontFamily:'var(--font-display)', fontWeight:800, margin:0 }}>Bac France</h3>
                </div>
              </div>
              <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7, marginBottom:22 }}>
                4 filières couvertes — sujets APMEP, archives officielles, Maths Expertes et simulation Bac quotidienne.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:28 }}>
                {SECTIONS_FR.map(s => <SectionCard key={s.href} s={s} country="fr" />)}
              </div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:24 }}>
                {['/bac-france','Cours','/examens-france','Examens','/simulation-france','Simulation','/bac-blanc-france','Bac Blanc'].reduce((acc,v,i,a)=> i%2===0 ? [...acc, {href:a[i],label:a[i+1]}] : acc, [] as {href:string;label:string}[]).map(l => (
                  <Link key={l.href} href={l.href} style={{ fontSize:12, fontWeight:600, padding:'6px 14px', borderRadius:9, background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.2)', color:'#93c5fd', textDecoration:'none', transition:'all 0.2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(59,130,246,0.2)'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(59,130,246,0.1)'}}
                  >{l.label}</Link>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>

                <Link href="/bac-france" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#2563eb,#4f6ef7)', color:'white', padding:'11px 22px', borderRadius:12, fontWeight:700, fontSize:14, textDecoration:'none', boxShadow:'0 6px 20px rgba(37,99,235,0.35)', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.opacity='0.88'}}
                  onMouseLeave={e=>{e.currentTarget.style.opacity='1'}}
                >Explorer le programme →</Link>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════ 6 FEATURES */}
        <section className="section container" id="features">
          <div className="reveal" style={{ textAlign:'center', marginBottom:56 }}>
            <span className="label">6 outils IA puissants</span>
            <h2 style={{ fontSize:'clamp(22px,3.5vw,42px)', marginBottom:14, lineHeight:1.2 }}>
              Plus qu'une calculatrice —<br/>
              <span style={{ background:'linear-gradient(90deg,#4f6ef7,#7c3aed)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>un vrai professeur IA</span>
            </h2>
            <p style={{ fontSize:15, color:'var(--text2)', maxWidth:500, margin:'0 auto', lineHeight:1.7 }}>
              Chaque outil est conçu pour un objectif précis : comprendre, s'entraîner, progresser et réussir.
            </p>
          </div>
          <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
            {FEATURES.map((f,i) => <FeatureCard key={i} f={f} i={i} />)}
          </div>
        </section>

        {/* ═══════════════════════ DÉMO SOLVEUR (split layout) */}
        <section className="section container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>

            {/* Texte gauche */}
            <div className="reveal">
              <span className="label">Démo live</span>
              <h2 style={{ fontSize:'clamp(22px,3vw,38px)', marginBottom:18, lineHeight:1.2 }}>
                Résolution étape<br/>par étape
              </h2>
              <p style={{ fontSize:15, color:'var(--text2)', lineHeight:1.75, marginBottom:28 }}>
                Tape ton exercice — l'IA le décompose en étapes claires avec justifications, comme un professeur au tableau.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:11, marginBottom:32 }}>
                {['Équations & systèmes','Fonctions & dérivées','Probabilités & statistiques','Géométrie dans l\'espace','Complexes · Suites · Intégrales'].map(t => (
                  <div key={t} style={{ display:'flex', alignItems:'center', gap:10, fontSize:14, color:'var(--text2)' }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#4f6ef7', flexShrink:0 }} />
                    {t}
                  </div>
                ))}
              </div>
              <Link href="/solve" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', padding:'13px 24px', borderRadius:12, fontWeight:700, fontSize:14, textDecoration:'none', boxShadow:'0 6px 22px rgba(79,110,247,0.38)' }}>
                🧮 Essayer le solveur →
              </Link>
            </div>

            {/* Terminal mock droite */}
            <div className="reveal" style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:22, overflow:'hidden', boxShadow:'0 40px 80px rgba(0,0,0,0.45)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', background:'var(--surface2)', borderBottom:'1px solid var(--border)' }}>
                {['#ff5f57','#febc2e','#28c840'].map((c,i) => <div key={i} style={{ width:11, height:11, borderRadius:'50%', background:c }} />)}
                <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)', marginLeft:8 }}>MathBac.AI · Solveur Pédagogique</span>
              </div>
              <div style={{ padding:22 }}>
                <div style={{ display:'flex', gap:10, marginBottom:20 }}>
                  <div style={{ flex:1, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:9, padding:'10px 13px', fontFamily:'var(--font-mono)', fontSize:14, color:'var(--text)' }}>
                    2x² − 5x + 3 = 0
                  </div>
                  <div style={{ background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', padding:'10px 16px', borderRadius:9, fontWeight:700, fontSize:13, display:'flex', alignItems:'center', cursor:'pointer' }}>
                    Résoudre
                  </div>
                </div>
                {DEMO_STEPS.map((s,i) => (
                  <div key={i} style={{ display:'flex', gap:11, padding:'10px 13px', borderRadius:10, marginBottom:7, background:s.ok?'rgba(6,214,160,0.05)':'rgba(79,110,247,0.07)', border:`1px solid ${s.ok?'rgba(6,214,160,0.18)':'rgba(79,110,247,0.22)'}` }}>
                    <div style={{ width:21, height:21, borderRadius:'50%', flexShrink:0, background:s.ok?'rgba(6,214,160,0.18)':'rgba(79,110,247,0.18)', color:s.ok?'#06d6a0':'#4f6ef7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:900 }}>
                      {s.ok ? '✓' : i+1}
                    </div>
                    <div>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>{s.label}</div>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text)' }}>{s.math}</div>
                    </div>
                  </div>
                ))}
                <div style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(6,214,160,0.08)', border:'1px solid rgba(6,214,160,0.25)', borderRadius:11, padding:'13px 16px', marginTop:6 }}>
                  <span style={{ fontSize:16 }}>✓</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:15, color:'var(--teal)', fontWeight:700 }}>S = {'{ 1  ;  3/2 }'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ BAC BLANC */}
        <section className="section container reveal">
          <div style={{ background:'linear-gradient(135deg,rgba(245,158,11,0.09),rgba(249,115,22,0.04))', border:'1px solid rgba(245,158,11,0.25)', borderRadius:24, padding:'40px 48px', display:'flex', alignItems:'center', gap:40, flexWrap:'wrap', position:'relative', overflow:'hidden' }}>
            <div aria-hidden style={{ position:'absolute', top:-50, right:-50, width:220, height:220, background:'radial-gradient(circle,rgba(245,158,11,0.18) 0%,transparent 70%)', filter:'blur(40px)', pointerEvents:'none' }} />
            <div style={{ fontSize:60 }}>🏆</div>
            <div style={{ flex:1, minWidth:240 }}>
              <div style={{ fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--gold)', marginBottom:8 }}>Concours National · Mai – Juin</div>
              <h2 style={{ fontSize:'clamp(20px,3vw,32px)', marginBottom:10 }}>Bac Blanc IA — Tunisie & France</h2>
              <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7, maxWidth:480 }}>
                Un vrai concours quotidien avec chrono, correction IA détaillée, classement national et analyse complète des faiblesses.
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10, flexShrink:0 }}>
              <Link href="/bac-blanc" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#f59e0b,#f97316)', color:'#0a0a1a', padding:'12px 22px', borderRadius:12, fontWeight:800, fontSize:14, textDecoration:'none', boxShadow:'0 6px 22px rgba(245,158,11,0.38)', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)'}}
              >🇹🇳 Bac Blanc Tunisie →</Link>
              <Link href="/bac-blanc-france" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.3)', color:'var(--gold)', padding:'12px 22px', borderRadius:12, fontWeight:700, fontSize:14, textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(245,158,11,0.18)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(245,158,11,0.1)'}}
              >🇫🇷 Bac Blanc France →</Link>
            </div>
          </div>
        </section>


                {/* ═══════════════════════════════════════ CTA FINAL */}
        <section style={{ textAlign:'center', padding:'clamp(80px,12vh,140px) clamp(20px,5vw,60px)', position:'relative' }}>
          <div aria-hidden style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:700, height:400, background:'radial-gradient(ellipse,rgba(79,110,247,0.14) 0%,transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }} />
          <div className="reveal" style={{ position:'relative' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,214,160,0.1)', border:'1px solid rgba(6,214,160,0.25)', borderRadius:100, padding:'6px 16px', fontSize:12, color:'var(--teal)', marginBottom:26 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--teal)', display:'inline-block', animation:'pulse 2s ease infinite' }} />
              Prêt pour réussir ton Bac
            </div>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(20px,3vw,38px)', lineHeight:1.1, letterSpacing:'-0.02em', marginBottom:20 }}>
              Commence aujourd'hui.<br/>
              <span style={{ background:'linear-gradient(90deg,#4f6ef7,#7c3aed)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Réussis ton Bac.</span>
            </h2>
            <p style={{ fontSize:17, color:'var(--text2)', maxWidth:520, margin:'0 auto 48px', lineHeight:1.75, fontWeight:300 }}>
              Solveur IA · Simulation · Bac Blanc · Coach personnalisé —
              pour le <span style={{ color:'#4f6ef7', fontWeight:600 }}>Bac Tunisie</span> et le <span style={{ color:'#60a5fa', fontWeight:600 }}>Bac France</span>.
            </p>
            <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/bac" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', padding:'16px 32px', borderRadius:14, fontWeight:800, fontSize:16, textDecoration:'none', boxShadow:'0 8px 32px rgba(79,110,247,0.5)', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 14px 40px rgba(79,110,247,0.6)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 32px rgba(79,110,247,0.5)'}}
              >🇹🇳 Programme Tunisie →</Link>
              <Link href="/bac-france" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#2563eb,#4f6ef7)', color:'white', padding:'16px 32px', borderRadius:14, fontWeight:800, fontSize:16, textDecoration:'none', boxShadow:'0 8px 32px rgba(37,99,235,0.45)', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)'}}
              >🇫🇷 Programme France →</Link>
              <Link href="/solve" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)', color:'var(--text)', padding:'16px 32px', borderRadius:14, fontWeight:700, fontSize:16, textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.07)'}}
              >🧮 Solveur IA</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style suppressHydrationWarning>{`
        @keyframes fadeInDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:none} }
        @keyframes fadeInUp   { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:none} }
        @keyframes pulse      { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .reveal { opacity:0; transform:translateY(26px); transition:opacity 0.65s ease, transform 0.65s ease }
        .reveal.visible { opacity:1; transform:none }
        .grid-2col { display:grid; grid-template-columns:1fr 1fr; gap:28px }
        .grid-3col { display:grid; grid-template-columns:repeat(3,1fr); gap:18px }
        .grid-feat { display:grid; grid-template-columns:repeat(3,1fr); gap:20px }
        @media(max-width:1000px){
          .grid-2col { grid-template-columns:1fr !important }
          .grid-3col { grid-template-columns:1fr 1fr !important }
          .grid-feat { grid-template-columns:1fr 1fr !important }
        }
        @media(max-width:640px){
          .grid-2col { grid-template-columns:1fr !important }
          .grid-3col { grid-template-columns:1fr !important }
          .grid-feat { grid-template-columns:1fr !important }
        }
      `}</style>
    </>
  )
}