'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  Route : /bac-france/informatique/seconde
//  SNT — Sciences Numériques et Technologie
//  7 thèmes obligatoires
// ═══════════════════════════════════════════════════════════════

const THEMES = [
  {
    slug: 'internet',
    num: 'TH 01', icon: '🌐', titre: 'Internet',
    color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.22)',
    desc: 'Fonctionnement d\'Internet, architecture réseau, protocoles de communication.',
    souschap: ['DNS (nom de domaine)','Routage des données','Protocoles TCP/IP','Architecture client/serveur'],
    objectif: 'Comprendre comment Internet fonctionne',
    nbEx: 4,
  },
  {
    slug: 'web',
    num: 'TH 02', icon: '🕸️', titre: 'Le Web',
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.22)',
    desc: 'Fonctionnement du Web, langages HTML/CSS, moteurs de recherche.',
    souschap: ['HTML / CSS','URL et hyperliens','Moteurs de recherche','Navigateur web'],
    objectif: 'Créer une page web simple',
    nbEx: 5,
  },
  {
    slug: 'reseaux-sociaux',
    num: 'TH 03', icon: '👥', titre: 'Réseaux sociaux',
    color: '#ec4899', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.22)',
    desc: 'Fonctionnement des réseaux sociaux, graphes, algorithmes de recommandation.',
    souschap: ['Graphes sociaux','Communautés en ligne','Algorithmes de recommandation','Cyberharcèlement & dangers'],
    objectif: 'Analyser les enjeux des réseaux sociaux',
    nbEx: 4,
  },
  {
    slug: 'donnees',
    num: 'TH 04', icon: '🗄️', titre: 'Données structurées',
    color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)',
    desc: 'Données numériques, bases de données, vie privée et RGPD.',
    souschap: ['Bases de données','Tables et attributs','Traitement des données','Vie privée & RGPD'],
    objectif: 'Comprendre comment les données sont structurées et protégées',
    nbEx: 5,
  },
  {
    slug: 'geolocalisation',
    num: 'TH 05', icon: '📍', titre: 'Géolocalisation',
    color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)',
    desc: 'Fonctionnement du GPS, triangulation, satellites, applications cartographiques.',
    souschap: ['Triangulation GPS','Réseau de satellites','Applications (Maps)','Vie privée & localisation'],
    objectif: 'Comprendre comment fonctionne la localisation géographique',
    nbEx: 3,
  },
  {
    slug: 'photographie',
    num: 'TH 06', icon: '📷', titre: 'Photographie numérique',
    color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.22)',
    desc: 'Image numérique, pixels, couleurs RGB, résolution, traitement d\'image.',
    souschap: ['Pixels et résolution','Codage des couleurs RGB','Compression d\'image','Traitement numérique'],
    objectif: 'Comprendre la représentation numérique des images',
    nbEx: 7,
  },
  {
    slug: 'objets-connectes',
    num: 'TH 07', icon: '🤖', titre: 'Objets connectés',
    color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.22)',
    desc: 'Informatique embarquée, capteurs, objets connectés IoT, bases de l\'IA.',
    souschap: ['Capteurs et actionneurs','Objets connectés (IoT)','Intelligence artificielle (bases)','Sécurité des objets connectés'],
    objectif: 'Comprendre le fonctionnement des systèmes embarqués',
    nbEx: 4,
  },
]

function ThemeCard({ th }: { th: typeof THEMES[0] }) {
  return (
    <Link href={`/bac-france/informatique/seconde/${th.slug}`} style={{ textDecoration:'none' }}>
      <div
        style={{ padding:24, height:'100%', background:th.bg, border:`1.5px solid ${th.border}`, borderRadius:16, cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 10px 36px ${th.color}25` }}
        onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <span style={{ fontSize:26 }}>{th.icon}</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', background:'var(--surface2)', padding:'2px 7px', borderRadius:5 }}>{th.num}</span>
            <span style={{ fontSize:10, background:`${th.color}18`, color:th.color, padding:'2px 8px', borderRadius:10, fontWeight:700 }}>SNT</span>
          </div>
          <span style={{ fontSize:11, color:'var(--muted)' }}>📝 {th.nbEx} exercices</span>
        </div>

        <h3 style={{ fontSize:16, fontWeight:700, color:th.color, marginBottom:8 }}>{th.titre}</h3>
        <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6, marginBottom:12 }}>{th.desc}</p>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:10, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Sous-chapitres</div>
          <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
            {th.souschap.map(s => (
              <div key={s} style={{ display:'flex', gap:6, alignItems:'flex-start', fontSize:11, color:'var(--text2)' }}>
                <span style={{ color:th.color, flexShrink:0 }}>▸</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding:'8px 12px', background:`${th.color}10`, borderRadius:8, border:`1px solid ${th.color}20` }}>
          <span style={{ fontSize:11, color:th.color, fontWeight:600 }}>🎯 {th.objectif}</span>
        </div>

        <div style={{ display:'flex', justifyContent:'flex-end', marginTop:12 }}>
          <span style={{ fontSize:12, color:th.color, fontWeight:600 }}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

export default function BacFranceInfoSeconePage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac France</Link>
          <span>›</span>
          <Link href="/bac-france/informatique" style={{ color:'var(--muted)', textDecoration:'none' }}>Informatique</Link>
          <span>›</span>
          <span style={{ color:'#06b6d4', fontWeight:600 }}>📘 Seconde — SNT</span>
        </div>

        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:44 }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
              <span style={{ background:'rgba(6,182,212,0.15)', color:'#22d3ee', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700 }}>SNT</span>
              <span style={{ background:'rgba(6,182,212,0.1)', color:'#22d3ee', fontSize:10, fontWeight:800, padding:'3px 12px', borderRadius:20 }}>OBLIGATOIRE · SECONDE</span>
            </div>
            <h1 style={{ fontSize:'clamp(24px,4vw,42px)', marginBottom:10 }}>
              📘 Sciences Numériques et Technologie<br/>
              <span style={{ background:'linear-gradient(90deg,#06b6d4,#8b5cf6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                7 thèmes numériques · Seconde 2026
              </span>
            </h1>
            <p style={{ maxWidth:660, color:'var(--text2)', marginBottom:16, lineHeight:1.7 }}>
              Matière obligatoire pour tous les élèves de Seconde — <strong style={{ color:'#22d3ee' }}>1h30 par semaine</strong>.
              Culture numérique générale : Internet, Web, données, réseaux sociaux, GPS, image et objets connectés.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:48 }}>
            {[
              { num:'7', label:'Thèmes', icon:'📚' },
              { num:'1h30', label:'Par semaine', icon:'⏱️' },
              { num:'32', label:'Exercices', icon:'📝' },
              { num:'100%', label:'Obligatoire', icon:'✅' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:20 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:24, color:'#06b6d4' }}>{s.num}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Thèmes */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:18, marginBottom:52 }}>
            {THEMES.map(th => <ThemeCard key={th.slug} th={th} />)}
          </div>

          {/* Navigation */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/bac-france/informatique" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              ← Retour Informatique
            </Link>
            <Link href="/bac-france/informatique/premiere" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.3)', borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13, color:'#a78bfa', textDecoration:'none' }}>
              📗 Première NSI →
            </Link>
            <Link href="/chat" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
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