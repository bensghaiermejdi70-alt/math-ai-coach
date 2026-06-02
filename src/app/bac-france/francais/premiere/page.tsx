'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// FRANÇAIS PREMIÈRE FRANCE — Page index
// Route : /bac-france/francais/premiere
// Programme officiel MEN 2026 — EAF Écrit coef.5 + Oral coef.2
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  {
    slug: 'litterature-idees-xvie-xviiie',
    num: '1',
    icon: '💡',
    titre: 'Littérature d\'idées — XVIe au XVIIIe siècle',
    badge: 'Objet d\'étude 1 · EAF',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.14),rgba(249,115,22,0.07))',
    border: 'rgba(245,158,11,0.3)',
    badgeColor: '#fbbf24',
    notions: ['Argumentation directe & indirecte','Humanisme · Lumières · Réforme','Liberté · Pouvoir · Savoir','Discours · Essai · Pamphlet'],
    oeuvres: [
      { titre: 'Discours de la servitude volontaire', auteur: 'La Boétie', parcours: 'Défendre et entretenir la liberté' },
      { titre: 'Entretiens sur la pluralité des mondes', auteur: 'Fontenelle', parcours: 'Le goût de la science' },
      { titre: 'Lettres d\'une Péruvienne', auteur: 'Mme de Graffigny', parcours: 'Un nouvel univers s\'est offert à mes yeux' },
    ],
    axes: ['Le peuple peut participer à sa propre domination','La science développe la curiosité humaine','Regard critique sur la société européenne'],
    nbThm: 24, nbEx: 20,
    isBac: true,
  },
  {
    slug: 'poesie-xixe-xxie',
    num: '2',
    icon: '📜',
    titre: 'La Poésie du XIXe au XXIe siècle',
    badge: 'Objet d\'étude 2 · EAF',
    couleur: '#ec4899',
    gradient: 'linear-gradient(135deg,rgba(236,72,153,0.14),rgba(219,39,119,0.07))',
    border: 'rgba(236,72,153,0.3)',
    badgeColor: '#f472b6',
    notions: ['Romantisme · Symbolisme · Surréalisme','Versification · Vers libre · Prose poétique','Figures de style · Registres lyriques','Analyse linéaire · Commentaire'],
    oeuvres: [
      { titre: 'Cahiers de Douai', auteur: 'Arthur Rimbaud', parcours: 'Émancipations créatrices' },
      { titre: 'La Rage de l\'expression', auteur: 'Francis Ponge', parcours: 'Dans l\'atelier du poète' },
      { titre: 'Mes forêts', auteur: 'Hélène Dorion', parcours: 'La poésie, la nature, l\'intime' },
    ],
    axes: ['Liberté poétique · Révolte de la jeunesse','Travail du langage · Observation des objets','Relation homme-nature · Fragilité du monde'],
    nbThm: 22, nbEx: 18,
    isBac: true,
  },
  {
    slug: 'roman-recit-moyen-age-xxie',
    num: '3',
    icon: '📖',
    titre: 'Le Roman et le Récit du Moyen Âge au XXIe siècle',
    badge: 'Objet d\'étude 3 · EAF',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.14),rgba(99,102,241,0.07))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    notions: ['Narration · Focalisation · Point de vue','Personnage · Société · Critique sociale','Roman sentimental · Roman d\'analyse','Romanesque · Plaisir du texte'],
    oeuvres: [
      { titre: 'Manon Lescaut', auteur: 'Abbé Prévost', parcours: 'Personnages en marge, plaisirs du romanesque' },
      { titre: 'La Peau de chagrin', auteur: 'Honoré de Balzac', parcours: 'Les romans de l\'énergie : création et destruction' },
      { titre: 'Sido suivi de Les Vrilles de la vigne', auteur: 'Colette', parcours: 'La célébration du monde' },
    ],
    axes: ['Passion amoureuse · Marginalité · Destin tragique','Désir et pouvoir · Société du XIXe · Passions','Nature · Souvenirs · Sensibilité autobiographique'],
    nbThm: 20, nbEx: 17,
    isBac: true,
  },
  {
    slug: 'theatre-xviie-xxie',
    num: '4',
    icon: '🎭',
    titre: 'Le Théâtre du XVIIe au XXIe siècle',
    badge: 'Objet d\'étude 4 · EAF',
    couleur: '#06b6d4',
    gradient: 'linear-gradient(135deg,rgba(6,182,212,0.14),rgba(14,165,233,0.07))',
    border: 'rgba(6,182,212,0.3)',
    badgeColor: '#22d3ee',
    notions: ['Conflit dramatique · Tension · Enjeux','Comédie · Drame romantique · Théâtre contemporain','Langage · Non-dit · Sous-texte','Mise en scène · Représentation'],
    oeuvres: [
      { titre: 'Le Menteur', auteur: 'Pierre Corneille', parcours: 'Mensonge et comédie' },
      { titre: 'On ne badine pas avec l\'amour', auteur: 'Alfred de Musset', parcours: 'Les jeux du cœur et de la parole' },
      { titre: 'Pour un oui ou pour un non', auteur: 'Nathalie Sarraute', parcours: 'Théâtre et dispute' },
    ],
    axes: ['Jeu des apparences · Illusion théâtrale','Passion amoureuse · Orgueil · Tragédie sentimentale','Non-dit · Conflits psychologiques · Communication'],
    nbThm: 18, nbEx: 15,
    isBac: true,
  },
  {
    slug: 'methodologie-eaf',
    num: '5',
    icon: '✍️',
    titre: 'Méthodologie EAF — Écrit & Oral',
    badge: 'Méthode Bac · EAF',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.07))',
    border: 'rgba(16,185,129,0.3)',
    badgeColor: '#34d399',
    notions: ['Commentaire composé · Méthode complète','Dissertation littéraire · Plan dialectique','Analyse linéaire · Oral EAF','Contraction de texte · Essai'],
    oeuvres: [],
    axes: ['Introduction · Problématique · Plan','Analyse de citations · Construction du devoir','Lecture expressive · Entretien oral'],
    nbThm: 14, nbEx: 18,
  },
]

const EPREUVES = [
  { icon: '✍️', label: 'Épreuve Écrite', detail: '4 heures · coef. 5', desc: 'Commentaire composé OU Dissertation sur une des œuvres du programme' },
  { icon: '🎤', label: 'Épreuve Orale', detail: '20 minutes · coef. 2', desc: 'Analyse linéaire d\'un extrait + Entretien sur le parcours associé' },
  { icon: '📋', label: 'Œuvres Imposées', detail: '4 œuvres + parcours', desc: '1 œuvre par objet d\'étude · lecture cursive recommandée' },
]

export default function FrancaisPremiereIndexPage() {
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
            <span style={{ color: '#f472b6' }}>Première</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 36 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>📗 Première Générale · Épreuve Anticipée de Français</span>
            <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 14 }}>
              Français Première — EAF<br />
              <span style={{ background: 'linear-gradient(90deg,#f59e0b,#ec4899,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Littérature d\'idées · Poésie · Roman · Théâtre
              </span>
            </h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programme officiel MEN — 4 objets d'étude, 12 œuvres imposées avec parcours associés.
              Préparation complète à l'Épreuve Anticipée de Français : commentaire, dissertation, analyse linéaire et oral.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📚 4 objets d'étude</span><span>·</span>
              <span>📖 12 œuvres imposées</span><span>·</span>
              <span>📊 98+ notions</span><span>·</span>
              <span>✍️ Écrit coef. 5 + Oral coef. 2</span>
            </div>
          </div>

          {/* BADGE ÉPREUVES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12, marginBottom: 36 }}>
            {EPREUVES.map(ep => (
              <div key={ep.label} style={{ background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.22)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{ep.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 13, color: '#f472b6', marginBottom: 2 }}>{ep.label}</div>
                <div style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700, marginBottom: 4 }}>{ep.detail}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{ep.desc}</div>
              </div>
            ))}
          </div>

          {/* CHAPITRES */}
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>📚 Les 4 objets d'étude + Méthodologie</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 48 }}>
            {CHAPITRES.map(ch => (
              <Link key={ch.slug} href={`/bac-france/francais/premiere/${ch.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: ch.gradient, border: `1px solid ${ch.isBac ? ch.couleur+'70' : ch.border}`, borderRadius: 18, padding: '22px 26px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
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
                          {ch.isBac && <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(236,72,153,0.2)', color: '#f472b6', fontWeight: 800 }}>⭐ BAC EAF</span>}
                        </div>
                        <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: '0 0 6px' }}>{ch.titre}</h2>
                        <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--muted)' }}>
                          <span style={{ color: ch.couleur, fontWeight: 600 }}>📊 {ch.nbThm} notions</span>
                          <span>·</span>
                          <span>📝 {ch.nbEx} exercices</span>
                          {ch.oeuvres.length > 0 && <><span>·</span><span>📖 {ch.oeuvres.length} œuvres imposées</span></>}
                        </div>
                      </div>
                    </div>
                    <span style={{ color: ch.couleur, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>Ouvrir →</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 10 }}>
                    <div style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 6 }}>📌 Notions clés</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {ch.notions.map(n => <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${ch.couleur}18`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>)}
                      </div>
                    </div>
                    {ch.oeuvres.length > 0 && (
                      <div style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                        <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 6 }}>📖 Œuvres imposées + Parcours</div>
                        {ch.oeuvres.map(o => (
                          <div key={o.titre} style={{ marginBottom: 6 }}>
                            <div style={{ fontSize: 11, color: 'var(--text)', fontWeight: 700 }}>{o.auteur} — {o.titre}</div>
                            <div style={{ fontSize: 10, color: ch.badgeColor }}>→ {o.parcours}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 6 }}>🎯 Axes d'analyse</div>
                      {ch.axes.map(a => <div key={a} style={{ fontSize: 10, color: 'var(--text2)', padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>• {a}</div>)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* TABLEAU ŒUVRES EAF */}
          <div style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.2)', borderRadius: 18, padding: '24px 28px', marginBottom: 48 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#f472b6', marginBottom: 16 }}>📋 Toutes les œuvres imposées EAF 2026</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
              {[
                { obj: '💡 Littérature d\'idées', couleur: '#f59e0b', oeuvres: [
                  { a: 'La Boétie', t: 'Discours de la servitude volontaire', p: 'Défendre et entretenir la liberté' },
                  { a: 'Fontenelle', t: 'Entretiens sur la pluralité des mondes', p: 'Le goût de la science' },
                  { a: 'Mme de Graffigny', t: 'Lettres d\'une Péruvienne', p: 'Un nouvel univers s\'est offert à mes yeux' },
                ]},
                { obj: '📜 Poésie XIXe–XXIe', couleur: '#ec4899', oeuvres: [
                  { a: 'Arthur Rimbaud', t: 'Cahiers de Douai', p: 'Émancipations créatrices' },
                  { a: 'Francis Ponge', t: 'La Rage de l\'expression', p: 'Dans l\'atelier du poète' },
                  { a: 'Hélène Dorion', t: 'Mes forêts', p: 'La poésie, la nature, l\'intime' },
                ]},
                { obj: '📖 Roman & Récit', couleur: '#8b5cf6', oeuvres: [
                  { a: 'Abbé Prévost', t: 'Manon Lescaut', p: 'Personnages en marge, plaisirs du romanesque' },
                  { a: 'Honoré de Balzac', t: 'La Peau de chagrin', p: 'Les romans de l\'énergie : création et destruction' },
                  { a: 'Colette', t: 'Sido / Les Vrilles de la vigne', p: 'La célébration du monde' },
                ]},
                { obj: '🎭 Théâtre', couleur: '#06b6d4', oeuvres: [
                  { a: 'Pierre Corneille', t: 'Le Menteur', p: 'Mensonge et comédie' },
                  { a: 'Alfred de Musset', t: 'On ne badine pas avec l\'amour', p: 'Les jeux du cœur et de la parole' },
                  { a: 'Nathalie Sarraute', t: 'Pour un oui ou pour un non', p: 'Théâtre et dispute' },
                ]},
              ].map(g => (
                <div key={g.obj} style={{ background: 'rgba(0,0,0,0.12)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: g.couleur, marginBottom: 8 }}>{g.obj}</div>
                  {g.oeuvres.map(o => (
                    <div key={o.t} style={{ marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: 11, color: 'var(--text)', fontWeight: 700 }}>{o.a}</div>
                      <div style={{ fontSize: 10, color: 'var(--text2)', marginBottom: 2 }}>{o.t}</div>
                      <div style={{ fontSize: 10, color: g.couleur }}>→ {o.p}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg,rgba(236,72,153,0.1),rgba(139,92,246,0.06))', border: '1px solid rgba(236,72,153,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f472b6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · EAF Première</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prépare l'EAF avec le Prof IA</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Commentaire · Dissertation · Analyse linéaire · Oral EAF</p>
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