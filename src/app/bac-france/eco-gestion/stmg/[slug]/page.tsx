'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION — STMG — PAGE SLUG COMPLÈTE
// Route : /bac-france/eco-gestion/stmg/[slug]
// 5 disciplines : Management · Sc. de gestion · Droit · Économie · Gestion-Finance
// Voie technologique — Première & Terminale STMG
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = ['management','sciences-gestion-numerique','droit','economie','gestion-finance']
const TITRES_NAV: Record<string,string> = {
  'management':                 'D.1 — Management',
  'sciences-gestion-numerique': 'D.2 — Sciences de gestion & numérique',
  'droit':                      'D.3 — Droit',
  'economie':                   'D.4 — Économie',
  'gestion-finance':            'D.5 — Gestion et Finance',
}
const SEC_COLORS: Record<string,string> = {
  'management':'#8b5cf6',
  'sciences-gestion-numerique':'#6366f1',
  'droit':'#f59e0b',
  'economie':'#06b6d4',
  'gestion-finance':'#10b981',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — TOUTES LES DISCIPLINES STMG
// ═════════════════════════════════════════════════════════════════════
const ALL_CHAPTERS: Record<string, {
  id: string; titre: string; badge: string; color: string; emoji: string; desc: string;
  souschapitres: {
    id: string; titre: string; notions: string[];
    blocs: {
      notion: string;
      theoremes: { id:string; type:string; nom:string; enonce:string }[];
      exercices: { id:string; niveau:string; titre:string; enonce:string; correction:string }[];
    }[];
  }[];
}> = {

// ═══ D1 — MANAGEMENT ═══
'management': {
  id:'management', emoji:'🏢', badge:'Management', color:'#8b5cf6',
  titre:'Management',
  desc:'Organisations, finalités, parties prenantes, décision, stratégie et performance.',
  souschapitres:[
    {
      id:'sc-organisation', titre:'1.1 L\'organisation et le management',
      notions:['Organisation','Entreprise','Finalités','Parties prenantes'],
      blocs:[
        {
          notion:'🏢 Organisations et management',
          theoremes:[
            { id:'D-MG1', type:'def', nom:'L\'organisation',
              enonce:'Une organisation est un groupe structuré d\'individus qui coordonnent leurs actions pour atteindre des objectifs communs.\nTrois types : entreprise (privée, but lucratif), organisation publique (intérêt général), organisation de la société civile (associations).' },
            { id:'D-MG2', type:'def', nom:'Finalités et parties prenantes',
              enonce:'La finalité de l\'entreprise est d\'abord financière (réaliser un profit, être pérenne) mais aussi sociétale (RSE).\nLes parties prenantes : actionnaires, salariés, clients, fournisseurs, État — aux intérêts parfois divergents.' },
            { id:'D-MG3', type:'def', nom:'Le management',
              enonce:'Le management est l\'ensemble des techniques de direction, d\'organisation et de gestion.\n• Management stratégique : décisions de long terme (dirigeants).\n• Management opérationnel : gestion courante (encadrement).' },
          ],
          exercices:[
            { id:'EX-MG1', niveau:'Facile', titre:'Type d\'organisation',
              enonce:'Classez : (a) une mairie, (b) une SARL, (c) une association sportive.',
              correction:'(a) organisation publique, (b) entreprise (privée, lucrative), (c) organisation de la société civile (association).' },
          ],
        },
      ],
    },
    {
      id:'sc-strategie', titre:'1.2 Stratégie et performance',
      notions:['Décision','Stratégie','Performance','Efficacité / efficience'],
      blocs:[
        {
          notion:'🎯 Stratégie et performance',
          theoremes:[
            { id:'D-ST1', type:'def', nom:'Décision stratégique / opérationnelle',
              enonce:'• Décision stratégique : long terme, engage durablement l\'organisation (ex : lancer un nouveau produit).\n• Décision opérationnelle : court terme, gestion courante (ex : passer une commande).' },
            { id:'D-ST2', type:'def', nom:'La performance',
              enonce:'La performance est la capacité à atteindre les objectifs.\n• Efficacité : atteindre l\'objectif fixé.\n• Efficience : l\'atteindre avec le minimum de moyens (ressources).' },
          ],
          exercices:[
            { id:'EX-ST1', niveau:'Facile', titre:'Efficacité ou efficience ?',
              enonce:'Une équipe atteint son objectif de ventes mais en dépensant deux fois le budget prévu. Est-elle efficace ? Efficiente ?',
              correction:'Efficace (objectif atteint) mais pas efficiente (trop de moyens consommés).' },
          ],
        },
      ],
    },
  ],
},

// ═══ D2 — SCIENCES DE GESTION & NUMÉRIQUE ═══
'sciences-gestion-numerique': {
  id:'sciences-gestion-numerique', emoji:'💻', badge:'Sciences de gestion', color:'#6366f1',
  titre:'Sciences de gestion et numérique',
  desc:'Système d\'information, données, bases de données et transformation numérique des organisations.',
  souschapitres:[
    {
      id:'sc-si', titre:'2.1 Système d\'information et données',
      notions:['Système d\'information','Données','Bases de données'],
      blocs:[
        {
          notion:'💻 Le système d\'information',
          theoremes:[
            { id:'D-SI1', type:'def', nom:'Le système d\'information (SI)',
              enonce:'Le SI est un ensemble organisé de ressources (matériel, logiciels, données, personnes, procédures) permettant de collecter, stocker, traiter et diffuser l\'information dans l\'organisation.' },
            { id:'D-SI2', type:'def', nom:'Donnée, information, connaissance',
              enonce:'• Donnée : élément brut (un nombre, un nom).\n• Information : donnée traitée et mise en contexte (utile à la décision).\n• Connaissance : information assimilée et mobilisable.' },
            { id:'D-SI3', type:'def', nom:'Base de données',
              enonce:'Ensemble structuré de données organisées en tables, interrogeable par des requêtes, et partagé entre les utilisateurs.' },
          ],
          exercices:[
            { id:'EX-SI1', niveau:'Facile', titre:'Donnée ou information ?',
              enonce:'« 1250 » et « le chiffre d\'affaires de mars est de 1250 € » : que représente chacun ?',
              correction:'« 1250 » est une donnée brute. « Le CA de mars est de 1250 € » est une information (donnée traitée et contextualisée).' },
          ],
        },
      ],
    },
    {
      id:'sc-numerique', titre:'2.2 La transformation numérique',
      notions:['Numérique','PGI / ERP','CRM','Dématérialisation'],
      blocs:[
        {
          notion:'🔗 La transformation numérique',
          theoremes:[
            { id:'P-NU1', type:'prop', nom:'Les impacts du numérique',
              enonce:'Le numérique transforme les organisations : automatisation des processus, progiciels de gestion intégrés (PGI/ERP), gestion de la relation client (CRM), dématérialisation des documents et nouveaux modèles d\'affaires (e-commerce, plateformes).' },
          ],
          exercices:[
            { id:'EX-NU1', niveau:'Facile', titre:'Outil de gestion',
              enonce:'Quel outil permet de centraliser les informations sur les clients (historique, contacts, ventes) ?',
              correction:'Un CRM (Customer Relationship Management / gestion de la relation client).' },
          ],
        },
      ],
    },
  ],
},

// ═══ D3 — DROIT ═══
'droit': {
  id:'droit', emoji:'⚖️', badge:'Droit', color:'#f59e0b',
  titre:'Droit',
  desc:'Règle de droit, personne juridique, contrat, responsabilité et droit du travail.',
  souschapitres:[
    {
      id:'sc-sources', titre:'3.1 La règle de droit et la personne juridique',
      notions:['Règle de droit','Sources du droit','Personne juridique'],
      blocs:[
        {
          notion:'⚖️ Le cadre juridique',
          theoremes:[
            { id:'D-DR1', type:'def', nom:'La règle de droit',
              enonce:'Règle de conduite générale, obligatoire et dont le non-respect est sanctionné par l\'État.\nSources : Constitution, traités, lois, règlements, jurisprudence.' },
            { id:'D-DR2', type:'def', nom:'La personne juridique',
              enonce:'Sujet de droit titulaire de droits et d\'obligations :\n• Personne physique : un individu.\n• Personne morale : un groupement (société, association, État).' },
          ],
          exercices:[
            { id:'EX-DR1', niveau:'Facile', titre:'Personne physique ou morale ?',
              enonce:'Classez : (a) M. Dupont, (b) la société Renault, (c) une association.',
              correction:'(a) personne physique ; (b) et (c) personnes morales.' },
          ],
        },
      ],
    },
    {
      id:'sc-contrat', titre:'3.2 Contrat et responsabilité',
      notions:['Contrat','Responsabilité','Contrat de travail'],
      blocs:[
        {
          notion:'📜 Contrat et responsabilité',
          theoremes:[
            { id:'D-CT1', type:'def', nom:'Le contrat',
              enonce:'Accord de volontés créant des obligations entre les parties.\nConditions de validité : consentement libre, capacité juridique, contenu licite et certain.' },
            { id:'D-CT2', type:'def', nom:'La responsabilité',
              enonce:'Obligation de réparer le dommage causé à autrui.\n• Responsabilité contractuelle : inexécution d\'un contrat.\n• Responsabilité délictuelle : dommage hors contrat.' },
            { id:'D-CT3', type:'def', nom:'Le contrat de travail',
              enonce:'Contrat par lequel un salarié travaille sous la subordination d\'un employeur contre rémunération (CDI, CDD).' },
          ],
          exercices:[
            { id:'EX-CT1', niveau:'Facile', titre:'Validité d\'un contrat',
              enonce:'Citez deux conditions de validité d\'un contrat.',
              correction:'Par exemple : le consentement (libre et éclairé), la capacité juridique des parties, un contenu licite et certain.' },
          ],
        },
      ],
    },
  ],
},

// ═══ D4 — ÉCONOMIE ═══
'economie': {
  id:'economie', emoji:'📈', badge:'Économie', color:'#06b6d4',
  titre:'Économie',
  desc:'Marché, croissance, chômage, mondialisation et rôle de l\'État dans l\'économie.',
  souschapitres:[
    {
      id:'sc-marche', titre:'4.1 Marché et croissance',
      notions:['Marché','Croissance','Chômage'],
      blocs:[
        {
          notion:'📈 Les mécanismes économiques',
          theoremes:[
            { id:'D-EC1', type:'def', nom:'Le marché',
              enonce:'Lieu (réel ou virtuel) de rencontre entre l\'offre et la demande, qui détermine le prix et les quantités échangées.' },
            { id:'F-EC2', type:'formule', nom:'Le taux de croissance',
              enonce:'Taux de croissance = (PIBₙ − PIBₙ₋₁) / PIBₙ₋₁ × 100\n\nLa croissance = augmentation durable de la production (PIB).' },
            { id:'D-EC3', type:'def', nom:'Le chômage',
              enonce:'Déséquilibre du marché du travail.\nTaux de chômage = Chômeurs / Population active × 100.' },
          ],
          exercices:[
            { id:'EX-EC1', niveau:'Moyen', titre:'Calcul du taux de croissance',
              enonce:'Le PIB passe de 2 000 à 2 050 milliards €. Calculez le taux de croissance.',
              correction:'t = (2 050 − 2 000)/2 000 × 100 = 50/2000 × 100 = 2,5 %.' },
          ],
        },
      ],
    },
    {
      id:'sc-mondialisation', titre:'4.2 Mondialisation et rôle de l\'État',
      notions:['Mondialisation','Politiques économiques','Rôle de l\'État'],
      blocs:[
        {
          notion:'🌍 Ouverture et régulation',
          theoremes:[
            { id:'D-MO1', type:'def', nom:'La mondialisation',
              enonce:'Intégration croissante des économies par les échanges de biens, services, capitaux, et l\'action des firmes multinationales (FMN).' },
            { id:'P-MO2', type:'prop', nom:'Le rôle de l\'État',
              enonce:'L\'État régule le marché, redistribue les revenus et soutient l\'activité par des politiques conjoncturelles (relance) et structurelles (formation, infrastructures).' },
          ],
          exercices:[
            { id:'EX-MO1', niveau:'Facile', titre:'Rôle de l\'État',
              enonce:'Citez deux fonctions économiques de l\'État.',
              correction:'Par exemple : réguler les marchés, redistribuer les revenus (protection sociale), produire des biens publics, soutenir l\'activité.' },
          ],
        },
      ],
    },
  ],
},

// ═══ D5 — GESTION ET FINANCE ═══
'gestion-finance': {
  id:'gestion-finance', emoji:'💰', badge:'Gestion-Finance · Terminale', color:'#10b981',
  titre:'Gestion et Finance',
  desc:'Bilan, compte de résultat, équilibre financier (FDR, BFR, trésorerie) et seuil de rentabilité.',
  souschapitres:[
    {
      id:'sc-compta', titre:'5.1 Comptabilité et analyse financière',
      notions:['Bilan','Compte de résultat','FDR','BFR','Trésorerie nette'],
      blocs:[
        {
          notion:'📒 Comptabilité et équilibre financier',
          theoremes:[
            { id:'D-GF1', type:'def', nom:'Le bilan',
              enonce:'Le bilan est une photographie du patrimoine de l\'entreprise à une date donnée.\n• Actif = emplois (ce que l\'entreprise possède : immobilisations, stocks, créances, trésorerie).\n• Passif = ressources (ce qu\'elle doit : capitaux propres, dettes).' },
            { id:'D-GF2', type:'def', nom:'Le compte de résultat',
              enonce:'Il récapitule les produits et les charges d\'un exercice.\nRésultat = Produits − Charges (bénéfice si > 0, perte si < 0).' },
            { id:'F-GF3', type:'formule', nom:'Fonds de roulement (FDR)',
              enonce:'FDR = Capitaux permanents − Actif immobilisé\n\n(Capitaux permanents = capitaux propres + dettes à long terme.)\nLe FDR est la ressource stable disponible pour financer le cycle d\'exploitation.' },
            { id:'F-GF4', type:'formule', nom:'Besoin en fonds de roulement (BFR)',
              enonce:'BFR = Actif circulant d\'exploitation − Passif circulant d\'exploitation\n(≈ Stocks + Créances clients − Dettes fournisseurs)\nLe BFR est le besoin de financement né du décalage entre dépenses et recettes.' },
            { id:'F-GF5', type:'formule', nom:'Trésorerie nette (TN)',
              enonce:'TN = FDR − BFR\n\n• TN > 0 : la trésorerie est excédentaire.\n• TN < 0 : l\'entreprise doit recourir à des financements à court terme.' },
          ],
          exercices:[
            { id:'EX-GF1', niveau:'Moyen', titre:'Calcul FDR, BFR et trésorerie',
              enonce:'Capitaux permanents : 800 000 €. Actif immobilisé : 600 000 €. BFR : 150 000 €. Calculez le FDR puis la trésorerie nette.',
              correction:'FDR = 800 000 − 600 000 = 200 000 €.\nTN = FDR − BFR = 200 000 − 150 000 = 50 000 € (trésorerie positive).' },
          ],
        },
      ],
    },
    {
      id:'sc-rentabilite', titre:'5.2 Rentabilité, investissement et financement',
      notions:['Marge sur coût variable','Seuil de rentabilité','Investissement','Financement'],
      blocs:[
        {
          notion:'💹 Rentabilité et seuil de rentabilité',
          theoremes:[
            { id:'D-RE1', type:'def', nom:'Marge sur coût variable (MCV)',
              enonce:'MCV = Chiffre d\'affaires − Charges variables.\nTaux de MCV = MCV / Chiffre d\'affaires.\nElle mesure ce qui reste pour couvrir les charges fixes et dégager un bénéfice.' },
            { id:'F-RE2', type:'formule', nom:'Seuil de rentabilité (SR)',
              enonce:'Seuil de rentabilité = Charges fixes / Taux de marge sur coût variable\n\nC\'est le chiffre d\'affaires à partir duquel l\'entreprise commence à réaliser un bénéfice (le « point mort »).' },
            { id:'D-RE3', type:'def', nom:'Investissement et financement',
              enonce:'L\'investissement (achat de biens durables) se finance par : autofinancement (capacité d\'autofinancement), emprunt bancaire, ou augmentation de capital.' },
          ],
          exercices:[
            { id:'EX-RE1', niveau:'Moyen', titre:'Calcul du seuil de rentabilité',
              enonce:'Charges fixes : 60 000 €. Taux de marge sur coût variable : 40 %. Calculez le seuil de rentabilité.',
              correction:'SR = 60 000 / 0,40 = 150 000 € de chiffre d\'affaires.\nAu-delà de 150 000 € de CA, l\'entreprise réalise un bénéfice.' },
          ],
        },
      ],
    },
  ],
},

}

export default function EcoGestionSTMGChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [activeTab, setActiveTab] = useState<string>('')

  const currentTabId = activeTab || (chapter?.souschapitres[0]?.id ?? '')
  const currentSC = chapter?.souschapitres.find(sc => sc.id === currentTabId) || chapter?.souschapitres[0]

  if (!chapter) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>🏢</div>
      <h2>Discipline en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Cette discipline sera disponible prochainement.</p>
      <Link href="/bac-france/eco-gestion/stmg" className="btn btn-primary">← Retour STMG</Link>
    </div>
  )

  const secColor = chapter.color
  const idx = NAV_ORDER.indexOf(slug)
  const numCh = String(idx+1).padStart(2,'0')
  const prevSlug = idx > 0 ? NAV_ORDER[idx-1] : null
  const nextSlug = idx < NAV_ORDER.length-1 ? NAV_ORDER[idx+1] : null

  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, paddingTop:80 }}>
        <div className="container" style={{ paddingTop:32, paddingBottom:80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--muted)', marginBottom:24, flexWrap:'wrap' }}>
            <Link href="/bac-france" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/eco-gestion" style={{ color:'var(--muted)', textDecoration:'none' }}>Économie & Gestion</Link>
            <span>›</span>
            <Link href="/bac-france/eco-gestion/stmg" style={{ color:'var(--muted)', textDecoration:'none' }}>STMG</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header discipline */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>D.{numCh}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(139,92,246,0.15)', color:'#a78bfa', fontWeight:700 }}>⭐ BAC · STMG</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(22px,3vw,36px)', marginBottom:10 }}>
              {chapter.emoji} {chapter.titre}
            </h1>
            <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.7 }}>{chapter.desc}</p>
          </div>

          {/* Onglets sous-chapitres */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:28, borderBottom:'1px solid var(--border)', paddingBottom:12 }}>
            {chapter.souschapitres.map(sc => (
              <button key={sc.id}
                onClick={() => { setActiveTab(sc.id); setOpenEx(null) }}
                style={{ padding:'7px 14px', borderRadius:10,
                  border:`1px solid ${(activeTab||chapter.souschapitres[0].id)===sc.id ? secColor : 'var(--border)'}`,
                  background: (activeTab||chapter.souschapitres[0].id)===sc.id ? `${secColor}18` : 'transparent',
                  color: (activeTab||chapter.souschapitres[0].id)===sc.id ? secColor : 'var(--muted)',
                  fontSize:12, fontWeight:(activeTab||chapter.souschapitres[0].id)===sc.id ? 800 : 500,
                  cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                {sc.titre}
              </button>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:28, alignItems:'start' }}>

            <div>
              {currentSC && (
                <>
                  <div style={{ marginBottom:20, padding:'14px 18px', background:`${secColor}0a`, border:`1px solid ${secColor}25`, borderRadius:12 }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>Sous-partie active</div>
                    <div style={{ fontSize:16, fontWeight:800, color:secColor }}>{currentSC.titre}</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:8 }}>
                      {currentSC.notions.map(n => (
                        <span key={n} style={{ fontSize:10, padding:'2px 9px', borderRadius:14, background:`${secColor}15`, color:'var(--text2)', border:`1px solid ${secColor}20` }}>{n}</span>
                      ))}
                    </div>
                  </div>

                  {currentSC.blocs.map(bloc => (
                    <div key={bloc.notion} style={{ marginBottom:36 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:8, borderBottom:`2px solid ${secColor}20` }}>
                        <div style={{ width:3, height:22, background:secColor, borderRadius:2 }}/>
                        <h2 style={{ fontSize:15, fontWeight:800, color:'var(--text)', margin:0 }}>{bloc.notion}</h2>
                      </div>

                      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:16 }}>
                        {bloc.theoremes.map(t => (
                          <div key={t.id} style={{ border:`1px solid ${C[t.type as keyof typeof C]||secColor}30`, borderLeft:`4px solid ${C[t.type as keyof typeof C]||secColor}`, borderRadius:'0 12px 12px 0', overflow:'hidden' }}>
                            <div style={{ background:`${C[t.type as keyof typeof C]||secColor}10`, padding:'9px 15px', display:'flex', gap:10, alignItems:'center' }}>
                              <span style={{ fontSize:10, fontWeight:800, color:C[t.type as keyof typeof C]||secColor, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', background:`${C[t.type as keyof typeof C]||secColor}20`, padding:'2px 8px', borderRadius:6 }}>{L[t.type]||t.type}</span>
                              <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{t.nom}</span>
                            </div>
                            <div style={{ padding:'12px 16px', background:'rgba(255,255,255,0.02)' }}>
                              <pre style={{ fontSize:12.5, color:'var(--text2)', lineHeight:1.85, margin:0, fontFamily:'var(--font-body)', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{t.enonce}</pre>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.07em' }}>📝 Exercices</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {bloc.exercices.map(ex => (
                            <div key={ex.id} style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
                              <div style={{ padding:'10px 16px', display:'flex', gap:10, alignItems:'flex-start' }}>
                                <div style={{ flexShrink:0 }}>
                                  <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--muted)' }}>{ex.id}</span>
                                  <div style={{ marginTop:2 }}>
                                    <span style={{ fontSize:9, padding:'2px 7px', borderRadius:20, fontWeight:700,
                                      background: ex.niveau==='Facile'?'rgba(16,185,129,0.15)':ex.niveau==='Difficile'?'rgba(239,68,68,0.15)':'rgba(245,158,11,0.15)',
                                      color: ex.niveau==='Facile'?'#34d399':ex.niveau==='Difficile'?'#f87171':'#fbbf24'
                                    }}>{ex.niveau}</span>
                                  </div>
                                </div>
                                <div style={{ flex:1 }}>
                                  <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{ex.titre}</div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.65 }}>{ex.enonce}</div>
                                </div>
                              </div>
                              <div style={{ borderTop:'1px solid var(--border)', padding:'8px 16px', display:'flex', gap:8, flexWrap:'wrap' }}>
                                <Link href={`/solve?q=${encodeURIComponent('STMG — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
                                  🧮 Résoudre avec IA
                                </Link>
                                <button onClick={() => setOpenEx(openEx===ex.id?null:ex.id)}
                                  style={{ fontSize:11, padding:'5px 12px', borderRadius:7, border:'1px solid var(--border)', background:'transparent', color:'var(--text2)', cursor:'pointer', fontFamily:'inherit' }}>
                                  📋 {openEx===ex.id?'Masquer':'Correction'}
                                </button>
                              </div>
                              {openEx===ex.id && (
                                <div style={{ padding:'10px 16px', borderTop:'1px solid var(--border)', background:`${secColor}06` }}>
                                  <div style={{ fontSize:10, color:secColor, fontWeight:700, marginBottom:4 }}>✅ Correction</div>
                                  <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.75, whiteSpace:'pre-line' }}>{ex.correction}</div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/eco-gestion/stmg/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/eco-gestion/stmg/${nextSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', textAlign:'right', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>Suivant →</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[nextSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
              </div>
            </div>

            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  🏢 STMG — 5 disciplines
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/eco-gestion/stmg/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>D.{String(i+1).padStart(2,'0')}</div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^D\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' en STMG')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧮 Solveur Gestion</Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac-france/eco-gestion/stmg" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Toutes les disciplines</Link>
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