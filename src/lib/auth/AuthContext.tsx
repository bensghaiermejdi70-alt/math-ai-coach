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
  extractPlan,
  extractMatiere,
  hasMatiereAccess,
  PlanQuotas,
  sumQuotasAcrossMatiere,
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

function getPlanPriority(planType: string | null | undefined): number {
  const basePlan = extractPlan(planType)
  if (basePlan === 'sprint_bac') return 3
  if (basePlan === 'annuel') return 2
  return 1
}

function chooseRepresentativePlanType(planTypes: string[]): string | null {
  if (planTypes.length === 0) return null
  return planTypes.slice().sort((a, b) => getPlanPriority(b) - getPlanPriority(a))[0]
}

function normalizeActiveMatieres(planTypes: string[]): MatiereType[] {
  return Array.from(new Set(planTypes.map(extractMatiere)))
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
  quotas: Record<MatiereType, UserQuotas> | null
  quotaLimits: PlanQuotas

  isAdmin: boolean
  isLoading: boolean
  isSprint: boolean

  hasActiveSubscription: boolean
  daysRemaining: number | null
  matiereActive: MatiereType   // matière de l'abonnement actif
  quotaVersion: number          // Incrémenté après chaque mise à jour de quota
  checkMatiereAccess: (matiere: MatiereType) => boolean
  getSubjectQuotaLimit: (type: QuotaType, matiere?: MatiereType) => number
  activePlanTypes: string[]
  activeMatieres: MatiereType[]

  signIn: (email: string, password: string) => Promise<{ error: string | null; user: User | null }>
  signUp: (data: SignUpData) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<any>
  resetPassword: (email: string) => Promise<{ error: string | null }>

  refreshSubscription: () => Promise<void>
  checkQuota: (type: QuotaType, matiere?: MatiereType) => boolean
  getQuotaUsage: (type: QuotaType) => { used: number; limit: number }
  incrementQuota: (type: QuotaType, matiere?: MatiereType) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseClient()

  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [quotas, setQuotas] = useState<Record<MatiereType, UserQuotas> | null>(null)
  const [quotaVersion, setQuotaVersion] = useState(0) // Force re-render après incrément
  const [activePlanTypes, setActivePlanTypes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // REF pour tracker le changement d'utilisateur
  const previousUserId = useRef<string | null>(null)

  const isAdmin =
    profile?.role === 'admin' || user?.email === ADMIN_EMAIL

  const subscriptionEnd = profile?.subscription_end
    ? new Date(profile.subscription_end)
    : null

  const hasActiveSubscription =
    isAdmin ||
    activePlanTypes.length > 0 ||  // ← multi-abonnements actifs depuis subscriptions
    (profile?.is_active === true &&
      subscriptionEnd !== null &&
      subscriptionEnd.getTime() > Date.now())

  // Debug (désactivé en prod)
  // if (profile) console.log('[Auth] hasActiveSubscription:', hasActiveSubscription, activePlanTypes)

  const activeMatieres = normalizeActiveMatieres(activePlanTypes)

  const isSprint: boolean = hasActiveSubscription && !!(
    activePlanTypes.some(pt => extractPlan(pt) === 'sprint_bac') ||
    profile?.plan_type === 'sprint_bac' || profile?.plan_type?.startsWith('sprint_bac_')
  )

  // Matière de l'abonnement actif (représentative)
  const matiereActive: MatiereType = hasActiveSubscription
    ? activeMatieres[0] ?? extractMatiere(profile?.plan_type)
    : 'mathematiques'

  // Vérifier si l'utilisateur a accès à une matière donnée
  function checkMatiereAccess(matiere: MatiereType): boolean {
    if (isAdmin) return true
    if (!hasActiveSubscription) return false
    return hasMatiereAccess(activePlanTypes.length > 0 ? activePlanTypes : profile?.plan_type, matiere)
  }

  const quotaLimits = hasActiveSubscription
    ? getQuotaLimits(activePlanTypes.length > 0 ? activePlanTypes : profile?.plan_type ?? null, isSprint)
    : getQuotaLimits(null)

  function getSubjectQuotaLimit(type: QuotaType, matiere: MatiereType = matiereActive): number {
    const relevantPlans = activePlanTypes.length > 0
      ? activePlanTypes.filter(pt => extractMatiere(pt) === matiere)
      : profile?.plan_type ? [profile.plan_type] : []

    const limits = getQuotaLimits(relevantPlans.length > 0 ? relevantPlans : null, isSprint)
    const limitKey: Record<QuotaType, string> = {
      simulations: 'simulations_per_week',
      chat:        'chat_per_week',
      solver:      'solver_per_week',
      remediation: 'remediation_per_week',
      analyses:    'analyses_per_week',
    }
    return (limits as any)[limitKey[type]] as number ?? 0
  }

  function checkQuota(type: QuotaType, matiere: MatiereType = matiereActive): boolean {
    if (isAdmin) return true
    // Si pas encore de quotas chargés mais abonnement actif → autoriser
    if (!quotas) return hasActiveSubscription ? true : false

    const limitKey: Record<QuotaType, string> = {
      simulations: 'simulations_per_week',
      chat:        'chat_per_week',
      solver:      'solver_per_week',
      remediation: 'remediation_per_week',
      analyses:    'analyses_per_week',
    }
    // Quota cumulé = somme de tous les abonnements actifs
    const limit = (quotaLimits as any)[limitKey[type]] as number

    // Usage cumulé = somme de toutes les matières
    const totalQuotas = sumQuotasAcrossMatiere(quotas)
    const usedKey: Record<QuotaType, string> = {
      simulations: 'simulations_used',
      chat:        'chat_used',
      solver:      'solver_used',
      remediation: 'remediation_used',
      analyses:    'analyses_used',
    }
    const used = (totalQuotas as any)[usedKey[type]] as number ?? 0
    if (limit === -1) return true
    return used < limit
  }

  // Helper pour afficher le quota total dans les messages d'alerte
  function getQuotaUsage(type: QuotaType): { used: number; limit: number } {
    const limitKey: Record<QuotaType, string> = {
      simulations: 'simulations_per_week',
      chat:        'chat_per_week',
      solver:      'solver_per_week',
      remediation: 'remediation_per_week',
      analyses:    'analyses_per_week',
    }
    const limit = (quotaLimits as any)[limitKey[type]] as number ?? 0
    const totalQuotas = sumQuotasAcrossMatiere(quotas)
    const usedKey: Record<QuotaType, string> = {
      simulations: 'simulations_used',
      chat:        'chat_used',
      solver:      'solver_used',
      remediation: 'remediation_used',
      analyses:    'analyses_used',
    }
    const used = (totalQuotas as any)[usedKey[type]] as number ?? 0
    return { used, limit }
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

    let finalProfile = data
    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('plan_type, ends_at, subscription_end')
      .eq('user_id', userId)
      .eq('is_active', true)
      .eq('status', 'active')
      .order('ends_at', { ascending: false })
      .order('subscription_end', { ascending: false })
      .limit(20)

    const activeSubscriptions = (subscriptions || []).filter((sub: any) => {
      // Accepter si date future OU si is_active=true sans date (abonnement permanent/admin)
      const endsAt = sub?.ends_at || sub?.subscription_end
      if (endsAt) return new Date(endsAt) > new Date()
      return sub?.is_active === true  // fallback: is_active sans date
    })

    const activePlanTypesList = Array.from(new Set<string>(
      activeSubscriptions
        .map((sub: any) => sub?.plan_type)
        .filter((planType: unknown): planType is string => typeof planType === 'string' && planType.length > 0)
    ))

    if (activePlanTypesList.length > 0) {
      const representativePlanType = chooseRepresentativePlanType(activePlanTypesList)
      const latestEnd = activeSubscriptions.reduce((best: Date | null, sub: any) => {
        const endsAt = sub?.ends_at || sub?.subscription_end
        const endDate = endsAt ? new Date(endsAt) : null
        if (!endDate) return best
        if (!best || endDate > best) return endDate
        return best
      }, null)

      finalProfile = {
        ...data,
        is_active: true,
        plan_type: representativePlanType || data.plan_type,
        subscription_end: latestEnd ? latestEnd.toISOString() : data.subscription_end,
      }
    } else if (!data?.is_active || !data?.subscription_end || new Date(data.subscription_end) <= new Date()) {
      // Si aucun abonnement actif n'est trouvé, on garde le profil tel quel
      finalProfile = data
    }

    setProfile(finalProfile)
    setActivePlanTypes(activePlanTypesList)
  }

  async function loadQuotas(userId: string) {
    const weekStart = getWeekStart()

    const response = await supabase
      .from('user_quotas')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start', weekStart)

    const data = response.data as UserQuotas[] | null
    const error = response.error

    if (error || !data) {
      if (error) console.error('Error loading quotas:', error)
      setQuotas(null)
    } else {
      const quotasMap: Partial<Record<MatiereType, UserQuotas>> = {}
      data.forEach((q: UserQuotas) => {
        const key = (q.matiere as MatiereType) || 'mathematiques'
        quotasMap[key] = q
      })
      // Si pas de colonne matiere (1 seul enregistrement sans matiere):
      // NE PAS dupliquer — sumQuotasAcrossMatiere compterait x3
      // Stocker seulement sous 'mathematiques' pour usage global
      setQuotas(quotasMap as Record<MatiereType, UserQuotas>)
      setQuotaVersion(v => v + 1) // Forcer re-render des composants
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
  }

  async function incrementQuota(type: QuotaType, matiere: MatiereType = matiereActive) {
    if (!user) return
    // Ne pas bloquer si quotas est null — la RPC crée la ligne si elle n'existe pas

    await supabase.rpc('increment_quota', {
      p_user_id: user.id,
      p_matiere: matiere,
      p_type: type
    })

    await loadQuotas(user.id)
  }

  // Recharger les quotas lors de la navigation Next.js (visibilitychange)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && user) {
        loadQuotas(user.id)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    // Aussi sur focus (onglet/fenêtre)
    window.addEventListener('focus', handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('focus', handleVisibility)
    }
  }, [user])

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
        activePlanTypes,
        activeMatieres,

        isAdmin,
        isLoading,
        isSprint,

        hasActiveSubscription,
        daysRemaining,
        matiereActive,
        quotaVersion,
        checkMatiereAccess,
        getSubjectQuotaLimit,

        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        resetPassword,

        refreshSubscription,
        checkQuota,
        getQuotaUsage,
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
  // Utiliser UTC pour correspondre exactement à PostgreSQL (serveur en UTC)
  const now = new Date()
  const dowUTC = now.getUTCDay() // 0=dim, 1=lun...6=sam en UTC
  const diffUTC = now.getUTCDate() - dowUTC + (dowUTC === 0 ? -6 : 1)
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), diffUTC))
  const yyyy = monday.getUTCFullYear()
  const mm   = String(monday.getUTCMonth() + 1).padStart(2, '0')
  const dd   = String(monday.getUTCDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
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