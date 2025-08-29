export type Locale = (typeof locales)[number];

export const locales = ["en", "fr"] as const;
export const defaultLocale: Locale = "en";
export const COOKIE_NAME = "NEXT_LOCALE";
