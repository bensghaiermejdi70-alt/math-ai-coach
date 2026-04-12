'use client'
// src/app/admin/payments/page.tsx
// Panel admin — voir et activer les paiements en attente

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/layout/Navbar'

const ADMIN_EMAIL = 'bensghaiermejdi70@gmail.com'

interface Payment {
  id: string
  user_id: string | null
  plan_type: string
  status: string
  price_paid: number
  payment_method: string
  payment_reference: string
  payment_phone: string | null
  payment_screenshot_url: string | null
  created_at: string
  email?: string
}

const PLAN_LABELS: Record<string,string> = {
  mensuel:'MathBac Mensuel', sprint:'Sprint Bac', annuel:'MathBac Annuel'
}
const METHOD_ICONS: Record<string,string> = {
  d17:'🏛️', flouci:'📱', recharge_mobile:'📞', especes:'💵'
}

export default function AdminPaymentsPage() {
  const { user, isAdmin } = useAuth()
  const supabase = createClient()

  const [payments,  setPayments]  = useState<Payment[]>([])
  const [loading,   setLoading]   = useState(true)
  const [activating, setActivating] = useState<string | null>(null)
  const [msg,       setMsg]       = useState('')

  // ── Charger les paiements en attente ─────────────────────────
  async function loadPayments() {
    setLoading(true)
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .in('status', ['pending', 'pending_cash'])
      .order('created_at', { ascending: false })

    if (data) {
      // Enrichir avec les emails
      const enriched = await Promise.all(data.map(async (p) => {
        if (p.user_id) {
          const { data: prof } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', p.user_id)
            .single()
          return { ...p, email: prof?.email }
        }
        return p
      }))
      setPayments(enriched)
    }
    setLoading(false)
  }

  useEffect(() => { loadPayments() }, [])

  // ── Activer un abonnement ─────────────────────────────────────
  async function activate(p: Payment, targetEmail?: string) {
    setActivating(p.id)
    setMsg('')
    try {
      // Trouver le user_id si pas dans la subscription
      let userId = p.user_id
      if (!userId && targetEmail) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', targetEmail.toLowerCase())
          .single()
        userId = prof?.id || null
      }
      if (!userId) throw new Error('Utilisateur introuvable')

      const endDate = new Date()
      if (p.plan_type === 'annuel') endDate.setFullYear(endDate.getFullYear() + 1)
      else endDate.setMonth(endDate.getMonth() + 1)

      // Mettre à jour le statut
      const { error: subErr } = await supabase
        .from('subscriptions')
        .update({
          status:    'active',
          starts_at: new Date().toISOString(),
          ends_at:   endDate.toISOString(),
        })
        .eq('id', p.id)
      if (subErr) throw subErr

      // Mettre à jour le profil
      await supabase
        .from('profiles')
        .update({
          plan_type:        p.plan_type,
          is_active:        true,
          subscription_end: endDate.toISOString(),
        })
        .eq('id', userId)

      setMsg(`✅ Abonnement ${PLAN_LABELS[p.plan_type] || p.plan_type} activé !`)
      await loadPayments()
    } catch (err: any) {
      setMsg(`❌ ${err.message}`)
    } finally {
      setActivating(null)
    }
  }

  if (!isAdmin) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a1a', color:'white' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:40, marginBottom:12 }}>🔒</div>
        <p>Accès réservé à l'administrateur</p>
      </div>
    </div>
  )

  return (
    <>
      <Navbar />
      <main style={{ minHeight:'100vh', background:'#0a0a1a', color:'white', padding:'100px 24px 60px', fontFamily:'system-ui' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>

          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:32, flexWrap:'wrap', gap:12 }}>
            <div>
              <h1 style={{ fontWeight:900, fontSize:26, margin:'0 0 4px' }}>⚙️ Panel Admin — Paiements</h1>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, margin:0 }}>
                {payments.length} paiement{payments.length !== 1 ? 's' : ''} en attente
              </p>
            </div>
            <button onClick={loadPayments}
              style={{ padding:'8px 18px', borderRadius:10, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.06)', color:'white', cursor:'pointer', fontSize:13, fontWeight:600 }}>
              🔄 Rafraîchir
            </button>
          </div>

          {/* Message */}
          {msg && (
            <div style={{ padding:'12px 16px', borderRadius:12, marginBottom:20, fontSize:14, fontWeight:600,
              background: msg.startsWith('✅') ? 'rgba(6,214,160,0.1)' : 'rgba(239,68,68,0.1)',
              border: `1px solid ${msg.startsWith('✅') ? 'rgba(6,214,160,0.3)' : 'rgba(239,68,68,0.3)'}`,
              color: msg.startsWith('✅') ? '#6ee7b7' : '#fca5a5',
            }}>
              {msg}
            </div>
          )}

          {/* Liste paiements */}
          {loading ? (
            <div style={{ textAlign:'center', padding:60, color:'rgba(255,255,255,0.4)' }}>Chargement...</div>
          ) : payments.length === 0 ? (
            <div style={{ textAlign:'center', padding:60, color:'rgba(255,255,255,0.4)' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
              <p>Aucun paiement en attente</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {payments.map(p => (
                <PaymentCard
                  key={p.id}
                  payment={p}
                  activating={activating === p.id}
                  onActivate={activate}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

// ── Carte paiement ─────────────────────────────────────────────
function PaymentCard({ payment: p, activating, onActivate }: {
  payment: Payment
  activating: boolean
  onActivate: (p: Payment, email?: string) => void
}) {
  const [emailInput, setEmailInput] = useState(p.email || '')

  const date = new Date(p.created_at).toLocaleString('fr-TN', {
    day:'2-digit', month:'2-digit', year:'numeric',
    hour:'2-digit', minute:'2-digit'
  })

  const isCash = p.payment_method === 'especes' || p.status === 'pending_cash'

  return (
    <div style={{
      background: isCash ? 'rgba(245,158,11,0.06)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${isCash ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.1)'}`,
      borderRadius:16, padding:'20px 24px',
    }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>

        {/* Info paiement */}
        <div style={{ flex:1, minWidth:220 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <span style={{ fontSize:22 }}>{METHOD_ICONS[p.payment_method] || '💳'}</span>
            <div>
              <div style={{ fontWeight:800, fontSize:16, color:'white' }}>
                {PLAN_LABELS[p.plan_type] || p.plan_type}
                <span style={{ marginLeft:8, fontSize:16, color:'#10b981', fontFamily:'monospace' }}>
                  {p.price_paid} DT
                </span>
              </div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:2 }}>{date}</div>
            </div>
            <span style={{
              fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20,
              background: isCash ? 'rgba(245,158,11,0.2)' : 'rgba(79,110,247,0.2)',
              color: isCash ? '#fbbf24' : '#a5b4fc',
            }}>
              {isCash ? '💵 ESPÈCES' : '🔄 EN ATTENTE'}
            </span>
          </div>

          {/* Détails */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px 16px', fontSize:12, color:'rgba(255,255,255,0.6)' }}>
            <div>📧 {p.email || <em>email non lié</em>}</div>
            <div>📞 {p.payment_phone || '—'}</div>
            <div style={{ fontFamily:'monospace', color:'rgba(255,255,255,0.8)' }}>
              🔖 {p.payment_reference || '—'}
            </div>
            <div>💳 {p.payment_method}</div>
          </div>

          {/* Capture d'écran */}
          {p.payment_screenshot_url && (
            <a href={p.payment_screenshot_url} target="_blank" rel="noopener"
              style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:10, fontSize:12, color:'#60a5fa', textDecoration:'none' }}>
              📎 Voir la capture d'écran →
            </a>
          )}
        </div>

        {/* Activation */}
        <div style={{ display:'flex', flexDirection:'column', gap:8, minWidth:200 }}>
          {!p.email && (
            <div>
              <label style={{ fontSize:11, color:'rgba(255,255,255,0.4)', display:'block', marginBottom:4 }}>
                Email du client
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="client@email.com"
                style={{ width:'100%', padding:'8px 10px', borderRadius:8, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:13, outline:'none', boxSizing:'border-box' as any }}
              />
            </div>
          )}
          <button
            onClick={() => onActivate(p, emailInput)}
            disabled={activating || (!p.email && !emailInput)}
            style={{
              padding:'10px 20px', borderRadius:10, border:'none', cursor:'pointer',
              background: activating ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#10b981,#059669)',
              color:'white', fontWeight:800, fontSize:14,
              opacity: activating ? 0.6 : 1,
            }}>
            {activating ? '⏳ Activation...' : '✅ Activer'}
          </button>

          {/* Lien WhatsApp */}
          {p.payment_phone && (
            <a
              href={`https://wa.me/216${p.payment_phone.replace(/\s/g,'')}?text=Bonjour%20!%20Votre%20abonnement%20MathBac.AI%20${PLAN_LABELS[p.plan_type]||p.plan_type}%20est%20activé%20✅`}
              target="_blank" rel="noopener"
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'8px 16px', borderRadius:10, border:'1px solid rgba(37,211,102,0.3)', background:'rgba(37,211,102,0.08)', color:'#25d366', fontSize:13, fontWeight:700, textDecoration:'none' }}>
              💬 Confirmer WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}