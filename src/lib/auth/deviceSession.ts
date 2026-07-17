// src/lib/auth/deviceSession.ts
//
// LOGIQUE (regle metier) :
//   1) Non abonne  -> aucune restriction, sessions illimitees.
//   2) Abonne      -> 2 appareils "connus" max par type (pc / mobile), un
//      seul actif a la fois. La 1ere connexion devient l'appareil "A".
//      Une 2eme connexion depuis un autre appareil devient "B" et interrompt
//      A. Se reconnecter depuis A ou B (deja connus) reprend la main sans
//      probleme, avec le meme systeme (un seul actif). Un 3eme appareil
//      different est bloque tant qu'aucun emplacement n'est libere.
//   3) MULTI_SESSION_EMAILS -> toujours illimite (comptes admin).
//
// TOUTE la logique ci-dessus vit desormais cote base de donnees, dans 3
// fonctions RPC atomiques (voir supabase-device-sessions.sql) :
//   - claim_device_session(p_device_id, p_device_type)   -> ecriture, atomique
//   - verify_device_session(p_device_id, p_device_type)  -> lecture SEULE
//   - release_device_session(p_device_id, p_device_type) -> ecriture, au signOut
//
// Ce fichier ne fait plus que : gerer l'identifiant d'appareil stable
// (localStorage), appeler ces RPC, et deduper les appels en vol. Il ne
// lit/n'ecrit plus jamais les colonnes de session directement depuis le
// navigateur — c'etait la cause du bug "session_dupliquee" des la premiere
// connexion (deux lectures+ecritures concurrentes, sans verrou, qui se
// marchaient dessus). verifyStillValid() est desormais garanti pur / sans
// effet de bord : il ne doit JAMAIS appeler claimDeviceSlot lui-meme.

export const MULTI_SESSION_EMAILS = [
  'bensghaiermejdi70@gmail.com',
  'mourad.essghaier@hotmail.fr',
]

export type DeviceType = 'pc' | 'mobile'

/** Intervalle du polling de secours (le kick "instantane" passe par Realtime, voir AuthContext.tsx) */
export const VERIFY_INTERVAL_MS = 5000

/** Cooldown apres un kick, pour eviter une boucle de reconnexion */
export const KICK_COOLDOWN_MS = 5000

export function getDeviceType(): DeviceType {
  if (typeof navigator === 'undefined') return 'pc'
  const ua = navigator.userAgent.toLowerCase()
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(ua) ? 'mobile' : 'pc'
}

export function isMultiSessionUser(email: string | null | undefined): boolean {
  if (!email) return false
  return MULTI_SESSION_EMAILS.includes(email.toLowerCase())
}

/** UUID stable par navigateur — c'est le SEUL identifiant qu'on persiste. */
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('mathbac_device_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('mathbac_device_id', id)
  }
  return id
}

/** Conserve pour compatibilite avec le reste du code (= device_id) */
export function getSessionId(): string {
  return getOrCreateDeviceId()
}

export function wasRecentlyKicked(): boolean {
  if (typeof window === 'undefined') return false
  const kickedAt = localStorage.getItem('mathbac_kicked_at')
  if (!kickedAt) return false
  return Date.now() - parseInt(kickedAt, 10) < KICK_COOLDOWN_MS
}

export function markAsKicked(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('mathbac_kicked_at', String(Date.now()))
}

export function clearKickedFlag(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('mathbac_kicked_at')
}

/** Supprime TOUTES les donnees de session Supabase du navigateur */
export function clearAllSupabaseStorage(): void {
  if (typeof window === 'undefined') return
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && (key.startsWith('sb-') || key.includes('supabase'))) keys.push(key)
  }
  keys.forEach(k => localStorage.removeItem(k))

  const skeys: string[] = []
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i)
    if (key && (key.startsWith('sb-') || key.includes('supabase'))) skeys.push(key)
  }
  skeys.forEach(k => sessionStorage.removeItem(k))
}

export type ClaimResult =
  | { ok: true; restricted: boolean; previousActiveDeviceId: string | null }
  | { ok: false; error: string }

// ----------------------------------------------------------------------------
// Deduplication d'appels en vol : si claimDeviceSlot est declenche plusieurs
// fois en parallele (signIn() + callback OAuth qui revient + un focus juste
// apres, etc.), tous les appelants partagent LA MEME promesse au lieu de
// declencher plusieurs requetes concurrentes. Avec le verrou de ligne cote
// SQL ce n'est plus indispensable a la correction, mais ca evite du trafic
// reseau inutile.
// ----------------------------------------------------------------------------
let claimInFlight: Promise<ClaimResult> | null = null

export async function claimDeviceSlot(
  supabase: any,
  _userId: string,
  email: string | null | undefined
): Promise<ClaimResult> {
  if (isMultiSessionUser(email)) return { ok: true, restricted: false, previousActiveDeviceId: null }
  if (typeof window === 'undefined') return { ok: true, restricted: false, previousActiveDeviceId: null }

  if (claimInFlight) return claimInFlight

  const deviceType = getDeviceType()
  const deviceId = getOrCreateDeviceId()

  claimInFlight = (async (): Promise<ClaimResult> => {
    try {
      const { data, error } = await supabase.rpc('claim_device_session', {
        p_device_id: deviceId,
        p_device_type: deviceType,
      })

      if (error) {
        console.error('Erreur claim_device_session:', error)
        return { ok: false, error: 'Erreur verification appareil. Reessayez.' }
      }

      if (!data?.ok) {
        return {
          ok: false,
          error: data?.error || 'Acces refuse : vous avez deja 2 appareils enregistres. Connectez-vous depuis un appareil deja utilise ou deconnectez-en un.',
        }
      }

      clearKickedFlag()

      return {
        ok: true,
        restricted: !!data.restricted,
        previousActiveDeviceId: data.previous_active_device_id ?? null,
      }
    } catch (e: any) {
      console.error('Erreur claimDeviceSlot:', e)
      return { ok: false, error: 'Erreur verification appareil. Reessayez.' }
    } finally {
      claimInFlight = null
    }
  })()

  return claimInFlight
}

/**
 * Verification PURE LECTURE de la validite de la session locale.
 * NE DOIT JAMAIS ecrire, ni appeler claimDeviceSlot — c'est ce qui causait
 * le kick "session_dupliquee" des la premiere session (un poll qui
 * "re-reclamait" l'appareil en arriere-plan, en parallele du claim du
 * login, sans synchronisation).
 */
export async function verifyStillValid(
  supabase: any,
  _userId: string,
  email: string | null | undefined
): Promise<{ shouldSignOut: boolean; reason?: string }> {
  if (isMultiSessionUser(email)) return { shouldSignOut: false }
  if (typeof window === 'undefined') return { shouldSignOut: false }
  if (wasRecentlyKicked()) return { shouldSignOut: true, reason: 'session_dupliquee' }

  // Un claim est en cours (login en train de se faire) : on ne verifie rien
  // tant qu'il n'est pas termine, pour ne jamais lire un etat transitoire.
  if (claimInFlight) return { shouldSignOut: false }

  const deviceType = getDeviceType()
  const deviceId = getOrCreateDeviceId()
  if (!deviceId) return { shouldSignOut: false }

  try {
    const { data, error } = await supabase.rpc('verify_device_session', {
      p_device_id: deviceId,
      p_device_type: deviceType,
    })

    if (error) {
      console.warn('Erreur verify_device_session:', error.message)
      return { shouldSignOut: false }
    }
    if (!data?.valid) {
      return { shouldSignOut: true, reason: data?.reason || 'session_dupliquee' }
    }
    return { shouldSignOut: false }
  } catch (e: any) {
    console.warn('Erreur verifyStillValid:', e?.message || e)
    return { shouldSignOut: false }
  }
}

/** Libere le statut "actif" de l'appareil courant (l'appareil reste "connu") */
export async function releaseDeviceSlot(supabase: any, _userId: string): Promise<void> {
  if (typeof window === 'undefined') return
  const deviceType = getDeviceType()
  const deviceId = getOrCreateDeviceId()
  if (!deviceId) return

  try {
    await supabase.rpc('release_device_session', {
      p_device_id: deviceId,
      p_device_type: deviceType,
    })
  } catch (_) { /* silencieux */ }
}

/**
 * Conserve pour compatibilite avec d'eventuels autres appelants dans le
 * projet. N'est plus utilise en interne par claim/verify (la verification
 * d'abonnement vit desormais cote SQL, dans les fonctions RPC elles-memes).
 */
export async function checkIsSubscribedRobust(supabase: any, userId: string): Promise<boolean> {
  try {
    const { data: prof } = await supabase
      .from('profiles')
      .select('is_active, subscription_end')
      .eq('id', userId)
      .single()

    if (prof?.is_active === true && prof?.subscription_end && new Date(prof.subscription_end) > new Date())
      return true

    const { data: subs } = await supabase
      .from('subscriptions')
      .select('is_active, status, ends_at, subscription_end')
      .eq('user_id', userId)
      .limit(20)

    if (!subs?.length) return false
    return subs.some((s: any) => {
      if (s?.is_active !== true || s?.status !== 'active') return false
      const end = s?.ends_at || s?.subscription_end
      return end ? new Date(end) > new Date() : false
    })
  } catch (e) {
    return false
  }
}