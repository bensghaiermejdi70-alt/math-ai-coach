'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = { def:'#4f6ef7', formule:'#f5c842', prop:'#06d6a0', ex:'#8b5cf6' }
const L: Record<string,string> = { def:'Définition', formule:'À retenir', prop:'Propriété', ex:'Exemple' }

const NAV_ORDER = ['internet-reseaux','web-html-css-js','systemes-informatiques','securite-informatique']
const TITRES: Record<string,string> = {
  'internet-reseaux':'Internet & Réseaux',
  'web-html-css-js':'Web — HTML / CSS / JavaScript',
  'systemes-informatiques':'Systèmes informatiques',
  'securite-informatique':'Sécurité informatique',
}
const NUMS: Record<string,string> = {
  'internet-reseaux':'TH 01','web-html-css-js':'TH 02',
  'systemes-informatiques':'TH 03','securite-informatique':'TH 04',
}
const SEC_COLOR: Record<string,string> = {
  'internet-reseaux':'#06d6a0','web-html-css-js':'#4f6ef7',
  'systemes-informatiques':'#8b5cf6','securite-informatique':'#ef4444',
}

const CHAPITRES: Record<string,{
  ch:string;titre:string;icon:string;desc:string;duree:string;sections:string[];
  theoremes:{id:string;type:string;nom:string;enonce:string}[];
  exercices:{id:string;niveau:string;titre:string;enonce:string;correction:string}[];
}> = {
  'internet-reseaux':{
    ch:'TH 01',titre:'Internet & Reseaux',icon:'🌐',duree:'~2h',
    sections:['Sc. Mathematiques','Sc. Experimentales','Sc. Techniques','Eco-Gestion'],
    desc:"LAN/WAN, Internet, protocoles HTTP/TCP/IP/DNS, adressage IP.",
    theoremes:[
      {id:'D1',type:'def',nom:"Types de reseaux",
       enonce:"LAN : reseau local (maison, ecole)\nWAN : reseau etendu (ville, pays)\nInternet : reseau mondial\nIntranet : reseau prive entreprise\n\nModele client-serveur :\nClient envoie requete -> Serveur repond"},
      {id:'D2',type:'def',nom:"Protocoles et IP",
       enonce:"HTTP/HTTPS : pages web (port 80/443)\nTCP/IP : protocole de base Internet\nDNS : nom -> adresse IP\nFTP : transfert fichiers\n\nIPv4 : 4 nombres 0-255 ex: 192.168.1.15\nIP privee : 192.168.x.x\nIP publique : unique sur Internet"},
      {id:'F1',type:'formule',nom:"A retenir",
       enonce:"LAN=local / WAN=etendu / Internet=mondial\nHTTP=web / DNS=nom vers IP / FTP=fichiers\nHTTPS = HTTP + chiffrement TLS\nFAI = Fournisseur Acces Internet"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Protocoles et usages",
       enonce:"Associer : HTTP, FTP, DNS, TCP/IP a leur usage.",
       correction:"HTTP : pages web\nFTP : transfert fichiers\nDNS : traduire nom en IP\nTCP/IP : protocole base Internet"},
    ],
  },
  'web-html-css-js':{
    ch:'TH 02',titre:'Web — HTML / CSS / JavaScript',icon:'💡',duree:'~3h',
    sections:['Sc. Mathematiques','Sc. Experimentales','Sc. Techniques','Eco-Gestion'],
    desc:"Structure HTML, balises semantiques, CSS, JavaScript bases.",
    theoremes:[
      {id:'D1',type:'def',nom:"Structure HTML",
       enonce:"<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Page</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Titre</h1>\n  <p>Paragraphe</p>\n  <a href=\"page2.html\">Lien</a>\n  <img src=\"photo.jpg\" alt=\"desc\">\n</body>\n</html>"},
      {id:'D2',type:'def',nom:"Balises essentielles",
       enonce:"Titres : h1 h2 h3 h4 h5 h6\nTexte : p strong em br\nListes : ul ol + li\nTableaux : table tr th td\nStructure : header nav main footer div span"},
      {id:'D3',type:'def',nom:"CSS — Selecteurs et proprietes",
       enonce:"Selecteurs :\ntag { }          par balise\n.classe { }      par class\n#id { }          par id\n\nProprietes :\ncolor: red;\nbackground-color: #fff;\nfont-size: 16px;\nmargin: 10px;\npadding: 15px;\nborder: 1px solid black;\ndisplay: flex;"},
      {id:'D4',type:'def',nom:"JavaScript bases",
       enonce:"var x = 5; let nom = 'Ahmed';\nalert('Bonjour');\nconsole.log(nom);\ndocument.getElementById('monId').innerHTML = 'Texte';\n\nfunction calcul() {\n  let a = parseInt(prompt('Nombre :'));\n  alert('Carre : ' + a*a);\n}"},
      {id:'F1',type:'formule',nom:"A retenir",
       enonce:"HTML = structure (squelette)\nCSS  = apparence (habillage)\nJS   = interactions (comportement)"},
    ],
    exercices:[
      {id:'EX01',niveau:'Intermediaire',titre:"Page simple",
       enonce:"Creer page HTML : titre 'Ma Page', liste 3 matieres, fond sombre.",
       correction:"<!DOCTYPE html><html><head><title>Ma Page</title>\n<style>body{background:#1a1a2e;color:white;font-family:Arial;}\nh1{color:#4f6ef7;}</style></head><body>\n<h1>Ma Page</h1>\n<ul><li>Maths</li><li>Physique</li><li>Info</li></ul>\n</body></html>"},
    ],
  },
  'systemes-informatiques':{
    ch:'TH 03',titre:'Systemes informatiques',icon:'🖥️',duree:'~2h',
    sections:['Sc. Mathematiques','Sc. Experimentales','Sc. Techniques','Eco-Gestion'],
    desc:"Hardware (CPU, RAM, stockage), Software (OS, apps), Von Neumann, binaire.",
    theoremes:[
      {id:'D1',type:'def',nom:"Hardware",
       enonce:"CPU : processeur, GHz, coeurs\nRAM : memoire vive volatile rapide\nROM : memoire permanente (BIOS)\nHDD : disque dur magnetique\nSSD : flash, plus rapide que HDD\n\nEntree : clavier, souris, micro\nSortie : ecran, imprimante\nE/S : disques externes, ecran tactile"},
      {id:'D2',type:'def',nom:"Software",
       enonce:"OS : Windows, Linux, macOS, Android\nApplications : navigateur, Word, Python\nLibre (open source) = code ouvert\nProprietaire = code ferme (licence)"},
      {id:'D3',type:'def',nom:"Von Neumann + Binaire",
       enonce:"4 composants : UC, Memoire, E/S, Bus\nCycle : Fetch -> Decode -> Execute\n\nBinaire base 2 : 0 et 1\n1011 en base 2 = 8+0+2+1 = 11 en base 10\n1 bit | 8 bits = 1 octet | 1 Ko = 1024 o"},
      {id:'F1',type:'formule',nom:"A retenir",
       enonce:"RAM : rapide, volatile (perdu si coupure)\nROM : permanent, non volatile\nHDD < SSD (vitesse)\nOS : Windows / Linux / macOS / Android\n1011 base 2 = 11 base 10"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Conversion binaire",
       enonce:"Convertir en decimal : 1011 base 2 et 11001 base 2",
       correction:"1011 base 2 = 8+0+2+1 = 11 en decimal\n11001 base 2 = 16+8+0+0+1 = 25 en decimal"},
    ],
  },
  'securite-informatique':{
    ch:'TH 04',titre:'Securite informatique',icon:'🔒',duree:'~2h',
    sections:['Sc. Mathematiques','Sc. Experimentales','Sc. Techniques','Eco-Gestion'],
    desc:"Virus, ransomware, phishing, antivirus, pare-feu, HTTPS, donnees personnelles.",
    theoremes:[
      {id:'D1',type:'def',nom:"Types de menaces",
       enonce:"Virus : se reproduit et propage\nRansomware : chiffre donnees, rançon\nPhishing : faux email/site pour voler identifiants\nSpyware/Keylogger : espionne l'utilisateur\nDDoS : surcharger un serveur"},
      {id:'D2',type:'def',nom:"Protection",
       enonce:"Antivirus : detecte et supprime malwares\nPare-feu : filtre connexions reseau\nMot de passe fort : 8+ car, maj, chiffres, symboles\n2FA : mot de passe + code SMS\nHTTPS : communication chiffree\nSauvegarde : proteger contre perte"},
      {id:'D3',type:'def',nom:"Donnees personnelles et RGPD",
       enonce:"Donnees : nom, email, adresse, photo...\n\nRGPD :\n- Droit d'acces a ses donnees\n- Droit de rectification\n- Droit a l'effacement\n- Consentement requis\n\nHTTPS = HTTP + chiffrement TLS/SSL"},
      {id:'F1',type:'formule',nom:"Bonnes pratiques",
       enonce:"Mot de passe fort : 8+ car, maj, chiffre, symbole\nNe pas cliquer sur lien suspect\nVerifier https:// dans l'URL\nActiver 2FA\nSauvegarder regulierement\nMettre a jour OS et logiciels"},
    ],
    exercices:[
      {id:'EX01',niveau:'Facile',titre:"Identifier les attaques",
       enonce:"1) Email urgent demandant identifiants bancaires.\n2) Fichiers chiffres + demande 500 euros.\n3) Logiciel enregistrant frappes clavier.",
       correction:"1) Phishing\n2) Ransomware\n3) Keylogger (spyware)"},
    ],
  },
}

function TypeBadge({type}:{type:string}) {
  const color = C[type as keyof typeof C] || C.def
  return <span style={{fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,background:`${color}20`,color,border:`1px solid ${color}30`,flexShrink:0}}>{L[type as keyof typeof L]||type}</span>
}

export default function AutresSectionsSlugPage() {
  const params = useParams()
  const slug = params?.slug as string
  const ch = CHAPITRES[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const secColor = SEC_COLOR[slug] || '#f59e0b'
  const idx = NAV_ORDER.indexOf(slug)
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  if (!ch) return (
    <><Navbar/>
      <main style={{paddingTop:80,minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:16}}>📭</div>
          <h2 style={{marginBottom:12}}>Theme non trouve</h2>
          <Link href="/bac/info/autres-sections" style={{color:'#f59e0b'}}>← Retour TIC Commun</Link>
        </div>
      </main><Footer/></>
  )

  return (
    <><Navbar/>
      <main style={{position:'relative',zIndex:1,paddingTop:80}}>
        <div style={{borderBottom:'1px solid var(--border)',padding:'14px clamp(20px,5vw,60px)',display:'flex',gap:8,fontSize:13,color:'var(--muted)',alignItems:'center',flexWrap:'wrap'}}>
          <Link href="/bac" style={{color:'var(--muted)',textDecoration:'none'}}>Bac</Link><span>›</span>
          <Link href="/bac/info" style={{color:'var(--muted)',textDecoration:'none'}}>Informatique</Link><span>›</span>
          <Link href="/bac/info/autres-sections" style={{color:'var(--muted)',textDecoration:'none'}}>TIC Commun</Link><span>›</span>
          <span style={{color:secColor,fontWeight:600}}>{ch.ch} — {ch.titre}</span>
        </div>
        <div className="container" style={{paddingTop:40,paddingBottom:80}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 260px',gap:32,alignItems:'start'}}>
            <div>
              <div style={{marginBottom:32}}>
                <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:12,background:'var(--surface2)',color:'var(--muted)',padding:'3px 10px',borderRadius:8}}>{ch.ch}</span>
                  <span style={{fontSize:12,background:`${secColor}20`,color:secColor,padding:'3px 10px',borderRadius:12,fontWeight:600}}>TIC COMMUN</span>
                  <span style={{fontSize:11,background:'rgba(245,158,11,0.1)',color:'#f59e0b',padding:'3px 10px',borderRadius:12}}>4 Sections</span>
                </div>
                <h1 style={{fontSize:'clamp(22px,3.5vw,36px)',marginBottom:8}}>{ch.icon} {ch.titre}</h1>
                <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.65,marginBottom:12,maxWidth:640}}>{ch.desc}</p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
                  {ch.sections.map(s=>(<span key={s} style={{fontSize:11,padding:'2px 10px',borderRadius:20,background:'rgba(245,158,11,0.1)',color:'#f59e0b',fontWeight:600}}>{s}</span>))}
                </div>
                <div style={{display:'flex',gap:16,fontSize:12,color:'var(--muted)',flexWrap:'wrap',marginTop:8}}>
                  <span>📊 {ch.theoremes.length} concepts</span><span>·</span>
                  <span>📝 {ch.exercices.length} exercice</span><span>·</span>
                  <span>⏱ {ch.duree}</span>
                </div>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:24,padding:'10px 14px',background:'var(--surface)',borderRadius:12,border:'1px solid var(--border)'}}>
                <span style={{fontSize:12,color:'var(--muted)',marginRight:4}}>Types :</span>
                {Object.entries(L).map(([k,v])=>(<span key={k} style={{fontSize:11,padding:'2px 10px',borderRadius:20,background:`${C[k as keyof typeof C]}18`,color:C[k as keyof typeof C],fontWeight:600}}>{v}</span>))}
              </div>
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📚 Cours</h2>
                <div style={{display:'flex',flexDirection:'column',gap:13}}>
                  {ch.theoremes.map(t=>{
                    const color = C[t.type as keyof typeof C] || C.def
                    return (
                      <div key={t.id} style={{borderLeft:`3px solid ${color}`,background:`${color}07`,borderRadius:'0 12px 12px 0',padding:'15px 20px',border:`1px solid ${color}18`}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8,gap:10,flexWrap:'wrap'}}>
                          <div style={{fontWeight:700,fontSize:14}}>{t.nom}</div>
                          <TypeBadge type={t.type}/>
                        </div>
                        <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.8,whiteSpace:'pre-line',fontFamily:t.type==='formule'?'var(--font-mono)':'inherit'}}>{t.enonce}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div style={{marginBottom:44}}>
                <h2 style={{fontSize:20,marginBottom:18}}>📝 Exercice</h2>
                <div style={{display:'flex',flexDirection:'column',gap:11}}>
                  {ch.exercices.map(ex=>(
                    <div key={ex.id} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
                      <div style={{padding:'15px 20px'}}>
                        <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
                          <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--muted)',background:'var(--surface2)',padding:'2px 8px',borderRadius:6}}>{ex.id}</span>
                          <span style={{fontSize:11,padding:'2px 8px',borderRadius:10,fontWeight:600,background:ex.niveau==='Facile'?'rgba(6,214,160,0.15)':'rgba(245,158,11,0.15)',color:ex.niveau==='Facile'?'#06d6a0':'#f59e0b'}}>{ex.niveau}</span>
                          <span style={{fontWeight:600,fontSize:14}}>{ex.titre}</span>
                        </div>
                        <p style={{fontSize:13,color:'var(--text2)',margin:0,lineHeight:1.6,whiteSpace:'pre-line'}}>{ex.enonce}</p>
                      </div>
                      <div style={{borderTop:'1px solid var(--border)',padding:'10px 20px',display:'flex',gap:10,flexWrap:'wrap'}}>
                        <Link href={`/solve?q=${encodeURIComponent('TIC Bac — '+ch.titre+' — '+ex.enonce)}&subject=informatique`} className="btn btn-primary" style={{fontSize:12,padding:'6px 14px'}}>🤖 Resoudre avec IA</Link>
                        <button onClick={()=>setOpenEx(openEx===ex.id?null:ex.id)} style={{fontSize:12,padding:'6px 14px',borderRadius:8,border:'1px solid var(--border)',background:'transparent',color:'var(--text2)',cursor:'pointer',fontFamily:'inherit'}}>
                          {openEx===ex.id?'Masquer':'Voir correction'}
                        </button>
                      </div>
                      {openEx===ex.id&&(
                        <div style={{padding:'13px 20px',borderTop:'1px solid var(--border)',background:`${secColor}06`}}>
                          <div style={{fontSize:11,color:secColor,fontWeight:700,marginBottom:5}}>✅ Correction</div>
                          <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.75,whiteSpace:'pre-line'}}>{ex.correction}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,borderTop:'1px solid var(--border)',paddingTop:22}}>
                {prevSlug?(<Link href={`/bac/info/autres-sections/${prevSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>← Precedent</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[prevSlug]}</div></div></Link>):<div/>}
                {nextSlug?(<Link href={`/bac/info/autres-sections/${nextSlug}`} style={{textDecoration:'none'}}><div className="card" style={{padding:'13px 16px',textAlign:'right',transition:'transform 0.15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}><div style={{fontSize:11,color:'var(--muted)',marginBottom:3}}>Suivant →</div><div style={{fontWeight:700,fontSize:13}}>{TITRES[nextSlug]}</div></div></Link>):<div/>}
              </div>
            </div>
            <aside style={{position:'sticky',top:88}}>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',marginBottom:14}}>
                <div style={{padding:'11px 15px',borderBottom:'1px solid var(--border)',fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>🌐 TIC Commun · 4 themes</div>
                {NAV_ORDER.map(s=>(
                  <Link key={s} href={`/bac/info/autres-sections/${s}`} style={{textDecoration:'none'}}>
                    <div style={{padding:'10px 15px',borderBottom:'1px solid var(--border)',background:s===slug?`${SEC_COLOR[s]}12`:'transparent',borderLeft:s===slug?`3px solid ${SEC_COLOR[s]}`:'3px solid transparent',transition:'all 0.15s'}}
                      onMouseEnter={e=>{if(s!==slug)(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.03)'}}
                      onMouseLeave={e=>{if(s!==slug)(e.currentTarget as HTMLElement).style.background='transparent'}}>
                      <div style={{fontSize:10,color:'var(--muted)',marginBottom:1,fontFamily:'var(--font-mono)'}}>{NUMS[s]}</div>
                      <div style={{fontSize:11,fontWeight:s===slug?700:400,color:s===slug?SEC_COLOR[s]:'var(--text2)'}}>{TITRES[s]}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:13,padding:'14px'}}>
                <div style={{fontSize:11,color:'var(--muted)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Actions</div>
                <div style={{display:'flex',flexDirection:'column',gap:7}}>
                  <Link href={`/solve?q=${encodeURIComponent('Explique '+ch.titre+' TIC Bac Tunisie')}&subject=informatique`} className="btn btn-primary" style={{textAlign:'center',fontSize:12}}>🤖 Chat IA</Link>
                  <Link href="/examens" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>📋 Examens Bac</Link>
                  <Link href="/bac/info/autres-sections" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>← TIC Commun</Link>
                  <Link href="/bac/info/informatique" className="btn btn-secondary" style={{textAlign:'center',fontSize:12}}>💻 Prog. Info complet</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer/>
      <style>{`@media(max-width:900px){div[style*="grid-template-columns: 1fr 260px"]{grid-template-columns:1fr!important;}aside{display:none;}}`}</style>
    </>
  )
}