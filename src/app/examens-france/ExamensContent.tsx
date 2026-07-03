'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Exercice, ChapitreData, Session, AnneeLinks, ExData, AnneeData, SKey, NSILinks } from './exam-data'

type ExamDataMod = typeof import('./exam-data')

function PdfModal({ url, title, onClose }: { url:string; title:string; onClose:()=>void }) {
  useEffect(()=>{
    const fn = (e:KeyboardEvent) => { if(e.key==='Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return ()=>{ document.removeEventListener('keydown', fn); document.body.style.overflow='' }
  },[onClose])

  const isPdf    = url.endsWith('.pdf')
  const isGDrive = url.includes('drive.google.com')

  // ⚡ Google Docs Viewer : passe par viewer pour tout PDF APMEP
  const iframeSrc = isPdf
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
    : url

  const downloadHref = isGDrive ? url.replace('/preview','/view') : url

  return (
    <div onClick={onClose}
      style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.9)',zIndex:9999,display:'flex',flexDirection:'column'}}>

      {/* Barre titre — identique page Tunisie */}
      <div onClick={e=>e.stopPropagation()}
        style={{display:'flex',alignItems:'center',gap:12,padding:'10px 18px',background:'#0d0d1a',borderBottom:'1px solid rgba(255,255,255,0.08)',flexShrink:0,flexWrap:'wrap'}}>
        <span style={{fontSize:18}}>📄</span>
        <div style={{flex:1,minWidth:0}}>
          <p style={{margin:'0 0 1px',fontWeight:700,fontSize:13,color:'white',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{title}</p>

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
          <button onClick={onClose}
            style={{padding:'6px 14px',borderRadius:8,border:'1px solid rgba(255,255,255,0.2)',background:'transparent',color:'white',cursor:'pointer',fontSize:14,fontWeight:700}}>
            ✕
          </button>
        </div>
      </div>

      {/* Viewer iframe — Google Docs Viewer */}
      <div onClick={e=>e.stopPropagation()} style={{flex:1,background:'#1a1a2e',position:'relative'}}>
        <iframe
          src={iframeSrc}
          style={{width:'100%',height:'100%',border:'none'}}
          title={title}
          allow="autoplay"
        />
      </div>
    </div>
  )
}

// ── Bouton PDF ────────────────────────────────────────────────
const INTEGRALES = ['Spe_annee_2024_DV_FH4.pdf','annee_2023_spe_DV.pdf','Annee_spe_2025_DV.pdf']
const isIntegrale = (url?:string) => url ? INTEGRALES.some(i => url.includes(i)) : false

function BtnLink({ label, url, color, onOpen }:{label:string;url?:string;color:string;onOpen:(u:string,t:string)=>void}) {
  if (!url) return null
  // Si le sujet pointe vers l'intégrale, ne pas afficher le bouton Sujet
  if (label.includes('Sujet') && isIntegrale(url)) return null
  return (
    <button onClick={()=>onOpen(url,label)}
      style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 14px',borderRadius:9,border:`1.5px solid ${color}50`,background:`${color}12`,color,cursor:'pointer',fontSize:12,fontWeight:700,transition:'all 0.15s',fontFamily:'var(--font-body)'}}
      onMouseEnter={e=>{e.currentTarget.style.background=`${color}26`;e.currentTarget.style.transform='translateY(-1px)'}}
      onMouseLeave={e=>{e.currentTarget.style.background=`${color}12`;e.currentTarget.style.transform='none'}}>
      {label}
    </button>
  )
}

// ── Bloc sessions — grille comme page Tunisie ─────────────────
function SessionsBlock({ lnk, color, year, onOpen }:{
  lnk:AnneeLinks; color:string; year:number; onOpen:(u:string,t:string)=>void
}) {
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14,marginBottom:20}}>
      {lnk.sessions.map((s,i)=>(
        <div key={i} style={{
          background: i%2===0 ? 'rgba(79,110,247,0.06)' : 'rgba(245,158,11,0.06)',
          border: `1px solid ${i%2===0 ? 'rgba(79,110,247,0.4)' : 'rgba(245,158,11,0.4)'}`,
          borderRadius:14, padding:18
        }}>
          <p style={{margin:'0 0 12px',fontWeight:700,fontSize:13,color:'var(--text)',display:'flex',alignItems:'center',gap:8}}>
            {s.flag && <span style={{fontSize:18}}>{s.flag}</span>}
            {s.label}
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <BtnLink
              label="📄 Sujet"
              url={s.sujet}
              color={color}
              onOpen={(u)=>onOpen(u,`📄 Sujet — ${s.label} · ${year}`)}
            />
            <BtnLink
              label="✅ Correction"
              url={s.correction}
              color="#06d6a0"
              onOpen={(u)=>onOpen(u,`✅ Correction — ${s.label} · ${year}`)}
            />
          </div>
          {!s.sujet && !s.correction && (
            <p style={{margin:0,fontSize:12,color:'var(--muted)'}}>Non disponible</p>
          )}
        </div>
      ))}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
//  PAGE PRINCIPALE — Architecture identique page Tunisie
// ════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
//  COMPOSANT PREMIÈRE — Vue par chapitres avec exercices inline
// ══════════════════════════════════════════════════════════════
function PremiereView({ chapitres }: { chapitres: ChapitreData[] }) {
  const [selectedChap, setSelectedChap] = useState<string|null>(null)
  const [selectedEx, setSelectedEx]     = useState<string|null>(null)

  const chap = chapitres.find(c => c.id === selectedChap)

  return (
    <div>
      {/* GRILLE CHAPITRES */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12,marginBottom:28}}>
        {chapitres.map(c => {
          const sel = selectedChap === c.id
          return (
            <div key={c.id} onClick={()=>{setSelectedChap(sel?null:c.id);setSelectedEx(null)}}
              style={{cursor:'pointer',background:sel?`${c.color}15`:'var(--surface)',
                border:`2px solid ${sel?c.color:'var(--border)'}`,borderRadius:14,
                padding:'16px 14px',transition:'all 0.2s',
                boxShadow:sel?`0 6px 20px ${c.color}30`:'none',
                transform:sel?'translateY(-2px)':'none'}}
              onMouseEnter={e=>{if(!sel)e.currentTarget.style.borderColor=`${c.color}60`}}
              onMouseLeave={e=>{if(!sel)e.currentTarget.style.borderColor='var(--border)'}}>
              <div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
              <div style={{fontWeight:800,fontSize:13,color:sel?c.color:'var(--text)',marginBottom:3}}>
                Ch. {c.numero} — {c.titre}
              </div>
              <div style={{fontSize:11,color:'var(--muted)',marginBottom:8}}>{c.sousTitre}</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                <span style={{fontSize:10,background:`${c.color}15`,color:c.color,border:`1px solid ${c.color}40`,
                  padding:'2px 8px',borderRadius:20,fontWeight:700}}>
                  {c.exercices.length} exercices
                </span>
                <span style={{fontSize:10,background:'rgba(6,214,160,0.1)',color:'#06d6a0',
                  border:'1px solid rgba(6,214,160,0.25)',padding:'2px 8px',borderRadius:20,fontWeight:700}}>
                  ✅ {c.exercices.filter(e=>e.correction).length} corrigés
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* DETAIL CHAPITRE */}
      {chap && (
        <div style={{background:'var(--surface)',border:`2px solid ${chap.color}40`,borderRadius:20,
          padding:'24px 28px',animation:'fadeInUp 0.25s ease both'}}>
          {/* Header chapitre */}
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}>
            <div style={{width:44,height:44,borderRadius:12,background:`${chap.color}20`,
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>
              {chap.icon}
            </div>
            <div>
              <h2 style={{margin:0,fontSize:18,fontWeight:800,color:chap.color}}>
                Chapitre {chap.numero} — {chap.titre}
              </h2>
              <p style={{margin:0,fontSize:12,color:'var(--muted)'}}>{chap.sousTitre}</p>
            </div>
          </div>

          {/* Notions clés */}
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:20}}>
            {chap.notions.map(n=>(
              <span key={n} style={{fontSize:11,background:`${chap.color}12`,color:chap.color,
                border:`1px solid ${chap.color}35`,padding:'3px 10px',borderRadius:20,fontWeight:600}}>
                {n}
              </span>
            ))}
          </div>

          {/* Liste exercices */}
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {chap.exercices.map((ex, i) => {
              const exSel = selectedEx === ex.id
              const diffColor = ex.difficulte===1?'#22c55e':ex.difficulte===2?'#f59e0b':ex.difficulte===3?'#ef4444':'#8b5cf6'
              const stars = '★'.repeat(ex.difficulte) + '✩'.repeat(4-ex.difficulte)
              return (
                <div key={ex.id}
                  style={{border:`1.5px solid ${exSel?chap.color:diffColor+'40'}`,borderRadius:14,
                    background:exSel?`${chap.color}08`:'var(--bg)',overflow:'hidden'}}>
                  {/* En-tête exercice */}
                  <div onClick={()=>setSelectedEx(exSel?null:ex.id)}
                    style={{padding:'14px 18px',cursor:'pointer',display:'flex',
                      justifyContent:'space-between',alignItems:'center',gap:12}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                        <span style={{fontSize:12,fontWeight:800,color:'var(--muted)'}}>Ex. {i+1}</span>
                        <span style={{fontSize:13,fontWeight:700,color:'var(--text)'}}>{ex.titre}</span>
                      </div>
                      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                        <span style={{fontSize:10,color:diffColor,fontWeight:700}}>{stars} (niv. {ex.difficulte})</span>
                        <span style={{fontSize:10,color:'var(--muted)'}}>📚 {ex.source}</span>
                        {ex.notions.slice(0,2).map(n=>(
                          <span key={n} style={{fontSize:10,background:'var(--surface)',color:'var(--muted)',
                            border:'1px solid var(--border)',padding:'1px 6px',borderRadius:10}}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{color:exSel?chap.color:'var(--muted)',fontSize:18,transition:'transform 0.2s',
                      transform:exSel?'rotate(180deg)':'none'}}>▾</div>
                  </div>

                  {/* Contenu (énoncé + correction) */}
                  {exSel && (
                    <div style={{borderTop:`1px solid ${chap.color}30`,padding:'18px 20px'}}>
                      {/* ÉNONCÉ */}
                      <div style={{marginBottom:20}}>
                        <p style={{margin:'0 0 10px',fontSize:11,fontWeight:700,textTransform:'uppercase',
                          letterSpacing:'0.08em',color:chap.color}}>📝 Énoncé</p>
                        <div style={{fontSize:14,lineHeight:1.75,whiteSpace:'pre-line',
                          background:'var(--surface)',borderRadius:10,padding:'14px 16px',
                          border:`1px solid ${chap.color}25`}}>
                          {ex.enonce}
                        </div>
                      </div>
                      {/* CORRECTION */}
                      <div>
                        <p style={{margin:'0 0 10px',fontSize:11,fontWeight:700,textTransform:'uppercase',
                          letterSpacing:'0.08em',color:'#06d6a0'}}>✅ Correction</p>
                        <div style={{fontSize:14,lineHeight:1.85,whiteSpace:'pre-line',
                          background:'rgba(6,214,160,0.05)',borderRadius:10,padding:'14px 16px',
                          border:'1px solid rgba(6,214,160,0.25)',fontFamily:'var(--font-body)'}}>
                          {ex.correction}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

type Matiere = 'maths' | 'physique-chimie' | 'informatique' | 'anglais' | 'svt' | 'francais' | 'eco-gestion' | null

export default function ExamensFrancePage({ data }: { data: ExamDataMod }) {
  const {
    AP, SD, SDB, LLY, chapI, chapII,
    chapIII, chapIV, chapV, chapVI, chapVII, CHAPITRES_PREMIERE,
    linksGenerale, dataGenerale, linksTechno, linksExpertes, dataTechno, dataExpertes,
    CHAPITRES_SECONDE, linksPhysiqueChimie, dataPhysiqueChimie, CHAPITRES_SECONDE_PC, CHAPITRES_PREMIERE_PC, linksFrancaisTerminale,
    dataFrancaisTerminale, CHAPITRES_SECONDE_FRANCAIS, CHAPITRES_PREMIERE_FRANCAIS, dataFrancaisPremiere, linksFrancaisPremiere, SECTIONS_FRANCAIS,
    dataSTI2DPC, linksSTI2DPC, dataSTESPC, linksSTESPC, SDI, linksNSITerminale,
    linksNSIPremiereAnticipee, dataNSITerminale, dataNSIPremiere, CHAPITRES_SECONDE_NSI, CHAPITRES_PREMIERE_NSI, linksAnglaisTerminale,
    linksAnglaisPremiereAnticipee, dataAnglaisTerminale, dataAnglaisPremiereAnticipee, linksTerminaleSVT, dataTerminaleSVT, SECTIONS_SVT_EXAM,
    CHAPITRES_PREMIERE_SVT, CHAPITRES_SECONDE_SVT, SECTIONS_ANGLAIS, CHAPITRES_SECONDE_ANGLAIS, CHAPITRES_PREMIERE_ANGLAIS, SECTIONS_NSI,
    dataMathsPremiere, linksMathsPremiere, SECTIONS, linksTerminaleECO, dataTerminaleECO, chapSecEcoI,
    chapSecEcoII, chapSecEcoIII, chapSecEcoIV, chapSecEcoV, CHAPITRES_SECONDE_ECO, chapPreEcoI,
    chapPreEcoII, chapPreEcoIII, chapPreEcoIV, chapPreEcoV, chapPreEcoVI, chapPreEcoVII,
    chapPreEcoVIII, chapPreEcoIX, CHAPITRES_PREMIERE_ECO, chapStmgEcoI, chapStmgEcoII, chapStmgEcoIII,
    chapStmgEcoIV, chapStmgEcoV, CHAPITRES_STMG_ECO, SECTIONS_ECO_EXAM,
  } = data
  const router = useRouter()
  const [matiere,setMatiere]           = useState<Matiere>(null)
  const [activeSec,setActiveSec]       = useState<SKey>('terminale-generale')
  const [selectedYear,setSelectedYear] = useState<number|null>(null)
  const [modal,setModal]               = useState<{url:string;title:string}|null>(null)

  const secNSI      = SECTIONS_NSI.find(s=>s.key===activeSec)
  const secAnglais  = SECTIONS_ANGLAIS.find(s=>s.key===activeSec)
  const secSVT      = SECTIONS_SVT_EXAM.find(s=>s.key===activeSec)
  const secFrancais = SECTIONS_FRANCAIS.find(s=>s.key===activeSec)
  const secEco      = SECTIONS_ECO_EXAM.find(s=>s.key===activeSec)
  const sec         = secNSI || secAnglais || secSVT || secFrancais || secEco || SECTIONS.find(s=>s.key===activeSec)!
  const detail     = sec.data.find((a:any)=>a.year===selectedYear)
  const anneeLinks = selectedYear ? (sec.links as any)[selectedYear] : null
  const ptTotal    = detail?.exercices.reduce((t,e)=>t+e.pts,0)??0

  const openPdf = (url:string,title:string) => setModal({url,title})
  const lancerSimulation = () => router.push('/simulation-france')

  const goSec = (key:SKey) => {
    setActiveSec(key)
    setSelectedYear(null)
    const nsiKeys:SKey[]  = ['terminale-nsi','premiere-nsi','seconde-snt']
    const mathKeys:SKey[] = ['terminale-generale','terminale-maths-expertes','terminale-technologique','premiere-specialite','seconde-maths']
    const pcKeys:SKey[] = ['terminale-physique-chimie','seconde-physique-chimie','sti2d-physique-chimie','stes-physique-chimie']
    const anglaisKeys:SKey[] = ['terminale-anglais','premiere-anglais','seconde-anglais']
    const svtKeys:SKey[] = ['terminale-svt','premiere-svt','seconde-svt']
    const francaisKeys:SKey[] = ['terminale-francais','premiere-francais','seconde-francais']
    const ecoKeys:SKey[] = ['terminale-eco-gestion','seconde-eco-gestion','premiere-eco-gestion','stmg-eco-gestion']
    setMatiere(mathKeys.includes(key) ? 'maths' : nsiKeys.includes(key) ? 'informatique' : anglaisKeys.includes(key) ? 'anglais' : svtKeys.includes(key) ? 'svt' : francaisKeys.includes(key) ? 'francais' : ecoKeys.includes(key) ? 'eco-gestion' : 'physique-chimie')
  }

  // ── PAGE INTERMÉDIAIRE ──────────────────────────────────────
  if (matiere === null) {
    return (
      <>
        <Navbar/>
        <main style={{position:'relative',zIndex:1,paddingTop:80,minHeight:'100vh'}}>
          <div className="container" style={{paddingTop:64,paddingBottom:80,maxWidth:960}}>

            <div style={{textAlign:'center',marginBottom:52}}>
              <span className="label">📋 Examens Officiels · Bac France</span>
              <h1 style={{fontSize:'clamp(28px,4vw,50px)',marginBottom:16,marginTop:12,lineHeight:1.15}}>
                5 Ans d&#39;Annales Officielles<br/>
                <span style={{background:'linear-gradient(90deg,#6366f1,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                  2021 → 2025 · Sujets + Corrections PDF
                </span>
              </h1>
              <p style={{color:'var(--text2)',fontSize:15,maxWidth:520,margin:'0 auto',lineHeight:1.7}}>
                Choisissez votre matière pour accéder aux annales officielles du Baccalauréat général.
              </p>
            </div>

            {/* CARTES MATIÈRES */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20,marginBottom:52}}>

              {/* MATHS */}
              <button
                onClick={()=>{ setMatiere('maths'); setActiveSec('terminale-generale') }}
                style={{padding:'36px 28px',background:'rgba(99,102,241,0.06)',border:'1.5px solid rgba(99,102,241,0.22)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.22s',fontFamily:'var(--font-body)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(99,102,241,0.55)';e.currentTarget.style.background='rgba(99,102,241,0.11)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(99,102,241,0.22)';e.currentTarget.style.background='rgba(99,102,241,0.06)'}}>
                <div style={{fontSize:52,marginBottom:14}}>📐</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#818cf8'}}>Mathématiques</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>
                  Spécialité Terminale · Maths Expertes · Techno STMG/STI2D · Première · Seconde
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Terminale Générale','Maths Expertes','Techno','Première','Seconde'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(99,102,241,0.12)',color:'#818cf8',fontWeight:600}}>{t}</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#818cf8',fontWeight:700,fontSize:13}}>
                  Voir les annales →
                </span>
              </button>

              {/* PHYSIQUE-CHIMIE */}
              <button
                onClick={()=>{ setMatiere('physique-chimie'); setActiveSec('terminale-physique-chimie') }}
                style={{padding:'36px 28px',background:'rgba(6,182,212,0.06)',border:'1.5px solid rgba(6,182,212,0.22)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.22s',fontFamily:'var(--font-body)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(6,182,212,0.55)';e.currentTarget.style.background='rgba(6,182,212,0.11)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(6,182,212,0.22)';e.currentTarget.style.background='rgba(6,182,212,0.06)'}}>
                <div style={{fontSize:52,marginBottom:14}}>⚗️</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#22d3ee'}}>Physique-Chimie</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>
                  Spécialité Terminale · Seconde · STI2D & ST2S (bientôt)
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Terminale Phy-Chimie','Seconde'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(6,182,212,0.12)',color:'#22d3ee',fontWeight:600}}>{t}</span>
                  ))}
                  {['STI2D','ST2S'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(255,255,255,0.04)',color:'var(--muted)',fontWeight:600}}>{t} bientôt</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#22d3ee',fontWeight:700,fontSize:13}}>
                  Voir les annales →
                </span>
              </button>

              {/* INFORMATIQUE NSI */}
              <button
                onClick={()=>{ setMatiere('informatique'); setActiveSec('terminale-nsi') }}
                style={{padding:'36px 28px',background:'rgba(139,92,246,0.06)',border:'1.5px solid rgba(139,92,246,0.25)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.2s',fontFamily:'var(--font-body)',color:'var(--text)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(139,92,246,0.55)';e.currentTarget.style.boxShadow='0 20px 60px rgba(139,92,246,0.18)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(139,92,246,0.25)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{fontSize:52,marginBottom:14}}>💻</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#a78bfa'}}>Informatique NSI</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>Spécialité NSI Terminale · Première NSI · Seconde SNT</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Terminale NSI','Première NSI','Seconde SNT'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(139,92,246,0.12)',color:'#a78bfa',fontWeight:600}}>{t}</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#a78bfa',fontWeight:700,fontSize:13}}>Voir les annales →</span>
              </button>

              {/* ANGLAIS */}
              <button
                onClick={()=>{ setMatiere('anglais'); setActiveSec('terminale-anglais') }}
                style={{padding:'36px 28px',background:'rgba(244,63,94,0.06)',border:'1.5px solid rgba(244,63,94,0.22)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.22s',fontFamily:'var(--font-body)',color:'var(--text)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(244,63,94,0.55)';e.currentTarget.style.boxShadow='0 20px 60px rgba(244,63,94,0.18)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(244,63,94,0.22)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{fontSize:52,marginBottom:14}}>🇬🇧</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#fb7185'}}>Anglais LVA/LVB</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>
                  Terminale · Première · 8 axes thématiques · Métropole + DOM-TOM
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Terminale LVA/LVB','Première (anticipée)','Seconde'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(244,63,94,0.12)',color:'#fb7185',fontWeight:600}}>{t}</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#fb7185',fontWeight:700,fontSize:13}}>Voir les annales →</span>
              </button>


              {/* SVT */}
              <button
                onClick={()=>{ setMatiere('svt'); setActiveSec('terminale-svt') }}
                style={{padding:'36px 28px',background:'rgba(34,197,94,0.06)',border:'1.5px solid rgba(34,197,94,0.22)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.22s',fontFamily:'var(--font-body)',color:'var(--text)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(34,197,94,0.55)';e.currentTarget.style.boxShadow='0 20px 60px rgba(34,197,94,0.18)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(34,197,94,0.22)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{fontSize:52,marginBottom:14}}>🌱</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#86efac'}}>SVT</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>
                  Terminale Spécialité · Annales 2021→2025 · Métropole J1 &amp; J2<br/>
                  Seconde · 9 chapitres · 180 exercices corrigés
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Terminale Spé · Coef.16','Génétique & Évolution','Plantes & Paléoclimats','Corps humain','Seconde · 9 chapitres'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(34,197,94,0.12)',color:'#86efac',fontWeight:600}}>{t}</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#86efac',fontWeight:700,fontSize:13}}>Voir les annales →</span>
              </button>

              {/* FRANÇAIS / PHILOSOPHIE */}
              <button
                onClick={()=>{ setMatiere('francais'); setActiveSec('terminale-francais') }}
                style={{padding:'36px 28px',background:'rgba(139,92,246,0.06)',border:'1.5px solid rgba(139,92,246,0.22)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.22s',fontFamily:'var(--font-body)',color:'var(--text)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(139,92,246,0.55)';e.currentTarget.style.boxShadow='0 20px 60px rgba(139,92,246,0.18)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(139,92,246,0.22)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{fontSize:52,marginBottom:14}}>🧠</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#a78bfa'}}>Français · Philosophie</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>
                  Terminale Générale & Technologique · Dissertation · Explication de texte · HLP · Grand Oral
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Philo coef. 8','Terminale Générale','Série Techno','HLP coef. 16','Grand Oral coef. 8'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(139,92,246,0.12)',color:'#a78bfa',fontWeight:600}}>{t}</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#a78bfa',fontWeight:700,fontSize:13}}>Voir les annales →</span>
              </button>

              {/* ÉCONOMIE & GESTION */}
              <button
                onClick={()=>{ setMatiere('eco-gestion'); setActiveSec('terminale-eco-gestion') }}
                style={{padding:'36px 28px',background:'rgba(20,184,166,0.06)',border:'1.5px solid rgba(20,184,166,0.22)',borderRadius:20,cursor:'pointer',textAlign:'left',transition:'all 0.22s',fontFamily:'var(--font-body)',color:'var(--text)'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor='rgba(20,184,166,0.55)';e.currentTarget.style.boxShadow='0 20px 60px rgba(20,184,166,0.18)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(20,184,166,0.22)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{fontSize:52,marginBottom:14}}>📊</div>
                <h2 style={{fontSize:22,fontWeight:800,marginBottom:8,color:'#2dd4bf'}}>Économie &amp; Gestion</h2>
                <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.65,margin:'0 0 18px'}}>
                  SES Terminale · Annales 2021→2025 · Métropole France 1 &amp; 2<br/>
                  Seconde · Première · STMG · exercices corrigés
                </p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:20}}>
                  {['Terminale Spé · Coef.16','Croissance','Classes sociales','Politiques éco','Seconde · STMG'].map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 9px',borderRadius:20,background:'rgba(20,184,166,0.12)',color:'#2dd4bf',fontWeight:600}}>{t}</span>
                  ))}
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,color:'#2dd4bf',fontWeight:700,fontSize:13}}>Voir les annales →</span>
              </button>
            </div>

            {/* Lien Examens Tunisie */}
            <div style={{textAlign:'center',paddingTop:32,borderTop:'1px solid var(--border)'}}>
              <p style={{fontSize:13,color:'var(--muted)',marginBottom:14}}>Cherchez les examens tunisiens ?</p>
              <a href="/examens"
                style={{display:'inline-flex',gap:8,alignItems:'center',padding:'11px 24px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,textDecoration:'none',color:'var(--text)',fontWeight:600,fontSize:13,transition:'all 0.18s'}}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(220,38,38,0.4)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none' }}>
                🇹🇳 Examens Tunisie — Bac Maths · Sc.Ex · Techno
              </a>
            </div>
          </div>
        </main>
        <Footer/>
      </>
    )
  }

  return (
    <>
      <Navbar/>
      {modal && <PdfModal url={modal.url} title={modal.title} onClose={()=>setModal(null)}/>}

      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>

          {/* HEADER */}
          <div style={{marginBottom:36}}>
            <button onClick={()=>{setMatiere(null);setSelectedYear(null)}}
              style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:9,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--muted)',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'var(--font-body)',marginBottom:14,transition:'all 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(99,102,241,0.45)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              ← Toutes les matières
            </button>
            <span className="label" style={{marginLeft:8,fontSize:11}}>
              {matiere==='maths'?'📐 Mathématiques':matiere==='informatique'?'💻 Informatique NSI':matiere==='anglais'?'🇬🇧 Anglais':matiere==='svt'?'🌱 SVT':matiere==='francais'?'🧠 Français · Philosophie':matiere==='eco-gestion'?'📊 Économie & Gestion':'⚗️ Physique-Chimie'}
            </span>
            <h1 style={{fontSize:'clamp(26px,4vw,46px)',marginBottom:14}}>
              5 Ans d'Examens Officiels<br/>
              <span style={{color:'var(--accent)'}}>2021 → 2025 · Sujets + Corrections PDF</span>
            </h1>
            <p style={{maxWidth:560,color:'var(--text2)',lineHeight:1.7,marginBottom:10}}>
              Cliquez sur <strong>📄 Sujet</strong> ou <strong>✅ Correction</strong> pour lire le PDF
              directement ici — sans quitter le site. Bouton <strong>⬇ Télécharger</strong> disponible dans le viewer.
            </p>

          </div>

          
          {/* ONGLETS — 2 lignes : Maths / Physique-Chimie */}
          <div style={{marginBottom:28,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:15,padding:'8px 8px 6px',display:'flex',flexDirection:'column',gap:5}}>
            {/* Ligne Mathématiques */}
            {matiere==='maths' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>📐</span>
                {SECTIONS.filter(s=>(['terminale-generale','terminale-maths-expertes','terminale-technologique','premiere-specialite','seconde-maths'] as SKey[]).includes(s.key)).map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:`1px solid ${activeSec===s.key?s.color:'transparent'}`,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all 0.16s',whiteSpace:'nowrap',
                      background:activeSec===s.key?`${s.color}16`:'transparent',
                      color:activeSec===s.key?s.color:'var(--muted)'}}>
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                    <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}20`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)'}}>{s.coeff}</span>
                  </button>
                ))}
              </div>
            )}
            {/* Ligne SVT */}
            {matiere==='svt' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>🌱</span>
                {SECTIONS_SVT_EXAM.map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:`1px solid ${activeSec===s.key?s.color:'transparent'}`,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all 0.16s',whiteSpace:'nowrap',
                      background:activeSec===s.key?`${s.color}16`:'transparent',
                      color:activeSec===s.key?s.color:'var(--muted)'}}>
                    <span>{s.icon}</span><span>{s.label}</span>
                    <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}22`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)',marginLeft:2}}>{s.coeff}</span>
                  </button>
                ))}
              </div>
            )}
            {/* Ligne Économie & Gestion */}
            {matiere==='eco-gestion' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>📊</span>
                {SECTIONS_ECO_EXAM.map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:`1px solid ${activeSec===s.key?s.color:'transparent'}`,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all 0.16s',whiteSpace:'nowrap',
                      background:activeSec===s.key?`${s.color}16`:'transparent',
                      color:activeSec===s.key?s.color:'var(--muted)'}}>
                    <span>{s.icon}</span><span>{s.label}</span>
                    <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}22`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)',marginLeft:2}}>{s.coeff}</span>
                  </button>
                ))}
              </div>
            )}
            {/* Ligne Français / Philosophie */}
            {matiere==='francais' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>🧠</span>
                {SECTIONS_FRANCAIS.map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:`1px solid ${activeSec===s.key?s.color:'transparent'}`,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all 0.16s',whiteSpace:'nowrap',
                      background:activeSec===s.key?`${s.color}16`:'transparent',
                      color:activeSec===s.key?s.color:'var(--muted)'}}>
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                    <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}20`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)'}}>{s.coeff}</span>
                  </button>
                ))}
              </div>
            )}
            {/* Ligne Informatique NSI */}
            {/* Ligne Anglais */}
            {matiere==='anglais' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>🇬🇧</span>
                {SECTIONS_ANGLAIS.map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{padding:'8px 14px',borderRadius:9,border:`1.5px solid ${activeSec===s.key?s.color:'rgba(255,255,255,0.1)'}`,background:activeSec===s.key?`${s.color}18`:'transparent',color:activeSec===s.key?s.color:'var(--muted)',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'var(--font-body)',transition:'all 0.15s',display:'flex',alignItems:'center',gap:6,whiteSpace:'nowrap'}}>
                    <span>{s.icon}</span><span>{s.label}</span>
                    {activeSec===s.key&&<span style={{width:6,height:6,borderRadius:'50%',background:s.color,display:'inline-block'}}/>}
                  </button>
                ))}
              </div>
            )}
            {/* Ligne Informatique NSI */}
            {matiere==='informatique' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>💻</span>
                {SECTIONS_NSI.map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,transition:'all 0.15s',
                      background:activeSec===s.key?`${s.color}16`:'transparent',
                      color:activeSec===s.key?s.color:'var(--muted)'}}>
                    <span>{s.icon}</span><span>{s.label}</span>
                    <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}22`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)',marginLeft:2}}>{s.coeff}</span>
                  </button>
                ))}
              </div>
            )}
            {/* Ligne Physique-Chimie */}
            {matiere==='physique-chimie' && (
              <div style={{display:'flex',gap:3,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{fontSize:11,paddingLeft:6,paddingRight:6,color:'var(--muted)',fontWeight:700}}>⚗️</span>
                {SECTIONS.filter(s=>(['terminale-physique-chimie','premiere-physique-chimie','seconde-physique-chimie'] as SKey[]).includes(s.key)).map(s=>(
                  <button key={s.key} onClick={()=>goSec(s.key)}
                    style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:`1px solid ${activeSec===s.key?s.color:'transparent'}`,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all 0.16s',whiteSpace:'nowrap',
                      background:activeSec===s.key?`${s.color}16`:'transparent',
                      color:activeSec===s.key?s.color:'var(--muted)'}}>
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                    <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}20`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)'}}>{s.coeff}</span>
                  </button>
                ))}
                {/* STI2D + ST2S Physique-Chimie — actifs */}
                {(['sti2d-physique-chimie','stes-physique-chimie'] as SKey[]).map(key=>{
                  const s = SECTIONS.find(x=>x.key===key)!
                  return (
                    <button key={s.key} onClick={()=>goSec(s.key)}
                      style={{display:'flex',alignItems:'center',gap:5,padding:'7px 12px',borderRadius:9,border:`1px solid ${activeSec===s.key?s.color:'transparent'}`,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all 0.16s',whiteSpace:'nowrap',
                        background:activeSec===s.key?`${s.color}16`:'transparent',
                        color:activeSec===s.key?s.color:'var(--muted)'}}>
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                      <span style={{fontSize:9,padding:'1px 6px',borderRadius:6,background:activeSec===s.key?`${s.color}20`:'var(--surface2)',color:activeSec===s.key?s.color:'var(--muted)'}}>{s.coeff}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* BANNIÈRE SECTION */}
          <div style={{background:`linear-gradient(135deg,${sec.color}12,${sec.color}04)`,border:`1px solid ${sec.color}28`,borderRadius:16,padding:'18px 24px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <div style={{display:'flex',gap:14,alignItems:'center'}}>
              <span style={{fontSize:30}}>{sec.icon}</span>
              <div>
                <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',marginBottom:4}}>
                  <h2 style={{fontSize:18,margin:0}}>{sec.label}</h2>
                  <span style={{background:`${sec.color}22`,color:sec.color,fontSize:11,padding:'2px 10px',borderRadius:10,fontWeight:600}}>{sec.coeff}</span>
                </div>
                <p style={{fontSize:12,color:'var(--text2)',margin:0}}>{sec.desc}</p>
              </div>
            </div>
            <div style={{fontSize:12,color:'var(--muted)',textAlign:'right'}}>
              {activeSec === 'premiere-specialite' ? (<>
                <div>📗 {CHAPITRES_PREMIERE.length} chapitres · {CHAPITRES_PREMIERE.reduce((t,c)=>t+c.exercices.length,0)} exercices corrigés</div>
              </>) : activeSec === 'seconde-anglais' ? (<>
                <div>📗 {CHAPITRES_SECONDE_ANGLAIS.length} chapitres · {CHAPITRES_SECONDE_ANGLAIS.reduce((t,c)=>t+c.exercices.length,0)} exercices corrigés</div>
              </>) : activeSec === 'premiere-anglais' ? (<>
                <div>📗 {CHAPITRES_PREMIERE_ANGLAIS.length} axes · {CHAPITRES_PREMIERE_ANGLAIS.reduce((t,c)=>t+c.exercices.length,0)} exercices corrigés</div>
              </>) : activeSec === 'premiere-francais' ? (<>
                <div>📗 5 objets d’étude · 100 exercices corrigés · EAF coef.5+2</div>
              </>) : activeSec === 'seconde-francais' ? (<>
                <div>📘 4 objets d’étude · 76 exercices corrigés</div>
              </>) : (<>
                <div>📅 2021 → 2025 · 5 années</div>
                <div style={{marginTop:4}}>📄 Sujet + ✅ Correction par centre d'examen</div>
              </>)}
            </div>
          </div>

          {/* SIMULATION IA */}
          <div style={{background:'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.08))',border:'1px solid rgba(99,102,241,0.25)',borderRadius:14,padding:'16px 22px',marginBottom:28,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:15}}>🎯 Simuler un Bac Complet — {sec.label}</p>
              <p style={{margin:'3px 0 0',fontSize:12,color:'var(--muted)'}}>🧠 IA · Examens originaux · Correction détaillée · Analyse des faiblesses · Remédiation</p>
            </div>
            <button onClick={lancerSimulation} className="btn btn-primary"
              style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',padding:'11px 22px',fontWeight:700,fontSize:14,cursor:'pointer',borderRadius:12,color:'white',boxShadow:'0 6px 20px rgba(99,102,241,0.45)',display:'flex',alignItems:'center',gap:8}}>
              🧠 Lancer la Simulation IA →
            </button>
          </div>

          {/* GRILLE ANNÉES ou DS PREMIÈRE ou SECONDE */}
          {/* ═══ NSI ═══ */}
          {matiere==='informatique' && activeSec==='premiere-nsi' && (
            <PremiereView chapitres={CHAPITRES_PREMIERE_NSI}/>
          )}
          {matiere==='informatique' && activeSec==='terminale-nsi' && (() => {
            const s = SECTIONS_NSI.find(x=>x.key===activeSec) || SECTIONS_ANGLAIS.find(x=>x.key===activeSec)!
            const years = Object.keys(s.links).map(Number).sort((a,b)=>b-a)
            return (
              <div>
                <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Sélectionnez une année</p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12,marginBottom:32}}>
                  {Object.keys(s.links).map(Number).sort((a,b)=>b-a).map((yr)=>{
                    const sel = selectedYear===yr
                    const nbSujets = Object.values((s.links as NSILinks)[yr]).reduce((t:number,pdfs:any)=>t+pdfs.length,0)
                    const hasCorr = Object.values((s.links as NSILinks)[yr]).some((pdfs:any)=>pdfs.some((p:any)=>p.correction))
                    return (
                      <div key={yr} onClick={()=>setSelectedYear(sel?null:yr)}
                        style={{cursor:'pointer',textAlign:'center',padding:'18px 10px',background:sel?`${s.color}18`:'var(--surface)',border:sel?`2px solid ${s.color}`:'1px solid var(--border)',borderRadius:14,transition:'all 0.2s',boxShadow:sel?`0 6px 24px ${s.color}30`:'none',transform:sel?'translateY(-3px)':'none'}}
                        onMouseEnter={e=>{if(!sel)e.currentTarget.style.borderColor=`${s.color}70`}}
                        onMouseLeave={e=>{if(!sel)e.currentTarget.style.borderColor='var(--border)'}}>
                        <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:30,color:sel?s.color:'var(--text)',marginBottom:6}}>{yr}</div>
                        <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap'}}>
                          <span style={{fontSize:9,background:`${s.color}15`,color:s.color,padding:'1px 6px',borderRadius:5}}>{nbSujets} sujet{nbSujets>1?'s':''}</span>
                          {hasCorr && <span style={{fontSize:9,background:'rgba(6,214,160,0.12)',color:'#06d6a0',padding:'1px 6px',borderRadius:5}}>✅ corrigé</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
                {selectedYear && (()=>{
                  const d = s.data.find((a:any)=>a.year===selectedYear)
                  const centres = (s.links as any)[selectedYear] || (s.links as any)[String(selectedYear)] || {}
                  return (
                    <div>
                      <h3 style={{fontSize:15,fontWeight:700,marginBottom:12,color:s.color}}>📄 Sujets & Corrections {selectedYear}</h3>
                      {Object.entries(centres).map(([centre,pdfs]:[string,any])=>(
                        <div key={centre} style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:`3px solid ${s.color}`,borderRadius:12,padding:'14px 18px',marginBottom:10}}>
                          <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>{centre}</div>
                          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                            {pdfs.map((pdf:any,i:number)=>(
                              <div key={i} style={{display:'flex',gap:6}}>
                                <button onClick={()=>openPdf(pdf.sujet,(pdf as any).label||`NSI ${selectedYear} — ${centre}${pdfs.length>1?' '+(i+1):''}`)}
                                  style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 14px',background:`${s.color}14`,border:`1px solid ${s.color}30`,borderRadius:9,color:s.color,fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:'var(--font-body)'}}>
                                  📄 {(pdf as any).label||(pdfs.length>1?`Sujet ${i+1}`:'Sujet')}
                                </button>
                                {pdf.correction&&<button onClick={()=>openPdf(pdf.correction,`NSI ${selectedYear} — ${centre} Correction${pdfs.length>1?' '+(i+1):''}`)}
                                  style={{display:'inline-flex',alignItems:'center',gap:5,padding:'7px 14px',background:'rgba(6,214,160,0.1)',border:'1px solid rgba(6,214,160,0.3)',borderRadius:9,color:'#06d6a0',fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:'var(--font-body)'}}>
                                  ✅ Correction{pdfs.length>1?` ${i+1}`:''}
                                </button>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })()}
              </div>
            )
          })()}

            {/* ── ANGLAIS — Seconde ──────────────────────────────── */}
            {matiere==='anglais' && activeSec==='seconde-anglais' && (
              <PremiereView chapitres={CHAPITRES_SECONDE_ANGLAIS}/>
            )}
            {/* ── ANGLAIS — Première ─────────────────────────────── */}
            {matiere==='anglais' && activeSec==='premiere-anglais' && (
              <PremiereView chapitres={CHAPITRES_PREMIERE_ANGLAIS}/>
            )}
            {/* Terminale Anglais — rendu via grille standard + SessionsBlock ci-dessous */}

            {matiere==='informatique' && activeSec==='seconde-snt' && (<PremiereView chapitres={CHAPITRES_SECONDE_NSI}/>)}
          {activeSec === 'seconde-maths' ? (
            <PremiereView chapitres={CHAPITRES_SECONDE}/>
          ) : activeSec === 'premiere-specialite' ? (
            <>
              {sec.links[2026] && (
                <div style={{background:`${sec.color}0d`,border:`2px solid ${sec.color}40`,borderRadius:18,padding:'20px 22px',marginBottom:26}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:6}}>
                    <span style={{fontSize:22}}>🆕</span>
                    <h3 style={{margin:0,fontSize:17}}>Épreuve anticipée de mathématiques — Session 2026</h3>
                    <span style={{fontSize:11,background:`${sec.color}1f`,color:sec.color,border:`1px solid ${sec.color}55`,padding:'3px 10px',borderRadius:10,fontWeight:700}}>Nouveauté · Métropole</span>
                  </div>
                  <p style={{fontSize:12.5,color:'var(--muted)',margin:'0 0 16px'}}>Première épreuve nationale anticipée (2h) : automatismes, probabilités, suites, fonctions.</p>
                  <SessionsBlock lnk={sec.links[2026] as AnneeLinks} color={sec.color} year={2026} onOpen={openPdf} />
                </div>
              )}
              <PremiereView chapitres={CHAPITRES_PREMIERE}/>
            </>
          ) : activeSec === 'premiere-francais' ? (
            <>
              {sec.links[2026] && (
                <div style={{background:`${sec.color}0d`,border:`2px solid ${sec.color}40`,borderRadius:18,padding:'20px 22px',marginBottom:26}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:6}}>
                    <span style={{fontSize:22}}>🆕</span>
                    <h3 style={{margin:0,fontSize:17}}>Épreuve anticipée de français (EAF) — Session 2026</h3>
                    <span style={{fontSize:11,background:`${sec.color}1f`,color:sec.color,border:`1px solid ${sec.color}55`,padding:'3px 10px',borderRadius:10,fontWeight:700}}>Métropole · 11 juin 2026</span>
                  </div>
                  <p style={{fontSize:12.5,color:'var(--muted)',margin:'0 0 16px'}}>Épreuve écrite (4h, coef. 5) : au choix commentaire de texte ou dissertation sur œuvre.</p>
                  <SessionsBlock lnk={sec.links[2026] as AnneeLinks} color={sec.color} year={2026} onOpen={openPdf} />
                </div>
              )}
              <PremiereView chapitres={CHAPITRES_PREMIERE_FRANCAIS}/>
            </>
          ) : activeSec === 'seconde-francais' ? (
            <PremiereView chapitres={CHAPITRES_SECONDE_FRANCAIS}/>
          ) : activeSec === 'seconde-physique-chimie' ? (
            <PremiereView chapitres={CHAPITRES_SECONDE_PC}/>
          ) : activeSec === 'premiere-physique-chimie' ? (
            <PremiereView chapitres={CHAPITRES_PREMIERE_PC}/>
          ) : (
            <div>
          {(matiere !== 'informatique' && activeSec !== 'seconde-anglais' && activeSec !== 'premiere-anglais' && matiere !== 'francais') && <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14,fontWeight:600}}>
            Sélectionnez une année pour accéder aux sujets et corrections
          </p>}
{(!secNSI && (!secAnglais || activeSec==='terminale-anglais') && !secSVT && !secFrancais && !secEco) && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12,marginBottom:32}}>
            {sec.data.map(a=>{
              const sel = selectedYear===a.year
              return (
                <div key={a.year} onClick={()=>setSelectedYear(sel?null:a.year)}
                  style={{cursor:'pointer',textAlign:'center',padding:'18px 10px',
                    background:sel?`${sec.color}18`:'var(--surface)',
                    border:sel?`2px solid ${sec.color}`:'1px solid var(--border)',
                    borderRadius:14,transition:'all 0.2s',
                    boxShadow:sel?`0 6px 24px ${sec.color}30`:'none',
                    transform:sel?'translateY(-3px)':'none'}}
                  onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor=`${sec.color}70`;e.currentTarget.style.transform='translateY(-2px)'}}}
                  onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}}>
                  <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:30,color:sel?sec.color:'var(--text)',marginBottom:6}}>{a.year}</div>
                  <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap',marginBottom:6}}>
                    <span style={{fontSize:9,background:'rgba(79,110,247,0.1)',color:'#4f6ef7',border:'1px solid rgba(79,110,247,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>📄 Sujet</span>
                    <span style={{fontSize:9,background:'rgba(6,214,160,0.1)',color:'#06d6a0',border:'1px solid rgba(6,214,160,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>✅ Corrigé</span>
                  </div>
                  {a.note && <div style={{fontSize:10,color:'#f5c842',fontWeight:700}}>{a.note} Nouveau</div>}
                </div>
              )
            })}
          </div>
          )}

          {/* DÉTAIL ANNÉE */}
          {selectedYear && detail && anneeLinks && !secNSI && (!secAnglais || activeSec==='terminale-anglais') && !secSVT && !secFrancais && !secEco && (
            <div style={{background:'var(--surface)',border:`2px solid ${sec.color}40`,borderRadius:20,padding:28,animation:'fadeInUp 0.25s ease both'}}>

              <div style={{marginBottom:24}}>
                <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:8}}>
                  <span style={{fontSize:22}}>{sec.icon}</span>
                  <h3 style={{margin:0}}>Bac {sec.label} — {selectedYear}</h3>
                  <span style={{fontSize:11,background:'rgba(6,214,160,0.12)',color:'#06d6a0',border:'1px solid rgba(6,214,160,0.3)',padding:'3px 10px',borderRadius:10,fontWeight:600}}>
                    ✅ {anneeLinks?.sessions?.length ?? Object.keys(anneeLinks||{}).length} sessions disponibles
                  </span>
                </div>
                <p style={{fontSize:13,color:'var(--muted)',margin:0}}>
                  Barème total : <strong style={{color:'var(--text)'}}>{ptTotal}/20</strong>
                </p>
              </div>

              {/* Sessions */}
              {!secNSI && (!secAnglais || activeSec==='terminale-anglais') && !secSVT && !secFrancais && !secEco && <SessionsBlock lnk={anneeLinks} color={sec.color} year={selectedYear} onOpen={openPdf} />}

              {/* BARÈME */}
              <div style={{background:`${sec.color}08`,border:`1px solid ${sec.color}20`,borderRadius:12,padding:'14px 18px',marginBottom:20}}>
                <p style={{margin:'0 0 12px',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>
                  📊 Contenu du sujet — Métropole Jour 1
                </p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}}>
                  {(detail?.exercices||[]).map((ex:any,i:number)=>(
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
            </div>
          )}
            </div>
          )}{/* fin ternaire premiere / normal */}
          {/* ── SVT — Terminale (annales) + Seconde (chapitres) ─── */}
          {secSVT && (
            <>
              {activeSec==='premiere-svt' && (
                <PremiereView chapitres={CHAPITRES_PREMIERE_SVT}/>
              )}
              {activeSec==='seconde-svt' && (
                <PremiereView chapitres={CHAPITRES_SECONDE_SVT}/>
              )}
              {activeSec==='terminale-svt' && (<>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12,marginBottom:32}}>
                  {sec.data.map(a=>{
                    const sel = selectedYear===a.year
                    return (
                      <div key={a.year} onClick={()=>setSelectedYear(sel?null:a.year)}
                        style={{cursor:'pointer',textAlign:'center',padding:'18px 10px',
                          background:sel?'rgba(34,197,94,0.18)':'var(--surface)',
                          border:sel?'2px solid #22c55e':'1px solid var(--border)',
                          borderRadius:14,transition:'all 0.2s',
                          boxShadow:sel?'0 6px 24px rgba(34,197,94,0.30)':'none',
                          transform:sel?'translateY(-3px)':'none'}}
                        onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor='rgba(34,197,94,0.5)';e.currentTarget.style.transform='translateY(-2px)'}}}
                        onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}}>
                        <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:30,color:sel?'#22c55e':'var(--text)',marginBottom:6}}>{a.year}</div>
                        <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap',marginBottom:6}}>
                          <span style={{fontSize:9,background:'rgba(34,197,94,0.1)',color:'#22c55e',border:'1px solid rgba(34,197,94,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>🌱 SVT · Spé</span>
                          <span style={{fontSize:9,background:'rgba(6,214,160,0.1)',color:'#06d6a0',border:'1px solid rgba(6,214,160,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>3h30 + ECE</span>
                        </div>
                        {a.note && <div style={{fontSize:10,color:'#f5c842',fontWeight:700}}>{a.note} Nouveau</div>}
                      </div>
                    )
                  })}
                </div>
                {selectedYear && detail && anneeLinks && (
                  <div style={{background:'var(--surface)',border:'2px solid rgba(34,197,94,0.4)',borderRadius:20,padding:28,marginBottom:24}}>
                    <div style={{marginBottom:20}}>
                      <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:8}}>
                        <span style={{fontSize:22}}>🌱</span>
                        <h3 style={{margin:0}}>SVT Spécialité — {selectedYear}</h3>
                        <span style={{fontSize:11,background:'rgba(34,197,94,0.12)',color:'#22c55e',border:'1px solid rgba(34,197,94,0.3)',padding:'3px 10px',borderRadius:10,fontWeight:600}}>
                          📄 {anneeLinks?.sessions?.length ?? 0} sessions · Métropole France
                        </span>
                      </div>
                      <p style={{fontSize:13,color:'var(--muted)',margin:0}}>Épreuve 3h30 + ECE 1h · Total : <strong style={{color:'var(--text)'}}>{ptTotal}/20</strong></p>
                    </div>
                    <SessionsBlock lnk={anneeLinks} color='#22c55e' year={selectedYear} onOpen={openPdf} />
                    <div style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px 18px',marginTop:16}}>
                      <p style={{margin:'0 0 10px',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>📊 Thèmes — Métropole Jour 1</p>
                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}}>
                        {(detail?.exercices||[]).map((ex:any,i:number)=>(
                          <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:'3px solid #22c55e',borderRadius:10,padding:'12px 14px'}}>
                            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,alignItems:'flex-start',gap:8}}>
                              <span style={{fontWeight:700,fontSize:12,color:'#22c55e'}}>{ex.titre}</span>
                              <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'#f5c842',background:'rgba(245,200,66,0.12)',padding:'1px 7px',borderRadius:6,fontWeight:700,flexShrink:0}}>{ex.pts} pts</span>
                            </div>
                            <p style={{fontSize:11,color:'var(--text2)',lineHeight:1.55,margin:0}}>{ex.theme}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>)}
            </>
          )}


          {/* ── ÉCONOMIE & GESTION — Terminale (annales) + Seconde/Première/STMG (chapitres) ─── */}
          {secEco && (
            <>
              {activeSec==='seconde-eco-gestion' && (CHAPITRES_SECONDE_ECO.length ? <PremiereView chapitres={CHAPITRES_SECONDE_ECO}/> : (
                <div style={{textAlign:'center',padding:'48px 20px',color:'var(--muted)'}}>
                  <div style={{fontSize:40,marginBottom:12}}>📝</div>
                  <p style={{fontSize:14,fontWeight:600,color:'var(--text2)',margin:'0 0 4px'}}>Chapitres Seconde SES — exercices corrigés en cours d’ajout.</p>
                  <p style={{fontSize:12,margin:0}}>Questions de cours & calculs courts · disponibles très prochainement.</p>
                </div>
              ))}
              {activeSec==='premiere-eco-gestion' && (CHAPITRES_PREMIERE_ECO.length ? <PremiereView chapitres={CHAPITRES_PREMIERE_ECO}/> : (
                <div style={{textAlign:'center',padding:'48px 20px',color:'var(--muted)'}}>
                  <div style={{fontSize:40,marginBottom:12}}>📝</div>
                  <p style={{fontSize:14,fontWeight:600,color:'var(--text2)',margin:'0 0 4px'}}>Chapitres Première SES — exercices corrigés en cours d’ajout.</p>
                  <p style={{fontSize:12,margin:0}}>Disponibles très prochainement.</p>
                </div>
              ))}
              {activeSec==='stmg-eco-gestion' && (CHAPITRES_STMG_ECO.length ? <PremiereView chapitres={CHAPITRES_STMG_ECO}/> : (
                <div style={{textAlign:'center',padding:'48px 20px',color:'var(--muted)'}}>
                  <div style={{fontSize:40,marginBottom:12}}>📝</div>
                  <p style={{fontSize:14,fontWeight:600,color:'var(--text2)',margin:'0 0 4px'}}>Chapitres STMG — exercices corrigés en cours d’ajout.</p>
                  <p style={{fontSize:12,margin:0}}>Disponibles très prochainement.</p>
                </div>
              ))}
              {activeSec==='terminale-eco-gestion' && (<>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12,marginBottom:32}}>
                  {sec.data.map(a=>{
                    const sel = selectedYear===a.year
                    return (
                      <div key={a.year} onClick={()=>setSelectedYear(sel?null:a.year)}
                        style={{cursor:'pointer',textAlign:'center',padding:'18px 10px',
                          background:sel?'rgba(20,184,166,0.18)':'var(--surface)',
                          border:sel?'2px solid #14b8a6':'1px solid var(--border)',
                          borderRadius:14,transition:'all 0.2s',
                          boxShadow:sel?'0 6px 24px rgba(20,184,166,0.30)':'none',
                          transform:sel?'translateY(-3px)':'none'}}
                        onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor='rgba(20,184,166,0.5)';e.currentTarget.style.transform='translateY(-2px)'}}}
                        onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}}>
                        <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:30,color:sel?'#14b8a6':'var(--text)',marginBottom:6}}>{a.year}</div>
                        <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap',marginBottom:6}}>
                          <span style={{fontSize:9,background:'rgba(20,184,166,0.1)',color:'#14b8a6',border:'1px solid rgba(20,184,166,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>📊 SES · Spé</span>
                          <span style={{fontSize:9,background:'rgba(6,214,160,0.1)',color:'#06d6a0',border:'1px solid rgba(6,214,160,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>4h</span>
                        </div>
                        {a.note && <div style={{fontSize:10,color:'#f5c842',fontWeight:700}}>{a.note} Nouveau</div>}
                      </div>
                    )
                  })}
                </div>
                {selectedYear && detail && anneeLinks && (
                  <div style={{background:'var(--surface)',border:'2px solid rgba(20,184,166,0.4)',borderRadius:20,padding:28,marginBottom:24}}>
                    <div style={{marginBottom:20}}>
                      <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:8}}>
                        <span style={{fontSize:22}}>📊</span>
                        <h3 style={{margin:0}}>SES Spécialité — {selectedYear}</h3>
                        <span style={{fontSize:11,background:'rgba(20,184,166,0.12)',color:'#14b8a6',border:'1px solid rgba(20,184,166,0.3)',padding:'3px 10px',borderRadius:10,fontWeight:600}}>
                          📄 {anneeLinks?.sessions?.length ?? 0} sessions · Métropole France
                        </span>
                      </div>
                      <p style={{fontSize:13,color:'var(--muted)',margin:0}}>Épreuve 4h · Dissertation <strong style={{color:'var(--text)'}}>OU</strong> épreuve composée (2 sujets au choix) · noté sur 20</p>
                    </div>
                    <SessionsBlock lnk={anneeLinks} color='#14b8a6' year={selectedYear} onOpen={openPdf} />
                    <div style={{background:'rgba(20,184,166,0.08)',border:'1px solid rgba(20,184,166,0.2)',borderRadius:12,padding:'14px 18px',marginTop:16}}>
                      <p style={{margin:'0 0 10px',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>📊 Contenu de l’épreuve</p>
                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}}>
                        {(detail?.exercices||[]).map((ex:any,i:number)=>(
                          <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:'3px solid #14b8a6',borderRadius:10,padding:'12px 14px'}}>
                            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,alignItems:'flex-start',gap:8}}>
                              <span style={{fontWeight:700,fontSize:12,color:'#14b8a6'}}>{ex.titre}</span>
                              <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'#f5c842',background:'rgba(245,200,66,0.12)',padding:'1px 7px',borderRadius:6,fontWeight:700,flexShrink:0}}>au choix</span>
                            </div>
                            <p style={{fontSize:11,color:'var(--text2)',lineHeight:1.55,margin:0}}>{ex.theme}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>)}
            </>
          )}

          {matiere==='francais' && activeSec!=='seconde-francais' && activeSec!=='premiere-francais' && (() => {
            const s = SECTIONS_FRANCAIS.find(x=>x.key===activeSec)!
            return (
              <div>
                <p style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Sélectionnez une année</p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12,marginBottom:32}}>
                  {Object.keys(s.links).map(Number).sort((a,b)=>b-a).map(yr=>{
                    const sel = selectedYear===yr
                    const nb = s.links[yr]?.sessions?.length ?? 0
                    const hasCorr = s.links[yr]?.sessions?.some((ss:any)=>ss.correction)
                    return (
                      <div key={yr} onClick={()=>setSelectedYear(sel?null:yr)}
                        style={{cursor:'pointer',textAlign:'center',padding:'18px 10px',
                          background:sel?'rgba(139,92,246,0.18)':'var(--surface)',
                          border:sel?'2px solid #8b5cf6':'1px solid var(--border)',
                          borderRadius:14,transition:'all 0.2s',
                          boxShadow:sel?'0 6px 24px rgba(139,92,246,0.30)':'none',
                          transform:sel?'translateY(-3px)':'none'}}
                        onMouseEnter={e=>{if(!sel){e.currentTarget.style.borderColor='rgba(139,92,246,0.5)';e.currentTarget.style.transform='translateY(-2px)'}}}
                        onMouseLeave={e=>{if(!sel){e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}}>
                        <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:30,color:sel?'#8b5cf6':'var(--text)',marginBottom:6}}>{yr}</div>
                        <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap',marginBottom:6}}>
                          <span style={{fontSize:9,background:'rgba(139,92,246,0.12)',color:'#a78bfa',border:'1px solid rgba(139,92,246,0.25)',padding:'2px 6px',borderRadius:5,fontWeight:600}}>🧠 Philo</span>
                          {hasCorr && <span style={{fontSize:9,background:'rgba(6,214,160,0.1)',color:'#06d6a0',padding:'2px 6px',borderRadius:5,fontWeight:600}}>✅ corrigé</span>}
                        </div>
                        {yr===2025 && <div style={{fontSize:10,color:'#f5c842',fontWeight:700}}>🆕 Nouveau</div>}
                      </div>
                    )
                  })}
                </div>
                {selectedYear && (() => {
                  const annLinks = s.links[selectedYear]
                  const detail = s.data.find((a:any)=>a.year===selectedYear)
                  if (!annLinks) return null
                  return (
                    <div style={{background:'var(--surface)',border:'2px solid rgba(139,92,246,0.4)',borderRadius:20,padding:28,marginBottom:24}}>
                      <div style={{marginBottom:20}}>
                        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:8}}>
                          <span style={{fontSize:22}}>🧠</span>
                          <h3 style={{margin:0}}>Philosophie — Bac {selectedYear}</h3>
                          <span style={{fontSize:11,background:'rgba(139,92,246,0.12)',color:'#a78bfa',border:'1px solid rgba(139,92,246,0.3)',padding:'3px 10px',borderRadius:10,fontWeight:600}}>
                            📄 {annLinks.sessions?.length ?? 0} sessions · Série Générale & Techno
                          </span>
                        </div>
                        <p style={{fontSize:13,color:'var(--muted)',margin:0}}>Dissertation ou Explication de texte · <strong style={{color:'var(--text)'}}>4h · Coef. 8</strong></p>
                      </div>
                      <SessionsBlock lnk={annLinks} color='#8b5cf6' year={selectedYear} onOpen={openPdf} />
                      {detail && (
                        <div style={{background:'rgba(139,92,246,0.08)',border:'1px solid rgba(139,92,246,0.2)',borderRadius:12,padding:'14px 18px',marginTop:16}}>
                          <p style={{margin:'0 0 10px',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>📊 Thèmes — Métropole J1</p>
                          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}}>
                            {(detail?.exercices||[]).map((ex:any,i:number)=>(
                              <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:'3px solid #8b5cf6',borderRadius:10,padding:'12px 14px'}}>
                                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,alignItems:'flex-start',gap:8}}>
                                  <span style={{fontWeight:700,fontSize:12,color:'#a78bfa'}}>{ex.titre}</span>
                                  <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'#f5c842',background:'rgba(245,200,66,0.12)',padding:'1px 7px',borderRadius:6,fontWeight:700,flexShrink:0}}>{ex.pts} pts</span>
                                </div>
                                <p style={{fontSize:11,color:'var(--text2)',lineHeight:1.55,margin:0}}>{ex.theme}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div style={{marginTop:20,display:'flex',gap:10,flexWrap:'wrap'}}>
                        <a href='/bac-france/francais/terminale'
                          style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 18px',background:'rgba(139,92,246,0.12)',border:'1px solid rgba(139,92,246,0.3)',borderRadius:11,textDecoration:'none',color:'#a78bfa',fontWeight:700,fontSize:12,transition:'all 0.18s'}}
                          onMouseEnter={e=>e.currentTarget.style.background='rgba(139,92,246,0.2)'}
                          onMouseLeave={e=>e.currentTarget.style.background='rgba(139,92,246,0.12)'}>
                          🧠 Cours Philosophie Terminale →
                        </a>
                        <a href='/bac-france/francais/lettres'
                          style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 18px',background:'rgba(236,72,153,0.08)',border:'1px solid rgba(236,72,153,0.25)',borderRadius:11,textDecoration:'none',color:'#f472b6',fontWeight:700,fontSize:12,transition:'all 0.18s'}}
                          onMouseEnter={e=>e.currentTarget.style.background='rgba(236,72,153,0.15)'}
                          onMouseLeave={e=>e.currentTarget.style.background='rgba(236,72,153,0.08)'}>
                          📚 Cours Français Lettres →
                        </a>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )
          })()}

          {/* seconde-physique-chimie rendu via PremiereView ci-dessus */}

          {/* NAVIGATION BAS */}
          <div style={{marginTop:48,paddingTop:32,borderTop:'1px solid var(--border)',display:'flex',gap:12,flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
            <button onClick={()=>{setMatiere(null);setSelectedYear(null);window.scrollTo({top:0,behavior:'smooth'})}}
              style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 20px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,cursor:'pointer',fontFamily:'var(--font-body)',fontWeight:700,fontSize:13,color:'var(--text)',transition:'all 0.18s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(99,102,241,0.45)';e.currentTarget.style.transform='translateY(-1px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='none'}}>
              ← Toutes les matières
            </button>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <button
                onClick={()=>{const next=matiere==='maths'?'physique-chimie':matiere==='physique-chimie'?'informatique':'maths';const sec=next==='maths'?'terminale-generale':'terminale-physique-chimie';setMatiere(next as Matiere);setActiveSec(sec as SKey);setSelectedYear(null);window.scrollTo({top:0,behavior:'smooth'})}}
                style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:11,cursor:'pointer',fontFamily:'var(--font-body)',fontWeight:600,fontSize:12,color:'var(--muted)',transition:'all 0.18s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(6,182,212,0.4)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                {matiere==='maths'?'⚗️ Aller en Physique-Chimie':matiere==='physique-chimie'?'💻 Aller en Informatique':'📐 Aller en Mathématiques'}
              </button>
              <a href='/examens'
                style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:11,textDecoration:'none',fontWeight:600,fontSize:12,color:'var(--muted)',transition:'all 0.18s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(220,38,38,0.4)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                🇹🇳 Examens Tunisie
              </a>
            </div>
          </div></div>
      </main>
      <Footer/>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>
    </>
  )
}