'use client'

import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

// ── Singleton Supabase client — créé une seule fois pour tout l'app ──────────
// Évite "Multiple GoTrueClient instances" qui cause des lock conflicts
let _supabaseClient: ReturnType<typeof createClient> | null = null
function getSupabaseClient() {
  if (!_supabaseClient) {
    _supabaseClient = createClient()
  }
  return _supabaseClient
}
import {
  Profile,
  UserQuotas,
  MatiereType,
  ADMIN_EMAIL,
  getQuotaLimits,
  extractMatiere,
  hasMatiereAccess,
  PlanQuotas
} from '@/lib/types/monetisation'

// Emails avec sessions multiples illimitées (pas de restriction appareil)
const MULTI_SESSION_EMAILS = [
  'bensghaiermejdi70@gmail.com',   // Admin
  'mourad.essghaier@hotmail.fr',    // Abonné multi-appareils
]

// Vérifier si un email bénéficie de multi-sessions
function isMultiSessionUser(email: string | undefined): boolean {
  if (!email) return false
  return MULTI_SESSION_EMAILS.includes(email.toLowerCase())
}

export type QuotaType =
  | 'simulations'
  | 'chat'
  | 'solver'
  | 'remediation'
  | 'analyses'

interface SignUpData {
  email: string
  password: string
  full_name: string
  phone?: string
  section_bac?: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  quotas: UserQuotas | null
  quotaLimits: PlanQuotas

  isAdmin: boolean
  isLoading: boolean
  isSprint: boolean

  hasActiveSubscription: boolean
  daysRemaining: number | null
  matiereActive: MatiereType   // matière de l'abonnement actif
  checkMatiereAccess: (matiere: MatiereType) => boolean

  signIn: (email: string, password: string) => Promise<{ error: string | null; user: User | null }>
  signUp: (data: SignUpData) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<any>
  resetPassword: (email: string) => Promise<{ error: string | null }>

  refreshSubscription: () => Promise<void>
  checkQuota: (type: QuotaType) => boolean
  incrementQuota: (type: QuotaType) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseClient()

  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [quotas, setQuotas] = useState<UserQuotas | null>(null)
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // REF pour tracker le changement d'utilisateur
  const previousUserId = useRef<string | null>(null)

  const isAdmin =
    profile?.role === 'admin' || user?.email === ADMIN_EMAIL

  const subscriptionEnd = profile?.subscription_end
    ? new Date(profile.subscription_end)
    : null

  async function loadSubscriptions(userId: string) {
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .gt('subscription_end', new Date().toISOString())
    setSubscriptions(data || [])
  }

  const planTypes = subscriptions.map(s => s.plan_type)
  const isSprint = planTypes.some(p => p?.startsWith('sprint_bac'))
  const quotaLimits = getQuotaLimits(planTypes, isSprint)
  const hasActiveSubscription = isAdmin || subscriptions.length > 0

  // Debug log
  if (profile) {
    console.log('[Auth] hasActiveSubscription:', hasActiveSubscription, {
      isAdmin,
      subscriptions: subscriptions.length,
      planTypes: subscriptions.map(s => s.plan_type),
    })
  }

  // Matière de l'abonnement actif
  const matiereActive: MatiereType = subscriptions.length > 0
    ? extractMatiere(subscriptions[0].plan_type)
    : 'mathematiques'

  // Vérifier si l'utilisateur a accès à une matière donnée
  function checkMatiereAccess(matiere: MatiereType): boolean {
    if (isAdmin) return true
    if (!hasActiveSubscription) return false
    return subscriptions.some(sub => hasMatiereAccess(sub.plan_type, matiere))
  }

  const daysRemaining =
    hasActiveSubscription && subscriptionEnd
      ? Math.ceil(
          (subscriptionEnd.getTime() - Date.now()) / 86400000
        )
      : null

  async function loadProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      // PGRST116 = profil inexistant → le créer automatiquement
      if (error.code === 'PGRST116') {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        // INSERT uniquement si le profil n'existe vraiment pas
        // NE PAS utiliser upsert qui écraserait is_active si le profil existe
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: authUser?.email ?? '',
            full_name: authUser?.user_metadata?.full_name ?? '',
            role: 'user',
            is_active: false,
            plan_type: null,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()
        if (newProfile) setProfile(newProfile)
        return
      }
      // Toute autre erreur (lock conflict, timeout) → NE PAS toucher le profil
      // Garder le profil actuel en mémoire si disponible
      console.error('Erreur chargement profil (non critique):', error.code, error.message)
      // Ne pas faire setProfile(null) — ça tuerait l'abonnement affiché
      return
    }

    console.log('[Auth] Profile chargé:', {
      email: data?.email,
      is_active: data?.is_active,
      plan_type: data?.plan_type,
      subscription_end: data?.subscription_end,
    })
    setProfile(data)
  }

  async function loadQuotas(userId: string) {
    const weekStart = getWeekStart()

    const { data, error } = await supabase
      .from('user_quotas')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start', weekStart)
      .single()

    if (error && error.code === 'PGRST116') {
      const { data: newData } = await supabase
        .from('user_quotas')
        .insert({
          user_id: userId,
          week_start: weekStart
        })
        .select()
        .single()

      setQuotas(newData)
    } else {
      setQuotas(data)
    }
  }

  // FONCTION: Nettoyer completement le state
  function clearState() {
    setUser(null)
    setProfile(null)
    setQuotas(null)
    previousUserId.current = null
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { error: translateAuthError(error.message), user: null }
    }

    if (data.user) {
      const isMultiSession = isMultiSessionUser(data.user.email)
      
      // Si changement d'utilisateur, nettoyer d'abord
      if (previousUserId.current && previousUserId.current !== data.user.id) {
        clearState()
      }
      
      // Gérer session locale
      if (!isMultiSession) {
        const sessionId = crypto.randomUUID()
        localStorage.setItem('mathbac_session_id', sessionId)
      } else {
        localStorage.removeItem('mathbac_session_id')
      }
      
      setUser(data.user)
      previousUserId.current = data.user.id
      await loadProfile(data.user.id)
      await loadQuotas(data.user.id)
      await loadSubscriptions(data.user.id)
      
      window.location.href = '/'
      return { error: null, user: data.user }
    }
    
    return { error: null, user: null }
  }

  async function signUp(data: SignUpData) {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
          phone: data.phone,
          section_bac: data.section_bac
        }
      }
    })

    if (error)
      return { error: translateAuthError(error.message) }

    // Créer le profil dans profiles dès l'inscription
    // (même avant confirmation email — sera accessible après connexion)
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: data.email,
          full_name: data.full_name,
          phone: data.phone || null,
          section_bac: data.section_bac || null,
          role: 'user',
          is_active: false,
          plan_type: null,
          created_at: new Date().toISOString(),
        }, { onConflict: 'id' })

      if (profileError) {
        console.error('Erreur création profil:', profileError)
        // On ne bloque pas l'inscription pour autant
      }
    }

    return { error: null }
  }

  async function signInWithGoogle() {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  async function resetPassword(email: string) {
    const redirectUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/auth/callback`
      : 'https://app.mathsbac.com/auth/callback'

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    })

    if (error)
      return { error: translateAuthError(error.message) }

    return { error: null }
  }

  async function signOut() {
    localStorage.removeItem('mathbac_session_id')
    if (user) {
      try {
        await supabase.from('profiles')
          .update({ current_session_id: null })
          .eq('id', user.id)
      } catch (_) {}
    }
    clearState()
    await supabase.auth.signOut()
    if (typeof window !== 'undefined') window.location.href = '/'
  }

  async function refreshSubscription() {
    if (!user) return
    await loadProfile(user.id)
    await loadQuotas(user.id)
    await loadSubscriptions(user.id)
  }

  function checkQuota(type: QuotaType): boolean {
    if (isAdmin) return true
    if (!quotas || !quotaLimits) return false

    const limitKey: Record<QuotaType, string> = {
      simulations: 'simulations_per_week',
      chat:        'chat_per_week',
      solver:      'solver_per_week',
      remediation: 'remediation_per_week',
      analyses:    'analyses_per_week',
    }
    const usedKey: Record<QuotaType, string> = {
      simulations: 'simulations_used',
      chat:        'chat_used',
      solver:      'solver_used',
      remediation: 'remediation_used',
      analyses:    'analyses_used',
    }
    const limit = (quotaLimits as any)[limitKey[type]] as number ?? 0
    const used  = (quotas as any)[usedKey[type]] as number ?? 0
    if (limit === -1) return true
    return used < limit
  }

  async function incrementQuota(type: QuotaType) {
    if (!user || !quotas) return

    await supabase.rpc('increment_quota', {
      p_user_id: user.id,
      p_type: type
    })

    await loadQuotas(user.id)
  }

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      async (_event: any, session: any) => {
        const currentUser = session?.user ?? null
        
        if (currentUser) {
          const isMultiSession = isMultiSessionUser(currentUser.email)
          
          // Detecter changement d'utilisateur
          if (previousUserId.current && previousUserId.current !== currentUser.id) {
            clearState()
          }
          
          // Vérification session : uniquement en signIn, pas ici
          // onAuthStateChange se déclenche trop souvent (navigation, focus)
          // ce qui causait des conflits de lock Supabase
          // La vérification multi-device est gérée dans verifySingleSession
          
          setUser(currentUser)
          previousUserId.current = currentUser.id
          await loadProfile(currentUser.id)
          await loadQuotas(currentUser.id)
          await loadSubscriptions(currentUser.id)
        } else {
          clearState()
        }
        
        setIsLoading(false)
      }
    )

    // Verification periodique
    let signingOut = false

    const verifySingleSession = async () => {
      if (signingOut) return
      
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      const currentUser = session.user
      
      if (isMultiSessionUser(currentUser.email)) return

      const localId = localStorage.getItem('mathbac_session_id')
      
      if (!localId) {
        const newSessionId = crypto.randomUUID()
        localStorage.setItem('mathbac_session_id', newSessionId)
        await supabase.from('profiles')
          .update({ current_session_id: newSessionId })
          .eq('id', currentUser.id)
        return
      }

      const { data: prof } = await supabase
        .from('profiles')
        .select('current_session_id, is_active')
        .eq('id', currentUser.id)
        .single()

      if (!prof?.current_session_id) {
        // current_session_id NULL = pas de restriction active
        // NE PAS modifier profiles ici pour éviter de déclencher des triggers
        // Juste s'assurer que le localStorage est propre
        if (!localId) {
          localStorage.setItem('mathbac_session_id', crypto.randomUUID())
        }
        return
      }
      
      if (prof.current_session_id === localId) return
      
      // Ne déconnecter que si DB a un session_id NON-NULL différent
      // Si current_session_id est NULL en DB (ex: activation manuelle),
      // on met juste à jour sans déconnecter
      // Déconnecter UNIQUEMENT si l'abonnement est actif ET session différente
      // Si is_active=false (abonnement expiré/gratuit) → ne jamais déconnecter pour session
      if (prof?.is_active === true && prof.current_session_id !== null && prof.current_session_id !== localId) {
        signingOut = true
        localStorage.removeItem('mathbac_session_id')
        clearState()
        await supabase.auth.signOut()
        window.location.href = '/login?error=session_dupliquee'
      } else if (!prof?.is_active || prof?.current_session_id === null) {
        // Pas actif OU session_id null → ne rien faire, laisser l'accès
        return
      }
    }

    window.addEventListener('focus', verifySingleSession)
    const interval = setInterval(verifySingleSession, 30000)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('focus', verifySingleSession)
      clearInterval(interval)
    }
  }, [supabase])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        quotas,
        quotaLimits,

        isAdmin,
        isLoading,
        isSprint,

        hasActiveSubscription,
        daysRemaining,
        matiereActive,
        checkMatiereAccess,

        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        resetPassword,

        refreshSubscription,
        checkQuota,
        incrementQuota
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx)
    throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

function translateAuthError(msg: string): string {
  if (msg.includes('Invalid login credentials'))
    return 'Email ou mot de passe incorrect'
  if (msg.includes('Email not confirmed'))
    return 'Veuillez confirmer votre email'
  if (msg.includes('User already registered'))
    return 'Cet email est deja utilise'
  return msg
}