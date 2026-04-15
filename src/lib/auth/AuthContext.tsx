'use client'

import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import {
  Profile,
  UserQuotas,
  ADMIN_EMAIL,
  getQuotaLimits,
  PlanQuotas
} from '@/lib/types/monetisation'

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
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [quotas, setQuotas] = useState<UserQuotas | null>(null)
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
    (profile?.is_active === true &&
      subscriptionEnd !== null &&
      subscriptionEnd.getTime() > Date.now())

  const isSprint =
    profile?.plan_type === 'sprint_bac' && hasActiveSubscription

  const quotaLimits = hasActiveSubscription
    ? getQuotaLimits(profile?.plan_type ?? null, isSprint)
    : getQuotaLimits(null)

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
      console.error('Erreur chargement profil:', error)
      setProfile(null)
      return
    }

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
      const isUserAdmin = data.user.email === 'bensghaiermejdi70@gmail.com'
      
      // Si changement d'utilisateur, nettoyer d'abord
      if (previousUserId.current && previousUserId.current !== data.user.id) {
        console.log('Changement d utilisateur detecte:', previousUserId.current, '->', data.user.id)
        clearState()
      }
      
      if (!isUserAdmin) {
        // Toujours creer une nouvelle session
        const sessionId = crypto.randomUUID()
        localStorage.setItem('mathbac_session_id', sessionId)
        
        await supabase.from('profiles')
          .update({ current_session_id: sessionId })
          .eq('id', data.user.id)
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
    const { error } = await supabase.auth.signUp({
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
      async (event, session) => {
        const currentUser = session?.user ?? null
        
        if (currentUser) {
          const isUserAdmin = currentUser.email === 'bensghaiermejdi70@gmail.com'
          
          // Detecter changement d'utilisateur
          if (previousUserId.current && previousUserId.current !== currentUser.id) {
            console.log('AuthStateChange: Changement d utilisateur')
            clearState()
          }
          
          if (!isUserAdmin) {
            const localId = localStorage.getItem('mathbac_session_id')
            
            if (!localId) {
              const newSessionId = crypto.randomUUID()
              localStorage.setItem('mathbac_session_id', newSessionId)
              await supabase.from('profiles')
                .update({ current_session_id: newSessionId })
                .eq('id', currentUser.id)
            } else {
              const { data: prof } = await supabase
                .from('profiles')
                .select('current_session_id, is_active')
                .eq('id', currentUser.id)
                .single()
              
              if (prof?.is_active && prof?.current_session_id && prof.current_session_id !== localId) {
                localStorage.removeItem('mathbac_session_id')
                clearState()
                await supabase.auth.signOut()
                window.location.href = '/login?error=session_dupliquee'
                return
              }
            }
          }
          
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
      
      if (currentUser.email === 'bensghaiermejdi70@gmail.com') return

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
        const newSessionId = crypto.randomUUID()
        localStorage.setItem('mathbac_session_id', newSessionId)
        await supabase.from('profiles')
          .update({ current_session_id: newSessionId })
          .eq('id', currentUser.id)
        return
      }
      
      if (prof.current_session_id === localId) return
      
      if (prof?.is_active && prof.current_session_id !== localId) {
        signingOut = true
        localStorage.removeItem('mathbac_session_id')
        clearState()
        await supabase.auth.signOut()
        window.location.href = '/login?error=session_dupliquee'
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

