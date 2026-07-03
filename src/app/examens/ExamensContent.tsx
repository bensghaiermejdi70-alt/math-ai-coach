'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Session, AnneeLinks, ExData, AnneeData, InfoLinks, Cell, Matiere, SKey } from './exam-data'

type ExamDataMod = typeof import('./exam-data')

function PdfModal({ url, title, onClose }: { url:string; title:string; onClose:()=>void }) {
  useEffect(() => {
    const fn = (e:KeyboardEvent) => { if(e.key==='Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  },[onClose])

  const isPdf     = url.endsWith('.pdf')
  const isGDrive  = url.includes('drive.google.com')
  const isViewable = isPdf || isGDrive
  const iframeSrc = isPdf
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
    : url
  const downloadHref = isGDrive ? url.replace('/preview', '/view') : url
  const sourceLabel  = isGDrive
    ? '📂 Correction · Google Drive'
    : '📋 Sujet · bacweb.tn (CNTE officiel)'

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.9)',zIndex:9999,display:'flex',flexDirection:'column'}}>
      <div onClick={e=>e.stopPropagation()} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 18px',background:'#0d0d1a',borderBottom:'1px solid rgba(255,255,255,0.08)',flexShrink:0,flexWrap:'wrap'}}>
        <span style={{fontSize:18}}>{isGDrive ? '✅' : '📄'}</span>
        <div style={{flex:1,minWidth:0}}>
          <p style={{margin:'0 0 1px',fontWeight:700,fontSize:13,color:'white',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{title}</p>
          <p style={{margin:0,fontSize:10,color:'rgba(255,255,255,0.35)'}}>{sourceLabel}</p>
        </div>
        <div style={{display:'flex',gap:8,flexShrink:0}}>
          <a href={downloadHref} download={isPdf} target="_blank" rel="noreferrer"
            style={{padding:'6px 14px',background:'rgba(255,255,255,0.1)',color:'white',borderRadius:8,textDecoration:'none',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
            ⬇ Télécharger
          </a>
          <a href={downloadHref} target="_blank" rel="noreferrer"
            style={{padding:'6px 14px',background:'rgba(79,110,247,0.3)',color:'white',borderRadius:8,textDecoration:'none',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
            ↗ Ouvrir
          </a>
          <button onClick={onClose} style={{padding:'6px 14px',borderRadius:8,border:'1px solid rgba(255,255,255,0.2)',background:'transparent',color:'white',cursor:'pointer',fontSize:14,fontWeight:700}}>✕</button>
        </div>
      </div>
      <div onClick={e=>e.stopPropagation()} style={{flex:1,background:'#1a1a2e',position:'relative'}}>
        {isViewable ? (
          <iframe src={iframeSrc} style={{width:'100%',height:'100%',border:'none'}} title={title} allow="autoplay" />
        ) : (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:20,padding:40}}>
            <span style={{fontSize:56}}>📄</span>
            <h3 style={{color:'white',textAlign:'center',maxWidth:460}}>Document non prévisualisable</h3>
            <a href={url} target="_blank" rel="noreferrer"
              style={{display:'inline-flex',alignItems:'center',gap:10,padding:'14px 32px',background:'#4f6ef7',color:'white',borderRadius:14,textDecoration:'none',fontWeight:700,fontSize:16}}>
              Ouvrir le document →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Bouton PDF ────────────────────────────────────────────────
function BtnLink({ label, url, color, onOpen }: { label:string; url?:string; color:string; onOpen:(u:string,t:string)=>void; }) {
  if (!url) return null
  return (
    <button onClick={() => onOpen(url, label)}
      style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:9,border:`1.5px solid ${color}50`,background:`${color}12`,color,cursor:'pointer',fontSize:12,fontWeight:700,transition:'all 0.15s',fontFamily:'var(--font-body)'}}
      onMouseEnter={e=>{e.currentTarget.style.background=`${color}26`;e.currentTarget.style.transform='translateY(-1px)'}}
      onMouseLeave={e=>{e.currentTarget.style.background=`${color}12`;e.currentTarget.style.transform='none'}}>
      {label}
    </button>
  )
}

// ── SessionsBlock — gère maths ET physique ────────────────────
function SessionsBlock({ year, secKey, color, links, infoL, onOpen }: {
  year: number; secKey: SKey; color: string;
  links?: AnneeLinks; infoL?: InfoLinks;
  onOpen: (url: string, title: string) => void
}) {
  const sessions = [
    { label:'📌 Session Principale', key:'principale' as const, border:'rgba(79,110,247,0.4)', bg:'rgba(79,110,247,0.06)' },
    { label:'🔄 Session de Contrôle', key:'controle'  as const, border:'rgba(245,158,11,0.4)', bg:'rgba(245,158,11,0.06)' },
  ]
  const isPhys = secKey === 'sc-exp-phys' || secKey === 'sc-tech-phys'
  const isInfo_sec = secKey === 'info-algo'
  const isAnglaisSec = secKey === 'anglais-lettres' || secKey === 'anglais-sciences'
  const label  = isPhys ? 'Physique-Chimie' : isInfo_sec ? 'Informatique' : isAnglaisSec ? 'Anglais' : 'Mathématiques'

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:14,marginBottom:20}}>
      {sessions.map(s => {
        if (secKey === 'info-algo') {
          const il = infoL?.[s.key]
          return (
            <div key={s.key} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:14,padding:18}}>
              <p style={{margin:'0 0 14px',fontWeight:700,fontSize:13,color:'var(--text)'}}>{s.label} {year}</p>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <div>
                  <p style={{margin:'0 0 5px',fontSize:11,color:'#4f6ef7',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em'}}>⚙️ Algorithmique & Programmation</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                    <BtnLink label="📄 Sujet Algo" url={il?.algo_sujet} color="#4f6ef7" onOpen={(u)=>onOpen(u,`Sujet Algorithmique — Bac Sc.Info ${year}`)} />
                    <BtnLink label="✅ Correction Algo" url={il?.algo_corr} color="#06d6a0" onOpen={(u)=>onOpen(u,`Correction Algorithmique — Bac Sc.Info ${year}`)} />
                  </div>
                </div>
                <div>
                  <p style={{margin:'0 0 5px',fontSize:11,color:'#8b5cf6',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em'}}>🗄️ Bases de données</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                    <BtnLink label="📄 Sujet BD" url={il?.bd_sujet} color="#8b5cf6" onOpen={(u)=>onOpen(u,`Sujet Bases de données — Bac Sc.Info ${year}`)} />
                    <BtnLink label="✅ Correction BD" url={il?.bd_corr} color="#06d6a0" onOpen={(u)=>onOpen(u,`Correction BD — Bac Sc.Info ${year}`)} />
                  </div>
                </div>
              </div>
              {!il?.algo_sujet && !il?.bd_sujet && (
                <div style={{marginTop:10,padding:'10px 14px',background:'rgba(99,102,241,0.06)',borderRadius:9,border:'1px solid rgba(99,102,241,0.15)'}}>
                  <p style={{margin:'0 0 6px',fontSize:12,color:'#818cf8',fontWeight:600}}>📂 Ressources disponibles en ligne</p>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    <a href="https://www.kiteb.net/education/informatique/bac/" target="_blank" rel="noreferrer" style={{fontSize:11,padding:'4px 10px',borderRadius:7,background:'rgba(99,102,241,0.1)',color:'#818cf8',textDecoration:'none',fontWeight:600}}>kiteb.net →</a>
                    <a href="https://bac-done.com/sections/informatique/corrections/28" target="_blank" rel="noreferrer" style={{fontSize:11,padding:'4px 10px',borderRadius:7,background:'rgba(139,92,246,0.1)',color:'#a78bfa',textDecoration:'none',fontWeight:600}}>bac-done.com →</a>
                    <a href="https://mathinfo.tn/info/p4inf.php" target="_blank" rel="noreferrer" style={{fontSize:11,padding:'4px 10px',borderRadius:7,background:'rgba(6,214,160,0.1)',color:'#06d6a0',textDecoration:'none',fontWeight:600}}>mathinfo.tn →</a>
                  </div>
                </div>
              )}
            </div>
          )
        } else if (secKey === 'info-bd') {
          const W = 'http://www.bacweb.tn/bac'
          const urlP = `${W}/${year}/principale/math/info.pdf`
          const urlC = `${W}/${year}/controle/math/info.pdf`
          const color = '#4f6ef7'
          const label = '🧮 Maths · Sc.Exp · Sc.Tech · Éco-Gestion'
          return (
            <div key={s.key} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:14,padding:18}}>
              <p style={{margin:'0 0 14px',fontWeight:700,fontSize:13,color:'var(--text)'}}>{s.label} {year}</p>
              <div>
                <p style={{margin:'0 0 5px',fontSize:11,color,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em'}}>{label}</p>
                <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
                  {s.key === 'principale' && <BtnLink label="📄 Session Principale" url={urlP} color={color} onOpen={(u)=>onOpen(u,`Sujet TIC Bac ${year} — Session Principale`)} />}
                  {s.key === 'controle'   && <BtnLink label="📄 Session Contrôle"   url={urlC} color={color} onOpen={(u)=>onOpen(u,`Sujet TIC Bac ${year} — Session Contrôle`)} />}
                </div>
              </div>
            </div>
          )
        } else if (isAnglaisSec) {
          const sess = links?.[s.key]
          const secLabel = secKey === 'anglais-lettres' ? 'Section Lettres' : 'Sc. Math / Info / Tech / Éco-Gestion'
          return (
            <div key={s.key} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:14,padding:18}}>
              <p style={{margin:'0 0 12px',fontWeight:700,fontSize:13,color:'var(--text)'}}>{s.label} {year}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:12}}>
                <BtnLink label="📄 Sujet Anglais" url={sess?.sujet} color={color} onOpen={(u)=>onOpen(u,`Sujet Anglais — ${secLabel} Bac ${year} — ${s.label}`)} />
                <BtnLink label="✅ Correction" url={sess?.correction} color="#06d6a0" onOpen={(u)=>onOpen(u,`Correction Anglais — ${secLabel} Bac ${year} — ${s.label}`)} />
              </div>
              {!sess?.sujet && (
                <div style={{padding:'10px 14px',background:'rgba(245,158,11,0.06)',borderRadius:9,border:'1px solid rgba(245,158,11,0.18)'}}>
                  <p style={{margin:'0 0 6px',fontSize:12,color:'#fbbf24',fontWeight:600}}>📂 Liens alternatifs</p>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    <a href="https://www.bac-done.com/sections/lettres/corrections/anglais" target="_blank" rel="noreferrer" style={{fontSize:11,padding:'4px 10px',borderRadius:7,background:'rgba(245,158,11,0.1)',color:'#fbbf24',textDecoration:'none',fontWeight:600}}>bac-done.com →</a>
                    <a href="https://www.reviserbac.tn/sujets?matiere=anglais" target="_blank" rel="noreferrer" style={{fontSize:11,padding:'4px 10px',borderRadius:7,background:'rgba(236,72,153,0.1)',color:'#ec4899',textDecoration:'none',fontWeight:600}}>reviserbac.tn →</a>
                    <a href={`http://www.bacweb.tn/bac/${year}/principale/lettres/anglais.pdf`} target="_blank" rel="noreferrer" style={{fontSize:11,padding:'4px 10px',borderRadius:7,background:'rgba(79,110,247,0.1)',color:'#818cf8',textDecoration:'none',fontWeight:600}}>bacweb.tn →</a>
                  </div>
                </div>
              )}
            </div>
          )
        } else {
          const sess = links?.[s.key]
          const btnSujet  = isPhys ? '📄 Sujet' : (secKey === 'sc-tech' || secKey === 'eco' ? '📐 Sujet Maths' : '📄 Sujet')
          const btnCorr   = isPhys ? '✅ Correction' : (secKey === 'sc-tech' || secKey === 'eco' ? '✅ Correction Maths' : '✅ Correction')
          const titleBase = isPhys
            ? `${label} — ${secKey === 'sc-exp-phys' ? 'Bac Sciences Expérimentales' : 'Bac Sciences Techniques'} ${year} — ${s.label}`
            : `${label} — ${secKey === 'sc-tech' ? 'Bac Sciences Techniques' : secKey === 'eco' ? 'Bac Économie & Gestion' : ''} ${year} — ${s.label}`
          return (
            <div key={s.key} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:14,padding:18}}>
              <p style={{margin:'0 0 12px',fontWeight:700,fontSize:13,color:'var(--text)'}}>{s.label} {year}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                <BtnLink label={btnSujet}  url={sess?.sujet}      color={color}      onOpen={(u)=>onOpen(u,`Sujet ${titleBase}`)} />
                <BtnLink label={btnCorr}   url={sess?.correction} color="#06d6a0"    onOpen={(u)=>onOpen(u,`Correction ${titleBase}`)} />

              </div>
              {!sess?.sujet && !sess?.correction && (
                <p style={{margin:0,fontSize:12,color:'var(--muted)'}}>Session non disponible cette année</p>
              )}
            </div>
          )
        }
      })}
    </div>
  )
}

export default function ExamensTunisiePage({ data }: { data: ExamDataMod }) {
  const { infoLinks, SECTIONS_MATHS, SECTIONS_PHYS, SECTIONS_INFO_EXAM, SECTIONS_SVT, SECTIONS_ANGLAIS, SECTIONS_FRANCAIS, SECTIONS_ECONOMIE, SECTIONS_GESTION } = data
  const router = useRouter()
  const [activeMatiere, setActiveMatiere] = useState<Matiere>('maths')
  const [activeSec,     setActiveSec]     = useState<SKey>('maths')
  const [selectedYear,  setSelectedYear]  = useState<number|null>(null)
  const [modal,         setModal]         = useState<{url:string;title:string}|null>(null)

  const isMaths      = activeMatiere === 'maths'
  const isInfo_m     = activeMatiere === 'informatique'
  const isAnglais    = activeMatiere === 'anglais'
  const isSvt        = activeMatiere === 'svt'
  const isFrancais   = activeMatiere === 'francais'
  const isEconomie   = activeMatiere === 'economie'
  const isGestion    = activeMatiere === 'gestion'
  const sections = isMaths ? SECTIONS_MATHS : isInfo_m ? SECTIONS_INFO_EXAM : isAnglais ? SECTIONS_ANGLAIS : isSvt ? SECTIONS_SVT : isFrancais ? SECTIONS_FRANCAIS : isEconomie ? SECTIONS_ECONOMIE : isGestion ? SECTIONS_GESTION : SECTIONS_PHYS
  const sec      = sections.find(s => s.key === activeSec) ?? sections[0]
  const detail   = sec.data.find(a => a.year === selectedYear)
  const isInfo   = activeSec === 'info' || activeSec === 'info-algo' || activeSec === 'info-bd'
  const ptTotal  = detail?.exercices.reduce((s,e) => s+e.pts, 0) ?? 0

  const switchMatiere = (m: Matiere) => {
    setActiveMatiere(m)
    setActiveSec(
      m === 'maths'        ? 'maths' :
      m === 'physique'     ? 'sc-exp-phys' :
      m === 'anglais'      ? 'anglais-lettres' :
      m === 'svt'          ? 'svt-sc-exp' :
      m === 'francais'     ? 'fr-lettres' :
      m === 'economie'     ? 'economie' :
      m === 'gestion'      ? 'gestion' :
      'info-algo'
    )
    setSelectedYear(null)
  }

  const lancerSimulation = () => {
    // Mapper les clés physique vers la section correspondante pour la simulation
    const simSectionMap: Record<string, string> = {
      'maths':        'maths',
      'sc-exp':       'sc-exp',
      'sc-tech':      'sc-tech',
      'eco':          'eco',
      'info':         'info',
      'info-algo':    'info',
      'info-bd':      'info',
      'sc-exp-phys':  'sc-exp',
      'sc-tech-phys': 'sc-tech',
      'math-phys':    'maths',
      'info-phys':    'info',
      'anglais-lettres':  'anglais-lettres',
      'anglais-sciences': 'anglais-sciences',
      'svt-sc-exp':   'sc-exp',
      'svt-maths':    'maths',
      'economie':     'eco',
      'gestion':      'eco',
    }
    const simSection = simSectionMap[activeSec] ?? activeSec
    const isPhysSection = activeSec.endsWith('-phys')
    const isAnglaisSection = activeSec.startsWith('anglais-')
    const isSvtSection = activeSec.startsWith('svt-')
    const subjectParam = isPhysSection ? '&subject=physique' : isAnglaisSection ? '&subject=anglais' : isSvtSection ? '&subject=svt' : ''
    router.push(`/simulation?section=${simSection}${subjectParam}`)
  }
  const openPdf = (url:string, title:string) => setModal({url,title})

  return (
    <>
      <Navbar/>
      {modal && <PdfModal url={modal.url} title={modal.title} onClose={()=>setModal(null)}/>}

      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>

          {/* HEADER */}
          <div style={{marginBottom:36}}>
            <span className="label">📋 Examens Officiels Bac Tunisie</span>
            <h1 style={{fontSize:'clamp(26px,4vw,46px)',marginBottom:14}}>
              11 Ans d'Examens Officiels<br/>
              <span style={{color:'var(--accent)'}}>2 Sessions · Sujets + Corrections</span>
            </h1>
            <p style={{maxWidth:560,color:'var(--text2)',lineHeight:1.7,marginBottom:10}}>
              Chaque année comprend la <strong>session principale</strong> et la <strong>session de contrôle</strong>.<br/>
              Accès direct aux PDF officiels — lecture en ligne et téléchargement.
            </p>
            <div style={{display:'inline-flex',gap:10,alignItems:'center',padding:'8px 16px',background:'rgba(79,110,247,0.08)',border:'1px solid rgba(79,110,247,0.2)',borderRadius:10}}>
              <span style={{fontSize:14}}>🏛️</span>
              <span style={{fontSize:12,color:'var(--text2)'}}>Source officielle : <strong style={{color:'var(--accent)'}}>bacweb.tn</strong> (CNTE — Centre National des Technologies en Éducation)</span>
            </div>
          </div>

          {/* ── NIVEAU 1 : MATIÈRE ── */}
          <div style={{display:'flex',gap:8,marginBottom:20,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,padding:6,width:'fit-content'}}>
            {([
              { key:'maths'        as Matiere, icon:'🧮', label:'Mathématiques',   color:'#4f6ef7' },
              { key:'physique'     as Matiere, icon:'⚗️', label:'Physique-Chimie', color:'#06d6a0' },
              { key:'svt'          as Matiere, icon:'🌱', label:'SVT',              color:'#22c55e' },
              { key:'informatique' as Matiere, icon:'💻', label:'Informatique',    color:'#6366f1' },
              { key:'anglais'      as Matiere, icon:'🇬🇧', label:'Anglais',         color:'#f59e0b' },
              { key:'francais'     as Matiere, icon:'📚', label:'Francais',        color:'#ec4899' },
              { key:'economie'     as Matiere, icon:'📈', label:'Économie',        color:'#06b6d4' },
              { key:'gestion'      as Matiere, icon:'💼', label:'Gestion',         color:'#f43f5e' },
            ]).map(m => (
              <button key={m.key} onClick={() => switchMatiere(m.key)}
                style={{display:'flex',alignItems:'center',gap:8,padding:'11px 22px',borderRadius:12,border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:14,fontWeight:700,transition:'all 0.2s',background:activeMatiere===m.key?m.color:'transparent',color:activeMatiere===m.key?'white':'var(--muted)',boxShadow:activeMatiere===m.key?`0 4px 20px ${m.color}40`:'none'}}>
                <span style={{fontSize:18}}>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* ── NIVEAU 2 : SECTIONS ── */}
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:32,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:6,width:'fit-content'}}>
            {sections.map(s => (
              <button key={s.key} onClick={() => {setActiveSec(s.key); setSelectedYear(null)}}
                style={{display:'flex',alignItems:'center',gap:6,padding:'9px 16px',borderRadius:10,border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,transition:'all 0.2s',background:activeSec===s.key?s.color:'transparent',color:activeSec===s.key?'white':'var(--muted)',boxShadow:activeSec===s.key?`0 4px 16px ${s.color}45`:'none'}}>
                <span>{s.icon}</span>
                <span>{s.label}</span>
                <span style={{fontSize:10,background:activeSec===s.key?'rgba(255,255,255,0.22)':'var(--surface2)',padding:'1px 7px',borderRadius:8}}>{s.coeff}</span>
              </button>
            ))}
          </div>

          {/* BANNIÈRE SECTION */}
          <div style={{background:`linear-gradient(135deg,${sec.color}12,${sec.color}04)`,border:`1px solid ${sec.color}28`,borderRadius:16,padding:'18px 24px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <div style={{display:'flex',gap:14,alignItems:'center'}}>
              <span style={{fontSize:30}}>{sec.icon}</span>
              <div>
                <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',marginBottom:4}}>
                  <h2 style={{fontSize:18,margin:0}}>{sec.label}</h2>
                  <span style={{background:`${sec.color}22`,color:sec.color,fontSize:11,padding:'2px 10px',borderRadius:10,fontWeight:600}}>{sec.coeff}</span>
                  <span style={{background:'rgba(255,255,255,0.05)',color:'var(--muted)',fontSize:11,padding:'2px 10px',borderRadius:10,fontWeight:600}}>
                    {isMaths ? 'Mathematiques' : isInfo_m ? 'Informatique' : isAnglais ? 'Anglais' : isSvt ? 'SVT' : isFrancais ? 'Francais' : isEconomie ? 'Economie' : isGestion ? 'Gestion' : 'Physique-Chimie'}
                  </span>
                </div>
                <p style={{fontSize:12,color:'var(--text2)',margin:0}}>{sec.desc}</p>
              </div>
            </div>
            <div style={{fontSize:12,color:'var(--muted)',textAlign:'right'}}>
              <div>📅 2015 → 2025 · 11 années</div>
              <div style={{marginTop:4}}>📌 Session principale + 🔄 Session contrôle</div>
            </div>
          </div>

          {/* SIMULATION IA */}
          <div style={{background:'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.08))',border:'1px solid rgba(99,102,241,0.25)',borderRadius:14,padding:'16px 22px',marginBottom:28,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:15}}>🎯 Simuler un Bac Complet — {sec.label}</p>
              <p style={{margin:'3px 0 0',fontSize:12,color:'var(--muted)'}}>🧠 IA · 10 examens originaux · correction détaillée · analyse des faiblesses · remédiation personnalisée</p>
            </div>
            <button onClick={lancerSimulation} className="btn btn-primary"
              style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',padding:'11px 22px',fontWeight:700,fontSize:14,cursor:'pointer',borderRadius:12,color:'white',boxShadow:'0 6px 20px rgba(99,102,241,0.45)',display:'flex',alignItems:'center',gap:8}}>
              🧠 Lancer la Simulation IA →
            </button>
          </div>

          {/* GRILLE ANNÉES */}
          <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14,fontWeight:600}}>
            Sélectionnez une année pour accéder aux 2 sessions
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12,marginBottom:32}}>
            {sec.data.map(a => {
              const sel = selectedYear === a.year
              return (
                <div key={a.year} onClick={() => setSelectedYear(sel ? null : a.year)}
                  style={{cursor:'pointer',textAlign:'center',padding:'18px 10px',background:sel?`${sec.color}18`:'var(--surface)',border:sel?`2px solid ${sec.color}`:'1px solid var(--border)',borderRadius:14,transition:'all 0.2s',boxShadow:sel?`0 6px 24px ${sec.color}30`:'none',transform:sel?'translateY(-3px)':'none'}}
                  onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor=`${sec.color}70`;e.currentTarget.style.transform='translateY(-2px)'}}}
                  onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}}>
                  <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:30,color:sel?sec.color:'var(--text)',marginBottom:6}}>{a.year}</div>
                  <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap',marginBottom:6}}>
                    <span style={{fontSize:9,background:'rgba(79,110,247,0.1)',color:'#4f6ef7',border:'1px solid rgba(79,110,247,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>📌 Princ.</span>
                    <span style={{fontSize:9,background:'rgba(245,158,11,0.1)',color:'#f59e0b',border:'1px solid rgba(245,158,11,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>🔄 Ctrl.</span>
                  </div>
                  {a.note && <div style={{fontSize:10,color:'#f5c842',fontWeight:700}}>{a.note} Nouveau</div>}
                </div>
              )
            })}
          </div>

          {/* DÉTAIL ANNÉE */}
          {detail && (
            <div style={{background:'var(--surface)',border:`2px solid ${sec.color}40`,borderRadius:20,padding:28,animation:'fadeInUp 0.25s ease both'}}>

              {/* En-tête */}
              <div style={{marginBottom:24}}>
                <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:8}}>
                  <span style={{fontSize:22}}>{sec.icon}</span>
                  <h3 style={{margin:0}}>{isMaths ? 'Bac' : isInfo_m ? 'Informatique' : isAnglais ? '🇬🇧 Anglais' : isSvt ? '🌱 SVT' : isFrancais ? '📚 Francais' : isEconomie ? '📈 Économie' : isGestion ? '💼 Gestion' : 'Physique-Chimie'} {sec.label} — {selectedYear}</h3>
                  <span style={{fontSize:11,background:'rgba(6,214,160,0.12)',color:'#06d6a0',border:'1px solid rgba(6,214,160,0.3)',padding:'3px 10px',borderRadius:10,fontWeight:600}}>
                    ✅ Sujets + Corrections disponibles
                  </span>
                </div>
                <p style={{fontSize:13,color:'var(--muted)',margin:0}}>
                  Barème total : <strong style={{color:'var(--text)'}}>{ptTotal}/20</strong>
                  {' · '}Source officielle : <strong>bacweb.tn (CNTE)</strong>
                  {' · '}Cliquez sur un bouton pour lire ou télécharger le PDF
                </p>
              </div>

              {/* SESSIONS */}
              <SessionsBlock
                year={selectedYear!}
                secKey={activeSec}
                color={sec.color}
                links={(sec.links as Record<number,AnneeLinks>)[selectedYear!]}
                infoL={activeSec === 'info-algo' ? infoLinks[selectedYear!] : undefined}
                onOpen={openPdf}
              />

              {/* BARÈME EXERCICES */}
              <div style={{background:`${sec.color}08`,border:`1px solid ${sec.color}20`,borderRadius:12,padding:'14px 18px',marginBottom:20}}>
                <p style={{margin:'0 0 12px',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>
                  📊 Contenu du sujet session principale
                </p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}}>
                  {detail.exercices.map((ex,i) => (
                    <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:`3px solid ${sec.color}`,borderRadius:10,padding:'12px 14px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,alignItems:'flex-start',gap:8}}>
                        <span style={{fontWeight:700,fontSize:12,color:sec.color}}>{ex.titre}</span>
                        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'#f5c842',background:'rgba(245,200,66,0.12)',padding:'1px 7px',borderRadius:6,fontWeight:700,flexShrink:0}}>{ex.pts} pts</span>
                      </div>
                      <p style={{fontSize:11,color:'var(--text2)',lineHeight:1.55,margin:0}}>{ex.theme}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div style={{padding:'8px 14px',background:'var(--surface2)',borderRadius:10,fontSize:11,color:'var(--muted)',display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
                <span>🏛️</span>
                <span>Source officielle :</span>
                <a href="http://www.bacweb.tn" target="_blank" rel="noreferrer" style={{color:'var(--accent)'}}>bacweb.tn (CNTE)</a>
                <span>·</span>
                <a href="https://www.reviserbac.tn/sujets" target="_blank" rel="noreferrer" style={{color:'var(--accent)'}}>reviserbac.tn</a>
                <span>·</span>
                <a href="https://www.sigmaths.net/bac.php" target="_blank" rel="noreferrer" style={{color:'var(--accent)'}}>sigmaths.net</a>
              </div>
            </div>
          )}

          {/* AUTRES SECTIONS */}
          <div style={{marginTop:52,paddingTop:36,borderTop:'1px solid var(--border)'}}>
            <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16,fontWeight:600}}>Autres sections</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
              {sections.filter(s => s.key !== activeSec).map(s => (
                <button key={s.key} onClick={() => {setActiveSec(s.key); setSelectedYear(null); window.scrollTo({top:0,behavior:'smooth'})}}
                  style={{display:'flex',gap:12,alignItems:'center',padding:16,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,cursor:'pointer',textAlign:'left',transition:'all 0.2s',fontFamily:'var(--font-body)'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${s.color}60`;e.currentTarget.style.transform='translateY(-2px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}>
                  <span style={{fontSize:26}}>{s.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:'var(--text)'}}>{s.label}</div>
                    <div style={{fontSize:10,color:s.color,fontWeight:600,marginTop:2}}>{s.coeff} · 11 années · 2 sessions</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer/>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>
    </>
  )
}