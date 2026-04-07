'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const META = { tome:'Tome II', ch:'CH 01', badge:'Algèbre', section:'Section Mathématiques', titre:'Nombres Complexes', slug:'complexes', basePath:'/bac/maths', desc:"L'ensemble ℂ, forme algébrique, trigonométrique et exponentielle, formule de Moivre, racines n-ièmes, applications géométriques.", heures:'~8h', nbEx:40 }

const THEOREMES = [
  { id:'T1', type:'def', nom:'Nombre complexe — forme algébrique', enonce:'Un nombre complexe z s\'écrit z=a+ib avec a=Re(z) (partie réelle), b=Im(z) (partie imaginaire), i²=−1. ℂ est un corps. z est réel si b=0 ; imaginaire pur si a=0.' },
  { id:'T2', type:'def', nom:'Conjugué', enonce:'Le conjugué de z=a+ib est z̄=a−ib. Propriétés : z+z̄=2a∈ℝ, z·z̄=a²+b²∈ℝ⁺, (z+w)̄=z̄+w̄, (z·w)̄=z̄·w̄, (z/w)̄=z̄/w̄.' },
  { id:'T3', type:'def', nom:'Module', enonce:'Le module de z=a+ib est |z|=√(a²+b²)=√(z·z̄). Propriétés : |z·w|=|z|·|w|, |z/w|=|z|/|w|, |z+w|≤|z|+|w| (inégalité triangulaire), |z̄|=|z|.' },
  { id:'T4', type:'def', nom:'Argument', enonce:'L\'argument de z≠0, noté arg(z), est l\'angle θ∈[−π,π[ tel que z=|z|(cos θ+i sin θ). arg(z·w)=arg(z)+arg(w)[2π], arg(z/w)=arg(z)−arg(w)[2π], arg(z̄)=−arg(z)[2π].' },
  { id:'T5', type:'def', nom:'Forme trigonométrique', enonce:'z = r(cos θ + i sin θ) avec r=|z|≥0 et θ=arg(z). Multiplication : r₁(cos θ₁+i sin θ₁)·r₂(cos θ₂+i sin θ₂) = r₁r₂(cos(θ₁+θ₂)+i sin(θ₁+θ₂)).' },
  { id:'T6', type:'def', nom:'Forme exponentielle (Notation d\'Euler)', enonce:'Pour θ∈ℝ : e^(iθ) = cos θ + i sin θ. Tout complexe non nul s\'écrit : z = r·e^(iθ). Propriété : e^(iθ)·e^(iφ) = e^(i(θ+φ)).' },
  { id:'T7', type:'thm', nom:'Formule de Moivre', enonce:'Pour tout entier n∈ℤ et θ∈ℝ : (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ). En notation exponentielle : (e^(iθ))ⁿ = e^(inθ).' },
  { id:'T8', type:'formule', nom:'Formules de linéarisation', enonce:'cos θ = (e^(iθ)+e^(−iθ))/2 | sin θ = (e^(iθ)−e^(−iθ))/(2i). Ces formules permettent d\'exprimer cosⁿθ et sinⁿθ en termes de cos(kθ) et sin(kθ).' },
  { id:'T9', type:'thm', nom:'Racines n-ièmes de l\'unité', enonce:'Les racines n-ièmes de 1 (solutions de zⁿ=1) sont les n complexes : ωₖ = e^(2ikπ/n) pour k=0,1,...,n−1. Ils forment un polygone régulier à n côtés inscrit dans le cercle unité.' },
  { id:'T10', type:'thm', nom:'Racines n-ièmes d\'un complexe', enonce:'Soit z₀=r·e^(iθ). Les solutions de zⁿ=z₀ sont : zₖ = r^(1/n)·e^(i(θ+2kπ)/n) pour k=0,...,n−1. Il y a exactement n racines.' },
  { id:'T11', type:'thm', nom:'Équation du second degré dans ℂ', enonce:'az²+bz+c=0 (a,b,c∈ℂ, a≠0). Discriminant Δ=b²−4ac∈ℂ. Si δ²=Δ, les solutions sont z=(-b±δ)/(2a). Dans ℝ : Δ>0 → 2 solutions réelles ; Δ=0 → 1 solution réelle ; Δ<0 → 2 solutions complexes conjuguées.' },
  { id:'T12', type:'prop', nom:'Interprétation géométrique dans le plan', enonce:'|z−z\'|=distance entre les points d\'affixes z et z\'. arg((z−z\')/(z\'\'-z\'))=mesure de l\'angle orienté (M\'M, M\'M\'\').' },
  { id:'T13', type:'thm', nom:'Transformation du plan — écriture complexe', enonce:'Translation de vecteur w : z\'=z+w. Rotation de centre Ω (d\'affixe ω), angle θ : z\'−ω=(z−ω)e^(iθ). Homothétie de centre Ω, rapport k : z\'−ω=k(z−ω).' },
  { id:'T14', type:'prop', nom:'Points alignés et cocycliques', enonce:'A, B, C alignés ⟺ (z_C−z_A)/(z_B−z_A) ∈ ℝ. A, B, C, D cocycliques (ou 3 alignés) ⟺ (z_C−z_A)/(z_B−z_A) · (z_D−z_B)/(z_C−z_B) ∈ ℝ.' },
]

const EXERCICES = [
  { num:'01', titre:'Forme algébrique', diff:'facile', enonce:'Mettre sous forme a+ib : (2+3i)(1−i) et (3+2i)/(1+i).' },
  { num:'02', titre:'Module et argument', diff:'facile', enonce:'Déterminer le module et l\'argument de z = 1+i√3.' },
  { num:'03', titre:'Formule de Moivre', diff:'moyen', enonce:'Calculer (1+i)¹⁰ en utilisant la forme trigonométrique.' },
  { num:'04', titre:'Linéarisation', diff:'moyen', enonce:'Exprimer cos³θ en fonction de cos(3θ) et cos θ.' },
  { num:'05', titre:'Racines 4-ièmes', diff:'moyen', enonce:'Résoudre z⁴=−1 dans ℂ. Représenter les solutions.' },
  { num:'06', titre:'Racines carrées d\'un complexe', diff:'moyen', enonce:'Calculer les racines carrées de 3+4i.' },
  { num:'07', titre:'Équation du 2nd degré', diff:'moyen', enonce:'Résoudre z²−(3+i)z+(2+i)=0 dans ℂ.' },
  { num:'08', titre:'Géométrie — alignement', diff:'difficile', enonce:'A(1+i), B(2−i), C(4−5i). Vérifier si A, B, C sont alignés en utilisant les affixes.' },
  { num:'09', titre:'Rotation dans ℂ', diff:'difficile', enonce:'Déterminer l\'image du point M(d\'affixe 2+i) par la rotation de centre Ω(d\'affixe i) et d\'angle π/2.' },
  { num:'10', titre:'Exercice type Bac', diff:'bac', enonce:'z₀ = 1+i. 1) Écrire z₀ sous forme trigonométrique. 2) Calculer z₀ⁿ. 3) En déduire les valeurs de cos(nπ/4) et sin(nπ/4). 4) Résoudre zⁿ=z₀ pour n=3.' },
]

const COULEURS: Record<string,string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const LABELS: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', cor:'Corollaire' }
const NAV2 = [['CH 01','Nombres Complexes','complexes','active'],['CH 02','Isométries du plan','isometries',''],['CH 03','Déplacements & Antidéplacements','deplacements',''],['CH 04','Similitudes','similitudes','']]

export default function NombresComplexesPage() {
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
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique les nombres complexes formule de Moivre et racines n-ièmes" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA — Complexes</Link>
                  <Link href="/examens?ch=complexes" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>📋 Examen blanc</Link>
                </div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Tome I</div>
                <Link href="/bac/maths/limites" style={{ fontSize:12, color:'var(--muted)', textDecoration:'none', display:'block', marginBottom:4 }}>← CH01 Continuité et Limites</Link>
                <Link href="/bac/maths/suites" style={{ fontSize:12, color:'var(--muted)', textDecoration:'none', display:'block', marginBottom:4 }}>← CH02 Suites réelles</Link>
                <Link href="/bac/maths/derivabilite" style={{ fontSize:12, color:'var(--muted)', textDecoration:'none', display:'block', marginBottom:4 }}>← CH03 Dérivabilité</Link>
                <Link href="/bac/maths/fonctions-reciproques" style={{ fontSize:12, color:'var(--muted)', textDecoration:'none', display:'block', marginBottom:4 }}>← CH04 Fonctions réciproques</Link>
                <Link href="/bac/maths/primitives" style={{ fontSize:12, color:'var(--muted)', textDecoration:'none', display:'block' }}>← CH05 Primitives & Intégrales</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
