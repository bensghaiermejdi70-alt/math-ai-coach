import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MathAI Coach — Ton Professeur de Maths IA',
  description: 'Plateforme IA de mathématiques adaptée aux programmes officiels Tunisie, Maroc et France. Solveur étape par étape, examens corrigés, chat IA professeur.',
  keywords: 'mathématiques, IA, Tunisie, Bac, FST, examens, solveur, professeur IA',
  authors: [{ name: 'MathAI Coach' }],
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
        {children}
      </body>
    </html>
  )
}
