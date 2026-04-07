'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const TOME1 = [
  { ch:'CH 01', slug:'limites', titre:'Continuité et Limites', badge:'Analyse', nbThm:16, nbEx:14, desc:'Limites finies/infinies, TVI, asymptotes, point fixe, prolongement par continuité.' },
  { ch:'CH 02', slug:'suites', titre:'Suites Réelles', badge:'Analyse', nbThm:17, nbEx:10, desc:'Suites arithmétiques/géométriques, convergence, suite monotone bornée, suites adjacentes, récurrentes.' },
  { ch:'CH 03', slug:'derivabilite', titre:'Dérivabilité', badge:'Analyse', nbThm:13, nbEx:10, desc:'Dérivées usuelles, règles, Rolle, TAF, convexité, règle de L\'Hôpital.' },
  { ch:'CH 04', slug:'fonctions-reciproques', titre:'Fonctions réciproques', badge:'Analyse', nbThm:12, nbEx:8, desc:'Bijections, réciproque, arcsin, arccos, arctan, dérivées des réciproques.' },
  { ch:'CH 05', slug:'primitives', titre:'Primitives et Intégrales', badge:'Analyse', nbThm:13, nbEx:10, desc:'Primitives usuelles, intégrale de Riemann, IPP, changement de variable, aires.' },
]

const TOME2 = [
  { ch:'CH 01', slug:'complexes', titre:'Nombres Complexes', badge:'Algèbre', nbThm:14, nbEx:10, desc:'Formes algébrique/trig/expo, module, argument, Moivre, racines n-ièmes, géométrie complexe.' },
  { ch:'CH 02', slug:'isometries', titre:'Isométries du plan', badge:'Géométrie', nbThm:10, nbEx:6, desc:'Déplacements, translations, rotations, symétries axiales. Classification directes/indirectes.' },
  { ch:'CH 03', slug:'deplacements', titre:'Déplacements et Antidéplacements', badge:'Géométrie', nbThm:7, nbEx:5, desc:'Groupe des déplacements, antidéplacements, écriture complexe, décomposition en symétries.' },
  { ch:'CH 04', slug:'similitudes', titre:'Similitudes', badge:'Géométrie', nbThm:9, nbEx:7, desc:'Similitudes directes/indirectes, homothéties, point fixe, rapport, composées, applications.' },
]

export default function MathsSectionPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <span style={{ color:'var(--text)' }}>Section Mathématiques</span>
        </div>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          {/* Header */}
          <div style={{ marginBottom:48 }}>
            <span className="badge badge-blue" style={{ marginBottom:12, display:'inline-block' }}>Coefficient 4</span>
            <h1 style={{ fontSize:'clamp(28px,4vw,44px)', marginBottom:12 }}>Section Mathématiques</h1>
            <p style={{ maxWidth:620, color:'var(--text2)', marginBottom:20 }}>
              Programme officiel CNP Tunisie — 4ème année secondaire. 9 chapitres répartis en 2 tomes.
              Tous les théorèmes, définitions, formules et exercices type Bac.
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', fontSize:13, color:'var(--muted)' }}>
              <span>📐 9 chapitres</span>
              <span>·</span>
              <span>📖 2 tomes</span>
              <span>·</span>
              <span>📊 100+ théorèmes</span>
              <span>·</span>
              <span>📝 80+ exercices</span>
            </div>
          </div>

          {/* Tome I */}
          <div style={{ marginBottom:48 }}>
            <div style={{ background:'linear-gradient(135deg,rgba(79,110,247,0.12),rgba(124,58,237,0.06))', border:'1px solid rgba(79,110,247,0.2)', borderRadius:16, padding:'20px 28px', marginBottom:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
              <div>
                <h2 style={{ fontSize:24, marginBottom:4 }}>📗 Tome I — Analyse</h2>
                <p style={{ fontSize:13, color:'var(--muted)', margin:0 }}>Continuité · Suites · Dérivabilité · Fonctions réciproques · Intégrales</p>
              </div>
              <span style={{ background:'rgba(79,110,247,0.15)', color:'#4f6ef7', padding:'6px 14px', borderRadius:20, fontSize:13, fontFamily:'var(--font-mono)' }}>5 chapitres</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
              {TOME1.map(ch => (
                <Link key={ch.slug} href={`/bac/maths/${ch.slug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ padding:22, height:'100%', transition:'transform 0.2s', cursor:'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.transform='translateY(-3px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform='translateY(0)')}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                      <div style={{ display:'flex', gap:8 }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)', background:'var(--surface2)', padding:'2px 8px', borderRadius:6 }}>{ch.ch}</span>
                        <span className="badge badge-blue" style={{ fontSize:11 }}>{ch.badge}</span>
                      </div>
                      <div style={{ display:'flex', gap:8, fontSize:11, color:'var(--muted)' }}>
                        <span>{ch.nbThm} théorèmes</span>
                      </div>
                    </div>
                    <h3 style={{ fontSize:16, fontFamily:'var(--font-display)', fontWeight:700, marginBottom:8, color:'var(--text)' }}>{ch.titre}</h3>
                    <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6, marginBottom:14 }}>{ch.desc}</p>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12 }}>
                      <span style={{ color:'var(--muted)' }}>📝 {ch.nbEx} exercices</span>
                      <span style={{ color:'var(--teal)', fontWeight:600 }}>Ouvrir →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tome II */}
          <div>
            <div style={{ background:'linear-gradient(135deg,rgba(6,214,160,0.1),rgba(5,154,114,0.05))', border:'1px solid rgba(6,214,160,0.2)', borderRadius:16, padding:'20px 28px', marginBottom:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
              <div>
                <h2 style={{ fontSize:24, marginBottom:4 }}>📘 Tome II — Algèbre & Géométrie</h2>
                <p style={{ fontSize:13, color:'var(--muted)', margin:0 }}>Nombres Complexes · Isométries · Déplacements & Antidéplacements · Similitudes</p>
              </div>
              <span style={{ background:'rgba(6,214,160,0.15)', color:'#06d6a0', padding:'6px 14px', borderRadius:20, fontSize:13, fontFamily:'var(--font-mono)' }}>4 chapitres</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
              {TOME2.map(ch => (
                <Link key={ch.slug} href={`/bac/maths/${ch.slug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ padding:22, height:'100%', transition:'transform 0.2s', cursor:'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.transform='translateY(-3px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform='translateY(0)')}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                      <div style={{ display:'flex', gap:8 }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)', background:'var(--surface2)', padding:'2px 8px', borderRadius:6 }}>{ch.ch}</span>
                        <span className="badge badge-teal" style={{ fontSize:11 }}>{ch.badge}</span>
                      </div>
                      <span style={{ fontSize:11, color:'var(--muted)' }}>{ch.nbThm} théorèmes</span>
                    </div>
                    <h3 style={{ fontSize:16, fontFamily:'var(--font-display)', fontWeight:700, marginBottom:8, color:'var(--text)' }}>{ch.titre}</h3>
                    <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6, marginBottom:14 }}>{ch.desc}</p>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12 }}>
                      <span style={{ color:'var(--muted)' }}>📝 {ch.nbEx} exercices</span>
                      <span style={{ color:'var(--teal)', fontWeight:600 }}>Ouvrir →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation inter-sections */}
          <div style={{ marginTop:60, display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <Link href="/bac/sciences-exp" style={{ textDecoration:'none' }}>
              <div className="card" style={{ padding:20, display:'flex', gap:14, alignItems:'center' }}>
                <div style={{ fontSize:28 }}>🔬</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>Sciences Expérimentales</div>
                  <div style={{ fontSize:12, color:'var(--muted)' }}>Voir le programme Sc.Exp — 10 chapitres (2 tomes)</div>
                </div>
              </div>
            </Link>
            <Link href="/bac/sciences-tech" style={{ textDecoration:'none' }}>
              <div className="card" style={{ padding:20, display:'flex', gap:14, alignItems:'center' }}>
                <div style={{ fontSize:28 }}>⚙️</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>Sciences Techniques</div>
                  <div style={{ fontSize:12, color:'var(--muted)' }}>Voir le programme Sc.Tech — 9 chapitres (2 tomes)</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
