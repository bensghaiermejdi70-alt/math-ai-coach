'use client'
import { useState, Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/layout/Navbar'

function LoginInner() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [googleL,  setGoogleL]  = useState(false)
  const [resetL,   setResetL]   = useState(false)
  const [error,    setError]    = useState('')
  const [message,  setMessage]  = useState(
    typeof window !== 'undefined' && new URL(window.location.href).searchParams.get('updated') === '1'
      ? '✅ Mot de passe mis à jour ! Connecte-toi avec ton nouveau mot de passe.'
      : ''
  )

  useEffect(() => {
    const urlError = searchParams.get('error')
    if (urlError) {
      setError(decodeURIComponent(urlError))
      window.history.replaceState({}, '', '/login')
    }
  }, [searchParams])

  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)

    // 🔒 VÉRIFICATION PRÉALABLE: Empêcher la connexion si déjà connecté ailleurs
    // Note: Cette vérification est aussi faite côté AuthContext, mais on la redondance ici pour UX rapide
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(
        error.message.includes('Invalid login credentials')
          ? 'Email ou mot de passe incorrect'
          : error.message
      )
      setLoading(false)
      return
    }

    if (data.user) {
      const isUserAdmin = data.user.email === 'bensghaiermejdi70@gmail.com'
      
      if (!isUserAdmin) {
        // Vérifier si session existe déjà AVANT de créer la nouvelle
        const { data: prof } = await supabase
          .from('profiles')
          .select('current_session_id, is_active')
          .eq('id', data.user.id)
          .single()
        
        // 🔒 BLOCAGE: Si abonnement actif ET session existe = déjà connecté ailleurs
        if (prof?.is_active && prof?.current_session_id) {
          // Déconnecter immédiatement de Supabase
          await supabase.auth.signOut()
         setError("🔒 Ce compte est déjà connecté sur un autre appareil.\n\nDéconnectez-vous d'abord de l'autre session pour pouvoir vous connecter ici.")
          setLoading(false)
          return
        }
        
        // Créer la nouvelle session
        const sessionId = crypto.randomUUID()
        localStorage.setItem('mathbac_session_id', sessionId)
        await supabase.from('profiles')
          .update({ current_session_id: sessionId })
          .eq('id', data.user.id)
      }
      
      // Redirection après connexion réussie
      window.location.href = redirectTo !== '/' ? redirectTo : '/'
    }
  }

  async function handleGoogle() {
    setGoogleL(true)
    
    // 🔒 Pour Google: la vérification se fera dans AuthContext après le callback
    // car on ne peut pas vérifier avant la redirection OAuth
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  async function handleReset() {
    if (!email.trim()) { 
      setError("Entre d'abord ton email"); 
      return 
    }
    
    setError(''); 
    setResetL(true)

    const redirectUrl = `${window.location.origin}/auth/callback`

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectUrl,
    })

    setResetL(false)
    
    if (error) {
      setError(error.message)
    } else {
      setMessage('📩 Email envoyé ! Clique le lien dans ta boîte mail (vérifie aussi les spams)')
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a1a', padding:'20px' }}>
        <div style={{ width:'100%', maxWidth:400 }}>

          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{ fontSize:36, marginBottom:8 }}>🎓</div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:26, color:'white', margin:'0 0 6px' }}>
              Math<strong style={{ color:'#4f6ef7' }}>Bac</strong>.AI
            </h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, margin:0 }}>Connecte-toi à ton espace</p>
          </div>

          <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32 }}>

            {error && (
              <div style={{ 
                background: error.includes('🔒') ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.1)', 
                border: error.includes('🔒') ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(239,68,68,0.3)', 
                borderRadius:10, 
                padding:'12px 16px', 
                marginBottom:16, 
                fontSize:13, 
                color: error.includes('🔒') ? '#fbbf24' : '#fca5a5',
                whiteSpace: 'pre-line'
              }}>
                {error.includes('🔒') ? '🔒 ' : '⚠️ '}
                {error.replace('🔒 ', '')}
              </div>
            )}
            {message && (
              <div style={{ background:'rgba(6,214,160,0.1)', border:'1px solid rgba(6,214,160,0.3)', borderRadius:10, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#6ee7b7' }}>
                {message}
              </div>
            )}

            <button onClick={handleGoogle} disabled={googleL}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'12px', borderRadius:12, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:14, fontWeight:600, cursor:'pointer', marginBottom:20, transition:'all 0.2s', opacity: googleL ? 0.7 : 1 }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.06)'}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {googleL ? 'Redirection...' : 'Continuer avec Google'}
            </button>

            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>ou</span>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.1)' }} />
            </div>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom:14 }}>
                <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="ton@email.com"
                  style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:14, outline:'none', boxSizing:'border-box' as any }}
                  onFocus={e => e.target.style.borderColor = 'rgba(79,110,247,0.6)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
              </div>

              <div style={{ marginBottom:8 }}>
                <label style={{ display:'block', fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:6, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>Mot de passe</label>
                <div style={{ position:'relative' }}>
                  <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                    placeholder="••••••••"
                    style={{ width:'100%', padding:'11px 44px 11px 14px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', color:'white', fontSize:14, outline:'none', boxSizing:'border-box' as any }}
                    onFocus={e => e.target.style.borderColor = 'rgba(79,110,247,0.6)'}
                    onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'rgba(255,255,255,0.4)' }}>
                    {showPwd ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ textAlign:'right', marginBottom:20 }}>
                <button type="button" onClick={handleReset} disabled={resetL}
                  style={{ background:'none', border:'none', color: resetL ? 'rgba(79,110,247,0.5)' : '#4f6ef7', fontSize:12, cursor:'pointer', fontWeight:600 }}>
                  {resetL ? 'Envoi...' : 'Mot de passe oublié ?'}
                </button>
              </div>

              <button type="submit" disabled={loading}
                style={{ width:'100%', padding:'13px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', fontSize:15, fontWeight:800, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition:'all 0.2s' }}>
                {loading ? 'Connexion...' : 'Se connecter →'}
              </button>
            </form>

            <p style={{ textAlign:'center', marginTop:20, fontSize:13, color:'rgba(255,255,255,0.4)', margin:'20px 0 0' }}>
              Pas encore de compte ?{' '}
              <Link href="/register" style={{ color:'#4f6ef7', fontWeight:700, textDecoration:'none' }}>
                S'inscrire gratuitement
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', background:'#0a0a1a' }} />}>
      <LoginInner />
    </Suspense>
  )
}

