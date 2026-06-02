'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// FRANÇAIS TERMINALE FRANCE — Page index
// Route : /bac-france/francais/terminale
// Programme officiel MEN 2026 — Philosophie · HLP · Grand Oral
// ══════════════════════════════════════════════════════════════════════

const CHAPITRES = [
  {
    slug: 'philosophie-le-sujet',
    num: '1',
    icon: '🧠',
    titre: 'Philosophie — Le Sujet',
    badge: 'Philosophie · Bac coef. 8',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.14),rgba(99,102,241,0.07))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    notions: ['Conscience · Inconscient','Liberté · Déterminisme','Désir · Bonheur','Volonté · Responsabilité'],
    auteurs: ['Descartes','Freud','Sartre','Kant','Nietzsche'],
    questions: ['Sommes-nous libres ?','Le bonheur dépend-il de nous ?','Le désir rend-il heureux ?','Peut-on agir contre sa conscience ?'],
    nbThm: 22, nbEx: 18,
  },
  {
    slug: 'philosophie-la-culture',
    num: '2',
    icon: '🎨',
    titre: 'Philosophie — La Culture',
    badge: 'Philosophie · Bac coef. 8',
    couleur: '#ec4899',
    gradient: 'linear-gradient(135deg,rgba(236,72,153,0.14),rgba(219,39,119,0.07))',
    border: 'rgba(236,72,153,0.3)',
    badgeColor: '#f472b6',
    notions: ['L\'art · Le beau','Le langage · La pensée','Le travail · La technique','La religion · La croyance'],
    auteurs: ['Hegel','Marx','Wittgenstein','Rousseau','Bergson'],
    questions: ['L\'art imite-t-il la réalité ?','La technique est-elle un progrès ?','Le langage limite-t-il la pensée ?','La religion est-elle compatible avec la raison ?'],
    nbThm: 20, nbEx: 16,
  },
  {
    slug: 'philosophie-raison-reel',
    num: '3',
    icon: '🔬',
    titre: 'Philosophie — La Raison et le Réel',
    badge: 'Philosophie · Bac coef. 8',
    couleur: '#06b6d4',
    gradient: 'linear-gradient(135deg,rgba(6,182,212,0.14),rgba(14,165,233,0.07))',
    border: 'rgba(6,182,212,0.3)',
    badgeColor: '#22d3ee',
    notions: ['La vérité · L\'erreur','La science · La démonstration','L\'expérience · La perception','La matière · L\'esprit'],
    auteurs: ['Platon','Descartes','Kant','Bachelard','Popper'],
    questions: ['Peut-on atteindre la vérité ?','La science explique-t-elle tout ?','L\'expérience suffit-elle pour connaître ?','La raison peut-elle se tromper ?'],
    nbThm: 18, nbEx: 15,
  },
  {
    slug: 'philosophie-politique-morale',
    num: '4',
    icon: '⚖️',
    titre: 'Philosophie — La Politique & La Morale',
    badge: 'Philosophie · Bac coef. 8',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.14),rgba(249,115,22,0.07))',
    border: 'rgba(245,158,11,0.3)',
    badgeColor: '#fbbf24',
    notions: ['La justice · L\'État','Le droit · La loi','Le devoir · Le bien','La responsabilité · Le mal'],
    auteurs: ['Aristote','Rousseau','Rawls','Kant','Hannah Arendt'],
    questions: ['Qu\'est-ce qu\'une société juste ?','Pourquoi obéir aux lois ?','Faut-il toujours dire la vérité ?','Sommes-nous responsables de nos actes ?'],
    nbThm: 20, nbEx: 16,
  },
  {
    slug: 'hlp-humanites-litterature',
    num: '5',
    icon: '📚',
    titre: 'HLP — Humanités, Littérature et Philosophie',
    badge: 'Spécialité · coef. 16',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.07))',
    border: 'rgba(16,185,129,0.3)',
    badgeColor: '#34d399',
    notions: ['La recherche de soi','L\'humanité en question','Histoire & violence','L\'art et le sensible'],
    auteurs: ['Rousseau · Proust · Montaigne','Camus · Primo Levi · Orwell','Hannah Arendt · Benjamin','Platon · Hegel'],
    questions: ['Comment l\'éducation forme-t-elle l\'individu ?','Le progrès peut-il détruire l\'homme ?','Comment témoigner de l\'histoire ?','Pourquoi crée-t-on de l\'art ?'],
    nbThm: 16, nbEx: 14,
    isSpé: true,
  },
  {
    slug: 'grand-oral-methodologie',
    num: '6',
    icon: '🎤',
    titre: 'Grand Oral — Préparation & Méthodologie',
    badge: 'Grand Oral · coef. 8',
    couleur: '#f43f5e',
    gradient: 'linear-gradient(135deg,rgba(244,63,94,0.14),rgba(245,158,11,0.07))',
    border: 'rgba(244,63,94,0.3)',
    badgeColor: '#fb7185',
    notions: ['Construire une problématique','Thèse · Antithèse · Synthèse','Maîtriser l\'entretien oral','Posture · Voix · Argumentation'],
    auteurs: ['Références aux spécialités choisies','Liens interdisciplinaires'],
    questions: ['Comment construire une question au croisement de 2 spécialités ?','Comment gérer le temps et le stress ?','Comment répondre aux questions du jury ?','Quels exemples mobiliser ?'],
    nbThm: 12, nbEx: 10,
  },
]

const METHODO = [
  { icon: '✍️', label: 'Dissertation philosophique', desc: 'Introduction · Thèse · Antithèse · Synthèse · Conclusion' },
  { icon: '📖', label: 'Explication de texte', desc: 'Contextualisation · Analyse linéaire · Portée philosophique' },
  { icon: '🎤', label: 'Grand Oral (coef. 8)', desc: 'Question · Exposé 5 min · Entretien 10 min · Échange 5 min' },
  { icon: '🔗', label: 'Liens interdisciplinaires', desc: 'Croiser 2 spécialités · Problématique commune · Exemples variés' },
]

export default function FrancaisTerminaleIndexPage() {
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
            <span style={{ color: '#a78bfa' }}>Terminale</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 36 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>🎓 Terminale Générale & Technologique · Bac 2027</span>
            <h1 style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 14 }}>
              Terminale — Philosophie & HLP<br />
              <span style={{ background: 'linear-gradient(90deg,#8b5cf6,#ec4899,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Le Sujet · La Culture · La Raison · La Politique · Grand Oral
              </span>
            </h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              En Terminale, le Français laisse place à la <strong style={{ color: 'var(--text)' }}>Philosophie</strong> (obligatoire, coef. 8)
              et à <strong style={{ color: 'var(--text)' }}>HLP</strong> (spécialité, coef. 16).
              Dissertation, explication de texte et Grand Oral constituent les épreuves majeures.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>🧠 6 thèmes</span><span>·</span>
              <span>📊 108+ notions</span><span>·</span>
              <span>📝 89+ exercices</span><span>·</span>
              <span>🎤 Grand Oral coef. 8</span>
            </div>
          </div>

          {/* BADGE INFO */}
          <div style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 36, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>⭐</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#a78bfa', marginBottom: 6 }}>Épreuves Bac 2027 — Terminale</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Philosophie : Dissertation ou Explication de texte · 4h · coef. 8',
                  'HLP (si spécialité) : Épreuve écrite + oral · coef. 16',
                  'Grand Oral : 20 min devant jury · coef. 8',
                  'LLCER (si spécialité) : Littérature en langue étrangère · coef. 16',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(139,92,246,0.1)', color: '#a78bfa', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(139,92,246,0.22)' }}>
                    🔴 {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CHAPITRES */}
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>🧠 Philosophie — 4 grandes notions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
            {CHAPITRES.filter(ch => !ch.isSpé && ch.slug !== 'grand-oral-methodologie').map(ch => (
              <Link key={ch.slug} href={`/bac-france/francais/terminale/${ch.slug}`} style={{ textDecoration: 'none' }}>
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
                          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: ch.couleur }}>NOTION.0{ch.num}</span>
                          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${ch.couleur}22`, color: ch.badgeColor, fontWeight: 700 }}>{ch.badge}</span>
                        </div>
                        <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: '0 0 6px' }}>{ch.titre}</h2>
                        <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--muted)' }}>
                          <span style={{ color: ch.couleur, fontWeight: 600 }}>📊 {ch.nbThm} notions</span>
                          <span>·</span>
                          <span>📝 {ch.nbEx} exercices</span>
                          <span>·</span>
                          <span>{ch.auteurs.length} philosophes</span>
                        </div>
                      </div>
                    </div>
                    <span style={{ color: ch.couleur, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>Ouvrir →</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 10 }}>
                    <div style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 6 }}>📌 Notions au programme</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {ch.notions.map(n => <span key={n} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: `${ch.couleur}18`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>)}
                      </div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 6 }}>✒️ Philosophes étudiés</div>
                      {ch.auteurs.map(a => <div key={a} style={{ fontSize: 11, color: 'var(--text2)', padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>→ {a}</div>)}
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.13)', borderRadius: 10, padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: 10, color: ch.couleur, marginBottom: 6 }}>❓ Questions au Bac</div>
                      {ch.questions.map(q => <div key={q} style={{ fontSize: 10, color: 'var(--text2)', padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>• {q}</div>)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* HLP + Grand Oral */}
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>📚 HLP & Grand Oral</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 48 }}>
            {CHAPITRES.filter(ch => ch.isSpé || ch.slug === 'grand-oral-methodologie').map(ch => (
              <Link key={ch.slug} href={`/bac-france/francais/terminale/${ch.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: ch.gradient, border: `1px solid ${ch.isSpé ? ch.couleur+'80' : ch.border}`, borderRadius: 18, padding: '22px 26px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${ch.couleur}22` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 34, flexShrink: 0 }}>{ch.icon}</span>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${ch.couleur}22`, color: ch.badgeColor, fontWeight: 700 }}>{ch.badge}</span>
                          {ch.isSpé && <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.2)', color: '#34d399', fontWeight: 800 }}>⭐ SPÉCIALITÉ</span>}
                        </div>
                        <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: '0 0 6px' }}>{ch.titre}</h2>
                        <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--muted)' }}>
                          <span style={{ color: ch.couleur, fontWeight: 600 }}>📊 {ch.nbThm} notions</span>
                          <span>·</span>
                          <span>📝 {ch.nbEx} exercices</span>
                        </div>
                      </div>
                    </div>
                    <span style={{ color: ch.couleur, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>Ouvrir →</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {ch.notions.map(n => <span key={n} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 10, background: `${ch.couleur}18`, color: 'var(--text2)', border: `1px solid ${ch.couleur}18` }}>{n}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* MÉTHODO BAC */}
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>🎯 Méthodologie Bac Philo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12, marginBottom: 48 }}>
            {METHODO.map(cp => (
              <div key={cp.label} style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.18)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{cp.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#a78bfa', marginBottom: 4 }}>{cp.label}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{cp.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(236,72,153,0.06))', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Philo & Grand Oral</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Prépare la dissert et le Grand Oral avec l'IA</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Dissertation · Explication de texte · Problématique · Entretien</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/solve?subject=litterature" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>📚 Solveur Philo</Link>
              <Link href="/chat?subject=litterature" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🤖 Chat Prof IA</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}