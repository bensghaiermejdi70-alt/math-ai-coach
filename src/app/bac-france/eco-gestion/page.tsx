'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ══════════════════════════════════════════════════════════════════════
// ÉCONOMIE & GESTION FRANCE — Page index
// Route : /bac-france/eco-gestion
// SES (voie générale) + STMG (voie technologique)
// ══════════════════════════════════════════════════════════════════════

const SECTIONS = [
  {
    slug: 'seconde',
    icon: '📘',
    titre: 'Seconde Générale & Technologique',
    niveau: 'Lycée · Classe de Seconde · SES (tronc commun)',
    annee: '2026–2027',
    couleur: '#10b981',
    gradient: 'linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.07))',
    border: 'rgba(16,185,129,0.3)',
    badgeColor: '#34d399',
    badge: 'Enseignement commun · 1h30/semaine',
    sections: [
      { label: '💰 Création & mesure des richesses', items: ['Production','Entreprise','Valeur ajoutée','PIB','Croissance','Productivité'] },
      { label: '📈 Marché & prix',                   items: ['Offre','Demande','Prix d\'équilibre','Marché concurrentiel','Agents économiques'] },
      { label: '👥 Socialisation & vie sociale',     items: ['Normes','Valeurs','Famille','École','Groupe social'] },
      { label: '🏛️ Politique, diplôme & emploi',     items: ['Démocratie','Citoyenneté','Vote','Qualification','Emploi','Salaire','Chômage'] },
    ],
    nbCh: 5, nbFormules: 40, nbEx: 50,
  },
  {
    slug: 'premiere',
    icon: '📗',
    titre: 'Première Générale — Spécialité SES',
    niveau: 'Lycée · Classe de Première',
    annee: '2026–2027',
    couleur: '#4f6ef7',
    gradient: 'linear-gradient(135deg,rgba(79,110,247,0.14),rgba(124,58,237,0.07))',
    border: 'rgba(79,110,247,0.3)',
    badgeColor: '#818cf8',
    badge: 'Spécialité · 4h/semaine',
    sections: [
      { label: '💰 Économie',          items: ['Marché concurrentiel','Défaillances du marché','Financement de l\'économie','Monnaie','Création monétaire'] },
      { label: '👥 Sociologie',        items: ['Socialisation','Liens sociaux','Déviance & contrôle social'] },
      { label: '🏛️ Science politique', items: ['Opinion publique','Comportements électoraux','Vote'] },
      { label: '🛡️ Regards croisés',   items: ['Protection sociale','Risques sociaux','Assurance & solidarité'] },
    ],
    nbCh: 9, nbFormules: 70, nbEx: 85,
  },
  {
    slug: 'terminale',
    icon: '🎓',
    titre: 'Terminale Générale — Spécialité SES',
    niveau: 'Lycée · Classe de Terminale · Année du Bac',
    annee: '2027 (Bac)',
    couleur: '#f59e0b',
    gradient: 'linear-gradient(135deg,rgba(245,158,11,0.14),rgba(249,115,22,0.07))',
    border: 'rgba(245,158,11,0.3)',
    badgeColor: '#fbbf24',
    badge: 'Bac 2027 · Coef. 16',
    sections: [
      { label: '💰 Économie',          items: ['Sources de la croissance','Commerce international','Chômage & emploi','Crises financières','Politiques européennes'] },
      { label: '👥 Sociologie',        items: ['Structure sociale','École & mobilité sociale','Mutations du travail'] },
      { label: '🏛️ Science politique', items: ['Engagement politique','Vote','Syndicats & associations'] },
      { label: '⚖️ Justice sociale',   items: ['Égalité & équité','Redistribution','Inégalités','Discrimination'] },
    ],
    nbCh: 10, nbFormules: 85, nbEx: 95,
    isBac: true,
  },
  {
    slug: 'stmg',
    icon: '🏢',
    titre: 'STMG — Première & Terminale',
    niveau: 'Voie Technologique · Management & Gestion',
    annee: '2026–2027',
    couleur: '#8b5cf6',
    gradient: 'linear-gradient(135deg,rgba(139,92,246,0.14),rgba(99,102,241,0.07))',
    border: 'rgba(139,92,246,0.3)',
    badgeColor: '#a78bfa',
    badge: 'Équivalent le plus proche · Éco-Gestion TN',
    sections: [
      { label: '🏢 Management',                    items: ['Organisation','Entreprise','Décision','Stratégie','Performance'] },
      { label: '💻 Sciences de gestion & numérique', items: ['Système d\'information','Bases de données','Communication numérique','Transformation numérique'] },
      { label: '⚖️ Droit',                         items: ['Personne juridique','Contrat','Responsabilité','Droit du travail'] },
      { label: '💰 Économie & Gestion-Finance',    items: ['Marché','Croissance','Mondialisation','Comptabilité','Analyse financière','Trésorerie','Rentabilité','Financement'] },
    ],
    nbCh: 10, nbFormules: 60, nbEx: 70,
  },
]

export default function EcoGestionIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>

          {/* Fil d'Ariane */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>
            <Link href="/bac-france" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 France</Link>
            <span>›</span>
            <span style={{ color: '#2dd4bf' }}>Économie & Gestion</span>
          </div>

          {/* HEADER */}
          <div style={{ marginBottom: 40 }}>
            <span className="label" style={{ marginBottom: 12, display: 'inline-block' }}>📊 Programme Officiel MEN · SES & STMG</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 14 }}>
              Économie & Gestion France<br />
              <span style={{ background: 'linear-gradient(90deg,#14b8a6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Seconde · Première · Terminale · STMG
              </span>
            </h1>
            <p style={{ maxWidth: 640, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Programmes officiels Éducation Nationale · Sciences Économiques et Sociales (voie générale)
              et Sciences et Technologies du Management et de la Gestion (voie technologique).
              Cours, notions, exercices corrigés et IA professeur.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
              <span>📊 4 voies</span><span>·</span>
              <span>📚 34 chapitres</span><span>·</span>
              <span>📈 255+ notions</span><span>·</span>
              <span>📝 300+ exercices</span>
            </div>
          </div>

          {/* BADGE NOUVEAUTÉS */}
          <div style={{ background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(20,184,166,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 40, display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 20 }}>🆕</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#2dd4bf', marginBottom: 6 }}>Programme en vigueur — Bac 2026/2027</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Terminale 2027 : Spécialité SES · Coef. 16',
                  'STMG : épreuve de spécialité Gestion-Finance / Mercatique / RHC',
                  'Grand Oral · Coef. 8',
                  'Épreuve anticipée de Première',
                ].map(n => (
                  <span key={n} style={{ fontSize: 11, background: 'rgba(20,184,166,0.1)', color: '#2dd4bf', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(20,184,166,0.22)' }}>
                    🟢 {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SECTIONS.map(s => (
              <Link key={s.slug} href={`/bac-france/eco-gestion/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: s.gradient, border: `1px solid ${(s as any).isBac ? s.couleur+'80' : s.border}`, borderRadius: 20, padding: '24px 28px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
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
                          {(s as any).isBac && <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(245,158,11,0.25)', color: '#fbbf24', fontWeight: 800 }}>⭐ BAC</span>}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{s.niveau} · {s.annee}</div>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12 }}>
                          <span style={{ color: s.couleur, fontWeight: 600 }}>📚 {s.nbCh} chapitres</span>
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ color: 'var(--muted)' }}>📈 {s.nbFormules}+ notions</span>
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

          {/* CTA */}
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg,rgba(20,184,166,0.1),rgba(6,182,212,0.06))', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 18, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>🤖 IA · Économie & Gestion France</div>
              <h3 style={{ fontSize: 17, marginBottom: 4 }}>Dissertations, EC & études de documents</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>Solveur étape par étape · Chat professeur · Simulation Bac</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/solve" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>🧮 Solveur IA</Link>
              <Link href="/chat" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>🤖 Chat Prof IA</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}