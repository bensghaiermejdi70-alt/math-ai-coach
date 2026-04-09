
'use client'
// src/app/profile/page.tsx

import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ProfilePage() {
  const { user, profile, quotas, quotaLimits, hasActiveSubscription, daysRemaining, isAdmin, signOut } = useAuth()

  const QUOTA_BARS = [
    { icon:'🎯', label:'Simulations Bac',    used: quotas?.simulations_used || 0, limit: quotaLimits.simulations_per_week },
    { icon:'🤖', label:'Chat IA',           used: quotas?.chat_used         || 0, limit: quotaLimits.chat_per_week },
    { icon:'📐', label:'Solveur',           used: quotas?.solver_used       || 0, limit: quotaLimits.solver_per_week },
    { icon:'💡', label:'Remédiation IA',    used: quotas?.remediation_used  || 0, limit: quotaLimits.remediation_per_week },
    { icon:'📊', label:'Analyses',          used: quotas?.analyses_used     || 0, limit: quotaLimits.analyses_per_week },
  ]

  function pct(used: number, limit: number) {
    if (limit === -1 || limit === 0) return 0
    return Math.min(100, Math.round((used / limit) * 100))
  }

  function barColor(p: number) {
    if (p >= 100) return 'var(--red)'
    if (p >= 75)  return 'var(--orange)'
    return 'var(--accent)'
  }

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1 }}>
        <section style={{ padding:'100px clamp(20px,5vw,60px) 60px' }}>
          <div style={{ maxWidth:900, margin:'0 auto' }}>

            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:40, flexWrap:'wrap' }}>
              <div style={{ width:72, height:72, background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:30, color:'white', boxShadow:'0 0 30px rgba(79,110,247,0.35)' }}>
                {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div style={{ flex:1 }}>
                <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(20px,3vw,28px)', marginBottom:4 }}>
                  {profile?.full_name || 'Mon profil'}
                </h1>
                <p style={{ fontSize:14, color:'var(--muted)', margin:0 }}>{user?.email}</p>
                <div style={{ display:'flex', gap:8, marginTop:8, flexWrap:'wrap' }}>
                  {profile?.section_bac && (
                    <span className="badge badge-blue">Bac {profile.section_bac}</span>
                  )}
                  {isAdmin && (
                    <span className="badge badge-gold">👑 Admin</span>
                  )}
                  {hasActiveSubscription && !isAdmin && (
                    <span className="badge badge-teal">✅ Abonné</span>
                  )}
                </div>
              </div>
              <div style={{ display:'flex', gap:10 }}>
                {isAdmin && (
                  <Link href="/admin" className="btn btn-gold btn-sm">⚙️ Admin</Link>
                )}
                <button onClick={signOut} className="btn btn-ghost btn-sm">Déconnexion</button>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>

              {/* Abonnement */}
              <div className="card" style={{ padding:28 }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, marginBottom:20, color:'var(--text)' }}>Mon abonnement</h3>

                {isAdmin ? (
                  <div style={{ textAlign:'center', padding:'24px 0' }}>
                    <div style={{ fontSize:40, marginBottom:12 }}>👑</div>
                    <p style={{ color:'var(--gold)', fontWeight:700, fontSize:15, margin:0 }}>Accès Admin illimité</p>
                    <p style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>Tous les quotas sont illimités</p>
                  </div>

                ) : hasActiveSubscription && profile ? (
                  <>
                    <div style={{
                      display:'inline-flex', alignItems:'center', gap:8, marginBottom:20,
                      background: daysRemaining && daysRemaining <= 7 ? 'rgba(249,115,22,0.1)' : 'rgba(6,214,160,0.1)',
                      border: `1px solid ${daysRemaining && daysRemaining <= 7 ? 'rgba(249,115,22,0.4)' : 'rgba(6,214,160,0.4)'}`,
                      borderRadius:100, padding:'5px 14px',
                    }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background: daysRemaining && daysRemaining <= 7 ? 'var(--orange)' : 'var(--teal)', animation:'pulse 2s ease infinite', display:'inline-block' }} />
                      <span style={{ fontSize:12, fontFamily:'var(--font-mono)', color: daysRemaining && daysRemaining <= 7 ? 'var(--orange)' : 'var(--teal)', fontWeight:700 }}>
                        Actif · {daysRemaining} jours restants
                      </span>
                    </div>

                    <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                      {[
                        ['Plan', profile.plan_type?.replace('_', ' ') || ''],
                        ['Expire le', profile.subscription_end ? new Date(profile.subscription_end).toLocaleDateString('fr-TN', { day:'numeric', month:'long', year:'numeric' }) : ''],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:13, padding:'7px 0', borderBottom:'1px solid var(--border)' }}>
                          <span style={{ color:'var(--muted)' }}>{k}</span>
                          <span style={{ color:'var(--text)', fontWeight:600, textTransform: k === 'Plan' ? 'capitalize' : 'none' }}>{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Barre expiration */}
                    <div style={{ marginBottom:20 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)', marginBottom:6 }}>
                        <span>Temps restant</span>
                        <span>{daysRemaining}j / {profile.plan_type === 'annuel' ? '365j' : '30j'}</span>
                      </div>
                      <div className="progress">
                        <div className="progress-fill" style={{ width:`${Math.min(100,(daysRemaining||0)/(profile.plan_type==='annuel'?365:30)*100)}%`, background: daysRemaining&&daysRemaining<=7?'var(--orange)':'linear-gradient(90deg,var(--accent),var(--teal))' }} />
                      </div>
                    </div>

                    <Link href="/abonnement" className="btn btn-ghost btn-sm" style={{ width:'100%', justifyContent:'center' }}>
                      Renouveler / Upgrade →
                    </Link>
                  </>

                ) : (
                  <div style={{ textAlign:'center', padding:'20px 0' }}>
                    <div style={{ fontSize:36, marginBottom:12 }}>💳</div>
                    <p style={{ fontWeight:600, color:'var(--text)', marginBottom:6 }}>Aucun abonnement actif</p>
                    <p style={{ fontSize:12, color:'var(--muted)', marginBottom:20 }}>Accès limité aux fonctionnalités gratuites</p>
                    <Link href="/abonnement" className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>
                      Voir les abonnements →
                    </Link>
                  </div>
                )}
              </div>

              {/* Quotas */}
              <div className="card" style={{ padding:28 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, color:'var(--text)', margin:0 }}>Quotas cette semaine</h3>
                  <span style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', background:'var(--surface2)', padding:'3px 9px', borderRadius:8 }}>🔄 Lundi</span>
                </div>

                {isAdmin ? (
                  <div style={{ textAlign:'center', padding:'30px 0', color:'var(--muted)' }}>
                    <span style={{ fontSize:32 }}>♾️</span>
                    <p style={{ marginTop:8, fontSize:13 }}>Illimité pour l'admin</p>
                  </div>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                    {QUOTA_BARS.map((q, i) => {
                      const unlimited = q.limit === -1
                      const noAccess  = q.limit === 0 && !hasActiveSubscription
                      const p         = pct(q.used, q.limit)
                      return (
                        <div key={i}>
                          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13, marginBottom:6 }}>
                            <span style={{ color:'var(--text2)' }}>{q.icon} {q.label}</span>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, color: p >= 100 ? 'var(--red)' : p >= 75 ? 'var(--orange)' : 'var(--text2)' }}>
                              {unlimited ? '♾️' : noAccess ? '🔒' : `${q.used}/${q.limit}`}
                            </span>
                          </div>
                          {!unlimited && q.limit > 0 && (
                            <div className="progress">
                              <div className="progress-fill" style={{ width:`${p}%`, background: barColor(p) }} />
                            </div>
                          )}
                          {noAccess && (
                            <div style={{ height:6, background:'rgba(255,255,255,0.05)', borderRadius:100 }}>
                              <div style={{ height:6, width:'100%', background:'rgba(255,255,255,0.08)', borderRadius:100 }} />
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {!hasActiveSubscription && (
                      <Link href="/abonnement" className="btn btn-primary btn-sm" style={{ width:'100%', justifyContent:'center', marginTop:4 }}>
                        Débloquer tous les quotas →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
