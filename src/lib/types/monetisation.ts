// src/lib/types/monetisation.ts

// Matières disponibles pour l'abonnement
export type MatiereType = 'mathematiques' | 'physique' | 'svt' | 'anglais' | 'informatique'

// PlanType = plan seul (legacy) OU plan_matiere (nouveau format)
// Format : "mensuel_mathematiques" | "annuel_physique" | "sprint_bac_mathematiques"
// Legacy : "mensuel" | "annuel" | "sprint_bac" (= mathematiques par défaut)
export type PlanType = 'mensuel' | 'annuel' | 'sprint_bac'
  | 'mensuel_mathematiques' | 'annuel_mathematiques' | 'sprint_bac_mathematiques'
  | 'mensuel_physique'      | 'annuel_physique'      | 'sprint_bac_physique'
  | 'mensuel_svt'           | 'annuel_svt'           | 'sprint_bac_svt'
  | 'mensuel_anglais'       | 'annuel_anglais'       | 'sprint_bac_anglais'
  | 'mensuel_informatique'  | 'annuel_informatique'  | 'sprint_bac_informatique'

// ── Helpers pour extraire plan et matière ──────────────────────────
export function extractPlan(planType: string | null | undefined): 'mensuel' | 'annuel' | 'sprint_bac' {
  if (!planType) return 'mensuel'
  if (planType.startsWith('sprint_bac')) return 'sprint_bac'
  if (planType.startsWith('annuel'))     return 'annuel'
  return 'mensuel'
}

export function extractMatiere(planType: string | null | undefined): MatiereType {
  if (!planType) return 'mathematiques'
  const parts = planType.split('_')
  const known: MatiereType[] = ['mathematiques','physique','svt','anglais','informatique']
  const last = parts[parts.length - 1] as MatiereType
  return known.includes(last) ? last : 'mathematiques'
}

export function hasMatiereAccess(planType: string | null | undefined, matiere: MatiereType): boolean {
  if (!planType) return false
  return extractMatiere(planType) === matiere
}

export const MATIERE_LABELS: Record<MatiereType, string> = {
  mathematiques: '🧮 Mathématiques',
  physique:      '⚗️ Physique-Chimie',
  svt:           '🧬 SVT',
  anglais:       '🇬🇧 Anglais',
  informatique:  '💻 Informatique',
}
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
  plan_type?: PlanType | null
  is_active?: boolean
  subscription_end?: string | null
  subscription_start?: string | null
  stripe_customer_id?: string | null
  current_session_id?: string | null
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
// PLAN DEFINITIONS
// ============================================================

export const PLAN_DEFINITIONS: Record<PlanType, {
  label: string
  // Tunisie
  price_tn: string
  priceNum_tn: number
  // France
  price_fr: string
  priceNum_fr: number
  description: string
  quotas: PlanQuotas
  badge?: string
}> = {
  mensuel: {
    label: 'MathBac Essentiel',
    price_tn: '60 DT/mois',
    priceNum_tn: 60,
    price_fr: '19 €/mois',
    priceNum_fr: 19,
    description: 'Résiliable à tout moment',
    quotas: {
      simulations_per_week: 2,
      chat_per_week: 20,
      solver_per_week: 20,      // ← 20/sem (was illimité)
      remediation_per_week: 10,
      analyses_per_week: 5,
      courses_unlimited: true,
      bac_blanc: false,
    },
  },
  annuel: {
    label: 'MathBac Annuel',
    price_tn: '600 DT/an',
    priceNum_tn: 600,
    price_fr: '199 €',
    priceNum_fr: 199,
    description: 'Paiement unique · Accès 12 mois',
    badge: '⭐ Meilleure valeur',
    quotas: {
      simulations_per_week: 2,
      chat_per_week: 20,
      solver_per_week: 40,      // ← 40/sem (was illimité)
      remediation_per_week: 10,
      analyses_per_week: 5,
      courses_unlimited: true,
      bac_blanc: true,
    },
  },
  sprint_bac: {
    label: 'MathBac sprint bac',
    price_tn: '90 DT/mois',
    priceNum_tn: 90,
    price_fr: '29 €/mois',
    priceNum_fr: 29,
    description: 'Résiliable à tout moment · Quotas boostés',
    badge: '🔥 Mode Intensif',
    quotas: {
      simulations_per_week: 5,
      chat_per_week: 30,
      solver_per_week: 40,      // ← 40/sem (was illimité)
      remediation_per_week: 20,
      analyses_per_week: 10,
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

export function getQuotaLimits(planType: PlanType | string | null, isSprint: boolean = false): PlanQuotas {
  if (!planType) {
    // Utilisateur non abonné — accès gratuit limité
    return {
      simulations_per_week: 0,
      chat_per_week: 3,
      solver_per_week: 3,
      remediation_per_week: 0,
      analyses_per_week: 0,
      courses_unlimited: false,
      bac_blanc: false,
    }
  }

  // Extraire le plan de base (gère "mensuel_mathematiques" → "mensuel")
  const basePlan = extractPlan(planType)

  if (isSprint || basePlan === 'sprint_bac') {
    return PLAN_DEFINITIONS.sprint_bac.quotas
  }

  return PLAN_DEFINITIONS[basePlan].quotas
}

// Email admin (accès illimité sans abonnement)
export const ADMIN_EMAIL = 'bensghaiermejdi70@gmail.com'