'use client'

interface Step { label: string; math: string; note?: string }
interface StepByStepProps { steps: Step[]; result?: string; isLoading?: boolean }

export default function StepByStep({ steps, result, isLoading }: StepByStepProps) {
  if (isLoading) return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      {[1,2,3,4].map(i => (
        <div key={i} className="skeleton" style={{ height:60, borderRadius:12, animationDelay:`${i*0.1}s` }} />
      ))}
    </div>
  )

  if (!steps.length) return null

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      {steps.map((step, i) => (
        <div key={i} className="step-card" style={{ animation:`fadeInUp 0.4s ease ${i * 0.12}s both` }}>
          <div className="step-num">{i + 1}</div>
          <div className="step-body">
            <div className="step-label">{step.label}</div>
            <div className="step-math">{step.math}</div>
            {step.note && <div style={{ fontSize:12, color:'var(--muted)', marginTop:4, fontStyle:'italic' }}>{step.note}</div>}
          </div>
        </div>
      ))}
      {result && (
        <div style={{
          display:'flex', alignItems:'center', gap:14,
          background:'rgba(6,214,160,0.08)', border:'1px solid rgba(6,214,160,0.25)',
          borderRadius:12, padding:'14px 18px',
          animation:'fadeInUp 0.4s ease both',
        }}>
          <span style={{ fontSize:22 }}>✓</span>
          <div>
            <div style={{ fontSize:10, color:'var(--teal)', fontFamily:'var(--font-mono)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:2 }}>Solution</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:17, color:'var(--teal)', fontWeight:500 }}>{result}</div>
          </div>
        </div>
      )}
    </div>
  )
}
