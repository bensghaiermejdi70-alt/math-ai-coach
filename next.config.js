/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router est activé par défaut dans Next.js 14+
  // src/app est automatiquement détecté via tsconfig paths
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'http://localhost:8000/api/:path*' }
    ]
  },
}

module.exports = nextConfig
