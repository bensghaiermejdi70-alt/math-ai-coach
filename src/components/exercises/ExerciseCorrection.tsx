'use client'
import StepByStep from '../ui/StepByStep'

interface Step { label: string; math: string; note?: string }

interface ExerciseCorrectionProps {
  studentAnswer: string
  correctAnswer: string
  steps: Step[]
  score: number   // 0-100
  feedback: string
  isCorrect: boolean
}

export default function ExerciseCorrection({ studentAnswer, correctAnswer, steps, score, feedback, isCorrect }: ExerciseCorrectionProps) {
  const color = score >= 80 ? 'var(--teal)' : score >= 50 ? 'var(--gold)' : 'var(--red)'
  const emoji = score >= 80 ? '🎉' : score >= 50 ? '👍' : '📚'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeInUp 0.4s ease both' }}>

      {/* Score banner */}
      <div style={{ background: isCorrect ? 'rgba(6,214,160,0.08)' : score >= 50 ? 'rgba(245,200,66,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${color}30`, borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, marginBottom: 4 }}>{emoji} {isCorrect ? 'Excellent !' : score >= 50 ? 'Bien essayé !' : 'À retravailler'}</div>
          <div style={{ fontSize: 14, color: 'var(--text2)' }}>{feedback}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 42, color }}>{score}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>/ 100</div>
        </div>
      </div>

      {/* Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Ta réponse</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: isCorrect ? 'var(--teal)' : 'var(--red)', lineHeight: 1.7 }}>{studentAnswer || '(vide)'}</div>
        </div>
        <div style={{ background: 'rgba(6,214,160,0.06)', border: '1px solid rgba(6,214,160,0.2)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--teal)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Réponse correcte</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--teal)', lineHeight: 1.7 }}>{correctAnswer}</div>
        </div>
      </div>

      {/* Correction détaillée */}
      {steps.length > 0 && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>📋 Correction détaillée</div>
          <StepByStep steps={steps} result={correctAnswer} />
        </div>
      )}

      {/* Next actions */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn btn-primary btn-sm">📝 Exercice suivant</button>
        <button className="btn btn-secondary btn-sm">🔄 Réessayer</button>
        <button className="btn btn-ghost btn-sm">🤖 Demander une explication</button>
      </div>
    </div>
  )
}
