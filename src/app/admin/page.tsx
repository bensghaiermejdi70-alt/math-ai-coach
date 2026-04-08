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
      active:  s.data.filter(x => x.status==='active').length,
      pending: s.data.filter(x => x.status==='pending').length,
      revenue: s.data.filter(x => x.status==='active').reduce((sum,x) => sum+(x.price_paid||0), 0),
    })
    setLoading(false)
  }

  async function activate(sub: any) {
    setActivating(sub.id)
    const days = DURATIONS[sub.plan_type] || 30
    const now  = new Date()
    const end  = new Date(now.getTime() + days*86400000)
    const { error } = await supabase.from('subscriptions').update({
      status:'active', is_active:true,
      subscription_start: now.toISOString(),
      subscription_end:   end.toISOString(),
      activated_by: user?.id,
      activated_at: now.toISOString(),
      notes: notes[sub.id] || null,
    }).eq('id', sub.id)
    if (!error) {
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
            <span style={{ color:'white', fontFamily:'var(--font-display)', fontWeight:800 }}>B</span>
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:16, color:'var(--text)' }}>Bac.AI</div>
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
                            <span className="badge badge-purple" style={{ textTransform:'capitalize' }}>{sub.plan_type.replace('_',' ')}</span>
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
                          <div style={{ display:'flex', flexDirection:'column', gap:8, minWidth:180 }}>
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
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            {[
              { title:'Par plan', items: ['mensuel','annuel','sprint_bac'].map(p => ({ label:p.replace('_',' '), count:allSubs.filter(s=>s.plan_type===p&&s.status==='active').length })) },
              { title:'Par méthode', items: ['d17','konnect','flouci','recharge_mobile'].map(m => ({ label:m, count:allSubs.filter(s=>s.payment_method===m).length })) },
            ].map((block, i) => (
              <div key={i} className="card" style={{ padding:24 }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, marginBottom:16, color:'var(--text)' }}>{block.title}</h3>
                {block.items.map(item => (
                  <div key={item.label} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
                    <span style={{ color:'var(--text2)', textTransform:'capitalize' }}>{item.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)', color:'var(--text)', fontWeight:700 }}>{item.count}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}