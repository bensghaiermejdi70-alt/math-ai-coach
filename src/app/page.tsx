'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  MathBac.AI — HOME V2  (design inspiré des meilleurs EdTech mondiaux)
//  Palette : encre #0A0B0F · indigo #5B6CFF · violet #9D7BFF
// ═══════════════════════════════════════════════════════════════

const HOWTO_VIDEOS = [
  { id: 'z3uMDJwvu7Q', title: 'Présentation globale du site', tag: 'Découverte' },
  { id: '96f6b0ighJc', title: 'Cours — Tunisie & France', tag: 'Cours' },
  { id: 'O9aaUVxGuMo', title: 'Examens', tag: 'Examens' },
  { id: 'wf6StspCeVA', title: 'Simulation IA', tag: 'Simulation' },
  { id: 'wf6StspCeVA', title: 'Solveur pas à pas', tag: 'Solveur' },
  { id: 'kR5us0OfYLo', title: 'Chat IA', tag: 'Chat IA' },
  { id: 'QVoxa7KN5h8', title: 'Bac Blanc', tag: 'Bac Blanc' },
]

const MATIERES = [
  { icon: '🧮', label: 'Mathématiques', color: '#5B6CFF', href: '/bac/maths' },
  { icon: '⚗️', label: 'Physique-Chimie', color: '#06d6a0', href: '/bac/sciences-exp' },
  { icon: '🧬', label: 'SVT', color: '#10b981', href: '/bac/sciences-exp' },
  { icon: '🇬🇧', label: 'Anglais', color: '#f59e0b', href: '/bac' },
  { icon: '💻', label: 'Informatique', color: '#8b5cf6', href: '/bac/informatique' },
  { icon: '📚', label: 'Français', color: '#a78bfa', href: '/bac' },
  { icon: '📈', label: 'Économie', color: '#06b6d4', href: '/bac/economie', isNew: true },
  { icon: '💼', label: 'Gestion', color: '#f43f5e', href: '/bac/gestion', isNew: true },
]

// Ordre IDENTIQUE à TYPED_WORDS pour que le hero et la démo affichent la même matière
const DEMO_BY_MATIERE = [
  { mat: 'Mathématiques · Bac', color: '#5B6CFF', gen: 'Exercice 2 — Suites & limites', doc: 'Graphique de fonction ✓', corr: 'Étapes justifiées', grade: '18' },
  { mat: 'Physique-Chimie · Bac', color: '#06d6a0', gen: 'Exercice 1 — Cinétique chimique', doc: 'Courbe [A] = f(t) ✓', corr: 'Méthode + schéma', grade: '15.5' },
  { mat: 'SVT · Bac', color: '#10b981', gen: 'Exercice — Génétique & hérédité', doc: 'Schéma · brassage chromosomique ✓', corr: 'Raisonnement + schéma', grade: '16.5' },
  { mat: 'Économie · Bac', color: '#06b6d4', gen: 'Exercice 1 — Croissance & PIB', doc: 'Tableau INS 2024 ✓', corr: 'Barème + remédiation', grade: '17.5' },
  { mat: 'Gestion · Bac', color: '#f43f5e', gen: 'Dossier — Analyse financière', doc: 'Bilan · FDR / BFR / TN ✓', corr: 'Calculs + interprétation', grade: '16' },
  { mat: 'Anglais · Bac', color: '#f59e0b', gen: 'Reading comprehension', doc: 'Press article excerpt ✓', corr: 'Feedback in English', grade: '17' },
  { mat: 'Français · Bac', color: '#a78bfa', gen: 'Commentaire — analyse de texte', doc: 'Extrait · œuvre au programme ✓', corr: 'Plan + analyse stylistique', grade: '15' },
  { mat: 'Informatique · Bac', color: '#8b5cf6', gen: 'Algorithmique — Tri', doc: 'Trace d\'exécution ✓', corr: 'Complexité + code', grade: '18.5' },
]

const STATS = [
  { n: '8', l: 'Matières', s: 'Maths · PC · SVT · Anglais · Info · Français · Éco · Gestion' },
  { n: '2', l: 'Programmes', s: 'Bac Tunisie & Bac France' },
  { n: '10+', l: "Ans d'archives", s: 'Examens officiels' },
  { n: '24/7', l: 'Disponible', s: 'Professeur IA toujours là' },
]

const PROCESS = [
  { n: '01', icon: '🎯', t: 'Choisis ta matière', d: "8 matières, 2 programmes (Tunisie & France), toutes les sections — du tronc commun à la spécialité." },
  { n: '02', icon: '⚡', t: "Génère un sujet IA", d: "Un sujet original au format officiel du Bac, créé en quelques secondes, jamais deux fois le même." },
  { n: '03', icon: '✍️', t: 'Compose & dépose', d: "Tu rédiges, tu déposes ta copie (ou une photo). Chrono réel comme le jour J." },
  { n: '04', icon: '📈', t: 'Correction & remédiation', d: "Note détaillée, correction exercice par exercice, lacunes ciblées et plan de révision personnalisé." },
]

const FEATURES = [
  { icon: '📝', title: 'Simulation IA', desc: "Sujets originaux au format officiel, corrigés exercice par exercice avec remédiation personnalisée.", color: '#5B6CFF', href: '/simulation', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80' },
  { icon: '🧮', title: 'Solveur étape par étape', desc: "Chaque étape justifiée. La méthode complète, pas seulement le résultat.", color: '#4f6ef7', href: '/solve', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80' },
  { icon: '🤖', title: 'Chat IA Professeur', desc: "Pose tes questions en français. L'IA répond comme un enseignant, avec graphiques interactifs.", color: '#9D7BFF', href: '/chat', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80' },
  { icon: '📊', title: 'Analyse & remédiation', desc: "Détection des lacunes, exercices ciblés et plan de révision généré par l'IA.", color: '#ec4899', href: '/chat', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80' },
  { icon: '🏆', title: 'Bac Blanc national', desc: "Concours quotidien avec chrono, correction IA et classement national.", color: '#f59e0b', href: '/bac-blanc', img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&q=80' },
  { icon: '📚', title: 'Cours & programme officiel', desc: "Tous les chapitres, définitions, théorèmes, formules et exercices corrigés.", color: '#06b6d4', href: '/bac', img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80' },
]

const SECTIONS_TN = [
  { href: '/bac/maths', icon: '🧮', titre: 'Mathématiques', couleur: '#5B6CFF' },
  { href: '/bac/sciences-exp', icon: '⚗️', titre: 'Sciences Exp.', couleur: '#10b981' },
  { href: '/bac/sciences-tech', icon: '⚙️', titre: 'Sciences Tech.', couleur: '#06b6d4' },
  { href: '/bac/informatique', icon: '💻', titre: 'Informatique', couleur: '#8b5cf6' },
  { href: '/bac/lettres', icon: '📖', titre: 'Lettres', couleur: '#a78bfa' },
  { href: '/bac/economie', icon: '📈', titre: 'Économie', couleur: '#06b6d4', isNew: true },
  { href: '/bac/gestion', icon: '💼', titre: 'Gestion', couleur: '#f43f5e', isNew: true },
]

const SECTIONS_FR = [
  { href: '/bac-france/seconde', icon: '📘', titre: 'Seconde', couleur: '#10b981' },
  { href: '/bac-france/terminale-generale', icon: '🎓', titre: 'Terminale Générale', couleur: '#5B6CFF' },
  { href: '/bac-france/premiere', icon: '📗', titre: 'Première Spécialité', couleur: '#3b82f6' },
  { href: '/bac-france/terminale-techno', icon: '📊', titre: 'STMG / STI2D', couleur: '#10b981' },
  { href: '/bac-france/expertes', icon: '★', titre: 'Maths Expertes', couleur: '#8b5cf6' },
  { href: '/bac-france/eco-gestion', icon: '📊', titre: 'Éco-Gestion · SES', couleur: '#14b8a6', isNew: true },
]

const TYPED_WORDS = ['Mathématiques', 'Physique-Chimie', 'SVT', 'Économie', 'Gestion', 'Anglais', 'Français', 'Informatique']

// ═══════════════════════════════════════════════════════════════
//  MICRO-COMPOSANTS
// ═══════════════════════════════════════════════════════════════

function StatCounter({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="v2-stat">
      <div className="v2-stat-n">{value}</div>
      <div className="v2-stat-l">{label}</div>
      <div className="v2-stat-s">{sub}</div>
    </div>
  )
}

function VideoCard({ id, title, tag }: { id: string; title: string; tag: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="v2-vid-card">
      <div className="v2-vid-frame">
        {!playing ? (
          <button className="v2-vid-thumb" onClick={() => setPlaying(true)} aria-label={`Lire la vidéo : ${title}`}>
            <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" />
            <span className="v2-vid-play"><span className="v2-vid-tri" /></span>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
          />
        )}
      </div>
      <div className="v2-vid-meta">
        <span className="v2-vid-tag">{tag}</span>
        <h3 className="v2-vid-title">{title}</h3>
      </div>
    </div>
  )
}

// Démo live : flux de génération qui change selon la matière (signature du hero)
function LiveDemo({ subjectIndex }: { subjectIndex: number }) {
  const [shown, setShown] = useState(0)
  const d = DEMO_BY_MATIERE[subjectIndex % DEMO_BY_MATIERE.length]
  // La matière suit le mot du hero (subjectIndex) → toujours synchronisés.
  useEffect(() => {
    setShown(0)
    const timers = [1, 2, 3, 4].map((n, i) => setTimeout(() => setShown((s) => Math.max(s, i + 1)), 350 + i * 480))
    return () => { timers.forEach(clearTimeout) }
  }, [subjectIndex])
  const lines = [
    { label: 'Matière', val: d.mat },
    { label: 'Génération du sujet', val: d.gen },
    { label: 'Document', val: d.doc },
    { label: 'Correction IA', val: d.corr },
  ]
  return (
    <div className="v2-demo" role="img" aria-label="Aperçu d'une génération de sujet par l'IA">
      <div className="v2-demo-top">
        <span className="v2-dot" style={{ background: '#ff5f57' }} />
        <span className="v2-dot" style={{ background: '#febc2e' }} />
        <span className="v2-dot" style={{ background: '#28c840' }} />
        <span className="v2-demo-title">simulation · sujet IA</span>
        <span className="v2-demo-badge" style={{ ['--c' as any]: d.color }}>{d.mat.split(' · ')[0]}</span>
      </div>
      <div className="v2-demo-body">
        {lines.map((l, i) => (
          <div key={l.label} className={`v2-demo-line ${i < shown ? 'on' : ''}`} style={{ ['--c' as any]: d.color }}>
            <span className="v2-demo-k">{l.label}</span>
            <span className="v2-demo-v">{l.val}</span>
          </div>
        ))}
        <div className={`v2-demo-bar ${shown >= 4 ? 'full' : ''}`} style={{ ['--c' as any]: d.color }}><span /></div>
        <div className={`v2-demo-grade ${shown >= 4 ? 'on' : ''}`}>{d.grade}<span>/20</span></div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  PAGE
// ═══════════════════════════════════════════════════════════════

export default function HomePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [typed, setTyped] = useState('')
  const [wordIdx, setWordIdx] = useState(0)

  // Effet machine à écrire sur le mot-matière du hero
  useEffect(() => {
    const word = TYPED_WORDS[wordIdx]
    let i = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (!deleting) {
        setTyped(word.slice(0, i + 1)); i++
        if (i === word.length) { deleting = true; timer = setTimeout(tick, 2800); return }
      } else {
        setTyped(word.slice(0, i - 1)); i--
        if (i === 0) { deleting = false; setWordIdx((w) => (w + 1) % TYPED_WORDS.length); return }
      }
      timer = setTimeout(tick, deleting ? 45 : 90)
    }
    timer = setTimeout(tick, 200)
    return () => clearTimeout(timer)
  }, [wordIdx])

  // Reveal au scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((x) => { if (x.isIntersecting) x.target.classList.add('revealed') }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Session check (conservé)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return
      const user = session.user
      if (user.email === 'bensghaiermejdi70@gmail.com') return
      const localId = localStorage.getItem('mathbac_session_id')
      if (!localId) return
      const { data: prof } = await supabase
        .from('profiles').select('current_session_id, is_active').eq('id', user.id).single()
      if (prof?.is_active && prof?.current_session_id && prof.current_session_id !== localId) {
        localStorage.removeItem('mathbac_session_id')
        await supabase.auth.signOut()
        window.location.href = '/login?error=session_dupliquee'
      }
    }
    checkSession()
    const interval = setInterval(checkSession, 10000)
    return () => clearInterval(interval)
  }, [supabase])

  return (
    <>
      <Navbar />
      <main className="v2">

        {/* ─────────────────────────── HERO */}
        <section className="v2-hero">
          <div className="v2-aurora" aria-hidden />
          <div className="v2-grid-bg" aria-hidden />
          <div className="v2-hero-inner">
            <div className="v2-hero-left">
              <span className="v2-eyebrow">★ Plateforme IA · Tunisie &amp; France</span>
              <h1 className="v2-h1">
                Révise{' '}
                <span className="v2-typed">{typed}<span className="v2-caret" /></span>
                <br />avec un prof IA qui ne dort jamais.
              </h1>
              <p className="v2-sub">
                Sujets originaux générés par l'IA au format officiel, corrigés exercice par exercice,
                avec remédiation personnalisée. 8 matières, 2 programmes, un seul objectif : ton Bac.
              </p>
              <div className="v2-cta-row">
                <Link href="/simulation" className="v2-btn v2-btn-primary">Générer un sujet →</Link>
                <Link href="/bac" className="v2-btn v2-btn-ghost">Explorer les cours</Link>
              </div>
              <div className="v2-trust">
                <span>✓ Programmes CNP &amp; Éducation nationale</span><span>✓ 8 matières · Tunisie &amp; France</span>
              </div>
            </div>
            <div className="v2-hero-right reveal">
              <LiveDemo subjectIndex={wordIdx} />
            </div>
          </div>

          {/* Bandeau matières défilant */}
          <div className="v2-marquee" aria-hidden>
            <div className="v2-marquee-track">
              {[...MATIERES, ...MATIERES].map((m, i) => (
                <span key={i} className="v2-chip" style={{ ['--c' as any]: m.color }}>
                  <span>{m.icon}</span>{m.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────── STATS */}
        <section className="v2-section v2-stats reveal">
          {STATS.map((s) => <StatCounter key={s.l} value={s.n} label={s.l} sub={s.s} />)}
        </section>

        {/* ─────────────────────────── MATIÈRES (mosaïque) */}
        <section className="v2-section reveal">
          <div className="v2-head">
            <span className="v2-label">Tout le programme, un seul endroit</span>
            <h2 className="v2-h2">8 matières couvertes de A à Z</h2>
            <p className="v2-p">Cours, examens officiels, simulations IA et Bac Blanc — disponibles dans les deux programmes, Tunisie et France.</p>
          </div>
          <div className="v2-mosaic">
            {MATIERES.map((m) => (
              <div key={m.label} className="v2-tile" style={{ ['--c' as any]: m.color }}>
                {m.isNew && <span className="v2-new">Nouveau</span>}
                <span className="v2-tile-icon">{m.icon}</span>
                <span className="v2-tile-label">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────── PROCESS (séquentiel numéroté) */}
        <section className="v2-section reveal">
          <div className="v2-head">
            <span className="v2-label">Comment ça marche</span>
            <h2 className="v2-h2">De la matière au 20/20, en 4 étapes</h2>
          </div>
          <div className="v2-steps">
            {PROCESS.map((p) => (
              <div key={p.n} className="v2-step">
                <div className="v2-step-n">{p.n}</div>
                <div className="v2-step-icon">{p.icon}</div>
                <h3 className="v2-step-t">{p.t}</h3>
                <p className="v2-step-d">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────── COMMENT ÇA MARCHE — VIDÉOS */}
        <section className="v2-section reveal">
          <div className="v2-head">
            <span className="v2-label">Comment ça marche</span>
            <h2 className="v2-h2">Découvrez chaque page en vidéo</h2>
          </div>
          <div className="v2-vid-grid">
            {HOWTO_VIDEOS.map((v, i) => (
              <VideoCard key={i} id={v.id} title={v.title} tag={v.tag} />
            ))}
          </div>
        </section>

        {/* ─────────────────────────── FEATURES */}
        <section className="v2-section reveal">
          <div className="v2-head">
            <span className="v2-label">Tout l'arsenal pour réussir</span>
            <h2 className="v2-h2">Six outils, une seule plateforme</h2>
          </div>
          <div className="v2-features">
            {FEATURES.map((f) => (
              <Link key={f.title} href={f.href} className="v2-feature" style={{ ['--c' as any]: f.color }}>
                <span className="v2-feature-media">
                  <img src={f.img} alt="" loading="lazy" />
                  <span className="v2-feature-icon">{f.icon}</span>
                </span>
                <span className="v2-feature-body">
                  <h3 className="v2-feature-t">{f.title}</h3>
                  <p className="v2-feature-d">{f.desc}</p>
                  <span className="v2-feature-go">Essayer →</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ─────────────────────────── 2 PROGRAMMES */}
        <section className="v2-section reveal">
          <div className="v2-head">
            <span className="v2-label">Deux pays · un seul niveau d'exigence</span>
            <h2 className="v2-h2">Tunisie &amp; France</h2>
          </div>
          <div className="v2-prog">
            <div className="v2-prog-card" style={{ ['--c' as any]: '#5B6CFF' }}>
              <div className="v2-prog-top"><span className="v2-flag">🇹🇳</span>
                <div><span className="v2-prog-kicker">Programme CNP 2026</span><h3>Bac Tunisie</h3></div>
              </div>
              <p className="v2-prog-desc">Toutes matières, toutes sections — cours, examens officiels, simulations IA et Bac Blanc.</p>
              <div className="v2-prog-tags">
                {SECTIONS_TN.map((s) => (
                  <Link key={s.href} href={s.href} className="v2-tag" style={{ ['--c' as any]: s.couleur }}>
                    <span>{s.icon}</span>{s.titre}{s.isNew && <span className="v2-tag-new">•</span>}
                  </Link>
                ))}
              </div>
              <Link href="/bac" className="v2-btn v2-btn-primary v2-prog-btn">Explorer le programme →</Link>
            </div>
            <div className="v2-prog-card" style={{ ['--c' as any]: '#3b82f6' }}>
              <div className="v2-prog-top"><span className="v2-flag">🇫🇷</span>
                <div><span className="v2-prog-kicker">Éducation nationale</span><h3>Bac France</h3></div>
              </div>
              <p className="v2-prog-desc">Toutes filières — cours, examens officiels, simulations IA et Bac Blanc.</p>
              <div className="v2-prog-tags">
                {SECTIONS_FR.map((s) => (
                  <Link key={s.href} href={s.href} className="v2-tag" style={{ ['--c' as any]: s.couleur }}>
                    <span>{s.icon}</span>{s.titre}{s.isNew && <span className="v2-tag-new">•</span>}
                  </Link>
                ))}
              </div>
              <Link href="/bac-france" className="v2-btn v2-btn-primary v2-prog-btn">Explorer le programme →</Link>
            </div>
          </div>
        </section>

        {/* ─────────────────────────── CONTACT & RÉSEAUX */}
        <section className="v2-section reveal">
          <div className="v2-head">
            <span className="v2-label">On reste en contact</span>
            <h2 className="v2-h2">Une question ? On répond en 2h</h2>
            <p className="v2-p">Support disponible 7j/7. Suis-nous aussi sur YouTube pour les nouveautés et tutos.</p>
          </div>
          <div className="v2-contact">
            <a href="https://wa.me/21699268970" target="_blank" rel="noopener noreferrer" className="v2-contact-card" style={{ ['--c' as any]: '#25D366' }}>
              <span className="v2-contact-icon">💬</span>
              <span className="v2-contact-t">WhatsApp</span>
              <span className="v2-contact-v">+216 99 268 970</span>
              <span className="v2-contact-go">Écrire →</span>
            </a>
            <a href="mailto:bensghaiermejdi70@gmail.com" className="v2-contact-card" style={{ ['--c' as any]: '#5B6CFF' }}>
              <span className="v2-contact-icon">✉️</span>
              <span className="v2-contact-t">Email</span>
              <span className="v2-contact-v">bensghaiermejdi70@gmail.com</span>
              <span className="v2-contact-go">Envoyer →</span>
            </a>
            <a href="https://www.youtube.com/@mathbacai" target="_blank" rel="noopener noreferrer" className="v2-contact-card" style={{ ['--c' as any]: '#FF0000' }}>
              <span className="v2-contact-icon">▶️</span>
              <span className="v2-contact-t">YouTube</span>
              <span className="v2-contact-v">@mathbacai</span>
              <span className="v2-contact-go">S'abonner →</span>
            </a>
          </div>
        </section>

        {/* ─────────────────────────── CTA FINAL */}
        <section className="v2-section reveal">
          <div className="v2-final">
            <div className="v2-aurora v2-aurora-2" aria-hidden />
            <h2 className="v2-final-h">Ton Bac commence aujourd'hui.</h2>
            <p className="v2-final-p">Génère ton premier sujet en moins d'une minute et reçois une correction détaillée.</p>
            <div className="v2-cta-row v2-center">
              <Link href="/simulation" className="v2-btn v2-btn-primary">Commencer maintenant →</Link>
              <Link href="/abonnement" className="v2-btn v2-btn-ghost">Voir les offres</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: V2_CSS }} />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
//  STYLES V2
// ═══════════════════════════════════════════════════════════════
const V2_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.v2 { --ink:#0A0B0F; --ink2:#101218; --line:rgba(255,255,255,0.08); --txt:#F5F6FA; --txt2:#A2A6B4; --txt3:#6B6F7E; --indigo:#5B6CFF; --violet:#9D7BFF;
  position:relative; z-index:1; overflow:hidden; background:var(--ink); color:var(--txt);
  font-family:'Plus Jakarta Sans',system-ui,sans-serif; }
.v2 *{ box-sizing:border-box; }
.v2 a{ text-decoration:none; color:inherit; }

/* reveal */
.v2 .reveal{ opacity:0; transform:translateY(26px); transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1); }
.v2 .reveal.revealed{ opacity:1; transform:none; }

/* ── HERO ── */
.v2-hero{ position:relative; padding:clamp(108px,13vh,128px) clamp(20px,5vw,64px) 0; overflow:hidden; }
.v2-aurora{ position:absolute; inset:-20% -10% auto; height:560px;
  background:radial-gradient(60% 60% at 25% 30%,rgba(91,108,255,.30),transparent 70%),radial-gradient(50% 50% at 80% 20%,rgba(157,123,255,.22),transparent 70%);
  filter:blur(40px); pointer-events:none; }
.v2-grid-bg{ position:absolute; inset:0; background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
  background-size:54px 54px; mask-image:radial-gradient(circle at 50% 30%,#000,transparent 75%); opacity:.5; pointer-events:none; }
.v2-hero-inner{ position:relative; max-width:1180px; margin:0 auto; display:grid; grid-template-columns:1.1fr .9fr; gap:56px; align-items:center; }
.v2-eyebrow{ display:inline-block; font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
  color:var(--violet); background:rgba(157,123,255,.10); border:1px solid rgba(157,123,255,.28); padding:7px 14px; border-radius:100px; margin-bottom:14px; }
.v2-h1{ font-family:'Fraunces',serif; font-weight:600; font-size:clamp(28px,4.4vw,52px); line-height:1.05; letter-spacing:-.02em; margin:0 0 14px; }
.v2-typed{ background:linear-gradient(100deg,var(--indigo),var(--violet)); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.v2-caret{ display:inline-block; width:3px; height:.92em; margin-left:4px; vertical-align:-.08em; background:var(--violet); border-radius:2px; animation:v2blink 1s steps(1) infinite; }
@keyframes v2blink{ 50%{opacity:0} }
.v2-sub{ font-size:clamp(14px,1.3vw,16px); line-height:1.6; color:var(--txt2); max-width:560px; margin:0 0 20px; }
.v2-cta-row{ display:flex; gap:14px; flex-wrap:wrap; }
.v2-cta-row.v2-center{ justify-content:center; }
.v2-btn{ display:inline-flex; align-items:center; gap:8px; padding:11px 22px; border-radius:13px; font-weight:700; font-size:14px; transition:transform .2s,box-shadow .2s,opacity .2s; }
.v2-btn-primary{ background:linear-gradient(135deg,var(--indigo),var(--violet)); color:#fff; box-shadow:0 10px 30px rgba(91,108,255,.40); }
.v2-btn-primary:hover{ transform:translateY(-2px); box-shadow:0 16px 40px rgba(91,108,255,.52); }
.v2-btn-ghost{ background:rgba(255,255,255,.04); color:var(--txt); border:1px solid var(--line); }
.v2-btn-ghost:hover{ background:rgba(255,255,255,.08); transform:translateY(-2px); }
.v2-trust{ display:flex; gap:18px; flex-wrap:wrap; margin-top:14px; font-size:13px; color:var(--txt3); font-weight:600; }

/* démo live */
.v2-demo{ background:linear-gradient(160deg,#13151d,#0c0e14); border:1px solid var(--line); border-radius:20px; overflow:hidden;
  box-shadow:0 30px 80px rgba(0,0,0,.55); transform:perspective(1200px) rotateY(-7deg) rotateX(3deg); }
.v2-demo-top{ display:flex; align-items:center; gap:7px; padding:13px 16px; border-bottom:1px solid var(--line); background:rgba(255,255,255,.02); }
.v2-dot{ width:11px; height:11px; border-radius:50%; }
.v2-demo-title{ margin-left:8px; font-size:12px; color:var(--txt3); font-family:'Plus Jakarta Sans'; }
.v2-demo-body{ padding:18px; min-height:230px; position:relative; }
.v2-demo-line{ display:flex; justify-content:space-between; align-items:center; gap:14px; padding:12px 14px; margin-bottom:10px; border-radius:11px;
  background:rgba(255,255,255,.03); border:1px solid var(--line); opacity:0; transform:translateX(-10px); transition:opacity .5s,transform .5s; }
.v2-demo-line.on{ opacity:1; transform:none; }
.v2-demo-k{ font-size:12.5px; color:var(--txt3); font-weight:600; }
.v2-demo-v{ font-size:13px; color:var(--txt); font-weight:700; text-align:right; }
.v2-demo-bar{ height:8px; border-radius:100px; background:rgba(255,255,255,.06); overflow:hidden; margin:16px 0 12px; }
.v2-demo-bar span{ display:block; height:100%; width:0; background:linear-gradient(90deg,var(--indigo),var(--violet)); transition:width 1.1s ease; }
.v2-demo-bar.full span{ width:88%; }
.v2-demo-grade{ font-family:'Fraunces',serif; font-weight:700; font-size:36px; text-align:right; color:#10b981; opacity:0; transition:opacity .5s .3s; }
.v2-demo-grade.on{ opacity:1; }
.v2-demo-grade span{ font-size:16px; color:var(--txt3); }

/* marquee */
.v2-marquee{ position:relative; margin-top:64px; padding:18px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line);
  overflow:hidden; mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); }
.v2-marquee-track{ display:flex; gap:14px; width:max-content; animation:v2scroll 32s linear infinite; }
@keyframes v2scroll{ to{ transform:translateX(-50%) } }
.v2-chip{ display:inline-flex; align-items:center; gap:8px; padding:9px 18px; border-radius:100px; white-space:nowrap; font-size:14px; font-weight:700;
  color:var(--c); background:color-mix(in srgb,var(--c) 12%,transparent); border:1px solid color-mix(in srgb,var(--c) 32%,transparent); }

/* sections */
.v2-section{ max-width:1180px; margin:0 auto; padding:clamp(56px,9vh,100px) clamp(20px,5vw,64px); }
.v2-head{ text-align:center; margin-bottom:48px; }
.v2-label{ display:inline-block; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--violet); margin-bottom:14px; }
.v2-h2{ font-family:'Fraunces',serif; font-weight:600; font-size:clamp(26px,3.6vw,44px); line-height:1.1; letter-spacing:-.02em; margin:0 0 14px; }
.v2-p{ font-size:15px; color:var(--txt2); max-width:560px; margin:0 auto; line-height:1.7; }

/* stats */
.v2-stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
.v2-stat{ background:linear-gradient(160deg,rgba(255,255,255,.045),rgba(255,255,255,.01)); border:1px solid var(--line); border-radius:18px; padding:26px 22px; text-align:center; }
.v2-stat-n{ font-family:'Fraunces',serif; font-weight:700; font-size:clamp(30px,4vw,46px); background:linear-gradient(135deg,var(--indigo),var(--violet)); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.v2-stat-l{ font-size:15px; font-weight:800; margin-top:4px; }
.v2-stat-s{ font-size:11.5px; color:var(--txt3); margin-top:6px; line-height:1.5; }

/* mosaïque matières */
.v2-mosaic{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.v2-tile{ position:relative; display:flex; flex-direction:column; gap:8px; padding:26px 22px; border-radius:18px; overflow:hidden;
  background:linear-gradient(160deg,color-mix(in srgb,var(--c) 9%,transparent),rgba(255,255,255,.01));
  border:1px solid color-mix(in srgb,var(--c) 22%,transparent); transition:transform .22s,box-shadow .22s,border-color .22s; }
.v2-tile:hover{ transform:translateY(-5px); border-color:color-mix(in srgb,var(--c) 55%,transparent); box-shadow:0 20px 50px color-mix(in srgb,var(--c) 22%,transparent); }
.v2-tile-icon{ font-size:34px; }
.v2-tile-label{ font-size:16px; font-weight:800; }
.v2-tile-go{ font-size:13px; font-weight:700; color:var(--c); opacity:.85; }
.v2-new{ position:absolute; top:12px; right:12px; font-size:9.5px; font-weight:800; letter-spacing:.05em; text-transform:uppercase;
  color:#fff; background:linear-gradient(135deg,var(--indigo),var(--violet)); padding:3px 9px; border-radius:100px; }

/* steps */
.v2-steps{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.v2-step{ position:relative; padding:28px 22px; border-radius:18px; background:rgba(255,255,255,.025); border:1px solid var(--line); transition:transform .22s,border-color .22s; }
.v2-step:hover{ transform:translateY(-4px); border-color:rgba(157,123,255,.4); }
.v2-step-n{ font-family:'Fraunces',serif; font-weight:700; font-size:15px; color:var(--violet); letter-spacing:.05em; }
.v2-step-icon{ font-size:30px; margin:10px 0 12px; }
.v2-step-t{ font-size:16px; font-weight:800; margin:0 0 8px; }
.v2-step-d{ font-size:13.5px; color:var(--txt2); line-height:1.6; margin:0; }

/* video */
.v2-video{ position:relative; max-width:900px; margin:0 auto; aspect-ratio:16/9; border-radius:22px; overflow:hidden; border:1px solid var(--line); box-shadow:0 30px 80px rgba(0,0,0,.5); }
.v2-video iframe,.v2-video img{ width:100%; height:100%; object-fit:cover; border:0; display:block; }
.v2-video-thumb{ position:relative; width:100%; height:100%; padding:0; border:0; cursor:pointer; background:#000; }
.v2-video-thumb img{ opacity:.72; transition:opacity .3s,transform .5s; }
.v2-video-thumb:hover img{ opacity:.85; transform:scale(1.03); }
.v2-video-play{ position:absolute; inset:0; margin:auto; width:78px; height:78px; border-radius:50%; display:grid; place-items:center;
  background:linear-gradient(135deg,var(--indigo),var(--violet)); box-shadow:0 12px 40px rgba(91,108,255,.6); transition:transform .25s; }
.v2-video-thumb:hover .v2-video-play{ transform:scale(1.08); }
.v2-video-tri{ width:0; height:0; border-left:22px solid #fff; border-top:14px solid transparent; border-bottom:14px solid transparent; margin-left:6px; }
.v2-video-cap{ position:absolute; left:0; right:0; bottom:18px; text-align:center; font-size:13px; font-weight:600; color:#fff; text-shadow:0 2px 10px rgba(0,0,0,.6); }

/* galerie comment ça marche (7 vidéos) */
.v2-vid-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; max-width:1180px; margin:0 auto; }
.v2-vid-card{ border-radius:18px; overflow:hidden; background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01)); border:1px solid var(--line); transition:transform .22s,border-color .22s,box-shadow .22s; }
.v2-vid-card:hover{ transform:translateY(-5px); border-color:color-mix(in srgb,var(--indigo) 45%,transparent); box-shadow:0 20px 50px rgba(91,108,255,.16); }
.v2-vid-frame{ position:relative; aspect-ratio:16/9; background:#000; overflow:hidden; }
.v2-vid-frame iframe,.v2-vid-frame img{ width:100%; height:100%; object-fit:cover; border:0; display:block; }
.v2-vid-thumb{ position:relative; width:100%; height:100%; padding:0; border:0; cursor:pointer; background:#000; }
.v2-vid-thumb img{ opacity:.72; transition:opacity .3s,transform .5s; }
.v2-vid-thumb:hover img{ opacity:.9; transform:scale(1.04); }
.v2-vid-play{ position:absolute; inset:0; margin:auto; width:60px; height:60px; border-radius:50%; display:grid; place-items:center; background:linear-gradient(135deg,var(--indigo),var(--violet)); box-shadow:0 10px 32px rgba(91,108,255,.55); transition:transform .25s; }
.v2-vid-thumb:hover .v2-vid-play{ transform:scale(1.1); }
.v2-vid-tri{ width:0; height:0; border-left:17px solid #fff; border-top:11px solid transparent; border-bottom:11px solid transparent; margin-left:5px; }
.v2-vid-meta{ padding:14px 18px 16px; }
.v2-vid-tag{ display:inline-block; font-size:11px; font-weight:800; letter-spacing:.04em; text-transform:uppercase; color:var(--violet); margin-bottom:6px; }
.v2-vid-title{ font-size:15.5px; font-weight:800; margin:0; line-height:1.35; }
@media(max-width:920px){ .v2-vid-grid{ grid-template-columns:repeat(2,1fr); } }
@media(max-width:600px){ .v2-vid-grid{ grid-template-columns:1fr; } }

/* features */
.v2-features{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
.v2-feature{ position:relative; padding:28px 24px; border-radius:18px; background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01)); border:1px solid var(--line); transition:transform .22s,border-color .22s,box-shadow .22s; }
.v2-feature:hover{ transform:translateY(-5px); border-color:color-mix(in srgb,var(--c) 50%,transparent); box-shadow:0 20px 50px color-mix(in srgb,var(--c) 18%,transparent); }
.v2-feature-icon{ display:inline-grid; place-items:center; width:50px; height:50px; border-radius:14px; font-size:24px; margin-bottom:14px;
  background:color-mix(in srgb,var(--c) 14%,transparent); border:1px solid color-mix(in srgb,var(--c) 30%,transparent); }
.v2-feature-t{ font-size:17px; font-weight:800; margin:0 0 8px; }
.v2-feature-d{ font-size:13.5px; color:var(--txt2); line-height:1.6; margin:0 0 14px; }
.v2-feature-go{ font-size:13px; font-weight:700; color:var(--c); }

/* badge matière dans la démo */
.v2-demo-badge{ margin-left:auto; font-size:10.5px; font-weight:800; letter-spacing:.04em; text-transform:uppercase; color:var(--c);
  background:color-mix(in srgb,var(--c) 16%,transparent); border:1px solid color-mix(in srgb,var(--c) 34%,transparent); padding:3px 9px; border-radius:100px; }
.v2-demo-line{ border-left:2px solid transparent; }
.v2-demo-line.on{ border-left-color:var(--c); }
.v2-demo-bar span{ background:linear-gradient(90deg,var(--c),var(--violet)) !important; }

/* feature avec photo */
.v2-feature{ display:flex; flex-direction:column; overflow:hidden; padding:0; }
.v2-feature-media{ position:relative; display:block; height:148px; overflow:hidden; }
.v2-feature-media img{ width:100%; height:100%; object-fit:cover; opacity:.62; transition:transform .5s,opacity .3s; }
.v2-feature:hover .v2-feature-media img{ transform:scale(1.06); opacity:.78; }
.v2-feature-media::after{ content:''; position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,#0c0e14); }
.v2-feature .v2-feature-icon{ position:absolute; left:18px; bottom:-22px; z-index:2; margin:0; }
.v2-feature-body{ display:block; padding:32px 24px 26px; }

/* contact */
.v2-contact{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
.v2-contact-card{ display:flex; flex-direction:column; gap:6px; padding:28px 24px; border-radius:18px; text-align:left;
  background:linear-gradient(160deg,color-mix(in srgb,var(--c) 9%,transparent),rgba(255,255,255,.01));
  border:1px solid color-mix(in srgb,var(--c) 24%,transparent); transition:transform .22s,border-color .22s,box-shadow .22s; }
.v2-contact-card:hover{ transform:translateY(-5px); border-color:color-mix(in srgb,var(--c) 55%,transparent); box-shadow:0 20px 50px color-mix(in srgb,var(--c) 20%,transparent); }
.v2-contact-icon{ font-size:30px; }
.v2-contact-t{ font-size:16px; font-weight:800; }
.v2-contact-v{ font-size:13px; color:var(--txt2); word-break:break-all; }
.v2-contact-go{ font-size:13px; font-weight:700; color:var(--c); margin-top:4px; }

/* programmes */
.v2-prog{ display:grid; grid-template-columns:1fr 1fr; gap:22px; }
.v2-prog-card{ position:relative; padding:32px 34px; border-radius:24px; overflow:hidden;
  background:linear-gradient(160deg,color-mix(in srgb,var(--c) 8%,transparent),rgba(255,255,255,.01)); border:1px solid color-mix(in srgb,var(--c) 22%,transparent); }
.v2-prog-top{ display:flex; align-items:center; gap:14px; margin-bottom:16px; }
.v2-flag{ font-size:42px; }
.v2-prog-kicker{ display:block; font-size:10px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--c); margin-bottom:3px; }
.v2-prog-top h3{ font-size:22px; font-weight:800; margin:0; }
.v2-prog-desc{ font-size:14px; color:var(--txt2); line-height:1.7; margin:0 0 18px; }
.v2-prog-tags{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:22px; }
.v2-tag{ display:inline-flex; align-items:center; gap:6px; padding:7px 13px; border-radius:100px; font-size:12.5px; font-weight:700;
  color:var(--c); background:color-mix(in srgb,var(--c) 12%,transparent); border:1px solid color-mix(in srgb,var(--c) 30%,transparent); transition:transform .18s,background .18s; }
.v2-tag:hover{ transform:translateY(-2px); background:color-mix(in srgb,var(--c) 22%,transparent); }
.v2-tag-new{ color:#fff; }
.v2-prog-btn{ width:100%; justify-content:center; }

/* final */
.v2-final{ position:relative; text-align:center; padding:clamp(48px,8vw,84px) 28px; border-radius:28px; overflow:hidden;
  background:linear-gradient(160deg,#13151d,#0b0d13); border:1px solid var(--line); }
.v2-aurora-2{ inset:-40% -10% auto; height:420px; opacity:.7; }
.v2-final-h{ position:relative; font-family:'Fraunces',serif; font-weight:600; font-size:clamp(28px,4.4vw,52px); letter-spacing:-.02em; margin:0 0 14px; }
.v2-final-p{ position:relative; font-size:16px; color:var(--txt2); margin:0 auto 28px; max-width:480px; line-height:1.7; }

/* responsive */
@media (max-width:980px){
  .v2-hero-inner{ grid-template-columns:1fr; gap:40px; }
  .v2-hero-right{ order:-1; }
  .v2-demo{ transform:none; max-width:460px; margin:0 auto; }
  .v2-stats{ grid-template-columns:repeat(2,1fr); }
  .v2-mosaic{ grid-template-columns:repeat(2,1fr); }
  .v2-steps{ grid-template-columns:repeat(2,1fr); }
  .v2-features{ grid-template-columns:repeat(2,1fr); }
  .v2-prog{ grid-template-columns:1fr; }
  .v2-contact{ grid-template-columns:1fr; }
}
@media (max-width:560px){
  .v2-stats,.v2-mosaic,.v2-steps,.v2-features{ grid-template-columns:1fr; }
  .v2-cta-row{ flex-direction:column; }
  .v2-btn{ justify-content:center; }
  .v2-marquee-track{ animation-duration:22s; }
}
@media (prefers-reduced-motion:reduce){
  .v2 .reveal{ transition:none; opacity:1; transform:none; }
  .v2-marquee-track,.v2-caret{ animation:none; }
  .v2-demo-line{ opacity:1; transform:none; }
}
`