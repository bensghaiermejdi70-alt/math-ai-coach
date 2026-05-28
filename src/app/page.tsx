'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ═══════════════════════════════════════════════════════════════
//  DONNÉES & CONSTANTES
// ═══════════════════════════════════════════════════════════════

const SLOGANS = [
  "Ton Bac, notre Mission 🎯",
  "L'IA qui te comprend, le prof qui ne dort jamais 🤖",
  "De la Terminale au Diplôme, on est avec toi 🎓",
  "Réussir n'est plus une question de chance ✨",
]

const STATS = [
  { n: '6', l: 'Matières', s: 'Maths · PC · SVT · Anglais · Info · Français' },
  { n: '2', l: 'Programmes', s: 'Bac Tunisie & Bac France' },
  { n: '10+', l: "Ans d'archives", s: 'Examens officiels' },
  { n: '24/7', l: 'Disponible', s: 'Professeur IA toujours là' },
]

const FEATURES = [
  {
    icon: '📝',
    title: 'Simulation IA',
    desc: "Examens originaux générés par IA, corrigés exercice par exercice avec remédiation personnalisée.",
    color: '#6366f1',
    href: '/simulation',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  },
  {
    icon: '🧮',
    title: 'Solveur Étape par Étape',
    desc: "Chaque étape expliquée avec justification. La méthode complète, pas juste le résultat.",
    color: '#4f6ef7',
    href: '/solve',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
  },
  {
    icon: '🤖',
    title: 'Chat IA Professeur',
    desc: "Pose tes questions en français. L'IA répond comme un enignant avec graphiques interactifs.",
    color: '#7c3aed',
    href: '/chat',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
  },
  {
    icon: '📊',
    title: 'Analyse & Remédiation',
    desc: "Détection des lacunes, exercices ciblés et plan de révision personnalisé généré par l'IA.",
    color: '#ec4899',
    href: '/chat',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
  },
  {
    icon: '🏆',
    title: 'Bac Blanc National',
    desc: "Concours quotidien (1er Mai – 30 Juin) avec chrono, correction IA, classement national.",
    color: '#f59e0b',
    href: '/bac-blanc',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c8f5?w=600&q=80',
  },
  {
    icon: '📚',
    title: 'Cours & Programme Officiel',
    desc: "Tous les chapitres, définitions, théorèmes, formules et exercices corrigés du programme.",
    color: '#06b6d4',
    href: '/bac',
    img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
  },
]

const SECTIONS_TN = [
  { href: '/bac/maths', icon: '🧮', titre: 'Mathématiques', couleur: '#4f6ef7', desc: 'Analyse, Algèbre, Géométrie', coeff: 'Coeff. 4' },
  { href: '/bac/sciences-exp', icon: '⚗️', titre: 'Sciences Exp.', couleur: '#10b981', desc: 'Biologie, Physique, Chimie', coeff: 'Coeff. 3' },
  { href: '/bac/sciences-tech', icon: '⚙️', titre: 'Sciences Tech.', couleur: '#06b6d4', desc: 'Analyse & Algèbre appliquées', coeff: 'Coeff. 3' },
  { href: '/bac/informatique', icon: '💻', titre: 'Informatique', couleur: '#8b5cf6', desc: 'Logique, Algorithmique', coeff: 'Coeff. 3', isNew: true },
  { href: '/bac/eco-gestion', icon: '📊', titre: 'Économie-Gestion', couleur: '#f59e0b', desc: 'Stats, Suites financières', coeff: 'Coeff. 2', isNew: true },
]

const SECTIONS_FR = [
  { href: '/bac-france/terminale-generale', icon: '🎓', titre: 'Terminale Générale', couleur: '#4f6ef7', desc: 'Suites, Complexes, Proba', coeff: 'Coeff. 16' },
  { href: '/bac-france/premiere', icon: '📗', titre: 'Première Spécialité', couleur: '#3b82f6', desc: 'Second degré, Dérivation', coeff: 'Épreuve anticipée' },
  { href: '/bac-france/terminale-techno', icon: '📊', titre: 'STMG / STI2D', couleur: '#10b981', desc: 'Suites financières, Stats', coeff: 'Maths techno' },
  { href: '/bac-france/expertes', icon: '★', titre: 'Maths Expertes', couleur: '#8b5cf6', desc: 'Arithmétique, Matrices', coeff: 'Option', isNew: true },
]

// ═══════════════════════════════════════════════════════════════
//  MICRO-COMPOSANTS
// ═══════════════════════════════════════════════════════════════

function Pill({ children, color = '#4f6ef7' }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20,
      background: `${color}18`, color, border: `1px solid ${color}30`,
    }}>{children}</span>
  )
}

function SectionCard({ s }: { s: any }) {
  const [hov, setHov] = useState(false)
  return (
    <Link href={s.href} style={{ textDecoration: 'none' }}>
      <div style={{
        background: hov ? `${s.couleur}0d` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? s.couleur + '40' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 16, padding: '20px 18px',
        transition: 'all 0.3s ease', cursor: 'pointer',
        transform: hov ? 'translateY(-4px) scale(1.02)' : 'none',
        boxShadow: hov ? `0 20px 40px ${s.couleur}15` : 'none',
        position: 'relative', overflow: 'hidden',
      }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {s.isNew && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'linear-gradient(135deg,#6366f1,#a78bfa)',
            color: 'white', fontSize: 8, fontWeight: 900,
            padding: '2px 8px', borderRadius: 20, letterSpacing: '0.06em'
          }}>NEW</div>
        )}
        <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: 'var(--text)' }}>{s.titre}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10, lineHeight: 1.5 }}>{s.desc}</div>
        <Pill color={s.couleur}>{s.coeff}</Pill>
      </div>
    </Link>
  )
}

function FeatureCard({ f, i }: { f: typeof FEATURES[0]; i: number }) {
  const [hov, setHov] = useState(false)
  return (
    <Link href={f.href} style={{ textDecoration: 'none' }}>
      <div style={{
        background: hov ? `${f.color}0a` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hov ? f.color + '35' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 20, padding: 0, overflow: 'hidden',
        transition: 'all 0.35s ease', cursor: 'pointer',
        transform: hov ? 'translateY(-6px)' : 'none',
        boxShadow: hov ? `0 24px 60px ${f.color}12` : 'none',
      }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Image de la feature */}
        <div style={{
          height: 140, overflow: 'hidden', position: 'relative',
          background: `linear-gradient(135deg, ${f.color}20, ${f.color}05)`,
        }}>
          <img
            src={f.img}
            alt={f.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: hov ? 0.9 : 0.6,
              transform: hov ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.5s ease',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, rgba(10,10,26,0.9) 0%, transparent 60%)`,
          }} />
          <div style={{
            position: 'absolute', bottom: 12, left: 16,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: `${f.color}25`, border: `1px solid ${f.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, backdropFilter: 'blur(10px)',
            }}>{f.icon}</div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{f.title}</span>
          </div>
        </div>

        <div style={{ padding: '18px 20px 20px' }}>
          <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text2)', marginBottom: 14 }}>
            {f.desc}
          </div>
          <div style={{
            fontSize: 12, color: f.color, fontWeight: 700,
            opacity: hov ? 1 : 0.5, transition: 'opacity 0.3s',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            Découvrir →
          </div>
        </div>
      </div>
    </Link>
  )
}

// ═══════════════════════════════════════════════════════════════
//  COMPOSANT PRINCIPAL
// ═══════════════════════════════════════════════════════════════


// ── Composant Video Player avec thumbnail cliquable ──────────────
const VIDEO_ID = '_6atlDlzhwI'

function VideoPlayer() {
  const [playing, setPlaying] = useState(false)

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', borderRadius: 22, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
      {!playing ? (
        <div onClick={() => setPlaying(true)} style={{ position: 'relative', cursor: 'pointer', display: 'block', lineHeight: 0 }}>
          <img
            src="/Réussis_ton_Bac_avec_MATHBAC_AI.png"
            alt="MathBac.AI — Présentation"
            style={{ width: '100%', display: 'block', borderRadius: 22 }}
          />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 22,
            background: 'rgba(0,0,0,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.25)')}
          >
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M8 5.14v14l11-7-11-7z" fill="#1a1a2e"/>
              </svg>
            </div>
            <div style={{
              position: 'absolute', bottom: 16, right: 20,
              background: 'rgba(0,0,0,0.8)', color: 'white',
              fontSize: 13, fontWeight: 700, padding: '4px 10px', borderRadius: 8,
              fontFamily: 'var(--font-mono)',
            }}>
              30 min
            </div>
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000', borderRadius: 22, overflow: 'hidden' }}>
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
            title="MathBac.AI — Présentation complète"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [sloganIndex, setSloganIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Rotation des slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % SLOGANS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Intersection Observer pour animations au scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((x) => {
        if (x.isIntersecting) x.target.classList.add('revealed')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal-scroll').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Session check (conservé de votre code original)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return
      const user = session.user
      if (user.email === 'bensghaiermejdi70@gmail.com') return
      const localId = localStorage.getItem('mathbac_session_id')
      if (!localId) return
      const { data: prof } = await supabase
        .from('profiles')
        .select('current_session_id, is_active')
        .eq('id', user.id)
        .single()
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
      <main style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>

        {/* ═══════════════════════════════════════════════════════ HERO SECTION */}
        <section style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: '100px clamp(20px, 5vw, 60px) 60px',
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(79,110,247,0.03) 0%, transparent 50%)',
        }}>
          {/* Orbes décoratifs */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: '5%', left: '10%',
              width: 500, height: 500,
              background: 'radial-gradient(circle, rgba(79,110,247,0.12) 0%, transparent 60%)',
              filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute', top: '30%', right: '5%',
              width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)',
              filter: 'blur(50px)', animation: 'float 10s ease-in-out infinite 2s',
            }} />
            <div style={{
              position: 'absolute', bottom: '10%', left: '30%',
              width: 600, height: 300,
              background: 'radial-gradient(ellipse, rgba(6,214,160,0.06) 0%, transparent 70%)',
              filter: 'blur(60px)', animation: 'float 12s ease-in-out infinite 4s',
            }} />
          </div>

          <div style={{
            maxWidth: 900, position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease',
          }}>

            {/* Badge bilingue animé */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100, padding: '8px 20px', fontSize: 12, color: 'var(--text2)',
              marginBottom: 32,
              animation: 'fadeInDown 0.8s ease both',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: '#10b981',
                display: 'inline-block', animation: 'pulse 2s ease infinite',
              }} />
              <span style={{ color: '#60a5fa', fontWeight: 700 }}>🇫🇷 Bac France</span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span style={{ color: '#4f6ef7', fontWeight: 700 }}>🇹🇳 Bac Tunisie</span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span>IA Pédagogique</span>
            </div>

            {/* Slogan rotatif */}
            <div style={{
              height: 28, marginBottom: 24, overflow: 'hidden',
              animation: 'fadeInDown 0.8s ease 0.2s both',
            }}>
              <div style={{
                transition: 'transform 0.6s ease, opacity 0.6s ease',
                transform: `translateY(-${sloganIndex * 28}px)`,
              }}>
                {SLOGANS.map((s, i) => (
                  <div key={i} style={{
                    height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 600, color: 'var(--accent)',
                    letterSpacing: '0.02em',
                  }}>
                    ✨ {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Titre principal */}
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(20px, 3vw, 38px)', lineHeight: 1.1,
              letterSpacing: '-0.03em', marginBottom: 24,
              animation: 'fadeInUp 0.8s ease 0.3s both',
            }}>
              <span style={{ display: 'block', marginBottom: 10, color: 'rgba(255,255,255,0.95)' }}>
                Ton professeur IA personnel
              </span>
              <span style={{
                background: 'linear-gradient(90deg, #4f6ef7, #7c3aed, #ec4899)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                pour réussir ton Bac
              </span>
            </h1>

            {/* Chips matières */}
            <div style={{
              display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap',
              marginBottom: 32,
              animation: 'fadeInUp 0.8s ease 0.4s both',
            }}>
              {[
                { icon: '🧮', label: 'Mathématiques', color: '#4f6ef7' },
                { icon: '⚗️', label: 'Physique-Chimie', color: '#06d6a0' },
                { icon: '🧬', label: 'SVT', color: '#10b981' },
                { icon: '🇬🇧', label: 'Anglais', color: '#f59e0b' },
                { icon: '💻', label: 'Informatique', color: '#8b5cf6' },
                { icon: '📚', label: 'Français', color: '#a78bfa' },
              ].map((m) => (
                <span key={m.label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', borderRadius: 100,
                  background: `${m.color}15`, border: `1.5px solid ${m.color}40`,
                  color: m.color, fontSize: 13, fontWeight: 700,
                  transition: 'all 0.2s', cursor: 'default',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${m.color}25`
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${m.color}15`
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <span style={{ fontSize: 16 }}>{m.icon}</span>
                  <span>{m.label}</span>
                </span>
              ))}
            </div>

            {/* Sous-titre */}
            <p style={{
              fontSize: 'clamp(14px, 1.6vw, 17px)', color: 'var(--muted)',
              maxWidth: 620, margin: '0 auto 40px', fontWeight: 400, lineHeight: 1.8,
              animation: 'fadeInUp 0.8s ease 0.5s both',
            }}>
              Le <strong style={{ color: '#4f6ef7' }}>premier site éducatif</strong> qui utilise l'intelligence artificielle
              conçu pour les élèves du Bac. Simulation d'examens, solveur étape par étape,
              chat professeur IA, Bac Blanc national et remédiation personnalisée.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap',
              marginBottom: 60,
              animation: 'fadeInUp 0.8s ease 0.6s both',
            }}>
              <Link href="/bac" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #4f6ef7, #7c3aed)',
                color: 'white', padding: '16px 32px', borderRadius: 14,
                fontWeight: 800, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(79,110,247,0.45)',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(79,110,247,0.55)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,110,247,0.45)'
                }}
              >
                🇹🇳 Programme Tunisie
              </Link>

              <Link href="/bac-france" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #2563eb, #4f6ef7)',
                color: 'white', padding: '16px 32px', borderRadius: 14,
                fontWeight: 800, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(37,99,235,0.4)',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                }}
              >
                🇫🇷 Programme France
              </Link>

              <Link href="/chat" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(6,214,160,0.12)', border: '1px solid rgba(6,214,160,0.35)',
                color: '#06d6a0', padding: '16px 32px', borderRadius: 14,
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(6,214,160,0.2)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(6,214,160,0.12)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                💬 Chat Professeur IA
              </Link>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'clamp(24px, 5vw, 56px)', flexWrap: 'wrap',
              animation: 'fadeInUp 0.8s ease 0.7s both',
            }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1,
                    background: 'linear-gradient(135deg, var(--text), var(--accent))',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{s.n}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', marginTop: 4 }}>{s.l}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{s.s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
            animation: 'bounce 2s ease infinite',
          }}>
            <div style={{
              width: 24, height: 40, borderRadius: 12,
              border: '2px solid rgba(255,255,255,0.2)',
              display: 'flex', justifyContent: 'center', paddingTop: 8,
            }}>
              <div style={{
                width: 4, height: 8, borderRadius: 2,
                background: 'var(--accent)', animation: 'scrollDown 2s ease infinite',
              }} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ SECTION PHOTOS LYCÉENS */}
        <section className="reveal-scroll" style={{
          padding: 'clamp(60px, 10vh, 100px) clamp(20px, 5vw, 60px)',
          position: 'relative',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="label">Ils l'ont fait, toi aussi !</span>
              <h2 style={{
                fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 900,
                lineHeight: 1.2, marginBottom: 14,
              }}>
                La réussite commence par{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #4f6ef7, #ec4899)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  la bonne méthode
                </span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
                Des milliers d'élèves utilisent déjà MathBac.AI pour réviser, s'entraîner et réussir leur Bac avec confiance.
              </p>
            </div>

            {/* Grille photos */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
            }}>
              {/* Photo 1 - Groupe qui célèbre */}
              <div style={{
                gridColumn: 'span 2', gridRow: 'span 2',
                borderRadius: 20, overflow: 'hidden', position: 'relative',
                minHeight: 320,
              }}>
                <img
                  src="https://kimi-web-img.moonshot.cn/img/images.stockcake.com/df2c2fd8e28569ed8d00ea18b7c730c2aaf02de6.jpg"
                  alt="Lycéens célébrant leur réussite"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,26,0.85) 0%, transparent 50%)',
                }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                  <div style={{
                    fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 6,
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  }}>
                    🎓 "On a tous réussi grâce à MathBac !"
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                    Lycée Pilote — Tunis
                  </div>
                </div>
              </div>

              {/* Photo 2 - Étudiant sur laptop */}
              <div style={{
                borderRadius: 16, overflow: 'hidden', position: 'relative',
                minHeight: 150,
              }}>
                <img
                  src="https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/e7870f0d24befed440beba7e6d9a0886bef6e150.jpg"
                  alt="Élève étudiant avec IA"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,26,0.7) 0%, transparent 60%)',
                }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>💻 "Le solveur m'a tout expliqué"</div>
                </div>
              </div>

              {/* Photo 3 - High five */}
              <div style={{
                borderRadius: 16, overflow: 'hidden', position: 'relative',
                minHeight: 150,
              }}>
                <img
                  src="https://kimi-web-img.moonshot.cn/img/photos.peopleimages.com/21225217fd75244e859ecde66782c379bbe80c17.jpg"
                  alt="Élèves motivés"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,26,0.7) 0%, transparent 60%)',
                }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>🙌 "Ensemble on y arrive"</div>
                </div>
              </div>

              {/* Photo 4 - Salle informatique */}
              <div style={{
                borderRadius: 16, overflow: 'hidden', position: 'relative',
                minHeight: 150,
              }}>
                <img
                  src="https://kimi-web-img.moonshot.cn/img/www.aver.com/4dde66837190d1cae0a697d7094eaf3c2b9ca95a.jpg"
                  alt="Classe moderne avec ordinateurs"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,26,0.7) 0%, transparent 60%)',
                }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>🏫 "Classe moderne & connectée"</div>
                </div>
              </div>

              {/* Photo 5 - Diplômés */}
              <div style={{
                borderRadius: 16, overflow: 'hidden', position: 'relative',
                minHeight: 150,
              }}>
                <img
                  src="https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/7365eb114657085b0dde3f2af0987e6df1a3d23e.jpg"
                  alt="Diplômés heureux"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,26,0.7) 0%, transparent 60%)',
                }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>🎉 "Bac 2026, on l'a eu !"</div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════ VIDÉO DÉMO */}
        <section className="reveal-scroll" style={{
          padding: 'clamp(60px, 10vh, 100px) clamp(20px, 5vw, 60px)',
          position: 'relative',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="label">Voir en action</span>
              <h2 style={{
                fontSize: 'clamp(22px, 3.5vw, 40px)', fontWeight: 900,
                lineHeight: 1.2, marginBottom: 14,
              }}>
                Comment ça marche ?
              </h2>
              <p style={{ maxWidth: 500, margin: '0 auto', color: 'var(--text2)', fontSize: 14, lineHeight: 1.65 }}>
                Simulation Bac · Correction IA · Bac Blanc national · Programme personnalisé — tout en un.
              </p>
            </div>
            <VideoPlayer />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ 2 PROGRAMMES */}
        <section className="reveal-scroll" style={{
          padding: 'clamp(40px, 8vh, 80px) clamp(20px, 5vw, 60px)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="label">Deux pays · Un seul objectif</span>
              <h2 style={{
                fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 900,
                lineHeight: 1.15, marginBottom: 14,
              }}>
                Tunisie <span style={{ color: 'rgba(255,255,255,0.15)' }}>&</span> France
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                Le même niveau d'excellence, adapté à chaque programme officiel.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Tunisie */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(79,110,247,0.08), rgba(79,110,247,0.02))',
                border: '1px solid rgba(79,110,247,0.2)', borderRadius: 24,
                padding: '32px 36px', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -60, right: -60,
                  width: 200, height: 200,
                  background: 'radial-gradient(circle, rgba(79,110,247,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <span style={{ fontSize: 44 }}>🇹🇳</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#4f6ef7', marginBottom: 3 }}>
                      Programme CNP 2026
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Bac Tunisie</h3>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 18 }}>
                  Toutes matières · Toutes sections — cours, examens officiels, simulations IA et Bac Blanc.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {SECTIONS_TN.map((s) => (
                    <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '6px 12px', borderRadius: 100,
                        background: `${s.couleur}14`, border: `1px solid ${s.couleur}30`,
                        color: s.couleur, fontSize: 12, fontWeight: 600,
                        transition: 'all 0.2s', cursor: 'pointer',
                      }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${s.couleur}28`
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${s.couleur}14`
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        <span style={{ fontSize: 14 }}>{s.icon}</span> {s.titre}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link href="/bac" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, #4f6ef7, #7c3aed)',
                  color: 'white', padding: '11px 22px', borderRadius: 12,
                  fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(79,110,247,0.35)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Explorer le programme →
                </Link>
              </div>

              {/* France */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(59,130,246,0.08), rgba(59,130,246,0.02))',
                border: '1px solid rgba(59,130,246,0.2)', borderRadius: 24,
                padding: '32px 36px', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -60, right: -60,
                  width: 200, height: 200,
                  background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <span style={{ fontSize: 44 }}>🇫🇷</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#60a5fa', marginBottom: 3 }}>
                      Éducation Nationale
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Bac France</h3>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 18 }}>
                  Toutes filières — cours, examens officiels, simulations IA et Bac Blanc.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {SECTIONS_FR.map((s) => (
                    <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '6px 12px', borderRadius: 100,
                        background: `${s.couleur}14`, border: `1px solid ${s.couleur}30`,
                        color: s.couleur, fontSize: 12, fontWeight: 600,
                        transition: 'all 0.2s', cursor: 'pointer',
                      }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${s.couleur}28`
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${s.couleur}14`
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        <span style={{ fontSize: 14 }}>{s.icon}</span> {s.titre}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link href="/bac-france" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, #2563eb, #4f6ef7)',
                  color: 'white', padding: '11px 22px', borderRadius: 12,
                  fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(37,99,235,0.35)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Explorer le programme →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ 6 FEATURES AVEC IMAGES */}
        <section className="reveal-scroll" style={{
          padding: 'clamp(40px, 8vh, 80px) clamp(20px, 5vw, 60px)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="label">5 super-pouvoirs IA</span>
              <h2 style={{
                fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 900,
                lineHeight: 1.2, marginBottom: 14,
              }}>
                Plus qu'une calculatrice —<br />
                <span style={{
                  background: 'linear-gradient(90deg, #4f6ef7, #7c3aed)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  un vrai professeur IA
                </span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                Chaque outil est conçu pour un objectif précis : comprendre, s'entraîner, progresser et réussir.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {FEATURES.map((f, i) => <FeatureCard key={i} f={f} i={i} />)}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ BAC BLANC */}
        <section className="reveal-scroll" style={{
          padding: 'clamp(30px, 6vh, 60px) clamp(20px, 5vw, 60px)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(249,115,22,0.04))',
              border: '1px solid rgba(245,158,11,0.25)', borderRadius: 24,
              padding: '36px 44px', display: 'flex', alignItems: 'center',
              gap: 36, flexWrap: 'wrap', position: 'relative', overflow: 'hidden',
            }}>
              <div aria-hidden style={{
                position: 'absolute', top: -50, right: -50,
                width: 220, height: 220,
                background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }} />
              <div style={{ fontSize: 56, filter: 'drop-shadow(0 4px 12px rgba(245,158,11,0.3))' }}>🏆</div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{
                  fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.12em', color: '#fbbf24', marginBottom: 8,
                }}>
                  Concours National · 1er Mai – 30 Juin
                </div>
                <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, marginBottom: 10 }}>
                  Bac Blanc IA — Tunisie & France
                </h2>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 480 }}>
                  Un vrai concours <strong>quotidien</strong> avec chrono, correction IA détaillée,
                  classement national et analyse complète des faiblesses.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
                <Link href="/bac-blanc" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  color: '#0a0a1a', padding: '12px 24px', borderRadius: 12,
                  fontWeight: 800, fontSize: 14, textDecoration: 'none',
                  boxShadow: '0 6px 22px rgba(245,158,11,0.35)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  🇹🇳 Bac Blanc Tunisie →
                </Link>
                <Link href="/bac-blanc-france" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
                  color: '#fbbf24', padding: '12px 24px', borderRadius: 12,
                  fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(245,158,11,0.15)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(245,158,11,0.08)' }}
                >
                  🇫🇷 Bac Blanc France →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ CTA FINAL */}
        <section style={{
          textAlign: 'center',
          padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 60px)',
          position: 'relative',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700, height: 400,
            background: 'radial-gradient(ellipse, rgba(79,110,247,0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          <div className="reveal-scroll" style={{ position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.25)',
              borderRadius: 100, padding: '6px 16px', fontSize: 12,
              color: '#06d6a0', marginBottom: 26,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: '#06d6a0',
                display: 'inline-block', animation: 'pulse 2s ease infinite',
              }} />
              Prêt pour réussir ton Bac ?
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(24px, 3.5vw, 42px)', lineHeight: 1.1,
              letterSpacing: '-0.02em', marginBottom: 20,
            }}>
              Commence aujourd'hui.<br />
              <span style={{
                background: 'linear-gradient(90deg, #4f6ef7, #7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Réussis ton Bac.
              </span>
            </h2>
            <p style={{
              fontSize: 17, color: 'var(--text2)', maxWidth: 520,
              margin: '0 auto 44px', lineHeight: 1.75, fontWeight: 300,
            }}>
              Le premier site éducatif avec IA pour le{' '}
              <span style={{ color: '#4f6ef7', fontWeight: 600 }}>Bac Tunisie</span> et le{' '}
              <span style={{ color: '#60a5fa', fontWeight: 600 }}>Bac France</span>.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/bac" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #4f6ef7, #7c3aed)',
                color: 'white', padding: '16px 32px', borderRadius: 14,
                fontWeight: 800, fontSize: 16, textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(79,110,247,0.5)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 14px 40px rgba(79,110,247,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,110,247,0.5)'
                }}
              >
                🇹🇳 Programme Tunisie →
              </Link>
              <Link href="/bac-france" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #2563eb, #4f6ef7)',
                color: 'white', padding: '16px 32px', borderRadius: 14,
                fontWeight: 800, fontSize: 16, textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(37,99,235,0.45)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)' }}
              >
                🇫🇷 Programme France →
              </Link>
              <Link href="/solve" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--text)', padding: '16px 32px', borderRadius: 14,
                fontWeight: 700, fontSize: 16, textDecoration: 'none',
                transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              >
                🧮 Solveur IA
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ CONTACT */}
        <section id="contact" style={{
          padding: 'clamp(50px, 8vh, 80px) clamp(20px, 5vw, 60px)',
          position: 'relative',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, height: 300,
            background: 'radial-gradient(ellipse, rgba(79,110,247,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} />
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(79,110,247,0.08)', border: '1px solid rgba(79,110,247,0.2)',
              borderRadius: 100, padding: '6px 16px', fontSize: 12,
              color: '#818cf8', marginBottom: 24,
            }}>
              📬 Contactez-nous
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(22px, 3vw, 34px)', marginBottom: 12, letterSpacing: '-0.02em',
            }}>
              Une question ? On vous répond.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 36, lineHeight: 1.7 }}>
              Support pédagogique, abonnements, partenariats —<br />
              disponible 7j/7 via WhatsApp ou email.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 16, maxWidth: 560, margin: '0 auto',
            }}>
              {/* WhatsApp */}
              <a href="https://wa.me/21699268970" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  padding: '28px 20px', borderRadius: 18,
                  background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.2)',
                  textDecoration: 'none', transition: 'all 0.25s', cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(37,211,102,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(37,211,102,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(37,211,102,0.2)'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(37,211,102,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                }}>
                  💬
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#25d366', marginBottom: 4 }}>
                    WhatsApp
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>
                    +216 99 268 970
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(37,211,102,0.7)', fontWeight: 600 }}>
                  Réponse rapide →
                </div>
              </a>

              {/* Email */}
              <a href="mailto:bensghaiermejdi70@gmail.com"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  padding: '28px 20px', borderRadius: 18,
                  background: 'rgba(79,110,247,0.06)', border: '1px solid rgba(79,110,247,0.18)',
                  textDecoration: 'none', transition: 'all 0.25s', cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(79,110,247,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(79,110,247,0.4)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(79,110,247,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(79,110,247,0.18)'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(79,110,247,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                }}>
                  ✉️
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#818cf8', marginBottom: 4 }}>
                    Email
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>
                    bensghaiermejdi70@gmail.com
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(79,110,247,0.7)', fontWeight: 600 }}>
                  Réponse sous 24h →
                </div>
              </a>
            </div>

            <div style={{
              marginTop: 24, padding: '12px 24px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 13, color: 'var(--muted)',
            }}>
              <span>🕐</span>
              <span>
                Disponible <strong style={{ color: 'var(--text)' }}>7j/7</strong> ·
                Réponse WhatsApp en moins de <strong style={{ color: 'var(--text)' }}>2h</strong>
              </span>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      {/* ═══════════════════════════════════════════════════════ STYLES CSS */}
      <style suppressHydrationWarning>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes scrollDown {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(12px); }
        }
        
        .reveal-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-scroll.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(79,110,247,0.08);
          border: 1px solid rgba(79,110,247,0.2);
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 11px;
          font-weight: 700;
          color: #818cf8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }
        
        @media (max-width: 900px) {
          .reveal-scroll + section > div > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .reveal-scroll + section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        
        @media (max-width: 640px) {
          .reveal-scroll + section > div > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}