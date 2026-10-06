import { isTestKey } from "./lib/contact/turnstileKeys";

export function register() {
  const isDeployed = Boolean(process.env.VERCEL_ENV);

  if (process.env.NODE_ENV !== "production" && !isDeployed) {
    return;
  }

  const keys = {
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  };
  const unusable = Object.entries(keys)
    .filter(([, key]) => !key || (isDeployed && isTestKey(key)))
    .map(([name, key]) => `${name} ${key ? "is a test key" : "is missing"}`);

  if (unusable.length > 0) {
    // biome-ignore lint/suspicious/noConsole: server log read in the hosting dashboard
    console.error(
      `[contact] Turnstile is not usable (${unusable.join(", ")}), the contact forms refuse every request`,
    );
  }
}
