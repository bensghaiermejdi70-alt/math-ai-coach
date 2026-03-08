import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const features = [
  { icon:'🧮', title:'Solveur Étape par Étape', desc:'Résolution détaillée avec toutes les étapes. Pas juste le résultat — la démarche complète.', color:'rgba(79,110,247,0.15)' },
  { icon:'🤖', title:'Chat IA Professeur', desc:'Pose tes questions en français. L\'IA t\'explique comme un vrai enseignant du programme tunisien.', color:'rgba(124,58,237,0.15)' },
  { icon:'📝', title:'Examens Bac Corrigés', desc:'10 ans d\'examens officiels avec corrections complètes, exercice par exercice.', color:'rgba(245,200,66,0.15)' },
  { icon:'📚', title:'Programme Officiel', desc:'Chaque chapitre du Bac et de la Licence FST — organisé par trimestre et semestre.', color:'rgba(6,214,160,0.15)' },
  { icon:'🎯', title:'Exercices Interactifs', desc:'Entraîne-toi avec des exercices générés automatiquement selon ton niveau.', color:'rgba(249,115,22,0.15)' },
  { icon:'📈', title:'Suivi de Progression', desc:'Coach IA personnalisé — détecte tes points faibles et crée ton programme.', color:'rgba(239,68,68,0.15)' },
]

const stats = [
  { num:'10+', label:'Ans d\'examens' },
  { num:'100%', label:'Programme officiel' },
  { num:'3', label:'Pays couverts' },
  { num:'24/7', label:'Prof IA dispo' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1 }}>

        {/* ── HERO ── */}
        <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'100px clamp(20px,5vw,60px) 60px' }}>
          <div style={{ maxWidth:720 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(79,110,247,0.1)', border:'1px solid rgba(79,110,247,0.3)', borderRadius:100, padding:'5px 14px', fontFamily:'var(--font-mono)', fontSize:11, color:'var(--accent)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:24, animation:'fadeInDown 0.8s ease both' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--teal)', animation:'pulse 2s ease infinite', display:'inline-block' }} />
              IA Pédagogique · Programme Officiel Tunisie
            </div>

            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(28px,5vw,58px)', lineHeight:1.1, letterSpacing:'-0.03em', marginBottom:20, animation:'fadeInUp 0.8s ease 0.1s both' }}>
              Ton Professeur de<br/>
              <span style={{ background:'linear-gradient(90deg,#4f6ef7,#06d6a0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Mathématiques</span><br/>
              <span style={{ background:'linear-gradient(90deg,#f5c842,#f97316)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Alimenté par l'IA</span>
            </h1>

            <p style={{ fontSize:'clamp(14px,1.5vw,17px)', color:'var(--muted)', maxWidth:540, margin:'0 auto 32px', fontWeight:300, lineHeight:1.7, animation:'fadeInUp 0.8s ease 0.2s both' }}>
              Résolution d'exercices étape par étape, examens Bac corrigés, chat IA professeur — adaptés aux programmes officiels de Tunisie, Maroc et France.
            </p>

            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:48, animation:'fadeInUp 0.8s ease 0.3s both' }}>
              <Link href="/bac" className="btn btn-primary btn-lg">Commencer gratuitement →</Link>
              <Link href="/solve" className="btn btn-secondary btn-lg">▶ Tester le solveur</Link>
            </div>

            {/* Stats */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'clamp(16px,4vw,40px)', flexWrap:'wrap', animation:'fadeInUp 0.8s ease 0.4s both' }}>
              {stats.map((s, i) => (
                <div key={i} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(20px,2.5vw,28px)', background:'linear-gradient(135deg,var(--text),var(--accent))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{s.num}</div>
                  <div style={{ fontSize:10, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COUNTRIES ── */}
        <section className="section container reveal">
          <span className="label">Sélectionne ton pays</span>
          <h2 style={{ marginBottom:16 }}>Adapté à ton<br/>programme officiel</h2>
          <p style={{ marginBottom:50, maxWidth:500 }}>Chaque pays a son propre programme. MathAI Coach s'adapte exactement à ce que tu dois apprendre.</p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:20 }}>
            {/* Tunisia - active */}
            <div style={{ background:'var(--surface)', border:'1px solid rgba(79,110,247,0.4)', borderRadius:20, padding:32, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at top left, rgba(79,110,247,0.1), transparent 60%)', pointerEvents:'none' }} />
              <div style={{ fontSize:48, marginBottom:16 }}>🇹🇳</div>
              <h3 style={{ marginBottom:6 }}>Tunisie</h3>
              <p style={{ fontSize:13, marginBottom:20 }}>Bac 4ème Maths · Licence FST</p>
              <ul style={{ listStyle:'none' }}>
                {['Bac Section Mathématiques','Licence FST — LFM / LMI','10 ans d\'examens Bac','Programme par trimestre','Chat IA en français'].map(f => (
                  <li key={f} style={{ display:'flex', gap:10, fontSize:13, color:'var(--muted)', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color:'var(--teal)' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/bac" className="btn btn-primary" style={{ marginTop:24, width:'100%', justifyContent:'center' }}>Explorer →</Link>
            </div>

            {/* Morocco - coming */}
            {[{ flag:'🇲🇦', name:'Maroc', sub:'Bac Sciences Mathématiques' }, { flag:'🇫🇷', name:'France', sub:'Terminale Spécialité Maths' }].map(c => (
              <div key={c.name} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:32, position:'relative', opacity:0.7 }}>
                <div style={{ position:'absolute', top:16, right:16 }} className="badge badge-gold">Bientôt</div>
                <div style={{ fontSize:48, marginBottom:16 }}>{c.flag}</div>
                <h3 style={{ marginBottom:6 }}>{c.name}</h3>
                <p style={{ fontSize:13, marginBottom:20 }}>{c.sub}</p>
                <button className="btn btn-ghost" style={{ width:'100%', justifyContent:'center', opacity:0.5, cursor:'not-allowed' }}>Bientôt disponible</button>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="section container" id="features">
          <div className="reveal">
            <span className="label">Fonctionnalités</span>
            <h2 style={{ marginBottom:16 }}>Plus qu'une calculatrice —<br/>un vrai professeur IA</h2>
          </div>
          <div className="grid-3 reveal" style={{ marginTop:50 }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ transitionDelay:`${i*0.05}s` }}>
                <div style={{ width:48, height:48, background:f.color, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:18 }}>{f.icon}</div>
                <h4 style={{ marginBottom:10 }}>{f.title}</h4>
                <p style={{ fontSize:13, lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEMO SOLVER ── */}
        <section className="section container">
          <div style={{ textAlign:'center' }} className="reveal">
            <span className="label">Démo Live</span>
            <h2 style={{ marginBottom:12 }}>Vois comment ça marche</h2>
            <p style={{ marginBottom:40, maxWidth:500, margin:'0 auto 40px' }}>Un exercice type Bac Tunisie — résolu étape par étape.</p>
          </div>
          <div className="reveal" style={{ maxWidth:700, margin:'0 auto', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden', boxShadow:'0 40px 100px rgba(0,0,0,0.4)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 20px', background:'var(--surface2)', borderBottom:'1px solid var(--border)' }}>
              {['#ff5f57','#febc2e','#28c840'].map((c,i) => <div key={i} style={{ width:12, height:12, borderRadius:'50%', background:c }} />)}
              <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--muted)', marginLeft:12 }}>MathAI Coach · Solveur Pédagogique</span>
            </div>
            <div style={{ padding:28 }}>
              <div style={{ display:'flex', gap:10, marginBottom:24 }}>
                <input className="input input-mono" readOnly defaultValue="2x² - 5x + 3 = 0" style={{ flex:1 }} />
                <Link href="/solve" className="btn btn-primary">Résoudre →</Link>
              </div>
              {[
                { label:'Identifier le type', math:'Équation du 2ème degré : ax² + bx + c = 0' },
                { label:'Coefficients', math:'a = 2,  b = -5,  c = 3' },
                { label:'Discriminant', math:'Δ = b² - 4ac = 25 - 24 = 1' },
                { label:'Δ > 0 → deux solutions réelles', math:'x = (-b ± √Δ) / 2a' },
                { label:'Solutions', math:'x₁ = (5+1)/4 = 3/2     x₂ = (5-1)/4 = 1' },
              ].map((s, i) => (
                <div key={i} className="step-card" style={{ marginBottom:10, animationDelay:`${i*0.1}s` }}>
                  <div className="step-num">{i+1}</div>
                  <div className="step-body">
                    <div className="step-label">{s.label}</div>
                    <div className="step-math">{s.math}</div>
                  </div>
                </div>
              ))}
              <div style={{ display:'flex', alignItems:'center', gap:14, background:'rgba(6,214,160,0.08)', border:'1px solid rgba(6,214,160,0.25)', borderRadius:12, padding:'14px 18px', marginTop:4 }}>
                <span style={{ fontSize:22 }}>✓</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'var(--teal)' }}>S = {'{ 1  ;  3/2 }'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ textAlign:'center', padding:'clamp(60px,10vh,120px) clamp(20px,5vw,60px)', position:'relative', zIndex:1 }}>
          <div style={{ width:400, height:400, background:'radial-gradient(circle, rgba(79,110,247,0.15) 0%, transparent 70%)', position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:-1 }} />
          <h2 style={{ marginBottom:20 }} className="reveal">Prêt à maîtriser<br/>les mathématiques ?</h2>
          <p style={{ fontSize:18, marginBottom:40, maxWidth:500, margin:'0 auto 40px' }} className="reveal">Rejoins des milliers d'étudiants tunisiens qui préparent leur Bac avec MathAI Coach.</p>
          <Link href="/auth/register" className="btn btn-primary btn-lg reveal" style={{ fontSize:18 }}>Commencer gratuitement →</Link>
        </section>

      </main>
      <Footer />

      <script dangerouslySetInnerHTML={{ __html: `
        const obs = new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('visible')),{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
        document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
      `}} />
    </>
  )
}
