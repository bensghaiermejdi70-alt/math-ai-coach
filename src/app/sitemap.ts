import { MetadataRoute } from 'next'

const baseUrl = 'https://www.mathbacai.com'

// ⚠️ Date fixe plutôt que `new Date()` : comme ce fichier est généré au
// build (pas de `dynamic`/`revalidate`), `new Date()` figeait de toute
// façon la même date sur TOUTES les pages (celle du dernier déploiement),
// ce qui n'apporte aucun signal utile à Google. À terme, idéalement,
// chaque page devrait avoir sa vraie date de dernière modification
// (ex. récupérée depuis la base de données pour du contenu qui change).
const lastUpdated = new Date('2026-07-31')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar`,
        },
      },
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: lastUpdated,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          fr: baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/bac`,
      lastModified: lastUpdated,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bac-france`,
      lastModified: lastUpdated,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solve`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bac-blanc`,
      lastModified: lastUpdated,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bac-blanc-france`,
      lastModified: lastUpdated,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/examens`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/examens-france`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/abonnement`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/abonnement-france`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // /chat, /simulation et /simulation-france volontairement absentes :
    // elles sont protégées par login (redirection systématique vers
    // /login pour tout visiteur non connecté, Googlebot compris) et
    // /simulation-france n'existe pas en tant que page distincte
    // (contenu identique à /simulation).
  ]
}