'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// SECONDE — Index des 13 chapitres
// Route : /bac-france/seconde
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  { slug:'python-algorithmique',   num:'01', titre:'Algorithmique & Python',                badge:'Informatique',  color:'#06d6a0', section:'Partie 1', desc:'Variables, conditions, fonctions, boucles for/while' },
  { slug:'nombres-calculs',        num:'02', titre:'Nombres & Calculs',                     badge:'Algèbre',       color:'#4f6ef7', section:'Partie 2', desc:'Puissances, racines carrées, PGCD, ensembles ℕℤℚℝ' },
  { slug:'intervalles-inequations',num:'03', titre:'Intervalles, Inégalités & Inéquations', badge:'Algèbre',       color:'#f59e0b', section:'Partie 2', desc:'Notations intervalles, propriétés inégalités, valeur absolue' },
  { slug:'calcul-litteral',        num:'04', titre:'Calcul Littéral',                       badge:'Algèbre',       color:'#8b5cf6', section:'Partie 2', desc:'Identités remarquables, factorisation, produit nul' },
  { slug:'geometrie-non-reperee',  num:'05', titre:'Géométrie & Vecteurs',                  badge:'Géométrie',     color:'#ec4899', section:'Partie 3', desc:'Vecteurs, Chasles, colinéarité, Thalès, Pythagore' },
  { slug:'vecteurs-repere',        num:'06', titre:'Vecteurs & Repère',                     badge:'Géométrie',     color:'#06b6d4', section:'Partie 3', desc:'Coordonnées, milieu, distance, déterminant' },
  { slug:'droites-systemes',       num:'07', titre:'Droites du Plan & Systèmes',            badge:'Géométrie',     color:'#f97316', section:'Partie 3', desc:'Équations de droite, positions relatives, systèmes 2×2' },
  { slug:'fonctions-generalites',  num:'08', titre:'Fonctions — Généralités',               badge:'Fonctions',     color:'#10b981', section:'Partie 4', desc:'Image, antécédent, parité, fonctions de référence' },
  { slug:'variations-extremums',   num:'09', titre:'Variations & Extremums',                badge:'Fonctions',     color:'#4f6ef7', section:'Partie 4', desc:'Croissance, décroissance, tableau de variations, extremums' },
  { slug:'signe-fonction',         num:'10', titre:"Signe d'une Fonction",                  badge:'Fonctions',     color:'#8b5cf6', section:'Partie 4', desc:'Tableau de signes, produit, quotient, inéquations' },
  { slug:'proportions-evolutions', num:'11', titre:'Proportions & Évolutions',              badge:'Stats & Probas',color:'#06b6d4', section:'Partie 5', desc:'Pourcentages, taux évolution, coefficient multiplicateur' },
  { slug:'statistiques-descriptives',num:'12',titre:'Statistiques Descriptives',            badge:'Stats & Probas',color:'#f59e0b', section:'Partie 5', desc:'Moyenne, écart-type, médiane, quartiles, boîte à moustaches' },
  { slug:'probabilites-echantillonnage',num:'13',titre:'Probabilités & Échantillonnage',   badge:'Stats & Probas',color:'#ec4899', section:'Partie 5', desc:'Événements, probabilités, intervalle de fluctuation 95%' },
]

const SECTIONS = [
  { label:'Partie 1 — Algorithmique', color:'#06d6a0' },
  { label:'Partie 2 — Nombres et calculs', color:'#4f6ef7' },
  { label:'Partie 3 — Géométrie', color:'#ec4899' },
  { label:'Partie 4 — Fonctions', color:'#10b981' },
  { label:'Partie 5 — Statistiques et probabilités', color:'#f59e0b' },
]

export default function SecondeIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        {/* Fil d'Ariane */}
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center',flexWrap:'wrap'}}>
          <Link href="/bac-france" style={{color:'var(--muted)',textDecoration:'none'}}>Bac France</Link>
          <span>›</span>
          <Link href="/bac-france/maths" style={{color:'var(--muted)',textDecoration:'none'}}>Mathématiques</Link>
          <span>›</span>
          <span style={{color:'#10b981',fontWeight:600}}>Seconde</span>
        </div>

        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 260px',gap:32,alignItems:'start'}}>

            {/* Contenu principal */}
            <div>
              {/* Header */}
              <div style={{marginBottom:36}}>
                <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:12,background:'var(--surface2)',color:'var(--muted)',padding:'3px 10px',borderRadius:8}}>Seconde Générale</span>
                  <span style={{fontSize:12,background:'rgba(16,185,129,0.15)',color:'#10b981',padding:'3px 10px',borderRadius:12,fontWeight:600}}>13 chapitres · Programme complet</span>
                  <span style={{fontSize:11,background:'rgba(16,185,129,0.1)',color:'#34d399',padding:'3px 10px',borderRadius:12}}>Maths · 4h/semaine</span>
                </div>
                <h1 style={{fontSize:'clamp(24px,3.5vw,38px)',marginBottom:8}}>Mathématiques — Seconde</h1>
                <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.65,maxWidth:620,marginBottom:16}}>
                  Programme officiel Éducation Nationale · 13 chapitres complets avec cours, théorèmes, formules et exercices corrigés.
                  Algorithmique · Algèbre · Géométrie · Fonctions · Statistiques & Probabilités.
                </p>
                <div style={{display:'flex',gap:20,fontSize:12,color:'var(--muted)',flexWrap:'wrap'}}>
                  <span>📚 13 chapitres</span><span>·</span>
                  <span>📊 52+ théorèmes</span><span>·</span>
                  <span>📝 39+ exercices corrigés</span><span>·</span>
                  <span>🤖 Solveur IA intégré</span>
                </div>
              </div>

              {/* Liste des 13 chapitres */}
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {CHAPITRES.map((ch,i) => (
                  <Link key={ch.slug} href={'/bac-france/seconde/'+ch.slug} style={{textDecoration:'none'}}>
                    <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,padding:'16px 20px',transition:'transform 0.15s, box-shadow 0.15s',borderLeft:`3px solid ${ch.color}`,display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap'}}
                      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 8px 24px ${ch.color}18`}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow=''}}>
                      <div style={{display:'flex',gap:14,alignItems:'center'}}>
                        <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',background:'var(--surface2)',padding:'2px 8px',borderRadius:6,flexShrink:0}}>CH {ch.num}</div>
                        <div>
                          <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:4,flexWrap:'wrap'}}>
                            <span style={{fontWeight:700,fontSize:15,color:'var(--text)'}}>{ch.titre}</span>
                            <span style={{fontSize:10,padding:'2px 8px',borderRadius:10,background:`${ch.color}18`,color:ch.color,fontWeight:600}}>{ch.badge}</span>
                          </div>
                          <div style={{fontSize:12,color:'var(--text2)'}}>{ch.desc}</div>
                        </div>
                      </div>
                      <span style={{color:ch.color,fontWeight:700,fontSize:13,flexShrink:0}}>Ouvrir →</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA Solveur */}
              <div style={{marginTop:32,background:'rgba(79,110,247,0.07)',border:'1px solid rgba(79,110,247,0.2)',borderRadius:14,padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
                <div>
                  <div style={{fontWeight:700,marginBottom:4}}>🤖 Besoin d'aide sur un exercice ?</div>
                  <div style={{fontSize:13,color:'var(--muted)'}}>Le solveur IA résout pas à pas tous vos exercices de Seconde</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <Link href="/solve" className="btn btn-primary" style={{fontSize:12}}>🧮 Solveur IA</Link>
                  <Link href="/chat" className="btn btn-secondary" style={{fontSize:12}}>💬 Chat Prof</Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside style={{position:'sticky',top:88}}>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',marginBottom:14}}>
                <div style={{padding:'11px 15px',borderBottom:'1px solid var(--border)',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>📘 Programme Seconde</div>
                {SECTIONS.map(sec => (
                  <div key={sec.label} style={{padding:'10px 15px',borderBottom:'1px solid var(--border)'}}>
                    <div style={{fontSize:10,color:sec.color,fontWeight:700,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em'}}>{sec.label}</div>
                    {CHAPITRES.filter(c => c.section === sec.label.split(' — ')[0]).map(ch => (
                      <Link key={ch.slug} href={'/bac-france/seconde/'+ch.slug} style={{textDecoration:'none',display:'block'}}>
                        <div style={{fontSize:11,color:'var(--text2)',padding:'3px 0',display:'flex',gap:6,alignItems:'center'}}
                          onMouseEnter={e=>e.currentTarget.style.color=ch.color}
                          onMouseLeave={e=>e.currentTarget.style.color='var(--text2)'}>
                          <span style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--font-mono)'}}>CH{ch.num}</span>
                          {ch.titre}
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:13,padding:'14px'}}>
                <div style={{fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Autres niveaux</div>
                <div style={{display:'flex',flexDirection:'column',gap:7}}>
                  <Link href="/bac-france/premiere" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>📗 Première Spécialité</Link>
                  <Link href="/bac-france/terminale-generale" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>🎓 Terminale Générale</Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>📋 Simulation Bac</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}