'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../lib/auth/AuthContext'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

// ── Quotas par plan ───────────────────────────────────────────────
const QUOTAS_MENSUEL = [
  { label:'Simulation Bac',        val:'2 / sem' },
  { label:'Chat IA Professeur',    val:'20 / sem' },
  { label:'Solveur étape/étape',  val:'20 / sem' },
  { label:'Remédiation IA',        val:'10 / sem' },
  { label:'Analyses performance',  val:'5 / sem' },
  { label:'Cours CNP',             val:'♾️ Illimité' },
  { label:'Programme personnalisé',val:'✅ Inclus' },
  { label:'Bac Blanc',             val:'❌ Non inclus' },
]

const QUOTAS_SPRINT = [
  { label:'Simulation Bac',        val:'5 / sem' },
  { label:'Chat IA Professeur',    val:'30 / sem' },
  { label:'Solveur étape/étape',  val:'♾️ Illimité' },
  { label:'Remédiation IA',        val:'20 / sem' },
  { label:'Analyses performance',  val:'10 / sem' },
  { label:'Cours CNP',             val:'♾️ Illimité' },
  { label:'Programme personnalisé',val:'✅ Avancé' },
  { label:'Bac Blanc',             val:'✅ Inclus' },
]

const QUOTAS_ANNUEL = [
  { label:'Simulation Bac',        val:'2→5 / sem', note:'15h hors sprint · 30h mai-juin' },
  { label:'Chat IA Professeur',    val:'20→30 / sem' },
  { label:'Solveur étape/étape',  val:'20/sem → ♾️' },
  { label:'Remédiation IA',        val:'10→20 / sem' },
  { label:'Analyses performance',  val:'5→10 / sem' },
  { label:'Cours CNP',             val:'♾️ Illimité' },
  { label:'Programme personnalisé',val:'✅ Inclus + Avancé' },
  { label:'Bac Blanc (mai-juin)',  val:'✅ Inclus' },
]

const PAYMENT_METHODS = [
  { id:'d17',             icon:'🏛️', name:'D17 / La Poste' },
  { id:'flouci',          icon:'📱', name:'Flouci' },
  { id:'recharge_mobile', icon:'📞', name:'Recharge mobile' },
]

function QuotaRow({ label, val, note, highlight=false }: { label:string; val:string; note?:string; highlight?:boolean }) {
  const isGreen = val.includes('♾️') || val.includes('Illimité') || val.includes('✅') || val.includes('Inclus')
  const isRed = val.includes('❌')
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', fontSize:12, padding:'5px 0', borderBottom:'1px solid var(--border)' }}>
      <div>
        <span style={{ color:'var(--text2)' }}>{label}</span>
        {note && <div style={{ fontSize:10, color:'var(--muted)', marginTop:1 }}>{note}</div>}
      </div>
      <span style={{ fontFamily:'var(--font-mono)', fontWeight:700, fontSize:11, flexShrink:0, marginLeft:8,
        color: isRed ? '#ef4444' : highlight ? 'var(--gold)' : isGreen ? 'var(--teal)' : 'var(--text)' }}>
        {val}
      </span>
    </div>
  )
}

export default function AbonnementPage() {
  const { user, hasActiveSubscription, subscription } = useAuth()
  const [payment, setPayment] = useState('d17')

  function CtaBtn({ plan, sprint }: { plan: 'mensuel'|'annuel'|'sprint'; sprint: boolean }) {
    const href = `/activation?plan=${plan}&sprint=${sprint}&method=${payment}`
    const isGold = plan === 'sprint'
    const isBest = plan === 'annuel'
    const style: React.CSSProperties = {
      width:'100%', justifyContent:'center', display:'flex', marginTop:20,
      background: isGold
        ? 'linear-gradient(135deg,#f59e0b,#f97316)'
        : isBest
          ? 'linear-gradient(135deg,var(--accent),var(--accent2))'
          : undefined,
      color: isGold ? '#0a0a1a' : undefined,
      border: isGold ? 'none' : undefined,
    }
    if (user) return (
      <Link href={href} className={`btn ${isGold ? '' : 'btn-primary'} btn-lg`} style={style}>
        Procéder au paiement →
      </Link>
    )
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:20 }}>
        <Link href={`/register?redirect=${encodeURIComponent(href)}`}
          className="btn btn-primary btn-lg" style={style}>
          Créer un compte et payer →
        </Link>
        <Link href={`/login?redirect=${encodeURIComponent(href)}`}
          className="btn btn-secondary btn-sm" style={{ width:'100%', justifyContent:'center', display:'flex' }}>
          Déjà inscrit ? Se connecter
        </Link>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>

        {/* ── HERO ── */}
        <section style={{ textAlign:'center', padding:'100px clamp(20px,5vw,60px) 40px', position:'relative' }}>
          <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:600, height:300, background:'radial-gradient(circle, rgba(79,110,247,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />

          {hasActiveSubscription && (
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,214,160,0.1)', border:'1px solid rgba(6,214,160,0.3)', borderRadius:100, padding:'6px 16px', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--teal)', marginBottom:16 }}>
              ✅ Abonnement actif — {subscription?.plan_type}
            </div>
          )}

          <span className="label">Plans & Tarifs</span>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(26px,4vw,48px)', lineHeight:1.1, marginBottom:12 }}>
            Choisissez votre{' '}
            <span style={{ background:'linear-gradient(90deg,var(--accent),var(--teal))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>plan</span>
          </h1>
          <p style={{ fontSize:15, color:'var(--text2)', maxWidth:520, margin:'0 auto 8px' }}>
            Coach IA personnalisé pour réussir votre Bac Tunisie · Paiement en DT 🇹🇳
          </p>
          <p style={{ fontSize:12, color:'var(--muted)', maxWidth:480, margin:'0 auto' }}>
            MathBac Mensuel · Sprint Bac (mai–juin) · MathBac Annuel
          </p>
        </section>

        <div className="container" style={{ maxWidth:1140, paddingBottom:60 }}>

          {/* Méthodes de paiement */}
          <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginBottom:36 }}>
            {PAYMENT_METHODS.map(pm => (
              <button key={pm.id} onClick={() => setPayment(pm.id)}
                style={{
                  display:'flex', alignItems:'center', gap:6, padding:'7px 14px',
                  borderRadius:50, cursor:'pointer', fontSize:12, fontWeight:600,
                  background: payment === pm.id ? 'rgba(79,110,247,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${payment === pm.id ? 'rgba(79,110,247,0.4)' : 'var(--border)'}`,
                  color: payment === pm.id ? 'var(--accent)' : 'var(--text2)',
                  transition:'all 0.2s',
                }}>
                {pm.icon} {pm.name}
              </button>
            ))}
          </div>

          {/* ── 3 CARTES ── */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, alignItems:'start' }}>

            {/* ── PLAN 1 : MathBac Mensuel ── */}
            <div className="card" style={{ padding:28, position:'relative' }}>
              <div style={{ marginBottom:18 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:20 }}>📚</span>
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:19 }}>MathBac Mensuel</span>
                </div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>Hors période mai–juin · Résiliable à tout moment</div>
              </div>

              {/* Prix */}
              <div style={{ marginBottom:6 }}>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:44, color:'var(--text)' }}>60</span>
                <span style={{ fontSize:14, color:'var(--muted)', marginLeft:4 }}>DT / mois</span>
              </div>

              {/* Badge heures */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(79,110,247,0.1)', border:'1px solid rgba(79,110,247,0.25)', borderRadius:50, padding:'4px 12px', fontSize:11, color:'var(--accent)', fontWeight:700, marginBottom:20 }}>
                ⏱ 15 heures / semaine
              </div>

              {/* Note période */}
              <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:8, padding:'8px 12px', marginBottom:20, fontSize:12 }}>
                <div style={{ color:'var(--text2)', lineHeight:1.6 }}>
                  Actif <strong>toute l'année</strong> sauf mai–juin.<br/>
                  <span style={{ color:'var(--muted)', fontSize:11 }}>En mai–juin → passer au Sprint Bac</span>
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:22 }}>
                {QUOTAS_MENSUEL.map((q, i) => <QuotaRow key={i} label={q.label} val={q.val} />)}
              </div>

              <CtaBtn plan="mensuel" sprint={false} />
            </div>

            {/* ── PLAN 2 : Sprint Bac ── */}
            <div className="card" style={{ padding:28, position:'relative', border:'2px solid rgba(245,200,66,0.6)', boxShadow:'0 0 32px rgba(245,200,66,0.15)' }}>
              <div style={{ position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)', background:'linear-gradient(135deg,#f59e0b,#f97316)', color:'#0a0a1a', fontSize:10, fontWeight:900, padding:'4px 16px', borderRadius:20, letterSpacing:'0.06em', whiteSpace:'nowrap' }}>
                🔥 MAI – JUIN UNIQUEMENT
              </div>

              <div style={{ marginBottom:18, marginTop:6 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:20 }}>🚀</span>
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:19, color:'var(--gold)' }}>Sprint Bac</span>
                </div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>Période intensive · Bac Blanc inclus</div>
              </div>

              {/* Prix */}
              <div style={{ marginBottom:6 }}>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:44, color:'var(--gold)' }}>90</span>
                <span style={{ fontSize:14, color:'var(--muted)', marginLeft:4 }}>DT / mois</span>
              </div>

              {/* Badge heures */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(245,200,66,0.12)', border:'1px solid rgba(245,200,66,0.35)', borderRadius:50, padding:'4px 12px', fontSize:11, color:'var(--gold)', fontWeight:700, marginBottom:20 }}>
                ⚡ 30 heures / semaine
              </div>

              {/* Note période */}
              <div style={{ background:'rgba(245,200,66,0.07)', border:'1px solid rgba(245,200,66,0.25)', borderRadius:8, padding:'8px 12px', marginBottom:20, fontSize:12 }}>
                <div style={{ color:'var(--gold)', fontWeight:700, marginBottom:3 }}>📅 Mai et Juin uniquement</div>
                <div style={{ color:'var(--text2)', lineHeight:1.6 }}>
                  90 DT en mai · 90 DT en juin<br/>
                  <span style={{ fontSize:11, color:'var(--muted)' }}>Quotas boostés · Bac Blanc débloqué</span>
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:22 }}>
                {QUOTAS_SPRINT.map((q, i) => <QuotaRow key={i} label={q.label} val={q.val} highlight={true} />)}
              </div>

              <CtaBtn plan="sprint" sprint={true} />
            </div>

            {/* ── PLAN 3 : MathBac Annuel ── */}
            <div className="card" style={{ padding:28, position:'relative', border:'2px solid var(--accent)', boxShadow:'0 0 32px rgba(79,110,247,0.2)' }}>
              <div style={{ position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)', background:'linear-gradient(135deg,var(--accent),var(--accent2))', color:'white', fontSize:10, fontWeight:900, padding:'4px 16px', borderRadius:20, letterSpacing:'0.06em', whiteSpace:'nowrap' }}>
                ⭐ MEILLEURE VALEUR
              </div>

              <div style={{ marginBottom:18, marginTop:6 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:20 }}>🎓</span>
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:19 }}>MathBac Annuel</span>
                </div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>Payé en une fois · Sprint mai–juin inclus</div>
              </div>

              {/* Prix */}
              <div style={{ marginBottom:6 }}>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:44, color:'var(--text)' }}>600</span>
                <span style={{ fontSize:14, color:'var(--muted)', marginLeft:4 }}>DT / an</span>
              </div>

              {/* Économie */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(6,214,160,0.1)', border:'1px solid rgba(6,214,160,0.25)', borderRadius:50, padding:'4px 12px', fontSize:11, color:'var(--teal)', fontWeight:700, marginBottom:20 }}>
                💰 Économisez 120 DT vs mensuel
              </div>

              {/* Décomposition */}
              <div style={{ background:'rgba(79,110,247,0.07)', border:'1px solid rgba(79,110,247,0.2)', borderRadius:8, padding:'10px 14px', marginBottom:20, fontSize:12 }}>
                <div style={{ color:'var(--accent)', fontWeight:700, marginBottom:6 }}>📊 Décomposition incluse :</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text2)' }}>
                    <span>MathBac Mensuel × 10 mois</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontWeight:700 }}>420 DT</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', color:'var(--gold)' }}>
                    <span>🔥 Sprint Bac × 2 mois (mai+juin)</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontWeight:700 }}>180 DT</span>
                  </div>
                  <div style={{ height:1, background:'var(--border)', margin:'4px 0' }} />
                  <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text)', fontWeight:800 }}>
                    <span>Total annuel</span>
                    <span style={{ fontFamily:'var(--font-mono)' }}>700 DT</span>
                  </div>
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:22 }}>
                {QUOTAS_ANNUEL.map((q, i) => (
                  <QuotaRow key={i} label={q.label} val={q.val} note={(q as any).note} />
                ))}
              </div>

              <CtaBtn plan="annuel" sprint={true} />
            </div>

          </div>

          {/* ── NOTE COMPARATIVE ── */}
          <div style={{ marginTop:28, background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:14, padding:'16px 24px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, fontSize:12, textAlign:'center' }}>
              <div>
                <div style={{ fontWeight:700, color:'var(--text)', marginBottom:4 }}>📚 MathBac Mensuel</div>
                <div style={{ color:'var(--muted)', lineHeight:1.7 }}>
                  60 DT/mois · 15h/sem<br/>
                  <span style={{ color:'var(--text2)' }}>Octobre → Avril + Juillet → Septembre</span>
                </div>
              </div>
              <div style={{ borderLeft:'1px solid var(--border)', borderRight:'1px solid var(--border)' }}>
                <div style={{ fontWeight:700, color:'var(--gold)', marginBottom:4 }}>🚀 Sprint Bac</div>
                <div style={{ color:'var(--muted)', lineHeight:1.7 }}>
                  90 DT/mois · 30h/sem<br/>
                  <span style={{ color:'var(--text2)' }}>Mai + Juin uniquement · Bac Blanc inclus</span>
                </div>
              </div>
              <div>
                <div style={{ fontWeight:700, color:'var(--accent)', marginBottom:4 }}>🎓 MathBac Annuel</div>
                <div style={{ color:'var(--muted)', lineHeight:1.7 }}>
                  600 DT/an · tout inclus<br/>
                  <span style={{ color:'var(--teal)' }}>Mensuel + Sprint Bac automatique</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Méthodes paiement info ── */}
          <div style={{ textAlign:'center', marginTop:40, paddingTop:32, borderTop:'1px solid var(--border)' }}>
            <p style={{ fontSize:11, color:'var(--muted)', marginBottom:6 }}>
              🔒 1 abonnement = 1 appareil · ⚡ Activation en moins de 5 min
            </p>
            <p style={{ fontSize:12, color:'var(--text2)' }}>
              Numéro de réception :{' '}
              <strong style={{ fontFamily:'var(--font-mono)', color:'var(--accent)' }}>25 268 970</strong>
            </p>
          </div>

          {/* ── FAQ ── */}
          <section style={{ maxWidth:700, margin:'48px auto 0' }}>
            <h2 style={{ textAlign:'center', marginBottom:24, fontFamily:'var(--font-display)', fontSize:22 }}>Questions fréquentes</h2>
            {[
              { q:'Quelle est la différence entre Mensuel et Sprint Bac ?', a:'MathBac Mensuel (70 DT/mois) est pour toute l\'année hors mai-juin : 30h/semaine de quota. Le Sprint Bac (100 DT/mois) est réservé aux mois intensifs mai-juin : 60h/semaine, Bac Blanc débloqué, tous les quotas boostés.' },
              { q:'L\'abonnement Annuel inclut-il le Sprint Bac ?', a:'Oui ! L\'abonnement Annuel (700 DT) inclut automatiquement MathBac Mensuel pour 10 mois ET Sprint Bac pour mai-juin. Vous passez automatiquement en mode Sprint en mai et juin sans rien payer en plus.' },
              { q:'Comment payer avec D17 ?', a:'Ouvrez l\'app D17, transférez le montant exact vers 25 268 970, copiez la référence de transaction et soumettez-la sur la page d\'activation.' },
              { q:'Mon abonnement est lié à quel appareil ?', a:'À votre première connexion, l\'abonnement se lie automatiquement à votre ordinateur. Contactez le support si vous changez d\'appareil.' },
              { q:'Combien de temps pour activer ?', a:'Moins de 5 minutes après soumission de votre référence. Vérification manuelle par l\'admin puis activation immédiate + email de confirmation.' },
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

      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @media(max-width:900px){
          div[style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}
          div[style*="grid-template-columns:'1fr 1fr 1fr'"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </>
  )
}
