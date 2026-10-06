export const siteUrl = "https://www.douche-senior-france.com";
export const siteName = "Douche Senior France";
export const siteRegion = "Centre-Val de Loire";
export const defaultOgImage = "/og-default.jpg";
export const reservedSlugs: readonly string[] = ["admin", "api"];

export const homeSeo = {
  title: "Douche Senior Centre-Val Loire | 1 Jour | Aide 100%",
  description:
    "Douche sécurisée en 1 jour en Centre-Val de Loire. Artisan certifié Handibat. Aide MaPrimeAdapt jusqu'à 100%. Devis gratuit au 02 54 97 53 23.",
};

export const aiCrawlers: readonly string[] = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export const privatePaths: readonly string[] = ["/admin", "/api/"];

export const businessFacts = {
  facebookUrl: "https://www.facebook.com/douche.senior.france/",
  logoPath: "/logo.png",
  priceRange: "€€",
  latitude: 47.28256927999651,
  longitude: 1.5726510253114867,
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    { days: ["Saturday"], opens: "09:00", closes: "12:00" },
  ],
  serviceTypeName: "Installation de douches sécurisées pour seniors et PMR",
  description:
    "Artisan spécialisé dans le remplacement de baignoire par douche sécurisée pour seniors et PMR",
};
