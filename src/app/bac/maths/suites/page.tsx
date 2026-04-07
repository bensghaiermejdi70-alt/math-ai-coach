'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const META = {
  tome: 'Tome I', ch: 'CH 02', badge: 'Analyse',
  titre: 'Suites Réelles', slug: 'suites',
  desc: 'Suites numériques : monotonie, convergence, théorèmes fondamentaux (suite monotone bornée, suites adjacentes, valeur adhérente).',
  heures: '~5h', nbEx: 28,
}

const THEOREMES = [
  {
    id:'T1', type:'def', nom:'Suite numérique',
    enonce:'Une suite réelle (uₙ) est une application de ℕ (ou partie de ℕ) dans ℝ. uₙ est le terme général de rang n.',
  },
  {
    id:'T2', type:'def', nom:'Suite arithmétique',
    enonce:'(uₙ) est arithmétique de raison r si : ∀n∈ℕ, uₙ₊₁ = uₙ + r. Terme général : uₙ = u₀ + nr. Somme : Sₙ = (n+1)(u₀+uₙ)/2.',
  },
  {
    id:'T3', type:'def', nom:'Suite géométrique',
    enonce:'(uₙ) est géométrique de raison q (q≠0) si : ∀n∈ℕ, uₙ₊₁ = q·uₙ. Terme général : uₙ = u₀·qⁿ. Somme (q≠1) : Sₙ = u₀·(1−qⁿ⁺¹)/(1−q).',
  },
  {
    id:'T4', type:'def', nom:'Suite croissante / décroissante',
    enonce:'(uₙ) est croissante si ∀n, uₙ₊₁ ≥ uₙ ; décroissante si ∀n, uₙ₊₁ ≤ uₙ. Pour l\'étudier : calculer uₙ₊₁−uₙ ou uₙ₊₁/uₙ (si uₙ>0).',
  },
  {
    id:'T5', type:'def', nom:'Suite bornée',
    enonce:'(uₙ) est majorée si ∃M∈ℝ, ∀n, uₙ ≤ M. Minorée si ∃m∈ℝ, ∀n, uₙ ≥ m. Bornée si à la fois majorée et minorée.',
  },
  {
    id:'T6', type:'def', nom:'Convergence — définition',
    enonce:'(uₙ) converge vers ℓ si : ∀ε>0, ∃N∈ℕ, ∀n≥N, |uₙ−ℓ|<ε. On note : lim(n→+∞) uₙ = ℓ. ℓ est appelée la limite de la suite.',
  },
  {
    id:'T7', type:'thm', nom:'Unicité de la limite',
    enonce:'Si (uₙ) converge, sa limite est unique.',
  },
  {
    id:'T8', type:'thm', nom:'Toute suite convergente est bornée',
    enonce:'Si (uₙ) converge, alors (uₙ) est bornée. La réciproque est fausse (ex : (−1)ⁿ).',
  },
  {
    id:'T9', type:'thm', nom:'Théorème — Suite monotone bornée',
    enonce:'Toute suite croissante et majorée converge. Toute suite décroissante et minorée converge.',
  },
  {
    id:'T10', type:'thm', nom:'Théorème des gendarmes pour les suites',
    enonce:'Si vₙ ≤ uₙ ≤ wₙ pour tout n, et lim vₙ = lim wₙ = ℓ, alors lim uₙ = ℓ.',
  },
  {
    id:'T11', type:'def', nom:'Suites adjacentes',
    enonce:'(uₙ) et (vₙ) sont adjacentes si : (uₙ) est croissante, (vₙ) est décroissante, et lim(vₙ−uₙ)=0.',
  },
  {
    id:'T12', type:'thm', nom:'Théorème des suites adjacentes',
    enonce:'Si (uₙ) et (vₙ) sont adjacentes, elles convergent vers la même limite ℓ, et ∀n : uₙ ≤ ℓ ≤ vₙ.',
  },
  {
    id:'T13', type:'thm', nom:'Suite récurrente — point fixe',
    enonce:'Soit uₙ₊₁ = f(uₙ). Si (uₙ) converge vers ℓ et f est continue en ℓ, alors ℓ est un point fixe de f : f(ℓ) = ℓ.',
  },
  {
    id:'T14', type:'prop', nom:'Suite récurrente linéaire d\'ordre 1',
    enonce:'uₙ₊₁ = a·uₙ + b (a≠1) : point fixe ℓ = b/(1−a). On pose vₙ = uₙ−ℓ. Alors (vₙ) est géométrique de raison a.',
  },
  {
    id:'T15', type:'thm', nom:'Limite d\'une suite géométrique',
    enonce:'Soit q∈ℝ. lim qⁿ = 0 si |q|<1 ; lim qⁿ = 1 si q=1 ; lim qⁿ = +∞ si q>1 ; (qⁿ) diverge si q≤−1.',
  },
  {
    id:'T16', type:'thm', nom:'Opérations sur les limites de suites',
    enonce:'Si lim uₙ = ℓ et lim vₙ = m : lim(uₙ+vₙ)=ℓ+m, lim(uₙ·vₙ)=ℓ·m, lim(uₙ/vₙ)=ℓ/m (m≠0). Formes indéterminées : ∞−∞, ∞/∞, 0×∞.',
  },
  {
    id:'T17', type:'formule', nom:'Limites usuelles de suites',
    enonce:'lim nᵅ = +∞ (α>0) | lim 1/nᵅ = 0 (α>0) | lim n!/nⁿ = 0 | lim (1+1/n)ⁿ = e | lim ln(n)/n = 0 | lim qⁿ/n! = 0',
  },
]

const EXERCICES = [
  { num:'01', titre:'Suite arithmétique', diff:'facile', enonce:'(uₙ) arithmétique : u₀=3, r=5. Calculer u₁₀ et S₁₀ = u₀+u₁+...+u₁₀.' },
  { num:'02', titre:'Suite géométrique', diff:'facile', enonce:'(uₙ) géométrique : u₀=2, q=3. Calculer u₅ et S₅ = u₀+...+u₅.' },
  { num:'03', titre:'Monotonie par différence', diff:'moyen', enonce:'uₙ = n/(n+1). Étudier la monotonie de (uₙ). Cette suite est-elle bornée ?' },
  { num:'04', titre:'Monotonie par quotient', diff:'moyen', enonce:'uₙ = 3ⁿ/n!. Étudier la monotonie puis la convergence.' },
  { num:'05', titre:'Suite récurrente — point fixe', diff:'moyen', enonce:'uₙ₊₁ = (uₙ+3)/2, u₀=1. Montrer que (uₙ) converge et trouver sa limite.' },
  { num:'06', titre:'Suite récurrente linéaire', diff:'moyen', enonce:'uₙ₊₁ = 2uₙ + 1, u₀=0. Déterminer la limite ou montrer la divergence.' },
  { num:'07', titre:'Gendarmes', diff:'moyen', enonce:'Montrer que lim(n→+∞) sin(n)/n = 0.' },
  { num:'08', titre:'Suites adjacentes', diff:'difficile', enonce:'uₙ = Σₖ₌₁ⁿ 1/k − ln(n). Montrer que (uₙ) converge (constante d\'Euler).' },
  { num:'09', titre:'Suite bornée non convergente', diff:'difficile', enonce:'Montrer que (uₙ) = (−1)ⁿ est bornée mais diverge.' },
  { num:'10', titre:'Exercice type Bac', diff:'bac', enonce:'uₙ₊₁ = √(2uₙ+3), u₀=1. 1) Montrer par récurrence que uₙ∈[1,3]. 2) Montrer que (uₙ) est croissante. 3) En déduire que (uₙ) converge et trouver sa limite.' },
]

const COULEURS: Record<string,string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const LABELS: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', cor:'Corollaire' }

export default function SuitesReellesPage() {
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
              <p style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>Programme CNP Tunisie · 4ème année secondaire Section Mathématiques</p>
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
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      <Link href={`/solve?q=${encodeURIComponent(ex.enonce)}`} className="btn btn-primary btn-sm">🧮 Résoudre avec IA</Link>
                      <button className="btn btn-ghost btn-sm">📋 Correction</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position:'sticky', top:100, display:'flex', flexDirection:'column', gap:16 }}>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Progression</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:32, color:'var(--gold)' }}>0%</div>
                <div style={{ height:6, background:'var(--surface2)', borderRadius:100, margin:'8px 0 12px' }}><div style={{ height:'100%', width:'0%', background:'linear-gradient(90deg,var(--gold),var(--orange))', borderRadius:100 }} /></div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>0 / {META.nbEx} exercices</div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Légende</div>
                {Object.entries(LABELS).map(([k,v]) => (
                  <div key={k} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, marginBottom:6 }}>
                    <div style={{ width:10, height:10, borderRadius:2, background:COULEURS[k], flexShrink:0 }} />
                    <span style={{ color:'var(--text2)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique les suites réelles convergentes en 4ème maths Tunisie" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA — Suites</Link>
                  <Link href="/examens?ch=suites" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>📋 Examen blanc</Link>
                </div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Navigation Tome I</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {[
                    ['CH 01','Continuité et Limites','limites',''],
                    ['CH 02','Suites réelles','suites','active'],
                    ['CH 03','Dérivabilité','derivabilite',''],
                    ['CH 04','Fonctions réciproques','fonctions-reciproques',''],
                    ['CH 05','Primitives et intégrales','primitives',''],
                  ].map(([ch,titre,slug,act]) => (
                    <Link key={slug} href={`/bac/maths/${slug}`} style={{ display:'flex', gap:8, padding:'6px 8px', borderRadius:8, background:act?'var(--surface2)':'transparent', fontSize:12, color:act?'var(--text)':'var(--muted)', textDecoration:'none', alignItems:'center' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', minWidth:32 }}>{ch}</span>
                      <span>{titre}</span>
                    </Link>
                  ))}
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
