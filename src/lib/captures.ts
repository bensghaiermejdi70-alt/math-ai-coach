// ════════════════════════════════════════════════════════════════════
// HISTORIQUE CAPTURES — 20 dernières captures/fichiers par compte élève
// Stockage : bucket privé Supabase `user-captures` + table `user_captures`
// Rotation (21e → supprime la 1re) : trigger SQL `trg_trim_user_captures`
// Prérequis : exécuter supabase-captures.sql une fois
// ════════════════════════════════════════════════════════════════════
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export const MAX_CAPTURES = 20
const BUCKET = 'user-captures'
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024 // doit rester aligné sur le bucket SQL

export interface CaptureItem {
  id: string
  path: string
  name: string
  media_type: string
  size_bytes: number
  created_at: string
  url?: string // URL signée (1 h), régénérée à chaque refresh
}

const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'application/pdf': 'pdf',
}

const TYPE_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  pdf: 'application/pdf', heic: 'image/heic', heif: 'image/heif',
}

// Certaines caméras mobiles donnent un type vide ou HEIC : on le déduit de l'extension
function guessType(file: File): string {
  if (file.type) return file.type.toLowerCase()
  const ext = (file.name.split('.').pop() || '').toLowerCase()
  return TYPE_BY_EXT[ext] || ''
}

async function loadDrawable(file: File): Promise<{ src: CanvasImageSource; w: number; h: number; close: () => void }> {
  try {
    const bmp = await createImageBitmap(file)
    return { src: bmp, w: bmp.width, h: bmp.height, close: () => bmp.close?.() }
  } catch {
    const url = URL.createObjectURL(file)
    try {
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('decode')); i.src = url
      })
      return { src: img, w: img.naturalWidth, h: img.naturalHeight, close: () => URL.revokeObjectURL(url) }
    } catch (e) { URL.revokeObjectURL(url); throw e }
  }
}

// Réduit les photos de téléphone (4-10 Mo) → ~300-600 Ko et convertit HEIC/inconnu → JPEG
async function compressImage(file: File): Promise<File> {
  const t = guessType(file)
  if (t === 'application/pdf' || t === 'image/gif') return file
  try {
    const d = await loadDrawable(file)
    const MAX_SIDE = 1600
    const scale = Math.min(1, MAX_SIDE / Math.max(d.w, d.h))
    const w = Math.max(1, Math.round(d.w * scale))
    const h = Math.max(1, Math.round(d.h * scale))
    const canvas = document.createElement('canvas')
    canvas.width = w; canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) { d.close(); return file }
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h) // PNG transparent → fond blanc
    ctx.drawImage(d.src, 0, 0, w, h)
    d.close()
    const blob = await new Promise<Blob | null>(r => canvas.toBlob(r, 'image/jpeg', 0.8))
    if (!blob) return file
    if (scale === 1 && blob.size >= file.size && EXT_BY_TYPE[t]) return file
    const base = (file.name || 'capture').replace(/\.[^.]+$/, '')
    return new File([blob], base + '.jpg', { type: 'image/jpeg' })
  } catch {
    return file
  }
}

function ensureExt(name: string, ext: string): string {
  const n = (name || 'capture').trim() || 'capture'
  return /\.[a-z0-9]{2,4}$/i.test(n) ? n : `${n}.${ext}`
}

export async function saveCapture(userId: string, file: File): Promise<CaptureItem> {
  const supabase = createClient()
  let f = await compressImage(file)
  const type = EXT_BY_TYPE[f.type] ? f.type : guessType(f)
  const ext = EXT_BY_TYPE[type]
  if (!ext) throw new Error('Format non pris en charge')
  if (f.type !== type) f = new File([f], f.name, { type })
  if (f.size > MAX_UPLOAD_BYTES) throw new Error('Fichier trop lourd (max 10 Mo)')

  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const up = await supabase.storage.from(BUCKET).upload(path, f, { contentType: f.type, upsert: false })
  if (up.error) throw up.error

  const { data, error } = await supabase
    .from('user_captures')
    .insert({ user_id: userId, path, name: ensureExt(f.name, ext), media_type: f.type, size_bytes: f.size })
    .select('id,path,name,media_type,size_bytes,created_at')
    .single()
  if (error || !data) {
    await supabase.storage.from(BUCKET).remove([path]).catch(() => {})
    throw error || new Error('Enregistrement impossible')
  }
  return data as CaptureItem
}

export async function listCaptures(): Promise<CaptureItem[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('user_captures')
    .select('id,path,name,media_type,size_bytes,created_at')
    .order('created_at', { ascending: false })
    .limit(MAX_CAPTURES)
  if (error) throw error
  const rows = (data || []) as CaptureItem[]
  if (!rows.length) return []
  const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrls(rows.map(r => r.path), 3600)
  const urlByPath = new Map<string, string>()
  ;(signed || []).forEach((s: any) => { if (s?.path && s?.signedUrl) urlByPath.set(s.path, s.signedUrl) })
  return rows.map(r => ({ ...r, url: urlByPath.get(r.path) }))
}

export async function deleteCapture(item: CaptureItem): Promise<void> {
  const supabase = createClient()
  await supabase.storage.from(BUCKET).remove([item.path]).catch(() => {})
  const { error } = await supabase.from('user_captures').delete().eq('id', item.id)
  if (error) throw error
}

// Récupère le fichier d'une capture sous forme de File (pour OCR / pièce jointe)
export async function captureToFile(item: CaptureItem): Promise<File> {
  let url = item.url
  if (!url) {
    const { data } = await createClient().storage.from(BUCKET).createSignedUrl(item.path, 300)
    url = data?.signedUrl
  }
  if (!url) throw new Error('Lien du fichier indisponible')
  const res = await fetch(url)
  if (!res.ok) throw new Error('Téléchargement impossible')
  const blob = await res.blob()
  return new File([blob], item.name, { type: item.media_type })
}

// ── Hook ────────────────────────────────────────────────────────────
export function useCaptures(userId?: string | null) {
  const [items, setItems] = useState<CaptureItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    if (!userId) { setItems([]); return }
    setLoading(true)
    try { setItems(await listCaptures()); setError('') }
    catch { setError('Impossible de charger les captures.') }
    setLoading(false)
  }, [userId])

  useEffect(() => { refresh() }, [refresh])

  // Le PC retrouve ce qui a été ajouté depuis le téléphone dès qu'on revient sur l'onglet
  useEffect(() => {
    const onFocus = () => { refresh() }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [refresh])

  const add = useCallback(async (file: File) => {
    if (!userId) return null
    try {
      const it = await saveCapture(userId, file)
      await refresh() // le trigger SQL a déjà retiré la plus ancienne si > 20
      return it
    } catch (e: any) {
      console.warn('[captures] sauvegarde impossible', e?.message || e)
      setError("La capture n'a pas pu être sauvegardée dans l'historique.")
      return null
    }
  }, [userId, refresh])

  const remove = useCallback(async (item: CaptureItem) => {
    setItems(prev => prev.filter(i => i.id !== item.id))
    try { await deleteCapture(item) } catch { refresh() }
  }, [refresh])

  return { items, loading, error, add, remove, refresh }
}