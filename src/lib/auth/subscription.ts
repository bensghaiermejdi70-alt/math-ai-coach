const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export function isAdmin(email?: string | null) {
  if (!email) return false;
  return email === ADMIN_EMAIL;
}

export function hasAccess(user: any) {
  if (!user?.email) return false;

  // 🔥 ADMIN BYPASS TOTAL
  if (isAdmin(user.email)) return true;

  // 🔥 USERS NORMALS
  return user.is_active === true;
}