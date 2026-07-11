import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth/AuthContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mathbacai.com'),

  title: 'MathBac.AI — Ton Professeur IA qui ne dort jamais | Tunisie & France',

  description:
    "Révise avec l'IA en Tunisie et en France : Bac toutes sections en Tunisie, Seconde, Première et Terminale en France. Simulations d'examens, solveur étape par étape, Chat IA Professeur, Bac Blanc quotidien et plan de révision personnalisé.",

  keywords: [
    'MathBac.AI',
    'MathBac AI',
    'Math Bac',
    'Bac Tunisie',
    'Baccalauréat Tunisie',
    'Bac France',
    'Bac 2026',
    'Bac 2027',
    'Seconde',
    'Première',
    'Terminale',
    'Mathématiques',
    'Physique',
    'SVT',
    'Informatique',
    'Français',
    'Anglais',
    'Économie',
    'Gestion',
    'Intelligence Artificielle',
    'IA',
    'Professeur IA',
    'Révision Bac',
    'Simulation Bac',
    'Bac Blanc',
    'Bac Blanc IA',
    'Solveur Math',
    'Chat IA',
    'Cours de Math',
    'Cours de Physique',
    'Révision Terminale',
    'Révision Première',
    'Révision Seconde',
    'Examen IA',
    'Plateforme éducative',
    'Education IA',
    'EdTech',
  ],

  authors: [
    {
      name: 'MathBac.AI',
      url: 'https://www.mathbacai.com',
    },
  ],

  creator: 'MathBac.AI',

  publisher: 'MathBac.AI',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://www.mathbacai.com',
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['ar_TN'],
    url: 'https://www.mathbacai.com',
    siteName: 'MathBac.AI',
    title: 'MathBac.AI — Ton Professeur IA qui ne dort jamais | Tunisie & France',
    description:
      "Révise avec l'IA en Tunisie et en France : Bac toutes sections en Tunisie, Seconde, Première et Terminale en France. Simulations d'examens, solveur étape par étape, Chat IA Professeur, Bac Blanc quotidien et plan de révision personnalisé.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MathBac.AI - Ton Professeur IA qui ne dort jamais',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MathBac.AI — Ton Professeur IA qui ne dort jamais | Tunisie & France',
    description:
      "Révise avec l'IA en Tunisie et en France : Bac toutes sections en Tunisie, Seconde, Première et Terminale en France.",
    images: ['/og-image.jpg'],
    creator: '@MathBacAI',
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  applicationName: 'MathBac.AI',

  category: 'education',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#07080f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <div className="mesh-bg" />

        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}