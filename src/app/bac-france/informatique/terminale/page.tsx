'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  Route : /bac-france/informatique/terminale
//  NSI Terminale — 6 domaines + Projet
// ═══════════════════════════════════════════════════════════════

const DOMAINES = [
  {
    slug: 'structures-donnees',
    num: '01', icon: '🌳', titre: 'Structures de données',
    color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.22)',
    badge: '',
    desc: 'Listes, piles, files, arbres binaires, graphes — structures avancées et leur implémentation.',
    souschap: [
      'Listes et tableaux (complexité O(1), O(n))',
      'Piles (LIFO) : push, pop — gestion parenthèses, undo',
      'Files (FIFO) : enqueue, dequeue — collections.deque',
      'Arbres binaires : racine, feuilles, parcours préfixe/infixe/postfixe',
      'ABR (Arbre Binaire de Recherche) : insertion et recherche',
      'Graphes : sommets, arêtes, orienté/non orienté, DFS/BFS',
    ],
    nbEx: 5,
  },
  {
    slug: 'algorithmes-avances',
    num: '02', icon: '🧮', titre: 'Algorithmes avancés',
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.22)',
    badge: '🔥 Top Bac',
    desc: 'Recherche, tri avancé, parcours de graphes, complexité Big-O.',
    souschap: [
      'Recherche dichotomique O(log n) dans tableau trié',
      'Tri par insertion O(n²)',
      'Tri fusion (merge sort) — diviser pour régner O(n log n)',
      'Tri rapide (quicksort) — pivot et performance',
      'Parcours DFS (profondeur) et BFS (largeur)',
      'Algorithme de Dijkstra (plus court chemin — concept)',
      'Complexité : O(1), O(n), O(log n), O(n²)',
    ],
    nbEx: 6,
  },
  {
    slug: 'bases-donnees',
    num: '03', icon: '🗄️', titre: 'Bases de données SQL',
    color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)',
    badge: '🔥 Top Bac',
    desc: 'Modèle relationnel, requêtes SQL avancées, jointures, agrégation, normalisation.',
    souschap: [
      'Modèle relationnel : table, attribut, clé primaire, clé étrangère',
      'SELECT, WHERE, ORDER BY, DISTINCT',
      'JOIN : INNER JOIN, LEFT JOIN',
      'GROUP BY, HAVING, agrégation COUNT/AVG/SUM/MAX/MIN',
      'Sous-requêtes imbriquées',
      'Intégrité des données et contraintes',
      'Normalisation : 1NF, 2NF, 3NF (concept général)',
    ],
    nbEx: 6,
  },
  {
    slug: 'programmation-avancee',
    num: '04', icon: '🐍', titre: 'Programmation avancée Python',
    color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)',
    badge: '🔥 Top Bac',
    desc: 'Récursivité, programmation orientée objet (POO), modularité, débogage.',
    souschap: [
      'Fonctions avancées : paramètres, valeurs de retour, portée',
      'Récursivité : factorielle, Fibonacci, Hanoï',
      'Classes et objets : attributs, méthodes, __init__',
      'Encapsulation, héritage, polymorphisme',
      'Modularité : fichiers Python, import, packages',
      'Débogage : erreurs de syntaxe, logique, exceptions',
    ],
    nbEx: 6,
  },
  {
    slug: 'architecture-reseaux',
    num: '05', icon: '⚙️', titre: 'Architecture, OS & Réseaux',
    color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.22)',
    badge: '',
    desc: 'Modèle Von Neumann, processus, ordonnancement, Internet, TCP/IP, HTTP.',
    souschap: [
      'Architecture Von Neumann : CPU (ALU + contrôle), mémoire',
      'Systèmes d\'exploitation : processus, multitâche',
      'Ordonnancement CPU',
      'Système de fichiers : organisation des données',
      'Internet : TCP/IP, adressage IP, routage',
      'Web : HTTP/HTTPS, client/serveur, échanges',
    ],
    nbEx: 5,
  },
  {
    slug: 'enjeux-numerique',
    num: '06', icon: '🌍', titre: 'Enjeux du numérique',
    color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.22)',
    badge: '',
    desc: 'Données personnelles, cybersécurité, intelligence artificielle, société numérique.',
    souschap: [
      'Données personnelles et RGPD',
      'Cybersécurité : attaques, phishing, protection',
      'Intelligence artificielle : bases et impacts',
      'Réseaux sociaux et influence algorithmique',
      'Enjeux éthiques du numérique',
    ],
    nbEx: 5,
  },
  {
    slug: 'projet-nsi',
    num: '07', icon: '🚀', titre: 'Projet NSI',
    color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)',
    badge: '🔥 OBLIGATOIRE',
    desc: 'Projet ambitieux en groupe : créer une application ou un programme complet.',
    souschap: [
      'Conception et cahier des charges',
      'Développement en équipe (GitHub)',
      'Application web / Python / jeu',
      'Tests et débogage',
      'Présentation orale et soutenance',
    ],
    nbEx: 2,
  },
]

export default function BacFranceInfoTerminalePage() {
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
          <span style={{ color:'#f59e0b', fontWeight:600 }}>🎓 Terminale — NSI</span>
        </div>

        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>

          {/* Header */}
          <div style={{ marginBottom:44 }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
              <span style={{ background:'rgba(245,158,11,0.15)', color:'#fbbf24', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700 }}>NSI TERMINALE</span>
              <span style={{ background:'rgba(245,158,11,0.1)', color:'#fbbf24', fontSize:10, fontWeight:800, padding:'3px 12px', borderRadius:20 }}>SPÉCIALITÉ · 6H/SEMAINE · COEF. 16</span>
            </div>
            <h1 style={{ fontSize:'clamp(24px,4vw,42px)', marginBottom:10 }}>
              🎓 NSI Terminale — Algorithmique avancée<br/>
              <span style={{ background:'linear-gradient(90deg,#f59e0b,#8b5cf6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Graphes · SQL · POO · Python avancé
              </span>
            </h1>
            <p style={{ maxWidth:680, color:'var(--text2)', marginBottom:16, lineHeight:1.7 }}>
              Spécialité de haut niveau — <strong style={{ color:'#fbbf24' }}>6h par semaine · Coef. 16</strong>.
              Algorithmique avancée, structures de données, bases de données SQL, programmation orientée objet.
              Examen : Écrit (algorithmes/SQL/Python) + Pratique (coder).
            </p>
            {/* Top 5 à maîtriser */}
            <div style={{ background:'rgba(239,68,68,0.07)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:12, padding:'12px 18px', display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
              <span style={{ fontSize:13, color:'#ef4444', fontWeight:700 }}>🔥 Top 5 à maîtriser :</span>
              {['Graphes (DFS/BFS)','SQL JOIN','Récursivité','Complexité Big-O','POO (classes)'].map(t => (
                <span key={t} style={{ fontSize:11, background:'rgba(239,68,68,0.1)', color:'#ef4444', padding:'3px 10px', borderRadius:10, fontWeight:600 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:48 }}>
            {[
              { num:'7', label:'Domaines', icon:'📚' },
              { num:'6h', label:'Par semaine', icon:'⏱️' },
              { num:'35', label:'Exercices', icon:'📝' },
              { num:'16', label:'Coefficient', icon:'⭐' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign:'center', padding:20 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:24, color:'#f59e0b' }}>{s.num}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Domaines */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(330px,1fr))', gap:18, marginBottom:52 }}>
            {DOMAINES.map(d => (
              <Link key={d.slug} href={`/bac-france/informatique/terminale/${d.slug}`} style={{ textDecoration:'none' }}>
                <div
                  style={{ padding:24, background:d.bg, border:`1.5px solid ${d.border}`, borderRadius:16, cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', height:'100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 10px 36px ${d.color}25` }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='' }}>

                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      <span style={{ fontSize:26 }}>{d.icon}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', background:'var(--surface2)', padding:'2px 7px', borderRadius:5 }}>D {d.num}</span>
                      {d.badge && <span style={{ fontSize:10, background:'rgba(245,158,11,0.15)', color:'#f59e0b', padding:'2px 8px', borderRadius:10, fontWeight:700 }}>{d.badge}</span>}
                    </div>
                    <span style={{ fontSize:11, color:'var(--muted)' }}>📝 {d.nbEx}</span>
                  </div>

                  <h3 style={{ fontSize:15, fontWeight:700, color:d.color, marginBottom:8 }}>{d.titre}</h3>
                  <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6, marginBottom:12 }}>{d.desc}</p>

                  <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
                    {d.souschap.slice(0,4).map(s => (
                      <div key={s} style={{ display:'flex', gap:6, alignItems:'flex-start', fontSize:11, color:'var(--text2)' }}>
                        <span style={{ color:d.color, flexShrink:0 }}>▸</span>
                        <span>{s}</span>
                      </div>
                    ))}
                    {d.souschap.length > 4 && (
                      <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>+{d.souschap.length - 4} sous-chapitres</div>
                    )}
                  </div>

                  <div style={{ display:'flex', justifyContent:'flex-end', marginTop:12 }}>
                    <span style={{ fontSize:12, color:d.color, fontWeight:600 }}>Ouvrir →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Examen BAC NSI */}
          <div style={{ background:'rgba(99,102,241,0.07)', border:'1px solid rgba(99,102,241,0.2)', borderRadius:16, padding:'20px 24px', marginBottom:32 }}>
            <div style={{ fontWeight:700, fontSize:14, color:'#818cf8', marginBottom:12 }}>🎯 Examen BAC NSI 2026</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div style={{ background:'rgba(0,0,0,0.15)', borderRadius:10, padding:'14px 16px' }}>
                <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:8 }}>✍️ Épreuve écrite (3h30)</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {['Algorithmes et structures de données','SQL et bases de données','Programmation Python','Théorie informatique'].map(t => (
                    <div key={t} style={{ fontSize:11, color:'var(--text2)', display:'flex', gap:6 }}>
                      <span style={{ color:'#818cf8' }}>▸</span>{t}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background:'rgba(0,0,0,0.15)', borderRadius:10, padding:'14px 16px' }}>
                <div style={{ fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:8 }}>💻 Épreuve pratique (1h)</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {['Coder un algorithme','Compléter un programme Python','Déboguer du code','Manipuler des données'].map(t => (
                    <div key={t} style={{ fontSize:11, color:'var(--text2)', display:'flex', gap:6 }}>
                      <span style={{ color:'#10b981' }}>▸</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/bac-france/informatique/premiere" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              ← Première NSI
            </Link>
            <Link href="/chat" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13, color:'var(--muted)', textDecoration:'none' }}>
              🤖 Chat IA →
            </Link>
            <Link href="/solve" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.3)', borderRadius:12, fontFamily:'var(--font-body)', fontWeight:600, fontSize:13, color:'#818cf8', textDecoration:'none' }}>
              🧮 Solveur IA →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:700px){div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}div[style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}