import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: 'Espaces de probabilité', contenu: '(Ω, A, P) : univers Ω, tribu A (ensemble d\'événements), probabilité P : A→[0,1] avec P(Ω)=1 et σ-additivité.' },
  { titre: 'Variables aléatoires réelles', contenu: 'X : Ω→ℝ mesurable. Loi de X = image de P par X. Fonction de répartition F_X(x) = P(X≤x). Continue si F continue.' },
  { titre: 'Espérance & Variance', contenu: 'E(X) = ∫x dF(x). V(X) = E(X²) - [E(X)]². σ(X) = √V(X). Linéarité : E(aX+b) = aE(X)+b.' },
  { titre: 'Lois discrètes usuelles', contenu: 'Bernoulli B(p). Binomiale B(n,p). Poisson P(λ) : P(X=k)=e^(-λ)λᵏ/k!. Géométrique G(p).' },
  { titre: 'Lois continues usuelles', contenu: 'Uniforme U[a,b]. Exponentielle Exp(λ). Normale N(μ,σ²) : densité gaussienne. Chi2, Student (notions).' },
  { titre: 'Estimateurs & Intervalles de confiance', contenu: 'Estimateur θ̂ non biaisé si E(θ̂)=θ. IC(θ, 1-α) : intervalle aléatoire contenant θ avec proba 1-α.' },
  { titre: 'Tests statistiques', contenu: 'H₀ hypothèse nulle vs H₁. Risque α (1ère espèce). Région critique. Tests Z, t-Student, Chi² d\'ajustement.' },
]

const EXERCICES = [
  { num: '01', titre: 'Loi discrète — tableau', diff: 'facile', enonce: 'X prend les valeurs 0,1,2,3 avec P(X=k)=k/6. Vérifier, calculer E(X) et V(X).' },
  { num: '02', titre: 'Loi de Poisson', diff: 'moyen', enonce: 'X~P(3). Calculer P(X=0), P(X≤2), P(X≥1). Calculer E(X) et V(X).' },
  { num: '03', titre: 'Loi normale', diff: 'moyen', enonce: 'X~N(10, 4). Calculer P(8≤X≤12) et P(X>13). Centrage-réduction.' },
  { num: '04', titre: 'Fonction de répartition', diff: 'moyen', enonce: 'f(x) = 2x sur [0,1], 0 sinon. Calculer F(x), E(X), V(X).' },
  { num: '05', titre: 'Loi exponentielle', diff: 'moyen', enonce: 'Durée de vie X~Exp(0.5). P(X>3)? P(X>5|X>2)? (sans-mémoire)' },
  { num: '06', titre: 'Intervalle de confiance', diff: 'difficile', enonce: 'Échantillon n=100, x̄=25, s=4. IC à 95% pour μ.' },
  { num: '07', titre: 'Test statistique', diff: 'difficile', enonce: 'H₀: μ=50, H₁: μ≠50. n=36, x̄=52, σ=6. Test Z au niveau α=5%.' },
  { num: '08', titre: 'Chi² d\'ajustement', diff: 'difficile', enonce: 'Dé équilibré : 60 lancers. Tester H₀ : dé équilibré. Calculer χ² et conclure.' },
  { num: '09', titre: 'Partiel type FST', diff: 'bac', enonce: 'Problème complet : VAR + espérance + IC + test d\'hypothèse.' },
]

const TD = [
  { num: 'TD1', titre: 'Variables aléatoires discrètes', annee: '2024', type: 'Partiel' },
  { num: 'TD2', titre: 'Variables aléatoires continues', annee: '2023', type: 'Partiel' },
  { num: 'TD3', titre: 'Lois normales et approximations', annee: '2022', type: 'Examen Final' },
  { num: 'TD4', titre: 'Estimation et IC', annee: '2021', type: 'Examen Final' },
  { num: 'TD5', titre: 'Tests d\'hypothèses', annee: '2020', type: 'Examen Final' },
]

export default function ProbaStatsPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/universite" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Université</Link>
          <span>›</span><span style={{ color: 'var(--muted)' }}>Semestre 3/4</span>
          <span>›</span><span style={{ color: 'var(--text)' }}>Probabilités & Statistiques</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: 12, display: 'inline-block' }}>Probabilités · Semestre 3–4</span>
              <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', marginBottom: 12 }}>Probabilités & Statistiques</h1>
              <p style={{ maxWidth: 520, marginBottom: 16 }}>Variables aléatoires, lois de probabilité, estimation et tests statistiques — niveau licence FST.</p>
              <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--muted)', marginBottom: 36 }}>
                <span>📝 9 exercices</span><span>·</span><span>📋 10 ans de partiels</span><span>·</span><span>⏱ ~30h</span>
              </div>

              <h2 style={{ fontSize: 20, marginBottom: 16 }}>📖 Cours</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {COURS.map((c, i) => (
                  <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18, display: 'flex', gap: 14 }}>
                    <div style={{ minWidth: 26, height: 26, background: 'linear-gradient(135deg,#f5c842,#f97316)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#07080f', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{i + 1}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{c.titre}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)', background: 'rgba(245,200,66,0.06)', padding: '8px 12px', borderRadius: 8, lineHeight: 1.8 }}>{c.contenu}</div>
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
                        <span className="badge badge-gold">{td.type}</span>
                        <span className="badge badge-blue">{td.annee}</span>
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
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: 'var(--gold)' }}>40%</div>
                <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 100, margin: '8px 0 12px' }}>
                  <div style={{ height: '100%', width: '40%', background: 'linear-gradient(90deg,var(--gold),var(--orange))', borderRadius: 100 }} />
                </div>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Actions rapides</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Link href="/chat?q=Explique les lois de probabilité et les tests statistiques" className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>🤖 Chat IA Proba</Link>
                  <Link href="/solve" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>🧮 Solveur</Link>
                </div>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tous les modules</div>
                {[['S1 — Analyse 1', '/universite/analyse1'], ['S1 — Algèbre 1', '/universite/algebre1'], ['S2 — Analyse 2', '/universite/analyse2'], ['S2 — Algèbre Lin.', '/universite/algebre-lineaire'], ['S3 — Analyse 3', '/universite/analyse3'], ['S3 — Proba (ici)', '#']].map(([l, h]) => (
                  <Link key={h} href={h} style={{ display: 'block', padding: '6px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 12, color: h === '#' ? 'var(--gold)' : 'var(--muted)', background: h === '#' ? 'rgba(245,200,66,0.1)' : 'transparent', marginBottom: 2 }}>{l}</Link>
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
