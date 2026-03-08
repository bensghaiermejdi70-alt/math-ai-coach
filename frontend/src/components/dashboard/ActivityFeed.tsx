interface ActivityItem { icon: string; title: string; subtitle: string; time: string; color?: string }

interface ActivityFeedProps { items: ActivityItem[]; maxItems?: number }

export default function ActivityFeed({ items, maxItems = 8 }: ActivityFeedProps) {
  const shown = items.slice(0, maxItems)
  return (
    <div>
      {shown.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: i < shown.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'flex-start' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: item.color ? `${item.color}18` : 'rgba(79,110,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.subtitle}</div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{item.time}</div>
        </div>
      ))}
      {items.length > maxItems && (
        <button style={{ width: '100%', marginTop: 12, padding: '8px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}>
          Voir tout l'historique ({items.length - maxItems} de plus)
        </button>
      )}
    </div>
  )
}