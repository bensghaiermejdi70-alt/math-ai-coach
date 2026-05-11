'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════
//  Page index — TIC Commun (Maths · Sc.Exp · Sc.Tech · Éco)
//  Route : /bac/info/autres-sections
//  4 thèmes : Internet · Web · Systèmes · Sécurité
// ══════════════════════════════════════════════════════════════

const THEMES = [
  {
    slug: 'internet-reseaux',
    ch: 'TH 01', icon: '🌐', titre: 'Internet & Réseaux',
    badge: 'TIC', color: '#06d6a0', bg: 'rgba(6,214,160,0.08)', border: 'rgba(6,214,160,0.2)',
    desc: "LAN / WAN · Internet · Protocoles HTTP/TCP/IP/DNS · Adressage IP · Routage · FAI.",
    nbThm: 3, nbEx: 1,
    sections: ['Sc. Maths', 'Sc. Exp', 'Sc. Tech', 'Éco-Gestion'],
  },
  {
    slug: 'web-html-css-js',
    ch: 'TH 02', icon: '💡', titre: 'Web — HTML / CSS / JavaScript',
    badge: 'TIC', color: '#4f6ef7', bg: 'rgba(79,110,247,0.08)', border: 'rgba(79,110,247,0.2)',
    desc: "Structure HTML · Balises sémantiques · CSS sélecteurs & propriétés · JavaScript bases (variables, fonctions, événements).",
    nbThm: 4, nbEx: 1,
    sections: ['Sc. Maths', 'Sc. Exp', 'Sc. Tech', 'Éco-Gestion'],
  },
  {
    slug: 'systemes-informatiques',
    ch: 'TH 03', icon: '🖥️', titre: 'Systèmes informatiques',
    badge: 'TIC', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)',
    desc: "Hardware (CPU, RAM, ROM, stockage, périphériques) · Software (OS, applications) · Architecture Von Neumann · Numération binaire.",
    nbThm: 3, nbEx: 1,
    sections: ['Sc. Maths', 'Sc. Exp', 'Sc. Tech', 'Éco-Gestion'],
  },
  {
    slug: 'securite-informatique',
    ch: 'TH 04', icon: '🔒', titre: 'Sécurité informatique',
    badge: 'TIC', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)',
    desc: "Virus · Ransomware · Phishing · Antivirus · Pare-feu · Chiffrement HTTPS · Données personnelles · RGPD.",
    nbThm: 3, nbEx: 1,
    sections: ['Sc. Maths', 'Sc. Exp', 'Sc. Tech', 'Éco-Gestion'],
  },
]

function ThemeCard({ th }: { th: typeof THEMES[0] }) {
  return (
    <Link href={`/bac/info/autres-sections/${th.slug}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 24, height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', background: th.bg, border: `1.5px solid ${th.border}` }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 32px ${th.color}25` }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 28 }}>{th.icon}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 6 }}>{th.ch}</span>
            <span style={{ fontSize: 11, background: `${th.color}20`, color: th.color, padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>{th.badge}</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{th.nbThm} concepts</span>
        </div>
        <h3 style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 8, color: th.color }}>{th.titre}</h3>
        <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 14 }}>{th.desc}</p>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
          {th.sections.map(s => (
            <span key={s} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: `${th.color}12`, color: th.color, fontWeight: 600 }}>{s}</span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>📝 {th.nbEx} exercice</span>
          <span style={{ fontSize: 12, color: th.color, fontWeight: 600 }}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

export default function AutresSectionsIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link>
          <span>›</span>
          <Link href="/bac/info" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Informatique</Link>
          <span>›</span>
          <span style={{ color: '#f59e0b', fontWeight: 600 }}>Sections Maths · Sc.Exp · Sc.Tech · Éco-Gestion</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Header */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>TIC COMMUN</span>
              <span style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20, letterSpacing: '0.08em' }}>4 SECTIONS</span>
            </div>
            <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 10 }}>
              🌐 TIC — Sections Maths · Sc.Exp · Sc.Tech · Éco-Gestion
            </h1>
            <p style={{ maxWidth: 680, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.7 }}>
              Programme TIC commun pour toutes les sections autres qu'Informatique —
              <strong style={{ color: '#f59e0b' }}> 4 thèmes</strong> de culture numérique et usage des technologies :
              Internet · Web · Systèmes · Sécurité.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🌐 Internet & Réseaux</span><span>·</span>
              <span>💡 Web HTML/CSS/JS</span><span>·</span>
              <span>🖥️ Systèmes</span><span>·</span>
              <span>🔒 Sécurité</span>
            </div>
          </div>

          {/* Sections chips */}
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 14, padding: '14px 20px', marginBottom: 36, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700 }}>Sections concernées :</span>
            {['Sc. Mathématiques', 'Sc. Expérimentales', 'Sc. Techniques', 'Éco-Gestion'].map(s => (
              <span key={s} style={{ fontSize: 11, padding: '3px 12px', borderRadius: 20, background: 'rgba(245,158,11,0.12)', color: '#f59e0b', fontWeight: 600 }}>{s}</span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 48 }}>
            {[{ num: '4', label: 'Thèmes', icon: '🌐' }, { num: '4', label: 'Sections', icon: '🎓' }, { num: '13+', label: 'Concepts', icon: '📚' }, { num: '4', label: 'Exercices', icon: '📝' }].map(s => (
              <div key={s.label} className="card" style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: '#f59e0b' }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Thèmes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20, marginBottom: 52 }}>
            {THEMES.map(th => <ThemeCard key={th.slug} th={th} />)}
          </div>

          {/* Comparaison avec section Info */}
          <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 16, padding: '20px 24px', marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, color: '#818cf8', fontWeight: 700, marginBottom: 4 }}>💻 Section Sciences Informatiques ?</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Programme complet : Algorithmique + Bases de données + TIC (16 chapitres)</div>
            </div>
            <Link href="/bac/info/informatique" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#6366f1,#a78bfa)', color: 'white', padding: '10px 20px', borderRadius: 11, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              Programme complet →
            </Link>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/bac/info" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>
              ← Retour Informatique
            </Link>
            <Link href="/examens" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>
              📋 Examens Bac →
            </Link>
            <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>
              🤖 Chat IA →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:700px){div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </>
  )
}
