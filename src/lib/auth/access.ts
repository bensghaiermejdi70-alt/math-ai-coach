const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export function isAdmin(email?: string | null) {
  return email === ADMIN_EMAIL
}

/**
 * 🔥 SOURCE DE VÉRITÉ FUTURE (DB)
 * pour l'instant simple fallback safe
 */
export function hasValidAccess(user: any) {
  if (!user?.email) return false

  // ADMIN BYPASS TOTAL
  if (isAdmin(user.email)) return true

  // 🔥 IMPORTANT :
  // ici on prépare DB future (is_active + subscription)
  return user.is_active === true
}