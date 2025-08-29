import { cookies } from "next/headers";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { COOKIE_NAME, defaultLocale, locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  // Read from potential `[locale]` segment
  // if the user is on a public page
  let candidate = await requestLocale;

  if (!candidate) {
    const store = await cookies();
    candidate =
      store.get(COOKIE_NAME)?.value || navigator.language.split("-")[0];
  }

  const locale = hasLocale(locales, candidate) ? candidate : defaultLocale;
  return {
    locale,
    messages: (await import(`../translations/${locale}.json`)).default,
  };
});
