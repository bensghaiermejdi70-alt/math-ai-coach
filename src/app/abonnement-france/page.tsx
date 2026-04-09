'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../lib/auth/AuthContext'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

// ── Plans Stripe France ────────────────────────────────────────────
const PLANS = [
  {
    id: 'mensuel',
    name: 'MathBac Mensuel',
    icon: '📚',
    price: 19,
    period: 'mois',
    hours: '15h / semaine',
    hoursColor: '#4f6ef7',
    description: "Hors période mai–juin · Résiliable à tout moment",
    badge: null,
    borderColor: 'var(--border)',
    shadowColor: 'transparent',
    priceColor: 'var(--text)',
    stripeUrl: 'https://buy.stripe.com/aFa9ASfRr4Ikgyo3y20gw0a',
    priceId: 'price_1TJSBJCwS8UwOtxy1Byt0mZx',
    productId: 'prod_UI2FexFokbGkTi',
    quotas: [
      { label:'Simulation Bac',        val:'2 / sem' },
      { label:'Chat IA Professeur',    val:'20 / sem' },
      { label:'Solveur étape/étape',  val:'20 / sem' },
      { label:'Remédiation IA',        val:'10 / sem' },
      { label:'Analyses performance',  val:'5 / sem' },
      { label:'Cours officiels',       val:'♾️ Illimité' },
      { label:'Programme personnalisé',val:'✅ Inclus' },
      { label:'Bac Blanc',             val:'❌ Non inclus' },
    ],
  },
  {
    id: 'sprint',
    name: 'Sprint Bac',
    icon: '🚀',
    price: 29,
    period: 'mois',
    hours: '30h / semaine',
    hoursColor: '#f59e0b',
    description: "Mai–juin uniquement · Bac Blanc inclus",
    badge: '🔥 MAI – JUIN',
    borderColor: 'rgba(245,200,66,0.6)',
    shadowColor: 'rgba(245,200,66,0.15)',
    priceColor: '#fbbf24',
    stripeUrl: 'https://buy.stripe.com/bJe14mgVv7Uw1Du5Ga0gw0b',
    priceId: 'price_1TJSCMCwS8UwOtxyvocQR82P',
    productId: 'prod_UI2GFnMR7vOZEF',
    quotas: [
      { label:'Simulation Bac',        val:'5 / sem' },
      { label:'Chat IA Professeur',    val:'30 / sem' },
      { label:'Solveur étape/étape',  val:'♾️ Illimité' },
      { label:'Remédiation IA',        val:'20 / sem' },
      { label:'Analyses performance',  val:'10 / sem' },
      { label:'Cours officiels',       val:'♾️ Illimité' },
      { label:'Programme personnalisé',val:'✅ Avancé' },
      { label:'Bac Blanc',             val:'✅ Inclus' },
    ],
  },
  {
    id: 'annuel',
    name: 'MathBac Annuel',
    icon: '🎓',
    price: 199,
    period: 'an',
    hours: '15h → 30h (mai-juin)',
    hoursColor: '#10b981',
    description: "Payé en une fois · Sprint mai–juin inclus",
    badge: '⭐ MEILLEURE VALEUR',
    borderColor: 'var(--accent)',
    shadowColor: 'rgba(79,110,247,0.2)',
    priceColor: 'var(--text)',
    stripeUrl: 'https://buy.stripe.com/dRm8wOdJjgr281SfgK0gw0c',
    priceId: 'price_1TJSD9CwS8UwOtxyqSxqxmna',
    productId: 'prod_UI2HyfGtGPC8K8',
    quotas: [
      { label:'Simulation Bac',        val:'2→5 / sem' },
      { label:'Chat IA Professeur',    val:'20→30 / sem' },
      { label:'Solveur étape/étape',  val:'20/sem → ♾️' },
      { label:'Remédiation IA',        val:'10→20 / sem' },
      { label:'Analyses performance',  val:'5→10 / sem' },
      { label:'Cours officiels',       val:'♾️ Illimité' },
      { label:'Programme personnalisé',val:'✅ Inclus + Avancé' },
      { label:'Bac Blanc (mai–juin)', val:'✅ Inclus' },
    ],
  },
]

function QuotaRow({ label, val }: { label: string; val: string }) {
  const isGreen = val.includes('♾️') || val.includes('✅') || val.includes('Illimité') || val.includes('Inclus') || val.includes('Avancé')
  const isRed = val.includes('❌')
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, padding:'5px 0', borderBottom:'1px solid var(--border)' }}>
      <span style={{ color:'var(--text2)' }}>{label}</span>
      <span style={{ fontFamily:'var(--font-mono)', fontWeight:700, fontSize:11, flexShrink:0, marginLeft:8,
        color: isRed ? '#ef4444' : isGreen ? 'var(--teal)' : 'var(--text)' }}>
        {val}
      </span>
    </div>
  )
}

export default function AbonnementFrancePage() {
  // CORRECTION : Ajout de 'profile' dans la déstructuration
  const { user, profile, hasActiveSubscription, daysRemaining } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const handleStripeRedirect = (plan: typeof PLANS[0]) => {
    setLoading(plan.id)
    // Ajouter l'email utilisateur en paramètre si disponible
    const url = user?.email
      ? `${plan.stripeUrl}?prefilled_email=${encodeURIComponent(user.email)}`
      : plan.stripeUrl
    window.location.href = url
  }

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>

        {/* ── HERO ── */}
        <section style={{ textAlign:'center', padding:'100px clamp(20px,5vw,60px) 40px', position:'relative' }}>
          <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:600, height:300, background:'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />

          {/* CORRECTION : profile est maintenant disponible */}
          {hasActiveSubscription && profile && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(6,214,160,0.1)',
                border: '1px solid rgba(6,214,160,0.3)',
                borderRadius: 100,
                padding: '6px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--teal)',
                marginBottom: 16
              }}
            >
              {/* CORRECTION : plan_type existe maintenant sur Profile */}
              ✅ Abonnement actif — {profile.plan_type}
            </div>
          )}

          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.3)', borderRadius:100, padding:'5px 14px', fontSize:12, color:'#60a5fa', marginBottom:16 }}>
            🇫🇷 Programmes France · Paiement sécurisé Stripe
          </div>

          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(26px,4vw,48px)', lineHeight:1.1, marginBottom:12 }}>
            Plans{' '}
            <span style={{ background:'linear-gradient(90deg,#60a5fa,#4f6ef7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>France</span>
          </h1>
          <p style={{ fontSize:15, color:'var(--text2)', maxWidth:520, margin:'0 auto 8px' }}>
            Coach IA pour le Bac France · Terminale, Première, STMG, Maths Expertes
          </p>
          <p style={{ fontSize:12, color:'var(--muted)', maxWidth:460, margin:'0 auto' }}>
            Paiement sécurisé par carte bancaire via Stripe · Facturation mensuelle ou annuelle
          </p>
        </section>

        <div className="container" style={{ maxWidth:1140, paddingBottom:60 }}>

          {/* Stripe badge */}
          <div style={{ display:'flex', justifyContent:'center', marginBottom:36 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:50, padding:'8px 20px', fontSize:12, color:'var(--muted)' }}>
              <span style={{ fontSize:16 }}>🔒</span>
              <span>Paiement 100% sécurisé via</span>
              <span style={{ fontWeight:800, color:'var(--text)', letterSpacing:'-0.02em' }}>Stripe</span>
              <span>· Visa · Mastercard · Amex</span>
            </div>
          </div>

          {/* ── 3 CARTES ── */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, alignItems:'start' }}>

            {PLANS.map(plan => (
              <div key={plan.id} className="card" style={{
                padding:28, position:'relative',
                border: plan.badge ? `2px solid ${plan.borderColor}` : `1px solid ${plan.borderColor}`,
                boxShadow: plan.shadowColor !== 'transparent' ? `0 0 32px ${plan.shadowColor}` : 'none',
              }}>
                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)',
                    background: plan.id === 'sprint'
                      ? 'linear-gradient(135deg,#f59e0b,#f97316)'
                      : 'linear-gradient(135deg,var(--accent),var(--accent2))',
                    color: plan.id === 'sprint' ? '#0a0a1a' : 'white',
                    fontSize:10, fontWeight:900, padding:'4px 16px', borderRadius:20,
                    letterSpacing:'0.06em', whiteSpace:'nowrap',
                  }}>
                    {plan.badge}
                  </div>
                )}

                <div style={{ marginBottom:18, marginTop: plan.badge ? 6 : 0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:20 }}>{plan.icon}</span>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:19, color: plan.id === 'sprint' ? 'var(--gold)' : 'var(--text)' }}>
                      {plan.name}
                    </span>
                  </div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>{plan.description}</div>
                </div>

                {/* Prix */}
                <div style={{ marginBottom:6 }}>
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:44, color:plan.priceColor }}>{plan.price}</span>
                  <span style={{ fontSize:14, color:'var(--muted)', marginLeft:4 }}>€ / {plan.period}</span>
                </div>

                {/* Heures badge */}
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  background: `${plan.hoursColor}18`,
                  border: `1px solid ${plan.hoursColor}40`,
                  borderRadius:50, padding:'4px 12px', fontSize:11,
                  color: plan.hoursColor, fontWeight:700, marginBottom:20,
                }}>
                  ⏱ {plan.hours}
                </div>

                {/* Détail annuel */}
                {plan.id === 'annuel' && (
                  <div style={{ background:'rgba(79,110,247,0.07)', border:'1px solid rgba(79,110,247,0.2)', borderRadius:8, padding:'10px 14px', marginBottom:20, fontSize:12 }}>
                    <div style={{ color:'var(--accent)', fontWeight:700, marginBottom:6 }}>📊 Décomposition :</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text2)' }}>
                        <span>MathBac Mensuel × 10 mois</span>
                        <span style={{ fontFamily:'var(--font-mono)', fontWeight:700 }}>190 €</span>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', color:'var(--gold)' }}>
                        <span>🔥 Sprint Bac × 2 mois (mai+juin)</span>
                        <span style={{ fontFamily:'var(--font-mono)', fontWeight:700 }}>58 €</span>
                      </div>
                      <div style={{ height:1, background:'var(--border)', margin:'4px 0' }} />
                      <div style={{ display:'flex', justifyContent:'space-between' }}>
                        <span style={{ color:'var(--text)', fontWeight:700 }}>Total annuel</span>
                        <span style={{ fontFamily:'var(--font-mono)', fontWeight:800, color:'var(--teal)' }}>199 € ✓</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sprint détail */}
                {plan.id === 'sprint' && (
                  <div style={{ background:'rgba(245,200,66,0.07)', border:'1px solid rgba(245,200,66,0.25)', borderRadius:8, padding:'8px 12px', marginBottom:20, fontSize:12 }}>
                    <div style={{ color:'var(--gold)', fontWeight:700, marginBottom:3 }}>📅 Mai et Juin uniquement</div>
                    <div style={{ color:'var(--text2)', lineHeight:1.6 }}>
                      29 € en mai · 29 € en juin<br/>
                      <span style={{ fontSize:11, color:'var(--muted)' }}>Quotas boostés · Bac Blanc débloqué</span>
                    </div>
                  </div>
                )}

                {/* Quotas */}
                <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:22 }}>
                  {plan.quotas.map((q, i) => <QuotaRow key={i} label={q.label} val={q.val} />)}
                </div>

                {/* CTA Stripe */}
                <button
                  onClick={() => handleStripeRedirect(plan)}
                  disabled={loading === plan.id}
                  style={{
                    width:'100%', padding:'14px', borderRadius:12, border:'none',
                    background: loading === plan.id ? 'rgba(255,255,255,0.1)' :
                      plan.id === 'sprint' ? 'linear-gradient(135deg,#f59e0b,#f97316)' :
                      plan.id === 'annuel' ? 'linear-gradient(135deg,var(--accent),var(--accent2))' :
                      'linear-gradient(135deg,#4f6ef7,#6366f1)',
                    color: plan.id === 'sprint' ? '#0a0a1a' : 'white',
                    fontSize:14, fontWeight:800, cursor: loading === plan.id ? 'not-allowed' : 'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                    boxShadow: plan.id === 'sprint' ? '0 4px 20px rgba(245,158,11,0.4)' :
                      plan.id === 'annuel' ? '0 4px 20px rgba(79,110,247,0.4)' :
                      '0 4px 16px rgba(99,102,241,0.3)',
                    transition:'all 0.2s',
                  }}
                >
                  {loading === plan.id ? (
                    <>
                      <span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.7s linear infinite', display:'inline-block' }} />
                      Redirection…
                    </>
                  ) : (
                    <>
                      <span>💳</span>
                      Payer {plan.price} € / {plan.period} →
                    </>
                  )}
                </button>

                <div style={{ textAlign:'center', marginTop:10, fontSize:11, color:'var(--muted)' }}>
                  🔒 Paiement sécurisé Stripe · Annulable à tout moment
                </div>
              </div>
            ))}

          </div>

          {/* ── Tableau comparatif ── */}
          <div style={{ marginTop:28, background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:14, padding:'16px 24px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, fontSize:12, textAlign:'center' }}>
              <div>
                <div style={{ fontWeight:700, color:'var(--text)', marginBottom:4 }}>📚 MathBac Mensuel</div>
                <div style={{ color:'var(--muted)', lineHeight:1.7 }}>
                  29 €/mois · 30h/sem<br/>
                  <span style={{ color:'var(--text2)' }}>Hors mai–juin</span>
                </div>
              </div>
              <div style={{ borderLeft:'1px solid var(--border)', borderRight:'1px solid var(--border)' }}>
                <div style={{ fontWeight:700, color:'var(--gold)', marginBottom:4 }}>🚀 Sprint Bac</div>
                <div style={{ color:'var(--muted)', lineHeight:1.7 }}>
                  49 €/mois · 60h/sem<br/>
                  <span style={{ color:'var(--text2)' }}>Mai + Juin · Bac Blanc inclus</span>
                </div>
              </div>
              <div>
                <div style={{ fontWeight:700, color:'var(--accent)', marginBottom:4 }}>🎓 MathBac Annuel</div>
                <div style={{ color:'var(--muted)', lineHeight:1.7 }}>
                  299 €/an · tout inclus<br/>
                  <span style={{ color:'var(--teal)' }}>Sprint Bac automatique</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── FAQ ── */}
          <section style={{ maxWidth:700, margin:'48px auto 0' }}>
            <h2 style={{ textAlign:'center', marginBottom:24, fontFamily:'var(--font-display)', fontSize:22 }}>Questions fréquentes</h2>
            {[
              { q:'Comment fonctionne le paiement Stripe ?', a:'Vous êtes redirigé vers la page de paiement sécurisée Stripe. Entrez vos coordonnées bancaires (Visa, Mastercard, Amex). Le paiement est traité immédiatement et votre abonnement est activé automatiquement.' },
              { q:'Puis-je annuler mon abonnement ?', a:'Oui, à tout moment depuis votre espace client Stripe (lien envoyé par email après souscription). L\'annulation prend effet à la fin de la période en cours.' },
              { q:'L\'abonnement Annuel inclut-il le Sprint Bac ?', a:'Oui ! Les 299 €/an incluent automatiquement MathBac Mensuel (29 € × 10 mois) et Sprint Bac (49 € × 2 mois mai-juin). Vous passez automatiquement en mode Sprint en mai et juin.' },
              { q:'Quelle est la différence Mensuel / Sprint ?', a:'MathBac Mensuel (29 €) : 30h/semaine, actif hors mai-juin. Sprint Bac (49 €) : 60h/semaine, Bac Blanc débloqué, actif uniquement en mai et juin pour la période intensive de préparation.' },
              { q:'Mon abonnement est lié à quel compte ?', a:'À votre adresse email de connexion. L\'abonnement est personnel et non partageable. Contactez le support si vous changez d\'email.' },
            ].map((item, i) => (
              <details key={i} style={{ marginBottom:10 }}>
                <summary style={{ padding:'16px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, cursor:'pointer', fontWeight:600, fontSize:14, color:'var(--text)', userSelect:'none', listStyle:'none', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  {item.q}
                  <span style={{ color:'var(--muted)', fontSize:12, marginLeft:12 }}>▼</span>
                </summary>
                <div style={{ padding:'14px 20px', background:'var(--bg2)', border:'1px solid var(--border)', borderTop:'none', borderRadius:'0 0 12px 12px', fontSize:13, color:'var(--text2)', lineHeight:1.7 }}>
                  {item.a}
                </div>
              </details>
            ))}
          </section>

        </div>
      </main>
      <Footer />

      <style suppressHydrationWarning>{`
        @keyframes spin { to { transform:rotate(360deg) } }
        @media(max-width:900px) {
          .plans-grid { grid-template-columns:1fr !important }
        }
      `}</style>
    </>
  )
}