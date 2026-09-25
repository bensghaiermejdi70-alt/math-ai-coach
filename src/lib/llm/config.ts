// src/lib/llm/config.ts
// Configuration du routage multi-modèles (/api/llm) : politique A/B, tarifs, coût estimé.
// Par défaut (aucune variable d'env) : 0 % de trafic vers la variante => comportement 100 % Anthropic.
import { createHash } from 'crypto'

export type Provider = 'anthropic' | 'openai'
export type Effort = 'none' | 'low' | 'medium' | 'high' | 'xhigh' | 'max'
export type Verbosity = 'low' | 'medium' | 'high'
export type QuotaType = 'chat' | 'solver' | 'simulations'
export type Arm = 'control' | 'variant'

export interface ModelSpec {
  provider: Provider
  model: string
  effort?: Effort // OpenAI uniquement (reasoning.effort)
  verbosity?: Verbosity // OpenAI uniquement (text.verbosity : longueur/détail de la réponse visible)
}

// Consommation normalisée (les deux fournisseurs comptent différemment, on uniformise ici)
export interface Usage {
  input: number      // TOUS les tokens d'entrée (y compris cache lu/écrit)
  output: number     // tokens de sortie (OpenAI : raisonnement inclus, facturé comme sortie)
  cached: number     // entrée lue depuis le cache
  cacheWrite: number // entrée écrite dans le cache (Anthropic)
  reasoning: number  // dont tokens de raisonnement (OpenAI, info)
}
export const EMPTY_USAGE: Usage = { input: 0, output: 0, cached: 0, cacheWrite: 0, reasoning: 0 }

// ── Sécurité : modèles Claude que le client peut demander (le bras "contrôle") ──
// /api/anthropic laisse le client choisir N'IMPORTE quel modèle et max_tokens ; ici on verrouille.
export const CONTROL_MODELS_ALLOWED = new Set<string>([
  'claude-sonnet-4-6',
  'claude-sonnet-4-20250514',
  'claude-sonnet-5',
  'claude-haiku-4-5-20251001',
])
export const MAX_TOKENS_CAP = 10000 // le max utilisé aujourd'hui côté front est 8500

// ── Tarifs $ / million de tokens (sept. 2026) — à mettre à jour si les prix changent ──
const PRICES: Record<string, { in: number; out: number }> = {
  'claude-sonnet-4-6': { in: 3, out: 15 },
  'claude-sonnet-4-20250514': { in: 3, out: 15 },
  'claude-sonnet-5': { in: 2, out: 10 },
  'claude-haiku-4-5-20251001': { in: 1, out: 5 },
  'gpt-6-luna': { in: 0.1, out: 0.5 },
}

export function estimateCostUsd(spec: ModelSpec, u: Usage): number | null {
  const p = PRICES[spec.model]
  if (!p) return null
  const uncached = Math.max(0, u.input - u.cached - u.cacheWrite)
  // Cache Anthropic configuré en TTL 1 h => écriture facturée 2x l'entrée ; lecture = 10 % (idem OpenAI)
  const writeMult = spec.provider === 'anthropic' ? 2 : 1
  const usd =
    (uncached * p.in + u.cached * p.in * 0.1 + u.cacheWrite * p.in * writeMult + u.output * p.out) / 1e6
  return Math.round(usd * 1e6) / 1e6
}

// ── Raisonnement OpenAI : max_output_tokens INCLUT les tokens de raisonnement ──
// On ajoute une marge au max_tokens demandé par le client pour ne pas tronquer le texte visible.
// Valeurs de départ : à ajuster avec reasoning_tokens réellement mesuré dans llm_ab_logs.
export const REASONING_HEADROOM: Record<Effort, number> = {
  none: 0,
  low: 3000,
  medium: 8000,
  high: 16000,
  xhigh: 32000,
  max: 64000,
}

const EFFORTS: Effort[] = ['none', 'low', 'medium', 'high', 'xhigh', 'max']
const VERBOSITIES: Verbosity[] = ['low', 'medium', 'high']

// Format d'une spec : "fournisseur:modèle[:effort[:verbosité]]"
//   ex. "openai:gpt-6-luna:high:high", "openai:gpt-6-luna:medium", "anthropic:claude-sonnet-5"
// effort = profondeur de RAISONNEMENT ; verbosité = LONGUEUR de la réponse visible (indépendants).
export function parseSpec(s: string | undefined | null): ModelSpec | null {
  if (!s) return null
  const [provider, model, effort, verbosity] = s.split(':').map((x) => x.trim())
  if ((provider !== 'anthropic' && provider !== 'openai') || !model) return null
  if (effort && !EFFORTS.includes(effort as Effort)) return null
  if (verbosity && !VERBOSITIES.includes(verbosity as Verbosity)) return null
  return { provider, model, effort: (effort as Effort) || undefined, verbosity: (verbosity as Verbosity) || undefined }
}

// Variante testée par type de requête (surchargeable : LLM_VARIANT_CHAT / _SOLVER / _SIMULATIONS)
const DEFAULT_VARIANTS: Record<QuotaType, string> = {
  chat: 'openai:gpt-6-luna:high:high', // le prompt du chat exige des réponses longues et complètes => verbosité haute
  solver: 'openai:gpt-6-luna:medium:high',
  simulations: 'openai:gpt-6-luna:medium', // JSON strict : on ne force pas la verbosité
}

export function getVariantSpec(t: QuotaType): ModelSpec | null {
  const env = process.env[`LLM_VARIANT_${t.toUpperCase()}`]
  return parseSpec(env || DEFAULT_VARIANTS[t])
}

// LLM_AB_PERCENT='{"chat":20,"solver":0,"simulations":0}' — % d'utilisateurs envoyés vers la variante (0 par défaut)
export function getAbPercent(t: QuotaType): number {
  try {
    const cfg = JSON.parse(process.env.LLM_AB_PERCENT || '{}')
    const n = Number(cfg?.[t])
    return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0
  } catch {
    return 0
  }
}

// LLM_AB_MATIERES='svt,anglais' — limite le test à certaines matières (vide = toutes)
export function matiereEnabled(matiere: string): boolean {
  const list = (process.env.LLM_AB_MATIERES || '').split(',').map((x) => x.trim()).filter(Boolean)
  return list.length === 0 || list.includes(matiere)
}

export function abSettings() {
  return {
    salt: process.env.LLM_AB_SALT || 'mb-ab-1',
    // délai max avant le 1er texte de la variante avant repli sur Claude (streaming)
    ttftMs: Number(process.env.LLM_VARIANT_TTFT_MS) || 45000,
    // budget total de la variante en mode non-streaming
    totalMs: Number(process.env.LLM_VARIANT_TOTAL_MS) || 60000,
    // repli automatique sur Claude si la variante échoue (défaut : oui)
    fallback: process.env.LLM_VARIANT_FALLBACK !== '0',
  }
}

// Attribution STABLE par utilisateur et par type : un élève garde le même bras pendant tout le test.
export function pickArm(userId: string, t: QuotaType, matiere: string): Arm {
  const pct = getAbPercent(t)
  if (pct <= 0 || !matiereEnabled(matiere)) return 'control'
  const h = createHash('sha256').update(`${abSettings().salt}:${t}:${userId}`).digest()
  return h.readUInt32BE(0) % 100 < pct ? 'variant' : 'control'
}

// ── Rappel de longueur : ajouté au prompt système UNIQUEMENT pour la variante OpenAI ET le type "chat" ──
// Constat (tests du 24/09) : à prompt identique, Luna écrit ~1 400-1 900 caractères là où Claude en écrit 4 000-6 000,
// et ignore « réponse COMPLÈTE et DÉTAILLÉE ». Ce rappel ramène Luna à une longueur comparable.
// Le bras contrôle (Claude), les simulations et le solveur ne le reçoivent jamais. Désactivable : LLM_LENGTH_REMINDER=0
export const CHAT_LENGTH_REMINDER =
  "\n\n## RAPPEL DE LONGUEUR (PRIORITAIRE)\nTes réponses sont toujours complètes et détaillées, comme un professeur qui prend le temps d'expliquer. " +
  "Question ponctuelle : au moins 2500 caractères (explication, exemple résolu, piège à éviter). " +
  "Demande de cours, de notion ou de chapitre (« qu'est-ce que », « explique », « cours sur », « définition ») : cours COMPLET d'au moins 5000 caractères " +
  "couvrant TOUTES les sections prévues (définition, propriétés, exemples résolus étape par étape, bloc graph si pertinent, erreurs fréquentes, tableau « À retenir »), " +
  "puis question finale à l'élève. Une réponse courte est une réponse incorrecte. " +
  "Quand plusieurs grandeurs ou courbes sont liées (tension et courant, position et vitesse, une fonction et sa tangente…), trace-les TOUTES ensemble dans le même bloc graph, avec une entrée par courbe dans \\\"functions\\\", plutôt que d'en omettre une."

export function extraInstructionsFor(t: QuotaType, spec: ModelSpec, disabled = false): string {
  if (disabled || spec.provider !== 'openai' || t !== 'chat') return ''
  if (process.env.LLM_LENGTH_REMINDER === '0') return ''
  return CHAT_LENGTH_REMINDER
}