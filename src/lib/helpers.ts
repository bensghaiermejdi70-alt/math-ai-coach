/** Formatage date relative */
export function timeAgo(date: Date | string): string {
  const d = new Date(date)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'à l\'instant'
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)}h`
  if (diff < 604800) return `il y a ${Math.floor(diff / 86400)} jour(s)`
  return d.toLocaleDateString('fr-FR')
}

/** Score vers couleur CSS */
export function scoreColor(score: number): string {
  if (score >= 80) return 'var(--teal)'
  if (score >= 60) return 'var(--gold)'
  return 'var(--red)'
}

/** Score vers label */
export function scoreLabel(score: number): string {
  if (score >= 90) return 'Excellent 🎉'
  if (score >= 80) return 'Très bien ✅'
  if (score >= 60) return 'Bien 👍'
  if (score >= 40) return 'À améliorer 📚'
  return 'Difficile — Continue ! 💪'
}

/** Difficulté vers couleur badge */
export function diffColor(diff: string): string {
  return { facile: 'teal', moyen: 'gold', difficile: 'red', bac: 'blue' }[diff] || 'blue'
}

/** Tronquer un texte */
export function truncate(text: string, max = 80): string {
  return text.length > max ? text.slice(0, max) + '...' : text
}

/** Formater un nombre */
export function formatNum(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

/** Nettoyer expression math pour l'API */
export function cleanExpression(expr: string): string {
  return expr.trim()
    .replace(/×/g, '*').replace(/÷/g, '/')
    .replace(/²/g, '**2').replace(/³/g, '**3')
    .replace(/√/g, 'sqrt')
    .replace(/π/g, 'pi')
    .replace(/∞/g, 'oo')
    .replace(/≤/g, '<=').replace(/≥/g, '>=')
}

/** Générer un ID unique */
export function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

/** Copier dans le presse-papier */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Mapping chapitres → emoji */
export const CHAPTER_ICONS: Record<string, string> = {
  'Limites': '→', 'Complexes': 'ℂ', 'Suites': 'ₙ',
  'Dérivées': "f'", 'Logarithme': 'ln', 'Exponentielle': 'eˣ',
  'Géométrie': '📐', 'Intégrales': '∫', 'Équations Diff': 'dy/dx',
  'Probabilités': 'ℙ', 'Isométries': '↔', 'Matrices': '⊗',
  'Analyse 1': '∫', 'Algèbre 1': '⊕', 'Algèbre Linéaire': '⊗',
}
