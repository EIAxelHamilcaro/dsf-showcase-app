import type { locales } from "./common/i18n/config";
import type messages from "./common/translations/fr.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof messages;
  }
}
