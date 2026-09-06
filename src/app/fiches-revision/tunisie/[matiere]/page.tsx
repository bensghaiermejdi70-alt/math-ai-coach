'use client'
import { useState, useRef, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ShareButton from '@/components/ShareButton'
import { getMatiere, FicheChapitre, FicheDocument } from '@/lib/fiches-data'

export default function FicheMatierePage() {
  const params = useParams<{ matiere: string }>()
  const matiere = getMatiere(params.matiere)

  const [selectedChapitre, setSelectedChapitre] = useState<FicheChapitre | null>(null)
  const [selectedDoc, setSelectedDoc] = useState<FicheDocument | null>(null)
  const printFrameRef = useRef<HTMLIFrameElement>(null)

  const pdfUrl = matiere && selectedDoc ? `/fiches/tunisie/${matiere.slug}/${selectedDoc.file}` : null

  // Regroupement par unité si présent (anglais), sinon liste plate (chimie, économie)
  const groupes = useMemo(() => {
    if (!matiere) return []
    const map = new Map<string, FicheChapitre[]>()
    matiere.chapitres.forEach(c => {
      const key = c.unite || '__flat__'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(c)
    })
    return Array.from(map.entries())
  }, [matiere])

  const selectChapitre = (c: FicheChapitre) => {
    setSelectedChapitre(c)
    setSelectedDoc(c.documents[0])
  }

  const handlePrint = () => {
    const frame = printFrameRef.current
    if (!frame || !pdfUrl) return
    frame.src = pdfUrl
    frame.onload = () => {
      try { frame.contentWindow?.print() } catch { window.open(pdfUrl, '_blank') }
    }
  }

  if (!matiere) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 140, textAlign: 'center', minHeight: '100vh' }}>
          <p style={{ color: 'var(--text2)' }}>Matière introuvable.</p>
          <Link href="/fiches-revision/tunisie" className="btn btn-secondary" style={{ marginTop: 16, display: 'inline-block' }}>← Retour</Link>
        </main>
        <Footer />
      </>
    )
  }

  if (!matiere.disponible) {
    return (
      <>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1, paddingTop: 80, minHeight: '100vh' }}>
          <div className="container" style={{ paddingTop: 100, paddingBottom: 100, maxWidth: 700, textAlign: 'center' }}>
            <div style={{ fontSize: 60, marginBottom: 20 }}>{matiere.icone}</div>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,38px)', marginBottom: 16 }}>{matiere.nom} — bientôt disponible</h1>
            <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
              Les fiches de {matiere.nom} arrivent prochainement.
            </p>
            <Link href="/fiches-revision/tunisie" className="btn btn-primary">← Voir les autres matières</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 80, minHeight: '100vh' }}>
        <div className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 1100 }}>

          <Link href="/fiches-revision/tunisie" style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }}>← Toutes les matières</Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '18px 0 36px' }}>
            <span style={{ fontSize: 40 }}>{matiere.icone}</span>
            <div>
              <h1 style={{ fontSize: 'clamp(24px,3.5vw,36px)', margin: 0 }}>{matiere.nom}</h1>
              <p style={{ color: 'var(--text2)', fontSize: 13, margin: '4px 0 0' }}>{matiere.chapitres.length} chapitres · Bac Tunisie</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: selectedChapitre ? 'minmax(240px,320px) 1fr' : '1fr', gap: 28, alignItems: 'start' }}>

            {/* ── Liste des chapitres ── */}
            <div>
              {groupes.map(([unite, chapitres]) => (
                <div key={unite} style={{ marginBottom: 22 }}>
                  {unite !== '__flat__' && (
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                      {unite}
                    </p>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {chapitres.map(c => {
                      const isActive = selectedChapitre?.numero === c.numero && selectedChapitre?.titre === c.titre
                      return (
                        <button
                          key={c.numero + c.titre}
                          onClick={() => selectChapitre(c)}
                          style={{
                            textAlign: 'left',
                            padding: '12px 14px',
                            borderRadius: 12,
                            border: '1px solid ' + (isActive ? 'var(--accent)' : 'var(--border)'),
                            background: isActive ? 'rgba(79,110,247,0.12)' : 'rgba(255,255,255,0.02)',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          <span style={{ fontSize: 12, fontWeight: 700, color: isActive ? 'var(--accent)' : 'var(--muted)' }}>Chapitre {c.numero}</span>
                          <div style={{ fontSize: 13.5, color: 'var(--text)', marginTop: 2, lineHeight: 1.4 }}>{c.titre}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Visionneuse ── */}
            {selectedChapitre && (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {selectedChapitre.documents.map(doc => (
                      <button
                        key={doc.type}
                        onClick={() => setSelectedDoc(doc)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: 20,
                          border: '1px solid ' + (selectedDoc?.type === doc.type ? 'var(--accent)' : 'var(--border)'),
                          background: selectedDoc?.type === doc.type ? 'var(--accent)' : 'transparent',
                          color: selectedDoc?.type === doc.type ? '#fff' : 'var(--text2)',
                          fontSize: 12.5, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        {doc.label}
                      </button>
                    ))}
                  </div>

                  {pdfUrl && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <a href={pdfUrl} download className="btn btn-secondary btn-sm">⬇ Télécharger</a>
                      <button onClick={handlePrint} className="btn btn-secondary btn-sm">🖨 Imprimer</button>
                      <ShareButton
                        label="Partager"
                        url={typeof window !== 'undefined' ? window.location.origin + pdfUrl : pdfUrl}
                        text={`${matiere.nom} — ${selectedChapitre.titre} — MathBacAI`}
                        className="btn btn-secondary btn-sm"
                      />
                    </div>
                  )}
                </div>

                {pdfUrl && (
                  <iframe
                    key={pdfUrl}
                    src={pdfUrl}
                    title={selectedChapitre.titre}
                    style={{ width: '100%', height: '80vh', border: '1px solid var(--border)', borderRadius: 14, background: '#fff' }}
                  />
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* iframe cachée utilisée uniquement pour déclencher l'impression native */}
      <iframe ref={printFrameRef} style={{ display: 'none' }} title="print-frame" />

      <Footer />
    </>
  )
}