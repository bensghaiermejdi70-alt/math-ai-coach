'use client'
// src/app/activation/page.tsx

import { useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ── Plans & prix ──────────────────────────────────────────────────
const PLAN_PRICES: Record<string, number> = {
  mensuel:        60,
  sprint:         90,
  annuel:        600,
}

const PLAN_LABELS: Record<string, string> = {
  mensuel: 'MathBac Mensuel',
  sprint:  'Sprint Bac',
  annuel:  'MathBac Annuel',
}

// ── Méthodes de paiement ──────────────────────────────────────────
const PAYMENT_INFO = {
  d17: {
    icon:'🏛️', title:'D17 / La Poste',
    steps:[
      "Ouvrir l'app D17 ou e-Dinar",
      "Aller dans 'Transfert d'argent'",
      "Envoyer le montant EXACT vers : 99 268 970",
      "Copier la référence de transaction",
      "Remplir le formulaire ci-contre",
    ],
    ref_label:'Référence transaction D17',
    ref_placeholder:'Ex: TRF20240515XXXX',
    phone: true,
  },
  flouci: {
    icon:'📱', title:'Flouci',
    steps:[
      "Ouvrir l'app Flouci",
      "Envoyer le montant EXACT vers : 99 268 970",
      "Mettre 'MathBac' dans la note",
      "Copier la référence du virement",
      "Remplir le formulaire ci-contre",
    ],
    ref_label:'Référence Flouci',
    ref_placeholder:'Ex: FLC_2024XXXXXX',
    phone: true,
  },
  recharge_mobile: {
    icon:'📞', title:'Recharge mobile',
    steps:[
      "Recharger votre téléphone",
      "Transférer vers D17 : *165*1*[montant]*PIN#",
      "Depuis D17, envoyer à : 99 268 970",
      "Copier la référence de la transaction",
    ],
    ref_label:'Référence transaction',
    ref_placeholder:'Référence de la transaction',
    phone: true,
  },
  especes: {
    icon:'💵', title:'Espèces (en main propre)',
    steps:[
      "Appeler ou WhatsApp : 99 268 970",
      "Convenir d'un rendez-vous ou d'un envoi",
      "Remettre le montant exact en espèces",
      "Préciser votre email MathBac.AI dans la note ci-contre",
    ],
    ref_label:'Votre email MathBac.AI',
    ref_placeholder:'votre-email@exemple.com',
    phone: false,
  },
} as const

const ADMIN_EMAIL = 'bensghaiermejdi70@gmail.com'

// ── Panel admin — activation manuelle par email ──────────────────
function AdminPanel() {
  const { user, isAdmin } = useAuth()
  const supabase = createClient()
  const [emailTarget, setEmailTarget] = useState('')
  const [planTarget,  setPlanTarget]  = useState('mensuel')
  const [msg,         setMsg]         = useState('')
  const [loading,     setLoading]     = useState(false)

  if (!isAdmin) return null

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault()
    if (!emailTarget.trim()) return
    setLoading(true); setMsg('')
    try {
      // Récupérer le user_id par email
      const { data: profile, error: pErr } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', emailTarget.trim().toLowerCase())
        .single()
      if (pErr || !profile) throw new Error(`Aucun compte trouvé pour ${emailTarget}`)

      const endDate = new Date()
      if (planTarget === 'annuel') endDate.setFullYear(endDate.getFullYear() + 1)
      else endDate.setMonth(endDate.getMonth() + 1)

      const { error: subErr } = await supabase.from('subscriptions').insert({
        user_id:          profile.id,
        plan_type:        planTarget,
        status:           'active',
        price_paid:       PLAN_PRICES[planTarget],
        payment_method:   'especes',
        payment_reference:'ADMIN_ESPECES',
        starts_at:        new Date().toISOString(),
        ends_at:          endDate.toISOString(),
      })
      if (subErr) throw subErr
      setMsg(`✅ Abonnement ${PLAN_LABELS[planTarget]} activé pour ${emailTarget}`)
      setEmailTarget('')
    } catch (err: any) {
      setMsg(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background:'linear-gradient(135deg,rgba(245,200,66,0.08),rgba(245,158,11,0.04))',
      border:'1px solid rgba(245,200,66,0.3)', borderRadius:20, padding:'28px 32px', marginBottom:40,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <span style={{ fontSize:22 }}>⚙️</span>
        <div>
          <h3 style={{ margin:0, fontFamily:'var(--font-display)', fontSize:17, color:'var(--gold)' }}>Panel Admin — Activation espèces</h3>
          <p style={{ margin:0, fontSize:11, color:'var(--muted)' }}>Réservé à {ADMIN_EMAIL}</p>
        </div>
      </div>

      <form onSubmit={handleActivate} style={{ display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:12, alignItems:'end' }}>
        <div>
          <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:6, fontWeight:600 }}>Email du client</label>
          <input
            type="email"
            value={emailTarget}
            onChange={e => setEmailTarget(e.target.value)}
            placeholder="client@exemple.com"
            required
            className="input"
            style={{ borderRadius:10, borderColor:'rgba(245,200,66,0.3)' }}
          />
        </div>
        <div>
          <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:6, fontWeight:600 }}>Plan à activer</label>
          <select
            value={planTarget}
            onChange={e => setPlanTarget(e.target.value)}
            className="input"
            style={{ borderRadius:10, borderColor:'rgba(245,200,66,0.3)', background:'var(--surface)', color:'var(--text)', cursor:'pointer' }}
          >
            <option value="mensuel">MathBac Mensuel — 60 DT</option>
            <option value="sprint">Sprint Bac — 90 DT</option>
            <option value="annuel">MathBac Annuel — 600 DT</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding:'10px 20px', borderRadius:10, border:'none', cursor:'pointer',
            background:'linear-gradient(135deg,#f59e0b,#f97316)',
            color:'#0a0a1a', fontWeight:800, fontSize:14,
            opacity: loading ? 0.7 : 1, whiteSpace:'nowrap',
          }}
        >
          {loading ? '⏳...' : '✅ Activer'}
        </button>
      </form>

      {msg && (
        <div style={{
          marginTop:14, padding:'10px 14px', borderRadius:10, fontSize:13, fontWeight:600,
          background: msg.startsWith('✅') ? 'rgba(6,214,160,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${msg.startsWith('✅') ? 'rgba(6,214,160,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: msg.startsWith('✅') ? 'var(--teal)' : 'var(--red)',
        }}>
          {msg}
        </div>
      )}
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────
function ActivationInner() {
  const searchParams = useSearchParams()
  const planParam   = searchParams.get('plan')   || 'mensuel'
  const methodParam = searchParams.get('method') || 'd17'

  const { user, profile, isAdmin, refreshSubscription } = useAuth()
  const supabase = createClient()
  const fileRef  = useRef<HTMLInputElement>(null)

  const [method,     setMethod]     = useState(methodParam)
  const [ref,        setRef]        = useState('')
  const [phone,      setPhone]      = useState(profile?.phone || '')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [loading,    setLoading]    = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [error,      setError]      = useState('')

  const price     = PLAN_PRICES[planParam] || PLAN_PRICES.mensuel
  const planLabel = PLAN_LABELS[planParam] || 'MathBac Mensuel'
  const info      = PAYMENT_INFO[method as keyof typeof PAYMENT_INFO] || PAYMENT_INFO.d17

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!ref.trim()) return setError('Ce champ est requis.')
    setLoading(true)
    try {
      let screenshotUrl = null
      if (screenshot && user) {
        const ext  = screenshot.name.split('.').pop()
        const path = `screenshots/${user.id}/${Date.now()}.${ext}`
        const { data: up, error: upErr } = await supabase.storage
          .from('payment-screenshots').upload(path, screenshot)
        if (!upErr && up) {
          const { data: { publicUrl } } = supabase.storage
            .from('payment-screenshots').getPublicUrl(path)
          screenshotUrl = publicUrl
        }
      }
      const { error: dbErr } = await supabase.from('subscriptions').insert({
        user_id:               user?.id || null,
        plan_type:             planParam,
        status:                method === 'especes' ? 'pending_cash' : 'pending',
        price_paid:            price,
        payment_method:        method,
        payment_reference:     ref.trim(),
        payment_phone:         phone || null,
        payment_screenshot_url: screenshotUrl,
      })
      if (dbErr) throw dbErr
      if (user) await refreshSubscription()
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Erreur. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <>
      <Navbar />
      <main style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20, position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:440, width:'100%', textAlign:'center' }}>
          <div style={{ width:80, height:80, background:'rgba(6,214,160,0.15)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:36 }}>✅</div>
          <h2 style={{ fontFamily:'var(--font-display)', marginBottom:12 }}>
            {method === 'especes' ? 'Demande reçue !' : 'Demande envoyée !'}
          </h2>
          <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7, marginBottom:24 }}>
            {method === 'especes'
              ? "Votre demande par espèces a été enregistrée. Vous serez contacté par l'équipe MathBac.AI dans les plus brefs délais."
              : "Votre paiement est en cours de vérification. Activation en moins de 5 minutes."}
          </p>
          <div className="card" style={{ textAlign:'left', marginBottom:24 }}>
            {[
              ['Plan',     planLabel],
              ['Montant',  `${price} DT`],
              ['Méthode',  info.title],
              ['Référence', ref],
            ].map(([k, v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
                <span style={{ color:'var(--muted)' }}>{k}</span>
                <span style={{ color:'var(--text)', fontFamily: k === 'Référence' ? 'var(--font-mono)' : 'inherit', fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href={user ? '/profile' : '/login'} className="btn btn-primary btn-lg">
              {user ? 'Voir mon profil →' : 'Se connecter →'}
            </Link>
            <a href="https://wa.me/21699268970" target="_blank" rel="noopener" style={{
              display:'inline-flex', alignItems:'center', gap:6, padding:'12px 20px',
              background:'rgba(37,211,102,0.12)', border:'1px solid rgba(37,211,102,0.3)',
              borderRadius:12, color:'#25d366', fontSize:14, fontWeight:700, textDecoration:'none',
            }}>
              💬 WhatsApp →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1 }}>
        <section style={{ padding:'100px clamp(20px,5vw,60px) 40px', textAlign:'center' }}>
          <span className="label">Activation</span>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(22px,3.5vw,38px)', marginBottom:10 }}>
            Activer mon abonnement
          </h1>
          <p style={{ fontSize:15, color:'var(--text2)' }}>
            <strong style={{ color:'var(--text)', fontSize:18 }}>{price} DT</strong>
            {' · '}{planLabel}
            {' · '}Activation {'<'}5 min
          </p>
        </section>

        <div className="container" style={{ maxWidth:960, paddingBottom:60 }}>

          {/* Panel admin */}
          {isAdmin && <AdminPanel />}

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'start' }}>

            {/* ── Colonne gauche : méthodes + instructions */}
            <div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:15, marginBottom:14, color:'var(--text)' }}>Choisir la méthode de paiement</h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:28 }}>
                {Object.entries(PAYMENT_INFO).map(([key, pm]) => (
                  <button key={key} onClick={() => setMethod(key)}
                    style={{
                      padding:'12px 10px', borderRadius:12, cursor:'pointer',
                      textAlign:'center', transition:'all 0.2s',
                      background: method === key
                        ? (key === 'especes' ? 'rgba(37,211,102,0.1)' : 'rgba(79,110,247,0.12)')
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${method === key
                        ? (key === 'especes' ? 'rgba(37,211,102,0.4)' : 'rgba(79,110,247,0.4)')
                        : 'var(--border)'}`,
                    }}>
                    <div style={{ fontSize:22, marginBottom:5 }}>{pm.icon}</div>
                    <div style={{ fontSize:11, fontWeight:700,
                      color: method === key
                        ? (key === 'especes' ? '#25d366' : 'var(--accent)')
                        : 'var(--text2)' }}>
                      {pm.title}
                    </div>
                  </button>
                ))}
              </div>

              {/* Instructions méthode sélectionnée */}
              <div className="card" style={{ padding:24 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
                  <span style={{ fontSize:24 }}>{info.icon}</span>
                  <h4 style={{ fontFamily:'var(--font-display)', color:'var(--text)', margin:0 }}>{info.title}</h4>
                </div>

                {/* Alerte espèces */}
                {method === 'especes' && (
                  <div style={{ background:'rgba(37,211,102,0.08)', border:'1px solid rgba(37,211,102,0.25)', borderRadius:12, padding:'12px 16px', marginBottom:18 }}>
                    <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:8 }}>
                      <span style={{ fontSize:22 }}>📞</span>
                      <div>
                        <div style={{ fontWeight:800, color:'#25d366', fontSize:14 }}>Contacter avant de payer</div>
                        <div style={{ fontSize:12, color:'var(--muted)' }}>Appeler ou WhatsApp pour convenir du paiement</div>
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:10 }}>
                      <a href="tel:+21699268970" style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'7px 14px', borderRadius:8, background:'rgba(37,211,102,0.12)', border:'1px solid rgba(37,211,102,0.3)', color:'#25d366', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                        📞 99 268 970
                      </a>
                      <a href="https://wa.me/21699268970" target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'7px 14px', borderRadius:8, background:'rgba(37,211,102,0.12)', border:'1px solid rgba(37,211,102,0.3)', color:'#25d366', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                )}

                <div style={{ display:'flex', flexDirection:'column', gap:11, marginBottom:method === 'especes' ? 0 : 20 }}>
                  {info.steps.map((step, i) => (
                    <div key={i} style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
                      <div style={{ width:23, height:23, background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'white', fontWeight:800, flexShrink:0, marginTop:1 }}>{i+1}</div>
                      <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6, margin:0 }}>{step}</p>
                    </div>
                  ))}
                </div>

                {method !== 'especes' && (
                  <div style={{ background:'rgba(79,110,247,0.08)', border:'1px solid rgba(79,110,247,0.2)', borderRadius:10, padding:'12px 16px', marginTop:18 }}>
                    <p style={{ margin:0, fontSize:13, color:'var(--text2)' }}>
                      <strong style={{ color:'var(--text)' }}>Numéro de réception :</strong>{' '}
                      <span style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', fontSize:16, fontWeight:700, letterSpacing:'0.05em' }}>99 268 970</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Colonne droite : formulaire */}
            <div className="card" style={{ padding:28 }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, marginBottom:20, color:'var(--text)' }}>
                {method === 'especes' ? 'Enregistrer ma demande' : "Formulaire d'activation"}
              </h3>

              {error && (
                <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'11px 14px', marginBottom:16, fontSize:13, color:'var(--red)' }}>⚠️ {error}</div>
              )}

              <form onSubmit={handleSubmit}>
                {(info as any).phone && (
                  <div style={{ marginBottom:14 }}>
                    <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:7, fontWeight:600 }}>Téléphone utilisé pour le paiement</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="2X XXX XXX" className="input" style={{ borderRadius:10 }} />
                  </div>
                )}

                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:7, fontWeight:600 }}>{info.ref_label} *</label>
                  <input type={method === 'especes' ? 'email' : 'text'}
                    value={ref} onChange={e => setRef(e.target.value)} required
                    placeholder={info.ref_placeholder}
                    className={`input${method !== 'especes' ? ' input-mono' : ''}`}
                    style={{ borderRadius:10 }}
                  />
                  {method === 'especes' && (
                    <p style={{ fontSize:11, color:'var(--muted)', marginTop:5 }}>Votre email sera utilisé pour activer votre abonnement après vérification.</p>
                  )}
                </div>

                {/* Upload capture (pas pour espèces) */}
                {method !== 'especes' && (
                  <div style={{ marginBottom:20 }}>
                    <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:7, fontWeight:600 }}>Capture d'écran (recommandé)</label>
                    <div onClick={() => fileRef.current?.click()}
                      style={{ border:'2px dashed var(--border)', borderRadius:10, padding:16, textAlign:'center', cursor:'pointer', transition:'border-color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(79,110,247,0.4)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                      {screenshot
                        ? <p style={{ color:'var(--teal)', fontSize:13, margin:0 }}>✅ {screenshot.name}</p>
                        : <div><div style={{ fontSize:22, marginBottom:5 }}>📎</div><p style={{ fontSize:12, color:'var(--muted)', margin:0 }}>Cliquer pour ajouter</p></div>
                      }
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => setScreenshot(e.target.files?.[0] || null)} />
                  </div>
                )}

                {/* Récapitulatif */}
                <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:10, padding:'14px 16px', marginBottom:20 }}>
                  {[
                    ['Plan',     planLabel],
                    ['Montant',  `${price} DT`],
                    ['Méthode',  info.title],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:13, padding:'5px 0' }}>
                      <span style={{ color:'var(--muted)' }}>{k}</span>
                      <span style={{ color: k === 'Montant' ? 'var(--accent)' : 'var(--text)', fontWeight: k === 'Montant' ? 800 : 600, fontFamily: k === 'Montant' ? 'var(--font-mono)' : 'inherit', fontSize: k === 'Montant' ? 15 : 13 }}>{v}</span>
                    </div>
                  ))}
                </div>

                <button type="submit" disabled={loading}
                  className="btn btn-primary btn-lg"
                  style={{ width:'100%', justifyContent:'center', opacity: loading ? 0.7 : 1,
                    background: method === 'especes' ? 'linear-gradient(135deg,#059669,#10b981)' : undefined }}>
                  {loading
                    ? <><span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.8s linear infinite', display:'inline-block' }} /> Envoi...</>
                    : method === 'especes'
                      ? '💵 Enregistrer ma demande espèces'
                      : '✅ Activer mon abonnement'
                  }
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>
      <Footer />
      <style suppressHydrationWarning>{`
        @keyframes spin { to { transform:rotate(360deg) } }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
      `}</style>
    </>
  )
}

export default function ActivationPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight:'100vh', background:'#0a0a1a', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.4)', fontFamily:'system-ui' }}>
        Chargement…
      </div>
    }>
      <ActivationInner />
    </Suspense>
  )
}