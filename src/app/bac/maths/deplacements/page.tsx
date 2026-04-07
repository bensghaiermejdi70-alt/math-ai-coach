'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const META = { tome:'Tome II', ch:'CH 03', badge:'Géométrie', titre:'Déplacements et Antidéplacements', slug:'deplacements', desc:"Groupe des déplacements (isométries directes) et antidéplacements (isométries indirectes). Composition, décomposition en symétries axiales.", heures:'~5h', nbEx:24 }

const THEOREMES = [
  { id:'T1', type:'def', nom:'Déplacement', enonce:'Un déplacement est une isométrie directe du plan (conserve distances et orientation). Les déplacements forment un groupe. Tout déplacement est une translation ou une rotation.' },
  { id:'T2', type:'def', nom:'Antidéplacement', enonce:'Un antidéplacement est une isométrie indirecte du plan (conserve les distances, inverse l\'orientation). Tout antidéplacement est une symétrie axiale ou une symétrie glissée.' },
  { id:'T3', type:'thm', nom:'Composée de deux isométries', enonce:'Déplacement ∘ Déplacement = Déplacement. Antidéplacement ∘ Antidéplacement = Déplacement. Déplacement ∘ Antidéplacement = Antidéplacement.' },
  { id:'T4', type:'thm', nom:'Décomposition en symétries axiales', enonce:'Tout déplacement est la composée d\'un nombre pair de symétries axiales. Tout antidéplacement est la composée d\'un nombre impair de symétries axiales.' },
  { id:'T5', type:'prop', nom:'Écriture complexe des antidéplacements', enonce:'Tout antidéplacement s\'écrit z\'=az̄+b (|a|=1, b∈ℂ). C\'est une symétrie axiale si b+aā·b̄=0, sinon une symétrie glissée.' },
  { id:'T6', type:'thm', nom:'Invariants d\'un antidéplacement', enonce:'Symétrie axiale d\'axe (Δ) : tous les points de (Δ) sont fixes. Symétrie glissée : aucun point fixe.' },
  { id:'T7', type:'prop', nom:'Axe d\'une symétrie axiale', enonce:'Si f(z)=az̄+b est une symétrie axiale, son axe passe par le milieu de [M, f(M)] pour tout M et est perpendiculaire à MM\'.' },
]

const EXERCICES = [
  { num:'01', diff:'moyen', titre:'Identification de type', enonce:'f(z)=−z̄+2+2i. Identifier si c\'est un déplacement ou antidéplacement. Préciser le type exact.' },
  { num:'02', diff:'moyen', titre:'Écriture complexe', enonce:'g(z)=iz̄+1−i. Montrer que g est un antidéplacement. Calculer g(0), g(1), g(i). Identifier l\'axe.' },
  { num:'03', diff:'difficile', titre:'Composée', enonce:'Rotation R(O,π/2) : z\'=iz. Symétrie axiale σ : z\'=z̄. Calculer σ∘R et R∘σ. Identifier chaque résultat.' },
  { num:'04', diff:'difficile', titre:'Décomposition', enonce:'Soit f(z)=−z+2. Décomposer f en produit de deux symétries axiales.' },
  { num:'05', diff:'bac', titre:'Exercice type Bac', enonce:'f(z)=e^(iπ/3)z̄+1+i. 1) Montrer que f est un antidéplacement. 2) Montrer que f est une symétrie axiale. 3) Déterminer son axe. 4) Vérifier que les points de l\'axe sont invariants.' },
]

const COULEURS: Record<string,string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const LABELS: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', cor:'Corollaire' }
const NAV2 = [['CH 01','Nombres Complexes','complexes',''],['CH 02','Isométries du plan','isometries',''],['CH 03','Déplacements & Antidéplacements','deplacements','active'],['CH 04','Similitudes','similitudes','']]

export default function DeplacementsPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <Link href="/bac/maths" style={{ color:'var(--muted)', textDecoration:'none' }}>Section Maths</Link><span>›</span>
          <span style={{ color:'var(--muted)' }}>Tome II</span><span>›</span>
          <span style={{ color:'var(--text)' }}>{META.titre}</span>
        </div>
        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
                <span className="badge badge-blue">{META.tome} · {META.ch}</span>
                <span className="badge badge-blue">{META.badge}</span>
              </div>
              <h1 style={{ fontSize:'clamp(24px,4vw,38px)', marginBottom:12 }}>{META.titre}</h1>
              <p style={{ maxWidth:550, marginBottom:16, color:'var(--text2)' }}>{META.desc}</p>
              <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', marginBottom:40 }}>
                <span>📝 {META.nbEx} exercices</span><span>·</span><span>📋 Bac 2015–2024</span><span>·</span><span>⏱ {META.heures}</span>
              </div>
              <h2 style={{ fontSize:20, marginBottom:4 }}>📐 Cours officiel — Théorèmes & Définitions</h2>
              <p style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>Programme CNP Tunisie · 4ème année Section Mathématiques</p>
              <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:44 }}>
                {THEOREMES.map(t => (
                  <div key={t.id} style={{ background:'var(--surface)', border:`1.5px solid ${COULEURS[t.type]}30`, borderLeft:`4px solid ${COULEURS[t.type]}`, borderRadius:12, padding:'16px 18px' }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8, flexWrap:'wrap' }}>
                      <span style={{ background:`${COULEURS[t.type]}20`, color:COULEURS[t.type], fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, padding:'2px 8px', borderRadius:6 }}>{t.id}</span>
                      <span style={{ background:`${COULEURS[t.type]}15`, color:COULEURS[t.type], fontSize:11, padding:'2px 8px', borderRadius:6 }}>{LABELS[t.type]}</span>
                      <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14 }}>{t.nom}</span>
                    </div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text2)', background:'var(--bg2)', padding:'10px 14px', borderRadius:8, lineHeight:1.9 }}>{t.enonce}</div>
                  </div>
                ))}
              </div>
              <h2 style={{ fontSize:20, marginBottom:16 }}>📝 Exercices</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {EXERCICES.map(ex => (
                  <div key={ex.num} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:18 }}>
                    <span className={`badge ${ex.diff==='bac'?'badge-blue':ex.diff==='difficile'?'badge-red':ex.diff==='moyen'?'badge-gold':'badge-teal'}`} style={{ marginBottom:8, display:'inline-block' }}>{ex.diff}</span>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:14, marginBottom:8 }}>Ex {ex.num} — {ex.titre}</div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text2)', background:'var(--bg2)', padding:'10px 14px', borderRadius:8, marginBottom:10, lineHeight:1.8 }}>{ex.enonce}</div>
                    <div style={{ display:'flex', gap:8 }}>
                      <Link href={`/solve?q=${encodeURIComponent(ex.enonce)}`} className="btn btn-primary btn-sm">🧮 Résoudre avec IA</Link>
                      <button className="btn btn-ghost btn-sm">📋 Correction</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position:'sticky', top:100, display:'flex', flexDirection:'column', gap:16 }}>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Navigation Tome II</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {NAV2.map(([ch, titre, slug, act]) => (
                    <Link key={slug} href={`/bac/maths/${slug}`} style={{ display:'flex', gap:8, padding:'6px 8px', borderRadius:8, background:act?'var(--surface2)':'transparent', fontSize:12, color:act?'var(--text)':'var(--muted)', textDecoration:'none', alignItems:'center' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', minWidth:32 }}>{ch}</span><span>{titre}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique les déplacements et antidéplacements du plan en complexes" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA</Link>
                  <Link href="/examens?ch=deplacements" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>📋 Examen blanc</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
