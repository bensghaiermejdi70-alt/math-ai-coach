const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export function requireAccess(email?: string | null) {
  if (!email) throw new Error("Unauthorized")

  if (email === ADMIN_EMAIL) return true

  // future DB check ici
  return true
}