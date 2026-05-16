'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  Route : /bac-france/informatique
//  Matière : Informatique France — SNT · NSI Première · NSI Terminale
// ═══════════════════════════════════════════════════════════════

const NIVEAUX = [
  {
    slug: 'seconde',
    icon: '📘',
    niveau: 'Seconde',
    matiere: 'SNT — Sciences Numériques et Technologie',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.09)',
    border: 'rgba(6,182,212,0.25)',
    badge: 'Obligatoire · 1h30/semaine',
    badgeColor: '#22d3ee',
    desc: 'Culture numérique générale pour tous les élèves — 7 grands thèmes du numérique.',
    chapitres: 7,
    themes: ['Internet','Web','Réseaux sociaux','Données structurées','Géolocalisation','Photo numérique','Objets connectés'],
  },
  {
    slug: 'premiere',
    icon: '📗',
    niveau: 'Première',
    matiere: 'NSI — Numérique et Sciences Informatiques',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.09)',
    border: 'rgba(139,92,246,0.25)',
    badge: 'Spécialité · 4h/semaine',
    badgeColor: '#a78bfa',
    desc: 'Introduction à la programmation Python, aux algorithmes et aux bases de données.',
    chapitres: 8,
    themes: ['Histoire de l\'informatique','Représentation des données','Traitement des données','Web & interaction','Architecture & OS','Langages & Programmation','Algorithmique','Projet'],
  },
  {
    slug: 'terminale',
    icon: '🎓',
    niveau: 'Terminale',
    matiere: 'NSI — Numérique et Sciences Informatiques',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.09)',
    border: 'rgba(245,158,11,0.25)',
    badge: 'Spécialité · 6h/semaine · Coef. 16',
    badgeColor: '#fbbf24',
    desc: 'Algorithmique avancée, structures de données, SQL avancé, POO, réseaux et cybersécurité.',
    chapitres: 7,
    themes: ['Structures de données','Algorithmes avancés','Bases de données SQL','Programmation avancée (POO)','Architecture & Réseaux','Enjeux du numérique','Projet NSI'],
  },
]

export default function BacFranceInfoIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac France</Link>
          <span>›</span>
          <span style={{ color:'#8b5cf6', fontWeight:600 }}>💻 Informatique</span>
        </div>

        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:44 }}>
            <span className="label" style={{ marginBottom:12, display:'inline-block' }}>🇫🇷 Éducation Nationale · Informatique</span>
            <h1 style={{ fontSize:'clamp(26px,4vw,46px)', marginBottom:12 }}>
              💻 Informatique France<br/>
              <span style={{ background:'linear-gradient(90deg,#8b5cf6,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                SNT · NSI Première · NSI Terminale
              </span>
            </h1>
            <p style={{ maxWidth:620, color:'var(--text2)', fontSize:14, lineHeight:1.7, marginBottom:20 }}>
              Programmes officiels MEN · Sciences Numériques et Technologie (Seconde)
              et Numérique et Sciences Informatiques (Première & Terminale).
              Cours, algorithmes, SQL, Python et exercices corrigés avec IA professeur.
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', fontSize:13, color:'var(--muted)' }}>
              <span>🏫 3 niveaux</span><span>·</span>
              <span>📚 22 chapitres</span><span>·</span>
              <span>🐍 Python · SQL · HTML</span><span>·</span>
              <span>📊 Algorithmes · Structures de données</span>
            </div>
          </div>

          {/* Info badge */}
          <div style={{ background:'rgba(139,92,246,0.07)', border:'1px solid rgba(139,92,246,0.2)', borderRadius:14, padding:'14px 20px', marginBottom:44, display:'flex', gap:12, alignItems:'flex-start', flexWrap:'wrap' }}>
            <span style={{ fontSize:20 }}>ℹ️</span>
            <div>
              <div style={{ fontWeight:700, fontSize:13, color:'#a78bfa', marginBottom:6 }}>Deux parcours distincts</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {[
                  '📘 Seconde (SNT) : culture numérique obligatoire pour tous',
                  '📗 Première & 🎓 Terminale (NSI) : spécialité choisie — algorithmique avancée',
                ].map(n => (
                  <span key={n} style={{ fontSize:11, background:'rgba(139,92,246,0.1)', color:'#a78bfa', padding:'3px 10px', borderRadius:20, border:'1px solid rgba(139,92,246,0.22)' }}>
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Niveaux */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {NIVEAUX.map(n => (
              <Link key={n.slug} href={`/bac-france/informatique/${n.slug}`} style={{ textDecoration:'none' }}>
                <div
                  style={{ background:n.bg, border:`1px solid ${n.border}`, borderRadius:20, padding:'26px 30px', transition:'transform 0.2s, box-shadow 0.2s', cursor:'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 16px 50px ${n.color}28` }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='' }}>

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16, marginBottom:20 }}>
                    <div style={{ display:'flex', gap:16, alignItems:'center' }}>
                      <span style={{ fontSize:40 }}>{n.icon}</span>
                      <div>
                        <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap', marginBottom:6 }}>
                          <h2 style={{ fontSize:22, fontWeight:900, color:'var(--text)', margin:0 }}>{n.niveau}</h2>
                          <span style={{ fontSize:11, padding:'3px 12px', borderRadius:20, background:`${n.color}22`, color:n.badgeColor, fontWeight:700 }}>{n.badge}</span>
                        </div>
                        <div style={{ fontSize:13, color:n.color, fontWeight:600, marginBottom:6 }}>{n.matiere}</div>
                        <p style={{ fontSize:13, color:'var(--muted)', margin:0 }}>{n.desc}</p>
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                      <span style={{ fontSize:12, color:'var(--muted)' }}>📚 {n.chapitres} chapitres</span>
                      <span style={{ color:n.color, fontWeight:800, fontSize:16 }}>Explorer →</span>
                    </div>
                  </div>

                  {/* Thèmes */}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                    {n.themes.map(t => (
                      <span key={t} style={{ fontSize:11, padding:'3px 10px', borderRadius:10, background:`${n.color}14`, color:'var(--text2)', border:`1px solid ${n.color}20` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA IA */}
          <div style={{ marginTop:52, background:'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(99,102,241,0.06))', border:'1px solid rgba(139,92,246,0.2)', borderRadius:18, padding:'24px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#a78bfa', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>🤖 IA · Informatique France</div>
              <h3 style={{ fontSize:17, marginBottom:4 }}>Prof IA — Python · SQL · Algorithmes</h3>
              <p style={{ fontSize:13, color:'var(--text2)', margin:0 }}>Résous des exercices NSI étape par étape · Explications en français</p>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <Link href="/solve" className="btn btn-primary" style={{ whiteSpace:'nowrap' }}>🧮 Solveur IA</Link>
              <Link href="/chat" className="btn btn-secondary" style={{ whiteSpace:'nowrap' }}>💬 Chat Prof</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}