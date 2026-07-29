/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#4f6ef7',
        accent2: '#7c3aed',
        teal: '#06d6a0',
        gold: '#f5c842',
        surface: '#11142b',
        surface2: '#1a1d3a',
        // ── ajouts pour la landing page ──
        ink: '#07080f',
        text2: '#a0a8c0',
        muted: '#6b7280',
        line: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      // ── ajout pour la landing page ──
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both',
        'fade-up-1': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s both',
        'fade-up-2': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.16s both',
      },
    },
  },
  plugins: [],
}