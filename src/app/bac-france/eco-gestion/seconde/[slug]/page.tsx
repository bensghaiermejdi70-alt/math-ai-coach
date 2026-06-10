'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION — SECONDE (SES) — PAGE SLUG COMPLÈTE
// Route : /bac-france/eco-gestion/seconde/[slug]
// 5 chapitres : Richesses · Prix · Socialisation · Vie politique · Emploi
// Programme officiel MEN — Sciences Économiques et Sociales
// ══════════════════════════════════════════════════════════════════════

const C = { thm:'#4f6ef7', def:'#06d6a0', formule:'#f59e0b', prop:'#8b5cf6', methode:'#ec4899' }
const L: Record<string,string> = { thm:'Théorème', def:'Définition', formule:'Formule clé', prop:'Propriété', methode:'Méthode' }

const NAV_ORDER = ['richesses-creation-mesure','formation-prix-marche','socialisation-acteurs-sociaux','organisation-vie-politique','diplome-emploi-salaire']
const TITRES_NAV: Record<string,string> = {
  'richesses-creation-mesure':    'CH.1 — Création & mesure des richesses',
  'formation-prix-marche':        'CH.2 — Formation des prix',
  'socialisation-acteurs-sociaux':'CH.3 — Socialisation',
  'organisation-vie-politique':   'CH.4 — Vie politique',
  'diplome-emploi-salaire':       'CH.5 — Diplôme, emploi, salaire',
}
const SEC_COLORS: Record<string,string> = {
  'richesses-creation-mesure':'#10b981',
  'formation-prix-marche':'#06b6d4',
  'socialisation-acteurs-sociaux':'#8b5cf6',
  'organisation-vie-politique':'#f59e0b',
  'diplome-emploi-salaire':'#f43f5e',
}

// ═════════════════════════════════════════════════════════════════════
// DONNÉES — TOUS LES CHAPITRES SECONDE
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

// ═══ CH1 — CRÉATION & MESURE DES RICHESSES ═══
'richesses-creation-mesure': {
  id:'richesses-creation-mesure', emoji:'💰', badge:'Économie', color:'#10b981',
  titre:'Comment crée-t-on des richesses et comment les mesure-t-on ?',
  desc:'Production, valeur ajoutée, PIB, croissance et productivité — comment l\'économie crée et mesure les richesses.',
  souschapitres:[
    {
      id:'sc-production', titre:'1.1 La production de richesses',
      notions:['Production marchande / non marchande','Facteurs de production','Entreprise'],
      blocs:[
        {
          notion:'🏭 Production & facteurs de production',
          theoremes:[
            { id:'D-PR1', type:'def', nom:'La production',
              enonce:'La production est l\'activité économique qui crée des biens et des services destinés à satisfaire des besoins.\n\n• Bien = produit matériel (pain, voiture)\n• Service = produit immatériel (coiffure, transport)' },
            { id:'D-PR2', type:'def', nom:'Production marchande / non marchande',
              enonce:'• Production marchande : vendue sur un marché à un prix qui couvre au moins les coûts de production (entreprises).\n• Production non marchande : fournie gratuitement ou quasi-gratuitement (services publics : école, hôpital public).' },
            { id:'D-PR3', type:'def', nom:'Les facteurs de production',
              enonce:'Pour produire, on combine :\n• le travail (facteur travail : la main-d\'œuvre)\n• le capital (facteur capital : machines, locaux, outils — le capital technique).' },
          ],
          exercices:[
            { id:'EX-PR1', niveau:'Facile', titre:'Marchand ou non marchand ?',
              enonce:'Classez : (a) une baguette en boulangerie, (b) un cours au lycée public, (c) une consultation chez un médecin libéral, (d) la justice rendue par un tribunal.',
              correction:'Marchand : (a) baguette, (c) consultation libérale (payée à un prix couvrant les coûts).\nNon marchand : (b) cours au lycée public, (d) justice (services publics gratuits ou quasi-gratuits).' },
          ],
        },
      ],
    },
    {
      id:'sc-mesure', titre:'1.2 La mesure des richesses',
      notions:['Valeur ajoutée','PIB','Croissance économique'],
      blocs:[
        {
          notion:'📊 Valeur ajoutée, PIB & croissance',
          theoremes:[
            { id:'F-VA1', type:'formule', nom:'La valeur ajoutée',
              enonce:'VA = Valeur de la production − Consommations intermédiaires (CI)\n\nLes CI sont les biens et services détruits ou transformés au cours de la production (matières premières, énergie…).\nLa VA mesure la richesse réellement créée par l\'entreprise.' },
            { id:'F-PIB1', type:'formule', nom:'Le PIB (Produit Intérieur Brut)',
              enonce:'PIB = somme des valeurs ajoutées de toutes les unités productives d\'un pays (+ TVA et droits de douane − subventions).\n\nLe PIB mesure la richesse créée dans un pays sur une année.' },
            { id:'F-CR1', type:'formule', nom:'Le taux de croissance',
              enonce:'Taux de croissance = (PIBₙ − PIBₙ₋₁) / PIBₙ₋₁ × 100\n\nLa croissance économique = augmentation soutenue de la production (du PIB réel) sur une longue période.' },
          ],
          exercices:[
            { id:'EX-VA1', niveau:'Facile', titre:'Calcul de valeur ajoutée',
              enonce:'Une menuiserie vend pour 500 000 € de meubles. Elle a acheté 200 000 € de bois et 30 000 € d\'électricité. Calculez sa valeur ajoutée.',
              correction:'CI = 200 000 + 30 000 = 230 000 €\nVA = 500 000 − 230 000 = 270 000 €' },
            { id:'EX-CR1', niveau:'Moyen', titre:'Calcul du taux de croissance',
              enonce:'Le PIB d\'un pays passe de 2 400 milliards € (2023) à 2 496 milliards € (2024). Calculez le taux de croissance.',
              correction:'t = (2 496 − 2 400) / 2 400 × 100 = 96/2400 × 100 = 4 %' },
          ],
        },
      ],
    },
    {
      id:'sc-productivite', titre:'1.3 La productivité',
      notions:['Productivité du travail','Gains de productivité'],
      blocs:[
        {
          notion:'⚙️ La productivité',
          theoremes:[
            { id:'F-PROD1', type:'formule', nom:'Productivité du travail',
              enonce:'Productivité du travail = Production / Quantité de facteur travail\n(quantité de travail = nombre de travailleurs ou nombre d\'heures travaillées)' },
            { id:'D-PROD2', type:'def', nom:'Gains de productivité',
              enonce:'Une hausse de la productivité (gains de productivité) permet :\n• de baisser les coûts de production,\n• d\'augmenter les salaires et/ou les profits,\n• de baisser les prix de vente.' },
          ],
          exercices:[
            { id:'EX-PROD1', niveau:'Facile', titre:'Calcul de productivité',
              enonce:'Un atelier produit 1 200 pièces avec 40 heures de travail. Calculez la productivité horaire.',
              correction:'Productivité = 1 200 / 40 = 30 pièces par heure.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH2 — FORMATION DES PRIX SUR UN MARCHÉ ═══
'formation-prix-marche': {
  id:'formation-prix-marche', emoji:'📈', badge:'Économie', color:'#06b6d4',
  titre:'Comment se forment les prix sur un marché ?',
  desc:'Offre, demande, prix d\'équilibre et marché concurrentiel — le mécanisme de formation des prix.',
  souschapitres:[
    {
      id:'sc-offre-demande', titre:'2.1 L\'offre et la demande',
      notions:['Offre','Demande','Loi de l\'offre et de la demande'],
      blocs:[
        {
          notion:'📈 L\'offre et la demande',
          theoremes:[
            { id:'D-DE1', type:'def', nom:'La demande',
              enonce:'La demande est la quantité d\'un bien que les consommateurs sont prêts à acheter à un prix donné.\n\nLoi de la demande : quand le prix augmente, la demande diminue (courbe décroissante).' },
            { id:'D-OF1', type:'def', nom:'L\'offre',
              enonce:'L\'offre est la quantité d\'un bien que les producteurs sont prêts à vendre à un prix donné.\n\nLoi de l\'offre : quand le prix augmente, l\'offre augmente (courbe croissante).' },
          ],
          exercices:[
            { id:'EX-OD1', niveau:'Facile', titre:'Sens de variation',
              enonce:'Le prix d\'un bien augmente. Comment évoluent (a) la quantité demandée, (b) la quantité offerte ?',
              correction:'(a) La quantité demandée diminue (loi de la demande).\n(b) La quantité offerte augmente (loi de l\'offre).' },
          ],
        },
      ],
    },
    {
      id:'sc-equilibre', titre:'2.2 Le prix d\'équilibre',
      notions:['Prix d\'équilibre','Marché concurrentiel','Variations des prix'],
      blocs:[
        {
          notion:'⚖️ L\'équilibre de marché',
          theoremes:[
            { id:'D-EQ1', type:'def', nom:'Le prix d\'équilibre',
              enonce:'Le prix d\'équilibre est le prix pour lequel la quantité offerte est égale à la quantité demandée (offre = demande).\nÀ ce prix correspond la quantité d\'équilibre échangée sur le marché.' },
            { id:'P-EQ1', type:'prop', nom:'Les déséquilibres',
              enonce:'• Si le prix est supérieur au prix d\'équilibre → excès d\'offre (mévente, surproduction) → le prix baisse.\n• Si le prix est inférieur au prix d\'équilibre → pénurie (excès de demande) → le prix monte.' },
            { id:'D-EQ2', type:'def', nom:'Le marché concurrentiel',
              enonce:'Un marché concurrentiel suppose : de nombreux offreurs et demandeurs, un produit homogène, la libre entrée sur le marché et une information transparente. Aucun acteur ne peut imposer son prix.' },
          ],
          exercices:[
            { id:'EX-EQ1', niveau:'Moyen', titre:'Trouver le prix d\'équilibre',
              enonce:'Prix 2 € : offre 100, demande 300. Prix 4 € : offre 200, demande 200. Prix 6 € : offre 300, demande 100. Quel est le prix d\'équilibre ?',
              correction:'Le prix d\'équilibre est 4 € : à ce prix, offre = demande = 200 unités.' },
            { id:'EX-EQ2', niveau:'Facile', titre:'Effet d\'une hausse de la demande',
              enonce:'La mode fait fortement augmenter la demande d\'un vêtement. Que deviennent le prix et la quantité échangée ?',
              correction:'La demande augmente → le prix d\'équilibre augmente et la quantité échangée augmente.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH3 — SOCIALISATION ═══
'socialisation-acteurs-sociaux': {
  id:'socialisation-acteurs-sociaux', emoji:'👥', badge:'Sociologie', color:'#8b5cf6',
  titre:'Comment devenons-nous des acteurs sociaux ?',
  desc:'Socialisation, normes, valeurs et instances de socialisation — comment l\'individu devient un être social.',
  souschapitres:[
    {
      id:'sc-socialisation', titre:'3.1 La socialisation',
      notions:['Socialisation','Normes','Valeurs'],
      blocs:[
        {
          notion:'👥 Socialisation, normes et valeurs',
          theoremes:[
            { id:'D-SO1', type:'def', nom:'La socialisation',
              enonce:'La socialisation est le processus par lequel un individu apprend et intériorise les normes et les valeurs de la société dans laquelle il vit. Elle fait de lui un acteur social.' },
            { id:'D-SO2', type:'def', nom:'Les normes',
              enonce:'Les normes sont des règles de conduite qui orientent le comportement des individus. Elles peuvent être explicites (lois) ou implicites (politesse).' },
            { id:'D-SO3', type:'def', nom:'Les valeurs',
              enonce:'Les valeurs sont des idéaux, des principes partagés par les membres d\'une société (liberté, égalité, respect, solidarité). Les normes découlent des valeurs.' },
          ],
          exercices:[
            { id:'EX-SO1', niveau:'Facile', titre:'Norme ou valeur ?',
              enonce:'Classez : (a) la tolérance, (b) dire « bonjour » en arrivant, (c) la solidarité, (d) respecter le code de la route.',
              correction:'Valeurs : (a) tolérance, (c) solidarité (idéaux).\nNormes : (b) dire bonjour, (d) respecter le code de la route (règles de conduite).' },
          ],
        },
      ],
    },
    {
      id:'sc-instances', titre:'3.2 Les instances de socialisation',
      notions:['Famille','École','Groupe de pairs','Socialisation différenciée'],
      blocs:[
        {
          notion:'🏠 Les instances de socialisation',
          theoremes:[
            { id:'D-IN1', type:'def', nom:'La socialisation primaire',
              enonce:'La socialisation primaire est celle de l\'enfance : c\'est la plus déterminante. Elle est assurée surtout par la famille puis par l\'école.' },
            { id:'D-IN2', type:'def', nom:'Les instances de socialisation',
              enonce:'Ce sont les groupes et institutions qui socialisent l\'individu : la famille, l\'école, le groupe de pairs (les amis), les médias et les réseaux sociaux.' },
            { id:'P-IN3', type:'prop', nom:'Une socialisation différenciée',
              enonce:'La socialisation diffère selon le genre (filles/garçons) et selon le milieu social d\'origine : on n\'intériorise pas les mêmes normes et goûts selon son groupe.' },
          ],
          exercices:[
            { id:'EX-IN1', niveau:'Facile', titre:'Identifier l\'instance',
              enonce:'Quelle instance de socialisation : (a) apprendre à lire, (b) suivre la mode de ses amis, (c) apprendre à parler ?',
              correction:'(a) l\'école, (b) le groupe de pairs, (c) la famille (socialisation primaire).' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH4 — ORGANISATION DE LA VIE POLITIQUE ═══
'organisation-vie-politique': {
  id:'organisation-vie-politique', emoji:'🏛️', badge:'Science politique', color:'#f59e0b',
  titre:'Comment s\'organise la vie politique ?',
  desc:'Démocratie, citoyenneté, institutions et participation politique — comment fonctionne la vie politique.',
  souschapitres:[
    {
      id:'sc-democratie', titre:'4.1 La démocratie et la citoyenneté',
      notions:['Démocratie','Citoyenneté','Institutions politiques'],
      blocs:[
        {
          notion:'🏛️ Démocratie & citoyenneté',
          theoremes:[
            { id:'D-DM1', type:'def', nom:'La démocratie',
              enonce:'La démocratie est un régime politique dans lequel le pouvoir appartient au peuple.\n• Démocratie directe : les citoyens votent eux-mêmes les lois.\n• Démocratie représentative : les citoyens élisent des représentants.' },
            { id:'D-DM2', type:'def', nom:'La citoyenneté',
              enonce:'La citoyenneté est le statut qui confère des droits (voter, être élu, s\'exprimer) et des devoirs (respecter la loi, payer l\'impôt).' },
            { id:'D-DM3', type:'def', nom:'La séparation des pouvoirs',
              enonce:'Pour éviter les abus, le pouvoir est divisé (Montesquieu) :\n• législatif (faire les lois — Parlement),\n• exécutif (appliquer les lois — gouvernement),\n• judiciaire (juger — tribunaux).' },
          ],
          exercices:[
            { id:'EX-DM1', niveau:'Facile', titre:'Directe ou représentative ?',
              enonce:'(a) Les électeurs élisent des députés qui votent les lois. (b) Les citoyens votent directement une loi par référendum. Quel type de démocratie ?',
              correction:'(a) démocratie représentative, (b) démocratie directe.' },
          ],
        },
      ],
    },
    {
      id:'sc-participation', titre:'4.2 La participation politique',
      notions:['Vote','Participation','Abstention'],
      blocs:[
        {
          notion:'🗳️ La participation politique',
          theoremes:[
            { id:'D-PA1', type:'def', nom:'Le vote',
              enonce:'Le vote est le principal acte de participation politique. En France, le suffrage est universel, égal et secret.' },
            { id:'D-PA2', type:'def', nom:'La participation politique',
              enonce:'La participation politique regroupe le vote mais aussi le militantisme, la manifestation, la pétition, l\'engagement associatif ou syndical.' },
            { id:'P-PA3', type:'prop', nom:'L\'abstention',
              enonce:'L\'abstention est le fait de ne pas voter. Elle varie selon l\'âge (plus forte chez les jeunes), le diplôme et l\'intérêt pour la politique.' },
          ],
          exercices:[
            { id:'EX-PA1', niveau:'Facile', titre:'Formes de participation',
              enonce:'Citez trois formes de participation politique autres que le vote.',
              correction:'Par exemple : manifester, adhérer à un parti ou un syndicat, signer une pétition, s\'engager dans une association.' },
          ],
        },
      ],
    },
  ],
},

// ═══ CH5 — DIPLÔME, EMPLOI ET SALAIRE ═══
'diplome-emploi-salaire': {
  id:'diplome-emploi-salaire', emoji:'🎓', badge:'Regards croisés', color:'#f43f5e',
  titre:'Diplôme, emploi et salaire',
  desc:'Qualification, insertion professionnelle, salaire et chômage — le lien entre formation et emploi.',
  souschapitres:[
    {
      id:'sc-diplome-emploi', titre:'5.1 Diplôme et emploi',
      notions:['Qualification','Emploi','Insertion professionnelle'],
      blocs:[
        {
          notion:'🎓 Diplôme & insertion professionnelle',
          theoremes:[
            { id:'D-DI1', type:'def', nom:'La qualification',
              enonce:'La qualification désigne l\'ensemble des savoirs, compétences et aptitudes d\'un individu, reconnus par un diplôme et/ou l\'expérience professionnelle.' },
            { id:'P-DI2', type:'prop', nom:'Diplôme et accès à l\'emploi',
              enonce:'Plus le niveau de diplôme est élevé :\n• plus l\'accès à l\'emploi est facile,\n• plus le risque de chômage est faible,\n• plus le salaire moyen est élevé.' },
            { id:'D-DI3', type:'def', nom:'L\'insertion professionnelle',
              enonce:'L\'insertion professionnelle est le passage de la formation (études) à un emploi stable.' },
          ],
          exercices:[
            { id:'EX-DI1', niveau:'Facile', titre:'Lecture de données',
              enonce:'Le taux de chômage est de 12 % chez les non-diplômés et de 4 % chez les diplômés du supérieur. Que peut-on en conclure ?',
              correction:'Le diplôme protège du chômage : le taux de chômage diminue quand le niveau de diplôme augmente (12 % → 4 %).' },
          ],
        },
      ],
    },
    {
      id:'sc-salaire-chomage', titre:'5.2 Le salaire et le chômage',
      notions:['Salaire','Chômage','Population active'],
      blocs:[
        {
          notion:'💶 Salaire & chômage',
          theoremes:[
            { id:'D-SA1', type:'def', nom:'Le salaire',
              enonce:'Le salaire est la rémunération du travail salarié.\n• Salaire brut : avant cotisations sociales.\n• Salaire net : ce que perçoit le salarié.\n• SMIC : salaire minimum légal.' },
            { id:'D-SA2', type:'def', nom:'Le chômage',
              enonce:'Au sens du BIT, un chômeur est une personne sans emploi, disponible pour travailler et qui recherche activement un emploi.\nLa population active = personnes en emploi + chômeurs.' },
            { id:'F-SA3', type:'formule', nom:'Le taux de chômage',
              enonce:'Taux de chômage = Nombre de chômeurs / Population active × 100' },
          ],
          exercices:[
            { id:'EX-SA1', niveau:'Moyen', titre:'Calcul du taux de chômage',
              enonce:'Dans une ville, la population active est de 1 000 personnes dont 80 chômeurs. Calculez le taux de chômage.',
              correction:'Taux de chômage = 80 / 1 000 × 100 = 8 %.' },
          ],
        },
      ],
    },
  ],
},

}

export default function EcoGestionSecondeChapPage() {
  const params = useParams()
  const slug = params.slug as string
  const chapter = ALL_CHAPTERS[slug]
  const [openEx, setOpenEx] = useState<string|null>(null)
  const [activeTab, setActiveTab] = useState<string>('')

  const currentTabId = activeTab || (chapter?.souschapitres[0]?.id ?? '')
  const currentSC = chapter?.souschapitres.find(sc => sc.id === currentTabId) || chapter?.souschapitres[0]

  if (!chapter) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:48 }}>📊</div>
      <h2>Chapitre en cours de rédaction</h2>
      <p style={{ color:'var(--muted)' }}>Ce chapitre sera disponible prochainement.</p>
      <Link href="/bac-france/eco-gestion/seconde" className="btn btn-primary">← Retour Seconde SES</Link>
    </div>
  )

  const secColor = chapter.color
  const idx = NAV_ORDER.indexOf(slug)
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
            <Link href="/bac-france/eco-gestion/seconde" style={{ color:'var(--muted)', textDecoration:'none' }}>Seconde</Link>
            <span>›</span>
            <span style={{ color:secColor }}>{chapter.emoji} {chapter.titre}</span>
          </div>

          {/* Header chapitre */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, color:secColor }}>CH.0{idx+1}</span>
              <span className="label">{chapter.badge}</span>
              <span style={{ fontSize:11, padding:'2px 9px', borderRadius:20, background:'rgba(16,185,129,0.15)', color:'#34d399', fontWeight:700 }}>Seconde · SES</span>
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

            {/* Contenu principal */}
            <div>
              {currentSC && (
                <>
                  <div style={{ marginBottom:20, padding:'14px 18px', background:`${secColor}0a`, border:`1px solid ${secColor}25`, borderRadius:12 }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>Sous-chapitre actif</div>
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
                                <Link href={`/solve?q=${encodeURIComponent('SES Seconde — '+ex.enonce)}`} className="btn btn-primary" style={{ fontSize:11, padding:'5px 12px' }}>
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

              {/* Navigation prev/next */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, borderTop:'1px solid var(--border)', paddingTop:20, marginTop:12 }}>
                {prevSlug ? (
                  <Link href={`/bac-france/eco-gestion/seconde/${prevSlug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ padding:'12px 15px', transition:'transform 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:2 }}>← Précédent</div>
                      <div style={{ fontWeight:700, fontSize:12 }}>{TITRES_NAV[prevSlug]}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextSlug ? (
                  <Link href={`/bac-france/eco-gestion/seconde/${nextSlug}`} style={{ textDecoration:'none' }}>
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

            {/* Sidebar */}
            <aside style={{ position:'sticky', top:88 }}>
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                  📊 Seconde SES — 5 chapitres
                </div>
                {NAV_ORDER.map((s,i) => (
                  <Link key={s} href={`/bac-france/eco-gestion/seconde/${s}`} style={{ textDecoration:'none' }}>
                    <div style={{ padding:'9px 15px', borderBottom:i<NAV_ORDER.length-1?'1px solid var(--border)':'none',
                      background:s===slug?`${SEC_COLORS[s]}12`:'transparent',
                      borderLeft:s===slug?`3px solid ${SEC_COLORS[s]}`:'3px solid transparent',
                      transition:'all 0.15s', cursor:'pointer' }}
                      onMouseEnter={e=>{ if(s!==slug) e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                      onMouseLeave={e=>{ if(s!==slug) e.currentTarget.style.background='transparent' }}>
                      <div style={{ fontSize:10, color:'var(--muted)', marginBottom:1, fontFamily:'var(--font-mono)' }}>CH.0{i+1}</div>
                      <div style={{ fontSize:11, fontWeight:s===slug?700:400, color:s===slug?SEC_COLORS[s]:'var(--text2)' }}>{TITRES_NAV[s].replace(/^CH\.\d+ — /,'')}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'13px' }}>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:9 }}>Actions</div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <Link href={`/chat?q=${encodeURIComponent('Explique-moi '+chapter.titre+' en SES Seconde')}`} className="btn btn-primary" style={{ textAlign:'center', fontSize:12 }}>
                    🤖 Chat IA — {chapter.badge}
                  </Link>
                  <Link href="/solve" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>🧮 Solveur SES</Link>
                  <Link href="/simulation-france" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>📋 Simulation Bac</Link>
                  <Link href="/bac-france/eco-gestion/seconde" className="btn btn-secondary" style={{ textAlign:'center', fontSize:12 }}>↩ Tous les chapitres</Link>
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