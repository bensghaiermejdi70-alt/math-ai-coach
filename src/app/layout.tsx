import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth/AuthContext'

export const metadata: Metadata = {
  title: 'MathBac.AI — Ton Professeur de Maths IA',
  description: 'Plateforme IA de mathématiques pour le Bac Tunisie et France. Solveur étape par étape, examens corrigés, simulation IA, chat professeur.',
  keywords: 'mathématiques, IA, Tunisie, France, Bac, examens, solveur, professeur IA, MathBac',
  authors: [{ name: 'MathBac.AI' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#07080f',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
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
