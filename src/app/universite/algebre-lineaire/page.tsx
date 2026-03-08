import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: 'Espace vectoriel', contenu: 'E est un ev sur ℝ si : fermé par + et ×scalaire, 0∈E, associativité, distributivité. Exemples : ℝⁿ, Mn(ℝ), ℝ[X].' },
  { titre: 'Sous-espace vectoriel', contenu: 'F⊂E est un sev ⟺ 0∈F, ∀u,v∈F u+v∈F, ∀λ∈ℝ ∀u∈F λu∈F. Critère : F≠∅ et stable par combinaison linéaire.' },
  { titre: 'Famille libre, génératrice, base', contenu: 'Libre : Σλᵢvᵢ=0 ⟹ tous λᵢ=0. Génératrice : tout vecteur s\'exprime. Base = libre + génératrice. dim(E) = nb vecteurs d\'une base.' },
  { titre: 'Application linéaire', contenu: 'f: E→F linéaire ⟺ f(λu+μv)=λf(u)+μf(v). Noyau: ker(f)={x:f(x)=0}. Image: Im(f)=f(E). Théorème rang: dim ker+dim Im=dim E.' },
  { titre: 'Matrice d\'une application', contenu: 'A=[f]ᴮᴮ\' représente f dans les bases B,B\'. Changement de base : A\'=P⁻¹AP. Matrice de passage P.' },
  { titre: 'Valeurs propres & vecteurs propres', contenu: 'Av=λv, v≠0. Polynôme caractéristique : χ_A(λ)=det(A-λI)=0. Sous-espace propre : E_λ=ker(A-λI).' },
  { titre: 'Diagonalisation', contenu: 'A diagonalisable ⟺ somme des dim(E_λ) = n. Alors A=PDP⁻¹ avec D diagonale et P=[vecteurs propres].' },
]

const EXERCICES = [
  { num: '01', titre: 'Vérifier un sev', diff: 'facile', enonce: 'F = {(x,y,z)∈ℝ³ : x+y+z=0}. Montrer que F est un sev de ℝ³ et donner une base.' },
  { num: '02', titre: 'Famille libre', diff: 'moyen', enonce: 'v1=(1,2,1), v2=(0,1,2), v3=(1,0,-3). Ces vecteurs forment-ils une base de ℝ³?' },
  { num: '03', titre: 'Noyau et image', diff: 'moyen', enonce: 'f(x,y,z)=(x+y, y+z, x+z). Calculer ker(f) et Im(f). Vérifier le th. du rang.' },
  { num: '04', titre: 'Valeurs propres 2×2', diff: 'facile', enonce: 'A=[[4,1],[2,3]]. Trouver les valeurs propres et vecteurs propres de A.' },
  { num: '05', titre: 'Diagonalisation 2×2', diff: 'moyen', enonce: 'A=[[3,1],[1,3]]. Diagonaliser A. En déduire Aⁿ.' },
  { num: '06', titre: 'Valeurs propres 3×3', diff: 'difficile', enonce: 'A=[[2,1,0],[0,2,1],[0,0,3]]. Polynôme caractéristique, valeurs propres, diagonalisable?' },
  { num: '07', titre: 'Changement de base', diff: 'difficile', enonce: 'Base canonique B, base B\'=(v1,v2,v3). Calculer la matrice de passage P et A\'=P⁻¹AP.' },
  { num: '08', titre: 'Partiel type FST', diff: 'bac', enonce: 'Application linéaire f définie par sa matrice A. Étude complète : ker, Im, rang, valeurs propres, diagonalisation, Aⁿ.' },
]

const TD = [
  { num: 'TD1', titre: 'Espaces vectoriels & sev', annee: '2024', type: 'Partiel' },
  { num: 'TD2', titre: 'Applications linéaires', annee: '2023', type: 'Partiel' },
  { num: 'TD3', titre: 'Valeurs propres', annee: '2022', type: 'Examen Final' },
  { num: 'TD4', titre: 'Diagonalisation', annee: '2021', type: 'Examen Final' },
  { num: 'TD5', titre: 'Calcul de Aⁿ', annee: '2020', type: 'Partiel' },
]

export default function AlgebreLineairePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/universite" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Université</Link>
          <span>›</span><span style={{ color: 'var(--muted)' }}>Semestre 2</span>
          <span>›</span><span style={{ color: 'var(--text)' }}>Algèbre Linéaire</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: 12, display: 'inline-block' }}>Algèbre · Semestre 2</span>
              <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', marginBottom: 12 }}>Algèbre Linéaire</h1>
              <p style={{ maxWidth: 520, marginBottom: 16 }}>Espaces vectoriels, applications linéaires, valeurs propres et diagonalisation de matrices.</p>
              <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--muted)', marginBottom: 36 }}>
                <span>📝 8 exercices</span><span>·</span><span>📋 10 ans de partiels</span><span>·</span><span>⏱ ~30h</span>
              </div>

              <h2 style={{ fontSize: 20, marginBottom: 16 }}>📖 Cours</h2>
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
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: 'var(--gold)' }}>55%</div>
                <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 100, margin: '8px 0 12px' }}>
                  <div style={{ height: '100%', width: '55%', background: 'linear-gradient(90deg,var(--gold),var(--orange))', borderRadius: 100 }} />
                </div>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Actions rapides</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Link href="/chat?q=Explique la diagonalisation de matrices" className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>🤖 Chat IA Algèbre Lin.</Link>
                  <Link href="/solve" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>🧮 Solveur</Link>
                </div>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Autres modules</div>
                {[['Analyse 1', '/universite/analyse1'], ['Algèbre 1', '/universite/algebre1'], ['Analyse 2', '/universite/analyse2'], ['Algèbre Lin. (ici)', '#']].map(([l, h]) => (
                  <Link key={h} href={h} style={{ display: 'block', padding: '7px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 13, color: h === '#' ? 'var(--accent)' : 'var(--muted)', background: h === '#' ? 'rgba(79,110,247,0.1)' : 'transparent', marginBottom: 2 }}>{l}</Link>
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
