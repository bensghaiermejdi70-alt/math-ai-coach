'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const META = { tome:'Tome I', ch:'CH 03', badge:'Analyse', titre:'Dérivabilité', desc:'Dérivabilité en un point, dérivées des fonctions usuelles, règles de dérivation, théorèmes de Rolle et des accroissements finis, applications à l\'étude de fonctions.', heures:'~6h', nbEx:32 }

const THEOREMES = [
  { id:'T1', type:'def', nom:'Dérivabilité en un point', enonce:'f est dérivable en a si lim(x→a) [f(x)−f(a)]/(x−a) existe et est finie. Cette limite est notée f\'(a).' },
  { id:'T2', type:'def', nom:'Nombre dérivé — interprétation géométrique', enonce:'f\'(a) est le coefficient directeur de la tangente à la courbe de f au point A(a, f(a)). Équation de la tangente : y = f\'(a)(x−a) + f(a).' },
  { id:'T3', type:'prop', nom:'Dérivabilité ⟹ Continuité', enonce:'Si f est dérivable en a, alors f est continue en a. La réciproque est fausse (ex : f(x)=|x| en 0).' },
  { id:'T4', type:'formule', nom:'Dérivées des fonctions usuelles', enonce:'(xⁿ)\'=nxⁿ⁻¹ | (√x)\'=1/(2√x) | (eˣ)\'=eˣ | (ln x)\'=1/x | (sin x)\'=cos x | (cos x)\'=−sin x | (tan x)\'=1/cos²x | (constante)\'=0' },
  { id:'T5', type:'formule', nom:'Règles de dérivation', enonce:'(u+v)\'=u\'+v\' | (ku)\'=ku\' | (uv)\'=u\'v+uv\' | (u/v)\'=(u\'v−uv\')/v² | (uⁿ)\'=n·u\'·uⁿ⁻¹ | (√u)\'=u\'/(2√u) | (eᵘ)\'=u\'eᵘ | (ln u)\'=u\'/u' },
  { id:'T6', type:'formule', nom:'Dérivée de la composée', enonce:'Si h(x)=f(g(x)), alors h\'(x)=f\'(g(x))·g\'(x). Cas particuliers : (f(ax+b))\'=a·f\'(ax+b).' },
  { id:'T7', type:'thm', nom:'Théorème de Rolle', enonce:'Si f est continue sur [a,b], dérivable sur ]a,b[ et f(a)=f(b), alors il existe c ∈ ]a,b[ tel que f\'(c)=0.' },
  { id:'T8', type:'thm', nom:'Théorème des Accroissements Finis (TAF)', enonce:'Si f est continue sur [a,b] et dérivable sur ]a,b[, alors il existe c ∈ ]a,b[ tel que : f(b)−f(a) = f\'(c)·(b−a).' },
  { id:'T9', type:'cor', nom:'Inégalité des accroissements finis', enonce:'Si |f\'(x)| ≤ M sur ]a,b[, alors |f(b)−f(a)| ≤ M·|b−a|.' },
  { id:'T10', type:'thm', nom:'Lien dérivée — monotonie', enonce:'f dérivable sur I. f est croissante sur I ⟺ f\'≥0 sur I (avec égalité seulement en des points isolés). f est constante ⟺ f\'=0 sur I.' },
  { id:'T11', type:'thm', nom:'Extremum local — condition nécessaire', enonce:'Si f est dérivable en a et admet un extremum local en a, alors f\'(a)=0.' },
  { id:'T12', type:'thm', nom:'Règle de L\'Hôpital', enonce:'Si lim f(x) = lim g(x) = 0 (ou ±∞) et g\'(x) ≠ 0 au voisinage de a, alors : lim f(x)/g(x) = lim f\'(x)/g\'(x) (si cette dernière limite existe).' },
  { id:'T13', type:'def', nom:'Dérivée seconde et convexité', enonce:'f est convexe sur I si f\'\'≥0 sur I (courbe au-dessus de ses tangentes). f est concave si f\'\'≤0. Un point d\'inflexion est un point où f\'\' change de signe.' },
]

const EXERCICES = [
  { num:'01', titre:'Calcul de nombre dérivé', diff:'facile', enonce:'Calculer f\'(2) pour f(x)=x³−3x+1 en utilisant la définition.' },
  { num:'02', titre:'Équation de tangente', diff:'facile', enonce:'f(x)=eˣ. Écrire l\'équation de la tangente en x=0.' },
  { num:'03', titre:'Règle de dérivation (produit)', diff:'moyen', enonce:'Dériver f(x) = (x²+1)·eˣ.' },
  { num:'04', titre:'Règle de dérivation (quotient)', diff:'moyen', enonce:'Dériver f(x) = (2x+1)/(x−1) sur son domaine.' },
  { num:'05', titre:'Dérivée composée', diff:'moyen', enonce:'Dériver f(x) = ln(x²+x+1).' },
  { num:'06', titre:'Étude complète — tableau de variation', diff:'difficile', enonce:'f(x) = x·eˣ. Calculer f\'. Dresser le tableau de variation. Trouver l\'extremum.' },
  { num:'07', titre:'Théorème de Rolle', diff:'difficile', enonce:'Appliquer le théorème de Rolle à f(x)=x³−3x sur [−1,1] et trouver c.' },
  { num:'08', titre:'TAF — inégalité', diff:'difficile', enonce:'Montrer que pour tout x>0 : x/(1+x) < ln(1+x) < x. (Utiliser TAF sur f=ln).' },
  { num:'09', titre:'Convexité et inflexion', diff:'moyen', enonce:'f(x) = x³−6x²+9x. Trouver les points d\'inflexion et étudier la convexité.' },
  { num:'10', titre:'Exercice type Bac', diff:'bac', enonce:'f(x) = (x−1)eˣ. 1) Calculer f\'(x) et f\'\'(x). 2) Étudier les variations. 3) Étudier la convexité. 4) Tracer la courbe représentative.' },
]

const COULEURS: Record<string,string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const LABELS: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', cor:'Corollaire' }

export default function DerivabilitePage() {
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
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique la dérivabilité et le théorème des accroissements finis" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA — Dérivées</Link>
                  <Link href="/examens?ch=derivabilite" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>📋 Examen blanc</Link>
                </div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Navigation Tome I</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {[['CH 01','Continuité et Limites','limites',''],['CH 02','Suites réelles','suites',''],['CH 03','Dérivabilité','derivabilite','active'],['CH 04','Fonctions réciproques','fonctions-reciproques',''],['CH 05','Primitives et intégrales','primitives','']].map(([ch,titre,slug,act]) => (
                    <Link key={slug} href={`/bac/maths/${slug}`} style={{ display:'flex', gap:8, padding:'6px 8px', borderRadius:8, background:act?'var(--surface2)':'transparent', fontSize:12, color:act?'var(--text)':'var(--muted)', textDecoration:'none', alignItems:'center' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', minWidth:32 }}>{ch}</span><span>{titre}</span>
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
