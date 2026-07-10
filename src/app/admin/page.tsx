'use client'
// src/app/admin/page.tsx

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../../lib/auth/AuthContext'
import { createClient } from '../../lib/supabase/client'

const DURATIONS: Record<string, number> = { mensuel:30, annuel:365, sprint_bac:60 }
const STATUS_STYLE: Record<string, string> = {
  pending:   'badge-gold',
  active:    'badge-teal',
  expired:   'badge-blue',
  cancelled: 'badge-red',
}

export default function AdminPage() {
  const router = useRouter()
  const { user, isAdmin, isLoading } = useAuth()
  const supabase = createClient()

  const [tab,        setTab]        = useState<'pending'|'active'|'all'|'stats'>('pending')
  const [pending,    setPending]    = useState<any[]>([])
  const [allSubs,    setAllSubs]    = useState<any[]>([])
  const [stats,      setStats]      = useState({ total:0, active:0, pending:0, revenue:0 })
  const [loading,    setLoading]    = useState(true)
  const [activating, setActivating] = useState<string|null>(null)
  const [notes,      setNotes]      = useState<Record<string,string>>({})
  const [matieres,   setMatieres]   = useState<Record<string,string>>({})
  const [usageLogs,  setUsageLogs]  = useState<any[]>([])  // subId → matiere

  useEffect(() => { if (!isLoading && !isAdmin) router.push('/') }, [isAdmin, isLoading])
  useEffect(() => { if (isAdmin) loadAll() }, [isAdmin])

  async function loadAll() {
    setLoading(true)
    const [p, a, s] = await Promise.all([
      supabase.from('subscriptions').select('*, profiles(email, full_name)').eq('status','pending').order('created_at',{ascending:false}),
      supabase.from('subscriptions').select('*, profiles(email, full_name)').order('created_at',{ascending:false}).limit(100),
      supabase.from('subscriptions').select('status, price_paid'),
    ])
    setPending(p.data || [])
    setAllSubs(a.data || [])
    if (s.data) setStats({
      total:   s.data.length,
      active:  s.data.filter((x:any) => x.status==='active').length,
      pending: s.data.filter((x:any) => x.status==='pending').length,
      revenue: s.data.filter((x:any) => x.status==='active').reduce((sum:number,x:any) => sum+(x.price_paid||0), 0),
    })
    const { data: logs } = await supabase.from('usage_logs').select('*').order('created_at',{ascending:false}).limit(500)
    setUsageLogs(logs || [])
    setLoading(false)
  }

  async function activate(sub: any) {
    setActivating(sub.id)
    const matiere = matieres[sub.id] || 'mathematiques'
    const basePlan = sub.plan_type?.startsWith('sprint') ? 'sprint_bac'
      : sub.plan_type?.startsWith('annuel') ? 'annuel' : 'mensuel'
    const finalPlanType = `${basePlan}_${matiere}`
    const days = DURATIONS[basePlan] || 30
    const now  = new Date()
    const end  = new Date(now.getTime() + days*86400000)

    // Utiliser l'API admin pour sync subscriptions + profiles + reset session
    const res = await fetch('/api/admin/subscriptions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id:       sub.id,
        status:   'active',
        user_id:  sub.user_id,
        plan_type: finalPlanType,
        matiere,
        ends_at:  end.toISOString(),
      })
    })
    const result = await res.json()
    const error = res.ok ? null : result
    const fakeError = error
    if (!fakeError) {
      await supabase.from('admin_logs').insert({ admin_id:user?.id, action:'activate_subscription', target_user_id:sub.user_id, details:{ subscription_id:sub.id, plan:sub.plan_type, days } })
      try {
        const { data: prof } = await supabase.from('profiles').select('email,full_name').eq('id', sub.user_id).single()
        if (prof?.email) {
          const dateExp = end.toLocaleDateString('fr-TN',{day:'numeric',month:'long',year:'numeric'})
          await fetch('/api/emails',{method:'POST',headers:{'Content-Type':'application/json','x-internal-secret':'dev-secret'},
            body:JSON.stringify({type:'confirmation_abonnement',to:prof.email,data:{nom:prof.full_name||prof.email.split('@')[0],plan:sub.plan_type,dateExpiration:dateExp,montant:sub.price_paid||0}})})
        }
      } catch(e){console.error('Email err:',e)}
      await loadAll()
    } else alert('Erreur: '+error.message)
    setActivating(null)
  }

  async function reject(id: string) {
    if (!confirm('Refuser cette demande ?')) return
    await supabase.from('subscriptions').update({ status:'cancelled', notes: notes[id] || 'Refusé par admin' }).eq('id', id)
    await loadAll()
  }

  const list = tab === 'pending' ? pending : allSubs.filter(s => tab==='active' ? s.status==='active' : true)

  if (isLoading || loading) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, border:'3px solid var(--accent)', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }} />
        <p style={{ color:'var(--muted)', fontSize:14 }}>Chargement...</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex' }}>

      {/* Sidebar */}
      <aside style={{ width:240, minHeight:'100vh', background:'var(--surface)', borderRight:'1px solid var(--border)', padding:24, position:'sticky', top:0, display:'flex', flexDirection:'column' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', marginBottom:32 }}>
          <div style={{ width:36, height:36, background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'white', fontFamily:'var(--font-display)', fontWeight:800 }}>M</span>
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:16, color:'var(--text)' }}>MathBac.AI</div>
            <div style={{ fontSize:10, color:'var(--accent)', fontFamily:'var(--font-mono)', letterSpacing:'0.08em' }}>ADMIN PANEL</div>
          </div>
        </Link>

        <nav style={{ display:'flex', flexDirection:'column', gap:4 }}>
          {[
            { id:'pending', label:'En attente', icon:'⏳', count:stats.pending, highlight: stats.pending > 0 },
            { id:'active',  label:'Actifs',     icon:'✅', count:stats.active  },
            { id:'all',     label:'Tous',        icon:'📋', count:stats.total   },
            { id:'stats',   label:'Statistiques',icon:'📊'                     },
          ].map(item => (
            <button key={item.id} onClick={() => setTab(item.id as any)}
              style={{
                display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%',
                padding:'10px 14px', borderRadius:10, border:'none', cursor:'pointer', transition:'all 0.2s',
                background: tab===item.id ? 'rgba(79,110,247,0.15)' : 'transparent',
                color: tab===item.id ? 'var(--accent)' : 'var(--text2)',
                fontSize:13, fontWeight:600,
              }}>
              <span style={{ display:'flex', alignItems:'center', gap:8 }}>{item.icon} {item.label}</span>
              {item.count !== undefined && (
                <span style={{
                  fontSize:10, fontFamily:'var(--font-mono)', fontWeight:800, padding:'2px 7px', borderRadius:20,
                  background: item.highlight ? 'var(--gold)' : 'rgba(255,255,255,0.08)',
                  color: item.highlight ? 'var(--bg)' : 'var(--muted)',
                }}>{item.count}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Lien vers gestion paiements */}
        <div style={{marginTop:'auto',paddingTop:24,borderTop:'1px solid var(--border)'}}>
          <a href="/admin/payments" style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',borderRadius:10,background:'rgba(79,110,247,0.08)',border:'1px solid rgba(79,110,247,0.2)',color:'var(--accent)',fontSize:13,fontWeight:600,textDecoration:'none',transition:'all 0.2s'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(79,110,247,0.16)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(79,110,247,0.08)'}>
            💳 Gérer les paiements
          </a>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, padding:32, overflow:'auto' }}>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:32 }}>
          {[
            { label:'Total demandes',    value:stats.total,          icon:'📋' },
            { label:'Abonnements actifs',value:stats.active,         icon:'✅' },
            { label:'En attente',        value:stats.pending,        icon:'⏳' },
            { label:'Revenus actifs',    value:`${stats.revenue} DT`,icon:'💰' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding:20 }}>
              <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:26, color:'var(--text)', lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {tab !== 'stats' && (
          <>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:20, marginBottom:20, color:'var(--text)' }}>
              {tab==='pending'?'⏳ En attente':tab==='active'?'✅ Actifs':'📋 Tous'}
              <span style={{ fontSize:14, color:'var(--muted)', fontWeight:400, marginLeft:8 }}>({list.length})</span>
            </h2>

            {list.length === 0
              ? <div style={{ textAlign:'center', padding:60, color:'var(--muted)' }}><div style={{ fontSize:40, marginBottom:12 }}>🎉</div><p>Aucune demande</p></div>
              : (
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {list.map((sub: any) => (
                    <div key={sub.id} className="card" style={{ padding:24, transition:'border-color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(79,110,247,0.3)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = '')}>
                      <div style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
                        <div style={{ flex:1 }}>
                          {/* Badges */}
                          <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
                            <span className={`badge ${STATUS_STYLE[sub.status]||'badge-blue'}`} style={{ textTransform:'capitalize' }}>{sub.status}</span>
                            <span className="badge badge-purple" style={{ textTransform:'capitalize' }}>
                              {sub.plan_type?.replace('mensuel_','📅 ')
                                .replace('annuel_','📅 ')
                                .replace('sprint_bac_','🔥 ')
                                .replace('mathematiques','Maths')
                                .replace('physique','PC')
                                .replace('svt','SVT')
                                .replace('anglais','Anglais')
                                .replace('informatique','Info')
                                .replace('francais','Français')
                                .replace('economie','Éco')
                                .replace('gestion','Gestion')
                                .replace(/_/g,' ') || sub.plan_type}
                            </span>
                            <span className="badge badge-blue" style={{ textTransform:'uppercase' }}>{sub.payment_method}</span>
                          </div>

                          {/* Infos */}
                          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px 32px', fontSize:13 }}>
                            {[
                              ['Email',     sub.profiles?.email    || 'N/A'],
                              ['Nom',       sub.profiles?.full_name || 'N/A'],
                              ['Montant',   `${sub.price_paid} DT`],
                              ['Téléphone', sub.payment_phone      || 'N/A'],
                              ['Référence', sub.payment_reference  || 'N/A'],
                              ['Date',      new Date(sub.created_at).toLocaleString('fr-TN')],
                              sub.subscription_end ? ['Expire', new Date(sub.subscription_end).toLocaleDateString('fr-TN')] : null,
                            ].filter(Boolean).map((row: any) => (
                              <div key={row[0]} style={{ display:'flex', gap:8 }}>
                                <span style={{ color:'var(--muted)', minWidth:80 }}>{row[0]} :</span>
                                <span style={{ color: row[0]==='Montant'?'var(--teal)':row[0]==='Référence'?'var(--accent)':'var(--text)', fontFamily: row[0]==='Référence'?'var(--font-mono)':'inherit', fontWeight:600 }}>{row[1]}</span>
                              </div>
                            ))}
                          </div>

                          {sub.payment_screenshot_url && (
                            <a href={sub.payment_screenshot_url} target="_blank" rel="noopener noreferrer"
                              style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:10, fontSize:12, color:'var(--accent)', textDecoration:'none' }}>
                              📎 Voir capture d'écran
                            </a>
                          )}
                        </div>

                        {/* Actions si pending */}
                        {sub.status === 'pending' && (
                          <div style={{ display:'flex', flexDirection:'column', gap:8, minWidth:200 }}>
                            {/* Sélecteur matière */}
                            <div>
                              <label style={{ fontSize:10, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', display:'block', marginBottom:4 }}>
                                Matière abonnée
                              </label>
                              <select value={matieres[sub.id]||'mathematiques'}
                                onChange={e => setMatieres(m => ({...m,[sub.id]:e.target.value}))}
                                className="input" style={{ borderRadius:8, fontSize:12, padding:'7px 10px', width:'100%' }}>
                                <option value="mathematiques">🧮 Mathématiques</option>
                                <option value="physique">⚗️ Physique-Chimie</option>
                                <option value="svt">🧬 SVT</option>
                                <option value="anglais">🇬🇧 Anglais</option>
                                <option value="informatique">💻 Informatique</option>
                                <option value="francais">📚 Français</option>
                                <option value="economie">📈 Économie</option>
                                <option value="gestion">💼 Gestion</option>
                              </select>
                            </div>
                            <textarea value={notes[sub.id]||''} onChange={e => setNotes(n => ({...n,[sub.id]:e.target.value}))}
                              placeholder="Notes optionnelles..." rows={2}
                              className="input" style={{ borderRadius:8, fontSize:12, padding:'8px 12px', resize:'none' }} />
                            <button onClick={() => activate(sub)} disabled={activating===sub.id}
                              className="btn btn-teal btn-sm" style={{ justifyContent:'center', opacity:activating===sub.id?0.6:1 }}>
                              {activating===sub.id?'⏳ Activation...':'✅ Activer'}
                            </button>
                            <button onClick={() => reject(sub.id)}
                              className="btn btn-ghost btn-sm" style={{ justifyContent:'center', color:'var(--red)', borderColor:'rgba(239,68,68,0.3)' }}>
                              ❌ Refuser
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </>
        )}

        {tab === 'stats' && (
          <div style={{display:'flex',flexDirection:'column',gap:24}}>

            {/* KPI revenus */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:16}}>
              {[
                {icon:'💰',label:'Revenu total (DT)',value:allSubs.filter(s=>s.status==='active').reduce((sum:number,s:any)=>sum+(s.price_paid||0),0).toFixed(0),color:'#22c55e'},
                {icon:'📅',label:'Revenu 30 jours',value:allSubs.filter(s=>s.status==='active'&&s.created_at&&new Date(s.created_at)>new Date(Date.now()-30*86400000)).reduce((sum:number,s:any)=>sum+(s.price_paid||0),0).toFixed(0),color:'#06d6a0'},
                {icon:'✅',label:'Abonnés actifs',value:allSubs.filter(s=>s.status==='active').length,color:'#4f6ef7'},
                {icon:'⏳',label:'En attente',value:allSubs.filter(s=>s.status==='pending').length,color:'#f59e0b'},
                {icon:'❌',label:'Annulés',value:allSubs.filter(s=>s.status==='cancelled').length,color:'#ef4444'},
                {icon:'📊',label:'Taux conversion',value:allSubs.length>0?((allSubs.filter(s=>s.status==='active').length/allSubs.length)*100).toFixed(0)+'%':'—',color:'#8b5cf6'},
              ].map(k=>(
                <div key={k.label} className="card" style={{padding:20,textAlign:'center'}}>
                  <div style={{fontSize:24,marginBottom:6}}>{k.icon}</div>
                  <div style={{fontSize:24,fontWeight:900,color:k.color,fontFamily:'var(--font-mono)',marginBottom:4}}>{k.value}</div>
                  <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.06em'}}>{k.label}</div>
                </div>
              ))}
            </div>

            {/* Matières + Plans */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
              <div className="card" style={{padding:24}}>
                <h3 style={{fontSize:14,fontWeight:700,marginBottom:16}}>🏆 Matières populaires</h3>
                {['mathematiques','physique','svt','informatique','anglais','francais','economie','gestion'].map(mat=>{
                  const cnt=allSubs.filter(s=>s.status==='active'&&(s.plan_type||'').includes(mat)).length
                  const total=Math.max(1,allSubs.filter(s=>s.status==='active').length)
                  const pct=Math.round(cnt/total*100)
                  const labels:Record<string,string>={mathematiques:'🧮 Maths',physique:'⚗️ Physique',svt:'🌱 SVT',informatique:'💻 Info',anglais:'🇬🇧 Anglais',francais:'📚 Français',economie:'📈 Éco',gestion:'💼 Gestion'}
                  return cnt>0?(
                    <div key={mat} style={{marginBottom:10}}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:3}}>
                        <span style={{color:'var(--text2)'}}>{labels[mat]}</span>
                        <span style={{fontFamily:'var(--font-mono)',fontWeight:700}}>{cnt} <span style={{color:'var(--muted)',fontWeight:400}}>({pct}%)</span></span>
                      </div>
                      <div style={{height:5,background:'var(--surface2)',borderRadius:4}}>
                        <div style={{height:'100%',width:`${pct}%`,background:'linear-gradient(90deg,#4f6ef7,#7c3aed)',borderRadius:4}}/>
                      </div>
                    </div>
                  ):null
                })}
              </div>
              <div className="card" style={{padding:24}}>
                <h3 style={{fontSize:14,fontWeight:700,marginBottom:16}}>💳 Plans & Paiements</h3>
                {[{key:'mensuel',label:'Mensuel',icon:'📅'},{key:'annuel',label:'Annuel',icon:'🏆'},{key:'sprint_bac',label:'Sprint Bac',icon:'⚡'}].map(p=>{
                  const cnt=allSubs.filter(s=>s.status==='active'&&(s.plan_type||'').startsWith(p.key)).length
                  const rev=allSubs.filter(s=>s.status==='active'&&(s.plan_type||'').startsWith(p.key)).reduce((sum:number,s:any)=>sum+(s.price_paid||0),0)
                  return(
                    <div key={p.key} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                      <div><div style={{fontSize:13,fontWeight:600}}>{p.icon} {p.label}</div><div style={{fontSize:11,color:'var(--muted)'}}>{cnt} abonné{cnt>1?'s':''}</div></div>
                      <div style={{fontFamily:'var(--font-mono)',fontWeight:700,color:'#22c55e'}}>{rev.toFixed(0)} DT</div>
                    </div>
                  )
                })}
                <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid var(--border)'}}>
                  {['d17','konnect','flouci','recharge_mobile','stripe','virement'].map(m=>{
                    const cnt=allSubs.filter(s=>s.payment_method===m).length
                    return cnt>0?(<div key={m} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'4px 0'}}>
                      <span style={{color:'var(--muted)',textTransform:'capitalize'}}>{m.replace('_',' ')}</span>
                      <span style={{fontFamily:'var(--font-mono)',fontWeight:700}}>{cnt}</span>
                    </div>):null
                  })}
                </div>
              </div>
            </div>

            {/* Graphique 30 jours abonnements */}
            <div className="card" style={{padding:24}}>
              <h3 style={{fontSize:14,fontWeight:700,marginBottom:16}}>📈 Nouveaux abonnements — 30 derniers jours</h3>
              <div style={{display:'flex',alignItems:'flex-end',gap:4,height:80}}>
                {Array.from({length:30},(_,i)=>{
                  const d=new Date(); d.setDate(d.getDate()-29+i)
                  const ds=d.toISOString().slice(0,10)
                  const cnt=allSubs.filter(s=>s.created_at&&s.created_at.slice(0,10)===ds).length
                  const max=Math.max(1,...Array.from({length:30},(_,j)=>{const d2=new Date();d2.setDate(d2.getDate()-29+j);return allSubs.filter(s=>s.created_at&&s.created_at.slice(0,10)===d2.toISOString().slice(0,10)).length}))
                  const h=Math.max(3,Math.round(cnt/max*70))
                  return(
                    <div key={ds} title={`${d.getDate()}/${d.getMonth()+1} : ${cnt}`} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                      <span style={{fontSize:8,color:'var(--muted)',fontFamily:'var(--font-mono)'}}>{cnt>0?cnt:''}</span>
                      <div style={{width:'100%',height:h,background:cnt>0?'linear-gradient(180deg,#4f6ef7,#7c3aed)':'var(--surface2)',borderRadius:'3px 3px 0 0'}}/>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Simulations usage_logs */}
            <div className="card" style={{padding:24}}>
              <h3 style={{fontSize:14,fontWeight:700,marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
                🤖 <span>Simulations lancées</span>
                <span style={{marginLeft:'auto',fontSize:12,color:'var(--muted)',fontFamily:'var(--font-mono)'}}>{usageLogs.length} événements</span>
              </h3>
              {usageLogs.length===0?(
                <div style={{textAlign:'center',padding:'20px 0',color:'var(--muted)',fontSize:13}}>
                  Aucune simulation loggée encore. Lance une simulation pour voir les stats ici.
                </div>
              ):(
                <>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:12,marginBottom:16}}>
                    {[
                      {icon:'🇫🇷',label:'France',value:usageLogs.filter(l=>l.platform==='france').length,color:'#4f6ef7'},
                      {icon:'🇹🇳',label:'Tunisie',value:usageLogs.filter(l=>l.platform==='tunisie').length,color:'#f59e0b'},
                      {icon:'📚',label:'Archive',value:usageLogs.filter(l=>l.mode==='archive').length,color:'#06d6a0'},
                      {icon:'📖',label:'Chapitre',value:usageLogs.filter(l=>l.mode==='chapitre').length,color:'#8b5cf6'},
                    ].map(k=>(
                      <div key={k.label} style={{textAlign:'center',padding:'12px',background:'var(--surface2)',borderRadius:10}}>
                        <div style={{fontSize:20,marginBottom:4}}>{k.icon}</div>
                        <div style={{fontSize:20,fontWeight:900,color:k.color,fontFamily:'var(--font-mono)'}}>{k.value}</div>
                        <div style={{fontSize:10,color:'var(--muted)'}}>{k.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {Object.entries(usageLogs.reduce((acc:Record<string,number>,l)=>{if(l.matiere){acc[l.matiere]=(acc[l.matiere]||0)+1};return acc},{})).sort(([,a],[,b])=>b-a).slice(0,8).map(([mat,cnt])=>(
                      <span key={mat} style={{padding:'4px 10px',background:'rgba(79,110,247,0.12)',border:'1px solid rgba(79,110,247,0.25)',borderRadius:16,fontSize:11}}>
                        {mat} <strong style={{color:'#818cf8'}}>{String(cnt)}</strong>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 10 dernières activations */}
            <div className="card" style={{padding:24}}>
              <h3 style={{fontSize:14,fontWeight:700,marginBottom:16}}>🕐 10 dernières activations</h3>
              {allSubs.filter(s=>s.status==='active').sort((a:any,b:any)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime()).slice(0,10).map((s:any)=>(
                <div key={s.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
                  <div>
                    <div style={{fontWeight:600}}>{s.profiles?.email?.split('@')[0]||'—'}</div>
                    <div style={{color:'var(--muted)',fontSize:11}}>{s.plan_type||'—'}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontFamily:'var(--font-mono)',color:'#22c55e',fontWeight:700}}>{s.price_paid||0} DT</div>
                    <div style={{color:'var(--muted)',fontSize:10}}>{s.created_at?new Date(s.created_at).toLocaleDateString('fr-TN',{day:'numeric',month:'short'}):''}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </main>
    </div>
  )
}