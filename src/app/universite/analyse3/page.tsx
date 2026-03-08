import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: 'Séries numériques', contenu: 'Série Σuₙ converge si la suite des sommes partielles Sₙ converge. Critères : comparaison, ratio (d\'Alembert), racine (Cauchy), Riemann.' },
  { titre: 'Critère de d\'Alembert', contenu: 'Σuₙ (uₙ>0). lim uₙ₊₁/uₙ = L. Si L<1 : converge. Si L>1 : diverge. Si L=1 : indéterminé.' },
  { titre: 'Séries entières', contenu: 'Σaₙxⁿ. Rayon de convergence R = 1/limsup|aₙ|^(1/n). Converge abs. sur ]-R,R[. Diverge si |x|>R.' },
  { titre: 'Fonctions de deux variables', contenu: 'f: ℝ²→ℝ. Limite, continuité. Dérivées partielles : ∂f/∂x et ∂f/∂y. Gradient : ∇f = (∂f/∂x, ∂f/∂y).' },
  { titre: 'Différentielle & Règle chaîne', contenu: 'df = (∂f/∂x)dx + (∂f/∂y)dy. Si f(g(t),h(t)), alors df/dt = (∂f/∂x)g\'(t) + (∂f/∂y)h\'(t).' },
  { titre: 'Extrema de fonctions à 2 variables', contenu: 'Point critique : ∂f/∂x=0 et ∂f/∂y=0. Matrice hessienne H. si det H>0 et ∂²f/∂x²>0 : min. Si det H>0 et <0 : max. Si det H<0 : selle.' },
  { titre: 'Intégrale double', contenu: '∬_D f(x,y) dA = ∫∫ f(x,y) dx dy. Fubini : changer l\'ordre d\'intégration. Changement de variables, notamment polaires.' },
]

const EXERCICES = [
  { num: '01', titre: 'Convergence de série', diff: 'moyen', enonce: 'Étudier la convergence de Σ 1/n² et de Σ 1/n (séries de Riemann).' },
  { num: '02', titre: 'Critère de d\'Alembert', diff: 'moyen', enonce: 'Étudier la convergence de Σ n!/2ⁿ et de Σ xⁿ/n! pour x∈ℝ.' },
  { num: '03', titre: 'Rayon de convergence', diff: 'moyen', enonce: 'Trouver le rayon de convergence de Σ nˢxⁿ et Σ xⁿ/n.' },
  { num: '04', titre: 'Dérivées partielles', diff: 'facile', enonce: 'f(x,y) = x²y + xy³ - 3x. Calculer ∂f/∂x, ∂f/∂y et ∇f.' },
  { num: '05', titre: 'Règle de la chaîne', diff: 'moyen', enonce: 'f(x,y) = x²+y². x=t·cos(t), y=t·sin(t). Calculer df/dt.' },
  { num: '06', titre: 'Extrema', diff: 'difficile', enonce: 'f(x,y) = x³+y³-3xy. Trouver les points critiques et leur nature.' },
  { num: '07', titre: 'Intégrale double', diff: 'difficile', enonce: 'Calculer ∬_D (x+y) dA avec D = [0,1]×[0,1].' },
  { num: '08', titre: 'Intégrale en polaires', diff: 'difficile', enonce: 'Calculer ∬_D √(x²+y²) dA avec D = disque de rayon R centré en O.' },
  { num: '09', titre: 'Partiel type FST', diff: 'bac', enonce: 'Série + rayon de convergence + extrema d\'une fonction à 2 variables + intégrale double.' },
]

const TD = [
  { num: 'TD1', titre: 'Séries numériques & critères', annee: '2024', type: 'Partiel' },
  { num: 'TD2', titre: 'Séries entières', annee: '2023', type: 'Partiel' },
  { num: 'TD3', titre: 'Fonctions de 2 variables', annee: '2022', type: 'Examen Final' },
  { num: 'TD4', titre: 'Intégrales doubles', annee: '2021', type: 'Examen Final' },
  { num: 'TD5', titre: 'Synthèse Analyse 3', annee: '2020', type: 'Examen Final' },
]

export default function Analyse3Page() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/universite" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Université</Link>
          <span>›</span><span style={{ color: 'var(--muted)' }}>Semestre 3</span>
          <span>›</span><span style={{ color: 'var(--text)' }}>Analyse 3</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: 12, display: 'inline-block' }}>Analyse · Semestre 3</span>
              <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', marginBottom: 12 }}>Analyse 3</h1>
              <p style={{ maxWidth: 520, marginBottom: 16 }}>Séries numériques et entières, fonctions de deux variables, extrema et intégrales doubles.</p>
              <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--muted)', marginBottom: 36 }}>
                <span>📝 9 exercices</span><span>·</span><span>📋 10 ans de partiels</span><span>·</span><span>⏱ ~35h</span>
              </div>

              <h2 style={{ fontSize: 20, marginBottom: 16 }}>📖 Cours</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {COURS.map((c, i) => (
                  <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18, display: 'flex', gap: 14 }}>
                    <div style={{ minWidth: 26, height: 26, background: 'linear-gradient(135deg,#4f6ef7,#06d6a0)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{i + 1}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{c.titre}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--teal)', background: 'rgba(6,214,160,0.06)', padding: '8px 12px', borderRadius: 8, lineHeight: 1.8 }}>{c.contenu}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: 20, marginBottom: 16 }}>📝 Exercices</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {EXERCICES.map(ex => (
                  <div key={ex.num} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
                    <span className={`badge ${ex.diff === 'bac' ? 'badge-blue' : ex.diff === 'difficile' ? 'badge-red' : ex.diff === 'moyen' ? 'badge-gold' : 'badge-teal'}`} style={{ marginBottom: 8, display: 'inline-block' }}>{ex.diff}</span>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Ex {ex.num} — {ex.titre}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text2)', background: 'var(--bg2)', padding: '10px 14px', borderRadius: 8, marginBottom: 10 }}>{ex.enonce}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link href={`/solve?q=${encodeURIComponent(ex.enonce)}`} className="btn btn-primary btn-sm">🧮 Résoudre</Link>
                      <button className="btn btn-ghost btn-sm">📋 Correction</button>
                    </div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: 20, marginBottom: 16 }}>📋 TD & Examens FST (2015–2024)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {TD.map(td => (
                  <div key={td.num} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                        <span className="badge badge-blue">{td.type}</span>
                        <span className="badge badge-purple">{td.annee}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14 }}>{td.num} — {td.titre}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-primary btn-sm">📄 Sujet</button>
                      <button className="btn btn-secondary btn-sm">✅ Correction</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Progression</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: 'var(--accent)' }}>35%</div>
                <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 100, margin: '8px 0 12px' }}>
                  <div style={{ height: '100%', width: '35%', background: 'linear-gradient(90deg,var(--accent),var(--teal))', borderRadius: 100 }} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Module S3 — 3 / 9 exercices</div>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Actions rapides</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Link href="/chat?q=Explique les séries numériques et le critère de d'Alembert" className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>🤖 Chat IA Analyse 3</Link>
                  <Link href="/solve" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>🧮 Solveur</Link>
                </div>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Semestres</div>
                {[['S1 — Analyse 1', '/universite/analyse1'], ['S1 — Algèbre 1', '/universite/algebre1'], ['S2 — Analyse 2', '/universite/analyse2'], ['S2 — Algèbre Lin.', '/universite/algebre-lineaire'], ['S3 — Analyse 3 (ici)', '#'], ['S3 — Proba & Stats', '/universite/proba-stats']].map(([l, h]) => (
                  <Link key={h} href={h} style={{ display: 'block', padding: '6px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 12, color: h === '#' ? 'var(--accent)' : 'var(--muted)', background: h === '#' ? 'rgba(79,110,247,0.1)' : 'transparent', marginBottom: 2 }}>{l}</Link>
                ))}
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
