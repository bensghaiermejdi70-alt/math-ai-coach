'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// FRANÇAIS SECONDE FRANCE — Page index
// Route : /bac-france/francais/seconde
// Programme officiel MEN 2026 — 4 objets d'étude
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  {
    slug: 'poesie-moyen-age-xviiie',
    num: '1',
    icon: '📜',
    titre: 'La Poésie du Moyen Âge au XVIIIe siècle',
    badge: 'Objet d\'étude 1',
    couleur: '#ec4899',
    gradient: 'linear-gradient(135deg,rgba(236,72,153,0.14),rgba(219,39,119,0.07))',
    border: 'rgba(236,72,153,0.3)',
    badgeColor: '#f472b6',
    notions: ['Sonnet · Ode · Ballade · Élégie · Fable','Du Bellay · Ronsard · Villon · La Fontaine · Hugo','Expression des sentiments · Nature & amour','Musicalité · Rythme · Symboles & images'],
    auteurs: ['Joachim du Bellay','Pierre de Ronsard','François Villon','Jean de La Fontaine'],
    oeuvres: ['Les Regrets — Du Bellay','Les Amours — Ronsard','Fables — La Fontaine','Poésie lyrique & humaniste'],
    axes: ['Expression des sentiments','Nature et amour','Beauté du langage','Musicalité et rythme'],
    nbThm: 18, nbEx: 15,
  },
  {
    slug: 'litterature-idees-presse',
    num: '2',
    icon: '📰',
    titre: 'La Littérature d\'idées et la Presse du XIXe au XXIe siècle',
    badge: 'Objet d\'étude 2',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.14),rgba(249,115,22,0.07))',
    border: 'rgba(245,158,11,0.3)',
    badgeColor: '#fbbf24',
    notions: ['Article · Discours · Essai · Tribune · Texte argumentatif','Voltaire · Zola · Camus · Hugo','Liberté d\'expression · Influence des médias','Science & société · Justice sociale · Écologie'],
    auteurs: ['Voltaire','Émile Zola','Albert Camus','Victor Hugo'],
    oeuvres: ['J\'accuse — Zola','Articles de presse modernes','Discours politiques','Essais philosophiques'],
    axes: ['Liberté d\'expression','Influence des médias','Science et société','Justice sociale'],
    nbThm: 22, nbEx: 18,
  },
  {
    slug: 'roman-recit-xviiie-xxie',
    num: '3',
    icon: '📖',
    titre: 'Le Roman et le Récit du XVIIIe au XXIe siècle',
    badge: 'Objet d\'étude 3',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.14),rgba(99,102,241,0.07))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    notions: ['Roman réaliste · Autobiographie · Nouvelle · Récit de voyage','Balzac · Flaubert · Maupassant · Proust · Colette','Critique sociale · Construction du personnage','Quête personnelle · Voyage & découverte'],
    auteurs: ['Honoré de Balzac','Gustave Flaubert','Guy de Maupassant','Marcel Proust','Colette'],
    oeuvres: ['Le Père Goriot — Balzac','Madame Bovary — Flaubert','Bel-Ami — Maupassant','Nouvelles réalistes'],
    axes: ['Construction du personnage','Critique sociale','Quête personnelle','Récit autobiographique'],
    nbThm: 20, nbEx: 17,
  },
  {
    slug: 'theatre-xviie-xxie',
    num: '4',
    icon: '🎭',
    titre: 'Le Théâtre du XVIIe au XXIe siècle',
    badge: 'Objet d\'étude 4',
    couleur: '#06b6d4',
    gradient: 'linear-gradient(135deg,rgba(6,182,212,0.14),rgba(14,165,233,0.07))',
    border: 'rgba(6,182,212,0.3)',
    badgeColor: '#22d3ee',
    notions: ['Tragédie · Comédie · Drame romantique · Théâtre contemporain','Molière · Racine · Corneille · Musset','Conflit dramatique · Comique & satire','Passion & tragédie · Mise en scène'],
    auteurs: ['Molière','Jean Racine','Pierre Corneille','Alfred de Musset'],
    oeuvres: ['Le Cid — Corneille','Phèdre — Racine','L\'Avare — Molière','On ne badine pas avec l\'amour — Musset'],
    axes: ['Conflit dramatique','Comique et satire','Passion et tragédie','Jeu des personnages'],
    nbThm: 16, nbEx: 14,
  },
]

const COMPETENCES = [
  { icon: '✍️', label: 'Commentaire de texte', desc: 'Méthode introduction · développement · conclusion' },
  { icon: '🧠', label: 'Essai argumentatif', desc: 'Plan dialectique · Argumentation · Exemples' },
  { icon: '📝', label: 'Écriture d\'invention', desc: 'Continuité narrative · Respect du registre' },
  { icon: '🎤', label: 'Expression orale', desc: 'Lecture expressive · Débat · Présentation' },
  { icon: '📐', label: 'Étude de la langue', desc: 'Syntaxe · Conjugaison · Figures de style · Lexique' },
  { icon: '🖼️', label: 'Culture artistique', desc: 'Littérature & arts · Peinture · Cinéma · Musique' },
]

export default function FrancaisSecondeIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <Link href="/bac-france/francais" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Français</Link>
            <span>›</span>
            <span style={{ color: '#f472b6' }}>Seconde</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 36 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>📘 Seconde Générale & Technologique · 4h/semaine</span>
            <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 14 }}>
              Français Seconde<br />
              <span style={{ background: 'linear-gradient(90deg,#ec4899,#f59e0b,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Poésie · Littérature d'idées · Roman · Théâtre
              </span>
            </h1>
            <p style={{ maxWidth: 620, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel MEN — 4 objets d'étude · Maîtrise de la langue · Expression écrite et orale.
              Préparation progressive à l'Épreuve Anticipée de Français (EAF) en Première.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📚 4 objets d'étude</span><span>·</span>
              <span>📊 76+ notions</span><span>·</span>
              <span>📝 64+ exercices</span><span>·</span>
              <span>🎤 Expression orale incluse</span>
            </div>
          </div>

          {/* BADGE INFO */}
          <div style={{ background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 36, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>💡</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#f472b6', marginBottom: 6 }}>Objectifs de la Seconde</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Préparation progressive à l\'EAF de Première',
                  'Maîtrise de la langue : syntaxe · conjugaison · lexique',
                  'Culture littéraire et artistique transversale',
                  'Expression écrite : commentaire · essai · écriture d\'invention',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(236,72,153,0.1)', color: '#f472b6', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(236,72,153,0.22)' }}>
                    📌 {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CHAPITRES */}
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>📚 Les 4 objets d'étude</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 48 }}>
            {CHAPITRES.map(ch => (
              <Link key={ch.slug} href={`/bac-france/francais/seconde/${ch.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: ch.gradient, border: `1px solid ${ch.border}`, borderRadius: 18, padding: '22px 26px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${ch.couleur}22` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 34, flexShrink: 0 }}>{ch.icon}</span>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: ch.couleur }}>OBJ.0{ch.num}</span>
                          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${ch.couleur}22`, color: ch.badgeColor, fontWeight: 700 }}>{ch.badge}</span>
                        </div>
                        <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: '0 0 6px' }}>{ch.titre}</h2>
                        <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--muted)' }}>
                          <span style={{ color: ch.couleur, fontWeight: 600 }}>📊 {ch.nbThm} notions</span>
                          <span>·</span>
                          <span>📝 {ch.nbEx} exercices</span>
                          <span>·</span>
                          <span>{ch.auteurs.length} auteurs</span>
                        </div>
                      </div>
                    </div>
                    <span style={{ color: ch.couleur, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>Ouvrir →</span>
                  </div>

                  {/* Notions + auteurs */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 10 }}>
                    <div style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 6 }}>📌 Notions clés</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {ch.notions.map(n => (
                          <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${ch.couleur}18`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 6 }}>✍️ Auteurs étudiés</div>
                      {ch.auteurs.map(a => (
                        <div key={a} style={{ fontSize: 11, color: 'var(--text2)', padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>→ {a}</div>
                      ))}
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 6 }}>📖 Œuvres fréquentes</div>
                      {ch.oeuvres.map(o => (
                        <div key={o} style={{ fontSize: 11, color: 'var(--text2)', padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>📌 {o}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* COMPÉTENCES */}
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>🎯 Compétences travaillées</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12, marginBottom: 48 }}>
            {COMPETENCES.map(cp => (
              <div key={cp.label} style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.18)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{cp.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#f472b6', marginBottom: 4 }}>{cp.label}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{cp.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg,rgba(236,72,153,0.1),rgba(139,92,246,0.06))', border: '1px solid rgba(236,72,153,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f472b6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Français Seconde</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prépare ton cours avec le Prof IA</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Analyse de texte · Commentaire · Dissertation · Figures de style</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/solve?subject=litterature" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>📚 Solveur Français</Link>
              <Link href="/chat?subject=litterature" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🤖 Chat Prof IA</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}