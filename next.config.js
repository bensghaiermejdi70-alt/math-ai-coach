const path = require('path')

// ── En-têtes de sécurité appliqués à toutes les réponses ──
// Sûrs (ne cassent pas une app Next classique). La CSP n'est PAS incluse
// volontairement (elle peut tout bloquer si mal réglée) — voir note en bas.
const securityHeaders = [
  // Empêche ton site d'être affiché dans une iframe d'un autre domaine (anti-clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Empêche le navigateur de "deviner" le type d'un fichier (anti MIME-sniffing)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Ne fuite pas l'URL complète vers les sites tiers
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Force le HTTPS pendant 1 an (Render est déjà en HTTPS)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Désactive des fonctionnalités que l'app n'utilise pas
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },

  async headers() {
    return [
      {
        // s'applique à toutes les routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'https://YOUR_BACKEND_URL/api/:path*'
            : 'http://localhost:8000/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig