import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: 'Arithmétique — Division euclidienne', contenu: 'Pour a,b ∈ ℤ, b≠0 : ∃! q,r ∈ ℤ, a = bq + r avec 0 ≤ r < |b|. PGCD par algorithme d\'Euclide.' },
  { titre: 'Théorème de Bézout', contenu: 'PGCD(a,b) = d ⟺ ∃u,v ∈ ℤ, au + bv = d. Premiers entre eux : PGCD=1 ⟺ ∃u,v, au+bv=1.' },
  { titre: 'Congruences', contenu: 'a ≡ b [n] ⟺ n|(a-b). Propriétés : addition, multiplication, puissance. Petit théorème de Fermat : aᵖ ≡ a [p] si p premier.' },
  { titre: 'Matrices — Opérations', contenu: 'Addition : (A+B)ᵢⱼ = aᵢⱼ+bᵢⱼ. Produit : (AB)ᵢⱼ = Σₖ aᵢₖ·bₖⱼ. Attention : AB ≠ BA en général.' },
  { titre: 'Déterminant & Inverse', contenu: 'det(A)=ad-bc pour 2×2. A inversible ⟺ det(A)≠0. A⁻¹ = (1/det)·Com(A)ᵀ.' },
  { titre: 'Systèmes linéaires — Gauss', contenu: 'Pivot de Gauss : triangularisation puis remontée. Solutions : unique si det≠0, ∞ ou ∅ sinon. Rang = nb pivots.' },
  { titre: 'Polynômes', contenu: 'Degré, racines, factorisation. Théorème de d\'Alembert : tout P∈ℂ[X] de degré n a exactement n racines dans ℂ.' },
]

const EXERCICES = [
  { num: '01', titre: 'Algorithme d\'Euclide', diff: 'facile', enonce: 'Calculer PGCD(252, 105) par l\'algorithme d\'Euclide.' },
  { num: '02', titre: 'Identité de Bézout', diff: 'moyen', enonce: 'Trouver u,v ∈ ℤ tels que 252u + 105v = PGCD(252,105).' },
  { num: '03', titre: 'Congruences', diff: 'moyen', enonce: 'Calculer 7¹⁰⁰ mod 13 (utiliser le petit théorème de Fermat).' },
  { num: '04', titre: 'Produit de matrices', diff: 'facile', enonce: 'Calculer AB avec A=[[1,2],[3,4]] et B=[[2,0],[1,3]].' },
  { num: '05', titre: 'Inverse d\'une matrice', diff: 'moyen', enonce: 'Calculer A⁻¹ pour A=[[3,1],[5,2]]. Vérifier AA⁻¹=I.' },
  { num: '06', titre: 'Système par Gauss', diff: 'moyen', enonce: 'Résoudre par pivot de Gauss : x+2y+z=4, 2x+y-z=1, x-y+2z=3.' },
  { num: '07', titre: 'Rang et discussion', diff: 'difficile', enonce: 'Discuter selon λ les solutions de : x+y+z=1, x+λy+z=2, x+y+λz=3.' },
  { num: '08', titre: 'Racines de polynôme', diff: 'moyen', enonce: 'Factoriser P(x)=x³-6x²+11x-6 sachant que x=1 est racine.' },
  { num: '09', titre: 'Partiel type FST', diff: 'bac', enonce: 'Soit A une matrice 3×3. Calculer det(A), A⁻¹, et résoudre AX=B avec Gauss.' },
]

const TD = [
  { num: 'TD1', titre: 'Arithmétique & Bézout', annee: '2024', type: 'Partiel' },
  { num: 'TD2', titre: 'Congruences & Fermat', annee: '2023', type: 'Partiel' },
  { num: 'TD3', titre: 'Matrices & Déterminants', annee: '2022', type: 'Examen Final' },
  { num: 'TD4', titre: 'Systèmes & Gauss', annee: '2021', type: 'Examen Final' },
  { num: 'TD5', titre: 'Polynômes & Factorisation', annee: '2020', type: 'Partiel' },
]

export default function Algebre1Page() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/universite" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Université</Link>
          <span>›</span><span style={{ color: 'var(--muted)' }}>Semestre 1</span>
          <span>›</span><span style={{ color: 'var(--text)' }}>Algèbre 1</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>

            {/* MAIN */}
            <div>
              <span className="badge badge-purple" style={{ marginBottom: 12, display: 'inline-block' }}>Algèbre · Semestre 1</span>
              <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', marginBottom: 12 }}>Algèbre 1</h1>
              <p style={{ maxWidth: 520, marginBottom: 16 }}>Arithmétique dans ℤ, congruences, algèbre matricielle, systèmes linéaires et introduction aux polynômes.</p>
              <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--muted)', marginBottom: 36 }}>
                <span>📝 9 exercices</span><span>·</span><span>📋 10 ans de partiels</span><span>·</span><span>⏱ ~25h d'étude</span>
              </div>

              {/* Cours */}
              <h2 style={{ fontSize: 20, marginBottom: 16 }}>📖 Cours — Points clés</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {COURS.map((c, i) => (
                  <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18, display: 'flex', gap: 14 }}>
                    <div style={{ minWidth: 26, height: 26, background: 'linear-gradient(135deg,#7c3aed,#4f6ef7)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{i + 1}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{c.titre}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--teal)', background: 'rgba(6,214,160,0.06)', padding: '8px 12px', borderRadius: 8, lineHeight: 1.8 }}>{c.contenu}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Exercices */}
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

              {/* TD & Examens */}
              <h2 style={{ fontSize: 20, marginBottom: 16 }}>📋 TD & Examens FST (2015–2024)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {TD.map(td => (
                  <div key={td.num} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                        <span className="badge badge-purple">{td.type}</span>
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
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: 'var(--accent)' }}>60%</div>
                <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 100, margin: '8px 0 12px' }}>
                  <div style={{ height: '100%', width: '60%', background: 'linear-gradient(90deg,var(--accent),var(--teal))', borderRadius: 100 }} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>5 / 9 exercices complétés</div>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Actions rapides</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Link href="/chat?q=Explique le pivot de Gauss et les systèmes linéaires" className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>🤖 Chat IA Algèbre 1</Link>
                  <Link href="/solve" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>🧮 Solveur matrices</Link>
                  <Link href="/examens?level=universite" className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}>📋 Tous les examens</Link>
                </div>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Modules S1</div>
                {[
                  ['Analyse 1', '/universite/analyse1'],
                  ['Algèbre 1 (ici)', '#'],
                ].map(([l, h]) => (
                  <Link key={h} href={h} style={{ display: 'block', padding: '8px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 13, color: h === '#' ? 'var(--accent)' : 'var(--muted)', background: h === '#' ? 'rgba(79,110,247,0.1)' : 'transparent', marginBottom: 4 }}>{l}</Link>
                ))}
                <div style={{ fontSize: 11, color: 'var(--muted)', margin: '10px 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Semestre 2</div>
                {[
                  ['Analyse 2', '/universite/analyse2'],
                  ['Algèbre Linéaire', '/universite/algebre-lineaire'],
                ].map(([l, h]) => (
                  <Link key={h} href={h} style={{ display: 'block', padding: '8px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>{l}</Link>
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
