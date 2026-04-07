'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const META = {
  tome: 'Tome I', ch: 'CH 01', badge: 'Analyse', couleur: '#4f6ef7',
  titre: 'Continuité et Limites', slug: 'limites',
  desc: 'Limites finies et infinies, prolongement par continuité, théorèmes fondamentaux (TVI, point fixe), asymptotes.',
  heures: '~6h', nbEx: 30,
}

const THEOREMES = [
  {
    id: 'T1', nom: 'Définition — Limite finie en un point',
    enonce: 'Soit f définie sur un voisinage de a (sauf peut-être en a). On dit que lim(x→a) f(x) = ℓ si : ∀ε>0, ∃δ>0, 0<|x−a|<δ ⟹ |f(x)−ℓ|<ε.',
    type: 'def',
  },
  {
    id: 'T2', nom: 'Unicité de la limite',
    enonce: 'Si f admet une limite en a, elle est unique.',
    type: 'thm',
  },
  {
    id: 'T3', nom: 'Opérations sur les limites',
    enonce: 'Si lim f = ℓ et lim g = m (ℓ,m ∈ ℝ), alors : lim(f+g)=ℓ+m, lim(f·g)=ℓ·m, lim(f/g)=ℓ/m si m≠0.',
    type: 'thm',
  },
  {
    id: 'T4', nom: 'Théorème des gendarmes (Sandwich)',
    enonce: 'Si g(x) ≤ f(x) ≤ h(x) au voisinage de a, et lim g = lim h = ℓ, alors lim f = ℓ.',
    type: 'thm',
  },
  {
    id: 'T5', nom: 'Limites usuelles fondamentales',
    enonce: 'lim(x→0) sin(x)/x = 1 | lim(x→0) (1−cos x)/x² = 1/2 | lim(x→0) (eˣ−1)/x = 1 | lim(x→0) ln(1+x)/x = 1 | lim(x→±∞)(1+1/x)ˣ = e',
    type: 'formule',
  },
  {
    id: 'T6', nom: 'Croissances comparées',
    enonce: 'Pour tout entier n≥1 et α>0 : lim(x→+∞) (ln x)/xᵅ = 0 | lim(x→+∞) xⁿ/eˣ = 0 | lim(x→+∞) eˣ/xⁿ = +∞',
    type: 'formule',
  },
  {
    id: 'T7', nom: 'Définition — Continuité en un point',
    enonce: 'f est continue en a ⟺ lim(x→a) f(x) = f(a). En particulier, f(a) doit être définie.',
    type: 'def',
  },
  {
    id: 'T8', nom: 'Continuité sur un intervalle',
    enonce: 'f est continue sur I si elle est continue en tout point de I. Toute fonction polynomiale, rationnelle (hors zéros du dénominateur), trigonométrique, exponentielle, logarithmique est continue sur son domaine.',
    type: 'prop',
  },
  {
    id: 'T9', nom: 'Théorème des Valeurs Intermédiaires (TVI)',
    enonce: 'Si f est continue sur [a,b] et k est compris entre f(a) et f(b), alors il existe c ∈ [a,b] tel que f(c) = k.',
    type: 'thm',
  },
  {
    id: 'T10', nom: 'Corollaire du TVI — Existence de zéro',
    enonce: 'Si f est continue sur [a,b] et f(a)·f(b) < 0, alors il existe c ∈ ]a,b[ tel que f(c) = 0.',
    type: 'cor',
  },
  {
    id: 'T11', nom: 'TVI — Version stricte (Unicité)',
    enonce: 'Si de plus f est strictement monotone sur [a,b], alors ce c est unique.',
    type: 'cor',
  },
  {
    id: 'T12', nom: 'Théorème du point fixe',
    enonce: 'Si f est continue sur [a,b] et f([a,b]) ⊂ [a,b], alors f admet au moins un point fixe : ∃c ∈ [a,b], f(c) = c.',
    type: 'thm',
  },
  {
    id: 'T13', nom: 'Prolongement par continuité',
    enonce: 'Si lim(x→a) f(x) = ℓ et f n\'est pas définie en a, on peut définir g par g(x)=f(x) si x≠a et g(a)=ℓ. g est continue en a.',
    type: 'def',
  },
  {
    id: 'T14', nom: 'Asymptote horizontale',
    enonce: 'La droite y = ℓ est asymptote horizontale à la courbe de f en +∞ (ou −∞) si lim(x→+∞) f(x) = ℓ (resp. lim(x→−∞) f(x) = ℓ).',
    type: 'def',
  },
  {
    id: 'T15', nom: 'Asymptote verticale',
    enonce: 'La droite x = a est asymptote verticale à la courbe de f si lim(x→a⁺) f(x) = ±∞ ou lim(x→a⁻) f(x) = ±∞.',
    type: 'def',
  },
  {
    id: 'T16', nom: 'Asymptote oblique',
    enonce: 'La droite y = ax+b est asymptote oblique à la courbe de f en +∞ si lim(x→+∞) [f(x) − (ax+b)] = 0. On calcule : a = lim f(x)/x, puis b = lim [f(x)−ax].',
    type: 'def',
  },
]

const EXERCICES = [
  { num:'01', titre:'Limite par substitution', diff:'facile', enonce:'Calculer lim(x→3) (x²−2x+1)' },
  { num:'02', titre:'Forme indét. 0/0 — factorisation', diff:'facile', enonce:'Calculer lim(x→2) (x²−4)/(x−2)' },
  { num:'03', titre:'Forme indét. ∞/∞', diff:'moyen', enonce:'Calculer lim(x→+∞) (3x²+2x−1)/(x²−5)' },
  { num:'04', titre:'Limite avec racine carrée', diff:'moyen', enonce:'Calculer lim(x→+∞) (√(x²+x) − x)' },
  { num:'05', titre:'Limite trigonométrique', diff:'moyen', enonce:'Calculer lim(x→0) sin(3x)/(2x)' },
  { num:'06', titre:'Gendarmes', diff:'moyen', enonce:'Calculer lim(x→0) x·sin(1/x) en utilisant les gendarmes' },
  { num:'07', titre:'Limite ln/puissance', diff:'difficile', enonce:'Calculer lim(x→+∞) ln(x)/√x' },
  { num:'08', titre:'Forme indét. ∞−∞', diff:'difficile', enonce:'Calculer lim(x→+∞) (√(x+1) − √(x−1))' },
  { num:'09', titre:'TVI — existence', diff:'moyen', enonce:'Montrer que x³+2x−5=0 admet une solution dans ]1,2[' },
  { num:'10', titre:'TVI — unicité', diff:'difficile', enonce:'Montrer que x³+2x−5=0 admet une unique solution dans ]1,2[' },
  { num:'11', titre:'Point fixe', diff:'difficile', enonce:'Montrer que f(x)=cos(x) admet un point fixe dans [0,π/2]' },
  { num:'12', titre:'Prolongement par continuité', diff:'moyen', enonce:'f(x)=(sin x)/x pour x≠0. Peut-on prolonger f en 0 par continuité ?' },
  { num:'13', titre:'Asymptotes — polynôme/racine', diff:'difficile', enonce:'Trouver les asymptotes de f(x)=√(x²+x+1)' },
  { num:'14', titre:'Exercice type Bac', diff:'bac', enonce:'f(x)=(2x²−x−3)/(x−1) si x≠1, f(1)=k. Déterminer k pour que f soit continue en 1. Étudier les asymptotes.' },
]

const COULEURS: Record<string,string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const LABELS: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', cor:'Corollaire' }

export default function LimitesContinuitePage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        {/* Breadcrumb */}
        <div style={{ borderBottom:'1px solid var(--border)', padding:'14px clamp(20px,5vw,60px)', display:'flex', gap:8, fontSize:13, color:'var(--muted)', alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/bac" style={{ color:'var(--muted)', textDecoration:'none' }}>Bac</Link><span>›</span>
          <Link href="/bac/maths" style={{ color:'var(--muted)', textDecoration:'none' }}>Section Maths</Link><span>›</span>
          <span style={{ color:'var(--muted)' }}>Tome I</span><span>›</span>
          <span style={{ color:'var(--text)' }}>{META.titre}</span>
        </div>

        <div className="container" style={{ paddingTop:40, paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>
            <div>
              {/* Header */}
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
                <span className="badge badge-blue">{META.tome} · {META.ch}</span>
                <span className="badge badge-blue">{META.badge}</span>
              </div>
              <h1 style={{ fontSize:'clamp(24px,4vw,38px)', marginBottom:12 }}>{META.titre}</h1>
              <p style={{ maxWidth:550, marginBottom:16, color:'var(--text2)' }}>{META.desc}</p>
              <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', marginBottom:40 }}>
                <span>📝 {META.nbEx} exercices</span><span>·</span><span>📋 Bac 2015–2024</span><span>·</span><span>⏱ {META.heures}</span>
              </div>

              {/* Théorèmes */}
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

              {/* Exercices */}
              <h2 style={{ fontSize:20, marginBottom:16 }}>📝 Exercices</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {EXERCICES.map(ex => (
                  <div key={ex.num} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:18 }}>
                    <span className={`badge ${ex.diff==='bac'?'badge-blue':ex.diff==='difficile'?'badge-red':ex.diff==='moyen'?'badge-gold':'badge-teal'}`} style={{ marginBottom:8, display:'inline-block' }}>{ex.diff}</span>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:14, marginBottom:8 }}>Ex {ex.num} — {ex.titre}</div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text2)', background:'var(--bg2)', padding:'10px 14px', borderRadius:8, marginBottom:10 }}>{ex.enonce}</div>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      <Link href={`/solve?q=${encodeURIComponent(ex.enonce)}`} className="btn btn-primary btn-sm">🧮 Résoudre avec IA</Link>
                      <button className="btn btn-ghost btn-sm">📋 Correction</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
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
                  <Link href="/chat?q=Explique les limites et la continuité en 4ème maths Tunisie" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA — Limites</Link>
                  <Link href="/examens?ch=limites" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>📋 Examen blanc</Link>
                </div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Navigation Tome I</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {[
                    ['CH 01','Continuité et Limites','limites','active'],
                    ['CH 02','Suites réelles','suites',''],
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
