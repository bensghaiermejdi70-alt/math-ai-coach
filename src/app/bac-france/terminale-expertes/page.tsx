'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// Route : /bac-france/terminale-expertes
const SECTIONS = [
  {
    key:'sA', num:'Section A', titre:'Arithmétique', icon:'∑',
    couleur:'#8b5cf6', bg:'rgba(139,92,246,0.12)', border:'rgba(139,92,246,0.3)', text:'#a78bfa',
    chapitres:[
      {ch:'CH 01',slug:'divisibilite-z',       titre:'Divisibilité dans ℤ',         badge:'Arithmétique',nbThm:9, nbEx:10, desc:'Multiples et diviseurs dans ℤ, division euclidienne (unicité), congruences (addition, multiplication), critères de divisibilité, calculs modulaires.'},
      {ch:'CH 02',slug:'pgcd-theoremes',       titre:'PGCD & Théorèmes fondamentaux',badge:'Arithmétique',nbThm:9, nbEx:10, desc:'PGCD par algorithme d\'Euclide, théorème de Bézout (au+bv=PGCD), théorème de Gauss, équations diophantiennes ax+by=c.'},
      {ch:'CH 03',slug:'nombres-premiers',     titre:'Nombres premiers',              badge:'Arithmétique',nbThm:7, nbEx:8,  desc:'Définition, crible d\'Ératosthène, décomposition en facteurs premiers (unicité), petit théorème de Fermat aᵖ⁻¹≡1[p].'},
    ],
  },
  {
    key:'sB', num:'Section B', titre:'Complexes (approfondissement)', icon:'𝑖',
    couleur:'#4f6ef7', bg:'rgba(79,110,247,0.12)', border:'rgba(79,110,247,0.3)', text:'#818cf8',
    chapitres:[
      {ch:'CH 04',slug:'complexes-formes',     titre:'Formes trig. & exponentielles', badge:'Complexes',  nbThm:9, nbEx:10, desc:'Module, argument, forme trigonométrique z=r(cosθ+isinθ), forme exponentielle reⁱᶿ, formule d\'Euler, De Moivre, racines n-ièmes de l\'unité.'},
      {ch:'CH 05',slug:'polynomes-complexes',  titre:'Équations polynomiales dans ℂ', badge:'Complexes',  nbThm:8, nbEx:8,  desc:'Second degré dans ℂ (Δ<0), factorisation zⁿ−aⁿ, théorème fondamental de l\'algèbre (admis), factorisation par (z−a), relations coefficients-racines.'},
    ],
  },
  {
    key:'sC', num:'Section C', titre:'Graphes & Matrices', icon:'⬡',
    couleur:'#10b981', bg:'rgba(16,185,129,0.12)', border:'rgba(16,185,129,0.3)', text:'#34d399',
    chapitres:[
      {ch:'CH 06',slug:'theorie-graphes',      titre:'Théorie des graphes',           badge:'Graphes',    nbThm:8, nbEx:8,  desc:'Vocabulaire (sommets, arêtes, degrés), graphes orientés/non orientés, chaînes eulériennes, matrice d\'adjacence, graphes probabilistes.'},
      {ch:'CH 07',slug:'calcul-matriciel',     titre:'Calcul matriciel',              badge:'Matrices',   nbThm:8, nbEx:8,  desc:'Matrices carrées ordre 2 et 3, addition, multiplication, matrice identité, matrice inverse (ordre 2), puissances Mⁿ, transformations géométriques.'},
      {ch:'CH 08',slug:'chaines-markov',       titre:'Chaînes de Markov',             badge:'Graphes',    nbThm:7, nbEx:8,  desc:'Matrice de transition, évolution Pₙ₊₁=Pₙ×M, calcul Pₙ=P₀×Mⁿ, état stable π=π×M, convergence vers l\'état stationnaire.'},
    ],
  },
]

const badgeColors: Record<string,{bg:string;color:string}> = {
  'Arithmétique':{bg:'rgba(139,92,246,0.15)',color:'#a78bfa'},
  'Complexes':   {bg:'rgba(79,110,247,0.15)', color:'#818cf8'},
  'Graphes':     {bg:'rgba(16,185,129,0.15)', color:'#34d399'},
  'Matrices':    {bg:'rgba(16,185,129,0.15)', color:'#10b981'},
}

function ChapCard({ch,href,secColor}:{ch:typeof SECTIONS[0]['chapitres'][0];href:string;secColor:string}) {
  const bc = badgeColors[ch.badge]||{bg:'rgba(139,92,246,0.15)',color:'#a78bfa'}
  return (
    <Link href={href} style={{textDecoration:'none'}}>
      <div className="card" style={{padding:22,height:'100%',transition:'transform 0.2s, box-shadow 0.2s',cursor:'pointer'}}
        onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow=`0 8px 28px ${secColor}28`}}
        onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow=''}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
          <div style={{display:'flex',gap:8}}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',background:'var(--surface2)',padding:'2px 8px',borderRadius:6}}>{ch.ch}</span>
            <span style={{fontSize:11,background:bc.bg,color:bc.color,padding:'2px 8px',borderRadius:12,fontWeight:600}}>{ch.badge}</span>
          </div>
          <span style={{fontSize:11,color:'var(--muted)'}}>{ch.nbThm} thm</span>
        </div>
        <h3 style={{fontSize:15,fontWeight:700,marginBottom:8,color:'var(--text)'}}>{ch.titre}</h3>
        <p style={{fontSize:12,color:'var(--text2)',lineHeight:1.6,marginBottom:14}}>{ch.desc}</p>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:5}}>
            {['Déf','Thm','Formule'].map(l=><span key={l} style={{fontSize:10,padding:'2px 7px',borderRadius:8,background:`${secColor}18`,color:secColor}}>{l}</span>)}
          </div>
          <span style={{fontSize:12,color:secColor,fontWeight:700}}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

export default function TerminaleExpertesPage() {
  const allCh = SECTIONS.flatMap(s=>s.chapitres)
  return (
    <>
      <Navbar />
      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center'}}>
          <Link href="/bac-france" style={{color:'var(--muted)',textDecoration:'none'}}>Bac France</Link><span>›</span>
          <span style={{color:'var(--text)'}}>Option Maths Expertes</span>
        </div>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{marginBottom:40}}>
            <span style={{background:'rgba(139,92,246,0.15)',color:'#a78bfa',padding:'4px 14px',borderRadius:20,fontSize:12,fontWeight:700,marginBottom:12,display:'inline-block'}}>
              ⭐ Terminale · Option · 3h/semaine · Coef. 2 (CC)
            </span>
            <h1 style={{fontSize:'clamp(26px,4vw,42px)',marginBottom:12}}>Option Mathématiques Expertes</h1>
            <p style={{maxWidth:640,color:'var(--text2)',marginBottom:20,lineHeight:1.7}}>
              Programme officiel · 3 sections · {allCh.length} chapitres. Pour les élèves conservant la spécialité Maths en Terminale et souhaitant approfondir en Arithmétique, Complexes et Matrices.
            </p>
            <div style={{display:'flex',gap:16,flexWrap:'wrap',fontSize:13,color:'var(--muted)'}}>
              <span>📚 {allCh.length} chapitres</span><span>·</span>
              <span>📊 {allCh.reduce((s,c)=>s+c.nbThm,0)}+ théorèmes</span><span>·</span>
              <span>📝 {allCh.reduce((s,c)=>s+c.nbEx,0)}+ exercices</span>
            </div>
          </div>

          {SECTIONS.map(sec=>(
            <div key={sec.key} style={{marginBottom:44}}>
              <div style={{background:`linear-gradient(135deg,${sec.bg},transparent)`,border:`1px solid ${sec.border}`,borderRadius:16,padding:'18px 24px',marginBottom:18,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
                <div style={{display:'flex',gap:10,alignItems:'center'}}>
                  <span style={{fontSize:22}}>{sec.icon}</span>
                  <div>
                    <div style={{fontSize:11,color:sec.text,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:2}}>{sec.num}</div>
                    <h2 style={{fontSize:18,fontWeight:800,margin:0}}>{sec.titre}</h2>
                  </div>
                </div>
                <span style={{background:`${sec.couleur}20`,color:sec.text,padding:'5px 14px',borderRadius:20,fontSize:12,fontFamily:'var(--font-mono)'}}>{sec.chapitres.length} chapitres</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:14}}>
                {sec.chapitres.map(ch=><ChapCard key={ch.slug} ch={ch} href={`/bac-france/terminale-expertes/${ch.slug}`} secColor={sec.couleur}/>)}
              </div>
            </div>
          ))}

          <div style={{borderTop:'1px solid var(--border)',paddingTop:28}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:'var(--text2)'}}>Autres branches</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
              {[
                {href:'/bac-france/terminale-generale',icon:'🎓',label:'Terminale Générale',sub:'Spécialité · Bac 2027 · 13 ch.'},
                {href:'/bac-france/terminale-techno',  icon:'⚙️',label:'Terminale Techno',   sub:'STMG · STI2D · STL'},
                {href:'/bac-france/premiere',          icon:'📗',label:'Première Spécialité',sub:'10 chapitres'},
              ].map(n=>(
                <Link key={n.href} href={n.href} style={{textDecoration:'none'}}>
                  <div className="card" style={{padding:'16px 18px',display:'flex',gap:12,alignItems:'center',transition:'transform 0.2s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <span style={{fontSize:24}}>{n.icon}</span>
                    <div><div style={{fontWeight:700,fontSize:14}}>{n.label}</div><div style={{fontSize:11,color:'var(--muted)'}}>{n.sub}</div></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
