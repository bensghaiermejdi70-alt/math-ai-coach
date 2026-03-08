'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItem { label: string; href: string; icon: string; sub?: { label: string; href: string }[] }

interface SidebarProps { items: SidebarItem[]; title: string; titleIcon: string }

export default function Sidebar({ items, title, titleIcon }: SidebarProps) {
  const pathname = usePathname()
  return (
    <aside style={{
      width: 260, background: 'rgba(11,14,27,0.95)', backdropFilter:'blur(20px)',
      borderRight: '1px solid rgba(79,110,247,0.12)',
      height:'100vh', position:'sticky', top:0,
      overflowY:'auto', padding:'80px 0 24px',
      display:'flex', flexDirection:'column',
    }}>
      <div style={{ padding:'0 20px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)', marginBottom:12 }}>
        <span style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--muted)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{titleIcon} {title}</span>
      </div>
      <nav style={{ flex:1, padding:'0 12px' }}>
        {items.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <div key={item.href} style={{ marginBottom:2 }}>
              <Link href={item.href} style={{
                display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
                borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:500,
                color: active ? 'var(--text)' : 'var(--muted)',
                background: active ? 'rgba(79,110,247,0.12)' : 'transparent',
                borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
                transition:'all 0.2s',
              }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
              {item.sub && active && (
                <div style={{ marginLeft:22, marginTop:2 }}>
                  {item.sub.map(s => (
                    <Link key={s.href} href={s.href} style={{
                      display:'block', padding:'7px 12px', borderRadius:8,
                      textDecoration:'none', fontSize:13,
                      color: pathname === s.href ? 'var(--accent)' : 'var(--muted)',
                      background: pathname === s.href ? 'rgba(79,110,247,0.08)' : 'transparent',
                      transition:'color 0.2s',
                    }}>{s.label}</Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
