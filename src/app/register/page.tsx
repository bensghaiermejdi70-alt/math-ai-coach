'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import { ADMIN_EMAIL } from '@/lib/types/monetisation'

const SECTIONS = [
  { value:'math',    label:'🧮 Mathématiques' },
  { value:'science', label:'🔬 Sciences Exp.' },
  { value:'tech',    label:'⚙️ Sciences Tech.' },
  { value:'info',    label:'💻 Informatique' },
  { value:'eco',     label:'📊 Éco-Gestion' },
]

export default function RegisterPage() {
  const { signUp } = useAuth()
  const [form, setForm] = useState({
    full_name:'', email:'', phone:'', section_bac:'', password:'', confirm:''
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (k: string, v: string) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  // Détecter si c'est l'email admin → formulaire simplifié
  const isAdminEmail = form.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirm) return setError('Les mots de passe ne correspondent pas')
    if (form.password.length < 6) return setError('Mot de passe trop court (6 car. min)')
    setLoading(true)
    const { error } = await signUp({
      email: form.email,
      password: form.password,
      full_name: isAdminEmail ? 'Admin Bac.AI' : form.full_name,
      phone: form.phone,
      section_bac: form.section_bac,
    })
    if (error) { setError(error); setLoading(false) }
    else setSuccess(true)
  }

  if (success) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20, position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:440, width:'100%', textAlign:'center', animation:'fadeInUp 0.6s ease both' }}>
        <div style={{ fontSize:64, marginBottom:20 }}>{isAdminEmail ? '👑' : '📧'}</div>
        <h2 style={{ fontFamily:'var(--font-display)', marginBottom:12 }}>
          {isAdminEmail ? 'Compte admin créé !' : 'Vérifiez votre email'}
        </h2>
        <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7, marginBottom:24 }}>
          {isAdminEmail
            ? 'Confirmez votre email puis connectez-vous. Vous aurez un accès illimité automatiquement.'
            : <>Un lien de confirmation a été envoyé à <strong style={{ color:'var(--text)' }}>{form.email}</strong>.<br/>Cliquez dessus pour activer votre compte.</>
          }
        </p>
        <Link href="/login" className="btn btn-primary btn-lg">
          {isAdminEmail ? 'Se connecter →' : 'Aller à la connexion →'}
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', position:'relative', zIndex:1 }}>
      <div style={{ position:'fixed', top:'15%', right:'10%', width:400, height:400, background:'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth: isAdminEmail ? 440 : 500, position:'relative', zIndex:1, animation:'fadeInUp 0.6s ease both', transition:'max-width 0.3s' }}>

        {/* Logo */}
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', justifyContent:'center', marginBottom:36 }}>
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

        <div className="card-glass" style={{ padding:'36px 40px', borderRadius:20 }}>

          {/* Badge admin détecté */}
          {isAdminEmail && (
            <div style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(245,200,66,0.1)', border:'1px solid rgba(245,200,66,0.3)', borderRadius:12, padding:'10px 14px', marginBottom:20 }}>
              <span style={{ fontSize:20 }}>👑</span>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--gold)' }}>Compte Fondateur</div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>Accès illimité · Pas d'abonnement requis</div>
              </div>
            </div>
          )}

          <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, marginBottom:6 }}>
            {isAdminEmail ? 'Accès Fondateur' : 'Créer un compte'}
          </h2>
          <p style={{ fontSize:13, color:'var(--muted)', marginBottom:28 }}>
            {isAdminEmail ? 'Email + mot de passe uniquement' : 'Rejoignez des milliers d\'élèves tunisiens'}
          </p>

          {error && (
            <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'11px 16px', marginBottom:18, fontSize:13, color:'var(--red)' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email — toujours en premier */}
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:7, fontWeight:500 }}>Email *</label>
              <input
                type="email" value={form.email}
                onChange={e => set('email', e.target.value)}
                required placeholder="email@exemple.com"
                className="input" style={{ borderRadius:10 }}
                autoFocus
              />
            </div>

            {/* Champs supplémentaires — cachés pour l'admin */}
            {!isAdminEmail && (
              <>
                {/* Nom complet */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:7, fontWeight:500 }}>Nom complet *</label>
                  <input type="text" value={form.full_name} onChange={e => set('full_name', e.target.value)} required={!isAdminEmail} placeholder="Ahmed Ben Ali" className="input" style={{ borderRadius:10 }} />
                </div>

                {/* Téléphone */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:7, fontWeight:500 }}>Téléphone</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="2X XXX XXX" className="input" style={{ borderRadius:10 }} />
                </div>

                {/* Section Bac */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:7, fontWeight:500 }}>Section Bac</label>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                    {SECTIONS.map(s => (
                      <button key={s.value} type="button" onClick={() => set('section_bac', s.value)}
                        style={{
                          padding:'8px 6px', borderRadius:10, fontSize:11, fontWeight:600, cursor:'pointer', transition:'all 0.2s',
                          background: form.section_bac === s.value ? 'rgba(79,110,247,0.18)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${form.section_bac === s.value ? 'rgba(79,110,247,0.5)' : 'var(--border)'}`,
                          color: form.section_bac === s.value ? 'var(--accent)' : 'var(--text2)',
                        }}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Mot de passe */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:24 }}>
              <div>
                <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:7, fontWeight:500 }}>Mot de passe *</label>
                <input type="password" value={form.password} onChange={e => set('password', e.target.value)} required placeholder="6 car. minimum" className="input" style={{ borderRadius:10 }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:12, color:'var(--text2)', marginBottom:7, fontWeight:500 }}>Confirmer *</label>
                <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} required placeholder="Répéter" className="input" style={{ borderRadius:10 }} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg"
              style={{ width:'100%', justifyContent:'center', opacity: loading ? 0.7 : 1,
                background: isAdminEmail ? 'linear-gradient(135deg,var(--gold),var(--orange))' : undefined }}>
              {loading ? 'Création...' : isAdminEmail ? '👑 Créer le compte fondateur →' : 'Créer mon compte →'}
            </button>
          </form>

          <div style={{ marginTop:20, display:'flex', flexDirection:'column', gap:8, textAlign:'center' }}>
            <p style={{ fontSize:13, color:'var(--muted)', margin:0 }}>
              Déjà inscrit ?{' '}
              <Link href="/login" style={{ color:'var(--accent)', fontWeight:600, textDecoration:'none' }}>Se connecter</Link>
            </p>
            {!isAdminEmail && (
              <p style={{ fontSize:13, color:'var(--muted)', margin:0 }}>
                Voir nos offres ?{' '}
                <Link href="/abonnement" style={{ color:'var(--gold)', fontWeight:600, textDecoration:'none' }}>Plans & Tarifs →</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
