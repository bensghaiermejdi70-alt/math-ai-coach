'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const META = { tome:'Tome II', ch:'CH 04', badge:'Géométrie', titre:'Similitudes', slug:'similitudes', desc:"Similitudes directes et indirectes, homothéties, rapport et angle de similitude, point fixe, composées, applications géométriques.", heures:'~5h', nbEx:24 }

const THEOREMES = [
  { id:'T1', type:'def', nom:'Similitude directe', enonce:'Une similitude directe est une transformation z\'=az+b (a,b∈ℂ, a≠0). Rapport : |a|, angle : arg(a). Si |a|=1 : c\'est un déplacement. Si b=0 et a réel : homothétie de centre O.' },
  { id:'T2', type:'def', nom:'Similitude indirecte', enonce:'Une similitude indirecte est de la forme z\'=az̄+b (a,b∈ℂ, a≠0). Rapport : |a|. Si |a|=1 : c\'est un antidéplacement.' },
  { id:'T3', type:'def', nom:'Homothétie', enonce:'Homothétie de centre Ω (affixe ω), rapport k∈ℝ* : z\'−ω=k(z−ω). Si k>0 : Ω, M, M\' alignés (même côté). Si k<0 : côtés opposés. |k|=rapport de similitude.' },
  { id:'T4', type:'thm', nom:'Point fixe d\'une similitude directe', enonce:'f(z)=az+b, a≠1. Point fixe unique ω=b/(1−a). On peut réécrire : z\'−ω=a(z−ω). Donc f est une rotation de centre ω et d\'angle arg(a) composée d\'une homothétie de rapport |a|.' },
  { id:'T5', type:'thm', nom:'Composée de similitudes directes', enonce:'f₁(z)=a₁z+b₁, f₂(z)=a₂z+b₂. (f₂∘f₁)(z)=a₂a₁z+(a₂b₁+b₂). Rapport : |a₁a₂|. Angle : arg(a₁)+arg(a₂). Si a₁a₂=1 : la composée est une translation.' },
  { id:'T6', type:'prop', nom:'Conservation des angles', enonce:'Une similitude directe conserve les angles orientés. Une similitude indirecte renverse les angles orientés (conserve les angles non orientés = les figures sont "miroir").' },
  { id:'T7', type:'thm', nom:'Image d\'un cercle par une similitude', enonce:'L\'image d\'un cercle par une similitude est un cercle (ou une droite si le cercle passe par un point de discontinuité). Le rapport des rayons est le rapport de similitude.' },
  { id:'T8', type:'cor', nom:'Similitude envoyant deux points sur deux autres', enonce:'Il existe une unique similitude directe envoyant A sur A\' et B sur B\'. Son rapport est |A\'B\'|/|AB| et son angle est arg((z_B\'−z_A\')/(z_B−z_A)).' },
  { id:'T9', type:'prop', nom:'Deux cercles — similitude', enonce:'Deux cercles (distincts) sont toujours en situation de similitude : il existe une similitude directe envoyant l\'un sur l\'autre. Le centre de similitude est le point qui divise les centres dans le rapport des rayons.' },
]

const EXERCICES = [
  { num:'01', diff:'facile', titre:'Homothétie', enonce:'Homothétie de centre O(0,0) et rapport 3. Trouver l\'image de M(1,2) et de A(−1,1). Calculer |OA\'|/|OA|.' },
  { num:'02', diff:'moyen', titre:'Point fixe', enonce:'f(z)=(1+i)z+2−2i. Trouver le point fixe, le rapport et l\'angle. Réécrire f sous la forme z\'−ω=a(z−ω).' },
  { num:'03', diff:'moyen', titre:'Composée', enonce:'f(z)=2iz+1 et g(z)=−z+3. Calculer f∘g et g∘f. Identifier le type de chaque composée.' },
  { num:'04', diff:'moyen', titre:'Similitude envoyant A→A\', B→B\'', enonce:'A(affixe 0), B(affixe 1), A\'(affixe i), B\'(affixe 1+i). Trouver la similitude directe envoyant A sur A\' et B sur B\'.' },
  { num:'05', diff:'difficile', titre:'Similitudes et triangle équilatéral', enonce:'Montrer que si f est une similitude directe de rapport 1 et d\'angle 2π/3, alors le triangle (M, f(M), f²(M)) est équilatéral.' },
  { num:'06', diff:'difficile', titre:'Similitude indirecte', enonce:'f(z)=(1+i)z̄+2. 1) Montrer que f est une similitude indirecte. 2) Trouver son rapport. 3) Déterminer l\'axe de symétrie associé.' },
  { num:'07', diff:'bac', titre:'Exercice type Bac', enonce:'f(z)=(√3+i)z−2i. 1) Identifier la similitude (rapport, angle). 2) Trouver le point fixe Ω. 3) Écrire f sous la forme z\'−ω=a(z−ω). 4) Montrer que f³ est une homothétie et déterminer son rapport.' },
]

const COULEURS: Record<string,string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const LABELS: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', cor:'Corollaire' }
const NAV2 = [['CH 01','Nombres Complexes','complexes',''],['CH 02','Isométries du plan','isometries',''],['CH 03','Déplacements & Antidéplacements','deplacements',''],['CH 04','Similitudes','similitudes','active']]

export default function SimilitudesPage() {
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
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Tome I — Rappels</div>
                {[['limites','Continuité & Limites'],['suites','Suites réelles'],['derivabilite','Dérivabilité'],['fonctions-reciproques','Fonctions réciproques'],['primitives','Primitives & Intégrales']].map(([slug,titre]) => (
                  <Link key={slug} href={`/bac/maths/${slug}`} style={{ display:'block', fontSize:12, color:'var(--muted)', textDecoration:'none', marginBottom:5 }}>← {titre}</Link>
                ))}
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique les similitudes directes et indirectes homothéties et point fixe" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA — Similitudes</Link>
                  <Link href="/examens?ch=similitudes" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>📋 Examen blanc</Link>
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
