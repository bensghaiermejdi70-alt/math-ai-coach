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

// ── Constaté sur le solveur (23/09) : Luna respecte $...$/$$...$$ sur des formules isolées, mais
// laisse parfois un bloc \begin{aligned}...\end{aligned} entier SANS le envelopper dans $$ $$ —
// il s'affiche alors en LaTeX brut à l'écran. Claude ne fait jamais cette erreur dans nos tests.
// Rappel ciblé, indépendant du rappel de longueur (le chat cumule les deux ; jamais sur les
// simulations, dont le JSON exclut volontairement les "$" dans certains champs).
export const LATEX_DELIMITER_REMINDER =
  "\n\n## RAPPEL LATEX (PRIORITAIRE)\nAucun symbole ou formule mathématique ne doit jamais apparaître hors des délimiteurs $ ... $ (en ligne) ou $$ ... $$ (centré) — y compris un bloc \\begin{aligned}...\\end{aligned}, \\begin{cases}...\\end{cases} ou tout autre environnement multi-lignes, qui doit être entièrement enveloppé dans UN SEUL $$ ... $$. Une formule sans $ affichée telle quelle (avec des \\frac, \\sqrt, \\left, etc. visibles) est une erreur grave."

// ── Constaté sur le solveur (25/09) : sur un exercice à sous-questions numérotées (1.a, 1.b, 2.a...),
// Luna a répondu directement à 1.b) sans jamais traiter 1.a), alors que 1.b) réutilisait son résultat.
// Claude ne saute aucune sous-question dans nos tests.
export const SOLVER_COMPLETENESS_REMINDER =
  "\n\n## RAPPEL COMPLÉTUDE (PRIORITAIRE)\nAvant de répondre, relis l'énoncé en entier et dresse mentalement la liste de TOUTES les sous-questions à traiter (1.a, 1.b, 2.a, 2.b, 3, 4...), quelle que soit leur mise en page — même si une lettre de sous-question est seule sur sa ligne, précédée d'un tiret, ou séparée du numéro par un saut de ligne. Une sous-question fait partie de l'exercice dès qu'elle porte une lettre ou un numéro, peu importe sa présentation. Réponds ensuite à CHACUNE d'elles, dans l'ordre, sans en sauter aucune — même si son résultat sert dans une question suivante, même si elle te semble immédiate. Ne commence jamais ta réponse par une sous-question du milieu ou de la fin (b), c), 4)...) en laissant une question antérieure sans réponse."

// ── Simulations/Bac Blancs/corrections/analyses/remédiation (01/10) : ces pages n'utilisent PAS
// KaTeX — leur affichage (écran ET PDF) convertit le texte directement en Unicode et ne sait pas
// toujours bien gérer une commande LaTeX imbriquée (ex. \sqrt{\frac{a}{b}}), qui ressort alors cassée
// à l'écran. Contrairement au chat/solveur, on ne demande donc PAS des $ ici : on demande l'inverse,
// aucune syntaxe LaTeX du tout, uniquement de l'Unicode déjà prêt à afficher.
export const UNICODE_ONLY_REMINDER =
  "\n\n## RAPPEL NOTATION (PRIORITAIRE)\nCette page n'affiche PAS de LaTeX : n'utilise JAMAIS $, $$, \\( \\), \\[ \\], \\frac, \\sqrt, \\begin{...}, ^ ou _ en syntaxe LaTeX. Écris directement en Unicode déjà lisible à l'écran : fractions sous la forme (a)/(b), racines sous la forme √(x), exposants avec les caractères ² ³ ou le format x^2, indices avec une lettre collée (x1, xn) ou le caractère ₙ. Une commande LaTeX visible telle quelle (avec un backslash) est une erreur grave sur cette page."

export function extraInstructionsFor(t: QuotaType, spec: ModelSpec, disabled = false): string {
  if (disabled || spec.provider !== 'openai') return ''
  if (process.env.LLM_LENGTH_REMINDER === '0') return ''
  if (t === 'solver') return LATEX_DELIMITER_REMINDER + SOLVER_COMPLETENESS_REMINDER
  if (t === 'chat') return CHAT_LENGTH_REMINDER + LATEX_DELIMITER_REMINDER
  if (t === 'simulations') return UNICODE_ONLY_REMINDER
  return ''
}