// src/lib/utils/device.ts
// Utilitaire pour générer un fingerprint d'appareil unique
// et restreindre l'accès à un seul ordinateur par abonnement

/**
 * Génère un fingerprint basé sur les caractéristiques du navigateur/OS.
 * Non-invasif, ne collecte pas d'informations personnelles.
 */
export async function getDeviceFingerprint(): Promise<string> {
  if (typeof window === 'undefined') return ''

  const components: string[] = []

  // 1. User agent
  components.push(navigator.userAgent)

  // 2. Langue
  components.push(navigator.language)

  // 3. Timezone
  components.push(Intl.DateTimeFormat().resolvedOptions().timeZone)

  // 4. Résolution écran
  components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`)

  // 5. Nombre de processeurs logiques
  components.push(String(navigator.hardwareConcurrency || 0))

  // 6. Canvas fingerprint (léger)
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillText('BacAI🇹🇳', 2, 2)
      components.push(canvas.toDataURL().slice(-50))
    }
  } catch {
    components.push('no-canvas')
  }

  // 7. WebGL renderer (identifie la carte graphique)
  try {
    const gl = document.createElement('canvas').getContext('webgl')
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        components.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      }
    }
  } catch {
    components.push('no-webgl')
  }

  // Hash SHA-256 de tous les composants
  const text = components.join('||')
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  const hashArray = Array.from(new Uint8Array(buffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Informations sur l'appareil (stockées en base pour référence admin)
 */
export function getDeviceInfo() {
  if (typeof window === 'undefined') return {}

  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${screen.width}x${screen.height}`,
    cores: navigator.hardwareConcurrency,
    timestamp: new Date().toISOString(),
  }
}
