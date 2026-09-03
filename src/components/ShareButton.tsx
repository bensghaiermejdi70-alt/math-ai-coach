'use client'
import { useState } from 'react'

interface ShareButtonProps {
  title?: string
  text?: string
  url?: string
  className?: string
  ariaLabel?: string
  copiedLabel?: string
  label: string // texte affiché dans le bouton ("Partager" / "مشاركة") — pas d'icône seule, pour que ce soit compris sans ambiguïté
}

/**
 * Utilise l'API native de partage du navigateur (menu natif iOS/Android/desktop
 * récent). Si indisponible (vieux navigateurs desktop), repli sur
 * copier-le-lien avec confirmation visuelle.
 */
export default function ShareButton({ title = 'MathBacAI', text = "Prépare ton Bac avec l'IA — MathBacAI", url, className, ariaLabel = 'Partager MathBacAI', copiedLabel = 'Lien copié !', label }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://mathbacai.com')

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl })
      } catch {
        // L'utilisateur a annulé le partage — rien à faire
      }
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Copie impossible (très rare) — on ignore silencieusement
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleShare}
        aria-label={ariaLabel}
        className={className}
      >
        {label}
      </button>
      {copied && (
        <span
          role="status"
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg"
        >
          {copiedLabel}
        </span>
      )}
    </div>
  )
}