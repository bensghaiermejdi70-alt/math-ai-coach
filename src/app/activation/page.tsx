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
  mensuel: 60, sprint: 90, annuel: 600,
}
const PLAN_LABELS: Record<string, string> = {
  mensuel: 'MathBac Mensuel', sprint: 'Sprint Bac', annuel: 'MathBac Annuel',
}

// ── 2 méthodes uniquement ─────────────────────────────────────────
const METHODS = {
  d17: {
    icon: '🏛️',
    title: 'D17 / La Poste',
    color: '#4f6ef7',
    steps: [
      "Ouvrir l'app D17 ou e-Dinar",
      "Aller dans 'Transfert d'argent'",
      "Envoyer le montant EXACT vers : 99 268 970",
      "Copier la référence de transaction",
      "Remplir le formulaire et soumettre",
    ],
    ref_label: 'Référence transaction D17 *',
    ref_placeholder: 'Ex: TRF20240515XXXX',
    ref_type: 'text' as const,
    show_phone: true,
    show_screenshot: true,
    show_contact: false,
  },
  especes: {
    icon: '💵',
    title: 'Versement espèces / Virement CCP',
    color: '#25d366',
    steps: [
      "Contacter par téléphone ou WhatsApp : 99 268 970",
      "Convenir du mode de remise (versement espece  ou virement CCP)",
      "N° CCP : 17000000000046507174 — Mejdi Ben Sghaier",
      "Envoyer le montant exact puis entrer votre email ci-contre",
    ],
    ref_label: 'Votre email MathBac.AI *',
    ref_placeholder: 'votre@email.com',
    ref_type: 'email' as const,
    show_phone: false,
    show_screenshot: true,
    show_contact: true,
  },
}

// ── Panel admin ───────────────────────────────────────────────────
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
      const res = await fetch('/api/admin/subscriptions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_target: emailTarget.trim().toLowerCase(),
          plan_type: planTarget,
          status: 'active',
          action: 'activate_by_email',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsg(`✅ Abonnement ${PLAN_LABELS[planTarget]} activé pour ${emailTarget}`)
      setEmailTarget('')
    } catch (err: any) {
      setMsg(`❌ ${err.message}`)
    } finally { setLoading(false) }
  }

  return (
    <div style={{ background:'linear-gradient(135deg,rgba(245,200,66,0.08),rgba(245,158,11,0.04))', border:'1px solid rgba(245,200,66,0.3)', borderRadius:20, padding:'24px 28px', marginBottom:36 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
        <span style={{ fontSize:20 }}>⚙️</span>
        <h3 style={{ margin:0, fontSize:16, color:'var(--gold)' }}>Panel Admin — Activation manuelle</h3>
      </div>
      <form onSubmit={handleActivate} style={{ display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:10, alignItems:'end' }}>
        <div>
          <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:5, fontWeight:600 }}>Email client</label>
          <input type="email" value={emailTarget} onChange={e => setEmailTarget(e.target.value)} required
            placeholder="client@email.com" className="input" style={{ borderRadius:9 }} />
        </div>
        <div>
          <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:5, fontWeight:600 }}>Plan</label>
          <select value={planTarget} onChange={e => setPlanTarget(e.target.value)}
            className="input" style={{ borderRadius:9, background:'var(--surface)', color:'var(--text)', cursor:'pointer' }}>
            <option value="mensuel">MathBac Mensuel — 60 DT</option>
            <option value="sprint">Sprint Bac — 90 DT</option>
            <option value="annuel">MathBac Annuel — 600 DT</option>
          </select>
        </div>
        <button type="submit" disabled={loading}
          style={{ padding:'10px 18px', borderRadius:9, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#f59e0b,#f97316)', color:'#0a0a1a', fontWeight:800, fontSize:13, opacity:loading?0.7:1 }}>
          {loading ? '⏳' : '✅ Activer'}
        </button>
      </form>
      {msg && (
        <div style={{ marginTop:12, padding:'9px 14px', borderRadius:9, fontSize:13, fontWeight:600,
          background: msg.startsWith('✅') ? 'rgba(6,214,160,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${msg.startsWith('✅') ? 'rgba(6,214,160,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: msg.startsWith('✅') ? 'var(--teal)' : 'var(--red)' }}>
          {msg}
        </div>
      )}
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────
function ActivationInner() {
  const searchParams = useSearchParams()
  const planParam   = searchParams.get('plan') || 'mensuel'

  const { user, isAdmin, refreshSubscription } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)

  const [method,     setMethod]     = useState<'d17'|'especes'>('d17')
  const [ref,        setRef]        = useState('')
  const [phone,      setPhone]      = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [loading,    setLoading]    = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [error,      setError]      = useState('')

  const price     = PLAN_PRICES[planParam] || 60
  const planLabel = PLAN_LABELS[planParam] || 'MathBac Mensuel'
  const info      = METHODS[method]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!ref.trim()) { setError('Ce champ est requis.'); return }
    setLoading(true)

    try {
      // Upload capture si fournie
      let screenshotUrl = null
      if (screenshot && user) {
        try {
          const supabase = createClient()
          const ext  = screenshot.name.split('.').pop()
          const path = `screenshots/${user.id}/${Date.now()}.${ext}`
          const { data: up } = await supabase.storage.from('payment-screenshots').upload(path, screenshot)
          if (up) {
            const { data: { publicUrl } } = createClient().storage.from('payment-screenshots').getPublicUrl(path)
            screenshotUrl = publicUrl
          }
        } catch (_) {}
      }

      // Insert via API route (contourne RLS)
      const res = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id:               user?.id || null,
          plan_type:             planParam,
          status:                method === 'especes' ? 'pending_cash' : 'pending',
          price_paid:            price,
          payment_method:        method,
          payment_reference:     ref.trim(),
          payment_phone:         phone || null,
          payment_screenshot_url: screenshotUrl,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur enregistrement')

      // Notification admin
      try {
        await fetch('/api/notify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plan: planLabel, price: `${price} DT`,
            method: info.title, reference: ref.trim(),
            phone: phone || 'non renseigné',
            email: user?.email || ref.trim(),
            screenshot: screenshotUrl || 'aucune',
          }),
        })
      } catch (_) {}

      if (user) await refreshSubscription()
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Erreur. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  // ── Succès ────────────────────────────────────────────────────
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
              ? "Demande enregistrée. Notre équipe vous contactera pour confirmation."
              : "Paiement en cours de vérification. Activation dans les plus brefs délais."}
          </p>
          <div className="card" style={{ textAlign:'left', marginBottom:24 }}>
            {[['Plan', planLabel], ['Montant', `${price} DT`], ['Méthode', info.title], ['Référence', ref]].map(([k, v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
                <span style={{ color:'var(--muted)' }}>{k}</span>
                <span style={{ color:'var(--text)', fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/" className="btn btn-primary">← Retour au site</Link>
            {method === 'especes' && (
              <a href="https://wa.me/21699268970" target="_blank" rel="noopener"
                style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'11px 20px', borderRadius:12, background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.3)', color:'#25d366', fontSize:14, fontWeight:700, textDecoration:'none' }}>
                💬 WhatsApp
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )

  // ── Formulaire principal ──────────────────────────────────────
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingBottom:60 }}>
        {/* Header */}
        <section style={{ padding:'90px clamp(20px,5vw,60px) 32px', textAlign:'center' }}>
          <span className="label">Activation abonnement</span>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(22px,3.5vw,36px)', marginBottom:8 }}>
            Activer mon abonnement
          </h1>
          <p style={{ fontSize:15, color:'var(--text2)' }}>
            <strong style={{ color:'var(--text)', fontSize:20 }}>{price} DT</strong>
            {' · '}{planLabel}
          </p>
        </section>

        <div className="container" style={{ maxWidth:880 }}>
          {isAdmin && <AdminPanel />}

          {/* ── Choix méthode ── */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:32 }}>

            {/* D17 */}
            <button onClick={() => { setMethod('d17'); setRef(''); setError('') }}
              style={{
                padding:'24px 20px', borderRadius:18, cursor:'pointer', textAlign:'left',
                transition:'all 0.25s',
                background: method === 'd17'
                  ? 'linear-gradient(135deg,rgba(79,110,247,0.15),rgba(79,110,247,0.05))'
                  : 'rgba(255,255,255,0.03)',
                border: `2px solid ${method === 'd17' ? '#4f6ef7' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: method === 'd17' ? '0 8px 32px rgba(79,110,247,0.2)' : 'none',
              }}>
              <div style={{ fontSize:32, marginBottom:10 }}>🏛️</div>
              <div style={{ fontWeight:800, fontSize:16, color: method === 'd17' ? '#4f6ef7' : 'var(--text)', marginBottom:4 }}>
                D17 / La Poste
              </div>
              <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.5 }}>
                Transfert via app D17 ou e-Dinar vers le numéro 99 268 970
              </div>
              {method === 'd17' && (
                <div style={{ marginTop:12, fontSize:11, fontWeight:700, color:'#4f6ef7', letterSpacing:'0.05em' }}>
                  ✓ SÉLECTIONNÉ
                </div>
              )}
            </button>

            {/* Espèces / Virement */}
            <button onClick={() => { setMethod('especes'); setRef(''); setError('') }}
              style={{
                padding:'24px 20px', borderRadius:18, cursor:'pointer', textAlign:'left',
                transition:'all 0.25s',
                background: method === 'especes'
                  ? 'linear-gradient(135deg,rgba(37,211,102,0.15),rgba(37,211,102,0.05))'
                  : 'rgba(255,255,255,0.03)',
                border: `2px solid ${method === 'especes' ? '#25d366' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: method === 'especes' ? '0 8px 32px rgba(37,211,102,0.2)' : 'none',
              }}>
              <div style={{ fontSize:32, marginBottom:10 }}>💵</div>
              <div style={{ fontWeight:800, fontSize:16, color: method === 'especes' ? '#25d366' : 'var(--text)', marginBottom:4 }}>
                Versement espèces / Virement CCP
              </div>
              <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.5 }}>
                versement espece ou virement CCP · N° 17000000000046507174
              </div>
              {method === 'especes' && (
                <div style={{ marginTop:12, fontSize:11, fontWeight:700, color:'#25d366', letterSpacing:'0.05em' }}>
                  ✓ SÉLECTIONNÉ
                </div>
              )}
            </button>
          </div>

          {/* ── Formulaire unifié ── */}
          <div style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${info.color}30`, borderRadius:20, padding:32 }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:24, color:'var(--text)',
              borderBottom:`2px solid ${info.color}40`, paddingBottom:12 }}>
              {info.icon} {method === 'd17' ? 'Instructions D17' : 'Versement / Virement CCP'}
            </h3>

            {/* Étapes */}
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
              {info.steps.map((step, i) => (
                <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, marginTop:1, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900, color:'white',
                    background: method === 'especes'
                      ? 'linear-gradient(135deg,#25d366,#059669)'
                      : 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6, margin:0 }}>{step}</p>
                </div>
              ))}
            </div>

            {/* Contacts pour espèces */}
            {info.show_contact && (
              <div style={{ background:'rgba(37,211,102,0.08)', border:'1px solid rgba(37,211,102,0.25)', borderRadius:12, padding:'14px 18px', marginBottom:24, display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
                <span style={{ fontSize:13, color:'var(--text2)', fontWeight:600 }}>Contacter :</span>
                <a href="tel:+21699268970"
                  style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:10, background:'rgba(37,211,102,0.12)', border:'1px solid rgba(37,211,102,0.3)', color:'#25d366', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                  📞 99 268 970
                </a>
                <a href="https://wa.me/21699268970" target="_blank" rel="noopener"
                  style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:10, background:'rgba(37,211,102,0.12)', border:'1px solid rgba(37,211,102,0.3)', color:'#25d366', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                  💬 WhatsApp
                </a>
              </div>
            )}

            {/* Numéro D17 */}
            {method === 'd17' && (
              <div style={{ background:'rgba(79,110,247,0.08)', border:'1px solid rgba(79,110,247,0.2)', borderRadius:10, padding:'12px 16px', marginBottom:24 }}>
                <span style={{ fontSize:13, color:'var(--text2)' }}>
                  <strong style={{ color:'var(--text)' }}>Numéro D17 :</strong>{' '}
                  <span style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', fontSize:17, fontWeight:700, letterSpacing:'0.06em' }}>99 268 970</span>
                </span>
              </div>
            )}

            {/* ── Formulaire ── */}
            <div style={{ borderTop:`1px solid rgba(255,255,255,0.08)`, paddingTop:24, marginTop:4 }}>
              <h4 style={{ fontSize:15, fontWeight:700, marginBottom:18, color:'var(--text)' }}>
                📝 {method === 'especes' ? 'Enregistrer ma demande' : "Formulaire d'activation"}
              </h4>

              {error && (
                <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'10px 14px', marginBottom:16, fontSize:13, color:'var(--red)' }}>
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Téléphone (D17 seulement) */}
                {info.show_phone && (
                  <div style={{ marginBottom:14 }}>
                    <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:6, fontWeight:600 }}>
                      Téléphone utilisé pour le paiement
                    </label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                      placeholder="2X XXX XXX" className="input" style={{ borderRadius:10 }} />
                  </div>
                )}

                {/* Référence / Email */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:6, fontWeight:600 }}>
                    {info.ref_label}
                  </label>
                  <input type={info.ref_type} value={ref}
                    onChange={e => setRef(e.target.value)} required
                    placeholder={info.ref_placeholder}
                    className={`input${method === 'd17' ? ' input-mono' : ''}`}
                    style={{ borderRadius:10 }}
                  />
                  {method === 'especes' && (
                    <p style={{ fontSize:11, color:'var(--muted)', marginTop:5 }}>
                      Votre email sera utilisé pour activer votre abonnement après vérification.
                    </p>
                  )}
                </div>

                {/* Capture d'écran */}
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:6, fontWeight:600 }}>
                    Capture d'écran (optionnel)
                  </label>
                  <div onClick={() => fileRef.current?.click()}
                    style={{ border:'2px dashed var(--border)', borderRadius:10, padding:16, textAlign:'center', cursor:'pointer', transition:'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${info.color}60`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                    {screenshot
                      ? <p style={{ color:'var(--teal)', fontSize:13, margin:0 }}>✅ {screenshot.name}</p>
                      : <div><div style={{ fontSize:22, marginBottom:5 }}>📎</div><p style={{ fontSize:12, color:'var(--muted)', margin:0 }}>Cliquer pour ajouter</p></div>
                    }
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }}
                    onChange={e => setScreenshot(e.target.files?.[0] || null)} />
                  <p style={{ fontSize:11, color:'var(--muted)', marginTop:6 }}>
                    💬 Ou envoyez la capture sur WhatsApp : <a href="https://wa.me/21699268970" target="_blank" rel="noopener" style={{ color:'#25d366' }}>99 268 970</a>
                  </p>
                </div>

                {/* Récap */}
                <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:10, padding:'14px 16px', marginBottom:20 }}>
                  {[['Plan', planLabel], ['Montant', `${price} DT`], ['Méthode', info.title]].map(([k, v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:13, padding:'5px 0' }}>
                      <span style={{ color:'var(--muted)' }}>{k}</span>
                      <span style={{ color: k === 'Montant' ? 'var(--accent)' : 'var(--text)', fontWeight: k === 'Montant' ? 800 : 600, fontSize: k === 'Montant' ? 15 : 13 }}>{v}</span>
                    </div>
                  ))}
                </div>

                <button type="submit" disabled={loading}
                  style={{ width:'100%', padding:'13px', borderRadius:12, border:'none',
                    background: method === 'especes'
                      ? 'linear-gradient(135deg,#25d366,#059669)'
                      : 'linear-gradient(135deg,#4f6ef7,#7c3aed)',
                    color:'white', fontSize:15, fontWeight:800,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1 }}>
                  {loading ? '⏳ Envoi en cours...' :
                    method === 'especes' ? '💵 Enregistrer ma demande' : '✅ Activer mon abonnement'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ActivationPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', background:'#0a0a1a' }} />}>
      <ActivationInner />
    </Suspense>
  )
}