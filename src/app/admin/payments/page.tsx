'use client'
// src/app/admin/payments/page.tsx

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const ADMIN_EMAIL = 'bensghaiermejdi70@gmail.com'

interface Sub {
  id: string
  user_id: string | null
  plan_type: string
  status: string
  price_paid: number
  payment_method: string
  payment_reference: string
  payment_phone: string | null
  payment_screenshot_url: string | null
  stripe_customer_id: string | null
  created_at: string
  ends_at: string | null
  email?: string
  full_name?: string
}

const PLAN_LABELS: Record<string,string> = {
  mensuel:'Mensuel', sprint:'Sprint Bac', annuel:'Annuel'
}
const METHOD_ICONS: Record<string,string> = {
  d17:'🏛️', flouci:'📱', recharge_mobile:'📞', especes:'💵', stripe:'💳'
}
const STATUS_COLORS: Record<string,string> = {
  active:       '#10b981',
  pending:      '#f59e0b',
  pending_cash: '#f59e0b',
  cancelled:    '#ef4444',
  expired:      '#6b7280',
}

export default function AdminPaymentsPage() {
  const { user, isAdmin } = useAuth()
  const supabase = createClient()

  const [subs,       setSubs]       = useState<Sub[]>([])
  const [filtered,   setFiltered]   = useState<Sub[]>([])
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [msg,        setMsg]        = useState('')
  const [activating, setActivating] = useState<string|null>(null)

  async function loadAll() {
    setLoading(true)
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      const enriched = await Promise.all(data.map(async (s) => {
        if (s.user_id) {
          const { data: p } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('id', s.user_id)
            .single()
          return { ...s, email: p?.email, full_name: p?.full_name }
        }
        return s
      }))
      setSubs(enriched)
      setFiltered(enriched)
    }
    setLoading(false)
  }

  useEffect(() => { loadAll() }, [])

  // Filtrage
  useEffect(() => {
    let result = subs
    if (filterStatus !== 'all') result = result.filter(s => s.status === filterStatus)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(s =>
        s.email?.toLowerCase().includes(q) ||
        s.full_name?.toLowerCase().includes(q) ||
        s.payment_reference?.toLowerCase().includes(q) ||
        s.plan_type?.toLowerCase().includes(q)
      )
    }
    setFiltered(result)
  }, [search, filterStatus, subs])

  async function activate(s: Sub) {
    setActivating(s.id); setMsg('')
    try {
      const endDate = new Date()
      if (s.plan_type === 'annuel') endDate.setFullYear(endDate.getFullYear() + 1)
      else endDate.setMonth(endDate.getMonth() + 1)

      await supabase.from('subscriptions').update({
        status: 'active', ends_at: endDate.toISOString()
      }).eq('id', s.id)

      if (s.user_id) {
        await supabase.from('profiles').update({
          is_active: true, plan_type: s.plan_type,
          subscription_end: endDate.toISOString()
        }).eq('id', s.user_id)
      }
      setMsg(`✅ Abonnement activé pour ${s.email || s.id}`)
      await loadAll()
    } catch (err: any) {
      setMsg(`❌ ${err.message}`)
    } finally { setActivating(null) }
  }

  async function deactivate(s: Sub) {
    setActivating(s.id); setMsg('')
    try {
      await supabase.from('subscriptions').update({ status: 'cancelled' }).eq('id', s.id)
      if (s.user_id) {
        await supabase.from('profiles').update({ is_active: false, plan_type: null }).eq('id', s.user_id)
      }
      setMsg(`🚫 Abonnement désactivé pour ${s.email || s.id}`)
      await loadAll()
    } catch (err: any) {
      setMsg(`❌ ${err.message}`)
    } finally { setActivating(null) }
  }

  if (!isAdmin) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white', fontFamily:'system-ui' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:40, marginBottom:12 }}>🔒</div>
        <p>Accès réservé à l'administrateur</p>
        <Link href="/" style={{ color:'#4f6ef7', fontSize:13 }}>← Retour</Link>
      </div>
    </div>
  )

  // Stats
  const stats = {
    total:   subs.length,
    active:  subs.filter(s => s.status === 'active').length,
    pending: subs.filter(s => s.status.includes('pending')).length,
    revenue: subs.filter(s => s.status === 'active').reduce((a,s) => a + (s.price_paid||0), 0),
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0a0a1a', color:'white', fontFamily:'system-ui', padding:'80px 20px 60px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:32, flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontWeight:900, fontSize:24, margin:'0 0 4px' }}>⚙️ Panel Admin</h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, margin:0 }}>Gérer tous les abonnements</p>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <Link href="/admin/payments" style={{ padding:'8px 16px', borderRadius:10, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:13, fontWeight:600, textDecoration:'none' }}>
              💳 Paiements
            </Link>
            <button onClick={loadAll}
              style={{ padding:'8px 16px', borderRadius:10, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:13, fontWeight:600, cursor:'pointer' }}>
              🔄 Rafraîchir
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:28 }}>
          {[
            { label:'Total', val: stats.total, color:'#4f6ef7' },
            { label:'Actifs', val: stats.active, color:'#10b981' },
            { label:'En attente', val: stats.pending, color:'#f59e0b' },
            { label:'Revenus actifs', val: `${stats.revenue} DT/€`, color:'#a78bfa' },
          ].map((s,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'16px 20px' }}>
              <div style={{ fontSize:22, fontWeight:900, color:s.color }}>{s.val}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Message */}
        {msg && (
          <div style={{ padding:'11px 16px', borderRadius:10, marginBottom:16, fontSize:13, fontWeight:600,
            background: msg.startsWith('✅') ? 'rgba(6,214,160,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${msg.startsWith('✅') ? 'rgba(6,214,160,0.3)' : 'rgba(239,68,68,0.3)'}`,
            color: msg.startsWith('✅') ? '#6ee7b7' : '#fca5a5',
          }}>
            {msg}
          </div>
        )}

        {/* Filtres */}
        <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
          <input
            type="text" placeholder="🔍 Rechercher email, nom, référence..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex:1, minWidth:240, padding:'9px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:13, outline:'none' }}
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            style={{ padding:'9px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'#1a1a2e', color:'white', fontSize:13, cursor:'pointer' }}>
            <option value="all">Tous les statuts</option>
            <option value="active">✅ Actifs</option>
            <option value="pending">⏳ En attente</option>
            <option value="pending_cash">💵 Espèces</option>
            <option value="cancelled">🚫 Annulés</option>
          </select>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>{filtered.length} résultat{filtered.length!==1?'s':''}</span>
        </div>

        {/* Tableau */}
        {loading ? (
          <div style={{ textAlign:'center', padding:60, color:'rgba(255,255,255,0.4)' }}>Chargement...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:60, color:'rgba(255,255,255,0.4)' }}>
            <div style={{ fontSize:32, marginBottom:8 }}>📭</div>
            <p>Aucun abonnement trouvé</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {filtered.map(s => {
              const date = new Date(s.created_at).toLocaleDateString('fr-FR')
              const end  = s.ends_at ? new Date(s.ends_at).toLocaleDateString('fr-FR') : '—'
              const isAct = activating === s.id
              return (
                <div key={s.id} style={{
                  background:'rgba(255,255,255,0.03)',
                  border:`1px solid ${s.status==='active'?'rgba(16,185,129,0.2)':s.status.includes('pending')?'rgba(245,158,11,0.2)':'rgba(255,255,255,0.08)'}`,
                  borderRadius:14, padding:'16px 20px',
                  display:'grid', gridTemplateColumns:'1fr 1fr 1fr auto', gap:16, alignItems:'center',
                }}>
                  {/* Colonne 1 — User */}
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:'white', marginBottom:2 }}>
                      {s.full_name || '—'}
                    </div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>{s.email || '—'}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:2 }}>📅 {date}</div>
                  </div>

                  {/* Colonne 2 — Plan */}
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:'white', marginBottom:3 }}>
                      {METHOD_ICONS[s.payment_method]||'💳'} {PLAN_LABELS[s.plan_type]||s.plan_type}
                    </div>
                    <div style={{ fontSize:13, color:'#10b981', fontWeight:700 }}>{s.price_paid} DT/€</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:2 }}>Fin : {end}</div>
                  </div>

                  {/* Colonne 3 — Status + Ref */}
                  <div>
                    <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20,
                      background:`${STATUS_COLORS[s.status]||'#6b7280'}20`,
                      color: STATUS_COLORS[s.status]||'#6b7280',
                      border:`1px solid ${STATUS_COLORS[s.status]||'#6b7280'}40`,
                    }}>
                      {s.status === 'active' ? '✅ Actif' :
                       s.status === 'pending' ? '⏳ En attente' :
                       s.status === 'pending_cash' ? '💵 Espèces' :
                       s.status === 'cancelled' ? '🚫 Annulé' : s.status}
                    </span>
                    {s.payment_reference && (
                      <div style={{ fontSize:10, fontFamily:'monospace', color:'rgba(255,255,255,0.3)', marginTop:6 }}>
                        {s.payment_reference.slice(0,24)}...
                      </div>
                    )}
                    {s.payment_screenshot_url && (
                      <a href={s.payment_screenshot_url} target="_blank" rel="noopener"
                        style={{ fontSize:11, color:'#60a5fa', textDecoration:'none', display:'block', marginTop:4 }}>
                        📎 Capture
                      </a>
                    )}
                  </div>

                  {/* Colonne 4 — Actions */}
                  <div style={{ display:'flex', flexDirection:'column', gap:6, minWidth:120 }}>
                    {s.status !== 'active' && (
                      <button onClick={() => activate(s)} disabled={isAct}
                        style={{ padding:'7px 14px', borderRadius:8, border:'none', cursor:'pointer',
                          background:'linear-gradient(135deg,#10b981,#059669)',
                          color:'white', fontSize:12, fontWeight:700, opacity:isAct?0.6:1 }}>
                        {isAct ? '⏳...' : '✅ Activer'}
                      </button>
                    )}
                    {s.status === 'active' && (
                      <button onClick={() => deactivate(s)} disabled={isAct}
                        style={{ padding:'7px 14px', borderRadius:8, cursor:'pointer',
                          background:'rgba(239,68,68,0.15)', border:'1px solid rgba(239,68,68,0.3)',
                          color:'#f87171', fontSize:12, fontWeight:700, opacity:isAct?0.6:1 }}>
                        {isAct ? '⏳...' : '🚫 Désactiver'}
                      </button>
                    )}
                    {s.payment_phone && (
                      <a href={`https://wa.me/216${s.payment_phone.replace(/\s/g,'')}?text=Bonjour%20!%20Votre%20abonnement%20MathBac.AI%20est%20activé%20✅`}
                        target="_blank" rel="noopener"
                        style={{ padding:'6px 14px', borderRadius:8, textAlign:'center',
                          background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.25)',
                          color:'#25d366', fontSize:12, fontWeight:600, textDecoration:'none' }}>
                        💬 WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <style suppressHydrationWarning>{`
        @media(max-width:900px){
          div[style*="repeat(4,1fr)"]{ grid-template-columns:1fr 1fr!important }
          div[style*="1fr 1fr 1fr auto"]{ grid-template-columns:1fr 1fr!important }
        }
        @media(max-width:600px){
          div[style*="repeat(4,1fr)"]{ grid-template-columns:1fr 1fr!important }
          div[style*="1fr 1fr 1fr auto"]{ grid-template-columns:1fr!important }
        }
      `}</style>
    </div>
  )
}