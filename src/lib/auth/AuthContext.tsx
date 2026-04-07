'use client'
// src/lib/auth/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { Profile, Subscription, UserQuotas, ADMIN_EMAIL, getQuotaLimits, PlanQuotas } from '@/lib/types/monetisation'
import { getDeviceFingerprint, getDeviceInfo } from '@/lib/utils/device'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  subscription: Subscription | null
  quotas: UserQuotas | null
  quotaLimits: PlanQuotas
  isAdmin: boolean
  isLoading: boolean
  isSprint: boolean
  hasActiveSubscription: boolean
  daysRemaining: number | null
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (data: SignUpData) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshSubscription: () => Promise<void>
  checkQuota: (type: QuotaType) => boolean
  incrementQuota: (type: QuotaType) => Promise<void>
}

export type QuotaType = 'simulations' | 'chat' | 'solver' | 'remediation' | 'analyses'

interface SignUpData {
  email: string
  password: string
  full_name: string
  phone?: string
  section_bac?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [quotas, setQuotas] = useState<UserQuotas | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAdmin = profile?.role === 'admin' || user?.email === ADMIN_EMAIL
  const hasActiveSubscription = isAdmin || (
    subscription?.is_active === true &&
    subscription?.status === 'active' &&
    subscription?.subscription_end != null &&
    new Date(subscription.subscription_end) > new Date()
  )

  const isSprint = subscription?.plan_type === 'sprint_bac' && hasActiveSubscription
  const quotaLimits = hasActiveSubscription
    ? getQuotaLimits(subscription?.plan_type ?? null, isSprint)
    : getQuotaLimits(null)

  const daysRemaining = hasActiveSubscription && subscription?.subscription_end
    ? Math.ceil((new Date(subscription.subscription_end).getTime() - Date.now()) / 86400000)
    : null

  // Charger profil utilisateur
  async function loadProfile(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data)
  }

  // Charger abonnement actif
  async function loadSubscription(userId: string) {
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .eq('status', 'active')
      .gt('subscription_end', new Date().toISOString())
      .order('subscription_end', { ascending: false })
      .limit(1)
      .single()
    setSubscription(data)
  }

  // Charger quotas semaine courante
  async function loadQuotas(userId: string) {
    const weekStart = getWeekStart()
    const { data, error } = await supabase
      .from('user_quotas')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start', weekStart)
      .single()

    if (error && error.code === 'PGRST116') {
      // Pas encore de ligne pour cette semaine
      const { data: newData } = await supabase
        .from('user_quotas')
        .insert({ user_id: userId, week_start: weekStart })
        .select()
        .single()
      setQuotas(newData)
    } else {
      setQuotas(data)
    }
  }

  // Vérifier et enregistrer fingerprint dispositif
  async function checkDevice(userId: string) {
    try {
      const fingerprint = await getDeviceFingerprint()
      const deviceInfo = getDeviceInfo()

      // Enregistrer/mettre à jour la session dispositif
      await supabase
        .from('device_sessions')
        .upsert({
          user_id: userId,
          device_fingerprint: fingerprint,
          device_info: deviceInfo,
          last_seen: new Date().toISOString(),
        }, { onConflict: 'user_id,device_fingerprint' })

      // Vérifier si ce dispositif est autorisé (si abonnement actif)
      if (profile?.device_fingerprint && !isAdmin) {
        if (profile.device_fingerprint !== fingerprint) {
          // Dispositif différent → déconnecter
          await supabase.auth.signOut()
          alert('⚠️ Connexion refusée : votre abonnement est lié à un autre appareil. Contactez le support.')
          return
        }
      } else if (!profile?.device_fingerprint) {
        // Premier enregistrement du dispositif
        await supabase
          .from('profiles')
          .update({ device_fingerprint: fingerprint })
          .eq('id', userId)
      }
    } catch (e) {
      console.error('Device check error:', e)
    }
  }

  async function refreshSubscription() {
    if (user) {
      await loadSubscription(user.id)
      await loadQuotas(user.id)
    }
  }

  // Vérifier si quota disponible
  function checkQuota(type: QuotaType): boolean {
    if (isAdmin) return true
    if (!hasActiveSubscription) {
      const freeLimit = getFreeLimit(type)
      const used = getQuotaUsed(type)
      return used < freeLimit
    }

    const limit = quotaLimits[`${type}_per_week` as keyof PlanQuotas] as number
    if (limit === -1) return true // illimité
    const used = getQuotaUsed(type)
    return used < limit
  }

  function getQuotaUsed(type: QuotaType): number {
    if (!quotas) return 0
    const map: Record<QuotaType, keyof UserQuotas> = {
      simulations: 'simulations_used',
      chat: 'chat_used',
      solver: 'solver_used',
      remediation: 'remediation_used',
      analyses: 'analyses_used',
    }
    return quotas[map[type]] as number
  }

  function getFreeLimit(type: QuotaType): number {
    const freeLimits: Record<QuotaType, number> = {
      simulations: 0,
      chat: 3,
      solver: 5,
      remediation: 0,
      analyses: 0,
    }
    return freeLimits[type]
  }

  // Incrémenter quota utilisé
  async function incrementQuota(type: QuotaType) {
    if (isAdmin || !user) return

    const weekStart = getWeekStart()
    const columnMap: Record<QuotaType, string> = {
      simulations: 'simulations_used',
      chat: 'chat_used',
      solver: 'solver_used',
      remediation: 'remediation_used',
      analyses: 'analyses_used',
    }

    const col = columnMap[type]
    const currentVal = getQuotaUsed(type)

    const { data } = await supabase
      .from('user_quotas')
      .upsert({
        user_id: user.id,
        week_start: weekStart,
        [col]: currentVal + 1,
      }, { onConflict: 'user_id,week_start' })
      .select()
      .single()

    if (data) setQuotas(data)
  }

  // Sign In
  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: translateAuthError(error.message) }
    return { error: null }
  }

  // Sign Up
  async function signUp(data: SignUpData) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
          phone: data.phone,
          section_bac: data.section_bac,
        },
      },
    })
    if (error) return { error: translateAuthError(error.message) }

    // Envoyer email de bienvenue
    try {
      await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': process.env.INTERNAL_API_SECRET || 'dev-secret',
        },
        body: JSON.stringify({
          type: 'bienvenue',
          to: data.email,
          data: { nom: data.full_name || data.email.split('@')[0] },
        }),
      })
    } catch (e) { console.error('Welcome email error:', e) }

    return { error: null }
  }

  // Sign Out
  async function signOut() {
    // Réinitialiser le state immédiatement pour un feedback instantané
    setUser(null)
    setProfile(null)
    setSubscription(null)
    setQuotas(null)
    // Puis déconnecter Supabase
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.error('signOut error:', e)
    }
    // Rediriger vers l'accueil
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  // Init
  useEffect(() => {
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          await loadProfile(currentUser.id)
          await loadSubscription(currentUser.id)
          await loadQuotas(currentUser.id)
          // Vérification dispositif en arrière-plan
          setTimeout(() => checkDevice(currentUser.id), 1000)
        }

        setIsLoading(false)
      }
    )

    return () => authSub.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{
      user, profile, subscription, quotas, quotaLimits,
      isAdmin, isLoading, isSprint, hasActiveSubscription, daysRemaining,
      signIn, signUp, signOut, refreshSubscription, checkQuota, incrementQuota,
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

// Helper
function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

function translateAuthError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'Email ou mot de passe incorrect'
  if (msg.includes('Email not confirmed')) return 'Veuillez confirmer votre email'
  if (msg.includes('User already registered')) return 'Cet email est déjà utilisé'
  if (msg.includes('Password should be at least')) return 'Le mot de passe doit avoir au moins 6 caractères'
  return msg
}
