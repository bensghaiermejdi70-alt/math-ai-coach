'use client'
import { useState } from 'react'
import { CaptureItem, MAX_CAPTURES, captureToFile } from '@/lib/captures'

// Bouton à placer à côté du bouton « Historique » existant
export function CapturesButton({ count, active, onClick }: { count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 11, border: `1px solid ${active ? 'rgba(6,214,160,0.45)' : 'rgba(255,255,255,0.1)'}`, background: active ? 'rgba(6,214,160,0.1)' : 'rgba(255,255,255,0.04)', color: active ? '#06d6a0' : 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
      📸 Historique captures
      {count > 0 && (
        <span style={{ background: '#06d6a0', color: '#0b0e1f', borderRadius: 9, minWidth: 18, height: 18, padding: '0 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900 }}>
          {count}
        </span>
      )}
    </button>
  )
}

interface PanelProps {
  items: CaptureItem[]
  loading: boolean
  error?: string
  onDelete: (item: CaptureItem) => void
  onClose: () => void
  /** Lire/transcrire l'exercice de la capture (OCR) — bouton masqué si absent */
  onRead?: (file: File) => void
  /** Joindre la capture comme figure/pièce jointe — bouton masqué si absent */
  onAttach?: (file: File) => void
  /** N'affiche que les images (ex. chat, qui n'accepte pas les PDF) */
  onlyImages?: boolean
}

function fmtDate(iso: string): string {
  try { return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) }
  catch { return '' }
}

export function CapturesPanel({ items: allItems, loading, error, onDelete, onClose, onRead, onAttach, onlyImages }: PanelProps) {
  const items = onlyImages ? allItems.filter(i => i.media_type.startsWith('image/')) : allItems
  const [busyId, setBusyId] = useState<string | null>(null)
  const [localErr, setLocalErr] = useState('')

  const pick = async (item: CaptureItem, cb?: (f: File) => void) => {
    if (!cb || busyId) return
    setBusyId(item.id); setLocalErr('')
    try { cb(await captureToFile(item)) }
    catch { setLocalErr('Impossible de récupérer ce fichier. Réessaie.') }
    setBusyId(null)
  }

  const btn = (color: string): React.CSSProperties => ({ flex: 1, fontSize: 11, fontWeight: 700, padding: '6px 4px', borderRadius: 8, border: `1px solid ${color}55`, background: `${color}14`, color, cursor: 'pointer', fontFamily: 'inherit' })

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,214,160,0.25)', borderRadius: 18, padding: 16, marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#06d6a0' }}>📸 Mes captures — {allItems.length}/{MAX_CAPTURES}</span>
        <button onClick={onClose} aria-label="Fermer" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}>✕</button>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 12, lineHeight: 1.5 }}>
        Photos et fichiers importés depuis ton téléphone ou ton PC, disponibles sur tous tes appareils. Les {MAX_CAPTURES} plus récents sont conservés.
      </div>

      {(error || localErr) && (
        <div style={{ fontSize: 12, color: '#fca5a5', background: 'rgba(239,68,68,0.08)', padding: '6px 10px', borderRadius: 8, marginBottom: 10 }}>⚠️ {localErr || error}</div>
      )}

      {loading && items.length === 0 && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', padding: '12px 0' }}>Chargement…</div>}
      {!loading && items.length === 0 && !error && (
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', padding: '12px 0' }}>
          Aucune capture pour l&apos;instant. Prends une photo ou joins un fichier : il apparaîtra ici sur tous tes appareils.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
        {items.map(item => (
          <div key={item.id} style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 8, display: 'flex', flexDirection: 'column', gap: 6, opacity: busyId === item.id ? 0.6 : 1 }}>
            <div style={{ position: 'relative', height: 92, borderRadius: 8, overflow: 'hidden', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.media_type === 'application/pdf' || !item.url
                ? <span style={{ fontSize: 30 }}>{item.media_type === 'application/pdf' ? '📄' : '🖼️'}</span>
                // eslint-disable-next-line @next/next/no-img-element
                : <img src={item.url} alt={item.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              <button onClick={() => { if (window.confirm('Supprimer cette capture ?')) onDelete(item) }} title="Supprimer"
                style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.65)', color: '#fca5a5', cursor: 'pointer', fontSize: 12, fontWeight: 700, lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.name}>{item.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{fmtDate(item.created_at)}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {onRead && <button onClick={() => pick(item, onRead)} disabled={!!busyId} style={btn('#06d6a0')}>📝 Lire</button>}
              {onAttach && <button onClick={() => pick(item, onAttach)} disabled={!!busyId} style={btn('#a5b4fc')}>📎 Joindre</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}