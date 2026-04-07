'use client'
// src/app/login/page.tsx — adapté au design system Bac.AI (Syne + DM Sans + CSS vars)

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const { signIn, user, isLoading } = useAuth()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPwd, setShowPwd]   = useState(false)

  useEffect(() => {
    if (!isLoading && user) router.push(redirect)
  }, [user, isLoading])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) { setError(error); setLoading(false) }
    else router.push(redirect)
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', position:'relative', zIndex:1 }}>

      {/* Glow accent */}
      <div style={{ position:'fixed', top:'20%', left:'50%', transform:'translateX(-50%)', width:500, height:300, background:'radial-gradient(circle, rgba(79,110,247,0.12) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ width:'100%', maxWidth:420, position:'relative', zIndex:1, animation:'fadeInUp 0.6s ease both' }}>

        {/* Logo */}
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', justifyContent:'center', marginBottom:40 }}>
          <div style={{ width:44, height:44, background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 24px rgba(79,110,247,0.4)' }}>
            <span style={{ color:'white', fontFamily:'var(--font-display)', fontWeight:800, fontSize:20 }}>B</span>
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:22, color:'var(--text)', letterSpacing:'-0.02em' }}>
              Bac<span style={{ color:'var(--accent)' }}>.AI</span>
            </div>
            <div style={{ fontSize:10, color:'var(--muted)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Tunisie</div>
          </div>
        </Link>

        {/* Card */}
        <div className="card-glass" style={{ padding:'36px 40px', borderRadius:20 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, marginBottom:6, color:'var(--text)' }}>Connexion</h2>
          <p style={{ fontSize:13, color:'var(--muted)', marginBottom:28 }}>Accédez à votre espace d'apprentissage</p>

          {error && (
            <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'12px 16px', marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:16 }}>⚠️</span>
              <p style={{ fontSize:13, color:'var(--red)', margin:0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:8, fontWeight:500 }}>Adresse email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="votre@email.com"
                className="input"
                style={{ borderRadius:10 }}
              />
            </div>

            <div style={{ marginBottom:24 }}>
              <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:8, fontWeight:500 }}>Mot de passe</label>
              <div style={{ position:'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="input"
                  style={{ borderRadius:10, paddingRight:44 }}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'var(--muted)' }}>
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg"
              style={{ width:'100%', justifyContent:'center', opacity: loading ? 0.7 : 1 }}>
              {loading
                ? <><span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.8s linear infinite', display:'inline-block' }} /> Connexion...</>
                : 'Se connecter →'}
            </button>
          </form>

          <div style={{ marginTop:24, paddingTop:20, borderTop:'1px solid var(--border)', display:'flex', flexDirection:'column', gap:10, textAlign:'center' }}>
            <p style={{ fontSize:13, color:'var(--muted)', margin:0 }}>
              Pas encore de compte ?{' '}
              <Link href={`/register${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} style={{ color:'var(--accent)', fontWeight:600, textDecoration:'none' }}>S'inscrire gratuitement</Link>
            </p>
            <p style={{ fontSize:13, color:'var(--muted)', margin:0 }}>
              Pas encore abonné ?{' '}
              <Link href="/abonnement" style={{ color:'var(--gold)', fontWeight:600, textDecoration:'none' }}>Voir les plans →</Link>
            </p>
            <p style={{ fontSize:12, color:'var(--muted)', margin:0 }}>
              Abonnement actif ?{' '}
              <Link href="/activation" style={{ color:'var(--teal)', fontWeight:500, textDecoration:'none' }}>Activer mon accès</Link>
            </p>
          </div>
        </div>

        <p style={{ textAlign:'center', fontSize:11, color:'var(--muted)', marginTop:16 }}>
          🔒 Connexion sécurisée · Abonnement lié à cet appareil
        </p>
      </div>
    </div>
  )
}


export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#0a0a1a'}}/>}>
      <LoginPageInner />
    </Suspense>
  )
}

