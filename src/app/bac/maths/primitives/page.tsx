'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const META = { tome:'Tome I', ch:'CH 05', badge:'Analyse', section:'Section Mathématiques', titre:"Primitives et Intégrales", slug:'primitives', basePath:'/bac/maths', desc:"Primitives des fonctions usuelles, intégrale de Riemann, propriétés, calcul d'aires, intégration par parties, changement de variable.", heures:'~7h', nbEx:35 }

const THEOREMES = [
  { id:'T1', type:'def', nom:'Primitive', enonce:'F est une primitive de f sur I si F est dérivable sur I et F\'(x)=f(x) pour tout x∈I. Si F est une primitive de f, toutes les primitives sont de la forme F(x)+C (C∈ℝ).' },
  { id:'T2', type:'formule', nom:'Primitives usuelles', enonce:'∫xⁿdx=xⁿ⁺¹/(n+1)+C (n≠−1) | ∫1/x dx=ln|x|+C | ∫eˣdx=eˣ+C | ∫sin x dx=−cos x+C | ∫cos x dx=sin x+C | ∫1/(1+x²)dx=arctan x+C | ∫1/√(1−x²)dx=arcsin x+C' },
  { id:'T3', type:'formule', nom:'Primitives composées', enonce:'∫u\'·uⁿdu=uⁿ⁺¹/(n+1)+C | ∫u\'/u du=ln|u|+C | ∫u\'·eᵘdu=eᵘ+C | ∫u\'·sin(u)du=−cos(u)+C | ∫u\'/(1+u²)du=arctan(u)+C' },
  { id:'T4', type:'def', nom:'Intégrale de Riemann', enonce:'Si f est continue sur [a,b], l\'intégrale de a à b de f est : ∫ₐᵇ f(x)dx = [F(x)]ₐᵇ = F(b)−F(a), où F est une primitive quelconque de f.' },
  { id:'T5', type:'prop', nom:'Linéarité de l\'intégrale', enonce:'∫ₐᵇ (f+g)dx = ∫ₐᵇ f dx + ∫ₐᵇ g dx | ∫ₐᵇ λf dx = λ∫ₐᵇ f dx | ∫ₐᵇ f dx = ∫ₐᶜ f dx + ∫ᶜᵇ f dx (relation de Chasles)' },
  { id:'T6', type:'prop', nom:'Positivité et croissance', enonce:'Si f≥0 sur [a,b] alors ∫ₐᵇ f dx ≥ 0. Si f≤g sur [a,b] alors ∫ₐᵇ f dx ≤ ∫ₐᵇ g dx.' },
  { id:'T7', type:'thm', nom:'Inégalité de la moyenne', enonce:'Si m ≤ f(x) ≤ M sur [a,b], alors : m(b−a) ≤ ∫ₐᵇ f(x)dx ≤ M(b−a).' },
  { id:'T8', type:'thm', nom:'Théorème fondamental du calcul intégral', enonce:'Si f est continue sur [a,b], la fonction G définie par G(x)=∫ₐˣ f(t)dt est l\'unique primitive de f s\'annulant en a : G\'(x)=f(x).' },
  { id:'T9', type:'thm', nom:'Intégration par parties (IPP)', enonce:'∫ₐᵇ u\'(x)v(x)dx = [u(x)v(x)]ₐᵇ − ∫ₐᵇ u(x)v\'(x)dx. Choix : u\' facile à intégrer, v facile à dériver.' },
  { id:'T10', type:'thm', nom:'Changement de variable', enonce:'Si x=φ(t) avec φ dérivable et bijective de [α,β] sur [a,b] : ∫ₐᵇ f(x)dx = ∫_α^β f(φ(t))·φ\'(t)dt.' },
  { id:'T11', type:'prop', nom:'Intégrales des fonctions paires/impaires', enonce:'Si f est paire : ∫₋ₐᵃ f(x)dx = 2∫₀ᵃ f(x)dx. Si f est impaire : ∫₋ₐᵃ f(x)dx = 0.' },
  { id:'T12', type:'formule', nom:'Calcul d\'aires', enonce:'Aire entre deux courbes f et g sur [a,b] (f≥g) : A = ∫ₐᵇ (f(x)−g(x))dx. Unité : 1 u.a. = |Ol⃗|·|Oj⃗| unités de surface.' },
  { id:'T13', type:'formule', nom:'Valeur moyenne', enonce:'La valeur moyenne de f sur [a,b] est : m = (1/(b−a))·∫ₐᵇ f(x)dx.' },
]

const EXERCICES = [
  { num:'01', titre:'Calcul de primitives usuelles', diff:'facile', enonce:'Calculer : ∫(3x²+2x−1)dx, ∫eˣdx, ∫cos(x)dx.' },
  { num:'02', titre:'Intégrale définie simple', diff:'facile', enonce:'Calculer ∫₀¹ (2x+1)dx.' },
  { num:'03', titre:'Primitive composée', diff:'moyen', enonce:'Calculer ∫ 2x/(x²+1) dx.' },
  { num:'04', titre:'IPP — xeˣ', diff:'moyen', enonce:'Calculer ∫₀¹ xeˣ dx par intégration par parties.' },
  { num:'05', titre:'IPP — ln(x)', diff:'moyen', enonce:'Calculer ∫₁ᵉ ln(x) dx.' },
  { num:'06', titre:'IPP itérée', diff:'difficile', enonce:'Calculer Iₙ = ∫₀¹ xⁿeˣ dx. Trouver une relation entre Iₙ et Iₙ₋₁.' },
  { num:'07', titre:'Changement de variable', diff:'difficile', enonce:'Calculer ∫₀¹ x/√(1+x²) dx par changement de variable u=1+x².' },
  { num:'08', titre:'Aire entre deux courbes', diff:'moyen', enonce:'Calculer l\'aire entre f(x)=x² et g(x)=x sur [0,1].' },
  { num:'09', titre:'Valeur moyenne', diff:'moyen', enonce:'Calculer la valeur moyenne de f(x)=sin(x) sur [0,π].' },
  { num:'10', titre:'Exercice type Bac', diff:'bac', enonce:'Soit f(x)=x·ln(x) sur ]0,+∞[. 1) Calculer f\'(x). 2) Calculer ∫₁ᵉ x·ln(x)dx par IPP. 3) Calculer l\'aire délimitée par la courbe de f, l\'axe des abscisses et la droite x=e.' },
]

const COULEURS: Record<string,string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const LABELS: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', cor:'Corollaire' }
const NAV = [['CH 01','Continuité et Limites','limites',''],['CH 02','Suites réelles','suites',''],['CH 03','Dérivabilité','derivabilite',''],['CH 04','Fonctions réciproques','fonctions-reciproques',''],['CH 05','Primitives et intégrales','primitives','active']]

export default function PrimitivesIntegralesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <Link href="/bac/maths" style={{ color:'var(--muted)', textDecoration:'none' }}>Section Maths</Link><span>›</span>
          <span style={{ color:'var(--muted)' }}>Tome I</span><span>›</span>
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
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Navigation Tome I</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {NAV.map(([ch,titre,slug,act]) => (
                    <Link key={slug} href={`/bac/maths/${slug}`} style={{ display:'flex', gap:8, padding:'6px 8px', borderRadius:8, background:act?'var(--surface2)':'transparent', fontSize:12, color:act?'var(--text)':'var(--muted)', textDecoration:'none', alignItems:'center' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', minWidth:32 }}>{ch}</span><span>{titre}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique les primitives et intégrales, IPP et changement de variable" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA</Link>
                  <Link href="/examens?ch=primitives" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>📋 Examen blanc</Link>
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
