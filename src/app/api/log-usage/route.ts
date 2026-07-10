// src/app/api/log-usage/route.ts
// Route Next.js légère — logge un événement dans usage_logs (fire-and-forget)
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!   // service role pour bypass RLS en écriture
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user_id, event_type, platform, matiere, section, mode, difficulty, metadata } = body

    if (!event_type || !platform) {
      return NextResponse.json({ ok: false, error: 'missing fields' }, { status: 400 })
    }

    await supabase.from('usage_logs').insert({
      user_id:    user_id    ?? null,
      event_type: event_type,
      platform:   platform,
      matiere:    matiere    ?? null,
      section:    section    ?? null,
      mode:       mode       ?? null,
      difficulty: difficulty ?? null,
      metadata:   metadata   ?? null,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    // Silencieux — ne jamais bloquer l'UX pour un log
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}