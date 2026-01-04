import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.douche-senior-france.com";

  // Dates de modification réalistes
  const recentUpdate = new Date("2026-01-04"); // Mise à jour récente
  const olderUpdate = new Date("2025-12-20"); // Mise à jour plus ancienne

  return [
    // Homepage - priorité maximale, mise à jour fréquente
    {
      url: baseUrl,
      lastModified: recentUpdate,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [`${baseUrl}/hero.png`, `${baseUrl}/logo.png`],
    },

    // Pages villes principales - forte priorité, bon CTR
    {
      url: `${baseUrl}/douche-senior-blois`,
      lastModified: recentUpdate,
      changeFrequency: "monthly",
      priority: 0.95,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/douche-senior-tours`,
      lastModified: recentUpdate,
      changeFrequency: "monthly",
      priority: 0.95,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/douche-senior-orleans`,
      lastModified: recentUpdate,
      changeFrequency: "monthly",
      priority: 0.95,
      images: [`${baseUrl}/hero.png`],
    },

    // Pages services - conversion élevée
    {
      url: `${baseUrl}/remplacement-baignoire-par-douche`,
      lastModified: recentUpdate,
      changeFrequency: "monthly",
      priority: 0.95,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/installation-douche-pmr`,
      lastModified: recentUpdate,
      changeFrequency: "monthly",
      priority: 0.92,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/aides-financieres`,
      lastModified: new Date("2026-01-01"), // Mis à jour en 2026 pour les nouvelles aides
      changeFrequency: "yearly",
      priority: 0.9,
      images: [`${baseUrl}/hero.png`],
    },

    // Pages départements - SEO régional important
    {
      url: `${baseUrl}/loir-et-cher`,
      lastModified: recentUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/indre-et-loire`,
      lastModified: recentUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/loiret`,
      lastModified: recentUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/indre`,
      lastModified: olderUpdate,
      changeFrequency: "monthly",
      priority: 0.88,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/cher`,
      lastModified: olderUpdate,
      changeFrequency: "monthly",
      priority: 0.88,
      images: [`${baseUrl}/hero.png`],
    },

    // Villes secondaires
    {
      url: `${baseUrl}/douche-senior-chateauroux`,
      lastModified: olderUpdate,
      changeFrequency: "monthly",
      priority: 0.87,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/douche-senior-bourges`,
      lastModified: olderUpdate,
      changeFrequency: "monthly",
      priority: 0.87,
      images: [`${baseUrl}/hero.png`],
    },
    {
      url: `${baseUrl}/douche-senior-romorantin`,
      lastModified: olderUpdate,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [`${baseUrl}/hero.png`],
    },

    // Autres services
    {
      url: `${baseUrl}/amenagement-salle-bain-senior`,
      lastModified: olderUpdate,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [`${baseUrl}/hero.png`],
    },
  ];
}
