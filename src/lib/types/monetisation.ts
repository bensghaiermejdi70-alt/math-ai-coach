// src/lib/types/monetisation.ts

export type PlanType = 'mensuel' | 'annuel' | 'sprint_bac'
export type PaymentMethod = 'd17' | 'konnect' | 'flouci' | 'recharge_mobile' | 'manual'
export type SubscriptionStatus = 'pending' | 'active' | 'expired' | 'cancelled'
export type UserRole = 'student' | 'teacher' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: UserRole
  section_bac: string | null
  device_fingerprint: string | null
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_type: PlanType
  status: SubscriptionStatus
  price_paid: number | null
  currency: string
  payment_method: PaymentMethod | null
  payment_reference: string | null
  payment_phone: string | null
  payment_screenshot_url: string | null
  subscription_start: string | null
  subscription_end: string | null
  is_active: boolean
  activated_by: string | null
  activated_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface UserQuotas {
  id: string
  user_id: string
  week_start: string
  simulations_used: number
  chat_used: number
  solver_used: number
  remediation_used: number
  analyses_used: number
}

export interface PlanQuotas {
  simulations_per_week: number
  chat_per_week: number
  solver_per_week: number // -1 = illimité
  remediation_per_week: number
  analyses_per_week: number
  courses_unlimited: boolean
  bac_blanc: boolean
  weekly_report?: boolean
  advanced_program?: boolean
}

export interface Plan {
  id: PlanType
  name: string
  price_monthly: number | null
  price_annual: number | null
  price_sprint: number | null
  quotas: PlanQuotas
  is_active: boolean
}

// ============================================================
// PLAN DEFINITIONS (côté client, sans base de données)
// ============================================================

export const PLAN_DEFINITIONS: Record<PlanType, {
  label: string
  price: string
  priceNum: number
  description: string
  quotas: PlanQuotas
  badge?: string
}> = {
  mensuel: {
    label: 'Mensuel',
    price: '80 DT/mois',
    priceNum: 80,
    description: 'Résiliable à tout moment',
    quotas: {
      simulations_per_week: 2,
      chat_per_week: 35,
      solver_per_week: 30,
      remediation_per_week: 10,
      analyses_per_week: 2,
      courses_unlimited: true,
      bac_blanc: true,
    },
  },
  annuel: {
    label: 'Annuel',
    price: '750 DT/an',
    priceNum: 750,
    description: 'Payé en une fois · Économisez 210 DT',
    badge: 'Meilleure valeur',
    quotas: {
      simulations_per_week: 2,
      chat_per_week: 35,
      solver_per_week: 30,
      remediation_per_week: 10,
      analyses_per_week: 2,
      courses_unlimited: true,
      bac_blanc: true,
    },
  },
  sprint_bac: {
    label: 'Sprint Bac',
    price: '+120 DT/mois',
    priceNum: 120,
    description: 'Avril + Mai uniquement · Option add-on',
    badge: '🔥 Boost',
    quotas: {
      simulations_per_week: 5,
      chat_per_week: 50,
      solver_per_week: -1,
      remediation_per_week: 25,
      analyses_per_week: 5,
      courses_unlimited: true,
      bac_blanc: true,
      weekly_report: true,
      advanced_program: true,
    },
  },
}

// ============================================================
// QUOTA LIMITS par plan
// ============================================================

export function getQuotaLimits(planType: PlanType | null, isSprint: boolean = false): PlanQuotas {
  if (!planType) {
    // Utilisateur non abonné - accès limité gratuit
    return {
      simulations_per_week: 0,
      chat_per_week: 3,
      solver_per_week: 5,
      remediation_per_week: 0,
      analyses_per_week: 0,
      courses_unlimited: false,
      bac_blanc: false,
    }
  }

  if (isSprint || planType === 'sprint_bac') {
    return PLAN_DEFINITIONS.sprint_bac.quotas
  }

  return PLAN_DEFINITIONS[planType].quotas
}

// Email admin (accès illimité sans abonnement)
export const ADMIN_EMAIL = 'bensghaiermejdi70@gmail.com'
