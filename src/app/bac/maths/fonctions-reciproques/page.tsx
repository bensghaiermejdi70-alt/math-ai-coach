'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const META = { tome:'Tome I', ch:'CH 04', badge:'Analyse', section:'Section Mathématiques', titre:'Fonctions réciproques', slug:'fonctions-reciproques', basePath:'/bac/maths', desc:'Bijections, fonctions réciproques, fonctions circulaires réciproques (arcsin, arccos, arctan) et leurs propriétés.', heures:'~5h', nbEx:26 }

const THEOREMES = [
  { id:'T1', type:'def', nom:'Injection, Surjection, Bijection', enonce:'f:E→F est injective si f(x)=f(y)⟹x=y. Surjective si ∀y∈F, ∃x∈E, f(x)=y. Bijective si injective et surjective. Toute fonction continue et strictement monotone est bijective sur son image.' },
  { id:'T2', type:'thm', nom:'Existence de la réciproque', enonce:'f bijective de E sur F admet une unique réciproque f⁻¹:F→E définie par : y=f(x) ⟺ x=f⁻¹(y). On a f∘f⁻¹=IdF et f⁻¹∘f=IdE.' },
  { id:'T3', type:'prop', nom:'Courbe de f⁻¹ — symétrie', enonce:'La courbe de f⁻¹ est le symétrique de la courbe de f par rapport à la première bissectrice y=x.' },
  { id:'T4', type:'thm', nom:'Dérivée de la réciproque', enonce:'Si f est dérivable en a et f\'(a)≠0, alors f⁻¹ est dérivable en b=f(a) et : (f⁻¹)\'(b) = 1/f\'(a) = 1/f\'(f⁻¹(b)).' },
  { id:'T5', type:'def', nom:'Fonction arcsin', enonce:'arcsin est la réciproque de sin restreinte à [−π/2,π/2]. Domaine : [−1,1]. Image : [−π/2,π/2]. arcsin(sin x)=x pour x∈[−π/2,π/2]. sin(arcsin x)=x pour x∈[−1,1].' },
  { id:'T6', type:'formule', nom:'Dérivée de arcsin', enonce:'arcsin\'(x) = 1/√(1−x²) pour x∈]−1,1[.' },
  { id:'T7', type:'def', nom:'Fonction arccos', enonce:'arccos est la réciproque de cos restreinte à [0,π]. Domaine : [−1,1]. Image : [0,π]. arccos(cos x)=x pour x∈[0,π]. Relation : arcsin(x)+arccos(x)=π/2.' },
  { id:'T8', type:'formule', nom:'Dérivée de arccos', enonce:'arccos\'(x) = −1/√(1−x²) pour x∈]−1,1[.' },
  { id:'T9', type:'def', nom:'Fonction arctan', enonce:'arctan est la réciproque de tan restreinte à ]−π/2,π/2[. Domaine : ℝ. Image : ]−π/2,π/2[. Limites : lim(x→+∞) arctan x = π/2 ; lim(x→−∞) arctan x = −π/2.' },
  { id:'T10', type:'formule', nom:'Dérivée de arctan', enonce:'arctan\'(x) = 1/(1+x²) pour x∈ℝ.' },
  { id:'T11', type:'formule', nom:'Formules trigonométriques réciproques', enonce:'arctan(x)+arctan(1/x)=π/2 (x>0) | arctan(x)+arctan(1/x)=−π/2 (x<0) | 2arctan(x)=arcsin(2x/(1+x²)) si |x|≤1' },
  { id:'T12', type:'thm', nom:'Continuité de la réciproque', enonce:'Si f est continue et strictement monotone sur I, alors f⁻¹ est continue et strictement monotone (même sens) sur f(I).' },
]

const EXERCICES = [
  { num:'01', titre:'Vérification de la bijection', diff:'facile', enonce:'Montrer que f(x)=2x+3 est bijective de ℝ dans ℝ et déterminer f⁻¹.' },
  { num:'02', titre:'Réciproque de eˣ', diff:'facile', enonce:'f(x)=eˣ. Déterminer f⁻¹ et représenter les deux courbes.' },
  { num:'03', titre:'arcsin — calcul', diff:'moyen', enonce:'Calculer : arcsin(1/2), arccos(−1), arctan(√3).' },
  { num:'04', titre:'arctan — équation', enonce:'Résoudre : arctan(x)=π/4, puis arctan(2x)+arctan(x)=π/4.', diff:'moyen' },
  { num:'05', titre:'Dérivée avec arcsin', diff:'moyen', enonce:'Dériver f(x) = arcsin(2x−1) sur son domaine.' },
  { num:'06', titre:'Dérivée avec arctan', diff:'moyen', enonce:'Dériver f(x) = arctan(x²).' },
  { num:'07', titre:'Étude de f⁻¹', diff:'difficile', enonce:'f(x)=x³+x. Montrer que f est bijective de ℝ dans ℝ. Calculer (f⁻¹)\'(2).' },
  { num:'08', titre:'Exercice type Bac', diff:'bac', enonce:'f(x) = arctan(x)+arctan(1/x) pour x>0. Calculer f\'(x). Que peut-on conclure ? Déterminer la valeur exacte de f.' },
]

const COULEURS: Record<string,string> = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', cor:'#ec4899' }
const LABELS: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', cor:'Corollaire' }
const NAV = [['CH 01','Continuité et Limites','limites',''],['CH 02','Suites réelles','suites',''],['CH 03','Dérivabilité','derivabilite',''],['CH 04','Fonctions réciproques','fonctions-reciproques','active'],['CH 05','Primitives et intégrales','primitives','']]

export default function FonctionsReciproquesPage() {
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
              <div style={{ display:'flex', gap:20, fontSize:13, color:'var(--muted)', marginBottom:40 }}><span>📝 {META.nbEx} exercices</span><span>·</span><span>⏱ {META.heures}</span></div>
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
                    <div style={{ display:'flex', gap:8 }}><Link href={`/solve?q=${encodeURIComponent(ex.enonce)}`} className="btn btn-primary btn-sm">🧮 Résoudre avec IA</Link><button className="btn btn-ghost btn-sm">📋 Correction</button></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position:'sticky', top:100, display:'flex', flexDirection:'column', gap:16 }}>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Navigation Tome I</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {NAV.map(([ch,titre,slug,act]) => (
                    <Link key={slug} href={`/bac/maths/${slug}`} style={{ display:'flex', gap:8, padding:'6px 8px', borderRadius:8, background:act?'var(--surface2)':'transparent', fontSize:12, color:act?'var(--text)':'var(--muted)', textDecoration:'none', alignItems:'center' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', minWidth:32 }}>{ch}</span><span>{titre}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <Link href="/chat?q=Explique arcsin arccos arctan et les fonctions réciproques" className="btn btn-primary btn-sm" style={{ justifyContent:'center' }}>🤖 Chat IA</Link>
                  <Link href="/examens?ch=fonctions-reciproques" className="btn btn-ghost btn-sm" style={{ justifyContent:'center' }}>📋 Examen blanc</Link>
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
