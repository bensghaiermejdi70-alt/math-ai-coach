'use client'

interface DayData { day: string; exercises: number; score: number }

interface WeeklyChartProps { data?: DayData[] }

const DEFAULT_DATA: DayData[] = [
  { day: 'Lun', exercises: 5, score: 72 },
  { day: 'Mar', exercises: 8, score: 85 },
  { day: 'Mer', exercises: 3, score: 60 },
  { day: 'Jeu', exercises: 10, score: 91 },
  { day: 'Ven', exercises: 7, score: 78 },
  { day: 'Sam', exercises: 12, score: 88 },
  { day: 'Dim', exercises: 4, score: 65 },
]

export default function WeeklyChart({ data = DEFAULT_DATA }: WeeklyChartProps) {
  const maxEx = Math.max(...data.map(d => d.exercises))

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, height: 120, marginBottom: 8 }}>
        {data.map((d, i) => (
          <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {/* Score label */}
            <div style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{d.score}%</div>
            {/* Bar */}
            <div style={{ width: '100%', background: 'var(--surface2)', borderRadius: '6px 6px 0 0', height: 80, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                width: '100%',
                height: `${(d.exercises / maxEx) * 100}%`,
                background: `linear-gradient(180deg, ${d.score >= 80 ? 'var(--teal)' : d.score >= 60 ? 'var(--accent)' : 'var(--gold)'}, ${d.score >= 80 ? '#059669' : d.score >= 60 ? 'var(--accent2)' : 'var(--orange)'})`,
                borderRadius: '4px 4px 0 0',
                transition: 'height 1s ease',
                minHeight: 4,
              }} />
            </div>
          </div>
        ))}
      </div>
      {/* Day labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {data.map(d => (
          <div key={d.day} style={{ flex: 1, textAlign: 'center', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{d.day}</div>
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginTop: 14, justifyContent: 'center' }}>
        {[['var(--teal)', '≥80% — Excellent'],['var(--accent)','60-80% — Bien'],['var(--gold)','<60% — À améliorer']].map(([c, l]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />{l}
          </div>
        ))}
      </div>
    </div>
  )
}
