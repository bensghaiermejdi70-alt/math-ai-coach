'use client'

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
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
import {
  isMultiSessionUser,
  claimDeviceSlot,
  releaseDeviceSlot,
  verifyStillValid,
  getDeviceType,
  getOrCreateDeviceId,
  VERIFY_INTERVAL_MS,
  clearAllSupabaseStorage,
  markAsKicked,
  wasRecentlyKicked,
  clearKickedFlag,
} from '@/lib/auth/deviceSession'
import { useRouter } from 'next/navigation'

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

  signIn: (email: string, password: string, redirectTo?: string) => Promise<{ error: string | null; user: User | null }>
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
  const router = useRouter()

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
  const signingOutRef = useRef(false)

  const isAdmin = profile?.role === 'admin' || user?.email === ADMIN_EMAIL

  const subscriptionEnd = profile?.subscription_end ? new Date(profile.subscription_end) : null

  const hasActiveSubscription =
    isAdmin ||
    activePlanTypes.length > 0 ||
    (profile?.is_active === true && subscriptionEnd !== null && subscriptionEnd.getTime() > Date.now())

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
      simulations: 'simulations_per_week', chat: 'chat_per_week', solver: 'solver_per_week',
      remediation: 'remediation_per_week', analyses: 'analyses_per_week',
    }
    return (limits as any)[limitKey[type]] as number ?? 0
  }

  function checkQuota(type: QuotaType, matiere: MatiereType = matiereActive): boolean {
    if (isAdmin) return true
    if (!quotas) return hasActiveSubscription ? true : false
    const limitKey: Record<QuotaType, string> = {
      simulations: 'simulations_per_week', chat: 'chat_per_week', solver: 'solver_per_week',
      remediation: 'remediation_per_week', analyses: 'analyses_per_week',
    }
    const limit = (quotaLimits as any)[limitKey[type]] as number
    const totalQuotas = sumQuotasAcrossMatiere(quotas)
    const usedKey: Record<QuotaType, string> = {
      simulations: 'simulations_used', chat: 'chat_used', solver: 'solver_used',
      remediation: 'remediation_used', analyses: 'analyses_used',
    }
    const used = (totalQuotas as any)[usedKey[type]] as number ?? 0
    if (limit === -1) return true
    return used < limit
  }

  function getUsed(type: QuotaType): number {
    const usedKey: Record<QuotaType, keyof UserQuotas> = {
      simulations: 'simulations_used', chat: 'chat_used', solver: 'solver_used',
      remediation: 'remediation_used', analyses: 'analyses_used',
    }
    const total = sumQuotasAcrossMatiere(quotas)
    return (total[usedKey[type]] as number) ?? 0
  }

  function getQuotaUsage(type: QuotaType): { used: number; limit: number } {
    const limitKey: Record<QuotaType, string> = {
      simulations: 'simulations_per_week', chat: 'chat_per_week', solver: 'solver_per_week',
      remediation: 'remediation_per_week', analyses: 'analyses_per_week',
    }
    const limit = (quotaLimits as any)[limitKey[type]] as number ?? 0
    const totalQuotas = sumQuotasAcrossMatiere(quotas)
    const usedKey: Record<QuotaType, string> = {
      simulations: 'simulations_used', chat: 'chat_used', solver: 'solver_used',
      remediation: 'remediation_used', analyses: 'analyses_used',
    }
    const used = (totalQuotas as any)[usedKey[type]] as number ?? 0
    return { used, limit }
  }

  const daysRemaining = hasActiveSubscription && subscriptionEnd
    ? Math.ceil((subscriptionEnd.getTime() - Date.now()) / 86400000)
    : null

  async function loadProfile(userId: string) {
    if (loadingProfileRef.current) {
      while (loadingProfileRef.current) await new Promise(r => setTimeout(r, 50))
      return
    }
    loadingProfileRef.current = true
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
      if (error) {
        if (error.code === 'PGRST116') {
          const { data: { user: authUser } } = await supabase.auth.getUser()
          const { data: newProfile } = await supabase.from('profiles').insert({
            id: userId, email: authUser?.email ?? '',
            full_name: authUser?.user_metadata?.full_name ?? '', role: 'user',
            is_active: false, plan_type: null,
            pc_session_a: null, pc_session_b: null,
            mobile_session_a: null, mobile_session_b: null,
            created_at: new Date().toISOString(),
          }).select().single()
          if (newProfile) setProfile(newProfile)
          return
        }
        console.error('Erreur chargement profil:', error.code, error.message)
        return
      }

      let finalProfile = data
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select('plan_type, ends_at, subscription_end')
        .eq('user_id', userId).eq('is_active', true).eq('status', 'active')
        .order('ends_at', { ascending: false })
        .order('subscription_end', { ascending: false })
        .limit(20)

      const activeSubscriptions = (subscriptions || []).filter((sub: any) => {
        const endsAt = sub?.ends_at || sub?.subscription_end
        if (endsAt) return new Date(endsAt) > new Date()
        return sub?.is_active === true
      })

      const activePlanTypesList = Array.from(new Set<string>(
        activeSubscriptions.map((sub: any) => sub?.plan_type)
          .filter((pt: unknown): pt is string => typeof pt === 'string' && pt.length > 0)
      ))

      if (activePlanTypesList.length > 0) {
        const representativePlanType = chooseRepresentativePlanType(activePlanTypesList)
        const latestEnd = activeSubscriptions.reduce((best: Date | null, sub: any) => {
          const endsAt = sub?.ends_at || sub?.subscription_end
          const endDate = endsAt ? new Date(endsAt) : null
          if (!endDate) return best
          return !best || endDate > best ? endDate : best
        }, null)
        finalProfile = {
          ...data, is_active: true,
          plan_type: representativePlanType || data.plan_type,
          subscription_end: latestEnd ? latestEnd.toISOString() : data.subscription_end,
        }
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
      const response = await supabase.from('user_quotas').select('*')
        .eq('user_id', userId).eq('week_start', weekStart)
      const data = response.data as UserQuotas[] | null
      if (response.error || !data) {
        if (response.error) console.error('Error loading quotas:', response.error)
        setQuotas(null)
        setQuotaVersion(v => v + 1)
      } else {
        const quotasMap: Partial<Record<MatiereType, UserQuotas>> = {}
        data.forEach((q: UserQuotas) => {
          quotasMap[(q.matiere as MatiereType) || 'mathematiques'] = q
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

  /** Deconnexion COMPLETE : nettoie tout le stockage + marque comme kicke */
  const forceLocalSignOut = useCallback(async () => {
    try {
      markAsKicked()
      clearAllSupabaseStorage()
      // Nettoyage des anciennes cles (versions precedentes du systeme de session)
      localStorage.removeItem('mathbac_session_id')
      localStorage.removeItem('mathbac_device_type')
      await supabase.auth.signOut().catch(() => {})
    } catch (e) {
      console.error('Erreur deconnexion:', e)
    }
    clearState()
  }, [supabase])

  const verifySingleSession = useCallback(async () => {
    if (signingOutRef.current) return
    if (authTransitionRef.current) return
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/auth/callback')) return
    if (verifyingSessionRef.current) return

    if (wasRecentlyKicked()) {
      if (user) {
        signingOutRef.current = true
        await forceLocalSignOut()
        window.location.replace('/login?error=session_dupliquee')
      }
      return
    }

    verifyingSessionRef.current = true
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return
      if (isMultiSessionUser(session.user.email)) return

      const result = await verifyStillValid(supabase, session.user.id, session.user.email)
      if (result.shouldSignOut) {
        signingOutRef.current = true
        await forceLocalSignOut()
        window.location.replace('/login?error=' + (result.reason || 'session_dupliquee'))
      }
    } catch (e: any) {
      console.warn('Erreur verifySingleSession:', e?.message || e)
    } finally {
      verifyingSessionRef.current = false
    }
  }, [supabase, user, forceLocalSignOut])

  async function signIn(email: string, password: string, redirectTo: string = '/') {
    if (wasRecentlyKicked()) {
      return { error: 'Session interrompue. Patientez quelques secondes.', user: null }
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: translateAuthError(error.message), user: null }

    if (data.user) {
      if (previousUserId.current && previousUserId.current !== data.user.id) clearState()

      // IMPORTANT : le verrou est pose AVANT le claim (et pas apres), pour
      // qu'aucun tick du polling ne puisse s'executer pendant que le claim
      // est en cours. C'est ce qui causait le kick "session_dupliquee" des
      // la toute premiere connexion : un poll s'executait pendant la fenetre
      // ou le claim etait encore en vol et lisait un etat transitoire.
      authTransitionRef.current = true
      try {
        if (!isMultiSessionUser(data.user.email)) {
          const claim = await claimDeviceSlot(supabase, data.user.id, data.user.email)
          if (!claim.ok) {
            await forceLocalSignOut()
            return { error: claim.error, user: null }
          }
        }

        setUser(data.user)
        previousUserId.current = data.user.id
        await loadProfile(data.user.id)
        await loadQuotas(data.user.id)
        clearKickedFlag()
        router.push(redirectTo)
        return { error: null, user: data.user }
      } finally {
        authTransitionRef.current = false
      }
    }
    return { error: null, user: null }
  }

  async function signUp(data: SignUpData) {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email, password: data.password,
      options: { data: { full_name: data.full_name, phone: data.phone, section_bac: data.section_bac } }
    })
    if (error) return { error: translateAuthError(error.message) }

    if (authData.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: authData.user.id, email: data.email, full_name: data.full_name,
        phone: data.phone || null, section_bac: data.section_bac || null,
        role: 'user', is_active: false, plan_type: null,
        pc_session_a: null, pc_session_b: null,
        mobile_session_a: null, mobile_session_b: null,
        created_at: new Date().toISOString(),
      }, { onConflict: 'id' })
      if (profileError) console.error('Erreur creation profil:', profileError)
    }
    return { error: null }
  }

  async function resetPassword(email: string) {
    const redirectUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback` : 'https://app.mathsbac.com/auth/callback'
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl })
    if (error) return { error: translateAuthError(error.message) }
    return { error: null }
  }

  async function signOut() {
    if (user) await releaseDeviceSlot(supabase, user.id)
    authTransitionRef.current = true
    try { await forceLocalSignOut() } finally { authTransitionRef.current = false }
    if (typeof window !== 'undefined') window.location.replace('/')
  }

  async function signInWithGoogle() {
    authTransitionRef.current = true
    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (result.error) authTransitionRef.current = false
    return result
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: any, session: any) => {
        const currentUser = session?.user ?? null
        if (currentUser) {
          if (previousUserId.current === currentUser.id) { setIsLoading(false); return }
          previousUserId.current = currentUser.id
          setUser(currentUser)
          authTransitionRef.current = true
          try {
            await new Promise(r => setTimeout(r, 300))
            await loadProfile(currentUser.id)
            await loadQuotas(currentUser.id)
          } finally { authTransitionRef.current = false }
        } else { clearState() }
        setIsLoading(false)
      }
    )

    verifySingleSession()
    window.addEventListener('focus', verifySingleSession)
    const handleVisibilityChange = () => { if (document.visibilityState === 'visible') verifySingleSession() }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    const interval = setInterval(verifySingleSession, VERIFY_INTERVAL_MS)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('focus', verifySingleSession)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(interval)
    }
  }, [supabase, verifySingleSession])

  // ---------------------------------------------------------------------
  // Kick quasi instantane : des qu'un AUTRE appareil prend la main (claim),
  // Postgres met a jour active_pc_session / active_mobile_session ; on
  // ecoute ce changement en Realtime pour ne pas attendre le prochain tick
  // du polling (VERIFY_INTERVAL_MS). Necessite que la table `profiles` soit
  // ajoutee a la publication Realtime cote Supabase (voir
  // supabase-device-sessions.sql). Ne fait que DECLENCHER une verification
  // via verifySingleSession — jamais de decision de kick prise directement
  // sur le payload recu, pour garder une seule source de verite (le RPC).
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (!user) return
    if (isMultiSessionUser(user.email)) return
    if (!hasActiveSubscription) return

    const deviceType = getDeviceType()
    const myDeviceId = getOrCreateDeviceId()
    const activeCol = deviceType === 'pc' ? 'active_pc_session' : 'active_mobile_session'

    const channel = supabase
      .channel(`device-session-${user.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
        (payload: any) => {
          const newActive = payload?.new?.[activeCol]
          if (newActive && newActive !== myDeviceId) {
            verifySingleSession()
          }
        }
      )
      .subscribe((status: string, err?: any) => {
        // Le canal Realtime n'est qu'un raccourci pour un kick quasi
        // instantane : s'il ne s'etablit pas (RLS, reseau, replication pas
        // encore activee...), ce n'est jamais bloquant. Le polling classique
        // (VERIFY_INTERVAL_MS) reste la source de verite de secours et
        // continue de tourner independamment de ce canal.
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.warn('Realtime device-session indisponible (fallback polling actif):', err?.message || status)
        }
      })

    return () => {
      try {
        supabase.removeChannel(channel)
      } catch (_) { /* silencieux */ }
    }
  }, [user, hasActiveSubscription, supabase, verifySingleSession])

  return (
    <AuthContext.Provider value={{
      user, profile, quotas, quotaLimits, activePlanTypes, activeMatieres,
      isAdmin, isLoading, isSprint, hasActiveSubscription, isSubscribed: hasActiveSubscription,
      daysRemaining, matiereActive, quotaVersion, getUsed, checkMatiereAccess, getSubjectQuotaLimit,
      signIn, signUp, signOut, signInWithGoogle, resetPassword,
      refreshSubscription, checkQuota, getQuotaUsage, incrementQuota
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

function getWeekStart(): string {
  const now = new Date()
  const dowUTC = now.getUTCDay()
  const diffUTC = now.getUTCDate() - dowUTC + (dowUTC === 0 ? -6 : 1)
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), diffUTC))
  return `${monday.getUTCFullYear()}-${String(monday.getUTCMonth() + 1).padStart(2, '0')}-${String(monday.getUTCDate()).padStart(2, '0')}`
}

function translateAuthError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'Email ou mot de passe incorrect'
  if (msg.includes('Email not confirmed')) return 'Veuillez confirmer votre email'
  if (msg.includes('User already registered')) return 'Cet email est deja utilise'
  return msg
}