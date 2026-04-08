/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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