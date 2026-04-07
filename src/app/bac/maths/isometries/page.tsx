'use client'
// === CH02 : Isométries du plan ===
// Fichier: /bac/maths/isometries/page.tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const META = { tome:'Tome II', ch:'CH 02', badge:'Géométrie', section:'Section Mathématiques', titre:'Isométries du plan', slug:'isometries', basePath:'/bac/maths', desc:"Transformations du plan conservant les distances : symétries, translations, rotations. Classification des isométries directes et indirectes.", heures:'~6h', nbEx:28 }

const THEOREMES = [
  { id:'T1', type:'def', nom:'Isométrie (ou déplacement au sens large)', enonce:'Une application f du plan dans lui-même est une isométrie si elle conserve les distances : pour tout couple de points (M,N), |f(M)f(N)| = |MN|. Toute isométrie est une bijection.' },
  { id:'T2', type:'def', nom:'Isométrie directe / indirecte', enonce:'Une isométrie est directe si elle conserve l\'orientation des figures (angles orientés). Elle est indirecte si elle renverse l\'orientation. Les isométries directes forment un groupe.' },
  { id:'T3', type:'thm', nom:'Classification des isométries directes', enonce:'Toute isométrie directe du plan est soit une translation, soit une rotation. Critère : f est une rotation s\'il existe un point invariant (centre) ; sinon, c\'est une translation.' },
  { id:'T4', type:'thm', nom:'Classification des isométries indirectes', enonce:'Toute isométrie indirecte du plan est soit une symétrie axiale, soit une symétrie glissée (composée d\'une symétrie axiale et d\'une translation de vecteur parallèle à l\'axe).' },
  { id:'T5', type:'def', nom:'Translation', enonce:'La translation de vecteur v⃗ associe à tout point M le point M\' tel que MM\'⃗=v⃗. En complexes (v=b) : z\'=z+b. Composée de deux translations de vecteurs v⃗₁ et v⃗₂ : translation de vecteur v⃗₁+v⃗₂.' },
  { id:'T6', type:'def', nom:'Rotation', enonce:'La rotation de centre Ω (affixe ω), angle θ associe à M (affixe z) le point M\' tel que : z\'−ω = e^(iθ)(z−ω). Propriétés : Ω est l\'unique point fixe (si θ≠0[2π]).' },
  { id:'T7', type:'thm', nom:'Composée de deux rotations', enonce:'Composée de deux rotations de centres Ω₁, Ω₂ et d\'angles θ₁, θ₂ : si θ₁+θ₂ ≠ 0[2π], c\'est une rotation d\'angle θ₁+θ₂. Si θ₁+θ₂ = 0[2π], c\'est une translation.' },
  { id:'T8', type:'def', nom:'Symétrie axiale', enonce:'La symétrie d\'axe (Δ) associe à tout point M son symétrique M\' par rapport à (Δ) : le milieu de MM\' est sur (Δ) et MM\'⊥(Δ). C\'est une isométrie indirecte.' },
  { id:'T9', type:'thm', nom:'Composée de deux symétries axiales', enonce:'Si les axes sont parallèles (distance d) : translation de vecteur perpendiculaire aux axes, de longueur 2d. Si les axes se coupent en Ω avec angle θ : rotation de centre Ω et d\'angle 2θ.' },
  { id:'T10', type:'prop', nom:'Points fixes et droites invariantes', enonce:'Translation (v⃗≠0⃗) : aucun point fixe, toute droite parallèle à v⃗ est invariante. Rotation (θ≠0) : un seul point fixe (le centre). Symétrie axiale : les points de l\'axe sont fixes, l\'axe est invariant.' },
]

const EXERCICES = [
  { num:'01', titre:'Translation — image d\'un triangle', diff:'facile', enonce:'Déterminer l\'image du triangle A(1,2), B(3,1), C(2,4) par la translation de vecteur v⃗(2,−1).' },
  { num:'02', titre:'Rotation de π/2', diff:'moyen', enonce:'Déterminer l\'image de M(3,1) par la rotation de centre O(0,0) et d\'angle π/2 (en utilisant les complexes).' },
  { num:'03', titre:'Composition rotations', diff:'moyen', enonce:'Composer les rotations : R(O,π/3) ∘ R(A,π/6) où A a pour affixe 1.' },
  { num:'04', titre:'Symétrie axiale', diff:'moyen', enonce:'Déterminer l\'image du point M(2,3) par la symétrie d\'axe y=x.' },
  { num:'05', titre:'Composée symétries', diff:'difficile', enonce:'Δ₁ : y=0 et Δ₂ : y=2. Déterminer la composée σ_Δ₂ ∘ σ_Δ₁ et identifier la transformation.' },
  { num:'06', titre:'Exercice type Bac', diff:'bac', enonce:'f est la composée de la rotation R(A, π/2) et de la symétrie d\'axe (AB). 1) Identifier le type de f. 2) Déterminer ses éléments caractéristiques. 3) Trouver les points invariants.' },
]

const COULEURS: Record<string,string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const LABELS: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', cor:'Corollaire' }
const NAV2 = [['CH 01','Nombres Complexes','complexes',''],['CH 02','Isométries du plan','isometries','active'],['CH 03','Déplacements & Antidéplacements','deplacements',''],['CH 04','Similitudes','similitudes','']]

export default function IsometriesPage() {
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
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}><span className="badge badge-blue">{META.tome} · {META.ch}</span><span className="badge badge-blue">{META.badge}</span></div>
              <h1 style={{ fontSize:'clamp(24px,4vw,38px)', marginBottom:12 }}>{META.titre}</h1>
              <p style={{ maxWidth:550, marginBottom:16, color:'var(--text2)' }}>{META.desc}</p>
              <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', marginBottom:40 }}><span>📝 {META.nbEx} exercices</span><span>·</span><span>⏱ {META.heures}</span></div>
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
                    <div style={{ display:'flex', gap:8 }}><Link href={`/solve?q=${encodeURIComponent(ex.enonce)}`} className="btn btn-primary btn-sm">🧮 Résoudre avec IA</Link><button className="btn btn-ghost btn-sm">📋 Correction</button></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position:'sticky', top:100, display:'flex', flexDirection:'column', gap:16 }}>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Navigation Tome II</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {NAV2.map(([ch,titre,slug,act]) => (
                    <Link key={slug} href={`/bac/maths/${slug}`} style={{ display:'flex', gap:8, padding:'6px 8px', borderRadius:8, background:act?'var(--surface2)':'transparent', fontSize:12, color:act?'var(--text)':'var(--muted)', textDecoration:'none', alignItems:'center' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', minWidth:32 }}>{ch}</span><span>{titre}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <Link href="/chat?q=Explique les isométries du plan rotations et symétries axiales" className="btn btn-primary btn-sm" style={{ justifyContent:'center', display:'flex' }}>🤖 Chat IA — Isométries</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
