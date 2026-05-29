// src/lib/types/monetisation.ts

// Plans de base (sans matière)
export type BasePlanType = 'mensuel' | 'annuel' | 'sprint_bac'

// Matières disponibles pour l'abonnement
export type MatiereType = 'mathematiques' | 'physique' | 'svt' | 'anglais' | 'informatique' | 'francais'

// PlanType = plan seul (legacy) OU plan_matiere (nouveau format)
// Format : "mensuel_mathematiques" | "annuel_physique" | "sprint_mathematiques"
// Legacy : "mensuel" | "annuel" | "sprint_bac" (= mathematiques par défaut)
// ⚠️  Les sprints par matière utilisent le format "sprint_<matiere>" (sans "_bac")
//     Ex: sprint_physique, sprint_svt, sprint_anglais (cohérent avec DB et activation)
export type PlanType = 'mensuel' | 'annuel' | 'sprint_bac'
  | 'mensuel_mathematiques' | 'annuel_mathematiques' | 'sprint_bac_mathematiques' | 'sprint_mathematiques'
  | 'mensuel_physique'      | 'annuel_physique'      | 'sprint_bac_physique'      | 'sprint_physique'
  | 'mensuel_svt'           | 'annuel_svt'           | 'sprint_bac_svt'           | 'sprint_svt'
  | 'mensuel_anglais'       | 'annuel_anglais'       | 'sprint_bac_anglais'       | 'sprint_anglais'
  | 'mensuel_informatique'  | 'annuel_informatique'  | 'sprint_bac_informatique'  | 'sprint_informatique'
  | 'mensuel_francais'      | 'annuel_francais'      | 'sprint_bac_francais'      | 'sprint_francais'

// ── Helpers pour extraire plan et matière ──────────────────────────
export function extractPlan(planType: string | null | undefined): 'mensuel' | 'annuel' | 'sprint_bac' {
  if (!planType) return 'mensuel'
  if (planType.startsWith('sprint_bac')) return 'sprint_bac'
  if (planType.startsWith('annuel'))     return 'annuel'
  return 'mensuel'
}

export function extractMatiere(planType: string | null | undefined): MatiereType {
  if (!planType) return 'mathematiques'
  // Pattern "sprint_<matiere>" (sans _bac) → extraire la matière après "sprint_"
  // Ex: sprint_physique → physique, sprint_svt → svt
  const known: MatiereType[] = ['mathematiques','physique','svt','anglais','informatique','francais']
  const parts = planType.split('_')
  // Chercher la matière dans toutes les parties (gère sprint_bac_physique et sprint_physique)
  for (let i = parts.length - 1; i >= 0; i--) {
    if (known.includes(parts[i] as MatiereType)) {
      return parts[i] as MatiereType
    }
  }
  return 'mathematiques'
}

export const MATIERE_LABELS: Record<MatiereType, string> = {
  mathematiques: '🧮 Mathématiques',
  physique:      '⚗️ Physique-Chimie',
  svt:           '🌱 SVT',
  anglais:       '🇬🇧 Anglais',
  informatique:  '💻 Informatique',
  francais:      '📖 Français',
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
  matiere: MatiereType
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

export const PLAN_DEFINITIONS: Record<BasePlanType, {
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
      simulations_per_week: 5,
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
      simulations_per_week: 10,
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

type PlanTypeInput = PlanType | string | Array<PlanType | string> | null | undefined

function getPlanPriority(planType: string): number {
  const basePlan = extractPlan(planType)
  if (basePlan === 'sprint_bac') return 3
  if (basePlan === 'annuel') return 2
  return 1
}

function normalizePlanTypes(planTypes: PlanTypeInput): string[] {
  if (!planTypes) return []
  const list = Array.isArray(planTypes) ? planTypes : [planTypes]
  const bestBySubject: Record<string, string> = {}

  for (const planType of list) {
    if (!planType) continue
    const matiere = extractMatiere(planType)
    const current = bestBySubject[matiere]
    if (!current || getPlanPriority(planType) > getPlanPriority(current)) {
      bestBySubject[matiere] = planType
    }
  }

  return Object.values(bestBySubject)
}

function combineQuotas(a: PlanQuotas, b: PlanQuotas): PlanQuotas {
  return {
    simulations_per_week: a.simulations_per_week + b.simulations_per_week,
    chat_per_week: a.chat_per_week + b.chat_per_week,
    solver_per_week: a.solver_per_week === -1 || b.solver_per_week === -1 ? -1 : a.solver_per_week + b.solver_per_week,
    remediation_per_week: a.remediation_per_week + b.remediation_per_week,
    analyses_per_week: a.analyses_per_week + b.analyses_per_week,
    courses_unlimited: a.courses_unlimited || b.courses_unlimited,
    bac_blanc: a.bac_blanc || b.bac_blanc,
  }
}

export function getQuotaLimits(planTypes: PlanTypeInput, isSprint: boolean = false): PlanQuotas {
  if (!planTypes) {
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

  const normalizedPlanTypes = normalizePlanTypes(planTypes)

  if (normalizedPlanTypes.length === 0) {
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

  return normalizedPlanTypes.reduce<PlanQuotas>((acc, planType) => {
    const basePlan = extractPlan(planType)
    const quotas = (isSprint || basePlan === 'sprint_bac')
      ? PLAN_DEFINITIONS.sprint_bac.quotas
      : PLAN_DEFINITIONS[basePlan].quotas
    return combineQuotas(acc, quotas)
  }, {
    simulations_per_week: 0,
    chat_per_week: 0,
    solver_per_week: 0,
    remediation_per_week: 0,
    analyses_per_week: 0,
    courses_unlimited: false,
    bac_blanc: false,
  })
}

export function hasMatiereAccess(planType: PlanTypeInput, matiere: MatiereType): boolean {
  if (!planType) return false
  if (Array.isArray(planType)) {
    return planType.some(pt => extractMatiere(pt) === matiere)
  }
  return extractMatiere(planType) === matiere
}

export function sumQuotasAcrossMatiere(quotasRecord: Record<MatiereType, UserQuotas> | null | undefined): UserQuotas {
  if (!quotasRecord) {
    return {
      id: '',
      user_id: '',
      week_start: '',
      matiere: 'mathematiques',
      simulations_used: 0,
      chat_used: 0,
      solver_used: 0,
      remediation_used: 0,
      analyses_used: 0,
    }
  }

  let total: UserQuotas = {
    id: '',
    user_id: '',
    week_start: '',
    matiere: 'mathematiques',
    simulations_used: 0,
    chat_used: 0,
    solver_used: 0,
    remediation_used: 0,
    analyses_used: 0,
  }

  // Déduplication: si même id (même enregistrement stocké sous plusieurs clés), compter une seule fois
  const seenIds = new Set<string>()
  for (const matiere in quotasRecord) {
    const quota = quotasRecord[matiere as MatiereType]
    if (quota) {
      const uniqueKey = quota.id || `${quota.user_id}_${quota.week_start}_${matiere}`
      if (seenIds.has(uniqueKey)) continue  // Ignorer les doublons
      seenIds.add(uniqueKey)
      total.simulations_used += quota.simulations_used
      total.chat_used += quota.chat_used
      total.solver_used += quota.solver_used
      total.remediation_used += quota.remediation_used
      total.analyses_used += quota.analyses_used
    }
  }

  return total
}

// Email admin (accès illimité sans abonnement)
export const ADMIN_EMAIL = 'bensghaiermejdi70@gmail.com'