import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const COURS = [
  { titre: 'Développements limités (DL)', contenu: 'f(x) = f(a) + f\'(a)(x-a) + f\'\'(a)(x-a)²/2! + ... + f⁽ⁿ⁾(a)(x-a)ⁿ/n! + o((x-a)ⁿ).' },
  { titre: 'DL usuels en 0', contenu: 'eˣ = 1+x+x²/2!+...+xⁿ/n! | sin x = x-x³/3!+x⁵/5! | cos x = 1-x²/2!+x⁴/4! | ln(1+x) = x-x²/2+x³/3-...' },
  { titre: 'Applications des DL', contenu: 'Calcul de limites (formes ind.), équivalents, étude locale, comparaison asymptotique, développement d\'asymptote oblique.' },
  { titre: 'Intégrales impropres', contenu: '∫ₐ⁺∞ f(x)dx = lim(b→+∞) ∫ₐᵇ f(x)dx. Convergente si la limite existe et est finie. Critères de comparaison.' },
  { titre: 'EDO 2ème ordre', contenu: 'ay\'\'+by\'+cy=f(x). Sol générale = sol homogène + sol particulière. Méthode de variation des constantes.' },
  { titre: 'Intégrales à paramètre', contenu: 'F(t)=∫ₐᵇ f(x,t)dx. Si f continue, F continue. Si ∂f/∂t continue, F dérivable et F\'(t)=∫ₐᵇ ∂f/∂t dx (Leibniz).' },
]

const EXERCICES = [
  { num: '01', titre: 'DL d\'une fonction composée', diff: 'moyen', enonce: 'Donner le DL à l\'ordre 4 en 0 de f(x) = e^(sin x).' },
  { num: '02', titre: 'Limite par DL', diff: 'moyen', enonce: 'Calculer lim(x→0) (eˣ - 1 - x - x²/2) / x³.' },
  { num: '03', titre: 'Équivalent asymptotique', diff: 'moyen', enonce: 'Trouver un équivalent simple de f(x) = sin(x) - x + x³/6 quand x→0.' },
  { num: '04', titre: 'Intégrale impropre', diff: 'moyen', enonce: 'Étudier la convergence de ∫₁⁺∞ 1/x² dx et calculer sa valeur.' },
  { num: '05', titre: 'Intégrale impropre 2', diff: 'difficile', enonce: 'Étudier la convergence de ∫₀¹ ln(x) dx. Calculer sa valeur.' },
  { num: '06', titre: 'EDO 2ème ordre complète', diff: 'difficile', enonce: 'Résoudre y\'\' + y\' - 2y = 3eˣ. Sol. générale + particulière.' },
  { num: '07', titre: 'Dérivation sous intégrale', diff: 'difficile', enonce: 'F(t) = ∫₀¹ x^t dx. Calculer F(t) et F\'(t). Vérifier avec Leibniz.' },
  { num: '08', titre: 'Partiel type FST', diff: 'bac', enonce: 'DL + équivalent + intégrale impropre + EDO : exercice synthèse d\'examen final.' },
]

const TD = [
  { num: 'TD1', titre: 'Développements limités', annee: '2024', type: 'Partiel' },
  { num: 'TD2', titre: 'Intégrales impropres', annee: '2023', type: 'Partiel' },
  { num: 'TD3', titre: 'EDO 2ème ordre', annee: '2022', type: 'Examen Final' },
  { num: 'TD4', titre: 'Intégrales à paramètre', annee: '2021', type: 'Examen Final' },
]

export default function Analyse2Page() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center' }}>
          <Link href="/universite" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Université</Link>
          <span>›</span><span style={{ color: 'var(--muted)' }}>Semestre 2</span>
          <span>›</span><span style={{ color: 'var(--text)' }}>Analyse 2</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
            <div>
              <span className="badge badge-orange" style={{ marginBottom: 12, display: 'inline-block' }}>Analyse · Semestre 2</span>
              <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', marginBottom: 12 }}>Analyse 2</h1>
              <p style={{ maxWidth: 520, marginBottom: 16 }}>Développements limités, intégrales impropres, EDO du 2ème ordre et intégrales à paramètre.</p>
              <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--muted)', marginBottom: 36 }}>
                <span>📝 8 exercices</span><span>·</span><span>📋 10 ans de partiels</span><span>·</span><span>⏱ ~28h</span>
              </div>

              <h2 style={{ fontSize: 20, marginBottom: 16 }}>📖 Cours</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {COURS.map((c, i) => (
                  <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 18, display: 'flex', gap: 14 }}>
                    <div style={{ minWidth: 26, height: 26, background: 'linear-gradient(135deg,#f97316,#dc2626)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{i + 1}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{c.titre}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#fb923c', background: 'rgba(249,115,22,0.06)', padding: '8px 12px', borderRadius: 8, lineHeight: 1.8 }}>{c.contenu}</div>
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
                        <span className="badge badge-orange">{td.type}</span>
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
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: '#fb923c' }}>48%</div>
                <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 100, margin: '8px 0 12px' }}>
                  <div style={{ height: '100%', width: '48%', background: 'linear-gradient(90deg,#f97316,#dc2626)', borderRadius: 100 }} />
                </div>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Actions rapides</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Link href="/chat?q=Explique les développements limités et leurs applications" className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>🤖 Chat IA Analyse 2</Link>
                  <Link href="/solve" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>🧮 Solveur</Link>
                </div>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Autres modules</div>
                {[['Analyse 1', '/universite/analyse1'], ['Algèbre 1', '/universite/algebre1'], ['Analyse 2 (ici)', '#'], ['Algèbre Linéaire', '/universite/algebre-lineaire']].map(([l, h]) => (
                  <Link key={h} href={h} style={{ display: 'block', padding: '7px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 13, color: h === '#' ? '#fb923c' : 'var(--muted)', background: h === '#' ? 'rgba(249,115,22,0.1)' : 'transparent', marginBottom: 2 }}>{l}</Link>
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
