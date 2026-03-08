import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre:'Logique & Raisonnement', contenu:'∀, ∃, ⇒, ⇔. Méthodes : direct, contraposée, absurde, récurrence.' },
  { titre:'Suites réelles — Convergence', contenu:'(uₙ) converge vers L si ∀ε>0, ∃N, ∀n≥N, |uₙ-L|<ε. Critères : monotone+bornée ⇒ convergente.' },
  { titre:'Théorème des gendarmes', contenu:'Si aₙ ≤ uₙ ≤ bₙ et lim aₙ = lim bₙ = L, alors lim uₙ = L.' },
  { titre:'Limites & Continuité avancées', contenu:'f continue en x₀ ⟺ lim(x→x₀) f(x) = f(x₀). TVI : si f continue sur [a,b] et f(a)·f(b)<0 alors ∃c : f(c)=0.' },
  { titre:'Fonctions monotones', contenu:'f strictement croissante sur I ⟺ ∀x,y∈I, x<y ⟹ f(x)<f(y). Bijection ⟺ strictement monotone.' },
]

const TD_SERIES = [
  { num:'TD 01', titre:'Logique et ensembles', annee:'2024', type:'Partiel', diff:'moyen' },
  { num:'TD 02', titre:'Suites numériques — convergence', annee:'2023', type:'Partiel', diff:'difficile' },
  { num:'TD 03', titre:'Limites et continuité', annee:'2022', type:'Examen Final', diff:'difficile' },
  { num:'TD 04', titre:'Théorème des valeurs intermédiaires', annee:'2021', type:'Partiel', diff:'moyen' },
  { num:'TD 05', titre:'Fonctions et bijections', annee:'2020', type:'Examen Final', diff:'difficile' },
]

export default function Analyse1Page() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center' }}>
          <Link href="/universite" style={{ color:'var(--muted)', textDecoration:'none' }}>Université</Link>
          <span>›</span>
          <span style={{ color:'var(--text)' }}>Analyse 1 — Semestre 1</span>
        </div>

        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              <span className="badge badge-orange" style={{ marginBottom:12, display:'inline-block' }}>Semestre 1 · Analyse</span>
              <h1 style={{ fontSize:'clamp(24px,4vw,42px)', marginBottom:12 }}>Analyse 1</h1>
              <p style={{ maxWidth:500, marginBottom:16 }}>Fondements de l'analyse mathématique universitaire — logique, suites, limites et continuité.</p>
              <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', marginBottom:36 }}>
                <span>📝 40 exercices</span><span>·</span><span>📋 10 ans de partiels</span><span>·</span><span>⏱ ~20h</span>
              </div>

              <h2 style={{ fontSize:22, marginBottom:20 }}>📖 Cours — Points clés</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:36 }}>
                {COURS.map((c, i) => (
                  <div key={i} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:20, display:'flex', gap:14 }}>
                    <div style={{ minWidth:26, height:26, background:'linear-gradient(135deg,#f97316,#dc2626)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:11, color:'white', flexShrink:0 }}>{i+1}</div>
                    <div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:14, marginBottom:6 }}>{c.titre}</div>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'#fb923c', background:'rgba(249,115,22,0.06)', padding:'8px 12px', borderRadius:8, lineHeight:1.8 }}>{c.contenu}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize:22, marginBottom:20 }}>📋 TD & Examens (2015-2024)</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {TD_SERIES.map(td => (
                  <div key={td.num} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:18, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
                    <div>
                      <div style={{ display:'flex', gap:8, marginBottom:6 }}>
                        <span className={`badge ${td.diff==='difficile'?'badge-red':'badge-gold'}`}>{td.diff}</span>
                        <span className="badge badge-blue">{td.type}</span>
                        <span className="badge badge-purple">{td.annee}</span>
                      </div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:15 }}>{td.num} — {td.titre}</div>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      <button className="btn btn-primary btn-sm">📄 Voir sujet</button>
                      <button className="btn btn-secondary btn-sm">✅ Correction</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ position:'sticky', top:100, display:'flex', flexDirection:'column', gap:16 }}>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Modules S1</div>
                {[['Analyse 1 (ici)','#'],['Algèbre 1','/universite/algebre1']].map(([l,h]) => (
                  <Link key={l} href={h} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:8, textDecoration:'none', fontSize:13, color: h==='#' ? 'var(--accent)' : 'var(--muted)', background: h==='#' ? 'rgba(79,110,247,0.1)' : 'transparent', marginBottom:4, transition:'all 0.2s' }}>{l}</Link>
                ))}
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique la convergence des suites en Analyse 1" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA Analyse 1</Link>
                  <Link href="/solve" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>🧮 Solveur</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:900px){.container>div{grid-template-columns:1fr!important;}}`}</style>
    </>
  )
}
