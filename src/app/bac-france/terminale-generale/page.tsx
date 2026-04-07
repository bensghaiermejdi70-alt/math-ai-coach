'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// TERMINALE GÉNÉRALE — Spécialité Maths
// Route : /bac-france/terminale-generale
// Programme officiel · Bac 2027 · 6h/semaine · Coef. 16
// ══════════════════════════════════════════════════════════════════════

const SECTIONS = [
  {
    key:'s1', num:'Section 1', titre:'Algèbre & Géométrie', icon:'🧮',
    couleur:'#4f6ef7', bg:'rgba(79,110,247,0.12)', border:'rgba(79,110,247,0.3)', text:'#818cf8',
    chapitres:[
      { ch:'CH 01', slug:'suites-limites',        titre:'Suites — Limites & Convergence', badge:'Algèbre', nbThm:10, nbEx:12,
        desc:'Limite finie/infinie, suites convergentes/divergentes, théorème des gendarmes, suites monotones bornées, suites arithmético-géométriques.' },
      { ch:'CH 02', slug:'nombres-complexes',     titre:'Nombres complexes',               badge:'Algèbre', nbThm:12, nbEx:12,
        desc:'Forme algébrique a+ib, conjugué, module, argument, forme trigonométrique et exponentielle, formule de Moivre, racines n-ièmes, géométrie.' },
    ],
  },
  {
    key:'s2', num:'Section 2', titre:'Analyse', icon:'📈',
    couleur:'#06d6a0', bg:'rgba(6,214,160,0.12)', border:'rgba(6,214,160,0.3)', text:'#06d6a0',
    chapitres:[
      { ch:'CH 03', slug:'limites-continuite',    titre:'Limites & Continuité',            badge:'Analyse', nbThm:12, nbEx:12,
        desc:'Limite en un point (gauche/droite), asymptotes, formes indéterminées, croissances comparées, TVI, dichotomie.' },
      { ch:'CH 04', slug:'derivation-avancee',    titre:'Dérivation avancée',              badge:'Analyse', nbThm:8,  nbEx:10,
        desc:'Dérivée seconde, convexité (f\'\'≥0 ⟺ convexe), points d\'inflexion, théorème des accroissements finis (TAF).' },
      { ch:'CH 05', slug:'logarithme-neperien',   titre:'Logarithme népérien',             badge:'Analyse', nbThm:10, nbEx:12,
        desc:'Définition (primitive de 1/x), propriétés algébriques ln(ab), ln(a/b), ln(aⁿ), étude de ln x, croissances comparées.' },
      { ch:'CH 06', slug:'integration',           titre:'Intégration',                     badge:'Analyse', nbThm:10, nbEx:12,
        desc:'Primitives usuelles, intégrale définie ∫ₐᵇf(x)dx = F(b)−F(a), Chasles, IPP, changement de variable, aires, valeur moyenne.' },
      { ch:'CH 07', slug:'equations-differentielles', titre:'Équations différentielles',  badge:'Analyse', nbThm:8,  nbEx:10,
        desc:'y\'=ay → y=Ceᵃˣ ; y\'=ay+b → solution générale Ceᵃˣ−b/a ; condition initiale ; modélisations (croissance, radioactivité, RC).' },
    ],
  },
  {
    key:'s3', num:'Section 3', titre:'Géométrie dans l\'espace', icon:'🌐',
    couleur:'#f59e0b', bg:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.3)', text:'#fbbf24',
    chapitres:[
      { ch:'CH 08', slug:'vecteurs-espace',       titre:'Vecteurs & Repères dans l\'espace', badge:'Géométrie', nbThm:9, nbEx:10,
        desc:'Vecteurs 3D, relation de Chasles, repère (O;i,j,k), coordonnées, colinéarité, coplanarité, représentation paramétrique d\'une droite.' },
      { ch:'CH 09', slug:'droites-plans',         titre:'Droites & Plans — Équations',    badge:'Géométrie', nbThm:9, nbEx:10,
        desc:'Équation cartésienne du plan ax+by+cz+d=0, vecteur normal, positions relatives, orthogonalité, distance point-plan, point-droite.' },
    ],
  },
  {
    key:'s4', num:'Section 4', titre:'Probabilités & Statistiques', icon:'🎲',
    couleur:'#8b5cf6', bg:'rgba(139,92,246,0.12)', border:'rgba(139,92,246,0.3)', text:'#a78bfa',
    chapitres:[
      { ch:'CH 10', slug:'loi-normale',           titre:'Loi normale (Gauss)',              badge:'Probas', nbThm:8,  nbEx:10,
        desc:'Densité N(μ,σ²), N(0,1), standardisation Z=(X−μ)/σ, propriétés de symétrie, intervalles μ±σ μ±2σ, Moivre-Laplace.' },
      { ch:'CH 11', slug:'loi-binomiale',         titre:'Loi binomiale B(n,p)',             badge:'Probas', nbThm:7,  nbEx:10,
        desc:'Épreuve de Bernoulli, schéma de Bernoulli, P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ, E(X)=np, V(X)=np(1−p), diagrammes.' },
      { ch:'CH 12', slug:'echantillonnage',       titre:'Échantillonnage & Estimation',    badge:'Probas', nbThm:6,  nbEx:8,
        desc:'Intervalle de fluctuation asymptotique 95%, test de conformité, estimation ponctuelle, intervalle de confiance [f±1/√n].' },
    ],
  },
  {
    key:'s5', num:'Section 5', titre:'Algorithmique', icon:'💻',
    couleur:'#ec4899', bg:'rgba(236,72,153,0.12)', border:'rgba(236,72,153,0.3)', text:'#f472b6',
    chapitres:[
      { ch:'CH 13', slug:'python-avance',         titre:'Python avancé & Algorithmique',   badge:'Info',   nbThm:5,  nbEx:8,
        desc:'Récursivité, matrices 2D, visualisation matplotlib, simulation binomiale/normale, méthode de Newton (optionnel), intégrales numériques.' },
    ],
  },
]

const badgeColors: Record<string,{bg:string;color:string}> = {
  'Algèbre':  {bg:'rgba(79,110,247,0.15)',  color:'#818cf8'},
  'Analyse':  {bg:'rgba(6,214,160,0.15)',   color:'#06d6a0'},
  'Géométrie':{bg:'rgba(245,158,11,0.15)', color:'#fbbf24'},
  'Probas':   {bg:'rgba(139,92,246,0.15)', color:'#a78bfa'},
  'Info':     {bg:'rgba(236,72,153,0.15)', color:'#f472b6'},
}

function ChapCard({ ch, href, secColor }: { ch:typeof SECTIONS[0]['chapitres'][0]; href:string; secColor:string }) {
  const bc = badgeColors[ch.badge] || badgeColors['Analyse']
  return (
    <Link href={href} style={{ textDecoration:'none' }}>
      <div className="card" style={{ padding:22, height:'100%', transition:'transform 0.2s, box-shadow 0.2s', cursor:'pointer' }}
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
            {['Déf','Thm','Formule'].map(l=>(
              <span key={l} style={{fontSize:10,padding:'2px 7px',borderRadius:8,background:`${secColor}18`,color:secColor}}>{l}</span>
            ))}
          </div>
          <span style={{fontSize:12,color:secColor,fontWeight:700}}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

export default function TerminaleGeneralePage() {
  const allCh = SECTIONS.flatMap(s=>s.chapitres)
  return (
    <>
      <Navbar />
      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center'}}>
          <Link href="/bac-france" style={{color:'var(--muted)',textDecoration:'none'}}>Bac France</Link>
          <span>›</span>
          <span style={{color:'var(--text)'}}>Terminale Générale — Spécialité Maths</span>
        </div>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{marginBottom:40}}>
            <span style={{background:'rgba(245,158,11,0.15)',color:'#fbbf24',padding:'4px 14px',borderRadius:20,fontSize:12,fontWeight:700,marginBottom:12,display:'inline-block'}}>
              🎓 Lycée · Terminale · Spécialité · 6h/semaine · Bac 2027 · Coef. 16
            </span>
            <h1 style={{fontSize:'clamp(26px,4vw,42px)',marginBottom:12}}>Terminale Générale — Spécialité Mathématiques</h1>
            <p style={{maxWidth:640,color:'var(--text2)',marginBottom:20,lineHeight:1.7}}>
              Programme officiel MEN · 5 sections · {allCh.length} chapitres. Tous les théorèmes, définitions, formules et méthodes du programme officiel du Baccalauréat 2027.
            </p>
            <div style={{display:'flex',gap:16,flexWrap:'wrap',fontSize:13,color:'var(--muted)'}}>
              <span>📚 {allCh.length} chapitres</span><span>·</span>
              <span>🗂️ 5 sections</span><span>·</span>
              <span>📊 {allCh.reduce((s,c)=>s+c.nbThm,0)}+ théorèmes</span><span>·</span>
              <span>📝 {allCh.reduce((s,c)=>s+c.nbEx,0)}+ exercices</span>
            </div>
          </div>

          {SECTIONS.map(sec=>(
            <div key={sec.key} style={{marginBottom:44}}>
              <div style={{background:`linear-gradient(135deg,${sec.bg},transparent)`,border:`1px solid ${sec.border}`,borderRadius:16,padding:'18px 24px',marginBottom:18,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
                <div style={{display:'flex',gap:10,alignItems:'center'}}>
                  <span style={{fontSize:20}}>{sec.icon}</span>
                  <div>
                    <div style={{fontSize:11,color:sec.text,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:2}}>{sec.num}</div>
                    <h2 style={{fontSize:18,fontWeight:800,margin:0}}>{sec.titre}</h2>
                  </div>
                </div>
                <span style={{background:`${sec.couleur}20`,color:sec.text,padding:'5px 14px',borderRadius:20,fontSize:12,fontFamily:'var(--font-mono)'}}>
                  {sec.chapitres.length} chapitre{sec.chapitres.length>1?'s':''}
                </span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:14}}>
                {sec.chapitres.map(ch=>(
                  <ChapCard key={ch.slug} ch={ch} href={`/bac-france/terminale-generale/${ch.slug}`} secColor={sec.couleur} />
                ))}
              </div>
            </div>
          ))}

          <div style={{borderTop:'1px solid var(--border)',paddingTop:28}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:'var(--text2)'}}>Autres branches Terminale</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
              {[
                {href:'/bac-france/terminale-expertes',icon:'⭐',label:'Option Maths Expertes',sub:'Arithmétique · Complexes · Matrices'},
                {href:'/bac-france/terminale-techno',  icon:'⚙️',label:'Terminale Technologique',sub:'STMG · STI2D · STL'},
                {href:'/bac-france/premiere',          icon:'📗',label:'Retour Première',sub:'10 chapitres Spécialité'},
              ].map(n=>(
                <Link key={n.href} href={n.href} style={{textDecoration:'none'}}>
                  <div className="card" style={{padding:'16px 18px',display:'flex',gap:12,alignItems:'center',transition:'transform 0.2s'}}
                    onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                    <span style={{fontSize:24}}>{n.icon}</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:14}}>{n.label}</div>
                      <div style={{fontSize:11,color:'var(--muted)'}}>{n.sub}</div>
                    </div>
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
