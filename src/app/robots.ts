import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Pages protégées par login (redirigent systématiquement vers
      // /login pour tout visiteur non connecté, Googlebot compris) :
      // inutile de laisser les moteurs y perdre du budget de crawl.
      disallow: [
        '/chat',
        '/profile',
        '/dashboard',
        '/settings',
        '/app',
        '/simulation',
        '/simulation-france',
        '/login',
        '/register',
        '/activation',
      ],
    },
    sitemap: 'https://www.mathbacai.com/sitemap.xml',
    host: 'https://www.mathbacai.com',
  }
}