'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
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

  // 🔐 ADMIN
  const isAdmin =
    profile?.role === 'admin' || user?.email === ADMIN_EMAIL

  // 🔥 SUBSCRIPTION SAFE CHECK
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

  // 📦 LOAD PROFILE
  async function loadProfile(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    setProfile(data)
  }

  // 📦 LOAD QUOTAS
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

  // 🔐 LOGIN - CORRIGÉ : Retourne l'utilisateur immédiatement
  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { error: translateAuthError(error.message), user: null }
    }

    // Mettre à jour le state immédiatement
    if (data.user) {
      setUser(data.user)
      await loadProfile(data.user.id)
      await loadQuotas(data.user.id)
    }

    // Rediriger vers home
    window.location.href = '/'
    return { error: null, user: data.user }
  }

  // 🧾 REGISTER
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

  // 🔵 GOOGLE LOGIN
  async function signInWithGoogle() {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  // 🔑 RESET PASSWORD
  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    })

    if (error)
      return { error: translateAuthError(error.message) }

    return { error: null }
  }

  // 🚪 LOGOUT
  async function signOut() {
    setUser(null)
    setProfile(null)
    setQuotas(null)

    await supabase.auth.signOut()

    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  // 🔄 REFRESH
  async function refreshSubscription() {
    if (!user) return
    await loadProfile(user.id)
    await loadQuotas(user.id)
  }

  // 🔥 QUOTA CHECK (SAFE VERSION)
  function checkQuota(type: QuotaType): boolean {
    if (isAdmin) return true
    if (!hasActiveSubscription) return false
    if (!quotas || !quotaLimits) return false

    // Mapper QuotaType → clé dans PlanQuotas
    const QUOTA_MAP: Record<QuotaType, keyof PlanQuotas> = {
      simulations: 'simulations_per_week',
      chat:        'chat_per_week',
      solver:      'solver_per_week',
      remediation: 'remediation_per_week',
      analyses:    'analyses_per_week',
    }
    // Mapper QuotaType → clé dans UserQuotas
    const USED_MAP: Record<QuotaType, keyof UserQuotas> = {
      simulations: 'simulations_used',
      chat:        'chat_used',
      solver:      'solver_used',
      remediation: 'remediation_used',
      analyses:    'analyses_used',
    }

    const limit = quotaLimits[QUOTA_MAP[type]] as number
    const used  = quotas[USED_MAP[type]] as number || 0

    if (limit === -1) return true  // illimité
    return used < limit
  }

  // 🔥 QUOTA INCREMENT
  async function incrementQuota(type: QuotaType) {
    if (!user || !quotas) return

    await supabase.rpc('increment_quota', {
      p_user_id: user.id,
      p_type: type
    })

    await loadQuotas(user.id)
  }

  // 🔐 AUTH LISTENER
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const currentUser = session?.user ?? null

        setUser(currentUser)

        if (currentUser) {
          await loadProfile(currentUser.id)
          await loadQuotas(currentUser.id)
        }

        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

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

// 🔧 HELPERS
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
    return 'Cet email est déjà utilisé'
  return msg
}