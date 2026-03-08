'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/bac', label: 'Bac Tunisie' },
  { href: '/universite', label: 'Université' },
  { href: '/examens', label: 'Examens' },
  { href: '/solve', label: 'Solveur' },
  { href: '/chat', label: 'Chat IA' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px clamp(20px,5vw,60px)',
        background: scrolled ? 'rgba(7,8,15,0.95)' : 'rgba(7,8,15,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(79,110,247,0.15)',
        transition: 'background 0.3s',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:800, fontSize:20, color:'var(--text)' }}>
          <div style={{ width:36, height:36, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>∑</div>
          Math<span style={{ color:'var(--accent)' }}>AI</span> Coach
        </Link>

        {/* Desktop links */}
        <div style={{ display:'flex', gap:28, alignItems:'center' }} className="nav-desktop">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} style={{
              color: pathname.startsWith(l.href) ? 'var(--text)' : 'var(--muted)',
              textDecoration:'none', fontSize:14, fontWeight:500, transition:'color 0.2s',
              borderBottom: pathname.startsWith(l.href) ? '2px solid var(--accent)' : '2px solid transparent',
              paddingBottom: 2,
            }}>{l.label}</Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display:'flex', gap:10, alignItems:'center' }} className="nav-desktop">
          <Link href="/auth/login" className="btn btn-ghost btn-sm">Connexion</Link>
          <Link href="/auth/register" className="btn btn-primary btn-sm">Commencer →</Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="nav-mobile" style={{ background:'none', border:'none', cursor:'pointer', padding:8, display:'none' }}
          aria-label="Menu">
          <div style={{ width:22, height:2, background:'var(--text)', marginBottom:5, transition:'all 0.3s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <div style={{ width:22, height:2, background:'var(--text)', marginBottom:5, opacity: open ? 0 : 1 }} />
          <div style={{ width:22, height:2, background:'var(--text)', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none', transition:'all 0.3s' }} />
        </button>

        <style>{`
          @media(max-width:900px){ .nav-desktop{display:none!important;} .nav-mobile{display:block!important;} }
        `}</style>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'fixed', top:73, left:0, right:0, zIndex:99,
          background:'rgba(7,8,15,0.98)', backdropFilter:'blur(20px)',
          borderBottom:'1px solid rgba(79,110,247,0.15)',
          padding:20, display:'flex', flexDirection:'column', gap:4,
          animation:'fadeInDown 0.2s ease both',
        }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display:'block', padding:'12px 16px', borderRadius:10,
              color: pathname.startsWith(l.href) ? 'var(--accent)' : 'var(--text)',
              textDecoration:'none', fontSize:15, fontWeight:500,
              background: pathname.startsWith(l.href) ? 'rgba(79,110,247,0.08)' : 'transparent',
            }}>{l.label}</Link>
          ))}
          <div style={{ height:1, background:'rgba(255,255,255,0.06)', margin:'8px 0' }} />
          <Link href="/auth/login" onClick={() => setOpen(false)} style={{ display:'block', padding:'12px 16px', borderRadius:10, color:'var(--text2)', textDecoration:'none', fontSize:15 }}>Connexion</Link>
          <Link href="/auth/register" onClick={() => setOpen(false)} style={{ display:'block', padding:'12px 16px', borderRadius:10, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', color:'white', textDecoration:'none', fontSize:15, fontWeight:600, textAlign:'center' }}>Commencer gratuitement</Link>
        </div>
      )}
    </>
  )
}
