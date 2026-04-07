'use client'
// src/components/QuotaGuard.tsx — adapté au design system Bac.AI

import Link from 'next/link'
import { useAuth, QuotaType } from '@/lib/auth/AuthContext'

const LABELS: Record<QuotaType, string> = {
  simulations:'Simulation Bac', chat:'Chat IA', solver:'Solveur',
  remediation:'Remédiation IA', analyses:'Analyse performance',
}

export default function QuotaGuard({ type, children, fallback }: {
  type: QuotaType; children: React.ReactNode; fallback?: React.ReactNode
}) {
  const { user, hasActiveSubscription, checkQuota, quotas, quotaLimits, isAdmin } = useAuth()

  if (isAdmin) return <>{children}</>

  if (!user) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', textAlign:'center' }}>
      <div style={{ width:64, height:64, background:'rgba(79,110,247,0.12)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, marginBottom:16 }}>🔐</div>
      <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:8 }}>Connexion requise</h3>
      <p style={{ fontSize:13, color:'var(--muted)', maxWidth:300, marginBottom:20 }}>
        Vous devez être connecté pour utiliser {LABELS[type]}.
      </p>
      <Link href="/login" className="btn btn-primary">Se connecter →</Link>
    </div>
  )

  if (!checkQuota(type)) {
    const limit = quotaLimits[`${type}_per_week` as keyof typeof quotaLimits] as number
    const colMap: Record<QuotaType,string> = { simulations:'simulations_used', chat:'chat_used', solver:'solver_used', remediation:'remediation_used', analyses:'analyses_used' }
    const used  = (quotas as any)?.[colMap[type]] || 0

    return fallback || (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', textAlign:'center', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20 }}>
        <div style={{ width:64, height:64, background: hasActiveSubscription ? 'rgba(249,115,22,0.12)' : 'rgba(79,110,247,0.12)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, marginBottom:16 }}>
          {hasActiveSubscription ? '⚡' : '🔒'}
        </div>

        {hasActiveSubscription ? (
          <>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:8 }}>Quota hebdomadaire atteint</h3>
            <p style={{ fontSize:13, color:'var(--muted)', maxWidth:320, marginBottom:16 }}>
              Vous avez utilisé <strong style={{ color:'var(--text)' }}>{used}/{limit}</strong> {LABELS[type].toLowerCase()} cette semaine.
            </p>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'10px 20px', fontSize:13, color:'var(--text2)', marginBottom:16 }}>
              🔄 Renouvellement <strong style={{ color:'var(--text)' }}>lundi prochain</strong>
            </div>
            <p style={{ fontSize:12, color:'var(--muted)' }}>
              Besoin de plus ?{' '}
              <Link href="/abonnement" style={{ color:'var(--gold)', fontWeight:600, textDecoration:'none' }}>🔥 Option Sprint Bac</Link>
            </p>
          </>
        ) : (
          <>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:8 }}>Fonctionnalité Premium</h3>
            <p style={{ fontSize:13, color:'var(--muted)', maxWidth:300, marginBottom:20 }}>
              {limit === 0
                ? `${LABELS[type]} est réservé aux abonnés.`
                : `Vous avez utilisé vos ${limit} accès gratuits de la semaine.`}
            </p>
            <Link href="/abonnement" className="btn btn-primary">Voir les abonnements →</Link>
          </>
        )}
      </div>
    )
  }

  return <>{children}</>
}
