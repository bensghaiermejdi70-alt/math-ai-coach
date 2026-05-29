'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../lib/auth/AuthContext'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

// ── Matières disponibles ───────────────────────────────────────────
const MATIERES = [
  {
    key: 'mathematiques',
    icon: '🧮',
    label: 'Mathématiques',
    desc: 'Simulation Bac · Chat Prof · Solveur étape/étape',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.07))',
    border: 'rgba(99,102,241,0.35)',
    available: true,
    accesPayant: ['Simulation Bac IA','Chat Professeur IA','Solveur étape/étape','Remédiation & Analyse'],
    // ── CORRECTION : accesFree enrichi ──
    accesFree: [
      'Cours CNP officiels (Terminale, Première, Seconde)',
      'Examens officiels du Bac + corrections détaillées',
      'Annales Maths Tunisie (sujets officiels)',
      'Programme complet par section (Maths, Sciences, Technique, Éco, Info)',
    ],
  },
  {
    key: 'physique',
    icon: '⚗️',
    label: 'Physique-Chimie',
    desc: 'Simulation Physique · Chat Prof · Solveur Physique-Chimie',
    color: '#06d6a0',
    gradient: 'linear-gradient(135deg,rgba(6,214,160,0.15),rgba(16,185,129,0.07))',
    border: 'rgba(6,214,160,0.35)',
    available: true,
    accesPayant: ['Simulation Physique-Chimie IA','Chat Professeur Physique','Solveur Physique-Chimie','Remédiation & Analyse'],
    // ── CORRECTION : accesFree enrichi ──
    accesFree: [
      'Cours Physique-Chimie officiels (Terminale, Première)',
      'Examens officiels Physique-Chimie + corrections',
      'Annales Physique-Chimie Tunisie (sujets officiels)',
      'Programme complet par section (Sciences Exp., Technique, Maths)',
    ],
  },
  {
    key: 'informatique',
    icon: '💻',
    label: 'Informatique',
    desc: 'Simulation Bac Info · Chat Prof · Solveur étape/étape · Bac Blanc IA',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.07))',
    border: 'rgba(99,102,241,0.35)',
    available: true,
    accesPayant: ['Simulation Bac Informatique IA','Chat Professeur Informatique','Solveur Algo & BD','Remédiation & Analyse'],
    accesFree: [
      'Cours Informatique officiels (Algorithmique, BD, TIC)',
      'Examens officiels Informatique + sujets (2015→2025)',
      'Annales Bac Informatique Tunisie (Algo + BD)',
      'Programme complet section Sc. Informatiques',
    ],
  },
  {
    key: 'svt',
    icon: '🌱',
    label: 'SVT',
    desc: 'Simulation SVT · Génétique · Physiologie · Reproduction · Géologie · Bac Blanc SVT',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg,rgba(34,197,94,0.15),rgba(16,185,129,0.07))',
    border: 'rgba(34,197,94,0.38)',
    available: true,
    accesPayant: [
      'Simulation Bac SVT IA',
      'Chat Professeur SVT',
      'Solveur SVT étape/étape',
      'Bac Blanc SVT (mai-juin)',
    ],
    accesFree: [
      'Cours SVT officiels (Génétique · Physiologie · Reproduction · Nutrition)',
      'Examens officiels SVT + corrections (2015→2025)',
      'Annales Bac SVT Tunisie — Sc. Expérimentales & Section Maths',
      'Programme complet — Sc. Expérimentales (coef.5) · Maths (coef.2 + Géologie)',
    ],
  },
  {
    key: 'anglais',
    icon: '🇬🇧',
    label: 'Anglais',
    desc: 'Reading · Essay · Grammar · Bac Blanc Anglais · Programme CNP officiel',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(236,72,153,0.07))',
    border: 'rgba(245,158,11,0.4)',
    available: true,
    accesPayant: [
      'Simulation Bac Anglais IA',
      'Chat Professeur Anglais',
      'Correction Essay & Writing IA',
      'Bac Blanc Anglais (mai-juin)',
    ],
    accesFree: [
      'Cours Anglais officiels — 4 Units · Programme CNP',
      'Examens officiels + sujets Section Lettres & Toutes sections (2015→2025)',
      'Annales Bac Anglais Tunisie — Lettres · Sciences · Éco',
      'Grammar Focus · Vocabulary · Writing tips gratuits',
    ],
  },

]

// ── Quotas par plan ───────────────────────────────────────────────
const QUOTAS_MENSUEL = [
  { label:'Simulation Bac',        val:'5 / sem' },
  { label:'Chat IA Professeur',    val:'20 / sem' },
  { label:'Solveur étape/étape',  val:'20 / sem' },
  { label:'Remédiation IA',        val:'10 / sem' },
  { label:'Analyses performance',  val:'5 / sem' },
  { label:'Cours CNP',             val:'♾️ Illimité' },
  { label:'Programme personnalisé',val:'✅ Inclus' },
  { label:'Bac Blanc',             val:'❌ Non inclus' },
]

const QUOTAS_SPRINT = [
  { label:'Simulation Bac',        val:'10 / sem' },
  { label:'Chat IA Professeur',    val:'30 / sem' },
  { label:'Solveur étape/étape',   val:'30 / sem' },
  { label:'Remédiation IA',        val:'20 / sem' },
  { label:'Analyses performance',  val:'10 / sem' },
  { label:'Cours CNP',             val:'♾️ Illimité' },
  { label:'Programme personnalisé',val:'✅ Avancé' },
  { label:'Bac Blanc',             val:'✅ Inclus' },
]

const QUOTAS_ANNUEL = [
  { label:'Simulation Bac',        val:'10 / sem', note:'15h hors sprint · 30h mai-juin' },
  { label:'Chat IA Professeur',    val:'30 / sem' },
  { label:'Solveur étape/étape',   val:'20 / sem ' },
  { label:'Remédiation IA',        val:'20 / sem' },
  { label:'Analyses performance',  val:'10 / sem' },
  { label:'Cours CNP',             val:'♾️ Illimité' },
  { label:'Programme personnalisé',val:'✅ Inclus + Avancé' },
  { label:'Bac Blanc (mai-juin)',  val:'✅ Inclus' },
]

const PAYMENT_METHODS = [
  { id:'d17',             icon:'🏛️', name:'D17 / La Poste' },
  { id:'espece',          icon:'📱', name:'virement / versement' },
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
  const { user, profile, quotas, quotaLimits, hasActiveSubscription, activePlanTypes, daysRemaining, isAdmin, signOut } = useAuth()
  const PLAN_LABELS_DISPLAY: Record<string,string> = { mensuel_mathematiques:'Maths Mensuel', sprint_bac_mathematiques:'Maths Sprint', annuel_mathematiques:'Maths Annuel', mensuel_physique:'Physique Mensuel', sprint_bac_physique:'Physique Sprint', annuel_physique:'Physique Annuel', mensuel_informatique:'Info Mensuel', sprint_bac_informatique:'Info Sprint', annuel_informatique:'Info Annuel', mensuel_anglais:'Anglais Mensuel', sprint_anglais:'Anglais Sprint', annuel_anglais:'Anglais Annuel', mensuel_svt:'SVT Mensuel', sprint_svt:'SVT Sprint', annuel_svt:'SVT Annuel' }
  const [payment, setPayment] = useState('d17')
  const [matiereKey, setMatiereKey] = useState<string>('')
  const matiere = MATIERES.find(m => m.key === matiereKey)

  function CtaBtn({ plan, sprint }: { plan: 'mensuel'|'annuel'|'sprint'; sprint: boolean }) {
    const href = `/activation?plan=${plan}&sprint=${sprint}&method=${payment}&matiere=${matiereKey}`
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
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center', gap:8, background:'rgba(6,214,160,0.1)', border:'1px solid rgba(6,214,160,0.3)', borderRadius:100, padding:'6px 16px', marginBottom:16 }}>
              {(activePlanTypes?.length > 0 ? activePlanTypes : profile?.plan_type ? [profile.plan_type] : []).map((pt: string) => (
                <span key={pt} style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(6,214,160,0.1)', border:'1px solid rgba(6,214,160,0.3)', borderRadius:100, padding:'5px 14px', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--teal)' }}>
                  ✅ {PLAN_LABELS_DISPLAY[pt] ?? pt}
                </span>
              ))}
            </div>
          )}

          <span className="label">Plans & Tarifs</span>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(26px,4vw,48px)', lineHeight:1.1, marginBottom:12 }}>
            Choisissez votre{' '}
            <span style={{ background:'linear-gradient(90deg,var(--accent),var(--teal))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>matière</span>
          </h1>
          <p style={{ fontSize:15, color:'var(--text2)', maxWidth:520, margin:'0 auto 8px' }}>
            Coach IA personnalisé pour réussir votre Bac Tunisie · Paiement en DT 🇹🇳
          </p>
          <p style={{ fontSize:12, color:'var(--muted)', maxWidth:480, margin:'0 auto' }}>
            Abonnement Mensuel · Sprint Bac (mai–juin) · Abonnement Annuel
          </p>
        </section>

        <div className="container" style={{ maxWidth:1140, paddingBottom:60 }}>

          {/* ── SÉLECTION MATIÈRE ── */}
          <div style={{ marginBottom:40 }}>
            <h2 style={{ textAlign:'center', fontWeight:800, fontSize:18, marginBottom:20, color:'var(--text)' }}>
              📚 Étape 1 — Choisissez votre matière
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12 }}>
              {MATIERES.map(m => (
                <button key={m.key} onClick={() => m.available && setMatiereKey(m.key)}
                  disabled={!m.available}
                  style={{
                    padding:'16px 18px', borderRadius:14,
                    background: matiereKey===m.key ? m.gradient : 'rgba(255,255,255,0.03)',
                    border: `1.5px solid ${matiereKey===m.key ? m.border : 'var(--border)'}`,
                    cursor: m.available ? 'pointer' : 'not-allowed',
                    opacity: m.available ? 1 : 0.5,
                    display:'flex', alignItems:'center', gap:12, textAlign:'left',
                    fontFamily:'inherit', transition:'all 0.2s',
                    boxShadow: matiereKey===m.key ? `0 4px 20px ${m.color}25` : 'none',
                  }}>
                  <span style={{fontSize:26}}>{m.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:matiereKey===m.key?m.color:'var(--text)',marginBottom:2}}>{m.label}</div>
                    <div style={{fontSize:10,color:'var(--muted)',lineHeight:1.4}}>{m.desc}</div>
                    {!m.available && <div style={{fontSize:9,color:'#f59e0b',fontWeight:700,marginTop:2}}>🔜 Prochainement</div>}
                  </div>
                  {matiereKey===m.key && <span style={{marginLeft:'auto',color:m.color,fontSize:18,fontWeight:900}}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* ── CARTE GRATUIT (si matière sélectionnée) ── */}
          {matiere && (
            <div style={{ marginBottom:28 }}>
              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:16, padding:'20px 24px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                  <span style={{fontSize:24}}>🎁</span>
                  <div>
                    {/* ── CORRECTION : titre dynamique avec nom matière ── */}
                    <div style={{fontWeight:800,fontSize:16,color:'var(--text)'}}>Accès Gratuit — {matiere.label}</div>
                    <div style={{fontSize:12,color:'var(--muted)'}}>Sans abonnement · Toujours disponible</div>
                  </div>
                  <span style={{marginLeft:'auto',fontWeight:900,fontSize:22,color:'var(--teal)'}}>0 DT</span>
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:12 }}>
                  {matiere.accesFree.map(item => (
                    <span key={item} style={{fontSize:11,padding:'4px 12px',borderRadius:20,background:'rgba(6,214,160,0.1)',border:'1px solid rgba(6,214,160,0.25)',color:'var(--teal)',fontWeight:600}}>
                      ✅ {item}
                    </span>
                  ))}
                </div>
                <div style={{ padding:'10px 16px', background:'rgba(255,255,255,0.04)', borderRadius:10 }}>
                  <div style={{fontWeight:700,color:'var(--text2)',fontSize:12,marginBottom:8}}>🔒 Fonctionnalités IA — avec abonnement :</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {matiere.accesPayant.map(item => (
                      <span key={item} style={{fontSize:11,padding:'4px 12px',borderRadius:20,background:'rgba(99,102,241,0.1)',border:'1px solid rgba(99,102,241,0.25)',color:'var(--accent)',fontWeight:600}}>
                        ⭐ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── MESSAGE si pas de matière ── */}
          {!matiere && (
            <div style={{ textAlign:'center', padding:'32px 20px', color:'var(--muted)', fontSize:14, background:'rgba(255,255,255,0.02)', borderRadius:14, border:'1px solid var(--border)', marginBottom:32 }}>
              ↑ Sélectionnez une matière ci-dessus pour voir les plans et tarifs
            </div>
          )}

          {/* ── PLANS PAYANTS (si matière sélectionnée) ── */}
          {matiere && (
            <div>
              <h2 style={{ textAlign:'center', fontWeight:800, fontSize:18, marginBottom:8, color:'var(--text)' }}>
                📋 Étape 2 — Choisissez votre plan
              </h2>

              {/* Méthodes de paiement */}
              <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginBottom:28 }}>
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

                {/* ── PLAN 1 : Abonnement Mensuel ── */}
                <div className="card" style={{ padding:28, position:'relative' }}>
                  <div style={{ marginBottom:18 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:20 }}>📚</span>
                      {/* ── CORRECTION : "Abonnement Mensuel" ── */}
                      <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:19 }}>Abonnement Mensuel</span>
                    </div>
                    <div style={{ fontSize:11, color:'var(--muted)' }}>Hors période mai–juin · Résiliable à tout moment</div>
                  </div>

                  <div style={{ marginBottom:6 }}>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:44, color:'var(--text)' }}>60</span>
                    <span style={{ fontSize:14, color:'var(--muted)', marginLeft:4 }}>DT / mois</span>
                  </div>

                  <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(79,110,247,0.1)', border:'1px solid rgba(79,110,247,0.25)', borderRadius:50, padding:'4px 12px', fontSize:11, color:'var(--accent)', fontWeight:700, marginBottom:20 }}>
                    ⏱ 15 heures / semaine
                  </div>

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

                  <div style={{ marginBottom:6 }}>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:44, color:'var(--gold)' }}>90</span>
                    <span style={{ fontSize:14, color:'var(--muted)', marginLeft:4 }}>DT / mois</span>
                  </div>

                  <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(245,200,66,0.12)', border:'1px solid rgba(245,200,66,0.35)', borderRadius:50, padding:'4px 12px', fontSize:11, color:'var(--gold)', fontWeight:700, marginBottom:20 }}>
                    ⚡ 30 heures / semaine
                  </div>

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

                {/* ── PLAN 3 : Abonnement Annuel ── */}
                <div className="card" style={{ padding:28, position:'relative', border:'2px solid var(--accent)', boxShadow:'0 0 32px rgba(79,110,247,0.2)' }}>
                  <div style={{ position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)', background:'linear-gradient(135deg,var(--accent),var(--accent2))', color:'white', fontSize:10, fontWeight:900, padding:'4px 16px', borderRadius:20, letterSpacing:'0.06em', whiteSpace:'nowrap' }}>
                    ⭐ MEILLEURE VALEUR
                  </div>

                  <div style={{ marginBottom:18, marginTop:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:20 }}>🎓</span>
                      {/* ── CORRECTION : "Abonnement Annuel" ── */}
                      <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:19 }}>Abonnement Annuel</span>
                    </div>
                    <div style={{ fontSize:11, color:'var(--muted)' }}>Payé en une fois · Sprint mai–juin inclus</div>
                  </div>

                  <div style={{ marginBottom:6 }}>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:44, color:'var(--text)' }}>600</span>
                    <span style={{ fontSize:14, color:'var(--muted)', marginLeft:4 }}>DT / an</span>
                  </div>

                  <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(6,214,160,0.1)', border:'1px solid rgba(6,214,160,0.25)', borderRadius:50, padding:'4px 12px', fontSize:11, color:'var(--teal)', fontWeight:700, marginBottom:20 }}>
                    💰 Économisez 120 DT vs mensuel
                  </div>

                  <div style={{ background:'rgba(79,110,247,0.07)', border:'1px solid rgba(79,110,247,0.2)', borderRadius:8, padding:'10px 14px', marginBottom:20, fontSize:12 }}>
                    <div style={{ color:'var(--accent)', fontWeight:700, marginBottom:6 }}>📊 Décomposition incluse :</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text2)' }}>
                        {/* ── CORRECTION : "Abonnement Mensuel" dans décomposition ── */}
                        <span>Abonnement Mensuel × 10 mois</span>
                        <span style={{ fontFamily:'var(--font-mono)', fontWeight:700 }}>420 DT</span>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', color:'var(--gold)' }}>
                        <span>🔥 Sprint Bac × 2 mois (mai+juin)</span>
                        <span style={{ fontFamily:'var(--font-mono)', fontWeight:700 }}>180 DT</span>
                      </div>
                      <div style={{ height:1, background:'var(--border)', margin:'4px 0' }} />
                      <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text)', fontWeight:800 }}>
                        <span>Total annuel</span>
                        <span style={{ fontFamily:'var(--font-mono)' }}>600 DT</span>
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
            </div>
          )}

          {/* ── NOTE COMPARATIVE ── */}
          <div style={{ marginTop:28, background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:14, padding:'16px 24px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, fontSize:12, textAlign:'center' }}>
              <div>
                {/* ── CORRECTION : "Abonnement Mensuel" ── */}
                <div style={{ fontWeight:700, color:'var(--text)', marginBottom:4 }}>📚 Abonnement Mensuel</div>
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
                {/* ── CORRECTION : "Abonnement Annuel" ── */}
                <div style={{ fontWeight:700, color:'var(--accent)', marginBottom:4 }}>🎓 Abonnement Annuel</div>
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
              <strong style={{ fontFamily:'var(--font-mono)', color:'var(--accent)' }}>99 268 970</strong>
            </p>
          </div>

          {/* ── FAQ ── */}
          <section style={{ maxWidth:700, margin:'48px auto 0' }}>
            <h2 style={{ textAlign:'center', marginBottom:24, fontFamily:'var(--font-display)', fontSize:22 }}>Questions fréquentes</h2>
            {[
              { q:'Quelle est la différence entre Mensuel et Sprint Bac ?', a:'L\'abonnement Mensuel (60 DT/mois) est pour toute l\'année hors mai-juin : 15h/semaine de quota. Le Sprint Bac (90 DT/mois) est réservé aux mois intensifs mai-juin : 30h/semaine, Bac Blanc débloqué, tous les quotas boostés.' },
              { q:'L\'abonnement Annuel inclut-il le Sprint Bac ?', a:'Oui ! L\'abonnement Annuel (600 DT) inclut automatiquement l\'Abonnement Mensuel pour 10 mois ET Sprint Bac pour mai-juin. Vous passez automatiquement en mode Sprint en mai et juin sans rien payer en plus.' },
              { q:'Comment payer avec D17 ?', a:'Ouvrez l\'app D17, transférez le montant exact vers 99 268 970, copiez la référence de transaction et soumettez-la sur la page d\'activation.' },
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