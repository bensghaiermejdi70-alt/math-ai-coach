'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// FRANÇAIS & LITTÉRATURE FRANCE — Page index
// Route : /bac-france/francais
// Programme officiel MEN 2026/2027
// ══════════════════════════════════════════════════════════════════════

const SECTIONS = [
  {
    slug: 'seconde',
    icon: '📘',
    titre: 'Seconde Générale & Technologique',
    niveau: 'Lycée · Classe de Seconde',
    annee: '2026–2027',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.07))',
    border: 'rgba(16,185,129,0.3)',
    badgeColor: '#34d399',
    badge: 'Enseignement commun · 4h/semaine',
    sections: [
      { label: '📜 Poésie (Moyen Âge → XVIIIe)', items: ['Sonnet · Ode · Ballade · Élégie','Du Bellay · Ronsard · Villon · La Fontaine','Expression des sentiments · Nature & amour','Musicalité · Rythme · Images poétiques'] },
      { label: '📰 Littérature d\'idées & Presse', items: ['Article · Discours · Essai · Tribune','Voltaire · Zola · Camus · Hugo','Liberté d\'expression · Médias · Justice','Science & société · Écologie'] },
      { label: '📖 Roman & Récit (XVIIIe → XXIe)', items: ['Roman réaliste · Autobiographie · Nouvelle','Balzac · Flaubert · Maupassant · Proust','Critique sociale · Personnages · Narration','Voyage & découverte'] },
      { label: '🎭 Théâtre (XVIIe → XXIe)', items: ['Tragédie · Comédie · Drame romantique','Molière · Racine · Corneille · Musset','Conflits dramatiques · Dialogue · Mise en scène','Comique · Satire · Passion'] },
    ],
    nbCh: 8, nbFormules: 45, nbEx: 40,
  },
  {
    slug: 'premiere',
    icon: '📗',
    titre: 'Première Générale — EAF',
    niveau: 'Lycée · Classe de Première',
    annee: '2026–2027',
    couleur: '#ec4899',
    gradient: 'linear-gradient(135deg,rgba(236,72,153,0.14),rgba(219,39,119,0.07))',
    border: 'rgba(236,72,153,0.3)',
    badgeColor: '#f472b6',
    badge: 'Épreuve Anticipée · Écrit coef. 5 + Oral coef. 2',
    sections: [
      { label: '💡 Littérature d\'idées (XVIe–XVIIIe)', items: ['La Boétie : Discours de la servitude volontaire','Fontenelle : Entretiens sur la pluralité des mondes','Graffigny : Lettres d\'une Péruvienne','Parcours : Liberté · Science · Regard étranger'] },
      { label: '📜 Poésie (XIXe–XXIe siècle)', items: ['Rimbaud : Cahiers de Douai — Émancipations créatrices','Ponge : La Rage de l\'expression — Atelier du poète','Dorion : Mes forêts — Nature & intime','Figures de style · Versification · Analyse linéaire'] },
      { label: '📖 Roman & Récit', items: ['Abbé Prévost : Manon Lescaut — Passion & marginalité','Balzac : La Peau de chagrin — Désir & destruction','Colette : Sido / Les Vrilles de la vigne — Nature','Narration · Personnages · Société'] },
      { label: '🎭 Théâtre (XVIIe–XXIe)', items: ['Corneille : Le Menteur — Illusion & comédie','Musset : On ne badine pas avec l\'amour — Passion','Sarraute : Pour un oui ou pour un non — Non-dit','Conflits · Dialogue · Jeux de langage'] },
    ],
    nbCh: 12, nbFormules: 80, nbEx: 70,
    isBac: true,
  },
  {
    slug: 'terminale',
    icon: '🎓',
    titre: 'Terminale — Philosophie & HLP',
    niveau: 'Lycée · Classe de Terminale',
    annee: '2027 (Bac)',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.14),rgba(99,102,241,0.07))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    badge: 'Bac 2027 · Philosophie coef. 8 · HLP coef. 16',
    sections: [
      { label: '🧠 Philosophie — Grandes notions', items: ['Le sujet : Conscience · Liberté · Désir · Bonheur','La culture : Art · Langage · Travail · Technique','La raison : Vérité · Science · Démonstration','La politique : Justice · État · Droit · Société'] },
      { label: '📚 HLP — Humanités, Litt. & Philo', items: ['La recherche de soi : Rousseau · Proust · Montaigne','L\'humanité en question : Science & Technique','Histoire & violence : Camus · Primo Levi','L\'art et le sensible : Beauté · Création'] },
      { label: '✍️ Méthodologie Bac', items: ['Dissertation philosophique : thèse-antithèse-synthèse','Explication de texte philosophique','Commentaire composé · Analyse linéaire','Grand Oral : préparation & présentation'] },
      { label: '🌍 LLCER & Options', items: ['Littérature en langue étrangère','Arts & débats d\'idées · Identité & diversité','Voyages & frontières · Histoire & mémoire','Option théâtre · Cinéma · Arts plastiques'] },
    ],
    nbCh: 10, nbFormules: 55, nbEx: 50,
  },
]

export default function FrancaisIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <span style={{ color: '#f472b6' }}>Français & Littérature</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>📚 Programme Officiel MEN · 2026</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              Français & Littérature France<br />
              <span style={{ background: 'linear-gradient(90deg,#ec4899,#8b5cf6,#f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Seconde · Première (EAF) · Terminale
              </span>
            </h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel Éducation Nationale — Maîtrise de la langue, littérature, expression écrite et orale.
              Préparation complète à l'Épreuve Anticipée de Français (EAF) et au Grand Oral.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📚 3 niveaux</span><span>·</span>
              <span>📖 30 chapitres</span><span>·</span>
              <span>✍️ 180+ notions</span><span>·</span>
              <span>📝 160+ exercices</span>
            </div>
          </div>

          {/* BADGE NOUVEAUTÉS */}
          <div style={{ background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 40, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>🆕</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#f472b6', marginBottom: 6 }}>Programme en vigueur — Bac 2026/2027</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Première 2026 : EAF Écrit coef. 5 — Oral coef. 2',
                  'Œuvres officielles renouvelées : Rimbaud · Balzac · Corneille',
                  'Grand Oral Terminale : coef. 8 — préparation incluse',
                  'HLP Terminale : Humanités Littérature Philosophie coef. 16',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(236,72,153,0.1)', color: '#f472b6', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(236,72,153,0.22)' }}>
                    🔴 {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SECTIONS.map(s => (
              <Link key={s.slug} href={`/bac-france/francais/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: s.gradient, border: `1px solid ${(s as any).isBac ? s.couleur + '80' : s.border}`, borderRadius: 20, padding: '24px 28px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${s.couleur}22` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 36, flexShrink: 0 }}>{s.icon}</span>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                          <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', margin: 0 }}>{s.titre}</h2>
                          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${s.couleur}22`, color: s.badgeColor, fontWeight: 700 }}>{s.badge}</span>
                          {(s as any).isBac && <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(236,72,153,0.25)', color: '#f472b6', fontWeight: 800 }}>⭐ BAC</span>}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{s.niveau} · {s.annee}</div>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12 }}>
                          <span style={{ color: s.couleur, fontWeight: 600 }}>📖 {s.nbCh} chapitres</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>✍️ {s.nbFormules}+ notions</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📝 {s.nbEx}+ exercices</span>
                        </div>
                      </div>
                    </div>
                    <span style={{ color: s.couleur, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>Ouvrir →</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
                    {s.sections.map(sec => (
                      <div key={sec.label} style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: s.couleur, marginBottom: 6 }}>{sec.label}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {sec.items.map(it => (
                            <span key={it} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${s.couleur}18`, color: 'var(--text2)', border: `1px solid ${s.couleur}18` }}>{it}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* BLOC ŒUVRES EAF */}
          <div style={{ marginTop: 40, background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.2)', borderRadius: 18, padding: '24px 28px' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#f472b6', marginBottom: 16 }}>📋 Œuvres officielles EAF 2026 — Première</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
              {[
                { obj: '💡 Littérature d\'idées', oeuvres: ['La Boétie — Discours de la servitude volontaire','Fontenelle — Entretiens sur la pluralité des mondes','Graffigny — Lettres d\'une Péruvienne'] },
                { obj: '📜 Poésie', oeuvres: ['Rimbaud — Cahiers de Douai','Ponge — La Rage de l\'expression','Dorion — Mes forêts'] },
                { obj: '📖 Roman & Récit', oeuvres: ['Abbé Prévost — Manon Lescaut','Balzac — La Peau de chagrin','Colette — Sido / Les Vrilles de la vigne'] },
                { obj: '🎭 Théâtre', oeuvres: ['Corneille — Le Menteur','Musset — On ne badine pas avec l\'amour','Sarraute — Pour un oui ou pour un non'] },
              ].map(g => (
                <div key={g.obj} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: '#f472b6', marginBottom: 8 }}>{g.obj}</div>
                  {g.oeuvres.map(o => (
                    <div key={o} style={{ fontSize: 11, color: 'var(--text2)', padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>📌 {o}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 40, background: 'linear-gradient(135deg,rgba(236,72,153,0.1),rgba(139,92,246,0.06))', border: '1px solid rgba(236,72,153,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f472b6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Français & Littérature France</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prépare l'EAF avec le Prof IA</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Commentaire · Dissertation · Analyse linéaire · Grand Oral</p>
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