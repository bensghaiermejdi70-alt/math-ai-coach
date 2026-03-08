'use client'
import { useEffect, useRef } from 'react'

interface MathRendererProps {
  expression: string
  display?: boolean   // block vs inline
  color?: string
  fontSize?: number
}

/**
 * Renders a math expression.
 * Uses KaTeX if available (loaded via CDN in layout), otherwise falls back
 * to styled monospace which looks clean without any extra dependency.
 */
export default function MathRenderer({ expression, display = false, color = 'var(--text)', fontSize }: MathRendererProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Try KaTeX if loaded globally
    const w = window as any
    if (w.katex && ref.current) {
      try {
        w.katex.render(expression, ref.current, {
          displayMode: display,
          throwOnError: false,
          output: 'html',
        })
        return
      } catch { /* fallback */ }
    }
    // Fallback: styled monospace
    if (ref.current) {
      ref.current.textContent = expression
    }
  }, [expression, display])

  const style: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    color,
    fontSize: fontSize ? `${fontSize}px` : display ? 18 : 15,
    display: display ? 'block' : 'inline',
    padding: display ? '14px 20px' : '2px 8px',
    background: display ? 'var(--bg2)' : 'rgba(79,110,247,0.08)',
    borderRadius: display ? 12 : 6,
    border: display ? '1px solid var(--border)' : 'none',
    margin: display ? '12px 0' : undefined,
    overflowX: display ? 'auto' : undefined,
  }

  return <span ref={ref} style={style}>{expression}</span>
}
