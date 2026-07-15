'use client'

import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
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

// Détecte si l'appareil est PC ou Mobile
function getDeviceType(): 'pc' | 'mobile' {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)
  return isMobile ? 'mobile' : 'pc'
}

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
  isSubscribed: boolean
  daysRemaining: number | null
  matiereActive: MatiereType
  quotaVersion: number
  getUsed: (type: QuotaType) => number
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
  const supabase = useRef<ReturnType<typeof createClient>>(createClient()).current

  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [quotas, setQuotas] = useState<Record<MatiereType, UserQuotas> | null>(null)
  const [quotaVersion, setQuotaVersion] = useState(0)
  const [activePlanTypes, setActivePlanTypes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const previousUserId = useRef<string | null>(null)
  const authTransitionRef = useRef(false)
  const loadingProfileRef = useRef(false)
  const loadingQuotaRef = useRef(false)
  const verifyingSessionRef = useRef(false)

  const isAdmin =
    profile?.role === 'admin' || user?.email === ADMIN_EMAIL

  const subscriptionEnd = profile?.subscription_end
    ? new Date(profile.subscription_end)
    : null

  const hasActiveSubscription =
    isAdmin ||
    activePlanTypes.length > 0 ||
    (profile?.is_active === true &&
      subscriptionEnd !== null &&
      subscriptionEnd.getTime() > Date.now())

  const activeMatieres = normalizeActiveMatieres(activePlanTypes)

  const isSprint: boolean = hasActiveSubscription && !!(
    activePlanTypes.some(pt => extractPlan(pt) === 'sprint_bac') ||
    profile?.plan_type === 'sprint_bac' || profile?.plan_type?.startsWith('sprint_bac_')
  )

  const matiereActive: MatiereType = hasActiveSubscription
    ? activeMatieres[0] ?? extractMatiere(profile?.plan_type)
    : 'mathematiques'

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
    if (!quotas) return hasActiveSubscription ? true : false

    const limitKey: Record<QuotaType, string> = {
      simulations: 'simulations_per_week',
      chat:        'chat_per_week',
      solver:      'solver_per_week',
      remediation: 'remediation_per_week',
      analyses:    'analyses_per_week',
    }
    const limit = (quotaLimits as any)[limitKey[type]] as number
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

  function getUsed(type: QuotaType): number {
    const usedKey: Record<QuotaType, keyof UserQuotas> = {
      simulations: 'simulations_used',
      chat:        'chat_used',
      solver:      'solver_used',
      remediation: 'remediation_used',
      analyses:    'analyses_used',
    }
    const total = sumQuotasAcrossMatiere(quotas)
    return (total[usedKey[type]] as number) ?? 0
  }

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
      ? Math.ceil((subscriptionEnd.getTime() - Date.now()) / 86400000)
      : null

  async function loadProfile(userId: string) {
    if (loadingProfileRef.current) {
      while (loadingProfileRef.current) {
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      return
    }

    loadingProfileRef.current = true

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          const { data: { user: authUser } } = await supabase.auth.getUser()
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              email: authUser?.email ?? '',
              full_name: authUser?.user_metadata?.full_name ?? '',
              role: 'user',
              is_active: false,
              plan_type: null,
              pc_session_a: null,
              pc_session_b: null,
              mobile_session_a: null,
              mobile_session_b: null,
              created_at: new Date().toISOString(),
            })
            .select()
            .single()
          if (newProfile) setProfile(newProfile)
          return
        }
        console.error('Erreur chargement profil (non critique):', error.code, error.message)
        return
      }

      console.log('[Auth] Profile chargé:', {
        email: data?.email,
        is_active: data?.is_active,
        plan_type: data?.plan_type,
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
        const endsAt = sub?.ends_at || sub?.subscription_end
        if (endsAt) return new Date(endsAt) > new Date()
        return sub?.is_active === true
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
        finalProfile = data
      }

      setProfile(finalProfile)
      setActivePlanTypes(activePlanTypesList)
    } finally {
      loadingProfileRef.current = false
    }
  }

  async function loadQuotas(userId: string) {
    if (loadingQuotaRef.current) return
    loadingQuotaRef.current = true

    try {
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
        setQuotaVersion(v => v + 1)
      } else {
        const quotasMap: Partial<Record<MatiereType, UserQuotas>> = {}
        data.forEach((q: UserQuotas) => {
          const key = (q.matiere as MatiereType) || 'mathematiques'
          quotasMap[key] = q
        })
        setQuotas({ ...quotasMap } as Record<MatiereType, UserQuotas>)
        setQuotaVersion(v => v + 1)
      }
    } finally {
      loadingQuotaRef.current = false
    }
  }

  function clearState() {
    setUser(null)
    setProfile(null)
    setQuotas(null)
    previousUserId.current = null
  }

  // ✅ LOGIQUE FINALE : 2 sessions max par device (A et B), non abonné = illimité
  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { error: translateAuthError(error.message), user: null }
    }

    if (data.user) {
      const isMultiSession = isMultiSessionUser(data.user.email)

      if (previousUserId.current && previousUserId.current !== data.user.id) {
        clearState()
      }

      // ✅ SI NON ABONNÉ → aucune restriction
      if (!isMultiSession) {
        // Vérifier si abonné avant d'appliquer les restrictions
        const { data: profCheck } = await supabase
          .from('profiles')
          .select('is_active, subscription_end')
          .eq('id', data.user.id)
          .single()

        const isSubscribed = profCheck?.is_active === true && 
          profCheck?.subscription_end && 
          new Date(profCheck.subscription_end) > new Date()

        // Si PAS abonné → pas de restriction de session
        if (!isSubscribed) {
          console.log('[Auth] Non abonné → sessions illimitées')
          authTransitionRef.current = true
          try {
            setUser(data.user)
            previousUserId.current = data.user.id
            await loadProfile(data.user.id)
            await loadQuotas(data.user.id)
            window.location.replace('/')
            return { error: null, user: data.user }
          } finally {
            authTransitionRef.current = false
          }
        }

        // ✅ SI ABONNÉ → logique 2 sessions max (A et B)
        const deviceType = getDeviceType()
        const sessionId = crypto.randomUUID()

        const { data: prof } = await supabase
          .from('profiles')
          .select('pc_session_a, pc_session_b, mobile_session_a, mobile_session_b')
          .eq('id', data.user.id)
          .single()

        const sessionAKey = `${deviceType}_session_a`
        const sessionBKey = `${deviceType}_session_b`
        const sessionA = (prof as any)?.[sessionAKey]
        const sessionB = (prof as any)?.[sessionBKey]

        // Vérifier si c'est une session déjà connue (A ou B)
        const isKnownSession = sessionId === sessionA || sessionId === sessionB

        // Si ce n'est pas une session connue ET les 2 slots sont pleins → bloquer
        if (!isKnownSession && sessionA && sessionB) {
          // Vérifier si c'est un retour à A ou B (comparaison avec localStorage)
          const localSessionId = localStorage.getItem('mathbac_session_id')
          const isReturningA = localSessionId === sessionA
          const isReturningB = localSessionId === sessionB

          if (!isReturningA && !isReturningB) {
            console.log('❌ BLOCAGE : 2 sessions', deviceType, 'déjà utilisées')
            await supabase.auth.signOut()
            return { 
              error: 'Vous avez atteint la limite de 2 ' + (deviceType === 'pc' ? 'ordinateurs' : 'mobiles') + '. Retournez sur un appareil déjà utilisé.', 
              user: null 
            }
          }
        }

        // Déterminer dans quel slot stocker
        let targetSlot: string

        if (!sessionA) {
          // Slot A vide → utiliser A
          targetSlot = sessionAKey
        } else if (!sessionB) {
          // Slot B vide → utiliser B
          targetSlot = sessionBKey
        } else {
          // Les 2 slots pleins → remplacer le plus ancien (celui qui n'est pas le localStorage)
          const localSessionId = localStorage.getItem('mathbac_session_id')
          if (localSessionId === sessionA) {
            targetSlot = sessionBKey  // Remplacer B
          } else {
            targetSlot = sessionAKey  // Remplacer A
          }
        }

        localStorage.setItem('mathbac_session_id', sessionId)
        localStorage.setItem('mathbac_device_type', deviceType)

        const updateData: any = {}
        updateData[targetSlot] = sessionId

        await supabase.from('profiles')
          .update(updateData)
          .eq('id', data.user.id)

        console.log('[Auth] Session', deviceType, 'stockée dans', targetSlot)
      } else {
        localStorage.removeItem('mathbac_session_id')
        localStorage.removeItem('mathbac_device_type')
      }

      authTransitionRef.current = true
      try {
        setUser(data.user)
        previousUserId.current = data.user.id
        await loadProfile(data.user.id)
        await loadQuotas(data.user.id)
        window.location.replace('/')
        return { error: null, user: data.user }
      } finally {
        authTransitionRef.current = false
      }
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
          pc_session_a: null,
          pc_session_b: null,
          mobile_session_a: null,
          mobile_session_b: null,
          created_at: new Date().toISOString(),
        }, { onConflict: 'id' })

      if (profileError) {
        console.error('Erreur création profil:', profileError)
      }
    }

    return { error: null }
  }

  async function signInWithGoogle() {
    authTransitionRef.current = true

    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (result.error) {
      authTransitionRef.current = false
    }

    return result
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
    const deviceType = localStorage.getItem('mathbac_device_type') as 'pc' | 'mobile' | null
    const localSessionId = localStorage.getItem('mathbac_session_id')

    if (user && deviceType && localSessionId) {
      try {
        // Supprimer la session correspondante (A ou B)
        const { data: prof } = await supabase
          .from('profiles')
          .select('pc_session_a, pc_session_b, mobile_session_a, mobile_session_b')
          .eq('id', user.id)
          .single()

        const updateData: any = {}

        if ((prof as any)?.[`${deviceType}_session_a`] === localSessionId) {
          updateData[`${deviceType}_session_a`] = null
        } else if ((prof as any)?.[`${deviceType}_session_b`] === localSessionId) {
          updateData[`${deviceType}_session_b`] = null
        }

        if (Object.keys(updateData).length > 0) {
          await supabase.from('profiles').update(updateData).eq('id', user.id)
        }
      } catch (_) {}
    }

    localStorage.removeItem('mathbac_session_id')
    localStorage.removeItem('mathbac_device_type')

    authTransitionRef.current = true

    try {
      await supabase.auth.signOut()
      clearState()
    } finally {
      authTransitionRef.current = false
    }

    if (typeof window !== 'undefined') {
      window.location.replace('/')
    }
  }

  async function refreshSubscription() {
    if (!user) return
    await loadProfile(user.id)
    await loadQuotas(user.id)
  }

  async function incrementQuota(type: QuotaType, matiere: MatiereType = matiereActive) {
    if (!user) return
    await loadQuotas(user.id)
  }

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      async (_event: any, session: any) => {
        const currentUser = session?.user ?? null

        if (currentUser) {
          if (previousUserId.current === currentUser.id) {
            setIsLoading(false)
            return
          }

          previousUserId.current = currentUser.id
          setUser(currentUser)
          authTransitionRef.current = true

          try {
            await new Promise(resolve => setTimeout(resolve, 300))
            await loadProfile(currentUser.id)
            await loadQuotas(currentUser.id)
          } finally {
            authTransitionRef.current = false
          }
        } else {
          clearState()
        }

        setIsLoading(false)
      }
    )

    let signingOut = false

    const verifySingleSession = async () => {
      if (signingOut) return
      if (authTransitionRef.current) return
      if (window.location.pathname.startsWith('/auth/callback')) return
      if (verifyingSessionRef.current) return

      verifyingSessionRef.current = true

      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) return

        const currentUser = session.user
        if (isMultiSessionUser(currentUser.email)) return

        // ✅ Vérifier si abonné avant de faire quoi que ce soit
        const { data: profCheck } = await supabase
          .from('profiles')
          .select('is_active, subscription_end')
          .eq('id', currentUser.id)
          .single()

        const isSubscribed = profCheck?.is_active === true && 
          profCheck?.subscription_end && 
          new Date(profCheck.subscription_end) > new Date()

        // Si PAS abonné → pas de vérification de session
        if (!isSubscribed) return

        const localId = localStorage.getItem('mathbac_session_id')
        const deviceType = localStorage.getItem('mathbac_device_type') as 'pc' | 'mobile' | null

        if (!localId || !deviceType) {
          // Pas de session locale → en créer une nouvelle
          const newSessionId = crypto.randomUUID()
          const newDeviceType = getDeviceType()
          localStorage.setItem('mathbac_session_id', newSessionId)
          localStorage.setItem('mathbac_device_type', newDeviceType)

          const { data: prof } = await supabase
            .from('profiles')
            .select('pc_session_a, pc_session_b, mobile_session_a, mobile_session_b')
            .eq('id', currentUser.id)
          .single()

          const sessionAKey = `${newDeviceType}_session_a`
          const sessionBKey = `${newDeviceType}_session_b`
          const sessionA = (prof as any)?.[sessionAKey]
          const sessionB = (prof as any)?.[sessionBKey]

          let targetSlot = sessionAKey
          if (sessionA && !sessionB) targetSlot = sessionBKey
          else if (sessionA && sessionB) targetSlot = sessionAKey // Remplacer A par défaut

          const updateData: any = {}
          updateData[targetSlot] = newSessionId

          await supabase.from('profiles')
            .update(updateData)
            .eq('id', currentUser.id)
          return
        }

        // ✅ Vérifier si la session locale est toujours valide (A ou B)
        const { data: prof } = await supabase
          .from('profiles')
          .select('pc_session_a, pc_session_b, mobile_session_a, mobile_session_b, is_active')
          .eq('id', currentUser.id)
          .single()

        if (!prof) return

        const sessionA = (prof as any)?.[`${deviceType}_session_a`]
        const sessionB = (prof as any)?.[`${deviceType}_session_b`]

        // Si la session locale correspond à A ou B → OK
        if (localId === sessionA || localId === sessionB) return

        // Session non reconnue → déconnecter
        if (prof?.is_active === true) {
          signingOut = true
          localStorage.removeItem('mathbac_session_id')
          localStorage.removeItem('mathbac_device_type')
          clearState()
          await supabase.auth.signOut()
          window.location.replace('/login?error=session_dupliquee')
        }
      } finally {
        verifyingSessionRef.current = false
      }
    }

    window.addEventListener('focus', verifySingleSession)
    const interval = setInterval(verifySingleSession, 10000)

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
        isSubscribed: hasActiveSubscription,
        daysRemaining,
        matiereActive,
        quotaVersion,
        getUsed,
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
  const now = new Date()
  const dowUTC = now.getUTCDay()
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