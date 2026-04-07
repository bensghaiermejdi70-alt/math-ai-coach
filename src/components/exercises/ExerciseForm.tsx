'use client'
import { useState } from 'react'

interface ExerciseFormProps {
  exerciseId: string
  question: string
  onSubmit: (answer: string, exerciseId: string) => void
  loading?: boolean
}

export default function ExerciseForm({ exerciseId, question, onSubmit, loading }: ExerciseFormProps) {
  const [answer, setAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Question */}
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
        <div style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Énoncé</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--text)', lineHeight: 1.7 }}>{question}</div>
      </div>

      {/* Hint */}
      {showHint && (
        <div style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 12, padding: '14px 18px', animation: 'fadeInUp 0.3s ease both' }}>
          <div style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>💡 Indice</div>
          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Commence par identifier le type d'équation, puis applique la méthode appropriée vue en cours.</div>
        </div>
      )}

      {/* Answer input */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Ta réponse</div>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Écris ta solution ici..."
          rows={5}
          style={{ width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 14, outline: 'none', resize: 'vertical', lineHeight: 1.8, transition: 'border-color 0.2s' }}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => onSubmit(answer, exerciseId)}
          disabled={!answer.trim() || loading}
          style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#4f6ef7,#7c3aed)', color: 'white', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: !answer.trim() || loading ? 'not-allowed' : 'pointer', opacity: !answer.trim() || loading ? 0.5 : 1, transition: 'all 0.2s' }}
        >
          {loading ? '⏳ Correction...' : '✅ Soumettre & Corriger'}
        </button>
        <button onClick={() => setShowHint(!showHint)}
          style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(245,200,66,0.3)', background: 'rgba(245,200,66,0.08)', color: 'var(--gold)', cursor: 'pointer', fontSize: 14, transition: 'all 0.2s' }}>
          💡 Indice
        </button>
      </div>
    </div>
  )
}
