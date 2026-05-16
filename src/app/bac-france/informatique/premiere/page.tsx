'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  Route : /bac-france/informatique/premiere
//  NSI Première — 8 chapitres + Projet
// ═══════════════════════════════════════════════════════════════

const CHAPITRES = [
  {
    slug: 'histoire-informatique',
    num: 'CH 01', icon: '🏛️', titre: 'Histoire de l\'informatique',
    color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.22)',
    desc: 'Évolution des ordinateurs, grandes figures de l\'informatique, architecture Von Neumann.',
    souschap: ['Machines anciennes (Pascaline, Babbage)','Alan Turing & machine de Turing','Architecture Von Neumann','Langages de programmation historiques'],
    nbEx: 3,
  },
  {
    slug: 'representation-donnees',
    num: 'CH 02', icon: '🔢', titre: 'Représentation des données',
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.22)',
    desc: 'Types de données en Python, codage binaire, texte ASCII et Unicode.',
    souschap: ['Types simples : entier, réel, booléen','Types construits : listes, dictionnaires, tuples','Codage binaire et hexadécimal','Texte : ASCII et Unicode (UTF-8)'],
    nbEx: 6,
  },
  {
    slug: 'traitement-donnees',
    num: 'CH 03', icon: '📊', titre: 'Traitement des données',
    color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)',
    desc: 'Manipulation de tables de données, tri, filtrage et recherche.',
    souschap: ['Tables de données (CSV)','Tri de tables','Filtrage par critères','Recherche dans une table','Fusion de tables'],
    nbEx: 6,
  },
  {
    slug: 'web-interaction',
    num: 'CH 04', icon: '🌐', titre: 'Web & interaction',
    color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)',
    desc: 'Protocole HTTP, architecture client/serveur, formulaires HTML.',
    souschap: ['Protocole HTTP / HTTPS','Architecture client / serveur','Formulaires HTML','Traitement côté serveur','Cookies et sessions'],
    nbEx: 6,
  },
  {
    slug: 'architecture-os',
    num: 'CH 05', icon: '⚙️', titre: 'Architecture & Systèmes d\'exploitation',
    color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.22)',
    desc: 'Fonctionnement d\'un ordinateur, CPU, mémoire, processus, système de fichiers.',
    souschap: ['CPU et mémoire (RAM/ROM)','Systèmes d\'exploitation','Processus et multitâche','Système de fichiers','Ligne de commande'],
    nbEx: 7,
  },
  {
    slug: 'langages-programmation',
    num: 'CH 06', icon: '🐍', titre: 'Langages & Programmation Python',
    color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.22)',
    desc: 'Programmation Python : variables, conditions, boucles, fonctions.',
    souschap: ['Variables et types','Conditions (if/elif/else)','Boucles (for, while)','Fonctions et paramètres','Modules et bibliothèques'],
    nbEx: 6,
  },
  {
    slug: 'algorithmique',
    num: 'CH 07', icon: '🧮', titre: 'Algorithmique',
    color: '#ec4899', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.22)',
    desc: 'Algorithmes de recherche et de tri, complexité, logique algorithmique.',
    souschap: ['Recherche séquentielle O(n)','Recherche dichotomique O(log n)','Tri par sélection O(n²)','Tri par insertion O(n²)','Notion de complexité'],
    nbEx: 5,
  },
  {
    slug: 'projet',
    num: 'CH 08', icon: '🚀', titre: 'Projet informatique',
    color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)',
    desc: 'Mini-projet : créer une application ou un site web en groupe.',
    souschap: ['Cahier des charges','Développement en groupe','Application web ou Python','Présentation orale','Documentation'],
    nbEx: 2,
    badge: '🔥 Important',
  },
]

export default function BacFranceInfoPremierePage() {
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
          <span style={{ color:'#8b5cf6', fontWeight:600 }}>📗 Première — NSI</span>
        </div>

        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:44 }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
              <span style={{ background:'rgba(139,92,246,0.15)', color:'#a78bfa', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700 }}>NSI</span>
              <span style={{ background:'rgba(139,92,246,0.1)', color:'#a78bfa', fontSize:10, fontWeight:800, padding:'3px 12px', borderRadius:20 }}>SPÉCIALITÉ · PREMIÈRE · 4H/SEMAINE</span>
            </div>
            <h1 style={{ fontSize:'clamp(24px,4vw,42px)', marginBottom:10 }}>
              📗 Numérique & Sciences Informatiques<br/>
              <span style={{ background:'linear-gradient(90deg,#8b5cf6,#10b981)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Première NSI 2026 — 8 chapitres
              </span>
            </h1>
            <p style={{ maxWidth:660, color:'var(--text2)', marginBottom:16, lineHeight:1.7 }}>
              Spécialité choisie — <strong style={{ color:'#a78bfa' }}>4h par semaine</strong>.
              Introduction à la programmation Python, aux algorithmes, aux bases de données et à l'architecture des ordinateurs.
              Épreuve anticipée en Première.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:48 }}>
            {[
              { num:'8', label:'Chapitres', icon:'📚' },
              { num:'4h', label:'Par semaine', icon:'⏱️' },
              { num:'41', label:'Exercices', icon:'📝' },
              { num:'🐍', label:'Python', icon:'🐍' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:20 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:24, color:'#8b5cf6' }}>{s.num}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Chapitres */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:18, marginBottom:52 }}>
            {CHAPITRES.map(ch => (
              <Link key={ch.slug} href={`/bac-france/informatique/premiere/${ch.slug}`} style={{ textDecoration:'none' }}>
                <div
                  style={{ padding:24, background:ch.bg, border:`1.5px solid ${ch.border}`, borderRadius:16, cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', height:'100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 10px 36px ${ch.color}25` }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='' }}>

                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      <span style={{ fontSize:26 }}>{ch.icon}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', background:'var(--surface2)', padding:'2px 7px', borderRadius:5 }}>{ch.num}</span>
                      {ch.badge && <span style={{ fontSize:10, background:'rgba(245,158,11,0.15)', color:'#f59e0b', padding:'2px 8px', borderRadius:10, fontWeight:700 }}>{ch.badge}</span>}
                    </div>
                    <span style={{ fontSize:11, color:'var(--muted)' }}>📝 {ch.nbEx}</span>
                  </div>

                  <h3 style={{ fontSize:15, fontWeight:700, color:ch.color, marginBottom:8 }}>{ch.titre}</h3>
                  <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6, marginBottom:12 }}>{ch.desc}</p>

                  <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
                    {ch.souschap.map(s => (
                      <div key={s} style={{ display:'flex', gap:6, alignItems:'flex-start', fontSize:11, color:'var(--text2)' }}>
                        <span style={{ color:ch.color, flexShrink:0 }}>▸</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display:'flex', justifyContent:'flex-end', marginTop:12 }}>
                    <span style={{ fontSize:12, color:ch.color, fontWeight:600 }}>Ouvrir →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/bac-france/informatique/seconde" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              ← Seconde SNT
            </Link>
            <Link href="/bac-france/informatique/terminale" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.3)', borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13, color:'#fbbf24', textDecoration:'none' }}>
              🎓 Terminale NSI →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:700px){div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </>
  )
}