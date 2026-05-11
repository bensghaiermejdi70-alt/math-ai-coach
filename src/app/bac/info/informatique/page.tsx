'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════
//  Page index — Matière Informatique (Section Sciences Info)
//  Route : /bac/info/informatique
//  16 chapitres : Algo (6) + BD (6) + TIC (4)
// ══════════════════════════════════════════════════════════════

const COLOR_ALGO = '#4f6ef7'
const COLOR_BD   = '#8b5cf6'
const COLOR_TIC  = '#06d6a0'

const BLOCS = [
  {
    id: 'algo', icon: '🧮', label: 'Bloc 1 — Algorithmique & Programmation',
    color: COLOR_ALGO, bg: 'rgba(79,110,247,0.08)', border: 'rgba(79,110,247,0.2)',
    chapitres: [
      { ch: 'CH 01', slug: 'notions-base-algo',           titre: "Notions de base de l'algorithmique",  badge: 'Algorithmique', nbThm: 4, nbEx: 2, desc: "Algorithme, pseudo-code, variables (entier/réel/booléen/chaîne), déclaration, affectation, Read/Write." },
      { ch: 'CH 02', slug: 'structures-controle',          titre: 'Structures de contrôle',               badge: 'Algorithmique', nbThm: 3, nbEx: 3, desc: "IF / IF…ELSE / SI imbriqués · FOR / WHILE / REPEAT · Opérateurs AND/OR/NOT." },
      { ch: 'CH 03', slug: 'structures-donnees',           titre: 'Structures de données',                badge: 'Algorithmique', nbThm: 3, nbEx: 1, desc: "Tableaux 1D et 2D · Chaînes de caractères (fonctions) · Enregistrements (records)." },
      { ch: 'CH 04', slug: 'sous-programmes',              titre: 'Sous-programmes',                      badge: 'Algorithmique', nbThm: 2, nbEx: 1, desc: "Procédures (sans retour) · Fonctions (avec retour) · Passage par valeur et référence." },
      { ch: 'CH 05', slug: 'algorithmes-avances',          titre: 'Algorithmes avancés',                  badge: 'Algorithmique', nbThm: 4, nbEx: 1, desc: "Tri sélection/insertion · Recherche séquentielle/dichotomique · Complexité O(n), O(log n)." },
      { ch: 'CH 06', slug: 'programmation-pascal-python',  titre: 'Programmation Pascal / Python',        badge: 'Programmation', nbThm: 3, nbEx: 2, desc: "Syntaxe Pascal et Python · Transformation algorithme → code · Débogage." },
    ],
  },
  {
    id: 'bd', icon: '🗄️', label: 'Bloc 2 — Bases de données',
    color: COLOR_BD, bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)',
    chapitres: [
      { ch: 'CH 07', slug: 'concepts-base-bd',             titre: 'Concepts de base des bases de données', badge: 'Bases de données', nbThm: 3, nbEx: 1, desc: "Définition BDD · Tables (enregistrements/champs) · Clé primaire · SGBD." },
      { ch: 'CH 08', slug: 'modelisation-relationnelle',   titre: 'Modélisation relationnelle',            badge: 'Bases de données', nbThm: 2, nbEx: 1, desc: "Modèle E/A · Relations 1-1, 1-N, N-N · Clé étrangère · Intégrité référentielle." },
      { ch: 'CH 09', slug: 'sql-requetes-simples',         titre: 'SQL — Requêtes simples',                badge: 'Bases de données', nbThm: 3, nbEx: 1, desc: "SELECT · FROM · WHERE · DISTINCT · BETWEEN · IN · LIKE." },
      { ch: 'CH 10', slug: 'sql-requetes-avancees',        titre: 'SQL — Requêtes avancées',               badge: 'Bases de données', nbThm: 3, nbEx: 1, desc: "ORDER BY · GROUP BY · HAVING · INNER JOIN · Sous-requêtes." },
      { ch: 'CH 11', slug: 'sql-manipulation',             titre: 'SQL — Manipulation de données',         badge: 'Bases de données', nbThm: 2, nbEx: 1, desc: "INSERT INTO · UPDATE SET · DELETE FROM · CREATE TABLE." },
      { ch: 'CH 12', slug: 'normalisation',                titre: 'Normalisation',                         badge: 'Bases de données', nbThm: 2, nbEx: 1, desc: "Dépendances fonctionnelles · 1FN, 2FN, 3FN · Éviter redondance et anomalies." },
    ],
  },
  {
    id: 'tic', icon: '🌐', label: "Bloc 3 — TIC (Technologies de l'Information)",
    color: COLOR_TIC, bg: 'rgba(6,214,160,0.07)', border: 'rgba(6,214,160,0.2)',
    chapitres: [
      { ch: 'CH 13', slug: 'internet-reseaux',             titre: 'Internet & Réseaux',                   badge: 'TIC', nbThm: 2, nbEx: 1, desc: "LAN / WAN · Internet · HTTP / TCP/IP / DNS · Adressage IP · Routage." },
      { ch: 'CH 14', slug: 'web-html-css-js',              titre: 'Web — HTML / CSS / JavaScript',        badge: 'TIC', nbThm: 4, nbEx: 1, desc: "Structure HTML · Balises sémantiques · CSS sélecteurs · JavaScript bases." },
      { ch: 'CH 15', slug: 'systemes-informatiques',       titre: 'Systèmes informatiques',               badge: 'TIC', nbThm: 2, nbEx: 1, desc: "Hardware (CPU, RAM, stockage) · Software (OS) · Architecture Von Neumann · Binaire." },
      { ch: 'CH 16', slug: 'securite-informatique',        titre: 'Sécurité informatique',                badge: 'TIC', nbThm: 2, nbEx: 1, desc: "Virus · Ransomware · Phishing · Antivirus · Pare-feu · HTTPS · RGPD." },
    ],
  },
]

const badgeColors: Record<string, { bg: string; color: string }> = {
  'Algorithmique':    { bg: 'rgba(79,110,247,0.15)',  color: COLOR_ALGO },
  'Programmation':    { bg: 'rgba(96,165,250,0.15)',  color: '#60a5fa'  },
  'Bases de données': { bg: 'rgba(139,92,246,0.15)',  color: COLOR_BD   },
  'TIC':              { bg: 'rgba(6,214,160,0.12)',   color: COLOR_TIC  },
}

function ChapterCard({ ch, href, accent }: { ch: typeof BLOCS[0]['chapitres'][0]; href: string; accent: string }) {
  const bc = badgeColors[ch.badge] || { bg: 'rgba(99,102,241,0.15)', color: '#6366f1' }
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 22, height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 32px ${accent}25` }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 6 }}>{ch.ch}</span>
            <span style={{ fontSize: 11, background: bc.bg, color: bc.color, padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>{ch.badge}</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.nbThm} concepts</span>
        </div>
        <h3 style={{ fontSize: 15, fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 8, color: accent }}>{ch.titre}</h3>
        <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 14 }}>{ch.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>📝 {ch.nbEx} exercices</span>
          <span style={{ fontSize: 12, color: accent, fontWeight: 600 }}>Ouvrir →</span>
        </div>
      </div>
    </Link>
  )
}

function BlocHeader({ icon, titre, desc, color, count }: { icon: string; titre: string; desc: string; color: string; count: number }) {
  return (
    <div style={{ background: `linear-gradient(135deg,${color}12,${color}04)`, border: `1.5px solid ${color}30`, borderRadius: 18, padding: '18px 26px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 26 }}>{icon}</span>
        <div>
          <h2 style={{ fontSize: 19, marginBottom: 2, color }}>{titre}</h2>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>{desc}</p>
        </div>
      </div>
      <span style={{ background: `${color}20`, color, padding: '4px 14px', borderRadius: 20, fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{count} chapitres</span>
    </div>
  )
}

export default function InformatiqueInfoIndexPage() {
  const total = BLOCS.reduce((s, b) => s + b.chapitres.length, 0)
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: '14px clamp(20px,5vw,60px)', display: 'flex', gap: 8, fontSize: 13, color: 'var(--muted)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/bac" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Bac</Link>
          <span>›</span>
          <Link href="/bac/info" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Informatique</Link>
          <span>›</span>
          <span style={{ color: '#6366f1', fontWeight: 600 }}>Section Sciences Informatiques</span>
        </div>

        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Header */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Coefficient 4</span>
              <span style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)', color: 'white', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20, letterSpacing: '0.08em' }}>PROGRAMME COMPLET 2026</span>
              <span style={{ background: 'rgba(6,214,160,0.12)', color: '#06d6a0', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>🎯 Épreuves pratiques incluses</span>
            </div>
            <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 10 }}>
              💻 Informatique — Section Sciences Informatiques
            </h1>
            <p style={{ maxWidth: 680, color: 'var(--text2)', marginBottom: 16, lineHeight: 1.7 }}>
              Programme officiel CNP Tunisie — 4ème année secondaire.
              <strong style={{ color: '#6366f1' }}> {total} chapitres</strong> en 3 blocs :
              Algorithmique & Programmation · Bases de données · TIC.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🧮 6 ch. Algorithmique</span><span>·</span>
              <span>🗄️ 6 ch. Bases de données</span><span>·</span>
              <span>🌐 4 ch. TIC</span><span>·</span>
              <span>💻 Pascal & Python</span>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 48 }}>
            {[{ num: '3', label: 'Blocs', icon: '🧩' }, { num: '16', label: 'Chapitres', icon: '💻' }, { num: '2', label: 'Langages', icon: '🖥️' }, { num: '4', label: 'Thèmes TIC', icon: '🌐' }].map(s => (
              <div key={s.label} className="card" style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: '#6366f1' }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Blocs */}
          {BLOCS.map(bloc => (
            <div key={bloc.id} style={{ marginBottom: 52 }}>
              <BlocHeader icon={bloc.icon} titre={bloc.label} color={bloc.color}
                desc={bloc.id==='algo'?'Notions · Contrôle · Données · Sous-programmes · Tri & Recherche · Pascal/Python':bloc.id==='bd'?'Concepts · Modélisation · SQL simple · SQL avancé · DML · Normalisation':'Internet · Web HTML/CSS/JS · Systèmes · Sécurité'}
                count={bloc.chapitres.length} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
                {bloc.chapitres.map(ch => (
                  <ChapterCard key={ch.slug} ch={ch} href={`/bac/info/informatique/${ch.slug}`} accent={bloc.color} />
                ))}
              </div>
            </div>
          ))}

          {/* Partie pratique */}
          <div style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.08))', border: '1.5px solid rgba(99,102,241,0.25)', borderRadius: 20, padding: '28px 32px', marginBottom: 40 }}>
            <h3 style={{ fontSize: 18, marginBottom: 16, color: '#6366f1' }}>🎯 Partie Pratique Bac 2026</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
              {[
                { icon: '✍️', titre: 'Écrire un programme', desc: 'Transformer un algorithme en Pascal ou Python' },
                { icon: '🔍', titre: 'Analyser un algorithme', desc: 'Dérouler, corriger ou compléter un algorithme' },
                { icon: '🗄️', titre: 'Requête SQL', desc: 'SELECT, WHERE, JOIN, GROUP BY sur une BDD' },
                { icon: '🌐', titre: 'Page web', desc: 'Créer ou compléter une page HTML/CSS' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.15)', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#6366f1', marginBottom: 4 }}>{item.titre}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/bac/info" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>
              ← Retour Informatique
            </Link>
            <Link href="/examens" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>
              📋 Examens Bac →
            </Link>
            <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>
              🤖 Chat IA →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
      <style>{`@media(max-width:700px){div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </>
  )
}
